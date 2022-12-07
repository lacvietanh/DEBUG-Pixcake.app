<template>
    <div class="claRight global__params-bar" ref="paramsComRef">
<!--        <split @on-move-end="splitManualVal = splitVal" v-model="splitVal" mode="vertical" :min="`${splitMinVal}px`"-->
<!--               :max="`${splitMaxVal}px`">-->
<!--            <div slot="trigger" class="splitTriggle">-->
<!--                <div class="triggleContent"></div>-->
<!--            </div>-->
            <div slot="top" class="border-style claHistogramCollapse global__scroll-style"
                 style="border-top-width: 0px;">
                <el-collapse v-model="activeNames" class="collapse" @change="onTopCollapseChanged">
                    <el-collapse-item title="直方图" name="histogram" ref="histogram">
                        <slot name="histogram"></slot>

                    </el-collapse-item>
                    <el-collapse-item title="推荐预设" name="preset" ref="recommend">
                        <template slot="title">
                            <div class="claWtBlanceTitle">
                                <span class="claTitle">预设</span>
                                <div>
                                    <el-button
                                        circle
                                        class="addBtnCla"
                                        icon="el-icon-refresh-left"
                                        @click.stop="[handlResetPreset(), cancelBlur($event)]">
                                    </el-button>
                                    <el-button
                                        circle
                                        style="margin-right:10px"
                                        class="addBtnCla"
                                        icon="el-icon-circle-plus-outline"
                                        @click.stop="[handleAddPreset(), cancelBlur($event)]">
                                    </el-button>
                                </div>
                            </div>
                        </template>
                      <TSPresetTree
                          ref="tSPresetTree"
                          @onItemClick="onApplyPresetClick"
                      >
                      </TSPresetTree>

<!--                        <TSPresetTree-->
<!--                            :height="`${presetHeight}px`"-->
<!--                            ref="tSPresetTree"-->
<!--                            @onItemClick="onApplyPresetClick"-->
<!--                        >-->
<!--                        </TSPresetTree>-->
                    </el-collapse-item>
                </el-collapse>
            </div>
<!--            <div slot="bottom" class="border-style claCollapse global__scroll-style"-->
<!--                 style="border-top-width: 0px;height: 100%;" ref="bottomRef">-->
<!--                <el-collapse v-model="activeNames" class="collapse">-->
<!--                    <el-collapse-item title="白平衡" name="1" ref="wtBlanceRef">-->
<!--                        <template slot="title">-->
<!--                            <div class="claWtBlanceTitle">-->
<!--                                <span class="claTitle">白平衡</span>-->
<!--                                &lt;!&ndash;                            <span v-if="$platform === 'win32'" class="betaStyle">测试版</span>&ndash;&gt;-->
<!--                                <el-button-->
<!--                                    class="claReset icon-btn-hover" icon="el-icon-refresh-right"-->
<!--                                    @click.stop="$emit('onResetClick',paletteLayout.whiteBalanceParamCfg)">-->
<!--                                </el-button>-->
<!--                            </div>-->
<!--                        </template>-->

<!--                        <div class="claStepList">-->
<!--                            <div :class="{claStepItem:true}" v-for="(it,index) in paletteLayout.whiteBalanceParamCfg"-->
<!--                                 :key="index">-->
<!--                            <span class="claStepTitle">-->
<!--                                {{ it.label }}-->
<!--                            </span>-->
<!--                                <TSParamStepControl-->
<!--                                    :addtionObject="it"-->
<!--                                    :single-step-len="it.singleStepLen"-->
<!--                                    :double-step-len="it.dbStepLen"-->
<!--                                    :enable="enableStepControl"-->
<!--                                    @onStepChange="$emit('onStepChange',$event)"-->
<!--                                >-->
<!--                                </TSParamStepControl>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-collapse-item>-->
<!--                    <el-collapse-item title="色调控制" name="2">-->

<!--                        <template slot="title">-->
<!--                            <div class="claColorTitle">-->
<!--                                <span class="claTitle">色调控制</span>-->
<!--                                &lt;!&ndash;                            <span v-if="$platform === 'win32'" class="betaStyle">测试版</span>&ndash;&gt;-->
<!--                                <el-button-->
<!--                                    class="claReset icon-btn-hover"-->
<!--                                    icon="el-icon-refresh-right"-->
<!--                                    @click.stop="[_SetLastProjectUpdateTime(new Date()),$emit('onResetClick',paletteLayout.colorParamCfg)]">-->
<!--                                </el-button>-->
<!--                            </div>-->
<!--                        </template>-->

