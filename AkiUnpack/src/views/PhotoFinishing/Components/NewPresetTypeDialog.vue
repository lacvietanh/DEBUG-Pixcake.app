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
        <div class="claContent">
            <el-input
                placeholder="分类名称"
                :maxlength="maxInputLen"
                v-model="typeName"
                ref="inputPrestName"
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
                :loading="loading"
                @click="onSubmit"
            >保存
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import toast from '@/mixins/toast'
import { createPresetClass } from '@/api/settingApi'
import ShortcutHelper from '@/utils/Shortcut/ShortcutHelper'
import TsDialog from '@/components/TsDialog/ts-dialog'

export default {
    name: 'NewPresetTypeDialog',
    mixins: [toast],
    components: {
        'el-dialog': TsDialog
    },
    props: {
        value: {
            type: Boolean,
            value: false
        }
    },
    data() {
        return {
            visible: this.value,
            title: `新建分类`,
            typeName: '',
            loading: false,
            maxInputLen: 10
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
                    this.$nextTick(x => {
                        this.$refs.inputPrestName.focus()
                    })

                } else {
                    shortcutHelper.registerShortcut()
                }
            },
            immediate: true
        },
        visible(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        ...mapActions([
            'getPresetClass'
        ]),
        onClose() {
            this.visible = false
        },
        async onSubmit() {
            if (!this.typeName.trim()) {
                this.tsNotify('请输入正确的分类名称')
                return
            }
            this.loading = true
            try {
                const res = await createPresetClass(this.typeName)
                await this.getPresetClass(true)
                this.loading = false
                this.tsNotify('新建分类成功～')
                this.$emit('loadPreset', res.id)
                this.typeName = ''
                this.visible = false
            } catch (e) {
                console.log('预设分类创建失败=====>', e)
            }

        }
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

        .footer {
            margin-top: 20px;

            .claBotButton {
                margin-right: 16px;
            }
        }
    }
}
</style>
