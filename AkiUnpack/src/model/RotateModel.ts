import { IRotateJson } from '@/qt-ipc/types/refine'
import { IRotateObject } from '@/types/refine'
import { limitToPrecision } from '@/utils/tsMath'

export default class RotateModel {
    _rotate: number = 0
    flipX: number = 1
    flipY: number = 1

    constructor(json?: IRotateJson) {
        if (json) {
            this.sync(json)
        }
    }

    get rotate(): number {
        return limitToPrecision(this._rotate, 2)
    }

    hasEffect(): boolean {
        return this._rotate !== 0 || this.flipX !== 1 || this.flipY !== 1
    }

    setRotate(rotate: number): this {
        this._rotate = rotate
        return this
    }

    setFlip(x: number, y: number): this {
        this.flipX = x || 1
        this.flipY = y || 1
        return this
    }

    sync(json: IRotateJson): this {
        console.log('sync: ', json)
        const { flip, rotate } = json
        return this.setRotate(rotate).setFlip(flip[0], flip[1])
    }

    toComponent(): IRotateObject {
        return {
            rotate: this.rotate,
            flipX: this.flipX,
            flipY: this.flipY
        }
    }
}
