import { IParsedPath, IPlatformPath } from '@/types/bridge'
import NodeApi from '@/qt-ipc/node-api'
import { Optional } from '@/types'

export class Path implements IPlatformPath {
    readonly sep: string | null = null

    constructor() {
        this.sep = `${ (process as any).platform }` === 'win32' ? '\\' : '/'
    }

    basename(filePathName: string): Promise<string> {
        return NodeApi.path.basename(filePathName)
    }

    extname(strPath: string): Promise<string> {
        return NodeApi.path.extname(strPath)
    }

    join(strPath: string, nextStrPath: string): Promise<string> {
        return NodeApi.path.join(strPath, nextStrPath)
    }

    // @ts-ignore
    async dirname(strPath: string): Promise<Optional<string>> {
        if (!strPath) {
            return null
        }
        let retPath = strPath
        if (retPath.endsWith(this.sep!)) {
            retPath = retPath.slice(retPath.length - 1, 1)
        }
        const index = retPath.lastIndexOf(this.sep!)
        return strPath.substr(0, index)
    }

    async parse(strPath: string): Promise<IParsedPath> {
        let parsedPath = await NodeApi.path.parseToJson(strPath)
        return parsedPath
    }

    resolve(strPath?: string): Promise<string> {
        return NodeApi.path.resolve(strPath)
    }

    async joinResourcesPath(rpath: string): Promise<string> {
        //@ts-ignore
        return NodeApi.path.joinResourcesPath(rpath)
    }
}

let path = new Path()
export default path
