import Vue from 'vue'
import { Dialog } from 'element-ui'
import {mapMutations} from "vuex";
import {QtEventFilter, QtEventFilterType} from '@/utils/QtEventFilter'

export default Vue.extend({
    extends: Dialog,
    watch: {
        visible(val: boolean): void {
            console.log('ts-dialog: ', val)
            let eventFilter = new QtEventFilter()
            //@ts-ignore
            eventFilter.process([QtEventFilterType.Mouse,QtEventFilterType.KeyBoard], !val)
            //@ts-ignore
            // this.sendKeyboardWithSecondDialog(val)
            // todo 弹窗激活通信：通知qt阻止窗口通信
        }
    },


    methods: {
        ...mapMutations('config', [
            'sendKeyboardWithSecondDialog'
        ]),
    },
})
