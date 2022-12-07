import fs from '@/qt-ipc/fs'
// @ts-ignore
import { joinResourcesPath } from '@/utils/findLocalPath'
// @ts-ignore
import FileUtils from '@/utils/FileUtils'
// @ts-ignore
import tsFilePathUtils from '@/utils/tsFilePathUtils'
import { BatchActiveMode } from '@/constants/batchRetouchDef'
import { Optional } from '@/universal/types/foundation.d'
import { BeautifyPresetType } from '@/constants/constants'
import path from '@/qt-ipc/path'

export default class PresettingItemModel {
    id: Optional<number>
    iconPath: Optional<string>
    name: string
    cfgPath: Optional<string>
    userId: Optional<number> = null
    sourceType: number
    isInner: boolean
    classifyType: number
    orderId: number
    _extendId: Optional<string>
    version: Optional<string>
    disable: boolean

    constructor(userId?: Optional<number>) {
        this.id = null
        this.iconPath = null
        this.name = ''
        this.cfgPath = null //配置文件的目录
        if (userId !== undefined) {
            this.userId = userId //作为id关联到哪个用户下
        }
        this.sourceType = 0 //0 本地,1 云端，2 临时
        this.isInner = false // 是否是安装包内置的
        this.classifyType = 2 // 1是推荐预设，2是我的预设
        this.orderId = 0
        this._extendId = null
        this.version = null
        this.disable = false
    }

    extendId(): Optional<string> {
        if (!this._extendId) {
            this._extendId = this.cfgPath
        }
        return this._extendId
    }

    async presetPath(user: any, userId?: number) {
        let uid = this.userId
        if (userId || (user && user.userId)) {
            uid = userId || (user && user.userId)
        }
        let sPath = await tsFilePathUtils.getPresetPath(this.id, uid, BatchActiveMode.RETOUCH)
        return sPath
    }

    async iconFullPath() {
        let sPath = ''//this.isInner ? : ""
        let prefix = await joinResourcesPath('effect/presetIcons/')
        let innerPath = await path.join(prefix, this.iconPath || '')
        if (await FileUtils.isFileExist(innerPath)) {
            sPath = 'file://' + innerPath
            return sPath
        }
        sPath = this.iconPath!
        return sPath
    }

    // 素材资源文件所在路径
    async resPath(): Promise<string> {
        return await path.joinResourcesPath('effect/config')
    }

    // 配置文件的全路径
    async fullCfgPath(user: any, userId?: number): Promise<string> {

        let sPath = await path.joinResourcesPath(this.cfgPath!)
        if (await FileUtils.isFileExist(sPath)) {
            return sPath
        }

        if (this.cfgPath?.startsWith(path.sep!)) {
            return this.cfgPath
        }

        const uid = userId || user.user

        let presetPath = await this.presetPath(user, uid)
        sPath = await path.join(presetPath, this.cfgPath!)
        if (!await FileUtils.isFileExist(sPath)) {
            let lastFindIndex = sPath.lastIndexOf(path.sep! + 'beautify')
            sPath = sPath.substr(0, lastFindIndex)
            sPath = await path.join(sPath, this.cfgPath!)
        }
        return sPath
    }

    // 配置文件的json字符串
    async cfgJsonString(user: any): Promise<string> {
        let path = await this.fullCfgPath(user)
        // 参数套模板
        let jsonStr = await FileUtils.readJsonFromLocal(path)
        jsonStr = JSON.stringify(jsonStr)
        return jsonStr
    }

    static initFromJson(json: any): PresettingItemModel {
        if (json === null || json === undefined) {
            return json
        }
        let obj = new PresettingItemModel(json.userId)
        obj.id = json.id
        obj._extendId = json.extendId
        obj.iconPath = json.iconPath
        obj.name = json.name
        obj.cfgPath = json.cfgPath
        obj.userId = json.userId
        obj.sourceType = json.sourceType
        obj.orderId = json.orderId
        obj.classifyType = json.classifyType
        obj.version = json.version
        obj.disable = json.disable ? true : false
        return obj
    }


    /**
     * 解析成json
     * @returns {{}}
     */
    parseToJson(): any {
        const json = {} as any

        json.id = this.id
        json.extendId = this.extendId()
        json.iconPath = this.iconPath
        json.name = this.name
        json.cfgPath = this.cfgPath
        json.userId = this.userId
        json.sourceType = this.sourceType
        json.orderId = this.orderId
        json.classifyType = this.classifyType
        json.version = this.version
        json.disable = this.disable

        return json
    }

    clone(): PresettingItemModel {
        let obj = new PresettingItemModel(this.userId)
        obj.id = this.id
        obj._extendId = null
        obj.iconPath = this.iconPath
        obj.name = this.name
        obj.cfgPath = this.cfgPath
        obj.userId = this.userId
        obj.sourceType = this.sourceType
        obj.orderId = this.orderId
        obj.classifyType = this.classifyType
        obj.version = this.version
        obj.disable = this.disable
        return obj
    }

    static initFromJsonArray(jsonAry: any): Array<PresettingItemModel> {
        let models = [] as Array<PresettingItemModel>
        for (let i = 0; i < jsonAry.length; i++) {
            let json = jsonAry[i]
            let obj = PresettingItemModel.initFromJson(json)
            if (obj)
                models.push(obj)
        }
        return models
    }

    /*
        移除预设
     */
    async remove(cfgPath: string) {
        if (await FileUtils.isFileExist(cfgPath)) {
            await fs.unlinkSync(cfgPath)
        }
    }

    static async isEqualNoEffect(presetId: string): Promise<boolean> {
        if (!presetId) {
            return true
        }
        if (presetId == BeautifyPresetType.NoEffect) {
            return true
        }
        let sep = path.sep
        // @ts-ignore
        let t = presetId.replaceAll(sep, '/')
        return t === BeautifyPresetType.NoEffectPath
    }
}
