<template>
    <div class="claBatchRetouch">
        <div class="claLeft"
             @drop.prevent.stop="onDropHanlder($event)"
             @dragover.prevent.stop @dragenter.prevent.stop
        >

            <div class="claThumbnailList">
            </div>

            <div class="claBottom">
                <div class="claEditedCount">
                    <span>{{ `已修:${editCount}张  总计:${totalCount}张` }}</span>
                </div>
                <el-radio-group
                    size="mini"
                    class="claListSwitch"
                    v-model="isList"
                    @change="onListStyleChanged">
                    <el-radio-button :label="1" border>
                        <img v-if="isList === 1" :src="$getIconPath('toolbar_button_all@3x.png')"/>
                        <img v-else :src="$getIconPath('toolbar_button_all@3x.png')">
                    </el-radio-button>

                    <el-radio-button :label="2" border>
                        <img v-if="isList === 2" :src="$getIconPath('toolbar_button_all_one@3x.png')"/>
                        <img v-else :src="$getIconPath('toolbar_button_all_one@3x.png')">
                    </el-radio-button>
                </el-radio-group>

                <el-button
                    plain
                    size="mini"
                    style="width: 80px;"
                    :class="{ isSelect: isSelectedAll } "
                    @click="[onSelectedAllClick(), cancelBlur($event)]">
                    {{ isSelectedAll ? '取消全选' : '全选' }}
                </el-button>

                <el-button
                    plain
                    size="mini"
                    class="claSelectFavouriteAll"
                    @click="[onSelectFavouriteClick(), cancelBlur($event)]">
                    {{ `${isSelectedFavourite ? '取消选中星标' : '选中星标图片'}` }}
                </el-button>
            </div>
        </div>
        <BatchPalette
            :image-type="selectionImageType"
            :recommendPreItems="recommendPreItems"
            :myRecommendSelectIndex="myRecommendSelectIndex"
            :myPreItems="myPreItems"
            :myCurPresetSelectIndex="myCurPresetSelectIndex"
            :histogramData="histogramData"

            @onAddPresetCallBack="onAddPresettingClick"
            @onNativeRightClick="onPresetMenuRightClick"

            @onItemClick="onReminderPreItemClick"
            @onStepChange="onStepChange"
            @onResetClick="onResetPaletteCallback"

            ref="paletteViewRef"
        >
            <template slot="histogram">
                <Histogram
                    ref="tsHistogram"
                    :chartData="histogramData.chartData || {}"
                    :imageInfo="histogramData.imageInfo || {}">
                </Histogram>
            </template>
        </BatchPalette>

        <importProgressDialog
            @onCancelled="handleCancelImport"
            :status="importProgress.status"
            :data="importProgress"
            :importName="myImportName"
            v-model="showImportProgress">
        </importProgressDialog>

        <delete-progress-dialog
            :status="deleteProgress.status"
            :data="deleteProgress"
            v-model="showDeleteProgress">
        </delete-progress-dialog>

    </div>
</template>
<script>
import { defineComponent } from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import {aspectScaleToFitSize, getClientHeight, getClientWidth, hexToInt} from '@/utils/utils'
import { TSImageIOManager } from '@/utils/tsImageIOManager'
import ThumbnailModel from '@/model/ThumbnailModel'
import { debounce } from 'lodash'

import toast from '@/mixins/toast'
import button from '@/mixins/button'
import thumbnail from '@/mixins/thumbnailMixin'
import tsFileImport, { PermissionRetCode } from '@/mixins/tsFileImport'

import PresettingItemModel from '@/model/PresettingItemModel'
import eventbus from '@/utils/eventbus'
// 添加调色板的业务模块
import BatchPalette from '@/views/BatchRetouch/Palette/BatchPalette'

// import PaletteParamsViewModel from '@/viewModel/paletteParamsViewModel';

import Histogram from '@/views/BatchRetouch/Palette/Histogram'
import { ImportProgressStatus } from '@/constants'

import ImportProgressDialog from '@/views/BatchRetouch/components/ImportProgressDialog'
import { BEAUTIFY_PRESET_VERSION, MAX_SUPPORT_PRESET_VERSION, PALETTE_PRESET_VERSION } from '@/constants/preset-def'
import PalettePresetCfgModel from '@/model/PalettePresetCfgModel'

