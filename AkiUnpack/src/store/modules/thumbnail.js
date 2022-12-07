import { v4 as uuidv4 } from 'uuid'

import ThumbnailModel from '@/model/ThumbnailModel'
import { postCreateThumbnailId } from '@/api/thumbnailApi'
import { ImportProgressStatus } from '@/constants'

import {
    isExist as isThumbnailExist,
    find as findByExtendId,
    findByProjectId as thumbnailFindByProjectId
} from '@/universal/datastore/thumbnailDao'

import { find as findProjectById } from '#/datastore/projectDao'

// import { TSImageIOManager } from '@/utils/tsImageIOManager';
// import ThumbnailViewModel from '@/viewModel/thumbnailViewModel';
import tsFilePathUtils from '@/utils/tsFilePathUtils'
import FileUtils from '@/utils/FileUtils'
import DBIpcRender from '@/irender/DBIpcRender'
import { THUMBNAIL_TABLE, PROJECT_TABLE } from '#/types/config'

// import PaletteParamsViewModel from '@/viewModel/paletteParamsViewModel';
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
import store from '@/store'
import { PALETTE_PRESETS_CFG_TABLE } from '@/universal/types/config'
import imageIOManager from '@/qt-ipc/imageIOManager'
import { PresetSuitIdType } from '@/constants/constants'

async function newThumbnailModel(data) {
    const presetSuitModel = await PresetSuitModel.noneEffectModel(data.userId)
    const model = new ThumbnailModel()
    model.projectId = data.projectId
    model.originalImagePath = data.imagePath
    model.imgFormat = data.imgFormat
    model.createLink(null, data.projectId, data.userId)
    model.id = data.imageId
    model.importParentPath = data.importParentPath
    model.isValid = true
    model.importTimes = data.importTimes
    model.presetSuitId = presetSuitModel.id
    model.presetId = presetSuitModel.beautifyPresetId
    model.needCheck = false

    return model
}

function distinctThumbnail(a, b) {
    let arr = a.concat(b)
    let result = []
    let obj = {}

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i)
            obj[i] = 1
        }
    }

    return result
}

function createThumbnailInsertString(data) {
    const str = `INSERT INTO ${THUMBNAIL_TABLE} (id,extendId, userId, projectId, originalImagePath, thumbnailImagePath, presetId,orderId,isFavourite,optStatus, update_time, created_time,rotation,imgFormat,importTimes,originalWidth,originalHeight,isValid,palettePresetId, importParentPath,presetSuitId, errorReport, cropFinish) VALUES(
      ${data.id},
      '${data.extendId}',
      ${data.userId},
      ${data.projectId},
      '${data.originalImagePath}',
      '${data.thumbnailImagePath}',
      '${data.presetId}',
      ${data.orderId},
      ${data.isFavourite},
      ${data.optStatus},
      ${data.update_time || null},
      ${data.created_time || null},
      ${data.rotation || 0},
      ${data.imgFormat},
      ${data.importTimes},
      ${data.originalWidth},
      ${data.originalHeight},
      ${data.isValid},
      '${data.palettePresetId}',
      '${data.importParentPath}',
      '${data.presetSuitId}',
      ${data.errorReport},
      ${data.cropFinish}
    )`
    return str
}

