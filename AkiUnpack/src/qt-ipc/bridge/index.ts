import { IChannel, IDragFile } from '@/types/bridge'
import QtBroadcast from '@/qt-ipc/qt-broadcast'
import NodeApi, { NodeChannelEvent } from '@/qt-ipc/node-api'
import DBIpcRender from '@/irender/DBIpcRender'
import presetSuitRpc from '@/qt-ipc/presetSuitRpc'
import { ExportBridgeImpl } from '@/qt-ipc/bridge/impl/ExportBridgeImpl'
import { dialogIpc } from '@/qt-ipc/dialog/DialogIpcImpl'
import { gallery } from '@/qt-ipc/gallery'
import refine from '@/qt-ipc/business/refine'
import importImageRpc from '@/qt-ipc/business/import-image'
import importIdPhotoMaterialRpc from '@/qt-ipc/business/import-idphoto-material'

//@ts-ignore
import  tsStat from '@/utils/TsStat/tsStat'
import {MemoryMonitor} from "@/utils/monitor/memoryMonitor";

const QWebChannel = require('./qwebchannel.js').QWebChannel

export const isQtClient = (function () {
    return navigator.userAgent.includes('QtWebEngine')
})()

window.$dragFiles = []
window.$setDragFiles = (fileArray: IDragFile[]) => {
    try {
        window.$dragFiles = fileArray
        console.log(`$setDragFiles-fileArray `, fileArray)
    } catch (e) {
        console.log(`$setDragFiles error!!!`, e)
    }
}

if (process.env.VUE_APP_ENV !== 'pro') {
    //@ts-ignore
    window.$printGlobalObject = async () => {
        window.$sharedObject.getUser().then((user: any) => {
            console.log(`$printGlobalObject.user`, user)
        })
        window.$sharedObject.cloudConfig().then((cloudConfig: any) => {
            console.log(`$printGlobalObject.cloudConfig`, cloudConfig)
        })
        window.$sharedObject.systemInfo().then((systemInfo: any) => {
            console.log(`$printGlobalObject.systemInfo`, systemInfo)
        })
    }
    //@ts-ignore
    window.$printTraceMemoryObjects = ()=>{
        MemoryMonitor.shareInstance().print()
    }
    //@ts-ignore
    window.$printTraceAllRenderers = async ()=>{
        let obj = await window.$renderer.invoke('on-show-all-rendererInfo',{})
        console.log(`获得主要的渲染进程信息:`,obj)
    }
}

let installCallback: any = null

export function setInstallCallback(callback: any) {
    installCallback = callback
}

interface IConfig {
    registers?: string[]
    onMounted?: () => void
}

export enum RegisterEvent {
    TsGtag = 'tsStat',
    MainWindow = 'mainWindow',
    NodeChannelEvent = 'NodeChannelEvent'
}

export default function install(data: any, config?: IConfig): void {
    if (isQtClient && window.qt) {

        new QWebChannel(window.qt.webChannelTransport, function (channel: IChannel) {
            console.log('bridge install: ', new Date())

            const context = channel.objects
            console.log('QWebChannel context: ', context)
            window.$pixcook = context['pixcook.engine']
            window.$nativeImage = context['node.nativeImage']
            window.$fs = context['node.fs']
            window.$path = context['node.path']
            window.$app = context['node.app']
            window.$shell = context['node.shell']
            window.$net = context['node.net']
            window.$broadcast = context.broadcast
            window.$sharedObject = context.sharedObject
            window.$renderer = context.renderer
            window.$db = context.db
            window.$imageIOManager = context.imageIoManager
            window.$presetSuit = context.presetSuit
            window.$gallery = context.gallery
            window.$refine = context.refine
            window.$export = context.export
            window.$cookie = context.cookie
            window.$dialog = context.dialog
            window.$importImage = context.importImage
            window.$thumbnailOptRecord = context.thumbnailOptRecord

            const registers = config?.registers
                ? config?.registers
                : [RegisterEvent.TsGtag, RegisterEvent.MainWindow, RegisterEvent.NodeChannelEvent]

            if (!registers || registers.includes(RegisterEvent.TsGtag)) {
                // @ts-ignore
                tsStat.getInstance().register(context["gaRpc"])
            }

            if (!registers || registers.includes(RegisterEvent.NodeChannelEvent)) {
                NodeApi.dispatchChannelEvents(NodeChannelEvent.init)
                // window.$broadcast 实例化后 注册事件广播
                QtBroadcast.getInstance().registerHandler()
                dialogIpc.registerDialogIpc()
            }

            if (!registers || registers.includes(RegisterEvent.MainWindow)) {
                DBIpcRender.registerDBListener()
                gallery.registerListener()
                refine.registerListener()
                //注册导入
                importImageRpc.registerRpcListener()
                presetSuitRpc.registerListener()
                ExportBridgeImpl.instance().register()
                importIdPhotoMaterialRpc.register(context['importIdPhotoBgRpc'])
            }


            config?.onMounted && config.onMounted()

            if (installCallback) {
                installCallback()
            }
        })
    }
}