import DBIpcRender from '@/irender/DBIpcRender'
import { CLIENT_NAME, PALETTE_PRESETS_CFG_TABLE, THUMBNAIL_TABLE } from '#/types/config'
import { ParamFlag } from '@/constants/effect-config'
import presetManager from '@/mixins/presetManager'
import { BeautifyPresetType, ImageType, PresetClassifyType, PresetSuitIdType } from '@/constants/constants'
import ShortcutHelper from '@/utils/Shortcut/ShortcutHelper'
import pointsMixin from '@/mixins/pointsMixin'
import { MemoryMonitor } from '@/utils/monitor/memoryMonitor'
import { CreateSCENE } from '@/utils/tsImageIO'
import { delay } from '#/utils/common'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import eventBus from '@/utils/eventbus'
import batchDeleteMixin from '@/mixins/thumbnail/batchDeleteMixin'
import { gallery } from '@/qt-ipc/gallery'
import { dialogIpc } from '@/qt-ipc/dialog/DialogIpcImpl'
import imageIOManager from '@/qt-ipc/imageIOManager'


export default defineComponent({
    name: 'batchRetouch',
    components: {
        BatchPalette,
        Histogram,
        ImportProgressDialog
    },
    mixins: [
        toast,
        button,
        thumbnail,
        tsFileImport,
        presetManager,
        pointsMixin,
        batchDeleteMixin
    ],
    data() {
        return {
            defaultGridColumn: 5,
            columns: 5,
            activeName: ['recommend', 'user'],
            isList: '1',
            isSelectedAll: false,
            isSelectedFavourite: false,
            totalCount: 0, // 图片总数
            lrEdgePadding: 105,
            listScrollTop: 0,
            singleScrollTop: 0,
            // 记录导进来时的原始项对应的presetItemModel
            imageOriPresetMap: new Map(),
            isOnLoadPreset: false,
            isFirstTime: true,
            curPresetId: null,
            isDestroy: false,
            galleryUUID: '',
            loadingEl: null, // loadingEl为elementUI的loading对象

            reminderPresetSelectIndex: 0,
            myPresetSelectIndex: 0,
            recommendPaletteSelectIndex: -1,//图像调节 推荐预设
            histogramData: {},
            needRefreshOptStatus: true,
            iBatchUpdateListener: null,
            createScene: CreateSCENE.batchRetouch,
            hanlderExportClick: null,
            editCount: 0,
            selectionImageType: ImageType.Jpeg, // 黄框,选中图片的格式
            // 仅用于创建Qt端的主窗口碎片，用于loadImage时
            needCreateMainFragment: false,
            canDestroy: false,
			// 是否正在显示对话框
			isShowingImportDialog:false
        }
    },
    watch: {
        $route() {
        }
    },
    computed: {
        ...mapGetters([
            'oriPreset'
        ]),

        ...mapGetters('project', [
            'activeProject',
            'activeProjectId'
        ]),

        ...mapGetters('thumbnail', [
            'getThumbnails',
            'getSelectedImgIndex',
            'updateTime'
        ]),

        listViewHeight() {
            let listViewH = getClientHeight()
            listViewH = (listViewH - 56 - 50) + 'px'
            return listViewH
        },
        recommendPreItems() {
            let countsInPage = 8
            let content = this.$store.state.presetting.recommendPreItems
            let oriPreset = this.$store.state.presetting.oriPreset
            content = [oriPreset].concat(content)
            let columList = []
            let itemList = []
            let index = 0
            for (let it of content) {
                let isNewPage = index % countsInPage === 0
                if (isNewPage) {
                    itemList = []
                    columList.push(itemList)
                }
                itemList.push(it)
                index++
            }
            return columList
        },
        myPreItems() {
            let countsInPage = 12
            let content = this.$store.state.presetting.preItems
            let columList = []
            let itemList = []
            let index = 0
            for (let it of content) {
                let isNewPage = index % countsInPage === 0
                if (isNewPage) {
                    itemList = []
                    columList.push(itemList)
                }
                itemList.push(it)
                index++
            }
            return columList
        },
        myRecommendSelectIndex() {
            return this.reminderPresetSelectIndex
        },
        myCurPresetSelectIndex() {
            return this.myPresetSelectIndex
        },
        myRecommendPaletteSelectIndex() {
            return this.recommendPaletteSelectIndex
        }
    },
    methods: {
        ...mapActions([
            'loadRecommendItemsIfNeed',
            'loadAllPresents',
            'deleteThumbnail',
            'deletePreset',
            'getThumbnailByIndex'
        ]),

        ...mapMutations('thumbnail', [
            '_SetSelectedImgIndex',
            '_SetActiveThumbnail',
            '_SetUpdateTime'
        ]),

        ...mapActions('thumbnail', [
            'ACT_UpdateThumbnail',
            'ACT_UpdateThumbnailByKey',
            'ACT_DeleteThumbnail',
            'ACT_GetThumbnails',
            'ACT_BatchUpdateThumbnailByKey'
        ]),

        ...mapActions('presetSuit', [
            'ACT_IncreasePalettePreset',
            'ACT_BatchUpdatePalettePreset',
            'ACT_BatchCopyPaletteToSelf',
            'ACT_GetPalettePreset'
        ]),

        ...mapMutations('project', [
            '_SetLastProjectUpdateTime',
            '_SetEntryProjectCache'
        ]),
        ...mapMutations([
            'updateExportEffectCfg'
        ]),

        thumbnailRef() {
            return this.$refs.thumbViewRef
        },

        onEchartDataUpdate(data, info, err) {
            this.$tsStat.event('cake_gallery', {
                cake_operate: 'select_one'
            })
            console.log('==> onEchartDataUpdate', data, info, err)
            this.histogramData = {
                chartData: {
                    ...data
                },
                imageInfo: {
                    ...info
                }
            }
        },

        onCommandLeftMouseClick(param) {

        },


        async loadImages() {
            try {

                const { id, name } = this.activeProject

                // await this.ACT_GetThumbnails({projectId: id, projectName: name})

                let args = {
                    isInGallery: true,
                    projectId: id,
                    leftListPadding: {
                        right: this.lrEdgePadding,
                        top: 0,
                        left: this.lrEdgePadding,
                        bottom: 0
                    },
                    leftListMargin: {
                        right: 300,
                        top: 48,
                        left: 0,
                        bottom: 50
                    }
                }
                // 从工作台过来的，就调用ipcRender.sender("onProjectExit")
                let result = {}
                if (this.needCreateMainFragment) {
                    result = await ipcRenderer.send('on-main-fragment-mount', {
                        gallery: args,
                        tab: 'batchRetouch'
                    })
                } else {
                    result = await gallery.showGalleryFragment(args)
                }
                this.galleryUUID = result.galleryUUID
                this.updateExportEffectCfg({
                    isFromRefineTab: false,
                    refineOrGalleryUUID: this.galleryUUID
                })

                const presetSuitId = [PresetSuitIdType.NoEffect, PresetSuitIdType.UnSet].includes(result.presetSuitId)
                    ? result.presetSuitId
                    : result.lastPresetSuitId
                if (presetSuitId) {
                    this.findPresetSuitIndex(presetSuitId)
                }
                this.canDestroy = true
            } catch (err) {
                console.error('==> loadImages', err)
                this.canDestroy = true
            }
        },

        // 过滤条件，只有选中状态的才做效果 ,预设入库
        async loadPresetEffectCfg(presetItem) {
            this.curPresetId = presetItem.id

            let param = {
                presetSuitId: presetItem.id,
                presetId: presetItem.beautifyPresetId,
                palettePresetId: presetItem.palettePresetId
            }

            const hasSelectedItem = await gallery.loadPresetEffectCfg(this.galleryUUID, param)

            if (hasSelectedItem) {
                if (!presetItem.paletteModel) {
                    presetItem.paletteModel = await this.ACT_GetPalettePreset(presetItem.palettePresetId || -1)
                }
            }
        },
        applyEffect(needLoadPalletCfg = true) {
            gallery.refreshView(this.galleryUUID, needLoadPalletCfg, true)
        },
        showLoading() {
            gallery.showVisibleLoading(this.galleryUUID, true)
        },
        makeOptStatusChanged() {
            if (!this.needRefreshOptStatus) {
                return
            }
            gallery.makeOptStatusChanged(this.galleryUUID)
        },

        //TODO: 待处理
        onAddPresettingClick(preIt) {
            let queue = TSImageIOManager.shareInstance().imageViewModelQueue
            if (queue == null || queue.size == 0) {
                this.$router.push({
                    path: 'photoFinishing',
                    query: {}
                })
                return
            }
            let arrayObj = Array.from(queue)
            arrayObj = arrayObj.sort(function (a, b) {
                return a[1].imgIndex - b[1].imgIndex
            })
            let thumbIt = null
            for (const queueElement of arrayObj) {
                if (queueElement[1].isSelected) {
                    thumbIt = queueElement[1]
                    break
                }
            }
            if (thumbIt == null) {
                thumbIt = arrayObj[0][1]
            }

            let presetModel = thumbIt.presetModel
            let thumbData = new ThumbnailModel()
            thumbData.userId = this.$store.state.user.userId
            thumbData.projectId = this.activeProjectId
            thumbData.originalImagePath = thumbIt.imgPath

            this.routerPushPhotoFinishing(thumbData, presetModel, thumbIt.imgIndex)
        },

        async onPresetClick(preIt, type) {
            const preSet = preIt[0]
            console.log(preSet, 88888)
            console.log('==> onPresetClick', preSet)

            if (preSet.version && preSet.version > MAX_SUPPORT_PRESET_VERSION) {
                this.tsConfirm({
                    title: '系统提示',
                    message: '需要升级最新版本才能使用该预设哦~',
                    showCancelButton: false
                }).then(_ => {
                }).catch(_ => {
                })
                return
            }

            this.isOnLoadPreset = true
            await imageIOManager.cancelAllProcess()

            await this.loadPresetEffectCfg(preSet)
            this.showLoading()
            this.makeOptStatusChanged()
            this.applyEffect(true)
            this.isOnLoadPreset = false
            if (preSet.classifyType === PresetClassifyType.System) {
                this.reminderPresetSelectIndex = preSet.id
                this.myPresetSelectIndex = 0
            } else {
                this.reminderPresetSelectIndex = 0
                this.myPresetSelectIndex = preSet.id
            }
        },

        onReminderPreItemClick(data) {
            this._SetUpdateTime(new Date())
            this.reminderPresetSelectIndex = data[0].id
            this.onPresetClick(data, 'reminder')

        },
        onMyPreItemClick(data) {
            this._SetUpdateTime(new Date())
            this.$tsStat.event('cake_gallery', {
                cake_operate: 'click_my_preset',
                cake_id: data[0].id
            })
            this.myPresetSelectIndex = data[0].id
            this.onPresetClick(data)
        },
        async onStarClick(item) {
            this.PointAddStar(item)
            this._SetLastProjectUpdateTime(new Date())
        },
        async onItemRotated(param) {
            this.$tsStat.event('cake_gallery', {
                cake_operate: 'rotate'
            })
            this._SetLastProjectUpdateTime(new Date())
        },
        /*
            此接口是调色板和Retouch做效果共用，调色板没有精修模块，需要提前return
        */
        async onThumbItemDoubleClick(param) {
            let thumbIt = param[0]
            let presetModel = await thumbIt.thumbnailModel.getPresetModel(this.$store)
            let thumbData = new ThumbnailModel()
            thumbData.userId = this.$store.state.user.userId
            thumbData.projectId = this.activeProjectId
            thumbData.originalImagePath = thumbIt.imgPath

            this.routerPushPhotoFinishing(thumbData, presetModel, thumbIt.imgIndex)
        },
        async onSelectedAllClick() {

            this.isSelectedAll = !this.isSelectedAll
            if (this.isSelectedAll) {
                this.$tsStat.event('cake_gallery', {
                    cake_operate: 'select_all'
                })
            } else {
                this.$tsStat.event('cake_gallery', {
                    cake_operate: 'unselect_all'
                })
            }
            await gallery.onSelectAll(this.galleryUUID, this.isSelectedAll)
        },
        /*
            缩略图组件在加载图片的时候，自动过滤不支持的图片格式并删除,完全清空后，出现此回调
        */
        onHandleEmptytedThumbnail() {
            this.$router.push({
                path: 'importImage',
                params: null
            })
        },

        onSelectionChangedCallback(itemData, firstSelectedItem, presetSuit) {
            console.log(`onSelectionChangedCallback,important.index = ${itemData},firstSelectedItem.index = ${firstSelectedItem && firstSelectedItem.imgIndex}`)
            if (!itemData) {
                this.reminderPresetSelectIndex = 0
                this.myPresetSelectIndex = 0
                return
            }

            const presetSuitId = [PresetSuitIdType.NoEffect, PresetSuitIdType.UnSet].includes(presetSuit.presetSuitId)
                ? presetSuit.presetSuitId
                : presetSuit.lastPresetSuitId

            this.findPresetSuitIndex(presetSuitId)
            this.selectionImageType = itemData.imgFormat
        },

        onRecvThumbnailExtraInfo(itemData){
            let hisData = {}
            if (itemData.hisData) {
                hisData = {
                    red: itemData.hisData.red ? hexToInt(itemData.hisData.red) : [],
                    green: itemData.hisData.green ? hexToInt(itemData.hisData.green) : [],
                    blue: itemData.hisData.blue ? hexToInt(itemData.hisData.blue) : []
                }
            }
            this.onEchartDataUpdate(hisData || {}, itemData.exifInfo, null)
        },

        onEditedCount(editCount,allPhotosCount) {
            this.editCount = editCount
            this.totalCount = allPhotosCount
        },
        // 根据套装预设定位到对应的选中位置
        findPresetSuitIndex(presetSuitId) {
            this.$refs['paletteViewRef'].handleSetCheckedNodes(presetSuitId)
            // 默认0不是默认预设
            this.reminderPresetSelectIndex = 0
            this.myPresetSelectIndex = 0
            if (presetSuitId == null || presetSuitId == undefined) {
                return
            }

            let content = this.$store.state.presetting.recommendPreItems
            let oriPreset = this.$store.state.presetting.oriPreset
            content = [oriPreset].concat(content)

            let recommendIndex = -1
            let index = -1
            for (const presetItem of content) {
                index++
                if (presetSuitId == presetItem.id) {
                    recommendIndex = index
                    break
                }
            }
            if (recommendIndex >= 0) {
                this.reminderPresetSelectIndex = presetSuitId
                this.myPresetSelectIndex = 0
                return
            }

            content = this.$store.state.presetting.preItems
            index = -1
            let myPresetIndex = -1
            for (const presetItem of content) {
                index++
                if (presetSuitId == presetItem.id) {
                    myPresetIndex = index
                    break
                }
            }
            this.myPresetSelectIndex = presetSuitId
            this.reminderPresetSelectIndex = 0
        },
        async onSelectFavouriteClick() {
            this.isSelectedFavourite = !this.isSelectedFavourite
            if (this.isSelectedFavourite) {
                this.$tsStat.event('cake_gallery', {
                    cake_operate: 'select_star'
                })
            } else {
                this.$tsStat.event('cake_gallery', {
                    cake_operate: 'unselect_star'
                })
            }
            await gallery.onSelectFavorites(this.galleryUUID, this.isSelectedFavourite)
        },
        onListStyleChanged(val) {
            this.changeListStyle(val)
            const cake_operate = val == '2' ? 'click_one_view' : 'click_multiple_views'
            this.$tsStat.event('cake_gallery', {
                cake_operate: cake_operate
            })
        },
        // 网格图和单个图的展示效果切换
        changeListStyle(val) {
            if (val == '2') {
                gallery.changeListStyle(this.galleryUUID, false)
            } else {
                gallery.changeListStyle(this.galleryUUID, true)
            }
        },

        //onAppQuit
        listenWhenAppQuit() {
            ipcRenderer.on('onAppQuit', (event, args) => {
                // if (this.isOnLoadPreset)
                {
                    this.tsConfirm({
                        title: '系统提示',
                        message: '有效果正在应用中，请不要退出',
                        showCancelButton: false
                    }).then(_ => {
                    })
                    return
                }
            })
        },

        routerPushPhotoFinishing(thumbData, presetModel, imgIndex) {
            this.isDestroy = true
            let thumbView = this.thumbnailRef()
            if (thumbView) {
                thumbView.onEntryPhotoFinishingView()
            }
            TSImageIOManager.shareInstance().cancellAllLoad()
            TSImageIOManager.shareInstance().cancellAllProcess()

            this._SetActiveThumbnail({
                imgPath: thumbData.originalImagePath,
                imgIndex
            })

            this.$router.push({
                path: 'photoFinishing',
                query: {}
            })
        },
        registerExportClickListener() {
            this.hanlderExportClick = (event, arg) => {
                gallery.onHandlerExportClick(this.galleryUUID)
            }
            eventBus.$on('onExportClick', this.hanlderExportClick)
        },

        notifySelectedIndexChanged() {
            // let importantSelectedItem = TSImageViewStatusManager.shareInstance().importantSelectedItem
            // if (importantSelectedItem && importantSelectedItem.isImportantSelected) {
            // 	// importantSelectedItem.thumbnailModel.presetSuitId = 0
            // 	this.reminderPresetSelectIndex = 0
            // 	this.myPresetSelectIndex = 0
            //
            // 	// if (importantSelectedItem.thumbnailModel) {
            // 	//     this.ACT_UpdateThumbnailByKey({
            // 	//         thumbnailModel: importantSelectedItem.thumbnailModel,
            // 	//         updateKeys: ['presetSuitId']
            // 	//     })
            // 	// }
            // }
        },
        logGaEvent(layoutItem) {
            let val = null
            let keyMap = {
                EnhanceEditColorTemperature: 'temp',
                EnhanceEditHue: 'tone',
                EnhanceEditExposure: 'exposure',
                EnhanceEditContrast: 'contrast',
                EnhanceEditHighlight: 'highlight',
                EnhanceEditShadow: 'shadow',
                EnhanceEditWhite: 'white',
                EnhanceEditBlack: 'black',
                EnhanceEditCameraRawSharpen: 'clarity',
                EnhanceEditSaturation: 'vividness'
            }
            val = keyMap[layoutItem.key]
            this.$tsStat.event('cake_gallery', {
                cake_operate: 'click_color_button',
                cake_feature: val
            })
        },

        async onStepChange(layoutItem, isTemperature) {
            this._SetUpdateTime(new Date())
            this.$refs['paletteViewRef'].handleSetCheckedNodes(0)
            this.logGaEvent(layoutItem[2])
            this.notifySelectedIndexChanged()

            //预设列表设置为不选中
            this.reminderPresetSelectIndex = 0
            this.myPresetSelectIndex = 0

            let [step, isDbClick, layoutInfo, counter] = layoutItem
            let ioQueue = TSImageIOManager.shareInstance().imageIoQueue
            let vmQueue = TSImageIOManager.shareInstance().imageViewModelQueue

            let nextStep = step
            let ratio = isDbClick ? layoutInfo.doubleRatio : layoutInfo.singleRatio
            nextStep = ratio * step * counter

            let paletteIds = []
            let thumbnailIds = []
            let viewModelKeys = []
            const copyMap = new Map()


            for (let vmItem of vmQueue) {
                let viewMd = vmItem[1]
                let key = vmItem[0]
                if (viewMd && viewMd.isSelected) {
                    const { presetSuitId, palettePresetId } = viewMd.thumbnailModel

                    // 统计需拷贝数据
                    if (presetSuitId !== PresetSuitIdType.UnSet) {
                        if (copyMap.has(presetSuitId)) {
                            const temp = copyMap.get(presetSuitId)
                            temp.push(palettePresetId)
                            copyMap.set(presetSuitId, temp)
                        } else {
                            copyMap.set(presetSuitId, [palettePresetId])
                        }

                        viewMd.thumbnailModel.presetSuitId = PresetSuitIdType.UnSet
                        thumbnailIds.push(viewMd.thumbnailModel.id)
                    }

                    // hasNewerCache 等回调后再执行
                    viewMd.hasNewerCache = false
                    viewMd.setIsWaitImageData(true)

                    if (viewMd.thumbnailModel && palettePresetId) {
                        paletteIds.push(palettePresetId)
                        viewModelKeys.push(key)
                    } else {
                        console.error('palettePresetId is null ')
                    }
                }
            }
            if (copyMap.size > 0) {
                await this.ACT_BatchCopyPaletteToSelf(copyMap)
            }

            this.showLoading()

            if (paletteIds && paletteIds.length > 0) {
                let key = ParamFlag[layoutInfo.key]
                let dbKey = PalettePresetCfgModel.initKeyMap().get(key)
                this.ACT_IncreasePalettePreset({ paletteIds, dbKey, nextStep, viewModelKeys })
            }

            if (thumbnailIds && thumbnailIds.length > 0) {
                this.ACT_BatchUpdateThumbnailByKey({
                    ids: thumbnailIds,
                    updateKeys: ['presetSuitId'],
                    data: {
                        presetSuitId: PresetSuitIdType.UnSet
                    }
                })
            }

            this.updatePaletteAndRefresh(true, false)
            this.makeOptStatusChanged()
        },

        // 重置逻辑
        async onResetPaletteCallback(layouts) {
            this._SetUpdateTime(new Date())
            let vmQueue = TSImageIOManager.shareInstance().imageViewModelQueue
            let ioQueue = TSImageIOManager.shareInstance().imageIoQueue

            if (vmQueue.size === 0) return

            const copyMap = new Map()
            const thumbnailIds = []
            const resetIds = []
            let keys = []

            for (let vmItem of vmQueue) {
                let viewMd = vmItem[1]
                let key = vmItem[0]
                let imageIO = ioQueue.get(key)
                if (viewMd && viewMd.isSelected) {
                    viewMd.hasNewerCache = false
                    viewMd.setIsWaitImageData(true)

                    const { presetSuitId, palettePresetId } = viewMd.thumbnailModel

                    // 统计需拷贝数据
                    if (presetSuitId !== PresetSuitIdType.UnSet) {
                        if (copyMap.has(presetSuitId)) {
                            const temp = copyMap.get(presetSuitId)
                            temp.push(palettePresetId)
                            copyMap.set(presetSuitId, temp)
                        } else {
                            copyMap.set(presetSuitId, [palettePresetId])
                        }

                        viewMd.thumbnailModel.presetSuitId = PresetSuitIdType.UnSet
                        thumbnailIds.push(viewMd.thumbnailModel.id)
                    }

                    keys.push(key)
                    resetIds.push(palettePresetId)
                }
            }

            if (copyMap.size > 0) {
                await this.ACT_BatchCopyPaletteToSelf(copyMap)
            }

            if (thumbnailIds && thumbnailIds.length > 0) {
                this.ACT_BatchUpdateThumbnailByKey({
                    ids: thumbnailIds,
                    updateKeys: ['presetSuitId'],
                    data: {
                        presetSuitId: PresetSuitIdType.UnSet
                    }
                })
            }

            // 获取重置初始值
            const tempPaletteVmInstance = new PaletteParamsViewModel({})
            const paramsJson = await this.ACT_GetPalettePreset('-1')
            tempPaletteVmInstance.bindCfgModel(paramsJson)

            const resetResult = tempPaletteVmInstance.resetParams(layouts.map(layout => layout.alias != null ? layout.alias : layout.key))
            this.ACT_BatchUpdatePalettePreset({
                ids: resetIds,
                data: resetResult,
                keys: keys
            })

            this.reminderPresetSelectIndex = 0
            this.myPresetSelectIndex = 0

            this.showLoading()
            this.updatePaletteAndRefresh(true, false)
            this.makeOptStatusChanged()
        },

        async updatePaletteAndRefresh(needLoadCfg, needApplyEffect = true) {
            let vmQueue = TSImageIOManager.shareInstance().imageViewModelQueue
            let queue = TSImageIOManager.shareInstance().imageIoQueue
            for (let vmItem of vmQueue) {
                let viewMd = vmItem[1]
                let key = vmItem[0]
                if (viewMd && viewMd.isSelected) {
                    if (viewMd.isRawImage() && !viewMd.isSetWbICCAndWbTint()) {// 如果是raw的话，也要判断色温和色调，没有设置成功，不允许保存预设
                        continue
                    }
                    if (needLoadCfg) {
                        if (viewMd.isVisible && viewMd.isSelected) {
                            let imageIo = queue.get(key)
                            if (imageIo) {
                                imageIo.cancelProcess()
                            }
                        }
                    }
                }
            }
            if (needApplyEffect) {
                this.applyEffect(needLoadCfg)
            }
        },

        async importFromFile(args) {
            console.log(`二次从文件的导入:`)
			if (this.isShowingImportDialog){
				return
			}
			this.isShowingImportDialog = true
            const dialog = dialogIpc
            const result = await dialog.showOpenDialog({
                properties: args,
                filters: [{
                    name: 'Images',
                    extensions: this.supportedExtendNames()
                }]
            })
            if (result && result.filePaths && result.filePaths.length == 0) {
				this.isShowingImportDialog = false
                return
            }
            const checkRet = await this.hasReadWritePermission(result.filePaths)

            if (checkRet.result == PermissionRetCode.OK) {
                await this.secondImportFiles(result.filePaths)
            }
			this.isShowingImportDialog = false
		},
        async secondImportFiles(paths) {
            const checkRet = await this.hasReadWritePermission(paths)
            if (checkRet.result !== PermissionRetCode.OK) {
                this.toastNoReadWritePermission(checkRet)
                return
            }

            await this.checkAndImportImages(paths, true, (thumbnailCount) => {
                gallery.handlerAfterSecondImport(this.galleryUUID)
                this.tsNotify({
                    message: `已导入${thumbnailCount}张图片`
                })
            }, progress => {
                if (progress.status === ImportProgressStatus.Start) {
                    this.showImportProgress = true
                }
                this.importProgress = progress
            })
            this._SetLastProjectUpdateTime(new Date())
        },
        // 支持拖拽导入
        async onDropHanlder(filePaths) {
            let files = this.getDropPaths()
            let paths = []
            for (let file of files) {
                let fp = file.path
                paths.push(fp)
            }
            await this.secondImportFiles(paths)
        },
        setNeedCreateMainFragmentTag(from, to) {
            if (from.name == 'index' || from.name == "importImage") {
                this.needCreateMainFragment = true
            } else {
                this.needCreateMainFragment = false
            }
        },
        async doWhenLeave(from, to) {
            console.log('doWhenLeave from : ' + from.name, " to : " + to.name)
            let ret;
            if (to.name == 'index' || to.name == 'Login') {
                ret = await gallery.hideGalleryFragment(this.galleryUUID)
                await ipcRenderer.send('on-main-fragment-unmount', {})
            } else {
                // if (to.name !== 'batchRetouch' && to.name !== 'photoFinishing'){
                // }
               ret = await gallery.hideGalleryFragment(this.galleryUUID)
            }
            console.log("doWhenLeave result " + JSON.stringify(ret))
        }
    },
    beforeCreate() {
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm._SetEntryProjectCache(to.name)
            vm.setNeedCreateMainFragmentTag(from, to)
        })
    },
    async beforeRouteLeave(to, from, next) {
        if (!this.canDestroy) {
            console.log('not load view finish')
            return
        }
        await this.doWhenLeave(from, to)
        this.isFirstTime = true
        // 退出当前页面更新需要重做的标志
        if (this.isOnLoadPreset) {
            this.tsConfirm({
                title: '系统提示',
                message: '有效果正在应用中，请不要退出',
                showCancelButton: false
            }).then(_ => {
                next()
            })
            return
        }
        next()
    },
    async mounted() {
        this.canDestroy = false
        gallery.addListener('signalSelects', param => {
            let { isSelectedAll, hasSelectedFavorites } = param
            this.isSelectedAll = isSelectedAll
            this.isSelectedFavourite = hasSelectedFavorites
        })
        gallery.addListener('signalSelectionChanged', this.onSelectionChangedCallback)
        gallery.addListener('signalClearGallery', this.onHandleEmptytedThumbnail)
        gallery.addListener('signalStarClick', this.onStarClick)
        gallery.addListener('signalEditedCount', this.onEditedCount)
        gallery.addListener('signalRotate', this.onItemRotated)
        gallery.addListener('signalThumbnailExtraInfo',this.onRecvThumbnailExtraInfo)

        MemoryMonitor.shareInstance().addObject(this)
        // 提示导入图片张数
        if (this.$route.query.imageFilePaths && this.$route.query.imageFilePaths.length > 0 && this.$route.query.isfromHome === true) {
            this.tsNotify({
                message: `已导入${this.$route.query.imageFilePaths.length}张图片`
            })
        }
        eventbus.$on('onNavImportImage', debounce(async (args) => {
            ShortcutHelper.getInstance().unRegisterShortcut()
            await this.importFromFile(args)
            ShortcutHelper.getInstance().registerShortcut()
        }, 20))

		eventbus.$on('onManualImportClick', debounce(async (args) => {
			await this.onManualImportClick(args)
		}, 20))

        eventbus.$on('initloadBatchRetouch', debounce(() => {
            this.isFirstTime = true
            this.loadImages()
        }, 20))
        this.isFirstTime = true
        //
        let userId = this.$store.state.user.userId

        this.loadAllPresents(
            {
                userId: userId
            }
        ).then(res => {
        }).catch(e => {
            this.tsNotify({
                type: 'error',
                message: e.message
            })
        })

        try {
            await this.loadImages()
        } catch (err) {
            console.error('==> loadImages', err)
        }

        let imgIndex = this.getSelectedImgIndex
        if (imgIndex) {
            imgIndex = Math.ceil(imgIndex / this.columns)
            this._SetSelectedImgIndex(null)
        }

    },
    beforeDestroy() {
        this.isDestroy = true;
        if (this.hanlderExportClick) {
            eventBus.$off('onExportClick', this.hanlderExportClick)
        }
        eventbus.$off('onNavImportImage', null)
        eventbus.$off('initloadBatchRetouch', null)
		eventbus.$off('onManualImportClick', null)

		gallery.removeListener('signalSelects')
        gallery.removeListener('signalSelectionChanged')
        gallery.removeListener('signalClearGallery')
        gallery.removeListener('signalStarClick')
        gallery.removeListener('signalEditedCount')
        gallery.removeListener('signalRotate')
        gallery.removeListener('signalOnDropStart')
        gallery.removeListener('signalThumbnailExtraInfo')
    }
})
</script>
<style lang="scss" scoped>
@import "../../assets/theme/common/pages/batch-retouch.scss";
</style>
