/**
 * 可支持监听器事件枚举
 */
export enum PtListenerEvent {
    HistoryUpdate = 'history__update',
    HistoryExpired = 'history__expired',
    DragStateChanged = 'drag-state-changed',
    InitSize = 'init-size',
    ShowResetDefaultMask = 'show-reset-default-mask',
    ClickSmearBack = 'click-smear-back'
}

export enum LiquefyListenerEvent {
    MouseEvent = 'mouse_event'
}
