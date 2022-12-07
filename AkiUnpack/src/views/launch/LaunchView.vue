<template>
    <div class="container">
        <img :src="require('@/assets/launch/launch_image_bgp@3x.png')" class="claImg"/>


        <img :src="require('@/assets/launch/launch_icon_logo@3x.png')" class="logo" align="left"/>

        <div class="content">
            <div id="launch-content">
                {{ launchContentPre }}
            </div>

            <span class="info" id="version-content"> {{ version }}</span>
            <span class="info">Copyright © 2022 {{ clientName }}</span>

        </div>
    </div>

</template>

<script>

export default {
    name: 'LaunchView',
    data() {
        return {
            launchMode: 1,
            version: '1.2p.3',
            platform: 'pix',
            clientName: '',
            launchContentPre: '正在启动',
            startTime: 0
        }
    },
    created() {

        const contentMap = [
            { key: 1000 * 5, value: '正在进行硬件加速' },
            { key: 1000 * 10, value: '正在请求网络配置' },
            { key: 1000 * 30, value: '正在请求网络配置，如启动时间过长，请检查网络状态' }
        ]
        this.startTime = new Date().getTime()

        this.clientName = decodeURI(this.getQueryString('clientName'))
        this.platform = this.getQueryString('platform')
        this.launchMode = this.getQueryString('model')
        // let preContent;
        // if (this.platform === '0') {
        //     preContent = '正在为您应用硬件加速，预计需要20秒'
        // } else {
        //     preContent = '正在为您应用硬件加速，预计需要10秒'
        // }
        // if (this.launchMode == 2) {
        //     preContent = '正在为您合并数据库'
        // }
        // this.launchContentPre = preContent
        this.version = '版本' + this.getQueryString('version')
        let count = 0
        setInterval(() => {
            if (count < 3) {
                count++
                this.launchContentPre += '.'
            } else {
                count = 0
                this.launchContentPre = "正在启动"
                let durtion = new Date().getTime() - this.startTime
                for (const item of contentMap) {
                    if (durtion <= item.key) {
                        this.launchContentPre = item.value
                        break
                    }
                }
                // console.log('durtion ', durtion, ' content : ', this.launchContentPre)

            }
        }, 300)
    },
    methods: {
        getQueryString(name) {
            let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
            let r = location.search.substr(1).match(reg)
            if (r != null) return (r[2])
            return null
        }
    }
}
</script>
<style scoped lang="scss">
@import "@/assets/theme/dark/element-variables.scss";

.container {
    width: 980px;
    height: 538px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    position: relative;
}


#launch-content {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-bottom: 16px;
}

.claImg {
    width: 100%;
    height: 100%;
    position: absolute;
}

.logo {
    /*width: 150px;*/
    height: 40px;
    margin-top: 44px;
    margin-left: 48px;
    position: absolute;
    object-fit: contain;
}

.content {
    margin-top: 400px;
    margin-left: 48px;
    position: absolute;
    display: flex;
    flex-direction: column;

}

.info {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #FFFFFF;
    margin-top: 4px;
}


</style>
