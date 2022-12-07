import ParamBaseModel, { CommonParamObject } from '@/model/ParamsModel/ParamBaseModel'

export type Config = {
    min: number,
    max: number,
    value?: number
}


export default class ParamModel extends ParamBaseModel{
    // static identify(paramFlag: number, other?: number): string{
    //     return 'pf-' + paramFlag
    // }

    static identify(param: string, other?: string): string {
        return param
    }

    isIdentifyByFlag(flag: number, other: number | null = null): boolean {
        return flag === this.flag
    }

    initDefaultValue(value: number): void {
        this.defaultFloatValue = this.floatValue = ParamBaseModel.formatFloatValue(value)
    }

    update(value: number): void {
        this.floatValue = ParamBaseModel.formatFloatValue(value)
    }

    // 符点值转显示值
    getFloat2Int(floatValue: number): number {
        return (this.maxStepIntValue - this.minStepIntValue) * floatValue + this.minStepIntValue
    }

    // 显示值转浮点值
    getInt2Float(value: number): number {
        let intValue = value
        if (intValue >= this.maxStepIntValue) {
            intValue = this.maxStepIntValue
        } else if (intValue <= this.minStepIntValue) {
            intValue = this.minStepIntValue
        }
        return ((intValue - this.minStepIntValue) / (this.maxStepIntValue - this.minStepIntValue))
    }

    // 浮点值++
    increaseValue(step: number): void {
        this.floatValue = this.floatValue + step
        console.log(`ParamsModel.increaseValue key: ${ this.identify },value: ${ this.floatValue }`)
    }

    // 重置到默认值
    reset(): void {
        this.floatValue = this.defaultFloatValue
        console.log(`ParamsModel.reset key: ${ this.identify }, value: ${ this.floatValue }`)
    }

    parseToJson(): CommonParamObject {
        if (!this.needNormalize) {
            return {
                // '##': param['##'],
                'ParamFlag': this.flag,
                'iEffectValue': this.getFloatValue()
            }
        } else {
            return {
                // '##': param['##'],
                'ParamFlag': this.flag,
                'fEffectValue': this.getFloatValue(),
            }
        }
    }

    parseDefaultToJson(): any {
        if (!this.needNormalize) {
            return {
                // '##': param['##'],
                'ParamFlag': this.flag,
                'iEffectValue': this.getDefaultValue(),
            }
        } else {
            return {
                // '##': param['##'],
                'ParamFlag': this.flag,
                'fEffectValue': this.getDefaultValue(),
            }
        }
    }

    getDataStruct() {
        return [
            {
                ParamFlag: this.flag,
                floatValue: this.getFloatValue()
            }
        ]
    }

    // 边界判定
    boundaryDetermination(value: number): number {
        let intValue = value
        if (intValue >= this.maxStepIntValue) {
            intValue = this.maxStepIntValue
        } else if (intValue <= this.minStepIntValue) {
            intValue = this.minStepIntValue
        }
        return intValue
    }
}
