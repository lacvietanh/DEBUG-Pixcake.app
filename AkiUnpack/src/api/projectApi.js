/**
 * 项目相关API
 */
import { throwError, provideInterceptors, createInstance, getBaseURL } from '@/utils/http'
import { get } from 'lodash'


let instance = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api/project',
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
let instance2 = null
export function getInstance2() {
    if (!instance2){
        instance2 = provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v2/api/project',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            { request: true }
        )
    }
    return instance2
}


/**
 * 创建新的项目
 * @param projectName
 * @returns {Promise<any>}
 */
export async function postAddProject(projectName) {
    try {
        let params = {
            name: projectName
        }
        const response = await getInstance().post('/create', params)
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
 * 创建新的项目
 * @param projectName
 * @returns {Promise<any>}
 */
export async function batchDeleteProject(projectIds) {
    try {
        let params = {
            ids_info: JSON.stringify(projectIds)
        }
        const response = await getInstance2().delete('/batch_delete', { data: params })
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
