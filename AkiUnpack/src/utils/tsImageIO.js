import ImageModel from '@/model/ImageModel'
import { v4 as uuidv4 } from 'uuid'
import tsFilePathUtils from '@/utils/tsFilePathUtils'
import { TsMemoryMonitor } from '@/utils/tsMemoryMonitor'
import { EffectParamPersonType, EffectParamHslColor, EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { ParamFlag as EffectParamsFlag } from '@/constants/effect-config'
import store from '@/store'
import ThumbnailModel from '@/model/ThumbnailModel'
import fs from 'fs'
import FileUtils from '@/utils/FileUtils'

let path = require('path')
let pathId


export const TSImageIOCode = {
    TSImageIOCode_SuccessLoadImage: 1,
    TSImageIOCode_FailedLoadImage: 2,
    TSImageIOCode_SuccessProcess: 3,
    TSImageIOCode_FailedProcess: 4,
    TSImageIOCode_SaveImage: 5,
    TSImageIOCode_FailedSaveImage: 6,
    TSImageIOCode_SuccessGenerateSeed: 7,
    TSImageIOCode_FailGenerateSeed: 8,
    TSImageIOCode_ImageFormatUnSupport: 9,
    TSImageIOCode_SuccessLoadThumbImage: 10,
    TSImageIOCode_FailedLoadThumbImage: 11,
    TSImageIOCode_FailedWriteIOError: 12,
    TSImageIOCode_FailedSaveImageUnSupportFormat: 13,
    TSImageIOCode_FailedLoadImageNotExist: 14,
    TSImageIOCode_FailedCheckRespMD5: 15,
    TSImageIOCode_FailedRespIsNotValid: 16,
    TSImageIOCode_FailedRespIhpcIsNotValid: 17,
    TSImageIOCode_FailedRespFaIsNotValid: 18,
    TSImageIOCode_FailedSaveImageIsBlack: 19
}

export const TSImageIOThreadPriority = {
    TSImageIOThreadPriorityVeryVeryHigh: 16,
    TSImageIOThreadPriorityVeryHigh: 8,
    TSImageIOThreadPriorityHigh: 4,
    TSImageIOThreadPriorityNormal: 0,
    TSImageIOThreadPriorityLow: -4,
    TSImageIOThreadPriorityVeryLow: -8
}

export const TSEffectMode = {
    Normal: 0,     // 通用效果处理
    Raw: 1,        // raw图处理
    Template: 2    // 模版效果处理
}

export const ProcessRunMode = {
    kProcessRunMode_Origin: 0, // 原图
    kProcessRunMode_Batch: 1,  // 批量
    kProcessRunMode_Fine: 2   // 精修
}

export const SliderPersonType = {
    [EffectParamPersonType.All]: -1,    // 所有人
    [EffectParamPersonType.Female]: 0,  // 女性
    [EffectParamPersonType.Male]: 1,    // 男性
    [EffectParamPersonType.Child]: 2,    // 小孩
    [EffectParamPersonType.Older]: 3    // 长辈
}

export const ParamFlag = EffectParamsFlag

/*
 需要和EnhanceEditHSLHue，EnhanceEditHSLSaturation，EnhanceEditHSLLightness 配合使用。
 例如，设置红色的HSL色相如下调用
 setIntValueToAll(HSLColor.Red, ParamFlag.EnhanceEditHSLHue)    // 先设置红色
 setSliderValueToAll(sliderValue, ParamFlag.EnhanceEditHSLHue)  // 再设置滑杆值
 */
export const HSLColor = {
    [EffectParamHslColor.Red]: 0,         // 红
    [EffectParamHslColor.Orange]: 1,      // 橙
    [EffectParamHslColor.Yellow]: 2,      // 黄
    [EffectParamHslColor.Green]: 3,       // 绿
    [EffectParamHslColor.Cyan]: 4,        // 青（浅绿色）
    [EffectParamHslColor.Blue]: 5,        // 蓝
    [EffectParamHslColor.Purple]: 6,      // 紫色
    [EffectParamHslColor.Magenta]: 7     // 洋红
}

export const kLogLevel = {
    all: 0,
    verbose: 1,
    debug: 2,
    info: 3,
    warn: 4,
    error: 5,
    fatal: 6,
    off: 7
}


export const CreateSCENE = {
    batchRetouch: 0,// 图库
    photoFinishing: 1,// 精修大图
    template: 2,// 模版
    raw: 3,// raw
    photoFinishing_thumb: 4// 精修缩略图
}

/*
    所有对接底层的api接口里面，都需要传入请求的identifyKey，如
*/

function myLog(s) {
    console.log('[tsImageIO] ', s)
}

export class TSImageIO {
    /**
     *
     * @param path 原图路径
     * @param model TSEffectMode
     * @param thumbnailWidth 图大小
     * @param createScene 创建场景 const CreateSCENE
     * @param thumbnailId
     */
    constructor(path, model, thumbnailWidth, createScene = CreateSCENE.batchRetouch, thumbnailId = -1) {

    }

}
