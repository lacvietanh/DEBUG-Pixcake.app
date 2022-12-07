import Vue from 'vue'
// @ts-ignore
import SvgIcon from '@/components/svg-icon'// svg组件

// register globally
Vue.component('svg-icon', SvgIcon)

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
