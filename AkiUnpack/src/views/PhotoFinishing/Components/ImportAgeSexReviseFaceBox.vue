<template>
    <div id="personBoxId" class="personBox" :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }" ref="personBox">
        <template v-for="(person, index) in faceDataTemp">
            <div
				v-if="person.deleted == false"
				:id="person.isSelected?ManualFaceFrameId:''"
				:faceId="person.id"
				:key="index"
                 :class="'person-' + person.personType"
                 class="person-type"
                 :style="{  left : person.faceBoxNormalized[0]*canvasWidth + 'px', top : person.faceBoxNormalized[1]*canvasHeight + 'px', width : person.faceBoxNormalized[2]*canvasWidth + 'px', height : person.faceBoxNormalized[3]*canvasHeight + 'px',border:`${person.isSelected?selectedBorderWidth:0}px ${selectedColor} solid`}"
				 @click.exact.stop="onNormalFaceFrameClick(person)"
				 @click.exact.ctrl.stop="onNormalFaceFrameMetaClick(person,false)"
				 @click.exact.meta.stop="onNormalFaceFrameMetaClick(person,true)"
			>
				<el-select v-model="person.personType"
                           popper-class="sex-select"
                           class="change_sex"
                           :popper-append-to-body="false"
						   :disabled="isPending"
                           :style="{width : person.faceBoxNormalized[2]*canvasWidth + 'px',
                                    height : person.faceBoxNormalized[3]*canvasHeight/4 + 'px',
                                    opacity:selectedPersons.length > 0 ? (person.isSelected ?1:InActiveAlpha):1
                                    }"
                           @change="refreshPage(person.personType, index,person)"
                           @visible-change="isSelect($event,index)">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
					<template v-if="!person.isSelected">
						<template v-for="(item, index) in borderDiv">
                    		<div :key="index"
                        		 :class="item"
								 class="borderDiv"
								 :style="{opacity:selectedPersons.length > 0 ? (person.isSelected ?1:InActiveAlpha):1}"
							></div>
                		</template>
					</template>
            </div>
        </template>
		<div v-show="canShowFaceMarkToolTip" ref="myTooltipRef" id="my-tooltip-id" class="my-tooltip" :style="{background:tooltipBgColor}">
			<template v-if="isFaceMarkLoading">
				<i class="el-icon-loading"></i>
				{{faceMarkTooltipText}}
			</template>
			<template v-if="!isFaceMarkLoading">
				{{faceMarkTooltipText}}
			</template>

			<div id="arrow" data-popper-arrow></div>
		</div>
		<template v-if="newFaceDataViewModel != null">
				<face-resize-frame  ref="faceResizeRef" :frame="{
								x:newFaceDataViewModel.faceBox[0],
								y:newFaceDataViewModel.faceBox[1],
								width:newFaceDataViewModel.faceBox[2],
								height:newFaceDataViewModel.faceBox[3]
					}"
					:inColor="newFaceFramePendingBorderColor"
					:outColor="outColor"
					:maxSize="{width:canvasWidth,height:canvasHeight}"
					:canDragFaceFrame="canDragFaceFrame"
					:scale="scale"
					@onChange="onNewFaceFrameChanged"
					@onFinished="onNewFaceChangeFinished"
				>
					<div slot="right" v-if="canShowFaceConfirm && !isFaceMarkLoading && !isFaceMarkWarning" class="new-face-frame-confirm">
						<el-button icon="el-icon-check" @click="onFaceConfirm"></el-button>
						<el-button icon="el-icon-close" @click="onFaceReject"></el-button>
					</div>
				</face-resize-frame>
		</template>
		<div class="face-bottom-tool" ref="bottomToolRef">
			<template v-if="selectedPersons.length == 1">
				<el-button icon="el-icon-delete" @click.exact.stop="onDeleteFaces">删除</el-button>
			</template>
			<template v-if="selectedPersons.length > 1">
					<el-button
						:disabled="isPending"
						icon="" @click.native.exact.stop="onBatchSexClick">
						<img class="btn-icon" src=""/>
						<span class="btn-title">批量修改性别</span>
						<i class="el-icon-arrow-down el-icon--right" />
					</el-button>
					<el-select ref="sexSelectorRef"
							   popper-class="batch-sex-select"
							   :popper-append-to-body="true"
							   @change="onBottomGroupSexItemChoosed(batchSelectSexVal)"
							   class="cla_sex_selector" v-model="batchSelectSexVal" placeholder="请选择">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
							:disabled="item.disabled">
						</el-option>
					</el-select>
				<el-button icon="el-icon-delete" @click.exact.stop="onDeleteFaces">批量删除</el-button>
			</template>
		</div>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Select, Option } from 'element-ui'
