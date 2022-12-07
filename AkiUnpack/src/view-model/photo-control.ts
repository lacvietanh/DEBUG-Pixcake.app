import refine, { RefineListenerEvent, RefineThumbnailEventId } from '@/qt-ipc/business/refine'
import EventEmitter from '@/utils/event-emitter'
import { debounce } from 'lodash'

import { IOptionObject, Optional } from '@/types'
import {
    IAIResponse,
    ICropInfo,
    IExtraInfo,
    IHisData,
    IImageStatus, IProcessCode,
    IThumbnail,
    IThumbnailEvent
} from '@/qt-ipc/types/refine'
import { ImageLoadErrorCode, ImageLoadingStatus, ImageType, PresetSuitIdType } from '@/universal/types/constants'
import { EffectAlgoVersion, EffectParamEnum } from '@/constants/presetParams/ParamEnum'

import PaletteParamsViewModel from './paletteParamsViewModel'
import BeautifyParamsViewModel from './beautifyParamsViewModel'

import PersonEffectItemModel from '@/model/EffectsModel/PersonEffectItemModel'
import HslParamModel from '@/model/ParamsModel/HslParamModel'
import PersonParamModel from '@/model/ParamsModel/PersonParamModel'
import WhiteBalanceParamModel from '@/model/ParamsModel/WhiteBalanceParamModel'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
import ExtraInfoModel from '@/model/ExtraInfoModel'
import AlgoVersionModel from '@/model/AlgoVersionModel/AlgoVersionModel'
// @ts-ignore
import { getLastPathName, hexToInt } from '@/utils/utils'
import PainterControl from './photoControl/DefectControl'
import EffectModel from '@/model/EffectsModel/EffectModel'
import { RefineProcessCodeMapping } from '@/constants/constants'
import NodeApi from '@/qt-ipc/node-api'
import { MemoryMonitor } from '@/utils/monitor/memoryMonitor'
import { CLIENT_NAME } from '@/universal/types/config'
import { ICropAndRotateObject } from '@/types/refine'
import LiquefyControl from '@/view-model/photoControl/LiquefyControl'
import { OperateCropMode, QtPhotoMode, QtPhotoOperate } from '@/view-model/photoControl/contants/operateEnum'


// 可监听事件列表
export enum PhotoCtrlListenerEvent {
    Notify = 'notify',
    Status = 'status',
    Scale = 'scale',
    ExtraInfo = 'extra-info',
    Error = 'error',
    PresetJsonUpdate = 'preset-update',
    PresetSuitUpdate = 'preset-suit-id-update',
    AIResponse = 'ai-response',
    UpdateHisData = 'hisData',
    UpdateCropInfo = 'updateCropInfo',
    UpdatePainterInfo = 'updatePainterInfo',
    UpdateCostTime = 'updateCostTime'
}

export enum PreviewMode {
    PreviewAll = 'previewAll',
    OnlyPreviewPalette = 'onlyPreviewPalette'
}

export default class PhotoControl extends EventEmitter {
    userId: number
    projectId: number

    thumbnailModel: IThumbnail
    imgIndex: number = -1
    isDestroy: boolean = false

    refineUUID: string
    photoID: string = ''

    paletteViewModel: Optional<PaletteParamsViewModel> = null
    beautifyViewModel: Optional<BeautifyParamsViewModel> = null
    extraInfoModel: Optional<ExtraInfoModel> = null
    exifInfo: IOptionObject<string | number> = {}

    painterControl: Optional<PainterControl> = null
    liquefyControl: Optional<LiquefyControl> = null

    private _isLoadingThumb = false // 是否加载过缩略图
    private _thumbnailLoading = false
    private _imageLoading = false
    private _algorithmLoading = false
    private _maskLoading = false
    private _loadingText = ''

    private isPainting: boolean = false // 是否正在涂抹

    updateTime: number = +new Date()
    isSetEffectHis: boolean = false

    private _paintRemoveDefectiveMaskIsEmpty: boolean = true
    private _allowPainter: boolean = false

    private _isOnlyPreviewPalette: boolean = false

    constructor(userId: number, thumbnailModel: IThumbnail, projectId: number, refineUUID: string) {
        super()
        MemoryMonitor.shareInstance().addObject(this)
        this.userId = userId
        this.projectId = projectId

        this.thumbnailModel = thumbnailModel
        this.refineUUID = refineUUID
        this.registerListener()
    }

