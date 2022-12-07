import EffectBaseModel from '@/model/EffectsModel/EffectBaseModel'

export default class EffectModel extends EffectBaseModel {
    toJson(): IEffectBaseJson {
        return {
            EffectName: this._name,
            Path: this._path
        }
    }
}
