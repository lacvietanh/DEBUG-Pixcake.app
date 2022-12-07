<template>
<div class="idPhotoUploadFragment" :style="{background:showProgress?'rgba(0,0,0,0)':'transparent'}">
	<div class="claImport" v-if="isEmpty">
		<div
			class="claImportContent "
			@click="onAddClick">
			<el-button
				icon="el-icon-plus"
				type="text">
			</el-button>
		</div>
		<span class="claEmptyDes">支持jpeg/jpg/png/gif/tif/bmp等格式</span>
	</div>
	<div class="claUpload" v-if="showProgress">
		<span class="claProgressDes">{{importDescription}}</span>
		<div class="claProgressItem">
			<el-progress
				:show-text="false"
				text-inside
				:stroke-width="5"
				:percentage="percentage > 100?100:percentage"
			/>

			<el-button
				v-if="!isCancel"
				icon="el-icon-close"
				class="claCloseBtn"
				@click="onCancelClick">
			</el-button>
		</div>
	</div>
</div>
</template>

<script>
import {  Progress } from 'element-ui'

export default {
	name: "",
	components: {
		'el-progress': Progress,
	},
	props:{
		description:{
			type:String,
			default:`正在导入{0}个背景素材...`
		},
		showProgress:{
			type:Boolean,
			default:false
		},
		isEmpty:{
			type:Boolean,
			default:true
		},
		progress:{
			type:Object,
			default:function (){
				return {
					current:0, //当前个数
					total:1    //总数
				}
			}
		}
	},
	data(){
		return {
			isCancel:false
		}
	},
	computed:{
		importDescription(){
			return this.description.replaceAll("{0}",`${this.progress.current}`)
		},
		percentage(){
			if (!this.progress.total){
				return 0
			}
			return (this.progress.current / this.progress.total) * 100
		}
	},
	methods:{
		onCancelClick(){
			this.isCancel = true
			this.$emit('onCancel',null)
		},
		onAddClick(){
			this.$emit('onAdd',null)
		}
	}
}
</script>

<style scoped lang="scss">
.idPhotoUploadFragment{
	position: relative;
	width: 100%;
	height: 155px;
	.claImport{
		position: absolute;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		background: transparent;
		.claImportContent {
			width: 49px;
			height: 49px;
			border-width: 1px;
			border-style: dashed;
			border-color: rgba(255, 255, 255, 0.45);;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius: 8px;
			background: transparent;
			margin-bottom: 12px;
			/deep/ .el-button {
				.el-icon-plus {
					font-size: 24px;
					color: rgba(255, 255, 255, 0.45);
				}
			}
		}
		.claEmptyDes{
			font-weight: 400;
			font-size: 11px;
			line-height: 15px;
			text-align: center;
			color: rgba(255, 255, 255, 0.45);
		}
	}
	.claUpload{
		position: absolute;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
		height: 100%;
		left: 0px;
		top: 0px;
		padding-left: 15px;
		background: transparent;
		.claProgressDes{
			color:rgba(255, 255, 255, 0.65);
			font-weight: 400;
			font-size: 12px;
			line-height: 17px;
			margin-bottom: 0px;
		}
		.claProgressItem {
			display: flex;
			flex-direction: row;
			align-items: center;

			.claCloseBtn {
				background: #4E4E4E;
				width: 16px;
				height: 16px;
				border-radius: 9px;
				padding: 0px;
				flex-shrink: 1;
			}

			/deep/ .el-progress {
				flex: 1;
				margin-right: 8px;
				font-size: 14px;
				width: 212px;
				height: 5px;
			}
		}
	}
}
</style>