import {
    EFFECTS_CONFIG_R_PATH,
    filterParams,
    PALETTE_PRESET_VERSION,
    TONING_EFFECTS_JSON
} from '@/constants/preset-def'

// @ts-ignore
import fileUtils from '@/utils/FileUtils'
// @ts-ignore
import { joinResourcesPath } from '@/utils/findLocalPath'

import { v4 as uuid } from 'uuid'
import { cloneDeep } from 'lodash'
// @ts-ignore
import TsPaletteHelper from '@/helper/tsPaletteHelper'

import { EffectNameEnum, EffectParamEnum } from '@/constants/presetParams/ParamEnum'

import ParamModel from '@/model/ParamsModel/ParamModel'
import HslParamModel from '@/model/ParamsModel/HslParamModel'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import DBIpcRender from '@/irender/DBIpcRender'
import { PALETTE_PRESETS_CFG_TABLE } from '@/universal/types/config'
import DetailBoostingParamModel from '@/model/ParamsModel/DetailBoostingParamModel'
import WhiteBalanceParamModel from '@/model/ParamsModel/WhiteBalanceParamModel'
import { MemoryMonitor } from '@/utils/monitor/memoryMonitor'
import { ParamFlag } from '@/constants/effect-config'
import EffectGroupModel from '@/model/EffectsModel/EffectGroupModel'
import EffectModel from '@/model/EffectsModel/EffectModel'
import { IOptionObject, Optional } from '@/types'
import { IFormatCheckJson } from '@/types/preset'
import { AlgoVersionEnum, CropEnum } from '@/constants/presetParams/presetConfig'

export type PaletteParamsViewModelConfig = {
    from?: string,
    imgFormat?: number,
    id?: string,
    path?: string,
    json?: object,
    userId: number
}

export default class PaletteParamsViewModel {
    version: string
    paramsMap: Map<string, any>
    optStatus: boolean = false
    newId: null | string = null
    from: null | string = null
    imgFormat: number = 1
    path: string | null = null
    palettePresetCfgModel: PalettePresetCfgModel | null = null
    json: object | null = null
    _isInsertToDb: boolean = false
    userId: number = -1
    effectModel: EffectGroupModel


    constructor({ id, path, from, imgFormat = 1, json, userId }: PaletteParamsViewModelConfig) {
        MemoryMonitor.shareInstance().addObject(this)
        // console.log('[Ethan] [PaletteParamsViewModel] ', 'constructor path: ', path, ' ,json: ', json)
        this.paramsMap = new Map()
        this.version = PALETTE_PRESET_VERSION

        this.effectModel = new EffectGroupModel(TONING_EFFECTS_JSON)

        this.resetViewModelConfig({ id, path, from, imgFormat, json, userId })
    }

    static async getResPath(): Promise<string> {
        return await joinResourcesPath(EFFECTS_CONFIG_R_PATH)
    }

    get isInsertToDb(): boolean {
        return this._isInsertToDb
    }

    get isInit(): boolean {
        return this.paramsMap && this.paramsMap.size > 0
    }

    get isTempPreset(): boolean {
        return !!this.newId
    }

    resetViewModelConfig({ id, path, from, imgFormat, json, userId }: PaletteParamsViewModelConfig): void {
        this.newId = id || null
        this.from = from || null
        this.imgFormat = imgFormat || this.imgFormat
        this.userId = userId

        this.optStatus = !!id
        this._isInsertToDb = !!id

        if (json) this.initDataFromJson(json)
    }

    // 素材资源文件所在路径
    resPath = PaletteParamsViewModel.getResPath

    initDefaultMap(): void {
        let initParams = TsPaletteHelper.shareInstance().getInitParams(this.imgFormat)
        this.paramsMap = cloneDeep(initParams)
    }

    /**
     * 获取指定参数模型
     * @param identify
     */
    getParamModel(identify: string):  any {
        if (!this.isInit) this.initDefaultMap()
        return this.paramsMap.get(identify)
    }

    /**
     * 获取多个参数模型
     * @param identifies
     */
    getParamsModel(identifies: string[]):  any[] {
        if (!this.isInit) this.initDefaultMap()

        let filterList = []
        for (const identify of identifies) {
            if (this.paramsMap.has(identify)) {
                filterList.push(this.paramsMap.get(identify))
            } else {
                if (this.effectModel.isIdentifyKeys(identify)) {
                    const model = this.effectModel.getEffectModel(identify)
                    if (model) {
                        filterList.push(model)
                    }
                }
            }
        }
        return filterList
    }

