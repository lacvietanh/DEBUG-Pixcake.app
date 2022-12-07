import {
    CACHE_PHOTO_FINISH_ORIGIN_IMG_DIR,
    CACHE_PHOTO_FINISH_DIR,
    TsImageDiskCache
} from '@/utils/tsImageDiskCache'
import FileUtils from '@/utils/FileUtils'
import { ReportErrorManager } from '@/utils/export/reportErrorManager'
import DBIpcRender from '@/irender/DBIpcRender'
import { THUMBNAIL_TABLE } from '@/universal/types/config'
import md5 from 'js-md5'
import { getIsTrigger } from '@/universal/utils/common'
import imageIOManager from '@/qt-ipc/imageIOManager'
import FilePathUtils from '@/utils/tsFilePathUtils'
import { PERSON_TYPE_JSON, PERSON_TYPE_JSON_MD5,ORIGIN_PERSON_TYPE_JSON,ORIGIN_PERSON_TYPE_JSON_MD5 } from '@/model/ThumbnailModel'
import path from 'qt/path'
import {PersonBioModel} from "@/model/PersonBioModel";
import {PersonType} from "@/constants/constants";

//格式化人脸原始数据
const formatOriginFaceData = (data, canvasWidth, canvasHeight) => {
    data.map(item => {
        //设置正方形
        item.faceBox[3] = item.faceBox[2]
        //设置年龄类型
        const age = item.age
        const gender = item.gender
        if (gender === 2 && age > 12 && age < 55) {
            item.personType = PersonType.Female
        } else if (gender === 1 && age > 12 && age < 55) {
            item.personType = PersonType.Male
        } else if (age <= 12) {
            item.personType = PersonType.Child
        } else if (age >= 55) {
            item.personType = PersonType.Older
        }
        //弹窗canvas大小
        let newWidth = canvasWidth
        let newHeight = canvasHeight
        //人脸框比例 x,y,w,h
        let faceBoxNormalized = item.faceBoxNormalized
        //实际人脸框的位置信息x,y,w,h
        item.faceBox[0] = newWidth * faceBoxNormalized[0]
        item.faceBox[1] = newHeight * faceBoxNormalized[1]
        item.faceBox[2] = newWidth * faceBoxNormalized[2]
        item.faceBox[3] = newHeight * faceBoxNormalized[3]
    })
    for (let i = 0; i < data.length; i++) {
        let faceBoxNormalized = data[i].faceBoxNormalized
        data[i].originFaceBox = faceBoxNormalized
    }
    return data
}

