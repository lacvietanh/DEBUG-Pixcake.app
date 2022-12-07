<template>
    <el-dialog
        append-to-body
        top="20vh"
        width="380px"
        height="337px"
        align="center"
        title="问题上报"
        custom-class="setting-dialog gpu-switch-dialog feedback-dialog"
        :visible="showFeedbackDialog"
        :close-on-click-modal="false"
        :destroy-on-close="true"
        :before-close="updateShowFeedbackDialog"
    >
        <div slot="title">问题反馈</div>
        <div class="claFeedback">
            <div class="claFeedback_type">
                <el-select
                    popper-class="feedback_select"
                    v-model="id"
                    placeholder="*选择问题的分类"
                    v-gtag-event="PointFeedbackChoose">
                    <el-option
                        class="feedback_option"
                        v-for="item in feedback_type"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <span class="right_icon">
            <img :src="$getIconPath('icon_arrow_up.png')" alt="">
            <img :src="$getIconPath('icon_arrow_down.png')" alt="">
        </span>
            </div>

            <div class="claFeedback_content">
                <el-input
                    v-gtag-event="PointFeedbackInputContent"
                    v-model="feedback_content"
                    :placeholder="inputDefault"
                    maxlength="500"
                    show-word-limit
                    type="textarea"
                    @focus="inputFocus"
                    rows="7"
                />
            </div>
        </div>

        <div slot="footer">
            <el-button
                size="mini"
                @click="onCancelBtn">
                取消
            </el-button>
            <el-button
                size="mini"
                type="primary"
                @click="onSubmitBtn">
                提交
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import { mapMutations } from 'vuex'
import { feedbackType } from '@/api/commonApi'

import toast from '@/mixins/toast'
import pointsMixin from '@/mixins/pointsMixin'

import { Select, Option, Input, Button } from 'element-ui'
import TsDialog from '@/components/TsDialog/ts-dialog'

export default {
    name: 'feedbackDialog',
    mixins: [toast, pointsMixin],
    components: {
        'el-select': Select,
        'el-option': Option,
        'el-input': Input,
        'el-button': Button,
        'el-dialog': TsDialog
    },
    props: {
        showFeedbackDialog: Boolean,
        feedbackDialog_viewModel: Object
    },
    watch: {
        //弹窗开启或关闭
        showFeedbackDialog: {
            handler(val) {
                if (val) {//获取问题上报枚举类型
                    this.getFeedbackType()
                } else {
                    if (!this.isSubmitClick && !this.isCancelClick) {
                        this.pointFeedbackCancel()
                    }
                    this.isCancelClick = false
                    this.isSubmitClick = false
                }
            }
        }

    },

    data() {
        return {
            feedback_type: null,
            id: '', //枚举id
            feedback_content: null,
            inputDefault: '*请描述该图片遇到的问题（例如：侧脸无法识别）并点击【提交】。\n' +
                '以便我们尽快迭代解决您的问题。',
            isCancelClick: false,
            isSubmitClick: false
        }
    },
    methods: {
        ...mapMutations([
            'setCancelSpace'
        ]),
        async getFeedbackType() {
            if (this.feedback_type) {
                return
            }
            this.feedback_type = await feedbackType()
        },
        //输入框获取焦点，关闭全局快捷键
        inputFocus() {
            this.$emit('callChangeShortcutHelper', false)
            this.setCancelSpace(true)
        },

        //点击取消
        onCancelBtn() {
            this.isCancelClick = true
            this.updateShowFeedbackDialog()
            this.pointFeedbackCancel()
        },
        //点击提交
        async onSubmitBtn() {
            if (!this.id) {
                this.tsNotify('请选择一个问题分类')
                return
            }
            if (!this.feedback_content) {
                this.tsNotify('请描述该图片遇到的问题')
                return
            }
            this.isSubmitClick = true
            let feedbackData = {}
            feedbackData = {
                type_id: this.id,
                feedback_type: this.feedback_type[this.id - 1].name,
                feedback_content: this.feedback_content
            }
            let viewModel = { ...this.feedbackDialog_viewModel }

            this.pointFeedbackConfirm(viewModel, feedbackData.feedback_type)//问题提交埋点

            this.updateShowFeedbackDialog()
            this.tsNotify('问题已提交～')
            this.FeedbackReport(feedbackData, viewModel)
        },

        FeedbackReport(feedbackData, viewModel) {
            //获取缓存图片的名字
            let projectId = viewModel.thumbnailModel.projectId
            let args = {
                projectId: projectId,
                imgPath: viewModel.imgPath,
                feedbackData: feedbackData
            }

            window.$export.asyncReportFeedBack(args)
            // window.$export.asyncReportCrash()
        },

        updateShowFeedbackDialog() {
            this.id = null
            this.feedback_content = null
            this.$emit('update:showFeedbackDialog', false)
            this.$emit('update:feedbackDialog_viewModel', null)
            //关闭弹窗，开启全局快捷键
            this.$emit('callChangeShortcutHelper', true)
            this.setCancelSpace(false)
        },


        //问题提交埋点
        pointFeedbackConfirm(viewModel, feedback_type) {
            //埋点
            let imgFormat  //图片类型
            // Jpeg = 1,
            // Png = 2,
            // Raw = 3
            if (viewModel.imgFormat === 1) {
                imgFormat = 'Jpeg'
            }
            if (viewModel.imgFormat === 2) {
                imgFormat = 'Png'
            }
            if (viewModel.imgFormat === 3) {
                imgFormat = 'Raw'
            }
            let data = feedback_type + '_' + imgFormat
            this.PointFeedbackConfirm(data)
        },

        //问题取消埋点
        pointFeedbackCancel() {
            this.PointFeedbackCancel()
        }


    }
}
</script>
<style>
/*去除下拉框小角*/
.feedback_select > .popper__arrow {
    display: none !important;
}

/*设置输入框中的提示内容*/
.feedback-dialog textarea::-webkit-input-placeholder {
    color: #737373;
    font-face: PingFang SC;
    font-size: 14px;
}

/*输入框去除边框*/
.feedback-dialog textarea {
    border: none !important;
}

</style>

<style lang="scss" scoped>

//下拉字体样式
.feedback_option {
    font-size: 12px;
    font-weight: 400;
}

//下拉选择hover样式
.el-select-dropdown__item.hover {
    background: #1D1D1D;;
}

.claFeedback {
    width: 320px;
    height: 235px;
    /**
      选择器
     */
    .claFeedback_type {
        width: 320px;
        padding-top: 12px;
        padding-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        /deep/ .el-input {
            width: 320px;
            height: 28px;
        }

        /deep/ .el-input--small .el-input__inner {
            background: rgba(255, 255, 255, 0.10);
            height: 28px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #D9D9D9;
            letter-spacing: 0;
            line-height: 14px;
            font-weight: 400;
        }

        .right_icon {
            display: inline-block;
            position: absolute;
            width: 22px;
            height: 22px;
            border-radius: 4px;
            background: #3073FF;
            top: 15px;
            right: 5px;
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

    /**
      文本框
     */
    .claFeedback_content {
        width: 320px;
        height: 175px;
        padding-bottom: 12px;
        //输入框
        /deep/ .el-textarea__inner {
            height: 175px;
            padding: 8px 16px 8px 16px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #D9D9D9;
            line-height: 24px;
            font-weight: 400;
            background: #1D1D1D;

            /deep/ .claFeedback .claFeedback_content[data-v-206a2118] .el-textarea__inner {
            }
        }

        //右下角计数
        /deep/ .el-input__count {
            background-color: #1d1d1d;
            right: 2px;
            bottom: 1px;
        }

    }

}

</style>
