<template>
    <el-dialog
        append-to-body
        :top="dialogTop + 'px'"
        :width="dialogWidth + 'px'"
        align="center"
        title="年龄性别修改"
        custom-class="setting-dialog gpu-switch-dialog"
        :visible.sync="visible"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        :before-close="onClose"
		@click.native.stop="onBodyClick"
    >
        <div slot="title" class="title-container">
			<el-button class="add-face-btn" @click="onAddFaceFrameClick" :id="manualFaceGuidId">
				<img class="btn-icon" src=""/>
				<span class="btn-title">添加人脸</span>
			</el-button>
			<span class="title">年龄性别修改</span>
        </div>
        <ImportAgeSexReviseItem class="container"
                                ref="ImportAgeSexReviseItem"
                                @toScale="toScale"
                                :value="value">
            <div slot="centerInfo" ref="centerInfo" class="centerInfo" :style="`height: ${dialogHeight}px`">
                <canvas ref="popupCanvas" id="popupCanvas"></canvas>
                <ImportAgeSexReviseBox @noComplete_toScale="noComplete_toScale"
                                       ref="ImportAgeSexReviseBox"
                                       :canvasHeight="canvasHeight"
                                       :canvasWidth="canvasWidth"
                                       :face-data="faceData"
									   :refineUUID="this.refineUUID"
									   :scale="scale"
                                       @callBackPersonType="callBackPersonType"
									   @onFaceDeleted="onFaceDeleted"
									   @onStatusChanged="onFaceEditStatusChanged"
				/>
            </div>
        </ImportAgeSexReviseItem>
    </el-dialog>
</template>

<script>
import { defineComponent } from 'vue'
import { Button } from 'element-ui'
import ImportAgeSexReviseItem from '@/views/PhotoFinishing/Components/ImportAgeSexReviseItem'
import ImportAgeSexReviseBox from '@/views/PhotoFinishing/Components/ImportAgeSexReviseFaceBox'
import { mapActions } from 'vuex'
import toast from '@/mixins/toast'
import TsDialog from '@/components/TsDialog/ts-dialog'
import refine from '@/qt-ipc/business/refine'
import {PersonType} from "@/constants/constants";
import useRefineFaceUpdateGuide, {GuideId} from "@/composables/guide/useRefineFaceUpdateGuide";
import {PersonBioModel} from "@/model/PersonBioModel";
import useRefinePointsRepositories from '@/composables/points/useRefinePointsRepositories'

