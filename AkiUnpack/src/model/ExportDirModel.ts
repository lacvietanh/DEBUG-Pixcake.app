// 导出目录模型
import ExportItemModel from '@/model/ExportItemModel'

export default class ExportDirModel {

    id = 0
    // 用户ID
    userId = -1
    // 项目的ID
    projectId = -1
    // 后台下发的预扣款的ProcessId
    processId = -1
    // 项目的路径
    projectPath: string | null = null
    // 导出目录路径： 项目的路径_精修底片
    exportDirPath: string | null = null

    exportTotalNum = 0

    exportSuccessNum = 0
    // 导出子项的集合
    exportItemList: ExportItemModel[] = []
    // 导出时间
    createTime: Date
    name: string | null = null

    // 待下载 0
    // 下载中 1
    // 下载失败 2
    // 下载成功 3
    // 重试过程中 4
    exportStatus = 0

    progress = 0

    failReason = -1

    shareId = -1

    // 上传效果图 生成分享链接中 1
    // 生成分享链接成功  2
    // 上传失败 3
    // 过期 4
    shareStatus = 0

    shareProgress = -1

    shareLink = null

    shareStartTime = 0

    shareEndTime = 0

    isComplexDir = false

    hasExportFail = true

    isPauseStatus = false

    isFundsLackStatus = false

    restoreImportDir = true

    completeTime = 0

    createNewDir = false

    isExpand = true

    isStartExport = false

    completeNumber = 0

    _isRetryStatus: boolean = false

    constructor(id: number, processId: number, userId: number, projectId: number, projectPath: string, name: string, exportDirPath: string, exportTotalNum: number, exportSuccessNum: number) {
        this.id = id
        this.processId = processId
        this.userId = userId
        this.projectId = projectId
        this.projectPath = projectPath
        this.name = name

        this.exportDirPath = exportDirPath
        this.exportTotalNum = exportTotalNum
        this.exportSuccessNum = exportSuccessNum


        this.createTime = new Date()
    }


    static create(json: any) {
        if (json == null) {
            return null
        }
        let model = new ExportDirModel(json.id, json.processId, json.userId, json.projectId, json.projectPath, json.name, json.exportDirPath, json.exportTotalNum, json.exportSuccessNum)
        model.createTime = json.createTime
        model.shareLink = json.shareLink
        model.exportItemList = json.exportItemList
        model.shareStartTime = json.shareStartTime
        model.shareEndTime = json.shareEndTime
        model.shareId = json.shareId
        model.hasExportFail = json.hasExportFail === 1
        model.isPauseStatus = json.isPauseStatus
        model.isFundsLackStatus = json.isFundsLackStatus
        model.restoreImportDir = json.restoreImportDir
        model.completeTime = json.completeTime
        model.isExpand = json.isExpand
        if (json.exportStatus) {
            model.exportStatus = json.exportStatus
        }

        if (json.progress) {
            model.progress = json.progress
        }
        if (json.shareProgress) {
            model.shareProgress = json.shareProgress
        }
        if (json.shareStatus) {
            model.shareStatus = json.shareStatus
        }

        return model
    }

    updateProgress() {
        if (this.isComplete()) {
            this.progress = 100
            this.exportStatus = 3
            return
        }
        if (this.exportStatus == 0) {
            this.exportStatus = 1
        }
        this.progress = this.calculateProgress()
    }

    calculateProgress(): number {
        if (this.exportItemList == null || this.exportItemList.length == 0) {
            if (this.exportTotalNum === this.exportSuccessNum) {
                this.exportStatus = 3
                return 100
            }
            let res = (100 * (this.exportSuccessNum / this.exportTotalNum * 1.0)).toFixed(2)
            return Number(res)
        }
        if (this.isComplete()) {
            this.exportStatus = 3
            return 100
        }
        let completeNumber = 0
        this.exportStatus = 1
        this.exportItemList.forEach(item => {
            if (item.isComplete()) {
                completeNumber++
            } else {
                if (item.isDownloadFail()) {
                    this.exportStatus = 2
                }
            }
        })
        if (completeNumber == this.exportItemList.length) {
            this.exportStatus = 3
            return 100
        } else {
            this.completeNumber = completeNumber
            let res = (100 * (completeNumber / this.exportItemList.length * 1.0)).toFixed(2)
            return Number(res)
        }
    }

    updateShareProgress() {
        if (!this.isComplete()) {
            this.shareProgress = -1
            return
        }
        if (this.isShareTimeOut()) {
            this.shareStatus = 4
        }
        if (this.isShareTimeOutStatus()) {
            this.shareProgress = -1
            return
        }
        if (this.hasShareInfo()) {
            this.shareProgress = 100
            this.shareStatus = 2
            return
        }
        if (this.shareId == -1) {
            this.shareProgress = 0
            this.shareStatus = 0
            return
        }
        this.shareProgress = 0
        this.shareStatus = 0

        let totalShareItem = 0
        let completeShareItem = 0
        if (this.exportItemList) {
            this.exportItemList.forEach(item => {
                if (item.isSelectShare) {
                    totalShareItem++

                    if (item.isUploadComplete()) {
                        completeShareItem++
                    } else {
                        if (item.isUploadFail()) {
                            this.shareStatus = 3
                        }

                    }
                }
            })
            if (this.isShareFailStatus()) {
                this.shareProgress = -1
                return
            }
            if (totalShareItem > 0) {
                if (totalShareItem == completeShareItem) {
                    this.shareStatus = 2
                } else {
                    this.shareStatus = 1
                }
                this.shareProgress = Math.ceil(100 * (completeShareItem / totalShareItem))
            }
        }
    }

    getCurrentShareProgress() {
        return this.shareProgress
    }

    getCurrentProgress() {
        return this.progress
    }

    waitToDownload() {
        return this.exportStatus == 0
    }

    isDownloading() {
        return this.exportStatus == 1
    }

    isDownloadFail() {
        return this.exportStatus == 2
    }

    isComplete() {
        return this.exportStatus == 3
    }

    hasShareInfo() {
        return new Date(this.shareEndTime).getTime() > 0 && this.shareLink != null && new Date(this.shareEndTime).getTime() >= new Date().getTime()
    }

    isShareTimeOut() {
        return this.shareLink != null && new Date(this.shareEndTime).getTime() > 0 && new Date().getTime() > new Date(this.shareEndTime).getTime()
    }

    isShareTimeOutStatus() {
        return this.shareStatus == 4
    }

    isShareFailStatus() {
        return this.shareStatus == 3
    }

    isShareUploadingStatus() {
        return this.shareStatus == 1
    }


}
