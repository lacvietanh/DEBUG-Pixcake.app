<template>
    <el-dialog
        top="28vh"
        width="269px"
        :visible.sync="visible"
        :show-close="false"
        center
        custom-class="common-dialog vip-price-dialog">

        <div class="dialog-container">
            <img class="pay-success-icon" :src="$getIconPath('member_pop_pic_pay@3x.png')">
            <span class="success-tip">支付成功</span>

            <div class="btn" @click="onApplyClick">
                开始使用
            </div>

        </div>
    </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import TsDialog from '@/components/TsDialog/ts-dialog'


export default {
    name: 'PaySuccessDialog',
    components:{
        'el-dialog':TsDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            visible: this.value
        }
    },
    watch: {
        value: {
            handler(val) {
                this.visible = val
            },
            immediate: true
        },
        visible(val) {
            if (!val) {
                this._SetShowPaySuccess(false)
            }
            this.$emit('input', val)
        }
    },
    methods: {
        ...mapMutations(['_SetShowPaySuccess']),
        onApplyClick() {
            this.visible = false
            this.$emit('update:visible', false)
        }
    }
}
</script>

<style lang="scss" scoped>

/deep/ {

    .el-dialog__header, .el-dialog__body {
        padding: 0 !important;
        background: transparent;
        border: none;
    }

    .dialog-container {
        width: 100%;
        height: 100%;
        display: flex;
        background: #FFFFFF;
        border-radius: 16px;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .pay-success-icon {
            width: 120px;
            height: 120px;
            margin-top: 50px;
        }

        .success-tip {
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #000000;
            margin-top: 16px;
        }

        .btn {
            width: 181px;
            height: 38px;
            background: #F5D228;
            box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
            border-radius: 19px;
            margin-top: 36px;
            margin-bottom: 56px;
            color: #303030;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

</style>
