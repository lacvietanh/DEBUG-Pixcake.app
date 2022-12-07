import { Tool } from './contants/config';

import DefectTool from '@/view-model/photoControl/controlTools/impl/DefectTool'
import BaseToolControl from '@/view-model/photoControl/controlTools/BaseToolControl'
import BaseTool from '@/view-model/photoControl/controlTools/impl/BaseTool'
import { bindMany } from '@/view-model/photoControl/utils/commonUtil'

/**
 * 控制工具类
 */
export default class ControlTools extends BaseToolControl<BaseTool> {
    static instance: ControlTools

    _tool = Tool.Eraser // 当前激活的工具

    constructor() {
        super()
        bindMany(this, '_addKeyDownEvent', 'emit')
    }

    static getInstance(): ControlTools {
        if (!this.instance) {
            this.instance = new ControlTools()
        }
        return this.instance
    }

    _addKeyDownEvent(event: KeyboardEvent): void {
        // switch (event.code) {
        //     case 'BracketLeft':
        //     case 'BracketRight':
        //         const eventCode = event.code
        //         let nStep = 10
        //         let isPlus = eventCode === 'BracketRight'
        //
        //         this.activeTool?.increaseSize(isPlus ? nStep : -nStep)
        //         this.emit('on-update')
        //         break
        // }
    }

    /**
     * 初始化所有工具
     */
    initTools(): Map<Tool, BaseTool> {
        const toolMap = new Map()
        toolMap.set(Tool.Eraser, new DefectTool(true))
        toolMap.set(Tool.Brush, new DefectTool(false))
        return toolMap
    }
}
