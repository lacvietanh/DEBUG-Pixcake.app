import { computed, ComputedRef, nextTick, Ref, ref, watch } from 'vue'
import { debounce } from 'lodash'

import { checkHasGuideRecord, DictionaryKeys, insertGuideRecord } from '@/universal/datastore/dictionaryDao'
import PhotoControl, { PhotoCtrlListenerEvent } from '@/view-model/photo-control'
import useRefinePointsRepositories from '@/composables/points/useRefinePointsRepositories'
import store from '@/store'

export interface IRepositories {
    isInColorNav: ComputedRef<boolean>
    isOnlyPaletteEffect: Ref<boolean>

    showPaletteUpdateGuide: Ref<boolean>,
    showHiddenEffectTip: Ref<boolean>,
    checkIsShowHiddenEffectTip: (forceCheck?: boolean) => Promise<void>,
    cacheHiddenEffectTip: () => Promise<void>
}

export default function usePaletteRepositories(photoControlRef: Ref<PhotoControl>, activeNavName: Ref<string>, isFullScreenPreview: Ref<boolean>): IRepositories {

    const showPaletteUpdateGuide = ref(false)
    const hasCachePreviewTip = ref(false)

    const { PointPreviewColorMode, PointPreviewFullMode } = useRefinePointsRepositories()


    const isOnlyPaletteEffect = computed({
        get: () => store.getters['refine/isOnlyPaletteEffect'],
        set: (bool) => {
            if (bool) {
                PointPreviewColorMode()
            } else {
                PointPreviewFullMode()
            }
            store.commit('refine/_SetIsOnlyPaletteEffect', bool)
        }
    })

    // 查看是否存在已确认引导提示
    const checkHasHiddenEffectTip = async () => {
        if (hasCachePreviewTip.value) {
            return
        }
        const bool = await checkHasGuideRecord(DictionaryKeys.HiddenPreviewEffectTip)
        if (bool) {
            hasCachePreviewTip.value = true
            if (isOnlyPaletteEffect.value) {
                await checkIsShowHiddenEffectTip()
            }
        } else {
            PointPreviewInit()
            showPaletteUpdateGuide.value = true
        }
    }

    const hiddenTipTimer = ref(0)
    const clearTimer = () => {
        if (hiddenTipTimer.value) {
            clearTimeout(hiddenTipTimer.value)
            hiddenTipTimer.value = 0
        }
    }

    const showHiddenEffectTip = ref(false)
    const isInColorNav = computed(() => activeNavName.value === 'color')
    watch(() => isInColorNav.value, async (value) => {
        if (!value) {
            showHiddenEffectTip.value = false
            showPaletteUpdateGuide.value = false
            clearTimer()
        } else {
            await checkHasHiddenEffectTip()
        }
    }, {
        immediate: true
    })

    // 切换预览模式
    const reloadProcessImage = debounce(function (bool: boolean) {
        photoControlRef.value?.reloadProcessImage(bool ? 'onlyPreviewPalette' : 'previewAll')
    }, 100)
    watch(isOnlyPaletteEffect, async (val) => {
        reloadProcessImage(val)

        if (val) {
            await checkIsShowHiddenEffectTip()
        }
    })


    const { PointPreviewInit } = useRefinePointsRepositories()
    // 检测是否显示隐藏效果提示
    const checkIsShowHiddenEffectTip = async () => {
        if (!hasCachePreviewTip.value) {
            return
        }
        // 存在美化效果时，需要显示引导提示
        const hasEffect = photoControlRef.value.hasBeautifyEffect()
        if (!hasEffect) {
            clearTimer()
            showHiddenEffectTip.value = false
            return
        }

        PointPreviewInit()
        clearTimer()

        setTimeout(() => {
            nextTick(() => {
                showHiddenEffectTip.value = true
                hiddenTipTimer.value = setTimeout(async () => {
                    showHiddenEffectTip.value = false
                    hiddenTipTimer.value = 0
                }, 4000)
            })
        }, 300)
    }

    // 用户确认知道隐藏效果提示
    const cacheHiddenEffectTip = async () => {
        if (hasCachePreviewTip.value) {
            return
        }
        showPaletteUpdateGuide.value = false
        await insertGuideRecord(DictionaryKeys.HiddenPreviewEffectTip)
        setTimeout(() => nextTick(() => hasCachePreviewTip.value = true), 100)
    }

    let isChangeImage = ref(false)
    // 在仅调色预览模块监听预设变化
    watch(photoControlRef, async (photoControl) => {
        isChangeImage.value = true
        photoControl.on(PhotoCtrlListenerEvent.PresetJsonUpdate, async () => {
            if (isOnlyPaletteEffect.value && isInColorNav.value) {
                await checkIsShowHiddenEffectTip()
            }
            isChangeImage.value = false
        })
    })

    return {
        isInColorNav,
        isOnlyPaletteEffect,

        showPaletteUpdateGuide,
        showHiddenEffectTip,

        checkIsShowHiddenEffectTip,
        cacheHiddenEffectTip
    }
}
