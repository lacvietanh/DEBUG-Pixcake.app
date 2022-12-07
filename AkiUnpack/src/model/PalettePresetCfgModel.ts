import { NONE_HSL_CONFIG, PALETTE_PRESET_VERSION } from '@/constants/preset-def'
import { ParamFlag } from '@/constants/effect-config'
import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
// @ts-ignore
import path from '@/qt-ipc/path'
import { Optional } from '@/universal/types/foundation.d'

// 色温色调 相对值
const TEMPERATURE_KEY = ParamFlag[EffectParamEnum.EnhanceEditColorTemperatureRelative]  //ParamFlag[EffectParamEnum.EnhanceEditColorTemperatureRelative]/
const HUE_KEY = ParamFlag[EffectParamEnum.EnhanceEditHueRelative]

// hsl标记
const HslFlags = [
    ParamFlag[EffectParamEnum.EnhanceEditHSLHue],
    ParamFlag[EffectParamEnum.EnhanceEditHSLSaturation],
    ParamFlag[EffectParamEnum.EnhanceEditHSLLightness]
]

const defaultHls = NONE_HSL_CONFIG

const paletteMap = new Map<number, string>()

paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditColorTemperature], 'ColorTemperatureValue')
paletteMap.set(TEMPERATURE_KEY, 'ColorTemperatureRelativeValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditHue], 'HueValue')
paletteMap.set(HUE_KEY, 'HueRelativeValue')

paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditExposure], 'ExposureValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditContrast], 'ContrastValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditHighlight], 'HighlightValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditShadow], 'ShadowValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditWhite], 'WhiteValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditBlack], 'BlackValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditSaturation], 'SaturationValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditCameraRawSharpen], 'CameraRawSharpenValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditCameraRawVibrance], 'EnhanceEditCameraRawVibranceValue')
paletteMap.set(ParamFlag[EffectParamEnum.FilterAlpha], 'FilterAlpha')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditCRDBStrength], 'CRDBStrengthValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditCRDBRadius], 'CRDBRadiusValue')
paletteMap.set(ParamFlag[EffectParamEnum.EnhanceEditCRDBDetail], 'CRDBDetailValue')

export default class PalettePresetCfgModel {
    id: Optional<string>
    extendId: Optional<string> = ''
    userId: Optional<number>
    sourceType: number
    update_time: Optional<any>
    created_time: Optional<any>
    version: string
    thumbnailId: Optional<number>
    projectId: Optional<number>
    hslJson: any[]
    ColorTemperatureParamFlag: number
    ColorTemperatureRelativeParamFlag: number
    ColorTemperatureRelativeValue: number
    ColorTemperatureValue: number
    // 色调
    HueParamFlag: number
    HueRelativeParamFlag: number
    HueRelativeValue: number
    HueValue: number

    // 曝光
    ExposureParamFlag: number
    ExposureValue: number

    // 对比度
    ContrastParamFlag: number
    ContrastValue: number
    // 高光
    HighlightParamFlag: number
    HighlightValue: number

    // 阴影
    ShadowParamFlag: number
    ShadowValue: number

    // 白色
    WhiteParamFlag: number
    WhiteValue: number

    // 黑色
    BlackParamFlag: number
    BlackValue: number

    // 锐化
    CameraRawSharpenParamFlag: number
    CameraRawSharpenValue: number

    // 自然饱和度
    EnhanceEditCameraRawVibranceFlag: number
    EnhanceEditCameraRawVibranceValue: number

    // 饱和度
    SaturationParamFlag: number
    SaturationValue: number

    keyMap: Map<number, string>

    FilterAlphaFlag: number
    FilterAlpha: number
    FilterPath: string

    CRDBStrengthFlag: number = ParamFlag[EffectParamEnum.EnhanceEditCRDBStrength]
    CRDBStrengthValue: number = 0.5

    CRDBRadiusFlag: number = ParamFlag[EffectParamEnum.EnhanceEditCRDBRadius]
    CRDBRadiusValue: number = 0.2

    CRDBDetailFlag: number = ParamFlag[EffectParamEnum.EnhanceEditCRDBDetail]
    CRDBDetailValue: number = 0.25
    needCheck: boolean

