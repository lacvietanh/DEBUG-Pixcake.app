import NodeApi from '@/qt-ipc/node-api'
import { IDirent } from '@/types/bridge'

export class Stats {
    mbIsHidden: boolean = false
    mbIsFile: boolean = false
    mbIsDir: boolean = false
    mbIsSymbolicLink: boolean = false

    constructor(json: any) {
        this.mbIsHidden = json.mbIsHidden || false
        this.mbIsFile = json.mbIsFile || false
        this.mbIsDir = json.mbIsDir || false
        this.mbIsSymbolicLink = json.mbIsSymbolicLink || false
    }

    isFile(): boolean {
        return this.mbIsFile
    }

    isDirectory(): boolean {
        return this.mbIsDir
    }

    isSymbolicLink(): boolean {
        return this.mbIsSymbolicLink
    }

    isHidden(): boolean {
        return this.mbIsHidden
    }
}

export class Dirent implements IDirent {
    name: string = ''
    mbIsHidden: boolean = false
    mbIsFile: boolean = false
    mbIsDir: boolean = false
    mbIsSymbolicLink: boolean = false

    constructor(json: any) {
        this.name = json['name']
        this.mbIsHidden = json['mbIsHidden']
        this.mbIsFile = json['mbIsFile']
        this.mbIsDir = json['mbIsDir']
        this.mbIsSymbolicLink = json['mbIsSymbolicLink']
    }

    static fromJsonAry(jsonAry: any): Dirent[] {
        let ary: Dirent[] = new Array<Dirent>()
        for (let it of jsonAry) {
            let dirent = new Dirent(it)
            ary.push(dirent)
        }
        return ary
    }

    isDirectory(): boolean {
        return this.mbIsDir
    }

    isFile(): boolean {
        return this.mbIsFile
    }

    isHidden(): boolean {
        return this.mbIsHidden
    }

    isSymbolicLink(): boolean {
        return this.mbIsSymbolicLink
    }

}

class Fs {
    functionMap: Map<string, Function> = new Map()

    constructor() {
        console.log()

    }

    private _signalsDirectoryChange() {
        // @ts-ignore
        NodeApi.fs.signalDirectoryChange?.connect((path: string) => {
            console.log('NodeApi.fs.signalDirectoryChange', path)
            let func = this.functionMap.get('signalDirectoryChange')
            if (func) {
                func?.(path)
            }
        })
    }

    async mkdirSync(filePath: string) {
        // @ts-ignore
        return NodeApi.fs.mkdirSync(filePath)
    }

    async rmdirSync(filePath: string) {
        return NodeApi.fs.rmdirSync(filePath)
    }

    async unlinkSync(filePath: string) {
        return NodeApi.fs.unlinkSync(filePath)
    }

    async existsSync(filePath: string) {
        return NodeApi.fs.existsSync(filePath)
    }

    async readFileSync(filePath: string, bufferEncoding: string) {
        //@ts-ignore
        return NodeApi.fs.readFileSync(filePath, bufferEncoding)
    }

    async writeFileSync(filePath: string, data: any) {
        //@ts-ignore
        return NodeApi.fs.writeFileSync(filePath, data)
    }

    async copyFileSync(fromPath: string, toPath: string) {
        //@ts-ignore
        return NodeApi.fs.copyFileSync(fromPath, toPath)
    }

    async statSync(filePath: string): Promise<Stats> {
        //@ts-ignore
        let stat = await NodeApi.fs.statSync(filePath)
        let wrapStat: Stats = new Stats(stat)
        return wrapStat
    }

    async accessSync(filePath: string, mode: number) {
        //@ts-ignore
        return NodeApi.fs.accessSync(filePath, mode)
    }

    async readdirSync(filePath: string, options?: { withFileTypes: true }): Promise<IDirent[]> {
        const direntAry = await NodeApi.fs.readdirSync(filePath)
        const dirents = Dirent.fromJsonAry(direntAry)
        return dirents
    }

    watch(filePath: string, callback: (val: string) => void) {
        this._signalsDirectoryChange()
        this.functionMap.set("signalDirectoryChange", callback)
        NodeApi.fs.watch(filePath)
    }
}

let fs: Fs = new Fs()
export default fs
