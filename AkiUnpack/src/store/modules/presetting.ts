import { IState } from '@/types/store/presetSuit'

import { IpcRendererTopic } from '@/qt-ipc/constants/common'
import { IpcRendererAsync } from '@/utils/ipcRenderAsync'

import { batchDeletePresetByApi, deleteSettingByApi, getPresetClass } from '@/api/settingApi'
import DBIpcRender from '@/irender/DBIpcRender'

import { PRESETS_SUIT_TABLE } from '@/universal/types/config'
import { find as findPresetSuit, findSystemAll, findUserAll } from '@/universal/datastore/presetSuitDao'

import { presetTreeModuleDeal, formatPresetsModel } from '@/utils/presetDeal'

import PresetSuitModel from '@/model/presetSuit/PresetSuitModel.ts'
import BeautifyParamsViewModel from '@/view-model/beautifyParamsViewModel'
import PaletteParamsViewModel from '@/view-model/paletteParamsViewModel'
import { ActionContext } from 'vuex'

const state: IState = {
    isLoadPresetSuccess: false,
    recommendPreItems: [],
    preItems: [],
    selectPreset: null,
    oriPreset: null,
    oriBeautifyParams: null,
    oriPaletteParams: null,
    /**
     * 预设改造
     */
    preset_class: [],
    preset_class_origin: [],
    preset_tree: [],
    preset_defaultExpend_keys: [],
    presetsCache: new Map(),
    isExpandFirstPhoto: false
}

