<template>
    <div
        v-show="visible"
        class="ts-drawer"
        :style="{
            width: width ? width : '100%'
        }">
        <slot></slot>
    </div>
</template>

<script>
import Vue, { ref, watch } from 'vue'

export default Vue.extend({
    name: 'TsDrawer',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: ''
        },
        direction: {
            type: String,
            default: 'rtl'
        }
    },
    setup(props, { emit }) {
        const visible = ref(props.value || false)

        watch(() => props.value, (val) => {
            visible.value = val
        })
        watch(visible, (val) => emit('input', val))

        return {
            visible
        }
    }
})

</script>

<style lang="scss" scoped>
.ts-drawer {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1999;
}
</style>
