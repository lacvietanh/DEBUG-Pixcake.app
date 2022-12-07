import {
    IApp,
    IBroadcast,
    IFs,
    INativeImage, INet,
    IPlatformPath,
    IRenderer,
    IShell
} from '@/types/bridge'
import { IDBInterface } from './types/IDBInterface'
import { IPresetBindThumbnail } from '@/qt-ipc/types/IPresetBindThumbnail'
import { IGallery } from '@/qt-ipc/types/IGallery'
import { IPixcookEngine } from '@/qt-ipc/types/IPixcookeEngine'
import { IImageIOManager } from '@/qt-ipc/types/IImageIOManager'
import { IExportInterface } from '@/qt-ipc/types/IExportInterface'
import { IRefine } from '@/qt-ipc/types/refine'
import { ICookie } from '@/qt-ipc/types/cookie'
import { IDialog } from '@/qt-ipc/types/IDialog'
import { IThumbnailOptRecord } from '@/qt-ipc/types/IThumbnailOptRecord'


interface ChannelEventBind {
    identify: Symbol,
    callBack: Function
}

export enum NodeChannelEvent {
    init = 'init',
    appState = 'appState'
}

export default class NodeApi {
    static eventsFuncMap = new Map<string, Array<ChannelEventBind>>()

    //---
    static once(eventName: string, callBack: Function) {
        let symbol = this.addChannelEventListener(eventName, () => {
            callBack()
            this.removeChannelEventListener(eventName, symbol)
        })
    }

    //--- node挂载的事件
    static addChannelEventListener(eventName: string, callBack: Function) {
        let identify = Symbol()
        let funcs = this.eventsFuncMap.get(eventName)
        if (!funcs) {
            funcs = []
            this.eventsFuncMap.set(eventName, funcs)
        }
        funcs.push({ identify, callBack })
        return identify
    }

    static removeChannelEventListener(eventName: string, identify: Symbol | Function) {
        let funcs = this.eventsFuncMap.get(eventName)
        if (!funcs) {
            return
        }
        for (let i = 0; i < funcs.length; i++) {
            const eventItem = funcs[i]
            if (eventItem.identify == identify || eventItem.callBack == identify) {
                funcs.splice(i, 1)
            }
        }
    }

    static dispatchChannelEvents(eventName: string) {
        let funcs = this.eventsFuncMap.get(eventName)
        if (!funcs) {
            return
        }
        for (let i = 0; i < funcs.length; i++) {
            const eventItem = funcs[i]
            eventItem.callBack()
        }
    }

    //---

    static get fs(): IFs {
        return window.$fs
    }

    static get path(): IPlatformPath {
        return window.$path
    }

    static get broadcast(): IBroadcast {
        return window.$broadcast
    }

    static get shell(): IShell {
        return window.$shell
    }

    static get app(): IApp {
        return window.$app
    }

    static get nativeImage(): INativeImage {
        return window.$nativeImage
    }

    static getRenderer(): IRenderer {
        return window.$renderer
    }

    static get pixcookengine(): IPixcookEngine {
        return window.$pixcook
    }

    static get imageIOManager(): IImageIOManager {
        return window.$imageIOManager
    }

    static get presetSuit(): IPresetBindThumbnail {
        return window.$presetSuit
    }

    static get gallery(): IGallery {
        return window.$gallery
    }

    static get refine(): IRefine {
        return window.$refine
    }


    static getExport(): IExportInterface {
        return window.$export
    }

    static getDialog(): IDialog {
        return window.$dialog
    }

    /**
     * 共享对象
     */
    static sharedObject(): any {
        return window.$sharedObject
    }

    static getDBIpc(): IDBInterface {
        return window.$db
    }

    static get cookies(): ICookie {
        return window.$cookie
    }

    static net(): INet {
        return window.$net
    }

    static get thumbnailOptRecord(): IThumbnailOptRecord {
        return window.$thumbnailOptRecord
    }
}
