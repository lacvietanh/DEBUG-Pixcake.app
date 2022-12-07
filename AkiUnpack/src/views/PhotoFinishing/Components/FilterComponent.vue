<template>
    <div class="custom-collapse-item">
        <div class="filter-container">

            <div class="more-container">
                <span @click="showFilterPanelView">查看更多</span>
                <i class="el-icon-arrow-right"></i>
            </div>

            <div class="filter-list">
                <template v-for="(it, index) in matchFilterList || []">
                    <div
                        :key="index"
                        class="claItemBox"
                        :style="{ marginLeft: getMarginLeft(index)+'px', marginRight: getMarginRight(index)+'px'}"
                        @click="onChangePath(it, index)">

                        <div class="item-container"
                             :class="{
                                'border-primary-style-hover': it.path === filterPath,
                                'select': it.path === filterPath
                             }"
                        >
                            <i v-if="it.new" class="ts-icon ts-icon-new"></i>
                            <img
                                :src="it.iconPath"
                                class="claImg"
                                alt=""
                            />
                        </div>
                        <div class="claName"
                             :class="{
                        'background': index >= 1
                     }"
                        > {{ filterFormatName(it.name) }}
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <div class="flex-column-item" v-if="!!filterPath">
            <span class="name" @dblclick="onResetSingle">程度</span>

            <ts-slider
                class="slider"
                :min="0"
                :max="100"
                :disabled="!filterPath"
                :show-tooltip="false"
                v-model="filterAlpha"
                @change="onChangeAlpha"
                @input="onInputAlpha"
                @ondblclick="onResetSingle"
            >
            </ts-slider>

            <ts-number-placeholder
                class="percent"
                :min="0"
                :max="100"
                :disabled="!filterAlpha"
                :value="filterAlpha"
                @on-blur="$emit('on-blur')"
                @on-focus="$emit('on-focus')"
                @change="onLabelChange"
            />
        </div>

        <FilterPanelComponent
            ref="filter-panel-component"
            :current-select-id="filterPath"
            :current-slider-value.sync="filterAlpha"
            v-show="showFilterPanelScene"
            @on-blur="$emit('on-blur')"
            @on-focus="$emit('on-focus')"
            @on-change-slider="onChangeAlpha"
            @on-input-slider="onInputAlpha"
            @on-change-select="onChangePath"
            @on-close="showFilterPanelScene = false"
        />
<!--        @on-selection="PointSelectFilter"-->
    </div>
</template>

<script>
import Vue, { computed, nextTick, onMounted, ref, watch } from 'vue'
import store from '@/store'

import { isEqual } from 'lodash'

import { CollapseItem } from 'element-ui'
import TsSlider from '@/components/TsSlider'
import pointsMixin from '@/mixins/pointsMixin'
import FilterParamModel from '@/model/ParamsModel/FilterParamModel'
import TsNumberPlaceholder from '@/components/TsNumberPlaceholder'
import FilterPanelComponent from '@/views/PhotoFinishing/Components/FilterPanelComponent'
import EffectModel from '@/model/EffectsModel/EffectModel'
import { EffectNameEnum } from '@/constants/presetParams/ParamEnum'

const pathKey = EffectModel.identify(EffectNameEnum.Filter)
const alphaKey = FilterParamModel.key

