// @ts-ignore
import { fetchUserInfo, postTokenInfo } from '@/api/userApi'
import locs from '@/utils/locs'
import { aesDecrypt, aesEncrypt, hexHashEncrypt } from '@/utils/crypto-util'
import {
    TS_AES_TOKEN,
    PREFIX,
    IS_CLIENT_PIX_PIE,
    DICTIONARY_TABLE,
    SHOWED_NOVICE_GUIDE,
    APP_VERSION, USER_TABLE
} from '@/universal/types/config'
import { removeToken, setToken } from '@/utils/auth'
import { Optional } from '@/types'
import { SystemRole } from '@/universal/types/constants'
import NodeApi from '@/qt-ipc/node-api'
import { ShareObjectModel } from '@/universal/model/ShareObjectModel/ShareObjectModel'
import User from "@/model/UserModel";
import DBIpcRender from "@/irender/DBIpcRender";
import {IpcRendererTopic} from "@/qt-ipc/constants/common";
import {IpcRendererAsync} from "@/utils/ipcRenderAsync";

interface IUserInfo {
    CreatedAt: string
    DeletedAt: string
    UpdatedAt: string
    id: number
    invite_type: number
    is_bad: number
    is_new: number
    is_vip: number
    last_active_time: string
    last_export_time: string
    limit_token_count: number
    limit_use_count: number
    my_org_id: number
    name: string
    org_id: number
    password: string
    phone: string
    phone_cc: number
    preview_count: number
    role_id: number
    state: number
    type: number
    uuid: string
}

interface IOrgInfo {
    tag: number         // 商家标识 （0：普通，1：TS内部）
    usage_mode: number  // 张数使用模式 （1：共用、2：不共用）
}

interface IOrgBackendInfo {
    is_show: boolean
    access_url: string
}

export interface IUserModel {
    token: string,
    userInfo: Optional<IUserInfo>,
    watermark: number,
    showCompleteInfo: boolean,
    orgInfo: Optional<IOrgInfo>
    orgBackendInfo: Optional<IOrgBackendInfo>
}

/**
 * 格式化密钥 （32位）
 * 不足部分使用'0'补齐
 * @param secret
 * @param length
 */
function formatSecret(secret: string, length: number = 32): string {
    // 格式化 删除 '-', exp: 04DABA14-3495-50DC-BFEA-6F88DCCF4179
    let str = secret ? secret.replace(/-/gi, '') : PREFIX
    const len = str.length

    if (len >= length) {
        return str.substr(0, length)
    }

    for (let i = 0; str.length < length; i++) {
        str += '0'
    }

    return str
}

export default class UserModel {
    static readonly key = 'userModel'
    static readonly defaultSecret = hexHashEncrypt('PixCake')
    static instance: UserModel

    static get localStorage(): any {
        return locs
    }

    static diskSN: string = ''

    static default(): IUserModel {
        return {
            token: '',
            userInfo: null,
            watermark: 1,
            showCompleteInfo: false,
            orgInfo: null,
            orgBackendInfo: null
        }
    }

    static getInstance(): UserModel {
        if (!this.instance) {
            this.instance = new UserModel()
        }
        return this.instance
    }

    /**
     * 加密token 并缓存
     * @param token
     */
    static async getEncryptToken(token: string): Promise<string> {
        if (!this.diskSN) {
            try {
                this.diskSN = (await ShareObjectModel.instance().getSystemUUID()).toUpperCase()
            } catch (e) {
                this.diskSN = UserModel.defaultSecret
            }
        }
        const secret = formatSecret(this.diskSN)
        console.log('[UserModel] secret: ', secret)

        const result = aesEncrypt(token, secret)
        return result
    }

    /**
     * 从缓存获取token 并解密
     */
    static async decryptToken(): Promise<string | null> {
        const result = await UserModel.localStorage.get(TS_AES_TOKEN)
        console.log('[UserModel] checkLoginStatus decryptToken: ', result)
        if (result) {
            if (!this.diskSN) {
                try {
                    this.diskSN = await ShareObjectModel.instance().getSystemUUID()
                } catch (e) {
                    this.diskSN = UserModel.defaultSecret
                }
            }
            const secret = formatSecret(this.diskSN)
            console.log('[UserModel] secret: ', secret, 'TS_AES_TOKEN', result)

            return aesDecrypt(result, secret)
        }
        return null
    }

    // 异步属性get
    async getUserInstance(): Promise<IUserModel> {
        return await NodeApi.sharedObject().getUser()
    }

    get shareObjectInstance() {
        return ShareObjectModel.instance()
    }

    // 异步属性get
    async geToken(): Promise<string> {
        const token: string = (await this.getUserInstance()).token
        return token
    }

