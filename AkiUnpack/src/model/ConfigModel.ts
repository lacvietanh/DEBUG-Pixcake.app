import { IS_CLIENT_PIX_PIE } from '@/universal/types/config'
import store from '@/store'

export default class ConfigModel {

    id = 0
    buildCLKernel = false
    onVipPlanClick = false
    createNewDir = true
    setDefaultPath = false
    restoreImportDir = false
    showEffectThumb = true
    changeSETSwitch = false
    showImageDescription = true //显示图片描述

    defaultSavePath = null
    defaultCacheNumber = 3
    previewSize = 0
    changeToSRGB = false //转化成sRGB，默认不开启

    constructor(buildCLKernel: boolean) {
        this.buildCLKernel = buildCLKernel

        // 天真蓝
        if (IS_CLIENT_PIX_PIE) {
            this.createNewDir = false           // 默认不创建新文件夹
            this.showImageDescription = false   // 默认不修改图片描述
        }
    }

    static create(jsonArr: any) {
        if (jsonArr == null || jsonArr.length === 0) {
            return new ConfigModel(false)
        }
        let item = jsonArr[0]
        return this.createForJson(item)
    }

    static createForJson(item: any) {
        let model = new ConfigModel(item.buildCLKernel || false)
        model.id = item.id

        model.createNewDir = item.createNewDir ? true : false
        model.setDefaultPath = item.setDefaultPath ? true : false
        model.restoreImportDir = item.restoreImportDir ? true : false
        model.showEffectThumb = (item.showEffectThumb) ? true : false
        model.showImageDescription = item.showImageDescription ? true : false
        model.changeSETSwitch = item.changeSETSwitch ? true : false

        model.defaultSavePath = item.defaultSavePath
        model.defaultCacheNumber = item.defaultCacheNumber
        model.previewSize = item.previewSize

        model.changeSETSwitch = item.changeSETSwitch
        model.changeToSRGB = item.changeToSRGB
        return model
    }

    toJson() {
        let json = { ...this }

        // @ts-ignore
        json.createNewDir = this.createNewDir ? 1 : 0
        // @ts-ignore
        json.setDefaultPath = this.setDefaultPath ? 1 : 0
        // @ts-ignore
        json.restoreImportDir = this.restoreImportDir ? 1 : 0
        // @ts-ignore
        json.showEffectThumb = (this.showEffectThumb) ? 1 : 0
        // @ts-ignore
        json.showImageDescription = this.showImageDescription ? 1 : 0
        // @ts-ignore
        json.buildCLKernel = this.buildCLKernel ? 1 : 0
        // @ts-ignore
        json.onVipPlanClick = this.onVipPlanClick ? 1 : 0
        // @ts-ignore
        json.changeSETSwitch = this.changeSETSwitch ? 1 : 0
        // @ts-ignore
        json.showImageDescription = this.showImageDescription ? 1 : 0
        // @ts-ignore
        json.changeToSRGB = this.changeToSRGB ? 1 : 0
        // @ts-ignore
        json.changeSETSwitch = this.changeSETSwitch ? 1 : 0

        return json
    }


}
