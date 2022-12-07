<template>
    <div v-if="!isLeave" class="home-item global__scroll-style"
         @drop.prevent.stop="onDropHanlderWrap($event)"
         @dragover.prevent.stop
         @dragenter.prevent.stop="onDropOverHanlderWrap()"
         @click="selectedAll(false)"
    >
        <div class="project-container guideClass1" ref="projectContainerRef">
            <ts-virtual-collection-view
                ref="virtualCollectionRef"
                :content-edge-set="edgSet"
                :width="collectionViewSize.width"
                :height="collectionViewSize.height"
                :items="projectList"
                :item-size="itemSize"
                :columns="column"
                :line-space="lineSpace"
                @scrolled-to-bottom-range="onScrolledToBottomRange"
            >
                <template v-slot:header>
                    <h3 class="title c-text-primary" id="aaaaaaa" :style="{
                marginTop:`${titleEdgSet.top}px`,
                marginLeft:`${titleEdgSet.left}px`,
                marginRight:`${titleEdgSet.right}px`,
                marginBottom:`${titleEdgSet.bottom}px`
            }">全部项目</h3>
                </template>
                <template slot-scope="{data}">
                    <template v-if="data.item.type === 0">
                        <el-card
                            :key="data.index"
                            shadow="hover"
                            class="box-card"
                            :title="data.item.name"
                            :body-style="{ padding: '0px' }">
                            <div class="add-project c-text-primary" @click.stop="onAddProjectClick()">
                                <i class="el-icon-plus add-btn"></i>
                                <p class="add-name">{{ data.item.name }}</p>
                            </div>
                        </el-card>
                    </template>

                    <template v-else>
                        <el-card
                            ref="projectCardRef"
                            @mousedown.native="handleStopMove"
                            :key="data.index"
                            :id="data.item.id"
                            shadow="hover"
                            :class="{ 'box-card':true, 'box-card-hover':data.index == dragToWhichItem ,'box-card-selected':isSelected(data.item)}"
                            :title="data.item.name"
                            :body-style="{ padding: '0px' }"
                            @click.native.exact.stop="onLeftMouseClick(data.item,data.index)"
                            @dblclick.native.exact.stop="projectClickHandler(data.index, data.item, 'dblclick')"
                            @click.native.right.exact="handleNodeContextmenu(data.index,data.item)"
                            @drop.native.prevent.stop="onDropHanlder(getTransFormedDropPaths(),data.index,data.item)"
                            @dragover.native.prevent.stop="onDropOverHanlder(data.index)"
                            @dragenter.native.prevent.stop="onDropOverHanlder(data.index)"
                            @dragleave.native.prevent.stop="onDropLeaveHanlder(data.index)"

                            @click.native.meta.stop="onCommandLeftMouseClick(true,data.item,data.index)"
                            @click.native.ctrl.stop="onCommandLeftMouseClick(false,data.item,data.index)"
                            @click.native.shift.stop="onLeftMouseShiftClick(data.item,data.index)"
                        >

                            <template v-if="data.item.projectIcon && data.item.projectIcon.length >0">
                                <div class="custom-image">
                                    <template v-if="data.item.projectIcon.length === 1">
                                        <render-icon
                                            :icon-param="{projectIcon:data.item.projectIcon,index:0}"></render-icon>
                                    </template>

                                    <template v-else-if="data.item.projectIcon.length === 2">
                                        <div class="two-box">
                                            <render-icon
                                                :icon-param="{projectIcon:data.item.projectIcon,index:0}"></render-icon>
                                            <render-icon
                                                :icon-param="{projectIcon:data.item.projectIcon,index:1}"></render-icon>
                                        </div>
                                    </template>

                                    <template v-else>
                                        <div class="three-box">
                                            <div class="top">
                                                <render-icon
                                                    :icon-param="{projectIcon:data.item.projectIcon,index:0}"></render-icon>
                                            </div>
                                            <div class="bottom">
                                                <render-icon :icon-param="{projectIcon:data.item.projectIcon,index:1}"
                                                             is-left="true"></render-icon>

                                                <div class="bottom-right">
                                                    <p v-if="data.item.thumbnailCounts > 3" class="count-box">
                                                        共{{ data.item.thumbnailCounts || 0 }}张
                                                    </p>
                                                    <render-icon
                                                        :icon-param="{projectIcon:data.item.projectIcon,index:2}"></render-icon>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </template>

                            <template v-else>
                                <div class="project-icon">
                                    <img class="default-icon"
                                         :src="require('@/assets/icons/workbench_pic_file_empty@3x.png')">
                                </div>
                            </template>


                            <div class="project-info">
                                <div
                                    ref="itemName"
                                    class="project-name"
                                >
                                    {{ (data.item.name || '') | filterFormatName }}
                                </div>
                                <div class="project-time c-text-label">
                                    更新时间：{{
                                        data.item.update_time | moment('timezone', 'Asia/Shanghai', 'MM月DD日 HH:mm')
                                    }}
                                </div>
                            </div>
                        </el-card>
                    </template>
                </template>
            </ts-virtual-collection-view>
        </div>

        <opt-project-dialog @mousedown.native.stop @onAddedProject="onAddedProjectCallback"
                            v-model="showResetProjectName"/>
        <importProgressDialog
            :importFilePaths="importFilePaths"
            @mousedown.native.stop
            :status="importProgress.status"
            :data="importProgress"
            :importName="myImportName"
            v-model="showImportProgress"
            @onCancelled="handleCancelImport"
        >
        </importProgressDialog>
        <renameProjectDialog
            @mousedown.native.stop
            :value="showRenameDialog"
            @onClose="showRenameDialog = false"
            :text="inputRenameText"
            @onConfirm="onRenameConfirm"
        >
        </renameProjectDialog>
        <delete-progress-dialog
            @mousedown.native.stop
            :isDeleteProject="true"
            :status="deleteProgress.status"
            :data="deleteProgress"
            v-model="showDeleteProgress">
        </delete-progress-dialog>
    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { find } from '@/universal/datastore/dictionaryDao'


