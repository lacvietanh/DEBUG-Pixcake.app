var render = function render(){var _vm=this,_c=_vm._self._c,_setup=_vm._self._setupProxy;return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_setup.showExportLoading),expression:"showExportLoading"}],staticClass:"project",attrs:{"element-loading-background":"rgba(0, 0, 0, 0.8)","element-loading-text":_setup.exportTip,"element-loading-spinner":"el-icon-loading"}},[_c(_setup.FuncHeader,{class:{ 'header-disabled': _setup.isDisableHeadView }}),_c('router-view',{staticClass:"project-func"}),_c(_setup.SyncPresetSettings,{ref:"syncPresetSettingsRefs",attrs:{"just-save":"","refineUUID":_setup.refineUUID}})],1)
}
var staticRenderFns = []

export { render, staticRenderFns }