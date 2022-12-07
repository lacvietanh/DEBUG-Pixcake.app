import NodeApi from '@/qt-ipc/node-api'
import { IPixcookEngine } from '@/qt-ipc/types/IPixcookeEngine'

class Pixcookengine implements IPixcookEngine {
    getImageInfos(strFilePaths: Array<string>): Promise<Array<any>> {
        return NodeApi.pixcookengine.getImageInfos(strFilePaths)
    }

    loadThumbAndSave(strSourcePath: string, strDstPath: string, imageFormat: number, level: number, encryptType: number, maxSize: number): Promise<boolean> {
        return NodeApi.pixcookengine.loadThumbAndSave(strSourcePath, strDstPath, imageFormat, level, encryptType, maxSize)
    }

    loadImageWithEncode(filePath: string): Promise<any> {
        return NodeApi.pixcookengine.loadImageWithEncode(filePath)
    }

    loadImageWithScale(filePath: string, scaleWidth: number, scaleHeight: number): Promise<any> {
        return NodeApi.pixcookengine.loadImageWithScale(filePath, scaleWidth, scaleHeight)
    }

    getEnableOpenGLType(): Promise<number> {
        return NodeApi.pixcookengine.getEnableOpenGLType()
    }

    getOpenGlAttribute(): Promise<any> {
        return NodeApi.pixcookengine.getOpenGlAttribute()
    }

    getDefaultOpenGlAttribute(): Promise<any> {
        return NodeApi.pixcookengine.getDefaultOpenGlAttribute()
    }
}

export default new Pixcookengine()
