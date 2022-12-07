import PresettingItemModel from '@/model/PresettingItemModel'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import FileUtils from '@/utils/FileUtils'
import { getPresetSuit, getPresetClass } from '@/api/settingApi'
import tsFilePathUtils from '@/utils/tsFilePathUtils'
import { BatchActiveMode } from '@/constants/batchRetouchDef.ts'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel.ts'
import { CUR_PRESET_VERSION, PALETTE_PRESET_VERSION } from '@/constants/preset-def.ts'
import DBIpcRender from '@/irender/DBIpcRender'
import { PALETTE_PRESETS_CFG_TABLE, PRESETS_SUIT_TABLE, PRESETS_TABLE } from '@/universal/types/config'
import { v4 as uuidv4 } from 'uuid'
import { PresetClassifyType, PresetSourceType } from '@/universal/types/constants'
import NodeApi from 'qt/node-api'

const path = NodeApi.path
export default class PresetsDownloader {
    async savePresetsToLocal(cloudJson, user, isSystem) {
        if (!cloudJson) {
            return
        }
        let resAry = cloudJson
        let resultModels = []
        if (!resAry) {
            return []
        }
        //  console.log(`==> PresetsDownloader: user_${user}, isSystem: ${isSystem}`, cloudJson)
        // 获取动态推荐分类id
        const data = await getPresetClass()
        const recommendItem = data.find(item => item.type === 1) || {}

        for (let i = 0; i < resAry.length; i++) {
            let dItem = resAry[i]
            let beautifyModel = null
            let paletteModel = null
            dItem.userId = user.userId
            if (dItem.info) {
                beautifyModel = await this.insertBeautifyPresetFromCloud(dItem, user, isSystem)
            }
            if (dItem.info1) {
                paletteModel = await this.insertPalettePresetFromCloud(dItem, user, isSystem)
            }
            let model = await this.insertPresetSuit(beautifyModel, paletteModel, dItem, isSystem, recommendItem.id)
            resultModels.push(model)
        }
        return resultModels
    }

    async insertPresetSuit(beautifyModel, paletteModel, dItem, isSystem, classId) {
        let model = new PresetSuitModel(dItem.min_version, beautifyModel, paletteModel)
        model.id = dItem.id + ''

        // 系统预设不与用户绑定
        model.userId = isSystem ? null : dItem.userId
        model.name = dItem.name
        model.isInner = false
        model.classifyType = isSystem ? 1 : 2
        model.sourceType = 1
        model.orderId = dItem.order
        if (beautifyModel) {
            model.beautifyPresetId = beautifyModel.extendId()
        }
        if (paletteModel) {
            model.palettePresetId = `${paletteModel.id}`
        }

        if (isSystem) {
            model.iconPath = dItem.icon_url
        } else {
            model.iconPath = dItem.cover
            if (!model.iconPath) {
                let infoJson = JSON.parse(dItem.info)
                model.iconPath = infoJson.cover
            }
        }

        model.version = dItem.min_version
        model.cfgPath = ''
        model.classId = isSystem ? (classId || dItem.class_id) : dItem.class_id

        await DBIpcRender.insertToDB(PRESETS_SUIT_TABLE, model)
    }

    async insertRetouchPreset(id, userId, json, {
        classifyType = 2,
        sourceType = 1,
        name = ''
    }) {
        let model = new PresettingItemModel(null)
        model.id = id
        model.userId = userId
        model.name = name
        model.classifyType = classifyType
        model.sourceType = sourceType
        model.version = json.Version || '0.0.1'
        model.cfgPath = `${model.id}.json`

        const prefixPath = await tsFilePathUtils.getPresetPath(model.id, model.userId, BatchActiveMode.RETOUCH)
        const filePath = await NodeApi.path.join(prefixPath, model.cfgPath)
        await FileUtils.writeJsonIntoLocal(filePath, json)

        await DBIpcRender.insertToDB(PRESETS_TABLE, {
            ...model,
            extendId: model.extendId()
        })

        return model
    }

