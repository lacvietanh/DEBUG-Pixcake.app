// 进入项目，每个可视图的数据结构

// @ts-ignore
import { find as findPreset } from '@/universal/datastore/presettingDao'

// @ts-ignore
import FilePathUtils from '@/utils/tsFilePathUtils'
// @ts-ignore
import tsFilePathUtils from '@/utils/tsFilePathUtils'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import md5 from 'js-md5'
// @ts-ignore
import { find as findPaletteCfgFromDao } from '@/universal/datastore/palletePresetCfgDao'
import PresetSuitModel from '@/model/presetSuit/PresetSuitModel'
// @ts-ignore
import FileUtils from '@/utils/FileUtils'
import { BeautifyPresetType, PresetSuitIdType } from '@/constants/constants'
import { QRC_VERSION } from '@/universal/types/config'
import { FaceRectInf, PersonType, Optional } from '@/universal/types/foundation'
import PresettingItemModel from '@/model/PresettingItemModel'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'
import fs from '@/qt-ipc/fs'
import NodeApi from '@/qt-ipc/node-api'

const path = NodeApi.path

// ai服务器响应文件
export const AI_SERVER_RESP_FILE = 'ars'
// ai检测本地缓存
export const AI_LOCAL_FILE = 'aic'

export const AI_SERVER_RESP_FILE_MD5 = 'ars_md5'
export const AI_LOCAL_FILE_MD5 = 'aic_md5'

export const PERSON_TYPE_JSON = 'pt'
export const ORIGIN_PERSON_TYPE_JSON = 'opt'
export const CROPPER_JSON = 'crop'
export const ERROR_REPORT_JXL = 'error'
export const PERSON_TYPE_BG_JSON = 'ptb'
export const PERSON_TYPE_JSON_MD5 = 'pt_md5'
export const ORIGIN_PERSON_TYPE_JSON_MD5 = 'opt_md5'

const CURRENT_QRC_VERSION = QRC_VERSION

export default class ThumbnailModel {
    // 扩展的联合键，由内部属性生成(原图路径和projectId)
    id: Optional<number>
    orderId: Optional<number>
    originImage: Optional<string>
    optStatus: boolean
    exportStatus: boolean
    projectId: Optional<number>
    userId: Optional<number>
    originalImagePath: Optional<string>
    thumbnailImagePath: Optional<string>
    isFavourite: boolean
    rotation: Optional<number>
    private _extendId: Optional<string>
    presetModel: Optional<PresettingItemModel>
    _presetId: Optional<string>
    errorReportJxl: Optional<string>
    personTypeBg: Optional<string>
    cropperPath: Optional<string>
    requestAIServerMD5: Optional<string>
    responseAIServerMD5: Optional<string>
    aiLocalMD5: Optional<string>
    qrc_version: Optional<number>
    importParentPath: Optional<string>

    faceCount: Optional<number>
    imgFormat: number   //图片格式
    importTimes: number
    originalWidth: Optional<number>
    originalHeight: Optional<number>
    // 图片是否合法
    isValid: boolean

    // 新增调色模块
    _palettePresetId: Optional<string>
    palettePresetModel: Optional<PalettePresetCfgModel>
    // 调色的预设套装id
    presetSuitId: Optional<string>

    //  QT层
    // 人脸宽比例的rect
    faceRects: Optional<Array<FaceRectInf>> = null
    needCheck: boolean
    exportTime: number
    errorReport: boolean = false
    cropFinish: boolean = false

    constructor() {
        this.id = null
        this.orderId = 0
        this.originImage = null
        // 是否有操作过
        this.optStatus = false
        //  是否已导出过
        this.exportStatus = false
        // 关联的项目id
        this.projectId = null
        // 关联的user
        this.userId = null
        this.originalImagePath = null
        this.thumbnailImagePath = null
        this.isFavourite = false
        // 预设的id
        this.presetId = null // 对应关联presets表的extendId字段
        this.rotation = 0 // 角度
        this._extendId = null
        this.presetModel = null

        this._presetId = null

        this.errorReportJxl = null
        this.personTypeBg = null
        this.cropperPath = null
        // md5值
        this.requestAIServerMD5 = null
        this.responseAIServerMD5 = null
        this.aiLocalMD5 = null

        // 生成给服务器请求数据的时候，会返回一些信息供客户端使用：faceCount，faceRects等

        this.qrc_version = 0
        /** 效果相关的缓存路径 end **/

        this.importParentPath = null    // 导入父级文件路径

        this.faceCount = 0
        this.imgFormat = 1  //图片格式
        this.importTimes = 1
        this.originalWidth = 0
        this.originalHeight = 0

        // 图片是否合法
        this.isValid = true

        // 新增调色模块
        this._palettePresetId = null
        this.palettePresetModel = null
        // 调色的预设套装id
        this.presetSuitId = null
        this.needCheck = true
        this.exportTime = 0

    }

    parseToJson(): any {
        let ret = Object.assign({ ...this }, {
            palettePresetId: this.palettePresetId,
            presetId: this.presetId
        })
        console.log(`ThumbnailModel parseToJson,`, ret)
        return ret
    }

