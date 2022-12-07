/**
 * 导出相关API
 */
import { createInstance, getBaseURL, parseError, provideInterceptors, throwError } from '@/utils/http'
import { get } from 'lodash'
let instance = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api/project/export',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 1000 * 15
            }),
            { request: true }
        )
    }
    return instance
}


let instance2 = null

export function getInstance2(){
    if (!instance2){
        instance2 =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api/project/export',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 1000 * 60
            }),
            { request: true }
        )
    }
    return instance2
}

/**
 *
 * @param processId 图片效果处理前（预扣款）返回的处理ID
 * @param exportType 本次导出的类型，精修底片 1 or 模板 2
 * @param totalNum 本次导出的结果图数量
 * @param projectId  项目ID
 * @returns {Promise<void>}  --> export_id
 */
export async function preExport(processId, exportType, totalNum, projectId) {
    try {
        let params = {
            process_id: processId,
            export_type: exportType,
            total_num: totalNum,
            project_id: projectId
        }
        const response = await getInstance().post('/pre', params)
        const res = get(response, 'data.data', {})
        return res
    } catch (err) {
        throwError(err, code => {
            console.log(code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

/**
 *  导出上传效果图
 * @param projectId
 * @param exportIds 导出ID，效果图可能即属于精修底片的导出又属于模板的导出，见示例 [{"export_id":1}, {"export_id":2}]
 * @param originId 原图ID
 * @param effectParam 效果参数
 * @param imageType 图片类型， 精修地图 ：1  模板 ：2
 * @param imageFormat 图片格式 jpeg ： 1 png ： 2
 * @param order 排序
 * @returns {Promise<void>}
 */
export async function uploadEffectImage(projectId, exportIds, originId, effectParam, imageType, imageFormat, order, file) {

    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await getInstance2().post('/result', formData, {
            headers: {
                'Project-Id': projectId,
                'Export-Ids': exportIds,
                'Origin-Id': originId,
                'Effect-Param': effectParam,
                'Image-Type': imageType,
                'Image-Format': imageFormat,
                'Order': order,
                'Content-Type': 'multipart/form-data'
            }
        })
        const res = get(response, 'data.data', {})
        return res
    } catch (err) {
        throwError(err, code => {
            console.log(code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }

}


/**
 * 导出进度
 * @param exportIds 导出ID，可传多个，[{"export_id":1}, {"export_id":2}]
 * @returns {Promise<void>}
 */
export async function getExportProgress(exportIds) {

    try {
        let params = {
            export_ids: exportIds
        }
        const response = await getInstance().get('/progress', { params })
        const res = get(response, 'data.data', {})
        return res
    } catch (err) {
        throwError(err, code => {
            console.log(code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

/**
 * 继续导出
 * @param exportId
 * @returns {Promise<any>}
 */
export async function resumeExportApi(exportId) {
    try {
        let params = {
            export_id: exportId
        }
        const response = await getInstance().post('/resume', params)
        const res = get(response, 'data.data', {})
        return res
    } catch (err) {
        throwError(err, code => {
            console.log(code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

/**
 * 暂停导出
 * @param exportId
 * @returns {Promise<void>}
 */
export async function pauseExportApi(exportId) {
    try {
        let params = {
            export_id: exportId
        }
        const response = await getInstance().post('/pause', params)
        const res = get(response, 'data.data', {})
        return res
    } catch (err) {
        throwError(err, code => {
            console.log(code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}


/**
 * 执行导出后（导出一张图片后，调用此接口，服务用于统计进度）
 * @returns {Promise<void>}
 * @param data <{ export_id: number, process_id: number, image_id: number, state: number }>
 */
export async function staticsExportApi(data) {
    try {
        const response = await getInstance().post('/post', data)
        return get(response, 'data.data', {})
    } catch (err) {
        parseError(err, code => {
            console.log(code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}
