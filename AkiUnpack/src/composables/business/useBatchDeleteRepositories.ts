import Vue, {
    ref,
    Ref,
    onMounted,
    onUnmounted,
    getCurrentInstance, reactive, CreateElement
} from 'vue'
import store from '@/store'

import { CLIENT_NAME } from '@/universal/types/config'
import { DeleteProgressStatus } from '@/constants'
import { gallery } from '@/qt-ipc/gallery'
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'
import useToastRepositories from '@/composables/useToastRepositories'
import { UnwrapNestedRefs } from 'vue/types/v3-generated'

interface IDeleteProgress {
    status: string,
    over: number,
    total: number
}

export interface IRepositories {
    showDeleteProgress: Ref<boolean>
    deleteProgress: UnwrapNestedRefs<IDeleteProgress>
    hasShowDeleteDialog: Ref<boolean>

    showDeleteDialog: (thumbnailCount: number, callbackUuid: string) => void
    selectItems: () => any[]
}

export default function useBatchDeleteRepositories(): IRepositories {
    const that = getCurrentInstance()?.proxy as Vue
    const h = that.$createElement as CreateElement


    const { PointBatchPalette } = useParamsPointsRepositories()
    const { tsConfirm } = useToastRepositories()

    const deleteProgress: UnwrapNestedRefs<IDeleteProgress> = reactive({
        status: DeleteProgressStatus.Start,
        over: 1,
        total: 1
    })
    const showDeleteProgress = ref(false)
    const hasShowDeleteDialog = ref(false)

    const showDeleteDialog = (thumbnailCount: number, callbackUuid: string) => {
        // @ts-ignore
        // this.PointDeleteThumbnail()
        if (hasShowDeleteDialog.value) return
        hasShowDeleteDialog.value = true

        //ThumbnailViewModel
        let title = thumbnailCount <= 1 ? `确认删除该图片` : ''
        //`确认删除${selectedItems.length}张图片`
        let customTitleEl = null
        if (!title) {
            let style = { style: 'font-size: 16px;font-weight: 500; margin: 12px 0 16px' }
            let numStyle = { style: 'font-size: 15px;font-weight: 500; margin: 12px 2px 16px 2px;color:#F5D228' }

            customTitleEl = h('div', style, [
                h('span', style, '确认删除'),
                h('span', numStyle, `${ thumbnailCount }`),
                h('span', style, '张图片')
            ])
        }
        tsConfirm({
            title,
            customTitleEl,
            message: `删除操作是将图片从${ CLIENT_NAME }中移除，但磁盘中的原始文件仍然还在。`,
            customMessageStyle: 'textAlign: left'
        }).then(() => {
            PointBatchPalette('delete')
            hasShowDeleteDialog.value = false
            showDeleteProgress.value = true
            gallery.handlerConfirmDeleteDialog(callbackUuid, true).then(() => {
            })
            store.commit('project/_SetLastProjectUpdateTime', new Date())
        }).catch(() => {
            hasShowDeleteDialog.value = false
            showDeleteProgress.value = false
            gallery.handlerConfirmDeleteDialog(callbackUuid, false).then(() => {
            })
            console.log('cancel')
        })
    }

    const selectItems = (): any[] => {
        let retItems = []
        let items = new Map()//TSImageIOManager.shareInstance().imageViewModelQueue
        for (const it of items) {
            let [key, val] = it
            if (val.isSelected) {
                retItems.push(val)
            }
        }
        //ThumbnailViewModel
        let compareFunc = (a: any, b: any): number => {
            let i0 = a.imgIndex
            let i1 = b.imgIndex
            if (i0 > i1) {
                return -1
            }
            if (i0 < i1) {
                return 1
            }
            return 0
        }
        retItems = retItems.sort(compareFunc)
        return retItems
    }

    onMounted(() => {
        gallery.addListener('signalOpenDeleteDialog', (thumbnailCount: number, callbackUuid: string) => {
            showDeleteDialog(thumbnailCount, callbackUuid)
        })
        gallery.addListener('signalRouteToPage', (routeName: string) => {
            that.$router.push({ path: routeName }).then(() => {
            })
        })
        gallery.addListener('signalDeletePercent', (percent: number) => {
            deleteProgress.status = `${ percent }`
        })
        gallery.addListener('signalUpdateCurrProject', async (param: any) => {
            const { path, id } = store.getters['project/activeProject']
            const { thumbnailPaths, thumbnailNumber } = param
            await store.dispatch('project/ACT_AsyncUpdateProject', {
                id,
                path: thumbnailNumber == 0 ? null : path,
                thumbnailPaths: thumbnailPaths,
                thumbnailNumber: thumbnailNumber
            })
        })
    })

    onUnmounted(() => {
        gallery.removeListener('signalOpenDeleteDialog')
        gallery.removeListener('signalRouteToPage')
        gallery.removeListener('signalDeletePercent')
        gallery.removeListener('signalUpdateCurrProject')
    })

    return {
        deleteProgress,
        showDeleteProgress,
        hasShowDeleteDialog,

        showDeleteDialog,
        selectItems
    }
}
