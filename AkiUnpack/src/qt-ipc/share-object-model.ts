import NodeApi from '@/qt-ipc/node-api'

export class RemoteConfigModel {
    static instance: any

    static async getInstance(): Promise<any> {
        if (!this.instance) {
            const sharedObject = NodeApi.sharedObject()
            this.instance = await sharedObject.cloudConfig()
        }
        return this.instance
    }
}