    async setToken(val: string) {
        if (val) {
            await this.shareObjectInstance.setUser({ token: val })
        }
    }

    async getUserInfo(): Promise<Optional<IUserInfo>> {
        return (await this.shareObjectInstance.getUser() as any).userInfo
    }

    async getTel(): Promise<Optional<string>> {
        const userInfo = await this.getUserInfo()
        if (userInfo) {
            return userInfo.phone
        }
        return null
    }

    async getUserId(): Promise<Optional<number>> {
        const userInfo = await this.getUserInfo()
        if (userInfo) {
            return userInfo.id
        }
        return null
    }

    async getIsVip(): Promise<Optional<number>> {
        const userInfo = await this.getUserInfo()
        if (userInfo) {
            return userInfo.is_vip
        }
        return 0
    }

    async getOid(): Promise<Optional<number>> {
        const userInfo = await this.getUserInfo()
        if (userInfo) {
            return userInfo.org_id
        }
        return null
    }

    async getShowCompleteInfo(): Promise<boolean> {
        const userInfo: IUserModel = await this.getUserInstance()
        return userInfo.showCompleteInfo
    }

    async setShowCompleteInfo(val: boolean) {
        await this.shareObjectInstance.setShowCompleteInfoAndUpdateDB({ show_complete_info: val })
    }

    /**
     * 是否允许充值
     */
    async getIsAllowTopUp(): Promise<boolean> {
        // 如果是云端修图 不允许充值
        if (IS_CLIENT_PIX_PIE) {
            return false
        }
        const userModel: IUserModel = await this.getUserInstance()
        if (userModel.orgInfo) {
            if (userModel.orgInfo.usage_mode === 1) {
                // 共用套餐允许充值
                return true
            } else {
                // 管理员允许充值
                return (userModel.userInfo?.role_id === SystemRole.Admin
                    || userModel.userInfo?.role_id === SystemRole.SuperAdmin)
            }
        }

        return false
    }

    /**
     * 登录/免登 获取用户信息
     * @param token
     */
    async updateUserInfo(strEncryptToken: string,userInfo:User): Promise<any> {
        try {
            await this.setToken(userInfo.token!)
            setToken(userInfo.token!) // 设置 cookie
            const data = await fetchUserInfo({})
            // Next:登录也上报， 上报设备信息(mUUID,mInfo JsonStr(系统信息)) // this.diskSN = await getSystemUUID()
            // Next:待添加新临时接口处理上报。
            // let muuid = ''
            // try {
            //     muuid = await ShareObjectModel.instance().getSystemUUID()
            // } catch (e) {
            // }
            //
            // console.log('[UserModel] updateUserInfo: ', muuid, 'decodeToken:', userInfo.token!)
            // const minfo = await ShareObjectModel.instance().systemInfo
            // let asyncRender = new IpcRendererAsync()
            // let hardwareInfo = await asyncRender.on(IpcRendererTopic.FetchHardWareInfo, {})
            // const host_name:string = hardwareInfo.host_name || ""
            // const user_name:string = hardwareInfo.user_name || ""
            // const ret = await postTokenInfo({ muuid, minfo,host_name,user_name })
            // console.log(`postTokenInfo,ret = ${ JSON.stringify(ret) }`, muuid, minfo)

            const shareObjectModel: ShareObjectModel = await this.shareObjectInstance
            await shareObjectModel.setUser({
                user_info: data.user_info,
                watermark: data.watermark,
                show_complete_info: data.show_complete_info,
                org_info: data.org_info || null,
                org_backend_info: data.org_backend_info || null,
                vip_info: data.vip_info
            })
            await DBIpcRender.insertToDB(USER_TABLE, {
                token: strEncryptToken,
                user_id: userInfo.userId,
                merchant_id:userInfo.merchantId,
                login_time:Date.now()
            })
            shareObjectModel.setLoginUserInfo()

            return data
        } catch (e) {
            console.log(e)

            // @ts-ignore
            if (e && e.status && e.status === 401) {
                await this.clearCache()
            }
            return Promise.reject(e)
        }
    }

    /**
     * 加密token并缓存
     * 获取用户信息
     * （登录成功后调用）
     * @param token
     */
    async cacheUserInfo(userInfo: User): Promise<any> {
        try {
            const strEncryptToken = await UserModel.getEncryptToken(userInfo.token!)
            await this.updateUserInfo(strEncryptToken,userInfo)
            return this
        } catch (e) {
            return Promise.reject(e)
        }
    }

    async clearCache(): Promise<void> {
        await UserModel.localStorage.remove(TS_AES_TOKEN)
        await removeToken() // 清除 cookie
        const shareObjectModel: ShareObjectModel = await this.shareObjectInstance
        await shareObjectModel.setUser({
            token: '',
            user_info: null,
            watermark: 1
        })
    }
}
