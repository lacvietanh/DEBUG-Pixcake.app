import { EffectParamEnum } from './ParamEnum'


export const facialRefineTransformEnum = new Map<string[], string>([
    // 脸型
    [[EffectParamEnum.LeftFaceLift, EffectParamEnum.RightFaceLift], EffectParamEnum.FaceLift],
    [[EffectParamEnum.LeftTemple, EffectParamEnum.RightTemple], EffectParamEnum.FacialRefineTemple],
    [[EffectParamEnum.LeftCheekBone, EffectParamEnum.RightCheekBone], EffectParamEnum.FacialRefineCheekBone],
    [[EffectParamEnum.LeftJaw, EffectParamEnum.RightJaw], EffectParamEnum.FacialRefineJaw],

    // 眼睛
    [[EffectParamEnum.LeftEyeZoom, EffectParamEnum.RightEyeZoom], EffectParamEnum.FacialRefineEyeZoom],
    [[EffectParamEnum.LeftEyeHigher, EffectParamEnum.RightEyeHigher], EffectParamEnum.FacialRefineEyeHigher],
    [[EffectParamEnum.LeftEyeWidth, EffectParamEnum.RightEyeWidth], EffectParamEnum.FacialRefineEyeWidth],
    [[EffectParamEnum.LeftEyeDistance, EffectParamEnum.RightEyeDistance], EffectParamEnum.FacialRefineEyeDistance],
    [[EffectParamEnum.LeftEyeAngle, EffectParamEnum.RightEyeAngle], EffectParamEnum.FacialRefineEyeAngle],
    [[EffectParamEnum.LeftEyeUpDownAdjust, EffectParamEnum.RightEyeUpDownAdjust], EffectParamEnum.FacialRefineEyeUpDownAdjust],

    // 眉毛
    [[EffectParamEnum.LeftEyeBrowThickness, EffectParamEnum.RightEyeBrowThickness], EffectParamEnum.FacialRefineEyeBrowThickness],
    [[EffectParamEnum.LeftEyeBrowDistance, EffectParamEnum.RightEyeBrowDistance], EffectParamEnum.FacialRefineEyeBrowDistance],
    [[EffectParamEnum.LeftEyeBrowAngle, EffectParamEnum.RightEyeBrowAngle], EffectParamEnum.FacialRefineEyeBrowAngle],
    [[EffectParamEnum.LeftEyeBrowShape, EffectParamEnum.RightEyeBrowShape], EffectParamEnum.FacialRefineEyeBrowShape],
    [[EffectParamEnum.LeftEyeBrowHigher, EffectParamEnum.RightEyeBrowHigher], EffectParamEnum.FacialRefineEyeBrowHigher]

])

