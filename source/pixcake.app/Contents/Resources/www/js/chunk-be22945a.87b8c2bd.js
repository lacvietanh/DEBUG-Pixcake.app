(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-be22945a"], {
        "1a73": function(e, t, i) {},
        "1b7e": function(e, t, i) {
            "use strict";
            var s = function() {
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
                    }, [t("span", [e._v("同步设置")])]), t("div", {
                        staticClass: "container"
                    }, [t("div", {
                        staticClass: "formLine"
                    }, [t("span", {
                        staticStyle: {
                            "align-self": "flex-start"
                        }
                    }, [e._v("筛选：")]), t(i.PresetSetting, {
                        attrs: {
                            "checkbox-object": i.presetCheckboxCache,
                            "custom-checkbox-settings": i.customSettings
                        },
                        on: {
                            "update:checkboxObject": function(e) {
                                i.presetCheckboxCache = e
                            },
                            "update:checkbox-object": function(e) {
                                i.presetCheckboxCache = e
                            },
                            "on-change": i.onPresetSettingChange,
                            "on-select-input": function(e) {
                                i.selectType = e
                            }
                        }
                    })], 1)]), t("div", {
                        staticClass: "footer"
                    }, [t(i.ElButton, {
                        attrs: {
                            size: "mini",
                            type: "primary",
                            loading: i.loading
                        },
                        on: {
                            click: i.onSubmit
                        }
                    }, [e._v(" " + e._s(i.needSyncPreset ? "Đồng bộ hóa để chọn những hình ảnh" : "Xác nhận") + " ")])], 1), t("div", {
                        staticClass: "tip_container"
                    }, [t("span", {
                        staticClass: "tip"
                    }, [e._v("使用" + e._s(i.IS_WIN ? "Ctrl+C/Ctrl+V" : "CMD+C/CMD+V") + "也可以复制/粘贴效果")])])])
                },
                n = [],
                a = i("2b0e"),
                o = i("0613"),
                l = i("25c2"),
                r = i("5c96"),
                c = i("ef4d"),
                u = i("f5de"),
                h = i("4aec"),
                d = i("f518"),
                p = i("f8d6"),
                m = i("9128"),
                f = i("997e"),
                b = Object(a["defineComponent"])({
                    __name: "SyncPresetSettings",
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        },
                        refineUUID: {
                            type: String,
                            default: ""
                        },
                        justSave: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    emits: ["input", "on-apply"],
                    setup(e, {
                        expose: t,
                        emit: i
                    }) {
                        const s = e;
                        let n = Object(a["ref"])(s.value);
                        Object(a["watch"])(() => s.value, async e => {
                            n.value = e, e && await g()
                        }), Object(a["watch"])(n, e => i("input", e));
                        const b = Object(a["ref"])(),
                            g = async () => {
                                if (!s.refineUUID) return;
                                const {
                                    beautifyJsonStr: e,
                                    paletteJsonStr: t
                                } = await m["c"].getPresetSuitJson(s.refineUUID);
                                try {
                                    const i = JSON.parse(e),
                                        s = JSON.parse(t),
                                        n = new h["a"](i, null, -1),
                                        a = new d["a"]({
                                            json: s,
                                            userId: -1
                                        }),
                                        o = n.getHasEffectConfig(),
                                        l = a.getHasEffectConfig();
                                    o.params = [...o.params, ...l.params], o.effects = [...o.effects, ...l.effects], b.value = Object(p["b"])(o)
                                } catch (i) {}
                            }, v = Object(a["computed"])({
                                get: () => o["a"].getters["refine/syncPresetSettingCache"],
                                set: e => o["a"].commit("refine/_SetSyncPresetSettingCache", e)
                            }), k = Object(a["computed"])({
                                get: () => o["a"].getters["refine/syncPresetCheckboxCache"],
                                set: e => o["a"].commit("refine/_SetSyncPresetCheckboxCache", e)
                            }), y = Object(a["computed"])(() => o["a"].getters["refine/isSaveSyncSetting"]), C = e => v.value = e, S = Object(a["computed"])(() => !s.justSave && !y.value);
                        let _ = Object(a["ref"])(!1);
                        const x = Object(a["ref"])(0),
                            {
                                PointSynchronizeSettings: w
                            } = Object(f["a"])(),
                            P = async () => {
                                n.value && !_.value && (_.value = !0, S.value && (o["a"].commit("refine/_SetIsSaveSyncSetting"), i("on-apply")), w(x.value), n.value = !1, _.value = !1)
                            };
                        return t({
                            show: () => {
                                n.value = !0, g()
                            }
                        }), {
                            __sfc: !0,
                            props: s,
                            $emit: i,
                            visible: n,
                            customSettings: b,
                            initCustomCheckboxSettings: g,
                            presetSettingCache: v,
                            presetCheckboxCache: k,
                            isSaveSyncSetting: y,
                            onPresetSettingChange: C,
                            needSyncPreset: S,
                            loading: _,
                            selectType: x,
                            PointSynchronizeSettings: w,
                            onSubmit: P,
                            IS_WIN: l["x"],
                            ElButton: r["Button"],
                            PresetSetting: c["a"],
                            TsDialog: u["a"]
                        }
                    }
                }),
                g = b,
                v = (i("e2f1"), i("2877")),
                k = Object(v["a"])(g, s, n, !1, null, "8cddff06", null);
            t["a"] = k.exports
        },
        "1d5d": function(e, t, i) {
            "use strict";
            i("1a73")
        },
        "396d": function(e, t, i) {
            "use strict";
            var s = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "ts-select-box"
                    }, [e._t("default"), t("span", {
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
                    })])], 2)
                },
                n = [],
                a = (i("46c8"), i("2877")),
                o = {},
                l = Object(a["a"])(o, s, n, !1, null, "a2952e3c", null);
            t["a"] = l.exports
        },
        "46c8": function(e, t, i) {
            "use strict";
            i("72a2")
        },
        6153: function(e, t, i) {},
        "72a2": function(e, t, i) {},
        "997e": function(e, t, i) {
            "use strict";
            i.d(t, "a", (function() {
                return o
            }));
            var s = i("adeb"),
                n = i("e751"),
                a = i("3d23");

            function o() {
                const {
                    sendPoint: e
                } = Object(s["a"])();

                function t() {
                    e(n["d"].CakeRefine, {
                        cake_operate: "file_not_exist_close"
                    })
                }

                function i() {
                    e(n["d"].CakeRefine, {
                        cake_operate: "file_not_exist_copy"
                    })
                }

                function o() {
                    let t = "history_any_step";
                    e(n["d"].CakeRefine, {
                        cake_operate: t
                    })
                }

                function l() {
                    let t = "history_reset";
                    e(n["d"].CakeRefine, {
                        cake_operate: t
                    })
                }

                function r() {
                    let t = "history_reset_scroll";
                    e(n["d"].CakeRefine, {
                        cake_operate: t
                    })
                }

                function c() {
                    e(n["d"].CakeUpgradeGuide, {
                        cake_position: n["g"].InitImgAdjustmentGuide
                    })
                }

                function u() {
                    e(n["d"].CakeUpgradeGuide, {
                        cake_position: n["g"].InitBackgroundGuide
                    })
                }

                function h() {
                    e(n["d"].CakeUpgradeGuide, {
                        cake_position: n["g"].InitHistoryGuide
                    })
                }

                function d() {
                    e(n["d"].CakeUpgradeGuide, {
                        cake_position: n["g"].InitCropGuide
                    })
                }

                function p() {
                    e(n["d"].CakeUpgradeGuide, {
                        cake_position: n["g"].InitPresetSettingGuide
                    })
                }

                function m() {
                    e(n["d"].CakeImageAdjustment, {
                        cake_position: n["l"].ClickPreview
                    })
                }

                function f() {
                    e(n["d"].CakeImageAdjustment, {
                        cake_position: n["l"].ExitPreview
                    })
                }

                function b() {
                    e(n["d"].CakeImageAdjustment, {
                        cake_position: n["l"].InitPreview
                    })
                }

                function g() {
                    e(n["d"].CakeImageAdjustment, {
                        cake_position: n["l"].ColorMode
                    })
                }

                function v() {
                    e(n["d"].CakeImageAdjustment, {
                        cake_position: n["l"].FullEffectMode
                    })
                }
                const k = {
                    [a["c"].Default]: "preset_default",
                    [a["c"].Spec]: "preset_adjusted",
                    [a["c"].All]: "preset_all",
                    [a["c"].Custom]: "preset_customize",
                    [a["c"].Cancel]: "preset_none"
                };

                function y(t) {
                    k[t] && e(n["d"].CakeRefine, {
                        cake_position: n["l"].SavePresetSubmit1,
                        cake_feature: k[t]
                    })
                }

                function C(t, i) {
                    k[i] && e(n["d"].CakeRefine, {
                        cake_position: n["l"].SavePresetSubmit2,
                        cake_feature: k[i],
                        cake_new_preset2: t
                    })
                }

                function S(t, i) {
                    k[i] && e(n["d"].CakeRefine, {
                        cake_position: n["l"].SavePresetCover,
                        cake_feature: k[i],
                        cake_override_preset: t
                    })
                }
                const _ = {
                    [a["c"].Default]: "synchronize_default",
                    [a["c"].Spec]: "synchronize_adjusted",
                    [a["c"].All]: "synchronize_all",
                    [a["c"].Custom]: "synchronize_customize",
                    [a["c"].Cancel]: "synchronize_none"
                };

                function x(t) {
                    _[t] && e(n["d"].CakeRefine, {
                        cake_operate: "synchronize_settings",
                        cake_feature: _[t]
                    })
                }

                function w() {
                    e(n["d"].CakeRefine, {
                        cake_operate: "add_a_face"
                    })
                }

                function P(t) {
                    e(n["d"].CakeRefine, {
                        cake_operate: "add_a_face_finish",
                        cake_feature: t
                    })
                }

                function j() {
                    e(n["d"].CakeRefine, {
                        cake_operate: "click_liquefaction"
                    })
                }

                function O() {
                    e(n["d"].CakeRefine, {
                        cake_operate: "liquefaction_cancel"
                    })
                }

                function V() {
                    e(n["d"].CakeRefine, {
                        cake_operate: "liquefaction_confirm"
                    })
                }
                return {
                    PointPortraitBeautification: () => e(n["d"].CakeRefine, {
                        cake_operate: n["l"].PortraitBeautification
                    }),
                    PointImageAdjustment: () => e(n["d"].CakeRefine, {
                        cake_operate: n["l"].ImageAdjustment
                    }),
                    PointBackgroundAdjustment: () => e(n["d"].CakeRefine, {
                        cake_operate: n["l"].BackgroundAdjustment
                    }),
                    PointOperationHistory: () => e(n["d"].CakeRefine, {
                        cake_operate: n["l"].OperationHistory
                    }),
                    PointCropIcon: () => e(n["d"].CakeRefine, {
                        cake_operate: n["l"].CropIcon
                    }),
                    PointFileNotExit: t,
                    PointFileCopyPath: i,
                    PointHistoryStep: o,
                    PointHistoryReset: l,
                    PointHistoryScroll: r,
                    PointGuideImgAdjust: c,
                    PointGuideBackground: u,
                    PointGuideHistory: h,
                    PointGuideCrop: d,
                    PointGuidePresetSettings: p,
                    PointPreviewClick: m,
                    PointPreviewExit: f,
                    PointPreviewInit: b,
                    PointPreviewColorMode: g,
                    PointPreviewFullMode: v,
                    PointSavePresetSubmit1: y,
                    PointSavePresetSubmit2: C,
                    PointSavePresetCover: S,
                    PointSynchronizeSettings: x,
                    PointAddAFace: w,
                    PointAddAFaceFinish: P,
                    PointClickLiquefaction: j,
                    PointLiquefactionCancel: O,
                    PointLiquefactionConfirm: V
                }
            }
        },
        "9bf3": function(e, t, i) {},
        a1a9: function(e, t, i) {
            "use strict";
            i("9bf3")
        },
        a34d: function(e, t, i) {
            "use strict";
            var s = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "el-slider ts-slider",
                        class: {
                            "is-vertical": e.vertical,
                            "el-slider--with-input": e.showInput
                        },
                        attrs: {
                            role: "slider",
                            "aria-valuemin": e.min,
                            "aria-valuemax": e.max,
                            "aria-disabled": e.sliderDisabled,
                            "aria-orientation": e.vertical ? "vertical" : "horizontal"
                        }
                    }, [e.showInput && !e.range ? t("el-input-number", {
                        ref: "input",
                        staticClass: "el-slider__input",
                        attrs: {
                            min: e.min,
                            max: e.max,
                            step: e.step,
                            size: e.inputSize,
                            debounce: e.debounce,
                            disabled: e.sliderDisabled,
                            controls: e.showInputControls
                        },
                        on: {
                            change: e.emitChange
                        },
                        model: {
                            value: e.firstValue,
                            callback: function(t) {
                                e.firstValue = t
                            },
                            expression: "firstValue"
                        }
                    }) : e._e(), t("div", {
                        ref: "slider",
                        staticClass: "el-slider__runway",
                        class: {
                            "show-input": e.showInput,
                            disabled: e.sliderDisabled
                        },
                        style: e.runwayStyle,
                        on: {
                            click: e.onSliderClick
                        }
                    }, [t("div", {
                        staticClass: "el-slider__bar",
                        style: e.barStyle
                    }), t("slider-button", {
                        ref: "button1",
                        attrs: {
                            vertical: e.vertical,
                            "tooltip-class": e.tooltipClass,
                            buttonStyle: e.cStyle && e.cStyle.button
                        },
                        on: {
                            mousedown: function(t) {
                                return e.$emit("mousedown", t)
                            },
                            mouseup: function(t) {
                                return e.$emit("mouseup", t)
                            },
                            mousemove: function(t) {
                                return e.$emit("mousemove", t)
                            }
                        },
                        nativeOn: {
                            dblclick: function(t) {
                                return e.emitDblClick.apply(null, arguments)
                            }
                        },
                        model: {
                            value: e.firstValue,
                            callback: function(t) {
                                e.firstValue = t
                            },
                            expression: "firstValue"
                        }
                    }), e.range ? t("slider-button", {
                        ref: "button2",
                        attrs: {
                            vertical: e.vertical,
                            "tooltip-class": e.tooltipClass,
                            buttonStyle: e.cStyle && e.cStyle.button
                        },
                        on: {
                            mousedown: function(t) {
                                return e.$emit("mousedown", t)
                            },
                            mouseup: function(t) {
                                return e.$emit("mouseup", t)
                            },
                            mousemove: function(t) {
                                return e.$emit("mousemove", t)
                            }
                        },
                        nativeOn: {
                            dblclick: function(t) {
                                return e.emitDblClick.apply(null, arguments)
                            }
                        },
                        model: {
                            value: e.secondValue,
                            callback: function(t) {
                                e.secondValue = t
                            },
                            expression: "secondValue"
                        }
                    }) : e._e(), e.showStops ? e._l(e.stops, (function(i, s) {
                        return t("div", {
                            key: s,
                            staticClass: "el-slider__stop",
                            style: e.getStopStyle(i)
                        })
                    })) : e._e(), e.markList.length > 0 ? [t("div", e._l(e.markList, (function(i, s) {
                        return t("div", {
                            key: s,
                            staticClass: "el-slider__stop el-slider__marks-stop ts-slider__marks-stop",
                            style: e.getStopStyle(i.position)
                        })
                    })), 0), t("div", {
                        staticClass: "el-slider__marks ts-slider__marks"
                    }, e._l(e.markList, (function(i, s) {
                        return t("slider-marker", {
                            key: s,
                            style: e.getStopStyle(i.position),
                            attrs: {
                                mark: i.mark
                            }
                        })
                    })), 1)] : e._e()], 2)], 1)
                },
                n = [];

            function a(e, t, i) {
                this.$children.forEach(s => {
                    var n = s.$options.componentName;
                    n === e ? s.$emit.apply(s, [t].concat(i)) : a.apply(s, [e, t].concat([i]))
                })
            }
            var o = {
                    methods: {
                        dispatch(e, t, i) {
                            var s = this.$parent || this.$root,
                                n = s.$options.componentName;
                            while (s && (!n || n !== e)) s = s.$parent, s && (n = s.$options.componentName);
                            s && s.$emit.apply(s, [t].concat(i))
                        },
                        broadcast(e, t, i) {
                            a.call(this, e, t, i)
                        }
                    }
                },
                l = i("5c96"),
                r = {
                    name: "ElMarker",
                    props: {
                        mark: {
                            type: [String, Object]
                        }
                    },
                    render() {
                        const e = arguments[0];
                        let t = "string" === typeof this.mark ? this.mark : this.mark.label;
                        return e("div", {
                            class: "el-slider__marks-text",
                            style: this.mark.style || {}
                        }, [t])
                    }
                },
                c = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        ref: "button",
                        staticClass: "el-slider__button-wrapper",
                        class: {
                            hover: e.hovering,
                            dragging: e.dragging
                        },
                        style: e.wrapperStyle,
                        attrs: {
                            tabindex: "0"
                        },
                        on: {
                            focus: e.handleMouseEnter,
                            blur: e.handleMouseLeave,
                            mousedown: e.onButtonDown,
                            mouseenter: e.handleMouseEnter,
                            mouseleave: e.handleMouseLeave,
                            touchstart: e.onButtonDown,
                            keydown: [function(t) {
                                return !t.type.indexOf("key") && e._k(t.keyCode, "left", 37, t.key, ["Left", "ArrowLeft"]) || "button" in t && 0 !== t.button ? null : e.onLeftKeyDown.apply(null, arguments)
                            }, function(t) {
                                return !t.type.indexOf("key") && e._k(t.keyCode, "right", 39, t.key, ["Right", "ArrowRight"]) || "button" in t && 2 !== t.button ? null : e.onRightKeyDown.apply(null, arguments)
                            }, function(t) {
                                return !t.type.indexOf("key") && e._k(t.keyCode, "up", 38, t.key, ["Up", "ArrowUp"]) ? null : (t.preventDefault(), e.onRightKeyDown.apply(null, arguments))
                            }, function(t) {
                                return !t.type.indexOf("key") && e._k(t.keyCode, "down", 40, t.key, ["Down", "ArrowDown"]) ? null : (t.preventDefault(), e.onLeftKeyDown.apply(null, arguments))
                            }]
                        }
                    }, [t("el-tooltip", {
                        ref: "tooltip",
                        attrs: {
                            placement: "top",
                            disabled: !e.showTooltip,
                            "popper-class": e.tooltipClass
                        }
                    }, [t("span", {
                        attrs: {
                            slot: "content"
                        },
                        slot: "content"
                    }, [e._v(e._s(e.formatValue))]), t("div", {
                        staticClass: "el-slider__button",
                        class: {
                            hover: e.hovering,
                            dragging: e.dragging
                        },
                        style: e.buttonStyle
                    })])], 1)
                },
                u = [],
                h = {
                    name: "ElSliderButton",
                    components: {
                        "el-tooltip": l["Tooltip"]
                    },
                    props: {
                        value: {
                            type: Number,
                            default: 0
                        },
                        vertical: {
                            type: Boolean,
                            default: !1
                        },
                        tooltipClass: String,
                        buttonStyle: Object
                    },
                    data() {
                        return {
                            hovering: !1,
                            dragging: !1,
                            isClick: !1,
                            startX: 0,
                            currentX: 0,
                            startY: 0,
                            currentY: 0,
                            startPosition: 0,
                            newPosition: null,
                            oldValue: this.value,
                            triggerEventObje: null
                        }
                    },
                    computed: {
                        disabled() {
                            return this.$parent.sliderDisabled
                        },
                        max() {
                            return this.$parent.max
                        },
                        min() {
                            return this.$parent.min
                        },
                        step() {
                            return this.$parent.step
                        },
                        showTooltip() {
                            return this.$parent.showTooltip
                        },
                        precision() {
                            return this.$parent.precision
                        },
                        currentPosition() {
                            return (this.value - this.min) / (this.max - this.min) * 100 + "%"
                        },
                        enableFormat() {
                            return this.$parent.formatTooltip instanceof Function
                        },
                        formatValue() {
                            return this.enableFormat && this.$parent.formatTooltip(this.value) || this.value
                        },
                        wrapperStyle() {
                            return this.vertical ? {
                                bottom: this.currentPosition
                            } : {
                                left: this.currentPosition
                            }
                        }
                    },
                    watch: {
                        dragging(e) {
                            this.$parent.dragging = e
                        }
                    },
                    methods: {
                        displayTooltip() {
                            this.$refs.tooltip && (this.$refs.tooltip.showPopper = !0)
                        },
                        hideTooltip() {
                            this.$refs.tooltip && (this.$refs.tooltip.showPopper = !1)
                        },
                        handleMouseEnter() {
                            this.hovering = !0, this.displayTooltip()
                        },
                        handleMouseLeave() {
                            this.hovering = !1, this.hideTooltip()
                        },
                        onButtonDown(e) {
                            this.disabled || (this.$emit("mousedown", e), this.onDragStart(e), window.addEventListener("mousemove", this.onDragging), window.addEventListener("touchmove", this.onDragging), window.addEventListener("mouseup", this.onDragEnd), window.addEventListener("touchend", this.onDragEnd), window.addEventListener("contextmenu", this.onDragEnd))
                        },
                        onLeftKeyDown() {
                            this.disabled || (this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100, this.setPosition(this.newPosition), this.$parent.emitChange())
                        },
                        onRightKeyDown() {
                            this.disabled || (this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100, this.setPosition(this.newPosition), this.$parent.emitChange())
                        },
                        onDragStart(e) {
                            this.dragging = !0, this.isClick = !0, this.triggerEventObje = e, "touchstart" === e.type && (e.clientY = e.touches[0].clientY, e.clientX = e.touches[0].clientX), this.vertical ? this.startY = e.clientY : this.startX = e.clientX, this.startPosition = parseFloat(this.currentPosition), this.newPosition = this.startPosition
                        },
                        onDragging(e) {
                            if (this.dragging) {
                                this.isClick = !1, this.displayTooltip(), this.$parent.resetSize();
                                let t = 0;
                                "touchmove" === e.type && (e.clientY = e.touches[0].clientY, e.clientX = e.touches[0].clientX), this.vertical ? (this.currentY = e.clientY, t = (this.startY - this.currentY) / this.$parent.sliderSize * 100) : (this.currentX = e.clientX, t = (this.currentX - this.startX) / this.$parent.sliderSize * 100), this.newPosition = this.startPosition + t, this.setPosition(this.newPosition), this.$emit("mousemove", e)
                            }
                        },
                        onDragEnd(e) {
                            this.dragging && (setTimeout(() => {
                                this.dragging = !1, this.hideTooltip(), this.manualBlur(this.triggerEventObje), this.isClick || (this.setPosition(this.newPosition), this.$parent.emitChange()), this.$emit("mouseup", e)
                            }, 0), window.removeEventListener("mousemove", this.onDragging), window.removeEventListener("touchmove", this.onDragging), window.removeEventListener("mouseup", this.onDragEnd), window.removeEventListener("touchend", this.onDragEnd), window.removeEventListener("contextmenu", this.onDragEnd))
                        },
                        manualBlur(e) {
                            const t = e.target;
                            t && t.blur()
                        },
                        setPosition(e) {
                            if (null === e || isNaN(e)) return;
                            e < 0 ? e = 0 : e > 100 && (e = 100);
                            const t = 100 / ((this.max - this.min) / this.step),
                                i = Math.round(e / t);
                            let s = i * t * (this.max - this.min) * .01 + this.min;
                            s = parseFloat(s.toFixed(this.precision)), this.$emit("input", s), this.$nextTick(() => {
                                this.displayTooltip(), this.$refs.tooltip && this.$refs.tooltip.updatePopper()
                            }), this.dragging || this.value === this.oldValue || (this.oldValue = this.value)
                        }
                    }
                },
                d = h,
                p = i("2877"),
                m = Object(p["a"])(d, c, u, !1, null, null, null),
                f = m.exports,
                b = {
                    name: "TsSlider",
                    mixins: [o],
                    inject: {
                        elForm: {
                            default: ""
                        }
                    },
                    props: {
                        min: {
                            type: Number,
                            default: 0
                        },
                        max: {
                            type: Number,
                            default: 100
                        },
                        step: {
                            type: Number,
                            default: 1
                        },
                        value: {
                            type: [Number, Array],
                            default: 0
                        },
                        showInput: {
                            type: Boolean,
                            default: !1
                        },
                        showInputControls: {
                            type: Boolean,
                            default: !0
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
                            default: !0
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
                        cStyle: Object
                    },
                    components: {
                        "el-input-number": l["InputNumber"],
                        SliderButton: f,
                        SliderMarker: r
                    },
                    data() {
                        return {
                            sliderSize: 1,
                            firstValue: null,
                            secondValue: null,
                            oldValue: null,
                            dragging: !1
                        }
                    },
                    watch: {
                        value(e, t) {
                            this.dragging || Array.isArray(e) && Array.isArray(t) && e.every((e, i) => e === t[i]) || this.setValues()
                        },
                        dragging(e) {
                            e || this.setValues()
                        },
                        firstValue(e) {
                            this.range ? this.$emit("input", [this.minValue, this.maxValue]) : this.$emit("input", e)
                        },
                        secondValue() {
                            this.range && this.$emit("input", [this.minValue, this.maxValue])
                        },
                        min() {
                            this.setValues()
                        },
                        max() {
                            this.setValues()
                        }
                    },
                    methods: {
                        valueChanged() {
                            return this.range ? ![this.minValue, this.maxValue].every((e, t) => e === this.oldValue[t]) : this.value !== this.oldValue
                        },
                        setValues() {
                            if (this.min > this.max) return void console.error("[Element Error][Slider]min should not be greater than max.");
                            const e = this.value;
                            this.range && Array.isArray(e) ? e[1] < this.min ? this.$emit("input", [this.min, this.min]) : e[0] > this.max ? this.$emit("input", [this.max, this.max]) : e[0] < this.min ? this.$emit("input", [this.min, e[1]]) : e[1] > this.max ? this.$emit("input", [e[0], this.max]) : (this.firstValue = e[0], this.secondValue = e[1], this.valueChanged() && (this.dispatch("ElFormItem", "el.form.change", [this.minValue, this.maxValue]), this.oldValue = e.slice())) : this.range || "number" !== typeof e || isNaN(e) || (e < this.min ? this.$emit("input", this.min) : e > this.max ? this.$emit("input", this.max) : (this.firstValue = e, this.valueChanged() && (this.dispatch("ElFormItem", "el.form.change", e), this.oldValue = e)))
                        },
                        setPosition(e) {
                            const t = this.min + e * (this.max - this.min) / 100;
                            if (!this.range) return void this.$refs.button1.setPosition(e);
                            let i;
                            i = Math.abs(this.minValue - t) < Math.abs(this.maxValue - t) ? this.firstValue < this.secondValue ? "button1" : "button2" : this.firstValue > this.secondValue ? "button1" : "button2", this.$refs[i].setPosition(e)
                        },
                        onSliderClick(e) {
                            if (!this.sliderDisabled && !this.dragging) {
                                if (this.resetSize(), this.vertical) {
                                    const t = this.$refs.slider.getBoundingClientRect().bottom;
                                    this.setPosition((t - e.clientY) / this.sliderSize * 100)
                                } else {
                                    const t = this.$refs.slider.getBoundingClientRect().left;
                                    this.setPosition((e.clientX - t) / this.sliderSize * 100)
                                }
                                this.emitChange()
                            }
                        },
                        resetSize() {
                            this.$refs.slider && (this.sliderSize = this.$refs.slider["client" + (this.vertical ? "Height" : "Width")])
                        },
                        emitChange() {
                            this.$nextTick(() => {
                                this.$emit("change", this.range ? [this.minValue, this.maxValue] : this.value)
                            })
                        },
                        emitDblClick() {
                            this.$nextTick(() => {
                                this.$emit("ondblclick")
                            })
                        },
                        getStopStyle(e) {
                            return this.vertical ? {
                                bottom: e + "%"
                            } : {
                                left: e + "%"
                            }
                        }
                    },
                    computed: {
                        stops() {
                            if (!this.showStops || this.min > this.max) return [];
                            if (0 === this.step) return [];
                            const e = (this.max - this.min) / this.step,
                                t = 100 * this.step / (this.max - this.min),
                                i = [];
                            for (let s = 1; s < e; s++) i.push(s * t);
                            return this.range ? i.filter(e => e < 100 * (this.minValue - this.min) / (this.max - this.min) || e > 100 * (this.maxValue - this.min) / (this.max - this.min)) : i.filter(e => e > 100 * (this.firstValue - this.min) / (this.max - this.min))
                        },
                        markList() {
                            if (!this.marks) return [];
                            const e = Object.keys(this.marks);
                            return e.map(parseFloat).sort((e, t) => e - t).filter(e => e <= this.max && e >= this.min).map(e => ({
                                point: e,
                                position: 100 * (e - this.min) / (this.max - this.min),
                                mark: this.marks[e]
                            }))
                        },
                        minValue() {
                            return Math.min(this.firstValue, this.secondValue)
                        },
                        maxValue() {
                            return Math.max(this.firstValue, this.secondValue)
                        },
                        barSize() {
                            return this.min < 0 ? this.firstValue < 0 ? 100 * Math.abs(this.firstValue) / (this.max - this.min) + "%" : 100 * this.firstValue / (this.max - this.min) + "%" : this.range ? 100 * (this.maxValue - this.minValue) / (this.max - this.min) + "%" : 100 * (this.firstValue - this.min) / (this.max - this.min) + "%"
                        },
                        barStart() {
                            return this.range ? 100 * (this.minValue - this.min) / (this.max - this.min) + "%" : "0%"
                        },
                        precision() {
                            const e = [this.min, this.max, this.step].map(e => {
                                const t = ("" + e).split(".")[1];
                                return t ? t.length : 0
                            });
                            return Math.max.apply(null, e)
                        },
                        runwayStyle() {
                            const e = {
                                height: this.height
                            };
                            return this.cStyle && this.cStyle.runwayStyle && Object.assign(e, this.cStyle.runwayStyle), e
                        },
                        barStyle() {
                            if (this.vertical) return {
                                height: this.barSize,
                                bottom: this.barStart
                            }; {
                                const e = {
                                    width: this.barSize
                                };
                                return this.min < 0 ? this.firstValue < 0 ? (e.right = 100 * this.max / (this.max - this.min) + "%", this.cStyle && this.cStyle.barStyle && this.cStyle.barStyle.left && Object.assign(e, this.cStyle.barStyle.left)) : (e.left = 100 * Math.abs(this.min) / (this.max - this.min) + "%", this.cStyle && this.cStyle.barStyle && this.cStyle.barStyle.right && Object.assign(e, this.cStyle.barStyle.right)) : this.cStyle && this.cStyle.barStyle && this.cStyle.barStyle.left ? Object.assign(e, this.cStyle.barStyle.left) : e.left = this.barStart, e
                            }
                        },
                        sliderDisabled() {
                            return this.disabled || (this.elForm || {}).disabled
                        }
                    },
                    mounted() {
                        let e;
                        this.range ? (Array.isArray(this.value) ? (this.firstValue = Math.max(this.min, this.value[0]), this.secondValue = Math.min(this.max, this.value[1])) : (this.firstValue = this.min, this.secondValue = this.max), this.oldValue = [this.firstValue, this.secondValue], e = `${this.firstValue}-${this.secondValue}`) : ("number" !== typeof this.value || isNaN(this.value) ? this.firstValue = this.min : this.firstValue = Math.min(this.max, Math.max(this.min, this.value)), this.oldValue = this.firstValue, e = this.firstValue), this.$el.setAttribute("aria-valuetext", e), this.$el.setAttribute("aria-label", this.label ? this.label : `slider between ${this.min} and ${this.max}`), this.resetSize(), window.addEventListener("resize", this.resetSize)
                    },
                    beforeDestroy() {
                        window.removeEventListener("resize", this.resetSize)
                    }
                },
                g = b,
                v = (i("e8e2"), Object(p["a"])(g, s, n, !1, null, "1f7c3af9", null)),
                k = v.exports;
            k.install = function(e) {
                e.component(k.name, k)
            };
            t["a"] = k
        },
        e2f1: function(e, t, i) {
            "use strict";
            i("e449")
        },
        e449: function(e, t, i) {},
        e8e2: function(e, t, i) {
            "use strict";
            i("6153")
        },
        ef4d: function(e, t, i) {
            "use strict";
            var s = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t("div", {
                        staticClass: "preset-setting"
                    }, [t(i.TsSelectBox, {
                        staticClass: "presetSelect"
                    }, [t(i.ElSelect, {
                        staticStyle: {
                            width: "100%"
                        },
                        attrs: {
                            size: "mini",
                            placeholder: "Vui lòng chọn"
                        },
                        on: {
                            change: i.onSelectChange
                        },
                        nativeOn: {
                            keydown: function(t) {
                                if (!t.type.indexOf("key") && e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"])) return null;
                                t.stopPropagation()
                            }
                        },
                        model: {
                            value: i.selectType,
                            callback: function(e) {
                                i.selectType = e
                            },
                            expression: "selectType"
                        }
                    }, e._l(i.selectOptions, (function(e, s) {
                        return t(i.ElOption, {
                            key: s,
                            attrs: {
                                label: e.name,
                                value: e.value
                            }
                        })
                    })), 1)], 1), t("div", {
                        staticClass: "preset-group-container global__scroll-style"
                    }, [e._l(i.presetGroup, (function(s, n) {
                        return [t(i.TsCheckboxGroup, {
                            key: n,
                            ref: "checkboxRefs",
                            refInFor: !0,
                            staticClass: "ts-checkbox-group",
                            attrs: {
                                "select-all-label": s.name,
                                data: s.children
                            },
                            on: {
                                "on-change": function(e) {
                                    i.selectType = -1
                                }
                            },
                            model: {
                                value: i.checkObj[s.value],
                                callback: function(t) {
                                    e.$set(i.checkObj, s.value, t)
                                },
                                expression: "checkObj[item.value]"
                            }
                        })]
                    }))], 2)], 1)
                },
                n = [],
                a = (i("caad"), i("2b0e")),
                o = i("f8d6"),
                l = i("2ef0"),
                r = i("5c96"),
                c = function() {
                    var e = this,
                        t = e._self._c,
                        i = e._self._setupProxy;
                    return t("div", {
                        staticClass: "ts-checkbox-group"
                    }, [t("div", [t(i.ElCheckbox, {
                        attrs: {
                            indeterminate: i.isIndeterminate
                        },
                        on: {
                            change: i.handleCheckAllChange
                        },
                        model: {
                            value: i.checkAll,
                            callback: function(e) {
                                i.checkAll = e
                            },
                            expression: "checkAll"
                        }
                    }), t("el-button", {
                        staticClass: "expanded-btn",
                        staticStyle: {
                            "margin-left": "8px"
                        },
                        attrs: {
                            type: "text"
                        },
                        on: {
                            click: function(e) {
                                i.showCheckboxGroup = !i.showCheckboxGroup
                            }
                        }
                    }, [e._v(" " + e._s(e.selectAllLabel) + " "), t("i", {
                        class: i.showCheckboxGroup ? "el-icon-caret-bottom" : "el-icon-caret-right"
                    })])], 1), t(i.ElCheckboxGroup, {
                        directives: [{
                            name: "show",
                            rawName: "v-show",
                            value: i.showCheckboxGroup,
                            expression: "showCheckboxGroup"
                        }],
                        staticStyle: {
                            "margin-left": "24px"
                        },
                        on: {
                            change: i.handleCheckedCitiesChange
                        },
                        model: {
                            value: i.checkedValues,
                            callback: function(e) {
                                i.checkedValues = e
                            },
                            expression: "checkedValues"
                        }
                    }, e._l(e.data, (function(s) {
                        return t(i.ElCheckbox, {
                            key: s.value,
                            staticStyle: {
                                width: "126px"
                            },
                            attrs: {
                                label: s.value
                            }
                        }, [e._v(" " + e._s(s.name) + " ")])
                    })), 1)], 1)
                },
                u = [],
                h = Object(a["defineComponent"])({
                    __name: "TsCheckboxGroup",
                    props: {
                        data: {
                            type: Array,
                            default: () => []
                        },
                        selectAllLabel: {
                            type: String,
                            default: "全部"
                        },
                        value: {
                            type: Array,
                            default: () => []
                        }
                    },
                    emits: ["input", "on-change"],
                    setup(e, {
                        expose: t,
                        emit: i
                    }) {
                        const s = e,
                            n = Object(a["computed"])(() => s.data.map(e => e.value)),
                            o = Object(a["ref"])(!1),
                            c = Object(a["ref"])(!0),
                            u = Object(a["ref"])([]),
                            h = Object(a["ref"])(!1),
                            d = e => {
                                const t = s.data,
                                    i = e.length;
                                o.value = i === t.length, c.value = i > 0 && i < t.length
                            };
                        Object(a["watch"])(() => s.value, e => {
                            Object(l["isEqual"])(e, u.value) || (u.value = e), d(u.value)
                        }, {
                            immediate: !0
                        }), Object(a["watch"])(u, e => i("input", e));
                        const p = e => {
                                u.value = e ? n.value : [], c.value = !1
                            },
                            m = e => {
                                d(e), i("on-change", u.value)
                            };
                        return t({
                            handleCheckAll: () => {
                                o.value = !0, c.value = !1, p(!0)
                            },
                            handleCancelAll: () => {
                                o.value = !1, c.value = !1, p(!1)
                            }
                        }), {
                            __sfc: !0,
                            props: s,
                            $emit: i,
                            values: n,
                            checkAll: o,
                            isIndeterminate: c,
                            checkedValues: u,
                            showCheckboxGroup: h,
                            reloadCheckAllBtnState: d,
                            handleCheckAllChange: p,
                            handleCheckedCitiesChange: m,
                            ElCheckbox: r["Checkbox"],
                            ElCheckboxGroup: r["CheckboxGroup"]
                        }
                    }
                }),
                d = h,
                p = (i("a1a9"), i("2877")),
                m = Object(p["a"])(d, c, u, !1, null, "feb0845e", null),
                f = m.exports,
                b = i("396d"),
                g = i("3d23"),
                v = Object(a["defineComponent"])({
                    __name: "PresetSetting",
                    props: {
                        checkboxObject: {
                            type: Object,
                            default: () => {}
                        },
                        customCheckboxSettings: {
                            type: Object,
                            default: () => {}
                        }
                    },
                    emits: ["on-change", "update:checkboxObject", "on-select-change", "on-select-input"],
                    setup(e, {
                        emit: t
                    }) {
                        const i = e,
                            s = Object(a["ref"])(0),
                            n = Object(a["ref"])([]),
                            c = Object(a["ref"])({}),
                            u = Object(l["debounce"])((function(e) {
                                console.log(e, o["a"]), Object(l["isEqual"])(e, o["a"]) ? s.value = g["c"].Default : Object(l["isEqual"])(e, o["e"]) ? s.value = g["c"].All : Object(l["isEqual"])(e, o["c"]) ? s.value = g["c"].Cancel : Object(l["isEqual"])(e, i.customCheckboxSettings) ? s.value = g["c"].Spec : (s.value = g["c"].Custom, c.value = Object(l["cloneDeep"])(e))
                            }), 300),
                            h = Object(a["ref"])(Object(l["cloneDeep"])(o["c"]));
                        Object(a["watch"])(() => i.checkboxObject, e => {
                            if (e) {
                                if (0 === Object.keys(e).length) h.value = Object(l["cloneDeep"])(o["c"]);
                                else {
                                    if (Object(l["isEqual"])(e, h.value)) return;
                                    h.value = Object(l["cloneDeep"])(e)
                                }
                                u(h.value)
                            }
                        }, {
                            immediate: !0
                        }), Object(a["watch"])(() => i.customCheckboxSettings, e => {
                            Object.keys(e).length > 0 && u(h.value)
                        }), Object(a["watch"])(h, e => {
                            u(e), t("update:checkboxObject", e)
                        }, {
                            deep: !0
                        });
                        const d = Object(a["computed"])(() => {
                            const e = {
                                effects: [],
                                params: [],
                                crop: [],
                                algoVersion: []
                            };
                            for (const t in h.value) {
                                const i = o["d"].find(e => e.value === Number(t)),
                                    s = h.value[t];
                                null === i || void 0 === i || i.children.forEach(t => {
                                    t.includes && s.includes(t.value) && (e.effects.push(...t.includes.effects || []), e.params.push(...t.includes.params || []), e.crop.push(...t.includes.crop || []), e.algoVersion.push(...t.includes.algoVersion || []))
                                })
                            }
                            return e
                        });
                        Object(a["watch"])(d, e => {
                            t("on-change", e)
                        }, {
                            immediate: !0,
                            deep: !0
                        });
                        const p = Object(a["computed"])(() => {
                                const e = [{
                                    name: "默认",
                                    value: g["c"].Default
                                }, {
                                    name: "已调整",
                                    value: g["c"].Spec
                                }, {
                                    name: "全选",
                                    value: g["c"].All
                                }, {
                                    name: "全部Hủy",
                                    value: g["c"].Cancel
                                }];
                                return (s.value === g["c"].Custom || Object.keys(c.value).length > 0) && e.push({
                                    name: "自定义",
                                    value: g["c"].Custom
                                }), e
                            }),
                            m = e => {
                                Object(a["nextTick"])(() => {
                                    var t;
                                    null === (t = n.value) || void 0 === t || t.forEach(t => {
                                        e ? t.handleCheckAll() : t.handleCancelAll()
                                    })
                                })
                            },
                            v = e => {
                                switch (e) {
                                    case g["c"].Default:
                                        h.value = Object(l["cloneDeep"])(o["a"]);
                                        break;
                                    case g["c"].All:
                                        m(!0);
                                        break;
                                    case g["c"].Cancel:
                                        m(!1);
                                        break;
                                    case g["c"].Spec:
                                        Object.keys(i.customCheckboxSettings).length > 0 ? h.value = Object(l["cloneDeep"])(i.customCheckboxSettings) : m(!1);
                                        break;
                                    case g["c"].Custom:
                                        h.value = Object(l["cloneDeep"])(c.value);
                                        break
                                }
                                t("on-select-change", e)
                            };
                        return Object(a["watch"])(s, e => t("on-select-input", e)), {
                            __sfc: !0,
                            $emit: t,
                            props: i,
                            selectType: s,
                            checkboxRefs: n,
                            customCheckObj: c,
                            recheckSelectType: u,
                            checkObj: h,
                            checkParamsJson: d,
                            selectOptions: p,
                            handleSelectAll: m,
                            onSelectChange: v,
                            presetGroup: o["d"],
                            ElSelect: r["Select"],
                            ElOption: r["Option"],
                            TsCheckboxGroup: f,
                            TsSelectBox: b["a"]
                        }
                    }
                }),
                k = v,
                y = (i("1d5d"), Object(p["a"])(k, s, n, !1, null, "4cdccc21", null));
            t["a"] = y.exports
        }
    }
]);
//# sourceMappingURL=chunk-be22945a.87b8c2bd.js.map