<template>
    <div class="id-photo-container">
        <section class="id-photo-container-background">
			<el-radio-group
				slot="reference"
				size="mini"
				class="ts-custom__radio-group"
				v-model="activeSourceTab">
				<el-radio-button class="radio-button" :label="0">推荐背景</el-radio-button>
				<el-radio-button class="radio-button" :label="1">我的背景</el-radio-button>
			</el-radio-group>

			<div class="id-photo-container-background-header header"
				 :class="{'bg_loading':isIdPhotoLoading}"
			>
                <span class="header-title">背景选择</span>
                <span v-if="activeSourceTab==0 ? backgroundList.length > BACKGROUND_LENGTH -1 : mineIdPhotoCount > MINE_BACKGROUND_LENGTH-1" class="more" @click="openMorePanel">查看更多<i class="el-icon-arrow-right icon"></i></span>
            </div>
            <ul class="id-photo-container-background-list" :style="{height:listIconHeight}">
				<template v-if="activeSourceTab==0">
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
								:src="item.iconPath"
								:class="{ active: currentPath === item.path }"
							/>
							<span class="name">{{ filterFormatName(item.name) }}</span>
						</li>
					</template>
				</template>
				<template v-if="activeSourceTab==1">
					<template v-if="!isMineListEmpty">
						<li
							v-blur
							class="list-item"
							@click="onAddClick"
							:style="{ marginRight: getMineMarginRight(0)+'px' }"
							:class="{'bg_loading':isIdPhotoLoading}"
						>
							<div
								class="claImportContent">
								<el-button
									icon="el-icon-plus"
									type="text">
								</el-button>
							</div>
							<span class="name">{{ "导入背景" }}</span>

						</li>
						<template v-for="(item, i) in mineIdPhotoList">
						<li
							class="list-item"
							:class="{'bg_loading':isIdPhotoLoading}"
							:key="i"
							@click="onChangeBackgroundPath(item,$event)"
							:style="{ marginRight: getMineMarginRight(i)+'px' }"
							@click.right.exact="handleNodeContextmenu(item)"
						>
							<i v-if="item.new" class="ts-icon ts-icon-new"></i>
							<img
								class="img"
								:src="getIconPath(item)"
								:class="{selected:item.isSelected && currentPath != item.path,active: currentPath === item.path}"
							/>
							<span class="name">{{ filterFormatName(item.name) }}</span>
						</li>
					</template>
					</template>
					<id-photo-upload-fragment v-if="isMineListEmpty || isIdPhotoLoading" class="claIdPhotoUpload" :progress="progress" :isEmpty="isMineListEmpty" :showProgress="isIdPhotoLoading" @onCancel="onCancelClick" @onAdd="onAddClick"></id-photo-upload-fragment>
				</template>
            </ul>
        </section>

        <div class="ts-divider" :class="{'bg_loading':isIdPhotoLoading}"/>

        <section class="id-photo-container-detail-optimization" :class="{'bg_loading':isIdPhotoLoading}">
            <div class="id-photo-container-detail-optimization-header header">
                <span class="header-title">细节优化</span>
            </div>

            <!--            <div class="slider-wrapper">-->
            <!--                <div class="label">-->
            <!--                    <span-->
            <!--                        @dblclick="onResetSingle(SliderEnum.Beta)"-->
            <!--                        v-gtag-dbl-event="tsGtag.PointDoubleClickTitle"-->
            <!--                    >毛发调整</span>-->
            <!--                    <span-->
            <!--                        v-if="!(currentManualTarget === SliderEnum.Beta)"-->
            <!--                        @click="onSliderValueClick($event, SliderEnum.Beta)"-->
            <!--                        class="value"-->
            <!--                    >{{ currentBeta }}</span>-->
            <!--                </div>-->
            <!--                <div class="flex-box">-->
            <!--                    <ts-slider-->
            <!--                        class="slider"-->
            <!--                        :min="0"-->
            <!--                        :max="100"-->
            <!--                        :disabled="!currentPath"-->
            <!--                        :show-tooltip="false"-->
            <!--                        v-model="currentBeta"-->
            <!--                        v-gtag-dbl-event="tsGtag.PointDoubleClickDot"-->
            <!--                        @change="onChangeBackgroundBeta"-->
            <!--                        @ondblclick="onResetSingle(SliderEnum.Beta)"-->
            <!--                    ></ts-slider>-->
            <!--                </div>-->
            <!--            </div>-->

            <div class="slider-wrapper">
                <div class="label">
                    <span class="label-name">
                        <span
                            @dblclick="onResetSingle(SliderEnum.Gamma)"
                            v-gtag-dbl-event="tsGtag.PointDoubleClickTitle"
                        >边缘调整</span>
                    </span>

                    <ts-number-placeholder
                        class="percent"
                        :min="0"
                        :max="100"
                        :value="currentGamma"
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
                        :show-tooltip="false"
                        v-model="currentGamma"
                        v-gtag-dbl-event="tsGtag.PointDoubleClickDot"
                        @change="onChangeBackgroundGamma"
                        @ondblclick="onResetSingle(SliderEnum.Gamma)"
                    ></ts-slider>
                </div>
            </div>

        </section>

        <id-photo-panel
            :visible.sync="isShowPanel"
            :current-gamma.sync="currentGamma"
            :current-path="currentPath"
			:sourceType="activeSourceTab"
			@onActiveSourceChange="onActiveSourceChange"
            @on-blur="$emit('on-blur')"
            @on-focus="$emit('on-focus')"
            @on-change-background-path="onChangeBackgroundPath"
            @on-change-background-gamma="onChangeBackgroundGamma"
        />
    </div>
