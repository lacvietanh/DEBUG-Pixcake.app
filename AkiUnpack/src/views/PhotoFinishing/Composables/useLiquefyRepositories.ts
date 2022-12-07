import { ref, onUnmounted, Ref, onMounted } from 'vue'
import PhotoControl from '@/view-model/photo-control'
import refine, { RefineListenerEvent } from '@/qt-ipc/business/refine'
import useToastRepositories from '@/composables/useToastRepositories'
import LiquefyControl from '@/view-model/photoControl/LiquefyControl'
import { Tool } from '@/view-model/photoControl/controlTools/contants/config'
import { LiquefyListenerEvent, PtListenerEvent } from '@/view-model/photoControl/contants/listenerEvent'
import useRefinePointsRepositories from '@/composables/points/useRefinePointsRepositories'

export interface IRepositories {
    showResetBtn: Ref<boolean>
    showModePanel: Ref<boolean>
    hideLiquefyTool: Ref<boolean>
    historyList: Ref<any[]>,

    handleUseLiquefyMode: () => void,
    handleFinishLiquefyMode: (mode: string, isButton?: boolean) => void,
    handleReset: () => void

    switchLiquefyTool: (mode: Tool) => void,
    onChangeLiquefyHistory: (uuid: string) => void
}

export interface IOptions {
    beforeOpenMode: () => void
    beforeCloseMode: () => void
}

export default function useLiquefyRepositories(photoControlRef: Ref<PhotoControl>, isDestroy: Ref<boolean>, options?: IOptions): IRepositories {
    const showResetBtn = ref(false)
    const historyList = ref([])
    const showModePanel = ref(false)
    const hideLiquefyTool = ref(false)

    const liquefyInstance: Ref<LiquefyControl | undefined> = ref()
    const { PointClickLiquefaction } = useRefinePointsRepositories()

    const useLiquefyMode = (): void => {
        if (showModePanel.value) {
            return
        }
        showModePanel.value = true
        hideLiquefyTool.value = false
        options && options?.beforeOpenMode()
        liquefyInstance.value = photoControlRef.value.useLiquefyMode()
        liquefyInstance.value.on(PtListenerEvent.HistoryUpdate, (data: any) => historyList.value = data)
            .on(PtListenerEvent.ShowResetDefaultMask, (val: boolean) => showResetBtn.value = val)
            // .on(LiquefyListenerEvent.MouseEvent, (isPress: boolean) => hideLiquefyTool.value = isPress)

        _listenThumbnailCanChooseItem()
        PointClickLiquefaction()
    }

    const _finishLiquefyMode = (mode: string, isButton: boolean = false): void => {
        options && options?.beforeCloseMode()
        if (mode === 'cancel') {
            liquefyInstance.value?.cancelLiquefyMode()
        } else if (mode === 'save') {
            liquefyInstance.value?.saveLiquefyMode()
        }
        showModePanel.value = false
        liquefyInstance.value?.destroy()
        liquefyInstance.value = undefined
        _listenThumbnailCanChooseItem(true)
    }

    const { tsConfirm } = useToastRepositories()
    const _closeConfirm = () => {
        tsConfirm({
            title: '是否需要保存液化修改？',
            confirmButtonText: '确认'
        }).then(() => {
            _finishLiquefyMode('save')
        }).catch(() => {
            _finishLiquefyMode('cancel')
        })
    }

    // 手动操作取消按钮机确认按钮
    const handleFinishLiquefyMode = (mode: string, isButton: boolean = true) => {
        if (mode === 'cancel' && isButton && historyList.value.length > 1) {
            _closeConfirm()
        } else {
            _finishLiquefyMode(mode)
        }
    }
    // 监听涂抹模式中选中切换
    const _listenThumbnailCanChooseItem = (isDestroy: boolean = false): void => {
        if (isDestroy) {
            refine.removeListener(RefineListenerEvent.ThumbnailCanChooseItem)
        } else {
            refine.addListener(RefineListenerEvent.ThumbnailCanChooseItem, () => _closeConfirm())
        }
    }

    onUnmounted(() => {
        _listenThumbnailCanChooseItem(true)
        liquefyInstance.value?.destroy()
        liquefyInstance.value = undefined
    })

    // const handleLiquefyMode = debounce(function () {
    //     if (showModePanel.value) {
    //         handleFinishLiquefyMode('save')
    //     } else {
    //         useLiquefyMode()
    //     }
    // }, 50)

    return {
        showResetBtn,
        showModePanel,
        historyList,
        hideLiquefyTool,

        handleFinishLiquefyMode,
        handleUseLiquefyMode: useLiquefyMode,

        switchLiquefyTool: (mode: Tool) => liquefyInstance.value?.changeTool(mode),
        onChangeLiquefyHistory: (uuid: string) => liquefyInstance.value?.changeHistory(uuid),
        handleReset: () => {
            if (!showResetBtn.value) {
                return
            }
            showResetBtn.value = false
            liquefyInstance.value?.resetLiquefy()
        }
    }
}
