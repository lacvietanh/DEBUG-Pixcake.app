// 精修场景
import { ImageType } from '@/universal/types/constants'
import { ActionContext } from 'vuex'
import BeautifyParamsViewModel from '@/view-model/beautifyParamsViewModel'
import PaletteParamsViewModel from '@/view-model/paletteParamsViewModel'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import { IOptionObject } from '@/types'
import {
    IBaseValue,
    IDefaultMode,
    INavbarDots,
    IOriginImgData, IParamsViewModel, IPresetSettingCache,
    IState,
    ISymmetryStatusJson
} from '@/types/refine-store'
import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { OpenGLType } from '@/universal/types/config'
import { ICropAndRotateObject } from '@/types/refine'
import { ICheckboxCacheObject, IFormatCheckJson } from '@/types/preset'
import { defaultSyncCheckboxSettings } from '@/constants/presetParams/presetParamsGroup'
import { IpcRendererTopic } from '@/qt-ipc/constants/common'
import { IpcRendererAsync } from '@/utils/ipcRenderAsync'
import { isEqual } from 'lodash'

const state: IState = {
    isDisableHeadView: false,
    activeNavName: 'beauty',
    originImgData: {
        dpi: 0,
        width: 0,
        height: 0,
        face: [],
        cropWidth: 0,
        cropHeight: 0
    },

    // 参数面板所需参数
    personType: 'Female',
    extendInfo: {},

    baseValue: { oriWbICC: 0, oriWbTint: 0, loaded: false },
    defaultMode: {
        bgCleanModeDefault: -1,
        bgCleanMooreModeDefault: -1
    },
    symmetryStatusJson: null,
    skyExtendInfo:{},

    oriParamsObj: {
        imgFormat: -1,

        beautifyViewModel: null,
        beautifyParams: {},

        paletteViewModel: null,
        paletteParams: {}
    },

    currParamsObj: {
        beautifyParams: {},
        beautifyUpdateTime: 0,

        paletteParams: {},
        paletteUpdateTime: 0
    },

    navbarDots: {
        color: false,
        beautify: false,
        background: false,
        history: false
    },

    cropInitObject: {
        type: 0,
        width: 1,
        height: 1,
        dpi: 30,
        unit: 0,
        flipX: 1,
        flipY: 1,
        rotate: 0
    },

    isOnlyPaletteEffect: false,

    syncPresetSettingCache: {
        isSaveSyncSetting: false,
        settingCache: {
            params: [],
            effects: [],
            crop: [],
            algoVersion: []
        },
        checkboxCache: defaultSyncCheckboxSettings
    }
}