    get thumbnailId(): number {
        return this.thumbnailModel.id || -1
    }

    get imgFormat(): number {
        return this.thumbnailModel.imgFormat
    }

    getPhotoControlInfo(): any {
        return {
            refineUUID: this.refineUUID,
            projectId: this.projectId,
            photoID: this.photoID,
            imgPath: this.thumbnailModel.imgPath,
            thumbnailId: this.thumbnailId
        }
    }

    /**
     * 是否是raw图
     */
    get isRaw(): boolean {
        return this.imgFormat === ImageType.Raw
    }

    get imgPath(): string {
        return this.thumbnailModel.imgPath
    }

    get allowModifyGender(): boolean {
        return !this._thumbnailLoading && !this._imageLoading
    }

    // 效果图加载完成
    get effectLoaded(): boolean {
        return !this._thumbnailLoading && !this._imageLoading && !this._algorithmLoading
    }

    get allowPainter(): boolean {
        return this.effectLoaded && this._allowPainter
    }

    get loading(): boolean {
        return this._thumbnailLoading
            || this.quickCancelImageLoading
            || this._algorithmLoading
            || this._maskLoading
    }

    // 原图loading状态
    get quickCancelImageLoading(): boolean {
        // 无效果情况下，加载完缩略图 取消原图loading
        if (this.thumbnailModel.presetSuitId === PresetSuitIdType.NoEffect) {
            return (!this._isLoadingThumb && this._imageLoading)
        }
        return this._imageLoading
    }

    emit(event: string, ...data: any[]): this {
        if (this.isDestroy) {
            return this
        }
        return super.emit(event, ...data)
    }

    registerListener(): void {
        refine.addListener(RefineListenerEvent.ThumbnailStatus, (data: IImageStatus) => {
            if (data.id !== this.thumbnailId) {
                return
            }

            if (data.status > 0) {
                this._updateLoadingStatus(data.status)
            } else {
                // 图片加载异常提示
                const fileName = getLastPathName(this.thumbnailModel.imgPath)
                let msg = `文件: ${ fileName }加载失败`
                if (data.code === ImageLoadErrorCode.COMPLETE_CODE_UN_SUPPORT_IMAGE_FORMAT) {
                    msg = `${ CLIENT_NAME }暂时无法打开此文件`
                    NodeApi.getExport().asyncReportRawShowError({
                        path: this.thumbnailModel.imgPath,
                        id: this.thumbnailModel.id
                    })
                }
                else if (data.code === ImageLoadErrorCode.COMPLETE_CODE_FAILED_GENERATE_SEED) {
                    // 菊花消失，且不弹窗，底层seed生成失败，不弹窗，类似无网络
                    this._updateLoadingStatus(ImageLoadingStatus.EffectLoaded)//data.status
                    this.emit(PhotoCtrlListenerEvent.Notify, "底层处理失败，请重试")
                    return;
                }
                this.emit(PhotoCtrlListenerEvent.Error, {
                    ...data,
                    message: msg
                })
            }
        })

        refine.addListener(RefineListenerEvent.ThumbnailExtraInfo, (data: IExtraInfo) => {
            if (data.id !== this.thumbnailId) {
                return
            }

            if (this.isRaw) {
                this.exifInfo = data.extendInfo.exifInfo
                this._updateExifInfo()
            }

            this.emit(PhotoCtrlListenerEvent.ExtraInfo, data, this)

            if (!this.isSetEffectHis) {
                this.updateHisData(data.extendInfo.hisData)
            }
        })

        refine.addListener(RefineListenerEvent.ThumbnailAIResponse, (data: IAIResponse) => {
            if (data.id !== this.thumbnailId) {
                return
            }

            const { extraInfo, bgCleanMode } = data

            if (typeof bgCleanMode !== 'undefined') {
                this.initExtraInfoModel(bgCleanMode, extraInfo)
            }

            this.emit(PhotoCtrlListenerEvent.AIResponse, data, this)
        })

        refine.addListener(RefineListenerEvent.ThumbnailScale, debounce((data: any) => {
            if (data.id !== this.thumbnailId) {
                return
            }
            this.emit(PhotoCtrlListenerEvent.Scale, data.scale * 100)
        }, 30, {
            leading: true
        }))

        refine.addListener(RefineListenerEvent.SignalThumbnailEvent, (res: IThumbnailEvent) => {
            if (res.id !== this.thumbnailId) {
                return
            }

            switch (res.eventId) {
                case RefineThumbnailEventId.UpdateHisData:
                    this.updateHisData(res.data as IHisData)
                    break

                case RefineThumbnailEventId.CropInfo:
                    this.updateCropInfo(res.data as ICropInfo)
                    break

                case RefineThumbnailEventId.UpdatePainterInfo:
                    this._paintRemoveDefectiveMaskIsEmpty = res.data.paintRemoveDefectiveMaskIsEmpty
                    this._allowPainter = res.data.allowPainter || false
                    this._updatePainterInfo()
                    break

                case RefineThumbnailEventId.CostTimeRecorder:
                    this.updateCostTimeData(res)
                    //res.data
                    break

                case RefineThumbnailEventId.ProcessCode:
                    this._updateProcessMessage(res.data as IProcessCode)
                    break

                case RefineThumbnailEventId.Rotate:
                    this._updateRotate(res.data as { angle: number })
                    break

                case RefineThumbnailEventId.FinishCrop:
                    this.emit(RefineThumbnailEventId.FinishCrop)
                    break

                case RefineThumbnailEventId.ChangeRatio:
                    this._updateCropRatio(res.data)
                    break

                case RefineThumbnailEventId.PresetUpdate:
                    this._onPresetUpdate(res.data)
                    break
            }
        })
    }

