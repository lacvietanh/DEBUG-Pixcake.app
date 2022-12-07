<template>
    <div @mousedown="mousedown"
         @mousewheel="mousewheel"
         id="centerInfo">
        <slot name="centerInfo"></slot>
    </div>
</template>

<script>
import GlobalDocumentEventBus from "@/utils/GlobalDocumentEventBus";
import { throttle } from 'lodash'

export default {
    name: 'ImportAgeSexReviseItem.vue',
    data() {
        return {
            isMove: false,
            config: {
                edit: {
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                },
                parentElement: {
                    width: 0,
                    height: 0
                },
                scaleRadio: 1
            },
            isFirst: false
        }
    },
    props: {
        value: {
            type: Boolean,
            default() {
                return true
            }
        }
    },
    watch: {
        value: {
            handler() {
                this.clearUpData()
                //第一次移动位移偏差计算标志
                this.isFirst = true
            }
        }
    },
    methods: {
        clearUpData() {
            this.config.edit = {
                width: 0,
                height: 0,
                left: 0,
                top: 0
            }
            this.config.scaleRadio = 1
        },

        mouseAll() {
			GlobalDocumentEventBus.addEventListener('onmousemove',this.documentMove)
			GlobalDocumentEventBus.addEventListener('onmouseup',this.documentUp)
        },
        //释放全局移动事件
        mouseAllUnRegister() {
			GlobalDocumentEventBus.removeEventListener('onmousemove',this.documentMove)
			GlobalDocumentEventBus.removeEventListener('onmouseup',this.documentUp)
        },
        //鼠标按住
        mousedown(ev) {
            let e = ev
            let x = e.pageX
            let y = e.pageY
            this.isMove = true
            this.downX = x
            this.downY = y
            this.config.parentElement.width = ev.currentTarget.parentElement.offsetWidth
            this.config.parentElement.height = ev.currentTarget.parentElement.offsetHeight
            this.mouseAll()
            //解决一开始把图片放中心，导致位移出现偏差的问题
            if (this.isFirst) {
                const centerInfoBox = document.getElementById('centerInfo')
                this.config.edit.left = parseInt(centerInfoBox.style.left)
                this.config.edit.top = parseInt(centerInfoBox.style.top)
                this.isFirst = false
            }
        },
        mousewheel:throttle(function (ev) {
            // 页面滚动距顶部距离
            //let direction = e.deltaY > 0 ? 'down' : 'up'
            const e = ev || window.event
            let direction = e.deltaY < 0
            if (direction) {
                // debugger
                this.config.scaleRadio = (parseFloat(this.config.scaleRadio) + 0.02).toFixed(2)
                this.$emit('toScale', this.config.scaleRadio)
            } else {
                // debugger
                if (this.config.scaleRadio < 0.1) {
                    this.config.scaleRadio = 0.1
                    return
                } else {
                    this.config.scaleRadio = (parseFloat(this.config.scaleRadio) - 0.02).toFixed(2)
                }
                this.$emit('toScale', this.config.scaleRadio)
            }
            if (ev.preventDefault) {/*FF 和 Chrome*/
                ev.preventDefault()// 阻止默认事件
            }
            return false
        },10),
        //
        changeScaleRadio(scale) {
            this.config.scaleRadio = scale
        },
        documentMove(ev) {
            let e = ev
            let ax = e.pageX
            let ay = e.pageY
            //平移
            if (this.isMove) {
                this.config.edit.left += ax - this.downX
                this.config.edit.top += ay - this.downY
                this.downX = ax
                this.downY = ay
                let leftMax = Math.abs(this.config.edit.left)
                let topMax = Math.abs(this.config.edit.top)
                const leftOriginal = this.config.parentElement.width
                const topOriginal = this.config.parentElement.height
                const popupCanvas = document.getElementById('popupCanvas')
                if (leftMax > leftOriginal / 2 * this.config.scaleRadio) {
                    if (this.config.edit.left > 0) {
                        this.config.edit.left = leftOriginal / 2 * this.config.scaleRadio
                    } else {
                        this.config.edit.left = -leftOriginal / 2 * this.config.scaleRadio
                    }
                }
                if (topMax > topOriginal / 2 * this.config.scaleRadio) {
                    if (this.config.edit.top > 0) {
                        this.config.edit.top = topOriginal / 2 * this.config.scaleRadio
                    } else {
                        this.config.edit.top = -topOriginal / 2 * this.config.scaleRadio
                    }
                }
                //操作
                const centerInfoBox = document.getElementById('centerInfo')
                centerInfoBox.style.left = this.config.edit.left + 'px'
                centerInfoBox.style.top = this.config.edit.top + 'px'
            }
        },
        documentUp() {
            this.isMove = false
            this.mouseAllUnRegister()
        }
    }

}
</script>

<style scoped>

</style>
