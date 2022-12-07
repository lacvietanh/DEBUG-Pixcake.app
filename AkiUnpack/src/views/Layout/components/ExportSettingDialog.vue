<template>
    <el-dialog
        top="30vh"
        width="502px"
        custom-class="setting-dialog gpu-switch-dialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        class="choosePresetDialog"
    >
        <div slot="title">
            <div class="title" v-if="needShowPresetSelect" style="margin-top:0;color:#D9D9D9">选择一个预设应用到
                <span style="color: #F5D228; font-size:20px; font-weight:500">{{ exportSettingData.totalNumber }}</span>
                张图片并导出
            </div>

            <div class="title" v-else style="margin-top:0;color:#D9D9D9">导出
                <span style="color: #F5D228; font-size:20px; font-weight:500">{{ exportSettingData.totalNumber }}</span>
                张图片
                <template v-if="exportSettingData.isNoePresetNumber > 0">, 其中 <span
                    style="color: #F5D228; font-size:20px; font-weight:500">{{
                        exportSettingData.isNoePresetNumber
                    }}</span>张是原图
                </template>

            </div>

        </div>

        <div class="container">
            <div class="preset-select-container" v-show="needShowPresetSelect">
                <span>预设：</span>
                <div style="position:relative">
                    <!-- <el-select v-model="whichPreset" placeholder="请选择" class="presetSelect">
                      <el-option
                          v-for="(item,index) in allPreset"
                          :key="index"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                    </el-select> -->

                    <el-cascader
                        filterable
                        class="presetSelect"
                        placeholder="请选择一个预设"
                        :options="provinceOptions"
                        v-model="whichPreset"
                        @visible-change="visibleChange"
                    />

                    <span class="right_icon">
                <img :src="$getIconPath('icon_arrow_up.png')" alt="">
                <img :src="$getIconPath('icon_arrow_down.png')" alt="">
          </span>
                </div>
            </div>

            <div class="path-select-container">
                <span>导出至：</span>
                <div class="path-select-sub-container">

                    <div class="path-select-show"
                         @click="onSelectExportPathClick"
                    >

                        <el-tooltip effect="dark" :content="finalSavePath" v-model="tipShow" placement="top">
                            <span @mouseleave="handleMouseLeave"
                                  @mouseenter="handleMouseEnter">{{ finalSavePath | filterFormatPath }}</span>
                        </el-tooltip>

                    </div>

                    <div
                        class="img-container"
                        v-gtag-event="PointExportSelectPath"
                        @click="onSelectExportPathClick">
                        <img :src="$getIconPath('export_icon_action_location@3x.png')" alt="">
                    </div>
                </div>

            </div>

            <div class="setting-container">

                <span></span>

                <el-collapse class="export-setting-container" @change="PointExportAdvancedSetting">
                    <el-collapse-item title="高级设置" name="1">
                        <div class="export-setting-container">
                            <span class="export-title">导出位置：</span>
                            <div class="export-setting-content">
                                <el-checkbox
                                    class="firstChild"
                                    v-model="createNewDir"
                                    @change="switchSetting($event, 'createNewDir')">
                                    新建项目文件夹存储
                                </el-checkbox>

                                <el-checkbox
                                    v-model="setDefaultPath"
                                    @change="switchSetting($event, 'setDefaultPath')">
                                    设为默认导出路经
                                </el-checkbox>

                                <el-checkbox
                                    v-model="restoreImportDir"
                                    @change="switchSetting($event, 'restoreImportDir')">
                                    保留导入时的文件夹命名
                                </el-checkbox>
                            </div>
                        </div>
                        <div class="dividing-line"></div>
                        <div class="export-setting-container">
                            <span class="export-title">图片格式：</span>
                            <span class="photo-format-span">
                                <el-select v-model="formatValue"
                                           @change="exportPhotoFormatChange">
                                  <el-option
                                      class="photo-format-option"
                                      v-for="item in options"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                  </el-option>
                                </el-select>
                                <span class="right_icon">
                                  <img :src="$getIconPath('icon_arrow_up.png')" alt="">
                                  <img :src="$getIconPath('icon_arrow_down.png')" alt="">
                                </span>
                            </span>
                        </div>

                        <div class="export-format-container" v-if="needShowJPGLevel">
                            <span class="export-title">品质(jpg)：</span>

                            <div class="export-content">
                                <div class="">
                                    <el-input-number
                                        class="level-container-input"
                                        size="mini"
                                        :min="0"
                                        :max="14"
                                        :precision="0"
                                        :controls="false"
                                        v-model="jpgLevel">
                                    </el-input-number>

                                    <el-select
                                        size="mini"
                                        class="level-container-select"
                                        :value="levelSelectValue"
                                        @change="jpgLevel = { 0: 3, 1: 5, 2: 8, 3: 10 }[$event]">
                                        <el-option
                                            class="photo-format-option"
                                            v-for="item in levelOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>

                                <div class="level-container">
                                    <ts-slider
                                        ref="slider"
                                        class="level-container-slider gray"
                                        :min="0"
                                        :max="14"
                                        :value="jpgLevel"
                                        :show-tooltip="false"
                                        @input="onJpgSlideChange"
                                    >
                                    </ts-slider>
                                    <div class="level-container-label">
                                        <span>小文件</span>
                                        <span>大文件</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="dividing-line"></div>

                        <div class="export-setting-container">
                            <span class="export-title">色彩空间：</span>
                            <div class="export-setting-content">
                                <el-checkbox
                                    class="firstChild"
                                    v-model="changeToSRGB"
                                    @change="switchSetting($event, 'changeToSRGB')">
                                    转换为sRGB
                                </el-checkbox>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>

            </div>
        </div>


        <div slot="footer">
            <el-button size="mini" class="exportBtn" type="default" @click="noApplay">取消</el-button>
            <el-button size="mini" class="exportBtn" type="primary" :loading="loading" @click="applyAll"
                       :disabled="exportSettingData.totalNumber===0">导出
            </el-button>
        </div>
    </el-dialog>
