import locs from '@/utils/locs'
import md5 from 'js-md5'
import { PROJECT_ID } from '@/universal/types/config'
import { BatchActiveMode } from '@/constants/batchRetouchDef.ts'
import FileUtils from '@/utils/FileUtils'
import UserModel from '@/universal/model/UserModel'
import fs from '@/qt-ipc/fs'
import NodeApi from 'qt/node-api'
import { app as APP } from '@/qt-ipc/app'
import path from 'qt/path'

const USER = 'user'
const PROJECT = 'project'
const THUMBNAIL = 'thumbnail'
const EXPORT = 'export'
const PRESET = 'preset'
const PALETTE_PRESET = 'palettePreset'
const TEMPLATE = 'template'
const TMP = 'tmp'
const THUMBNAIL_CACHE = 'thumbnail_cache'

/**
 * 项目相关的文件路径工具类
 */
export default {

    /**
     * 获取应用根目录路径
     * @returns {*}
     */
    async getAppRootPath() {
        return APP.getWorkSpacePath()
    },

    /**
     * 获取当前项目根目录路径
     *
     * 备注：1、项目根目录按{projectName}_{projectId} 命名
     *      2、如果当前项目不存在的话就存放到{project}目录中
     * @returns {string}  格式：  [app]/project/{projectName}_{projectId}
     */
    async getProjectRootPath() {
        const sep = path.sep
        let parentPath = await this.getAppRootPath() + sep + PROJECT
        let userId = await UserModel.getInstance().getUserId()
        if (!await FileUtils.isFileExist(parentPath)) {
            await fs.mkdirSync(parentPath)
        }

        let projectDirPath = await path.join(parentPath, `user_${userId}`)
        if (!await FileUtils.isFileExist(projectDirPath)) {
            await fs.mkdirSync(projectDirPath)
        }

        let id = locs.get(PROJECT_ID)
        let dirName = id
        projectDirPath = await path.join(projectDirPath, dirName)
        if (!await FileUtils.isFileExist(projectDirPath)) {
            await fs.mkdirSync(projectDirPath)
        }
        return projectDirPath
    },

    async getProjectRootPathByProject(project) {
        const sep = path.sep
        let parentPath = await this.getAppRootPath() + sep + PROJECT
        if (!await FileUtils.isFileExist(parentPath)) {
            await fs.mkdirSync(parentPath)
        }

        let projectDirPath = await path.join(parentPath, `user_${project.userId}`)
        if (!await FileUtils.isFileExist(projectDirPath)) {
            await fs.mkdirSync(projectDirPath)
        }

        let id = project.id
        let dirName = `${id}`
        projectDirPath = await path.join(projectDirPath, dirName)
        if (!await FileUtils.isFileExist(projectDirPath)) {
            await fs.mkdirSync(projectDirPath)
        }
        return projectDirPath
    },


    /**
     * 获取素材目录路径
     * @param id 素材id
     * @returns {string}  格式：  [app]/project/{projectName}_{projectId}/thumbnail_id
     */
    async getThumbnailsPath(id) {
        const thumbnailName = THUMBNAIL + '_' + id
        const thumbnailPath = await path.join(await this.getThumbnailCacheRootPath(), thumbnailName)
        if (!await FileUtils.isFileExist(thumbnailPath)) {
            await fs.mkdirSync(thumbnailPath)
        }
        return thumbnailPath
    },


    async getThumbnailCacheRootPath(){
        return await path.join(await this.getProjectRootPath(), THUMBNAIL_CACHE)
    },
    /**
     * raw转jpg的原图保存jpg
     * @param id
     * @returns {string}
     */
    async getRawOriginJpgPath(id) {
        const sep = path.sep
        const thumbnailName = THUMBNAIL + '_' + id
        const projPath = await this.getThumbnailCacheRootPath()
        let thumbnailPath = await path.join(projPath, thumbnailName)
        if (!await FileUtils.isFileExist(thumbnailPath)) {
            await fs.mkdirSync(thumbnailPath)
        }
        thumbnailPath = await path.join(thumbnailPath, 'rawOrignCache')
        if (!await FileUtils.isFileExist(thumbnailPath)) {
            await fs.mkdirSync(thumbnailPath)
        }
        return thumbnailPath
    },

    async getExportRawOriginJpgPath(id) {
        const sep = path.sep
        const exportName = EXPORT + '_' + id
        let exportPath = await path.join(await this.getThumbnailCacheRootPath(), exportName)
        if (!await FileUtils.isFileExist(exportPath)) {
            await fs.mkdirSync(exportPath)
        }
        exportPath = await path.join(exportPath, 'rawOrignCache')
        if (!await FileUtils.isFileExist(exportPath)) {
            await fs.mkdirSync(exportPath)
        }
        return exportPath
    },

    async getExportPath(id) {
        const exportName = EXPORT + '_' + id
        const exportPath = await path.join(await this.getProjectRootPath(), exportName)
        if (!await FileUtils.isFileExist(exportPath)) {
            await fs.mkdirSync(exportPath)
        }
        return exportPath
    },
    /*
        获得工程封面的缩略图的路径
     */
    async getProjectAlbumPhotoPath(projectId, projectName) {
        const sep = path.sep
        let parentPath = await this.getAppRootPath() + sep + PROJECT
        if (!await FileUtils.isFileExist(parentPath)) {
            await fs.mkdirSync(parentPath)
        }

        let userId = await UserModel.getInstance().getUserId()
        let projectDirPath = await path.join(parentPath, `user_${userId}`)
        if (!await FileUtils.isFileExist(projectDirPath)) {
            await fs.mkdirSync(projectDirPath)
        }

        let dirName = `${projectId}`
        projectDirPath = await path.join(projectDirPath, dirName)
        if (!await FileUtils.isFileExist(projectDirPath)) {
            await fs.mkdirSync(projectDirPath)
        }

        const albumPath = await path.join(projectDirPath, 'albumnThumbnail')
        if (!await FileUtils.isFileExist(albumPath)) {
            await fs.mkdirSync(albumPath)
        }
        return albumPath
    },



    /**
     * 获取预设目录路径
     * @param id 预设id
     * @returns {string}  格式：  [app]/preset/{user_id}/{preset_id}
     */
    async getPresetPath(id, userId, presetType) {
        const sep = path.sep
        const user = USER + '_' + userId
        id = id || 'temp'
        let presetFolder = PRESET
        const presetId = presetFolder + '_' + id

        // 创建预设的目录 preset_$id
        const presetParentPath = await this.getAppRootPath() + sep + presetFolder
        if (!await FileUtils.isFileExist(presetParentPath)) {
            await fs.mkdirSync(presetParentPath)
        }

        //user_$presetId
        const userToPresetPath = presetParentPath + sep + user
        if (!await FileUtils.isFileExist(userToPresetPath)) {
            await fs.mkdirSync(userToPresetPath)
        }


        let spath = userToPresetPath + sep + presetId
        if (!await FileUtils.isFileExist(spath)) {
            await fs.mkdirSync(spath)
        }

        // 创建美化和"图像调节"调色目录
        let beautifyFolderPath = spath + sep + 'beautify'
        if (!await FileUtils.isFileExist(beautifyFolderPath)) {
            await fs.mkdirSync(beautifyFolderPath)
        }

        let paletteFolderPath = spath + sep + 'palette'
        if (!await FileUtils.isFileExist(paletteFolderPath)) {
            await fs.mkdirSync(paletteFolderPath)
        }

        spath = presetType == BatchActiveMode.RETOUCH ? beautifyFolderPath : paletteFolderPath
        return spath
    },

    /**
     * 获取项目的临时文件目录
     * @returns {string}  格式：  [app]/project/{projectName}_{projectId}/thumbnail_id/tmp
     */
    async getProjectTmpDirPath() {
        const sep = path.sep
        const path = await this.getProjectRootPath() + sep + TMP
        if (!await FileUtils.isFileExist(path)) {
            await fs.mkdirSync(path)
        }

        return path
    },

    async getRawPathKernelPath(needSubDir = true) {
        const sep = path.sep
        let rawPath = await this.getAppRootPath() + sep + 'dstRaw'

        if (!await FileUtils.isFileExist(rawPath)) {
            await fs.mkdirSync(rawPath)
        }

        // if (!needSubDir) {
        //     return rawPath
        // }
        let parentPath = rawPath + sep + 'Kernels'
        if (!await FileUtils.isFileExist(parentPath)) {
            await fs.mkdirSync(parentPath)
        }
        return parentPath
    },

    async getRetouchPathKernelPath(needSubDir = true) {
        const sep = path.sep
        let retouchPath = await this.getAppRootPath() + sep + 'dstRetouch'

        if (!await FileUtils.isFileExist(retouchPath)) {
            await fs.mkdirSync(retouchPath)
        }

        // if (!needSubDir) {
        //     return retouchPath
        // }

        let parentPath = retouchPath + sep + 'kernel'
        if (!await FileUtils.isFileExist(parentPath)) {
            await fs.mkdirSync(parentPath)
        }
        return parentPath
    },

    deleteFaFile(skrPath, faSeedFilePath, decryptRequestPath) {

        FileUtils.deleteFile(skrPath)
        FileUtils.deleteFile(faSeedFilePath)
        FileUtils.deleteFile(decryptRequestPath)
    },

    async deleteFolders(folderPath) {
        if (await FileUtils.isFileExist(folderPath)) {
            await fs.rmdirSync(folderPath)
        }
    },

    async createBuildCLKernelFolder() {
        let dstRetouchFolder = await this.getRetouchPathKernelPath()
        let dstRawFolder = await this.getRawPathKernelPath()
        {
            await this.deleteFolders(dstRawFolder)
            dstRawFolder = this.getRawPathKernelPath()
            await this.deleteFolders(dstRetouchFolder)
            dstRetouchFolder = this.getRetouchPathKernelPath()
        }
        return { dstRawFolder: dstRawFolder, dstRetouchFolder: dstRetouchFolder }
    },

    async md5WithFilePath(filepath) {
        if (!await FileUtils.isFileExist(filepath)) {
            return ''
        }
        // TODO: kfc 这里后续确认改为async是否要一路await
        let fileData = await fs.readFileSync(filepath)//await FileUtils.readFileAsync(filepath)
        return md5(fileData)
    },

    async checkMD5WithFilePath(strMD5, filepath) {
        if (strMD5 == null || typeof strMD5 !== 'string' || strMD5.length <= 0) {
            return false
        }
        if (!await FileUtils.isFileExist(filepath)) {
            return false
        }
        const currentMD5 = await this.md5WithFilePath(filepath)//typeof currentMD5 === 'string' &&
        return currentMD5 === strMD5
    },

    async asyncSafeReadFileAndCopyTo(fromPath, toPath, fromMD5Path, toMD5Path, fromQRCVersionIsValid = true, toQRCVersionIsValid = true) {
        return new Promise(async (resolve, reject) => {
            let step = 'checkToDataIsValid: '
            let toFileData = await FileUtils.safeReadFileAsync(toPath)
            let toFileMD5Data = await FileUtils.safeReadFileAsync(toMD5Path)
            if (toFileData == null || toFileMD5Data == null) {// 两个文件都不存在
                step += 'false; checkFromDataIsValid: '
                // 拷贝ai本地缓存
                if (fromQRCVersionIsValid) {
                    step += '1; '
                    const fromFileData = await FileUtils.safeReadFileAsync(fromPath)
                    const fromFileMD5Data = await FileUtils.safeReadFileAsync(fromMD5Path)
                    if (fromFileData && fromFileMD5Data) {
                        step += '2; '
                        const fromFileDataMD5String = md5(fromFileData)
                        const fromFileMD5DataMD5String = fromFileMD5Data.toString()
                        if (fromFileDataMD5String === fromFileMD5DataMD5String) {
                            step += '3; '
                            toFileData = fromFileData
                            toFileMD5Data = fromFileMD5Data
                            await FileUtils.safeWriteFileAsync(toPath, toFileData)
                            await FileUtils.safeWriteFileAsync(toMD5Path, toFileMD5Data)
                        }
                    }
                }
            } else if (toFileData && toFileMD5Data && toQRCVersionIsValid) { // 两个文件都存在, 并且版本号合法这两个数据才能用
                step += '4; '
                const toFileMD5DataMD5String = toFileMD5Data.toString()
                const md5String = md5(toFileData)
                if (md5String !== toFileMD5DataMD5String) {
                    step += '5; '
                    await FileUtils.deleteFile(toPath)
                    await FileUtils.deleteFile(toMD5Path)
                    toFileData = null
                    toFileMD5Data = null
                }
            } else {// 有一个文件不存在
                await FileUtils.deleteFile(toPath)
                await FileUtils.deleteFile(toMD5Path)
                toFileData = null
                toFileMD5Data = null
            }
            resolve({ fileData: toFileData, fileDataMD5: toFileMD5Data && toFileMD5Data.toString(), step: step })
        })
    }

}
