import QtEventFilter, { QtEventFilterType } from '@/utils/QtEventFilter'

interface IRepositories {
    onInputFocus: () => void
    onInputBlur: () => void

    onDialogFocus: () => void,
    onDialogBlur: () => void,

    stopMousePropagation: (val: boolean) => void
}

export default function useFocusAndBlurRepositories(): IRepositories {
    const onInputFocus = () => {
        new QtEventFilter().process([QtEventFilterType.KeyBoard], false)
    }

    const onInputBlur = () => {
        new QtEventFilter().process([QtEventFilterType.KeyBoard], true)
    }

    const onDialogFocus = () => {
        new QtEventFilter().process([QtEventFilterType.KeyBoard, QtEventFilterType.Mouse], false)
    }

    const onDialogBlur = () => {
        new QtEventFilter().process([QtEventFilterType.KeyBoard, QtEventFilterType.Mouse], false)
    }

    const stopMousePropagation = (val: boolean = true) => {
        console.debug("stopMousePropagation: ", val)
        new QtEventFilter().process([QtEventFilterType.Mouse], !val)
    }

    return {
        onInputFocus,
        onInputBlur,

        onDialogFocus,
        onDialogBlur,

        stopMousePropagation
    }
}
