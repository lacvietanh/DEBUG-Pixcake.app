// @ts-ignore
import PresettingItemModel from '@/model/PresettingItemModel'
// @ts-ignore
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
// @ts-ignore
import tsFilePathUtils from '@/utils/tsFilePathUtils'
import { BatchActiveMode } from '@/constants/batchRetouchDef'
// @ts-ignore
import { joinResourcesPath } from '@/utils/findLocalPath'
import { CUR_PRESET_VERSION, DEFAULT_PALETTE_CONFIG, DEFAULT_PRESET_CONFIG } from '@/constants/preset-def'
import { PresetSuitIdType } from '@/constants/constants'
// @ts-ignore
import FileUtils from '@/utils/FileUtils'
import NodeApi from '@/qt-ipc/node-api'
import path from '@/qt-ipc/path'

export default // @ts-ignore
class PresetSuitModel {
    id: number | string = PresetSuitIdType.NoEffect
    beautifyModel: PresettingItemModel | null = null
    paletteModel: PalettePresetCfgModel | null = null
    iconPath: string | null = null
    name: string = ''
    cfgPath: string | null = null //配置文件的目录
    userId: number | null = null //作为id关联到哪个用户下
    sourceType: number = 0 //0 本地,1 云端，2 临时
    isInner: boolean = false // 是否是安装包内置的
    classifyType: number = 2 // 1是推荐预设，2是我的预设
    orderId: number = 0
    version: number | null = null
    disable: boolean = false
    beautifyPresetId: string | null = null
    palettePresetId: string | null = null
    classId: number = 0
    updated_at: number = 0 //预设更新时间
    created_at: number = 0 //预设创建时间

    constructor(buildVersion: number, beautifyModel: PresettingItemModel | null, paletteModel: PalettePresetCfgModel | null) {
        this.beautifyModel = beautifyModel
        this.paletteModel = paletteModel
        this.version = buildVersion
    }

    async iconFullPath() {
        let sPath: string | null = ''
        let prefix = await joinResourcesPath('effect/presetIcons/')
        let innerPath = await path.join(prefix, this.iconPath || '')
        if (await FileUtils.isFileExist(innerPath)) {
            sPath = 'file://' + innerPath
            return sPath
        }
        sPath = this.iconPath
        return sPath
    }

    // 素材资源文件所在路径
    async resPath() {
        return await joinResourcesPath('effect/config')
    }

    static initFromJson(json: any) {
        if (!json) return null
        let obj = new PresetSuitModel(json.version, null, null)
        obj.id = json.id
        obj.iconPath = json.iconPath
        obj.name = json.name
        obj.cfgPath = json.cfgPath
        obj.userId = json.userId
        obj.sourceType = json.sourceType
        obj.orderId = json.orderId
        obj.classifyType = json.classifyType
        obj.version = json.version
        obj.disable = json.disable
        obj.classId = json.classId || 0

        obj.updated_at = json.updated_at
        obj.created_at = json.created_at

        obj.palettePresetId = json.palettePresetId || '-1' // 不存在 使用无效果
        obj.beautifyPresetId = json.beautifyPresetId || '-1' // 不存在预设 使用无效果
        return obj
    }

    static initFromJsonArray(jsonAry: Array<any>) {
        if (!jsonAry) return null
        let models = []
        for (let i = 0; i < jsonAry.length; i++) {
            let json = jsonAry[i]
            let obj = PresetSuitModel.initFromJson({
                ...json,
                id: json.extendId
            })
            models.push(obj)
        }
        return models
    }

    static async noneBeautifyEffectModel(userId: number) {
        let cfgPath = await path.resolve(DEFAULT_PRESET_CONFIG)
        let beautifyPreset = PresettingItemModel.initFromJson({
            id: '-1',
            extendId: '-1',
            name: '无效果',
            iconPath: 'toolbar_icon_no_effect@3x.png',
            cfgPath,
            classifyType: 1,
            orderId: 0
        })
        beautifyPreset.userId = userId
        beautifyPreset.sourceType = 0
        return beautifyPreset
    }

    static nonePaletteEffectModel(userId: number) {
        let paletteOriPreset = PalettePresetCfgModel.default()
        paletteOriPreset.id = '-1'
        paletteOriPreset.userId = userId
        paletteOriPreset.sourceType = 0
        return paletteOriPreset
    }

    static async noneEffectModel(userId: number) {
        // 创建调色的预设
        const beautifyPreset = await PresetSuitModel.noneBeautifyEffectModel(userId)
        const paletteOriPreset = await PresetSuitModel.nonePaletteEffectModel(userId)

        let model = new PresetSuitModel(CUR_PRESET_VERSION, beautifyPreset, paletteOriPreset)
        model.name = '无效果'
        model.iconPath = 'toolbar_icon_no_effect@3x.png'
        model.classifyType = 1
        model.beautifyPresetId = beautifyPreset.extendId()
        model.palettePresetId = paletteOriPreset.id
        return model
    }

    async beautifyPresetCfgPath() {
        let cfgPath = null
        if (this.id === PresetSuitIdType.NoEffect) {
            cfgPath = await joinResourcesPath(DEFAULT_PRESET_CONFIG)
            return cfgPath
        }
        if (this.beautifyPresetId != null) {
            cfgPath = await tsFilePathUtils.getPresetPath(this.id, this.userId, BatchActiveMode.RETOUCH)
            cfgPath = await path.join(cfgPath, this.beautifyPresetId)
        }
        return cfgPath
    }

    async palettePresetCfgPath() {
        let cfgPath = null
        if (this.id === PresetSuitIdType.NoEffect) {
            cfgPath = await joinResourcesPath(DEFAULT_PALETTE_CONFIG)
            return cfgPath
        }
        if (this.palettePresetId != null) {
            cfgPath = await tsFilePathUtils.getPresetPath(this.id, this.userId, BatchActiveMode.PALETTE)
            cfgPath = await path.join(cfgPath, this.palettePresetId)
        }
        return cfgPath
    }

    palettePresetCfgJson() {
        if (this.paletteModel) {
            return this.paletteModel.toCfgJson()
        }
        return null
    }
}
