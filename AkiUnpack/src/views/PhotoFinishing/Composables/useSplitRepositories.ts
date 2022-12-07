import {
    ref,
    watch,
    Ref,
    onMounted,
    computed, nextTick, onUnmounted
} from 'vue'
import store from '@/store'

import { UserPreferenceSettingModel } from '@/universal/model/UserPreferenceSettingModel'

interface IUseSplitRepositories {
    splitValue: Ref<number>,
    splitManualVal: Ref<number>
    presetHeight: Ref<number>,
    histogramHeight: Ref<number>,

    updateParamsComRefHeight: () => void
}

const chartTitleHeight = 38.5
const presetTitleHeight = 38.5

export default function useSplitRepositories(data: any): IUseSplitRepositories {
    const isRaw = computed(() => store.getters['refine/isRaw'])

    const paramsComRefHeight = ref(0)

    const splitValue = ref(0.3)
    const splitManualVal = ref(0.3)
    const cacheHeight = ref(0)

    // 计算预设高度
    const presetHeight = computed(() => {
        if (cacheHeight.value) {
            return cacheHeight.value
        }

        const height = paramsComRefHeight.value * splitValue.value - presetTitleHeight

        if (height < 0) {
            return 0
        }

        return height
    })

    watch(data.activeNames, (keys: string[]) => {
        if (!keys.includes('preset')) {
            cacheHeight.value = presetHeight.value
            splitValue.value = presetTitleHeight / paramsComRefHeight.value
        } else {
            splitValue.value = splitManualVal.value
            cacheHeight.value = 0
        }
    })

    // 只记手动拖拽的
    watch(splitManualVal, (val) => {
        let userPreferModel = new UserPreferenceSettingModel()
        userPreferModel.setRefineParamsSplitValue(val)
    })

    const initSplitVal = () => {
        let userPreferModel = new UserPreferenceSettingModel()
        userPreferModel.getRefineParamsSplitValue().then((v) => {
            if (v) {
                const value = Number(v)
                splitValue.value = data.activeNames.value.includes('preset')
                    ? value
                    : (presetTitleHeight / paramsComRefHeight.value)
                splitManualVal.value = value
            }
        })
    }
    onMounted(initSplitVal)

    // 更新直方图区块高度
    const histogramHeight = ref(chartTitleHeight)
    const updateHistogramHeight = (): void => {
        const domRef = data.getHistogramRef()
        if (!domRef) {
            return
        }
        const tsHistogramH = domRef.$children[0].getHeight(isRaw.value)
        if (!tsHistogramH) {
            return
        }

        if (data.activeNames.value.includes('histogram')) {
            histogramHeight.value = tsHistogramH + chartTitleHeight
        } else {
            histogramHeight.value = chartTitleHeight
        }
    }
    onMounted(updateHistogramHeight)
    watch(isRaw, updateHistogramHeight)
    watch(data.activeNames, updateHistogramHeight)

    // 更新右侧面板容器高度
    const updateParamsComRefHeight = (): void => {
        nextTick(() => {
            let domRef = data.getParamsComRef()
            if (!domRef || !domRef.getBoundingClientRect().height) {
                return
            }
            console.log("domRef.getBoundingClientRect().height: ", domRef.getBoundingClientRect().height)
            paramsComRefHeight.value = domRef.getBoundingClientRect().height
        })
    }
    onMounted(updateParamsComRefHeight)

    // 监听窗口大小变更
    const listenResizeEvent = (isDestroy: boolean = false) => {
        if (isDestroy) {
            window.addEventListener('resize', updateParamsComRefHeight)
        } else {
            window.removeEventListener('resize', updateParamsComRefHeight)
        }
    }

    onMounted(() => listenResizeEvent(true))
    onUnmounted(() => listenResizeEvent(false))

    return {
        splitValue,
        splitManualVal,
        presetHeight,
        histogramHeight,

        updateParamsComRefHeight
    }
}
