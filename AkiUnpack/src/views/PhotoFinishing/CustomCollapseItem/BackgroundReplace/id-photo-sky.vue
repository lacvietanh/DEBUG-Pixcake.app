<!--换天空 天空选择模块-->
<template>
    <div>
        <div class="sky-button-component"
             ref="skyChoose"
        >
            <el-button
                class="sky-show-select-button"
                ref="skyButton"
                :disabled="!haveSky"
                :style="{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),'+`url(${imgUrl})`,backgroundSize: 'cover' }"
                @click="skyButtonClick"
                @mousedown.native="onMousedown"
                >
                {{haveSky?skyName:'未检测到天空' }}
                <i class="el-icon-arrow-right sky-button-icon"
                   :style="{transform: 'rotate('+`${skyIconRotate}`+'deg)'}"/>
            </el-button>
        </div>

        <SkyReplacePanel
            ref="'skyPanel"
            :visible.sync="showSkySelect"
            :style="{ zIndex: 1001, top: `${panelTopPosition}`+'px', right: `${panelRightPosition}`+'px'}"
            :currentPath="skyPath"
            @on-blur="$emit('on-blur')"
            @on-focus="$emit('on-focus')"
            @on-change-choose="changeChooseItem"
            @on-change="(params, cParams, opt, ext) => $emit('on-change', params, cParams, opt, ext)"
            @on-init-button="initButton"
        />

    </div>
</template>

<script>
import {computed, defineComponent, ref} from 'vue'
import TsNumberPlaceholder from 'components/TsNumberPlaceholder'
import {Button} from 'element-ui'
import SkyReplacePanel from './id-photo-sky-panel'
import EffectModel from '@/model/EffectsModel/EffectModel'
import {EffectNameEnum} from '@/constants/presetParams/ParamEnum'
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'

const pathKey = EffectModel.identify(EffectNameEnum.Sky)

export default defineComponent({
    name: 'id-photo-sky',

    components: {
        SkyReplacePanel,
        TsNumberPlaceholder,
        'el-button': Button,
    },

    props: {
        haveSky: {
            type: Boolean,
            value: false
        }
    },

    setup(){
        const {PointSkyChoose} = useParamsPointsRepositories()
        return {
            PointSkyChoose
        }
    },

    mounted() {
        window.addEventListener('scroll',this.handleScroll,true)
        window.addEventListener('resize',this.handleResize,true)
    },
    beforeDestroy () {
        window.removeEventListener('scroll', this.handleScroll,true)
        window.removeEventListener('resize', this.handleResize,true)
    },
    data() {
        return {
            skyPath: '',
            showSkySelect: false,
            imgUrl: require('../../../../assets/icons/sky_img_default@3x.png'),
            panelTopPosition: 0,
            panelRightPosition: 0,
            isAutoClose: false,
            inPanel: false,
            skyName:'天空选择',
            skyIconRotate: 0
        }
    },
    watch: {
        skyPath(val) {
            let isEmpty = (val != "")
            this.$emit('on-modify', isEmpty)

            if (!isEmpty) {
                this.showSkySelect = false
            }
        },

        showSkySelect(val) {
            this.skyIconRotate = 0
            if(val){
                this.skyIconRotate = 90
            }
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
        handlePanelPosition(){
            if (this.showSkySelect) {
                let space = 8
                let bottomSpace = 15
                let panelHeight = 440;
                let positionTop = this.$refs.skyChoose.getBoundingClientRect().top
                let bottom_distance = document.documentElement.clientHeight - this.$refs.skyChoose.getBoundingClientRect().bottom
                let buttonHeight = this.$refs.skyChoose.getBoundingClientRect().height
                let maxBottom = window.innerHeight - panelHeight
                this.panelRightPosition = 60

                if (bottom_distance >= panelHeight) {
                    this.panelTopPosition = positionTop + buttonHeight + space
                    this.panelTopPosition = (this.panelTopPosition < 0) ? 0 : this.panelTopPosition
                } else {
                    if (this.$refs.skyChoose.getBoundingClientRect().top > panelHeight) {
                        this.panelTopPosition = positionTop - panelHeight - space
                        this.panelTopPosition = (this.panelTopPosition > maxBottom) ? maxBottom : this.panelTopPosition
                    } else {
                        this.panelRightPosition = 345
                        this.panelTopPosition = window.innerHeight - panelHeight - bottomSpace
                    }
                }
            }
        },

        handleScroll(){
            //console.log('touch scroll change event!!')
            this.handlePanelPosition()
        },

        handleResize(){
            //console.log('trust handle resize event!!!!')
            this.handlePanelPosition()
        },

        reset() {
            this.skyPath = ''
            this.skyName = ''
            this.imgUrl = require('../../../../assets/icons/sky_img_default@3x.png')

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }

            //console.log('this sky path is: ', this.skyPath)
            extInfo.labName = "换天空"
            extInfo.optDesc = '重置'

            const data = {[pathKey]: this.skyPath}
            let params = {[pathKey]: this.skyPath}
            this.$emit('on-change', data, params, 'manual', JSON.stringify(extInfo))
        },

        init(data) {
            if (Object.hasOwnProperty.call(data, pathKey)) {
                this.skyPath = data[pathKey]
                if(this.skyPath != ''){
                    return
                }
            }

            this.showSkySelect = false
            this.skyPath = ''
            this.imgUrl = require('../../../../assets/icons/sky_img_default@3x.png')
            this.$emit('on-modify', false)
        },

        onMousedown() {
            if (this.showSkySelect) {
                this.isAutoClose = true
            }
        },

        skyButtonClick() {
            if (this.isAutoClose) {
                this.isAutoClose = false
                return
            }

            this.showSkySelect = !this.showSkySelect
            if (this.showSkySelect) {
                this.handlePanelPosition()
            }
        },

        changeChooseItem(item) {
            this.chooseTitle = item.name
            this.skyPath = item.path
            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }

            extInfo.labName = "换天空"
            extInfo.optDesc = item.name
            this.skyName = item.name?item.name:'天空选择'

            const data = {[pathKey]: this.skyPath}
            let params = {[pathKey]: this.skyPath}
            this.$emit('on-change', data, params, 'manual', JSON.stringify(extInfo))

            this.PointSkyChoose(item.name)
        },

        initButton(iconPath,iconName){
            this.skyName = iconName?iconName:'天空选择'
            if(iconPath == ''){
                this.imgUrl = require('../../../../assets/icons/sky_img_default@3x.png')
            }else {
                this.imgUrl = require('../../../../assets/icons/' + iconPath)
                this.handlePanelPosition()

            }
        }
    }
})
</script>


<style lang="scss" scoped>

.sky-button-component {
    margin-top: 16px;
    margin-bottom: 14px;
    width: 268px;
    height: 38px;

    .sky-show-select-button {
        width: 268px;
        height: 38px;
        border-radius: 4px;
        text-align: left;
        font-family: 'PingFang SC';
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 17px;
        background-size: cover !important;

        .sky-button-icon {
            position:sticky;
            left: 252px;
        }

        .el-icon-arrow-right{
            width:16px;
            margin-right: -12px !important;
        }
    }

}

</style>
