<template>
    <div class="header global__top-nav border-line-style">
        <template v-if="leftBtnSlot">
            <slot name="left-btn"></slot>
        </template>

        <template v-else>
            <div class="left-func-container">
                <el-button
                    size="mini"
                    :disabled="getIconDisabled"
                    @click="onClickHome"
                    class="return-home-btn">
                    <img v-if="getIconDisabled" :src="$getIconPath('nav_icon_workbench_disabled@3x.png')" alt=""
                         class="return-icon">
                    <i v-else class="el-icon-s-home return-icon"></i>

                </el-button>

                <template v-if="['batchRetouch','photoFinishing'].includes(routeName)">
                    <template v-if="$platform === 'darwin'">
                        <div class="addFileWrapCla">
                            <el-button
                                size="mini"
                                class="addFileCla"
                                icon="el-icon-plus"
                                :disabled="getIconDisabled"
                                v-gtag-event="PointAddSecond"
                                @click="[
                                        cancelBlur($event),
                                        onCommand('onImportFileAndDir')
                                    ]">
                            </el-button>
                        </div>
                    </template>

                    <template v-if="$platform !== 'darwin' && !getIconDisabled">
                        <el-dropdown
                            hide-on-click
                            class="dropDownCla"
                            placement="bottom-start"
                            @visible-change="onAddFileVisible"
                            @command="onCommand">

                            <div class="addFileWrapCla">
                                <el-button
                                    size="mini"
                                    class="addFileCla"
                                    :disabled="getIconDisabled"
                                    icon="el-icon-plus">
                                </el-button>
                            </div>

                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item
                                    command="onImportFile"
                                    v-gtag-event="PointAddSecond">
                                    <div>导入图片</div>
                                </el-dropdown-item>

                                <el-dropdown-item
                                    divided
                                    command="onImportDir"
                                    v-gtag-event="PointAddSecond">
                                    <div>导入文件夹</div>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </template>
            </div>
        </template>



        <!-- 菜单列表 -->
        <div class="center-func-container menu">
            <template v-for="(menu,index) in menuList">
                <div
                    v-show="showFunc(menu)"
                    class="item"
                    :title="menu.name"
                    :key="menu.routeName+index"
                    :class="{
                        'active': menu.isActive,
                        'disabled': menu.disabled
                    }"
                    @click="menu.disabled ? menu.disableFunc()
                        : onRouterPush(menu.routeName,{
                        })"
                >
                    <!-- <img :src="menu.isActive ? menu.activeIcon : menu.icon"/> -->
                    <span class="menu-title">{{ menu.subTitle }}</span>
                </div>
            </template>
        </div>

        <div class="right-func-container menu">
            <!-- 下载 -->
            <nav-entry-group
                dark-vip
                :nav-list="['debug','manual-import', 'export-btn', 'gift', 'divider', 'export', 'userinfo', 'divider', 'help', 'set', 'divider', 'vip']">
                <template slot="export-btn">
                    <div class="guideClass6">
                        <el-button
                            v-show="hasDownloadPermission"
                            type="primary"
                            class="item download-btn"
                            :disabled="canDownload"
                            :class="{ 'active': hasDownloadActiveStyle }"
                            @click="onDownloadIconClick">
                            <img :src="downloadImgUrl" alt="">
                            导出图片
                        </el-button>
                    </div>
                </template>
				<template slot="manual-import" v-if="canShowManualImportButton"><el-button type="primary" class="claManualImportBtn" @click="onManualImportClick">载入图片</el-button></template>
            </nav-entry-group>
        </div>

        <ExportSettingDialog
            v-if="hasDownloadPermission"
            v-model="showExportSelectDialog"
            @exportSettingCallback="exportSettingCallback"
            @changeShowExportSelectDialog="onChangeShowExportSelectDialog"
            :export-setting-data="exportSetting"
        />
    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex'
import ipcRenderer from '@/qt-ipc/Ipc-renderer'

