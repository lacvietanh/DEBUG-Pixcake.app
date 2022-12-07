import BaseHistory from './BaseHistory'
import { IDataJson } from '../../types/history'
import { IObject } from '@/types'

export default class TsSliderGroupHistory extends BaseHistory {
    keys: string[] = []

    constructor(data: IDataJson) {
        super(data)

        if (typeof data.keys !== 'undefined') {
            this.keys = data.keys
        }
    }

    getLabelName(data: IObject): string {
        let name = ''
        const keys = Object.keys(data)
        const value = data[this.key] || this.value

        if (this.type === 'ts-slider-group') {
            if (!this.keys?.every(key => data[key] === value) || keys.length === 1) {
                name = this.name
            }
        } else {
            name = this.name
        }
        return name
    }
}