export default {
    state: {
        isFaceLoadSuccess: false,
        ageSexReviseBg: null,
        hasChangeEffect: false,
        configJsonStr: null,
        toningJsonStr: null,
        ageSexReviseData: null,
        thumbnailId: -1,
        releaseImageMemory: false,
        faceIndex: null,
        originFaceData: [],
        changeFaceData: [],
        originImageJxlPath: '',

        canvasHeight: 0,
        canvasWidth: 0,
        isLoadDataError: false

    },
    getters: {
        //切换图片后，人脸框数据是否加载好了
        isFaceLoadSuccess(state) {
            return state.isFaceLoadSuccess
        },
        isLoadDataError: (state) => state.isLoadDataError
    },
    mutations: {
        //数据时候加载完成，可以点击修改按钮
        setIsFaceLoadSuccess(state, val) {
            if (!val) {
                state.originFaceData = []
            }
            state.isFaceLoadSuccess = val
        },
        changeAgeSexReviseEffectData(state, data) {
            let { configJsonStr, toningJsonStr, thumbnailId, ageSexReviseData } = data
            let hasChangeEffect = false
            if (state.configJsonStr !== configJsonStr) {
                state.configJsonStr = configJsonStr
                hasChangeEffect = true
            }
            if (state.toningJsonStr !== toningJsonStr) {
                state.toningJsonStr = toningJsonStr
                hasChangeEffect = true
            }
            if (state.thumbnailId !== thumbnailId) {
                state.thumbnailId = thumbnailId
                hasChangeEffect = true
            }
            if (state.ageSexReviseData !== ageSexReviseData) {
                state.ageSexReviseData = ageSexReviseData
                hasChangeEffect = true
            }
            if (hasChangeEffect) {
                state.hasChangeEffect = !state.hasChangeEffect
            }

        },
        releaseImageMemory(state, releaseImageMemory) {
            state.releaseImageMemory = releaseImageMemory
        },
        faceIndex(state, payload) {
            state.faceIndex = payload
            console.log(payload)
        },

        //原始人脸框数据
        initOriginFaceData(state, originFaceData) {
            for (let i = 0; i < originFaceData.length; i++) {
                let age = originFaceData[i].age
                let gender = originFaceData[i].gender
                if (age > 12 && age < 55 && gender === 1) {
                    originFaceData[i].personType = 'Male'
                } else if (age > 12 && age < 55 && gender === 2) {
                    originFaceData[i].personType = 'Female'
                } else if (age <= 12) {
                    originFaceData[i].personType = 'Child'
                } else if (age >= 55) {
                    originFaceData[i].personType = 'Older'
                }
            }
            state.originFaceData = originFaceData
            console.log('人脸框数据保存完成，可点击修改',state.originFaceData)
        },
        //修改后的人脸框数据
        initChangeFaceData(state, changeFaceData) {
            state.changeFaceData = changeFaceData
        },
        //处理数据归一处理
        tidyOriginFaceData(state, faceDataScale) {
            let oldFaceData = state.originFaceData
            for (let i = 0; i < oldFaceData.length; i++) {
                oldFaceData[i].faceBox = faceDataScale[i]
            }
        },
        //整理修改后的数据
        tidyChangeFaceData(state, faceDataScale) {
            let newFaceData = state.changeFaceData
            for (let i = 0; i < newFaceData.length; i++) {
                if (newFaceData[i].index !== undefined) {
                    delete newFaceData[i].index
                }
                delete newFaceData[i].originFaceBox
                delete newFaceData[i].personType
                newFaceData[i].faceBox = faceDataScale[i]

            }
            state.changeFaceData = newFaceData
        },

        //保存初始化canvas大小数据
        initCanvasSize(state, val) {
            state.canvasWidth = val.width
            state.canvasHeight = val.height
        },

        setIsLoadDataError(state, val) {
            state.isLoadDataError = val
        }


    },
    actions: {
        //获取图片数据
        getImageData(context) {
            return new Promise(async (resolve, reject) => {
                try {
                    //获取原始宽高
                    // let width = context.rootState.thumbnail.activeThumbnail.originWidth
                    // let height = context.rootState.thumbnail.activeThumbnail.originHeight

                    //获取ImageCanvas的显示宽高
                    let width = context.rootState.thumbnail.activeThumbnail.width
                    let height = context.rootState.thumbnail.activeThumbnail.height

                    //获取图片数据
                    let imagePath = context.rootState.thumbnail.activeThumbnail.imgPath
                    let viewModel = await imageIOManager.getViewModel(imagePath)
                    let tsImageDiskCache = new TsImageDiskCache(CACHE_PHOTO_FINISH_ORIGIN_IMG_DIR)
                    let cacheResult = await tsImageDiskCache.getOriginImageCache(viewModel)
                    // if (!cacheResult) {
                    //   reject(null)
                    // }
                    let data = 'data:image/jpeg;base64,' + cacheResult?.image

                    //获取人脸框数据
                    let face = await context.dispatch('getFaceBoxData')
                    // if (!(face && face.length > 0)) {
                    //   reject(null)
                    // }
                    let imageData = { data, width, height, face }
                    resolve(imageData)
                } catch (e) {
                    reject(null)
                    console.log('年龄修改数据加载失败', e)
                }
            })
        },
        //获取图片以及dialog宽高
        async getImageSize(context) {
            return new Promise(async (resolve, reject) => {
                try {
                    let originImageWidth = context.rootState.thumbnail.activeThumbnail.originWidth
                    let originImageHeight = context.rootState.thumbnail.activeThumbnail.originHeight
                    let dialogHeight, dialogWidth, canvasHeight, canvasWidth
                    let imgRatio = originImageWidth / originImageHeight
                    // 获取屏幕body的大小
                    let bodySize = {
                        height: document.documentElement.clientHeight,
                        width: document.documentElement.clientWidth
                    }
                    //不同的比例的照片，画出不同的大小
                    let Ratio1 = Math.abs(imgRatio - 9 / 16)
                    let Ratio2 = Math.abs(imgRatio - 3 / 4)
                    let Ratio3 = Math.abs(imgRatio - 3 / 2)
                    let Ratio4 = Math.abs(imgRatio - 16 / 9)
                    let arrDifference = [Ratio1, Ratio2, Ratio3, Ratio4]
                    const minNum = Math.min.apply(null, arrDifference)
                    const minIndex = arrDifference.indexOf(minNum)

                    //最大显示的80%
                    let maxHeight = bodySize.height * 0.8
                    let maxWidth = bodySize.width * 0.8

                    if (minIndex === 0 || minIndex === 1) { // 9/16 长 3/4 长
                        canvasWidth = minIndex === 0 ? 350 : 465
                        canvasHeight = canvasWidth / imgRatio
                    } else if (minIndex === 2 || minIndex === 3) { // 3/2 宽 16/9 宽
                        canvasHeight = minIndex === 2 ? 620 : 523
                        canvasWidth =  canvasHeight * imgRatio
                    }

                    let maxRatio = maxWidth / maxHeight
                    //判断窗口，不让他超过主界面大小
                    if (maxRatio > imgRatio)
                    {
                        //判断是否超过界面的高度
                        if (canvasHeight > maxHeight) {
                            canvasHeight = maxHeight
                            canvasWidth = imgRatio * canvasHeight
                        }
                    }
                    else
                    {
                        //判断是否超过界面的宽度
                        if (canvasWidth > maxWidth) {
                            canvasWidth = maxWidth
                            canvasHeight = canvasWidth/imgRatio
                        }
                    }
                    dialogWidth = canvasWidth;
                    if (dialogWidth < 300) { //解决底部按钮重叠
                        dialogWidth = 300
                    }
                    dialogHeight = canvasHeight;

                    let canvasSize = { height:canvasHeight, width:canvasWidth }
                    context.commit('initCanvasSize', canvasSize)
                    let size = { dialogWidth, dialogHeight, canvasWidth, canvasHeight }
                    resolve(size)
                } catch (e) {
                    reject(null)
                    console.log('年龄修改数据加载失败', e)
                }
            })
        },

        //获取人脸框数据
        getFaceBoxData(context) {
            return new Promise(async (resolve, reject) => {
                try {
                    let localFaceBoxData = await context.dispatch('readLocalFaceBoxData')
                    if (localFaceBoxData && localFaceBoxData.length > 0) {
                        let faceData = []
                        for (const face of localFaceBoxData) {
                            faceData.push(new PersonBioModel(face))
                        }
                        //本地有数据，使用本地数据
                        resolve(faceData)
                    } else {
                        //本地没有数据，获取原始数据
                        let cacheFaceData = await JSON.parse(JSON.stringify(context.state.originFaceData))
                        let originFaceData = formatOriginFaceData(cacheFaceData, context.state.canvasWidth, context.state.canvasHeight)
                        //本地没有数据
                        resolve(originFaceData)
                    }
                } catch (e) {
                    console.log('获取人脸框数据失败',e)
                }
            })

        },

        //读取本地人脸框数据
        readLocalFaceBoxData(context) {
            return new Promise(async (resolve, reject) => {
                try {
                    let imagePath = context.rootState.thumbnail.activeThumbnail.imgPath
                    let viewModel = await imageIOManager.getViewModel(imagePath)

                    let thumbPath = await FilePathUtils.getThumbnailsPath(viewModel.thumbnailModel.id)
                    let filePath = await path.join(thumbPath, PERSON_TYPE_JSON)
                    let res = await FileUtils.readFileAsync(filePath)
                    let personJson = JSON.parse(res) || []
                    // 迁移人脸index:升级上来的旧数据，判断是index的赋值给id
                    for (const personJsonElement of personJson) {
                        if (personJsonElement.index != undefined && personJsonElement.index != null){
                            personJsonElement.id = personJsonElement.index
                        }
                    }
                    resolve(personJson)
                } catch (e) {
                    resolve(null)
                    console.log('年龄修改数据加载失败', e)
                }
            })
        },

        //保存人脸框数据到本地
        async saveFaceData(context, faceData) {
            context.commit('initChangeFaceData', faceData)

            //添加原始人脸框比例数据其实是faceBoxNormalized赋给originFaceBox
            let originFaceData = faceData//context.state.originFaceData
            for (let i = 0; i < faceData.length; i++) {
                let x = originFaceData[i].faceBoxNormalized[0]
                let y = originFaceData[i].faceBoxNormalized[1]
                let w = originFaceData[i].faceBoxNormalized[2]
                let h = originFaceData[i].faceBoxNormalized[3]
                faceData[i].originFaceBox = [x, y, w, h]
            }
            return new Promise(async (resolve, reject) => {
                try {
                    let imagePath = context.rootState.thumbnail.activeThumbnail.imgPath
                    let viewModel = await imageIOManager.getViewModel(imagePath)
                    let thumbPath = await FilePathUtils.getThumbnailsPath(viewModel.thumbnailModel.id)

                    let ptPath = await path.join(thumbPath, PERSON_TYPE_JSON)
                    let md5Path = await path.join(thumbPath, PERSON_TYPE_JSON_MD5)

                    let data = JSON.stringify(faceData)
                    let md5Data = md5(data)
                    await FileUtils.writeFileAsync(ptPath, data)
                    await FileUtils.writeFileAsync(md5Path, md5Data)

                    //如果本地没有保存初始人脸框数据，则保存该数据
                    let origin_ptPath = await path.join(thumbPath, ORIGIN_PERSON_TYPE_JSON)
                    let origin_md5Path = await path.join(thumbPath, ORIGIN_PERSON_TYPE_JSON_MD5)
                    let isOriginFaceDataFileExist = await FileUtils.isFileExist(origin_ptPath)
                    if (!isOriginFaceDataFileExist) { //不存在,保存
                        let cacheFaceData = await JSON.parse(JSON.stringify(context.state.originFaceData))
                        let originFaceData = formatOriginFaceData(cacheFaceData, context.state.canvasWidth, context.state.canvasHeight)
                        let originData = JSON.stringify(originFaceData)
                        let originMd5Data = md5(originData)
                        await FileUtils.writeFileAsync(origin_ptPath, originData)
                        await FileUtils.writeFileAsync(origin_md5Path, originMd5Data)
                    }

                    resolve(1)
                } catch (e) {
                    resolve(1)
                }
            })
        },

        //数据上报
        async sexReport(context,inputOldFaceData) {
            // let sexRevisePatch = context.getters['config/sexRevisePatch']
            // let isReport = getIsTrigger(sexRevisePatch) //事件触发概率
            // if (!isReport) return

            let imagePath = context.rootState.thumbnail.activeThumbnail.imgPath

            let viewModel = await imageIOManager.getViewModel(imagePath)
            let projectId = viewModel?.thumbnailModel.projectId

            let isFirstErrorReport = !viewModel.thumbnailModel.errorReport //默认false
            let originPath = isFirstErrorReport ? viewModel?.imgPath : ''

            let oldFaceData = JSON.stringify(inputOldFaceData)//JSON.stringify(context.state.originFaceData)
            let newFaceData = JSON.stringify(context.state.changeFaceData)

            let args = {
                projectId,
                imagePath: imagePath,
                item: { originPath, newFaceData, oldFaceData }
            }
            window.$export.asyncReportSex(args)
        },

        saveExtraDataToCache({ rootState }, extraJson) {
            let activeThumbnailPath = rootState.thumbnail.activeThumbnail.imgPath
            let viewModel = {}//TSImageIOManager.shareInstance().imageViewModelQueue.get(activeThumbnailPath)
            return new Promise(async (resolve, reject) => {
                try {
                    let path = viewModel.thumbnailModel.createExtraDataFilePath()
                    let md5Path = viewModel.thumbnailModel.getExtraDataFileMD5Path()
                    let data = JSON.stringify(extraJson)
                    let md5Data = md5(data)
                    await FileUtils.writeFileAsync(path, data)
                    await FileUtils.writeFileAsync(md5Path, md5Data)
                    resolve(1)
                } catch (e) {
                    resolve(1)
                }
            })
        }
    }
}
