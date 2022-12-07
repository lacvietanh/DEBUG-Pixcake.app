import { EffectParamEnum, EffectParamPersonType, EffectParamHslColor } from './presetParams/ParamEnum'

export const ParamFlag: { [key: string]: number } = {
    [EffectParamEnum.NeutralGrayRetouch]: 90001,          // 中性灰 磨皮       0.0-1.0
    [EffectParamEnum.MoisturizingSkin]: 90002,            // 润肤             0.0-1.0
    [EffectParamEnum.Spotless]: 0,                        // 祛痘祛斑          0.0-1.0
    [EffectParamEnum.SpotlessBody]: 90019,                // 祛痘祛斑-身体      0.0-1.0 (0-100)
    [EffectParamEnum.SkinColorUniform]: 90003,            // 肤色统一          开关传0 or 1.0
    [EffectParamEnum.SkinColorLighten]: 90004,            // 肤色透亮          0.0-1.0
    [EffectParamEnum.SkinColorWhiten]: 90005,             // 肤色美白          0.0-1.0
    [EffectParamEnum.FacialStereo3DLight]: 9,             // 3D高光           0.0-1.0
    [EffectParamEnum.FacialStereo3DShadow]: 8,            // 3D阴影           0.0-1.0
    [EffectParamEnum.BackgroundEnhance]: 90006,           // 背景增强          0.0-1.0
    [EffectParamEnum.SkinColorRuddy]: 90007,              // 肤色红润          0.0-1.0
    [EffectParamEnum.StretchMark]: 90008,                 // 妊娠纹程度         0.0-1.0
    [EffectParamEnum.StretchMarkLine]: 90037,             // 妊娠线程度         0.0 or 1.0
    [EffectParamEnum.TransformRotation]: 90009,           // 旋转
    [EffectParamEnum.MoisturizingSkinNoFace]: 90010,      // 润肤 非脸部区域    0.0-1.0
    [EffectParamEnum.RemoveNevus]: 90013,                 // 祛痣             0.0 or 1.0
    [EffectParamEnum.RemoveNeckLines]: 90015,             // 祛除颈纹          0.0 or 1.0
    [EffectParamEnum.RemoveEyeLines]: 90023,              // 祛眼纹            0.0 or 1.0
    [EffectParamEnum.RemoveForeheadLines]: 90024,         // 祛抬头纹          0.0 or 1.0
    [EffectParamEnum.RemoveDoubleChin]: 90034,            // 双下巴            0.0 or 1.0
    [EffectParamEnum.BgCleanSwitch]: 90035,               // 背景去瑕疵       0.0 or 1.0
    [EffectParamEnum.BgCleanMode]: 90036,                 // 背景去瑕疵模式    0.0 or 1.0
    [EffectParamEnum.BgCleanMooreSwitch]: 90038,          // 祛摩尔纹          0.0 or 1.0
    [EffectParamEnum.BgCleanMooreMode]: 90039,            // 祛摩尔纹模式       0.0 or 1.0
    [EffectParamEnum.ToothRepairing]: 90040,              // 牙齿修复       0.0 or 1.0
    [EffectParamEnum.AIBodyReshape]: 90041,               // ai全身美型修复       0.0 or 1.0
    [EffectParamEnum.BgReplaceGamma]: 90042,              // 换背景边缘细节         0.0-1.0
    [EffectParamEnum.BgReplaceBeta]: 90045,               // 换背景头发边缘         0.0-1.0
    [EffectParamEnum.IDPhotoCropType]: 90043,             // 证件照裁剪类型      0-17
    [EffectParamEnum.IDPhotoCropDPI]: 90044,              // 证件照DPI          0.0-1.0

    [EffectParamEnum.HeadNarrow]: 222,                    // 小头调整:         0.0-1.0
    [EffectParamEnum.FaceLift]: 200,                      // 瘦脸调整:         0.0-1.0
    [EffectParamEnum.FacialRefineTemple]: 227,            // 面部调整-太阳穴:   0.0-0.5表示收缩, 0.5表示不做, 0.5-1.0表示拉伸
    [EffectParamEnum.FacialRefineCheekBone]: 204,         // 面部调整-颧骨:     0.0-0.5表示收缩, 0.5表示不做, 0.5-1.0表示拉伸
    [EffectParamEnum.FaceWidth]: 223,                     // 脸宽调整:         0.0-0.5表示收缩, 0.5表示不做, 0.5-1.0表示拉伸
    [EffectParamEnum.FacialRefineJaw]: 228,               // 面部调整-下颌:     0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下颌拉伸
    [EffectParamEnum.FacialRefineChin]: 205,              // 面部调整-下巴:     0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下巴拉伸
    [EffectParamEnum.FacialRefineHairLine]: 202,          // 面部调整-发际线:   0.0-0.5表示发际线拉伸, 0.5表示不做, 0.5-1.0表示发际线收缩
    [EffectParamEnum.FacialRefineSmallFace]: 230,         // 面部调整-小脸:     0.0-0.1
    // FacialRefineScaleFace: 231,         // 面部调整-缩脸:      0.0-0.1

    [EffectParamEnum.FacialRefineEyeZoom]: 201,           // 面部调整-眼睛大小:  0.0-1.0
    [EffectParamEnum.FacialRefineEyeHigher]: 206,         // 面部调整-眼高:     0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineEyeWidth]: 225,          // 面部调整-眼睛宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineEyeDistance]: 207,       // 面部调整-眼距:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    [EffectParamEnum.FacialRefineEyeAngle]: 208,          // 面部调整-眼角倾斜:  0.0-0.5眼角下沉，0.5无效果，0.5-1.0眼角上扬
    [EffectParamEnum.FacialRefineEyeUpDownAdjust]: 226,   // 面部调整-眼睛上下，位置: 0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大

    [EffectParamEnum.FacialRefineNose]: 203,              // 面部调整-鼻子大小:  0.0-1.0
    [EffectParamEnum.FacialRefineNoseHigher]: 209,        // 面部调整-鼻子高度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineNoseAlar]: 210,          // 面部调整-鼻翼调整:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineNoseBridge]: 211,        // 面部调整-鼻梁调整:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineNoseTip]: 212,           // 面部调整-鼻尖调整:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大

    [EffectParamEnum.FacialRefineMouthSize]: 213,         // 面部调整-嘴巴大小:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineMouthWidth]: 224,        // 面部调整-嘴巴宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineMouthHigher]: 214,       // 面部调整-嘴巴高度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineMouthUpperLip]: 215,     // 面部调整-嘴巴上唇:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineMouthLowperLip]: 216,    // 面部调整-嘴巴下唇:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大

    [EffectParamEnum.FacialRefineEyeBrowThickness]: 217,  // 面部调整-眉毛粗细:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineEyeBrowDistance]: 219,   // 面部调整-眉毛距离:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineEyeBrowAngle]: 220,      // 面部调整-眉毛倾斜:  0.0-0.5表示下沉，0.5无效果，0.5-1.0表示上扬
    [EffectParamEnum.FacialRefineEyeBrowShape]: 221,      // 面部调整-眉毛形状:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.FacialRefineEyeBrowHigher]: 218,     // 面部调整-眉毛位置:  0.0-0.5表示调低，0.5无效果，0.5-1.0表示调高


    [EffectParamEnum.LeftEyeBrowThickness]: 8001,             // 面部调整-左边眉毛粗细:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.RightEyeBrowThickness]: 8002,            // 面部调整-右边眉毛粗细:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.LeftEyeBrowHigher]: 8003,                // 面部调整-左边眉毛高度:  0.0-0.5表示调低，0.5无效果，0.5-1.0表示调高
    [EffectParamEnum.RightEyeBrowHigher]: 8004,               // 面部调整-右边眉毛高度:  0.0-0.5表示调低，0.5无效果，0.5-1.0表示调高
    [EffectParamEnum.LeftEyeBrowDistance]: 8005,              // 面部调整-左边眉毛距离:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.RightEyeBrowDistance]: 8006,             // 面部调整-右边眉毛距离:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.LeftEyeBrowAngle]: 8007,                 // 面部调整-左边眉毛角度:  0.0-0.5表示下沉，0.5无效果，0.5-1.0表示上扬
    [EffectParamEnum.RightEyeBrowAngle]: 8008,                // 面部调整-右边眉毛角度:  0.0-0.5表示下沉，0.5无效果，0.5-1.0表示上扬
    [EffectParamEnum.LeftEyeBrowShape]: 8009,                 // 面部调整-左边眉毛形状:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.RightEyeBrowShape]: 8010,                // 面部调整-右边眉毛形状:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大

    [EffectParamEnum.LeftEyeZoom]: 8011,                      // 面部调整-左眼部:     0.0-1.0眼睛大小
    [EffectParamEnum.RightEyeZoom]: 8012,                     // 面部调整-右眼部:     0.0-1.0眼睛大小
    [EffectParamEnum.LeftEyeHigher]: 8013,                    // 面部调整-左眼高:     0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.RightEyeHigher]: 8014,                   // 面部调整-右眼高:     0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.LeftEyeDistance]: 8015,                  // 面部调整-左眼距:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    [EffectParamEnum.RightEyeDistance]: 8016,                 // 面部调整-右眼距:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    [EffectParamEnum.LeftEyeAngle]: 8017,                     // 面部调整-左眼角:     0.0-0.5眼角下沉，0.5无效果，0.5-1.0眼角上扬
    [EffectParamEnum.RightEyeAngle]: 8018,                    // 面部调整-右眼角:     0.0-0.5眼角下沉，0.5无效果，0.5-1.0眼角上扬
    [EffectParamEnum.LeftEyeWidth]: 8019,                     // 面部调整-左眼睛宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.RightEyeWidth]: 8020,                    // 面部调整-右眼睛宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    [EffectParamEnum.LeftEyeUpDownAdjust]: 8021,              // 面部调整-左眼睛上下调整:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    [EffectParamEnum.RightEyeUpDownAdjust]: 8022,             // 面部调整-右眼睛上下调整:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大

    [EffectParamEnum.LeftJaw]: 8023,                          // 面部调整-左下颌:      0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下颌拉伸
    [EffectParamEnum.RightJaw]: 8024,                         // 面部调整-右下颌:      0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下颌拉伸
    [EffectParamEnum.LeftFaceLift]: 8025,                     // 左边瘦脸调整:          0.0-1.0
    [EffectParamEnum.RightFaceLift]: 8026,                    // 右边瘦脸调整:          0.0-1.0
    [EffectParamEnum.LeftCheekBone]: 8027,                    // 面部调整-左颧骨:     0.0-1.0
    [EffectParamEnum.RightCheekBone]: 8028,                   // 面部调整-右颧骨:     0.0-1.0
    [EffectParamEnum.LeftTemple]: 8029,                       // 面部调整-左太阳穴:     0.0-1.0
    [EffectParamEnum.RightTemple]: 8030,                      // 面部调整-右太阳穴:     0.0-1.0


    [EffectParamEnum.TeethWhiten]: 108,                   // 牙齿美白:          0.0关闭, 1.0开启
    [EffectParamEnum.BrightEye]: 4,                       // 亮眼调整:          0.0-1.0
    [EffectParamEnum.LightenPouch]: 5,                    // 淡化黑眼圈         0.0-1.0
    [EffectParamEnum.TearTrough]: 6,                      // 去法令纹           0.0-1.0
    [EffectParamEnum.FilterAlpha]: 300,                   // 滤镜透明度:        0.0-1.0

    [EffectParamEnum.EnhanceEditColorTemperature]: 3007,     // 色温 存储相对值  1600-60000 (-1到1) 显示：5000 + 200，传：200
    [EffectParamEnum.EnhanceEditHue]: 3008,                  // 色调 存储相对值  -100-100  （-1到1）
    [EffectParamEnum.EnhanceEditColorTemperatureRelative]: 90011,      // 色温相对值    0.0-1.0
    [EffectParamEnum.EnhanceEditHueRelative]: 90012,                   // 色调相对值    0.0-1.0

    [EffectParamEnum.EnhanceEditCRDBStrength]: 90016,                   // 数量（锐化）  0.0-1.0（0-150）
    [EffectParamEnum.EnhanceEditCRDBRadius]: 90017,                   // 半径         0.0-1.0（0.5-3.0）
    [EffectParamEnum.EnhanceEditCRDBDetail]: 90018,                   // 细节         0.0-1.0 (0-100)

    // Camera Caw
    [EffectParamEnum.EnhanceEditExposure]: 3000,             // 智能补光，曝光   0-1.0
    [EffectParamEnum.EnhanceEditContrast]: 3002,             // 对比度
    [EffectParamEnum.EnhanceEditHighlight]: 3003,            // 高光
    [EffectParamEnum.EnhanceEditShadow]: 3004,               // 阴影
    [EffectParamEnum.EnhanceEditWhite]: 3020,                // 白色
    [EffectParamEnum.EnhanceEditBlack]: 3021,                // 黑色
    [EffectParamEnum.EnhanceEditSaturation]: 3006,           // 饱和度
    [EffectParamEnum.EnhanceEditCameraRawSharpen]: 3022,     // 清晰度
    [EffectParamEnum.EnhanceEditCameraRawVibrance]: 90014,   // 鲜艳度


    [EffectParamEnum.EnhanceEditHSLHue]: 3011,              // HSL 色相
    [EffectParamEnum.EnhanceEditHSLSaturation]: 3012,       // HSL 饱和度
    [EffectParamEnum.EnhanceEditHSLLightness]: 3013,        // HSL 明度

    [EffectParamEnum.PoseRefineSlimHand]: 400,          // 全身美型: 瘦手臂
    [EffectParamEnum.PoseRefineSlimWaist]: 401,         // 全身美型: 瘦腰
    [EffectParamEnum.PoseRefineSlimLeg]: 402,           // 全身美型: 瘦腿
    [EffectParamEnum.PoseRefineEnhanceBreast]: 403,     // 全身美型: 丰胸
    [EffectParamEnum.PoseRefineNiceButtock]: 404,       // 全身美型: 美臀
    [EffectParamEnum.PoseRefineSlim]: 405,              // 全身美型: 瘦身
    [EffectParamEnum.PoseRefineShrinkHead]: 406,        // 全身美型: 头部
    [EffectParamEnum.PoseRefineLengthen]: 407,          // 全身美型: 长腿
    [EffectParamEnum.PoseRefineHeighten]: 408,          // 全身美型: 增高
    [EffectParamEnum.PoseRefineSlimLeftNeck]: 8031,          // 全身美型: 瘦左脖子
    [EffectParamEnum.PoseRefineSlimRightNeck]: 8032,          // 全身美型: 瘦右脖子

    [EffectParamEnum.EyebrowMakeup]: 100,                     // 眉毛美妆:          0.0-1.0
    [EffectParamEnum.EyelashMakeup]: 105,                     // 眼睫毛美妆:        0.0-1.0
    [EffectParamEnum.BlusherMakeup]: 106,                     // 腮红美妆:          0.0-1.0
    [EffectParamEnum.LipMakeup]: 107,                         // 唇妆:              0.0-1.0
    [EffectParamEnum.EyeMakeup]: 90032,                       // 眼妆：              0.0-1.0
    [EffectParamEnum.SuitMakeup]: 90033,                      // 套妆：              0.0-1.0

    [EffectParamEnum.MakeupEnhanceEye]: 90020,            // 眼妆增强
    [EffectParamEnum.MakeupEnhanceMouth]: 90021,           // 唇妆增强

    [EffectParamEnum.SymmetryReshapeSwitch]: 90046,
    [EffectParamEnum.SymmetryReshapeFace]: 90047,
    [EffectParamEnum.SymmetryReshapeBody]: 90048,

    [EffectParamEnum.SkyEdgeTransition]: 90049,
    [EffectParamEnum.SkyTemp]: 90050,
    [EffectParamEnum.SkySaturation]: 90051,
    [EffectParamEnum.SkyBrightness]: 90052,
    [EffectParamEnum.SkyVague]: 90053,
    [EffectParamEnum.SkySceneryColor]: 90054,
    [EffectParamEnum.SkyCharacterColor]: 90055,
    [EffectParamEnum.SkyWaterReflex]: 90056,
    [EffectParamEnum.SkyWaterVague]: 90057,
    [EffectParamEnum.SkyFlip]: 90058
}

export const PersonType: { [key: string]: number } = {
    [EffectParamPersonType.All]: -1,
    [EffectParamPersonType.Female]: 0,
    [EffectParamPersonType.Male]: 1,
    [EffectParamPersonType.Child]: 2,
    [EffectParamPersonType.Older]: 3
}

export const ColorType: { [key: string]: number } = {
    [EffectParamHslColor.Red]: 0,            // 红
    [EffectParamHslColor.Orange]: 1,      // 橙
    [EffectParamHslColor.Yellow]: 2,      // 黄
    [EffectParamHslColor.Green]: 3,        // 绿
    [EffectParamHslColor.Cyan]: 4,          // 青（浅绿色）
    [EffectParamHslColor.Blue]: 5,          // 蓝
    [EffectParamHslColor.Purple]: 6,      // 紫色
    [EffectParamHslColor.Magenta]: 7,    // 洋红
}
