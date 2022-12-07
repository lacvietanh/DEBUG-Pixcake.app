import BaseHistory from './BaseHistory'
import { IObject } from '@/types'

export default class SwitchHistory extends BaseHistory {
    getOptDesc(data: IObject): number | string {
        const value = this.getValue(data)
        return value ? '开启' : '关闭'
    }
}
