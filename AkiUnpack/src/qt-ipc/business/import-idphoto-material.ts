/*
    待添加具体的业务处理api
 */

import {
    IImportIdPhotoMaterial,
    IStatus
} from '@/qt-ipc/types/IImportIdPhotoMaterial';
import { IpcBaseEasy} from "@/qt-ipc/base/IpcBase";

export enum IImportIdPhotoMaterialSignalKey {
    importProgress = "signalImportProgress"
}

export class ImportIdPhotoMaterial extends IpcBaseEasy<IImportIdPhotoMaterial>{
    register(ipcHandler: any) {
        super.register(ipcHandler);
        this.listenEvent()
    }

    listenEvent(){
        // @ts-ignore
        this.ipcHandler!.signalImportProgress?.connect((progress:IStatus)=>{
            this.applyMessageReceived(IImportIdPhotoMaterialSignalKey.importProgress,progress)
        })
    }

    openAndImportIdPhotosMaterial():Promise<void>{
       return  this.ipcHandler!.openAndImportIdPhotosMaterial()
    }

    deleteItems(items: string[]):Promise<boolean>{
        return  this.ipcHandler!.deleteItems(items)
    }

    cancel():Promise<void>{
        return  this.ipcHandler!.cancel()
    }

    presetHasOfflineMineIdPhoto(strBeautifyIds:[]):Promise<boolean>{
        const fmtBeautifyId = strBeautifyIds.join(";")
        return this.ipcHandler!.presetHasOfflineMineIdPhoto(fmtBeautifyId)
    }

}

const instance = new ImportIdPhotoMaterial()
export default instance