import { createInstance, getBaseURL, provideInterceptors, throwError } from '@/utils/http'
import { get } from 'lodash'


let instance = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api/report',
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
 *
 * @param file 512的原图
 * @returns {Promise<*>}
 */
export async function reportApi(projectId, file) {
    try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await getInstance().post('/issue', formData, {
            headers: {
                'Project-Id': projectId
            }
        })

        const res = get(response, 'data.data', {})
        return res
    } catch (err) {
        throwError(err, code => {
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}
