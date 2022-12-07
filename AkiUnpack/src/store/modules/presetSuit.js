import { isEqual } from 'lodash'
import { find as findPaletteDataByDb } from '#/datastore/palletePresetCfgDao'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import fileUtils from '@/utils/FileUtils'
import PresetsDownloader from '@/utils/presetsDownloader'
import { find as findPresetSuit } from '#/datastore/presetSuitDao'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
import DBIpcRender from '@/irender/DBIpcRender'
import { PALETTE_PRESETS_CFG_TABLE, PRESETS_SUIT_TABLE, PRESETS_TABLE } from '#/types/config'
import { PresetSourceType, PresetSuitIdType } from '@/universal/types/constants'
import { findByProjectId as findPaletteDataByProjectId } from '#/datastore/palletePresetCfgDao'
import {
    SKY_LIST,
    FILTER_MATERIAL_LIST,
    BACKGROUND_REPLACE_LIST,
    BACKGROUND_LENGTH,
    MINE_BACKGROUND_LENGTH
} from '@/constants/material-config'
import {deleteMineIdPhotoMaterials, findMineIdPhotoMaterials} from "#/datastore/idPhotoMaterialDao";
import {IdPhotoMaterialModel} from "@/model/MaterialsModel/idPhotoMaterialModel";

const filterList = FILTER_MATERIAL_LIST
const backgroundList = BACKGROUND_REPLACE_LIST
const skyList = SKY_LIST

const oriFilter = {
    name: '无',
    path: '',
    value: 0,
    iconPath: './static/filterIcons/makeup_icon_disable@3x.png',
    isOriginal: true
}

const oriSky = {
    name: '无',
    path: '',
    value: 0,
    iconPath: './static/filterIcons/makeup_icon_disable@3x.png',
    isOriginal: true,
    type: '',
    bgIcon: 'sky_img_default@3x.png'
}

