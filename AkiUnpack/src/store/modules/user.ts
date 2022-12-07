import Vue from 'vue'

import { setToken, getToken } from '@/utils/auth'
// @ts-ignore
import { fetchUserInfo } from '@/api/userApi'
// @ts-ignore
import { fetchProtocol } from '@/api/commonApi'
// @ts-ignore
import { logout, fetchMenus } from '@/api/userApi'

import { findCakeMenu, insertCakeMenu, deleteCakeMenu } from '@/universal/datastore/dictionaryDao'
import QtBroadcast from '@/qt-ipc/qt-broadcast'
import { kBroadCastWinEventString, WinIPCMessage, WinType } from '@/constants/winIpc-def'

import UserInfo from '@/model/UserModel'
import UserModel from '@/universal/model/UserModel'
import MenuModel from '@/model/MenuModel'

import { ActionContext } from 'vuex'
import { IMenuJson, IMenuConfig } from '@/types/api/user'

interface IMenu {
    loaded: boolean,
    navMenu: MenuModel[],
    userMenu: MenuModel[],
    helpMenu: MenuModel[]
}

interface IState {
    user: UserInfo | null
    is_login: boolean
    tel: null | string
    userId: null | number
    hasInitUserConfig: boolean
    userProtocol: string | null
    userProtocolName: string
    privacyProtocol: string | null
    privacyProtocolName: string
    actionStatus: string[]
    showCompleteInfo: boolean

    // 菜单集
    menus: IMenu
}

let menuTimer = 0

const state: IState = {
    user: null,
    is_login: false,
    tel: null,
    userId: null,
    hasInitUserConfig: false, // 仅执行一次 加载用户配置信息,
    userProtocol: null,
    userProtocolName: '',
    privacyProtocol: null,
    privacyProtocolName: '',
    actionStatus: ['batchRetouch_histogram', 'batchRetouch_preset', 'photoFinishing_histogram', 'photoFinishing_preset'], // 用户行为状态（图库/精修页面记录直方图和预设是否展开）
    showCompleteInfo: false,

    // 菜单集
    menus: {
        loaded: false,
        navMenu: [],
        userMenu: [],
        helpMenu: []
    }
}

