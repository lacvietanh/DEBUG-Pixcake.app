<template>
    <div class="claActivity"
         v-loading="loadingStatus == 'loading'"
         element-loading-background="rgba(0, 0, 0, 0)"
    >
        <div class="claTitle">
        </div>
        <div v-if="loadingStatus == 'fail'" class="claFail">
            <div class="claFailContent">
                <img :src="require('@/assets/icons/pricing_icon_loading-failed@3x.png')" class="claImg"/>
                <div class="claMsg">网络连接失败，请检查网络连接~</div>
                <button @click="onRetryClick" class="claRetry">重试</button>
            </div>
        </div>
    </div>
</template>

<script>

// 注意此处是从外部注入进去的
const ipcRenderer = window.$ipcRenderer

export default {
    name: 'activity-local',
    data() {
        return {
            loadingStatus: 'loading' // 'loading','success','fail'
        }
    },
    methods: {
        onRetryClick() {
            this.loadingStatus = 'loading'
            ipcRenderer.send('activity-reload', null)
        }
    },
    mounted() {
        ipcRenderer.on('begin-loading', (_) => {
            console.log(`begin-loading`)
            this.loadingStatus = 'loading'
        })
        ipcRenderer.on('loading-failed', (_) => {
            console.log(`loading-failed`)
            this.loadingStatus = 'fail'
        })
        ipcRenderer.on('loading-success', (_) => {
            this.loadingStatus = 'success'
            console.log(`loading-success`)
        })
    }
}
</script>

<style scoped lang="scss">

.claActivity {
   background: transparent;
    //background-image: linear-gradient(-45deg, #1D1D1D 0%, #222121 85%, #1D1D1D 100%);
    height: 100%;
    display: flex;
    flex-direction: column;

    /deep/ .el-loading-mask {
        pointer-events: none;
    }

    .claTitle {
        -webkit-app-region: drag;
        position: relative;
        height: 30px;
        width: 100%;

        .claCloseBtn {
            position: absolute;
            -webkit-app-region: no-drag;
            top: 0px;
            bottom: 0px;
            right: 0px;
            background: transparent;
            border-width: 0;
            width: 30px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            i {
                color: #737373;
                font-size: 16px;
                align-self: center;
            }
        }
    }

    .claFail {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;

        .claFailContent {
            display: flex;
            flex-direction: column;
            align-items: center;

            .claImg {
                width: 300px;
            }

            .claMsg {
                height: 28px;
                line-height: 28px;
                font-family: PingFangSC-Regular;
                font-size: 20px;
                color: rgba(255, 255, 255, 0.85);
                letter-spacing: 0;
                text-align: center;
                font-weight: 400;
                margin-top: 32px;
            }

            .claRetry {
                width: 200px;
                height: 28px;
                background: #3073FF;
                //box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.4);
                border-radius: 4px;
                color: #FFFFFF;
                margin-top: 54px;
                border: none;
                cursor: pointer;
            }

            .claRetry:hover {
                background-color: #5473B3
            }

            .claRetry:focus {
                outline: none;
            }
        }
    }
}
</style>
