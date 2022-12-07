<template>
    <div class="wrap"
         @drop="onDropImageFiles"
         @dragover.prevent.stop @dragenter.prevent.stop
    >
        <div class="topLeftItem">
            <el-divider direction="vertical"></el-divider>
            <zoom-button-group
                v-model="fitRatio"
                :disabled-quick-button="isInCropNav"
                :show-all-scale="showAllScale"
                @on-slider="onZoomSlider"
                @on-resize="imageResize"
            />
            <el-divider direction="vertical"></el-divider>

            <el-button
                v-show="!isInCropNav"
                v-blur
                size="mini"
                class="btn-icon"
                :class="{ 'active': isDragging && !showLiquefy }"
                @click="handleClickDrag">
                <svg-icon icon-class="drag" class-name="ts-icon drag-icon" style="pointer-events: none"/>
            </el-button>

            <el-tooltip
                effect="light"
                content="手动液化"
                placement="bottom"
                :visible-arrow="false"
                popper-class="title-tip">
                <el-button
                    v-blur
                    size="mini"
                    class="btn-icon"
                    :class="{ 'active': showLiquefy }"
                    :disabled="!imageState.effectLoaded || isInCropNav || showPainter || (isInColorNav && isOnlyPaletteEffect)"
                    @click="handleUseLiquefyMode">
                    <svg-icon icon-class="liquefy" class-name="ts-icon liquefy-icon" style="pointer-events: none"/>
                </el-button>
            </el-tooltip>
        </div>

        <ts-progress
            class="custom-top-progress"
            :disabled="disabledProgress"
            :value="imageState.loading"
        />

        <div
            id="guide__first_apply-preset-suit-btn"
            class="Image-canvas-container"
            :class="{
                'fullscreen': isFullScreenPreview,
                'grab-active': isDragging,
                'grabbing': containerMouseDown,
                'hidden-cursor': !isDragging && (showPainter || showLiquefy)
            }"
            @mousedown="containerMouseDown = true"
            @mouseup="containerMouseDown = false">

            <CostTime
                v-if="!costTimeObj.costIsPro"
                :costTimeData="costTimeObj.costTimeData"
                :costLastTime="costTimeObj.costLastTime"
                :costNewTime="costTimeObj.costNewTime"
            />

            <div
                class="fixed-bottom-container"
                :style="{ 'z-index': 999 }"
                @keydown.prevent>
                <div class="exit-preview-btn-box global__backdrop-filter" v-if="isFullScreenPreview">
                    <SpinLoading
                        hidden-background
                        :show="imageState.loading"
                        :loading="imageState.loading"
                        :text="imageState.loading ? '效果预览加载中...' : '已显示全部效果'"
                    />

                    <el-button
                        v-blur
                        size="mini"
                        class="exit-preview-btn"
                        @mouseenter.native="stopMousePropagation(true)"
                        @mouseleave.native="stopMousePropagation(false)"
                        @click="handleExitPreview">
                        退出预览
                    </el-button>
                </div>

                <template v-else-if="isInColorNav">
                    <el-popover
                        width="200px"
                        placement="top"
                        trigger="manual"
                        popper-class="preview-all-effect-tip"
                        :value="showPaletteUpdateGuide">

                        <div class="palette__guide">
                            <p class="palette__guide-title">
                                🎉 实时调色功能来了！
                                <i class="el-icon-close" @click.prevent="cacheHiddenEffectTip"></i>
                            </p>

                            <div class="palette__guide-content">
                                <p>您可根据实际操作选择不同模式：</p>
                                <p>1. 全效果模式下，调色速度较慢 🐢。可展示全部效果。</p>
                                <p>2. 调色模式下，可实时调色 ⚡️。仅展示色彩效果，非色彩效果暂时隐藏。</p>
                            </div>

                            <p style="text-align: right">
                                <el-link
                                    size="mini"
                                    type="primary"
                                    class="global__color-system"
                                    style="font-size: 12px"
                                    :underline="false"
                                    @click.prevent="cacheHiddenEffectTip">
                                    知道了
                                </el-link>
                            </p>
                        </div>

                        <el-radio-group
                            v-show="!showLiquefy"
                            slot="reference"
                            size="mini"
                            class="ts-custom__radio-group"
                            v-model="isOnlyPaletteEffect"
                            @mouseenter.native="stopMousePropagation(true)"
                            @mouseleave.native="stopMousePropagation(false)">
                            <el-radio-button class="radio-button" :label="false">全效果模式</el-radio-button>
                            <el-radio-button class="radio-button" :label="true">
                                <el-popover
                                    width="200px"
                                    placement="top"
                                    trigger="manual"
                                    popper-class="preview-all-effect-tip"
                                    :value="showHiddenEffectTip && !showPaletteUpdateGuide">
                                    <p style="text-align: center">色彩调节期间，将临时关闭其他效果</p>
                                    <div slot="reference" class="radio-button-text">
                                        调色模式
                                        <el-popover
                                            width="200px"
                                            placement="top"
                                            trigger="hover">
                                            <div class="palette-mode-tip">
                                                <p>全效果模式：展示全部效果，调色速度较慢；</p>
                                                <p>调色模式：可实时调色，非色彩效果暂时隐藏</p>
                                            </div>
                                            <i class="ts-icon-question-outside" slot="reference"></i>
                                        </el-popover>
                                    </div>
                                </el-popover>
                            </el-radio-button>
                        </el-radio-group>
                    </el-popover>
                </template>

                <el-tooltip
                    v-show="!isFullScreenPreview && !isInCropNav"
                    ref="space-tooltip"
                    effect="dark"
                    popper-class="compare__image-hot-key-tip"
                    :hide-after="1500"
                    placement="top-end">
                    <div slot="content" class="hot-key-content">
                        <img
                            class="img"
                            :src="require($isMac
                            ? '@/assets/images/tips_png_keyboard_mac@3x.png'
                            : '@/assets/images/tips_png_keyboard_windows@3x.png')"
                            alt="">
                        <p class="label">长按进行对比，快捷键：~</p>
                    </div>
                    <el-button
                        size="small"
                        tabindex="-1"
                        type="default"
                        ref="btn-switch"
                        class="btn-icon global__backdrop-filter"
                        @mouseenter.native="stopMousePropagation(true)"
                        @mouseleave.native="stopMousePropagation(false)"
                        @click="PointZoomCompare('bottom')"
                        @mouseup.native="photoCompare('up')"
                        @mousedown.native="photoCompare('down')">
                        <img
                            class="img"
                            :src="$getIconPath('toolbar_button_compared@3x.png')"
                            style="pointer-events: none"
                            alt="">
                    </el-button>
                </el-tooltip>
            </div>

            <template v-if="!isFullScreenPreview">
                <SpinLoading
                    fixed
                    style="bottom: 16px; left: 7.5px"
                    :show="imageState.loading"
                    :text="loadingText"
                />

                <template v-if="user.waterMark !== 3">
                    <div class="watermark-tip" v-show="!imageState.loading">
                        <i class="el-icon-warning-outline"></i>
                        {{ $t('pagePhotoFinishing.watermarkTip') }}
                    </div>
                </template>

                <div class="claImageName">{{ imageName }}</div>
            </template>
        </div>

        <div class="all-tool-area" v-show="!isFullScreenPreview">
            <right-params-view
                v-show="[RefineNavName.Beauty, RefineNavName.Palette, RefineNavName.Background].includes(activeNavName)"
                ref="right-params-view"
                :active-nav-name="activeNavName"
                :refineUUID="refineUUID"
                :isDestroy="isDestroy"
                :get-params-json="getParamsJson"
                @onApplyPresetCallback="onApplyPresetClick"
                @onChangeFaceDataCallback="reloadProcessImage('face')"
                @on-change-color-slider="onChangeColor"
                @on-change-beautify-change="onChangeBeautify"
                @on-reset-params="resetRemoveDefectivePaintMask"
            >
                <template slot="histogram">
                    <Histogram
                        ref="tsHistogram"
                        :width="300"
                        :chartData="histogramData.chartData || {}"
                        :imageInfo="histogramData.imageInfo || {}">
                    </Histogram>
                </template>
                <template slot="painter">
                    <el-button
                        type="text"
                        class="ts-icon-painter-button"
                        :disabled="!imageState.allowPainter"
                        v-gtag-event="PointClickSmear"
                        @click.stop="usePainterTool"
                    >
                        <el-tooltip
                            effect="light"
                            content="手动涂抹"
                            placement="bottom"
                            :visible-arrow="false"
                            popper-class="title-tip">
                            <i
                                class="ts-icon-painter"
                                :class="{
                                    'active': !imageState.paintRemoveDefectiveMaskIsEmpty,
                                    disabled: !imageState.allowPainter
                                }">

                            </i>

                        </el-tooltip>
                    </el-button>
                </template>
            </right-params-view>

            <ts-drawer
                class="opt-record"
                width="300px"
                direction="rtl"
                :value="activeNavName === 'history'">
                <ThumbOptRecordView
                    :is-show="activeNavName === 'history'"
                    :photo-control-func="photoControlInfo"
                />
            </ts-drawer>

            <ts-drawer
                class="opt-record"
                width="300px"
                direction="rtl"
                :value="activeNavName === 'crop'">
                <crop-panel
                    :rotate="cropConfig.rotate"
                    @on-rotate="handleRotate"
                    @on-flip="handleFlip"
                    @on-crop-change="handleCrop"
                    @on-crop-reset="handleResetCrop">
                    <template #bottom>
                        <el-button
                            style="width: 100%"
                            type="primary"
                            size="mini"
                            class="btn system-theme"
                            @click="clickFinishCropBtn">
                            确认
                        </el-button>
                    </template>
                </crop-panel>
            </ts-drawer>
        </div>

        <refine-nav-bar
            class="params-group"
            :before-change="beforeRefineNavBarChange"
            :ban-shortcut="showPainter"
            :image-loading="imageState.loading"
            :image-init="imageState.init"
            v-model="activeNavName"
        />

        <ts-drawer
            width="345px"
            v-model="showPainter"
            direction="rtl">
            <defect-panel
                v-if="showPainter"
                :showResetMaskBtn="showResetMaskBtn"
                :historyList="painterHistoryList"
                @change-tool="switchDefectTool"
                @change-history="onChangeHistory"
                @on-reset-painter="resetPainterRecord">
                <div slot="bottom" class="operation-panel-bottom">
                    <el-button
                        size="mini"
                        class="btn"
                        v-gtag-event="PointClickSmearCancel"
                        @click="setRemoveDefectivePaintMask('cancel')">
                        取消
                    </el-button>

                    <el-button
                        size="mini"
                        class="btn"
                        :disabled="imageState.loading"
                        v-gtag-event="PointClickPreservation"
                        @click="setRemoveDefectivePaintMask('save')">
                        保存
                    </el-button>
                </div>
            </defect-panel>
        </ts-drawer>

        <ts-drawer
            width="345px"
            v-model="showLiquefy"
            direction="rtl">
            <liquefy-panel
                v-if="showLiquefy"
                :historyList="liquefyHistoryList"
                :show-reset-btn="showLiquefyResetBtn"
                @change-history="onChangeLiquefyHistory"
                @on-reset="handleResetLiquefy">
                <div slot="bottom" class="operation-panel-bottom">
                    <el-button
                        size="mini"
                        class="btn"
                        @click="[handleFinishLiquefyMode('cancel'), PointLiquefactionCancel()]">
                        取消
                    </el-button>

                    <el-button
                        size="mini"
                        class="btn"
                        @click="[handleFinishLiquefyMode('save'), PointLiquefactionConfirm()]">
                        确认
                    </el-button>
                </div>
            </liquefy-panel>
        </ts-drawer>

        <liquefy-drawer
            :value="showLiquefy && !hideLiquefyTool"
            @change-tool="switchLiquefyTool"
            @before-close="(done) => [handleFinishLiquefyMode('save'), done()]"
            @mouseenter.native="stopMousePropagation(true)"
            @mouseleave.native="stopMousePropagation(false)"
        />

        <feedback-dialog
            :show-feedback-dialog.sync="showFeedbackDialog"
            :feedbackDialog_viewModel.sync="feedbackDialog_viewModel"
        />
        <importProgressDialog
            @mousedown.native.stop
            :status="importProgress.status"
            :data="importProgress"
            v-model="showImportProgress"
            :importName="myImportName"
            @onCancelled="handleCancelImport"
        >
        </importProgressDialog>

        <delete-progress-dialog
            :status="deleteProgress.status"
            :data="deleteProgress"
            v-model="showDeleteProgress">
        </delete-progress-dialog>
    </div>