</template>

<script>
import Vue, {watch, ref, computed, getCurrentInstance} from 'vue'
import isEqual from 'lodash/isEqual'
import IdPhotoPanel from './id-photo-panel'
import TsSlider from '@/components/TsSlider'
import store from '@/store'
import { EffectParamEnum } from '@/constants/presetParams/ParamEnum'
import pointsMixin from '@/mixins/pointsMixin'
import EffectModel from '@/model/EffectsModel/EffectModel'
import TsNumberPlaceholder from 'components/TsNumberPlaceholder'
import {IdPhotoMaterialSourceType} from '@/universal/types/config'
import idPhotoUploadFragment from '@/views/PhotoFinishing/CustomCollapseItem/BackgroundReplace/components/id-photo-upload-fragment'
import {IdPhotoUploadStatus} from "@/store/modules/presetSuit";
import importIdPhotoMaterialRpc,{IImportIdPhotoMaterialSignalKey} from '@/qt-ipc/business/import-idphoto-material'
import {mapActions,mapMutations, mapGetters} from "vuex";
import {IdPhotoMaterialModel} from "@/model/MaterialsModel/idPhotoMaterialModel";
import {BACKGROUND_LENGTH, MINE_BACKGROUND_LENGTH} from "@/constants/material-config";
import Menu from "qt/utils/menu";
import {deletePresetClassByApi} from "@/api/settingApi";
import toast from "@/mixins/toast";
import ipcRenderer from "qt/Ipc-renderer";
import Project from "@/model/ProjectModel";
import PersonParamModel from "@/model/ParamsModel/PersonParamModel";
import FileUtils from "@/utils/FileUtils";
import useParamsPointsRepositories from '@/composables/points/useParamsPointsRepositories'

const BgReplacePath = EffectModel.identify(EffectParamEnum.BgReplacePath)

