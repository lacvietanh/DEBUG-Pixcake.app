/*
    TODO://待接入node层的实现
 */
export class WorkspaceUtil {
    static instance: WorkspaceUtil | null = null

    static getInstance(): WorkspaceUtil {
        if (!this.instance) {
            this.instance = new WorkspaceUtil()
        }
        return this.instance!
    }

    async getWorkspacePath(): Promise<string> {
        return ''
    }
}
