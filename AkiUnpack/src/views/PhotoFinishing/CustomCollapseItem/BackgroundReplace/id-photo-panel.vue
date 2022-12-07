<template>
    <div
        v-if="visible"
        class="id-photo-panel-container">
        <div class="id-photo-panel-container-header">
             <span @click="closePanel">
                    <i class="el-icon-arrow-left"></i>
                    证件照
             </span>
        </div>

        <div class="id-photo-panel-container-content global__scroll-style">
            <div class="id-photo-panel-container-background">
				<el-radio-group
					slot="reference"
					size="mini"
					class="ts-custom__radio-group radio-group"
					@change="$emit('onActiveSourceChange',$event)"
					v-model="activeSourceTab">
					<el-radio-button class="radio-button" :label="0">推荐背景</el-radio-button>
					<el-radio-button class="radio-button" :label="1">我的背景</el-radio-button>
				</el-radio-group>
                <div class="title">
                    背景选择
                </div>

                <ul class="id-photo-panel-container-background-list">
					<template v-if="activeSourceTab == 0">
						<template v-for="(item, i) in backgroundList">
							<li
								class="list-item"
								:key="i"
								@click="onChangeBackgroundPath(item)"
								:style="{ marginRight: getMarginRight(i)+'px' }"
							>
								<i v-if="item.new" class="ts-icon ts-icon-new"></i>
								<img
									class="img"
									:class="{ active: currentPath === item.path }"
									:src="item.iconPath"
									alt=""
								/>
								<span class="name">{{ filterFormatName(item.name) }}</span>
							</li>
						</template>
					</template>
					<template v-if="activeSourceTab == 1">
						<template v-for="(item, i) in mineIdBackgroundList">
							<li
								class="list-item"
								:key="i"
								@click="onChangeBackgroundPath(item,$event)"
								:style="{ marginRight: getMarginRight(i)+'px' }"
								@click.right.exact="handleNodeContextmenu(item)"
							>
								<i v-if="item.new" class="ts-icon ts-icon-new"></i>
								<img
									class="img"
									:class="{selected:item.isSelected && currentPath != item.path,active: currentPath === item.path}"
									:src="getIconPath(item)"
									alt=""
								/>
								<span class="name">{{ filterFormatName(item.name) }}</span>
							</li>
						</template>
					</template>
                </ul>
            </div>

            <div class="ts-divider"/>

            <div class="id-photo-panel-container-detail-optimization">
                <div class="title">
                    细节优化
                </div>

                <!--            <div class="slider-wrapper">-->
                <!--                <div class="label">-->
                <!--                    <span-->
                <!--                        class="name"-->
                <!--                        v-gtag-dbl-event="tsGtag.PointDoubleClickTitle"-->
                <!--                        @dblclick="onResetSingle(SliderEnum.Beta)"-->
                <!--                    >毛发调整</span>-->
                <!--                    &lt;!&ndash;                    <span&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        v-if="!isClicked"&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        class="percent"&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        @click="onLabelClick($event, {filterPath, filterAlpha})">&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        0&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    </span>&ndash;&gt;-->
                <!--                    <span-->
                <!--                        class="value"-->
                <!--                        v-if="!(currentManualTarget === SliderEnum.Beta)"-->
                <!--                        @click="onSliderValueClick($event, SliderEnum.Beta)"-->
                <!--                    >{{ panelBeta }}</span>-->
                <!--                </div>-->

                <!--                <div class="flex-box">-->
                <!--                    <ts-slider-->
                <!--                        class="slider"-->
                <!--                        :min="0"-->
                <!--                        :max="100"-->
                <!--                        :disabled="!currentPath"-->
                <!--                        v-model="panelBeta"-->
                <!--                        :show-tooltip="false"-->
                <!--                        v-gtag-dbl-event="tsGtag.PointDoubleClickDot"-->
                <!--                        @change="onChangeBackgroundBeta"-->
                <!--                        @ondblclick="onResetSingle(SliderEnum.Beta)"-->
                <!--                    ></ts-slider>-->
                <!--                </div>-->
                <!--            </div>-->

                <div class="slider-wrapper">
                    <div class="label">
                    <span
                        class="name"
                        v-gtag-dbl-event="tsGtag.PointDoubleClickTitle"
                        @dblclick="onResetSingle(SliderEnum.Gamma)"
                    >边缘调整</span>
                        <!--                    <span-->
                        <!--                        v-if="!isClicked"-->
                        <!--                        class="percent"-->
                        <!--                        @click="onLabelClick($event, {filterPath, filterAlpha})">-->
                        <!--                        0-->
                        <!--                    </span>-->

                        <ts-number-placeholder
                            class="percent"
                            :min="0"
                            :max="100"
                            :value="panelGamma"
                            @on-blur="$emit('on-blur')"
                            @on-focus="$emit('on-focus')"
                            @change="onLabelChange"
                        />
                    </div>

                    <div class="flex-box">
                        <ts-slider
                            class="slider"
                            :min="0"
                            :max="100"
                            :disabled="!currentPath"
                            v-model="panelGamma"
                            :show-tooltip="false"
                            v-gtag-dbl-event="tsGtag.PointDoubleClickDot"
                            @change="onChangeBackgroundGamma"
                            @ondblclick="onResetSingle(SliderEnum.Gamma)"
                        ></ts-slider>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Vue, {watch, ref, computed, getCurrentInstance} from 'vue'
