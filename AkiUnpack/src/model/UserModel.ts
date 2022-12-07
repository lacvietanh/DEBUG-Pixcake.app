import { Optional } from '@/universal/types/foundation'

export default class User {

    userId: Optional<number> = null
    token: Optional<string> = null
    tel: Optional<string> = null
    merchantId: Optional<number> = null //商家id
    // vip 信息
    isVip: boolean = false
    leftNum: number = 0
    totalNum: number = 0
    // 水印类型
    waterMark: number = 3

    constructor(userId: any, token: string, tel: string, oid: number) {
        if (userId) {
            this.userId = parseInt(userId)
        }
        this.token = token
        this.tel = tel
        this.merchantId = oid
    }

    updateVipInfo(isVip: boolean, left: number, total: number): void {
        this.isVip = isVip
        this.leftNum = left
        this.totalNum = total
    }

    updateWaterMark(waterMark: number): void {
        this.waterMark = waterMark
    }
}
