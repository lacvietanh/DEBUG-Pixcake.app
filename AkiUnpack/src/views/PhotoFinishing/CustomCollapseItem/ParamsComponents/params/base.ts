import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { RealtimeType } from '@/constants/constants'

/*
* 基础调整
* */
const realtime = RealtimeType.AlwaysEnable

export default [
    {
        name: '曝光',
        key: EffectParamEnum.EnhanceEditExposure,
        cType: 'ts-slider',
        min: -5,
        max: 5,
        step: 0.05,
        value: 0,
        realtime
    },
    {
        name: '对比度',
        key: EffectParamEnum.EnhanceEditContrast,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        realtime
    },
    {
        name: '高光',
        key: EffectParamEnum.EnhanceEditHighlight,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        realtime
    },
    {
        name: '阴影',
        key: EffectParamEnum.EnhanceEditShadow,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        realtime
    },
    {
        name: '白色',
        key: EffectParamEnum.EnhanceEditWhite,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        realtime
    },
    {
        name: '黑色',
        key: EffectParamEnum.EnhanceEditBlack,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        line: true,
        realtime
    },
    {
        title: '偏好',
        name: '清晰度',
        key: EffectParamEnum.EnhanceEditCameraRawSharpen,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        realtime
    },
    {
        name: '鲜艳度',
        key: EffectParamEnum.EnhanceEditCameraRawVibrance,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        realtime
    },
    {
        name: '饱和度',
        key: EffectParamEnum.EnhanceEditSaturation,
        cType: 'ts-slider',
        min: -100,
        value: 0,
        realtime
    }
]
