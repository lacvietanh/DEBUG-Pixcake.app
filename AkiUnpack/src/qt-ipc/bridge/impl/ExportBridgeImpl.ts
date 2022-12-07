import store from '@/store'
// @ts-ignore
import ExportDirModel from '@/model/ExportDirModel'

let singleInstance: ExportBridgeImpl | null = null

export class ExportBridgeImpl {

    private payListener: any

    private deleteDirListener: any

    constructor() {
        this.payListener = null
        this.deleteDirListener = null
    }

    static instance() {
        if (!singleInstance) {
            singleInstance = new ExportBridgeImpl()
        }
        return singleInstance
    }

    addPayListener(payListener: any) {
        this.payListener = payListener
    }

    addDeleteListener(listener: any) {
        this.deleteDirListener = listener
    }

    register() {
        this.MUTATIONS_registerResetInitStatus()

        this.MUTATIONS_registerInitData()

        this.MUTATIONS_addExportDir()

        this.MUTATIONS_updateExportDir()

        this.MUTATIONS_updateDirErrorStatus()

        this.MUTATIONS_updateDirErrorInfo()

        this.MUTATIONS_checkTab()

        this.MUTATIONS_removeErrorItemInfo()

        this.MUTATIONS_removeDirErrorInfo()

        this.MUTATIONS_prePay_fail()

        this.MUTATIONS_prePay_success()

        this.MUTATIONS_updateExportProgress()

        this.MUTATIONS_updateCurrentDownloadDirId()

        this.MUTATIONS_updateExportDownloadProgress()

        this.MUTATIONS_deleteExportDir()

        this.MUTATIONS_hasDownloadActive()

        this.MUTATIONS_updateShareSelectDialog()

        this.MUTATIONS_updateExportShareProgress()

        this.MUTATIONS_addExportTipDir()

    }

    MUTATIONS_registerResetInitStatus() {
        const ipc = window.$export
        ipc['MUTATIONS_resetInitStatus'].connect((result: any) => {
            // console.log('mutations_resetInitStatus ', result)

            store.commit('resetInitStatus')

        })
    }

    MUTATIONS_registerInitData() {
        const ipc = window.$export
        ipc['MUTATIONS_initData'].connect((result: any) => {
            // console.log('mutations_initData ', result)


            if (result) {
                // @ts-ignore
                let list = []
                // @ts-ignore
                result.forEach(item => {
                    let dir = ExportDirModel.create(item)
                    list.push(dir)
                })
                // @ts-ignore
                store.commit('initData', list)
            } else {
                store.commit('initData', [])
            }
        })
    }

    MUTATIONS_addExportDir() {
        const ipc = window.$export
        ipc['MUTATIONS_addExportDir'].connect((item: any) => {
            let dir = ExportDirModel.create(item)
            store.commit('addExportDir', dir)
        })
    }

    MUTATIONS_updateExportDir() {
        const ipc = window.$export
        ipc['MUTATIONS_updateExportDir'].connect((item: any) => {
            store.commit('updateExportDir', item)
        })
    }

    MUTATIONS_updateCurrentDownloadDirId() {
        const ipc = window.$export
        ipc['MUTATIONS_updateCurrentDownloadDirId'].connect((result: any) => {
            store.commit('updateCurrentDownloadDirId', { rootId: result.rootId })
        })
    }


    MUTATIONS_prePay_fail() {
        const ipc = window.$export
        ipc['MUTATIONS_prePay_fail'].connect((result: any) => {
            if (this.payListener) {
                this.payListener.fail({ code: result.code, msg: result.msg })
                this.payListener = null
            }
        })
    }

    MUTATIONS_prePay_success() {
        const ipc = window.$export
        let _that = this
        ipc['MUTATIONS_prePay_success'].connect((result: any) => {
            let exportTimes = result ? result.exportTimes : 1
            if (_that.payListener) {
                _that.payListener.success({ exportTimes: exportTimes })
                _that.payListener = null
            }
        })
    }

