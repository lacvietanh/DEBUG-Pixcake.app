import { Tool } from '@/view-model/photoControl/controlTools/contants/config'
import {
    OperateLiquefyMode,
    QtPhotoMode,
    QtToolKey,
    RECORD_INIT_UUID,
    RecordType
} from '@/view-model/photoControl/contants/operateEnum'
import { LiquefyListenerEvent, PtListenerEvent } from '@/view-model/photoControl/contants/listenerEvent'
import PainterBaseControl from '@/view-model/photoControl/PainterBaseControl'

import LiquefyTool from '@/view-model/photoControl/controlTools/impl/LiquefyTool'
import LiquefyToolControl from './controlTools/LiquefyToolControl'
import refine from '@/qt-ipc/business/refine'
import { SignalKeyboardEventName } from '@/qt-ipc/constants/common'

export default class LiquefyControl extends PainterBaseControl {

    toolControl: LiquefyToolControl = LiquefyToolControl.getInstance()
    _isDragging: boolean = false            // 独立拖拽状态
    _showResetDefaultMask: boolean = false  // 是否显示重置mask初始状态的按钮
    _hasChangedMask: boolean = false        // 是否存在变更后的mask

    qtPhotoMode = QtPhotoMode.Liquefy
    qtToolKey = QtToolKey.LiquefyPainter

    constructor(id: number) {
        super(id)
    }

    /**
     * 是否正在使用工具
     */
    get isUseTool(): boolean {
        return this.isDragging ? false : !!this.tool
    }

    get isDragging(): boolean {
        return this._isDragging
    }

    set isDragging(value: boolean) {
        this._isDragging = value
        this.emit(PtListenerEvent.DragStateChanged, this._isDragging)
    }

    set showResetDefaultMask(value: boolean) {
        this._showResetDefaultMask = value

        this.emit(PtListenerEvent.ShowResetDefaultMask, this._showResetDefaultMask)
    }

    // 监听初始化完成回调
    onInitCompleted(data: any): void {
        console.debug('[LiquefyControl] init: useProcessMode success !')

        if (typeof data.paintMaskIsEmpty === 'boolean') {
            const tool = this.toolControl.activeTool as LiquefyTool
            tool.setEdges(data.paintMaskIsEmpty ? 1 : 0)
            this.toolControl.emit('on-update')
        }

        super.onInitCompleted(data)
    }

    _createRecord(type: RecordType, uuid: string = ''): string {
        if (type === 'tool') {
            this.showResetDefaultMask = true
        }

        return super._createRecord(type, uuid)
    }

    /**
     * 切换工具
     * 需要切换鼠标显示状态
     * @param tool
     */
    changeTool(tool: Tool): this {
        const useTool = this.toolControl.changeTool(tool).activeTool
        const { size, density, pressure } = useTool?.getDataForAlgorithm()
        console.debug(`[LiquefyControl] changeTool: (size: ${ size }, density: ${ density }, pressure: ${ pressure })`)

        return super.changeTool(tool)
    }

    /**
     * 重置效果
     */
    resetLiquefy(): this {
        refine.handleLiquifyOperate(this.refineUUID, this.photoId, OperateLiquefyMode.Reset)
        return this
    }

    // 设置涂抹mask
    saveLiquefyMode(): void {
        this.closeProcessMode(OperateLiquefyMode.Save)
    }

    cancelLiquefyMode(): void {
        this.closeProcessMode(OperateLiquefyMode.Cancel)
    }

    /**
     * 修改历史记录
     * @param uuid
     */
    changeHistory(uuid: string): void {
        if (!uuid) return

        // 点击"开始涂抹"时，若存在已变更记录则显示重置状态
        if (uuid === RECORD_INIT_UUID) {
            this.showResetDefaultMask = this._hasChangedMask
        } else {
            const record = this.operationStack.activeOperation(uuid).activeRecord()
            if (!record) {
                return
            }
            this.showResetDefaultMask = record.type !== 'reset'
        }

        this.locatePainterStep(uuid).then(() => {
        })
    }

    addKeyDownEvent(eventName: SignalKeyboardEventName): void {
        super.addKeyDownEvent(eventName)

        if (SignalKeyboardEventName.MousePress === eventName) {
            this.$emit(LiquefyListenerEvent.MouseEvent, true)
        }

        if (eventName === SignalKeyboardEventName.MouseRelease) {
            this.$emit(LiquefyListenerEvent.MouseEvent, false)
        }
    }

    /**
     * 实例销毁
     */
    destroy(): void {
        // 移除所有监听事件
        this.removeAllListener(LiquefyListenerEvent.MouseEvent)
        this.removeAllListener(PtListenerEvent.DragStateChanged)
        this.removeAllListener(PtListenerEvent.InitSize)
        this.removeAllListener(PtListenerEvent.ShowResetDefaultMask)

        super.destroy()
    }
}
