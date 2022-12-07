import Vue, { ref, getCurrentInstance, Ref } from 'vue'

import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { dialogIpc, FUNK_LACK_KEY } from '@/qt-ipc/dialog/DialogIpcImpl'

import { IS_CLIENT_PIX_PIE } from '@/universal/types/config'
import UserModel from '@/universal/model/UserModel'
import useExportPointsRepositories from '@/composables/points/useExportPointsRepositories'

interface IFundLackOptions {
    onSuccess?: () => void,
    onCancel?: () => void
}

interface IUseRechargeRepositories {
    showPayTip: Ref<boolean>
    showFundLackView: (message?: string, options?: IFundLackOptions) => void,
    addRechargeEventListener: () => void,
    removeRechargeEventListener: () => void
}

/**
 * 余额不足充值提示
 */
export default function useRechargeRepositories(): IUseRechargeRepositories {
    const showPayTip = ref(false)
    const _that = getCurrentInstance()?.proxy as Vue

    const { PointExportRecharge } = useExportPointsRepositories()

    const showFundLackView = async (message: string = '套餐剩余可用张数不足，无法成功导出，请及时充值哦', options?: IFundLackOptions) => {
        showPayTip.value = true
        let msg = message
        const isAllowTopUp = await UserModel.getInstance().getIsAllowTopUp()
        let btnText = '马上充值'
        if (!isAllowTopUp) {
            msg = `套餐剩余可用张数不足，无法成功导出，${ IS_CLIENT_PIX_PIE ? '请联系管理员' : '请联系贵司管理员补充张数哦' }。`
            btnText = '我知道了'
        }

        _that?.tsConfirm({
            title: msg,
            confirmButtonText: btnText,
            showCancelButton: false,
            closeOnClickModal: false,
            needHandleReject: true
        }).then(() => {
            PointExportRecharge()
            options?.onSuccess && options?.onSuccess()
            showPayTip.value = false

            if (!isAllowTopUp) {
                return
            }

            ipcRenderer.send('open-member-plan-window', null)
            // @ts-ignore
            _that?.PointMemberPriceClick()
        }).catch(() => {
            options?.onCancel && options?.onCancel()
            showPayTip.value = false
        })
    }

    const addRechargeEventListener = () => {
        dialogIpc.addListener(FUNK_LACK_KEY, async () => {
            if (showPayTip.value) {
                return
            }
            await showFundLackView()
        })
    }

    const removeRechargeEventListener = () => {
        dialogIpc.removeListener(FUNK_LACK_KEY)
    }

    return {
        showPayTip,
        addRechargeEventListener,
        removeRechargeEventListener,
        showFundLackView
    }
}
