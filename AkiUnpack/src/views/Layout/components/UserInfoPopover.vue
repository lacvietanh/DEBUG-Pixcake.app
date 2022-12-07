<template>
    <div class="user-info-container">
        <el-popover
            content=" "
            width="190"
            trigger="click"
            placement="bottom"
            class="user-info-container"
            transition="el-zoom-in-bottom"
            popper-class="is-dark user-operation-popover"
            :visible-arrow="false"
            @show="onPopoverShow">
            <div class="user" slot="reference">
                <slot></slot>
            </div>

            <div class="user-info">
                <div class="label" style="font-weight:600">
                    <span>{{ isVip ? con.vip : con.notVip }}</span>

                    <template v-if="isVip">
                        <img v-if="user.leftNum" :src="$getIconPath('pop_icon_member@3x.png')" alt=""
                             style="width:16px;vertical-align:middle;margin-left:4px;margin-top:-4px">
                        <img v-else :src="$getIconPath('pop_icon_non_members@3x.png')" alt=""
                             style="width:16px;vertical-align:middle;margin-left:4px;margin-top:-4px">
                    </template>
                </div>

                <p class="label" v-if="user.tel">
                    <img :src="$getIconPath('pop_icon_account_number@3x.png')" alt=""
                         style="width:12px;vertical-align:middle;margin-right:4px;margin-top:-4px">
                    <span>{{ user.tel }}</span>
                </p>

                <p class="label">
                    剩余可用/总张数：
                </p>
                <p class="label" style="line-height:1.8">
                    <span style="font-size:18px;font-weight: 500;color: #FFFFFF;">{{
                            user.leftNum
                        }}</span>/{{ user.totalNum }}
                </p>

                <ul class="btnlist">
<!--                    <el-divider class="divider"></el-divider>-->

                    <!-- <el-divider class="divider"></el-divider>
                    <li class="global__custom-menu-item" >
                      客户下载列表
                    </li> -->

                    <!--                    <el-divider class="divider"></el-divider>-->
<!--                    <li class="global__custom-menu-item" @click="onOpenMyPackageWindow">-->
<!--                        我的套餐-->
<!--                    </li>-->

                    <template v-if="userMenus">
                        <template v-for="(item, i) in userMenus">
							<template v-if="item.show">
								<template v-if="IS_CLIENT_PixCake_EXPO">
									<template v-if="item.name !='我的套餐'">
										<el-divider :key="`user_menu_divider_${i}`" class="divider"></el-divider>
										<li
											:key="`user_menu_${i}`"
											class="global__custom-menu-item"
											@click="onOpenUserMenuWindow(item)">
											{{ item.name }}
										</li>
									</template>
								</template>
								<template v-else>
									<el-divider :key="`user_menu_divider_${i}`" class="divider"></el-divider>
									<li
										:key="`user_menu_${i}`"
										class="global__custom-menu-item"
										@click="onOpenUserMenuWindow(item)">
										{{ item.name}}
									</li>
								</template>
							</template>
                        </template>
                    </template>

                    <template v-if="!IS_CLIENT_PixCake_EXPO && orgBackendInfo && orgBackendInfo.is_show">
                        <el-divider class="divider"></el-divider>
                        <li
                            v-gtag-event="PointClickBackstage"
                            class="global__custom-menu-item" @click="onOpenBusinessAdminExternalLink">
                            管理后台
                        </li>
                    </template>

                    <el-divider class="divider"></el-divider>

                    <li class="global__custom-menu-item" @click="onAboutUsClick">
                        关于我们
                    </li>

                    <el-divider class="divider"></el-divider>

                    <li
                        class="global__custom-menu-item"
                        @click="handleLogout">
                        退出登录
                    </li>
                </ul>
            </div>
        </el-popover>

        <AboutUsDialog v-model="showAboutUsDialog"/>
        <PaySuccessDialog v-model="showPaySuccess"/>
    </div>
</template>

<script>
import Vue, { defineComponent, computed } from 'vue'
import store from '@/store'
import { mapGetters } from 'vuex'

