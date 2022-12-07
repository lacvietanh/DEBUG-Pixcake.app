import { ParamFlag } from '../../../effect-config'
import { EffectParamEnum } from '../../ParamEnum'
import { BtMigrateProcess, IParam } from '../BtMigrateInf'

const updateFlags = [
    ParamFlag[EffectParamEnum.FacialRefineCheekBone],       // 204
    ParamFlag[EffectParamEnum.FaceWidth],                   // 223
    ParamFlag[EffectParamEnum.FacialRefineJaw],             // 228
    ParamFlag[EffectParamEnum.FacialRefineChin],            // 205
    ParamFlag[EffectParamEnum.FacialRefineHairLine],        // 202
    ParamFlag[EffectParamEnum.FacialRefineEyeUpDownAdjust], // 226
    ParamFlag[EffectParamEnum.FacialRefineNose],            // 203
    ParamFlag[EffectParamEnum.FacialRefineNoseAlar],        // 210
    ParamFlag[EffectParamEnum.FacialRefineNoseBridge],      // 211
    ParamFlag[EffectParamEnum.FacialRefineNoseTip],         // 212
    ParamFlag[EffectParamEnum.FacialRefineMouthSize],       // 213
    ParamFlag[EffectParamEnum.FacialRefineMouthWidth]       // 224
]

export default class BtMigrate_V140_Process extends BtMigrateProcess {
    _version = '1.4.0'

    formatData(param: IParam): IParam[] {
        const obj = { ...param }

        if (updateFlags.includes(param.ParamFlag)) {
            obj.fEffectValue = 1 - param.fEffectValue
        }

        return [obj]
    }
}
