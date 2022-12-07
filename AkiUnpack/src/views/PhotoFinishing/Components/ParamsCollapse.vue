<template>
    <el-collapse
        class="parameter-configuration-collapse"
        :class="['global__scroll-style']"
        :value="activeName"
        :style="{height:`${paramsColsHeight}`}"
        @change="activeName = $event"
    >
        <template v-for="item in intelligentComponents">
            <custom-collapse-item
                ref="customCollapseItemRef"
                show-label-percent
                :key="item.key"
                :type="item.key"
                :data="{ ...item }"
                :active="activeName.includes(item.key)"
                :initParams="item.group === 'color' ? oriPaletteParams : oriBeautifyParams"
                @user-behavior="$emit('user-behavior', $event)"
                @on-change="(cParams, opt, ext) => item.group === 'color'
                    ? $emit('on-change-color', cParams, opt, ext)
                    : $emit('on-change', cParams, opt, ext)
                "
                @on-input="(cParams, opt) => item.group === 'color'
                    ? $emit('on-input-color', cParams, opt)
                    : $emit('on-input', cParams, opt)"
                @keydown.native.space.prevent
                @on-reset="$emit('on-reset', $event)"
                @on-modify="onModify($event, item.key)"
            >
                <template slot="title-right" v-if="item.key === 'removeDefects'">
                    <slot name="painter"></slot>
                </template>

				<template slot="title-right" v-if="item.key === 'replace'">
					<slot name="import" :data="item"></slot>
				</template>

            </custom-collapse-item>
        </template>
    </el-collapse>
</template>

<script>
import { ref, computed, nextTick, watch, reactive } from 'vue'
import store from '@/store'
import CustomCollapseItem from '@/views/PhotoFinishing/CustomCollapseItem/custom-collapse-item'
import {
    backgroundGroup,
    beautyGroup, colorGroup, defaultOpenBackgroundCollapse,
    defaultOpenBeautyCollapse,
    defaultOpenColorCollapse
} from '@/views/PhotoFinishing/CustomCollapseItem/ParamsComponents'
import { debounce } from 'lodash'

export default {
    name: 'ParamsCollapse',
    components: {
        'custom-collapse-item': CustomCollapseItem,
    },
    props: {
        type: String,
        paramsColsHeight: {
            type: String,
            default: 'calc(100% - 72px)'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit }) {
        const activeName = ref([])
        switch (props.type) {
            case 'color':
                activeName.value = defaultOpenColorCollapse
                break

            case 'beauty':
                activeName.value = defaultOpenBeautyCollapse
                break

            case 'background':
                activeName.value = defaultOpenBackgroundCollapse
                break
        }

        const intelligentComponents = computed(() => {
            if (props.type === 'color') return colorGroup
            if (props.type === 'beauty') return beautyGroup
            if (props.type === 'background') return backgroundGroup
            return ''
        })

        const colorGroups = computed(() => (intelligentComponents.value.filter(item => item.group === 'color') || []).map(item => item.key))

        const oriBeautifyParams = computed(() => store.getters['refine/oriBeautifyParams'])
        const oriPaletteParams = computed(() => store.getters['refine/oriPaletteParams'])

        const lastBeautifyParams = computed(() => store.getters['refine/lastBeautifyParams'])
        const lastPaletteParams = computed(() => store.getters['refine/lastPaletteParams'])

        const currBtUpdateTime = computed(() => store.getters['refine/currBtUpdateTime'])
        const currPtUpdateTime = computed(() => store.getters['refine/currPtUpdateTime'])

        const personType = computed(() => store.getters['refine/personType'])
        // 更新插槽组件数据

        const customCollapseItemRef = ref([])
        const syncSlotComp = debounce(function () {
            const beautifyParams = lastBeautifyParams.value
            const paletteParams = lastPaletteParams.value

            nextTick(() => {
                // 同步通用组件
                customCollapseItemRef.value.forEach(component => {
                    if (colorGroups.value.includes(component.type)) {
                        component.syncSlotComp(paletteParams)
                    } else {
                        component.syncSlotComp(beautifyParams)
                    }
                })
            })
        }, 300)
        watch(personType, () => syncSlotComp())

        // 所有智能优化通用组件
        const syncParams = debounce(function () {
            const beautifyParams = lastBeautifyParams.value
            const paletteParams = lastPaletteParams.value
            //
            nextTick(() => {
                // 同步通用组件
                customCollapseItemRef.value.forEach(component => {
                    if (colorGroups.value.includes(component.type)) {
                        component.sync(paletteParams)
                    } else {
                        component.sync(beautifyParams)
                    }
                })
            })
        }, 300)

        if (props.type === 'color') {
            watch(currPtUpdateTime, (val) => {
                if (val) {
                    console.log('update params time palette: ', val)
                    syncParams()
                }
            })
        } else {
            watch(currBtUpdateTime, (val) => {
                if (val) {
                    console.log('update params time beautify: ', val)
                    syncParams()
                }
            })
        }

        const obj = {}
        intelligentComponents.value.forEach(item => {
            obj[item.key] = false
        })
        const modifyObj = reactive(obj)

        // 是否修改
        const onModify = (val, key) => modifyObj[key] = val
        const isModify = computed(() => {
            let v = false
            for (const key in modifyObj) {
                if (modifyObj[key]) {
                    v = true
                }
            }
            return v
        })
        watch(isModify, (val) => {
            store.commit('refine/_SetNavbarDots', { [props.type]: val || false })
        })

        return {
            customCollapseItemRef,

            activeName,
            intelligentComponents,
            oriBeautifyParams,
            oriPaletteParams,

            onModify
        }
    }
}
</script>
