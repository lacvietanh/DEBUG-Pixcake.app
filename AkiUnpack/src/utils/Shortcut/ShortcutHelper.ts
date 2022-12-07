import ipcRenderer from '@/qt-ipc/Ipc-renderer'

/**
 * 快捷键辅助
 */

export default class ShortcutHelper {
    private static _instance: ShortcutHelper
    private _isListenShortcut: boolean = false
    private _invokedListener: Function | null = null

    constructor() {
    }

    static getInstance(): ShortcutHelper {
        if (this._instance) {
            return this._instance
        }

        this._instance = new ShortcutHelper()
        return this._instance
    }

    onKeyboardShortcutInvoked(listener: Function): void {
        this._invokedListener = listener
        ipcRenderer?.on('onKeyboardShortcutInvoked', (event: any, args: any) => {
            listener(event, args)
        })
        this._isListenShortcut = true
        this.registerShortcut()
    }

    removeKeyboardShortcutInvoked(): void {
        this.unRegisterShortcut()
        ipcRenderer?.removeAllListeners('onKeyboardShortcutInvoked')
        this._invokedListener = null
        this._isListenShortcut = false
    }

    // invokedFocus(): void {
    //     console.log('invokedFocus: ', this._invokedListener)
    //     if (this._invokedListener) {
    //         this.onKeyboardShortcutInvoked(this._invokedListener)
    //     }
    // }
    //
    // invokedBlur(): void {
    //     console.log('invokedBlur: ', this._invokedListener)
    //     if (this._invokedListener) {
    //         ipcRenderer?.removeAllListeners('onKeyboardShortcutInvoked')
    //     }
    // }

    registerShortcut(): void {
        if (this._isListenShortcut) {
            ipcRenderer?.send('registerKeyboardShortcut')
        }
    }

    unRegisterShortcut(): void {
        if (this._isListenShortcut) {
            ipcRenderer?.send('unRegisterKeyboardShortcut')
        }
    }

    addClientFocusListener(): void {
        window.removeEventListener('focus', this.registerShortcut)
        window.addEventListener('focus', this.registerShortcut)

        window.removeEventListener('blur', this.unRegisterShortcut)
        window.addEventListener('blur', this.unRegisterShortcut)
    }
}
