/*
    用户偏好设置
 */
import localStorage from '@/utils/locs'

export class UserPreferenceSettingModel {
    async getRefineParamsSplitValue(): Promise<number> {
        let ret = await localStorage.get('refineRightParamsSplitValue')
        if (ret !== 'undefined' && ret !== null) {
            ret = parseFloat(ret)
        }
        return ret
    }

    async setRefineParamsSplitValue(val: number) {
        await localStorage.set('refineRightParamsSplitValue', val)
    }

    async getBatchRetouchParamsSplitValue(): Promise<number> {
        let ret = await localStorage.get('batchRetouchParamsSplitValue')
        if (ret !== 'undefined' && ret !== null) {
            ret = parseFloat(ret)
        }
        return ret
    }

    async setBatchRetouchParamsSplitValue(val: number) {
        await localStorage.set('batchRetouchParamsSplitValue', val)
    }
}
