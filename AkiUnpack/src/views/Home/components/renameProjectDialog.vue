<template>
    <el-dialog
        top="30vh"
        width="400px"
        custom-class="common-dialog cover-dialog myDialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="true"
        :before-close="onClose"
    >
        <div class="title">
            {{ title }}
        </div>
        <!-- 配置验证规则-->
        <div class="claContent">
            <el-input
                ref="inputRename"
                :maxlength="maxInputLen"
                v-model="name"
                @keydown.native.enter="onSubmit"
                @keydown.space.native.stop
            ></el-input>
        </div>

        <div class="footer">
            <el-button
                type="default"
                class="claBotButton"
                @click="onClose">
                取消
            </el-button>
            <el-button
                type="primary"
                @click="onSubmit"
            >确定
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
// import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { mapActions, mapGetters } from 'vuex'
import toast from '@/mixins/toast'
import ShortcutHelper from '@/utils/Shortcut/ShortcutHelper'
// import {log} from "~/main/utils/log4js";
import TsDialog from '@/components/TsDialog/ts-dialog'


export default {
    name: 'renameProject',
    mixins: [toast],
    components:{
        'el-dialog':TsDialog
    },
    props: {
        value: {
            type: Boolean,
            value: false
        },
        text: {
            type: String,
            value: ''
        },
        maxLength: {
            type: Number,
            value: 0
        }
    },
    data() {

        return {
            visible: this.value,
            title: `重命名`,
            name: this.text,
            maxInputLen: this.maxLength > 0 ? this.maxLength : 30
        }
    },
    computed: {
        ...mapGetters([])
    },
    watch: {
        value: {
            handler(val) {
                this.visible = val
                const shortcutHelper = ShortcutHelper.getInstance()
                if (val) {
                    shortcutHelper.unRegisterShortcut()
                } else {
                    shortcutHelper.registerShortcut()
                }
                if (val) {

                    this.name = this.text
                }
            },
            immediate: true
        },
        visible(val) {
            this.$emit('input', val)

            if (val) {
                this.$nextTick(() => {
                    this.$refs.inputRename.focus()
                })
            }

        },
        name(val) {
            this.$emit('changed', this.name)
        }
    },
    methods: {
        ...mapActions([]),
        onClose() {
            this.visible = false
            this.$emit('onClose', null)
        },
        // 导入图片 ,做接口请求
        onSubmit() {
            this.$emit(`onConfirm`, this.name)
        }
    },
    mounted() {
        this.maxInputLen = this.maxLength > 0 ? this.maxLength : 30
    }
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog.common-dialog.myDialog {
    height: 208px;

    .el-dialog__header {
        padding: 0px;
    }

    .el-dialog__body {
        .title {
            margin-top: 25px;
        }

        .claContent {

        }

        .footer {
            margin-top: 20px;

            .claBotButton {
                margin-right: 16px;
            }
        }
    }
}
</style>
