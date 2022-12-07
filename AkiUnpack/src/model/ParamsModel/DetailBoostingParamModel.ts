import ImageTypeParamModel from '@/model/ParamsModel/ImageTypeParamModel'
import {
    calcJpegCRDBValueX2Y, calcJpegCRDBValueY2X,
    calcRawCRDBValueX2Y, calcRawCRDBValueY2X
// @ts-ignore
} from '@/views/BatchRetouch/Palette/config/PaletteCalcUtils'

export default class DetailBoostingParamModel extends ImageTypeParamModel {

    getFloat2Int(floatValue: number): any {
        if (this.isRaw) {
            // @ts-ignore
            return calcRawCRDBValueX2Y(floatValue)
        } else {
            // @ts-ignore
            return calcJpegCRDBValueX2Y(floatValue)
        }
    }

    getInt2Float(value: number): any {
        if (this.isRaw) {
            // @ts-ignore
            return calcRawCRDBValueY2X(value).toStrip()
        } else {
            // @ts-ignore
            return calcJpegCRDBValueY2X(value).toStrip()
        }
    }
}
