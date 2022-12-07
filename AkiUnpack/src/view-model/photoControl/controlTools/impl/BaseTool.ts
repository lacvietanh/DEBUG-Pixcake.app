import { IToolComponentData } from '../types/tool'
import EventEmitter from '@/utils/event-emitter'

export default abstract class BaseTool extends EventEmitter{
    // 工具样式
    private readonly cursor: HTMLElement | undefined
    private cursorMounted: boolean = false
    _size: number = 10

    protected constructor() {
        super()
        const cursor = this.createCursorElement()
        if (cursor) {
            this.cursor = this.createCursorElement()
        }
    }

    get size(): number {
        return this._size
    }

    /**
     * 中心偏移值
     */
    get _centerOffset(): number {
        return -this._size / 2
    }

    abstract createCursorElement(): HTMLElement | undefined

    abstract getComponentData(): IToolComponentData[]

    abstract getDataForAlgorithm(): any

    abstract reset(): void

    increaseSize(step: number): void {
        // @ts-ignore
        this._size = (this.size + step).toRound(1)
    }

    getElement(): HTMLElement | undefined {
        return this.cursor
    }


    updateCursorSize(_size: number): void {
        if (!this.cursor) {
            return
        }

        this._size = _size

        const size = _size + 'px'
        const left = this._centerOffset
        this.cursor.style.width = size
        this.cursor.style.height = size
        this.cursor.style.borderRadius = size
        this.cursor.style.transform = `translate(${ left }px, ${ left }px)`
    }

    updateCursorElement(x: number, y: number): void {
        if (!this.cursor) {
            return
        }
        const left = this._centerOffset
        this.cursor.style.transform = `translate(${ left }px, ${ left }px)`
        this.cursor.style.left = x + 'px'
        this.cursor.style.top = y + 'px'
    }

    appendChild(dom: HTMLElement): void {
        const ele = this.getElement()
        if (!ele) {
            return
        }
        if (!this.cursorMounted) {
            this.cursorMounted = true
            dom.appendChild(ele)
        }
    }

    removeChild(): void {
        const ele = this.getElement()
        if (!ele) {
            return
        }
        if (this.cursorMounted) {
            this.cursorMounted = false
            ele.parentElement?.removeChild(ele)
        }
    }
}