    private _onPresetUpdate(data: any) {
        console.debug('RefineThumbnailEventId.PresetUpdate: ', data)
        let beautifyJson = null
        let paletteJson = null
        try {
            beautifyJson = JSON.parse(data.configJsonStr)
            paletteJson = JSON.parse(data.toningConfigStr)
        } catch (e) {
        }

        const beautifyViewModel = new BeautifyParamsViewModel(beautifyJson, null, this.userId, data.path)
        const paletteViewModel = new PaletteParamsViewModel({
            json: paletteJson,
            id: '',
            imgFormat: this.imgFormat,
            userId: this.userId
        })

        this.beautifyViewModel = beautifyViewModel
        this.updateBgCleanMode()

        this.paletteViewModel = paletteViewModel
        if (this.isRaw) {
            this._updateExifInfo()
        }

        this.emit(PhotoCtrlListenerEvent.PresetSuitUpdate, {
            lastPresetSuitId: data.lastPresetSuitId,
            presetSuitId: data.presetSuitId,
            presetId: data.presetId
        })

        this.emit(PhotoCtrlListenerEvent.PresetJsonUpdate, this.beautifyViewModel, this.paletteViewModel)
    }

    private _updateCropRatio(data: any) {
        const model = this.beautifyViewModel?.cropModel
        if (!model) {
            return
        }
        model.setRatio(data)
    }

    private _updateRotate(data: { angle: number }) {
        const rotateModel = this.beautifyViewModel?.setRotate(data.angle, 'angle').rotateModel
        if (!rotateModel) {
            return
        }

        this.emit('on-rotate', rotateModel.rotate)
    }

    private _updateProcessMessage(data: IProcessCode) {
        const { code, curr, total } = data
        const typeText = RefineProcessCodeMapping[code] || ''
        this._loadingText = `正在处理${ typeText }(${ curr }/${ total })`
        this.emit(PhotoCtrlListenerEvent.Status, {
            loading: this.loading,
            loadingText: this._loadingText,
            allowModifyGender: this.allowModifyGender
        })
    }

    private _updateLoadingStatus(status: ImageLoadingStatus): void {
        switch (status) {
            case ImageLoadingStatus.ThumbnailLoading:
                this._thumbnailLoading = true
                this._isLoadingThumb = false
                break
            case ImageLoadingStatus.ThumbnailLoaded:
                this._thumbnailLoading = false
                this._isLoadingThumb = true
                break
            case ImageLoadingStatus.OriginLoading:
                this._imageLoading = true
                break
            case ImageLoadingStatus.OriginLoaded:
                this._imageLoading = false
                break
            case ImageLoadingStatus.EffectLoading:
                this._allowPainter = false
                this._algorithmLoading = true
                break
            case ImageLoadingStatus.EffectLoaded:
                this._algorithmLoading = false
                break
            case ImageLoadingStatus.MaskLoading:
                this._maskLoading = true
                break
            case ImageLoadingStatus.MaskLoaded:
                this._maskLoading = false
                break
        }

        // console.debug(" ")
        // console.debug(`%c_updateLoadingStatus: status: ${status}`, "color: red")
        // console.debug("_updateLoadingStatus: _thumbnailLoading", this._thumbnailLoading)
        // console.debug("_updateLoadingStatus: _imageLoading", this._imageLoading)
        // console.debug("_updateLoadingStatus: _algorithmLoading", this._algorithmLoading)
        // console.debug("_updateLoadingStatus: _maskLoading", this._maskLoading)

        this.emit(PhotoCtrlListenerEvent.Status, {
            loading: this.loading,
            effectLoaded: this.effectLoaded,
            loadingText: this._loadingText,
            allowModifyGender: this.allowModifyGender
        })

        this._updatePainterInfo()
    }