const FILTER_LENGTH = 8
export const IdPhotoUploadStatus = {
    None:0,
    Cancel : -1,
    Begin:1,
    Loading : 2,
    Finished: 3,
}
export default {
    namespaced: true,

    state: {
        palettePresetsCache: new Map(),
        paletteKeyMap: PalettePresetCfgModel.initKeyMap(),
        presetSuitCache: new Map(),
        presetShareTokenMap: new Map(),
        copyPresetJson: null,
        // 我的证件照背景列表
        mineIdPhoto:{
            bgList:[],
            isLoadAll:false
        }
    },

    getters: {
        getStorePresetShareTokenMap(state) {
            return state.presetShareTokenMap
        },

        // 滤镜预设列表
        filterList() {
            return [oriFilter].concat(filterList.map(item => ({
                name: item.Name,
                path: item.Path,
                value: item.Value || 80,
                new: !!item.New,
                iconPath: item.iconPath
            })))
        },
        matchFilterList: (state) => (filterPath) => {
            let list = [oriFilter]
            let selectFilter = null
            if (filterPath) {
                let index = 0
                for (const item of filterList) {
                    if (item.Path === filterPath) {
                        if (index >= 7) {
                            selectFilter = {
                                name: item.Name,
                                path: item.Path,
                                value: item.Value || 80,
                                new: !!item.New,
                                iconPath: item.iconPath
                            }
                            list.push(selectFilter)
                        }
                        break
                    }
                    index++
                }
            }

            let len = FILTER_LENGTH - list.length
            for (const item of filterList) {
                const filter = {
                    name: item.Name,
                    path: item.Path,
                    value: item.Value || 80,
                    new: !!item.New,
                    iconPath: item.iconPath
                }
                if (!selectFilter) {
                    list.push(filter)
                    len--
                } else {
                    if (item && filter.path !== selectFilter.path) {
                        list.push(filter)
                        len--
                    }
                }
                if (len <= 0) {
                    break
                }
            }

            return list
        },

        backgroundList() {
            return [oriFilter].concat(backgroundList.map(item => ({
                name: item.Name,
                path: item.Path,
                value: item.Value,
                new: !!item.New,
                iconPath: item.iconPath
            })))
        },
        mineIdPhotoList(state) {
            return [new IdPhotoMaterialModel(oriFilter)].concat(state.mineIdPhoto.bgList)
        },

        matchBackgroundList() {
            return (backgroundPath) => {
                const list = [oriFilter]
                let selectBackground = null
                if (backgroundPath) {
                    let index = 0
                    for (const item of backgroundList) {
                        if (item.Path === backgroundPath) {
                            if (index >= 9) {
                                selectBackground = {
                                    name: item.Name,
                                    path: item.Path,
                                    value: item.Value || 80,
                                    new: !!item.New,
                                    iconPath: item.iconPath
                                }
                                list.push(selectBackground)
                            }
                            break
                        }
                        index++
                    }
                }

                let len = BACKGROUND_LENGTH - list.length
                for (const item of backgroundList) {
                    const background = {
                        name: item.Name,
                        path: item.Path,
                        value: item.Value,
                        new: !!item.New,
                        iconPath: item.iconPath
                    }
                    if (!selectBackground) {
                        list.push(background)
                        len--;
                    } else {
                        if (item && background.path !== selectBackground.path) {
                            list.push(background)
                            len--;
                        }
                    }
                    if (len <= 0) {
                        break
                    }
                }

                return list
            }
        },
        matchMineIdPhotoBackgroundList(state) {
            return (backgroundPath) => {
                const list = [new IdPhotoMaterialModel(oriFilter)]
                let selectBackground = null
                if (backgroundPath) {
                    let index = 0
                    for (const item of state.mineIdPhoto.bgList) {
                        if (item.path === backgroundPath) {
                            if (index >= MINE_BACKGROUND_LENGTH-1) {
                                selectBackground = item
                                selectBackground.value = item.value || 80
                                list.push(selectBackground)
                            }
                            break
                        }
                        index++
                    }
                }

                let len = MINE_BACKGROUND_LENGTH - list.length
                for (const item of state.mineIdPhoto.bgList) {
                    const background = item
                    if (!selectBackground) {
                        list.push(background)
                        len--;
                    } else {
                        if (item && background.path !== selectBackground.path) {
                            list.push(background)
                            len--;
                        }
                    }
                    if (len <= 0) {
                        break
                    }
                }

                return list
            }
        },

        // sky present list
        skyList() {
            return [].concat(skyList.map(item => ({
                name: item.Name,
                path: item.Path,
                value: item.Value || 80,
                new: !!item.New,
                iconPath: item.iconPath,
                type: item.Type,
                bgIcon: item.BgIcon
            })))
        },
        matchSkyList: (state) => (skyPath) => {
            let list = []
            let selectSky = null
            if (skyPath) {
                let index = 0
                for (const item of skyList) {
                    if (item.Path === skyPath) {
                        if (index >= 7) {
                            selectSky = {
                                name: item.Name,
                                path: item.Path,
                                value: item.Value || 80,
                                new: !!item.New,
                                iconPath: item.iconPath,
                                type: item.Type,
                                bgIcon: item.BgIcon
                            }
                            list.push(selectSky)
                        }
                        break
                    }
                    index++
                }
            }

            let len = FILTER_LENGTH - list.length
            for (const item of skyList) {
                const sky = {
                    name: item.Name,
                    path: item.Path,
                    value: item.Value || 80,
                    new: !!item.New,
                    iconPath: item.iconPath,
                    bgIcon: item.BgIcon
                }
                if (!selectSky) {
                    list.push(sky)
                    len--
                } else {
                    if (item && sky.path !== selectSky.path) {
                        list.push(sky)
                        len--
                    }
                }
                if (len <= 0) {
                    break
                }
            }

            return list
        },
        // 获得我的证件照背景数据
        mineIdPhoto(state){
            return state.mineIdPhoto
        }
    },

    mutations: {
        // 设置 图像调节预设 缓存
        SET_PALETTE_PRESET_CACHE(state, data) {
            state.palettePresetsCache.set(data.id, data.result)
        },

        _CLEAR_PALETTE_PRESET_CACHE(state, data) {
            state.palettePresetsCache.clear()
        },
        _SetPresetSuitCache(state, data) {
            state.presetSuitCache.set(data.id, data.result)
        },
        _SetPresetShareToken(state, { userId, token }) {
            state.presetShareTokenMap.set(token, userId)
        },

        _SetCopyPresetJson(state, { beautifyJson, paletteJson, presetSuitId }) {
            const isNewCopy = !state.copyPresetJson ||
                state.copyPresetJson.presetSuitId !== presetSuitId ||
                (!isEqual(state.copyPresetJson.beautifyJson, beautifyJson) || !isEqual(state.copyPresetJson.paletteJson, paletteJson))

            if (isNewCopy) {
                state.copyPresetJson = {
                    beautifyJson,
                    paletteJson,
                    presetSuitId,
                    presetSuitModel: null
                }
            } else {
                console.log('[_SetCopyPresetJson] presetModel is cached. copyPresetJson: ', state.copyPresetJson)
            }
        },

        _UpdateCopyPresetJson(state, data) {
            state.copyPresetJson.presetSuitModel = data
        },
        //证件照，我的背景
        _UpdateMineIdPhotoBgList(state, data){
            state.mineIdPhoto.bgList = data
        },
        //证件照，我的背景
        _UpdateMineIdPhotoBgIsLoadAll(state, data){
            state.mineIdPhoto.isLoadAll = data
        },
        //证件照，我的背景
        _UpdateMineIdPhoto(state, data){
            state.mineIdPhoto = data
        }
    },

    actions: {
        /*
            我的证件照,查找证件照,按时间降序isShort(true:加载当前用户的前10条，false:加载所有当前用户的)
         */
        async ACT_FindMineIdPhotoBgList({ state, commit, rootGetters, dispatch }, {isShort}){
            let findResults = state.mineIdPhoto.bgList
            const isLoadAll = state.mineIdPhoto.isLoadAll
                if (!isLoadAll){
                    // 从数据库进行查找当前所有
                    findResults = await findMineIdPhotoMaterials(rootGetters.userId,null)
                    commit('_UpdateMineIdPhotoBgIsLoadAll', true)
                }
            let idPhoto = state.mineIdPhoto
            idPhoto.bgList = findResults
            commit('_UpdateMineIdPhoto', idPhoto)
        },
        /*
            data为素材的local_material_id
         */
        async ACT_BatchDeleteMineIdPhotoBgList({ state, commit, rootGetters, dispatch },data){
            let preBgList = state.mineIdPhoto.bgList
            for (let it of data){
                for (let i = 0;i< preBgList.length;i++){
                    const iit = preBgList[i]
                    if (iit.localMaterialId == it){
                        preBgList.remove(iit)
                        break
                    }
                }
            }
        },
        /**
         * 下载预设
         * @constructor
         */
        ACT_DownloadPresetSuit() {

        },

        ACT_CopyPresetJson({ commit }, data) {
            commit('_SetCopyPresetJson', {
                beautifyJson: data.beautifyJson,
                paletteJson: data.paletteJson,
                presetSuitId: data.presetSuitId
            })
        },

        /**
         * 创建预设套装
         * @param data
         * @returns {Promise<*>}
         * @constructor
         */
        async ACT_CreatePresetSuit({ state, commit, rootGetters, dispatch }, data) {
            let presetSuitModel = null
            if (data.presetSuitId === PresetSuitIdType.UnSet) {
                let downloader = new PresetsDownloader()
                presetSuitModel = await downloader.createTempPresetSuit(rootGetters.userId, data.beautifyJson, data.paletteJson)
            } else {
                presetSuitModel = await dispatch('ACT_GetPresetSpecSuit', data.presetSuitId)
                presetSuitModel.paletteModel = await dispatch('ACT_GetPalettePreset', presetSuitModel.palettePresetId)
            }
            commit('_UpdateCopyPresetJson', presetSuitModel)
            return presetSuitModel
        },

        /**
         * 创建拷贝套装
         * @returns {Promise<*|null>}
         * @constructor
         */
        async ACT_CreateCopyPresetSuit({ state, dispatch }) {
            if (state.copyPresetJson) {
                if (state.copyPresetJson.presetSuitModel) {
                    return state.copyPresetJson.presetSuitModel
                }

                return await dispatch('ACT_CreatePresetSuit', state.copyPresetJson)
            }
            return Promise.reject(new Error('请先拷贝效果后再试~'))
        },

        // /**
        //  * 获取套装信息
        //  * @returns {Promise<void>}
        //  * @constructor
        //  */
        // async ACT_GetPresetSuit({ commit, state, getters }) {
        //     try {
        //         const userId = getters.userId
        //         const models = await findAllPresetSuitFromDao(getters.userId)
        //
        //         for (let element of models) {
        //             if (!element.beautifyModel) {
        //                 if (element.beautifyPresetId === '-1') {
        //                     element.beautifyModel = PresetSuitModel.noneBeautifyEffectModel(userId)
        //                 } else {
        //                     element.beautifyModel = await findBeautifyPresetFromDao(element.beautifyPresetId, userId)
        //                 }
        //             }
        //
        //             if (!element.paletteModel) {
        //                 if (element.palettePresetId === '-1') {
        //                     element.paletteModel = PresetSuitModel.nonePaletteEffectModel(userId)
        //                 } else {
        //                     element.paletteModel = await findPalettePresetFromDao(element.palettePresetId, userId)
        //                 }
        //             }
        //
        //             if (element.classifyType === 1) {
        //                 // commit('addRecommendItem', element)
        //             }
        //             if (element.classifyType === 2) {
        //                 // commit('addPreItem', element)
        //             }
        //         }
        //         return Promise.resolve()
        //     } catch (e) {
        //         return Promise.reject(e)
        //     }
        // },

        /**
         * 获取指定套装
         * @param id
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_GetPresetSpecSuit({ commit, state, rootGetters }, id) {
            try {
                if ([-1, '-1'].includes(id)) {
                    return Promise.resolve(PresetSuitModel.noneEffectModel(rootGetters.userId))
                }

                if (state.presetSuitCache.has(id)) {
                    const model = state.presetSuitCache.get(id)
                    return Promise.resolve(model)
                } else {
                    const model = await findPresetSuit(id, rootGetters.userId)
                    commit('_SetPresetSuitCache', {
                        id,
                        result: model
                    })
                    return Promise.resolve(model)
                }
            } catch (e) {
                return Promise.reject(e)
            }
        },

        /**
         * 读取 图像调节预设
         * @param id
         * @returns {Promise<unknown>}
         * @constructor
         */
        async ACT_GetPalettePreset({ commit, state, rootGetters }, id) {
            if ([-1, '-1'].includes(id)) {
                return Promise.resolve(PresetSuitModel.nonePaletteEffectModel(rootGetters.userId))
            }
            // 读取缓存
            if (state.palettePresetsCache.has(id)) {
                //      console.log('[Ethan] [presetSuit] ', 'ACT_GetPalettePreset: ', `get from cache, id: ${ id }`)
                return Promise.resolve(state.palettePresetsCache.get(id))
            } else {
                // const time = new TsBasicTimer()
                const palettePresetCfgModel = await findPaletteDataByDb(id)
                //   console.log('[Ethan] [presetSuit] ', 'ACT_GetPalettePreset: ', `read by db and set to cache, id: ${ id }, time:`)

                // todo 缓存预设（云端预设模型) 临时的调整过会发生改变
                if (PresetSourceType.Cloud === palettePresetCfgModel.sourceType) {
                    commit('SET_PALETTE_PRESET_CACHE', { id, result: palettePresetCfgModel })
                }

                return Promise.resolve(palettePresetCfgModel)
            }
        },


        async ACT_InsertPalettePreset({ commit }, palettePresetCfgModel) {
            await DBIpcRender.insertToDB(PALETTE_PRESETS_CFG_TABLE, palettePresetCfgModel)
        },

        /**
         * 更新图像调节预设数据
         * @param id 图像调节预设ID
         * @param data {[{ ParamFlag: 1, floatValue: 0.5 }]}
         * @param hslJson
         * @param filterPath
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_UpdatePalettePreset({ commit }, { id, data, hslJson, filterPath }) {
            const resMap = {}
            const keys = []

            if (data) {
                data.forEach(param => {
                    let dbKey = PalettePresetCfgModel.initKeyMap().get(param.ParamFlag)
                    if (dbKey) {
                        resMap[dbKey] = param.floatValue
                        keys.push(dbKey)
                    }
                })
            }

            const temp = { id, ...resMap, hslJson: '' }

            if (hslJson) {
                keys.push('hslJson')
                temp.hslJson = JSON.stringify(hslJson)
            }

            if (typeof filterPath === 'string') {
                keys.push('FilterPath')
                temp.FilterPath = filterPath
            }

            if (keys.length > 0) {
                await DBIpcRender.updateByKeys(PALETTE_PRESETS_CFG_TABLE, temp, keys)
            }
            return Promise.resolve()
        },

        /**
         * 批量更新预设数据
         * @param ids
         * @param data {[{ ParamFlag: 1, floatValue: 0.5 }]}
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_BatchUpdatePalettePreset({ commit, state }, { ids, data, keys }) {
            let resMap = new Map()

            data.forEach(param => {
                let dbKey = PalettePresetCfgModel.initKeyMap().get(param.ParamFlag)
                resMap.set(dbKey, param.floatValue)
            })

            const tempArray = []

            for (const [key, value] of resMap) {
                tempArray.push({
                    key,
                    value
                })
            }

            DBIpcRender.updateBatchMoreKeys(PALETTE_PRESETS_CFG_TABLE, ids, tempArray, keys)
            return Promise.resolve()
        },

        /**
         * 批量拷贝原预设数据至临时预设
         * @param fromId
         * @param toId
         * @param toIds
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_CopyPaletteToSelf({ dispatch }, { fromId, toId }) {
            const presetSuitModel = await dispatch('ACT_GetPresetSpecSuit', fromId)
            const palettePresetCfgModel = await dispatch('ACT_GetPalettePreset', presetSuitModel.palettePresetId)
            const params = palettePresetCfgModel.createToDbArray()

            const data = { id: toId }
            const keys = []

            params.forEach(item => {
                data[item.key] = item.value
                keys.push(item.key)
            })

            await DBIpcRender.updateByKeys(PALETTE_PRESETS_CFG_TABLE, data, keys)
            return Promise.resolve()
        },

        /**
         * 批量拷贝原预设数据至临时预设
         * @param copyMap
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_BatchCopyPaletteToSelf({ dispatch }, copyMap) {

            for (const [fromId, toIds] of copyMap) {
                const presetSuitModel = await dispatch('ACT_GetPresetSpecSuit', fromId)
                const palettePresetCfgModel = await dispatch('ACT_GetPalettePreset', presetSuitModel.palettePresetId)
                DBIpcRender.updateBatchMoreKeys(PALETTE_PRESETS_CFG_TABLE, toIds, palettePresetCfgModel.createToDbArray())
            }
            return Promise.resolve()
        },

        /**
         * ++ --  更新预设数据
         * @param id { string }
         * @param data { [{ ParamFlag: 1, floatValue: 0.5 }] }
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_IncreasePalettePreset({ commit, state }, { paletteIds, dbKey, nextStep, viewModelKeys }) {
            DBIpcRender.updateBatchForIncrease(PALETTE_PRESETS_CFG_TABLE, paletteIds, dbKey, nextStep, viewModelKeys)
        },

        /**
         * 批量更新预设数据
         * @param ids
         * @param key
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_BatchDeletePalettePreset({ commit, state }, { ids, key = 'id' }) {
            if (!ids || ids.length === 0) {
                return Promise.resolve()//Promise.reject('ACT_BatchDeletePalettePreset.Can not input the empty id!!!')
            }
            if (ids.length === 1) {
                await DBIpcRender.delete(PALETTE_PRESETS_CFG_TABLE, key, ids[0])
            } else {
                await DBIpcRender.batchDelete(PALETTE_PRESETS_CFG_TABLE, key, ids)
            }
        },
        /**
         * 批量删除美化预设数据
         * @param ids
         * @param key
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_BatchDeleteBeautifyPreset({ commit, state }, { ids, key = 'id' }) {
            if (!ids || ids.length === 0) {
                return Promise.reject('ACT_BatchDeleteBeautifyPreset Can not input the empty id!!!')
            }
            if (ids.length === 1) {
                await DBIpcRender.delete(PRESETS_TABLE, key, ids[0])
            } else {
                await DBIpcRender.batchDelete(PRESETS_TABLE, key, ids)
            }
        },
        /**
         * 批量删除套装预设数据
         * @param ids
         * @param key
         * @returns {Promise<void>}
         * @constructor
         */
        async ACT_BatchDeleteSuitPreset({ commit, state }, { ids, key = 'id' }) {
            if (!ids || ids.length === 0) {
                return Promise.reject('ACT_BatchDeleteSuitPreset Can not input the empty id!!!')
            }
            if (ids.length === 1) {
                await DBIpcRender.delete(PRESETS_SUIT_TABLE, key, ids[0])
            } else {
                await DBIpcRender.batchDelete(PRESETS_SUIT_TABLE, key, ids)
            }
        },
        /**
         * 获取人像美化预设参数
         * @param data
         * @returns {Promise<unknown>}
         * @constructor
         */
        GetBeautifyPreset({ commit, state }, data) {
            return new Promise(async (resolve, reject) => {
                const json = fileUtils.readJsonFromLocal(data)
            })
        },

        /**
         * 更新美化预设
         * @param data
         * @constructor
         */
        UpdateBeautifyPreset({ commit, state }, data) {
            // todo 更新人像美化预设
        },

        /**
         * 单个更新预设
         */
        async ACT_UpdatePresetSuit({ commit }, { data, keys }) {
            const obj = {}
            keys.forEach(key => {
                obj[key] = data[key]
            })
            await DBIpcRender.updateByKeys(PRESETS_SUIT_TABLE, {
                id: data.id,
                ...obj
            }, keys)
        },

        /**
         * 批量更新预设
         */
        async ACT_BatchUpdatePresetSuit({ dispatch }, data) {
            for (const item of data) {
                await dispatch('ACT_UpdatePresetSuit', {
                    data: item.data,
                    keys: item.keys
                })
            }
        },

        async ACT_LoadPresetCfgModel({ commit }, { projectId }) {
            try {
                let paletteList = await findPaletteDataByProjectId(projectId)
                if (paletteList && paletteList.length > 0) {
                    for (const paletteListElement of paletteList) {
                        commit('SET_PALETTE_PRESET_CACHE', { id: paletteListElement.id, result: paletteListElement })
                    }
                }
            } catch (e) {
                console.error(e)
            }

        }
    }
}
