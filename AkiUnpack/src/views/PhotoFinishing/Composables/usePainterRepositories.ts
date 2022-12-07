import { ref, onUnmounted, Ref } from 'vue'
import refine, { RefineListenerEvent } from '@/qt-ipc/business/refine'

import { Tool } from '@/view-model/photoControl/controlTools/contants/config'
import { PtListenerEvent } from '@/view-model/photoControl/contants/listenerEvent'

import PhotoControl from '@/view-model/photo-control'
import PainterControl from '@/view-model/photoControl/DefectControl'
import useToastRepositories from '@/composables/useToastRepositories'

export interface IOptions {
    beforeOpenMode: () => void
    beforeCloseMode: () => void
}

export default function usePainterRepositories(photoControlRef: Ref<PhotoControl>, isDestroy: Ref<boolean>, options?: IOptions): any {
    const controlInstance: Ref<PainterControl | undefined> = ref()

    const showResetBtn = ref(false)
    const historyList = ref([])
    const showProcessModePanel = ref(false)


    const { tsNotify } = useToastRepositories()

    const useProcessMode = (): void => {
        if (showProcessModePanel.value) {
            return
        }
        showProcessModePanel.value = true
        options && options?.beforeOpenMode()

        controlInstance.value = photoControlRef.value.usePainterMode()
        controlInstance.value.on(PtListenerEvent.HistoryUpdate, (data: any) => historyList.value = data)
            .on(PtListenerEvent.ShowResetDefaultMask, (val: boolean) => showResetBtn.value = val)
            .on(PtListenerEvent.HistoryExpired, () => tsNotify('暂仅支持撤销至最近10步'))

        _listenThumbnailCanChooseItem()
    }

    const _finishProcessMode = (mode: string): void => {
        options && options?.beforeCloseMode()
        if (mode === 'cancel') {
            controlInstance.value?.cancelRemoveDefectivePaintMask()
        } else if (mode === 'save') {
            controlInstance.value?.setRemoveDefectivePaintMask()
        }
        showProcessModePanel.value = false
        _listenThumbnailCanChooseItem(true)
    }

    const { tsConfirm } = useToastRepositories()
    const painterCloseConfirm = () => {
        tsConfirm({
            title: '是否需要保存涂抹修改？',
            confirmButtonText: '保存'
        }).then(() => {
            setRemoveDefectivePaintMask('save')
        }).catch(() => {
            setRemoveDefectivePaintMask('cancel')
        })
    }

    const setRemoveDefectivePaintMask = (mode: string, isButton: boolean = false): void => {
        if (mode === 'cancel' && isButton && historyList.value.length > 1) {
            painterCloseConfirm()
        } else {
            _finishProcessMode(mode)
        }
    }

    // 监听涂抹模式中选中切换
    const _listenThumbnailCanChooseItem = (isDestroy: boolean = false): void => {
        if (isDestroy) {
            refine.removeListener(RefineListenerEvent.ThumbnailCanChooseItem)
        } else {
            refine.addListener(RefineListenerEvent.ThumbnailCanChooseItem, () => painterCloseConfirm())
        }
    }

    onUnmounted(() => {
        _listenThumbnailCanChooseItem(true)
        controlInstance.value?.destroy()
        controlInstance.value = undefined
    })


    return {
        showPainter: showProcessModePanel,
        showResetMaskBtn: showResetBtn,
        painterHistoryList: historyList,
        setRemoveDefectivePaintMask,
        painterCloseConfirm,
        resetPainterRecord: () => {
            showResetBtn.value = false
            controlInstance.value?.resetPainterRecord()
        },

        openPainterMode: () => {
            if (!photoControlRef.value) {
                tsNotify('图片未加载成功，请稍后再试')
                return
            }
            useProcessMode()
        },
        switchDefectTool: (mode: Tool) => controlInstance.value?.changeTool(mode),
        onChangeHistory: (uuid: string) => controlInstance.value?.changeHistory(uuid)
    }
}
