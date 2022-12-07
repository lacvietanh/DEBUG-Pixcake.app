/**
 * 导入图片状态
 */
export enum ImportProgressStatus {
    Start = '10',
    RequestZero = '20', // 申请空间
    Importing = '30', // 正在导入数据
    ImportingToDB = '31', // 正在导数据到数据库中，此处进度显示和Importing相同
    ImportOver = '40', // 导入完成

    CancelImport = '-1', // 取消导入
    ImportEmpty = '-2', // 导入图片为空
    ImportRepet = '-4', //导入重复
    RequestZeroError = '-3' // 申请空间失败
}

export enum DeleteProgressStatus {
    Start = '10',
    Deleting = '30', // 正在删除数据
    DeleteOver = '40', // 导入完成

    RequestDelete = '20',// 请求删除原图id
    CancelDelete = '-1', // 取消导入
    RequestDeleteError = '-3' // 申请删除失败
}

export const MaxImportDir = 10 // 导入图片最大目录层级

/**
 * 订单类型
 */
export enum OrderType {
    Try = 1,
    Buy = 2,
    Business = 3
}

/**
 * 标准预览大小
 * value：0 表示自动
 */
export const previewAreaSizeList = [
    {
        name: '1024',
        value: 1024,
        size: 1024
    },
    {
        name: '2048',
        value: 2048,
        size: 2048
    }
]

// 平台类型
export enum Platforms {
    MACOS = 1,
    WINDOWS = 2,
    QTMACOS = 11,
    QTWINDOWS = 12
}

/**
 * 导出图片格式
 */
export enum exportPhotoFormat {
    origin = 1,
    jpeg = 2,
    tiff = 3
}