    // 更新色温色调数据
    private _updateExifInfo() {
        const data = this.exifInfo
        if (this.paletteViewModel && Object.keys(data).length > 0) {
            this.paletteViewModel.setBaseParam(EffectParamEnum.EnhanceEditColorTemperature, data.oriWbICC as number)
            this.paletteViewModel.setBaseParam(EffectParamEnum.EnhanceEditHue, data.oriWbTint as number)
        }
    }

    private updateHisData(data: IHisData): void {
        let hisData = {}
        if (data) {
            hisData = {
                red: data.red ? hexToInt(data.red) : [],
                green: data.green ? hexToInt(data.green) : [],
                blue: data.blue ? hexToInt(data.blue) : []
            }
            this.isSetEffectHis = true
        } else {
            console.warn('updateHisData: data is null')
        }
        this.emit(PhotoCtrlListenerEvent.UpdateHisData, hisData)
    }

    private updateCropInfo(data: ICropInfo): void {
        if (data.isValid) {
            this.emit(PhotoCtrlListenerEvent.UpdateCropInfo, {
                cropWidth: data.cropRoi.width,
                cropHeight: data.cropRoi.height
            })
        } else {
            this.emit(PhotoCtrlListenerEvent.UpdateCropInfo, {
                cropWidth: 0,
                cropHeight: 0
            })
        }
    }

    private _updatePainterInfo(): void {
        this.emit(PhotoCtrlListenerEvent.UpdatePainterInfo, {
            paintRemoveDefectiveMaskIsEmpty: this._paintRemoveDefectiveMaskIsEmpty,
            allowPainter: this.allowPainter
        })
    }

    //更新耗时时间
    private updateCostTimeData(data: object): void {
        this.emit(PhotoCtrlListenerEvent.UpdateCostTime, {
            data
        })
    }

    async start(isOnlyPaletteEffect: boolean = false): Promise<void> {
        this.updateTime = +new Date()
        if (isOnlyPaletteEffect) {
            this._isOnlyPreviewPalette = true
        }
        console.log('start refineUUID: ', this.refineUUID)
        this.photoID = await refine.loadImage(this.refineUUID, <number>this.thumbnailModel.id, isOnlyPaletteEffect)
    }

    getParamsJson(): any {
        return {
            beautifyJson: this.beautifyViewModel?.parseToJson() || null,
            paletteJson: this.paletteViewModel?.parseToJson() || null
        }
    }

    reloadProcessImage(mode = ''): void {
        refine.reloadProcessImage(this.refineUUID, this.photoID, mode)

        if (mode === PreviewMode.OnlyPreviewPalette) {
            this._isOnlyPreviewPalette = true
        } else if (mode === PreviewMode.PreviewAll) {
            this._isOnlyPreviewPalette = false
        }
    }

    async onApplyPresetClick(presetSuitModel: PresetSuitModel): Promise<void> {
        // 如果是"无效果"的预设，则已处理图标消失；如果是其他的预设，则显示已处理图标
        if (presetSuitModel.id === PresetSuitIdType.NoEffect) {
            // 无效果需清除涂抹mask
            await this.resetRemoveDefectivePaintMask()
            await this.resetLiquefyMask()
        }
        await refine.applyPresetSuit(this.refineUUID, this.photoID, presetSuitModel.id + '', presetSuitModel.name)
    }


