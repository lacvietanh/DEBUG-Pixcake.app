import {
    DefaultIdPhotoType, FixedRatioType,
    idPhotoTypes,
    RatioType,
    recommendRadioOptions,
    recommendRadioTypes
} from '@/constants/crop-types'
import { ICropJson } from '@/qt-ipc/types/refine'
import { ICropObject } from '@/types/refine'
import { limitToPrecision } from '@/utils/tsMath'
import { CropType } from '@/constants/refine'

export enum Unit {
    Pix = 1,
    Cm = 2
}

export default class CropModel {
    // 裁剪类型
    type: CropType = CropType.Radio

    // 推荐证件照类型
    pType: number = 0

    // 证件照尺寸
    width: number = 0
    height: number = 0

    // 证件照单位
    unit: number = Unit.Cm

    // dpi
    dpi: number = 0

    constructor(json?: ICropJson) {
        if (json) {
            this.sync(json)
        }
    }

    // 检测当前比例是否为推荐比例
    static checkHasRecommendRatio(width: number, height: number): number {
        const obj = recommendRadioOptions.find(item => item.valid && item.valid.includes(`${ width }:${ height }`))
        if (obj) {
            return obj.type
        }
        return FixedRatioType
    }

    // View视图 选择类型转换为 CropType
    static translateType(type: number): CropType {
        let temp = CropType.Default

        if ([FixedRatioType, ...recommendRadioTypes].includes(type)) {
            temp = CropType.FixedRatio
        } else if (idPhotoTypes.includes(type)) {
            temp = CropType.RecommendIdPhoto
        } else if (DefaultIdPhotoType === type) {
            temp = CropType.DefaultIdPhoto
        } else if (RatioType === type) {
            temp = CropType.Radio
        }

        return temp
    }

    // CropType 转换为 View视图 使用的类型
    static translateTypeToComponent(type: CropType, pType: number, w: number, h: number): number {
        let temp: CropType = type

        if (type === CropType.DefaultIdPhoto) {
            temp = DefaultIdPhotoType
        } else if (type === CropType.FixedRatio) {
            temp = CropModel.checkHasRecommendRatio(w, h)
        } else if (type === CropType.RecommendIdPhoto) {
            temp = pType
        } else if (type === CropType.Radio) {
            temp = RatioType
        }

        return temp
    }

    hasEffect(): boolean {
        return !(this.type === CropType.Radio && this.width === 0 && this.height === 0)
    }

    setRatio(data: { width: number, height: number }): void {
        if (data.width) {
            this.width = limitToPrecision(data.width, 3)
        }

        if (data.height) {
            this.height = limitToPrecision(data.height, 3)
        }
    }

    /**
     * 切换裁剪类型
     * （需重置比例交换为自动识别）
     */
    setData(data: ICropObject): this {
        const { type, width, height, dpi, unit } = data
        this.type = CropModel.translateType(type)

        // 推荐证件照类型时，记录证件照类型
        if (this.type === CropType.RecommendIdPhoto) {
            this.pType = type
        }

        this.width = Number(width) || 0
        this.height = Number(height) || 0

        if ([CropType.RecommendIdPhoto, CropType.DefaultIdPhoto].includes(this.type)) {
            this.dpi = dpi
            this.unit = unit
        }

        return this
    }

    // 提取qt文件需要使用的json
    toJson(): ICropJson {
        const type = this.type

        if (type === CropType.Default) {
            return { type }
        } else if ([CropType.DefaultIdPhoto, CropType.RecommendIdPhoto].includes(type)) {
            const obj: ICropJson = {
                type,
                w: this.width + '',
                h: this.height + '',
                dpi: this.dpi,
                unit: this.unit
            }

            if (obj.type === CropType.RecommendIdPhoto) {
                obj.pid = this.pType
            }

            return obj
        } else {
            return {
                type,
                w: this.width + '',
                h: this.height + '',
            }
        }
    }

    // 从qt的json同步数据
    sync(json: ICropJson): this {
        const { type, pid, unit, w, h, dpi } = json

        if (type === CropType.RecommendIdPhoto) {
            this.pType = pid || 0
        }

        this.type = type
        this.unit = unit || Unit.Cm
        this.width = Number(w) || 0
        this.height = Number(h) || 0
        this.dpi = dpi || 0
        return this
    }

    // 转换为View视图需要使用的数据
    toComponent(): ICropObject {
        return {
            type: CropModel.translateTypeToComponent(this.type, this.pType, this.width, this.height),
            dpi: this.dpi,
            unit: this.unit,
            width: this.width,
            height: this.height
        }
    }
}
