import { AlgoVersionEnum, CropEnum, EffectNameEnum, ParamsFlagEnum } from '@/constants/presetParams/presetConfig'
import { IFormatCheckJson, IPresetGroupItem } from '@/types/preset'
import { isIntersect } from '@/utils/tsMath'

export enum PresetItemValue {
    // 色彩调节
    Color = 100,

    Filter,
    WhiteBalance,
    Base,
    HSL,
    Detail,

    // 人像调节
    Person = 200,

    RemoveDefects,
    Skin,
    FacialRefine,
    Teeth,
    Eye,
    Makeup,
    Body,

    // 图像调节
    Image = 300,
    BgCleanSwitch,
    BgCleanMooreSwitch,
    BackgroundEnhance,
    Replace,
    Sky,

    // 裁剪
    Crop = 400,
    CropItem,
    Rotate
}

// 色彩调节
export const colorGroup: IPresetGroupItem[] = [
    {
        name: '滤镜',
        value: PresetItemValue.Filter,
        includes: {
            effects: [EffectNameEnum.Filter],
            params: [ParamsFlagEnum.FilterAlpha]
        }
    },
    {
        name: '白平衡',
        value: PresetItemValue.WhiteBalance,
        includes: {
            params: [
                ParamsFlagEnum.EnhanceEditColorTemperature,
                ParamsFlagEnum.EnhanceEditHue,
                ParamsFlagEnum.EnhanceEditColorTemperatureRelative,
                ParamsFlagEnum.EnhanceEditHueRelative
            ]
        }
    },
    {
        name: '影调',
        value: PresetItemValue.Base,
        includes: {
            params: [
                ParamsFlagEnum.EnhanceEditExposure,
                ParamsFlagEnum.EnhanceEditContrast,
                ParamsFlagEnum.EnhanceEditHighlight,
                ParamsFlagEnum.EnhanceEditShadow,
                ParamsFlagEnum.EnhanceEditWhite,
                ParamsFlagEnum.EnhanceEditBlack,
                ParamsFlagEnum.EnhanceEditSaturation,
                ParamsFlagEnum.EnhanceEditCameraRawSharpen,
                ParamsFlagEnum.EnhanceEditCameraRawVibrance
            ]
        }
    },
    {
        name: 'HSL',
        value: PresetItemValue.HSL,
        includes: {
            params: [
                ParamsFlagEnum.EnhanceEditHSLHue,
                ParamsFlagEnum.EnhanceEditHSLSaturation,
                ParamsFlagEnum.EnhanceEditHSLLightness
            ]
        }
    },
    {
        name: '细节',
        value: PresetItemValue.Detail,
        includes: {
            params: [
                ParamsFlagEnum.EnhanceEditCRDBStrength,
                ParamsFlagEnum.EnhanceEditCRDBRadius,
                ParamsFlagEnum.EnhanceEditCRDBDetail
            ]
        }
    }
]


