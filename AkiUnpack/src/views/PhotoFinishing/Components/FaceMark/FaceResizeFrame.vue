<template>
	<div class="resize-container"
		 ref="rootRef"
		 :style="{left:`${currentFrame.x}px`,top:currentFrame.y+'px',width:currentFrame.width+'px',height:currentFrame.height+'px'}">
		<div class="out-box" :style="{
			left:outBoxFrame.x +'px',
			top:outBoxFrame.y+'px',
			width:outBoxFrame.width+'px',
			height:outBoxFrame.height+'px',
			border: `${outerBorderWidth}px solid ${outColor}`,
			zIndex:1
		}"
			 @mousedown.stop="onBodyMousedown($event)"
		>
		</div>
		<div class="inner-box" :style="{
			left:innerBoxFrame.x+'px',
			top:innerBoxFrame.y+'px',
			width:innerBoxFrame.width+'px',
			height:innerBoxFrame.height+'px',
			border: `${innerBorderWidth}px solid ${inColor}`
		}"
		>
		</div>
		<template v-for="(vec,index) in vectors">
			<div :class="'vector'"
				 :key="index"
				 :style="{
					left:vec.x+'px',
					top:vec.y+'px',
					width:vec.width+'px',
					height:vec.height+'px',
					background:`${outColor}`,
					pointerEvents: 'none'
				}"
			>
			</div>
			<div :class="`vectorHotArea_${vec.tag}`"
				 class="vecHotArea"
				 :key="`${index}_hot`"
				 :style="{
					left:(vec.x + vec.width/2) -vec.width +'px',
					top:(vec.y + vec.height/2) -vec.height +'px',
					width:vec.width*2+'px',
					height:vec.height*2+'px',
					zIndex: 123
				}"
				 @mousedown.exact.stop="onMousedown($event,vec.tag)"
			>
			</div>
		</template>
		<div :class="floatClass" ref="floatBoardRef">
			<slot name="right"/>
		</div>
	</div>
</template>

<script>

import { defineComponent } from 'vue'
import GlobalDocumentEventBus from "@/utils/GlobalDocumentEventBus";
import {CGRectGetMaxX, CGRectGetMaxY, CGRectGetMinX, CGRectGetMinY, isRectOverFlow} from "@/utils/utils";

