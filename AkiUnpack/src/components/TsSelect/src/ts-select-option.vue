<template>
    <li class="ts-select-dropdown-container-item el-select-dropdown__item" @click.stop="onSelect"
        :class="{ active: isActive, 'is-disabled':disabled, line: line }">
        {{ label }}
    </li>
</template>

<script>
import { onMounted, watch, ref, computed, nextTick, getCurrentInstance, inject } from 'vue'

export default {
    name: 'ts-select-option',
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {},
        disabled: {
            type: Boolean,
            default: false
        },
        line: {
            type: Boolean,
            default: false
        }
    },
    setup(props, { parent }) {
        const _this = getCurrentInstance().proxy
        const isActive = ref(false)
        // parent.options.push(_this)
        // parent.optionsCount++


        const options = inject('options')
        let optionsCount = inject('optionsCount')
        let changeCurOption = inject('changeCurOption')

        options.value.push(_this)
        optionsCount.value += 1

        const onSelect = () => {
            if (props.disabled) return
            // if (props.value === parent.curValue) {
            //     parent?.closeDropdown()
            // }
            // const key = 'isActive'
            // parent.$children?.forEach((child) => {
            //     if (Object.hasOwnProperty.call(child, key)) {
            //         child[key] = false
            //     }
            // })
            // isActive.value = true
            // parent.curValue = props.value
            changeCurOption && changeCurOption(props.value)
        }

        return {
            isActive,
            onSelect
        }
    }
}
</script>

<style lang="scss" scoped>
.ts-select-dropdown-container-item {
    width: 268px;
    height: 28px;
    line-height: 28px;
    color: rgba(255, 255, 255, 0.80);
    font-size: 12px;
    //border-radius: 4px;
    padding: 0 15px;

    &:hover {
        background: #171717;
    }


    &.line {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
}


.is-disabled {
    cursor: not-allowed;
    opacity: .5;
}

.active {
    color: #F5D228;
}
</style>
