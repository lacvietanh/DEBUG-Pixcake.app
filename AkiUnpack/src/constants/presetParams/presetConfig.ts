export enum EffectNameEnum {
    // 妆容
    MakeupSuit = 'MakeupSuit',
    Eyebrow = 'Eyebrow',
    Eyemakeup = 'Eyemakeup',
    Eyelash = 'Eyelash',
    Blusher = 'Blusher',
    Lipstick = 'Lipstick',

    Filter = 'Filter',
    BgReplace = 'BgReplace',
    SkyReplace = 'SkyReplace'
}

export enum ParamsFlagEnum {
    /**
     * 祛除瑕疵
     */
    Spotless = 0,                        // 祛痘祛斑
    RemoveNevus = 90013,                 // 祛痣
    SpotlessBody = 90019,                // 祛痘祛斑-身体
    RemoveEyeLines = 90023,              // 祛眼纹
    RemoveForeheadLines = 90024,         // 祛抬头纹
    LightenPouch = 5,                    // 淡化黑眼圈
    TearTrough = 6,                      // 去法令纹
    RemoveNeckLines = 90015,             // 祛除颈纹
    RemoveDoubleChin = 90034,            // 双下巴
    StretchMark = 90008,                 // 妊娠纹程度
    StretchMarkLine = 90037,             // 妊娠线程度

    /**
     * 皮肤调整
     */
    NeutralGrayRetouch = 90001,          // 中性灰 磨皮
    MoisturizingSkin = 90002,            // 润肤
    MoisturizingSkinNoFace = 90010,      // 润肤 非脸部区域
    SkinColorLighten = 90004,            // 肤色透亮
    SkinColorWhiten = 90005,             // 肤色美白
    SkinColorRuddy = 90007,              // 肤色红润
    SkinColorUniform = 90003,            // 肤色统一

    /**
     * 面部重塑
     */
    HeadNarrow = 222,                    // 小头调整:
    FaceLift = 200,                      // 瘦脸调整:
    FacialRefineTemple = 227,            // 面部调整-太阳穴:
    FacialRefineCheekBone = 204,         // 面部调整-颧骨:
    FaceWidth = 223,                     // 脸宽调整:
    FacialRefineJaw = 228,               // 面部调整-下颌:
    FacialRefineChin = 205,              // 面部调整-下巴:
    FacialRefineHairLine = 202,          // 面部调整-发际线:
    FacialRefineSmallFace = 230,         // 面部调整-小脸:
    // FacialRefineScaleFace = 231,         // 面部调整-缩脸:

    FacialRefineEyeZoom = 201,           // 面部调整-眼睛大小:
    FacialRefineEyeHigher = 206,         // 面部调整-眼高:
    FacialRefineEyeWidth = 225,          // 面部调整-眼睛宽度:
    FacialRefineEyeDistance = 207,       // 面部调整-眼距:
    FacialRefineEyeAngle = 208,          // 面部调整-眼角倾斜:
    FacialRefineEyeUpDownAdjust = 226,   // 面部调整-眼睛上下，位置:

    FacialRefineNose = 203,              // 面部调整-鼻子大小:
    FacialRefineNoseHigher = 209,        // 面部调整-鼻子高度:
    FacialRefineNoseAlar = 210,          // 面部调整-鼻翼调整:
    FacialRefineNoseBridge = 211,        // 面部调整-鼻梁调整:
    FacialRefineNoseTip = 212,           // 面部调整-鼻尖调整:

    FacialRefineMouthSize = 213,         // 面部调整-嘴巴大小:
    FacialRefineMouthWidth = 224,        // 面部调整-嘴巴宽度:
    FacialRefineMouthHigher = 214,       // 面部调整-嘴巴高度:
    FacialRefineMouthUpperLip = 215,     // 面部调整-嘴巴上唇:
    FacialRefineMouthLowperLip = 216,    // 面部调整-嘴巴下唇:

