import { Tool } from './contants/config'
import BaseTool from './impl/BaseTool'

import { IPoint, IToolComponentData } from './types/tool'
import { Optional } from '@/types'
import EventEmitter from '@/utils/event-emitter'

export default abstract class BaseToolControl<T extends BaseTool> extends EventEmitter{
    // static instance: BaseControl<any>
    tools: Map<Tool, T> = new Map()
    _cacheMousePosition: IPoint = { x: 0, y: 0 }
    _tool: Tool = Tool.Eraser // 当前激活的工具

    protected constructor() {
        super()
        this.tools = this.initTools()
    }

    get tool(): Tool {
        return this._tool
    }

    get activeTool(): Optional<T> {
        return this.getSpecialTool(this.tool)
    }

    /**
     * 初始化所有工具
     */
    abstract initTools(): Map<Tool, T>
    abstract _addKeyDownEvent(event: KeyboardEvent): void

    mounted(): void {
        window.addEventListener('keydown', this._addKeyDownEvent)
    }

    unmounted(): void {
        window.removeEventListener('keydown', this._addKeyDownEvent)
    }

    changeTool(tool: Tool): this {
        if (this.tool !== tool) {
            this.removeCursor() // 切换工具时 移除旧节点
            this._tool = tool
        }
        return this
    }

    /**
     * 获取工具
     * @param tool
     */
    getSpecialTool(tool: Tool): Optional<T> {
        if (this.tools.has(tool)) {
            return this.tools.get(tool) as T
        }
        return null
    }

    /**
     * 添加鼠标节点
     * @param dom
     * @param updateMousePoint
     */
    addCursor(dom: HTMLElement, updateMousePoint = false): void {
        this.activeTool?.appendChild(dom)
        if (updateMousePoint) {
            const { x, y } = this._cacheMousePosition
            this.activeTool?.updateCursorElement(x, y)
        }
    }

    /**
     * 移除鼠标节点
     */
    removeCursor(): void {
        this.activeTool?.removeChild()
    }

    /**
     * 更新鼠标位置，并缓存最后的坐标
     * @param x
     * @param y
     */
    updateCursorPosition(x: number, y: number): void {
        this._cacheMousePosition.x = x
        this._cacheMousePosition.y = y
        this.activeTool?.updateCursorElement(x, y)
    }

    /**
     * 创建工具操作界面数据
     */
    createToolsOperationData(): { [key: string]: IToolComponentData[] } {
        const data: { [key: string]: IToolComponentData[] } = {}
        this.tools.forEach((value, key) => {
            data[key] = value.getComponentData()
        })
        return data
    }
}
