<template>
    <el-collapse-item :name="type" class="custom-collapse-item" ref="customCollapseItemRef">
        <div slot="title" class="params-adjust-group-item-title" @click="$emit('focus')">
            <div class="title-span">
                <div class="title">
                    {{ data.name }}
                    <span v-if="data.nameDesc" class="desc">
                        {{data.nameDesc}}
                    </span>
                </div>
                <template v-if="data.tip">
                    <el-tooltip content="" placement="top">
                        <i class="ts-icon ts-icon-question-outside"></i>
                        <div slot="content">
                            <template v-if="typeof data.tip === 'string'">
                                {{ data.tip }}
                            </template>
                            <template v-else>
                                <p v-for="(t, i) in data.tip" :key="i">{{ t }}</p>
                            </template>
                        </div>
                    </el-tooltip>
                </template>

                <template v-if="data.new">
                    <i class="ts-icon-new"></i>
                </template>

                <!--                <span v-if="data.nameLabel" class="title-label">{{ data.nameLabel }}</span>-->

                <!--                <template v-if="beta">-->
                <!--                    <el-tooltip content="尝鲜版" placement="right" effect="dark">-->
                <!--                    <i class="el-icon-warning icon"></i>-->
                <!--                    </el-tooltip>-->
                <!--                </template>-->
            </div>

            <div class="title-span">
                <i
                    v-if="isModify"
                    class="el-icon-refresh-right reset-btn-icon"
                    @click.stop="[reset('manual'), $emit('focus')]">
                </i>
				<slot name="title-right"></slot>
			</div>
        </div>

        <ComponentCollection
            class="params-adjust-group-component c-text-label"
            style="margin: 4px 16px"
            ref="componentCollectionRef"
            :parent-tab-name="data.name"
            :type="type"
            :disabled="disabled || isSkyDisabled"
            :data="formComponents"
            :single-reset-function="singleSingleFunction"
            v-model="allParamValues"
            @on-blur="onBlur"
            @on-focus="onFocus"
            @on-input="onInput"
            @on-change="onChange"
            @on-keys="paramsKeys = $event"
            @user-behavior="$emit('user-behavior', $event)"
            @on-change-single="(key, value) => $emit('on-change-single', key, value)"
        >
            <template #filter>
                <filter-component
                    ref="filterRef"
                    name="filter"
                    :initParams="initParams"
                    @on-focus="onFocus"
                    @on-blur="onBlur"
                    @on-modify="filterIsModify = $event"
                    @on-selection="$emit('point-filter', data)"
                    @on-input="onSlotInput"
                    @on-change="(params, cParams, opt, ext) => $emit('on-change', cParams, opt, ext)"
                />
            </template>

            <template #idPhoto>
                <id-photo
                    ref="idPhoto"
                    :init-params="initParams"
                    @on-blur="onBlur"
                    @on-focus="onFocus"
                    @on-modify="bgIsModify = $event"
                    @on-change="(params, cParams, opt, ext) => $emit('on-change', cParams, opt, ext)"
                />
            </template>

            <template #idPhotoSky>
                <id-photo-sky
                    ref="idPhotoSky"
                    :init-params="initParams"
                    :have-sky="isSkySelectEnable"
                    @on-blur="onBlur"
                    @on-focus="onFocus"
                    @on-modify="skyIsModify = $event"
                    @on-change="(params, cParams, opt, ext) => $emit('on-change', cParams, opt, ext)"
                />
            </template>


            <template #makeupSuit="{ data }">
                <SuitParamsGroup
                    ref="suitParamsGroup"
                    :data="data"
                    :init-params="initParams"
                    @on-modify="makeupSuitModify = $event"
                    @on-focus="onFocus"
                    @on-blur="onBlur"
                    @on-input="onSlotInput"
                    @on-change="(params, cParams, opt, ext) => $emit('on-change', cParams, opt, ext)"
                />
            </template>
        </ComponentCollection>

        <p class="params-adjust-group-item-label" v-if="data.label">{{ data.label }}</p>
    </el-collapse-item>
</template>

<script>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import store from '@/store'

import { cloneDeep, isEqual, throttle } from 'lodash'
import { QtEventFilter, QtEventFilterType } from '@/utils/QtEventFilter'

// 参数
import { getFormComponents } from './ParamsComponents'

