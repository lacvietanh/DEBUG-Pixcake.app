import { showInAllTypes, formatAllPersonType } from '../utils'
import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import {IS_CLIENT_PIX_PIE} from "@/universal/types/config";
import { RealtimeType } from '@/constants/constants'

const realtime = RealtimeType.EnableByGpu

export default [
    {
        name: '质感磨皮（中性灰）',
        key: EffectParamEnum.NeutralGrayRetouch,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '水润磨皮-脸部',
        key: EffectParamEnum.MoisturizingSkin,
        value: 0,
        max: IS_CLIENT_PIX_PIE ? 50 : 100,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '水润磨皮-身体',
        key: EffectParamEnum.MoisturizingSkinNoFace,
        value: 0,
        max: IS_CLIENT_PIX_PIE ? 50 : 100,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        line: true
    },
    // {
    //     name: '高光立体',
    //     key: EffectParamEnum.FacialStereo3DLight,
    //     value: 0,
    //     personType: formatAllPersonType,
    //     showType: showInAllTypes
    // },
    // {
    //     name: '阴影立体',
    //     key: EffectParamEnum.FacialStereo3DShadow,
    //     value: 0,
    //     personType: formatAllPersonType,
    //     showType: showInAllTypes
    // },

    {
        name: '肤色透亮',
        key: EffectParamEnum.SkinColorLighten,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '肤色美白',
        key: EffectParamEnum.SkinColorWhiten,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime
    },
    {
        name: '皮肤红润',
        key: EffectParamEnum.SkinColorRuddy,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime
    },
    {
        name: '肤色统一',
        key: EffectParamEnum.SkinColorUniform,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        tip: ['肤色统一通过AI智能肤色识别达到全', '身肤色一致的效果。为避免坏片，开', '启肤色统一开关后，AI会自动根据图', '片肤色情况判断效果是否生效。']
    }
]
