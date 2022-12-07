<template>
    <div class="updateDownContainer">
        <div class="updateDownContainer-title">
            <span>{{ updateContent.title }}</span>
            <div class="close" @click="onClose">
                <div class="before"></div>
                <div class="after"></div>
            </div>
        </div>

        <div class="updateDownContainer-center">

            <div class="center-words">
                <div class="center-words-title">{{ updateContent.subtitle }}</div>
                <ul class="center-words-info">
                    <template v-for="(item, index) in updateContent.updateContent">
                        <li :key="index">{{ item }}</li>
                    </template>
                </ul>
            </div>

            <div class="center-line" v-if="updateContent.hint"></div>

            <div class="center-foot" v-if="updateContent.hint">
                <span class="icon"/>
                <span>{{ updateContent.hint }}</span>
            </div>

        </div>

        <div class="updateDownContainer-footer">
            <el-button size="mini" type="primary" @click="onSubmit" class="updateBtn">立即更新</el-button>
            <el-button size="mini" @click="onClose" v-if="!isForceUpdate" class="updateWait">稍后更新</el-button>
        </div>

    </div>
</template>

<script>

import { Button } from 'element-ui'
import pointsMixin from '@/mixins/pointsMixin'
import { checkServerUpdater } from '@/api/commonApi'

export default {
    components: {
        'el-button': Button
    },
    mixins: [pointsMixin],
    props: {},
    data() {
        return {
            updateContent:{
                title: '',
                subtitle: '',
                updateContent: [],
                hint: '',
                version:'',
            },
            isForceUpdate: false, //是否强制更新
            isSafetyExit: false
        }
    },

    watch: {},
    mounted() {
        const ipcRenderer = window.$ipcRenderer
        //获取更新信息
        ipcRenderer.on('update-content-data',(event, args) => {
            console.log('update-content-data',args)
            let content = JSON.parse(args.release_note)
            this.updateContent.title = content.title
            this.updateContent.subtitle = content.subtitle
            this.updateContent.updateContent = content.updateContent
            this.updateContent.hint = content.hint
            this.updateContent.version = args.version

            this.isForceUpdate = args.is_force_update !== 0
        })
    },
    methods: {
        async onSubmit() {
            const ipcRenderer = window.$ipcRenderer
            ipcRenderer.send('update-button-submit', null)
            // this.$router.push('/updateProgress')
            this.$router.push({path: '/updateProgress', query: {version: this.updateContent.version}})

        },

        // 关闭操作
        onClose() {
            const ipcRenderer = window.$ipcRenderer
            // ipcRenderer.send('update-button-close', null)
            // 安全退出
            // this.isSafetyExit = true
            if (this.isForceUpdate) { //是否强制更新
                this.rejectInstall()
            } else {
                this.cancelUpdate()
            }
        },

        // 强制更新，拒绝更新
        rejectInstall() {
            const ipcRenderer = window.$ipcRenderer
            ipcRenderer.send('app-exit')
        },

        // 不强制更新，稍后更新
        cancelUpdate() {
            const ipcRenderer = window.$ipcRenderer
            ipcRenderer.send('app-update-later')
        },
    }
}
</script>

<style lang="scss" scoped>
.updateDownContainer {
    width: 100%;
    background: #232324;
	border-radius: 12px;

    .updateDownContainer-title {
        -webkit-app-region: drag;
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 49px;
        font-size: 16px;
        font-family: PingFangSC-Medium, serif;
        color: #D9D9D9;
        font-weight: 500;
        position: relative;
        border-bottom: 1px solid #333333;

        .close {
            -webkit-app-region: no-drag;
            position: absolute;
            width: 15px;
            height: 15px;
            top: 32%;
            right: 2%;

            .before,
            .after {
                content: "";
                position: absolute;
                height: 100%;
                width: 1px;
                top: 2px;
                right: 9px;
                background: #A6A6A6;
            }

            .before {
                transform: rotate(45deg);
            }

            .after {
                transform: rotate(-45deg);
            }
        }

        .close:hover {
            .before,
            .after {
                background: #EECC28;
            }
        }
    }

    .updateDownContainer-center {
        width: 301px;
        margin-left: auto;
        margin-right: auto;
        color: #D9D9D9;
        position: relative;
        text-align: left;
        border-radius: 12px;

        .center-words {
            font: bold 14px PingFangSC-Regular;

            .center-words-title {
                height: 24px;
                opacity: 0.99;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #D9D9D9;
                line-height: 24px;
                font-weight: 400;
                margin-top: 16px;
            }

            .center-words-info{
                height: 84px;
                margin-top: 12px;
                margin-bottom: 12px;
                overflow-y: auto;
            }

            .center-words-info li {
                line-height: 28px;
            }
        }

        .center-line {
            width: 100%;
            height: 1px;
            background-color: #333333;
        }

        .center-foot {
            width: 301px;
            height: 72px;
            margin-top: 12px;
            margin-bottom: 16px;
            overflow-y: auto;
            font-family: PingFangSC-Regular, serif;
            font-size: 12px;
            color: #D9D9D9;
            line-height: 24px;
            font-weight: 400;
            text-indent: 1.5em; //首行缩进2个字符
            position: relative;

            .icon {
                position: absolute;
                top: 5px;
                left: 0;
                display: inline-block;
                width: 15px;
                height: 15px;
                background-image: url("../../assets/icons/dark/pop_set_up_icon_sigh@2x.png");
                background-size: 100%, 100%;
                background-repeat: no-repeat;
                background-position: center;
            }
        }

        /*滚动条整体样式*/
        ::-webkit-scrollbar {
            /*高宽分别对应横竖滚动条的尺寸*/
            width: 6px;
        }

        /*滚动条里面滑块*/
        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: #111112;
        }

        //上箭头
        ::-webkit-scrollbar-button:vertical:single-button:start {
            display: none;
        }

        // 下箭头
        ::-webkit-scrollbar-button:vertical:single-button:end {
            display: none;
        }

    }

    .updateDownContainer-footer {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        width: 100%;
        height: 52px;
        border-top: 1px solid #333333;
        border-radius: 12px;

        .updateWait {
            margin-right: 10px;
            width: 88px;
            height: 28px;
            flex-shrink: 1;
            background: #3C3939;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
            border-radius: 4px;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            font-weight: 400;
        }

        .updateWait:hover {
            color: #EECC28;
        }

        .updateBtn {
            margin-right: 10px;
            width: 88px;
            height: 28px;
            flex-shrink: 1;
            border: none;
            background: #3073FF;
            box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
            border-radius: 4px;
            font-size: 14px;
            color: #FFFFFF;
            text-align: center;
            font-weight: 400;
        }

        .updateBtn:hover {
            opacity: 0.6;
        }
    }
}

</style>