<!--                        <div class="claStepList">-->
<!--                            <div-->
<!--                                v-for="(it,index) in paletteLayout.colorParamCfg"-->
<!--                                :key="index"-->
<!--                                :class="{claStepItem:true}"-->
<!--                                :style="{marginBottom:it.showSeparatorLine?'12px':'0px'}">-->

<!--                                <span class="claStepTitle">{{ it.label }}</span>-->

<!--                                <TSParamStepControl-->
<!--                                    :addtionObject="it"-->
<!--                                    :single-step-len="it.singleStepLen"-->
<!--                                    :double-step-len="it.dbStepLen"-->
<!--                                    :enable="enableStepControl"-->
<!--                                    @onStepChange="[_SetLastProjectUpdateTime(new Date()),$emit('onStepChange',$event)]"-->
<!--                                >-->
<!--                                </TSParamStepControl>-->

<!--                                <el-divider v-if="it.showSeparatorLine" class="bottomBorder"></el-divider>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </el-collapse-item>-->
<!--                </el-collapse>-->
<!--            </div>-->
<!--        </split>-->
        <ImportPresetDialog v-model="showImportPresetDialog"></ImportPresetDialog>
        <NewPresetTypeDialog @loadPreset="loadPreset" v-model="showNewPresetTypeDialog"></NewPresetTypeDialog>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

import TSPresetTree from '@/components/PresetTree/TSPresetTree'
import { mapGetters } from 'vuex'
import button from '@/mixins/button'
import toast from '@/mixins/toast'
import presetManager from '@/mixins/presetManager.js'

import { paletteParamLayout } from '@/views/BatchRetouch/Palette/config/paletteParamLayout'
import TSParamStepControl from '@/components/StepControl/TSParamStepControl'
import { Divider } from 'element-ui'
import { mapActions, mapMutations } from 'vuex'
import { ImageType, PresetClassifyType } from '@/universal/types/constants'
import Split from '@/components/SplitView/split'
import { UserPreferenceSettingModel } from '@/model/UserPreferenceSettingModel'
import Menu from '@/qt-ipc/utils/menu'
import {PointRefineOperate} from "@/constants/pointsDef";
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'

const chartTitleHeight = 38.5
const presetTitleHeight = 38.5