    /**
     * 更新导出进度条状态
     * @constructor
     */
    MUTATIONS_updateExportProgress() {
        const ipc = window.$export
        ipc['MUTATIONS_updateExportProgress'].connect((result: any) => {
            // console.log('MUTATIONS_updateExportProgress', result.progress)
            store.commit('updateExportProgress', result.progress)
        })
    }

    /**
     * 更新下载任务的进度
     * @constructor
     */
    MUTATIONS_updateExportDownloadProgress() {
        const ipc = window.$export
        ipc['MUTATIONS_updateExportDownloadProgress'].connect((result: any) => {
            // console.log('MUTATIONS_updateExportDownloadProgress ', result)

            store.commit('updateExportDownloadProgress', {
                rootId: result.rootId,
                progress: result.progress,
                exportStatus: result.exportStatus
            })

        })
    }


    MUTATIONS_updateDirErrorStatus() {
        const ipc = window.$export
        ipc['MUTATIONS_updateDirErrorStatus'].connect((result: any) => {
            // console.log('MUTATIONS_updateDirErrorStatus ', result)

            store.commit('updateDirErrorStatus', { dirId: result.id, hasExportFail: result.hasExportFail })
        })
    }

    MUTATIONS_updateDirErrorInfo() {
        const ipc = window.$export
        ipc['MUTATIONS_updateDirErrorInfo'].connect((result: any) => {

            store.commit('updateDirErrorInfo', { dirId: result.dirId, exportErrorList: result.exportErrorList })
        })
    }

    MUTATIONS_checkTab() {
        const ipc = window.$export
        ipc['MUTATIONS_checkTab'].connect((result: any) => {
            store.commit('checkTab')
        })
    }

    MUTATIONS_deleteExportDir() {
        const ipc = window.$export
        ipc['MUTATIONS_deleteExportDir'].connect((result: any) => {
            store.commit('deleteExportDir', { rootId: result.rootId })
            if (this.deleteDirListener) {
                this.deleteDirListener.success()
            }
        })
    }

    MUTATIONS_removeErrorItemInfo() {
        const ipc = window.$export
        ipc['MUTATIONS_removeErrorItemInfo'].connect((result: any) => {
            store.commit('removeErrorItemInfo', result)
        })
    }

    MUTATIONS_removeDirErrorInfo() {
        const ipc = window.$export
        ipc['MUTATIONS_removeDirErrorInfo'].connect((result: any) => {
            store.commit('removeDirErrorInfo', result)
        })
    }

    MUTATIONS_hasDownloadActive() {
        const ipc = window.$export
        ipc['MUTATIONS_hasDownloadActive'].connect((result: any) => {
            store.commit('changeDownloadActive', result)
        })
    }

    MUTATIONS_updateShareSelectDialog() {
        const ipc = window.$export
        ipc['MUTATIONS_updateShareSelectDialog'].connect((result: any) => {

            store.commit('updateExportShareList', result)
            store.commit('updateShowShareSelectDialog', true)

        })
    }
    MUTATIONS_updateExportShareProgress() {
        const ipc = window.$export
        ipc['MUTATIONS_updateExportShareProgress'].connect((result: any) => {
            store.commit('updateExportShareProgress', result)
        })
    }

    MUTATIONS_addExportTipDir() {
        const ipc = window.$export
        ipc['MUTATIONS_addExportTipDir'].connect((result: any) => {
            store.commit('addExportTipDir', result)
        })
    }

    async openPictureByPs(param:any){
        const ipc = window.$export
        let ret = await ipc.openPictureByPs(param);
        return ret
    }

    async openPhotoShopDialog(){
        const ipc = window.$export
        let ret = await ipc.openPhotoShopDialog()
        return ret
    }

    async setPhotoShopPath(filePath:string){
        const ipc = window.$export
        await ipc.setPhotoShopPath(filePath)
    }
}
