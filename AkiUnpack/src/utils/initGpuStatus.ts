import locs from '@/utils/locs'
import {
    DICTIONARY_TABLE,
    ENABLE_OPENCL_BINARY_ID,
    ENABLE_OPENCL_ID,
    ENABLE_OPENGL_ID,
    ENABLE_QRC_DEBUG_ID,
    EXPORT_TASK_NUMBER,
    FIX_CPU_FEATURE_UN_SUPPORT_AVX_ID, FIX_LOAD_QRC_NODE_FAILED_COUNT,
    GPU_INDEX_ID,
    PREVIEW_CACHE_SWITCH
    // GPU_OPENGL_BLACK_LIST,
    // SINGLE_GPU_OPENGL_BLACK_LIST
} from '@/universal/types/config'
// @ts-ignore
import { find as findByDictionary, insert as insertToDictionary } from '@/universal/datastore/dictionaryDao'

const cpuLogicCount = 0//remote.getGlobal('sharedObject').cpuLogicCount
const openGLDefaultStatus = false//remote.getGlobal('sharedObject').openGLDefaultStatus
const openCLDefaultStatus = false//remote.getGlobal('sharedObject').openCLDefaultStatus
const openCLIsSupportBinaryDefaultStatus = false//remote.getGlobal('sharedObject').openCLIsSupportBinaryDefaultStatus
const openCLBestGPUIndex = 0//remote.getGlobal('sharedObject').openCLBestGPUIndex
const cpuFeatureAVXIsSupport = false//remote.getGlobal('sharedObject').cpuFeatureAVXIsSupport
const buildOpenCLKernelVersion = ''//remote.getGlobal('sharedObject').buildOpenCLKernelVersion

/**
 * 初始化OpenGL开关状态
 */
export function initOpenGLStatus(): boolean {
    let bool = true

    let _enableOpenGL = locs.get(ENABLE_OPENGL_ID)

    if (_enableOpenGL === undefined || _enableOpenGL === null) {

        // if (gpus.length < 1) return false
        //
        // if (gpus.length === 1) {
        //     // 单个GPU情况（黑名单）
        //     if ([...SINGLE_GPU_OPENGL_BLACK_LIST, ...GPU_OPENGL_BLACK_LIST].some(reg => new RegExp(reg, 'gi').test(gpus[0]))) {
        //         bool = false
        //     }
        // } else {
        //     gpus.forEach(gpu => {
        //         if (GPU_OPENGL_BLACK_LIST.some(reg => new RegExp(reg, 'gi').test(gpu))) {
        //             bool = false
        //         }
        //     })
        // }

        bool = openGLDefaultStatus
        locs.set(ENABLE_OPENGL_ID, bool)
    } else {
        bool = _enableOpenGL === 'true'
    }

    return bool
}

/**
 * 初始化OpenCL开关状态
 * @param gpus
 */
export async function initOpenCLStatus() {
    let bool = false

    let { keyword, value } = await findByDictionary(ENABLE_OPENCL_ID)
    if (value) {
        try {
            let res = Number(value);
            bool = res === 1;
        } catch (e) {

        }
    }
    return bool
}

export function getBuildCLKernelVersion(): string {
    return buildOpenCLKernelVersion
}

/**
 * 获取OpenCL Binary状态
 */
export function getOpenCLBinaryStatus(): boolean {
    let bool = true

    let _enableOpenCLBinary = locs.get(ENABLE_OPENCL_BINARY_ID)
    if (_enableOpenCLBinary === undefined || _enableOpenCLBinary === null || _enableOpenCLBinary === 'undefined') {
        bool = openCLIsSupportBinaryDefaultStatus
        locs.set(ENABLE_OPENCL_BINARY_ID, bool)
    } else {
        bool = _enableOpenCLBinary === 'true'
    }

    return bool
}

/**
 * 获取OpenCL 最佳gpu索引状态
 */
