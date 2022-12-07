import { throwError, provideInterceptors, createInstance, getBaseURL } from '@/utils/http'
import { get } from 'lodash'
import { ApiDef } from '@/constants/api-def'


let instance = null

export function getInstance(){
    if (!instance){
        instance =  provideInterceptors(
            createInstance({
                baseURL: getBaseURL() + '/v1/api',
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
                baseURL: getBaseURL() + '/v1/api',
                crossDomain: false,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                timeout: 1000 * 15,
                responseType: 'arraybuffer'
            }),
            { request: true }
        )
    }
    return instance2
}


/**
 * 获取订单列表
 * @returns {Promise<any>}
 */
export async function getOrderByApi() {
    try {
        const response = await getInstance().get('/product/list')
        return get(response, 'data.data', [])
    } catch (err) {
        throwError(err, code => {
            console.log(code)
        })
    }
}

/**
 *
 * @param productId
 * @param payType 1:微信 2：支付宝
 * @returns {Promise<any>}
 */
export async function createOrderByApi(productId, payType) {
    try {
        let params = {
            product_id: productId,
            pay_type: payType
        }
        const response = await getInstance2().post(ApiDef.OrderCreate, params)
        const res = get(response, 'data', {})
        const orderNumb = response.headers.out_trade_no

        let btoaRes = btoa(new Uint8Array(res).reduce((arrayBuffer, byte) => arrayBuffer + String.fromCharCode(byte), ''))

        let pngInfo = 'data:image/png;base64,' + btoaRes
        return { pngInfo: pngInfo, orderNumb: orderNumb }
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

export async function getOrderStatusByApi(tradeNumb) {
    try {
        let params = {
            out_trade_no: tradeNumb
        }
        const response = await getInstance().get('/order/state', { params })
        const res = get(response, 'data.data', {})
        return res
    } catch (err) {
        throwError(err, code => {
            console.log(code)
        })
    }
}
