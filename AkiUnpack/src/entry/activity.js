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

setTheme('dark')
//

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
            name: 'activityLocal',
            component: () => {
                return import('@/views/Activity/activityLocal')
            },
            meta: {
                title: 'activity'
            }
        }
    ]
})
//
new Vue({
    router,
    beforeCreate: async function () {
    },
    render: h => h(App)
}).$mount('#app')