</template>

<script>

import { mapActions, mapGetters, mapMutations } from 'vuex'
import toast from '@/mixins/toast'
import { Select, Option, Checkbox, Tooltip, Cascader, InputNumber } from 'element-ui'
import store from '@/store'
import path from 'path'
import ShortcutHelper from '@/utils/Shortcut/ShortcutHelper'
import pointsMixin from '@/mixins/pointsMixin'
import DBIpcRender from '@/irender/DBIpcRender'
import { PROJECT_TABLE } from '#/types/config'
import TsDialog from '@/components/TsDialog/ts-dialog'
import {app, app as APP} from '@/qt-ipc/app'
import fs from '@/qt-ipc/fs'
import FileUtils from '@/utils/FileUtils'
import { exportPhotoFormat } from '@/constants/index'
import PATH from '@/qt-ipc/path'
import TsSlider from '@/components/TsSlider'
import {WIN_MAX_PATH} from "@/constants/constants";

export default {
    name: 'ExportSettingDialog',
    mixins: [toast, pointsMixin],
    components: {
        // 'el-select': Select,
        // 'el-option': Option,
        'el-checkbox': Checkbox,
        'el-tooltip': Tooltip,
        'el-cascader': Cascader,
        'el-dialog': TsDialog,
        'el-select': Select,
        'el-option': Option,
        'el-input-number': InputNumber,
        TsSlider
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        exportSettingData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            isApplyToClose: false,
            loading: false,
            visible: this.value,
            number: null,
            whichPreset: '',
            finalSavePath: '',
            saveDirPath: '',
            createNewDir: true,
            setDefaultPath: true,
            restoreImportDir: true,
            changeToSRGB: false,
            needShowPresetSelect: false,
            tipShow: false,
            jpgLevel: 12,
            needShowJPGLevel: false,
            options: [
                {
                    value: exportPhotoFormat['origin'],
                    key: 'origin',
                    label: ' 原始格式'
                }, {
                    value: exportPhotoFormat['jpeg'],
                    key: 'jpeg',
                    label: 'JPG'
                }, {
                    value: exportPhotoFormat['tiff'],
                    key: 'tiff',
                    label: 'TIFF'
                }
            ],

            levelOptions: [
                { value: 0, label: ' 低' },
                { value: 1, label: '中' },
                { value: 2, label: '高' },
                { value: 3, label: '最佳' }
            ],

            formatValue: exportPhotoFormat['origin']
        }
    },
    filters: {
        filterFormatPath(value) {
            if (value && value.length >= 36) {
                // ... 名字过滤器
                let start = value.substr(0, 18)
                let end = value.substr(value.length - 18, 18)
                return ` ${start} ... ${end}`
            }
            return value
        }
    },
    computed: {
        ...mapGetters('config', [
            'diskWarnCondition'
        ]),

        levelSelectValue() {
            if ([10, 11, 12, 13, 14].includes(this.jpgLevel)) {
                return 3
            } else if ([8, 9].includes(this.jpgLevel)) {
                return 2
            } else if ([5, 6, 7].includes(this.jpgLevel)) {
                return 1
            }
            return 0
        },

        provinceOptions() {
            let preset_list = []
            JSON.parse(JSON.stringify(this.$store.getters.presetTree)).map((item, index) => {
                let childList = []
                item.children.map((i, idx) => {
                    childList.push({ 'value': i.id, 'label': i.label })
                })
                preset_list.push({ 'value': item.id, 'label': item.label, 'children': childList })
            })
            return preset_list
        },
        allPreset() {
            const oriPreset = JSON.parse(JSON.stringify(this.$store.state.presetting.oriPreset))
            oriPreset.classId = this.$store.state.presetting.recommendPreItems[0].classId
            const resItem = Array(oriPreset).concat(this.$store.state.presetting.preItems).concat(this.$store.state.presetting.recommendPreItems)
            return resItem
        }
    },
    watch: {
        value: {
            handler(val) {
                this.visible = val
                const shortcutHelper = ShortcutHelper.getInstance()
                if (val) {
                    this.initSettingData(this.exportSettingData)
                    this.whichPreset = null
                    this.isApplyToClose = false
                    this.getPresetClass()
                    shortcutHelper.unRegisterShortcut()
                } else {
                    shortcutHelper.registerShortcut()
                }
            },
            immediate: true
        },
        visible(val) {
            this.$emit('input', val)
            if (!val && !this.isApplyToClose) {
                this.PointExportCancel()
            }
            // if (val) {
            //   this.whichPreset = this.allPreset[1].value
            // }
        }
    },
    mounted() {

    },
    methods: {
        ...mapActions(['getPresetClass']),
        ...mapGetters([
            'oriPreset'
        ]),
        ...mapMutations('config', ['updateConfigModel', 'setExportJFPFormatVal']),

        getDiskFreeSpaceAsShort(diskInfo) {
            let avaliableNums = 0
            if (this.$isWin) {
                avaliableNums = diskInfo.available / 1024 / 1024 / 1024
            } else {
                avaliableNums = diskInfo.available / 1000 / 1000 / 1000  //g的容量 (按制造商的来看)
            }
            return avaliableNums
        },

        initSettingData(val) {
            console.log('exportSettingData: ', val)
            let configModel = store.state.config.configModel
            this.createNewDir = configModel.createNewDir
            this.restoreImportDir = configModel.restoreImportDir
            this.setDefaultPath = configModel.setDefaultPath
            if (this.setDefaultPath) {
                this.saveDirPath = configModel.defaultSavePath
            } else if (val.temporaryStoragePath) {
                this.saveDirPath = val.temporaryStoragePath
            } else {
                this.saveDirPath = val.savePath
            }
            if (this.createNewDir) {
                this.finalSavePath = this.saveDirPath + path.sep + val.exportSubDirPath
            } else {
                this.finalSavePath = this.saveDirPath
            }
            this.changeToSRGB = configModel.changeToSRGB ? true : false
            this.needShowPresetSelect = val.needShowSelectPreset

            if (val.totalNumber != val.isTiffNumber) {
                this.needShowJPGLevel = true
            }
            this.jpgLevel = store.state.config.exportJPGFormatVal
        },
        visibleChange(flag) {
            if (flag && this.whichPreset === null) {
                this.whichPreset = this.$store.state.presetting.selectPreset
                this.PointExportSelectPreset()
            }
        },
        handleMouseLeave() {
            this.tipShow = false
        },
        handleMouseEnter() {
            this.tipShow = true
        },
        //保存当次用户选择导出类型
        exportPhotoFormatChange() {
            this.$store.commit('setExportPhotoFormat', this.formatValue)
            if (this.formatValue == 3) {
                this.needShowJPGLevel = false
            } else {
                if (this.formatValue == 2) {
                    this.needShowJPGLevel = true
                } else {
                    if (this.exportSettingData.totalNumber != this.exportSettingData.isTiffNumber) {
                        this.needShowJPGLevel = true
                    } else {
                        this.needShowJPGLevel = false
                    }
                }
            }
        },
        onJpgSlideChange(val) {
            this.jpgLevel = val
        },
        switchSetting(bool, type) {
            let configModel = store.state.config.configModel
            let copyModel = configModel
            if (type === 'createNewDir') {
                copyModel.createNewDir = bool
                if (this.createNewDir) {
                    this.finalSavePath = this.saveDirPath + path.sep + this.exportSettingData.exportSubDirPath
                } else {
                    this.finalSavePath = this.saveDirPath
                }
            } else if (type === 'restoreImportDir') {
                copyModel.restoreImportDir = bool
            } else if (type === 'setDefaultPath') {
                copyModel.setDefaultPath = bool
                if (copyModel.setDefaultPath) {
                    copyModel.defaultSavePath = this.saveDirPath
                } else {
                    copyModel.defaultSavePath = null
                }
            } else if (type === 'changeToSRGB') {
                copyModel.changeToSRGB = bool
            }
            console.log('updateConfigModel : ', copyModel)
            this.updateConfigModel({ data: copyModel })


        },
        async onSelectExportPathClick() {

            const result = await window.$dialog.showOpenDirDialog()
            if (result && result.selectPath) {
                this.saveDirPath = result.selectPath

                let configModel = store.state.config.configModel
                let copyModel = configModel
                if (copyModel.setDefaultPath) {
                    copyModel.defaultSavePath = result.selectPath
                }
                if (this.createNewDir) {
                    this.finalSavePath = result.selectPath + path.sep + this.exportSettingData.exportSubDirPath
                } else {
                    this.finalSavePath = result.selectPath
                }
                this.updateConfigModel({ data: copyModel })
                //文件夹点击之后，保存用户的点击
                DBIpcRender.updateBatchForValue(PROJECT_TABLE, [this.exportSettingData.currentProject.id], 'temporaryStoragePath', result.selectPath)

            }

        },
        noApplay() {
            // this.$parent.onDownloadClick(true)
            this.visible = false
        },
        async applyAll() {
            if (this.needShowPresetSelect && (this.whichPreset == null || this.whichPreset == '')) {
                this.tsNotify({
                    message: '请先选择一个预设再导出哦~'
                })
                return false
            }

            //判断 finalSavePath 是否为目录
            let finalSavePath = this.finalSavePath
            await FileUtils.mkdirSync(finalSavePath)
            if (finalSavePath.length >= WIN_MAX_PATH && app.isWin && !app.isLargeThanWin10Version){
                this.tsNotify({
                  message: '导出路径太长了，请先修改导出路径后再重试～'
                })
                return
            }
            const stat = await fs.statSync(finalSavePath)
            if (!stat.mbIsDir) {
                this.tsNotify({
                    message: '没有该导出路径的访问权限，请先修改导出路径后再重试～'
                })
                return
            }

            //检测磁盘空间大小
            let windowCheckPath = (await PATH.parse(this.finalSavePath)).root.toUpperCase() + ':'
            let macCheckPath = '/'
            let checkPath = this.$isWin ? windowCheckPath : macCheckPath
            let diskInfo = await APP.getDiskSize(checkPath)
            if (diskInfo && diskInfo?.isValid) {
                let availableNums = this.getDiskFreeSpaceAsShort(diskInfo)
                const systemDiskMinUnit = this.diskWarnCondition.minSystemDiskFreeCapacity// 10g
                let isNeedDelay = availableNums < systemDiskMinUnit
                if (isNeedDelay) {
                    this.$emit('changeShowExportSelectDialog', false) //关闭导出弹窗
                    if (this.$isWin) { //是win
                        let diskPath = diskInfo?.diskPath
                        this.tsConfirm({
                            message: '本次导出路径的磁盘空间（' + diskPath + '）不足，建议您更改磁盘路径后再导出，否则可能会导致失败哦～',
                            confirmButtonText: '更改导出磁盘',
                            cancelButtonText: '直接导出',
                            customMessageStyle: 'textAlign: left',
                            closeOnClickModal:false,
                            distinguishCancelAndClose: true
                        }).then(() => { //点击更改导出磁盘
                            this.$emit('changeShowExportSelectDialog', true) //开启导出弹窗
                        }).catch((action) => {
                            //点击取消或者遮罩
                            if (action === 'close') return
                            //点击直接导出
                            this.exportTask()
                        })
                    } else { //是mac
                        this.tsConfirm({
                            message: '本次导出路径的磁盘空间不足，建议您清理磁盘空间后再导出，否则可能会导出失败哦~',
                            confirmButtonText: '稍后导出',
                            cancelButtonText: '直接导出',
                            customMessageStyle: 'textAlign: left',
                            closeOnClickModal: false,
                            distinguishCancelAndClose: true,
                        }).then(() => { //点击稍后导出
                            console.log('点击稍后导出，结束')
                        }).catch((action) => {
                            //点击取消或者遮罩
                            if (action === 'close') return
                            //点击直接导出
                            this.exportTask()
                        })
                    }
                } else {
                    this.exportTask()
                }
            } else {
                this.exportTask()
            }

        },

        //导出
        exportTask() {
            let presetChooseItem = null
            if (this.needShowPresetSelect) {
                let content = this.$store.state.presetting.recommendPreItems
                let myPreItems = this.$store.state.presetting.preItems
                let oriPreset = this.$store.state.presetting.oriPreset
                content = [oriPreset].concat(myPreItems).concat(content)
                presetChooseItem = content.filter((item) => {
                    return this.whichPreset[1] == item.id
                })
            }

            const presetId = (this.whichPreset && this.whichPreset[1]) || null
            let savePath = this.finalSavePath
            let fValue = this.options[this.formatValue - 1].key

            this.PointExportConfirm({
                newfile: this.createNewDir,
                defaultpath: this.setDefaultPath,
                keepfolder: this.restoreImportDir,
                color: this.changeToSRGB ? 'srgb' : 'original',
                format: fValue
            }, presetId)
            this.isApplyToClose = true
            this.setExportJFPFormatVal(this.jpgLevel);
            this.$emit('exportSettingCallback', [savePath, presetChooseItem, this.createNewDir])
            this.formatValue = exportPhotoFormat.origin
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    flex-direction: column;

    /deep/ .el-collapse-item__content {
        padding-bottom: 0px;
    }

    .preset-select-container {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        margin-bottom: 16px;

        span {
            width: 58px;
            height: 24px;
            opacity: 0.99;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #D9D9D9;
            text-align: right;
        }

        .presetSelect {
            width: 320px;
        }

        /deep/ .el-input__suffix {
            display: none;
        }

        .right_icon {
            display: inline-block;
            position: absolute;
            width: 22px;
            height: 22px;
            border-radius: 4px;
            background: #3073FF;
            top: 5px;
            right: 5px;
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

    .path-select-container {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;

        span {
            width: 58px;
            height: 24px;
            opacity: 0.99;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #D9D9D9;
            text-align: right;
        }

        .path-select-sub-container {
            width: 320px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;

            .path-select-show {
                width: 288px;
                height: 28px;
                background: rgba(255, 255, 255, 0.10);
                box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
                border-radius: 4px;
                display: flex;
                align-items: center;
                justify-content: center;

                span {
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 280px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #D9D9D9;
                    letter-spacing: 0;
                    font-weight: 400;
                    text-align: left;
                    padding-left: 8px;
                }

            }

            .img-container {
                width: 28px;
                height: 28px;
                background: rgba(255, 255, 255, 0.10);
                box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.2);
                border-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left: 8px;

                img {
                    width: 14px;
                    height: 14px;
                }
            }
        }

    }

    .setting-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        span {
            width: 58px;
            height: 24px;
            opacity: 0.99;
            font-family: PingFangSC-Medium;
            font-size: 14px;
            color: #D9D9D9;
            text-align: right;
        }

        /deep/ .el-collapse {
            border-top: none;
        }

        .export-setting-container {
            width: 320px;
            border-bottom: none;
            margin-top: 8px;

            .export-title {
                width: 70px;
                height: 24px;
                opacity: 0.99;
                font-size: 14px;
                color: #D9D9D9;
                white-space: nowrap;
            }

            /deep/ .el-collapse-item__header {
                width: 76px;
                background-color: #232324;
                border: none;
            }

            /deep/ .el-collapse-item__wrap {
                background-color: #232324;
                border-bottom: none;
                overflow: inherit;
            }

            /deep/ .el-checkbox {
                margin-right: 0px;
                height: 24px;
                margin-bottom: 8px;
            }

            .export-setting-content {
                margin-top: 4px;

                .firstChild {
                    margin-right: 50px;
                }

                /deep/ .el-checkbox__label {
                    padding-left: 8px;
                }
            }
        }

        .export-format-container {
            width: 320px;
            border-bottom: none;
            margin-top: 12px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-bottom: 10px;

            .export-content {
                flex: 1;
            }

            .level-container {
                display: flex;
                flex-direction: column;
                margin-top: 13px;

                &-label {
                    display: flex;
                    justify-content: space-between;

                    > span {
                        width: auto;
                        height: auto;
                        font-size: 12px;
                        line-height: 14px;
                        color: rgba(255, 255, 255, 0.45);
                    }
                }

                &-slider {
                    margin-bottom: 6px;
                }

                &-select {
                    width: 72px;
                    margin-left: 10px;
                }

                &-input {
                    width: 45px;
                }

                /deep/ {
                    //.ts-slider__marks {
                    //    .el-slider__marks-text {
                    //        margin-top: 0;
                    //        top: -25px;
                    //    }
                    //}
                    //
                    //.ts-slider__marks-stop {
                    //    top: -4px;
                    //    background-color: #6E6E6E;
                    //    border-radius: 0;
                    //    width: 2px;
                    //}
                }
            }

            .export-title {
                width: 70px;
                height: 24px;
                opacity: 0.99;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #D9D9D9;
            }
        }
    }
}

.footer {
    padding-top: 9px;
    border-top: 1px solid #333333;

    .exportBtn:nth-of-type(1) {
        margin-right: 8px;
    }

    .exportBtn:nth-of-type(2) {
        margin-left: 8px;
    }
}

.choosePresetDialog {
    /deep/ .el-dialog.setting-dialog .el-dialog__body {
        padding-bottom: 20px;
        padding-top: 20px;
    }


}

//分割线
.dividing-line {
    width: 320px;
    height: 1px;
    background: #333333;
    margin-top: 8px;
    margin-bottom: 12px;
}

//图片格式
.export-setting-container {
    .photo-format-span {
        position: relative;

        /deep/ {
            .el-input__inner {
                width: 250px;
                height: 28px;
                line-height: 28px !important;
                background: rgba(255, 255, 255, 0.10) !important;
                font-size: 14px;
                padding-left: 8px;
            }
        }

        .right_icon {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            background: #3073FF;
            top: 0;
            right: 4px;
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
}

//拉下字体颜色
.photo-format-option {
    color: #D9D9D9;
}

</style>