</template>

<script>

import refine, { RefineListenerEvent } from '@/qt-ipc/business/refine'
import nodePath from '@/qt-ipc/path'

import {
    defineComponent,
    watch,
    ref,
    getCurrentInstance,
    computed,
    onMounted,
    onUnmounted
} from 'vue'
import store from '@/store'

import { mapActions, mapMutations } from 'vuex'

import { ImportProgressStatus } from '@/constants'

import toast from '@/mixins/toast'
import thumbnail from '@/mixins/thumbnailMixin'
import button from '@/mixins/button'
import tsFileImport, { PermissionRetCode } from '@/mixins/tsFileImport'
import pointsMixin from '@/mixins/pointsMixin'

import { debounce } from 'lodash'
import eventbus from '@/utils/eventbus'
import { MemoryMonitor } from '@/utils/monitor/memoryMonitor'
import ShortcutHelper from '@/utils/Shortcut/ShortcutHelper'

import { Progress, Slider, Divider, Tooltip, Popover, Link, ButtonGroup, Button } from 'element-ui'
import Histogram from '@/views/BatchRetouch/Palette/Histogram'
import RightParamsView from './RightParamsView'
import FeedbackDialog from '@/views/PhotoFinishing/Components/feedbackDialog'
import SpinLoading from '@/views/PhotoFinishing/Components/SpinLoading'
import ZoomButtonGroup from './Components/zoom-button-group'
import TsProgress from '@/components/TsProgress'
import { dialogIpc, FeedBack_key } from 'qt/dialog/DialogIpcImpl'
import TsDrawer from '@/components/TsDrawer'
import DefectPanel from '@/views/PhotoFinishing/Components/ToolPanel/DefectPanel'
import usePainterRepositories from '@/views/PhotoFinishing/Composables/usePainterRepositories'
import ThumbOptRecordView from '@/views/PhotoFinishing/Components/ThumbOptRecordView'
import useGetQtViewRepositories from '@/views/PhotoFinishing/Composables/useGetQtViewRepositories'

