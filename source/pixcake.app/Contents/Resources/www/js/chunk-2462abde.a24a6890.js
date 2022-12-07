(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-2462abde"], {
        "0dd9": function(t, e, i) {},
        "0fcb": function(t, e, i) {},
        4509: function(t, e, i) {
            "use strict";
            i("65ea")
        },
        "469c": function(t, e, i) {
            "use strict";
            i("caad");
            var s = function() {
                    var t = this,
                        e = t._self._c;
                    t._self._setupProxy;
                    return e("div", {
                        staticClass: "nav-entry-group"
                    }, [t._l(t.navList, (function(i, s) {
                        return ["debug" === i && t.isDebugEnv ? [e("debug-popover", {
                            key: `${i}_${s}`
                        }, [e("img", {
                            staticClass: "debug-icon",
                            attrs: {
                                src: t.LOGO_RELATIVE_PATH,
                                alt: ""
                            }
                        })])] : "free" !== i || t.IS_CLIENT_PixCake_EXPO || t.IS_CLIENT_PIX_PIE || !t.showCompleteInfo ? "vip" !== i || t.IS_CLIENT_PIX_PIE || t.IS_CLIENT_PixCake_EXPO ? "userinfo" === i ? [e("user-info-popover", {
                            key: `${i}_${s}`,
                            on: {
                                show: t.sendUserInfoPoint,
                                logout: t.logout
                            }
                        }, [e("div", {
                            staticClass: "avatar-box"
                        }, [e("el-tooltip", {
                            attrs: {
                                effect: "dark",
                                "open-delay": 750,
                                "hide-after": 2e3,
                                placement: "top"
                            }
                        }, [e("div", {
                            attrs: {
                                slot: "content"
                            },
                            slot: "content"
                        }, [e("span", {
                            staticClass: "title"
                        }, [t._v("个人中心")]), e("br"), e("span", {
                            staticClass: "content"
                        }, [t._v("查看剩余可用张数、查看版本号")])]), e("el-button", {
                            staticClass: "item",
                            attrs: {
                                size: "small",
                                plain: ""
                            }
                        }, [e("img", {
                            staticClass: "avatar-vip",
                            attrs: {
                                src: t.$getIconPath("nav_icon_avatar@3x.png"),
                                alt: ""
                            }
                        }), t.isVip ? [t.user.leftNum ? e("img", {
                            staticClass: "avatar-box-vipIcon",
                            attrs: {
                                src: t.$getIconPath("pop_icon_member@3x.png"),
                                alt: ""
                            }
                        }) : e("img", {
                            staticClass: "avatar-box-vipIcon",
                            attrs: {
                                src: t.$getIconPath("pop_icon_non_members@3x.png"),
                                alt: ""
                            }
                        })] : t._e()], 2)], 1)], 1)])] : "divider" === i ? [e("el-divider", {
                            key: `${i}_${s}`,
                            attrs: {
                                direction: "vertical"
                            }
                        })] : "help" !== i || t.IS_CLIENT_PixCake_EXPO || t.IS_CLIENT_PIX_PIE ? "export" === i ? ["exportList" === t.routeNameComp ? e("div", {
                            key: `${i}_${s}`,
                            staticClass: "item",
                            class: {
                                active: "exportList" === t.routeNameComp
                            },
                            attrs: {
                                title: "导出列表"
                            },
                            on: {
                                click: t.handleGoexportlist
                            }
                        }, [e("img", {
                            attrs: {
                                src: t.$getIconPath("nav_icon_list_selected@3x.png"),
                                alt: ""
                            }
                        })]) : e("el-tooltip", {
                            key: `${i}_${s}`,
                            attrs: {
                                effect: "dark",
                                placement: "top",
                                "open-delay": 750,
                                "hide-after": 2e3,
                                "popper-class": "tooltip"
                            }
                        }, [e("div", {
                            attrs: {
                                slot: "content"
                            },
                            slot: "content"
                        }, [e("span", {
                            staticClass: "title"
                        }, [t._v("导出列表")]), e("br"), e("span", {
                            staticClass: "content"
                        }, [t._v("查看导出进度、管理导出任务")])]), e("el-button", {
                            staticClass: "item",
                            attrs: {
                                size: "small",
                                disabled: t.getIconDisabled,
                                plain: ""
                            },
                            on: {
                                click: t.handleGoexportlist
                            }
                        }, [t.getIconDisabled ? e("img", {
                            attrs: {
                                src: t.$getIconPath("nav_icon_list_disabled@3x.png")
                            }
                        }) : [e("img", {
                            attrs: {
                                src: t.$getIconPath("nav_icon_list@3x.png")
                            }
                        }), e("span", {
                            directives: [{
                                name: "show",
                                rawName: "v-show",
                                value: t.exportNumber > 0,
                                expression: "exportNumber > 0"
                            }],
                            staticClass: "export-task-num"
                        }, [t._v(t._s(t.exportNumber))])]], 2)], 1)] : "set" === i ? [e("div", {
                            key: `${i}_${s}`,
                            staticClass: "setting tooltipBtn"
                        }, [e("el-tooltip", {
                            attrs: {
                                effect: "dark",
                                "open-delay": 750,
                                "hide-after": 2e3,
                                placement: "bottom"
                            }
                        }, [e("div", {
                            attrs: {
                                slot: "content"
                            },
                            slot: "content"
                        }, [e("span", {
                            staticClass: "title"
                        }, [t._v("设置")]), e("br"), e("span", {
                            staticClass: "content"
                        }, [t._v("软件性能设置")])]), e("el-button", {
                            directives: [{
                                name: "gtag-event",
                                rawName: "v-gtag-event",
                                value: t.PointClickSetting,
                                expression: "PointClickSetting"
                            }],
                            staticClass: "item",
                            attrs: {
                                size: "small",
                                plain: ""
                            },
                            on: {
                                click: function(e) {
                                    t.showGpuSwitchSetting = !0
                                }
                            }
                        }, [e("img", {
                            staticClass: "setting-icon",
                            attrs: {
                                src: t.$getIconPath("nav_icon_set_up@3x.png"),
                                alt: ""
                            }
                        })])], 1)], 1)] : "export-btn" === i ? [t._t("export-btn")] : "manual-import" === i ? [t._t("manual-import")] : "navMenus" === i ? [t._l(t.navMenus, (function(i, a) {
                            return [i.show ? [i.vHtml ? [e("div", {
                                key: `nav_menu_${s}_${a}`,
                                staticClass: "item nav-menu",
                                domProps: {
                                    innerHTML: t._s(i.vHtml)
                                },
                                on: {
                                    click: function(e) {
                                        return t.onClickNavMenu(i)
                                    }
                                }
                            })] : [t.IS_CLIENT_PixCake_EXPO || t.IS_CLIENT_PIX_PIE ? t._e() : e("div", {
                                key: `nav_menu_${s}_${a}`,
                                staticClass: "item nav-menu",
                                class: {
                                    "both-show-name-and-icon": i.icon && i.showName
                                },
                                on: {
                                    click: function(e) {
                                        return t.onClickNavMenu(i)
                                    }
                                }
                            }, [i.icon ? [e("img", {
                                ref: "giftBtnRef",
                                refInFor: !0,
                                staticClass: "claGift",
                                attrs: {
                                    src: i.icon,
                                    alt: ""
                                }
                            })] : t._e(), i.showName ? e("span", {
                                staticClass: "nav-menu-name"
                            }, [t._v(" " + t._s(i.name) + " ")]) : t._e()], 2)]] : t._e()]
                        }))] : t._e() : [e("el-tooltip", {
                            key: `${i}_${s}`,
                            staticClass: "disabled",
                            attrs: {
                                effect: "dark",
                                "open-delay": 750,
                                "hide-after": 2e3,
                                placement: "bottom",
                                "popper-calss": "tooltip"
                            }
                        }, [e("div", {
                            attrs: {
                                slot: "content"
                            },
                            slot: "content"
                        }, [e("span", {
                            staticClass: "title"
                        }, [t._v("帮助中心")]), e("br"), e("span", {
                            staticClass: "content"
                        }, [t._v("快捷键、教程、人工客服")])]), e("el-button", {
                            staticClass: "item",
                            attrs: {
                                size: "small",
                                plain: ""
                            }
                        }, [e("HelperMenu")], 1)], 1)] : [e("PayTipPopover", {
                            key: `${i}_${s}`,
                            attrs: {
                                visible: t.showPayTip
                            }
                        }, [e("el-button", {
                            staticClass: "vip-plan",
                            class: {
                                dark: t.darkVip
                            },
                            attrs: {
                                type: "primary"
                            },
                            on: {
                                click: t.onShowVipPlanClick
                            }
                        }, [t.isVip ? [e("div", {
                            staticClass: "vip-text"
                        }, [t._v("会员续费")])] : [e("div", {
                            staticClass: "vip-text"
                        }, [t._v("开通会员")])]], 2)], 1)] : [e("span", {
                            key: `${i}_${s}`,
                            staticClass: "receive-free",
                            on: {
                                click: function(e) {
                                    t.onReceiveFreeClick(), t.PointFillInfo()
                                }
                            }
                        }, [t._v(" 完善信息送张数 ")])]]
                    })), t.navList.includes("set") ? e("GpuSwitchDialog", {
                        attrs: {
                            active: t.gpuSettingActiveTab
                        },
                        on: {
                            "update:active": function(e) {
                                t.gpuSettingActiveTab = e
                            }
                        },
                        model: {
                            value: t.showGpuSwitchSetting,
                            callback: function(e) {
                                t.showGpuSwitchSetting = e
                            },
                            expression: "showGpuSwitchSetting"
                        }
                    }) : t._e(), t.navList.includes("vip") ? e("PaySuccessDialog", {
                        attrs: {
                            value: t.showPaySuccess
                        },
                        on: {
                            "update:value": function(e) {
                                t.showPaySuccess = e
                            }
                        }
                    }) : t._e()], 2)
                },
                a = [],
                n = i("67a1"),
                o = i("2b0e"),
                c = i("0613"),
                l = i("2ef0"),
                r = i("25c2"),
                u = i("74d8"),
                p = i("620c"),
                d = i("8b98"),
                v = i("879d"),
                m = i("52b8"),
                h = i("442f"),
                b = i("5c96"),
                g = function() {
                    var t = this,
                        e = t._self._c;
                    t._self._setupProxy;
                    return e("div", {
                        staticClass: "user-info-container"
                    }, [e("el-popover", {
                        staticClass: "user-info-container",
                        attrs: {
                            content: " ",
                            width: "190",
                            trigger: "click",
                            placement: "bottom",
                            transition: "el-zoom-in-bottom",
                            "popper-class": "is-dark user-operation-popover",
                            "visible-arrow": !1
                        },
                        on: {
                            show: t.onPopoverShow
                        }
                    }, [e("div", {
                        staticClass: "user",
                        attrs: {
                            slot: "reference"
                        },
                        slot: "reference"
                    }, [t._t("default")], 2), e("div", {
                        staticClass: "user-info"
                    }, [e("div", {
                        staticClass: "label",
                        staticStyle: {
                            "font-weight": "600"
                        }
                    }, [e("span", [t._v(t._s(t.isVip ? t.con.vip : t.con.notVip))]), t.isVip ? [t.user.leftNum ? e("img", {
                        staticStyle: {
                            width: "16px",
                            "vertical-align": "middle",
                            "margin-left": "4px",
                            "margin-top": "-4px"
                        },
                        attrs: {
                            src: t.$getIconPath("pop_icon_member@3x.png"),
                            alt: ""
                        }
                    }) : e("img", {
                        staticStyle: {
                            width: "16px",
                            "vertical-align": "middle",
                            "margin-left": "4px",
                            "margin-top": "-4px"
                        },
                        attrs: {
                            src: t.$getIconPath("pop_icon_non_members@3x.png"),
                            alt: ""
                        }
                    })] : t._e()], 2), t.user.tel ? e("p", {
                        staticClass: "label"
                    }, [e("img", {
                        staticStyle: {
                            width: "12px",
                            "vertical-align": "middle",
                            "margin-right": "4px",
                            "margin-top": "-4px"
                        },
                        attrs: {
                            src: t.$getIconPath("pop_icon_account_number@3x.png"),
                            alt: ""
                        }
                    }), e("span", [t._v(t._s(t.user.tel))])]) : t._e(), e("p", {
                        staticClass: "label"
                    }, [t._v(" 剩余可用/总张数： ")]), e("p", {
                        staticClass: "label",
                        staticStyle: {
                            "line-height": "1.8"
                        }
                    }, [e("span", {
                        staticStyle: {
                            "font-size": "18px",
                            "font-weight": "500",
                            color: "#FFFFFF"
                        }
                    }, [t._v(t._s(t.user.leftNum))]), t._v("/" + t._s(t.user.totalNum) + " ")]), e("ul", {
                        staticClass: "btnlist"
                    }, [t.userMenus ? [t._l(t.userMenus, (function(i, s) {
                        return [i.show ? [t.IS_CLIENT_PixCake_EXPO ? ["我的套餐" != i.name ? [e("el-divider", {
                            key: "user_menu_divider_" + s,
                            staticClass: "divider"
                        }), e("li", {
                            key: "user_menu_" + s,
                            staticClass: "global__custom-menu-item",
                            on: {
                                click: function(e) {
                                    return t.onOpenUserMenuWindow(i)
                                }
                            }
                        }, [t._v(" " + t._s(i.name) + " ")])] : t._e()] : [e("el-divider", {
                            key: "user_menu_divider_" + s,
                            staticClass: "divider"
                        }), e("li", {
                            key: "user_menu_" + s,
                            staticClass: "global__custom-menu-item",
                            on: {
                                click: function(e) {
                                    return t.onOpenUserMenuWindow(i)
                                }
                            }
                        }, [t._v(" " + t._s(i.name) + " ")])]] : t._e()]
                    }))] : t._e(), !t.IS_CLIENT_PixCake_EXPO && t.orgBackendInfo && t.orgBackendInfo.is_show ? [e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        directives: [{
                            name: "gtag-event",
                            rawName: "v-gtag-event",
                            value: t.PointClickBackstage,
                            expression: "PointClickBackstage"
                        }],
                        staticClass: "global__custom-menu-item",
                        on: {
                            click: t.onOpenBusinessAdminExternalLink
                        }
                    }, [t._v(" 管理后台 ")])] : t._e(), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "global__custom-menu-item",
                        on: {
                            click: t.onAboutUsClick
                        }
                    }, [t._v(" 关于我们 ")]), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "global__custom-menu-item",
                        on: {
                            click: t.handleLogout
                        }
                    }, [t._v(" 退出登录 ")])], 2)])]), e("AboutUsDialog", {
                        model: {
                            value: t.showAboutUsDialog,
                            callback: function(e) {
                                t.showAboutUsDialog = e
                            },
                            expression: "showAboutUsDialog"
                        }
                    }), e("PaySuccessDialog", {
                        model: {
                            value: t.showPaySuccess,
                            callback: function(e) {
                                t.showPaySuccess = e
                            },
                            expression: "showPaySuccess"
                        }
                    })], 1)
                },
                f = [],
                C = i("2f62"),
                _ = i("ad29"),
                k = i("8ec2"),
                w = i("a455"),
                y = function() {
                    var t = this,
                        e = t._self._c;
                    return e("el-dialog", {
                        attrs: {
                            top: "28vh",
                            width: "269px",
                            visible: t.visible,
                            "show-close": !1,
                            center: "",
                            "custom-class": "common-dialog vip-price-dialog"
                        },
                        on: {
                            "update:visible": function(e) {
                                t.visible = e
                            }
                        }
                    }, [e("div", {
                        staticClass: "dialog-container"
                    }, [e("img", {
                        staticClass: "pay-success-icon",
                        attrs: {
                            src: t.$getIconPath("member_pop_pic_pay@3x.png")
                        }
                    }), e("span", {
                        staticClass: "success-tip"
                    }, [t._v("支付成功")]), e("div", {
                        staticClass: "btn",
                        on: {
                            click: t.onApplyClick
                        }
                    }, [t._v(" 开始使用 ")])])])
                },
                P = [],
                x = i("f5de"),
                S = {
                    name: "PaySuccessDialog",
                    components: {
                        "el-dialog": x["a"]
                    },
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    data() {
                        return {
                            visible: this.value
                        }
                    },
                    watch: {
                        value: {
                            handler(t) {
                                this.visible = t
                            },
                            immediate: !0
                        },
                        visible(t) {
                            t || this._SetShowPaySuccess(!1), this.$emit("input", t)
                        }
                    },
                    methods: {
                        ...Object(C["d"])(["_SetShowPaySuccess"]),
                        onApplyClick() {
                            this.visible = !1, this.$emit("update:visible", !1)
                        }
                    }
                },
                I = S,
                E = (i("95bf"), i("2877")),
                O = Object(E["a"])(I, y, P, !1, null, "3310f91d", null),
                N = O.exports,
                L = Object(o["defineComponent"])({
                    components: {
                        "el-popover": b["Popover"],
                        "el-divider": b["Divider"],
                        PaySuccessDialog: N,
                        AboutUsDialog: w["a"]
                    },
                    mixins: [m["a"]],
                    props: {
                        avatar: String
                    },
                    setup(t, {
                        emit: e
                    }) {
                        const {
                            PointUserMenuClick: i,
                            PointLogout: s,
                            PointContentUs: a
                        } = Object(_["a"])(), n = Object(o["computed"])(() => c["a"].getters.user), l = async () => {
                            await c["a"].dispatch("loadVipInfo"), c["a"].dispatch("initMenuList"), e("show", n.value)
                        };
                        return {
                            PointUserMenuClick: i,
                            PointLogout: s,
                            PointContentUs: a,
                            onPopoverShow: l
                        }
                    },
                    data() {
                        return {
                            IS_CLIENT_PixCake_EXPO: r["w"],
                            showAboutUsDialog: !1,
                            showPaySuccess: !1,
                            con: {
                                vip: `尊敬的${r["v"]?"":r["c"]}会员`,
                                notVip: `尊敬的${r["v"]?"":r["c"]}用户`
                            },
                            orgBackendInfo: null
                        }
                    },
                    computed: {
                        ...Object(C["c"])(["tel", "isVip", "user", "userMenus"]),
                        showPayButton() {
                            return !this.isVip && !r["v"]
                        }
                    },
                    methods: {
                        onAboutUsClick() {
                            this.showAboutUsDialog = !0, this.PointContentUs(this.isVip)
                        },
                        onOpenMyPackageWindow() {
                            n["a"].send("open-myPackage-window", null)
                        },
                        onPayVipClick() {
                            this.PointMemberPriceClick("join_membership"), n["a"].send("open-member-plan-window", null)
                        },
                        handleLogout() {
                            this.PointLogout(this.isVip), this.$emit("logout")
                        },
                        onPaySuccess() {
                            this.showPaySuccess = !0
                        },
                        onOpenBusinessAdminExternalLink() {
                            var t;
                            n["a"].send("open-external-link", {
                                href: null === (t = this.orgBackendInfo) || void 0 === t ? void 0 : t.access_url
                            })
                        },
                        onOpenUserMenuWindow: Object(l["debounce"])((function(t) {
                            t.url ? (t.openLink(), this.PointUserMenuClick(t.key)) : this.tsNotify("页面不存在，请检查后再试")
                        }), 300)
                    },
                    async mounted() {
                        const t = await k["a"].instance().getUser();
                        this.orgBackendInfo = t.orgBackendInfo
                    }
                }),
                j = L,
                $ = (i("987c"), Object(E["a"])(j, g, f, !1, null, "d0ea71ee", null)),
                D = $.exports,
                T = i("9710"),
                M = i("7b31"),
                U = function() {
                    var t = this,
                        e = t._self._c;
                    return e("el-dialog", {
                        staticClass: "receive-free-container",
                        attrs: {
                            "append-to-body": "",
                            top: "30vh",
                            width: "477px",
                            align: "center",
                            visible: t.visible,
                            "close-on-click-modal": !1
                        },
                        on: {
                            "update:visible": function(e) {
                                t.visible = e
                            },
                            close: function(e) {
                                return t.$emit("close")
                            }
                        }
                    }, [e("div", {
                        staticClass: "receive-free-container-title"
                    }, [t._v("完善基础资料免费送" + t._s(t.receiveCount) + "张")]), e("el-form", {
                        attrs: {
                            "label-position": "left"
                        }
                    }, [e("el-form-item", {
                        staticClass: "receive-free-container-from-item1",
                        attrs: {
                            label: "摄影机构:"
                        }
                    }, [e("el-input", {
                        attrs: {
                            maxlength: 20,
                            placeholder: "请输入您的摄影机构名称"
                        },
                        model: {
                            value: t.institutionName,
                            callback: function(e) {
                                t.institutionName = e
                            },
                            expression: "institutionName"
                        }
                    })], 1), e("el-form-item", {
                        staticClass: "receive-free-container-from-item2",
                        attrs: {
                            label: "所在地区:"
                        }
                    }, [e("el-cascader", {
                        attrs: {
                            options: t.placeOptions,
                            props: t.placeProps,
                            placeholder: "请选择您的所在地区信息"
                        },
                        model: {
                            value: t.placeInfo,
                            callback: function(e) {
                                t.placeInfo = "string" === typeof e ? e.trim() : e
                            },
                            expression: "placeInfo"
                        }
                    }), e("span", {
                        staticClass: "cascader-icon"
                    }, [e("i", {
                        staticClass: "el-icon-arrow-up"
                    }), e("i", {
                        staticClass: "el-icon-arrow-down"
                    })])], 1), e("el-form-item", {
                        staticClass: "receive-free-container-monthly-usage-field receive-free-container-from-item2",
                        attrs: {
                            label: "月修图量:"
                        }
                    }, [e("el-select", {
                        attrs: {
                            placeholder: "请选择您的月平均修图张数"
                        },
                        model: {
                            value: t.monthlyUsage,
                            callback: function(e) {
                                t.monthlyUsage = e
                            },
                            expression: "monthlyUsage"
                        }
                    }, t._l(t.monthlyUsageOptions, (function(t) {
                        return e("el-option", {
                            key: t.value,
                            attrs: {
                                label: t.label,
                                value: t.value
                            }
                        })
                    })), 1), e("span", {
                        staticClass: "cascader-icon"
                    }, [e("i", {
                        staticClass: "el-icon-arrow-up"
                    }), e("i", {
                        staticClass: "el-icon-arrow-down"
                    })])], 1), e("el-form-item", {
                        staticClass: "receive-free-container-radio-field",
                        attrs: {
                            label: "业务类型:"
                        }
                    }, t._l(t.businessTypes, (function(i, s) {
                        return e("el-radio", {
                            key: s,
                            attrs: {
                                label: i.id
                            },
                            model: {
                                value: t.businessType,
                                callback: function(e) {
                                    t.businessType = e
                                },
                                expression: "businessType"
                            }
                        }, [t._v(t._s(i.name) + " ")])
                    })), 1), e("el-form-item", {
                        staticClass: "receive-free-container-from-item4"
                    }, [e("el-button", {
                        staticClass: "receive-free-container-submit-btn",
                        attrs: {
                            loading: t.btnLoading
                        },
                        on: {
                            click: t.btnSubmit
                        }
                    }, [t._v("免费领取" + t._s(t.receiveCount) + "张 ")])], 1)], 1)], 1)
                },
                F = [],
                B = i("f946"),
                V = i("93c3"),
                A = {
                    name: "ReceiveFreeDialog",
                    mixins: [h["a"]],
                    components: {
                        "el-dialog": b["Dialog"],
                        "el-option": b["Option"],
                        "el-select": b["Select"]
                    },
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    data() {
                        return {
                            initCloudData: !1,
                            visible: this.value,
                            institutionName: "",
                            placeInfo: [],
                            businessType: 1,
                            placeProps: {
                                lazy: !0,
                                lazyLoad: this.placeLazyLoad
                            },
                            placeOptions: [],
                            businessTypes: [],
                            receiveCount: 0,
                            btnLoading: !1,
                            monthlyUsageOptions: [],
                            monthlyUsage: null
                        }
                    },
                    computed: {},
                    watch: {
                        value: {
                            handler(t) {
                                this.visible = t, t && !this.initCloudData && this.init()
                            },
                            immediate: !0
                        },
                        visible(t) {
                            this.$emit("input", t)
                        }
                    },
                    methods: {
                        async placeLazyLoad({
                            value: t
                        }, e) {
                            const i = await Object(B["d"])(t),
                                s = [];
                            i.forEach(e => {
                                if (e.province_id === t) {
                                    const t = {
                                        value: e.id,
                                        label: e.name,
                                        leaf: !0
                                    };
                                    s.push(t)
                                }
                            }), e(s)
                        },
                        async getProvinceInfo() {
                            try {
                                const t = await Object(B["f"])();
                                t.forEach(t => {
                                    const e = {
                                        value: t.id,
                                        label: t.name
                                    };
                                    this.placeOptions.push(e)
                                })
                            } catch (t) {
                                this.tsMessage(t.message)
                            }
                        },
                        async btnSubmit() {
                            try {
                                const [t, e] = this.validator();
                                if (!t) return this.tsMessage(e);
                                const i = {
                                    org_name: this.institutionName.trim(),
                                    org_type_id: this.businessType,
                                    city_id: this.placeInfo[1] ? this.placeInfo[1] : null,
                                    month_ps_count_id: this.monthlyUsage
                                };
                                this.btnLoading = !0, await Object(V["h"])(i), this.btnLoading = !1, this.visible = !1, this.$emit("complete"), this.tsMessage(`领取成功，${this.receiveCount}张免费张数已到账`)
                            } catch (t) {
                                this.btnLoading = !1, this.tsMessage(t.message)
                            }
                        },
                        validator() {
                            return this.institutionName.trim().length ? this.placeInfo.length ? this.monthlyUsage ? this.businessType ? [!0] : [!1, "请选择业务类型"] : [!1, "请选择月修图量级"] : [!1, "请选择所在地区"] : [!1, "请填写摄影机构名称"]
                        },
                        async init() {
                            try {
                                await this.getProvinceInfo();
                                const t = await Object(B["b"])(5);
                                this.monthlyUsageOptions = t.map(t => ({
                                    value: t.id,
                                    label: t.name
                                }));
                                const {
                                    data: e
                                } = await Object(B["c"])(), {
                                    detail_info: i
                                } = e, {
                                    count: s
                                } = i;
                                if (!s) return this.$emit("failure");
                                this.receiveCount = s;
                                const a = await Object(V["b"])();
                                this.businessTypes = a.data, this.initCloudData = !0
                            } catch (t) {
                                this.tsMessage(t.message)
                            }
                        }
                    }
                },
                G = A,
                W = (i("4509"), Object(E["a"])(G, U, F, !1, null, "74c4b13a", null)),
                R = W.exports,
                z = function() {
                    var t = this,
                        e = t._self._c;
                    return e("div", {
                        staticClass: "pay-tip-container"
                    }, [e("el-popover", {
                        attrs: {
                            placement: "bottom",
                            width: "200",
                            trigger: "manual",
                            content: "当前剩余可用张数不足50张，请及时充值哦~"
                        },
                        model: {
                            value: t.value,
                            callback: function(e) {
                                t.value = e
                            },
                            expression: "value"
                        }
                    }, [e("div", {
                        staticClass: "user",
                        attrs: {
                            slot: "reference"
                        },
                        slot: "reference"
                    }, [t._t("default")], 2)])], 1)
                },
                X = [],
                H = {
                    name: "PayTipPopover",
                    props: {
                        visible: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    components: {
                        "el-popover": b["Popover"]
                    },
                    setup(t, {
                        emit: e
                    }) {
                        const {
                            visible: i
                        } = Object(o["toRefs"])(t), s = Object(o["ref"])(!1);
                        return Object(o["watch"])(i, t => s.value = t, {
                            immediate: !0
                        }), Object(o["watch"])(s, t => e("input", t)), {
                            value: s
                        }
                    }
                },
                q = H,
                Q = (i("c3b8"), Object(E["a"])(q, z, X, !1, null, "81c46112", null)),
                J = Q.exports,
                K = function() {
                    var t = this,
                        e = t._self._c;
                    return e("div", [e("el-popover", {
                        attrs: {
                            content: "",
                            width: "220",
                            trigger: "click",
                            placement: "bottom",
                            transition: "el-zoom-in-bottom",
                            "popper-class": "is-dark user-operation-popover",
                            "visible-arrow": !1
                        }
                    }, [e("div", {
                        staticClass: "user",
                        attrs: {
                            slot: "reference"
                        },
                        slot: "reference"
                    }, [t._t("default")], 2), e("div", {
                        staticClass: "debug-info"
                    }, [e("ul", {
                        staticClass: "operation-menu"
                    }, [e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("控制台显示追踪对象")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-button", {
                        on: {
                            click: t.onPrintMemoryTrackClick
                        }
                    }, [t._v("点击")])], 1)]), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("el-button", {
                        attrs: {
                            size: "mini",
                            type: "text"
                        },
                        on: {
                            click: function(e) {
                                return t.openWorkspace("work")
                            }
                        }
                    }, [t._v(" 工作空间路径 ")]), e("el-divider", {
                        staticClass: "divider",
                        attrs: {
                            direction: "vertical"
                        }
                    }), e("div", {
                        staticClass: "btn"
                    }, [e("el-button", {
                        attrs: {
                            size: "mini",
                            type: "text"
                        },
                        on: {
                            click: function(e) {
                                return t.openWorkspace("user")
                            }
                        }
                    }, [t._v(" 用户数据路径 ")])], 1)], 1), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("预览效果调试")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.canDebugEffect
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onDebugEffectEnvSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("导出效果调试")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.canDebugExportEffect
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onDebugExportEffectEnvSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("人脸点开关")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.isEnableFacePoint
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onFacePointSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("骨骼点开关")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.isEnableSkeletonPoint
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onSkeletonPointSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("校验脸部黑块开关")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.isEnableCheckFaceIsBlack
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onCheckFaceIsBlackSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("去除精修分辨率限制")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.removeResolutionLimit
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onRemoveResolutionLimitSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("主进程崩溃test")]), e("el-button", {
                        on: {
                            click: t.onCrashTestClick
                        }
                    }, [t._v("点击奔溃")])], 1), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("主进程崩溃上报")]), e("el-button", {
                        on: {
                            click: t.onReportCrashClick
                        }
                    }, [t._v("点击上报")])], 1), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("导出进程崩溃test")]), e("el-button", {
                        on: {
                            click: t.onExportCrashTestClick
                        }
                    }, [t._v("点击奔溃")])], 1), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("预览缓存开关")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.previewCacheStatus
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onPreviewCacheSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("工作台导入不进入二级页面")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.importNoNavigate
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onImportNoNavigate.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("工作空间最小容量")]), e("el-input", {
                        style: {
                            width: "100px",
                            height: "20px"
                        },
                        attrs: {
                            type: "number"
                        },
                        on: {
                            change: function(e) {
                                return t._SetDiskWarnCondition(t.diskWarnCondition)
                            }
                        },
                        model: {
                            value: t.diskWarnCondition.minWorkSpaceFreeCapacity,
                            callback: function(e) {
                                t.$set(t.diskWarnCondition, "minWorkSpaceFreeCapacity", e)
                            },
                            expression: "diskWarnCondition.minWorkSpaceFreeCapacity"
                        }
                    })], 1), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("系统盘最小容量")]), e("el-input", {
                        style: {
                            width: "100px",
                            height: "20px"
                        },
                        attrs: {
                            type: "number"
                        },
                        on: {
                            change: function(e) {
                                return t._SetDiskWarnCondition(t.diskWarnCondition)
                            }
                        },
                        model: {
                            value: t.diskWarnCondition.minSystemDiskFreeCapacity,
                            callback: function(e) {
                                t.$set(t.diskWarnCondition, "minSystemDiskFreeCapacity", e)
                            },
                            expression: "diskWarnCondition.minSystemDiskFreeCapacity"
                        }
                    })], 1), e("li", {
                        staticClass: "menu-item",
                        staticStyle: {
                            "margin-top": "10px"
                        }
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("Ga上报")]), e("el-input", {
                        style: {
                            width: "70px",
                            height: "20px"
                        },
                        attrs: {
                            type: "number"
                        },
                        on: {
                            change: function(e) {
                                return t._SetSendGtagNumber(t.sendGtagNumber)
                            }
                        },
                        model: {
                            value: t.sendGtagNumber.number,
                            callback: function(e) {
                                t.$set(t.sendGtagNumber, "number", e)
                            },
                            expression: "sendGtagNumber.number"
                        }
                    }), e("el-button", {
                        on: {
                            click: t.updateCacheMessageCount
                        }
                    }, [t._v("确认")])], 1), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [t._v(" ... ")]), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("查看GPU配置")]), e("el-button", {
                        on: {
                            click: t.onViewGpuClick
                        }
                    }, [t._v("点击查看")])], 1), e("el-divider", {
                        staticClass: "divider"
                    }), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("查看CPU型号")]), e("el-button", {
                        on: {
                            click: t.onGetCpuInfoClick
                        }
                    }, [t._v("点击查看")])], 1), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("导出数据输出")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-switch", {
                        attrs: {
                            value: t.canPrintExportLog
                        },
                        nativeOn: {
                            click: function(e) {
                                return t.onExportLogSwitch.apply(null, arguments)
                            }
                        }
                    })], 1)]), e("li", {
                        staticClass: "menu-item"
                    }, [e("div", {
                        staticClass: "label"
                    }, [t._v("批量导出")]), e("div", {
                        staticClass: "btn"
                    }, [e("el-input", {
                        style: {
                            width: "100px",
                            height: "20px"
                        },
                        attrs: {
                            type: "test"
                        },
                        model: {
                            value: t.batchExportPath,
                            callback: function(e) {
                                t.batchExportPath = e
                            },
                            expression: "batchExportPath"
                        }
                    }), e("el-button", {
                        on: {
                            click: t.onBatchExportClick
                        }
                    }, [t._v("执行")])], 1)])], 1)])])], 1)
                },
                Y = [],
                Z = i("36c6");
            class tt {
                static getInstance() {
                    return this.instance || (this.instance = new tt), this.instance
                }
                async getWorkspacePath() {
                    return ""
                }
            }
            tt.instance = null;
            var et = i("0b24"),
                it = i("ea3f"),
                st = i("6310"),
                at = {
                    mixins: [h["a"]],
                    components: {
                        "el-popover": b["Popover"],
                        "el-divider": b["Divider"],
                        "el-switch": b["Switch"],
                        "el-select": b["Select"],
                        "el-option": b["Option"]
                    },
                    props: {},
                    data() {
                        return {
                            canPrintExportLog: !1,
                            batchExportPath: ""
                        }
                    },
                    computed: {
                        ...Object(C["c"])("config", ["canDebugEffect", "canDebugExportEffect", "isEnableFacePoint", "isEnableSkeletonPoint", "isEnableCheckFaceIsBlack", "removeResolutionLimit", "previewAreaValue", "previewAreaSizeList", "previewCacheStatus", "diskWarnCondition", "importNoNavigate", "sendGtagNumber"])
                    },
                    methods: {
                        ...Object(C["d"])("config", ["changeDebugEffectStatus", "changeExportDebugEffectStatus", "changeFacePointStatus", "changeSkeletonPointStatus", "changeFaceIsBlackStatus", "changeRemoveResolutionLimitMode", "_SetPreviewAreaValue", "changePreviewCacheStatus", "_SetDiskWarnCondition", "updateConfig", "changeImportNoNavigate", "_SetSendGtagNumber", "changeExportLogStatus"]),
                        ...Object(C["b"])(["asyncPrintExportInfo"]),
                        onPrintMemoryTrackClick() {
                            et["a"].shareInstance().print()
                        },
                        onDebugEffectEnvSwitch: Object(l["debounce"])((function() {
                            this.changeDebugEffectStatus();
                            let t = this.canDebugEffect;
                            const e = t ? "预览debug 模式已经开启～" : "预览debug 模式已经关闭～";
                            this.tsNotify({
                                type: "success",
                                message: e
                            })
                        }), 300),
                        onDebugExportEffectEnvSwitch: Object(l["debounce"])((function() {
                            this.changeExportDebugEffectStatus();
                            let t = this.canDebugExportEffect;
                            const e = t ? "导出debug 模式已经开启～" : "导出debug 模式已经关闭～";
                            this.tsNotify({
                                type: "success",
                                message: e
                            })
                        }), 300),
                        onFacePointSwitch: Object(l["debounce"])((function() {
                            this.changeFacePointStatus();
                            let t = this.isEnableFacePoint;
                            const e = t ? "人脸点已经打开～" : "人脸点已经关闭～";
                            this.tsNotify({
                                type: "success",
                                message: e
                            })
                        }), 300),
                        onSkeletonPointSwitch: Object(l["debounce"])((function() {
                            this.changeSkeletonPointStatus();
                            let t = this.isEnableSkeletonPoint;
                            const e = t ? "骨骼点已经打开～" : "骨骼点已经关闭～";
                            this.tsNotify({
                                type: "success",
                                message: e
                            })
                        }), 300),
                        onCheckFaceIsBlackSwitch: Object(l["debounce"])((function() {
                            this.changeFaceIsBlackStatus();
                            let t = this.isEnableCheckFaceIsBlack;
                            const e = t ? "校验脸部黑块已经打开～" : "校验脸部黑块已经关闭～";
                            this.tsNotify({
                                type: "success",
                                message: e
                            })
                        }), 300),
                        onRemoveResolutionLimitSwitch: Object(l["debounce"])((function() {
                            this.changeRemoveResolutionLimitMode();
                            let t = this.removeResolutionLimit;
                            const e = t ? "去除分辨率限制预计打开～" : "去除分辨率限制已经关闭～";
                            this.tsNotify({
                                type: "success",
                                message: e
                            })
                        }), 300),
                        onImportNoNavigate: Object(l["debounce"])((function() {
                            this.changeImportNoNavigate()
                        }), 300),
                        onPreviewCacheSwitch: Object(l["debounce"])((function() {
                            this.changePreviewCacheStatus()
                        }), 300),
                        printExportInfo: Object(l["debounce"])((function() {
                            this.asyncPrintExportInfo()
                        }), 500),
                        onExportLogSwitch: Object(l["debounce"])((function() {
                            this.canPrintExportLog = !this.canPrintExportLog, this.changeExportLogStatus(this.canPrintExportLog)
                        }), 500),
                        onBatchExportClick: Object(l["debounce"])((function() {
                            st["b"].getExport().onBatchExportClick(this.batchExportPath)
                        }), 500),
                        openWorkspace: Object(l["debounce"])((async function(t) {
                            if ("work" === t) {
                                const t = await it["a"].getWorkSpacePath();
                                console.log("Workspace: ", t), await Object(Z["b"])(t)
                            } else if ("user" === t) {
                                const t = await it["a"].getPath("userData");
                                console.log("userData: ", t), await Object(Z["b"])(t)
                            }
                        }), 500),
                        onViewGpuClick() {
                            n["a"].send("on-show-webgpu")
                        },
                        onCrashTestClick() {
                            n["a"].send("on-crash-test")
                        },
                        onExportCrashTestClick() {
                            st["b"].getExport().asyncTestCrash()
                        },
                        onReportCrashClick() {
                            st["b"].getExport().asyncReportCrash()
                        },
                        async onGetCpuInfoClick() {
                            let t = await it["a"].getCpuInfo();
                            console.log("cpuObj originCpuName: ", t.originCpuName), console.log("cpuObj cpuName: ", t.cpuName)
                        },
                        async updateCacheMessageCount() {
                            await n["a"].send("update_cacheMessage_count", {
                                count: Number(this.sendGtagNumber.number)
                            })
                        }
                    }
                },
                nt = at,
                ot = (i("56a8"), Object(E["a"])(nt, K, Y, !1, null, "8f6776c0", null)),
                ct = ot.exports,
                lt = i("9128"),
                rt = i("bdb8"),
                ut = i("c75e"),
                pt = o["default"].extend({
                    name: "NavEntryGroup",
                    mixins: [m["a"], h["a"]],
                    components: {
                        "el-tooltip": b["Tooltip"],
                        "el-divider": b["Divider"],
                        "el-button": b["Button"],
                        UserInfoPopover: D,
                        HelperMenu: T["a"],
                        GpuSwitchDialog: M["a"],
                        ReceiveFreeDialog: R,
                        PayTipPopover: J,
                        DebugPopover: ct,
                        PaySuccessDialog: N
                    },
                    props: {
                        navList: {
                            type: Array,
                            default: () => []
                        },
                        darkVip: {
                            type: Boolean,
                            default: !1
                        }
                    },
                    setup(t) {
                        var e;
                        const i = null === (e = Object(o["getCurrentInstance"])()) || void 0 === e ? void 0 : e.proxy,
                            s = Object(o["computed"])(() => i.$route.name),
                            a = Object(o["computed"])(() => c["a"].getters.isVip),
                            m = Object(o["computed"])(() => c["a"].getters.user),
                            h = Object(o["ref"])(!1),
                            b = Object(o["ref"])("default");
                        if (null !== t && void 0 !== t && t.navList.includes("set")) {
                            const t = () => {
                                b.value = "export", h.value = !0
                            };
                            ut["a"].$on("showPhotoshopPathSet", t), Object(o["onUnmounted"])(() => {
                                ut["a"].$off("showPhotoshopPathSet", t)
                            })
                        }
                        const g = Object(l["debounce"])((function() {
                                c["a"].dispatch("ExitLogin"), c["a"].commit("clearExportTask"), i.$router.replace({
                                    name: "Login"
                                }), i.$tsStat.logout()
                            }), 200),
                            f = () => {
                                O();
                                const t = {
                                        photoFinishing: "init_refine_non_member",
                                        exportList: "init_export_list_non_member",
                                        batchRetouch: "init_gallery_non_member",
                                        index: "init_workbench_non_member"
                                    },
                                    e = {
                                        photoFinishing: "init_refine_member",
                                        exportList: "init_export_list_member",
                                        batchRetouch: "init_gallery_member",
                                        index: "init_workbench_member"
                                    },
                                    n = 1 === a.value ? e[s.value] : t[s.value];
                                n && i.$tsStat.event("cake_avatar", {
                                    cake_operate: n
                                })
                            },
                            C = Object(o["computed"])(() => c["a"].getters.getIconDisabled),
                            k = Object(o["computed"])(() => c["a"].getters["project/activeProjectId"]),
                            w = () => {
                                let t = p["a"].shareInstance().imageViewModelQueue;
                                if (null == t || 0 === t.size) return void(null === i || void 0 === i || i.$router.push({
                                    path: "photoFinishing",
                                    query: {}
                                }));
                                let e = Array.from(t);
                                e = e.sort((function(t, e) {
                                    return t[1].imgIndex - e[1].imgIndex
                                }));
                                let s = null;
                                for (const i of e)
                                    if (i[1].isImportantSelected) {
                                        s = i[1];
                                        break
                                    } null == s && (s = e[0][1]);
                                let a = new d["e"];
                                a.userId = i.$store.state.user.userId, a.projectId = k.value, a.originalImagePath = s.imgPath, c["a"].commit("thumbnail/_SetActiveThumbnail", {
                                    imgPath: s.imgPath,
                                    imgIndex: s.imgIndex
                                }), i.$router.push({
                                    path: "photoFinishing",
                                    query: {}
                                })
                            },
                            y = Object(l["debounce"])((function(t) {
                                if (t !== s.value)
                                    if ("photoFinishing" === t) w();
                                    else {
                                        if (C.value) return;
                                        null === i || void 0 === i || i.$router.push({
                                            name: t,
                                            query: {
                                                index: i.$route.query.index
                                            }
                                        })
                                    }
                            }), 300),
                            {
                                PointInitExportTable: P
                            } = Object(rt["a"])(),
                            x = () => {
                                C.value || (null === i || void 0 === i || i.tsNotifyClose(), P(a.value), y("exportList"))
                            },
                            S = () => {
                                n["a"].send("open-receive-free-window", null)
                            },
                            I = Object(o["ref"])(!1);
                        v["a"].getInstance().getShowCompleteInfo().then(t => {
                            I.value = t
                        });
                        const E = Object(o["ref"])(!1),
                            O = () => {
                                let t = m.value,
                                    e = c["a"].state.config.configModel.onVipPlanClick;
                                t && t.isVip ? Object(o["nextTick"])(() => {
                                    E.value = t.leftNum < 50 && !e
                                }) : E.value = !1
                            },
                            N = () => {
                                null === i || void 0 === i || i.PointMemberPriceClick(), n["a"].send("open-member-plan-window", null), c["a"].commit("config/updateConfig", {
                                    onVipPlanClick: !0
                                }), O()
                            },
                            L = async () => {
                                await v["a"].getInstance().setShowCompleteInfo(!1), I.value = !1, lt["c"].removeListener(lt["a"].SignalUpdateShowCompleteInfo)
                            };
                        Object(o["onMounted"])(async () => {
                            lt["c"].addListener(lt["a"].SignalUpdateShowCompleteInfo, L)
                        }), Object(o["onUnmounted"])(() => {
                            E.value = !1, lt["c"].removeListener(lt["a"].SignalUpdateShowCompleteInfo)
                        }), Object(o["watch"])(() => null === t || void 0 === t ? void 0 : t.navList, () => {
                            E.value && (E.value = !1, Object(o["nextTick"])(() => {
                                setTimeout(() => {
                                    E.value = !0
                                }, 300)
                            }))
                        });
                        const {
                            PointNavMenuClick: j
                        } = Object(_["a"])(), $ = Object(o["computed"])(() => c["a"].getters.navMenus), D = Object(l["debounce"])(t => {
                            t.url ? (t.openLink(), j(t.key)) : i.tsNotify("页面不存在，请检查后再试")
                        }, 300);
                        return {
                            IS_CLIENT_PixCake_EXPO: r["w"],
                            IS_CLIENT_PIX_PIE: r["v"],
                            LOGO_RELATIVE_PATH: u["c"],
                            routeNameComp: s,
                            isDebugEnv: Object(o["computed"])(() => c["a"].getters["config/isDebugEnv"]),
                            showPaySuccess: Object(o["computed"])(() => c["a"].state.order.showPaySuccess),
                            isVip: a,
                            user: m,
                            logout: g,
                            sendUserInfoPoint: f,
                            setShowPayTip: O,
                            exportNumber: Object(o["computed"])(() => c["a"].state.export.exportNumber),
                            getIconDisabled: C,
                            handleGoexportlist: x,
                            showGpuSwitchSetting: h,
                            onReceiveFreeClick: S,
                            showCompleteInfo: I,
                            showPayTip: E,
                            onShowVipPlanClick: N,
                            navMenus: $,
                            onClickNavMenu: D,
                            gpuSettingActiveTab: b
                        }
                    }
                }),
                dt = pt,
                vt = (i("8f68"), Object(E["a"])(dt, s, a, !1, null, "3bba4e16", null));
            e["a"] = vt.exports
        },
        "48ac": function(t, e, i) {},
        "56a8": function(t, e, i) {
            "use strict";
            i("48ac")
        },
        "620c": function(t, e, i) {
            "use strict";
            i.d(e, "a", (function() {
                return s
            }));
            class s {
                constructor() {
                    this._instance = null, this.imageIoQueue = new Map, this.imageViewModelQueue = new Map, this.imageDataQueue = new Map, this.renderImageDataQue = new Map, this._thumbnailWidth = 0, this.qrcEngineMap = new Map, this.errorHandle = null, this.successHandle = null
                }
                static shareInstance() {
                    return this._instance || (this._instance = new s), this._instance
                }
            }
        },
        "65ea": function(t, e, i) {},
        "7b38": function(t, e, i) {
            "use strict";
            i("caad");
            e["a"] = {
                methods: {
                    cancelBlur(t) {
                        let e = t.target;
                        console.log("==> cancelBlur", e.nodeName), e.nodeName && ["i", "span"].includes(e.nodeName.toLocaleLowerCase()) && (e = t.target.parentNode), e.blur()
                    },
                    removeCollapseItemTabindex(t) {
                        const e = t;
                        e && e.$el.firstChild.firstChild.setAttribute("tabindex", "")
                    },
                    removeCollapseTabindex(t) {
                        const e = t;
                        e && e.$children.forEach(t => {
                            t.$el.firstChild.firstChild.setAttribute("tabindex", "")
                        })
                    }
                }
            }
        },
        "8f68": function(t, e, i) {
            "use strict";
            i("0fcb")
        },
        "95bf": function(t, e, i) {
            "use strict";
            i("c267")
        },
        "987c": function(t, e, i) {
            "use strict";
            i("0dd9")
        },
        c267: function(t, e, i) {},
        c3b8: function(t, e, i) {
            "use strict";
            i("fb6f")
        },
        c75e: function(t, e, i) {
            "use strict";
            var s = i("2b0e");
            e["a"] = new s["default"]
        },
        fb6f: function(t, e, i) {}
    }
]);
//# sourceMappingURL=chunk-2462abde.a24a6890.js.map