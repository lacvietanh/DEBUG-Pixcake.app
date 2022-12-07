(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-4d3498e2"], {
        "52b8": function(e, t, i) {
            "use strict";
            i("caad");
            var a = i("2b0e"),
                n = i("e751"),
                c = i("620a");
            const o = null;

            function r(e, t) {
                return Object.freeze({
                    event_id: e,
                    data: t
                })
            }

            function l(e, t) {
                const i = c["a"].getInstance();
                i.event(e, t)
            }
            t["a"] = Object(a["defineComponent"])({
                data() {
                    return {}
                },
                computed: {
                    routeName() {
                        return this.$route.name || ""
                    },
                    _pointRouteName() {
                        const e = new Map([
                            ["index", n["m"].Workbench],
                            ["batchRetouch", n["m"].BatchRetouch],
                            ["photoFinishing", n["m"].PhotoFinishing],
                            ["exportList", n["m"].Export],
                            ["importImage", n["m"].EmptyPage],
                            ["", ""]
                        ]);
                        return e.get(this.routeName) || ""
                    },
                    _distFigureEvent() {
                        return [n["m"].PhotoFinishing, n["m"].BatchRetouch].includes(this._pointRouteName) ? this._pointRouteName === n["m"].PhotoFinishing ? n["d"].CakeRefine : n["d"].CakeGallery : ""
                    },
                    PointAddSecond() {
                        return !!this._distFigureEvent && r(this._distFigureEvent, {
                            cake_operate: n["l"].AddSecond
                        })
                    },
                    PointClickOriginal: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ClickOriginal
                    }),
                    PointClickFit: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ClickFit
                    }),
                    PointSwitchGender: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].SwitchGender
                    }),
                    PointAddPresetButton: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].AddPresetButton
                    }),
                    PointAddApplyButton: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].AddApplyButton
                    }),
                    PointImageAdjustment: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ImageAdjustment
                    }),
                    PointPortraitBeautification: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].PortraitBeautification
                    }),
                    PointBackgroundAdjustment: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].BackgroundAdjustment
                    }),
                    PointModifyGender: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ModifyGender
                    }),
                    PointFeedbackChoose: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].FeedbackChooseCategory
                    }),
                    PointFeedbackInputContent: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].FeedbackInputContent
                    }),
                    PointClickSetting: () => r(n["d"].CakeSetting, {
                        cake_operate: n["n"].ClickSetting
                    }),
                    PointClickSettingReturn: () => r(n["d"].CakeSetting, {
                        cake_operate: n["n"].ClickReturn
                    }),
                    PointExportSelectPath: () => r(n["d"].CakeExport, {
                        cake_operate: n["f"].SelectPath
                    }),
                    PointClickBackstage: () => r(n["d"].CakeAvatar, {
                        cake_operate: n["c"].ClickBackstage
                    }),
                    PointClickSmear: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ClickSmear
                    }),
                    PointClickPreservation: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ClickSmearPreservation
                    }),
                    PointClickSmearCancel: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ClickSmearCancel
                    }),
                    PointClickSmearReset: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ClickSmearReset
                    }),
                    PointClickSmearHistoryBack: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].ClickSmearHistoryBack,
                        cake_position: n["l"].ClickHistory
                    }),
                    PointDoubleClickDot: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].DoubleClickDot
                    }),
                    PointDoubleClickTitle: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].DoubleClickTitle
                    }),
                    PointPresetReset: () => r(n["d"].CakeRefine, {
                        cake_operate: n["l"].PresetReset
                    })
                },
                mounted() {},
                methods: {
                    PointAddStar(e) {
                        if (e.isFavourite) {
                            const e = "photoFinishing" === this.routeName ? n["d"].CakeRefine : n["d"].CakeGallery;
                            l(e, {
                                cake_operate: n["l"].AddStar
                            })
                        }
                    },
                    PointCheckOriginalPhoto() {
                        this._distFigureEvent && l(this._distFigureEvent, {
                            cake_operate: n["l"].CheckOriginalPhoto
                        })
                    },
                    PointDeleteThumbnail() {
                        this._distFigureEvent && l(this._distFigureEvent, {
                            cake_operate: n["l"].Delete
                        })
                    },
                    PointDeleteAllThumbnail() {
                        this._distFigureEvent && l(this._distFigureEvent, {
                            cake_operate: n["l"].DeleteAll
                        })
                    },
                    PointFeedbackClick() {
                        this._distFigureEvent && l(this._distFigureEvent, {
                            cake_operate: n["l"].Feedback
                        })
                    },
                    PointFeedbackConfirm(e) {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].FeedbackConfirm,
                            cake_feedback: JSON.stringify(e)
                        })
                    },
                    PointFeedbackCancel() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].FeedbackCancel
                        })
                    },
                    PointSavePresetSubmit1() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].SavePresetSubmit1
                        })
                    },
                    PointSavePresetSubmit2(e) {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].SavePresetSubmit2,
                            cake_new_preset2: e
                        })
                    },
                    PointSavePresetCover(e) {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].SavePresetCover,
                            cake_override_preset: e
                        })
                    },
                    PointSelectOne() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].SelectOne
                        })
                    },
                    PointSelectFilter(e) {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].SelectFilter,
                            cake_feature: e && e.name || ""
                        })
                    },
                    PointClickSettingClose() {
                        l(n["d"].CakeSetting, {
                            cake_operate: n["n"].ClickClose
                        })
                    },
                    PointClickSettingConfirm(e) {
                        l(n["d"].CakeSetting, {
                            cake_operate: n["n"].ClickConfirm,
                            cake_value: JSON.stringify(e)
                        })
                    },
                    PointExportAdvancedSetting(e) {
                        e && e.length > 0 && l(n["d"].CakeExport, {
                            cake_operate: n["f"].AdvancedSettings
                        })
                    },
                    PointExportCancel() {
                        l(n["d"].CakeExport, {
                            cake_operate: n["f"].Cancel
                        })
                    },
                    PointShowOriginThumb() {
                        l(n["d"].CakeSetting, {
                            cake_operate: n["f"].OriginThumb
                        })
                    },
                    PointShowEffectThumb() {
                        l(n["d"].CakeSetting, {
                            cake_operate: n["f"].EffectThumb
                        })
                    },
                    PointExportConfirm(e, t) {
                        l(n["d"].CakeExport, {
                            cake_operate: n["f"].Confirm,
                            cake_setting_value: JSON.stringify(e),
                            cake_name: t
                        })
                    },
                    PointExportClick(e, t) {
                        const i = this._pointRouteName,
                            a = `${t.totalNumber}_xgt${t.totalNumber-t.isNoePresetNumber}_yt${t.isNoePresetNumber}`;
                        l(n["d"].CakeExport, {
                            cake_operate: n["f"].ExportButton,
                            cake_setting_value: `${e}_${i}`,
                            cake_position: i,
                            cake_feature: a
                        })
                    },
                    PointMemberPriceClick(e) {
                        l(n["d"].CakeH5MemberPrice, {
                            cake_operate: "init_source",
                            source: e || this._pointRouteName
                        })
                    },
                    PointMemberCloseClick() {
                        l(n["d"].CakeH5MemberPrice, {
                            cake_operate: "close"
                        })
                    },
                    PointDragPanel() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].DragPanel
                        })
                    },
                    PointSwipeSelect() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].SwipeSelect
                        })
                    },
                    PointParameterAdjustmentReset() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].ParameterAdjustmentReset
                        })
                    },
                    PointManualModifyComplete() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["i"].clickEffectValue
                        })
                    },
                    PointInviteActivityClick(e) {
                        l("activity_entrance_click", {
                            ...e
                        })
                    },
                    PointInviteActivityExposure(e) {
                        l("Invitation_exposure", {
                            ...e
                        })
                    },
                    PointCakeImport(e) {
                        l(n["d"].CakeImport, {
                            cake_value: e
                        })
                    },
                    PointExportSelectPreset() {
                        l(n["d"].CakeExport, {
                            cake_operate: n["f"].SelectPreset
                        })
                    },
                    PointExportListDeleteBtn() {
                        l(n["d"].CakeExportList, {
                            cake_operate: n["e"].DeleteBtn
                        })
                    },
                    PointExportListRetryBtn() {
                        l(n["d"].CakeExportList, {
                            cake_operate: n["e"].RetryBtn
                        })
                    },
                    PointExportListPauseBtn() {
                        l(n["d"].CakeExportList, {
                            cake_operate: n["e"].PauseBtn
                        })
                    },
                    PointExportListStartBtn() {
                        l(n["d"].CakeExportList, {
                            cake_operate: n["e"].StartBtn
                        })
                    },
                    PointExportListPauseAllBtn() {
                        l(n["d"].CakeExportList, {
                            cake_operate: n["e"].PauseAllBtn
                        })
                    },
                    PointExportListStartAllBtn() {
                        l(n["d"].CakeExportList, {
                            cake_operate: n["e"].StartAllBtn
                        })
                    },
                    PointInitGuide(e) {
                        let t = null;
                        switch (e) {
                            case 1:
                                t = n["g"].InitWorkbenchGuide;
                                break;
                            case 2:
                                t = n["g"].InitPresetGuide;
                                break;
                            case 3:
                                t = n["g"].InitSlideGuide;
                                break;
                            case 4:
                                t = n["g"].InitSelectGuide;
                                break;
                            case 5:
                                t = n["g"].InitSynchronizeGuide;
                                break;
                            case 6:
                                t = n["g"].InitExportGuide;
                                break;
                            default:
                                t = n["g"].InitWorkbenchGuide;
                                break
                        }
                        l(n["d"].CakeNewuserGuide, {
                            cake_operate: t
                        })
                    },
                    PointClickQuit(e) {
                        l(n["d"].CakeNewuserGuide, {
                            cake_operate: `${n["g"].ClickQuit}_${e}`
                        })
                    },
                    PointFillInfo() {
                        l(n["d"].CakeFillinfo, {})
                    },
                    PointClientClose() {
                        o.on("gtag_page_close", (e, t) => {
                            const i = c["a"].getInstance();
                            if ("close" === t) i.pageview({
                                path: "/quit",
                                name: "Quit",
                                title: "退出程序"
                            });
                            else if ("return" === t) {
                                const e = this.$route;
                                i.pageview({
                                    path: e.path,
                                    name: e.name,
                                    title: e.meta.title
                                })
                            }
                        })
                    },
                    PointClickSmearTool(e, t) {
                        const i = {
                                brush: "smear_paint_brush",
                                eraser: "smear_eraser"
                            },
                            a = {
                                size: "smear_size",
                                feather: "smear_emergence",
                                opacity: "smear_opacity"
                            },
                            c = i[e],
                            o = a[t];
                        c && o && l(n["d"].CakeRefine, {
                            cake_operate: n["l"].ClickSmearTool,
                            cake_position: c,
                            cake_feature: o
                        })
                    },
                    PointClickSmearClose() {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].ClickSmearClose
                        })
                    },
                    PointZoomCompare(e) {
                        l(n["d"].CakeRefine, {
                            cake_operate: "zoom_compare",
                            cake_position: e
                        })
                    },
                    PointSelectIdPhotoSize(e) {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].SelectIdPhotoSize,
                            cake_feature: e && e.label || ""
                        })
                    },
                    PointModifyPhotoDPI(e) {
                        l(n["d"].CakeRefine, {
                            cake_operate: n["l"].ModifyDPI,
                            cake_value: `dpi_${e.typeDPI}_${e.type}`
                        })
                    }
                }
            })
        },
        "620a": function(e, t, i) {
            "use strict";
            i.d(t, "a", (function() {
                return o
            }));
            i("25c2"), i("8ec2");
            var a = i("f771");
            let n = null;
            class c extends a["a"] {
                constructor() {
                    super()
                }
                static getInstance() {
                    return n = n || new c, n
                }
                register(e) {
                    super.register(e)
                }
                formatData(e) {
                    return {}
                }
                send(e = {}) {
                    var t;
                    return null === (t = this.ipcHandler) || void 0 === t ? void 0 : t.send(e)
                }
                login(e, t) {
                    var i;
                    return null === (i = this.ipcHandler) || void 0 === i ? void 0 : i.login(e, t)
                }
                logout() {
                    var e;
                    return null === (e = this.ipcHandler) || void 0 === e ? void 0 : e.logout()
                }
                event(e, t = {}, i = {}) {
                    var a;
                    return null === (a = this.ipcHandler) || void 0 === a ? void 0 : a.event(e, t, i)
                }
                pageview(e, t = {}) {
                    var i;
                    return null === (i = this.ipcHandler) || void 0 === i ? void 0 : i.pageview(e, t)
                }
            }
            class o {
                constructor() {
                    this.gtag = null, this.instance = null, this.gtag = c.getInstance()
                }
                static getInstance() {
                    return this.instance = this.instance ? this.instance : new o, this.instance
                }
                register(e) {
                    this.gtag.register(e)
                }
                event(e, t = {}) {
                    console.log("lxl event=", e, t), this.gtag.event(e, {
                        ...t
                    })
                }
                pageview(e = {}) {
                    if (this.gtag) {
                        const t = e.path;
                        delete e.path, this.gtag.pageview(t, {
                            ...e
                        })
                    }
                }
                login(e, t) {
                    this.gtag.login(e, t)
                }
                logout() {
                    this.gtag && this.gtag.logout()
                }
            }
        },
        e751: function(e, t, i) {
            "use strict";
            i.d(t, "d", (function() {
                return a
            })), i.d(t, "c", (function() {
                return n
            })), i.d(t, "m", (function() {
                return c
            })), i.d(t, "g", (function() {
                return o
            })), i.d(t, "l", (function() {
                return r
            })), i.d(t, "n", (function() {
                return l
            })), i.d(t, "h", (function() {
                return s
            })), i.d(t, "i", (function() {
                return _
            })), i.d(t, "f", (function() {
                return d
            })), i.d(t, "j", (function() {
                return k
            })), i.d(t, "e", (function() {
                return u
            })), i.d(t, "k", (function() {
                return y
            })), i.d(t, "b", (function() {
                return m
            })), i.d(t, "a", (function() {
                return C
            }));
            var a, n, c, o, r, l, s, _, d, k, u, h = i("2666");
            (function(e) {
                e["CakeNavMenu"] = "cake_nav_menu", e["CakeImport"] = "cake_import", e["CakeGallery"] = "cake_gallery", e["CakeRefine"] = "cake_refine", e["CakeSetting"] = "cake_setting", e["CakeHelp"] = "cake_help", e["CakeExport"] = "cake_export", e["CakeH5MemberPrice"] = "cakeh5_member_price", e["AppStart"] = "app_start", e["Login"] = "login", e["Logout"] = "logout", e["CakeSession"] = "cake_session", e["CakeExportList"] = "cake_export_list", e["CakeNewuserGuide"] = "cake_newuser_guide", e["CakeFillinfo"] = "cake_fillinfo", e["CakeAvatar"] = "cake_avatar", e["CakeWorkBench"] = "cake_workbench", e["CakeUpgradeGuide"] = "upgrade_guide", e["CakeImageAdjustment"] = "cake_image_adjustment"
            })(a || (a = {})),
            function(e) {
                e["ClickBackstage"] = "click_backstage"
            }(n || (n = {})),
            function(e) {
                e["PhotoFinishing"] = "refine", e["BatchRetouch"] = "gallery", e["Workbench"] = "workbench", e["Login"] = "login", e["Export"] = "export_list", e["EmptyPage"] = "empty_page"
            }(c || (c = {})),
            function(e) {
                e["InitWorkbenchGuide"] = "init_workbench_guide", e["InitPresetGuide"] = "init_preset_guide", e["InitSlideGuide"] = "init_slide_guide", e["InitSelectGuide"] = "init_select_guide", e["InitSynchronizeGuide"] = "init_synchronize_guide", e["InitExportGuide"] = "init_export_guide", e["ClickQuit"] = "click_quit", e["InitImgAdjustmentGuide"] = "image_adjustment_guide", e["InitBackgroundGuide"] = "background_adjustment_guide", e["InitHistoryGuide"] = "history_record_guide", e["InitCropGuide"] = "crop_guide", e["InitPresetSettingGuide"] = "preset_setting_guide"
            }(o || (o = {})),
            function(e) {
                e["CheckOriginalPhoto"] = "original_photo", e["AddSecond"] = "add_second", e["ClickOriginal"] = "click_original", e["ClickFit"] = "click_fit", e["SelectOne"] = "select_one", e["Delete"] = "delete", e["DeleteAll"] = "delete_all_select", e["SwipeSelect"] = "swipe_select", e["AddStar"] = "add_star", e["AddPresetSort"] = "add_preset_sort", e["DragPanel"] = "drag_panel", e["ImageAdjustment"] = "image_adjustment_icon", e["PortraitBeautification"] = "portrait_beauty_icon", e["OperationHistory"] = "history_record_icon", e["BackgroundAdjustment"] = "background_adjustment_icon", e["CropIcon"] = "crop_icon", e["ModifyGender"] = "modify_gender", e["AddPresetButton"] = "add_preset_button", e["AddPresetIcon"] = "add_preset_icon", e["AddApplyButton"] = "add_apply_button", e["SwitchGender"] = "switch_gender", e["SelectFilter"] = "select_filter", e["Feedback"] = "feedback", e["FeedbackChooseCategory"] = "feedback_choose_category", e["FeedbackInputContent"] = "feedback_input_content", e["FeedbackCancel"] = "feedback_cancel", e["FeedbackConfirm"] = "feedback_confirm", e["SavePresetSubmit1"] = "new_preset", e["SavePresetSubmit2"] = "new_preset2", e["SavePresetCover"] = "override_preset", e["ClickSmear"] = "click_smear", e["ClickSmearPreservation"] = "click_smear_preservation", e["ClickSmearCancel"] = "click_smear_cancel", e["ClickSmearClose"] = "click_smear_close", e["ClickSmearBack"] = "click_smear_back", e["ClickSmearReset"] = "click_smear_reset", e["ClickSmearHistoryBack"] = "click_smear_history_back", e["ClickHistory"] = "smear_history", e["ClickSmearTool"] = "click_smear_tool", e["DoubleClickDot"] = "double_click_dot", e["DoubleClickTitle"] = "double_click_title", e["PresetReset"] = "preset_reset", e["ParameterAdjustmentReset"] = "parameter_adjustment_reset", e["SelectIdPhotoBackground"] = "select_idphoto_background", e["SelectIdPhotoSize"] = "select_idphoto_size", e["SelectChangeSky"] = "select_change_sky", e["ModifyDPI"] = "modify_dpi", e["InitPreview"] = "init_preview_all", e["ClickPreview"] = "click_preview_all", e["ExitPreview"] = "exit_preview_all", e["FullEffectMode"] = "full_effect_mode", e["ColorMode"] = "color_mode", e["LiquefactionSize"] = "liquefaction_size", e["LiquefactionDensity"] = "liquefaction_density", e["LiquefactionPressure"] = "liquefaction_pressure", e["ClickLiquefactionFixedEdge"] = "click_liquefaction_fixed_edge"
            }(r || (r = {})),
            function(e) {
                e["ClickSetting"] = "click_setting", e["ClickClose"] = "click_close", e["ClickReturn"] = "click_return", e["ClickConfirm"] = "click_confirm"
            }(l || (l = {})),
            function(e) {
                e["HelpIcon"] = "help_icon", e["CustomerService"] = "customer_service", e["TutorialGraphic"] = "tutorial_graphic", e["TutorialVideo"] = "tutorial_video", e["HelpQuestion"] = "help_question", e["HotKey"] = "hot_key"
            }(s || (s = {})),
            function(e) {
                e["clickEffectValue"] = "click_effect_value"
            }(_ || (_ = {})),
            function(e) {
                e["ExportButton"] = "export_button", e["SelectPath"] = "select_path", e["SelectPreset"] = "select_preset", e["AdvancedSettings"] = "advanced_settings", e["Cancel"] = "cancel", e["Confirm"] = "confirm", e["OriginThumb"] = "thumbnail_close_effect", e["EffectThumb"] = "thumbnail_open_effect"
            }(d || (d = {})),
            function(e) {
                e["SlideBeautyRod"] = "slide_beauty_rod", e["SlideFaceliftRod"] = "slide_facelift_rod", e["SlideBodyRod"] = "slide_body_rod", e["SlideEnhanceRod"] = "slide_enhance_rod", e["SlideColorRod"] = "slide_color_rod", e["Facelift"] = "facelift", e["MakeupSuit"] = "slide_makeup_rod", e["SliderBackground"] = "slide_background_rod", e["SlideRemoveDefects"] = "slide_remove_defects", e["SlideSkyAdjustmentRod"] = "slide_sky_adjustment_rod", e["SlideSkySceneryAdjustmentRod"] = "slide_sky_scenery_adjustment_rod", e["SlideSkyWaterAdjustmentRod"] = "slide_sky_water_adjustment_rod", e["SlideLiquefyRod"] = "slide_liquefy_rod"
            }(k || (k = {})),
            function(e) {
                e["ExportedTab"] = "exported_tab", e["ExportingTab"] = "exporting_tab", e["BillingRulesPopup"] = "billing_rules_popup", e["DeleteBtn"] = "click_delete_button", e["RetryBtn"] = "click_retry_button", e["PauseBtn"] = "click_pause_button", e["StartBtn"] = "click_start_button", e["PauseAllBtn"] = "pause_all", e["StartAllBtn"] = "start_all", e["ClickExportDetail"] = "click_export_detail"
            }(u || (u = {}));
            const p = {
                    [h["c"].EnhanceEditHSLHue]: "hue",
                    [h["c"].EnhanceEditHSLLightness]: "brightness",
                    [h["c"].EnhanceEditHSLSaturation]: "saturation"
                },
                f = {
                    [h["d"].Red]: "red",
                    [h["d"].Orange]: "orange",
                    [h["d"].Yellow]: "yellow",
                    [h["d"].Green]: "green",
                    [h["d"].Cyan]: "lightgreen",
                    [h["d"].Blue]: "blue",
                    [h["d"].Purple]: "purple",
                    [h["d"].Magenta]: "magenta"
                },
                g = {};
            for (const S in p)
                for (const e in f) g[`${S}_${e}`] = `${p[S]}_${f[e]}`;
            const y = {
                    slide_remove_defects: {
                        [h["c"].Spotless]: "acne",
                        [h["c"].RemoveNevus]: "mole",
                        [h["c"].SpotlessBody]: "removal_body",
                        [h["c"].RemoveForeheadLines]: "forehead_lines",
                        [h["c"].RemoveEyeLines]: "eye_wrinkles",
                        [h["c"].LightenPouch]: "darkcircles",
                        [h["c"].TearTrough]: "wrinkle",
                        [h["c"].RemoveNeckLines]: "neck_pattern",
                        [h["c"].RemoveDoubleChin]: "face_doublechin"
                    },
                    slide_beauty_rod: {
                        [h["c"].NeutralGrayRetouch]: "dbsmooth",
                        [h["c"].MoisturizingSkin]: "smooth_face",
                        [h["c"].MoisturizingSkinNoFace]: "smooth_body",
                        [h["c"].FacialStereo3DLight]: "highlight_contour",
                        [h["c"].FacialStereo3DShadow]: "shadow_contour",
                        [h["c"].SkinColorLighten]: "skin_bright",
                        [h["c"].SkinColorWhiten]: "skin_whiten",
                        [h["c"].SkinColorRuddy]: "skin_rosy",
                        [h["c"].SkinColorUniform]: "skin_unite",
                        [h["c"].StretchMark]: "stretch_marks",
                        [h["c"].StretchMarkLine]: "pregnancy_line",
                        [h["c"].TeethWhiten]: "whiten",
                        [h["c"].ToothRepairing]: "teeth_fixer",
                        [h["c"].BrightEye]: "bright",
                        [h["c"].MakeupEnhanceEye]: "eye_enhance",
                        [h["c"].MakeupEnhanceMouth]: "lip_enhance"
                    },
                    slide_facelift_rod: {
                        [h["c"].HeadNarrow]: "face_size",
                        [h["c"].FaceLift]: "face_cheeks",
                        [h["c"].FacialRefineSmallFace]: "face_small",
                        [h["c"].FacialRefineTemple]: "face_temple",
                        [h["c"].FacialRefineCheekBone]: "face_cheekbones",
                        [h["c"].FaceWidth]: "face_width",
                        [h["c"].FacialRefineJaw]: "face_jaw",
                        [h["c"].FacialRefineChin]: "face_chin",
                        [h["c"].FacialRefineHairLine]: "face_forehead",
                        [h["c"].FacialRefineEyeZoom]: "eyes_size",
                        [h["c"].FacialRefineEyeHigher]: "eyes_height",
                        [h["c"].FacialRefineEyeWidth]: "eyes_width",
                        [h["c"].FacialRefineEyeDistance]: "eyes_distance",
                        [h["c"].FacialRefineEyeAngle]: "eyes_tilt",
                        [h["c"].FacialRefineEyeUpDownAdjust]: "eyes_position",
                        [h["c"].FacialRefineNose]: "nose_size",
                        [h["c"].FacialRefineNoseHigher]: "nose_lift",
                        [h["c"].FacialRefineNoseBridge]: "nose_bright",
                        [h["c"].FacialRefineNoseAlar]: "nose_wing",
                        [h["c"].FacialRefineNoseTip]: "nose_tip",
                        [h["c"].FacialRefineMouthSize]: "lips_size",
                        [h["c"].FacialRefineMouthWidth]: "lips_width",
                        [h["c"].FacialRefineMouthHigher]: "lips_height",
                        [h["c"].FacialRefineMouthUpperLip]: "lips_upper",
                        [h["c"].FacialRefineMouthLowperLip]: "lips_lower",
                        [h["c"].FacialRefineEyeBrowThickness]: "eyebrows_thick",
                        [h["c"].FacialRefineEyeBrowDistance]: "eyebrows_distance",
                        [h["c"].FacialRefineEyeBrowAngle]: "eyebrows_tilt",
                        [h["c"].FacialRefineEyeBrowShape]: "eyebrows_shape",
                        [h["c"].FacialRefineEyeBrowHigher]: "eyebrows_position",
                        [h["c"].LeftFaceLift]: "face_cheeks_left",
                        [h["c"].RightFaceLift]: "face_cheeks_right",
                        [h["c"].LeftTemple]: "face_temple_left",
                        [h["c"].RightTemple]: "face_temple_right",
                        [h["c"].RightTemple]: "face_temple_right",
                        [h["c"].LeftCheekBone]: "face_cheekbones_left",
                        [h["c"].RightCheekBone]: "face_cheekbones_right",
                        [h["c"].LeftJaw]: "face_jaw_left",
                        [h["c"].RightJaw]: "face_jaw_right",
                        [h["c"].LeftEyeZoom]: "eyes_size_left",
                        [h["c"].RightEyeZoom]: "eyes_size_right",
                        [h["c"].LeftEyeHigher]: "eyes_height_left",
                        [h["c"].RightEyeHigher]: "eyes_height_right",
                        [h["c"].LeftEyeWidth]: "eyes_width_left",
                        [h["c"].RightEyeWidth]: "eyes_width_right",
                        [h["c"].LeftEyeDistance]: "eyes_distance_left",
                        [h["c"].RightEyeDistance]: "eyes_distance_right",
                        [h["c"].LeftEyeAngle]: "eyes_tilt_left",
                        [h["c"].RightEyeAngle]: "eyes_tilt_right",
                        [h["c"].LeftEyeUpDownAdjust]: "eyes_position_left",
                        [h["c"].RightEyeUpDownAdjust]: "eyes_position_right",
                        [h["c"].LeftEyeBrowThickness]: "eyebrows_thick_left",
                        [h["c"].RightEyeBrowThickness]: "eyebrows_thick_right",
                        [h["c"].LeftEyeBrowDistance]: "eyebrows_distance_left",
                        [h["c"].RightEyeBrowDistance]: "eyebrows_distance_right",
                        [h["c"].LeftEyeBrowAngle]: "eyebrows_tilt_left",
                        [h["c"].RightEyeBrowAngle]: "eyebrows_tilt_right",
                        [h["c"].LeftEyeBrowShape]: "eyebrows_shape_left",
                        [h["c"].RightEyeBrowShape]: "eyebrows_shape_right",
                        [h["c"].LeftEyeBrowHigher]: "eyebrows_position_left",
                        [h["c"].RightEyeBrowHigher]: "eyebrows_position_right",
                        [h["c"].SymmetryReshapeSwitch]: "symmetry_facelift",
                        [h["c"].SymmetryReshapeBody]: "symmetry_upper_body",
                        [h["c"].SymmetryReshapeFace]: "symmetry_facial_features"
                    },
                    slide_body_rod: {
                        [h["c"].AIBodyReshape]: "body_ai",
                        [h["c"].PoseRefineSlimHand]: "arm",
                        [h["c"].PoseRefineSlimWaist]: "waist",
                        [h["c"].PoseRefineSlimLeg]: "leg",
                        [h["c"].PoseRefineEnhanceBreast]: "breast",
                        [h["c"].PoseRefineNiceButtock]: "buttocks",
                        [h["c"].PoseRefineSlim]: "Slim",
                        [h["c"].PoseRefineShrinkHead]: "head",
                        [h["c"].PoseRefineLengthen]: "stretch",
                        [h["c"].PoseRefineHeighten]: "heighten",
                        [h["c"].PoseRefineSlimLeftNeck]: "thin_neck_left",
                        [h["c"].PoseRefineSlimRightNeck]: "thin_neck_right",
                        [h["c"].PoseRefineSlimNeck]: "thin_neck"
                    },
                    slide_color_rod: {
                        [h["c"].FilterAlpha]: "filter",
                        [h["c"].EnhanceEditColorTemperature]: "temp",
                        [h["c"].EnhanceEditHue]: "tone",
                        [h["c"].EnhanceEditExposure]: "exposure",
                        [h["c"].EnhanceEditContrast]: "contrast",
                        [h["c"].EnhanceEditHighlight]: "highlight",
                        [h["c"].EnhanceEditShadow]: "shadow",
                        [h["c"].EnhanceEditWhite]: "white",
                        [h["c"].EnhanceEditBlack]: "black",
                        [h["c"].EnhanceEditCameraRawSharpen]: "clarity",
                        [h["c"].EnhanceEditCameraRawVibrance]: "vividness",
                        [h["c"].EnhanceEditSaturation]: "saturation",
                        [h["c"].EnhanceEditCRDBStrength]: "sharpen",
                        [h["c"].EnhanceEditCRDBRadius]: "radius",
                        [h["c"].EnhanceEditCRDBDetail]: "detail",
                        ...g
                    },
                    slide_makeup_rod: {
                        [h["c"].SuitMakeup]: "theme",
                        [h["c"].EyebrowMakeup]: "eyebrows",
                        [h["c"].EyeMakeup]: "eyes",
                        [h["c"].EyelashMakeup]: "eyelashes",
                        [h["c"].BlusherMakeup]: "blush",
                        [h["c"].LipMakeup]: "lipstick"
                    },
                    slide_background_rod: {
                        [h["c"].BgCleanSwitch]: {
                            0: "close_background_blemishes",
                            1: "open_background_blemishes"
                        },
                        [h["c"].BgCleanMode]: {
                            0: "none_pure_background",
                            1: "pure_background"
                        },
                        [h["c"].BgCleanMooreSwitch]: {
                            0: "close_background_banding",
                            1: "open_background_banding"
                        },
                        [h["c"].BgCleanMooreMode]: {
                            0: "banding_none_pure_background",
                            1: "banding_pure_background"
                        },
                        [h["c"].BackgroundEnhance]: "background_enhance",
                        [h["c"].BgReplaceGamma]: "idphoto_edge_detail",
                        [h["c"].BgReplaceBeta]: "idphoto_edge_burr"
                    },
                    slide_sky_adjustment_rod: {
                        [h["c"].SkyChoose]: "sky_choose",
                        [h["c"].SkyEdgeTransition]: "sky_edge_transition",
                        [h["c"].SkyTemp]: "sky_temp",
                        [h["c"].SkySaturation]: "sky_saturation",
                        [h["c"].SkyBrightness]: "sky_brightness",
                        [h["c"].SkyVague]: "sky_vague",
                        [h["c"].SkyFlip]: "sky_flip"
                    },
                    slide_sky_scenery_adjustment_rod: {
                        [h["c"].SkySceneryColor]: "sky_scenery_color",
                        [h["c"].SkyCharacterColor]: "sky_character_color"
                    },
                    slide_sky_water_adjustment_rod: {
                        [h["c"].SkyWaterReflex]: "sky_water_reflex",
                        [h["c"].SkyWaterVague]: "sky_water_vague"
                    }
                },
                m = {
                    [h["c"].SuitMakeup]: "click_theme_tab",
                    [h["c"].EyebrowMakeup]: "click_eyebrows_tab",
                    [h["c"].EyeMakeup]: "click_eyes_tab",
                    [h["c"].EyelashMakeup]: "click_eyelashes_tab",
                    [h["c"].BlusherMakeup]: "click_blush_tab",
                    [h["c"].LipMakeup]: "click_lipstick_tab"
                },
                C = {
                    [h["c"].SuitMakeup]: "click_theme",
                    [h["c"].EyebrowMakeup]: "click_eyebrows",
                    [h["c"].EyeMakeup]: "click_eyes",
                    [h["c"].EyelashMakeup]: "click_eyelashes",
                    [h["c"].BlusherMakeup]: "click_blush",
                    [h["c"].LipMakeup]: "click_lipstick"
                }
        },
        f771: function(e, t, i) {
            "use strict";
            i.d(t, "a", (function() {
                return n
            })), i.d(t, "b", (function() {
                return c
            }));
            class a {
                constructor(e) {
                    this.eventList = new Map, this.eventId = e
                }
                _callback(e) {
                    this.eventList.forEach(t => {
                        t(e)
                    })
                }
                distributeCallBack(e) {
                    this._callback(e)
                }
                set(e, t) {
                    this.eventList.set(e, t)
                }
                has(e) {
                    this.eventList.has(e)
                }
                clear() {
                    this.eventList.clear()
                }
                delete(e, t = !1) {
                    let i = null;
                    t ? i = e : this.eventList.forEach((t, a) => {
                        t === e && (i = a)
                    }), i && (this.eventList.has(i) && this.eventList.delete(i), this.eventList.size)
                }
            }
            class n {
                constructor() {
                    this.ipcHandler = null
                }
                register(e) {
                    this.ipcHandler = e
                }
            }
            class c extends n {
                constructor() {
                    super(...arguments), this.notifyEventPool = new Map
                }
                applyMessageReceived(e, t) {
                    if (this.notifyEventPool.has(e)) {
                        const i = this.notifyEventPool.get(e);
                        null === i || void 0 === i || i.distributeCallBack(t)
                    }
                }
                addListener(e, t) {
                    const i = Symbol();
                    if (!this.notifyEventPool.has(e)) {
                        const t = new a(e);
                        this.notifyEventPool.set(e, t)
                    }
                    const n = this.notifyEventPool.get(e);
                    return null === n || void 0 === n || n.set(i, t), i
                }
                removeListener(e, t, i = !1) {
                    if (this.notifyEventPool.has(e)) {
                        const a = this.notifyEventPool.get(e);
                        null === a || void 0 === a || a.delete(t, i)
                    }
                }
                clearListener(e) {
                    var t;
                    this.notifyEventPool.has(e) && (null === (t = this.notifyEventPool.get(e)) || void 0 === t || t.clear())
                }
                clearAll() {
                    this.notifyEventPool.forEach(e => {
                        e.clear()
                    }), this.notifyEventPool.clear()
                }
            }
        }
    }
]);
//# sourceMappingURL=chunk-4d3498e2.90f5f5a9.js.map