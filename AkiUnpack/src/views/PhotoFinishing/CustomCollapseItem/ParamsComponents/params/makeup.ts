import { formatAllPersonType, formatPersonParamsGroup } from '../utils'
import { EffectNameEnum, EffectParamEnum, EffectParamPersonTypeValue } from '@/constants/presetParams/ParamEnum'
import {
    IComponentParamAfter,
    IPersonType,
    IRealtimeKeys
} from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/types'
import PersonParamModel from '@/model/ParamsModel/PersonParamModel'
import PersonEffectItemModel from '@/model/EffectsModel/PersonEffectItemModel'
import { RealtimeType } from '@/constants/constants'

const realtime = RealtimeType.EnableByGpu

const makeup = [
    {
        name: '高光立体',
        key: EffectParamEnum.FacialStereo3DLight,
        value: 0,
        personType: formatAllPersonType,
        showType: formatAllPersonType,
        realtime
    },
    {
        name: '阴影立体',
        key: EffectParamEnum.FacialStereo3DShadow,
        value: 0,
        personType: formatAllPersonType,
        showType: formatAllPersonType,
        realtime
    },
    {
        name: '眼妆增强',
        key: EffectParamEnum.MakeupEnhanceEye,
        value: 0,
        personType: formatAllPersonType,
        showType: formatAllPersonType,
        realtime
    },
    {
        name: '唇妆增强',
        key: EffectParamEnum.MakeupEnhanceMouth,
        value: 0,
        personType: formatAllPersonType,
        showType: formatAllPersonType,
        realtime
    }
]

const makeupGroup = formatPersonParamsGroup(makeup)