import CostTime from '@/views/PhotoFinishing/Components/CostTime'

import RefineNavBar from '@/views/PhotoFinishing/RefineNavBar'
import usePhotoControlRepositories from '@/views/PhotoFinishing/Composables/usePhotoControlRepositories'
import CropPanel from '@/views/PhotoFinishing/Components/ToolPanel/CropPanel'
import LiquefyPanel from '@/views/PhotoFinishing/Components/ToolPanel/LiquefyPanel'

import useCropRepositories from '@/views/PhotoFinishing/Composables/useCropRepositories'
import useFocusAndBlurRepositories from '@/composables/useFocusAndBlurRepositories'
import useBatchDeleteRepositories from '@/composables/business/useBatchDeleteRepositories'

import deleteProgressDialog from '@/views/BatchRetouch/components/deleteProgressDialog.vue'
import usePaletteRepositories from '@/views/PhotoFinishing/Composables/usePaletteRepositories'
import useRefinePointsRepositories from '@/composables/points/useRefinePointsRepositories'
import { RefineNavName } from '@/constants/refine'
import useNavbarRepositories from '@/views/PhotoFinishing/Composables/useNavbarRepositories'
import useLiquefyRepositories from '@/views/PhotoFinishing/Composables/useLiquefyRepositories'
import { PreviewMode } from '@/view-model/photo-control'
import LiquefyDrawer from '@/views/PhotoFinishing/Components/ToolPanel/LiquefyDrawer'

