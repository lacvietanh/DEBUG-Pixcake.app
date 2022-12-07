import { reactive, ref, Ref, watch, UnwrapNestedRefs } from 'vue'
import PhotoControl from '@/view-model/photo-control'
import store from '@/store'
import { RefineThumbnailEventId } from '@/qt-ipc/business/refine'
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'

interface IRepositories {
    cropConfig: UnwrapNestedRefs<{
        rotate: number
    }>

    finishCrop: () => void
    useCropTool: () => void

    handleRotate: (val: number, mode: string) => void,
    handleResetCrop: (val: any) => void,
    handleFlip: (x: number, y: number) => void,
    handleCrop: (data: any) => void,
}

interface IOptions {
    beforeOpenMode: () => void
    beforeCloseMode: () => void
}

export default function useCropRepositories (photoControl: Ref<PhotoControl>, options?: IOptions): IRepositories {

    const cropConfig = reactive({
        rotate: 0,
        showCropResetBtn: false
    })

    const { PointCropFinish } = useParamsPointsRepositories()

    const useCropTool = () => {
        options && options?.beforeOpenMode()
        const obj = photoControl.value.useCropTool()
        store.commit('refine/_SetCropInitObject', obj)
    }

    const finishCrop = (): void => {
        options && options?.beforeCloseMode()
        PointCropFinish(photoControl.value.getCropObj())
        photoControl.value.closeTool()
        cropConfig.showCropResetBtn = false
        cropConfig.rotate = 0
    }

    watch(photoControl, (instance: PhotoControl) => {
        instance?.on('on-rotate', (value: number) => {
            cropConfig.rotate = value
        })

        instance?.on(RefineThumbnailEventId.FinishCrop, () => {
            finishCrop()
        })
    })

    return {
        cropConfig,
        finishCrop,
        useCropTool,

        handleRotate: (val: number, mode: string) => {
            cropConfig.rotate = val
            photoControl.value?.handleRotate(val, mode)
        },
        handleResetCrop: (val: any) => photoControl.value?.handleResetCrop(val),
        handleFlip: (x: number, y: number) => photoControl.value.handleFlip(x, y),
        handleCrop: (data: any) => photoControl.value?.handleCrop(data),
    }
}
