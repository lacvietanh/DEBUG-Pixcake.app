import NodeApi from '@/qt-ipc/node-api'
import store from '@/store'
import { CLIENT_NAME_EN } from '@/universal/types/config'
// @ts-ignore
import FileUtils from '@/utils/FileUtils'
// @ts-ignore
import path from 'path'

import { IImageIOManager, IExportSettingData } from '@/qt-ipc/types/IImageIOManager'
// @ts-ignore
import { find as findProjectById } from '@/universal/datastore/projectDao'
import DBIpcRender from '@/irender/DBIpcRender'

class ImageIOManager implements IImageIOManager {
    addAndBindModel(thumbnailViewModelJson: any, thumbnailModelJson: any): Promise<void> {
        return NodeApi.imageIOManager.addAndBindModel(thumbnailViewModelJson, thumbnailModelJson)
    }

    hasViewModel(strImagePath: string): Promise<boolean> {
        return NodeApi.imageIOManager.hasViewModel(strImagePath)
    }

    getViewModel(imagePath: string): Promise<any> {
        return NodeApi.imageIOManager.getViewModel(imagePath)
    }

    cancelAllProcess(): Promise<void> {
        return NodeApi.imageIOManager.cancelAllProcess()
    }

    getSelectThumbnailList(): Promise<any> {
        return NodeApi.imageIOManager.getSelectThumbnailList()
    }

    async getExportSettingData(): Promise<IExportSettingData> {

        let result = await NodeApi.imageIOManager.getExportSettingData()
        // @ts-ignore
        const { noEffectCount, number, isJpgNumber, isPngNumber, isRawNumber, isTiffNumber, rawNumberData, exportTimes, projectId, temporaryStoragePath, selectValidNumber } = result
        // @ts-ignore
        return {
            currentProject: {
                id: projectId,
                exportTimes: exportTimes
            },

            isNoePresetNumber: noEffectCount,
            totalNumber: number,
            isJpgNumber: isJpgNumber,
            isPngNumber: isPngNumber,
            isRawNumber: isRawNumber,
            isTiffNumber: isTiffNumber,
            rawNumberData: rawNumberData,
            needShowSelectPreset: result.needShowSelectPreset,

            exportSubDirPath: result.exportSubDirPath,
            exportDirPath: result.exportDirPath,
            temporaryStoragePath: temporaryStoragePath,
            selectValidNumber: selectValidNumber
        } as IExportSettingData
    }

    // @ts-ignore
    private async getExportTimes(dirPath: string, currentProject: any, exportTimes: number) {
        let prefixName = currentProject.name + `_${ CLIENT_NAME_EN }` //导出的命名，添加英文名
        let name = prefixName + ' (' + exportTimes + ')'
        let savePath = path.join(dirPath, name)
        let isFileExist = await FileUtils.isFileExist(savePath)
        if (isFileExist) {
            return this.getExportTimes(dirPath, currentProject, exportTimes + 1)
        } else {
            return exportTimes
        }
    }

}

export default new ImageIOManager()
