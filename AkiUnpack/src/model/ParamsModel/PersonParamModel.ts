import ParamModel, { Config } from './ParamModel'
// @ts-ignore
import { SliderPersonType } from '@/utils/tsImageIO'
import { personTypeNameEnum } from '@/constants/preset-def'

export type PersonConfig = Config & {
    person: string
}

export default class PersonParamModel extends ParamModel {
    person: string
    personFlag: number

    constructor(param: string, config: PersonConfig) {
        const { min, max, value, person } = config

        super(param, { min, max, value })

        this.identify += `_${ person }`
        this.person = person
        // @ts-ignore
        this.personFlag = person ? SliderPersonType[this.person] : null

        // @ts-ignore
        this['##'] += `-${ personTypeNameEnum[this.person] }`

    }

    // static identify(paramFlag: number, personType: number): string{
    //     return 'pf-' + paramFlag + '-pt-' + personType
    // }

    static identify(param: string, person: string): string {
        return param + '_' + person
    }

    isIdentifyByFlag(flag: number, personFlag: number) {
        return flag === this.flag && this.personFlag === personFlag
    }

    parseToJson() {
        return {
            // '##': param['##'],
            'ParamFlag': this.flag,
            'fEffectValue': this.getFloatValue(),
            'PersonType': this.personFlag
        }
    }

    parseDefaultToJson(): any {
        return {
            // '##': param['##'],
            'ParamFlag': this.flag,
            'fEffectValue': this.getDefaultValue(),
            'PersonType': this.personFlag
        }
    }
}