    /**
     * 图像调节 调整
     * @params data
     */
    async onChangeColor(data: IOptionObject<number | string>[], realtime: boolean = false, ext: string): Promise<void> {
        if (!this.paletteViewModel) return

        const allKeys = data.map(item => item.key) as string[]
        const updateKeys = this.paletteViewModel.updateParams(data)
        const checkModelKeys = realtime ? updateKeys : allKeys
        const models = this.paletteViewModel.getParamsModel(checkModelKeys)

        // 过滤滤镜程度情况
        if (!(models.length === 1 && models[0].flag === 300)) {
            if (!this._isOnlyPreviewPalette && realtime) return
        }

        this.setParamValueToTsImageIO(models, false, 'palette', realtime, ext)
    }

    /**
     * 人像美化调整
     * @params data
     */
    async onChangeBeautify(data: IOptionObject<number | string>[], realtime: boolean = false, ext: string): Promise<void> {
        if (!this.beautifyViewModel) return

        const updateKeys = this.beautifyViewModel?.updateParams(data)
        const allKeys = data.map(item => item.key) as string[]

        const reloadBeautifyEffect = this.beautifyViewModel?.needReloadThumbnailByModify(updateKeys)
        if (reloadBeautifyEffect) {
            const faceSurgery = data.find((item: { [key: string]: number | string }) => item.key === EffectAlgoVersion.FaceSurgery)
            if (faceSurgery && faceSurgery.value === 'V1') {
                this.emit('notify', '当前已开启旧版面部重塑效果')
            }
        }

        // 手动修改纯色背景去瑕疵模式
        // @ts-ignore
        const isIncludeBgClean = updateKeys.some((key: string) => [EffectParamEnum.BgCleanMode, EffectParamEnum.BgCleanMooreMode].includes(key))
        if (isIncludeBgClean && this.extraInfoModel) {
            const bgCleanModeObj = data.find((item: any) => item.key === EffectParamEnum.BgCleanMode) as IOptionObject<number>
            if (bgCleanModeObj) {
                this.extraInfoModel.updateBgCleanMode(bgCleanModeObj.value)
            }

            const bgCleanMooreModeObj = data.find((item: any) => item.key === EffectParamEnum.BgCleanMooreMode) as IOptionObject<number>
            if (bgCleanMooreModeObj) {
                this.extraInfoModel.updateBgCleanMooreMode(bgCleanMooreModeObj.value)
            }
        }

        const checkModelKeys = realtime ? updateKeys : allKeys
        const models = this.beautifyViewModel?.getParamsModel(checkModelKeys)
        if (models.length > 0) {
            this.setParamValueToTsImageIO(models, false, 'beautify', realtime, ext)
        }
    }

    /**
     * 按需更新tsImage参数
     */
    setParamValueToTsImageIO(models: any[], needReloadProcess?: boolean, type = 'beautify', realtime: boolean = false, ext?: string): void {
        const batchUpdateData: any[] = []
        let isBatch = models.length >= 2

        models.forEach(model => {
            if (model instanceof PersonEffectItemModel || model instanceof EffectModel) {
                isBatch = true
                if (isBatch) {
                    const obj = { constructor: 'EffectModel', name: model.name, personType: -1, path: model.path }
                    if (model instanceof PersonEffectItemModel) {
                        obj.personType = model.personType
                    }
                    batchUpdateData.push(obj)
                } else {
                    refine.updateEffect(this.refineUUID, this.photoID, model.name, model.path, model instanceof PersonEffectItemModel ? model?.personType : -1)
                }
            } else if (model instanceof AlgoVersionModel) {
                isBatch = true
                batchUpdateData.push({
                    key: EffectAlgoVersion.FaceSurgery,
                    constructor: 'AlgoVersionModel',
                    value: model.parseToJson()
                })
            } else if (model instanceof HslParamModel) {
                if (isBatch) {
                    batchUpdateData.push({
                        constructor: 'HslParamModel',
                        colorFlag: model.colorFlag,
                        flag: model.flag,
                        value: model.getFloatValue()
                    })
                } else {
                    refine.setPaletteValue(this.refineUUID, this.photoID, model.getFloatValue(), model.flag, model.colorFlag, realtime, ext)
                }
            } else if (model instanceof PersonParamModel) {
                if (isBatch) {
                    batchUpdateData.push({
                        constructor: 'PersonParamModel',
                        personType: model.personFlag,
                        flag: model.flag,
                        value: model.getFloatValue()
                    })
                } else {
                    refine.setBeautifyValue(this.refineUUID, this.photoID, model.getFloatValue(), model.flag, model.personFlag, realtime, ext)
                }
            } else if (model instanceof WhiteBalanceParamModel) {
                if (isBatch) {
                    batchUpdateData.push({
                        constructor: 'WhiteBalanceParamModel',
                        flag: model.flag,
                        value: model.getFloatValue()
                    })
                } else {
                    refine.setPaletteValue(this.refineUUID, this.photoID, model.getFloatValue(), model.flag, -1, realtime, ext)
                }
            } else {
                if (isBatch) {
                    batchUpdateData.push({
                        constructor: 'ParamsModel',
                        flag: model.flag,
                        value: model.getFloatValue(),
                        type
                    })
                } else {
                    if (type === 'beautify') {
                        refine.setBeautifyValue(this.refineUUID, this.photoID, model.getFloatValue(), model.flag, -1, realtime, ext)
                    } else {
                        refine.setPaletteValue(this.refineUUID, this.photoID, model.getFloatValue(), model.flag, -1, realtime, ext)
                    }
                }
            }
        })

        if (isBatch && batchUpdateData.length > 0) {
            refine.batchSetValue(this.refineUUID, this.photoID, batchUpdateData, realtime, ext)
        }

        if (!realtime) {
            this.emit(PhotoCtrlListenerEvent.PresetSuitUpdate, {
                presetSuitId: '0',
                presetId: '0'
            })
        }
    }


