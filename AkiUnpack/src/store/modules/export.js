import { ExportManager } from '@/utils/export/exportManager'

import { gallery } from 'qt/gallery'
import Vue from 'vue'
import FileUtils from '@/utils/FileUtils'
import { ShareManager } from '@/utils/export/shareManager'
import { logger } from '@/utils/log4js'
import DBIpcRender from '@/irender/DBIpcRender'
import { EXPORT_DIR_TABLE, EXPORT_ERROR_TABLE, EXPORT_ITEM_TABLE } from '#/types/config'
import { ReportErrorManager } from '@/utils/export/reportErrorManager'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { Export_API_ERROR, Export_Process_Error } from '@/utils/export/exportConfig'
import { delay } from '#/utils/common'
import NodeApi from '@/qt-ipc/node-api'
import { ExportBridgeImpl } from '@/qt-ipc/bridge/impl/ExportBridgeImpl'
import ExportDirModel from '@/model/ExportDirModel'
import Project from '@/model/ProjectModel'
import { exportPhotoFormat } from '@/constants'

const exportLog = logger('exportErr')

const TAG = 'EXPORT_TAG : '


let exportManager = null

let shareManager = null

let reportErrorManager = new ReportErrorManager()

function getExportById(id, list) {
    if (list == null || list.length === 0) {
        return null
    }
    for (const item of list) {
        if (item.id === id) {
            return item
        }
    }
    return null
}

function refreshExportNumber(state) {
    let list = state.list
    if (list == null || list.length === 0) {
        state.exportNumber = 0
        return
    }
    let numb = 0
    list.forEach((item) => {
        if ([0, 1, 2].includes(item.exportStatus)) {
            if (item.progress < 100) {
                numb++
            }
        }
    })
    state.exportNumber = numb
}

function clearExportItemValue(keys, exportItem) {

    // keys.push('preset')
    // keys.push('palettePreset')
    // keys.push('md5PalettePreset')
    // keys.push('md5Preset')
    // keys.push('savePath')

    // keys.push('decryptRequestPath')
    // keys.push('decrypResultPath')
    // keys.push('smallOriginPath')
    // keys.push('skeletonOriginPath')
    // keys.push('maskPath')
    // keys.push('skeletonPath')
    // keys.push('faSeedFilePath')
    // keys.push('md5Thumbnail')

    // exportItem.preset = null
    // exportItem.palettePreset = null
    // exportItem.md5PalettePreset = null
    // exportItem.md5Preset = null
    // exportItem.savePath = null

    // exportItem.decryptRequestPath = null
    // exportItem.decrypResultPath = null
    // exportItem.smallOriginPath = null
    // exportItem.skeletonOriginPath = null
    // exportItem.maskPath = null
    // exportItem.skeletonPath = null
    // exportItem.faSeedFilePath = null

    exportItem.smallOriginPath = null
    exportItem.md5Thumbnail = null

    keys.push('smallOriginPath')
    keys.push('md5Thumbnail')
}