function createPaletteInsertString(data) {
    const str = `INSERT INTO ${PALETTE_PRESETS_CFG_TABLE} (
                    id,
                    userId,
                    sourceType,
                    update_time,
                    created_time,
                    version,

                    ColorTemperatureParamFlag,
                    ColorTemperatureRelativeValue,
                    ColorTemperatureValue,

                    HueParamFlag,
                    HueRelativeValue,
                    HueValue,

                    ExposureParamFlag,
                    ExposureValue,

                    ContrastParamFlag,
                    ContrastValue,

                    HighlightParamFlag,
                    HighlightValue,

                    ShadowParamFlag,
                    ShadowValue,

                    WhiteParamFlag,
                    WhiteValue,

                    BlackParamFlag,
                    BlackValue,

                    CameraRawSharpenParamFlag,
                    CameraRawSharpenValue,

                    SaturationParamFlag,
                    SaturationValue,

                    EnhanceEditCameraRawVibranceFlag,
                    EnhanceEditCameraRawVibranceValue,

                    hslJson,

                    FilterPath,
                    FilterAlpha,

                    CRDBStrengthValue,
                    CRDBRadiusValue,
                    CRDBDetailValue,
                    projectId

                ) VALUES(
                    '${data.id}',
                    ${data.userId},
                    ${data.sourceType},
                    ${data.update_time | null},
                    ${data.created_time | null},
                    '${data.version}',

                    ${data.ColorTemperatureParamFlag},
                    ${data.ColorTemperatureRelativeValue},
                    ${data.ColorTemperatureValue},

                    ${data.HueParamFlag},
                    ${data.HueRelativeValue},
                    ${data.HueValue},

                    ${data.ExposureParamFlag},
                    ${data.ExposureValue},

                    ${data.ContrastParamFlag},
                    ${data.ContrastValue},

                    ${data.HighlightParamFlag},
                    ${data.HighlightValue},

                    ${data.ShadowParamFlag},
                    ${data.ShadowValue},

                    ${data.WhiteParamFlag},
                    ${data.WhiteValue},

                    ${data.BlackParamFlag},
                    ${data.BlackValue},

                    ${data.CameraRawSharpenParamFlag},
                    ${data.CameraRawSharpenValue},

                    ${data.SaturationParamFlag},
                    ${data.SaturationValue},

                    ${data.EnhanceEditCameraRawVibranceFlag},
                    ${data.EnhanceEditCameraRawVibranceValue},

                    '${data.hslJson}',

                    '${data.FilterPath}',
                    ${data.FilterAlpha},

                    ${data.CRDBStrengthValue},
                    ${data.CRDBRadiusValue},
                    ${data.CRDBDetailValue},
                    ${data.projectId}

                )`
    return str
}

const thumbnailInfo = {
    isValid: false,
    id: -1,
    imgPath: -1,
    imgIndex: -1,
    imgFormat: 1,
    presetSuitId: '-1',
    lastPresetSuitId: '-1',
    presetId: '-1',
    palettePresetId: '-1',
    originWidth: 0,
    originHeight: 0,
    width: 0,
    height: 0
}

