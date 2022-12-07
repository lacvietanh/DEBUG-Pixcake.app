import { GTAG_MEASUREMENT_ID, APP_VERSION } from '@/universal/types/config'
import {ShareObjectModel} from "#/model/ShareObjectModel/ShareObjectModel";
import IpcRenderGtag from '@/utils/TsStat/IpcRenderGtag'
export default class TsStat {
    constructor() {
        this.gtag = null
        this.instance = null
        this.gtag = IpcRenderGtag.getInstance()
    }

    /**
     * 单例
     * @returns {TsStat}
     */
    static getInstance() {
        this.instance = this.instance ? this.instance : new TsStat()
        return this.instance
    }

    register(handler){
        this.gtag.register(handler)
    }

    // 通用埋点
    event(event_id, data = {}) {
        // 仅上报登录用户
        // if (this.gtag && event_id && this.gtag.uid) {
        //     this.gtag.event(event_id, {
        //         ...data
        //     })
        // }
        console.log('lxl event=', event_id, data)
        this.gtag.event(event_id, {
            ...data
        })
    }

    pageview(data = {}) {
        // 仅上报登录用户
        if (this.gtag) {
            const path = data.path
            delete data.path
            this.gtag.pageview(path, { ...data })
        }
    }

    login(userId, merchant_id) {
        this.gtag.login(userId, merchant_id)
        // this.gtag.updateCid(`${this.system.mac_addr}.${userId}`)
        // this.gtag.event('login')
    }

    logout() {
        if (this.gtag) {
            // this.gtag.event('logout')
            this.gtag.logout()
        }
    }
}
