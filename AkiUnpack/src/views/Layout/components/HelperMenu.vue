<template>
    <div class="more">
        <el-dropdown
            size="small"
            trigger="click"
            placement="bottom"
            @visible-change="onVisibleChange">

            <i class="ts-icon ts-icon-question" v-gtag-event="PointHelpIcon"></i>

            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                    v-gtag-event="PointCustomerService"
                    @click.native="onServiceClick">
                    人工客服
                </el-dropdown-item>

                <template v-if="helpMenus">
                    <template v-for="(item, i) in helpMenus">
                        <el-dropdown-item
                            v-if="item.show"
                            :key="`help_menu_${i}`"
                            @click.native="onClickHelpMenu(item)">
                            {{ item.name }}
                        </el-dropdown-item>
                    </template>
                </template>

<!--                <el-dropdown-item-->
<!--                    v-if="!$IS_CLIENT_PIX_PIE"-->
<!--                    v-gtag-event="PointTutorialGraphic"-->
<!--                    @click.native="onManualBookClick('pic')">-->
<!--                    新手教程-->
<!--                </el-dropdown-item>-->

<!--                <el-dropdown-item-->
<!--                    v-if="!$IS_CLIENT_PIX_PIE"-->
<!--                    v-gtag-event="PointTutorialVideo"-->
<!--                    @click.native="onManualBookClick('video')">-->
<!--                    视频教程-->
<!--                </el-dropdown-item>-->

<!--                <el-dropdown-item-->
<!--                    v-if="!$IS_CLIENT_PIX_PIE"-->
<!--                    v-gtag-event="PointHelpQuestion"-->
<!--                    @click.native="onOpenURL('常见问题','https://pixcakeai.com/help')">-->
<!--                    常见问题-->
<!--                </el-dropdown-item>-->

                <el-dropdown-item
                    v-gtag-event="PointHotKey"
                    @click.native="showHotKey = true">
                    快捷键
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <ServiceDialog v-model="showServiceDialog"/>
        <HotKeyDialog v-model="showHotKey"/>

    </div>
</template>


<script>

import { ref, computed, getCurrentInstance } from 'vue'
import store from '@/store'

import { debounce } from 'lodash'
import toast from '@/mixins/toast'
import useUserPointsRepositories from '@/composables/points/useUserPointsRepositories'

import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import { RemoteConfigModel } from '@/qt-ipc/share-object-model'

import ServiceDialog from './ServiceDialog'
import HotKeyDialog from './HotKeyDialog'

export default {
    mixins: [toast],
    name: 'SystemMenu',
    components: {
        ServiceDialog,
        HotKeyDialog
    },
    setup(props) {
        const that = getCurrentInstance().proxy
        const showServiceDialog = ref(false)
        const showHotKey = ref(false)

        function onServiceClick() {
            showServiceDialog.value = true
        }

        function onOpenURL(title, link) {
            ipcRenderer.send('open-external-link', {
                type: 'Question',
                title: title,
                href: link
            })
        }

        async function onManualBookClick(type = 'pic') {
            try {
                const remoteConfig = await RemoteConfigModel.getInstance()

                if (!remoteConfig.isValid) {
                    await remoteConfig.fetchConfig()
                }

                if (type === 'pic') {
                    if (!remoteConfig.guide.newTutorialUrl) {
                        this.tsNotify('获取链接失败，请稍后再试')
                        return
                    }

                    ipcRenderer.send('open-alink-blank', {
                        type: 'NewTutorial',
                        title: '新手教程',
                        href: remoteConfig.guide.newTutorialUrl
                    })
                } else if (type === 'video') {
                    if (!remoteConfig.guide.videoTutorialUrl) {
                        this.tsNotify('获取链接失败，请稍后再试')
                        return
                    }

                    ipcRenderer.send('open-external-link', {
                        title: '视频教程',
                        type: 'VideoTutorial',
                        href: remoteConfig.guide.videoTutorialUrl
                    })
                }
            } catch (e) {
                that.tsNotify('获取链接失败，请稍后再试')
            }
        }

        const { PointHelpMenuClick, PointHelpIcon, PointHotKey, PointCustomerService } = useUserPointsRepositories()
        const helpMenus = computed(() => store.getters.helpMenus)
        const onClickHelpMenu = debounce((model) => {
            if (!model.url) {
                that.tsNotify('页面不存在，请检查后再试')
                return
            }
            model.openLink()
            PointHelpMenuClick(model.key)
        }, 300)

        return {
            showServiceDialog,
            showHotKey,

            onServiceClick,
            onManualBookClick,
            onOpenURL,

            helpMenus,
            onClickHelpMenu,
            PointHelpIcon,
            PointHotKey,
            PointCustomerService,

            onVisibleChange: (val) => {
                if (val) {
                    store.dispatch('initMenuList', true)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.more {
    width: 34px;
    height: 56px;
    display: inline-block;

    /deep/ {
        .el-dropdown {
            width: 20px;
            height: 20px;
        }
    }

    .ts-icon-question {
        width: 20px;
        height: 20px;
        font-size: 18px;
        opacity: 0.8;
        padding: 0px 0px;


        &:hover {
            opacity: 1;
        }
    }
}

</style>
