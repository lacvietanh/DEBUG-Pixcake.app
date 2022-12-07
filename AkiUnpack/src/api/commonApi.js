/**
 * 全局通用api
 */
import axios from 'axios'
import fs from '@/qt-ipc/fs'
import { createInstance, getBaseURL, provideInterceptors, throwError } from '@/utils/http'
import { get } from 'lodash'
import { Platforms } from '@/constants'
import { APP_VERSION } from "#/types/config";


let instance = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1',
                crossDomain: false,
                withCredentials: true,
                // Ignore SSL verification
                // httpsAgent: new https.Agent({
                //     rejectUnauthorized: false
                // }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }), { request: true }
        )
}
    return instance
}

/**
 * 获取预设图标
 * @returns {Promise<any>}
 */
export async function fetchPresetIcons() {
    try {
        const response = await getInstance().get('/api/icons/get', {
            params: {
                icon_type: 1
            }
        })
        return get(response, 'data.data', [])
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

/**
 * 获取公众号图标
 * @returns {Promise<any>}
 */
export async function fetchServiceIcons() {
    try {
        const response = await getInstance().get('/api/icons/get', {
            params: {
                icon_type: 2
            }
        })
        return get(response, 'data.data', [])
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


/**
 * 获取预设图标
 * @returns {Promise<any>}
 */
export async function fetchProtocol(type) {
    try {
        const response = await getInstance().get('/protocol', { params: { type } })
        return get(response, 'data.data', [])
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

/**
 * 版本更新检测
 * @returns {Promise<*>}
 */
export async function checkServerUpdater(isManual = false) {
    try {
        const query = {
            version: APP_VERSION.match(/\d+(\.\d+){2}/gi)[0],
            app_type: process.platform === 'win32'
                ? Platforms.QTWINDOWS
                : Platforms.QTMACOS,
            is_manual: isManual ? 1 : 0
        }
        const response = await getInstance().get('/app/update_config', { params: query })
        return get(response, 'data.data', {})
    } catch (err) {
        throwError(err, (code) => {
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
 * 获取外链页面链接
 * @returns {Promise<*>}
 */
export async function fetchOutsideUrl(name) {
    try {
        const response = await getInstance().get('/url/info', { params: { name: name } })
        return get(response, 'data.data', {})
    } catch (err) {
        throwError(err, (code) => {
            switch (code) {
                case 400:
                    return '参数错误'
                default: {
                }
            }
        })
    }
}

async function writeToFile(filePath, buffer) {
    // if (await fs.existsSync(filePath)){
    //     await fs.unlinkSync(filePath)
    // }
    // const file = await fs.createWriteStream(filePath,{
    //     mode:0o777 // 赋给全部权限
    // })
    // file.on('error',(err)=>{ // 写的过程中如果出现错误，则删除文件路径
    //     if (fs.existsSync(filePath)){
    //         fs.unlinkSync(filePath)
    //     }
    //     reject(err)
    // })
    // file.write(buffer)
}

export async function downloadFile(fileUrl, filePath) {
    // try {
    //     const response = await axios.get(fileUrl, {
    //         responseType:'blob',
    //         method:'get'
    //     })
    //     let data = response.data //blob类型的数据
    //     let buffer = await data.arrayBuffer()
    //     buffer = new Buffer(buffer)
    //     await writeToFile(filePath,buffer)
    //     return filePath
    // } catch (err) {
    //     if (await fs.existsSync(filePath)){
    //         await fs.unlinkSync(filePath)
    //     }
    //     throwError(err, (code) => {
    //         switch (code) {
    //             case 400:
    //                 return '参数错误'
    //             default: {
    //             }
    //         }
    //     })
    // }
}

/**
 * 获取省份信息
 * @returns {Promise<*>}
 */
export async function fetchProvinceInfo() {
    try {
        const response = await getInstance().get('/province/get')
        return get(response, 'data.data', {})
    } catch (err) {
        throwError(err, (code) => {
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
 * 获取城市信息
 * @returns {Promise<*>}
 */
export async function fetchCityInfo(province_id) {
    try {
        const response = await getInstance().get('/city/get', { query: { province_id } })
        return get(response, 'data.data', {})
    } catch (err) {
        throwError(err, (code) => {
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
 * 获取活动页面信息
 * @param {string} org_name
 * @param {number} org_type_id
 * @param {number} city_id
 * @returns {Promise<any>}
 */
export async function fetchActivityInfo(type = 101) {
    try {
        let params = {
            type
        }
        const response = await getInstance().get('/h5/activity/common/info', { params })
        const res = get(response, 'data', {})
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
 *  获取枚举类型（问题上报）
 * @returns {Promise<any>}
 */
export async function feedbackType(type = 1) {
    try {
        const query = {
            type
        }
        const response = await getInstance().get('/enumerate/info', { params: query })
        return get(response, 'data.data', [])
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
