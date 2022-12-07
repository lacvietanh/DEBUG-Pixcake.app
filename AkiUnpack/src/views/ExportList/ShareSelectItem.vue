<template>
    <div class="item-container" @click="onClickItem(item)">
        <img class="template-suit-cover"
             :src="finalImageData"
             v-if="finalImageData"/>
        <div v-else
             v-loading="true"
             class="ts-loading-spinner"/>
        <template v-if="finalImageData">
            <div class="mask" v-show="item.isSelectShare">
                <img class="export-select-icon" :src="$getIconPath('pop_icon_selected@3x.png')"/>
            </div>
            <div class="mask" v-show="!item.isSelectShare">
                <img class="export-select-icon" :src="$getIconPath('pop_icon_unselected@3x.png')"/>
            </div>
        </template>

    </div>
</template>

<script>

export default {
    name: 'ShareSelectItem',
    data() {
        return {
            finalImageData: null,
        }
    },
    props: {
        item: null,
    },
    beforeDestroy() {
        this.finalImageData = null
    },
    methods: {
        loadImageData(data) {
            this.finalImageData = data
        },
        onClickItem(item) {
            this.$emit('onClickItem', item)
        }
    }
}
</script>

<style lang="scss" scoped>

.item-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .mask {
        position: absolute;
        width: 62px;
        height: 62px;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        border-radius: 4px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        box-sizing: border-box;

        .export-select-icon {
            width: 12px;
            height: 12px;
            margin: 2px;
        }
    }

    .template-suit-cover {
        width: 62px;
        height: 62px;
        object-fit: cover;
        border-radius: 10px;
        padding: 6px;
    }


    //设置菊花
    .ts-loading-spinner {
        width: 74px;
        height: 74px;
        border-radius: 10px;
        background-color: #232324;
        position: relative;
        overflow: visible;
        display: flex;
        align-items: center;

        /deep/ {
            .el-loading-mask {
                position: relative;
                background-color: transparent;
                margin: 0 2px;
            }

            .el-loading-spinner {
                position: relative;
                top: unset;
                left: 30px;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                border: 2px solid #ffffff40;
                margin-top: 0;

                .circular {
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    left: -3px;
                    top: -3px;

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