// 人像美化
export const personGroup: IPresetGroupItem[] = [
    {
        name: '祛除瑕疵',
        value: PresetItemValue.RemoveDefects,
        includes: {
            params: [
                ParamsFlagEnum.Spotless,
                ParamsFlagEnum.RemoveNevus,
                ParamsFlagEnum.SpotlessBody,
                ParamsFlagEnum.RemoveEyeLines,
                ParamsFlagEnum.RemoveForeheadLines,
                ParamsFlagEnum.LightenPouch,
                ParamsFlagEnum.TearTrough,
                ParamsFlagEnum.RemoveNeckLines,
                ParamsFlagEnum.RemoveDoubleChin,
                ParamsFlagEnum.StretchMark,
                ParamsFlagEnum.StretchMarkLine
            ]
        }
    },
    {
        name: '皮肤调整',
        value: PresetItemValue.Skin,
        includes: {
            params: [
                ParamsFlagEnum.NeutralGrayRetouch,
                ParamsFlagEnum.MoisturizingSkin,
                ParamsFlagEnum.MoisturizingSkinNoFace,
                ParamsFlagEnum.SkinColorLighten,
                ParamsFlagEnum.SkinColorWhiten,
                ParamsFlagEnum.SkinColorRuddy,
                ParamsFlagEnum.SkinColorUniform
            ]
        }
    },
    {
        name: '面部重塑',
        value: PresetItemValue.FacialRefine,
        includes: {
            params: [
                ParamsFlagEnum.HeadNarrow,
                ParamsFlagEnum.FaceLift,
                ParamsFlagEnum.FacialRefineTemple,
                ParamsFlagEnum.FacialRefineCheekBone,
                ParamsFlagEnum.FaceWidth,
                ParamsFlagEnum.FacialRefineJaw,
                ParamsFlagEnum.FacialRefineChin,
                ParamsFlagEnum.FacialRefineHairLine,
                ParamsFlagEnum.FacialRefineSmallFace,

                ParamsFlagEnum.FacialRefineEyeZoom,
                ParamsFlagEnum.FacialRefineEyeHigher,
                ParamsFlagEnum.FacialRefineEyeWidth,
                ParamsFlagEnum.FacialRefineEyeDistance,
                ParamsFlagEnum.FacialRefineEyeAngle,
                ParamsFlagEnum.FacialRefineEyeUpDownAdjust,

                ParamsFlagEnum.FacialRefineNose,
                ParamsFlagEnum.FacialRefineNoseHigher,
                ParamsFlagEnum.FacialRefineNoseAlar,
                ParamsFlagEnum.FacialRefineNoseBridge,
                ParamsFlagEnum.FacialRefineNoseTip,

                ParamsFlagEnum.FacialRefineMouthSize,
                ParamsFlagEnum.FacialRefineMouthWidth,
                ParamsFlagEnum.FacialRefineMouthHigher,
                ParamsFlagEnum.FacialRefineMouthUpperLip,
                ParamsFlagEnum.FacialRefineMouthLowperLip,

                ParamsFlagEnum.FacialRefineEyeBrowThickness,
                ParamsFlagEnum.FacialRefineEyeBrowDistance,
                ParamsFlagEnum.FacialRefineEyeBrowAngle,
                ParamsFlagEnum.FacialRefineEyeBrowShape,
                ParamsFlagEnum.FacialRefineEyeBrowHigher,

                ParamsFlagEnum.LeftEyeBrowThickness,
                ParamsFlagEnum.RightEyeBrowThickness,
                ParamsFlagEnum.LeftEyeBrowHigher,
                ParamsFlagEnum.RightEyeBrowHigher,
                ParamsFlagEnum.LeftEyeBrowDistance,
                ParamsFlagEnum.RightEyeBrowDistance,
                ParamsFlagEnum.LeftEyeBrowAngle,
                ParamsFlagEnum.RightEyeBrowAngle,
                ParamsFlagEnum.LeftEyeBrowShape,
                ParamsFlagEnum.RightEyeBrowShape,

                ParamsFlagEnum.LeftEyeZoom,
                ParamsFlagEnum.RightEyeZoom,
                ParamsFlagEnum.LeftEyeHigher,
                ParamsFlagEnum.RightEyeHigher,
                ParamsFlagEnum.LeftEyeDistance,
                ParamsFlagEnum.RightEyeDistance,
                ParamsFlagEnum.LeftEyeAngle,
                ParamsFlagEnum.RightEyeAngle,
                ParamsFlagEnum.LeftEyeWidth,
                ParamsFlagEnum.RightEyeWidth,
                ParamsFlagEnum.LeftEyeUpDownAdjust,
                ParamsFlagEnum.RightEyeUpDownAdjust,

                ParamsFlagEnum.LeftJaw,
                ParamsFlagEnum.RightJaw,
                ParamsFlagEnum.LeftFaceLift,
                ParamsFlagEnum.RightFaceLift,
                ParamsFlagEnum.LeftCheekBone,
                ParamsFlagEnum.RightCheekBone,
                ParamsFlagEnum.LeftTemple,
                ParamsFlagEnum.RightTemple,
                ParamsFlagEnum.SymmetryReshapeSwitch,
                ParamsFlagEnum.SymmetryReshapeFace,
                ParamsFlagEnum.SymmetryReshapeBody
            ],

            algoVersion: [AlgoVersionEnum.FaceSurgery]
        }
    },
    {
        name: '牙齿美化',
        value: PresetItemValue.Teeth,
        includes: {
            params: [ParamsFlagEnum.TeethWhiten, ParamsFlagEnum.ToothRepairing]
        }
    },
    {
        name: '眼睛增强',
        value: PresetItemValue.Eye,
        includes: {
            params: [ParamsFlagEnum.BrightEye]
        }
    },
    {
        name: '妆容调整',
        value: PresetItemValue.Makeup,
        includes: {
            effects: [
                EffectNameEnum.MakeupSuit,
                EffectNameEnum.Eyebrow,
                EffectNameEnum.Eyemakeup,
                EffectNameEnum.Eyelash,
                EffectNameEnum.Blusher,
                EffectNameEnum.Lipstick
            ],
            params: [
                ParamsFlagEnum.FacialStereo3DLight,
                ParamsFlagEnum.FacialStereo3DShadow,
                ParamsFlagEnum.MakeupEnhanceEye,
                ParamsFlagEnum.MakeupEnhanceMouth,

                ParamsFlagEnum.EyebrowMakeup,
                ParamsFlagEnum.EyelashMakeup,
                ParamsFlagEnum.BlusherMakeup,
                ParamsFlagEnum.LipMakeup,
                ParamsFlagEnum.EyeMakeup,
                ParamsFlagEnum.SuitMakeup
            ]
        }
    },
    {
        name: '全身美型',
        value: PresetItemValue.Body,
        includes: {
            params: [
                ParamsFlagEnum.AIBodyReshape,
                ParamsFlagEnum.PoseRefineSlimHand,
                ParamsFlagEnum.PoseRefineSlimWaist,
                ParamsFlagEnum.PoseRefineSlimLeg,
                ParamsFlagEnum.PoseRefineEnhanceBreast,
                ParamsFlagEnum.PoseRefineNiceButtock,
                ParamsFlagEnum.PoseRefineSlim,
                ParamsFlagEnum.PoseRefineShrinkHead,
                ParamsFlagEnum.PoseRefineLengthen,
                ParamsFlagEnum.PoseRefineHeighten,
                ParamsFlagEnum.PoseRefineSlimLeftNeck,
                ParamsFlagEnum.PoseRefineSlimRightNeck
            ]
        }
    }
]

