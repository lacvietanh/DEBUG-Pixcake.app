<template>
    <el-dialog
        append-to-body
        center
        top="28vh"
        width="323px"
        :visible.sync="visible"
        custom-class="common-dialog user-package">

        <div class="dialog-container">

            <template v-if="isFromFromUserInfo">
                <span class="title-business">人工客服</span>
            </template>
            <template v-else>
                <span class="title-business">联系商务</span>
            </template>

            <img class="qrcode-business" :src="serviceUrl">

            <template v-if="vipCardDesc && !IS_CLIENT_PIX_PIE">
                <div class="tip" v-html="vipCardDesc"></div>
            </template>

            <template v-else>
                <div class="tip">
                    <span class="tip">扫一扫上面的二维码，加我微信哦~</span>
                </div>
            </template>
        </div>
    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { IS_CLIENT_PIX_PIE } from '#/types/config'
import TsDialog from '@/components/TsDialog/ts-dialog'


export default {
    name: 'ServiceDialog',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        isFromFromUserInfo: {
            default: true,
            type: Boolean
        }
    },
    components:{
        'el-dialog':TsDialog
    },
    data() {
        return {
            visible: this.value,
            IS_CLIENT_PIX_PIE: IS_CLIENT_PIX_PIE
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
            this.$emit('input', val)
        }
    },
    computed: {
        serviceUrl() {
            if (IS_CLIENT_PIX_PIE)//像素派固定取客服的二维码
            {
                return require('@/assets/images/service-kefu_qrcode.png')
            }
            if (this.$store.state.order.serviceUrl) {
                return this.$store.state.order.serviceUrl
            }
            return require('@/assets/images/service-qrcode.jpg')
        },
        ...mapGetters([
            'vipCardDesc'
        ])
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
        flex-direction: column;
        align-items: center;
    }

    .title-business {
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #D9D9D9;
        text-align: center;
        line-height: 24px;
        font-weight: 500;
        margin-top: 52px;
    }

    .qrcode-business {
        width: 223px;
        height: 223px;
        margin-top: 16px;
        text-align: center;
    }

    .tip {
        font-size: 12px;
        color: #D9D9D9;
        line-height: 18px;
        font-weight: 400;
        margin-top: 20px;
        text-align: center;
        margin-bottom: 62px;
    }
}

</style>
