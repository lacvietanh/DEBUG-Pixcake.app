
export const RECORD_INIT_UUID = '0x0' // 初始记录状态UUID

// 液化操作指令
export enum OperateLiquefyMode {
    Save = 1,
    Reset = 2,
    Cancel = 3
}

export enum OperateDefectMode {
    Save = 1,
    Reset = 2,
    Cancel = 3
}

export enum QtPhotoOperate {
    ResetDefectMask = 1,
    ResetLiquefyMask = 2
}

export enum QtPhotoMode {
    OnlyPalette = 'onlyPalette', // 仅调色模式
    Defect = 'defect',           // 涂抹
    Crop = 'crop',               // 裁剪
    Liquefy = 'liquefy'          // 液化
}

// 裁剪操作指令
export enum OperateCropMode {
    Update = 1, // 更新参数
    Reset = 2 // 重置
}


export enum QtToolKey {
    LiquefyPainter ='liquify-painter',
    DefectPainter = 'defect-painter'
}

export enum RecordType {
    Init = 'init',
    Tool = 'tool',
    Reset = 'reset'
}

export const initRecordNameMap: {
    [key: string]: string
} = {
    liquefy: '开始液化',
    defect: '开始涂抹',
}