const makeupSuit = [
    {
        id: 1,
        label: '主题妆容',
        key: EffectParamEnum.SuitMakeup,
        effectKey: EffectNameEnum.MakeupSuit,
        isMainItem: true,
        value: 0,
        children: [
            {
                id: 0,
                name: '',
                path: '',
                iconPath: './static/makeupIcons/makeup_icon_disable@3x.png',
                defaultValue: 0
            },
            {
                id: 1,
                name: '伪素颜',
                path: 'Makeups/Suit/MU00000001',
                iconPath: './static/makeupIcons/suit_fakemakeup.png',
                defaultValue: 80
            },
            {
                id: 2,
                name: '韩系',
                path: 'Makeups/Suit/MU00000003',
                iconPath: './static/makeupIcons/suit_korea.png',
                defaultValue: 80
            },
            {
                id: 3,
                name: '甜美',
                path: 'Makeups/Suit/MU00000005',
                iconPath: './static/makeupIcons/suit_sweet.png',
                defaultValue: 80
            },
            {
                id: 4,
                name: '日系',
                path: 'Makeups/Suit/MU00000002',
                iconPath: './static/makeupIcons/suit_japenese.png',
                defaultValue: 80
            },
            {
                id: 5,
                name: '复古',
                path: 'Makeups/Suit/MU00000004',
                iconPath: './static/makeupIcons/suit_classic.png',
                defaultValue: 80
            },
            {
                id: 6,
                name: '欧美',
                path: 'Makeups/Suit/MU00000006',
                iconPath: './static/makeupIcons/suit_europe.png',
                defaultValue: 80
            },
            {
                id: 7,
                name: '锦鲤妆',
                new: './static/makeupIcons/makeup_icon_new-lable@3x.png',
                path: 'Makeups/Suit/MU00000007',
                iconPath: './static/makeupIcons/suit_brocadecarp.png',
                defaultValue: 80
            },
            {
                id: 8,
                name: '千金妆',
                new: './static/makeupIcons/makeup_icon_new-lable@3x.png',
                path: 'Makeups/Suit/MU00000008',
                iconPath: './static/makeupIcons/suit_daughter.png',
                defaultValue: 80
            }
        ]
    },
    {
        id: 2,
        label: '眉毛',
        key: EffectParamEnum.EyebrowMakeup,
        effectKey: EffectNameEnum.Eyebrow,
        customBtnTextStyle: { width: '22px', display: 'inline-block' },
        value: 0,
        children: [
            {
                id: 0,
                name: '',
                path: '',
                iconPath: './static/makeupIcons/makeup_icon_disable@3x.png',
                defaultValue: 0
            },
            {
                id: 1,
                name: '01',
                path: 'Makeups/Eyebrow/MUEB00000001',
                iconPath: './static/makeupIcons/eyebrow_01@3x.png',
                defaultValue: 70
            },
            {
                id: 2,
                name: '02',
                path: 'Makeups/Eyebrow/MUEB00000002',
                iconPath: './static/makeupIcons/eyebrow_02@3x.png',
                defaultValue: 70
            },
            {
                id: 3,
                name: '03',
                path: 'Makeups/Eyebrow/MUEB00000003',
                iconPath: './static/makeupIcons/eyebrow_03@3x.png',
                defaultValue: 70
            },
            {
                id: 4,
                name: '04',
                path: 'Makeups/Eyebrow/MUEB00000004',
                iconPath: './static/makeupIcons/eyebrow_04@3x.png',
                defaultValue: 70
            },
            {
                id: 5,
                name: '05',
                path: 'Makeups/Eyebrow/MUEB00000005',
                iconPath: './static/makeupIcons/eyebrow_05@3x.png',
                defaultValue: 70
            },
            {
                id: 6,
                name: '06',
                path: 'Makeups/Eyebrow/MUEB00000006',
                iconPath: './static/makeupIcons/eyebrow_06@3x.png',
                defaultValue: 70
            }
        ]
    },
    {
        id: 3,
        label: '眼妆',
        key: EffectParamEnum.EyeMakeup,
        effectKey: EffectNameEnum.Eyemakeup,
        customBtnTextStyle: { width: '22px', display: 'inline-block' },
        value: 0,
        children: [
            {
                id: 0,
                name: '',
                path: '',
                iconPath: './static/makeupIcons/makeup_icon_disable@3x.png',
                defaultValue: 0
            },
            {
                id: 1,
                name: '01',
                path: 'Makeups/Eyemakeup/MUEM00000001',
                iconPath: './static/makeupIcons/eye_makeup_01@3x.png',
                defaultValue: 70
            },
            {
                id: 2,
                name: '02',
                path: 'Makeups/Eyemakeup/MUEM00000002',
                iconPath: './static/makeupIcons/eye_makeup_02@3x.png',
                defaultValue: 70
            },
            {
                id: 3,
                name: '03',
                path: 'Makeups/Eyemakeup/MUEM00000003',
                iconPath: './static/makeupIcons/eye_makeup_03@3x.png',
                defaultValue: 70
            },
            {
                id: 4,
                name: '04',
                path: 'Makeups/Eyemakeup/MUEM00000004',
                iconPath: './static/makeupIcons/eye_makeup_04@3x.png',
                defaultValue: 70
            },
            {
                id: 5,
                name: '05',
                path: 'Makeups/Eyemakeup/MUEM00000005',
                iconPath: './static/makeupIcons/eye_makeup_05@3x.png',
                defaultValue: 70
            },
            {
                id: 6,
                name: '06',
                path: 'Makeups/Eyemakeup/MUEM00000006',
                iconPath: './static/makeupIcons/eye_makeup_06@3x.png',
                defaultValue: 70
            }
        ]
    },
    {
        id: 4,
        label: '睫毛',
        key: EffectParamEnum.EyelashMakeup,
        effectKey: EffectNameEnum.Eyelash,
        customBtnTextStyle: { width: '22px', display: 'inline-block' },
        value: 0,
        children: [
            {
                id: 0,
                name: '',
                path: '',
                iconPath: './static/makeupIcons/makeup_icon_disable@3x.png',
                defaultValue: 0
            },
            {
                id: 1,
                name: '01',
                path: 'Makeups/Eyelash/MUEL00000001',
                iconPath: './static/makeupIcons/eyelash_01@3x.png',
                defaultValue: 70
            },
            {
                id: 2,
                name: '02',
                path: 'Makeups/Eyelash/MUEL00000002',
                iconPath: './static/makeupIcons/eyelash_02@3x.png',
                defaultValue: 70
            },
            {
                id: 3,
                name: '03',
                path: 'Makeups/Eyelash/MUEL00000003',
                iconPath: './static/makeupIcons/eyelash_03@3x.png',
                defaultValue: 70
            },
            {
                id: 4,
                name: '04',
                path: 'Makeups/Eyelash/MUEL00000004',
                iconPath: './static/makeupIcons/eyelash_04@3x.png',
                defaultValue: 70
            },
            {
                id: 5,
                name: '05',
                path: 'Makeups/Eyelash/MUEL00000005',
                iconPath: './static/makeupIcons/eyelash_05@3x.png',
                defaultValue: 70
            },
            {
                id: 6,
                name: '06',
                path: 'Makeups/Eyelash/MUEL00000006',
                iconPath: './static/makeupIcons/eyelash_06@3x.png',
                defaultValue: 70
            }
        ]
    },
    {
        id: 5,
        label: '腮红',
        key: EffectParamEnum.BlusherMakeup,
        effectKey: EffectNameEnum.Blusher,
        customBtnTextStyle: { width: '22px', display: 'inline-block' },
        value: 0,
        children: [
            {
                id: 0,
                name: '',
                path: '',
                iconPath: './static/makeupIcons/makeup_icon_disable@3x.png',
                defaultValue: 0
            },
            {
                id: 1,
                name: '01',
                path: 'Makeups/Blusher/MUBL00000001',
                iconPath: './static/makeupIcons/blush_01@3x.png',
                defaultValue: 50
            },
            {
                id: 2,
                name: '02',
                path: 'Makeups/Blusher/MUBL00000002',
                iconPath: './static/makeupIcons/blush_02@3x.png',
                defaultValue: 50
            },
            {
                id: 3,
                name: '03',
                path: 'Makeups/Blusher/MUBL00000003',
                iconPath: './static/makeupIcons/blush_03@3x.png',
                defaultValue: 50
            },
            {
                id: 4,
                name: '04',
                path: 'Makeups/Blusher/MUBL00000004',
                iconPath: './static/makeupIcons/blush_04@3x.png',
                defaultValue: 50
            },
            {
                id: 5,
                name: '05',
                path: 'Makeups/Blusher/MUBL00000005',
                iconPath: './static/makeupIcons/blush_05@3x.png',
                defaultValue: 50
            },
            {
                id: 6,
                name: '06',
                path: 'Makeups/Blusher/MUBL00000006',
                iconPath: './static/makeupIcons/blush_06@3x.png',
                defaultValue: 50
            }
        ]
    },
    {
        id: 6,
        label: '口红',
        key: EffectParamEnum.LipMakeup,
        effectKey: EffectNameEnum.Lipstick,
        customBtnTextStyle: { width: '22px', display: 'inline-block' },
        value: 0,
        children: [
            {
                id: 0,
                name: '',
                path: '',
                iconPath: './static/makeupIcons/makeup_icon_disable@3x.png',
                defaultValue: 0
            },
            {
                id: 1,
                name: '01',
                path: 'Makeups/Lipstick/MULS00000001',
                iconPath: './static/makeupIcons/lipstick_01@3x.png',
                defaultValue: 50
            },
            {
                id: 2,
                name: '02',
                path: 'Makeups/Lipstick/MULS00000002',
                iconPath: './static/makeupIcons/lipstick_02@3x.png',
                defaultValue: 50
            },
            {
                id: 3,
                name: '03',
                path: 'Makeups/Lipstick/MULS00000003',
                iconPath: './static/makeupIcons/lipstick_03@3x.png',
                defaultValue: 50
            },
            {
                id: 4,
                name: '04',
                path: 'Makeups/Lipstick/MULS00000004',
                iconPath: './static/makeupIcons/lipstick_04@3x.png',
                defaultValue: 50
            },
            {
                id: 5,
                name: '05',
                path: 'Makeups/Lipstick/MULS00000005',
                iconPath: './static/makeupIcons/lipstick_05@3x.png',
                defaultValue: 50
            },
            {
                id: 6,
                name: '06',
                path: 'Makeups/Lipstick/MULS00000006',
                iconPath: './static/makeupIcons/lipstick_06@3x.png',
                defaultValue: 50
            }
        ]
    }
]

export default function makeupGroupFormat(personType: IPersonType = 'Female'): IComponentParamAfter[] {
    const comp = [
        ...makeupGroup[personType],
    ]

    const realtimeKeys: IRealtimeKeys = makeupSuit.map(item => {
        return {
            key: PersonParamModel.identify(item.key, personType),
            realtime
        }
    })

    comp.push({
        cType: 'slot',
        slotName: 'makeupSuit',
        value: 1,
        realtime,
        realtimeKeys,
        // @ts-ignore
        options: makeupSuit.map(item => {
            let obj = {
                ...item
            }

            // @ts-ignore
            obj.key = PersonParamModel.identify(item.key, personType)
            // @ts-ignore
            obj.effectKey = PersonEffectItemModel.identify(item.effectKey, EffectParamPersonTypeValue[personType])

            return obj
        })
    })

    return comp
}
