import { IGallery } from '@/qt-ipc/types/IGallery'
import NodeApi from '@/qt-ipc/node-api'
import { params } from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents/params/body'

export class Gallery implements IGallery {
    signalClearGallery: { connect: (() => void) } | null = null
    signalSelectionChanged: { connect: (importantSelectItem: any, firstItem: any, presetSuit: any) => void; } | null = null
    signalSelects: { connect: (param: { isSelectedAll: boolean; hasSelectedFavorites: boolean; }) => void; } | null = null
    signalStarClick: { connect: ((thumbJson: any) => void) } | null = null
    signalEditedCount: { connect: (editCount: number, allPhotosCount: number) => void } | null = null
    signalRotate: {
        connect: ((isLeft: boolean) => void)
    } | null = null
    signalRouteToPage: { connect: (routeName: string) => void; } | null = null
    signalUpdateCurrProject: { connect: (param: any) => void; } | null = null
    signalDeletePercent: { connect: (percent: number) => void; } | null = null
    functionMap: Map<string, Function> = new Map()
    signalOpenDeleteDialog: {
        connect: ((thumbnailCount: number, uuid: string) => void)
    } | null = null
    signalThumbnailExtraInfo:{
        connect: ((extra: any) => void)
    }| null = null
    registerListener() {
        this.signalSelects = NodeApi.gallery.signalSelects
        this.signalSelectionChanged = NodeApi.gallery.signalSelectionChanged
        this.signalClearGallery = NodeApi.gallery.signalClearGallery
        this.signalStarClick = NodeApi.gallery.signalStarClick
        this.signalEditedCount = NodeApi.gallery.signalEditedCount
        this.signalRotate = NodeApi.gallery.signalRotate
        this.signalRouteToPage = NodeApi.gallery.signalRouteToPage
        this.signalUpdateCurrProject = NodeApi.gallery.signalUpdateCurrProject
        this.signalOpenDeleteDialog = NodeApi.gallery.signalOpenDeleteDialog
        this.signalDeletePercent = NodeApi.gallery.signalDeletePercent
        this.signalThumbnailExtraInfo = NodeApi.gallery.signalThumbnailExtraInfo
        //@ts-ignore
        this.signalSelects?.connect((param: any) => {
            let func = this.functionMap.get('signalSelects')
            if (func) {
                func!(param)
            }
        })
        //@ts-ignore
        this.signalSelectionChanged?.connect((importantSelectItem: any, firstItem: any, presetSuit: any) => {
            let func = this.functionMap.get('signalSelectionChanged')
            if (func) {
                func!(importantSelectItem, firstItem, presetSuit)
            }
        })
        //@ts-ignore
        this.signalClearGallery?.connect(() => {
            let func = this.functionMap.get('signalClearGallery')
            if (func) {
                func!()
            }
        })
        //@ts-ignore
        this.signalStarClick?.connect((param: any) => {
            let func = this.functionMap.get('signalStarClick')
            if (func) {
                func!(param)
            }
        })
        //@ts-ignore
        this.signalEditedCount?.connect((editCount: number, allPhotosCount:number) => {
            let func = this.functionMap.get('signalEditedCount')
            if (func) {
                func!(editCount,allPhotosCount)
            }
        })
        //@ts-ignore
        this.signalRotate?.connect((isLeft: boolean) => {
            let func = this.functionMap.get('signalRotate')
            if (func) {
                func!(isLeft)
            }
        })
        //@ts-ignore
        this.signalRouteToPage?.connect((routeName: string) => {
            let func = this.functionMap.get('signalRouteToPage')
            if (func) {
                func!(routeName)
            }
        })
        //@ts-ignore
        this.signalUpdateCurrProject?.connect((param: any) => {
            let func = this.functionMap.get('signalUpdateCurrProject')
            if (func) {
                func!(param)
            }
        })
        //@ts-ignore
        this.signalDeletePercent?.connect((percent: number) => {
            let func = this.functionMap.get('signalDeletePercent')
            if (func) {
                func!(percent)
            }
        })
        //@ts-ignore
        this.signalThumbnailExtraInfo?.connect((extra: any) => {
            let func = this.functionMap.get('signalThumbnailExtraInfo')
            if (func) {
                func!(extra)
            }
        })
        //@ts-ignore
        this.signalOpenDeleteDialog?.connect((thumbnailCount: number, uuid: string) => {
            let func = this.functionMap.get('signalOpenDeleteDialog')
            if (func) {
                func!(thumbnailCount, uuid)
            }
        })
    }

    handlerAfterSecondImport(galleryUUID: string) {
        return NodeApi.gallery.handlerAfterSecondImport(galleryUUID)
    }

    handlerConfirmDeleteDialog(callbackUuid: string, isConfirm: boolean): Promise<void> {
        return NodeApi.gallery.handlerConfirmDeleteDialog(callbackUuid, isConfirm)
    }

    addListener(name: string, callBack: Function) {
        this.functionMap.set(name, callBack)
    }

    removeListener(name: string) {
        this.functionMap.delete(name)
    }

    removeAllListener() {
        this.functionMap.clear()
    }

    thumbViewScrollToIndex(galleryUUID: string, index: number): Promise<void> {
        return NodeApi.gallery.thumbViewScrollToIndex(galleryUUID, index)
    }

    changeListStyle(galleryUUID: string, isGrid: boolean): Promise<void> {
        return NodeApi.gallery.changeListStyle(galleryUUID, isGrid)
    }

    // 显示图库的界面
    showGalleryFragment(params: any): Promise<void> {
        return NodeApi.gallery.showGalleryFragment(params)
    }

    // 隐藏图库的界面
    hideGalleryFragment(galleryUUID: string): Promise<void> {
        return NodeApi.gallery.hideGalleryFragment(galleryUUID)
    }

    showVisibleLoading(galleryUUID: string, isLoading: boolean): Promise<void> {
        return Promise.resolve(undefined)
    }

    refreshView(galleryUUID: string, needLoadPalletCfg: boolean, isForceUpdate: boolean): Promise<void> {
        return NodeApi.gallery.refreshView(galleryUUID, needLoadPalletCfg, isForceUpdate)
    }

    loadPresetEffectCfg(galleryUUID: string, presetItem: { presetSuitId: number; presetId: number }): Promise<boolean> {
        return NodeApi.gallery.loadPresetEffectCfg(galleryUUID, presetItem)
    }

    makeOptStatusChanged(galleryUUID: string): Promise<void> {
        return NodeApi.gallery.makeOptStatusChanged(galleryUUID)
    }

    onSelectFavorites(galleryUUID: string, select: boolean): Promise<void> {
        return NodeApi.gallery.onSelectFavorites(galleryUUID, select)
    }

    onSelectAll(galleryUUID: string, select: boolean): Promise<void> {
        return NodeApi.gallery.onSelectAll(galleryUUID, select)
    }

    onHandlerExportClick(galleryUUID: string): Promise<void> {
        return NodeApi.gallery.onHandlerExportClick(galleryUUID)
    }

    applyAllPreset(galleryUUID: string, params: { presetSuitId: any, presetId: any, palettePresetId: any }): Promise<boolean> {
        return NodeApi.gallery.applyAllPreset(galleryUUID, params)
    }
}

const gallery = new Gallery()
export { gallery }
