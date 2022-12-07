import {
    EffectParamEnum,
    EffectParamHslColor
} from '@/constants/presetParams/ParamEnum'

/**
 * 埋点事件
 * 枚举
 */
export enum PointEvent {
    CakeNavMenu = 'cake_nav_menu',              // 导航菜单
    CakeImport = 'cake_import',                 // 导入
    CakeGallery = 'cake_gallery',               // 图库
    CakeRefine = 'cake_refine',                 // 精修
    CakeSetting = 'cake_setting',               // 设置
    CakeHelp = 'cake_help',                     // 帮助
    CakeExport = 'cake_export',                 // 导出
    CakeH5MemberPrice = 'cakeh5_member_price',  // H5 价格弹窗
    AppStart = 'app_start',                     // app启动
    Login = 'login',                            // 登录
    Logout = 'logout',                          // 登出
    CakeSession = 'cake_session',
    CakeExportList = 'cake_export_list',         // 导出列表
    CakeNewuserGuide = 'cake_newuser_guide',
    CakeFillinfo = 'cake_fillinfo',
    CakeAvatar = 'cake_avatar',
    CakeWorkBench = 'cake_workbench',            //项目页面
    CakeUpgradeGuide = 'upgrade_guide',            //引导圆圈
    CakeImageAdjustment = 'cake_image_adjustment'  //图像调节预览
}

export enum PointCakeAvatarOperate {
    ClickBackstage = 'click_backstage'
}

/**
 * 页面 RouteName 映射
 */
export enum PointRouteMap {
    PhotoFinishing = 'refine',
    BatchRetouch = 'gallery',
    Workbench = 'workbench',
    Login = 'login',
    Export = 'export_list',
    EmptyPage = 'empty_page' //导入的空页面
}

/**
 * 新手引导
 */
export enum PointGuideOperate {
    InitWorkbenchGuide = 'init_workbench_guide',       // 出现工作台引导
    InitPresetGuide = 'init_preset_guide',             // 出现预设引导
    InitSlideGuide = 'init_slide_guide',               // 出现滑杆引导
    InitSelectGuide = 'init_select_guide',             // 出现多选引导
    InitSynchronizeGuide = 'init_synchronize_guide',   // 出现同步到选中引导
    InitExportGuide = 'init_export_guide',             // 出现导出引导
    ClickQuit = 'click_quit',                          // 点击退出就统计

    InitImgAdjustmentGuide = 'image_adjustment_guide', //点击图像调节引导
    InitBackgroundGuide = 'background_adjustment_guide', //点击背景调节引导
    InitHistoryGuide = 'history_record_guide',            //点击历史记录引导
    InitCropGuide = 'crop_guide',
    InitPresetSettingGuide = 'preset_setting_guide',
}

/**
 * 精修操作
 */