export function getOpenCLBestGPUIndex(): number {
    let index = -1

    let _gpuIndex = locs.get(GPU_INDEX_ID)
    if (_gpuIndex === undefined || _gpuIndex === null || _gpuIndex === 'undefined') {
        index = openCLBestGPUIndex
        locs.set(GPU_INDEX_ID, index)
    } else {
        index = parseInt(_gpuIndex)
        if (index < 0) {
            locs.set(GPU_INDEX_ID, index)
        }
    }
    return index
}

export function initCPUFeatureAVXStatus(): boolean {
    return cpuFeatureAVXIsSupport
}

export function getFixedLoadQRCNodeFailedCount(): number {
    let count = locs.get(FIX_LOAD_QRC_NODE_FAILED_COUNT)
    return count ? parseInt(count) : 0
}

export function getIsEnableFixAVXError(): boolean {
    let _isFix = locs.get(FIX_CPU_FEATURE_UN_SUPPORT_AVX_ID)
    //console.log("getIsEnableFixAVXError: ", _isFix)
    return _isFix === 'true'
}

export function initEnableQRCDebugStatus() {
    let bool = false
    let _enableOpenCL = locs.get(ENABLE_QRC_DEBUG_ID)
    if (_enableOpenCL === undefined || _enableOpenCL === null) {
        bool = process.env.VUE_APP_ENV !== 'pro'
        locs.set(ENABLE_QRC_DEBUG_ID, bool)
    } else {
        bool = _enableOpenCL === 'true'
    }
    return bool
}

export async function initExportTaskConfig(): Promise<any> {
    // @ts-ignore
    let { keyword, value } = await findByDictionary(EXPORT_TASK_NUMBER)
    let _exportNumber = value
    if (_exportNumber) {
        _exportNumber = Number(_exportNumber)
    }
    let maxExportNumber = await tsImgIO__getMaxConcurrentCount()

    if (_exportNumber === undefined || _exportNumber === null || !_exportNumber) {
        _exportNumber = await tsImgIO__getDefaultConcurrentCount()
        await insertToDictionary(EXPORT_TASK_NUMBER, _exportNumber)
    } else {
        if (_exportNumber < 1) {
            _exportNumber = 1
        }
    }
    return { defaultNumber: _exportNumber, maxNumber: maxExportNumber }
}

async function getCpuCount() {
    if (cpuLogicCount > 0) {
        return cpuLogicCount
    }
    return await window.$sharedObject.getCpuNumber()
}

export async function tsImgIO__getDefaultConcurrentCount() {

    let count = await getCpuCount()
    count -= 1
    if (count < 1) {
        count = 1
    }
    return count
}

export async function tsImgIO__getMaxConcurrentCount() {
    let count = await getCpuCount()
    if (count < 1) {
        count = 1
    }
    return count
}

/**
 *
 * @param imageSize width * height >= 0 可能为0
 */
export function tsImgIO__getAutoExportConcurrentCount(imageSize: number) {
    const os = require('os')
    let totalMem = ((os.totalmem()) / 1048576 / 1024)
    let count = 0

    //let 90 = 4000*6000*4/1024/1024 => 4G
    // let memOfSingle = imageSize / (4000*6000.0) * 4;
    // if (process.platform == 'win32') {
    //     memOfSingle = imageSize / (4000*6000.0) * 6;
    // }
    let memOfSingle = 3.5 // 16 4个线程；24：6个线程； 32 8个线程
    //count = Math.round( (totalMem - 2.0) / memOfSingle)
    count = Math.floor((totalMem - 2.0) / memOfSingle)

    console.log('kfc imageSize: ', imageSize, '; totalMem: ', totalMem, '; count: ', count)

    if (count < 1) {
        count = 1
    }
    return count
}

export function initPreviewCacheStatus() {


    let previewCacheStatus = locs.get(PREVIEW_CACHE_SWITCH)
    if (previewCacheStatus === undefined || previewCacheStatus === null || previewCacheStatus === 'undefined') {
        // @ts-ignore
        previewCacheStatus = true
        locs.set(PREVIEW_CACHE_SWITCH, previewCacheStatus)
        return previewCacheStatus
    } else {
        return previewCacheStatus === 'true'
    }

}
