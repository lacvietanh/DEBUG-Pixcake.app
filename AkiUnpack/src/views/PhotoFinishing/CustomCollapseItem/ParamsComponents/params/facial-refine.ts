import { formatAllPersonType, formatPersonParams, formatPersonParamsGroup, showInAllTypes } from '../utils'
import { EffectParamEnum, EffectAlgoVersion, EffectParamPersonType } from '@/constants/presetParams/ParamEnum'
import PersonParamModel from '@/model/ParamsModel/PersonParamModel'
import {
    IComponentParamAfter,
    IComponentSymmetryParamAfter,
    IPersonType
} from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/types'
import {IS_CLIENT_PIX_PIE} from "@/universal/types/config";
import { RealtimeType } from '@/constants/constants'

/*
* 面部重塑
* */

const realtime = RealtimeType.EnableByGpu

const visible = (version: string) => {
    return (data: any) => {
        return data[EffectAlgoVersion.FaceSurgery] === version
    }
}

const facialParams = [
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftFaceLift, EffectParamEnum.RightFaceLift],
        realtime,
        cTitle: '瘦脸',
        options: [
            { name: '左', value: 0 },
            { name: '右', value: 0 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftTemple, EffectParamEnum.RightTemple],
        realtime,
        cTitle: '太阳穴',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftCheekBone, EffectParamEnum.RightCheekBone],
        realtime,
        cTitle: '颧骨',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftJaw, EffectParamEnum.RightJaw],
        realtime,
        cTitle: '下颌',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    { name: '瘦脸', key: EffectParamEnum.FaceLift, value: 0, visible: visible('V1'), realtime: true },
    {
        name: '太阳穴',
        key: EffectParamEnum.FacialRefineTemple,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '颧骨',
        key: EffectParamEnum.FacialRefineCheekBone,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '下颌',
        key: EffectParamEnum.FacialRefineJaw,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    { name: '小头', key: EffectParamEnum.HeadNarrow, value: 0, realtime: true },
    { name: '小脸', key: EffectParamEnum.FacialRefineSmallFace, value: 0, realtime: true },
    { name: '脸宽', key: EffectParamEnum.FaceWidth, min: -100, value: 0, cType: 'ts-slider', realtime: true },
    { name: '下巴', key: EffectParamEnum.FacialRefineChin, min: -100, value: 0, cType: 'ts-slider', realtime: true },
    { name: '发际线', key: EffectParamEnum.FacialRefineHairLine, min: -100, value: 0, cType: 'ts-slider', realtime: true }
]
//眼睛
const eyeParams = [
    {
        name: '大小',
        key: EffectParamEnum.FacialRefineEyeZoom,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '眼高',
        key: EffectParamEnum.FacialRefineEyeHigher,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '眼宽',
        key: EffectParamEnum.FacialRefineEyeWidth,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '眼距',
        key: EffectParamEnum.FacialRefineEyeDistance,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '倾斜',
        key: EffectParamEnum.FacialRefineEyeAngle,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '位置',
        key: EffectParamEnum.FacialRefineEyeUpDownAdjust,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeZoom, EffectParamEnum.RightEyeZoom],
        realtime,
        cTitle: '大小',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeHigher, EffectParamEnum.RightEyeHigher],
        realtime,
        cTitle: '眼高',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeWidth, EffectParamEnum.RightEyeWidth],
        realtime,
        cTitle: '眼宽',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeDistance, EffectParamEnum.RightEyeDistance],
        realtime,
        cTitle: '眼距',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeAngle, EffectParamEnum.RightEyeAngle],
        cTitle: '倾斜',
        realtime,
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeUpDownAdjust, EffectParamEnum.RightEyeUpDownAdjust],
        realtime,
        cTitle: '位置',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    }
]
//鼻子
const noseParams = [
    { name: '大小', key: EffectParamEnum.FacialRefineNose, min: -100, value: 0, cType: 'ts-slider', realtime: true },
    {
        name: '鼻高',
        key: EffectParamEnum.FacialRefineNoseHigher,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        realtime: true
    },
    {
        name: '鼻梁',
        key: EffectParamEnum.FacialRefineNoseBridge,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        realtime: true
    },
    { name: '鼻翼', key: EffectParamEnum.FacialRefineNoseAlar, min: -100, value: 0, cType: 'ts-slider', realtime: true },
    { name: '鼻尖', key: EffectParamEnum.FacialRefineNoseTip, min: -100, value: 0, cType: 'ts-slider', realtime: true }
]
//嘴巴
const mouthParams = [
    { name: '大小', key: EffectParamEnum.FacialRefineMouthSize, min: -100, value: 0, cType: 'ts-slider', realtime: true },
    {
        name: '嘴宽',
        key: EffectParamEnum.FacialRefineMouthWidth,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        realtime: true
    },
    {
        name: '位置',
        key: EffectParamEnum.FacialRefineMouthHigher,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        realtime: true
    },
    {
        name: '丰上唇',
        key: EffectParamEnum.FacialRefineMouthUpperLip,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        realtime: true
    },
    {
        name: '丰下唇',
        key: EffectParamEnum.FacialRefineMouthLowperLip,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        realtime: true
    }
]
//  眉毛
const eyeBrowParams = [
    {
        name: '粗细',
        key: EffectParamEnum.FacialRefineEyeBrowThickness,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '眉距',
        key: EffectParamEnum.FacialRefineEyeBrowDistance,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '倾斜',
        key: EffectParamEnum.FacialRefineEyeBrowAngle,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '形状',
        key: EffectParamEnum.FacialRefineEyeBrowShape,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        name: '位置',
        key: EffectParamEnum.FacialRefineEyeBrowHigher,
        min: -100,
        value: 0,
        cType: 'ts-slider',
        visible: visible('V1'),
        realtime: true
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeBrowThickness, EffectParamEnum.RightEyeBrowThickness],
        realtime,
        cTitle: '粗细',
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeBrowDistance, EffectParamEnum.RightEyeBrowDistance],
        cTitle: '眉距',
        realtime,
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeBrowAngle, EffectParamEnum.RightEyeBrowAngle],
        cTitle: '倾斜',
        realtime,
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeBrowShape, EffectParamEnum.RightEyeBrowShape],
        cTitle: '形状',
        realtime,
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    },
    {
        cType: 'ts-slider-group',
        visible: visible('V2'),
        keys: [EffectParamEnum.LeftEyeBrowHigher, EffectParamEnum.RightEyeBrowHigher],
        cTitle: '位置',
        realtime,
        options: [
            { name: '左', value: 0, min: -100 },
            { name: '右', value: 0, min: -100 }
        ]
    }

]

