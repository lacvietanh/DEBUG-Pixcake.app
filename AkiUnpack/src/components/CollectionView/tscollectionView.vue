<template>
    <RecycleScroller
        class="scroller list"
        :items="list"
        :item-size="myCloumHeight"
        v-slot="{ item }"
        ref="recycleViewRef"
        :emitUpdate="true"
        @update="onUpdate"
    >
        <div class="vue_recycle_cla_list"
             :style="{height:myCloumHeight + 'px','justify-content':myContentXaxisAlign,paddingLeft:myLrPadding+'px',paddingRight:myLrPadding+'px'}"
             ref="gridRows">
            <template v-for="it in item.items">
                <slot v-bind:item="it"></slot>
            </template>
        </div>
    </RecycleScroller>
</template>

<script>
import { debounce, cloneDeep } from 'lodash'
import Vue from 'vue'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

Vue.component('RecycleScroller', VueVirtualScroller.RecycleScroller)
Vue.use(VueVirtualScroller)

export default {
    name: 'tscollectionViewNew',
    data() {
        return {
            myContentXaxisAlign: 'flex-start',
            rangeChangeIndex: [],
            myLrPadding: 0,
            lastStartIndex: 0,
            lastEndIndex: 0
        }
    },
    props: {
        list: Array,
        myCloumHeight: Number,
        padding: Number,
        column: Number,
        lrEdgePadding: Number, // 最左边、最右边项离边界的内边距
        contentXaxisAlign: String //弹性布局的justifyContent的css居中方式
    },
    watch: {
        contentXaxisAlign: {
            handler: function (val, old) {
                if (val) {
                    this.myContentXaxisAlign = val
                }
            },
            immediate: true
        },
        lrEdgePadding: {
            handler: function (val, old) {
                if (val) {
                    this.myLrPadding = val
                }
            },
            immediate: true
        }
    },
    methods: {
        onUpdate: debounce(function (startIndex, endIndex) {
            this.rangeChangeIndex = [startIndex, endIndex]

            console.log('startIndex: ' + startIndex + ', endIndex' + endIndex)
            let minStarIndex = Math.min(this.lastStartIndex, startIndex)
            let maxEndIndex = Math.max(this.lastEndIndex, endIndex)
            for (let i = minStarIndex; i <= maxEndIndex; i++) {
                if (i >= startIndex && i <= endIndex) {
                    this.setVisible(i, true)
                } else {
                    this.setVisible(i, false)
                }
            }

            if (this.list[startIndex] && this.list[endIndex]) {
                let start = this.list[startIndex].items[0].index - 1
                let lastInnerIndex = this.list[endIndex].items.length - 1
                let end = this.list[endIndex].items[lastInnerIndex].index

                console.log(`tscollectionView, onUpdate:${start}-${end}`)
                this.$emit('onRangeChanged', [start, end, this.rangeChangeIndex])
            }
            console.log(`tscollectionView, onUpdateRowIndex:${startIndex}-${endIndex}`)

            this.lastStartIndex = startIndex
            this.lastEndIndex = endIndex
        }, 10),

        setVisible(index, isVisible) {
            if (this.list == null || this.list.length == 0 || this.list.length <= index) {
                return
            }
            let vmArr = this.list[index]
            if (vmArr == null || vmArr.items == null || vmArr.items.length == 0) {
                return
            }
            vmArr.items.forEach(item => {
                // if (item instanceof ThumbnailViewModel) {
                //     item.setVisible(isVisible)
                //     if (!isVisible) {
                //         let imageIO = TSImageIOManager.shareInstance().getImageIO(item.imgPath)
                //         if (imageIO) {
                //             imageIO.cancelProcess()
                //         }
                //     }
                // }
            })
        },

        onVisible(elment) {
            console.log('onVisible: ' + elment)
        },
        isItemInVisibleRect(rowDiv) {
            // 取得其父容器，此例为指定id的div
            let ele = rowDiv.firstElementChild
            let vueEl = ele.__vue__
            let rowIndex = vueEl.data.index / this.column
            let [startIndex, endIndex] = this.rangeChangeIndex
            if (rowIndex >= startIndex && rowIndex <= endIndex) {
                return true
            }
            return false
        },
        // 获得可见项
        getCacheItems(visiable) {
            let beginTime = new Date().getTime()
            let rowDivs = document.getElementsByClassName('vue_recycle_cla_list')
            let unVisableList = []
            let visableList = []
            let list = null
            rowDivs.forEach((it) => {
                if (this.isItemInVisibleRect(it)) {
                    let children = it.childNodes
                    children.forEach((child) => {
                        visableList.push(child.__vue__)
                    })
                } else {
                    let children = it.childNodes
                    children.forEach((child) => {
                        unVisableList.push(child.__vue__)
                    })
                }
                list = visiable ? visableList : unVisableList
            })
            let endTime = new Date().getTime()
            let diff = (endTime - beginTime) / 1000
            console.log('tscollectionView getCacheItems...cost=' + diff)
            return list
        },
        // 通过viewModel获得指定的cell项
        getVisibleCellViewItem(itemViewModel) {
            let thubView = this
            let gridItems = thubView.getCacheItems(true)
            if (!gridItems) {
                return
            }
            for (let i = 0; i < gridItems.length; i++) {
                let gridIt = gridItems[i]
                if (gridIt.data.imgPath == itemViewModel.imgPath) {
                    return gridIt
                }
            }
            return null
        }
    },
    mounted() {
        if (this.list == null || this.list.length == 0) {
            return
        }
        let length = this.list.length
        let startIndex = 0
        let endIndex = length - 1

        if (this.list[startIndex] && this.list[endIndex]) {
            let start = this.list[startIndex].items[0].index
            let lastInnerIndex = this.list[endIndex].items.length - 1
            let end = this.list[endIndex].items[lastInnerIndex].index

            console.log(`tscollectionView, init :${start}-${end}`)
            this.$emit('onRangeChanged', [start, end, null])
            this.lastStartIndex = startIndex
            this.lastEndIndex = endIndex
        }
    }
}
</script>

<style scoped>
.scroller {
    height: 100%;
    overflow-y: auto;
}

.vue_recycle_cla_list {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: flex-start;
}

.list {
    width: 100%;
}
</style>
