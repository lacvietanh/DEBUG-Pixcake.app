<template>
    <el-dialog
        top="30vh"
        width="772px"
        :visible.sync="showShareResultDialog"
        :before-close="handleClose"
        center
        custom-class="common-dialog cover-dialog more-btn"
    >
        <div class="title">分享{{ dirName }}</div>


        <div class="container ">
            <el-input placeholder="请输入内容" v-model="shareLink"></el-input>
            <el-button slot="append" @click="copyLink()">复制链接</el-button>
        </div>

        <div slot="footer" class="dialog-footer">
            <span class="tip c-danger">该链接3天内有效,{{ shareEndTime }}失效</span>
        </div>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import store from '@/store'

import toast from '@/mixins/toast'
import clipboard from '@/qt-ipc/clipboard'
import useExportPointsRepositories from '@/composables/points/useExportPointsRepositories'

import { Dialog } from 'element-ui'

export default defineComponent({
    name: 'ShareResultDialog',
    mixins: [toast],
    components: {
        'el-dialog': Dialog
    },
    setup() {
        const { PointExportTable } = useExportPointsRepositories()

        return {
            PointExportTable
        }
    },
    data() {
        return {}
    },
    computed: {

        showShareResultDialog() {
            return this.$store.state.export.showShareResultDialog
        },

        shareLink() {
            return this.$store.state.export.shareResultDialogShareLink
        },

        shareDir() {
            let id = this.$store.state.export.currentShareResultId
            if (id > 0) {
                let list = this.$store.state.export.list
                for (const item of list) {
                    if (item.id == id) {
                        return item
                    }
                }
            }
            return null
        },
        dirName() {
            let dir = this.shareDir
            if (dir) {
                return dir.name
            }
            return ''
        },

        shareEndTime() {
            let dir = this.shareDir
            if (dir) {
                let time = dir.shareEndTime
                return '    ' + new Date(new Date(time).getTime()).Format('yyyy-MM-dd hh:mm:ss')
            }
            return ''
        }

    },
    methods: {
        handleClose() {
            store.commit('updateShowShareResultDialog', { showShareResultDialog: false })
            this.PointExportTable('link_popup_close')
        },
        copyLink() {
            this.PointExportTable('link_popup_copy')
            clipboard.writeText(this.shareLink)
            this.tsNotify({
                type: 'success',
                message: '链接已复制到剪切板'
            })
        }
    }
})
</script>

<style lang="scss" scoped>
.cover-dialog.el-dialog {
    .container {
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-input {
            margin-right: 20px;
        }
    }

    .tip {
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        margin-bottom: 50px;
    }
}
</style>