export default defineComponent({
    name: 'BatchPalette',
    mixins: [
        button,
        toast,
        presetManager
    ],
    components: {
        Split,
        TSPresetTree,
        TSParamStepControl,
        'el-divider': Divider
    },
    props: {
        // 预设组件相关的传参
        recommendPreItems: Array,
        myRecommendSelectIndex: {
            type: [Number, String],
            default: -1
        },
        myCurPresetSelectIndex: {
            type: [Number, String],
            default: -1
        },
        // 我的预设
        myPreItems: Array,
        histogramData: {
            type: Object,
            default() {
                return null
            }
        },
        imageType: {
            type: [Number],
            default: 0
        }
    },
    setup() {
        const { PointPreset, PointBatchPalette } = useParamsPointsRepositories()
        return {
            PointPreset,
            PointBatchPalette
        }
    },
    data() {
        return {
            enableStepControl: true,
            showImportPresetDialog: false,
            showNewPresetTypeDialog: false,

            paletteLayout: { ...paletteParamLayout },
            activeNames: ['1', '2', 'histogram'],

            // 参数分割标记值
            splitManualVal: 0.3, // 手动拖动时的值
            splitVal: 0.3,
            splitMinVal: 270,
            splitMaxVal: 122,
            presetHeight: 0,
            isFirstTime: true //组件是否加载了
        }
    },
    watch: {
        imageType: {
            handler: function (val, old) {
                this.$nextTick(() => {
                    this.calcMiniSplitValue(null)
                })
            },
            immediate: true
        },
        activeNames: {
            handler: function (val, old) {
                this.$nextTick(() => {
                    const histogram_status = val.includes('histogram')
                    const preset_status = val.includes('preset')
                    if (!this.isFirstTime) {
                        this.$store.commit('changeActionStatus_batchRetouch', [histogram_status ? 'batchRetouch_histogram' : '', preset_status ? 'batchRetouch_preset' : ''])
                        this.isPresetShow = preset_status
                    }
                    this.isFirstTime = false
                })
            },
            immediate: false
        },
        splitVal: {
            handler: function (val, old) {
                let bottomRef = this.$refs.bottomRef
                if (!bottomRef) {
                    return
                }
                bottomRef.scrollTop = 0
                this.calcPresetHeight()
            },
            immediate: false
        },
        splitManualVal(val) {
            let userPreferModel = new UserPreferenceSettingModel()
            userPreferModel.setBatchRetouchParamsSplitValue(val)
        },
        histogramData(val) {
            this.$nextTick(() => {
                this.calcMiniSplitValue(null)
            })
        }
    },
    computed: {
        ...mapGetters([
            'actionStatus'
        ])
    },
    async mounted() {
        this.getActiveNames()
        await this.initSplitVal()
        this.listenResizeEvent(true)
    },
    beforeDestroy() {
        this.listenResizeEvent(false)
    },
    methods: {
        ...mapMutations('project', [
            '_SetLastProjectUpdateTime'
        ]),
        onResizeEvent() {
            this.$nextTick(() => {
                this.calcPresetHeight()
            })
        },
        listenResizeEvent(isNeed) {
            if (isNeed) {
                window.addEventListener('resize', this.onResizeEvent)
            } else {
                window.removeEventListener('resize', this.onResizeEvent)
            }
        },
        async initSplitVal() {
            let userPreferModel = new UserPreferenceSettingModel()
            let val = await userPreferModel.getBatchRetouchParamsSplitValue()
            if (val) {
                this.splitVal = val
                this.splitManualVal = val
            }
            this.calcMiniSplitValue()
            this.calcPresetHeight()
        },
        onTopCollapseChanged(activeNames) {
            this.$nextTick(() => {
                let val = this.activeNames
                const histogram_status = val.includes('histogram')
                const preset_status = val.includes('preset')
                if (!this.isFirstTime) {
                    this.$store.commit('changeActionStatus_batchRetouch', [histogram_status ? 'batchRetouch_histogram' : '', preset_status ? 'batchRetouch_preset' : ''])
                    this.isPresetShow = preset_status
                }
                this.calcMiniSplitValue()
                this.isFirstTime = false
                this.calcPresetHeight()
            })
        },
        histogramHeight() {
            let histogramRef = this.$refs.histogram
            if (!histogramRef) {
                return 0
            }
            const tsHistogramH = this.$refs.histogram.$children[0].getHeight()
            console.log(`histogramHeight.build = ${tsHistogramH}`)
            return tsHistogramH
        },
        calcPresetHeight() {
            let paramsComRef = this.$refs.paramsComRef // 根组件包含的参数面板,已扣除底部button区高度
            if (!paramsComRef) {
                return 0
            }
            let rootHeight = paramsComRef.getBoundingClientRect().height
            let isChartExpand = this.activeNames.includes('histogram')

            let chartHeight = isChartExpand ? this.histogramHeight() : 0
            let height = rootHeight * this.splitVal - chartHeight - chartTitleHeight - presetTitleHeight
            this.presetHeight = height
        },
        calcMiniSplitValue() {
            let isChartExpand = this.activeNames.includes('histogram')
            const isPresetExpand = this.activeNames.includes('preset')
            let chartHeight = isChartExpand ? this.histogramHeight() : 0
            const presetItemHeight = 35
            const keepItemCount = isPresetExpand ? 3 : 0
            const adjustH = this.imageType == ImageType.Raw ? 40 : 0
            let miniSplitVal = chartHeight + chartTitleHeight + presetTitleHeight + presetItemHeight * keepItemCount + adjustH
            this.splitMinVal = miniSplitVal
            let ratio = miniSplitVal / this.$refs.paramsComRef.getBoundingClientRect().height

            // 展开、收起，修改分割比例值
            if (this.$refs.paramsComRef && !this.isFirstTime) {
                if (this.splitManualVal < ratio) {
                    this.splitVal = ratio
                } else {
                    this.splitVal = this.splitManualVal
                }
            }
            if (!isPresetExpand) {
                this.splitVal = ratio
            }
        },
        async loadPreset() {
        },
        /**
         * 获取直方图和预设的展开状态
         */
        getActiveNames() {
            const isHistogram = this.actionStatus.includes('batchRetouch_histogram')
            const isPreset = this.actionStatus.includes('batchRetouch_preset')
            if (!isHistogram && !isPreset) {
                this.activeNames = ['1', '2']
            } else if (isHistogram && !isPreset) {
                this.activeNames = ['1', '2', 'histogram']
            } else if (!isHistogram && isPreset) {
                this.activeNames = ['1', '2', 'preset']
            } else {
                this.activeNames = ['1', '2', 'histogram', 'preset']
            }
        },
        handleSetCheckedNodes(index) {
            if (index == 0) {
                this.$refs['tSPresetTree'].handleSetCheckedNodes(null)
            } else {
                this.$refs['tSPresetTree'].handleSetCheckedNodes(index)
            }
        },
        handlResetPreset() {
            const oriPreset = new Array(this.$store.state.presetting.oriPreset)
            this.onApplyPresetClick(oriPreset)

            this.$refs['tSPresetTree'].handleSetCheckedNodes(-1)

        },
        getThumnailView() {
            return this.$refs.thumbnailRef || null
        },
        getTemperatureColorStepRef() {
            if (!this.$refs.temperatureColorStepRef) {
                return null
            }
            return this.$refs.temperatureColorStepRef[0]
        },
        onApplyPresetClick(data) {

            if (data[0].classifyType === PresetClassifyType.System) {
                this.PointPreset(true,data[0].id)
            } else {
                this.PointPreset(false,data[0].id)
            }

            this.$emit('onItemClick', data)
            this._SetLastProjectUpdateTime(new Date())
        },
        async handleAddPreset() {
            this.PointBatchPalette('add_preset_icon')

            const menu = new Menu()
            menu.push({
                label: '导入预设',
                action: 'batchretouch-my-preset-import',
                disabled: false,
                data: null,
                callback: () => this.showImportPresetDialog = true
            }).push({
                label: '新建分类',
                action: 'batchretouch-my-preset-newType',
                disabled: false,
                data: null,
                callback: () => {
                    this.showNewPresetTypeDialog = true
                    this.PointBatchPalette(PointRefineOperate.AddPresetSort)
                }
            }).show()
        }
    }
})
</script>