import toast from '@/mixins/toast'
import tsFileImport from '@/mixins/tsFileImport'

import Project from '../../model/ProjectModel.ts'

import {THUMBNAIL_TABLE, SHOWED_NOVICE_GUIDE, PROJECT_TABLE, CLIENT_NAME} from '@/universal/types/config'
import { BatchActiveMode } from '@/constants/batchRetouchDef.ts'
import { ImportProgressStatus } from '@/constants'

import { formatString } from '@/utils/utils'

import DBIpcRender from '@/irender/DBIpcRender'

import { Card } from 'element-ui'
import ImportProgressDialog from '@/views/BatchRetouch/components/ImportProgressDialog'
import optProjectDialog from '@/views/Home/components/optProjectDialog'
import FileUtils from '@/utils/FileUtils'
import renameProjectDialog from '@/views/Home/components/renameProjectDialog'
import { batchDeleteProjects } from '@/mixins/projects/batchDeleteProject'
import { batchSelectsProject } from '@/mixins/projects/batchSelectsProject'
import TsVirtualCollectionView from '@/components/CollectionView/tsVirtualCollectionView'
import resizeMixin from '@/mixins/reactive/resizeMixin'
import store from '@/store'
import { loadingStatus } from '@/components/CollectionView/loadingMore/constant'
import { countSince } from '#/datastore/projectDao'
import { debounce } from 'lodash'
import tsFilePathUtils from '@/utils/tsFilePathUtils'
import noviceGuideMixin from '@/mixins/noviceGuideMixin'
import NodeApi from '@/qt-ipc/node-api'
import fs from '@/qt-ipc/fs'
import path from '@/qt-ipc/path'
import { ShareObjectModel } from '#/model/ShareObjectModel/ShareObjectModel'
import Menu from '@/qt-ipc/utils/menu'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import useHomeItemPointsRepositories from '@/composables/points/useHomeItemPointsRepositories'

let fileProtocol = process.env.VUE_APP_ENV == 'dev' ? 'tsFile' : 'file'
let workSpacePath = null
let fileExistMap = new Map()

