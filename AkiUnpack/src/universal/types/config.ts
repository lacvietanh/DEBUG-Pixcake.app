const pixconfigJson = require('../../../../../resources/package.json')

const {
    appIdentify,
    db_version,
    qrc_version,
    gtag_measurement_id,
    gtag_beta_measurement_id,
    ban_updater,
    allow_custom_config,
    browser_dev_tools,
    need_verify_install,
    version
} = pixconfigJson

const nextConfig = pixconfigJson[appIdentify]
const {
    clientZhName,
    clientName,
    banUpdater,
    limit,
    prefix,
    gtagMeasurementId,
    needVerifyInstall,
    showExportCalcRule,
    allowPhotoshopOpenPicture,
    hiddenSwitchImageDescription,
    defaultExportDpi
} = nextConfig

const env = process.env.VUE_APP_ENV
export const isPro = env === 'pro'
export const isDev = env === 'dev'
const isForceEnableLog = process.env.VUE_APP_FORCE_LOG_ENABLE === 'true'

export const IS_WIN = (process as any).platform === 'win32'

export const HIDDEN_SWITCH_IMAGE_DESCRIPTION = hiddenSwitchImageDescription || false

export const IS_ALLOW_PHOTOSHOP_OPEN_PICTURE = allowPhotoshopOpenPicture || false

/**
 * 桌面应用名称
 */
export const CLIENT_NAME = clientZhName
export const CLIENT_NAME_EN = clientName
export const PREFIX = prefix || clientName

/**
 * 是否允许自定义配置
 */
export const IS_ALLOW_CUSTOM_CONFIG = isPro ? allow_custom_config : true

/**
 * 是否禁用更新
 */
export const IS_BAN_UPDATE = ban_updater || (banUpdater || false)

/**
 * 是否允许开启浏览器控制台
 */
export const BROWSER_DEV_TOOLS = browser_dev_tools || !isPro || isForceEnableLog

/**
 * 是否需要验证安装路径
 */
export const NEED_VERIFY_INSTALL = (!isDev && (need_verify_install || needVerifyInstall)) || false

/**
 * SDK QRC.版本
 */
export const QRC_VERSION = qrc_version

/**
 * 是否是像素派
 */
// @ts-ignore
export const IS_CLIENT_PIX_PIE = limit || false

/*
 * 是否是像素蛋糕的展会版本
 */
export const IS_CLIENT_PixCake_EXPO = appIdentify == "expo"

/*
    水印的UID标志，给底层qrcSdk使用
 */
export const PIX_PIE_WATERMARK_UID = 0x1213

export const DEFAULT_EXPORT_DPI = defaultExportDpi || 0

/**
 * 当前应用的数据库版本
 * 备注：如果数据结构有调整的话，该VERSION就要改动。
 */
export const DB_VERSION = db_version

export const DB_VERSION_KEY = 'dbVer'

/**
 * 本地数据库默认路径名称
 * @type {string}
 */
let dbName = '/db_quickretouch'
if (!isPro) dbName += `_${ env }`
export const SQL_DB_NAME = dbName + '.db'

export const CONFIG_TABLE = 'app_config'

/**
 * 表名
 * @type {string}
 */
export const PROJECT_TABLE = 'project'


/**
 * 表名
 * 缩略图
 */
export const THUMBNAIL_TABLE = 'thumbnail'

/**
 * 表名
 * 预设的配置
 */
export const PRESETS_TABLE = 'presets'
export const PRESETS_SUIT_TABLE = 'presets_suit'
// 调色模块的参数配置表
export const PALETTE_PRESETS_CFG_TABLE = 'palette_presetCfg'

export const EXPORT_ITEM_TABLE = 'exportItem'
export const EXPORT_DIR_TABLE = 'exportDir'

export const EXPORT_ERROR_TABLE = 'exportError'

export const EXPORT_ERROR_RECORD_TABLE = 'exportErrorRecord'

export const DICTIONARY_TABLE = 'dictionary'

export const USER_TABLE = 'user'

export const MATERIAL_ID_PHOTO_TABLE = 'material_id_photo'


export const APP_VERSION = version

/**
 * header token key
 * @type {string}
 */
