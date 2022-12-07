// @ts-ignore
import { IpcRendererAsync } from '@/utils/ipcRenderAsync'

type IMenuItem = {
    label: string,
    action: string,
    disabled: boolean,
    data: any,
    callback: Function
}

export default class Menu {
    list: IMenuItem[] = []
    dataMap: Map<string, any> = new Map<string, any>()
    callback: Map<string, Function> = new Map<string, Function>()

    constructor() {
    }

    push(item: IMenuItem): this {
        this.dataMap.set(item.action, item.data)
        this.callback.set(item.action, item.callback)
        this.list.push(item)
        return this
    }

    show(callback?: Function): void {
        const ipcAsync = new IpcRendererAsync()

        ipcAsync.on('show-context-menu', { 'items': this.list })
            .then(({ action }: IMenuItem) => {
                if (this.callback.has(action)) {
                    const func = this.callback.get(action)
                    const data = this.dataMap.get(action)
                    func && func(data || null)

                    // eslint-disable-next-line callback-return
                    callback && callback(action, data)
                }
            })
    }
}
