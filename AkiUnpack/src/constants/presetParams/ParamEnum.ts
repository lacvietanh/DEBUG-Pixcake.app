export enum EffectParamEnum {
    NeutralGrayRetouch = 'NeutralGrayRetouch',          // 中性灰 磨皮       0.0-1.0
    MoisturizingSkin = 'MoisturizingSkin',              // 润肤             0.0-1.0
    Spotless = 'Spotless',                              // 祛痘祛斑          0.0-1.0
    SpotlessBody = 'SpotlessBody',                      // 祛痘祛斑-body     0.0-1.0
    SkinColorUniform = 'SkinColorUniform',              // 肤色统一          开关传0 or 1.0
    SkinColorLighten = 'SkinColorLighten',              // 肤色透亮          0.0-1.0
    SkinColorWhiten = 'SkinColorWhiten',                // 肤色美白          0.0-1.0
    FacialStereo3DLight = 'FacialStereo3DLight',        // 3D高光           0.0-1.0
    FacialStereo3DShadow = 'FacialStereo3DShadow',      // 3D阴影           0.0-1.0
    BgCleanSwitch = 'BgCleanSwitch',                    // 背景祛瑕疵        开关传0 or 1.0
    BgCleanMooreSwitch = 'BgCleanMooreSwitch',          // 背景祛摩尔纹      开关传0 or 1.0
    BgCleanMode = 'BgCleanMode',                        // 背景祛瑕疵模式
    BgCleanMooreMode = 'BgCleanMooreMode',              // 背景祛摩尔纹模式
    ToothRepairing = 'ToothRepairing',                  // 牙齿修复
    BackgroundEnhance = 'BackgroundEnhance',            // 背景增强          0.0-1.0
    SkinColorRuddy = 'SkinColorRuddy',                  // 肤色红润          0.0-1.0
    StretchMark = 'StretchMark',                        // 妊娠纹程度         0.0-1.0
    StretchMarkLine = 'StretchMarkLine',                // 妊娠线            0.0-1.0
    TransformRotation = 'TransformRotation',            // 旋转
    MoisturizingSkinNoFace = 'MoisturizingSkinNoFace',  // 润肤 非脸部区域    0.0-1.0
    RemoveNevus = 'RemoveNevus', // 开启祛痘祛斑，是否保留痣 0.0 or 1.0
    RemoveNeckLines = 'RemoveNeckLines',                // 祛除颈纹
    RemoveEyeLines = 'RemoveEyeLines',                  // 眼纹             0.0-1.0
    RemoveForeheadLines = 'RemoveForeheadLines',        // 抬头纹            0.0-1.0
    RemoveDoubleChin = 'RemoveDoubleChin',              // 双下巴            0.0-1.0

    HeadNarrow = 'HeadNarrow',                          // 小头调整:         0.0-1.0
    FaceLift = 'FaceLift',                              // 瘦脸调整:         0.0-1.0
    FacialRefineTemple = 'FacialRefineTemple',          // 面部调整-太阳穴:   0.0-0.5表示收缩, 0.5表示不做, 0.5-1.0表示拉伸
    FacialRefineCheekBone = 'FacialRefineCheekBone',    // 面部调整-颧骨:     0.0-0.5表示收缩, 0.5表示不做, 0.5-1.0表示拉伸
    FaceWidth = 'FaceWidth',                            // 脸宽调整:         0.0-0.5表示收缩, 0.5表示不做, 0.5-1.0表示拉伸
    FacialRefineJaw = 'FacialRefineJaw',                // 面部调整-下颌:     0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下颌拉伸
    FacialRefineChin = 'FacialRefineChin',              // 面部调整-下巴:     0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下巴拉伸
    FacialRefineHairLine = 'FacialRefineHairLine',      // 面部调整-发际线:   0.0-0.5表示发际线拉伸, 0.5表示不做, 0.5-1.0表示发际线收缩
    FacialRefineSmallFace = 'FacialRefineSmallFace',    // 面部调整-小脸:     0.0-0.1
    // FacialRefineScaleFace = 'FacialRefineScaleFace',    // 面部调整-缩脸:      0.0-0.1

    FacialRefineEyeZoom = 'FacialRefineEyeZoom',        // 面部调整-眼睛大小:  0.0-1.0
    FacialRefineEyeHigher = 'FacialRefineEyeHigher',    // 面部调整-眼高:     0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineEyeWidth = 'FacialRefineEyeWidth',      // 面部调整-眼睛宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineEyeDistance = 'FacialRefineEyeDistance',// 面部调整-眼距:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    FacialRefineEyeAngle = 'FacialRefineEyeAngle',      // 面部调整-眼角倾斜:  0.0-0.5眼角下沉，0.5无效果，0.5-1.0眼角上扬
    FacialRefineEyeUpDownAdjust = 'FacialRefineEyeUpDownAdjust',   // 面部调整-眼睛上下，位置: 0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大

    FacialRefineNose = 'FacialRefineNose',              // 面部调整-鼻子大小:  0.0-1.0
    FacialRefineNoseHigher = 'FacialRefineNoseHigher',  // 面部调整-鼻子高度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineNoseAlar = 'FacialRefineNoseAlar',      // 面部调整-鼻翼调整:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineNoseBridge = 'FacialRefineNoseBridge',  // 面部调整-鼻梁调整:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineNoseTip = 'FacialRefineNoseTip',        // 面部调整-鼻尖调整:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大

    FacialRefineMouthSize = 'FacialRefineMouthSize',            // 面部调整-嘴巴大小:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineMouthWidth = 'FacialRefineMouthWidth',          // 面部调整-嘴巴宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineMouthHigher = 'FacialRefineMouthHigher',        // 面部调整-嘴巴高度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineMouthUpperLip = 'FacialRefineMouthUpperLip',    // 面部调整-嘴巴上唇:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineMouthLowperLip = 'FacialRefineMouthLowperLip',  // 面部调整-嘴巴下唇:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大

    FacialRefineEyeBrowThickness = 'FacialRefineEyeBrowThickness',  // 面部调整-眉毛粗细:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineEyeBrowDistance = 'FacialRefineEyeBrowDistance',    // 面部调整-眉毛距离:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineEyeBrowAngle = 'FacialRefineEyeBrowAngle',          // 面部调整-眉毛倾斜:  0.0-0.5表示下沉，0.5无效果，0.5-1.0表示上扬
    FacialRefineEyeBrowShape = 'FacialRefineEyeBrowShape',          // 面部调整-眉毛形状:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    FacialRefineEyeBrowHigher = 'FacialRefineEyeBrowHigher',        // 面部调整-眉毛位置:  0.0-0.5表示调低，0.5无效果，0.5-1.0表示调高

    LeftEyeBrowThickness = 'LeftEyeBrowThickness',     // 面部调整-左边眉毛粗细:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    RightEyeBrowThickness = 'RightEyeBrowThickness',   // 面部调整-右边眉毛粗细:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    LeftEyeBrowHigher = 'LeftEyeBrowHigher',           // 面部调整-左边眉毛高度:  0.0-0.5表示调低，0.5无效果，0.5-1.0表示调高
    RightEyeBrowHigher = 'RightEyeBrowHigher',         // 面部调整-右边眉毛高度:  0.0-0.5表示调低，0.5无效果，0.5-1.0表示调高
    LeftEyeBrowDistance = 'LeftEyeBrowDistance',       // 面部调整-左边眉毛距离:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    RightEyeBrowDistance = 'RightEyeBrowDistance',     // 面部调整-右边眉毛距离:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    LeftEyeBrowAngle = 'LeftEyeBrowAngle',             // 面部调整-左边眉毛角度:  0.0-0.5表示下沉，0.5无效果，0.5-1.0表示上扬
    RightEyeBrowAngle = 'RightEyeBrowAngle',           // 面部调整-右边眉毛角度:  0.0-0.5表示下沉，0.5无效果，0.5-1.0表示上扬
    LeftEyeBrowShape = 'LeftEyeBrowShape',             // 面部调整-左边眉毛形状:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    RightEyeBrowShape = 'RightEyeBrowShape',           // 面部调整-右边眉毛形状:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大

    LeftEyeZoom = 'LeftEyeZoom',                       // 面部调整-左眼部:     0.0-1.0眼睛大小
    RightEyeZoom = 'RightEyeZoom',                     // 面部调整-右眼部:     0.0-1.0眼睛大小
    LeftEyeHigher = 'LeftEyeHigher',                   // 面部调整-左眼高:     0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    RightEyeHigher = 'RightEyeHigher',                 // 面部调整-右眼高:     0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    LeftEyeDistance = 'LeftEyeDistance',               // 面部调整-左眼距:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    RightEyeDistance = 'RightEyeDistance',             // 面部调整-右眼距:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    LeftEyeAngle = 'LeftEyeAngle',                     // 面部调整-左眼角:     0.0-0.5眼角下沉，0.5无效果，0.5-1.0眼角上扬
    RightEyeAngle = 'RightEyeAngle',                   // 面部调整-右眼角:     0.0-0.5眼角下沉，0.5无效果，0.5-1.0眼角上扬
    LeftEyeWidth = 'LeftEyeWidth',                     // 面部调整-左眼睛宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    RightEyeWidth = 'RightEyeWidth',                   // 面部调整-右眼睛宽度:  0.0-0.5表示调小，0.5无效果，0.5-1.0表示调大
    LeftEyeUpDownAdjust = 'LeftEyeUpDownAdjust',       // 面部调整-左眼睛上下调整:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大
    RightEyeUpDownAdjust = 'RightEyeUpDownAdjust',     // 面部调整-右眼睛上下调整:     0.0-0.5表示距离调小，0.5无效果，0.5-1.0表示距离调大

    LeftJaw = 'LeftJaw',                               // 面部调整-左下颌:      0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下颌拉伸
    RightJaw = 'RightJaw',                             // 面部调整-右下颌:      0.0-0.5表示下颌收缩, 0.5表示不做, 0.5-1.0表示下颌拉伸
    LeftFaceLift = 'LeftFaceLift',                     // 左边瘦脸调整:          0.0-1.0
    RightFaceLift = 'RightFaceLift',                   // 右边瘦脸调整:          0.0-1.0
    LeftCheekBone = 'LeftCheekBone',                   // 面部调整-左颧骨:     0.0-1.0
    RightCheekBone = 'RightCheekBone',                 // 面部调整-右颧骨:     0.0-1.0
    LeftTemple = 'LeftTemple',                         // 面部调整-左太阳穴:     0.0-1.0
    RightTemple = 'RightTemple',                       // 面部调整-右太阳穴:     0.0-1.0

    TeethWhiten = 'TeethWhiten',                   // 牙齿美白:          0.0关闭, 1.0开启
    BrightEye = 'BrightEye',                       // 亮眼调整:          0.0-1.0
    LightenPouch = 'LightenPouch',                 // 淡化黑眼圈         0.0-1.0
    TearTrough = 'TearTrough',                     // 去法令纹           0.0-1.0

    EnhanceEditColorTemperature = 'EnhanceEditColorTemperature',     // 色温 存储相对值  1600-60000 (-1到1) 显示：5000 + 200，传：200
    EnhanceEditHue = 'EnhanceEditHue',                  // 色调 存储相对值  -100-100  （-1到1）
    EnhanceEditColorTemperatureRelative = 'EnhanceEditColorTemperatureRelative',      // 色温相对值    0.0-1.0
    EnhanceEditHueRelative = 'EnhanceEditHueRelative',                   // 色调相对值    0.0-1.0

    EnhanceEditCRDBStrength = 'EnhanceEditCRDBStrength',    // 锐化数量
    EnhanceEditCRDBRadius = 'EnhanceEditCRDBRadius',        // 锐化半径
    EnhanceEditCRDBDetail = 'EnhanceEditCRDBDetail',        // 锐化细节

    // Camera Caw
    EnhanceEditExposure = 'EnhanceEditExposure',        // 智能补光，曝光   0-1.0
    EnhanceEditContrast = 'EnhanceEditContrast',        // 对比度
    EnhanceEditHighlight = 'EnhanceEditHighlight',      // 高光
    EnhanceEditShadow = 'EnhanceEditShadow',            // 阴影
    EnhanceEditWhite = 'EnhanceEditWhite',              // 白色
    EnhanceEditBlack = 'EnhanceEditBlack',              // 黑色
    EnhanceEditSaturation = 'EnhanceEditSaturation',    // 饱和度
    EnhanceEditCameraRawSharpen = 'EnhanceEditCameraRawSharpen',     // 清晰度
    EnhanceEditCameraRawVibrance = 'EnhanceEditCameraRawVibrance',   // 鲜艳度

    EnhanceEditHSLHue = 'EnhanceEditHSLHue',                // HSL 色相
    EnhanceEditHSLSaturation = 'EnhanceEditHSLSaturation',  // HSL 饱和度
    EnhanceEditHSLLightness = 'EnhanceEditHSLLightness',    // HSL 明度

    PoseRefineSlimHand = 'PoseRefineSlimHand',              // 全身美型: 瘦手臂
    PoseRefineSlimWaist = 'PoseRefineSlimWaist',            // 全身美型: 瘦腰
    PoseRefineSlimLeg = 'PoseRefineSlimLeg',                // 全身美型: 瘦腿
    PoseRefineEnhanceBreast = 'PoseRefineEnhanceBreast',    // 全身美型: 丰胸
    PoseRefineNiceButtock = 'PoseRefineNiceButtock',        // 全身美型: 美臀
    PoseRefineSlim = 'PoseRefineSlim',                      // 全身美型: 瘦身
    PoseRefineShrinkHead = 'PoseRefineShrinkHead',          // 全身美型: 头部
    PoseRefineLengthen = 'PoseRefineLengthen',              // 全身美型: 长腿
    PoseRefineHeighten = 'PoseRefineHeighten',              // 全身美型：增高
    AIBodyReshape = 'AIBodyReshape',                        // ai全身美型
    PoseRefineSlimLeftNeck = 'PoseRefineSlimLeftNeck',      // 左脖子
    PoseRefineSlimRightNeck = 'PoseRefineSlimRightNeck',    // 右脖子
    PoseRefineSlimNeck = 'PoseRefineSlimNeck',              // 脖子

    BgReplacePath = 'BgReplace',                        // 证件照换背景
    BgReplaceGamma = 'BgReplaceGamma',                      // 换背景边缘细节
    BgReplaceBeta = 'BgReplaceBeta',                        // 换背景头发细节
    IDPhotoCropType = 'IDPhotoCropType',                    // 证件照裁剪类型
    IDPhotoCropDPI = 'IDPhotoCropDPI',                      // 证件照DPI

    SuitMakeup = 'SuitMakeup',                              // 套妆：              0.0-1.0
    EyebrowMakeup = 'EyebrowMakeup',                        // 眉毛美妆:          0.0-1.0
    EyeMakeup = 'EyeMakeup',                                // 眼妆：              0.0-1.0
    EyelashMakeup = 'EyelashMakeup',                        // 眼睫毛美妆:        0.0-1.0
    BlusherMakeup = 'BlusherMakeup',                        // 腮红美妆:          0.0-1.0
    LipMakeup = 'LipMakeup',                                // 唇妆:              0.0-1.0


    MakeupEnhanceEye = 'MakeupEnhanceEye',                   // 眼妆增强
    MakeupEnhanceMouth  = 'MakeupEnhanceMouth',              //唇妆增强

    FilterPath = 'FilterPath',          // 滤镜
    FilterAlpha = 'FilterAlpha',        // 滤镜透明度:        0.0-1.0

    SymmetryReshapeSwitch = 'SymmetryReshapeSwitch',
    SymmetryReshapeFace = 'SymmetryReshapeFace',
    SymmetryReshapeBody = 'SymmetryReshapeBody',

    //sky-sky
    SkyChoose = "SkyChoose",
    SkyBackgroundMove = "SkyBackgroundMove",
    SkyEdgeTransition = "SkyEdgeTransition",                //边缘过渡
    SkyTemp = "SkyTemp",                                    //色温
    SkySaturation = "SkySaturation",                        //饱和度
    SkyBrightness = "SkyBrightness",                        //亮度
    SkyVague = "SkyVague",                                  //虚化
    SkyFlip = "SkyFlip",                                    //水平翻转天空

    //sky_person_scene
    SkySceneryColor = "SkySceneryColor",                    //景物色彩（偏向天空)
    SkyCharacterColor = "SkyCharacterColor",                //人物色彩（偏向天空）

    //sky_water_scene
    SkyWaterReflex = "SkyWaterReflex",                      //景物反射
    SkyWaterVague = "SkyWaterVague"                         //景物水效虚化
}

