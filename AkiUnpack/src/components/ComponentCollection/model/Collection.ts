import { IData, IObject } from '../types/types'
import BaseItem from '@/components/ComponentCollection/model/BaseItem'

export default class DataCollection {
    _collection: BaseItem[]
    _collectionMap: Map<string, BaseItem> = new Map()

    constructor(data: any[], currObject?: IObject) {
        const res = DataCollection.init(data, currObject)
        this._collection = res[0]
        this._collectionMap = res[1]
    }

    static init(data: any[], currObject?: IObject): [BaseItem[], Map<string, BaseItem>] {
        const collection: BaseItem[] = []
        const map: Map<string, BaseItem> = new Map()

        data.forEach(item => {
            if (item.cType === 'slot') {
                return
            }

            if (item.cType === 'group' && item.children && item.children.length > 0) {
                item.children.forEach((child: any) => {
                    if (child.data && child.data.length > 0) {
                        const childRes = DataCollection.init(child.data, currObject)
                        for (const [key, model] of childRes[1]) {
                            map.set(key, model)
                        }
                    }
                })
            }

            if (item.collapse && item.children && item.children.length > 0) {
                const childRes = DataCollection.init(item.children, currObject)
                for (const [key, model] of childRes[1]) {
                    map.set(key, model)
                }
            }

            if (item.cType === 'ts-slider-group') {
                item.options.forEach((child: IData, i: number) => {
                    const key = item.keys[i]
                    if (!key) {
                        console.warn('[ts-slider-group] option need keys')
                        return
                    }

                    const config = { ...child, key, cType: item.cType }

                    const model = new BaseItem(config)
                    // 更新当前已存在的数值
                    const currValue = currObject && currObject[key]
                    if (typeof currValue !== 'undefined') {
                        model.update(currValue)
                    }

                    collection.push(model)
                    map.set(key, model)
                })
            } else {
                const model = new BaseItem(item)

                // 更新当前已存在的数值
                const currValue = currObject && currObject[item.key]
                if (typeof currValue !== 'undefined') {
                    model.update(currValue)
                }

                collection.push(model)
                map.set(item.key, model)
            }
        })

        return [collection, map]
    }

    toObject(): IObject {
        const obj: IObject = {}

        for (const [, model] of this._collectionMap) {
            if (!model.filter) {
                const temp = model.toObject()
                Object.assign(obj, temp)
            }
        }

        return obj
    }

    toFilterObject(): IObject {
        const obj: IObject = {}

        for (const [, model] of this._collectionMap) {
            if (model.filter) {
                const temp = model.toObject()
                Object.assign(obj, temp)
            }
        }

        return obj
    }

    toCollapseObject(): IObject<boolean> {
        const obj: IObject<boolean> = {}

        for (const [, model] of this._collectionMap) {
            if (model.collapse) {
                obj[model.key] = model.collapseValue
            }
        }

        return obj
    }

    updateByObject(data: IObject): IObject {
        let obj = {}
        for (const dataKey in data) {
            if (this._collectionMap.has(dataKey)) {
                const model = this._collectionMap.get(dataKey)
                const isUpdate = model?.update(data[dataKey])
                if (isUpdate) {
                    Object.assign(obj, model?.toObject())
                }
            }
        }
        return obj
    }
}
