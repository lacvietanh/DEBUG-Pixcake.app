<template>
    <div class="sky-panel-component"
         v-show="show"
         v-mousedownoutside="clickoutsidePanel"
         @mouseenter="stopMousePropagation(true)"
         @mouseleave="stopMousePropagation(false)"
    >
        <div class="sky-div">
            <el-select
                size="mini"
                class="sky-select"
                placeholder="所有天空"
                popper-class="sky-select-option"
                :popper-append-to-body="true"
                v-model="cacheType"
                @visible-change="[foucuSelect = $event, stopMousePropagation($event)]"
                @change="skySelectChange"
            >
                <el-option
                    class="sky-select-item"
                    v-for="(item) in skyAllType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
            </el-select>
            <span class="right_icon">
                        <img :src="$getIconPath('icon_arrow_up.png')" alt="">
                        <img :src="$getIconPath('icon_arrow_down.png')" alt="">
                    </span>
        </div>

        <div class="sky-container global__scroll-style"
             @mouseenter="stopMousePropagation(true)"
             @mouseleave="stopMousePropagation(false)"
        >
            <template v-for="(column, i) in skyColumnFormat">
                <div class="sky-column" :key="i">
                    <template v-for="(it, index) in column || []">
                        <div
                            :key="index"
                            class="claItemBox"
                            @click="onChangePath(it, index)">
                            <div class="item-container"
                                 :class="{
                                    'border-primary-style-hover': it.path === skyPath,
                                    'select': it.path === skyPath
                               }">
                                <i v-if="it.new" class="ts-icon ts-icon-new"></i>
                                <img
                                    v-else
                                    :src="it.iconPath"
                                    class="claImg"/>
                            </div>
                        </div>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import useParamsPointsRepositories from "@/composables/points/useParamsPointsRepositories";
import {convertToMultArray} from "@/utils/utils";

import {computed, defineComponent} from 'vue'
import TsNumberPlaceholder from 'components/TsNumberPlaceholder'
import TsSelect from 'components/TsSelect'
import TsSelectOption from 'components/TsSelect/src/ts-select-option'
import {Option, Select} from 'element-ui'
import EffectModel from '@/model/EffectsModel/EffectModel'
import {EffectNameEnum} from '@/constants/presetParams/ParamEnum'
import store from '@/store'
import useFocusAndBlurRepositories from '@/composables/useFocusAndBlurRepositories'
import mousedownoutside from '@/directives/mousedownoutside'

const pathKey = EffectModel.identify(EffectNameEnum.Sky)
const lastBeautifyParams = computed(() => store.getters['refine/lastBeautifyParams'])

export default defineComponent({
    name: "SkyReplacePanel",

    components: {
        TsSelectOption,
        TsSelect,
        TsNumberPlaceholder,
        'el-select': Select,
        'el-option': Option,
    },

    props: {
        currentPath: {
            type: String,
            default: ''
        },

        visible: {
            type: Boolean,
            default: false
        }
    },

    directives:{
        mousedownoutside
    },

    setup() {
        const {stopMousePropagation} = useFocusAndBlurRepositories()
        return {
            stopMousePropagation
        }
    },
    data() {
        return {
            skyPath: '',
            show: this.visible,
            foucuSelect: false,
            cacheType: '所有天空',
            imgUrl: require('../../../../assets/icons/sky_img_default@3x.png')
        }
    },
    computed: {
        skyList() {
            return this.$store.getters['presetSuit/skyList']
        },
        skyPathCache() {
            return this.$store.getters['project/skyPathCache']
        },
        skyColumnFormat() {
            let filterList = []
            if (this.cacheType == '所有天空') {
                filterList = this.skyList
            } else if (this.cacheType) {
                this.skyList.forEach(element => {
                    if (element.type == this.cacheType || element.name == '无') {
                        filterList.push(element)
                    }
                })
            }
            return convertToMultArray(filterList, 3)
        },

        skyAllType() {
            let skyType = []
            let skyItem = {value: '所有天空', label: '所有天空'}
            skyType.push(skyItem)

            this.skyList.forEach((element) => {
                if (element.type) {
                    if (!skyType.some(item => item.label === element.type)) {
                        skyType.push({value: element.type, label: element.type})
                    }
                }
            })
            return skyType
        }
    },

    watch: {
        currentPath(news,olds){
            let backgroundIcon = ''
            let backgroundName = ''
            this.skyList.forEach((element) => {
                if (element.path == news ) {
                    backgroundIcon = element.bgIcon
                    backgroundName = element.name
                }
            })
            this.$emit('on-init-button',backgroundIcon, backgroundName)
            this.skyPath = news

        },
        skyPath(val) {
            let isEmpty = (val != "")
            this.$emit('on-modify', isEmpty)

        },

        visible(val) {
            this.show = val
        },

        show(val) {
            this.$emit('update:visible', val)
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
        clickoutsidePanel() {
            if (this.foucuSelect) {
                return
            }

            if (this.show) {
                console.log('clickoutsidePanel')
                this.show = false
            }
        },

        onResetSingle() {
            const obj = this.skyList.find(item => item.path === this.skyPath)
            if (this.filterAlpha === obj.value) {
                return
            }

            this.onChangeAlpha(obj.value)
        },

        onChangePath(item, index) {
            this.skyPath = item.path
            this.$emit('on-change-choose', item)
        },

        skySelectChange(data) {
            this.cacheType = data
        },

        reset() {
            this.skyPath = ''
            this.imgUrl = require('../../../../assets/icons/sky_img_default@3x.png')

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }

            extInfo.labName = "换天空"
            extInfo.optDesc = '重置'
            //
            const data = {[pathKey]: this.skyPath}
            let params = {[pathKey]: this.skyPath}
            this.$emit('on-change', data, params, 'manual', JSON.stringify(extInfo))
        },

        init(data) {
            let val = lastBeautifyParams.value
            if (Object.hasOwnProperty.call(data, pathKey)) {
                const value = data[pathKey]
                this.skyPath = value


                return
            }

            this.skyPath = ''
            this.$emit('on-modify', false)
        }
    }
})