import {PersonBioItemStatus, PersonBioViewModel} from "@/view-model/PersonBioViewModel";
import FaceResizeFrame from "./FaceMark/FaceResizeFrame"
import { Tooltip,Popover,Dropdown,DropdownItem,DropdownMenu } from 'element-ui'
import Popper from 'popper.js'
import {intersection} from "#/utils/common";
import refineRpc from "@/qt-ipc/business/refine"
import imageIOManager from "qt/imageIOManager";
import FilePathUtils from "@/utils/tsFilePathUtils";
import store from '@/store'
import {PersonBioModel} from "@/model/PersonBioModel";
import {PersonType} from "@/constants/constants";
import toast from "@/mixins/toast";
import useRefineFaceBatchSelectGuide,{GuideId} from "@/composables/guide/useRefineFaceBatchSelectGuide";
import { cloneDeep, debounce, isEqual } from 'lodash'
import useRefinePointsRepositories from "@/composables/points/useRefinePointsRepositories";

// 人脸交叉区域超出的范围算是人脸已存在的警告阈值
const overFlowRate = 0.5
const defaultNewFrameSize = 64
const nFaceShowHotKeyGuide = 5
/*
	返回的size{
		width:#,
		height:#
	}
 */
function avgOfFaceFrame(faceDataViewModels,canvasWidth,canvasHeight) {
	let width = 0
	let height = 0
	let len = 0
	let totalWidth = 0
	let totalHeight = 0
	if (faceDataViewModels.length >0)
	{
		for (const faceDataViewModel of faceDataViewModels) {
			if (faceDataViewModel.deleted){
				continue
			}
			totalWidth += faceDataViewModel.faceBoxNormalized[2]*canvasWidth
			totalHeight += faceDataViewModel.faceBoxNormalized[3]*canvasHeight
			len ++
		}
		if (len >0 ){
			width = totalWidth / len
			height = totalHeight / len
		}
	}
	if(!width || !height){
		width = defaultNewFrameSize
		height = defaultNewFrameSize
	}

	return {
		width,height
	}
}

function newFaceFrame(faceSize, canvasW, canvasH) {
	const x = (canvasW - faceSize.width)/2
	const y = (canvasH - faceSize.height)/2
	return [x,y,faceSize.width,faceSize.height]
}