<style lang="scss" scoped>

.claRight {
    position: relative;
    width: 300px;
    height: calc(100% - 48px);
    box-shadow: 0 -8px 14px 0px rgba(0, 0, 0, 0.1);
    overflow: hidden;
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

    .claCarouse {
        background-color: #282828;
    }

    .claCarouselNoneIndicator {
        /deep/ .el-carousel__indicators {
            visibility: hidden;
            background-color: #282828;
        }
    }

    .claCarouselIndicator {
        /deep/ .el-carousel__indicators {
            visibility: visible;
            height: 28px;
            margin-top: -10px;
        }

    }

    .claHistogramCollapse {
        padding-left: 0;
        font-size: 12px;
        overflow-y: overlay;

        .collapse {
            /deep/ {
                .el-collapse-item__header {
                    padding-left: 12px;
                    padding-right: 8px;
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
            }
        }

    }


    .claCollapse {
        padding-left: 0;
        font-size: 12px;
        flex: 1;
        overflow-y: overlay;

        .collapse {
            /deep/ {
                .el-collapse-item__header {
                    padding-left: 12px;
                    padding-right: 8px;
                }

                .el-collapse-item:last-child {
                    .el-collapse-item__wrap {
                        border-bottom: none;
                    }
                }

                .el-collapse-item__content {
                    padding-bottom: 0;
                }
            }
        }
    }

    .claColorTitle, .claWtBlanceTitle {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .addBtnCla {
            align-self: center;
            background: transparent;
            border-color: transparent;
            font-size: 16px;
            width: 30px;
        }

        .betaStyle {
            display: inline-block;
            width: 38px;
            height: 16px;
            border-radius: 2px;
            background: rgba(255, 255, 255, 0.70);
            border: 0.5px solid #9A9494;
            font-size: 9px;
            box-sizing: border-box;
            color: #333333;
            text-align: center;
            line-height: 14px;
            margin-left: 6px;
            vertical-align: middle;
        }

        .claTitle {
            font-size: 12px;
            line-height: 14px;
            font-weight: 500;
            height: 100%;
            display: inline-block;
            vertical-align: middle;
        }

        .claReset {
            position: absolute;
            top: 50%;
            margin-top: -16px;
            right: 12px;
            padding: 0px;
            border-width: 0px;
            width: 32px;
            height: 32px;
            font-size: 14px;
            background: transparent;
            color: #B3B3B3;

            /deep/ i {
                font-size: 12px;
            }
        }
    }

    .claStepList {
        display: flex;
        flex-direction: column;
        padding-top: 6px;
        padding-bottom: 6px;

        .claStepItem {
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            padding-right: 16px;
            height: 34px;
            align-items: center;
            position: relative;

            .claStepTitle {
                text-align: left;
                margin-left: 12px;
                margin-right: 4px;
                font-size: 12px;
                line-height: 24px;
                font-weight: 400;
                width: 36px;
                color: #A6A6A6;
            }

            .bottomBorder {
                background-color: #333333;
                position: absolute;
                margin-left: 12px;
                margin-right: 100px;
                bottom: -6px;
                width: calc(100% - 24px);
            }
        }

        .claStepItem:nth-last-child(1) {
            .bottomBorder {
                display: none;
            }
        }
    }
}

</style>
