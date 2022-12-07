<template>
    <div
        v-show="show"
        class="ts-spin-loading"
        :class="{
            'hidden-background': hiddenBackground,
            'fixed': fixed,
            [position]: fixed,
            fullscreen,
            column
        }">
        <div
            v-loading="loading"
            class="ts-loading-spinner">
            <span class="ts-loading-spinner-text">
                <i class="el-icon-circle-check" v-show="!loading"></i>
                {{ text }}
            </span>
        </div>

        <div class="ts-loading-mask"></div>
    </div>

</template>

<script>
export default {
    name: 'TsSpinLoading',
    props: {
        text: {
            type: String,
            default: '处理中...'
        },

        show: {
            type: Boolean,
            default: false
        },

        hiddenBackground: {
            type: Boolean,
            default: false
        },

        fullscreen: {
            type: Boolean,
            default: false
        },

        placement: {
            type: String,
            default: 'left-bottom'
        },

        column: {
            type: Boolean,
            default: false
        },

        loading: {
            type: Boolean,
            default: true
        },

        fixed: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        position() {
            if (!this.fixed) {
                return ''
            }

            const options = [
                'top', 'bottom', 'left', 'right',
                'left-top', 'left-bottom', 'right-top', 'right-bottom',
                'center'
            ]

            if (options.includes(this.placement)) {
                return this.placement
            }

            return 'bottom-left'
        }
    }
}
</script>

<style lang="scss" scoped>
.ts-spin-loading {
    position: relative;
    overflow: hidden;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;

    &.fixed {
        position: absolute;
    }

    &.column {
        padding: 5px 4px;

        .ts-loading-spinner {
            flex-direction: column-reverse;

            /deep/ {
                .el-loading-mask {
                    margin: 2px 0;
                }
            }
        }
    }

    &.hidden-background {
        padding: 0;
    }

    &:not(.hidden-background) {
        border-radius: 4px;
        padding: 5px 4px 5px 6px;

        .ts-loading-mask {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            background: rgba(30, 30, 30, .3);

        }
    }

    &.fullscreen {
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
    }

    &:not(.fullscreen) {
        &.left {
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
        }

        &.top {
            left: 50%;
            transform: translateX(-50%);
            top: 10.5px
        }

        &.right {
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
        }

        &.bottom {
            left: 50%;
            transform: translateX(-50%);
            bottom: 10.5px;
        }

        &.left-top {
            left: 16px;
            top: 10.5px
        }

        &.right-top {
            right: 16px;
            top: 10.5px
        }

        &.left-bottom {
            left: 16px;
            bottom: 10.5px;
        }

        &.right-bottom {
            right: 16px;
            bottom: 10.5px;
        }

        &.center {
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .ts-loading-spinner {
        position: relative;
        overflow: visible;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;

        &-text {
            position: relative;
            z-index: 9999;
            color: #FFFFFF80;
            text-shadow: 0 0 4px rgba(0, 0, 0, 0.40);
            font-size: 12px;
            font-weight: 400;
            white-space: nowrap;
            margin: 0 2px;
        }

        /deep/ {
            .el-loading-mask {
                position: relative;
                background-color: transparent;
                margin: 0 2px;
            }

            .el-loading-spinner {
                position: relative;
                top: unset;
                left: 0;
                bottom: 0;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                border: 2px solid #ffffff40;
                margin-top: 0;

                .circular {
                    width: 12px;
                    height: 12px;
                    position: absolute;
                    left: -2px;
                    top: -2px;

                    .path {
                        stroke: #FFFFFF;
                        stroke-width: 4;
                    }
                }
            }
        }
    }
}
</style>
