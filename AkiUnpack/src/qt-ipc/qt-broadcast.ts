import NodeApi from '@/qt-ipc/node-api'
import { IBroadcastParams } from '@/types/bridge'

class BroadcastEvent {
    eventId: string
    eventList: Map<Symbol, Function> = new Map<Symbol, Function>()

    constructor(eventId: string) {
        this.eventId = eventId
    }

    /**
     * 回调事件
     * @param data
     * @private
     */
    private _callback(data: IBroadcastParams): void {
        this.eventList.forEach((callback) => {
            callback(data)
        })
    }

    /**
     * 分发回调事件
     * @param data
     */
    distributeCallBack(data: IBroadcastParams): void {
        this._callback(data)
    }

    /**
     * 初始化 QT 事件广播监听
     */
    // private initListener() {
    //   window.addEventListener(this.eventId, this._callback)
    // }

    /**
     * 销毁 QT 事件广播监听
     */
    // destroy() {
    //   window.removeEventListener(this.eventId, this._callback)
    // }

    /**
     * 监听广播
     * @param symbol
     * @param callback
     */
    set(symbol: Symbol, callback: Function): void {
        // if (this.eventList.size === 0) {
        //   this.initListener()
        // }

        this.eventList.set(symbol, callback)
    }

    has(symbol: Symbol): void {
        this.eventList.has(symbol)
    }

    clear(): void {
        this.eventList.clear()
        // this.destroy()
    }

    delete(identify: Symbol | Function, isSymbol: boolean = false): void {
        let symbol: Symbol | null = null

        if (isSymbol) {
            symbol = identify as Symbol
        } else {
            this.eventList.forEach((callback, key) => {
                if (callback === identify) {
                    symbol = key
                }
            })
        }

        if (!symbol) {
            return
        }

        if (this.eventList.has(symbol)) {
            this.eventList.delete(symbol)
        }

        if (this.eventList.size === 0) {
            // this.destroy()
        }
    }

}

/**
 * 监听QT广播事件
 */
export default class QtBroadcast {
    static instance: QtBroadcast
    broadcastEvent: Map<string, BroadcastEvent> = new Map()

    /**
     * 单例
     */
    static getInstance(): QtBroadcast {
        if (!this.instance) {
            this.instance = new QtBroadcast()
        }
        return this.instance
    }

    static send(eventId: string, data: any): void {
        NodeApi.broadcast?.send(eventId, data)
    }

    /**
     * 注册事件广播
     */
    registerHandler(): void {
        NodeApi.broadcast?.on.connect((eventId: string, data: IBroadcastParams) => {
            console.log('NodeApi.broadcast on: topic: ', eventId, '  args: ', data)

            if (this.broadcastEvent.has(eventId)) {
                const broadcast = this.broadcastEvent.get(eventId)
                broadcast?.distributeCallBack(data)
            }
        })
    }

    /**
     * 监听事件
     * @param eventId
     * @param callback
     */
    addListener(eventId: string, callback: Function): Symbol {
        const symbol = Symbol()
        if (!this.broadcastEvent.has(eventId)) {
            const broadcastEvent = new BroadcastEvent(eventId)
            this.broadcastEvent.set(eventId, broadcastEvent)
        }

        const broadcastEvent = this.broadcastEvent.get(eventId)
        broadcastEvent?.set(symbol, callback)
        return symbol
    }

    /**
     * 移除事件
     * @param eventId
     * @param identify
     * @param isSymbol
     */
    removeListener(eventId: string, identify: Symbol | Function, isSymbol: boolean = false): void {
        if (this.broadcastEvent.has(eventId)) {
            const broadcastEvent = this.broadcastEvent.get(eventId)
            broadcastEvent?.delete(identify, isSymbol)
        }
    }

    /**
     * 清空事件下的监听
     * @param eventId
     */
    clearListener(eventId: string): void {
        if (this.broadcastEvent.has(eventId)) {
            this.broadcastEvent.get(eventId)?.clear()
        }
    }

    /**
     * 清空所有监听事件
     */
    clearAll(): void {
        this.broadcastEvent.forEach(broadcastEvent => {
            broadcastEvent.clear()
        })
        this.broadcastEvent.clear()
    }
}