export default {
    state,
    mutations: {
        setCachePreset(state: IState, data: any) {
            let { presetID, preset } = data
            state.presetsCache.set(presetID, preset)
        },
        setSelectPreset(state: IState, preset: any) {
            state.selectPreset = preset
        },
        clearAllPresets(state: any) {
            state.recommendPreItems = []
            state.preItems = []
            state.presetsCache.clear()
            state.preset_class_origin = []
            state.preset_class = []
        },
        setRecommendItems(state: IState, item: any) {
            state.recommendPreItems = item
        },
        setMyPreItems(state: IState, item: any) {
            state.preItems = item
        },
        addRecommendItem(state: IState, item: any) {
            state.recommendPreItems.push(item)
        },
        removeRecommendItem(state: IState, item: any) {
            const index = state.recommendPreItems.indexOf(item)
            if (index > -1) {
                state.recommendPreItems.splice(index, 1)
            }
        },
        addPreItem(state: IState, item: any) {
            state.preItems.push(item)
        },
        addPreItemToFront(state: IState, item: any) {
            state.preItems.unshift(item)
        },
        removePreItem(state: IState, item: any) {
            const index = state.preItems.indexOf(item)
            if (index > -1) {
                state.preItems.splice(index, 1)
            }
        },

        setPresetClassOrigin(state: IState, data: any) {
            state.preset_class_origin = data || []
            state.preset_class = data.map((item: any) => ({
                label: item.name,
                value: item.id,
                type: item.type
            }))
        },
        //添加-默认展开节点预设
        addPresetDefaultExpendKeys(state: IState, key: string) {
            if (state.preset_defaultExpend_keys.indexOf(key) == -1)
                state.preset_defaultExpend_keys.push(key)
        },
        //移除-默认展开节点预设
        removePresetDefaultExpendKeys(state: IState, key: string) {
            if (state.preset_defaultExpend_keys.indexOf(key) != -1)
                state.preset_defaultExpend_keys = state.preset_defaultExpend_keys.filter((item) => {
                    return item != key
                })
        },
        //清空默认展开的预设
        removeALlPresetDefaultExpendKey(state: IState) {
            state.preset_defaultExpend_keys = []
        },
        //以及设置是否需要加载第一张照片预设所在节点
        setIsExpandFirstPhoto(state: IState, val: boolean) {
            state.isExpandFirstPhoto = val
        },

        _SetLoadPresetSuccess(state: IState, bool: boolean) {
            state.isLoadPresetSuccess = bool
        }
    },
    getters: {
        isLoadPresetSuccess: (state: IState) => state.isLoadPresetSuccess,

        presetTree: (state: IState) => {
            const resClass = state.preset_class_origin
            const recommendClass = resClass.find(item => item.type === 1)
            let resItem = state.preItems

            // 如果存在推荐预审
            if (recommendClass) {
                const oriPreset = JSON.parse(JSON.stringify(state.oriPreset))
                oriPreset.classId = recommendClass.id
                resItem = state.preItems.concat(state.recommendPreItems).concat(oriPreset)
            }

            return presetTreeModuleDeal(resClass, resItem)
        },

        getRecommendItems: (state: IState) => {
            return state.recommendPreItems
        },

        getPreClass: (state: IState) => {
            return state.preset_class_origin
        },

        getPreItems: (state: IState) => {
            return state.preItems
        },

        oriPreset: (state: IState) => {
            return state.oriPreset
        },

        preset_defaultExpend_keys: (state: IState) => {
            return state.preset_defaultExpend_keys
        },

        isExpandFirstPhoto: (state: IState) => {
            return state.isExpandFirstPhoto
        }
    },
    actions: {
        getPresetSuitByCache({ state }: ActionContext<IState, any>, presetSuitId: number) {
            return state.preItems.find(model => model.id === presetSuitId + '')
        },

        async init_ori_preset({ state, commit }: ActionContext<IState, any>, param: { userId: number }) {
            let {
                userId
            } = param
            state.oriPreset = await PresetSuitModel.noneEffectModel(userId)

            const bPath = await state.oriPreset.beautifyPresetCfgPath()
            const json = await BeautifyParamsViewModel.readJsonFromPath(bPath)
            const beautifyVModel = new BeautifyParamsViewModel(json, null, userId, bPath)
            state.oriBeautifyParams = await beautifyVModel.parseToComponent()

            const pPath = await state.oriPreset.palettePresetCfgPath()
            const fsVModel = new PaletteParamsViewModel({
                path: pPath,
                userId: userId
            })
            state.oriPaletteParams = fsVModel.parseToComponent()
        },

        // 从数据库加载预设
        async loadPresetsFromDb({ commit }: ActionContext<IState, any>, { userId }: { userId: number }) {
            try {
                const res = await Promise.all([findSystemAll(), findUserAll(userId)])
                const recommends = await formatPresetsModel(res[0] || [], userId)
                const preItems = await formatPresetsModel(res[1] || [], userId)
                // //推荐预设使用系统给的顺序来排
                recommends.sort((a, b) => {
                    if (a.orderId === b.orderId) return a.id - b.id
                    return a.orderId - b.orderId
                })
                commit('setRecommendItems', recommends)
                commit('setMyPreItems', preItems)
                commit('_SetLoadPresetSuccess', true)
                return Promise.resolve()
            } catch (e) {
                return Promise.reject(e)
            }
        },

        /**
         * 通知主进程 下载预设（无回调）
         * @param commit
         * @param state
         * @param rootState
         * @param dispatch
         * @param userId
         * @param forceReload 选择性更新
         * @param loadDb 强制更新
         * @param backstageLoad 云端下载数据库
         * @returns {Promise<never>}
         */
        async loadAllPresents({ commit, state, rootState, dispatch }: ActionContext<IState, any>, {
            userId,
            forceReload = false,
            loadDb = false,
            backstageLoad = true
        }: any) {
            if (userId <= 0) {
                return
            }

            //直接取缓存，不更新
            if (!forceReload && !loadDb) {
                const recommend = state.recommendPreItems
                const preItems = state.preItems
                if (recommend && recommend.length > 0 && preItems && preItems.length > 0) {
                    return
                }
            }

            //从云端获取数据对比数据库，选择性更新
            try {
                let flag = false
                if (backstageLoad || forceReload) {
                    const ipcAsync = new IpcRendererAsync()
                    const { data } = await ipcAsync.on(IpcRendererTopic.LoadCloudPresetSuit, { userId })
                    const { userId: uid, systemIds, userIds } = data
                    if (uid === userId && (systemIds.length > 0 && userIds.length > 0)) {
                        flag = true
                    }
                }

                //强制更新
                if (loadDb || flag) {
                    await dispatch('loadPresetsFromDb', { userId })
                }


            } catch (e) {
                return Promise.reject(e)
            }
        },

        // // 删除预设（单条）
        async deletePreset({}, payLoad: any) {
            try {
                await deleteSettingByApi(payLoad.id)
                let dbItem = await findPresetSuit(payLoad.id)
                dbItem.disable = true
                await DBIpcRender.updateByKeys(PRESETS_SUIT_TABLE, dbItem, ['disable'])
                return Promise.resolve()
            } catch (e) {
                return Promise.reject(e)
            }
        },

        // 批量删除预设
        async batchDeletePresetStore({}, payLoad: any) {
            try {
                let count = 0
                await batchDeletePresetByApi(payLoad.ids)
                for (const item of JSON.parse(payLoad.ids)) {
                    let dbItem = await findPresetSuit(item.id)
                    dbItem.disable = true
                    await DBIpcRender.updateByKeys(PRESETS_SUIT_TABLE, dbItem, ['disable'])
                    count++
                    if (count === JSON.parse(payLoad.ids).length) {
                        return Promise.resolve()
                    }
                }
            } catch (e) {
                return Promise.reject(e)
            }

        },

        async getPresetClass({ commit, state }: ActionContext<IState, any>, payLoad = false) {
            if (state.preset_class.length > 0 && !payLoad) {
                return
            }

            const data = await getPresetClass()
            commit('setPresetClassOrigin', data)
        }
    }
}
