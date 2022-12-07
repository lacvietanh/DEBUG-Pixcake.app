(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-3aa35bb6"], {
        "2ad9": function(e, t, i) {},
        "3a5e": function(e, t, i) {
            "use strict";
            i("66be")
        },
        "40cc": function(e, t, i) {
            "use strict";
            i("2ad9")
        },
        "66be": function(e, t, i) {},
        "74f5": function(e, t, i) {
            "use strict";
            i("b7a2")
        },
        a5d8: function(e, t, i) {
            "use strict";
            i.r(t);
            var a = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t("div", {
                        directives: [{
                            name: "loading",
                            rawName: "v-loading",
                            value: i.showExportLoading,
                            expression: "showExportLoading"
                        }],
                        staticClass: "project",
                        attrs: {
                            "element-loading-background": "rgba(0, 0, 0, 0.8)",
                            "element-loading-text": i.exportTip,
                            "element-loading-spinner": "el-icon-loading"
                        }
                    }, [t(i.FuncHeader, {
                        class: {
                            "header-disabled": i.isDisableHeadView
                        }
                    }), t("router-view", {
                        staticClass: "project-func"
                    }), t(i.SyncPresetSettings, {
                        ref: "syncPresetSettingsRefs",
                        attrs: {
                            "just-save": "",
                            refineUUID: i.refineUUID
                        }
                    })], 1)
                },
                s = [],
                o = i("2b0e"),
                n = i("0613"),
                r = i("64a0"),
                l = i("4a9f"),
                c = (i("caad"), function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "header global__top-nav border-line-style"
                    }, [e.leftBtnSlot ? [e._t("left-btn")] : [t("div", {
                        staticClass: "left-func-container"
                    }, [t("el-button", {
                        staticClass: "return-home-btn",
                        attrs: {
                            size: "mini",
                            disabled: e.getIconDisabled
                        },
                        on: {
                            click: e.onClickHome
                        }
                    }, [e.getIconDisabled ? t("img", {
                        staticClass: "return-icon",
                        attrs: {
                            src: e.$getIconPath("nav_icon_workbench_disabled@3x.png"),
                            alt: ""
                        }
                    }) : t("i", {
                        staticClass: "el-icon-s-home return-icon"
                    })]), ["batchRetouch", "photoFinishing"].includes(e.routeName) ? ["darwin" === e.$platform ? [t("div", {
                        staticClass: "addFileWrapCla"
                    }, [t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointAddSecond,
                            expression: "PointAddSecond"
                        }],
                        staticClass: "addFileCla",
                        attrs: {
                            size: "mini",
                            icon: "el-icon-plus",
                            disabled: e.getIconDisabled
                        },
                        on: {
                            click: function(t) {
                                e.cancelBlur(t), e.onCommand("onImportFileAndDir")
                            }
                        }
                    })], 1)] : e._e(), "darwin" === e.$platform || e.getIconDisabled ? e._e() : [t("el-dropdown", {
                        staticClass: "dropDownCla",
                        attrs: {
                            "hide-on-click": "",
                            placement: "bottom-start"
                        },
                        on: {
                            "visible-change": e.onAddFileVisible,
                            command: e.onCommand
                        }
                    }, [t("div", {
                        staticClass: "addFileWrapCla"
                    }, [t("el-button", {
                        staticClass: "addFileCla",
                        attrs: {
                            size: "mini",
                            disabled: e.getIconDisabled,
                            icon: "el-icon-plus"
                        }
                    })], 1), t("el-dropdown-menu", {
                        attrs: {
                            slot: "dropdown"
                        },
                        slot: "dropdown"
                    }, [t("el-dropdown-item", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointAddSecond,
                            expression: "PointAddSecond"
                        }],
                        attrs: {
                            command: "onImportFile"
                        }
                    }, [t("div", [e._v("导入图片")])]), t("el-dropdown-item", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointAddSecond,
                            expression: "PointAddSecond"
                        }],
                        attrs: {
                            divided: "",
                            command: "onImportDir"
                        }
                    }, [t("div", [e._v("导入Tập tin夹")])])], 1)], 1)]] : e._e()], 2)], t("div", {
                        staticClass: "center-func-container menu"
                    }, [e._l(e.menuList, (function(i, a) {
                        return [t("div", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: e.showFunc(i),
                                expression: "showFunc(menu)"
                            }],
                            key: i.routeName + a,
                            staticClass: "item",
                            class: {
                                active: i.isActive,
                                disabled: i.disabled
                            },
                            attrs: {
                                title: i.name
                            },
                            on: {
                                click: function(t) {
                                    i.disabled ? i.disableFunc() : e.onRouterPush(i.routeName, {})
                                }
                            }
                        }, [t("span", {
                            staticClass: "menu-title"
                        }, [e._v(e._s(i.subTitle))])])]
                    }))], 2), t("div", {
                        staticClass: "right-func-container menu"
                    }, [t("nav-entry-group", {
                        attrs: {
                            "dark-vip": "",
                            "nav-list": ["debug", "manual-import", "export-btn", "gift", "divider", "export", "userinfo", "divider", "help", "set", "divider", "vip"]
                        }
                    }, [t("template", {
                        slot: "export-btn"
                    }, [t("div", {
                        staticClass: "guideClass6"
                    }, [t("el-button", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.hasDownloadPermission,
                            expression: "hasDownloadPermission"
                        }],
                        staticClass: "item download-btn",
                        class: {
                            active: e.hasDownloadActiveStyle
                        },
                        attrs: {
                            type: "primary",
                            disabled: e.canDownload
                        },
                        on: {
                            click: e.onDownloadIconClick
                        }
                    }, [t("img", {
                        attrs: {
                            src: e.downloadImgUrl,
                            alt: ""
                        }
                    }), e._v(" 导出图片 ")])], 1)]), e.canShowManualImportButton ? t("template", {
                        slot: "manual-import"
                    }, [t("el-button", {
                        staticClass: "claManualImportBtn",
                        attrs: {
                            type: "primary"
                        },
                        on: {
                            click: e.onManualImportClick
                        }
                    }, [e._v("载入图片")])], 1) : e._e()], 2)], 1), e.hasDownloadPermission ? t("ExportSettingDialog", {
                        attrs: {
                            "export-setting-data": e.exportSetting
                        },
                        on: {
                            exportSettingCallback: e.exportSettingCallback,
                            changeShowExportSelectDialog: e.onChangeShowExportSelectDialog
                        },
                        model: {
                            value: e.showExportSelectDialog,
                            callback: function(t) {
                                e.showExportSelectDialog = t
                            },
                            expression: "showExportSelectDialog"
                        }
                    }) : e._e()], 2)
                }),
                p = [],
                u = i("2f62"),
                h = i("67a1"),
                d = i("2ef0"),
                m = i("74d8"),
                g = i("442f"),
                v = i("7b38"),
                b = i("c75e"),
                f = i("620c"),
                S = i("8b98"),
                P = i("5c96"),
                w = i("52b8"),
                x = i("6310"),
                D = i("ccd2"),
                _ = i("45a3"),
                C = i("9f7e"),
                y = i("ddbc"),
                k = i("74f7"),
                N = i("25c2"),
                I = i("879d"),
                $ = function() {
                    var e = this,
                        t = e._self._c;
                    return t("el-dialog", {
                        staticClass: "choosePresetDialog",
                        attrs: {
                            top: "30vh",
                            width: "502px",
                            "custom-class": "setting-dialog gpu-switch-dialog",
                            visible: e.visible,
                            "close-on-click-modal": !1,
                            "close-on-press-escape": !1
                        },
                        on: {
                            "update:visible": function(t) {
                                e.visible = t
                            }
                        }
                    }, [t("div", {
                        attrs: {
                            slot: "title"
                        },
                        slot: "title"
                    }, [e.needShowPresetSelect ? t("div", {
                        staticClass: "title",
                        staticStyle: {
                            "margin-top": "0",
                            color: "#D9D9D9"
                        }
                    }, [e._v("选择一个Đặt trước应用到 "), t("span", {
                        staticStyle: {
                            color: "#F5D228",
                            "font-size": "20px",
                            "font-weight": "500"
                        }
                    }, [e._v(e._s(e.exportSettingData.totalNumber))]), e._v(" Ảnh并导出 ")]) : t("div", {
                        staticClass: "title",
                        staticStyle: {
                            "margin-top": "0",
                            color: "#D9D9D9"
                        }
                    }, [e._v("导出 "), t("span", {
                        staticStyle: {
                            color: "#F5D228",
                            "font-size": "20px",
                            "font-weight": "500"
                        }
                    }, [e._v(e._s(e.exportSettingData.totalNumber))]), e._v(" Ảnh "), e.exportSettingData.isNoePresetNumber > 0 ? [e._v(", 其中 "), t("span", {
                        staticStyle: {
                            color: "#F5D228",
                            "font-size": "20px",
                            "font-weight": "500"
                        }
                    }, [e._v(e._s(e.exportSettingData.isNoePresetNumber))]), e._v("张是原图 ")] : e._e()], 2)]), t("div", {
                        staticClass: "container"
                    }, [t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.needShowPresetSelect,
                            expression: "needShowPresetSelect"
                        }],
                        staticClass: "preset-select-container"
                    }, [t("span", [e._v("Đặt trước：")]), t("div", {
                        staticStyle: {
                            position: "relative"
                        }
                    }, [t("el-cascader", {
                        staticClass: "presetSelect",
                        attrs: {
                            filterable: "",
                            placeholder: "Vui lòng chọn一个Đặt trước",
                            options: e.provinceOptions
                        },
                        on: {
                            "visible-change": e.visibleChange
                        },
                        model: {
                            value: e.whichPreset,
                            callback: function(t) {
                                e.whichPreset = t
                            },
                            expression: "whichPreset"
                        }
                    }), t("span", {
                        staticClass: "right_icon"
                    }, [t("img", {
                        attrs: {
                            src: e.$getIconPath("icon_arrow_up.png"),
                            alt: ""
                        }
                    }), t("img", {
                        attrs: {
                            src: e.$getIconPath("icon_arrow_down.png"),
                            alt: ""
                        }
                    })])], 1)]), t("div", {
                        staticClass: "path-select-container"
                    }, [t("span", [e._v("导出至：")]), t("div", {
                        staticClass: "path-select-sub-container"
                    }, [t("div", {
                        staticClass: "path-select-show",
                        on: {
                            click: e.onSelectExportPathClick
                        }
                    }, [t("el-tooltip", {
                        attrs: {
                            effect: "dark",
                            content: e.finalSavePath,
                            placement: "top"
                        },
                        model: {
                            value: e.tipShow,
                            callback: function(t) {
                                e.tipShow = t
                            },
                            expression: "tipShow"
                        }
                    }, [t("span", {
                        on: {
                            mouseleave: e.handleMouseLeave,
                            mouseenter: e.handleMouseEnter
                        }
                    }, [e._v(e._s(e._f("filterFormatPath")(e.finalSavePath)))])])], 1), t("div", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointExportSelectPath,
                            expression: "PointExportSelectPath"
                        }],
                        staticClass: "img-container",
                        on: {
                            click: e.onSelectExportPathClick
                        }
                    }, [t("img", {
                        attrs: {
                            src: e.$getIconPath("export_icon_action_location@3x.png"),
                            alt: ""
                        }
                    })])])]), t("div", {
                        staticClass: "setting-container"
                    }, [t("span"), t("el-collapse", {
                        staticClass: "export-setting-container",
                        on: {
                            change: e.PointExportAdvancedSetting
                        }
                    }, [t("el-collapse-item", {
                        attrs: {
                            title: "高级设置",
                            name: "1"
                        }
                    }, [t("div", {
                        staticClass: "export-setting-container"
                    }, [t("span", {
                        staticClass: "export-title"
                    }, [e._v("导出Vị trí：")]), t("div", {
                        staticClass: "export-setting-content"
                    }, [t("el-checkbox", {
                        staticClass: "firstChild",
                        on: {
                            change: function(t) {
                                return e.switchSetting(t, "createNewDir")
                            }
                        },
                        model: {
                            value: e.createNewDir,
                            callback: function(t) {
                                e.createNewDir = t
                            },
                            expression: "createNewDir"
                        }
                    }, [e._v(" 新建项目Tập tin夹存储 ")]), t("el-checkbox", {
                        on: {
                            change: function(t) {
                                return e.switchSetting(t, "setDefaultPath")
                            }
                        },
                        model: {
                            value: e.setDefaultPath,
                            callback: function(t) {
                                e.setDefaultPath = t
                            },
                            expression: "setDefaultPath"
                        }
                    }, [e._v(" 设为默认导出路经 ")]), t("el-checkbox", {
                        on: {
                            change: function(t) {
                                return e.switchSetting(t, "restoreImportDir")
                            }
                        },
                        model: {
                            value: e.restoreImportDir,
                            callback: function(t) {
                                e.restoreImportDir = t
                            },
                            expression: "restoreImportDir"
                        }
                    }, [e._v(" 保留导入时的Tập tin夹命名 ")])], 1)]), t("div", {
                        staticClass: "dividing-line"
                    }), t("div", {
                        staticClass: "export-setting-container"
                    }, [t("span", {
                        staticClass: "export-title"
                    }, [e._v("图片格式：")]), t("span", {
                        staticClass: "photo-format-span"
                    }, [t("el-select", {
                        on: {
                            change: e.exportPhotoFormatChange
                        },
                        model: {
                            value: e.formatValue,
                            callback: function(t) {
                                e.formatValue = t
                            },
                            expression: "formatValue"
                        }
                    }, e._l(e.options, (function(e) {
                        return t("el-option", {
                            key: e.value,
                            staticClass: "photo-format-option",
                            attrs: {
                                label: e.label,
                                value: e.value
                            }
                        })
                    })), 1), t("span", {
                        staticClass: "right_icon"
                    }, [t("img", {
                        attrs: {
                            src: e.$getIconPath("icon_arrow_up.png"),
                            alt: ""
                        }
                    }), t("img", {
                        attrs: {
                            src: e.$getIconPath("icon_arrow_down.png"),
                            alt: ""
                        }
                    })])], 1)]), e.needShowJPGLevel ? t("div", {
                        staticClass: "export-format-container"
                    }, [t("span", {
                        staticClass: "export-title"
                    }, [e._v("品质(jpg)：")]), t("div", {
                        staticClass: "export-content"
                    }, [t("div", {}, [t("el-input-number", {
                        staticClass: "level-container-input",
                        attrs: {
                            size: "mini",
                            min: 0,
                            max: 14,
                            precision: 0,
                            controls: !1
                        },
                        model: {
                            value: e.jpgLevel,
                            callback: function(t) {
                                e.jpgLevel = t
                            },
                            expression: "jpgLevel"
                        }
                    }), t("el-select", {
                        staticClass: "level-container-select",
                        attrs: {
                            size: "mini",
                            value: e.levelSelectValue
                        },
                        on: {
                            change: function(t) {
                                e.jpgLevel = {
                                    0: 3,
                                    1: 5,
                                    2: 8,
                                    3: 10
                                } [t]
                            }
                        }
                    }, e._l(e.levelOptions, (function(e) {
                        return t("el-option", {
                            key: e.value,
                            staticClass: "photo-format-option",
                            attrs: {
                                label: e.label,
                                value: e.value
                            }
                        })
                    })), 1)], 1), t("div", {
                        staticClass: "level-container"
                    }, [t("ts-slider", {
                        ref: "slider",
                        staticClass: "level-container-slider gray",
                        attrs: {
                            min: 0,
                            max: 14,
                            value: e.jpgLevel,
                            "show-tooltip": !1
                        },
                        on: {
                            input: e.onJpgSlideChange
                        }
                    }), t("div", {
                        staticClass: "level-container-label"
                    }, [t("span", [e._v("小Tập tin")]), t("span", [e._v("大文件")])])], 1)])]) : e._e(), t("div", {
                        staticClass: "dividing-line"
                    }), t("div", {
                        staticClass: "export-setting-container"
                    }, [t("span", {
                        staticClass: "export-title"
                    }, [e._v("色彩空间：")]), t("div", {
                        staticClass: "export-setting-content"
                    }, [t("el-checkbox", {
                        staticClass: "firstChild",
                        on: {
                            change: function(t) {
                                return e.switchSetting(t, "changeToSRGB")
                            }
                        },
                        model: {
                            value: e.changeToSRGB,
                            callback: function(t) {
                                e.changeToSRGB = t
                            },
                            expression: "changeToSRGB"
                        }
                    }, [e._v(" 转换为sRGB ")])], 1)])])], 1)], 1)]), t("div", {
                        attrs: {
                            slot: "footer"
                        },
                        slot: "footer"
                    }, [t("el-button", {
                        staticClass: "exportBtn",
                        attrs: {
                            size: "mini",
                            type: "default"
                        },
                        on: {
                            click: e.noApplay
                        }
                    }, [e._v("Hủy")]), t("el-button", {
                        staticClass: "exportBtn",
                        attrs: {
                            size: "mini",
                            type: "primary",
                            loading: e.loading,
                            disabled: 0 === e.exportSettingData.totalNumber
                        },
                        on: {
                            click: e.applyAll
                        }
                    }, [e._v("导出 ")])], 1)])
                },
                j = [],
                T = i("df7c"),
                E = i.n(T),
                F = i("3010"),
                O = i("f5de"),
                A = i("ea3f"),
                B = i("b513"),
                L = i("3b32"),
                M = i("8f12"),
                G = i("2372"),
                R = i("a34d"),
                V = i("bd5e"),
                U = {
                    name: "ExportSettingDialog",
                    mixins: [g["a"], w["a"]],
                    components: {
                        "el-checkbox": P["Checkbox"],
                        "el-tooltip": P["Tooltip"],
                        "el-cascader": P["Cascader"],
                        "el-dialog": O["a"],
                        "el-select": P["Select"],
                        "el-option": P["Option"],
                        "el-input-number": P["InputNumber"],
                        TsSlider: R["a"]
                    },
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        },
                        exportSettingData: {
                            type: Object,
                            default: null
                        }
                    },
                    data() {
                        return {
                            isApplyToClose: !1,
                            loading: !1,
                            visible: this.value,
                            number: null,
                            whichPreset: "",
                            finalSavePath: "",
                            saveDirPath: "",
                            createNewDir: !0,
                            setDefaultPath: !0,
                            restoreImportDir: !0,
                            changeToSRGB: !1,
                            needShowPresetSelect: !1,
                            tipShow: !1,
                            jpgLevel: 12,
                            needShowJPGLevel: !1,
                            options: [{
                                value: M["e"]["origin"],
                                key: "origin",
                                label: " Ban đầu格式"
                            }, {
                                value: M["e"]["jpeg"],
                                key: "jpeg",
                                label: "JPG"
                            }, {
                                value: M["e"]["tiff"],
                                key: "tiff",
                                label: "TIFF"
                            }],
                            levelOptions: [{
                                value: 0,
                                label: " 低"
                            }, {
                                value: 1,
                                label: "中"
                            }, {
                                value: 2,
                                label: "高"
                            }, {
                                value: 3,
                                label: "最佳"
                            }],
                            formatValue: M["e"]["origin"]
                        }
                    },
                    filters: {
                        filterFormatPath(e) {
                            if (e && e.length >= 36) {
                                let t = e.substr(0, 18),
                                    i = e.substr(e.length - 18, 18);
                                return ` ${t} ... ${i}`
                            }
                            return e
                        }
                    },
                    computed: {
                        ...Object(u["c"])("config", ["diskWarnCondition"]),
                        levelSelectValue() {
                            return [10, 11, 12, 13, 14].includes(this.jpgLevel) ? 3 : [8, 9].includes(this.jpgLevel) ? 2 : [5, 6, 7].includes(this.jpgLevel) ? 1 : 0
                        },
                        provinceOptions() {
                            let e = [];
                            return JSON.parse(JSON.stringify(this.$store.getters.presetTree)).map((t, i) => {
                                let a = [];
                                t.children.map((e, t) => {
                                    a.push({
                                        value: e.id,
                                        label: e.label
                                    })
                                }), e.push({
                                    value: t.id,
                                    label: t.label,
                                    children: a
                                })
                            }), e
                        },
                        allPreset() {
                            const e = JSON.parse(JSON.stringify(this.$store.state.presetting.oriPreset));
                            e.classId = this.$store.state.presetting.recommendPreItems[0].classId;
                            const t = Array(e).concat(this.$store.state.presetting.preItems).concat(this.$store.state.presetting.recommendPreItems);
                            return t
                        }
                    },
                    watch: {
                        value: {
                            handler(e) {
                                this.visible = e;
                                const t = F["a"].getInstance();
                                e ? (this.initSettingData(this.exportSettingData), this.whichPreset = null, this.isApplyToClose = !1, this.getPresetClass(), t.unRegisterShortcut()) : t.registerShortcut()
                            },
                            immediate: !0
                        },
                        visible(e) {
                            this.$emit("input", e), e || this.isApplyToClose || this.PointExportCancel()
                        }
                    },
                    mounted() {},
                    methods: {
                        ...Object(u["b"])(["getPresetClass"]),
                        ...Object(u["c"])(["oriPreset"]),
                        ...Object(u["d"])("config", ["updateConfigModel", "setExportJFPFormatVal"]),
                        getDiskFreeSpaceAsShort(e) {
                            let t = 0;
                            return t = this.$isWin ? e.available / 1024 / 1024 / 1024 : e.available / 1e3 / 1e3 / 1e3, t
                        },
                        initSettingData(e) {
                            console.log("exportSettingData: ", e);
                            let t = n["a"].state.config.configModel;
                            this.createNewDir = t.createNewDir, this.restoreImportDir = t.restoreImportDir, this.setDefaultPath = t.setDefaultPath, this.setDefaultPath ? this.saveDirPath = t.defaultSavePath : e.temporaryStoragePath ? this.saveDirPath = e.temporaryStoragePath : this.saveDirPath = e.savePath, this.createNewDir ? this.finalSavePath = this.saveDirPath + E.a.sep + e.exportSubDirPath : this.finalSavePath = this.saveDirPath, this.changeToSRGB = !!t.changeToSRGB, this.needShowPresetSelect = e.needShowSelectPreset, e.totalNumber != e.isTiffNumber && (this.needShowJPGLevel = !0), this.jpgLevel = n["a"].state.config.exportJPGFormatVal
                        },
                        visibleChange(e) {
                            e && null === this.whichPreset && (this.whichPreset = this.$store.state.presetting.selectPreset, this.PointExportSelectPreset())
                        },
                        handleMouseLeave() {
                            this.tipShow = !1
                        },
                        handleMouseEnter() {
                            this.tipShow = !0
                        },
                        exportPhotoFormatChange() {
                            this.$store.commit("setExportPhotoFormat", this.formatValue), 3 == this.formatValue ? this.needShowJPGLevel = !1 : 2 == this.formatValue || this.exportSettingData.totalNumber != this.exportSettingData.isTiffNumber ? this.needShowJPGLevel = !0 : this.needShowJPGLevel = !1
                        },
                        onJpgSlideChange(e) {
                            this.jpgLevel = e
                        },
                        switchSetting(e, t) {
                            let i = n["a"].state.config.configModel,
                                a = i;
                            "createNewDir" === t ? (a.createNewDir = e, this.createNewDir ? this.finalSavePath = this.saveDirPath + E.a.sep + this.exportSettingData.exportSubDirPath : this.finalSavePath = this.saveDirPath) : "restoreImportDir" === t ? a.restoreImportDir = e : "setDefaultPath" === t ? (a.setDefaultPath = e, a.setDefaultPath ? a.defaultSavePath = this.saveDirPath : a.defaultSavePath = null) : "changeToSRGB" === t && (a.changeToSRGB = e), console.log("updateConfigModel : ", a), this.updateConfigModel({
                                data: a
                            })
                        },
                        async onSelectExportPathClick() {
                            const e = await window.$dialog.showOpenDirDialog();
                            if (e && e.selectPath) {
                                this.saveDirPath = e.selectPath;
                                let t = n["a"].state.config.configModel,
                                    i = t;
                                i.setDefaultPath && (i.defaultSavePath = e.selectPath), this.createNewDir ? this.finalSavePath = e.selectPath + E.a.sep + this.exportSettingData.exportSubDirPath : this.finalSavePath = e.selectPath, this.updateConfigModel({
                                    data: i
                                }), _["a"].updateBatchForValue(N["J"], [this.exportSettingData.currentProject.id], "temporaryStoragePath", e.selectPath)
                            }
                        },
                        noApplay() {
                            this.visible = !1
                        },
                        async applyAll() {
                            if (this.needShowPresetSelect && (null == this.whichPreset || "" == this.whichPreset)) return this.tsNotify({
                                message: "请先选择一个Đặt trước再导出哦~"
                            }), !1;
                            let e = this.finalSavePath;
                            if (await L["a"].mkdirSync(e), e.length >= V["j"] && A["a"].isWin && !A["a"].isLargeThanWin10Version) return void this.tsNotify({
                                message: "导出路径太长了，请先修改导出路径后再重试～"
                            });
                            const t = await B["a"].statSync(e);
                            if (!t.mbIsDir) return void this.tsNotify({
                                message: "没有该导出路径的访问权限，请先修改导出路径后再重试～"
                            });
                            let i = (await G["a"].parse(this.finalSavePath)).root.toUpperCase() + ":",
                                a = "/",
                                s = this.$isWin ? i : a,
                                o = await A["a"].getDiskSize(s);
                            if (o && null !== o && void 0 !== o && o.isValid) {
                                let e = this.getDiskFreeSpaceAsShort(o);
                                const t = this.diskWarnCondition.minSystemDiskFreeCapacity;
                                let i = e < t;
                                if (i)
                                    if (this.$emit("changeShowExportSelectDialog", !1), this.$isWin) {
                                        let e = null === o || void 0 === o ? void 0 : o.diskPath;
                                        this.tsConfirm({
                                            message: "本次导出路径的磁盘空间（" + e + "）不足，建议您更改磁盘路径后再导出，否则可能会导致失败哦～",
                                            confirmButtonText: "更改导出磁盘",
                                            cancelButtonText: "直接导出",
                                            customMessageStyle: "textAlign: left",
                                            closeOnClickModal: !1,
                                            distinguishCancelAndClose: !0
                                        }).then(() => {
                                            this.$emit("changeShowExportSelectDialog", !0)
                                        }).catch(e => {
                                            "close" !== e && this.exportTask()
                                        })
                                    } else this.tsConfirm({
                                        message: "本次导出路径的磁盘空间不足，建议您清理磁盘空间后再导出，否则可能会导出失败哦~",
                                        confirmButtonText: "稍后导出",
                                        cancelButtonText: "直接导出",
                                        customMessageStyle: "textAlign: left",
                                        closeOnClickModal: !1,
                                        distinguishCancelAndClose: !0
                                    }).then(() => {
                                        console.log("点击稍后导出，结束")
                                    }).catch(e => {
                                        "close" !== e && this.exportTask()
                                    });
                                else this.exportTask()
                            } else this.exportTask()
                        },
                        exportTask() {
                            let e = null;
                            if (this.needShowPresetSelect) {
                                let t = this.$store.state.presetting.recommendPreItems,
                                    i = this.$store.state.presetting.preItems,
                                    a = this.$store.state.presetting.oriPreset;
                                t = [a].concat(i).concat(t), e = t.filter(e => this.whichPreset[1] == e.id)
                            }
                            const t = this.whichPreset && this.whichPreset[1] || null;
                            let i = this.finalSavePath,
                                a = this.options[this.formatValue - 1].key;
                            this.PointExportConfirm({
                                newfile: this.createNewDir,
                                defaultpath: this.setDefaultPath,
                                keepfolder: this.restoreImportDir,
                                color: this.changeToSRGB ? "srgb" : "original",
                                format: a
                            }, t), this.isApplyToClose = !0, this.setExportJFPFormatVal(this.jpgLevel), this.$emit("exportSettingCallback", [i, e, this.createNewDir]), this.formatValue = M["e"].origin
                        }
                    }
                },
                J = U,
                Q = (i("74f5"), i("2877")),
                z = Object(Q["a"])(J, $, j, !1, null, "81615f2e", null),
                H = z.exports,
                W = i("bdb8"),
                q = {
                    name: "ExportBtn",
                    mixins: [w["a"], g["a"]],
                    components: {
                        ExportSettingDialog: H
                    },
                    setup(e) {
                        var t;
                        const i = null === (t = Object(o["getCurrentInstance"])()) || void 0 === t ? void 0 : t.proxy,
                            a = o["default"].extend(g["a"]),
                            s = new a,
                            {
                                PointExportContinue: r,
                                PointExportRecharge: l,
                                PointExportClick: c
                            } = Object(W["a"])(),
                            p = Object(o["ref"])(!1),
                            u = Object(o["ref"])(!1);
                        let m = Object(o["reactive"])({
                            exportTimes: -1,
                            currentProject: {
                                id: -1,
                                exportTimes: -1
                            },
                            isNoePresetNumber: -1,
                            totalNumber: -1,
                            isRawNumber: -1,
                            needShowSelectPreset: !1,
                            exportSubDirPath: "",
                            exportDirPath: "",
                            savePath: "",
                            temporaryStoragePath: ""
                        });
                        const {
                            showFundLackView: v
                        } = Object(y["a"])(), f = (e = "套餐剩余可用张数不足，Không có法成功导出，请及时充值哦") => {
                            n["a"].commit("changeDownloadStatus", {
                                status: !0
                            }), v(e, {
                                onSuccess: () => u.value = !1,
                                onCancel: () => u.value = !1
                            })
                        };

                        function S(e, t, i, a) {
                            let o = {
                                exportDirPath: e,
                                exportDirName: t,
                                createNewDir: i,
                                project: a,
                                success(e) {
                                    if (e) {
                                        const t = n["a"].getters["project/activeProject"];
                                        t.exportTimes = e.exportTimes, _["a"].updateByKeys(N["J"], t, ["exportTimes"]), n["a"].commit("presetSuit/_CLEAR_PALETTE_PRESET_CACHE"), n["a"].commit("project/_UpdateProject", t)
                                    }
                                    u.value = !1, b["a"].$emit("export-succeed");
                                    const t = setTimeout(() => {
                                        s.tsNotify({
                                            message: "正在导出中，可以在导出列表Xem进度。",
                                            type: "success"
                                        }), n["a"].commit("changeDownloadStatus", {
                                            status: !0
                                        }), clearTimeout(t)
                                    }, 500)
                                },
                                fail(e) {
                                    u.value = !1;
                                    const t = setTimeout(() => {
                                        n["a"].commit("changeDownloadStatus", {
                                            status: !0
                                        }), clearTimeout(t)
                                    }, 500);
                                    e ? e.code === C["b"] ? f() : e.code === C["a"] ? f("剩余可用张数不足，请联系贵司管理员补充张数哦") : s.tsNotify({
                                        type: "error",
                                        message: e.msg
                                    }) : (console.error("exportFunc : ", e), s.tsNotify({
                                        type: "error",
                                        message: "创建导出订单失败，请重试"
                                    }))
                                }
                            };
                            n["a"].dispatch("asyncPrePay", o)
                        }
                        const P = Object(d["debounce"])((async function(e, t) {
                            let a = m.totalNumber,
                                o = await window.$net.isOnline();
                            if (!o) return void s.tsNotify({
                                type: "error",
                                message: "当前Không có网络,不支持下载，请检查网络。"
                            });
                            u.value = !0, n["a"].commit("changeDownloadStatus", {
                                status: !1
                            }), b["a"].$emit("onExportClick");
                            try {
                                await n["a"].dispatch("loadVipInfo")
                            } catch (p) {
                                return u.value = !1, n["a"].commit("changeDownloadStatus", {
                                    status: !0
                                }), void s.tsNotify({
                                    type: "error",
                                    message: "用户信息获取失败, Xác nhận网络是否稳定"
                                })
                            }
                            let c = i.user;
                            if (c)
                                if (0 === c.leftNum) {
                                    const i = setTimeout(() => {
                                        S(e, m.exportSubDirPath, t, m.currentProject), clearTimeout(i)
                                    }, 200)
                                } else if (c.leftNum < a) {
                                const o = await I["a"].getInstance().getIsAllowTopUp(),
                                    p = `当前套餐剩余${c.leftNum}张，本次导出预计消耗${a}张，这批照片将Không có法全部成功导出，`;
                                let d = p + "建议您充值后再导出哦~";
                                o || (d = p + (N["v"] ? "请联系管理员" : "请联系贵司管理员补充张数哦")), s.tsConfirm({
                                    title: d,
                                    cancelButtonText: "继续导出",
                                    confirmButtonText: "马上充值",
                                    showConfirmButton: o,
                                    closeOnClickModal: !1,
                                    distinguishCancelAndClose: !0,
                                    beforeClose: function(i, a, s) {
                                        "cancel" === i && (r(), S(e, m.exportSubDirPath, t, m.currentProject));
                                        const o = setTimeout(() => {
                                            u.value = !1, n["a"].commit("changeDownloadStatus", {
                                                status: !0
                                            }), clearTimeout(o)
                                        }, 200);
                                        s()
                                    }
                                }).then(() => {
                                    l(), u.value = !1, null === i || void 0 === i || i.PointMemberPriceClick(), h["a"].send("open-member-plan-window", null);
                                    const e = setTimeout(() => {
                                        n["a"].commit("changeDownloadStatus", {
                                            status: !0
                                        }), clearTimeout(e)
                                    }, 200)
                                }).catch(e => {})
                            } else {
                                const i = setTimeout(() => {
                                    S(e, m.exportSubDirPath, t, m.currentProject), clearTimeout(i)
                                }, 200)
                            } else u.value = !1, n["a"].commit("changeDownloadStatus", {
                                status: !0
                            }), s.tsNotify({
                                type: "error",
                                message: "用户信息获取失败, Xác nhận网络是否稳定"
                            })
                        }), 200);
                        async function w(e) {
                            let [t, i, a] = e;
                            if (i) {
                                var r;
                                const e = null === (r = Object(o["getCurrentInstance"])()) || void 0 === r ? void 0 : r.proxy,
                                    t = i[0];
                                let a = Number(t.version);
                                if (a && a > k["b"]) return void s.tsConfirm({
                                    title: "Hệ thống nhắc",
                                    message: "Bạn cần để nâng cấp phiên bản mới nhất để sử dụng các sẵn Oh~",
                                    showCancelButton: !1
                                }).then(() => {});
                                let {
                                    isFromRefineTab: l,
                                    refineOrGalleryUUID: c
                                } = n["a"].getters["exportEffectCfg"];
                                l ? await x["b"].refine.applyAllPreset(c, {
                                    presetSuitId: t.id,
                                    palettePresetId: t.palettePresetId,
                                    presetId: t.beautifyPresetId
                                }) : await x["b"].gallery.applyAllPreset(c, {
                                    presetSuitId: t.id,
                                    palettePresetId: t.palettePresetId,
                                    presetId: t.beautifyPresetId
                                }), "photoFinishing" == (null === e || void 0 === e ? void 0 : e.$route.name) ? b["a"].$emit("initloadPhotoFinishing") : "batchRetouch" == (null === e || void 0 === e ? void 0 : e.$route.name) && b["a"].$emit("initloadBatchRetouch")
                            }
                            p.value = !1, P(t, a)
                        }

                        function $(e) {
                            p.value = e
                        }
                        const j = async e => {
                            const t = {
                                    exportTimes: -1,
                                    currentProject: {
                                        id: -1,
                                        exportTimes: -1
                                    },
                                    isNoePresetNumber: -1,
                                    totalNumber: -1,
                                    isJpgNumber: -1,
                                    isPngNumber: -1,
                                    isRawNumber: -1,
                                    isTiffNumber: -1,
                                    rawNumberData: "",
                                    needShowSelectPreset: !1,
                                    exportSubDirPath: "",
                                    exportDirPath: "",
                                    savePath: "",
                                    temporaryStoragePath: ""
                                },
                                i = await D["a"].getExportSettingData();
                            let {
                                exportDirPath: a,
                                exportSubDirPath: o,
                                exportTimes: r,
                                currentProject: l,
                                needShowSelectPreset: u,
                                isNoePresetNumber: h,
                                isJpgNumber: d,
                                isPngNumber: g,
                                isRawNumber: v,
                                isTiffNumber: b,
                                rawNumberData: f,
                                totalNumber: S,
                                selectValidNumber: P,
                                temporaryStoragePath: w
                            } = i;
                            if (0 === P) return void s.tsNotify({
                                type: "error",
                                message: "Vui lòng chọn有效支持的图片格式进行导出～"
                            });
                            t.exportSubDirPath = o, t.exportTimes = r, t.exportDirPath = a, t.currentProject = l, t.temporaryStoragePath = w;
                            let x = n["a"].state.config.configModel;
                            x && (x.setDefaultPath ? t.savePath = x.defaultSavePath : t.savePath = a), t.needShowSelectPreset = u, t.isNoePresetNumber = h, t.totalNumber = S, t.isJpgNumber = d, t.isPngNumber = g, t.rawNumberData = f, t.isTiffNumber = b;
                            let _ = S - h,
                                C = "",
                                y = JSON.parse(t.rawNumberData);
                            const k = y.rowType;
                            for (const s of k) C += s.type + "_" + s.times + "\n";
                            "" == C && (C = "CR2_0\n");
                            let N = {
                                cake_position: e,
                                cake_value: S + "_" + e + "\nJPEG_" + d + "\nPNG_" + g + "\n" + C + "TIFF_" + b,
                                cake_feature: S + "_xgt" + _ + "_yt" + h
                            };
                            c(N), Object.assign(m, t), p.value = !0
                        };
                        return {
                            showExportSelectDialog: p,
                            fullscreenLoading: u,
                            exportSetting: m,
                            exportSettingCallback: w,
                            onChangeShowExportSelectDialog: $,
                            readyExport: j
                        }
                    }
                },
                K = i("eae9"),
                X = i("469c"),
                Y = i("5b34"),
                Z = {
                    name: "FuncHeader",
                    components: {
                        "el-button": P["Button"],
                        NavEntryGroup: X["a"]
                    },
                    mixins: [g["a"], v["a"], w["a"], K["a"], q],
                    data() {
                        return {
                            LOGO_RELATIVE_PATH: m["c"],
                            leftBtnSlot: !1,
                            showHotKey: !1,
                            showImportPopPannel: !1,
                            showChoosePresetDialog: !1,
                            selectedTotal: 0,
                            showGpuSwitchSetting: !1,
                            isShowFundLackTip: !1
                        }
                    },
                    watch: {
                        showVipPriceDialog(e) {
                            var t;
                            if (!0 !== e || ["photoFinishing"].includes(this.routeName)) {
                                if (!0 === e && ["photoFinishing"].includes(this.routeName)) {
                                    var i;
                                    null === (i = this.$tsStat) || void 0 === i || i.event("cake_member_price", {
                                        cake_operate: "init_refine"
                                    })
                                }
                            } else null === (t = this.$tsStat) || void 0 === t || t.event("cake_member_price", {
                                cake_operate: "init_gallery"
                            })
                        },
                        showExportSelectDialog(e) {}
                    },
                    computed: {
                        ...Object(u["c"])(["isVip", "user", "getIconDisabled"]),
                        showPaySuccess: {
                            get() {
                                return this.$store.state.order.showPaySuccess
                            },
                            set() {}
                        },
                        ...Object(u["c"])("config", ["isDebugEnv", "canShowManualImportButton"]),
                        ...Object(u["c"])("thumbnail", ["getThumbnails"]),
                        ...Object(u["c"])("project", ["activeProjectId", "lastProjectUpdateTime"]),
                        ...Object(u["c"])("export", ["exportEffectCfg"]),
                        avatarUrl() {
                            return i("c722")
                        },
                        downloadImgUrl() {
                            return this.hasDownloadActiveStyle ? i("d21a") : i("bc17")
                        },
                        exportNumber() {
                            return this.$store.state.export.exportNumber
                        },
                        hasDownloadPermission() {
                            return this.$store.state.permission.hasDownloadPermission
                        },
                        canDownload() {
                            return !!this.getIconDisabled || !this.$store.state.export.isDownloadFree
                        },
                        hasDownloadActiveStyle() {
                            return !this.getIconDisabled && this.$store.state.permission.hasDownloadActive
                        },
                        needShowTemplateDetail() {
                            return this.$store.state.applyTemplate.onShowEditView
                        },
                        routeName() {
                            return console.log("FuncHeader route.name", this.$route.name), this.$route.name
                        },
                        routeParam() {
                            return this.$route.query
                        },
                        menuList() {
                            return ["photoFinishing", "batchRetouch"].includes(this.routeName) ? [{
                                name: "图库",
                                subTitle: "图库",
                                routeName: "batchRetouch",
                                icon: this.$getIconPath("nav_icon_color_adjustment@3x.png"),
                                activeIcon: this.$getIconPath("nav_icon_color_adjustment@3x.png"),
                                isActive: "batchRetouch" === this.routeName
                            }, {
                                name: "精修",
                                subTitle: "精修",
                                routeName: "photoFinishing",
                                icon: this.$getIconPath("nav_icon_beautify@3x.png"),
                                activeIcon: this.$getIconPath("nav_icon_beautify@3x.png"),
                                isActive: "photoFinishing" === this.routeName
                            }] : []
                        },
                        rightMenuList() {
                            return [{
                                name: "批量调色",
                                routeName: "batchRetouchColor",
                                disabled: !0,
                                icon: this.$getIconPath("nav_icon_color_adjustment@3x.png"),
                                activeIcon: this.$getIconPath("nav_icon_color_adjustment@3x.png"),
                                isActive: "batchRetouchColor" === this.routeName,
                                disableFunc: this.showRawTips
                            }]
                        }
                    },
                    beforeDestroy() {
                        b["a"].$off("guide6Init", null), h["a"].removeAllListeners("onCloseClick")
                    },
                    mounted() {
                        this.SetCanShowManualImportButton(), this.$slots["left-btn"] && (this.leftBtnSlot = !0), h["a"].on("onCloseClick", () => {
                            let e = this.lastProjectUpdateTime;
                            e && (this.ACT_UpdateProject({
                                id: this.activeProjectId,
                                modify: {
                                    update_time: +e,
                                    visit_time: +new Date
                                }
                            }), this._SetLastProjectUpdateTime(null))
                        }), b["a"].$on("guide6Init", Object(d["debounce"])(() => {
                            this.showGuide(6, "guideClass6")
                        }, 20))
                    },
                    methods: {
                        ...Object(u["d"])(["setIsFromAppend", "clearExportTask"]),
                        ...Object(u["d"])("thumbnail", ["_SetActiveThumbnail"]),
                        ...Object(u["d"])("project", ["_ClearProjectData", "_SetLastProjectUpdateTime", "_UpdateProject"]),
                        ...Object(u["d"])("config", ["_SetIsShowNoviceGuide", "SetCanShowManualImportButton"]),
                        ...Object(u["b"])(["ExitLogin"]),
                        ...Object(u["b"])("project", ["ACT_UpdateProject"]),
                        onManualImportClick: Object(d["debounce"])((async function() {
                            const e = Y["a"].getInstance().exhibitionConfig;
                            await B["a"].existsSync(e.importPath) ? this.getEventBus().$emit("onManualImportClick", [e.importPath]) : this.tsNotify("导入的路径Không tồn tại，请重新设置")
                        }), 500),
                        onShowVipPriceDialogClick: Object(d["debounce"])((function() {
                            this.PointMemberPriceClick(), h["a"].send("open-member-plan-window", null)
                        }), 500),
                        logout: Object(d["debounce"])((function() {
                            var e;
                            this.ExitLogin(), this.clearExportTask(), this.$router.replace({
                                name: "Login"
                            }), null === (e = this.$tsStat) || void 0 === e || e.logout()
                        }), 200),
                        onAddFileVisible(e) {
                            let t = new r["a"];
                            t.process([r["b"].Mouse], !e)
                        },
                        async getUserInfo() {
                            var e;
                            if (["photoFinishing"].includes(this.routeName)) null === (e = this.$tsStat) || void 0 === e || e.event("cake_avatar", {
                                cake_operate: "init_refine_" + (1 === this.isVip ? "member" : "non_member")
                            });
                            else if (["exportList"].includes(this.routeName)) {
                                var t;
                                null === (t = this.$tsStat) || void 0 === t || t.event("cake_avatar", {
                                    cake_operate: "init_export_list_" + (1 === this.isVip ? "member" : "non_member")
                                })
                            } else {
                                var i;
                                null === (i = this.$tsStat) || void 0 === i || i.event("cake_avatar", {
                                    cake_operate: "init_gallery_" + (1 === this.isVip ? "member" : "non_member")
                                })
                            }
                        },
                        getEventBus() {
                            return b["a"]
                        },
                        onClickHome() {
                            var e, t;
                            ["photoFinishing"].includes(this.routeName) ? null === (e = this.$tsStat) || void 0 === e || e.event("cake_refine", {
                                cake_operate: "click_home"
                            }) : null === (t = this.$tsStat) || void 0 === t || t.event("cake_gallery", {
                                cake_operate: "click_home"
                            });
                            b["a"].$emit("onBackToHome"), this.$router.push({
                                name: "index"
                            });
                            let i = this.lastProjectUpdateTime;
                            i && (this.ACT_UpdateProject({
                                id: this.activeProjectId,
                                modify: {
                                    update_time: +i,
                                    visit_time: +new Date
                                }
                            }), this._SetLastProjectUpdateTime(null))
                        },
                        onCommand(e) {
                            console.log("onCommand dropdown", e);
                            let t = {
                                onImportFile: ["openFile"],
                                onImportDir: ["openDirectory"],
                                onImportFileAndDir: ["openFile", "openDirectory"]
                            };
                            this.getEventBus().$emit("onNavImportImage", t[e])
                        },
                        showRawTips: Object(d["throttle"])((function() {
                            const e = "RAW调色功能Mở发中，敬请期待哦~";
                            this.tsNotify({
                                type: "info",
                                message: e
                            })
                        }), 300, {
                            leading: !0
                        }),
                        showFunc(e) {
                            switch (e.routeName) {
                                case "batchRetouch":
                                case "photoFinishing":
                                    return !0;
                                default:
                                    return !0
                            }
                        },
                        onRouterPush: Object(d["debounce"])((async function(e, t) {
                            if (e === this.routeName) return !1;
                            if ("photoFinishing" === e) this.routerPushPhotoFinishing();
                            else {
                                if (this.getIconDisabled) return;
                                this.$router.push({
                                    name: e,
                                    query: {
                                        index: this.$route.query.index
                                    }
                                })
                            }
                        }), 300),
                        routerPushPhotoFinishing() {
                            let e = f["a"].shareInstance().imageViewModelQueue;
                            if (null == e || 0 === e.size) return void this.$router.push({
                                path: "photoFinishing",
                                query: {}
                            });
                            let t = Array.from(e);
                            t = t.sort((function(e, t) {
                                return e[1].imgIndex - t[1].imgIndex
                            }));
                            let i = null;
                            for (const s of t)
                                if (s[1].isImportantSelected) {
                                    i = s[1];
                                    break
                                } null == i && (i = t[0][1]);
                            let a = new S["e"];
                            a.userId = this.$store.state.user.userId, a.projectId = this.activeProjectId, a.originalImagePath = i.imgPath, this._SetActiveThumbnail({
                                imgPath: i.imgPath,
                                imgIndex: i.imgIndex
                            }), this.$router.push({
                                path: "photoFinishing",
                                query: {}
                            })
                        },
                        onDownloadIconClick() {
                            this.guideQuit("guideClass6"), this._SetIsShowNoviceGuide(!1);
                            let e = "";
                            e = ["photoFinishing"].includes(this.routeName) ? "refine" : "gallery";
                            const t = () => this.readyExport(e);
                            t()
                        },
                        onAddFileClick() {
                            this.setIsFromAppend(!0), this.$router.push({
                                path: "importImage",
                                params: null
                            })
                        },
                        exportlistBack() {
                            var e;
                            ["photoFinishing"].includes(this.routeName) || (null === (e = this.$tsStat) || void 0 === e || e.event("cake_export_list", {
                                cake_operate: "return"
                            }));
                            this.$router.go(-1)
                        }
                    }
                },
                ee = Z,
                te = (i("40cc"), Object(Q["a"])(ee, c, p, !1, null, "188ceb43", null)),
                ie = te.exports,
                ae = i("1b7e"),
                se = Object(o["defineComponent"])({
                    __name: "ProjectLayout",
                    setup(e) {
                        const t = Object(o["computed"])(() => !!n["a"].getters["refine/isDisableHeadView"]),
                            i = Object(o["computed"])(() => n["a"].state.export.exportLoadingProgress),
                            a = Object(o["computed"])(() => !n["a"].state.export.isDownloadFree);
                        Object(o["watch"])(a, e => {
                            (new r["a"]).process([r["b"].Mouse, r["b"].KeyBoard], !e)
                        });
                        const s = Object(o["computed"])(() => n["a"].getters["project/refineUUID"]),
                            c = Object(o["ref"])();
                        return Object(o["onMounted"])(() => {
                            l["i"].addListener(l["f"], () => {
                                console.debug("SHOW_PRESET_SETTING", c.value), Object(o["nextTick"])(() => {
                                    var e;
                                    return null === (e = c.value) || void 0 === e ? void 0 : e.show()
                                })
                            })
                        }), Object(o["onUnmounted"])(() => l["i"].removeListener(l["f"])), {
                            __sfc: !0,
                            isDisableHeadView: t,
                            exportTip: i,
                            showExportLoading: a,
                            refineUUID: s,
                            syncPresetSettingsRefs: c,
                            FuncHeader: ie,
                            SyncPresetSettings: ae["a"]
                        }
                    }
                }),
                oe = se,
                ne = (i("3a5e"), Object(Q["a"])(oe, a, s, !1, null, "7878bad0", null));
            t["default"] = ne.exports
        },
        b7a2: function(e, t, i) {},
        eae9: function(e, t, i) {
            "use strict";
            var a = i("2b0e"),
                s = i("25c2");
            const o = {
                totalStep: 6,
                step1: {
                    text: `试试直接拖拽Tập tin夹或多Ảnh到这里，Mở始探索${s["b"]}吧~`,
                    num: 1
                },
                step2: {
                    text: "点击应用Đặt trước",
                    num: 2
                },
                step3: {
                    text: "拖动滑杆调整图片",
                    num: 3
                },
                step4: {
                    text: "按住shift选中图片",
                    num: 4
                },
                step5: {
                    text: "将当前调整应用至选中图片",
                    num: 5
                },
                step6: {
                    text: "不需要等待全部效果加载完毕，就可以直接导出",
                    num: 6
                }
            };
            var n = i("442f"),
                r = i("2f62"),
                l = i("45a3"),
                c = i("c5da"),
                p = i("52b8");
            class u {
                constructor() {
                    this.actionableStyle = "background: transparent;z-index: 501;position: relative;", this.bgStyle = "background: #000;width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 500;opacity: 0.4;filter: Alpha(opacity=30)"
                }
                addMask() {
                    this.myBg = document.createElement("div"), this.myBg.setAttribute("style", this.bgStyle), document.body.appendChild(this.myBg)
                }
                addActionable(e) {
                    let t = document.getElementsByClassName(e)[0];
                    t && t.setAttribute("style", this.actionableStyle)
                }
                removeMask() {
                    document.body.removeChild(this.myBg)
                }
                showGuide(e, t) {
                    this.addActionable(t)
                }
                close() {
                    this.removeMask()
                }
            }
            const h = a["default"].extend({
                    template: `<div class="tempStep1"><div style="width:296px" class="tempStep_textBox"><p>${o.step1.text}</p><span id="guideQuit">退出(${o.step1.num}/${o.totalStep})</span></div></div>`
                }),
                d = a["default"].extend({
                    template: `<div class="tempStep2">\n        <div style="width:136px" class="tempStep_textBox">\n            <p>${o.step2.text}</p>\n            <span id="guideQuit">退出(${o.step2.num}/${o.totalStep})</span>\n        </div>\n        <span class="tempStep2-line"></span>\n        <span class="tempStep2-dotted"></span>\n        <span class="tempStep2-circle"></span>\n    </div>`
                }),
                m = a["default"].extend({
                    template: `<div class="tempStep3">\n        <div style="width:168px" class="tempStep_textBox">\n            <p>${o.step3.text}</p>\n            <span id="guideQuit">退出(${o.step3.num}/${o.totalStep})</span>\n        </div>\n        <span class="tempStep3-line"></span>\n        <span class="tempStep3-dotted"></span>\n        <span class="tempStep3-circle"></span>\n    </div>`
                }),
                g = a["default"].extend({
                    template: `<div class="tempStep4">\n        <span class="tempStep4-circle"></span>\n        <span class="tempStep4-line"></span>\n        <span class="tempStep4-dotted"></span>\n        <div style="width:170px" class="tempStep_textBox">\n            <p>${o.step4.text}</p>\n            <span id="guideQuit">退出(${o.step4.num}/${o.totalStep})</span>\n        </div>\n    </div>`
                }),
                v = a["default"].extend({
                    template: `<div class="tempStep5">\n        <div style="width:232px" class="tempStep_textBox">\n            <p>${o.step5.text}</p>\n            <span id="guideQuit">退出(${o.step5.num}/${o.totalStep})</span>\n        </div>\n        <span class="tempStep5-line"></span>\n        <span class="tempStep5-dotted"></span>\n        <span class="tempStep5-circle"></span>\n\n    </div>`
                }),
                b = a["default"].extend({
                    template: `<div class="tempStep6">\n        <span class="tempStep6-circle"></span>\n        <span class="tempStep6-dotted"></span>\n        <span class="tempStep6-line"></span>\n        <div style="width:264px" class="tempStep_textBox">\n            <p>${o.step6.text}</p>\n            <span id="guideQuit">退出(${o.step6.num}/${o.totalStep})</span>\n        </div>\n    </div>`
                });
            t["a"] = {
                data() {
                    return {
                        step: 1,
                        guidMask: null,
                        tempDiv: null
                    }
                },
                mixins: [n["a"], p["a"]],
                mounted() {},
                computed: {
                    ...Object(r["c"])("config", ["isShowNoviceGuide"])
                },
                methods: {
                    ...Object(r["d"])("config", ["_SetIsShowNoviceGuide", "_SetGuideStep"]),
                    showGuide(e, t) {
                        this.step = e, this.$nextTick(async i => {
                            if (this.isShowNoviceGuide) {
                                this._SetGuideStep(e), this.PointInitGuide(e);
                                const i = await Object(c["d"])(s["M"]);
                                i || await l["a"].insertToDB(s["e"], {
                                    keyword: s["M"],
                                    value: s["a"]
                                });
                                const a = new u;
                                this.guidMask = a, a.addMask(), a.showGuide(e, t), this.commonMountFunc(e, t);
                                const o = document.getElementById("guideQuit");
                                o && o.addEventListener("click", i => {
                                    this.allGuideQuit(e, t)
                                })
                            }
                        })
                    },
                    commonMountFunc(e, t) {
                        const i = document.createElement("div");
                        i.setAttribute("id", t + "-tempDiv");
                        let a = document.getElementsByClassName(t)[0];
                        switch (a && a.parentNode.appendChild(i), e) {
                            case 1:
                                (new h).$mount(`#${t}-tempDiv`);
                                break;
                            case 2:
                                (new d).$mount(`#${t}-tempDiv`);
                                break;
                            case 3:
                                (new m).$mount(`#${t}-tempDiv`);
                                break;
                            case 4:
                                (new g).$mount(`#${t}-tempDiv`);
                                break;
                            case 5:
                                (new v).$mount(`#${t}-tempDiv`);
                                break;
                            case 6:
                                (new b).$mount(`#${t}-tempDiv`);
                                break
                        }
                    },
                    async guideQuit(e) {
                        if (!this.isShowNoviceGuide) return !1;
                        document.getElementsByClassName(e)[0].removeAttribute("style"), this.guidMask.close();
                        let t = document.getElementsByClassName("tempStep" + this.step)[0];
                        document.getElementsByClassName(e)[0].parentNode.removeChild(t);
                        const i = document.getElementById("guideQuit");
                        i && i.removeEventListener("click", () => {})
                    },
                    allGuideQuit(e, t) {
                        this.tsConfirm({
                            title: "Xác nhận退出新手引导",
                            message: "您也可以在Phải上角新手教程Xem具体教程",
                            customMessageStyle: "textAlign: center"
                        }).then(() => {
                            this.guideQuit(t), this._SetIsShowNoviceGuide(!1), this.PointClickQuit(e)
                        }).catch(() => {})
                    }
                }
            }
        }
    }
]);
//# sourceMappingURL=chunk-3aa35bb6.24828a6a.js.map