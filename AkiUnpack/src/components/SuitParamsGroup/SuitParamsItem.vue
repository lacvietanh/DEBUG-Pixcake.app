<template>
    <div class="container">
        <SuitParamsGridView
            ref="SuitParamsGridView"
            :items="data.children"
            :initSelectPath="selectPath"
            @onItemClick="onSuitClick"
        />

        <div class="slider-container">
            <div class="slider-title">
                <span
                    class="title"
                    v-gtag-dbl-event="PointDoubleClickTitle"
                    @dblclick="onResetSingle(data)">
                    程度
                </span>

                <ts-slider
                    class="slider"
                    input-size="mini"
                    :key="`${data.key}-ts-slider`"
                    :show-tooltip="false"
                    :show-input-controls="false"
                    :min="0"
                    :max="100"
                    :step="1"
                    :disabled="!selectPath"
                    v-model="slideValue"
                    v-gtag-dbl-event="PointDoubleClickDot"
                    @keydown.native.meta="preventDefault"
                    @keydown.native.ctrl="preventDefault"
                    @keydown.native.exact.stop
                    @change="onSliderChange"
                    @input="onSliderInput"
                    @ondblclick="onResetSingle"
                >
                </ts-slider>

                <ts-number-placeholder
                    class="percent"
                    :min="0"
                    :max="100"
                    :disabled="!selectPath"
                    v-model="slideValue"
                    @on-blur="$emit('on-blur')"
                    @on-focus="$emit('on-focus')"
                    @change="onSliderChange"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

import pointsMixin from '@/mixins/pointsMixin'
import { PointParamsFeatureMap } from '@/constants/pointsDef'

import TsSlider from '@/components/TsSlider'
import TsNumberPlaceholder from '@/components/TsNumberPlaceholder'
import SuitParamsGridView from '@/components/SuitParamsGroup/SuitParamsGridView'
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'

