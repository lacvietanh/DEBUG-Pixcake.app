// 图片类型
export enum ImageType {
    Jpeg = 1,
    Png = 2,
    Raw = 3
}

// 预设类型
export enum PresetClassifyType {
    System = 1, // 系统预设
    User = 2  // 用户预设
}

// 预设来源
export enum PresetSourceType {
    Cloud = 1, // 系统云端
    Temp = 2  // 用户临时
}

// 套装ID类型
export enum PresetSuitIdType {
    UnSet = '0', // 未关联套装预设
    NoEffect = '-1' // 关联无效果套装
}

// 套装ID类型
export enum BeautifyPresetType {
    NoEffect = '-1', // 无效果key
    NoEffectPath = 'effect/config/none-config.json'
}

// 平台类型
export enum Platforms {
    MACOS = 1,
    WINDOWS = 2
}

// 外链类型
export enum OutsideType {
    Member = 'pcweb', // 会员购买
    NoviceTutorial = 'tutorial', // 新手教程
    TsGtag = 'tsGtag', // 埋点中转页面
    PixCake = 'cake_config'
}

// 系统角色
export enum SystemRole {
    User = 1,
    Admin = 2,
    SuperAdmin = 3
}


// 支持的图片后缀
export const ImageExtendNames = [
    'jpg',
    'jpeg',
    'png',
    'raw',
    '3fr',
    'ari',
    'arw',
    'bay',
    'braw',
    'crw', 'cr2', 'cr3',
    'cap',
    'data', 'dcs', 'dcr', 'dng',
    'drf',
    'eip', 'erf',
    'fff',
    'gpr',
    'iiq',
    'k25', 'kdc',
    'mdc', 'mef', 'mos', 'mrw',
    'nef', 'nrw',
    'obm', 'orf',
    'pef', 'ptx', 'pxn',
    'r3d', 'raf', 'raw', 'rwl', 'rw2', 'rwz',
    'sr2', 'srf', 'srw',
    'tif',
    'x3f'
]

export enum StorageKey {
    SpaceButtonOperationChangeTip = 'space_btn_opt_change_tip'
}

export enum GuideStoryKey {
    RefineNavBar = 'guide__refine-navbar',
    Refine_ManualFace = 'guide__refine-manual-face',
    Refine_ManualFaceBatchSelect = 'guide__refine-manual-batch-select-face'
}

// 实时滑竿类型
export enum RealtimeType {
    AlwaysEnable = 1, // 一直启用
    EnableByGpu = 2 // 仅Gpu启用
}

export const RefineProcessCodeMapping: { [key: number]: string } = {
    1: '图像调色',
    2: '纯色背景祛瑕疵',
    3: '纯色背景祛色彩断层',
    4: '祛妊娠纹',
    5: '祛斑祛痘',
    6: '祛痣',
    7: '身体祛瑕疵',
    8: '祛颈纹',
    9: '祛黑眼圈',
    10: '祛法令纹',
    11: '祛眼周纹',
    12: '祛抬头纹',
    13: '牙齿修复',
    14: '质感磨皮（中性灰）',
    15: '水润磨皮-脸部',
    16: '水润磨皮-身体',
    17: '肤色统一',
    18: '祛双下巴',
    19: '肤色透亮',
    20: '证件照换背景',
    21: '滤镜等',
    22: '亮眼等',
    23: '牙齿美白等',
    24: '肤色美白等',
    25: '肤色红润等',
    26: '妆容调整等',
    27: '面部重塑等',
    28: '全身美型等',
    29: '换天空',
    30: '背景增强等',
    31: '液化效果等',
}

export const WIN_MAX_PATH = 260

export enum PersonType {
    Female ='Female',
    Male ='Male',
    Child ='Child',
    Older ='Older'
}

/*
    新功能的小红点
 */
export enum NewFeatureRedDot {
    ManualFace = 'ManualFace'
}