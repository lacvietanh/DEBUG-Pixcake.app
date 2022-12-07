import getIconPath from '@/icons/theme'
import ipcRenderer from "@/qt-ipc/Ipc-renderer";
import {IS_CLIENT_PIX_PIE, IS_CLIENT_PixCake_EXPO} from '@/universal/types/config'


export default {
    install: (Vue: any): void => {
        const platform = (process as { platform: string }).platform
        Vue.prototype.$platform = platform
        Vue.prototype.$isMac = platform === 'darwin'
        // @ts-ignore
        Vue.prototype.$isWin = platform === 'win32'

        Vue.prototype.$isDev = process.env.VUE_APP_ENV === 'dev'
        Vue.prototype.$isBeta = process.env.VUE_APP_ENV === 'beta'
        Vue.prototype.$isPro = process.env.VUE_APP_ENV === 'pro'

        Vue.prototype.$getIconPath = getIconPath
        Vue.prototype.$openExternal = (url: string) => {
            console.log(url)
            //驱动调用外部浏览器
            ipcRenderer.send('open-external-link', {
                href: url
            })
        }
        Vue.prototype.$appQuit = () => {
        }
        Vue.prototype.$appRestart = () => {
        }
        Vue.prototype.$IS_CLIENT_PIX_PIE = IS_CLIENT_PIX_PIE
        Vue.prototype.$IS_CLIENT_PixCake_EXPO = IS_CLIENT_PixCake_EXPO

        Vue.config.errorHandler = function (err: any) {
            console.error(err)
            // 关闭js的异常上报
            // Sentry.captureMessage(err.toString())
        }
    }
}
