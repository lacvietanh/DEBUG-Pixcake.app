<template>
	<el-dialog
		center
		top="28vh"
		width="400px"
		append-to-body
		destroy-on-close
		:visible.sync="visible"
		:close-on-click-modal="false"
		:close-on-press-escape="false"
		custom-class="common-dialog user-package">
		<div class="dialog-container">
			<div class="title">
				<img :src="require('@/assets/icons/pop_icon_confirm@3x.png')"/>
				<span>分享口令已复制</span>
			</div>
			<div class="message-container" :style="{marginBottom:bottomTipMsg.length >0?'40px':'0px'}">
				{{contentMsg}}
			</div>
			<div slot="footer" class="bottom-container" v-if="bottomTipMsg.length >0">
				<div class="bottom-message" >
					<i class="el-icon-warning-outline tip_icon"></i>
					<span>{{bottomTipMsg}}</span>
				</div>
			</div>
		</div>
	</el-dialog>
</template>
<script>
import TsDialog from '@/components/TsDialog/ts-dialog'

export default {
	name: "",
	components: {
		'el-dialog':TsDialog
	},
	props:{
		value: {
			type: Boolean,
			default: false
		},
		contentMsg: {
			type: String,
			value: `分享口令`
		},
		isShow: {
			type: Boolean,
			value: false
		},
		bottomTipMsg:{
			type: String,
			value: `本次分享预设中不包含上传的证件照背景效果`
		}
	},
	data(){
		return {
			visible: this.value
		}
	},
	watch: {
		value: {
			handler(val) {
				this.visible = val
			},
			immediate: true
		},
		visible(val) {
			this.$emit('input', val)
		}
	}
}
</script>

<style scoped lang="scss">
$marginOffset:48px;
$borderColor:#333333;
.el-dialog{
	.dialog-container{
		.title{
			img{
				margin-right:4px;
				width:14px;
				height:14px
			}
			span{
				font-size: 16px;
				font-weight: 600;
				margin: 12px 0 16px
			}
		}
		.message-container{
			font-size: 14px;
			text-align: center;
			margin-bottom: 40px;
		}
		.bottom-container{
			display: flex;
			flex-direction: row;
			height: 40px;
			border-top: 1px $borderColor solid;
			margin-bottom: -$marginOffset;
			margin-left: -$marginOffset;
			margin-right: -$marginOffset;
			justify-content: center;
			align-items: center;
			.bottom-message{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				.tip_icon{
					width: 16px;
					height: 16px;
					background: transparent;
					margin-right: 2px;
				}
				.el-icon-warning-outline:before {
					color: rgba(255, 255, 255, 0.45);
				}
				span{
					color: rgba(255, 255, 255, 0.45);
					font-style: normal;
					font-weight: 400;
					font-size: 12px;
				}
			}
		}
	}
}

</style>