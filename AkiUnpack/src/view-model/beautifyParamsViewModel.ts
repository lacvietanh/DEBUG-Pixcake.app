import {
    BEAUTIFY_PRESET_VERSION,
    beautifyParams,
    EFFECTS_AlgoVersion_JSON,
    EFFECTS_CONFIG_JSON,
    EFFECTS_CONFIG_R_PATH
} from '@/constants/preset-def'
import { EffectParamEnum, EffectParamPersonType } from '@/constants/presetParams/ParamEnum'

import { v4 as uuidv4 } from 'uuid'

import ParamModel from '@/model/ParamsModel/ParamModel'
import PersonParamModel from '@/model/ParamsModel/PersonParamModel'
import PresettingItemModel from '@/model/PresettingItemModel'
import EffectGroupModel from '@/model/EffectsModel/EffectGroupModel'

import RotateModel from '@/model/RotateModel'
import CropModel from '@/model/CropModel'

// @ts-ignore
import fileUtils from '@/utils/FileUtils'
import nodePath from '@/qt-ipc/path'
import TsBeautifyHelper from '@/helper/tsBeautifyHelper'
import AlgoVersionModel from '@/model/AlgoVersionModel/AlgoVersionModel'
import BtVersionMigrate from '@/constants/presetParams/beautifyVersonMigrate/btVersionMigrate'
import { Optional } from '@/types'
import { ParamFlag } from '@/constants/effect-config'
import { MemoryMonitor } from '@/utils/monitor/memoryMonitor'
import { IFormatCheckJson } from '@/types/preset'
import { AlgoVersionEnum, CropEnum, EffectNameEnum, ParamsFlagEnum } from '@/constants/presetParams/presetConfig'


type IParams = {
    '##'?: string,
    ParamFlag: number,
    fEffectValue: number,
    PersonType?: number,
    iEffectValue?: number
}

type IParamsConfig = {
    Effects: any[],
    Params: IParams[],
    AlgoVersion: { [key: string]: any },
    ClientConfig?: { [key: string]: any },
    Version: string
}

const TsBeautifyHelperInstance = TsBeautifyHelper.getInstance()
const hasPerson = (person: string | EffectParamPersonType[], condition: EffectParamPersonType) => {
    if (typeof person === 'object') {
        return person.includes(condition)
    }
    return person === EffectParamPersonType.All || person === condition
}

export default class BeautifyParamsViewModel {
    version: string
    params: any[]
    effectModel: EffectGroupModel
    defaultEffects: any[]
    optStatus: boolean
    newId: null | string
    from: null | string
    path: string = ''
    data: any
    folder: string = ''
    isDestroy: boolean
    algoVersion: AlgoVersionModel
    userId: number
    rotateModel: RotateModel = new RotateModel()
    cropModel: CropModel = new CropModel()

    objectId: Optional<number> = null

    constructor(data: Optional<IParamsConfig>, id: string | null = null, userId: number, path?: string) {
        MemoryMonitor.shareInstance().addObject(this)

        this.version = BEAUTIFY_PRESET_VERSION
        this.params = []
        this.optStatus = false
        this.newId = id || null
        this.from = null
        this.isDestroy = false
        this.userId = userId
        this.defaultEffects = BeautifyParamsViewModel.initEffects()

        this.effectModel = new EffectGroupModel(this.defaultEffects)
        this.algoVersion = BeautifyParamsViewModel.initAlgoVersion()
        this.params = BeautifyParamsViewModel.initParams()

        if (!path) {
            nodePath.joinResourcesPath('/effect/config/none-config.json').then(filepath => this.path = filepath)
        } else {
            this.path = path
        }

        nodePath.joinResourcesPath(EFFECTS_CONFIG_R_PATH).then(folder => this.folder = folder)
        this.initData(data)

        // 对象的id，用于viewModel对象的唯一标识，同时可知，该对象的创建时间，可以判断2个paramsViewModel是否同一个引用
        this.objectId = new Date().getTime()
    }

    recycle() {
        this.isDestroy = true
        this.params = []
        this.defaultEffects = []
    }

    /**
     * 初始化配置参数
     * @returns {({Order: number, Path: string, ParamFlags: [number], ProcMode: string}|{Order: number, Path: string, ParamFlags: [number], ProcMode: string}|{Order: number, Path: string, ParamFlags: [number], ProcMode: string}|{Order: number, Path: string, ParamFlags: number[]}|{Order: number, Path: string, ParamFlags: [number], ProcMode: string})[]}
     */
    static initEffects(): any {
        return [...EFFECTS_CONFIG_JSON]
    }

    static initAlgoVersion(): AlgoVersionModel {
        return new AlgoVersionModel({
            ...EFFECTS_AlgoVersion_JSON
        })
    }

