import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App.vue'

import '@/assets/theme/common/reset.scss'
import '@/assets/theme/common/style.scss'
import '@/assets/theme/dark/style.scss'
import { setTheme } from '@/assets/theme/set-theme'
// 引入样式
import Element from '@/plugins/element'
import '@/icons'

import getIconPath from '@/icons/theme'
import i18n, { getLocale } from '@/lang'
import store from '@/store'

setTheme('dark')

Vue.use(Router)
Vue.use(Element)

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
    console.error(err)
}

Vue.prototype.$getIconPath = getIconPath

const router = new Router({
    linkExactActiveClass: 'link-active',
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    },
    routes: [
        {
            path: '/',
            name: 'updateWindow',
            component: () => {
                return import('@/views/UpdateAPP/UpdateDialog')
            },
            meta: {
                title: '提示下载更新'
            }
        },
        {
            path: '/updateProgress',
            name: 'updateProgress',
            component: () => import('@/views/UpdateAPP/UpdateProgress'),
            meta: {
                title: '下载更新包进度'
            }
        }
    ]
})
//
new Vue({
    i18n,
    store,
    router,
    beforeCreate: async function () {
        const language = await getLocale()
        i18n.locale = language
    },
    render: h => h(App)
}).$mount('#app')

