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

// 精修图片加载状态
export enum ImageLoadingStatus {
    ThumbnailLoading = 1,
    ThumbnailLoaded = 10,
    OriginLoading = 2,
    OriginLoaded = 20,
    EffectLoading = 3,
    EffectLoaded = 30,
    MaskLoading = 4,
    MaskLoaded = 40,
    ThumbnailLoadError = -1,
    OriginLoadError = -2,
    EffectLoadError = -3
}

// 精修加载异常底层Error Code
export enum ImageLoadErrorCode {
    COMPLETE_CODE_SUCCESSFUL_LOAD_IMAGE = 1,
    COMPLETE_CODE_FAILED_LOAD_IMAGE = 2,
    COMPLETE_CODE_SUCCESSFUL_PROCESS = 3,
    COMPLETE_CODE_FAILED_PROCESS = 4,
    COMPLETE_CODE_SUCCESSFUL_SAVE_IMAGE = 5,
    COMPLETE_CODE_FAILED_SAVE_IMAGE = 6,
    COMPLETE_CODE_SUCCESSFUL_GENERATE_SEED = 7,
    COMPLETE_CODE_FAILED_GENERATE_SEED = 8,
    COMPLETE_CODE_UN_SUPPORT_IMAGE_FORMAT = 9,
    COMPLETE_CODE_SUCCESSFUL_LOAD_THUMB_IMAGE = 10,
    COMPLETE_CODE_FAILED_LOAD_THUMB_IMAGE = 11,
    COMPLETE_CODE_FAILED_WRITE_IO_ERROR = 12,
    COMPLETE_CODE_FAILED_SAVE_IMAGE_UN_SUPPORT_FORMAT = 13,
    COMPLETE_CODE_FAILED_LOAD_IMAGE_NOT_EXIST = 14,
    COMPLETE_CODE_FAILED_CHECK_RESP_MD5 = 15,
    COMPLETE_CODE_FAILED_RESP_IS_NOT_VALID = 16,
    COMPLETE_CODE_FAILED_RESP_IHPC_IS_NOT_VALID = 17,
    COMPLETE_CODE_FAILED_RESP_FA_IS_NOT_VALID = 18,
    COMPLETE_CODE_FAILED_SAVE_IMAGE_IS_BLACK = 19,
    COMPLETE_CODE_FAILED_RESP_BgC_IS_NOT_VALID = 20,
    COMPLETE_CODE_FAILED_RESP_Sk_IS_NOT_VALID = 21
}

export const ImageLoadErrorCodeMessage = {
    2: '原图加载异常',
    4: '效果图加载异常',
    6: ''
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
