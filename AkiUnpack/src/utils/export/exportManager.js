// import path from 'path';
import md5 from 'js-md5'
import ArrayMap from '@/utils/ArrayMap'
import tsBasicTimer from '@/utils/tsBasicTimer'

const { v4 } = require('uuid')

const TAG = 'EXPORT_MANAGER_TAG : '
const EXPORT_TYPE_FINISHING = 1
const EXPORT_TYPE_TEMPLATE = 2
const DEFAULT_PRESET = 'default_PixCake_preset'
const DELAY_TASK_TIME = 1000
const EXPORT_RETRY_NUMBER = 3


let CONCURRENT_NUMBER = 1
const CHECK_UNIT = 1000


export class ExportManager {

    constructor(context) {
        this.currentExportItem = null
        this.waitToDeleteDirModel = null
        this.callbacks = null
        this.lastHandleTime = 0
        this.messageListMap = new ArrayMap()
        this.messageErrorStatisticsMap = new Map()
        this.messageList = []
        this.timer = new tsBasicTimer()
        this.mCurrentExportList = []
        // 记入数据库的异常数据
        this.recordErrorMap = new Map()

        this.context = context
        this.appConfig = this.context.rootState.config
        CONCURRENT_NUMBER = 0//this.appConfig.exportTaskConfig.defaultNumber
        console.log('CONCURRENT_NUMBER : ', CONCURRENT_NUMBER)
        let _that = this
        this.isInitAddTask = true
        this.intervalCheck()

    }

    getIndex(itemList, id, item, index) {
        for (let i = 0; i < itemList.length; i++) {
            let itemElement = itemList[i]
            if (itemElement.id === id) {
                item = itemElement
                index = i
                break
            }
        }
        return { item, index }
    }

    /**
     * 上报统计数据
     * @param item
     * @param startTime
     */
    reportStatistic(item, startTime) {
        if (item) {
            let data = {}

            let originalWidth = item.originImageWidth
            let originalHeight = item.originImageHeight
            let faceCount = item.faceCount
            let userTime = new Date() - startTime

            let originalMax = Math.max(originalWidth, originalHeight)
            let originalMin = Math.min(originalWidth, originalHeight)

            data.cake_feature = `pixel:${originalMax}*${originalMin}`
            data.cake_value = `isRawImage:${item.isRawImage}`
            data.cake_number = faceCount
            data.cake_time = (Number)(userTime * 0.001).toFixed(1)
            if (item.preset && item.preset.id) {
                data.cake_id = item.preset.id
            }
            TsStat.getInstance().event('cake_export_value', data)
        }
    }

    async checkAccountInfo(_that, rootId) {
        const { vip_info } = await fetchUserInfo()
        let left = 0
        if (vip_info) {
            const vipInfo = vip_info || []
            if (vipInfo != null && vipInfo.length > 0) {
                vipInfo.forEach(item => {
                    left += item.left_count
                })
            }
        }
        console.log('checkAccountInfo', vip_info, ' left : ', left)
        if (left <= 0) {
            _that.context.commit('updateFundsLackStatus', {
                rootId: rootId,
                fundsStatus: true
            })
            _that.handleFundsLackCallback('套餐剩余可用张数不足，无法成功导出，请及时充值哦')
            _that.checkMessageQueueLoop()
            return false
        }
        return true
    }

    async parseExportResult(result, _that, rootId, index, exportItemModel) {
        // 自动重试不判断是否failed,已经自动加入导出任务队列
        if (result.code === ExportCode.AUTO_RETRY) {
            return
        }

        if (result.code === ExportCode.FUNDS_LACK) {
            let exportDir = _that.getExportDir(rootId, _that.context.state.list)
            if (!exportDir.isFundsLackStatus && !exportDir.isPauseStatus) {
                _that.context.commit('updateFundsLackStatus', {
                    rootId: rootId,
                    fundsStatus: true
                })
                await pauseExportApi(rootId)
            }
            // 资金不足的情况下，重新设置导出状态为初始状态
            _that.context.commit('updateExportItemDownloadStatus', {
                rootId: rootId,
                index: index,
                status: 0
            })
        } else {
            if (result && result.msg && result.msg.finalSavePath) {
                let finalSavePath = result.msg.finalSavePath

                // 清理错误重试的记录
                let key = this.statisticKey(rootId, exportItemModel)
                if (this.messageErrorStatisticsMap && this.messageErrorStatisticsMap.has(key)) {
                    this.messageErrorStatisticsMap.delete(key)
                }

                _that.context.commit('updateExportItemPath', {
                    rootId: rootId,
                    index: index,
                    finalSavePath: finalSavePath
                })
                _that.context.commit('updateExportItemDownloadStatus', {
                    rootId: rootId,
                    index: index,
                    status: 3,
                    needCheckError: result.needCheckError
                })
                return
            }
            // 更新处理完成的状态
            let exportDir = _that.getExportDir(rootId, _that.context.state.list)
            if (!exportDir.isDownloadFail()) {
                _that.context.commit('updateExportItemDownloadStatus', {
                    rootId: rootId,
                    index: index,
                    status: 3,
                    needCheckError: result.needCheckError
                })
            }
        }
    }

