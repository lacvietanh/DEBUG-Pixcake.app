<template>
    <div class="UpdateDownloadProgress">
        <div class="UpdateDownloadProgress-left">
            <img class="img" :src="LOGO_RELATIVE_PATH" alt="logo">
        </div>
        <div class="UpdateDownloadProgress-right">
            <p class="UpdateDownloadProgress-right-info">
                {{ contentMsg }}
            </p>
            <div class="UpdateDownloadProgress-right-progress">
                <el-progress
                    text-inside
                    :show-text="false"
                    :stroke-width="5"
                    :percentage="percentage"
                />
            </div>
        </div>

        <el-button
            size="mini"
            class="cancel-btn"
            @click="cancel">取消
        </el-button>
    </div>
</template>

<script>
import { bytesFormat, delay } from '#/utils/common'
import { Progress, Button } from 'element-ui'
import { CLIENT_NAME_EN } from '#/types/config'
import { LOGO_RELATIVE_PATH } from '@/constants/config'

export default {
    name: 'UpdateProgress',
    components: {
        'el-progress': Progress,
        'el-button': Button
    },
    props: {},
    data() {
        return {
            LOGO_RELATIVE_PATH,
            percentage: 0,
            bytesPerSecond: 0,
            versionUrl: '',
            updateVersion: null,
            processSpeed:"0B/s"
        }
    },
    computed: {
        downloaded() {
            return this.percentage >= 100
        },
        contentMsg() {
            const version = this.$route.query.version
            return this.downloaded ?
                `新版本 ${version} 下载完成，即将前往安装...` :
                `正在下载 ${CLIENT_NAME_EN} ${version} 版本，${this.processSpeed}...`
        }
    },
    watch: {},
    mounted() {
        const ipcRenderer = window.$ipcRenderer
        ipcRenderer.on('download-update-process', (event,args) =>{
            this.processSpeed = args.process_speed
            this.percentage = args.process_value
        })
        this.$nextTick(_ => {
            ipcRenderer.on('update-right-now', (event, args) => {
                this.percentage = 100
                delay(3000).then(() => {
                    event.sender.send('quit-and-install', args)
                })
            })

            ipcRenderer.on('app-download-progress', (event, args) => {
                console.log(args)
                this.updateNum(args)
            })

            const { version, download } = ipcRenderer.sendSync('update-info')

            if (version && Object.keys(version).length > 0) {
                this.updateVersion = version.version
            }

            if (download && Object.keys(download).length > 0) {
                this.updateNum(download)
            }
        })

    },
    methods: {
        updateNum(args) {
            this.percentage = Number(Number(args.percent).toFixed(2))
            this.bytesPerSecond = Number(args.bytesPerSecond)
        },

        cancel() {
            const ipcRenderer = window.$ipcRenderer
            ipcRenderer.send('update-download-cancel')
            //this.$router.push('/')
        }
    }
}
</script>
<style lang="scss" scoped>

.UpdateDownloadProgress {
    display: flex;
    height:100%;
    padding: 39px 24px 40px;
    align-items: center;
    box-sizing: border-box;
    background: #232324;
    border-radius: 12px;
    &-left {
        flex-shrink: 0;
        width: 66px;
        height: 66px;

        > .img {
            width: 100%;
            height: 100%;
        }
    }


    &-right {
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-left: 13px;

        &-progress {
            width: 100%;

            /deep/ {
                .el-progress-bar__outer {
                    background-color: #333333;

                    .el-progress-bar__inner {
                        background: rgba(255, 255, 255, 0.85);
                    }
                }
            }
        }

        &-info {
            white-space: nowrap;
            text-align: left;
            height: 24px;
            font-size: 14px;
            color: #D9D9D9;
            line-height: 24px;
            font-weight: 400;
        }
    }

    .cancel-btn {
        position: absolute;
        width: 60px;
        height: 24px;
        right: 24px;
        bottom: 11px;
        border-radius: 4px;
    }

    .el-button--mini{
        font-size: 14px;
        padding: 5px 15px;
    }
}
</style>
