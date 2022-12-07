<template>

    <div class="export-list">


        <div v-if="showStartOrPauseClick"
             class="all-opt-container">
            <el-button
                :disabled="!showPauseAllBtn"
                class="onPauseAllOptBtn"
                @click.native.stop="onPauseAllBtnClick"
                size="mini"
            >
                全部暂停
            </el-button>

            <el-button
                :disabled="!showStartAllBtn"
                class="onStartAllOptBtn"
                size="mini"
                @click.native.stop="onStartAllBtnClick">
                全部开始
            </el-button>
        </div>

        <div class="tr header">
            <div class="th th-name"> 项目名称</div>
            <div class="th th-progress">导出进度条</div>
            <div class="th th-share-link">操作</div>
            <div class="th th-time">导出时间</div>
        </div>

        <DynamicScroller
            v-if="tableList.length > 0"
            :min-item-size="50"
            :items="tableList"
            :class="[isOnExportingBtn ? 'dir-un-complete-container' : 'dir-container']"
        >
            <template v-slot="{ item, index, active }">
                <DynamicScrollerItem
                    :data-index="index"
                    :data-active="active"
                    :active="active"
                    :item="item"
                >
                    <div class="dir-item">
                        <el-collapse v-model="activeNames" @change="handleChangeCollapse(item)">
                            <el-collapse-item :disabled="exportErrMap.get(item.id) === null" :name="item.id">
                                <template slot="title">
                                    <div class="tr tbody">
                                        <div
                                            class="td td-name"
                                            :title="item.name"
                                            :alt="item.name"
                                        >
                                            <div class="name">
                                                <img
                                                    alt="文件夹"
                                                    class="folder-icon folder-icon-close"
                                                    :src="require('@/assets/icons/dark/export_icon_file@3x.png')"
                                                >
                                                <img
                                                    alt="文件夹"
                                                    class="folder-icon folder-icon-open"
                                                    :src="require('@/assets/icons/dark/export_icon_file_open@3x.png')"
                                                >

                                                <span> {{ item.name }}</span>

                                            </div>

                                        </div>

                                        <div class="td td-progress">

                                            <div class="progress-bar">
                                                <el-progress
                                                    :show-text="false"
                                                    :percentage="parseInt(item.progress)"
                                                />
                                                <span class="progress-info" v-if="[0, 1].includes(item.exportStatus)">
                                                  共{{ item.exportTotalNum }}张
                                                </span>
                                                <span class="progress-info" v-else>
                                                  共{{ item.exportTotalNum }}张
                                                </span>
                                            </div>

                                            <div class="progress-status">
                                                <template v-if="[0, 1].includes(item.exportStatus)">

                                                    <span v-if="item.isPauseStatus || item.isFundsLackStatus">已暂停</span>
                                                    <span v-else-if="!item.isStartExport">等待中...</span>
                                                    <span v-else>{{ item.progress }}%</span>
                                                </template>

                                                <template v-else-if="[3, 4].includes(item.shareStatus)">
                                                    <img
                                                        class="el-icon-success icon icon-success"
                                                        :src="require('@/assets/icons/dark/export_icon_download_failed@3x.png')"
                                                        alt="">
                                                </template>

                                                <template v-else-if="item.exportStatus === 3">
                                                    <img v-if="!needShowRetry(item.id)"
                                                         class="el-icon-success icon icon-success"
                                                         :src="require('@/assets/icons/dark/export_icon_successful@3x.png')"
                                                         alt="">

                                                    <img v-else
                                                         class="el-icon-success icon icon-success"
                                                         :src="require('@/assets/icons/dark/export_icon_failed@3x.png')"
                                                         alt="">

                                                </template>

                                                <template v-else-if="item.exportStatus === 2">
                                                    <img
                                                        class="el-icon-success icon icon-success"
                                                        :src="require('@/assets/icons/dark/export_icon_failure@3x.png')"
                                                        alt="">
                                                </template>
                                            </div>

                                        </div>

                                        <div class="td td-opt-container">

                                            <template v-if="[0, 1].includes(item.exportStatus)">

                                                <template v-if="!item.isPauseStatus && !item.isFundsLackStatus">
                                                    <el-tooltip
                                                        effect="light"
                                                        placement="bottom"
                                                        class="item"
                                                        :visible-arrow="false"
                                                        popper-class="hoverContent_icon">
                                                        <div slot="content">暂停</div>
                                                        <el-button
                                                            type="text"
                                                            :disabled="isBusyStatus"
                                                            @click.native.stop="pauseExport(item)"
                                                            class="custom-btn">
                                                            <img
                                                                class="icon-opt"
                                                                :src="require('@/assets/icons/dark/export_icon_action_start@3x.png')"
                                                                alt="暂停">
                                                        </el-button>
                                                    </el-tooltip>
                                                </template>

                                                <template v-else>
                                                    <el-tooltip
                                                        effect="light"
                                                        placement="bottom"
                                                        class="item"
                                                        :visible-arrow="false"
                                                        popper-class="hoverContent_icon">
                                                        <div slot="content">开始</div>
                                                        <el-button
                                                            type="text"
                                                            :disabled="isBusyStatus"
                                                            @click.native.stop="startExport(item)"
                                                            class="custom-btn">
                                                            <img
                                                                class="icon-opt"
                                                                :src="require('@/assets/icons/dark/export_icon_action_suspend@3x.png')"
                                                                alt="开始">
                                                        </el-button>
                                                    </el-tooltip>
                                                </template>
                                            </template>

                                            <template v-else-if="item.exportStatus === 2">
                                                <el-button
                                                    type="text"
                                                    title="重试"
                                                    :disabled="isBusyStatus"
                                                    @click.native.stop="retry(item)"
                                                    class="custom-btn">
                                                    <img
                                                        class="icon-opt"
                                                        :src="require('@/assets/icons/dark/export_icon_action_reload@3x.png')"
                                                        alt="重试">
                                                </el-button>
                                            </template>

                                            <template v-else-if="item.exportStatus === 3">

                                                <template v-if="[0, 2, 3, 4].includes(item.shareStatus)">

                                                    <template v-if="item.shareStatus === 2 && item.shareLink">
                                                        <el-button
                                                            type="text"
                                                            title="查看分享链接"
                                                            @click.native.stop="onShareClick(item, index)"
                                                            class="custom-btn">
                                                            <img
                                                                class="icon-opt"
                                                                :src="require('@/assets/icons/dark/export_icon_action_link@3x.png')"
                                                                alt="查看分享链接">

                                                        </el-button>

                                                    </template>
                                                    <template v-else>
                                                        <template v-if="needShowRetry(item.id)">
                                                            <el-button
                                                                type="text"
                                                                title="重试"
                                                                :disabled="isBusyStatus"
                                                                @click.native.stop="retry(item)"
                                                                class="custom-btn">
                                                                <img
                                                                    class="icon-opt"
                                                                    :src="require('@/assets/icons/dark/export_icon_action_reload@3x.png')"
                                                                    alt="重试">
                                                            </el-button>
                                                        </template>

                                                        <template v-else>
                                                            <el-tooltip
                                                                effect="light"
                                                                placement="bottom"
                                                                class="item"
                                                                :visible-arrow="false"
                                                                popper-class="hoverContent_icon">
                                                                <div slot="content">分享</div>
                                                                <el-button
                                                                    v-if="$IS_CLIENT_PIX_PIE === false && $IS_CLIENT_PixCake_EXPO == false"
                                                                    type="text"
                                                                    @click.native.stop="onShareClick(item, index)"
                                                                    class="custom-btn">
                                                                    <img
                                                                        class="icon-opt"
                                                                        :src="require('@/assets/icons/dark/export_icon_action_share@3x.png')"
                                                                        alt="分享">

                                                                    <img v-show="[3, 4].includes(item.shareStatus)"
                                                                         class="share-fail-icon"
                                                                         :src="require('@/assets/icons/dark/export_icon_download_failed@3x.png')">
                                                                </el-button>
                                                            </el-tooltip>
                                                        </template>
                                                    </template>
                                                </template>

                                                <!--                    显示分享进度-->
                                                <template v-else>
                                                    <el-progress class="share-progress" type="circle"
                                                                 :percentage="item.shareProgress" :width="15"
                                                                 :stroke-width="2"
                                                                 :show-text="false" color="#ffffff"></el-progress>
                                                </template>
                                            </template>

                                            <el-tooltip
                                                effect="light"
                                                placement="bottom"
                                                class="item"
                                                :visible-arrow="false"
                                                popper-class="hoverContent_icon">
                                                <div slot="content">查看导出路径</div>
                                                <el-button
                                                    type="text"
                                                    class="custom-btn"
                                                    @click.native.stop="openFolder(item.exportDirPath)">

                                                    <img
                                                        class="icon-opt"
                                                        :src="require('@/assets/icons/dark/export_icon_action_location@3x.png')"
                                                        alt="查看导出路径">

                                                </el-button>
                                            </el-tooltip>


                                            <el-tooltip
                                                effect="light"
                                                placement="bottom"
                                                class="item"
                                                :visible-arrow="false"
                                                popper-class="hoverContent_icon">
                                                <div slot="content">删除</div>
                                                <el-button
                                                    type="text"
                                                    :disabled="isBusyStatus"
                                                    class="custom-btn"
                                                    @click.native.stop="deleteFolder(item)">

                                                    <img
                                                        class="icon-opt"
                                                        :src="require('@/assets/icons/dark/export_icon_action_delete@3x.png')"
                                                        alt="删除">

                                                </el-button>
                                            </el-tooltip>

											<el-tooltip
												v-show="!isOnExportingBtn && IS_ALLOW_PHOTOSHOP_OPEN_PICTURE"
												effect="light"
												placement="bottom"
												class="item"
												:visible-arrow="false"
												popper-class="hoverContent_icon">
												<div slot="content">通过PS预览</div>
												<el-button   type="text"  class="custom-btn"  @click.native.stop="openPictureByPs(item)">
													PS
												</el-button>
											</el-tooltip>

										</div>
                                        <div class="td td-time">
                                            <template v-if="$isDev || $isBeta">
                                                {{ item.createTime | moment('YYYY-MM-DD HH:mm:ss') }}
                                                {{ getCost(item) }}
                                            </template>
                                            <template v-else>
                                                {{ item.createTime | moment('YYYY-MM-DD HH:mm:ss') }}
                                            </template>
                                        </div>

                                    </div>
                                </template>

                                <template v-if="item.isExpand && exportErrMap.get(item.id) !== null">
                                    <div v-for="(item, index) in exportErrMap.get(item.id)" :key="index">
                                        <div
                                            class="error-info-container"
                                            :title="item.path"
                                            :alt="item.path"
                                        >
                                            <div class="error-name">
                                                <img
                                                    alt="原图"
                                                    class="error-icon-folder"
                                                    :src="require('@/assets/icons/dark/export_icon_pic@3x.png')"
                                                >
                                                <span>{{ item.path | filterFormatName }}</span>


                                                <div class="operation" @click.stop>
                                                    <template>

                                                        <el-button
                                                            circle
                                                            size="mini"
                                                            title="打开原图"
                                                            class="custom-btn"
                                                            @click.native.stop="openFile(item.path)">
                                                            <img
                                                                height="8px"
                                                                alt="打开原图"
                                                                class="folder-icon"
                                                                :src="require('@/assets/icons/dark/export_button_file@3x.png')"
                                                            >
                                                        </el-button>
                                                    </template>

                                                </div>
                                            </div>

                                            <div class="error-msg">
                                                <span>
                                                    {{ exportErrorMapping(item) }}
                                                </span>

                                                <img
                                                    v-if="item.errorTag !== 27"
                                                    :src="require('@/assets/icons/dark/export_icon_failed@3x.png')"
                                                    alt="">
                                            </div>

                                            <div class="error-empty">
                                                <el-button
                                                    type="text"
                                                    title="重试"
                                                    v-if="item.errorTag !== 27 && (item.errorTag !== 28 && item.errorCode !== 28)"
                                                    :disabled="isBusyStatus"
                                                    @click.native.stop="retryExportItem(item, index)"
                                                    class="custom-btn">
                                                    <img
                                                        class="icon-opt"
                                                        :src="require('@/assets/icons/dark/export_icon_action_reload@3x.png')"
                                                        alt="重试">
                                                </el-button>

                                                <!--                                                <el-button-->
                                                <!--                                                    type="text"-->
                                                <!--                                                    title="查看原文件"-->
                                                <!--                                                    class="custom-btn"-->
                                                <!--                                                    @click.native.stop="openFolder(item.path)">-->

                                                <!--                                                    <img-->
                                                <!--                                                        class="icon-opt"-->
                                                <!--                                                        :src="require('@/assets/icons/dark/export_icon_action_location@3x.png')"-->
                                                <!--                                                        alt="查看原图路径">-->

                                                <!--                                                </el-button>-->
                                                <!--                     <span>{{empty_placehoder}}</span>-->
                                            </div>
                                            <div class="error-empty">
                                                <template>
                                                    {{ item.created_time | moment('YYYY-MM-DD HH:mm:ss') }}
                                                </template>
                                            </div>

                                        </div>
                                    </div>
                                </template>

                            </el-collapse-item>

                        </el-collapse>
                    </div>
                </DynamicScrollerItem>

            </template>

        </DynamicScroller>


        <template v-else>
            <div class="no-result">
                <img class="icon" :src="$getIconPath('list_icon_list_empty@3x.png', 'common')" alt="">
                <p class="text c-text-label">暂无导出项目</p>
            </div>
        </template>


        <share-dialog v-show="showShareSelectDialog"/>

        <share-result-dialog v-show="isShareResultDialog"/>

        <export-full-loading-dialog v-model="fullscreenLoading" :content="fullLoadingContent"/>

    </div>
