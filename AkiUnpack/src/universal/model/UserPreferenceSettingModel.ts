/*
    用户偏好设置
 */

const localStorage = window.localStorage

export class UserPreferenceSettingModel {
    async getRefineParamsSplitValue(): Promise<string | null> {
        let ret = await localStorage.getItem('refineRightParamsSplitValue')
        if (ret !== 'undefined' && ret !== null) {
            // @ts-ignore
            ret = parseFloat(ret)
        }
        return ret
    }

    async setRefineParamsSplitValue(val: number) {
        await localStorage.setItem('refineRightParamsSplitValue', val + '')
    }

    async getBatchRetouchParamsSplitValue(): Promise<number | null> {
        let ret = await localStorage.getItem('batchRetouchParamsSplitValue')
        if (ret !== 'undefined' && ret !== null) {
            // @ts-ignore
            ret = parseFloat(ret)
        }
        // @ts-ignore
        return ret
    }

    async setBatchRetouchParamsSplitValue(val: number) {
        await localStorage.setItem('batchRetouchParamsSplitValue', val + '')
    }
}