export enum PointRefineOperate {
    CheckOriginalPhoto = 'original_photo',              // 查看原图
    AddSecond = 'add_second',                           // 二次导入
    ClickOriginal = 'click_original',                   // 点击1：1按钮
    ClickFit = 'click_fit',                             // 点击合适图标
    SelectOne = 'select_one',                           // 对图片进行选中
    Delete = 'delete',                                  // 右键点击删除
    DeleteAll = 'delete_all_select',                    // 右键点击批量删除
    SwipeSelect = 'swipe_select',                       // 鼠标按住滑动选图 （2.8.0）
    AddStar = 'add_star',                               // 对图片进行星标
    AddPresetSort = 'add_preset_sort',                  // 点击预设模块右上角新建分类
    DragPanel = 'drag_panel',                           // 拖动面板滑竿调整面板 （2.8.0）
    ImageAdjustment = 'image_adjustment_icon',          // 点击“图像调节”按钮
    PortraitBeautification = 'portrait_beauty_icon',    // 点击“人像美化”按钮
    OperationHistory = 'history_record_icon',           // 点击“历史记录”按钮
    BackgroundAdjustment = 'background_adjustment_icon',// 点击“背景调整”按钮
    CropIcon = 'crop_icon',
    ModifyGender = 'modify_gender',                     // 点击性别修改的icon
    AddPresetButton = 'add_preset_button',              // 保存新预设
    AddPresetIcon = 'add_preset_icon',                  // 添加预设图标
    AddApplyButton = 'add_apply_button',                // 同步预设
    SwitchGender = 'switch_gender',                     // 切换人物
    SelectFilter = 'select_filter',                      // 选择滤镜
    Feedback = 'feedback',                               //右键点击问题反馈
    FeedbackChooseCategory = 'feedback_choose_category',  //问题反馈--点击问题分类
    FeedbackInputContent = 'feedback_input_content',    //问题反馈--点击输入内容
    FeedbackCancel = 'feedback_cancel',                  //问题反馈--点击取消
    FeedbackConfirm = 'feedback_confirm',                 //问题反馈--点击确定（反馈图片类型）
    SavePresetSubmit1 = 'new_preset',                   //保存预设--新建全新预设点击“保存”按钮
    SavePresetSubmit2 = 'new_preset2',                   //保存预设--点击“创建新预设”按钮
    SavePresetCover = 'override_preset',                 //保存预设--点击“覆盖原预设”按钮
    ClickSmear = 'click_smear',
    ClickSmearPreservation = 'click_smear_preservation',
    ClickSmearCancel = 'click_smear_cancel',
    ClickSmearClose = 'click_smear_close',
    ClickSmearBack = 'click_smear_back',        //涂抹--撤回
    ClickSmearReset = 'click_smear_reset',
    ClickSmearHistoryBack = 'click_smear_history_back',
    ClickHistory = 'smear_history',                      //历史记录项
    ClickSmearTool = 'click_smear_tool',
    DoubleClickDot = 'double_click_dot',               //双击滑杆回到初始值就统计
    DoubleClickTitle = 'double_click_title',
    PresetReset = 'preset_reset',
    ParameterAdjustmentReset = 'parameter_adjustment_reset',
    SelectIdPhotoBackground = 'select_idphoto_background', // 证件照换背景
    SelectIdPhotoSize = 'select_idphoto_size', // 证件照裁剪尺寸
    SelectChangeSky = 'select_change_sky',  //换天空
    ModifyDPI = 'modify_dpi',
    InitPreview = 'init_preview_all',
    ClickPreview = 'click_preview_all',
    ExitPreview = 'exit_preview_all',
    FullEffectMode = 'full_effect_mode',
    ColorMode = 'color_mode',

    LiquefactionSize = 'liquefaction_size',
    LiquefactionDensity = 'liquefaction_density',
    LiquefactionPressure = 'liquefaction_pressure',
    ClickLiquefactionFixedEdge = 'click_liquefaction_fixed_edge',
}

/**
 * 设置相关操作
 */
export enum PointSettingOperate {
    ClickSetting = 'click_setting', // 点击设置图标
    ClickClose = 'click_close',     // 点击右上角关闭图标
    ClickReturn = 'click_return',   // 点击取消按钮
    ClickConfirm = 'click_confirm'  // 点击确认按钮
}

/**
 * 帮助操作
 */
export enum PointHelpOperate {
    HelpIcon = 'help_icon',                 // 点击帮助中心的图标
    CustomerService = 'customer_service',   // 点击人工客服
    TutorialGraphic = 'tutorial_graphic',   // 点击新手教程
    TutorialVideo = 'tutorial_video',       // 点击视频教程 （2.8.0）
    HelpQuestion = 'help_question',         // 点击常见问题 （2.8.0）
    HotKey = 'hot_key'                      // 点击快捷键
}

/**
 * 滑竿数据手动修改操作
 */
export enum PointManualOperate {
    clickEffectValue = 'click_effect_value',             // 点击数值进行手动修改完成
}

/**
 * 导出操作
 */
export enum PointExportOperate {
    ExportButton = 'export_button',             // 点击导出图标
    SelectPath = 'select_path',                 // 导出弹窗点击选择路径的文件夹图标
    SelectPreset = 'select_preset',             // 导出弹窗点击选择预设图标
    AdvancedSettings = 'advanced_settings',     // 导出弹窗点击高级设置
    Cancel = 'cancel',                          // 导出弹窗点击取消
    Confirm = 'confirm',                        // 导出弹窗点击导出按钮
    OriginThumb = 'thumbnail_close_effect',     // 选中原图展示
    EffectThumb = 'thumbnail_open_effect'       // 选中效果图展示

}

/**
 * 参数操作埋点
 */
