/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

const files = require.context('.', false, /\.(js|ts)$/)
const modules: {
    [key: string]: {
        [key: string]: {}
    }
} = {}

files.keys().forEach(key => {
    if (['./index.js', './index.ts'].includes(key)) return
    modules[key.replace(/(\.\/|\.(js|ts))/g, '')] = files(key).default
})

export default modules