export default defineComponent({
    name: 'ImportAgeSexReviseFaceBox',
	mixins:[toast],
    components: {
        'el-select': Select,
        'el-option': Option,
		'el-tooltip':Tooltip,
		'el-popover':Popover,
		'el-dropdown':Dropdown,
		'el-dropdown-menu':DropdownMenu,
		'el-dropdown-item':DropdownItem,
		'face-resize-frame':FaceResizeFrame
    },
    props: {
        faceData: {
            type: Array,
            default: () => []
        },
        canvasWidth: {
            type: Number,
            default: 0

        },
        canvasHeight: {
            type: Number,
            default: 0
        },
		refineUUID:{
        	type:String,
			default:""
		},
		scale:{
			type: Number,
			default: 1
		}
    },
	setup() {
		const { PointAddAFace, PointAddAFaceFinish } = useRefinePointsRepositories()

		return {
			PointAddAFace,
			PointAddAFaceFinish
		}
	},
    data() {
		let  generateGetBoundingClientRect = (x = 0, y = 0) =>{
			return () => {
				let ref = this.$refs['faceResizeRef']
				let el = ref.$el
				return ({
					width: el.clientWidth,
					height: el.clientHeight,
					top: this.newFaceDataViewModel.faceBox[1] -6,
					right: this.newFaceDataViewModel.faceBox[0]+ el.clientWidth/2,
					bottom: 0,
					left: this.newFaceDataViewModel.faceBox[0]+ el.clientWidth/2
				})
			};
		}
        return {
            options: [{
                value: 'Male',
                label: '男'
            }, {
                value: 'Female',
                label: '女'

            }, {
                value: 'Child',
                label: '儿童'
            }, {
                value: 'Older',
                label: '长辈'
            }],
            noCompleteRatio: 1,
            borderDiv: ['borderTL', 'borderTR', 'borderBL', 'borderBR'],
            faceDataTemp:[], // PersonBioViewModel类型的数组对象
			newFaceDataViewModel:null, // PersonBioViewModel类型的数组对象,新增的
			isFaceMarkLoading :false,
			isFaceMarkWarning:false,
			//faceMarkRef,
			canShowInitAddTooltip:false,
			canShowFaceConfirm:true,
			popperObject:null,
			virtualTipElement:{
				contextElement:null,
				getBoundingClientRect:generateGetBoundingClientRect()
			},
			selectedColor:'#1677FF',
			selectedBorderWidth:2,
			canDragFaceFrame:true,
			selectedPersons:[],
			PersonType:{
            	Male:PersonType.Male,
				Female:PersonType.Female,
				Child:PersonType.Child,
				Older:PersonType.Older
			},
			isFaceChanged:false,
			pendingToSavePersons:{},
			batchSelectSexVal:'',
			ManualFaceFrameId:GuideId.ManualFaceFrameId,
			InActiveAlpha:0.4,
			PersonBioItemStatus:{...PersonBioItemStatus}
		}
    },
    watch: {
        faceData: {
            handler(val) {
                if (val && val.length > 0) {
                    const results = JSON.parse(JSON.stringify(val))
					this.initFaceData(results)
                }
            }
        },
		isFaceMarkLoading:{
			handler(val) {
				this.canDragFaceFrame = !val
			}
		},
		selectedPersons:{
			handler(val) {
				if (val.length >= 1 && this.faceDataTemp.length > nFaceShowHotKeyGuide){
					const {handleGuideStart } = useRefineFaceBatchSelectGuide()
					handleGuideStart()
				}
			}
		},
		newFaceDataViewModel: {
			handler(val) {
				this.$emit("onStatusChanged",this.isPending)
			},
			immediate:true
		}
    },
	computed:{
    	isPending(){
    		return this.newFaceDataViewModel && (this.newFaceDataViewModel.status == PersonBioItemStatus.Pending || this.newFaceDataViewModel.status == PersonBioItemStatus.Init)
		},
		canShowFaceMarkToolTip(){
			if (!this.newFaceDataViewModel){
				return false
			}
			const status = this.newFaceDataViewModel.status
			let enable = false
			if (status === PersonBioItemStatus.Init){
				enable = !this.canShowInitAddTooltip
			}
			if ( status === PersonBioItemStatus.Pending && (this.isFaceMarkLoading || this.isFaceMarkWarning)){
				enable = true
			}
			return enable
		},
		faceMarkTooltipText(){
			if (!this.newFaceDataViewModel){
				return ""
			}
			const status = this.newFaceDataViewModel.status
			switch (status){
				case PersonBioItemStatus.Init:
					return "移动并缩放人脸至人脸框"
					break
			}
			if (this.isFaceMarkLoading){
				return "正在识别中..."
			}
			if (this.isFaceMarkWarning){
				return "此位置已有人脸"
			}
			return ""
		},
		tooltipBgColor(){
			if (!this.newFaceDataViewModel){
				return ""
			}
			const status = this.newFaceDataViewModel.status
			if (status === PersonBioItemStatus.Init || this.isFaceMarkLoading){
				return "#232324"
			}
			if (this.isFaceMarkWarning){
				return "#D95838"
			}
			return ""
		},
		outColor(){
			const commonColor = "#ffffff"
			const warnColor = "#D95838"
			if (!this.newFaceDataViewModel){
				return commonColor
			}
			if (this.isFaceMarkWarning){
				return warnColor
			}
			return commonColor
		},
		newFaceFramePendingBorderColor(){
			const commonColor = "#00000033"
			return commonColor
		}
	},
    methods: {
		bottomToolRef(){
			return this.$refs['bottomToolRef']
		},
    	async getCurrentImageId(){
			let imagePath = store.state.thumbnail.activeThumbnail.imgPath
			let viewModel = await imageIOManager.getViewModel(imagePath)
			return viewModel.thumbnailModel.id
		},
    	calcSelects(){
    		this.selectedPersons = this.faceDataTemp.filter(it=>{
    			if (it.deleted){
    				return false
				}
				return it.isSelected
			})
		},
		onBottomGroupSexItemChoosed(item){
			for (let selectedPerson of this.selectedPersons) {
				selectedPerson.personType = item
				selectedPerson.changed = true
				if (item === PersonType.Male) {
					selectedPerson.age = 20
					selectedPerson.gender = 1
				}
				if (selectedPerson.personType === PersonType.Female) {
					selectedPerson.age = 20
					selectedPerson.gender = 2
				}
				if (selectedPerson.personType === PersonType.Child) {
					selectedPerson.age = 1
					selectedPerson.gender = 1
				}
				if (selectedPerson.personType === PersonType.Older) {
					selectedPerson.age = 100
					selectedPerson.gender = 1
				}
			}
			let faceDataTemp = []
			for (const faceData of this.faceDataTemp) {
				faceDataTemp.push(faceData.toJson())
			}
			this.$emit('callBackPersonType', {changedFaceData:this.selectedPersons,faceDataTemp:  faceDataTemp})
		},
		onBatchSexClick:debounce(function (event) {
			const sexSelectorRef = this.$refs.sexSelectorRef
			if (!sexSelectorRef || !sexSelectorRef.$el){
				return
			}
			sexSelectorRef.$el.click()
		},10),
		onDeleteFaces(){
    		const selectedCount = this.selectedPersons.length
			if (selectedCount == 0){
				return
			}

			const title = selectedCount == 1?"确认删除该人脸":`确认删除${selectedCount}个人脸`
			const message = "删除后，调整效果将不会应用于该人脸上"
			this.tsConfirm({
				title: title,
				message: message,
				customMessageStyle: 'textAlign: center'
			}).then(async _ => {
				let faces = {}
				for (const selectedPerson of this.selectedPersons) {
					faces[`${selectedPerson.id}`] = selectedPerson.toJson()
					for (let i =0;i< this.faceDataTemp.length;i++) {
						const face = this.faceDataTemp[i]
						if (selectedPerson.id == face.id){
							selectedPerson.changed = true
							selectedPerson.isManual == false ? selectedPerson.deleted = true : this.faceDataTemp.splice(i,1)
						}
					}
				}
				const nDelFaces = this.selectedPersons.length
				let faceDataTemp = []
				for (const faceData of this.faceDataTemp) {
					faceDataTemp.push(faceData.toJson())
				}
				this.isFaceChanged = true
				await refineRpc.removeFace(this.refineUUID,faces,await this.getCurrentImageId())
				this.selectedPersons = []
				this.$emit('onFaceDeleted',{deletedFaces:this.selectedPersons,faceDataTemp:faceDataTemp})
				// 上报埋点
				this.PointAddAFaceFinish(`face${nDelFaces}_delete`)
			}).catch(e=>{

			})
		},
		// 清除选中态
		clearSelects(){
			this.selectedPersons = this.faceDataTemp.filter(it=>{
				it.isSelected = false
				if (it.deleted){
					return false
				}
				return it.isSelected
			})
		},
		async removePendingManualFacesWhenDialogClosed(){
			await refineRpc.removeFace(this.refineUUID,this.pendingToSavePersons,await this.getCurrentImageId())
		},
		onNormalFaceFrameClick(person){
			if (this.newFaceDataViewModel){
				return
			}
    		this.clearSelects()
			person.isSelected = true
			this.calcSelects()
		},
		onNormalFaceFrameMetaClick(person,isMeta){
			if (this.newFaceDataViewModel){
				return
			}
			const canApply = isMeta && this.$isMac || !isMeta && this.$isWin
			if (canApply){
				person.isSelected = !person.isSelected
			}
			this.calcSelects()
		},
    	/*
    		获得新增的人脸的归一化的人脸坐标比例
    	 */
    	getNewFaceFrameNormalized(){
			const personBoxWidth = this.canvasWidth
			const personBoxHeight = this.canvasHeight
			const newFaceFrameRect = this.newFaceDataViewModel.getFaceRect()
			const retX = newFaceFrameRect.x
			const retY = newFaceFrameRect.y
			const retWidth = newFaceFrameRect.width
			const retHeight = newFaceFrameRect.height
			const result = [
				retX / personBoxWidth,
				retY / personBoxHeight,
				retWidth /personBoxWidth,
				retHeight /personBoxHeight
			]
			return result
		},
		isFaceRectIntersect(){
			let result = false
			if (!this.newFaceDataViewModel){
				return result
			}
			const newFaceBox = {
				x:this.newFaceDataViewModel.faceBox[0],
				y:this.newFaceDataViewModel.faceBox[1],
				width:this.newFaceDataViewModel.faceBox[2],
				height:this.newFaceDataViewModel.faceBox[3]
			}
			for (const it of this.faceDataTemp) {
				if (it.deleted){
					continue
				}
				let curFaceBox = {
									x:it.faceBoxNormalized[0]*this.canvasWidth,
					        	  	y:it.faceBoxNormalized[1]*this.canvasHeight,
									width:it.faceBoxNormalized[2]*this.canvasWidth,
									height:it.faceBoxNormalized[3]*this.canvasHeight
								}
				const interRect = intersection(curFaceBox,newFaceBox)
				if (interRect){
					const curFaceBoxS = curFaceBox.width * curFaceBox.height
					const interBoxS = interRect.width * interRect.height
					// console.log(`ImportAgeSexReviseFaceDialog.isFaceRectIntersect curFaceBoxS:`,curFaceBoxS,' interBoxS:',interBoxS)
					if (interBoxS/curFaceBoxS > overFlowRate){
						result = true
						break
					}
				}
			}

			return result
		},
		onNewFaceFrameChanged(val){
			this.newFaceDataViewModel.faceBox = val
			this.canShowInitAddTooltip = true
			this.canShowFaceConfirm = false
			this.newFaceDataViewModel.status = PersonBioItemStatus.Pending
			this.isFaceMarkWarning = this.isFaceRectIntersect()
			if (this.popperObject){
				this.popperObject.update();
			}
		},
		onNewFaceChangeFinished(){
			this.canShowFaceConfirm = true
		},
		async onFaceConfirm(){
			this.isFaceMarkWarning = this.isFaceRectIntersect()
			this.newFaceDataViewModel.status = PersonBioItemStatus.Pending
			if (this.isFaceMarkWarning){
				this.resetToolTip()
				return
			}
			this.isFaceMarkLoading = true
			this.resetToolTip()
			this.newFaceDataViewModel.faceBoxNormalized = this.getNewFaceFrameNormalized()
			const refineUUID = this.refineUUID
			const thumbnailId = await this.getCurrentImageId()
			const faces = [this.newFaceDataViewModel.toJson()]
			let filterIds = []
			for (const face of this.faceDataTemp) {
				filterIds.push(face.id)
			}
			let ret = await refineRpc.updateFace(refineUUID,faces,filterIds,thumbnailId)
			this.isFaceMarkLoading = false
			if (ret.length > 0){
				this.isFaceChanged = true
				this.newFaceDataViewModel.status = PersonBioItemStatus.Approved
				this.newFaceDataViewModel.bindFromConfirm(new PersonBioModel(ret[0]))
				const newModel = this.newFaceDataViewModel
				this.faceDataTemp.push(newModel)
				this.saveFace(this.faceDataTemp.length-1)
				this.pendingToSavePersons[newModel.id]=newModel.toJson()
				this.newFaceDataViewModel = null
				// 上报埋点
				this.PointAddAFaceFinish("face1_add")
			}
			this.resetToolTip()
			this.$nextTick(()=>{
				this.selfAdaptionFaceBox()
			})
		},
		onFaceReject(){
			this.newFaceDataViewModel.status = PersonBioItemStatus.Cancelled
			this.newFaceDataViewModel = null
			this.isFaceMarkLoading = false
		},
    	initFaceData(faceDataModels){
    		this.faceDataTemp = []
			this.selectedPersons = []
			for (const faceDataModel of faceDataModels) {
				let faceDataViewModel = new PersonBioViewModel(new PersonBioModel(faceDataModel))
				if (faceDataModel.hasOwnProperty("isSelected")){
					faceDataViewModel.isSelected = faceDataModel.isSelected
				}
				if (faceDataModel.hasOwnProperty("status")){
					faceDataViewModel.status = faceDataModel.status
				}
				let bCanPush = !(faceDataViewModel.deleted && faceDataViewModel.isManual)
				if (bCanPush){
					this.faceDataTemp.push(faceDataViewModel)
				}
				if (faceDataModel.isSelected && faceDataViewModel.deleted == false){
					this.selectedPersons.push(faceDataViewModel)
				}
			}
		},
		/*
			人脸框的tooltip在状态动作更改时，需要重置popper的对象
		 */
		resetToolTip(){
			this.$nextTick(()=>{
				let ref = this.$refs['faceResizeRef']
				let tooltipRef = this.$refs['myTooltipRef']
				if (!ref || !ref.$el){
					return
				}
				this.virtualTipElement.contextElement = ref.$el
				this.popperObject = new Popper(this.virtualTipElement, tooltipRef, {
					placement: 'top',
					modifiers: [
						{
							name: 'offset',
							options: {
								offset: [0, 0],
							},
						},
					],
				});
			})
		},
    	//标题栏左上角的添加人脸的点击事件触发
    	onAddFaceFrameClick() {
			this.PointAddAFace()
			if (this.newFaceDataViewModel){
				return
			}
			this.canShowInitAddTooltip = false
			const faceSize = avgOfFaceFrame(this.faceDataTemp,this.canvasWidth,this.canvasHeight)
			this.newFaceDataViewModel = PersonBioViewModel.Create()
			this.newFaceDataViewModel.fbrFileName = PersonBioViewModel.CreateFbrFileName()
			this.newFaceDataViewModel.status = PersonBioItemStatus.Init
			this.newFaceDataViewModel.isManual = true
			this.newFaceDataViewModel.add = true
			this.newFaceDataViewModel.changed = true
			this.newFaceDataViewModel.faceBox = newFaceFrame(faceSize,this.canvasWidth,this.canvasHeight)
			this.resetToolTip()
		},
		//下拉框出现的时候，判断需要偏移的数量
        isSelect(isSelect,index) {
			if (index >= 0){
				for (let i = 0;i<this.faceDataTemp.length;i++) {
					if (i != index){
						let face = this.faceDataTemp[i]
						face.isSelected = false
					}
					this.calcSelects()
				}
			}
            if (isSelect) {
                this.$nextTick(() => {
                    const select = document.getElementsByClassName('sex-select')
                    for (let i = 0; i < select.length; i++) {
                        const personWidth = select[i].parentElement.clientWidth
                        const sonWidth = select[i].clientWidth
                        select[i].style.left = personWidth / 2 - sonWidth / 2 + 'px'
                    }
                })
            }
        },

        //强制刷新页面,且保存数据
        refreshPage(personType, index,person) {
			person.changed = true
            if (personType) {
                this.saveFace(index)
            }
        },
        //把改变的数据，暂时保存起来
        saveFace(index) {
            if (this.faceDataTemp[index].personType === 'Male') {
                this.faceDataTemp[index].age = 20
                this.faceDataTemp[index].gender = 1
                this.faceDataTemp[index].index = index
            }
            if (this.faceDataTemp[index].personType === 'Female') {
                this.faceDataTemp[index].age = 20
                this.faceDataTemp[index].gender = 2
                this.faceDataTemp[index].index = index
            }
            if (this.faceDataTemp[index].personType === 'Child') {
                this.faceDataTemp[index].age = 1
                this.faceDataTemp[index].gender = 1
                this.faceDataTemp[index].index = index
            }
            if (this.faceDataTemp[index].personType === 'Older') {
                this.faceDataTemp[index].age = 100
                this.faceDataTemp[index].gender = 1
                this.faceDataTemp[index].index = index
            }
            let faceDataTemp = []
			for (const faceData of this.faceDataTemp) {
				faceDataTemp.push(faceData.toJson())
			}
			let changedDataTemp = this.faceDataTemp[index].toJson()
            this.$emit('callBackPersonType', {isFaceChanged: this.isFaceChanged, changedFaceData:[changedDataTemp], faceDataTemp: faceDataTemp })
        },
        //人脸框自适应
        selfAdaptionFaceBox() {
            this.$nextTick(() => {
                // const elinputsuffix = document.getElementsByClassName('el-input--suffix')
                // const elselectsmall = document.getElementsByClassName('el-select--small')
                const elselectsmall = document.getElementsByClassName('change_sex')
                for (let i = 0; i < elselectsmall.length; i++) {
                    let top = elselectsmall[i].clientHeight
                    if (top < 30) {
                        top = top * 1.4
                    }
                    elselectsmall[i].style.top = '-' + top + 'px'
                    this.handle_noComplete_face(top, i)
                }
            })
        },

        //处理不完整人脸
        handle_noComplete_face(selectTop, faceBoxIndex) {
            let faceBoxTop = this.faceDataTemp[faceBoxIndex].faceBox[1]
            if (faceBoxTop - selectTop < 0) {
                //如果不完整人脸多个，取最小比例
                let ratio = this.canvasHeight / ((selectTop + Math.abs(faceBoxTop)) * 2 + +this.canvasHeight)
                if (this.noCompleteRatio > ratio) {
                    this.noCompleteRatio = ratio
                    this.$emit('noComplete_toScale', ratio)
                }
            }
        },

        changePersonBoxPosition(args) {
            const personBox = this.$refs['personBox']
            personBox.style.position = 'absolute'
            if (args.left) {
                personBox.style.left = args.left + 'px'
            }
            if (args.top) {
                personBox.style.top = args.top + 'px'
            }

        },
		// 挂载底部工具栏(批量删除、批量修改)
		attachBottomTool(){
			let nextEl = this.$el
			let bodyEl = null
			while(nextEl = nextEl.parentElement){
				const className = nextEl.className
				if (className.indexOf("el-dialog__body") > 0){
					bodyEl = nextEl
					break
				}
			}
			if (bodyEl && this.bottomToolRef()){
				bodyEl.appendChild(this.bottomToolRef())
			}
		}
    },
	mounted() {
		this.attachBottomTool()
	},
	beforeMount() {
		const {destroy } = useRefineFaceBatchSelectGuide()
		destroy()
	}
})
</script>