export enum PointParamOperate {
    SlideBeautyRod = 'slide_beauty_rod',     // 皮肤
    SlideFaceliftRod = 'slide_facelift_rod', // 面部
    SlideBodyRod = 'slide_body_rod',         // 全身
    SlideEnhanceRod = 'slide_enhance_rod',   // 背景增强
    SlideColorRod = 'slide_color_rod',       // 色彩
    Facelift = 'facelift',                   // 切换脸型版本
    MakeupSuit = 'slide_makeup_rod',         // 妆容
    SliderBackground = 'slide_background_rod', // 背景调整
    SlideRemoveDefects = 'slide_remove_defects',
    SlideSkyAdjustmentRod = 'slide_sky_adjustment_rod',
    SlideSkySceneryAdjustmentRod = 'slide_sky_scenery_adjustment_rod',
    SlideSkyWaterAdjustmentRod = 'slide_sky_water_adjustment_rod',
    SlideLiquefyRod = 'slide_liquefy_rod',
}

export enum PointExportListOperate {
    ExportedTab = 'exported_tab',
    ExportingTab = 'exporting_tab',
    BillingRulesPopup = 'billing_rules_popup',
    DeleteBtn = 'click_delete_button',
    RetryBtn = 'click_retry_button',
    PauseBtn = 'click_pause_button',
    StartBtn = 'click_start_button',
    PauseAllBtn = 'pause_all',
    StartAllBtn = 'start_all',
    ClickExportDetail = 'click_export_detail',
}

/**
 * HSL 类型
 */
export const PointFeatureHslMap = {
    [EffectParamEnum.EnhanceEditHSLHue]: 'hue',
    [EffectParamEnum.EnhanceEditHSLLightness]: 'brightness',
    [EffectParamEnum.EnhanceEditHSLSaturation]: 'saturation'
}

/**
 * HSL 色彩映射
 */
export const PointFeatureHslColorMap = {
    [EffectParamHslColor.Red]: 'red',            // 红
    [EffectParamHslColor.Orange]: 'orange',      // 橙
    [EffectParamHslColor.Yellow]: 'yellow',      // 黄
    [EffectParamHslColor.Green]: 'green',        // 绿
    [EffectParamHslColor.Cyan]: 'lightgreen',    // 浅绿色
    [EffectParamHslColor.Blue]: 'blue',          // 蓝
    [EffectParamHslColor.Purple]: 'purple',      // 紫色
    [EffectParamHslColor.Magenta]: 'magenta'    // 洋红
}

const HslColorMerge = {}
for (const hsl in PointFeatureHslMap) {
    for (const color in PointFeatureHslColorMap) {
        // @ts-ignore
        HslColorMerge[`${ hsl }_${ color }`] = `${ PointFeatureHslMap[hsl] }_${ PointFeatureHslColorMap[color] }`
    }
}

type IParamsValue = {
    [p in EffectParamEnum]?: string | {
        [v in number]: string
    }
}

type IParamsMap = {
    [key in PointParamOperate]?: IParamsValue
}

/**
 * 调参
 * 参数映射表
 */
