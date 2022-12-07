import { IObject } from '@/types'
import { IDataJson, IExtInfo } from '../../types/history'
import { EffectParamPersonTypeValue } from '@/constants/presetParams/ParamEnum'
import { IPersonType } from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/types'

export default class BaseHistory {
    key: string
    value: number
    type: string

    name: string
    title?: string
    groupName?: string

    collapse?: boolean
    realtime?: boolean | number
    filter?: boolean

    parent?: BaseHistory

    formatValue?: (numb: number) => number

    constructor(data: IDataJson) {
        this.key = data.key
        this.value = data.value
        this.type = data.cType || 'slider'
        this.name = data.name

        if (typeof data.cTitle !== 'undefined') {
            this.title = data.cTitle
        }

        if (typeof data.groupName !== 'undefined') {
            this.groupName = data.groupName
        }

        if (typeof data.realtime !== 'undefined') {
            this.realtime = data.realtime
        }

        if (typeof data.collapse !== 'undefined') {
            this.collapse = data.collapse
        }

        if (typeof data.filter !== 'undefined') {
            this.filter = data.filter
        }

        if (typeof data.parent !== 'undefined') {
            this.parent = data.parent
        }

        if (typeof data.formatValue === 'function') {
            this.formatValue = data.formatValue
        }
    }

    getCommonLabel(): string[] {
        const labelArr: string[] = []
        if (this.parent) {
            if (this.parent.type === 'group' && this.groupName) {
                labelArr.push(this.groupName)
            }

            if (this.parent.collapse) {
                labelArr.push(this.parent.name)
            }
        }

        if (this.title) {
            labelArr.push(this.title)
        }

        return labelArr
    }

    getLabelName(data: IObject): string {
        if (this.name) {
            return this.name
        }
        return ''
    }

    getLabelArr(data: IObject): string[] {
        const commonArr = this.getCommonLabel()

        const name = this.getLabelName(data)
        if (name) {
            commonArr.push(name)
        }

        return commonArr
    }

    getValue(data: IObject): number | string {
        if (data[this.key] === undefined) {
            return this.value
        }
        return data[this.key]
    }

    getOptDesc(data: IObject): number | string {
        if (this.formatValue) {
            return this.formatValue(this.getValue(data) as number)
        }
        return this.getValue(data)
    }

    getPersonType(): number {
        if (/^\w+_(Male|Female|Child|Older)$/.test(this.key)) {
            const matchArr = this.key.match(/^\w+_(Male|Female|Child|Older)$/) || []
            const pt = matchArr[1] as IPersonType
            return EffectParamPersonTypeValue[pt]
        }
        return -1
    }

    getHistoryExtInfo(data: IObject): string {
        const extInfo: IExtInfo = {
            labName: '',
            lab2Name: '',
            lab3Name: '',
            isRest: false,
            optDesc: this.getOptDesc(data)
        }

        const labelArr = this.getLabelArr(data)

        labelArr.forEach((label, i) => {
            switch (i) {
                case 0:
                    extInfo.labName = label
                    break
                case 1:
                    extInfo.lab2Name = label
                    break
                case 2:
                    extInfo.lab3Name = label
                    break
            }
        })

        const sex = this.getPersonType()
        if (sex !== -1) {
            extInfo.sex = sex
        }

        extInfo.optDesc = extInfo.optDesc.toString()

        return JSON.stringify(extInfo)
    }
}
