<!--滤镜 更多模块-->
<template>
    <div class="filter-panel-component">
        <div class="header"
             @click="exitScene">

            <div class="header-title">
                <i class="el-icon-arrow-left"></i>
                滤镜
            </div>
        </div>

        <div class="filter-container global__scroll-style">
            <template v-for="(column, i) in filterColumnFormat">
                <div class="filter-column" :key="i">
                    <template v-for="(it, index) in column || []">
                        <div
                            :key="index"
                            class="claItemBox"
                            @click="onChangePath(it, index)">
                            <div class="item-container"
                                 :class="{
                                    'border-primary-style-hover': it.path === filterPath,
                                    'select': it.path === filterPath
                               }">
                                <i v-if="it.new" class="ts-icon ts-icon-new"></i>
                                <div
                                    v-if="it.isOriginal"
                                    class="original-img-container"
                                >
                                    <img
                                        :src="$getIconPath('filter_icon_no_effect@3x.png')"
                                        class="original-img"/>
                                </div>

                                <img
                                    v-else
                                    :src="it.iconPath"
                                    class="claImg"/>

                            </div>
                            <div class="claName"
                                 :class="{
                                    'background': index >= 1
                                 }"
                            >{{ it.name | filterFormatName }}
                            </div>
                        </div>
                    </template>
                </div>

                <template v-if="activeColumn === i && !!filterPath">
                    <div class="filter-column-slider" :key="`slider_${i}`">
                        <span class="name" @dblclick="onResetSingle">程度</span>

                        <ts-slider
                            class="slider"
                            :min="0"
                            :max="100"
                            :disabled="!filterPath"
                            :show-tooltip="false"
                            v-model="filterAlpha"
                            @input="$emit('on-input-slider', $event)"
                            @change="onChangeAlpha"
                            @ondblclick="onResetSingle"
                        >
                        </ts-slider>

                        <ts-number-placeholder
                            class="percent"
                            :min="0"
                            :max="100"
                            :disabled="!filterPath"
                            :value="filterAlpha"
                            @on-blur="$emit('on-blur')"
                            @on-focus="$emit('on-focus')"
                            @change="onChangeAlpha"
                        />
                    </div>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import TsSlider from '@/components/TsSlider'
import { convertToMultArray } from '@/utils/utils'
import TsNumberPlaceholder from 'components/TsNumberPlaceholder'

export default {
    name: 'FilterPanelComponent',

    components: {
        'ts-slider': TsSlider,
        TsNumberPlaceholder
    },

    props: {
        currentSelectId: {
            type: String,
            default: ''
        },
        currentSliderValue: {
            type: Number,
            default: 0
        }
    },

    data() {
        return {
            row: 3,
            filterPath: '',
            filterAlpha: 0
        }
    },
    computed: {
        filterList() {
            return this.$store.getters['presetSuit/filterList']
        },
        filterPathCache() {
            return this.$store.getters['project/filterPathCache']
        },
        filterColumnFormat() {
            return convertToMultArray(this.filterList, 3)
        },
        activeColumn() {
            let column = 0
            this.filterColumnFormat.forEach((item, index) => {
                if (item.some(filter => filter.path === this.filterPath)) {
                    column = index
                }
            })
            return column
        }
    },

    watch: {
        currentSelectId(val) {
            this.filterPath = val
        },
        currentSliderValue(val) {
            this.filterAlpha = val
        },

        filterAlpha(val) {
            this.$emit('update:currentSliderValue', val)
        }
    },

    filters: {
        filterFormatName(value) {
            if (value.length >= 10) {
                // ... 名字过滤器
                let start = value.substr(0, 4)
                let end = value.substr(value.length - 2, 2)
                return `${start} ... ${end}`
            }
            return value
        }
    },
    methods: {
        onResetSingle() {
            const obj = this.filterList.find(item => item.path === this.filterPath)
            if (this.filterAlpha === obj.value) {
                return
            }

            this.onChangeAlpha(obj.value)
        },

        onChangeAlpha($event) {
            this.filterAlpha = $event

            store.dispatch('project/ACT_SetFiltersSelectCache', {
                path: this.filterPath,
                value: this.filterAlpha
            })

            this.$emit('on-change-slider', this.filterAlpha)
        },

        exitScene() {
            this.$emit('on-close')
        },

        onChangePath(item, index) {
            this.filterPath = item.path

            if (!this.filterPath) {
                this.filterAlpha = 0
            }

            this.$emit('on-change-select', item, index)
        }
    }
}
</script>

