<template>
    <div ref="selectContent">
        <el-input class="ts-select-input" :disabled="disabled" suffix-icon="el-icon-arrow-down" readonly
                  @focus.self="onInputFocus" v-model="inputValue"/>
        <!--        <select class="ts-select-dropdown">-->
        <!--            <option  v-for="(item, i) in list" :value="i" :key="i">{{ item.label }}</option>-->
        <!--            <option  v-for="(item, i) in list" :value="i" :key="i">{{ item.label }}</option>-->
        <!--            <option  v-for="(item, i) in list" :value="i" :key="i">{{ item.label }}</option>-->
        <!--            <option  v-for="(item, i) in list" :value="i" :key="i">{{ item.label }}</option>-->
        <!--        </select>-->
        <transition name="el-fade-in-linear">
            <div ref="dropdownRef" class="ts-select-dropdown" v-show="showSelectDropdown"
                 :style="{ ...dropdownPosition }">
                <!--            <div class="ts-select-dropdown" :style="{ bottom: `-${dropdownContainerBottom}px`}" @wheel="onWheel">-->
                <div v-show="showUpArrow" class="arrow" @mouseenter.stop="onUp" @mouseleave.stop="removeTimer">
                    <i class="el-icon-arrow-up arrow-icon"></i>
                </div>
                <div v-show="!showUpArrow" class="placeholder"></div>
                <!--                <div ref="viewContent" class="content" :style="{ height: `${viewContentHeight}px` }">-->
                <div ref="viewContent" class="content" :class="{ scroll: isScroll }"
                     :style="{ height: height ? height +'px' : 'auto' }">
                    <ul ref="dropdownContainer" class="ts-select-dropdown-container"
                        :style="{ transform: `translateY(-${translateY}px)` }" @click.stop
                        @wheel.stop.prevent="onContentWheel">
                        <!--                        <template v-for="(item, i) in list">-->
                        <!--                        <ts-select-option :value="i" :label="item.label" :key="i" @select="onSelect"/>-->
                        <!--                        </template>-->
                        <slot></slot>
                    </ul>
                </div>

                <div v-show="showDownArrow" class="arrow" @mouseenter.stop="onDown" @mouseleave.stop="removeTimer">
                    <i class="el-icon-arrow-down arrow-icon"></i>
                </div>

                <div v-show="!showDownArrow" class="placeholder"></div>
            </div>

        </transition>
    </div>
</template>

<script>
import {
    onMounted,
    watch,
    ref,
    computed,
    nextTick,
    getCurrentInstance,
    reactive,
    onUnmounted,
    provide
} from 'vue'