export default defineComponent({
    name: 'PhotoFinishing',

    mixins: [
        toast,
        thumbnail,
        button,
        tsFileImport,
        pointsMixin,
        // painterMixin
    ],

    components: {
        LiquefyDrawer,
        'el-button': Button,
        'el-button-group': ButtonGroup,
        'el-progress': Progress,
        'el-slider': Slider,
        'el-divider': Divider,
        'el-tooltip': Tooltip,
        'el-popover': Popover,
        'el-link': Link,
        'ts-drawer': TsDrawer,
        CostTime,
        FeedbackDialog,
        SpinLoading,
        RightParamsView,
        Histogram,
        ZoomButtonGroup,
        TsProgress,
        DefectPanel,
        ThumbOptRecordView,
        RefineNavBar,
        CropPanel,
        'liquefy-panel': LiquefyPanel,
        'delete-progress-dialog': deleteProgressDialog
    },

    props: {},

    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.setNeedCreateMainFragmentTag(from, to)
            store.commit('project/_SetEntryProjectCache', to.name)
        })
    },

    beforeRouteLeave(to, from, next) {
        if (this.showPainter) {
            this.painterCloseConfirm()
            return
        }
        if (!this.canDestroy) {
            console.log('not load view finish')
            return
        }

        this.isDestroy = true

        // const { name } = to
        //回到工作台则释放全局资源
        this.doWhenLeave(from, to)

        store.commit('changeAgeSexReviseEffectData', {
            configJsonStr: '',
            toningJsonStr: '',
            thumbnailId: -1,
            ageSexReviseData: ''
        })
        next()
    },

    setup() {
        const that = getCurrentInstance().proxy
        MemoryMonitor.shareInstance().addObject(that)

        const isDestroy = ref(false)
        onUnmounted(() => isDestroy.value = true)

        const userId = computed(() => store.getters.userId)
        const user = computed(() => store.getters.user)
        const activeProject = computed(() => store.getters['project/activeProject'])
        const imageName = ref('')
        const activeThumbnailPath = computed(() => store.getters['thumbnail/activeThumbnailPath'])
        watch(activeThumbnailPath, async (val) => {
            if (activeThumbnailPath.value) {
                imageName.value = await nodePath.basename(val)
            }
        })

        // loading状态
        const disabledProgress = ref(true)

        // 获取qt视图
        const {
            refineUUID,
            doWhenLeave,
            canDestroy,

            isDragging,
            updateDragStatus,

            loadQtView,
            isFullScreenPreview,
            handleFullPreview,
            setNeedCreateMainFragmentTag,
        } = useGetQtViewRepositories(isDestroy)
        // ——————————————————————————————

        // 仅查看色彩预览功能
        const isOnlyPreviewPaletteInNav = computed(() => isOnlyPaletteEffect.value && activeNavName.value === RefineNavName.Palette)
        // 初始化PhotoControl及监听
        const {
            photoControl,
            imageState,
            fitRatio,
            showAllScale,
            histogramData,

            costTimeObj,

            addThumbnailChangeListener,
            removeThumbnailChangeListener,
            reloadProcessImage
        } = usePhotoControlRepositories(isDestroy, refineUUID, {
            isOnlyPreviewPalette: isOnlyPreviewPaletteInNav,
            beforeThumbnailChange: () => {
                isInCropNav.value && finishCrop()
                showLiquefy.value && handleFinishLiquefyMode('cancel')
            }
        })
        // ——————————————————————————————

        onMounted(async () => {
            addThumbnailChangeListener()
            loadQtView(activeProject.value.id, userId.value)
        })
        onUnmounted(removeThumbnailChangeListener)


        // 反馈弹窗监听
        onMounted(() => dialogIpc.addListener(FeedBack_key, that?.onFeedbackItemClick))
        onUnmounted(() => dialogIpc.removeListener(FeedBack_key))

        // 监听左侧栏图片选择事件
        const onSelectionChangedCallback = (data) => {
            store.commit('thumbnail/_SetThumbSelection', data)
        }
        onMounted(() => refine.addListener(RefineListenerEvent.SignalSelectionChanged, onSelectionChangedCallback))
        onUnmounted(() => {
            onSelectionChangedCallback([])
            refine.removeListener(RefineListenerEvent.SignalSelectionChanged)
        })

        // 空格键监听
        onMounted(() => {
            refine.addListener(RefineListenerEvent.SignalKeydownSpace, (keydown) => {
                if (showLiquefy.value || showPainter.value || isInCropNavbar.value) {
                    isDragging.value = keydown
                }
            })
        })
        onUnmounted(() => refine.removeListener(RefineListenerEvent.SignalKeydownSpace))

        // 更新config中的previewSize
        // 更新previewSize
        const onSignalUpdatePreviewSize = (data) => {
            store.commit('config/updateConfigPreviewSize', data)
        }
        onMounted(() => refine.addListener(RefineListenerEvent.SignalUpdatePreviewSize, onSignalUpdatePreviewSize))
        onUnmounted(() => refine.removeListener(RefineListenerEvent.SignalUpdatePreviewSize))

        // 导航模块
        const { activeNavName, restoreNavbar, isInCropNavbar, beforeRefineNavBarChange } = useNavbarRepositories((fromKey, toKey) => {
            // 退出裁剪导航
            if (fromKey === RefineNavName.Crop) {
                finishCrop()
            }

            // 进入裁剪导航
            if (toKey === RefineNavName.Crop) {
                useCropTool()
            }

            // 进入调色导航
            if (toKey === RefineNavName.Palette && isOnlyPaletteEffect.value) {
                checkIsShowHiddenEffectTip(true)
                reloadProcessImage(PreviewMode.OnlyPreviewPalette)
            }

            if (fromKey === RefineNavName.Palette && isOnlyPaletteEffect.value) {
                reloadProcessImage(PreviewMode.PreviewAll)
            }
        })

        // 调色模块
        const {
            isInColorNav,
            isOnlyPaletteEffect,
            showHiddenEffectTip,
            showPaletteUpdateGuide,
            checkIsShowHiddenEffectTip,
            cacheHiddenEffectTip
        } = usePaletteRepositories(photoControl, activeNavName)

        // ——————————————————————————————

        // 裁剪模块
        const {
            cropConfig,
            useCropTool,
            finishCrop,
            handleRotate,
            handleResetCrop,
            handleFlip,
            handleCrop,
        } = useCropRepositories(photoControl, {
            beforeOpenMode: () => {
                if (isInColorNav.value && isOnlyPaletteEffect.value) {
                    isOnlyPaletteEffect.value = false
                }
                updateDragStatus(false)
            },
            beforeCloseMode: () => {
                updateDragStatus(true)
                restoreNavbar()
            }
        })
        const isInCropNav = computed(() => RefineNavName.Crop === activeNavName.value)

        // ——————————————————————————————

        // 涂抹模式
        const {
            showPainter,
            showResetMaskBtn,
            painterHistoryList,
            resetPainterRecord,
            setRemoveDefectivePaintMask,
            painterCloseConfirm,
            openPainterMode,
            switchDefectTool,
            onChangeHistory
        } = usePainterRepositories(photoControl, isDestroy, {
            beforeOpenMode: () => updateDragStatus(false),
            beforeCloseMode: () => updateDragStatus(true),
        })
        // ——————————————————————————————

        // 液化模式
        const {
            hideLiquefyTool,
            showResetBtn: showLiquefyResetBtn,
            showModePanel: showLiquefy,
            historyList: liquefyHistoryList,
            handleUseLiquefyMode,
            handleFinishLiquefyMode,
            switchLiquefyTool,
            onChangeLiquefyHistory,
            handleReset: handleResetLiquefy
        } = useLiquefyRepositories(photoControl, isDestroy, {
            beforeOpenMode: () => updateDragStatus(false),
            beforeCloseMode: () => updateDragStatus(true)
        })
        // ——————————————————————————————

        const { stopMousePropagation } = useFocusAndBlurRepositories()
        const { PointPreviewClick, PointPreviewExit, PointLiquefactionCancel, PointLiquefactionConfirm } = useRefinePointsRepositories()

        const isNeedDisableHeadView = computed(() => showPainter.value || isInCropNavbar.value || showLiquefy.value)
        watch(isNeedDisableHeadView, (val) => store.commit('refine/_SetIsDisableHeadView', val))

        const handleClickDrag = () => {
            if (showLiquefy.value) {
                handleFinishLiquefyMode('save')
                return
            }
            updateDragStatus(!isDragging.value)
        }

        const loadingText = computed(() => {
            if (showPainter.value) {
                return '正在处理涂抹数据中...'
            }

            if (showLiquefy.value) {
                return '正在初始化液化数据中...'
            }

            return imageState.loadingText ? imageState.loadingText : '正在处理...'
        })

        return {
            RefineNavName,

            handleClickDrag,

            showLiquefy,
            hideLiquefyTool,
            showLiquefyResetBtn,
            liquefyHistoryList,
            handleFinishLiquefyMode,
            handleUseLiquefyMode,
            switchLiquefyTool,
            onChangeLiquefyHistory,
            handleResetLiquefy,

            isOnlyPaletteEffect,
            showHiddenEffectTip,
            showPaletteUpdateGuide,
            cacheHiddenEffectTip,

            ...useBatchDeleteRepositories(),

            activeNavName, // 导航菜单
            isInColorNav, // 预览视图
            isInCropNav,
            isFullScreenPreview, // 全屏预览

            handleExitPreview: () => {
                handleFullPreview(false)
                stopMousePropagation(false)
                PointPreviewExit()
            },
            handlePreviewAll: () => {
                handleFullPreview(true)
                stopMousePropagation(false)
                PointPreviewClick()
            },

            photoControl,
            beforeRefineNavBarChange,

            cropConfig,
            handleRotate,
            handleFlip,
            handleCrop,
            handleResetCrop,
            clickFinishCropBtn: () => finishCrop(),

            resetRemoveDefectivePaintMask: (type) => {
                if (type === 'removeDefects') {
                    photoControl.value?.resetRemoveDefectivePaintMask()
                }
            },

            isDestroy,

            refineUUID,
            canDestroy,
            doWhenLeave,
            setNeedCreateMainFragmentTag,

            user,
            imageName,
            imageState,
            loadingText,

            costTimeObj,
            disabledProgress,
            isDragging,
            updateDragStatus,
            showResetMaskBtn,

            containerMouseDown: ref(false),

            histogramData,

            fitRatio,
            showAllScale,
            onZoomSlider: (value) => photoControl.value?.changeRatio(value),
            imageResize: (mode) => photoControl.value?.imageResize(mode), // 放大缩小按钮
            photoCompare: (mode) => photoControl.value?.compare(mode),

            onApplyPresetClick: (data) => photoControl.value?.onApplyPresetClick(data),
            onChangeColor: (data, realtime = false, ext) => photoControl.value?.onChangeColor(data, !!realtime, ext),
            onChangeBeautify: (data, realtime = false, ext) => photoControl.value?.onChangeBeautify(data, !!realtime, ext),
            reloadProcessImage: (type) => photoControl.value?.reloadProcessImage(type),

            showPainter,
            painterHistoryList,
            setRemoveDefectivePaintMask: (mode) => setRemoveDefectivePaintMask(mode, true),
            resetPainterRecord,
            usePainterTool: openPainterMode,
            painterCloseConfirm,
            switchDefectTool,
            onChangeHistory,

            stopMousePropagation,
            photoControlInfo: () => {
                return photoControl.value?.getPhotoControlInfo()
            },

            getParamsJson: () => {
                if (photoControl.value) {
                    return photoControl.value.getParamsJson()
                }
                return { beautifyJson: null, paletteJson: null }
            },

            PointLiquefactionCancel,
            PointLiquefactionConfirm
        }
    },

    data() {
        return {
            isShowingImportDialog :false,
            changeShortcutHelper: true,
            showFeedbackDialog: false,
            feedbackDialog_viewModel: null,
            importStatusWatchSymbol:null
        }
    },
    async mounted() {
        this.$root.checkDiskSpaceIfNeed(() => {
        }).then(isNoSpace => {
        })

        this.registerSecondImportEvent(true)
    },
    beforeMount() {
    },

    methods: {
        ...mapMutations('project', [
            '_SetLastProjectUpdateTime'
        ]),

        ...mapMutations('thumbnail', [
            '_SetSelectedImgIndex',
            '_SetActiveThumbnail'
        ]),

        ...mapActions('thumbnail', [
            'ACT_GetThumbnails'
        ]),
        onShowMultipleGuide() {
            this.$refs['leftImageViewRef'].onShowMultipleGuide()
        },
        onHideMultipleGuide() {
            this.$refs['leftImageViewRef'].onHideMultipleGuide()
        },

        thumbnailRef() {
            let leftRef = this.$refs.leftImageViewRef
            if (!leftRef) return null
            return leftRef.$children[0]
        },

        /**
         * 二次导入相关的逻辑
         * @param index
         */
        thumbViewScrollToIndex(index) {
            if (index < 0) {
                return
            }
            this.thumbnailRef().$refs.recycleViewRef.scrollToItem(index)
        },

        async secondImportFiles(filePaths) {
            if (!filePaths || filePaths.length == 0) {
                return
            }
            await this.checkAndImportImages(filePaths, true, (thumbnailCount) => {
                refine.handlerAfterSecondImport(this.refineUUID)
                this.tsNotify({
                    message: `已导入${thumbnailCount}张图片`
                })
            }, progress => {
                if (progress.status === ImportProgressStatus.Start) {
                    this.showImportProgress = true
                }
                this.importProgress = progress
            })
        },
        //问题反馈上报
        onFeedbackItemClick(thumbnailViewModel) {
            this.showFeedbackDialog = true
            this.feedbackDialog_viewModel = thumbnailViewModel
        },
        //feedback弹窗关闭或开启，开启或关闭全局快捷键
        callChangeShortcutHelper(Boolean) {
            this.changeShortcutHelper = Boolean
        },

        async onDropImageFiles(e) {
            let files = this.getDropPaths()
            let paths = []
            for (let file of files) {
                let fp = file.path
                paths.push(fp)
            }

            const checkRet = await this.hasReadWritePermission(paths)
            if (checkRet.result !== PermissionRetCode.OK) {
                this.toastNoReadWritePermission(checkRet)
            }

            await this.secondImportFiles(paths)
            this._SetLastProjectUpdateTime(new Date())
        },
        async importFromFile(args) {
        	if (this.isShowingImportDialog){
        		return
            }
            this.isShowingImportDialog = true
            const dialog = dialogIpc
            const result = await dialog.showOpenDialog({
                properties: args
            })
            if (result && result.filePaths && result.filePaths.length === 0) {
            	this.isShowingImportDialog = false
                return
            }

            const checkRet = await this.hasReadWritePermission(result.filePaths)
            if (checkRet.result !== 1) {
                this.toastNoReadWritePermission(checkRet)
                this.isShowingImportDialog = false
                return
            }

            if (result && result.filePaths.length > 0) {
                this.secondImportFiles(result.filePaths)
            }
            this._SetLastProjectUpdateTime(new Date())
            this.isShowingImportDialog = false
        },
        registerSecondImportEvent(isRegist) {
            if (isRegist) {
                eventbus.$on('onNavImportImage', debounce(async (args) => {
                    ShortcutHelper.getInstance().unRegisterShortcut()
                    await this.importFromFile(args)
                    ShortcutHelper.getInstance().registerShortcut()
                }, 20))
                eventbus.$on('onManualImportClick', debounce(async (args) => {
                    await this.onManualImportClick(args)
                }, 20))
            } else {
                eventbus.$off('onNavImportImage', null)
                eventbus.$off('onManualImportClick', null)
            }
        }
    },
    beforeDestroy() {
        this.registerSecondImportEvent(false) // 移除事件
    }
})