<style lang="scss" scoped>

.filter-panel-component {
    position: fixed;
    right: 45px;
    bottom: 0;
    top: 48px;
    flex-shrink: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    width: 300px;
    background: #282828;

    .header {
        height: 38px;
        line-height: 38px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #1E1E1E;
        padding: 0 15px;

        &-title {
            font-size: 12px;
            color: #D9D9D9;

            &:hover {
                color: #fff;
            }

            .el-icon-arrow-left {
                font-size: 14px;
            }
        }
    }

    .filter-container {
        padding: 8.5px 17px;
        overflow-y: overlay;
        overflow-x: hidden;
    }

    .filter-column {
        display: flex;
    }

    .claItemBox {
        margin-bottom: 8px;
        aspect-ratio: 1 / 1;
        display: flex;
        flex-direction: column;
        margin-right: 6px;

        &:last-child {
            margin-right: 0;
        }

        .item-container {
            box-sizing: border-box;
            padding: 1px;
            width: 84px;
            height: 84px;
            border-radius: 4px;
            aspect-ratio: 1 / 1;
            display: flex;
            flex-direction: row;
            position: relative;
            overflow: hidden;

            .ts-icon-new {
                position: absolute;
                left: 1px;
                top: 1px;
                width: 23px;
                height: 10px;
                padding: 0px 0px;
                pointer-events: none;
            }

            &.select {
                border-width: 1px;
                border-style: solid;
                box-sizing: border-box;
            }

            .claImg {
                border-radius: 4px;
                width: 100%;
                object-fit: cover;
                background: grey;
            }

            .original-img-container {
                width: 84px;
                height: 84px;
                border-radius: 4px;
                aspect-ratio: 1 / 1;
                display: flex;
                flex-direction: row;
                position: relative;
                overflow: hidden;
                background: #393939;
                align-items: center;
                justify-content: center;

                .original-img {
                    width: 18px;
                    height: 18px;
                }
            }

            .background {
                background-image: linear-gradient(#cc000000, #000000);
            }
        }

        .claName {
            margin-top: 4px;
            height: 14px;
            line-height: 14px;
            font-size: 10px;
            color: #A6A6A6;
            text-align: center;
            font-weight: 400;
            width: 100%;
        }

    }

    .filter-column-slider {
        height: 28px;
        display: flex;
        font-size: 12px;
        color: #A6A6A6;
        line-height: 21px;
        font-weight: 400;
        box-sizing: border-box;
        align-items: center;
        flex-direction: row;
        margin-bottom: 10px;

        .label {
            margin-right: 8px;

            .percent {
                &:hover {
                    color: #2D6B96;
                }
            }
        }

        .select {
            ///deep/ .el-input--mini .el-input__inner {
            //    height: 24px;
            //    line-height: 24px;
            //}
            /deep/ .el-input__inner {
                height: 24px;
                margin-top: 4px;

            }

            /deep/ .el-input__suffix {
                top: 3px;

                .el-select__caret {
                    font-size: 14px;
                }
            }
        }

        /deep/ .slider.el-slider {
            .el-slider__runway {
                background: #333333;
                margin: 2px 0;

                .el-slider__bar {
                    background: #999999;
                }

                .el-slider__button {
                    border: none !important;
                    background: #EDEDED;
                    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
                }
            }
        }

        .slider {
            position: relative;
            flex: 1;
            margin: 8px 12px;

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
    }
}

</style>
