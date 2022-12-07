import { EFFECTS_AlgoVersion_JSON } from '@/constants/preset-def'
import { EffectAlgoVersion } from '@/constants/presetParams/ParamEnum'

export interface AlgoVersionInterface extends Object {
    FaceSurgery?: string
}

export default class AlgoVersionModel {
    VersionObj: AlgoVersionInterface

    constructor(obj: AlgoVersionInterface) {
        this.VersionObj = {
            [EffectAlgoVersion.FaceSurgery]: obj.FaceSurgery || 'V1'
        }
    }

    includes(key: string): boolean {
        // eslint-disable-next-line no-prototype-builtins
        return this.VersionObj.hasOwnProperty(key)
    }

    includesByKeys(keys: string[]): boolean {
        // eslint-disable-next-line no-prototype-builtins
        return keys.some(key => this.VersionObj.hasOwnProperty(key))
    }

    includesByArray(data: string[]): boolean {
        for (let key of data) {
            if (this.includes(key)) {
                return true
            }
        }
        return false
    }

    hasEffect(): boolean {
        return this.VersionObj[EffectAlgoVersion.FaceSurgery] !== EFFECTS_AlgoVersion_JSON.FaceSurgery
    }

    update<T extends AlgoVersionInterface>(key: T, value: string): boolean {
        // @ts-ignore
        const curr = this.VersionObj[key]
        if (curr === value) {
            return false
        }

        // @ts-ignore
        this.VersionObj[key] = value
        return true
    }

    reset(): void {
        this.VersionObj.FaceSurgery = EFFECTS_AlgoVersion_JSON.FaceSurgery
    }

    parseToJson(): AlgoVersionInterface {
        return this.VersionObj
    }
}
