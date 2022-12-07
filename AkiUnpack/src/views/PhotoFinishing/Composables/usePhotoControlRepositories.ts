import {
    ref,
    Ref,
    computed, getCurrentInstance, reactive
} from 'vue'
import store from '@/store'

import refine from '@/qt-ipc/business/refine'
// @ts-ignore
import FileUtils from '@/utils/FileUtils'
import { IThumbnail } from '@/qt-ipc/types/refine'
import {CLIENT_NAME, isPro} from '@/universal/types/config'
import ExtraInfoModel from '@/model/ExtraInfoModel'
import PhotoControl, { PhotoCtrlListenerEvent } from '@/view-model/photo-control'
import BeautifyParamsViewModel from '@/view-model/beautifyParamsViewModel'
import PaletteParamsViewModel from '@/view-model/paletteParamsViewModel'
import path from '@/qt-ipc/path'
// @ts-ignore
import clipboard from "qt/clipboard";
import NodeApi from '@/qt-ipc/node-api'
import useRefinePointsRepositories from '@/composables/points/useRefinePointsRepositories'
import {PersonBioModel} from "@/model/PersonBioModel";

interface IDefaultExtend {
    beforeThumbnailChange?: () => void
    isOnlyPreviewPalette: Ref<boolean>
}

export default function usePhotoControlRepositories(isDestroy: Ref<boolean>, refineUUID: Ref<string>, {
    beforeThumbnailChange,
    isOnlyPreviewPalette
}: IDefaultExtend) {
    const that = getCurrentInstance()?.proxy
    const activeThumbnailId = computed(() => store.getters['thumbnail/activeThumbnailId'])
    const activeProject = computed(() => store.getters['project/activeProject'])
    const userId = computed(() => store.getters.userId)

    const photoControl: Ref<PhotoControl | null> = ref(null)

    // loading状态
    const imageState = reactive({
        init: false,
        loading: false,
        loadingText: '',
        effectLoaded: false,
        allowModifyGender: false,
        paintRemoveDefectiveMaskIsEmpty: true,
        allowPainter: false
    })

    // 效果处理开销
    const costTimeObj = reactive({
        costIsPro: ref(isPro),
        costTimeData: {},
        costLastTime: -1,
        costNewTime: -1
    })

    const fitRatio = ref(100)
    const showAllScale = ref(-1)

    let isShowMsg = false
    // 直方图数据
    const histogramData = reactive({
        chartData: {},
        imageInfo: {}
    })

    const { PointFileNotExit, PointFileCopyPath } = useRefinePointsRepositories()

    const _thumbIsValid = async (thumbInfo: IThumbnail): Promise<boolean> => {
        let ret = await FileUtils.isFileExist(thumbInfo.imgPath)
        if (!ret) {
            let imgPath = thumbInfo.imgPath
            let fileName = await path.basename(imgPath)
            let filePath = await FileUtils.findDirPath(imgPath)
            let h = that?.$createElement as any
            let styleTitle = { style: 'font-size: 16px; font-weight: 500; margin: 12px 0 16px; word-break: break-all' }
            let styleContent = { style: 'line-height: 24px; font-weight: 400; word-break: break-all; color: rgba(255, 255, 255, 0.65)' }
            let customTitleEl = h('div', styleTitle, [
                h('span', styleTitle, '"'),
                h('span', styleTitle, `${fileName}` ),
                h('span', styleTitle, '"不存在' ),
            ])

            let customMessageEl = null
            customMessageEl = h('div', styleContent, [
                h('div', { style: 'margin-bottom: 8px' }, '可能是您移动了文件位置或修改了文件名'),
                h('span', {},'原始位置：'),
                h('span', {},`${imgPath}`)
            ])

            that?.tsConfirm({
                title: null,
                customTitleEl: customTitleEl,
                customMessageEl: customMessageEl,
                showCancelButton: false,
                confirmButtonText: '复制原始路径',
                distinguishCancelAndClose: true,
                beforeClose: function (action: string, instance: any, done: () => void) {
                    if (action === 'close') {
                        PointFileNotExit()
                    }
                    done()
                }
            }).then(_ => {
                clipboard.writeText(imgPath)
                that.tsNotify('原始路径已复制')
                PointFileCopyPath()
            }).catch(err =>{
                console.log(err)
            })
            return false
        }

        if (!thumbInfo.isValid) {
            that?.tsConfirm({
                title: '系统提示',
                message: `${CLIENT_NAME}暂时无法打开此文件`,
                showCancelButton: false
            }).then(_ => {
            })
            NodeApi.getExport().asyncReportRawShowError({path: thumbInfo.imgPath, id: thumbInfo.id})
            return false
        }

        return true
    }

    /**
     * 更新背景去瑕疵数据
     */
    function updateBgCleanMode(extraInfoModel: ExtraInfoModel, instance: PhotoControl) {
        const bgCleanMode = extraInfoModel.bgCleanMode
        const bgCleanMooreMode = extraInfoModel.bgCleanMooreMode

        if (bgCleanMode && bgCleanMooreMode) {
            store.commit('refine/_SetDefaultMode', {
                bgCleanModeDefault: bgCleanMode.default,
                bgCleanMooreModeDefault: bgCleanMooreMode.default
            })
            store.commit('refine/_SetBeautifyParams', instance.beautifyViewModel)
        }
    }

    function _destroyPhotoControl() {
        // 清除历史
        histogramData.imageInfo = {}
        histogramData.chartData = {}
        imageState.loadingText = ''
        imageState.paintRemoveDefectiveMaskIsEmpty = true
        imageState.allowPainter = false
        imageState.init = false

        showAllScale.value = -1
        store.commit('refine/_SetBaseValue', { oriWbICC: 0, oriWbTint: 0, loaded: false, isRaw: false })
        store.commit('refine/_ResetCurrParams')
        store.commit('refine/_ResetImageExtraData')
        store.commit('refine/_SetExtendInfo', {})
        store.commit('refine/_SetSymmetryStatusJson', null)
        store.commit('refine/_ResetNavbarDots')

        photoControl.value?.destroy()
        photoControl.value = null
    }

    function _loadPhotoControl(thumbInfo: IThumbnail) {
        photoControl.value = new PhotoControl(userId.value, thumbInfo, activeProject.value.id, refineUUID.value)
            .on(PhotoCtrlListenerEvent.Status, ({ loading, loadingText, allowModifyGender, effectLoaded }: any) => {
                if (!isPro) {
                    // 菊花结束
                    if (imageState.loading && !loading) {
                        costTimeObj.costNewTime = new Date().getTime()
                    }
                    // 菊花开始
                    else if (!imageState.loading && loading) {
                        costTimeObj.costLastTime = new Date().getTime()
                    }
                }
                imageState.init = true
                imageState.loading = loading
                imageState.loadingText = loadingText || ''
                imageState.allowModifyGender = allowModifyGender
                imageState.effectLoaded = effectLoaded
            })
            .on(PhotoCtrlListenerEvent.Scale, (scale: number) => {
                fitRatio.value = scale

                if (showAllScale.value === -1) {
                    showAllScale.value = scale
                }
            })
            .on(PhotoCtrlListenerEvent.ExtraInfo, (data: any, instance: PhotoControl) => {
                const { image, extendInfo: info } = data
                if (image) {
                    store.commit('thumbnail/_UpdateActiveThumbnail', image)
                    store.commit('refine/_SetOriginImgData', {
                        face: [],
                        width: image.originWidth,
                        height: image.originHeight,
                        dpi: image.dpi
                    })
                }

                if (instance.isRaw && info && info.exifInfo) {
                    histogramData.imageInfo = { ...info.exifInfo }
                    store.commit('refine/_SetBaseValue', {
                        oriWbICC: info.exifInfo.oriWbICC,
                        oriWbTint: info.exifInfo.oriWbTint,
                        loaded: true,
                        isRaw: true
                    })
                    store.commit('refine/_SetPaletteParams', instance.paletteViewModel)
                }
            })
            .on(PhotoCtrlListenerEvent.AIResponse, (data: any, instance: PhotoControl) => {
                console.log(`PhotoCtrlListenerEvent.AIResponse...data=`,JSON.stringify(data))
                const { face, faceIsValid, poseRefineInfos, skyInfoJson, symmetryStatusJson } = data

                if (face && face.faces) {
                    // 更新人脸信息（faces原始人脸信息、cacheFaces修改后的人脸信息）
                    let transFaces = []
                    for (const it of face.faces) {
                        transFaces.push(new PersonBioModel(it))
                    }
                    store.commit('initOriginFaceData', transFaces)
                    store.commit('refine/_SetOriginImgData', { face: transFaces })
                    store.commit('refine/_SetSymmetryStatusJson', symmetryStatusJson)

                    // 已加载后 不二次设置人脸tab
                    if (!store.getters.isFaceLoadSuccess) {
                        store.dispatch('refine/updatePersonTypeByFaces', face.cacheFaces || face.faces)
                    }
                }
                store.commit('setIsFaceLoadSuccess', true)

                if (faceIsValid && instance.extraInfoModel) {
                    updateBgCleanMode(instance.extraInfoModel, instance)
                }

                if (poseRefineInfos && poseRefineInfos.length > 0) {
                    store.commit('refine/_SetExtendInfo', { poseRefineInfos })
                }

                if(skyInfoJson){
                    //send sky slider enable info
                    store.commit('refine/_SetSkyExtendInfo', skyInfoJson)
                }
            })
            .on(PhotoCtrlListenerEvent.PresetJsonUpdate, (beautify: BeautifyParamsViewModel, palette: PaletteParamsViewModel) => {
                store.dispatch('refine/updateCurrParamsViewModel', {
                    beautifyViewModel: beautify,
                    paletteViewModel: palette
                })
            })
            .on(PhotoCtrlListenerEvent.PresetSuitUpdate, (data: any) => store.dispatch('thumbnail/ACT_UpdatePresetSuitId', data))
            .on(PhotoCtrlListenerEvent.UpdateHisData, (data: any) => histogramData.chartData = { ...data })
            .on(PhotoCtrlListenerEvent.UpdatePainterInfo, (data: any) => {
                imageState.paintRemoveDefectiveMaskIsEmpty = data.paintRemoveDefectiveMaskIsEmpty
                imageState.allowPainter = data.allowPainter
            })
            .on(PhotoCtrlListenerEvent.UpdateCropInfo, (data: any) => store.commit('refine/_SetOriginImgData', data))
            .on(PhotoCtrlListenerEvent.Notify, (message: string) => that?.tsNotify(message))
            .on(PhotoCtrlListenerEvent.Error, (e: Error) => {
                that?.tsConfirm({
                    title: '系统提示',
                    message: e.message,
                    showCancelButton: false
                }).then(() => {
                })
            })
            .on(PhotoCtrlListenerEvent.UpdateCostTime, (data: any) => costTimeObj.costTimeData = data)
        photoControl.value.start(isOnlyPreviewPalette.value)
    }

    const addThumbnailChangeListener = () => {
        refine.onThumbnailChange(async (thumbInfo) => {
            if(isShowMsg){
                return
            }
            if ((activeThumbnailId.value > 0 && thumbInfo.id === activeThumbnailId.value) || isDestroy.value) {
                return
            }

            isShowMsg = true
            store.commit('thumbnail/_SetSelectedImgIndex', thumbInfo.index)
            store.commit('thumbnail/_SetActiveThumbnail', { imgPath: thumbInfo.imgPath, imgIndex: thumbInfo.index })

            const valid = await _thumbIsValid(thumbInfo)
            isShowMsg = false
            if (!valid || isDestroy.value) {
                return
            }

            store.commit('setIsFaceLoadSuccess', false)
            store.commit('thumbnail/_SetActiveThumbnail', thumbInfo)
            await store.dispatch('refine/initOriParamsViewModel')
            if (isDestroy.value) {
                return
            }

            beforeThumbnailChange && beforeThumbnailChange()

            _destroyPhotoControl()
            _loadPhotoControl(thumbInfo)

            await window.$thumbnailOptRecord.loadThumbnailOptRecord(thumbInfo.id)
        })
    }

    const removeThumbnailChangeListener = () => {
        refine.removeThumbnailChange()
        _destroyPhotoControl()
        beforeThumbnailChange = () => {}
        store.commit('thumbnail/_ResetActiveThumbnail')
        store.commit('refine/_ClearParamsObjCache')
    }

    return {
        photoControl,
        imageState,

        costTimeObj,

        fitRatio,
        showAllScale,
        histogramData,

        addThumbnailChangeListener,
        removeThumbnailChangeListener,
        reloadProcessImage: (mode: string) => photoControl.value?.reloadProcessImage(mode)
    }
}
