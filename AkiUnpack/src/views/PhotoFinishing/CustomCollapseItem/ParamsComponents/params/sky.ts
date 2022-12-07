import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'

export const getSkyParams = (data: any ) => {
    let haveSky = data.sky
    let haveWater = data.water
    let haveBody = data.body

    return [
        {
            cType: 'slot',
            slotName: 'idPhotoSky'
        },
        {
            title: '天空调整',
            name: '边缘过渡',
            key: EffectParamEnum.SkyEdgeTransition,
            value: 0,
            disabled: !haveSky
        },
        {
            name: '色温',
            key: EffectParamEnum.SkyTemp,
            min: -100,
            max: 100,
            step: 1,
            disabled: !haveSky,
            cStyle: {
                runwayStyle: {
                    background: `linear-gradient(63.44deg, #2C2B9F 16.67%, #DEDD65 83.33%)`
                },
                barStyle: {
                    left: {background: 'transparent'},
                    right: {background: 'transparent'}
                }
            }
        },
        {
            name: '饱和度',
            key: EffectParamEnum.SkySaturation,
            min: -100,
            max: 100,
            step: 1,
            value: 0,
            disabled: !haveSky
        },
        {
            name: '亮度',
            key: EffectParamEnum.SkyBrightness,
            min: -100,
            max: 100,
            step: 1,
            value: 0,
            disabled: !haveSky
        },
        {
            name: '虚化',
            key: EffectParamEnum.SkyVague,
            value: 0,
            disabled: !haveSky
        },
        {
            name: '水平翻转天空',
            key: EffectParamEnum.SkyFlip,
            value: false,
            cType: 'switch',
            disabled: !haveSky
        },
        {
            title: '人景调整',
            name: '景物色彩（偏向天空）',
            key: EffectParamEnum.SkySceneryColor,
            min: -100,
            max: 100,
            step: 1,
            value: 0,
            disabled: !haveSky
        },
        {
            name: '人物色彩（偏向天空)',
            key: EffectParamEnum.SkyCharacterColor,
            min: -100,
            max: 100,
            step: 1,
            value: 0,
            disabled: !(haveSky && haveBody)
        },
        {
            title: '水面调整',
            name: '景物反射',
            key: EffectParamEnum.SkyWaterReflex,
            min: -100,
            max: 100,
            step: 1,
            value: 0,
            disabled: !(haveSky && haveWater),
            titleTip: '给水面加上天空倒影，可控制倒影程度和虚化程度'
        },
        {
            name: '景物水效虚化',
            key: EffectParamEnum.SkyWaterVague,
            value: 0,
            disabled: !(haveSky && haveWater)
        },
    ]
}