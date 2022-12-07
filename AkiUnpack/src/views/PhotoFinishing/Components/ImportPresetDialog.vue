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
                placeholder="请输入预设口令"
                :maxlength="maxInputLen"
                v-model="code"
                ref="inputPrestIdName"
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
            >导入
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { mapActions, mapGetters } from 'vuex'

import toast from '@/mixins/toast'
import { getSharePresetInfo, importSharePreset } from '@/api/settingApi'
import { CUR_PRESET_VERSION } from '@/constants/preset-def'
import PresetSuitManager from '@/utils/preset/PresetSuitManager'
import ShortcutHelper from '@/utils/Shortcut/ShortcutHelper'
import TsDialog from '@/components/TsDialog/ts-dialog'

const psm = new PresetSuitManager()

export default {
    name: 'ImportPresetDialog',
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
            title: `预设口令`,
            code: '',
            loading: false,
            maxInputLen: 64
        }
    },
    computed: {
        ...mapGetters([
            'userId'
        ])
    },
    watch: {
        value: {
            handler(val) {
                this.visible = val

                const shortcutHelper = ShortcutHelper.getInstance()
                if (val) {
                    shortcutHelper.unRegisterShortcut()
                    this.$nextTick(x => {
                        this.$refs.inputPrestIdName.focus()
                    })
                } else {
                    shortcutHelper.registerShortcut()
                }
            }
        },
        visible(val) {
            this.$emit('input', val)
        },
        code(val) {
            if (val) {
                this.code = psm.clearPlaceholder(this.code)
            }
        }
    },
    methods: {
        ...mapActions([
            'loadPresetsFromDb'
        ]),
        ...mapActions([
            'getPresetClass',
            'loadAllPresents'
        ]),
        onClose() {
            this.visible = false
        },
        // 导入图片 ,做接口请求
        async onSubmit() {
            if (!this.code.trim()) {
                this.tsNotify('请输入正确的预设口令')
                return
            }
            this.loading = true
            try {
                await importSharePreset(this.code, CUR_PRESET_VERSION)
                await this.getPresetClass(true)
                await this.loadAllPresents({ userId: this.userId, loadDb: true })

                const data = await getSharePresetInfo(this.code)
                if (data.setting_total_count === 1) {
                    this.tsNotify(`“${data.settings_info[0].name}”预设已导入`, { duration: 1000 })
                } else {
                    this.tsNotify(`“${data.settings_info[0].name}”等${data.setting_total_count}个预设已导入`, { duration: 1000 })
                }
                this.loading = false
                this.visible = false

            } catch (e) {
                this.loading = false
                switch (e.data.code) {
                    case 37: {
                        this.tsNotify('分享口令的预设不存在～', { duration: 1000 })
                        this.visible = false
                        break
                    }
                    case 38: {
                        this.tsNotify('口令来源于自己分享的预设，导入失败～', { duration: 1000 })
                        this.visible = false
                        break
                    }
                    case 39: {
                        this.tsNotify('当前导入预设已存在～')
                        this.visible = false
                        break
                    }
                    case 41: {
                        try {
                        	const rootVue = this.$root
							this.visible = false
							rootVue.tsConfirm({
								message: e.data.message,
								confirmButtonText: '立即更新'
							})
                            ipcRenderer.send('app-client-update-check')

                        } catch (err) {
                        }
                        break
                    }
                    default:
                        this.tsNotify(e.data.message, { duration: 1000 })
                        this.visible = false
                }
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
