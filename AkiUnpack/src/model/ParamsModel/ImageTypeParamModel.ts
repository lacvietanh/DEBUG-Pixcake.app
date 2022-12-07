import ParamModel from './ParamModel'
import { Config } from './ParamBaseModel'
import { ImageType } from '@/universal/types/constants'

export type ImageTypeConfig = Config & {
    imageType: number
}

export default class ImageTypeParamModel extends ParamModel {
    imageType: number

    constructor(param: string, config: ImageTypeConfig) {
        const { min, max, value, intPrecision } = config

        super(param, { min, max, value, intPrecision })

        this.imageType = config.imageType
    }

    get isRaw() {
        return ImageType.Raw === this.imageType
    }
}
