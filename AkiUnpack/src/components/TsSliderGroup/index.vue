<template>
    <div class="ts-slider-group-container" :class="{ 'no-title': !cTitle }">
        <div class="ts-slider-group-container-title" v-if="cTitle">{{ cTitle }}</div>

        <div class="ts-slider-group-container-label">
            <span class="db-label-item" v-for="(option, i) in options" :key="i">
                <span class="label">
                    <span @dblclick="onDoubleClick(option.value, i, 'label')">{{ option.name }} </span>
                </span>

                <ts-number-placeholder
                    class="label-value"
                    :min="option.min || 0"
                    :max="option.max || 100"
                    :step="option.step || step"
                    :disabled="disabled || option.disabled"
                    v-model="tempObj[i]"
                    @on-blur="$emit('on-blur')"
                    @on-focus="$emit('on-focus')"
                    @change="onSlider($event, i)"
                />
            </span>
        </div>

        <div class="ts-slider-group-container-slider">
            <template v-for="(item, i) in options">
                <ts-slider
                    class="ts-slider-group-item slider"
                    :key="i"
                    :min="item.min || 0"
                    :max="item.max || 100"
                    :step="item.step || step"
                    :show-input-controls="item.showInputControls || showInputControls"
                    :show-tooltip="item.showTooltip || showTooltip"
                    :show-input="item.showInput ||showInput "
                    :input-size="item.inputSize || inputSize"
                    :show-stops="item.showStops || showStops"
                    :format-tooltip="item.formatTooltip || formatTooltip"
                    :disabled="item.disabled || disabled"
                    :range="item.range || range"
                    :vertical="item.vertical || vertical"
                    :height="item.height || height"
                    :debounce="item.debounce || debounce"
                    :label="item.label || label"
                    :tooltipClass="item.tooltipClass || tooltipClass"
                    :marks="item.marks || marks"
                    :c-style="item.cStyle || cStyle"
                    v-model="tempObj[i]"
                    @keydown.native.meta="preventDefault"
                    @keydown.native.ctrl="preventDefault"
                    @keydown.native.exact.stop
                    @change="onSlider($event, i)"
                    @ondblclick="onDoubleClick(item.value, i, 'slider')"
                    @input="onSlider($event, i, 'input')"
                ></ts-slider>

                <template v-if="i !== options.length - 1">
                    <ts-slider-group-lock-icon
                        :isLock.sync="isLock"
                        ref="lock"
                        :index="i"
                        :key="item.key"
                        @click="onLockClick"
                    />
                </template>
            </template>

        </div>
    </div>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue'

import { isEqual } from 'lodash'
import TsSlider from '@/components/TsSlider'
import TsSliderGroupLockIcon from './components/ts-slider-group-lock-icon.vue'
import TsNumberPlaceholder from '@/components/TsNumberPlaceholder'

