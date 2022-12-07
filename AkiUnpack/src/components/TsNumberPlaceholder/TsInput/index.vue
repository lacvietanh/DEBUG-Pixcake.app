<template>
    <div class="ts_inner_wrapper"
         v-if="isShow"
    >
        <input
            :type="type"
            ref="tsInnerInput"
            class="ts_inner_input"
            v-model="parmaChangeInputValue"
            @blur="onChange"
            @keypress.enter.stop="onChange"
            @input="onCheckNumberValue"
            @keydown.38.prevent.stop="onUp"
            @keydown.40.stop="onDown"
            @focus="onFocus"
        >
    </div>
</template>

<script>
export default {
    name: 'TsInput',
    props: {
        type: {
            type: String,
            default: 'text'
        },
        mountedCallback: {
            type: Function,
            default() {
                return () => {
                }
            }
        },
        changeCallback: {
            type: Function,
            default() {
                return () => {
                }
            }
        },
        destroyCallback: {
            default() {
                return () => {
                }
            }
        },
        value: {
            type: Number,
            default: 0
        },
        autofocus: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            parmaChangeInputValue: this.value,
            isShow: true,
            flat: false,
            tsInputDom: null
        }
    },
    methods: {
        init() {
            this.$nextTick(() => {
                // 手动聚焦
                this.tsInputDom = this.$refs.tsInnerInput
                this.autofocus && this.tsInputDom.focus()
            })
            this.mountedCallback()
        },
        onCheckNumberValue() {//只支持数字、正负数、小数点
            let val = this.parmaChangeInputValue
            let t = val.charAt(0)
            val = val.replace('.', '$#$')//把第一个字符'.'替换成'$#$'
                .replace(/\./g, '')//把其余的字符'.'替换为空
                .replace('$#$', '.')//把字符'$#$'替换回原来的'.'
                .replace(/[^\d.]/g, '')//只能输入数字和'.'
                .replace(/^\./g, '')//不能以'.'开头
                .replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1')//只保留2位小数
            if (t == '-') {
                val = '-' + val
            }
            this.parmaChangeInputValue = val
        },
        onChange() {
            if (!this.flat) {
                this.flat = true
                this.changeCallback(this.parmaChangeInputValue)
            }
        },
        onFocus(e) {
            e.currentTarget.select()
        },
        destroy() {
            this.destroyCallback && this.destroyCallback()
            this.isShow = false
        },
        onUp() {
            const formatValue = Number(this.parmaChangeInputValue)
            if (isNaN(formatValue)) return
            this.parmaChangeInputValue++
        },
        onDown() {
            const formatValue = Number(this.parmaChangeInputValue)
            if (isNaN(formatValue)) return
            this.parmaChangeInputValue--
        },
        update(val) {
            if (val === this.parmaChangeInputValue) return
            this.parmaChangeInputValue = val
        }

    },
    mounted() {
        this.init()
    }
}
</script>

<style lang="scss" scoped>
.ts_inner_wrapper {
    box-sizing: border-box;
    position: relative;
    width: 32px;
    max-height: 21px;
    height: 100%;
    border-radius: 4px;
    margin-top: -2px;
    margin-right: -2px;
    padding: 0 2px;

    &::before {
        content: "";
        position: absolute;
        top: 0px;
        bottom: 0px;
        right: 0px;
        left: 0px;
        border-radius: 4px;
        background: #2D6B96;
        animation: borderShrinkage 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &::after {
        content: "";
        position: absolute;
        top: 2px;
        bottom: 2px;
        right: 2px;
        left: 2px;
        border-radius: 2px;
        background-color: rgb(23, 23, 23);
        animation: contentShrinkage 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    }

    .ts_inner_input {
        position: relative;
        z-index: 99;
        width: 100%;
        height: 100%;
        text-align: right;
        fill: #3E638B;
        background-color: transparent;
        color: #a6a6a6;
        font-size: 12px;

        &:focus {
            outline: none;
        }

    }

}

@keyframes borderShrinkage {
    from {
        transform: scale(1.2);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes contentShrinkage {
    from {
        transform: scale(1.2);
    }
    to {
        transform: scale(1);
    }
}


input::-webkit-input-placeholder {
    /* WebKit browsers */
    font-size: 12px;
}
</style>
