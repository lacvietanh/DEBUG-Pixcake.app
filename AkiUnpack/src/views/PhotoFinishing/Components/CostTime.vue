<template>
<div class="box">
    <div>LoadImage: {{LoadImage}}</div>
    <template v-for="(val, key) in LoadImageNative">
        <div :key="`LoadImage_${key}`" style="padding-left: 20px">
            {{key}}: {{val}}
        </div>
    </template>
    <br/>

    <div>ReqServe: {{ReqServe}}</div>
    <template v-for="(val, key) in ReqServeNative">
        <div :key="`ReqServe_${key}`" style="padding-left: 20px">
            {{key}}: {{val}}
        </div>
    </template>
    <br/>

    <div> Process: {{Process}} </div>
    <template v-for="(val, key) in ProcessNative">
        <div :key="`Process_${key}`" style="padding-left: 20px">
            {{key}}: {{val}}
        </div>
    </template>
    <br/>

    <div>loading: {{loadTime}}</div>
</div>
</template>

<script>
export default {
    name: 'CostTime',
    data() {
        return{
            id:-1,

            LoadImage:-1,
            LoadImageNative: {},

            ReqServe:-1,
            ReqServeNative: {},

            Process:-1,
            ProcessNative: {},

            loadTime:-1,
            lastTime:-1,
            newTime: -1
        }
    },
    props: {
        costTimeData: Object,
        costLastTime: Number,
        costNewTime: Number,
    },
    mounted() {
    },

    watch: {
        costTimeData:{
            handler(val) {
                if (val) {
                    let costData = val.data

                    if (costData.id !== this.id) {
                        this.id = costData.id

                        this.ReqServe = -1
                        this.ReqServeNative = {}

                        this.LoadImage = -1
                        this.LoadImageNative = {}

                        this.Process = -1
                        this.ProcessNative = {}
                    }

                    let { LoadImage, GenSeed, ReqFile, ReqServe, ServeDur, Alatency, Process, Native } = costData.data;

                    if (LoadImage) {
                        this.LoadImage = LoadImage
                    }
                    if (Process) {
                        this.Process = Process
                    }
                    if (ReqServe) {
                        this.ReqServe = ReqServe
                        if (GenSeed) {
                            this.ReqServeNative["GenSeed"] = GenSeed
                        }
                        if (ReqFile) {
                            this.ReqServeNative["ReqFile"] = ReqFile + "kb"
                        }
                        if (ServeDur) {
                            this.ReqServeNative["ServeDur"] = ServeDur
                        }
                        if (Alatency) {
                            this.ReqServeNative["Alatency"] = Alatency
                        }
                    }

                    if (Native) {
                        if (Native.includes("LdImg:Decode")) {
                            this.LoadImageNative = JSON.parse(Native)
                        }
                        else {
                            this.ProcessNative =  JSON.parse(Native)
                        }
                    }
                }
            }
        },
        costLastTime: {
            handler(val){
                if (val) {
                    this.lastTime = val
                }
            }
        },
        costNewTime: {
            handler(val){
                if (val) {
                    this.newTime = val
                    this.loadTime = this.newTime - this.lastTime
                }
            }
        }

    },
    methods: {
    }
}
</script>

<style scoped>
.box{
    padding: 20px;
    width: 200px;
    background-color: rgba(0,0,0,0.3);
    color: #4caf50;
}

</style>
