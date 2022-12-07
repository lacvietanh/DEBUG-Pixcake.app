<template>
    <span
        v-if="!isClicked"
        class="ts-number-placeholder"
        :class="{ 'disabled': disabled }"
        @click="onLabelClick($event)">
        {{ showValue }}
    </span>
</template>

<script>
import Vue, { computed, ref, watch } from 'vue'
import { useTsInput } from './TsInput/index'

export default Vue.extend({
    name: 'TsNumberPlaceholder',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        value: {
            type: Number,
            default: 0
        },
        step: {
            type: Number,
            default: 1
        },
        formatValue: {
            type: Function
        },
        formatResult: {
            type: Function
        }
    },
    setup(props, { emit }) {
        const isClicked = ref(false)
        const currValue = ref(props.value)

        const minRef = ref(props.min || 0)
        const maxRef = ref(props.max || 100)
        const stepRef = ref(props.step || 1)

        const showValue = computed(() => typeof props.formatValue === 'function'
            ? props.formatValue(currValue.value)
            : currValue.value)

        watch(() => props.value, (val) => currValue.value = val)
        watch(currValue, (val) => {
            emit('input', val)
        })

        // getRealValue为空、后续需要格式化的时候传入调用
        const formatInputValue = (value, oldValue) => {
            const step = stepRef.value
            const min = minRef.value
            const max = maxRef.value

            let fValue = Number(value)
            if (isNaN(fValue) || !value) return oldValue
            fValue = step < 1 ? fValue.toRoundByBase(step) : Math.round(fValue)
            let realValue = typeof props.formatValue === 'function' ? props.formatResult(fValue) : fValue
            if (realValue < min) realValue = min
            if (realValue > max) realValue = max
            return realValue
        }

        const onLabelClick = (e) => {
            if (props.disabled) {
                return
            }
            const { createTsInput } = useTsInput()
            const tsInput = createTsInput(e.target, {
                mountedCallback: () => {
                    isClicked.value = true
                    emit('on-focus')
                },
                changeCallback: (value) => {
                    const realValue = formatInputValue(value, currValue.value)
                    if (realValue !== currValue.value) {
                        currValue.value = realValue
                        emit('change', realValue)
                    }
                    tsInput.destroy()
                },
                destroyCallback() {
                    isClicked.value = false
                    emit('on-blur')
                },
                value: showValue.value
            })
        }

        return {
            showValue,
            currValue,
            isClicked,
            onLabelClick
        }
    }
})

</script>

<style lang="scss" scoped>
.ts-number-placeholder {
    &.disabled {
        cursor: not-allowed;
    }
}
</style>