export default {
    name: 'id-photo',
    mixins:[toast],
    components: {
        IdPhotoPanel,
        TsSlider,
        TsNumberPlaceholder,
        idPhotoUploadFragment
    },
    props: {
        initParams: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    data(){
    	return {
            importStatusWatchSymbol:null,
            isIdPhotoLoading:false,
            MINE_BACKGROUND_LENGTH:MINE_BACKGROUND_LENGTH,
            BACKGROUND_LENGTH:BACKGROUND_LENGTH,
            progress:{
                current:0,
                total:1
            }
        }
    },
    setup(props, { emit }) {
    	const instance = getCurrentInstance()
        // 组合式API不能用mixins
        const PointsMixinConstructor = Vue.extend(pointsMixin)
        const tsGtag = new PointsMixinConstructor()
        const { PointSelectIdPhotoBackground } = useParamsPointsRepositories()

        const backgroundList = computed(() => store.getters['presetSuit/matchBackgroundList'](currentPath.value))
        const isMineListEmpty = computed(()=>{
            return store.getters['presetSuit/mineIdPhoto'].bgList.length == 0
        })

        const activeSourceTab = ref(IdPhotoMaterialSourceType.System)
        const getMarginRight = (index) => {
            if ((index + 1) % 5) {
                return 6
            } else {
                return 0
            }
        }
        const getMineMarginRight = (index) => {
    		const startIndex = -1
            if ((index - startIndex + 1) % 5) {
                return 6
            } else {
                return 0
            }
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

        const isShowPanel = ref(false)
        const openMorePanel = () => {
            // console.log('lmy=> openMorePanel')
            isShowPanel.value = true
        }

        const currentPath = ref('')
        const currentGamma = ref(0)
        // const currentBeta = ref(0)

        const emitChange = (changeData, operation, ext, idPhotoModelItem) => {
    		let strFinalPath = currentPath.value
    		if (idPhotoModelItem && idPhotoModelItem instanceof IdPhotoMaterialModel){
                strFinalPath = idPhotoModelItem.shortEffectPath
            }
            const data = {
                [BgReplacePath]: strFinalPath,
                [EffectParamEnum.BgReplaceGamma]: currentGamma.value
                // [EffectParamEnum.BgReplaceBeta]: currentBeta.value,
            }
            const res = {}
            for (const key in result.value) {
                if (Object.hasOwnProperty.call(result.value, key) && result.value[key] !== changeData[key]) {
                    res[key] = changeData[key]
                }
            }
            if (Object.keys(res).length > 0) {
                emit('on-change', data, changeData, operation, ext)
            }
            result.value = data
        }
        const onChangeBackgroundPath = (item,event) => {
    		if (event){
                if (event.ctrlKey || event.metaKey){
                    instance.proxy.onCommandLeftMouseClick(item,event.metaKey)
                    return;
                }
                if (event.shiftKey){
                    instance.proxy.onShiftMouseClick(item)
                    return;
                }
            }

            currentPath.value = item.path
            if (!item.path && currentGamma.value) {
                currentGamma.value = 0
            }
            let data = null
            if (activeSourceTab.value == IdPhotoMaterialSourceType.System){
            	data = backgroundList.value.find(item => item.path === currentPath.value)
            }else{
                data = instance.proxy.mineIdPhotoList.find(item => item.path === currentPath.value)
            }

            PointSelectIdPhotoBackground(data)

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }
            extInfo.labName = "证件照"
            extInfo.lab2Name = "背景"
            extInfo.optDesc = item.name

            let strFinalPath = currentPath.value
            if (item &&  item instanceof IdPhotoMaterialModel){
                strFinalPath = item.shortEffectPath
            }
            emitChange({
                [BgReplacePath]: strFinalPath,
                [EffectParamEnum.BgReplaceGamma]: currentGamma.value
                // [EffectParamEnum.BgReplaceBeta]: currentBeta.value,
            }, 'manual', JSON.stringify(extInfo),item)
        }
        const onChangeBackgroundGamma = () => {

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }
            extInfo.labName = "证件照"
            extInfo.lab2Name = "边缘调整"
            extInfo.optDesc = currentGamma.value

            emitChange({
                [EffectParamEnum.BgReplaceGamma]: currentGamma.value
            }, 'manual', JSON.stringify(extInfo))
        }
        // const onChangeBackgroundBeta = () => {
        //     emitChange({
        //         [EffectParamEnum.BgReplaceBeta]: currentBeta.value,
        //     }, 'manual')
        // }

        const result = ref({})
        const initParamsFilter = computed(() => {
            const obj = {}
            for (const key in props.initParams) {
                if (Object.hasOwnProperty.call(result.value, key)) {
                    obj[key] = props.initParams[key]
                }
            }
            return obj
        })
        const isModify = computed(() => {
            // console.log('lmy:!isEqual(result.value, initParamsFilter.value)',!isEqual(result.value, initParamsFilter.value))
            return !isEqual(result.value, initParamsFilter.value)
        })
        watch(isModify, (v) => {
            emit('on-modify', v)
        })
        const init = (data) => {
            if (Object.hasOwnProperty.call(data, BgReplacePath)) {
                currentPath.value = data[BgReplacePath]
                // 因存入效果json时候的路径带上了effect，所以此处得去掉，才能匹配上激活态
                const suffixDir = "/effect"
                const index = currentPath.value.lastIndexOf(suffixDir)
                if (index >0){
                    currentPath.value = currentPath.value.substr(0,index)
                }
                // console.log('lmy::init-data',data)
            }
            if (Object.hasOwnProperty.call(data, EffectParamEnum.BgReplaceGamma)) {
                currentGamma.value = data[EffectParamEnum.BgReplaceGamma]
            }

            result.value = {
                [BgReplacePath]: currentPath.value,
                [EffectParamEnum.BgReplaceGamma]: currentGamma.value
                // [EffectParamEnum.BgReplaceBeta]: currentBeta.value,
            }
        }

        const reset = () => {
            if (Object.hasOwnProperty.call(initParamsFilter.value, BgReplacePath)) {
                currentPath.value = initParamsFilter.value[BgReplacePath]
            }

            if (Object.hasOwnProperty.call(initParamsFilter.value, EffectParamEnum.BgReplaceGamma)) {
                currentGamma.value = initParamsFilter.value[EffectParamEnum.BgReplaceGamma]
            }

            // if (Object.hasOwnProperty.call(initParamsFilter.value, EffectParamEnum.BgReplaceBeta)) {
            //     currentBeta.value = initParamsFilter.value[EffectParamEnum.BgReplaceBeta]
            // }

            let extInfo = {
                labName: '',
                isRest: false,
                isSwitch: false,
                lab2Name: '',
                lab3Name: '',
                optDesc: ''
            }
            extInfo.labName = "背景调整"
            extInfo.optDesc = "重置"

            emitChange({
                [BgReplacePath]: currentPath.value,
                [EffectParamEnum.BgReplaceGamma]: currentGamma.value
                // [EffectParamEnum.BgReplaceBeta]: currentBeta.value,
            }, 'reset', JSON.stringify(extInfo))
        }

        /*
            手动修改滑竿数值
         */
        const SliderEnum = {
            None: -1, // 无
            Gamma: 0
            // Beta: 1,
        }

        const onSliderValueClick = (e, target = SliderEnum.Gamma) => {
            console.log("modify slider value by person ")
            if (!currentPath.value) return
            const shortcutHelper = ShortcutHelper.getInstance()
            let oldValue
            if (target === SliderEnum.Gamma) {
                oldValue = currentGamma.value
            }
            // else {
            //     oldValue = currentBeta.value
            // }
            const {createTsInput, formatInputValue} = useTsInput()
            const tsInput = createTsInput(e.target, {
                mountedCallback: () => {
                    currentManualTarget.value = target
                    shortcutHelper.unRegisterShortcut()
                },
                changeCallback: (value) => {
                    const realValue = formatInputValue(value, {oldValue})
                    if (realValue !== oldValue) {
                        if (target === SliderEnum.Gamma) {
                            currentGamma.value = realValue
                            onChangeBackgroundGamma()
                        }
                        // else {
                        //     currentBeta.value = realValue
                        //     onChangeBackgroundBeta()
                        // }
                        console.log("modify slider value by person 1111")
                        tsGtag.PointManualModifyComplete()
                    }
                    currentManualTarget.value = SliderEnum.None
                    tsInput.destroy()
                    shortcutHelper.registerShortcut()
                },
                value: oldValue
            })
        }

        const onLabelChange = (value) => {
            if (value !== currentGamma.value) {
                currentGamma.value = value
                onChangeBackgroundGamma()
                tsGtag.PointManualModifyComplete()
            }
        }

        /*
            双击返回默认值
         */
        const onResetSingle = (target) => {
            if (!currentPath.value) return
            const obj = backgroundList.value.find(item => item.path === currentPath.value)
            if (target === SliderEnum.Gamma) {
                if (currentGamma.value === obj.value) return
                currentGamma.value = obj.value
                onChangeBackgroundGamma()
            }
            // else {
            //     if (currentBeta.value === obj.value) return
            //     currentBeta.value = obj.value
            //     onChangeBackgroundBeta()
            // }
        }

        const onCancelClick= ()=>{

        }
        const onAddClick= ()=>{
            importIdPhotoMaterialRpc.openAndImportIdPhotosMaterial()
        }
        return {
            activeSourceTab,
            isShowPanel,
            openMorePanel,
            filterFormatName,

            currentPath,
            currentGamma,
            // currentBeta,
            backgroundList,
            getMarginRight,
            getMineMarginRight,
            onChangeBackgroundPath,
            onChangeBackgroundGamma,
            onCancelClick,
            onAddClick,
            // onChangeBackgroundBeta,

            isModify,
            reset,
            init,

            SliderEnum,
            onLabelChange,

            onResetSingle,
            tsGtag,
            isMineListEmpty
        }
    },
    computed:{
    	...mapGetters('presetSuit',[
    		'mineIdPhoto'
        ]),
        listIconHeight(){
    		if (this.activeSourceTab == 0){
    			return 'auto'
            }
    		if (this.isMineListEmpty){
    			return '155px'
            }
    		return '145px'
        },
        mineIdPhotoList(){
    		let matchMineIdPhotoBackgroundList = store.getters['presetSuit/matchMineIdPhotoBackgroundList']
            const currentPath = this.currentPath
            let mineIdBgList = matchMineIdPhotoBackgroundList(currentPath)
            return mineIdBgList
        },
        mineIdPhotoCount(){
            let mineIdPhotoList = store.getters['presetSuit/mineIdPhotoList']
            return mineIdPhotoList.length
        }
    },
    methods:{
        ...mapMutations('presetSuit', [
            '_UpdateMineIdPhotoBgList',
            '_UpdateMineIdPhotoBgIsLoadAll'
        ]),
        getIconPath(item){
            if (item.isOriginal){
                return item.fullIconPath
            }
            const strIconPath = (this.$isDev?"tsFile://":"file://") + FileUtils.encodeURIComponent(item.fullIconPath)
            return strIconPath
        },
        onActiveSourceChange(value){
            this.activeSourceTab = value
        },
        async onDeleteMaterialMineIdPhoto(item){
            let selectedItemIds = []
            let mineIdPhotoList = store.getters['presetSuit/mineIdPhotoList']
            let isFound = false
            for (const it of mineIdPhotoList) {
                const isValid = !it.isOriginal && ((it.sourceType === IdPhotoMaterialSourceType.Mime) && it.isSelected || ( it.path == this.currentPath))
                if (isValid && it.localMaterialId){
                    selectedItemIds.push(it.localMaterialId)
                    if (it.localMaterialId == item.localMaterialId){
                        isFound = true
                    }
                }
            }
            if (!isFound && item.localMaterialId){
                selectedItemIds.push(item.localMaterialId)
            }
            this.tsConfirm({
                title: '',
                customMessageStyle: 'textAlign: center',
                message: `确认删除${selectedItemIds.length}个背景`
            }).then(async _ => {
                await store.dispatch('presetSuit/ACT_BatchDeleteMineIdPhotoBgList',selectedItemIds)
                await importIdPhotoMaterialRpc.deleteItems(selectedItemIds)
            }).catch(() => {

            })
        },
        handleNodeContextmenu(item){
            const menu = new Menu()
            menu.push({
                label: '删除',
                action: 'batch-delete',
                disabled: false,
                data: item,
                callback: this.onDeleteMaterialMineIdPhoto
            }).show()
        },
    	async initData(){
            await store.dispatch('presetSuit/ACT_FindMineIdPhotoBgList',{isShort:true})
            // this.mineIdPhotoList = store.getters['presetSuit/matchMineIdPhotoBackgroundList'](this.currentPath.value)
            this.importStatusWatchSymbol = importIdPhotoMaterialRpc.addListener(IImportIdPhotoMaterialSignalKey.importProgress,(progress)=>{
                this.isIdPhotoLoading = progress.status == IdPhotoUploadStatus.Begin || progress.status == IdPhotoUploadStatus.Loading
                console.log(`progress.status=`,progress.progress,progress.data)
                this.progress = progress.progress
                if (progress.data){
                    let model = new IdPhotoMaterialModel(progress.data)
                    let isFound = false
                    for (const idPhotoItem of this.mineIdPhoto.bgList) {
                        if (idPhotoItem.localMaterialId == model.localMaterialId){
                            isFound = true
                            break
                        }
                    }
                    if (!isFound){
                        this.mineIdPhoto.bgList.unshift(model)
                    }
                }
            })
        },
        onCommandLeftMouseClick(item,isMeta){
            if ((isMeta && this.$isMac) || (!isMeta && this.$isWin)){
                item.isSelected = !item.isSelected
            }
        },
        /*
			shift+鼠标连选处理
		 */
        onShiftMouseClick(item){
            let firstSelectedItem = null
            let mineIdPhotoList = store.getters['presetSuit/mineIdPhotoList']
            let firstSelectedIndex = -1
            let index = 0
            let itemIndex = -1
            for (const it of mineIdPhotoList) {
                if (it.isSelected || it.path == this.currentPath){
                    if (!firstSelectedItem){
                        firstSelectedItem = it
                        firstSelectedIndex = index
                    }
                }
                if (it.path == item.path){
                    itemIndex = index
                }
                index ++
            }
            if (firstSelectedItem){
                index = 0
                const minIndex = Math.min(firstSelectedIndex,itemIndex)
                const maxIndex = Math.max(firstSelectedIndex,itemIndex)
                console.log(`onShiftMouseClick minIndex=${minIndex},maxIndex=${maxIndex}`)
                for (const it of mineIdPhotoList) {
                    if (index >= minIndex && index <= maxIndex){
                        it.isSelected = true
                    }else{
                        it.isSelected = false
                    }
                    index ++
                }
            }
        },
        resetMineSelects(){
            let mineIdPhotoList = store.getters['presetSuit/mineIdPhotoList']
            for (const it of mineIdPhotoList) {
                it.isSelected = false
            }
        },
        registerShortKey(){
            // ipcRenderer?.on('onKeyboardShortcutInvoked', (event: any, args: { name: string }) => {
            // 	// console.log(`收到快捷键事件:${args}`)
            // 	if (args.name == 'CommandOrControl+A') {
            // 		this.selectedAll(true)
            // 		return
            // 	}
            // 	if (args.name == 'CommandOrControl+D') {
            // 		this.selectedAll(false)
            // 		return
            // 	}
            //
            // })
        }
    },
    mounted() {
    	this.initData()
    },
    beforeDestroy() {
    	this._UpdateMineIdPhotoBgIsLoadAll(false)
    	this.resetMineSelects()
        importIdPhotoMaterialRpc.removeListener(IImportIdPhotoMaterialSignalKey.importProgress,this.importStatusWatchSymbol,true)
    }
}
</script>

