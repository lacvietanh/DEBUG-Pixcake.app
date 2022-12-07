import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import routes from './routes'
import store from '../store'
import { BatchActiveMode } from '@/constants/batchRetouchDef'
import { getToken } from '@/utils/auth'
import { ShareObjectModel } from '@/universal/model/ShareObjectModel/ShareObjectModel'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import {QtEventFilter} from "@/utils/QtEventFilter";

Vue.use(VueRouter)

// const routes: Array<RouteConfig> = [
//   {
//     path: '/',
//     name: 'Home',
//     component: Home
//   }
// ]
//
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })
const router = new VueRouter({
    linkExactActiveClass: 'link-active',
    scrollBehavior(to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    },
    routes
})

// 登录判断
const isLogin = () => {
    return new Promise(async (resolve, reject) => {
        const token = await getToken()
        console.log(`isLogin.token`, token)
        if (token) {
            if (!store.getters.isLogin) {
                let userModel = await ShareObjectModel.instance().getUser()
                console.log(`isLogin.userModel`, userModel)
                store.commit('loadUserCacheData', userModel)
            }
            resolve(null)
        } else {
            reject()
        }
    })
}

router.beforeEach(async (to, from, next) => {
    // 进入页面 ...
    const { name, meta } = to
    let exClouds = [
        'batchRetouch',
        'photoFinishing',
        'template',
        'rawBatchConvert',
        'importImage'
    ]


    let resetClouds = [
        'batchRetouch',
        'photoFinishing',
        'template',
        'rawBatchConvert',
        'importImage',
        'exportList'
    ]

    console.log(`beforeEach to.name = ${ to.name },from.name = ${ from.name }`)
    if (from.name === 'index' && exClouds.includes(name as string)) {
        const project = store.getters['project/activeProject']
        if (project && project.name) {
            ipcRenderer.send('onProjectEntry', { name: project.name, projectId: project.id, pageId: to.name })
        }
    }

    if (to.name == 'index') { // 退出到工作台
        // ipcRenderer.send('onProjectExit','')
        ipcRenderer.send('on-enter-workspace', '') // 进入工作台
    } else {
        // ipcRenderer.send('on-exit-workspace','') // 退出工作台
    }

    if (!resetClouds.includes(name as string)) {

    }

    let hasDownloadPermissionList = [
        'batchRetouch',
        'photoFinishing',
        'template'
    ]
    store.commit('changeDownloadPermission', hasDownloadPermissionList.includes(name as string))
    QtEventFilter.reset()
    // 检测页面是否需要登录
    if (meta && meta.requiresAuth) {
        try {
            await isLogin()
            // 全局加载一次用户信息（本地项目列表，用户预设）
            if (!store.getters.hasInitUserConfig) {
                // ...
                try {
                    const userId = store.getters.userId
                    console.log('store.getters.userId :', userId)
                    if (userId && userId > 0) {
                        await store.dispatch('init_ori_preset', { userId })
                        store.commit('INIT_USER_CONFIG', true)
                        store.dispatch('getPresetClass')
                        let userModel = await ShareObjectModel.instance().getUser()

                        let  { vipInfo, userInfo, watermark } = userModel
                        let vip_info= vipInfo;
                        let user_info = userInfo;
                        store.dispatch('updateVipInfo', { vip_info, user_info, watermark } )

                        store.dispatch('loadAllPresents', { userId, loadDb: true })
                        store.dispatch('initMenuList')
                    } else {
                        next({ name: 'Login' })
                        return
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            next()
        } catch (e) {
            console.error(e)
            next({ name: 'Login' })
        }
    } else {

        next()
    }
})

router.afterEach((to, from) => {
    const { name, meta } = to
    if (meta && meta.title) {
        Vue.prototype.$tsStat?.pageview({
            path: to.path,
            name: to.name,
            title: to.meta?.title // 上报当前页面 PV
        })
    }
})

export default router