    checkMessageQueueLoop() {
        if (this.messageHandler.isStopLooper()) {
            this.launchMessage()
        }
    }

    intervalCheck() {

    }

    isFreeStatus() {

    }

    async printExportInfo() {

    }

    getExportDir(rootId, list) {
        let exportDir = null
        for (const dirItem of list) {
            if (dirItem.id === rootId) {
                exportDir = dirItem
                break
            }
        }
        return exportDir
    }

    async findExportItemList(dir) {
    }

    async asyncFindExportItem(exportDir) {
        return []
    }

    async createTransExportEntityList(context, viewModelToPresetMap) {

    }


    /**
     * 检查等待导出的保存路径是否存在同名的路径
     * @param finalSavePath
     * @param exportItemId
     * @returns {boolean}
     */
    checkWaitExportSavePath(finalSavePath, exportItemId) {

    }

    /**
     * 初始化导出涉及的参数
     * @param exportItemModel
     * @param imageIOid
     * @returns {Promise<unknown>}
     */
    async initEffectParam(rootId, index, exportItemModel, imageIOid) {
    }


    getCommonObj(itemModel) {
        return {}
    }


    replacePath(inPath) {
        return inPath.replaceAll(path.sep, '/')
    }

    statisticKey(rootId, exportItemModel) {
        let key = rootId + '-' + exportItemModel.id
        return key
    }

    async checkIsFailedAndTryToRetry(rootId, index, exportDir, item, errorCode, message) {
        return null
    }

    async handleFaSeed(context, exportItemModel, rootId, index, imageIOid) {
    }

    handleFundsLackCallback(message) {
    }

    checkExportItemComplete(exportDir, rootId, index, item) {
        return false
    }

    async recordExportError(exportDir, index, item, message, errorCode, exportCode, nativeCode) {
    }

    checkOriginImagePathExit(item) {
        return true
    }

    async statisticExport(exportDir, item, index) {

    }


    asyncHandleExportItem(context, rootId, index, item, exportDir) {
    }

    async handlePay(rootId, index, exportDir, item, resolve, reject, requestObj) {
        return //{ code: ExportCode.SUCCESS, md5Data:md5Data, data:data }
    }

    async asyncCreateExportItemList(transExportList, userId, exitExportDir) {
        return []//exportItemModelList
    }

    async launchMessage() {

    }

    setExportCallback(callbacks) {
        this.callbacks = callbacks
    }

    clearCallback() {
        this.callbacks = null
    }

    stopExport() {
        this.messageList = []
        this.messageListMap = new ArrayMap()
    }

    async getFirstMessageList() {
        let messageList = []
        return messageList
    }

    async addTask() {

    }

    getTaskList(taskList) {

    }

    async loadExportFromDao(userId) {
        // const res = await findAllExportDirByDao(userId)
        // return res
    }

    getExportDirPath(currentProjectId, importParentList) {
        return {}
    }

    asyncAddNewExportData(data, reportErrorManager) {

    }

    getExportTimes(dirPath, currentProject, exportTimes) {

    }

    async checkExportListComplete(dirList) {

    }


    /**
     * 检测导出子项的错误信息
     * @param exportItem
     */
    async checkExportItemError(exportItem) {

    }

    /**
     * 查找导出目录对应的错误信息
     * @param dirModel
     * @returns {Promise<void>}
     */
    async findExportErrorInfo(dirModel, needRefresh) {

    }

    async startExportDir(exportDir) {
        // await resumeExportApi(exportDir.id)
        // this.context.commit('updatePauseStatus', { rootId: exportDir.id, isPause: false })
        // this.context.commit('updateFundsLackStatus', { rootId: exportDir.id, fundsStatus: false })
        // await this.reLaunchExportTask(exportDir.id, exportDir)
        // await this.launchMessage()
    }

    // 暂停导出任务
    async pauseExportDir(exportDir) {
        // this.removeExportMessage(exportDir);
        // await pauseExportApi(exportDir.id)
    }

    // 删除导出任务
    async deleteDir(data) {
        // let { exportDir } = data
        // this.removeExportMessage(exportDir);
        // // 如果正常导出的任务的目录是要删除的目录，就等导出后再删除
        // if (this.currentExportItem && this.currentExportItem.exportDirId === exportDir.id) {
        //     this.waitToDeleteDirModel = data
        // } else {
        //     this.handleDeleteDir(data)
        // }
    }

    removeExportMessage(exportDir) {

    }

    /**
     * 删除导出目录
     * @param data
     * @returns {Promise<void>}
     */
    async handleDeleteDir(data) {

    }
}

