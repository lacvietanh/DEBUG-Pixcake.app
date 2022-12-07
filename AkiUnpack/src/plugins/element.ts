import {
    Loading,
    Button,
    Dialog,
    Collapse,
    CollapseItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Radio,
    RadioButton,
    RadioGroup,
    Input,
    Carousel,
    CarouselItem,
    Tree,
    Form,
    FormItem,
    Cascader
} from 'element-ui'

import '@/assets/theme/common/font.css'

export default {
    install: (Vue: any): void => {
        Vue.prototype.$ELEMENT = { size: 'small' }

        Vue.use(Loading)
            .use(Button)
            .use(Dialog)
            .use(Collapse)
            .use(CollapseItem)
            .use(Dropdown)
            .use(DropdownItem)
            .use(DropdownMenu)
            .use(Radio)
            .use(RadioButton)
            .use(RadioGroup)
            .use(Input)
            .use(Carousel)
            .use(CarouselItem)
            .use(Tree)
            .use(Form)
            .use(FormItem)
            .use(Cascader)
    }
}
