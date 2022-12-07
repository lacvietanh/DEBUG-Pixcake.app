import FileUtils from '@/utils/FileUtils'
import DBIpcRender from '@/irender/DBIpcRender'
import { THUMBNAIL_TABLE } from '@/universal/types/config'

export default {
    state: {
        resizeWidth: null,
        resizeHeight: null,
        x: null,
        y: null,
        cropBoxWidth: null,
        cropBoxHeight: null,
        isSwitchImage: false,//是否点击了切换图片
        iconDisabled: false

    },
    getters: {
        getIconDisabled: state => {
            return state.iconDisabled
        }

    },
    mutations: {
        changeResizeWidth(state, resizeWidth) {
            state.resizeWidth = resizeWidth
        },
        changeResizeHeight(state, resizeHeight) {
            state.resizeHeight = resizeHeight
        },
        changeX(state, x) {
            state.x = x
        },
        changeY(state, y) {
            state.y = y
        },
        setCropBoxData(state, cropBoxData) {
            state.cropBoxWidth = cropBoxData.cropBoxWidth
            state.cropBoxHeight = cropBoxData.cropBoxHeight
        },
        changeSwitchImage(state, boolean) {
            state.isSwitchImage = boolean
        },
        iconDisabled(state, boolean) {
            state.iconDisabled = boolean
        },
        getOriginSize(state, args) {
            state.originalWidth = args.originalWidth
            state.originalHeight = args.originalHeight
        }

    },
    actions: {
        //自定义裁剪框
        getNewCropBoxData({ state, commit }, data) {
            let { value, aspectRatio } = data
            let originWidth = state.resizeWidth
            let originHeight = state.resizeHeight
            let cropBoxWidth
            let cropBoxHeight
            if (value === 0) {
                cropBoxWidth = originWidth
                cropBoxHeight = originHeight
            } else {
                if (aspectRatio > 1) { //比例为宽大 -->宽撑满 16/9
                    if (originWidth / aspectRatio > originHeight) { //高度顶不住
                        cropBoxHeight = originHeight
                        cropBoxWidth = originHeight * aspectRatio
                    } else {
                        cropBoxWidth = originWidth
                        cropBoxHeight = originWidth / aspectRatio
                    }
                } else {//比例为高大 ---》高度撑满 2/3
                    if (originHeight * aspectRatio > originWidth) { //宽度顶不住
                        cropBoxWidth = originWidth
                        cropBoxHeight = cropBoxWidth / aspectRatio
                    } else {
                        cropBoxHeight = originHeight
                        cropBoxWidth = originHeight * aspectRatio
                    }
                }
            }
            commit('setCropBoxData', { cropBoxWidth: cropBoxWidth, cropBoxHeight: cropBoxHeight })
        },

        //保存裁剪功能数据
        saveCropData(context, cropData) {

            return new Promise(async (resolve, reject) => {
                try {
                    let activeThumbnailPath = context.rootState.db.thumbnail.activeThumbnail.imgPath
                    let viewModel = {}//TSImageIOManager.shareInstance().imageViewModelQueue.get(activeThumbnailPath)
                    await viewModel.saveCropData(cropData)
                    resolve(1)
                } catch (e) {
                    resolve(1)
                }
            })
        },

        //删除裁剪功能数据
        async deleteCropData(context) {
            let activeThumbnailPath = context.rootState.db.thumbnail.activeThumbnail.imgPath
            let viewModel = TSImageIOManager.shareInstance().imageViewModelQueue.get(activeThumbnailPath)
            let path = viewModel.thumbnailModel.createCropperFilePath()
            await FileUtils.deleteFile(path)
        },


        //添加数据库，记录用户是否使用裁剪
        async addCropDatabase(context, boolean) {
            let activeThumbnailPath = context.rootState.db.thumbnail.activeThumbnail.imgPath
            let viewModel = TSImageIOManager.shareInstance().imageViewModelQueue.get(activeThumbnailPath)
            // debugger

            viewModel.thumbnailModel.cropFinish = boolean
            await DBIpcRender.updateByKeys(THUMBNAIL_TABLE, viewModel.thumbnailModel, ['cropFinish'], false)
        },

        //读取裁剪功能数据
        readCropData(context) {
            return new Promise(async (resolve, reject) => {
                try {
                    let activeThumbnailPath = context.rootState.db.thumbnail.activeThumbnail.imgPath
                    let viewModel = TSImageIOManager.shareInstance().imageViewModelQueue.get(activeThumbnailPath)
                    let path = viewModel.thumbnailModel.createCropperFilePath()
                    let content = await FileUtils.readFileAsync(path)
                    resolve(content)
                } catch (e) {
                    resolve(null)
                }
            })
        },

        hasCropData(context) {
            return new Promise((resolve => {
                let activeThumbnailPath = context.rootState.db.thumbnail.activeThumbnail.imgPath
                let viewModel = TSImageIOManager.shareInstance().imageViewModelQueue.get(activeThumbnailPath)
                let path = viewModel.thumbnailModel.createCropperFilePath()
                resolve(FileUtils.isFileExist(path))
            }))
        },
        getOriginSize(context) {
            let activeThumbnailPath = context.rootState.db.thumbnail.activeThumbnail.imgPath
            let viewModel = TSImageIOManager.shareInstance().imageViewModelQueue.get(activeThumbnailPath)
            let originalHeight = viewModel.thumbnailModel.originalHeight
            let originalWidth = viewModel.thumbnailModel.originalWidth
            context.commit('getOriginSize', { originalWidth, originalHeight })
        }

    }

}
