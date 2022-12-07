/*
* HSL
* */

import { formatColorParams } from '../utils'
import { EffectParamEnum, EffectParamHslColor } from '@/constants/presetParams/ParamEnum'
import { RealtimeType } from '@/constants/constants'

const realtime = RealtimeType.AlwaysEnable

const red = 'rgb(247, 25, 25)'
const orange = 'rgb(250, 95, 0)'
const yellow = 'rgb(255, 255, 0)'
const green = 'rgb(0, 225, 0)'
const cyan = 'rgb(0, 209, 217)'
const blue = 'rgb(42, 71, 241)'
const purple = 'rgb(145, 0, 235)'
const magenta = 'rgb(245, 0, 220)'
const gray = 'rgb(128, 128, 128)'
const black = 'rgb(0, 0, 0)'
const white = 'rgb(255, 255, 255)'

const customColor = {
    EnhanceEditHSLHue: {
        [EffectParamHslColor.Red]: `linear-gradient(to right, ${ magenta }, ${ red }, ${ orange })`,
        [EffectParamHslColor.Orange]: `linear-gradient(to right, ${ red }, ${ orange }, ${ yellow })`,
        [EffectParamHslColor.Yellow]: `linear-gradient(to right, ${ orange }, ${ yellow }, ${ green })`,
        [EffectParamHslColor.Green]: `linear-gradient(to right, ${ yellow }, ${ green }, ${ cyan })`,
        [EffectParamHslColor.Cyan]: `linear-gradient(to right, ${ green }, ${ cyan }, ${ blue })`,
        [EffectParamHslColor.Blue]: `linear-gradient(to right, ${ cyan }, ${ blue }, ${ purple })`,
        [EffectParamHslColor.Purple]: `linear-gradient(to right, ${ blue }, ${ purple }, ${ magenta })`,
        [EffectParamHslColor.Magenta]: `linear-gradient(to right,  ${ purple }, ${ magenta }, ${ red })`
    },
    EnhanceEditHSLSaturation: {
        [EffectParamHslColor.Red]: `linear-gradient(to right, ${ gray }, ${ red })`,
        [EffectParamHslColor.Orange]: `linear-gradient(to right, ${ gray }, ${ orange })`,
        [EffectParamHslColor.Yellow]: `linear-gradient(to right, ${ gray }, ${ yellow })`,
        [EffectParamHslColor.Green]: `linear-gradient(to right, ${ gray }, ${ green })`,
        [EffectParamHslColor.Cyan]: `linear-gradient(to right, ${ gray }, ${ cyan })`,
        [EffectParamHslColor.Blue]: `linear-gradient(to right, ${ gray }, ${ blue })`,
        [EffectParamHslColor.Purple]: `linear-gradient(to right, ${ gray }, ${ purple })`,
        [EffectParamHslColor.Magenta]: `linear-gradient(to right, ${ gray }, ${ magenta })`
    },
    EnhanceEditHSLLightness: {
        [EffectParamHslColor.Red]: `linear-gradient(to right, ${ black }, ${ red }, ${ white })`,
        [EffectParamHslColor.Orange]: `linear-gradient(to right, ${ black }, ${ orange }, ${ white })`,
        [EffectParamHslColor.Yellow]: `linear-gradient(to right, ${ black }, ${ yellow }, ${ white })`,
        [EffectParamHslColor.Green]: `linear-gradient(to right, ${ black }, ${ green }, ${ white })`,
        [EffectParamHslColor.Cyan]: `linear-gradient(to right, ${ black }, ${ cyan }, ${ white })`,
        [EffectParamHslColor.Blue]: `linear-gradient(to right, ${ black }, ${ blue }, ${ white })`,
        [EffectParamHslColor.Purple]: `linear-gradient(to right, ${ black }, ${ purple }, ${ white })`,
        [EffectParamHslColor.Magenta]: `linear-gradient(to right,  ${ black }, ${ magenta }, ${ white })`
    }
}

const colorList = [
    {
        name: '红色',
        key: EffectParamHslColor.Red,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    },
    {
        name: '橙色',
        key: EffectParamHslColor.Orange,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    },
    {
        name: '黄色',
        key: EffectParamHslColor.Yellow,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    },
    {
        name: '绿色',
        key: EffectParamHslColor.Green,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    },
    {
        name: '浅绿色',
        key: EffectParamHslColor.Cyan,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    },
    {
        name: '蓝色',
        key: EffectParamHslColor.Blue,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    },
    {
        name: '紫色',
        key: EffectParamHslColor.Purple,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    },
    {
        name: '洋红色',
        key: EffectParamHslColor.Magenta,
        min: -100,
        cType: 'ts-slider',
        cStyle: {
            runwayStyle: {},
            barStyle: {
                left: { background: 'transparent' },
                right: { background: 'transparent' }
            },
            button: { borderColor: '#B9B8B8' }
        },
        realtime,
        value: 0
    }
]

export default [
    {
        name: 'HSL分组',
        key: 'GroupHsl',
        cType: 'group',
        value: 'Hue',
        filter: true,
        children: [
            {
                id: 'Hue',
                label: '色相',
                data: [
                    ...formatColorParams(colorList, EffectParamEnum.EnhanceEditHSLHue, customColor)
                ]
            },
            {
                id: 'Saturation',
                label: '饱和度',
                data: [
                    ...formatColorParams(colorList, EffectParamEnum.EnhanceEditHSLSaturation, customColor)
                ]
            },
            {
                id: 'Lightness',
                label: '明亮度',
                data: [
                    ...formatColorParams(colorList, EffectParamEnum.EnhanceEditHSLLightness, customColor)
                ]
            }
        ]
    }
]
