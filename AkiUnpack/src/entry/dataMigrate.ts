import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import App from '@/App.vue'

import i18n, { getLocale } from '@/lang' // Internationalization
import '@/icons'

// 引入样式
import '@/assets/theme/common/reset.scss'
import '@/assets/theme/common/style.scss'
import '@/assets/theme/dark/style.scss'
import { setTheme } from '@/assets/theme/set-theme'
import getIconPath from '@/icons/theme'
import Element from '@/plugins/element'

import QtBridge, { RegisterEvent } from '@/qt-ipc/bridge'

Vue.use(Router)
Vue.use(Element)

setTheme('dark')

Vue.config.productionTip = false
Vue.prototype.$getIconPath = getIconPath

const router = new Router({
    linkExactActiveClass: 'link-active',
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: [
        {
            path: '/',
            name: 'dataMigrate',
            // @ts-ignore
            component: () => import('@/views/migrate/DataMigrate.vue'),
            meta: { title: 'dataMigrate' }
        }
    ]
})

Vue.use(QtBridge, {
    registers: [RegisterEvent.TsGtag],
    onMounted: () => {
        new Vue({
            i18n,
            store,
            router,
            beforeCreate: async function () {
                i18n.locale = await getLocale()
            },
            render: h => h(App)
        }).$mount('#app')
    }
})
