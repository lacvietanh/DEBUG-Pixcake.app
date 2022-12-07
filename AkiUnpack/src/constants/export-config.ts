export const ExportMessage = {
    // 保存图片
    MESSAGE_SAVE_IMG: 1,
    // 生成face_seed
    MESSAGE_FACE_SEED: 2,
    // release engine
    MESSAGE_RELEASE_ENGINE: 8,
    // 加密文件
    MESSAGE_ENCRYPT_FILE: 10,
    // 保存JXL
    MESSAGE_LOAD_AND_RE_SAVE_IMAGE_WITH_FORMAT: 12
}

export const ExportCode = {
    SUCCESS: 1,
    // 子进程退出
    PROCESS_EXIT: 2,
    // 任务超时
    MESSAGE_TIME_OUT: 3,
    // 执行出错
    PROCESS_ERR: 4,
    // 其他错误
    OTHER_ERR: 5,
    // 自动重试
    AUTO_RETRY: 6,
    // api请求失败
    API_ERROR: 7,
    // 账户余额不足
    FUNDS_LACK: 8,
    // 执行过程, native出错了, 返回了error，具体查看nativeCode
    PROCESS_NATIVE_ERR: 9,
    // 执行过程，native异常退出了
    PROCESS_NATIVE_EXIT: 10,
    // seed生成 js层错误
    GENERATE_SEED_JS_ERROR: 11,
    // seed生成 md5 文件校验失败错误
    GENERATE_SEED_CHECK_SEED_ERROR: 12,
    // seed生成 返回为空的错误
    GENERATE_SEED_RETURN_NULL_ERROR: 13,
    // api error 返回的数据为空 或者 md5 校验失败
    API_ERROR_SERVER_RETURN_DATA_ERROR: 14,
    // api error 返回的数据md5校验失败
    API_ERROR_CHECK_MD5_ERROR: 15,
    // api error 服务器返回的请求数据异常失败
    API_ERROR_REQ_DATA_ERROR: 16,
    // api error 服务器算法错误
    API_ERROR_ALGO_ERROR: 17,
    // 拷贝性别文件错误
    COPY_PERSON_TYPE_ERROR: 18,
    // 联动超时响应
    MESSAGE_TIME_OUT_BY_RELATE: 19

}

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
