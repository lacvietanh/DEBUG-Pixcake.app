<template>
    <el-dialog
        append-to-body
        top="30vh"
        width="579px"
        align="center"
        title="设置"
        custom-class="setting-dialog gpu-switch-dialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
        @close="!useCancelBtn ? PointClickSettingClose() : () => {}"
    >

        <div slot="title">
            设置
        </div>

        <div class="container">

            <template>

                <el-tabs :tab-position="tabPosition" v-model="activeTab" style="height: 315px;">
                    <el-tab-pane name="default" label="图形处理器">
                        <template>

                            <div class="title">
                                图形处理器设置：
                                <el-popover
                                    placement="top"
                                    width="368"
                                    trigger="click"
                                    content="">
                                    <i class="ts-icon ts-icon-question-outside"
                                       style="width: 15px; height: 15px; vertical-align: middle;" slot="reference"></i>
                                    <div class="tip-info">
                                        <p>勾选“使用图形处理器”可以充分发挥您的显卡性能，进而提高整体软件运行速度。</p>
                                        <br/>
                                        <p>确认设置后，会重新启动{{ CLIENT_NAME_EN }}。</p>
                                    </div>
                                </el-popover>

                            </div>


                            <div v-if="$isMac" class="gpu-container">
                                <div class="gpu-title" style="align-self: flex-start">使用图形处理器：</div>
                                <ul class="gpu-info">
                                  <li>
                                    <el-checkbox
                                        v-model="form.enableOpenCL">
                                      <!--                                            @change="confirmTip($event, 'openCL')"-->
                                      提升色彩调节速度
                                    </el-checkbox>
                                  </li>

                                </ul>
                            </div>

                          <div v-if="showGLCheckbox" class="gpu-container">
                            <div class="gpu-title" style="align-self: flex-start">使用图形处理器：</div>
                            <ul class="gpu-info">

                              <li >
                                <el-checkbox
                                    v-model="form.openGLAttr"
                                    :true-label="OpenGLAttribute.UseOpenGLES"
                                    :false-label="OpenGLAttribute.UseSoftwareOpenGL">
                                  提升人像美化速度
                                </el-checkbox>
                              </li>
                            </ul>
                          </div>

                        </template>

                    </el-tab-pane>
                    <el-tab-pane name="export" label="导出设置">
                        <template>
                            <div class="task-title">导出设置：</div>

                            <div class="gpu-container" style="margin-top: 12px">
                                <div class="gpu-title">同时导出的图片数：</div>
                                <div class="task-select-container">
                                    <div class="ts-select-container">
                                        <el-select v-model="taskNumber" placeholder="请选择" class="taskSelect"
                                                   style="width: 94px;">
                                            <el-option
                                                v-for="(item) in allTaskNumber"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>

                                        </el-select>

                                        <span class="right_icon" style="left: 70px;">
                                          <img :src="$getIconPath('icon_arrow_up.png')" alt="">
                                          <img :src="$getIconPath('icon_arrow_down.png')" alt="">
                                        </span>
                                    </div>

                                </div>

                                <el-popover
                                    placement="top"
                                    width="368"
                                    trigger="click"
                                    content="">
                                    <i class="ts-icon ts-icon-question-outside"
                                       style="margin-left: 38px; width: 15px; height: 15px; vertical-align: middle;"
                                       slot="reference"></i>
                                    <div class="tip-info">
                                        <p>“同时导出的图片数”数值设置越大，同时导出的图片就越多，就能提升导出速度。</p>
                                        <p>但如果您的电脑出现卡顿的情况，请将同时导出的图片数目降低，可能是当前设置的数目与您的电脑性能不匹配。</p>
                                        <br/>
                                        <p>默认张数是根据您当前的电脑性能计算出的最佳导出方案。</p>
                                    </div>
                                </el-popover>

                            </div>

                            <div class="task-tip-container" v-show="needShowTaskTip">

                                <i class="el-icon-warning-outline"></i>
                                <span>图片数量设置大于默认值，可能会导致您的电脑出现卡顿现象</span>
                            </div>
                            <template v-if="!HIDDEN_SWITCH_IMAGE_DESCRIPTION">
                                <div class="container-line"></div>

                                <div style="margin-top: 10px" class="gpu-title">图片描述（标题）：</div>

                                <div class="image-desc-radio-wrapper">
                                    <el-radio v-model="showImageDescription" :label="true"
                                              @change="changeImageDescription">显示PixCake
                                    </el-radio>
                                    <el-radio v-model="showImageDescription" :label="false"
                                              @change="changeImageDescription">显示原始信息
                                    </el-radio>
                                </div>
                            </template>
							<template v-if="IS_ALLOW_PHOTOSHOP_OPEN_PICTURE">
								<div class="container-line"></div>
								<div style="margin-top: 10px" class="gpu-title">Photoshop引用程序路径：</div>
								<div class="warning-tip" v-if="!photoshopPath">未检测到photoshop应用程序，请手动设置程序路径</div>
								<div class="select-photoshop-path">
									<el-input class="photoshop-input" placeholder="点击开始设置" readonly :value="photoshopPath ? photoshopPath : ''"></el-input>
									<el-button @click="selectPhotoshopPath" size="mini">
										<i class="ts-icon-directory"></i>
									</el-button>
								</div>
							</template>

                        </template>

                    </el-tab-pane>
                    <el-tab-pane name="cache" label="缓存设置">
                        <template>
                            <div class="task-title">缓存设置：</div>

                            <div class="gpu-container" style="margin-top: 12px">
                                <div class="gpu-title">缓存天数：</div>
                                <div class="cache-select-container">
                                    <div class="ts-select-container">
                                        <el-select
                                            v-model="cacheNumber"
                                            placeholder="请选择" class="taskSelect"
                                            style="width: 74px">
                                            <el-option
                                                v-for="(item) in allCacheNumber"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span class="right_icon">
                                            <img :src="$getIconPath('icon_arrow_up.png')" alt="">
                                            <img :src="$getIconPath('icon_arrow_down.png')" alt="">
                                        </span>
                                    </div>
                                    <el-button
                                        class="claRepair"
                                        @click="onClearCache"
                                        :loading="repairLoading"
                                        size="mini"
                                    >
                                        清理缓存
                                    </el-button>
                                </div>
                            </div>
                        </template>
                    </el-tab-pane>
                    <el-tab-pane name="refine" label="精修-图像预览">

                        <template>
                            <div class="task-title">大图预览图像尺寸设置：</div>

                            <div class="gpu-container" style="margin-top: 12px">
                                <div class="gpu-title">预览图像尺寸 (px)：</div>
                                <div class="task-select-container">
                                    <div class="ts-select-container">
                                        <el-select
                                            v-model="previewSize"
                                            placeholder="请选择"
                                            class="taskSelect"
                                            style="width: 78px">
                                            <el-option
                                                v-for="(item) in allPreviewSize"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                        <span class="right_icon" style="left: 54px;">
                                        <img :src="$getIconPath('icon_arrow_up.png')" alt="">
                                        <img :src="$getIconPath('icon_arrow_down.png')" alt="">
                                    </span>
                                    </div>

                                </div>
                            </div>

                            <div class="gpu-title">
                                <i class="ts-icon ts-icon-warning-outside"
                                   style="top: -1px; width: 12px; height: 12px; vertical-align: sub;margin-right: 6px;"
                                   slot="reference"></i>
                                预览图像尺寸设置不影响导出的画质。导出是按照原图尺寸导出。
                            </div>
                            <div style="margin-top: 10px" class="gpu-title">左侧缩略图：</div>

                            <div>
                                <el-radio v-model="showEffectThumb" :label="true" @change="changeThumbShowStatus">
                                    效果图展示
                                </el-radio>
                                <el-radio v-model="showEffectThumb" :label="false" @change="changeThumbShowStatus">
                                    原图展示
                                </el-radio>
                            </div>

                        </template>
                    </el-tab-pane>

                    <el-tab-pane
                        v-if="showExhibitionPane"
                        label="展会设置"
                        name="exhibition-config"
                        class="pane-container">
                        <div class="gpu-container">
                            <div class="gpu-title">自动载入图片套预设：</div>
                            <el-radio v-model="exhibition.switch" :label="1">开启</el-radio>
                            <el-radio v-model="exhibition.switch" :label="0">关闭</el-radio>
                        </div>

                        <div class="gpu-container">
                            <div class="gpu-title">自动导入文件夹：</div>
                            <el-input
                                class="import-input"
                                size="mini"
                                placeholder="请选择导入文件夹"
                                v-model.trim="exhibition.importPath">
                                <template slot="append">
                                    <el-button
                                        @click="selectImportPath"
                                        size="mini">
                                        <i class="ts-icon-directory"></i>
                                    </el-button>
                                </template>
                            </el-input>
                        </div>

                        <div class="gpu-container">
                            <div class="gpu-title">预设Id：</div>
                            <el-input
                                v-model.trim="exhibition.presetSuitId"
                                style="width: 100px"
                                size="mini">
                            </el-input>
                        </div>

                        <div class="gpu-container">
                            <div class="gpu-title">获取载入图片间隔时间：</div>
                            <el-input-number
                                size="mini"
                                controls-position="right"
                                style="width: 100px"
                                v-model="exhibition.importDelayTime">
                            </el-input-number>
                            &nbsp;&nbsp;秒
                        </div>

                        <div style="text-align: right">
                            <el-button type="primary" @click="submitExhibition">保存设置</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>


        </div>

        <div slot="footer">
            <el-button
                size="mini"
                v-gtag-event="PointClickSettingReturn"
                @click="[useCancelBtn = true, visible = false]">
                取消
            </el-button>

            <el-button
                size="mini"
                type="primary"
                :loading="loading"
                @click="submit">
                确认
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import {defineComponent, getCurrentInstance, reactive, ref} from 'vue'