    constructor() {
        this.id = null
        this.userId = null
        this.sourceType = 2
        this.update_time = null
        this.created_time = null
        this.version = PALETTE_PRESET_VERSION

        this.thumbnailId = null
        this.projectId = null

        // 色相、饱和度、明度
        // @ts-ignore
        this.hslJson = [].concat(defaultHls)

        // 色温
        this.ColorTemperatureParamFlag = 3007
        this.ColorTemperatureRelativeParamFlag = ParamFlag[EffectParamEnum.EnhanceEditColorTemperatureRelative]
        this.ColorTemperatureRelativeValue = 0.5
        this.ColorTemperatureValue = -1

        // 色调
        this.HueParamFlag = 3008
        this.HueRelativeParamFlag = ParamFlag[EffectParamEnum.EnhanceEditHueRelative]
        this.HueRelativeValue = 0.5
        this.HueValue = -1

        // 曝光
        this.ExposureParamFlag = 3000
        this.ExposureValue = 0.5

        // 对比度
        this.ContrastParamFlag = 3002
        this.ContrastValue = 0.5

        // 高光
        this.HighlightParamFlag = 3003
        this.HighlightValue = 0.5

        // 阴影
        this.ShadowParamFlag = 3004
        this.ShadowValue = 0.5

        // 白色
        this.WhiteParamFlag = 3020
        this.WhiteValue = 0.5

        // 黑色
        this.BlackParamFlag = 3021
        this.BlackValue = 0.5

        // 清晰度
        this.CameraRawSharpenParamFlag = 3022
        this.CameraRawSharpenValue = 0.5

        // 鲜艳度
        this.EnhanceEditCameraRawVibranceFlag = ParamFlag[EffectParamEnum.EnhanceEditCameraRawVibrance]
        this.EnhanceEditCameraRawVibranceValue = 0.5

        // 饱和度
        this.SaturationParamFlag = 3006
        this.SaturationValue = 0.5

        this.keyMap = paletteMap

        this.FilterAlphaFlag = ParamFlag[EffectParamEnum.FilterAlpha]
        this.FilterAlpha = 0
        this.FilterPath = ''
        this.needCheck = true
    }

    static initKeyMap(): Map<number, string> {
        return paletteMap
    }

    static default(): PalettePresetCfgModel {
        return new PalettePresetCfgModel()
    }

    static initFromCfgJson(cfgJson: any): Optional<PalettePresetCfgModel> {
        if (!cfgJson || !cfgJson.Params) {
            return null
        }
        let that = PalettePresetCfgModel.default()
        let params = cfgJson.Params
        let effects = cfgJson.Effects || []
        let hlsAry = []

        for (let item of params) {
            let { ParamFlag, fEffectValue } = item
            // 色温
            if (ParamFlag == that.ColorTemperatureParamFlag) {
                that.ColorTemperatureValue = fEffectValue
            }

            if (ParamFlag == that.ColorTemperatureRelativeParamFlag) {
                that.ColorTemperatureRelativeValue = fEffectValue
            }
            // 色调
            if (ParamFlag == that.HueParamFlag) {
                that.HueValue = fEffectValue
            }

            if (ParamFlag == that.HueRelativeParamFlag) {
                that.HueRelativeValue = fEffectValue
            }
            // 曝光
            if (ParamFlag == that.ExposureParamFlag) {
                that.ExposureValue = fEffectValue
            }

            //
            if (ParamFlag == that.ContrastParamFlag) {
                that.ContrastValue = fEffectValue
            }

            if (ParamFlag == that.HighlightParamFlag) {
                that.HighlightValue = fEffectValue
            }

            if (ParamFlag == that.ShadowParamFlag) {
                that.ShadowValue = fEffectValue
            }

            if (ParamFlag == that.WhiteParamFlag) {
                that.WhiteValue = fEffectValue
            }

            if (ParamFlag == that.BlackParamFlag) {
                that.BlackValue = fEffectValue
            }

            if (ParamFlag == that.CameraRawSharpenParamFlag) {
                that.CameraRawSharpenValue = fEffectValue
            }

            if (ParamFlag == that.SaturationParamFlag) {
                that.SaturationValue = fEffectValue
            }

            if (ParamFlag == that.EnhanceEditCameraRawVibranceFlag) {
                that.EnhanceEditCameraRawVibranceValue = fEffectValue
            }

            if (HslFlags.includes(ParamFlag)) {
                hlsAry.push(item)
            }

            if (ParamFlag == that.FilterAlphaFlag) {
                that.FilterAlpha = fEffectValue
            }

            if (ParamFlag == that.CRDBStrengthFlag) {
                that.CRDBStrengthValue = fEffectValue
            }

            if (ParamFlag == that.CRDBRadiusFlag) {
                that.CRDBRadiusValue = fEffectValue
            }

            if (ParamFlag == that.CRDBDetailFlag) {
                that.CRDBDetailValue = fEffectValue
            }
        }
        that.hslJson = hlsAry

        const effect = effects.find((item: any) => item.EffectName && item.EffectName === 'Filter')
        if (effect) {
            that.FilterPath = effect.Path
        }

        return that
    }