    /**
     * 绑定 PalettePresetCfgModel 模型并同步参数
     * @param data
     */
    bindCfgModel(data: PalettePresetCfgModel): void {
        if (!data) return
        if (!this.isInit) this.initDefaultMap()

        this.palettePresetCfgModel = data
        let { Params, Effects } = data.toCfgJson()

        this.syncParams(Params, Effects)

        // 重置色温和色调的基准值
        const colorTemplate: WhiteBalanceParamModel = this.getParamModel(EffectParamEnum.EnhanceEditColorTemperature)
        colorTemplate.resetBaseValue()

        const colorHue: WhiteBalanceParamModel = this.getParamModel(EffectParamEnum.EnhanceEditHue)
        colorHue.resetBaseValue()

        // console.log('[Ethan] [PaletteParamsViewModel] ', 'bindCfgModel : ', this.parseToJson())
    }

    // 通过json初始化数据
    initDataFromJson(json: object | null): void {
        if (!json || typeof json !== 'object') return
        if (!this.isInit) this.initDefaultMap()

        this.json = json
        // @ts-ignore
        this.updateParamFromJsonConfig(json)
    }

    updateParamFromJsonConfig(json: { Params: any, ClientConfig?: any, Version: any, Effects: any }): void {
        let { Params, ClientConfig, Version, Effects } = json

        if (Params) {
            const nParams = PaletteParamsViewModel.paramsFormat(Params, `${ Version || '0.0.1' }-${ this.version }`)
            this.syncParams(nParams, Effects)
        }

        if (ClientConfig) {
            this.optStatus = true
            this.newId = ClientConfig.NewId
            this.from = ClientConfig.From
        }
    }

    /*
     * 处理预设版本更新
     * @param params
     * @param version
     */
    static paramsFormat(params: any, version: any): any {
        switch (version) {
            case '0.0.1-1.0.0':
                return params
            default:
                return params
        }
    }

    /**
     * 生成 newId
     */
    createNewId(): void {
        if (!this.newId) {
            this.newId = uuid()
            this._isInsertToDb = false
        }
    }

    syncParams(params: any[], Effects: any[]): void {
        if (params && params.length > 0) {
            TsPaletteHelper.syncParams(this.paramsMap, params)

            const model = this.getParamModel(EffectParamEnum.FilterAlpha)
            if (model) {
                const effect = Effects.find(effect => effect.EffectName === 'Filter')
                TsPaletteHelper.syncFilterPath(model, effect?.Path || '')
            }
        }
        this.effectModel.sync(Effects)
    }

    setOptStatus(): void {
        if (!this.optStatus) {
            this.optStatus = true
            this.createNewId() // 创建newId
        }
    }

    /**
     * 更新本地配置文件
     * @returns {Promise<void>}
     */
    async updateLocalTempConfig(path: string): Promise<void> {
        if (this.optStatus && this.newId) {
            try {
                await fileUtils.writeJsonIntoLocal(path, {
                    ClientConfig: {
                        NewId: this.newId,
                        From: this.from
                    },
                    ...this.parseToJson()
                })
            } catch (err) {
                console.error('写入临时本地配置文件失败')
            }
        }
    }

    /**
     * 重置参数
     * @param key
     * @param value
     */
    resetParam(key: string): any {
        if (!key) return
        if (!this.isInit) this.initDefaultMap()

        const model = this.getParamModel(key)
        if (model) {
            model?.reset()
            return model?.getDataStruct()
        }
        return null
    }

    /**
     * 重置参数
     * @param identifies
     */
    resetParams(identifies: string[]): any {

        if (!identifies) return
        if (!this.isInit) this.initDefaultMap()
        this.setOptStatus()

        const initParamsMap = TsPaletteHelper.shareInstance().getInitParams(this.imgFormat)
        const models = this.getParamsModel(identifies)
        const params: any[] = []

        models.forEach((model: any) => {
            const initModel = initParamsMap.get(model.param)
            if (model instanceof WhiteBalanceParamModel) {
                const defaultModel = new WhiteBalanceParamModel(initModel.param, {
                    min: initModel.minStepIntValue,
                    max: initModel.maxStepIntValue,
                    value: initModel.getFloatValue(),
                    relativeParam: initModel.relativeParam,
                    imageType: initModel.imageType
                })

                defaultModel.initDefaultValue(initModel.getFloatValue())
                defaultModel.setRelativeValue(initModel.relativeValue)

                if (model.isSetBaseValue) {
                    defaultModel.setBaseValue(model.baseValue)
                }

                model.initDefaultValue(defaultModel.getFloatValue())
                model.setRelativeValue(defaultModel.relativeValue)

            } else {
                model.initDefaultValue(initModel.getFloatValue())
            }

            params.push(...model.getDataStruct())
        })

        return params
    }

    /**
     * 重置白平衡模型基准
     * @param key
     * @param value
     */
    setBaseParam(key: string, value: number): void {
        if (!key) return
        if (!this.isInit) this.initDefaultMap()

        const model = this.getParamModel(key)
        if (model && model instanceof WhiteBalanceParamModel) {
            model.setBaseValue(value)
        }
    }

