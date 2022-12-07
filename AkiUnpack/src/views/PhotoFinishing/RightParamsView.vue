<template>
    <div class="params-bar global__params-bar border-line-style">
        <div class="params-components" ref="paramsComRef">
            <!--            :min="`${splitMinVal}px`"-->
            <!--            :max="`${splitMaxVal}px`"-->
            <split
                :min="`${activeNames.includes('preset') ? splitMinVal : 40}px`"
                :disabled="!activeNames.includes('preset')"
                mode="vertical"
                v-model="splitValue"
                @on-move-end="[splitManualVal = splitValue, PointDragPanel()]"
            >
                <div slot="trigger" class="splitTriggle">
                    <div class="triggleContent"></div>
                </div>

                <el-collapse
                    slot="top"
                    ref="removeTabindex"
                    class="collapse preset-collapse"
                    v-model="activeNames">
                    <el-collapse-item title="预设" name="preset" ref="preset">
                        <template slot="title">
                            <div class="claWtBlanceTitle" @keydown.prevent>
                                <span class="claTitle">预设</span>
                                <div>
                                    <el-button
                                        circle
                                        class="addBtnCla"
                                        icon="el-icon-refresh-right"
                                        @click.stop="[handlResetPreset(), cancelBlur($event)]">
                                    </el-button>
                                    <el-button
                                        circle
                                        class="addBtnCla"
                                        style="margin-right:10px"
                                        icon="el-icon-circle-plus-outline"
                                        v-gtag-event="PointAddPresetIcon"
                                        @click.stop="[handleAddPreset(), cancelBlur($event)]">
                                    </el-button>
                                </div>
                            </div>
                        </template>
                        <div class="guideClass2">
                            <TSPresetTree
                                ref="tSPresetTreeRefs"
                                :height="`${presetHeight}px`"
                                @onItemClick="onApplyPresetClick"
                            />
                        </div>
                    </el-collapse-item>
                </el-collapse>

                <template slot="bottom">
                    <div class="splitBottom guideClass3">