import store from '@/store'
import pointsMixin from '@/mixins/pointsMixin'

import TsSlider from '@/components/TsSlider'
import TsNumberPlaceholder from 'components/TsNumberPlaceholder'
import {IdPhotoMaterialSourceType} from "#/types/config";
import importIdPhotoMaterialRpc from "qt/business/import-idphoto-material";
import Menu from "qt/utils/menu";
import toast from "@/mixins/toast";
import FileUtils from "@/utils/FileUtils";

export default {
    name: 'id-photo-panel',
    components: {
        'ts-slider': TsSlider,
        TsNumberPlaceholder
    },
	mixins:[toast],
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        currentPath: {
            type: String,
            default: ''
        },
        currentGamma: {
            type: Number,
            default: 0
        },
		sourceType:{
			type: Number,
			default: 0
		}
        // currentBeta: {
        //     type: Number,
        //     default: 0
        // }
    },
	watch:{
		sourceType:{
			handler: function (value,old){
					if (value == IdPhotoMaterialSourceType.Mime){
						store.dispatch('presetSuit/ACT_FindMineIdPhotoBgList',{isShort:false})
					}
					this.activeSourceTab = value
				},
			immediate:true
		}
	},
	setup(props, { emit }) {
    	let instance = getCurrentInstance()
    	let activeSourceTab = ref(0)
        // 组合式API不能用mixins
        const PointsMixinConstructor = Vue.extend(pointsMixin)
        const tsGtag = new PointsMixinConstructor()
        const getMarginRight = (index) => {
            if ((index + 1) % 4) {
                return 8
            } else {
                return 0
            }
        }
        const closePanel = () => {
            emit('update:visible', false)
        }

        const backgroundList = computed(() => store.getters['presetSuit/backgroundList'])
		const mineIdBackgroundList = computed(() => {
			const items = store.getters['presetSuit/mineIdPhotoList']
			return items
		})

        const onChangeBackgroundPath = (item,event) => {
            // emit('update:currentPath', item.path)
            emit('on-change-background-path', item,event)
        }
        const currentPathComputed = computed(() => {
            return props.currentPath
        })
        const currentGammaComputed = computed(() => {
            return props.currentGamma
        })
        // const currentBetaComputed = computed(() => {
        //     return props.currentBeta
        // })
        const panelGamma = ref(0)
        // const panelBeta = ref(0)
        watch(currentGammaComputed, (v) => {
            panelGamma.value = v
        })
        // watch(currentBetaComputed, (v) => {
        //     panelBeta.value = v
        // })
        const onChangeBackgroundGamma = (v) => {
            emit('update:currentGamma', v)
            emit('on-change-background-gamma')
        }
        // const onChangeBackgroundBeta = (v) => {
        //     emit('update:currentBeta', v)
        //     emit('on-change-background-beta')
        // }

        /*
            手动修改滑竿数值
         */
        const SliderEnum = {
            None: -1, // 无
            Gamma: 0
            // Beta: 1,
        }

        const onLabelChange = (value) => {
            if (value !== panelGamma.value) {
                panelGamma.value = value
                onChangeBackgroundGamma(panelGamma.value)
                tsGtag.PointManualModifyComplete()
            }
        }

        /*
            双击返回默认值
         */
        const onResetSingle = (target) => {
            if (!currentPathComputed.value) return
            const obj = backgroundList.value.find(item => item.path === currentPathComputed.value)
            if (target === SliderEnum.Gamma) {
                if (currentGammaComputed.value === obj.value) return
                onChangeBackgroundGamma(obj.value)
            }
            // else {
            //     if (currentBetaComputed.value === obj.value) return
            //     onChangeBackgroundBeta(obj.value)
            // }
        }
		const  getIconPath = (item)=>{
			if (item.isOriginal){
				return item.fullIconPath
			}
			const strEncodePath = FileUtils.encodeURIComponent(item.fullIconPath)
			const strIconPath = (instance.proxy.$isDev?"tsFile://":"file://") +  strEncodePath
			return strIconPath
		}
		const onDeleteMaterialMineIdPhoto=(item)=>{
			let selectedItemIds = []
			let mineIdPhotoList = store.getters['presetSuit/mineIdPhotoList']
			let isFound = false
			for (const it of mineIdPhotoList) {
				if (!it.isOriginal && it.sourceType == IdPhotoMaterialSourceType.Mime && it.isSelected){
					selectedItemIds.push(it.localMaterialId)
					if (it.localMaterialId == item.localMaterialId){
						isFound = true
					}
				}
			}
			if (!isFound){
				selectedItemIds.push(item.localMaterialId)
			}
			instance.proxy.tsConfirm({
				title: '',
				customMessageStyle: 'textAlign: center',
				message: `确认删除${selectedItemIds.length}个背景`
			}).then(async _ => {
				await store.dispatch('presetSuit/ACT_BatchDeleteMineIdPhotoBgList',selectedItemIds)
				await importIdPhotoMaterialRpc.deleteItems(selectedItemIds)
			}).catch(() => {

			})
		}
		const handleNodeContextmenu = (item)=>{
			const menu = new Menu()
			menu.push({
				label: '删除',
				action: 'batch-delete',
				disabled: false,
				data: item,
				callback: onDeleteMaterialMineIdPhoto
			}).show()
		}
    function filterFormatName(value) {
      if (value.length >= 10) {
        // ... 名字过滤器
        let start = value.substr(0, 4)
        let end = value.substr(value.length - 2, 2)
        return `${start} ... ${end}`
      }
      return value
    }
        return {
			activeSourceTab,
            getMarginRight,
            closePanel,
            backgroundList,
			mineIdBackgroundList,
            onChangeBackgroundPath,
            onChangeBackgroundGamma,
			onDeleteMaterialMineIdPhoto,
			handleNodeContextmenu,
            // onChangeBackgroundBeta,
            panelGamma,
            // panelBeta,

            SliderEnum,
            onLabelChange,

            onResetSingle,
            tsGtag,
			getIconPath,
          filterFormatName
        }

    }
}
</script>

