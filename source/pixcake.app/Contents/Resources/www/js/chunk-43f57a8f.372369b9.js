(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-43f57a8f"], {
        "0000": function(e, t, i) {
            "use strict";
            i("3c3f")
        },
        "008b": function(e, t, i) {},
        "00fd": function(e, t, i) {
            var a = i("9e69"),
                n = Object.prototype,
                o = n.hasOwnProperty,
                s = n.toString,
                l = a ? a.toStringTag : void 0;

            function r(e) {
                var t = o.call(e, l),
                    i = e[l];
                try {
                    e[l] = void 0;
                    var a = !0
                } catch (r) {}
                var n = s.call(e);
                return a && (t ? e[l] = i : delete e[l]), n
            }
            e.exports = r
        },
        "0121": function(e, t, i) {},
        "03dd": function(e, t, i) {
            var a = i("eac5"),
                n = i("57a5"),
                o = Object.prototype,
                s = o.hasOwnProperty;

            function l(e) {
                if (!a(e)) return n(e);
                var t = [];
                for (var i in Object(e)) s.call(e, i) && "constructor" != i && t.push(i);
                return t
            }
            e.exports = l
        },
        "04ef": function(e, t, i) {},
        "0548": function(e, t, i) {
            "use strict";
            i("109b")
        },
        "075e": function(e, t, i) {},
        "07c7": function(e, t) {
            function i() {
                return !1
            }
            e.exports = i
        },
        "087d": function(e, t) {
            function i(e, t) {
                var i = -1,
                    a = t.length,
                    n = e.length;
                while (++i < a) e[n + i] = t[i];
                return e
            }
            e.exports = i
        },
        "0b07": function(e, t, i) {
            var a = i("34ac"),
                n = i("3698");

            function o(e, t) {
                var i = n(e, t);
                return a(i) ? i : void 0
            }
            e.exports = o
        },
        "0d24": function(e, t, i) {
            (function(e) {
                var a = i("2b3e"),
                    n = i("07c7"),
                    o = t && !t.nodeType && t,
                    s = o && "object" == typeof e && e && !e.nodeType && e,
                    l = s && s.exports === o,
                    r = l ? a.Buffer : void 0,
                    c = r ? r.isBuffer : void 0,
                    u = c || n;
                e.exports = u
            }).call(this, i("62e4")(e))
        },
        "0edb": function(e, t, i) {},
        "0fc6": function(e, t, i) {
            "use strict";
            i("a178")
        },
        "109b": function(e, t, i) {},
        "124d": function(e, t, i) {},
        1290: function(e, t) {
            function i(e) {
                var t = typeof e;
                return "string" == t || "number" == t || "symbol" == t || "boolean" == t ? "__proto__" !== e : null === e
            }
            e.exports = i
        },
        1310: function(e, t) {
            function i(e) {
                return null != e && "object" == typeof e
            }
            e.exports = i
        },
        1368: function(e, t, i) {
            var a = i("da03"),
                n = function() {
                    var e = /[^.]+$/.exec(a && a.keys && a.keys.IE_PROTO || "");
                    return e ? "Symbol(src)_1." + e : ""
                }();

            function o(e) {
                return !!n && n in e
            }
            e.exports = o
        },
        1587: function(e, t, i) {},
        "1a8c": function(e, t) {
            function i(e) {
                var t = typeof e;
                return null != e && ("object" == t || "function" == t)
            }
            e.exports = i
        },
        "1b47": function(e, t, i) {
            "use strict";
            i.r(t);
            i("caad");
            var a = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        staticClass: "wrap",
                        on: {
                            drop: e.onDropImageFiles,
                            dragover: function(e) {
                                e.preventDefault(), e.stopPropagation()
                            },
                            dragenter: function(e) {
                                e.preventDefault(), e.stopPropagation()
                            }
                        }
                    }, [t("div", {
                        staticClass: "topLeftItem"
                    }, [t("el-divider", {
                        attrs: {
                            direction: "vertical"
                        }
                    }), t("zoom-button-group", {
                        attrs: {
                            "disabled-quick-button": e.isInCropNav,
                            "show-all-scale": e.showAllScale
                        },
                        on: {
                            "on-slider": e.onZoomSlider,
                            "on-resize": e.imageResize
                        },
                        model: {
                            value: e.fitRatio,
                            callback: function(t) {
                                e.fitRatio = t
                            },
                            expression: "fitRatio"
                        }
                    }), t("el-divider", {
                        attrs: {
                            direction: "vertical"
                        }
                    }), t("el-button", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.isInCropNav,
                            expression: "!isInCropNav"
                        }, {
                            name: "blur",
                            rawName: "v-blur"
                        }],
                        staticClass: "btn-icon",
                        class: {
                            active: e.isDragging && !e.showLiquefy
                        },
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: e.handleClickDrag
                        }
                    }, [t("svg-icon", {
                        staticStyle: {
                            "pointer-events": "none"
                        },
                        attrs: {
                            "icon-class": "drag",
                            "class-name": "ts-icon drag-icon"
                        }
                    })], 1), t("el-tooltip", {
                        attrs: {
                            effect: "light",
                            content: "手动液化",
                            placement: "bottom",
                            "visible-arrow": !1,
                            "popper-class": "title-tip"
                        }
                    }, [t("el-button", {
                        directives: [{
                            name: "blur",
                            rawName: "v-blur"
                        }],
                        staticClass: "btn-icon",
                        class: {
                            active: e.showLiquefy
                        },
                        attrs: {
                            size: "mini",
                            disabled: !e.imageState.effectLoaded || e.isInCropNav || e.showPainter || e.isInColorNav && e.isOnlyPaletteEffect
                        },
                        on: {
                            click: e.handleUseLiquefyMode
                        }
                    }, [t("svg-icon", {
                        staticStyle: {
                            "pointer-events": "none"
                        },
                        attrs: {
                            "icon-class": "liquefy",
                            "class-name": "ts-icon liquefy-icon"
                        }
                    })], 1)], 1)], 1), t("ts-progress", {
                        staticClass: "custom-top-progress",
                        attrs: {
                            disabled: e.disabledProgress,
                            value: e.imageState.loading
                        }
                    }), t("div", {
                        staticClass: "Image-canvas-container",
                        class: {
                            fullscreen: e.isFullScreenPreview,
                            "grab-active": e.isDragging,
                            grabbing: e.containerMouseDown,
                            "hidden-cursor": !e.isDragging && (e.showPainter || e.showLiquefy)
                        },
                        attrs: {
                            id: "guide__first_apply-preset-suit-btn"
                        },
                        on: {
                            mousedown: function(t) {
                                e.containerMouseDown = !0
                            },
                            mouseup: function(t) {
                                e.containerMouseDown = !1
                            }
                        }
                    }, [e.costTimeObj.costIsPro ? e._e() : t("CostTime", {
                        attrs: {
                            costTimeData: e.costTimeObj.costTimeData,
                            costLastTime: e.costTimeObj.costLastTime,
                            costNewTime: e.costTimeObj.costNewTime
                        }
                    }), t("div", {
                        staticClass: "fixed-bottom-container",
                        style: {
                            "z-index": 999
                        },
                        on: {
                            keydown: function(e) {
                                e.preventDefault()
                            }
                        }
                    }, [e.isFullScreenPreview ? t("div", {
                        staticClass: "exit-preview-btn-box global__backdrop-filter"
                    }, [t("SpinLoading", {
                        attrs: {
                            "hidden-background": "",
                            show: e.imageState.loading,
                            loading: e.imageState.loading,
                            text: e.imageState.loading ? "效果预览加载中..." : "已显示全部效果"
                        }
                    }), t("el-button", {
                        directives: [{
                            name: "blur",
                            rawName: "v-blur"
                        }],
                        staticClass: "exit-preview-btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: e.handleExitPreview
                        },
                        nativeOn: {
                            mouseenter: function(t) {
                                return e.stopMousePropagation(!0)
                            },
                            mouseleave: function(t) {
                                return e.stopMousePropagation(!1)
                            }
                        }
                    }, [e._v(" 退出预览 ")])], 1) : e.isInColorNav ? [t("el-popover", {
                        attrs: {
                            width: "200px",
                            placement: "top",
                            trigger: "manual",
                            "popper-class": "preview-all-effect-tip",
                            value: e.showPaletteUpdateGuide
                        }
                    }, [t("div", {
                        staticClass: "palette__guide"
                    }, [t("p", {
                        staticClass: "palette__guide-title"
                    }, [e._v(" 🎉 实时调色功能来了！ "), t("i", {
                        staticClass: "el-icon-close",
                        on: {
                            click: function(t) {
                                return t.preventDefault(), e.cacheHiddenEffectTip.apply(null, arguments)
                            }
                        }
                    })]), t("div", {
                        staticClass: "palette__guide-content"
                    }, [t("p", [e._v("您可根据实际操作选择不同模式：")]), t("p", [e._v("1. 全效果模式下，调色速度较慢 🐢。可展示全部效果。")]), t("p", [e._v("2. 调色模式下，可实时调色 ⚡️。仅展示色彩效果，非色彩效果暂时隐藏。")])]), t("p", {
                        staticStyle: {
                            "text-align": "right"
                        }
                    }, [t("el-link", {
                        staticClass: "global__color-system",
                        staticStyle: {
                            "font-size": "12px"
                        },
                        attrs: {
                            size: "mini",
                            type: "primary",
                            underline: !1
                        },
                        on: {
                            click: function(t) {
                                return t.preventDefault(), e.cacheHiddenEffectTip.apply(null, arguments)
                            }
                        }
                    }, [e._v(" 知道了 ")])], 1)]), t("el-radio-group", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.showLiquefy,
                            expression: "!showLiquefy"
                        }],
                        staticClass: "ts-custom__radio-group",
                        attrs: {
                            slot: "reference",
                            size: "mini"
                        },
                        nativeOn: {
                            mouseenter: function(t) {
                                return e.stopMousePropagation(!0)
                            },
                            mouseleave: function(t) {
                                return e.stopMousePropagation(!1)
                            }
                        },
                        slot: "reference",
                        model: {
                            value: e.isOnlyPaletteEffect,
                            callback: function(t) {
                                e.isOnlyPaletteEffect = t
                            },
                            expression: "isOnlyPaletteEffect"
                        }
                    }, [t("el-radio-button", {
                        staticClass: "radio-button",
                        attrs: {
                            label: !1
                        }
                    }, [e._v("全效果模式")]), t("el-radio-button", {
                        staticClass: "radio-button",
                        attrs: {
                            label: !0
                        }
                    }, [t("el-popover", {
                        attrs: {
                            width: "200px",
                            placement: "top",
                            trigger: "manual",
                            "popper-class": "preview-all-effect-tip",
                            value: e.showHiddenEffectTip && !e.showPaletteUpdateGuide
                        }
                    }, [t("p", {
                        staticStyle: {
                            "text-align": "center"
                        }
                    }, [e._v("色彩调节期间，将临时关闭其他效果")]), t("div", {
                        staticClass: "radio-button-text",
                        attrs: {
                            slot: "reference"
                        },
                        slot: "reference"
                    }, [e._v(" 调色模式 "), t("el-popover", {
                        attrs: {
                            width: "200px",
                            placement: "top",
                            trigger: "hover"
                        }
                    }, [t("div", {
                        staticClass: "palette-mode-tip"
                    }, [t("p", [e._v("全效果模式：展示全部效果，调色速度较慢；")]), t("p", [e._v("调色模式：可实时调色，非色彩效果暂时隐藏")])]), t("i", {
                        staticClass: "ts-icon-question-outside",
                        attrs: {
                            slot: "reference"
                        },
                        slot: "reference"
                    })])], 1)])], 1)], 1)], 1)] : e._e(), t("el-tooltip", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.isFullScreenPreview && !e.isInCropNav,
                            expression: "!isFullScreenPreview && !isInCropNav"
                        }],
                        ref: "space-tooltip",
                        attrs: {
                            effect: "dark",
                            "popper-class": "compare__image-hot-key-tip",
                            "hide-after": 1500,
                            placement: "top-end"
                        }
                    }, [t("div", {
                        staticClass: "hot-key-content",
                        attrs: {
                            slot: "content"
                        },
                        slot: "content"
                    }, [t("img", {
                        staticClass: "img",
                        attrs: {
                            src: i(e.$isMac ? "1c6d" : "d353"),
                            alt: ""
                        }
                    }), t("p", {
                        staticClass: "label"
                    }, [e._v("长按进行对比，快捷键：~")])]), t("el-button", {
                        ref: "btn-switch",
                        staticClass: "btn-icon global__backdrop-filter",
                        attrs: {
                            size: "small",
                            tabindex: "-1",
                            type: "default"
                        },
                        on: {
                            click: function(t) {
                                return e.PointZoomCompare("bottom")
                            }
                        },
                        nativeOn: {
                            mouseenter: function(t) {
                                return e.stopMousePropagation(!0)
                            },
                            mouseleave: function(t) {
                                return e.stopMousePropagation(!1)
                            },
                            mouseup: function(t) {
                                return e.photoCompare("up")
                            },
                            mousedown: function(t) {
                                return e.photoCompare("down")
                            }
                        }
                    }, [t("img", {
                        staticClass: "img",
                        staticStyle: {
                            "pointer-events": "none"
                        },
                        attrs: {
                            src: e.$getIconPath("toolbar_button_compared@3x.png"),
                            alt: ""
                        }
                    })])], 1)], 2), e.isFullScreenPreview ? e._e() : [t("SpinLoading", {
                        staticStyle: {
                            bottom: "16px",
                            left: "7.5px"
                        },
                        attrs: {
                            fixed: "",
                            show: e.imageState.loading,
                            text: e.loadingText
                        }
                    }), 3 !== e.user.waterMark ? [t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.imageState.loading,
                            expression: "!imageState.loading"
                        }],
                        staticClass: "watermark-tip"
                    }, [t("i", {
                        staticClass: "el-icon-warning-outline"
                    }), e._v(" " + e._s(e.$t("pagePhotoFinishing.watermarkTip")) + " ")])] : e._e(), t("div", {
                        staticClass: "claImageName"
                    }, [e._v(e._s(e.imageName))])]], 2), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.isFullScreenPreview,
                            expression: "!isFullScreenPreview"
                        }],
                        staticClass: "all-tool-area"
                    }, [t("right-params-view", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: [e.RefineNavName.Beauty, e.RefineNavName.Palette, e.RefineNavName.Background].includes(e.activeNavName),
                            expression: "[RefineNavName.Beauty, RefineNavName.Palette, RefineNavName.Background].includes(activeNavName)"
                        }],
                        ref: "right-params-view",
                        attrs: {
                            "active-nav-name": e.activeNavName,
                            refineUUID: e.refineUUID,
                            isDestroy: e.isDestroy,
                            "get-params-json": e.getParamsJson
                        },
                        on: {
                            onApplyPresetCallback: e.onApplyPresetClick,
                            onChangeFaceDataCallback: function(t) {
                                return e.reloadProcessImage("face")
                            },
                            "on-change-color-slider": e.onChangeColor,
                            "on-change-beautify-change": e.onChangeBeautify,
                            "on-reset-params": e.resetRemoveDefectivePaintMask
                        }
                    }, [t("template", {
                        slot: "histogram"
                    }, [t("Histogram", {
                        ref: "tsHistogram",
                        attrs: {
                            width: 300,
                            chartData: e.histogramData.chartData || {},
                            imageInfo: e.histogramData.imageInfo || {}
                        }
                    })], 1), t("template", {
                        slot: "painter"
                    }, [t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointClickSmear,
                            expression: "PointClickSmear"
                        }],
                        staticClass: "ts-icon-painter-button",
                        attrs: {
                            type: "text",
                            disabled: !e.imageState.allowPainter
                        },
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.usePainterTool.apply(null, arguments)
                            }
                        }
                    }, [t("el-tooltip", {
                        attrs: {
                            effect: "light",
                            content: "手动涂抹",
                            placement: "bottom",
                            "visible-arrow": !1,
                            "popper-class": "title-tip"
                        }
                    }, [t("i", {
                        staticClass: "ts-icon-painter",
                        class: {
                            active: !e.imageState.paintRemoveDefectiveMaskIsEmpty,
                            disabled: !e.imageState.allowPainter
                        }
                    })])], 1)], 1)], 2), t("ts-drawer", {
                        staticClass: "opt-record",
                        attrs: {
                            width: "300px",
                            direction: "rtl",
                            value: "history" === e.activeNavName
                        }
                    }, [t("ThumbOptRecordView", {
                        attrs: {
                            "is-show": "history" === e.activeNavName,
                            "photo-control-func": e.photoControlInfo
                        }
                    })], 1), t("ts-drawer", {
                        staticClass: "opt-record",
                        attrs: {
                            width: "300px",
                            direction: "rtl",
                            value: "crop" === e.activeNavName
                        }
                    }, [t("crop-panel", {
                        attrs: {
                            rotate: e.cropConfig.rotate
                        },
                        on: {
                            "on-rotate": e.handleRotate,
                            "on-flip": e.handleFlip,
                            "on-crop-change": e.handleCrop,
                            "on-crop-reset": e.handleResetCrop
                        },
                        scopedSlots: e._u([{
                            key: "bottom",
                            fn: function() {
                                return [t("el-button", {
                                    staticClass: "btn system-theme",
                                    staticStyle: {
                                        width: "100%"
                                    },
                                    attrs: {
                                        type: "primary",
                                        size: "mini"
                                    },
                                    on: {
                                        click: e.clickFinishCropBtn
                                    }
                                }, [e._v(" 确认 ")])]
                            },
                            proxy: !0
                        }])
                    })], 1)], 1), t("refine-nav-bar", {
                        staticClass: "params-group",
                        attrs: {
                            "before-change": e.beforeRefineNavBarChange,
                            "ban-shortcut": e.showPainter,
                            "image-loading": e.imageState.loading,
                            "image-init": e.imageState.init
                        },
                        model: {
                            value: e.activeNavName,
                            callback: function(t) {
                                e.activeNavName = t
                            },
                            expression: "activeNavName"
                        }
                    }), t("ts-drawer", {
                        attrs: {
                            width: "345px",
                            direction: "rtl"
                        },
                        model: {
                            value: e.showPainter,
                            callback: function(t) {
                                e.showPainter = t
                            },
                            expression: "showPainter"
                        }
                    }, [e.showPainter ? t("defect-panel", {
                        attrs: {
                            showResetMaskBtn: e.showResetMaskBtn,
                            historyList: e.painterHistoryList
                        },
                        on: {
                            "change-tool": e.switchDefectTool,
                            "change-history": e.onChangeHistory,
                            "on-reset-painter": e.resetPainterRecord
                        }
                    }, [t("div", {
                        staticClass: "operation-panel-bottom",
                        attrs: {
                            slot: "bottom"
                        },
                        slot: "bottom"
                    }, [t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointClickSmearCancel,
                            expression: "PointClickSmearCancel"
                        }],
                        staticClass: "btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: function(t) {
                                return e.setRemoveDefectivePaintMask("cancel")
                            }
                        }
                    }, [e._v(" 取消 ")]), t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointClickPreservation,
                            expression: "PointClickPreservation"
                        }],
                        staticClass: "btn",
                        attrs: {
                            size: "mini",
                            disabled: e.imageState.loading
                        },
                        on: {
                            click: function(t) {
                                return e.setRemoveDefectivePaintMask("save")
                            }
                        }
                    }, [e._v(" 保存 ")])], 1)]) : e._e()], 1), t("ts-drawer", {
                        attrs: {
                            width: "345px",
                            direction: "rtl"
                        },
                        model: {
                            value: e.showLiquefy,
                            callback: function(t) {
                                e.showLiquefy = t
                            },
                            expression: "showLiquefy"
                        }
                    }, [e.showLiquefy ? t("liquefy-panel", {
                        attrs: {
                            historyList: e.liquefyHistoryList,
                            "show-reset-btn": e.showLiquefyResetBtn
                        },
                        on: {
                            "change-history": e.onChangeLiquefyHistory,
                            "on-reset": e.handleResetLiquefy
                        }
                    }, [t("div", {
                        staticClass: "operation-panel-bottom",
                        attrs: {
                            slot: "bottom"
                        },
                        slot: "bottom"
                    }, [t("el-button", {
                        staticClass: "btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: function(t) {
                                e.handleFinishLiquefyMode("cancel"), e.PointLiquefactionCancel()
                            }
                        }
                    }, [e._v(" 取消 ")]), t("el-button", {
                        staticClass: "btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: function(t) {
                                e.handleFinishLiquefyMode("save"), e.PointLiquefactionConfirm()
                            }
                        }
                    }, [e._v(" 确认 ")])], 1)]) : e._e()], 1), t("liquefy-drawer", {
                        attrs: {
                            value: e.showLiquefy && !e.hideLiquefyTool
                        },
                        on: {
                            "change-tool": e.switchLiquefyTool,
                            "before-close": t => [e.handleFinishLiquefyMode("save"), t()]
                        },
                        nativeOn: {
                            mouseenter: function(t) {
                                return e.stopMousePropagation(!0)
                            },
                            mouseleave: function(t) {
                                return e.stopMousePropagation(!1)
                            }
                        }
                    }), t("feedback-dialog", {
                        attrs: {
                            "show-feedback-dialog": e.showFeedbackDialog,
                            feedbackDialog_viewModel: e.feedbackDialog_viewModel
                        },
                        on: {
                            "update:showFeedbackDialog": function(t) {
                                e.showFeedbackDialog = t
                            },
                            "update:show-feedback-dialog": function(t) {
                                e.showFeedbackDialog = t
                            },
                            "update:feedbackDialog_viewModel": function(t) {
                                e.feedbackDialog_viewModel = t
                            },
                            "update:feedback-dialog_view-model": function(t) {
                                e.feedbackDialog_viewModel = t
                            }
                        }
                    }), t("importProgressDialog", {
                        attrs: {
                            status: e.importProgress.status,
                            data: e.importProgress,
                            importName: e.myImportName
                        },
                        on: {
                            onCancelled: e.handleCancelImport
                        },
                        nativeOn: {
                            mousedown: function(e) {
                                e.stopPropagation()
                            }
                        },
                        model: {
                            value: e.showImportProgress,
                            callback: function(t) {
                                e.showImportProgress = t
                            },
                            expression: "showImportProgress"
                        }
                    }), t("delete-progress-dialog", {
                        attrs: {
                            status: e.deleteProgress.status,
                            data: e.deleteProgress
                        },
                        model: {
                            value: e.showDeleteProgress,
                            callback: function(t) {
                                e.showDeleteProgress = t
                            },
                            expression: "showDeleteProgress"
                        }
                    })], 1)
                },
                n = [],
                o = i("9128"),
                s = i("2372"),
                l = i("2b0e"),
                r = i("0613"),
                c = i("2f62"),
                u = i("8f12"),
                d = i("442f"),
                h = i("c8c9"),
                p = i("7b38"),
                f = i("138c"),
                m = i("52b8"),
                g = i("2ef0"),
                v = i("c75e"),
                b = i("0b24"),
                y = i("3010"),
                w = i("5c96"),
                k = i("06fd"),
                C = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "params-bar global__params-bar border-line-style"
                    }, [t("div", {
                        ref: "paramsComRef",
                        staticClass: "params-components"
                    }, [t("split", {
                        attrs: {
                            min: (e.activeNames.includes("preset") ? e.splitMinVal : 40) + "px",
                            disabled: !e.activeNames.includes("preset"),
                            mode: "vertical"
                        },
                        on: {
                            "on-move-end": function(t) {
                                e.splitManualVal = e.splitValue, e.PointDragPanel()
                            }
                        },
                        model: {
                            value: e.splitValue,
                            callback: function(t) {
                                e.splitValue = t
                            },
                            expression: "splitValue"
                        }
                    }, [t("div", {
                        staticClass: "splitTriggle",
                        attrs: {
                            slot: "trigger"
                        },
                        slot: "trigger"
                    }, [t("div", {
                        staticClass: "triggleContent"
                    })]), t("el-collapse", {
                        ref: "removeTabindex",
                        staticClass: "collapse preset-collapse",
                        attrs: {
                            slot: "top"
                        },
                        slot: "top",
                        model: {
                            value: e.activeNames,
                            callback: function(t) {
                                e.activeNames = t
                            },
                            expression: "activeNames"
                        }
                    }, [t("el-collapse-item", {
                        ref: "preset",
                        attrs: {
                            title: "预设",
                            name: "preset"
                        }
                    }, [t("template", {
                        slot: "title"
                    }, [t("div", {
                        staticClass: "claWtBlanceTitle",
                        on: {
                            keydown: function(e) {
                                e.preventDefault()
                            }
                        }
                    }, [t("span", {
                        staticClass: "claTitle"
                    }, [e._v("预设")]), t("div", [t("el-button", {
                        staticClass: "addBtnCla",
                        attrs: {
                            circle: "",
                            icon: "el-icon-refresh-right"
                        },
                        on: {
                            click: function(t) {
                                t.stopPropagation(), e.handlResetPreset(), e.cancelBlur(t)
                            }
                        }
                    }), t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointAddPresetIcon,
                            expression: "PointAddPresetIcon"
                        }],
                        staticClass: "addBtnCla",
                        staticStyle: {
                            "margin-right": "10px"
                        },
                        attrs: {
                            circle: "",
                            icon: "el-icon-circle-plus-outline"
                        },
                        on: {
                            click: function(t) {
                                t.stopPropagation(), e.handleAddPreset(), e.cancelBlur(t)
                            }
                        }
                    })], 1)])]), t("div", {
                        staticClass: "guideClass2"
                    }, [t("TSPresetTree", {
                        ref: "tSPresetTreeRefs",
                        attrs: {
                            height: e.presetHeight + "px"
                        },
                        on: {
                            onItemClick: e.onApplyPresetClick
                        }
                    })], 1)], 2)], 1), t("template", {
                        slot: "bottom"
                    }, [t("div", {
                        staticClass: "splitBottom guideClass3"
                    }, [t("ul", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.activeNavName === e.RefineNavName.Beauty,
                            expression: "activeNavName === RefineNavName.Beauty"
                        }],
                        staticClass: "person-menu"
                    }, [e._l(e.personList, (function(i) {
                        return [t("li", {
                            directives: [{
                                name: "gtag-event",
                                rawName: "v-gtag-event",
                                value: e.PointSwitchGender,
                                expression: "PointSwitchGender"
                            }],
                            key: i.type,
                            staticClass: "person-menu-item",
                            class: {
                                active: e.currPersonType === i.type
                            },
                            on: {
                                click: function(t) {
                                    e.currPersonType = i.type
                                }
                            }
                        }, [e._v(" " + e._s(i.label) + " ")])]
                    })), t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointModifyGender,
                            expression: "PointModifyGender"
                        }],
                        staticClass: "ageSexChange",
                        class: {
                            active: e.isFaceLoadSuccess
                        },
                        attrs: {
                            type: "primary",
                            disabled: !e.isFaceLoadSuccess
                        },
                        on: {
                            click: function(t) {
                                e.setSexAdjustHasRedDotValue(), e.sexAdjustButtonHasNewDot = e.sexAdjustHasRedDotValue(), e.showImportAgeSexRevise = !e.showImportAgeSexRevise
                            }
                        }
                    }, [e.sexAdjustButtonHasNewDot ? e._e() : t("div", {
                        staticClass: "has_new"
                    })])], 2), t("params-collapse", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.activeNavName === e.RefineNavName.Beauty,
                            expression: "activeNavName === RefineNavName.Beauty"
                        }],
                        attrs: {
                            type: "beauty",
                            "params-cols-height": e.paramsColsHeight
                        },
                        on: {
                            "user-behavior": e.onUserBehavior,
                            "on-change": e.onChangeSliders,
                            "on-change-color": e.onChangeColorSliders,
                            "on-input": e.onInputSliders,
                            "on-input-color": e.onInputColorSliders,
                            "on-reset": function(t) {
                                e.$emit("on-reset-params", t), e.PointParameterAdjustmentReset()
                            }
                        }
                    }, [t("template", {
                        slot: "painter"
                    }, [e._t("painter")], 2)], 2), t("el-collapse", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.activeNavName === e.RefineNavName.Palette,
                            expression: "activeNavName === RefineNavName.Palette"
                        }],
                        ref: "removeTabindex",
                        model: {
                            value: e.activeNames,
                            callback: function(t) {
                                e.activeNames = t
                            },
                            expression: "activeNames"
                        }
                    }, [t("el-collapse-item", {
                        ref: "histogram",
                        staticClass: "histogram-collapse",
                        attrs: {
                            title: "直方图",
                            name: "histogram"
                        }
                    }, [e._t("histogram")], 2)], 1), t("params-collapse", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.activeNavName === e.RefineNavName.Palette,
                            expression: "activeNavName === RefineNavName.Palette"
                        }],
                        attrs: {
                            type: "color",
                            "params-cols-height": e.paramsColsHeight
                        },
                        on: {
                            "user-behavior": e.onUserBehavior,
                            "point-filter": e.PointSelectFilter,
                            "on-change": e.onChangeSliders,
                            "on-change-color": e.onChangeColorSliders,
                            "on-input": e.onInputSliders,
                            "on-input-color": e.onInputColorSliders,
                            "on-reset": function(t) {
                                e.$emit("on-reset-params", t), e.PointParameterAdjustmentReset()
                            }
                        }
                    }), t("params-collapse", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.activeNavName === e.RefineNavName.Background,
                            expression: "activeNavName === RefineNavName.Background"
                        }],
                        attrs: {
                            type: "background",
                            "params-cols-height": e.paramsColsHeight
                        },
                        on: {
                            "user-behavior": e.onUserBehavior,
                            "on-change": e.onChangeSliders,
                            "on-change-color": e.onChangeColorSliders,
                            "on-input": e.onInputSliders,
                            "on-input-color": e.onInputColorSliders,
                            "on-reset": function(t) {
                                e.$emit("on-reset-params", t), e.PointParameterAdjustmentReset()
                            }
                        },
                        scopedSlots: e._u([{
                            key: "import",
                            fn: function(t) {
                                return [e._t("import", null, {
                                    data: t.data
                                })]
                            }
                        }], null, !0)
                    })], 1)])], 2), t("div", {
                        staticClass: "bottom-btn",
                        on: {
                            keydown: function(e) {
                                e.preventDefault()
                            }
                        }
                    }, [t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointAddPresetButton,
                            expression: "PointAddPresetButton"
                        }],
                        staticClass: "save-btn",
                        attrs: {
                            size: "mini",
                            disabled: e.isOriParams
                        },
                        on: {
                            click: e.onSaveNewPresetClick
                        }
                    }, [e._v(" 保存新预设 ")]), t("el-button-group", {
                        staticClass: "save-btn",
                        staticStyle: {
                            display: "flex"
                        },
                        attrs: {
                            size: "mini"
                        }
                    }, [t("el-button", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointAddApplyButton,
                            expression: "PointAddApplyButton"
                        }],
                        staticStyle: {
                            width: "110px"
                        },
                        attrs: {
                            size: "mini",
                            title: "同步效果",
                            loading: e.isApplyLoading,
                            disabled: e.isSyncPresetDisabled
                        },
                        on: {
                            click: e.onApplyPresetToOther
                        }
                    }, [e._v(" 同步到选中图片 ")]), t("el-button", {
                        staticClass: "preset-settings",
                        attrs: {
                            size: "mini",
                            id: "guide__refine-preset-settings"
                        },
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.changeSyncSetting.apply(null, arguments)
                            }
                        }
                    }, [t("i", {
                        staticClass: "ts-icon-setting"
                    })])], 1)], 1)], 1), e.isDestroy ? e._e() : t("SavePresetDialog", {
                        ref: "savePresetDialogRefs",
                        attrs: {
                            refineUUID: e.refineUUID,
                            "get-params-json": e.getParamsJson,
                            isRecommendPreset: e.isRecommendPreset,
                            deletePresetSuitId: e.deletePresetSuitId,
                            preset_label: e.preset_label
                        },
                        on: {
                            newPresetClass: function(t) {
                                e.showNewPresetTypeDialog = !0
                            },
                            saveSuccess: e.onSaveSuccess
                        },
                        model: {
                            value: e.showSavePresetDialog,
                            callback: function(t) {
                                e.showSavePresetDialog = t
                            },
                            expression: "showSavePresetDialog"
                        }
                    }), t("ImportPresetDialog", {
                        model: {
                            value: e.showImportPresetDialog,
                            callback: function(t) {
                                e.showImportPresetDialog = t
                            },
                            expression: "showImportPresetDialog"
                        }
                    }), t("NewPresetTypeDialog", {
                        on: {
                            loadPreset: e.loadPreset
                        },
                        model: {
                            value: e.showNewPresetTypeDialog,
                            callback: function(t) {
                                e.showNewPresetTypeDialog = t
                            },
                            expression: "showNewPresetTypeDialog"
                        }
                    }), t("ImportAgeSexRevise", {
                        ref: "import-age-sex-revise",
                        attrs: {
                            value: e.showImportAgeSexRevise,
                            personTypeTab: e.currPersonType,
                            isDestroy: e.isDestroy,
                            refineUUID: e.refineUUID
                        },
                        on: {
                            "update:value": function(t) {
                                e.showImportAgeSexRevise = t
                            },
                            "update:personTypeTab": function(t) {
                                e.currPersonType = t
                            },
                            "update:person-type-tab": function(t) {
                                e.currPersonType = t
                            },
                            changeFaceData: function(t) {
                                return e.$emit("onChangeFaceDataCallback")
                            }
                        }
                    }), t("SyncPresetSettings", {
                        attrs: {
                            refineUUID: e.refineUUID
                        },
                        on: {
                            "on-apply": e.onApplyPresetToOther
                        },
                        model: {
                            value: e.showSyncPresetSettings,
                            callback: function(t) {
                                e.showSyncPresetSettings = t
                            },
                            expression: "showSyncPresetSettings"
                        }
                    })], 1)
                },
                x = [],
                P = i("e31e"),
                S = (i("5377"), i("3eaf")),
                _ = i("2666"),
                O = i("f0fc"),
                I = i("2556");
            const T = ["Male", "Female", "Child", "Older"],
                M = ["Male", "Female", "Child", "Older"],
                j = (e, t = "Male") => {
                    const i = [];
                    return e.forEach(e => {
                        const a = Object(g["cloneDeep"])(e);
                        t && (a.key && (a.key = O["a"].identify(e.key, t)), a.keys && (a.keys = a.keys.map(e => O["a"].identify(e, t))), a.options && a.options.forEach(e => {
                            e.key = O["a"].identify(e.key, t)
                        })), i.push(a)
                    }), i
                },
                D = (e, t = "", i) => {
                    const a = [];
                    return e.forEach(e => {
                        e.cStyle && e.cStyle.runwayStyle && (e.cStyle.runwayStyle.background = i[t][e.key]);
                        const n = JSON.parse(JSON.stringify({
                            ...e
                        }));
                        n.key = I["a"].identify(t, e.key), a.push(n)
                    }), a
                },
                R = e => {
                    const t = [],
                        i = [],
                        a = [],
                        n = [];
                    return e.forEach(e => {
                        const {
                            showType: o,
                            personType: s
                        } = e;
                        let l = {
                                ...e
                            },
                            r = e.key;
                        if (l.flag = S["b"][r], o.includes("Male")) {
                            const e = {
                                ...l
                            };
                            s && s.includes("Male") && (e.key && (e.key = O["a"].identify(r, _["e"].Male)), e.keys && (e.flags = e.keys.map(e => S["b"][e]) || [], e.keys = e.keys.map(e => O["a"].identify(e, _["e"].Male))), "function" === typeof e.visibleBySex && (e.visible = e.visibleBySex(_["e"].Male))), t.push(e)
                        }
                        if (o.includes("Female")) {
                            const e = {
                                ...l
                            };
                            s && s.includes("Female") && (e.key && (e.key = O["a"].identify(r, _["e"].Female)), e.keys && (e.flags = e.keys.map(e => S["b"][e]) || [], e.keys = e.keys.map(e => O["a"].identify(e, _["e"].Female))), "function" === typeof e.visibleBySex && (e.visible = e.visibleBySex(_["e"].Female))), i.push(e)
                        }
                        if (o.includes("Child")) {
                            const e = {
                                ...l
                            };
                            s && s.includes("Child") && (e.key && (e.key = O["a"].identify(r, _["e"].Child)), e.keys && (e.flags = e.keys.map(e => S["b"][e]) || [], e.keys = e.keys.map(e => O["a"].identify(e, _["e"].Child))), "function" === typeof e.visibleBySex && (e.visible = e.visibleBySex(_["e"].Child))), a.push(e)
                        }
                        if (o.includes("Older")) {
                            const e = {
                                ...l
                            };
                            s && s.includes("Older") && (e.key && (e.key = O["a"].identify(r, _["e"].Older)), e.keys && (e.flags = e.keys.map(e => S["b"][e]) || [], e.keys = e.keys.map(e => O["a"].identify(e, _["e"].Older))), "function" === typeof e.visibleBySex && (e.visible = e.visibleBySex(_["e"].Older))), n.push(e)
                        }
                    }), {
                        Male: t,
                        Female: i,
                        Child: a,
                        Older: n
                    }
                };

            function N(e) {
                const t = R(e);
                return new Map([
                    ["Male", t.Male],
                    ["Female", t.Female],
                    ["Child", t.Child],
                    ["Older", t.Older]
                ])
            }
            var B = [{
                    name: "祛斑祛痘",
                    key: _["c"].Spotless,
                    value: 0,
                    personType: M,
                    showType: T
                }, {
                    name: "祛痣",
                    key: _["c"].RemoveNevus,
                    value: 0,
                    cType: "switch",
                    max: 1,
                    personType: M,
                    showType: T
                }, {
                    name: "身体祛瑕疵",
                    key: _["c"].SpotlessBody,
                    value: 0,
                    personType: M,
                    showType: T
                }, {
                    name: "祛抬头纹",
                    key: _["c"].RemoveForeheadLines,
                    value: 0,
                    personType: M,
                    showType: T
                }, {
                    name: "祛眼周纹",
                    key: _["c"].RemoveEyeLines,
                    value: 0,
                    personType: M,
                    showType: T
                }, {
                    name: "祛黑眼圈",
                    key: _["c"].LightenPouch,
                    value: 0,
                    personType: M,
                    showType: T,
                    tip: ["祛黑眼圈通过AI智能识别眼部色素沉", "着对其做充分的祛除。为保证祛除效", "果更自然，滑动滑竿时AI会自动根据", "眼部色素情况判断效果生效程度。"]
                }, {
                    name: "祛法令纹",
                    key: _["c"].TearTrough,
                    value: 0,
                    personType: M,
                    showType: T,
                    tip: ["祛法令纹通过AI智能识别鼻翼两侧暗", "沉对其进行淡化，填充鼻基底，让脸", "部看起来更年轻。为保证淡化效果更", "自然，滑动滑竿时AI会自动根据纹路", "暗沉情况判断效果生效程度。"]
                }, {
                    name: "祛颈纹",
                    key: _["c"].RemoveNeckLines,
                    value: 0,
                    personType: M,
                    showType: T
                }, {
                    name: "祛双下巴",
                    key: _["c"].RemoveDoubleChin,
                    value: 0,
                    personType: M,
                    showType: T,
                    tip: ["去双下巴通过AI智能识别下巴轮廓，", "达到去除双下巴的同时保留正常脸", "型的效果。同时开启祛颈纹功能，", "整体效果更好噢～"],
                    line: e => {
                        const t = e[_["c"].StretchMark];
                        return 1 === t
                    }
                }, {
                    name: "祛妊娠纹",
                    key: _["c"].StretchMark,
                    cType: "switch",
                    value: 0,
                    showType: ["Female"]
                }, {
                    name: "祛妊娠线",
                    key: _["c"].StretchMarkLine,
                    value: 100,
                    showType: ["Female"],
                    visible: e => {
                        const t = e[_["c"].StretchMark];
                        return 1 === t
                    }
                }],
                E = i("25c2"),
                F = i("bd5e");
            const L = F["h"].EnableByGpu;
            var V = [{
                    name: "质感磨皮（中性灰）",
                    key: _["c"].NeutralGrayRetouch,
                    value: 0,
                    personType: M,
                    showType: T
                }, {
                    name: "水润磨皮-脸部",
                    key: _["c"].MoisturizingSkin,
                    value: 0,
                    max: E["v"] ? 50 : 100,
                    personType: M,
                    showType: T
                }, {
                    name: "水润磨皮-身体",
                    key: _["c"].MoisturizingSkinNoFace,
                    value: 0,
                    max: E["v"] ? 50 : 100,
                    personType: M,
                    showType: T,
                    line: !0
                }, {
                    name: "肤色透亮",
                    key: _["c"].SkinColorLighten,
                    value: 0,
                    personType: M,
                    showType: T
                }, {
                    name: "肤色美白",
                    key: _["c"].SkinColorWhiten,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: L
                }, {
                    name: "皮肤红润",
                    key: _["c"].SkinColorRuddy,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: L
                }, {
                    name: "肤色统一",
                    key: _["c"].SkinColorUniform,
                    value: 0,
                    personType: M,
                    showType: T,
                    tip: ["肤色统一通过AI智能肤色识别达到全", "身肤色一致的效果。为避免坏片，开", "启肤色统一开关后，AI会自动根据图", "片肤色情况判断效果是否生效。"]
                }],
                A = [{
                    name: "牙齿美白",
                    key: _["c"].TeethWhiten,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: F["h"].EnableByGpu
                }, {
                    name: "牙齿修复",
                    key: _["c"].ToothRepairing,
                    value: 0,
                    cType: "switch",
                    beta: !0,
                    max: 1,
                    personType: M,
                    showType: T
                }],
                U = [{
                    name: "亮眼",
                    key: _["c"].BrightEye,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: F["h"].EnableByGpu
                }];
            const $ = (e = -1, t = -1) => {
                    const i = -1 === e;
                    return [{
                        name: "纯色背景祛瑕疵",
                        key: _["c"].BgCleanSwitch,
                        value: 0,
                        max: 1,
                        cType: "switch",
                        tip: ["纯色背景祛瑕疵是专门针对纯色背景", "研发的一键祛瑕疵功能。开启后，AI", "会自动识别纯色背景并祛除瑕疵，非", "纯色背景无效果。"],
                        beta: !0
                    }, {
                        name: "背景调整",
                        cType: "select",
                        key: _["c"].BgCleanMode,
                        hiddenName: !0,
                        loading: i,
                        loadingText: "自动识别中...",
                        disabled: i,
                        value: e,
                        options: [{
                            name: (1 === e ? "自动识别：" : "") + "纯色背景",
                            label: "纯色背景",
                            parent: "祛瑕疵",
                            value: 1
                        }, {
                            name: (0 === e ? "自动识别：" : "") + "非纯色背景（无效果）",
                            label: "非纯色背景（无效果）",
                            parent: "祛瑕疵",
                            value: 0
                        }],
                        textColor: "#A6A6A6",
                        visible: e => {
                            const t = e[_["c"].BgCleanSwitch];
                            return 1 === t
                        }
                    }, {
                        name: "纯色背景祛色彩断层",
                        key: _["c"].BgCleanMooreSwitch,
                        value: 0,
                        max: 1,
                        cType: "switch",
                        tip: ["纯色背景祛色彩断层是专门针对纯色背景研发的一键祛除色彩断层（摩尔纹/色块/波纹等）的功能。开启后，AI会自动识别纯色背景并祛除色彩断层，非纯色背景无效果。"],
                        tipStyle: {
                            width: "200px"
                        },
                        beta: !0
                    }, {
                        name: "背景调整",
                        cType: "select",
                        key: _["c"].BgCleanMooreMode,
                        hiddenName: !0,
                        disabled: i,
                        value: t,
                        options: i ? [{
                            name: "自动识别中...",
                            value: 0
                        }, {
                            name: "自动识别中...",
                            value: 1
                        }, {
                            name: "自动识别中...",
                            value: -1
                        }] : [{
                            name: (1 === t ? "自动识别：" : "") + "纯色背景",
                            label: "纯色背景",
                            parent: "祛色彩断层",
                            value: 1
                        }, {
                            name: (0 === t ? "自动识别：" : "") + "非纯色背景（无效果）",
                            label: "非纯色背景（无效果）",
                            parent: "祛色彩断层",
                            value: 0
                        }],
                        textColor: "#A6A6A6",
                        visible: e => {
                            const t = e[_["c"].BgCleanMooreSwitch];
                            return 1 === t
                        },
                        line: !0
                    }, {
                        name: "背景增强",
                        key: _["c"].BackgroundEnhance,
                        realtime: F["h"].EnableByGpu,
                        value: 0,
                        tip: ["通过AI自动调色增强背景的饱和度、对比度等。", "适用于不想过多改变原图色调，又想提升画面", "色彩氛围的情况。"]
                    }]
                },
                H = e => {
                    let t = e.sky,
                        i = e.water,
                        a = e.body;
                    return [{
                        cType: "slot",
                        slotName: "idPhotoSky"
                    }, {
                        title: "天空调整",
                        name: "边缘过渡",
                        key: _["c"].SkyEdgeTransition,
                        value: 0,
                        disabled: !t
                    }, {
                        name: "色温",
                        key: _["c"].SkyTemp,
                        min: -100,
                        max: 100,
                        step: 1,
                        disabled: !t,
                        cStyle: {
                            runwayStyle: {
                                background: "linear-gradient(63.44deg, #2C2B9F 16.67%, #DEDD65 83.33%)"
                            },
                            barStyle: {
                                left: {
                                    background: "transparent"
                                },
                                right: {
                                    background: "transparent"
                                }
                            }
                        }
                    }, {
                        name: "饱和度",
                        key: _["c"].SkySaturation,
                        min: -100,
                        max: 100,
                        step: 1,
                        value: 0,
                        disabled: !t
                    }, {
                        name: "亮度",
                        key: _["c"].SkyBrightness,
                        min: -100,
                        max: 100,
                        step: 1,
                        value: 0,
                        disabled: !t
                    }, {
                        name: "虚化",
                        key: _["c"].SkyVague,
                        value: 0,
                        disabled: !t
                    }, {
                        name: "水平翻转天空",
                        key: _["c"].SkyFlip,
                        value: !1,
                        cType: "switch",
                        disabled: !t
                    }, {
                        title: "人景调整",
                        name: "景物色彩（偏向天空）",
                        key: _["c"].SkySceneryColor,
                        min: -100,
                        max: 100,
                        step: 1,
                        value: 0,
                        disabled: !t
                    }, {
                        name: "人物色彩（偏向天空)",
                        key: _["c"].SkyCharacterColor,
                        min: -100,
                        max: 100,
                        step: 1,
                        value: 0,
                        disabled: !(t && a)
                    }, {
                        title: "水面调整",
                        name: "景物反射",
                        key: _["c"].SkyWaterReflex,
                        min: -100,
                        max: 100,
                        step: 1,
                        value: 0,
                        disabled: !(t && i),
                        titleTip: "给水面加上天空倒影，可控制倒影程度和虚化程度"
                    }, {
                        name: "景物水效虚化",
                        key: _["c"].SkyWaterVague,
                        value: 0,
                        disabled: !(t && i)
                    }]
                };
            var z = i("4efb");
            const W = F["h"].EnableByGpu,
                q = [{
                    name: "高光立体",
                    key: _["c"].FacialStereo3DLight,
                    value: 0,
                    personType: M,
                    showType: M,
                    realtime: W
                }, {
                    name: "阴影立体",
                    key: _["c"].FacialStereo3DShadow,
                    value: 0,
                    personType: M,
                    showType: M,
                    realtime: W
                }, {
                    name: "眼妆增强",
                    key: _["c"].MakeupEnhanceEye,
                    value: 0,
                    personType: M,
                    showType: M,
                    realtime: W
                }, {
                    name: "唇妆增强",
                    key: _["c"].MakeupEnhanceMouth,
                    value: 0,
                    personType: M,
                    showType: M,
                    realtime: W
                }],
                G = R(q),
                K = [{
                    id: 1,
                    label: "主题妆容",
                    key: _["c"].SuitMakeup,
                    effectKey: _["b"].MakeupSuit,
                    isMainItem: !0,
                    value: 0,
                    children: [{
                        id: 0,
                        name: "",
                        path: "",
                        iconPath: "./static/makeupIcons/makeup_icon_disable@3x.png",
                        defaultValue: 0
                    }, {
                        id: 1,
                        name: "伪素颜",
                        path: "Makeups/Suit/MU00000001",
                        iconPath: "./static/makeupIcons/suit_fakemakeup.png",
                        defaultValue: 80
                    }, {
                        id: 2,
                        name: "韩系",
                        path: "Makeups/Suit/MU00000003",
                        iconPath: "./static/makeupIcons/suit_korea.png",
                        defaultValue: 80
                    }, {
                        id: 3,
                        name: "甜美",
                        path: "Makeups/Suit/MU00000005",
                        iconPath: "./static/makeupIcons/suit_sweet.png",
                        defaultValue: 80
                    }, {
                        id: 4,
                        name: "日系",
                        path: "Makeups/Suit/MU00000002",
                        iconPath: "./static/makeupIcons/suit_japenese.png",
                        defaultValue: 80
                    }, {
                        id: 5,
                        name: "复古",
                        path: "Makeups/Suit/MU00000004",
                        iconPath: "./static/makeupIcons/suit_classic.png",
                        defaultValue: 80
                    }, {
                        id: 6,
                        name: "欧美",
                        path: "Makeups/Suit/MU00000006",
                        iconPath: "./static/makeupIcons/suit_europe.png",
                        defaultValue: 80
                    }, {
                        id: 7,
                        name: "锦鲤妆",
                        new: "./static/makeupIcons/makeup_icon_new-lable@3x.png",
                        path: "Makeups/Suit/MU00000007",
                        iconPath: "./static/makeupIcons/suit_brocadecarp.png",
                        defaultValue: 80
                    }, {
                        id: 8,
                        name: "千金妆",
                        new: "./static/makeupIcons/makeup_icon_new-lable@3x.png",
                        path: "Makeups/Suit/MU00000008",
                        iconPath: "./static/makeupIcons/suit_daughter.png",
                        defaultValue: 80
                    }]
                }, {
                    id: 2,
                    label: "眉毛",
                    key: _["c"].EyebrowMakeup,
                    effectKey: _["b"].Eyebrow,
                    customBtnTextStyle: {
                        width: "22px",
                        display: "inline-block"
                    },
                    value: 0,
                    children: [{
                        id: 0,
                        name: "",
                        path: "",
                        iconPath: "./static/makeupIcons/makeup_icon_disable@3x.png",
                        defaultValue: 0
                    }, {
                        id: 1,
                        name: "01",
                        path: "Makeups/Eyebrow/MUEB00000001",
                        iconPath: "./static/makeupIcons/eyebrow_01@3x.png",
                        defaultValue: 70
                    }, {
                        id: 2,
                        name: "02",
                        path: "Makeups/Eyebrow/MUEB00000002",
                        iconPath: "./static/makeupIcons/eyebrow_02@3x.png",
                        defaultValue: 70
                    }, {
                        id: 3,
                        name: "03",
                        path: "Makeups/Eyebrow/MUEB00000003",
                        iconPath: "./static/makeupIcons/eyebrow_03@3x.png",
                        defaultValue: 70
                    }, {
                        id: 4,
                        name: "04",
                        path: "Makeups/Eyebrow/MUEB00000004",
                        iconPath: "./static/makeupIcons/eyebrow_04@3x.png",
                        defaultValue: 70
                    }, {
                        id: 5,
                        name: "05",
                        path: "Makeups/Eyebrow/MUEB00000005",
                        iconPath: "./static/makeupIcons/eyebrow_05@3x.png",
                        defaultValue: 70
                    }, {
                        id: 6,
                        name: "06",
                        path: "Makeups/Eyebrow/MUEB00000006",
                        iconPath: "./static/makeupIcons/eyebrow_06@3x.png",
                        defaultValue: 70
                    }]
                }, {
                    id: 3,
                    label: "眼妆",
                    key: _["c"].EyeMakeup,
                    effectKey: _["b"].Eyemakeup,
                    customBtnTextStyle: {
                        width: "22px",
                        display: "inline-block"
                    },
                    value: 0,
                    children: [{
                        id: 0,
                        name: "",
                        path: "",
                        iconPath: "./static/makeupIcons/makeup_icon_disable@3x.png",
                        defaultValue: 0
                    }, {
                        id: 1,
                        name: "01",
                        path: "Makeups/Eyemakeup/MUEM00000001",
                        iconPath: "./static/makeupIcons/eye_makeup_01@3x.png",
                        defaultValue: 70
                    }, {
                        id: 2,
                        name: "02",
                        path: "Makeups/Eyemakeup/MUEM00000002",
                        iconPath: "./static/makeupIcons/eye_makeup_02@3x.png",
                        defaultValue: 70
                    }, {
                        id: 3,
                        name: "03",
                        path: "Makeups/Eyemakeup/MUEM00000003",
                        iconPath: "./static/makeupIcons/eye_makeup_03@3x.png",
                        defaultValue: 70
                    }, {
                        id: 4,
                        name: "04",
                        path: "Makeups/Eyemakeup/MUEM00000004",
                        iconPath: "./static/makeupIcons/eye_makeup_04@3x.png",
                        defaultValue: 70
                    }, {
                        id: 5,
                        name: "05",
                        path: "Makeups/Eyemakeup/MUEM00000005",
                        iconPath: "./static/makeupIcons/eye_makeup_05@3x.png",
                        defaultValue: 70
                    }, {
                        id: 6,
                        name: "06",
                        path: "Makeups/Eyemakeup/MUEM00000006",
                        iconPath: "./static/makeupIcons/eye_makeup_06@3x.png",
                        defaultValue: 70
                    }]
                }, {
                    id: 4,
                    label: "睫毛",
                    key: _["c"].EyelashMakeup,
                    effectKey: _["b"].Eyelash,
                    customBtnTextStyle: {
                        width: "22px",
                        display: "inline-block"
                    },
                    value: 0,
                    children: [{
                        id: 0,
                        name: "",
                        path: "",
                        iconPath: "./static/makeupIcons/makeup_icon_disable@3x.png",
                        defaultValue: 0
                    }, {
                        id: 1,
                        name: "01",
                        path: "Makeups/Eyelash/MUEL00000001",
                        iconPath: "./static/makeupIcons/eyelash_01@3x.png",
                        defaultValue: 70
                    }, {
                        id: 2,
                        name: "02",
                        path: "Makeups/Eyelash/MUEL00000002",
                        iconPath: "./static/makeupIcons/eyelash_02@3x.png",
                        defaultValue: 70
                    }, {
                        id: 3,
                        name: "03",
                        path: "Makeups/Eyelash/MUEL00000003",
                        iconPath: "./static/makeupIcons/eyelash_03@3x.png",
                        defaultValue: 70
                    }, {
                        id: 4,
                        name: "04",
                        path: "Makeups/Eyelash/MUEL00000004",
                        iconPath: "./static/makeupIcons/eyelash_04@3x.png",
                        defaultValue: 70
                    }, {
                        id: 5,
                        name: "05",
                        path: "Makeups/Eyelash/MUEL00000005",
                        iconPath: "./static/makeupIcons/eyelash_05@3x.png",
                        defaultValue: 70
                    }, {
                        id: 6,
                        name: "06",
                        path: "Makeups/Eyelash/MUEL00000006",
                        iconPath: "./static/makeupIcons/eyelash_06@3x.png",
                        defaultValue: 70
                    }]
                }, {
                    id: 5,
                    label: "腮红",
                    key: _["c"].BlusherMakeup,
                    effectKey: _["b"].Blusher,
                    customBtnTextStyle: {
                        width: "22px",
                        display: "inline-block"
                    },
                    value: 0,
                    children: [{
                        id: 0,
                        name: "",
                        path: "",
                        iconPath: "./static/makeupIcons/makeup_icon_disable@3x.png",
                        defaultValue: 0
                    }, {
                        id: 1,
                        name: "01",
                        path: "Makeups/Blusher/MUBL00000001",
                        iconPath: "./static/makeupIcons/blush_01@3x.png",
                        defaultValue: 50
                    }, {
                        id: 2,
                        name: "02",
                        path: "Makeups/Blusher/MUBL00000002",
                        iconPath: "./static/makeupIcons/blush_02@3x.png",
                        defaultValue: 50
                    }, {
                        id: 3,
                        name: "03",
                        path: "Makeups/Blusher/MUBL00000003",
                        iconPath: "./static/makeupIcons/blush_03@3x.png",
                        defaultValue: 50
                    }, {
                        id: 4,
                        name: "04",
                        path: "Makeups/Blusher/MUBL00000004",
                        iconPath: "./static/makeupIcons/blush_04@3x.png",
                        defaultValue: 50
                    }, {
                        id: 5,
                        name: "05",
                        path: "Makeups/Blusher/MUBL00000005",
                        iconPath: "./static/makeupIcons/blush_05@3x.png",
                        defaultValue: 50
                    }, {
                        id: 6,
                        name: "06",
                        path: "Makeups/Blusher/MUBL00000006",
                        iconPath: "./static/makeupIcons/blush_06@3x.png",
                        defaultValue: 50
                    }]
                }, {
                    id: 6,
                    label: "口红",
                    key: _["c"].LipMakeup,
                    effectKey: _["b"].Lipstick,
                    customBtnTextStyle: {
                        width: "22px",
                        display: "inline-block"
                    },
                    value: 0,
                    children: [{
                        id: 0,
                        name: "",
                        path: "",
                        iconPath: "./static/makeupIcons/makeup_icon_disable@3x.png",
                        defaultValue: 0
                    }, {
                        id: 1,
                        name: "01",
                        path: "Makeups/Lipstick/MULS00000001",
                        iconPath: "./static/makeupIcons/lipstick_01@3x.png",
                        defaultValue: 50
                    }, {
                        id: 2,
                        name: "02",
                        path: "Makeups/Lipstick/MULS00000002",
                        iconPath: "./static/makeupIcons/lipstick_02@3x.png",
                        defaultValue: 50
                    }, {
                        id: 3,
                        name: "03",
                        path: "Makeups/Lipstick/MULS00000003",
                        iconPath: "./static/makeupIcons/lipstick_03@3x.png",
                        defaultValue: 50
                    }, {
                        id: 4,
                        name: "04",
                        path: "Makeups/Lipstick/MULS00000004",
                        iconPath: "./static/makeupIcons/lipstick_04@3x.png",
                        defaultValue: 50
                    }, {
                        id: 5,
                        name: "05",
                        path: "Makeups/Lipstick/MULS00000005",
                        iconPath: "./static/makeupIcons/lipstick_05@3x.png",
                        defaultValue: 50
                    }, {
                        id: 6,
                        name: "06",
                        path: "Makeups/Lipstick/MULS00000006",
                        iconPath: "./static/makeupIcons/lipstick_06@3x.png",
                        defaultValue: 50
                    }]
                }];

            function J(e = "Female") {
                const t = [...G[e]],
                    i = K.map(t => ({
                        key: O["a"].identify(t.key, e),
                        realtime: W
                    }));
                return t.push({
                    cType: "slot",
                    slotName: "makeupSuit",
                    value: 1,
                    realtime: W,
                    realtimeKeys: i,
                    options: K.map(t => {
                        let i = {
                            ...t
                        };
                        return i.key = O["a"].identify(t.key, e), i.effectKey = z["a"].identify(t.effectKey, _["f"][e]), i
                    })
                }), t
            }
            const Y = F["h"].EnableByGpu,
                X = e => t => t[_["a"].FaceSurgery] === e,
                Z = [{
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftFaceLift, _["c"].RightFaceLift],
                    realtime: Y,
                    cTitle: "瘦脸",
                    options: [{
                        name: "左",
                        value: 0
                    }, {
                        name: "右",
                        value: 0
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftTemple, _["c"].RightTemple],
                    realtime: Y,
                    cTitle: "太阳穴",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftCheekBone, _["c"].RightCheekBone],
                    realtime: Y,
                    cTitle: "颧骨",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftJaw, _["c"].RightJaw],
                    realtime: Y,
                    cTitle: "下颌",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    name: "瘦脸",
                    key: _["c"].FaceLift,
                    value: 0,
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "太阳穴",
                    key: _["c"].FacialRefineTemple,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "颧骨",
                    key: _["c"].FacialRefineCheekBone,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "下颌",
                    key: _["c"].FacialRefineJaw,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "小头",
                    key: _["c"].HeadNarrow,
                    value: 0,
                    realtime: !0
                }, {
                    name: "小脸",
                    key: _["c"].FacialRefineSmallFace,
                    value: 0,
                    realtime: !0
                }, {
                    name: "脸宽",
                    key: _["c"].FaceWidth,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "下巴",
                    key: _["c"].FacialRefineChin,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "发际线",
                    key: _["c"].FacialRefineHairLine,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }],
                Q = [{
                    name: "大小",
                    key: _["c"].FacialRefineEyeZoom,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "眼高",
                    key: _["c"].FacialRefineEyeHigher,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "眼宽",
                    key: _["c"].FacialRefineEyeWidth,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "眼距",
                    key: _["c"].FacialRefineEyeDistance,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "倾斜",
                    key: _["c"].FacialRefineEyeAngle,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "位置",
                    key: _["c"].FacialRefineEyeUpDownAdjust,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeZoom, _["c"].RightEyeZoom],
                    realtime: Y,
                    cTitle: "大小",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeHigher, _["c"].RightEyeHigher],
                    realtime: Y,
                    cTitle: "眼高",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeWidth, _["c"].RightEyeWidth],
                    realtime: Y,
                    cTitle: "眼宽",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeDistance, _["c"].RightEyeDistance],
                    realtime: Y,
                    cTitle: "眼距",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeAngle, _["c"].RightEyeAngle],
                    cTitle: "倾斜",
                    realtime: Y,
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeUpDownAdjust, _["c"].RightEyeUpDownAdjust],
                    realtime: Y,
                    cTitle: "位置",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }],
                ee = [{
                    name: "大小",
                    key: _["c"].FacialRefineNose,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "鼻高",
                    key: _["c"].FacialRefineNoseHigher,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "鼻梁",
                    key: _["c"].FacialRefineNoseBridge,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "鼻翼",
                    key: _["c"].FacialRefineNoseAlar,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "鼻尖",
                    key: _["c"].FacialRefineNoseTip,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }],
                te = [{
                    name: "大小",
                    key: _["c"].FacialRefineMouthSize,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "嘴宽",
                    key: _["c"].FacialRefineMouthWidth,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "位置",
                    key: _["c"].FacialRefineMouthHigher,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "丰上唇",
                    key: _["c"].FacialRefineMouthUpperLip,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }, {
                    name: "丰下唇",
                    key: _["c"].FacialRefineMouthLowperLip,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    realtime: !0
                }],
                ie = [{
                    name: "粗细",
                    key: _["c"].FacialRefineEyeBrowThickness,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "眉距",
                    key: _["c"].FacialRefineEyeBrowDistance,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "倾斜",
                    key: _["c"].FacialRefineEyeBrowAngle,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "形状",
                    key: _["c"].FacialRefineEyeBrowShape,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    name: "位置",
                    key: _["c"].FacialRefineEyeBrowHigher,
                    min: -100,
                    value: 0,
                    cType: "ts-slider",
                    visible: X("V1"),
                    realtime: !0
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeBrowThickness, _["c"].RightEyeBrowThickness],
                    realtime: Y,
                    cTitle: "粗细",
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeBrowDistance, _["c"].RightEyeBrowDistance],
                    cTitle: "眉距",
                    realtime: Y,
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeBrowAngle, _["c"].RightEyeBrowAngle],
                    cTitle: "倾斜",
                    realtime: Y,
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeBrowShape, _["c"].RightEyeBrowShape],
                    cTitle: "形状",
                    realtime: Y,
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }, {
                    cType: "ts-slider-group",
                    visible: X("V2"),
                    keys: [_["c"].LeftEyeBrowHigher, _["c"].RightEyeBrowHigher],
                    cTitle: "位置",
                    realtime: Y,
                    options: [{
                        name: "左",
                        value: 0,
                        min: -100
                    }, {
                        name: "右",
                        value: 0,
                        min: -100
                    }]
                }],
                ae = e => [{
                    label: "脸型",
                    id: "facial",
                    data: [...j(Z, e)]
                }, {
                    label: "眉毛",
                    id: "eyeBrow",
                    data: [...j(ie, e)]
                }, {
                    label: "眼睛",
                    id: "eye",
                    data: [...j(Q, e)]
                }, {
                    label: "鼻子",
                    id: "nose",
                    data: [...j(ee, e)]
                }, {
                    label: "嘴巴",
                    id: "mouth",
                    data: [...j(te, e)]
                }],
                ne = e => t => {
                    const i = O["a"].identify(_["c"].SymmetryReshapeSwitch, e);
                    return 1 === t[i]
                },
                oe = [{
                    name: "对称液化（适用证件照）",
                    key: _["c"].SymmetryReshapeSwitch,
                    new: !0,
                    value: 0,
                    cType: "switch",
                    max: 1,
                    showType: T,
                    personType: M,
                    tip: ["“对称液化”是为满足证件照场景而打造的AI肖", "像对称功能。", "五官对称：微调五官（眉毛/眼睛/鼻子/嘴巴/", "耳朵）使其左右对称。", "上半身对称：调整五官以外区域，如脸型、发", "型、上半身姿态等，使其左右对称。"],
                    getDisableValue: (e, t) => !E["v"] && (t && e)
                }, {
                    name: "五官对称",
                    key: _["c"].SymmetryReshapeFace,
                    value: 0,
                    showType: T,
                    personType: M,
                    visibleBySex: ne,
                    realtime: Y,
                    getDisableValue: e => !E["v"] && e
                }, {
                    name: "上半身对称",
                    key: _["c"].SymmetryReshapeBody,
                    value: 0,
                    showType: T,
                    personType: M,
                    visibleBySex: ne,
                    realtime: Y,
                    getDisableValue: (e, t) => !E["v"] && t
                }],
                se = R(oe),
                le = (e, t) => {
                    const i = se[e];
                    if (t) {
                        const a = !t.face[e.toLocaleLowerCase()],
                            n = !t.body[e.toLocaleLowerCase()];
                        i.forEach(e => {
                            const t = e;
                            e.disabled = t.getDisableValue(a, n)
                        })
                    } else i.forEach(e => {
                        e.disabled = !0
                    });
                    return [...i]
                },
                re = (e = "Male", t) => {
                    const i = [{
                            name: "面部重塑",
                            key: "group_facial_refine",
                            cType: "group",
                            value: "facial",
                            filter: !0,
                            customBtnTextStyle: {
                                width: "22px",
                                display: "inline-block"
                            },
                            children: ae(e)
                        }, {
                            name: "使用旧版",
                            parentName: "面部重塑",
                            key: _["a"].FaceSurgery,
                            cType: "checkbox",
                            type: "string",
                            value: "V2",
                            trueLabel: "V1",
                            falseLabel: "V2"
                        }],
                        a = le(e, t);
                    return a && i.push(...a), [...i]
                },
                ce = F["h"].EnableByGpu,
                ue = [{
                    title: "全身",
                    name: "AI塑形",
                    key: _["c"].AIBodyReshape,
                    value: 0,
                    alwaysShow: !0,
                    personType: M,
                    showType: T,
                    realtime: ce
                }, {
                    name: "瘦身",
                    key: _["c"].PoseRefineSlim,
                    value: 0,
                    showType: T,
                    personType: M,
                    realtime: ce
                }, {
                    name: "增高",
                    key: _["c"].PoseRefineHeighten,
                    value: 0,
                    showType: T,
                    realtime: ce,
                    line: !0
                }, {
                    title: "局部",
                    name: "头部",
                    key: _["c"].PoseRefineShrinkHead,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: ce
                }, {
                    cType: "ts-slider-group",
                    keys: [_["c"].PoseRefineSlimLeftNeck, _["c"].PoseRefineSlimRightNeck],
                    realtime: ce,
                    name: "瘦脖子",
                    beta: !0,
                    new: !0,
                    personType: M,
                    showType: T,
                    options: [{
                        name: "左",
                        value: 0
                    }, {
                        name: "右",
                        value: 0
                    }]
                }, {
                    name: "瘦手臂",
                    key: _["c"].PoseRefineSlimHand,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: ce
                }, {
                    name: "丰胸",
                    key: _["c"].PoseRefineEnhanceBreast,
                    value: 0,
                    showType: ["Female"],
                    personType: [_["e"].Female],
                    realtime: ce
                }, {
                    name: "瘦腰",
                    key: _["c"].PoseRefineSlimWaist,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: ce
                }, {
                    name: "美臀",
                    key: _["c"].PoseRefineNiceButtock,
                    value: 0,
                    showType: ["Female"],
                    personType: [_["e"].Female],
                    realtime: ce
                }, {
                    name: "瘦腿",
                    key: _["c"].PoseRefineSlimLeg,
                    value: 0,
                    personType: M,
                    showType: T,
                    realtime: ce
                }, {
                    name: "长腿",
                    key: _["c"].PoseRefineLengthen,
                    value: 0,
                    showType: T,
                    realtime: ce
                }];
            class de {
                constructor(e = "Male") {
                    this.personType = e, this.baseParams = N(ue)
                }
                _mergeRule(e) {
                    let t = this.baseParams.get(this.personType) || [];
                    if (e) {
                        const i = e.get(S["c"][this.personType]) || [],
                            a = new Map(i);
                        return t.map(e => (e.flag && (e.disabled = !!a.has(e.flag) && !a.get(e.flag), e.alwaysShow && (e.disabled = !1)), e.flags && e.flags.length > 0 && (e.disabled = !e.flags.every(e => a.has(e) && a.get(e))), e))
                    }
                    return t.map(e => (e.disabled = !e.hasOwnProperty("alwaysShow"), e))
                }
                getParamsData(e) {
                    return this._mergeRule(e)
                }
            }
            const he = F["h"].AlwaysEnable,
                pe = "rgb(247, 25, 25)",
                fe = "rgb(250, 95, 0)",
                me = "rgb(255, 255, 0)",
                ge = "rgb(0, 225, 0)",
                ve = "rgb(0, 209, 217)",
                be = "rgb(42, 71, 241)",
                ye = "rgb(145, 0, 235)",
                we = "rgb(245, 0, 220)",
                ke = "rgb(128, 128, 128)",
                Ce = "rgb(0, 0, 0)",
                xe = "rgb(255, 255, 255)",
                Pe = {
                    EnhanceEditHSLHue: {
                        [_["d"].Red]: `linear-gradient(to right, ${we}, ${pe}, ${fe})`,
                        [_["d"].Orange]: `linear-gradient(to right, ${pe}, ${fe}, ${me})`,
                        [_["d"].Yellow]: `linear-gradient(to right, ${fe}, ${me}, ${ge})`,
                        [_["d"].Green]: `linear-gradient(to right, ${me}, ${ge}, ${ve})`,
                        [_["d"].Cyan]: `linear-gradient(to right, ${ge}, ${ve}, ${be})`,
                        [_["d"].Blue]: `linear-gradient(to right, ${ve}, ${be}, ${ye})`,
                        [_["d"].Purple]: `linear-gradient(to right, ${be}, ${ye}, ${we})`,
                        [_["d"].Magenta]: `linear-gradient(to right,  ${ye}, ${we}, ${pe})`
                    },
                    EnhanceEditHSLSaturation: {
                        [_["d"].Red]: `linear-gradient(to right, ${ke}, ${pe})`,
                        [_["d"].Orange]: `linear-gradient(to right, ${ke}, ${fe})`,
                        [_["d"].Yellow]: `linear-gradient(to right, ${ke}, ${me})`,
                        [_["d"].Green]: `linear-gradient(to right, ${ke}, ${ge})`,
                        [_["d"].Cyan]: `linear-gradient(to right, ${ke}, ${ve})`,
                        [_["d"].Blue]: `linear-gradient(to right, ${ke}, ${be})`,
                        [_["d"].Purple]: `linear-gradient(to right, ${ke}, ${ye})`,
                        [_["d"].Magenta]: `linear-gradient(to right, ${ke}, ${we})`
                    },
                    EnhanceEditHSLLightness: {
                        [_["d"].Red]: `linear-gradient(to right, ${Ce}, ${pe}, ${xe})`,
                        [_["d"].Orange]: `linear-gradient(to right, ${Ce}, ${fe}, ${xe})`,
                        [_["d"].Yellow]: `linear-gradient(to right, ${Ce}, ${me}, ${xe})`,
                        [_["d"].Green]: `linear-gradient(to right, ${Ce}, ${ge}, ${xe})`,
                        [_["d"].Cyan]: `linear-gradient(to right, ${Ce}, ${ve}, ${xe})`,
                        [_["d"].Blue]: `linear-gradient(to right, ${Ce}, ${be}, ${xe})`,
                        [_["d"].Purple]: `linear-gradient(to right, ${Ce}, ${ye}, ${xe})`,
                        [_["d"].Magenta]: `linear-gradient(to right,  ${Ce}, ${we}, ${xe})`
                    }
                },
                Se = [{
                    name: "红色",
                    key: _["d"].Red,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }, {
                    name: "橙色",
                    key: _["d"].Orange,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }, {
                    name: "黄色",
                    key: _["d"].Yellow,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }, {
                    name: "绿色",
                    key: _["d"].Green,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }, {
                    name: "浅绿色",
                    key: _["d"].Cyan,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }, {
                    name: "蓝色",
                    key: _["d"].Blue,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }, {
                    name: "紫色",
                    key: _["d"].Purple,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }, {
                    name: "洋红色",
                    key: _["d"].Magenta,
                    min: -100,
                    cType: "ts-slider",
                    cStyle: {
                        runwayStyle: {},
                        barStyle: {
                            left: {
                                background: "transparent"
                            },
                            right: {
                                background: "transparent"
                            }
                        },
                        button: {
                            borderColor: "#B9B8B8"
                        }
                    },
                    realtime: he,
                    value: 0
                }];
            var _e = [{
                name: "HSL分组",
                key: "GroupHsl",
                cType: "group",
                value: "Hue",
                filter: !0,
                children: [{
                    id: "Hue",
                    label: "色相",
                    data: [...D(Se, _["c"].EnhanceEditHSLHue, Pe)]
                }, {
                    id: "Saturation",
                    label: "饱和度",
                    data: [...D(Se, _["c"].EnhanceEditHSLSaturation, Pe)]
                }, {
                    id: "Lightness",
                    label: "明亮度",
                    data: [...D(Se, _["c"].EnhanceEditHSLLightness, Pe)]
                }]
            }];
            const Oe = F["h"].AlwaysEnable;
            var Ie = [{
                name: "曝光",
                key: _["c"].EnhanceEditExposure,
                cType: "ts-slider",
                min: -5,
                max: 5,
                step: .05,
                value: 0,
                realtime: Oe
            }, {
                name: "对比度",
                key: _["c"].EnhanceEditContrast,
                cType: "ts-slider",
                min: -100,
                value: 0,
                realtime: Oe
            }, {
                name: "高光",
                key: _["c"].EnhanceEditHighlight,
                cType: "ts-slider",
                min: -100,
                value: 0,
                realtime: Oe
            }, {
                name: "阴影",
                key: _["c"].EnhanceEditShadow,
                cType: "ts-slider",
                min: -100,
                value: 0,
                realtime: Oe
            }, {
                name: "白色",
                key: _["c"].EnhanceEditWhite,
                cType: "ts-slider",
                min: -100,
                value: 0,
                realtime: Oe
            }, {
                name: "黑色",
                key: _["c"].EnhanceEditBlack,
                cType: "ts-slider",
                min: -100,
                value: 0,
                line: !0,
                realtime: Oe
            }, {
                title: "偏好",
                name: "清晰度",
                key: _["c"].EnhanceEditCameraRawSharpen,
                cType: "ts-slider",
                min: -100,
                value: 0,
                realtime: Oe
            }, {
                name: "鲜艳度",
                key: _["c"].EnhanceEditCameraRawVibrance,
                cType: "ts-slider",
                min: -100,
                value: 0,
                realtime: Oe
            }, {
                name: "饱和度",
                key: _["c"].EnhanceEditSaturation,
                cType: "ts-slider",
                min: -100,
                value: 0,
                realtime: Oe
            }];
            const Te = F["h"].AlwaysEnable;
            var Me = [{
                    name: "锐化",
                    key: _["c"].EnhanceEditCRDBStrength,
                    min: 0,
                    max: 150,
                    value: 0,
                    realtime: Te,
                    collapse: !0,
                    collapseValue: !0,
                    collapseDisabled: function(e) {
                        return 0 === e[_["c"].EnhanceEditCRDBStrength]
                    },
                    children: [{
                        name: "半径",
                        key: _["c"].EnhanceEditCRDBRadius,
                        min: .5,
                        max: 3,
                        value: 1,
                        step: .1,
                        realtime: Te
                    }, {
                        name: "细节",
                        key: _["c"].EnhanceEditCRDBDetail,
                        min: 0,
                        max: 100,
                        value: 25,
                        realtime: Te
                    }]
                }],
                je = i("0cb6");
            const De = F["h"].AlwaysEnable,
                Re = (e, t = {
                    oriWbICC: 0,
                    oriWbTint: 0,
                    loaded: !1
                }) => {
                    const i = [],
                        a = {
                            name: "色温",
                            cType: "ts-slider",
                            key: _["c"].EnhanceEditColorTemperature,
                            value: .5,
                            min: 0,
                            max: 1,
                            step: .005,
                            realtime: De,
                            cStyle: {
                                runwayStyle: {
                                    background: "linear-gradient(to right, #2c2b9f, #dedd6d)"
                                },
                                barStyle: {
                                    left: {
                                        background: "transparent"
                                    },
                                    right: {
                                        background: "transparent"
                                    }
                                }
                            },
                            formatValue: function(i) {
                                const a = i || this.value;
                                return "raw" === e ? t.loaded ? Object(je["i"])(a, .5, t.oriWbICC) : "-" : Object(je["c"])(a, .5)
                            },
                            getRealValue: function(t) {
                                return "raw" === e ? Object(je["j"])(t) : Object(je["d"])(t)
                            }
                        },
                        n = {
                            name: "色调",
                            key: _["c"].EnhanceEditHue,
                            cType: "ts-slider",
                            value: .5,
                            min: 0,
                            max: 1,
                            step: .005,
                            realtime: De,
                            cStyle: {
                                runwayStyle: {
                                    background: "linear-gradient(to right, #559e41, #863a8c)"
                                },
                                barStyle: {
                                    left: {
                                        background: "transparent"
                                    },
                                    right: {
                                        background: "transparent"
                                    }
                                }
                            },
                            formatValue: function(i) {
                                const a = i || this.value;
                                return "raw" === e ? t.loaded ? Object(je["k"])(a, .5, t.oriWbTint) : "-" : Object(je["e"])(a, .5)
                            },
                            getRealValue: function(t) {
                                return "raw" === e ? Object(je["l"])(t) : Object(je["f"])(t)
                            }
                        };
                    return i.push(a), i.push(n), i
                };
            var Ne = Re;
            const Be = ["removeDefects"],
                Ee = [{
                    name: "祛除瑕疵",
                    key: "removeDefects"
                }, {
                    name: "皮肤调整",
                    key: "skin"
                }, {
                    name: "面部重塑",
                    key: "facialRefine",
                    new: !0
                }, {
                    name: "牙齿美化",
                    key: "teeth"
                }, {
                    name: "眼睛增强",
                    key: "eye"
                }, {
                    name: "妆容调整",
                    key: "makeup"
                }, {
                    name: "全身美型",
                    key: "body",
                    new: !0,
                    tip: ["全身美型通过AI自动进行形体美化，", "在多人靠近的情况下因容易产生坏", "片目前AI会自动屏蔽效果噢~"]
                }],
                Fe = ["filter", "whiteBalance"],
                Le = [{
                    name: "滤镜",
                    key: "filter",
                    group: "color"
                }, {
                    name: "白平衡",
                    key: "whiteBalance",
                    group: "color"
                }, {
                    name: "影调",
                    key: "base",
                    group: "color"
                }, {
                    name: "HSL",
                    key: "hsl",
                    group: "color"
                }, {
                    name: "细节",
                    key: "detailBoosting",
                    group: "color"
                }],
                Ve = ["backgroundEnhance"],
                Ae = [{
                    name: "背景调整",
                    key: "backgroundEnhance"
                }, {
                    name: "证件照换背景",
                    key: "replace",
                    new: !0
                }, {
                    name: "换天空",
                    component: "sky",
                    key: "sky",
                    new: !0
                }],
                Ue = [{
                    type: "Male",
                    label: "男"
                }, {
                    type: "Female",
                    label: "女"
                }, {
                    type: "Child",
                    label: "儿童"
                }, {
                    type: "Older",
                    label: "长辈"
                }],
                $e = R(B),
                He = R(V),
                ze = R(A),
                We = R(U),
                qe = e => {
                    switch (e) {
                        case "hsl":
                            return [..._e];
                        case "detailBoosting":
                            return [...Me];
                        case "base":
                            return [...Ie]
                    }
                },
                Ge = (e, t = "Male", i) => {
                    switch (e) {
                        case "removeDefects":
                            return $e[t];
                        case "skin":
                            return He[t];
                        case "teeth":
                            return ze[t];
                        case "eye":
                            return We[t];
                        case "facialRefine":
                            return re(t, i);
                        case "body":
                            const e = new de(t);
                            return e.getParamsData(i && i.poseRefineInfos && i.poseRefineInfos.length > 0 ? new Map(i.poseRefineInfos || []) : null);
                        case "makeup":
                            return J(t)
                    }
                };
            const Ke = (e, t) => ["removeDefects", "skin", "teeth", "eye", "body", "makeup"].includes(e) ? Ge(e, t.personType, t.extendInfo) : ["whiteBalance"].includes(e) ? Ne(t.imageType, t.baseValue || {
                oriWbICC: 0,
                oriWbTint: 0,
                loaded: !1
            }) : ["backgroundEnhance"].includes(e) ? t && "number" === typeof t.bgCleanModeDefault ? $(t.bgCleanModeDefault, t.bgCleanMooreModeDefault) : $(-1, -1) : ["facialRefine"].includes(e) ? Ge(e, t.personType, t.symmetryStatusJson) : ["sky"].includes(e) ? H(t.skyExtendInfo) : qe(e);
            var Je = i("ddca"),
                Ye = function() {
                    var e = this,
                        t = e._self._c;
                    return t("el-collapse", {
                        staticClass: "parameter-configuration-collapse",
                        class: ["global__scroll-style"],
                        style: {
                            height: "" + e.paramsColsHeight
                        },
                        attrs: {
                            value: e.activeName
                        },
                        on: {
                            change: function(t) {
                                e.activeName = t
                            }
                        }
                    }, [e._l(e.intelligentComponents, (function(i) {
                        return [t("custom-collapse-item", {
                            key: i.key,
                            ref: "customCollapseItemRef",
                            refInFor: !0,
                            attrs: {
                                "show-label-percent": "",
                                type: i.key,
                                data: {
                                    ...i
                                },
                                active: e.activeName.includes(i.key),
                                initParams: "color" === i.group ? e.oriPaletteParams : e.oriBeautifyParams
                            },
                            on: {
                                "user-behavior": function(t) {
                                    return e.$emit("user-behavior", t)
                                },
                                "on-change": (t, a, n) => "color" === i.group ? e.$emit("on-change-color", t, a, n) : e.$emit("on-change", t, a, n),
                                "on-input": (t, a) => "color" === i.group ? e.$emit("on-input-color", t, a) : e.$emit("on-input", t, a),
                                "on-reset": function(t) {
                                    return e.$emit("on-reset", t)
                                },
                                "on-modify": function(t) {
                                    return e.onModify(t, i.key)
                                }
                            },
                            nativeOn: {
                                keydown: function(t) {
                                    if (!t.type.indexOf("key") && e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"])) return null;
                                    t.preventDefault()
                                }
                            }
                        }, ["removeDefects" === i.key ? t("template", {
                            slot: "title-right"
                        }, [e._t("painter")], 2) : e._e(), "replace" === i.key ? t("template", {
                            slot: "title-right"
                        }, [e._t("import", null, {
                            data: i
                        })], 2) : e._e()], 2)]
                    }))], 2)
                },
                Xe = [],
                Ze = function() {
                    var e = this,
                        t = e._self._c;
                    return t("el-collapse-item", {
                        ref: "customCollapseItemRef",
                        staticClass: "custom-collapse-item",
                        attrs: {
                            name: e.type
                        }
                    }, [t("div", {
                        staticClass: "params-adjust-group-item-title",
                        attrs: {
                            slot: "title"
                        },
                        on: {
                            click: function(t) {
                                return e.$emit("focus")
                            }
                        },
                        slot: "title"
                    }, [t("div", {
                        staticClass: "title-span"
                    }, [t("div", {
                        staticClass: "title"
                    }, [e._v(" " + e._s(e.data.name) + " "), e.data.nameDesc ? t("span", {
                        staticClass: "desc"
                    }, [e._v(" " + e._s(e.data.nameDesc) + " ")]) : e._e()]), e.data.tip ? [t("el-tooltip", {
                        attrs: {
                            content: "",
                            placement: "top"
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-question-outside"
                    }), t("div", {
                        attrs: {
                            slot: "content"
                        },
                        slot: "content"
                    }, ["string" === typeof e.data.tip ? [e._v(" " + e._s(e.data.tip) + " ")] : e._l(e.data.tip, (function(i, a) {
                        return t("p", {
                            key: a
                        }, [e._v(e._s(i))])
                    }))], 2)])] : e._e(), e.data.new ? [t("i", {
                        staticClass: "ts-icon-new"
                    })] : e._e()], 2), t("div", {
                        staticClass: "title-span"
                    }, [e.isModify ? t("i", {
                        staticClass: "el-icon-refresh-right reset-btn-icon",
                        on: {
                            click: function(t) {
                                t.stopPropagation(), e.reset("manual"), e.$emit("focus")
                            }
                        }
                    }) : e._e(), e._t("title-right")], 2)]), t("ComponentCollection", {
                        ref: "componentCollectionRef",
                        staticClass: "params-adjust-group-component c-text-label",
                        staticStyle: {
                            margin: "4px 16px"
                        },
                        attrs: {
                            "parent-tab-name": e.data.name,
                            type: e.type,
                            disabled: e.disabled || e.isSkyDisabled,
                            data: e.formComponents,
                            "single-reset-function": e.singleSingleFunction
                        },
                        on: {
                            "on-blur": e.onBlur,
                            "on-focus": e.onFocus,
                            "on-input": e.onInput,
                            "on-change": e.onChange,
                            "on-keys": function(t) {
                                e.paramsKeys = t
                            },
                            "user-behavior": function(t) {
                                return e.$emit("user-behavior", t)
                            },
                            "on-change-single": (t, i) => e.$emit("on-change-single", t, i)
                        },
                        scopedSlots: e._u([{
                            key: "filter",
                            fn: function() {
                                return [t("filter-component", {
                                    ref: "filterRef",
                                    attrs: {
                                        name: "filter",
                                        initParams: e.initParams
                                    },
                                    on: {
                                        "on-focus": e.onFocus,
                                        "on-blur": e.onBlur,
                                        "on-modify": function(t) {
                                            e.filterIsModify = t
                                        },
                                        "on-selection": function(t) {
                                            return e.$emit("point-filter", e.data)
                                        },
                                        "on-input": e.onSlotInput,
                                        "on-change": (t, i, a, n) => e.$emit("on-change", i, a, n)
                                    }
                                })]
                            },
                            proxy: !0
                        }, {
                            key: "idPhoto",
                            fn: function() {
                                return [t("id-photo", {
                                    ref: "idPhoto",
                                    attrs: {
                                        "init-params": e.initParams
                                    },
                                    on: {
                                        "on-blur": e.onBlur,
                                        "on-focus": e.onFocus,
                                        "on-modify": function(t) {
                                            e.bgIsModify = t
                                        },
                                        "on-change": (t, i, a, n) => e.$emit("on-change", i, a, n)
                                    }
                                })]
                            },
                            proxy: !0
                        }, {
                            key: "idPhotoSky",
                            fn: function() {
                                return [t("id-photo-sky", {
                                    ref: "idPhotoSky",
                                    attrs: {
                                        "init-params": e.initParams,
                                        "have-sky": e.isSkySelectEnable
                                    },
                                    on: {
                                        "on-blur": e.onBlur,
                                        "on-focus": e.onFocus,
                                        "on-modify": function(t) {
                                            e.skyIsModify = t
                                        },
                                        "on-change": (t, i, a, n) => e.$emit("on-change", i, a, n)
                                    }
                                })]
                            },
                            proxy: !0
                        }, {
                            key: "makeupSuit",
                            fn: function({
                                data: i
                            }) {
                                return [t("SuitParamsGroup", {
                                    ref: "suitParamsGroup",
                                    attrs: {
                                        data: i,
                                        "init-params": e.initParams
                                    },
                                    on: {
                                        "on-modify": function(t) {
                                            e.makeupSuitModify = t
                                        },
                                        "on-focus": e.onFocus,
                                        "on-blur": e.onBlur,
                                        "on-input": e.onSlotInput,
                                        "on-change": (t, i, a, n) => e.$emit("on-change", i, a, n)
                                    }
                                })]
                            }
                        }]),
                        model: {
                            value: e.allParamValues,
                            callback: function(t) {
                                e.allParamValues = t
                            },
                            expression: "allParamValues"
                        }
                    }), e.data.label ? t("p", {
                        staticClass: "params-adjust-group-item-label"
                    }, [e._v(e._s(e.data.label))]) : e._e()], 1)
                },
                Qe = [],
                et = i("64a0"),
                tt = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "component-collection"
                    }, [e._l(e.data, (function(i, a) {
                        return [
                            ["slot", "group"].includes(i.cType) ? e._e() : t("ts-item-card", {
                                directives: [{
                                    name: "show",
                                    rawName: "v-show",
                                    value: e.isVisible(i),
                                    expression: "isVisible(item)"
                                }],
                                key: `${i.key}-${a}`,
                                attrs: {
                                    data: i,
                                    line: !!i.line,
                                    disabled: e.disabled || i.disabled,
                                    "hidden-label": ["checkbox"].includes(i.cType) || !!i.hiddenName,
                                    size: ["switch", "checkbox"].includes(i.cType) ? "small" : "ts-slider-group" === i.cType ? "auto" : "default"
                                },
                                on: {
                                    "on-click-label": function(t) {
                                        return e.emitResetSingle(i, "label")
                                    }
                                }
                            }, ["switch" === i.cType ? [t("el-switch", {
                                staticClass: "custom-switch-style",
                                attrs: {
                                    "inactive-value": 0,
                                    "active-value": 1,
                                    disabled: e.disabled || i.disabled
                                },
                                on: {
                                    change: function(t) {
                                        return e.onChange({
                                            [i.key]: t
                                        }, "manual")
                                    }
                                },
                                model: {
                                    value: e.allRecordObject[i.key],
                                    callback: function(t) {
                                        e.$set(e.allRecordObject, i.key, t)
                                    },
                                    expression: "allRecordObject[item.key]"
                                }
                            })] : e._e(), "checkbox" === i.cType ? [t("el-checkbox", {
                                staticClass: "custom-checkbox-style",
                                attrs: {
                                    size: "mini",
                                    disabled: e.disabled || i.disabled,
                                    "true-label": i.trueLabel || !0,
                                    "false-label": i.falseLabel || !1
                                },
                                on: {
                                    change: function(t) {
                                        return e.onChange({
                                            [i.key]: t
                                        }, "manual")
                                    }
                                },
                                model: {
                                    value: e.allRecordObject[i.key],
                                    callback: function(t) {
                                        e.$set(e.allRecordObject, i.key, t)
                                    },
                                    expression: "allRecordObject[item.key]"
                                }
                            }, [e._v(" " + e._s(i.name) + " ")])] : e._e(), i.cType && "ts-slider" !== i.cType ? "ts-slider-group" === i.cType ? [t("ts-slider-group", {
                                ref: "ts-slider-group",
                                refInFor: !0,
                                attrs: {
                                    slot: "bottom",
                                    "input-size": "mini",
                                    "c-title": i.cTitle,
                                    options: i.options,
                                    disabled: e.disabled || i.disabled,
                                    value: [e.allRecordObject[i.keys[0]], e.allRecordObject[i.keys[1]]]
                                },
                                on: {
                                    "on-blur": e.onBlur,
                                    "on-focus": e.onFocus,
                                    input: t => {
                                        e.allRecordObject[i.keys[0]] = t[0], e.allRecordObject[i.keys[1]] = t[1], e.onInput({
                                            [i.keys[0]]: t[0],
                                            [i.keys[1]]: t[1]
                                        })
                                    },
                                    change: (t, a) => e.onSliderGroupChange(t, a, i.keys),
                                    "reset-single": function(t) {
                                        return e.emitResetSingle(t, "slider")
                                    }
                                },
                                slot: "bottom"
                            })] : "select" === i.cType ? [t("el-select", {
                                staticClass: "ts-select",
                                attrs: {
                                    slot: "bottom",
                                    size: "mini",
                                    "popper-class": "component-collection",
                                    disabled: e.disabled || i.disabled,
                                    placeholder: i.placeholder
                                },
                                on: {
                                    change: function(t) {
                                        return e.onChange({
                                            [i.key]: t
                                        }, "manual")
                                    }
                                },
                                slot: "bottom",
                                model: {
                                    value: e.allRecordObject[i.key],
                                    callback: function(t) {
                                        e.$set(e.allRecordObject, i.key, t)
                                    },
                                    expression: "allRecordObject[item.key]"
                                }
                            }, [i.loading && i.loadingText ? [t("el-option", {
                                attrs: {
                                    label: i.loadingText,
                                    value: e.allRecordObject[i.key]
                                }
                            })] : e._l(i.options, (function(i) {
                                return [t("el-option", {
                                    key: i.value,
                                    attrs: {
                                        label: i.name,
                                        value: i.value
                                    }
                                }, [e._v(" " + e._s(i.label || i.name) + " ")])]
                            }))], 2)] : e._e() : [t("ts-number-placeholder", {
                                staticClass: "label-value",
                                attrs: {
                                    min: i.min || 0,
                                    max: i.max || 100,
                                    step: i.step || 1,
                                    disabled: e.disabled || i.disabled,
                                    "format-value": i.formatValue,
                                    "format-result": i.getRealValue
                                },
                                on: {
                                    "on-blur": function(t) {
                                        return e.$emit("on-blur")
                                    },
                                    "on-focus": function(t) {
                                        return e.$emit("on-focus")
                                    },
                                    change: function(t) {
                                        e.onChange({
                                            [i.key]: t
                                        }, "manual"), e.$emit("user-behavior", "input-modify")
                                    }
                                },
                                model: {
                                    value: e.allRecordObject[i.key],
                                    callback: function(t) {
                                        e.$set(e.allRecordObject, i.key, t)
                                    },
                                    expression: "allRecordObject[item.key]"
                                }
                            }), t("ts-slider", {
                                staticClass: "custom-slider-style",
                                attrs: {
                                    slot: "bottom",
                                    "input-size": "mini",
                                    "show-tooltip": !1,
                                    "show-input-controls": !1,
                                    min: i.min || 0,
                                    max: i.max || 100,
                                    cStyle: i.cStyle,
                                    disabled: e.disabled || i.disabled,
                                    step: i.step || 1
                                },
                                on: {
                                    change: function(t) {
                                        return e.onChange({
                                            [i.key]: t
                                        })
                                    },
                                    input: function(t) {
                                        return e.onInput({
                                            [i.key]: t
                                        })
                                    },
                                    ondblclick: function(t) {
                                        return e.emitResetSingle(i, "slider")
                                    }
                                },
                                nativeOn: {
                                    keydown: function(e) {
                                        if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return null;
                                        e.stopPropagation()
                                    }
                                },
                                slot: "bottom",
                                model: {
                                    value: e.allRecordObject[i.key],
                                    callback: function(t) {
                                        e.$set(e.allRecordObject, i.key, t)
                                    },
                                    expression: "allRecordObject[item.key]"
                                }
                            })], i.collapse && i.children && i.children.length > 0 ? [t("span", {
                                staticClass: "collapse-icon",
                                on: {
                                    click: function(t) {
                                        e.collapseObj[i.key] = !e.collapseObj[i.key]
                                    }
                                }
                            }, [t("i", {
                                staticClass: "ts-icon",
                                class: e.collapseObj[i.key] ? "ts-icon-caret-bottom" : "ts-icon-caret-right"
                            })])] : e._e()], 2), "slot" === i.cType ? [e._t(i.slotName, null, {
                                data: i
                            })] : e._e(), "group" === i.cType ? [t("div", {
                                key: "group_" + i.key,
                                staticClass: "group-button-container"
                            }, [t("el-radio-group", {
                                staticStyle: {
                                    "white-space": "nowrap",
                                    "align-self": "center"
                                },
                                attrs: {
                                    size: "mini"
                                },
                                on: {
                                    change: function(t) {
                                        return e.onFilterObjectChange({
                                            [i.key]: t
                                        })
                                    }
                                },
                                model: {
                                    value: e.filterObject[i.key],
                                    callback: function(t) {
                                        e.$set(e.filterObject, i.key, t)
                                    },
                                    expression: "filterObject[item.key]"
                                }
                            }, e._l(i.children, (function(a, n) {
                                return t("el-radio-button", {
                                    key: "el-radio-button_" + n,
                                    style: a.cStyle,
                                    attrs: {
                                        label: a.id
                                    }
                                }, [t("span", {
                                    style: i.customBtnTextStyle || {}
                                }, [e._v(e._s(a.label))])])
                            })), 1), i.tip ? [t("el-tooltip", {
                                attrs: {
                                    content: "",
                                    placement: "right",
                                    effect: "dark"
                                }
                            }, [t("i", {
                                staticClass: "ts-icon ts-icon-question-outside"
                            }), t("div", {
                                style: i.tipStyle || "",
                                attrs: {
                                    slot: "content"
                                },
                                slot: "content"
                            }, e._l(i.tip, (function(i, a) {
                                return t("p", {
                                    key: a
                                }, [e._v(e._s(i))])
                            })), 0)])] : e._e()], 2)] : e._e(), i.children && i.children.length > 0 ? [e._l(i.children, (function(a) {
                                return [a.data && a.data.length > 0 ? t("ComponentCollection", {
                                    directives: [{
                                        name: "show",
                                        rawName: "v-show",
                                        value: e.filterObject[i.key] === a.id,
                                        expression: "filterObject[item.key] === child.id"
                                    }],
                                    key: "component-collection_group-" + a.id,
                                    ref: "params-adjust-group",
                                    refInFor: !0,
                                    attrs: {
                                        data: a.data,
                                        disabled: e.disabled,
                                        "child-data": a,
                                        "item-type": i.cType,
                                        "single-reset-function": e.singleResetFunction
                                    },
                                    on: {
                                        "on-blur": e.onBlur,
                                        "on-focus": e.onFocus,
                                        "on-input": t => e.onInput(t),
                                        "on-change": (t, i) => e.onChange(t, i),
                                        "user-behavior": function(t) {
                                            return e.$emit("user-behavior", t)
                                        }
                                    },
                                    model: {
                                        value: e.allRecordObject,
                                        callback: function(t) {
                                            e.allRecordObject = t
                                        },
                                        expression: "allRecordObject"
                                    }
                                }) : e._e()]
                            }))] : e._e(), i.collapse && i.children && i.children ? [t("ComponentCollection", {
                                directives: [{
                                    name: "show",
                                    rawName: "v-show",
                                    value: e.collapseObj[i.key],
                                    expression: "collapseObj[item.key]"
                                }],
                                key: "component-collection_" + i.key,
                                ref: "component-collection",
                                refInFor: !0,
                                attrs: {
                                    data: i.children,
                                    disabled: !!(e.disabled || i.hasOwnProperty("collapseDisabled") && "function" === typeof i.collapseDisabled) && i.collapseDisabled(e.allRecordObject),
                                    "child-data": i.children,
                                    "item-type": i.cType,
                                    "single-reset-function": e.singleResetFunction
                                },
                                on: {
                                    "on-blur": e.onBlur,
                                    "on-focus": e.onFocus,
                                    "on-input": t => e.onInput(t),
                                    "on-change": (t, i) => e.onChange(t, i),
                                    "user-behavior": function(t) {
                                        return e.$emit("user-behavior", t)
                                    }
                                },
                                model: {
                                    value: e.allRecordObject,
                                    callback: function(t) {
                                        e.allRecordObject = t
                                    },
                                    expression: "allRecordObject"
                                }
                            })] : e._e()
                        ]
                    }))], 2)
                },
                it = [];
            class at {
                constructor(e) {
                    this.filter = !1, this.max = -1, this.key = e.key, this.value = e.value, this.cType = e.cType, this.defaultValue = e.defaultValue || e.value, this.collapse = !!e.collapse, this.collapseValue = !!e.collapseValue, "undefined" !== typeof e.max && (this.max = e.max), "undefined" !== typeof e.filter && (this.filter = e.filter)
                }
                update(e) {
                    return this.max > 0 && e > this.max && (e = this.max), e !== this.value && (this.value = e, !0)
                }
                toObject() {
                    return {
                        [this.key]: this.value
                    }
                }
                toJson() {
                    return {
                        key: this.key,
                        cType: this.cType,
                        value: this.value,
                        defaultValue: this.defaultValue
                    }
                }
            }
            class nt {
                constructor(e, t) {
                    this._collectionMap = new Map;
                    const i = nt.init(e, t);
                    this._collection = i[0], this._collectionMap = i[1]
                }
                static init(e, t) {
                    const i = [],
                        a = new Map;
                    return e.forEach(e => {
                        if ("slot" !== e.cType) {
                            if ("group" === e.cType && e.children && e.children.length > 0 && e.children.forEach(e => {
                                    if (e.data && e.data.length > 0) {
                                        const i = nt.init(e.data, t);
                                        for (const [e, t] of i[1]) a.set(e, t)
                                    }
                                }), e.collapse && e.children && e.children.length > 0) {
                                const i = nt.init(e.children, t);
                                for (const [e, t] of i[1]) a.set(e, t)
                            }
                            if ("ts-slider-group" === e.cType) e.options.forEach((n, o) => {
                                const s = e.keys[o];
                                if (!s) return void console.warn("[ts-slider-group] option need keys");
                                const l = {
                                        ...n,
                                        key: s,
                                        cType: e.cType
                                    },
                                    r = new at(l),
                                    c = t && t[s];
                                "undefined" !== typeof c && r.update(c), i.push(r), a.set(s, r)
                            });
                            else {
                                const n = new at(e),
                                    o = t && t[e.key];
                                "undefined" !== typeof o && n.update(o), i.push(n), a.set(e.key, n)
                            }
                        }
                    }), [i, a]
                }
                toObject() {
                    const e = {};
                    for (const [, t] of this._collectionMap)
                        if (!t.filter) {
                            const i = t.toObject();
                            Object.assign(e, i)
                        } return e
                }
                toFilterObject() {
                    const e = {};
                    for (const [, t] of this._collectionMap)
                        if (t.filter) {
                            const i = t.toObject();
                            Object.assign(e, i)
                        } return e
                }
                toCollapseObject() {
                    const e = {};
                    for (const [, t] of this._collectionMap) t.collapse && (e[t.key] = t.collapseValue);
                    return e
                }
                updateByObject(e) {
                    let t = {};
                    for (const i in e)
                        if (this._collectionMap.has(i)) {
                            const a = this._collectionMap.get(i),
                                n = null === a || void 0 === a ? void 0 : a.update(e[i]);
                            n && Object.assign(t, null === a || void 0 === a ? void 0 : a.toObject())
                        } return t
                }
            }
            var ot = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "ts-item-card"
                    }, [e.data.title ? [t("div", {
                        staticClass: "ts-item-card-title"
                    }, [e._v(e._s(e.title || e.data.title) + " "), e.data.titleTip ? [t("el-tooltip", {
                        attrs: {
                            content: "",
                            placement: "top"
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-question-outside icon-title-tip"
                    }), t("div", {
                        style: e.data.tipStyle || "",
                        attrs: {
                            slot: "content"
                        },
                        slot: "content"
                    }, ["string" === typeof e.data.titleTip ? [e._v(" " + e._s(e.data.titleTip) + " ")] : e._l(e.data.titleTip, (function(i, a) {
                        return t("p", {
                            key: a
                        }, [e._v(e._s(i))])
                    }))], 2)])] : e._e()], 2)] : e._e(), t("div", {
                        staticClass: "ts-item-card-content",
                        class: {
                            disabled: e.disabled,
                            [e.size]: !0,
                            "show-line": e.line
                        }
                    }, [t("div", {
                        staticClass: "ts-item-card-item"
                    }, [t("div", {
                        staticClass: "ts-left"
                    }, [e.hiddenLabel ? e._e() : [t("span", {
                        on: {
                            dblclick: function(t) {
                                return e.$emit("on-click-label")
                            }
                        }
                    }, [e._v(e._s(e.name || e.data.name))])], e.data.tip ? [t("el-tooltip", {
                        attrs: {
                            content: "",
                            placement: "top"
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-question-outside"
                    }), t("div", {
                        style: e.data.tipStyle || "",
                        attrs: {
                            slot: "content"
                        },
                        slot: "content"
                    }, ["string" === typeof e.data.tip ? [e._v(" " + e._s(e.data.tip) + " ")] : e._l(e.data.tip, (function(i, a) {
                        return t("p", {
                            key: a
                        }, [e._v(e._s(i))])
                    }))], 2)])] : e._e(), e.precise || e.data.precise ? [t("span", {
                        staticClass: "badge precise"
                    }, [e._v("专业版限免")])] : e._e(), e.beta || e.data.beta ? [t("span", {
                        staticClass: "tip-box"
                    }, [e._v("beta")])] : e._e(), e.newIcon || e.data.new ? [t("i", {
                        staticClass: "ts-icon-new"
                    })] : e._e()], 2), t("div", {
                        staticClass: "ts-right"
                    }, [e._t("default")], 2)]), t("div", {
                        staticClass: "bottom"
                    }, [e._t("bottom")], 2)]), e.line ? t("el-divider", {
                        staticClass: "divider"
                    }) : e._e()], 2)
                },
                st = [],
                lt = {
                    components: {
                        "el-divider": w["Divider"],
                        "el-tooltip": w["Tooltip"]
                    },
                    props: {
                        disabled: {
                            type: Boolean,
                            default: !1
                        },
                        line: {
                            type: Boolean,
                            default: !1
                        },
                        hiddenLabel: {
                            type: Boolean,
                            default: !1
                        },
                        data: {
                            type: Object,
                            default: () => ({})
                        },
                        title: {
                            type: String,
                            default: ""
                        },
                        name: {
                            type: String,
                            default: ""
                        },
                        precise: {
                            type: Boolean,
                            default: !1
                        },
                        beta: {
                            type: Boolean,
                            default: !1
                        },
                        newIcon: {
                            type: Boolean,
                            default: !1
                        },
                        value: {
                            type: Number,
                            default: 0
                        },
                        size: {
                            type: String,
                            default: "default"
                        }
                    }
                },
                rt = lt,
                ct = (i("f844"), i("2877")),
                ut = Object(ct["a"])(rt, ot, st, !1, null, "7cbfe321", null),
                dt = ut.exports,
                ht = i("a34d"),
                pt = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "ts-slider-group-container",
                        class: {
                            "no-title": !e.cTitle
                        }
                    }, [e.cTitle ? t("div", {
                        staticClass: "ts-slider-group-container-title"
                    }, [e._v(e._s(e.cTitle))]) : e._e(), t("div", {
                        staticClass: "ts-slider-group-container-label"
                    }, e._l(e.options, (function(i, a) {
                        return t("span", {
                            key: a,
                            staticClass: "db-label-item"
                        }, [t("span", {
                            staticClass: "label"
                        }, [t("span", {
                            on: {
                                dblclick: function(t) {
                                    return e.onDoubleClick(i.value, a, "label")
                                }
                            }
                        }, [e._v(e._s(i.name) + " ")])]), t("ts-number-placeholder", {
                            staticClass: "label-value",
                            attrs: {
                                min: i.min || 0,
                                max: i.max || 100,
                                step: i.step || e.step,
                                disabled: e.disabled || i.disabled
                            },
                            on: {
                                "on-blur": function(t) {
                                    return e.$emit("on-blur")
                                },
                                "on-focus": function(t) {
                                    return e.$emit("on-focus")
                                },
                                change: function(t) {
                                    return e.onSlider(t, a)
                                }
                            },
                            model: {
                                value: e.tempObj[a],
                                callback: function(t) {
                                    e.$set(e.tempObj, a, t)
                                },
                                expression: "tempObj[i]"
                            }
                        })], 1)
                    })), 0), t("div", {
                        staticClass: "ts-slider-group-container-slider"
                    }, [e._l(e.options, (function(i, a) {
                        return [t("ts-slider", {
                            key: a,
                            staticClass: "ts-slider-group-item slider",
                            attrs: {
                                min: i.min || 0,
                                max: i.max || 100,
                                step: i.step || e.step,
                                "show-input-controls": i.showInputControls || e.showInputControls,
                                "show-tooltip": i.showTooltip || e.showTooltip,
                                "show-input": i.showInput || e.showInput,
                                "input-size": i.inputSize || e.inputSize,
                                "show-stops": i.showStops || e.showStops,
                                "format-tooltip": i.formatTooltip || e.formatTooltip,
                                disabled: i.disabled || e.disabled,
                                range: i.range || e.range,
                                vertical: i.vertical || e.vertical,
                                height: i.height || e.height,
                                debounce: i.debounce || e.debounce,
                                label: i.label || e.label,
                                tooltipClass: i.tooltipClass || e.tooltipClass,
                                marks: i.marks || e.marks,
                                "c-style": i.cStyle || e.cStyle
                            },
                            on: {
                                change: function(t) {
                                    return e.onSlider(t, a)
                                },
                                ondblclick: function(t) {
                                    return e.onDoubleClick(i.value, a, "slider")
                                },
                                input: function(t) {
                                    return e.onSlider(t, a, "input")
                                }
                            },
                            nativeOn: {
                                keydown: [function(t) {
                                    return t.metaKey ? e.preventDefault.apply(null, arguments) : null
                                }, function(t) {
                                    return t.ctrlKey ? e.preventDefault.apply(null, arguments) : null
                                }, function(e) {
                                    if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return null;
                                    e.stopPropagation()
                                }]
                            },
                            model: {
                                value: e.tempObj[a],
                                callback: function(t) {
                                    e.$set(e.tempObj, a, t)
                                },
                                expression: "tempObj[i]"
                            }
                        }), a !== e.options.length - 1 ? [t("ts-slider-group-lock-icon", {
                            key: i.key,
                            ref: "lock",
                            refInFor: !0,
                            attrs: {
                                isLock: e.isLock,
                                index: a
                            },
                            on: {
                                "update:isLock": function(t) {
                                    e.isLock = t
                                },
                                "update:is-lock": function(t) {
                                    e.isLock = t
                                },
                                click: e.onLockClick
                            }
                        })] : e._e()]
                    }))], 2)])
                },
                ft = [],
                mt = (i("13d5"), function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "ts-slider-group-lock-icon",
                        class: {
                            locked: e.isLock
                        },
                        on: {
                            click: e.switchLockState
                        }
                    }, [t("img", {
                        staticClass: "img",
                        attrs: {
                            src: e.lockIconUrl,
                            alt: ""
                        }
                    })])
                }),
                gt = [],
                vt = {
                    props: {
                        isLock: {
                            type: Boolean,
                            default: !1
                        },
                        index: {
                            type: Number,
                            default: 0
                        }
                    },
                    data() {
                        return {
                            lockIconUrl: this.getLockIconUrl(this.isLock)
                        }
                    },
                    methods: {
                        switchLockState() {
                            this.$emit("update:isLock", !this.isLock), this.$emit("click", !this.isLock)
                        },
                        getLockIconUrl(e) {
                            return e ? this.$getIconPath("toolbar_icon_link_turn_on@3x.png") : this.$getIconPath("toolbar_icon_link_shut_down@3x.png")
                        }
                    },
                    watch: {
                        isLock(e) {
                            this.lockIconUrl = this.getLockIconUrl(e)
                        }
                    }
                },
                bt = vt,
                yt = (i("5965"), Object(ct["a"])(bt, mt, gt, !1, null, "6042517e", null)),
                wt = yt.exports,
                kt = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return e.isClicked ? e._e() : t("span", {
                        staticClass: "ts-number-placeholder",
                        class: {
                            disabled: e.disabled
                        },
                        on: {
                            click: function(t) {
                                return e.onLabelClick(t)
                            }
                        }
                    }, [e._v(" " + e._s(e.showValue) + " ")])
                },
                Ct = [],
                xt = function() {
                    var e = this,
                        t = e._self._c;
                    return e.isShow ? t("div", {
                        staticClass: "ts_inner_wrapper"
                    }, ["checkbox" === e.type ? t("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.parmaChangeInputValue,
                            expression: "parmaChangeInputValue"
                        }],
                        ref: "tsInnerInput",
                        staticClass: "ts_inner_input",
                        attrs: {
                            type: "checkbox"
                        },
                        domProps: {
                            checked: Array.isArray(e.parmaChangeInputValue) ? e._i(e.parmaChangeInputValue, null) > -1 : e.parmaChangeInputValue
                        },
                        on: {
                            blur: e.onChange,
                            keypress: function(t) {
                                return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : (t.stopPropagation(), e.onChange.apply(null, arguments))
                            },
                            input: e.onCheckNumberValue,
                            keydown: [function(t) {
                                return t.type.indexOf("key") || 38 === t.keyCode ? (t.preventDefault(), t.stopPropagation(), e.onUp.apply(null, arguments)) : null
                            }, function(t) {
                                return t.type.indexOf("key") || 40 === t.keyCode ? (t.stopPropagation(), e.onDown.apply(null, arguments)) : null
                            }],
                            focus: e.onFocus,
                            change: function(t) {
                                var i = e.parmaChangeInputValue,
                                    a = t.target,
                                    n = !!a.checked;
                                if (Array.isArray(i)) {
                                    var o = null,
                                        s = e._i(i, o);
                                    a.checked ? s < 0 && (e.parmaChangeInputValue = i.concat([o])) : s > -1 && (e.parmaChangeInputValue = i.slice(0, s).concat(i.slice(s + 1)))
                                } else e.parmaChangeInputValue = n
                            }
                        }
                    }) : "radio" === e.type ? t("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.parmaChangeInputValue,
                            expression: "parmaChangeInputValue"
                        }],
                        ref: "tsInnerInput",
                        staticClass: "ts_inner_input",
                        attrs: {
                            type: "radio"
                        },
                        domProps: {
                            checked: e._q(e.parmaChangeInputValue, null)
                        },
                        on: {
                            blur: e.onChange,
                            keypress: function(t) {
                                return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : (t.stopPropagation(), e.onChange.apply(null, arguments))
                            },
                            input: e.onCheckNumberValue,
                            keydown: [function(t) {
                                return t.type.indexOf("key") || 38 === t.keyCode ? (t.preventDefault(), t.stopPropagation(), e.onUp.apply(null, arguments)) : null
                            }, function(t) {
                                return t.type.indexOf("key") || 40 === t.keyCode ? (t.stopPropagation(), e.onDown.apply(null, arguments)) : null
                            }],
                            focus: e.onFocus,
                            change: function(t) {
                                e.parmaChangeInputValue = null
                            }
                        }
                    }) : t("input", {
                        directives: [{
                            name: "model",
                            rawName: "v-model",
                            value: e.parmaChangeInputValue,
                            expression: "parmaChangeInputValue"
                        }],
                        ref: "tsInnerInput",
                        staticClass: "ts_inner_input",
                        attrs: {
                            type: e.type
                        },
                        domProps: {
                            value: e.parmaChangeInputValue
                        },
                        on: {
                            blur: e.onChange,
                            keypress: function(t) {
                                return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : (t.stopPropagation(), e.onChange.apply(null, arguments))
                            },
                            input: [function(t) {
                                t.target.composing || (e.parmaChangeInputValue = t.target.value)
                            }, e.onCheckNumberValue],
                            keydown: [function(t) {
                                return t.type.indexOf("key") || 38 === t.keyCode ? (t.preventDefault(), t.stopPropagation(), e.onUp.apply(null, arguments)) : null
                            }, function(t) {
                                return t.type.indexOf("key") || 40 === t.keyCode ? (t.stopPropagation(), e.onDown.apply(null, arguments)) : null
                            }],
                            focus: e.onFocus
                        }
                    })]) : e._e()
                },
                Pt = [],
                St = {
                    name: "TsInput",
                    props: {
                        type: {
                            type: String,
                            default: "text"
                        },
                        mountedCallback: {
                            type: Function,
                            default () {
                                return () => {}
                            }
                        },
                        changeCallback: {
                            type: Function,
                            default () {
                                return () => {}
                            }
                        },
                        destroyCallback: {
                            default () {
                                return () => {}
                            }
                        },
                        value: {
                            type: Number,
                            default: 0
                        },
                        autofocus: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    data() {
                        return {
                            parmaChangeInputValue: this.value,
                            isShow: !0,
                            flat: !1,
                            tsInputDom: null
                        }
                    },
                    methods: {
                        init() {
                            this.$nextTick(() => {
                                this.tsInputDom = this.$refs.tsInnerInput, this.autofocus && this.tsInputDom.focus()
                            }), this.mountedCallback()
                        },
                        onCheckNumberValue() {
                            let e = this.parmaChangeInputValue,
                                t = e.charAt(0);
                            e = e.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/[^\d.]/g, "").replace(/^\./g, "").replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1"), "-" == t && (e = "-" + e), this.parmaChangeInputValue = e
                        },
                        onChange() {
                            this.flat || (this.flat = !0, this.changeCallback(this.parmaChangeInputValue))
                        },
                        onFocus(e) {
                            e.currentTarget.select()
                        },
                        destroy() {
                            this.destroyCallback && this.destroyCallback(), this.isShow = !1
                        },
                        onUp() {
                            const e = Number(this.parmaChangeInputValue);
                            isNaN(e) || this.parmaChangeInputValue++
                        },
                        onDown() {
                            const e = Number(this.parmaChangeInputValue);
                            isNaN(e) || this.parmaChangeInputValue--
                        },
                        update(e) {
                            e !== this.parmaChangeInputValue && (this.parmaChangeInputValue = e)
                        }
                    },
                    mounted() {
                        this.init()
                    }
                },
                _t = St,
                Ot = (i("6217"), Object(ct["a"])(_t, xt, Pt, !1, null, "61e7d3d1", null)),
                It = Ot.exports;
            const Tt = (e, t) => {
                    const i = document.createElement(t),
                        a = null === e || void 0 === e ? void 0 : e.parentNode;
                    return null === a || void 0 === a || a.insertBefore(i, e), i
                },
                Mt = (e, t) => {
                    const i = Tt(e, "span"),
                        a = l["default"].extend(It);
                    return new a({
                        propsData: {
                            mountedCallback: t.mountedCallback,
                            changeCallback: t.changeCallback,
                            destroyCallback: t.destroyCallback,
                            value: t.value,
                            autofocus: t.autofocus || !0
                        }
                    }).$mount(i)
                },
                jt = () => ({
                    createTsInput: Mt,
                    createTargetBeforeElDom: Tt
                });
            var Dt = l["default"].extend({
                    name: "TsNumberPlaceholder",
                    props: {
                        disabled: {
                            type: Boolean,
                            default: !1
                        },
                        min: {
                            type: Number,
                            default: 0
                        },
                        max: {
                            type: Number,
                            default: 100
                        },
                        value: {
                            type: Number,
                            default: 0
                        },
                        step: {
                            type: Number,
                            default: 1
                        },
                        formatValue: {
                            type: Function
                        },
                        formatResult: {
                            type: Function
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])(!1),
                            a = Object(l["ref"])(e.value),
                            n = Object(l["ref"])(e.min || 0),
                            o = Object(l["ref"])(e.max || 100),
                            s = Object(l["ref"])(e.step || 1),
                            r = Object(l["computed"])(() => "function" === typeof e.formatValue ? e.formatValue(a.value) : a.value);
                        Object(l["watch"])(() => e.value, e => a.value = e), Object(l["watch"])(a, e => {
                            t("input", e)
                        });
                        const c = (t, i) => {
                                const a = s.value,
                                    l = n.value,
                                    r = o.value;
                                let c = Number(t);
                                if (isNaN(c) || !t) return i;
                                c = a < 1 ? c.toRoundByBase(a) : Math.round(c);
                                let u = "function" === typeof e.formatValue ? e.formatResult(c) : c;
                                return u < l && (u = l), u > r && (u = r), u
                            },
                            u = n => {
                                if (e.disabled) return;
                                const {
                                    createTsInput: o
                                } = jt(), s = o(n.target, {
                                    mountedCallback: () => {
                                        i.value = !0, t("on-focus")
                                    },
                                    changeCallback: e => {
                                        const i = c(e, a.value);
                                        i !== a.value && (a.value = i, t("change", i)), s.destroy()
                                    },
                                    destroyCallback() {
                                        i.value = !1, t("on-blur")
                                    },
                                    value: r.value
                                })
                            };
                        return {
                            showValue: r,
                            currValue: a,
                            isClicked: i,
                            onLabelClick: u
                        }
                    }
                }),
                Rt = Dt,
                Nt = (i("ea58"), Object(ct["a"])(Rt, kt, Ct, !1, null, "79fff74c", null)),
                Bt = Nt.exports,
                Et = {
                    name: "TsSliderGroup",
                    components: {
                        "ts-slider": ht["a"],
                        TsNumberPlaceholder: Bt,
                        "ts-slider-group-lock-icon": wt
                    },
                    props: {
                        step: {
                            type: Number,
                            default: 1
                        },
                        value: {
                            type: [Array, Number],
                            default () {
                                return [0, 0]
                            }
                        },
                        showInput: {
                            type: Boolean,
                            default: !1
                        },
                        showInputControls: {
                            type: Boolean,
                            default: !1
                        },
                        inputSize: {
                            type: String,
                            default: "small"
                        },
                        showStops: {
                            type: Boolean,
                            default: !1
                        },
                        showTooltip: {
                            type: Boolean,
                            default: !1
                        },
                        formatTooltip: Function,
                        disabled: {
                            type: Boolean,
                            default: !1
                        },
                        range: {
                            type: Boolean,
                            default: !1
                        },
                        vertical: {
                            type: Boolean,
                            default: !1
                        },
                        height: {
                            type: String
                        },
                        debounce: {
                            type: Number,
                            default: 300
                        },
                        label: {
                            type: String
                        },
                        tooltipClass: String,
                        marks: Object,
                        cStyle: Object,
                        cTitle: {
                            type: String,
                            default: ""
                        },
                        options: {
                            type: Array,
                            default: () => []
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])(!1),
                            a = Object(l["ref"])(!0),
                            n = Object(l["ref"])(!1);
                        Object(l["onMounted"])(() => {
                            Object(l["nextTick"])(() => {
                                n.value = !0
                            })
                        });
                        const o = Object(l["computed"])(() => e.options.map(e => e.key)),
                            s = e => {
                                const t = {};
                                return e.forEach((e, i) => {
                                    t[i] = e.value
                                }), t
                            },
                            r = Object(l["ref"])(s(e.options));
                        Object(l["watch"])(() => e.options, e => {
                            r.value = s(e)
                        });
                        const c = e => {
                                const t = [],
                                    i = Object.keys(e) || [];
                                return i.forEach(i => {
                                    t[i] = e[i]
                                }), t
                            },
                            u = e => {
                                const t = {};
                                return e.forEach((e, i) => {
                                    t[i] = e
                                }), t
                            };

                        function d(e) {
                            return !e.reduce((e, t) => e ^ t)
                        }

                        function h(e, t) {
                            return e.map((e, i) => "undefined" !== typeof t[i] ? t[i] : e)
                        }
                        Object(l["watch"])(() => e.value, e => {
                            const t = c(r.value);
                            if (!Object(g["isEqual"])(e, t)) {
                                const i = h(t, e);
                                a.value = d(i), r.value = u(i)
                            }
                        }, {
                            immediate: !0
                        });
                        const p = Object(l["computed"])(() => c(r.value)),
                            f = (e, o, s = "change") => {
                                if (!n.value && "input" === s) return;
                                r.value[o] = e;
                                let l = [o];
                                if (a.value) {
                                    const t = [];
                                    for (const i in r.value) r.value[i] = e, t.push(i);
                                    l = t
                                }
                                console.log("eventId: ", a.value, r.value), i.value && "input" === s || t(s, c(p.value), l)
                            },
                            m = e => {
                                if (e) {
                                    const e = r.value[0];
                                    let t = !1;
                                    for (const i in r.value) e !== r.value[i] && (t = !0);
                                    t && (i.value = !0, f(e, 0), Object(l["nextTick"])(() => {
                                        i.value = !1
                                    }))
                                }
                            },
                            v = (e, a, n) => {
                                i.value = !0, f(e, a), Object(l["nextTick"])(() => {
                                    i.value = !1
                                }), t("reset-single", p.value, n)
                            };
                        return {
                            keys: o,
                            currentValue: p,
                            tempObj: r,
                            isLock: a,
                            onSlider: f,
                            onLockClick: m,
                            onDoubleClick: v,
                            preventDefault: e => {
                                [37, 38, 39, 40, 48, 187, 189].includes(e.keyCode) && ([37, 38, 39, 40].includes(e.keyCode) && e.stopPropagation(), e.preventDefault())
                            }
                        }
                    }
                },
                Ft = Et,
                Lt = (i("e710"), Object(ct["a"])(Ft, pt, ft, !1, null, "10ee5377", null)),
                Vt = Lt.exports,
                At = {
                    name: "ComponentCollection",
                    components: {
                        "el-switch": w["Switch"],
                        "el-checkbox": w["Checkbox"],
                        "el-select": w["Select"],
                        "el-option": w["Option"],
                        "ts-slider": ht["a"],
                        "ts-slider-group": Vt,
                        TsItemCard: dt,
                        TsNumberPlaceholder: Bt
                    },
                    props: {
                        data: {
                            type: Array,
                            default: () => []
                        },
                        value: {
                            type: Object,
                            default: () => ({})
                        },
                        disabled: {
                            type: Boolean,
                            default: !1
                        },
                        singleResetFunction: {
                            type: Function
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = e.value,
                            a = Object(l["ref"])(new nt(e.data, i)),
                            n = Object(l["ref"])(a.value.toFilterObject()),
                            o = Object(l["ref"])(a.value.toObject()),
                            s = Object(l["ref"])(a.value.toCollapseObject());
                        t("on-keys", Object.keys(o.value));
                        const r = Object(l["ref"])(!1),
                            c = Object(l["ref"])(!1);
                        Object(l["watch"])(() => e.value, e => {
                            if (Object(g["isEqual"])(o.value, e)) return;
                            const t = a.value.updateByObject(e),
                                i = Object.keys(t).length > 0;
                            i && (o.value = a.value.toObject())
                        }, {
                            deep: !0
                        }), Object(l["watch"])(o, i => {
                            const a = {
                                ...e.value
                            };
                            let n = !1;
                            for (const e in i) a[e] !== i[e] && (n = !0, a[e] = i[e]);
                            n && t("input", a)
                        }, {
                            deep: !0,
                            immediate: !0
                        }), Object(l["watch"])(() => e.data, i => {
                            const n = e.value;
                            a.value = new nt(i, n);
                            const s = a.value.toObject();
                            t("on-keys", Object.keys(s)), o.value = s
                        }), Object(l["onMounted"])(() => {
                            Object(l["nextTick"])(() => {
                                r.value = !0
                            })
                        });
                        const u = e => {
                                a.value.updateByObject(e), t("on-change", e)
                            },
                            d = e => {
                                if (!r.value || c.value) return;
                                const i = a.value.updateByObject(e);
                                Object.keys(i).length > 0 && t("on-input", i)
                            };

                        function h(t) {
                            return "function" === typeof t.visible ? t.visible(e.value) : "boolean" !== t.visible || t.visible
                        }
                        return {
                            allRecordObject: o,
                            filterObject: n,
                            collapseObj: s,
                            isVisible: h,
                            onFocus: () => {
                                t("on-focus")
                            },
                            onBlur: () => {
                                t("on-blur")
                            },
                            onChange: u,
                            onInput: d,
                            onFilterObjectChange: e => {
                                a.value.updateByObject(e)
                            },
                            reset(e) {
                                c.value = !0;
                                const t = a.value.updateByObject(e);
                                return Object.keys(t).length > 0 && (o.value = a.value.toObject()), Object(l["nextTick"])(() => {
                                    c.value = !1
                                }), t
                            },
                            emitResetSingle: (i, a) => {
                                if ("undefined" === typeof o.value[i.key]) return;
                                let n = i.value;
                                if (e.singleResetFunction) {
                                    const t = e.singleResetFunction(i);
                                    "undefined" !== typeof t && "object" !== typeof t && (n = t)
                                }
                                o.value[i.key] !== n && (o.value[i.key] = n, u({
                                    [i.key]: n
                                }), "label" === a && t("user-behavior", "double-click-label"), "slider" === a && t("user-behavior", "double-click-slider"))
                            },
                            onSliderGroupChange: (e, t, i) => {
                                const a = {};
                                t.forEach(t => {
                                    const n = i[t],
                                        o = e[t];
                                    n && "undefined" !== typeof o && (a[n] = o)
                                }), 0 !== Object.keys(a).length && u(a)
                            }
                        }
                    }
                },
                Ut = At,
                $t = (i("0000"), Object(ct["a"])(Ut, tt, it, !1, null, "2f140082", null)),
                Ht = $t.exports,
                zt = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "id-photo-container"
                    }, [t("section", {
                        staticClass: "id-photo-container-background"
                    }, [t("el-radio-group", {
                        staticClass: "ts-custom__radio-group",
                        attrs: {
                            slot: "reference",
                            size: "mini"
                        },
                        slot: "reference",
                        model: {
                            value: e.activeSourceTab,
                            callback: function(t) {
                                e.activeSourceTab = t
                            },
                            expression: "activeSourceTab"
                        }
                    }, [t("el-radio-button", {
                        staticClass: "radio-button",
                        attrs: {
                            label: 0
                        }
                    }, [e._v("推荐背景")]), t("el-radio-button", {
                        staticClass: "radio-button",
                        attrs: {
                            label: 1
                        }
                    }, [e._v("我的背景")])], 1), t("div", {
                        staticClass: "id-photo-container-background-header header",
                        class: {
                            bg_loading: e.isIdPhotoLoading
                        }
                    }, [t("span", {
                        staticClass: "header-title"
                    }, [e._v("背景选择")]), (0 == e.activeSourceTab ? e.backgroundList.length > e.BACKGROUND_LENGTH - 1 : e.mineIdPhotoCount > e.MINE_BACKGROUND_LENGTH - 1) ? t("span", {
                        staticClass: "more",
                        on: {
                            click: e.openMorePanel
                        }
                    }, [e._v("查看更多"), t("i", {
                        staticClass: "el-icon-arrow-right icon"
                    })]) : e._e()]), t("ul", {
                        staticClass: "id-photo-container-background-list",
                        style: {
                            height: e.listIconHeight
                        }
                    }, [0 == e.activeSourceTab ? [e._l(e.backgroundList, (function(i, a) {
                        return [t("li", {
                            key: a,
                            staticClass: "list-item",
                            style: {
                                marginRight: e.getMarginRight(a) + "px"
                            },
                            on: {
                                click: function(t) {
                                    return e.onChangeBackgroundPath(i)
                                }
                            }
                        }, [i.new ? t("i", {
                            staticClass: "ts-icon ts-icon-new"
                        }) : e._e(), t("img", {
                            staticClass: "img",
                            class: {
                                active: e.currentPath === i.path
                            },
                            attrs: {
                                src: i.iconPath
                            }
                        }), t("span", {
                            staticClass: "name"
                        }, [e._v(e._s(e.filterFormatName(i.name)))])])]
                    }))] : e._e(), 1 == e.activeSourceTab ? [e.isMineListEmpty ? e._e() : [t("li", {
                        directives: [{
                            name: "blur",
                            rawName: "v-blur"
                        }],
                        staticClass: "list-item",
                        class: {
                            bg_loading: e.isIdPhotoLoading
                        },
                        style: {
                            marginRight: e.getMineMarginRight(0) + "px"
                        },
                        on: {
                            click: e.onAddClick
                        }
                    }, [t("div", {
                        staticClass: "claImportContent"
                    }, [t("el-button", {
                        attrs: {
                            icon: "el-icon-plus",
                            type: "text"
                        }
                    })], 1), t("span", {
                        staticClass: "name"
                    }, [e._v(e._s("导入背景"))])]), e._l(e.mineIdPhotoList, (function(i, a) {
                        return [t("li", {
                            key: a,
                            staticClass: "list-item",
                            class: {
                                bg_loading: e.isIdPhotoLoading
                            },
                            style: {
                                marginRight: e.getMineMarginRight(a) + "px"
                            },
                            on: {
                                click: function(t) {
                                    return e.onChangeBackgroundPath(i, t)
                                },
                                contextmenu: function(t) {
                                    return t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : e.handleNodeContextmenu(i)
                                }
                            }
                        }, [i.new ? t("i", {
                            staticClass: "ts-icon ts-icon-new"
                        }) : e._e(), t("img", {
                            staticClass: "img",
                            class: {
                                selected: i.isSelected && e.currentPath != i.path,
                                active: e.currentPath === i.path
                            },
                            attrs: {
                                src: e.getIconPath(i)
                            }
                        }), t("span", {
                            staticClass: "name"
                        }, [e._v(e._s(e.filterFormatName(i.name)))])])]
                    }))], e.isMineListEmpty || e.isIdPhotoLoading ? t("id-photo-upload-fragment", {
                        staticClass: "claIdPhotoUpload",
                        attrs: {
                            progress: e.progress,
                            isEmpty: e.isMineListEmpty,
                            showProgress: e.isIdPhotoLoading
                        },
                        on: {
                            onCancel: e.onCancelClick,
                            onAdd: e.onAddClick
                        }
                    }) : e._e()] : e._e()], 2)], 1), t("div", {
                        staticClass: "ts-divider",
                        class: {
                            bg_loading: e.isIdPhotoLoading
                        }
                    }), t("section", {
                        staticClass: "id-photo-container-detail-optimization",
                        class: {
                            bg_loading: e.isIdPhotoLoading
                        }
                    }, [e._m(0), t("div", {
                        staticClass: "slider-wrapper"
                    }, [t("div", {
                        staticClass: "label"
                    }, [t("span", {
                        staticClass: "label-name"
                    }, [t("span", {
                        directives: [{
                            name: "gtag-dbl-event",
                            rawName: "v-gtag-dbl-event",
                            value: e.tsGtag.PointDoubleClickTitle,
                            expression: "tsGtag.PointDoubleClickTitle"
                        }],
                        on: {
                            dblclick: function(t) {
                                return e.onResetSingle(e.SliderEnum.Gamma)
                            }
                        }
                    }, [e._v("边缘调整")])]), t("ts-number-placeholder", {
                        staticClass: "percent",
                        attrs: {
                            min: 0,
                            max: 100,
                            value: e.currentGamma
                        },
                        on: {
                            "on-blur": function(t) {
                                return e.$emit("on-blur")
                            },
                            "on-focus": function(t) {
                                return e.$emit("on-focus")
                            },
                            change: e.onLabelChange
                        }
                    })], 1), t("div", {
                        staticClass: "flex-box"
                    }, [t("ts-slider", {
                        directives: [{
                            name: "gtag-dbl-event",
                            rawName: "v-gtag-dbl-event",
                            value: e.tsGtag.PointDoubleClickDot,
                            expression: "tsGtag.PointDoubleClickDot"
                        }],
                        staticClass: "slider",
                        attrs: {
                            min: 0,
                            max: 100,
                            disabled: !e.currentPath,
                            "show-tooltip": !1
                        },
                        on: {
                            change: e.onChangeBackgroundGamma,
                            ondblclick: function(t) {
                                return e.onResetSingle(e.SliderEnum.Gamma)
                            }
                        },
                        model: {
                            value: e.currentGamma,
                            callback: function(t) {
                                e.currentGamma = t
                            },
                            expression: "currentGamma"
                        }
                    })], 1)])]), t("id-photo-panel", {
                        attrs: {
                            visible: e.isShowPanel,
                            "current-gamma": e.currentGamma,
                            "current-path": e.currentPath,
                            sourceType: e.activeSourceTab
                        },
                        on: {
                            "update:visible": function(t) {
                                e.isShowPanel = t
                            },
                            "update:currentGamma": function(t) {
                                e.currentGamma = t
                            },
                            "update:current-gamma": function(t) {
                                e.currentGamma = t
                            },
                            onActiveSourceChange: e.onActiveSourceChange,
                            "on-blur": function(t) {
                                return e.$emit("on-blur")
                            },
                            "on-focus": function(t) {
                                return e.$emit("on-focus")
                            },
                            "on-change-background-path": e.onChangeBackgroundPath,
                            "on-change-background-gamma": e.onChangeBackgroundGamma
                        }
                    })], 1)
                },
                Wt = [function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "id-photo-container-detail-optimization-header header"
                    }, [t("span", {
                        staticClass: "header-title"
                    }, [e._v("细节优化")])])
                }],
                qt = i("63ea"),
                Gt = i.n(qt),
                Kt = function() {
                    var e = this,
                        t = e._self._c;
                    return e.visible ? t("div", {
                        staticClass: "id-photo-panel-container"
                    }, [t("div", {
                        staticClass: "id-photo-panel-container-header"
                    }, [t("span", {
                        on: {
                            click: e.closePanel
                        }
                    }, [t("i", {
                        staticClass: "el-icon-arrow-left"
                    }), e._v(" 证件照 ")])]), t("div", {
                        staticClass: "id-photo-panel-container-content global__scroll-style"
                    }, [t("div", {
                        staticClass: "id-photo-panel-container-background"
                    }, [t("el-radio-group", {
                        staticClass: "ts-custom__radio-group radio-group",
                        attrs: {
                            slot: "reference",
                            size: "mini"
                        },
                        on: {
                            change: function(t) {
                                return e.$emit("onActiveSourceChange", t)
                            }
                        },
                        slot: "reference",
                        model: {
                            value: e.activeSourceTab,
                            callback: function(t) {
                                e.activeSourceTab = t
                            },
                            expression: "activeSourceTab"
                        }
                    }, [t("el-radio-button", {
                        staticClass: "radio-button",
                        attrs: {
                            label: 0
                        }
                    }, [e._v("推荐背景")]), t("el-radio-button", {
                        staticClass: "radio-button",
                        attrs: {
                            label: 1
                        }
                    }, [e._v("我的背景")])], 1), t("div", {
                        staticClass: "title"
                    }, [e._v(" 背景选择 ")]), t("ul", {
                        staticClass: "id-photo-panel-container-background-list"
                    }, [0 == e.activeSourceTab ? [e._l(e.backgroundList, (function(i, a) {
                        return [t("li", {
                            key: a,
                            staticClass: "list-item",
                            style: {
                                marginRight: e.getMarginRight(a) + "px"
                            },
                            on: {
                                click: function(t) {
                                    return e.onChangeBackgroundPath(i)
                                }
                            }
                        }, [i.new ? t("i", {
                            staticClass: "ts-icon ts-icon-new"
                        }) : e._e(), t("img", {
                            staticClass: "img",
                            class: {
                                active: e.currentPath === i.path
                            },
                            attrs: {
                                src: i.iconPath,
                                alt: ""
                            }
                        }), t("span", {
                            staticClass: "name"
                        }, [e._v(e._s(e.filterFormatName(i.name)))])])]
                    }))] : e._e(), 1 == e.activeSourceTab ? [e._l(e.mineIdBackgroundList, (function(i, a) {
                        return [t("li", {
                            key: a,
                            staticClass: "list-item",
                            style: {
                                marginRight: e.getMarginRight(a) + "px"
                            },
                            on: {
                                click: function(t) {
                                    return e.onChangeBackgroundPath(i, t)
                                },
                                contextmenu: function(t) {
                                    return t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : e.handleNodeContextmenu(i)
                                }
                            }
                        }, [i.new ? t("i", {
                            staticClass: "ts-icon ts-icon-new"
                        }) : e._e(), t("img", {
                            staticClass: "img",
                            class: {
                                selected: i.isSelected && e.currentPath != i.path,
                                active: e.currentPath === i.path
                            },
                            attrs: {
                                src: e.getIconPath(i),
                                alt: ""
                            }
                        }), t("span", {
                            staticClass: "name"
                        }, [e._v(e._s(e.filterFormatName(i.name)))])])]
                    }))] : e._e()], 2)], 1), t("div", {
                        staticClass: "ts-divider"
                    }), t("div", {
                        staticClass: "id-photo-panel-container-detail-optimization"
                    }, [t("div", {
                        staticClass: "title"
                    }, [e._v(" 细节优化 ")]), t("div", {
                        staticClass: "slider-wrapper"
                    }, [t("div", {
                        staticClass: "label"
                    }, [t("span", {
                        directives: [{
                            name: "gtag-dbl-event",
                            rawName: "v-gtag-dbl-event",
                            value: e.tsGtag.PointDoubleClickTitle,
                            expression: "tsGtag.PointDoubleClickTitle"
                        }],
                        staticClass: "name",
                        on: {
                            dblclick: function(t) {
                                return e.onResetSingle(e.SliderEnum.Gamma)
                            }
                        }
                    }, [e._v("边缘调整")]), t("ts-number-placeholder", {
                        staticClass: "percent",
                        attrs: {
                            min: 0,
                            max: 100,
                            value: e.panelGamma
                        },
                        on: {
                            "on-blur": function(t) {
                                return e.$emit("on-blur")
                            },
                            "on-focus": function(t) {
                                return e.$emit("on-focus")
                            },
                            change: e.onLabelChange
                        }
                    })], 1), t("div", {
                        staticClass: "flex-box"
                    }, [t("ts-slider", {
                        directives: [{
                            name: "gtag-dbl-event",
                            rawName: "v-gtag-dbl-event",
                            value: e.tsGtag.PointDoubleClickDot,
                            expression: "tsGtag.PointDoubleClickDot"
                        }],
                        staticClass: "slider",
                        attrs: {
                            min: 0,
                            max: 100,
                            disabled: !e.currentPath,
                            "show-tooltip": !1
                        },
                        on: {
                            change: e.onChangeBackgroundGamma,
                            ondblclick: function(t) {
                                return e.onResetSingle(e.SliderEnum.Gamma)
                            }
                        },
                        model: {
                            value: e.panelGamma,
                            callback: function(t) {
                                e.panelGamma = t
                            },
                            expression: "panelGamma"
                        }
                    })], 1)])])])]) : e._e()
                },
                Jt = [],
                Yt = i("92a2"),
                Xt = i("7203"),
                Zt = i("3b32"),
                Qt = {
                    name: "id-photo-panel",
                    components: {
                        "ts-slider": ht["a"],
                        TsNumberPlaceholder: Bt
                    },
                    mixins: [d["a"]],
                    props: {
                        visible: {
                            type: Boolean,
                            default: !1
                        },
                        currentPath: {
                            type: String,
                            default: ""
                        },
                        currentGamma: {
                            type: Number,
                            default: 0
                        },
                        sourceType: {
                            type: Number,
                            default: 0
                        }
                    },
                    watch: {
                        sourceType: {
                            handler: function(e, t) {
                                e == E["y"].Mime && r["a"].dispatch("presetSuit/ACT_FindMineIdPhotoBgList", {
                                    isShort: !1
                                }), this.activeSourceTab = e
                            },
                            immediate: !0
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        let i = Object(l["getCurrentInstance"])(),
                            a = Object(l["ref"])(0);
                        const n = l["default"].extend(m["a"]),
                            o = new n,
                            s = e => (e + 1) % 4 ? 8 : 0,
                            c = () => {
                                t("update:visible", !1)
                            },
                            u = Object(l["computed"])(() => r["a"].getters["presetSuit/backgroundList"]),
                            d = Object(l["computed"])(() => {
                                const e = r["a"].getters["presetSuit/mineIdPhotoList"];
                                return e
                            }),
                            h = (e, i) => {
                                t("on-change-background-path", e, i)
                            },
                            p = Object(l["computed"])(() => e.currentPath),
                            f = Object(l["computed"])(() => e.currentGamma),
                            g = Object(l["ref"])(0);
                        Object(l["watch"])(f, e => {
                            g.value = e
                        });
                        const v = e => {
                                t("update:currentGamma", e), t("on-change-background-gamma")
                            },
                            b = {
                                None: -1,
                                Gamma: 0
                            },
                            y = e => {
                                e !== g.value && (g.value = e, v(g.value), o.PointManualModifyComplete())
                            },
                            w = e => {
                                if (!p.value) return;
                                const t = u.value.find(e => e.path === p.value);
                                if (e === b.Gamma) {
                                    if (f.value === t.value) return;
                                    v(t.value)
                                }
                            },
                            k = e => {
                                if (e.isOriginal) return e.fullIconPath;
                                const t = Zt["a"].encodeURIComponent(e.fullIconPath),
                                    a = (i.proxy.$isDev ? "tsFile://" : "file://") + t;
                                return a
                            },
                            C = e => {
                                let t = [],
                                    a = r["a"].getters["presetSuit/mineIdPhotoList"],
                                    n = !1;
                                for (const i of a) !i.isOriginal && i.sourceType == E["y"].Mime && i.isSelected && (t.push(i.localMaterialId), i.localMaterialId == e.localMaterialId && (n = !0));
                                n || t.push(e.localMaterialId), i.proxy.tsConfirm({
                                    title: "",
                                    customMessageStyle: "textAlign: center",
                                    message: `确认删除${t.length}个背景`
                                }).then(async e => {
                                    await r["a"].dispatch("presetSuit/ACT_BatchDeleteMineIdPhotoBgList", t), await Yt["b"].deleteItems(t)
                                }).catch(() => {})
                            },
                            x = e => {
                                const t = new Xt["a"];
                                t.push({
                                    label: "删除",
                                    action: "batch-delete",
                                    disabled: !1,
                                    data: e,
                                    callback: C
                                }).show()
                            };

                        function P(e) {
                            if (e.length >= 10) {
                                let t = e.substr(0, 4),
                                    i = e.substr(e.length - 2, 2);
                                return `${t} ... ${i}`
                            }
                            return e
                        }
                        return {
                            activeSourceTab: a,
                            getMarginRight: s,
                            closePanel: c,
                            backgroundList: u,
                            mineIdBackgroundList: d,
                            onChangeBackgroundPath: h,
                            onChangeBackgroundGamma: v,
                            onDeleteMaterialMineIdPhoto: C,
                            handleNodeContextmenu: x,
                            panelGamma: g,
                            SliderEnum: b,
                            onLabelChange: y,
                            onResetSingle: w,
                            tsGtag: o,
                            getIconPath: k,
                            filterFormatName: P
                        }
                    }
                },
                ei = Qt,
                ti = (i("5130"), Object(ct["a"])(ei, Kt, Jt, !1, null, "d58eb162", null)),
                ii = ti.exports,
                ai = i("57d3"),
                ni = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "idPhotoUploadFragment",
                        style: {
                            background: e.showProgress ? "rgba(0,0,0,0)" : "transparent"
                        }
                    }, [e.isEmpty ? t("div", {
                        staticClass: "claImport"
                    }, [t("div", {
                        staticClass: "claImportContent",
                        on: {
                            click: e.onAddClick
                        }
                    }, [t("el-button", {
                        attrs: {
                            icon: "el-icon-plus",
                            type: "text"
                        }
                    })], 1), t("span", {
                        staticClass: "claEmptyDes"
                    }, [e._v("支持jpeg/jpg/png/gif/tif/bmp等格式")])]) : e._e(), e.showProgress ? t("div", {
                        staticClass: "claUpload"
                    }, [t("span", {
                        staticClass: "claProgressDes"
                    }, [e._v(e._s(e.importDescription))]), t("div", {
                        staticClass: "claProgressItem"
                    }, [t("el-progress", {
                        attrs: {
                            "show-text": !1,
                            "text-inside": "",
                            "stroke-width": 5,
                            percentage: e.percentage > 100 ? 100 : e.percentage
                        }
                    }), e.isCancel ? e._e() : t("el-button", {
                        staticClass: "claCloseBtn",
                        attrs: {
                            icon: "el-icon-close"
                        },
                        on: {
                            click: e.onCancelClick
                        }
                    })], 1)]) : e._e()])
                },
                oi = [],
                si = (i("5b81"), {
                    name: "",
                    components: {
                        "el-progress": w["Progress"]
                    },
                    props: {
                        description: {
                            type: String,
                            default: "正在导入{0}个背景素材..."
                        },
                        showProgress: {
                            type: Boolean,
                            default: !1
                        },
                        isEmpty: {
                            type: Boolean,
                            default: !0
                        },
                        progress: {
                            type: Object,
                            default: function() {
                                return {
                                    current: 0,
                                    total: 1
                                }
                            }
                        }
                    },
                    data() {
                        return {
                            isCancel: !1
                        }
                    },
                    computed: {
                        importDescription() {
                            return this.description.replaceAll("{0}", "" + this.progress.current)
                        },
                        percentage() {
                            return this.progress.total ? this.progress.current / this.progress.total * 100 : 0
                        }
                    },
                    methods: {
                        onCancelClick() {
                            this.isCancel = !0, this.$emit("onCancel", null)
                        },
                        onAddClick() {
                            this.$emit("onAdd", null)
                        }
                    }
                }),
                li = si,
                ri = (i("6e02"), Object(ct["a"])(li, ni, oi, !1, null, "6554cc69", null)),
                ci = ri.exports,
                ui = i("e473"),
                di = i("3d6e"),
                hi = i("3d54"),
                pi = i("93b6"),
                fi = i("67a1"),
                mi = (i("5bc6"), i("465e"));
            const gi = ai["a"].identify(_["c"].BgReplacePath);
            var vi = {
                    name: "id-photo",
                    mixins: [d["a"]],
                    components: {
                        IdPhotoPanel: ii,
                        TsSlider: ht["a"],
                        TsNumberPlaceholder: Bt,
                        idPhotoUploadFragment: ci
                    },
                    props: {
                        initParams: {
                            type: Object,
                            default: () => ({})
                        }
                    },
                    data() {
                        return {
                            importStatusWatchSymbol: null,
                            isIdPhotoLoading: !1,
                            MINE_BACKGROUND_LENGTH: hi["d"],
                            BACKGROUND_LENGTH: hi["a"],
                            progress: {
                                current: 0,
                                total: 1
                            }
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["getCurrentInstance"])(),
                            a = l["default"].extend(m["a"]),
                            n = new a,
                            {
                                PointSelectIdPhotoBackground: o
                            } = Object(mi["a"])(),
                            s = Object(l["computed"])(() => r["a"].getters["presetSuit/matchBackgroundList"](v.value)),
                            c = Object(l["computed"])(() => 0 == r["a"].getters["presetSuit/mineIdPhoto"].bgList.length),
                            u = Object(l["ref"])(E["y"].System),
                            d = e => (e + 1) % 5 ? 6 : 0,
                            h = e => {
                                const t = -1;
                                return (e - t + 1) % 5 ? 6 : 0
                            };

                        function p(e) {
                            if (e.length >= 10) {
                                let t = e.substr(0, 4),
                                    i = e.substr(e.length - 2, 2);
                                return `${t} ... ${i}`
                            }
                            return e
                        }
                        const f = Object(l["ref"])(!1),
                            g = () => {
                                f.value = !0
                            },
                            v = Object(l["ref"])(""),
                            b = Object(l["ref"])(0),
                            y = (e, i, a, n) => {
                                let o = v.value;
                                n && n instanceof di["a"] && (o = n.shortEffectPath);
                                const s = {
                                        [gi]: o,
                                        [_["c"].BgReplaceGamma]: b.value
                                    },
                                    l = {};
                                for (const t in C.value) Object.hasOwnProperty.call(C.value, t) && C.value[t] !== e[t] && (l[t] = e[t]);
                                Object.keys(l).length > 0 && t("on-change", s, e, i, a), C.value = s
                            },
                            w = (e, t) => {
                                if (t) {
                                    if (t.ctrlKey || t.metaKey) return void i.proxy.onCommandLeftMouseClick(e, t.metaKey);
                                    if (t.shiftKey) return void i.proxy.onShiftMouseClick(e)
                                }
                                v.value = e.path, !e.path && b.value && (b.value = 0);
                                let a = null;
                                a = u.value == E["y"].System ? s.value.find(e => e.path === v.value) : i.proxy.mineIdPhotoList.find(e => e.path === v.value), o(a);
                                let n = {
                                    labName: "",
                                    isRest: !1,
                                    isSwitch: !1,
                                    lab2Name: "",
                                    lab3Name: "",
                                    optDesc: ""
                                };
                                n.labName = "证件照", n.lab2Name = "背景", n.optDesc = e.name;
                                let l = v.value;
                                e && e instanceof di["a"] && (l = e.shortEffectPath), y({
                                    [gi]: l,
                                    [_["c"].BgReplaceGamma]: b.value
                                }, "manual", JSON.stringify(n), e)
                            },
                            k = () => {
                                let e = {
                                    labName: "",
                                    isRest: !1,
                                    isSwitch: !1,
                                    lab2Name: "",
                                    lab3Name: "",
                                    optDesc: ""
                                };
                                e.labName = "证件照", e.lab2Name = "边缘调整", e.optDesc = b.value, y({
                                    [_["c"].BgReplaceGamma]: b.value
                                }, "manual", JSON.stringify(e))
                            },
                            C = Object(l["ref"])({}),
                            x = Object(l["computed"])(() => {
                                const t = {};
                                for (const i in e.initParams) Object.hasOwnProperty.call(C.value, i) && (t[i] = e.initParams[i]);
                                return t
                            }),
                            P = Object(l["computed"])(() => !Gt()(C.value, x.value));
                        Object(l["watch"])(P, e => {
                            t("on-modify", e)
                        });
                        const S = e => {
                                if (Object.hasOwnProperty.call(e, gi)) {
                                    v.value = e[gi];
                                    const t = "/effect",
                                        i = v.value.lastIndexOf(t);
                                    i > 0 && (v.value = v.value.substr(0, i))
                                }
                                Object.hasOwnProperty.call(e, _["c"].BgReplaceGamma) && (b.value = e[_["c"].BgReplaceGamma]), C.value = {
                                    [gi]: v.value,
                                    [_["c"].BgReplaceGamma]: b.value
                                }
                            },
                            O = () => {
                                Object.hasOwnProperty.call(x.value, gi) && (v.value = x.value[gi]), Object.hasOwnProperty.call(x.value, _["c"].BgReplaceGamma) && (b.value = x.value[_["c"].BgReplaceGamma]);
                                let e = {
                                    labName: "",
                                    isRest: !1,
                                    isSwitch: !1,
                                    lab2Name: "",
                                    lab3Name: "",
                                    optDesc: ""
                                };
                                e.labName = "背景调整", e.optDesc = "重置", y({
                                    [gi]: v.value,
                                    [_["c"].BgReplaceGamma]: b.value
                                }, "reset", JSON.stringify(e))
                            },
                            I = {
                                None: -1,
                                Gamma: 0
                            },
                            T = e => {
                                e !== b.value && (b.value = e, k(), n.PointManualModifyComplete())
                            },
                            M = e => {
                                if (!v.value) return;
                                const t = s.value.find(e => e.path === v.value);
                                if (e === I.Gamma) {
                                    if (b.value === t.value) return;
                                    b.value = t.value, k()
                                }
                            },
                            j = () => {},
                            D = () => {
                                Yt["b"].openAndImportIdPhotosMaterial()
                            };
                        return {
                            activeSourceTab: u,
                            isShowPanel: f,
                            openMorePanel: g,
                            filterFormatName: p,
                            currentPath: v,
                            currentGamma: b,
                            backgroundList: s,
                            getMarginRight: d,
                            getMineMarginRight: h,
                            onChangeBackgroundPath: w,
                            onChangeBackgroundGamma: k,
                            onCancelClick: j,
                            onAddClick: D,
                            isModify: P,
                            reset: O,
                            init: S,
                            SliderEnum: I,
                            onLabelChange: T,
                            onResetSingle: M,
                            tsGtag: n,
                            isMineListEmpty: c
                        }
                    },
                    computed: {
                        ...Object(c["c"])("presetSuit", ["mineIdPhoto"]),
                        listIconHeight() {
                            return 0 == this.activeSourceTab ? "auto" : this.isMineListEmpty ? "155px" : "145px"
                        },
                        mineIdPhotoList() {
                            let e = r["a"].getters["presetSuit/matchMineIdPhotoBackgroundList"];
                            const t = this.currentPath;
                            let i = e(t);
                            return i
                        },
                        mineIdPhotoCount() {
                            let e = r["a"].getters["presetSuit/mineIdPhotoList"];
                            return e.length
                        }
                    },
                    methods: {
                        ...Object(c["d"])("presetSuit", ["_UpdateMineIdPhotoBgList", "_UpdateMineIdPhotoBgIsLoadAll"]),
                        getIconPath(e) {
                            if (e.isOriginal) return e.fullIconPath;
                            const t = (this.$isDev ? "tsFile://" : "file://") + Zt["a"].encodeURIComponent(e.fullIconPath);
                            return t
                        },
                        onActiveSourceChange(e) {
                            this.activeSourceTab = e
                        },
                        async onDeleteMaterialMineIdPhoto(e) {
                            let t = [],
                                i = r["a"].getters["presetSuit/mineIdPhotoList"],
                                a = !1;
                            for (const n of i) {
                                const i = !n.isOriginal && (n.sourceType === E["y"].Mime && n.isSelected || n.path == this.currentPath);
                                i && n.localMaterialId && (t.push(n.localMaterialId), n.localMaterialId == e.localMaterialId && (a = !0))
                            }!a && e.localMaterialId && t.push(e.localMaterialId), this.tsConfirm({
                                title: "",
                                customMessageStyle: "textAlign: center",
                                message: `确认删除${t.length}个背景`
                            }).then(async e => {
                                await r["a"].dispatch("presetSuit/ACT_BatchDeleteMineIdPhotoBgList", t), await Yt["b"].deleteItems(t)
                            }).catch(() => {})
                        },
                        handleNodeContextmenu(e) {
                            const t = new Xt["a"];
                            t.push({
                                label: "删除",
                                action: "batch-delete",
                                disabled: !1,
                                data: e,
                                callback: this.onDeleteMaterialMineIdPhoto
                            }).show()
                        },
                        async initData() {
                            await r["a"].dispatch("presetSuit/ACT_FindMineIdPhotoBgList", {
                                isShort: !0
                            }), this.importStatusWatchSymbol = Yt["b"].addListener(Yt["a"].importProgress, e => {
                                if (this.isIdPhotoLoading = e.status == ui["IdPhotoUploadStatus"].Begin || e.status == ui["IdPhotoUploadStatus"].Loading, console.log("progress.status=", e.progress, e.data), this.progress = e.progress, e.data) {
                                    let t = new di["a"](e.data),
                                        i = !1;
                                    for (const e of this.mineIdPhoto.bgList)
                                        if (e.localMaterialId == t.localMaterialId) {
                                            i = !0;
                                            break
                                        } i || this.mineIdPhoto.bgList.unshift(t)
                                }
                            })
                        },
                        onCommandLeftMouseClick(e, t) {
                            (t && this.$isMac || !t && this.$isWin) && (e.isSelected = !e.isSelected)
                        },
                        onShiftMouseClick(e) {
                            let t = null,
                                i = r["a"].getters["presetSuit/mineIdPhotoList"],
                                a = -1,
                                n = 0,
                                o = -1;
                            for (const s of i)(s.isSelected || s.path == this.currentPath) && (t || (t = s, a = n)), s.path == e.path && (o = n), n++;
                            if (t) {
                                n = 0;
                                const e = Math.min(a, o),
                                    t = Math.max(a, o);
                                console.log(`onShiftMouseClick minIndex=${e},maxIndex=${t}`);
                                for (const a of i) a.isSelected = n >= e && n <= t, n++
                            }
                        },
                        resetMineSelects() {
                            let e = r["a"].getters["presetSuit/mineIdPhotoList"];
                            for (const t of e) t.isSelected = !1
                        },
                        registerShortKey() {}
                    },
                    mounted() {
                        this.initData()
                    },
                    beforeDestroy() {
                        this._UpdateMineIdPhotoBgIsLoadAll(!1), this.resetMineSelects(), Yt["b"].removeListener(Yt["a"].importProgress, this.importStatusWatchSymbol, !0)
                    }
                },
                bi = vi,
                yi = (i("aeda"), Object(ct["a"])(bi, zt, Wt, !1, null, "cdc16282", null)),
                wi = yi.exports,
                ki = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        staticClass: "suit"
                    }, [t("div", {
                        key: e.data.key,
                        staticClass: "params-adjust-group-button params-adjust-group-item params-adjust-suit-group"
                    }, [t("el-radio-group", {
                        staticClass: "suit-radio-group",
                        staticStyle: {
                            "white-space": "nowrap",
                            "align-self": "center"
                        },
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            change: e.changeChoose
                        },
                        model: {
                            value: e.cacheRadio,
                            callback: function(t) {
                                e.cacheRadio = t
                            },
                            expression: "cacheRadio"
                        }
                    }, e._l(e.data.options, (function(i) {
                        return t("el-radio-button", {
                            key: i.id,
                            style: i.cStyle,
                            attrs: {
                                label: i.id
                            }
                        }, [t("span", {
                            style: i.customBtnTextStyle || {}
                        }, [e._v(e._s(i.label))])])
                    })), 1)], 1), e._l(e.data.options, (function(i, a) {
                        return t("div", {
                            key: a
                        }, [t("SuitParamsItem", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: i.id === e.cacheRadio,
                                expression: "child.id === cacheRadio"
                            }],
                            key: i.id,
                            ref: "suitParamsItemRefs",
                            refInFor: !0,
                            attrs: {
                                data: i
                            },
                            on: {
                                "on-change": (t, a, n) => e.onChange(i, a, n),
                                "on-input": (t, i, a) => e.onInput(i, a),
                                "on-main-change": (t, a, n) => e.onMainChange(i, a, n),
                                "on-focus": function(t) {
                                    return e.$emit("on-focus")
                                },
                                "on-blur": function(t) {
                                    return e.$emit("on-blur")
                                }
                            }
                        })], 1)
                    }))], 2)
                },
                Ci = [],
                xi = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        staticClass: "container"
                    }, [t("SuitParamsGridView", {
                        ref: "SuitParamsGridView",
                        attrs: {
                            items: e.data.children,
                            initSelectPath: e.selectPath
                        },
                        on: {
                            onItemClick: e.onSuitClick
                        }
                    }), t("div", {
                        staticClass: "slider-container"
                    }, [t("div", {
                        staticClass: "slider-title"
                    }, [t("span", {
                        directives: [{
                            name: "gtag-dbl-event",
                            rawName: "v-gtag-dbl-event",
                            value: e.PointDoubleClickTitle,
                            expression: "PointDoubleClickTitle"
                        }],
                        staticClass: "title",
                        on: {
                            dblclick: function(t) {
                                return e.onResetSingle(e.data)
                            }
                        }
                    }, [e._v(" 程度 ")]), t("ts-slider", {
                        directives: [{
                            name: "gtag-dbl-event",
                            rawName: "v-gtag-dbl-event",
                            value: e.PointDoubleClickDot,
                            expression: "PointDoubleClickDot"
                        }],
                        key: e.data.key + "-ts-slider",
                        staticClass: "slider",
                        attrs: {
                            "input-size": "mini",
                            "show-tooltip": !1,
                            "show-input-controls": !1,
                            min: 0,
                            max: 100,
                            step: 1,
                            disabled: !e.selectPath
                        },
                        on: {
                            change: e.onSliderChange,
                            input: e.onSliderInput,
                            ondblclick: e.onResetSingle
                        },
                        nativeOn: {
                            keydown: [function(t) {
                                return t.metaKey ? e.preventDefault.apply(null, arguments) : null
                            }, function(t) {
                                return t.ctrlKey ? e.preventDefault.apply(null, arguments) : null
                            }, function(e) {
                                if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return null;
                                e.stopPropagation()
                            }]
                        },
                        model: {
                            value: e.slideValue,
                            callback: function(t) {
                                e.slideValue = t
                            },
                            expression: "slideValue"
                        }
                    }), t("ts-number-placeholder", {
                        staticClass: "percent",
                        attrs: {
                            min: 0,
                            max: 100,
                            disabled: !e.selectPath
                        },
                        on: {
                            "on-blur": function(t) {
                                return e.$emit("on-blur")
                            },
                            "on-focus": function(t) {
                                return e.$emit("on-focus")
                            },
                            change: e.onSliderChange
                        },
                        model: {
                            value: e.slideValue,
                            callback: function(t) {
                                e.slideValue = t
                            },
                            expression: "slideValue"
                        }
                    })], 1)])], 1)
                },
                Pi = [],
                Si = i("e751"),
                _i = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "ClaPresettingGrid"
                    }, [e._l(e.items || [], (function(i, a) {
                        return [t("div", {
                            key: a,
                            staticClass: "claItemBox",
                            style: {
                                paddingLeft: e.getMarginLeft(a) + "px",
                                paddingRight: e.getMarginRight(a) + "px"
                            },
                            on: {
                                click: function(t) {
                                    return e.onItemClick(i, a)
                                },
                                mousedown: function(t) {
                                    e.mouseDownIndex = a
                                },
                                mouseup: function(t) {
                                    e.mouseDownIndex = -1
                                }
                            }
                        }, [t("div", {
                            staticClass: "item-container",
                            class: {
                                "border-primary-style-hover": e.mouseDownIndex === a,
                                select: e.mouseDownIndex === a
                            }
                        }, [t("img", {
                            staticClass: "claImg",
                            attrs: {
                                src: i.iconPath
                            }
                        }), i.new ? [t("img", {
                            staticClass: "newIcon",
                            attrs: {
                                src: i.new
                            }
                        })] : e._e(), t("div", {
                            staticClass: "claName",
                            class: {
                                background: a >= 1
                            }
                        }, [e._v(" " + e._s(e._f("filterFormatName")(i.name)) + " ")])], 2)])]
                    }))], 2)
                },
                Oi = [],
                Ii = i("36c6"),
                Ti = {
                    name: "SuitParamsGridView",
                    data() {
                        return {
                            mouseDownIndex: 0
                        }
                    },
                    props: {
                        items: Array,
                        itemSize: {
                            type: Object,
                            default: () => ({
                                w: 47.6,
                                h: 47.6
                            })
                        },
                        initSelectPath: String
                    },
                    watch: {
                        initSelectPath: {
                            handler(e) {
                                this.initSelectIndex(e)
                            },
                            immediate: !0
                        },
                        items: {
                            handler(e) {
                                this.initSelectIndex(this.initSelectPath)
                            },
                            immediate: !0
                        }
                    },
                    filters: {
                        filterFormatName(e) {
                            if (e.length >= 10) {
                                let t = e.substr(0, 4),
                                    i = e.substr(e.length - 2, 2);
                                return `${t} ... ${i}`
                            }
                            return e
                        }
                    },
                    methods: {
                        getMarginLeft(e) {
                            return e % 5 === 0 ? 0 : 3
                        },
                        getMarginRight(e) {
                            return e / 4 === 1 ? 0 : 3
                        },
                        reset() {
                            this.mouseDownIndex = 0
                        },
                        initSelectIndex(e) {
                            let t = 0;
                            if (this.mouseDownIndex = 0, this.items && e)
                                for (const i of this.items) {
                                    if (i && i.path && e === i.path) {
                                        this.mouseDownIndex = t;
                                        break
                                    }
                                    t++
                                }
                            console.log("mouseDownIndex : " + this.mouseDownIndex + " initSelectPath : " + this.initSelectPath)
                        },
                        onItemClick: Object(g["debounce"])((async function(e, t) {
                            console.log("makeup onItemClick:}"), this.mouseDownIndex = t, this.$emit("onItemClick", [e])
                        }), 50, {
                            leading: !0
                        }),
                        async iconFullPath(e) {
                            const t = await Object(Ii["a"])("effect/makeupIcons/"),
                                i = await s["a"].join(t, e.iconPath || ""),
                                a = await Zt["a"].isFileExist(i);
                            let n = "";
                            return a ? (n = "file://" + i, n) : (n = e.iconPath, n)
                        }
                    }
                },
                Mi = Ti,
                ji = (i("3e6d"), Object(ct["a"])(Mi, _i, Oi, !1, null, "4e70c4b2", null)),
                Di = ji.exports,
                Ri = Object(l["defineComponent"])({
                    name: "SuitParamsGroup",
                    mixins: [m["a"]],
                    components: {
                        "ts-slider": ht["a"],
                        SuitParamsGridView: Di,
                        TsNumberPlaceholder: Bt
                    },
                    props: {
                        data: {
                            type: Object,
                            default: null
                        }
                    },
                    setup() {
                        const {
                            PointRightMakeupItem: e
                        } = Object(mi["a"])();
                        return {
                            PointRightMakeupItem: e
                        }
                    },
                    data() {
                        return {
                            hasInit: !1,
                            paramsData: {},
                            currentSuit: "",
                            tempValue: 0,
                            slideValue: 0,
                            selectPath: "",
                            slideDisable: !1,
                            currentSuitDefaultValue: 0
                        }
                    },
                    computed: {
                        identify() {
                            return this.data ? this.data.key : ""
                        },
                        identifyPath() {
                            return this.data ? this.data.effectKey : ""
                        },
                        isMainItem() {
                            return !!this.data.isMainItem
                        }
                    },
                    watch: {
                        data: {
                            handler(e) {
                                this.initParamsData()
                            },
                            immediate: !0
                        }
                    },
                    methods: {
                        initParamsData() {
                            this.data && (this.hasInit || (this.slideValue = this.data.value, this.tempValue = this.slideValue, this.selectPath = "", this.hasInit = !0))
                        },
                        init(e) {
                            const {
                                key: t,
                                effectKey: i
                            } = this.data;
                            if (!this.identify || !this.identifyPath) return {
                                [i]: this.selectPath,
                                [t]: this.slideValue
                            };
                            if ("undefined" !== typeof e[this.identify] ? this.slideValue = e[this.identify] : this.slideValue = this.data.value, this.tempValue = this.slideValue, "undefined" !== typeof e[this.identifyPath] ? this.selectPath = e[this.identifyPath] : this.selectPath = "", this.$refs["SuitParamsGridView"]) {
                                const e = this.$refs["SuitParamsGridView"];
                                e.initSelectIndex(this.selectPath)
                            }
                            return {
                                [i]: this.selectPath,
                                [t]: this.slideValue
                            }
                        },
                        isMain() {
                            return this.isMainItem
                        },
                        reset() {
                            let e = {};
                            if (!this.data || !this.identify || !this.identifyPath) return e;
                            if (this.slideValue !== this.currentSuitDefaultValue && (this.slideValue = this.currentSuitDefaultValue, e[this.identify] = this.slideValue), "" !== this.selectPath && (this.selectPath = "", e[this.identifyPath] = ""), this.$refs["SuitParamsGridView"]) {
                                const e = this.$refs["SuitParamsGridView"];
                                e.reset()
                            }
                            return e
                        },
                        onSuitClick(e) {
                            let t = e && e[0];
                            if (!t) return;
                            const i = {},
                                {
                                    key: a,
                                    effectKey: n
                                } = this.data;
                            if (this.selectPath !== t.path) {
                                this.selectPath = t.path, i[n] = t.path, i[a] = t.defaultValue, this.slideValue = t.defaultValue, this.tempValue = this.slideValue;
                                const e = {
                                    [n]: this.selectPath,
                                    [a]: this.slideValue
                                };
                                this.isMainItem ? this.$emit("on-main-change", i, i, "manual") : this.$emit("on-change", e, i, "manual");
                                const o = this.data.key.split("_")[0];
                                if (o) {
                                    let e = Si["k"]["slide_makeup_rod"][o];
                                    this.PointRightMakeupItem(o, e + "_" + t.name)
                                }
                            }
                        },
                        onSliderInput(e) {
                            if (e === this.tempValue) return;
                            this.tempValue = e;
                            const {
                                key: t,
                                effectKey: i
                            } = this.data, a = {
                                [i]: this.selectPath,
                                [t]: this.slideValue
                            };
                            this.$emit("on-input", a, {
                                [t]: e
                            }, "manual")
                        },
                        onSliderChange(e) {
                            this.slideValue = e;
                            const {
                                key: t,
                                effectKey: i
                            } = this.data, a = {
                                [i]: this.selectPath,
                                [t]: this.slideValue
                            };
                            this.$emit("on-change", a, {
                                [t]: e
                            }, "manual")
                        },
                        onResetSingle() {
                            this.onSliderChange(this.currentSuitDefaultValue)
                        }
                    }
                }),
                Ni = Ri,
                Bi = (i("5282"), Object(ct["a"])(Ni, xi, Pi, !1, null, "3a64f0e8", null)),
                Ei = Bi.exports,
                Fi = i("fa7d"),
                Li = l["default"].extend({
                    name: "SuitParamsGroup",
                    components: {
                        "el-radio-group": w["RadioGroup"],
                        "el-radio-button": w["RadioButton"],
                        SuitParamsItem: Ei
                    },
                    props: {
                        data: {
                            type: Object,
                            default: () => {}
                        },
                        initParams: {
                            type: Object,
                            default: () => {}
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])(e.data.value || ""),
                            a = Object(l["ref"])({}),
                            n = Object(l["computed"])(() => Object(Fi["g"])(e.initParams, Object.keys(a.value))),
                            o = Object(l["computed"])(() => !Object(g["isEqual"])(a.value, n.value));
                        Object(l["watch"])(o, e => t("on-modify", e)), Object(l["watch"])(() => e.data, e => {
                            e && !i.value && (i.value = e.value)
                        });
                        const s = Object(l["ref"])([]);

                        function c(e) {
                            if (s.value.length > 0 && Object.keys(e).length > 0) {
                                const t = {};
                                s.value.forEach(i => {
                                    i && Object.assign(t, i.init(e || {}))
                                }), a.value = {
                                    ...t
                                }
                            }
                        }

                        function u(e, i, n) {
                            let o = {
                                ...a.value
                            };
                            Object.assign(o, i), a.value = o;
                            let s = {
                                labName: "",
                                isRest: !1,
                                lab2Name: "",
                                lab3Name: "",
                                optDesc: ""
                            };
                            if ("reset" === n) s.isRest = !0, s.optDesc = "重置", s.labName = e.label;
                            else if (Object.keys(i).length > 1) {
                                s.labName = e.label;
                                let t = i[Object.keys(i)[0]];
                                if (t) {
                                    for (const i of e.children)
                                        if (t === i.path) {
                                            s.optDesc = i.name;
                                            break
                                        }
                                } else s.optDesc = "无"
                            } else {
                                s.labName = e.label + "程度";
                                let t = Object.keys(i);
                                s.optDesc = i[t[0]]
                            }
                            let l = r["a"].getters["refine/personType"],
                                c = _["f"][l];
                            s.sex = c, t("on-change", a.value, i, n, JSON.stringify(s))
                        }

                        function d(e, i) {
                            let n = {
                                ...a.value
                            };
                            Object.assign(n, e), a.value = n, t("on-input", a.value, e, i)
                        }

                        function h(e, t, i) {
                            let a = {
                                ...t
                            };
                            s.value.length > 0 && s.value.forEach(e => {
                                if (e && !e.isMain()) {
                                    const t = e.reset() || {};
                                    Object.assign(a, t)
                                }
                            }), u(e, a, i)
                        }

                        function p(e) {
                            let t = {};
                            s.value.length > 0 && s.value.forEach(i => {
                                if (i) {
                                    const a = i.reset(e) || {};
                                    Object.assign(t, a)
                                }
                            });
                            let i = {
                                label: "妆容调整"
                            };
                            u(i, t, "reset")
                        }
                        const {
                            PointRightMakeupTheme: f
                        } = Object(mi["a"])();

                        function m(e) {
                            let t = e - 1,
                                i = this.data.options && this.data.options[t];
                            if (!i) return;
                            let a = i.key;
                            const n = a.split("_")[0];
                            f(n)
                        }
                        return {
                            suitParamsItemRefs: s,
                            cacheRadio: i,
                            init: c,
                            reset: p,
                            onInput: d,
                            onChange: u,
                            onMainChange: h,
                            changeChoose: m
                        }
                    }
                }),
                Vi = Li,
                Ai = (i("37f6"), Object(ct["a"])(Vi, ki, Ci, !1, null, "f1ae2008", null)),
                Ui = Ai.exports,
                $i = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "custom-collapse-item"
                    }, [t("div", {
                        staticClass: "filter-container"
                    }, [t("div", {
                        staticClass: "more-container"
                    }, [t("span", {
                        on: {
                            click: e.showFilterPanelView
                        }
                    }, [e._v("查看更多")]), t("i", {
                        staticClass: "el-icon-arrow-right"
                    })]), t("div", {
                        staticClass: "filter-list"
                    }, [e._l(e.matchFilterList || [], (function(i, a) {
                        return [t("div", {
                            key: a,
                            staticClass: "claItemBox",
                            style: {
                                marginLeft: e.getMarginLeft(a) + "px",
                                marginRight: e.getMarginRight(a) + "px"
                            },
                            on: {
                                click: function(t) {
                                    return e.onChangePath(i, a)
                                }
                            }
                        }, [t("div", {
                            staticClass: "item-container",
                            class: {
                                "border-primary-style-hover": i.path === e.filterPath,
                                select: i.path === e.filterPath
                            }
                        }, [i.new ? t("i", {
                            staticClass: "ts-icon ts-icon-new"
                        }) : e._e(), t("img", {
                            staticClass: "claImg",
                            attrs: {
                                src: i.iconPath,
                                alt: ""
                            }
                        })]), t("div", {
                            staticClass: "claName",
                            class: {
                                background: a >= 1
                            }
                        }, [e._v(" " + e._s(e.filterFormatName(i.name)) + " ")])])]
                    }))], 2)]), e.filterPath ? t("div", {
                        staticClass: "flex-column-item"
                    }, [t("span", {
                        staticClass: "name",
                        on: {
                            dblclick: e.onResetSingle
                        }
                    }, [e._v("程度")]), t("ts-slider", {
                        staticClass: "slider",
                        attrs: {
                            min: 0,
                            max: 100,
                            disabled: !e.filterPath,
                            "show-tooltip": !1
                        },
                        on: {
                            change: e.onChangeAlpha,
                            input: e.onInputAlpha,
                            ondblclick: e.onResetSingle
                        },
                        model: {
                            value: e.filterAlpha,
                            callback: function(t) {
                                e.filterAlpha = t
                            },
                            expression: "filterAlpha"
                        }
                    }), t("ts-number-placeholder", {
                        staticClass: "percent",
                        attrs: {
                            min: 0,
                            max: 100,
                            disabled: !e.filterAlpha,
                            value: e.filterAlpha
                        },
                        on: {
                            "on-blur": function(t) {
                                return e.$emit("on-blur")
                            },
                            "on-focus": function(t) {
                                return e.$emit("on-focus")
                            },
                            change: e.onLabelChange
                        }
                    })], 1) : e._e(), t("FilterPanelComponent", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.showFilterPanelScene,
                            expression: "showFilterPanelScene"
                        }],
                        ref: "filter-panel-component",
                        attrs: {
                            "current-select-id": e.filterPath,
                            "current-slider-value": e.filterAlpha
                        },
                        on: {
                            "update:currentSliderValue": function(t) {
                                e.filterAlpha = t
                            },
                            "update:current-slider-value": function(t) {
                                e.filterAlpha = t
                            },
                            "on-blur": function(t) {
                                return e.$emit("on-blur")
                            },
                            "on-focus": function(t) {
                                return e.$emit("on-focus")
                            },
                            "on-change-slider": e.onChangeAlpha,
                            "on-input-slider": e.onInputAlpha,
                            "on-change-select": e.onChangePath,
                            "on-close": function(t) {
                                e.showFilterPanelScene = !1
                            }
                        }
                    })], 1)
                },
                Hi = [],
                zi = i("f3f5"),
                Wi = i("74f7");
            const qi = Wi["p"][0];
            class Gi extends zi["a"] {
                constructor(e, t) {
                    const {
                        min: i,
                        max: a,
                        value: n,
                        path: o
                    } = t;
                    super(e, {
                        min: i,
                        max: a,
                        value: n
                    }), this._path = o || ""
                }
                static get key() {
                    return qi.key
                }
                static get pathKey() {
                    return qi.pathKey
                }
                set path(e) {
                    this._path = e
                }
                get path() {
                    return this._path
                }
                getFullPath() {
                    return this.path ? this.path : ""
                }
            }
            var Ki = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "filter-panel-component"
                    }, [t("div", {
                        staticClass: "header",
                        on: {
                            click: e.exitScene
                        }
                    }, [e._m(0)]), t("div", {
                        staticClass: "filter-container global__scroll-style"
                    }, [e._l(e.filterColumnFormat, (function(i, a) {
                        return [t("div", {
                            key: a,
                            staticClass: "filter-column"
                        }, [e._l(i || [], (function(i, a) {
                            return [t("div", {
                                key: a,
                                staticClass: "claItemBox",
                                on: {
                                    click: function(t) {
                                        return e.onChangePath(i, a)
                                    }
                                }
                            }, [t("div", {
                                staticClass: "item-container",
                                class: {
                                    "border-primary-style-hover": i.path === e.filterPath,
                                    select: i.path === e.filterPath
                                }
                            }, [i.new ? t("i", {
                                staticClass: "ts-icon ts-icon-new"
                            }) : e._e(), i.isOriginal ? t("div", {
                                staticClass: "original-img-container"
                            }, [t("img", {
                                staticClass: "original-img",
                                attrs: {
                                    src: e.$getIconPath("filter_icon_no_effect@3x.png")
                                }
                            })]) : t("img", {
                                staticClass: "claImg",
                                attrs: {
                                    src: i.iconPath
                                }
                            })]), t("div", {
                                staticClass: "claName",
                                class: {
                                    background: a >= 1
                                }
                            }, [e._v(e._s(e._f("filterFormatName")(i.name)) + " ")])])]
                        }))], 2), e.activeColumn === a && e.filterPath ? [t("div", {
                            key: "slider_" + a,
                            staticClass: "filter-column-slider"
                        }, [t("span", {
                            staticClass: "name",
                            on: {
                                dblclick: e.onResetSingle
                            }
                        }, [e._v("程度")]), t("ts-slider", {
                            staticClass: "slider",
                            attrs: {
                                min: 0,
                                max: 100,
                                disabled: !e.filterPath,
                                "show-tooltip": !1
                            },
                            on: {
                                input: function(t) {
                                    return e.$emit("on-input-slider", t)
                                },
                                change: e.onChangeAlpha,
                                ondblclick: e.onResetSingle
                            },
                            model: {
                                value: e.filterAlpha,
                                callback: function(t) {
                                    e.filterAlpha = t
                                },
                                expression: "filterAlpha"
                            }
                        }), t("ts-number-placeholder", {
                            staticClass: "percent",
                            attrs: {
                                min: 0,
                                max: 100,
                                disabled: !e.filterPath,
                                value: e.filterAlpha
                            },
                            on: {
                                "on-blur": function(t) {
                                    return e.$emit("on-blur")
                                },
                                "on-focus": function(t) {
                                    return e.$emit("on-focus")
                                },
                                change: e.onChangeAlpha
                            }
                        })], 1)] : e._e()]
                    }))], 2)])
                },
                Ji = [function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "header-title"
                    }, [t("i", {
                        staticClass: "el-icon-arrow-left"
                    }), e._v(" 滤镜 ")])
                }],
                Yi = {
                    name: "FilterPanelComponent",
                    components: {
                        "ts-slider": ht["a"],
                        TsNumberPlaceholder: Bt
                    },
                    props: {
                        currentSelectId: {
                            type: String,
                            default: ""
                        },
                        currentSliderValue: {
                            type: Number,
                            default: 0
                        }
                    },
                    data() {
                        return {
                            row: 3,
                            filterPath: "",
                            filterAlpha: 0
                        }
                    },
                    computed: {
                        filterList() {
                            return this.$store.getters["presetSuit/filterList"]
                        },
                        filterPathCache() {
                            return this.$store.getters["project/filterPathCache"]
                        },
                        filterColumnFormat() {
                            return Object(Fi["f"])(this.filterList, 3)
                        },
                        activeColumn() {
                            let e = 0;
                            return this.filterColumnFormat.forEach((t, i) => {
                                t.some(e => e.path === this.filterPath) && (e = i)
                            }), e
                        }
                    },
                    watch: {
                        currentSelectId(e) {
                            this.filterPath = e
                        },
                        currentSliderValue(e) {
                            this.filterAlpha = e
                        },
                        filterAlpha(e) {
                            this.$emit("update:currentSliderValue", e)
                        }
                    },
                    filters: {
                        filterFormatName(e) {
                            if (e.length >= 10) {
                                let t = e.substr(0, 4),
                                    i = e.substr(e.length - 2, 2);
                                return `${t} ... ${i}`
                            }
                            return e
                        }
                    },
                    methods: {
                        onResetSingle() {
                            const e = this.filterList.find(e => e.path === this.filterPath);
                            this.filterAlpha !== e.value && this.onChangeAlpha(e.value)
                        },
                        onChangeAlpha(e) {
                            this.filterAlpha = e, r["a"].dispatch("project/ACT_SetFiltersSelectCache", {
                                path: this.filterPath,
                                value: this.filterAlpha
                            }), this.$emit("on-change-slider", this.filterAlpha)
                        },
                        exitScene() {
                            this.$emit("on-close")
                        },
                        onChangePath(e, t) {
                            this.filterPath = e.path, this.filterPath || (this.filterAlpha = 0), this.$emit("on-change-select", e, t)
                        }
                    }
                },
                Xi = Yi,
                Zi = (i("bd9d"), Object(ct["a"])(Xi, Ki, Ji, !1, null, "68e5660f", null)),
                Qi = Zi.exports;
            const ea = ai["a"].identify(_["b"].Filter),
                ta = Gi.key;
            var ia = {
                    name: "custom-collapse-item",
                    components: {
                        TsNumberPlaceholder: Bt,
                        "el-collapse-item": w["CollapseItem"],
                        "ts-slider": ht["a"],
                        FilterPanelComponent: Qi
                    },
                    props: {
                        active: Boolean,
                        initParams: Object,
                        data: {
                            type: Object,
                            default: () => {}
                        },
                        type: String,
                        disabled: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = l["default"].extend(m["a"]),
                            a = new i,
                            n = Object(l["ref"])(""),
                            o = Object(l["ref"])(0),
                            s = Object(l["ref"])(0),
                            c = Object(l["ref"])(!1),
                            u = Object(l["computed"])(e => r["a"].getters["project/filterPathCache"]),
                            d = Object(l["computed"])(e => r["a"].getters["presetSuit/filterList"]),
                            h = Object(l["computed"])(e => r["a"].getters["presetSuit/matchFilterList"](n.value)),
                            p = Object(l["computed"])(e => !(Object(g["isEqual"])(n.value, "") && Object(g["isEqual"])(o.value, 0)));

                        function f(e) {
                            return 0
                        }

                        function v(e) {
                            return e / 3 === 1 ? 0 : 7
                        }

                        function b(e) {
                            if (e.length >= 10) {
                                let t = e.substr(0, 4),
                                    i = e.substr(e.length - 2, 2);
                                return `${t} ... ${i}`
                            }
                            return e
                        }
                        Object(l["watch"])(p, e => t("on-modify", e));
                        const y = (e, i, a) => {
                                const l = {
                                    filterPath: n.value,
                                    filterAlpha: o.value
                                };
                                s.value = o.value, t("on-change", l, e, i, a)
                            },
                            w = (e, i) => {
                                const a = {
                                    filterPath: n.value,
                                    filterAlpha: o.value
                                };
                                t("on-input", a, e, i)
                            },
                            k = (e, i) => {
                                if (n.value = e.path, n.value)
                                    if (u.value.hasOwnProperty(n.value)) o.value = u.value[n.value];
                                    else {
                                        const e = d.value.find(e => e.path === n.value);
                                        o.value = e.value
                                    }
                                else o.value = 0;
                                t("on-selection", d.value.find(e => e.path === n.value));
                                let s = {
                                        labName: "",
                                        isRest: !1,
                                        isSwitch: !1,
                                        lab2Name: "",
                                        lab3Name: "",
                                        optDesc: ""
                                    },
                                    l = d.value.find(e => e.path === n.value);
                                s.labName = "滤镜", s.optDesc = l.name, y({
                                    [ea]: n.value,
                                    [ta]: o.value
                                }, "manual", JSON.stringify(s)), a.PointSelectFilter(l)
                            },
                            C = e => {
                                o.value = e, r["a"].dispatch("project/ACT_SetFiltersSelectCache", {
                                    path: n.value,
                                    value: o.value
                                });
                                let t = {
                                    labName: "",
                                    isRest: !1,
                                    isSwitch: !1,
                                    lab2Name: "",
                                    lab3Name: "",
                                    optDesc: ""
                                };
                                t.labName = "滤镜程度", t.optDesc = o.value, y({
                                    [ta]: o.value
                                }, "manual", JSON.stringify(t))
                            },
                            x = () => {
                                s.value !== o.value && w({
                                    [ta]: o.value
                                }, "manual", "on-input")
                            },
                            P = e => {
                                if (Object.hasOwnProperty.call(e, ta)) {
                                    const t = e[ta];
                                    o.value = t, s.value = t
                                }
                                Object.hasOwnProperty.call(e, ea) && (n.value = e[ea])
                            },
                            S = () => {
                                n.value = "", o.value = 0;
                                let e = {
                                    labName: "",
                                    isRest: !1,
                                    isSwitch: !1,
                                    lab2Name: "",
                                    lab3Name: "",
                                    optDesc: ""
                                };
                                e.labName = "滤镜", e.optDesc = "重置", y({
                                    [ea]: n.value,
                                    [ta]: o.value
                                }, "reset", JSON.stringify(e))
                            },
                            _ = e => {
                                e !== o.value && (o.value = e, C(o.value), a.PointManualModifyComplete())
                            },
                            O = () => {
                                const e = d.value.find(e => e.path === n.value);
                                o.value !== e.value && (o.value = e.value, C(o.value))
                            };

                        function I() {
                            c.value = !0
                        }
                        return {
                            filterList: d,
                            filterPath: n,
                            filterAlpha: o,
                            isModify: p,
                            matchFilterList: h,
                            init: P,
                            reset: S,
                            onChangePath: k,
                            onChangeAlpha: C,
                            onInputAlpha: x,
                            onLabelChange: _,
                            onResetSingle: O,
                            getMarginLeft: f,
                            getMarginRight: v,
                            filterFormatName: b,
                            showFilterPanelScene: c,
                            showFilterPanelView: I
                        }
                    }
                },
                aa = ia,
                na = (i("c213"), i("da03b"), Object(ct["a"])(aa, $i, Hi, !1, null, "8c70ce0a", null)),
                oa = na.exports;
            class sa {
                constructor(e) {
                    this.key = e.key, this.value = e.value, this.type = e.cType || "slider", this.name = e.name, "undefined" !== typeof e.cTitle && (this.title = e.cTitle), "undefined" !== typeof e.groupName && (this.groupName = e.groupName), "undefined" !== typeof e.realtime && (this.realtime = e.realtime), "undefined" !== typeof e.collapse && (this.collapse = e.collapse), "undefined" !== typeof e.filter && (this.filter = e.filter), "undefined" !== typeof e.parent && (this.parent = e.parent), "function" === typeof e.formatValue && (this.formatValue = e.formatValue)
                }
                getCommonLabel() {
                    const e = [];
                    return this.parent && ("group" === this.parent.type && this.groupName && e.push(this.groupName), this.parent.collapse && e.push(this.parent.name)), this.title && e.push(this.title), e
                }
                getLabelName(e) {
                    return this.name ? this.name : ""
                }
                getLabelArr(e) {
                    const t = this.getCommonLabel(),
                        i = this.getLabelName(e);
                    return i && t.push(i), t
                }
                getValue(e) {
                    return void 0 === e[this.key] ? this.value : e[this.key]
                }
                getOptDesc(e) {
                    return this.formatValue ? this.formatValue(this.getValue(e)) : this.getValue(e)
                }
                getPersonType() {
                    if (/^\w+_(Male|Female|Child|Older)$/.test(this.key)) {
                        const e = this.key.match(/^\w+_(Male|Female|Child|Older)$/) || [],
                            t = e[1];
                        return _["f"][t]
                    }
                    return -1
                }
                getHistoryExtInfo(e) {
                    const t = {
                            labName: "",
                            lab2Name: "",
                            lab3Name: "",
                            isRest: !1,
                            optDesc: this.getOptDesc(e)
                        },
                        i = this.getLabelArr(e);
                    i.forEach((e, i) => {
                        switch (i) {
                            case 0:
                                t.labName = e;
                                break;
                            case 1:
                                t.lab2Name = e;
                                break;
                            case 2:
                                t.lab3Name = e;
                                break
                        }
                    });
                    const a = this.getPersonType();
                    return -1 !== a && (t.sex = a), t.optDesc = t.optDesc.toString(), JSON.stringify(t)
                }
            }
            class la extends sa {
                getOptDesc(e) {
                    const t = this.getValue(e);
                    return t ? "开启" : "关闭"
                }
            }
            class ra extends sa {
                constructor(e) {
                    super(e), this.options = [], "object" === typeof e.options && (this.options = e.options)
                }
                getOptDesc(e) {
                    const t = this.getValue(e),
                        i = this.options.find(e => e.value === t);
                    if (i) {
                        let e = "";
                        i.parent && (e += i.parent + " - ");
                        let t = i.name || i.label || "";
                        return e += t, e
                    }
                    return ""
                }
            }
            class ca extends sa {
                constructor(e) {
                    super(e), this.keys = [], "undefined" !== typeof e.keys && (this.keys = e.keys)
                }
                getLabelName(e) {
                    let t = "";
                    const i = Object.keys(e),
                        a = e[this.key] || this.value;
                    var n;
                    "ts-slider-group" === this.type ? null !== (n = this.keys) && void 0 !== n && n.every(t => e[t] === a) && 1 !== i.length || (t = this.name) : t = this.name;
                    return t
                }
            }
            class ua extends sa {
                constructor(e) {
                    super(e), this.parentName = e.parentName, this.falseLabel = e.falseLabel, this.trueLabel = e.trueLabel
                }
                getOptDesc(e) {
                    const t = this.getValue(e);
                    return t === this.trueLabel ? "开启" : "关闭"
                }
                getCommonLabel() {
                    const e = [];
                    return this.parentName && e.push(this.parentName), e
                }
            }
            class da {
                constructor(e, t) {
                    this._realtimeMap = new Map, this._slotRealtimeKeys = [], this._componentMap = new Map, this._filterHistoryKeys = [_["c"].BgCleanMode, _["c"].BgCleanMooreMode], this._group = e;
                    const i = da.init(t);
                    this._componentMap = i[0], this._slotRealtimeKeys = i[1], this._realtimeMap = da.getRealtimeMap(this._componentMap), this.initSlotRealtimeKeys(this._slotRealtimeKeys)
                }
                static init(e, t) {
                    const i = new Map,
                        a = [];
                    return e.forEach(e => {
                        if ("slot" !== e.cType)
                            if ("ts-slider-group" === e.cType) {
                                var n;
                                null === (n = e.options) || void 0 === n || n.forEach((a, n) => {
                                    const o = e.keys ? e.keys[n] : "";
                                    if (!o) return void console.warn("[ts-slider-group] option need keys");
                                    const s = {
                                            ...e,
                                            ...a,
                                            key: o,
                                            parent: t
                                        },
                                        l = new ca(s);
                                    i.set(o, l)
                                })
                            } else {
                                let n;
                                const o = {
                                    ...e,
                                    parent: t
                                };
                                if (n = "switch" === e.cType ? new la(o) : "select" === e.cType ? new ra(o) : "checkbox" === e.cType ? new ua(o) : new sa(o), i.set(e.key, n), "group" === e.cType && e.children && e.children.length > 0 && e.children.forEach(e => {
                                        if (e.data && e.data.length > 0) {
                                            const t = e.data.map(t => ({
                                                    ...t,
                                                    groupName: e.label
                                                })),
                                                [o, s] = da.init(t, n);
                                            a.push(...s);
                                            for (const [e, a] of o) i.set(e, a)
                                        }
                                    }), e.collapse && e.children && e.children.length > 0) {
                                    const [t, o] = da.init(e.children, n);
                                    a.push(...o);
                                    for (const [e, a] of t) i.set(e, a)
                                }
                            }
                        else e.realtime && e.realtimeKeys && e.realtimeKeys.length > 0 && a.push(...e.realtimeKeys)
                    }), [i, a]
                }
                static getRealtimeMap(e) {
                    const t = new Map;
                    for (const [i, a] of e) a.realtime && t.set(i, a.realtime);
                    return t
                }
                get realtimeMap() {
                    return this._realtimeMap
                }
                initSlotRealtimeKeys(e) {
                    e.forEach(e => {
                        this._realtimeMap.set(e.key, e.realtime)
                    })
                }
                createHistoryRecord(e) {
                    const t = Object.keys(e),
                        i = t.length;
                    if (i <= 0) return "";
                    if (i <= 2) {
                        const i = t[0];
                        if (this._filterHistoryKeys.includes(i)) return "";
                        if (this._componentMap.has(i)) {
                            const t = this._componentMap.get(i);
                            return (null === t || void 0 === t ? void 0 : t.getHistoryExtInfo(e)) || ""
                        }
                    }
                    return ""
                }
                createResetHistoryRecord(e) {
                    const t = {
                        labName: this._group.name,
                        isRest: !0,
                        lab2Name: "",
                        lab3Name: "",
                        optDesc: "重置"
                    };
                    let i = this._group.component,
                        a = Ee;
                    for (const n of a) n.key === i && (t.sex = _["f"][e]);
                    return JSON.stringify(t)
                }
                static isValidRealtime(e, t) {
                    return console.debug("isValidRealtime: ", e), e === F["h"].EnableByGpu ? t : ("boolean" === typeof e || e === F["h"].AlwaysEnable) && !!e
                }
                isRealtime(e, t) {
                    if (1 === e.length) {
                        const i = e[0];
                        if (this._realtimeMap.has(i)) {
                            const e = this._realtimeMap.get(i);
                            if (e) return da.isValidRealtime(e, t)
                        }
                    } else if (2 === e.length) {
                        const [i, a] = e;
                        if (this._realtimeMap.has(i) && this._realtimeMap.has(a)) {
                            const e = this._realtimeMap.get(i),
                                n = this._realtimeMap.get(a);
                            if (e && n) return da.isValidRealtime(e, t) && da.isValidRealtime(n, t)
                        }
                    }
                    return !1
                }
            }
            var ha = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", [t("div", {
                        ref: "skyChoose",
                        staticClass: "sky-button-component"
                    }, [t("el-button", {
                        ref: "skyButton",
                        staticClass: "sky-show-select-button",
                        style: {
                            background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(${e.imgUrl})`,
                            backgroundSize: "cover"
                        },
                        attrs: {
                            disabled: !e.haveSky
                        },
                        on: {
                            click: e.skyButtonClick
                        },
                        nativeOn: {
                            mousedown: function(t) {
                                return e.onMousedown.apply(null, arguments)
                            }
                        }
                    }, [e._v(" " + e._s(e.haveSky ? e.skyName : "未检测到天空") + " "), t("i", {
                        staticClass: "el-icon-arrow-right sky-button-icon",
                        style: {
                            transform: "rotate(" + e.skyIconRotate + "deg)"
                        }
                    })])], 1), t("SkyReplacePanel", {
                        ref: "'skyPanel",
                        style: {
                            zIndex: 1001,
                            top: e.panelTopPosition + "px",
                            right: e.panelRightPosition + "px"
                        },
                        attrs: {
                            visible: e.showSkySelect,
                            currentPath: e.skyPath
                        },
                        on: {
                            "update:visible": function(t) {
                                e.showSkySelect = t
                            },
                            "on-blur": function(t) {
                                return e.$emit("on-blur")
                            },
                            "on-focus": function(t) {
                                return e.$emit("on-focus")
                            },
                            "on-change-choose": e.changeChooseItem,
                            "on-change": (t, i, a, n) => e.$emit("on-change", t, i, a, n),
                            "on-init-button": e.initButton
                        }
                    })], 1)
                },
                pa = [],
                fa = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.show,
                            expression: "show"
                        }, {
                            name: "mousedownoutside",
                            rawName: "v-mousedownoutside",
                            value: e.clickoutsidePanel,
                            expression: "clickoutsidePanel"
                        }],
                        staticClass: "sky-panel-component",
                        on: {
                            mouseenter: function(t) {
                                return e.stopMousePropagation(!0)
                            },
                            mouseleave: function(t) {
                                return e.stopMousePropagation(!1)
                            }
                        }
                    }, [t("div", {
                        staticClass: "sky-div"
                    }, [t("el-select", {
                        staticClass: "sky-select",
                        attrs: {
                            size: "mini",
                            placeholder: "所有天空",
                            "popper-class": "sky-select-option",
                            "popper-append-to-body": !0
                        },
                        on: {
                            "visible-change": function(t) {
                                e.foucuSelect = t, e.stopMousePropagation(t)
                            },
                            change: e.skySelectChange
                        },
                        model: {
                            value: e.cacheType,
                            callback: function(t) {
                                e.cacheType = t
                            },
                            expression: "cacheType"
                        }
                    }, e._l(e.skyAllType, (function(e) {
                        return t("el-option", {
                            key: e.value,
                            staticClass: "sky-select-item",
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
                    })])], 1), t("div", {
                        staticClass: "sky-container global__scroll-style",
                        on: {
                            mouseenter: function(t) {
                                return e.stopMousePropagation(!0)
                            },
                            mouseleave: function(t) {
                                return e.stopMousePropagation(!1)
                            }
                        }
                    }, [e._l(e.skyColumnFormat, (function(i, a) {
                        return [t("div", {
                            key: a,
                            staticClass: "sky-column"
                        }, [e._l(i || [], (function(i, a) {
                            return [t("div", {
                                key: a,
                                staticClass: "claItemBox",
                                on: {
                                    click: function(t) {
                                        return e.onChangePath(i, a)
                                    }
                                }
                            }, [t("div", {
                                staticClass: "item-container",
                                class: {
                                    "border-primary-style-hover": i.path === e.skyPath,
                                    select: i.path === e.skyPath
                                }
                            }, [i.new ? t("i", {
                                staticClass: "ts-icon ts-icon-new"
                            }) : t("img", {
                                staticClass: "claImg",
                                attrs: {
                                    src: i.iconPath
                                }
                            })])])]
                        }))], 2)]
                    }))], 2)])
                },
                ma = [],
                ga = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        ref: "selectContent"
                    }, [t("el-input", {
                        staticClass: "ts-select-input",
                        attrs: {
                            disabled: e.disabled,
                            "suffix-icon": "el-icon-arrow-down",
                            readonly: ""
                        },
                        on: {
                            focus: function(t) {
                                return t.target !== t.currentTarget ? null : e.onInputFocus.apply(null, arguments)
                            }
                        },
                        model: {
                            value: e.inputValue,
                            callback: function(t) {
                                e.inputValue = t
                            },
                            expression: "inputValue"
                        }
                    }), t("transition", {
                        attrs: {
                            name: "el-fade-in-linear"
                        }
                    }, [t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.showSelectDropdown,
                            expression: "showSelectDropdown"
                        }],
                        ref: "dropdownRef",
                        staticClass: "ts-select-dropdown",
                        style: {
                            ...e.dropdownPosition
                        }
                    }, [t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.showUpArrow,
                            expression: "showUpArrow"
                        }],
                        staticClass: "arrow",
                        on: {
                            mouseenter: function(t) {
                                return t.stopPropagation(), e.onUp.apply(null, arguments)
                            },
                            mouseleave: function(t) {
                                return t.stopPropagation(), e.removeTimer.apply(null, arguments)
                            }
                        }
                    }, [t("i", {
                        staticClass: "el-icon-arrow-up arrow-icon"
                    })]), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.showUpArrow,
                            expression: "!showUpArrow"
                        }],
                        staticClass: "placeholder"
                    }), t("div", {
                        ref: "viewContent",
                        staticClass: "content",
                        class: {
                            scroll: e.isScroll
                        },
                        style: {
                            height: e.height ? e.height + "px" : "auto"
                        }
                    }, [t("ul", {
                        ref: "dropdownContainer",
                        staticClass: "ts-select-dropdown-container",
                        style: {
                            transform: `translateY(-${e.translateY}px)`
                        },
                        on: {
                            click: function(e) {
                                e.stopPropagation()
                            },
                            wheel: function(t) {
                                return t.stopPropagation(), t.preventDefault(), e.onContentWheel.apply(null, arguments)
                            }
                        }
                    }, [e._t("default")], 2)]), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.showDownArrow,
                            expression: "showDownArrow"
                        }],
                        staticClass: "arrow",
                        on: {
                            mouseenter: function(t) {
                                return t.stopPropagation(), e.onDown.apply(null, arguments)
                            },
                            mouseleave: function(t) {
                                return t.stopPropagation(), e.removeTimer.apply(null, arguments)
                            }
                        }
                    }, [t("i", {
                        staticClass: "el-icon-arrow-down arrow-icon"
                    })]), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.showDownArrow,
                            expression: "!showDownArrow"
                        }],
                        staticClass: "placeholder"
                    })])])], 1)
                },
                va = [],
                ba = {
                    name: "ts-select",
                    props: {
                        value: {},
                        disabled: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        emit: t,
                        slots: i
                    }) {
                        Object(l["getCurrentInstance"])().proxy;
                        const a = Object(l["ref"])([]),
                            n = Object(l["ref"])(0),
                            o = {
                                UP: 0,
                                DOWN: 1
                            },
                            s = e => {
                                p.value = o.UP, u(H.value), q("getMaxHeight", r.value), w()
                            },
                            r = Object(l["ref"])(0),
                            c = e => {
                                p.value = o.DOWN, u($.value), w()
                            },
                            u = e => {
                                let t = 0;
                                const i = e < E.value * B;
                                if (i) {
                                    const i = E.value * B - e,
                                        a = Math.ceil(i / B);
                                    t = (n.value - a) * B
                                } else t = n.value * B;
                                return r.value = t, t
                            },
                            d = Object(l["ref"])(0),
                            h = Object(l["ref"])(null),
                            p = Object(l["ref"])(0),
                            f = Object(l["computed"])(() => 0 === d.value),
                            m = Object(l["ref"])(200),
                            g = Object(l["ref"])(0),
                            v = 14,
                            b = Object(l["ref"])(0);
                        Object(l["watch"])(b, e => {
                            e === E.value * B && (A.value = !1), z.value && e && e !== E.value * B && (U.value = !0, A.value = !0)
                        });
                        const y = () => {
                                if (F.value < r.value) F.value += v;
                                else {
                                    F.value === n.value * B && (A.value = !1, U.value = !1);
                                    const e = r.value !== n.value * B,
                                        t = Math.ceil(r.value / B);
                                    e && (V.value = !0, z.value = !0, p.value === o.DOWN ? b.value += v : b.value -= v, b.value <= 0 && (b.value = 0), b.value >= (n.value - t) * B && (b.value = (n.value - t) * B), C.value.scrollTo({
                                        top: b.value,
                                        left: 0
                                    }))
                                }
                            },
                            w = () => {
                                k(), h.value = setInterval(y, 50)
                            },
                            k = () => {
                                h.value && clearInterval(h.value)
                            },
                            C = Object(l["ref"])(),
                            x = Object(l["ref"])(),
                            P = Object(l["ref"])(),
                            S = Object(l["computed"])(() => a.value && a.value.findIndex(e => null === e || void 0 === e ? void 0 : e.isActive));
                        Object(l["watch"])(() => e.value, e => {
                            ee(e, "init")
                        });
                        const _ = Object(l["ref"])();
                        Object(l["onMounted"])(() => {
                            Object(l["nextTick"])(() => {
                                ee(e.value, "init")
                            })
                        });
                        const O = Object(l["ref"])(!1),
                            I = () => {
                                j()
                            },
                            T = Object(l["ref"])(!1),
                            M = e => {
                                T.value = !0, O.value = !0, W(e), X()
                            },
                            j = () => {
                                O.value = !O.value
                            },
                            D = Object(l["reactive"])({}),
                            R = Object(l["ref"])(),
                            N = 24,
                            B = 28,
                            E = Object(l["ref"])(0),
                            F = Object(l["ref"])(),
                            L = Object(l["ref"])(),
                            V = Object(l["ref"])(!1),
                            A = Object(l["ref"])(!1),
                            U = Object(l["ref"])(!1),
                            $ = Object(l["ref"])(0),
                            H = Object(l["ref"])(0),
                            z = Object(l["ref"])(!1),
                            W = e => {
                                let t = "",
                                    i = 0;
                                G();
                                const a = window.innerHeight,
                                    o = e.target.getBoundingClientRect().y,
                                    s = e.target.getBoundingClientRect().height,
                                    r = a - o - s,
                                    c = N + (n.value - S.value - 1) * B;
                                D.bottom = r - c + "px";
                                const u = c - r > 0,
                                    d = S.value * B + N > o;
                                u && (i = Math.ceil(Math.abs(r - c) / B), t = (n.value - i) * B, A.value = !0);
                                const h = i * B;
                                if (D.top = "", D.bottom = r - c + h - 1 + "px", d) {
                                    const e = Math.floor(o - N - S.value * B),
                                        a = Math.ceil(Math.abs(e) / B);
                                    if (U.value = !0, u) i += a, t = (n.value - i) * B, V.value = !0, A.value = !0, z.value = !0;
                                    else {
                                        D.bottom = "", i = Math.ceil(Math.abs(e) / B), t = (n.value - i) * B || B;
                                        const a = i * B;
                                        D.top = e + a + "px"
                                    }
                                    Object(l["nextTick"])(() => {
                                        b.value = a * B, C.value.scrollTo({
                                            top: b.value,
                                            left: 0
                                        })
                                    })
                                }
                                F.value = t, E.value = i, H.value = r - (n.value - S.value) * B - N, $.value = o - S.value * B - N
                            },
                            q = (e, t) => {
                                console.log("lmy::" + e, t)
                            },
                            G = () => {
                                V.value = !0, Object(l["nextTick"])(() => {
                                    C.value.scrollTo({
                                        top: 0,
                                        left: 0
                                    })
                                }), U.value = !1, A.value = !1, V.value = !1, z.value = !1, b.value = 0
                            },
                            K = Object(l["ref"])(),
                            J = () => {
                                Z(), O.value = !1
                            },
                            Y = e => {
                                if (K.value.contains(e.target)) return !1;
                                O.value && J()
                            },
                            X = () => {
                                window.addEventListener("click", Y)
                            },
                            Z = () => {
                                window.removeEventListener("click", Y)
                            };
                        Object(l["onUnmounted"])(() => {
                            Z(), a.value.length = 0
                        });
                        const Q = e => {
                                let t;
                                const i = Math.ceil(r.value / B);
                                if (e.deltaY > 0) {
                                    if (A.value)
                                        if (U.value) b.value += e.deltaY, b.value <= 0 && (b.value = 0), b.value >= (n.value - i) * B && (b.value = (n.value - i) * B), C.value.scrollTo({
                                            top: b.value,
                                            left: 0
                                        });
                                        else {
                                            if (t = u($.value), z.value) return;
                                            F.value += e.deltaY
                                        }
                                } else if (U.value)
                                    if (A.value) b.value += e.deltaY, b.value <= 0 && (b.value = 0), b.value >= (n.value - i) * B && (b.value = (n.value - i) * B), C.value.scrollTo({
                                        top: b.value,
                                        left: 0
                                    });
                                    else {
                                        if (t = u(H.value), z.value) return;
                                        F.value -= e.deltaY
                                    } if (F.value >= t) {
                                    F.value = t;
                                    const a = r.value !== n.value * B;
                                    a ? (V.value = !0, z.value = !0, b.value += Math.abs(e.deltaY), b.value <= 0 && (b.value = 0), b.value >= (n.value - i) * B && (b.value = (n.value - i) * B), C.value.scrollTo({
                                        top: b.value,
                                        left: 0
                                    })) : (A.value = !1, U.value = !1)
                                }
                            },
                            ee = (e, i = "change") => e === P.value ? J() : (P.value = e, a.value.forEach(t => {
                                t.isActive = (null === t || void 0 === t ? void 0 : t.value) === e, t.isActive && (_.value = null === t || void 0 === t ? void 0 : t.label)
                            }), "change" === i && (t("input", e), t("change", e)), e);
                        return Object(l["provide"])("options", a), Object(l["provide"])("optionsCount", n), Object(l["provide"])("changeCurOption", ee), {
                            onUp: s,
                            onDown: c,
                            removeTimer: k,
                            viewContent: C,
                            viewContentHeight: m,
                            dropdownContainerBottom: g,
                            dropdownContainer: x,
                            isReachTop: f,
                            curValue: P,
                            showSelectDropdown: O,
                            onSwitchSelectDrop: j,
                            onInputFocus: M,
                            onInputBlur: I,
                            inputValue: _,
                            dropdownPosition: D,
                            dropdownRef: R,
                            translateY: d,
                            height: F,
                            viewHeight: L,
                            isScroll: V,
                            showUpArrow: U,
                            showDownArrow: A,
                            selectContent: K,
                            closeDropdown: J,
                            onContentWheel: Q,
                            options: a,
                            optionsCount: n,
                            changeCurOption: ee
                        }
                    }
                },
                ya = ba,
                wa = (i("393a9"), Object(ct["a"])(ya, ga, va, !1, null, "ea847d9a", null)),
                ka = wa.exports,
                Ca = function() {
                    var e = this,
                        t = e._self._c;
                    return t("li", {
                        staticClass: "ts-select-dropdown-container-item el-select-dropdown__item",
                        class: {
                            active: e.isActive,
                            "is-disabled": e.disabled,
                            line: e.line
                        },
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.onSelect.apply(null, arguments)
                            }
                        }
                    }, [e._v(" " + e._s(e.label) + " ")])
                },
                xa = [],
                Pa = {
                    name: "ts-select-option",
                    props: {
                        label: {
                            type: String,
                            default: ""
                        },
                        value: {},
                        disabled: {
                            type: Boolean,
                            default: !1
                        },
                        line: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        parent: t
                    }) {
                        const i = Object(l["getCurrentInstance"])().proxy,
                            a = Object(l["ref"])(!1),
                            n = Object(l["inject"])("options");
                        let o = Object(l["inject"])("optionsCount"),
                            s = Object(l["inject"])("changeCurOption");
                        n.value.push(i), o.value += 1;
                        const r = () => {
                            e.disabled || s && s(e.value)
                        };
                        return {
                            isActive: a,
                            onSelect: r
                        }
                    }
                },
                Sa = Pa,
                _a = (i("8836"), Object(ct["a"])(Sa, Ca, xa, !1, null, "ceef450a", null)),
                Oa = _a.exports;

            function Ia() {
                const e = () => {
                        (new et["c"]).process([et["b"].KeyBoard], !1)
                    },
                    t = () => {
                        (new et["c"]).process([et["b"].KeyBoard], !0)
                    },
                    i = () => {
                        (new et["c"]).process([et["b"].KeyBoard, et["b"].Mouse], !1)
                    },
                    a = () => {
                        (new et["c"]).process([et["b"].KeyBoard, et["b"].Mouse], !1)
                    },
                    n = (e = !0) => {
                        console.debug("stopMousePropagation: ", e), (new et["c"]).process([et["b"].Mouse], !e)
                    };
                return {
                    onInputFocus: e,
                    onInputBlur: t,
                    onDialogFocus: i,
                    onDialogBlur: a,
                    stopMousePropagation: n
                }
            }
            const Ta = l["default"].prototype.$isServer,
                Ma = (Ta || Number(document.documentMode), function() {
                    return !Ta && document.addEventListener ? function(e, t, i) {
                        e && t && i && e.addEventListener(t, i, !1)
                    } : function(e, t, i) {
                        e && t && i && e.attachEvent("on" + t, i)
                    }
                }());
            (function() {
                !Ta && document.removeEventListener
            })();
            const ja = [],
                Da = "@@mousedownoutsideContext";
            let Ra = 0;

            function Na(e, t, i) {
                return function(a = {}, n = {}) {
                    !(i && i.context && a.target && n.target) || e.contains(a.target) || e.contains(n.target) || e === a.target || i.context.popperElm && (i.context.popperElm.contains(a.target) || i.context.popperElm.contains(n.target)) || (t.expression && e[Da].methodName && i.context[e[Da].methodName] ? i.context[e[Da].methodName]() : e[Da].bindingFn && e[Da].bindingFn())
                }
            }!l["default"].prototype.$isServer && Ma(document, "mousedown", e => {
                ja.forEach(t => t[Da].documentHandler(e, e))
            });
            var Ba = {
                bind(e, t, i) {
                    ja.push(e);
                    const a = Ra++;
                    e[Da] = {
                        id: a,
                        documentHandler: Na(e, t, i),
                        methodName: t.expression,
                        bindingFn: t.value
                    }
                },
                update(e, t, i) {
                    e[Da].documentHandler = Na(e, t, i), e[Da].methodName = t.expression, e[Da].bindingFn = t.value
                },
                unbind(e) {
                    let t = ja.length;
                    for (let i = 0; i < t; i++)
                        if (ja[i][Da].id === e[Da].id) {
                            ja.splice(i, 1);
                            break
                        } delete e[Da]
                }
            };
            const Ea = ai["a"].identify(_["b"].Sky),
                Fa = Object(l["computed"])(() => r["a"].getters["refine/lastBeautifyParams"]);
            var La = Object(l["defineComponent"])({
                    name: "SkyReplacePanel",
                    components: {
                        TsSelectOption: Oa,
                        TsSelect: ka,
                        TsNumberPlaceholder: Bt,
                        "el-select": w["Select"],
                        "el-option": w["Option"]
                    },
                    props: {
                        currentPath: {
                            type: String,
                            default: ""
                        },
                        visible: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    directives: {
                        mousedownoutside: Ba
                    },
                    setup() {
                        const {
                            stopMousePropagation: e
                        } = Ia();
                        return {
                            stopMousePropagation: e
                        }
                    },
                    data() {
                        return {
                            skyPath: "",
                            show: this.visible,
                            foucuSelect: !1,
                            cacheType: "所有天空",
                            imgUrl: i("c2f2")
                        }
                    },
                    computed: {
                        skyList() {
                            return this.$store.getters["presetSuit/skyList"]
                        },
                        skyPathCache() {
                            return this.$store.getters["project/skyPathCache"]
                        },
                        skyColumnFormat() {
                            let e = [];
                            return "所有天空" == this.cacheType ? e = this.skyList : this.cacheType && this.skyList.forEach(t => {
                                t.type != this.cacheType && "无" != t.name || e.push(t)
                            }), Object(Fi["f"])(e, 3)
                        },
                        skyAllType() {
                            let e = [],
                                t = {
                                    value: "所有天空",
                                    label: "所有天空"
                                };
                            return e.push(t), this.skyList.forEach(t => {
                                t.type && (e.some(e => e.label === t.type) || e.push({
                                    value: t.type,
                                    label: t.type
                                }))
                            }), e
                        }
                    },
                    watch: {
                        currentPath(e, t) {
                            let i = "",
                                a = "";
                            this.skyList.forEach(t => {
                                t.path == e && (i = t.bgIcon, a = t.name)
                            }), this.$emit("on-init-button", i, a), this.skyPath = e
                        },
                        skyPath(e) {
                            let t = "" != e;
                            this.$emit("on-modify", t)
                        },
                        visible(e) {
                            this.show = e
                        },
                        show(e) {
                            this.$emit("update:visible", e)
                        }
                    },
                    filters: {
                        filterFormatName(e) {
                            if (e.length >= 10) {
                                let t = e.substr(0, 4),
                                    i = e.substr(e.length - 2, 2);
                                return `${t} ... ${i}`
                            }
                            return e
                        }
                    },
                    methods: {
                        clickoutsidePanel() {
                            this.foucuSelect || this.show && (console.log("clickoutsidePanel"), this.show = !1)
                        },
                        onResetSingle() {
                            const e = this.skyList.find(e => e.path === this.skyPath);
                            this.filterAlpha !== e.value && this.onChangeAlpha(e.value)
                        },
                        onChangePath(e, t) {
                            this.skyPath = e.path, this.$emit("on-change-choose", e)
                        },
                        skySelectChange(e) {
                            this.cacheType = e
                        },
                        reset() {
                            this.skyPath = "", this.imgUrl = i("c2f2");
                            let e = {
                                labName: "",
                                isRest: !1,
                                isSwitch: !1,
                                lab2Name: "",
                                lab3Name: "",
                                optDesc: ""
                            };
                            e.labName = "换天空", e.optDesc = "重置";
                            const t = {
                                [Ea]: this.skyPath
                            };
                            let a = {
                                [Ea]: this.skyPath
                            };
                            this.$emit("on-change", t, a, "manual", JSON.stringify(e))
                        },
                        init(e) {
                            Fa.value;
                            if (Object.hasOwnProperty.call(e, Ea)) {
                                const t = e[Ea];
                                this.skyPath = t
                            } else this.skyPath = "", this.$emit("on-modify", !1)
                        }
                    }
                }),
                Va = La,
                Aa = (i("575c"), Object(ct["a"])(Va, fa, ma, !1, null, "20f2580e", null)),
                Ua = Aa.exports;
            const $a = ai["a"].identify(_["b"].Sky);
            var Ha = Object(l["defineComponent"])({
                    name: "id-photo-sky",
                    components: {
                        SkyReplacePanel: Ua,
                        TsNumberPlaceholder: Bt,
                        "el-button": w["Button"]
                    },
                    props: {
                        haveSky: {
                            type: Boolean,
                            value: !1
                        }
                    },
                    setup() {
                        const {
                            PointSkyChoose: e
                        } = Object(mi["a"])();
                        return {
                            PointSkyChoose: e
                        }
                    },
                    mounted() {
                        window.addEventListener("scroll", this.handleScroll, !0), window.addEventListener("resize", this.handleResize, !0)
                    },
                    beforeDestroy() {
                        window.removeEventListener("scroll", this.handleScroll, !0), window.removeEventListener("resize", this.handleResize, !0)
                    },
                    data() {
                        return {
                            skyPath: "",
                            showSkySelect: !1,
                            imgUrl: i("c2f2"),
                            panelTopPosition: 0,
                            panelRightPosition: 0,
                            isAutoClose: !1,
                            inPanel: !1,
                            skyName: "天空选择",
                            skyIconRotate: 0
                        }
                    },
                    watch: {
                        skyPath(e) {
                            let t = "" != e;
                            this.$emit("on-modify", t), t || (this.showSkySelect = !1)
                        },
                        showSkySelect(e) {
                            this.skyIconRotate = 0, e && (this.skyIconRotate = 90)
                        }
                    },
                    filters: {
                        filterFormatName(e) {
                            if (e.length >= 10) {
                                let t = e.substr(0, 4),
                                    i = e.substr(e.length - 2, 2);
                                return `${t} ... ${i}`
                            }
                            return e
                        }
                    },
                    methods: {
                        handlePanelPosition() {
                            if (this.showSkySelect) {
                                let e = 8,
                                    t = 15,
                                    i = 440,
                                    a = this.$refs.skyChoose.getBoundingClientRect().top,
                                    n = document.documentElement.clientHeight - this.$refs.skyChoose.getBoundingClientRect().bottom,
                                    o = this.$refs.skyChoose.getBoundingClientRect().height,
                                    s = window.innerHeight - i;
                                this.panelRightPosition = 60, n >= i ? (this.panelTopPosition = a + o + e, this.panelTopPosition = this.panelTopPosition < 0 ? 0 : this.panelTopPosition) : this.$refs.skyChoose.getBoundingClientRect().top > i ? (this.panelTopPosition = a - i - e, this.panelTopPosition = this.panelTopPosition > s ? s : this.panelTopPosition) : (this.panelRightPosition = 345, this.panelTopPosition = window.innerHeight - i - t)
                            }
                        },
                        handleScroll() {
                            this.handlePanelPosition()
                        },
                        handleResize() {
                            this.handlePanelPosition()
                        },
                        reset() {
                            this.skyPath = "", this.skyName = "", this.imgUrl = i("c2f2");
                            let e = {
                                labName: "",
                                isRest: !1,
                                isSwitch: !1,
                                lab2Name: "",
                                lab3Name: "",
                                optDesc: ""
                            };
                            e.labName = "换天空", e.optDesc = "重置";
                            const t = {
                                [$a]: this.skyPath
                            };
                            let a = {
                                [$a]: this.skyPath
                            };
                            this.$emit("on-change", t, a, "manual", JSON.stringify(e))
                        },
                        init(e) {
                            Object.hasOwnProperty.call(e, $a) && (this.skyPath = e[$a], "" != this.skyPath) || (this.showSkySelect = !1, this.skyPath = "", this.imgUrl = i("c2f2"), this.$emit("on-modify", !1))
                        },
                        onMousedown() {
                            this.showSkySelect && (this.isAutoClose = !0)
                        },
                        skyButtonClick() {
                            this.isAutoClose ? this.isAutoClose = !1 : (this.showSkySelect = !this.showSkySelect, this.showSkySelect && this.handlePanelPosition())
                        },
                        changeChooseItem(e) {
                            this.chooseTitle = e.name, this.skyPath = e.path;
                            let t = {
                                labName: "",
                                isRest: !1,
                                isSwitch: !1,
                                lab2Name: "",
                                lab3Name: "",
                                optDesc: ""
                            };
                            t.labName = "换天空", t.optDesc = e.name, this.skyName = e.name ? e.name : "天空选择";
                            const i = {
                                [$a]: this.skyPath
                            };
                            let a = {
                                [$a]: this.skyPath
                            };
                            this.$emit("on-change", i, a, "manual", JSON.stringify(t)), this.PointSkyChoose(e.name)
                        },
                        initButton(e, t) {
                            this.skyName = t || "天空选择", "" == e ? this.imgUrl = i("c2f2") : (this.imgUrl = i("67f7")("./" + e), this.handlePanelPosition())
                        }
                    }
                }),
                za = Ha,
                Wa = (i("1f8a"), Object(ct["a"])(za, ha, pa, !1, null, "843b8c8c", null)),
                qa = Wa.exports,
                Ga = {
                    name: "custom-collapse-item",
                    components: {
                        "el-tooltip": w["Tooltip"],
                        "el-collapse-item": w["CollapseItem"],
                        ComponentCollection: Ht,
                        IdPhoto: wi,
                        FilterComponent: oa,
                        SuitParamsGroup: Ui,
                        IdPhotoSky: qa
                    },
                    props: {
                        showSliderInput: {
                            type: Boolean,
                            default: !1
                        },
                        showLabelPercent: {
                            type: Boolean,
                            default: !1
                        },
                        active: Boolean,
                        initParams: Object,
                        data: {
                            type: Object,
                            default: () => {}
                        },
                        type: String,
                        disabled: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["computed"])(() => r["a"].getters["refine/personType"]),
                            a = Object(l["computed"])(() => r["a"].getters["refine/extendInfo"]),
                            n = Object(l["computed"])(() => r["a"].getters["refine/imageType"]),
                            o = Object(l["computed"])(() => r["a"].getters["refine/baseValue"]),
                            s = Object(l["computed"])(() => r["a"].getters["refine/bgCleanModeDefault"]),
                            c = Object(l["computed"])(() => r["a"].getters["refine/bgCleanMooreModeDefault"]),
                            u = Object(l["computed"])(() => r["a"].getters["refine/enableRealtime"]),
                            d = Object(l["computed"])(() => r["a"].getters["refine/symmetryStatusJson"]),
                            h = Object(l["computed"])(() => r["a"].getters["refine/skyExtendInfo"]),
                            p = Object(l["computed"])(() => {
                                let t = [];
                                switch (e.type) {
                                    case "filter":
                                        t = [{
                                            cType: "slot",
                                            slotName: "filter",
                                            realtime: !0,
                                            realtimeKeys: [{
                                                key: Gi.key,
                                                realtime: F["h"].AlwaysEnable
                                            }]
                                        }];
                                        break;
                                    case "replace":
                                        t = [{
                                            cType: "slot",
                                            slotName: "idPhoto",
                                            line: !0
                                        }];
                                        break;
                                    case "removeDefects":
                                    case "skin":
                                    case "teeth":
                                    case "eye":
                                    case "makeup":
                                        t = Ke(e.type, {
                                            personType: i.value
                                        });
                                        break;
                                    case "facialRefine":
                                        t = Ke(e.type, {
                                            personType: i.value,
                                            symmetryStatusJson: d.value
                                        });
                                        break;
                                    case "body":
                                        t = Ke(e.type, {
                                            personType: i.value,
                                            extendInfo: a.value
                                        });
                                        break;
                                    case "whiteBalance":
                                        t = Ke(e.type, {
                                            imageType: n.value,
                                            baseValue: o.value
                                        });
                                        break;
                                    case "backgroundEnhance":
                                        t = Ke(e.type, {
                                            bgCleanModeDefault: s.value,
                                            bgCleanMooreModeDefault: c.value
                                        });
                                        break;
                                    case "sky":
                                        t = Ke(e.type, {
                                            skyExtendInfo: h.value
                                        });
                                        break;
                                    default:
                                        t = Ke(e.type);
                                        break
                                }
                                return t
                            }),
                            f = Object(l["ref"])(new da(e.data, p.value));
                        Object(l["watch"])(p, t => {
                            f.value = new da(e.data, t)
                        }), console.debug("historyRecord: ", f.value);
                        const m = Object(l["ref"])({}),
                            v = Object(l["ref"])([]),
                            b = Object(l["computed"])(() => {
                                const t = {};
                                for (const i in e.initParams) v.value.includes(i) && (t[i] = e.initParams[i]);
                                return t
                            }),
                            y = Object(l["computed"])(() => {
                                const e = {};
                                for (const t in m.value) v.value.includes(t) && (e[t] = m.value[t]);
                                return e
                            }),
                            w = Object(l["ref"])(!1),
                            k = Object(l["ref"])(!1),
                            C = Object(l["ref"])(!1),
                            x = Object(l["ref"])(!1),
                            P = Object(l["ref"])(!1),
                            S = Object(l["computed"])(() => !!(w.value || k.value || x.value || P.value || C.value) || Object.keys(b.value).length > 0 && Object.keys(y.value).length > 0 && !Object(g["isEqual"])(y.value, b.value));
                        Object(l["watch"])(S, e => t("on-modify", e));
                        const _ = Object(l["computed"])(() => "sky" === e.type && !C.value),
                            O = Object(l["computed"])(() => h.value.sky),
                            I = Object(l["ref"])(),
                            T = Object(l["ref"])(),
                            M = Object(l["ref"])(),
                            j = Object(l["ref"])(),
                            D = Object(l["ref"])(),
                            R = Object(l["ref"])(),
                            N = () => {
                                if (R.value) {
                                    var a, n, o, s, l;
                                    const r = R.value.reset(b.value);
                                    if (r && Object.keys(r).length > 0) {
                                        const e = f.value.createResetHistoryRecord(i.value);
                                        console.debug("history: ", e), t("on-change", r, "reset", e)
                                    }
                                    null === (a = I.value) || void 0 === a || a.reset(), null === (n = T.value) || void 0 === n || n.reset(), null === (o = j.value) || void 0 === o || o.reset(), null === (s = M.value) || void 0 === s || s.reset(), null === (l = D.value) || void 0 === l || l.reset(), t("on-reset", e.type)
                                }
                            },
                            B = e => {
                                Object(l["nextTick"])(() => {
                                    var t, i, a, n, o;
                                    (null === (t = I.value) || void 0 === t || t.init(e), null === (i = T.value) || void 0 === i || i.init(e), null === (a = D.value) || void 0 === a || a.init(e), j.value && Object.keys(e).length > 4) && (null === (n = j.value) || void 0 === n || n.init(e));
                                    M.value && Object.keys(e).length > 0 && (null === (o = M.value) || void 0 === o || o.init(e))
                                })
                            },
                            E = e => {
                                Object(l["nextTick"])(() => {
                                    m.value = Object(g["cloneDeep"])(e), B(e)
                                })
                            },
                            L = e => b.value[e.key] ? b.value[e.key] : e.defaultValue,
                            V = e => {
                                const t = Object.keys(e || {}) || [];
                                return !(t.length > 2 || t.length <= 0) && f.value.isRealtime(t, u.value)
                            },
                            A = Object(g["throttle"])((function(e) {
                                V(e) && t("on-input", e)
                            }), 30),
                            U = Object(g["throttle"])((function(e, i, a) {
                                V(i) && "init" !== a && t("on-input", i, a)
                            }), 30),
                            $ = Object(l["ref"])({}),
                            H = e => {
                                if (V(e)) {
                                    const i = f.value.createHistoryRecord(e);
                                    t("on-change", e, "manual", i)
                                } else {
                                    let i = !1;
                                    for (const t in e) $.value[t] !== e[t] && (i = !0);
                                    if (i) {
                                        const i = f.value.createHistoryRecord(e);
                                        t("on-change", e, "manual", i)
                                    }
                                }
                            },
                            z = Object(l["ref"])();
                        return Object(l["onMounted"])(() => {
                            Object(l["nextTick"])(() => {
                                const e = z.value;
                                e && e.$el.firstChild.firstChild.setAttribute("tabindex", "")
                            })
                        }), {
                            customCollapseItemRef: z,
                            componentCollectionRef: R,
                            idPhoto: I,
                            idPhotoTailorPanel: T,
                            filterRef: M,
                            suitParamsGroup: j,
                            idPhotoSky: D,
                            allParamValues: m,
                            formComponents: p,
                            paramsKeys: v,
                            bgIsModify: x,
                            bgCropIsModify: k,
                            skyIsModify: C,
                            makeupSuitModify: w,
                            filterIsModify: P,
                            isModify: S,
                            isSkySelectEnable: O,
                            isSkyDisabled: _,
                            reset: N,
                            sync: E,
                            syncSlotComp: B,
                            singleSingleFunction: L,
                            onInput: A,
                            onSlotInput: U,
                            onChange: H,
                            onBlur: () => (new et["a"]).process([et["b"].KeyBoard], !0),
                            onFocus: () => (new et["a"]).process([et["b"].KeyBoard], !1)
                        }
                    }
                },
                Ka = Ga,
                Ja = (i("4dc9"), Object(ct["a"])(Ka, Ze, Qe, !1, null, "3fa302f8", null)),
                Ya = Ja.exports,
                Xa = {
                    name: "ParamsCollapse",
                    components: {
                        "custom-collapse-item": Ya
                    },
                    props: {
                        type: String,
                        paramsColsHeight: {
                            type: String,
                            default: "calc(100% - 72px)"
                        },
                        disabled: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])([]);
                        switch (e.type) {
                            case "color":
                                i.value = Fe;
                                break;
                            case "beauty":
                                i.value = Be;
                                break;
                            case "background":
                                i.value = Ve;
                                break
                        }
                        const a = Object(l["computed"])(() => "color" === e.type ? Le : "beauty" === e.type ? Ee : "background" === e.type ? Ae : ""),
                            n = Object(l["computed"])(() => (a.value.filter(e => "color" === e.group) || []).map(e => e.key)),
                            o = Object(l["computed"])(() => r["a"].getters["refine/oriBeautifyParams"]),
                            s = Object(l["computed"])(() => r["a"].getters["refine/oriPaletteParams"]),
                            c = Object(l["computed"])(() => r["a"].getters["refine/lastBeautifyParams"]),
                            u = Object(l["computed"])(() => r["a"].getters["refine/lastPaletteParams"]),
                            d = Object(l["computed"])(() => r["a"].getters["refine/currBtUpdateTime"]),
                            h = Object(l["computed"])(() => r["a"].getters["refine/currPtUpdateTime"]),
                            p = Object(l["computed"])(() => r["a"].getters["refine/personType"]),
                            f = Object(l["ref"])([]),
                            m = Object(g["debounce"])((function() {
                                const e = c.value,
                                    t = u.value;
                                Object(l["nextTick"])(() => {
                                    f.value.forEach(i => {
                                        n.value.includes(i.type) ? i.syncSlotComp(t) : i.syncSlotComp(e)
                                    })
                                })
                            }), 300);
                        Object(l["watch"])(p, () => m());
                        const v = Object(g["debounce"])((function() {
                            const e = c.value,
                                t = u.value;
                            Object(l["nextTick"])(() => {
                                f.value.forEach(i => {
                                    n.value.includes(i.type) ? i.sync(t) : i.sync(e)
                                })
                            })
                        }), 300);
                        "color" === e.type ? Object(l["watch"])(h, e => {
                            e && (console.log("update params time palette: ", e), v())
                        }) : Object(l["watch"])(d, e => {
                            e && (console.log("update params time beautify: ", e), v())
                        });
                        const b = {};
                        a.value.forEach(e => {
                            b[e.key] = !1
                        });
                        const y = Object(l["reactive"])(b),
                            w = (e, t) => y[t] = e,
                            k = Object(l["computed"])(() => {
                                let e = !1;
                                for (const t in y) y[t] && (e = !0);
                                return e
                            });
                        return Object(l["watch"])(k, t => {
                            r["a"].commit("refine/_SetNavbarDots", {
                                [e.type]: t || !1
                            })
                        }), {
                            customCollapseItemRef: f,
                            activeName: i,
                            intelligentComponents: a,
                            oriBeautifyParams: o,
                            oriPaletteParams: s,
                            onModify: w
                        }
                    }
                },
                Za = Xa,
                Qa = Object(ct["a"])(Za, Ye, Xe, !1, null, null, null),
                en = Qa.exports,
                tn = i("af81"),
                an = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t(i.TsDialog, {
                        attrs: {
                            "append-to-body": "",
                            "destroy-on-close": "",
                            top: "30vh",
                            width: "504px",
                            "custom-class": "common-dialog cover-dialog",
                            visible: i.visible,
                            "close-on-click-modal": !1
                        },
                        on: {
                            "update:visible": function(e) {
                                i.visible = e
                            }
                        }
                    }, [t("div", {
                        staticClass: "title my_title",
                        attrs: {
                            slot: "title"
                        },
                        slot: "title"
                    }, [t("span", [e._v("新建预设")])]), t("div", {
                        staticClass: "container"
                    }, [t("div", {
                        staticClass: "formLine"
                    }, [t("span", [e._v("预设名称：")]), t("el-input", {
                        ref: "inputPresetNameRefs",
                        staticClass: "input-name",
                        attrs: {
                            "show-word-limit": "",
                            size: "mini",
                            maxlength: "20"
                        },
                        nativeOn: {
                            keydown: function(t) {
                                if (!t.type.indexOf("key") && e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"])) return null;
                                t.stopPropagation()
                            }
                        },
                        model: {
                            value: i.form.name,
                            callback: function(t) {
                                e.$set(i.form, "name", t)
                            },
                            expression: "form.name"
                        }
                    })], 1), t("div", {
                        staticClass: "formLine"
                    }, [t("span", [e._v("分类：")]), t(i.TsSelectBox, [t(i.ElSelect, {
                        staticClass: "presetSelect",
                        attrs: {
                            size: "mini",
                            placeholder: "请选择"
                        },
                        nativeOn: {
                            keydown: function(t) {
                                if (!t.type.indexOf("key") && e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"])) return null;
                                t.stopPropagation()
                            }
                        },
                        model: {
                            value: i.whichPresetClass,
                            callback: function(e) {
                                i.whichPresetClass = e
                            },
                            expression: "whichPresetClass"
                        }
                    }, [e._l(i.allPreset, (function(e, a) {
                        return t(i.ElOption, {
                            key: a,
                            attrs: {
                                label: e.label,
                                value: e.value
                            }
                        })
                    })), t("div", {
                        staticStyle: {
                            "padding-left": "18px",
                            cursor: "pointer",
                            height: "30px",
                            display: "flex",
                            "align-items": "center"
                        },
                        on: {
                            click: i.handleAddPresetClass
                        }
                    }, [t("span", {
                        staticClass: "el-icon-circle-plus-outline"
                    }), t("span", {
                        staticStyle: {
                            "font-size": "14px",
                            "margin-left": "4px"
                        }
                    }, [e._v("新建分类")])]), t("template", {
                        slot: "empty"
                    }, [t("p", {
                        staticStyle: {
                            "font-size": "14px",
                            color: "#999",
                            "margin-left": "20px",
                            "margin-top": "10px"
                        }
                    }, [e._v("暂无分类")]), t("div", {
                        staticStyle: {
                            "padding-left": "18px",
                            cursor: "pointer",
                            height: "50px",
                            display: "flex",
                            "align-items": "center"
                        },
                        on: {
                            click: i.handleAddPresetClass
                        }
                    }, [t("span", {
                        staticClass: "el-icon-circle-plus-outline"
                    }), t("span", {
                        staticStyle: {
                            "font-size": "14px",
                            "margin-left": "4px"
                        }
                    }, [e._v("新建分类")])])])], 2)], 1)], 1), t(i.ElDivider, {
                        staticClass: "divider"
                    }), t("div", {
                        staticClass: "formLine"
                    }, [t("span", {
                        staticStyle: {
                            "align-self": "flex-start"
                        }
                    }, [e._v("筛选：")]), t(i.PresetSetting, {
                        staticStyle: {
                            height: "184px"
                        },
                        attrs: {
                            "custom-checkbox-settings": i.customSettings,
                            "checkbox-object": i.checkboxSettings
                        },
                        on: {
                            "on-change": i.onPresetSettingChange,
                            "on-select-input": function(e) {
                                i.selectType = e
                            }
                        }
                    })], 1)], 1), e.isRecommendPreset ? t("div", {
                        staticClass: "footer"
                    }, [t(i.ElButton, {
                        staticClass: "claBotButton",
                        attrs: {
                            size: "mini",
                            type: "default"
                        },
                        on: {
                            click: function(e) {
                                i.visible = !1
                            }
                        }
                    }, [e._v(" 取消 ")]), t(i.ElButton, {
                        attrs: {
                            size: "mini",
                            type: "primary",
                            loading: i.loading,
                            disabled: !i.form.name || !i.visible
                        },
                        on: {
                            click: function(e) {
                                return i.onSubmit("savePresetBtn")
                            }
                        }
                    }, [e._v(" 保存 ")])], 1) : t("div", {
                        staticClass: "footer"
                    }, [t(i.ElButton, {
                        staticClass: "claBotButton",
                        attrs: {
                            type: "default",
                            loading: i.loading,
                            disabled: !i.form.name || !i.visible
                        },
                        on: {
                            click: function(e) {
                                return i.onSubmit("CreatedNewPresetBtn")
                            }
                        }
                    }, [e._v(" 创建新预设 ")]), t(i.ElButton, {
                        attrs: {
                            type: "primary",
                            loading: i.coverLoading,
                            disabled: !i.form.name || !i.visible
                        },
                        on: {
                            click: i.onCover
                        }
                    }, [e._v("覆盖旧预设 ")])], 1), t("div", {
                        staticClass: "tip_container"
                    }, [i.hasMineIdPhoto ? [t("i", {
                        staticClass: "el-icon-warning-outline tip_icon"
                    }), t("span", {
                        staticClass: "tip"
                    }, [e._v("预设中上传的证件照背景仅支持当前电脑使用")])] : e._e()], 2)])
                },
                nn = [],
                on = i("f8d6"),
                sn = i("7f45"),
                ln = i.n(sn),
                rn = i("1209"),
                cn = i("7b9a"),
                un = i("997e"),
                dn = i("13a7"),
                hn = i("f5de"),
                pn = i("ef4d"),
                fn = i("396d"),
                mn = i("4aec"),
                gn = i("f518"),
                vn = Object(l["defineComponent"])({
                    __name: "SavePresetDialog",
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        },
                        getParamsJson: {
                            type: Function
                        },
                        isRecommendPreset: Boolean,
                        preset_label: Object,
                        deletePresetSuitId: [String, Number],
                        refineUUID: {
                            type: String,
                            default: ""
                        }
                    },
                    emits: ["input", "newPresetClass", "saveSuccess"],
                    setup(e, {
                        emit: t
                    }) {
                        const i = e,
                            a = Object(l["ref"])(),
                            n = Object(l["ref"])();
                        let s = Object(l["ref"])(i.value);
                        Object(l["watch"])(() => i.value, e => {
                            s.value = e, e ? (a.value = on["a"], y(), k(), Object(l["nextTick"])(() => {
                                n.value.focus()
                            })) : a.value = {}
                        }), Object(l["watch"])(s, e => t("input", e));
                        let c = Object(l["ref"])(!1),
                            u = Object(l["ref"])(!1),
                            d = Object(l["ref"])(!1),
                            h = Object(l["ref"])(null);
                        const p = Object(l["computed"])(() => r["a"].getters.userId),
                            f = Object(l["reactive"])({
                                cover: "",
                                name: "预设1"
                            }),
                            m = Object(l["computed"])(() => {
                                let e = JSON.parse(JSON.stringify(r["a"].state.presetting.preset_class));
                                return e = e.filter(e => 1 !== e.type), e
                            });
                        Object(l["watch"])(() => i.preset_label, e => {
                            null === e ? (f.name = "预设1", h.value = m.value[0] ? m.value[0].value : null) : (f.name = e.name, h.value = e.classId)
                        });
                        const g = Object(l["ref"])({
                                params: [],
                                effects: [],
                                crop: [],
                                algoVersion: []
                            }),
                            v = Object(l["ref"])(),
                            b = (e, t) => {
                                const i = new mn["a"](e, null, -1),
                                    a = new gn["a"]({
                                        json: t,
                                        userId: -1
                                    }),
                                    n = i.getHasEffectConfig(),
                                    o = a.getHasEffectConfig();
                                n.params = [...n.params, ...o.params], n.effects = [...n.effects, ...o.effects], v.value = Object(on["b"])(n)
                            },
                            y = async () => {
                                const {
                                    beautifyJsonStr: e,
                                    paletteJsonStr: t
                                } = await o["c"].getPresetSuitJson(i.refineUUID);
                                if (e) try {
                                    const i = JSON.parse(e),
                                        a = JSON.parse(t);
                                    b(i, a), d.value = Object(cn["b"])(i)
                                } catch (a) {} else d.value = !1
                            }, k = () => {
                                r["a"].dispatch("getPresetClass")
                            }, C = () => {
                                t("newPresetClass")
                            }, x = e => {
                                g.value.params = e.params, g.value.effects = e.effects, g.value.crop = e.crop, g.value.algoVersion = e.algoVersion
                            }, P = async () => {
                                const e = await o["c"].getPresetSuitJson(i.refineUUID, g.value);
                                let t = null,
                                    a = null;
                                try {
                                    t = JSON.parse(e.beautifyJsonStr), a = JSON.parse(e.paletteJsonStr)
                                } catch (n) {}
                                return {
                                    beautifyJson: t,
                                    paletteJson: a
                                }
                            }, {
                                tsNotify: S
                            } = Object(dn["a"])(), _ = async (e, i = null) => {
                                if (null === h.value || "" === h.value) return void S({
                                    type: "error",
                                    message: "请先选择分类"
                                });
                                let {
                                    cover: a,
                                    name: n
                                } = f;
                                n = n.trim().replace(/ +/g, " ");
                                let o = "savePresetBtn" === e || "CreatedNewPresetBtn" === e;
                                o && (c.value = !0);
                                const {
                                    beautifyJson: l,
                                    paletteJson: u
                                } = await P();
                                try {
                                    const f = {
                                            beautify: {
                                                cover: a,
                                                configJson: l
                                            },
                                            palette: {
                                                cover: a,
                                                configJson: u
                                            }
                                        },
                                        m = await Object(pi["d"])(f, n, h.value, i);
                                    if (m) try {
                                        await r["a"].dispatch("loadAllPresents", {
                                            userId: p.value,
                                            loadDb: !0
                                        });
                                        const e = await r["a"].dispatch("getPresetSuitByCache", m.setting_id);
                                        t("saveSuccess", e)
                                    } catch (d) {
                                        S({
                                            type: "error",
                                            message: d.message
                                        })
                                    }
                                    let g = "coverOldPreset" === e ? "预设覆盖成功。您可以在【预设】中查看。" : "预设保存成功。您可以在【预设】中查看。";
                                    D(e), S({
                                        type: "success",
                                        message: g
                                    }), s.value = !1, Object(rn["a"])(300).then(() => {
                                        o && (c.value = !1)
                                    })
                                } catch (m) {
                                    m && m.message && S({
                                        type: "error",
                                        message: m.message
                                    })
                                }
                                o && (c.value = !1)
                            }, O = async () => {
                                let e, t = r["a"].state.presetting.preItems,
                                    a = i.deletePresetSuitId;
                                for (const i of t)
                                    if (Number(i.id) === Number(a)) {
                                        e = i.created_at, e || (e = i.updated_at);
                                        break
                                    } e = ln()(e).format("YYYY-MM-DD HH:mm:ss"), u.value = !0, await r["a"].dispatch("deletePreset", {
                                    id: a
                                }), await _("coverOldPreset", e), u.value = !1
                            }, I = Object(l["ref"])(0), {
                                PointSavePresetSubmit1: T,
                                PointSavePresetCover: M,
                                PointSavePresetSubmit2: j
                            } = Object(un["a"])(), D = e => {
                                if ("savePresetBtn" === e) return void T(I.value);
                                let t = "name_1_sort_1";
                                if (i.preset_label) {
                                    const e = i.preset_label.name,
                                        a = i.preset_label.classId,
                                        n = f.name,
                                        o = h.value,
                                        s = e === n ? "name_1" : "name_2",
                                        l = a === o ? "sort_1" : "sort_2";
                                    t = s + "_" + l
                                }
                                "coverOldPreset" === e ? M(t, I.value) : j(t, I.value)
                            };
                        return {
                            __sfc: !0,
                            props: i,
                            $emit: t,
                            checkboxSettings: a,
                            inputPresetNameRefs: n,
                            visible: s,
                            loading: c,
                            coverLoading: u,
                            hasMineIdPhoto: d,
                            whichPresetClass: h,
                            userId: p,
                            form: f,
                            allPreset: m,
                            presetIncludeJson: g,
                            customSettings: v,
                            initCustomCheckboxSettings: b,
                            checkHasMineIdPhoto: y,
                            getPresetClass: k,
                            handleAddPresetClass: C,
                            onPresetSettingChange: x,
                            getParamsJson: P,
                            tsNotify: S,
                            onSubmit: _,
                            onCover: O,
                            selectType: I,
                            PointSavePresetSubmit1: T,
                            PointSavePresetCover: M,
                            PointSavePresetSubmit2: j,
                            PointSavePresetEvent: D,
                            ElButton: w["Button"],
                            ElSelect: w["Select"],
                            ElOption: w["Option"],
                            ElDivider: w["Divider"],
                            TsDialog: hn["a"],
                            PresetSetting: pn["a"],
                            TsSelectBox: fn["a"]
                        }
                    }
                }),
                bn = vn,
                yn = (i("74c5"), Object(ct["a"])(bn, an, nn, !1, null, "3c4587a6", null)),
                wn = yn.exports,
                kn = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("el-dialog", {
                        attrs: {
                            "append-to-body": "",
                            top: e.dialogTop + "px",
                            width: e.dialogWidth + "px",
                            align: "center",
                            title: "年龄性别修改",
                            "custom-class": "setting-dialog gpu-switch-dialog",
                            visible: e.visible,
                            "close-on-click-modal": !1,
                            "destroy-on-close": !0,
                            "before-close": e.onClose
                        },
                        on: {
                            "update:visible": function(t) {
                                e.visible = t
                            }
                        },
                        nativeOn: {
                            click: function(t) {
                                return t.stopPropagation(), e.onBodyClick.apply(null, arguments)
                            }
                        }
                    }, [t("div", {
                        staticClass: "title-container",
                        attrs: {
                            slot: "title"
                        },
                        slot: "title"
                    }, [t("el-button", {
                        staticClass: "add-face-btn",
                        attrs: {
                            id: e.manualFaceGuidId
                        },
                        on: {
                            click: e.onAddFaceFrameClick
                        }
                    }, [t("img", {
                        staticClass: "btn-icon",
                        attrs: {
                            src: ""
                        }
                    }), t("span", {
                        staticClass: "btn-title"
                    }, [e._v("添加人脸")])]), t("span", {
                        staticClass: "title"
                    }, [e._v("年龄性别修改")])], 1), t("ImportAgeSexReviseItem", {
                        ref: "ImportAgeSexReviseItem",
                        staticClass: "container",
                        attrs: {
                            value: e.value
                        },
                        on: {
                            toScale: e.toScale
                        }
                    }, [t("div", {
                        ref: "centerInfo",
                        staticClass: "centerInfo",
                        style: `height: ${e.dialogHeight}px`,
                        attrs: {
                            slot: "centerInfo"
                        },
                        slot: "centerInfo"
                    }, [t("canvas", {
                        ref: "popupCanvas",
                        attrs: {
                            id: "popupCanvas"
                        }
                    }), t("ImportAgeSexReviseBox", {
                        ref: "ImportAgeSexReviseBox",
                        attrs: {
                            canvasHeight: e.canvasHeight,
                            canvasWidth: e.canvasWidth,
                            "face-data": e.faceData,
                            refineUUID: this.refineUUID,
                            scale: e.scale
                        },
                        on: {
                            noComplete_toScale: e.noComplete_toScale,
                            callBackPersonType: e.callBackPersonType,
                            onFaceDeleted: e.onFaceDeleted,
                            onStatusChanged: e.onFaceEditStatusChanged
                        }
                    })], 1)])], 1)
                },
                Cn = [],
                xn = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        attrs: {
                            id: "centerInfo"
                        },
                        on: {
                            mousedown: e.mousedown,
                            mousewheel: e.mousewheel
                        }
                    }, [e._t("centerInfo")], 2)
                },
                Pn = [];
            class Sn {
                static addEventListener(e, t) {
                    let i = document[e];
                    i || (i = t => {
                        v["a"].$emit(e, t)
                    }, document[e] = i), v["a"].$on(e, t)
                }
                static removeEventListener(e, t) {
                    v["a"].$off(e, t)
                }
            }
            var _n, On = {
                    name: "ImportAgeSexReviseItem.vue",
                    data() {
                        return {
                            isMove: !1,
                            config: {
                                edit: {
                                    width: 0,
                                    height: 0,
                                    left: 0,
                                    top: 0
                                },
                                parentElement: {
                                    width: 0,
                                    height: 0
                                },
                                scaleRadio: 1
                            },
                            isFirst: !1
                        }
                    },
                    props: {
                        value: {
                            type: Boolean,
                            default () {
                                return !0
                            }
                        }
                    },
                    watch: {
                        value: {
                            handler() {
                                this.clearUpData(), this.isFirst = !0
                            }
                        }
                    },
                    methods: {
                        clearUpData() {
                            this.config.edit = {
                                width: 0,
                                height: 0,
                                left: 0,
                                top: 0
                            }, this.config.scaleRadio = 1
                        },
                        mouseAll() {
                            Sn.addEventListener("onmousemove", this.documentMove), Sn.addEventListener("onmouseup", this.documentUp)
                        },
                        mouseAllUnRegister() {
                            Sn.removeEventListener("onmousemove", this.documentMove), Sn.removeEventListener("onmouseup", this.documentUp)
                        },
                        mousedown(e) {
                            let t = e,
                                i = t.pageX,
                                a = t.pageY;
                            if (this.isMove = !0, this.downX = i, this.downY = a, this.config.parentElement.width = e.currentTarget.parentElement.offsetWidth, this.config.parentElement.height = e.currentTarget.parentElement.offsetHeight, this.mouseAll(), this.isFirst) {
                                const e = document.getElementById("centerInfo");
                                this.config.edit.left = parseInt(e.style.left), this.config.edit.top = parseInt(e.style.top), this.isFirst = !1
                            }
                        },
                        mousewheel: Object(g["throttle"])((function(e) {
                            const t = e || window.event;
                            let i = t.deltaY < 0;
                            if (i) this.config.scaleRadio = (parseFloat(this.config.scaleRadio) + .02).toFixed(2), this.$emit("toScale", this.config.scaleRadio);
                            else {
                                if (this.config.scaleRadio < .1) return void(this.config.scaleRadio = .1);
                                this.config.scaleRadio = (parseFloat(this.config.scaleRadio) - .02).toFixed(2), this.$emit("toScale", this.config.scaleRadio)
                            }
                            return e.preventDefault && e.preventDefault(), !1
                        }), 10),
                        changeScaleRadio(e) {
                            this.config.scaleRadio = e
                        },
                        documentMove(e) {
                            let t = e,
                                i = t.pageX,
                                a = t.pageY;
                            if (this.isMove) {
                                this.config.edit.left += i - this.downX, this.config.edit.top += a - this.downY, this.downX = i, this.downY = a;
                                let e = Math.abs(this.config.edit.left),
                                    t = Math.abs(this.config.edit.top);
                                const n = this.config.parentElement.width,
                                    o = this.config.parentElement.height;
                                document.getElementById("popupCanvas");
                                e > n / 2 * this.config.scaleRadio && (this.config.edit.left > 0 ? this.config.edit.left = n / 2 * this.config.scaleRadio : this.config.edit.left = -n / 2 * this.config.scaleRadio), t > o / 2 * this.config.scaleRadio && (this.config.edit.top > 0 ? this.config.edit.top = o / 2 * this.config.scaleRadio : this.config.edit.top = -o / 2 * this.config.scaleRadio);
                                const s = document.getElementById("centerInfo");
                                s.style.left = this.config.edit.left + "px", s.style.top = this.config.edit.top + "px"
                            }
                        },
                        documentUp() {
                            this.isMove = !1, this.mouseAllUnRegister()
                        }
                    }
                },
                In = On,
                Tn = Object(ct["a"])(In, xn, Pn, !1, null, "29e91d92", null),
                Mn = Tn.exports,
                jn = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        ref: "personBox",
                        staticClass: "personBox",
                        style: {
                            width: e.canvasWidth + "px",
                            height: e.canvasHeight + "px"
                        },
                        attrs: {
                            id: "personBoxId"
                        }
                    }, [e._l(e.faceDataTemp, (function(i, a) {
                        return [0 == i.deleted ? t("div", {
                            key: a,
                            staticClass: "person-type",
                            class: "person-" + i.personType,
                            style: {
                                left: i.faceBoxNormalized[0] * e.canvasWidth + "px",
                                top: i.faceBoxNormalized[1] * e.canvasHeight + "px",
                                width: i.faceBoxNormalized[2] * e.canvasWidth + "px",
                                height: i.faceBoxNormalized[3] * e.canvasHeight + "px",
                                border: `${i.isSelected?e.selectedBorderWidth:0}px ${e.selectedColor} solid`
                            },
                            attrs: {
                                id: i.isSelected ? e.ManualFaceFrameId : "",
                                faceId: i.id
                            },
                            on: {
                                click: [function(t) {
                                    return t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : (t.stopPropagation(), e.onNormalFaceFrameClick(i))
                                }, function(t) {
                                    return t.shiftKey || t.altKey || t.metaKey ? null : t.ctrlKey ? (t.stopPropagation(), e.onNormalFaceFrameMetaClick(i, !1)) : null
                                }, function(t) {
                                    return t.ctrlKey || t.shiftKey || t.altKey ? null : t.metaKey ? (t.stopPropagation(), e.onNormalFaceFrameMetaClick(i, !0)) : null
                                }]
                            }
                        }, [t("el-select", {
                            staticClass: "change_sex",
                            style: {
                                width: i.faceBoxNormalized[2] * e.canvasWidth + "px",
                                height: i.faceBoxNormalized[3] * e.canvasHeight / 4 + "px",
                                opacity: e.selectedPersons.length > 0 ? i.isSelected ? 1 : e.InActiveAlpha : 1
                            },
                            attrs: {
                                "popper-class": "sex-select",
                                "popper-append-to-body": !1,
                                disabled: e.isPending
                            },
                            on: {
                                change: function(t) {
                                    return e.refreshPage(i.personType, a, i)
                                },
                                "visible-change": function(t) {
                                    return e.isSelect(t, a)
                                }
                            },
                            model: {
                                value: i.personType,
                                callback: function(t) {
                                    e.$set(i, "personType", t)
                                },
                                expression: "person.personType"
                            }
                        }, e._l(e.options, (function(e) {
                            return t("el-option", {
                                key: e.value,
                                attrs: {
                                    label: e.label,
                                    value: e.value
                                }
                            })
                        })), 1), i.isSelected ? e._e() : [e._l(e.borderDiv, (function(a, n) {
                            return [t("div", {
                                key: n,
                                staticClass: "borderDiv",
                                class: a,
                                style: {
                                    opacity: e.selectedPersons.length > 0 ? i.isSelected ? 1 : e.InActiveAlpha : 1
                                }
                            })]
                        }))]], 2) : e._e()]
                    })), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.canShowFaceMarkToolTip,
                            expression: "canShowFaceMarkToolTip"
                        }],
                        ref: "myTooltipRef",
                        staticClass: "my-tooltip",
                        style: {
                            background: e.tooltipBgColor
                        },
                        attrs: {
                            id: "my-tooltip-id"
                        }
                    }, [e.isFaceMarkLoading ? [t("i", {
                        staticClass: "el-icon-loading"
                    }), e._v(" " + e._s(e.faceMarkTooltipText) + " ")] : e._e(), e.isFaceMarkLoading ? e._e() : [e._v(" " + e._s(e.faceMarkTooltipText) + " ")], t("div", {
                        attrs: {
                            id: "arrow",
                            "data-popper-arrow": ""
                        }
                    })], 2), null != e.newFaceDataViewModel ? [t("face-resize-frame", {
                        ref: "faceResizeRef",
                        attrs: {
                            frame: {
                                x: e.newFaceDataViewModel.faceBox[0],
                                y: e.newFaceDataViewModel.faceBox[1],
                                width: e.newFaceDataViewModel.faceBox[2],
                                height: e.newFaceDataViewModel.faceBox[3]
                            },
                            inColor: e.newFaceFramePendingBorderColor,
                            outColor: e.outColor,
                            maxSize: {
                                width: e.canvasWidth,
                                height: e.canvasHeight
                            },
                            canDragFaceFrame: e.canDragFaceFrame,
                            scale: e.scale
                        },
                        on: {
                            onChange: e.onNewFaceFrameChanged,
                            onFinished: e.onNewFaceChangeFinished
                        }
                    }, [!e.canShowFaceConfirm || e.isFaceMarkLoading || e.isFaceMarkWarning ? e._e() : t("div", {
                        staticClass: "new-face-frame-confirm",
                        attrs: {
                            slot: "right"
                        },
                        slot: "right"
                    }, [t("el-button", {
                        attrs: {
                            icon: "el-icon-check"
                        },
                        on: {
                            click: e.onFaceConfirm
                        }
                    }), t("el-button", {
                        attrs: {
                            icon: "el-icon-close"
                        },
                        on: {
                            click: e.onFaceReject
                        }
                    })], 1)])] : e._e(), t("div", {
                        ref: "bottomToolRef",
                        staticClass: "face-bottom-tool"
                    }, [1 == e.selectedPersons.length ? [t("el-button", {
                        attrs: {
                            icon: "el-icon-delete"
                        },
                        on: {
                            click: function(t) {
                                return t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : (t.stopPropagation(), e.onDeleteFaces.apply(null, arguments))
                            }
                        }
                    }, [e._v("删除")])] : e._e(), e.selectedPersons.length > 1 ? [t("el-button", {
                        attrs: {
                            disabled: e.isPending,
                            icon: ""
                        },
                        nativeOn: {
                            click: function(t) {
                                return t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : (t.stopPropagation(), e.onBatchSexClick.apply(null, arguments))
                            }
                        }
                    }, [t("img", {
                        staticClass: "btn-icon",
                        attrs: {
                            src: ""
                        }
                    }), t("span", {
                        staticClass: "btn-title"
                    }, [e._v("批量修改性别")]), t("i", {
                        staticClass: "el-icon-arrow-down el-icon--right"
                    })]), t("el-select", {
                        ref: "sexSelectorRef",
                        staticClass: "cla_sex_selector",
                        attrs: {
                            "popper-class": "batch-sex-select",
                            "popper-append-to-body": !0,
                            placeholder: "请选择"
                        },
                        on: {
                            change: function(t) {
                                return e.onBottomGroupSexItemChoosed(e.batchSelectSexVal)
                            }
                        },
                        model: {
                            value: e.batchSelectSexVal,
                            callback: function(t) {
                                e.batchSelectSexVal = t
                            },
                            expression: "batchSelectSexVal"
                        }
                    }, e._l(e.options, (function(e) {
                        return t("el-option", {
                            key: e.value,
                            attrs: {
                                label: e.label,
                                value: e.value,
                                disabled: e.disabled
                            }
                        })
                    })), 1), t("el-button", {
                        attrs: {
                            icon: "el-icon-delete"
                        },
                        on: {
                            click: function(t) {
                                return t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : (t.stopPropagation(), e.onDeleteFaces.apply(null, arguments))
                            }
                        }
                    }, [e._v("批量删除")])] : e._e()], 2)], 2)
                },
                Dn = [],
                Rn = i("10ac");
            (function(e) {
                e[e["None"] = 0] = "None", e[e["Init"] = 1] = "Init", e[e["Pending"] = 2] = "Pending", e[e["Approved"] = 3] = "Approved", e[e["Cancelled"] = 4] = "Cancelled"
            })(_n || (_n = {}));
            class Nn {
                constructor(e) {
                    this._status = _n.None, this._isSelected = !1, this._bioModel = null, this._bioModel = e
                }
                static Create() {
                    let e = new Rn["a"](null),
                        t = new Nn(e);
                    return t
                }
                static CreateFbrFileName() {
                    const {
                        v4: e
                    } = i("e144"), t = (new Date).getTime();
                    let a = `${e()}_${t}`;
                    return a = a.replaceAll("-", ""), a
                }
                bindFromConfirm(e) {
                    this.faceBoxNormalized = e.faceBoxNormalized, this.gender = e.gender, this.age = e.age, this.personType = e.personType, this.id = e.id
                }
                set age(e) {
                    this._bioModel.age = e
                }
                get age() {
                    return this._bioModel.age
                }
                set faceBox(e) {
                    this._bioModel.faceBox = e
                }
                get faceBox() {
                    return this._bioModel.faceBox
                }
                set faceBoxNormalized(e) {
                    this._bioModel.faceBoxNormalized = e
                }
                get faceBoxNormalized() {
                    return this._bioModel.faceBoxNormalized
                }
                set gender(e) {
                    this._bioModel.gender = e
                }
                get gender() {
                    return this._bioModel.gender
                }
                set personType(e) {
                    this._bioModel.personType = e
                }
                get personType() {
                    return this._bioModel.personType
                }
                set id(e) {
                    this._bioModel.id = e
                }
                get id() {
                    return this._bioModel.id
                }
                set status(e) {
                    this._status = e
                }
                get status() {
                    return this._status
                }
                set isSelected(e) {
                    this._isSelected = e
                }
                get isSelected() {
                    return this._isSelected
                }
                getFaceRect() {
                    return this._bioModel.getFaceRect()
                }
                getFaceBoxNormalizedRect() {
                    return this._bioModel.getFaceBoxNormalizedRect()
                }
                set deleted(e) {
                    this._bioModel.deleted = e
                }
                get deleted() {
                    return this._bioModel.deleted
                }
                set isManual(e) {
                    this._bioModel.isManual = e
                }
                get isManual() {
                    return this._bioModel.isManual
                }
                set add(e) {
                    this._bioModel.add = e
                }
                get add() {
                    return this._bioModel.add
                }
                set changed(e) {
                    this._bioModel.changed = e
                }
                get changed() {
                    return this._bioModel.changed
                }
                set fbrFileName(e) {
                    this._bioModel.fbrFileName = e
                }
                get fbrFileName() {
                    return this._bioModel.fbrFileName
                }
                toJson() {
                    return {
                        ...this._bioModel,
                        isSelected: this._isSelected,
                        status: this._status
                    }
                }
            }
            var Bn = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        ref: "rootRef",
                        staticClass: "resize-container",
                        style: {
                            left: e.currentFrame.x + "px",
                            top: e.currentFrame.y + "px",
                            width: e.currentFrame.width + "px",
                            height: e.currentFrame.height + "px"
                        }
                    }, [t("div", {
                        staticClass: "out-box",
                        style: {
                            left: e.outBoxFrame.x + "px",
                            top: e.outBoxFrame.y + "px",
                            width: e.outBoxFrame.width + "px",
                            height: e.outBoxFrame.height + "px",
                            border: `${e.outerBorderWidth}px solid ${e.outColor}`,
                            zIndex: 1
                        },
                        on: {
                            mousedown: function(t) {
                                return t.stopPropagation(), e.onBodyMousedown(t)
                            }
                        }
                    }), t("div", {
                        staticClass: "inner-box",
                        style: {
                            left: e.innerBoxFrame.x + "px",
                            top: e.innerBoxFrame.y + "px",
                            width: e.innerBoxFrame.width + "px",
                            height: e.innerBoxFrame.height + "px",
                            border: `${e.innerBorderWidth}px solid ${e.inColor}`
                        }
                    }), e._l(e.vectors, (function(i, a) {
                        return [t("div", {
                            key: a,
                            class: "vector",
                            style: {
                                left: i.x + "px",
                                top: i.y + "px",
                                width: i.width + "px",
                                height: i.height + "px",
                                background: "" + e.outColor,
                                pointerEvents: "none"
                            }
                        }), t("div", {
                            key: a + "_hot",
                            staticClass: "vecHotArea",
                            class: "vectorHotArea_" + i.tag,
                            style: {
                                left: i.x + i.width / 2 - i.width + "px",
                                top: i.y + i.height / 2 - i.height + "px",
                                width: 2 * i.width + "px",
                                height: 2 * i.height + "px",
                                zIndex: 123
                            },
                            on: {
                                mousedown: function(t) {
                                    return t.ctrlKey || t.shiftKey || t.altKey || t.metaKey ? null : (t.stopPropagation(), e.onMousedown(t, i.tag))
                                }
                            }
                        })]
                    })), t("div", {
                        ref: "floatBoardRef",
                        class: e.floatClass
                    }, [e._t("right")], 2)], 2)
                },
                En = [];

            function Fn(e, t = 1) {
                e = e.replace("#", "");
                let i = new RegExp("\\w{1,2}", "g"),
                    a = e.match(i);
                return a = a.map((e, i) => {
                    let a = parseInt(e, 16);
                    return 3 === i ? Math.round(a / (255 / t) * 100) / 100 : a
                }), a
            }
            const Ln = {
                topLeft: 0,
                topRight: 1,
                bottomRight: 2,
                bottomLeft: 3
            };
            var Vn = {
                    name: "",
                    props: {
                        canDragFaceFrame: {
                            type: Boolean,
                            default: !0
                        },
                        inColor: {
                            type: String,
                            default: "#D95838"
                        },
                        outColor: {
                            type: String,
                            default: "#ffffff"
                        },
                        innerBoxAlpha: {
                            type: Number,
                            default: .2
                        },
                        frame: {
                            type: Object,
                            default: function() {
                                return {
                                    x: 0,
                                    y: 0,
                                    width: 0,
                                    height: 0
                                }
                            }
                        },
                        minSize: {
                            type: Object,
                            default: function() {
                                return {
                                    width: 10,
                                    height: 10
                                }
                            }
                        },
                        maxSize: {
                            type: Object,
                            default: function() {
                                return {
                                    width: 200,
                                    height: 200
                                }
                            }
                        },
                        scale: {
                            type: Number,
                            default: 1
                        },
                        safeEdge: {
                            type: Number,
                            default: 8
                        }
                    },
                    data() {
                        return {
                            vectorWidth: 8,
                            innerBorderWidth: 1,
                            outerBorderWidth: 1,
                            currentFrame: this.frame,
                            isDown: !1,
                            isBodyDown: !1,
                            downPoint: {
                                x: 0,
                                y: 0
                            },
                            curVecTag: null,
                            floatBoardSize: {
                                width: 0,
                                height: 0
                            },
                            floatClass: "right-slot"
                        }
                    },
                    computed: {
                        outBoxFrame() {
                            const e = this.vectorWidth + 2 * this.innerBorderWidth,
                                t = e / 2;
                            return {
                                x: t - this.outerBorderWidth / 2,
                                y: t - this.outerBorderWidth / 2,
                                width: this.currentFrame.width - e - this.outerBorderWidth,
                                height: this.currentFrame.height - e - this.outerBorderWidth
                            }
                        },
                        innerBoxFrame() {
                            const e = this.outBoxFrame;
                            return {
                                x: e.x + this.innerBorderWidth,
                                y: e.y + this.innerBorderWidth,
                                width: e.width - 2 * this.innerBorderWidth,
                                height: e.height - 2 * this.innerBorderWidth
                            }
                        },
                        vectors() {
                            const e = this.innerBorderWidth,
                                t = this.vectorWidth + 2 * this.innerBorderWidth,
                                i = this.currentFrame.height - t + e,
                                a = this.currentFrame.width - t + e,
                                n = e,
                                o = e;
                            return [{
                                x: n,
                                y: o,
                                width: this.vectorWidth,
                                height: this.vectorWidth,
                                tag: Ln.topLeft
                            }, {
                                x: a,
                                y: o,
                                width: this.vectorWidth,
                                height: this.vectorWidth,
                                tag: Ln.topRight
                            }, {
                                x: a,
                                y: i,
                                width: this.vectorWidth,
                                height: this.vectorWidth,
                                tag: Ln.bottomRight
                            }, {
                                x: n,
                                y: i,
                                width: this.vectorWidth,
                                height: this.vectorWidth,
                                tag: Ln.bottomLeft
                            }]
                        },
                        edgeFrame() {
                            return {
                                x: 0,
                                y: 0,
                                width: this.maxSize.width,
                                height: this.maxSize.height
                            }
                        },
                        safeEdgeFrame() {
                            return {
                                x: this.safeEdge,
                                y: this.safeEdge,
                                width: this.maxSize.width - 2 * this.safeEdge,
                                height: this.maxSize.height - 2 * this.safeEdge
                            }
                        }
                    },
                    watch: {
                        frame: {
                            handler: function(e) {
                                this.currentFrame = e
                            },
                            immediate: !0
                        }
                    },
                    mounted() {
                        this.registerEvents(!0), this.$nextTick(() => {
                            const e = this.$refs["floatBoardRef"],
                                t = e.getBoundingClientRect();
                            this.floatBoardSize = t, this.setFloatClass()
                        })
                    },
                    beforeMount() {
                        this.registerEvents(!1)
                    },
                    methods: {
                        maxRightEdgeX() {
                            const e = this.parentEl(),
                                t = e.getBoundingClientRect();
                            return Object(Fi["a"])(t) - this.floatBoardSize.width
                        },
                        maxBottomEdgeY() {
                            const e = this.parentEl(),
                                t = e.getBoundingClientRect(),
                                i = this.$refs["rootRef"];
                            Math.max(i.height, this.floatBoardSize.height);
                            return Object(Fi["b"])(t)
                        },
                        setFloatClass() {
                            let e = "",
                                t = this.currentFrame;
                            const i = this.safeEdgeFrame,
                                a = Object(Fi["a"])(i) - this.floatBoardSize.width,
                                n = Object(Fi["a"])(t);
                            e = n >= a ? "left-slot" : "right-slot", Object(Fi["b"])(t) >= Object(Fi["b"])(i) && (e += " bottom-slot"), this.floatClass = e
                        },
                        parentEl() {
                            return this.$parent.$el
                        },
                        registerEvents(e) {
                            e ? (Sn.addEventListener("onmousemove", this.onMousemove), Sn.addEventListener("onmouseup", this.onMouseup)) : (Sn.removeEventListener("onmousemove", this.onMousemove), Sn.removeEventListener("onmouseup", this.onMouseup))
                        },
                        rgba(e, t) {
                            if ("" == e) return "rgba(0,0,0,1)";
                            let i = Fn(e);
                            return 3 == i.length && i.push(t), 4 == i.length && (i[3] = t), "rgba(" + i.join(",") + ")"
                        },
                        onMousedown(e, t) {
                            this.canDragFaceFrame && (this.isDown = !0, this.downPoint = {
                                x: e.pageX,
                                y: e.pageY
                            }, this.curVecTag = t)
                        },
                        onMousemove(e) {
                            const t = this.curVecTag;
                            let i = e.pageX,
                                a = e.pageY,
                                n = this.currentFrame;
                            const o = this.safeEdgeFrame,
                                s = this.scale,
                                l = {
                                    x: (i - this.downPoint.x) / s,
                                    y: (a - this.downPoint.y) / s
                                };
                            if (this.isDown) {
                                this.$emit("onDragging", null), this.downPoint = {
                                    x: i,
                                    y: a
                                };
                                let e = n.x,
                                    s = n.y,
                                    r = n.width,
                                    c = n.height;
                                switch (t) {
                                    case Ln.topLeft: {
                                        e += l.x, s += l.y, r -= l.x, c -= l.y;
                                        let t = !1;
                                        if (r < this.minSize.width && (r = this.minSize.width, t = !0), c < this.minSize.height && (c = this.minSize.height, t = !0), t) {
                                            const t = {
                                                x: Object(Fi["a"])(n),
                                                y: Object(Fi["b"])(n)
                                            };
                                            e = t.x - r, s = t.y - c
                                        }
                                        const i = {
                                                x: e,
                                                y: s,
                                                width: r,
                                                height: c
                                            },
                                            a = Object(Fi["n"])(i, o);
                                        a && (e = Math.max(e, o.x), s = Math.max(s, o.y), r = Math.min(Object(Fi["a"])(o), Object(Fi["a"])(i)) - e, c = Math.min(Object(Fi["b"])(o), Object(Fi["b"])(i)) - s)
                                    }
                                    break;
                                    case Ln.topRight: {
                                        s += l.y, r += l.x, c -= l.y;
                                        let t = !1;
                                        if (r < this.minSize.width && (r = this.minSize.width, t = !0), c < this.minSize.height && (c = this.minSize.height, t = !0), t) {
                                            const e = {
                                                x: Object(Fi["c"])(n),
                                                y: Object(Fi["b"])(n)
                                            };
                                            s = e.y - c
                                        }
                                        const i = {
                                                x: e,
                                                y: s,
                                                width: r,
                                                height: c
                                            },
                                            a = Object(Fi["n"])(i, o);
                                        a && (e = Math.max(e, o.x), s = Math.max(s, o.y), r = Math.min(Object(Fi["a"])(o), Object(Fi["a"])(i)) - e, c = Math.min(Object(Fi["b"])(o), Object(Fi["b"])(i)) - s)
                                    }
                                    break;
                                    case Ln.bottomRight: {
                                        r += l.x, c += l.y, r < this.minSize.width && (r = this.minSize.width), c < this.minSize.height && (c = this.minSize.height);
                                        const t = {
                                                x: e,
                                                y: s,
                                                width: r,
                                                height: c
                                            },
                                            i = Object(Fi["n"])(t, o);
                                        i && (e = Math.max(e, o.x), s = Math.max(s, o.y), r = Math.min(Object(Fi["a"])(o), Object(Fi["a"])(t)) - e, c = Math.min(Object(Fi["b"])(o), Object(Fi["b"])(t)) - s)
                                    }
                                    break;
                                    case Ln.bottomLeft: {
                                        e += l.x, r -= l.x, c += l.y;
                                        let t = !1;
                                        if (r < this.minSize.width && (r = this.minSize.width, t = !0), c < this.minSize.height && (c = this.minSize.height, t = !0), t) {
                                            const t = {
                                                x: Object(Fi["a"])(n),
                                                y: Object(Fi["d"])(n)
                                            };
                                            e = t.x - r
                                        }
                                        const i = {
                                                x: e,
                                                y: s,
                                                width: r,
                                                height: c
                                            },
                                            a = Object(Fi["n"])(i, o);
                                        a && (e = Math.max(e, o.x), s = Math.max(s, o.y), r = Math.min(Object(Fi["a"])(o), Object(Fi["a"])(i)) - e, c = Math.min(Object(Fi["b"])(o), Object(Fi["b"])(i)) - s)
                                    }
                                    break;
                                    default:
                                        break
                                }
                                this.currentFrame = {
                                    x: e,
                                    y: s,
                                    width: r,
                                    height: c
                                }, this.setFloatClass(), this.$emit("onChange", [this.currentFrame.x, this.currentFrame.y, this.currentFrame.width, this.currentFrame.height])
                            }
                            if (this.isBodyDown) {
                                this.$emit("onDragging", null);
                                let e = this.currentFrame;
                                this.downPoint = {
                                    x: i,
                                    y: a
                                }, e.x += l.x, e.y += l.y, Object(Fi["c"])(e) <= Object(Fi["c"])(o) && (e.x = o.x), Object(Fi["d"])(e) <= Object(Fi["d"])(o) && (e.y = o.y), Object(Fi["b"])(e) >= Object(Fi["b"])(o) && (e.y = Object(Fi["b"])(o) - e.height), Object(Fi["a"])(e) >= Object(Fi["a"])(o) && (e.x = Object(Fi["a"])(o) - e.width), this.currentFrame = e, this.setFloatClass(), this.$emit("onChange", [e.x, e.y, e.width, e.height])
                            }
                        },
                        onMouseup(e) {
                            (this.isDown || this.isBodyDown) && this.$emit("onFinished", null);
                            this.curVecTag;
                            this.isDown = !1, this.isBodyDown = !1
                        },
                        onBodyMousedown(e) {
                            this.canDragFaceFrame && (this.isBodyDown = !0, this.downPoint = {
                                x: e.pageX,
                                y: e.pageY
                            })
                        }
                    }
                },
                An = Vn,
                Un = (i("5f45"), Object(ct["a"])(An, Bn, En, !1, null, "06163bcc", null)),
                $n = Un.exports,
                Hn = i("f0bd"),
                zn = i("ccd2");
            i("2204"), i("d9e2");
            const Wn = .75,
                qn = 10,
                Gn = !0,
                Kn = !0,
                Jn = !0,
                Yn = !1,
                Xn = 27,
                Zn = 37,
                Qn = 39,
                eo = "driver-page-overlay",
                to = "driver-highlighted-element-stage",
                io = "driver-popover-item",
                ao = "driver-highlighted-element",
                no = "driver-position-relative",
                oo = "driver-fix-stacking",
                so = "driver-stage-no-animation",
                lo = "driver-popover-tip",
                ro = "driver-popover-title",
                co = "driver-popover-description",
                uo = "driver-popover-footer",
                ho = "driver-close-btn",
                po = "driver-next-btn",
                fo = "driver-prev-btn",
                mo = "driver-disabled",
                go = "driver-close-only-btn",
                vo = "driver-navigation-btns",
                bo = "driver-step",
                yo = 300,
                wo = (e = "") => `\n  <div id="${io}" class="${e}">\n    <i class="driver-close-icon ${ho}"></i>\n    <div class="${lo}"></div>\n    <div class="${ro}">Popover Title</div>\n    <div class="${co}">Popover Description</div>\n    <div class="driver-clearfix ${uo}">\n      <span class="${bo}">0/0</span>\n      <span class="driver-btn-group ${vo}">\n        <button class="${fo}">&larr; Previous</button>\n        <button class="${po}">Next &rarr;</button>\n      </span>\n    </div>\n  </div>`,
                ko = `<div id="${eo}"></div>`,
                Co = `<div id="${to}"></div>`,
                xo = e => {
                    const t = document.createElement("div");
                    return t.innerHTML = e.trim(), t.firstChild
                },
                Po = (e, t, i = !1) => {
                    if (i) {
                        const i = ["", "-webkit-", "-ms-", "moz-", "-o-"];
                        for (let a = 0; a < i.length; a++) {
                            const n = i[a] + t,
                                o = Po(e, n);
                            if (o) return o
                        }
                        return ""
                    }
                    let a = "";
                    return e.currentStyle ? a = e.currentStyle[t] : document.defaultView && document.defaultView.getComputedStyle && (a = document.defaultView.getComputedStyle(e, null).getPropertyValue(t)), a && a.toLowerCase ? a.toLowerCase() : a
                },
                So = function(e) {
                    return e && "object" === typeof e && "nodeType" in e
                };
            class _o {
                constructor(e, t, i) {
                    this.options = e, this.highlightedElement = null, this.lastHighlightedElement = null, this.hideTimer = null, this.window = t, this.document = i, this.removeNode = this.removeNode.bind(this)
                }
                attachNode() {
                    let e = this.document.getElementById(eo);
                    e || (e = xo(ko), document.body.appendChild(e)), this.node = e, this.node.style.opacity = "0", this.options.animate || this.node.parentElement && this.node.parentElement.removeChild(this.node)
                }
                highlight(e) {
                    if (!e || !e.node) return void console.warn("Invalid element to highlight. Must be an instance of `Element`");
                    if (e.isSame(this.highlightedElement)) return;
                    this.window.clearTimeout(this.hideTimer), e.onHighlightStarted(), this.highlightedElement && !this.highlightedElement.isSame(this.lastHighlightedElement) && this.highlightedElement.onDeselected();
                    const t = e.getCalculatedPosition();
                    t.canHighlight() && (this.lastHighlightedElement = this.highlightedElement, this.highlightedElement = e, this.show(), this.highlightedElement.onHighlighted())
                }
                show() {
                    this.node && this.node.parentElement || (this.attachNode(), window.setTimeout(() => {
                        this.node.style.opacity = "" + this.options.opacity, this.node.style.position = "fixed", this.node.style.left = "0", this.node.style.top = "0", this.node.style.bottom = "0", this.node.style.right = "0"
                    }))
                }
                getHighlightedElement() {
                    return this.highlightedElement
                }
                getLastHighlightedElement() {
                    return this.lastHighlightedElement
                }
                clear(e = !1) {
                    if (this.options.onReset && this.options.onReset(this.highlightedElement), this.highlightedElement) {
                        const e = !0;
                        this.highlightedElement.onDeselected(e)
                    }
                    this.highlightedElement = null, this.lastHighlightedElement = null, this.node && (this.window.clearTimeout(this.hideTimer), this.options.animate && !e ? (this.node.style.opacity = "0", this.hideTimer = this.window.setTimeout(this.removeNode, yo)) : this.removeNode())
                }
                removeNode() {
                    this.node && this.node.parentElement && this.node.parentElement.removeChild(this.node)
                }
                refresh() {
                    this.highlightedElement && (this.highlightedElement.showPopover(), this.highlightedElement.showStage())
                }
            }
            class Oo {
                constructor({
                    left: e = 0,
                    top: t = 0,
                    right: i = 0,
                    bottom: a = 0
                } = {}) {
                    this.left = e, this.right = i, this.top = t, this.bottom = a
                }
                canHighlight() {
                    return this.left < this.right && this.top < this.bottom
                }
            }
            class Io {
                constructor({
                    node: e,
                    options: t,
                    popover: i,
                    stage: a,
                    overlay: n,
                    window: o,
                    document: s
                } = {}) {
                    this.node = e, this.document = s, this.window = o, this.options = t, this.overlay = n, this.popover = i, this.stage = a, this.animationTimeout = null
                }
                isInView() {
                    let e = this.node.offsetTop,
                        t = this.node.offsetLeft;
                    const i = this.node.offsetWidth,
                        a = this.node.offsetHeight;
                    let n = this.node;
                    while (n.offsetParent) n = n.offsetParent, e += n.offsetTop, t += n.offsetLeft;
                    return e >= this.window.pageYOffset && t >= this.window.pageXOffset && e + a <= this.window.pageYOffset + this.window.innerHeight && t + i <= this.window.pageXOffset + this.window.innerWidth
                }
                scrollManually() {
                    const e = this.node.getBoundingClientRect(),
                        t = e.top + this.window.pageYOffset,
                        i = t - this.window.innerHeight / 2;
                    this.window.scrollTo(0, i)
                }
                bringInView() {
                    if (this.node && !this.isInView())
                        if (this.node.scrollIntoView) try {
                            this.node.scrollIntoView(this.options.scrollIntoViewOptions || {
                                behavior: "instant",
                                block: "center"
                            })
                        } catch (e) {
                            this.scrollManually()
                        } else this.scrollManually()
                }
                getCalculatedPosition() {
                    const e = this.document.body,
                        t = this.document.documentElement,
                        i = this.window,
                        a = this.window.pageYOffset || t.scrollTop || e.scrollTop,
                        n = i.pageXOffset || t.scrollLeft || e.scrollLeft,
                        o = this.node.getBoundingClientRect();
                    return new Oo({
                        top: o.top + a,
                        left: o.left + n,
                        right: o.left + n + o.width,
                        bottom: o.top + a + o.height
                    })
                }
                getPopover() {
                    return this.popover
                }
                onDeselected(e = !1) {
                    this.hidePopover(), e && this.hideStage(), this.removeHighlightClasses(), this.window.clearTimeout(this.animationTimeout), this.options.onDeselected && this.options.onDeselected(this)
                }
                isSame(e) {
                    return !(!e || !e.node) && e.node === this.node
                }
                onHighlightStarted() {
                    this.options.onHighlightStarted && this.options.onHighlightStarted(this)
                }
                onHighlighted() {
                    const e = this;
                    e.isInView() || e.bringInView(), this.showPopover(), this.showStage(), this.addHighlightClasses(), this.options.onHighlighted && this.options.onHighlighted(this)
                }
                removeHighlightClasses() {
                    this.node.classList.remove(ao), this.node.classList.remove(no);
                    const e = this.document.querySelectorAll("." + oo);
                    for (let t = 0; t < e.length; t++) e[t].classList.remove(oo)
                }
                addHighlightClasses() {
                    this.node.classList.add(ao), this.canMakeRelative() && this.node.classList.add(no), this.fixStackingContext()
                }
                fixStackingContext() {
                    let e = this.node.parentNode;
                    while (e) {
                        if (!e.tagName || "body" === e.tagName.toLowerCase()) break;
                        const t = Po(e, "z-index"),
                            i = parseFloat(Po(e, "opacity")),
                            a = Po(e, "transform", !0),
                            n = Po(e, "transform-style", !0),
                            o = Po(e, "transform-box", !0),
                            s = Po(e, "filter", !0),
                            l = Po(e, "perspective", !0);
                        (/[0-9]+/.test(t) || i < 1 || a && "none" !== a || n && "flat" !== n || o && "border-box" !== o || s && "none" !== s || l && "none" !== l) && e.classList.add(oo), e = e.parentNode
                    }
                }
                canMakeRelative() {
                    const e = this.getStyleProperty("position"),
                        t = ["absolute", "fixed", "relative"];
                    return -1 === t.indexOf(e)
                }
                getStyleProperty(e) {
                    return Po(this.node, e)
                }
                showStage() {
                    this.stage.show(this.getCalculatedPosition())
                }
                getNode() {
                    return this.node
                }
                hideStage() {
                    this.stage.hide()
                }
                hidePopover() {
                    this.popover && this.popover.hide()
                }
                showPopover() {
                    if (!this.popover) return;
                    const e = this.getCalculatedPosition();
                    let t = yo;
                    this.options.animate && this.overlay.lastHighlightedElement || (t = 0), this.animationTimeout = this.window.setTimeout(() => {
                        this.popover.show(e)
                    }, t)
                }
                getFullPageSize() {
                    const e = this.document.body,
                        t = this.document.documentElement;
                    return {
                        height: Math.max(e.scrollHeight, e.offsetHeight, t.scrollHeight, t.offsetHeight),
                        width: Math.max(e.scrollWidth, e.offsetWidth, t.scrollWidth, t.offsetWidth)
                    }
                }
                getSize() {
                    return {
                        height: Math.max(this.node.scrollHeight, this.node.offsetHeight),
                        width: Math.max(this.node.scrollWidth, this.node.offsetWidth)
                    }
                }
            }
            class To extends Io {
                constructor(e, t, i) {
                    super(), this.options = {
                        isFirst: !0,
                        isLast: !0,
                        totalCount: 1,
                        currentIndex: 0,
                        offset: 0,
                        showButtons: !0,
                        showPreviewButton: !0,
                        doneBtnText: "Done",
                        startBtnText: "Next &rarr;",
                        nextBtnText: "Next &rarr;",
                        prevBtnText: "&larr; Previous",
                        ...e
                    }, this.window = t, this.document = i
                }
                attachNode() {
                    let e = this.document.getElementById(io);
                    e && e.parentElement.removeChild(e), e = xo(wo(this.options.className)), document.body.appendChild(e), this.node = e, this.tipNode = e.querySelector("." + lo), this.titleNode = e.querySelector("." + ro), this.descriptionNode = e.querySelector("." + co), this.footerNode = e.querySelector("." + uo), this.nextBtnNode = e.querySelector("." + po), this.prevBtnNode = e.querySelector("." + fo), this.closeBtnNode = e.querySelector("." + ho), this.driverStepNode = e.querySelector("." + bo)
                }
                getTitleNode() {
                    return this.titleNode
                }
                getDescriptionNode() {
                    return this.descriptionNode
                }
                hide() {
                    this.node && (this.node.style.display = "none")
                }
                setInitialState() {
                    this.node.style.display = "block", this.node.style.left = "0", this.node.style.top = "0", this.node.style.bottom = "", this.node.style.right = "", this.node.querySelector("." + lo).className = lo
                }
                show(e) {
                    switch (this.attachNode(), this.setInitialState(), this.titleNode.innerHTML = this.options.title || " ", this.options.title.trim() || (this.titleNode.style.display = "none"), this.descriptionNode.innerHTML = this.options.description || "", this.renderFooter(), this.options.position) {
                        case "left":
                        case "left-top":
                            this.positionOnLeft(e);
                            break;
                        case "left-center":
                            this.positionOnLeftCenter(e);
                            break;
                        case "left-bottom":
                            this.positionOnLeftBottom(e);
                            break;
                        case "right":
                        case "right-top":
                            this.positionOnRight(e);
                            break;
                        case "right-center":
                            this.positionOnRightCenter(e);
                            break;
                        case "right-bottom":
                            this.positionOnRightBottom(e);
                            break;
                        case "top":
                        case "top-left":
                            this.positionOnTop(e);
                            break;
                        case "top-center":
                            this.positionOnTopCenter(e);
                            break;
                        case "top-right":
                            this.positionOnTopRight(e);
                            break;
                        case "bottom":
                        case "bottom-left":
                            this.positionOnBottom(e);
                            break;
                        case "bottom-center":
                            this.positionOnBottomCenter(e);
                            break;
                        case "bottom-right":
                            this.positionOnBottomRight(e);
                            break;
                        case "mid-center":
                            this.positionOnMidCenter(e);
                            break;
                        case "auto":
                        default:
                            this.autoPosition(e);
                            break
                    }
                    this.bringInView()
                }
                renderFooter() {
                    this.nextBtnNode.innerHTML = this.options.nextBtnText, this.prevBtnNode.innerHTML = this.options.prevBtnText, this.driverStepNode.innerHTML = `${this.options.currentIndex+1}/${this.options.totalCount}`;
                    const e = this.options.totalCount && 1 !== this.options.totalCount;
                    this.options.showButtons ? (e ? (this.nextBtnNode.style.display = "inline-block", this.options.showPreviewButton ? this.prevBtnNode.style.display = "inline-block" : this.prevBtnNode.style.display = "none", this.closeBtnNode.classList.remove(go)) : (this.nextBtnNode.style.display = "none", this.prevBtnNode.style.display = "none", this.closeBtnNode.classList.add(go)), this.footerNode.style.display = "block", this.options.isFirst ? (this.prevBtnNode.classList.add(mo), this.nextBtnNode.innerHTML = this.options.startBtnText) : this.prevBtnNode.classList.remove(mo), this.options.isLast ? this.nextBtnNode.innerHTML = this.options.doneBtnText : this.nextBtnNode.innerHTML = this.options.nextBtnText) : this.footerNode.style.display = "none"
                }
                positionOnLeft(e) {
                    const t = this.getSize().width,
                        i = this.options.padding + 10;
                    this.node.style.left = e.left - t - i + "px", this.node.style.top = e.top + this.options.offset - this.options.padding + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("right")
                }
                positionOnLeftBottom(e) {
                    const t = this.getSize(),
                        i = t.width,
                        a = this.options.padding + 10;
                    this.node.style.left = e.left - i - a + "px", this.node.style.top = e.bottom + this.options.padding + this.options.offset - t.height + "px", this.node.style.bottom = "", this.node.style.right = "", this.tipNode.classList.add("right", "position-bottom")
                }
                positionOnLeftCenter(e) {
                    const t = this.getSize(),
                        i = t.width,
                        a = t.height,
                        n = a / 2,
                        o = this.options.padding + 10,
                        s = (e.bottom - e.top) / 2,
                        l = e.top - n + s + this.options.offset;
                    this.node.style.left = e.left - i - o + "px", this.node.style.top = l + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("right", "position-center")
                }
                positionOnRight(e) {
                    const t = this.options.padding + 10;
                    this.node.style.left = e.right + t + "px", this.node.style.top = e.top + this.options.offset - this.options.padding + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("left")
                }
                positionOnRightCenter(e) {
                    const t = this.getSize(),
                        i = this.options.padding + 10,
                        a = t.height,
                        n = a / 2,
                        o = (e.bottom - e.top) / 2,
                        s = e.top - n + o + this.options.offset;
                    this.node.style.left = e.right + i + "px", this.node.style.top = s + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("left", "position-center")
                }
                positionOnRightBottom(e) {
                    const t = this.options.padding + 10,
                        i = this.getSize();
                    this.node.style.left = e.right + t + "px", this.node.style.top = e.bottom + this.options.padding + this.options.offset - i.height + "px", this.node.style.bottom = "", this.node.style.right = "", this.tipNode.classList.add("left", "position-bottom")
                }
                positionOnTop(e) {
                    const t = this.getSize().height,
                        i = this.options.padding + 10;
                    this.node.style.top = e.top - t - i + "px", this.node.style.left = e.left - this.options.padding + this.options.offset + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("bottom")
                }
                positionOnTopCenter(e) {
                    const t = this.getSize(),
                        i = t.height,
                        a = t.width / 2,
                        n = this.options.padding + 10,
                        o = this.options.offset + e.left + (e.right - e.left) / 2;
                    this.node.style.top = e.top - i - n + "px", this.node.style.left = o - a - this.options.padding + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("bottom", "position-center")
                }
                positionOnTopRight(e) {
                    const t = this.getSize(),
                        i = t.height,
                        a = this.options.padding + 10;
                    this.node.style.top = e.top - i - a + "px", this.node.style.left = e.right + this.options.padding + this.options.offset - t.width + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("bottom", "position-right")
                }
                positionOnBottom(e) {
                    const t = this.options.padding + 10;
                    this.node.style.top = e.bottom + t + "px", this.node.style.left = e.left - this.options.padding + this.options.offset + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("top")
                }
                positionOnBottomCenter(e) {
                    const t = this.getSize().width / 2,
                        i = this.options.padding + 10,
                        a = this.options.offset + e.left + (e.right - e.left) / 2;
                    this.node.style.top = e.bottom + i + "px", this.node.style.left = a - t - this.options.padding + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("top", "position-center")
                }
                positionOnBottomRight(e) {
                    const t = this.getSize(),
                        i = this.options.padding + 10;
                    this.node.style.top = e.bottom + i + "px", this.node.style.left = e.right + this.options.padding + this.options.offset - t.width + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("top", "position-right")
                }
                positionOnMidCenter(e) {
                    const t = this.getSize(),
                        i = t.height,
                        a = t.width / 2,
                        n = i / 2,
                        o = (e.bottom - e.top) / 2,
                        s = e.top - n + o + this.options.offset,
                        l = this.options.offset + e.left + (e.right - e.left) / 2;
                    this.node.style.top = s + "px", this.node.style.left = l - a - this.options.padding + "px", this.node.style.right = "", this.node.style.bottom = "", this.tipNode.classList.add("mid-center")
                }
                autoPosition(e) {
                    const t = this.getFullPageSize(),
                        i = this.getSize(),
                        a = t.height,
                        n = i.height,
                        o = this.options.padding + 10,
                        s = e.bottom + n + o;
                    s >= a ? this.positionOnTop(e) : this.positionOnBottom(e)
                }
            }
            class Mo extends Io {
                constructor(e, t, i) {
                    super(), this.options = e, this.window = t, this.document = i
                }
                attachNode() {
                    let e = this.document.getElementById(to);
                    e || (e = xo(Co), document.body.appendChild(e)), this.node = e, this.options.animate ? this.node.classList.remove(so) : this.node.classList.add(so)
                }
                hide() {
                    this.node && this.node.parentElement && this.node.parentElement.removeChild(this.node)
                }
                setInitialStyle() {
                    this.node.style.display = "block", this.node.style.left = "0", this.node.style.top = "0", this.node.style.bottom = "", this.node.style.right = ""
                }
                show(e) {
                    this.attachNode(), this.setInitialStyle();
                    const t = 2 * this.options.padding,
                        i = e.right - e.left + t,
                        a = e.bottom - e.top + t;
                    this.node.style.display = "block", this.node.style.position = "absolute", this.node.style.width = i + "px", this.node.style.height = a + "px", this.node.style.top = e.top - t / 2 + "px", this.node.style.left = e.left - t / 2 + "px", this.node.style.backgroundColor = this.options.stageBackground
                }
            }
            class jo {
                constructor(e = {}) {
                    this.options = {
                        autoComplete: !1,
                        autocompleteWait: 5e3,
                        animate: Gn,
                        opacity: Wn,
                        padding: qn,
                        scrollIntoViewOptions: null,
                        allowClose: Kn,
                        keyboardControl: Jn,
                        overlayClickNext: Yn,
                        stageBackground: "#4d4d4d",
                        onHighlightStarted: () => null,
                        onHighlighted: () => null,
                        onDeselected: () => null,
                        onReset: () => null,
                        onNext: () => null,
                        onPrevious: () => null,
                        onCloseClicked: () => null,
                        onClose: () => null,
                        ...e
                    }, this.document = document, this.window = window, this.isActivated = !1, this.steps = [], this.currentStep = 0, this.currentMovePrevented = !1, this.autoCompleteTimer = 0, this.overlay = new _o(this.options, window, document), this.onResize = this.onResize.bind(this), this.onKeyUp = this.onKeyUp.bind(this), this.onClick = this.onClick.bind(this), this.moveNext = this.moveNext.bind(this), this.movePrevious = this.movePrevious.bind(this), this.preventMove = this.preventMove.bind(this), this.bind()
                }
                getSteps() {
                    return this.steps
                }
                setSteps(e) {
                    this.steps = e
                }
                bind() {
                    this.window.addEventListener("resize", this.onResize, !1), this.window.addEventListener("keyup", this.onKeyUp, !1), this.window.addEventListener("click", this.onClick, !1)
                }
                onClick(e) {
                    if (!this.isActivated || !this.hasHighlightedElement()) return;
                    e.stopPropagation();
                    const t = this.overlay.getHighlightedElement(),
                        i = this.document.getElementById(io),
                        a = t.node.contains(e.target),
                        n = i && i.contains(e.target);
                    if (!a && !n && this.options.overlayClickNext) return void this.handleNext();
                    if (!a && !n && this.options.allowClose) return void this.reset();
                    const o = e.target.classList.contains(po),
                        s = e.target.classList.contains(fo),
                        l = e.target.classList.contains(ho);
                    l ? this.handleCloseClicked() : o ? this.handleNext() : s && this.handlePrevious()
                }
                onResize() {
                    this.isActivated && this.refresh()
                }
                refresh() {
                    this.overlay.refresh()
                }
                onKeyUp(e) {
                    if (!this.isActivated || !this.options.keyboardControl) return;
                    if (e.keyCode === Xn) return void this.reset();
                    const t = this.getHighlightedElement();
                    t && t.popover && (e.keyCode === Qn ? this.handleNext() : e.keyCode === Zn && this.handlePrevious())
                }
                movePrevious() {
                    const e = this.steps[this.currentStep - 1];
                    e ? (this.overlay.highlight(e), this.currentStep -= 1, this.resetAutoCompleteTimer()) : this.reset()
                }
                preventMove() {
                    this.currentMovePrevented = !0
                }
                handleNext() {
                    this.currentMovePrevented = !1;
                    const e = this.steps[this.currentStep];
                    e && e.options && e.options.onNext && e.options.onNext(this.overlay.highlightedElement), this.currentMovePrevented || this.moveNext()
                }
                handlePrevious() {
                    this.currentMovePrevented = !1;
                    const e = this.steps[this.currentStep];
                    e && e.options && e.options.onPrevious && e.options.onPrevious(this.overlay.highlightedElement), this.currentMovePrevented || this.movePrevious()
                }
                moveNext() {
                    const e = this.steps[this.currentStep + 1];
                    e ? (this.overlay.highlight(e), this.currentStep += 1, this.resetAutoCompleteTimer()) : this.reset()
                }
                handleCloseClicked() {
                    const e = this.steps[this.currentStep];
                    e && e.options && e.options.onCloseClicked && e.options.onCloseClicked(this.overlay.highlightedElement), this.reset()
                }
                hasNextStep() {
                    return !!this.steps[this.currentStep + 1]
                }
                hasPreviousStep() {
                    return !!this.steps[this.currentStep - 1]
                }
                reset(e = !1) {
                    this.currentStep = 0, this.isActivated = !1, this.overlay.clear(e), this.options.onClose && this.options.onClose(), this.clearAutoCompleteTimer()
                }
                hasHighlightedElement() {
                    const e = this.overlay.getHighlightedElement();
                    return e && e.popover
                }
                getHighlightedElement() {
                    return this.overlay.getHighlightedElement()
                }
                getLastHighlightedElement() {
                    return this.overlay.getLastHighlightedElement()
                }
                defineSteps(e) {
                    this.steps = [];
                    for (let t = 0; t < e.length; t++) {
                        const i = this.prepareElementFromStep(e[t], e, t);
                        i && this.steps.push(i)
                    }
                }
                prepareElementFromStep(e, t = [], i = 0) {
                    let a = {
                            ...this.options
                        },
                        n = e;
                    const o = "string" !== typeof e && !So(e);
                    if (!e || o && !e.element) throw new Error("Element is required in step " + i);
                    o && (n = e.element, a = {
                        ...this.options,
                        ...e
                    });
                    const s = So(n) ? n : this.document.querySelector(n);
                    if (!s) return console.warn(`Element to highlight ${n} not found`), null;
                    let l = null;
                    if (a.popover) {
                        const e = [this.options.className, a.popover.className].filter(e => e).join(" "),
                            n = {
                                ...a,
                                ...a.popover,
                                className: e,
                                totalCount: t.length,
                                currentIndex: i,
                                isFirst: 0 === i,
                                isLast: 0 === t.length || i === t.length - 1
                            };
                        l = new To(n, this.window, this.document)
                    }
                    const r = {
                            ...a
                        },
                        c = new Mo(r, this.window, this.document);
                    return new Io({
                        node: s,
                        options: a,
                        popover: l,
                        stage: c,
                        overlay: this.overlay,
                        window: this.window,
                        document: this.document
                    })
                }
                start(e = 0) {
                    if (!this.steps || 0 === this.steps.length) throw new Error("There are no steps defined to iterate");
                    this.isActivated = !0, this.currentStep = e, this.overlay.highlight(this.steps[e]), this.resetAutoCompleteTimer()
                }
                highlight(e) {
                    this.isActivated = !0;
                    const t = this.prepareElementFromStep(e);
                    t && this.overlay.highlight(t)
                }
                clearAutoCompleteTimer() {
                    this.autoCompleteTimer && (clearTimeout(this.autoCompleteTimer), this.autoCompleteTimer = 0)
                }
                resetAutoCompleteTimer() {
                    this.options.autoComplete && (this.clearAutoCompleteTimer(), this.autoCompleteTimer = setTimeout(() => {
                        this.autoCompleteTimer = 0;
                        const e = this.getHighlightedElement();
                        e && e.popover && this.handleNext()
                    }, this.options.autocompleteWait))
                }
            }
            var Do, Ro = i("74d8");
            (function(e) {
                e["ManualFaceFrameId"] = "guide__manual_face_frame"
            })(Do || (Do = {}));
            let No = !1;

            function Bo() {
                const {
                    PointGuideImgAdjust: e,
                    PointGuideBackground: t,
                    PointGuideHistory: i
                } = Object(un["a"])(), a = () => {
                    localStorage.setItem(F["b"].Refine_ManualFaceBatchSelect, Ro["a"])
                }, n = [{
                    element: "#" + Do.ManualFaceFrameId,
                    popover: {
                        className: "first-step-popover-class",
                        title: "",
                        description: `按住  ${No?"ctrl":"command ⌘"} + 鼠标点击，可多选人脸，支持批量修改性别/删除`,
                        position: "bottom-center"
                    },
                    onNext: () => null
                }];
                let o = 0;
                const s = Object(l["ref"])(null),
                    r = () => {
                        const e = localStorage.getItem(F["b"].Refine_ManualFaceBatchSelect);
                        e || (o = setTimeout(() => {
                            s.value = new jo({
                                autoComplete: !0,
                                nextBtnText: "",
                                doneBtnText: "",
                                padding: 2,
                                opacity: .4,
                                allowClose: !0,
                                showPreviewButton: !1,
                                keyboardControl: !1,
                                autocompleteWait: 2e6,
                                stageBackground: "#00000000",
                                position: "bottom-center",
                                className: "refine__face-guide",
                                onCloseClicked: () => a(),
                                onClose: () => {
                                    et["c"].getInstance().process([et["b"].Mouse, et["b"].KeyBoard], !0)
                                }
                            }), s.value.defineSteps(n), Object(l["nextTick"])(() => {
                                var e;
                                Object(rn["a"])(10).then(() => {
                                    const e = document.getElementsByClassName("driver-popover-footer")[0];
                                    e.style.display = "none"
                                }), et["c"].getInstance().process([et["b"].Mouse, et["b"].KeyBoard], !1), null === (e = s.value) || void 0 === e || e.start(), a()
                            })
                        }, 300))
                    };
                return {
                    handleGuideStart: r,
                    destroy: () => {
                        o && (clearTimeout(o), o = 0), s.value = null
                    }
                }
            }
            const Eo = .5,
                Fo = 64,
                Lo = 5;

            function Vo(e, t, i) {
                let a = 0,
                    n = 0,
                    o = 0,
                    s = 0,
                    l = 0;
                if (e.length > 0) {
                    for (const a of e) a.deleted || (s += a.faceBoxNormalized[2] * t, l += a.faceBoxNormalized[3] * i, o++);
                    o > 0 && (a = s / o, n = l / o)
                }
                return a && n || (a = Fo, n = Fo), {
                    width: a,
                    height: n
                }
            }

            function Ao(e, t, i) {
                const a = (t - e.width) / 2,
                    n = (i - e.height) / 2;
                return [a, n, e.width, e.height]
            }
            var Uo, $o = Object(l["defineComponent"])({
                    name: "ImportAgeSexReviseFaceBox",
                    mixins: [d["a"]],
                    components: {
                        "el-select": w["Select"],
                        "el-option": w["Option"],
                        "el-tooltip": w["Tooltip"],
                        "el-popover": w["Popover"],
                        "el-dropdown": w["Dropdown"],
                        "el-dropdown-menu": w["DropdownMenu"],
                        "el-dropdown-item": w["DropdownItem"],
                        "face-resize-frame": $n
                    },
                    props: {
                        faceData: {
                            type: Array,
                            default: () => []
                        },
                        canvasWidth: {
                            type: Number,
                            default: 0
                        },
                        canvasHeight: {
                            type: Number,
                            default: 0
                        },
                        refineUUID: {
                            type: String,
                            default: ""
                        },
                        scale: {
                            type: Number,
                            default: 1
                        }
                    },
                    setup() {
                        const {
                            PointAddAFace: e,
                            PointAddAFaceFinish: t
                        } = Object(un["a"])();
                        return {
                            PointAddAFace: e,
                            PointAddAFaceFinish: t
                        }
                    },
                    data() {
                        let e = (e = 0, t = 0) => () => {
                            let e = this.$refs["faceResizeRef"],
                                t = e.$el;
                            return {
                                width: t.clientWidth,
                                height: t.clientHeight,
                                top: this.newFaceDataViewModel.faceBox[1] - 6,
                                right: this.newFaceDataViewModel.faceBox[0] + t.clientWidth / 2,
                                bottom: 0,
                                left: this.newFaceDataViewModel.faceBox[0] + t.clientWidth / 2
                            }
                        };
                        return {
                            options: [{
                                value: "Male",
                                label: "男"
                            }, {
                                value: "Female",
                                label: "女"
                            }, {
                                value: "Child",
                                label: "儿童"
                            }, {
                                value: "Older",
                                label: "长辈"
                            }],
                            noCompleteRatio: 1,
                            borderDiv: ["borderTL", "borderTR", "borderBL", "borderBR"],
                            faceDataTemp: [],
                            newFaceDataViewModel: null,
                            isFaceMarkLoading: !1,
                            isFaceMarkWarning: !1,
                            canShowInitAddTooltip: !1,
                            canShowFaceConfirm: !0,
                            popperObject: null,
                            virtualTipElement: {
                                contextElement: null,
                                getBoundingClientRect: e()
                            },
                            selectedColor: "#1677FF",
                            selectedBorderWidth: 2,
                            canDragFaceFrame: !0,
                            selectedPersons: [],
                            PersonType: {
                                Male: F["e"].Male,
                                Female: F["e"].Female,
                                Child: F["e"].Child,
                                Older: F["e"].Older
                            },
                            isFaceChanged: !1,
                            pendingToSavePersons: {},
                            batchSelectSexVal: "",
                            ManualFaceFrameId: Do.ManualFaceFrameId,
                            InActiveAlpha: .4,
                            PersonBioItemStatus: {
                                ..._n
                            }
                        }
                    },
                    watch: {
                        faceData: {
                            handler(e) {
                                if (e && e.length > 0) {
                                    const t = JSON.parse(JSON.stringify(e));
                                    this.initFaceData(t)
                                }
                            }
                        },
                        isFaceMarkLoading: {
                            handler(e) {
                                this.canDragFaceFrame = !e
                            }
                        },
                        selectedPersons: {
                            handler(e) {
                                if (e.length >= 1 && this.faceDataTemp.length > Lo) {
                                    const {
                                        handleGuideStart: e
                                    } = Bo();
                                    e()
                                }
                            }
                        },
                        newFaceDataViewModel: {
                            handler(e) {
                                this.$emit("onStatusChanged", this.isPending)
                            },
                            immediate: !0
                        }
                    },
                    computed: {
                        isPending() {
                            return this.newFaceDataViewModel && (this.newFaceDataViewModel.status == _n.Pending || this.newFaceDataViewModel.status == _n.Init)
                        },
                        canShowFaceMarkToolTip() {
                            if (!this.newFaceDataViewModel) return !1;
                            const e = this.newFaceDataViewModel.status;
                            let t = !1;
                            return e === _n.Init && (t = !this.canShowInitAddTooltip), e === _n.Pending && (this.isFaceMarkLoading || this.isFaceMarkWarning) && (t = !0), t
                        },
                        faceMarkTooltipText() {
                            if (!this.newFaceDataViewModel) return "";
                            const e = this.newFaceDataViewModel.status;
                            switch (e) {
                                case _n.Init:
                                    return "移动并缩放人脸至人脸框"
                            }
                            return this.isFaceMarkLoading ? "正在识别中..." : this.isFaceMarkWarning ? "此位置已有人脸" : ""
                        },
                        tooltipBgColor() {
                            if (!this.newFaceDataViewModel) return "";
                            const e = this.newFaceDataViewModel.status;
                            return e === _n.Init || this.isFaceMarkLoading ? "#232324" : this.isFaceMarkWarning ? "#D95838" : ""
                        },
                        outColor() {
                            const e = "#ffffff",
                                t = "#D95838";
                            return this.newFaceDataViewModel && this.isFaceMarkWarning ? t : e
                        },
                        newFaceFramePendingBorderColor() {
                            const e = "#00000033";
                            return e
                        }
                    },
                    methods: {
                        bottomToolRef() {
                            return this.$refs["bottomToolRef"]
                        },
                        async getCurrentImageId() {
                            let e = r["a"].state.thumbnail.activeThumbnail.imgPath,
                                t = await zn["a"].getViewModel(e);
                            return t.thumbnailModel.id
                        },
                        calcSelects() {
                            this.selectedPersons = this.faceDataTemp.filter(e => !e.deleted && e.isSelected)
                        },
                        onBottomGroupSexItemChoosed(e) {
                            for (let i of this.selectedPersons) i.personType = e, i.changed = !0, e === F["e"].Male && (i.age = 20, i.gender = 1), i.personType === F["e"].Female && (i.age = 20, i.gender = 2), i.personType === F["e"].Child && (i.age = 1, i.gender = 1), i.personType === F["e"].Older && (i.age = 100, i.gender = 1);
                            let t = [];
                            for (const i of this.faceDataTemp) t.push(i.toJson());
                            this.$emit("callBackPersonType", {
                                changedFaceData: this.selectedPersons,
                                faceDataTemp: t
                            })
                        },
                        onBatchSexClick: Object(g["debounce"])((function(e) {
                            const t = this.$refs.sexSelectorRef;
                            t && t.$el && t.$el.click()
                        }), 10),
                        onDeleteFaces() {
                            const e = this.selectedPersons.length;
                            if (0 == e) return;
                            const t = 1 == e ? "确认删除该人脸" : `确认删除${e}个人脸`,
                                i = "删除后，调整效果将不会应用于该人脸上";
                            this.tsConfirm({
                                title: t,
                                message: i,
                                customMessageStyle: "textAlign: center"
                            }).then(async e => {
                                let t = {};
                                for (const n of this.selectedPersons) {
                                    t["" + n.id] = n.toJson();
                                    for (let e = 0; e < this.faceDataTemp.length; e++) {
                                        const t = this.faceDataTemp[e];
                                        n.id == t.id && (n.changed = !0, 0 == n.isManual ? n.deleted = !0 : this.faceDataTemp.splice(e, 1))
                                    }
                                }
                                const i = this.selectedPersons.length;
                                let a = [];
                                for (const n of this.faceDataTemp) a.push(n.toJson());
                                this.isFaceChanged = !0, await o["c"].removeFace(this.refineUUID, t, await this.getCurrentImageId()), this.selectedPersons = [], this.$emit("onFaceDeleted", {
                                    deletedFaces: this.selectedPersons,
                                    faceDataTemp: a
                                }), this.PointAddAFaceFinish(`face${i}_delete`)
                            }).catch(e => {})
                        },
                        clearSelects() {
                            this.selectedPersons = this.faceDataTemp.filter(e => (e.isSelected = !1, !e.deleted && e.isSelected))
                        },
                        async removePendingManualFacesWhenDialogClosed() {
                            await o["c"].removeFace(this.refineUUID, this.pendingToSavePersons, await this.getCurrentImageId())
                        },
                        onNormalFaceFrameClick(e) {
                            this.newFaceDataViewModel || (this.clearSelects(), e.isSelected = !0, this.calcSelects())
                        },
                        onNormalFaceFrameMetaClick(e, t) {
                            if (this.newFaceDataViewModel) return;
                            const i = t && this.$isMac || !t && this.$isWin;
                            i && (e.isSelected = !e.isSelected), this.calcSelects()
                        },
                        getNewFaceFrameNormalized() {
                            const e = this.canvasWidth,
                                t = this.canvasHeight,
                                i = this.newFaceDataViewModel.getFaceRect(),
                                a = i.x,
                                n = i.y,
                                o = i.width,
                                s = i.height,
                                l = [a / e, n / t, o / e, s / t];
                            return l
                        },
                        isFaceRectIntersect() {
                            let e = !1;
                            if (!this.newFaceDataViewModel) return e;
                            const t = {
                                x: this.newFaceDataViewModel.faceBox[0],
                                y: this.newFaceDataViewModel.faceBox[1],
                                width: this.newFaceDataViewModel.faceBox[2],
                                height: this.newFaceDataViewModel.faceBox[3]
                            };
                            for (const i of this.faceDataTemp) {
                                if (i.deleted) continue;
                                let a = {
                                    x: i.faceBoxNormalized[0] * this.canvasWidth,
                                    y: i.faceBoxNormalized[1] * this.canvasHeight,
                                    width: i.faceBoxNormalized[2] * this.canvasWidth,
                                    height: i.faceBoxNormalized[3] * this.canvasHeight
                                };
                                const n = Object(rn["b"])(a, t);
                                if (n) {
                                    const t = a.width * a.height,
                                        i = n.width * n.height;
                                    if (i / t > Eo) {
                                        e = !0;
                                        break
                                    }
                                }
                            }
                            return e
                        },
                        onNewFaceFrameChanged(e) {
                            this.newFaceDataViewModel.faceBox = e, this.canShowInitAddTooltip = !0, this.canShowFaceConfirm = !1, this.newFaceDataViewModel.status = _n.Pending, this.isFaceMarkWarning = this.isFaceRectIntersect(), this.popperObject && this.popperObject.update()
                        },
                        onNewFaceChangeFinished() {
                            this.canShowFaceConfirm = !0
                        },
                        async onFaceConfirm() {
                            if (this.isFaceMarkWarning = this.isFaceRectIntersect(), this.newFaceDataViewModel.status = _n.Pending, this.isFaceMarkWarning) return void this.resetToolTip();
                            this.isFaceMarkLoading = !0, this.resetToolTip(), this.newFaceDataViewModel.faceBoxNormalized = this.getNewFaceFrameNormalized();
                            const e = this.refineUUID,
                                t = await this.getCurrentImageId(),
                                i = [this.newFaceDataViewModel.toJson()];
                            let a = [];
                            for (const o of this.faceDataTemp) a.push(o.id);
                            let n = await o["c"].updateFace(e, i, a, t);
                            if (this.isFaceMarkLoading = !1, n.length > 0) {
                                this.isFaceChanged = !0, this.newFaceDataViewModel.status = _n.Approved, this.newFaceDataViewModel.bindFromConfirm(new Rn["a"](n[0]));
                                const e = this.newFaceDataViewModel;
                                this.faceDataTemp.push(e), this.saveFace(this.faceDataTemp.length - 1), this.pendingToSavePersons[e.id] = e.toJson(), this.newFaceDataViewModel = null, this.PointAddAFaceFinish("face1_add")
                            }
                            this.resetToolTip(), this.$nextTick(() => {
                                this.selfAdaptionFaceBox()
                            })
                        },
                        onFaceReject() {
                            this.newFaceDataViewModel.status = _n.Cancelled, this.newFaceDataViewModel = null, this.isFaceMarkLoading = !1
                        },
                        initFaceData(e) {
                            this.faceDataTemp = [], this.selectedPersons = [];
                            for (const t of e) {
                                let e = new Nn(new Rn["a"](t));
                                t.hasOwnProperty("isSelected") && (e.isSelected = t.isSelected), t.hasOwnProperty("status") && (e.status = t.status);
                                let i = !(e.deleted && e.isManual);
                                i && this.faceDataTemp.push(e), t.isSelected && 0 == e.deleted && this.selectedPersons.push(e)
                            }
                        },
                        resetToolTip() {
                            this.$nextTick(() => {
                                let e = this.$refs["faceResizeRef"],
                                    t = this.$refs["myTooltipRef"];
                                e && e.$el && (this.virtualTipElement.contextElement = e.$el, this.popperObject = new Hn["a"](this.virtualTipElement, t, {
                                    placement: "top",
                                    modifiers: [{
                                        name: "offset",
                                        options: {
                                            offset: [0, 0]
                                        }
                                    }]
                                }))
                            })
                        },
                        onAddFaceFrameClick() {
                            if (this.PointAddAFace(), this.newFaceDataViewModel) return;
                            this.canShowInitAddTooltip = !1;
                            const e = Vo(this.faceDataTemp, this.canvasWidth, this.canvasHeight);
                            this.newFaceDataViewModel = Nn.Create(), this.newFaceDataViewModel.fbrFileName = Nn.CreateFbrFileName(), this.newFaceDataViewModel.status = _n.Init, this.newFaceDataViewModel.isManual = !0, this.newFaceDataViewModel.add = !0, this.newFaceDataViewModel.changed = !0, this.newFaceDataViewModel.faceBox = Ao(e, this.canvasWidth, this.canvasHeight), this.resetToolTip()
                        },
                        isSelect(e, t) {
                            if (t >= 0)
                                for (let i = 0; i < this.faceDataTemp.length; i++) {
                                    if (i != t) {
                                        let e = this.faceDataTemp[i];
                                        e.isSelected = !1
                                    }
                                    this.calcSelects()
                                }
                            e && this.$nextTick(() => {
                                const e = document.getElementsByClassName("sex-select");
                                for (let t = 0; t < e.length; t++) {
                                    const i = e[t].parentElement.clientWidth,
                                        a = e[t].clientWidth;
                                    e[t].style.left = i / 2 - a / 2 + "px"
                                }
                            })
                        },
                        refreshPage(e, t, i) {
                            i.changed = !0, e && this.saveFace(t)
                        },
                        saveFace(e) {
                            "Male" === this.faceDataTemp[e].personType && (this.faceDataTemp[e].age = 20, this.faceDataTemp[e].gender = 1, this.faceDataTemp[e].index = e), "Female" === this.faceDataTemp[e].personType && (this.faceDataTemp[e].age = 20, this.faceDataTemp[e].gender = 2, this.faceDataTemp[e].index = e), "Child" === this.faceDataTemp[e].personType && (this.faceDataTemp[e].age = 1, this.faceDataTemp[e].gender = 1, this.faceDataTemp[e].index = e), "Older" === this.faceDataTemp[e].personType && (this.faceDataTemp[e].age = 100, this.faceDataTemp[e].gender = 1, this.faceDataTemp[e].index = e);
                            let t = [];
                            for (const a of this.faceDataTemp) t.push(a.toJson());
                            let i = this.faceDataTemp[e].toJson();
                            this.$emit("callBackPersonType", {
                                isFaceChanged: this.isFaceChanged,
                                changedFaceData: [i],
                                faceDataTemp: t
                            })
                        },
                        selfAdaptionFaceBox() {
                            this.$nextTick(() => {
                                const e = document.getElementsByClassName("change_sex");
                                for (let t = 0; t < e.length; t++) {
                                    let i = e[t].clientHeight;
                                    i < 30 && (i *= 1.4), e[t].style.top = "-" + i + "px", this.handle_noComplete_face(i, t)
                                }
                            })
                        },
                        handle_noComplete_face(e, t) {
                            let i = this.faceDataTemp[t].faceBox[1];
                            if (i - e < 0) {
                                let t = this.canvasHeight / (2 * (e + Math.abs(i)) + +this.canvasHeight);
                                this.noCompleteRatio > t && (this.noCompleteRatio = t, this.$emit("noComplete_toScale", t))
                            }
                        },
                        changePersonBoxPosition(e) {
                            const t = this.$refs["personBox"];
                            t.style.position = "absolute", e.left && (t.style.left = e.left + "px"), e.top && (t.style.top = e.top + "px")
                        },
                        attachBottomTool() {
                            let e = this.$el,
                                t = null;
                            while (e = e.parentElement) {
                                const i = e.className;
                                if (i.indexOf("el-dialog__body") > 0) {
                                    t = e;
                                    break
                                }
                            }
                            t && this.bottomToolRef() && t.appendChild(this.bottomToolRef())
                        }
                    },
                    mounted() {
                        this.attachBottomTool()
                    },
                    beforeMount() {
                        const {
                            destroy: e
                        } = Bo();
                        e()
                    }
                }),
                Ho = $o,
                zo = (i("2f87"), i("60d8"), Object(ct["a"])(Ho, jn, Dn, !1, null, "98c4f034", null)),
                Wo = zo.exports;

            function qo() {
                const {
                    PointGuideImgAdjust: e,
                    PointGuideBackground: t,
                    PointGuideHistory: i
                } = Object(un["a"])(), a = () => {
                    localStorage.setItem(F["b"].Refine_ManualFace, Ro["a"])
                }, n = [{
                    element: "#" + Uo.ManualFaceId,
                    popover: {
                        className: "first-step-popover-class",
                        title: "",
                        description: "未识别的人脸支持手动选择了",
                        position: "bottom-center"
                    },
                    onNext: () => null
                }];
                let o = 0;
                const s = Object(l["ref"])(null),
                    r = () => {
                        const e = localStorage.getItem(F["b"].Refine_ManualFace);
                        e || (o = setTimeout(() => {
                            s.value = new jo({
                                autoComplete: !0,
                                nextBtnText: "",
                                doneBtnText: "",
                                padding: 2,
                                opacity: .4,
                                allowClose: !0,
                                showPreviewButton: !1,
                                keyboardControl: !1,
                                autocompleteWait: 2e6,
                                stageBackground: "#00000000",
                                position: "bottom-center",
                                className: "refine__face-guide",
                                onCloseClicked: () => a(),
                                onClose: () => {
                                    et["c"].getInstance().process([et["b"].Mouse, et["b"].KeyBoard], !0)
                                }
                            }), s.value.defineSteps(n), Object(l["nextTick"])(() => {
                                var e;
                                Object(rn["a"])(10).then(() => {
                                    const e = document.getElementsByClassName("driver-popover-footer")[0];
                                    e.style.display = "none"
                                }), et["c"].getInstance().process([et["b"].Mouse, et["b"].KeyBoard], !1), null === (e = s.value) || void 0 === e || e.start(), a()
                            })
                        }, 300))
                    };
                return {
                    handleGuideStart: r,
                    destroy: () => {
                        o && (clearTimeout(o), o = 0), s.value = null
                    }
                }
            }(function(e) {
                e["ManualFaceId"] = "guide__manual_face"
            })(Uo || (Uo = {}));
            var Go = Object(l["defineComponent"])({
                    components: {
                        "el-dialog": hn["a"],
                        "el-button": w["Button"],
                        ImportAgeSexReviseItem: Mn,
                        ImportAgeSexReviseBox: Wo
                    },
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        },
                        personTypeTab: {
                            type: String,
                            default: ""
                        },
                        refineUUID: {
                            type: String,
                            default: ""
                        }
                    },
                    setup() {
                        const {
                            PointAddAFace: e,
                            PointAddAFaceFinish: t
                        } = Object(un["a"])();
                        return {
                            PointAddAFace: e,
                            PointAddAFaceFinish: t
                        }
                    },
                    data() {
                        return {
                            faceData: null,
                            canvasWidth: 0,
                            canvasHeight: 0,
                            dialogWidth: 0,
                            dialogHeight: 0,
                            dialogTop: 0,
                            headHeight: 51,
                            footHeight: 55,
                            visible: !1,
                            personType: null,
                            isPersonBioChanged: !1,
                            newPersonType: null,
                            ageSexReviseImageData: null,
                            scaleRatioWidth: null,
                            scaleRatioHeight: null,
                            isUpdateType: !1,
                            imageData: null,
                            isLoadSuccess: !1,
                            manualFaceGuidId: Uo.ManualFaceId,
                            isConfirm: !1,
                            isFacePending: !1,
                            scale: 1,
                            oldFaceData: null
                        }
                    },
                    computed: {},
                    mixins: [d["a"]],
                    watch: {
                        value: {
                            handler(e) {
                                if (this.visible = e, e) {
                                    this.oldFaceData = this.$store.state.ageSexRevise.originFaceData;
                                    const {
                                        handleGuideStart: e
                                    } = qo();
                                    e(), this.initData(!0), o["c"].handleEnableUndoRedo(!1)
                                } else o["c"].handleEnableUndoRedo(!0)
                            },
                            immediate: !0
                        }
                    },
                    methods: {
                        ...Object(c["b"])(["saveFaceData", "callDeleteImage", "sexReport", "getImageData", "getImageSize"]),
                        async initData(e) {
                            try {
                                let t = await this.getImageSize();
                                this.dialogWidth = null === t || void 0 === t ? void 0 : t.dialogWidth, this.dialogHeight = null === t || void 0 === t ? void 0 : t.dialogHeight, this.canvasWidth = null === t || void 0 === t ? void 0 : t.canvasWidth, this.canvasHeight = null === t || void 0 === t ? void 0 : t.canvasHeight, this.ageSexReviseImageData = await this.getImageData();
                                let i = this.headHeight + this.dialogHeight + this.footHeight;
                                this.dialogTop = (document.documentElement.clientHeight - i) / 2, this.isLoadSuccess = !0, e && this.render()
                            } catch (t) {
                                e && (this.tsNotify("年龄数据加载失败或识别不出来,后续处理"), this.onClose()), console.log("年龄数据加载失败", t)
                            }
                        },
                        render() {
                            this.$nextTick(async () => {
                                this.clearUpData(), await this.drawCanvas(), this.faceData = this.ageSexReviseImageData.face, this.$refs["ImportAgeSexReviseBox"].selfAdaptionFaceBox()
                            })
                        },
                        async onSubmit() {
                            if (this.isConfirm = !0, this.isPersonBioChanged) {
                                let e = [];
                                for (const t of this.faceData) e.push(new Rn["a"](t));
                                await this.saveFaceData(e).then(() => {
                                    this.$emit("changeFaceData")
                                }), this.newPersonType && (this.$emit("update:personTypeTab", this.newPersonType), this.newPersonType = null)
                            }
                        },
                        onBodyClick() {
                            this.$refs["ImportAgeSexReviseBox"].clearSelects()
                        },
                        onClose() {
                            const e = document.getElementById("popupCanvas");
                            if (e) {
                                const t = e.getContext("2d");
                                t && t.clearRect(0, 0, e.width, e.height)
                            }
                            this.visible = !1, this.$emit("update:value", !1), this.ageSexReviseImageData = null, this.faceData = null, this.isConfirm || this.$refs["ImportAgeSexReviseBox"].removePendingManualFacesWhenDialogClosed(), this.isPersonBioChanged && this.sexReport(this.oldFaceData)
                        },
                        clearUpData() {
                            const e = document.getElementById("centerInfo");
                            e.style.left = "0", e.style.top = "0", this.$refs.centerInfo.style.transform = "scale(1)", this.$refs.centerInfo.style.transformOrigin = "0 0", this.scaleRatioHeight = 1, this.scaleRatioWidth = 1
                        },
                        async drawCanvas() {
                            let e = this.$refs.popupCanvas,
                                t = this.imageData = this.ageSexReviseImageData.data,
                                i = this.ageSexReviseImageData.width,
                                a = this.ageSexReviseImageData.height,
                                n = e.getContext("2d"),
                                o = window.devicePixelRatio || 1,
                                s = new Image;
                            s.src = t, s.onload = () => {
                                e.width = this.canvasWidth * o, e.height = this.canvasHeight * o, n.drawImage(s, 0, 0, i, a, 0, 0, this.canvasWidth * o, this.canvasHeight * o);
                                let t = 1 / o;
                                if (e.style.transform = "scale(" + t + "," + t + ")", e.style.transformOrigin = "0 0", this.canvasWidth !== this.dialogWidth) {
                                    let t = -this.canvasWidth / 2 + this.dialogWidth / 2;
                                    e.style.position = "absolute", e.style.left = t + "px", this.$refs["ImportAgeSexReviseBox"].changePersonBoxPosition({
                                        left: t
                                    })
                                }
                                if (this.canvasHeight !== this.dialogHeight) {
                                    let t = -this.canvasHeight / 2 + this.dialogHeight / 2;
                                    e.style.position = "absolute", e.style.top = t + "px", this.$refs["ImportAgeSexReviseBox"].changePersonBoxPosition({
                                        top: t
                                    })
                                }
                            }
                        },
                        noComplete_toScale(e) {
                            this.toScale(e), this.$refs.ImportAgeSexReviseItem.changeScaleRadio(e)
                        },
                        toScale(e) {
                            let t = !0;
                            e <= 1 && (e = 1, t = !1), e >= 2 && (e = 2, t = !1), this.scale = t ? parseFloat(e) : e;
                            const i = this.$refs.centerInfo;
                            i.style.transform = "scale(" + e + ")", i.style.transformOrigin = this.dialogWidth / 2 + "px " + this.dialogHeight / 2 + "px"
                        },
                        async onFaceDeleted(e) {
                            let {
                                deletedFaces: t,
                                faceDataTemp: i
                            } = e;
                            this.isUpdateType = !0, this.faceData = i, this.isPersonBioChanged = !0, await this.onSubmit()
                        },
                        onFaceEditStatusChanged(e) {
                            this.isFacePending = e
                        },
                        async callBackPersonType(e) {
                            let {
                                isFaceChanged: t,
                                changedFaceData: i,
                                faceDataTemp: a
                            } = e;
                            this.faceData = a;
                            let n = this.$store.state.ageSexRevise.originFaceData,
                                o = !1;
                            const s = (e, t) => {
                                let i = !1;
                                const {
                                    id: a,
                                    personType: n
                                } = e;
                                for (const o of t) {
                                    let e = o.age,
                                        t = o.gender,
                                        s = o.id,
                                        l = "";
                                    if (e > 12 && e < 55 && 1 === t ? l = F["e"].Male : e > 12 && e < 55 && 2 === t ? l = F["e"].Female : e <= 12 ? l = F["e"].Child : e >= 55 && (l = F["e"].Older), a == s) {
                                        i = l != n;
                                        break
                                    }
                                }
                                return i
                            };
                            let l = null;
                            for (const r of i)
                                if (s(r, n)) {
                                    o = !0, l = r.personType;
                                    break
                                } this.newPersonType = l, this.isUpdateType = o, console.log("人物类型是否发生变化 : ", this.isUpdateType), this.isPersonBioChanged = !0, await this.onSubmit()
                        },
                        onAddFaceFrameClick() {
                            this.$refs["ImportAgeSexReviseBox"].onAddFaceFrameClick()
                        }
                    },
                    beforeMount() {
                        const {
                            destroy: e
                        } = qo();
                        e()
                    }
                }),
                Ko = Go,
                Jo = (i("0548"), Object(ct["a"])(Ko, kn, Cn, !1, null, "7d48e9d9", null)),
                Yo = Jo.exports,
                Xo = i("34a3");
            const Zo = window.localStorage;
            class Qo {
                async getRefineParamsSplitValue() {
                    let e = await Zo.getItem("refineRightParamsSplitValue");
                    return "undefined" !== e && null !== e && (e = parseFloat(e)), e
                }
                async setRefineParamsSplitValue(e) {
                    await Zo.setItem("refineRightParamsSplitValue", e + "")
                }
                async getBatchRetouchParamsSplitValue() {
                    let e = await Zo.getItem("batchRetouchParamsSplitValue");
                    return "undefined" !== e && null !== e && (e = parseFloat(e)), e
                }
                async setBatchRetouchParamsSplitValue(e) {
                    await Zo.setItem("batchRetouchParamsSplitValue", e + "")
                }
            }
            const es = 38.5,
                ts = 38.5;

            function is(e) {
                const t = Object(l["computed"])(() => r["a"].getters["refine/isRaw"]),
                    i = Object(l["ref"])(0),
                    a = Object(l["ref"])(.3),
                    n = Object(l["ref"])(.3),
                    o = Object(l["ref"])(0),
                    s = Object(l["computed"])(() => {
                        if (o.value) return o.value;
                        const e = i.value * a.value - ts;
                        return e < 0 ? 0 : e
                    });
                Object(l["watch"])(e.activeNames, e => {
                    e.includes("preset") ? (a.value = n.value, o.value = 0) : (o.value = s.value, a.value = ts / i.value)
                }), Object(l["watch"])(n, e => {
                    let t = new Qo;
                    t.setRefineParamsSplitValue(e)
                });
                const c = () => {
                    let t = new Qo;
                    t.getRefineParamsSplitValue().then(t => {
                        if (t) {
                            const o = Number(t);
                            a.value = e.activeNames.value.includes("preset") ? o : ts / i.value, n.value = o
                        }
                    })
                };
                Object(l["onMounted"])(c);
                const u = Object(l["ref"])(es),
                    d = () => {
                        const i = e.getHistogramRef();
                        if (!i) return;
                        const a = i.$children[0].getHeight(t.value);
                        a && (e.activeNames.value.includes("histogram") ? u.value = a + es : u.value = es)
                    };
                Object(l["onMounted"])(d), Object(l["watch"])(t, d), Object(l["watch"])(e.activeNames, d);
                const h = () => {
                    Object(l["nextTick"])(() => {
                        let t = e.getParamsComRef();
                        t && t.getBoundingClientRect().height && (console.log("domRef.getBoundingClientRect().height: ", t.getBoundingClientRect().height), i.value = t.getBoundingClientRect().height)
                    })
                };
                Object(l["onMounted"])(h);
                const p = (e = !1) => {
                    e ? window.addEventListener("resize", h) : window.removeEventListener("resize", h)
                };
                return Object(l["onMounted"])(() => p(!0)), Object(l["onUnmounted"])(() => p(!1)), {
                    splitValue: a,
                    splitManualVal: n,
                    presetHeight: s,
                    histogramHeight: u,
                    updateParamsComRefHeight: h
                }
            }
            var as, ns = i("3d23"),
                os = i("1b7e"),
                ss = {
                    components: {
                        Split: Xo["a"],
                        ParamsCollapse: en,
                        SavePresetDialog: wn,
                        TSPresetTree: tn["a"],
                        ImportAgeSexRevise: Yo,
                        SyncPresetSettings: os["a"],
                        ElButtonGroup: w["ButtonGroup"]
                    },
                    mixins: [p["a"], Je["a"], m["a"]],
                    props: {
                        activeNavName: {
                            type: String,
                            default: ""
                        },
                        isDestroy: {
                            type: Boolean,
                            default: !1
                        },
                        refineUUID: {
                            type: String,
                            default: ""
                        },
                        getParamsJson: {
                            type: Function
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])(["preset", "histogram"]);
                        Object(l["watch"])(i, e => {
                            Object(l["nextTick"])(() => {
                                const t = [];
                                e.includes("preset") && t.push("photoFinishing_preset"), e.includes("histogram") && t.push("photoFinishing_histogram"), r["a"].commit("changeActionStatus_photoFinishing", t)
                            })
                        });
                        const a = () => {
                            const e = r["a"].getters.actionStatus,
                                t = [];
                            e.includes("photoFinishing_histogram") && t.push("histogram"), e.includes("photoFinishing_preset") && t.push("preset"), i.value = t
                        };
                        Object(l["onMounted"])(a);
                        const n = Object(l["ref"])(),
                            s = Object(l["ref"])(),
                            c = Object(l["ref"])(),
                            {
                                splitValue: u,
                                splitManualVal: d,
                                presetHeight: h,
                                histogramHeight: p,
                                updateParamsComRefHeight: f
                            } = is({
                                getParamsComRef: () => n.value,
                                getHistogramRef: () => s.value,
                                activeNames: i
                            }),
                            m = Object(l["ref"])("calc(100% - 72px)"),
                            v = e => {
                                [ns["b"].Palette].includes(e) ? m.value = `calc(100% - ${p.value}px)` : [ns["b"].Beauty].includes(e) ? m.value = "calc(100% - 33px)" : [ns["b"].Background].includes(e) && (m.value = "100%")
                            };
                        Object(l["watch"])(() => e.activeNavName, e => {
                            v(e), f()
                        }, {
                            immediate: !0
                        }), Object(l["watch"])(p, () => [ns["b"].Palette].includes(e.activeNavName) && v(ns["b"].Palette));
                        const b = Object(l["computed"])(() => r["a"].getters.isFaceLoadSuccess),
                            y = Object(l["computed"])(() => r["a"].getters["thumbnail/activeThumbnail"]),
                            w = Object(l["computed"])(() => r["a"].getters["thumbnail/thumbnailSelection"]),
                            k = Object(l["computed"])(() => r["a"].getters["refine/syncPresetSettingCache"]),
                            C = Object(l["computed"])(() => r["a"].getters["refine/isSaveSyncSetting"]),
                            x = Object(l["computed"])(() => 0 === w.value.length || 1 === w.value.length && w.value[0].id === y.value.id),
                            S = Object(l["ref"])(!1),
                            _ = Object(l["ref"])(!1),
                            {
                                tsNotify: O,
                                tsConfirm: I
                            } = Object(dn["a"])(),
                            T = async () => {
                                if (!C.value) return void(S.value = !0);
                                if (x.value || y.value.id <= 0) return void O("请先在左侧加选要应用的图片哦~");
                                _.value = !0;
                                const t = await o["c"].applyPresetToOther(e.refineUUID, k.value);
                                await Object(rn["a"])(300), _.value = !1, O({
                                    message: t.length ? t.length + "张照片效果已同步" : "效果已同步"
                                })
                            }, M = () => {
                                r["a"].commit("refine/_SetIsSaveSyncSetting"), S.value = !0
                            }, j = Object(l["computed"])({
                                get: () => r["a"].getters["refine/personType"],
                                set: e => r["a"].commit("refine/_SetPersonType", e)
                            }), {
                                batchSendGtag: D,
                                PointRightParams: R,
                                PointRightPreset: N,
                                PointAddPresetSort: B,
                                PointAddPresetIcon: L
                            } = Object(mi["a"])(), V = Object(l["computed"])(() => r["a"].getters["thumbnail/activePresetSuitId"]);
                        Object(l["watch"])(V, e => A(e));
                        const A = Object(g["debounce"])(() => {
                                Object(l["nextTick"])(() => {
                                    const e = c.value;
                                    if (!e) return;
                                    const t = V.value;
                                    e.handleSetCheckedNodes(0 === t ? null : t)
                                })
                            }, 500),
                            U = Object(g["debounce"])(e => {
                                const i = e[0];
                                if (!i) return void O("预设不存在");
                                const {
                                    presetSuitId: a
                                } = y.value;
                                i.id !== a && (N(i), i.version && i.version > Wi["h"] ? I({
                                    title: "系统提示",
                                    message: "需要升级最新版本才能使用该预设哦~",
                                    showCancelButton: !1
                                }).then(e => {}).catch(e => {}) : (t("onApplyPresetCallback", i), r["a"].commit("project/_SetLastProjectUpdateTime", new Date)))
                            }, 300),
                            $ = e => {
                                e && Object(l["nextTick"])(() => {
                                    const t = c.value;
                                    t && (t.addExpandNodeByPresetId(e.id), Object(rn["a"])(100).then(() => {
                                        Object(l["nextTick"])(() => {
                                            t.addExpandNodeByPresetId(null)
                                        })
                                    }))
                                })
                            },
                            H = Object(l["computed"])(() => r["a"].getters["refine/isOriParams"]),
                            z = Object(l["computed"])(() => r["a"].getters["refine/lastBeautifyParams"]),
                            W = Object(l["ref"])(),
                            q = e => {
                                Object(l["nextTick"])(() => {
                                    W.value && (W.value.whichPresetClass = e)
                                })
                            },
                            G = () => {
                                const e = new Array(r["a"].state.presetting.oriPreset);
                                U(e), c.value && c.value.handleSetCheckedNodes(-1)
                            },
                            K = e => {
                                "double-click-label" === e ? R("double_click_title") : "double-click-slider" === e ? R("double_click_dot") : "input-modify" === e && R("click_effect_value")
                            },
                            J = Object(l["ref"])({}),
                            Y = e => {
                                if ("-1" === e || "0" === e) return J.value = null, !0;
                                let t, i, a = !1,
                                    n = !0,
                                    o = r["a"].getters["presetTree"];
                                return o.forEach(o => {
                                    o.children.forEach(s => {
                                        e == s.id && (a = 1 === o.type, n = !1, i = s.label, t = s.class_id)
                                    })
                                }), n || a ? (J.value = null, !0) : a ? void 0 : (J.value = {
                                    name: i,
                                    classId: t
                                }, !1)
                            };
                        let X = Object(l["ref"])(!1),
                            Z = Object(l["ref"])("0"),
                            Q = Object(l["ref"])(!1);
                        const ee = () => {
                                let {
                                    presetSuitId: e,
                                    lastPresetSuitId: t
                                } = y.value;
                                V.value === F["g"].UnSet ? (Z.value = t, X.value = Y(t)) : (Z.value = V.value, X.value = Y(V.value)), Q.value = !0
                            },
                            te = Object(l["getCurrentInstance"])().proxy,
                            ie = () => {
                                (new Xt["a"]).push({
                                    label: "导入预设",
                                    action: "batchretouch-my-preset-import",
                                    disabled: !1,
                                    data: null,
                                    callback: () => {
                                        te.showImportPresetDialog = !0
                                    }
                                }).push({
                                    label: "新建分类",
                                    action: "batchretouch-my-preset-newType",
                                    disabled: !1,
                                    data: null,
                                    callback: () => {
                                        te.showNewPresetTypeDialog = !0, B()
                                    }
                                }).show()
                            },
                            ae = () => localStorage.getItem(F["d"].ManualFace),
                            ne = Object(l["ref"])(ae()),
                            oe = Object(l["ref"])(!1),
                            se = () => {
                                let e = localStorage.getItem(F["d"].ManualFace);
                                e || (e = E["a"]), localStorage.setItem(F["d"].ManualFace, e)
                            },
                            le = (e, i, a) => {
                                if ("init" === i) return;
                                if (0 === Object.keys(e).length) return;
                                console.log("data value is: ", e);
                                const n = [];
                                for (const t in e) {
                                    const i = e[t];
                                    n.push({
                                        key: t,
                                        value: i
                                    }), r["a"].commit("refine/_UpdateBeautifyParams", {
                                        key: t,
                                        value: i
                                    })
                                }
                                "manual" === i && D(n, "beautify", {
                                    beautifyParams: z.value
                                }), t("on-change-beautify-change", n, !1, a), r["a"].commit("project/_SetLastProjectUpdateTime", new Date)
                            },
                            re = Object(g["throttle"])((function(e) {
                                if (0 === Object.keys(e).length) return;
                                const i = [];
                                for (const t in e) {
                                    const a = e[t];
                                    i.push({
                                        key: t,
                                        value: a
                                    })
                                }
                                t("on-change-beautify-change", i, !0, "manual")
                            }), 30),
                            ce = (e, i, a) => {
                                if ("init" === i) return;
                                if (0 === Object.keys(e).length) return;
                                const n = [];
                                for (const t in e) {
                                    const i = e[t];
                                    n.push({
                                        key: t,
                                        value: i
                                    }), r["a"].commit("refine/_UpdatePaletteParams", {
                                        key: t,
                                        value: i
                                    })
                                }
                                "manual" === i && D(n, "color", {
                                    beautifyParams: z.value
                                }), t("on-change-color-slider", n, !1, a), r["a"].commit("project/_SetLastProjectUpdateTime", new Date)
                            },
                            ue = Object(g["throttle"])((function(e) {
                                if (0 === Object.keys(e).length) return;
                                const i = [];
                                for (const t in e) {
                                    const a = e[t];
                                    i.push({
                                        key: t,
                                        value: a
                                    })
                                }
                                t("on-change-color-slider", i, !0)
                            }), 30);
                        return Object(l["onMounted"])(async () => {
                            Object(l["nextTick"])(() => te.removeCollapseTabindex(te.$refs.removeTabindex));
                            try {
                                await r["a"].dispatch("loadAllPresents", {
                                    userId: r["a"].state.user.userId,
                                    presetType: P["a"].RETOUCH
                                }), A()
                            } catch (e) {
                                O(e.message)
                            }
                        }), {
                            RefineNavName: ns["b"],
                            paramsComRef: n,
                            histogram: s,
                            tSPresetTreeRefs: c,
                            savePresetDialogRefs: W,
                            splitValue: u,
                            splitManualVal: d,
                            splitMinVal: 135,
                            splitMaxVal: 72,
                            activeNames: i,
                            presetHeight: h,
                            paramsColsHeight: m,
                            batchSendGtag: D,
                            PointAddPresetIcon: L,
                            onUserBehavior: K,
                            isOriParams: H,
                            isApplyLoading: _,
                            activeThumbnail: y,
                            thumbnailSelection: w,
                            isSyncPresetDisabled: x,
                            showSyncPresetSettings: S,
                            onApplyPresetToOther: T,
                            changeSyncSetting: M,
                            onApplyPresetClick: U,
                            reloadPresetSuitSelect: A,
                            onSaveSuccess: $,
                            onSaveNewPresetClick: ee,
                            handleAddPreset: ie,
                            loadPreset: q,
                            handlResetPreset: G,
                            showSavePresetDialog: Q,
                            isRecommendPreset: X,
                            deletePresetSuitId: Z,
                            preset_label: J,
                            isFaceLoadSuccess: b,
                            currPersonType: j,
                            personList: Object(l["ref"])(Ue),
                            showImportAgeSexRevise: oe,
                            sexAdjustButtonHasNewDot: ne,
                            sexAdjustHasRedDotValue: ae,
                            setSexAdjustHasRedDotValue: se,
                            onInputSliders: re,
                            onChangeSliders: le,
                            onChangeColorSliders: ce,
                            onInputColorSliders: ue
                        }
                    }
                },
                ls = ss,
                rs = (i("7ce0"), Object(ct["a"])(ls, C, x, !1, null, "bccde09e", null)),
                cs = rs.exports,
                us = function() {
                    var e = this,
                        t = e._self._c;
                    return t("el-dialog", {
                        attrs: {
                            "append-to-body": "",
                            top: "20vh",
                            width: "380px",
                            height: "337px",
                            align: "center",
                            title: "问题上报",
                            "custom-class": "setting-dialog gpu-switch-dialog feedback-dialog",
                            visible: e.showFeedbackDialog,
                            "close-on-click-modal": !1,
                            "destroy-on-close": !0,
                            "before-close": e.updateShowFeedbackDialog
                        }
                    }, [t("div", {
                        attrs: {
                            slot: "title"
                        },
                        slot: "title"
                    }, [e._v("问题反馈")]), t("div", {
                        staticClass: "claFeedback"
                    }, [t("div", {
                        staticClass: "claFeedback_type"
                    }, [t("el-select", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointFeedbackChoose,
                            expression: "PointFeedbackChoose"
                        }],
                        attrs: {
                            "popper-class": "feedback_select",
                            placeholder: "*选择问题的分类"
                        },
                        model: {
                            value: e.id,
                            callback: function(t) {
                                e.id = t
                            },
                            expression: "id"
                        }
                    }, e._l(e.feedback_type, (function(e) {
                        return t("el-option", {
                            key: e.id,
                            staticClass: "feedback_option",
                            attrs: {
                                label: e.name,
                                value: e.id
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
                    })])], 1), t("div", {
                        staticClass: "claFeedback_content"
                    }, [t("el-input", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointFeedbackInputContent,
                            expression: "PointFeedbackInputContent"
                        }],
                        attrs: {
                            placeholder: e.inputDefault,
                            maxlength: "500",
                            "show-word-limit": "",
                            type: "textarea",
                            rows: "7"
                        },
                        on: {
                            focus: e.inputFocus
                        },
                        model: {
                            value: e.feedback_content,
                            callback: function(t) {
                                e.feedback_content = t
                            },
                            expression: "feedback_content"
                        }
                    })], 1)]), t("div", {
                        attrs: {
                            slot: "footer"
                        },
                        slot: "footer"
                    }, [t("el-button", {
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: e.onCancelBtn
                        }
                    }, [e._v(" 取消 ")]), t("el-button", {
                        attrs: {
                            size: "mini",
                            type: "primary"
                        },
                        on: {
                            click: e.onSubmitBtn
                        }
                    }, [e._v(" 提交 ")])], 1)])
                },
                ds = [],
                hs = i("f946"),
                ps = {
                    name: "feedbackDialog",
                    mixins: [d["a"], m["a"]],
                    components: {
                        "el-select": w["Select"],
                        "el-option": w["Option"],
                        "el-input": w["Input"],
                        "el-button": w["Button"],
                        "el-dialog": hn["a"]
                    },
                    props: {
                        showFeedbackDialog: Boolean,
                        feedbackDialog_viewModel: Object
                    },
                    watch: {
                        showFeedbackDialog: {
                            handler(e) {
                                e ? this.getFeedbackType() : (this.isSubmitClick || this.isCancelClick || this.pointFeedbackCancel(), this.isCancelClick = !1, this.isSubmitClick = !1)
                            }
                        }
                    },
                    data() {
                        return {
                            feedback_type: null,
                            id: "",
                            feedback_content: null,
                            inputDefault: "*请描述该图片遇到的问题（例如：侧脸无法识别）并点击【提交】。\n以便我们尽快迭代解决您的问题。",
                            isCancelClick: !1,
                            isSubmitClick: !1
                        }
                    },
                    methods: {
                        ...Object(c["d"])(["setCancelSpace"]),
                        async getFeedbackType() {
                            this.feedback_type || (this.feedback_type = await Object(hs["b"])())
                        },
                        inputFocus() {
                            this.$emit("callChangeShortcutHelper", !1), this.setCancelSpace(!0)
                        },
                        onCancelBtn() {
                            this.isCancelClick = !0, this.updateShowFeedbackDialog(), this.pointFeedbackCancel()
                        },
                        async onSubmitBtn() {
                            if (!this.id) return void this.tsNotify("请选择一个问题分类");
                            if (!this.feedback_content) return void this.tsNotify("请描述该图片遇到的问题");
                            this.isSubmitClick = !0;
                            let e = {};
                            e = {
                                type_id: this.id,
                                feedback_type: this.feedback_type[this.id - 1].name,
                                feedback_content: this.feedback_content
                            };
                            let t = {
                                ...this.feedbackDialog_viewModel
                            };
                            this.pointFeedbackConfirm(t, e.feedback_type), this.updateShowFeedbackDialog(), this.tsNotify("问题已提交～"), this.FeedbackReport(e, t)
                        },
                        FeedbackReport(e, t) {
                            let i = t.thumbnailModel.projectId,
                                a = {
                                    projectId: i,
                                    imgPath: t.imgPath,
                                    feedbackData: e
                                };
                            window.$export.asyncReportFeedBack(a)
                        },
                        updateShowFeedbackDialog() {
                            this.id = null, this.feedback_content = null, this.$emit("update:showFeedbackDialog", !1), this.$emit("update:feedbackDialog_viewModel", null), this.$emit("callChangeShortcutHelper", !0), this.setCancelSpace(!1)
                        },
                        pointFeedbackConfirm(e, t) {
                            let i;
                            1 === e.imgFormat && (i = "Jpeg"), 2 === e.imgFormat && (i = "Png"), 3 === e.imgFormat && (i = "Raw");
                            let a = t + "_" + i;
                            this.PointFeedbackConfirm(a)
                        },
                        pointFeedbackCancel() {
                            this.PointFeedbackCancel()
                        }
                    }
                },
                fs = ps,
                ms = (i("b9ff"), i("e166"), Object(ct["a"])(fs, us, ds, !1, null, "d7c9afbc", null)),
                gs = ms.exports,
                vs = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.show,
                            expression: "show"
                        }],
                        staticClass: "ts-spin-loading",
                        class: {
                            "hidden-background": e.hiddenBackground,
                            fixed: e.fixed,
                            [e.position]: e.fixed,
                            fullscreen: e.fullscreen,
                            column: e.column
                        }
                    }, [t("div", {
                        directives: [{
                            name: "loading",
                            rawName: "v-loading",
                            value: e.loading,
                            expression: "loading"
                        }],
                        staticClass: "ts-loading-spinner"
                    }, [t("span", {
                        staticClass: "ts-loading-spinner-text"
                    }, [t("i", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: !e.loading,
                            expression: "!loading"
                        }],
                        staticClass: "el-icon-circle-check"
                    }), e._v(" " + e._s(e.text) + " ")])]), t("div", {
                        staticClass: "ts-loading-mask"
                    })])
                },
                bs = [],
                ys = {
                    name: "TsSpinLoading",
                    props: {
                        text: {
                            type: String,
                            default: "处理中..."
                        },
                        show: {
                            type: Boolean,
                            default: !1
                        },
                        hiddenBackground: {
                            type: Boolean,
                            default: !1
                        },
                        fullscreen: {
                            type: Boolean,
                            default: !1
                        },
                        placement: {
                            type: String,
                            default: "left-bottom"
                        },
                        column: {
                            type: Boolean,
                            default: !1
                        },
                        loading: {
                            type: Boolean,
                            default: !0
                        },
                        fixed: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    computed: {
                        position() {
                            if (!this.fixed) return "";
                            const e = ["top", "bottom", "left", "right", "left-top", "left-bottom", "right-top", "right-bottom", "center"];
                            return e.includes(this.placement) ? this.placement : "bottom-left"
                        }
                    }
                },
                ws = ys,
                ks = (i("8e8a"), Object(ct["a"])(ws, vs, bs, !1, null, "0a62b5be", null)),
                Cs = ks.exports,
                xs = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "zoom-button-group"
                    }, [t("div", {
                        staticClass: "zoom-panel-box"
                    }, [t("i", {
                        staticClass: "el-icon-minus icon",
                        on: {
                            click: function(t) {
                                return e.imageResize("out")
                            }
                        }
                    }), t("ts-slider", {
                        ref: "slider",
                        staticClass: "slider",
                        attrs: {
                            min: 5,
                            max: 200,
                            "show-tooltip": !1,
                            value: e.zoom
                        },
                        on: {
                            mousedown: function(t) {
                                e.isMousedown = !0
                            },
                            mouseup: function(t) {
                                e.isMousedown = !1
                            },
                            input: e.onZoomSlider,
                            change: e.handleSliderChange
                        }
                    }), t("i", {
                        staticClass: "el-icon-plus icon",
                        on: {
                            click: function(t) {
                                return e.imageResize("in")
                            }
                        }
                    }), e._v(" " + e._s(e.transformUseValue(e.zoom)) + " % ")], 1), t("el-radio-group", {
                        attrs: {
                            disabled: e.disabledQuickButton,
                            fill: "#1E1E1E",
                            "text-color": "#EECC28"
                        },
                        model: {
                            value: e.fitPosition,
                            callback: function(t) {
                                e.fitPosition = t
                            },
                            expression: "fitPosition"
                        }
                    }, [t("el-radio-button", {
                        directives: [{
                            name: "blur",
                            rawName: "v-blur"
                        }, {
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointClickFit,
                            expression: "PointClickFit"
                        }],
                        attrs: {
                            label: "fit"
                        },
                        nativeOn: {
                            click: function(t) {
                                e.disabledQuickButton || e.imageResize("fit")
                            }
                        }
                    }, [e._v(e._s(e.$t("pagePhotoFinishing.fitBtn")) + " ")]), t("el-radio-button", {
                        directives: [{
                            name: "blur",
                            rawName: "v-blur"
                        }, {
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointClickOriginal,
                            expression: "PointClickOriginal"
                        }],
                        attrs: {
                            label: "one2one"
                        },
                        nativeOn: {
                            click: function(t) {
                                e.disabledQuickButton || e.imageResize("one2one")
                            }
                        }
                    }, [e._v(" 1:1 ")])], 1)], 1)
                },
                Ps = [],
                Ss = {
                    name: "ZoomButtonGroup",
                    components: {
                        "el-radio-group": w["RadioGroup"],
                        "el-radio-button": w["RadioButton"],
                        TsSlider: ht["a"]
                    },
                    mixins: [m["a"]],
                    props: {
                        value: {
                            type: Number
                        },
                        disabled: {
                            type: Boolean,
                            default: !1
                        },
                        showAllScale: {
                            type: Number,
                            default: -1
                        },
                        disabledQuickButton: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["getCurrentInstance"])().proxy,
                            a = Object(l["ref"])("none"),
                            n = Object(l["ref"])(100),
                            o = Object(l["ref"])(!1),
                            s = [20, 30, 40, 50, 60, 70, 80, 90, 100],
                            r = [100, 120, 140, 160, 180, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1e3, 1200];

                        function c(e = "in", t = 0) {
                            console.log("getRatio: ", t);
                            const i = Array.from([...s, ...r]);
                            let a = t.toStrip(4);
                            if ("out" === e) {
                                const e = i.reverse();
                                for (const t of e)
                                    if (t < a) return a = t, a
                            } else if ("in" === e)
                                for (const n of i)
                                    if (n > a) return a = n, a;
                            return a
                        }

                        function u(e) {
                            let t = e / 100;
                            if (t > 1) {
                                const e = r[0],
                                    i = r[r.length - 1];
                                t = 100 * (t - 1) / (i - e) + 1
                            }
                            return 100 * t
                        }

                        function d(e) {
                            let t = 1;
                            if (e < 100) t = e / 100;
                            else if (e > 100) {
                                const i = r[0],
                                    a = r[r.length - 1];
                                t = ((e - 100) / 100 * (a - i) + i) / 100
                            }
                            return (100 * (t + 1e-5)).toRound(1)
                        }

                        function h(e) {
                            o.value && (n.value = e, t("on-slider", d(e)))
                        }
                        return Object(l["watch"])(() => e.value, t => {
                            n.value = u(t), a.value = "none", 100 === n.value && (a.value = "one2one"), -1 !== e.showAllScale && d(n.value) === d(u(e.showAllScale)) && (a.value = "fit")
                        }), Object(l["watch"])(n, e => {
                            t("input", d(e))
                        }), {
                            zoom: n,
                            isMousedown: o,
                            fitPosition: a,
                            transformUseValue: d,
                            onZoomSlider: e => h(e),
                            imageResize: e => {
                                if (["in", "out"].includes(e)) {
                                    const i = c(e, d(n.value));
                                    n.value = u(i), t("on-slider", i)
                                } else t("on-resize", e)
                            },
                            handleSliderChange: () => {
                                null === i || void 0 === i || i.$tsStat.event("cake_refine", {
                                    cake_operate: "slide_zoom_rod"
                                })
                            }
                        }
                    }
                },
                _s = Ss,
                Os = (i("c194"), Object(ct["a"])(_s, xs, Ps, !1, null, "1501511e", null)),
                Is = Os.exports,
                Ts = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return e.disabled ? e._e() : t("el-progress", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.visible,
                            expression: "visible"
                        }],
                        staticClass: "px__el-progress",
                        attrs: {
                            "stroke-width": 4,
                            "show-text": !1,
                            percentage: e.loadingPercent
                        }
                    })
                },
                Ms = [],
                js = l["default"].extend({
                    name: "TsProgress",
                    components: {
                        "el-progress": w["Progress"]
                    },
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        },
                        disabled: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        let i = Object(l["ref"])(0),
                            a = Object(l["ref"])(e.value),
                            n = Object(l["ref"])(null),
                            o = Object(l["ref"])(null);

                        function s() {
                            n.value && (clearTimeout(n.value), n.value = null), n.value = setTimeout(() => {
                                i.value < 99 && (i.value += 1, s())
                            }, 33)
                        }
                        return Object(l["watch"])(() => e.value, e => {
                            e ? (a.value = e, i.value = 0, o.value && (clearTimeout(o.value), o.value = null), s()) : (i.value = 100, clearTimeout(n.value), o.value = setTimeout(() => {
                                Object(l["nextTick"])(() => {
                                    a.value = !1
                                })
                            }, 300))
                        }), Object(l["watch"])(a, e => t("input", e)), Object(l["onUnmounted"])(() => {
                            n.value && (clearTimeout(n.value), n.value = null), o.value && (clearTimeout(o.value), o.value = null)
                        }), {
                            loadingPercent: i,
                            visible: a
                        }
                    }
                }),
                Ds = js,
                Rs = Object(ct["a"])(Ds, Ts, Ms, !1, null, "421f9166", null),
                Ns = Rs.exports,
                Bs = i("4a9f"),
                Es = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.visible,
                            expression: "visible"
                        }],
                        staticClass: "ts-drawer",
                        style: {
                            width: e.width ? e.width : "100%"
                        }
                    }, [e._t("default")], 2)
                },
                Fs = [],
                Ls = l["default"].extend({
                    name: "TsDrawer",
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        },
                        width: {
                            type: String,
                            default: ""
                        },
                        direction: {
                            type: String,
                            default: "rtl"
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])(e.value || !1);
                        return Object(l["watch"])(() => e.value, e => {
                            i.value = e
                        }), Object(l["watch"])(i, e => t("input", e)), {
                            visible: i
                        }
                    }
                }),
                Vs = Ls,
                As = (i("8d1a"), Object(ct["a"])(Vs, Es, Fs, !1, null, "2a4d04ac", null)),
                Us = As.exports,
                $s = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        staticClass: "painter-sidebar"
                    }, [t("div", {
                        staticClass: "nav"
                    }, [t("span", {
                        staticClass: "nav-item",
                        class: {
                            active: "tool" === e.activeNav
                        },
                        on: {
                            click: function(t) {
                                e.activeNav = "tool"
                            }
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-blemishes"
                    })]), t("span", {
                        staticClass: "nav-item",
                        class: {
                            active: "history" === e.activeNav
                        },
                        on: {
                            click: function(t) {
                                e.activeNav = "history"
                            }
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-history"
                    })])]), "tool" === e.activeNav ? t("div", {
                        staticClass: "tool"
                    }, [t("div", {
                        staticClass: "tool-title"
                    }, [t("span", [e._v("祛除瑕疵")]), t("span", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.showResetMaskBtn,
                            expression: "showResetMaskBtn"
                        }],
                        staticClass: "btn"
                    }, [t("i", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: e.PointClickSmearReset,
                            expression: "PointClickSmearReset"
                        }],
                        staticClass: "el-icon-refresh-right reset-btn-icon",
                        staticStyle: {
                            "font-size": "16px"
                        },
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.$emit("on-reset-painter")
                            }
                        }
                    })])]), t("div", {
                        staticClass: "tool-content"
                    }, [t("div", {
                        staticClass: "tool-group"
                    }, [t("el-radio-group", {
                        attrs: {
                            value: e.toolKey,
                            "text-color": "#EECC28",
                            size: "mini"
                        }
                    }, [t("el-radio-button", {
                        directives: [{
                            name: "blur",
                            rawName: "v-blur"
                        }],
                        attrs: {
                            label: "brush"
                        },
                        nativeOn: {
                            click: function(t) {
                                return e.changeTool("brush")
                            }
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-brush",
                        class: ["brush" === e.toolKey ? "ts-icon-brush-active" : "ts-icon-brush"]
                    })]), t("el-radio-button", {
                        directives: [{
                            name: "blur",
                            rawName: "v-blur"
                        }],
                        attrs: {
                            label: "eraser"
                        },
                        nativeOn: {
                            click: function(t) {
                                return e.changeTool("eraser")
                            }
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-eraser",
                        class: ["eraser" === e.toolKey ? "ts-icon-eraser-active" : "ts-icon-eraser"]
                    })])], 1)], 1), e._l(e.tools, (function(i, a) {
                        return [t("div", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: e.toolKey === a,
                                expression: "toolKey === key"
                            }],
                            key: a,
                            staticClass: "tool-slider"
                        }, [e._l(i, (function(i, n) {
                            return [t("div", {
                                key: n,
                                staticClass: "tool-slider-item"
                            }, [t("p", {
                                staticClass: "label"
                            }, [t("span", [e._v(e._s(i.name))]), t("span", [e._v(e._s(i.value))])]), t("ts-slider", {
                                staticClass: "slider ts-slider--mini gray",
                                attrs: {
                                    min: i.min || 0,
                                    max: i.max || 100,
                                    "show-tooltip": !1
                                },
                                on: {
                                    input: function(t) {
                                        i.setValue(t), e.changeTool(e.toolKey)
                                    },
                                    change: function(t) {
                                        return e.PointClickSmearTool(a, i.type)
                                    },
                                    mousedown: e.painterMouseDown,
                                    mousemove: e.painterMouseMove,
                                    mouseup: e.painterMouseUp
                                },
                                model: {
                                    value: i.value,
                                    callback: function(t) {
                                        e.$set(i, "value", t)
                                    },
                                    expression: "item.value"
                                }
                            })], 1)]
                        }))], 2)]
                    }))], 2), e._t("bottom")], 2) : e._e(), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "history" === e.activeNav,
                            expression: "activeNav === 'history'"
                        }],
                        staticClass: "tool"
                    }, [e._m(0), t("ul", {
                        staticClass: "tool-content history global__scroll-style"
                    }, [e.historyList.length > 0 ? [e._l(e.historyList, (function(i) {
                        return [t("li", {
                            directives: [{
                                name: "gtag-event",
                                rawName: "v-gtag-event",
                                value: e.PointClickSmearHistoryBack,
                                expression: "PointClickSmearHistoryBack"
                            }],
                            key: i.uuid,
                            staticClass: "history-item",
                            class: {
                                disabled: i.disabled,
                                active: i.active
                            },
                            on: {
                                click: function(t) {
                                    i.disabled ? e.tsNotify("暂仅支持撤销至最近10步") : e.changeHistory(i.uuid)
                                }
                            }
                        }, [t("i", {
                            staticClass: "ts-icon",
                            class: {
                                "ts-icon-brush": "brush" === i.type,
                                "ts-icon-eraser": "eraser" === i.type,
                                "el-icon-refresh-right": "reset" === i.type
                            }
                        }), e._v(" " + e._s(i.name) + " ")])]
                    }))] : t("li", {
                        staticClass: "history-empty"
                    }, [e._v(" 暂无操作记录 ")])], 2), e._t("bottom")], 2)])
                },
                Hs = [function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        staticClass: "tool-title"
                    }, [t("span", [e._v("历史记录")])])
                }];
            (function(e) {
                e["Eraser"] = "eraser", e["Brush"] = "brush", e["Liquefy"] = "liquefy"
            })(as || (as = {}));
            const zs = {
                eraser: "橡笔擦涂抹",
                brush: "画笔涂抹",
                liquefy: "液化",
                reset: "重置"
            };
            class Ws {
                constructor() {
                    this._listeners = {}, this.maxListener = 10, this.$on = this.on, this.$once = this.once, this.$emit = this.emit, this.$off = this.off, this.$listeners = this.listeners, this.addListener = this.on, this.removeListener = this.off
                }
                on(e, t) {
                    let i = this._listeners;
                    if (i[e] && i[e].length >= this.maxListener) throw console.error("The maximum number of listeners is %d. You have exceeded the limit", this.maxListener);
                    return i[e] || (i[e] = []), -1 === i[e].indexOf(t) && i[e].push(t), this
                }
                emit(e, ...t) {
                    const i = Array.prototype.slice.call(arguments);
                    return i.shift(), this._listeners[e] && this._listeners[e].forEach(e => {
                        e.apply(null, i)
                    }), this
                }
                off(e, t) {
                    const i = this._listeners,
                        a = i[e] || [],
                        n = a.indexOf(t);
                    return n >= 0 && i[e].splice(n, 1), this
                }
                once(e, t) {
                    const i = this;

                    function a() {
                        const n = Array.prototype.slice.call(arguments);
                        t.apply(null, n), i.off(e, a)
                    }
                    return this.on(e, a), this
                }
                removeAllListener(e) {
                    return this._listeners[e] = [], this
                }
                listeners(e) {
                    return this._listeners[e]
                }
                setMaxListeners(e) {
                    return this.maxListener = e, this
                }
            }
            class qs extends Ws {
                constructor() {
                    super(), this.cursorMounted = !1, this._size = 10;
                    const e = this.createCursorElement();
                    e && (this.cursor = this.createCursorElement())
                }
                get size() {
                    return this._size
                }
                get _centerOffset() {
                    return -this._size / 2
                }
                increaseSize(e) {
                    this._size = (this.size + e).toRound(1)
                }
                getElement() {
                    return this.cursor
                }
                updateCursorSize(e) {
                    if (!this.cursor) return;
                    this._size = e;
                    const t = e + "px",
                        i = this._centerOffset;
                    this.cursor.style.width = t, this.cursor.style.height = t, this.cursor.style.borderRadius = t, this.cursor.style.transform = `translate(${i}px, ${i}px)`
                }
                updateCursorElement(e, t) {
                    if (!this.cursor) return;
                    const i = this._centerOffset;
                    this.cursor.style.transform = `translate(${i}px, ${i}px)`, this.cursor.style.left = e + "px", this.cursor.style.top = t + "px"
                }
                appendChild(e) {
                    const t = this.getElement();
                    t && (this.cursorMounted || (this.cursorMounted = !0, e.appendChild(t)))
                }
                removeChild() {
                    const e = this.getElement();
                    var t;
                    e && (this.cursorMounted && (this.cursorMounted = !1, null === (t = e.parentElement) || void 0 === t || t.removeChild(e)))
                }
            }
            const Gs = 10,
                Ks = 300,
                Js = 30,
                Ys = 50,
                Xs = 100;
            class Zs extends qs {
                constructor(e) {
                    var t;
                    super(), this._size = Js, this._opacity = Xs, this._feather = Ys, this.isEraser = !0, this.isEraser = e, this.insideElem = this.createInsideCycleElement(), null === (t = this.getElement()) || void 0 === t || t.appendChild(this.insideElem)
                }
                set size(e) {
                    e > Ks && (e = Ks), e < Gs && (e = Gs), this._size = e, this.updateCursorSize(e)
                }
                get size() {
                    return this._size
                }
                set feather(e) {
                    this._feather = e, this.updateInsideCycleElement()
                }
                reset() {
                    this._size = Js, this._opacity = Xs, this._feather = Ys
                }
                createCursorElement() {
                    const e = this._centerOffset,
                        t = this.size,
                        i = document.createElement("div");
                    return i.style.pointerEvents = "none", i.style.position = "absolute", i.style.display = "inline-block", i.style.border = "0.5px solid #ededed", i.style.width = t + "px", i.style.height = t + "px", i.style.transform = `translate(${e}px, ${e}px)`, i.style.borderRadius = t + "px", i.style.zIndex = "9999", i.style.background = "rgba(0, 0, 0, 0.3)", i.style.position = "fixed", i
                }
                createInsideCycleElement() {
                    const {
                        size: e,
                        feather: t
                    } = this.getDataForAlgorithm(), i = (1 - t / 100 * .5) * e, a = document.createElement("i");
                    return a.style.position = "absolute", a.style.display = "flex", a.style.justifyContent = "center", a.style.alignItems = "center", a.style.border = "0.5px solid #fff", a.style.left = "0", a.style.right = "0", a.style.top = "0", a.style.bottom = "0", a.style.margin = "auto", a.style.width = i + "px", a.style.height = i + "px", a.style.borderRadius = i + "px", a.style.fontSize = "24px", a.innerText = "-", a.style.fontStyle = "normal", a
                }
                updateCursorSize(e) {
                    super.updateCursorSize(e), this.updateInsideCycleElement()
                }
                updateInsideCycleElement() {
                    const e = this.insideElem,
                        {
                            size: t,
                            feather: i
                        } = this.getDataForAlgorithm(),
                        a = (1 - i / 100 * .5) * t;
                    e.style.width = a + "px", e.style.height = a + "px", e.style.borderRadius = a + "px", e.style.border = t === a ? "none" : "0.5px solid #fff", e.style.fontSize = a < 48 ? a / 2 + "px" : "24px"
                }
                getComponentData() {
                    return [{
                        name: "大小",
                        value: this._size,
                        min: Gs,
                        max: Ks,
                        type: "size",
                        setValue: e => {
                            console.log("setValue", e), this.size = e
                        }
                    }, {
                        name: "羽化",
                        type: "feather",
                        value: this._feather,
                        setValue: e => {
                            this.feather = e
                        }
                    }, {
                        name: "不透明度",
                        type: "opacity",
                        value: this._opacity,
                        setValue: e => {
                            this._opacity = e
                        }
                    }]
                }
                getDataForAlgorithm() {
                    return {
                        size: this._size,
                        feather: this._feather,
                        opacity: this._opacity
                    }
                }
            }
            class Qs extends Ws {
                constructor() {
                    super(), this.tools = new Map, this._cacheMousePosition = {
                        x: 0,
                        y: 0
                    }, this._tool = as.Eraser, this.tools = this.initTools()
                }
                get tool() {
                    return this._tool
                }
                get activeTool() {
                    return this.getSpecialTool(this.tool)
                }
                mounted() {
                    window.addEventListener("keydown", this._addKeyDownEvent)
                }
                unmounted() {
                    window.removeEventListener("keydown", this._addKeyDownEvent)
                }
                changeTool(e) {
                    return this.tool !== e && (this.removeCursor(), this._tool = e), this
                }
                getSpecialTool(e) {
                    return this.tools.has(e) ? this.tools.get(e) : null
                }
                addCursor(e, t = !1) {
                    var i;
                    if (null === (i = this.activeTool) || void 0 === i || i.appendChild(e), t) {
                        var a;
                        const {
                            x: e,
                            y: t
                        } = this._cacheMousePosition;
                        null === (a = this.activeTool) || void 0 === a || a.updateCursorElement(e, t)
                    }
                }
                removeCursor() {
                    var e;
                    null === (e = this.activeTool) || void 0 === e || e.removeChild()
                }
                updateCursorPosition(e, t) {
                    var i;
                    this._cacheMousePosition.x = e, this._cacheMousePosition.y = t, null === (i = this.activeTool) || void 0 === i || i.updateCursorElement(e, t)
                }
                createToolsOperationData() {
                    const e = {};
                    return this.tools.forEach((t, i) => {
                        e[i] = t.getComponentData()
                    }), e
                }
            }

            function el(e, ...t) {
                for (const i of t) {
                    const t = e[i];
                    if ("function" !== typeof t) throw new Error(`bindMany failed: '${i}' is no function`);
                    e[i] = t.bind(e)
                }
            }
            class tl extends Qs {
                constructor() {
                    super(), this._tool = as.Eraser, el(this, "_addKeyDownEvent", "emit")
                }
                static getInstance() {
                    return this.instance || (this.instance = new tl), this.instance
                }
                _addKeyDownEvent(e) {}
                initTools() {
                    const e = new Map;
                    return e.set(as.Eraser, new Zs(!0)), e.set(as.Brush, new Zs(!1)), e
                }
            }
            var il, al, nl = l["default"].extend({
                    mixins: [m["a"], d["a"]],
                    components: {
                        "ts-slider": ht["a"]
                    },
                    props: {
                        showResetMaskBtn: {
                            type: Boolean,
                            default: !1
                        },
                        historyList: {
                            type: Array,
                            default: () => []
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])("tool"),
                            a = tl.getInstance(),
                            n = Object(l["ref"])(a.createToolsOperationData()),
                            o = Object(l["ref"])(a.tool),
                            s = Object(g["debounce"])(e => {
                                t("change-tool", e)
                            }, 30);

                        function r(e) {
                            o.value = e, a.changeTool(e), s(e)
                        }

                        function c(e) {
                            var t;
                            switch (e.code) {
                                case "BracketLeft":
                                case "BracketRight":
                                    const i = e.code;
                                    null === (t = a.activeTool) || void 0 === t || t.increaseSize("BracketLeft" === i ? -10 : 10), n.value = a.createToolsOperationData(), r(o.value);
                                    break;
                                case "KeyX":
                                    a.tool === as.Eraser ? r(as.Brush) : a.tool === as.Brush && r(as.Eraser);
                                    break
                            }
                        }

                        function u(e = "destroy") {
                            "destroy" === e ? window.removeEventListener("keydown", c) : "add" === e && window.addEventListener("keydown", c)
                        }
                        return Object(l["onMounted"])(() => {
                            u("add")
                        }), Object(l["onUnmounted"])(() => {
                            u("destroy")
                        }), {
                            activeNav: i,
                            tools: n,
                            toolKey: o,
                            changeTool: r,
                            resetTool: () => {
                                var e;
                                null === (e = a.activeTool) || void 0 === e || e.reset(), n.value = a.createToolsOperationData(), r(o.value)
                            },
                            painterMouseDown: e => {
                                var t;
                                const i = document.body;
                                a.addCursor(i), null === (t = a.activeTool) || void 0 === t || t.updateCursorElement(e.clientX, e.clientY)
                            },
                            painterMouseMove: e => {
                                var t;
                                null === (t = a.activeTool) || void 0 === t || t.updateCursorElement(e.clientX, e.clientY)
                            },
                            painterMouseUp: e => {
                                a.removeCursor()
                            },
                            changeHistory: e => t("change-history", e)
                        }
                    }
                }),
                ol = nl,
                sl = (i("a0db"), Object(ct["a"])(ol, $s, Hs, !1, null, "2bb1eac8", null)),
                ll = sl.exports;

            function rl(e, t, i) {
                const a = Object(l["ref"])(),
                    n = Object(l["ref"])(!1),
                    s = Object(l["ref"])([]),
                    r = Object(l["ref"])(!1),
                    {
                        tsNotify: c
                    } = Object(dn["a"])(),
                    u = () => {
                        r.value || (r.value = !0, i && (null === i || void 0 === i || i.beforeOpenMode()), a.value = e.value.usePainterMode(), a.value.on(il.HistoryUpdate, e => s.value = e).on(il.ShowResetDefaultMask, e => n.value = e).on(il.HistoryExpired, () => c("暂仅支持撤销至最近10步")), m())
                    },
                    d = e => {
                        var t;
                        if (i && (null === i || void 0 === i || i.beforeCloseMode()), "cancel" === e) null === (t = a.value) || void 0 === t || t.cancelRemoveDefectivePaintMask();
                        else if ("save" === e) {
                            var n;
                            null === (n = a.value) || void 0 === n || n.setRemoveDefectivePaintMask()
                        }
                        r.value = !1, m(!0)
                    },
                    {
                        tsConfirm: h
                    } = Object(dn["a"])(),
                    p = () => {
                        h({
                            title: "是否需要保存涂抹修改？",
                            confirmButtonText: "保存"
                        }).then(() => {
                            f("save")
                        }).catch(() => {
                            f("cancel")
                        })
                    },
                    f = (e, t = !1) => {
                        "cancel" === e && t && s.value.length > 1 ? p() : d(e)
                    },
                    m = (e = !1) => {
                        e ? o["c"].removeListener(o["a"].ThumbnailCanChooseItem) : o["c"].addListener(o["a"].ThumbnailCanChooseItem, () => p())
                    };
                return Object(l["onUnmounted"])(() => {
                    var e;
                    m(!0), null === (e = a.value) || void 0 === e || e.destroy(), a.value = void 0
                }), {
                    showPainter: r,
                    showResetMaskBtn: n,
                    painterHistoryList: s,
                    setRemoveDefectivePaintMask: f,
                    painterCloseConfirm: p,
                    resetPainterRecord: () => {
                        var e;
                        n.value = !1, null === (e = a.value) || void 0 === e || e.resetPainterRecord()
                    },
                    openPainterMode: () => {
                        e.value ? u() : c("图片未加载成功，请稍后再试")
                    },
                    switchDefectTool: e => {
                        var t;
                        return null === (t = a.value) || void 0 === t ? void 0 : t.changeTool(e)
                    },
                    onChangeHistory: e => {
                        var t;
                        return null === (t = a.value) || void 0 === t ? void 0 : t.changeHistory(e)
                    }
                }
            }(function(e) {
                e["HistoryUpdate"] = "history__update", e["HistoryExpired"] = "history__expired", e["DragStateChanged"] = "drag-state-changed", e["InitSize"] = "init-size", e["ShowResetDefaultMask"] = "show-reset-default-mask", e["ClickSmearBack"] = "click-smear-back"
            })(il || (il = {})),
            function(e) {
                e["MouseEvent"] = "mouse_event"
            }(al || (al = {}));
            var cl = function() {
                    var e = this,
                        t = e._self._c;
                    e._self._setupProxy;
                    return t("div", {
                        staticClass: "thumb-opt-record"
                    }, [t("div", {
                        staticClass: "tool"
                    }, [t("div", {
                        staticClass: "tool-title"
                    }, [t("span", [e._v("历史记录")]), e.selectId && 0 != e.selectId ? t("i", {
                        staticClass: "el-icon-refresh-right reset-btn-icon",
                        staticStyle: {
                            "font-size": "16px"
                        },
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.onResetRecord.apply(null, arguments)
                            }
                        }
                    }) : e._e()])]), t("div", {
                        ref: "content",
                        staticClass: "content-container global__scroll-style",
                        on: {
                            scroll: e.throttleScroll
                        }
                    }, e._l(e.list, (function(i, a) {
                        return t("div", {
                            key: a,
                            staticClass: "content"
                        }, [t("div", {
                            staticClass: "item",
                            class: {
                                "is-select-item": i.isSelect
                            },
                            attrs: {
                                id: i.id
                            },
                            on: {
                                click: function(t) {
                                    return t.stopPropagation(), e.onItemClick(i)
                                }
                            }
                        }, [t("span", {
                            staticClass: "title",
                            class: {
                                "is-select-text": i.isSelect
                            }
                        }, [e._v(" " + e._s(e.renderTitle(i)) + " ")]), i.opt.optDesc ? t("span", {
                            staticClass: "value",
                            class: {
                                "is-select-text": i.isSelect
                            }
                        }, [e._v(" " + e._s(e.renderDesc(i)) + " ")]) : e._e()])])
                    })), 0)])
                },
                ul = [],
                dl = i("e508"),
                hl = Object(l["defineComponent"])({
                    name: "ThumbOptRecordView",
                    data() {
                        return {
                            originItem: {
                                isSelect: !1,
                                enable: 1,
                                id: 0,
                                opt: {
                                    labName: "原始"
                                },
                                presetSuitId: "-1",
                                created_time: -1
                            },
                            selectId: 0,
                            list: [],
                            thumbnailId: -1,
                            sexMap: null
                        }
                    },
                    components: {
                        DynamicScroller: dl["a"],
                        DynamicScrollerItem: dl["b"]
                    },
                    props: {
                        isShow: {
                            type: Boolean,
                            default: !1
                        },
                        photoControlFunc: {
                            type: Function
                        }
                    },
                    setup(e) {
                        const {
                            PointHistoryStep: t,
                            PointHistoryReset: i,
                            PointHistoryScroll: a
                        } = Object(un["a"])();
                        return {
                            PointHistoryStep: t,
                            PointHistoryReset: i,
                            throttleScroll: Object(g["throttle"])(a, 2e3, {
                                leading: !1
                            })
                        }
                    },
                    mounted() {
                        this.sexMap = new Map([
                            [0, "女"],
                            [1, "男"],
                            [2, "儿童"],
                            [3, "长辈"]
                        ]), fi["a"].on("on-updateCurrentOptRecordId", (e, t) => {
                            if (console.log("updateCurrentOptRecordId", t), t && t.id && r["a"].commit("refine/_SetNavbarDots", {
                                    history: !0
                                }), !this.isShow) return;
                            let {
                                id: i,
                                thumbnailId: a
                            } = t;
                            this.selectId !== i && this.thumbnailId === a && (this.list.forEach(e => {
                                e.isSelect = !1, i >= e.id && (e.isSelect = !0)
                            }), this.selectId = i, this.scrollToTarget(i))
                        }), fi["a"].on("on-loadThumbnailOptRecord", (e, t) => {
                            if (r["a"].commit("refine/_SetNavbarDots", {
                                    history: t.count > 0
                                }), !this.isShow) return;
                            this.selectId = 0;
                            let {
                                data: i,
                                thumbnailId: a,
                                selectId: n
                            } = t, o = i, s = [];
                            if (o && o.length > 0) {
                                for (let e = o.length - 1; e >= 0; e--) {
                                    let t = o[e];
                                    t.optJson && (t.opt = JSON.parse(t.optJson)), n >= t.id ? t.isSelect = !0 : t.isSelect = !1, s.push(t)
                                }
                                this.selectId = n
                            }
                            let l = {
                                isSelect: !1,
                                enable: 1,
                                id: 0,
                                opt: {
                                    labName: "原始"
                                },
                                presetSuitId: "-1",
                                created_time: -1
                            };
                            l.isSelect = !0, s.push(l), this.list = s, this.thumbnailId = a, this.scrollToTarget(this.selectId)
                        })
                    },
                    beforeDestroy() {
                        fi["a"].removeAllListeners("on-updateCurrentOptRecordId"), fi["a"].removeAllListeners("on-loadThumbnailOptRecord")
                    },
                    watch: {
                        isShow: {
                            handler: async function(e) {
                                if (e) {
                                    let e = this.photoControlFunc();
                                    if (e) {
                                        let {
                                            thumbnailId: t,
                                            imgPath: i
                                        } = e;
                                        window.$thumbnailOptRecord.loadThumbnailOptRecord(t, i)
                                    }
                                }
                            },
                            immediate: !1
                        }
                    },
                    methods: {
                        scrollToTarget(e) {
                            let t = this.list,
                                i = -1;
                            for (let a = 0; a < t.length; a++)
                                if (t[a].id === e) {
                                    i = a;
                                    break
                                } if (i >= 0) {
                                let e = 32 * i;
                                setTimeout(() => {
                                    Object(l["nextTick"])(() => {
                                        let t = this.$refs["content"],
                                            i = t.scrollTop,
                                            a = t.getBoundingClientRect().height;
                                        if (console.log("scrollTop : ", i, " top : ", e, " scrollTop + parentH : ", i + a), e > i && e + 32 < i + a) return;
                                        let n = !0,
                                            o = 0,
                                            s = 0,
                                            l = 0,
                                            r = 0;
                                        e + 32 >= i + a ? (n = !1, e += 32, o = e - (i + a), s = o / 10, l = i, r = i + o) : (o = i - e, s = -o / 10, l = i, r = e);
                                        let c = setInterval((function() {
                                            l += s, t.scrollTo({
                                                top: l,
                                                left: 0
                                            }), n ? l <= r && clearInterval(c) : l >= r && clearInterval(c)
                                        }), 10)
                                    })
                                }, 50)
                            }
                        },
                        renderTitle(e) {
                            let t = "";
                            return void 0 !== e.opt.sex && (t += this.sexMap.get(e.opt.sex) + "："), t += e.opt.labName, e.opt.lab2Name && (t += "  " + e.opt.lab2Name), e.opt.lab3Name && (t += "  " + e.opt.lab3Name), t
                        },
                        renderDesc(e) {
                            if (e.isRest) return "已重置";
                            let t = Number(e.opt.optDesc);
                            return t > 0 ? "+" + t : e.opt.optDesc
                        },
                        async onResetRecord() {
                            this.PointHistoryReset(), await this.onItemClick(this.originItem)
                        },
                        async onItemClick(e) {
                            this.PointHistoryStep(), this.selectId = e.id, this.list.forEach(t => {
                                t.isSelect = !1, e.id >= t.id && (t.isSelect = !0)
                            });
                            let t = this.photoControlFunc();
                            t && await window.$thumbnailOptRecord.onThumbnailOptRecordClick(t, e)
                        },
                        throttle(e, t) {
                            let i = null;
                            return function() {
                                const a = this;
                                let n = arguments;
                                i = setTimeout(() => {
                                    i = null
                                }, t), e.apply(a, n)
                            }
                        },
                        onHistoryScroll() {}
                    }
                }),
                pl = hl,
                fl = (i("4b9a"), Object(ct["a"])(pl, cl, ul, !1, null, "7fe2eb3c", null)),
                ml = fl.exports;
            const gl = {
                    leftListMargin: {
                        right: 345,
                        top: 48,
                        left: 146,
                        bottom: 0
                    }
                },
                vl = {
                    leftListMargin: {
                        right: 45,
                        top: 48,
                        left: 0,
                        bottom: 0
                    }
                },
                bl = {
                    fixWidth: 146,
                    leftListPadding: {
                        right: 8,
                        top: 0,
                        left: 8,
                        bottom: 0
                    },
                    leftListMargin: {
                        right: 300,
                        top: 48,
                        left: 0,
                        bottom: 0
                    }
                };

            function yl(e) {
                const t = Object(l["ref"])(!1),
                    i = (e, i) => {
                        t.value = ["index", "importImage"].includes(e.name)
                    },
                    a = Object(l["ref"])(""),
                    n = Object(l["ref"])(!1),
                    s = Object(l["ref"])(!0),
                    c = Object(l["ref"])(!0),
                    u = async e => {
                        c.value = e, a.value && await o["c"].switchGrab(a.value, e)
                    }, d = async (i, n) => {
                        try {
                            const s = {
                                    isInGallery: !1,
                                    projectId: i,
                                    userId: n,
                                    ...gl
                                },
                                l = {
                                    isInGallery: !1,
                                    projectId: i,
                                    ...bl
                                };
                            if (e.value) return;
                            if (t.value) {
                                let e = await fi["a"].send("on-main-fragment-mount", {
                                    refine: s,
                                    gallery: l,
                                    tab: "photoFinishing"
                                });
                                a.value = e.refineUUID
                            } else {
                                let t = await o["c"].showRefineFragment(s, l);
                                if (e.value) return;
                                if (t && t.refineUUID) a.value = t.refineUUID;
                                else {
                                    let e = await fi["a"].send("on-main-fragment-mount", {
                                        refine: s,
                                        gallery: l,
                                        tab: "photoFinishing"
                                    });
                                    a.value = e.refineUUID
                                }
                            }
                            if (e.value) return;
                            r["a"].commit("updateExportEffectCfg", {
                                isFromRefineTab: !0,
                                refineOrGalleryUUID: a.value
                            }), console.log("refineUUID: ", a), r["a"].commit("project/_SetRefineUUID", a.value), await o["c"].loadGalleryView(a.value)
                        } catch (l) {}
                        s.value = !0
                    }, h = e => {
                        "Escape" === e.key && v(!1)
                    }, p = (e = !1) => {
                        e ? window.removeEventListener("keyup", h) : window.addEventListener("keyup", h)
                    }, f = async () => {
                        e.value || (await o["c"].updateRefineLayout(a.value, gl, {
                            show: !0
                        }), n.value = !1, p(!1))
                    }, m = async () => {
                        e.value || (await o["c"].updateRefineLayout(a.value, vl, {
                            show: !1
                        }), n.value = !0, p())
                    }, v = Object(g["debounce"])((async function(e = !0) {
                        e ? await m() : await f()
                    }), 100);
                let b = Object(l["ref"])(0);
                const y = (t, i) => {
                        Object(l["nextTick"])(() => {
                            e.value || (s.value = !1, b.value && (clearTimeout(b.value), b.value = 0), b.value = setTimeout(async () => {
                                e.value || await d(t, i)
                            }, 100))
                        })
                    },
                    w = async (e, t) => {
                        console.log("doWhenLeave from : " + e.name, " to : " + t.name), await o["c"].updateRefineLayout(a.value, gl, {
                            show: !1
                        }), o["c"].destroy(a.value);
                        const i = await o["c"].hideRefineFragment(a.value);
                        "index" != t.name && "Login" != t.name || (await fi["a"].send("on-main-fragment-unmount", {}), r["a"].commit("refine/_SetActiveNavName", "beauty"), r["a"].commit("refine/_ClearSyncPresetSettingCache"), r["a"].commit("project/_SetRefineUUID", "")), console.log("doWhenLeave result " + JSON.stringify(i))
                    };
                return Object(l["onUnmounted"])(() => {
                    b.value && (clearTimeout(b.value), b.value = 0)
                }), {
                    refineUUID: a,
                    isDragging: c,
                    canDestroy: s,
                    needCreateMainFragment: t,
                    updateDragStatus: u,
                    setNeedCreateMainFragmentTag: i,
                    handleFullPreview: v,
                    exitFullPreview: f,
                    doWhenLeave: w,
                    loadQtView: y,
                    isFullScreenPreview: n
                }
            }
            var wl, kl = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "box"
                    }, [t("div", [e._v("LoadImage: " + e._s(e.LoadImage))]), e._l(e.LoadImageNative, (function(i, a) {
                        return [t("div", {
                            key: "LoadImage_" + a,
                            staticStyle: {
                                "padding-left": "20px"
                            }
                        }, [e._v(" " + e._s(a) + ": " + e._s(i) + " ")])]
                    })), t("br"), t("div", [e._v("ReqServe: " + e._s(e.ReqServe))]), e._l(e.ReqServeNative, (function(i, a) {
                        return [t("div", {
                            key: "ReqServe_" + a,
                            staticStyle: {
                                "padding-left": "20px"
                            }
                        }, [e._v(" " + e._s(a) + ": " + e._s(i) + " ")])]
                    })), t("br"), t("div", [e._v(" Process: " + e._s(e.Process) + " ")]), e._l(e.ProcessNative, (function(i, a) {
                        return [t("div", {
                            key: "Process_" + a,
                            staticStyle: {
                                "padding-left": "20px"
                            }
                        }, [e._v(" " + e._s(a) + ": " + e._s(i) + " ")])]
                    })), t("br"), t("div", [e._v("loading: " + e._s(e.loadTime))])], 2)
                },
                Cl = [],
                xl = {
                    name: "CostTime",
                    data() {
                        return {
                            id: -1,
                            LoadImage: -1,
                            LoadImageNative: {},
                            ReqServe: -1,
                            ReqServeNative: {},
                            Process: -1,
                            ProcessNative: {},
                            loadTime: -1,
                            lastTime: -1,
                            newTime: -1
                        }
                    },
                    props: {
                        costTimeData: Object,
                        costLastTime: Number,
                        costNewTime: Number
                    },
                    mounted() {},
                    watch: {
                        costTimeData: {
                            handler(e) {
                                if (e) {
                                    let t = e.data;
                                    t.id !== this.id && (this.id = t.id, this.ReqServe = -1, this.ReqServeNative = {}, this.LoadImage = -1, this.LoadImageNative = {}, this.Process = -1, this.ProcessNative = {});
                                    let {
                                        LoadImage: i,
                                        GenSeed: a,
                                        ReqFile: n,
                                        ReqServe: o,
                                        ServeDur: s,
                                        Alatency: l,
                                        Process: r,
                                        Native: c
                                    } = t.data;
                                    i && (this.LoadImage = i), r && (this.Process = r), o && (this.ReqServe = o, a && (this.ReqServeNative["GenSeed"] = a), n && (this.ReqServeNative["ReqFile"] = n + "kb"), s && (this.ReqServeNative["ServeDur"] = s), l && (this.ReqServeNative["Alatency"] = l)), c && (c.includes("LdImg:Decode") ? this.LoadImageNative = JSON.parse(c) : this.ProcessNative = JSON.parse(c))
                                }
                            }
                        },
                        costLastTime: {
                            handler(e) {
                                e && (this.lastTime = e)
                            }
                        },
                        costNewTime: {
                            handler(e) {
                                e && (this.newTime = e, this.loadTime = this.newTime - this.lastTime)
                            }
                        }
                    },
                    methods: {}
                },
                Pl = xl,
                Sl = (i("3079"), Object(ct["a"])(Pl, kl, Cl, !1, null, "2fb8f17b", null)),
                _l = Sl.exports,
                Ol = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "refine-nav-bar border-style border-line-style"
                    }, [e._l(e.navMenuList, (function(i) {
                        return [t("div", {
                            key: i.key,
                            staticClass: "nav-item-box",
                            class: {
                                isStaying: e.isStaying
                            },
                            on: {
                                click: function(t) {
                                    i.disabled || e.handleClick(i.key)
                                },
                                mouseenter: e.onMouseEnter,
                                mouseleave: e.onMouseLeave
                            }
                        }, [t("div", {
                            directives: [{
                                name: "gtag-event",
                                rawName: "v-gtag-event",
                                value: i.point,
                                expression: "item.point"
                            }],
                            staticClass: "nav-item",
                            class: {
                                active: e.currValue === i.key
                            }
                        }, [t("div", {
                            staticClass: "guide-placeholder",
                            attrs: {
                                id: i.guideId
                            }
                        }, [t("i", {
                            staticClass: "ts-icon",
                            class: {
                                [i.icon]: !0,
                                disabled: i.disabled || !1
                            }
                        })])]), t("i", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: i.dot,
                                expression: "item.dot"
                            }],
                            staticClass: "nav-item-dot"
                        }), t("i", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: !!i.newDot,
                                expression: "!!item.newDot"
                            }],
                            staticClass: "nav-update-dot"
                        }), t("div", {
                            staticClass: "show-tip"
                        }, [t("div", {
                            staticClass: "desc-box"
                        }, [t("span", {
                            staticClass: "nav-name"
                        }, [e._v(e._s(i.name))]), i.shortcut ? t("span", {
                            staticClass: "nav-shortcut"
                        }, [e._v(e._s(i.shortcut))]) : e._e()])])])]
                    }))], 2)
                },
                Il = [];
            (function(e) {
                e["NavBarColor"] = "guide__refine-nav-bar-color", e["NavBarBackground"] = "guide__refine-nav-bar-background", e["NavBarCrop"] = "guide__refine-nav-bar-crop", e["NavBarHistory"] = "guide__refine-nav-bar-history", e["PresetSettings"] = "guide__refine-preset-settings"
            })(wl || (wl = {}));
            const Tl = "1";

            function Ml() {
                const {
                    PointGuideImgAdjust: e,
                    PointGuideBackground: t,
                    PointGuideCrop: i,
                    PointGuideHistory: a,
                    PointGuidePresetSettings: n
                } = Object(un["a"])(), o = () => {
                    localStorage.setItem(F["b"].RefineNavBar, Tl)
                }, s = [{
                    element: "#" + wl.NavBarColor,
                    popover: {
                        className: "first-step-popover-class",
                        title: "色彩调节功能，支持RAW调色",
                        description: "图像调节功能移动到这里了",
                        position: "left"
                    },
                    onNext: () => e()
                }, {
                    element: "#" + wl.NavBarBackground,
                    popover: {
                        title: "一键背景修复&证件照调整",
                        description: "背景调整&证件照换背景移动到这里了",
                        position: "left"
                    },
                    onNext: () => t()
                }, {
                    element: "#" + wl.NavBarCrop,
                    popover: {
                        title: "新增裁剪功能",
                        description: "支持对图片进行裁剪&旋转了，证件照裁剪功能也移动到这里了",
                        position: "left"
                    },
                    onNext: () => i()
                }, {
                    element: "#" + wl.NavBarHistory,
                    popover: {
                        title: "新增历史记录功能",
                        description: "支持撤销&重做操作了",
                        position: "left"
                    },
                    onNext: () => {
                        a(), o()
                    }
                }, {
                    element: "#" + wl.PresetSettings,
                    popover: {
                        title: "",
                        description: "可以自定义模块进行同步啦",
                        position: "top-right"
                    },
                    onNext: () => {
                        n(), o()
                    }
                }], r = [{
                    element: "#" + wl.NavBarCrop,
                    popover: {
                        title: "新增裁剪功能",
                        description: "支持对图片进行裁剪&旋转了，证件照裁剪功能也移动到这里了",
                        position: "left"
                    },
                    onNext: () => {
                        i()
                    }
                }, {
                    element: "#" + wl.PresetSettings,
                    popover: {
                        title: "",
                        description: "可以自定义模块进行同步啦",
                        position: "top-right"
                    },
                    onNext: () => {
                        n(), o()
                    }
                }];
                let c = 0;
                const u = Object(l["ref"])(null),
                    d = () => {
                        const e = localStorage.getItem(F["b"].RefineNavBar);
                        if (e === Tl) return;
                        const t = e ? r : s;
                        c = setTimeout(() => {
                            u.value = new jo({
                                autocompleteWait: 1e4,
                                autoComplete: !0,
                                nextBtnText: "下一步",
                                doneBtnText: "我知道了",
                                padding: 2,
                                opacity: .4,
                                allowClose: !1,
                                showPreviewButton: !1,
                                onCloseClicked: () => o(),
                                onClose: () => {
                                    et["c"].getInstance().process([et["b"].Mouse, et["b"].KeyBoard], !0)
                                }
                            }), u.value.defineSteps(t), Object(l["nextTick"])(() => {
                                var e;
                                et["c"].getInstance().process([et["b"].Mouse, et["b"].KeyBoard], !1), null === (e = u.value) || void 0 === e || e.start(), o()
                            })
                        }, 300)
                    };
                return Object(l["onUnmounted"])(() => {
                    c && (clearTimeout(c), c = 0), u.value = null
                }), {
                    handleGuideStart: d,
                    destroy: () => {}
                }
            }

            function jl(e = 2e3) {
                const t = Object(l["ref"])(!1);
                let i = 0,
                    a = 0;
                const n = n => {
                        a && clearTimeout(a), i = setTimeout(() => {
                            t.value = !0
                        }, e)
                    },
                    o = e => {
                        i && (clearTimeout(i), i = 0), a = setTimeout(() => {
                            t.value = !1
                        }, 300)
                    };
                return Object(l["onUnmounted"])(() => {
                    a && clearTimeout(a), i && (clearTimeout(i), i = 0), t.value = !1
                }), {
                    isStaying: t,
                    onMouseEnter: n,
                    onMouseLeave: o
                }
            }
            var Dl = i("c5da"),
                Rl = {
                    components: {
                        "el-tooltip": w["Tooltip"]
                    },
                    props: {
                        value: {
                            type: String,
                            default: ""
                        },
                        banShortcut: {
                            type: Boolean,
                            default: !1
                        },
                        beforeChange: {
                            type: Function
                        },
                        imageLoading: {
                            type: Boolean,
                            default: !1
                        },
                        imageInit: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const {
                            PointPortraitBeautification: i,
                            PointImageAdjustment: a,
                            PointBackgroundAdjustment: n,
                            PointOperationHistory: o,
                            PointCropIcon: s
                        } = Object(un["a"])(), c = Object(l["ref"])(e.value || "");
                        Object(l["watch"])(c, e => t("input", e)), Object(l["watch"])(() => e.value, e => {
                            c.value = e
                        });
                        const u = Object(l["computed"])(() => r["a"].getters["refine/navbarDots"]),
                            d = Object(l["reactive"])({
                                background: !1
                            });
                        Object(l["onMounted"])(async () => {
                            const e = await Object(Dl["b"])(Dl["a"].NavbarBackgroundDot);
                            e || (d.background = !0)
                        });
                        const h = Object(l["computed"])(() => [{
                                key: ns["b"].Palette,
                                name: "色彩调节",
                                icon: "ts-icon-adjust",
                                dot: u.value[ns["b"].Palette] || !1,
                                guideId: wl.NavBarColor,
                                point: a
                            }, {
                                name: "人像美化",
                                key: ns["b"].Beauty,
                                icon: "ts-icon-beautify",
                                dot: u.value[ns["b"].Beauty] || !1,
                                point: i
                            }, {
                                name: "图像美化",
                                key: ns["b"].Background,
                                icon: "ts-icon-background",
                                dot: u.value[ns["b"].Background] || !1,
                                newDot: d.background,
                                guideId: wl.NavBarBackground,
                                point: n
                            }, {
                                name: "裁剪、旋转",
                                key: "crop",
                                icon: "ts-icon-crop",
                                dot: u.value["crop"] || !1,
                                guideId: wl.NavBarCrop,
                                disabled: e.imageLoading || !e.imageInit,
                                point: s
                            }, {
                                key: ns["b"].History,
                                name: "历史记录",
                                icon: "ts-icon-history",
                                dot: u.value[ns["b"].History] || !1,
                                guideId: wl.NavBarHistory,
                                point: o
                            }]),
                            {
                                handleGuideStart: p,
                                destroy: f
                            } = Ml();
                        Object(l["onMounted"])(p), Object(l["onUnmounted"])(f);
                        const m = async t => {
                            if (c.value !== t) {
                                if (t === ns["b"].Background && (await Object(Dl["h"])(Dl["a"].NavbarBackgroundDot), d.background = !1), e.beforeChange) {
                                    const i = e.beforeChange(c.value, t);
                                    if (!i) return
                                }
                                c.value = t
                            }
                        }, {
                            onMouseEnter: g,
                            onMouseLeave: v,
                            isStaying: b
                        } = jl();
                        return {
                            handleClick: m,
                            currValue: c,
                            navMenuList: h,
                            isStaying: b,
                            onMouseEnter: g,
                            onMouseLeave: v
                        }
                    }
                },
                Nl = Rl,
                Bl = (i("0fc6"), Object(ct["a"])(Nl, Ol, Il, !1, null, "d29dc72c", null)),
                El = Bl.exports,
                Fl = i("1013"),
                Ll = i("e098");
            class Vl {
                constructor(e) {
                    if (this._init = !1, this.info = {
                            bgCleanMode: {
                                default: -1,
                                value: -1
                            },
                            bgCleanMooreMode: {
                                default: -1,
                                value: -1
                            }
                        }, e) {
                        const {
                            bgCleanMode: t,
                            bgCleanMooreMode: i
                        } = e;
                        if (this.info.bgCleanMode.value = t.value, this.info.bgCleanMode.default = t.default, i) this.info.bgCleanMooreMode.default = i.default, this.info.bgCleanMooreMode.value = i.value;
                        else {
                            const t = e.bgCleanMode.default;
                            this.info.bgCleanMooreMode.default = t, this.info.bgCleanMooreMode.value = t
                        }
                        this._init = !0
                    }
                }
                get init() {
                    return this._init
                }
                get bgCleanMooreMode() {
                    return this.info.bgCleanMooreMode
                }
                get bgCleanMode() {
                    return this.info.bgCleanMode
                }
                getJson() {
                    return this.info
                }
                getJsonStr() {
                    try {
                        return JSON.stringify(this.info)
                    } catch (e) {
                        return console.warn("[ExtraInfoModel] ", e), ""
                    }
                }
                setDefaultCleanMode(e) {
                    this.info.bgCleanMode.default = e, this.info.bgCleanMode.value = e, this.info.bgCleanMooreMode.default = e, this.info.bgCleanMooreMode.value = e, this._init = !0
                }
                isNeedUpdateDefaultMode(e) {
                    return this.info.bgCleanMode.default !== e || this.info.bgCleanMooreMode.default !== e
                }
                updateDefaultMode(e) {
                    this.info.bgCleanMode.default = e, this.info.bgCleanMooreMode.default = e
                }
                updateBgCleanMode(e) {
                    this.info.bgCleanMode.value = e
                }
                updateBgCleanMooreMode(e) {
                    this.info.bgCleanMooreMode.value = e
                }
            }
            var Al = i("286a"),
                Ul = i("7f3e"),
                $l = i("9573"),
                Hl = i("ec26");
            class zl {
                constructor() {
                    this._stack = [], this._limit = 10, this._allowExpirePop = !1, this.activeIndex = -1, this.currRecord = null
                }
                getRecordStack() {
                    return this._stack.map((e, t) => ({
                        ...e,
                        active: this.activeIndex === t
                    }))
                }
                _limitRecord() {
                    if (this._stack.length > this._limit) {
                        const e = this._stack[0] && "init" === this._stack[0].type;
                        this._stack.forEach((t, i) => {
                            this._stack.length - i > this._limit && (!e || e && 0 !== i) && (t.disabled = !0)
                        })
                    }
                }
                _discarding() {
                    this.activeIndex >= 0 && this._stack.length - 1 !== this.activeIndex && (this._stack = this._stack.slice(0, this.activeIndex + 1))
                }
                restore() {
                    if (this._stack.length > 1) {
                        if (!this._allowExpirePop) {
                            const e = this._stack[this._stack.length - 2];
                            if (e && e.disabled) return "-2"
                        }
                        this._stack.pop();
                        const e = this._stack[this._stack.length - 1].uuid;
                        return this.activeIndex = this._stack.length - 1, e
                    }
                    return 1 === this._stack.length ? (this.clear(), "-1") : null
                }
                _activeIndex(e) {
                    if (!this._allowExpirePop) {
                        const t = this._stack[e];
                        if (t && t.disabled) return "-2"
                    }
                    let t = this._stack[e].uuid;
                    return this.activeIndex = e, t
                }
                previous() {
                    if (this._stack.length > 1 && this.activeIndex > 0) {
                        const e = this.activeIndex - 1;
                        return this._activeIndex(e)
                    }
                    return null
                }
                next() {
                    if (this._stack.length > 1 && this.activeIndex >= 0) {
                        const e = this.activeIndex + 1;
                        return this._activeIndex(e)
                    }
                    return null
                }
                createInitRecord(e, t = "init") {
                    const i = {
                        uuid: e,
                        type: "init",
                        name: t,
                        disabled: !1
                    };
                    return this.currRecord = i, this.save(!1), i.uuid
                }
                createRecord(e, t, i = "") {
                    const a = t || Object(Hl["a"])(),
                        n = {
                            uuid: a,
                            type: e,
                            name: i || e,
                            disabled: !1
                        };
                    return this.currRecord = n, n.uuid
                }
                activeOperation(e) {
                    const t = this._stack.findIndex(t => t.uuid === e);
                    return t >= 0 && (this.activeIndex = t), this
                }
                activeRecord() {
                    return this._stack[this.activeIndex]
                }
                save(e = !0) {
                    this.currRecord && (this._discarding(), this._stack.push(this.currRecord), this._limitRecord(), e && (this.activeIndex = this._stack.length - 1))
                }
                clear() {
                    this._stack = [], this.activeIndex = -1, this.currRecord = null
                }
                destroy() {
                    this.clear()
                }
            }
            var Wl = zl;
            class ql extends Ws {
                constructor(e) {
                    super(), this.loaded = !1, this.isDestroy = !1, this.thumbnailId = -1, this.photoId = "", this.refineUUID = "", this.operationStack = new Wl, this.thumbnailId = e, el(this, "addKeyDownEvent", "revRecordCallback")
                }
                get tool() {
                    return this.toolControl.tool
                }
                _emitHistoryChange() {
                    this.emit(il.HistoryUpdate, this.operationStack.getRecordStack().reverse())
                }
                revRecordCallback(e) {
                    e.id === this.thumbnailId && ("init" !== e.type ? this._createRecord(e.type, e.uuid) : this.onInitCompleted(e))
                }
                onInitCompleted(e) {
                    this.loaded = !0, this._createRecord(Ul["h"].Init, e.uuid), this.listenerKeyboard(), this.toolControl.mounted(), this.changeTool(this.toolControl.tool)
                }
                _createRecord(e = Ul["h"].Tool, t = "") {
                    let i = "";
                    switch (e) {
                        case Ul["h"].Init:
                            i = this.operationStack.createInitRecord(Ul["g"], Ul["i"][this.qtPhotoMode] || Ul["g"]), this.operationStack.activeOperation(Ul["g"]);
                            break;
                        case Ul["h"].Reset:
                            i = this.operationStack.createRecord(Ul["h"].Reset, t, zs[Ul["h"].Reset]), this.operationStack.save();
                            break;
                        case Ul["h"].Tool:
                            i = this.operationStack.createRecord(this.tool, t, zs[this.tool]), this.operationStack.save();
                            break
                    }
                    return this._emitHistoryChange(), i
                }
                init() {
                    o["c"].addListener(o["a"].ThumbnailPainterRecord, this.revRecordCallback), o["c"].useProcessMode(this.refineUUID, this.photoId, this.qtPhotoMode).then(() => {})
                }
                setRefineUUID(e, t) {
                    this.photoId = e, this.refineUUID = t
                }
                changeTool(e) {
                    if (!this.loaded) return this;
                    const t = this.toolControl.changeTool(e).activeTool;
                    return t ? (o["c"].switchTool(this.refineUUID, this.photoId, this.qtToolKey, {
                        ...t.getDataForAlgorithm()
                    }).then(() => {}), this) : this
                }
                resetPicture() {
                    return this
                }
                closeProcessMode(e) {
                    this.loaded && (this.loaded = !1, o["c"].closeProcessMode(this.refineUUID, this.photoId, e).then(() => {}))
                }
                async locatePainterStep(e) {
                    if (!e) return;
                    const t = this.operationStack.activeOperation(e).activeRecord();
                    t && (e === Ul["g"] ? await o["c"].locatePainterStep(this.refineUUID, this.photoId, "-1", this.qtPhotoMode) : await o["c"].locatePainterStep(this.refineUUID, this.photoId, t.uuid, this.qtPhotoMode), this._emitHistoryChange())
                }
                addKeyDownEvent(e) {
                    if ([$l["b"].Undo, $l["b"].Redo].includes(e)) {
                        const t = this.operationStack.activeRecord();
                        if (t && t.uuid === Ul["g"] && $l["b"].Undo === e) return;
                        const i = e === $l["b"].Undo ? this.operationStack.previous() : this.operationStack.next();
                        if (!i) return;
                        switch (i) {
                            case "-1":
                                this.resetPicture();
                                break;
                            case "-2":
                                this.emit(il.HistoryExpired);
                                break;
                            default:
                                this.locatePainterStep(i).then(() => {});
                                break
                        }
                    }
                }
                listenerKeyboard(e = !1) {
                    e ? o["c"].removeListener(o["a"].signalMouseAndKeyboardEvent) : o["c"].addListener(o["a"].signalMouseAndKeyboardEvent, this.addKeyDownEvent)
                }
                destroy() {
                    this.isDestroy = !0, this.operationStack.destroy(), this.toolControl.unmounted(), this.listenerKeyboard(!0), this.removeAllListener(il.HistoryExpired), this.removeAllListener(il.HistoryUpdate), o["c"].removeListener(o["a"].ThumbnailPainterRecord)
                }
            }
            class Gl extends ql {
                constructor(e) {
                    super(e), this.toolControl = tl.getInstance(), this._isDragging = !1, this._showResetDefaultMask = !1, this._hasChangedMask = !1, this.qtPhotoMode = Ul["d"].Defect, this.qtToolKey = Ul["f"].DefectPainter
                }
                get isUseTool() {
                    return !this.isDragging && !!this.tool
                }
                get isDragging() {
                    return this._isDragging
                }
                set isDragging(e) {
                    this._isDragging = e, this.emit(il.DragStateChanged, this._isDragging)
                }
                set showResetDefaultMask(e) {
                    this._showResetDefaultMask = e, this.emit(il.ShowResetDefaultMask, this._showResetDefaultMask)
                }
                onInitCompleted(e) {
                    console.debug("[DefectControl] init: useProcessMode success !"), "boolean" === typeof e.paintMaskIsEmpty && (this._hasChangedMask = !e.paintMaskIsEmpty, this.showResetDefaultMask = this._hasChangedMask), super.onInitCompleted(e)
                }
                _createRecord(e, t) {
                    return e === Ul["h"].Tool && (this.showResetDefaultMask = !0), super._createRecord(e, t)
                }
                setRefineUUID(e, t) {
                    this.photoId = e, this.refineUUID = t
                }
                changeTool(e) {
                    this.isDragging = !1;
                    const t = this.toolControl.changeTool(e).activeTool;
                    if (!t) return this;
                    const {
                        size: i,
                        feather: a,
                        opacity: n
                    } = null === t || void 0 === t ? void 0 : t.getDataForAlgorithm();
                    return console.log(`[PainterControl] isEraser: ${null===t||void 0===t?void 0:t.isEraser}, size: ${i}, feather: ${a}, opacity: ${n}`), o["c"].switchTool(this.refineUUID, this.photoId, this.qtToolKey, {
                        isEraser: t.isEraser,
                        ...t.getDataForAlgorithm()
                    }).then(() => {}), this
                }
                changeHistory(e) {
                    if (e) {
                        if (e === Ul["g"]) this.showResetDefaultMask = this._hasChangedMask;
                        else {
                            const t = this.operationStack.activeOperation(e).activeRecord();
                            if (!t) return;
                            this.showResetDefaultMask = "reset" !== t.type
                        }
                        this.locatePainterStep(e).then(() => {})
                    }
                }
                setRemoveDefectivePaintMask() {
                    this.loaded && (o["c"].handleRemoveDefectivePaintMask(this.refineUUID, this.photoId, Ul["b"].Save), this.destroy())
                }
                cancelRemoveDefectivePaintMask() {
                    this.loaded && (o["c"].handleRemoveDefectivePaintMask(this.refineUUID, this.photoId, Ul["b"].Cancel), this.destroy())
                }
                resetPainterRecord() {
                    this.loaded && o["c"].handleRemoveDefectivePaintMask(this.refineUUID, this.photoId, Ul["b"].Reset)
                }
                destroy() {
                    super.destroy(), this.removeAllListener(il.DragStateChanged), this.removeAllListener(il.InitSize), this.removeAllListener(il.ShowResetDefaultMask)
                }
            }
            var Kl, Jl, Yl = i("6310");
            class Xl extends qs {
                constructor() {
                    super(), this._size = 25, this._density = 30, this._pressure = 30, this._edges = 0
                }
                createCursorElement() {}
                setEdges(e) {
                    this._edges = e
                }
                getComponentData() {
                    return [{
                        name: "大小",
                        value: this._size,
                        min: 10,
                        max: 300,
                        step: .1,
                        type: "size",
                        setValue: e => {
                            console.log("[setValue] size: ", e), this._size = e
                        }
                    }, {
                        name: "密度",
                        value: this._density,
                        min: 0,
                        max: 100,
                        type: "density",
                        setValue: e => {
                            console.log("[setValue] density: ", e), this._density = e
                        }
                    }, {
                        name: "压力",
                        value: this._pressure,
                        min: 1,
                        max: 100,
                        type: "pressure",
                        setValue: e => {
                            console.log("[setValue] pressure: ", e), this._pressure = e
                        }
                    }, {
                        name: "固定边缘",
                        value: this._edges,
                        min: 0,
                        max: 1,
                        type: "edges",
                        cType: "switch",
                        setValue: e => {
                            console.log("[setValue] pressure: ", e), this._edges = e
                        }
                    }]
                }
                getDataForAlgorithm() {
                    return {
                        size: this._size,
                        density: this._density,
                        pressure: this._pressure,
                        edges: this._edges
                    }
                }
                reset() {}
            }
            class Zl extends Qs {
                constructor() {
                    super(), this._tool = as.Liquefy, el(this, "_addKeyDownEvent", "emit")
                }
                static getInstance() {
                    return this.instance || (this.instance = new Zl), this.instance
                }
                _addKeyDownEvent(e) {
                    var t, i;
                    if (this.tool === as.Liquefy) switch (e.code) {
                        case "BracketLeft":
                        case "BracketRight":
                            const a = e.code,
                                n = (null === (t = this.activeTool) || void 0 === t ? void 0 : t.size) || 0;
                            let o = 10,
                                s = "BracketRight" === a;
                            1 <= n && n < 10 ? o = .2 : 10 < n && n < 20 ? o = .5 : 20 < n && n < 35 ? o = 1 : 35 < n && n < 55 ? o = 2 : 55 < n && n < 75 ? o = 2.5 : 75 < n && n < 95 ? o = 4 : 95 < n && n < 125 ? o = 6 : 125 < n && n < 225 ? o = 10 : 225 < n && n < 300 && (o = 15), 10 === n ? o = s ? .5 : .2 : 20 === n ? o = s ? 1 : .5 : 35 === n ? o = s ? 2 : 1 : 55 === n ? o = s ? 2.5 : 2 : 75 === n ? o = s ? 4 : 2.5 : 95 === n ? o = s ? 6 : 4 : 125 === n ? o = s ? 10 : 6 : 225 === n ? o = s ? 15 : 10 : 300 === n && (o = 15), null === (i = this.activeTool) || void 0 === i || i.increaseSize(s ? o : -o), this.emit("on-update");
                            break
                    }
                }
                initTools() {
                    const e = new Map;
                    return e.set(as.Liquefy, new Xl), e
                }
            }
            class Ql extends ql {
                constructor(e) {
                    super(e), this.toolControl = Zl.getInstance(), this._isDragging = !1, this._showResetDefaultMask = !1, this._hasChangedMask = !1, this.qtPhotoMode = Ul["d"].Liquefy, this.qtToolKey = Ul["f"].LiquefyPainter
                }
                get isUseTool() {
                    return !this.isDragging && !!this.tool
                }
                get isDragging() {
                    return this._isDragging
                }
                set isDragging(e) {
                    this._isDragging = e, this.emit(il.DragStateChanged, this._isDragging)
                }
                set showResetDefaultMask(e) {
                    this._showResetDefaultMask = e, this.emit(il.ShowResetDefaultMask, this._showResetDefaultMask)
                }
                onInitCompleted(e) {
                    if (console.debug("[LiquefyControl] init: useProcessMode success !"), "boolean" === typeof e.paintMaskIsEmpty) {
                        const t = this.toolControl.activeTool;
                        t.setEdges(e.paintMaskIsEmpty ? 1 : 0), this.toolControl.emit("on-update")
                    }
                    super.onInitCompleted(e)
                }
                _createRecord(e, t = "") {
                    return "tool" === e && (this.showResetDefaultMask = !0), super._createRecord(e, t)
                }
                changeTool(e) {
                    const t = this.toolControl.changeTool(e).activeTool,
                        {
                            size: i,
                            density: a,
                            pressure: n
                        } = null === t || void 0 === t ? void 0 : t.getDataForAlgorithm();
                    return console.debug(`[LiquefyControl] changeTool: (size: ${i}, density: ${a}, pressure: ${n})`), super.changeTool(e)
                }
                resetLiquefy() {
                    return o["c"].handleLiquifyOperate(this.refineUUID, this.photoId, Ul["c"].Reset), this
                }
                saveLiquefyMode() {
                    this.closeProcessMode(Ul["c"].Save)
                }
                cancelLiquefyMode() {
                    this.closeProcessMode(Ul["c"].Cancel)
                }
                changeHistory(e) {
                    if (e) {
                        if (e === Ul["g"]) this.showResetDefaultMask = this._hasChangedMask;
                        else {
                            const t = this.operationStack.activeOperation(e).activeRecord();
                            if (!t) return;
                            this.showResetDefaultMask = "reset" !== t.type
                        }
                        this.locatePainterStep(e).then(() => {})
                    }
                }
                addKeyDownEvent(e) {
                    super.addKeyDownEvent(e), $l["b"].MousePress === e && this.$emit(al.MouseEvent, !0), e === $l["b"].MouseRelease && this.$emit(al.MouseEvent, !1)
                }
                destroy() {
                    this.removeAllListener(al.MouseEvent), this.removeAllListener(il.DragStateChanged), this.removeAllListener(il.InitSize), this.removeAllListener(il.ShowResetDefaultMask), super.destroy()
                }
            }(function(e) {
                e["Notify"] = "notify", e["Status"] = "status", e["Scale"] = "scale", e["ExtraInfo"] = "extra-info", e["Error"] = "error", e["PresetJsonUpdate"] = "preset-update", e["PresetSuitUpdate"] = "preset-suit-id-update", e["AIResponse"] = "ai-response", e["UpdateHisData"] = "hisData", e["UpdateCropInfo"] = "updateCropInfo", e["UpdatePainterInfo"] = "updatePainterInfo", e["UpdateCostTime"] = "updateCostTime"
            })(Kl || (Kl = {})),
            function(e) {
                e["PreviewAll"] = "previewAll", e["OnlyPreviewPalette"] = "onlyPreviewPalette"
            }(Jl || (Jl = {}));
            class er extends Ws {
                constructor(e, t, i, a) {
                    super(), this.imgIndex = -1, this.isDestroy = !1, this.photoID = "", this.paletteViewModel = null, this.beautifyViewModel = null, this.extraInfoModel = null, this.exifInfo = {}, this.painterControl = null, this.liquefyControl = null, this._isLoadingThumb = !1, this._thumbnailLoading = !1, this._imageLoading = !1, this._algorithmLoading = !1, this._maskLoading = !1, this._loadingText = "", this.isPainting = !1, this.updateTime = +new Date, this.isSetEffectHis = !1, this._paintRemoveDefectiveMaskIsEmpty = !0, this._allowPainter = !1, this._isOnlyPreviewPalette = !1, b["a"].shareInstance().addObject(this), this.userId = e, this.projectId = i, this.thumbnailModel = t, this.refineUUID = a, this.registerListener()
                }
                get thumbnailId() {
                    return this.thumbnailModel.id || -1
                }
                get imgFormat() {
                    return this.thumbnailModel.imgFormat
                }
                getPhotoControlInfo() {
                    return {
                        refineUUID: this.refineUUID,
                        projectId: this.projectId,
                        photoID: this.photoID,
                        imgPath: this.thumbnailModel.imgPath,
                        thumbnailId: this.thumbnailId
                    }
                }
                get isRaw() {
                    return this.imgFormat === Fl["d"].Raw
                }
                get imgPath() {
                    return this.thumbnailModel.imgPath
                }
                get allowModifyGender() {
                    return !this._thumbnailLoading && !this._imageLoading
                }
                get effectLoaded() {
                    return !this._thumbnailLoading && !this._imageLoading && !this._algorithmLoading
                }
                get allowPainter() {
                    return this.effectLoaded && this._allowPainter
                }
                get loading() {
                    return this._thumbnailLoading || this.quickCancelImageLoading || this._algorithmLoading || this._maskLoading
                }
                get quickCancelImageLoading() {
                    return this.thumbnailModel.presetSuitId === Fl["g"].NoEffect ? !this._isLoadingThumb && this._imageLoading : this._imageLoading
                }
                emit(e, ...t) {
                    return this.isDestroy ? this : super.emit(e, ...t)
                }
                registerListener() {
                    o["c"].addListener(o["a"].ThumbnailStatus, e => {
                        if (e.id === this.thumbnailId)
                            if (e.status > 0) this._updateLoadingStatus(e.status);
                            else {
                                const t = Object(Fi["l"])(this.thumbnailModel.imgPath);
                                let i = `文件: ${t}加载失败`;
                                if (e.code === Fl["b"].COMPLETE_CODE_UN_SUPPORT_IMAGE_FORMAT) i = E["b"] + "暂时无法打开此文件", Yl["b"].getExport().asyncReportRawShowError({
                                    path: this.thumbnailModel.imgPath,
                                    id: this.thumbnailModel.id
                                });
                                else if (e.code === Fl["b"].COMPLETE_CODE_FAILED_GENERATE_SEED) return this._updateLoadingStatus(Fl["c"].EffectLoaded), void this.emit(Kl.Notify, "底层处理失败，请重试");
                                this.emit(Kl.Error, {
                                    ...e,
                                    message: i
                                })
                            }
                    }), o["c"].addListener(o["a"].ThumbnailExtraInfo, e => {
                        e.id === this.thumbnailId && (this.isRaw && (this.exifInfo = e.extendInfo.exifInfo, this._updateExifInfo()), this.emit(Kl.ExtraInfo, e, this), this.isSetEffectHis || this.updateHisData(e.extendInfo.hisData))
                    }), o["c"].addListener(o["a"].ThumbnailAIResponse, e => {
                        if (e.id !== this.thumbnailId) return;
                        const {
                            extraInfo: t,
                            bgCleanMode: i
                        } = e;
                        "undefined" !== typeof i && this.initExtraInfoModel(i, t), this.emit(Kl.AIResponse, e, this)
                    }), o["c"].addListener(o["a"].ThumbnailScale, Object(g["debounce"])(e => {
                        e.id === this.thumbnailId && this.emit(Kl.Scale, 100 * e.scale)
                    }, 30, {
                        leading: !0
                    })), o["c"].addListener(o["a"].SignalThumbnailEvent, e => {
                        if (e.id === this.thumbnailId) switch (e.eventId) {
                            case o["b"].UpdateHisData:
                                this.updateHisData(e.data);
                                break;
                            case o["b"].CropInfo:
                                this.updateCropInfo(e.data);
                                break;
                            case o["b"].UpdatePainterInfo:
                                this._paintRemoveDefectiveMaskIsEmpty = e.data.paintRemoveDefectiveMaskIsEmpty, this._allowPainter = e.data.allowPainter || !1, this._updatePainterInfo();
                                break;
                            case o["b"].CostTimeRecorder:
                                this.updateCostTimeData(e);
                                break;
                            case o["b"].ProcessCode:
                                this._updateProcessMessage(e.data);
                                break;
                            case o["b"].Rotate:
                                this._updateRotate(e.data);
                                break;
                            case o["b"].FinishCrop:
                                this.emit(o["b"].FinishCrop);
                                break;
                            case o["b"].ChangeRatio:
                                this._updateCropRatio(e.data);
                                break;
                            case o["b"].PresetUpdate:
                                this._onPresetUpdate(e.data);
                                break
                        }
                    })
                }
                _onPresetUpdate(e) {
                    console.debug("RefineThumbnailEventId.PresetUpdate: ", e);
                    let t = null,
                        i = null;
                    try {
                        t = JSON.parse(e.configJsonStr), i = JSON.parse(e.toningConfigStr)
                    } catch (o) {}
                    const a = new mn["a"](t, null, this.userId, e.path),
                        n = new gn["a"]({
                            json: i,
                            id: "",
                            imgFormat: this.imgFormat,
                            userId: this.userId
                        });
                    this.beautifyViewModel = a, this.updateBgCleanMode(), this.paletteViewModel = n, this.isRaw && this._updateExifInfo(), this.emit(Kl.PresetSuitUpdate, {
                        lastPresetSuitId: e.lastPresetSuitId,
                        presetSuitId: e.presetSuitId,
                        presetId: e.presetId
                    }), this.emit(Kl.PresetJsonUpdate, this.beautifyViewModel, this.paletteViewModel)
                }
                _updateCropRatio(e) {
                    var t;
                    const i = null === (t = this.beautifyViewModel) || void 0 === t ? void 0 : t.cropModel;
                    i && i.setRatio(e)
                }
                _updateRotate(e) {
                    var t;
                    const i = null === (t = this.beautifyViewModel) || void 0 === t ? void 0 : t.setRotate(e.angle, "angle").rotateModel;
                    i && this.emit("on-rotate", i.rotate)
                }
                _updateProcessMessage(e) {
                    const {
                        code: t,
                        curr: i,
                        total: a
                    } = e, n = F["i"][t] || "";
                    this._loadingText = `正在处理${n}(${i}/${a})`, this.emit(Kl.Status, {
                        loading: this.loading,
                        loadingText: this._loadingText,
                        allowModifyGender: this.allowModifyGender
                    })
                }
                _updateLoadingStatus(e) {
                    switch (e) {
                        case Fl["c"].ThumbnailLoading:
                            this._thumbnailLoading = !0, this._isLoadingThumb = !1;
                            break;
                        case Fl["c"].ThumbnailLoaded:
                            this._thumbnailLoading = !1, this._isLoadingThumb = !0;
                            break;
                        case Fl["c"].OriginLoading:
                            this._imageLoading = !0;
                            break;
                        case Fl["c"].OriginLoaded:
                            this._imageLoading = !1;
                            break;
                        case Fl["c"].EffectLoading:
                            this._allowPainter = !1, this._algorithmLoading = !0;
                            break;
                        case Fl["c"].EffectLoaded:
                            this._algorithmLoading = !1;
                            break;
                        case Fl["c"].MaskLoading:
                            this._maskLoading = !0;
                            break;
                        case Fl["c"].MaskLoaded:
                            this._maskLoading = !1;
                            break
                    }
                    this.emit(Kl.Status, {
                        loading: this.loading,
                        effectLoaded: this.effectLoaded,
                        loadingText: this._loadingText,
                        allowModifyGender: this.allowModifyGender
                    }), this._updatePainterInfo()
                }
                _updateExifInfo() {
                    const e = this.exifInfo;
                    this.paletteViewModel && Object.keys(e).length > 0 && (this.paletteViewModel.setBaseParam(_["c"].EnhanceEditColorTemperature, e.oriWbICC), this.paletteViewModel.setBaseParam(_["c"].EnhanceEditHue, e.oriWbTint))
                }
                updateHisData(e) {
                    let t = {};
                    e ? (t = {
                        red: e.red ? Object(Fi["m"])(e.red) : [],
                        green: e.green ? Object(Fi["m"])(e.green) : [],
                        blue: e.blue ? Object(Fi["m"])(e.blue) : []
                    }, this.isSetEffectHis = !0) : console.warn("updateHisData: data is null"), this.emit(Kl.UpdateHisData, t)
                }
                updateCropInfo(e) {
                    e.isValid ? this.emit(Kl.UpdateCropInfo, {
                        cropWidth: e.cropRoi.width,
                        cropHeight: e.cropRoi.height
                    }) : this.emit(Kl.UpdateCropInfo, {
                        cropWidth: 0,
                        cropHeight: 0
                    })
                }
                _updatePainterInfo() {
                    this.emit(Kl.UpdatePainterInfo, {
                        paintRemoveDefectiveMaskIsEmpty: this._paintRemoveDefectiveMaskIsEmpty,
                        allowPainter: this.allowPainter
                    })
                }
                updateCostTimeData(e) {
                    this.emit(Kl.UpdateCostTime, {
                        data: e
                    })
                }
                async start(e = !1) {
                    this.updateTime = +new Date, e && (this._isOnlyPreviewPalette = !0), console.log("start refineUUID: ", this.refineUUID), this.photoID = await o["c"].loadImage(this.refineUUID, this.thumbnailModel.id, e)
                }
                getParamsJson() {
                    var e, t;
                    return {
                        beautifyJson: (null === (e = this.beautifyViewModel) || void 0 === e ? void 0 : e.parseToJson()) || null,
                        paletteJson: (null === (t = this.paletteViewModel) || void 0 === t ? void 0 : t.parseToJson()) || null
                    }
                }
                reloadProcessImage(e = "") {
                    o["c"].reloadProcessImage(this.refineUUID, this.photoID, e), e === Jl.OnlyPreviewPalette ? this._isOnlyPreviewPalette = !0 : e === Jl.PreviewAll && (this._isOnlyPreviewPalette = !1)
                }
                async onApplyPresetClick(e) {
                    e.id === Fl["g"].NoEffect && (await this.resetRemoveDefectivePaintMask(), await this.resetLiquefyMask()), await o["c"].applyPresetSuit(this.refineUUID, this.photoID, e.id + "", e.name)
                }
                async onChangeColor(e, t = !1, i) {
                    if (!this.paletteViewModel) return;
                    const a = e.map(e => e.key),
                        n = this.paletteViewModel.updateParams(e),
                        o = t ? n : a,
                        s = this.paletteViewModel.getParamsModel(o);
                    (1 === s.length && 300 === s[0].flag || this._isOnlyPreviewPalette || !t) && this.setParamValueToTsImageIO(s, !1, "palette", t, i)
                }
                async onChangeBeautify(e, t = !1, i) {
                    var a, n, o;
                    if (!this.beautifyViewModel) return;
                    const s = null === (a = this.beautifyViewModel) || void 0 === a ? void 0 : a.updateParams(e),
                        l = e.map(e => e.key),
                        r = null === (n = this.beautifyViewModel) || void 0 === n ? void 0 : n.needReloadThumbnailByModify(s);
                    if (r) {
                        const t = e.find(e => e.key === _["a"].FaceSurgery);
                        t && "V1" === t.value && this.emit("notify", "当前已开启旧版面部重塑效果")
                    }
                    const c = s.some(e => [_["c"].BgCleanMode, _["c"].BgCleanMooreMode].includes(e));
                    if (c && this.extraInfoModel) {
                        const t = e.find(e => e.key === _["c"].BgCleanMode);
                        t && this.extraInfoModel.updateBgCleanMode(t.value);
                        const i = e.find(e => e.key === _["c"].BgCleanMooreMode);
                        i && this.extraInfoModel.updateBgCleanMooreMode(i.value)
                    }
                    const u = t ? s : l,
                        d = null === (o = this.beautifyViewModel) || void 0 === o ? void 0 : o.getParamsModel(u);
                    d.length > 0 && this.setParamValueToTsImageIO(d, !1, "beautify", t, i)
                }
                setParamValueToTsImageIO(e, t, i = "beautify", a = !1, n) {
                    const s = [];
                    let l = e.length >= 2;
                    e.forEach(e => {
                        if (e instanceof z["a"] || e instanceof ai["a"])
                            if (l = !0, l) {
                                const t = {
                                    constructor: "EffectModel",
                                    name: e.name,
                                    personType: -1,
                                    path: e.path
                                };
                                e instanceof z["a"] && (t.personType = e.personType), s.push(t)
                            } else o["c"].updateEffect(this.refineUUID, this.photoID, e.name, e.path, e instanceof z["a"] ? null === e || void 0 === e ? void 0 : e.personType : -1);
                        else e instanceof Al["a"] ? (l = !0, s.push({
                            key: _["a"].FaceSurgery,
                            constructor: "AlgoVersionModel",
                            value: e.parseToJson()
                        })) : e instanceof I["a"] ? l ? s.push({
                            constructor: "HslParamModel",
                            colorFlag: e.colorFlag,
                            flag: e.flag,
                            value: e.getFloatValue()
                        }) : o["c"].setPaletteValue(this.refineUUID, this.photoID, e.getFloatValue(), e.flag, e.colorFlag, a, n) : e instanceof O["a"] ? l ? s.push({
                            constructor: "PersonParamModel",
                            personType: e.personFlag,
                            flag: e.flag,
                            value: e.getFloatValue()
                        }) : o["c"].setBeautifyValue(this.refineUUID, this.photoID, e.getFloatValue(), e.flag, e.personFlag, a, n) : e instanceof Ll["a"] ? l ? s.push({
                            constructor: "WhiteBalanceParamModel",
                            flag: e.flag,
                            value: e.getFloatValue()
                        }) : o["c"].setPaletteValue(this.refineUUID, this.photoID, e.getFloatValue(), e.flag, -1, a, n) : l ? s.push({
                            constructor: "ParamsModel",
                            flag: e.flag,
                            value: e.getFloatValue(),
                            type: i
                        }) : "beautify" === i ? o["c"].setBeautifyValue(this.refineUUID, this.photoID, e.getFloatValue(), e.flag, -1, a, n) : o["c"].setPaletteValue(this.refineUUID, this.photoID, e.getFloatValue(), e.flag, -1, a, n)
                    }), l && s.length > 0 && o["c"].batchSetValue(this.refineUUID, this.photoID, s, a, n), a || this.emit(Kl.PresetSuitUpdate, {
                        presetSuitId: "0",
                        presetId: "0"
                    })
                }
                changeRatio(e) {
                    o["c"].changeRatio(this.refineUUID, this.photoID, e / 100)
                }
                imageResize(e) {
                    o["c"].imageResize(this.refineUUID, this.photoID, e)
                }
                compare(e) {
                    o["c"].imageCompare(this.refineUUID, this.photoID, e)
                }
                async resetRemoveDefectivePaintMask() {
                    await o["c"].handlePhotoControlOperate(this.refineUUID, this.photoID, Ul["e"].ResetDefectMask)
                }
                async resetLiquefyMask() {
                    await o["c"].handlePhotoControlOperate(this.refineUUID, this.photoID, Ul["e"].ResetLiquefyMask)
                }
                updateBgCleanMode() {
                    if (this.extraInfoModel) {
                        var e, t;
                        const i = this.extraInfoModel.bgCleanMode,
                            a = this.extraInfoModel.bgCleanMooreMode;
                        null === (e = this.beautifyViewModel) || void 0 === e || e.updateBgCleanMode(i.value), null === (t = this.beautifyViewModel) || void 0 === t || t.updateBgCleanMooreMode(a.value)
                    }
                }
                initExtraInfoModel(e, t) {
                    let i = !1;
                    if (t) try {
                        const a = JSON.parse(t),
                            n = new Vl(a);
                        i = !0;
                        const o = n.isNeedUpdateDefaultMode(e);
                        o && n.updateDefaultMode(e), this.extraInfoModel = n
                    } catch (a) {
                        console.warn("[initExtraInfoModel] ", a)
                    }
                    if (!i) {
                        const t = new Vl;
                        t.setDefaultCleanMode(e), this.extraInfoModel = t
                    }
                    this.updateBgCleanMode()
                }
                usePainterMode() {
                    var e;
                    return this.painterControl = new Gl(this.thumbnailId), null === (e = this.painterControl) || void 0 === e || e.setRefineUUID(this.photoID, this.refineUUID), this.painterControl.init(), this.painterControl
                }
                finishPainterMode() {
                    var e;
                    o["c"].closeProcessMode(this.refineUUID, this.photoID).then(() => {}), null === (e = this.painterControl) || void 0 === e || e.destroy(), this.painterControl = null
                }
                useLiquefyMode() {
                    return this.liquefyControl = new Ql(this.thumbnailId), this.liquefyControl.setRefineUUID(this.photoID, this.refineUUID), this.liquefyControl.init(), this.liquefyControl
                }
                finishLiquefyMode() {
                    var e;
                    o["c"].closeProcessMode(this.refineUUID, this.photoID).then(() => {}), null === (e = this.liquefyControl) || void 0 === e || e.destroy(), this.liquefyControl = null
                }
                useCropTool() {
                    var e, t;
                    o["c"].useProcessMode(this.refineUUID, this.photoID, Ul["d"].Crop).then(() => {});
                    const i = {
                            type: 0,
                            width: 1,
                            height: 1,
                            dpi: 30,
                            unit: 0,
                            flipX: 1,
                            flipY: 1,
                            rotate: 0
                        },
                        a = null === (e = this.beautifyViewModel) || void 0 === e ? void 0 : e.rotateModel;
                    a && Object.assign(i, a.toComponent());
                    const n = null === (t = this.beautifyViewModel) || void 0 === t ? void 0 : t.cropModel;
                    return n && Object.assign(i, n.toComponent()), i
                }
                closeTool() {
                    o["c"].closeProcessMode(this.refineUUID, this.photoID).then(() => {
                        this.emit(Kl.PresetSuitUpdate, {
                            presetSuitId: "0",
                            presetId: "0"
                        })
                    }), this.emit(Kl.PresetJsonUpdate, this.beautifyViewModel, this.paletteViewModel)
                }
                getCropObj() {
                    var e, t;
                    const i = null === (e = this.beautifyViewModel) || void 0 === e ? void 0 : e.rotateModel.toComponent(),
                        a = null === (t = this.beautifyViewModel) || void 0 === t ? void 0 : t.cropModel.toComponent();
                    return {
                        ...i,
                        ...a
                    }
                }
                handleRotate(e, t = "rotate") {
                    var i;
                    const a = null === (i = this.beautifyViewModel) || void 0 === i ? void 0 : i.setRotate(e, t).rotateModel;
                    a && o["c"].handleRotate(this.refineUUID, this.photoID, a.rotate)
                }
                handleFlip(e, t) {
                    var i;
                    const a = null === (i = this.beautifyViewModel) || void 0 === i ? void 0 : i.setFlit(e, t).rotateModel;
                    a && o["c"].handleFlit(this.refineUUID, this.photoID, a.flipX, a.flipY)
                }
                handleCrop(e) {
                    var t;
                    const i = null === (t = this.beautifyViewModel) || void 0 === t ? void 0 : t.setCrop(e).cropModel;
                    i && o["c"].handleCrop(this.refineUUID, this.photoID, Ul["a"].Update, i.toJson())
                }
                handleResetCrop(e) {
                    var t;
                    const i = null === (t = this.beautifyViewModel) || void 0 === t ? void 0 : t.setCrop(e).cropModel;
                    i && o["c"].handleCrop(this.refineUUID, this.photoID, Ul["a"].Reset, i.toJson())
                }
                _removePhotoCtrlListener() {
                    this.removeAllListener(Kl.Notify), this.removeAllListener(Kl.Status), this.removeAllListener(Kl.Scale), this.removeAllListener(Kl.ExtraInfo), this.removeAllListener(Kl.AIResponse), this.removeAllListener(Kl.Error), this.removeAllListener(Kl.PresetJsonUpdate), this.removeAllListener(Kl.PresetSuitUpdate), this.removeAllListener(Kl.UpdateHisData), this.removeAllListener(Kl.UpdateCropInfo), this.removeAllListener(Kl.UpdatePainterInfo)
                }
                _removeRefineThumbnailEvent() {
                    this.removeAllListener(o["b"].Rotate)
                }
                hasBeautifyEffect() {
                    var e;
                    return (null === (e = this.beautifyViewModel) || void 0 === e ? void 0 : e.hasEffect()) || !1
                }
                destroy() {
                    var e, t;
                    this.isDestroy = !0, this.paletteViewModel = null, this.beautifyViewModel = null, null === (e = this.painterControl) || void 0 === e || e.destroy(), this.painterControl = null, null === (t = this.liquefyControl) || void 0 === t || t.destroy(), this.liquefyControl = null, this._removePhotoCtrlListener(), this._removeRefineThumbnailEvent()
                }
            }
            var tr = i("718c");

            function ir(e, t, {
                beforeThumbnailChange: i,
                isOnlyPreviewPalette: a
            }) {
                var n;
                const c = null === (n = Object(l["getCurrentInstance"])()) || void 0 === n ? void 0 : n.proxy,
                    u = Object(l["computed"])(() => r["a"].getters["thumbnail/activeThumbnailId"]),
                    d = Object(l["computed"])(() => r["a"].getters["project/activeProject"]),
                    h = Object(l["computed"])(() => r["a"].getters.userId),
                    p = Object(l["ref"])(null),
                    f = Object(l["reactive"])({
                        init: !1,
                        loading: !1,
                        loadingText: "",
                        effectLoaded: !1,
                        allowModifyGender: !1,
                        paintRemoveDefectiveMaskIsEmpty: !0,
                        allowPainter: !1
                    }),
                    m = Object(l["reactive"])({
                        costIsPro: Object(l["ref"])(E["T"]),
                        costTimeData: {},
                        costLastTime: -1,
                        costNewTime: -1
                    }),
                    g = Object(l["ref"])(100),
                    v = Object(l["ref"])(-1);
                let b = !1;
                const y = Object(l["reactive"])({
                        chartData: {},
                        imageInfo: {}
                    }),
                    {
                        PointFileNotExit: w,
                        PointFileCopyPath: k
                    } = Object(un["a"])(),
                    C = async e => {
                        let t = await Zt["a"].isFileExist(e.imgPath);
                        if (!t) {
                            let t = e.imgPath,
                                i = await s["a"].basename(t),
                                a = (await Zt["a"].findDirPath(t), null === c || void 0 === c ? void 0 : c.$createElement),
                                n = {
                                    style: "font-size: 16px; font-weight: 500; margin: 12px 0 16px; word-break: break-all"
                                },
                                o = {
                                    style: "line-height: 24px; font-weight: 400; word-break: break-all; color: rgba(255, 255, 255, 0.65)"
                                },
                                l = a("div", n, [a("span", n, '"'), a("span", n, "" + i), a("span", n, '"不存在')]),
                                r = null;
                            return r = a("div", o, [a("div", {
                                style: "margin-bottom: 8px"
                            }, "可能是您移动了文件位置或修改了文件名"), a("span", {}, "原始位置："), a("span", {}, "" + t)]), null === c || void 0 === c || c.tsConfirm({
                                title: null,
                                customTitleEl: l,
                                customMessageEl: r,
                                showCancelButton: !1,
                                confirmButtonText: "复制原始路径",
                                distinguishCancelAndClose: !0,
                                beforeClose: function(e, t, i) {
                                    "close" === e && w(), i()
                                }
                            }).then(e => {
                                tr["a"].writeText(t), c.tsNotify("原始路径已复制"), k()
                            }).catch(e => {
                                console.log(e)
                            }), !1
                        }
                        return !!e.isValid || (null === c || void 0 === c || c.tsConfirm({
                            title: "系统提示",
                            message: E["b"] + "暂时无法打开此文件",
                            showCancelButton: !1
                        }).then(e => {}), Yl["b"].getExport().asyncReportRawShowError({
                            path: e.imgPath,
                            id: e.id
                        }), !1)
                    };

                function x(e, t) {
                    const i = e.bgCleanMode,
                        a = e.bgCleanMooreMode;
                    i && a && (r["a"].commit("refine/_SetDefaultMode", {
                        bgCleanModeDefault: i.default,
                        bgCleanMooreModeDefault: a.default
                    }), r["a"].commit("refine/_SetBeautifyParams", t.beautifyViewModel))
                }

                function P() {
                    var e;
                    y.imageInfo = {}, y.chartData = {}, f.loadingText = "", f.paintRemoveDefectiveMaskIsEmpty = !0, f.allowPainter = !1, f.init = !1, v.value = -1, r["a"].commit("refine/_SetBaseValue", {
                        oriWbICC: 0,
                        oriWbTint: 0,
                        loaded: !1,
                        isRaw: !1
                    }), r["a"].commit("refine/_ResetCurrParams"), r["a"].commit("refine/_ResetImageExtraData"), r["a"].commit("refine/_SetExtendInfo", {}), r["a"].commit("refine/_SetSymmetryStatusJson", null), r["a"].commit("refine/_ResetNavbarDots"), null === (e = p.value) || void 0 === e || e.destroy(), p.value = null
                }

                function S(e) {
                    p.value = new er(h.value, e, d.value.id, t.value).on(Kl.Status, ({
                        loading: e,
                        loadingText: t,
                        allowModifyGender: i,
                        effectLoaded: a
                    }) => {
                        E["T"] || (f.loading && !e ? m.costNewTime = (new Date).getTime() : !f.loading && e && (m.costLastTime = (new Date).getTime())), f.init = !0, f.loading = e, f.loadingText = t || "", f.allowModifyGender = i, f.effectLoaded = a
                    }).on(Kl.Scale, e => {
                        g.value = e, -1 === v.value && (v.value = e)
                    }).on(Kl.ExtraInfo, (e, t) => {
                        const {
                            image: i,
                            extendInfo: a
                        } = e;
                        i && (r["a"].commit("thumbnail/_UpdateActiveThumbnail", i), r["a"].commit("refine/_SetOriginImgData", {
                            face: [],
                            width: i.originWidth,
                            height: i.originHeight,
                            dpi: i.dpi
                        })), t.isRaw && a && a.exifInfo && (y.imageInfo = {
                            ...a.exifInfo
                        }, r["a"].commit("refine/_SetBaseValue", {
                            oriWbICC: a.exifInfo.oriWbICC,
                            oriWbTint: a.exifInfo.oriWbTint,
                            loaded: !0,
                            isRaw: !0
                        }), r["a"].commit("refine/_SetPaletteParams", t.paletteViewModel))
                    }).on(Kl.AIResponse, (e, t) => {
                        console.log("PhotoCtrlListenerEvent.AIResponse...data=", JSON.stringify(e));
                        const {
                            face: i,
                            faceIsValid: a,
                            poseRefineInfos: n,
                            skyInfoJson: o,
                            symmetryStatusJson: s
                        } = e;
                        if (i && i.faces) {
                            let e = [];
                            for (const t of i.faces) e.push(new Rn["a"](t));
                            r["a"].commit("initOriginFaceData", e), r["a"].commit("refine/_SetOriginImgData", {
                                face: e
                            }), r["a"].commit("refine/_SetSymmetryStatusJson", s), r["a"].getters.isFaceLoadSuccess || r["a"].dispatch("refine/updatePersonTypeByFaces", i.cacheFaces || i.faces)
                        }
                        r["a"].commit("setIsFaceLoadSuccess", !0), a && t.extraInfoModel && x(t.extraInfoModel, t), n && n.length > 0 && r["a"].commit("refine/_SetExtendInfo", {
                            poseRefineInfos: n
                        }), o && r["a"].commit("refine/_SetSkyExtendInfo", o)
                    }).on(Kl.PresetJsonUpdate, (e, t) => {
                        r["a"].dispatch("refine/updateCurrParamsViewModel", {
                            beautifyViewModel: e,
                            paletteViewModel: t
                        })
                    }).on(Kl.PresetSuitUpdate, e => r["a"].dispatch("thumbnail/ACT_UpdatePresetSuitId", e)).on(Kl.UpdateHisData, e => y.chartData = {
                        ...e
                    }).on(Kl.UpdatePainterInfo, e => {
                        f.paintRemoveDefectiveMaskIsEmpty = e.paintRemoveDefectiveMaskIsEmpty, f.allowPainter = e.allowPainter
                    }).on(Kl.UpdateCropInfo, e => r["a"].commit("refine/_SetOriginImgData", e)).on(Kl.Notify, e => null === c || void 0 === c ? void 0 : c.tsNotify(e)).on(Kl.Error, e => {
                        null === c || void 0 === c || c.tsConfirm({
                            title: "系统提示",
                            message: e.message,
                            showCancelButton: !1
                        }).then(() => {})
                    }).on(Kl.UpdateCostTime, e => m.costTimeData = e), p.value.start(a.value)
                }
                const _ = () => {
                        o["c"].onThumbnailChange(async t => {
                            if (b) return;
                            if (u.value > 0 && t.id === u.value || e.value) return;
                            b = !0, r["a"].commit("thumbnail/_SetSelectedImgIndex", t.index), r["a"].commit("thumbnail/_SetActiveThumbnail", {
                                imgPath: t.imgPath,
                                imgIndex: t.index
                            });
                            const a = await C(t);
                            b = !1, a && !e.value && (r["a"].commit("setIsFaceLoadSuccess", !1), r["a"].commit("thumbnail/_SetActiveThumbnail", t), await r["a"].dispatch("refine/initOriParamsViewModel"), e.value || (i && i(), P(), S(t), await window.$thumbnailOptRecord.loadThumbnailOptRecord(t.id)))
                        })
                    },
                    O = () => {
                        o["c"].removeThumbnailChange(), P(), i = () => {}, r["a"].commit("thumbnail/_ResetActiveThumbnail"), r["a"].commit("refine/_ClearParamsObjCache")
                    };
                return {
                    photoControl: p,
                    imageState: f,
                    costTimeObj: m,
                    fitRatio: g,
                    showAllScale: v,
                    histogramData: y,
                    addThumbnailChangeListener: _,
                    removeThumbnailChangeListener: O,
                    reloadProcessImage: e => {
                        var t;
                        return null === (t = p.value) || void 0 === t ? void 0 : t.reloadProcessImage(e)
                    }
                }
            }
            var ar, nr = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t("div", {
                        staticClass: "thumb-crop-tool"
                    }, [t("div", {
                        staticClass: "tool"
                    }, [t(i.ElCollapse, {
                        ref: "removeTabindex",
                        staticClass: "collapse preset-collapse",
                        model: {
                            value: i.activeNames,
                            callback: function(e) {
                                i.activeNames = e
                            },
                            expression: "activeNames"
                        }
                    }, [t(i.ElCollapseItem, {
                        staticClass: "collapse-item__content",
                        attrs: {
                            title: "裁剪",
                            name: "crop"
                        }
                    }, [t("div", {
                        staticClass: "collapse-title",
                        attrs: {
                            slot: "title"
                        },
                        slot: "title"
                    }, [t("div", {
                        staticClass: "title-span"
                    }, [t("div", {
                        staticClass: "title"
                    }, [e._v("裁剪")])]), t("div", {
                        staticClass: "title-span"
                    }, [t("i", {
                        staticClass: "el-icon-refresh-right reset-btn-icon",
                        on: {
                            click: function(e) {
                                return e.stopPropagation(), i.resetCrop.apply(null, arguments)
                            }
                        }
                    })])]), t(i.CropArea, {
                        ref: "cropRef",
                        on: {
                            "on-show-reset": function(e) {
                                i.isShowCropReset = e
                            },
                            "on-change": function(e) {
                                return i.$emit("on-crop-change", e)
                            }
                        }
                    })], 1), t(i.ElCollapseItem, {
                        staticClass: "collapse-item__content",
                        attrs: {
                            title: "旋转",
                            name: "rotate"
                        }
                    }, [t("div", {
                        staticClass: "collapse-title",
                        attrs: {
                            slot: "title"
                        },
                        slot: "title"
                    }, [t("div", {
                        staticClass: "title-span"
                    }, [t("div", {
                        staticClass: "title"
                    }, [e._v("旋转")])]), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: i.isShowRotateReset,
                            expression: "isShowRotateReset"
                        }],
                        staticClass: "title-span"
                    }, [t("i", {
                        staticClass: "el-icon-refresh-right reset-btn-icon",
                        on: {
                            click: function(e) {
                                return e.stopPropagation(), i.resetRotate.apply(null, arguments)
                            }
                        }
                    })])]), t(i.RotateArea, {
                        ref: "rotateRef",
                        attrs: {
                            rotate: e.rotate
                        },
                        on: {
                            "on-show-reset": function(e) {
                                i.isShowRotateReset = e
                            },
                            "on-rotate": function(e) {
                                return i.$emit("on-rotate", e)
                            },
                            "on-flip": (e, t) => i.$emit("on-flip", e, t)
                        }
                    })], 1)], 1)], 1), t("div", {
                        staticClass: "fixed-bottom"
                    }, [e._t("bottom")], 2)])
                },
                or = [],
                sr = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t("div", {
                        staticClass: "id-photo-tailor-panel crop-info"
                    }, [t("div", {
                        staticClass: "select-box"
                    }, [t(i.TsSelect, {
                        staticClass: "ts-select",
                        on: {
                            change: i.onTypeChange
                        },
                        model: {
                            value: i.params.type,
                            callback: function(t) {
                                e.$set(i.params, "type", t)
                            },
                            expression: "params.type"
                        }
                    }, [e._l(i.tailorTypeList, (function(e, a) {
                        return [t(i.TsSelectOption, {
                            key: a,
                            attrs: {
                                value: e.type,
                                label: e.label,
                                line: e.line || !1,
                                disabled: e.faceNum && !e.faceNum.includes(i.imageOriFaceNum)
                            }
                        })]
                    }))], 2)], 1), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: i.showRadioInput,
                            expression: "showRadioInput"
                        }],
                        staticClass: "ratio-box"
                    }, [t("div", {
                        staticClass: "input-number-group-box"
                    }, [t("span", {
                        staticClass: "group--prepend"
                    }, [e._v("宽")]), t(i.ElInputNumber, {
                        staticClass: "group--input input-number-mini",
                        attrs: {
                            size: "small",
                            min: 1,
                            max: 3e5,
                            controls: !1
                        },
                        on: {
                            focus: i.onInputFocus,
                            blur: i.onInputBlur,
                            change: function(e) {
                                return i.onRatioChange(i.params.rWidth, i.params.rHeight)
                            }
                        },
                        model: {
                            value: i.params.rWidth,
                            callback: function(t) {
                                e.$set(i.params, "rWidth", t)
                            },
                            expression: "params.rWidth"
                        }
                    })], 1), t("el-button", {
                        staticClass: "custom-icon-btn",
                        attrs: {
                            type: "text",
                            size: "mini"
                        },
                        on: {
                            click: i.handleExchange
                        }
                    }, [t("div", {
                        staticClass: "icon-btn"
                    }, [t("svg-icon", {
                        staticClass: "exchange",
                        attrs: {
                            "icon-class": "exchange"
                        }
                    })], 1)]), t("div", {
                        staticClass: "input-number-group-box"
                    }, [t("span", {
                        staticClass: "group--prepend"
                    }, [e._v("高")]), t(i.ElInputNumber, {
                        staticClass: "group--input input-number-mini",
                        attrs: {
                            size: "small",
                            min: 1,
                            max: 3e5,
                            controls: !1
                        },
                        on: {
                            focus: i.onInputFocus,
                            blur: i.onInputBlur,
                            change: function(e) {
                                return i.onRatioChange(i.params.rWidth, i.params.rHeight)
                            }
                        },
                        model: {
                            value: i.params.rHeight,
                            callback: function(t) {
                                e.$set(i.params, "rHeight", t)
                            },
                            expression: "params.rHeight"
                        }
                    })], 1)], 1), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: i.showIdPhotoInput,
                            expression: "showIdPhotoInput"
                        }],
                        staticClass: "id-photo-box"
                    }, [t("div", {
                        staticClass: "input-number-group-box"
                    }, [t("span", {
                        staticClass: "group--prepend"
                    }, [e._v("宽")]), t(i.ElInputNumber, {
                        staticClass: "group--input input-number-mini",
                        attrs: {
                            size: "small",
                            min: i.min,
                            max: 3e5,
                            controls: !1
                        },
                        on: {
                            focus: i.onInputFocus,
                            blur: i.onInputBlur,
                            change: i.onIdPhotoChange
                        },
                        model: {
                            value: i.params.width,
                            callback: function(t) {
                                e.$set(i.params, "width", t)
                            },
                            expression: "params.width"
                        }
                    })], 1), t("el-button", {
                        staticClass: "custom-icon-btn",
                        attrs: {
                            type: "text",
                            size: "mini"
                        },
                        on: {
                            click: i.handleIdPhotoExchange
                        }
                    }, [t("div", {
                        staticClass: "icon-btn"
                    }, [t("svg-icon", {
                        staticClass: "exchange",
                        attrs: {
                            "icon-class": "exchange"
                        }
                    })], 1)]), t("div", {
                        staticClass: "input-number-group-box"
                    }, [t("span", {
                        staticClass: "group--prepend"
                    }, [e._v("高")]), t(i.ElInputNumber, {
                        staticClass: "group--input input-number-mini",
                        attrs: {
                            size: "small",
                            min: i.min,
                            max: 3e5,
                            controls: !1
                        },
                        on: {
                            focus: i.onInputFocus,
                            blur: i.onInputBlur,
                            change: i.onIdPhotoChange
                        },
                        model: {
                            value: i.params.height,
                            callback: function(t) {
                                e.$set(i.params, "height", t)
                            },
                            expression: "params.height"
                        }
                    })], 1), t(i.ElSelect, {
                        staticClass: "group--append ts-select-text",
                        attrs: {
                            size: "mini",
                            placeholder: "请选择"
                        },
                        on: {
                            change: i.onUnitChange
                        },
                        model: {
                            value: i.params.unit,
                            callback: function(t) {
                                e.$set(i.params, "unit", t)
                            },
                            expression: "params.unit"
                        }
                    }, [t(i.ElOption, {
                        attrs: {
                            label: "像素",
                            value: 1
                        }
                    }), t(i.ElOption, {
                        attrs: {
                            label: "厘米",
                            value: 2
                        }
                    })], 1)], 1), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: i.showIdPhotoInput,
                            expression: "showIdPhotoInput"
                        }],
                        staticClass: "id-photo-box"
                    }, [t("div", {
                        staticClass: "input-number-group-box dpi-input-box"
                    }, [t("span", {
                        staticClass: "group--prepend"
                    }, [e._v("分辨率")]), t("el-input", {
                        staticClass: "group--input input-number-mini",
                        attrs: {
                            size: "small",
                            min: 30,
                            max: i.maxDPI,
                            precision: 0,
                            controls: !1,
                            disabled: !i.params.type
                        },
                        on: {
                            blur: i.onInputBlur,
                            focus: i.onInputFocus,
                            input: function(e) {
                                return i.limitDpi(e, i.maxDPI)
                            },
                            change: function(e) {
                                return i.onDpiChange(i.maxDPI, 30)
                            }
                        },
                        model: {
                            value: i.params.dpi,
                            callback: function(t) {
                                e.$set(i.params, "dpi", e._n(t))
                            },
                            expression: "params.dpi"
                        }
                    }), t("span", {
                        staticClass: "group--append"
                    }, [e._v("像素/英寸")])], 1)])])
                },
                lr = [],
                rr = i("e746"),
                cr = i("8ba5");
            (function(e) {
                e[e["Pix"] = 1] = "Pix", e[e["Cm"] = 2] = "Cm"
            })(ar || (ar = {}));
            var ur, dr = Object(l["defineComponent"])({
                    __name: "CropArea",
                    emits: ["on-show-reset", "on-change"],
                    setup(e, {
                        expose: t,
                        emit: i
                    }) {
                        const a = Object(l["computed"])(() => r["a"].getters["refine/cropInitObject"]),
                            n = Object(l["ref"])(!1),
                            o = Object(l["reactive"])({
                                type: cr["c"],
                                rWidth: void 0,
                                rHeight: void 0,
                                width: void 0,
                                height: void 0,
                                dpi: 30,
                                unit: ar.Cm
                            }),
                            s = Object(l["reactive"])({
                                width: void 0,
                                height: void 0
                            }),
                            c = Object(l["computed"])(() => cr["l"].includes(o.type)),
                            u = Object(l["computed"])(() => cr["e"].includes(o.type)),
                            d = Object(l["computed"])(() => 3e4),
                            h = Object(l["computed"])(() => o.unit === ar.Pix ? 1 : .01),
                            p = Object(l["computed"])(() => r["a"].getters["refine/originImgData"]),
                            f = Object(l["computed"])(() => p.value && p.value.face && p.value.face.length),
                            m = Object(l["computed"])(() => !(o.type === cr["d"] && void 0 === o.rHeight && void 0 === o.rWidth));
                        Object(l["watch"])(m, e => i("on-show-reset", e), {
                            immediate: !0
                        });
                        const g = e => {
                            o.type = e.type, o.dpi = e.dpi ? e.dpi : p.value.dpi, o.unit = e.unit || ar.Cm, o.type === cr["c"] ? (o.rWidth = void 0, o.rHeight = void 0) : [cr["d"], cr["b"], ...cr["k"]].includes(e.type) && (o.rWidth = e.width || void 0, o.rHeight = e.height || void 0), [cr["a"], ...cr["h"]].includes(e.type) ? (o.width = e.width || void 0, o.height = e.height || void 0) : (o.width = void 0, o.height = void 0), s.width = void 0, s.height = void 0
                        };
                        Object(l["watch"])(a, e => {
                            n.value = !0, g(e), Object(l["nextTick"])(() => n.value = !1)
                        });
                        const v = () => {
                                let e = {
                                    width: o.rWidth,
                                    height: o.rHeight,
                                    type: o.type
                                };
                                console.debug("emitRadioChange: ", e), i("on-change", e)
                            },
                            b = () => {
                                const e = o.dpi > d.value ? d.value : o.dpi;
                                o.dpi = e;
                                let t = {
                                    type: o.type,
                                    width: o.width,
                                    height: o.height,
                                    dpi: e === p.value.dpi ? 0 : e,
                                    unit: o.unit
                                };
                                console.debug("emitIdPhotoChange: ", t), i("on-change", t)
                            },
                            y = e => {
                                const t = cr["g"].find(t => t.type === e);
                                cr["k"].includes(e) ? (o.rWidth = t.size.width, o.rHeight = t.size.height) : cr["h"].includes(e) && (o.width = t.size.width, o.height = t.size.height, o.unit = ar.Cm), cr["f"].includes(e) ? (e === cr["c"] ? (o.rWidth = void 0, o.rHeight = void 0) : o.rWidth || o.rHeight || (o.rWidth = s.width, o.rHeight = s.height), v(), o.rWidth && o.rHeight && (s.width = o.rWidth, s.height = o.rHeight)) : cr["e"].includes(e) && b()
                            },
                            k = () => {
                                Object(l["nextTick"])(() => {
                                    o.width && (o.width = Object(rr["c"])(o.width, 3)), o.height && (o.height = Object(rr["c"])(o.height, 3)), o.type !== cr["a"] && (o.type = cr["a"]), b()
                                })
                            },
                            C = (e, t) => {
                                const i = cr["j"].find(i => i.valid && i.valid.includes(`${e}:${t}`));
                                return i ? i.type : cr["b"]
                            },
                            x = (e, t) => {
                                Object(l["nextTick"])(() => {
                                    if (o.rWidth && (o.rWidth = Object(rr["c"])(o.rWidth, 3)), o.rHeight && (o.rHeight = Object(rr["c"])(o.rHeight, 3)), cr["i"].includes(o.type)) {
                                        if (e && t) o.type = C(e, t);
                                        else if (!t || !e) return;
                                        v()
                                    }
                                })
                            },
                            P = () => {
                                const e = [o.rWidth, o.rHeight];
                                o.rWidth = e[1], o.rHeight = e[0], v()
                            },
                            S = () => {
                                const e = [o.width, o.height];
                                o.width = e[1], o.height = e[0], o.type = cr["a"], b()
                            },
                            _ = e => {
                                const {
                                    dpi: t,
                                    width: i,
                                    height: a
                                } = o;
                                e === ar.Pix ? (o.width && (o.width = Object(rr["a"])(t, i || 0)), o.height && (o.height = Object(rr["a"])(t, a || 0))) : (o.width && (o.width = Object(rr["d"])(t, i || 0)), o.height && (o.height = Object(rr["d"])(t, a || 0))), k()
                            },
                            O = (e, t, i) => {
                                const a = Number(e) || 0;
                                return a > t ? t : "number" === typeof i && a < i ? i : a
                            },
                            I = () => (o.type = cr["d"], o.rWidth = void 0, o.rHeight = void 0, s.width = void 0, s.height = void 0, {
                                width: o.rWidth,
                                height: o.rHeight,
                                type: o.type
                            }),
                            T = (e, t) => {
                                const i = (e + "").replace(/[^\d]/g, "");
                                o.dpi = i ? O(Number(i), t) : Number(i)
                            },
                            M = (e, t) => {
                                o.dpi = O(o.dpi, e, t), b()
                            },
                            {
                                onInputBlur: j,
                                onInputFocus: D
                            } = Ia();
                        return t({
                            reset: I
                        }), {
                            __sfc: !0,
                            Unit: ar,
                            emit: i,
                            cropInitObject: a,
                            isSyncFromQt: n,
                            params: o,
                            cache: s,
                            showRadioInput: c,
                            showIdPhotoInput: u,
                            maxDPI: d,
                            min: h,
                            imageData: p,
                            imageOriFaceNum: f,
                            needReset: m,
                            syncFromJson: g,
                            emitRadioChange: v,
                            emitIdPhotoChange: b,
                            onTypeChange: y,
                            onIdPhotoChange: k,
                            checkHasRecommendRatio: C,
                            onRatioChange: x,
                            handleExchange: P,
                            handleIdPhotoExchange: S,
                            onUnitChange: _,
                            limitMax: O,
                            reset: I,
                            limitDpi: T,
                            onDpiChange: M,
                            onInputBlur: j,
                            onInputFocus: D,
                            tailorTypeList: cr["g"],
                            TsSelect: ka,
                            TsSelectOption: Oa,
                            ElInputNumber: w["InputNumber"],
                            ElSelect: w["Select"],
                            ElOption: w["Option"]
                        }
                    }
                }),
                hr = dr,
                pr = (i("46b4"), Object(ct["a"])(hr, sr, lr, !1, null, "8585f9b0", null)),
                fr = pr.exports,
                mr = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "tool-content"
                    }, [t("ts-item-card", {
                        attrs: {
                            name: "角度"
                        }
                    }, [t("ts-number-placeholder", {
                        attrs: {
                            min: -45,
                            max: 45,
                            step: .01
                        },
                        on: {
                            "on-blur": e.onInputBlur,
                            "on-focus": e.onInputFocus,
                            change: e.emitRotateChange
                        },
                        model: {
                            value: e.rotateObj.angle,
                            callback: function(t) {
                                e.$set(e.rotateObj, "angle", t)
                            },
                            expression: "rotateObj.angle"
                        }
                    }), t("ts-slider", {
                        staticClass: "gray",
                        attrs: {
                            slot: "bottom",
                            min: -45,
                            max: 45,
                            "show-tooltip": !1,
                            "show-input-controls": !1,
                            step: .01
                        },
                        on: {
                            ondblclick: e.ondbclickRotate
                        },
                        nativeOn: {
                            keydown: function(e) {
                                if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return null;
                                e.stopPropagation()
                            }
                        },
                        slot: "bottom",
                        model: {
                            value: e.rotateObj.angle,
                            callback: function(t) {
                                e.$set(e.rotateObj, "angle", t)
                            },
                            expression: "rotateObj.angle"
                        }
                    })], 1), t("div", {
                        staticClass: "rotate-icons"
                    }, [e._l(e.rotateButtons, (function(e, i) {
                        return [t("div", {
                            key: i,
                            staticClass: "icon-box"
                        }, [t("el-tooltip", {
                            attrs: {
                                effect: "dark",
                                placement: "bottom",
                                "open-delay": 750,
                                "hide-after": 2e3,
                                content: e.tip
                            }
                        }, [t("svg-icon", {
                            staticClass: "btn-icon",
                            attrs: {
                                "icon-class": e.icon
                            },
                            nativeOn: {
                                click: function(t) {
                                    return t.stopPropagation(), e.click.apply(null, arguments)
                                }
                            }
                        })], 1)], 1)]
                    }))], 2)], 1)
                },
                gr = [];
            class vr {
                constructor() {
                    this.baseAngle = 0, this.angle = 0
                }
                static spliteRotateAngle(e) {
                    let t = e;
                    e >= 315 && (t = e - 360);
                    const i = Math.floor((t + 45) / 90);
                    let a = 90 * i;
                    360 === a && (a = 0);
                    const n = Object(rr["c"])(t - a, 2);
                    return [a, n]
                }
                get rotate() {
                    return Object(rr["c"])(this.baseAngle + this.angle, 2)
                }
                set rotate(e) {
                    if (Object(rr["c"])(e, 2) === this.rotate) return;
                    const [t, i] = vr.spliteRotateAngle(e);
                    this.baseAngle = t, this.angle = i
                }
                reset() {
                    this.baseAngle = 0, this.angle = 0
                }
                increaseBase(e) {
                    let t = this.baseAngle;
                    t += e, t > 270 && (t = 0), t < 0 && (t = 270), this.baseAngle = t
                }
            }(function(e) {
                e[e["Default"] = 1] = "Default", e[e["Inverse"] = -1] = "Inverse"
            })(ur || (ur = {}));
            var br = {
                    name: "ThumbCropTool",
                    components: {
                        "el-collapse": w["Collapse"],
                        "el-collapse-item": w["CollapseItem"],
                        "el-tooltip": w["Tooltip"],
                        TsItemCard: dt,
                        TsNumberPlaceholder: Bt,
                        TsSlider: ht["a"]
                    },
                    props: {
                        rotate: {
                            type: Number,
                            default: 0
                        }
                    },
                    setup(e, {
                        emit: t
                    }) {
                        const {
                            rotate: i
                        } = Object(l["toRefs"])(e), a = Object(l["computed"])(() => r["a"].getters["refine/cropInitObject"]), n = Object(l["ref"])(!1), o = Object(l["reactive"])({
                            flipX: ur.Default,
                            flipY: ur.Default
                        }), s = Object(l["reactive"])({
                            model: new vr,
                            angle: 0
                        }), c = Object(l["computed"])(() => o.flipX !== ur.Default || o.flipY !== ur.Default || 0 !== s.angle || 0 !== s.model.rotate);
                        Object(l["watch"])(c, e => t("on-show-reset", e)), Object(l["watch"])(a, e => {
                            n.value = !0, o.flipX = e.flipX, o.flipY = e.flipY, s.model.rotate = e.rotate, s.angle = s.model.angle, Object(l["nextTick"])(() => {
                                n.value = !1
                            })
                        }), Object(l["watch"])(i, e => {
                            n.value = !0, s.model.rotate = e, s.model.angle !== s.angle && (s.angle = s.model.angle), Object(l["nextTick"])(() => {
                                n.value = !1
                            })
                        });
                        const u = Object(g["throttle"])((function() {
                                t("on-rotate", s.model.rotate)
                            }), 30),
                            d = Object(g["throttle"])((function() {
                                t("on-flip", o.flipX, o.flipY)
                            }), 30);
                        Object(l["watch"])(() => s.angle, e => {
                            n.value || (s.model.angle = e, u())
                        });
                        const h = Object(l["computed"])(() => [{
                                icon: "turn-left",
                                tip: "逆时针旋转",
                                click: () => {
                                    s.model.increaseBase(-90), u()
                                }
                            }, {
                                icon: "turn-right",
                                tip: "顺时针旋转",
                                click: () => {
                                    s.model.increaseBase(90), u()
                                }
                            }, {
                                icon: (o.flipX, ur.Default, "flip-x"),
                                tip: "水平翻转",
                                click: () => {
                                    o.flipX = o.flipX === ur.Default ? ur.Inverse : ur.Default, d()
                                }
                            }, {
                                icon: (o.flipY, ur.Default, "flip-y"),
                                tip: "垂直翻转",
                                click: () => {
                                    o.flipY = o.flipY === ur.Default ? ur.Inverse : ur.Default, d()
                                }
                            }]),
                            {
                                onInputBlur: p,
                                onInputFocus: f
                            } = Ia();
                        return {
                            onInputBlur: p,
                            onInputFocus: f,
                            params: o,
                            rotateObj: s,
                            rotateButtons: h,
                            emitRotateChange: u,
                            reset: () => {
                                s.model.reset(), s.angle = 0, o.flipX = 1, o.flipY = 1, u(), d()
                            },
                            ondbclickRotate: () => {
                                s.angle = 0, s.model.angle = 0, u()
                            }
                        }
                    }
                },
                yr = br,
                wr = (i("9cd1"), Object(ct["a"])(yr, mr, gr, !1, null, "d4fb17c2", null)),
                kr = wr.exports,
                Cr = Object(l["defineComponent"])({
                    __name: "CropPanel",
                    props: {
                        rotate: {
                            type: Number,
                            default: 0
                        },
                        showCropResetBtn: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    emits: ["on-crop-reset"],
                    setup(e, {
                        emit: t
                    }) {
                        const i = e,
                            a = Object(l["ref"])(["crop", "rotate"]),
                            n = Object(l["ref"])(),
                            o = Object(l["ref"])(),
                            s = Object(l["ref"])(!1),
                            r = Object(l["ref"])(!1);
                        Object(l["watch"])(() => i.showCropResetBtn, e => {
                            e && (s.value = !0)
                        });
                        const c = () => {
                                var e;
                                const i = null === (e = n.value) || void 0 === e ? void 0 : e.reset();
                                t("on-crop-reset", i)
                            },
                            u = () => {
                                var e;
                                return null === (e = o.value) || void 0 === e ? void 0 : e.reset()
                            };
                        return {
                            __sfc: !0,
                            $emit: t,
                            props: i,
                            activeNames: a,
                            cropRef: n,
                            rotateRef: o,
                            isShowCropReset: s,
                            isShowRotateReset: r,
                            resetCrop: c,
                            resetRotate: u,
                            ElCollapse: w["Collapse"],
                            ElCollapseItem: w["CollapseItem"],
                            CropArea: fr,
                            RotateArea: kr
                        }
                    }
                }),
                xr = Cr,
                Pr = (i("dc0f8"), Object(ct["a"])(xr, nr, or, !1, null, "bd2d73c0", null)),
                Sr = Pr.exports,
                _r = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t("div", {
                        staticClass: "painter-sidebar"
                    }, [t("div", {
                        staticClass: "nav"
                    }, [t("span", {
                        staticClass: "nav-item",
                        class: {
                            active: "history" === i.activeNav
                        },
                        on: {
                            click: function(e) {
                                i.activeNav = "history"
                            }
                        }
                    }, [t("i", {
                        staticClass: "ts-icon ts-icon-history"
                    })])]), t("div", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: "history" === i.activeNav,
                            expression: "activeNav === 'history'"
                        }],
                        staticClass: "tool"
                    }, [t("div", {
                        staticClass: "tool-title"
                    }, [t("span", [e._v("历史记录")]), t("i", {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: e.showResetBtn,
                            expression: "showResetBtn"
                        }],
                        staticClass: "el-icon-refresh-right reset-btn-icon",
                        staticStyle: {
                            "font-size": "16px"
                        },
                        on: {
                            click: function(t) {
                                return t.stopPropagation(), e.$emit("on-reset")
                            }
                        }
                    })]), t("ul", {
                        staticClass: "tool-content history global__scroll-style"
                    }, [e.historyList.length > 0 ? [e._l(e.historyList, (function(a) {
                        return [t("li", {
                            key: a.uuid,
                            staticClass: "history-item",
                            class: {
                                disabled: a.disabled,
                                active: a.active
                            },
                            on: {
                                click: function(e) {
                                    a.disabled ? i.tsNotify("暂仅支持撤销至最近10步") : i.changeHistory(a.uuid)
                                }
                            }
                        }, ["liquefy" === a.type ? [t("svg-icon", {
                            attrs: {
                                "class-name": "ts-icon",
                                "icon-class": "liquefy"
                            }
                        })] : [t("i", {
                            staticClass: "ts-icon",
                            class: {
                                "ts-icon-brush": "brush" === a.type,
                                "ts-icon-liquefy": "liquefy" === a.type,
                                "ts-icon-eraser": "eraser" === a.type,
                                "el-icon-refresh-right": "reset" === a.type
                            }
                        })], e._v(" " + e._s(a.name) + " ")], 2)]
                    }))] : t("li", {
                        staticClass: "history-empty"
                    }, [e._v(" 暂无操作记录 ")])], 2), e._t("bottom")], 2)])
                },
                Or = [],
                Ir = Object(l["defineComponent"])({
                    __name: "LiquefyPanel",
                    props: {
                        showResetBtn: {
                            type: Boolean,
                            default: !1
                        },
                        historyList: {
                            type: Array,
                            default: () => []
                        }
                    },
                    emits: ["change-history"],
                    setup(e, {
                        emit: t
                    }) {
                        const i = Object(l["ref"])("history"),
                            {
                                tsNotify: a
                            } = Object(dn["a"])(),
                            n = e => t("change-history", e);
                        return {
                            __sfc: !0,
                            emit: t,
                            activeNav: i,
                            tsNotify: a,
                            changeHistory: n
                        }
                    }
                }),
                Tr = Ir,
                Mr = (i("4ac7"), Object(ct["a"])(Tr, _r, Or, !1, null, "f30b5c0a", null)),
                jr = Mr.exports;

            function Dr(e, t) {
                const i = Object(l["reactive"])({
                        rotate: 0,
                        showCropResetBtn: !1
                    }),
                    {
                        PointCropFinish: a
                    } = Object(mi["a"])(),
                    n = () => {
                        t && (null === t || void 0 === t || t.beforeOpenMode());
                        const i = e.value.useCropTool();
                        r["a"].commit("refine/_SetCropInitObject", i)
                    },
                    s = () => {
                        t && (null === t || void 0 === t || t.beforeCloseMode()), a(e.value.getCropObj()), e.value.closeTool(), i.showCropResetBtn = !1, i.rotate = 0
                    };
                return Object(l["watch"])(e, e => {
                    null === e || void 0 === e || e.on("on-rotate", e => {
                        i.rotate = e
                    }), null === e || void 0 === e || e.on(o["b"].FinishCrop, () => {
                        s()
                    })
                }), {
                    cropConfig: i,
                    finishCrop: s,
                    useCropTool: n,
                    handleRotate: (t, a) => {
                        var n;
                        i.rotate = t, null === (n = e.value) || void 0 === n || n.handleRotate(t, a)
                    },
                    handleResetCrop: t => {
                        var i;
                        return null === (i = e.value) || void 0 === i ? void 0 : i.handleResetCrop(t)
                    },
                    handleFlip: (t, i) => e.value.handleFlip(t, i),
                    handleCrop: t => {
                        var i;
                        return null === (i = e.value) || void 0 === i ? void 0 : i.handleCrop(t)
                    }
                }
            }
            var Rr = i("4eec"),
                Nr = i("676c");

            function Br(e, t, i) {
                const a = Object(l["ref"])(!1),
                    n = Object(l["ref"])(!1),
                    {
                        PointPreviewColorMode: o,
                        PointPreviewFullMode: s
                    } = Object(un["a"])(),
                    c = Object(l["computed"])({
                        get: () => r["a"].getters["refine/isOnlyPaletteEffect"],
                        set: e => {
                            e ? o() : s(), r["a"].commit("refine/_SetIsOnlyPaletteEffect", e)
                        }
                    }),
                    u = async () => {
                        if (n.value) return;
                        const e = await Object(Dl["b"])(Dl["a"].HiddenPreviewEffectTip);
                        e ? (n.value = !0, c.value && await b()) : (v(), a.value = !0)
                    }, d = Object(l["ref"])(0), h = () => {
                        d.value && (clearTimeout(d.value), d.value = 0)
                    }, p = Object(l["ref"])(!1), f = Object(l["computed"])(() => "color" === t.value);
                Object(l["watch"])(() => f.value, async e => {
                    e ? await u() : (p.value = !1, a.value = !1, h())
                }, {
                    immediate: !0
                });
                const m = Object(g["debounce"])((function(t) {
                    var i;
                    null === (i = e.value) || void 0 === i || i.reloadProcessImage(t ? "onlyPreviewPalette" : "previewAll")
                }), 100);
                Object(l["watch"])(c, async e => {
                    m(e), e && await b()
                });
                const {
                    PointPreviewInit: v
                } = Object(un["a"])(), b = async () => {
                    if (!n.value) return;
                    const t = e.value.hasBeautifyEffect();
                    if (!t) return h(), void(p.value = !1);
                    v(), h(), setTimeout(() => {
                        Object(l["nextTick"])(() => {
                            p.value = !0, d.value = setTimeout(async () => {
                                p.value = !1, d.value = 0
                            }, 4e3)
                        })
                    }, 300)
                }, y = async () => {
                    n.value || (a.value = !1, await Object(Dl["h"])(Dl["a"].HiddenPreviewEffectTip), setTimeout(() => Object(l["nextTick"])(() => n.value = !0), 100))
                };
                let w = Object(l["ref"])(!1);
                return Object(l["watch"])(e, async e => {
                    w.value = !0, e.on(Kl.PresetJsonUpdate, async () => {
                        c.value && f.value && await b(), w.value = !1
                    })
                }), {
                    isInColorNav: f,
                    isOnlyPaletteEffect: c,
                    showPaletteUpdateGuide: a,
                    showHiddenEffectTip: p,
                    checkIsShowHiddenEffectTip: b,
                    cacheHiddenEffectTip: y
                }
            }

            function Er(e) {
                const t = Object(l["ref"])(""),
                    i = r["a"].getters["refine/activeNavName"],
                    a = Object(l["ref"])(i);
                Object(l["watch"])(a, e => r["a"].commit("refine/_SetActiveNavName", e));
                const n = Object(l["computed"])(() => a.value === ns["b"].Crop),
                    o = () => {
                        a.value = t.value, t.value = ""
                    },
                    s = (i, a) => (t.value = i, e && e(i, a), !0);
                return {
                    activeNavName: a,
                    isInCropNavbar: n,
                    restoreNavbar: o,
                    beforeRefineNavBarChange: s
                }
            }

            function Fr(e, t, i) {
                const a = Object(l["ref"])(!1),
                    n = Object(l["ref"])([]),
                    s = Object(l["ref"])(!1),
                    r = Object(l["ref"])(!1),
                    c = Object(l["ref"])(),
                    {
                        PointClickLiquefaction: u
                    } = Object(un["a"])(),
                    d = () => {
                        s.value || (s.value = !0, r.value = !1, i && (null === i || void 0 === i || i.beforeOpenMode()), c.value = e.value.useLiquefyMode(), c.value.on(il.HistoryUpdate, e => n.value = e).on(il.ShowResetDefaultMask, e => a.value = e), g(), u())
                    },
                    h = (e, t = !1) => {
                        var a, n;
                        if (i && (null === i || void 0 === i || i.beforeCloseMode()), "cancel" === e) null === (n = c.value) || void 0 === n || n.cancelLiquefyMode();
                        else if ("save" === e) {
                            var o;
                            null === (o = c.value) || void 0 === o || o.saveLiquefyMode()
                        }
                        s.value = !1, null === (a = c.value) || void 0 === a || a.destroy(), c.value = void 0, g(!0)
                    },
                    {
                        tsConfirm: p
                    } = Object(dn["a"])(),
                    f = () => {
                        p({
                            title: "是否需要保存液化修改？",
                            confirmButtonText: "确认"
                        }).then(() => {
                            h("save")
                        }).catch(() => {
                            h("cancel")
                        })
                    },
                    m = (e, t = !0) => {
                        "cancel" === e && t && n.value.length > 1 ? f() : h(e)
                    },
                    g = (e = !1) => {
                        e ? o["c"].removeListener(o["a"].ThumbnailCanChooseItem) : o["c"].addListener(o["a"].ThumbnailCanChooseItem, () => f())
                    };
                return Object(l["onUnmounted"])(() => {
                    var e;
                    g(!0), null === (e = c.value) || void 0 === e || e.destroy(), c.value = void 0
                }), {
                    showResetBtn: a,
                    showModePanel: s,
                    historyList: n,
                    hideLiquefyTool: r,
                    handleFinishLiquefyMode: m,
                    handleUseLiquefyMode: d,
                    switchLiquefyTool: e => {
                        var t;
                        return null === (t = c.value) || void 0 === t ? void 0 : t.changeTool(e)
                    },
                    onChangeLiquefyHistory: e => {
                        var t;
                        return null === (t = c.value) || void 0 === t ? void 0 : t.changeHistory(e)
                    },
                    handleReset: () => {
                        var e;
                        a.value && (a.value = !1, null === (e = c.value) || void 0 === e || e.resetLiquefy())
                    }
                }
            }
            var Lr = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t(i.Drawer, {
                        staticClass: "liquefy-drawer",
                        attrs: {
                            "append-to-body": "",
                            direction: "ttb",
                            "show-close": !1,
                            size: 42,
                            modal: !1,
                            visible: i.visible,
                            wrapperClosable: !1,
                            "close-on-press-escape": !1,
                            "before-close": i.onBeforeClose
                        },
                        on: {
                            "update:visible": function(e) {
                                i.visible = e
                            }
                        }
                    }, [t("div", {
                        staticClass: "tool-content"
                    }, [e._l(i.tools, (function(a, n) {
                        return [t("div", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: i.toolKey === n,
                                expression: "toolKey === key"
                            }],
                            key: n,
                            staticClass: "tool-slider"
                        }, [e._l(a, (function(a, n) {
                            return [a.cType && "switch" === a.cType ? [t("div", {
                                key: n,
                                staticClass: "tool-slider-item switch"
                            }, [t("span", {
                                staticClass: "label"
                            }, [e._v(e._s(a.name))]), t(i.ElSwitch, {
                                staticClass: "custom-switch-style ts-switch--mini",
                                attrs: {
                                    "inactive-value": 0,
                                    "active-value": 1,
                                    width: 24,
                                    "active-color": "#3073FF"
                                },
                                on: {
                                    change: function(e) {
                                        a.setValue(e), i.changeTool(i.toolKey), i.PointLiquefyOperate(a.type)
                                    }
                                },
                                model: {
                                    value: a.value,
                                    callback: function(t) {
                                        e.$set(a, "value", t)
                                    },
                                    expression: "item.value"
                                }
                            })], 1)] : [t("div", {
                                key: n,
                                staticClass: "tool-slider-item"
                            }, [t("span", {
                                staticClass: "label"
                            }, [e._v(e._s(a.name))]), t("div", {
                                staticClass: "slider-box"
                            }, [t(i.TsSlider, {
                                staticClass: "slider ts-slider--mini gray",
                                attrs: {
                                    min: a.min || 0,
                                    max: a.max || 100,
                                    step: a.step || 1,
                                    "show-tooltip": !1
                                },
                                on: {
                                    input: function(e) {
                                        a.setValue(e), i.changeTool(i.toolKey)
                                    },
                                    change: function(e) {
                                        return i.PointLiquefyOperate(a.type)
                                    }
                                },
                                model: {
                                    value: a.value,
                                    callback: function(t) {
                                        e.$set(a, "value", t)
                                    },
                                    expression: "item.value"
                                }
                            })], 1), t("span", {
                                staticClass: "num"
                            }, [e._v(e._s(a.value))])])]]
                        }))], 2)]
                    }))], 2)])
                },
                Vr = [],
                Ar = Object(l["defineComponent"])({
                    __name: "LiquefyDrawer",
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    emits: ["change-tool", "input", "before-close"],
                    setup(e, {
                        emit: t
                    }) {
                        const i = e,
                            a = Object(l["ref"])(i.value);
                        Object(l["watch"])(() => i.value, e => {
                            a.value = e, e && u()
                        }), Object(l["watch"])(a, e => t("input", e));
                        const n = Object(l["ref"])(!1),
                            o = Zl.getInstance(),
                            s = Object(l["ref"])({}),
                            r = Object(l["ref"])(""),
                            {
                                PointLiquefyOperate: c
                            } = Object(mi["a"])(),
                            u = () => {
                                n.value = !1, s.value = o.createToolsOperationData(), r.value = o.tool, Object(l["nextTick"])(() => n.value = !0)
                            },
                            d = Object(g["debounce"])(e => t("change-tool", e), 30),
                            h = e => {
                                n.value && (r.value = e, o.changeTool(e), d(o.tool))
                            },
                            p = e => t("before-close", e),
                            f = () => s.value = o.createToolsOperationData();
                        return Object(l["onMounted"])(() => o.on("on-update", f)), Object(l["onUnmounted"])(() => o.off("on-update", f)), {
                            __sfc: !0,
                            props: i,
                            $emit: t,
                            visible: a,
                            isMounted: n,
                            controlTools: o,
                            tools: s,
                            toolKey: r,
                            PointLiquefyOperate: c,
                            initTool: u,
                            emitToolChange: d,
                            changeTool: h,
                            onBeforeClose: p,
                            updateToolByKeydown: f,
                            ElSwitch: w["Switch"],
                            Drawer: w["Drawer"],
                            TsSlider: ht["a"]
                        }
                    }
                }),
                Ur = Ar,
                $r = (i("f5d4"), Object(ct["a"])(Ur, Lr, Vr, !1, null, "24bbd71e", null)),
                Hr = $r.exports,
                zr = Object(l["defineComponent"])({
                    name: "PhotoFinishing",
                    mixins: [d["a"], h["a"], p["a"], f["b"], m["a"]],
                    components: {
                        LiquefyDrawer: Hr,
                        "el-button": w["Button"],
                        "el-button-group": w["ButtonGroup"],
                        "el-progress": w["Progress"],
                        "el-slider": w["Slider"],
                        "el-divider": w["Divider"],
                        "el-tooltip": w["Tooltip"],
                        "el-popover": w["Popover"],
                        "el-link": w["Link"],
                        "ts-drawer": Us,
                        CostTime: _l,
                        FeedbackDialog: gs,
                        SpinLoading: Cs,
                        RightParamsView: cs,
                        Histogram: k["a"],
                        ZoomButtonGroup: Is,
                        TsProgress: Ns,
                        DefectPanel: ll,
                        ThumbOptRecordView: ml,
                        RefineNavBar: El,
                        CropPanel: Sr,
                        "liquefy-panel": jr,
                        "delete-progress-dialog": Nr["a"]
                    },
                    props: {},
                    beforeRouteEnter(e, t, i) {
                        i(i => {
                            i.setNeedCreateMainFragmentTag(t, e), r["a"].commit("project/_SetEntryProjectCache", e.name)
                        })
                    },
                    beforeRouteLeave(e, t, i) {
                        this.showPainter ? this.painterCloseConfirm() : this.canDestroy ? (this.isDestroy = !0, this.doWhenLeave(t, e), r["a"].commit("changeAgeSexReviseEffectData", {
                            configJsonStr: "",
                            toningJsonStr: "",
                            thumbnailId: -1,
                            ageSexReviseData: ""
                        }), i()) : console.log("not load view finish")
                    },
                    setup() {
                        const e = Object(l["getCurrentInstance"])().proxy;
                        b["a"].shareInstance().addObject(e);
                        const t = Object(l["ref"])(!1);
                        Object(l["onUnmounted"])(() => t.value = !0);
                        const i = Object(l["computed"])(() => r["a"].getters.userId),
                            a = Object(l["computed"])(() => r["a"].getters.user),
                            n = Object(l["computed"])(() => r["a"].getters["project/activeProject"]),
                            c = Object(l["ref"])(""),
                            u = Object(l["computed"])(() => r["a"].getters["thumbnail/activeThumbnailPath"]);
                        Object(l["watch"])(u, async e => {
                            u.value && (c.value = await s["a"].basename(e))
                        });
                        const d = Object(l["ref"])(!0),
                            {
                                refineUUID: h,
                                doWhenLeave: p,
                                canDestroy: f,
                                isDragging: m,
                                updateDragStatus: g,
                                loadQtView: v,
                                isFullScreenPreview: y,
                                handleFullPreview: w,
                                setNeedCreateMainFragmentTag: k
                            } = yl(t),
                            C = Object(l["computed"])(() => V.value && N.value === ns["b"].Palette),
                            {
                                photoControl: x,
                                imageState: P,
                                fitRatio: S,
                                showAllScale: _,
                                histogramData: O,
                                costTimeObj: I,
                                addThumbnailChangeListener: T,
                                removeThumbnailChangeListener: M,
                                reloadProcessImage: j
                            } = ir(t, h, {
                                isOnlyPreviewPalette: C,
                                beforeThumbnailChange: () => {
                                    X.value && q(), ce.value && he("cancel")
                                }
                            });
                        Object(l["onMounted"])(async () => {
                            T(), v(n.value.id, i.value)
                        }), Object(l["onUnmounted"])(M), Object(l["onMounted"])(() => Bs["i"].addListener(Bs["c"], null === e || void 0 === e ? void 0 : e.onFeedbackItemClick)), Object(l["onUnmounted"])(() => Bs["i"].removeListener(Bs["c"]));
                        const D = e => {
                            r["a"].commit("thumbnail/_SetThumbSelection", e)
                        };
                        Object(l["onMounted"])(() => o["c"].addListener(o["a"].SignalSelectionChanged, D)), Object(l["onUnmounted"])(() => {
                            D([]), o["c"].removeListener(o["a"].SignalSelectionChanged)
                        }), Object(l["onMounted"])(() => {
                            o["c"].addListener(o["a"].SignalKeydownSpace, e => {
                                (ce.value || Z.value || E.value) && (m.value = e)
                            })
                        }), Object(l["onUnmounted"])(() => o["c"].removeListener(o["a"].SignalKeydownSpace));
                        const R = e => {
                            r["a"].commit("config/updateConfigPreviewSize", e)
                        };
                        Object(l["onMounted"])(() => o["c"].addListener(o["a"].SignalUpdatePreviewSize, R)), Object(l["onUnmounted"])(() => o["c"].removeListener(o["a"].SignalUpdatePreviewSize));
                        const {
                            activeNavName: N,
                            restoreNavbar: B,
                            isInCropNavbar: E,
                            beforeRefineNavBarChange: F
                        } = Er((e, t) => {
                            e === ns["b"].Crop && q(), t === ns["b"].Crop && W(), t === ns["b"].Palette && V.value && ($(!0), j(Jl.OnlyPreviewPalette)), e === ns["b"].Palette && V.value && j(Jl.PreviewAll)
                        }), {
                            isInColorNav: L,
                            isOnlyPaletteEffect: V,
                            showHiddenEffectTip: A,
                            showPaletteUpdateGuide: U,
                            checkIsShowHiddenEffectTip: $,
                            cacheHiddenEffectTip: H
                        } = Br(x, N), {
                            cropConfig: z,
                            useCropTool: W,
                            finishCrop: q,
                            handleRotate: G,
                            handleResetCrop: K,
                            handleFlip: J,
                            handleCrop: Y
                        } = Dr(x, {
                            beforeOpenMode: () => {
                                L.value && V.value && (V.value = !1), g(!1)
                            },
                            beforeCloseMode: () => {
                                g(!0), B()
                            }
                        }), X = Object(l["computed"])(() => ns["b"].Crop === N.value), {
                            showPainter: Z,
                            showResetMaskBtn: Q,
                            painterHistoryList: ee,
                            resetPainterRecord: te,
                            setRemoveDefectivePaintMask: ie,
                            painterCloseConfirm: ae,
                            openPainterMode: ne,
                            switchDefectTool: oe,
                            onChangeHistory: se
                        } = rl(x, t, {
                            beforeOpenMode: () => g(!1),
                            beforeCloseMode: () => g(!0)
                        }), {
                            hideLiquefyTool: le,
                            showResetBtn: re,
                            showModePanel: ce,
                            historyList: ue,
                            handleUseLiquefyMode: de,
                            handleFinishLiquefyMode: he,
                            switchLiquefyTool: pe,
                            onChangeLiquefyHistory: fe,
                            handleReset: me
                        } = Fr(x, t, {
                            beforeOpenMode: () => g(!1),
                            beforeCloseMode: () => g(!0)
                        }), {
                            stopMousePropagation: ge
                        } = Ia(), {
                            PointPreviewClick: ve,
                            PointPreviewExit: be,
                            PointLiquefactionCancel: ye,
                            PointLiquefactionConfirm: we
                        } = Object(un["a"])(), ke = Object(l["computed"])(() => Z.value || E.value || ce.value);
                        Object(l["watch"])(ke, e => r["a"].commit("refine/_SetIsDisableHeadView", e));
                        const Ce = () => {
                                ce.value ? he("save") : g(!m.value)
                            },
                            xe = Object(l["computed"])(() => Z.value ? "正在处理涂抹数据中..." : ce.value ? "正在初始化液化数据中..." : P.loadingText ? P.loadingText : "正在处理...");
                        return {
                            RefineNavName: ns["b"],
                            handleClickDrag: Ce,
                            showLiquefy: ce,
                            hideLiquefyTool: le,
                            showLiquefyResetBtn: re,
                            liquefyHistoryList: ue,
                            handleFinishLiquefyMode: he,
                            handleUseLiquefyMode: de,
                            switchLiquefyTool: pe,
                            onChangeLiquefyHistory: fe,
                            handleResetLiquefy: me,
                            isOnlyPaletteEffect: V,
                            showHiddenEffectTip: A,
                            showPaletteUpdateGuide: U,
                            cacheHiddenEffectTip: H,
                            ...Object(Rr["a"])(),
                            activeNavName: N,
                            isInColorNav: L,
                            isInCropNav: X,
                            isFullScreenPreview: y,
                            handleExitPreview: () => {
                                w(!1), ge(!1), be()
                            },
                            handlePreviewAll: () => {
                                w(!0), ge(!1), ve()
                            },
                            photoControl: x,
                            beforeRefineNavBarChange: F,
                            cropConfig: z,
                            handleRotate: G,
                            handleFlip: J,
                            handleCrop: Y,
                            handleResetCrop: K,
                            clickFinishCropBtn: () => q(),
                            resetRemoveDefectivePaintMask: e => {
                                var t;
                                "removeDefects" === e && (null === (t = x.value) || void 0 === t || t.resetRemoveDefectivePaintMask())
                            },
                            isDestroy: t,
                            refineUUID: h,
                            canDestroy: f,
                            doWhenLeave: p,
                            setNeedCreateMainFragmentTag: k,
                            user: a,
                            imageName: c,
                            imageState: P,
                            loadingText: xe,
                            costTimeObj: I,
                            disabledProgress: d,
                            isDragging: m,
                            updateDragStatus: g,
                            showResetMaskBtn: Q,
                            containerMouseDown: Object(l["ref"])(!1),
                            histogramData: O,
                            fitRatio: S,
                            showAllScale: _,
                            onZoomSlider: e => {
                                var t;
                                return null === (t = x.value) || void 0 === t ? void 0 : t.changeRatio(e)
                            },
                            imageResize: e => {
                                var t;
                                return null === (t = x.value) || void 0 === t ? void 0 : t.imageResize(e)
                            },
                            photoCompare: e => {
                                var t;
                                return null === (t = x.value) || void 0 === t ? void 0 : t.compare(e)
                            },
                            onApplyPresetClick: e => {
                                var t;
                                return null === (t = x.value) || void 0 === t ? void 0 : t.onApplyPresetClick(e)
                            },
                            onChangeColor: (e, t = !1, i) => {
                                var a;
                                return null === (a = x.value) || void 0 === a ? void 0 : a.onChangeColor(e, !!t, i)
                            },
                            onChangeBeautify: (e, t = !1, i) => {
                                var a;
                                return null === (a = x.value) || void 0 === a ? void 0 : a.onChangeBeautify(e, !!t, i)
                            },
                            reloadProcessImage: e => {
                                var t;
                                return null === (t = x.value) || void 0 === t ? void 0 : t.reloadProcessImage(e)
                            },
                            showPainter: Z,
                            painterHistoryList: ee,
                            setRemoveDefectivePaintMask: e => ie(e, !0),
                            resetPainterRecord: te,
                            usePainterTool: ne,
                            painterCloseConfirm: ae,
                            switchDefectTool: oe,
                            onChangeHistory: se,
                            stopMousePropagation: ge,
                            photoControlInfo: () => {
                                var e;
                                return null === (e = x.value) || void 0 === e ? void 0 : e.getPhotoControlInfo()
                            },
                            getParamsJson: () => x.value ? x.value.getParamsJson() : {
                                beautifyJson: null,
                                paletteJson: null
                            },
                            PointLiquefactionCancel: ye,
                            PointLiquefactionConfirm: we
                        }
                    },
                    data() {
                        return {
                            isShowingImportDialog: !1,
                            changeShortcutHelper: !0,
                            showFeedbackDialog: !1,
                            feedbackDialog_viewModel: null,
                            importStatusWatchSymbol: null
                        }
                    },
                    async mounted() {
                        this.$root.checkDiskSpaceIfNeed(() => {}).then(e => {}), this.registerSecondImportEvent(!0)
                    },
                    beforeMount() {},
                    methods: {
                        ...Object(c["d"])("project", ["_SetLastProjectUpdateTime"]),
                        ...Object(c["d"])("thumbnail", ["_SetSelectedImgIndex", "_SetActiveThumbnail"]),
                        ...Object(c["b"])("thumbnail", ["ACT_GetThumbnails"]),
                        onShowMultipleGuide() {
                            this.$refs["leftImageViewRef"].onShowMultipleGuide()
                        },
                        onHideMultipleGuide() {
                            this.$refs["leftImageViewRef"].onHideMultipleGuide()
                        },
                        thumbnailRef() {
                            let e = this.$refs.leftImageViewRef;
                            return e ? e.$children[0] : null
                        },
                        thumbViewScrollToIndex(e) {
                            e < 0 || this.thumbnailRef().$refs.recycleViewRef.scrollToItem(e)
                        },
                        async secondImportFiles(e) {
                            e && 0 != e.length && await this.checkAndImportImages(e, !0, e => {
                                o["c"].handlerAfterSecondImport(this.refineUUID), this.tsNotify({
                                    message: `已导入${e}张图片`
                                })
                            }, e => {
                                e.status === u["b"].Start && (this.showImportProgress = !0), this.importProgress = e
                            })
                        },
                        onFeedbackItemClick(e) {
                            this.showFeedbackDialog = !0, this.feedbackDialog_viewModel = e
                        },
                        callChangeShortcutHelper(e) {
                            this.changeShortcutHelper = e
                        },
                        async onDropImageFiles(e) {
                            let t = this.getDropPaths(),
                                i = [];
                            for (let n of t) {
                                let e = n.path;
                                i.push(e)
                            }
                            const a = await this.hasReadWritePermission(i);
                            a.result !== f["a"].OK && this.toastNoReadWritePermission(a), await this.secondImportFiles(i), this._SetLastProjectUpdateTime(new Date)
                        },
                        async importFromFile(e) {
                            if (this.isShowingImportDialog) return;
                            this.isShowingImportDialog = !0;
                            const t = Bs["i"],
                                i = await t.showOpenDialog({
                                    properties: e
                                });
                            if (i && i.filePaths && 0 === i.filePaths.length) return void(this.isShowingImportDialog = !1);
                            const a = await this.hasReadWritePermission(i.filePaths);
                            if (1 !== a.result) return this.toastNoReadWritePermission(a), void(this.isShowingImportDialog = !1);
                            i && i.filePaths.length > 0 && this.secondImportFiles(i.filePaths), this._SetLastProjectUpdateTime(new Date), this.isShowingImportDialog = !1
                        },
                        registerSecondImportEvent(e) {
                            e ? (v["a"].$on("onNavImportImage", Object(g["debounce"])(async e => {
                                y["a"].getInstance().unRegisterShortcut(), await this.importFromFile(e), y["a"].getInstance().registerShortcut()
                            }, 20)), v["a"].$on("onManualImportClick", Object(g["debounce"])(async e => {
                                await this.onManualImportClick(e)
                            }, 20))) : (v["a"].$off("onNavImportImage", null), v["a"].$off("onManualImportClick", null))
                        }
                    },
                    beforeDestroy() {
                        this.registerSecondImportEvent(!1)
                    }
                }),
                Wr = zr,
                qr = (i("cfb4"), i("4c2c"), Object(ct["a"])(Wr, a, n, !1, null, "d03beda8", null));
            t["default"] = qr.exports
        },
        "1c3c": function(e, t, i) {
            var a = i("9e69"),
                n = i("2474"),
                o = i("9638"),
                s = i("a2be"),
                l = i("edfa"),
                r = i("ac41"),
                c = 1,
                u = 2,
                d = "[object Boolean]",
                h = "[object Date]",
                p = "[object Error]",
                f = "[object Map]",
                m = "[object Number]",
                g = "[object RegExp]",
                v = "[object Set]",
                b = "[object String]",
                y = "[object Symbol]",
                w = "[object ArrayBuffer]",
                k = "[object DataView]",
                C = a ? a.prototype : void 0,
                x = C ? C.valueOf : void 0;

            function P(e, t, i, a, C, P, S) {
                switch (i) {
                    case k:
                        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset) return !1;
                        e = e.buffer, t = t.buffer;
                    case w:
                        return !(e.byteLength != t.byteLength || !P(new n(e), new n(t)));
                    case d:
                    case h:
                    case m:
                        return o(+e, +t);
                    case p:
                        return e.name == t.name && e.message == t.message;
                    case g:
                    case b:
                        return e == t + "";
                    case f:
                        var _ = l;
                    case v:
                        var O = a & c;
                        if (_ || (_ = r), e.size != t.size && !O) return !1;
                        var I = S.get(e);
                        if (I) return I == t;
                        a |= u, S.set(e, t);
                        var T = s(_(e), _(t), a, C, P, S);
                        return S["delete"](e), T;
                    case y:
                        if (x) return x.call(e) == x.call(t)
                }
                return !1
            }
            e.exports = P
        },
        "1c6d": function(e, t, i) {
            e.exports = i.p + "img/tips_png_keyboard_mac@3x.a157fbc9.png"
        },
        "1cec": function(e, t, i) {
            var a = i("0b07"),
                n = i("2b3e"),
                o = a(n, "Promise");
            e.exports = o
        },
        "1e6b": function(e, t, i) {},
        "1efc": function(e, t) {
            function i(e) {
                var t = this.has(e) && delete this.__data__[e];
                return this.size -= t ? 1 : 0, t
            }
            e.exports = i
        },
        "1f8a": function(e, t, i) {
            "use strict";
            i("71c4")
        },
        "1fc8": function(e, t, i) {
            var a = i("4245");

            function n(e, t) {
                var i = a(this, e),
                    n = i.size;
                return i.set(e, t), this.size += i.size == n ? 0 : 1, this
            }
            e.exports = n
        },
        2474: function(e, t, i) {
            var a = i("2b3e"),
                n = a.Uint8Array;
            e.exports = n
        },
        2478: function(e, t, i) {
            var a = i("4245");

            function n(e) {
                return a(this, e).get(e)
            }
            e.exports = n
        },
        2524: function(e, t, i) {
            var a = i("6044"),
                n = "__lodash_hash_undefined__";

            function o(e, t) {
                var i = this.__data__;
                return this.size += this.has(e) ? 0 : 1, i[e] = a && void 0 === t ? n : t, this
            }
            e.exports = o
        },
        "253c": function(e, t, i) {
            var a = i("3729"),
                n = i("1310"),
                o = "[object Arguments]";

            function s(e) {
                return n(e) && a(e) == o
            }
            e.exports = s
        },
        "28c9": function(e, t) {
            function i() {
                this.__data__ = [], this.size = 0
            }
            e.exports = i
        },
        "29f3": function(e, t) {
            var i = Object.prototype,
                a = i.toString;

            function n(e) {
                return a.call(e)
            }
            e.exports = n
        },
        "2b3e": function(e, t, i) {
            var a = i("585a"),
                n = "object" == typeof self && self && self.Object === Object && self,
                o = a || n || Function("return this")();
            e.exports = o
        },
        "2d7c": function(e, t) {
            function i(e, t) {
                var i = -1,
                    a = null == e ? 0 : e.length,
                    n = 0,
                    o = [];
                while (++i < a) {
                    var s = e[i];
                    t(s, i, e) && (o[n++] = s)
                }
                return o
            }
            e.exports = i
        },
        "2f87": function(e, t, i) {
            "use strict";
            i("a8ea")
        },
        "2fcc4": function(e, t) {
            function i(e) {
                var t = this.__data__,
                    i = t["delete"](e);
                return this.size = t.size, i
            }
            e.exports = i
        },
        3079: function(e, t, i) {
            "use strict";
            i("e3e6")
        },
        "30c9": function(e, t, i) {
            var a = i("9520"),
                n = i("b218");

            function o(e) {
                return null != e && n(e.length) && !a(e)
            }
            e.exports = o
        },
        "32f4": function(e, t, i) {
            var a = i("2d7c"),
                n = i("d327"),
                o = Object.prototype,
                s = o.propertyIsEnumerable,
                l = Object.getOwnPropertySymbols,
                r = l ? function(e) {
                    return null == e ? [] : (e = Object(e), a(l(e), (function(t) {
                        return s.call(e, t)
                    })))
                } : n;
            e.exports = r
        },
        "34ac": function(e, t, i) {
            var a = i("9520"),
                n = i("1368"),
                o = i("1a8c"),
                s = i("dc57"),
                l = /[\\^$.*+?()[\]{}|]/g,
                r = /^\[object .+?Constructor\]$/,
                c = Function.prototype,
                u = Object.prototype,
                d = c.toString,
                h = u.hasOwnProperty,
                p = RegExp("^" + d.call(h).replace(l, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");

            function f(e) {
                if (!o(e) || n(e)) return !1;
                var t = a(e) ? p : r;
                return t.test(s(e))
            }
            e.exports = f
        },
        3698: function(e, t) {
            function i(e, t) {
                return null == e ? void 0 : e[t]
            }
            e.exports = i
        },
        3729: function(e, t, i) {
            var a = i("9e69"),
                n = i("00fd"),
                o = i("29f3"),
                s = "[object Null]",
                l = "[object Undefined]",
                r = a ? a.toStringTag : void 0;

            function c(e) {
                return null == e ? void 0 === e ? l : s : r && r in Object(e) ? n(e) : o(e)
            }
            e.exports = c
        },
        "37f6": function(e, t, i) {
            "use strict";
            i("d60d")
        },
        "393a9": function(e, t, i) {
            "use strict";
            i("619b")
        },
        "39ff": function(e, t, i) {
            var a = i("0b07"),
                n = i("2b3e"),
                o = a(n, "WeakMap");
            e.exports = o
        },
        "3c3f": function(e, t, i) {},
        "3e6d": function(e, t, i) {
            "use strict";
            i("04ef")
        },
        4245: function(e, t, i) {
            var a = i("1290");

            function n(e, t) {
                var i = e.__data__;
                return a(t) ? i["string" == typeof t ? "string" : "hash"] : i.map
            }
            e.exports = n
        },
        4284: function(e, t) {
            function i(e, t) {
                var i = -1,
                    a = null == e ? 0 : e.length;
                while (++i < a)
                    if (t(e[i], i, e)) return !0;
                return !1
            }
            e.exports = i
        },
        "42a2": function(e, t, i) {
            var a = i("b5a7"),
                n = i("79bc"),
                o = i("1cec"),
                s = i("c869"),
                l = i("39ff"),
                r = i("3729"),
                c = i("dc57"),
                u = "[object Map]",
                d = "[object Object]",
                h = "[object Promise]",
                p = "[object Set]",
                f = "[object WeakMap]",
                m = "[object DataView]",
                g = c(a),
                v = c(n),
                b = c(o),
                y = c(s),
                w = c(l),
                k = r;
            (a && k(new a(new ArrayBuffer(1))) != m || n && k(new n) != u || o && k(o.resolve()) != h || s && k(new s) != p || l && k(new l) != f) && (k = function(e) {
                var t = r(e),
                    i = t == d ? e.constructor : void 0,
                    a = i ? c(i) : "";
                if (a) switch (a) {
                    case g:
                        return m;
                    case v:
                        return u;
                    case b:
                        return h;
                    case y:
                        return p;
                    case w:
                        return f
                }
                return t
            }), e.exports = k
        },
        "44ff": function(e, t, i) {},
        "46b4": function(e, t, i) {
            "use strict";
            i("7b55")
        },
        "49f4": function(e, t, i) {
            var a = i("6044");

            function n() {
                this.__data__ = a ? a(null) : {}, this.size = 0
            }
            e.exports = n
        },
        "4ac7": function(e, t, i) {
            "use strict";
            i("a4b4")
        },
        "4b9a": function(e, t, i) {
            "use strict";
            i("a6de")
        },
        "4c2c": function(e, t, i) {
            "use strict";
            i("124d")
        },
        "4dc9": function(e, t, i) {
            "use strict";
            i("1e6b")
        },
        "50c8": function(e, t, i) {},
        "50d8": function(e, t) {
            function i(e, t) {
                var i = -1,
                    a = Array(e);
                while (++i < e) a[i] = t(i);
                return a
            }
            e.exports = i
        },
        5130: function(e, t, i) {
            "use strict";
            i("1587")
        },
        5282: function(e, t, i) {
            "use strict";
            i("7981")
        },
        5377: function(e, t, i) {
            var a = i("da84"),
                n = i("83ab"),
                o = i("edd0"),
                s = i("ad6d"),
                l = i("d039"),
                r = a.RegExp,
                c = r.prototype,
                u = n && l((function() {
                    var e = !0;
                    try {
                        r(".", "d")
                    } catch (u) {
                        e = !1
                    }
                    var t = {},
                        i = "",
                        a = e ? "dgimsy" : "gimsy",
                        n = function(e, a) {
                            Object.defineProperty(t, e, {
                                get: function() {
                                    return i += a, !0
                                }
                            })
                        },
                        o = {
                            dotAll: "s",
                            global: "g",
                            ignoreCase: "i",
                            multiline: "m",
                            sticky: "y"
                        };
                    for (var s in e && (o.hasIndices = "d"), o) n(s, o[s]);
                    var l = Object.getOwnPropertyDescriptor(c, "flags").get.call(t);
                    return l !== a || i !== a
                }));
            u && o(c, "flags", {
                configurable: !0,
                get: s
            })
        },
        "53f7": function(e, t, i) {},
        "55a0": function(e, t, i) {},
        "55a3": function(e, t) {
            function i(e) {
                return this.__data__.has(e)
            }
            e.exports = i
        },
        "575c": function(e, t, i) {
            "use strict";
            i("ec91")
        },
        "57a5": function(e, t, i) {
            var a = i("91e9"),
                n = a(Object.keys, Object);
            e.exports = n
        },
        "585a": function(e, t, i) {
            (function(t) {
                var i = "object" == typeof t && t && t.Object === Object && t;
                e.exports = i
            }).call(this, i("c8ba"))
        },
        5965: function(e, t, i) {
            "use strict";
            i("6652")
        },
        "5de5": function(e, t, i) {},
        "5e2e": function(e, t, i) {
            var a = i("28c9"),
                n = i("69d5"),
                o = i("b4c0"),
                s = i("fba5"),
                l = i("67ca");

            function r(e) {
                var t = -1,
                    i = null == e ? 0 : e.length;
                this.clear();
                while (++t < i) {
                    var a = e[t];
                    this.set(a[0], a[1])
                }
            }
            r.prototype.clear = a, r.prototype["delete"] = n, r.prototype.get = o, r.prototype.has = s, r.prototype.set = l, e.exports = r
        },
        "5f45": function(e, t, i) {
            "use strict";
            i("075e")
        },
        6044: function(e, t, i) {
            var a = i("0b07"),
                n = a(Object, "create");
            e.exports = n
        },
        "60d8": function(e, t, i) {
            "use strict";
            i("fac4")
        },
        "617a": function(e, t, i) {},
        "619b": function(e, t, i) {},
        6217: function(e, t, i) {
            "use strict";
            i("a6ef")
        },
        "63ea": function(e, t, i) {
            var a = i("c05f");

            function n(e, t) {
                return a(e, t)
            }
            e.exports = n
        },
        6652: function(e, t, i) {},
        6747: function(e, t) {
            var i = Array.isArray;
            e.exports = i
        },
        "67ca": function(e, t, i) {
            var a = i("cb5a");

            function n(e, t) {
                var i = this.__data__,
                    n = a(i, e);
                return n < 0 ? (++this.size, i.push([e, t])) : i[n][1] = t, this
            }
            e.exports = n
        },
        "69d5": function(e, t, i) {
            var a = i("cb5a"),
                n = Array.prototype,
                o = n.splice;

            function s(e) {
                var t = this.__data__,
                    i = a(t, e);
                if (i < 0) return !1;
                var n = t.length - 1;
                return i == n ? t.pop() : o.call(t, i, 1), --this.size, !0
            }
            e.exports = s
        },
        "6ba2": function(e, t, i) {},
        "6e02": function(e, t, i) {
            "use strict";
            i("8299")
        },
        "6fcd": function(e, t, i) {
            var a = i("50d8"),
                n = i("d370"),
                o = i("6747"),
                s = i("0d24"),
                l = i("c0983"),
                r = i("73ac"),
                c = Object.prototype,
                u = c.hasOwnProperty;

            function d(e, t) {
                var i = o(e),
                    c = !i && n(e),
                    d = !i && !c && s(e),
                    h = !i && !c && !d && r(e),
                    p = i || c || d || h,
                    f = p ? a(e.length, String) : [],
                    m = f.length;
                for (var g in e) !t && !u.call(e, g) || p && ("length" == g || d && ("offset" == g || "parent" == g) || h && ("buffer" == g || "byteLength" == g || "byteOffset" == g) || l(g, m)) || f.push(g);
                return f
            }
            e.exports = d
        },
        "71c4": function(e, t, i) {},
        "73ac": function(e, t, i) {
            var a = i("743f"),
                n = i("b047"),
                o = i("99d3"),
                s = o && o.isTypedArray,
                l = s ? n(s) : a;
            e.exports = l
        },
        "743f": function(e, t, i) {
            var a = i("3729"),
                n = i("b218"),
                o = i("1310"),
                s = "[object Arguments]",
                l = "[object Array]",
                r = "[object Boolean]",
                c = "[object Date]",
                u = "[object Error]",
                d = "[object Function]",
                h = "[object Map]",
                p = "[object Number]",
                f = "[object Object]",
                m = "[object RegExp]",
                g = "[object Set]",
                v = "[object String]",
                b = "[object WeakMap]",
                y = "[object ArrayBuffer]",
                w = "[object DataView]",
                k = "[object Float32Array]",
                C = "[object Float64Array]",
                x = "[object Int8Array]",
                P = "[object Int16Array]",
                S = "[object Int32Array]",
                _ = "[object Uint8Array]",
                O = "[object Uint8ClampedArray]",
                I = "[object Uint16Array]",
                T = "[object Uint32Array]",
                M = {};

            function j(e) {
                return o(e) && n(e.length) && !!M[a(e)]
            }
            M[k] = M[C] = M[x] = M[P] = M[S] = M[_] = M[O] = M[I] = M[T] = !0, M[s] = M[l] = M[y] = M[r] = M[w] = M[c] = M[u] = M[d] = M[h] = M[p] = M[f] = M[m] = M[g] = M[v] = M[b] = !1, e.exports = j
        },
        "74c5": function(e, t, i) {
            "use strict";
            i("b207")
        },
        7981: function(e, t, i) {},
        "79bc": function(e, t, i) {
            var a = i("0b07"),
                n = i("2b3e"),
                o = a(n, "Map");
            e.exports = o
        },
        "7a48": function(e, t, i) {
            var a = i("6044"),
                n = Object.prototype,
                o = n.hasOwnProperty;

            function s(e) {
                var t = this.__data__;
                return a ? void 0 !== t[e] : o.call(t, e)
            }
            e.exports = s
        },
        "7b55": function(e, t, i) {},
        "7b83": function(e, t, i) {
            var a = i("7c64"),
                n = i("93ed"),
                o = i("2478"),
                s = i("a524"),
                l = i("1fc8");

            function r(e) {
                var t = -1,
                    i = null == e ? 0 : e.length;
                this.clear();
                while (++t < i) {
                    var a = e[t];
                    this.set(a[0], a[1])
                }
            }
            r.prototype.clear = a, r.prototype["delete"] = n, r.prototype.get = o, r.prototype.has = s, r.prototype.set = l, e.exports = r
        },
        "7b97": function(e, t, i) {
            var a = i("7e64"),
                n = i("a2be"),
                o = i("1c3c"),
                s = i("b1e5"),
                l = i("42a2"),
                r = i("6747"),
                c = i("0d24"),
                u = i("73ac"),
                d = 1,
                h = "[object Arguments]",
                p = "[object Array]",
                f = "[object Object]",
                m = Object.prototype,
                g = m.hasOwnProperty;

            function v(e, t, i, m, v, b) {
                var y = r(e),
                    w = r(t),
                    k = y ? p : l(e),
                    C = w ? p : l(t);
                k = k == h ? f : k, C = C == h ? f : C;
                var x = k == f,
                    P = C == f,
                    S = k == C;
                if (S && c(e)) {
                    if (!c(t)) return !1;
                    y = !0, x = !1
                }
                if (S && !x) return b || (b = new a), y || u(e) ? n(e, t, i, m, v, b) : o(e, t, k, i, m, v, b);
                if (!(i & d)) {
                    var _ = x && g.call(e, "__wrapped__"),
                        O = P && g.call(t, "__wrapped__");
                    if (_ || O) {
                        var I = _ ? e.value() : e,
                            T = O ? t.value() : t;
                        return b || (b = new a), v(I, T, i, m, b)
                    }
                }
                return !!S && (b || (b = new a), s(e, t, i, m, v, b))
            }
            e.exports = v
        },
        "7c64": function(e, t, i) {
            var a = i("e24b"),
                n = i("5e2e"),
                o = i("79bc");

            function s() {
                this.size = 0, this.__data__ = {
                    hash: new a,
                    map: new(o || n),
                    string: new a
                }
            }
            e.exports = s
        },
        "7ce0": function(e, t, i) {
            "use strict";
            i("53f7")
        },
        "7d1f": function(e, t, i) {
            var a = i("087d"),
                n = i("6747");

            function o(e, t, i) {
                var o = t(e);
                return n(e) ? o : a(o, i(e))
            }
            e.exports = o
        },
        "7e64": function(e, t, i) {
            var a = i("5e2e"),
                n = i("efb6"),
                o = i("2fcc4"),
                s = i("802a"),
                l = i("55a3"),
                r = i("d02c");

            function c(e) {
                var t = this.__data__ = new a(e);
                this.size = t.size
            }
            c.prototype.clear = n, c.prototype["delete"] = o, c.prototype.get = s, c.prototype.has = l, c.prototype.set = r, e.exports = c
        },
        "7ed2": function(e, t) {
            var i = "__lodash_hash_undefined__";

            function a(e) {
                return this.__data__.set(e, i), this
            }
            e.exports = a
        },
        "802a": function(e, t) {
            function i(e) {
                return this.__data__.get(e)
            }
            e.exports = i
        },
        8299: function(e, t, i) {},
        "83ed": function(e, t, i) {},
        8836: function(e, t, i) {
            "use strict";
            i("ec7e")
        },
        "8d1a": function(e, t, i) {
            "use strict";
            i("008b")
        },
        "8e8a": function(e, t, i) {
            "use strict";
            i("0121")
        },
        "91e9": function(e, t) {
            function i(e, t) {
                return function(i) {
                    return e(t(i))
                }
            }
            e.exports = i
        },
        "93ed": function(e, t, i) {
            var a = i("4245");

            function n(e) {
                var t = a(this, e)["delete"](e);
                return this.size -= t ? 1 : 0, t
            }
            e.exports = n
        },
        9520: function(e, t, i) {
            var a = i("3729"),
                n = i("1a8c"),
                o = "[object AsyncFunction]",
                s = "[object Function]",
                l = "[object GeneratorFunction]",
                r = "[object Proxy]";

            function c(e) {
                if (!n(e)) return !1;
                var t = a(e);
                return t == s || t == l || t == o || t == r
            }
            e.exports = c
        },
        9595: function(e, t, i) {},
        9638: function(e, t) {
            function i(e, t) {
                return e === t || e !== e && t !== t
            }
            e.exports = i
        },
        "99d3": function(e, t, i) {
            (function(e) {
                var a = i("585a"),
                    n = t && !t.nodeType && t,
                    o = n && "object" == typeof e && e && !e.nodeType && e,
                    s = o && o.exports === n,
                    l = s && a.process,
                    r = function() {
                        try {
                            var e = o && o.require && o.require("util").types;
                            return e || l && l.binding && l.binding("util")
                        } catch (t) {}
                    }();
                e.exports = r
            }).call(this, i("62e4")(e))
        },
        "9cd1": function(e, t, i) {
            "use strict";
            i("0edb")
        },
        "9e69": function(e, t, i) {
            var a = i("2b3e"),
                n = a.Symbol;
            e.exports = n
        },
        a0db: function(e, t, i) {
            "use strict";
            i("9595")
        },
        a178: function(e, t, i) {},
        a1e0: function(e, t, i) {},
        a2be: function(e, t, i) {
            var a = i("d612"),
                n = i("4284"),
                o = i("c584"),
                s = 1,
                l = 2;

            function r(e, t, i, r, c, u) {
                var d = i & s,
                    h = e.length,
                    p = t.length;
                if (h != p && !(d && p > h)) return !1;
                var f = u.get(e),
                    m = u.get(t);
                if (f && m) return f == t && m == e;
                var g = -1,
                    v = !0,
                    b = i & l ? new a : void 0;
                u.set(e, t), u.set(t, e);
                while (++g < h) {
                    var y = e[g],
                        w = t[g];
                    if (r) var k = d ? r(w, y, g, t, e, u) : r(y, w, g, e, t, u);
                    if (void 0 !== k) {
                        if (k) continue;
                        v = !1;
                        break
                    }
                    if (b) {
                        if (!n(t, (function(e, t) {
                                if (!o(b, t) && (y === e || c(y, e, i, r, u))) return b.push(t)
                            }))) {
                            v = !1;
                            break
                        }
                    } else if (y !== w && !c(y, w, i, r, u)) {
                        v = !1;
                        break
                    }
                }
                return u["delete"](e), u["delete"](t), v
            }
            e.exports = r
        },
        a4b4: function(e, t, i) {},
        a524: function(e, t, i) {
            var a = i("4245");

            function n(e) {
                return a(this, e).has(e)
            }
            e.exports = n
        },
        a6de: function(e, t, i) {},
        a6ef: function(e, t, i) {},
        a8ea: function(e, t, i) {},
        a994: function(e, t, i) {
            var a = i("7d1f"),
                n = i("32f4"),
                o = i("ec69");

            function s(e) {
                return a(e, o, n)
            }
            e.exports = s
        },
        ac41: function(e, t) {
            function i(e) {
                var t = -1,
                    i = Array(e.size);
                return e.forEach((function(e) {
                    i[++t] = e
                })), i
            }
            e.exports = i
        },
        acb8: function(e, t, i) {},
        aeda: function(e, t, i) {
            "use strict";
            i("50c8")
        },
        b047: function(e, t) {
            function i(e) {
                return function(t) {
                    return e(t)
                }
            }
            e.exports = i
        },
        b1e5: function(e, t, i) {
            var a = i("a994"),
                n = 1,
                o = Object.prototype,
                s = o.hasOwnProperty;

            function l(e, t, i, o, l, r) {
                var c = i & n,
                    u = a(e),
                    d = u.length,
                    h = a(t),
                    p = h.length;
                if (d != p && !c) return !1;
                var f = d;
                while (f--) {
                    var m = u[f];
                    if (!(c ? m in t : s.call(t, m))) return !1
                }
                var g = r.get(e),
                    v = r.get(t);
                if (g && v) return g == t && v == e;
                var b = !0;
                r.set(e, t), r.set(t, e);
                var y = c;
                while (++f < d) {
                    m = u[f];
                    var w = e[m],
                        k = t[m];
                    if (o) var C = c ? o(k, w, m, t, e, r) : o(w, k, m, e, t, r);
                    if (!(void 0 === C ? w === k || l(w, k, i, o, r) : C)) {
                        b = !1;
                        break
                    }
                    y || (y = "constructor" == m)
                }
                if (b && !y) {
                    var x = e.constructor,
                        P = t.constructor;
                    x == P || !("constructor" in e) || !("constructor" in t) || "function" == typeof x && x instanceof x && "function" == typeof P && P instanceof P || (b = !1)
                }
                return r["delete"](e), r["delete"](t), b
            }
            e.exports = l
        },
        b207: function(e, t, i) {},
        b218: function(e, t) {
            var i = 9007199254740991;

            function a(e) {
                return "number" == typeof e && e > -1 && e % 1 == 0 && e <= i
            }
            e.exports = a
        },
        b4c0: function(e, t, i) {
            var a = i("cb5a");

            function n(e) {
                var t = this.__data__,
                    i = a(t, e);
                return i < 0 ? void 0 : t[i][1]
            }
            e.exports = n
        },
        b5a7: function(e, t, i) {
            var a = i("0b07"),
                n = i("2b3e"),
                o = a(n, "DataView");
            e.exports = o
        },
        b9ff: function(e, t, i) {
            "use strict";
            i("e468")
        },
        bbc0: function(e, t, i) {
            var a = i("6044"),
                n = "__lodash_hash_undefined__",
                o = Object.prototype,
                s = o.hasOwnProperty;

            function l(e) {
                var t = this.__data__;
                if (a) {
                    var i = t[e];
                    return i === n ? void 0 : i
                }
                return s.call(t, e) ? t[e] : void 0
            }
            e.exports = l
        },
        bd9d: function(e, t, i) {
            "use strict";
            i("44ff")
        },
        c05f: function(e, t, i) {
            var a = i("7b97"),
                n = i("1310");

            function o(e, t, i, s, l) {
                return e === t || (null == e || null == t || !n(e) && !n(t) ? e !== e && t !== t : a(e, t, i, s, o, l))
            }
            e.exports = o
        },
        c0983: function(e, t) {
            var i = 9007199254740991,
                a = /^(?:0|[1-9]\d*)$/;

            function n(e, t) {
                var n = typeof e;
                return t = null == t ? i : t, !!t && ("number" == n || "symbol" != n && a.test(e)) && e > -1 && e % 1 == 0 && e < t
            }
            e.exports = n
        },
        c194: function(e, t, i) {
            "use strict";
            i("acb8")
        },
        c213: function(e, t, i) {
            "use strict";
            i("617a")
        },
        c584: function(e, t) {
            function i(e, t) {
                return e.has(t)
            }
            e.exports = i
        },
        c869: function(e, t, i) {
            var a = i("0b07"),
                n = i("2b3e"),
                o = a(n, "Set");
            e.exports = o
        },
        cb5a: function(e, t, i) {
            var a = i("9638");

            function n(e, t) {
                var i = e.length;
                while (i--)
                    if (a(e[i][0], t)) return i;
                return -1
            }
            e.exports = n
        },
        cfb4: function(e, t, i) {
            "use strict";
            i("55a0")
        },
        d02c: function(e, t, i) {
            var a = i("5e2e"),
                n = i("79bc"),
                o = i("7b83"),
                s = 200;

            function l(e, t) {
                var i = this.__data__;
                if (i instanceof a) {
                    var l = i.__data__;
                    if (!n || l.length < s - 1) return l.push([e, t]), this.size = ++i.size, this;
                    i = this.__data__ = new o(l)
                }
                return i.set(e, t), this.size = i.size, this
            }
            e.exports = l
        },
        d136: function(e, t, i) {},
        d327: function(e, t) {
            function i() {
                return []
            }
            e.exports = i
        },
        d353: function(e, t, i) {
            e.exports = i.p + "img/tips_png_keyboard_windows@3x.873a30d9.png"
        },
        d370: function(e, t, i) {
            var a = i("253c"),
                n = i("1310"),
                o = Object.prototype,
                s = o.hasOwnProperty,
                l = o.propertyIsEnumerable,
                r = a(function() {
                    return arguments
                }()) ? a : function(e) {
                    return n(e) && s.call(e, "callee") && !l.call(e, "callee")
                };
            e.exports = r
        },
        d60d: function(e, t, i) {},
        d612: function(e, t, i) {
            var a = i("7b83"),
                n = i("7ed2"),
                o = i("dc0f");

            function s(e) {
                var t = -1,
                    i = null == e ? 0 : e.length;
                this.__data__ = new a;
                while (++t < i) this.add(e[t])
            }
            s.prototype.add = s.prototype.push = n, s.prototype.has = o, e.exports = s
        },
        da03: function(e, t, i) {
            var a = i("2b3e"),
                n = a["__core-js_shared__"];
            e.exports = n
        },
        da03b: function(e, t, i) {
            "use strict";
            i("ef29")
        },
        dc0f: function(e, t) {
            function i(e) {
                return this.__data__.has(e)
            }
            e.exports = i
        },
        dc0f8: function(e, t, i) {
            "use strict";
            i("6ba2")
        },
        dc57: function(e, t) {
            var i = Function.prototype,
                a = i.toString;

            function n(e) {
                if (null != e) {
                    try {
                        return a.call(e)
                    } catch (t) {}
                    try {
                        return e + ""
                    } catch (t) {}
                }
                return ""
            }
            e.exports = n
        },
        dcd0: function(e, t, i) {},
        e166: function(e, t, i) {
            "use strict";
            i("a1e0")
        },
        e24b: function(e, t, i) {
            var a = i("49f4"),
                n = i("1efc"),
                o = i("bbc0"),
                s = i("7a48"),
                l = i("2524");

            function r(e) {
                var t = -1,
                    i = null == e ? 0 : e.length;
                this.clear();
                while (++t < i) {
                    var a = e[t];
                    this.set(a[0], a[1])
                }
            }
            r.prototype.clear = a, r.prototype["delete"] = n, r.prototype.get = o, r.prototype.has = s, r.prototype.set = l, e.exports = r
        },
        e3e6: function(e, t, i) {},
        e468: function(e, t, i) {},
        e710: function(e, t, i) {
            "use strict";
            i("dcd0")
        },
        ea58: function(e, t, i) {
            "use strict";
            i("83ed")
        },
        eac5: function(e, t) {
            var i = Object.prototype;

            function a(e) {
                var t = e && e.constructor,
                    a = "function" == typeof t && t.prototype || i;
                return e === a
            }
            e.exports = a
        },
        ec69: function(e, t, i) {
            var a = i("6fcd"),
                n = i("03dd"),
                o = i("30c9");

            function s(e) {
                return o(e) ? a(e) : n(e)
            }
            e.exports = s
        },
        ec7e: function(e, t, i) {},
        ec91: function(e, t, i) {},
        edd0: function(e, t, i) {
            var a = i("13d2"),
                n = i("9bf2");
            e.exports = function(e, t, i) {
                return i.get && a(i.get, t, {
                    getter: !0
                }), i.set && a(i.set, t, {
                    setter: !0
                }), n.f(e, t, i)
            }
        },
        edfa: function(e, t) {
            function i(e) {
                var t = -1,
                    i = Array(e.size);
                return e.forEach((function(e, a) {
                    i[++t] = [a, e]
                })), i
            }
            e.exports = i
        },
        ef29: function(e, t, i) {},
        efb6: function(e, t, i) {
            var a = i("5e2e");

            function n() {
                this.__data__ = new a, this.size = 0
            }
            e.exports = n
        },
        f0bd: function(e, t, i) {
            "use strict";
            (function(e) {
                /**!
                 * @fileOverview Kickass library to create and place poppers near their reference elements.
                 * @version 1.16.1
                 * @license
                 * Copyright (c) 2016 Federico Zivolo and contributors
                 *
                 * Permission is hereby granted, free of charge, to any person obtaining a copy
                 * of this software and associated documentation files (the "Software"), to deal
                 * in the Software without restriction, including without limitation the rights
                 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                 * copies of the Software, and to permit persons to whom the Software is
                 * furnished to do so, subject to the following conditions:
                 *
                 * The above copyright notice and this permission notice shall be included in all
                 * copies or substantial portions of the Software.
                 *
                 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                 * SOFTWARE.
                 */
                var i = "undefined" !== typeof window && "undefined" !== typeof document && "undefined" !== typeof navigator,
                    a = function() {
                        for (var e = ["Edge", "Trident", "Firefox"], t = 0; t < e.length; t += 1)
                            if (i && navigator.userAgent.indexOf(e[t]) >= 0) return 1;
                        return 0
                    }();

                function n(e) {
                    var t = !1;
                    return function() {
                        t || (t = !0, window.Promise.resolve().then((function() {
                            t = !1, e()
                        })))
                    }
                }

                function o(e) {
                    var t = !1;
                    return function() {
                        t || (t = !0, setTimeout((function() {
                            t = !1, e()
                        }), a))
                    }
                }
                var s = i && window.Promise,
                    l = s ? n : o;

                function r(e) {
                    var t = {};
                    return e && "[object Function]" === t.toString.call(e)
                }

                function c(e, t) {
                    if (1 !== e.nodeType) return [];
                    var i = e.ownerDocument.defaultView,
                        a = i.getComputedStyle(e, null);
                    return t ? a[t] : a
                }

                function u(e) {
                    return "HTML" === e.nodeName ? e : e.parentNode || e.host
                }

                function d(e) {
                    if (!e) return document.body;
                    switch (e.nodeName) {
                        case "HTML":
                        case "BODY":
                            return e.ownerDocument.body;
                        case "#document":
                            return e.body
                    }
                    var t = c(e),
                        i = t.overflow,
                        a = t.overflowX,
                        n = t.overflowY;
                    return /(auto|scroll|overlay)/.test(i + n + a) ? e : d(u(e))
                }

                function h(e) {
                    return e && e.referenceNode ? e.referenceNode : e
                }
                var p = i && !(!window.MSInputMethodContext || !document.documentMode),
                    f = i && /MSIE 10/.test(navigator.userAgent);

                function m(e) {
                    return 11 === e ? p : 10 === e ? f : p || f
                }

                function g(e) {
                    if (!e) return document.documentElement;
                    var t = m(10) ? document.body : null,
                        i = e.offsetParent || null;
                    while (i === t && e.nextElementSibling) i = (e = e.nextElementSibling).offsetParent;
                    var a = i && i.nodeName;
                    return a && "BODY" !== a && "HTML" !== a ? -1 !== ["TH", "TD", "TABLE"].indexOf(i.nodeName) && "static" === c(i, "position") ? g(i) : i : e ? e.ownerDocument.documentElement : document.documentElement
                }

                function v(e) {
                    var t = e.nodeName;
                    return "BODY" !== t && ("HTML" === t || g(e.firstElementChild) === e)
                }

                function b(e) {
                    return null !== e.parentNode ? b(e.parentNode) : e
                }

                function y(e, t) {
                    if (!e || !e.nodeType || !t || !t.nodeType) return document.documentElement;
                    var i = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
                        a = i ? e : t,
                        n = i ? t : e,
                        o = document.createRange();
                    o.setStart(a, 0), o.setEnd(n, 0);
                    var s = o.commonAncestorContainer;
                    if (e !== s && t !== s || a.contains(n)) return v(s) ? s : g(s);
                    var l = b(e);
                    return l.host ? y(l.host, t) : y(e, b(t).host)
                }

                function w(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "top",
                        i = "top" === t ? "scrollTop" : "scrollLeft",
                        a = e.nodeName;
                    if ("BODY" === a || "HTML" === a) {
                        var n = e.ownerDocument.documentElement,
                            o = e.ownerDocument.scrollingElement || n;
                        return o[i]
                    }
                    return e[i]
                }

                function k(e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        a = w(t, "top"),
                        n = w(t, "left"),
                        o = i ? -1 : 1;
                    return e.top += a * o, e.bottom += a * o, e.left += n * o, e.right += n * o, e
                }

                function C(e, t) {
                    var i = "x" === t ? "Left" : "Top",
                        a = "Left" === i ? "Right" : "Bottom";
                    return parseFloat(e["border" + i + "Width"]) + parseFloat(e["border" + a + "Width"])
                }

                function x(e, t, i, a) {
                    return Math.max(t["offset" + e], t["scroll" + e], i["client" + e], i["offset" + e], i["scroll" + e], m(10) ? parseInt(i["offset" + e]) + parseInt(a["margin" + ("Height" === e ? "Top" : "Left")]) + parseInt(a["margin" + ("Height" === e ? "Bottom" : "Right")]) : 0)
                }

                function P(e) {
                    var t = e.body,
                        i = e.documentElement,
                        a = m(10) && getComputedStyle(i);
                    return {
                        height: x("Height", t, i, a),
                        width: x("Width", t, i, a)
                    }
                }
                var S = function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    },
                    _ = function() {
                        function e(e, t) {
                            for (var i = 0; i < t.length; i++) {
                                var a = t[i];
                                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(e, a.key, a)
                            }
                        }
                        return function(t, i, a) {
                            return i && e(t.prototype, i), a && e(t, a), t
                        }
                    }(),
                    O = function(e, t, i) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: i,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = i, e
                    },
                    I = Object.assign || function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var i = arguments[t];
                            for (var a in i) Object.prototype.hasOwnProperty.call(i, a) && (e[a] = i[a])
                        }
                        return e
                    };

                function T(e) {
                    return I({}, e, {
                        right: e.left + e.width,
                        bottom: e.top + e.height
                    })
                }

                function M(e) {
                    var t = {};
                    try {
                        if (m(10)) {
                            t = e.getBoundingClientRect();
                            var i = w(e, "top"),
                                a = w(e, "left");
                            t.top += i, t.left += a, t.bottom += i, t.right += a
                        } else t = e.getBoundingClientRect()
                    } catch (h) {}
                    var n = {
                            left: t.left,
                            top: t.top,
                            width: t.right - t.left,
                            height: t.bottom - t.top
                        },
                        o = "HTML" === e.nodeName ? P(e.ownerDocument) : {},
                        s = o.width || e.clientWidth || n.width,
                        l = o.height || e.clientHeight || n.height,
                        r = e.offsetWidth - s,
                        u = e.offsetHeight - l;
                    if (r || u) {
                        var d = c(e);
                        r -= C(d, "x"), u -= C(d, "y"), n.width -= r, n.height -= u
                    }
                    return T(n)
                }

                function j(e, t) {
                    var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        a = m(10),
                        n = "HTML" === t.nodeName,
                        o = M(e),
                        s = M(t),
                        l = d(e),
                        r = c(t),
                        u = parseFloat(r.borderTopWidth),
                        h = parseFloat(r.borderLeftWidth);
                    i && n && (s.top = Math.max(s.top, 0), s.left = Math.max(s.left, 0));
                    var p = T({
                        top: o.top - s.top - u,
                        left: o.left - s.left - h,
                        width: o.width,
                        height: o.height
                    });
                    if (p.marginTop = 0, p.marginLeft = 0, !a && n) {
                        var f = parseFloat(r.marginTop),
                            g = parseFloat(r.marginLeft);
                        p.top -= u - f, p.bottom -= u - f, p.left -= h - g, p.right -= h - g, p.marginTop = f, p.marginLeft = g
                    }
                    return (a && !i ? t.contains(l) : t === l && "BODY" !== l.nodeName) && (p = k(p, t)), p
                }

                function D(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        i = e.ownerDocument.documentElement,
                        a = j(e, i),
                        n = Math.max(i.clientWidth, window.innerWidth || 0),
                        o = Math.max(i.clientHeight, window.innerHeight || 0),
                        s = t ? 0 : w(i),
                        l = t ? 0 : w(i, "left"),
                        r = {
                            top: s - a.top + a.marginTop,
                            left: l - a.left + a.marginLeft,
                            width: n,
                            height: o
                        };
                    return T(r)
                }

                function R(e) {
                    var t = e.nodeName;
                    if ("BODY" === t || "HTML" === t) return !1;
                    if ("fixed" === c(e, "position")) return !0;
                    var i = u(e);
                    return !!i && R(i)
                }

                function N(e) {
                    if (!e || !e.parentElement || m()) return document.documentElement;
                    var t = e.parentElement;
                    while (t && "none" === c(t, "transform")) t = t.parentElement;
                    return t || document.documentElement
                }

                function B(e, t, i, a) {
                    var n = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                        o = {
                            top: 0,
                            left: 0
                        },
                        s = n ? N(e) : y(e, h(t));
                    if ("viewport" === a) o = D(s, n);
                    else {
                        var l = void 0;
                        "scrollParent" === a ? (l = d(u(t)), "BODY" === l.nodeName && (l = e.ownerDocument.documentElement)) : l = "window" === a ? e.ownerDocument.documentElement : a;
                        var r = j(l, s, n);
                        if ("HTML" !== l.nodeName || R(s)) o = r;
                        else {
                            var c = P(e.ownerDocument),
                                p = c.height,
                                f = c.width;
                            o.top += r.top - r.marginTop, o.bottom = p + r.top, o.left += r.left - r.marginLeft, o.right = f + r.left
                        }
                    }
                    i = i || 0;
                    var m = "number" === typeof i;
                    return o.left += m ? i : i.left || 0, o.top += m ? i : i.top || 0, o.right -= m ? i : i.right || 0, o.bottom -= m ? i : i.bottom || 0, o
                }

                function E(e) {
                    var t = e.width,
                        i = e.height;
                    return t * i
                }

                function F(e, t, i, a, n) {
                    var o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0;
                    if (-1 === e.indexOf("auto")) return e;
                    var s = B(i, a, o, n),
                        l = {
                            top: {
                                width: s.width,
                                height: t.top - s.top
                            },
                            right: {
                                width: s.right - t.right,
                                height: s.height
                            },
                            bottom: {
                                width: s.width,
                                height: s.bottom - t.bottom
                            },
                            left: {
                                width: t.left - s.left,
                                height: s.height
                            }
                        },
                        r = Object.keys(l).map((function(e) {
                            return I({
                                key: e
                            }, l[e], {
                                area: E(l[e])
                            })
                        })).sort((function(e, t) {
                            return t.area - e.area
                        })),
                        c = r.filter((function(e) {
                            var t = e.width,
                                a = e.height;
                            return t >= i.clientWidth && a >= i.clientHeight
                        })),
                        u = c.length > 0 ? c[0].key : r[0].key,
                        d = e.split("-")[1];
                    return u + (d ? "-" + d : "")
                }

                function L(e, t, i) {
                    var a = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null,
                        n = a ? N(t) : y(t, h(i));
                    return j(i, n, a)
                }

                function V(e) {
                    var t = e.ownerDocument.defaultView,
                        i = t.getComputedStyle(e),
                        a = parseFloat(i.marginTop || 0) + parseFloat(i.marginBottom || 0),
                        n = parseFloat(i.marginLeft || 0) + parseFloat(i.marginRight || 0),
                        o = {
                            width: e.offsetWidth + n,
                            height: e.offsetHeight + a
                        };
                    return o
                }

                function A(e) {
                    var t = {
                        left: "right",
                        right: "left",
                        bottom: "top",
                        top: "bottom"
                    };
                    return e.replace(/left|right|bottom|top/g, (function(e) {
                        return t[e]
                    }))
                }

                function U(e, t, i) {
                    i = i.split("-")[0];
                    var a = V(e),
                        n = {
                            width: a.width,
                            height: a.height
                        },
                        o = -1 !== ["right", "left"].indexOf(i),
                        s = o ? "top" : "left",
                        l = o ? "left" : "top",
                        r = o ? "height" : "width",
                        c = o ? "width" : "height";
                    return n[s] = t[s] + t[r] / 2 - a[r] / 2, n[l] = i === l ? t[l] - a[c] : t[A(l)], n
                }

                function $(e, t) {
                    return Array.prototype.find ? e.find(t) : e.filter(t)[0]
                }

                function H(e, t, i) {
                    if (Array.prototype.findIndex) return e.findIndex((function(e) {
                        return e[t] === i
                    }));
                    var a = $(e, (function(e) {
                        return e[t] === i
                    }));
                    return e.indexOf(a)
                }

                function z(e, t, i) {
                    var a = void 0 === i ? e : e.slice(0, H(e, "name", i));
                    return a.forEach((function(e) {
                        e["function"] && console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
                        var i = e["function"] || e.fn;
                        e.enabled && r(i) && (t.offsets.popper = T(t.offsets.popper), t.offsets.reference = T(t.offsets.reference), t = i(t, e))
                    })), t
                }

                function W() {
                    if (!this.state.isDestroyed) {
                        var e = {
                            instance: this,
                            styles: {},
                            arrowStyles: {},
                            attributes: {},
                            flipped: !1,
                            offsets: {}
                        };
                        e.offsets.reference = L(this.state, this.popper, this.reference, this.options.positionFixed), e.placement = F(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.positionFixed = this.options.positionFixed, e.offsets.popper = U(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute", e = z(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e))
                    }
                }

                function q(e, t) {
                    return e.some((function(e) {
                        var i = e.name,
                            a = e.enabled;
                        return a && i === t
                    }))
                }

                function G(e) {
                    for (var t = [!1, "ms", "Webkit", "Moz", "O"], i = e.charAt(0).toUpperCase() + e.slice(1), a = 0; a < t.length; a++) {
                        var n = t[a],
                            o = n ? "" + n + i : e;
                        if ("undefined" !== typeof document.body.style[o]) return o
                    }
                    return null
                }

                function K() {
                    return this.state.isDestroyed = !0, q(this.modifiers, "applyStyle") && (this.popper.removeAttribute("x-placement"), this.popper.style.position = "", this.popper.style.top = "", this.popper.style.left = "", this.popper.style.right = "", this.popper.style.bottom = "", this.popper.style.willChange = "", this.popper.style[G("transform")] = ""), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this
                }

                function J(e) {
                    var t = e.ownerDocument;
                    return t ? t.defaultView : window
                }

                function Y(e, t, i, a) {
                    var n = "BODY" === e.nodeName,
                        o = n ? e.ownerDocument.defaultView : e;
                    o.addEventListener(t, i, {
                        passive: !0
                    }), n || Y(d(o.parentNode), t, i, a), a.push(o)
                }

                function X(e, t, i, a) {
                    i.updateBound = a, J(e).addEventListener("resize", i.updateBound, {
                        passive: !0
                    });
                    var n = d(e);
                    return Y(n, "scroll", i.updateBound, i.scrollParents), i.scrollElement = n, i.eventsEnabled = !0, i
                }

                function Z() {
                    this.state.eventsEnabled || (this.state = X(this.reference, this.options, this.state, this.scheduleUpdate))
                }

                function Q(e, t) {
                    return J(e).removeEventListener("resize", t.updateBound), t.scrollParents.forEach((function(e) {
                        e.removeEventListener("scroll", t.updateBound)
                    })), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t
                }

                function ee() {
                    this.state.eventsEnabled && (cancelAnimationFrame(this.scheduleUpdate), this.state = Q(this.reference, this.state))
                }

                function te(e) {
                    return "" !== e && !isNaN(parseFloat(e)) && isFinite(e)
                }

                function ie(e, t) {
                    Object.keys(t).forEach((function(i) {
                        var a = ""; - 1 !== ["width", "height", "top", "right", "bottom", "left"].indexOf(i) && te(t[i]) && (a = "px"), e.style[i] = t[i] + a
                    }))
                }

                function ae(e, t) {
                    Object.keys(t).forEach((function(i) {
                        var a = t[i];
                        !1 !== a ? e.setAttribute(i, t[i]) : e.removeAttribute(i)
                    }))
                }

                function ne(e) {
                    return ie(e.instance.popper, e.styles), ae(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && ie(e.arrowElement, e.arrowStyles), e
                }

                function oe(e, t, i, a, n) {
                    var o = L(n, t, e, i.positionFixed),
                        s = F(i.placement, o, t, e, i.modifiers.flip.boundariesElement, i.modifiers.flip.padding);
                    return t.setAttribute("x-placement", s), ie(t, {
                        position: i.positionFixed ? "fixed" : "absolute"
                    }), i
                }

                function se(e, t) {
                    var i = e.offsets,
                        a = i.popper,
                        n = i.reference,
                        o = Math.round,
                        s = Math.floor,
                        l = function(e) {
                            return e
                        },
                        r = o(n.width),
                        c = o(a.width),
                        u = -1 !== ["left", "right"].indexOf(e.placement),
                        d = -1 !== e.placement.indexOf("-"),
                        h = r % 2 === c % 2,
                        p = r % 2 === 1 && c % 2 === 1,
                        f = t ? u || d || h ? o : s : l,
                        m = t ? o : l;
                    return {
                        left: f(p && !d && t ? a.left - 1 : a.left),
                        top: m(a.top),
                        bottom: m(a.bottom),
                        right: f(a.right)
                    }
                }
                var le = i && /Firefox/i.test(navigator.userAgent);

                function re(e, t) {
                    var i = t.x,
                        a = t.y,
                        n = e.offsets.popper,
                        o = $(e.instance.modifiers, (function(e) {
                            return "applyStyle" === e.name
                        })).gpuAcceleration;
                    void 0 !== o && console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
                    var s = void 0 !== o ? o : t.gpuAcceleration,
                        l = g(e.instance.popper),
                        r = M(l),
                        c = {
                            position: n.position
                        },
                        u = se(e, window.devicePixelRatio < 2 || !le),
                        d = "bottom" === i ? "top" : "bottom",
                        h = "right" === a ? "left" : "right",
                        p = G("transform"),
                        f = void 0,
                        m = void 0;
                    if (m = "bottom" === d ? "HTML" === l.nodeName ? -l.clientHeight + u.bottom : -r.height + u.bottom : u.top, f = "right" === h ? "HTML" === l.nodeName ? -l.clientWidth + u.right : -r.width + u.right : u.left, s && p) c[p] = "translate3d(" + f + "px, " + m + "px, 0)", c[d] = 0, c[h] = 0, c.willChange = "transform";
                    else {
                        var v = "bottom" === d ? -1 : 1,
                            b = "right" === h ? -1 : 1;
                        c[d] = m * v, c[h] = f * b, c.willChange = d + ", " + h
                    }
                    var y = {
                        "x-placement": e.placement
                    };
                    return e.attributes = I({}, y, e.attributes), e.styles = I({}, c, e.styles), e.arrowStyles = I({}, e.offsets.arrow, e.arrowStyles), e
                }

                function ce(e, t, i) {
                    var a = $(e, (function(e) {
                            var i = e.name;
                            return i === t
                        })),
                        n = !!a && e.some((function(e) {
                            return e.name === i && e.enabled && e.order < a.order
                        }));
                    if (!n) {
                        var o = "`" + t + "`",
                            s = "`" + i + "`";
                        console.warn(s + " modifier is required by " + o + " modifier in order to work, be sure to include it before " + o + "!")
                    }
                    return n
                }

                function ue(e, t) {
                    var i;
                    if (!ce(e.instance.modifiers, "arrow", "keepTogether")) return e;
                    var a = t.element;
                    if ("string" === typeof a) {
                        if (a = e.instance.popper.querySelector(a), !a) return e
                    } else if (!e.instance.popper.contains(a)) return console.warn("WARNING: `arrow.element` must be child of its popper element!"), e;
                    var n = e.placement.split("-")[0],
                        o = e.offsets,
                        s = o.popper,
                        l = o.reference,
                        r = -1 !== ["left", "right"].indexOf(n),
                        u = r ? "height" : "width",
                        d = r ? "Top" : "Left",
                        h = d.toLowerCase(),
                        p = r ? "left" : "top",
                        f = r ? "bottom" : "right",
                        m = V(a)[u];
                    l[f] - m < s[h] && (e.offsets.popper[h] -= s[h] - (l[f] - m)), l[h] + m > s[f] && (e.offsets.popper[h] += l[h] + m - s[f]), e.offsets.popper = T(e.offsets.popper);
                    var g = l[h] + l[u] / 2 - m / 2,
                        v = c(e.instance.popper),
                        b = parseFloat(v["margin" + d]),
                        y = parseFloat(v["border" + d + "Width"]),
                        w = g - e.offsets.popper[h] - b - y;
                    return w = Math.max(Math.min(s[u] - m, w), 0), e.arrowElement = a, e.offsets.arrow = (i = {}, O(i, h, Math.round(w)), O(i, p, ""), i), e
                }

                function de(e) {
                    return "end" === e ? "start" : "start" === e ? "end" : e
                }
                var he = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"],
                    pe = he.slice(3);

                function fe(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
                        i = pe.indexOf(e),
                        a = pe.slice(i + 1).concat(pe.slice(0, i));
                    return t ? a.reverse() : a
                }
                var me = {
                    FLIP: "flip",
                    CLOCKWISE: "clockwise",
                    COUNTERCLOCKWISE: "counterclockwise"
                };

                function ge(e, t) {
                    if (q(e.instance.modifiers, "inner")) return e;
                    if (e.flipped && e.placement === e.originalPlacement) return e;
                    var i = B(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement, e.positionFixed),
                        a = e.placement.split("-")[0],
                        n = A(a),
                        o = e.placement.split("-")[1] || "",
                        s = [];
                    switch (t.behavior) {
                        case me.FLIP:
                            s = [a, n];
                            break;
                        case me.CLOCKWISE:
                            s = fe(a);
                            break;
                        case me.COUNTERCLOCKWISE:
                            s = fe(a, !0);
                            break;
                        default:
                            s = t.behavior
                    }
                    return s.forEach((function(l, r) {
                        if (a !== l || s.length === r + 1) return e;
                        a = e.placement.split("-")[0], n = A(a);
                        var c = e.offsets.popper,
                            u = e.offsets.reference,
                            d = Math.floor,
                            h = "left" === a && d(c.right) > d(u.left) || "right" === a && d(c.left) < d(u.right) || "top" === a && d(c.bottom) > d(u.top) || "bottom" === a && d(c.top) < d(u.bottom),
                            p = d(c.left) < d(i.left),
                            f = d(c.right) > d(i.right),
                            m = d(c.top) < d(i.top),
                            g = d(c.bottom) > d(i.bottom),
                            v = "left" === a && p || "right" === a && f || "top" === a && m || "bottom" === a && g,
                            b = -1 !== ["top", "bottom"].indexOf(a),
                            y = !!t.flipVariations && (b && "start" === o && p || b && "end" === o && f || !b && "start" === o && m || !b && "end" === o && g),
                            w = !!t.flipVariationsByContent && (b && "start" === o && f || b && "end" === o && p || !b && "start" === o && g || !b && "end" === o && m),
                            k = y || w;
                        (h || v || k) && (e.flipped = !0, (h || v) && (a = s[r + 1]), k && (o = de(o)), e.placement = a + (o ? "-" + o : ""), e.offsets.popper = I({}, e.offsets.popper, U(e.instance.popper, e.offsets.reference, e.placement)), e = z(e.instance.modifiers, e, "flip"))
                    })), e
                }

                function ve(e) {
                    var t = e.offsets,
                        i = t.popper,
                        a = t.reference,
                        n = e.placement.split("-")[0],
                        o = Math.floor,
                        s = -1 !== ["top", "bottom"].indexOf(n),
                        l = s ? "right" : "bottom",
                        r = s ? "left" : "top",
                        c = s ? "width" : "height";
                    return i[l] < o(a[r]) && (e.offsets.popper[r] = o(a[r]) - i[c]), i[r] > o(a[l]) && (e.offsets.popper[r] = o(a[l])), e
                }

                function be(e, t, i, a) {
                    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
                        o = +n[1],
                        s = n[2];
                    if (!o) return e;
                    if (0 === s.indexOf("%")) {
                        var l = void 0;
                        switch (s) {
                            case "%p":
                                l = i;
                                break;
                            case "%":
                            case "%r":
                            default:
                                l = a
                        }
                        var r = T(l);
                        return r[t] / 100 * o
                    }
                    if ("vh" === s || "vw" === s) {
                        var c = void 0;
                        return c = "vh" === s ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0) : Math.max(document.documentElement.clientWidth, window.innerWidth || 0), c / 100 * o
                    }
                    return o
                }

                function ye(e, t, i, a) {
                    var n = [0, 0],
                        o = -1 !== ["right", "left"].indexOf(a),
                        s = e.split(/(\+|\-)/).map((function(e) {
                            return e.trim()
                        })),
                        l = s.indexOf($(s, (function(e) {
                            return -1 !== e.search(/,|\s/)
                        })));
                    s[l] && -1 === s[l].indexOf(",") && console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
                    var r = /\s*,\s*|\s+/,
                        c = -1 !== l ? [s.slice(0, l).concat([s[l].split(r)[0]]), [s[l].split(r)[1]].concat(s.slice(l + 1))] : [s];
                    return c = c.map((function(e, a) {
                        var n = (1 === a ? !o : o) ? "height" : "width",
                            s = !1;
                        return e.reduce((function(e, t) {
                            return "" === e[e.length - 1] && -1 !== ["+", "-"].indexOf(t) ? (e[e.length - 1] = t, s = !0, e) : s ? (e[e.length - 1] += t, s = !1, e) : e.concat(t)
                        }), []).map((function(e) {
                            return be(e, n, t, i)
                        }))
                    })), c.forEach((function(e, t) {
                        e.forEach((function(i, a) {
                            te(i) && (n[t] += i * ("-" === e[a - 1] ? -1 : 1))
                        }))
                    })), n
                }

                function we(e, t) {
                    var i = t.offset,
                        a = e.placement,
                        n = e.offsets,
                        o = n.popper,
                        s = n.reference,
                        l = a.split("-")[0],
                        r = void 0;
                    return r = te(+i) ? [+i, 0] : ye(i, o, s, l), "left" === l ? (o.top += r[0], o.left -= r[1]) : "right" === l ? (o.top += r[0], o.left += r[1]) : "top" === l ? (o.left += r[0], o.top -= r[1]) : "bottom" === l && (o.left += r[0], o.top += r[1]), e.popper = o, e
                }

                function ke(e, t) {
                    var i = t.boundariesElement || g(e.instance.popper);
                    e.instance.reference === i && (i = g(i));
                    var a = G("transform"),
                        n = e.instance.popper.style,
                        o = n.top,
                        s = n.left,
                        l = n[a];
                    n.top = "", n.left = "", n[a] = "";
                    var r = B(e.instance.popper, e.instance.reference, t.padding, i, e.positionFixed);
                    n.top = o, n.left = s, n[a] = l, t.boundaries = r;
                    var c = t.priority,
                        u = e.offsets.popper,
                        d = {
                            primary: function(e) {
                                var i = u[e];
                                return u[e] < r[e] && !t.escapeWithReference && (i = Math.max(u[e], r[e])), O({}, e, i)
                            },
                            secondary: function(e) {
                                var i = "right" === e ? "left" : "top",
                                    a = u[i];
                                return u[e] > r[e] && !t.escapeWithReference && (a = Math.min(u[i], r[e] - ("right" === e ? u.width : u.height))), O({}, i, a)
                            }
                        };
                    return c.forEach((function(e) {
                        var t = -1 !== ["left", "top"].indexOf(e) ? "primary" : "secondary";
                        u = I({}, u, d[t](e))
                    })), e.offsets.popper = u, e
                }

                function Ce(e) {
                    var t = e.placement,
                        i = t.split("-")[0],
                        a = t.split("-")[1];
                    if (a) {
                        var n = e.offsets,
                            o = n.reference,
                            s = n.popper,
                            l = -1 !== ["bottom", "top"].indexOf(i),
                            r = l ? "left" : "top",
                            c = l ? "width" : "height",
                            u = {
                                start: O({}, r, o[r]),
                                end: O({}, r, o[r] + o[c] - s[c])
                            };
                        e.offsets.popper = I({}, s, u[a])
                    }
                    return e
                }

                function xe(e) {
                    if (!ce(e.instance.modifiers, "hide", "preventOverflow")) return e;
                    var t = e.offsets.reference,
                        i = $(e.instance.modifiers, (function(e) {
                            return "preventOverflow" === e.name
                        })).boundaries;
                    if (t.bottom < i.top || t.left > i.right || t.top > i.bottom || t.right < i.left) {
                        if (!0 === e.hide) return e;
                        e.hide = !0, e.attributes["x-out-of-boundaries"] = ""
                    } else {
                        if (!1 === e.hide) return e;
                        e.hide = !1, e.attributes["x-out-of-boundaries"] = !1
                    }
                    return e
                }

                function Pe(e) {
                    var t = e.placement,
                        i = t.split("-")[0],
                        a = e.offsets,
                        n = a.popper,
                        o = a.reference,
                        s = -1 !== ["left", "right"].indexOf(i),
                        l = -1 === ["top", "left"].indexOf(i);
                    return n[s ? "left" : "top"] = o[i] - (l ? n[s ? "width" : "height"] : 0), e.placement = A(t), e.offsets.popper = T(n), e
                }
                var Se = {
                        shift: {
                            order: 100,
                            enabled: !0,
                            fn: Ce
                        },
                        offset: {
                            order: 200,
                            enabled: !0,
                            fn: we,
                            offset: 0
                        },
                        preventOverflow: {
                            order: 300,
                            enabled: !0,
                            fn: ke,
                            priority: ["left", "right", "top", "bottom"],
                            padding: 5,
                            boundariesElement: "scrollParent"
                        },
                        keepTogether: {
                            order: 400,
                            enabled: !0,
                            fn: ve
                        },
                        arrow: {
                            order: 500,
                            enabled: !0,
                            fn: ue,
                            element: "[x-arrow]"
                        },
                        flip: {
                            order: 600,
                            enabled: !0,
                            fn: ge,
                            behavior: "flip",
                            padding: 5,
                            boundariesElement: "viewport",
                            flipVariations: !1,
                            flipVariationsByContent: !1
                        },
                        inner: {
                            order: 700,
                            enabled: !1,
                            fn: Pe
                        },
                        hide: {
                            order: 800,
                            enabled: !0,
                            fn: xe
                        },
                        computeStyle: {
                            order: 850,
                            enabled: !0,
                            fn: re,
                            gpuAcceleration: !0,
                            x: "bottom",
                            y: "right"
                        },
                        applyStyle: {
                            order: 900,
                            enabled: !0,
                            fn: ne,
                            onLoad: oe,
                            gpuAcceleration: void 0
                        }
                    },
                    _e = {
                        placement: "bottom",
                        positionFixed: !1,
                        eventsEnabled: !0,
                        removeOnDestroy: !1,
                        onCreate: function() {},
                        onUpdate: function() {},
                        modifiers: Se
                    },
                    Oe = function() {
                        function e(t, i) {
                            var a = this,
                                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                            S(this, e), this.scheduleUpdate = function() {
                                return requestAnimationFrame(a.update)
                            }, this.update = l(this.update.bind(this)), this.options = I({}, e.Defaults, n), this.state = {
                                isDestroyed: !1,
                                isCreated: !1,
                                scrollParents: []
                            }, this.reference = t && t.jquery ? t[0] : t, this.popper = i && i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(I({}, e.Defaults.modifiers, n.modifiers)).forEach((function(t) {
                                a.options.modifiers[t] = I({}, e.Defaults.modifiers[t] || {}, n.modifiers ? n.modifiers[t] : {})
                            })), this.modifiers = Object.keys(this.options.modifiers).map((function(e) {
                                return I({
                                    name: e
                                }, a.options.modifiers[e])
                            })).sort((function(e, t) {
                                return e.order - t.order
                            })), this.modifiers.forEach((function(e) {
                                e.enabled && r(e.onLoad) && e.onLoad(a.reference, a.popper, a.options, e, a.state)
                            })), this.update();
                            var o = this.options.eventsEnabled;
                            o && this.enableEventListeners(), this.state.eventsEnabled = o
                        }
                        return _(e, [{
                            key: "update",
                            value: function() {
                                return W.call(this)
                            }
                        }, {
                            key: "destroy",
                            value: function() {
                                return K.call(this)
                            }
                        }, {
                            key: "enableEventListeners",
                            value: function() {
                                return Z.call(this)
                            }
                        }, {
                            key: "disableEventListeners",
                            value: function() {
                                return ee.call(this)
                            }
                        }]), e
                    }();
                Oe.Utils = ("undefined" !== typeof window ? window : e).PopperUtils, Oe.placements = he, Oe.Defaults = _e, t["a"] = Oe
            }).call(this, i("c8ba"))
        },
        f5d4: function(e, t, i) {
            "use strict";
            i("5de5")
        },
        f844: function(e, t, i) {
            "use strict";
            i("d136")
        },
        fac4: function(e, t, i) {},
        fba5: function(e, t, i) {
            var a = i("cb5a");

            function n(e) {
                return a(this.__data__, e) > -1
            }
            e.exports = n
        }
    }
]);
//# sourceMappingURL=chunk-43f57a8f.372369b9.js.map