export default {
    namespaced: true,
    state,

    getters: {
        isDisableHeadView: (state: IState): boolean => state.isDisableHeadView,
        isOnlyPaletteEffect: (state: IState): boolean => state.isOnlyPaletteEffect,

        originImgData: (state: IState): IOriginImgData => state.originImgData,
        personType: (state: IState): string => state.personType,
        activeNavName: (state: IState): string => state.activeNavName,
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        imgFormat: (state: IState, getters: any, rootState: any, rootGetters: any): number => rootGetters['thumbnail/activeThumbnail']?.imgFormat,
        isRaw: (state: IState, getters: any): boolean => getters.imgFormat === ImageType.Raw,
        imageType: (state: IState, getters: any): string => getters.isRaw ? 'raw' : 'jpeg',
        baseValue: (state: IState): IBaseValue => state.baseValue,
        bgCleanModeDefault: (state: IState): number => state.defaultMode.bgCleanModeDefault,
        bgCleanMooreModeDefault: (state: IState): number => state.defaultMode.bgCleanMooreModeDefault,
        extendInfo: (state: IState): any => state.extendInfo,
        skyExtendInfo: (state: IState): any => state.skyExtendInfo,

        oriPaletteParams: (state: IState): IOptionObject<number | string> => state.oriParamsObj.paletteParams,
        oriBeautifyParams: (state: IState): IOptionObject<number | string> => state.oriParamsObj.beautifyParams,

        lastPaletteParams: (state: IState): IOptionObject<number | string> => state.currParamsObj.paletteParams,
        lastBeautifyParams: (state: IState): IOptionObject<number | string> => state.currParamsObj.beautifyParams,

        currBtUpdateTime: (state: IState): number => state.currParamsObj.beautifyUpdateTime,
        currPtUpdateTime: (state: IState): number => state.currParamsObj.paletteUpdateTime,

        isInitOver(state: IState, getters: any): boolean {
            return Object.keys(getters.oriBeautifyParams).length > 0
                && Object.keys(getters.oriPaletteParams).length > 0
                && Object.keys(getters.lastBeautifyParams).length > 0
                && Object.keys(getters.lastPaletteParams).length > 0
        },

        isOriParams(state: IState, getters: any): boolean {
            if (!getters.isInitOver) return true
            const palette = isEqual(getters.oriPaletteParams, getters.lastPaletteParams)
            const beautify = isEqual(getters.oriBeautifyParams, getters.lastBeautifyParams)
            return palette && beautify
        },

        // 根据gpu开关区分是否开启实时
        enableRealtime: (state: IState, getters: any, rootState: any, rootGetters: any): boolean => {
            const openGLType = rootGetters['config/enableOpenGLType']
            return openGLType !== OpenGLType.kSoftwareOpenGL
        },
        symmetryStatusJson: (state: IState): null | ISymmetryStatusJson => state.symmetryStatusJson,

        navbarDots: (state: IState): INavbarDots => state.navbarDots,
        cropInitObject: (state: IState): ICropAndRotateObject => state.cropInitObject,

        // 预设同步设置
        isSaveSyncSetting: (state: IState): boolean => state.syncPresetSettingCache.isSaveSyncSetting,
        syncPresetSettingCache: (state: IState): IFormatCheckJson => state.syncPresetSettingCache.settingCache,
        syncPresetCheckboxCache: (state: IState): ICheckboxCacheObject => state.syncPresetSettingCache.checkboxCache
    },

    mutations: {
        _SetIsDisableHeadView(state: IState, isDisableHeadView: boolean): void {
            state.isDisableHeadView = isDisableHeadView
        },

        _SetActiveNavName(state: IState, value: string): void {
            state.activeNavName = value
        },

        // 覆盖原图数据
        _SetOriginImgData(state: IState, originImgData: IOriginImgData): void {
            state.originImgData = Object.assign(state.originImgData, originImgData)
        },

        // 修改性别
        _SetPersonType(state: IState, value: string): void {
            if (['Male', 'Female', 'Child', 'Older'].includes(value)) {
                state.personType = value
            } else {
                state.personType = 'Female'
            }
        },

        // 重置数据
        _ResetImageExtraData(state: IState): void {
            state.baseValue = { oriWbICC: 0, oriWbTint: 0, loaded: false }
            state.defaultMode.bgCleanModeDefault = -1
            state.defaultMode.bgCleanMooreModeDefault = -1
        },

        _SetExtendInfo(state: IState, data: any): void {
            state.extendInfo = data
        },

        _SetSkyExtendInfo(state: IState, data:any): void{
            state.skyExtendInfo = data
        },

        // Raw 图所需数据
        _SetBaseValue(state: IState, data: IBaseValue): void {
            const { oriWbICC, oriWbTint, loaded, isRaw } = data
            if (oriWbICC === state.baseValue.oriWbICC && oriWbTint === state.baseValue.oriWbTint) {
                return
            }

            state.baseValue = { oriWbICC, oriWbTint, loaded }

            // 更新色温色调数据
            const paletteViewModel = state.oriParamsObj.paletteViewModel
            if (paletteViewModel) {
                const obj = { ...state.oriParamsObj.paletteParams }
                const colorTemperature = paletteViewModel.getParamModel(EffectParamEnum.EnhanceEditColorTemperature)
                const enhanceEditHue = paletteViewModel.getParamModel(EffectParamEnum.EnhanceEditHue)
                if (isRaw) {
                    colorTemperature.setBaseValue(oriWbICC)
                    enhanceEditHue.setBaseValue(oriWbTint)
                    obj['EnhanceEditColorTemperature'] = colorTemperature.getIntValue()
                    obj['EnhanceEditHue'] = enhanceEditHue.getIntValue()
                } else {
                    colorTemperature.resetBaseValue()
                    obj['EnhanceEditColorTemperature'] = colorTemperature.getIntValue()
                    obj['EnhanceEditHue'] = enhanceEditHue.getIntValue()
                }
                state.oriParamsObj.paletteParams = obj
            }
        },

        // 背景去瑕疵模式
        _SetDefaultMode(state: IState, data: IDefaultMode): void {
            const { bgCleanModeDefault, bgCleanMooreModeDefault } = data
            state.defaultMode.bgCleanModeDefault = bgCleanModeDefault
            state.defaultMode.bgCleanMooreModeDefault = bgCleanMooreModeDefault

            const beautifyViewModel = state.oriParamsObj.beautifyViewModel
            if (beautifyViewModel) {
                beautifyViewModel.updateBgCleanMode(bgCleanModeDefault)
                beautifyViewModel.updateBgCleanMooreMode(bgCleanMooreModeDefault)
                state.oriParamsObj.beautifyParams = beautifyViewModel.parseToComponent()
            }
        },

        _SetOriParams(state: IState, data: IParamsViewModel): void {
            state.oriParamsObj = data
        },

        _SetCurrParams(state: IState, data: IParamsViewModel): void {
            state.currParamsObj.paletteParams = data.paletteParams
            state.currParamsObj.beautifyParams = data.beautifyParams
            state.currParamsObj.beautifyUpdateTime = +new Date()
            state.currParamsObj.paletteUpdateTime = +new Date()
        },

        _ResetCurrParams(state: IState): void {
            state.currParamsObj.paletteParams = {}
            state.currParamsObj.beautifyParams = {}
        },

        _SetBeautifyParams(state: IState, viewModel: BeautifyParamsViewModel): void {
            if (viewModel) {
                state.currParamsObj.beautifyParams = viewModel.parseToComponent()
                state.currParamsObj.beautifyUpdateTime = +new Date()
            }
        },

        _UpdateBeautifyParams(state: IState, data: IOptionObject<number | string>): void {
            const { key, value } = data
            if (state.currParamsObj.beautifyParams.hasOwnProperty(key)) {
                state.currParamsObj.beautifyParams[key] = value
            }
        },

        _SetPaletteParams(state: IState, viewModel: PaletteParamsViewModel): void {
            if (viewModel) {
                state.currParamsObj.paletteParams = viewModel.parseToComponent()
                state.currParamsObj.paletteUpdateTime = +new Date()
            }
        },

        _UpdatePaletteParams(state: IState, data: IOptionObject<number | string>): void {
            const { key, value } = data
            if (state.currParamsObj.paletteParams.hasOwnProperty(key)) {
                state.currParamsObj.paletteParams[key] = value
            }
        },

        _ClearParamsObjCache(state: IState): void {
            state.oriParamsObj = {
                imgFormat: -1,
                beautifyViewModel: null,
                beautifyParams: {},

                paletteViewModel: null,
                paletteParams: {}
            }

            state.currParamsObj = {
                beautifyParams: {},
                beautifyUpdateTime: 0,

                paletteParams: {},
                paletteUpdateTime: 0
            }
        },

        _SetSymmetryStatusJson(state: IState, data: ISymmetryStatusJson): void {
            state.symmetryStatusJson = data
        },

        _SetNavbarDots(state: IState, data: { [key in keyof INavbarDots]?: boolean }): void {
            state.navbarDots = {
                ...Object.assign(state.navbarDots, data)
            }
        },

        _ResetNavbarDots(state: IState): void {
            state.navbarDots = { color: false, beautify: false, background: false, history: false }
        },

        _SetCropInitObject(state: IState, obj: ICropAndRotateObject): void {
            state.cropInitObject = obj
        },

        _SetIsOnlyPaletteEffect(state: IState, bool: boolean): void {
            state.isOnlyPaletteEffect = bool
        },

        _SetSyncPresetSettingCache(state: IState, data: IFormatCheckJson): void {
            state.syncPresetSettingCache.settingCache = data
            new IpcRendererAsync().on(IpcRendererTopic.OnSavePresetSettings, data)
        },

        _SetSyncPresetCheckboxCache(state: IState, data: ICheckboxCacheObject): void {
            state.syncPresetSettingCache.checkboxCache = data
        },

        _SetIsSaveSyncSetting(state: IState, bool: boolean = true): void {
            if (Object.keys(state.syncPresetSettingCache.checkboxCache).length > 0) {
                state.syncPresetSettingCache.isSaveSyncSetting = bool
            }
        },

        _ClearSyncPresetSettingCache(): void {
            state.syncPresetSettingCache.isSaveSyncSetting = false
            state.syncPresetSettingCache.settingCache = {
                params: [],
                effects: [],
                crop: [],
                algoVersion: []
            }
            state.syncPresetSettingCache.checkboxCache = defaultSyncCheckboxSettings

            new IpcRendererAsync().on(IpcRendererTopic.OnSavePresetSettings, {})
        }
    },

    actions: {
        // 初始化 无效果参数模型
        initOriParamsViewModel({ commit, state, getters, rootGetters }: ActionContext<IState, any>): void {
            const userId = rootGetters['userId']
            const imgFormat = getters.imgFormat

            // 初始化美化参数
            let beautifyViewModel = state.oriParamsObj.beautifyViewModel
            let beautifyParams = state.oriParamsObj.beautifyParams
            if (!state.oriParamsObj.beautifyViewModel) {
                beautifyViewModel = new BeautifyParamsViewModel(null, null, userId)
                beautifyParams = beautifyViewModel.parseToComponent()
            }

            // 初始化色彩参数
            let paletteViewModel = state.oriParamsObj.paletteViewModel
            let paletteParams = state.oriParamsObj.paletteParams
            if (state.oriParamsObj.imgFormat !== imgFormat || !state.oriParamsObj.paletteViewModel) {
                paletteViewModel = new PaletteParamsViewModel({
                    userId,
                    imgFormat,
                    json: PalettePresetCfgModel.default().toCfgJson()
                })
                paletteParams = paletteViewModel.parseToComponent()
            }

            commit('_SetOriParams', {
                imgFormat,
                beautifyViewModel,
                paletteViewModel,
                paletteParams,
                beautifyParams
            })
        },

        updateCurrParamsViewModel({ commit }: ActionContext<IState, any>, data: any): void {
            const { beautifyViewModel, paletteViewModel } = data
            const beautifyParams = beautifyViewModel.parseToComponent()
            const paletteParams = paletteViewModel.parseToComponent()

            commit('_SetCurrParams', {
                beautifyViewModel,
                paletteViewModel,
                paletteParams,
                beautifyParams
            })
        },

        updatePersonTypeByFaces({ commit }: ActionContext<IState, any>, faces: any[]): void {
            let personType = 'Female'

            if (faces && faces.length > 0) {
                if (faces.some(face => face.gender === 2 && face.age > 12 && face.age < 55)) {
                    personType = 'Female'
                } else if (faces.some(face => face.gender === 1 && face.age > 12 && face.age < 55)) {
                    personType = 'Male'
                } else if (faces.some(face => face.age <= 12)) {
                    personType = 'Child'
                } else if (faces.some(face => face.age >= 55)) {
                    personType = 'Older'
                }
            }

            commit('_SetPersonType', personType)
        }
    }
}
