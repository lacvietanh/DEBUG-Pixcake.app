import { showInAllTypes, formatAllPersonType } from '../utils'
import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { RealtimeType } from '@/constants/constants'

export default [
    {
        name: '牙齿美白',
        key: EffectParamEnum.TeethWhiten,
        // precise: true,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime: RealtimeType.EnableByGpu
    },
    {
        name: '牙齿修复',
        key: EffectParamEnum.ToothRepairing,
        value: 0,
        cType: 'switch',
        beta: true,
        max: 1,
        personType: formatAllPersonType,
        showType: showInAllTypes
    }
]
