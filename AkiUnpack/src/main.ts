import Vue from 'vue'
import Router, { RawLocation } from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import i18n, { getLocale } from '@/lang' // Internationalization
import ElementLocale from 'element-ui/lib/locale'

import Element from '@/plugins/element'
import VuePrototype from '@/plugins/vue-prototype'
import BlurDirective from '@/plugins/blur-directive'
import GtagDirective from '@/plugins/gtag-directive'
import QtBridge from '@/qt-ipc/bridge'
import { setInstallCallback } from '@/qt-ipc/bridge'

// @ts-ignore
import TsGtag from '@/utils/TsStat/tsStat'

import '@/icons'
import '@/assets/theme/common/reset.scss'
import '@/assets/theme/common/style.scss'
import '@/assets/theme/dark/style.scss'
import { setTheme } from '@/assets/theme/set-theme'
import GlobalMixin from '@/mixins/globalMixin'

import '@/utils/NativeUtils'
import presetSuitRpc from '@/qt-ipc/presetSuitRpc'
import '@/plugins/apiHook'

//@ts-ignore
import toast from '@/mixins/toast'
import {
    dialogIpc,
    FConfirmDialogKey,
    REPAIR_DB_KEY,
    ShowToast_key,
    VIP_PURCHASE_SUCCESS,
    SHOW_EXPORT_DISK_ERR_CONFIRM
} from '@/qt-ipc/dialog/DialogIpcImpl'
//@ts-ignore
import aboutMixin from '@/mixins/about/about-mixin'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import refine, { RefineListenerEvent } from '@/qt-ipc/business/refine'
import NodeApi from '@/qt-ipc/node-api'
import LocalConfigModel from "@/universal/model/LocalConfigModel";
import {InstallResponseInterceptor} from "@/plugins/apiHook";
import {app} from "@/qt-ipc/app";

const ret = presetSuitRpc.presetSuit

ElementLocale.i18n((key: string, value: any) => i18n.t(key, value))
Vue.use(VueMoment, { moment })
Vue.use(Element)
Vue.use(VuePrototype)
Vue.use(BlurDirective)
Vue.use(GtagDirective)

setTheme('dark')

Vue.config.productionTip = false
const gtag = TsGtag.getInstance()
Vue.prototype.$tsStat = gtag

const originalPush = Router.prototype.push
Router.prototype.push = function push(location: RawLocation) {
    // @ts-ignore
    return originalPush.call(this, location).catch(err => err)
}
//@ts-ignore
let isWin32 = `${ process.platform }` === 'win32'

let hasShowDBRepair = false


const delayTime = isWin32 ? 200 : 0

// TODO: 防止息屏(任务中断)
//const id = remote.powerSaveBlocker.start("prevent-display-sleep");

setInstallCallback(() => {
    setTimeout(async () => {
        //获得系统的版本
        await app.init()
        await LocalConfigModel.getInstance().readJsonFromLocal()
        InstallResponseInterceptor()
        new Vue({
            i18n,
            router,
            store,
            mixins: [GlobalMixin, toast, aboutMixin],
            beforeCreate: async function () {
                const language = await getLocale()
                i18n.locale = language
                moment.locale(language)
            },
            mounted() {
                console.log('vue mounted: ', new Date())
                ipcRenderer.on('qt_on_loginOut', () => {
                    store.dispatch('ExitLogin')
                    store.commit('clearExportTask')
                    this.$router.replace({ name: 'Login' })
                    this.$tsStat.logout()
                })

                dialogIpc.addListener(ShowToast_key, (param: any) => {
                    //@ts-ignore
                    this.tsNotify(param)
                })

                dialogIpc.addListener(FConfirmDialogKey(REPAIR_DB_KEY), (param: any) => {

                    if (hasShowDBRepair) {
                        return
                    }
                    hasShowDBRepair = true
                    let data = {
                        message: '检查您的数据库已损坏，为了不影响您的正常使用，将为您关闭应用并进行清除数据库便于继续正常使用.【备注】清理数据库后，您之前的数据将会丢失,如自动修复后还是出现该问题，请点击手动修复，会打开文件夹，手动删除文件夹中 *.db为后缀相关的文件',
                        confirmButtonText: '自动修复',
                        cancelButtonText: '手动修复'
                    }
                    // @ts-ignore
                    this.tsConfirmForUseHtml(data).then(async _ => {
                        hasShowDBRepair = false
                        await dialogIpc.replyDialogConfirm(true)
                    }).catch(async () => {
                        hasShowDBRepair = false
                        await dialogIpc.replyDialogConfirm(false)
                    })
                })


                //开启会员弹窗充值成功监听
                dialogIpc.addListener(VIP_PURCHASE_SUCCESS, (param: any) => {
                    store.commit('_SetShowPaySuccess', true)//充值成功弹窗
                    store.dispatch('asyncOnPaySuccess') //导出列表应张数不足，继续导出
                    store.dispatch('loadVipInfo') //会员张数信息更新
                })

                //导出磁盘空间不足弹窗提示
                dialogIpc.addListener(SHOW_EXPORT_DISK_ERR_CONFIRM, (param: any) => {
                    let disk = ''
                    if (param.diskTypeStr) {
                        disk = ' ' + param.diskTypeStr + ' '
                    }
                    let title = `因导出路径磁盘空间${ disk }不足无法导出，建议您更改磁盘路径或清理磁盘空间后再导出`
                    this.tsConfirm({
                        title: title,
                        confirmButtonText: '好的',
                        showCancelButton: false,
                        distinguishCancelAndClose: true,
                        needHandleReject: true //返回action
                    }).then(() => {
                        //通知qt isRefreshExportDiskErrConfirm更新状态
                        store.dispatch('updateIsRefreshExportDiskErrConfirm')
                    }).catch((action) => {
                        if (action === 'close') {
                            store.dispatch('updateIsRefreshExportDiskErrConfirm')
                        }
                    })
                })

            },
            render: h => h(App)
        }).$mount('#app')
    }, delayTime)
})

Vue.use(QtBridge)
