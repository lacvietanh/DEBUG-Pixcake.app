<template>
    <div
        class="claImportRoot"
        element-loading-background="rgba(0, 0, 0, 0.9)"
        @drop.prevent.stop="onDropHanlder"
        @dragover.prevent.stop @dragenter.prevent.stop>

        <template v-if="$platform === 'win32'">
            <div class="win-btn-class">
                <el-button
                    class="btn"
                    type="info"
                    size="larger"
                    @click="onAddClick(['openFile'])">
                    <div class="content">
                        <img class="img" :src="require('@/assets/icons/home_icon_import_image@3x.png')">
                        <span class="text c-text-regular">导入图片</span>
                    </div>
                </el-button>

                <el-button
                    class="btn"
                    type="info"
                    size="larger"
                    @click="onAddClick(['openDirectory'])">
                    <div class="content">
                        <img class="img" :src="require('@/assets/icons/home_icon_import_file@3x.png')">
                        <span class="text c-text-regular">导入文件夹</span>
                    </div>
                </el-button>
            </div>
        </template>

        <template v-else>
            <div
                class="claImportContent border-primary-style-hover"
                @click="onAddClick(['openDirectory', 'openFile'])">
                <el-button
                    icon="el-icon-plus"
                    type="text">
                </el-button>
            </div>
        </template>

        <span class="claDes">点击导入文件或将文件夹（图片）拖到此处</span>

        <div id="manualInput" v-if="this.$isDev || this.$isBeta">
            <el-input clearable v-model="inputImportDir" placeholder="自动化测试导入" :style="{width:'300px'}">
            </el-input>
            <el-button id="confirmImport" :style="{marginLeft:'12px'}" @click="onConfirmImportClick">确定</el-button>
        </div>


        <importProgressDialog
            @mousedown.native.stop
            :status="importProgress.status"
            :data="importProgress"
            v-model="showImportProgress"
            :importName="myImportName"
            @onCancelled="handleCancelImport"
        >
        </importProgressDialog>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import toast from '@/mixins/toast'
import tsFileImport from '@/mixins/tsFileImport'

import { BatchActiveMode } from '@/constants/batchRetouchDef'
import { ImportProgressStatus } from '@/constants'
import fs from '@/qt-ipc/fs'
import {dialogIpc} from "qt/dialog/DialogIpcImpl";
import { debounce } from 'lodash'

export default {
    name: 'ImportImageView.vue',
    mixins: [toast,
        tsFileImport
    ],
    data() {
        return {
            showImportProgress: false,
            importProgress: {},
            //自动化测试导入
            inputImportDir: null,
			//是否是正在显示导入对话框
			isShowingImportDialog:false
        }
    },
    computed: {
        ...mapGetters('project', [
            'projects',
            'previewRouterName'
        ])
    },
    watch: {},
    beforeDestroy() {
        window.$importImage.importByDevTool = null
    },
    mounted() {
        window.$importImage.importByDevTool = (path) => {
            this.onConfirmImportClick(path)
        }
    },
    methods: {
        async onConfirmImportClick(inputImportDir) {
            const dirPath = this.inputImportDir || inputImportDir
            if (!dirPath) {
                this.tsNotify('路径不能为空')
                return
            }
            try {
                const ret = await fs.existsSync(dirPath)
                if (!ret) {
                    this.tsNotify('文件或文件夹不存在')
                    return
                }
            } catch (e) {
                this.tsNotify('文件或文件夹不存在')
                return
            }
            this.processImport([dirPath])
        },

        processImport: debounce(async function(filePaths) {
            const checkRet = await this.hasReadWritePermission(filePaths)
            if (checkRet.result !== 1) {
                this.toastNoReadWritePermission(checkRet)
                return
            }

            if (filePaths.length > 0) {
                let isAppend = false
                let that = this
                await this.checkAndImportImages(filePaths, isAppend, (otherImageFiles) => {
                    that.$router.push({
                        name: this.previewRouterName,
                        query: {
                            'imageFilePaths': otherImageFiles
                        }
                    })
                }, progress => {
                    if (progress.status === ImportProgressStatus.Start) {
                        this.showImportProgress = true
                    }
                    this.importProgress = progress
                })
            }
        }, 1000),

		onAddClick :debounce(async function (properties = ['openDirectory', 'openFile']) {
			if (this.isShowingImportDialog){
				return
			}
			this.isShowingImportDialog  = true
            const dialog = dialogIpc
            const result = await dialog.showOpenDialog({
                properties: properties
            })
            if (result && result.filePaths && result.filePaths.length == 0) {
				this.isShowingImportDialog = false
                return
            }

            await this.processImport(result.filePaths)
			this.isShowingImportDialog  = false
		},300),

        // 创建工程的缩略图
        async onDropHanlder(e) {
            let files = this.getDropPaths()
            let paths = []
            for (let file of files) {
                let fp = file.path
                paths.push(fp)
            }

            const checkRet = await this.hasReadWritePermission(paths)
            if (checkRet.result !== 1) {
                this.toastNoReadWritePermission(checkRet)
                return
            }
            let isAppend = false
            await this.checkAndImportImages(paths, isAppend, (otherImageFiles) => {
                this.$router.push({
                    name: this.previewRouterName,
                    query: {
                        'imageFilePaths': otherImageFiles
                    }
                })
            }, progress => {
                if (progress.status === ImportProgressStatus.Start) {
                    this.showImportProgress = true
                }
                this.importProgress = progress
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.claImportRoot {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    .claImportContent {
        width: 164px;
        height: 164px;
        border-width: 1px;
        border-style: dashed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 8px;

        /deep/ .el-button {
            .el-icon-plus {
                font-size: 24px;
            }
        }
    }

    .win-btn-class {
        display: flex;
        flex-direction: column;

        .btn {
            height: 48px;
            line-height: 48px;
            padding: 0;
            width: 204px;
            margin-bottom: 10px;
            border-radius: 8px;

            &:first-child {
                margin-bottom: 24px;
            }

            .content {
                display: flex;
                align-items: center;
                justify-content: center;

                .img {
                    height: 20px;
                    width: 20px;
                    margin-right: 8px;
                }

                .text {
                    display: inline-block;
                    width: 70px;
                    font-size: 14px;
                    text-align: left;
                }
            }
        }
    }

    .claDes {
        font-size: 14px;
        text-align: center;
        margin-top: 38px;

        margin-bottom: 50px;
    }
}
</style>
