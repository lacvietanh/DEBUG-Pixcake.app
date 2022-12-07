// 加密选项
export enum EncryptType {
    kEncryptType_None = 0,
    kEncryptType_100 = 1,
    kEncryptType_All = 2
}

// 全局render事件订阅话题
export enum IpcRendererTopic {
    LoadCloudPresetSuit = 'load-cloud-preset-suit',
    ApplyPresetToOther = 'apply-preset-to-other',
    FetchHardWareInfo = 'on-fetch-hardware-info',
    OnUpdateDataTransport = 'on-update-data-transport',
    OnCheckDataMigrateFinish = 'on-check-data-migrate-finish',
    OnSavePresetSettings = 'on-save-preset-settings'
}

export enum SignalKeyboardEventName {
    Undo = 'undo',
    Redo = 'redo',
    MousePress = 'mouse_press',
    MouseRelease = 'mouse_release',
}
