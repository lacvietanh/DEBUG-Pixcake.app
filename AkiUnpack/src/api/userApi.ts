// @ts-ignore
import { createInstance, getBaseURL, provideInterceptors, throwError } from '@/utils/http'
import { get } from 'lodash'
// @ts-ignore
import md5 from 'js-md5'

let instance:any = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL(),
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
 * 通用
 * @return {Promise<void>}
 * @param url
 * @param data
 * @param method
 */
// const openAjaxRequest = async (url, data = {}, mtd = 'post') => {
//   try {
//     let response = null
//     const method = mtd.toLowerCase()
//     if (['post', 'put'].includes(method)) {
//       response = await instance[method](url, data)
//     } else if (['get', 'delete'].includes(method)) {
//       response = await instance[method](url, { params: data })
//     }
//     return get(response, 'data.data', [])
//   } catch (err) {
//     throwError(err, code => {
//       switch (code) {
//         case 400:
//           return '参数错误'
//         default: {
//           // ,,,
//         }
//       }
//     })
//   }
// }

// /**
//  * 登录
//  * @return {Promise<void>}
//  * @param data
//  */
// export async function fetchDemoLogin(data) {
//     try {
//         const formData = new FormData()
//         formData.append('phone', data.phone)
//         formData.append('phone_code', data.phone_code)
//         formData.append('invitation_code', data.invitation_code)
//         const response = await getInstance().post('/signin', formData)
//         return get(response, 'data', {})
//     } catch (err) {
//         throwError(err, code => {
//             switch (code) {
//                 case 406:
//                     return '验证码错误'
//                 case 401:
//                     return '账号密码错误'
//                 default: {
//                 }
//             }
//         })
//     }
// }
//
/**
 * 获取用户信息
 * @param params
 * @returns {Promise<any>}
 */
export async function fetchUserInfo(params?: any) {
    try {
        const response = await getInstance().get('/v1/api/app/user/info', { params })
        return get(response, 'data.data', {})
    } catch (err) {
        throwError(err, (code: number) => {
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
 * 获取验证码
 * @returns {Promise<any>}
 * @param phone
 */
export async function postVertifyCode(phone: string) {
    try {
        let params = {
            phone: phone,
            phone_cc: 86
        }
        const response = await getInstance().post('/v1/app/send_verify_code', params)
        const res = get(response, 'data', {})
        return res.code == 0
    } catch (err) {
        throwError(err, (code: number) => {
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
 * 登录
 * @param phone
 * @param vertifyCode
 * @returns {Promise<any>}
 * mUuid，设备的uuid
 * mInfo,
 */
export async function postLogin({ phone, verifyCode, setupFileName, muuid, minfo,mcpu,mdisk,mboard,host_name,user_name }: any) {
    try {
        let strOsInfo = '{}'
        try {
            strOsInfo = JSON.stringify(minfo)
        } catch (e) {
            console.error(e)
        }
        let params = {
            phone: phone,
            phone_cc: 86,
            verify_code: md5(verifyCode),
            setup_name: setupFileName || '',
            muuid: muuid,
            minfo: strOsInfo,
            mboard:mboard,
            mcpu:mcpu,
            mdisk:mdisk,
            host_name:host_name,
            user_name:user_name
        }
        const response = await getInstance().post('/v2/app/login', params)
        const res = get(response, 'data', {})
        return res
    } catch (err) {
        throwError(err, (code: number) => {
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

export async function logout(): Promise<void>{
    try {
        const response = await getInstance().post('/v1/api/app/user/logout', {})
        const res = get(response, 'data', {})
        return res
    } catch (err) {
        throwError(err, (code: number) => {
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

/*
 * 上报设备信息，
 */
export async function postTokenInfo({ muuid, minfo,host_name, user_name}: any) {
    try {
        let strOsInfo = '{}'
        try {
            strOsInfo = JSON.stringify(minfo)
        } catch (e) {
            console.error(e)
        }
        let params = {
            muuid: muuid,
            minfo: strOsInfo,
            host_name:host_name,
            user_name:user_name
        }
        const response = await getInstance().post('/v2/api/token/info', params)
        const res = get(response, 'data', {})
        return res
    } catch (err) {
        throwError(err, (code: number) => {
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
 * 完善商家信息
 * @param {string} org_name
 * @param {number} org_type_id
 * @param {number} city_id
 * @returns {Promise<any>}
 */
export async function preferOrgInfo({ org_name, org_type_id, city_id , month_ps_count_id}: any) {
    try {
        let params = {
            org_name: org_name,
            org_type_id: org_type_id,
            city_id: city_id,
            month_ps_count_id
        }
        const response = await getInstance().post('/v1/api/app/user/update_org_info', params)
        const res = get(response, 'data', {})
        return res
    } catch (err) {
        throwError(err, (code: number) => {
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

export async function fetchOrgType() {
    try {
        const response = await getInstance().get('/v1/organization_type/get')
        const res = get(response, 'data', {})
        return res
    } catch (err) {
        throwError(err, (code: number) => {
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

export async function fetchMenus(): Promise<void> {
    try {
        const response = await getInstance().get('/v1/api/menu/list')
        return get(response, 'data.data', {}) || {}
    } catch (err) {
        throwError(err, (code: number) => {
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

// const defaultMenus = {
//     'navMenu': [
//         {
//             'key': 'invite',
//             'show': true,
//             'url': 'https://pc-dev.pixcakeai.com/inviteDetail',
//             'icon': 'https://pixcake-public.oss-cn-hangzhou.aliyuncs.com/ui/client/icon_gift.png',
//             'linkType': 2,
//             'name': '邀请详情',
//             'showName': false
//         }
//     ],
//     'userMenu': [
//     ],
//     'helpMenu': [
//     ]
// }