export const PointParamsFeatureMap: IParamsMap = {
    slide_remove_defects: {
        [EffectParamEnum.Spotless]: 'acne',
        [EffectParamEnum.RemoveNevus]: 'mole',
        [EffectParamEnum.SpotlessBody]: 'removal_body',
        [EffectParamEnum.RemoveForeheadLines]: 'forehead_lines',
        [EffectParamEnum.RemoveEyeLines]: 'eye_wrinkles',
        [EffectParamEnum.LightenPouch]: 'darkcircles',
        [EffectParamEnum.TearTrough]: 'wrinkle',
        [EffectParamEnum.RemoveNeckLines]: 'neck_pattern',
        [EffectParamEnum.RemoveDoubleChin]: 'face_doublechin'
    },
    // 皮肤调整
    slide_beauty_rod: {
        [EffectParamEnum.NeutralGrayRetouch]: 'dbsmooth',
        [EffectParamEnum.MoisturizingSkin]: 'smooth_face',
        [EffectParamEnum.MoisturizingSkinNoFace]: 'smooth_body',
        [EffectParamEnum.FacialStereo3DLight]: 'highlight_contour',
        [EffectParamEnum.FacialStereo3DShadow]: 'shadow_contour',
        [EffectParamEnum.SkinColorLighten]: 'skin_bright',
        [EffectParamEnum.SkinColorWhiten]: 'skin_whiten',
        [EffectParamEnum.SkinColorRuddy]: 'skin_rosy',
        [EffectParamEnum.SkinColorUniform]: 'skin_unite',
        [EffectParamEnum.StretchMark]: 'stretch_marks',
        [EffectParamEnum.StretchMarkLine]: 'pregnancy_line',
        [EffectParamEnum.TeethWhiten]: 'whiten',
        [EffectParamEnum.ToothRepairing]: 'teeth_fixer',
        [EffectParamEnum.BrightEye]: 'bright',
        [EffectParamEnum.MakeupEnhanceEye]: 'eye_enhance',
        [EffectParamEnum.MakeupEnhanceMouth]: 'lip_enhance'
    },
    // 面部重塑
    slide_facelift_rod: {
        [EffectParamEnum.HeadNarrow]: 'face_size',
        [EffectParamEnum.FaceLift]: 'face_cheeks',
        [EffectParamEnum.FacialRefineSmallFace]: 'face_small',
        [EffectParamEnum.FacialRefineTemple]: 'face_temple',
        [EffectParamEnum.FacialRefineCheekBone]: 'face_cheekbones',
        [EffectParamEnum.FaceWidth]: 'face_width',
        [EffectParamEnum.FacialRefineJaw]: 'face_jaw',
        [EffectParamEnum.FacialRefineChin]: 'face_chin',
        [EffectParamEnum.FacialRefineHairLine]: 'face_forehead',
        [EffectParamEnum.FacialRefineEyeZoom]: 'eyes_size',
        [EffectParamEnum.FacialRefineEyeHigher]: 'eyes_height',
        [EffectParamEnum.FacialRefineEyeWidth]: 'eyes_width',
        [EffectParamEnum.FacialRefineEyeDistance]: 'eyes_distance',
        [EffectParamEnum.FacialRefineEyeAngle]: 'eyes_tilt',
        [EffectParamEnum.FacialRefineEyeUpDownAdjust]: 'eyes_position',
        [EffectParamEnum.FacialRefineNose]: 'nose_size',
        [EffectParamEnum.FacialRefineNoseHigher]: 'nose_lift',
        [EffectParamEnum.FacialRefineNoseBridge]: 'nose_bright',
        [EffectParamEnum.FacialRefineNoseAlar]: 'nose_wing',
        [EffectParamEnum.FacialRefineNoseTip]: 'nose_tip',
        [EffectParamEnum.FacialRefineMouthSize]: 'lips_size',
        [EffectParamEnum.FacialRefineMouthWidth]: 'lips_width',
        [EffectParamEnum.FacialRefineMouthHigher]: 'lips_height',
        [EffectParamEnum.FacialRefineMouthUpperLip]: 'lips_upper',
        [EffectParamEnum.FacialRefineMouthLowperLip]: 'lips_lower',
        [EffectParamEnum.FacialRefineEyeBrowThickness]: 'eyebrows_thick',
        [EffectParamEnum.FacialRefineEyeBrowDistance]: 'eyebrows_distance',
        [EffectParamEnum.FacialRefineEyeBrowAngle]: 'eyebrows_tilt',
        [EffectParamEnum.FacialRefineEyeBrowShape]: 'eyebrows_shape',
        [EffectParamEnum.FacialRefineEyeBrowHigher]: 'eyebrows_position',

        [EffectParamEnum.LeftFaceLift]: 'face_cheeks_left',
        [EffectParamEnum.RightFaceLift]: 'face_cheeks_right',
        [EffectParamEnum.LeftTemple]: 'face_temple_left',
        [EffectParamEnum.RightTemple]: 'face_temple_right',
        [EffectParamEnum.RightTemple]: 'face_temple_right',
        [EffectParamEnum.LeftCheekBone]: 'face_cheekbones_left',
        [EffectParamEnum.RightCheekBone]: 'face_cheekbones_right',
        [EffectParamEnum.LeftJaw]: 'face_jaw_left',
        [EffectParamEnum.RightJaw]: 'face_jaw_right',
        [EffectParamEnum.LeftEyeZoom]: 'eyes_size_left',
        [EffectParamEnum.RightEyeZoom]: 'eyes_size_right',
        [EffectParamEnum.LeftEyeHigher]: 'eyes_height_left',
        [EffectParamEnum.RightEyeHigher]: 'eyes_height_right',
        [EffectParamEnum.LeftEyeWidth]: 'eyes_width_left',
        [EffectParamEnum.RightEyeWidth]: 'eyes_width_right',
        [EffectParamEnum.LeftEyeDistance]: 'eyes_distance_left',
        [EffectParamEnum.RightEyeDistance]: 'eyes_distance_right',
        [EffectParamEnum.LeftEyeAngle]: 'eyes_tilt_left',
        [EffectParamEnum.RightEyeAngle]: 'eyes_tilt_right',
        [EffectParamEnum.LeftEyeUpDownAdjust]: 'eyes_position_left',
        [EffectParamEnum.RightEyeUpDownAdjust]: 'eyes_position_right',
        [EffectParamEnum.LeftEyeBrowThickness]: 'eyebrows_thick_left',
        [EffectParamEnum.RightEyeBrowThickness]: 'eyebrows_thick_right',
        [EffectParamEnum.LeftEyeBrowDistance]: 'eyebrows_distance_left',
        [EffectParamEnum.RightEyeBrowDistance]: 'eyebrows_distance_right',
        [EffectParamEnum.LeftEyeBrowAngle]: 'eyebrows_tilt_left',
        [EffectParamEnum.RightEyeBrowAngle]: 'eyebrows_tilt_right',
        [EffectParamEnum.LeftEyeBrowShape]: 'eyebrows_shape_left',
        [EffectParamEnum.RightEyeBrowShape]: 'eyebrows_shape_right',
        [EffectParamEnum.LeftEyeBrowHigher]: 'eyebrows_position_left',
        [EffectParamEnum.RightEyeBrowHigher]: 'eyebrows_position_right',

        [EffectParamEnum.SymmetryReshapeSwitch]: 'symmetry_facelift',
        [EffectParamEnum.SymmetryReshapeBody]: 'symmetry_upper_body',
        [EffectParamEnum.SymmetryReshapeFace]: 'symmetry_facial_features'
    },
    // 全身美型
    slide_body_rod: {
        [EffectParamEnum.AIBodyReshape]: 'body_ai',
        [EffectParamEnum.PoseRefineSlimHand]: 'arm',
        [EffectParamEnum.PoseRefineSlimWaist]: 'waist',
        [EffectParamEnum.PoseRefineSlimLeg]: 'leg',
        [EffectParamEnum.PoseRefineEnhanceBreast]: 'breast',
        [EffectParamEnum.PoseRefineNiceButtock]: 'buttocks',
        [EffectParamEnum.PoseRefineSlim]: 'Slim',
        [EffectParamEnum.PoseRefineShrinkHead]: 'head',
        [EffectParamEnum.PoseRefineLengthen]: 'stretch',
        [EffectParamEnum.PoseRefineHeighten]: 'heighten',
        [EffectParamEnum.PoseRefineSlimLeftNeck]: 'thin_neck_left',
        [EffectParamEnum.PoseRefineSlimRightNeck]: 'thin_neck_right',
        [EffectParamEnum.PoseRefineSlimNeck]: 'thin_neck'
    },

    // 调色
    slide_color_rod: {
        [EffectParamEnum.FilterAlpha]: 'filter',                    // （滤镜）
        [EffectParamEnum.EnhanceEditColorTemperature]: 'temp',      // （色温）
        [EffectParamEnum.EnhanceEditHue]: 'tone',                   // （色调）
        [EffectParamEnum.EnhanceEditExposure]: 'exposure',          // （曝光）
        [EffectParamEnum.EnhanceEditContrast]: 'contrast',          // （对比度）
        [EffectParamEnum.EnhanceEditHighlight]: 'highlight',        // （高光）
        [EffectParamEnum.EnhanceEditShadow]: 'shadow',              // （阴影）
        [EffectParamEnum.EnhanceEditWhite]: 'white',                // （白色）
        [EffectParamEnum.EnhanceEditBlack]: 'black',                // （黑色）
        [EffectParamEnum.EnhanceEditCameraRawSharpen]: 'clarity',   // （清晰度）
        [EffectParamEnum.EnhanceEditCameraRawVibrance]: 'vividness',// （鲜艳度）
        [EffectParamEnum.EnhanceEditSaturation]: 'saturation',      // （饱和度）
        [EffectParamEnum.EnhanceEditCRDBStrength]: 'sharpen',       // （锐化）
        [EffectParamEnum.EnhanceEditCRDBRadius]: 'radius',          // （半径）
        [EffectParamEnum.EnhanceEditCRDBDetail]: 'detail',          // （细节）
        ...HslColorMerge // HSL 合并参数
    },

    // 妆容
    slide_makeup_rod: {
        [EffectParamEnum.SuitMakeup]: 'theme',                // （妆容）
        [EffectParamEnum.EyebrowMakeup]: 'eyebrows',          //  眉毛
        [EffectParamEnum.EyeMakeup]: 'eyes',                  //  眼妆
        [EffectParamEnum.EyelashMakeup]: 'eyelashes',         //  眼睫毛
        [EffectParamEnum.BlusherMakeup]: 'blush',             //  腮红
        [EffectParamEnum.LipMakeup]: 'lipstick'              //  唇妆
    },

    // 背景调整
    slide_background_rod: {
        [EffectParamEnum.BgCleanSwitch]: {
            0: 'close_background_blemishes',
            1: 'open_background_blemishes'
        },
        [EffectParamEnum.BgCleanMode]: {
            0: 'none_pure_background',
            1: 'pure_background'
        },
        [EffectParamEnum.BgCleanMooreSwitch]: {
            0: 'close_background_banding',
            1: 'open_background_banding'
        },
        [EffectParamEnum.BgCleanMooreMode]: {
            0: 'banding_none_pure_background',
            1: 'banding_pure_background'
        },
        [EffectParamEnum.BackgroundEnhance]: 'background_enhance',
        [EffectParamEnum.BgReplaceGamma]: 'idphoto_edge_detail',    // （证件照换背景边缘调整）
        [EffectParamEnum.BgReplaceBeta]: 'idphoto_edge_burr'
    },

    //换天空相关埋点
    slide_sky_adjustment_rod: {
        [EffectParamEnum.SkyChoose]: 'sky_choose',
        [EffectParamEnum.SkyEdgeTransition]: 'sky_edge_transition',
        [EffectParamEnum.SkyTemp]: 'sky_temp',
        [EffectParamEnum.SkySaturation]: 'sky_saturation',                        //饱和度
        [EffectParamEnum.SkyBrightness]: 'sky_brightness',                                 //亮度
        [EffectParamEnum.SkyVague]: 'sky_vague',                                  //虚化
        [EffectParamEnum.SkyFlip]: 'sky_flip'                                     //水平翻转天空
    },

    slide_sky_scenery_adjustment_rod: {
        [EffectParamEnum.SkySceneryColor]: 'sky_scenery_color',                        //景物色彩（偏向天空)
        [EffectParamEnum.SkyCharacterColor]: 'sky_character_color',            //人物色彩（偏向天空）
    },

    slide_sky_water_adjustment_rod:{
        [EffectParamEnum.SkyWaterReflex]: 'sky_water_reflex',              //景物反射
        [EffectParamEnum.SkyWaterVague]: 'sky_water_vague'
    }

}

