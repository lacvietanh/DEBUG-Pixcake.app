import { Optional } from '@/universal/types/foundation'
import NodeApi from '@/qt-ipc/node-api'
import { IUserModel } from '@/universal/model/UserModel'

interface ISystemInfo {
    platform: string,
    arch: string,
    os_version: string,
    prod_version: string,
    mac_addr: string,
    totalmem: number,
    freemem: number,
    cpu: string,
    cpu_num: number,
    gpu: string,
    gpu_vendor: string,
    gpu_renderer: string,
    setup_file_name: string
}

export class ShareObjectModel {
    private static shareObj: Optional<ShareObjectModel> = null

    static instance(): ShareObjectModel {
        if (!this.shareObj) {
            this.shareObj = new ShareObjectModel()
        }
        return this.shareObj!
    }

    get shareObjectBridge(): any {
        return NodeApi.sharedObject()
    }

    //返回ISystemInfo ,是异步函数
    get systemInfo() {
        return this.shareObjectBridge.systemInfo()
    }

    //返回string
    async getSystemUUID() {
        return this.shareObjectBridge.getSystemUUID()
    }

    async getUser() {// 返回一个UserModel的json
        let user = await this.shareObjectBridge.getUser()
        user.tel = user.userInfo.phone
        user.token = user.token
        user.userId = user.userInfo.id
        user.oid = user.userInfo.org_id
        return user
    }

    /*
    user:IUserModel
     */
    async setUser(user: any) {
        await this.shareObjectBridge.setUser(user)
    }
    async setShowCompleteInfoAndUpdateDB(user: any) {
        await this.shareObjectBridge.setShowCompleteInfoAndUpdateDB(user)
    }

    async setCurrentProjectId(projectId: number) {
        await this.shareObjectBridge.setCurrentProjectId(projectId)
    }

    async setPlainToken(token: string) {
        await this.shareObjectBridge.setPlainToken(token)
    }

    async setLoginUserInfo() {
        await this.shareObjectBridge.setLoginUserInfo()
    }

    //@ts-ignore
    async getPlainToken(): Promise<string> {
        const token = await this.shareObjectBridge.getPlainToken()
        return token
    }

    /*
      {x,y,width,height}
     */

    //@ts-ignore
    async setGiftMenuButtonRect(rect: any) {
        await this.shareObjectBridge.setGiftMenuButtonRect(rect)
    }


    async setDefaultExportTaskNumber(value: number) {
        await this.shareObjectBridge.setDefaultExportTaskNumber(value)
    }

    async setMaxExportTaskNumber(value: number) {
        await this.shareObjectBridge.setMaxExportTaskNumber(value)
    }

    async getCpuNumber(): Promise<number> {
        return await this.shareObjectBridge.getCpuNumber()
    }

    async setGtaUserProperties(properties:any){
        return await this.shareObjectBridge.setGtaUserProperties(properties)
    }

    async setCanDebugEffect(val: boolean) {
        await this.shareObjectBridge.setCanDebugEffect(val)
    }

    async setCanDebugExportEffect(val: boolean) {
        await this.shareObjectBridge.setCanDebugExportEffect(val)
    }

    async setIsEnableSaveRawResult(val: boolean) {
        await this.shareObjectBridge.setIsEnableSaveRawResult(val)
    }

    async setIsEnableFacePoint(val: boolean) {
        await this.shareObjectBridge.setIsEnableFacePoint(val)
    }

    async setIsEnableSkeletonPoint(val: boolean) {
        await this.shareObjectBridge.setIsEnableSkeletonPoint(val)
    }

    async setRemoveResolutionLimit(val: boolean) {
        await this.shareObjectBridge.setRemoveResolutionLimit(val)
    }

    async setIsEnableCheckFaceIsBlack(val: boolean) {
        await this.shareObjectBridge.setIsEnableCheckFaceIsBlack(val)
    }

    async setPreviewCacheStatus(val: boolean) {
        await this.shareObjectBridge.setPreviewCacheStatus(val)
    }

    async localConfig(){
        return await this.shareObjectBridge.localConfig()
    }
    
    async setCanPrintExportLog(val: boolean) {
        await this.shareObjectBridge.setCanPrintExportLog(val)
    }

    async openDevTool() {
        await this.shareObjectBridge.openDevTool()
    }


    async updateOnlineConfig(json: any): Promise<boolean> {
        return await this.shareObjectBridge.updateOnlineConfig(json)
    }
}
