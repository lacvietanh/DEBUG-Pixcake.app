import { IData, IObject } from '../types/types'

export default class BaseItem {
    key: string
    value: number
    defaultValue: number
    cType: string
    filter: boolean = false
    collapse: boolean
    collapseValue: boolean
    max:number = -1

    constructor(data: IData) {
        this.key = data.key
        this.value = data.value
        this.cType = data.cType
        this.defaultValue = data.defaultValue || data.value

        this.collapse = !!data.collapse
        this.collapseValue = !!data.collapseValue
        if (typeof data.max !== 'undefined') {
            this.max = data.max!
        }
        if (typeof data.filter !== 'undefined') {
            this.filter = data.filter
        }
    }

    update(value: number): boolean {
        // 增加判断防止值越界
        if (this.max >0 && value > this.max){
            value = this.max
        }
        if (value === this.value) {
            return false
        }
        this.value = value
        return true
    }

    toObject(): IObject {
        return {
            [this.key]: this.value
        }
    }

    toJson (): IData {
        return {
            key: this.key,
            cType: this.cType,
            value: this.value,
            defaultValue: this.defaultValue
        }
    }
}
