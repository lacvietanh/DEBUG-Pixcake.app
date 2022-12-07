import { IDialog } from '@/qt-ipc/types/IDialog'

// @ts-ignore
export class DialogIpcImpl implements IDialog {

    showFeedbackDialog: any

    signalShowConfirmDialog: { connect: (dialogIdentify: string, params: any) => void } | null = null
    signalShowToast: { connect: (msg: any) => void } | null = null


    // @ts-ignore
    private mListenerMap: Map<String, any> = new Map<String, any>()

    lastConfirmDialogIdentify: string = ''

    registerDialogIpc() {
        const dialogIpc = window.$dialog
        const _that = this
        this.signalShowConfirmDialog = dialogIpc['signalShowConfirmDialog']
        this.signalShowToast = dialogIpc['signalShowToast']
        const signalShowFeedbackDialog = dialogIpc['signalShowFeedbackDialog']
        const signalShowFundLackDialog = dialogIpc['signalShowFundLackDialog']

        signalShowFeedbackDialog && signalShowFeedbackDialog.connect((result: any) => {
            if (_that.mListenerMap.has(FeedBack_key)) {
                let listener = _that.mListenerMap.get(FeedBack_key)
                listener(result.data)
            }
        })

        signalShowFundLackDialog && signalShowFundLackDialog.connect(() => {
            if (_that.mListenerMap.has(FUNK_LACK_KEY)) {
                let listener = _that.mListenerMap.get(FUNK_LACK_KEY)
                listener()
            }
        })

        //@ts-ignore
        this.signalShowConfirmDialog.connect((dialogIdentify: string, param: any) => {
            this.lastConfirmDialogIdentify = dialogIdentify
            if (_that.mListenerMap.has(dialogIdentify)) {
                let listener = _that.mListenerMap.get(dialogIdentify)
                listener(param)
            }
        })

        this.signalShowToast?.connect((msg: any) => {
            if (_that.mListenerMap.has(ShowToast_key)) {
                let listener = _that.mListenerMap.get(ShowToast_key)
                listener(msg)
            }
        })

    }

    async replyDialogConfirm(isConfirm: boolean) {
        await this.onDialogConfirm(this.lastConfirmDialogIdentify, isConfirm)
    }


    private async onDialogConfirm(dialogIdentify: string, isConfirm: boolean): Promise<void> {
        const dialogIpc = window.$dialog
        await dialogIpc.onDialogConfirm(dialogIdentify, isConfirm)
    }

    showOpenDialog(filters: any): Promise<any> {
        const dialogIpc = window.$dialog
        return dialogIpc.showOpenDialog(filters)
    }

    showOpenDirDialog(): Promise<any> {
        const dialogIpc = window.$dialog
        return dialogIpc.showOpenDirDialog()
    }


    addListener(dialogKey: string, listener: any) {
        this.mListenerMap.set(dialogKey, listener)
    }

    removeListener(dialogKey: string) {
        this.mListenerMap.delete(dialogKey)
    }
}

function FConfirmDialogKey(key: string) {
    if (!key || key.length == 0) {
        throw Error('FConfirmDialogKey\'s key not empty!!!')
    }
    return `showConfirm-${ key }`
}

export const FeedBack_key = 'showFeedbackDialog'
export const ShowToast_key = 'showToast'
export const FUNK_LACK_KEY = 'FUNK_LACK_KEY'
export const REPAIR_DB_KEY = "REPAIR_DB_KEY"
export const VIP_PURCHASE_SUCCESS = 'VIP_PURCHASE_SUCCESS' //会员充值成功
export const SHOW_EXPORT_DISK_ERR_CONFIRM = 'SHOW_EXPORT_DISK_ERR_CONFIRM'
export const SHOW_PRESET_SETTING = 'SHOW_PRESET_SETTING'

export { FConfirmDialogKey }

export const dialogIpc = new DialogIpcImpl()
export default {
    dialogIpc

}
