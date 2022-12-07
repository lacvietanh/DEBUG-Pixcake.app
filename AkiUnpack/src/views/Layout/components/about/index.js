import Vue from 'vue'
import AboutUsDialog from '@/views/Layout/components/about/AboutUsDialog'

const aboutUsDialog = {
    install(Vue, options) {
        Vue.prototype.$aboutUsDialog = function (parentEl, options) {
            let AboutUsDialogConstructor = Vue.extend(AboutUsDialog)
            const component = (new AboutUsDialogConstructor(
                {
                    propsData: { ...options }
                })).$mount()
            parentEl.appendChild(component.$el)
            return component
        }
    }
}

export default aboutUsDialog