<style lang="scss" scoped>
.id-photo-panel-container {
    width: 300px;
    box-sizing: border-box;
    position: fixed;
    right: 45px;
    bottom: 0;
    top: 48px;
    z-index: 1000;
    background-color: #282828;

    .title {
        height: 28px;
        line-height: 28px;
        font-weight: 500;
        font-size: 12px;
        color: #D9D9D9;
    }

    &-header {
        height: 38px;
        line-height: 38px;
        font-size: 12px;
        font-weight: 500;
        color: #D9D9D9;
        padding: 0 15px;
        border-bottom: 1px solid #1E1E1E;

        &:hover {
            color: #ffffff;
        }

        .el-icon-arrow-left {
            font-size: 14px;
        }
    }

    &-content {
        height: calc(100% - 38px);
        overflow-y: overlay;
        overflow-x: hidden;
        padding-bottom: 20px;
        box-sizing: border-box;
    }

    &-background {
        padding: 0 15px;
		.radio-group{
			width: 100%;
			margin-top: 4px;
			.radio-button{
				width: 50%;
				/deep/ .el-radio-button__inner{
					width: 100%;
				}
			}
		}
        &-list {
            display: flex;
            flex-wrap: wrap;

            .list-item {
                position: relative;
                width: 61px;
                aspect-ratio: 1 / 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-bottom: 8px;

                .ts-icon-new {
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    width: 23px;
                    height: 10px;
                    padding: 0 0;
                    pointer-events: none;
                }

                .img {
                    width: 59px;
                    height: 59px;
                    border: 1px solid transparent;
                    background-color: transparent;
                    border-radius: 4px;
                    margin-bottom: 2px;
                }

                .name {
                    text-align: center;
                    height: 14px;
                    line-height: 14px;
                    font-size: 10px;
                }

                .active {
                    border-color: #F5D228;
                    padding: 1px;
                    width: 57px;
                    height: 57px;
                }
				.selected{
					border-color: #FFFFFF;
					padding: 1px;
					width: 57px;
					height: 57px;
				}
            }
        }
    }

    .ts-divider {
        width: calc(100% - 32px);
        margin-left: 16px;
        height: 1px;
        background-color: #333333;
    }

    &-detail-optimization {
        margin-top: 8px;
        padding: 0 15px;

        .title {
            color: #D9D9D9;
            font-weight: 500;
        }

        .label {
            height: 24px;
            line-height: 24px;
            display: flex;
            justify-content: space-between;
        }

        .value {
            &:hover {
                color: #2D6B96;
            }
        }

        .slider-wrapper {
            display: flex;
            flex-direction: column;
            height: 38px;
            font-size: 12px;
            color: #A6A6A6;
            line-height: 38px;
            font-weight: 900;
            box-sizing: border-box;

            .flex-box {
                display: flex;
                width: 100%;
                align-items: center;
                height: 12px;

                /deep/ {

                    .el-slider {
                        position: relative;

                        .el-slider__runway {

                            .el-slider__button-wrapper {
                                height: 16px;
                                width: 16px;
                                top: -8px;
                                line-height: 16px;
                            }
                        }
                    }

                }

                .slider {
                    position: relative;
                    margin: 0 7px;
                    flex: 1;

                    /deep/ {
                        .el-slider__input.el-input-number--mini {
                            width: 39px;
                            height: 22px;

                            .el-input--mini .el-input__inner {
                                height: 22px;
                                line-height: 22px;
                                font-size: 12px;
                                padding-left: 3px;
                                padding-right: 3px;
                            }
                        }

                        .el-slider__runway.show-input {
                            margin-right: 50px;
                        }

                        .el-slider__bar {
                            margin-left: -7px;
                        }

                        .el-slider__runway::after {
                            position: absolute;
                            content: " ";
                            background: transparent;
                            width: calc(100% + 14px);
                            height: 12px;
                            top: calc(50% - 6px);
                            left: -7px;
                            right: 0;
                            border-radius: 3px;
                        }

                        .el-slider__button-wrapper {
                            height: 16px;
                            width: 16px;
                            top: -7px
                        }
                    }
                }

                .slider /deep/ .el-slider__runway:before {
                    position: absolute;
                    content: " ";
                    background: inherit;
                    width: calc(100% + 14px);
                    height: 2px;
                    top: calc(50% - 1px);
                    left: -7px;
                    right: 0px;
                    border-radius: 3px;
                }
            }
        }
    }
}
</style>