    /**
     * 更新单个参数
     * @param key
     * @param value
     */

    private updateParam(key: string, value: any): boolean {
        if (!key) {
            return false
        }

        if (!this.isInit) this.initDefaultMap()
        const model = this.getParamModel(key)
        if (model) {
            this.setOptStatus()
            return model.setIntValue(value)
        }

        return false
    }

    /**
     * 更新单个参数
     * @param model
     * @param value
     */
    updateStepParam(model: any, value: any) {
        if (!model) return null
        if (!this.isInit) this.initDefaultMap()

        if (model) {
            this.setOptStatus()
            model.increaseValue(value)
            return model.getDataStruct()
        }
        return null
    }

    /**
     * 更新参数
     * @param data { [{ key: '', value: '' }] }
     */
    updateParams(data: any[]): string[] {
        if (!this.isInit) this.initDefaultMap()
        this.setOptStatus()

        const updateKeys: string[] = []

        data.forEach(item => {
            const { key, value } = item
            if (!key) return

            if (this.effectModel.isIdentifyKeys(key)) {
                const isUpdate = this.effectModel.update(item)
                if (isUpdate) {
                    updateKeys.push(key)
                }
            } else {
                let isUpdate = this.updateParam(key, value)
                if (isUpdate) {
                    updateKeys.push(key)
                }
            }
        })

        return updateKeys
    }

    /**
     *  解析组件使用的预设参数
     * @returns {{}}
     */
    parseToComponent(): IOptionObject<string | number> {
        if (!this.isInit) this.initDefaultMap()

        const obj = {}
        const mergeMap = new Map()

        // @ts-ignore
        for (const [key, model] of this.paramsMap) {
            // @ts-ignore
            obj[key] = model.getIntValue()
            mergeMap.set(key, `value：${ model.getIntValue() }, model：, model`)
        }

        const effectObj = this.effectModel.toComponent()
        for (const key in effectObj) {
            // @ts-ignore
            obj[key] = effectObj[key]
            // @ts-ignore
            mergeMap.set(key, `value：${ obj[key] }`)
        }

        return obj
    }

    /**
     * 解析配置使用的json预设参数
     * @returns {{Params: [], version: ''}}
     */
    parseToJson(): { Params: object[], Effects: object[], Version: string } {
        if (!this.isInit) this.initDefaultMap()

        const params: any[] = []
        // @ts-ignore
        for (const [key, model] of this.paramsMap) {
            if (model instanceof WhiteBalanceParamModel) {
                params.push(...model.parseToJson())
            } else {
                params.push(model.parseToJson())
            }
        }

        const effects = this.effectModel.toJson()

        return {
            Params: params,
            Effects: effects,
            Version: this.version
        }
    }

    filterParamsFlags() {
        return [
            ParamFlag[EffectParamEnum.EnhanceEditCameraRawSharpen],
            ParamFlag[EffectParamEnum.EnhanceEditCRDBStrength]
        ]
    }

    parsePartParamsToJson(): { Params: object[], Effects: object[], Version: string } {
        if (!this.isInit) this.initDefaultMap()

        const filterParamsFlags = this.filterParamsFlags()
        const noneEffectParamsMap = TsPaletteHelper.shareInstance().getInitParams(this.imgFormat)
        const params: any[] = []
        // @ts-ignore
        for (const [key, model] of this.paramsMap) {
            const isFilterParams = filterParamsFlags.includes(model.flag)
            if (model instanceof WhiteBalanceParamModel) {
                params.push(...model.parseToJson())
            } else {
                if (isFilterParams) {
                    const noneEffectModel = noneEffectParamsMap.get(model.identify)
                    const json = noneEffectModel.parseToJson()
                    if (model.identify === EffectParamEnum.EnhanceEditCRDBStrength) {
                        json.fEffectValue = 0
                    }
                    params.push(json)
                } else {
                    params.push(model.parseToJson())
                }
            }
        }

        const effects = this.effectModel.toJson()

        return {
            Params: params,
            Effects: effects,
            Version: this.version
        }
    }

    parseToJsonStr(): string {
        return JSON.stringify(this.parseToJson())
    }

    parseToPartJsonStr(): string {
        return JSON.stringify(this.parsePartParamsToJson())
    }

    // 将临时预设插入本地数据库
    async insertPresetToDao(): Promise<void> {
        if (!this._isInsertToDb) {
            this.getTempPresettingItemModel()
            // await insertPalettePresetToDao(this.palettePresetCfgModel)
            debugger
            let result = await DBIpcRender.insertToDB(PALETTE_PRESETS_CFG_TABLE, this.palettePresetCfgModel)
            debugger
            this._isInsertToDb = true
        }
    }