const getFaceCompParams = (type: string) => {
    return [
        {
            label: '脸型',
            id: 'facial',
            data: [
                ...formatPersonParams(facialParams, type)
            ]
        },
        {
            label: '眉毛',
            id: 'eyeBrow',
            data: [
                ...formatPersonParams(eyeBrowParams, type)
            ]
        },
        {
            label: '眼睛',
            id: 'eye',
            data: [
                ...formatPersonParams(eyeParams, type)
            ]
        },
        {
            label: '鼻子',
            id: 'nose',
            data: [
                ...formatPersonParams(noseParams, type)
            ]
        },
        {
            label: '嘴巴',
            id: 'mouth',
            data: [
                ...formatPersonParams(mouthParams, type)
            ]
        }

    ]
}

const visibleBySex = (type: EffectParamPersonType) => {
    return (data: any): boolean => {
        const key = PersonParamModel.identify(EffectParamEnum.SymmetryReshapeSwitch, type)
        return data[key] === 1
    }
}

const symmetry = [
    {
        name: '对称液化（适用证件照）',
        key: EffectParamEnum.SymmetryReshapeSwitch,
        new: true,
        value: 0,
        cType: 'switch',
        max: 1,
        showType: showInAllTypes,
        personType: formatAllPersonType,
        tip:['“对称液化”是为满足证件照场景而打造的AI肖','像对称功能。','五官对称：微调五官（眉毛/眼睛/鼻子/嘴巴/','耳朵）使其左右对称。', '上半身对称：调整五官以外区域，如脸型、发','型、上半身姿态等，使其左右对称。'],
        getDisableValue: (faceDisabled: boolean, bodyDisabled: boolean) => {
            if (IS_CLIENT_PIX_PIE){
                return false
            }
            return bodyDisabled && faceDisabled
        }
    },
    {
        name: '五官对称',
        key: EffectParamEnum.SymmetryReshapeFace,
        value: 0,
        showType: showInAllTypes,
        personType: formatAllPersonType,
        visibleBySex,
        realtime,
        getDisableValue: (faceDisabled: boolean) => {
            if (IS_CLIENT_PIX_PIE){
                return false
            }
            return faceDisabled
        }
    },
    {
        name: '上半身对称',
        key: EffectParamEnum.SymmetryReshapeBody,
        value: 0,
        showType: showInAllTypes,
        personType: formatAllPersonType,
        visibleBySex,
        realtime,
        getDisableValue: (faceDisabled: boolean, bodyDisabled: boolean) => {
            if (IS_CLIENT_PIX_PIE){
                return false
            }
            return bodyDisabled
        }
    }
]

const fSymmetryParams = formatPersonParamsGroup(symmetry)

const getSymmetryParams = (type: IPersonType, data: any): IComponentParamAfter[] => {
    const params = fSymmetryParams[type]
    if (data) {
        const faceDisabled = !data.face[type.toLocaleLowerCase()]
        const bodyDisabled = !data.body[type.toLocaleLowerCase()]
        params.forEach((item: IComponentParamAfter) => {
            const obj = item as IComponentSymmetryParamAfter
            item.disabled = obj.getDisableValue(faceDisabled, bodyDisabled)
        })
    } else {
        params.forEach(item => {
            item.disabled = true
        })
    }

    return [...params]
}

export const typeGroupFormat = (type: IPersonType = 'Male', data: any): any[] => {
    const list = [
        {
            name: '面部重塑',
            key: `group_facial_refine`,
            cType: 'group',
            value: 'facial',
            filter: true,
            customBtnTextStyle: { width: '22px', display: 'inline-block' },
            children: getFaceCompParams(type)
        },

        {
            name: '使用旧版',
            parentName: '面部重塑',
            key: EffectAlgoVersion.FaceSurgery,
            cType: 'checkbox',
            type: 'string',
            // value: 'V1',
            value: 'V2',
            trueLabel: 'V1',
            falseLabel: 'V2',
            // line: true
        }
    ]

    const params = getSymmetryParams(type, data)
    if (params) {
        // @ts-ignore
        list.push(...params)
    }

    return [...list]
}