export default defineComponent({
    name: 'SuitParamsGroup',
    mixins: [pointsMixin],
    components: {
        'ts-slider': TsSlider,
        SuitParamsGridView,
        TsNumberPlaceholder
    },
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    setup() {
        const { PointRightMakeupItem } = useParamsPointsRepositories()

        return {
            PointRightMakeupItem
        }
    },
    data() {
        return {
            hasInit: false,
            paramsData: {},
            currentSuit: '',

            tempValue: 0,
            slideValue: 0,
            selectPath: '',

            slideDisable: false,
            currentSuitDefaultValue: 0
        }
    },
    computed: {
        identify() {
            if (this.data) {
                return this.data.key
            }
            return ''
        },

        identifyPath() {
            if (this.data) {
                return this.data.effectKey
            }
            return ''
        },

        isMainItem() {
            return !!this.data.isMainItem
        }
    },
    watch: {
        data: {
            handler(val) {
                this.initParamsData()
            },
            immediate: true
        }
    },
    methods: {
        initParamsData() {
            if (!this.data) {
                return
            }
            if (!this.hasInit) {
                this.slideValue = this.data.value
                this.tempValue = this.slideValue
                this.selectPath = ''
                this.hasInit = true
            }
        },

        init(data) {
            const { key, effectKey } = this.data

            if (!this.identify || !this.identifyPath) {
                return {
                    [effectKey]: this.selectPath,
                    [key]: this.slideValue
                }
            }

            if (typeof data[this.identify] !== 'undefined') {
                this.slideValue = data[this.identify]
            } else {
                this.slideValue = this.data.value
            }
            this.tempValue = this.slideValue

            if (typeof data[this.identifyPath] !== 'undefined') {
                this.selectPath = data[this.identifyPath]
            } else {
                this.selectPath = ''
            }

            if (this.$refs['SuitParamsGridView']) {
                const gridView = this.$refs['SuitParamsGridView']
                gridView.initSelectIndex(this.selectPath)
            }

            return {
                [effectKey]: this.selectPath,
                [key]: this.slideValue
            }
        },

        isMain() {
            return this.isMainItem
        },

        reset() {
            let obj = {}
            if (!this.data || !this.identify || !this.identifyPath) {
                return obj
            }

            if (this.slideValue !== this.currentSuitDefaultValue) {
                this.slideValue = this.currentSuitDefaultValue
                obj[this.identify] = this.slideValue
            }

            if (this.selectPath !== '') {
                this.selectPath = ''
                obj[this.identifyPath] = ''
            }

            if (this.$refs['SuitParamsGridView']) {
                const gridView = this.$refs['SuitParamsGridView']
                gridView.reset()
            }

            return obj
        },

        onSuitClick(args) {
            let suit = args && args[0]
            if (!suit) {
                return
            }

            const updateParams = {}
            const { key: sliderKey, effectKey } = this.data

            if (this.selectPath !== suit.path) {
                this.selectPath = suit.path
                updateParams[effectKey] = suit.path
                updateParams[sliderKey] = suit.defaultValue


                // if (this.slideValue !== suit.defaultValue) {
                this.slideValue = suit.defaultValue
                this.tempValue = this.slideValue
                // updateParams[sliderKey] = suit.defaultValue
                // }

                const allParams = {
                    [effectKey]: this.selectPath,
                    [sliderKey]: this.slideValue
                }

                if (this.isMainItem) {
                    this.$emit('on-main-change', updateParams, updateParams, 'manual')
                } else {
                    this.$emit('on-change', allParams, updateParams, 'manual')
                }

                const key = this.data.key.split('_')[0]
                if (key) {
                    let cate = PointParamsFeatureMap['slide_makeup_rod'][key]
                    this.PointRightMakeupItem(key,cate + '_' + suit.name)
                }
            }
        },

        onSliderInput(value) {
            if (value === this.tempValue) {
                return
            }

            this.tempValue = value
            const { key, effectKey } = this.data
            const allParams = {
                [effectKey]: this.selectPath,
                [key]: this.slideValue
            }
            this.$emit('on-input', allParams, { [key]: value }, 'manual')
        },

        onSliderChange(value) {

            this.slideValue = value
            const { key, effectKey } = this.data
            const allParams = {
                [effectKey]: this.selectPath,
                [key]: this.slideValue
            }
            this.$emit('on-change', allParams, { [key]: value }, 'manual')
        },

        onResetSingle() {
            this.onSliderChange(this.currentSuitDefaultValue)
        }
    }
})
</script>

<style lang="scss" scoped>

.container {
    width: 100%;
    height: 100%;

    .slider-container {
        width: 100%;

        .slider-title {
            width: 100%;
            display: flex;
            flex-direction: row;
        }

        .slider {
            position: relative;
            flex: 1;
            margin: 9px 12px;

            /deep/ {

                .el-slider__input.el-input-number--mini {
                    width: 39px;
                    height: 22px;

                    .el-input--mini .el-input__inner {
                        height: 22px;
                        line-height: 22px;
                        font-size: 12px;
                        padding-left: 3px;
                        padding-right: 3px;
                    }
                }

                .el-slider__runway.show-input {
                    margin-right: 50px;
                }

                .el-slider__bar {
                    margin-left: -7px;
                }

                .el-slider__runway {
                    margin: 0px 0px;

                    &::before {
                        position: absolute;
                        content: " ";
                        background: inherit;
                        width: calc(100% + 14px);
                        height: 2px;
                        top: calc(50% - 1px);
                        left: -7px;
                        right: 0px;
                        border-radius: 3px;
                    }

                    .el-slider__button-wrapper {
                        height: 16px;
                        width: 16px;
                        top: -8px;
                    }
                }


            }
        }

        .slider /deep/ .el-slider__runway:before {
            position: absolute;
            content: " ";
            background: inherit;
            width: calc(100% + 14px);
            height: 2px;
            top: calc(50% - 1px);
            left: -7px;
            right: 0px;
            border-radius: 3px;
        }

        .value {
            font-size: 12px;
        }

    }
}

</style>