export default {
    name: 'custom-collapse-item',
    components: {
        TsNumberPlaceholder,
        'el-collapse-item': CollapseItem,
        'ts-slider': TsSlider,
        FilterPanelComponent
    },
    props: {
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
        // 组合式API不能用mixins
        const PointsMixinConstructor = Vue.extend(pointsMixin)
        const tsGtag = new PointsMixinConstructor()

        const filterPath = ref('')
        const filterAlpha = ref(0)
        const tempFilterAlpha = ref(0)


        const showFilterPanelScene = ref(false)

        const filterPathCache = computed(_ => store.getters['project/filterPathCache'])
        const filterList = computed(_ => store.getters['presetSuit/filterList'])
        const matchFilterList = computed(_ => store.getters['presetSuit/matchFilterList'](filterPath.value))

        const isModify = computed(_ => !(isEqual(filterPath.value, '') && isEqual(filterAlpha.value, 0)))
        watch(isModify, (v) => emit('on-modify', v))

        function getMarginLeft(index) {
            if (index % 4 === 0) {
                return 0
            } else {
                return 0
            }
        }

        function getMarginRight(index) {
            if (index / 3 === 1) {
                return 0
            } else {
                return 7
            }
        }

        function filterFormatName(value) {
            if (value.length >= 10) {
                // ... 名字过滤器
                let start = value.substr(0, 4)
                let end = value.substr(value.length - 2, 2)
                return `${start} ... ${end}`
            }
            return value
        }

        const onChange = (changeData, operation, ext) => {
            const data = {
                filterPath: filterPath.value,
                filterAlpha: filterAlpha.value
            }
            tempFilterAlpha.value = filterAlpha.value
            emit('on-change', data, changeData, operation, ext)
        }

        const onInput = (changeData, operation) => {
            const data = {
                filterPath: filterPath.value,
                filterAlpha: filterAlpha.value
            }
            emit('on-input', data, changeData, operation)
        }

        const onChangePath = (it, index) => {
            filterPath.value = it.path
            if (!filterPath.value) {
                filterAlpha.value = 0
            } else {
                if (filterPathCache.value.hasOwnProperty(filterPath.value)) {
                    filterAlpha.value = filterPathCache.value[filterPath.value]
                } else {
                    const obj = filterList.value.find(item => item.path === filterPath.value)
                    filterAlpha.value = obj.value
                }
            }

            emit('on-selection', filterList.value.find(item => item.path === filterPath.value))

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }

            let itemInfo = filterList.value.find(item => item.path === filterPath.value)

            extInfo.labName = "滤镜"
            extInfo.optDesc = itemInfo.name

            onChange({
                [pathKey]: filterPath.value,
                [alphaKey]: filterAlpha.value
            }, 'manual', JSON.stringify(extInfo))

            tsGtag.PointSelectFilter(itemInfo)
        }

        const onChangeAlpha = ($event) => {
            filterAlpha.value = $event

            store.dispatch('project/ACT_SetFiltersSelectCache', {
                path: filterPath.value,
                value: filterAlpha.value
            })

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }
            extInfo.labName = "滤镜程度"
            extInfo.optDesc = filterAlpha.value

            onChange({
                [alphaKey]: filterAlpha.value
            }, 'manual',  JSON.stringify(extInfo))
        }

        const onInputAlpha = () => {
            if (tempFilterAlpha.value === filterAlpha.value) {
                return
            }
            onInput({ [alphaKey]: filterAlpha.value }, 'manual', 'on-input')
        }

        const init = (data) => {
            if (Object.hasOwnProperty.call(data, alphaKey)) {
                const value = data[alphaKey]
                filterAlpha.value = value
                tempFilterAlpha.value = value
            }

            if (Object.hasOwnProperty.call(data, pathKey)) {
                filterPath.value = data[pathKey]
            }
        }

        const reset = () => {
            filterPath.value = ''
            filterAlpha.value = 0

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }
            extInfo.labName = "滤镜"
            extInfo.optDesc = "重置"

            onChange({
                [pathKey]: filterPath.value,
                [alphaKey]: filterAlpha.value
            }, 'reset', JSON.stringify(extInfo))
        }

        const onLabelChange = (value) => {
            if (value !== filterAlpha.value) {
                filterAlpha.value = value
                onChangeAlpha(filterAlpha.value)
                tsGtag.PointManualModifyComplete()
            }
        }

        const onLabelClick = (e) => {
            if (!filterPath.value) return
            isClicked.value = true
            const placeholderDom = createDom(e.target)
            const InputConstructor = Vue.extend(Input)
            const shortcutHelper = ShortcutHelper.getInstance()
            shortcutHelper.unRegisterShortcut()
            const oldValue = filterAlpha.value
            inputVDom.value = new InputConstructor({
                propsData: {
                    changeCallBack: (value) => {
                        const realValue = formatInputValue(value, { oldValue })
                        if (realValue !== oldValue) {
                            filterAlpha.value = realValue
                            tsGtag.PointManualModifyComplete()
                            onChangeAlpha()
                        }
                        isClicked.value = false
                        inputVDom.value.destroy()
                        inputVDom.value = null
                        shortcutHelper.registerShortcut()
                    },
                    value: oldValue,
                    autofocus: true
                }
            }).$mount(placeholderDom)
        }



        const onResetSingle = () => {
            const obj = filterList.value.find(item => item.path === filterPath.value)
            if (filterAlpha.value === obj.value) return
            filterAlpha.value = obj.value
            onChangeAlpha(filterAlpha.value)
        }

        function showFilterPanelView() {
            showFilterPanelScene.value = true
        }

        return {
            filterList,
            filterPath,
            filterAlpha,
            isModify,
            matchFilterList,

            init,
            reset,

            onChangePath,
            onChangeAlpha,
            onInputAlpha,
            onLabelChange,
            onResetSingle,

            getMarginLeft,
            getMarginRight,
            filterFormatName,

            showFilterPanelScene,
            showFilterPanelView
        }
    }
}
</script>

