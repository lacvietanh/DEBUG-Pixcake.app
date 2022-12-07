import Vue from 'vue'
// @ts-ignore
import { getClientHeight, getClientWidth } from '@/utils/utils'

export default Vue.extend({
    data() {
        return {
            windowSize: {
                width: 0,
                height: 0
            }
        }
    },
    methods: {
        resetWindowSize() {
            this.windowSize = {
                width: getClientWidth(),
                height: getClientHeight()
            }
        },
        onWindowResize() {
            this.resetWindowSize()
        },
        listenWinSize(isNeed: boolean) {
            if (isNeed) {
                window.addEventListener('resize', this.onWindowResize)
            } else {
                window.removeEventListener('resize', this.onWindowResize)
            }
        }
    },
    mounted() {
        this.resetWindowSize()
        this.listenWinSize(true)
    },
    beforeDestroy() {
        this.listenWinSize(false)
    }
})
