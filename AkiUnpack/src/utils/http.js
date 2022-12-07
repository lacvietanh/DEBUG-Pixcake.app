import axios from 'axios'
import { APP_VERSION } from '@/universal/types/config'
import {
    isUndefined,
    isNumber,
    isString,
    isError,
    assign,
    set,
    get
} from 'lodash'

import { getToken } from '@/utils/auth'
import { ApiDef } from '@/constants/api-def'
import UserModel from '#/model/UserModel'
import LocalConfigModel from '#/model/LocalConfigModel'
// import { getToken } from '#/utils/auth'
// import { ApiDef } from '#/types/apiDef';
// import { DECRYP_API, PAY_API, PRE_PAY } from '@/api/payApi';

export const { version } = APP_VERSION
const isPro = process.env.VUE_APP_ENV === 'pro'
const isDev = process.env.VUE_APP_ENV === 'dev'

export function getBaseURL() {
    if (isDev) {
        return ''
    }
    const instance = LocalConfigModel.getInstance()
    const url = instance.host || process.env.VUE_APP_API_HOST
    return url
}

/**
 * 判断网络
 * @returns {boolean|boolean}
 */
export function isOnline() {
    return window.navigator ? window.navigator.onLine : true
}

/**
 * 获取响应的元信息的 code
 * @param {object} response
 * @param path
 * @returns {number|string}
 */
export function getPosCode(response, path = 'data.code') {
    const code = get(response, path)
    return isNumber(code) ? Math.abs(code) : code
}

/**
 * 错误事件处理器
 * @param {object|Error} error 待处理的错误 / 响应
 * @param option
 * @return {Promise<object|Error>}
 */
export function onError(error, option) {
    let isOnline = window.$net.isOnline()
    if (isOnline) {
        return Promise.reject(toError(error.response || (error.message ? new Error(error.message) : error.response), option))
    } else {
        return Promise.reject(new Error('网络连接错误'))
    }
}

/**
 * 包裹成 `Error` 对象
 * @param {*} error 待包裹的错误信息
 * @param option
 * @returns {Error}
 */
export function toError(error, option) {
    let isOnline = window.$net.isOnline()
    const unknownError = isOnline ? '未知错误' : '网络连接错误'

    if (isUndefined(get(error, option.messagePos))) {
        const code = get(
            error,
            option.codePos,
            get(error, 'status', -1)
        )

        const msg = code !== -1 ?
            ('请求错误' + code) :
            get(error, 'message', unknownError)

        set(error, option.messagePos, msg)
    }

    const err = error

    if (!isError(err)) {
        const defaultMsg = get(
            error,
            option.messagePos,
            get(error, 'message', unknownError)
        )
        if (err) {
            err.message = get(error, 'message', defaultMsg)
        } else {
            return new Error(defaultMsg)
        }
    }

    return err
}

/**
 * 创建请求实例
 * @param {object} config 配置
 * @param option
 * @return {instance}
 */
export function createInstance(config, option = {}) {
    const instance = axios.create(config)

    // 自定义code、message路径（通用api：data.code，算法：data.ErrorCode）
    addResponseInterceptor(instance, {
        codePos: option.codePos || 'data.code',
        messagePos: option.messagePos || 'data.message'
    })

    return instance
}

export const commonErrorCode = {
    403: '权限验证失败',
    404: 'NOT FOUND',
    413: '请求实体过长',
    415: '算法内部异常',
    424: '图片下载失败',
    500: '服务器异常，请稍后再试',
    502: '服务器异常，请稍后再试',
    503: '服务暂时不可用，请稍后重试',
    599: '算法连接超时'
}

/**
 * 抛出错误
 * @param {Error} err 错误对象
 * @param {function} handler 错误 message 生成器
 * @param codePos
 * @throws {Error}
 */
export function throwError(err, handler, codePos = 'data.code') {
    const code = get(
        err,
        codePos,
        get(err, 'status')
    )

    const { message } = err
    const msg = handler(code, err) || message

    if (msg && err.message !== msg) {
        err.message = msg
    }

    /* 通用状态码 */
    if (Object.keys(commonErrorCode).includes(code)) {
        err.message = commonErrorCode[code]
    }

    // if (isUndefined(code)) {
    //   err.message = `err.message`
    // }

    throw err
}

export function parseError(err, handler, codePos = 'data.code') {
    const code = get(
        err,
        codePos,
        get(err, 'status')
    )

    const { message, data } = err

    function parseCode() {
        let finalMessage
        if (message) {
            finalMessage = message
        } else {
            /* 通用状态码 */
            if (Object.keys(commonErrorCode).includes(code)) {
                finalMessage = commonErrorCode[code]
            }
        }
        handler(code, finalMessage)
    }

    if (data) {
        try {
            let response = JSON.parse(Utf8ArrayToStr(new Uint8Array(data)))
            if (response && response.code) {
                handler(response.code, response.message)
            } else {
                parseCode()
            }
        } catch (e) {
            parseCode()
        }
    } else {
        parseCode()
    }

}

export function Utf8ArrayToStr(array) {
    let out, i, len, c
    let char2, char3

    out = ''
    len = array.length
    i = 0
    while (i < len) {
        c = array[i++]
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += String.fromCharCode(c)
                break
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = array[i++]
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F))
                break
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = array[i++]
                char3 = array[i++]
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0))
                break
        }
    }

    return out
}

/**
 * 添加响应的拦截器
 * @param {instance} instance
 * @param option
 * @return AxiosInstance
 */
export function addResponseInterceptor(instance, option) {
    instance.interceptors.response.use(async response => {

        // 特定 文件流服务端API 特性
        // 请求成功时，服务端返回文件流数据在 <response.data>
        if (response.status === 200) {

            // 文件类型api
            // const fileApis = [PAY_API, DECRYP_API]
            // if (fileApis.includes(response.config.url)) {
            //     let cakeCode = response.headers['cake-code']
            //     if (cakeCode === '0') {
            //         return response
            //     }
            // }
        }

        // 返回的数据为字符串时，将尝试转为 JSON
        if (response.data && isString(response.data)) {
            response.data = JSON.parse(response.data)
        }
        // 没有 meta 信息将直接返回响应
        if (!response.data.code) {
            return response
        }

        const metaCode = get(response, option.codePos)

        // 响应结果非 `0` 将当成是错误处理
        switch (metaCode) {
            case 0:
            case 200: {
                return response
            }

            default: {
                throw toError(response, option)
            }
        }
    }, (data) => onError(data, option))

    return instance
}

/**
 * 注入拦截器
 * @param {instance} instance
 * @param opts
 * @return {instance}
 */
export function provideInterceptors(instance, opts = {}) {
    const { request = true } = opts

    if (request) {
        instance.interceptors.request.use(
            async config => {
                config.headers = assign(config.headers, { 'Cake-Version': APP_VERSION })
                const tk = await getToken()
                const isVip = await UserModel.getInstance().getIsVip()
                if (tk) {
                    config.headers = assign(config.headers, {
                        'Authorization': tk,
                        'If-Range-Mode': isVip
                    })
                }

                return config
            },
            err => Promise.reject(err)
        )
    }

    return instance
}
