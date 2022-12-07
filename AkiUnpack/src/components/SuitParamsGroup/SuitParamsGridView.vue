<template>
    <div class="ClaPresettingGrid">
        <template v-for="(it, index) in items || []">
            <div
                :key="index"
                class="claItemBox"
                :style="{paddingLeft: getMarginLeft(index)+'px', paddingRight: getMarginRight(index)+'px'}"
                @click="onItemClick(it, index)"
                @mousedown="mouseDownIndex = index"
                @mouseup="mouseDownIndex = -1">
                <div class="item-container"
                     :class="{
                        // select: isSelect(it),
                        'border-primary-style-hover': mouseDownIndex === index,
                        'select': mouseDownIndex === index
                    }"
                >
                    <img
                        :src="it.iconPath"
                        class="claImg"

                    />
                    <!--new图标-->
                    <template v-if="it.new">
                        <img :src="it.new"
                             class="newIcon">
                    </template>
                    <div class="claName"
                         :class="{
                        'background': index >= 1
                     }"
                    > {{ it.name | filterFormatName }}
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>

import { debounce } from 'lodash'
import path from '@/qt-ipc/path'
import { joinResourcesPath } from '@/utils/findLocalPath'
import FileUtils from '@/utils/FileUtils'

export default {
    name: 'SuitParamsGridView',
    data() {
        return {
            mouseDownIndex: 0
        }
    },
    props: {
        items: Array,
        itemSize: {
            type: Object,
            default: () => {
                return { w: 47.6, h: 47.6 }
            }
        },
        initSelectPath: String
    },
    watch: {
        initSelectPath: {
            handler(val) {
                this.initSelectIndex(val)
            },
            immediate: true
        },
        items: {
            handler(val) {
                this.initSelectIndex(this.initSelectPath)
            },
            immediate: true
        }
    },
    filters: {
        filterFormatName(value) {
            if (value.length >= 10) {
                // ... 名字过滤器
                let start = value.substr(0, 4)
                let end = value.substr(value.length - 2, 2)
                return `${start} ... ${end}`
            }
            return value
        }
    },
    methods: {
        getMarginLeft(index) {
            if (index % 5 === 0) {
                return 0
            } else {
                return 3
            }
        },
        getMarginRight(index) {
            if (index / 4 === 1) {
                return 0
            } else {
                return 3
            }
        },
        reset() {
            this.mouseDownIndex = 0
        },
        initSelectIndex(selectPath) {
            let index = 0
            this.mouseDownIndex = 0
            if (this.items && selectPath) {
                for (const item of this.items) {
                    if (item && item.path) {
                        if (selectPath === item.path) {
                            this.mouseDownIndex = index
                            break
                        }
                    }
                    index++
                }
            }
            console.log('mouseDownIndex : ' + this.mouseDownIndex + ' initSelectPath : ' + this.initSelectPath)
        },
        onItemClick: debounce(async function (it, index) {
            console.log(`makeup onItemClick:}`)
            this.mouseDownIndex = index
            this.$emit('onItemClick', [it])
        }, 50, {
            'leading': true
        }),
        async iconFullPath(item) {
            const prefix = await joinResourcesPath('effect/makeupIcons/')
            const innerPath = await path.join(prefix, item.iconPath || '')
            const isExist = await FileUtils.isFileExist(innerPath)
            let sPath = ''//this.isInner ? : ""
            if (isExist) {
                sPath = 'file://' + innerPath
                return sPath
            }
            sPath = item.iconPath
            return sPath
        }
    }
}
</script>

<style lang="scss" scoped>
$boxWidth: 61px;
$boxHeight: 61px;

.ClaPresettingGrid {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    margin-top: 5px;

    .select {
        border-width: 1px;
        border-style: solid;
        box-sizing: border-box;
    }


    .claItemBox {
        width: 48.5px;
        height: 48.5px;
        margin-bottom: 8px;
        aspect-ratio: 1 / 1;
        display: flex;
        flex-direction: row;
        position: relative;
        overflow: hidden;

        .item-container {
            border-radius: 4px;
            aspect-ratio: 1 / 1;
            display: flex;
            flex-direction: row;
            position: relative;
            overflow: hidden;

            .claImg {
                object-fit: cover;
                background: grey;
                height: 100%;
            }

            .newIcon {
                width: 18px;
                height: 8px;
                position: absolute;
                left: 0;
            }

            .claName {
                position: absolute;
                bottom: 0px;
                height: 18px;
                font-size: 11px;
                color: rgba(255, 255, 255, 0.85);
                text-align: center;
                line-height: 20px;
                font-weight: 400;
                width: 100%;
            }

            .background {
                background-image: linear-gradient(#cc000000, #000000);
            }
        }

    }
}
</style>