export enum EffectParamPersonType {
    All = 'All',        // 所有人
    Female = 'Female',  // 女性
    Male = 'Male',      // 男性
    Child = 'Child',    // 小孩
    Older = 'Older',    // 长辈
}

export const EffectParamPersonTypeValue = {
    All: -1,        // 所有人
    Female: 0,  // 女性
    Male: 1,      // 男性
    Child: 2,    // 小孩
    Older: 3,    // 长辈
}

export enum EffectParamHslColor {
    Red = 'Red',            // 红
    Orange = 'Orange',      // 橙
    Yellow = 'Yellow',      // 黄
    Green = 'Green',        // 绿
    Cyan = 'Cyan',          // 青（浅绿色）
    Blue = 'Blue',          // 蓝
    Purple = 'Purple',      // 紫色
    Magenta = 'Magenta',    // 洋红
}

export enum EffectAlgoVersion {
    FaceSurgery = 'FaceSurgery'
}

export enum EffectNameEnum {
    MakeupSuit = 'MakeupSuit',
    Eyebrow = 'Eyebrow',
    Eyemakeup = 'Eyemakeup',
    Eyelash = 'Eyelash',
    Blusher = 'Blusher',
    Lipstick = 'Lipstick',
    Filter = 'Filter',
    Sky = 'SkyReplace'
}
