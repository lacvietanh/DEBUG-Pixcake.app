import { formatAllPersonType, personParamsMap, showInAllTypes } from '../utils'
import { EffectParamEnum, EffectParamPersonType } from '@/constants/presetParams/ParamEnum'
import { PersonType } from '@/constants/effect-config'
import {
    IComponentParamAfter,
    IPersonType
} from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/types'
import { RealtimeType } from '@/constants/constants'

const realtime = RealtimeType.EnableByGpu

export const params = [
    {
        title: '全身',
        name: 'AI塑形',
        key: EffectParamEnum.AIBodyReshape,
        value: 0,
        alwaysShow: true, //一直显示并可以点击
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime
    },
    {
        name: '瘦身',
        key: EffectParamEnum.PoseRefineSlim,
        value: 0,
        showType: showInAllTypes,
        personType: formatAllPersonType,
        realtime
    },
    {
        name: '增高',
        key: EffectParamEnum.PoseRefineHeighten,
        value: 0,
        showType: showInAllTypes,
        realtime,
        line: true
    },
    {
        title: '局部',
        name: '头部',
        key: EffectParamEnum.PoseRefineShrinkHead,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime
    },
    {
        cType: 'ts-slider-group',
        keys: [EffectParamEnum.PoseRefineSlimLeftNeck, EffectParamEnum.PoseRefineSlimRightNeck],
        realtime,
        name: '瘦脖子',
        beta: true,
        new: true,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        options: [
            { name: '左', value: 0 },
            { name: '右', value: 0 }
        ]
    },
    {
        name: '瘦手臂',
        key: EffectParamEnum.PoseRefineSlimHand,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime
    },
    {
        name: '丰胸',
        key: EffectParamEnum.PoseRefineEnhanceBreast,
        value: 0,
        showType: ['Female'],
        personType: [EffectParamPersonType.Female],
        realtime
    },

    {
        name: '瘦腰',
        key: EffectParamEnum.PoseRefineSlimWaist,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime
    },
    {
        name: '美臀',
        key: EffectParamEnum.PoseRefineNiceButtock,
        value: 0,
        showType: ['Female'],
        personType: [EffectParamPersonType.Female],
        realtime
    },
    {
        name: '瘦腿',
        key: EffectParamEnum.PoseRefineSlimLeg,
        value: 0,
        personType: formatAllPersonType,
        showType: showInAllTypes,
        realtime
    },
    {
        name: '长腿',
        key: EffectParamEnum.PoseRefineLengthen,
        value: 0,
        showType: showInAllTypes,
        realtime
    }
]

export default class BodyParams {
    // @ts-ignore
    baseParams: Map<IPersonType, IComponentParamAfter[]> = personParamsMap(params)

    constructor(private personType: IPersonType = 'Male') {
    }

    _mergeRule(data: any): IComponentParamAfter[] {
        let temp = this.baseParams.get(this.personType) || []

        if (data) {
            const personComMap: [number, boolean][] = data.get(PersonType[this.personType]) || []
            const switchMap: Map<number, boolean> = new Map(personComMap)

            return temp.map((item: IComponentParamAfter) => {
                if (item.flag) {
                    item.disabled = switchMap.has(item.flag)
                        ? !switchMap.get(item.flag)
                        : false
                    if (item.alwaysShow) {
                        item.disabled = false
                    }
                }

                if (item.flags && item.flags.length > 0) {
                    item.disabled = !item.flags.every(flag => switchMap.has(flag) && switchMap.get(flag))
                }

                return item
            })
        } else {
            return temp.map((item: IComponentParamAfter) => {
                item.disabled = !item.hasOwnProperty('alwaysShow')
                return item
            })
        }

    }

    getParamsData(data: any): IComponentParamAfter[] {
        return this._mergeRule(data)
    }
}
