/**
 * 事件监听触发器
 */
export default class EventEmitter {
    _listeners: { [key: string]: Function[] } = {}
    maxListener = 10

    /**
     * 监听事件
     * @param event
     * @param cb
     */
    on(event: string, cb: Function): this {
        let listeners = this._listeners
        if (listeners[event] && listeners[event].length >= this.maxListener) {
            throw console.error('The maximum number of listeners is %d. You have exceeded the limit', this.maxListener)
        }

        if (!listeners[event]) {
            listeners[event] = []
        }

        if (listeners[event].indexOf(cb) === -1) {
            listeners[event].push(cb)
        }
        return this
    }

    /**
     * 触发事件
     * @param event
     * @param data
     */
    emit(event: string, ...data: any[]): this {
        // eslint-disable-next-line prefer-rest-params
        const args = Array.prototype.slice.call(arguments)
        args.shift()
        this._listeners[event] && this._listeners[event].forEach(cb => {
            // eslint-disable-next-line prefer-spread
            cb.apply(null, args)
        })
        return this
    }

    /**
     * 销毁事件
     * @param event
     * @param listener
     */
    off(event: string, listener: Function): this {
        const _listeners = this._listeners
        const arr = _listeners[event] || []
        const i = arr.indexOf(listener)
        if (i >= 0) {
            _listeners[event].splice(i, 1)
        }
        return this
    }

    /**
     * 监听事件（仅执行一次）
     * @param event
     * @param listener
     */
    once(event: string, listener: Function): this {
        const self = this

        function fn() {
            // eslint-disable-next-line prefer-rest-params
            const args = Array.prototype.slice.call(arguments)
            // eslint-disable-next-line prefer-spread
            listener.apply(null, args)
            self.off(event, fn)
        }

        this.on(event, fn)
        return this
    }

    /**
     * 移除所有指定事件监听
     * @param event
     */
    removeAllListener(event: string): this {
        this._listeners[event] = []
        return this
    }

    /**
     * 查看指定事件监听器列表
     * @param event
     */
    listeners(event: string): Function[] {
        return this._listeners[event]
    }

    /**
     * 设置事件最大监听数
     * @param num
     */
    setMaxListeners(num: number): this {
        this.maxListener = num
        return this
    }

    $on = this.on
    $once = this.once
    $emit = this.emit
    $off = this.off
    $listeners = this.listeners
    addListener = this.on
    removeListener = this.off
}