    // 缩放比例
    changeRatio(rotate: number): void {
        refine.changeRatio(this.refineUUID, this.photoID, rotate / 100)
    }

    // 缩放类型
    imageResize(mode: string): void {
        refine.imageResize(this.refineUUID, this.photoID, mode)
    }

    compare(mode: string): void {
        if (mode === 'down') {
            refine.imageCompare(this.refineUUID, this.photoID, mode)
        } else {
            refine.imageCompare(this.refineUUID, this.photoID, mode)
        }
    }

    // 重置涂抹效果
    async resetRemoveDefectivePaintMask(): Promise<void> {
        await refine.handlePhotoControlOperate(this.refineUUID, this.photoID, QtPhotoOperate.ResetDefectMask)
    }

    async resetLiquefyMask(): Promise<void> {
        await refine.handlePhotoControlOperate(this.refineUUID, this.photoID, QtPhotoOperate.ResetLiquefyMask)
    }

    // 设置涂抹mask


    private updateBgCleanMode(): void {
        if (this.extraInfoModel) {
            const bgCleanMode = this.extraInfoModel.bgCleanMode
            const bgCleanMooreMode = this.extraInfoModel.bgCleanMooreMode
            this.beautifyViewModel?.updateBgCleanMode(bgCleanMode.value)
            this.beautifyViewModel?.updateBgCleanMooreMode(bgCleanMooreMode.value)
        }
    }

    /**
     * 初始化额外参数并更新至美化预设中
     * @param bgCleanMode
     * @param extraInfoStr
     */
    initExtraInfoModel(bgCleanMode: number, extraInfoStr: string): void {
        let hasExtraCache = false
        if (extraInfoStr) {
            try {
                const extraInfo = JSON.parse(extraInfoStr)
                const model = new ExtraInfoModel(extraInfo)
                hasExtraCache = true
                const isNeedUpdate = model.isNeedUpdateDefaultMode(bgCleanMode)
                if (isNeedUpdate) {
                    model.updateDefaultMode(bgCleanMode)
                }
                this.extraInfoModel = model
            } catch (e) {
                console.warn('[initExtraInfoModel] ', e)
            }
        }

        if (!hasExtraCache) {
            const model = new ExtraInfoModel()
            model.setDefaultCleanMode(bgCleanMode)
            this.extraInfoModel = model
        }

        this.updateBgCleanMode()
    }

    usePainterMode(): PainterControl {
        this.painterControl = new PainterControl(this.thumbnailId)
        this.painterControl?.setRefineUUID(this.photoID, this.refineUUID)
        this.painterControl.init()
        return this.painterControl
    }

    finishPainterMode(): void {
        refine.closeProcessMode(this.refineUUID, this.photoID).then(() => {
        })
        this.painterControl?.destroy()
        this.painterControl = null
    }

    useLiquefyMode(): LiquefyControl {
        this.liquefyControl = new LiquefyControl(this.thumbnailId)
        this.liquefyControl.setRefineUUID(this.photoID, this.refineUUID)
        this.liquefyControl.init()

        return this.liquefyControl
    }