    /**
     * 初始化参数
     * @returns {[]}
     */
    static initParams(): any[] {
        const params: any[] = []

        beautifyParams.forEach((param: any) => {
            const config = {
                min: 0,
                max: 100,
                value: 0,
                filter: false,
                needNormalize: true
            }

            if (typeof param.min === 'number') {
                config['min'] = param.min
            }

            if (typeof param.max === 'number') {
                config['max'] = param.max
            }

            if (typeof param.filter === 'boolean') {
                config['filter'] = param.filter
            }

            if (typeof param.default === 'number') {
                config['value'] = param.default
            }

            if (typeof param.needNormalize === 'boolean') {
                config['needNormalize'] = param.needNormalize
            }

            const includePersonFormat = (personType: EffectParamPersonType | EffectParamPersonType[]) => {
                const hasFemale = hasPerson(personType, EffectParamPersonType.Female)
                const hasMale = hasPerson(personType, EffectParamPersonType.Male)
                const hasChild = hasPerson(personType, EffectParamPersonType.Child)
                const hasOlder = hasPerson(personType, EffectParamPersonType.Older)

                if (hasFemale) {
                    params.push(new PersonParamModel(param.key, { ...config, person: EffectParamPersonType.Female }))
                }

                if (hasMale) {
                    params.push(new PersonParamModel(param.key, { ...config, person: EffectParamPersonType.Male }))
                }

                if (hasChild) {
                    params.push(new PersonParamModel(param.key, { ...config, person: EffectParamPersonType.Child }))
                }

                if (hasOlder) {
                    params.push(new PersonParamModel(param.key, { ...config, person: EffectParamPersonType.Older }))
                }
            }

            if (param.person) {
                includePersonFormat(param.person)
            } else {
                params.push(new ParamModel(param.key, config))
            }
        })

        return params
    }

    /**
     * 处理预设版本更新
     * @param params
     * @param version
     * @param path
     */
    static paramsFormat(params: any[], version: string, path: string): any[] {

        let cacheParams = TsBeautifyHelperInstance.getCacheJsonConfigFormatMap(path)
        if (!cacheParams) {
            const migrate = new BtVersionMigrate(version, params)
            cacheParams = migrate.migrateData()
            TsBeautifyHelperInstance.setCacheJsonConfigFormatMap(path, cacheParams)
        }

        return cacheParams
    }

    static async readJsonFromPath(path: string): Promise<IParamsConfig> {
        return fileUtils.readJsonFromLocal(path)
    }

    // 素材资源文件所在路径
    resPath(): string {
        return this.folder
    }

    get isTempPreset(): boolean {
        return !!this.newId
    }

    get presetFrom(): string {
        return <string>this.from
    }

    /**
     * 同步参数数据
     * @param params
     * @param effects
     */
    private _syncParams(params: any[], effects: any[]): void {
        this.effectModel.sync(effects)
        if (params && params.length > 0) {
            params.forEach(param => {
                const { ParamFlag, PersonType, fEffectValue, iEffectValue } = param

                this.params.forEach(model => {
                    if (model instanceof PersonParamModel) {
                        if (model.isIdentifyByFlag(ParamFlag, PersonType)) {
                            model.update(fEffectValue)
                        }
                    } else {
                        if (model.isIdentifyByFlag(ParamFlag)) {
                            if (!model.needNormalize) {
                                model.update(iEffectValue || 0)
                            }else {
                                model.update(fEffectValue)
                            }
                        }
                    }
                })
            })
        }
    }

    /**
     *  根据配置文件同步参数
     * @param data
     */
    updateParamsByConfig(data: IParamsConfig): void {
        let json = data as IParamsConfig

        // @ts-ignore
        let { Params, AlgoVersion, ClientConfig, Effects, Crop } = json

        if (this.isDestroy) {
            return
        }

        if (Params) {
            this._syncParams(Params, Effects)
        }

        if (Crop) {
            this.cropModel.sync(Crop)
            this.rotateModel.sync(Crop)
        }

        this.algoVersion = new AlgoVersionModel(AlgoVersion || {})

        // // 读取json 存在ClientConfig即为临时预设
        if (ClientConfig) {
            this.optStatus = true
            this.newId = ClientConfig.NewId
            this.from = ClientConfig.From
        } else {
            // this.from = data
        }
    }

    initData(data: Optional<IParamsConfig>): void {
        if (data) {
            this.updateParamsByConfig(data)
        }
    }

    setOptStatus(): void {
        if (!this.optStatus) {
            const uuid = uuidv4()
            this.optStatus = true
            this.newId = uuid
            const model = this.getPresettingItemModel()
            model.fullCfgPath(null, this.userId).then(path => {
                this.path = path
            })
            console.log(`[beautifyParamsViewModel]:setOptStatus,object:${ this.objectId }`)
        }
    }

