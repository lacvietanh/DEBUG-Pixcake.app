export const Export_Process_Error = {

    SAVE_ORIGIN_IMAGE: 1,

    HANDLE_FA_SEED: 2,

    INSTANCE_MASK: 3,

    SKELETON_PATH: 4,

    DECRYP_PATH: 5,

    SAVE_EFFECT_IMAGE: 6,

    UNKNOWN_ERROR: 7,

    ORIGIN_IMAGE_NOT_EXIT: 8


}

// 云端api的异常code，导致是要映射成本地的code
export const Export_API_ERROR = {
    MASK_API: 11,

    SKELETON_API: 12,

    PAY_DECRYPT_API: 13,

    PAY_API: 14,

    DECRYP_API: 15,

    UNKNOWN_ERROR_API: 16,

    ALLOCATED_PAY_API: 69 // 不共用套餐不足
}

// 导出上报统计状态（本地统计）
export const EXPORT_STATICS_STATUS = {
    FAIL: -1,   // 已上报导出失败状态
    NORMAL: 0,  // 未上报
    SUCCESS: 1  // 已上报导出成功状态
}

// 导出任务状态 （来源服务端）
export const EXPORT_TASK_PROCESS_FROM_CLOUD = {
    CREATED: 1,     // 创建
    DOING: 2,       // 进行中
    PAUSE: 3,       // 暂停
    FINISHED: 4,    // 完成
    DELETED: 5,     // 删除
    ERROR: 6        // 错误
}


// 导出状态
export const EXPORT_STATUS = {
    WAIT: 0,            // 待下载 0
    DOWNLOADING: 1,     // 下载中 1
    DOWNLOAD_ERROR: 2,  // 下载失败 2
    SUCCESS: 3,         // 下载成功 3
    ALLOW_RETRY: 4      // 可重试状态 4
}
