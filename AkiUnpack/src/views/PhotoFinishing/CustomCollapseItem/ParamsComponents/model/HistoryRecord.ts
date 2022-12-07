// @ts-ignore
import { IObject } from '@/types'
import { IDataJson, IGroupItem, IExtInfo } from '../types/history'
import { IComponentParamAfter, IRealtimeKeys } from '../types'

import BaseHistory from './HistoryImps/BaseHistory'
import SwitchHistory from './HistoryImps/SwitchHistory'
import SelectHistory from './HistoryImps/SelectHistory'
import TsSliderGroupHistory from './HistoryImps/TsSliderGroupHistory'
import CheckboxHistory
    from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/model/HistoryImps/CheckboxHistory'

// @ts-ignore
import { beautyGroup } from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents'
import { EffectParamEnum, EffectParamPersonTypeValue } from '@/constants/presetParams/ParamEnum'
import { RealtimeType } from '@/constants/constants'

export type HistoryCollection = BaseHistory | SwitchHistory | SelectHistory | TsSliderGroupHistory

export default class HistoryRecord {
    _group: IGroupItem
    _realtimeMap: Map<string, number | boolean> = new Map()
    _slotRealtimeKeys: IRealtimeKeys = []
    _componentMap: Map<string, HistoryCollection> = new Map()
    _filterHistoryKeys: string[] = [EffectParamEnum.BgCleanMode, EffectParamEnum.BgCleanMooreMode]

    constructor(group: IGroupItem, data: IDataJson[]) {
        this._group = group
        const res = HistoryRecord.init(data)

        this._componentMap = res[0]
        this._slotRealtimeKeys = res[1]

        this._realtimeMap = HistoryRecord.getRealtimeMap(this._componentMap)
        this.initSlotRealtimeKeys(this._slotRealtimeKeys)
    }

    static init(data: IDataJson[], parent?: HistoryCollection): [Map<string, HistoryCollection>, IRealtimeKeys] {
        const map: Map<string, HistoryCollection> = new Map()
        const slotRealtimeKeys: IRealtimeKeys = []

        data.forEach(item => {
            if (item.cType === 'slot') {
                if (item.realtime && item.realtimeKeys && item.realtimeKeys.length > 0) {
                    slotRealtimeKeys.push(...item.realtimeKeys)
                }
                return
            }

            if (item.cType === 'ts-slider-group') {
                item.options?.forEach((child: IComponentParamAfter, i: number) => {
                    const key = item.keys ? item.keys[i] : ''
                    if (!key) {
                        console.warn('[ts-slider-group] option need keys')
                        return
                    }
                    const config = { ...item, ...child, key, parent }
                    const model = new TsSliderGroupHistory(config)

                    map.set(key, model)
                })
            } else {
                let model: HistoryCollection
                const config = { ...item, parent }
                if (item.cType === 'switch') {
                    model = new SwitchHistory(config)
                } else if (item.cType === 'select') {
                    model = new SelectHistory(config)
                } else if (item.cType === 'checkbox') {
                    model = new CheckboxHistory(config)
                }
                else {
                    model = new BaseHistory(config)
                }
                map.set(item.key, model)

                if (item.cType === 'group' && item.children && item.children.length > 0) {
                    item.children.forEach((child: any) => {
                        if (child.data && child.data.length > 0) {
                            const formatData = child.data.map((cd: any) => {
                                return { ...cd, groupName: child.label }
                            })

                            const [childRes, rKeys] = HistoryRecord.init(formatData, model)
                            slotRealtimeKeys.push(...rKeys)


                            for (const [key, model] of childRes) {
                                map.set(key, model)
                            }
                        }
                    })
                }

                if (item.collapse && item.children && item.children.length > 0) {
                    const [childRes, rKeys] = HistoryRecord.init(item.children, model)
                    slotRealtimeKeys.push(...rKeys)

                    for (const [key, model] of childRes) {
                        map.set(key, model)
                    }
                }
            }
        })

        return [map, slotRealtimeKeys]
    }

    static getRealtimeMap(map: Map<string, HistoryCollection>): Map<string, boolean> {
        const realtimeMap = new Map()
        for (const [key, model] of map) {
            if (model.realtime) {
                realtimeMap.set(key, model.realtime)
            }
        }
        return realtimeMap
    }

    get realtimeMap(): Map<string, number | boolean> {
        return this._realtimeMap
    }

    initSlotRealtimeKeys(realtimeKeys: IRealtimeKeys): void {
        realtimeKeys.forEach(item => {
            this._realtimeMap.set(item.key, item.realtime)
        })
    }

    createHistoryRecord(data: IObject): string {
        const keys = Object.keys(data)
        const len = keys.length

        if (len <= 0) {
            return ''
        }

        if (len <= 2) {
            const key = keys[0]
            if (this._filterHistoryKeys.includes(key)) {
                return ''
            }

            if (this._componentMap.has(key)) {
                const model = this._componentMap.get(key)
                return model?.getHistoryExtInfo(data) || ''
            }
        }

        return ''
    }

    createResetHistoryRecord(personType: string): string {
        const extInfo: IExtInfo = {
            labName: this._group.name,
            isRest: true,
            lab2Name: '',
            lab3Name: '',
            optDesc: '重置'
        }
        let key = this._group.component
        let list = beautyGroup
        for (const listElement of list) {
            if (listElement.key === key) {
                // @ts-ignore
                extInfo.sex = EffectParamPersonTypeValue[personType]
            }
        }

        return JSON.stringify(extInfo)
    }

    // 实时效果是否有效，条件判断集
    static isValidRealtime(value: boolean | number, enable: boolean): boolean {
        console.debug('isValidRealtime: ', value)
        if (value === RealtimeType.EnableByGpu) {
            return enable;
        } else if (typeof value === 'boolean' || value === RealtimeType.AlwaysEnable) {
            return !!value
        }
        return false
    }

    // 判断是否为实时效果
    isRealtime(keys: string[], enable: boolean): boolean {
        if (keys.length === 1) {
            const key = keys[0]
            if (this._realtimeMap.has(key)) {
                const value = this._realtimeMap.get(key)
                if (value) {
                    return HistoryRecord.isValidRealtime(value, enable)
                }
            }
        } else if (keys.length === 2) {
            const [k1, k2] = keys
            if (this._realtimeMap.has(k1) && this._realtimeMap.has(k2)) {
                const v1 = this._realtimeMap.get(k1)
                const v2 = this._realtimeMap.get(k2)
                if (v1 && v2) {
                    return HistoryRecord.isValidRealtime(v1, enable) && HistoryRecord.isValidRealtime(v2, enable)
                }
            }
        }

        return false
    }
}