// 组件
import { CollapseItem, Tooltip } from 'element-ui'
import ComponentCollection from 'components/ComponentCollection'
import IdPhoto from './BackgroundReplace/id-photo'
import SuitParamsGroup from '@/components/SuitParamsGroup/SuitParamsGroup'
import FilterComponent from '@/views/PhotoFinishing/Components/FilterComponent'
import FilterParamModel from '@/model/ParamsModel/FilterParamModel'
import HistoryRecord from './ParamsComponents/model/HistoryRecord'
import IdPhotoSky from './BackgroundReplace/id-photo-sky'
import { RealtimeType } from '@/constants/constants'

export default {
    name: 'custom-collapse-item',
    components: {
        // 'el-button': Button,
        'el-tooltip': Tooltip,
        'el-collapse-item': CollapseItem,
        ComponentCollection,
        IdPhoto,
        FilterComponent,
        SuitParamsGroup,
        IdPhotoSky
        // AdjustableComponentBody
    },
    props: {
        showSliderInput: {
            type: Boolean,
            default: false
        },
        showLabelPercent: {
            type: Boolean,
            default: false
        },
        active: Boolean,
        initParams: Object, // 初始参数，子组件重置作用
        data: {
            type: Object,
            default: () => {
            }
        },
        type: String,
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const personType = computed(() => store.getters['refine/personType'])
        const extendInfo = computed(() => store.getters['refine/extendInfo'])
        const imageType = computed(() => store.getters['refine/imageType'])
        const baseValue = computed(() => store.getters['refine/baseValue'])
        const bgCleanModeDefault = computed(() => store.getters['refine/bgCleanModeDefault'])
        const bgCleanMooreModeDefault = computed(() => store.getters['refine/bgCleanMooreModeDefault'])
        const enableRealtime = computed(() => store.getters['refine/enableRealtime'])
        const symmetryStatusJson = computed(() => store.getters['refine/symmetryStatusJson'])

        const skyExtendInfo = computed(() => store.getters['refine/skyExtendInfo'])
        const formComponents = computed(() => {
            let arr = []
            switch (props.type) {
                case 'filter':
                    arr = [
                        {
                            cType: 'slot',
                            slotName: 'filter',
                            realtime: true,
                            realtimeKeys: [{ key: FilterParamModel.key, realtime: RealtimeType.AlwaysEnable }],
                        }
                    ]
                    break;
                case 'replace':
                    arr = [
                        {
                            cType: 'slot',
                            slotName: 'idPhoto',
                            line: true
                        }
                    ]
                    break;

                case 'removeDefects':
                case 'skin':
                case 'teeth':
                case 'eye':
                case 'makeup':
                    arr = getFormComponents(props.type, { personType: personType.value })
                    break;

                case 'facialRefine':
                    arr = getFormComponents(props.type, { personType: personType.value, symmetryStatusJson: symmetryStatusJson.value })
                    break;

                case 'body':
                    arr = getFormComponents(props.type, { personType: personType.value, extendInfo: extendInfo.value })
                    break;

                case 'whiteBalance':
                    arr = getFormComponents(props.type, { imageType: imageType.value, baseValue: baseValue.value })
                    break

                case 'backgroundEnhance':
                    arr = getFormComponents(props.type, { bgCleanModeDefault: bgCleanModeDefault.value, bgCleanMooreModeDefault: bgCleanMooreModeDefault.value })
                    break
                case 'sky':
                    arr = getFormComponents(props.type, {skyExtendInfo: skyExtendInfo.value})
                    break
                default:
                    arr = getFormComponents(props.type)
                    break

            }
            return arr
        })

        const historyRecord = ref(new HistoryRecord(props.data, formComponents.value))

        watch(formComponents, (val) => {
            historyRecord.value = new HistoryRecord(props.data, val)
        })
        console.debug("historyRecord: ", historyRecord.value)

        const allParamValues = ref({})
        const paramsKeys = ref([])

        const initParamsFilter = computed(()=> {
            const obj = {}
            for (const key in props.initParams) {
                if (paramsKeys.value.includes(key)) {
                    obj[key] = props.initParams[key]
                }
            }
            return obj
        })
        const resultFilter = computed(()=> {
            const obj = {}
            for (const key in allParamValues.value) {
                if (paramsKeys.value.includes(key)) {
                    obj[key] = allParamValues.value[key]
                }
            }
            return obj
        })

        const makeupSuitModify = ref(false)
        const bgCropIsModify = ref(false)
        const skyIsModify = ref(false)
        const bgIsModify = ref(false)
        const filterIsModify = ref(false)


        // 是否存在修改
        const isModify = computed(() => {
            if (makeupSuitModify.value || bgCropIsModify.value || bgIsModify.value || filterIsModify.value || skyIsModify.value) {
                return true
            }

            return Object.keys(initParamsFilter.value).length > 0
                && Object.keys(resultFilter.value).length > 0
                && !isEqual(resultFilter.value, initParamsFilter.value)
        })


        watch(isModify, (val) => emit('on-modify', val))
        const isSkyDisabled = computed(() => props.type === 'sky' && !skyIsModify.value)
        const isSkySelectEnable = computed(() => skyExtendInfo.value.sky)

        const idPhoto = ref()
        const idPhotoTailorPanel = ref()
        const filterRef = ref()
        const suitParamsGroup = ref()
        const idPhotoSky = ref()

        // 重置数据
        const componentCollectionRef = ref()
        const reset = () => {
            if (componentCollectionRef.value) {
                const data = componentCollectionRef.value.reset(initParamsFilter.value)
                if (data && Object.keys(data).length > 0) {
                    // console.debug('on-reset: ', data)
                    const ext = historyRecord.value.createResetHistoryRecord(personType.value)
                    console.debug('history: ', ext)
                    emit('on-change', data, 'reset', ext)
                }

                idPhoto.value?.reset()
                idPhotoTailorPanel.value?.reset()
                suitParamsGroup.value?.reset()
                filterRef.value?.reset()
                idPhotoSky.value?.reset()

                emit('on-reset', props.type)
            }
        }

        // 更新插槽组件数据
        const syncSlotComp = (data) => {
            nextTick(() => {
                idPhoto.value?.init(data)
                idPhotoTailorPanel.value?.init(data)
                idPhotoSky.value?.init(data)
                if (suitParamsGroup.value && Object.keys(data).length > 4) {
                    suitParamsGroup.value?.init(data)
                }

                if (filterRef.value && Object.keys(data).length > 0) {
                    filterRef.value?.init(data)
                }
            })
        }

        // 同步参数
        const sync = (data) => {
            nextTick(() => {
                allParamValues.value = cloneDeep(data)
                syncSlotComp(data)
            })
        }

        // 单滑竿重置 前置回调
        const singleSingleFunction = (data) => {
            return initParamsFilter.value[data.key]
                ? initParamsFilter.value[data.key]
                : data.defaultValue
        }


        const isRealtime = (data) => {
            const keys = Object.keys(data || {}) || []
            if (keys.length > 2 || keys.length <= 0) {
                return false
            }

            return historyRecord.value.isRealtime(keys, enableRealtime.value)
        }


        const onInput = throttle(function (data) {
            if (isRealtime(data)) emit('on-input', data)
        }, 30)

        const onSlotInput = throttle (function (data, changeData, operation) {
            if (isRealtime(changeData) && operation !== 'init') emit('on-input', changeData, operation)
        }, 30)

        const result = ref({})
        const onChange = (data) => {
            if (isRealtime(data)) {
                const ext = historyRecord.value.createHistoryRecord(data)
                emit('on-change', data, 'manual', ext)
            } else {
                // 数值修改才触发
                let isChange = false
                for (const key in data) {
                    if (result.value[key] !== data[key]) {
                        isChange = true
                    }
                }
                if (isChange) {
                    const ext = historyRecord.value.createHistoryRecord(data)
                    emit('on-change', data, 'manual', ext)
                }
            }
        }

        const customCollapseItemRef = ref()
        onMounted(() => {
            nextTick(() => {
                const domRef = customCollapseItemRef.value
                if (domRef) {
                    domRef.$el.firstChild.firstChild.setAttribute('tabindex', '')
                }
            })
        })

        return {
            customCollapseItemRef,
            componentCollectionRef,
            idPhoto,
            idPhotoTailorPanel,
            filterRef,
            suitParamsGroup,
            idPhotoSky,

            allParamValues,
            formComponents,

            paramsKeys,
            bgIsModify,
            bgCropIsModify,
            skyIsModify,
            makeupSuitModify,
            filterIsModify,
            isModify,
            isSkySelectEnable,
            isSkyDisabled, //

            reset,
            sync,
            syncSlotComp,
            singleSingleFunction,

            onInput,
            onSlotInput,
            onChange,

            onBlur: () => new QtEventFilter().process([QtEventFilterType.KeyBoard], true),
            onFocus: () => new QtEventFilter().process([QtEventFilterType.KeyBoard], false),
        }
    }
}
</script>