<!--                        <div class="collapse-title" v-show="activeNavName === 'beauty'">-->
<!--                            人像美化-->
<!--                        </div>-->

                        <ul class="person-menu" v-show="activeNavName === RefineNavName.Beauty">
                            <template v-for="person in personList">
                                <li
                                    :key="person.type"
                                    class="person-menu-item"
                                    :class="{ active: currPersonType === person.type }"
                                    v-gtag-event="PointSwitchGender"
                                    @click="currPersonType = person.type">
                                    {{ person.label }}
                                </li>
                            </template>
                            <el-button
                                type="primary"
                                class="ageSexChange"
                                :class="{'active': isFaceLoadSuccess }"
                                :disabled="!isFaceLoadSuccess"
                                v-gtag-event="PointModifyGender"
                                @click="[setSexAdjustHasRedDotValue(),sexAdjustButtonHasNewDot=sexAdjustHasRedDotValue(),showImportAgeSexRevise = !showImportAgeSexRevise]"
                            >
								<div v-if="!sexAdjustButtonHasNewDot" class="has_new">
								</div>
                            </el-button>
                        </ul>

                        <params-collapse
                            v-show="activeNavName === RefineNavName.Beauty"
                            type="beauty"
                            :params-cols-height="paramsColsHeight"
                            @user-behavior="onUserBehavior"
                            @on-change="onChangeSliders"
                            @on-change-color="onChangeColorSliders"
                            @on-input="onInputSliders"
                            @on-input-color="onInputColorSliders"

                            @on-reset="[$emit('on-reset-params',$event),PointParameterAdjustmentReset()]"
                        >
                            <template slot="painter">
                                <slot name="painter"></slot>
                            </template>
                        </params-collapse>

                        <el-collapse
                            v-show="activeNavName === RefineNavName.Palette"
                            ref="removeTabindex"
                            v-model="activeNames"
                        >
                            <el-collapse-item class="histogram-collapse" title="直方图" name="histogram" ref="histogram">
                                <slot name="histogram"></slot>
                            </el-collapse-item>
                        </el-collapse>

                        <params-collapse
                            v-show="activeNavName === RefineNavName.Palette"
                            type="color"
                            :params-cols-height="paramsColsHeight"
                            @user-behavior="onUserBehavior"
                            @point-filter="PointSelectFilter"
                            @on-change="onChangeSliders"
                            @on-change-color="onChangeColorSliders"
                            @on-input="onInputSliders"
                            @on-input-color="onInputColorSliders"
                            @on-reset="[$emit('on-reset-params',$event),PointParameterAdjustmentReset()]"
                        />

                        <params-collapse
                            v-show="activeNavName === RefineNavName.Background"
                            type="background"
                            :params-cols-height="paramsColsHeight"
                            @user-behavior="onUserBehavior"
                            @on-change="onChangeSliders"
                            @on-change-color="onChangeColorSliders"
                            @on-input="onInputSliders"
                            @on-input-color="onInputColorSliders"
                            @on-reset="[$emit('on-reset-params',$event),PointParameterAdjustmentReset()]"
						>
							<template v-slot:import="data">
								<slot name="import" :data="data.data"></slot>
							</template>
						</params-collapse>
                    </div>
                </template>
            </split>

            <div class="bottom-btn" @keydown.prevent>
                <el-button
                    class="save-btn"
                    size="mini"
                    :disabled="isOriParams"
                    v-gtag-event="PointAddPresetButton"
                    @click="onSaveNewPresetClick">
                    保存新预设
                </el-button>

                <el-button-group class="save-btn" size="mini" style="display: flex">
                    <el-button
                        size="mini"
                        title="同步效果"
                        style="width: 110px"
                        :loading="isApplyLoading"
                        :disabled="isSyncPresetDisabled"
                        v-gtag-event="PointAddApplyButton"
                        @click="onApplyPresetToOther">
                        同步到选中图片
<!--                        <i class="el-icon-setting" @click.stop="showSyncPresetSettings = true"></i>-->
                    </el-button>
                    <el-button
                        size="mini"
                        class="preset-settings"
                        id="guide__refine-preset-settings"
                        @click.stop="changeSyncSetting">
                        <i class="ts-icon-setting"></i>
                    </el-button>
                </el-button-group>

            </div>
        </div>

        <SavePresetDialog
            v-if="!isDestroy"
            ref="savePresetDialogRefs"
            :refineUUID="refineUUID"
            :get-params-json="getParamsJson"
            :isRecommendPreset="isRecommendPreset"
            :deletePresetSuitId="deletePresetSuitId"
            :preset_label="preset_label"
            v-model="showSavePresetDialog"
            @newPresetClass="showNewPresetTypeDialog = true"
            @saveSuccess="onSaveSuccess"
        />

        <ImportPresetDialog v-model="showImportPresetDialog"></ImportPresetDialog>
        <NewPresetTypeDialog @loadPreset="loadPreset" v-model="showNewPresetTypeDialog"></NewPresetTypeDialog>

        <ImportAgeSexRevise
            ref="import-age-sex-revise"
            :value.sync="showImportAgeSexRevise"
            :personTypeTab.sync="currPersonType"
            :isDestroy="isDestroy"
			:refineUUID="refineUUID"
            @changeFaceData="$emit('onChangeFaceDataCallback')"
        />

        <SyncPresetSettings
            :refineUUID="refineUUID"
            v-model="showSyncPresetSettings"
            @on-apply="onApplyPresetToOther">
        </SyncPresetSettings>
    </div>
</template>

<script>
import { computed, getCurrentInstance, nextTick, onMounted, ref, watch, defineEmits } from 'vue'
import store from '@/store'

import { debounce, throttle } from 'lodash'

import { BatchActiveMode } from '@/constants/batchRetouchDef'
import { PersonList } from './CustomCollapseItem/ParamsComponents'