export default {
    state,
    getters: {
        isLogin: (state: IState): boolean => state.is_login,
        userId: (state: IState): number | null => state.userId,
        tel: (state: IState): string | null => state.tel,
        hasInitUserConfig: (state: IState): boolean => state.hasInitUserConfig,
        isVip: (state: IState): boolean => state.user ? state.user.isVip : false,
        user: (state: IState): UserInfo => state.user ? state.user : new UserInfo(state.userId, '', '', -1),
        userProtocol: (state: IState): string | null => state.userProtocol,
        userProtocolName: (state: IState): string => state.userProtocolName,
        privacyProtocol: (state: IState): string | null => state.privacyProtocol,
        privacyProtocolName: (state: IState): string => state.privacyProtocolName,
        actionStatus: (state: IState): string[] => state.actionStatus,
        showCompleteInfo: (state: IState): boolean => state.showCompleteInfo,

        navMenus: (state: IState): MenuModel[] => state.menus.navMenu,
        userMenus: (state: IState): MenuModel[] => state.menus.userMenu,
        helpMenus: (state: IState): MenuModel[] => state.menus.helpMenu,

        exportMenu: (state: IState): MenuModel => {
            const menuKey = 'educeDetail'
            if (state.menus.loaded) {
                for (const key in state.menus) {
                    if (['navMenu', 'userMenu', 'helpMenu'].includes(key)) {
                        const obj = state.menus[key].find((model: MenuModel) => model.key === menuKey)
                        if (obj) {
                            return obj
                        }
                    }
                }
            }

            return new MenuModel({ show: false, url: '', key: menuKey })
        }
    },

    mutations: {

        initUser(state: IState, userInfo: any): void {
            const token = userInfo.token
            const tel = userInfo.tel
            const userId = userInfo.userId
            const oid = userInfo.merchantId

            state.user = new UserInfo(userId, token, tel, oid)
            state.userId = parseInt(userId)
            state.user = userInfo
            state.tel = tel
            state.is_login = !!token

            Vue.prototype.$tsStat?.login(userId, oid)
            QtBroadcast.send('update-userinfo', state.user)
        },

        INIT_USER_CONFIG(state: IState, bool: boolean): void {
            state.hasInitUserConfig = bool
        },

        refreshVipInfo(state: IState, data: any): void {
            const { isVip, leftNum, totalNum, tel, watermark } = data
            if (state.user) {
                if (tel) {
                    state.tel = tel
                    state.user.tel = tel
                }
                state.user.updateVipInfo(isVip, leftNum, totalNum)
                state.user.updateWaterMark(watermark)
            }
        },

        _ClearUserInfo(state: IState): void {
            state.user = null
            state.userId = -1
            state.is_login = false
            state.tel = null
            state.hasInitUserConfig = false
        },

        loadUserCacheData(state: IState, userModel: any): void {
            console.log(`user.loadUserCacheData`, userModel)
            // const userModel = UserModel.getInstance()
            const token = userModel.token
            const tel = userModel.tel
            const userId = userModel.userId
            const merchantId = userModel.oid

            console.log('loadUserCacheData', userModel)
            console.log('loadUserCacheData: token ', token)
            console.log('loadUserCacheData: tel', tel)
            console.log('loadUserCacheData: userId', userId)
            console.log('loadUserCacheData: oid', merchantId)

            if (token && tel && userId) {
                state.userId = Number(userId)
                state.tel = tel
                state.user = new UserInfo(userId, token, tel, merchantId)
                state.is_login = !!token
                state.userId = state.user.userId
                Vue.prototype.$tsStat?.login(userId, merchantId)

                QtBroadcast.send('update-userinfo', state.user)
            }
        },

        _updateProtocol(state: IState, {
            userProtocol,
            userProtocolName,
            privacyProtocol,
            privacyProtocolName
        }: any): void {
            state.userProtocol = userProtocol
            state.userProtocolName = userProtocolName
            state.privacyProtocol = privacyProtocol
            state.privacyProtocolName = privacyProtocolName
        },

        changeActionStatus_batchRetouch(state: IState, gather: string[]): void {
            const allGather = ['batchRetouch_histogram', 'batchRetouch_preset']
            allGather.forEach((item, index) => {
                if (gather.includes(item) && !state.actionStatus.includes(item)) {
                    state.actionStatus.push(item)
                } else if (!gather.includes(item) && state.actionStatus.includes(item)) {
                    state.actionStatus.splice(state.actionStatus.indexOf(item), 1)
                }
            })
        },

        changeActionStatus_photoFinishing(state: IState, gather: string[]): void {
            const allGather = ['photoFinishing_histogram', 'photoFinishing_preset']
            allGather.forEach((item, index) => {
                if (gather.includes(item) && !state.actionStatus.includes(item)) {
                    state.actionStatus.push(item)
                } else if (!gather.includes(item) && state.actionStatus.includes(item)) {
                    state.actionStatus.splice(state.actionStatus.indexOf(item), 1)
                }
            })
        },

        setShowCompleteInfo(state: IState, bool: boolean): void {
            state.showCompleteInfo = bool
        },

        _SetMenus(state: IState, menus: IMenu): void {
            state.menus = menus
        }
    },

    actions: {
        async fetchUserProtocol({ commit, state }: ActionContext<IState, any>): Promise<void> {
            if (state.userProtocol && state.privacyProtocol) {
                return
            }
            try {
                const resArr = await Promise.all([fetchProtocol(2), fetchProtocol(3)])
                commit('_updateProtocol', {
                    userProtocol: resArr[0].content || '',
                    userProtocolName: resArr[0].name || '',
                    privacyProtocol: resArr[1].content || '',
                    privacyProtocolName: resArr[1].name || ''

                })
            } catch (err) {
                console.log(err)
            }
        },

        async ExitLogin({ commit, dispatch }: ActionContext<IState, any>, needLogout = true): Promise<void> {
            if (menuTimer) {
                clearTimeout(menuTimer)
                menuTimer = 0
            }

            const token = await getToken()

            commit('_ClearUserInfo')
            commit('project/_ClearProjectInfo', {}, { root: true })
            commit('INIT_USER_CONFIG', false)
            commit('clearAllPresets')
            await dispatch('clearMenuList')

            // 增加广播通知
            const msg = new WinIPCMessage(WinType.Main, [WinType.MemberVipPlan], { token })
            const json = msg.toJson()
            QtBroadcast.send(kBroadCastWinEventString(WinType.Main, 'logout'), json)

            // 清除缓存
            if (needLogout) {
                try {
                    await logout()
                } catch (e) {
                }
            }
            await UserModel.getInstance().clearCache()
        },

        /**
         * 更新用户信息
         * @param commit
         * @param vip_info
         * @param user_info
         * @param watermark
         */
        updateVipInfo({ commit }: ActionContext<IState, any>, { vip_info = [], user_info = {}, watermark }: any): void {
            let left = 0
            let total = 0

            const vipInfo = vip_info || []
            if (vipInfo != null && vipInfo.length > 0) {
                vipInfo.forEach((item: any) => {
                    if (new Date() < new Date(item.end_time)) {
                        left += item.left_count
                    }
                    total += item.total_count
                })
                commit('refreshVipInfo', {
                    isVip: !!user_info.is_vip,
                    leftNum: left,
                    totalNum: total,
                    tel: user_info.phone,
                    watermark
                })
            } else {
                commit('refreshVipInfo', {
                    isVip: !!user_info.is_vip,
                    leftNum: 0,
                    totalNum: total,
                    tel: user_info.phone,
                    watermark
                })
            }
        },

        async TokenLogin({ commit, dispatch }: ActionContext<IState, any>, token: string): Promise<UserInfo> {
            try {
                await setToken(token)
                const { vip_info, user_info, watermark } = await fetchUserInfo()

                const userInfo = new UserInfo(user_info.id, token, user_info.phone, user_info.org_id)
                userInfo.token = token
                await UserModel.getInstance().cacheUserInfo(userInfo)

                commit('initUser', userInfo)
                await dispatch('updateVipInfo', { vip_info, user_info, watermark })

                // 增加广播通知
                const msg = new WinIPCMessage(WinType.Main, [WinType.MemberVipPlan], { token })
                const json = msg.toJson()
                QtBroadcast.send(kBroadCastWinEventString(WinType.Main, 'login'), json)

                return Promise.resolve(userInfo)
            } catch (e) {
                return Promise.reject(e)
            }
        },

        async loadVipInfo({ dispatch }: ActionContext<IState, any>, payLoad: any): Promise<void> {
            try {
                const { vip_info, user_info, watermark } = await fetchUserInfo()
                await dispatch('updateVipInfo', { vip_info, user_info, watermark })
                if (payLoad) {
                    payLoad.success()
                }

                return Promise.resolve()
            } catch (e) {
                return Promise.reject(e)
            }
        },

        //更改 showComplete
        async updateShowCompleteInfo({ commit }: ActionContext<IState, any>, payLoad: any): Promise<void> {
            await UserModel.getInstance().setShowCompleteInfo(false)
            commit('setShowCompleteInfo', false)
        },

        async initMenuList({ commit, state, dispatch }: ActionContext<IState, any>, isLoginPage: boolean = false): Promise<void> {
            // 消除定时器
            if (menuTimer) {
                clearTimeout(menuTimer)
                menuTimer = 0
            }

            if (state.menus.loaded) {
                return
            }

            let data
            let loaded = false

            try {
                // @ts-ignore
                data = await fetchMenus() || {} as IMenuJson
                if (!isLoginPage) {
                    await insertCakeMenu(data)
                    loaded = true
                }

                if (menuTimer) {
                    clearTimeout(menuTimer)
                    menuTimer = 0
                }
            } catch (e) {
                console.error('initMenuList: ', e)
                // 加载失败，定时重新加载
                menuTimer = setTimeout(() => dispatch('initMenuList'), 1000 * 60 * 30)
                try {
                    // 取数据库缓存
                    data = await findCakeMenu()
                } catch (e) {
                }
            }

            if (!data) {
                return
            }

            const navMenu = (data.navMenu || []).map((item: IMenuConfig) => new MenuModel(item))
            const userMenu = (data.userMenu || []).map((item: IMenuConfig) => new MenuModel(item))
            const helpMenu = (data.helpMenu || []).map((item: IMenuConfig) => new MenuModel(item))
            commit('_SetMenus', { navMenu, userMenu, helpMenu, loaded })
        },

        async clearMenuList({ commit }: ActionContext<IState, any>): Promise<void> {
            try {
                await deleteCakeMenu()
            } catch (e) {
            }
            commit('_SetMenus', { navMenu: [], userMenu: [], helpMenu: [], loaded: false })
        }
    }
}
