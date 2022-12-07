<script>

import { mapGetters, mapMutations } from 'vuex'
import { DeleteProgressStatus } from '@/constants'
import ImportProgressDialog from '@/views/BatchRetouch/components/ImportProgressDialog'
import { delay } from '@/universal/utils/common'

export default {
    name: 'delete-progress-dialog',
    props: {
        isDeleteProject: {
            type: Boolean,
            value: false
        },
        showCancelBtn: {
            type: Boolean,
            default: false
        }
    },
    extends: ImportProgressDialog,
    computed: {
        ...mapGetters('finishing', []),
        message() {
            const actions = {
                [DeleteProgressStatus.Start]: this.isDeleteProject ? '正在准备删除项目' : '正在准备删除文件',
                [DeleteProgressStatus.RequestDelete]: '正在请求删除数据',
                [DeleteProgressStatus.Deleting]: '正在删除数据',
                [DeleteProgressStatus.DeleteOver]: '删除完成',
                [DeleteProgressStatus.CancelDelete]: '取消删除',
                [DeleteProgressStatus.RequestDeleteError]: '删除失败'
            }
            return actions[this.status] || ''
        },

        percentage() {
            const actions = {
                [DeleteProgressStatus.Start]: 2,
                [DeleteProgressStatus.DeleteOver]: 100,
                [DeleteProgressStatus.CancelDelete]: 19,
                [DeleteProgressStatus.RequestDeleteError]: 39,
                [DeleteProgressStatus.RequestDelete]: 31
            }
            if (this.status === DeleteProgressStatus.RequestDelete) {
                return this.uploadPercent + 2
            } else if (this.status === DeleteProgressStatus.Deleting) {
                const { over, total } = this.data
                const per = over / total
                return 40 + parseInt(60 * per)
            } else {
                return actions[this.status] || 0
            }
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
        },
        status(val) {
            const closes = [
                DeleteProgressStatus.DeleteOver,
                DeleteProgressStatus.CancelDelete,
                DeleteProgressStatus.RequestDeleteError
            ]
            if (val === DeleteProgressStatus.RequestDelete) {
                this.autoAddPercentage()
            } else {
                clearTimeout(this.loadingTimer)
                if (closes.includes(val)) {
                    delay(val === DeleteProgressStatus.DeleteOver ? 300 : 1000).then(() => {
                        this.visible = false
                    })
                }
            }
        }
    },
    methods: {
        ...mapMutations([]),
        autoAddPercentage() {
            if (this.loadingTimer) clearTimeout(this.loadingTimer)
            this.loadingTimer = setTimeout(_ => {
                if (this.uploadPercent < 38) {
                    this.uploadPercent += 1
                    this.autoAddPercentage()
                }
            }, 100)
        }
    }
}
</script>

<style lang="scss">
.import-progress-dialog {
    .el-dialog__header {
        display: none;
    }

    .el-dialog__body {
        padding: 40px 28px !important;
    }
}
</style>

<style lang="scss" scoped>
.import-progress-dialog {
    /deep/ {
        .el-dialog__header {
            display: none;
        }

        .el-dialog__body {
            padding: 40px 28px;
        }
    }

    .container {
        text-align: left;
        color: #D9D9D9;

        .info {
            margin-bottom: 16px;
        }
    }
}

</style>