import ipcRenderer from '@/qt-ipc/Ipc-renderer'
import pointsMixin from '@/mixins/pointsMixin'
import useUserPointsRepositories from '@/composables/points/useUserPointsRepositories'

import { debounce } from 'lodash'
import {CLIENT_NAME_EN, IS_CLIENT_PIX_PIE, IS_CLIENT_PixCake_EXPO} from '#/types/config'
import { ShareObjectModel } from '#/model/ShareObjectModel/ShareObjectModel'

import { Popover, Divider } from 'element-ui'
import AboutUsDialog from '@/views/Layout/components/about/AboutUsDialog'
import PaySuccessDialog from '@/views/Layout/components/PaySuccessDialog'

export default defineComponent({
    components: {
        'el-popover': Popover,
        'el-divider': Divider,
        PaySuccessDialog,
        AboutUsDialog
    },
    mixins: [
        pointsMixin
    ],
    props: {
        avatar: String
    },

    setup(props, { emit }) {
        const { PointUserMenuClick, PointLogout, PointContentUs } = useUserPointsRepositories()

        const user = computed(() => store.getters.user)

        const onPopoverShow = async () => {
            await store.dispatch('loadVipInfo')
            store.dispatch('initMenuList')
            emit('show', user.value)
        }

        return {
            PointUserMenuClick,
            PointLogout,
            PointContentUs,
            onPopoverShow
        }
    },

    data() {
        return {
            IS_CLIENT_PixCake_EXPO,
            showAboutUsDialog: false,
            showPaySuccess: false,
            con: {
                vip: `尊敬的${IS_CLIENT_PIX_PIE ? '' : CLIENT_NAME_EN}会员`,
                notVip: `尊敬的${IS_CLIENT_PIX_PIE ? '' : CLIENT_NAME_EN}用户`
            },
            orgBackendInfo: null
        }
    },

    computed: {
        ...mapGetters([
            'tel',
            'isVip',
            'user',
            'userMenus'
        ]),

        showPayButton() {
            return !this.isVip && !IS_CLIENT_PIX_PIE
        }
    },
    methods: {
        onAboutUsClick() {
            this.showAboutUsDialog = true
            this.PointContentUs(this.isVip)
        },

        onOpenMyPackageWindow() {
            ipcRenderer.send('open-myPackage-window', null)
        },

        onPayVipClick() {
            this.PointMemberPriceClick('join_membership')
            ipcRenderer.send('open-member-plan-window', null)
        },

        handleLogout() {
            this.PointLogout(this.isVip)
            this.$emit('logout')
        },

        onPaySuccess() {
            this.showPaySuccess = true
        },

        onOpenBusinessAdminExternalLink() {
            ipcRenderer.send('open-external-link', {
                href: this.orgBackendInfo?.access_url
            })
        },

        onOpenUserMenuWindow: debounce(function (menuModel) {
            if (!menuModel.url) {
                this.tsNotify('页面不存在，请检查后再试')
                return
            }

            menuModel.openLink()
            this.PointUserMenuClick(menuModel.key)
        }, 300)
    },

    async mounted() {
        const user = await ShareObjectModel.instance().getUser()
        this.orgBackendInfo = user.orgBackendInfo
    }
})
</script>

<style lang="scss" scoped>
.user-info {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    color: #D9D9D9;
    // padding: 24px 0 0;
    padding-left: 8px;

    .btnlist {
        width: 100%;

        .global__custom-menu-item {
            text-align: start;
            margin-top: -7px;
            margin-bottom: -7px;
            font-size: 12px;
            font-weight: normal;
        }
    }

    .avatar-box, .name {
        margin-bottom: 7px;
    }

    .name {
        font-weight: 400;
        font-size: 12px;
    }

    .count {
        font-size: 12px;
    }

    .count-low {
        color: #F1453E;
    }

    .label {
        font-size: 12px;
        line-height: 2.5;
        letter-spacing: 0;
        color: rgba(255, 255, 255, 0.85);
        font-weight: normal;
    }

    .divider {
        width: 214px;
        margin: 10px -20px;
        background-color: #333333;
    }
}
</style>
