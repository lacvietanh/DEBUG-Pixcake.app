// @ts-ignore
import { ParamFlag } from '@/utils/tsImageIO'
import { paramsNameEnum } from '@/constants/presetParams/nameEnum'

export type Config = {
    min: number,
    max: number,
    value?: number,
    intPrecision?: number,
    filter?: boolean,
    needNormalize? :boolean
}

export type CommonParamObject = {
    ParamFlag: number,
    fEffectValue?: number,
    iEffectValue?: number
}

export type CommonParamArray = { ParamFlag: number, floatValue: number }[]

export default abstract class ParamBaseModel {
    flag: number
    floatValue: number
    defaultFloatValue: number

    minStepIntValue: number
    maxStepIntValue: number
    param: string
    identify: string
    private readonly _filter: boolean = false
    private readonly _intPrecision: number | null
    private readonly _needNormalize: boolean = true

    constructor(param: string, config: Config) {
        this.param = param
        this.identify = param

        // @ts-ignore
        this.flag = ParamFlag[param]
        // @ts-ignore
        this['##'] = paramsNameEnum[this.flag]  // 参数基础名称

        if (typeof this.flag !== 'number') {
            console.warn(`error: param ${ param } is not exist flag, please check the effectConfig.ts file!`)
        }

        const { min, max, value } = config

        this.floatValue = Number(value || 0)
        this.defaultFloatValue = Number(value || 0)

        this.minStepIntValue = min || 0               // 最小值
        this.maxStepIntValue = max || 100             // 最大值

        // 转换为int值的精度限制
        this._intPrecision = typeof config.intPrecision === 'number' ? config.intPrecision : null
        this._filter = typeof config.filter === 'boolean' ? config.filter : false
        this._needNormalize = typeof config.needNormalize === 'boolean' ? config.needNormalize : true
    }

    /**
     * 格式化浮点值
     * @param value
     */
    static formatFloatValue(value: number): number {
        // @ts-ignore
        return value.toStrip(5)
    }

    /**
     * 格式化显示值
     * @param value
     * @param precision
     */
    static formatIntValue(value: number, precision: null | number): number {
        if (typeof precision === 'number') {
            // @ts-ignore
            return value.toRound(precision)
        }
        // @ts-ignore
        return value.toStrip(5)
    }

    abstract boundaryDetermination(value: number): number // 数值边界判定
    abstract getFloat2Int(floatValue: number): number // 符点值转显示值
    abstract getInt2Float(value: number): number // 显示值转浮点值

    abstract reset(): void // 重置到默认值
    abstract initDefaultValue(value: number): void
    abstract update(value: number): void

    abstract increaseValue(step: number): void // 浮点值++

    abstract parseToJson(): CommonParamObject

    abstract getDataStruct(): CommonParamArray

    abstract parseDefaultToJson(): CommonParamObject

    get intPrecision(): number | null {
        return this._intPrecision
    }

    get filter(): boolean {
        return this._filter
    }

    get needNormalize(): boolean {
        return this._needNormalize
    }

    /**
     * 标志位判断
     * @param flag
     * @param other
     */
    isIdentifyByFlag(flag: number, other: number | null = null): boolean {
        return flag === this.flag
    }

    /**
     * 归一化为0~1之间的浮点值
     */
    getFloatValue(): number {
        if (!this.needNormalize) {
            return this.floatValue
        } else {
            return ParamBaseModel.formatFloatValue(this.floatValue)
        }
    }

    getDefaultValue(): number {
        if (!this.needNormalize) {
            return 0
        } else {
            return ParamBaseModel.formatFloatValue(0)
        }
    }

    /**
     * 获取显示值
     */
    getIntValue(): number {
        if (!this.needNormalize) {
            return this.floatValue
        } else {
            return ParamBaseModel.formatIntValue(this.getFloat2Int(this.floatValue), this._intPrecision === null ? null : this._intPrecision)
        }
    }

    /**
     * 通过显示值设置浮点值
     */
    setIntValue(value: number): boolean {
        let floatValue: number
        if (!this.needNormalize) {
            floatValue = this.boundaryDetermination(value)
        } else {
            floatValue = ParamBaseModel.formatFloatValue(this.getInt2Float(value))
        }

        if (floatValue === this.floatValue) {
            return false
        }

        this.floatValue = floatValue
        return true
    }

    hasEffect(): boolean {
        return this.floatValue !== this.defaultFloatValue
    }
}