    FacialRefineEyeBrowThickness = 217,  // 面部调整-眉毛粗细:
    FacialRefineEyeBrowDistance = 219,   // 面部调整-眉毛距离:
    FacialRefineEyeBrowAngle = 220,      // 面部调整-眉毛倾斜:
    FacialRefineEyeBrowShape = 221,      // 面部调整-眉毛形状:
    FacialRefineEyeBrowHigher = 218,     // 面部调整-眉毛位置:

    LeftEyeBrowThickness = 8001,             // 面部调整-左边眉毛粗细:
    RightEyeBrowThickness = 8002,            // 面部调整-右边眉毛粗细:
    LeftEyeBrowHigher = 8003,                // 面部调整-左边眉毛高度:
    RightEyeBrowHigher = 8004,               // 面部调整-右边眉毛高度:
    LeftEyeBrowDistance = 8005,              // 面部调整-左边眉毛距离:
    RightEyeBrowDistance = 8006,             // 面部调整-右边眉毛距离:
    LeftEyeBrowAngle = 8007,                 // 面部调整-左边眉毛角度:
    RightEyeBrowAngle = 8008,                // 面部调整-右边眉毛角度:
    LeftEyeBrowShape = 8009,                 // 面部调整-左边眉毛形状:
    RightEyeBrowShape = 8010,                // 面部调整-右边眉毛形状:

    LeftEyeZoom = 8011,                      // 面部调整-左眼部:
    RightEyeZoom = 8012,                     // 面部调整-右眼部:
    LeftEyeHigher = 8013,                    // 面部调整-左眼高:
    RightEyeHigher = 8014,                   // 面部调整-右眼高:
    LeftEyeDistance = 8015,                  // 面部调整-左眼距:
    RightEyeDistance = 8016,                 // 面部调整-右眼距:
    LeftEyeAngle = 8017,                     // 面部调整-左眼角:
    RightEyeAngle = 8018,                    // 面部调整-右眼角:
    LeftEyeWidth = 8019,                     // 面部调整-左眼睛宽度:
    RightEyeWidth = 8020,                    // 面部调整-右眼睛宽度:
    LeftEyeUpDownAdjust = 8021,              // 面部调整-左眼睛上下调整:
    RightEyeUpDownAdjust = 8022,             // 面部调整-右眼睛上下调整:

    LeftJaw = 8023,                          // 面部调整-左下颌:
    RightJaw = 8024,                         // 面部调整-右下颌:
    LeftFaceLift = 8025,                     // 左边瘦脸调整:
    RightFaceLift = 8026,                    // 右边瘦脸调整:
    LeftCheekBone = 8027,                    // 面部调整-左颧骨:
    RightCheekBone = 8028,                   // 面部调整-右颧骨:
    LeftTemple = 8029,                       // 面部调整-左太阳穴:
    RightTemple = 8030,                      // 面部调整-右太阳穴:

    /**
     * 牙齿美化
     */
    TeethWhiten = 108,                   // 牙齿美白:
    ToothRepairing = 90040,              // 牙齿修复

    /**
     * 眼睛增强
     */
    BrightEye = 4,                       // 亮眼调整:

    /**
     * 妆容调整
     */
    FacialStereo3DLight = 9,             // 3D高光
    FacialStereo3DShadow = 8,            // 3D阴影
    MakeupEnhanceEye = 90020,            // 眼妆增强
    MakeupEnhanceMouth = 90021,           // 唇妆增强

    EyebrowMakeup = 100,                     // 眉毛美妆:
    EyelashMakeup = 105,                     // 眼睫毛美妆:
    BlusherMakeup = 106,                     // 腮红美妆:
    LipMakeup = 107,                         // 唇妆:
    EyeMakeup = 90032,                       // 眼妆：
    SuitMakeup = 90033,                      // 套妆：

    /**
     * 对称性液化
     */
    SymmetryReshapeSwitch = 90046,
    SymmetryReshapeFace = 90047,
    SymmetryReshapeBody = 90048,

