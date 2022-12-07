<template>
    <div class="thumb-opt-record">
        <div class="tool">
            <div class="tool-title">
                <span>历史记录</span>

                <i class="el-icon-refresh-right reset-btn-icon"
                   style="font-size: 16px"
                   v-if="selectId && selectId != 0"
                   @click.stop="onResetRecord">
                </i>
            </div>
        </div>

        <div
            class="content-container global__scroll-style"
            @scroll="throttleScroll"
            ref="content"
        >

            <div class="content"
                 v-for="(item, index) in list" :key="index">

                <div class="item"
                     :id="item.id"
                     :class="{ 'is-select-item': item.isSelect}"
                     @click.stop="onItemClick(item)"
                >
                            <span class="title"
                                  :class="{ 'is-select-text': item.isSelect}"
                            >
                                {{ renderTitle(item) }}

                            </span>

                    <span class="value" v-if="item.opt.optDesc"
                          :class="{ 'is-select-text': item.isSelect}"
                    >
                               {{ renderDesc(item) }}
                            </span>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { defineComponent, nextTick } from 'vue'
import store from '@/store'

import ipcRenderer from 'qt/Ipc-renderer'

import useRefinePointsRepositories from '@/composables/points/useRefinePointsRepositories'
import { throttle } from 'lodash'

import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'

