import BaseTool from './BaseTool'
import { ILiquefyDataForAlgorithm, IToolComponentData } from '../types/tool'

export default class LiquefyTool extends BaseTool {
    // _size: number = 750
    _size: number = 25
    _density: number = 30
    _pressure: number = 30
    _edges: number = 0

    constructor() {
        super()
    }

    createCursorElement(): HTMLElement | undefined {
        return undefined
    }

    setEdges(value: number): void{
        this._edges = value
    }

    getComponentData(): IToolComponentData[] {
        return [
            {
                name: '大小',
                value: this._size,
                // min: 1,
                // max: 15000,
                min: 10,
                max: 300,
                step: 0.1,
                type: 'size',
                setValue: (val) => {
                    console.log('[setValue] size: ', val)
                    this._size = val
                }
            },
            {
                name: '密度',
                value: this._density,
                min: 0,
                max: 100,
                type: 'density',
                setValue: (val) => {
                    console.log('[setValue] density: ', val)
                    this._density = val
                }
            },
            {
                name: '压力',
                value: this._pressure,
                min: 1,
                max: 100,
                type: 'pressure',
                setValue: (val) => {
                    console.log('[setValue] pressure: ', val)
                    this._pressure = val
                }
            },

            {
                name: '固定边缘',
                value: this._edges,
                min: 0,
                max: 1,
                type: 'edges',
                cType: 'switch',
                setValue: (val) => {
                    console.log('[setValue] pressure: ', val)
                    this._edges = val
                }
            }
        ]
    }

    getDataForAlgorithm(): ILiquefyDataForAlgorithm {
        return {
            size: this._size,
            density: this._density,
            pressure: this._pressure,
            edges: this._edges
        }
    }

    reset(): void {
    }

}
