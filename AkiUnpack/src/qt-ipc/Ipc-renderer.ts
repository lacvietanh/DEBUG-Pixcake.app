import { v4 as uuidv4 } from 'uuid'
import NodeApi, { NodeChannelEvent } from '@/qt-ipc/node-api'

/**
 * 与QT通信协议
 */
class IpcRenderer {
    static instance: IpcRenderer
    eventId: string = ''  // 事件名称
    timeout: number = 0   // 超时时间
    private _promiseAckMap: Map<string, Array<Function>> = new Map()

    constructor() {
        let renderer = NodeApi.getRenderer()
        if (!renderer) {
            NodeApi.once(NodeChannelEvent.init, () => {
                this.onListen()
            })
        }
    }

    static getInstance(): IpcRenderer {
        this.instance = this.instance ? this.instance : new IpcRenderer()
        return this.instance
    }

    onListen() {
        let renderer = NodeApi.getRenderer()
        if (!renderer) {
            console.error(`onListen - renderer not found!!!`)
            return
        }
        renderer['on'].connect((topic: string, args: any) => {
            if (this._promiseAckMap.has(topic)) {
                const list = this._promiseAckMap.get(topic)
                if (list) {
                    for (const action of list) {
                        action(topic, args)
                    }
                }
                // this._promiseAckMap.delete(topic)
            }
        })
    }

    /**
     * 监听响应
     * @param args
     */
    on(topic: string, callBack: ((topic: string, args: any) => void)) {
        const flagKey = topic
        let list = this._promiseAckMap.get(flagKey)
        if (!list) {
            list = new Array<Function>()
            this._promiseAckMap.set(flagKey, list)
        }
        list.push(callBack)
    }

    off(topic: string, callBack: ((topic: string, args: any) => void)) {
        try {
            const flagKey = topic
            let list = this._promiseAckMap.get(flagKey)
            if (list) {
                const index = list.indexOf(callBack)
                if (index >= 0) {
                    list.splice(index, 1)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    removeAllListeners(topic: string) {
        try {
            this._promiseAckMap.delete(topic)
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * 发送事件通知
     */
    send(topic: string, arg: any = {}): Promise<any> {
        let renderer = NodeApi.getRenderer()
        if (!renderer) {
            console.error(`send - renderer not found!!!`)
            return Promise.resolve()
        }
        return NodeApi.getRenderer().invoke(topic, arg)
    }

    destroy(): void {
        this._promiseAckMap.clear()
    }
}

export default IpcRenderer.getInstance()