    static initFromJsonArray(jsonArr: any): PalettePresetCfgModel[] {
        let models: PalettePresetCfgModel[] = []
        if (jsonArr == null || jsonArr === undefined) {
            return models
        }

        for (let i = 0; i < jsonArr.length; i++) {
            let json = jsonArr[i]
            let obj = PalettePresetCfgModel.initFromJson(json)
            if (obj)
                models.push(obj)
        }
        return models
    }


    static initFromJson(json: any): Optional<PalettePresetCfgModel> {
        if (!json) {
            console.warn('PalettePresetCfgModel initFromJson is error, json: ', json)
            return json
        }
        //   console.log('PalettePresettingItemModel initFromJson : ', json)
        let defaultItem = PalettePresetCfgModel.default()
        let obj = new PalettePresetCfgModel()
        obj.id = json.extendId || json.id
        obj.extendId = json.extendId || json.id
        obj.userId = json.userId
        obj.sourceType = json.sourceType
        obj.update_time = json.update_time
        obj.created_time = json.created_time
        obj.version = json.version
        obj.thumbnailId = json.thumbnailId
        obj.projectId = json.projectId

        obj.ColorTemperatureRelativeValue = json.ColorTemperatureRelativeValue != undefined ? json.ColorTemperatureRelativeValue : defaultItem.ColorTemperatureRelativeValue
        obj.ColorTemperatureValue = json.ColorTemperatureValue != undefined ? json.ColorTemperatureValue : defaultItem.ColorTemperatureValue

        obj.HueRelativeValue = json.HueRelativeValue != undefined ? json.HueRelativeValue : defaultItem.HueRelativeValue
        obj.HueValue = json.HueValue != undefined ? json.HueValue : defaultItem.HueValue

        obj.ExposureValue = json.ExposureValue != undefined ? json.ExposureValue : defaultItem.ExposureValue

        obj.ContrastValue = json.ContrastValue != undefined ? json.ContrastValue : defaultItem.ContrastValue

        obj.HighlightValue = json.HighlightValue != undefined ? json.HighlightValue : defaultItem.HighlightValue

        obj.ShadowValue = json.ShadowValue != undefined ? json.ShadowValue : defaultItem.ShadowValue

        obj.WhiteValue = json.WhiteValue != undefined ? json.WhiteValue : defaultItem.WhiteValue

        obj.BlackValue = json.BlackValue != undefined ? json.BlackValue : defaultItem.BlackValue

        obj.CameraRawSharpenValue = json.CameraRawSharpenValue != undefined ? json.CameraRawSharpenValue : defaultItem.CameraRawSharpenValue

        obj.SaturationValue = json.SaturationValue != undefined ? json.SaturationValue : defaultItem.SaturationValue

        obj.EnhanceEditCameraRawVibranceValue = json.EnhanceEditCameraRawVibranceValue != undefined ? json.EnhanceEditCameraRawVibranceValue : defaultItem.EnhanceEditCameraRawVibranceValue

        try {
            obj.hslJson = JSON.parse(json.hslJson)
        } catch (e) {
            console.error(e)
        }

        obj.FilterAlpha = typeof json.FilterAlpha === 'number' ? json.FilterAlpha : defaultItem.FilterAlpha
        obj.FilterPath = typeof json.FilterPath === 'string' ? json.FilterPath : defaultItem.FilterPath
        obj.CRDBStrengthValue = typeof json.CRDBStrengthValue === 'number' ? json.CRDBStrengthValue : defaultItem.CRDBStrengthValue
        obj.CRDBRadiusValue = typeof json.CRDBRadiusValue === 'number' ? json.CRDBRadiusValue : defaultItem.CRDBRadiusValue
        obj.CRDBDetailValue = typeof json.CRDBDetailValue === 'number' ? json.CRDBDetailValue : defaultItem.CRDBDetailValue

        return obj
    }

    createLink(thumbnailId: number, projectId: number): void {
        this.thumbnailId = thumbnailId
        this.projectId = projectId
    }

