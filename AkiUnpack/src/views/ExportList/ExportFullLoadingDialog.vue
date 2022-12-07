<template>
    <el-dialog

        top="40vh"
        width="370px"
        align="center"
        title=""
        custom-class="common-dialog myDialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false">

        <div class="container">
            <div class="loader">
            </div>
            {{ content }}
        </div>


    </el-dialog>
</template>

<script>
import TsDialog from '@/components/TsDialog/ts-dialog'
import { Dialog } from 'element-ui'

export default {
    name: 'DeleteExportDirDialog',
    components: {
        'el-dialog': TsDialog
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        content: {
            type: String,
            default: ''
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
        }
    }
}
</script>

<style scoped lang="scss">


/deep/ .el-dialog.common-dialog.myDialog {
    .el-dialog__header {
        padding: 0px 0px
    }

    .el-dialog__body {
        padding: 30px 20px;
    }

}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    .loader {
        font-size: 10px;
        margin-right: 10px;
        width: 3em;
        height: 3em;
        border-radius: 50%;
        /* 线性渐变，从左到右，从白色到透明，0％代表起点和100％是终点 */
        background: linear-gradient(to right, #ffffff 10%, rgba(255, 255, 255, 0) 42%);
        position: relative;
        animation: load3 1.4s infinite linear;
    }

    .loader:before,
    .loader:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
    }

    .loader:before {
        width: 50%;
        height: 50%;
        background: #FFF;
        border-radius: 100% 0 0 0;
    }

    .loader:after {
        background: #232324;
        width: 75%;
        height: 75%;
        border-radius: 50%;
        margin: auto;
        bottom: 0;
        right: 0;
    }

    @keyframes load3 {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
}


</style>