export default {
    name: 'TsSliderGroup',
    components: {
        'ts-slider': TsSlider,
        TsNumberPlaceholder,
        'ts-slider-group-lock-icon': TsSliderGroupLockIcon
    },
    props: {
        step: {
            type: Number,
            default: 1
        },
        value: {
            type: [Array, Number],
            default() {
                return [0, 0]
            }
        },
        showInput: {
            type: Boolean,
            default: false
        },
        showInputControls: {
            type: Boolean,
            default: false
        },
        inputSize: {
            type: String,
            default: 'small'
        },
        showStops: {
            type: Boolean,
            default: false
        },
        showTooltip: {
            type: Boolean,
            default: false
        },
        formatTooltip: Function,
        disabled: {
            type: Boolean,
            default: false
        },
        range: {
            type: Boolean,
            default: false
        },
        vertical: {
            type: Boolean,
            default: false
        },
        height: {
            type: String
        },
        debounce: {
            type: Number,
            default: 300
        },
        label: {
            type: String
        },
        tooltipClass: String,
        marks: Object,
        cStyle: Object,
        cTitle: {
            type: String,
            default: ''
        },
        options: {
            type: Array,
            default: () => {
                return []
            }
        }
    },

    setup(props, { emit }) {

        const isAutoSync = ref(false)
        const isLock = ref(true)
        const isMounted = ref(false)

        onMounted(() => {
            nextTick(() => {
                isMounted.value = true
            })
        })

        const keys = computed(() => props.options.map(option => option.key))

        const initObj = (arr) => {
            const obj = {}
            arr.forEach((item, i) => {
                obj[i] = item.value
            })
            return obj
        }

        const tempObj = ref(initObj(props.options))
        watch(() => props.options, (val) => {
            tempObj.value = initObj(val)
        })

        const objectToArray = (data) => {
            const arr = []
            const keys = Object.keys(data) || []
            keys.forEach(key => {
                arr[key] = data[key]
            })
            return arr
        }

        const arrayToObject = (arr) => {
            const obj = {}
            arr.forEach((item, i) => {
                obj[i] = item
            })
            return obj
        }

        // 同步value值
        function assertArrAllEqual(arr) {
            return !arr.reduce((pre, cur) => {
                return pre ^ cur
            })
        }
        function syncArrayValue(pValue, nValue) {
            return pValue.map((v, i) => {
                return typeof nValue[i] !== 'undefined' ? nValue[i] : v
            })
        }

        watch(() => props.value, (val) => {
            const cValue = objectToArray(tempObj.value)
            if (!isEqual(val, cValue)) {
                const result = syncArrayValue(cValue, val)
                isLock.value = assertArrAllEqual(result)
                tempObj.value = arrayToObject(result)
            }
        }, { immediate: true })


        const currentValue = computed(() => objectToArray(tempObj.value))
        const onSlider = (value, i, eventId = 'change') => {
            if (!isMounted.value && eventId === 'input') {
                return
            }

            tempObj.value[i] = value
            let updateIndexs = [i]

            // 锁定时同步滑竿
            if (isLock.value) {
                const indexs = []
                for (const i in tempObj.value) {
                    tempObj.value[i] = value
                    indexs.push(i)
                }
                updateIndexs = indexs
            }

            console.log('eventId: ', isLock.value, tempObj.value)

            if (isAutoSync.value && eventId === 'input') {
                return
            }

            emit(eventId, objectToArray(currentValue.value), updateIndexs)
        }

        const onLockClick = (lock) => {
            if (lock) {
                const value = tempObj.value[0]
                let needUpdate = false
                for (const i in tempObj.value) {
                    if (value !== tempObj.value[i]) {
                        needUpdate = true
                    }
                }

                if (needUpdate) {
                    isAutoSync.value = true
                    onSlider(value, 0)
                    nextTick(() => {
                        isAutoSync.value = false
                    })
                }
            }
        }

        const onDoubleClick = (value, i, name) => {
            isAutoSync.value = true
            onSlider(value, i)
            nextTick(() => {
                isAutoSync.value = false
            })
            emit('reset-single', currentValue.value, name)
        }

        return {
            keys,
            currentValue,
            tempObj,
            isLock,

            onSlider,
            onLockClick,
            onDoubleClick,

            preventDefault: (e) => {
                if ([37, 38, 39, 40, 48, 187, 189].includes(e.keyCode)) {
                    if ([37, 38, 39, 40].includes(e.keyCode)) {
                        e.stopPropagation()
                    }
                    e.preventDefault()
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.ts-slider-group-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 45px;

    &.no-title {
        height: 28px;
    }

    &-title {
        font-size: 12px;
        line-height: 17px;
    }

    &-label {
        display: flex;
        align-items: center;
        font-size: 10px;
        line-height: 14px;
        color: #737373;

        .db-label-item {
            flex: 1;
            display: flex;

            &:nth-child(-n+1) {
                margin-right: 38px;
            }
        }

        .label-value {
            color: #D9D9D9;

            &:hover {
                color: #2D6B96;
            }
        }

        .label {
            flex-grow: 1;
            flex-shrink: 0;
        }

    }

    &-slider {
        display: flex;
        width: 100%;
        align-items: center;
        height: 12px;

        .ts-slider-group-item {
            flex: 1;

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

                .el-slider__runway {
                    margin: 4px 0;
                    cursor: default;

                    &::after {
                        position: absolute;
                        content: " ";
                        background: transparent;
                        width: calc(100% + 14px);
                        height: 12px;
                        top: calc(50% - 6px);
                        left: -7px;
                        right: 0;
                        border-radius: 3px;
                    }

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

                    &.show-input {
                        margin-right: 50px;
                    }
                }

                .el-slider__bar {
                    margin-left: -7px;
                }

                .el-slider__button-wrapper {
                    height: 16px !important;
                    width: 16px;
                    top: -7px;

                    .el-slider__button {
                        border: none !important;
                        background: #EDEDED;
                        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        margin: auto;
                    }
                }
            }
        }
    }
}
</style>