// 图像美化
export const imageGroup: IPresetGroupItem[] = [
    {
        name: '纯色背景祛瑕疵',
        value: PresetItemValue.BgCleanSwitch,
        includes: {
            params: [
                ParamsFlagEnum.BgCleanSwitch,
                ParamsFlagEnum.BgCleanMode
            ]
        }
    },
    {
        name: '纯色背景祛色彩断层',
        value: PresetItemValue.BgCleanMooreSwitch,
        includes: {
            params: [
                ParamsFlagEnum.BgCleanMooreSwitch,
                ParamsFlagEnum.BgCleanMooreMode
            ]
        }
    },
    {
        name: '背景增强',
        value: PresetItemValue.BackgroundEnhance,
        includes: {
            params: [ParamsFlagEnum.BackgroundEnhance]
        }
    },
    {
        name: '证件照换背景',
        value: PresetItemValue.Replace,
        includes: {
            effects: [EffectNameEnum.BgReplace],
            params: [ParamsFlagEnum.BgReplaceGamma]
        }
    },
    {
        name: '换天空',
        value: PresetItemValue.Sky,
        includes: {
            effects: [EffectNameEnum.SkyReplace],
            params: [
                ParamsFlagEnum.SkyEdgeTransition,
                ParamsFlagEnum.SkyTemp,
                ParamsFlagEnum.SkySaturation,
                ParamsFlagEnum.SkyBrightness,
                ParamsFlagEnum.SkyVague,
                ParamsFlagEnum.SkySceneryColor,
                ParamsFlagEnum.SkyCharacterColor,
                ParamsFlagEnum.SkyWaterReflex,
                ParamsFlagEnum.SkyWaterVague,
                ParamsFlagEnum.SkyFlip
            ]
        }
    }
]

// 裁剪
export const cropGroup: IPresetGroupItem[] = [
    {
        name: '裁剪',
        value: PresetItemValue.CropItem,
        includes: {
            crop: [CropEnum.Crop]
        }
    },
    {
        name: '旋转',
        value: PresetItemValue.Rotate,
        includes: {
            crop: [CropEnum.Rotate]
        }
    }
]

export const presetGroup = [
    {
        name: '色彩调节',
        value: PresetItemValue.Color,
        children: colorGroup
    },
    {
        name: '人像美化',
        value: PresetItemValue.Person,
        children: personGroup
    },
    {
        name: '图像美化',
        value: PresetItemValue.Image,
        children: imageGroup
    },
    {
        name: '裁剪',
        value: PresetItemValue.Crop,
        children: cropGroup
    }
]

// 过滤非裁剪选项作为默认值
const obj = {}
const nonObj = {}
const selectAll = {}

presetGroup.forEach(item => {
    obj[item.value] = item.value !== PresetItemValue.Crop
        ? item.children.map(item => item.value)
        : []

    nonObj[item.value] = []
    selectAll[item.value] = item.children.map(item => item.value)
})

// 选中所有参数
export const selectAllCheckboxSettings = selectAll
// 默认参数
export const defaultSyncCheckboxSettings = obj
// 全部选
export const nonSelectCheckboxSettings = nonObj

export const getCustomCheckboxSettings = (config: IFormatCheckJson) => {
    const { effects, params, algoVersion, crop } = config
    const obj = {}
    presetGroup.forEach(item => {
        obj[item.value] = []
        item.children.forEach(child => {
            if (child.includes) {
                if (isIntersect(child.includes.params || [], params)) {
                    if (!obj[item.value].includes(child.value)) {
                        obj[item.value].push(child.value)
                    }
                }

                if (isIntersect(child.includes.effects || [], effects)) {
                    if (!obj[item.value].includes(child.value)) {
                        obj[item.value].push(child.value)
                    }
                }

                if (isIntersect(child.includes.algoVersion || [], algoVersion)) {
                    if (!obj[item.value].includes(child.value)) {
                        obj[item.value].push(child.value)
                    }
                }

                if (isIntersect(child.includes.crop || [], crop)) {
                    if (!obj[item.value].includes(child.value)) {
                        obj[item.value].push(child.value)
                    }
                }
            }
        })
    })

    return obj
}