export default {
    namespaced: true,

    state: {
        thumbnails: new Map(),// $TODO: check后删除
        activeThumbnail: { ...thumbnailInfo },
        selectImgIndex: null, // 选中的缩略图的索引// $TODO: check后删除
        whiteBalanceBaseCache: new Map(),
        thumbnailSelection: [],

        // 增加缩略图记录的更新时间
        updateTime: null,// $可删除

        thumbSelectionUpdateTime: null,// $可删除
        // 手动取消导入,外部点击了取消的按钮
        cancelImport: false,// $可删除
    },

    getters: {
        getThumbnails: (state, getters, rootState, rootGetters) => {
            if (!state.updateTime) {
                return []
            }
            if (state.thumbnails.size === 0 || !rootGetters['project/activeProject']) {
                return []
            } else {
                return state.thumbnails.get(rootGetters['project/activeProjectId'])
            }
        },
        getSelectedImgIndex: state => {
            return state.selectImgIndex
        },
        whiteBalanceBaseCache: state => state.whiteBalanceBaseCache,
        activeThumbnail: state => state.activeThumbnail,
        activeThumbnailId: state => state.activeThumbnail.id,
        activeThumbnailPath: state => state.activeThumbnail.imgPath,
        activeThumbnailIndex: state => state.activeThumbnail.imgIndex,
        activePresetSuitId: state => {
            if ([PresetSuitIdType.UnSet, PresetSuitIdType.NoEffect].includes(state.activeThumbnail.presetSuitId)) {
                return state.activeThumbnail.presetSuitId
            }
            return state.activeThumbnail.lastPresetSuitId
        },
        thumbnailSelection: state => state.thumbnailSelection,
        updateTime: state => state.updateTime,
        thumbSelectionUpdateTime: state => state.thumbSelectionUpdateTime,
        getEditedCount: state => {
            if (!state.updateTime) {
                return 0
            }

            let editedCount = 0
            // let imageVmQueue = TSImageIOManager.shareInstance().imageViewModelQueue
            // for (const imageVmQueueElement of imageVmQueue) {
            //     let [key,val] = imageVmQueueElement
            //     if (val.optStatus){
            //         editedCount ++
            //     }
            // }
            return editedCount
        },
        // 获得当前项目的图片总张数
        getCurrentTotalCount: (state, getters, rootState, rootGetters) => {
            if (!state.updateTime) {
                return -1
            }
            return -1
        },
        cancelImport: (state) => {
            return state.cancelImport
        }
    },

    mutations: {
        _SetSelectedImgIndex(state, index) {
            state.selectImgIndex = index
        },
        _SetThumbnails(state, thumbs) {
            const { thumbnails, index } = thumbs
            state.thumbnails.set(index, thumbnails)
            state.updateTime = new Date()
        },
        _AppendThumbnails(state, thumbs) {
            const { thumbnails, index } = thumbs
            const before = state.thumbnails.get(index)

            const now = distinctThumbnail(before, thumbnails)//before.concat(thumbnails)

            state.thumbnails.set(index, now)
            state.updateTime = new Date()
        },
        _RemoveThumbnail(state, thumb) {
            const { thumbnails, projectId } = thumb
            let before = state.thumbnails.get(projectId)
            let idx = before.indexOf(thumbnails.imgPath)
            before.splice(idx, 1)
            state.thumbnails.set(projectId, before)
            state.updateTime = new Date()
        },
        _SetActiveThumbnail(state, thumb) {
            state.activeThumbnail.id = thumb.id
            state.activeThumbnail.imgPath = thumb.imgPath
            state.activeThumbnail.imgIndex = thumb.imgIndex
            state.activeThumbnail.imgFormat = thumb.imgFormat
            state.activeThumbnail.presetSuitId = thumb.presetSuitId
            state.activeThumbnail.lastPresetSuitId = thumb.lastPresetSuitId
            state.activeThumbnail.presetId = thumb.presetId
            state.activeThumbnail.palettePresetId = thumb.palettePresetId
            state.activeThumbnail.isValid = thumb.isValid
            state.activeThumbnail.originWidth = 0
            state.activeThumbnail.originHeight = 0
            state.activeThumbnail.width = 0
            state.activeThumbnail.height = 0
        },

        _ResetActiveThumbnail(state) {
            state.activeThumbnail = { ...thumbnailInfo }
        },

        _UpdateActiveThumbnail(state, thumb) {
            for (const key in thumb) {
                state.activeThumbnail[key] = thumb[key]
            }
        },

        _SetWhiteBalanceBaseCache(state, data) {
            state.whiteBalanceBaseCache.set(data.key, data.value)
        },

        _SetThumbSelection(state, data) {
            state.thumbnailSelection = data
        },
        _SetUpdateTime(state, time) {
            state.updateTime = time
        },
        _SetCancelImport: (state, cancelImport) => {
            state.cancelImport = cancelImport
        }

    },

    actions: {
        /**
         *
         * @param commit
         * @param state
         * @param dispatch
         * @param rootGetters
         * @param projectId
         * @param projectName
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_GetThumbnails({ commit, state, dispatch, rootGetters }, { projectId, projectName }) {
            // 注意: 此处获取数据和导入数据时有可能读写并发，导致读到未删的隐藏文件，所以此处待后续 优化数据库插入、删除的实时性。
            let thumbnailModels = await thumbnailFindByProjectId(projectId)

            const thumbnails = []
            let hasNotExistFile = false
            let optStatus = false

            for (const model of thumbnailModels) {
                let imagePath = model.originalImagePath

                if (model.optStatus) {
                    optStatus = true
                }
                thumbnails.push(imagePath)

                if (!await imageIOManager.hasViewModel(imagePath)) {
                    let thumbnailVmInstance = {}
                    thumbnailVmInstance.imgPath = imagePath
                    // 数据库赋不存在的初值
                    thumbnailVmInstance.imgRotation = model.rotation || 0
                    thumbnailVmInstance.optStatus = model.optStatus
                    thumbnailVmInstance.isFavourite = model.isFavourite
                    thumbnailVmInstance.imgFormat = model.imgFormat
                    thumbnailVmInstance.isFileExist = FileUtils.isFileExist(imagePath)
                    await imageIOManager.addAndBindModel(thumbnailVmInstance, model.toJson())
                }

                if (!model.palettePresetId) {
                    // 无"图像调节"预设、插入默认参数
                    await dispatch('ACT_CreateAndBindPalette', { model: model, needInsertModel: false })
                }
            }

            store.commit('changeDownloadActive', optStatus)

            // 更新项目数据
            if (hasNotExistFile || thumbnails.length === 0) {
                const project = rootGetters['project/activeProject']
                dispatch('project/ACT_AsyncUpdateProject', {
                    id: project.id,
                    path: thumbnails.length && thumbnails.length > 0
                        ? project.path
                        : null
                }, { root: true }).catch((e) => {
                    console.error(e)
                })
            } else {
                commit('_SetThumbnails', { thumbnails: thumbnails, index: projectId })
            }

            return Promise.resolve(thumbnails.length)
        },

        /**
         * 创建 图像调节 预设入库 并 绑定缩略图
         * @param dispatch
         * @param thumbnailModel
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_CreateAndBindPalette({ dispatch }, { model, needInsertModel }) {
            let thumbnailModel = model
            // 获取默认预设 设置为 临时预设并插入
            const defaultPaletteParams = await dispatch('presetSuit/ACT_GetPalettePreset', '-1', { root: true })
            defaultPaletteParams.id = uuidv4()
            defaultPaletteParams.sourceType = 2
            defaultPaletteParams.needCheck = false

            await dispatch('presetSuit/ACT_InsertPalettePreset', defaultPaletteParams, { root: true })

            thumbnailModel.palettePresetId = defaultPaletteParams.id

            if (needInsertModel) {
                await DBIpcRender.insertToDB(THUMBNAIL_TABLE, thumbnailModel)
            } else {
                await dispatch('ACT_UpdateThumbnailByKey', {
                    thumbnailModel: thumbnailModel.parseToJson(),
                    updateKeys: ['palettePresetId']
                })
            }
        },

        /**
         *
         * @param commit
         * @param state
         * @param getters
         * @param rootGetters
         * @param imageEL
         * @param isAppend
         * @param importTimes
         * @param progress
         * @param projectId
         * @returns {Promise<number>}
         * @constructor
         */
        async ACT_InsertThumbnail({ dispatch, commit, state, getters, rootGetters }, {
            imageEL,
            isAppend,
            importTimes,
            callback,
            projectId
        }) {
            console.log(`ACT_InsertThumbnail,called...!!!`)
            if (state.cancelImport) {
                const isBeforeCreateThumbnailId = true
                return Promise.resolve([thumbnailMap, imageIds, isBeforeCreateThumbnailId])
            }
            // 从数据库中过滤重复的图片,然后再处理下一步
            let validImageEl = []
            let repeatCount = 0
            for (let i = 0; i < imageEL.length; i++) {
                let it = imageEL[i]
                let { imgPath, imgFormat, importParentPath, width, height } = it
                if (isAppend) { //是追加模式的要加去重处理
                    let extendId = ThumbnailModel.buildExtendId(imgPath, projectId)
                    let findEl = await isThumbnailExist(extendId)
                    if (findEl) { // 重复了则跳过去
                        repeatCount++
                    } else {
                        validImageEl.push(it)
                    }
                } else {
                    validImageEl.push(it)
                }
            }

            if (validImageEl.length === 0) {
                return Promise.resolve([new Map(), []])
            }

            const imageIdsBeginTime = new Date().getTime()
            const imageIds = await postCreateThumbnailId(projectId, validImageEl.length)
            const userId = rootGetters.userId
            console.log(`ACT_InsertThumbnail.postCreateThumbnailId.costTime = ${new Date().getTime() - imageIdsBeginTime}`)

            if (!imageIds || imageIds.length === 0) {
                let error = new Error('获得image的id列表失败')
                callback && callback({ status: ImportProgressStatus.RequestZeroError, total: imageEL.length })
                error.code = -1
                return Promise.reject(error)
            }

            const thumbnails = []
            const thumbnailMap = new Map()
            let overCount = 0
            let maxThumbnailSize = 0
            let finalThumbnailEL = null

            let startTime = new Date()


            let thumbnailModelList = []
            let paletteParamsList = []
            for (let i = 0; i < validImageEl.length; i++) {
                if (state.cancelImport) {
                    // return Promise.reject(`cancel import when importing index = ${i}!!!`)
                    return Promise.resolve([thumbnailMap, imageIds])
                }
                let index = i
                let item = validImageEl[i]
                let { imgPath, imgFormat, importParentPath, width, height } = item
                let imageId = imageIds[i]
                if (width && height && (width * height) > maxThumbnailSize) {
                    finalThumbnailEL = item
                    maxThumbnailSize = width * height
                }

                thumbnails.push(imgPath)
                thumbnailMap.set(imgPath, imageId)
                if (!await imageIOManager.hasViewModel(item)) {
                    setTimeout(() => {
                        overCount += 1
                        if (overCount !== (imageEL.length - 1)) {
                            callback && callback({
                                status: ImportProgressStatus.Importing,
                                total: imageEL.length,
                                over: overCount
                            })
                        } else {
                            callback && callback({
                                status: ImportProgressStatus.ImportingToDB,
                                total: imageEL.length,
                                over: overCount
                            })
                        }
                    }, 0)

                    const thumbnailVmInstance = {}
                    thumbnailVmInstance.imgPath = imgPath
                    thumbnailVmInstance.optStatus = false
                    thumbnailVmInstance.imgFormat = imgFormat
                    thumbnailVmInstance.vmKey = imageId
                    thumbnailVmInstance.isValid = true

                    // 实例化缩略图模型
                    const model = await newThumbnailModel({
                        imagePath: imgPath,
                        imgFormat,
                        imageId,
                        importParentPath,
                        importTimes,
                        userId,
                        projectId
                    })

                    const defaultPaletteParams = await dispatch('presetSuit/ACT_GetPalettePreset', '-1', { root: true })
                    defaultPaletteParams.id = uuidv4()
                    defaultPaletteParams.sourceType = 2
                    defaultPaletteParams.needCheck = false
                    defaultPaletteParams.projectId = projectId

                    model.palettePresetId = defaultPaletteParams.id

                    if (state.cancelImport) {
                        return Promise.resolve([thumbnailMap, imageIds])
                    }
                    thumbnailModelList.push(createThumbnailInsertString(model))
                    paletteParamsList.push(createPaletteInsertString(defaultPaletteParams))

                    await imageIOManager.addAndBindModel(thumbnailVmInstance, model)
                }
            }

            if (thumbnailModelList.length > 0) { // 为空则不走事务添加到数据库
                console.log('ACT_InsertThumbnail start ', imageEL.length)

                if (state.cancelImport) {
                    return Promise.resolve(thumbnailMap)
                }


                let map = new Map()
                map.set(THUMBNAIL_TABLE, thumbnailModelList)
                map.set(PALETTE_PRESETS_CFG_TABLE, paletteParamsList)

                let transactionBefore = new Date().getTime()
                try {
                    let result = await DBIpcRender.transactionRequestDB(map)
                } catch (e) {
                    console.error('导入事务提交error: ', e)
                }
                let useTransaction = new Date().getTime() - transactionBefore
                console.log('import 插入数据库 事务处理 耗时： ' + useTransaction)
                console.log('ACT_InsertThumbnail use time : ', (new Date() - startTime))
            }

            callback && callback({
                status: ImportProgressStatus.Importing,
                total: imageEL.length,
                over: overCount
            })


            if (state.cancelImport) {
                return Promise.resolve([thumbnailMap, imageIds])
            }
            let project = await findProjectById(projectId)
            if (project && maxThumbnailSize > (project.thumbnailMaxWidth * project.thumbnailMaxHeight)) {
                project.thumbnailMaxWidth = finalThumbnailEL.width
                project.thumbnailMaxHeight = finalThumbnailEL.height
                await DBIpcRender.updateAll(PROJECT_TABLE, project)
            }

            return Promise.resolve([thumbnailMap, imageIds])
        },

        // 更新 缩略图信息
        async ACT_UpdateThumbnail({ commit, state }, thumbnailModel) {
            await DBIpcRender.updateAll(THUMBNAIL_TABLE, thumbnailModel)
        },

        // 更新 缩略图 指定key
        async ACT_UpdateThumbnailByKey({ commit, state }, { thumbnailModel, updateKeys }) {
            await DBIpcRender.updateByKeys(THUMBNAIL_TABLE, thumbnailModel, updateKeys)
        },

        /**
         * 批量更新缩略图
         * @param commit
         * @param state
         * @param ids
         * @param updateKeys
         * @param data
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_BatchUpdateThumbnailByKey({ commit, state }, { ids, updateKeys, data, viewModelKeys }) {
            for (const key of updateKeys) {
                await DBIpcRender.updateBatchForValue(THUMBNAIL_TABLE, ids, key, data[key], viewModelKeys)
            }
        },

        /**
         * 删除缩略图
         * @param thumb
         * @returns {Promise<unknown>}
         * @constructor
         */
        ACT_DeleteThumbnail({ commit, rootGetters, dispatch }, thumb) {
            return new Promise(async (resolve, reject) => {
                // TSImageIOManager.shareInstance().deleteThumbnailItem(thumb.imgPath)
                commit('_RemoveThumbnail', {
                    thumbnails: thumb,
                    projectId: rootGetters['project/activeProjectId']
                })

                const id = thumb.thumbnailModel ? thumb.thumbnailModel.id : null

                if (id) {
                    let res = await DBIpcRender.delete(THUMBNAIL_TABLE, 'id', id)
                    if (res) {
                        let filePath = tsFilePathUtils.getThumbnailsPath(thumb.thumbnailModel.id)
                        if (thumb.thumbnailModel.palettePresetId) {
                            dispatch('presetSuit/ACT_BatchDeletePalettePreset', { ids: [thumb.thumbnailModel.palettePresetId] }, { root: true })
                        }
                        try {
                            await FileUtils.deleteFolder(filePath)
                        } catch (e) {
                            console.error(e)
                        }
                        resolve(res)
                    }
                }
            })
        },
        /**
         * 批量更新预设数据
         * @param ids
         * @param key
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_BatchDeleteThumbnail({ commit, state }, { ids, key = 'id' }) {
            if (!ids || ids.length === 0) {
                return Promise.reject('ACT_BatchDeleteThumbnail.Can not input the empty id!!!')
            }
            if (ids.length === 1) {
                await DBIpcRender.delete(THUMBNAIL_TABLE, key, ids[0])
            } else {
                await DBIpcRender.batchDelete(THUMBNAIL_TABLE, key, ids)
            }
        },
        /**
         * 删除缩略图通过 项目ID
         * @param commit
         * @param state
         * @param projectId
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_DeleteThumbnailByProject({ commit, state }, projectId) {
            await DBIpcRender.delete(THUMBNAIL_TABLE, 'projectId', projectId)
        },

        /**
         * 更新数据库lastPresetSuitId，以及保存presetSuitId, presetId
         * @param commit
         * @param state
         * @param presetSuitId
         * @returns {Promise<void>}
         */
        async ACT_UpdatePresetSuitId({ commit, state }, args) {
            // let { presetSuitId, presetId } = args
            // let updateData = { presetSuitId, presetId }
            //
            // // if (presetSuitId !== '0' &&
            // //     state.activeThumbnail.lastPresetSuitId !== presetSuitId
            // // ) {
            // //     let lastPresetSuitId = presetSuitId
            // //     updateData = { presetSuitId, presetId, lastPresetSuitId }
            // //
            // //     let dataDB = { lastPresetSuitId, id: state.activeThumbnail.id }
            // //     await DBIpcRender.updateByKeys(THUMBNAIL_TABLE, dataDB, ['lastPresetSuitId'])
            // // }

            commit('_UpdateActiveThumbnail', args)
        }
    }
}
