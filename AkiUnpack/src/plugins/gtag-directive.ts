import Vue from 'vue'
import { debounce } from 'lodash'

// @ts-ignore
import TsStat from '@/utils/TsStat/tsStat'
// eslint-disable-next-line camelcase
const sendEvent = debounce(function ({ event_id, data }: any) {
// eslint-disable-next-line camelcase
    if (event_id) {
        const tsStat = TsStat.getInstance()
        tsStat.event(event_id, data)
    }
}, 100, {
    maxWait: 300
})

export default function install(): void {
    Vue.directive('gtag-event', {
        bind(el, binding) {
            if (binding.value) {
                el.addEventListener('click', () => {
                    if (typeof binding.value === 'function') {
                        const data = binding.value()
                        if (data) {
                            if (data.event_id) {
                                sendEvent(data)
                            } else {
                                console.error('Please set valid parameters！exp: { event_id: string, data?: any }')
                            }
                        }
                    } else {
                        sendEvent(binding.value)
                    }
                })
            } else {
                console.error('Please set valid parameters！exp: { event_id: string, data?: any }')
            }
        },

        unbind(el) {
            el.removeEventListener('click', () => {
            })
        }
    })

    /*
  * 双击埋点上报
  * */
    Vue.directive('gtag-dbl-event', {
        bind(el, binding) {
            if (binding.value) {
                el.addEventListener('dblclick', () => {
                    if (typeof binding.value === 'function') {
                        binding.value()
                    } else {
                        sendEvent(binding.value)
                    }
                })
            } else {
                console.error('Please set valid parameters！exp: { event_id: string, data: any }')
            }
        },

        unbind(el) {
            el.removeEventListener('dblclick', () => {
            })
        }
    })
}
