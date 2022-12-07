export class IpcNotifyEvent {
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
    private _callback(data: any): void {
        this.eventList.forEach((callback) => {
            callback(data)
        })
    }

    /**
     * 分发回调事件
     * @param data
     */
    distributeCallBack(data: any): void {
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

export class IpcBase<T> {
    ipcHandler:T|null = null
    public register(ipcHandler:any){
        this.ipcHandler = ipcHandler
    }
}

export class IpcBaseEasy<T> extends IpcBase<T>{
    notifyEventPool: Map<string, IpcNotifyEvent> = new Map()
    applyMessageReceived(eventId:string,data:any) {
        if (this.notifyEventPool.has(eventId)) {
            const broadcast = this.notifyEventPool.get(eventId)
            broadcast?.distributeCallBack(data)
        }
    }

    /**
     * 监听事件
     * @param eventId
     * @param callback
     */
    addListener(eventId: string, callback: Function): Symbol {
        const symbol = Symbol()
        if (!this.notifyEventPool.has(eventId)) {
            const notifyEvent = new IpcNotifyEvent(eventId)
            this.notifyEventPool.set(eventId, notifyEvent)
        }

        const notifyEventPool = this.notifyEventPool.get(eventId)
        notifyEventPool?.set(symbol, callback)
        return symbol
    }

    /**
     * 移除事件
     * @param eventId
     * @param identify
     * @param isSymbol
     */
    removeListener(eventId: string, identify: Symbol | Function, isSymbol: boolean = false): void {
        if (this.notifyEventPool.has(eventId)) {
            const notifyEventPool = this.notifyEventPool.get(eventId)
            notifyEventPool?.delete(identify, isSymbol)
        }
    }

    /**
     * 清空事件下的监听
     * @param eventId
     */
    clearListener(eventId: string): void {
        if (this.notifyEventPool.has(eventId)) {
            this.notifyEventPool.get(eventId)?.clear()
        }
    }

    /**
     * 清空所有监听事件
     */
    clearAll(): void {
        this.notifyEventPool.forEach(notifyEventPool => {
            notifyEventPool.clear()
        })
        this.notifyEventPool.clear()
    }
}