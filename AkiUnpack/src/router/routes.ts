import { RouteConfig } from 'vue-router'
// @ts-ignore
import LoginLayout from '@/views/Layout/loginLayout'
// @ts-ignore
import UserLayout from '@/views/Layout/userLayout'

const routes: Array<RouteConfig> = [
    {
        path: '/',
        redirect: { name: 'index' }
    },

    {
        path: '/',
        component: LoginLayout,
        children: [
            {
                path: 'login',
                // @ts-ignore
                component: () => import('@/views/Login/Login'),
                name: 'Login',
                meta: {
                    title: '登录页'
                }
            }
        ]
    },
    {
        path: '/',
        component: UserLayout,
        children: [
            {
                path: '/',
                // @ts-ignore
                component: () => import('@/views/Layout/userLayout/defaultLayout'),
                children: [
                    {
                        path: 'index',
                        // @ts-ignore
                        component: () => import('@/views/Home'),
                        name: 'index',
                        meta: {
                            title: '工作台',
                            requiresAuth: true
                        }
                    },
                    {
                        path: 'exportList', //图片精修
                        name: 'exportList',
                        props: ({ query }) => ({ thumbnail: query.thumbnail, preset: query.preset }),
                        // @ts-ignore
                        component: () => import('@/views/ExportList'),
                        meta: {
                            title: '导出列表',
                            requiresAuth: true
                        }
                    }
                ]
            },
            {
                path: '/project',
                // @ts-ignore
                component: () => import('@/views/Layout/userLayout/ProjectLayout'),
                name: 'project',
                redirect: '/project/importImage',
                children: [

                    {
                        path: '/project/importImage',
                        // @ts-ignore
                        component: () => import('@/views/BatchRetouch/ImportImageView'),
                        name: 'importImage',
                        meta: {
                            title: '导入图片',
                            requiresAuth: true
                        }
                    },

                    {
                        path: '/project/batchRetouch',
                        name: 'batchRetouch',
                        // @ts-ignore
                        component: () => import('@/views/BatchRetouch/BatchRetouch'),
                        meta: {
                            title: '批量修图',
                            requiresAuth: true
                        }
                    },

                    {
                        path: '/project/photoFinishing', //图片精修
                        name: 'photoFinishing',
                        props: ({ query }) => ({ thumbnail: query.thumbnail, preset: query.preset }),
                        // @ts-ignore
                        component: () => import('@/views/PhotoFinishing/PhotoFinishingView'),
                        meta: {
                            title: '图片精修',
                            requiresAuth: true
                        }
                    }
                ]
            }
        ]
    },
]

export default routes
