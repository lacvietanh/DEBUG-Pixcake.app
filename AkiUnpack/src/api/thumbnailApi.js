/**
 * 缩略图相关API
 */
import { throwError, provideInterceptors, createInstance, getBaseURL } from '@/utils/http'
import { get } from 'lodash'

let instance = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api/project/image',
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
    return instance
}


/**
 * 创建一个新的图片ID
 * @param projectId
 * @returns {Promise<any>}
 */
export async function postCreateThumbnailId(projectId, batch_num) {
    try {
        let params = {
            project_id: projectId,
            batch_num: batch_num
        }
        const response = await getInstance().post('/batch_id', params)
        const res = get(response, 'data.data', {})

        return res
    } catch (err) {
        throwError(err, code => {
            console.log(code)

            switch (code) {
                case 400:
                    return '上传缩略图，参数错误'
                case 500:
                    return '上传缩略图，网络不可用'
                default: {
                }
            }
        })
    }
}

/**
 * 删除一个原图
 * @param projectId
 * @param imageId
 * @returns {Promise<any>}
 */
export async function deleteThumbnailIds(projectId, image_ids) {
    try {
        let params = {
            project_id: projectId,
            image_ids: image_ids
        }

        const response = await getInstance().delete('/batch_id', {
            data: params
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
 * 上传原图
 * @param projectId  项目ID
 * @param imageId  原图ID
 * @param imageFormat 图片格式 1： JPEG 2： PNG 3：JPG etc
 * @param imageData  图片流
 * @returns {Promise<void>}
 */
export async function postUploadOriginImage(projectId, imageId, imageFormat, imageData) {
    try {
        const response = await getInstance().post('/info', null, {
            headers: {
                'Project-Id': projectId,
                'Image-Id': imageId,
                'Image-Format': imageFormat
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

