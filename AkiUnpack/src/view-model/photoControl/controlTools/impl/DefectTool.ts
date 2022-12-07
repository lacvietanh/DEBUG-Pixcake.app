import BaseTool from './BaseTool'
import { IToolComponentData } from '../types/tool'
import { IDataForPainterAlgorithm } from '../types/tool'

// 默认值
const minSize = 10
const maxSize = 300
const size = 30
const feather = 50
const opacity = 100

export default class DefectTool extends BaseTool {
    _size: number = size
    private _opacity: number = opacity
    private _feather: number = feather
    isEraser: boolean = true

    insideElem: HTMLElement

    constructor(isEraser: boolean) {
        super()
        this.isEraser = isEraser
        this.insideElem = this.createInsideCycleElement()
        this.getElement()?.appendChild(this.insideElem)
    }

    set size(value: number) {
        if (value > maxSize) value = maxSize
        if (value < minSize) value = minSize
        this._size = value
        this.updateCursorSize(value)
    }

    get size(): number {
        return this._size
    }

    set feather(value: number) {
        this._feather = value
        this.updateInsideCycleElement()
    }

    reset(): void {
        this._size = size
        this._opacity = opacity
        this._feather = feather
    }

    createCursorElement(): HTMLElement {
        const left = this._centerOffset
        const size = this.size

        const elem = document.createElement('div')
        elem.style.pointerEvents = 'none'

        elem.style.position = 'absolute'
        elem.style.display = 'inline-block'
        elem.style.border = '0.5px solid #ededed'
        elem.style.width = size + 'px'
        elem.style.height = size + 'px'
        elem.style.transform = `translate(${left}px, ${left}px)`
        elem.style.borderRadius = size + 'px'
        elem.style.zIndex = '9999'
        elem.style.background = 'rgba(0, 0, 0, 0.3)'
        elem.style.position = 'fixed'

        return elem
    }

    /**
     * 创建内切圆节点
     */
    createInsideCycleElement(): HTMLElement {
        const { size, feather } = this.getDataForAlgorithm()
        const featherTemp = (1 - (feather / 100) * 0.5) * size

        const insideCycle = document.createElement('i')
        insideCycle.style.position = 'absolute'
        insideCycle.style.display = 'flex'
        insideCycle.style.justifyContent = 'center'
        insideCycle.style.alignItems = 'center'
        insideCycle.style.border = '0.5px solid #fff'
        insideCycle.style.left = '0'
        insideCycle.style.right = '0'
        insideCycle.style.top = '0'
        insideCycle.style.bottom = '0'
        insideCycle.style.margin = 'auto'

        insideCycle.style.width = featherTemp + 'px'
        insideCycle.style.height = featherTemp + 'px'
        insideCycle.style.borderRadius = featherTemp + 'px'

        insideCycle.style.fontSize = '24px'
        insideCycle.innerText = '-'
        insideCycle.style.fontStyle = 'normal'

        return insideCycle
    }

    updateCursorSize(value: number): void {
        super.updateCursorSize(value);
        this.updateInsideCycleElement()
    }

    updateInsideCycleElement(): void {
        const insideCycle = this.insideElem
        const { size, feather } = this.getDataForAlgorithm()
        const featherTemp = (1 - (feather / 100) * 0.5) * size

        insideCycle.style.width = featherTemp + 'px'
        insideCycle.style.height = featherTemp + 'px'
        insideCycle.style.borderRadius = featherTemp + 'px'

        if (size === featherTemp) {
            insideCycle.style.border = 'none'
        } else {
            insideCycle.style.border = '0.5px solid #fff'
        }

        if (featherTemp < 48) {
            insideCycle.style.fontSize = featherTemp / 2 + 'px'
        } else {
            insideCycle.style.fontSize = '24px'
        }
    }

    getComponentData(): IToolComponentData[] {
        return [
            {
                name: '大小',
                value: this._size,
                min: minSize,
                max: maxSize,
                type: 'size',
                setValue: (val) => {
                    console.log('setValue', val)
                    this.size = val
                }
            },
            {
                name: '羽化',
                type: 'feather',
                value: this._feather,
                setValue: (val) => {
                    this.feather = val
                }
            },
            {
                name: '不透明度',
                type: 'opacity',
                value: this._opacity,
                setValue: (val) => {
                    this._opacity = val
                }
            }
        ]
    }

    getDataForAlgorithm(): IDataForPainterAlgorithm {
        return {
            size: this._size,
            feather: this._feather,
            opacity: this._opacity
        }
    }
}
