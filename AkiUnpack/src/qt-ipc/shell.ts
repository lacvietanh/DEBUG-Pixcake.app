import { IShell } from '@/types/bridge'
import NodeApi from '@/qt-ipc/node-api'

class Shell implements IShell {
    showItemInFolder(filePath: string): Promise<void> {
        return NodeApi.shell.showItemInFolder(filePath)
    }

    openPath(filePath: string): Promise<void> {
        return NodeApi.shell.openPath(filePath)
    }
}

export default new Shell()
