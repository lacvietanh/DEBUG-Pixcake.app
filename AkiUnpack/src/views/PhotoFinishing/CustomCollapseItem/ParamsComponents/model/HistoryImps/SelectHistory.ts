import BaseHistory from './BaseHistory'
import { IDataJson } from '../../types/history'
import { ISelectOption } from '../../types'
import { IObject } from '@/types'

export default class SelectHistory extends BaseHistory {
    options: ISelectOption[] = []

    constructor(data: IDataJson) {
        super(data)

        if (typeof data.options === 'object') {
            this.options = data.options as ISelectOption[]
        }
    }

    getOptDesc(data: IObject): number | string {
        const value = this.getValue(data)

        const obj = this.options.find(item => item.value === value)
        if (obj) {
            let res = '';
            if (obj.parent) {
                res += obj.parent + " - "
            }
            let ext = obj.name || obj.label  || ''
            res += ext;
            return res
        }

        return ''
    }
}