export default defineComponent({
    mixins: [toast,
        tsFileImport,
        batchSelectsProject, batchDeleteProjects, resizeMixin, noviceGuideMixin],
    components: {
        TsVirtualCollectionView,
        'el-card': Card,
        optProjectDialog,
        ImportProgressDialog,
        renameProjectDialog,
        'render-icon': {
            props: {
                isLeft: false,
                iconParam: {
                    type: Object,
                    default: function () {
                        return {
                            projectIcon: null,
                            index: null
                        }
                    }
                }
            },
            data() {
                return {
                    iconPath: null,
                    iconExist: null
                }
            },
            watch: {
                'iconParam': {
                    handler: function (val) {
                        this.getFullPath().then(filePath => {
                        })
                    },
                    immediate: false
                }
            },
            methods: {
                async getFullPath() {
                    const { projectIcon, index } = this.iconParam
                    if (!projectIcon) {
                        return null
                    }
                    let curPath = projectIcon[index]
                    if (!curPath) {
                        return null
                    }
                    let isWin32 = `${process.platform}` === 'win32'
                    // 是绝对路径的提前返回
                    if (isWin32) {
                        // win32的以:/开头是绝对路径
                        let prefix = ':' + path.sep
                        if (curPath.indexOf(prefix) > 0) {
                            return curPath
                        }
                    } else {
                        if (curPath.startsWith('/')) {
                            return curPath
                        }
                    }

                    if (!workSpacePath){
                        workSpacePath = await tsFilePathUtils.getAppRootPath();
                        if (!workSpacePath.endsWith('/')){
                            workSpacePath = workSpacePath +"/"
                        }
                    }
                    const strAbsoluteIconPath = workSpacePath +curPath
                    let isExist = fileExistMap.get(strAbsoluteIconPath)

                    if (isExist === undefined || isExist === null){
                        isExist = await FileUtils.isFileExist(strAbsoluteIconPath)
                        fileExistMap.set(strAbsoluteIconPath,isExist)
                    }
                    this.iconExist = isExist
                    if (this.iconExist) {
                        let fileUrl = `${fileProtocol}://${FileUtils.encodeURIComponent(strAbsoluteIconPath)}`
                        this.iconPath = fileUrl
                    }
                    return this.iconPath
                }
            },
            render: function (h) {
                if (!this.iconPath) {
                    return <div></div>
                }
                if (this.iconExist) {
                    return <img src={this.iconPath} class={this.isLeft ? 'img bottom-left' : 'img'}/>
                }
                return <div class={this.isLeft ? 'claFmt bottom-left' : 'claFmt'}>
                    <span class="claText" style="color: #4D4D4D;font-size: 10px">此文件无法预览</span>
                </div>
            },
            async mounted() {
                await this.getFullPath()
            }
        }
    },
    setup() {
        const { PointClickProject, PointHomeItem } = useHomeItemPointsRepositories()

        return {
            PointClickProject,
            PointHomeItem
        }
    },
    data() {
        return {
			CLIENT_NAME,
            isLeave:false,
            inputRenameText: null,
            clickTimer: null,
            exportTimer: null,
            showResetProjectName: false,
            loadingEl: null,
            fileNameChangeFlagIndex: null,
            chooseItem: false,
            showImportProgress: false,
            showRenameDialog: false,
            importProgress: {},
            dragToWhichItem: null, //Which one to drag to
            collectionViewSize: { width: 0, height: 0 },
            itemSize: { width: 234, height: 238 },
            column: 1,
            // 批量获取的最后一条记录的时间
            lazyLoadObj: {
                ratio: 3, // 倍率，按需加载的倍数,上下拖动滚动时
                pageCount: 0,// 需做响应式计算,加载数量
                singlePageCount: 0 //单页数量
            },
            edgSet: { top: 40, bottom: 40, right: 92, left: 100 },
            titleEdgSet: { top: 40, bottom: 16, right: 92, left: 100 },
            lineSpace: {
                vertical: 40,
                horizontal: 20
            },
            importFilePaths: []
        }
    },
    filters: {
        filterFormatName: formatString
    },
    async mounted() {
        //获取内存不足
        let result = await ipcRenderer.send('check_less_memory', {})
        console.log('check less memory result is: ',result)
        if(result['isShow']){
          this.tsConfirm({
            title: null,
            customTitleEl: `检测到${CLIENT_NAME}因您的电脑内存不足导致异常退出，建议您先退出其他软件释放内存或者重启电脑，以便您能够正常使用${CLIENT_NAME}`,
            customMessageStyle: 'textAlign: left',
            showCancelButton: false,
            confirmButtonText: '确定'
          }).catch(err =>{console.log(err)})
        }

        // 预设展开逻辑
        this.$store.commit('removeALlPresetDefaultExpendKey') //清空默认展开预设
        this.$store.commit('setIsExpandFirstPhoto', true)
        this.resetCollectionViewDisplayItems()
        this.$store.dispatch('project/ACT_GetBatchProjects', {
            rowUpdateTime: null,
            pageCount: this.lazyLoadObj.pageCount
        }).then(() => { // 改为只在进入的第一次来排序
            this._SortProjectsWithUpdateTime()
        })

        this.installShortcuts()
        // 预下载预设
        let userId = this.$store.state.user.userId
        this.loadAllPresents({ userId, forceReload: true })

        // 判断是否开启新手引导
        const res = await find(SHOWED_NOVICE_GUIDE)
        if (res) {
            this._SetIsShowNoviceGuide(false)
        } else {
            // this._SetIsShowNoviceGuide(true)
            this._SetIsShowNoviceGuide(false)   // 暂时屏蔽新手引导
        }
        this.showGuide(1, 'guideClass1')
    },
    beforeMount() {

    },
    beforeDestroy() {
        fileExistMap.clear()
        this.showResetProjectName = false
        this.removeShortcuts()
    },
    computed: {
        ...mapGetters('project', [
            'projects',
            'previewRouterName'
        ]),
        ...mapGetters([
            'userId'
        ]),
        ...mapGetters('config', [
            'isShowNoviceGuide',
            'importNoNavigate'
        ]),
        projectList() {
            const preProject = new Project(null, '创建新项目')
            const preArr = [preProject]
            const list = this.projects || []
            console.log('list -----  : ' + list.length)
            return preArr.concat(list)
        },
        lastRowUpdateTime() {
            const list = this.projects
            if (!list || list.length === 0) {
                return
            }
            let lastProj = list[this.projects.length - 1]
            return lastProj.update_time
        }
    },
    async created() {
        if (this.exportTimer == null) {
            this.exportTimer = setTimeout(async () => {

                let isOnline = await window.$net.isOnline()
                if (isOnline) {
                    this.asyncInitExportData()
                }
            }, 500)
        }
    },
    watch: {
        // 监听混入的resizeMixin里面的windowsize的变化
        windowSize: {
            handler: debounce(async function (val) {
                this.resetCollectionViewDisplayItems()
                await this.loadNext(this.lazyLoadObj.singlePageCount)
            }, 1),
            immediate: true
        },
        showRenameDialog: {
            handler: function (val, old) {
                //BugFix:1. 编辑出现时，需要屏蔽全局快捷键，避免影响编辑框的复制和黏贴 2. 编辑消失恢复全局快捷键
                if (val) {
                    this.unregisterShortcut()
                } else {
                    this.registerShortcut()
                }
            },
            immediate: false
        },
        showResetProjectName: {
            handler: function (val, old) {
                //BugFix:1. 编辑出现时，需要屏蔽全局快捷键，避免影响编辑框的复制和黏贴 2. 编辑消失恢复全局快捷键
                if (val) {
                    this.unregisterShortcut()
                } else {
                    this.registerShortcut()
                }
            },
            immediate: false
        }
    },
    methods: {
        ...mapActions(['asyncInitExportSetting', 'loadAllPresents']),
        ...mapActions(['asyncInitExportData']),

        ...mapMutations('thumbnail', ['_SetThumbnails']),

        ...mapMutations('project', ['_SetActiveProjectId', '_SortProjectsWithUpdateTime']),
        ...mapMutations('config', ['_SetIsShowNoviceGuide']),

        ...mapActions('project', [
            'ACT_InsertProject',
            'ACT_UpdateProject',
            'ACT_DeleteProject'
        ]),

        ...mapActions('thumbnail', [
            'ACT_GetThumbnails'
        ]),
        getTransFormedDropPaths() {
            let dropPaths = window.$dragFiles
            let dropPathArray = []
            for (const it of dropPaths) {
                dropPathArray.push(it.path)
            }
            return dropPathArray
        },
        resetCollectionViewDisplayItems() {
            const projectContainerRef = this.$refs['projectContainerRef']
            if (!projectContainerRef) {
                return
            }
            this.collectionViewSize = projectContainerRef.getBoundingClientRect()

            // 计算该请求的分页单次count的数量
            const intervalPadding = 10 // 格子间的间隔
            const ratio = this.lazyLoadObj.ratio
            const effectWidth = this.collectionViewSize.width - this.edgSet.left - this.edgSet.right
            const col = Math.floor(effectWidth / (intervalPadding + this.itemSize.width))
            const row = Math.round(this.collectionViewSize.height / (intervalPadding + this.itemSize.height))
            this.lazyLoadObj.singlePageCount = Math.round(col * row)
            this.lazyLoadObj.pageCount = Math.round(ratio * col * row)
            console.log(`onWindowResize:this.lazyLoadObj.pageCount=${this.lazyLoadObj.pageCount}`)
            this.column = col
        },
        async onRenameConfirm(name) {
            if (name == null || name.length == 0) {
                this.tsNotify({
                    type: 'error',
                    message: '文件名称不能为空！'
                })
                return
            }
            const project = this.projects[this.fileNameChangeFlagIndex - 1]

            //命名如果没改变，直接返回
            if (name === project.name) {
                this.fileNameChangeFlagIndex = null
                this.showRenameDialog = false
                return
            }

            //更新数据库
            await this.ACT_UpdateProject({
                id: project.id,
                modify: {
                    visit_time: +new Date(),
                    name: name
                }
            })

            const projectNameEl = this.getProjectNameElByIndex(this.fileNameChangeFlagIndex)
            projectNameEl.innerText = formatString(name)
            this.fileNameChangeFlagIndex = null
            this.showRenameDialog = false
            this.tsNotify({
                message: '重命名成功！'
            })
        },
        handleStopMove(e) {
            e.preventDefault()
        },
        loadError() {
            console.log('==》 加载失败')
        },
        onAddedProjectCallback(project) {
            const list = this.projects
            const len = list.length
            this.onProjectClick(len, project)
        },
        onAddProjectClick() {
            // 新手引导时，禁用新建项目按钮
            if (this.isShowNoviceGuide) {
                return
            }
            let goNext = async () => {
                let isOnline = await window.$net.isOnline()
                if (isOnline) {
                    this.showResetProjectName = true
                    this.PointHomeItem('add_new_project')
                    // this.$tsStat?.event('cake_workbench', {
                    //     cake_operate: 'add_new_project'
                    // })
                } else {
                    this.tsNotify({
                        type: 'error',
                        message: '当前无网络'
                    })
                }
            }
            this.$root.checkDiskSpaceIfNeed(() => {
                goNext()
            }).then(isNoSpace => {
                if (!isNoSpace) {
                    goNext()
                }
            })
        },

        // 区分项目单机、双击事件
        projectClickHandler(index, item, type) {
            if (type === 'dblclick') {
                if (this.clickTimer) clearTimeout(this.clickTimer)
                this.onProjectClick(index, item)
                this.PointClickProject(item.thumbnailCounts)
                // this.$tsStat?.event('cake_workbench', {
                //     cake_operate: 'click_project',
                //     cake_number: item.thumbnailCounts
                // })
            } else {
                if (this.clickTimer) clearTimeout(this.clickTimer)
                this.clickTimer = setTimeout(_ => {
                    this.onProjectClick(index, item)
                    this.PointClickProject(item.thumbnailCounts)
                    // this.$tsStat?.event('cake_workbench', {
                    //     cake_operate: 'click_project',
                    //     cake_number: item.thumbnailCounts
                    // })
                }, 300)
            }
        },

        async onProjectClick(index, item) {
            this._SetThumbnails([])
            const idx = index - 1
            this._SetActiveProjectId(item.id)
            await ShareObjectModel.instance().setCurrentProjectId(item.id)
            this.ACT_UpdateProject({
                id: item.id,
                modify: {
                    visit_time: +new Date()
                }
            })


            let routeName
            let routeParam = {}

            if (item.path && item.path.length > 0) {
                if (item.path.length == 1 && item.path[0] == '') {
                    routeName = 'project'
                } else {
                    routeName = this.previewRouterName
                }
            } else {
                routeName = 'project'
            }

            this.isLeave = true
            this.$router.push({
                name: routeName,
                query: {
                    index: idx,
                    ...routeParam
                }
            })

        },

        onImportFileClick(index) {
            this.tsConfirm({
                title: '系统提示',
                message: '该项目关联的文件不存在，请重新导入文件',
                showCancelButton: false
            }).then(_ => {
                // 处理删除工程缓存
                this.loadingEl = this.$loading({
                    lock: true,
                    text: '正在删除工程数据中',
                    background: 'rgba(0, 0, 0, 0.5)'
                })
                let project = this.projects[index]
                this.clearProject(project, index).then(res => {
                    if (this.loadingEl) {
                        this.loadingEl.close()
                        this.loadingEl = null
                    }
                    this.$router.push({
                        name: 'project',
                        query: {
                            index
                        }
                    })
                }).catch(e => {
                    if (this.loadingEl) {
                        this.loadingEl.close()
                        this.loadingEl = null
                    }
                    console.error(e)
                })
            })
        },
        async clearProject(project) {
            try {
                // 删除数据库记录
                await DBIpcRender.delete(THUMBNAIL_TABLE, 'projectId', project.id)
                await this.ACT_AsyncUpdateProject(
                    {
                        id: project.id,
                        path: null,
                        thumbnailPaths: null,
                        importTimes: 0,
                        thumbnailNumber: 0
                    }
                )
                // 删除目录缓存
                this.deleteProjectCache(project)
            } catch (e) {
                console.error(e)
                return Promise.reject(e)
            }
        },
        isProjectExist(project) {
            if (project.path == null || project.path.length == 0) {
                return false
            }
            let res = true
            for (let i = 0; i < project.path.length; i++) {
                if (!FileUtils.isFileExist(project.path[i])) {
                    res = false
                    return res
                }
            }
            return res
        },
        // 滚动到底部触发的事件
        async onScrolledToBottomRange() {
            await this.loadNext()
        },
        // 加载下一批
        async loadNext(pageCount) {
            let virtualCollectionRef = this.$refs['virtualCollectionRef']
            if (!virtualCollectionRef) {
                return Promise.reject('the virtualCollectionRef is empty!!!')
            }
            try {
                let preLastRowUpdateTime = this.lastRowUpdateTime
                let status = loadingStatus.loading
                virtualCollectionRef.showLoadingMore(status)
                await this.$store.dispatch('project/ACT_GetBatchProjects', {
                    rowUpdateTime: this.lastRowUpdateTime,
                    pageCount: pageCount ? pageCount : this.lazyLoadObj.pageCount
                })
                status = this.lastRowUpdateTime === preLastRowUpdateTime ? loadingStatus.totalEnd : loadingStatus.finished
                if (status === loadingStatus.finished) {
                    const count = await countSince(this.userId, this.lastRowUpdateTime)
                    if (!count) {
                        status = loadingStatus.totalEnd
                    }
                }
                console.log(`onScrolledToBottomRange:`, status === loadingStatus.totalEnd ? '加载到底了!!!' : '单次加载成功了!!!')
                virtualCollectionRef.showLoadingMore(status)
            } catch (e) {
                console.log(`onScrolledToBottomRange has error`, e)
            }
        },
        // 从+开始
        getProjectNameElByIndex(projectIndex) {
            if (!this.$refs.virtualCollectionRef) {
                return null
            }
            const cardVueRef = this.$refs.virtualCollectionRef.$children[0].$children[projectIndex]
            if (!cardVueRef) {
                return null
            }
            const el = cardVueRef.$el.getElementsByClassName('project-name')[0]
            return el
        },
        /**
         * 右键菜单
         * @param data
         */
        async handleNodeContextmenu(idx, paramData) {
            const projectNameEl = this.getProjectNameElByIndex(idx)
            if (this.fileNameChangeFlagIndex !== null && projectNameEl && projectNameEl.innerText.length === 0) {
                this.div.focus()
                return
            } else {
                this.showContextMenu()
                const menu = new Menu()
                if (this.selectProjects.size <= 1) {
                    menu.push({
                        label: '重命名',
                        action: 'home__project-rename',
                        disabled: false,
                        data: paramData,
                        callback: (data) => {
                            this.inputRenameText = data.name
                            this.showRenameDialog = true
                            this.fileNameChangeFlagIndex = idx
                        }
                    })
                }



                if (this.selectProjects.size > 1) {
                    menu.push({
                        label: '批量删除',
                        action: 'home__project-batch-delete',
                        disabled: false,
                        data: this.selectProjects,
                        callback: this.batchRemove
                    })
                }
                else
                {
                    menu.push({
                        label: '删除',
                        action: 'home__project-delete',
                        disabled: false,
                        data: paramData,
                        callback: this.remove
                    })
                }

                menu.show((action) => {
                    this.onContextMenuItemClick(action)
                })
            }
        },
        // 拖动到已有项目
        onDropOverHanlder(idx) {
            this.dragToWhichItem = idx
        },
        onDropLeaveHanlder(idx) {
            this.dragToWhichItem = null
        },
        onDropHanlder: debounce(async function (paths, idx, item) {
			// 创建的是空的文件项目要判断这个条件(item.path.length ==1 && item.path[0] === '')
			let isAppend = !(!item
				|| !item.path
				|| item.path.length === 0
				|| (item.path.length === 1 && item.path[0] === ''))

            if ( isAppend && !this.checkCanImport()) {
                return
            }
            const projectId = item.id
            const projectName = item.name

            this.chooseItem = true
            this._SetActiveProjectId(item.id)
            await ShareObjectModel.instance().setCurrentProjectId(item.id)
            this.dragToWhichItem = null


            // this.importFilePaths = paths
            await this.importImagesOnHome(paths, isAppend, (thumbnailCount) => {
                if (this.importNoNavigate){
                    return
                }
                this.$router.push({
                    name: this.previewRouterName,
                    query: {
                        'thumbnailCount': thumbnailCount,
                        'activeMode': BatchActiveMode.PALETTE,
                        'scrollToIndex': isAppend,
                        'isfromHome': true
                    }
                })
            }, progress => {
                // console.log(`ImportProgressStatus.Start content = `, progress)
                if (progress.status === ImportProgressStatus.Start) {
                    this.showImportProgress = true
                }
                if ((progress.status === ImportProgressStatus.ImportEmpty) && item === null) {
                    this.ACT_DeleteProject(this.projects[idx - 1].id)
                }
                this.importProgress = progress

            })
        }, 1000),

        //拖动新建项目
        onDropOverHanlderWrap() {
            this.chooseItem = false
        },
        convertDataTransferFiles(dataTransferFiles) {
            const files = [...dataTransferFiles]
            let paths = []
            for (let file of files) {
                let fp = file.path
                paths.push(fp)
            }
            return paths
        },
        async onDropHanlderWrap(event) {
            let goNext = async (transferFiles) => {
                if (this.chooseItem === false) {
                    if (!this.checkCanImport()) {
                        return
                    }
                    //创建新项目
                    try {

						this.bIsCancelImport = false
						this.importProgress = {}

                        const files = transferFiles
                        let paths = []
                        for (let file of files) {
                            let fp = file.path
                            paths.push(fp)
                        }

                        const checkRet = await this.hasReadWritePermission(paths)
                        if (checkRet.result !== 1) {
                            this.toastNoReadWritePermission(checkRet)
                            return
                        }
                        this.showImportProgress = true
                        this.needDeleteImportProject = true

                        const filePathName = files[0].path
                        const statRet = await fs.statSync(filePathName)
                        let isFile = statRet.isFile()//是文件
                        let name = files[0].name
                        if (isFile) { // 文件则过滤掉扩展名，文件夹则不需要
                            const extentName = await NodeApi.path.extname(name)
                            name = name.replace(extentName, '')
                        }
                        const newProjectInfo = new Project(this.userId, name, null)
                        newProjectInfo.visit_time = new Date().getTime()
						if (this.bIsCancelImport){
							return
						}
						let project = {}
						try {
							project = await this.ACT_InsertProject(newProjectInfo)
						}catch (e) {
							this.tsNotify({
								type: 'error',
								message: e.message
							})
						}

						//@ts-ignore
						if (!project.id){ // 请求不到project的id则关闭导入对话框
							this.showImportProgress = false
							return
						}

                        if (this.bIsCancelImport){
							await DBIpcRender.delete(PROJECT_TABLE, 'id',project.id)
							return
						}

                        let index = 1
                        this.onDropHanlder(paths, index, project)
                    } catch (err) {
                        this.tsNotify({
                            type: 'error',
                            message: err.message
                        })
                    }
                }
            }
            let transferFiles = [...this.getDropPaths()]//[...event.dataTransfer.files]
            // window.$dragFiles = []
            this.$root.checkDiskSpaceIfNeed(() => {
                goNext(transferFiles)
            }).then(isNoSpace => {
                if (!isNoSpace) {
                    goNext(transferFiles)
                }
            })
            this.guideQuit('guideClass1')
        }
    }
})
</script>
<style lang="scss" scoped>
[contenteditable]:focus {
    outline: none;
}