<style lang="scss" scoped>
// 字体颜色
$smallFontSize: 13px; // 主要文字
$smallFontColor: #B8B8B8; // 小文案主题色
$placeholderFontColor: #C0C4CC; // 占位文字
$primaryColor: #0080FF; // 占位文字

.custom-collapse-item {
    /deep/ {
        .el-collapse-item__content {
            padding-bottom: 8px;
        }
    }
}

.params-adjust-group-item-title {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    font-size: $smallFontSize;

    .ts-icon-new {
        width: 22px;
        height: 11px;
        margin-left: 4px;
    }

    .title-span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        .title {
            font-weight: 500;
        }

        .desc {
            font-size: 12px;
            color: #A6A6A6;
            line-height: 28px;
            font-weight: 400;
            padding-left: 4px;
        }
    }

    > span {

    }

    .title-label {
        color: $smallFontColor;
        font-weight: 500;
        font-size: 10px;
    }

    .reset-btn {
        font-size: $smallFontSize;
        margin-left: 16px;
    }

    .reset-btn-icon {
        margin-left: 10px;
        font-size: 16px;
        opacity: 0.8;


        &:hover {
            opacity: 1;
        }
    }

    .ts-icon-question-outside {
        vertical-align: sub;
        margin-left: 4px;
    }

    //.badge {
    //    font-style: normal;
    //    font-weight: 500;
    //    font-size: 7px;
    //    line-height: 7px;
    //    border-radius: 4px 4px 4px 0;
    //    position: relative;
    //    top: -8px;
    //    padding: 1px 4px;
    //}
}

