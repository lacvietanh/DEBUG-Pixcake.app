import ipcRenderer from '@/qt-ipc/Ipc-renderer'

let gDialogRefCount = 0 // 0是无对话框，>0是有对话框
export enum QtEventFilterType {
    Mouse = 'mouse',
    KeyBoard = 'keyboard'
}

function trace(count: number) {
    console.log('QtEventFilter::process***----------------------------------------  ** ')
    try {
        throw new Error('err')
    } catch (e) {
        console.log(e.stack)
    }
}

export class QtEventFilter {
    static _instance: QtEventFilter

    static getInstance(): QtEventFilter {
        if (!this._instance) {
            this._instance = new QtEventFilter()
        }
        return this._instance
    }

    process(eventTypes: QtEventFilterType[], enable: boolean): void {
        gDialogRefCount += enable ? -1 : 1
        if (gDialogRefCount < 0) {
            gDialogRefCount = 0
        }
        const isEnable = gDialogRefCount <= 0
        for (const type of eventTypes) {
            ipcRenderer.send('qt_switch_changed', { 'event': type, 'enable': isEnable })
        }
    }

    static reset(): void {
        gDialogRefCount = 0
        ipcRenderer.send('qt_switch_changed', {
            'event': [QtEventFilterType.KeyBoard, QtEventFilterType.Mouse],
            'enable': true
        })
    }
}

export default QtEventFilter
