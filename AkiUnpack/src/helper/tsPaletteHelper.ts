import {
    filterParams,
    paletteBaseParams,
    paletteColorParams,
    paletteHueParams,
    paletteTemperatureParams,
    detailBoostingParams, detailBoostingDetailParams
} from '@/constants/preset-def'

import { ImageType } from '@/universal/types/constants'

import ParamModel from '@/model/ParamsModel/ParamModel'
import HslParamModel from '@/model/ParamsModel/HslParamModel'
import PersonParamModel from '@/model/ParamsModel/PersonParamModel'

const LRUMap = require('../utils/lru').LRUMap
// @ts-ignore
import fileUtils from '@/utils/FileUtils'
import DetailBoostingParamModel from '@/model/ParamsModel/DetailBoostingParamModel'
import WhiteBalanceParamModel from '@/model/ParamsModel/WhiteBalanceParamModel'

// 图像调节的辅助类
export default class TsPaletteHelper {
    static instance: null | TsPaletteHelper = null

    _defaultConfig = null
    private InitPaletteParamsMap: Map<any, any> = new Map()
    private cacheParamsConfigMap: any = new LRUMap(30)

    constructor() {
        this._defaultConfig = null
        // this.defaultPath = joinResourcesPath('effect/config/none-toning-config.json') // 默认效果配置
    }

    static getInstance(): TsPaletteHelper {
        this.instance = this.instance ? this.instance : new TsPaletteHelper()
        return this.instance
    }

    static shareInstance(): TsPaletteHelper {
        this.instance = this.instance ? this.instance : new TsPaletteHelper()
        return this.instance
    }

    loadConfig(configPath: string): any {
        let json = fileUtils.readJsonFromLocal(configPath)
        // let { Params, ClientConfig, Version, Effects } = json
        return json
    }

    /**
     * 初始化参数
     * @returns {Map<any, any>}
     */
    getInitParams(imageType: number): Map<string, any> {
        if (this.InitPaletteParamsMap.has(imageType)) {
            return this.InitPaletteParamsMap.get(imageType)
        }
        const paramsModelMap = new Map()
        const isRaw = ImageType.Raw === imageType

        // 色温
        paletteTemperatureParams.forEach((param: any) => {
            paramsModelMap.set(param.key, new WhiteBalanceParamModel(param.key, {
                min: param.min || 0,
                max: param.max || 1,
                value: param.default || 0.5,
                relativeParam: param.relativeKey,
                imageType: imageType,
                intPrecision: param.intPrecision
            }))
        })

        // 色调
        paletteHueParams.forEach((param: any) => {
            paramsModelMap.set(param.key, new WhiteBalanceParamModel(param.key, {
                min: param.min || 0,
                max: param.max || 1,
                value: param.default || 0.5,
                relativeParam: param.relativeKey,
                imageType: imageType,
                intPrecision: param.intPrecision
            }))
        })

        // 基础图像调节参数
        paletteBaseParams.forEach((params: any) => {
            const config = {
                min: params.min || 0,
                max: params.max || 100,
                value: params.default || 0
            }
            paramsModelMap.set(params.key, new ParamModel(params.key, config))
        })

        // 带有color字段的参数
        paletteColorParams.forEach((params: any) => {
            const config = {
                min: params.min || 0,
                max: params.max || 100,
                value: params.default || 0
            }
            params.items.forEach((color: string) => {
                const obj = { ...config, color }
                let model = new HslParamModel(params.key, obj)
                paramsModelMap.set(model.identify, new HslParamModel(params.key, obj))
            })
        })

        // 新增滤镜参数
        filterParams.forEach((param: any) => {
            paramsModelMap.set(param.key, new ParamModel(param.key, {
                ...param,
                value: param.default || 0
            }))
        })

        // 细节调整
        detailBoostingParams.forEach((param: any) => {
            paramsModelMap.set(param.key, new DetailBoostingParamModel(param.key, {
                min: param.min || 0,
                max: param.max || 100,
                value: param.default || 0,
                imageType: imageType,
                intPrecision: 0
            }))
        })

        detailBoostingDetailParams.forEach((param: any) => {
            paramsModelMap.set(param.key, new ParamModel(param.key, {
                min: param.min,
                max: param.max,
                value: param.default
            }))
        })

        this.InitPaletteParamsMap.set(imageType, paramsModelMap)

        return paramsModelMap
    }

    static syncParams(paramsMap: Map<string, any>, defaultParams: any): any {
        if (defaultParams && defaultParams.length > 0) {
            defaultParams.forEach((param: any) => {
                const { ParamFlag, PersonType, iEffectValue, fEffectValue } = param

                for (const [key, model] of paramsMap) {
                    if (model instanceof HslParamModel) {
                        if (model.isIdentifyByFlag(ParamFlag, iEffectValue)) {
                            model.update(fEffectValue)
                        }
                    } else if (model instanceof WhiteBalanceParamModel) {
                        // 色温、色调
                        // 更新相对值
                        if (model.isIdentifyByFlag(ParamFlag)) {
                            model.update(fEffectValue)
                        }

                        // 更新绝对值
                        if (model.isIdentifyByRelativeFlag(ParamFlag)) {
                            model.setRelativeValue(fEffectValue)
                        }

                    } else if (model instanceof PersonParamModel) {
                        if (model.isIdentifyByFlag(ParamFlag, PersonType)) {
                            model.update(fEffectValue)
                        }
                    } else {
                        // @ts-ignore
                        if (model.isIdentifyByFlag(ParamFlag)) {
                            // @ts-ignore
                            model.update(fEffectValue)
                        }
                    }
                }
            })
        }
    }

    static syncFilterPath(model: any, path: string): void {
        model.path = path
    }

    getConfig(path: string, cache = true): any {
        if (this.cacheParamsConfigMap.has(path) && cache) {
            return this.cacheParamsConfigMap.get(path)
        }
        let json = fileUtils.readJsonFromLocal(path)
        this.cacheParamsConfigMap.set(path, json)
        return json
    }
}
