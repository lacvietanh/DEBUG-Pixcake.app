<template>
    <div v-show="isDown" class="claSwipeMask"
         :style="{
                    left:`${rect.x}px`,
                    top:`${rect.y}px`,
                    width:`${rect.w}px`,
                    height:`${rect.h}px`
        }">
    </div>
</template>

<script>

function getRect(point0, point1) {
    point0 = point0 || { x: 0, y: 0 }
    point1 = point1 || { x: 0, y: 0 }

    let minX = Math.min(point0.x, point1.x)
    let minY = Math.min(point0.y, point1.y)
    let maxY = Math.max(point0.y, point1.y)
    let maxX = Math.max(point0.x, point1.x)
    let w = Math.abs(minX - maxX)
    let h = Math.abs(minY - maxY)
    // eslint-disable-next-line use-isnan
    if (isNaN(minX)) {
    }
    return { x: minX, y: minY, w: w, h: h }
}

function rectGetMaxY(rc) {
    return rc.h + rc.y
}

function rectGetMaxX(rc) {
    return rc.w + rc.x
}

function rectGetMinX(rc) {
    return rc.x
}

function rectGetMinY(rc) {
    return rc.y
}

import Vue from 'vue'

const Direction = {
    None: -1,
    Down: 0,
    Up: 1
}
let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
let cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame

