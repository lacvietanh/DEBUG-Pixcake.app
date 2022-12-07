import { showInAllTypes, formatAllPersonType } from '../utils'
import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { RealtimeType } from '@/constants/constants'

export default [
    {
        name: '亮眼',
        key: EffectParamEnum.BrightEye,
        // precise: true,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime: RealtimeType.EnableByGpu
    }
]