    /**
     * 全身美型
     */
    AIBodyReshape = 90041,               // ai全身美型修复
    PoseRefineSlimHand = 400,          // 全身美型: 瘦手臂
    PoseRefineSlimWaist = 401,         // 全身美型: 瘦腰
    PoseRefineSlimLeg = 402,           // 全身美型: 瘦腿
    PoseRefineEnhanceBreast = 403,     // 全身美型: 丰胸
    PoseRefineNiceButtock = 404,       // 全身美型: 美臀
    PoseRefineSlim = 405,              // 全身美型: 瘦身
    PoseRefineShrinkHead = 406,        // 全身美型: 头部
    PoseRefineLengthen = 407,          // 全身美型: 长腿
    PoseRefineHeighten = 408,          // 全身美型: 增高
    PoseRefineSlimLeftNeck = 8031,          // 全身美型: 瘦左脖子
    PoseRefineSlimRightNeck = 8032,          // 全身美型: 瘦右脖子


    /**
     * 滤镜
     */
    FilterAlpha = 300,                   // 滤镜透明度:

    /**
     * 白平衡
     */
    EnhanceEditColorTemperature = 3007,     // 色温 存储相对值  1600-60000 (-1到1) 显示：5000 + 200，传：200
    EnhanceEditHue = 3008,                  // 色调 存储相对值  -100-100  （-1到1）
    EnhanceEditColorTemperatureRelative = 90011,      // 色温相对值
    EnhanceEditHueRelative = 90012,                   // 色调相对值

    /**
     * 细节
     */
    EnhanceEditCRDBStrength = 90016,                   // 数量（锐化）
    EnhanceEditCRDBRadius = 90017,                   // 半径
    EnhanceEditCRDBDetail = 90018,                   // 细节

    /**
     * Camera Caw
     */
    EnhanceEditExposure = 3000,             // 智能补光，曝光   0-1.0
    EnhanceEditContrast = 3002,             // 对比度
    EnhanceEditHighlight = 3003,            // 高光
    EnhanceEditShadow = 3004,               // 阴影
    EnhanceEditWhite = 3020,                // 白色
    EnhanceEditBlack = 3021,                // 黑色
    EnhanceEditSaturation = 3006,           // 饱和度
    EnhanceEditCameraRawSharpen = 3022,     // 清晰度
    EnhanceEditCameraRawVibrance = 90014,   // 鲜艳度

    /**
     * HSL
     */
    EnhanceEditHSLHue = 3011,              // HSL 色相
    EnhanceEditHSLSaturation = 3012,       // HSL 饱和度
    EnhanceEditHSLLightness = 3013,        // HSL 明度


    /**
     * 纯色背景去瑕疵
     */
    BgCleanSwitch = 90035,               // 背景去瑕疵
    BgCleanMode = 90036,                 // 背景去瑕疵模式
    BgCleanMooreSwitch = 90038,          // 祛摩尔纹
    BgCleanMooreMode = 90039,            // 祛摩尔纹模式
    BackgroundEnhance = 90006,           // 背景增强

    /**
     * 换背景
     */
    BgReplaceGamma = 90042,              // 换背景边缘细节
    BgReplaceBeta = 90045,               // 换背景头发边缘

    /**
     * 换天空
     */
    SkyEdgeTransition = 90049,
    SkyTemp = 90050,
    SkySaturation = 90051,
    SkyBrightness = 90052,
    SkyVague = 90053,
    SkySceneryColor = 90054,
    SkyCharacterColor = 90055,
    SkyWaterReflex = 90056,
    SkyWaterVague = 90057,
    SkyFlip = 90058,

    /**
     * 证件照
     */
    IDPhotoCropType = 90043,             // 证件照裁剪类型      0-17
    IDPhotoCropDPI = 90044,              // 证件照DPI
    TransformRotation = 90009,           // 旋转
}

export enum EffectParamHslColor {
    Red = 0,            // 红
    Orange = 1,      // 橙
    Yellow = 2,      // 黄
    Green = 3,        // 绿
    Cyan = 4,          // 青（浅绿色）
    Blue = 5,          // 蓝
    Purple = 6,      // 紫色
    Magenta = 7,    // 洋红
}


export enum AlgoVersionEnum {
    FaceSurgery = 'FaceSurgery'
}

export enum CropEnum {
    Rotate = 'Rotate',
    Crop = 'Crop'
}
