import refine from '@/qt-ipc/business/refine'

import { PtListenerEvent } from '@/view-model/photoControl/contants/listenerEvent'
import { Tool } from '@/view-model/photoControl/controlTools/contants/config'
import {
    RECORD_INIT_UUID,
    OperateDefectMode,
    QtPhotoMode,
    QtToolKey,
    RecordType
} from '@/view-model/photoControl/contants/operateEnum'

import PainterBaseControl from '@/view-model/photoControl/PainterBaseControl'
import ControlTools from './controlTools/DefectToolControl'
import DefectTool from '@/view-model/photoControl/controlTools/impl/DefectTool'

export default class PainterControl extends PainterBaseControl {

    toolControl: ControlTools = ControlTools.getInstance()
    private _isDragging: boolean = false            // 独立拖拽状态
    private _showResetDefaultMask: boolean = false  // 是否显示重置mask初始状态的按钮
    private _hasChangedMask: boolean = false        // 是否存在变更后的mask

    qtPhotoMode = QtPhotoMode.Defect
    qtToolKey = QtToolKey.DefectPainter

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
        console.debug('[DefectControl] init: useProcessMode success !')

        if (typeof data.paintMaskIsEmpty === 'boolean') {
            this._hasChangedMask = !data.paintMaskIsEmpty
            this.showResetDefaultMask = this._hasChangedMask
        }

        super.onInitCompleted(data)
    }

    _createRecord(type: RecordType, uuid: string): string {
        if (type === RecordType.Tool) {
            this.showResetDefaultMask = true
        }

        return super._createRecord(type, uuid)
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
        this.isDragging = false
        const useTool = this.toolControl.changeTool(tool).activeTool as DefectTool
        if (!useTool) return this

        const { size, feather, opacity } = useTool?.getDataForAlgorithm()
        console.log(`[PainterControl] isEraser: ${ useTool?.isEraser }, size: ${ size }, feather: ${ feather }, opacity: ${ opacity }`)

        refine.switchTool(this.refineUUID, this.photoId, this.qtToolKey, {
            isEraser: useTool.isEraser,
            ...useTool.getDataForAlgorithm()
        }).then(() => {
        })

        return this
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

    // 设置涂抹mask
    setRemoveDefectivePaintMask(): void {
        if (!this.loaded) {
            return
        }
        refine.handleRemoveDefectivePaintMask(this.refineUUID, this.photoId, OperateDefectMode.Save)
        this.destroy()
    }

    cancelRemoveDefectivePaintMask(): void {
        if (!this.loaded) {
            return
        }
        refine.handleRemoveDefectivePaintMask(this.refineUUID, this.photoId, OperateDefectMode.Cancel)
        this.destroy()
    }

    resetPainterRecord(): void {
        if (!this.loaded) {
            return
        }
        refine.handleRemoveDefectivePaintMask(this.refineUUID, this.photoId, OperateDefectMode.Reset)
    }

    /**
     * 实例销毁
     */
    destroy(): void {
        super.destroy()

        // 移除所有监听事件
        this.removeAllListener(PtListenerEvent.DragStateChanged)
        this.removeAllListener(PtListenerEvent.InitSize)
        this.removeAllListener(PtListenerEvent.ShowResetDefaultMask)
    }
}
