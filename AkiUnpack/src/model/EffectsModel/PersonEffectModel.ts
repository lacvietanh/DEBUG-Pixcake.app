import PersonEffectItemModel from '@/model/EffectsModel/PersonEffectItemModel'

export default class PersonEffectModel {
    _name: string = ''
    modelMap: Map<string, PersonEffectItemModel> = new Map()
    itemIdentify: string[] = []

    constructor(data: IEffectPersonJson) {
        const { Path, EffectName } = data

        this._name = EffectName
        Path.forEach((item: IEffectPersonJsonItem) => {
            const identify = PersonEffectItemModel.identify(EffectName, item.PersonType)
            const model =  new PersonEffectItemModel({
                ...item,
                EffectName
            })
            this.itemIdentify.push(identify)
            this.modelMap.set(identify, model)
        })
    }

    static identify(name: string): string {
        return 'en-' + name
    }

    get identify(): string {
        return PersonEffectModel.identify(this.name)
    }

    getItemIdentify(): string[] {
        return this.itemIdentify
    }

    getEffectItemModel(key: string): PersonEffectItemModel | null {
        return this.modelMap.get(key) || null
    }

    get name(): string {
        return this._name
    }

    sync(data: IEffectPersonJsonItem[]): void {
        data.forEach(item => {
            const identify = PersonEffectItemModel.identify(this.name, item.PersonType)
            if (this.modelMap.has(identify)) {
                const model = this.modelMap.get(identify)
                model?.update(item.Path)
            }
        })
    }

    reset(): void {
        for (const [, model] of this.modelMap) {
            model?.reset()
        }
    }

    isIdentify(identify: string): boolean {
        return this.modelMap.has(identify) || this.identify === identify
    }

    update(identify: string, value: string): boolean {
        if (this.modelMap.has(identify)) {
            const model = this.modelMap.get(identify) as PersonEffectItemModel
            return model?.update(value)
        }
        return false
    }

    hasEffect(): boolean {
        let hasEffect = false
        for (const [, model] of this.modelMap) {
            if (model.hasEffect()) {
                hasEffect = true
            }
        }
        return hasEffect
    }

    toJson(): IEffectPersonJson {
        const paths: IEffectPersonJsonItem[] = []
        for (const [, model] of this.modelMap) {
            if (model.path) {
                paths.push(model.toJson())
            }
        }
        return {
            EffectName: this._name,
            Path: paths
        }
    }

    toComponent(): IOptionObject {
        const obj: IOptionObject = {}

        for (const [, model] of this.modelMap) {
            obj[model.identify] = model.path
        }

        return obj
    }
}
