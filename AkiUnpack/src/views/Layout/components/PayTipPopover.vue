<template>
    <div class="pay-tip-container">
        <el-popover
            placement="bottom"
            width="200"
            trigger="manual"
            content="当前剩余可用张数不足50张，请及时充值哦~"
            v-model="value">
            <div class="user" slot="reference">
                <slot></slot>
            </div>

        </el-popover>
    </div>

</template>

<script>
import { toRefs, watch, ref } from 'vue'
import { Popover } from 'element-ui'

export default {
    name: 'PayTipPopover',
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    components: {
        'el-popover': Popover
    },
    setup(props, { emit }) {
        const { visible } = toRefs(props)

        const value = ref(false)
        watch(visible, (val) => value.value = val, { immediate: true })
        watch(value, (val) => emit('input', val))

        return {
            value
        }
    }
}
</script>

<style lang="scss" scoped>

.pay-tip-container {
    /deep/ {
        .el-popover {
            //background-color: #FFFFFF;
            //    border: none;
            //    text-align: center;
            //    font-size: 12px;
            //color: #333333;
        }
    }
}
</style>
