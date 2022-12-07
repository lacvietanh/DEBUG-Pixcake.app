export class TSImageIOManager {

    constructor() {
        this._instance = null
        this.imageIoQueue = new Map()
        this.imageViewModelQueue = new Map()
        this.imageDataQueue = new Map()
        this.renderImageDataQue = new Map() // 仅缓存一张效果图
        this._thumbnailWidth = 0 // 缩略图尺寸的大小
        this.qrcEngineMap = new Map()
        this.errorHandle = null // 引擎初始化失败
        this.successHandle = null // 引擎初始化成功
    }

    static shareInstance() {
        if (!this._instance) {
            this._instance = new TSImageIOManager()
        }
        return this._instance
    }
}
