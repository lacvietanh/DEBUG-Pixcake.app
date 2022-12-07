import Vue from 'vue'
import swipeChooseOp from '@/components/CollectionView/drag/swipeChooseOp'

const SwipeChoose = {
    install(Vue, options) {
        Vue.prototype.$swipeChooseShow = function (parentEl, options) {
            let SwipeChooseOpConstructor = Vue.extend(swipeChooseOp)
            const component = (new SwipeChooseOpConstructor(
                {
                    propsData: { ...options }
                })).$mount()
            parentEl.appendChild(component.$el)
            return component
        }
    }
}

export default SwipeChoose