// 当前应用模板
export default {

    state: {
        hasInit: false,
        list: [],
        showPrePayLoading: false,
        currentShareItemId: -1,
        hasLaunch: false,
        exportNumber: 0,
        isDownloadFree: true,
        exportErrMap: new Map(),
        exportSuccessTipMap:new Map(),
        exportLoadingProgress: '',
        payTipModel: null,
        currentDownloadDirId: -1,
        isOnExportingBtn: true,

        // 用于获取导出配置图库或精修的uuid
        exportEffectCfg: {
            isFromRefineTab: false,
            refineOrGalleryUUID: ''
        },

        exportPhotoFormat: exportPhotoFormat['origin'],
        exportShareList: [],
        exportDirId: -1,
        showShareSelectDialog: false,
        showShareResultDialog: false,
        shareResultDialogShareLink: null,
        currentShareResultId: -1,
    },

    getters: {

        // 是否显示'全部暂停'按钮
        needShowPauseAllBtn(state, getters) {


            let needShowStartOrPauseAllBtn = getters.needShowStartOrPauseAllBtn
            if (!needShowStartOrPauseAllBtn) {
                return false
            }

            let finalList = state.list.filter(item => !(item.exportTotalNum === item.exportSuccessNum && (!item.hasExportFail) && !state.exportErrMap.has(item.id)))
            // 非资金不足状态 && 非暂停状态
            finalList = finalList.filter(item => (!item.isFundsLackStatus && !item.isPauseStatus && !state.exportErrMap.has(item.id) && !item.isDownloadFail()))

            if (finalList && finalList.length > 0) {
                return true
            }
            return false
        },
        // 是否显示'全部开始'按钮
        needShowStartAllBtn(state, getters) {


            let needShowStartOrPauseAllBtn = getters.needShowStartOrPauseAllBtn
            if (!needShowStartOrPauseAllBtn) {
                return false
            }

            let finalList = state.list.filter(item => !(item.exportTotalNum === item.exportSuccessNum && (!item.hasExportFail) && !state.exportErrMap.has(item.id)))
            // 资金不足状态 || 暂停状态
            finalList = finalList.filter(item => {
                let result = ((item.isFundsLackStatus || item.isPauseStatus) && !state.exportErrMap.has(item.id) && !item.isDownloadFail())
                return result
            })

            if (finalList && finalList.length > 0) {
                return true
            }
            return false
        },

        // 是否显示全部暂停 or 全部开始按钮
        needShowStartOrPauseAllBtn(state) {
            if (!state.isOnExportingBtn) {
                return false
            }
            let finalList = state.list.filter(item => !(item.exportTotalNum === item.exportSuccessNum && (!item.hasExportFail) && !state.exportErrMap.has(item.id)))
            if (!finalList || finalList.length == 0) {
                return false
            }
            return true
        },
        // 是否显示全部暂停 or 全部开始按钮
        exportEffectCfg: (state) => state.exportEffectCfg
    },
    mutations: {
        //更新显示---分享图片选择弹窗
        updateShowShareSelectDialog(state, val) {
            state.showShareSelectDialog = val
            if (!val) {
                state.exportShareList = []
                state.exportDirId = -1
            }
        },

        //更新分享图片列表
        updateExportShareList(state, val) {
            if (!val || val.length === 0) {
                return
            }
            let outList = []
            let dirList = val
            dirList.forEach((item,index) => {
                item.iamgeData = null
                item.index = index
                outList.push(item)
            })
            state.exportShareList = outList
            state.exportDirId = outList[0].exportDirId
        },

        //更新分享图片选中状态
        updateExportShareSelect(state, data) {
            let index = data.index
            let exportItemId = data.exportItemId
            let isSelect = data.isSelect
            state.exportShareList[index].isSelectShare = isSelect
            NodeApi.getExport().updateExportItemIsSelect(exportItemId, isSelect)
        },

        //更新分享进度条
        updateExportShareProgress(state, params) {
            let { rootId, progress, shareStatus, shareLink, shareEndTime } = params
            let exportDir = getExportById(rootId, state.list)
            if (exportDir) {
                exportDir.shareProgress = progress
                exportDir.shareStatus = shareStatus
                exportDir.shareLink = shareLink
                exportDir.shareEndTime = shareEndTime
            }
        },

        //更新显示状态--分享链接弹窗
        updateShowShareResultDialog(state, params) {
            state.showShareResultDialog = params.showShareResultDialog
            if (params.item) {
                state.currentShareResultId = params.item.id
                state.shareResultDialogShareLink = params.item.shareLink
            } else {
                state.currentShareResultId = -1
                state.shareResultDialogShareLink = null
            }
        },

        updateExportEffectCfg(state, data) {
            let { isFromRefineTab, refineOrGalleryUUID } = data
            state.exportEffectCfg.isFromRefineTab = isFromRefineTab
            state.exportEffectCfg.refineOrGalleryUUID = refineOrGalleryUUID
            console.log('updateExportEffectCfg isFromRefineTab: ', state.exportEffectCfg.isFromRefineTab, '; refineOrGalleryUUID: ', state.exportEffectCfg.refineOrGalleryUUID)
        },
        initData(state, list) {
            if (state.hasInit) {
                return
            }
            if (list == null || list.length == 0) {
                state.hasInit = true
                return
            }
            list.forEach(item => {
                state.list.push(item)
            })
            state.hasInit = true

            refreshExportNumber(state)
        },
        // 切换导出分类
        changeExportScene(state) {
            state.isOnExportingBtn = !state.isOnExportingBtn
        },
        updateExportProgress(state, progress) {
            state.exportLoadingProgress = `准备导出中，请稍后...${progress}`
        },
        updateExportDownloadProgress(state, data) {
            let { rootId, progress, exportStatus } = data
            let exportDir = getExportById(rootId, state.list)
            if (exportDir) {
                if (progress >= 100) {
                    progress = 100
                    exportDir.exportSuccessNum = exportDir.exportTotalNum
                    exportDir.exportStatus = 3
                }
                exportDir.progress = progress
                exportDir.exportStatus = exportStatus
            }
        },
        addExportDir(state, exportDirItem) {
            let isExit = false
            for (const listElement of state.list) {
                if (listElement.id == exportDirItem.id) {
                    isExit = true
                    break
                }
            }
            if (isExit) {
                return
            }
            if (!state.isOnExportingBtn) {
                state.isOnExportingBtn = true
            }
            state.list.unshift(exportDirItem)
            refreshExportNumber(state)
        },

        updateExportDir(state, item) {
            let dir = ExportDirModel.create(item)
            const index = state.list.findIndex(item => item.id === dir.id)
            Vue.set(state.list, index, dir)
            refreshExportNumber(state)
        },

        clearExportTask(state) {
            state.hasInit = false
            state.list = []
            state.showPrePayLoading = false
            state.hasLaunch = false
            state.exportNumber = 0
            state.exportErrMap = new Map()
            NodeApi.getExport().asyncClearExportTask()

        },

        launchMessage(state) {
            if (exportManager != null) {
                exportManager.launchMessage()
            }
        },

        setExportItemList(state, data) {
            let { rootId, list } = data
            let exportItem = getExportById(rootId, state.list)
            if (exportItem == null) {
                return
            }
            exportItem.exportItemList = list
        },

        updateItemPayStatus(state, data) {
            let rootId = data.rootId
            let index = data.index

            let exportItem = getExportById(rootId, state.list)
            if (exportItem == null) {
                return
            }
            exportItem.exportItemList[index].isPay = true
            DBIpcRender.updateByKeys(EXPORT_ITEM_TABLE, exportItem.exportItemList[index], ['isPay'])
        },

        updateDirErrorStatus(state, data) {
            let { dirId, hasExportFail } = data
            let exportItem = getExportById(dirId, state.list)
            if (exportItem == null) {
                return
            }
            if (exportItem.hasExportFail !== hasExportFail) {
                exportItem.hasExportFail = hasExportFail
                DBIpcRender.updateByKeys(EXPORT_DIR_TABLE, exportItem, ['hasExportFail'])
            }
        },

        updateDirErrorInfo(state, data) {
            let { dirId, exportErrorList } = data
            if (exportErrorList) {

                let map = state.exportErrMap
                state.exportErrMap = null
                map.set(dirId, exportErrorList)
                state.exportErrMap = map

                let list = state.list
                state.list = []
                state.list = list
            }
        },

        removeDirErrorInfo(state, data) {
            let { dirId } = data
            if (state.exportErrMap.has(dirId)) {

                let map = state.exportErrMap
                state.exportErrMap = null
                map.delete(dirId)
                state.exportErrMap = map

                let list = state.list
                state.list = []
                state.list = list
            }
        },
        removeErrorItemInfo(state, data) {
            let { dirId, itemIndex } = data
            if (state.exportErrMap.has(dirId)) {

                let map = state.exportErrMap
                let list = map.get(dirId)
                if (list) {
                    list.splice(itemIndex, 1)
                }
                if (list && list.length > 0) {
                    state.exportErrMap.set(dirId, list)
                } else {
                    state.exportErrMap.delete(dirId)
                }
            }
        },

        updateStatisticStatus(state, data) {
            let { rootId, index } = data
            let exportItem = getExportById(rootId, state.list)
            if (exportItem == null) {
                return
            }
            let item = exportItem.exportItemList[index]
            item.staticsStatus = true
            DBIpcRender.updateByKeys(EXPORT_ITEM_TABLE, item, ['staticsStatus'])
        },


        updateRetryErrorItem(state, data) {
            let { rootId, index } = data
            let exportDir = getExportById(rootId, state.list)
            if (exportDir == null) {
                return
            }

            exportDir.exportStatus = 0
            let exportItem = exportDir.exportItemList[index]
            if (exportItem) {
                exportItem.setStatus(0)
                exportDir.updateProgress()
                DBIpcRender.updateByKeys(EXPORT_ITEM_TABLE, exportItem, ['exportStatus'])
            }
        },

        createExportShare(state, data) {
            let shareId = data.shareId
            let rootId = data.rootId
            let exportItem = getExportById(rootId, state.list)
            if (exportItem == null) {
                return
            }

            exportItem.shareId = shareId
            exportItem.updateShareProgress()
            DBIpcRender.updateAll(EXPORT_DIR_TABLE, exportItem)
        },
        updateShareInfo(state, data) {
            let rootId = data.rootId
            let exportItem = getExportById(rootId, state.list)
            if (exportItem == null) {
                return
            }
            exportItem.shareLink = data.url
            exportItem.shareEndTime = data.endTime
            exportItem.shareStartTime = data.startTime
            DBIpcRender.updateAll(EXPORT_DIR_TABLE, exportItem)
        },
        resetInitStatus(state) {
            state.hasInit = false
            state.list = []
        },

        changeDownloadStatus(state, data) {
            let status = data.status
            state.isDownloadFree = status
            if (!status) {
                state.exportLoadingProgress = ''
            }
        },
        changeShowPayTipStatus(state, data) {
            state.payTipModel = data
        },
        updateFundsLackStatus(state, { rootId, fundsStatus }) {
            let exportDir = getExportById(rootId, state.list)
            exportDir.isFundsLackStatus = fundsStatus
            if (fundsStatus) {
                ipcRenderer.send('fundLack-event')
            }
        },
        deleteExportDir(state, { rootId }) {
            let filterList = state.list.filter(item => item.id != rootId)
            state.list = filterList
            let map = state.exportErrMap
            map.delete(rootId)
            state.exportErrMap = map
            refreshExportNumber(state)
        },
        updateCurrentDownloadDirId(state, { rootId }) {
            state.currentDownloadDirId = rootId
            let exportDir = getExportById(rootId, state.list)
            if (exportDir) {
                exportDir.isStartExport = true
            }
        },
        changeExpandStatus(state, rootId) {
            let exportDir = getExportById(rootId, state.list)
            exportDir.isExpand = !exportDir.isExpand
            DBIpcRender.updateByKeys(EXPORT_DIR_TABLE, exportDir, ['isExpand'])
        },
        checkTab(state) {
            // 设置显示到未完成 tab or 已完成tab
            let isOnExportingBtn = state.isOnExportingBtn
            let exportErrorMap = state.exportErrMap
            // 如果 总张数 > 完成进度  || 有错误状态 || 错误map有当前列表
            let unCompleteList = state.list.filter(item => item.exportTotalNum > item.exportSuccessNum || exportErrorMap.has(item.id) || item.hasExportFail)
            let needShowOnExportingScene = false
            if (unCompleteList && unCompleteList.length > 0) {
                needShowOnExportingScene = true
            }
            if (isOnExportingBtn !== needShowOnExportingScene) {
                state.isOnExportingBtn = !state.isOnExportingBtn
            }
        },
        setExportPhotoFormat(state, val) {
            state.exportPhotoFormat = val
        },
        addExportTipDir(state, data) {
            let {dirId, list} = data
            let map = state.exportSuccessTipMap
            map.set(dirId, list)
            state.exportSuccessTipMap = map
        }

    },
    actions: {
        asyncOnPaySuccess(context) {
            let list = context.state.list
            if (list == null || list.length == 0) {
                return
            }
            for (const exportDir of list) {
                if (exportDir.isFundsLackStatus) {
                    context.commit('updateFundsLackStatus', { rootId: exportDir.id, fundsStatus: false })
                }
            }
        },
        asyncPauseExport(context, callback) {
            return new Promise(async (resolve) => {
                let { data } = callback
                let arg = {
                    rootId: data.id
                }
                let res = await NodeApi.getExport().asyncPauseExport(arg)
                let { code, fail } = res
                if (code === 0) {
                    callback.success()
                } else {
                    console.error(fail)
                    callback.fail()
                }
            })
        },
        asyncStartExport(context, callback) {
            return new Promise(async (resolve) => {
                let { data } = callback
                let arg = {
                    rootId: data.id
                }
                let res = await NodeApi.getExport().asyncStartExport(arg)
                let { code, fail } = res
                if (code === 0) {
                    callback.success()
                } else {
                    console.error(fail)
                    callback.fail()
                }
            })
        },
        asyncDeleteDir(context, data) {
            return new Promise(async (resolve) => {
                let { exportDir } = data
                let arg = {
                    rootId: exportDir.id
                }
                try {
                    ExportBridgeImpl.instance().addDeleteListener(data)
                    await NodeApi.getExport().asyncDeleteExport(arg)
                } catch (e) {
                    //debugger
                    data.fail()
                }
            })
        },


        /**
         * 重试
         * @param context
         */
        asyncRetryExportDirTask(context, data) {
            return new Promise(async (resolve) => {
                let { rootId, needClearErrorList } = data
                let params = {
                    exportDirId: rootId,
                    needClearErrorList: needClearErrorList
                }
                await NodeApi.getExport().asyncRetryExportDirTask(params)
                resolve()
            })
        },

        /**
         * 从数据库读取该用户的导出信息
         * @param context
         * @returns {Promise<unknown>}
         */
        asyncInitExportData(context, forceLoad) {
            return new Promise(async resolve => {
                console.log('asyncInitExportData')
                await NodeApi.getExport().asyncInitExportData({ forceLoad: false })
                resolve(true)
            })
        },

        asyncInitExportData2(context, forceLoad) {
            return new Promise(async resolve => {
                console.log('asyncInitExportData')
                await NodeApi.getExport().asyncInitExportData({ forceLoad: true })
                resolve(true)
            })
        },


        //导出
        asyncPrePay(context, payload) {
            return new Promise(async (resolve, reject) => {
                let args = {
                    exportDirPath: payload.exportDirPath,
                    exportDirName: payload.exportDirName,
                    currentProjectId: payload.project.id,
                    createNewDir: payload.createNewDir,
                    exportTimes: payload.project.exportTimes,
                    exportPhotoFormat:JSON.parse(JSON.stringify(context.rootState.export.exportPhotoFormat)),
                    exportJPGLevel: context.rootState.config.exportJPGFormatVal
                }

                ExportBridgeImpl.instance().addPayListener(payload)

                NodeApi.getExport().asyncPrePay(args)
                //将上次选择的导出类型清空
                context.commit('setExportPhotoFormat', exportPhotoFormat.origin)
            })
        },

        asyncPrintExportInfo(context, payload) {
            return new Promise(async resolve => {
                if (exportManager == null) {
                    exportManager = new ExportManager(context)
                }

                let res = await exportManager.printExportInfo()
                console.log('导出信息如下 ：', res)
                exportLog.log('导出信息如下 ：', res)
            })
        },

        /**
         * 错误列表的重试处理
         * @param context
         * @param data
         * @returns {Promise<unknown>}
         */
        asyncRetryErrorItem(context, data) {
            return new Promise(async (resolve) => {

                let { errorItem, index, needDeleteCache } = data
                let params = {
                    exportDirId: errorItem.exportDirId,
                    exportItemId: errorItem.exportItemId,
                    errorIndex: index,
                    needDeleteCache: needDeleteCache
                }

                await NodeApi.getExport().asyncRetryErrorItem(params)
                resolve()
            })
        },

        /**
         * 全部暂停
         * @param context
         */
        asyncPauseAll(context, callback) {
            return new Promise(async (resolve) => {
                let res = await NodeApi.getExport().asyncPauseAll()
                let { code } = res
                if (code === 0) {
                    callback.success()
                } else {
                    callback.fail()
                }
            })
        },
        /**
         * 全部开始
         * @param context
         */
        asyncStartAll(context, callback) {
            return new Promise(async (resolve) => {
                let res = await NodeApi.getExport().asyncStartAllExport()
                let { code } = res
                if (code === 0) {
                    callback.success()
                } else {
                    callback.fail()
                }
            })
        },

        async updateIsRefreshExportDiskErrConfirm(context) {
            setTimeout(() => {
                NodeApi.getExport().updateIsRefreshExportDiskErrConfirm()
            }, 4000)

        }
    }
}
