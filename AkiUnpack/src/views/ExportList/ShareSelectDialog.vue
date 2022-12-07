<template>
    <el-dialog
        center
        top="30vh"
        width="488px"
        :visible.sync="showShareSelectDialog"
        :before-close="handleClose"
        :close-on-click-modal="false"
        custom-class="common-dialog cover-dialog more-btn share-select"
    >
        <div class="title">分享精修底片</div>

        <div class="container"
             v-if="exportShareList.length > 0"
             :style="`height: ${containerHeight}px`">
            <template v-for="(item, index) in exportShareList">
                <ShareSelectItem
                    ref="shareSelectItem"
                    :key="index"
                    @onClickItem="onClickItem(item)"
                    :item="item"
                />
            </template>
        </div>

        <span class="select-numb">已选{{ selectCount }}张</span>

        <div slot="footer" class="dialog-footer">
            <div class="footer-container">
                <div class="select-all-container" @click="onSelectedAllClick">
                    <template v-if="isSelectAll">
                        <img class="select-all-icon" :src="$getIconPath('pop_icon_open@3x.png')"/>
                    </template>
                    <template v-else>
                        <img class="select-all-icon" :src="$getIconPath('pop_icon_turn_off@3x.png')"/>
                    </template>
                    <span>全选</span>
                </div>

                <div class="footer-center-container"></div>

                <div class="footer-right-container">
                    <el-button
                        size="mini"
                        type="primary"
                        class="share-btn"
                        :disabled="selectCount <= 0"
                        @click="submit">
                        分享
                    </el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import toast from '@/mixins/toast'

import { Dialog } from 'element-ui'
import TScollectionView from '@/components/CollectionView/tscollectionView'
import ShareSelectItem from './ShareSelectItem'
import { debounce } from 'lodash'
import NodeApi from 'qt/node-api'
import tsqrcInstance from 'qt/pixcookengine'
import { sleep } from '#/utils/common'

import useExportPointsRepositories from '@/composables/points/useExportPointsRepositories'

export default defineComponent({
    name: 'ShareSelectDialog',
    mixins: [toast],
    components: {
        'el-dialog': Dialog,
        TScollectionView,
        ShareSelectItem
    },
    setup() {
        const { PointExportTable } = useExportPointsRepositories()

        return {
            PointExportTable
        }
    },
    data() {
        return {
            selectCount: 0,
            columns: 6,
            rowHeight: 74,
            maxThumbnailWidth: 74,
            isSelectAll: false,
            containerHeight: 200
        }
    },
    computed: {
        exportShareList() {
            return this.$store.state.export.exportShareList
        },

        myMaxThumbnailWidth() {
            return this.maxThumbnailWidth
        },
        myCloumHeight() {
            return this.rowHeight
        },

        showShareSelectDialog() {
            return this.$store.state.export.showShareSelectDialog
        },
    },
    watch: {
        exportShareList: {
            handler(val) {
                if (!val || val.length === 0) {
                    return
                }
                this.containerHeight = Math.min(val.length, 3) * 74
                this.onSelectedAllClick()

            },
            immediate: true
        },
        showShareSelectDialog:{
            handler(val) {
                if (val) {
                    //加载item图片数据
                    setTimeout(async ()=> {
                        let exportShareList = this.exportShareList

                        for (let i = 0; i < exportShareList.length; i++) {
                            let item = exportShareList[i]
                            let finalSavePath = item.finalSavePath
                            let res = await tsqrcInstance.loadImageWithScale(finalSavePath, 100, 100)
                            await sleep(200)
                            let imageData = "data:image/jpeg;base64," + res.data

                            let shareSelectItem = this.$refs.shareSelectItem[i]
                            if (!shareSelectItem) {
                                break;
                            }
                            shareSelectItem.loadImageData(imageData)
                        }
                    },500)
                }
            }
        }
    },
    methods: {
        ...mapMutations(['updateShowShareSelectDialog' ,'updateExportShareSelect']),

        onClickItem(item) {

            let list = this.exportShareList

            let isSelectShare = !list[item.index].isSelectShare
            this.updateExportShareSelect({ index: item.index, isSelect: isSelectShare, exportItemId: item.exportItemId })

            if (isSelectShare) {
                this.selectCount++
                this.PointExportTable('share_popup_select')
            } else {
                this.selectCount--
            }
            this.isSelectAll = this.selectCount == list.length
        },
        handleClose() {
            this.PointExportTable('share_popup_close')

            this.isSelectAll = false
            this.selectCount = 0
            this.updateShowShareSelectDialog(false)
        },
        submit: debounce(async function () {
            this.PointExportTable( 'share_popup_share')

            let isOnline = await window.$net.isOnline()
            if (!isOnline) {
                this.tsNotify({
                    type: 'error',
                    message: '当前无网络，请检查网络。'
                })
                return
            }
            this.tsNotify({
                type: 'error',
                message: '分享链接生成中，请稍后'
            })
            if (this.selectCount > 0) {
                this.selectCount = 0
                let exportDirId = this.$store.state.export.exportDirId
                NodeApi.getExport().addShareTask(exportDirId)
                this.updateShowShareSelectDialog(false)
            }
            this.isSelectAll = false
        }, 300),
        onSelectedAllClick() {
            if (this.exportShareList === null) {
                return
            }
            this.isSelectAll = !this.isSelectAll
            if (this.isSelectAll) {
                this.PointExportTable('share_popup_select_all')
            } else {
                this.PointExportTable('share_popup_unselect_all')
            }
            let list = this.exportShareList

            console.log("isSelectAll", this.isSelectAll)

            list.forEach((item, index) => {
                this.updateExportShareSelect({ index: index, isSelect: this.isSelectAll, exportItemId: item.exportItemId })
            })

            this.selectCount = this.isSelectAll ? list.length : 0
        }
    }
})
</script>
<style lang="scss">
.share-select {
    .el-dialog__body {
        padding: 12px 18px !important;

        .container {
            margin-left: 3px;
        }
    }
}

</style>

<style lang="scss" scoped>


.cover-dialog.el-dialog {
    .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
        align-items: center;

        overflow-y: scroll;

    }

    .select-numb {
        font-size: 12px;
        color: #B5B5B5;
        margin-top: 6px;
        font-weight: 400;
        display: block;
        padding-left: 10px;
    }

    .footer-container {
        display: flex;
        flex-direction: row;
        margin-bottom: 0px;

        .select-all-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-left: 10px;
            justify-content: flex-start;

            .select-all-icon {
                width: 16px;
                height: 16px;
                margin: 6px;
            }
        }

        .footer-center-container {
            justify-content: center;
            flex: 1
        }

        .footer-right-container {
            justify-content: flex-end;
        }

        .share-btn {
            width: 84px;
        }
    }

}
</style>