function hexColorToRgba(hexColor, alphaMaxVal = 1) {
	hexColor = hexColor.replace("#", "");

	//用于分割16进制色彩通道
	let reg = new RegExp("\\w{1,2}", "g");
	//分割颜色通道
	let rgbaArray255 = hexColor.match(reg);
	rgbaArray255 = rgbaArray255.map((channel, index) => {
		//计算每个通道的10进制值
		let colorVal = parseInt(channel, 16);
		if (index === 3) {
			//这是alpha通道
			return Math.round(colorVal / (255 / alphaMaxVal) * 100) / 100
		}
		return colorVal;
	});
	return rgbaArray255;
}
const VectorTag = {
	topLeft : 0,
	topRight : 1,
	bottomRight : 2,
	bottomLeft : 3,
}
export default {
	name: "",
	props:{
		canDragFaceFrame:{
			type:Boolean,
			default:true
		},
		inColor:{
			type:String,
			default:'#D95838'
		},
		outColor:{
			type:String,
			default:'#ffffff',
		},
		innerBoxAlpha:{
			type:Number,
			default:0.2
		},
		frame:{
			type:Object,
			default:function () {
				return {x:0,y:0,width:0,height:0}
			}
		},
		minSize:{
			type:Object,
			default:function () {
				return {width:10,height:10}
			}
		},
		maxSize:{
			type:Object,
			default:function () {
				return {width:200,height:200}
			}
		},
		/*
			父容器下的style里面矩阵的设置的缩放比，会影响style的坐标，所以有拖动的时候diff/scale才是真正的偏移
		*/
		scale:{
			type:Number,
			default:1
		},
		/*
			安全边界，框和父容器的触及边界间距>safeEdge
		*/
		safeEdge:{
			type:Number,
			default:8
		}
	},
	data(){
		return {
			vectorWidth:8,
			innerBorderWidth:1,
			outerBorderWidth:1,
			currentFrame:this.frame,
			isDown:false,
			isBodyDown:false,
			downPoint:{x:0,y:0},
			curVecTag:null,
			floatBoardSize:{width:0,height:0},
			floatClass:'right-slot'
		}
	},
	computed:{
		outBoxFrame(){
			const vecBoundWidth = this.vectorWidth + 2 * this.innerBorderWidth
			const halfVecBoundW = vecBoundWidth/2
			return {
				x:halfVecBoundW - this.outerBorderWidth/2,
				y:halfVecBoundW - this.outerBorderWidth/2,
				width:this.currentFrame.width - vecBoundWidth - this.outerBorderWidth ,
				height: this.currentFrame.height - vecBoundWidth - this.outerBorderWidth
			}
		},
		innerBoxFrame(){
			const outFrame = this.outBoxFrame
			return {
				x:outFrame.x + this.innerBorderWidth,
				y:outFrame.y + this.innerBorderWidth,
				width:outFrame.width - 2 * this.innerBorderWidth,
				height: outFrame.height - 2 * this.innerBorderWidth
			}
		},
		vectors(){
			const borderWidth = this.innerBorderWidth
			const vecBoundWidth = this.vectorWidth + 2 * this.innerBorderWidth
			const bottomY = this.currentFrame.height - vecBoundWidth + borderWidth
			const rightX = this.currentFrame.width-vecBoundWidth + borderWidth
			const leftX = borderWidth
			const topY = borderWidth
			//tl,tr,br,bl
			return [
				{x:leftX,y:topY,width:this.vectorWidth,height:this.vectorWidth,tag:VectorTag.topLeft},
				{x:rightX,y:topY,width:this.vectorWidth,height:this.vectorWidth,tag:VectorTag.topRight},
				{x:rightX,y:bottomY,width:this.vectorWidth,height:this.vectorWidth,tag:VectorTag.bottomRight},
				{x:leftX,y:bottomY,width:this.vectorWidth,height:this.vectorWidth,tag:VectorTag.bottomLeft},
			]
		},
		edgeFrame(){
			return {x:0,y:0,width:this.maxSize.width,height:this.maxSize.height}
		},
		safeEdgeFrame(){
			return {x:this.safeEdge,y:this.safeEdge,width:this.maxSize.width-this.safeEdge*2,height:this.maxSize.height-this.safeEdge*2}
		}
	},
	watch:{
		frame:{
			handler:function (val) {
				this.currentFrame = val
			},
			immediate:true
		}
	},
	mounted() {
		this.registerEvents(true)
		this.$nextTick(()=>{
			const floatBoardRef = this.$refs['floatBoardRef']
			const floatBoardRect = floatBoardRef.getBoundingClientRect()
			this.floatBoardSize = floatBoardRect
			this.setFloatClass()
		})
	},
	beforeMount() {
		this.registerEvents(false)
	},
	methods:{
		maxRightEdgeX(){
			const parentElement = this.parentEl()
			const parentRect = parentElement.getBoundingClientRect()
			return  CGRectGetMaxX(parentRect) - this.floatBoardSize.width
		},
		maxBottomEdgeY(){
			const parentElement = this.parentEl()
			const parentRect = parentElement.getBoundingClientRect()
			const rootRef = this.$refs['rootRef']
			const maxHeight = Math.max(rootRef.height,this.floatBoardSize.height)
			return  CGRectGetMaxY(parentRect)
		},
		/*
			浮动扩展坞的容器样式
		 */
		setFloatClass(){
			let strClass = ''
			let currentFrame = this.currentFrame
			const edgeFrame = this.safeEdgeFrame
			const maxEdgeX = CGRectGetMaxX(edgeFrame) - this.floatBoardSize.width
			const maxCurrentFrame = CGRectGetMaxX(currentFrame)
			// console.log(`setFloatClass...maxEdgeX=${maxEdgeX},maxCurrentFrame=${maxCurrentFrame}`)
			if (maxCurrentFrame >= maxEdgeX){
				strClass = 'left-slot'
			}else{
				strClass = 'right-slot'
			}
			if (CGRectGetMaxY(currentFrame) >= CGRectGetMaxY(edgeFrame)){
				strClass +=' bottom-slot'
			}
			this.floatClass = strClass
		},
		parentEl(){
			return this.$parent.$el
		},
		registerEvents(keep){
			if (keep){
				GlobalDocumentEventBus.addEventListener('onmousemove',this.onMousemove)
				GlobalDocumentEventBus.addEventListener('onmouseup',this.onMouseup)
			}else{
				GlobalDocumentEventBus.removeEventListener('onmousemove',this.onMousemove)
				GlobalDocumentEventBus.removeEventListener('onmouseup',this.onMouseup)
			}
		},
		rgba(hexColor,alpha) {
			if (hexColor == ""){
				return "rgba(0,0,0,1)"
			}
			let ary = hexColorToRgba(hexColor)
			if (ary.length == 3){
				ary.push(alpha)
			}
			if (ary.length == 4){
				ary[3] = alpha
			}
			return "rgba(" + ary.join(",") + ")";
		},
		onMousedown(event,vecTag){
			if (!this.canDragFaceFrame){
				return
			}
			this.isDown = true
			this.downPoint = {
				x:event.pageX,
				y:event.pageY
			}
			this.curVecTag = vecTag
		},
		onMousemove(event){
			const vecTag = this.curVecTag
			let x = event.pageX
			let y = event.pageY
			let currentFrame = this.currentFrame
			const edgeFrame = this.safeEdgeFrame
			const scale = this.scale
			const diff = {x:(x - this.downPoint.x)/scale,y:(y - this.downPoint.y)/scale}
			if (this.isDown){
				this.$emit('onDragging',null)
				this.downPoint = {x,y}
				let targetX = currentFrame.x
				let targetY = currentFrame.y
				let targetWidth = currentFrame.width
				let targetHeight = currentFrame.height
				// right-slot的右边是否将会超出边界
				switch (vecTag) {
					case VectorTag.topLeft:{
						targetX += diff.x
						targetY += diff.y
						targetWidth -= diff.x
						targetHeight -= diff.y

						let isLimitMin = false
						if (targetWidth < this.minSize.width){
							targetWidth = this.minSize.width
							isLimitMin = true
						}
						if (targetHeight < this.minSize.height){
							targetHeight = this.minSize.height
							isLimitMin = true
						}
						if (isLimitMin){
							// 最右下角为固定顶
							const fixPoint = {x:CGRectGetMaxX(currentFrame),y:CGRectGetMaxY(currentFrame)}
							targetX = fixPoint.x - targetWidth
							targetY = fixPoint.y - targetHeight
						}

						const cropRect = {x:targetX,y:targetY,width:targetWidth,height:targetHeight}
						const isOverflow = isRectOverFlow(cropRect,edgeFrame)
						if (isOverflow){
							targetX = Math.max(targetX,edgeFrame.x)
							targetY = Math.max(targetY,edgeFrame.y)
							targetWidth = Math.min(CGRectGetMaxX(edgeFrame),CGRectGetMaxX(cropRect)) - targetX
							targetHeight = Math.min(CGRectGetMaxY(edgeFrame),CGRectGetMaxY(cropRect)) - targetY
						}
					}break
					case VectorTag.topRight:{
						targetY += diff.y
						targetWidth += diff.x
						targetHeight -= diff.y

						let isLimitMin = false
						if (targetWidth < this.minSize.width){
							targetWidth = this.minSize.width
							isLimitMin = true
						}
						if (targetHeight < this.minSize.height){
							targetHeight = this.minSize.height
							isLimitMin = true
						}
						if (isLimitMin){
							// 最右下角为固定顶
							const fixPoint = {x:CGRectGetMinX(currentFrame),y:CGRectGetMaxY(currentFrame)}
							targetY = fixPoint.y - targetHeight
						}

						const cropRect = {x:targetX,y:targetY,width:targetWidth,height:targetHeight}
						const isOverflow = isRectOverFlow(cropRect,edgeFrame)
						if (isOverflow) {
							targetX = Math.max(targetX, edgeFrame.x)
							targetY = Math.max(targetY, edgeFrame.y);
							targetWidth = Math.min(CGRectGetMaxX(edgeFrame),CGRectGetMaxX(cropRect)) - targetX;
							targetHeight = Math.min(CGRectGetMaxY(edgeFrame),CGRectGetMaxY(cropRect)) - targetY;
						}
					}break
					case VectorTag.bottomRight:{
						targetWidth += diff.x
						targetHeight += diff.y
						if (targetWidth < this.minSize.width){
							targetWidth = this.minSize.width
						}
						if (targetHeight < this.minSize.height){
							targetHeight = this.minSize.height
						}
						const cropRect = {x:targetX,y:targetY,width:targetWidth,height:targetHeight}
						const isOverflow = isRectOverFlow(cropRect,edgeFrame)
						if (isOverflow) {
							targetX = Math.max(targetX, edgeFrame.x);
							targetY = Math.max(targetY, edgeFrame.y);
							targetWidth = Math.min(CGRectGetMaxX(edgeFrame),CGRectGetMaxX(cropRect)) - targetX;
							targetHeight = Math.min(CGRectGetMaxY(edgeFrame),CGRectGetMaxY(cropRect)) - targetY;
						}
					}break
					case VectorTag.bottomLeft:{
						targetX += diff.x
						targetWidth -= diff.x
						targetHeight += diff.y
						let isLimitMin = false
						if (targetWidth < this.minSize.width){
							targetWidth = this.minSize.width
							isLimitMin = true
						}
						if (targetHeight < this.minSize.height){
							targetHeight = this.minSize.height
							isLimitMin = true
						}
						if (isLimitMin){
							// 最右下角为固定顶
							const fixPoint = {x:CGRectGetMaxX(currentFrame),y:CGRectGetMinY(currentFrame)}
							targetX = fixPoint.x - targetWidth
						}
						const cropRect = {x:targetX,y:targetY,width:targetWidth,height:targetHeight}
						const isOverflow = isRectOverFlow(cropRect,edgeFrame)
						if (isOverflow) {
							targetX = Math.max(targetX, edgeFrame.x);
							targetY = Math.max(targetY, edgeFrame.y);
							targetWidth = Math.min(CGRectGetMaxX(edgeFrame),CGRectGetMaxX(cropRect)) - targetX;
							targetHeight = Math.min(CGRectGetMaxY(edgeFrame),CGRectGetMaxY(cropRect)) - targetY;
						}
					}break
					default:
						break
				}

				this.currentFrame = {x:targetX,y:targetY,width:targetWidth,height:targetHeight}
				this.setFloatClass()
				this.$emit('onChange',[this.currentFrame.x,this.currentFrame.y,this.currentFrame.width,this.currentFrame.height])
			}
			if (this.isBodyDown){
				this.$emit('onDragging',null)
				let currentFrame = this.currentFrame
				this.downPoint = {x,y}
				currentFrame.x += diff.x
				currentFrame.y += diff.y
				if (CGRectGetMinX(currentFrame) <= CGRectGetMinX(edgeFrame)){
					currentFrame.x = edgeFrame.x
				}
				if (CGRectGetMinY(currentFrame) <= CGRectGetMinY(edgeFrame)){
					currentFrame.y = edgeFrame.y
				}
				if (CGRectGetMaxY(currentFrame) >= CGRectGetMaxY(edgeFrame)){
					currentFrame.y = CGRectGetMaxY(edgeFrame) - currentFrame.height
				}
				if (CGRectGetMaxX(currentFrame) >= CGRectGetMaxX(edgeFrame)){
					currentFrame.x = CGRectGetMaxX(edgeFrame) - currentFrame.width
				}
				this.currentFrame = currentFrame
				this.setFloatClass()
				this.$emit('onChange',[currentFrame.x,currentFrame.y,currentFrame.width,currentFrame.height])
			}
		},
		onMouseup(event){
			if (this.isDown || this.isBodyDown){
				this.$emit("onFinished",null)
			}
			const vecTag = this.curVecTag
			this.isDown = false
			this.isBodyDown = false
		},
		onBodyMousedown(event){
			if (!this.canDragFaceFrame){
				return
			}
			this.isBodyDown = true
			this.downPoint = {
				x:event.pageX,
				y:event.pageY
			}
		}
	}
}
</script>

<style scoped lang="scss">
$marginX:4px;
$paddingY:4px;
.resize-container{
	position: absolute;
	z-index: 10;
	.right-slot{
		position: absolute;
		left: 100%;
		padding: $paddingY 0px 0px $marginX;
	}
	.left-slot{
		position: absolute;
		right: 100%;
		padding: $paddingY $marginX 0px 0px;
	}
	.bottom-slot{
		position: absolute;
		bottom: 0;
		padding-bottom: $paddingY;
		padding-top: 0px;
	}
	.out-box{
		position: absolute;

	}
	.inner-box{
		position: absolute;
		pointer-events: none;
		outline: 9999px solid rgba(0,0,0,.5);
	}
	.vector{
		position: absolute;
	}
	.vectorHotArea_0{
		cursor: se-resize;
	}
	.vectorHotArea_1{
		cursor: sw-resize;
	}
	.vectorHotArea_2{
		cursor: se-resize;
	}
	.vectorHotArea_3{
		cursor: sw-resize;
	}
	.vecHotArea{
		position: absolute;
	}
}
</style>