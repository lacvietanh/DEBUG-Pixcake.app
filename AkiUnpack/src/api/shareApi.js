/**
 * 分享相关API
 */
import { throwError, provideInterceptors, createInstance, getBaseURL } from '@/utils/http'
import { get } from 'lodash'

let instance = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api/project/share',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            { request: true }
        )
    }
    return instance
}


/**
 * 创建新的分享
 * @param projectName
 * @returns {Promise<any>}
 */
export async function createShareApi(exportId) {
    try {
        let params = {
            export_id: exportId
        }
        const response = await getInstance().post('/new', params)
        const res = get(response, 'data.data', {})
        console.log('createShareApi success : ' + res)
        return res
    } catch (err) {
        throwError(err, code => {
            console.log('createShareApi fail : ' + code)
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
 * 分享API
 * @param projectName
 * @returns {Promise<any>}
 */
export async function shareApi(shareId, exportId, shareInfo) {
    try {
        let params = {
            share_id: shareId,
            export_id: exportId,
            share_info: shareInfo

        }
        const response = await getInstance().post('/share', params)
        const res = get(response, 'data.data', {})
        console.log('shareApi success : ' + res)
        return res
    } catch (err) {
        throwError(err, code => {
            console.log('createShareApi fail : ' + code)
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}
