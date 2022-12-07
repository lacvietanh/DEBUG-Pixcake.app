import { IImportImage } from '../types/Import-image'

class ImportImage implements IImportImage {
    signalCloseProgressDialog: { connect: () => void } | null = null
    signalImportFinished: { connect: (addCounts: number) => void } | null = null
    signalImportProgress: { connect: (progress: number, over: number, total: number) => void } | null = null
    signalRemoveStoreProject: { connect: (nProjectId: number) => void } | null = null
    signalUpdateProject: { connect: (albumbPaths: any, importTimes: number, thumbnailNumber: number,isAppend:boolean) => void } | null = null
    signalImportRootName: { connect: (rootName:string) => void } | null = null

    // @ts-ignore
    private mListenerMap: Map<String, any> = new Map<String, any>()

    get nativeInstance(): IImportImage {
        return window.$importImage
    }

    registerRpcListener() {
        this.signalCloseProgressDialog = this.nativeInstance.signalCloseProgressDialog
        this.signalImportFinished = this.nativeInstance.signalImportFinished
        this.signalImportProgress = this.nativeInstance.signalImportProgress
        this.signalRemoveStoreProject = this.nativeInstance.signalRemoveStoreProject
        this.signalUpdateProject = this.nativeInstance.signalUpdateProject
        this.signalImportRootName = this.nativeInstance.signalImportRootName
        //@ts-ignore
        this.signalCloseProgressDialog?.connect(() => {
            if (this.mListenerMap.get(SignalCloseProgressDialogKey)) {
                this.mListenerMap.get(SignalCloseProgressDialogKey)()
            }
        })

        //@ts-ignore
        this.signalImportFinished?.connect((addCounts: number) => {
            if (this.mListenerMap.get(SignalImportFinishedKey)) {
                this.mListenerMap.get(SignalImportFinishedKey)(addCounts)
            }
        })

        //@ts-ignore
        this.signalImportProgress?.connect((progress: number, over: number, total: number) => {
            if (this.mListenerMap.get(SignalImportProgressKey)) {
                this.mListenerMap.get(SignalImportProgressKey)(progress, over, total)
            }
        })

        //@ts-ignore
        this.signalRemoveStoreProject?.connect((nProjectId: number) => {
            if (this.mListenerMap.get(SignalRemoveStoreProjectKey)) {
                this.mListenerMap.get(SignalRemoveStoreProjectKey)(nProjectId)
            }
        })

        //@ts-ignore
        this.signalImportRootName?.connect((rootName: number) => {
            if (this.mListenerMap.get(SignalRootNameKey)) {
                this.mListenerMap.get(SignalRootNameKey)(rootName)
            }
        })

        //@ts-ignore
        this.signalUpdateProject?.connect((albumbPaths: any, importTimes: number, thumbnailNumber: number,isAppend:boolean) => {
            if (this.mListenerMap.get(SignalUpdateProjectKey)) {
                this.mListenerMap.get(SignalUpdateProjectKey)(albumbPaths, importTimes, thumbnailNumber,isAppend)
            }
        })
    }

    addListener(signalKey: string, callBack: any) {
        this.mListenerMap.set(signalKey, callBack)
    }

    removeListener(signalKey: string) {
        this.mListenerMap.delete(signalKey)
    }

    checkAndImportImages(project: any, dropPaths: any, isAppend: boolean, needDeleteImportProject: boolean): Promise<void> {
        return this.nativeInstance.checkAndImportImages(project, dropPaths, isAppend, needDeleteImportProject)
    }

    getImportRootName(): Promise<string> {
        return this.nativeInstance.getImportRootName()
    }

    importImagesOnHome(isAppend: boolean, project: any, dropPaths: any, needDeleteImportProject: boolean): Promise<void> {
        return this.nativeInstance.importImagesOnHome(isAppend, project, dropPaths, needDeleteImportProject)
    }

    onUpdateProjectResult(isSucceed: boolean): Promise<void> {
        return this.nativeInstance.onUpdateProjectResult(isSucceed)
    }

    setCancelImportState(isCancel: boolean): Promise<void> {
        return this.nativeInstance.setCancelImportState(isCancel)
    }

    reset() {
        this.mListenerMap.clear()
    }

    handleAfterMenuManualImport() {
        return this.nativeInstance.handleAfterMenuManualImport()
    }
}

let importImageRpc = new ImportImage()
export const SignalCloseProgressDialogKey = 'signalCloseProgressDialog'
export const SignalImportFinishedKey = 'signalImportFinished'
export const SignalImportProgressKey = 'signalImportProgress'
export const SignalRemoveStoreProjectKey = 'signalRemoveStoreProject'
export const SignalUpdateProjectKey = 'signalUpdateProject'
export const SignalRootNameKey = 'signalImportRootName'

export default importImageRpc