.params-adjust-group-item-label {
    color: $placeholderFontColor;
    text-align: center;
}

.params-adjust-group-component {
    /deep/ {
        .divider {
            width: calc(100% + 32px);
            position: relative;
            left: -16px;
        }

        .params-adjust-group-item {
            height: 38px;
            margin-bottom: 0;

            &.title {
                height: 24px;
                margin-top: 4px;
            }
        }

        .params-adjust-group-button {
            height: 38px;
        }

        .el-radio-group {
            box-shadow: 0 2px 5px 0px rgba(0, 0, 0, 0.3);
            background: #4D4D4D;
            border-radius: 4px;

            .el-radio-button__inner {
                background: #535252;
                border: 1px solid #535252;
                padding: 4px 12px;
                margin: 1px;

                &:hover {
                    color: #ffffff;
                }
            }

            .el-radio-button__orig-radio:checked + .el-radio-button__inner {
                background: #1E1E1E;
                border: 1px solid #1E1E1E;
                color: #EECC28;
                border-radius: 4px;
                box-shadow: none;
            }
        }

        .el-switch {

            .el-switch__core {
                background: #535252;
                border: 1px solid #535252;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
                width: 24px !important;
                height: 8px;

                &:after {
                    width: 12px;
                    height: 12px;
                    background: rgba(255, 255, 255, 0.8);
                    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
                    top: -3px;
                    margin-left: -2px;
                }
            }

            &.is-checked .el-switch__core {
                background: $primaryColor;
                border: 1px solid $primaryColor;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);

                &:after {
                    background: rgb(255, 255, 255);
                    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);
                    margin-left: -11px;
                }
            }
        }

        .el-slider {
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

        .el-checkbox {
            .el-checkbox__input {
                border-radius: 3.5px;
                line-height: 19px;
                height: 19px;
                padding-top: 1px;
                box-sizing: border-box;

                .el-checkbox__inner {
                    width: 12px;
                    height: 12px;
                    background-image: linear-gradient(171deg, #4D4E4E 0%, #5E5D5E 100%);
                    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
                    outline: none;
                    border: 1px solid #4D4E4E;

                    &:after {
                        height: 5px;
                        left: 3px;
                    }
                }

                &.is-checked {
                    .el-checkbox__inner {
                        background: $primaryColor;
                        border: 1px solid $primaryColor;

                        &:after {
                            border-color: #fff;
                        }
                    }
                }
            }

            .el-checkbox__label {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.45);
                padding-left: 6px;
            }
        }
    }
}
</style>
