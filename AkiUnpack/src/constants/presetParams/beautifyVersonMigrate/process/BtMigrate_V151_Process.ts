import { ParamFlag, PersonType } from '../../../effect-config'
import { EffectParamEnum, EffectParamPersonType } from '../../ParamEnum'
import { BtMigrateProcess, IParam } from '../BtMigrateInf'

// `瘦手臂`、`瘦腰`、`瘦腿`、`瘦身`、`头部`
const updateFlags = [
    ParamFlag[EffectParamEnum.PoseRefineSlimHand],
    ParamFlag[EffectParamEnum.PoseRefineSlimWaist],
    ParamFlag[EffectParamEnum.PoseRefineSlimLeg],
    ParamFlag[EffectParamEnum.PoseRefineSlim],
    ParamFlag[EffectParamEnum.PoseRefineShrinkHead]
]

// 美臀、丰胸 更新为女性标志
const updateFemaleFlags = [
    ParamFlag[EffectParamEnum.PoseRefineNiceButtock],
    ParamFlag[EffectParamEnum.PoseRefineEnhanceBreast]
]

export default class BtMigrate_V151_Process extends BtMigrateProcess {
    _version = '1.5.1'

    formatData(param: IParam): IParam[] {
        const temp: IParam[] = []

        if (updateFlags.includes(param.ParamFlag)) {

            const personTypes = [
                PersonType[EffectParamPersonType.Female],
                PersonType[EffectParamPersonType.Male],
                PersonType[EffectParamPersonType.Child],
                PersonType[EffectParamPersonType.Older]
            ]

            personTypes.forEach((type: number) => {
                temp.push({
                    fEffectValue: param.fEffectValue,
                    ParamFlag: param.ParamFlag,
                    PersonType: type
                })
            })

        } else if (updateFemaleFlags.includes(param.ParamFlag)) {
            temp.push({
                fEffectValue: param.fEffectValue,
                ParamFlag: param.ParamFlag,
                PersonType: PersonType[EffectParamPersonType.Female]
            })
        } else {
            temp.push(param)
        }

        return temp
    }
}