import button from '@/mixins/button'
import presetManager from '@/mixins/presetManager.js'
import PointsMixin from '@/mixins/pointsMixin'

import ParamsCollapse from './Components/ParamsCollapse'
import TSPresetTree from '@/components/PresetTree/TSPresetTree'

import SavePresetDialog from '@/views/PhotoFinishing/Components/SavePreset/SavePresetDialog'
import ImportAgeSexRevise from '@/views/PhotoFinishing/Components/ImportAgeSexReviseDialog'
import { MAX_SUPPORT_PRESET_VERSION } from '@/constants/preset-def'
import Split from '@/components/SplitView/split'
import { delay } from '#/utils/common'
import Menu from '@/qt-ipc/utils/menu'

import useSplitRepositories from '@/views/PhotoFinishing/Composables/useSplitRepositories'
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'
import { RefineNavName } from '@/constants/refine'
import { NewFeatureRedDot, PresetSuitIdType } from '@/constants/constants'
import {APP_VERSION} from "#/types/config";
import SyncPresetSettings from './Components/SavePreset/SyncPresetSettings'
import refine from 'qt/business/refine'
import useToastRepositories from '@/composables/useToastRepositories'

import { ButtonGroup as ElButtonGroup } from 'element-ui'

// const $emit = defineEmits([
//     'onApplyPresetCallback',
//     'onChangeFaceDataCallback',
//     'on-change-color-slider',
//     'on-change-beautify-change',
//     'on-reset-params'
// ])

