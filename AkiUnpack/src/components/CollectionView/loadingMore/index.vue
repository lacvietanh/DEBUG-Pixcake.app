<template>
    <div class="claLoadingMoreRoot">
        <div class="claMore" v-if="loadingStatus == constLoadingStatus.loading">
            <img class="claImg" :src="require('@/assets/icons/favicon.png')"/><span>正在加载更多~</span>
        </div>
        <div class="claMore" v-if="loadingStatus == constLoadingStatus.totalEnd">没有更多内容了~</div>
    </div>
</template>

<script>
import { loadingStatus } from '@/components/CollectionView/loadingMore/constant'

export default {
    name: 'loadingMore',
    props: {
        loadingStatus: loadingStatus.none
    },
    data() {
        return {
            constLoadingStatus: { ...loadingStatus }
        }
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
.claLoadingMoreRoot {
    text-align: center;

    .claMore {
        text-align: center;
        height: 17px;
        line-height: 17px;
        margin-top: 24px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #D9D9D9;
        letter-spacing: 0;
        font-weight: 500;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        .claImg {
            width: 18px;
            object-fit: cover;
            margin-right: 8px;

            animation: move 500ms;
            animation-timing-function: linear; /* easing */
            animation-iteration-count: infinite;
            transform: translateY(0px);

            @keyframes move {
                50% {
                    transform: translateY(-2.5px);
                    animation-timing-function: ease-in;
                }
                100% {
                    transform: translateY(-5px);
                    animation-timing-function: ease-out;
                }
            }
        }
    }
}

</style>
