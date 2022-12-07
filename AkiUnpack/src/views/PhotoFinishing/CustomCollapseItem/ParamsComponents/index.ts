import { formatPersonParamsGroup } from './utils'
import removeDefects from './params/remove-defects'
import skinParams from './params/skin'
import teethParams from './params/teeth'
import eyeParams from './params/eye'
import { getBackgroundEnhance } from './params/background-enhance'
import { getSkyParams } from './params/sky'
import makeupGroupFormat from './params/makeup'
import { typeGroupFormat } from './params/facial-refine'
import BodyParams from './params/body'

import hsl from './params/hsl'
import base from './params/base'
import detailBoosting from './params/detailBoosting'
import getBaseParams from './params/white-balance'
import { IPersonType } from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/types'

export const defaultOpenBeautyCollapse = ['removeDefects']  // 默认展开美化的项

export const beautyGroup = [
    {
        name: '祛除瑕疵',
        key: 'removeDefects'
    },
    {
        name: '皮肤调整',
        key: 'skin'
    },
    {
        name: '面部重塑',
        key: 'facialRefine',
        new: true
    },
    {
        name: '牙齿美化',
        key: 'teeth'
    },
    {
        name: '眼睛增强',
        key: 'eye'
    },
    {
        name: '妆容调整',
        key: 'makeup'
    },
    {
        name: '全身美型',
        key: 'body',
        new: true,
        tip: ['全身美型通过AI自动进行形体美化，', '在多人靠近的情况下因容易产生坏', '片目前AI会自动屏蔽效果噢~']
    }
]

export const defaultOpenColorCollapse = ['filter', 'whiteBalance']          // 默认展开色彩的项

export const colorGroup = [
    {
        name: '滤镜',
        key: 'filter',
        group: 'color'
    },
    {
        name: '白平衡',
        key: 'whiteBalance',
        group: 'color'
    },
    {
        name: '影调',
        key: 'base',
        group: 'color'
    },
    {
        name: 'HSL',
        key: 'hsl',
        group: 'color'
    },
    {
        name: '细节',
        key: 'detailBoosting',
        group: 'color'
    }
]

export const defaultOpenBackgroundCollapse = ['backgroundEnhance']          // 默认展开色彩的项

export const backgroundGroup = [
    {
        name: '背景调整',
        key: 'backgroundEnhance'
    },
    {
        name: '证件照换背景',
        key: 'replace',
        new: true
    },
    {
        name: '换天空',
        component: 'sky',
        key: 'sky',
        new: true
    }
]

export const PersonList = [
    { type: 'Male', label: '男' },
    { type: 'Female', label: '女' },
    { type: 'Child', label: '儿童' },
    { type: 'Older', label: '长辈' }
]

const fRemoveDefects = formatPersonParamsGroup(removeDefects)
const fSkinParams = formatPersonParamsGroup(skinParams)
const fTeethParams = formatPersonParamsGroup(teethParams)
const fEyeParams = formatPersonParamsGroup(eyeParams)
export const getDefaultParams = (type: string) => {
    switch (type) {
        case 'hsl':
            return [...hsl]
        case 'detailBoosting':
            return [...detailBoosting]
        case 'base':
            return [...base]
    }
}


export const getPersonParams = (type: string, personType: IPersonType = 'Male', data: any) => {
    switch (type) {
        case 'removeDefects':
            return fRemoveDefects[personType]
        case 'skin':
            return fSkinParams[personType]
        case 'teeth':
            return fTeethParams[personType]
        case 'eye':
            return fEyeParams[personType]
        case 'facialRefine':
            return typeGroupFormat(personType, data)
        case 'body':
            const instance = new BodyParams(personType)
            return instance.getParamsData((data && data.poseRefineInfos && data.poseRefineInfos.length > 0)
                ? new Map(data.poseRefineInfos || [])
                : null)
        case 'makeup':
            return makeupGroupFormat(personType)
    }
}

/**
 * 生成指定组件参数
 */
export class GenerateCompParams {
    personType: IPersonType

    constructor(personType: IPersonType) {
        this.personType = personType
    }

    getSkinParams(): any {
        return fSkinParams[this.personType]
    }
}
/**
 * 获取指定组件所需的参数配置
 * @param type
 * @param options
 * @returns {any}
 */
export const getFormComponents = (type: string, options: any) => {
    if (['removeDefects', 'skin', 'teeth', 'eye', 'body', 'makeup'].includes(type)) {
        return getPersonParams(type, options.personType, options.extendInfo)
    } else if (['whiteBalance'].includes(type)) {
        return getBaseParams(options.imageType, options.baseValue || { oriWbICC: 0, oriWbTint: 0, loaded: false })
    } else if (['backgroundEnhance'].includes(type)) {
        if (options && typeof options.bgCleanModeDefault === 'number') {
            return getBackgroundEnhance(options.bgCleanModeDefault, options.bgCleanMooreModeDefault)
        }
        return getBackgroundEnhance(-1, -1)
    } else if (['facialRefine'].includes(type)) {
        return getPersonParams(type, options.personType, options.symmetryStatusJson)
    }else if(['sky'].includes(type)){
        return getSkyParams(options.skyExtendInfo)
    } else {
        return getDefaultParams(type)
    }
}

export default {
    // base,
    // hsl,
    // skin,
    // teeth,
    // 'facial-refine': facialRefine,
    // 'eye-enhance': eyeEnhance,
    // 'background-enhance': backgroundEnhance
}
