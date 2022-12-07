<template>
    <div class="histogram-container">
        <TsHistogram :data="chartData" :height="height" :width="width"/>

        <div class="info c-text-label" :style="{
          height:isRaw?'auto':'0px',
          paddingBottom:isRaw?'5px':'0px',
          paddingTop:isRaw?'4px':'2px'
        }">
            <!--            <div class="item">-->
            <!--                <span>{{ imageInfo.makeInfo }} {{ imageInfo.modelInfo }}</span>-->
            <!--                <span class="type">RAW</span>-->
            <!--            </div>-->
            <!--            -->
            <!--            <div class="item">{{ imageInfo.lensInfo || '' }}</div>-->

            <!--            <divider class="divider"></divider>-->

            <template v-if="isRaw">
                <div class="item">
                    <span>ISO {{ imageInfo.ISO }}</span>
                    <span>{{ Number(imageInfo.focal).toRound(0) }}毫米</span>
                    <span>f/{{ Number(imageInfo.aperture.toRound(1)) }}</span>
                    <span>1/{{ imageInfo.shutter | shutterFormat }}秒</span>
                    <span class="type">RAW</span>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import TsHistogram from '@/components/TsG2Chart/TsHistogram'
// import { Divider } from 'element-ui'

export default {
    name: 'HistogramView',
    components: {
        TsHistogram
        // Divider
    },
    props: {
        width: {
            type: Number,
            default: 0
        },
        chartData: {
            type: Object,
            default: () => {
            }
        },
        imageInfo: {
            type: Object,
            default: () => {
            }
        }
    },
    computed: {
        isRaw() {
            return Object.keys(this.imageInfo).length > 0 && !this.imageInfo.isEmpty
        }
    },
    filters: {
        shutterFormat(val) {
            if (val) {
                return Number(1 / val).toRound(0)
            }
            return 0
        }
    },
    data() {
        return {
            height: 94
        }
    },
    methods: {
        getHeight(isRaw) {
            const rawDesH = 39
            return isRaw ? (rawDesH + this.height) : this.height
        }
    }
}
</script>


<style lang="scss" scoped>
.histogram-container {
    background: #171717;

    .info {
        font-size: 12px;
        padding: 4px 16px 5px;

        .item {
            height: 20px;
            line-height: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            > span {
                flex: 1;
            }

            .type {
                background: rgba(255, 255, 255, 0.60);
                border: 0.5px solid #9A9494;
                border-radius: 2px;
                padding: 0 5px;
                font-size: 9px;
                height: 13px;
                line-height: 13px;
                flex: 0;
                color: #333333;
            }
        }

        .divider {
            margin: 7.5px 0;
        }
    }
}
</style>