    finishLiquefyMode(): void {
        refine.closeProcessMode(this.refineUUID, this.photoID).then(() => {
        })
        this.liquefyControl?.destroy()
        this.liquefyControl = null
    }

    useCropTool(): ICropAndRotateObject {
        refine.useProcessMode(this.refineUUID, this.photoID, QtPhotoMode.Crop).then(() => {
        })

        const obj: ICropAndRotateObject = {
            type: 0,
            width: 1,
            height: 1,
            dpi: 30,
            unit: 0,
            flipX: 1,
            flipY: 1,
            rotate: 0
        }
        const rotateModel = this.beautifyViewModel?.rotateModel
        if (rotateModel) {
            Object.assign(obj, rotateModel.toComponent())
        }

        const cropModel = this.beautifyViewModel?.cropModel
        if (cropModel) {
            Object.assign(obj, cropModel.toComponent())
        }

        return obj
    }

    closeTool(): void {
        refine.closeProcessMode(this.refineUUID, this.photoID).then(() => {
            this.emit(PhotoCtrlListenerEvent.PresetSuitUpdate, {
                presetSuitId: '0',
                presetId: '0'
            })
        })
        this.emit(PhotoCtrlListenerEvent.PresetJsonUpdate, this.beautifyViewModel, this.paletteViewModel)
    }

    getCropObj(): any {
        const rotateObj = this.beautifyViewModel?.rotateModel.toComponent()
        const cropObj = this.beautifyViewModel?.cropModel.toComponent()

        return {
            ...rotateObj,
            ...cropObj
        }
    }

    handleRotate(rotate: number, mode = 'rotate'): void {
        const rotateModel = this.beautifyViewModel?.setRotate(rotate, mode).rotateModel
        if (rotateModel) {
            refine.handleRotate(this.refineUUID, this.photoID, rotateModel.rotate)
        }
    }

    handleFlip(x: number, y: number): void {
        const rotateModel = this.beautifyViewModel?.setFlit(x, y).rotateModel
        if (rotateModel) {
            refine.handleFlit(this.refineUUID, this.photoID, rotateModel.flipX, rotateModel.flipY)
        }
    }

    handleCrop(data: any): void {
        const cropModel = this.beautifyViewModel?.setCrop(data).cropModel
        if (cropModel) {
            refine.handleCrop(this.refineUUID, this.photoID, OperateCropMode.Update, cropModel.toJson())
        }
    }

    handleResetCrop(data: any): void {
        const cropModel = this.beautifyViewModel?.setCrop(data).cropModel
        if (cropModel) {
            refine.handleCrop(this.refineUUID, this.photoID, OperateCropMode.Reset, cropModel.toJson())
        }
    }

    private _removePhotoCtrlListener(): void {
        this.removeAllListener(PhotoCtrlListenerEvent.Notify)
        this.removeAllListener(PhotoCtrlListenerEvent.Status)
        this.removeAllListener(PhotoCtrlListenerEvent.Scale)
        this.removeAllListener(PhotoCtrlListenerEvent.ExtraInfo)
        this.removeAllListener(PhotoCtrlListenerEvent.AIResponse)
        this.removeAllListener(PhotoCtrlListenerEvent.Error)
        this.removeAllListener(PhotoCtrlListenerEvent.PresetJsonUpdate)
        this.removeAllListener(PhotoCtrlListenerEvent.PresetSuitUpdate)
        this.removeAllListener(PhotoCtrlListenerEvent.UpdateHisData)
        this.removeAllListener(PhotoCtrlListenerEvent.UpdateCropInfo)
        this.removeAllListener(PhotoCtrlListenerEvent.UpdatePainterInfo)
    }

    private _removeRefineThumbnailEvent(): void {
        this.removeAllListener(RefineThumbnailEventId.Rotate)
    }

    // 是否存在其他效果
    hasBeautifyEffect(): boolean {
        return this.beautifyViewModel?.hasEffect() || false
    }

    /**
     * 对象实例销毁
     */
    destroy(): void {
        this.isDestroy = true
        this.paletteViewModel = null
        this.beautifyViewModel = null

        this.painterControl?.destroy()
        this.painterControl = null

        this.liquefyControl?.destroy()
        this.liquefyControl = null

        this._removePhotoCtrlListener()
        this._removeRefineThumbnailEvent()
    }
}
