import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { RealtimeType } from '@/constants/constants'
const realtime = RealtimeType.AlwaysEnable

export default [
    {
        name: '锐化',
        key: EffectParamEnum.EnhanceEditCRDBStrength,
        // precise: true,
        min: 0,
        max: 150,
        value: 0,
        realtime,
        collapse: true,
        collapseValue: true,
        collapseDisabled: function (data: any): boolean {
            return data[EffectParamEnum.EnhanceEditCRDBStrength] === 0
        },
        children: [
            {
                name: '半径',
                key: EffectParamEnum.EnhanceEditCRDBRadius,
                min: 0.5,
                max: 3.0,
                value: 1,
                step: 0.1,
                realtime
            },
            {
                name: '细节',
                key: EffectParamEnum.EnhanceEditCRDBDetail,
                min: 0,
                max: 100,
                value: 25,
                realtime
            }
        ]
    }
]
