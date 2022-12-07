import {CLIENT_NAME} from "@/universal/types/config";

export const noviceGuide = {
    totalStep: 6,
    step1: {
        text: `试试直接拖拽文件夹或多张图片到这里，开始探索${CLIENT_NAME}吧~`,
        num: 1
    },
    step2: {
        text: '点击应用预设',
        num: 2
    },
    step3: {
        text: '拖动滑杆调整图片',
        num: 3
    },
    step4: {
        text: '按住shift选中图片',
        num: 4
    },
    step5: {
        text: '将当前调整应用至选中图片',
        num: 5
    },
    step6: {
        text: '不需要等待全部效果加载完毕，就可以直接导出',
        num: 6
    }
}
