//@ts-ignore
import Vue from 'vue'
import { noviceGuide } from '@/constants/noviceGuide'
// @ts-ignore
import toast from '@/mixins/toast'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import DBIpcRender from '@/irender/DBIpcRender'
// @ts-ignore
import { find } from '@/universal/datastore/dictionaryDao'
import { APP_VERSION } from '@/universal/types/config'
import pointsMixin from '@/mixins/pointsMixin'

import {
    DICTIONARY_TABLE,
    SHOWED_NOVICE_GUIDE
} from '@/universal/types/config'

class noviceGuideUtil {
    actionableStyle: string
    bgStyle: string
    myBg: any


    constructor() {
        this.actionableStyle = 'background: transparent;z-index: 501;position: relative;'
        this.bgStyle = 'background: #000;width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 500;opacity: 0.4;filter: Alpha(opacity=30)'
    }

    /**
     * 默认遮罩层（bgStyle）
     */
    addMask() {
        this.myBg = <HTMLImageElement>document.createElement('div')
        this.myBg.setAttribute('style', this.bgStyle)
        document.body.appendChild(this.myBg)
    }

    addActionable(className: string) {
        let myAlert = document.getElementsByClassName(className)[0]
        myAlert ? myAlert.setAttribute('style', this.actionableStyle) : ''
    }

    removeMask() {
        document.body.removeChild(this.myBg)
    }


    showGuide(step: any, className: string) {
        this.addActionable(className)
    }

    close() {
        this.removeMask()
    }
}

interface iData {
    step: number,
    guidMask: any,
    tempDiv: any,
}

// template（工作台）
const tempStep1 = Vue.extend({
    template: `<div class="tempStep1"><div style="width:296px" class="tempStep_textBox"><p>${ noviceGuide.step1.text }</p><span id="guideQuit">退出(${ noviceGuide.step1.num }/${ noviceGuide.totalStep })</span></div></div>`
})
// template（点击运用预设）
const tempStep2 = Vue.extend({
    template:
        `<div class="tempStep2">
        <div style="width:136px" class="tempStep_textBox">
            <p>${ noviceGuide.step2.text }</p>
            <span id="guideQuit">退出(${ noviceGuide.step2.num }/${ noviceGuide.totalStep })</span>
        </div>
        <span class="tempStep2-line"></span>
        <span class="tempStep2-dotted"></span>
        <span class="tempStep2-circle"></span>
    </div>`
})
// template（拖动滑杆调整）
const tempStep3 = Vue.extend({
    template:
        `<div class="tempStep3">
        <div style="width:168px" class="tempStep_textBox">
            <p>${ noviceGuide.step3.text }</p>
            <span id="guideQuit">退出(${ noviceGuide.step3.num }/${ noviceGuide.totalStep })</span>
        </div>
        <span class="tempStep3-line"></span>
        <span class="tempStep3-dotted"></span>
        <span class="tempStep3-circle"></span>
    </div>`
})
// template（精修左侧图片列表多选）
const tempStep4 = Vue.extend({
    template:
        `<div class="tempStep4">
        <span class="tempStep4-circle"></span>
        <span class="tempStep4-line"></span>
        <span class="tempStep4-dotted"></span>
        <div style="width:170px" class="tempStep_textBox">
            <p>${ noviceGuide.step4.text }</p>
            <span id="guideQuit">退出(${ noviceGuide.step4.num }/${ noviceGuide.totalStep })</span>
        </div>
    </div>`
})
// template（同步到选中图片）
const tempStep5 = Vue.extend({
    template:
        `<div class="tempStep5">
        <div style="width:232px" class="tempStep_textBox">
            <p>${ noviceGuide.step5.text }</p>
            <span id="guideQuit">退出(${ noviceGuide.step5.num }/${ noviceGuide.totalStep })</span>
        </div>
        <span class="tempStep5-line"></span>
        <span class="tempStep5-dotted"></span>
        <span class="tempStep5-circle"></span>

    </div>`
})
// template（导出图片）
const tempStep6 = Vue.extend({
    template:
        `<div class="tempStep6">
        <span class="tempStep6-circle"></span>
        <span class="tempStep6-dotted"></span>
        <span class="tempStep6-line"></span>
        <div style="width:264px" class="tempStep_textBox">
            <p>${ noviceGuide.step6.text }</p>
            <span id="guideQuit">退出(${ noviceGuide.step6.num }/${ noviceGuide.totalStep })</span>
        </div>
    </div>`
})

