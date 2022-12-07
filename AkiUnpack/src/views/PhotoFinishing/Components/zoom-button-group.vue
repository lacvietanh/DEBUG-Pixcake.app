<template>
    <div class="zoom-button-group">
        <div class="zoom-panel-box">
            <i class="el-icon-minus icon" @click="imageResize('out')"></i>

            <ts-slider
                ref="slider"
                class="slider"
                :min="5"
                :max="200"
                :show-tooltip="false"
                :value="zoom"
                @mousedown="isMousedown = true"
                @mouseup="isMousedown = false"
                @input="onZoomSlider"
                @change="handleSliderChange">
            </ts-slider>

            <i class="el-icon-plus icon" @click="imageResize('in')"></i>

            {{ transformUseValue(zoom) }} %
        </div>

        <el-radio-group
            v-model="fitPosition"
            :disabled="disabledQuickButton"
            fill="#1E1E1E"
            text-color="#EECC28"
        >
            <el-radio-button
                v-blur
                label="fit"
                v-gtag-event="PointClickFit"
                @click.native="disabledQuickButton ? () => {} : imageResize('fit')"
            >{{ $t('pagePhotoFinishing.fitBtn') }}
            </el-radio-button>
            <el-radio-button
                v-blur
                label="one2one"
                v-gtag-event="PointClickOriginal"
                @click.native="disabledQuickButton ? () => {} : imageResize('one2one')">
                1:1
            </el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
import { watch, ref, getCurrentInstance } from 'vue'
import { RadioButton, RadioGroup } from 'element-ui'
import TsSlider from '@/components/TsSlider'
import pointsMixin from '@/mixins/pointsMixin'

export default {
    name: 'ZoomButtonGroup',
    components: {
        'el-radio-group': RadioGroup,
        'el-radio-button': RadioButton,
        TsSlider
    },
    mixins: [pointsMixin],
    props: {
        value: {
            type: Number
        },
        disabled: {
            type: Boolean,
            default: false
        },
        showAllScale: {
            type: Number,
            default: -1
        },
        disabledQuickButton: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const that = getCurrentInstance().proxy

        const fitPosition = ref('none')
        const zoom = ref(100)
        const isMousedown = ref(false)
        const zoomOutList = [20, 30, 40, 50, 60, 70, 80, 90, 100]
        const zoomInList = [100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000, 1200]

        function getRatio(type = 'in', value = 0) {
            console.log('getRatio: ', value)
            const ratioList = Array.from([...zoomOutList, ...zoomInList])
            let ratio = value.toStrip(4)
            if (type === 'out') {
                const reverseRatio = ratioList.reverse()
                for (const i of reverseRatio) {
                    if (i < ratio) {
                        ratio = i
                        return ratio
                    }
                }
            } else if (type === 'in') {
                for (const i of ratioList) {
                    if (i > ratio) {
                        ratio = i
                        return ratio
                    }
                }
            }

            return ratio
        }

        function transformInsideValue(ratio) {
            let value = ratio / 100
            if (value > 1) {
                const min = zoomInList[0]
                const max = zoomInList[zoomInList.length - 1]
                value = ((value - 1) * 100 / (max - min) + 1)
            }
            return (value * 100)//.toRound(1)
        }

        function transformUseValue(value) {
            let ratio = 1
            if (value < 100) {
                ratio = value / 100
            } else if (value > 100) {
                const min = zoomInList[0]
                const max = zoomInList[zoomInList.length - 1]
                ratio = ((value - 100) / 100 * (max - min) + min) / 100
            }

            return ((ratio + 0.00001) * 100).toRound(1)
        }


        // slider 拖拽
        function onZoomSliderWrap(value) {
            if (isMousedown.value) {
                zoom.value = value
                emit('on-slider', transformUseValue(value))
            }
        }

        watch(() => props.value, (val) => {
            zoom.value = transformInsideValue(val)

            fitPosition.value = 'none'
            if (zoom.value === 100) {
                fitPosition.value = 'one2one'
            }

            if (props.showAllScale !== -1) {
                if (transformUseValue(zoom.value) === transformUseValue(transformInsideValue(props.showAllScale))) {
                    fitPosition.value = 'fit'
                }
            }
        })

        watch(zoom, (val) => {
            emit('input', transformUseValue(val))
        })

        return {
            zoom,
            isMousedown,
            fitPosition,
            transformUseValue,
            onZoomSlider: (value) => onZoomSliderWrap(value),
            imageResize: (mode) => {
                if (['in', 'out'].includes(mode)) {
                    const value = getRatio(mode, transformUseValue(zoom.value))
                    zoom.value = transformInsideValue(value)
                    emit('on-slider', value)
                } else {
                    emit('on-resize', mode)
                }
            },
            handleSliderChange: () => {
                that?.$tsStat.event('cake_refine', {
                    cake_operate: 'slide_zoom_rod'
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.zoom-button-group {
    display: flex;

    &:hover {
        cursor: default;
    }

    .zoom-panel-box {
        transform: scale(.9);
        display: flex;
        justify-content: left;
        align-items: center;
        width: 155px;
        font-size: 12px;
        color: #D9D9D9;
        font-weight: 400;
        white-space: nowrap;

        .slider {
            flex: 1;
            margin: 0 8px;
            min-width: 61px;
            max-width: 61px;

            /deep/ {
                .el-slider__runway {
                    background: #6E6E6E;

                    .el-slider__bar {
                        background: #D9D9D9;
                    }
                }
            }
        }

        .icon {
            font-size: 12px;

            &:last-child {
                margin-right: 4px;
            }
        }
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
                        border-right-width: 1px;
                    }
                }

                &:first-child {
                    .el-radio-button__inner {
                        border-left-color: #4D4D4D !important;
                    }
                }
            }
        }

        .el-radio-button__inner {
            width: 40px;
            padding: 7px 5px !important;
        }
    }
}

</style>
