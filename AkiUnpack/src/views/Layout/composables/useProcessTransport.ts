import Vue, { ref, Ref } from 'vue'

import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { IpcRendererTopic } from '@/qt-ipc/constants/common'
// @ts-ignore
import ToastMixin from '@/mixins/toast'
import {CLIENT_NAME} from "@/universal/types/config";

interface IUseRepositories {
    showProcess: Ref<boolean>
    addListener: () => void,
    removeListener: () => void,
    percentage: Ref<number>,
    checkMigrate: () => void
}

/**
 * 进度信息提示
 */
export default function useProcessRepositories(): IUseRepositories {
    const showProcess = ref(false)
    const percentage = ref(0)

    const _showCompleteTip = () => {
        const ToastClass = Vue.extend(ToastMixin)
        const toast = new ToastClass()
        toast?.tsConfirm({
            title: '数据升级完成',
            message: `您需要重新启动${CLIENT_NAME}`,
            confirmButtonText: '重新启动',
            cancelButtonText: '下次启动',
            closeOnClickModal: false
        }).then(() => {
            ipcRenderer.send('app-restart', { clearCache: false })
        }).catch(() => {
        })
    }

    const addListener = () => {
        ipcRenderer.on(IpcRendererTopic.OnUpdateDataTransport, async (topic, args) => {
            if (args.isFinish) {
                percentage.value = 100
                setTimeout(() => {
                    showProcess.value = false
                    _showCompleteTip()
                }, 300)
            } else {
                showProcess.value = true
                let step = args.currentStep - 1
                if (step < 0) {
                    step = 0
                }

                percentage.value = Number(parseInt((step / Number(args.totalStep) * 1000) + '')) / 10
            }
        })
    }

    const removeListener = () => {
        ipcRenderer.removeAllListeners(IpcRendererTopic.OnUpdateDataTransport)
    }

    const checkMigrate = async () => {
        const { has_merge, has_migrate, currentStep, totalStep } = await ipcRenderer.send(IpcRendererTopic.OnCheckDataMigrateFinish)
        if (has_migrate && !has_merge) {
            _showCompleteTip()
        } else {
            let step = currentStep - 1
            if (step >= 0 && totalStep > 0 && step <= totalStep) {
                percentage.value = Number(parseInt((step / Number(totalStep) * 1000) + '')) / 10
                showProcess.value = true
            }
        }
    }

    return {
        percentage,
        showProcess,
        addListener,
        removeListener,
        checkMigrate
    }
}
