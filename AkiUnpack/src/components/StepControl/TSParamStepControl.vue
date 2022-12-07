<template>
    <div class="claStepControl">
        <div
            :class="{
                'claQuickNarrowLeft': true,
                'claHover': enable,
                'claDisable': !enable,
                'icon-btn-hover':enable
            }"
            @click.stop="onDbLeftClick">
            <i class="el-icon-d-arrow-left"></i>
        </div>

        <div
            :class="{
                'claNarrowLeft': true,
                'claHover': enable,
                'claDisable': !enable,
                'icon-btn-hover':enable
            }"
            @click.stop="onLeftClick">
            <i class="el-icon-arrow-left"></i>
        </div>

        <div
            :class="{
                'claNarrowRight': true,
                'claHover': enable,
                'claDisable': !enable,
                'icon-btn-hover':enable
            }"
            @click.stop="onRightClick">
            <i class="el-icon-arrow-right"></i>
        </div>

        <div
            :class="{
                'claQuickNarrowRight': true,
                'claHover': enable,
                'claDisable': !enable,
                'icon-btn-hover':enable
            }"
            @click.stop="onDbRightClick">
            <i class="el-icon-d-arrow-right"></i>
        </div>
    </div>
</template>

<script>
const INITClick = 0
const DbLeftClick = 1
const LeftClick = 2
const RightClick = 3
const DbRightClick = 4
export default {
    name: 'TSParamStepControl',
    data() {
        return {
            pMaxValue: 100,
            pDoubleStepLen: 5,
            pSingleStepLen: 1,
            clickTimer: -1,
            counter: 0,
            stepStyle: INITClick
        }
    },
    computed: {},
    watch: {
        maxValue: {
            handler: function (val, oldVal) {
                if (val) {
                    this.pMaxValue = val
                }
            },
            immediate: true
        },
        doubleStepLen: {
            handler: function (val, oldVal) {
                if (val) {
                    this.pDoubleStepLen = val
                }
            },
            immediate: true
        },
        singleStepLen: {
            handler: function (val, oldVal) {
                if (val) {
                    this.pSingleStepLen = val
                }
            },
            immediate: true
        },
        floatValue: {
            handler: function (val, oldVal) {
                if (val) {
                    this.pIntValue = this.pMaxValue * val
                }
            },
            immediate: true
        }
    },
    props: {
        maxValue: Number, // 传整型值, 100,200这样的
        doubleStepLen: Number, // 双击步长5
        singleStepLen: Number,  // 当点步长1
        enable: Boolean,
        addtionObject: Object
    },
    methods: {
        notifyStepChanged(step, isDbClick, counter) {
            this.$emit('onStepChange', [step, isDbClick, this.addtionObject, counter])
        },
        dispatchClickEvent(clickStyle) {
            if (this.stepStyle == INITClick) {
                return
            }
            if (this.stepStyle == clickStyle) {
                return
            }
            if (this.clickTimer) {
                clearTimeout(this.clickTimer)
                this.clickTimer = -1

                let step = -this.pDoubleStepLen
                let isDbClick = false
                switch (this.stepStyle) {
                    case DbLeftClick: {
                        step = -this.pDoubleStepLen
                        isDbClick = true
                        break
                    }
                    case DbRightClick: {
                        step = this.pDoubleStepLen
                        isDbClick = true
                        break
                    }
                    case LeftClick: {
                        step = -this.pSingleStepLen
                        isDbClick = false
                        break
                    }
                    case RightClick: {
                        step = this.pSingleStepLen
                        isDbClick = false
                        break
                    }
                }
                this.stepStyle = clickStyle
                this.notifyStepChanged(step, isDbClick, this.counter)
                this.counter = 0
            }
        },
        createClickTimer: function () {
            if (this.clickTimer == -1) {
                this.clickTimer = setTimeout(() => {
                    this.dispatchClickEvent(INITClick)
                }, 1000)
            }
        },

        onDbLeftClick() {
            this.dispatchClickEvent(DbLeftClick)
            this.stepStyle = DbLeftClick
            this.counter++
            this.createClickTimer()
        },

        onLeftClick() {
            this.dispatchClickEvent(LeftClick)
            this.stepStyle = LeftClick
            this.counter++
            this.createClickTimer()
        },
        onRightClick() {
            this.dispatchClickEvent(RightClick)
            this.stepStyle = RightClick
            this.counter++
            this.createClickTimer()
        },
        onDbRightClick() {
            this.dispatchClickEvent(DbRightClick)
            this.stepStyle = DbRightClick
            this.counter++
            this.createClickTimer()
        }
    }
}
</script>

<style lang="scss" scoped>

$quickNarrowWidth: 48px;
$narrowWidth: 48px;
$width: 192px;
$height: 22px;
$narrowFontSize: 12px;
$narrowColor: #999999;
$speratorLineBorder: 0.5px solid #4E4E4E;

.claStepControl {
    height: $height;
    line-height: $height;
    background: #393939;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    text-align: center;
    overflow: hidden;

    i {
        color: $narrowColor;
        font-size: $narrowFontSize;
    }

    .claDisable {
        background: #4D4D4D;
        pointer-events: none;
    }

    .claQuickNarrowLeft {
        width: $quickNarrowWidth;
        pointer-events: auto;
    }

    .claNarrowLeft {
        width: $narrowWidth;
        border-left: $speratorLineBorder;
        pointer-events: auto;
    }

    .claNarrowRight {
        width: $narrowWidth;
        border-left: $speratorLineBorder;
        pointer-events: auto;

        /deep/ .el-icon-arrow-right {
            font-size: 13px;
        }
    }

    .claQuickNarrowRight {
        width: $quickNarrowWidth;
        border-left: $speratorLineBorder;
        pointer-events: auto;
    }

    .claHover:hover {
        cursor: pointer;
    }

    .claHover:active {
        background: rgba(0, 0, 0, 0.4);
    }
}
</style>
