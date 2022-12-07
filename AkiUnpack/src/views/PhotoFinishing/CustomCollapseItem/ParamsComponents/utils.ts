import { cloneDeep } from 'lodash'
import { ParamFlag } from '@/constants/effect-config'

export const showInAllTypes = ['Male', 'Female', 'Child', 'Older']
export const formatAllPersonType = ['Male', 'Female', 'Child', 'Older']

import {
    IComponentParamBefore,
    IComponentParamAfter,
    PersonParamsComponentItem,
    IPersonType
} from './types'
import { EffectParamPersonType } from '@/constants/presetParams/ParamEnum'

import PersonParamModel from '@/model/ParamsModel/PersonParamModel'
import HslParamModel from '@/model/ParamsModel/HslParamModel'

/**
 * 男女儿童分组格式化
 * @param params
 * @param type
 * @returns {*}
 */
export const formatPersonParams = (params: Array<IComponentParamAfter>, type = 'Male'): Array<IComponentParamAfter> => {
    const temp: Array<IComponentParamAfter> = []

    params.forEach(item => {
        const obj = cloneDeep(item)
        if (type) {
            if (obj.key) {
                obj.key = PersonParamModel.identify(item.key as string, type)
            }

            if (obj.keys) {
                obj.keys = obj.keys.map((key: string) => PersonParamModel.identify(key, type))
            }

            if (obj.options) {
                obj.options.forEach((option: IComponentParamAfter) => {
                    option.key = PersonParamModel.identify(option.key as string, type)
                })
            }
        }
        temp.push(obj)
    })

    return temp
}

/**
 * 颜色列表格式化
 * @param colorList
 * @param param
 * @param colorMapping
 * @returns {*}
 */
export const formatColorParams = (colorList: Array<IComponentParamAfter>, param: string = '', colorMapping: any): Array<IComponentParamAfter> => {
    const temp: Array<IComponentParamAfter> = []

    colorList.forEach(item => {
        // @ts-ignore
        if (item.cStyle && item.cStyle.runwayStyle) {
            // @ts-ignore
            item.cStyle.runwayStyle.background = colorMapping[param][item.key]
        }
        const obj = JSON.parse(JSON.stringify({ ...item }))

        obj.key = HslParamModel.identify(param, item.key as string)
        temp.push(obj)
    })

    return temp
}

/**
 * 格式化
 * @param params
 * @returns {{Male, Female, Child}}
 */
export const formatPersonParamsGroup = (params: IComponentParamBefore[]): PersonParamsComponentItem => {
    const Male: IComponentParamAfter[] = []
    const Female: IComponentParamAfter[] = []
    const Child: IComponentParamAfter[] = []
    const Older: IComponentParamAfter[] = []

    params.forEach(item => {
        const { showType, personType } = item

        let obj: IComponentParamAfter = { ...item }
        let key = item.key as string
        // delete obj.showType
        // delete obj.personType
        // @ts-ignore
        obj.flag = ParamFlag[key]

        if (showType.includes('Male')) {
            const temp = { ...obj }
            if (personType && personType.includes('Male')) {
                if (temp.key) {
                    temp.key = PersonParamModel.identify(key, EffectParamPersonType.Male)
                }

                if (temp.keys) {
                    temp.flags = temp.keys.map((key: string) => ParamFlag[key]) || []
                    temp.keys = temp.keys.map((key: string) => PersonParamModel.identify(key, EffectParamPersonType.Male))
                }

                if (typeof temp.visibleBySex === 'function') {
                    temp.visible = temp.visibleBySex(EffectParamPersonType.Male)
                }
            }
            Male.push(temp)
        }

        if (showType.includes('Female')) {
            const temp = { ...obj }
            if (personType && personType.includes('Female')) {
                if (temp.key) {
                    temp.key = PersonParamModel.identify(key, EffectParamPersonType.Female)
                }

                if (temp.keys) {
                    temp.flags = temp.keys.map((key: string) => ParamFlag[key]) || []
                    temp.keys = temp.keys.map((key: string) => PersonParamModel.identify(key, EffectParamPersonType.Female))
                }

                if (typeof temp.visibleBySex === 'function') {
                    temp.visible = temp.visibleBySex(EffectParamPersonType.Female)
                }
            }
            Female.push(temp)
        }

        if (showType.includes('Child')) {
            const temp = { ...obj }
            if (personType && personType.includes('Child')) {
                if (temp.key) {
                    temp.key = PersonParamModel.identify(key, EffectParamPersonType.Child)
                }

                if (temp.keys) {
                    temp.flags = temp.keys.map((key: string) => ParamFlag[key]) || []
                    temp.keys = temp.keys.map((key: string) => PersonParamModel.identify(key, EffectParamPersonType.Child))
                }

                if (typeof temp.visibleBySex === 'function') {
                    temp.visible = temp.visibleBySex(EffectParamPersonType.Child)
                }
            }
            Child.push(temp)
        }

        if (showType.includes('Older')) {
            const temp = { ...obj }
            if (personType && personType.includes('Older')) {
                if (temp.key) {
                    temp.key = PersonParamModel.identify(key, EffectParamPersonType.Older)
                }

                if (temp.keys) {
                    temp.flags = temp.keys.map((key: string) => ParamFlag[key]) || []
                    temp.keys = temp.keys.map((key: string) => PersonParamModel.identify(key, EffectParamPersonType.Older))
                }

                if (typeof temp.visibleBySex === 'function') {
                    temp.visible = temp.visibleBySex(EffectParamPersonType.Older)
                }
            }
            Older.push(temp)
        }
    })

    return {
        Male,
        Female,
        Child,
        Older
    }
}

export function personParamsMap(params: IComponentParamBefore[]): Map<IPersonType, IComponentParamAfter[]> {
    const result = formatPersonParamsGroup(params)
    return new Map([
        ['Male', result.Male],
        ['Female', result.Female],
        ['Child', result.Child],
        ['Older', result.Older]
    ])
}