export const TS_TOKEN_KEY = PREFIX

export const TS_AES_TOKEN = PREFIX + '_aes_token'

/**
 * 用户local缓存信息键名
 * @type {string}
 */
// export const TOKEN = 'quickretouch_token';
// export const TEL = 'quickretouch_tel';
// export const USERID = 'quickretouch_user_id'
// export const MERCHANTID = 'quickretouch_merchant_id'


export const PROJECT_NAME = TS_TOKEN_KEY + '_project_name'
export const PROJECT_ID = TS_TOKEN_KEY + '_project_id'

export const GPU_INDEX_ID = TS_TOKEN_KEY + '_gpu_index_id'
export const FIX_CPU_FEATURE_UN_SUPPORT_AVX_ID = TS_TOKEN_KEY + 'fix_cpu_feature_un_support_avx'

export const ENABLE_OPENGL_ID = TS_TOKEN_KEY + '_enable_opengl_version_2'
export const ENABLE_OPENCL_ID = 'enable_opencl_version_6'
export const ENABLE_OPENCL_BINARY_ID = TS_TOKEN_KEY + '_enable_opencl_binary_3'
export const EXPORT_TASK_NUMBER = TS_TOKEN_KEY + '_export_task_number_version_3'
export const ENABLE_QRC_DEBUG_ID = TS_TOKEN_KEY + '_enable_qrc_debug_id'
export const PREVIEW_CACHE_SWITCH = '_preview_cache_switch'
export const EXPORT_JPG_LEVEL = 'export_jpg_level'

// 磁盘报警存储的键值对
export const SYSTEM_DISK_MIN_CAPACITY = '_system_disk_min_capacity'
export const WORKSPACE_DISK_MIN_CAPACITY = '_workspace_disk_min_capacity'

export const SEND_GTAG_NUMBER = '_send_gtag_number'

// 加载底层库失败，进行修复的次数
export const FIX_LOAD_QRC_NODE_FAILED_COUNT = TS_TOKEN_KEY + 'fix_load_qrc_node_failed_count'

export const OPENGL_ATTRIBUTE_KEY = 'opengl_attribute_key_2'

/**
 * GA 埋点分析ID
 */
export const GTAG_MEASUREMENT_ID = isPro ? (gtagMeasurementId || gtag_measurement_id) : gtag_beta_measurement_id

// 上一张、下一张、上一行、下一行
export const KEY_PRESS = {
    LAST: -1,
    NEXT: 1,
    UPPER: 2,
    LOWER: 3
}

/**
 * 单张GPU黑名单（OpenGL）
 * 正则表达式列表
 */
export const SINGLE_GPU_OPENGL_BLACK_LIST = [
    'Intel\\(R\\)\\sUHD?\\sGraphics',
    'Microsoft\\sRemote\\sDisplay\\sAdapter',
    'AMD\\sRadeon\\(TM\\)\\sGraphics'
]

/**
 * 多张GPU黑名单（OpenGL）
 * 正则表达式列表
 */
export const GPU_OPENGL_BLACK_LIST = [
    'Radeon\\sRX(\\s)?(550/550)',
    'Radeon\\sRX(\\s)?(540|560)'
]
/**
 * GPU黑名单（OpenCL）
 */
export const GPU_OPENCL_BLACK_LIST = []

export const FIRST_TIME_INVITE = 'firstTimeInvite'

export const FIRST_EXPORT_TIME_INVITE = 'firstExportTimeInvite'

export const SHOWED_NOVICE_GUIDE = 'showedNoviceGuide'

// 是否显示导出规则的tooltip,默认没有定义的则为true
export const SHOW_EXPORT_CALC_RULE = showExportCalcRule === undefined || showExportCalcRule === null ? true : showExportCalcRule

export const OpenGLAttribute = {
    UseDesktopOpenGL: 15,
    UseOpenGLES: 16,
    UseSoftwareOpenGL: 17
}

//
export enum OpenGLType {
    kOpenGLInValid = -1,
    kDesktopOpenGL = 0,
    kOpenGLES = 1,
    kSoftwareOpenGL = 2,
}

export enum IdPhotoMaterialSourceType{
    System = 0,
    Mime = 1
}