import {
    IAIResponse,
    IExtraInfo, IFaceBox,
    IImageStatus, IListViewParams, IPersonBio, IPresetSuitJson,
    IRefine,
    IThumbnail,
    IThumbnailChangeFunc
} from '@/qt-ipc/types/refine'
import NodeApi from '@/qt-ipc/node-api'
// @ts-ignore
import { hexToBytes, hexToInt } from '@/utils/utils'
import { IOptionObject, Optional } from '@/types'
import { OperateCropMode } from '@/view-model/photoControl/contants/operateEnum'
import { SignalKeyboardEventName } from '@/qt-ipc/constants/common'
import { IFormatCheckJson } from '@/types/preset'

export enum RefineListenerEvent {
    ThumbnailChange = 'thumbnailChange',
    ThumbnailStatus = 'thumbnailStatus',
    ThumbnailExtraInfo = 'thumbnailExtraInfo',
    ThumbnailScale = 'ThumbnailScale',
    SignalSelectionChanged = 'signalSelectionChanged',
    ThumbnailAIResponse = 'signalThumbnailAIResponse',
    ThumbnailCanChooseItem = 'ThumbnailCanChooseItem',
    ThumbnailPainterRecord = 'ThumbnailPainterRecord',
    SignalKeydownSpace = 'signalKeydownSpace',
    SignalThumbnailEvent = 'SignalThumbnailEvent',
    SignalUpdatePreviewSize = 'SignalUpdatePreviewSize',
    SignalUpdateShowCompleteInfo = 'SignalUpdateShowCompleteInfo',
    signalMouseAndKeyboardEvent = 'signalMouseAndKeyboardEvent'
}

export enum RefineThumbnailEventId {
    CropInfo = 'cropInfo',
    UpdateHisData = 'hisData',
    UpdatePainterInfo = 'painterInfo',
    CostTimeRecorder = 'costTime',
    ProcessCode = 'processCode',
    Rotate = 'rotate',
    FinishCrop = 'finishCrop',
    ChangeRatio = 'changeRatio',
    PresetUpdate = 'presetUpdate'
}

export class Refine implements IRefine {
    functionMap: Map<RefineListenerEvent, Function> = new Map()

