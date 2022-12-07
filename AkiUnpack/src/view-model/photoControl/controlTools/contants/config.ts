/**
 * 工具列表
 */
export enum Tool {
    Eraser = 'eraser',   // 橡皮擦工具
    Brush = 'brush',     // 画笔工具
    Liquefy = 'liquefy'  // 液化工具
}

export const ToolRecordName: { [key: string]: string } = {
    'eraser': '橡笔擦涂抹',
    'brush': '画笔涂抹',
    'liquefy': '液化',
    'reset': '重置'
}
