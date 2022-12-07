import TsSlider from './src/main'

/* istanbul ignore next */
TsSlider.install = function (Vue) {
    Vue.component(TsSlider.name, TsSlider)
}

export default TsSlider
