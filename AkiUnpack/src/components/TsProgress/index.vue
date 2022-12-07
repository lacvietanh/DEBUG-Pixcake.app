<template>
    <el-progress
        class="px__el-progress"
        v-if="!disabled"
        v-show="visible"
        :stroke-width="4"
        :show-text="false"
        :percentage="loadingPercent">
    </el-progress>
</template>

<script>
import Vue, { ref, watch, onUnmounted, nextTick } from 'vue'
import { Progress } from 'element-ui'

export default Vue.extend({
    name: 'TsProgress',
    components: {
        'el-progress': Progress
    },

    props: {
        value: {
            type: Boolean,
            default: false
        },

        disabled: {
            type: Boolean,
            default: false
        }
    },

    setup(props, { emit }) {
        let loadingPercent = ref(0)
        let visible = ref(props.value)

        let loadingTimer = ref(null)
        let showProgressTimer = ref(null)

        function autoAddPercentage() {
            if (loadingTimer.value) {
                clearTimeout(loadingTimer.value)
                loadingTimer.value = null
            }
            loadingTimer.value = setTimeout(() => {
                if (loadingPercent.value < 99) {
                    loadingPercent.value += 1
                    autoAddPercentage()
                }
            }, 33)
        }

        watch(() => props.value, (val) => {
            if (val) {
                visible.value = val
                loadingPercent.value = 0
                if (showProgressTimer.value) {
                    clearTimeout(showProgressTimer.value)
                    showProgressTimer.value = null
                }
                autoAddPercentage()
            } else {
                loadingPercent.value = 100
                clearTimeout(loadingTimer.value)
                showProgressTimer.value = setTimeout(() => {
                    nextTick(() => {
                        visible.value = false
                    })
                }, 300)
            }
        })

        watch(visible, (val) => emit('input', val))

        onUnmounted(() => {
            if (loadingTimer.value) {
                clearTimeout(loadingTimer.value)
                loadingTimer.value = null
            }

            if (showProgressTimer.value) {
                clearTimeout(showProgressTimer.value)
                showProgressTimer.value = null
            }
        })

        return {
            loadingPercent,
            visible
        }
    }
})

</script>
<style lang="scss" scoped>

</style>