export default Vue.extend({
    name: 'swipeChooseOp',
    props: {
        acceptEl: {
            type: Object,
            value: { 'el': null }
        },
        eventEl: {
            type: HTMLElement,
            value: null
        },
        // 是否可以有mouseDown的效果,出现弹框时候，不需要鼠标拖拽效果
        canMouseDown: {
            type: Boolean,
            value: true
        },
        // 是否是自定义的滚动处理，例如使用了virtual-scroll相关的组件
        isCustomScroll: {
            type: Boolean,
            value: false // false默认为dom原生滚动
        }
    },
    watch: {
        rect(val) {
            if (!this.isDown || !this.canMouseDown || !this.isMoved) {
                return
            }
            let outRect = this.rect
            if (!this.isCustomScroll) {
                outRect = getRect(this.rStartPoint, this.rEndPoint)
            }
            this.$emit(`onSelectionChanged`, outRect, this.startPoint)
        },
        canMouseDown(val) {
            if (!val) {
                this.isDown = false
            }
        }
    },
    data() {
        return {
            // 在自定义virtual-scroll组件内，this.rect即是显示的mask层区域，也是真实的rect
            startPoint: null,
            endPoint: null,
            // 增加真实startPoint、endPoint 用于非自定义的scroller,this.rect只是显示的mask层区域，真实返回给外部用的rect需要由rStartPoint和rEndPoint来计算
            rStartPoint: null,
            rEndPoint: null,


            isDown: false,
            isMoved: false,
            offsetPosY: 0, // 获得当前的acceptEl到视窗口的偏移值
            rect: {
                x: 0,
                y: 0,
                w: 0,
                h: 0
            },
            scrollTimer: null,
            intervalY: 5, // y的间隔，默认值是5像素
            scrollDirection: Direction.None,
            constScrollHeight: null,
            speed: 1,// 速度,倍率
            lastDownTime: null
        }
    },
    methods: {
        getEventEl() {
            return this.eventEl == null ? window : this.eventEl
        },
        installSwipeEvents() {
            let eventEl = this.getEventEl()
            this.getAcceptEl().addEventListener('mousedown', this.onMouseDown, { capture: false, passive: true })
            eventEl.addEventListener('mousemove', this.onMouseMove)
            eventEl.addEventListener('mouseup', this.onMouseUp)
            eventEl.addEventListener('resize', this.onResize)
        },
        removeSwipeEvents() {
            let eventEl = this.getEventEl()
            this.getAcceptEl().removeEventListener('mousedown', this.onMouseDown, false)
            eventEl.removeEventListener('mousemove', this.onMouseMove)
            eventEl.removeEventListener('mouseup', this.onMouseUp)
            eventEl.removeEventListener('resize', this.onResize)
        },
        transformXY(e) {
            let { clientX, clientY } = e
            let offsetX = clientX
            let offsetY = clientY - this.offsetPosY
            if (this.isCustomScroll) {
                // 缩略图(TSThumbnailCollectionView调用这里的)是可以的
                offsetY = clientY - this.offsetPosY + this.getAcceptEl().scrollTop
            }
            return {
                x: offsetX,
                y: offsetY
            }
        },
        /*
            检测坐标点是否是在接受的acceptEl内部
         */
        pointInside(e) {
            let ret = false
            let point = this.transformXY(e)
            let scrollContentHeight = this.getAcceptEl().scrollHeight
            let scrollTop = this.getAcceptEl().scrollTop
            let scrollContentWidth = this.getAcceptEl().scrollWidth
            let scrollLeft = this.getAcceptEl().scrollLeft

            let scrollRect = {
                x: scrollLeft,
                y: scrollTop,
                w: scrollContentWidth,
                h: scrollContentHeight
            }
            if (
                point.x >= rectGetMinX(scrollRect)
                &&
                point.x <= rectGetMaxX(scrollRect)
                &&
                point.y >= rectGetMinY(scrollRect)
                &&
                point.y <= rectGetMaxY(scrollRect)
            ) {
                ret = true
            }
            return ret
        },
        onResize(e) {
            this.reset()
        },
        onMouseDown(e) {
            this.lastDownTime = new Date().getTime()
            this.startPoint = this.transformXY(e)
            if (!this.isCustomScroll) {
                this.rStartPoint = { ...this.startPoint }
                this.rStartPoint.y += this.getAcceptEl().scrollTop
            }
            this.rect = { ...this.startPoint, w: 0, h: 0 }
            this.isDown = this.canMouseDown ? true : false
            this.isMoved = false
            this.stopTimer()
        },
        onMouseMove(e) {
            let nowTime = new Date().getTime()
            let diff = nowTime - (this.lastDownTime || nowTime)
            // 增加down到move的之间的间隔判断，如果，时间<200毫秒则被拦截掉，防止Command+MouseLeft和moseLeft的拖拽事件冲突
            const activeDuration = 200
            if (!this.isDown || diff < activeDuration) {
                return
            }
            console.log(`swipeChooseOp.onMouseMove: diff`, diff)
            this.isMoved = true
            let pt = this.transformXY(e)
            this.endPoint = pt
            if (!this.isCustomScroll) {
                this.rEndPoint = { ...pt }
                this.rEndPoint.y += this.getAcceptEl().scrollTop
            }
            let rect = getRect(this.startPoint, this.endPoint)
            this.rect = rect
            this.checkScrollState(e)
        },
        onMouseUp(e) {
            this.lastDownTime = new Date().getTime()
            if (!this.isDown) {
                return
            }
            this.isDown = false
            this.isMoved = false
            this.endPoint = this.transformXY(e)
            let rect = getRect(this.startPoint, this.endPoint)
            this.rect = rect
            this.stopTimer()

            if (rect.h > 5 || rect.w > 5) {
                this.$emit('onSelectEnd')
            }
        },
        /* 获得el到client的顶部的偏移值 */
        getOffsetClient(el) {
            let offY = 0
            let target = el
            while ((target = target.offsetParent) != null) {
                offY += target.offsetTop
            }
            return offY
        },
        getAcceptEl() {
            return document.getElementById(this.acceptEl.el)
        },
        onScroller() {
            if (this.scrollDirection == Direction.None) {
                return
            }
            let intervalY = this.scrollDirection == Direction.Up ? -this.intervalY : this.intervalY
            intervalY = intervalY * this.speed
            let scrollTop = this.getAcceptEl().scrollTop + intervalY
            let scrollContentH = this.constScrollHeight
            let clientH = this.getAcceptEl().clientHeight
            if (intervalY < 0) {
                if (scrollTop <= 0) {
                    scrollTop = 0
                }
                let topY = scrollTop
                if (!this.isCustomScroll) {
                    topY = this.getAcceptEl().getBoundingClientRect().y
                }
                this.endPoint = { x: this.endPoint.x, y: topY }
                this.rEndPoint = { ...this.endPoint }
            }

            if (intervalY > 0) {
                let next = scrollTop + clientH
                if (next >= scrollContentH) {
                    scrollTop = scrollContentH - clientH
                    next = scrollContentH
                }
                this.endPoint = { x: this.endPoint.x, y: next }
                this.rEndPoint = { ...this.endPoint }
            }
            let rect = getRect(this.startPoint, this.endPoint)
            this.rect = rect

            this.getAcceptEl().scrollTop = scrollTop
            this.scrollTimer = requestAnimationFrame(this.onScroller)
        },
        startTimer() {
            this.stopTimer()
            if (!this.scrollTimer) {
                this.scrollTimer = requestAnimationFrame(this.onScroller)
            }
        },
        stopTimer() {
            if (this.scrollTimer) {
                cancelAnimationFrame(this.scrollTimer)
                this.scrollTimer = null
            }
        },
        /* 计算检测,是否达到上边，是否达到下边*/
        checkScrollState(e) {
            if (this.getAcceptEl().offsetParent == null) {
                return
            }
            let clientH = this.getAcceptEl().clientHeight
            let scrollOffsetTop = this.getAcceptEl().scrollTop
            let clientTop = this.getAcceptEl().getBoundingClientRect().y
            if (!this.constScrollHeight) {
                this.constScrollHeight = this.getAcceptEl().scrollHeight
            }
            let point = this.transformXY(e)
            this.scrollDirection = Direction.None
            let ofY = point.y - scrollOffsetTop
            let diffTop = ofY
            if (!this.isCustomScroll) {
                ofY = point.y
                diffTop = point.y - clientTop
            }

            if (diffTop <= 0) {
                this.scrollDirection = Direction.Up
                this.speed = 1 + Math.abs(ofY) / 100
            }
            if (ofY >= clientH) {
                this.scrollDirection = Direction.Down
                ofY = ofY - clientH
                this.speed = 1 + Math.abs(ofY) / 100
            }
            if (this.scrollDirection != Direction.None) {
                this.startTimer()
            }
        },
        reset() {
            this.constScrollHeight = null
        }
    },
    beforeDestroy() {
        this.removeSwipeEvents()
    },
    mounted() {
        this.installSwipeEvents()
        this.offsetPosY = this.getOffsetClient(this.getAcceptEl())
    }
})

</script>

<style scoped>
.claSwipeMask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #FFFFFF10;
    border: 1px solid #FFFFFF10;
    pointer-events: none;
}
</style>