<style lang="scss">
.filter-popper-class.el-select-dropdown {
    .el-scrollbar {
        .el-select-dropdown__wrap.el-scrollbar__wrap {
            max-height: 200px !important;
            height: 200px;
        }
    }
}
</style>

<style lang="scss" scoped>
// 字体颜色
$smallFontSize: 13px; // 主要文字
$smallFontColor: #B8B8B8; // 小文案主题色
$placeholderFontColor: #C0C4CC; // 占位文字

.filter-popper-class.el-select-dropdown {
    .el-scrollbar {
        .el-select-dropdown__wrap.el-scrollbar__wrap {
            .el-select-dropdown__item {
                height: 28px;
                line-height: 28px;
                font-size: 12px;
            }
        }
    }

    .ts-icon {
        width: 22px;
        height: 11px;
        margin-left: 6px;
        vertical-align: middle;
    }
}

.custom-collapse-item {
    /deep/ {
        .el-collapse-item__content {
            padding-bottom: 8px;
        }
    }

    .filter-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex-wrap: wrap;
        box-sizing: border-box;

        .more-container {
            width: 100%;
            height: 32px;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            span {
                margin-right: 2px;
                justify-content: right;
                font-family: PingFangSC-Regular;
                font-size: 11px;
                color: #ffffffcc;
                line-height: 24px;
                font-weight: 400;

                &:hover {
                    color: #fff;
                }
            }

            /deep/ {
                .el-icon-arrow-right {
                    margin-right: 0 !important;
                }
            }

        }


        .filter-list {

            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            box-sizing: border-box;

            .select {
                border-width: 1px;
                border-style: solid;
                box-sizing: border-box;
            }

            .claItemBox {

                margin-bottom: 8px;
                aspect-ratio: 1 / 1;
                display: flex;
                flex-direction: column;

                .item-container {
                    width: 60px;
                    height: 60px;
                    box-sizing: border-box;
                    padding: 1px;
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
                        padding: 0 0;
                        pointer-events: none;
                    }

                    .claImg {
                        border-radius: 4px;
                        width: 100%;
                        object-fit: cover;
                        background: grey;
                    }

                    .background {
                        background-image: linear-gradient(#cc000000, #000000);
                    }
                }

                .claName {
                    width: 100%;
                    font-family: PingFangSC-Regular;
                    font-size: 10px;
                    margin-top: 2px;
                    align-items: center;
                    color: #A6A6A6;
                    text-align: center;
                    font-weight: 400;
                }

            }
        }
    }


    .flex-item, .flex-column-item {
        display: flex;
        font-size: 12px;
        color: #A6A6A6;
        line-height: 21px;
        font-weight: 400;
        box-sizing: border-box;

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
    }

    .flex-item {
        align-items: center;

        .label {
            margin-right: 8px;
        }

        .select {
            /deep/ .el-input--mini .el-input__inner {
                height: 24px;
                line-height: 24px;
            }
        }
    }

    .flex-column-item {
        align-items: center;
        flex-direction: row;

        .label {
            display: flex;
            justify-content: space-between;
            margin-right: 0;
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

.params-adjust-group-item-title {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    font-size: $smallFontSize;


    > span {
        font-size: 12px;
        font-weight: 500;
    }

    .title-label {
        color: $smallFontColor;
        font-weight: 500;
        font-size: 10px;
    }

    .reset-btn-icon {
        font-size: 16px;
    }

    .icon {
        display: inline-block;
        font-size: 12px;
        color: #c0c4cc;
        position: relative;
        top: -6px;
        margin-right: 3px;
    }

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
    }
}
</style>
