/**
 * 扣款相关API
 */
import {throwError, provideInterceptors, createInstance, getBaseURL, parseError} from '@/utils/http'
import {ExportCode, ExportMessage, Export_API_ERROR} from '@/constants/export-config'
import {get} from 'lodash'

import {ApiDef} from '@/constants/api-def'

export const PAY_FUNDS_LACK = Export_API_ERROR.PAY_API
export const ALLOCATED_PAY_FUNDS_LACK = Export_API_ERROR.ALLOCATED_PAY_API

export const PAY_API = '/app/project_list'

export const PRE_PAY = '/process/pre'

export const DECRYP_API = '/app/project_info'


let instance = null

export function getInstance() {
    if (!instance) {
        instance = provideInterceptors(
            createInstance({
                baseURL: getBaseURL(),
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 1000 * 15
            }),
            {request: true}
        )
    }
    return instance
}

let instance2 = null

export function getInstanceV2() {
    if (!instance2) {
        instance2 = provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v2/api',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            {request: true}
        )
    }
    return instance2
}

let instance3 = null

export function getInstanceV3() {
    if (!instance3) {
        instance3 = provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 1000 * 15,
                responseType: 'arraybuffer'
            }),
            {request: true}
        )
        return instance3
    }
}

let instance4 = null

export function getInstanceV4() {
    if (!instance4) {
        instance4 = provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v2/api',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 1000 * 15,
                responseType: 'arraybuffer'
            }),
            {request: true}
        )
        return instance4
    }
}