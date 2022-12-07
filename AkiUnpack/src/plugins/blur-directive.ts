import Vue from 'vue'

export default function install(): void {
    Vue.directive('blur', {
        bind(el: HTMLElement) {
            el.addEventListener('click', (evt: any) => {
                let target = evt.target
                if (target?.nodeName && ['i', 'span'].includes(target.nodeName.toLocaleLowerCase())) {
                    target = evt.target.parentNode
                }
                target.blur()
            })
        },

        unbind(el) {
            el.removeEventListener('click', () => {
            })
        }
    })
}
