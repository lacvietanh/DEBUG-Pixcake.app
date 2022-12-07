import { nextTick, onUnmounted, Ref, ref } from 'vue'
// @ts-ignore
import Driver from '@/components/TsDriver'
import useRefinePointsRepositories from '@/composables/points/useRefinePointsRepositories'
import { GuideStoryKey } from '@/constants/constants'
import { APP_VERSION } from '@/constants/config'
import QtEventFilter, { QtEventFilterType } from '@/utils/QtEventFilter'

interface IUseRefineGuideRepositories {
    handleGuideStart: () => void
    destroy: () => void
}

export enum GuideId {
    NavBarColor = 'guide__refine-nav-bar-color',
    NavBarBackground = 'guide__refine-nav-bar-background',
    NavBarCrop = 'guide__refine-nav-bar-crop',
    NavBarHistory = 'guide__refine-nav-bar-history',
    PresetSettings = 'guide__refine-preset-settings'
}

const CURR_LOCAL_VALUE = '1' // 当前值，数值一致表示已缓存

export default function useRefineGuideRepositories(): IUseRefineGuideRepositories {

    const { PointGuideImgAdjust, PointGuideBackground, PointGuideCrop, PointGuideHistory, PointGuidePresetSettings } = useRefinePointsRepositories()

    const _onFinishGuide = (): void => {
        localStorage.setItem(GuideStoryKey.RefineNavBar, CURR_LOCAL_VALUE)
    }

    const steps1 = [
        {
            element: `#${ GuideId.NavBarColor }`,
            popover: {
                className: 'first-step-popover-class',
                title: '色彩调节功能，支持RAW调色',
                description: '图像调节功能移动到这里了',
                position: 'left'
            },
            onNext: () => PointGuideImgAdjust()
        },
        {
            element: `#${ GuideId.NavBarBackground }`,
            popover: {
                title: '一键背景修复&证件照调整',
                description: '背景调整&证件照换背景移动到这里了',
                position: 'left'
            },
            onNext: () => PointGuideBackground()
        },

        {
            element: `#${ GuideId.NavBarCrop }`,
            popover: {
                title: '新增裁剪功能',
                description: '支持对图片进行裁剪&旋转了，证件照裁剪功能也移动到这里了',
                position: 'left'
            },
            onNext: () => PointGuideCrop()
        },

        {
            element: `#${ GuideId.NavBarHistory }`,
            popover: {
                title: '新增历史记录功能',
                description: '支持撤销&重做操作了',
                position: 'left'
            },
            onNext: () => {
                PointGuideHistory()
                _onFinishGuide()
            }
        },

        {
            element: `#${ GuideId.PresetSettings }`,
            popover: {
                title: '',
                description: '可以自定义模块进行同步啦',
                position: 'top-right'
            },
            onNext: () => {
                PointGuidePresetSettings()
                _onFinishGuide()
            }
        }
    ]

    const steps2 = [
        {
            element: `#${ GuideId.NavBarCrop }`,
            popover: {
                title: '新增裁剪功能',
                description: '支持对图片进行裁剪&旋转了，证件照裁剪功能也移动到这里了',
                position: 'left'
            },
            onNext: () => {
                PointGuideCrop()
            }
        },
        {
            element: `#${ GuideId.PresetSettings }`,
            popover: {
                title: '',
                description: '可以自定义模块进行同步啦',
                position: 'top-right'
            },
            onNext: () => {
                PointGuidePresetSettings()
                _onFinishGuide()
            }
        }
    ]

    let timer = 0

    const driver: Ref<Driver | null> = ref(null)
    const handleGuideStart = (): void => {
        const value = localStorage.getItem(GuideStoryKey.RefineNavBar)
        if (value === CURR_LOCAL_VALUE) {
            return
        }

        const steps = !!value ? steps2 : steps1

        timer = setTimeout(() => {
            driver.value = new Driver({
                autocompleteWait: 10000,
                autoComplete: true,
                nextBtnText: '下一步',
                doneBtnText: '我知道了',
                padding: 2,
                opacity: 0.4,
                allowClose: false,
                showPreviewButton: false,
                onCloseClicked: () => _onFinishGuide(),
                onClose: () => {
                    QtEventFilter.getInstance().process([QtEventFilterType.Mouse, QtEventFilterType.KeyBoard], true)
                }
            })
            driver.value.defineSteps(steps)
            nextTick(() => {
                QtEventFilter.getInstance().process([QtEventFilterType.Mouse, QtEventFilterType.KeyBoard], false)
                driver.value?.start()
                _onFinishGuide()
            })
        }, 300)
    }

    onUnmounted(() => {
        if (timer) {
            clearTimeout(timer)
            timer = 0
        }
        driver.value = null
    })

    return {
        handleGuideStart,
        destroy: () => {
        }
    }
}
