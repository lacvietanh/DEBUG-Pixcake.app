import fs from '@/qt-ipc/fs'
import Vue from 'vue'
import path from '@/qt-ipc/path'
// @ts-ignore
import md5 from 'js-md5'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'

// @ts-ignore
import toast from '@/mixins/toast'
import { ImportProgressStatus, MaxImportDir } from '@/constants'
import { ImageExtendNames, ImageType } from '@/universal/types/constants'

import { mapActions, mapGetters, mapMutations } from 'vuex'

// @ts-ignore
import { getFileExtenstionName, sortBy } from '@/utils/utils'
// @ts-ignore
import tsFilePathUtils from '@/utils/tsFilePathUtils'
// @ts-ignore
import FileUtils from '@/utils/FileUtils'
import DBIpcRender from '@/irender/DBIpcRender'
import { PALETTE_PRESETS_CFG_TABLE, THUMBNAIL_TABLE } from '@/universal/types/config'
import { FsConstant as constants } from '@/qt-ipc/constant'
import ImportProgressDialog from '@/views/BatchRetouch/components/ImportProgressDialog.vue'

// import {TSQrc} from '#/utils/tsqrc/tsqrc'
import { Optional } from '@/types/index'
import IpcRendererAsync from '@/qt-ipc/Ipc-renderer'
import Project from '@/model/ProjectModel'
import pointsMixin from '@/mixins/pointsMixin'
// @ts-ignore
import { batchDeleteProject } from '@/api/projectApi'
// @ts-ignore
import { deleteThumbnailIds } from '@/api/thumbnailApi'
// @ts-ignore
import { delay } from '@/universal/utils/common'
// @ts-ignore
import { find as findOneProject } from '@/universal/datastore/projectDao'
import tsqrcInstance from '@/qt-ipc/pixcookengine'
import { EncryptType } from '@/qt-ipc/constants/common'
import importImageRpc, {
    SignalCloseProgressDialogKey,
    SignalImportFinishedKey,
    SignalImportProgressKey,
    SignalRemoveStoreProjectKey, SignalRootNameKey,
    SignalUpdateProjectKey
} from '@/qt-ipc/business/import-image'

import { dialogIpc, FConfirmDialogKey } from '@/qt-ipc/dialog/DialogIpcImpl'
import {app} from "@/qt-ipc/app";
import {WIN_MAX_PATH} from "@/constants/constants";

// 1: 是有权限,0: 没有读写权限,-1:没有写权限 ,-2:没有读权限
export const PermissionRetCode = {
    OK: 1, //具有读写权限
    NO_Read_Write: 0,
    NO_Read: -2,
    NO_Write: -1,
    Path_Length_Overflow:-3
}

const kImportConfirmDialog = 'importConfirmDialog'

