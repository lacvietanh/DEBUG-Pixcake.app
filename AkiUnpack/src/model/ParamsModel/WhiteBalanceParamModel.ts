import ImageTypeParamModel from './ImageTypeParamModel'
import ParamBaseModel, { Config }  from '@/model/ParamsModel/ParamBaseModel'
// @ts-ignore
import { ParamFlag } from '@/utils/tsImageIO'
import {
    mergeJpgWhiteBalanceCCTValue, mergeJpgWhiteBalanceTintValue,
    mergeRawWhiteBalanceCCTValue, mergeRawWhiteBalanceTintValue
// @ts-ignore
} from '@/views/BatchRetouch/Palette/config/PaletteCalcUtils'
import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'

export type ColorTemperatureConfig = Config & {
    relativeParam: string,
    imageType: number
}

// eslint-disable-next-line consistent-return
function filterTransferValueApi(flag: number, isRaw: boolean): any {
    if (flag === ParamFlag[EffectParamEnum.EnhanceEditColorTemperature]) {
        return isRaw ? mergeRawWhiteBalanceCCTValue : mergeJpgWhiteBalanceCCTValue
    }

    if (flag === ParamFlag[EffectParamEnum.EnhanceEditHue]) {
        return isRaw ? mergeRawWhiteBalanceTintValue : mergeJpgWhiteBalanceTintValue
    }
}

const initRelativeValue = 0.5
const defaultIntValue = 0.5
const relativeMin = 0
const relativeMax = 1

/**
 * 色温模型
 */

export default class WhiteBalanceParamModel extends ImageTypeParamModel {
    relativeParam: string
    relativeFlag: number

    baseValue: number = 0

    relativeValue: number = initRelativeValue
    defaultRelativeValue: number = 0.5
    defaultIntValue: number = -1

    constructor(param: string, config: ColorTemperatureConfig) {
        super(param, config)
        this.relativeParam = config.relativeParam
        // @ts-ignore
        this.relativeFlag = ParamFlag[config.relativeParam]

        if (!this.isRaw) {
            this.defaultIntValue = defaultIntValue
        }
    }

    get transferValueApi(): any {
        return filterTransferValueApi(this.flag, this.isRaw)
    }

    get isSetBaseValue(): boolean {
        return !!this.baseValue
    }

    // 通过相对值flag判断模型
    isIdentifyByRelativeFlag(flag: number): boolean {
        return this.relativeFlag === flag
    }

    // 初始化相对值
    initDefaultRelativeValue(value: number): void {
        this.relativeValue = this.defaultRelativeValue = ParamBaseModel.formatFloatValue(value)
    }

    setRelativeValue(value: number): void {
        this.relativeValue = value
    }

    increaseValue(step: number): void {
        let value = this.relativeValue + step
        if (value > relativeMax) value = relativeMax
        if (value < relativeMin) value = relativeMin
        this.relativeValue = value
    }

    setBaseValue(value: number): void {
        if (this.isRaw) {
            this.baseValue = value
            this.defaultIntValue = this.transferValueApi(-1, initRelativeValue, value)
        }
    }

    setIntValue(value: number): boolean {
        if (value === this.defaultIntValue) {
            this.floatValue = -1
        } else {
            super.setIntValue(value)
        }
        this.relativeValue = initRelativeValue
        return true
    }

    getInt2Float(value: number): number {
        return super.getInt2Float(value)
    }

    getIntValue(): number {
        let intValue = defaultIntValue
        if (this.isRaw && this.baseValue) {
            intValue = this.transferValueApi(this.floatValue, this.relativeValue, this.baseValue)
        }

        if (!this.isRaw) {
            intValue = this.transferValueApi(this.floatValue, this.relativeValue)
        }

        return ParamBaseModel.formatIntValue(intValue, this.intPrecision)
    }

    // 当外面切换预设了，则需要重置基准值
    resetBaseValue(): void {
        this.baseValue = 0
        if (this.isRaw) {
            this.defaultIntValue = -1
        } else {
            this.defaultIntValue = defaultIntValue
        }
    }

    parseToJson(): any {
        return [
            {
                'ParamFlag': this.flag,
                'fEffectValue': this.getFloatValue()
            },
            {
                'ParamFlag': this.relativeFlag,
                'fEffectValue': this.relativeValue
            }
        ]
    }


    // 绝对： 色温 色调 = -1
    parseDefaultToJson(): any {
        return [
            {
                'ParamFlag': this.flag,
                'fEffectValue': this.getDefaultValue()
            },
            {
                'ParamFlag': this.relativeFlag,
                'fEffectValue': 0
            }
        ]
    }

    getDataStruct(): any {
        let res = []
        res.push({
            ParamFlag: this.relativeFlag,//相对值
            floatValue: this.relativeValue
        })

        res.push({
            ParamFlag: this.flag,//绝对值
            floatValue: this.getFloatValue()
        })

        return res
    }
}