export default {
    components: {
        Split,
        ParamsCollapse,
        SavePresetDialog,
        TSPresetTree,
        ImportAgeSexRevise,
        SyncPresetSettings,
        ElButtonGroup,
    },
    mixins: [
        button,
        presetManager,
        PointsMixin
    ],
    props: {
        activeNavName: {
            type: String,
            default: ''
        },
        isDestroy: {
            type: Boolean,
            default: false
        },
        refineUUID: {
            type: String,
            default: ''
        },
        getParamsJson: {
            type: Function
        }
    },

    setup(props, { emit: $emit }) {
        // 初始化及缓存激活面板展开状态
        const activeNames = ref(['preset', 'histogram'])
        watch(activeNames, (active) => {
            nextTick(() => {
                const actives = []
                if (active.includes('preset')) actives.push('photoFinishing_preset')
                if (active.includes('histogram')) actives.push('photoFinishing_histogram')
                store.commit('changeActionStatus_photoFinishing', actives)
            })
        })
        const initActiveNames = () => {
            const defaultActives = store.getters.actionStatus
            const actives = []
            if (defaultActives.includes('photoFinishing_histogram')) actives.push('histogram')
            if (defaultActives.includes('photoFinishing_preset')) actives.push('preset')
            activeNames.value = actives
        }
        onMounted(initActiveNames)
        // ————————————————

        const paramsComRef = ref()
        const histogram = ref()
        const tSPresetTreeRefs = ref()
        // 参数面板拖拽组件及高度控制逻辑
        const { splitValue, splitManualVal, presetHeight, histogramHeight, updateParamsComRefHeight } = useSplitRepositories({
            getParamsComRef: () => paramsComRef.value,
            getHistogramRef: () => histogram.value,
            activeNames
        })

        // 参数面板高度
        const paramsColsHeight = ref('calc(100% - 72px)')
        const reloadColsHeight = (curr) => {
            if ([RefineNavName.Palette].includes(curr)) {
                paramsColsHeight.value = `calc(100% - ${histogramHeight.value}px)`
            } else if ([RefineNavName.Beauty].includes(curr)) {
                paramsColsHeight.value = 'calc(100% - 33px)'
            } else if ([RefineNavName.Background].includes(curr)) {
                paramsColsHeight.value = '100%'
            }
        }
        watch(() => props.activeNavName, (val) => {
            reloadColsHeight(val)
            updateParamsComRefHeight()
        }, { immediate: true })
        watch(histogramHeight, () => [RefineNavName.Palette].includes(props.activeNavName) && reloadColsHeight(RefineNavName.Palette))
        // ————————————————

        const isFaceLoadSuccess = computed(() => store.getters.isFaceLoadSuccess)
        const activeThumbnail = computed(() => store.getters['thumbnail/activeThumbnail'])
        const thumbnailSelection = computed(() => store.getters['thumbnail/thumbnailSelection'])
        const syncPresetSettingCache = computed(() => store.getters['refine/syncPresetSettingCache'])
        const isSaveSyncSetting = computed(() => store.getters['refine/isSaveSyncSetting'])
        const isSyncPresetDisabled = computed(() => {
            if (thumbnailSelection.value.length === 0) return true
            return thumbnailSelection.value.length === 1 && thumbnailSelection.value[0].id === activeThumbnail.value.id
        })

        const showSyncPresetSettings = ref(false)
        const isApplyLoading = ref(false)

        const { tsNotify, tsConfirm } = useToastRepositories()
        const onApplyPresetToOther = async () => {
            if (!isSaveSyncSetting.value) {
                showSyncPresetSettings.value = true
                return
            }

            if (isSyncPresetDisabled.value || activeThumbnail.value.id <= 0) {
                tsNotify('请先在左侧加选要应用的图片哦~')
                return
            }

            isApplyLoading.value = true
            const data = await refine.applyPresetToOther(props.refineUUID, syncPresetSettingCache.value)
            await delay(300)
            isApplyLoading.value = false
            tsNotify({ message: data.length ? `${data.length}张照片效果已同步` : '效果已同步' })
        }

        const changeSyncSetting = () => {
            store.commit('refine/_SetIsSaveSyncSetting')
            showSyncPresetSettings.value = true
        }

        const currPersonType = computed({
            get: () => store.getters['refine/personType'],
            set: (val) => store.commit('refine/_SetPersonType', val)
        })

        // 埋点
        const { batchSendGtag, PointRightParams, PointRightPreset, PointAddPresetSort, PointAddPresetIcon } = useParamsPointsRepositories()


        const activePresetSuitId = computed(() => store.getters['thumbnail/activePresetSuitId'])
        watch(activePresetSuitId, (id) => reloadPresetSuitSelect(id))

        const reloadPresetSuitSelect = debounce(() => {
            nextTick(() => {
                const domRef = tSPresetTreeRefs.value
                if (!domRef) {
                    return
                }
                const activeId = activePresetSuitId.value
                domRef.handleSetCheckedNodes(activeId === 0 ? null : activeId)
            })
        }, 500)

        const onApplyPresetClick = debounce((data) => {
            const presetSuitModel = data[0]
            if (!presetSuitModel) {
                tsNotify('预设不存在')
                return
            }

            const { presetSuitId } = activeThumbnail.value
            if (presetSuitModel.id === presetSuitId) {
                return
            }

            // reloadPresetSuitSelect(0)

            PointRightPreset(presetSuitModel)

            if (presetSuitModel.version && presetSuitModel.version > MAX_SUPPORT_PRESET_VERSION) {
                tsConfirm({
                    title: '系统提示',
                    message: '需要升级最新版本才能使用该预设哦~',
                    showCancelButton: false
                }).then(_ => {
                }).catch(_ => {
                })
                return
            }

            $emit('onApplyPresetCallback', presetSuitModel)
            store.commit('project/_SetLastProjectUpdateTime', new Date())
        }, 300)

        const onSaveSuccess = (model) => {
            if (model) {
                nextTick(() => {
                    const domRef = tSPresetTreeRefs.value
                    if (!domRef) {
                        return
                    }
                    domRef.addExpandNodeByPresetId(model.id)
                    delay(100).then(() => {
                        nextTick(() => {
                            domRef.addExpandNodeByPresetId(null)
                        })
                    })
                })
            }
        }

        const isOriParams = computed(() => store.getters['refine/isOriParams'])
        const lastBeautifyParams = computed(() => store.getters['refine/lastBeautifyParams'])

        // 获取直方图和预设的展开状态
        const savePresetDialogRefs = ref()
        const loadPreset = (data) => {
            nextTick(() => {
                if (savePresetDialogRefs.value) {
                    savePresetDialogRefs.value.whichPresetClass = data
                }
            })
        }


        const handlResetPreset = () => {
            const oriPreset = new Array(store.state.presetting.oriPreset)
            onApplyPresetClick(oriPreset)
            if (tSPresetTreeRefs.value) {
                tSPresetTreeRefs.value.handleSetCheckedNodes(-1)
            }
        }

        const onUserBehavior = (event) => {
            if (event === 'double-click-label') {
                PointRightParams('double_click_title')
            } else if (event === 'double-click-slider') {
                PointRightParams('double_click_dot')
            } else if (event === 'input-modify') {
                PointRightParams('click_effect_value')
            }
        }

        /**
         * 获取预设为推荐预设还是普通预设
         */
        const preset_label = ref({})
        const getIsRecommendPreset = (presetSuitId) =>{
            //'-1': 无效果, '0': 未进行修改
            if (presetSuitId === '-1' || presetSuitId === '0') {
                preset_label.value = null
                return true
            }

            let isRecommendPreset = false
            let isPresetSuitDelete = true
            let classId, name

            //如果是普通预设，获取名字
            let presetTree = store.getters['presetTree']
            presetTree.forEach(item => {
                item.children.forEach(i => {
                    if (presetSuitId == i.id) {
                        isRecommendPreset = item.type === 1
                        isPresetSuitDelete = false
                        name = i.label
                        classId = i.class_id
                    }
                })
            })
            if (isPresetSuitDelete || isRecommendPreset) { //预设已经删除掉了,或者为推荐预设
                preset_label.value = null
                return true
            }
            if (!isRecommendPreset) { //为普通预设
                preset_label.value = { name, classId }
                return false
            }
        }

        /**
         * 点击保存预设，判断是否为推荐预设
         */
        let isRecommendPreset = ref(false) //是否为推荐预设
        let deletePresetSuitId = ref('0')
        let showSavePresetDialog = ref(false)
        const onSaveNewPresetClick = () => {
            let { presetSuitId, lastPresetSuitId } = activeThumbnail.value
            if (activePresetSuitId.value === PresetSuitIdType.UnSet) {
                deletePresetSuitId.value = lastPresetSuitId
                isRecommendPreset.value = getIsRecommendPreset(lastPresetSuitId)
            } else {
                deletePresetSuitId.value = activePresetSuitId.value
                isRecommendPreset.value = getIsRecommendPreset(activePresetSuitId.value)
            }

            //显示预设保存弹窗
            showSavePresetDialog.value = true
        }

        const that = getCurrentInstance().proxy
        const handleAddPreset = () => {
            new Menu().push({
                label: '导入预设',
                action: 'batchretouch-my-preset-import',
                disabled: false,
                data: null,
                callback: () => {
                    that.showImportPresetDialog = true
                }
            }).push({
                label: '新建分类',
                action: 'batchretouch-my-preset-newType',
                disabled: false,
                data: null,
                callback: () => {
                    that.showNewPresetTypeDialog = true
                    PointAddPresetSort()
                }
            }).show()
        }

        const sexAdjustHasRedDotValue = () => localStorage.getItem(NewFeatureRedDot.ManualFace)
        // 性别按钮是否带小红点
        const sexAdjustButtonHasNewDot = ref(sexAdjustHasRedDotValue())
        const showImportAgeSexRevise = ref(false)
        const setSexAdjustHasRedDotValue = () => {
            let item = localStorage.getItem(NewFeatureRedDot.ManualFace)
            if (!item){
                item = APP_VERSION
            }
            localStorage.setItem(NewFeatureRedDot.ManualFace,item)
        }


        /**
         * 人像美化更新
         * @param data
         * @param opt
         * @returns {Promise<void>}
         */
        const onChangeSliders = (data, opt, ext) => {
            // 过滤初始化数据回调
            if (opt === 'init') return
            if (Object.keys(data).length === 0) return

            console.log('data value is: ',data)
            const params = []
            for (const key in data) {
                const value = data[key]
                params.push({ key, value })
                store.commit('refine/_UpdateBeautifyParams', { key, value })
            }

            if (opt === 'manual') {
                batchSendGtag(params, 'beautify', { beautifyParams: lastBeautifyParams.value })
            }

            $emit('on-change-beautify-change', params, false, ext)
            store.commit('project/_SetLastProjectUpdateTime', new Date())
        }

        const onInputSliders = throttle(function (data) {
            if (Object.keys(data).length === 0) {
                return
            }

            const params = []
            for (const key in data) {
                const value = data[key]
                params.push({ key, value })
            }
            $emit('on-change-beautify-change', params, true, 'manual')
        }, 30)

        /**
         * 调色更新
         * @param data
         * @param opt
         * @returns {Promise<void>}
         */
        const onChangeColorSliders = (data, opt, ext) => {
            if (opt === 'init') return
            if (Object.keys(data).length === 0) return

            const params = []
            for (const key in data) {
                const value = data[key]
                params.push({ key, value })
                store.commit('refine/_UpdatePaletteParams', { key, value })
            }

            // 手动操作 上报埋点
            if (opt === 'manual') {
                batchSendGtag(params, 'color', { beautifyParams: lastBeautifyParams.value })
            }

            $emit('on-change-color-slider', params, false, ext)
            store.commit('project/_SetLastProjectUpdateTime', new Date())
        }

        const onInputColorSliders = throttle(function (data) {
            if (Object.keys(data).length === 0) {
                return
            }

            const params = []
            for (const key in data) {
                const value = data[key]
                params.push({ key, value })
            }

            $emit('on-change-color-slider', params, true)
        }, 30)

        onMounted(async () => {
            nextTick(() => that.removeCollapseTabindex(that.$refs.removeTabindex))
            try {
                await store.dispatch('loadAllPresents', {
                    userId: store.state.user.userId,
                    presetType: BatchActiveMode.RETOUCH
                })
                reloadPresetSuitSelect()
            } catch(e) {
                tsNotify(e.message)
            }
        })

        return {
            RefineNavName,

            paramsComRef,
            histogram,
            tSPresetTreeRefs,
            savePresetDialogRefs,

            splitValue,
            splitManualVal,

            splitMinVal: 135,
            splitMaxVal: 72,

            activeNames,

            presetHeight,
            paramsColsHeight,

            batchSendGtag,
            PointAddPresetIcon,
            onUserBehavior,

            isOriParams,
            isApplyLoading,
            activeThumbnail,
            thumbnailSelection,
            isSyncPresetDisabled,
            showSyncPresetSettings,

            onApplyPresetToOther,
            changeSyncSetting,
            onApplyPresetClick,
            reloadPresetSuitSelect,
            onSaveSuccess,
            onSaveNewPresetClick,
            handleAddPreset,
            loadPreset,
            handlResetPreset,

            //ui视图分割参数
            showSavePresetDialog,
            isRecommendPreset, //是否为推荐预设
            deletePresetSuitId,
            preset_label, //如果不是推荐预设，保存name, type
            isFaceLoadSuccess,

            currPersonType,
            personList: ref(PersonList),
            showImportAgeSexRevise,
            sexAdjustButtonHasNewDot,
            sexAdjustHasRedDotValue,
            setSexAdjustHasRedDotValue,

            onInputSliders,
            onChangeSliders,
            onChangeColorSliders,
            onInputColorSliders
        }
    }
}

