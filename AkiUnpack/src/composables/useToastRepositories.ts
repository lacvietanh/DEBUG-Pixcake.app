import { ref, Ref, VNode, getCurrentInstance, CreateElement } from 'vue'
import { QtEventFilterType, QtEventFilter } from '@/utils/QtEventFilter'
import { Message, MessageBox } from 'element-ui'
import { ElMessageComponent } from 'element-ui/types/message'
import { debounce } from 'lodash'
import { IObject } from '@/types'
import { ElMessageBoxOptions } from 'element-ui/types/message-box'

function sendQtEventSwitch(enable: boolean) {
    let eventFilter = new QtEventFilter()
    eventFilter.process([QtEventFilterType.Mouse, QtEventFilterType.KeyBoard], enable)
}

interface IRepositories {
    tsMessage: (message: string, type: string) => void
    tsNotifyClose: () => void
    tsNotify: (data: string | IObject, config?: IObject) => void
    tsConfirm: (data: TsMessageBoxOptions) => Promise<void>
    // tsConfirmForUseHtml: (data: IObject) => void
}

interface TsMessageBoxOptions extends ElMessageBoxOptions {
    showTitle?: boolean
    customTitleEl?: VNode | null
    customMessageEl?: VNode | null
    customMessageStyle?: string
    needHandleReject?: boolean
}

interface IRepositories {
    tsMessage: (message: string, type: string) => void
    tsNotifyClose: () => void
    tsNotify: (data: string | IObject, config?: IObject) => void
    tsConfirm: (data: TsMessageBoxOptions) => Promise<void>
    tsConfirmForUseHtml: (data: TsMessageBoxOptions) => Promise<void>
}

export default function useToastRepositories(): IRepositories {
    const h = getCurrentInstance()?.proxy.$createElement as CreateElement
    const defaultTitle = ref('系统提示')
    const defaultType = ref('success')
    const lastNotification: Ref<ElMessageComponent | null> = ref(null)

    const tsMessage = (msg: string, type = 'custom') => {
        // @ts-ignore
        Message({
            type: type || defaultType.value,
            offset: 68,
            message: msg,
            duration: 4 * 1000,
            customClass: type
        })
    }

    /**
     * 关闭通知提示
     */
    const tsNotifyClose = () => {
        if (lastNotification.value) {
            lastNotification.value.close()
            lastNotification.value = null
        }
    }

    // 通知
    const tsNotify = debounce(function (data: string | IObject = {}, config: IObject = { duration: 4000 }) {
        if (!data) return
        tsNotifyClose()

        let option = {
            message: typeof data === 'string' ? data : data.message,
            offset: 68,
            type: 'custom',
            duration: 4000,
            customClass: 'custom',
            ...config
        }
        // @ts-ignore
        lastNotification.value = Message(option)
    }, 300, {
        maxWait: 1500,
        leading: true
    })

    const tsConfirm = (data: TsMessageBoxOptions = {}): Promise<void> => {
        const title = data.title || defaultTitle.value
        const message: string = (data.message || '') as string

        const showTitle = data.hasOwnProperty('showTitle') ? data.showTitle : true
        const customTitleEl = data.hasOwnProperty('customTitleEl') ? data.customTitleEl : null
        const customMessageEl = data.hasOwnProperty('customMessageEl') ? data.customMessageEl : null
        const msgStyle = data.hasOwnProperty('customMessageStyle') ? data.customMessageStyle : ''

        const needHandleReject = data.needHandleReject

        const options = { ...data }

        delete options.title
        delete options.message

        return new Promise((resolve, reject) => {
            let content = [
                h('p', { style: `font-size: 14px; ${ msgStyle }` }, message)
            ]

            if (customMessageEl) {
                content = [customMessageEl]
            }

            if (showTitle && customTitleEl == null) {
                content.unshift(h('p', { style: 'font-size: 16px;font-weight: 500; margin: 12px 0 16px' }, title))
            }

            if (showTitle && customTitleEl) {
                content.unshift(customTitleEl)
            }

            sendQtEventSwitch(false)
            MessageBox.confirm(message, '', {
                ...options,
                confirmButtonText: options.confirmButtonText || '确认',
                cancelButtonText: options.cancelButtonText || '取消',
                customClass: 'customConfirmClass',

                message: h('div', {
                    class: 'customConfirmClass-content',
                    style: 'line-height: 24px; font-weight: 400;'
                }, content),
                iconClass: '',
                center: true
            }).then(_ => {
                sendQtEventSwitch(true)
                resolve()
            }).catch((action) => {
                sendQtEventSwitch(true)

                if (typeof options.showCancelButton !== 'boolean'
                    || options.showCancelButton
                    || needHandleReject) {
                    reject(action)
                }
            })
        })
    }

    const tsConfirmForUseHtml = (data: TsMessageBoxOptions = {}): Promise<void> => {
        const message = (data.message || '') as string

        const showCancelButton = data.hasOwnProperty('showCancelButton') ? data.showCancelButton : true

        return new Promise((resolve, reject) => {
            sendQtEventSwitch(false)
            MessageBox.confirm(message, '', {
                confirmButtonText: data.confirmButtonText || '确认',
                cancelButtonText: data.cancelButtonText || '取消',
                customClass: 'customConfirmClass',
                dangerouslyUseHTMLString: true,
                showCancelButton: showCancelButton,
                iconClass: '',
                center: true
            }).then(_ => {
                sendQtEventSwitch(true)
                resolve()
            }).catch(() => {
                sendQtEventSwitch(true)
                if (showCancelButton) reject()
            })
        })
    }

    return {
        tsMessage,
        tsNotify,
        tsNotifyClose,

        tsConfirm,
        tsConfirmForUseHtml
    }
}