    /**
     * 更新本地配置文件
     * @returns {Promise<void>}
     */
    async updateLocalTempConfig(): Promise<void> {
        if (this.optStatus && this.newId) {
            try {
                const model = this.getPresettingItemModel()
                this.path = await model.fullCfgPath(null, this.userId)
                console.log('==> preset path', model.fullCfgPath(null, this.userId))
                await fileUtils.writeJsonIntoLocal(model.fullCfgPath(null, this.userId), {
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

    getParamModel(identify: string): any {
        if (this.params == null || this.params.length == 0) {
            this.initData(this.data)
        }
        return this.params.find(model => model.identify === identify)
    }

    getParamsModel(identifys: string[]): any[] {
        if (this.params == null || this.params.length == 0) {
            this.initData(this.data)
        }

        const updateModels: any[] = []

        identifys.forEach(identify => {
            if (this.effectModel.isIdentifyKeys(identify)) {
                const model = this.effectModel.getEffectModel(identify)
                if (model) {
                    updateModels.push(model)
                }
            }
        })

        if (this.algoVersion.includesByKeys(identifys)) {
            updateModels.push(this.algoVersion)
        }

        const paramsModels = this.params.filter(model => identifys.includes(model.identify)) || []
        updateModels.push(...paramsModels)

        return updateModels
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

        const model = this.getParamModel(key)
        if (model) {
            return model.setIntValue(value)
        }

        return false
    }

    /**
     * 更新参数
     * @param data
     */
    updateParams(data: any[]): string[] {
        const updateKeys: string[] = []
        data.forEach(item => {
            const { key, value } = item
            if (key) {
                if (this.effectModel.isIdentifyKeys(key)) {
                    const isUpdate = this.effectModel.update(item)
                    if (isUpdate) {
                        updateKeys.push(key)
                    }
                } else if (this.algoVersion.includes(key)) {
                    const isUpdate = this.algoVersion.update(key, value)
                    if (isUpdate) {
                        updateKeys.push(key)
                    }
                } else {
                    let isUpdate = this.updateParam(key, value)
                    if (isUpdate) {
                        updateKeys.push(key)
                    }
                }
            }
        })

        if (updateKeys.length > 0) {
            this.setOptStatus()
        }
        // todo 修改背景去瑕疵模式时不生成临时预设
        // if (!(data.length === 1 && [EffectParamEnum.BgCleanMode].includes(data[0].key))) {
        //     this.updateLocalTempConfig()
        // }
        // this.updateLocalTempConfig()

        return updateKeys
    }

    updateBgCleanMode(value: number): void {
        this.updateParam(EffectParamEnum.BgCleanMode, value)
    }

    updateBgCleanMooreMode(value: number): void {
        this.updateParam(EffectParamEnum.BgCleanMooreMode, value)
    }

    /**
     * 是否需要重载数据
     * @param data
     */
    needReloadThumbnailByModify(data: string[] = []): boolean {
        return this.algoVersion.includesByArray(data)
    }

    /**
     * 重置参数
     * @param key
     */
    async resetParam(key: string): Promise<void> {
        if (!key) return
        if (this.algoVersion.includes(key)) {
            this.algoVersion.reset()
        } else {
            const model = await this.getParamModel(key)
            if (model) {
                model.reset()
                this.setOptStatus()
            }
        }
    }

    /**
     *  解析组件使用的预设参数
     * @returns {{}}
     */
    parseToComponent(): any {
        const obj: { [key: string]: string | number } = {}

        const mergeMap = new Map()
        if (this.params == null || this.params.length == 0) {
            this.initData(this.data)
        }

        this.params.forEach(model => {
            obj[model.identify] = model.getIntValue()
            mergeMap.set(model.identify, `value：${ model.getIntValue() }, model：, model`)
        })

        const versionObj = this.algoVersion.parseToJson() || {}
        for (const key in versionObj) {
            // @ts-ignore
            obj[key] = versionObj[key]
        }

        const effectObj = this.effectModel.toComponent()
        for (const key in effectObj) {
            // @ts-ignore
            obj[key] = effectObj[key]
            mergeMap.set(key, `value：${ obj[key] }`)
        }

        const rotateObj = this.rotateModel.toComponent()
        for (const key in rotateObj) {
            obj[key] = rotateObj[key]
            mergeMap.set(key, `value：${ obj[key] }`)
        }
        console.debug("toComponent: ", rotateObj)

        const cropObj = this.cropModel.toComponent()
        for (const key in cropObj) {
            obj[key] = cropObj[key]
            mergeMap.set(key, `value：${ obj[key] }`)
        }


        console.log('toComponent: obj', obj)

        return obj
    }

    /**
     * 解析配置使用的json预设参数
     * @returns {{Params: [], version: ''}}
     */
    parseToJson(): IParamsConfig {
        if (this.params == null || this.params.length == 0) {
            this.initData(this.data)
        }
        const params: IParams[] = []
        this.params.forEach(param => {
            if (param.filter) return
            params.push(param.parseToJson())
        })

        const effects = this.effectModel.toJson()

        return {
            AlgoVersion: this.algoVersion.parseToJson(),
            Effects: effects,
            Params: params,
            Version: this.version
        }
    }

    filterParamsFlags() {
        return [
            ParamFlag[EffectParamEnum.Spotless], ParamFlag[EffectParamEnum.RemoveNevus],
            ParamFlag[EffectParamEnum.SpotlessBody], ParamFlag[EffectParamEnum.NeutralGrayRetouch],
            ParamFlag[EffectParamEnum.MoisturizingSkin], ParamFlag[EffectParamEnum.MoisturizingSkinNoFace],
            ParamFlag[EffectParamEnum.RemoveForeheadLines], ParamFlag[EffectParamEnum.RemoveNeckLines],
            ParamFlag[EffectParamEnum.RemoveEyeLines], ParamFlag[EffectParamEnum.StretchMark],
            ParamFlag[EffectParamEnum.LightenPouch], ParamFlag[EffectParamEnum.TearTrough],
            ParamFlag[EffectParamEnum.RemoveDoubleChin], ParamFlag[EffectParamEnum.StretchMarkLine],
            ParamFlag[EffectParamEnum.ToothRepairing], ParamFlag[EffectParamEnum.AIBodyReshape]
        ]
    }

    /**
     * 解析部分配置使用到的JSON参数，用在精修左栏使用
     */
    parseToPartJson(): any {

        const filterParamsFlags = this.filterParamsFlags()
        if (this.params == null || this.params.length == 0) {
            this.initData(this.data)
        }
        const params: IParams[] = []
        this.params.forEach(param => {
            if (filterParamsFlags.includes(param.flag)) {
                params.push(param.parseDefaultToJson())
            } else {
                params.push(param.parseToJson())
            }
        })

        const effects = this.effectModel.toJson()

        return {
            AlgoVersion: this.algoVersion.parseToJson(),
            Effects: effects,
            Params: params,
            Version: this.version
        }
    }

    parseToJsonStr(): any {
        if (this.isTempPreset) {
            const json = this.parseToJson()
            return JSON.stringify(json)
        } else {
            return TsBeautifyHelperInstance.getJsonStr(this.path, this)
        }
    }

    parsePartParamsToJsonStr(): any {
        if (this.isTempPreset) {
            const json = this.parseToPartJson()
            return JSON.stringify(json)
        } else {
            return TsBeautifyHelperInstance.getJsonStr(this.path, this, true, true)
        }
    }

    getPresettingItemModel() {
        const model = new PresettingItemModel()

        model.iconPath = null
        model.name = '临时预设'
        model.cfgPath = `${ this.newId }.json` // 配置文件的目录
        model.userId = null
        model.sourceType = 2 // 0 本地,1 云端，2 临时
        model.isInner = false // 是否是安装包内置的
        model.classifyType = 1 // 1是推荐预设，2是我的预设
        model.orderId = 0
        model._extendId = this.newId
        model.version = this.version

        return model
    }

    setRotate(angle: number, mode: string): this {
        // if (mode === 'base') {
        //     this.rotateModel.increaseBaseAngle(angle)
        // } else if (mode === 'angle') {
        //     this.rotateModel.setAngle(angle)
        // } else {
        //     this.rotateModel.setRotate(angle)
        // }
        this.rotateModel.setRotate(angle)
        return this
    }

    setFlit(x: number, y: number): this {
        this.rotateModel.setFlip(x, y)
        return this
    }

    setCrop(data: any): this {
        this.cropModel.setData(data)
        return this
    }

    hasEffect(): boolean {
        let hasEffect = this.effectModel.hasEffect()

        if (!hasEffect) {
            this.params.forEach(model => {
                if (model.filter) {
                    return
                }

                if (model.hasEffect()) {
                    hasEffect = true
                }
            })
        }

        return hasEffect
    }

    getHasEffectConfig(): IFormatCheckJson {
        const params: number[] = []
        this.params.forEach(model => {
            if (model.filter || !model.hasEffect()) {
                return
            }
            params.push(model.flag)
        })

        const crop = []
        if (this.rotateModel.hasEffect()) {
            crop.push(CropEnum.Rotate)
        }

        if (this.cropModel.hasEffect()) {
            crop.push(CropEnum.Crop)
        }

        const algoVersion = []
        if (this.algoVersion.hasEffect()) {
            algoVersion.push(AlgoVersionEnum.FaceSurgery)
        }

        return {
            effects: this.effectModel.getHasEffectNames(),
            params,
            crop,
            algoVersion
        }
    }
}
