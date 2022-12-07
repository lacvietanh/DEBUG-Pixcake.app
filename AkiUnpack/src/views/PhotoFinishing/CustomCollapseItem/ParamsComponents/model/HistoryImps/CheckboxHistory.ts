import BaseHistory from './BaseHistory'
import { IObject } from '@/types'
import { ISelectOption } from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/types'
import { IDataJson } from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/types/history'

export default class CheckboxHistory extends BaseHistory {

    parentName?: string
    trueLabel?: string
    falseLabel?: string

    constructor(data: IDataJson) {
        super(data)
        this.parentName = data.parentName
        this.falseLabel = data.falseLabel
        this.trueLabel = data.trueLabel
    }

    getOptDesc(data: IObject): number | string {
        const value = this.getValue(data)
        if (value === this.trueLabel) {
            return '开启'
        } else {
            return '关闭'
        }
    }

    getCommonLabel(): string[] {
        const labelArr: string[] = []

        if (this.parentName) {
            labelArr.push(this.parentName)
        }

        return labelArr
    }

}
