import { Message, Notification, MessageBox } from 'element-ui'
import { debounce } from 'lodash'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import store from "@/store";
import {QtEventFilterType,QtEventFilter} from "@/utils/QtEventFilter"

function sendQtEventSwitch(enable) {

    // ipcRenderer.send('qt_switch_changed', { 'event': 'mouse', 'enable': enable })
    // //@ts-ignore
    // store.commit('config/sendKeyboardWithSecondDialog',!enable)
    let eventFilter = new QtEventFilter()
    //@ts-ignore
    eventFilter.process([QtEventFilterType.Mouse,QtEventFilterType.KeyBoard],enable)
}

export default {
    data() {
        return {
            defaultTitle: '系统提示',
            defaultType: 'success',
            lastNotification: null
        }
    },

    methods: {
        /**
         * 中间message信息
         * @param msg
         * @param type
         */
        tsMessage(msg, type = 'custom') {
            Message({
                offset: 68,
                type,
                message: msg,
                duration: 4 * 1000,
                customClass: type
            })
        },

        /**
         * 关闭通知提示
         */
        tsNotifyClose() {
            if (this.lastNotification) {
                this.lastNotification.close()
                this.lastNotification = null
            }
        },
        /**
         * 右上角侧通知提示
         * @param data
         */
        tsNotify: debounce(function (data = {}, config = { duration: 4000 }) {
            if (!data) return
            if (this.lastNotification) {
                this.lastNotification.close()
            }

            const duration = config.hasOwnProperty('duration') ? config.duration : 4000

            // this.lastNotification = Notification({
            //     title: data.title || this.defaultTitle,
            //     message: data.message || '',
            //     type: data.type || this.defaultType,
            //     duration: 2 * 1000
            // })
            let message = ''
            let title = ''
            if (typeof data === 'string') {
                message = data
                title = this.defaultTitle
            } else {
                message = data.message
                title = data.title || this.defaultTitle
            }

            this.lastNotification = Message({
                message,
                offset: 68,
                type: 'custom',
                duration,
                ...config,
                customClass: 'custom'
            })
        }, 300, {
            maxWait: 1500,
            leading: true
        }),

        /**
         * 二次确认提示
         * @param data
         * @returns {Promise<any>}
         */
        tsConfirm(data = {}) {
            const title = data.title || this.defaultTitle
            const message = data.message || ''

            const showTitle = data.hasOwnProperty('showTitle') ? data.showTitle : true
            const customTitleEl = data.hasOwnProperty('customTitleEl') ? data.customTitleEl : null
            const customMessageEl = data.hasOwnProperty('customMessageEl') ? data.customMessageEl : null
            const msgStyle = data.hasOwnProperty('customMessageStyle') ? data.customMessageStyle : ''

            const needHandleReject = data.needHandleReject

            const options = { ...data }

            delete options.title
            delete options.message

            const h = this.$createElement
            return new Promise((resolve, reject) => {
                let content = [
                    h('p', { style: `font-size: 14px; ${msgStyle}` }, message)
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
                    center: true,
                }).then(_ => {
                    sendQtEventSwitch(true)
                    resolve()
                }).catch((action) => {
                    sendQtEventSwitch(true)
                    if (typeof options.showCancelButton !== 'boolean'
                        || (typeof options.showCancelButton === 'boolean' && options.showCancelButton)
                        || needHandleReject) reject(action)
                })
            })
        },

        tsConfirmForUseHtml(data = {}) {
            const message = data.message || ''

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
    }
}