<style lang="scss" scoped>
$bg_opacity:0.2;
.id-photo-container {
    width: 100%;
    line-height: 28px;
	.bg_loading{
		opacity: $bg_opacity;
	}
    .title {
        margin-top: 4px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #D9D9D9;
        font-weight: 500;

        .ts-icon-new {
            width: 22px;
            height: 11px;
            margin-left: 4px;
        }
    }

    .header {
        font-size: 11px;
        color: #A6A6A6;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin-top: 8px;
        margin-bottom: 2px;

        &-title {
            font-weight: 500;
            font-size: 12px;
            line-height: 17px;
            color: #D9D9D9;
        }
    }

    .ts-divider {
        width: 100%;
        height: 1px;
        background-color: #333333;
    }

    &-background {
        display: flex;
        flex-direction: column;
		.radio-button{
			width: 50%;
			/deep/ .el-radio-button__inner{
				width: 100%;
			}
		}
        &-header {
            display: flex;
            justify-content: space-between;
			height: 28px;
            .more {
                color: #ffffffcc;

                &:hover {
                    color: #fff;
                }
            }

            .icon {
                margin-right: 0 !important;
            }
        }

        &-list {
            display: flex;
			flex-direction: row;
            flex-wrap: wrap;
			position: relative;
			align-items: flex-start;
			.claIdPhotoUpload{
				position: absolute;
				top:-20px;
			}
            .list-item {
                position: relative;
                width: 48.5px;
                aspect-ratio: 1 / 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-bottom: 8px;
				.claImportContent {
					border-width: 1px;
					border-style: dashed;
					border-color: rgba(255, 255, 255, 0.45);;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					border-radius: 8px;
					background: transparent;

					width: 46.5px;
					height: 46.5px;
					//padding: 1px;
					border-radius: 4px;
					margin-bottom: 2px;

					/deep/ .el-button {
						.el-icon-plus {
							font-size: 24px;
							color: rgba(255, 255, 255, 0.45);
						}
					}
				}
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
                    width: 46.5px;
                    height: 46.5px;
                    //padding: 1px;
                    border: 1px solid transparent;
                    background-color: transparent;
                    border-radius: 4px;
                    margin-bottom: 2px;
                }

                .name {
                    height: 14px;
                    line-height: 14px;
                    text-align: center;
                    font-size: 10px;
                    color: #A6A6A6;
                    font-weight: 400;
                }

                .active {
                    border-color: #F5D228;
                    width: 44.5px;
                    height: 44.5px;
                    padding: 1px;
                }
				.selected{
					border-color: #FFFFFF;
					width: 44.5px;
					height: 44.5px;
					padding: 1px;
				}
            }
        }
    }

    &-detail-optimization {
        margin-bottom: 4px;

        &-header {
            margin-top: 8px;
        }

        .slider-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 4px;
            height: 38px;

            .label {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
                color: #A6A6A6;
                line-height: 21px;

                &-name {
                    flex: 1;
                }

                .value {
                    &:hover {
                        color: #2D6B96;
                    }
                }
            }

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
