/**
 * 预设文档（见：/doc/预设文档.md）
 */
import { ColorType } from '@/constants/effect-config'

// 配置文件所在路径
// const qtResourcePath = '../../../../resources/'

const {
    preset_version,
    beautify_preset_version,
    palette_preset_version
} = require('../../../../resources/package.json')

// 最大支持的预设版本
export const MAX_SUPPORT_PRESET_VERSION = preset_version

// 本版本预设的版本
export const CUR_PRESET_VERSION = preset_version

// 人像美化预设（当前版本）
export const BEAUTIFY_PRESET_VERSION = beautify_preset_version

// 配置文件相对路径
export const EFFECTS_CONFIG_R_PATH = 'effect/config'
export const DEFAULT_PRESET_CONFIG = 'effect/config/none-config.json'
export const DEFAULT_PALETTE_CONFIG = 'effect/config/none-toning-config.json'

// 美化配置
export const beautifyParams = require('../../../../resources/beautifyParams.json')

export const QT_NONE_BEAUTIFY_EFFECTS_JSON = require('../../../../resources/effect/config/none-config.json')
export const EFFECTS_CONFIG_JSON = QT_NONE_BEAUTIFY_EFFECTS_JSON.Effects
export const EFFECTS_AlgoVersion_JSON = QT_NONE_BEAUTIFY_EFFECTS_JSON.AlgoVersion

export const makeupEffectMapping = {
    SuitMakeup: 'MakeupSuit',
    EyebrowMakeup: 'Eyebrow',
    EyeMakeup: 'Eyemakeup',
    EyelashMakeup: 'Eyelash',
    BlusherMakeup: 'Blusher',
    LipMakeup: 'Lipstick'
}

// 图像调节预设（当前版本）
export const PALETTE_PRESET_VERSION = palette_preset_version

// 色彩配置
export const {
    paletteTemperatureParams,
    paletteHueParams,
    paletteBaseParams,
    paletteColorParams,
    filterParams,
    detailBoostingParams,
    detailBoostingDetailParams
} = require('../../../../resources/paletteParams.json')

function _formatHslParams(config: any) {
    const tempArr: {
        '##'?: string
        'ParamFlag': number,
        'fEffectValue': number,
        'iEffectValue': number
    }[] = []
    config.forEach((child: any) => {
        child.items.forEach((color: string) => {
            tempArr.push({
                'ParamFlag': child.flag,
                'fEffectValue': child.default,
                'iEffectValue': ColorType[color]
            })
        })
    })
    return tempArr
}

export const QT_NONE_TONING_EFFECTS_JSON = require('../../../../resources/effect/config/none-toning-config.json')
export const NONE_HSL_CONFIG = _formatHslParams(paletteColorParams)
export const TONING_EFFECTS_JSON = QT_NONE_TONING_EFFECTS_JSON.Effects

export * from './presetParams/nameEnum'