export default defineComponent({
    name: 'ThumbOptRecordView',
    data() {
        return {
            originItem: {
                isSelect: false,
                enable: 1,
                id: 0,
                opt: {
                    labName: '原始'
                },
                presetSuitId: '-1',
                created_time: -1
            },
            selectId: 0,
            list: [],
            thumbnailId: -1,
            sexMap: null,

        }
    },
    components: {
        DynamicScroller,
        DynamicScrollerItem
    },
    props: {
        isShow: {
            type: Boolean,
            default: false
        },
        photoControlFunc: {
            type: Function
        }
    },
    setup(props) {
        const {
            PointHistoryStep,
            PointHistoryReset,
            PointHistoryScroll
        } = useRefinePointsRepositories()

        return {
            PointHistoryStep,
            PointHistoryReset,
            throttleScroll: throttle(PointHistoryScroll, 2000, { leading: false })
        }
    },
    mounted() {

        this.sexMap = new Map([
            [0, '女'],
            [1, '男'],
            [2, '儿童'],
            [3, '长辈']
        ])
        ipcRenderer.on('on-updateCurrentOptRecordId', (event, args) => {
            console.log('updateCurrentOptRecordId', args)
            if (args && args.id) {
                store.commit('refine/_SetNavbarDots', { history: true })
            }
            if (!this.isShow) {
                return
            }

            let { id, thumbnailId } = args
            if (this.selectId === id) {
                return
            }
            if (this.thumbnailId !== thumbnailId) {
                return
            }
            this.list.forEach(item => {
                item.isSelect = false
                if (id >= item.id) {
                    item.isSelect = true
                }
            })
            this.selectId = id
            this.scrollToTarget(id)
        })

        ipcRenderer.on('on-loadThumbnailOptRecord', (event, args) => {
            store.commit('refine/_SetNavbarDots', { history: args.count > 0 })
            if (!this.isShow) {
                return
            }
            this.selectId = 0
            let { data, thumbnailId, selectId } = args
            let list = data
            let finalList = []
            if (list && list.length > 0) {
                for (let i = list.length - 1; i >= 0; i--) {
                    let resultElement = list[i]
                    if (resultElement.optJson) {
                        resultElement.opt = JSON.parse(resultElement.optJson)
                    }
                    if (selectId >= resultElement.id) {
                        resultElement.isSelect = true
                    } else {
                        resultElement.isSelect = false
                    }
                    finalList.push(resultElement)
                }
                this.selectId = selectId
            }
            let originItem = {
                isSelect: false,
                enable: 1,
                id: 0,
                opt: {
                    labName: '原始'
                },
                presetSuitId: '-1',
                created_time: -1
            }
            originItem.isSelect = true

            finalList.push(originItem)
            this.list = finalList
            this.thumbnailId = thumbnailId
            this.scrollToTarget(this.selectId)
        })
    },

    beforeDestroy() {
        ipcRenderer.removeAllListeners('on-updateCurrentOptRecordId')
        ipcRenderer.removeAllListeners('on-loadThumbnailOptRecord')
    },

    watch: {
        isShow: {
            handler: async function (val) {
                if (val) {
                    let photoControlObj = this.photoControlFunc()
                    if (photoControlObj) {
                        let { thumbnailId, imgPath } = photoControlObj
                        window.$thumbnailOptRecord.loadThumbnailOptRecord(thumbnailId, imgPath)
                    }
                }
            },
            immediate: false
        }

    },
    methods: {
        scrollToTarget(id) {
            let list = this.list
            let targetIndex = -1
            for (let i = 0; i < list.length; i++) {
                if (list[i].id === id) {
                    targetIndex = i
                    break
                }
            }
            if (targetIndex >= 0) {
                let top = targetIndex * 32
                setTimeout(() => {
                    nextTick(() => {

                        let dom = this.$refs['content']
                        let scrollTop = dom.scrollTop

                        let parentH = dom.getBoundingClientRect().height

                        console.log('scrollTop : ', scrollTop, ' top : ', top, ' scrollTop + parentH : ', (scrollTop + parentH))

                        if (top > scrollTop && (top + 32) < (scrollTop + parentH)) {
                            return
                        }
                        let isUp = true
                        let distance = 0
                        let step = 0
                        let leader = 0
                        let target = 0
                        if ((top + 32) >= (scrollTop + parentH)) {
                            isUp = false
                            top += 32
                            distance = top - (scrollTop + parentH)
                            step = distance / 10
                            leader = scrollTop
                            target = scrollTop + distance
                        } else {
                            distance = scrollTop - top
                            step = -distance / 10
                            leader = scrollTop
                            target = top
                        }

                        let timer = setInterval(function () {

                            leader += step
                            dom.scrollTo({
                                top: leader,
                                left: 0
                            })
                            if (isUp) {
                                if (leader <= target) {
                                    clearInterval(timer)
                                }
                            } else {
                                if (leader >= target) {
                                    clearInterval(timer)
                                }
                            }

                        }, 10)
                    })
                }, 50)
            }
        },
        renderTitle(item) {
            let title = ''
            if (item.opt.sex !== undefined) {
                title += this.sexMap.get(item.opt.sex) + '：'
            }

            title += item.opt.labName
            if (item.opt.lab2Name) {
                title += '  ' + item.opt.lab2Name
            }
            if (item.opt.lab3Name) {
                title += '  ' + item.opt.lab3Name
            }
            return title
        },
        renderDesc(item) {
            if (item.isRest) {
                return '已重置'
            }
            let desc = Number(item.opt.optDesc)
            if (desc > 0) {
                return '+' + desc
            } else {
                return item.opt.optDesc
            }
        },
        async onResetRecord() {
            this.PointHistoryReset()
            await this.onItemClick(this.originItem)
        },
        async onItemClick(clickItem) {
            this.PointHistoryStep()
            this.selectId = clickItem.id
            this.list.forEach(item => {
                item.isSelect = false
                if (clickItem.id >= item.id) {
                    item.isSelect = true
                }
            })

            let photoControlObj = this.photoControlFunc()
            if (photoControlObj) {
                await window.$thumbnailOptRecord.onThumbnailOptRecordClick(photoControlObj, clickItem)
            }
        },
        //节流
        throttle(func, wait) {
            let timeout = null
            return function () {
                // if (timeout) {
                //     debugger
                //     return
                // }
                const context = this
                // eslint-disable-next-line prefer-rest-params
                let args = arguments
                timeout = setTimeout(() => {
                    timeout = null
                }, wait)
                func.apply(context, args)
            }
        },
        onHistoryScroll() {

        }


    }
})
</script>

<style lang="scss" scoped>

.item {
    width: 100%;
    height: 32px;
    line-height: 32px;
    display: flex;
    justify-content: space-between;

    &:hover {
        background: #1d1d1d;

        span {
            color: #FFFFFF;
        }
    }

    .title {
        margin-left: 16px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
		flex-grow: 1;
		flex-shrink: 0;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		max-width: 60%;
		margin-right: 5px;
    }

    .value {
		text-align: right;
        margin-right: 22px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.3);
        white-space: nowrap;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .is-select-item {
        background: #1d1d1d;
    }

    .is-select-text {
        color: rgba(255, 255, 255, 0.65);
    }
}

.thumb-opt-record {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 300px;
    background: #0C0C0C;


    .tool {
        position: relative;
        background: #282828;

        &-title {
            box-sizing: border-box;
            height: 38px;
            background: #282828;
            line-height: 38px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.85);
            font-weight: 500;
            padding: 0 16px;

            display: flex;

            justify-content: space-between;
        }

        .reset-btn-icon {
            line-height: 38px;
        }
    }

    .content-container {
        flex: 1;
        background: #171717;
        padding-bottom: 12px;
        overflow-x: hidden;
        overflow-y: overlay;

        .content {
            width: 100%;
        }
    }
}

</style>
