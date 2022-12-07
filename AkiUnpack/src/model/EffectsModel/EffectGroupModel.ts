import EffectModel from '@/model/EffectsModel/EffectModel'
import PersonEffectModel from '@/model/EffectsModel/PersonEffectModel'
import PersonEffectItemModel from '@/model/EffectsModel/PersonEffectItemModel'
import { EffectNameEnum } from '@/constants/presetParams/presetConfig'

const personTypeEffects = [
    'MakeupSuit',
    'Eyebrow',
    'Eyemakeup',
    'Blusher',
    'Lipstick',
    'Eyelash'
]

const allowModify = [
    'MakeupSuit',
    'Eyebrow',
    'Eyemakeup',
    'Blusher',
    'Lipstick',
    'Eyelash',
    'BgReplace',
    'Filter',
    'SkyReplace'
]

export default class EffectGroupModel {
    modelMap: Map<string, EffectModel> = new Map()
    personModelMap: Map<string, PersonEffectModel> = new Map()
    identifyKeys: string[] = []

    constructor(data: IEffectJson) {
        data.forEach(item => {
            const { EffectName } = item
            if (personTypeEffects.includes(EffectName)) {
                const identify = PersonEffectModel.identify(EffectName)
                const model = new PersonEffectModel(item as IEffectPersonJson)
                this.identifyKeys.push(identify)
                this.identifyKeys.push(...model.getItemIdentify())
                this.personModelMap.set(identify, model)
            } else {
                const identify = EffectModel.identify(EffectName)
                this.identifyKeys.push(identify)
                this.modelMap.set(identify, new EffectModel(item as IEffectBaseJson))
            }
        })
    }

    isIdentifyKeys(key: string): boolean {
        return this.identifyKeys.includes(key)
    }

    sync(data: IEffectJson = []): void {
        for (const i of data) {
            const identify = EffectModel.identify(i.EffectName)

            if (this.modelMap.has(identify)) {
                const model = this.modelMap.get(identify)
                const item = i as IEffectBaseJson
                model?.update(item.Path)
            }
        }

        for (const [, model] of this.personModelMap) {
            const i = data.find(item => PersonEffectModel.identify(item.EffectName) === model.identify)
            if (i) {
                const item = i as IEffectPersonJson
                model?.sync(item.Path)
            } else {
                model?.reset()
            }
        }
    }

    update(data: IOptionObject): boolean {
        const { key, value } = data
        if (this.modelMap.has(key)) {
            const model = this.modelMap.get(key)
            if (model) {
                return model?.update(value)
            }
        } else {
            const model = this.getPersonEffectModel(key)
            if (model) {
                return model?.update(key, value)
            }
        }

        return false
    }

    getPersonEffectModel(key: string): PersonEffectModel | null {
        for (const name of personTypeEffects) {
            const identify = PersonEffectModel.identify(name)

            if (this.personModelMap.has(identify)) {
                const model = this.personModelMap.get(identify)
                if (model?.isIdentify(key)) {
                    return model
                }
            }
        }

        return null
    }

    getEffectModel(key: string): EffectModel | PersonEffectItemModel | PersonEffectModel | null {
        if (this.modelMap.has(key)) {
            return this.modelMap.get(key) as EffectModel
        } else if (this.personModelMap.has(key)) {
            return this.personModelMap.get(key) as PersonEffectModel
        } else {
            for (const [, model] of this.personModelMap) {
                if (model.isIdentify(key)) {
                    return model.getEffectItemModel(key)
                }
            }
        }
        return null
    }

    batchUpdate(data: IOptionObject[]): void {
        (data || []).forEach(item => {
            this.update(item)
        })
    }

    hasEffect(): boolean {
        let hasEffect = false

        for (const [, model] of this.modelMap) {
            if (!allowModify.includes(model.name)) {
                continue
            }
            if (model.hasEffect()) {
                hasEffect = true
            }
        }

        if (!hasEffect) {
            for (const [, model] of this.personModelMap) {
                if (!allowModify.includes(model.name)) {
                    continue
                }

                if (model.hasEffect()) {
                    hasEffect = true
                }
            }
        }

        return hasEffect
    }

    toJson(): IEffectJson {
        const effects: IEffectJson = []
        for (const [, model] of this.modelMap) {
            effects.push(model.toJson())
        }

        for (const [, model] of this.personModelMap) {
            effects.push(model.toJson())
        }
        return effects
    }

    toComponent(): IOptionObject {
        const obj: IOptionObject = {}

        for (const [, model] of this.modelMap) {
            if (!allowModify.includes(model.name)) {
                continue
            }
            obj[model.identify] = model.path
        }

        for (const [, model] of this.personModelMap) {
            if (!allowModify.includes(model.name)) {
                continue
            }

            const itemObj = model.toComponent()
            for (const i in itemObj) {
                // eslint-disable-next-line no-prototype-builtins
                if (itemObj.hasOwnProperty(i)) {
                    obj[i] = itemObj[i]
                }
            }
        }

        return obj
    }

    getHasEffectNames(): EffectNameEnum[] {
        const effectNames: EffectNameEnum[] = []
        for (const [, model] of this.modelMap) {
            if (model.hasEffect()) {
                effectNames.push(model.name as EffectNameEnum)
            }
        }

        for (const [, model] of this.personModelMap) {
            if (model.hasEffect()) {
                effectNames.push(model.name as EffectNameEnum)
            }
        }
        return effectNames
    }
}
