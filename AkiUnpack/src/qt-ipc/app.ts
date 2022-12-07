import NodeApi from '@/qt-ipc/node-api'
import { IApp } from '@/types/bridge'
let gOsVersion:string = ""
//@ts-ignore
const isWin32 = `${ process.platform }` === 'win32'
const WIN10_VERSION = "10.0.0"
function compareVersion(preVersion:string='', lastVersion:string=''):number  {
    let sources = preVersion.split('.');
    let dests = lastVersion.split('.');
    let maxL = Math.max(sources.length, dests.length);
    let result = 0;
    for (let i = 0; i < maxL; i++) {
        let preValue:any = sources.length>i ? sources[i]:0;
        let preNum:any = isNaN(Number(preValue)) ? preValue.charCodeAt(0) : Number(preValue);
        let lastValue:any = dests.length>i ? dests[i]:0;
        let lastNum:any =  isNaN(Number(lastValue)) ? lastValue.charCodeAt(0) : Number(lastValue);
        if (preNum < lastNum) {
            result = -1;
            break;
        } else if (preNum > lastNum) {
            result = 1;
            break;
        }
    }
    return result;
}
class App implements IApp {
    _workSpacePath:string | null= null
    async init(){
        await this.getOsVersion()
        this._workSpacePath = await this.getWorkSpacePath()
    }

    get workSpacePath(){
        return this._workSpacePath!
    }

    async getPath(moduleName: string) {
        return NodeApi.app.getPath(moduleName)
    }

    async getAppPath() {
        return NodeApi.app.getAppPath()
    }

    async getName() {
        return NodeApi.app.getName()
    }

    async getWorkSpacePath() {
        return NodeApi.app.getWorkSpacePath()
    }

    async getDiskSize(path: string) {
        return NodeApi.app.getDiskSize(path)
    }

    async getWindowSystemDisk() {
        return NodeApi.app.getWindowSystemDisk()
    }

    async getCpuInfo() {
        return NodeApi.app.getCpuInfo()
    }

    async getOsVersion(){
        const ver = await NodeApi.app.getOsVersion()
        gOsVersion = ver
        console.log("getOsVersion:",ver)
        return ver
    }

    getOsVersionSync():string{
        return gOsVersion!
    }

    get isLargeThanWin10Version():boolean{
        if (isWin32){
            let isLargeWin7:boolean = compareVersion(gOsVersion,WIN10_VERSION) == 1
            return isLargeWin7
        }
        return false
    }

    get isWin(){
        return isWin32
    }

    get isMac(){
        return !isWin32
    }
}

export class Window {
    getSize(): [number, number] {
        return [0, 0]
    }
}

export class Remote {
    getCurrentWindow() {
        return new Window()
    }
}

export class Dialog {
    showOpenDialog(window: any, options?: any): Promise<void> {
        return new Promise(resolve => {
            resolve()
        })
    }
}

export class IpcRenderer {
    removeAllListeners(eventId: string) {
        console.log('IpcRenderer removeAllListeners: ', eventId)
    }

    on(eventId: string, callback: Function) {
        console.log('IpcRenderer on: ', eventId, callback)
    }
}

export const app = new App()
export const remote = new Remote()
export const dialog = new Dialog()
export const ipcRenderer = new IpcRenderer()

export default {
    app,
    remote,
    dialog,
    ipcRenderer
}
