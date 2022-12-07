import Vue from 'vue'
import VueI18n from 'vue-i18n' // import from runtime only

import { getCookie } from '@/utils/auth'

// @ts-ignore
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
// @ts-ignore
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang

// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'

Vue.use(VueI18n)

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    'zh-cn': {
        ...zhLocale,
        ...elementZhLocale
    }
}

export const getLocale = async (): Promise<string> => {
    const cookieLanguage = await getCookie('language')
    if (cookieLanguage) {
        return cookieLanguage
    }

    // Default language is english
    return 'zh-cn'
}

// console.log(getCookie())

const i18n = new VueI18n({
    // locale: getLocale(),
    messages: messages
})

export default i18n