</script>

<style lang="scss" scoped>
.wrap {
    position: relative;
    width: 100%;
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: row;

    .custom-top-progress {
        position: absolute;
        top: 0;
        z-index: 1000;
        width: 100%;

        /deep/ .el-progress-bar__outer {
            height: 2px !important;
            background: #181818;
        }
    }

    .topLeftItem {
        position: absolute;
        top: -38px;
        left: 100px;
        display: flex;
        justify-content: center;
        align-items: center;

        .claDivider {
            width: 1px;
            height: 19px;
            background: #545454;
        }

        .btn-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            width: 28px;
            height: 28px;
            border-radius: 4px;
            position: relative;
            margin-right: 12px;

            .drag-icon {
                width: 13px;
                height: 15px;
            }

            .liquefy-icon {
                width: 12px;
                height: 15.5px;
            }

            .ts-icon {
                pointer-events: none;
                opacity: 0.8;
            }

            &.is-disabled {
                .ts-icon {
                    opacity: 0.3;
                }
            }

            &:not(.is-disabled) {
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: rgba(255, 255, 255, 0.85);
                background: #4D4D4D;

                &.active, &:hover {
                    border: 1px solid rgba(255, 255, 255, 0.85) !important;
                    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), rgba(77, 77, 77, 0.5);
                    color: #FFFFFF;

                    .ts-icon {
                        opacity: 1;
                    }
                }
            }
        }
    }

    .Image-canvas-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;

        &:not(.fullscreen) {
            margin-left: 145px;
        }

        &.grab-active {
            &:hover {
                cursor: grab;
            }

            &.grabbing {
                cursor: grabbing;
            }
        }

        &.hidden-cursor:hover {
           cursor: none;
        }

        .claImageName {
            position: absolute;
            font-size: 12px;
            color: #737373;
            font-weight: 400;
            margin: auto;
            text-align: center;
            bottom: 20px;
            z-index: 999;
            display: inline-block;
            min-width: 100px;
            line-height: 17px;
            color: rgba(255, 255, 255, 0.45);
            text-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
        }

        .claImageName {
            left: 50%;
            transform: translateX(-50%);
        }

        .watermark-tip {
            position: absolute;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.45);
            font-weight: 400;
            display: inline-block;
            line-height: 17px;
            left: 15.5px;
            bottom: 20px;
        }

        .fixed-bottom-container {
            position: absolute;
            right: 0;
            bottom: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 16px;
            z-index: 999;

            .btn-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 5px;
                width: 28px;
                height: 28px;
                border-radius: 4px;
                margin-left: 12px;
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: rgba(255, 255, 255, 0.85);
                position: relative;
                background: #4D4D4D;

                .img {
                    pointer-events: none;
                    height: 16px;
                }

                &.active, &:hover {
                    border: 1px solid rgba(255, 255, 255, 0.85) !important;
                    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), rgba(77, 77, 77, 0.5);
                    color: #FFFFFF;
                }
            }

            .exit-preview-btn-box {
                display: flex;
                align-items: center;

                background: rgba(77, 77, 77, 0.5);
                border: 1px solid rgba(255, 255, 255, 0.3);
                backdrop-filter: blur(100px);
                border-radius: 4px;
                height: 28px;

                .exit-preview-btn {
                    background: transparent;
                    border: none;

                    &.active, &:hover {
                        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), rgba(77, 77, 77, 0.5);
                        color: #FFFFFF;
                    }
                }

                .ts-spin-loading {
                    padding: 6px 16px 6px 12px;
                    border-right: 1px solid rgba(255, 255, 255, 0.3);

                    /deep/ .ts-loading-spinner-text {
                        color: rgba(255, 255, 255, 0.85);
                        line-height: 17px;
                    }
                }
            }
        }
    }

    .ts-icon-painter-button {
        border: none;
        width: 16px;
        height: 16px;
        padding: 0;
        margin-left: 10px;
    }

    .ts-icon-painter {
        position: relative;
        width: 16px;
        height: 16px;
        opacity: 0.5;

        &.disabled {
            opacity: 0.5;
        }

        &:not(.disabled) {
            opacity: 0.8;

            &:not(.disabled):hover {
                opacity: 1;
            }
        }

        &.active::before {
            content: " ";
            width: 3px;
            height: 3px;
            position: absolute;
            right: 6px;
            top: 18px;
            background: rgba(255, 255, 255, 0.65);
            border-radius: 2px;
        }
    }

    .all-tool-area {
        width: 300px;
        flex-shrink: 0;
        border-left-width: 1px;
        border-style: solid;
        border-color: #181818;
    }

    .opt-record {
        position: relative;
        height: 100%;
    }

    .params-group {
        width: 44px;
    }
}

