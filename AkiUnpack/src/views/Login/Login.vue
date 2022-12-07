<template>
    <el-container class="login">
        <el-main class="content">
            <div class="login_input_parent">
                <div class="login_input_box">

                    <template v-if="$IS_CLIENT_PIX_PIE">
                        <span class="title c-text-regular">账号密码登录</span>
                    </template>

                    <template v-else>
                        <span class="title c-text-regular">手机验证码登录</span>
                        <span class="label c-text-label">新用户登录后可自动创建账号</span>
                    </template>

                    <template v-if="$isDev || $isBeta">
                        <el-input
                            size="larger"
                            type="textarea"
                            class="tel-num token"
                            placeholder="输入Token"
                            v-model.trim="token"
                            @blur="tokenLogin"
                            @keydown.enter.native="tokenLogin">
                        </el-input>
                    </template>

                    <el-input
                        type="tel"
                        size="larger"
                        class="tel-num"
                        :maxlength="32"
                        :placeholder="$IS_CLIENT_PIX_PIE ? '输入账号' : '输入手机号'"
                        @blur="gaPhoneInput"
                        v-model.trim="telNum">
                    </el-input>

                    <div class="verify-code" v-if="!$IS_CLIENT_PIX_PIE">
                        <el-input
                            type="tel"
                            size="larger"
                            ref="verifyCode"
                            class="verify-code-input"
                            placeholder="输入短信中的验证码"
                            :maxlength="64"
                            v-model.trim="verifyCode"
                            @blur="gaCodeInput"
                            @keydown.enter.native="login">

                            <template slot="suffix">
                                <el-button
                                    type="text"
                                    size="larger"
                                    class="verify-time-btn"
                                    :disabled="verifyDisabled"
                                    @click="getVatifyCode">
                                    <span class="verify-tip">{{ text }}</span>
                                </el-button>
                            </template>
                        </el-input>
                    </div>
                    <div v-else class="verify-code">
                        <el-input
                            show-password
                            type="tel"
                            size="larger"
                            ref="verifyCode"
                            placeholder="输入密码"
                            class="verify-code-input pwd"
                            :maxlength="64"
                            v-model.trim="verifyCode"
                            @blur="gaCodeInput"
                            @keydown.enter.native="login">
                        </el-input>
                    </div>

                    <el-button
                        size="larger"
                        type="primary"
                        class="login-btn"
                        :loading="loginLoading"
                        :disabled="LoginDisabled"
                        @click="login">
                        <span class="text">登录</span>
                    </el-button>
                </div>

                <div class="agreement" v-if="!$IS_CLIENT_PIX_PIE">
                    <el-tooltip
                        manual
                        class="item"
                        effect="dark"
                        placement="top"
                        content="请阅读并勾选下方的协议"
                        v-model="showProtocolTooltip"
                    >
                        <el-checkbox v-model="isAgreeProtocol" @change="onAgreeProtocol"/>
                    </el-tooltip>

                    <span class="c-text-label agreement-text">
                        <span>已仔细阅读并同意{{ CLIENT_NAME }}
                            <el-link
                                class="link"
                                @click="checkProtocol(userProtocol)">
                                《{{ userProtocolName || '商家使用协议' }}》
                            </el-link>
                        </span>
                    </span>

                    <div :style="{ textAlign: 'left', paddingLeft:'14px' }">
                        <el-link
                            class="link"
                            @click="checkProtocol(privacyProtocol)">
                            《{{ privacyProtocolName || '隐私政策' }}》
                        </el-link>
                    </div>
                </div>

            </div>
        </el-main>
    </el-container>
</template>
<script>
import { defineComponent } from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

import { setToken } from '@/utils/auth'
import { postVertifyCode, postLogin } from '@/api/userApi'

import { CLIENT_NAME, IS_CLIENT_PIX_PIE } from '@/universal/types/config'
import UserInfo from '@/model/UserModel'
import UserModel from '#/model/UserModel'
import { ShareObjectModel } from '@/universal/model/ShareObjectModel/ShareObjectModel'

import toast from '@/mixins/toast'

import { IpcRendererAsync } from '@/utils/ipcRenderAsync'
import { IpcRendererTopic } from 'qt/constants/common'

import { Button, Container, Main, Link, Tooltip, Checkbox } from 'element-ui'
import useUserPointsRepositories from '@/composables/points/useUserPointsRepositories'

