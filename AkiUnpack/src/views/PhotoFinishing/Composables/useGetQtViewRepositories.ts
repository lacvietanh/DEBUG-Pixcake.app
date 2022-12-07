import {
    ref,
    onUnmounted,
    Ref,
    nextTick,
} from 'vue'

import refine from '@/qt-ipc/business/refine'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import store from '@/store'
import { debounce } from 'lodash'

interface IRepositories {
    needCreateMainFragment: Ref<boolean>
    setNeedCreateMainFragmentTag: (from: any, to: any) => void
    refineUUID: Ref<string>,

    isDragging: Ref<boolean>

    updateDragStatus: (value: boolean) => Promise<void>
    doWhenLeave: (from: any, to: any) => Promise<void>,
    canDestroy: Ref<boolean>,
    loadQtView: (id: number, userId: number) => void,
    isFullScreenPreview: Ref<boolean>
    handleFullPreview: (fullscreen: boolean) => void
    exitFullPreview: () => void
}

// 默认精修视口参数
const defaultRefineViewParams = {
    leftListMargin: {
        right: 345,
        top: 48,
        left: 146,
        bottom: 0
    }
}

// 全部预览视口参数
const fullPreviewRefineViewParams = {
    leftListMargin: {
        right: 45,
        top: 48,
        left: 0,
        bottom: 0
    }
}

// 默认图库列表参数
const defaultGalleryListViewParams = {
    fixWidth: 146,
    leftListPadding: {
        right: 8,
        top: 0,
        left: 8,
        bottom: 0
    },
    leftListMargin: {
        right: 300,
        top: 48,
        left: 0,
        bottom: 0
    }
}

export default function useGetQtViewRepositories(isDestroy: Ref<boolean>): IRepositories {
    const needCreateMainFragment = ref(false)
    const setNeedCreateMainFragmentTag = (from: any, to: any) => {
        needCreateMainFragment.value = ['index', 'importImage'].includes(from.name)
    }

    const refineUUID = ref('')

    const isFullScreenPreview = ref(false)
    const canDestroy = ref(true)
    const isDragging = ref(true)

    const updateDragStatus = async (value: boolean) => {
        isDragging.value = value
        if (refineUUID.value) {
            await refine.switchGrab(refineUUID.value, value)
        }
    }

    const _showFragment = async (id: number, userId: number) => {
        try {
            // 精修大图参数
            const refineViewParams = {
                isInGallery: false,
                projectId: id,
                userId: userId,
                ...defaultRefineViewParams
            }

            // 缩略图参数
            const galleryListViewParams = {
                isInGallery: false,
                projectId: id,
                ...defaultGalleryListViewParams
            }

            if (isDestroy.value) {
                return
            }

            if (needCreateMainFragment.value) {
                let result = await ipcRenderer.send('on-main-fragment-mount', {
                    'refine': refineViewParams,
                    'gallery': galleryListViewParams,
                    'tab': 'photoFinishing'
                })

                refineUUID.value = result.refineUUID
            } else {
                let result = await refine.showRefineFragment(refineViewParams, galleryListViewParams)
                if (isDestroy.value) {
                    return
                }

                if (result && result.refineUUID) {
                    refineUUID.value = result.refineUUID
                } else {
                    let result = await ipcRenderer.send('on-main-fragment-mount', {
                        'refine': refineViewParams,
                        'gallery': galleryListViewParams,
                        'tab': 'photoFinishing'
                    })
                    refineUUID.value = result.refineUUID
                }
            }
            if (isDestroy.value) {
                return
            }
            store.commit('updateExportEffectCfg', {
                isFromRefineTab: true,
                refineOrGalleryUUID: refineUUID.value
            })
            console.log('refineUUID: ', refineUUID)
            store.commit('project/_SetRefineUUID', refineUUID.value)
            await refine.loadGalleryView(refineUUID.value)
        } catch (e) {
            debugger
        }
        canDestroy.value = true
    }


    // 通过Esc
    const onEscKeyboard = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') {
            handleFullPreview(false)
        }
    }
    const listenerEscKeyboardEvent = (isDestroy = false) => {
        if (isDestroy) {
            window.removeEventListener('keyup', onEscKeyboard)
        } else {
            window.addEventListener('keyup', onEscKeyboard)
        }
    }

    // const onTabKeyboard = (e: KeyboardEvent): void => {
    //     if (e.key === 'Tab') {
    //         handleFullPreview(!isFullScreenPreview.value)
    //     }
    // }
    // const listenerTabKeybordEvent = (isDestroy: boolean = false) => {
    //     if (isDestroy) {
    //         window.removeEventListener('keyup', onTabKeyboard)
    //     } else {
    //         window.addEventListener('keyup', onTabKeyboard)
    //     }
    // }

    // onMounted(listenerTabKeybordEvent)
    // onUnmounted(() => listenerTabKeybordEvent(true))

    // 退出全屏预览模式
    const exitFullPreview = async () => {
        if (isDestroy.value) {
            return
        }
        await refine.updateRefineLayout(refineUUID.value, defaultRefineViewParams, { show: true })
        isFullScreenPreview.value = false
        listenerEscKeyboardEvent(false)
    }

    // 进入全屏预览模式
    const fullPreview = async () => {
        if (isDestroy.value) {
            return
        }
        await refine.updateRefineLayout(refineUUID.value, fullPreviewRefineViewParams, { show: false })
        isFullScreenPreview.value = true
        listenerEscKeyboardEvent()
    }

    // 全屏预览模式切换
    const handleFullPreview = debounce(async function (fullscreen: boolean = true) {
        if (fullscreen) {
            await fullPreview()
        } else {
            await exitFullPreview()
        }
    }, 100)

    let qtTimer = ref(0)
    const loadQtView = (id: number, userId: number) => {
        nextTick(() => {
            if (isDestroy.value) {
                return
            }
            canDestroy.value = false
            if (qtTimer.value) {
                clearTimeout(qtTimer.value)
                qtTimer.value = 0
            }
            qtTimer.value = setTimeout(async () => {
                if (isDestroy.value) {
                    return
                }
                await _showFragment(id, userId)
            }, 100)
        })
    }

    const doWhenLeave = async (from: any, to: any) => {
        console.log('doWhenLeave from : ' + from.name, ' to : ' + to.name)
        await refine.updateRefineLayout(refineUUID.value, defaultRefineViewParams, { show: false })
        refine.destroy(refineUUID.value)
        const ret = await refine.hideRefineFragment(refineUUID.value)
        if (to.name == 'index' || to.name == 'Login') {
            await ipcRenderer.send('on-main-fragment-unmount', {})
            store.commit('refine/_SetActiveNavName', 'beauty')
            store.commit('refine/_ClearSyncPresetSettingCache')
            store.commit('project/_SetRefineUUID', '')
        }
        console.log('doWhenLeave result ' + JSON.stringify(ret))
    }

    onUnmounted(() => {
        if (qtTimer.value) {
            clearTimeout(qtTimer.value)
            qtTimer.value = 0
        }
    })

    return {
        refineUUID,
        isDragging,
        canDestroy,

        needCreateMainFragment,
        updateDragStatus,


        setNeedCreateMainFragmentTag,

        handleFullPreview,
        exitFullPreview,

        doWhenLeave,
        loadQtView,
        isFullScreenPreview
    }
}
