export default {
    methods: {
        /**
         * 按钮失去焦点
         * @param evt
         */
        cancelBlur(evt: any) {
            let target = evt.target
            console.log('==> cancelBlur', target.nodeName)
            if (target.nodeName && ['i', 'span'].includes(target.nodeName.toLocaleLowerCase())) {
                target = evt.target.parentNode
            }
            target.blur()
        },

        /**
         * 移除CollapseItem组件的tabindex属性
         */
        removeCollapseItemTabindex(dom: any) {
            const domRef = dom
            if (domRef) {
                domRef.$el.firstChild.firstChild.setAttribute('tabindex', '')
            }
        },

        /**
         * 移除Collapse组件下所有Item组件的tabindex属性
         */
        removeCollapseTabindex(dom: any) {
            const domRef = dom
            if (domRef) {
                domRef.$children.forEach((child: any) => {
                    child.$el.firstChild.firstChild.setAttribute('tabindex', '')
                })
            }
        }
    }
}
