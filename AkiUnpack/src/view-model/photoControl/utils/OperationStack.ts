// @ts-ignore
import { v4 as uuidv4 } from 'uuid'
import { Optional } from '@/universal/types/foundation'

type IOperation = {
    uuid: string,
    type: string,
    name: string,
    disabled: boolean
}

export type IOperationActive = IOperation & {
    active: boolean
}

export class OperationStack {
    private _stack: IOperation[] = []
    private _limit: number = 10
    private _allowExpirePop: boolean = false // 是否允许失效记录撤销
    activeIndex: number = -1
    currRecord: Optional<IOperation> = null

    constructor() {
    }

    getRecordStack(): IOperationActive[] {
        return this._stack.map((item, index) => {
            return {
                ...item,
                active: this.activeIndex === index
            }
        })
    }

    /**
     * 限制记录
     * @private
     */
    private _limitRecord() {
        if (this._stack.length > this._limit) {
            // 是否存在初始记录
            const hasInitRecord = this._stack[0] && this._stack[0].type === 'init'
            this._stack.forEach((item, index) => {
                if (this._stack.length - index > this._limit) {
                    if (!hasInitRecord || (hasInitRecord && index !== 0)) {
                        item.disabled = true
                    }
                }
            })
        }
    }

    /**
     * 丢弃或许记录
     * @private
     */
    private _discarding() {
        if (this.activeIndex >= 0 && (this._stack.length - 1) !== this.activeIndex) {
            // 取出有效的记录，丢弃后续记录
            this._stack = this._stack.slice(0, this.activeIndex + 1)
        }
    }

    restore(): string | null {
        if (this._stack.length > 1) {
            if (!this._allowExpirePop) {
                const obj = this._stack[this._stack.length - 2]
                if (obj && obj.disabled) {
                    return '-2'
                }
            }

            this._stack.pop()
            const uuid = this._stack[this._stack.length - 1].uuid
            this.activeIndex = this._stack.length - 1
            return uuid
        }

        if (this._stack.length === 1) {
            this.clear()
            return '-1'
        }

        return null
    }

    private _activeIndex(index: number): string {
        if (!this._allowExpirePop) {
            const obj = this._stack[index]
            if (obj && obj.disabled) {
                return '-2'
            }
        }

        let uuid = this._stack[index].uuid
        this.activeIndex = index
        return uuid
    }

    previous(): string | null {
        if (this._stack.length > 1 && this.activeIndex > 0) {
            const preIndex = this.activeIndex - 1
            return this._activeIndex(preIndex)
        }

        return null
    }

    next(): string | null {
        if (this._stack.length > 1 && this.activeIndex >= 0) {
            const preIndex = this.activeIndex + 1
            return this._activeIndex(preIndex)
        }

        return null
    }

    createInitRecord(uuid: string, name: string = 'init'): string {
        const record: IOperation = {
            uuid,
            type: 'init',
            name,
            disabled: false
        }
        this.currRecord = record
        this.save(false)
        return record.uuid
    }

    createRecord(type: string, uid: string, name: string = ''): string {
        const uuid = uid || uuidv4()
        const record: IOperation = {
            uuid,
            type,
            name: name || type,
            disabled: false
        }

        this.currRecord = record
        return record.uuid
    }

    activeOperation(uuid: string): this {
        const findIndex = this._stack.findIndex(item => item.uuid === uuid)
        if (findIndex >= 0) {
            this.activeIndex = findIndex
        }
        return this
    }

    activeRecord(): IOperation | undefined {
        return this._stack[this.activeIndex]
    }

    save(needActive: boolean = true): void {
        if (!this.currRecord) return
        this._discarding()
        this._stack.push(this.currRecord)
        this._limitRecord()

        if (needActive) {
            this.activeIndex = this._stack.length - 1
        }
    }

    clear(): void {
        this._stack = []
        this.activeIndex = -1
        this.currRecord = null
    }

    destroy(): void {
        this.clear()
    }
}

export default OperationStack
