// @ts-ignore
import Project from '@/model/ProjectModel'
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'
import { DeleteProgressStatus } from '@/constants'
import deleteProgressDialog from '@/views/BatchRetouch/components/deleteProgressDialog.vue'
// @ts-ignore
import { batchDeleteProject } from '@/api/projectApi'
// @ts-ignore
import { deleteThumbnailIds } from '@/api/thumbnailApi'
// @ts-ignore
import { findImageIdsByProjectId } from '@/universal/datastore/thumbnailDao'
import useHomeItemPointsRepositories from '@/composables/points/useHomeItemPointsRepositories'

export const batchDeleteProjects = defineComponent({
    components: {
        'delete-progress-dialog': deleteProgressDialog
    },
    setup() {

        const { PointHomeItem } = useHomeItemPointsRepositories()
        return {
            PointHomeItem
        }
    },
    data() {
        return {
            deleteProgress: {
                status: DeleteProgressStatus.Start,
                over: 1,
                total: 1
            },
            showDeleteProgress: false,
            onShowDeleteDialog: false
        }
    },
    computed: {},
    watch: {
        showDeleteProgress(val) {
            if (val) {
                // @ts-ignore
                this.unregisterShortcut()
            } else {
                // @ts-ignore
                this.registerShortcut()
            }
        },
        onShowDeleteDialog(val) {
            if (val) {
                // @ts-ignore
                this.unregisterShortcut()
            } else {
                if (this.showDeleteProgress) {
                    // @ts-ignore
                    this.unregisterShortcut()
                } else {
                    // @ts-ignore
                    this.registerShortcut()
                }
            }
        }
    },
    methods: {
        ...mapActions('project', [
            'ACT_InsertProject',
            'ACT_UpdateProject',
            'ACT_DeleteProject'
        ]),
        async onDeleteProject(data: Project) {
            // @ts-ignore
            await this.ACT_DeleteProject(data.id)
            // 注意:调用tsFileImport.ts里面的删除缓存接口
            // @ts-ignore
            await this.deleteProjectCache(data)
            // @ts-ignore
            this.selectProjects.delete(data.id)
        },
        remove(data: any) {
            this.onShowDeleteDialog = true
            this.tsConfirm({
                title: '删除该项目',
                message: '删除之后该项目下的所有图片将会被删除，但磁盘中的原始文件仍然还在。',
                customMessageStyle: 'textAlign: left'
            }).then(async _ => {
                this.onShowDeleteDialog = false
                //@ts-ignore
                // this.$tsStat?.event('cake_workbench', {
                //     cake_operate: 'delete_project'
                // })
                this.PointHomeItem('delete_project')

                this.showDeleteProgress = true
                this.deleteProgress.status = DeleteProgressStatus.Start
                this.deleteProgress.status = DeleteProgressStatus.Deleting

                this.onDeleteProject(data).then(async () => {
                    await this.deleteRemoteProject(data)

                    // @ts-ignore 删除单个加载单个
                    this.loadNext(1)
                    this.deleteProgress.status = DeleteProgressStatus.DeleteOver
                    this.showDeleteProgress = false
                }).catch(e => {
                    console.error(e)
                    this.deleteProgress.status = DeleteProgressStatus.RequestDeleteError
                    this.showDeleteProgress = false
                })
            }).catch(_ => {
                this.onShowDeleteDialog = false
                console.log('cancel')
            })
        },
        cloneMap(data: Map<number, Project>) {
            let aNewMap = new Map<number, Project>()
            for (const item of data) {
                let [key, val] = item
                aNewMap.set(key, val)
            }
            return aNewMap
        },
        async deleteRemoteImageIds(val: Project) {
            let thumbIds = await findImageIdsByProjectId(val.id)
            let imageIds = JSON.stringify(thumbIds)
            if (imageIds && imageIds.length > 0) {
                await deleteThumbnailIds(val.id, imageIds)
            }
        },
        async onBatchDeleteProjects(items: Map<number, Project>): Promise<any> {
            let lastError = null
            try {
                this.deleteProgress.status = DeleteProgressStatus.Start
                this.deleteProgress.status = DeleteProgressStatus.Deleting
                const itemSize = items.size
                let promiseList:any = []
                const copiedItems = new Map()
                for (const item of items) {
                    let [key, val] = item
                    copiedItems.set(key, val)
                    // 批量删除远程的缩略图列表 ,后端已实现了根据工程id上传，此处不需要调删除图片了
                    // const p = this.deleteRemoteImageIds(val)
                    // promiseList.push(p)
                    await this.onDeleteProject(val)
                }
                // 删除远端工程图片id列表后，再删除远程工程id
                Promise.all(promiseList).then(() => {
                    this.deleteRemoteProjects(copiedItems)
                })
                this.deleteProgress.status = DeleteProgressStatus.DeleteOver
                // @ts-ignore
                let count = Math.min(this.lazyLoadObj.singlePageCount, itemSize)
                // @ts-ignore
                this.loadNext(count)
            } catch (e) {
                lastError = e
                this.deleteProgress.status = DeleteProgressStatus.RequestDeleteError
                this.showDeleteProgress = false
            }

            if (lastError) {
                return Promise.reject(lastError)
            }
        },

        async deleteRemoteProjects(items: Map<number, Project>) {
            let projectIds = []
            for (const item of items) {
                let [key, _] = item
                projectIds.push({
                    id: key
                })
            }
            await batchDeleteProject(projectIds)
        },

        async deleteRemoteProject(item: Project) {
            await batchDeleteProject([{ id: item.id }])
        },

        batchRemove(data: Map<number, Project>) {
            this.onShowDeleteDialog = true
            let newList = this.cloneMap(data)
            console.log(`批量删除`, newList)
            let count = newList.size
            //`确认删除${selectedItems.length}张图片`
            let h = this.$createElement
            let customTitleEl = null
            let style = { style: 'font-size: 16px;font-weight: 500; margin: 12px 0 16px' }
            let numStyle = { style: 'font-size: 15px;font-weight: 500; margin: 12px 2px 16px 2px;color:#F5D228' }

            customTitleEl = h('div', style, [
                h('span', style, '确认删除'),
                h('span', numStyle, `${ count }`),
                h('span', style, '个项目')
            ])
            this.tsConfirm({
                title: null,
                customTitleEl: customTitleEl,
                message: `删除之后项目下的所有图片将会被删除，但磁盘中的原始文件仍然还在。`,
                customMessageStyle: 'textAlign: left'
            }).then(_ => {
                //@ts-ignore
                this.PointHomeItem('delete_project')
                this.showDeleteProgress = true
                this.onShowDeleteDialog = false
                this.onBatchDeleteProjects(data)
                    .then(() => {
                        //@ts-ignore
                        this.selectProjects.clear()
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }).catch(_ => {
                this.showDeleteProgress = false
                this.onShowDeleteDialog = false
                console.log('cancel')
            })
        }
    }
})
