import ipcBroadcast from '@/qt-ipc/qt-broadcast'
import { kBroadCastWinEventString, WinIPCMessage, WinType } from '@/constants/winIpc-def'
import { CLIENT_NAME_EN, CLIENT_NAME } from '@/universal/types/config'
import {ShareObjectModel} from "@/universal/model/ShareObjectModel/ShareObjectModel";
import {IpcBase} from "@/qt-ipc/base/IpcBase";

let gInstance: IpcRenderGtag|null = null
export default class IpcRenderGtag extends IpcBase<any>{
    constructor() {
        super();
    }
    static getInstance(){
        gInstance = gInstance ? gInstance : new IpcRenderGtag()
        return gInstance
    }
    register(ipcHandler: any) {
        super.register(ipcHandler);
    }

    formatData(params: any): any {
        return {
        }
    }

    send(params = {}): Promise<void> {
        return  this.ipcHandler?.send(params)
    }

    /**
     * 登入
     * @param uid
     */
    login(uid: string, merchant_id: string): Promise<void> {
        return this.ipcHandler?.login(uid,merchant_id)
    }

    /**
     * 登出
     */
    logout(): Promise<void> {
        return this.ipcHandler?.logout()
    }

    /**
     * 通用事件
     * @param event_id
     * @param args
     * @param event
     */
    event(event_id: string, args = {}, event = {}): Promise<void>  {
        return this.ipcHandler?.event(event_id,args,event)
    }

    /**
     * 页面跳转事件
     * @param path
     * @param args
     */
    pageview(path: string, args: any = {}): Promise<void>  {
        return this.ipcHandler?.pageview(path,args)
    }
}