import { mapActions, mapGetters, mapMutations } from 'vuex'
import toast from '@/mixins/toast'

import { Button, Popover, Checkbox, Select, Option, Tabs, TabPane, InputNumber } from 'element-ui'
import {
	CLIENT_NAME_EN,
	CLIENT_NAME,
	HIDDEN_SWITCH_IMAGE_DESCRIPTION,
	IS_ALLOW_PHOTOSHOP_OPEN_PICTURE, OpenGLAttribute, IS_CLIENT_PixCake_EXPO
} from '#/types/config'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import TsDialog from '@/components/TsDialog/ts-dialog'
import { tsImgIO__getDefaultConcurrentCount } from '@/utils/initGpuStatus'
import pointsMixin from '@/mixins/pointsMixin'
import { delay } from '#/utils/common'
import refine from 'qt/business/refine'
import { dialogIpc, FConfirmDialogKey } from '@/qt-ipc/dialog/DialogIpcImpl'
import {ExportBridgeImpl} from "@/qt-ipc/bridge/impl/ExportBridgeImpl";
import LocalConfigModel from '@/universal/model/LocalConfigModel'
import useToastRepositories from '@/composables/useToastRepositories'
const kShowRebootLaterDialog = 'showRebootLaterDialog'

export default defineComponent({
    name: 'GpuSwitchDialog',
    mixins: [toast, pointsMixin],
    components: {
        'el-dialog': TsDialog,
        'el-button': Button,
        'el-popover': Popover,
        'el-checkbox': Checkbox,
        'el-select': Select,
        'el-option': Option,
        'el-tabs': Tabs,
        'el-tab-pane': TabPane,
        'el-input-number': InputNumber
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        active: {
            type: String,
            default: 'default'
        }
    },
    setup() {
		const instance = getCurrentInstance()
		const exhibition = reactive({
            switch: 0,
            importDelayTime: 10,
            presetSuitId: '',
            importPath: ''
        })

        const showExhibitionPane = ref(false)

        // 加载配置文件及是否显示展会设置
        const loadExhibitionData = async () => {
            const localInstance = LocalConfigModel.getInstance()
            await localInstance.readJsonFromLocal()
            const config = localInstance.exhibitionConfig
            if (localInstance.switch && IS_CLIENT_PixCake_EXPO) {
                showExhibitionPane.value = true
            }
            if (config) {
                exhibition.switch = config.switch
                exhibition.importDelayTime = config.importDelayTime
                exhibition.presetSuitId = config.presetSuitId
                exhibition.importPath = config.importPath
            }
        }

        // 选择导入文件夹
        const selectImportPath = async () => {
            let ret = await ExportBridgeImpl.instance().openPhotoShopDialog()
            if (ret && ret.filePaths) {
				exhibition.importPath = ret.filePaths[0] || ''
            }
        }

        const { tsConfirm, tsNotify } = useToastRepositories()
        // 提交展会设置
        const submitExhibition = async () => {
            if (exhibition.switch) {
                if (!exhibition.importPath) {
                    tsNotify('请设置自动导入所在对文件夹路径！')
                    return
                }
            }

            const localInstance = LocalConfigModel.getInstance()
            const bool = await localInstance.updateOnlineConfig(exhibition)
			instance.proxy.SetCanShowManualImportButton()
			await tsConfirm({
                title: '展会设置',
                message: bool ? '保存成功' : '保存失败',
                showCancelButton: false
            })
        }

        return {
            exhibition,
            showExhibitionPane,

            loadExhibitionData,
            selectImportPath,
            submitExhibition,
        }
    },
    data() {
        return {
            activeTab: this.active,
            tabPosition: 'left',
            CLIENT_NAME_EN,
            CLIENT_NAME,
            IS_ALLOW_PHOTOSHOP_OPEN_PICTURE,
            HIDDEN_SWITCH_IMAGE_DESCRIPTION,
            loading: false,
            visible: this.value,
            OpenGLAttribute: {
                ...OpenGLAttribute
            },
            form: {
                enableOpenCL: true,
                enableOpenGL: false,
                openGLAttr: OpenGLAttribute.UseDesktopOpenGL
            },
            gpus: [],
            taskNumber: 1,
            allTaskNumber: [],
            cacheNumber: '3天',
            allCacheNumber: [],
            previewSize: 0,
            defaultPreviewSize: 0,
            allPreviewSize: [],
            repairLoading: false,
            needShowRepairBtn: this.getAutoNeedShowRepairBtn(),
            needShowTaskTip: false,
            useCancelBtn: false,
            showEffectThumb: true,
            showImageDescription: true, //显示图片描述
            showGLCheckbox: false,
        }
    },
    computed: {
        ...mapGetters('config', [
            'enableOpenCL',
            'enableOpenGL',
            'exportTaskConfig',
            'appConfigModel',
            'usePreviewSize',
            'previewAreaSizeList',
            'gpuGlAttribute',
            'defaultGpuAttribute',
            'photoshopPath'
        ])

    },
    watch: {
        value: {
            async handler(val) {
                this.visible = val
                this.needShowRepairBtn = this.getAutoNeedShowRepairBtn()
                if (val) {

                    this.gpus = 2//remote.getGlobal('sharedObject').gpus
                    await this.readOpenglAttribute()
                    this.showGLCheckbox = false
                    if (this.$isWin) {
                        // this.showGLCheckbox = this.defaultGpuAttribute == OpenGLAttribute.UseOpenGLES
                        this.showGLCheckbox = true
                    }
                    this.form = {
                        enableOpenCL: this.enableOpenCL,
                        enableOpenGL: this.enableOpenGL,
                        openGLAttr: this.gpuGlAttribute
                    }
                    let defaultNumber = await tsImgIO__getDefaultConcurrentCount()
                    this.taskNumber = this.exportTaskConfig.defaultNumber

                    let list = []
                    for (let i = 1; i <= this.exportTaskConfig.maxNumber; i++) {
                        let label = i
                        if (i === defaultNumber) {
                            label = i + ' (默认)'
                        }
                        let item = {
                            label: label,
                            value: i
                        }
                        list.push(item)
                    }
                    this.allTaskNumber = list

                    let appConfigModel = this.appConfigModel
                    this.cacheNumber = appConfigModel.defaultCacheNumber

                    this.allCacheNumber = []

                    this.allCacheNumber.push({ label: '3天', value: 3 })
                    this.allCacheNumber.push({ label: '7天', value: 7 })
                    this.allCacheNumber.push({ label: '15天', value: 15 })

                    let previewSize = appConfigModel.previewSize
                    if (previewSize === 0) {
                        previewSize = await refine.getPreviewSize()
                        this.$store.commit('config/updateConfig', { previewSize: previewSize })
                    }
                    this.defaultPreviewSize = previewSize
                    this.previewSize = previewSize
                    this.showEffectThumb = appConfigModel.showEffectThumb
                    this.showImageDescription = appConfigModel.showImageDescription

                    let previewList = this.previewAreaSizeList
                    this.allPreviewSize = []
                    for (const listElement of previewList) {
                        this.allPreviewSize.push({ label: listElement.size, value: listElement.size })
                    }

                    this.loadExhibitionData()
                }
            },
            immediate: true
        },
        visible(val) {
            if (!val) {
                delay(300).then(() => {
                    this.useCancelBtn = false
                    this.activeTab = 'default'
                })
            }
            this.$emit('input', val)
        },
        active(val) {
            this.activeTab = val
        },
        activeTab(value) {
            this.$emit('update:active', value)
        },
        taskNumber(val) {
            tsImgIO__getDefaultConcurrentCount().then((res) => {
                this.needShowTaskTip = val > res
            })
        }
    },
    methods: {
        ...mapMutations('config', [
            'changeEnableOpenCLStatus',
            'changeEnableOpenGLStatus',
            'changeExportTaskNumber',
            '_SetPhotoshopPath',
			'SetCanShowManualImportButton'
        ]),
        ...mapActions('config', [
            'readOpenglAttribute',
            'saveOpenglAttribute',
            'readPhotoShopPath'
        ]),

        async selectPhotoshopPath(properties = ['openDirectory', 'openFile']) {
            let ret = await ExportBridgeImpl.instance().openPhotoShopDialog()
            if (ret && ret.filePaths){
                this._SetPhotoshopPath(ret.filePaths[0])
            }
        },

        onGlAttrChanged(val) {
            this.tsConfirm({
                message: '勾选之后可能会导致您的效果图异常',
                confirmButtonText: '确认勾选',
                cancelButtonText: '取消勾选'
            }).then(() => {
            }).catch(_ => {
                this.form.openGLAttr = this.gpuGlAttribute
            })
        },
        changeThumbShowStatus() {
            if(this.showEffectThumb) {
                this.PointShowEffectThumb()
            } else {
                this.PointShowOriginThumb()
            }
        },
        changeImageDescription() {
            console.log('changeImageDescription : ', this.showImageDescription)
        },
        getAutoNeedShowRepairBtn() {
            // let fixLib = new FixLostLibrary()
            // return fixLib.hasLostFiles()
            return false
        },

        async onRepairClick() {
            this.repairLoading = true
            try {
                // let fixLib = new FixLostLibrary()
                // await fixLib.repair()
                this.repairLoading = false
                this.needShowRepairBtn = this.getAutoNeedShowRepairBtn()
                this.tsNotify(`修复文件成功了`)
            } catch (e) {
                this.tsNotify(`修复过程发生了错误，请重新尝试!`)
                this.repairLoading = false
                console.log(e)
            }
        },

        confirmTip(bool, type) {
            if (!bool) return
            this.tsConfirm({
                message: '勾选之后可能会导致您的效果图异常',
                confirmButtonText: '确认勾选',
                cancelButtonText: '取消勾选'
            }).catch(_ => {
                if (type === 'openGL') {
                    this.form.enableOpenGL = this.enableOpenGL
                } else if (type === 'openCL') {
                    this.form.enableOpenCL = this.enableOpenCL
                }
            })
        },

        async submit() {
            const { enableOpenCL, enableOpenGL } = this.form

            let needRelaunch = false
            if (this.taskNumber !== this.exportTaskConfig.defaultNumber) {
                needRelaunch = true
                this.changeExportTaskNumber(this.taskNumber)
            }

            if (enableOpenCL !== this.enableOpenCL) {
                needRelaunch = true
                this.changeEnableOpenCLStatus(enableOpenCL)
            }

            if (this.$isWin) {
                if (enableOpenGL !== this.enableOpenGL) {
                    needRelaunch = true
                    this.changeEnableOpenGLStatus(enableOpenGL)
                }
            }

            if (this.defaultPreviewSize !== this.previewSize) {
                this.$store.commit('config/updateConfig', { previewSize: this.previewSize })
            }

            let appConfigModel = this.appConfigModel
            if (this.cacheNumber !== appConfigModel.defaultCacheNumber) {
                this.$store.commit('config/updateConfig', { defaultCacheNumber: this.cacheNumber })
            }

            if (this.showEffectThumb !== appConfigModel.showEffectThumb) {
                this.$store.commit('config/updateConfig', { showEffectThumb: this.showEffectThumb })
            }

            //showImageDescription-图片描述更新保存数据库
            if (this.showImageDescription !== appConfigModel.showImageDescription) {
                this.$store.commit('config/updateConfig', { showImageDescription: this.showImageDescription })
            }

            if (this.form.openGLAttr !== this.gpuGlAttribute) {
                needRelaunch = true
                this.saveOpenglAttribute(this.form.openGLAttr)
            }

            this.visible = false
            this.PointClickSettingConfirm({
                threads: this.taskNumber,
                cache: this.cacheNumber,
                previewsize: this.previewSize,
                image_description: this.showImageDescription ? 'pixcake' : 'original'
            })

            if (!needRelaunch) return
            this.loading = true

            this.tsConfirm({
                title: `本次设置需重启 ${CLIENT_NAME} 之后才能生效`,
                confirmButtonText: `重启${CLIENT_NAME}`,
                cancelButtonText: '下一次启动生效'
            }).then(_ => {
                this.tsNotify('即将重启应用')

                delay(1000).then(() => {
                    ipcRenderer.send('app-restart', { clearCache: false })
                    this.loading = false
                })
            }).catch(_ => {
                this.loading = false
            })

        },
        onClearCache() {

            this.visible = false
            this.tsConfirm({
                title: `清理缓存需重启 ${CLIENT_NAME} 之后马上生效`,
                confirmButtonText: `重启${CLIENT_NAME}`,
                cancelButtonText: '取消'
            }).then(_ => {
                this.tsNotify('即将重启应用')

                delay(1000).then(() => {
                    ipcRenderer.send('app-restart', { clearCache: true })
                })
            }).catch(_ => {
            })

        },
    },
    async mounted() {
        this.readPhotoShopPath()
        dialogIpc.addListener(FConfirmDialogKey(kShowRebootLaterDialog), () => {
            this.tsConfirm({
                title: `本次设置需重启 ${CLIENT_NAME} 之后才能生效`,
                confirmButtonText: `重启${CLIENT_NAME}`,
                cancelButtonText: '下一次启动生效'
            }).then(_ => {
                this.tsNotify('即将重启应用')

                delay(1000).then(() => {
                    ipcRenderer.send('app-restart', { clearCache: false })
                    this.loading = false
                })
            }).catch(_ => {
                this.loading = false
            })
        })
    },
    beforeDestroy() {
        dialogIpc.removeListener(FConfirmDialogKey(kShowRebootLaterDialog))
    }
})
</script>