export default {


    data(): iData {
        return {
            step: 1,
            guidMask: null,
            tempDiv: null
        }
    },
    mixins: [
        toast,
        pointsMixin
    ],
    mounted() {
    },

    computed: {
        ...mapGetters('config', [
            'isShowNoviceGuide'
        ])
    },


    methods: {

        ...mapMutations('config', [
            '_SetIsShowNoviceGuide',
            '_SetGuideStep'
        ]),


        showGuide(step: any, className: string) {
            // @ts-ignore
            this.step = step
            // @ts-ignore
            this.$nextTick(async _ => {
                // @ts-ignore
                if (this.isShowNoviceGuide) {
                    // 当前步骤存储
                    this._SetGuideStep(step)
                    // @ts-ignore
                    this.PointInitGuide(step)
                    const res = await find(SHOWED_NOVICE_GUIDE)
                    if (!res) {
                        await DBIpcRender.insertToDB(DICTIONARY_TABLE, {
                            keyword: SHOWED_NOVICE_GUIDE,
                            value: APP_VERSION
                        })
                    }

                    const guidMask = new noviceGuideUtil()
                    // @ts-ignore
                    this.guidMask = guidMask
                    guidMask.addMask()
                    guidMask.showGuide(step, className)
                    this.commonMountFunc(step, className)
                    const quiteNode = document.getElementById('guideQuit')
                    // @ts-ignore
                    quiteNode ? quiteNode.addEventListener('click', e => {
                        this.allGuideQuit(step, className)
                    }) : ''
                }

            })
        },

        /**
         * 自定义挂载
         */
        commonMountFunc(step: number, className: any) {
            const tempDiv = <HTMLImageElement>document.createElement('div')
            tempDiv.setAttribute('id', `${ className }-tempDiv`)

            let node = document.getElementsByClassName(className)[0]
            // @ts-ignore

            node ? node.parentNode.appendChild(tempDiv) : ''
            switch (step) {
                case 1:
                    new tempStep1().$mount(`#${ className }-tempDiv`)
                    break
                case 2:
                    new tempStep2().$mount(`#${ className }-tempDiv`)
                    break
                case 3:
                    new tempStep3().$mount(`#${ className }-tempDiv`)
                    break
                case 4:
                    new tempStep4().$mount(`#${ className }-tempDiv`)
                    break
                case 5:
                    new tempStep5().$mount(`#${ className }-tempDiv`)
                    break
                case 6:
                    new tempStep6().$mount(`#${ className }-tempDiv`)
                    break
            }
        },

        /**
         * 退出当前引导（进入下一个引导）
         * 1：移除高亮区域；2：移除遮罩；3：移除tips提示
         */
        async guideQuit(className: any) {
            //@ts-ignore
            if (!this.isShowNoviceGuide) {
                return false
            }

            document.getElementsByClassName(className)[0].removeAttribute('style')
            // @ts-ignore
            this.guidMask.close()
            // @ts-ignore
            let myTemp = <HTMLImageElement>document.getElementsByClassName(`tempStep${ this.step }`)[0]
            // @ts-ignore
            // @ts-ignore
            document.getElementsByClassName(className)[0].parentNode.removeChild(myTemp)

            const quiteNode = document.getElementById('guideQuit')
            // @ts-ignore
            quiteNode ? quiteNode.removeEventListener('click', () => {
            }) : ''
        },

        allGuideQuit(step: number, className: any) {
            // @ts-ignore
            this.tsConfirm({
                title: '确认退出新手引导',
                message: '您也可以在右上角新手教程中查看具体教程',
                customMessageStyle: 'textAlign: center'
            }).then(() => {
                this.guideQuit(className)
                // @ts-ignore
                this._SetIsShowNoviceGuide(false)
                // @ts-ignore
                this.PointClickQuit(step)
            }).catch(() => {

            })
        }
    }
}