<style lang="scss">
$btn_bg_color:#232324;
$btn_normal_color:rgba(255,255,255,0.65);
$btn_hover_color:#ffffff;
.face-bottom-tool{
	z-index: 10000;
	position: absolute;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	bottom: 75px;
	left:0px;
	right:0px;
	/deep/ .el-button{
		z-index:1;
		background: $btn_bg_color !important;
		color: $btn_normal_color !important;
		height: 36px;
		width: 132px;
		font-size: 12px;
		border-radius: 4px;
		border: 1px rgba(255, 255, 255, 0.3) solid !important;

		&:hover{
			color:$btn_hover_color !important;
		}
		&:first-child{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
			padding: 0;
			span{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				//overflow: hidden;
				img{
					width: 16px;
					height: 16px;
					margin-right: 4px;
					background-size:cover;
					background-image: url("../../../assets/icons/face_icon_change@3x.png");
					filter:brightness(65%);
					/*
						修改图片的前景色
					 */
					//overflow: hidden;
					border: none;
				}
				.btn-title{
				}
			}
			&:hover{
				span{
					img{
						background-image: url("../../../assets/icons/face_icon_change@3x.png");
						filter:brightness(100%);
					}
				}
			}
		}
		&:last-child{
			margin-left: -1px;
			border-top-left-radius: 0px;
			border-bottom-left-radius: 0px;
		}
	}
	.cla_sex_selector{
		position: absolute !important;
		left: calc(50% - 130px);
		top:0px;
		width: 132px;
		background: transparent;
		/deep/ .el-input{
			background: transparent;
		}
		/deep/ .el-input__inner{
			background: transparent;
			border-width: 0px;
		}
		/deep/ .el-select-dropdown__item.selected{
			color: #FFFFFF;
		}
	}
}

