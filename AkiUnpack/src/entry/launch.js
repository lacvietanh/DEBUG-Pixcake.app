import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import App from '@/App.vue'

import '@/assets/theme/common/reset.scss'
import '@/assets/theme/common/style.scss'
import '@/assets/theme/dark/style.scss'
import { setTheme } from '@/assets/theme/set-theme'
// 引入样式
import Element from '@/plugins/element'
import '@/icons'

import i18n, { getLocale } from '@/lang' // Internationalization
import { IS_CLIENT_PIX_PIE } from '#/types/config'
import getIconPath from '@/icons/theme'

setTheme('dark')


Vue.use(Router)
Vue.use(Element)

Vue.config.productionTip = false

Vue.config.errorHandler = function (err, vm, info) {
    console.error(err)
    // Sentry.captureMessage(err.toString())
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
            name: 'launch',
            component: () => {
                // if (IS_CLIENT_PIX_PIE) {
                //     return import('@/views/MemberPlan/PixpieMemberVip.vue')
                // }
                return import('@/views/launch/LaunchView.vue')
            },
            meta: {
                title: 'launch'
            }
        }
    ]
})

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

