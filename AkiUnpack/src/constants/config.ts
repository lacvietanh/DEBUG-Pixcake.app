/**
 * logo相对路径
 */
import { IS_CLIENT_PIX_PIE } from '@/universal/types/config'

export const LOGO_RELATIVE_PATH = require('@/assets/logo/logo.png')

// 关于我们弹框logo
export const LOGO_ABOUT_US = require('@/assets/logo/pop_icon_update_logo@3x.png')

// 文字logo路径 （区分 像素蛋糕 | 像素派）
export const TEXT_LOGO_RELATIVE_PATH = IS_CLIENT_PIX_PIE ? false : require('@/assets/logo/workbench_logo.png')

const { version } = require('../../../../resources/package.json')

// app版本号
export const APP_VERSION = version