div#driver-popover-item.refine__face-guide{
	padding: 12px;
	background: rgba(255, 255, 255, 0.85) !important;
	border-radius: 4px !important;
	box-shadow: none !important;
	border: 0px !important;
	.driver-close-icon{
		&::before{
			background-color: rgba(0, 0, 0, 0.85) !important;
		}
		&::after{
			background-color: rgba(0, 0, 0, 0.85) !important;
		}
	}
	.driver-popover-description{
		font-style: normal !important;
		font-weight: 400 !important;
		font-size: 12px !important;
		line-height: 17px !important;
		color: rgba(0, 0, 0, 0.85) !important;
	}
	.driver-popover-tip{
		background: rgba(255, 255, 255, 0.72) !important;
		margin-top: 2px;
	}
}
.batch-sex-select.el-select-dropdown {
	background-color: #333333 !important;
	.el-scrollbar {
		.el-select-dropdown__wrap {
			.el-scrollbar__view {
				.el-select-dropdown__item {
					font-size: 12px;
					color: rgba(255, 255, 255, 0.65);
					font-weight: 400;
				}

				.selected {
					font-size: 12px;
					color: #FFFFFF;
					font-weight: 600;
				}
			}
		}
	}

	.popper__arrow {
		//display: none !important;
		&::after{
			//background-color: #333333;
			border-top-color: #333333 !important;
		}
	}
}
</style>

