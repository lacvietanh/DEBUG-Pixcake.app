// @ts-ignore
import ipcRenderer from "@/qt-ipc/Ipc-renderer";

class Clipboard {
    writeText(val: string): void {
        //写文案到粘贴板
        ipcRenderer.send('clipboard-writeText', {
            clipboardText: val
        })
    }

    async readText(key: string): Promise<string> {
        let result = await ipcRenderer.send('clipboard-readText', {})
        return result.clipboardText;
    }
}

const clipboard = new Clipboard()
export default clipboard
