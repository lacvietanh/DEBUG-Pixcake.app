import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import {
    calcJpgWhiteBalanceCCTValue,
    calcJpgWhiteBalanceCCTValueToNormalizedValue,
    calcJpgWhiteBalanceTintValue,
    calcJpgWhiteBalanceTintValueToNormalizedValue,
    calcRawWhiteBalanceCCTValue,
    calcRawWhiteBalanceCCTValueToNormalizedValue,
    calcRawWhiteBalanceTintValue,
    calcRawWhiteBalanceTintValueToNormalizedValue
    // @ts-ignore
} from '@/views/BatchRetouch/Palette/config/PaletteCalcUtils'
import { RealtimeType } from '@/constants/constants'

const realtime = RealtimeType.AlwaysEnable

export const getBaseParams = (imageType: string, baseValue: { oriWbICC: number, oriWbTint: number, loaded: boolean } = {
    oriWbICC: 0,
    oriWbTint: 0,
    loaded: false
}): any => {
    const params = []
    const cct = {
        name: '色温',
        cType: 'ts-slider',
        key: EffectParamEnum.EnhanceEditColorTemperature,
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.005,
        realtime,
        cStyle: {
            runwayStyle: {
                background: `linear-gradient(to right, #2c2b9f, #dedd6d)`
            },
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            }
        },

        formatValue: function (value?: number) {
            const v = value || this.value
            if (imageType === 'raw') {
                return baseValue.loaded ? calcRawWhiteBalanceCCTValue(v, 0.5, baseValue.oriWbICC) : '-'
            } else {
                return calcJpgWhiteBalanceCCTValue(v, 0.5)
            }
        },
        getRealValue: function (value: number) {
            if (imageType === 'raw') {
                return calcRawWhiteBalanceCCTValueToNormalizedValue(value)
            } else {
                return calcJpgWhiteBalanceCCTValueToNormalizedValue(value)
            }
        }
    }

    const hue = {
        name: '色调',
        key: EffectParamEnum.EnhanceEditHue,
        cType: 'ts-slider',
        // precise: true,
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.005,
        realtime,
        cStyle: {
            runwayStyle: {
                background: `linear-gradient(to right, #559e41, #863a8c)`
            },
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            }
        },
        formatValue: function (value?: number) {
            const v = value || this.value
            if (imageType === 'raw') {
                return baseValue.loaded ? calcRawWhiteBalanceTintValue(v, 0.5, baseValue.oriWbTint) : '-'
            } else {
                return calcJpgWhiteBalanceTintValue(v, 0.5)
            }
        },
        getRealValue: function (value: number) {
            if (imageType === 'raw') {
                return calcRawWhiteBalanceTintValueToNormalizedValue(value)
            } else {
                return calcJpgWhiteBalanceTintValueToNormalizedValue(value)
            }
        }
    }

    params.push(cct)
    params.push(hue)

    return params
}

export default getBaseParams