$smallFontSize: 14px;
$largerFontSize: 18px;
$miniFontSize: 12px;

.home-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    //padding: 40px 80px;
    box-sizing: border-box;
    //overflow-y: overlay;

    .title {
        font-size: $largerFontSize;
        line-height: 32px;
        font-weight: 500;
        margin: 0;
    }

    .project-container {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 40px;
        height: 100%;

        .box-card-hover {
            transform: scale(1.1);
        }

        .box-card {
            padding: 0;
            width: 232px;
            height: 238px;
            font-size: 0;
            flex-shrink: 0;
            border-radius: 8px;
            border: 1px solid transparent;

            .project-icon {
                height: 178px;
                width: 100%;
                object-fit: cover;
                display: flex;
                align-items: center;
                justify-content: center;

                .default-icon {
                    width: 79px;
                    height: 85px;
                }
            }

            .custom-image {
                height: 178px;

                .img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .claFmt {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .claText {
                    color: white;
                    font-size: 12px;
                }

                .two-box {
                    display: flex;
                    width: 100%;

                    .img {
                        height: 178px;
                        width: 50%;
                    }

                    .claFmt {
                        width: 50%;
                        height: 178px;
                    }
                }

                .three-box {
                    display: flex;
                    flex-direction: column;

                    .top {
                        height: 109px;
                    }

                    .bottom {
                        height: 61px;
                        display: flex;

                        &-left {
                            width: 125px;
                            flex: 1;
                            flex-shrink: 0;
                        }

                        &-right {
                            flex: 1;
                            width: auto;
                            position: relative;

                            .count-box {
                                width: 100%;
                                height: 100%;
                                position: absolute;

                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background: rgba(0, 0, 0, 0.80);
                                font-size: 12px;
                                font-weight: bold;

                            }
                        }
                    }
                }
            }

            .project-info {
                box-sizing: border-box;
                padding: 10px 11px;
                width: 100%;

                .project-name, .project-time {
                    margin: 1px;
                    height: 20px;
                    overflow: hidden;
                    font-size: $miniFontSize;
                    line-height: 20px;
                    white-space: nowrap;
                }

                .project-time {
                    width: 210px;
                }

                .project-name {
                    display: inline-block;
                    max-width: 210px;

                    &.active {
                        background: #265ccc;
                    }
                }

                .changeInput {
                    width: 100px;

                    .el-input--small .el-input__inner {
                        height: 10px;
                    }

                }
            }

            .add-project {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 238px;

                .add-btn {
                    width: 30px;
                    height: 30px;
                    font-size: 30px;
                    margin-bottom: 8px;
                }

                .add-name {
                    font-size: $smallFontSize;
                    line-height: 22px;
                }
            }

            &.box-card-selected {
                border-color: #ededed;
            }
        }

    }
}

</style>
