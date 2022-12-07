/**
 * ipc同步通知模块
 */

import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { v4 as uuidv4 } from 'uuid'

interface IOpt {
    timeout?: number
}

export class IpcRendererAsync {
    timeout: number = 0
    static _instance: IpcRendererAsync

    constructor(opt: IOpt = {}) {
        const { timeout } = opt
        this.timeout = timeout || 0
    }

    /**
     * 单例
     * @returns {IpcRendererAsync}
     */
    static getInstance(): IpcRendererAsync {
        this._instance = this._instance ? this._instance : new IpcRendererAsync()
        return this._instance
    }

    /**
     * 添加监听事件
     * @param eventId
     * @param args
     * @returns {Promise<never>|Promise<unknown>}
     */
    on(eventId = '', args: any): Promise<any> {
        const event = eventId.trim()
        let timer = 0

        if (!event) {
            const msg = 'Invalid event id'
            console.warn(msg)
            return Promise.reject(new Error(msg))
        }

        return new Promise((resolve, reject) => {
            const uid = uuidv4()
            const channel = `${event}_${uid}`

            ipcRenderer.on(channel, (event, args) => {
                if (args.code === 0) {
                    resolve(args)
                } else {
                    reject(new Error(args.message))
                }
                if (timer) clearTimeout(timer)
                ipcRenderer.removeAllListeners(channel)
            })

            if (this.timeout > 0) {
                timer = setTimeout(() => {
                    ipcRenderer.removeAllListeners(channel)
                }, this.timeout)
            }

            ipcRenderer.send(event, { eventId: event, uid, ipcRendererOn: channel, data: args })
        })
    }
}