    async insertBeautifyPresetFromCloud(dItem, user, isSystem) {
        let model = new PresettingItemModel(null)
        model.id = dItem.id
        model.userId = dItem.userId
        model.name = dItem.name
        model.isInner = false
        model.classifyType = isSystem ? 1 : 2
        model.sourceType = 1

        let strPresetPath = await tsFilePathUtils.getPresetPath(model.id, model.userId, BatchActiveMode.RETOUCH)
        let jsonName = `${model.id}.json`
        strPresetPath = await NodeApi.path.join(strPresetPath, jsonName)
        let jsonInfo = JSON.parse(dItem.info)
        if (isSystem) {
            model.iconPath = dItem.icon_url
        } else {
            model.iconPath = jsonInfo.cover
            jsonInfo = jsonInfo.configJson
        }

        model.version = jsonInfo.Version || '0.0.1'
        await FileUtils.writeJsonIntoLocal(strPresetPath, jsonInfo)
        model.cfgPath = jsonName

        await DBIpcRender.insertToDB(PRESETS_TABLE, {
            ...model,
            extendId: model.extendId()
        })

        return model
    }

    /**
     * 生成实例并插入数据库
     * @param id
     * @param userId
     * @param json
     * @param sourceType
     * @returns {Promise<*>}
     */
    async insertPalettePreset(id, userId, json, sourceType = 1, projectId = -1) {
        const model = PalettePresetCfgModel.initFromCfgJson(json)
        model.id = `${id}`
        model.userId = userId
        model.projectId = projectId
        model.sourceType = sourceType
        model.version = json.Version || PALETTE_PRESET_VERSION

        await DBIpcRender.insertToDB(PALETTE_PRESETS_CFG_TABLE, {
            ...model,
            hslJson: JSON.stringify(model.hslJson)
        })
        return model
    }

    async insertPalettePresetFromCloud(dItem, user, isSystem) {
        if (dItem.info1 == null || dItem.info1.length == 0) {
            return null
        }
        let jsonInfo = JSON.parse(dItem.info1)
        if (!isSystem) {
            jsonInfo = jsonInfo.configJson
        }
        return await this.insertPalettePreset(dItem.id, dItem.userId, jsonInfo)
    }

    /**
     * 从云端获取设置，并保存效果参数到磁盘的user_data目录及设置项入库
     * @returns {Promise<Array<PresettingItemModel>>>}
     */
    async loadCloudPresets(user, min_version) {
        try {
            // 推荐预设（第二版本推荐预设）
            const resultApi = await getPresetSuit(true, CUR_PRESET_VERSION)
            const resultCommend = await this.savePresetsToLocal(resultApi, user, true)

            // 我的预设（所有推荐预设）
            const resultApi2 = await getPresetSuit(false, 0)
            const resultSystem = await this.savePresetsToLocal(resultApi2, user, false)
            return resultSystem
        } catch (e) {
            return Promise.reject(e)
            console.log(`loadCloudPresets failed error=${e}`)
        }
    }

    /**
     * 创建临时预设套装
     * @param userId
     * @param beautifyJson
     * @param paletteJson
     */
    async createTempPresetSuit(userId, beautifyJson = {}, paletteJson = {}, projectId = -1) {
        const uuid = uuidv4()
        const paletteModel = await this.insertPalettePreset(uuid, userId, paletteJson, PresetSourceType.Temp, projectId)

        const beautifyModel = await this.insertRetouchPreset(uuid, userId, beautifyJson, {
            classifyType: PresetClassifyType.User,
            sourceType: PresetSourceType.Cloud,
            name: '临时套装-美化预设'
        })

        const model = new PresetSuitModel(CUR_PRESET_VERSION, beautifyModel, paletteModel)

        model.id = uuid
        model.userId = userId
        model.name = '临时套装'
        model.classifyType = PresetClassifyType.User
        model.sourceType = PresetSourceType.Temp

        if (beautifyModel) {
            model.beautifyPresetId = beautifyModel.extendId()
        }

        if (paletteModel) {
            model.palettePresetId = paletteModel.id
        }

        await DBIpcRender.insertToDB(PRESETS_SUIT_TABLE, model)

        console.log('[createTempPreset] ', ' uuid: ', uuid, ' userId', userId, ' suitModel: ', model)

        return model
    }
}