export default {
    name: 'ts-select',
    // components: { TsSelectOption },
    props: {
        value: {},
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { emit, slots }) {
        const _this = getCurrentInstance().proxy

        const options = ref([])

        const optionsCount = ref(0)
        const directionEnum = {
            UP: 0,
            DOWN: 1
        }
        const onUp = (e) => {
            // console.log('lmy::onUp',e)
            direction.value = directionEnum.UP
            getMaxHeight(leftBottom.value)
            log('getMaxHeight', maxHeightRef.value)
            scroll()
        }
        const maxHeightRef = ref(0)
        // const position = reactive({})
        const onDown = (e) => {
            direction.value = directionEnum.DOWN
            getMaxHeight(leftTop.value)
            scroll()
            // viewContent.value.scrollTo(0, 28)

        }
        const getMaxHeight = (leftHeight) => {
            let maxHeight = 0
            const isReach = leftHeight < hideOptionCountRef.value * OPTION_HEIGHT
            // log('isReachTop', isReachTop)
            // log('leftTop', leftTop.value)
            // log('curIndex.value * OPTION_HEIGHT', hideOptionCountRef.value * OPTION_HEIGHT)
            if (isReach) {
                const overHeight = hideOptionCountRef.value * OPTION_HEIGHT - leftHeight
                const hideOptionCount = Math.ceil(overHeight / OPTION_HEIGHT)
                maxHeight = (optionsCount.value - hideOptionCount) * OPTION_HEIGHT
            } else {
                maxHeight = optionsCount.value * OPTION_HEIGHT
            }
            maxHeightRef.value = maxHeight
            return maxHeight
            // position[setPositionKey] = isReach
        }
        const translateY = ref(0)
        const timer = ref(null)
        const direction = ref(0)
        // const MAX_TRANSLATE_HEIGHT = ref()
        // const MAX_VIEW_CONTENT_HEIGHT = 250

        const isReachTop = computed(() => {
            return translateY.value === 0
        })

        const viewContentHeight = ref(200)
        const dropdownContainerBottom = ref(0)
        // const resizeMaxHeight = () => {
        //     if (!MAX_TRANSLATE_HEIGHT.value) {
        //         MAX_TRANSLATE_HEIGHT.value = dropdownContainer.value.offsetHeight - MAX_VIEW_CONTENT_HEIGHT
        //     }
        // }
        // const isScroll = ref(false)
        const step = 14
        const scrollTop = ref(0)
        watch(scrollTop, (v) => {
            // if (!v) {
            //     showUpArrow.value = false
            // }
            if (v === hideOptionCountRef.value * OPTION_HEIGHT) {
                showDownArrow.value = false
            }
            if (isFixed.value) {
                if (v && v !== hideOptionCountRef.value * OPTION_HEIGHT) {
                    showUpArrow.value = true
                    showDownArrow.value = true
                }
            }

        })
        const scrollHandler = () => {
            // if (direction.value === directionEnum.DOWN) {
            //     if (viewContentHeight.value < MAX_VIEW_CONTENT_HEIGHT) {
            //         viewContentHeight.value++
            //     }
            //     resizeMaxHeight()
            //     if (translateY.value >= MAX_TRANSLATE_HEIGHT.value) {
            //         // isReachBottom.value = true
            //         return
            //     }
            //     // isReachTop.value = false
            //     // if (isReachBottom.value) return
            //     translateY.value = translateY.value + 1
            // } else {
            //     if (translateY.value <= 0) {
            //         // isReachTop.value = true
            //         return
            //     }
            //     // isReachBottom.value = false
            //     // if (isReachBottom.value) return
            //     translateY.value = translateY.value - 1
            // }
            // if (position.isReachTop) {
            //     showUpArrow.value = true
            // } else {
            //     height.value += step;
            // }
            if (height.value < maxHeightRef.value) {
                height.value += step
            } else {
                // showUpArrow.value = true
                if (height.value === optionsCount.value * OPTION_HEIGHT) {
                    showDownArrow.value = false
                    showUpArrow.value = false
                }
                const isHide = maxHeightRef.value !== optionsCount.value * OPTION_HEIGHT
                const showOptionCount = Math.ceil(maxHeightRef.value / OPTION_HEIGHT)
                if (isHide) {
                    isScroll.value = true
                    isFixed.value = true
                    if (direction.value === directionEnum.DOWN) {
                        scrollTop.value += step
                    } else {
                        scrollTop.value -= step
                    }
                    if (scrollTop.value <= 0) {
                        scrollTop.value = 0
                    }
                    if (scrollTop.value >= (optionsCount.value - showOptionCount) * OPTION_HEIGHT) {
                        scrollTop.value = (optionsCount.value - showOptionCount) * OPTION_HEIGHT
                    }
                    viewContent.value.scrollTo({
                        top: scrollTop.value,
                        left: 0
                        // behavior: 'smooth'
                    })
                }

            }
            // log('scrollHandler', height.value)
        }

        const scroll = () => {
            // console.log('lmy::scroll')
            removeTimer()
            timer.value = setInterval(scrollHandler, 50)
        }
        const removeTimer = () => {
            if (timer.value) {
                clearInterval(timer.value)
                // isScroll.value = false
            }
        }
        const viewContent = ref()
        const dropdownContainer = ref()
        // onMounted(() => {
        //     nextTick(() => {
        //         console.log('lmy::', viewContent.value)
        //         console.log('lmy::', dropdownContainer.value.offsetHeight)
        //         // console.log('lmy::', MAX_TRANSLATE_HEIGHT.value)
        //     })
        // })
        // const sVNodeList = ref([])
        const curValue = ref()
        const curIndex = computed(() => {
            return options.value && options.value.findIndex(option => option?.isActive)
        })
        // const valueComputed = computed(() => {
        //     return props.value
        // })
        watch(() => props.value, (v) => {
            changeCurOption(v, 'init')
        })
        const inputValue = ref()
        // watch(curValue, (v, oldV) => {
        // if (v !== oldV) {
        //     emit('input', v)
        // }
        // log('curValue', v)
        // inputValue.value = options.value[c]?.label
        // log('inputValue.value2', sVNodeList.value.find(slot => slot?.componentInstance.isActive))
        //     if (showSelectDropdown.value){
        //         closeDropdown()
        //     }
        // })
        onMounted(() => {
            nextTick(() => {
                changeCurOption(props.value, 'init')
            })
        })
        // const dropdownContainerOriTop = 20
        // const getDropdownBottom = () => {
        //     console.log('lmy::curIndex', curIndex)
        //     dropdownContainerTop.value = dropdownContainerOriTop + (curIndex.value - 1) * optionHeight
        //     if (dropdownContainerTop.value >= viewContentHeight.value) {
        //         translateY.value = dropdownContainerTop.value - viewContentHeight.value
        //         dropdownContainerTop.value = viewContentHeight.value
        //     }
        // }

        // const onSelect = (v) => {
        //     console.log('lmy::onSelect', v)
        // }

        /*
            点击输入框逻辑 展开下拉框
         */
        const showSelectDropdown = ref(false)
        const onInputBlur = () => {
            onSwitchSelectDrop()
        }
        const flag = ref(false)
        const onInputFocus = (e) => {
            // console.log('lmy::onInputFocus', e.target)
            flag.value = true
            // onSwitchSelectDrop()
            showSelectDropdown.value = true
            // nextTick(() => {
            getDropdownPosition(e)
            // })
            addDomClickListener()
        }
        const onSwitchSelectDrop = () => {
            showSelectDropdown.value = !showSelectDropdown.value
        }
        const dropdownPosition = reactive({
            // bottom: 0,
            // top: 0
        })
        const dropdownRef = ref()
        // const optionRef = ref()
        // const OPTION_COUNT = list.length
        // const optionCount = computed(() => {
        //     return sVNodeList.value && sVNodeList.value.length
        // })
        const ARROW_HEIGHT = 24
        const OPTION_HEIGHT = 28
        // const isLimitHeight = ref(false)
        const hideOptionCountRef = ref(0)
        const height = ref()
        const viewHeight = ref()
        const isScroll = ref(false)
        const showDownArrow = ref(false)
        const showUpArrow = ref(false)
        const leftTop = ref(0)
        const leftBottom = ref(0)
        const isFixed = ref(false)
        const getDropdownPosition = (e) => {
            let h = ''
            // let ty = 0
            let hideOptionCount = 0
            reset()
            // viewHeight.value = undefined
            const windowHeight = window.innerHeight // 视口高度
            const inputRectY = e.target.getBoundingClientRect().y // 输入框距顶高度(输入框以上剩余高度)
            const inputRectHeight = e.target.getBoundingClientRect().height  // 输入框高度
            const bottomLeftHeight = windowHeight - inputRectY - inputRectHeight // 输入框以下剩余高度
            // const dropdownTop = Math.floor(inputRectY - ARROW_HEIGHT - (curIndex.value - 1) * OPTION_HEIGHT)
            const moveHeight = ARROW_HEIGHT + (optionsCount.value - curIndex.value - 1) * OPTION_HEIGHT
            // 1、先以bottom定位
            dropdownPosition.bottom = `${bottomLeftHeight - moveHeight}px`
            const isReachBottom = (moveHeight - bottomLeftHeight) > 0
            const isReachTop = curIndex.value * OPTION_HEIGHT + ARROW_HEIGHT > inputRectY

            // log('isReachBottom', (moveHeight - bottomLeftHeight) > 0)
            // log('isReachTop', isReachTop)
            // log('curIndex', curIndex.value)
            if (isReachBottom) {
                hideOptionCount = Math.ceil(Math.abs(bottomLeftHeight - moveHeight) / OPTION_HEIGHT)
                h = (optionsCount.value - hideOptionCount) * OPTION_HEIGHT
                // log('hideOptionCount', hideOptionCount)
                showDownArrow.value = true
            }
            const shrinkHeight = hideOptionCount * OPTION_HEIGHT
            dropdownPosition.top = ''
            // todo: bug 会伸缩长度
            dropdownPosition.bottom = `${bottomLeftHeight - moveHeight + shrinkHeight - 1}px`
            // translateY.value = 0
            // 2、判断是否超顶
            // 选中option以上距离 + ARROW_HEIGHT > 输入框以上剩余高度 ？
            // log('isReachTop', curIndex.value * OPTION_HEIGHT + ARROW_HEIGHT > inputRectY)
            // log('curIndex.value * OPTION_HEIGHT + ARROW_HEIGHT', curIndex.value * OPTION_HEIGHT + ARROW_HEIGHT)
            // log('inputRectY', inputRectY)

            // 两种情况

            if (isReachTop) {
                const dropdownTop = Math.floor(inputRectY - ARROW_HEIGHT - curIndex.value * OPTION_HEIGHT)
                // log('dropdownPosition.bottom', dropdownPosition.bottom)
                // log('dropdownTop', dropdownTop)
                const hpc = Math.ceil(Math.abs(dropdownTop) / OPTION_HEIGHT)
                showUpArrow.value = true
                if (!isReachBottom) {
                    //1.没有超底 -> 1)定位改到顶部同样位置 2）改变高度
                    // 1)定位改到顶部同样位置
                    // dropdownPosition.bottom = ''
                    // 超出高度
                    // dropdownPosition.top = `${dropdownTop}px`
                    dropdownPosition.bottom = ''
                    hideOptionCount = Math.ceil(Math.abs(dropdownTop) / OPTION_HEIGHT)
                    // log('isReachTop:hideOptionCount', hideOptionCount)
                    // const h = (OPTION_COUNT - hideOptionCount.value) * OPTION_HEIGHT || OPTION_HEIGHT
                    h = (optionsCount.value - hideOptionCount) * OPTION_HEIGHT || OPTION_HEIGHT
                    // log('h', h)

                    const shrinkHeight = hideOptionCount * OPTION_HEIGHT
                    dropdownPosition.top = `${dropdownTop + shrinkHeight}px`
                    // ty = hideOptionCount * OPTION_HEIGHT
                    // log('translateY', translateY.value)
                    // log('dropdownPosition.top', dropdownPosition.top)


                } else {
                    //2.超底 ->
                    hideOptionCount = hideOptionCount + hpc
                    // log("超底:hpc", hideOptionCount, hpc)
                    // ty = hpc * OPTION_HEIGHT
                    // ty = 0
                    // const dom = document.querySelector('.content')

                    // viewContent.value.scrollTo({
                    // })
                    // dom.scrollTo(0, hpc * OPTION_HEIGHT)
                    // viewHeight.value = (OPTION_COUNT - hideOptionCount) * OPTION_HEIGHT
                    h = (optionsCount.value - hideOptionCount) * OPTION_HEIGHT

                    isScroll.value = true
                    showDownArrow.value = true
                    isFixed.value = true
                }
                nextTick(() => {
                    // viewContent.value.scrollTo(0, 0)
                    // log('offsetHeight', viewContent.value.offsetHeight)
                    // log('offsetTop', viewContent.value.offsetTop)
                    scrollTop.value = hpc * OPTION_HEIGHT
                    viewContent.value.scrollTo({
                        top: scrollTop.value,
                        left: 0
                    })
                })
            }


            height.value = h
            // translateY.value = ty
            hideOptionCountRef.value = hideOptionCount
            leftBottom.value = bottomLeftHeight - (optionsCount.value - curIndex.value) * OPTION_HEIGHT - ARROW_HEIGHT
            // log('leftBottom', leftBottom.value)
            // debugger
            // log('bottomLeftHeight', bottomLeftHeight)
            leftTop.value = inputRectY - curIndex.value * OPTION_HEIGHT - ARROW_HEIGHT
            // log('viewContent.value.scrollHeight', viewContent.value.scrollHeight)
            // console.log('lmy::shrinkHeight', shrinkHeight)
            // console.log('lmy::height', height.value)
            // console.log('lmy:riseDir', riseDir)
            // console.log('lmy::innerHeight', window.innerHeight)
            // console.log('lmy::getBoundingClientRect', e.target.getBoundingClientRect().y)
        }
        // const onContentScroll = (e) => {
        //     log('e',e)
        // }
        // const getMoveHeight = (index) => {
        //     return 24 + (OPTION_COUNT - index) * optionHeight
        // }
        // const getRiseDirection = (leftHeight) => {
        //     return moveToActiveOption(leftHeight)
        // }
        const log = (key, value) => {
            console.log(`lmy::${key}`, value)
        }
        // const moveToActiveOption = (leftHeight) => {
        //     // let dir = Direc
        //     // if ()
        //     let isReachTop = false
        //     let isReachBottom = false
        //     const bottomNeedHeight = dropdownRef.value.offsetHeight - curIndex.value * optionHeight
        //     const topNeedHeight = curIndex.value * dropdownRef
        //     if (bottomNeedHeight < leftHeight.bottomLeftHeight) isReachBottom = true
        //     if (topNeedHeight < leftHeight.topLeftHeight) isReachTop = true
        //     if (isReachTop && isReachBottom) {
        //         return 'both'
        //     } else {
        //         if (isReachTop) return 'top'
        //         if (isReachBottom) return 'bottom'
        //     }
        //     return ''
        // }
        const reset = () => {
            isScroll.value = true
            // height.value = 'auto'
            // dropdownContainer.value.scrollTop = 0
            nextTick(() => {
                viewContent.value.scrollTo({
                    top: 0,
                    left: 0
                })
            })
            showUpArrow.value = false
            showDownArrow.value = false
            isScroll.value = false
            isFixed.value = false
            scrollTop.value = 0
        }

        const selectContent = ref()
        const closeDropdown = () => {
            removeDomClickListener()
            showSelectDropdown.value = false
        }
        // const tsInputRef = ref()
        const documentHandler = (e) => {
            if (selectContent.value.contains(e.target)) {
                return false
            }

            if (showSelectDropdown.value) {
                closeDropdown()
                // log('tsInputRef', tsInputRef.value)
                // tsInputRef.value?.blur()
                // debugger
            }
        }
        const addDomClickListener = () => {
            window.addEventListener('click', documentHandler)
        }
        const removeDomClickListener = () => {
            window.removeEventListener('click', documentHandler)
        }

        onUnmounted(() => {
            removeDomClickListener()
            options.value.length = 0
        })
        const onContentWheel = (e) => {
            // if (isFixed.value) return
            let maxHeight

            const showOptionCount = Math.ceil(maxHeightRef.value / OPTION_HEIGHT)
            // if (isFixed) {
            //     scrollTop.value += e.deltaY
            //     if (scrollTop.value <= 0) {
            //         scrollTop.value = 0
            //     }
            //     if (scrollTop.value >= (optionsCount.value - showOptionCount) * OPTION_HEIGHT) {
            //         scrollTop.value = (optionsCount.value - showOptionCount) * OPTION_HEIGHT
            //     }
            //     viewContent.value.scrollTo({
            //         top: scrollTop.value,
            //         left: 0,
            //         // behavior: 'smooth'
            //     })
            //     return
            // }
            // if (showDownArrow.value) {
            if (e.deltaY > 0) {
                // onDown()

                if (showDownArrow.value) {
                    if (showUpArrow.value) {
                        scrollTop.value += e.deltaY
                        if (scrollTop.value <= 0) {
                            scrollTop.value = 0
                        }
                        if (scrollTop.value >= (optionsCount.value - showOptionCount) * OPTION_HEIGHT) {
                            scrollTop.value = (optionsCount.value - showOptionCount) * OPTION_HEIGHT
                        }
                        viewContent.value.scrollTo({
                            top: scrollTop.value,
                            left: 0
                            // behavior: 'smooth'
                        })
                    } else {
                        maxHeight = getMaxHeight(leftTop.value)
                        if (isFixed.value) return
                        height.value += e.deltaY
                    }
                }
            } else {
                // onUp()
                if (showUpArrow.value) {
                    if (showDownArrow.value) {
                        scrollTop.value += e.deltaY
                        if (scrollTop.value <= 0) {
                            scrollTop.value = 0
                        }
                        if (scrollTop.value >= (optionsCount.value - showOptionCount) * OPTION_HEIGHT) {
                            scrollTop.value = (optionsCount.value - showOptionCount) * OPTION_HEIGHT
                        }
                        viewContent.value.scrollTo({
                            top: scrollTop.value,
                            left: 0
                            // behavior: 'smooth'
                        })
                    } else {
                        maxHeight = getMaxHeight(leftBottom.value)
                        if (isFixed.value) return
                        height.value -= e.deltaY
                    }
                }
            }
            // }
            // if (showUpArrow.value) {
            //     if (e.deltaY < 0) {
            //         maxHeight = getMaxHeight(leftBottom.value)
            //         height.value -= e.deltaY
            //     }
            // }
            if (height.value >= maxHeight) {
                height.value = maxHeight

                const isHide = maxHeightRef.value !== optionsCount.value * OPTION_HEIGHT
                if (isHide) {
                    isScroll.value = true
                    isFixed.value = true
                    scrollTop.value += Math.abs(e.deltaY)
                    if (scrollTop.value <= 0) {
                        scrollTop.value = 0
                    }
                    if (scrollTop.value >= (optionsCount.value - showOptionCount) * OPTION_HEIGHT) {
                        scrollTop.value = (optionsCount.value - showOptionCount) * OPTION_HEIGHT
                    }
                    viewContent.value.scrollTo({
                        top: scrollTop.value,
                        left: 0
                        // behavior: 'smooth'
                    })
                } else {
                    showDownArrow.value = false
                    showUpArrow.value = false
                }
                // if (isFixed.value) return
                // if (showDownArrow.value) showDownArrow.value = false
                // if (showUpArrow.value) showUpArrow.value = false
            }
            // console.log('lmy:onwheel', e.deltaY)
        }

        // const scrollDropdown = (v) => {
        //     scrollTop.value += v
        //     viewContent.value.scrollTo({
        //         top: scrollTop.value,
        //         left: 0,
        //     })
        // }
        // const curLabel = ref('')

        const changeCurOption = (v, eventId = 'change') => {
            if (v === curValue.value) {
                return closeDropdown()
            }
            curValue.value = v
            options.value.forEach((option) => {
                option.isActive = option?.value === v
                if (option.isActive) {
                    inputValue.value = option?.label
                }
            })
            // emit('change', v)

            if (eventId === 'change') {
                emit('input', v)
                emit('change', v)
            }
            // log('changeCurOption', options.value)
            // log('changeCurOption', options.value.find(i => i?.isActive))
            return v
        }

        provide('options', options)
        provide('optionsCount', optionsCount)
        provide('changeCurOption', changeCurOption)

        return {
            // list,
            onUp,
            onDown,
            removeTimer,
            viewContent,
            viewContentHeight,
            dropdownContainerBottom,
            dropdownContainer,
            isReachTop,

            // onSelect,
            curValue,

            showSelectDropdown,
            onSwitchSelectDrop,
            onInputFocus,
            onInputBlur,
            inputValue,

            dropdownPosition,
            dropdownRef,
            // tsInputRef,
            // optionRef,
            translateY,
            height,
            viewHeight,
            isScroll,
            // onContentScroll,
            showUpArrow,
            showDownArrow,
            selectContent,
            closeDropdown,

            onContentWheel,


            options,
            optionsCount,
            changeCurOption
        }
    }
}
</script>