export const MakeUpTabClickMap: { [key: string]: string } = {
    [EffectParamEnum.SuitMakeup]: 'click_theme_tab',                // （妆容）
    [EffectParamEnum.EyebrowMakeup]: 'click_eyebrows_tab',          //  眉毛
    [EffectParamEnum.EyeMakeup]: 'click_eyes_tab',                  //  眼妆
    [EffectParamEnum.EyelashMakeup]: 'click_eyelashes_tab',         //  眼睫毛
    [EffectParamEnum.BlusherMakeup]: 'click_blush_tab',             //  腮红
    [EffectParamEnum.LipMakeup]: 'click_lipstick_tab'              //  唇妆
}

export const MakeUpSuitClickMap:{ [key: string]: string } = {
    [EffectParamEnum.SuitMakeup]: 'click_theme',                // （妆容）
    [EffectParamEnum.EyebrowMakeup]: 'click_eyebrows',          //  眉毛
    [EffectParamEnum.EyeMakeup]: 'click_eyes',                  //  眼妆
    [EffectParamEnum.EyelashMakeup]: 'click_eyelashes',         //  眼睫毛
    [EffectParamEnum.BlusherMakeup]: 'click_blush',             //  腮红
    [EffectParamEnum.LipMakeup]: 'click_lipstick'              //  唇妆
}