<style lang="scss" scoped>
/deep/ .gpu-switch-dialog.el-dialog {
    .el-dialog__body {
        padding: 0 !important;
    }

    .el-tabs__item.is-left {
        text-align: left;
    }

    .el-tabs__item.is-active {
        color: #ffffff;
        background-color: #1d1d1d;
    }

    .el-tabs__item {
        color: #737373;
    }

    .el-tabs__active-bar {
        background-color: #333333;
    }

    .el-tabs__nav-wrap::after {
        background-color: #333333;
    }

    .el-tabs__content {
        padding-left: 20px;
    }

    .el-tabs__nav-wrap.is-left::after {
        width: 1px;
    }

    .el-input__inner {
        height: 28px;
        text-align: center;
    }

    .el-icon-warning-outline:before {
        color: #D96838;
    }

}

.tip-info {
    font-size: 12px;
    line-height: 18px;
    margin: 4px;
}

.gpu-switch-dialog {
    .container {
        text-align: left;
        height: 315px;

        .title {
            height: 24px;
            opacity: 0.99;
            font-size: 16px;
            color: #D9D9D9;
            line-height: 24px;
            font-weight: 500;
            margin-top: 20px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
        }

        .task-tip-container {
            height: 24px;
            display: flex;
            flex-direction: row;
            align-items: center;

            span {
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #D95838;
                letter-spacing: 0;
                text-align: center;
                font-weight: 400;
                margin-left: 6px;
            }
        }

        .container-line {
            background-color: #333333;
            // opacity: 0.2;
            height: 1px;
            width: calc(100% - 30px);
            margin: 12px 0;
        }

        .task-title {
            margin-top: 20px;
            font-size: 16px;
        }

        .gpu-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 12px;
        }

        .gpu-title, .gpu-title-use .task-title {
            height: 25px;
            font-size: 12px;
            color: #D9D9D9;
            font-weight: 500;
            margin-right: 8px;
            flex-shrink: 0;
        }

        .image-desc-radio-wrapper {
            /deep/ .el-radio {
                .el-radio__label {
                    color: rgba($color: #ffffff, $alpha: 0.85);
                }
            }
        }

        .gpu-info {
            line-height: 17px;
            opacity: 0.9;
            font-size: 12px;
            color: #FFFFFF;
            font-weight: 400;
            flex: 1;

            > li {
                display: flex;
                padding: 4px 0;
                justify-content: space-between;

                .claRepair {
                    width: 88px;
                    height: 26px;
                    border: 1px solid #434343;
                    border-radius: 4px;
                    padding-left: 12px;
                    margin-top: -5px;
                    margin-right: 28px;
                }

                /deep/ .is-loading {
                    background: #232323;

                    &:before {
                        background-color: unset;
                    }

                    span {
                        margin-left: 0px;
                    }
                ;
                }
            }
        }

        .cache-select-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 1;
            position: relative;

            .claRepair {
                width: 88px;
                height: 26px;
                background: #232323;
                border: 1px solid #434343;
                border-radius: 4px;
                padding-left: 12px;
                margin-right: 28px;
            }
        }

        .task-select-container {
            width: 66px;
            height: 28px;
            position: relative;

            .taskSelect {
                width: 66px;
                height: 8px;

                /deep/ .el-input__inner {
                    padding-left: 0;
                }
            }

            /deep/ .el-input__inner {
                height: 28px;
            }
        }
    }

    .warning-tip {
        color: #D95838;
    }

    .select-photoshop-path {
        display: flex;
        margin-top: 10px;
        align-items: center;

        .photoshop-input {
            width: 250px;
            margin-right: 10px;
        }

        /deep/ {
            .el-input__inner {
                height: 28px;
                text-align: left;
                font-size: 11px;
            }

            .el-button {
                padding: 6px 7px;
            }
        }
    }
}

.ts-select-container {
    position: relative;

    .taskSelect {
        width: 66px;
        height: 28px;

        /deep/ .el-input__inner {
            padding-left: 8px;
        }
    }

    .right_icon {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background: #3073FF;
        right: 5px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        pointer-events: none;

        img:nth-of-type(1) {
            width: 10px;
            margin-bottom: -2px;
        }

        img:nth-of-type(2) {
            width: 8px;
        }
    }
}

.pane-container {
    padding: 20px 20px 20px 0;
}

.import-input {
    :deep(.el-input-group__append) {
        padding: 0;
    }

    :deep(.el-button) {
        padding: 5px 15px;
    }
}

</style>
