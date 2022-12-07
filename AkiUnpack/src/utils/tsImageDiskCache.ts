import ImageModel from '@/model/ImageModel'
// @ts-ignore
import tsFilePathUtils from '@/utils/tsFilePathUtils'
// @ts-ignore
import FileUtils from '@/utils/FileUtils'
// @ts-ignore
import { QRC_VERSION } from '@/universal/types/config'
import tsqrcInstance from '@/qt-ipc/pixcookengine'

// 缩略图缓存
export const CACHE_THUMB_DIR = 'c_t'
// 精修左栏缩略图缓存
export const CACHE_THUMB_PHOTO_DIR = 'c_t_p_d'
// 精修效果图缓存
export const CACHE_PHOTO_FINISH_DIR = 'c_p_f_e'
// 精修原图缓存
export const CACHE_PHOTO_FINISH_ORIGIN_IMG_DIR = 'c_p_f_o'
import fs from '@/qt-ipc/fs'

let debugEnv = process.env.VUE_APP_ENV === 'dev' || process.env.VUE_APP_ENV === 'beta'
import {
    initPreviewCacheStatus
} from '@/utils/initGpuStatus'
import NodeApi from '@/qt-ipc/node-api'
import imageIOManager from '@/qt-ipc/imageIOManager'

async function getFileName(filePath: string) {
    let basename = await NodeApi.path.basename(filePath)
    let extname = await NodeApi.path.extname(filePath)
    return basename.substr(0, basename.length - extname.length).trim()
}


/**
 * 图片的硬盘缓存
 */
export class TsImageDiskCache {

    cacheDir: string = CACHE_THUMB_DIR

    constructor(cacheDir: string) {
        this.cacheDir = cacheDir
    }

    /**
     * 获取缓存目录
     * @param thumbnailVM
     */
    async getCacheDir(thumbnailVM: any) {
        let thumbnailPath = await tsFilePathUtils.getThumbnailsPath(thumbnailVM.thumbnailModel.id)
        let dirPath = await NodeApi.path.join(thumbnailPath, this.cacheDir)
        if (!await FileUtils.isFileExist(dirPath)) {
            await fs.mkdirSync(dirPath)
        }
        return dirPath
    }


    /**
     * 保存图片数据
     * @param imageData
     * @param thumbnailViewModel
     * @param configJsonStr  美化参数
     * @param toningJsonStr  色调参数
     */
    async saveImage(imageData: any, thumbnailViewModel: any) {
        let fileName = getFileName(thumbnailViewModel.imgPath)
        let filePath = await NodeApi.path.join(this.getCacheDir(thumbnailViewModel), fileName)
        let jsonPath = filePath + '.json'
        let extPath = filePath + '_ext'

        return new Promise(async (resolve, reject) => {

            let { configJsonStr, toningJsonStr } = imageData
            let hasCacheData = await this.hasCacheData(thumbnailViewModel, configJsonStr, toningJsonStr)
            if (hasCacheData) {
                resolve(1)
                return
            }
            let imageModel = imageData.image
            let geoJson =
                {
                    width: imageModel.width,
                    height: imageModel.height,
                    dirction: imageModel.dirction,
                    configJsonStr: configJsonStr,
                    toningJsonStr: toningJsonStr,
                    qrcVersion: QRC_VERSION
                }
            try {

                let result = { ...imageData.extendInfo }

                if (imageData.face) {
                    result.face = imageData.face
                }
                if (imageData.originalImage) {
                    result.originalImage = imageData.originalImage
                }

                let extendData = JSON.stringify(result)
                await FileUtils.writeFileAsync(extPath, extendData)
                await FileUtils.writeFileAsync(jsonPath, JSON.stringify(geoJson))
                if (await FileUtils.isFileExist(filePath)) {
                    await fs.unlinkSync(filePath)
                }
                // await FileUtils.writeFileAsync(filePath, imageModel.data)
                let img = { data: imageModel.data, width: imageModel.width, height: imageModel.height, orientation: 1 }
                // tsqrcInstance.saveImageWithEncode(imageModel.data, imageModel.width, imageModel.height, 1, filePath).then((code:boolean) => {
                //     //imageModel = null
                //     resolve(code)
                // });

            } catch (e) {
                resolve(1)
            }
        })
    }