</template>
<script>
import { onMounted, getCurrentInstance } from 'vue'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import ShareDialog from './ShareSelectDialog'
import ShareResultDialog from '@/views/ExportList/ShareResultDialog'
import { Progress, Button, Tooltip } from 'element-ui'
import toast from '@/mixins/toast'
import { debounce } from 'lodash'
// import ExportProcessFork from '~/main/process/exportProcessFork';
import FileUtils from '@/utils/FileUtils'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import pointsMixin from '@/mixins/pointsMixin'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import ExportFullLoadingDialog from '@/views/ExportList/ExportFullLoadingDialog'
import { Export_API_ERROR } from '@/utils/export/exportConfig'
import UserModel from '#/model/UserModel'
import { delay } from '#/utils/common'
import NodeApi from 'qt/node-api'
import { dialogIpc, FUNK_LACK_KEY } from 'qt/dialog/DialogIpcImpl'
import {IS_ALLOW_PHOTOSHOP_OPEN_PICTURE, IS_CLIENT_PIX_PIE} from '#/types/config'
import store from '@/store'

import useRechargeRepositories from '@/views/Layout/composables/useRechargeRepositories'
import useExportPointsRepositories from '@/composables/points/useExportPointsRepositories'
import {ExportBridgeImpl} from "qt/bridge/impl/ExportBridgeImpl";
import eventbus from "@/utils/eventbus"

