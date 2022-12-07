import EffectBaseModel from '@/model/EffectsModel/EffectBaseModel'

export default class PersonEffectItem extends EffectBaseModel {
    private readonly _personType: number

    constructor(data: IEffectPersonItemConfig) {
        super(data)
        this._personType = data.PersonType
    }

    static identify(name: string, personType: number): string {
        return 'en-' + name + '-pt-' + personType
    }

    get personType(): number {
        return this._personType
    }


    get identify(): string {
        return PersonEffectItem.identify(this.name, this._personType)
    }

    toJson(): IEffectPersonJsonItem {
        return {
            PersonType: this._personType,
            Path: this.path
        }
    }
}