    hasCacheData(thumbnailViewModel: any, currentConfigJsonStr: any, currentToningJsonStr: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let fileName = await getFileName(thumbnailViewModel.imgPath)
                let filePath = await NodeApi.path.join(await this.getCacheDir(thumbnailViewModel), fileName)
                let jsonPath = filePath + '.json'
                let extPath = filePath + '_ext'
                let index = thumbnailViewModel.imgIndex
                // console.log('loadImageFromCache  ---', index)
                if (await FileUtils.isFileExist(filePath) && await FileUtils.isFileExist(jsonPath)) {
                    // console.log('loadImageFromCache  fileexit ', index)
                    const data = await FileUtils.readFileAsync(jsonPath)
                    const { width, height, dirction, configJsonStr, toningJsonStr, qrcVersion } = JSON.parse(data)
                    if (this.hasValidCache(currentConfigJsonStr, currentToningJsonStr, configJsonStr, toningJsonStr, qrcVersion)) {
                        resolve(true)
                        return
                    }
                }
                resolve(false)

            } catch (e) {
                resolve(false)
            }
        })
    }

    /**
     * 通过效果参数 + qrcVersion变更确认是否缓存一致
     * @param currentConfigJsonStr
     * @param currentToningJsonStr
     * @param configJsonStr
     * @param toningJsonStr
     * @param qrcVersion
     */
    hasValidCache(currentConfigJsonStr: string, currentToningJsonStr: string, configJsonStr: string, toningJsonStr: string, qrcVersion: any) {
        if (debugEnv) {
            let cacheStatus = initPreviewCacheStatus()
            if (!cacheStatus) {
                return false
            }
        }
        let currentQrcVersion = QRC_VERSION
        return currentConfigJsonStr === configJsonStr && currentToningJsonStr === toningJsonStr && qrcVersion === currentQrcVersion
    }

    /**
     * 获取缓存数据
     * @param thumbnailViewModel
     * @param currentConfigJsonStr
     * @param currentToningJsonStr
     */
    getCacheData(thumbnailViewModel: any, currentConfigJsonStr: any, currentToningJsonStr: any): Promise<any> {

        return new Promise(async (resolve, reject) => {
            try {
                let fileName = await getFileName(thumbnailViewModel.imgPath)
                let filePath = await NodeApi.path.join(await this.getCacheDir(thumbnailViewModel), fileName)
                let jsonPath = filePath + '.json'
                let extPath = filePath + '_ext'
                let index = thumbnailViewModel.imgIndex
                // console.log('loadImageFromCache  ---', index)
                if (await FileUtils.isFileExist(filePath) && await FileUtils.isFileExist(jsonPath)) {
                    // console.log('loadImageFromCache  fileexit ', index)
                    const data = await FileUtils.readFileAsync(jsonPath)
                    const { width, height, dirction, configJsonStr, toningJsonStr, qrcVersion } = JSON.parse(data)

                    if (this.hasValidCache(currentConfigJsonStr, currentToningJsonStr, configJsonStr, toningJsonStr, qrcVersion)) {
                        // console.log('loadImageFromCache  json ', index)

                        const extData = await FileUtils.readFileAsync(extPath)

                        const { hisData, exifInfo, face, originalImage, poseRefineInfos } = JSON.parse(extData)

                        //const imgData = await FileUtils.readFileAsync(filePath)
                        tsqrcInstance.loadImageWithEncode(filePath).then((result: any) => {
                            if (result.isSuccess) {
                                console.log(`has Cache data:  ${ thumbnailViewModel.imgIndex }`)
                                let imgModel = new ImageModel(result.data, width, height)
                                imgModel.dirction = dirction
                                // 设置为空，去掉引用链
                                result.img = null
                                resolve({
                                    image: imgModel,
                                    extendInfo: {
                                        hisData: hisData, exifInfo: exifInfo,
                                        poseRefineInfos: poseRefineInfos || null
                                    },
                                    face: face,
                                    originalImage: originalImage
                                })
                            } else {
                                resolve(null)
                            }
                        })
                    } else {
                        resolve(null)
                    }
                } else {
                    resolve(null)
                }
            } catch (e) {
                resolve(null)
            }
        })
    }

    //获取缓存的原图信息
    async getOriginImageCache(viewModel: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let fileName = await getFileName(viewModel.imgPath)
                let filePath = await NodeApi.path.join(await this.getCacheDir(viewModel), fileName)
                let jsonPath = filePath + '.json'
                let extPath = filePath + '_ext'
                if (await FileUtils.isFileExist(filePath) && await FileUtils.isFileExist(jsonPath)) {
                    tsqrcInstance.loadImageWithEncode(filePath).then((result: any) => {
                        if (result.data) {
                            // 设置为空，去掉引用链
                            result.img = null
                            resolve({
                                image: result.data
                            })
                        } else {
                            resolve(null)
                        }
                    })
                } else {
                    resolve(null)
                }
            } catch (e) {
                resolve(null)
            }
        })
    }

    async hasCacheDir(thumbnailViewModel: any) {
        let cacheDir = await this.getCacheDir(thumbnailViewModel)
        if (await FileUtils.isDirExist(cacheDir)) {
            let files = fs.readdirSync(cacheDir)
            return (files && (files as any).length) > 0
        }
        return false
    }


    //删除缓存数据
    deleteImage(thumbnailViewModel: any) {
        return new Promise(async (resolve, reject) => {
            try {
                await FileUtils.deleteFolder(await this.getCacheDir(thumbnailViewModel))
                resolve(true)
            } catch (e) {
                resolve(null)
            }
        })

    }
}
