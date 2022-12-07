<template>
    <VirtualCollection
        class="global__scroll-style"
        :cellSizeAndPositionGetter="cellSizeAndPositionGetter"
        :collection="myItems"
        :height="height"
        :width="width"
        :scrollToBottomRange="bottomNearDistance"
        :style="{overflowX:showHorizontalSlider?'scroll':'hidden'}"
    >
        <template slot="header">
            <div class="claHeader">
                <slot name="header"></slot>
            </div>
        </template>
        <template slot="cell" slot-scope="props">
            <slot v-bind:data="{item:props.data.data,index:props.data.index}"></slot>
        </template>
    </VirtualCollection>
</template>

<script lang="js">
import Vue from 'vue'
//@ts-ignore
import VirtualCollection from 'vue-virtual-collection'
import toast from '@/mixins/toast'
import { debounce } from 'lodash'
import loadingMore from './loadingMore'
import { loadingStatus } from '@/components/CollectionView/loadingMore/constant'

Vue.use(VirtualCollection)

const scrollDirection = {
    up: 0,
    down: 1,
    none: -1
}


export default {
    name: 'ts-virtual-collection-view',
    mixins: [toast],
    props: {
        items: {
            type: Array,
            default: function () {
                return []
            }
        },
        height: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 0
        },
        itemSize: {
            type: Object,
            default: function () {
                return {
                    width: 10,
                    height: 10
                }
            }
        },
        // 注:如果默认值是0则自行按宽度来适应
        columns: {
            type: Number,
            default: 5
        },
        contentEdgeSet: {
            type: Object,
            default: function () {
                return {
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }
            }
        },
        lineSpace: {
            type: Object,
            default: function () {
                return {
                    vertical: 0,
                    horizontal: 0
                }
            }
        },
        showHorizontalSlider: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            bottomNearDistance: 50, // 像素,滚动接近底部的像素，用于触发loadmore
            myItems: [],
            //滚动相关
            scrollMeasure: {
                lastScrollTop: 0,
                scrollDirection: scrollDirection.none
            },
            loadingStatus: loadingStatus.none,
            loadingMoreRef: null
        }
    },
    watch: {
        columns(val) {
            //@ts-ignore
        },
        items: {
            handler: function (val) {
                let arys = []
                let i = 0
                for (const it of val) {
                    arys.push({
                        data: {
                            data: it,
                            index: i
                        }
                    })
                    i++
                }
                //@ts-ignore
                this.myItems = arys
            },
            immediate: true
        },
        loadingStatus: {
            handler: function (val) {

            },
            immediate: false
        }
    },
    mounted() {
        this.listenScrollEvents(true)
        this.installLoadingMore(this.$el, { loadingStatus: loadingStatus.loading })
    },
    beforeDestroy() {
        // 手动挂载的组件也要移走，否则内存泄漏
        this.$el.removeChild(this.loadingMoreRef.$el)
        this.loadingMoreRef = null
        this.listenScrollEvents(false)
    },
    methods: {
        installLoadingMore(parentEl, options) {
            let LoadingMoreConstructor = Vue.extend(loadingMore)
            const component = (new LoadingMoreConstructor(
                {
                    propsData: { ...options }
                })).$mount()
            parentEl.appendChild(component.$el)
            this.loadingMoreRef = component
            return component
        },
        canScroll() {
            let obj = this.$el
            if (!obj) {
                return false
            }
            const can = obj.scrollHeight > obj.clientHeight || obj.offsetHeight > obj.clientHeight
            return can
        },
        showLoadingMore(loadingStatus) {
            this.loadingStatus = loadingStatus
            this.loadingMoreRef.$props.loadingStatus = loadingStatus
            let canShowMore = this.canScroll()
            // 只有滚动时才可以显示没有更多
            this.loadingMoreRef.$el.style.visibility = canShowMore ? 'visible' : 'hidden'
        },
        triggerBottomEvent: debounce(function (event) {
            this.$emit('scrolled-to-bottom-range', null)
        }, 100),
        onScrollEvent(event) {
            const target = event.target
            const total = target.scrollHeight - target.offsetHeight
            let curScrollTop = target.scrollTop
            const diff = curScrollTop - this.scrollMeasure.lastScrollTop
            if (diff > 0) { // 向下滚动
                this.scrollMeasure.scrollDirection = scrollDirection.down
            } else {
                this.scrollMeasure.scrollDirection = scrollDirection.up
            }//
            console.log(`onScrollEvent...target.scrollTop < total=${target.scrollTop < total},target.scrollTop > (total - this.bottomNearDistance)=${target.scrollTop > (total - this.bottomNearDistance)}`)
            if (target.scrollTop > (total - this.bottomNearDistance)) {
                if (this.scrollMeasure.scrollDirection === scrollDirection.down) {
                    this.triggerBottomEvent(event)
                }
            }
            this.scrollMeasure.lastScrollTop = curScrollTop
        },
        listenScrollEvents(isNeed) {
            let acceptEl = this.$el
            if (isNeed) {
                if (acceptEl) {
                    acceptEl.addEventListener('scroll', this.onScrollEvent)
                }
            } else {
                if (acceptEl) {
                    acceptEl.removeEventListener('scroll', null)
                }
            }
        },
        cellSizeAndPositionGetter(item, index) {
            const col = Math.floor(index % this.columns)
            const row = Math.floor(index / this.columns)
            const interColVal = col === 0 ? 0 : this.lineSpace.horizontal
            const interRowVal = row === 0 ? 0 : this.lineSpace.vertical
            const width = this.itemSize.width
            const height = this.itemSize.height
            let itemRect = {
                x: col * (width + interColVal) + this.contentEdgeSet.left,
                y: row * (height + interRowVal),
                width: this.itemSize.width,
                height: this.itemSize.height
            }
            return itemRect
        }
    }
}
</script>

<style scoped lang="scss">

.vue-virtual-collection {
    overflow: scroll;

    .claHeader {

    }
}


</style>