<style lang="scss" scoped>
.ts-select-input {
    height: 28px !important;
    line-height: 28px !important;
    cursor: pointer !important;
    font-size: 12px !important;

    /deep/ {
        .el-input__inner {
            height: 28px !important;
            line-height: 28px !important;
            font-family: Avenir, Helvetica, Arial, sans-serif;
        }

        .el-input__suffix-inner {
            pointer-events: none;
        }
    }
}

.ts-select-dropdown {
    position: fixed;
    //height: 28px;
    //top: -20px;
    //right: 5px;
    //bottom: 0;
    z-index: 9999;
    //height: 200px;
    padding: 8px 0;
    background: #232324;
    border: 1px solid #555555;
    box-shadow: 0 2px 33px 0 rgba(0, 0, 0, 0.50);
    border-radius: 8px;
    transition: all 50ms linear;

    &-container {
        will-change: transform;
        transform-style: preserve-3d;
        transition-property: all;
        transition-duration: 10ms;
        transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }

    .content {
        //todo: 在两边都顶到的情况
        //overflow-y: scroll;
        transition: all 100ms linear;
        overflow-y: hidden;
    }

    .scroll {
        overflow-y: scroll;
    }

    .placeholder {
        width: 100%;
        height: 16px;
    }

    .arrow {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 16px;
        line-height: 16px;
        //margin: 0 4px;
        z-index: 9;

        &-icon {
            font-size: 16px;
            color: #B3B3B3;
        }
    }
}
</style>
