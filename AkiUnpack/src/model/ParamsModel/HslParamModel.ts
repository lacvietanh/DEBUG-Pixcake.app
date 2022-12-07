import ParamModel, { Config } from './ParamModel'
// @ts-ignore
import { HSLColor } from '@/utils/tsImageIO'
import { colorNameEnum } from '@/constants/preset-def'

export type ColorConfig = Config & {
    color: string
}

export default class HslParamModel extends ParamModel {
    color: string
    colorFlag: number

    constructor(param: string, config: ColorConfig) {
        super(param, config)

        const { color } = config

        this.identify += `_${ color }`
        this.color = color
        // @ts-ignore
        this.colorFlag = HSLColor[this.color]

        // @ts-ignore
        this['##'] += `-${ colorNameEnum[this.color] }`
    }

    // static identify(paramFlag: string, colorFlag: string): string{
    //     return 'pf-' + paramFlag + '-cf-' + colorFlag
    // }

    static identify(param: string, color: string): string {
        return param + '_' + color
    }

    isIdentifyByFlag(flag: number, colorFlag: number) {
        return flag === this.flag && this.colorFlag === colorFlag
    }

    parseToJson() {
        return {
            // '##': param['##'],
            'ParamFlag': this.flag,
            'fEffectValue': this.getFloatValue(),
            'iEffectValue': this.colorFlag
        }
    }

    parseDefaultToJson(): any {
        return {
            // '##': param['##'],
            'ParamFlag': this.flag,
            'fEffectValue': this.getDefaultValue(),
            'iEffectValue': this.colorFlag
        }
    }
}