    // 素材资源文件所在路径
    async resPath(): Promise<string> {
        return await path.joinResourcesPath('effect/config')
    }

    createParamsJson(): Array<any> {
        return [
            {
                ParamFlag: this.ColorTemperatureParamFlag,
                fEffectValue: this.ColorTemperatureValue
            },
            {
                ParamFlag: TEMPERATURE_KEY, //相对值
                fEffectValue: this.ColorTemperatureRelativeValue
            },
            {
                ParamFlag: this.HueParamFlag,
                fEffectValue: this.HueValue
            },
            {
                ParamFlag: HUE_KEY,
                fEffectValue: this.HueRelativeValue
            },
            {
                ParamFlag: this.ExposureParamFlag,
                fEffectValue: this.ExposureValue
            },
            {
                ParamFlag: this.ContrastParamFlag,
                fEffectValue: this.ContrastValue
            },
            {
                ParamFlag: this.HighlightParamFlag,
                fEffectValue: this.HighlightValue
            },
            {
                ParamFlag: this.ShadowParamFlag,
                fEffectValue: this.ShadowValue
            },
            {
                ParamFlag: this.WhiteParamFlag,
                fEffectValue: this.WhiteValue
            },
            {
                ParamFlag: this.BlackParamFlag,
                fEffectValue: this.BlackValue
            },
            {
                ParamFlag: this.CameraRawSharpenParamFlag,
                fEffectValue: this.CameraRawSharpenValue
            },
            {
                ParamFlag: this.SaturationParamFlag,
                fEffectValue: this.SaturationValue
            },
            {
                ParamFlag: this.EnhanceEditCameraRawVibranceFlag,
                fEffectValue: this.EnhanceEditCameraRawVibranceValue
            },
            ...this.hslJson,
            {
                ParamFlag: this.FilterAlphaFlag,
                fEffectValue: this.FilterAlpha
            },
            {
                ParamFlag: this.CRDBStrengthFlag,
                fEffectValue: this.CRDBStrengthValue
            },
            {
                ParamFlag: this.CRDBRadiusFlag,
                fEffectValue: this.CRDBRadiusValue
            },
            {
                ParamFlag: this.CRDBDetailFlag,
                fEffectValue: this.CRDBDetailValue
            }
        ]
    }

    toCfgJson(): any {
        const Effects = [
            {
                'EffectName': 'Filter',
                'Order': 40,
                'Path': this.FilterPath || '',
                'ProcMode': 'MagicGPU',
                'ParamFlags': [300],
                'NoneEffectParams': [0]
            }
        ]

        const Params = this.createParamsJson()

        return { Effects, Params }
    }

    createToDbArray(): Array<any> {
        const tempArray = []

        tempArray.push({ key: 'ColorTemperatureValue', value: this.ColorTemperatureValue })
        tempArray.push({ key: 'ColorTemperatureRelativeValue', value: this.ColorTemperatureRelativeValue })
        tempArray.push({ key: 'HueValue', value: this.HueValue })
        tempArray.push({ key: 'HueRelativeValue', value: this.HueRelativeValue })
        tempArray.push({ key: 'ExposureValue', value: this.ExposureValue })
        tempArray.push({ key: 'ContrastValue', value: this.ContrastValue })
        tempArray.push({ key: 'HighlightValue', value: this.HighlightValue })
        tempArray.push({ key: 'ShadowValue', value: this.ShadowValue })
        tempArray.push({ key: 'WhiteValue', value: this.WhiteValue })
        tempArray.push({ key: 'BlackValue', value: this.BlackValue })
        tempArray.push({ key: 'SaturationValue', value: this.SaturationValue })
        tempArray.push({ key: 'EnhanceEditCameraRawVibranceValue', value: this.EnhanceEditCameraRawVibranceValue })
        tempArray.push({ key: 'CameraRawSharpenValue', value: this.CameraRawSharpenValue })

        tempArray.push({ key: 'hslJson', value: JSON.stringify(this.hslJson) })

        tempArray.push({ key: 'FilterAlpha', value: this.FilterAlpha })
        tempArray.push({ key: 'FilterPath', value: this.FilterPath })
        tempArray.push({ key: 'CRDBStrengthValue', value: this.CRDBStrengthValue })
        tempArray.push({ key: 'CRDBRadiusValue', value: this.CRDBRadiusValue })
        tempArray.push({ key: 'CRDBDetailValue', value: this.CRDBDetailValue })

        return tempArray
    }
}
