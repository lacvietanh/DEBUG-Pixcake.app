<template>
    <div class="suit">
        <div
            :key="data.key"
            class="params-adjust-group-button params-adjust-group-item params-adjust-suit-group">
            <el-radio-group
                style="white-space: nowrap; align-self: center;"
                size="mini"
                class="suit-radio-group"
                v-model="cacheRadio"
                @change="changeChoose">
                <el-radio-button
                    v-for="child in data.options"
                    :style="child.cStyle"
                    :key="child.id"
                    :label="child.id">
                    <span :style="child.customBtnTextStyle || {}">{{ child.label }}</span>
                </el-radio-button>
            </el-radio-group>
        </div>

        <div v-for="(child, index) in data.options" :key="index">
            <SuitParamsItem
                v-show="child.id === cacheRadio"
                ref="suitParamsItemRefs"
                :data="child"
                :key="child.id"
                @on-change="(data, changeData, operation) => onChange(child, changeData, operation)"
                @on-input="(data, changeData, operation) => onInput(changeData, operation)"
                @on-main-change="(data, changeValue, operation) => onMainChange(child, changeValue, operation)"
                @on-focus="$emit('on-focus')"
                @on-blur="$emit('on-blur')"
            />
        </div>
    </div>
</template>

<script>
import Vue, { computed, ref, watch } from 'vue'
import SuitParamsItem from 'components/SuitParamsGroup/SuitParamsItem'
import { RadioGroup, RadioButton } from 'element-ui'
import { filterObjectByKeys } from '@/utils/utils'
import { isEqual } from 'lodash'

import store from '@/store'
import { EffectParamPersonTypeValue } from '@/constants/presetParams/ParamEnum'
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'

export default Vue.extend({
    name: 'SuitParamsGroup',
    components: {
        'el-radio-group': RadioGroup,
        'el-radio-button': RadioButton,
        SuitParamsItem
    },

    props: {
        data: {
            type: Object,
            default: () => {
            }
        },
        initParams: {
            type: Object,
            default: () => {
            }
        }
    },

    setup(props, { emit }) {
        const cacheRadio = ref(props.data.value || '')
        const allParams = ref({})
        const initParamsFilter = computed(() => filterObjectByKeys(props.initParams, Object.keys(allParams.value)))
        const isModify = computed(() => !isEqual(allParams.value, initParamsFilter.value))

        watch(isModify, (v) => emit('on-modify', v))
        watch(() => props.data, (val) => {
            if (val && !cacheRadio.value) {
                cacheRadio.value = val.value
            }
        })

        const suitParamsItemRefs = ref([])

        function init(data) {
            if (suitParamsItemRefs.value.length > 0 && Object.keys(data).length > 0) {
                const obj = {}
                suitParamsItemRefs.value.forEach(component => {
                    if (component) {
                        Object.assign(obj, component.init(data || {}))
                    }
                })
                allParams.value = { ...obj }
            }
        }

        function onChange(data, changeValue, operation) {
            let obj = { ...allParams.value }
            Object.assign(obj, changeValue)
            allParams.value = obj

            let extInfo = {
                labName : '',
                isRest : false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }

            if (operation === 'reset') {
                extInfo.isRest = true
                extInfo.optDesc = '重置'
                extInfo.labName = data.label
            } else {
                if (Object.keys(changeValue).length > 1) {
                    extInfo.labName = data.label
                    let val = changeValue[Object.keys(changeValue)[0]]
                    if (!val) {
                        extInfo.optDesc = '无'
                    } else {
                        for (const child of data.children) {
                            if (val === child.path) {
                                extInfo.optDesc =child.name
                                break
                            }
                        }
                    }
                } else {
                    extInfo.labName = data.label + '程度'
                    let keys = Object.keys(changeValue)
                    extInfo.optDesc = changeValue[keys[0]]
                }
            }
            let sex = store.getters['refine/personType']
            let sexType = EffectParamPersonTypeValue[sex]
            extInfo.sex = sexType

            emit('on-change', allParams.value, changeValue, operation, JSON.stringify(extInfo))
        }

        function onInput(changeValue, operation) {
            let obj = { ...allParams.value }
            Object.assign(obj, changeValue)
            allParams.value = obj
            emit('on-input', allParams.value, changeValue, operation)
        }

        function onMainChange(data, changeValue, operation) {

            let updateObj = {
                ...changeValue
            }

            if (suitParamsItemRefs.value.length > 0) {
                suitParamsItemRefs.value.forEach(component => {
                    if (component && !component.isMain()) {
                        const obj = component.reset() || {}
                        Object.assign(updateObj, obj)
                    }
                })
            }

            onChange(data, updateObj, operation)
        }

        function reset(data) {
            let updateObj = {}
            if (suitParamsItemRefs.value.length > 0) {
                suitParamsItemRefs.value.forEach(component => {
                    if (component) {
                        const obj = component.reset(data) || {}
                        Object.assign(updateObj, obj)
                    }
                })
            }
            let finalData = {
                label : '妆容调整'
            };

            onChange(finalData, updateObj, 'reset')
        }

        const { PointRightMakeupTheme } = useParamsPointsRepositories()

        function changeChoose(val){
            let index = val - 1
            let current = this.data.options && this.data.options[index]
            if(!current) {
                return
            }

            let itemKey = current.key
            const key = itemKey.split('_')[0]
            PointRightMakeupTheme(key)
        }

        return {
            suitParamsItemRefs,
            cacheRadio,

            init,
            reset,

            onInput,
            onChange,
            onMainChange,

            changeChoose
        }
    }
})
</script>

<style lang="scss" scoped>
.suit {
    .params-adjust-suit-group {
        display: flex;
        align-items: center;

        .suit-radio-group {
            /deep/ {
                .el-radio-button__inner {
                    padding: 4px 7.4px;
                }
            }
        }
    }
}
</style>
