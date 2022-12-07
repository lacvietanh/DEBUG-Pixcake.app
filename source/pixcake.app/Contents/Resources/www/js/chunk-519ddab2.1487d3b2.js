(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-519ddab2"], {
        "1c8b": function(e, t, n) {
            "use strict";
            n.r(t);
            var a = function() {
                    var e = this,
                        t = e._self._c;
                    return t("el-container", {
                        staticClass: "page-container"
                    }, [t("el-header", {
                        staticClass: "container-header global__top-nav"
                    }, [t("MainFuncHeader")], 1), t("el-container", {
                        staticClass: "container-content"
                    }, [t("el-main", {
                        staticClass: "main",
                        style: "padding: 0"
                    }, [t("keep-alive", {
                        attrs: {
                            include: e.KEEP_ALIVE_PAGE
                        }
                    }, [t("router-view")], 1)], 1)], 1)], 1)
                },
                i = [],
                o = n("5c96"),
                r = (n("caad"), function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "nav global__top-nav"
                    }, [t("div", {
                        staticClass: "left-func-container"
                    }, [e.showReturnBtn ? [t("el-button", {
                        staticClass: "return-home-btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: e.exportListBack
                        }
                    }, [t("i", {
                        staticClass: "el-icon-arrow-left return-icon"
                    }), t("span", {
                        staticClass: "label"
                    }, [e._v("返回")])])] : [t("div", {
                        staticClass: "home-logo",
                        on: {
                            dblclick: e.onLogoClick
                        }
                    }, [e.TEXT_LOGO_RELATIVE_PATH ? t("img", {
                        attrs: {
                            src: e.TEXT_LOGO_RELATIVE_PATH,
                            alt: "logo"
                        }
                    }) : e._e()])]], 2), t("div", {
                        staticClass: "right-func"
                    }, [
                        ["exportList"].includes(e.routeName) ? [t("nav-entry-group", {
                            attrs: {
                                "nav-list": ["debug", "navMenus", "vip", "userinfo", "divider", "help", "set"]
                            }
                        })] : [t("nav-entry-group", {
                            ref: "navEntryGroup",
                            attrs: {
                                "nav-list": ["debug", "navMenus", "gift", "free", "vip", "export", "userinfo", "divider", "help", "set"]
                            }
                        })]
                    ], 2)])
                }),
                s = [],
                c = n("2b0e"),
                l = n("25c2"),
                u = n("74d8"),
                d = n("442f"),
                v = n("7b38"),
                p = n("52b8"),
                _ = n("469c"),
                f = n("8ec2"),
                b = {
                    name: "MainFuncHeader",
                    mixins: [d["a"], v["a"], p["a"]],
                    components: {
                        NavEntryGroup: _["a"]
                    },
                    setup(e, {
                        refs: t
                    }) {
                        var n;
                        const a = null === (n = Object(c["getCurrentInstance"])()) || void 0 === n ? void 0 : n.proxy,
                            i = Object(c["computed"])(() => null === a || void 0 === a ? void 0 : a.$route.name),
                            o = Object(c["ref"])(0),
                            r = () => {
                                o.value++, o.value > 3 && f["a"].instance().openDevTool()
                            },
                            s = () => {
                                var e;
                                ["photoFinishing"].includes(i.value) || (null === a || void 0 === a || null === (e = a.$tsStat) || void 0 === e || e.event("cake_export_list", {
                                    cake_operate: "return"
                                }));
                                null === a || void 0 === a || a.$router.go(-1)
                            },
                            d = Object(c["computed"])(() => ["exportList"].includes(i.value)),
                            v = Object(c["ref"])();
                        return Object(c["onMounted"])(() => {
                            var e;
                            null === (e = v.value) || void 0 === e || e.setShowPayTip()
                        }), {
                            navEntryGroup: v,
                            TEXT_LOGO_RELATIVE_PATH: u["d"],
                            LOGO_RELATIVE_PATH: u["c"],
                            clientName: l["b"],
                            routerName: i,
                            showReturnBtn: d,
                            exportListBack: s,
                            onLogoClick: r,
                            clickTime: o
                        }
                    }
                },
                E = b,
                m = (n("6049"), n("2877")),
                g = Object(m["a"])(E, r, s, !1, null, "74a7229f", null),
                h = g.exports,
                L = {
                    name: "DefaultLayout",
                    components: {
                        "el-container": o["Container"],
                        "el-header": o["Header"],
                        "el-main": o["Main"],
                        MainFuncHeader: h
                    },
                    setup(e) {
                        return {
                            KEEP_ALIVE_PAGE: []
                        }
                    }
                },
                T = L,
                O = (n("74ed"), Object(m["a"])(T, a, i, !1, null, "f0496560", null));
            t["default"] = O.exports
        },
        "21e4": function(e, t, n) {},
        6049: function(e, t, n) {
            "use strict";
            n("7ee7")
        },
        "74ed": function(e, t, n) {
            "use strict";
            n("21e4")
        },
        "7ee7": function(e, t, n) {}
    }
]);
//# sourceMappingURL=chunk-519ddab2.1487d3b2.js.map