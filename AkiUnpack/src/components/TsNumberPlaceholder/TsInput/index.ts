import TsInput from './index.vue'
import Vue from 'vue'

interface TsInputOptions {
    mountedCallback: () => {},
    changeCallback: () => {},
    destroyCallback: () => {},
    value: string | number | boolean,
    autofocus: boolean
}

const createTargetBeforeElDom = (targetEl: any, tag: keyof HTMLElementTagNameMap) => {
    const span = document.createElement(tag)
    const parentNode = targetEl?.parentNode
    parentNode?.insertBefore(span, targetEl)
    return span
}

const createTsInput = (targetEl: EventTarget | null, options: TsInputOptions) => {
    const placeholderDom = createTargetBeforeElDom(targetEl, 'span')
    const InputConstructor = Vue.extend(TsInput)
    return new InputConstructor({
        propsData: {
            mountedCallback: options.mountedCallback,
            changeCallback: options.changeCallback,
            destroyCallback: options.destroyCallback,
            value: options.value,
            autofocus: options.autofocus || true
        }
    }).$mount(placeholderDom)
}


export const useTsInput = () => {
    return {
        createTsInput,
        createTargetBeforeElDom
    }

}
