export default class ImageModel {

    // // 图片资源
    // data = null;
    // width = null;
    // height = null;
    // // 方向
    // dirction = 0;
    data: any
    width: number
    height: number
    dirction: number
    img: any

    constructor(data: any, width: number, height: number) {
        this.data = data
        this.width = width
        this.height = height
        this.dirction = 0
        this.img = null
    }

    recycle() {
        this.data = null
        this.img = null
    }
}