    get extendId(): string {
        if (!this._extendId) {
            this._extendId = this.originalImagePath + '_' + this.projectId
        }
        return this._extendId
    }

    static buildExtendId(originalImagePath: string, projectId: number): string {
        let extendId = originalImagePath + '_' + projectId
        return extendId
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static initFromJson(json: any): Optional<ThumbnailModel> {
        if (json === null || json === undefined) {
            return null
        }
        let model = new ThumbnailModel()
        model.id = json.id
        model.orderId = json.order || 0
        model.optStatus = json.optStatus ? true : false
        model.exportStatus = json.exportStatus
        model.projectId = json.projectId
        model.userId = json.userId
        model.originalImagePath = json.originalImagePath
        model.thumbnailImagePath = json.thumbnailImagePath
        model.isFavourite = json.isFavourite ? true : false
        model.presetId = json.presetId
        model.palettePresetId = json.palettePresetId
        model._extendId = json.extendId
        model.rotation = json.rotation
        model.imgFormat = json.imgFormat

        // 导入父级文件路径
        model.importParentPath = json.importParentPath

        model.importTimes = json.importTimes
        model.isValid = json.isValid
        model.presetSuitId = json.presetSuitId || PresetSuitIdType.UnSet
        model.originalWidth = json.originalWidth
        model.originalHeight = json.originalHeight
        model.qrc_version = json.qrc_version
        model.errorReport = json.errorReport
        model.cropFinish = json.cropFinish

        return model
    }

    static initFromJsonArray(ary: [any]): Array<ThumbnailModel> {
        let models = new Array<ThumbnailModel>()
        for (let i = 0; i < ary.length; i++) {
            let json = ary[i]
            let obj = ThumbnailModel.initFromJson(json)
            if (obj)
                models.push(obj)
        }
        return models
    }

    static isRealId(id: number): boolean {
        if (id === null || id <= 0) {
            return false
        }
        return true
    }

    static getExtendId(projectdId: number, imagePath: string): string {
        return imagePath + '_' + projectdId
    }


    getOriginalName(): string {
        return path.basename(this.originalImagePath as string)
    }

    getDirName(): string {
        let startIndex = this.originalImagePath!.lastIndexOf(path.sep)
        let dirPath = this.originalImagePath!.substr(0, startIndex)
        startIndex = dirPath!.lastIndexOf(path.sep)
        let s = dirPath?.substring(startIndex + 1, dirPath.length)
        return s
    }

    getDirPath(): string {
        let startIndex = this.originalImagePath!.lastIndexOf(path.sep)
        let dirPath = this.originalImagePath!.substr(0, startIndex)
        return dirPath
    }

    // 设置妆容预设
    set presetId(param: Optional<string>) {
        this.presetModel = null
        this._presetId = param
    }

    get presetId(): Optional<string> {
        return this._presetId!
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getPresetModel(store: any): Promise<PresettingItemModel> {
        if (this.presetModel == null) {
            let presetModel = null
            // 如果使用套装id
            if (this.presetSuitId === PresetSuitIdType.NoEffect) {
                presetModel = PresetSuitModel.noneBeautifyEffectModel(this.userId as number)
            } else if (this.presetSuitId === PresetSuitIdType.UnSet) {
                if (await PresettingItemModel.isEqualNoEffect(this.presetId!)) {
                    presetModel = PresetSuitModel.noneBeautifyEffectModel(this.userId as number)
                } else {
                    if (store.state.presetting.presetsCache.has(this.presetId)) {
                        presetModel = store.state.presetting.presetsCache.get(this.presetId)
                    } else {
                        presetModel = await findPreset(this.presetId)
                        store.commit('setCachePreset', { presetID: this.presetId, preset: presetModel })
                    }
                }
            } else if (this.presetSuitId !== PresetSuitIdType.UnSet) {
                const presetSuitModel = await store.dispatch('presetSuit/ACT_GetPresetSpecSuit', this.presetSuitId)
                if (store.state.presetting.presetsCache.has(presetSuitModel.beautifyPresetId)) {
                    presetModel = store.state.presetting.presetsCache.get(presetSuitModel.beautifyPresetId)
                } else {
                    if (await PresettingItemModel.isEqualNoEffect(presetSuitModel.beautifyPresetId)) {
                        return PresetSuitModel.noneBeautifyEffectModel(this.userId as number)
                    }
                    presetModel = await findPreset(presetSuitModel.beautifyPresetId)
                    store.commit('setCachePreset', { presetID: this.presetId, preset: presetModel })
                }

            }
            presetModel.userId = parseInt(presetModel.userId)
            this.presetModel = presetModel
            return this.presetModel!
        } else {
            return this.presetModel
        }
    }

    // 设置调色预设
    set palettePresetId(param: Optional<string>) {
        this.palettePresetModel = null
        this._palettePresetId = param
    }

    get palettePresetId(): Optional<string> {
        return this._palettePresetId
    }

    // 创建关联
    createLink(id: number, projectId: number, userId: number): void {
        this.id = id
        this.projectId = projectId
        this.userId = userId
        this._extendId = this.originalImagePath + '_' + projectId
    }

    setOriginImage(image: string): void {
        this.originImage = image
    }

    changeOpterateStatus(): void {
        this.optStatus = true
    }

    resetOpterateStatus(): void {
        this.optStatus = false
    }

    changeExportStatus(): void {
        this.exportStatus = true
    }

    // 服务器响应文件相关
    async getAIServerResponsePath(): Promise<string> {
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        return await path.join(thumbPath, AI_SERVER_RESP_FILE)
    }

    async getAIServerResponseMD5Path(): Promise<string> {
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        return await path.join(thumbPath, AI_SERVER_RESP_FILE_MD5)
    }

    async lazyLoadAIServerResponseMD5(): Promise<string | null> {
        let filepath = await this.getAIServerResponseMD5Path()
        if (this.responseAIServerMD5 == null && await FileUtils.isFileExist(filepath)) {
            this.responseAIServerMD5 = await fs.readFileSync(filepath, 'utf-8')
        }
        return this.responseAIServerMD5
    }

    async saveAIServerResponseMD5(fileMD5: string) {
        this.responseAIServerMD5 = null
        await FileUtils.writeFileAsync(this.getAIServerResponseMD5Path(), fileMD5)
    }

    async checkAIServerResponseIsValid(): Promise<boolean> {
        if (CURRENT_QRC_VERSION !== this.qrc_version) {
            return false
        }
        const filepath = await this.getAIServerResponsePath()
        const cacheMD5 = await this.lazyLoadAIServerResponseMD5()
        return await FilePathUtils.checkMD5WithFilePath(cacheMD5, filepath)
    }

    // 本地ai检测缓存文件相关
    async getAILocalPath() {
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        let dirPath = await path.join(thumbPath, 'rawOrignCache')
        if (!await FileUtils.isDirExist(dirPath)) {
            await FileUtils.mkdirAsync(dirPath)
        }

        return await path.join(dirPath, AI_LOCAL_FILE)
    }

    async getAILocalMD5Path() {
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        let dirPath = path.join(thumbPath, 'rawOrignCache')
        if (!await FileUtils.isDirExist(dirPath)) {
            await FileUtils.mkdirAsync(dirPath)
        }
        return await path.join(dirPath, AI_LOCAL_FILE_MD5)
    }

    checkQRCVersionIsValid() {
        return CURRENT_QRC_VERSION === this.qrc_version
    }

    setFaceRects(faceRects: Array<FaceRectInf>) {
        this.faceRects = faceRects
    }

    //获取本地存储人脸数据地址
    async createPersonTypeFilePath(): Promise<string> {
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        let sep = await path.sep()
        let res = await path.join(thumbPath, sep, PERSON_TYPE_JSON)
        return res
    }

    //获取本地存储裁剪数据地址
    async createCropperFilePath(): Promise<string> {
        if (this.cropperPath != null) {
            return this.cropperPath
        }
        let sep = await path.sep()
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        this.cropperPath = await path.join(thumbPath, sep, CROPPER_JSON)
        return this.cropperPath!
    }

    async getPersonTypeFileMD5Path(): Promise<string> {
        let sep = await path.sep()
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        return await path.join(thumbPath, sep, PERSON_TYPE_JSON_MD5)
    }

    //获取错误上报地址
    async createErrorReportJxl(): Promise<string> {
        if (this.errorReportJxl != null) {
            return this.errorReportJxl
        }
        let thumbPath = await FilePathUtils.getThumbnailsPath(this.id)
        let sep = await path.sep()
        this.errorReportJxl = await path.join(thumbPath, sep, ERROR_REPORT_JXL)
        return this.errorReportJxl!
    }

    async getDirStruct(): Promise<Optional<string>> {
        if (this.importParentPath) {
            const rPath = await path.dirname(this.originalImagePath!)
            return rPath.replace(this.importParentPath, '')
        }
        return null
    }

    /*
        删除工程封面的缩略图
     */
    async removeAlbumThumbnail(projectName: string) {
        let albumThumbIconPath = await tsFilePathUtils.getProjectAlbumPhotoPath(this.projectId, projectName)
        let imagePathMd5 = this.originalImagePath//getLastPathName(this.originalImagePath)
        imagePathMd5 = md5(imagePathMd5) + '.jpg'
        let sep = await path.sep()
        let filePath = await path.join(albumThumbIconPath, sep, imagePathMd5)
        if (await FileUtils.isFileExist(filePath)) {
            await fs.unlinkSync(filePath)
        }
    }

    getHash(): string {
        let str = 'userId : ' + this.userId + ' projectId : ' + this.projectId + ' id : ' + this.id
        return md5(str)
    }


    recycle() {
        this.faceRects = null
    }

    toJson() {
        return {
            ...this,
            extendId: this.extendId,
            presetId: this.presetId,
            palettePresetId: this.palettePresetId
        }
    }
}