    /**
     * 生成临时预设模型
     */
    getTempPresettingItemModel(): PalettePresetCfgModel {
        const model = this.getPalettePresetModel()
        model.version = this.version
        model.sourceType = 2
        model.id = this.newId
        model.userId = this.userId
        this.palettePresetCfgModel = model
        return model
    }

    /**
     * 生成临时预设入库使用参数
     */
    getPalettePresetModel(): PalettePresetCfgModel {
        if (!this.isInit) this.initDefaultMap()

        let palettePresetModel: PalettePresetCfgModel = PalettePresetCfgModel.default()

        let model: WhiteBalanceParamModel = this.paramsMap.get('EnhanceEditColorTemperature')
        palettePresetModel.ColorTemperatureRelativeValue = model.relativeValue
        palettePresetModel.ColorTemperatureValue = model.getFloatValue()

        let hueModel: WhiteBalanceParamModel = this.paramsMap.get('EnhanceEditHue')
        palettePresetModel.HueRelativeValue = hueModel.relativeValue
        palettePresetModel.HueValue = hueModel.getFloatValue()

        let exposeModel: ParamModel = this.paramsMap.get('EnhanceEditExposure')
        palettePresetModel.ExposureValue = exposeModel.getFloatValue()

        let enhanceEditContrastModel: ParamModel = this.paramsMap.get('EnhanceEditContrast')
        palettePresetModel.ContrastValue = enhanceEditContrastModel.getFloatValue()

        let enhanceEditHighlightModel: ParamModel = this.paramsMap.get('EnhanceEditHighlight')
        palettePresetModel.HighlightValue = enhanceEditHighlightModel.getFloatValue()

        let editShadow: ParamModel = this.paramsMap.get('EnhanceEditShadow')
        palettePresetModel.ShadowValue = editShadow.getFloatValue()

        let EnhanceEditWhite: ParamModel = this.paramsMap.get('EnhanceEditWhite')
        palettePresetModel.WhiteValue = EnhanceEditWhite.getFloatValue()

        let EnhanceEditBlack: ParamModel = this.paramsMap.get('EnhanceEditBlack')
        palettePresetModel.BlackValue = EnhanceEditBlack.getFloatValue()

        let EnhanceEditCameraRawSharpen: ParamModel = this.paramsMap.get('EnhanceEditCameraRawSharpen')
        palettePresetModel.CameraRawSharpenValue = EnhanceEditCameraRawSharpen.getFloatValue()

        let EnhanceEditSaturation: ParamModel = this.paramsMap.get('EnhanceEditSaturation')
        palettePresetModel.SaturationValue = EnhanceEditSaturation.getFloatValue()

        let EnhanceEditCameraRawVibrance: ParamModel = this.paramsMap.get('EnhanceEditCameraRawVibrance')
        palettePresetModel.EnhanceEditCameraRawVibranceValue = EnhanceEditCameraRawVibrance.getFloatValue()

        let hslData: any = [] //TODO:添加hsl的数据

        for (const [key, model] of this.paramsMap) {
            if (model instanceof HslParamModel) {
                hslData.push(model.parseToJson())
            }
        }

        palettePresetModel.hslJson = hslData

        // 锐化
        let CRDBStrengthValue: DetailBoostingParamModel = this.paramsMap.get(EffectParamEnum.EnhanceEditCRDBStrength)
        palettePresetModel.CRDBStrengthValue = CRDBStrengthValue.getFloatValue()

        // 锐化-半径
        let CRDBRadiusValue: ParamModel = this.paramsMap.get(EffectParamEnum.EnhanceEditCRDBRadius)
        palettePresetModel.CRDBRadiusValue = CRDBRadiusValue.getFloatValue()

        // 锐化-细节
        let CRDBDetailValue: ParamModel = this.paramsMap.get(EffectParamEnum.EnhanceEditCRDBDetail)
        palettePresetModel.CRDBDetailValue = CRDBDetailValue.getFloatValue()

        // 滤镜
        let filterInstance: ParamModel = this.paramsMap.get(EffectParamEnum.FilterAlpha)
        palettePresetModel.FilterAlpha = filterInstance.getFloatValue()


        const filterIdentify = EffectModel.identify(EffectNameEnum.Filter)
        if (this.effectModel.isIdentifyKeys(filterIdentify)) {
            const effectInstance: EffectModel = this.effectModel.getEffectModel(filterIdentify) as EffectModel
            palettePresetModel.FilterPath = effectInstance?.path
        }

        return palettePresetModel
    }

    getHasEffectConfig(): IFormatCheckJson {
        const params: number[] = []
        for (const [_, model] of this.paramsMap) {
            if (model.filter || !model.hasEffect()) {
                continue
            }
            params.push(model.flag)
        }
        console.log('getHasEffectConfig: ', this.paramsMap, params)

        return {
            effects: this.effectModel.getHasEffectNames(),
            params,
            crop: [],
            algoVersion: []
        }
    }
}