</script>

<style scoped lang="scss">
$myBackgroundColor: #28282A;
.params-bar {
    flex-shrink: 0;
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    border-left-width: 1px;
    border-style: solid;

    .params-components {
        flex: 1 0 auto;
        position: relative;
        margin-bottom: 51px;
        width: 300px;
        display: flex;
        flex-direction: column;

        .splitTriggle {
            height: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin-top: -5px;

            .triggleContent {
                width: 100%;
                height: 1px;
                background-color: #333;
            }

            &:hover {
                cursor: row-resize;

                .triggleContent {
                    height: 2px;
                    background-color: #ffffff20;
                }
            }
        }

        .collapse {

            &.preset-collapse {
                height: 100%;
            }

            /deep/ {
                .el-collapse-item__header {
                    padding-left: 16px;
                    padding-right: 0px;
                    border-bottom: solid 1px #333;
                }

                .el-collapse-item:last-child {
                    .el-collapse-item__wrap {
                        border-bottom: none;
                    }
                }

                .el-collapse-item__content {
                    padding-bottom: 0;
                }

                .el-collapse-item__arrow {
                    margin-right: 17px;
                }
            }

            .claWtBlanceTitle {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 12px;

                .claTitle {
                    font-weight: 500;
                }

                .addBtnCla {
                    align-self: center;
                    background: transparent;
                    border-color: transparent;
                    font-size: 16px;
                    width: 30px;
					.is-loading{
						background: transparent;
					}
                }
            }
        }

        .histogram-collapse {
            /deep/ {
                .el-collapse-item__header {
                    padding-left: 16px;
                    padding-right: 0;
                    border-bottom: solid 1px #333;
                    font-size: 12px;
                }

                .el-collapse-item__content {
                    padding-bottom: 0;
                }

                .el-collapse-item__arrow {
                    margin-right: 17px;
                }
            }
        }

        .collapse {
            .claCarouselNoneIndicator {
                /deep/ .el-carousel__indicators {
                    visibility: hidden;
                }
            }

            .claCarouselIndicator {
                /deep/ .el-carousel__indicators {
                    visibility: visible;
                }
            }

            /deep/ .el-carousel__indicators--outside {
                background: #282828;
            }

            // .presetHeaderCla {
            //     display: flex;
            //     flex-direction: row;
            //     justify-content: space-between;

            //     .addBtnCla {
            //         align-self: center;
            //         background: transparent;
            //         border-color: transparent;
            //         font-size: 16px;
            //     }
            // }
        }

        /deep/ .el-collapse {
            border-top: none;
        }

        .collapse-title {
            height: 38px;
            line-height: 38px;
            padding-left: 16px;
            font-size: 13px;
            font-weight: 500;
            border-bottom: 1px solid #333;
        }

        .group-title {
            flex-shrink: 0;
            height: 24px;
            font-size: 14px;
            line-height: 24px;
            font-weight: 500;
            padding: 4px 16px;
            border-bottom-width: 1px;
            border-top: solid 1px #333;
            background: $myBackgroundColor;

            .group-btn {
                position: relative;

                .ts-icon-new-right {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 23px;
                    height: 10px;
                }

                /deep/ {

                    .el-radio-button {
                        &.is-active {
                            .el-radio-button__inner {
                                border-top-color: #4D4D4D !important;
                                border-bottom-color: #4D4D4D !important;
                            }

                            &:last-child {
                                .el-radio-button__inner {
                                    border-right-color: #4D4D4D !important;
                                }
                            }

                            &:first-child {
                                .el-radio-button__inner {
                                    border-left-color: #4D4D4D !important;
                                }
                            }
                        }
                    }

                    .betaBtn {
                        .el-radio-button__inner {
                            width: 134px;
                            padding: 5px;
                            text-align: left;
                            padding-left: 36px;
                        }
                    }

                    .el-radio-button__inner {
                        width: 134px;
                        padding: 5px;
                    }
                }

                .betaStyle {
                    display: inline-block;
                    width: 38px;
                    height: 14px;
                    border-radius: 2px;
                    background: rgba(255, 255, 255, 0.70);
                    border: 0.5px solid #9A9494;
                    font-size: 9px;
                    color: #333333;
                    text-align: center;
                    line-height: 12px;
                    position: absolute;
                    right: 32px;
                    box-sizing: border-box;
                    top: 5px;
                }
            }
        }

        .parameter-configuration-collapse {
            flex: 1;
            flex-shrink: 0;
            overflow-y: overlay;
            overflow-x: hidden;

            /deep/ {
                .el-icon-arrow-right {
                    margin-right: 17px;
                }

                .params-adjust-group {
                    padding: 0 16px;
                }
            }
        }

        .person-menu {
            display: flex;
            justify-content: space-around;
            height: 38px;
            align-items: center;
            border-bottom: 1px solid #333333;
            font-size: 12px;
            padding: 0 30px;
            background: $myBackgroundColor;

            /deep/ .el-button, {
                border: none;
                width: 18px;
                height: 18px;
                background-color: $myBackgroundColor;
                background-size: 18px, 18px;
                background-repeat: no-repeat;
                padding: 0;
            }

            .ageSexChange {
				position: relative;
				background-image: url("../../assets/icons/all_icon_change-age_disabled@3x.png");
                &.active {
                    background-image: url("../../assets/icons/all_icon_change-age@3x.png");
                }
				.has_new{
					position: absolute;
					background: #D95838;
					width: 5px;
					height: 5px;
					border-radius: 2.5px;
					top:-2px;
					right: -2px;
				}
            }

            &-item {
                text-align: center;
                height: 37px;
                line-height: 37px;
                padding: 0 8.5px;
                transition: border-color .3s;
                position: relative;
                color: rgba(255, 255, 255, 0.45);

                &.active {
                    color: #FFFFFF;

                    &::after {
                        border-bottom: 2px solid #EECC28;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        display: block;
                        content: ' ';
                    }
                }
            }
        }
    }

    .filters-container {
        margin: 7.5px 12px;

        .filter-item {
            position: relative;
            aspect-ratio: 1 / 1;
            margin: 4px;
            width: 80px;
            height: 80px;
            border-radius: 4px;
            background: #F0F0F0;
            border: 2px solid transparent;
            overflow: hidden;

            &:hover {
                border: 2px solid #0080FF;
            }

            &-active {
                border: 2px solid #0080FF;
            }

            .claImg {
                object-fit: cover;
                width: 100%;
                height: 100%;
            }

            .claName {
                position: absolute;
                bottom: 0px;
                height: 20px;
                font-size: 11px;
                color: rgba(255, 255, 255, 0.85);
                text-align: center;
                line-height: 20px;
                font-weight: 400;
                width: 100%;
                background: rgba(0, 0, 0, 0.4);
            }

            .middle-name {
                font-size: 12px;
                color: #666666;
                text-align: center;
                font-weight: 400;
                position: absolute;
                bottom: 0;
                top: 0;
                left: 0;
                right: 0;
                margin: auto;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    .add-btn-box {
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom-width: 1px;

        .save-btn {
            width: 268px;
        }
    }

    .bottom-btn {
        position: absolute;
        bottom: -52px;
        height: 52px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 999;
        padding: 0 12px;
        background-color: $myBackgroundColor;

        .save-btn {
            flex: 1;
            height: 28px;
            margin: 0 4px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

            ::v-deep(.el-button.is-disabled) {
                border-color: #444;
            }

            .img {
                height: 15px;
            }

            .span {
                color: #d9d9d9;
            }

            .preset-settings {
                padding: 4px 4px;
                width: 24px;
                height: 28px;
                box-sizing: border-box;

                background: rgba(71, 71, 71, 1);
            }
        }
    }
}

.splitBottom {
    height: 100%;
}
</style>