export default {
    name: 'LeftSideView',
    mixins: [toast, pointsMixin],
    components: {
        'el-progress': Progress,
        'el-button': Button,
        'el-tooltip': Tooltip,
        ShareDialog,
        ShareResultDialog,
        DynamicScroller,
        DynamicScrollerItem,
        ExportFullLoadingDialog
    },

    props: {

        height: {
            type: Number,
            default: 600
        }
    },

    setup(props) {
        const _that = getCurrentInstance()?.proxy
        onMounted(_that?.launchMessage)

        const { showFundLackView } = useRechargeRepositories()
        const { PointExportTable } = useExportPointsRepositories()

        return {
            showFundLackView,
            PointExportTable
        }
    },

    data() {
        return {
            columns: 1,
            rowHeight: 48,
            maxThumbnailWidth: 200,
            tableLoading: false,
            fullscreenLoading: false,
            fullLoadingContent: '',
            empty_placehoder: '— —',
            showPayTip: false,
            showDeleteDialog: false,
            isBusyStatus: false,
			IS_ALLOW_PHOTOSHOP_OPEN_PICTURE
		}
    },
    mounted() {
        //Todo:待搬移
        // ExportProcessFork.shareInstance().filterExportProcess().then(processList => {
        //
        // 	if (processList && processList.length > 0) {
        // 		processList.forEach(item => {
        // 			console.log('exportTable mounted try to kill process : ', item)
        // 			ExportProcessFork.shareInstance().killProcessWithPid(item.pid)
        // 		})
        // 	}
        // })
    },

    filters: {
        filterFormatName(value) {
            if (value && value.length >= 20) {
                // ... 名字过滤器
                let start = value.substr(0, 10)
                let end = value.substr(value.length - 10, 10)
                return `${start} ... ${end}`
            }
            return value
        }
    },

    computed: {

        showStartOrPauseClick() {
            return this.needShowStartOrPauseAllBtn()
        },
        showPauseAllBtn() {
            return this.needShowPauseAllBtn()
        },
        showStartAllBtn() {
            return this.needShowStartAllBtn()
        },
        isOnExportingBtn() {
            return this.$store.state.export.isOnExportingBtn
        },
        currentDownloadDirId() {
            return this.$store.state.export.currentDownloadDirId
        },

        user() {
            return this.$store.state.user
        },

        showShareSelectDialog() {
            return this.$store.state.export.showShareSelectDialog
        },

        isShareResultDialog() {
            return this.$store.state.export.showShareResultDialog
        },
        myMaxThumbnailWidth() {
            return this.maxThumbnailWidth
        },
        myCloumHeight() {
            return this.rowHeight
        },

        tableList() {
            let list = this.$store.state.export.list
            if (list === null || list.length === 0) {
                return list
            }
            let finalList = null
            let isOnExportingBtn = this.$store.state.export.isOnExportingBtn
            let exportErrorMap = this.$store.state.export.exportErrMap
            // 在正在导出tab
            if (isOnExportingBtn) {
                // 如果 总张数 > 完成进度  || 有错误状态 || 错误map有当前列表
                finalList = list.filter(item => !(item.exportTotalNum === item.exportSuccessNum && (!item.hasExportFail) && !exportErrorMap.has(item.id)))
                finalList = finalList.sort(function (a, b) {
                    return a.createTime - b.createTime
                })

            } else {
                finalList = list.filter(item => item.exportTotalNum === item.exportSuccessNum && (!item.hasExportFail) && !exportErrorMap.has(item.id))
                finalList = finalList.sort(function (a, b) {
                    return b.createTime - a.createTime
                })
            }

            return finalList
        },
        totalNum(item) {
            return (item) => {
                return item.exportItemList.length
            }
        },
        exportErrMap() {
            let isOnExportingBtn = this.$store.state.export.isOnExportingBtn
            if (isOnExportingBtn) {
                let exportErrorMap = this.$store.state.export.exportErrMap
                return exportErrorMap
            } else {
                let exportErrorMap = this.$store.state.export.exportSuccessTipMap
                return exportErrorMap
            }
        },
        activeNames: {
            get() {
                let list = this.$store.state.export.list

                let isOnExportingBtn = this.$store.state.export.isOnExportingBtn
                let exportErrorMap
                if (isOnExportingBtn) {
                    exportErrorMap = this.$store.state.export.exportErrMap
                } else {
                    exportErrorMap = this.$store.state.export.exportSuccessTipMap
                }

                let errorList = []
                for (const tableElement of list) {
                    if (tableElement.isExpand && exportErrorMap.has(tableElement.id)) {
                        errorList.push(tableElement.id)
                    }
                }
                return errorList
            },
            set(val) {
            }
        }
    },

    methods: {
        ...mapGetters(['needShowPauseAllBtn', 'needShowStartOrPauseAllBtn', 'needShowStartAllBtn']),
        ...mapActions(['asyncRetryExportDirTask', 'asyncDeleteDir', 'asyncStartExport', 'asyncPauseExport', 'loadVipInfo', 'asyncOnPaySuccess', 'asyncRetryErrorItem', 'asyncPauseAll', 'asyncStartAll', 'asyncInitExportData2']),
        ...mapMutations(['showShareResultDialog', 'launchMessage', 'clearCallback', 'updatePauseStatus', 'setExportCallback', 'changeExpandStatus']),
        ...mapActions('config', ['readPhotoShopPath']),
		async openPictureByPs(item) {
			let ret = await ExportBridgeImpl.instance().openPictureByPs(item)
			if (ret && ret.code == false){
				eventbus.$emit('showPhotoshopPathSet')
				if (ret.message){
					this.tsNotify({
						type: 'error',
						message: ret.message
					})
				}
			}else {
        await this.readPhotoShopPath()
      }
		},
        needShowRetry(id) {
            let constain = this.exportErrMap.has(id)
            if (!constain) {
                return false
            }
            let list = this.exportErrMap.get(id)
            let need = false
            for (let i = 0; i < list.length; i++) {
                let item = list[i]
                if (item.errorTag !== 27) {
                    need = true
                    break
                }
            }
            return need
        },
        onPauseAllBtnClick: debounce(async function () {

            this.changeFullLoadingState(true, '正在执行全部暂停中...')
            await delay(500)
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.changeFullLoadingState(false)
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络,不支持下载，请检查网络。'
                })
                return
            }
            this.PointExportListPauseAllBtn()
            let _that = this
            this.asyncPauseAll({
                success() {
                    delay(1000).then(() => {
                        _that.changeFullLoadingState(false)
                    })
                },
                fail(msg) {
                    delay(1000).then(() => {
                        _that.changeFullLoadingState(false)
                        _that.tsNotify({
                            type: 'error',
                            message: '全部暂停失败，请重试或者重启应用～'
                        })
                    })
                }
            })
        }, 500),
        onStartAllBtnClick: debounce(async function () {
            this.changeFullLoadingState(true, '正在执行全部开始中...')
            await delay(500)
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.changeFullLoadingState(false)
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络,不支持下载，请检查网络。'
                })
                return
            }
            const _that = this
            _that.changeFullLoadingState(true, '正在执行全部开始中...')
            _that.PointExportListStartAllBtn()
            _that.asyncStartAll({
                success() {
                    delay(1000).then(() => {
                        _that.changeFullLoadingState(false)
                    })
                },
                fail(msg) {
                    delay(1000).then(() => {
                        _that.changeFullLoadingState(false)
                        _that.tsNotify({
                            type: 'error',
                            message: '全部导出失败，请重试或者重启应用～'
                        })
                    })
                }
            })
        }, 500),

        handleChangeCollapse(item) {
            console.log('handleChangeCollapse : ', item)
            this.changeExpandStatus(item.id)
        },
        startExport: debounce(async function (item) {
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络,不支持下载，请检查网络。'
                })
                return
            }
            this.isBusyStatus = true
            let _that = this
            _that.PointExportListStartBtn()
            _that.asyncStartExport({
                data: item,
                success() {
                    _that.isBusyStatus = false
                },
                fail(msg) {
                    console.error('asyncStartExport : ', msg)
                    _that.isBusyStatus = false
                    _that.tsNotify({
                        type: 'error',
                        message: '开始导出失败，请重试或者重启应用～'
                    })
                }
            })

        }, 500),

        pauseExport: debounce(async function (item) {
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络,不支持下载，请检查网络。'
                })
                return
            }
            this.isBusyStatus = true
            let _that = this
            this.PointExportListPauseBtn()
            this.asyncPauseExport({
                data: item,
                success() {
                    _that.isBusyStatus = false
                },
                fail(msg) {
                    _that.isBusyStatus = false
                    _that.tsNotify({
                        type: 'error',
                        message: '暂停失败，请重试～'
                    })
                }
            })
        }, 500),

        deleteFolder: debounce(async function (item) {

            let strMessage = ''
            if (item.progress < 100) {
                strMessage = '当前任务正在导出，删除后该导出进度将消失。已导出图片请前往导出目标文件夹进行查看。'
            }

            this.showDeleteDialog = true
            this.tsConfirm({
                title: '确认删除该导出进度',
                message: strMessage,
                confirmButtonText: '删除',
                closeOnClickModal: false
            }).then(_ => {
                this.PointExportListDeleteBtn()
                this.changeFullLoadingState(true, '正在删除中...')
                this.showDeleteDialog = false
                let _that = this
                this.asyncDeleteDir({
                    exportDir: item,
                    success(data) {
                        _that.changeFullLoadingState(false)
                    },
                    fail() {
                        _that.changeFullLoadingState(false)
                        _that.tsNotify({
                            type: 'error',
                            message: '删除失败，请稍候重试'
                        })
                    }
                })

            }).catch(_ => {
                this.showDeleteDialog = false
            })
        }, 200),
        changeFullLoadingState(isShow, content = '') {
            this.fullscreenLoading = isShow
            this.fullLoadingContent = content
        },
        async openFolder(filePath) {
            if (!await FileUtils.isFileExist(filePath)) {
                this.tsNotify({
                    type: 'error',
                    message: '该导出文件已被删除'
                })
                return
            }

            NodeApi.shell.showItemInFolder(filePath)
            this.PointExportTable('click_folder')

            // this.$tsStat?.event('cake_export_list', {
            //     cake_operate: 'click_folder'
            // })
        },
        async openFile(path) {
            if (!await FileUtils.isFileExist(path)) {
                this.tsNotify({
                    type: 'error',
                    message: '该原图文件已被删除'
                })
                return
            }
            NodeApi.shell.showItemInFolder(path)
        },
        retry: debounce(async function (item) {
            let exportErrArray = this.exportErrMap.get(item.id)
            let count = 0
            if (exportErrArray && exportErrArray.length > 0) {
                exportErrArray.forEach((it) => {
                    let errorTag = it.errorTag
                    if (errorTag === 28) {
                        count += 1
                    }
                })
            }

            if (exportErrArray && count === exportErrArray.length) {
                return
            }
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络，请检查网络。'
                })
                return
            }
            this.PointExportListRetryBtn()
            this.asyncRetryExportDirTask({ rootId: item.id, needClearErrorList: true })
        }, 300),

        exportErrorMapping(item) {
            // 参考exportCode.h 文件
            let tag = item.errorTag
            let errStr = '错误码:' + tag
            if (item.exportCode != null && item.exportCode !== 0) {
                errStr += ('-' + item.exportCode)
            }
            if (item.nativeExportCode) {
                //3: 系统找不到指定的路径
                errStr += ('-' + item.nativeExportCode)
            }
            errStr += '，'

            const errorTables = [
                { tag: 2, msg: '导出进程退出，请点击右侧重试按钮' },  // 区分于1，这个是被kill了
                { tag: 3, msg: '处理效果超时，请点击右侧重试按钮' },
                { tag: 4, msg: '导出进程错误，请点击右侧重试按钮' },
                { tag: 5, msg: '其他类型错误，请点击右侧重试按钮' },
                { tag: 7, msg: 'API请求失败，检查网络是否稳定,再请点击右侧重试按钮' },
                { tag: 8, msg: '账户余额不足' },
                { tag: 9, msg: '导出进程底层处理出错，请点击右侧重试按钮' },
                { tag: 10, msg: '导出进程异常退出，请点击右侧重试按钮' },
                { tag: 11, msg: '服务器请求数据生成失败，请点击右侧重试按钮' },
                { tag: 12, msg: '服务器请求数据校验失败，请点击右侧重试按钮' },
                { tag: 13, msg: '服务器请求数据为空，请点击右侧重试按钮' },
                { tag: 14, msg: '支付接口请求失败，请点击右侧重试按钮' },
                { tag: 15, msg: '支付接口校验失败，请点击右侧重试按钮' },
                { tag: 16, msg: '支付接口返回数据错误，请点击右侧重试按钮' },
                { tag: 17, msg: '支付服务器算法异常，请点击右侧重试按钮' },
                { tag: 18, msg: '拷贝性别文件错误，请点击右侧重试按钮' },
                { tag: 19, msg: '联动超时响应，请点击右侧重试按钮' },
                { tag: 20, msg: '网络请求超时，请检查网络或暂停电脑中其他上传/下载任务后再重试' },
                { tag: 21, msg: '该原图不存在，请点击右侧重试按钮' },
                { tag: 22, msg: '该图片被删除，请点击右侧重试按钮' },
                { tag: 23, msg: '保存失败，请点击右侧重试按钮' },
                { tag: 24, msg: '不支持该图片格式导出' },
                { tag: 25, msg: '图片写入IO失败，检查导出目录权限或者磁盘空间是否不足' },
                { tag: 26, msg: '导出错误，请点击右侧重试按钮' },
                { tag: 27, msg: '该图已产生二次计费（文件已被修改，可能在PS/LR等软件中进行了调整）' },
                { tag: 28, msg: '不支持该图片格式导出' },
                { tag: 30, msg: '项目数据丢失，请重新导入这批图片，再进行导出' },//图片对应的美化、调色参数文件有损，请重新导出
                { tag: 31, msg: '电脑运行内存不足，请先退出其他软件释放内存，再点击右侧重试按钮' },
                { tag: 32, msg: '电脑运行内存不足，请退出其他软件或重启电脑，再点击右侧重试按钮' }, // 区分于2，这个是正常退出；后面发现大部分的normal exit都是内存不存引起的，然后主进程无法捕获到相关信号
                { tag: 33, msg: '导出进程不存在，请重新安装像素蛋糕' },
                { tag: 34, msg: '导出进程启动失败，请重新安装像素蛋糕' },
                { tag: 35, msg: '创建共享内存失败，请重新启动像素蛋糕' },
                { tag: 36, msg: '挂载共享内存失败，请重新启动像素蛋糕' },
                { tag: 37, msg: 'API请求失败，请重启电脑，再点击右侧重试按钮' },
                { tag: Export_API_ERROR.ALLOCATED_PAY_API, msg: '剩余可用张数不足，请联系贵司管理员补充张数哦' }
            ]
            const nativeErrorTables = [
                { tag: 2, msg: '图片加载失败，请点击右侧重试按钮' },
                { tag: 4, msg: '效果处理过程中发生错误，请点击右侧重试按钮' },
                { tag: 6, msg: '图片保存过程中失败，请点击右侧重试按钮' },
                { tag: 8, msg: '服务器请求数据生成失败，请点击右侧重试按钮' },
                { tag: 9, msg: '不支持该图片格式' },
                { tag: 12, msg: '图片写入IO失败，检查导出目录权限或者磁盘空间是否不足' },
                { tag: 13, msg: '不支持该图片格式导出，请点击右侧重试按钮' },
                { tag: 14, msg: '原图不存在或者无读取权限' },
                { tag: 15, msg: '服务器响应数据校验失败，请点击右侧重试按钮' },
                { tag: 16, msg: '服务器响应数据不合法，请点击右侧重试按钮' },
                { tag: 17, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
                { tag: 18, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
                { tag: 19, msg: '保存出现黑图，请点击右侧重试按钮' },
                { tag: 20, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
                { tag: 21, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
                { tag: 24, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
                { tag: 25, msg: '创建导出文件失败，检查导出目录权限' },
                { tag: 26, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
                { tag: 28, msg: '图片对应的美化、调色参数文件有损，请重新导出' },
                { tag: 30, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
                { tag: 31, msg: '服务器响应数据丢失，请点击右侧重试按钮' },
            ]

            //有新增tag，请到此页面新增说明给 售后支持同学 https://truesight.yuque.com/cdsedg/zdtkeq/rhkklw/edit
            let msg = '处理效果超时，请点击右侧重试按钮'
            for (let i = 0; i < errorTables.length; i++) {
                if (errorTables[i].tag === tag) {
                    msg = errorTables[i].msg
                }
            }
            // 导出进程不是退出的标记位的话，那么nativeExportCode 代表的是底层返回值，否则代表的是exit code
            if (tag !== 2 && tag !== 10 && tag !== 31 && tag !== 32 && tag !== 33 && tag !== 34) {
                if (item.nativeExportCode && typeof item.nativeExportCode === 'number') {
                    let idx = item.nativeExportCode;
                    for (let i = 0; i < nativeErrorTables.length; i++) {
                        if (nativeErrorTables[i].tag === idx) {
                            msg = nativeErrorTables[i].msg
                        }
                    }
                }
            }

            let isNeedErrStr = true
            if (tag === 27) { //不需要错误码添加
                isNeedErrStr = false
            }
            return isNeedErrStr ? errStr + msg : msg
        },

        retryExportItem: debounce(async function (errorItem, index) {
            let errorTag = errorItem.errorTag
            let exportCode = errorItem.exportCode
            if (errorTag === 28 && exportCode === 28) { //导出算法崩溃
                return
            }
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络，请检查网络。'
                })
                return
            }
            this.asyncRetryErrorItem({ errorItem: errorItem, index: index, needDeleteCache: true })
        }, 500),


        onShareClick: debounce(async function (item, index) {
            if (item.shareStatus == 0) {
                this.PointExportTable('click_share_button')
            } else if (item.shareStatus == 2) {
                this.PointExportTable('view_share_link')
            }
            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络，请检查网络。'
                })
                return
            }

            //分享上传成功，且链接存在
            if (item.shareStatus === 2 && item.shareLink) {
                store.commit('updateShowShareResultDialog', { showShareResultDialog: true, item })
                return
            }

            //未上传、链接失效、上传失败
            NodeApi.getExport().asyncExportShare({ exportDirId: item.id, shareStatus: item.shareStatus })

        }, 500),


        onPaySuccess() {
            this.asyncOnPaySuccess()
        },
        getCost(item) {
            if (item.completeTime > 0) {

                let cost = (item.completeTime - item.createTime) / 1000
                if (cost < 60) {
                    return `用时:${Math.ceil(cost)}秒`
                } else {
                    cost /= 60
                    if (cost < 60) {
                        return `用时:${cost.toFixed(2)}分钟`
                    } else {
                        cost /= 60
                        return `用时:${cost.toFixed(2)}小时`
                    }
                }

            } else {
                return ''
            }

        }
    }
}
</script>
<style lang="scss" scoped>
.hasShareLink {
    color: #1677FF;
}