<style lang="scss" scoped>
$btn_bg_color:#232324;
$btn_normal_color:rgba(255,255,255,0.65);
$btn_hover_color:#ffffff;
$male_color:#32C5FF;
$female_color:#FA6400;
$children_color:#FFDA29;
$old_color:#FFFFFF;
$age_disable_alpha:0.4;
.personBox {
	.new-face{

	}
	.new-face-frame-confirm{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		.el-button{
			font-size: 13px;
			width: 32px;
			height: 32px;
			padding: 0px 0px;
			background: #232324;
			border: 0px solid rgba(255, 255, 255, 0.3);
			&:first-child{
				border-radius: 4px 4px 0px 0px;
				background: #3073FF;
			}
			&:last-child{
				border-radius: 0px 0px 4px 4px;
				margin-top: -1px;
			}
		}
	}
	.my-tooltip{
		background: #333;
		color: white;
		padding: 6px 12px 6px 12px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 400;
		line-height: 17px;
		letter-spacing: 0px;
		text-align: center;
		color: rgba(255, 255, 255, 0.65);
		z-index: 1000;
		#arrow,
		#arrow::before {
			position: absolute;
			left: calc(50% - 4px);
			width: 8px;
			height: 8px;
			background: inherit;
		}

		#arrow {
			visibility: hidden;
		}

		#arrow::before {
			visibility: visible;
			content: '';
			transform: rotate(45deg);
		}
	}
	#my-tooltip-id[data-popper-placement^='top'] > #arrow {
		bottom: -4px;
	}
    .person-type {
        position: absolute;
        .borderDiv{
            position: absolute;
            width: 20%;
            height: 20%;
        }
        .borderTL{
            top: 0;
            left: 0;
            border-top: 1px solid;
            border-left: 1px solid;
        }
        .borderTR{
            top: 0;
            right: 0;
            border-top: 1px solid;
            border-right: 1px solid;
        }
        .borderBL{
            bottom: 0;
            left: 0;
            border-bottom: 1px solid;
            border-left: 1px solid;
        }
        .borderBR{
            bottom: 0;
            right: 0;
            border-bottom: 1px solid;
            border-right: 1px solid;
        }


        /deep/ {
            .el-select,
            .el-select--small {
                padding: 0 !important;
                margin: 0;
                width: 100% !important;
                height: 20% !important;
                position: absolute;
                top: -10%;
                min-height: 20px;
                display: flex;
                justify-content: center;
                pointer-events: none;
                .el-input--small,
                .el-input,
                .el-input--suffix {
                    pointer-events: auto;
                    width: 70% !important;
                    height: 100% !important;
                    display: flex;
                    //min-width: 50px;
                    //min-height: 14px;
                    min-width: 45px;
                    min-height: 12.8px;
                    max-width: 70px;
                    max-height: 20px;
                    font-size: smaller;

                    .el-input__inner {
                        display: block;
                        text-align: center;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        font-weight: 400;
                        border: none;
                        padding: 0;
                        width: 75%;
                        //min-width: 2rem;
                        height: 100%;
                        border-radius: 0;
                        border-top-left-radius: 4px;
                        border-bottom-left-radius: 4px;
                    }

                    .el-input__suffix {
                        display: none;
                    }
                }

                .el-input--suffix:after {
                    content: " ";
                    display: block;
                    //width: 25%;
                    //height:100%;
                    width: 17.5px;
                    height: 20px;
                    position: absolute;
                    left: calc(75%);
                    border: none;
                    border-radius: 0;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    //background-image: url("../../../assets/icons/pop_icon_right_dark @3x.png");
                    background-size: 7px;
                    background-repeat: no-repeat;
                    background-position: center;
                }

                .el-input--suffix:before {
                    content: " ";
                    display: block;
                    position: absolute;
                    left: calc(75%);
                    width: 1px;
                    height: 100%;
                    z-index: 5;
                    opacity: 0.5;
                }
            }
        }
    }

    .person-Older {
        .borderDiv{
            border-color: $old_color;
        }

        /deep/ .el-input__inner {
            background-color: $old_color;
            color: #333333;
        }

        /deep/ .el-input--suffix:after {
            background-color: $old_color;
            background-image: url("../../../assets/icons/pop_icon_right_dark @3x.png");
        }

        /deep/ .el-input--suffix:before {
            background-color: #B8B8B8;
        }
		/deep/ .is-disabled{
			opacity: $age_disable_alpha;
			.el-input__inner{
				background-color: $old_color;
			}
			&.el-input--suffix:after{
				background-color: $old_color;
			}
		}
    }

    .person-Child {
        .borderDiv{
            border-color: $children_color;
        }

        /deep/ .el-input__inner {
            background-color: $children_color;
            color: #333333;
        }

        /deep/ .el-input--suffix:after {
            background-color: $children_color;
            background-image: url("../../../assets/icons/pop_icon_right_dark @3x.png");
        }

        /deep/ .el-input--suffix:before {
            background-color: #FFFFFF;
        }
		/deep/ .is-disabled{
			opacity: $age_disable_alpha;
			.el-input__inner{
				background-color: $children_color;
			}
			&.el-input--suffix:after{
				background-color: $children_color;
			}
		}
	}

    .person-Male {
        .borderDiv{
            border-color: $male_color;
        }

        /deep/ .el-input__inner {
            background-color: $male_color;
            //opacity: 0.8;
            color: #FFFFFF;
        }

        /deep/ .el-input--suffix:after {
            background-color: $male_color;
            background-image: url("../../../assets/icons/pop_icon_right_white@3x.png");
        }

        /deep/ .el-input--suffix:before {
            background-color: #FFFFFF;
        }
		/deep/ .is-disabled{
			opacity: $age_disable_alpha;
			.el-input__inner{
				background-color: $male_color;
			}
			&.el-input--suffix:after{
				background-color: $male_color;
			}
		}
    }

    .person-Female {
        .borderDiv{
            border-color: $female_color;
        }

        /deep/ .el-input__inner {
            background-color: $female_color;
            //opacity: 0.8;
            color: #FFFFFF;
        }

        /deep/ .el-input--suffix:after {
            background-color: $female_color;
            background-image: url("../../../assets/icons/pop_icon_right_white@3x.png");
        }

        /deep/ .el-input--suffix:before {
            background-color: #FFFFFF;
        }
		/deep/ .is-disabled{
			opacity: $age_disable_alpha;
			.el-input__inner{
				background-color: $female_color;
			}
			&.el-input--suffix:after{
				background-color: $female_color;
			}
		}
	}

}


/deep/ .el-select {
    .el-select-dropdown {
        width: 100% !important;
        min-width: 70px !important;
        max-width: 100px !important;
        background-color: #333333 !important;
        position: absolute !important;
        top: 50% !important;
        pointer-events: auto;
        //left: 200px;

        .el-scrollbar {
            .el-select-dropdown__wrap {
                .el-scrollbar__view {
                    .el-select-dropdown__item {
                        font-size: 12px;
                        color: rgba(255, 255, 255, 0.65);
                        font-weight: 400;
                    }

                    .selected {
                        font-size: 12px;
                        color: #FFFFFF;
                        font-weight: 600;
                    }
                }
            }
        }

        .popper__arrow {
            display: none;
        }
    }
}

</style>
