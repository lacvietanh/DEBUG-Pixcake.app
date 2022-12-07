<template>
    <ShareTokenCopyTip
		v-if="isShow"
		v-model="visible"
		:bottom-tip-msg="bottomTipMsg"
		:content-msg="contentMsg"
	>
	</ShareTokenCopyTip>
</template>

<script>
import { MessageBox } from 'element-ui'
import ShareTokenCopyTip from "./ShareTokenCopyTip"

export default {
    name: 'SharePresetTokenDialog',
	components:{
		ShareTokenCopyTip
	},
    props: {
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
    data() {
        return {
            visible: this.isShow
        }
    },
    watch: {
        isShow: {
            handler(val) {
                this.visible = val
            },
            immediate: true
        },
		visible:{
			handler(val) {
				if (!val){
					this.onClose()
				}
			},
			immediate: false
		}
    },
    methods: {
        onClose() {
            this.visible = false
            this.$emit('onClose')
        },
        /**
         * 二次确认提示
         * @param data
         * @returns {Promise<any>}
         */
        showConfirm(data = {}) {
            const title = data.title || this.defaultTitle
            const message = data.message || ''

            const showCancelButton = data.hasOwnProperty('showCancelButton') ? data.showCancelButton : true
            const msgStyle = data.hasOwnProperty('customMessageStyle') ? data.customMessageStyle : ''

            const h = this.$createElement
			const bottomTipMsg = this.bottomTipMsg
			return new Promise((resolve, reject) => {
                MessageBox.confirm(message, '', {
                    confirmButtonText: data.confirmButtonText || '确认',
                    cancelButtonText: data.cancelButtonText || '取消',
                    customClass: 'customConfirmClass',
                    showCancelButton: false,
                    showConfirmButton: false,
                    message: h('div', {
                        class: 'customConfirmClass-content',
                        style: 'line-height: 24px; font-weight: 400;'
                    }, [
                        h('p', { style: 'font-size: 16px;font-weight: 600; margin: 12px 0 16px' }, [
                            h('img', {
                                style: 'margin-right:4px;width:14px;height:14px',
                                attrs: { src: require('@/assets/icons/pop_icon_confirm@3x.png') }
                            }),
                            title
                        ]),
                        h('p', { style: `font-size: 14px; ${msgStyle}` }, message),
					]),
                    iconClass: '',
                    center: true
                }).then(_ => {
                    resolve()
                }).catch(() => {
                    if (showCancelButton) reject()
                })
            })
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ .el-icon-success:after {
    color: green;
    background: #fff;
    border-radius: 9px;
    font-size: 18px;
    border-width: 0px;
}
</style>