export default defineComponent({
    components: {
        'el-dialog': TsDialog,
        'el-button': Button,
        ImportAgeSexReviseItem,
        ImportAgeSexReviseBox
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        personTypeTab: {
            type: String,
            default: ''
        },
        refineUUID:{
            type: String,
            default: ''
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
        return {
            faceData: null,
            canvasWidth:0,
            canvasHeight:0,
            dialogWidth: 0,
            dialogHeight: 0,

            dialogTop: 0,
            headHeight: 51,
            footHeight: 55,

            visible: false,
            personType: null,
            isPersonBioChanged: false,
            newPersonType:null,
            ageSexReviseImageData: null,
            scaleRatioWidth: null,
            scaleRatioHeight: null,
            isUpdateType: false,
            imageData: null,
            isLoadSuccess: false,
            manualFaceGuidId:GuideId.ManualFaceId,
            isConfirm:false, // 是否已经点击了确定按钮
            isFacePending:false, // 人脸是否在等待中
            scale:1,
            oldFaceData:null //	旧人脸数据
        }
    },
    computed: {},
    mixins: [toast],

    watch: {
        value: {
            handler(val) {
                // let isLoadDataError = store.getters['isLoadDataError']
                this.visible = val
                if (val) {
                    //@ts-ignore
                    this.oldFaceData = this.$store.state.ageSexRevise.originFaceData
                    // this.isLoadSuccess ? this.render() : this.initData(true)
                    const {handleGuideStart } = useRefineFaceUpdateGuide()
                    handleGuideStart()
                    this.initData(true)
                    refine.handleEnableUndoRedo(false);
                } else {
                    refine.handleEnableUndoRedo(true);
                }
            },
            immediate: true
        }
    },
    methods: {
        ...mapActions([
            'saveFaceData',
            'callDeleteImage',
            'sexReport',
            'getImageData',
            'getImageSize'
        ]),
        //初始化数据
        async initData(isRender) {
            try {
                //获取canvas以及dialog的大小
                let sizeData = await this.getImageSize()
                this.dialogWidth = sizeData?.dialogWidth
                this.dialogHeight = sizeData?.dialogHeight
                this.canvasWidth = sizeData?.canvasWidth
                this.canvasHeight = sizeData?.canvasHeight

                //获取图片数据（base64、width、height、face）
                this.ageSexReviseImageData = await this.getImageData()
                //弹窗的高度
                let dialogHeight = this.headHeight + this.dialogHeight + this.footHeight
                this.dialogTop = (document.documentElement.clientHeight - dialogHeight) / 2
                this.isLoadSuccess = true
                if (isRender) this.render()
                // store.commit('isLoadDataError', false)

            } catch (e) {
                // store.commit('isLoadDataError', true)
                if (isRender) {
                    this.tsNotify('年龄数据加载失败或识别不出来,后续处理')
                    this.onClose()
                }
                //todo
                console.log('年龄数据加载失败', e)
            }
        },

        //渲染弹窗
        render() {
            this.$nextTick(async () => {
                this.clearUpData()
                await this.drawCanvas()
                this.faceData = this.ageSexReviseImageData.face
                this.$refs['ImportAgeSexReviseBox'].selfAdaptionFaceBox() //人脸框选择栏位置自适应
            })
        },

        //将数据保存到本地
        async onSubmit() {
        	this.isConfirm = true
            if (this.isPersonBioChanged) {
                //保存数据
                let jsonArySaveToFile = []
                for (const face of this.faceData) {
                    jsonArySaveToFile.push(new PersonBioModel(face))
                }
                await this.saveFaceData(jsonArySaveToFile).then(() => {
                    //删除本地缓存图片(为了刷新processImage)
                    // this.callDeleteImage()
                    this.$emit('changeFaceData')
                })
                if (this.newPersonType){
                    this.$emit('update:personTypeTab', this.newPersonType) //更新tab栏中的性别
                    this.newPersonType = null
                }
            }
        },

        onBodyClick(){
            this.$refs['ImportAgeSexReviseBox'].clearSelects()
        },
        //关闭弹窗，并反向更新value数据
        onClose() {
            const canvas = document.getElementById('popupCanvas')
            if (canvas) {
                const cxt = canvas.getContext('2d')
                if (cxt) {
                    cxt.clearRect(0, 0, canvas.width, canvas.height)
                }
            }
            this.visible = false
            this.$emit('update:value', false)
            this.ageSexReviseImageData = null
            this.faceData = null
            // 不是确定按钮点击后触发的关闭，需要移除掉等待状态的人脸框及缓存
            if (!this.isConfirm){
                this.$refs['ImportAgeSexReviseBox'].removePendingManualFacesWhenDialogClosed()
            }
            if (!this.isPersonBioChanged){
                return
            }
            this.sexReport(this.oldFaceData)
        },

        //清空布局残留
        clearUpData() {
            //每次重新画图，清空上次偏移数据
            const centerInfo = document.getElementById('centerInfo')
            centerInfo.style.left = '0'
            centerInfo.style.top = '0'
            //每次重新画图，清空上次缩放的比例
            this.$refs.centerInfo.style.transform = 'scale(1)'
            this.$refs.centerInfo.style.transformOrigin = '0 0'
            //清空上次的缩放比例
            this.scaleRatioHeight = 1
            this.scaleRatioWidth = 1
        },


        //画出canvas，并对其进行缩放和平移到中心点位置
        async drawCanvas() {
            let canvas = this.$refs.popupCanvas
            let imgData = this.imageData = this.ageSexReviseImageData.data
            let originWidth = this.ageSexReviseImageData.width
            let originHeight = this.ageSexReviseImageData.height

            let ctx = canvas.getContext('2d')
            let ratio = window.devicePixelRatio || 1 //做清晰处理
            let img = new Image()
            img.src = imgData
            img.onload = () => {
                canvas.width = this.canvasWidth * ratio
                canvas.height = this.canvasHeight * ratio
                ctx.drawImage(img, 0, 0, originWidth, originHeight, 0, 0, this.canvasWidth * ratio, this.canvasHeight * ratio)
                let scaleRatio = 1 / ratio
                canvas.style.transform = 'scale(' + scaleRatio + ',' + scaleRatio + ')'
                canvas.style.transformOrigin = '0 0'
                //居中显示canvas和人脸框
                if (this.canvasWidth !== this.dialogWidth) {
                    let left = -this.canvasWidth / 2 + this.dialogWidth / 2
                    canvas.style.position = 'absolute'
                    canvas.style.left = left + 'px'
                    this.$refs['ImportAgeSexReviseBox'].changePersonBoxPosition({ left })
                }
                if (this.canvasHeight !== this.dialogHeight) {
                    let top = -this.canvasHeight / 2 + this.dialogHeight / 2
                    canvas.style.position = 'absolute'
                    canvas.style.top = top + 'px'
                    this.$refs['ImportAgeSexReviseBox'].changePersonBoxPosition({ top })
                }
            }
        },

        //不完整人脸的缩放
        noComplete_toScale(scale) {
            this.toScale(scale)
            //保存鼠标与不完整人脸缩放比例一致
            this.$refs.ImportAgeSexReviseItem.changeScaleRadio(scale)
        },
        //自定义事件，用户滚动鼠标，开始缩放
        toScale(scale) {
        	let needConvert = true
        	if (scale<=1){
        		scale = 1
                needConvert = false
            }
        	if (scale>=2){
                scale = 2
                needConvert = false
            }
        	this.scale = needConvert ? parseFloat(scale):scale
            //缩放中心点设置
            const centerInfo = this.$refs.centerInfo
            centerInfo.style.transform = 'scale(' + scale + ')'
            centerInfo.style.transformOrigin = this.dialogWidth / 2 + 'px' + ' ' + this.dialogHeight / 2 + 'px'
        },

        async onFaceDeleted(args){
            let {deletedFaces, faceDataTemp } = args
            this.isUpdateType = true
            this.faceData = faceDataTemp
            this.isPersonBioChanged = true
            await this.onSubmit()
        },
        onFaceEditStatusChanged(pending){
        	this.isFacePending = pending
        },
        //返回确定后，改变的人脸类型,
        //并判断用户的改变是否与系统判断不同
        async callBackPersonType(args) {
            let {isFaceChanged, changedFaceData, faceDataTemp } = args
            this.faceData = faceDataTemp
            let oldFaceDatas = this.$store.state.ageSexRevise.originFaceData
            let isIdentical = false//personType === oldPersonType

            const isPersonTypeChanged = (faceItem,oldFaceDatas)=>{
            	let isChanged = false
            	const {id,personType} = faceItem
                for (const oldFace of oldFaceDatas) {
                    let age = oldFace.age
                    let gender = oldFace.gender
                    let oldFaceId = oldFace.id
                    let oldPersonType = ""
                    if (age > 12 && age < 55 && gender === 1) {
                        oldPersonType = PersonType.Male
                    } else if (age > 12 && age < 55 && gender === 2) {
                        oldPersonType = PersonType.Female
                    } else if (age <= 12) {
                        oldPersonType = PersonType.Child
                    } else if (age >= 55) {
                        oldPersonType = PersonType.Older
                    }
                    if (id == oldFaceId){
                        isChanged = oldPersonType != personType
                        break
                    }
                }
                return isChanged
            }

            let changedPersonType = null
            for (const changedFace of changedFaceData) {
                if (isPersonTypeChanged(changedFace,oldFaceDatas)){
                    isIdentical = true
                    changedPersonType = changedFace.personType
                    break
                }
            }
            this.newPersonType = changedPersonType
            this.isUpdateType = isIdentical
            console.log('人物类型是否发生变化 : ', this.isUpdateType)
            this.isPersonBioChanged = true
            await this.onSubmit()
        },

        onAddFaceFrameClick(){
            this.$refs['ImportAgeSexReviseBox'].onAddFaceFrameClick()
        }
    },
    beforeMount() {
        const {destroy } = useRefineFaceUpdateGuide()
        destroy()
    }
})
</script>

<style lang="scss" scoped>
$btn_bg_color:#232324;
/deep/ .gpu-switch-dialog.el-dialog {
	position: relative;
	.title-container{
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: center;
		.add-face-btn{
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			position: absolute;
			left: 0px;
			border: 1px rgba(255, 255, 255, 0.3) solid;
			border-radius: 4px;
			padding: 4px 12px 4px 12px;
			height: 28px;
			background: $btn_bg_color;
			&:hover{
				span{
					color: #FFFFFF;
					img{
						background-image: url("../../../assets/icons/face_icon_add@3x.png");
						/*
							修改图片的前景色
						 */
						filter:brightness(100%);
					}
				}
			}
			span{
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				color: rgba(255,255,255,0.65);
				img{
					width: 16px;
					height: 16px;
					margin-right: 4px;
					background-size:cover;
					background-image: url("../../../assets/icons/face_icon_add@3x.png");
					filter:brightness(65%);
					border: none;
				}
				.btn-title{
				}
			}

		}
		.title{
			font-style: normal;
			font-weight: 600;
			font-size: 16px;
			opacity: 0.85;
			color: #FFFFFF;
		}
	}
    .el-dialog__body {
        padding: 0 !important;
        overflow: hidden;
		padding-bottom: 16px !important;
    }
	.footer{
		/deep/.is-disabled{
			opacity: 0.3;
		}
	}
}

.tip-info {
    font-size: 12px;
    line-height: 18px;
    margin: 4px;
}

.gpu-switch-dialog {
	border-radius: 12px;
    .container {
        position: relative;
        text-align: left;

        img {
            width: 100%;
            height: 100%;
        }

        .popupCanvas {
            position: absolute;
            top: 100px;
            left: 0;
        }
    }
}

/deep/ {
    .el-select-dropdown,
    .el-popper {
        background-color: red !important;

        .popper__arrow {
            display: none;
        }
    }
}


</style>
