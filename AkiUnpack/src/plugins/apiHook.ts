// @ts-ignore
import { getInstance as commonGetInstance } from '@/api/commonApi'
// @ts-ignore
import { getInstance as exportGetInstance, getInstance2 as exportGetInstance2 } from '@/api/exportApi'
// @ts-ignore
import { getInstance as orderGetInstance, getInstance2 as orderGetInstance2 } from '@/api/orderApi'
// @ts-ignore
import { getInstance as payInstanceGetInstance, getInstanceV2 as payInstanceGetInstance2, getInstanceV3 as payInstanceGetInstance3, getInstanceV4 as payInstanceGetInstance4 } from '@/api/payApi'
// @ts-ignore
import { getInstance as projectGetInstance,getInstance2 as projectGetInstance2 } from '@/api/projectApi'
// @ts-ignore
import { getInstance as reportGetInstance } from '@/api/reportApi'
// @ts-ignore
import { getInstance as settingGetInstance, getInstance1 as settingGetInstance1, getInstance2 as settingGetInstance2 } from '@/api/settingApi'
// @ts-ignore
import { getInstance as shareGetInstance } from '@/api/shareApi'
// @ts-ignore
import { getInstance as thumbnailGetInstance } from '@/api/thumbnailApi'
// @ts-ignore
import { getInstance as userGetInstance } from '@/api/userApi'
// import { instance as utilsInstance } from '@/api/utilsApi';

// @ts-ignore
import { get } from 'lodash'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui';

function addResponseInterceptor(instance: { interceptors: { response: { use: (arg0: (response: any) => any, arg1: (err: any) => Promise<never>) => void } } }) {
    instance.interceptors.response.use(
        response => response,
        async err => {
            console.error('[addResponseInterceptor]: ', err)
            const status = get(err, 'status', null)
            // const metaCode = getPosCode(err) // 自定义code
            const loginExpired = [
                '/v1/app/send_verify_code', // 发送验证码
                '/v1/app/login' // 登录
            ]
            if (
                (status && status === 401) &&
                err.config.baseURL.indexOf('/proxy') === -1 &&
                !loginExpired.includes(err.config.url) &&
                store.getters.isLogin
                // ACCOUNT_LOGIN_ROUTE !== router.app.$route.name
            ) {

                const messageInfo = {
                    message: '登录状态已失效，请重新登录',
                    offset: 68,
                    type: 'custom',
                    duration: 4000,
                    customClass: 'custom'
                }
                // @ts-ignore
                Message(messageInfo)

                await store.dispatch('ExitLogin', false)

                // await store.dispatch('FedLogOut')
                await router.push({ name: 'Login' })
            }

            throw err
        }
    )

    return instance
}

export function InstallResponseInterceptor(){
    addResponseInterceptor(commonGetInstance())

    addResponseInterceptor(exportGetInstance())
    addResponseInterceptor(exportGetInstance2())

    addResponseInterceptor(orderGetInstance())
    addResponseInterceptor(orderGetInstance2())

    addResponseInterceptor(payInstanceGetInstance())
    addResponseInterceptor(payInstanceGetInstance2())
    addResponseInterceptor(payInstanceGetInstance3())
    addResponseInterceptor(payInstanceGetInstance4())

    addResponseInterceptor(projectGetInstance())
    addResponseInterceptor(projectGetInstance2())

    addResponseInterceptor(reportGetInstance())

    addResponseInterceptor(settingGetInstance())
    addResponseInterceptor(settingGetInstance1())
    addResponseInterceptor(settingGetInstance2())

    addResponseInterceptor(shareGetInstance())

    addResponseInterceptor(thumbnailGetInstance())

    addResponseInterceptor(userGetInstance())
// addResponseInterceptor(utilsInstance)
}