.fail-share-tip {
    color: #d22626;
}


.dir-container {
    width: 100%;
    height: calc(100% - 105px);
    overflow-y: overlay;

    /deep/ {

        .el-collapse {
            border-top: none;
            border-bottom: none;

            .el-collapse-item__header {
                background-color: #1d1d1d;
                height: 48px;
                border-bottom: none;
            }

            .el-collapse-item__arrow {
                display: none;
            }

            .el-collapse-item__content {
                padding-bottom: 0px;
            }

            .el-collapse-item__wrap {
                background-color: rgba(0, 0, 0, 0.4);
            }
        }
    }

}

.dir-un-complete-container {
    width: 100%;
    height: calc(100% - 155px);
    overflow-y: overlay;

    /deep/ {

        .el-collapse {
            border-top: none;
            border-bottom: none;

            .el-collapse-item__header {
                background-color: #1d1d1d;
                height: 48px;
                border-bottom: none;
            }

            .el-collapse-item__arrow {
                display: none;
            }

            .el-collapse-item__content {
                padding-bottom: 0px;
            }

            .el-collapse-item__wrap {
                background-color: rgba(0, 0, 0, 0.4);
            }
        }
    }

}


.dir-item {
    width: 100%;
}

.export-list {
    width: 100%;
    height: 100%;

    .all-opt-container {

        width: 100%;
        display: flex;
        justify-content: flex-end;

        .onPauseAllOptBtn {
            width: 98px;
            height: 28px;
            background: #1E1E1E;
            border: 1px solid #646464;
            border-radius: 4px;
            margin-right: 20px;
            font-size: 12px;
            margin-top: 10px;
            margin-bottom: 10px;
            background: url("../../assets/icons/dark/export_icon_action_start@3x.png") center no-repeat;
            background-size: 13px 13px;
            background-position: 13px;
            padding-right: 0px;

            &.is-disabled {
                opacity: 0.5;
            }
        }

        .onStartAllOptBtn {
            width: 98px;
            height: 28px;
            background: #1E1E1E;
            border: 1px solid #646464;
            border-radius: 4px;
            margin-right: 120px;
            font-size: 12px;
            margin-top: 10px;
            margin-bottom: 10px;
            background: url("../../assets/icons/dark/export_icon_action_suspend@3x.png") center no-repeat;
            background-size: 13px 13px;
            background-position: 13px;
            padding-right: 0px;

            &.is-disabled {
                opacity: 0.5;
            }
        }
    }

    .no-result {
        flex: 1;
        height: calc(100% - 180px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 13px;

        > .icon {
            width: 188px;
        }

        .text {
            font-size: 14px;
            text-align: center;
            font-weight: 400;
            margin-top: 24px;
        }
    }

    .content {
        height: 100%;
        flex: 100% 1 1;
        position: relative;
        overflow: auto;

        .wrapper {
            width: 100%;
            height: 100%;

            /deep/ .vue-recycle-scroller.direction-vertical:not(.page-mode) {
                overflow-y: overlay;
            }
        }
    }


    .tr {
        display: flex;
        height: 48px;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        padding-left: 38px;

        &.header {
            border-bottom-width: 1px;
        }

        &:not(.header):hover {
            background: rgba(0, 0, 0, 0.40);
        }

        .th {
            flex: 3;
            font-size: 13px;
            box-sizing: border-box;
        }

        .th.th-name {
        }

        .th.th-share-link, .td.td-share-link .td.td-opt-container {
            flex: 2;
        }

        .th.th-time, .td.td-time {
            flex: 2;
        }

        &.tbody:hover {

            .folder-icon-open {
                display: flex !important;
            }

            .folder-icon-close {
                display: none !important;
            }
        }

        .td {
            flex: 3;
            font-size: 14px;
            box-sizing: border-box;
            overflow: hidden;


            &.td-name {
                flex: 3;
                display: flex;
                align-items: center;
                height: 100%;
                justify-content: space-between;

                .name {
                    height: 24px;
                    line-height: 24px;
                    margin-right: 30px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;

                    .file-icon, .folder-icon {
                        pointer-events: none;
                        height: 14px;
                        vertical-align: text-top;
                        margin-right: 6px;
                    }

                    .folder-icon {
                        width: 16px;
                    }

                    .folder-icon-close {
                        width: 17px;
                        height: 15px;

                    }

                    .folder-icon-open {
                        width: 17px;
                        height: 15px;
                        display: none;
                    }

                    .file-icon {
                        width: 15px;
                    }

                    span {
                        margin-left: 2px;
                        margin-top: 2px;
                    }
                }

                .operation {
                    flex-shrink: 0;
                    width: 25px;
                    padding-right: 15px;
                    display: flex;
                    justify-content: space-between;
                    flex-direction: row-reverse;

                    .custom-btn {
                        width: 25px;
                        height: 25px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background: transparent;
                        padding: 3px;
                        color: #B8B8B8;
                        text-align: center;
                    }
                }
            }

            &.td-name .name, &.td-desc, &.td-time, &.th-speed {
                white-space: nowrap;
                overflow: visible;
                text-overflow: ellipsis;
            }

            &.td-progress {
                flex: 3;
                display: flex;
                align-items: center;

                .progress-bar {
                    width: 70%;
                    max-width: 235px;
                    margin-right: 16px;
                    position: relative;
                    height: 48px;

                    .progress-info {
                        position: absolute;
                        top: 18px;
                        right: 2px;
                        font-size: 12px;
                        color: #A6A6A6;
                    }
                }

                .progress-status {
                    height: 100%;
                    display: flex;
                    align-content: center;

                    span {
                        height: 100%;
                        justify-content: center;
                    }
                }

                /deep/ .el-progress {
                    margin-top: 22px;

                    .el-progress-bar__outer {
                        height: 2px !important;
                        background: #333333;

                        .el-progress-bar__inner {
                            background: #999999;
                        }
                    }
                }

                .progress-text {
                    font-size: 13px;
                }

                .status-opt {
                    width: 20%;
                    margin-left: 12px;
                }

                .icon {
                    font-size: 16px;
                    width: 16px;
                    height: 16px;
                }
            }


            .error-msg {
                font-size: 10px;
            }

            &.td-opt-container {
                flex: 2;
                display: flex;
                align-items: center;

                .custom-btn {
                    width: 18px;
                    height: 18px;
                    margin-right: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: transparent;
                    color: #B8B8B8;
                    text-align: center;
                    position: relative;

                    .icon-opt {
                        width: 16px;
                        height: 16px;
                    }

                    .share-fail-icon {
                        width: 8px;
                        height: 8px;
                        position: absolute;
                        bottom: 1px;
                        right: -3px;
                    }
                }

                .share-progress {
                    width: 18px;
                    height: 18px;
                    margin-right: 30px;
                }

                /deep/
                .el-progress-circle__track {
                    stroke: #ffffff2b;
                }
            }
        }
    }
}

.error-info-container {
    width: 100%;
    height: 38px;
    display: flex;
    flex-direction: row;

    .error-name {
        flex: 3;
        display: flex;
        align-items: center;
        height: 100%;


        .error-icon-folder {
            width: 14px;
            height: 14px;
            margin-left: 45px;
            margin-right: 9px;
        }

        span {
            width: 170px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #A6A6A6;
        }

        .operation {
            flex-shrink: 0;
            width: 25px;
            display: flex;
            margin-left: 8px;
            justify-content: space-between;
            flex-direction: row-reverse;


            .custom-btn {
                width: 25px;
                height: 25px;
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
                padding: 3px;
                color: #B8B8B8;
                text-align: center;
            }
        }
    }

    .error-msg {
        flex: 3;
        display: flex;
        align-items: center;
        height: 100%;
        padding-left: 36px;

        span {
            width: 70%;
            max-width: 254px;
            //width: 210px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #D95838;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;

        }

        img {
            width: 14px;
            height: 14px;
        }
    }

    .error-empty {
        flex: 2;
        display: flex;
        align-items: center;
        height: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        .custom-btn {
            width: 18px;
            height: 18px;
            margin-right: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: transparent;
            color: #B8B8B8;
            text-align: center;
            position: relative;

            img {
                width: 16px;
                height: 16px;
            }
        }
    }

}

</style>