export default Vue.extend({
    mixins: [toast, pointsMixin],
    components: {
        ImportProgressDialog
    },
    data() {
        return {
            dropPaths: [],
            stopImageImport: false, // 停止图片导入
            isMakeSureImport: false,// 点击继续导入按钮
            showImportProgress: false,
            importProgress: {},
            // 非二次导入的其非点击按钮创建的，需要在出错时，删除
            needDeleteImportProject: false,
            dbThumbAbortImportFinished: false,
            importIdMaps: new Map(),
            importIds: [], //导入的id列表
            // 后端删除接口的请求映射，用于控制并发删除云端数据，已经在删除了，就忽略
            deleteRequestMap: new Map(),
            isAppend: false,
            curProjectId: null, //缓存当前被删除的工程id,用于清理云端的缩略图id
            onHandlerProgress: null,//((progress: number, over: number, total: number)=> void),
            onHandlerFinished: null,//((addCounts: number) => void)
            myImportName:"",
            // 仅在工作台导入的vue层使用,导入创建工程时使用
            bIsCancelImport:false
        }
    },

    computed: {
        ...mapGetters([
            'userId'
        ]),

        ...mapGetters('project', [
            'activeProject'
        ]),

        ...mapGetters('thumbnail', [
            'getThumbnails',
            'cancelImport'
        ])
    },

    methods: {
        ...mapActions('thumbnail', [
            'ACT_InsertThumbnail'
        ]),
        ...mapActions('project', [
            'ACT_AsyncUpdateProject',
            'ACT_DeleteResInProject',
            'ACT_DeleteProject',
            'ACT_DeleteResInProjectByThumbIds'
        ]),
        ...mapMutations('thumbnail', ['_SetThumbnails', '_AppendThumbnails']),
        ...mapMutations('project', ['_RemoveProject']),
        resetHandleCallback(){
            this.onHandlerFinished = null
            this.onHandlerProgress = null
        },
        onManualImportClick(filePaths:any){
            this.checkAndImportImages(filePaths, true, (thumbnailCount:number) => {
                importImageRpc.handleAfterMenuManualImport()
                this.resetHandleCallback()
                this.tsNotify({
                    message: `已导入${thumbnailCount}张图片`
                })
            }, (progress:any) => {
                if (progress.status === ImportProgressStatus.Start) {
                    this.showImportProgress = true
                }
                this.importProgress = progress
            })
        },
        getDropPaths() {
            let dropPaths = window.$dragFiles
            return dropPaths
        },
        // 点击取消导入的处理
        async _SetCancelImport(cancel: boolean) {
            console.log(`_SetCancelImport:`, cancel)
            await importImageRpc.setCancelImportState(cancel)
            this.bIsCancelImport = cancel
        },
        async handleCancelImport() {
            //@ts-ignore
            if (!this.importProgress.status){
                this.showImportProgress = false
            }
            console.log(`handleCancelImport()`, new Date())
            // @ts-ignore
            // this.status = ImportProgressStatus.CancelImport
            this.importProgress.status = ImportProgressStatus.CancelImport
            // @ts-ignore
            await this._SetCancelImport(true)
        },
        // 1: 是有权限,0: 没有读写权限,-1:没有写权限 ,-2:没有读权限
        async hasReadWritePermission(filePath: Array<string>): Promise<{ result: number, isDir: boolean }> {
            if (!filePath || filePath.length === 0) {
                return { result: PermissionRetCode.NO_Read_Write, isDir: true }
            }
            let ret = PermissionRetCode.OK
            let isDir = true
            let overflow = false
            for (let i = 0; i < filePath.length; i++) {
                let result = true
                let fPath = filePath[i]
                overflow = fPath.length > WIN_MAX_PATH
                // 是文件的则跳过去
                const isFile = (await fs.statSync(fPath)).isFile()
                // 要有读的权限
                if (isFile) {
                    result = await fs.accessSync(fPath, constants.R_OK)
                    if (result) {
                        continue
                    } else {
                        ret = PermissionRetCode.NO_Read
                        isDir = false
                        break
                    }
                } else {
                    isDir = true
                    let hasRead = true
                    let hasWrite = true
                    result = await fs.accessSync(fPath, constants.R_OK)
                    if (!result) {
                        hasRead = false
                        ret = PermissionRetCode.NO_Read
                    }
                    result = await fs.accessSync(fPath, constants.W_OK)
                    if (!result) {
                        hasWrite = false
                        ret = hasRead ? PermissionRetCode.NO_Write : PermissionRetCode.NO_Read_Write
                    }
                    if (!hasRead || !hasWrite) {
                        break
                    }
                }
            }
            if (ret != PermissionRetCode.OK && app.isWin && !app.isLargeThanWin10Version && overflow){
                ret = PermissionRetCode.Path_Length_Overflow
            }
            return { result: ret, isDir: isDir }
        },

        // 删除项目缓存
        async deleteProjectCache(project: any) {
            let filePath = await tsFilePathUtils.getProjectRootPathByProject(project)
            try {
                await FileUtils.deleteFolder(filePath)
            } catch (e) {
                console.error(e)
            }
        },

        supportedExtendNames() {
            return ImageExtendNames
        },
        checkCanImport(): boolean {
            // @ts-ignore
            if (this.showImportProgress) {
                // @ts-ignore
                this.tsNotify({
                    type: 'error',
                    message: '正在导入中，稍后再尝试'
                })
                return false
            }
            return true
        },


        toastNoReadWritePermission({ result, isDir }: { result: number, isDir: boolean }) {
            const fileDes = isDir ? '文件夹' : '文件'
            const permissions = {
                [PermissionRetCode.NO_Read]: '读',
                [PermissionRetCode.NO_Write]: '写',
                [PermissionRetCode.NO_Read_Write]: '读写'
            }
            let message = `该${ fileDes }没有${ permissions[result] }权限`
            if (result == PermissionRetCode.Path_Length_Overflow){
                message = `该${ fileDes }路径太长了，不能支持`
            }
            // @ts-ignore
            this.tsNotify({
                type: 'error',
                message: message
            })
        },

        /*
            统计导入图片的数量
         */
        statImportDetail(imgFiles: Array<{
            imgPath: string,
            imgFormat: number,
            importParentPath: string
        }>) {
            let totalNum = imgFiles.length
            let jpgNum = 0
            let rawNum = 0
            for (const item of imgFiles) {
                if (item.imgFormat == 3) {
                    rawNum++
                } else {
                    jpgNum++
                }
            }

            // @ts-ignore
            this.PointCakeImport(`${ totalNum }_j${ jpgNum }_r${ rawNum }`)
        },

        /**
         * 检测导入
         * @param filePaths
         * @param isAppend 是否是追加模式的导入
         * @param callBack
         * @param progress
         */
        async checkAndImportImages(filePaths: any[], isAppend: boolean, callBack: any, progress?: any) {
            // @ts-ignore
            if (this.showImportProgress) {
                // @ts-ignore
                this.tsNotify({
                    type: 'error',
                    message: '正在导入中，稍后再尝试'
                })
                return
            }
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                // @ts-ignore
                this.tsNotify({
                    type: 'error',
                    message: '网络异常，请检查网络后再试'
                })
                return
            }
            this.onHandlerProgress = progress
            this.onHandlerFinished = callBack
            this.dropPaths = filePaths as any
            this.isAppend = isAppend
            const project = this.activeProject
            await this.innerCheckAndImportImages(project, filePaths, isAppend, this.needDeleteImportProject, callBack)
        },

        /**
         * HOME首页的调用此项
         * @param filePaths
         * @param isAppend 是否是追加模式的导入
         * @param callBack
         * @param progress
         */
        async importImagesOnHome(filePaths: any[], isAppend: boolean, callBack: any, progress?: any) {
            // @ts-ignore
            // if (this.showImportProgress) {
            //     // @ts-ignore
            //     this.tsNotify({
            //         type: 'error',
            //         message: '正在导入中，稍后再尝试'
            //     })
            //     return
            // }
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                // @ts-ignore
                this.tsNotify({
                    type: 'error',
                    message: '网络异常，请检查网络后再试'
                })
                return
            }
            this.onHandlerProgress = progress
            this.onHandlerFinished = callBack
            this.dropPaths = filePaths as any
            this.isAppend = isAppend
            const project = this.activeProject

            this.showImportProgress = true;
            await importImageRpc.importImagesOnHome(isAppend, project, filePaths, this.needDeleteImportProject)
        },

        /*
            内部的导入方法
         */
        async innerCheckAndImportImages(project: any, dropPaths: any, isAppend: boolean, needDeleteImportProject: boolean, callBack: any) {
            this.showImportProgress = true;
            await importImageRpc.checkAndImportImages(this.activeProject, dropPaths, isAppend, needDeleteImportProject)
        },

        removeProject(projectId: number) {
            this._RemoveProject(projectId)
            //@ts-ignore
            this.selectProjects.delete(projectId)
        },
        addConfirmDialogListener(isAdd: boolean) {
            if (isAdd) {
                dialogIpc.addListener(FConfirmDialogKey(kImportConfirmDialog), (param: any) => {
                    this.tsConfirm(param).then(async _ => {
                        await dialogIpc.replyDialogConfirm(true)
                    })
                        .catch(async e => {
                            await dialogIpc.replyDialogConfirm(false)
                        })
                })
            } else {
                dialogIpc.removeListener(FConfirmDialogKey(kImportConfirmDialog))
            }
        },
        addImportImageListener() {
            importImageRpc.addListener(SignalCloseProgressDialogKey, () => {
                this.showImportProgress = false
            })
            importImageRpc.addListener(SignalImportProgressKey, (progress: number, over: number, total: number) => {
                if (this.onHandlerProgress) {
                    //@ts-ignore
                    this.onHandlerProgress({
                        status: `${ progress }`,
                        over: `${ over }`,
                        total: `${ total }`
                    })
                }
            })
            importImageRpc.addListener(SignalImportFinishedKey, (addCounts: number) => {
                this.showImportProgress = false
                if (this.onHandlerFinished) {
                    //@ts-ignore
                    this.onHandlerFinished(addCounts)
                }
            })
            importImageRpc.addListener(SignalUpdateProjectKey, (albumbPaths: any, importTimes: number, thumbnailNumber: number,isAppend:boolean) => {
                this.ACT_AsyncUpdateProject({
                    // 如果是首次导入(非追加模式),则是要更新filePaths到工程路径
                    // @ts-ignore
                    id: this.activeProject.id,
                    path: isAppend ? this.activeProject.path : this.dropPaths,
                    thumbnailPaths: albumbPaths,
                    importTimes: importTimes,
                    // @ts-ignore
                    thumbnailNumber: thumbnailNumber
                }).then(async (resolve) => {
                    // debugger
                    await this._SetCancelImport(false)
                    // 判断数据库的是否更新成功
                    await importImageRpc.onUpdateProjectResult(true)
                }).catch(async e => {
                    // debugger
                    console.error(e)
                    await this._SetCancelImport(false)
                    await importImageRpc.onUpdateProjectResult(false)
                })
            })
            importImageRpc.addListener(SignalRemoveStoreProjectKey, (nProjectId: number) => {
                this.removeProject(nProjectId)
            })
            importImageRpc.addListener(SignalRootNameKey, (rootName: string) => {
                this.myImportName = rootName
            })
        }
    },
    mounted() {
        this.addImportImageListener()
        this.addConfirmDialogListener(true)
    },
    beforeDestroy() {
        importImageRpc.reset()
        this.addConfirmDialogListener(false)
    }
})
