(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-32750ab2"], {
        "2bbe": function(e, t, i) {
            "use strict";
            i("e3ca")
        },
        "5c1e": function(e, t, i) {
            "use strict";
            i.r(t);
            var c = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "page-migrate"
                    }, [e.showConfirm ? [t("div", {
                        staticClass: "page-migrate__box migrate__confirm"
                    }, [e._m(1), t("div", {
                        staticClass: "btn-container"
                    }, [t("el-button", {
                        staticClass: "btn",
                        attrs: {
                            type: "primary",
                            size: "mini"
                        },
                        on: {
                            click: e.onCancelDataMigrateClick
                        }
                    }, [e._v(" 是的，放弃旧项目 ")])], 1), t("div", {
                        staticClass: "btn-container"
                    }, [t("el-button", {
                        staticClass: "btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: function(t) {
                                e.showConfirm = !1
                            }
                        }
                    }, [e._v(" 我再想想 ")])], 1)])] : [t("div", {
                        staticClass: "page-migrate__box migrate__update"
                    }, [t("div", {
                        staticClass: "migrate__title"
                    }, [e._v(e._s(e.APP_CLIENT_NAME) + "— 全新引擎版本更快速更灵活！")]), e._m(0), t("div", {
                        staticClass: "btn-container"
                    }, [t("el-button", {
                        staticClass: "btn",
                        attrs: {
                            size: "mini",
                            type: "primary"
                        },
                        on: {
                            click: e.onDataMigrateClick
                        }
                    }, [e._v(" 开始数据升级 ")])], 1), t("div", {
                        staticClass: "btn-container"
                    }, [t("el-button", {
                        staticClass: "btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: function(t) {
                                e.showConfirm = !0
                            }
                        }
                    }, [e._v(" 不升级，直接启动新版本软件 ")])], 1)])]], 2)
                },
                a = [function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "migrate__desc"
                    }, [t("span", {
                        staticClass: "label"
                    }, [e._v("因软件升级，需要进行数据升级才能继续编辑，")]), t("span", {
                        staticClass: "label"
                    }, [e._v("升级过程中软件可正常使用。")])])
                }, function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "migrate__desc"
                    }, [t("span", {
                        staticClass: "label"
                    }, [e._v("若放弃数据升级")]), t("span", {
                        staticClass: "label"
                    }, [e._v("您原先的用户信息、项目中的图片及效果参数均会被清空")])])
                }],
                n = i("2b0e"),
                o = i("adeb");

            function r() {
                const {
                    sendPoint: e
                } = Object(o["a"])();
                return {
                    PointDataUpgrade: () => e("cake_data_upgrade"),
                    PointChooseUpgrade: () => e("cake_choose_upgrade"),
                    PointChooseQuitUpgrade: () => e("cake_choose_quit")
                }
            }
            var s = i("5c96"),
                l = i("25c2");
            const _ = () => window.$ipcRenderer;
            var d = {
                    name: "DataMigrate",
                    mixins: [],
                    components: {
                        "el-button": s["Button"]
                    },
                    setup(e) {
                        console.log("onDataMigrate show");
                        const {
                            PointDataUpgrade: t,
                            PointChooseQuitUpgrade: i,
                            PointChooseUpgrade: c
                        } = r(), a = Object(n["ref"])(!1), o = Object(n["ref"])(l["b"]), s = () => {
                            i(), _().send("data-migrate", {
                                doMigrate: !1
                            })
                        }, d = () => {
                            c(), _().send("data-migrate", {
                                doMigrate: !0
                            })
                        };
                        return Object(n["onMounted"])(t), {
                            showConfirm: a,
                            APP_CLIENT_NAME: o,
                            onDataMigrateClick: d,
                            onCancelDataMigrateClick: s
                        }
                    }
                },
                u = d,
                h = (i("2bbe"), i("2877")),
                k = Object(h["a"])(u, c, a, !1, null, "4df05afe", null);
            t["default"] = k.exports
        },
        adeb: function(e, t, i) {
            "use strict";
            i.d(t, "a", (function() {
                return o
            }));
            var c = i("2b0e"),
                a = i("620a"),
                n = i("e751");

            function o() {
                var e;
                const t = null === (e = Object(c["getCurrentInstance"])()) || void 0 === e ? void 0 : e.proxy,
                    i = Object(c["computed"])(() => {
                        var e;
                        return null === t || void 0 === t || null === (e = t.$route) || void 0 === e ? void 0 : e.name
                    }),
                    o = Object(c["computed"])(e => {
                        const t = new Map([
                            ["index", n["m"].Workbench],
                            ["batchRetouch", n["m"].BatchRetouch],
                            ["photoFinishing", n["m"].PhotoFinishing],
                            ["exportList", n["m"].Export],
                            ["importImage", n["m"].EmptyPage],
                            ["Login", n["m"].Login],
                            ["", ""]
                        ]);
                        return t.get(i.value) || ""
                    }),
                    r = () => o.value;

                function s(e, t) {
                    return Object.freeze({
                        event_id: e,
                        data: t
                    })
                }

                function l(e, t) {
                    const i = a["a"].getInstance();
                    i.event(e, t || {})
                }
                return {
                    getPointRouteName: r,
                    formatPointData: s,
                    sendPoint: l
                }
            }
        },
        e3ca: function(e, t, i) {},
        e751: function(e, t, i) {
            "use strict";
            i.d(t, "d", (function() {
                return c
            })), i.d(t, "c", (function() {
                return a
            })), i.d(t, "m", (function() {
                return n
            })), i.d(t, "g", (function() {
                return o
            })), i.d(t, "l", (function() {
                return r
            })), i.d(t, "n", (function() {
                return s
            })), i.d(t, "h", (function() {
                return l
            })), i.d(t, "i", (function() {
                return _
            })), i.d(t, "f", (function() {
                return d
            })), i.d(t, "j", (function() {
                return u
            })), i.d(t, "e", (function() {
                return h
            })), i.d(t, "k", (function() {
                return y
            })), i.d(t, "b", (function() {
                return m
            })), i.d(t, "a", (function() {
                return b
            }));
            var c, a, n, o, r, s, l, _, d, u, h, k = i("2666");
            (function(e) {
                e["CakeNavMenu"] = "cake_nav_menu", e["CakeImport"] = "cake_import", e["CakeGallery"] = "cake_gallery", e["CakeRefine"] = "cake_refine", e["CakeSetting"] = "cake_setting", e["CakeHelp"] = "cake_help", e["CakeExport"] = "cake_export", e["CakeH5MemberPrice"] = "cakeh5_member_price", e["AppStart"] = "app_start", e["Login"] = "login", e["Logout"] = "logout", e["CakeSession"] = "cake_session", e["CakeExportList"] = "cake_export_list", e["CakeNewuserGuide"] = "cake_newuser_guide", e["CakeFillinfo"] = "cake_fillinfo", e["CakeAvatar"] = "cake_avatar", e["CakeWorkBench"] = "cake_workbench", e["CakeUpgradeGuide"] = "upgrade_guide", e["CakeImageAdjustment"] = "cake_image_adjustment"
            })(c || (c = {})),
            function(e) {
                e["ClickBackstage"] = "click_backstage"
            }(a || (a = {})),
            function(e) {
                e["PhotoFinishing"] = "refine", e["BatchRetouch"] = "gallery", e["Workbench"] = "workbench", e["Login"] = "login", e["Export"] = "export_list", e["EmptyPage"] = "empty_page"
            }(n || (n = {})),
            function(e) {
                e["InitWorkbenchGuide"] = "init_workbench_guide", e["InitPresetGuide"] = "init_preset_guide", e["InitSlideGuide"] = "init_slide_guide", e["InitSelectGuide"] = "init_select_guide", e["InitSynchronizeGuide"] = "init_synchronize_guide", e["InitExportGuide"] = "init_export_guide", e["ClickQuit"] = "click_quit", e["InitImgAdjustmentGuide"] = "image_adjustment_guide", e["InitBackgroundGuide"] = "background_adjustment_guide", e["InitHistoryGuide"] = "history_record_guide", e["InitCropGuide"] = "crop_guide", e["InitPresetSettingGuide"] = "preset_setting_guide"
            }(o || (o = {})),
            function(e) {
                e["CheckOriginalPhoto"] = "original_photo", e["AddSecond"] = "add_second", e["ClickOriginal"] = "click_original", e["ClickFit"] = "click_fit", e["SelectOne"] = "select_one", e["Delete"] = "delete", e["DeleteAll"] = "delete_all_select", e["SwipeSelect"] = "swipe_select", e["AddStar"] = "add_star", e["AddPresetSort"] = "add_preset_sort", e["DragPanel"] = "drag_panel", e["ImageAdjustment"] = "image_adjustment_icon", e["PortraitBeautification"] = "portrait_beauty_icon", e["OperationHistory"] = "history_record_icon", e["BackgroundAdjustment"] = "background_adjustment_icon", e["CropIcon"] = "crop_icon", e["ModifyGender"] = "modify_gender", e["AddPresetButton"] = "add_preset_button", e["AddPresetIcon"] = "add_preset_icon", e["AddApplyButton"] = "add_apply_button", e["SwitchGender"] = "switch_gender", e["SelectFilter"] = "select_filter", e["Feedback"] = "feedback", e["FeedbackChooseCategory"] = "feedback_choose_category", e["FeedbackInputContent"] = "feedback_input_content", e["FeedbackCancel"] = "feedback_cancel", e["FeedbackConfirm"] = "feedback_confirm", e["SavePresetSubmit1"] = "new_preset", e["SavePresetSubmit2"] = "new_preset2", e["SavePresetCover"] = "override_preset", e["ClickSmear"] = "click_smear", e["ClickSmearPreservation"] = "click_smear_preservation", e["ClickSmearCancel"] = "click_smear_cancel", e["ClickSmearClose"] = "click_smear_close", e["ClickSmearBack"] = "click_smear_back", e["ClickSmearReset"] = "click_smear_reset", e["ClickSmearHistoryBack"] = "click_smear_history_back", e["ClickHistory"] = "smear_history", e["ClickSmearTool"] = "click_smear_tool", e["DoubleClickDot"] = "double_click_dot", e["DoubleClickTitle"] = "double_click_title", e["PresetReset"] = "preset_reset", e["ParameterAdjustmentReset"] = "parameter_adjustment_reset", e["SelectIdPhotoBackground"] = "select_idphoto_background", e["SelectIdPhotoSize"] = "select_idphoto_size", e["SelectChangeSky"] = "select_change_sky", e["ModifyDPI"] = "modify_dpi", e["InitPreview"] = "init_preview_all", e["ClickPreview"] = "click_preview_all", e["ExitPreview"] = "exit_preview_all", e["FullEffectMode"] = "full_effect_mode", e["ColorMode"] = "color_mode", e["LiquefactionSize"] = "liquefaction_size", e["LiquefactionDensity"] = "liquefaction_density", e["LiquefactionPressure"] = "liquefaction_pressure", e["ClickLiquefactionFixedEdge"] = "click_liquefaction_fixed_edge"
            }(r || (r = {})),
            function(e) {
                e["ClickSetting"] = "click_setting", e["ClickClose"] = "click_close", e["ClickReturn"] = "click_return", e["ClickConfirm"] = "click_confirm"
            }(s || (s = {})),
            function(e) {
                e["HelpIcon"] = "help_icon", e["CustomerService"] = "customer_service", e["TutorialGraphic"] = "tutorial_graphic", e["TutorialVideo"] = "tutorial_video", e["HelpQuestion"] = "help_question", e["HotKey"] = "hot_key"
            }(l || (l = {})),
            function(e) {
                e["clickEffectValue"] = "click_effect_value"
            }(_ || (_ = {})),
            function(e) {
                e["ExportButton"] = "export_button", e["SelectPath"] = "select_path", e["SelectPreset"] = "select_preset", e["AdvancedSettings"] = "advanced_settings", e["Cancel"] = "cancel", e["Confirm"] = "confirm", e["OriginThumb"] = "thumbnail_close_effect", e["EffectThumb"] = "thumbnail_open_effect"
            }(d || (d = {})),
            function(e) {
                e["SlideBeautyRod"] = "slide_beauty_rod", e["SlideFaceliftRod"] = "slide_facelift_rod", e["SlideBodyRod"] = "slide_body_rod", e["SlideEnhanceRod"] = "slide_enhance_rod", e["SlideColorRod"] = "slide_color_rod", e["Facelift"] = "facelift", e["MakeupSuit"] = "slide_makeup_rod", e["SliderBackground"] = "slide_background_rod", e["SlideRemoveDefects"] = "slide_remove_defects", e["SlideSkyAdjustmentRod"] = "slide_sky_adjustment_rod", e["SlideSkySceneryAdjustmentRod"] = "slide_sky_scenery_adjustment_rod", e["SlideSkyWaterAdjustmentRod"] = "slide_sky_water_adjustment_rod", e["SlideLiquefyRod"] = "slide_liquefy_rod"
            }(u || (u = {})),
            function(e) {
                e["ExportedTab"] = "exported_tab", e["ExportingTab"] = "exporting_tab", e["BillingRulesPopup"] = "billing_rules_popup", e["DeleteBtn"] = "click_delete_button", e["RetryBtn"] = "click_retry_button", e["PauseBtn"] = "click_pause_button", e["StartBtn"] = "click_start_button", e["PauseAllBtn"] = "pause_all", e["StartAllBtn"] = "start_all", e["ClickExportDetail"] = "click_export_detail"
            }(h || (h = {}));
            const g = {
                    [k["c"].EnhanceEditHSLHue]: "hue",
                    [k["c"].EnhanceEditHSLLightness]: "brightness",
                    [k["c"].EnhanceEditHSLSaturation]: "saturation"
                },
                f = {
                    [k["d"].Red]: "red",
                    [k["d"].Orange]: "orange",
                    [k["d"].Yellow]: "yellow",
                    [k["d"].Green]: "green",
                    [k["d"].Cyan]: "lightgreen",
                    [k["d"].Blue]: "blue",
                    [k["d"].Purple]: "purple",
                    [k["d"].Magenta]: "magenta"
                },
                p = {};
            for (const C in g)
                for (const e in f) p[`${C}_${e}`] = `${g[C]}_${f[e]}`;
            const y = {
                    slide_remove_defects: {
                        [k["c"].Spotless]: "acne",
                        [k["c"].RemoveNevus]: "mole",
                        [k["c"].SpotlessBody]: "removal_body",
                        [k["c"].RemoveForeheadLines]: "forehead_lines",
                        [k["c"].RemoveEyeLines]: "eye_wrinkles",
                        [k["c"].LightenPouch]: "darkcircles",
                        [k["c"].TearTrough]: "wrinkle",
                        [k["c"].RemoveNeckLines]: "neck_pattern",
                        [k["c"].RemoveDoubleChin]: "face_doublechin"
                    },
                    slide_beauty_rod: {
                        [k["c"].NeutralGrayRetouch]: "dbsmooth",
                        [k["c"].MoisturizingSkin]: "smooth_face",
                        [k["c"].MoisturizingSkinNoFace]: "smooth_body",
                        [k["c"].FacialStereo3DLight]: "highlight_contour",
                        [k["c"].FacialStereo3DShadow]: "shadow_contour",
                        [k["c"].SkinColorLighten]: "skin_bright",
                        [k["c"].SkinColorWhiten]: "skin_whiten",
                        [k["c"].SkinColorRuddy]: "skin_rosy",
                        [k["c"].SkinColorUniform]: "skin_unite",
                        [k["c"].StretchMark]: "stretch_marks",
                        [k["c"].StretchMarkLine]: "pregnancy_line",
                        [k["c"].TeethWhiten]: "whiten",
                        [k["c"].ToothRepairing]: "teeth_fixer",
                        [k["c"].BrightEye]: "bright",
                        [k["c"].MakeupEnhanceEye]: "eye_enhance",
                        [k["c"].MakeupEnhanceMouth]: "lip_enhance"
                    },
                    slide_facelift_rod: {
                        [k["c"].HeadNarrow]: "face_size",
                        [k["c"].FaceLift]: "face_cheeks",
                        [k["c"].FacialRefineSmallFace]: "face_small",
                        [k["c"].FacialRefineTemple]: "face_temple",
                        [k["c"].FacialRefineCheekBone]: "face_cheekbones",
                        [k["c"].FaceWidth]: "face_width",
                        [k["c"].FacialRefineJaw]: "face_jaw",
                        [k["c"].FacialRefineChin]: "face_chin",
                        [k["c"].FacialRefineHairLine]: "face_forehead",
                        [k["c"].FacialRefineEyeZoom]: "eyes_size",
                        [k["c"].FacialRefineEyeHigher]: "eyes_height",
                        [k["c"].FacialRefineEyeWidth]: "eyes_width",
                        [k["c"].FacialRefineEyeDistance]: "eyes_distance",
                        [k["c"].FacialRefineEyeAngle]: "eyes_tilt",
                        [k["c"].FacialRefineEyeUpDownAdjust]: "eyes_position",
                        [k["c"].FacialRefineNose]: "nose_size",
                        [k["c"].FacialRefineNoseHigher]: "nose_lift",
                        [k["c"].FacialRefineNoseBridge]: "nose_bright",
                        [k["c"].FacialRefineNoseAlar]: "nose_wing",
                        [k["c"].FacialRefineNoseTip]: "nose_tip",
                        [k["c"].FacialRefineMouthSize]: "lips_size",
                        [k["c"].FacialRefineMouthWidth]: "lips_width",
                        [k["c"].FacialRefineMouthHigher]: "lips_height",
                        [k["c"].FacialRefineMouthUpperLip]: "lips_upper",
                        [k["c"].FacialRefineMouthLowperLip]: "lips_lower",
                        [k["c"].FacialRefineEyeBrowThickness]: "eyebrows_thick",
                        [k["c"].FacialRefineEyeBrowDistance]: "eyebrows_distance",
                        [k["c"].FacialRefineEyeBrowAngle]: "eyebrows_tilt",
                        [k["c"].FacialRefineEyeBrowShape]: "eyebrows_shape",
                        [k["c"].FacialRefineEyeBrowHigher]: "eyebrows_position",
                        [k["c"].LeftFaceLift]: "face_cheeks_left",
                        [k["c"].RightFaceLift]: "face_cheeks_right",
                        [k["c"].LeftTemple]: "face_temple_left",
                        [k["c"].RightTemple]: "face_temple_right",
                        [k["c"].RightTemple]: "face_temple_right",
                        [k["c"].LeftCheekBone]: "face_cheekbones_left",
                        [k["c"].RightCheekBone]: "face_cheekbones_right",
                        [k["c"].LeftJaw]: "face_jaw_left",
                        [k["c"].RightJaw]: "face_jaw_right",
                        [k["c"].LeftEyeZoom]: "eyes_size_left",
                        [k["c"].RightEyeZoom]: "eyes_size_right",
                        [k["c"].LeftEyeHigher]: "eyes_height_left",
                        [k["c"].RightEyeHigher]: "eyes_height_right",
                        [k["c"].LeftEyeWidth]: "eyes_width_left",
                        [k["c"].RightEyeWidth]: "eyes_width_right",
                        [k["c"].LeftEyeDistance]: "eyes_distance_left",
                        [k["c"].RightEyeDistance]: "eyes_distance_right",
                        [k["c"].LeftEyeAngle]: "eyes_tilt_left",
                        [k["c"].RightEyeAngle]: "eyes_tilt_right",
                        [k["c"].LeftEyeUpDownAdjust]: "eyes_position_left",
                        [k["c"].RightEyeUpDownAdjust]: "eyes_position_right",
                        [k["c"].LeftEyeBrowThickness]: "eyebrows_thick_left",
                        [k["c"].RightEyeBrowThickness]: "eyebrows_thick_right",
                        [k["c"].LeftEyeBrowDistance]: "eyebrows_distance_left",
                        [k["c"].RightEyeBrowDistance]: "eyebrows_distance_right",
                        [k["c"].LeftEyeBrowAngle]: "eyebrows_tilt_left",
                        [k["c"].RightEyeBrowAngle]: "eyebrows_tilt_right",
                        [k["c"].LeftEyeBrowShape]: "eyebrows_shape_left",
                        [k["c"].RightEyeBrowShape]: "eyebrows_shape_right",
                        [k["c"].LeftEyeBrowHigher]: "eyebrows_position_left",
                        [k["c"].RightEyeBrowHigher]: "eyebrows_position_right",
                        [k["c"].SymmetryReshapeSwitch]: "symmetry_facelift",
                        [k["c"].SymmetryReshapeBody]: "symmetry_upper_body",
                        [k["c"].SymmetryReshapeFace]: "symmetry_facial_features"
                    },
                    slide_body_rod: {
                        [k["c"].AIBodyReshape]: "body_ai",
                        [k["c"].PoseRefineSlimHand]: "arm",
                        [k["c"].PoseRefineSlimWaist]: "waist",
                        [k["c"].PoseRefineSlimLeg]: "leg",
                        [k["c"].PoseRefineEnhanceBreast]: "breast",
                        [k["c"].PoseRefineNiceButtock]: "buttocks",
                        [k["c"].PoseRefineSlim]: "Slim",
                        [k["c"].PoseRefineShrinkHead]: "head",
                        [k["c"].PoseRefineLengthen]: "stretch",
                        [k["c"].PoseRefineHeighten]: "heighten",
                        [k["c"].PoseRefineSlimLeftNeck]: "thin_neck_left",
                        [k["c"].PoseRefineSlimRightNeck]: "thin_neck_right",
                        [k["c"].PoseRefineSlimNeck]: "thin_neck"
                    },
                    slide_color_rod: {
                        [k["c"].FilterAlpha]: "filter",
                        [k["c"].EnhanceEditColorTemperature]: "temp",
                        [k["c"].EnhanceEditHue]: "tone",
                        [k["c"].EnhanceEditExposure]: "exposure",
                        [k["c"].EnhanceEditContrast]: "contrast",
                        [k["c"].EnhanceEditHighlight]: "highlight",
                        [k["c"].EnhanceEditShadow]: "shadow",
                        [k["c"].EnhanceEditWhite]: "white",
                        [k["c"].EnhanceEditBlack]: "black",
                        [k["c"].EnhanceEditCameraRawSharpen]: "clarity",
                        [k["c"].EnhanceEditCameraRawVibrance]: "vividness",
                        [k["c"].EnhanceEditSaturation]: "saturation",
                        [k["c"].EnhanceEditCRDBStrength]: "sharpen",
                        [k["c"].EnhanceEditCRDBRadius]: "radius",
                        [k["c"].EnhanceEditCRDBDetail]: "detail",
                        ...p
                    },
                    slide_makeup_rod: {
                        [k["c"].SuitMakeup]: "theme",
                        [k["c"].EyebrowMakeup]: "eyebrows",
                        [k["c"].EyeMakeup]: "eyes",
                        [k["c"].EyelashMakeup]: "eyelashes",
                        [k["c"].BlusherMakeup]: "blush",
                        [k["c"].LipMakeup]: "lipstick"
                    },
                    slide_background_rod: {
                        [k["c"].BgCleanSwitch]: {
                            0: "close_background_blemishes",
                            1: "open_background_blemishes"
                        },
                        [k["c"].BgCleanMode]: {
                            0: "none_pure_background",
                            1: "pure_background"
                        },
                        [k["c"].BgCleanMooreSwitch]: {
                            0: "close_background_banding",
                            1: "open_background_banding"
                        },
                        [k["c"].BgCleanMooreMode]: {
                            0: "banding_none_pure_background",
                            1: "banding_pure_background"
                        },
                        [k["c"].BackgroundEnhance]: "background_enhance",
                        [k["c"].BgReplaceGamma]: "idphoto_edge_detail",
                        [k["c"].BgReplaceBeta]: "idphoto_edge_burr"
                    },
                    slide_sky_adjustment_rod: {
                        [k["c"].SkyChoose]: "sky_choose",
                        [k["c"].SkyEdgeTransition]: "sky_edge_transition",
                        [k["c"].SkyTemp]: "sky_temp",
                        [k["c"].SkySaturation]: "sky_saturation",
                        [k["c"].SkyBrightness]: "sky_brightness",
                        [k["c"].SkyVague]: "sky_vague",
                        [k["c"].SkyFlip]: "sky_flip"
                    },
                    slide_sky_scenery_adjustment_rod: {
                        [k["c"].SkySceneryColor]: "sky_scenery_color",
                        [k["c"].SkyCharacterColor]: "sky_character_color"
                    },
                    slide_sky_water_adjustment_rod: {
                        [k["c"].SkyWaterReflex]: "sky_water_reflex",
                        [k["c"].SkyWaterVague]: "sky_water_vague"
                    }
                },
                m = {
                    [k["c"].SuitMakeup]: "click_theme_tab",
                    [k["c"].EyebrowMakeup]: "click_eyebrows_tab",
                    [k["c"].EyeMakeup]: "click_eyes_tab",
                    [k["c"].EyelashMakeup]: "click_eyelashes_tab",
                    [k["c"].BlusherMakeup]: "click_blush_tab",
                    [k["c"].LipMakeup]: "click_lipstick_tab"
                },
                b = {
                    [k["c"].SuitMakeup]: "click_theme",
                    [k["c"].EyebrowMakeup]: "click_eyebrows",
                    [k["c"].EyeMakeup]: "click_eyes",
                    [k["c"].EyelashMakeup]: "click_eyelashes",
                    [k["c"].BlusherMakeup]: "click_blush",
                    [k["c"].LipMakeup]: "click_lipstick"
                }
        }
    }
]);
//# sourceMappingURL=chunk-32750ab2.73a81e0e.js.map