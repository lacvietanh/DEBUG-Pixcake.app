import EventEmitter from '@/utils/event-emitter'
import { bindMany } from '@/view-model/photoControl/utils/commonUtil'
import { PtListenerEvent } from '@/view-model/photoControl/contants/listenerEvent'
import { Tool, ToolRecordName } from '@/view-model/photoControl/controlTools/contants/config'
import refine, { RefineListenerEvent } from '@/qt-ipc/business/refine'
import {
    initRecordNameMap,
    QtPhotoMode,
    QtToolKey,
    RECORD_INIT_UUID,
    RecordType
} from '@/view-model/photoControl/contants/operateEnum'
import { SignalKeyboardEventName } from '@/qt-ipc/constants/common'
import OperationStack from '@/view-model/photoControl/utils/OperationStack'
import BaseToolControl from '@/view-model/photoControl/controlTools/BaseToolControl'
import BaseTool from '@/view-model/photoControl/controlTools/impl/BaseTool'

export default abstract class PainterBaseControl extends EventEmitter {
    loaded = false // 是否初始化
    isDestroy: boolean = false // 是否销毁实例

    readonly thumbnailId: number = -1
    photoId: string = ''
    refineUUID: string = ''

    operationStack = new OperationStack()

    abstract toolControl: BaseToolControl<BaseTool>
    abstract qtToolKey: QtToolKey
    abstract qtPhotoMode: QtPhotoMode

    protected constructor(id: number) {
        super()
        this.thumbnailId = id
        bindMany(this, 'addKeyDownEvent', 'revRecordCallback')
    }

    get tool(): Tool {
        return this.toolControl.tool
    }

    private _emitHistoryChange() {
        this.emit(PtListenerEvent.HistoryUpdate, this.operationStack.getRecordStack().reverse())
    }

    // 监听历史记录毁掉
    revRecordCallback(data: any): void {
        if (data.id !== this.thumbnailId) {
            return
        }

        if (data.type === 'init') {
            this.onInitCompleted(data)
            return
        }

        this._createRecord(data.type, data.uuid)
    }

    // 监听初始化完成回调
    onInitCompleted(data: any): void {
        this.loaded = true

        // 初始化历史记录
        this._createRecord(RecordType.Init, data.uuid)
        this.listenerKeyboard() // 监听键盘事件

        // 激活工具
        this.toolControl.mounted()
        this.changeTool(this.toolControl.tool)
    }

    _createRecord(type = RecordType.Tool, uuid: string = ''): string {
        let res = ''

        switch (type) {
            case RecordType.Init:
                res = this.operationStack.createInitRecord(RECORD_INIT_UUID, initRecordNameMap[this.qtPhotoMode] || RECORD_INIT_UUID)
                this.operationStack.activeOperation(RECORD_INIT_UUID)
                break

            case RecordType.Reset:
                res = this.operationStack.createRecord(RecordType.Reset, uuid, ToolRecordName[RecordType.Reset])
                this.operationStack.save()
                break

            case RecordType.Tool:
                res = this.operationStack.createRecord(this.tool, uuid, ToolRecordName[this.tool])
                this.operationStack.save()
                break
        }

        this._emitHistoryChange()

        return res
    }

    init(): void {
        refine.addListener(RefineListenerEvent.ThumbnailPainterRecord, this.revRecordCallback)
        refine.useProcessMode(this.refineUUID, this.photoId, this.qtPhotoMode).then(() => {
        })
    }

    setRefineUUID(photoId: string, refineUUID: string): void {
        this.photoId = photoId
        this.refineUUID = refineUUID
    }


    /**
     * 切换工具
     * 需要切换鼠标显示状态
     * @param tool
     */
    changeTool(tool: Tool): this {
        if (!this.loaded) return this

        const useTool = this.toolControl.changeTool(tool).activeTool
        if (!useTool) return this

        refine.switchTool(this.refineUUID, this.photoId, this.qtToolKey, {
            ...useTool.getDataForAlgorithm()
        }).then(() => {
        })

        return this
    }

    /**
     * 重置效果
     */
    resetPicture(): this {
        // const uuid = this._createRecord('reset')
        // if (uuid) {
        //     this.webglCanvas.resetMaskTraceColorFrameBuffer(uuid);
        //     this.showResetDefaultMask = false
        // }
        return this
    }

    closeProcessMode(mode: number) {
        if (!this.loaded) return
        this.loaded = false

        refine.closeProcessMode(this.refineUUID, this.photoId, mode).then(() => {
        })
    }

    /**
     * 修改历史记录
     * @param uuid
     */
    async locatePainterStep(uuid: string): Promise<void> {
        if (!uuid) return

        const record = this.operationStack.activeOperation(uuid).activeRecord()
        if (!record) {
            return
        }

        if (uuid === RECORD_INIT_UUID) {
            await refine.locatePainterStep(this.refineUUID, this.photoId, '-1', this.qtPhotoMode)
        } else {
            await refine.locatePainterStep(this.refineUUID, this.photoId, record.uuid, this.qtPhotoMode)
        }

        this._emitHistoryChange()
    }

    /**
     * 键盘按下事件回调
     * @param eventName
     */
    addKeyDownEvent(eventName: SignalKeyboardEventName): void {
        if ([SignalKeyboardEventName.Undo, SignalKeyboardEventName.Redo].includes(eventName)) {
            // 初始记录不允许撤销
            const activeRecord = this.operationStack.activeRecord()
            if (activeRecord && activeRecord.uuid === RECORD_INIT_UUID
                && SignalKeyboardEventName.Undo === eventName) {
                return
            }

            const uuid = eventName === SignalKeyboardEventName.Undo
                ? this.operationStack.previous()
                : this.operationStack.next()

            if (!uuid) {
                return
            }

            switch (uuid) {
                case '-1':
                    this.resetPicture()
                    break
                case '-2':
                    this.emit(PtListenerEvent.HistoryExpired)
                    break
                default:
                    this.locatePainterStep(uuid).then(() => {
                    })
                    break
            }
        }
    }


    /**
     * 监听销毁键盘事件
     * @param isDestroy
     */
    listenerKeyboard(isDestroy: boolean = false): void {
        if (isDestroy) {
            refine.removeListener(RefineListenerEvent.signalMouseAndKeyboardEvent)
        } else {
            refine.addListener(RefineListenerEvent.signalMouseAndKeyboardEvent, this.addKeyDownEvent)
        }
    }

    /**
     * 实例销毁
     */
    destroy(): void {
        this.isDestroy = true

        this.operationStack.destroy()
        this.toolControl.unmounted()

        this.listenerKeyboard(true)

        // 移除所有监听事件
        this.removeAllListener(PtListenerEvent.HistoryExpired)
        this.removeAllListener(PtListenerEvent.HistoryUpdate)

        refine.removeListener(RefineListenerEvent.ThumbnailPainterRecord)
    }
}