import { throttle, debounce } from 'lodash'

import { LOGO_RELATIVE_PATH } from '@/constants/config'
import toast from '@/mixins/toast'
import button from '@/mixins/button'

import eventbus from '@/utils/eventbus'
import { TSImageIOManager } from '@/utils/tsImageIOManager'
import ThumbnailModel from '@/model/ThumbnailModel'

import { Button } from 'element-ui'

import pointsMixin from '@/mixins/pointsMixin'
import exportMixin from '@/mixins/export-mixin'
import noviceGuideMixin from '@/mixins/noviceGuideMixin'
import NavEntryGroup from '@/views/Layout/components/NavEntryGroup'
import {QtEventFilter, QtEventFilterType} from "@/utils/QtEventFilter";
import {IS_CLIENT_PixCake_EXPO} from "@/universal/types/config";
import LocalConfigModel from "@/universal/model/LocalConfigModel";
import fs from "@/qt-ipc/fs";

export default {
    name: 'FuncHeader',
    components: {
        'el-button': Button,
        NavEntryGroup
    },
    mixins: [toast, button, pointsMixin, noviceGuideMixin, exportMixin],
    data() {
        return {
            LOGO_RELATIVE_PATH,
            leftBtnSlot: false,
            showHotKey: false,
            showImportPopPannel: false,
            showChoosePresetDialog: false,
            selectedTotal: 0,
            showGpuSwitchSetting: false,
            isShowFundLackTip: false
        }
    },
    watch: {
        showVipPriceDialog(val) {
            if (val === true && !['photoFinishing'].includes(this.routeName)) {
                this.$tsStat?.event('cake_member_price', {
                    cake_operate: 'init_gallery'
                })
            } else if (val === true && ['photoFinishing'].includes(this.routeName)) {
                this.$tsStat?.event('cake_member_price', {
                    cake_operate: 'init_refine'
                })
            }
        },
        showExportSelectDialog(val) {

        }
    },
    computed: {
        ...mapGetters(['isVip', 'user', 'getIconDisabled']),
        showPaySuccess: {
            get() {
                return this.$store.state.order.showPaySuccess
            },
            set() {

            }
        },
        ...mapGetters('config', [
            'isDebugEnv',
			'canShowManualImportButton'
        ]),

        ...mapGetters('thumbnail', [
            'getThumbnails'
        ]),

        ...mapGetters('project', [
            'activeProjectId',
            'lastProjectUpdateTime'
        ]),

        ...mapGetters('export', [
            'exportEffectCfg'
        ]),
        avatarUrl() {
            return require('@/assets/icons/dark/nav_icon_avatar@3x.png')
        },
        downloadImgUrl() {
            if (this.hasDownloadActiveStyle) {
                return require('@/assets/icons/dark/nav_icon_export1@3x.png')
            } else {
                return require('@/assets/icons/dark/nav_icon_export2@3x.png')
            }
        },


        exportNumber() {
            return this.$store.state.export.exportNumber
        },

        hasDownloadPermission() {
            return this.$store.state.permission.hasDownloadPermission
        },

        canDownload() {
            if (this.getIconDisabled) {
                return true
            }
            return !this.$store.state.export.isDownloadFree
        },

        hasDownloadActiveStyle() {
            if (this.getIconDisabled) {
                return false
            }
            return this.$store.state.permission.hasDownloadActive
        },

        needShowTemplateDetail() {
            return this.$store.state.applyTemplate.onShowEditView
        },

        routeName() {
            console.log(`FuncHeader route.name`, this.$route.name)
            return this.$route.name
        },
        routeParam() {
            return this.$route.query
        },
        menuList() {
            if (['photoFinishing', 'batchRetouch'].includes(this.routeName)) {
                return [
                    {
                        name: '图库',
                        subTitle: '图库',
                        routeName: 'batchRetouch',
                        // disabled: true,
                        icon: this.$getIconPath('nav_icon_color_adjustment@3x.png'),
                        activeIcon: this.$getIconPath('nav_icon_color_adjustment@3x.png'),
                        isActive: this.routeName === 'batchRetouch'
                        // disableFunc: this.showRawTips
                    },
                    {
                        name: '精修',
                        subTitle: '精修',
                        routeName: 'photoFinishing',
                        icon: this.$getIconPath('nav_icon_beautify@3x.png'),
                        activeIcon: this.$getIconPath('nav_icon_beautify@3x.png'),
                        isActive: this.routeName === 'photoFinishing'
                    }
                ]
            } else {
                return []
            }
        },

        rightMenuList() {

            return [
                {
                    name: '批量调色',
                    routeName: 'batchRetouchColor',
                    disabled: true,
                    icon: this.$getIconPath('nav_icon_color_adjustment@3x.png'),
                    activeIcon: this.$getIconPath('nav_icon_color_adjustment@3x.png'),
                    isActive: this.routeName === 'batchRetouchColor',
                    disableFunc: this.showRawTips
                }
            ]

        }
    },
    beforeDestroy() {
        eventbus.$off('guide6Init', null)
        ipcRenderer.removeAllListeners('onCloseClick')
    },

    mounted() {
		this.SetCanShowManualImportButton()
        if (this.$slots['left-btn']) {
            this.leftBtnSlot = true
        }
        ipcRenderer.on('onCloseClick', () => {
            let updateTime = this.lastProjectUpdateTime
            if (updateTime) {
                this.ACT_UpdateProject({
                    id: this.activeProjectId,
                    modify: {
                        update_time: +updateTime,
                        visit_time: +new Date()
                    }
                })
                this._SetLastProjectUpdateTime(null)
            }
        })

        eventbus.$on('guide6Init', debounce(() => {
            this.showGuide(6, 'guideClass6')
        }, 20))
    },

    methods: {
        ...mapMutations(['setIsFromAppend', 'clearExportTask']),
        ...mapMutations('thumbnail', ['_SetActiveThumbnail']),
        ...mapMutations('project', ['_ClearProjectData', '_SetLastProjectUpdateTime', '_UpdateProject']),
        ...mapMutations('config', ['_SetIsShowNoviceGuide','SetCanShowManualImportButton']),

        ...mapActions(['ExitLogin']),
        ...mapActions('project', ['ACT_UpdateProject']),
		onManualImportClick: debounce(async function () {
			const config = LocalConfigModel.getInstance().exhibitionConfig
			if (!await fs.existsSync(config.importPath)){
				this.tsNotify('导入的路径不存在，请重新设置')
				return
			}
			this.getEventBus().$emit("onManualImportClick",[config.importPath])
		}, 500),
        onShowVipPriceDialogClick: debounce(function () {
            this.PointMemberPriceClick()
            ipcRenderer.send('open-member-plan-window', null)

        }, 500),

        logout: debounce(function () {
            this.ExitLogin()
            this.clearExportTask()
            this.$router.replace({ name: 'Login' })
            this.$tsStat?.logout()
        }, 200),
        onAddFileVisible(visible){
            let filter = new QtEventFilter()
            filter.process([QtEventFilterType.Mouse],!visible)
        },
        async getUserInfo() {
            if (['photoFinishing'].includes(this.routeName)) {
                this.$tsStat?.event('cake_avatar', {
                    cake_operate: `init_refine_${this.isVip === 1 ? 'member' : 'non_member'}`
                })
            } else if (['exportList'].includes(this.routeName)) {
                this.$tsStat?.event('cake_avatar', {
                    cake_operate: `init_export_list_${this.isVip === 1 ? 'member' : 'non_member'}`
                })
            } else {
                this.$tsStat?.event('cake_avatar', {
                    cake_operate: `init_gallery_${this.isVip === 1 ? 'member' : 'non_member'}`
                })
            }
        },


        getEventBus() {
            return eventbus
        },

        onClickHome() {
            if (['photoFinishing'].includes(this.routeName)) {
                this.$tsStat?.event('cake_refine', {
                    cake_operate: 'click_home'
                })

            } else {
                this.$tsStat?.event('cake_gallery', {
                    cake_operate: 'click_home'
                })
            }
            eventbus.$emit('onBackToHome')
            this.$router.push({ name: 'index' })
            let updateTime = this.lastProjectUpdateTime
            if (updateTime) {
                this.ACT_UpdateProject({
                    id: this.activeProjectId,
                    modify: {
                        update_time: +updateTime,
                        visit_time: +new Date()
                    }
                })
                this._SetLastProjectUpdateTime(null)
            }
        },

        onCommand(event) {
            console.log(`onCommand dropdown`, event)
            let argsMap = {
                'onImportFile': ['openFile'],
                'onImportDir': ['openDirectory'],
                'onImportFileAndDir': ['openFile', 'openDirectory']
            }
            this.getEventBus().$emit('onNavImportImage', argsMap[event])
        },

        showRawTips: throttle(function () {
            const message = 'RAW调色功能开发中，敬请期待哦~'
            this.tsNotify({
                type: 'info',
                message
            })
        }, 300, {
            leading: true
        }),

        showFunc(item) {
            switch (item.routeName) {
                case 'batchRetouch':
                case 'photoFinishing': {
                    // let thumbs = this.$store.state.thumbnail.thumbnails;
                    // return thumbs != null && thumbs.length > 0
                    return true
                }
                default:
                    return true
            }
        },

        onRouterPush: debounce(async function (name, routeParam) {
            if (name === this.routeName) {
                return false
            }
            // let isBatchPage = this.routeName == 'batchRetouch'
            // if (this.routeName === name && !isBatchPage) return
            // if (isBatchPage && routeParam && this.routeParam.activeMode == routeParam.activeMode) {
            //     return
            // }
            if (name === 'photoFinishing') {
                this.routerPushPhotoFinishing()
            } else {
                if (this.getIconDisabled) {
                    return
                }
                // if (routeParam) {
                //     this.$router.push({ name, query: { index: this.$route.query.index, ...routeParam } })
                //     this.$tsStat?.event(routeParam.activeMode==0?'color_tab':'beauty_tab',{
                //         cake_position:'batch_beauty',
                //     })
                // } else {
                //     this.$router.push({ name, query: { index: this.$route.query.index } })
                // }
                this.$router.push({ name, query: { index: this.$route.query.index } })
            }
        }, 300),


        /**
         * 跳转到精修界面
         */
        routerPushPhotoFinishing() {

            let queue = TSImageIOManager.shareInstance().imageViewModelQueue
            if (queue == null || queue.size === 0) {
                this.$router.push({
                    path: 'photoFinishing',
                    query: {}
                })
                return
            }
            let arrayObj = Array.from(queue)
            arrayObj = arrayObj.sort(function (a, b) {
                return a[1].imgIndex - b[1].imgIndex
            })
            let thumbIt = null
            for (const queueElement of arrayObj) {
                if (queueElement[1].isImportantSelected) {
                    thumbIt = queueElement[1]
                    break
                }
            }
            if (thumbIt == null) {
                thumbIt = arrayObj[0][1]
            }

            let thumbData = new ThumbnailModel()
            thumbData.userId = this.$store.state.user.userId
            thumbData.projectId = this.activeProjectId
            thumbData.originalImagePath = thumbIt.imgPath

            this._SetActiveThumbnail({
                imgPath: thumbIt.imgPath,
                imgIndex: thumbIt.imgIndex
            })

            this.$router.push({
                path: 'photoFinishing',
                query: {}
            })
        },

        onDownloadIconClick() {
            this.guideQuit('guideClass6')
            // 新手引导-最后一步结束后关闭引导
            this._SetIsShowNoviceGuide(false)

            let sender = ''
            if (['photoFinishing'].includes(this.routeName)){
                sender = 'refine'
            }else{
                sender = 'gallery'
            }

            const goNext = () => this.readyExport(sender)

            // this.$root.checkDiskSpaceIfNeed(() => {
            goNext()
            // }).then(isNoSpace => {
            //     if (!isNoSpace) {
            //         goNext()
            //     }
            // })
        },

        onAddFileClick() {
            this.setIsFromAppend(true)
            this.$router.push({
                path: 'importImage',
                params: null
            })
        },

        exportlistBack() {
            if (!['photoFinishing'].includes(this.routeName)) {
                this.$tsStat?.event('cake_export_list', {
                    cake_operate: 'return'
                })
            } else {
                // this.$tsStat?.event('cake_refine',{
                //     cake_operate:'return',
                // })
            }
            this.$router.go(-1)
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    position: relative;
    width: 100%;
    height: 48px !important;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-bottom-width: 1px;
    border-style: solid;

    .left-func-container {
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 14px;
        flex: 1;
        position: relative;
        padding-left: 16px;;

        .return-home-btn {
            position: relative;
            left: 0;
            top: 0;
            display: flex;
            padding: 5px;
            align-items: center;
            opacity: .8;
            justify-content: center;
            border-radius: 4px;
            background: #4d4d4d;
            cursor: default;
            font-size: 13px;

            &.el-button:hover, &.el-button:focus {
                background: #4d4d4d;
                opacity: 1;
                color: #fff;
            }

            .return-icon {
                width: 16px;
                height: 16px;
                font-size: 16px;
                vertical-align: text-top;

                img {
                    width: 16px;
                    height: 16px;
                }
            }

            .label {
                margin: 0 4px 0 0px;
            }
        }

        .addFileWrapCla {
            margin-left: 20px;

            .addFileCla {
                background: #4d4d4d;
                padding: 7px 10px;
                border-radius: 4px;
                //cursor: default;
                opacity: .8;

                &.el-button:hover, &.el-button:focus {
                    background: #4d4d4d;
                    opacity: 1;
                    color: #fff;
                }
            }
        }
    }

    .menu {
        flex: 1;
        position: relative;

        .claGift {
            width: 20px;
            height: 20px;
            object-fit: fill;
            margin-right: 8px;
            margin-left: 6px;

            :hover {
                opacity: 0.6;
            }
        }

        .item {
            width: 75px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0.8;

            img {
                width: 20px;
            }

            .bottom-line {
                visibility: hidden;
            }

            &.active {
                opacity: 1;

                .bottom-line {
                    position: absolute;
                    bottom: 0;
                    width: 48px;
                    border-bottom: 2px;
                    border-style: solid;
                    border-color: rgba(255, 255, 255, 0.8);
                    visibility: visible;
                }
            }

            &:not(.disabled):hover {
                opacity: 1;
            }

            //.item-export {
            //    width: 75px;
            //    height: 20px;
            //    display: block;
            //    position: relative;
            //    text-align: center;
            //    //img{
            //    //    position: absolute;
            //    //    top: 0;
            //    //    left: calc(50% - 10px);
            //    //    z-index: 1;
            //    //}
            //
            //    .export-task-num {
            //        position: absolute;
            //        top: 10px;
            //        right: 5px;
            //        min-width: 8px;
            //        padding: 0px 2px;
            //        font-weight: normal;
            //        font-size: 9px;
            //        color: black;
            //        text-align: center;
            //        text-shadow: 0 1px rgba(0, 0, 0, 0.2);
            //        background: #F5D228;
            //        border: 1px solid #F5D228;
            //        border-radius: 6px;
            //        z-index: 2;
            //    }
            //}

            .setting-icon {
                margin-top: 3px;
                width: 20px;
                height: 20px;
                opacity: 0.8;

                &:hover {
                    opacity: 1;
                }
            }
        }
    }

    .center-func-container {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &.menu {
            .item {
                // width: 82px;
                // height: 28px;
                // opacity: 0.4;
                // background: #454545;
                position: relative;
                width: 40px;
                color: rgba(255, 255, 255, 0.45);
                margin: 0 16px;

                &.active {
                    color: #FFFFFF;

                    &::after {
                        border-bottom: 2px solid #EECC28;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        width: 100%;
                        display: block;
                        content: ' ';
                    }
                }

                //&:not(.disabled):hover {
                //    opacity: 0.8;
                //
                //}

                .menu-title {
                    // margin-left: 1px;
                    font-size: 15px;
                }
            }

            :first-child {
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
            }

            :last-child {
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
            }
        }
    }

    .right-func-container {
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        padding-right: 20px;

        .debug-icon {
            width: 30px;
            height: 30px;
            margin-right: 20px;
            display: inline-block;
        }

		.claManualImportBtn{
			background: #f5d228 !important;
			border-radius: 16px;
			padding: 4px 8px;
			margin-right: 20px;
			max-height: 32px;
		}

        &.menu {

            .item {
                width: 34px;
                height: 36px;
                position: relative;

                .icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 5px;

                    .img {
                        pointer-events: none;
                        height: 16px;
                    }
                }

                .export-task-num {
                    position: absolute;
                    bottom: 6px;
                    right: 5px;
                    min-width: 8px;
                    padding: 0px 2px;
                    font-weight: normal;
                    font-size: 9px;
                    color: black;
                    text-align: center;
                    text-shadow: 0 1px rgba(0, 0, 0, 0.2);
                    background: #F5D228;
                    border: 1px solid #F5D228;
                    border-radius: 6px;
                    z-index: 2;
                }

                &.download-btn {
                    width: 82px;
                    height: 28px;
                    margin-right: 10px;
                    background: #4d4d4d;
                    border-radius: 4px;
                    border-color: #4d4d4d;
                    opacity: 1.0;
                    color: #ffffff;
                    font-size: 12px;
                    line-height: 28px;

                    img {
                        width: 12px;
                        vertical-align: middle;
                    }
                }

                &.active {
                    background: #F5D228;
                    border-color: #F5D228;
                    color: #2f2f2f;
                }


            }

            /deep/ .el-button--small, {
                background: none;
                border: none;
            }

            ///deep/.el-button--small:hover,{
            //    background: none;
            //    border: none;
            //}

            .vip-plan {
                position: relative;
                background: #28282A;
                border-radius: 4px;
                height: 27px;
                width: 70px;
                border: solid 0px #F5D228;
                padding: 7px 10px;
                box-sizing: border-box;

                &::after {
                    position: absolute;
                    right: 0;
                    bottom: 0;
                    display: inline-block;
                    content: ' ';
                    border-width: 1px;
                    border-style: solid;
                    border-radius: 8px;
                    border-color: inherit;
                    transform: scale(.5);
                    left: -50%;
                    top: -50%;
                    width: 200%;
                    height: 200%;
                }

                .vip-text {
                    color: #F5D228;
                    margin-top: 2px;
                }

                /deep/ .el-button--small:hover, {
                    background: none;
                    border: none;
                }

            }
        }

        .more {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .avatar-box {
            width: 34px;
            height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;

            &-vipIcon {
                position: absolute;
                width: 14px;
                right: 1px;
                bottom: 14px;
            }

            .avatar-vip {
                width: 20px;
                height: 20px;
                margin-top: -2px;
                background-color: #28282A;
            }

            .avatar {
                width: 20px;
                height: 20px;
                background-color: #28282A;
            }

            /deep/ .el-button--small, {
                background: none;
                border: none;
            }
        }

        .avatar-box /deep/ .el-button--small:hover,
        .disabled /deep/ .el-button--small:hover, {
            background: none;
            border: none;
        }
    }

}
</style>
