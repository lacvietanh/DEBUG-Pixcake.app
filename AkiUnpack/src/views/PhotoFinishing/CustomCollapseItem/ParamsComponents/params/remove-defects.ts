import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import { formatAllPersonType, showInAllTypes } from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/utils'

export default [
    {
        name: '祛斑祛痘',
        key: EffectParamEnum.Spotless,
        value: 0,
        // cType: 'switch',
        // max: 1,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '祛痣',
        key: EffectParamEnum.RemoveNevus,
        value: 0,
        cType: 'switch',
        max: 1,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '身体祛瑕疵',
        key: EffectParamEnum.SpotlessBody,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '祛抬头纹',
        key: EffectParamEnum.RemoveForeheadLines,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '祛眼周纹',
        key: EffectParamEnum.RemoveEyeLines,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '祛黑眼圈',
        key: EffectParamEnum.LightenPouch,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        tip: ['祛黑眼圈通过AI智能识别眼部色素沉', '着对其做充分的祛除。为保证祛除效', '果更自然，滑动滑竿时AI会自动根据', '眼部色素情况判断效果生效程度。']
    },
    {
        name: '祛法令纹',
        key: EffectParamEnum.TearTrough,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        tip: ['祛法令纹通过AI智能识别鼻翼两侧暗', '沉对其进行淡化，填充鼻基底，让脸', '部看起来更年轻。为保证淡化效果更', '自然，滑动滑竿时AI会自动根据纹路', '暗沉情况判断效果生效程度。']
    },
    {
        name: '祛颈纹',
        key: EffectParamEnum.RemoveNeckLines,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes
    },
    {
        name: '祛双下巴',
        key: EffectParamEnum.RemoveDoubleChin,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        tip: ['去双下巴通过AI智能识别下巴轮廓，', '达到去除双下巴的同时保留正常脸', '型的效果。同时开启祛颈纹功能，', '整体效果更好噢～'],
        line: (data: any): boolean => {
            const value = data[EffectParamEnum.StretchMark]
            return value === 1
        }
    },
    {
        name: '祛妊娠纹',
        key: EffectParamEnum.StretchMark,
        cType: 'switch',
        value: 0,
        showType: ['Female']
    },
    {
        name: '祛妊娠线',
        key: EffectParamEnum.StretchMarkLine,
        value: 100,
        showType: ['Female'],

        visible: (data: any): boolean => {
            const value = data[EffectParamEnum.StretchMark]
            return (value === 1)
        }
    }
]