</script>

<style lang="scss" scoped>

.sky-select-option {
    border-radius: 4px;

    .sky-select-item {
        height: 36px;
        font-size: 12px;
        line-height: 36px;
        height: 36px;
    }

}

.sky-panel-component {
    position: fixed;
    box-sizing: border-box;
    width: 268px;
    height: 440px;
    margin-left: -285px;
    //left: 316px;
    //top: 12px;
   // z-index: 9999;

    background: #232324;
    border: 0.5px solid #555555;
    box-shadow: 0px 2px 33px rgba(0, 0, 0, 0.5);
    border-radius: 8px;

    .sky-div {
        width: 244px;
        height: 20px;
        border-radius: 4px;
        margin-left: 12px;
        margin-top: 12px;
        background-color: transparent;

        .sky-select {
            background-color: #393939;
            border-radius: 4px;
            width: 238px;

            /deep/ {
                .el-input__inner {
                    height: 24px;
                    line-height: 24px;
                }

                .el-input__suffix .el-input__suffix-inner .el-icon-arrow-up:before {
                    content: "";
                }
            }
        }


        .right_icon {
            position: relative;
            width: 14px;
            height: 14px;
            border-radius: 4px;
            background: rgba(255, 255, 255, 0.15);
            right: -103px;
            top: -19px;
            bottom: 0;
            margin: auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            pointer-events: none;

            img:nth-of-type(1) {
                width: 10px;
                margin-bottom: -2px;
            }

            img:nth-of-type(2) {
                width: 8px;
            }
        }
    }

    .sky-container {
        height: 393px;
        margin-top: 12px;
        padding: 0px 12px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .sky-column {
        display: flex;
    }

    .claItemBox {
        margin-bottom: 8px;
        aspect-ratio: 1 / 1;
        display: flex;
        flex-direction: column;
        margin-right: 6px;

        &:last-child {
            margin-right: 0;
        }

        .item-container {
            box-sizing: border-box;
            padding: 1px;
            width: 76px;
            height: 76px;
            border-radius: 4px;
            aspect-ratio: 1 / 1;
            display: flex;
            flex-direction: row;
            position: relative;
            overflow: hidden;

            .ts-icon-new {
                position: absolute;
                left: 1px;
                top: 1px;
                width: 23px;
                height: 10px;
                padding: 0px 0px;
                pointer-events: none;
            }

            &.select {
                border-width: 2px;
                border-style: solid;
                box-sizing: border-box;
            }

            .claImg {
                border-radius: 4px;
                width: 100%;
                object-fit: cover;
                background: grey;
            }

            .original-img-container {
                width: 76px;
                height: 76px;
                border-radius: 4px;
                aspect-ratio: 1 / 1;
                display: flex;
                flex-direction: row;
                position: relative;
                overflow: hidden;
                background: #393939;
                align-items: center;
                justify-content: center;

                .original-img {
                    width: 18px;
                    height: 18px;
                }
            }

            .background {
                background-image: linear-gradient(#cc000000, #000000);
            }
        }

        .claName {
            margin-top: 4px;
            height: 14px;
            line-height: 14px;
            font-size: 10px;
            color: #A6A6A6;
            text-align: center;
            font-weight: 400;
            width: 100%;
        }

    }
}

</style>