.compare__image-hot-key-tip {
    .hot-key-content {
        .img {
            width: 210px;
            height: auto;
        }

        .label {
            text-align: center;
            font-size: 12px;
            color: #D9D9D9;
            font-weight: 400;
            margin-top: 6px;
            line-height: 1;
        }
    }
}

.operation-panel-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 12px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #333333;

    .btn {
        width: 100%;
        margin: 0 4px;
        height: 24px;
        font-size: 12px;

        /deep/ &.el-button {
            padding: 3px 15px;
        }
    }
}

.palette-mode-tip {
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
    color: #A6A6A6;
}

.palette__guide {
    line-height: 17px;
    color: rgba(0, 0, 0, 0.85);

    &-title {
        position: relative;
        font-weight: 500;
        font-size: 14px;
        display: flex;
        justify-content: space-between;

        .el-icon-close {
            &:hover {
                color: #F5D228;
            }
        }
    }

    &-content {
        font-size: 12px;
        margin-right: 20px;
        line-height: 17px;
        margin-top: 8px;

        p + p {
            margin-top: 8px;
        }
    }
}

.ts-custom__radio-group {
    :deep(.el-radio-button__inner) {
        padding: 5px 12px !important;
    }

    .radio-button-text {
        display: flex;
        align-items: center;

        .ts-icon-question-outside {
            margin-left: 4px;
            opacity: 0.3;
        }
    }
}
</style>

<style lang="scss">
.compare__image-hot-key-tip {
    padding: 5px 4px 12px !important;
}

.preview-all-effect-tip.el-popover {
    background: rgba(255, 255, 255, 0.85) !important;
    color: rgba(0, 0, 0, 0.85) !important;
    font-size: 12px !important;
    border: none !important;
    line-height: 17px !important;
    max-width: 260px;
    box-sizing: border-box;

    .popper__arrow {
        border: none !important;

        &::after {
            border-top-color: rgba(255, 255, 255, 0.85) !important;
        }
    }
}
</style>