let timer = null
export default defineComponent({
    name: 'LoginPage',
    mixins: [toast],

    components: {
        'el-button': Button,
        'el-container': Container,
        'el-main': Main,
        'el-link': Link,
        'el-tooltip': Tooltip,
        'el-checkbox': Checkbox
    },

    setup() {
        const { PointLogin } = useUserPointsRepositories()

        return {
            PointLogin
        }
    },

    data() {
        return {
            CLIENT_NAME,
            verifyCode: '',
            telNum: '',
            num: 60,
            text: '获取验证码',
            isActive: true,
            token: '',
            isAgreeProtocol: false,
            showProtocolTooltip: false,
            loginLoading: false
        }
    },

    computed: {
        ...mapGetters([
            'userId', 'userProtocol', 'userProtocolName', 'privacyProtocol', 'privacyProtocolName'
        ]),
        LoginDisabled() {
            return !this.telNum || !this.verifyCode
        },

        verifyDisabled() {
            return this.telNum.trim().length !== 11 || this.num !== 60
        }
    },

    async created() {
        if (!this.$IS_CLIENT_PIX_PIE) {
            this.fetchUserProtocol()
        }
    },

    methods: {
        ...mapMutations(['initUser']),
        ...mapActions(['TokenLogin', 'fetchUserProtocol']),
        async getVatifyCode() {

            if (!/1[3-9]{1}[0-9]{9}/.test(this.telNum)) {
                this.tsNotify({
                    message: '请先输入正确的手机号!',
                    type: 'warning'
                })
                return
            }

            if (timer != null) return


            try {
                this.PointLogin('get_verification_code')

                const res = await postVertifyCode(this.telNum)

                if (res) {
                    //倒计时
                    if (timer == null) {
                        timer = setInterval(() => {
                            this.num -= 1
                            this.text = `${this.num}s后可获取`
                            if (this.num <= 0) {
                                this.num = 60
                                this.text = '重新获取'
                                clearInterval(timer)
                                timer = null
                            }
                        }, 1000)
                    }

                    this.tsNotify({
                        message: '手机验证码发送成功',
                        type: 'success'
                    })
                    this.$refs.verifyCode.focus()
                }
            } catch (err) {
                const message = err && err.data && err.data.code
                    ? err.message
                    : '请检查网络环境或者代理设置'
                this.tsNotify({
                    type: 'error',
                    message
                })
            }
        },

        checkProtocol(url) {
            this.PointLogin('click_agreement')

            if (!url) {
                this.tsNotify({
                    message: '协议不存在，请联系客服获取协议!',
                    type: 'error'
                })

                return
            }
            this.$openExternal(url)
        },

        async login() {
            // if (!/1[3-9]{1}[0-9]{9}/.test(this.telNum)) {
            //     this.tsNotify({
            //         message: !IS_CLIENT_PIX_PIE? '请先输入正确的手机号!':'请输入正确的账号!',
            //         type: 'error'
            //     })
            //     return
            // }
            //
            // if (!/\d{6}/.test(this.verifyCode)) {
            //     this.tsNotify({
            //         message: !IS_CLIENT_PIX_PIE ?'请先输入正确的验证码!':'请输入正确的密码!',
            //         type: 'error'
            //     })
            //     return
            // }

            try {
                if (!this.isAgreeProtocol && !IS_CLIENT_PIX_PIE) {
                    this.showProtocolTooltip = true
                    return
                }

                if (this.loginLoading) {
                    return
                }

                this.loginLoading = true
                this.PointLogin('click_login_button')

                let muuid = ''
                try {
                    muuid = await ShareObjectModel.instance().getSystemUUID()
                } catch (e) {
                }

                const osInfo = await ShareObjectModel.instance().systemInfo
                let asyncRender = new IpcRendererAsync()
                let hardwareInfo = await asyncRender.on(IpcRendererTopic.FetchHardWareInfo, {})
				const host_name = hardwareInfo.info.host_name || ""
				const user_name = hardwareInfo.info.user_name || ""
                const res = await postLogin({
                    phone: this.telNum,
                    verifyCode: this.verifyCode,
                    setupFileName: osInfo.setup_file_name,
                    muuid: muuid,
                    minfo: osInfo,
					host_name:host_name.length == 0? "	":host_name,
					user_name:user_name.length == 0? "	":user_name
                })
                const data = res.data
                await setToken(data.token)
                let userInfo = new UserInfo(data.user_id, data.token, this.telNum, data.oid)
                await UserModel.getInstance().cacheUserInfo(userInfo)
                this.initUser(userInfo)
                await this.loginSuccess(data)
            } catch (e) {
                console.log('login : ', e)
                let erMsg = e.message
                if (IS_CLIENT_PIX_PIE && e.data && e.data.code == 6) {
                    erMsg = '请输入正确的密码!'
                }
                this.tsNotify({
                    message: erMsg,
                    type: 'error'
                })
            }
            this.$nextTick(() => {
                this.loginLoading = false
            })
        },

        async loginSuccess(data) {
            let userId = this.userId
            let oid = data.oid

            this.$tsStat?.login(userId, oid)

            await this.$router.replace({ name: 'index' })

            // 增加广播通知
            let token = data.token
            // let msg = new WinIPCMessage(WinType.Main, [WinType.MemberVipPlan], {
            //     token: token
            // })
            // let json = msg.toJson()
            // ipcRenderer.send(kBroadCastWinEventString(WinType.Main, 'login'), json)
        },

        gaPhoneInput() {
            this.PointLogin('input_phone_number')
            // this.$tsStat?.event('cake_login', {
            //     cake_operate: 'input_phone_number'
            // })
        },
        gaCodeInput() {
            this.PointLogin('enter_verification_code')
            //   this.$tsStat?.event('cake_login', {
            //       cake_operate: 'enter_verification_code'
            //   })
        },

        async tokenLogin() {
            if (!this.token.trim()) return
            try {
                const userInfo = await this.TokenLogin(this.token)
                console.log('==> tokenLogin: ', userInfo)
                await this.loginSuccess(userInfo)
            } catch (e) {
                this.token = ''
            }
        },

        onAgreeProtocol(v) {
            if (v && this.showProtocolTooltip) {
                this.showProtocolTooltip = false
            }
        }

    }
})
</script>
<style lang="scss" scoped>
.login {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url('../../assets/logo/login_bg.jpg');

    .content {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .bg {
            width: 480px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .login_input_parent {
            width: 280px;

            .login_input_box {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin-bottom: 30px;

                /deep/ {
                    .el-input__inner {
                        background: transparent;
                        border: 1px solid #a1a1a1;
                        border-radius: 8px;
                    }

                    .el-input__inner:hover {
                        border: 1px solid #b5b5b5;
                    }

                    .el-input__inner:focus {
                        border: 1px solid #f5d228;
                    }

                    .el-textarea__inner {
                        background: transparent;
                        border: 1px solid #a1a1a1;
                        border-radius: 8px;
                    }

                    .el-textarea__inner:hover {
                        border: 1px solid #b5b5b5;
                    }

                    .el-textarea__inner:focus {
                        border: 1px solid #f5d228;
                    }
                }

                .title {
                    font-size: 24px;
                    line-height: 33px;
                    font-weight: 600;
                }

                .label {
                    height: 17px;
                    font-size: 12px;
                    font-weight: 400;
                    margin-top: 4px;
                }

                .tel-num {
                    margin-top: 32px;
                    width: 100%;
                    height: 40px;
                }

                .token {
                    height: auto;
                }

                .login-btn {
                    margin-top: 24px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 8px;
                    border-color: transparent;

                    .text {
                        font-size: 16px;
                    }
                }

                .verify-code {
                    margin-top: 16px;
                    display: flex;
                    flex-direction: row;

                    .verify-code-input {
                        flex: 1;
                        height: 40px;

                        &.pwd {
                            /deep/ .el-input__suffix {
                                display: none;
                            }
                        }
                    }

                    /deep/ .el-input {
                        border-width: 1px;

                        .el-input__inner, .el-input-group__append, .el-input-group__prepend {
                            background: transparent;
                        }

                        .el-input__suffix {

                            &::before {
                                content: ' ';
                                width: 1px;
                                height: 20px;
                                border-left: 1px solid #A6A6A6;
                            }

                            .verify-time-btn {
                                width: 100px;

                                .verify-tip {
                                    font-size: 14px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }

            .agreement {
                width: 100%;
                line-height: 1;

                /deep/ .el-checkbox {
                    height: 12px;
                    width: 12px;
                }

                /deep/ .el-checkbox__input.is-checked .el-checkbox__inner {
                    background-color: transparent;
                    border-color: #A6A6A6;
                }

                /deep/ .el-checkbox__inner {
                    height: 12px;
                    width: 12px;
                    border-color: #A6A6A6;
                    background-color: transparent;
                }

                /deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
                    border-color: #A6A6A6;
                }

                /deep/ .el-checkbox__inner::after {
                    border-color: #A6A6A6;
                    left: 3px;
                    top: 0;
                }

                /deep/ .el-checkbox__inner:hover {
                    border-color: #A6A6A6;

                }

                &-text {
                    font-size: 12px;
                    text-align: left;
                    margin-left: 8px;
                }

                .link {
                    font-size: 12px;
                    vertical-align: baseline;
                    color: #f5d228;
                    opacity: 0.85;
                }
            }

        }
    }
}
</style>
