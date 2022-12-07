<template>
    <div class="ts-slider-group-lock-icon" :class="{ locked: isLock }" @click="switchLockState">
      <img class="img" :src="lockIconUrl" alt="">
    </div>

</template>
<script>
export default {
    props: {
        isLock: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            lockIconUrl: this.getLockIconUrl(this.isLock)
        }
    },
    methods: {
        switchLockState() {
            this.$emit('update:isLock', !this.isLock)
            this.$emit('click', !this.isLock)
        },
        getLockIconUrl(lockState) {
            return lockState ? this.$getIconPath('toolbar_icon_link_turn_on@3x.png') : this.$getIconPath('toolbar_icon_link_shut_down@3x.png')
        }
    },
    watch: {
        isLock(val) {
            this.lockIconUrl = this.getLockIconUrl(val)
        }
    }
}
</script>
<style lang="scss" scoped>
.ts-slider-group-lock-icon {
    width: 8px;
    height: 14px;
    line-height: 14px;
    margin: 0 11px;
    padding: 4px;
    cursor: pointer;
    background-size: 100%;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 2px;

    &.locked {
        background: #3b3b3b;
        border: 1px solid #333333;
    }

    .img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

}


</style>