    registerListener(): void {

        // const that = this
        // function cb<T> (event: RefineListenerEvent): ISignalConnectCallback<T> {
        //     return function (data: T): any {
        //         const func = that.functionMap.get(event)
        //         if (func) {
        //             return func(data)
        //         }
        //     }
        // }

        NodeApi.refine.signalThumbnailChange?.connect((data: IThumbnail) => {
            const func = this.functionMap.get(RefineListenerEvent.ThumbnailChange)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalThumbnailStatus?.connect((data: IImageStatus) => {
            const func = this.functionMap.get(RefineListenerEvent.ThumbnailStatus)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalThumbnailExtraInfo?.connect((data: IExtraInfo) => {
            const func = this.functionMap.get(RefineListenerEvent.ThumbnailExtraInfo)
            if (func) {
                const { id, image, extendInfo, imgFormat } = data

                func({
                    id,
                    image,
                    extendInfo: {
                        exifInfo: extendInfo.exifInfo,
                        hisData: extendInfo.hisData || null
                    },
                    imageType: imgFormat
                })
            }
        })

        NodeApi.refine.signalThumbnailScale?.connect((data: any) => {
            const func = this.functionMap.get(RefineListenerEvent.ThumbnailScale)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalThumbnailSelection?.connect((data: any) => {
            let func = this.functionMap.get(RefineListenerEvent.SignalSelectionChanged)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalThumbnailAIResponse?.connect((data: IAIResponse) => {
            let func = this.functionMap.get(RefineListenerEvent.ThumbnailAIResponse)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalThumbnailCanChooseItem?.connect((data: any) => {
            let func = this.functionMap.get(RefineListenerEvent.ThumbnailCanChooseItem)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalPainterRecord?.connect((data: any) => {
            const func = this.functionMap.get(RefineListenerEvent.ThumbnailPainterRecord)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalKeydownSpace?.connect((data: any) => {
            const func = this.functionMap.get(RefineListenerEvent.SignalKeydownSpace)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalThumbnailEvent?.connect((data: any) => {
            const func = this.functionMap.get(RefineListenerEvent.SignalThumbnailEvent)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalUpdatePreviewSize?.connect((data: any) => {
            const func = this.functionMap.get(RefineListenerEvent.SignalUpdatePreviewSize)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalUpdateShowCompleteInfo?.connect((data: any) => {
            const func = this.functionMap.get(RefineListenerEvent.SignalUpdateShowCompleteInfo)
            if (func) {
                func(data)
            }
        })

        NodeApi.refine.signalMouseAndKeyboardEvent?.connect((data: SignalKeyboardEventName) => {
            const func = this.functionMap.get(RefineListenerEvent.signalMouseAndKeyboardEvent)
            if (func) {
                func(data)
            }
        })
    }

    onThumbnailChange(callback: IThumbnailChangeFunc): void {
        this.addListener(RefineListenerEvent.ThumbnailChange, callback)
    }

    removeThumbnailChange(): void {
        this.removeListener(RefineListenerEvent.ThumbnailChange)
    }

    onThumbnailCanChooseItem(callback: IThumbnailChangeFunc): void {
        this.addListener(RefineListenerEvent.ThumbnailCanChooseItem, callback)
    }


    addListener<T extends RefineListenerEvent>(name: T, callBack: Function): void {
        this.functionMap.set(name, callBack)
    }

    removeListener<T extends RefineListenerEvent>(name: T): void {
        this.functionMap.delete(name)
    }

    removeAllListener(): void {
        this.functionMap.clear()
    }

    showRefineFragment(refineViewParams: IListViewParams, galleryListViewParams: IListViewParams): Promise<any> {
        return NodeApi.refine.showRefineFragment(refineViewParams, galleryListViewParams)
    }

    hideRefineFragment(refineUuid: string): Promise<void> {
        return NodeApi.refine.hideRefineFragment(refineUuid)
    }

    loadGalleryView(refineUuid: string): Promise<void> {
        return NodeApi.refine.loadGalleryView(refineUuid)
    }

    // 更新精修qt view样式
    updateRefineLayout(refineUuid: string, refineViewParams: IListViewParams, galleryListViewParams: IListViewParams): Promise<void> {
        return NodeApi.refine.updateRefineLayout(refineUuid, refineViewParams, galleryListViewParams)
    }

    // applyPresetSuit(thumbnailId: number, toningConfigStr: string | null, configJsonStr: string): Promise<void> {
    //     return NodeApi.refine.applyPresetSuit(thumbnailId, toningConfigStr, configJsonStr)
    // }

    applyPresetSuit(refineUuid: string, photoID: string, presetSuitId: string, presetName: string): Promise<void> {
        return NodeApi.refine.applyPresetSuit(refineUuid, photoID, presetSuitId, presetName)
    }

    cancelProcess(thumbnailId: number): void {
    }

    destroy(refineUuid: string): void {
        this.removeAllListener()
        NodeApi.refine.destroy(refineUuid)
    }

    getCurrentThumbnail(): Promise<IThumbnail> {
        return Promise.resolve({
            id: 0,
            imgPath: '',
            rotation: 0,
            width: 0,
            height: 0,
            imgFormat: 1,

            isValid: true,
            index: 0,

            presetSuitId: '-1',
            presetId: '-1',
            palettePresetId: '-1'
        } as IThumbnail)
    }

    loadImage(refineUuid: string, thumbnailId: number, isOnlyPalette: boolean = false): Promise<string> {
        return NodeApi.refine.loadImage(refineUuid, thumbnailId, isOnlyPalette)
    }

    updateEffect(refineUuid: string, photoID: string, name: string, path: string, personType: number = -1): void {
        return NodeApi.refine.updateEffect(refineUuid, photoID, name, path, personType)
    }

    refreshThumb(): void {
    }

    releaseMemory(thumbnailId: number): void {
    }

    setPaletteValue(refineUuid: string, photoID: string, value: number, flag: number, colorFlag?: number, realtime: boolean = false, ext?: string): void {
        console.log('setPaletteValue: ', 'flag = ', flag, ' value = ', value, ' realtime = ', realtime, ' ext = ' , ext)
        return NodeApi.refine.setPaletteValue(refineUuid, photoID, value, flag, typeof colorFlag === 'number' ? colorFlag : -1, realtime, ext)
    }

    setBeautifyValue(refineUuid: string, photoID: string, value: number, flag: number, personType?: number, realtime: boolean = false, ext?: string): void {
        console.log('setBeautifyValue: ', 'flag = ', flag, ' value = ', value, ' realtime = ', realtime, ' ext = ' , ext, ' personType : ', personType)
        return NodeApi.refine.setBeautifyValue(refineUuid, photoID, value, flag, typeof personType === 'number' ? personType : -1, realtime, ext)
    }

    batchSetValue(refineUuid: string, photoID: string, data: any[], realtime: boolean = false, ext?: string): void {
        console.log('batchSetValue: ', realtime, ' data = ', data, ' ext = ' , ext)
        return NodeApi.refine.batchSetValue(refineUuid, photoID, data, realtime, ext)
    }

    changeRatio(refineUuid: string, photoID: string, ratio: number): void {
        return NodeApi.refine.changeRatio(refineUuid, photoID, ratio)
    }

    imageResize(refineUuid: string, photoID: string, mode: string): void {
        return NodeApi.refine.imageResize(refineUuid, photoID, mode)
    }

    imageCompare(refineUuid: string, photoID: string, mode: string): void {
        return NodeApi.refine.imageCompare(refineUuid, photoID, mode)
    }

    loadConfigJsonStr(refineUuid: string, photoID: string, toningConfigStr: string): void {
        NodeApi.refine.loadConfigJsonStr(refineUuid, photoID, toningConfigStr)
    }

    setBgCleanMode(refineUuid: string, photoID: string, value: number): void {
        NodeApi.refine.setBgCleanMode(refineUuid, photoID, value)
    }

    applyPresetToOther(refineUuid: string, json?: IFormatCheckJson | {}): Promise<number[]> {
        return NodeApi.refine.applyPresetToOther(refineUuid, json || {})
    }

    saveDataToCache(id: number, type: string = '', jsonStr: string): Promise<void> {
        return NodeApi.refine.saveDataToCache(id, type, jsonStr || '')
    }

    reloadProcessImage(refineUuid: string, photoID: string, mode: string): void {
        NodeApi.refine.reloadProcessImage(refineUuid, photoID, mode || '')
    }

    handlerAfterSecondImport(refineUuid: string): Promise<void> {
        return NodeApi.refine.handlerAfterSecondImport(refineUuid)
    }

    applyAllPreset(galleryUUID: string, params: { presetSuitId: any, presetId: any, palettePresetId: any }): Promise<boolean> {
        return NodeApi.refine.applyAllPreset(galleryUUID, params)
    }

    switchGrab(refineUuid: string, isGrabbing: boolean): Promise<void> {
        return NodeApi.refine.switchGrab(refineUuid, isGrabbing)
    }

    useProcessMode(refineUuid: string, photoID: string, tool: string): Promise<void> {
        return NodeApi.refine.useProcessMode(refineUuid, photoID, tool)
    }

    closeProcessMode(refineUuid: string, photoID: string, operate: number = 0): Promise<void> {
        return NodeApi.refine.closeProcessMode(refineUuid, photoID, operate)
    }

    handleRemoveDefectivePaintMask(refineUuid: string, photoID: string, mode: number): void {
        return NodeApi.refine.handleRemoveDefectivePaintMask(refineUuid, photoID, mode)
    }

    handlePhotoControlOperate(refineUuid: string, photoID: string, operate: number, ext = {}): void {
        return NodeApi.refine.handlePhotoControlOperate(refineUuid, photoID, operate, ext)
    }

    handleLiquifyOperate(refineUuid: string, photoID: string, operate: number, ext = {}): void {
        return NodeApi.refine.handleLiquifyOperate(refineUuid, photoID, operate, ext)
    }

    switchTool(refineUuid: string, photoID: string, tool: string, args: IOptionObject<any>): Promise<void> {
        return NodeApi.refine.switchTool(refineUuid, photoID, tool, args)
    }

    locatePainterStep(refineUuid: string, photoId: string, uuid: string, mode?: string): Promise<void> {
        return NodeApi.refine.locatePainterStep(refineUuid, photoId, uuid, mode)
    }

    getPreviewSize(): Promise<void>{
        return NodeApi.refine.getPreviewSize()
    }

    handleEnableUndoRedo(enable: boolean): Promise<void> {
        return NodeApi.refine.handleEnableUndoRedo(enable)
    }

    handleRotate(refineUuid: string, photoId: string, angle: number): void {
        return NodeApi.refine.handleRotate(refineUuid, photoId, angle)
    }

    handleFlit(refineUuid: string, photoId: string, flitX: number, flitY: number): void {
        return NodeApi.refine.handleFlit(refineUuid, photoId, flitX, flitY)
    }

    handleCrop(refineUuid: string, photoId: string, operate: OperateCropMode = OperateCropMode.Update, data: any): void {
        console.debug("handleCrop: ", data)
        return NodeApi.refine.handleCrop(refineUuid, photoId, operate, data)
    }

    // 人脸裁剪，修改人脸数据,Qt层(拿到人脸数据上传服务端，拿到服务端数据，塞给底层)
    updateFace(refineUuid: string,faceNormalizes:IFaceBox [],faceIdFilters:number[],thumbnailId:number):Promise<IPersonBio[]>{
        return NodeApi.refine.updateFace(refineUuid, faceNormalizes,faceIdFilters,thumbnailId)
    }

    // 删除人脸
    removeFace(refineUuid: string,faceNormalize:Map<string,IFaceBox>,imageId:number):Promise<boolean>{
        return NodeApi.refine.removeFace(refineUuid, faceNormalize,imageId)
    }

    // 获取预设数据
    getPresetSuitJson(refineUuid: string, json?: IFormatCheckJson | {}): Promise<IPresetSuitJson> {
        return NodeApi.refine.getPresetSuitJson(refineUuid, json || {})
    }

}

export default new Refine()
