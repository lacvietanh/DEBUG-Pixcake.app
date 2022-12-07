(function(e) {
    function t(t) {
        for (var r, o, c = t[0], i = t[1], l = t[2], f = 0, d = []; f < c.length; f++) o = c[f], Object.prototype.hasOwnProperty.call(a, o) && a[o] && d.push(a[o][0]), a[o] = 0;
        for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
        s && s(t);
        while (d.length) d.shift()();
        return u.push.apply(u, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < u.length; t++) {
            for (var n = u[t], r = !0, o = 1; o < n.length; o++) {
                var c = n[o];
                0 !== a[c] && (r = !1)
            }
            r && (u.splice(t--, 1), e = i(i.s = n[0]))
        }
        return e
    }
    var r = {},
        o = {
            updateWindow: 0
        },
        a = {
            updateWindow: 0
        },
        u = [];

    function c(e) {
        return i.p + "js/" + ({} [e] || e) + "." + {
            "chunk-4d3498e2": "90f5f5a9",
            "chunk-7a7d8f10": "3e96855c",
            "chunk-76d39a1b": "12f2d55b",
            "chunk-b1fa8bc6": "5a6f3795"
        } [e] + ".js"
    }

    function i(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports
    }
    i.e = function(e) {
        var t = [],
            n = {
                "chunk-7a7d8f10": 1,
                "chunk-76d39a1b": 1,
                "chunk-b1fa8bc6": 1
            };
        o[e] ? t.push(o[e]) : 0 !== o[e] && n[e] && t.push(o[e] = new Promise((function(t, n) {
            for (var r = "css/" + ({} [e] || e) + "." + {
                    "chunk-4d3498e2": "31d6cfe0",
                    "chunk-7a7d8f10": "303e6f18",
                    "chunk-76d39a1b": "f81b61cf",
                    "chunk-b1fa8bc6": "0a03dc5a"
                } [e] + ".css", a = i.p + r, u = document.getElementsByTagName("link"), c = 0; c < u.length; c++) {
                var l = u[c],
                    f = l.getAttribute("data-href") || l.getAttribute("href");
                if ("stylesheet" === l.rel && (f === r || f === a)) return t()
            }
            var d = document.getElementsByTagName("style");
            for (c = 0; c < d.length; c++) {
                l = d[c], f = l.getAttribute("data-href");
                if (f === r || f === a) return t()
            }
            var s = document.createElement("link");
            s.rel = "stylesheet", s.type = "text/css", s.onload = t, s.onerror = function(t) {
                var r = t && t.target && t.target.src || a,
                    u = new Error("Loading CSS chunk " + e + " failed.\n(" + r + ")");
                u.code = "CSS_CHUNK_LOAD_FAILED", u.request = r, delete o[e], s.parentNode.removeChild(s), n(u)
            }, s.href = a;
            var p = document.getElementsByTagName("head")[0];
            p.appendChild(s)
        })).then((function() {
            o[e] = 0
        })));
        var r = a[e];
        if (0 !== r)
            if (r) t.push(r[2]);
            else {
                var u = new Promise((function(t, n) {
                    r = a[e] = [t, n]
                }));
                t.push(r[2] = u);
                var l, f = document.createElement("script");
                f.charset = "utf-8", f.timeout = 120, i.nc && f.setAttribute("nonce", i.nc), f.src = c(e);
                var d = new Error;
                l = function(t) {
                    f.onerror = f.onload = null, clearTimeout(s);
                    var n = a[e];
                    if (0 !== n) {
                        if (n) {
                            var r = t && ("load" === t.type ? "missing" : t.type),
                                o = t && t.target && t.target.src;
                            d.message = "Loading chunk " + e + " failed.\n(" + r + ": " + o + ")", d.name = "ChunkLoadError", d.type = r, d.request = o, n[1](d)
                        }
                        a[e] = void 0
                    }
                };
                var s = setTimeout((function() {
                    l({
                        type: "timeout",
                        target: f
                    })
                }), 12e4);
                f.onerror = f.onload = l, document.head.appendChild(f)
            } return Promise.all(t)
    }, i.m = e, i.c = r, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, i.r = function(e) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" === typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) i.d(n, r, function(t) {
                return e[t]
            }.bind(null, r));
        return n
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e["default"]
        } : function() {
            return e
        };
        return i.d(t, "a", t), t
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, i.p = "", i.oe = function(e) {
        throw console.error(e), e
    };
    var l = window["webpackJsonp"] = window["webpackJsonp"] || [],
        f = l.push.bind(l);
    l.push = t, l = l.slice();
    for (var d = 0; d < l.length; d++) t(l[d]);
    var s = f;
    u.push([6, "chunk-vendors", "chunk-common"]), n()
})({
    6: function(e, t, n) {
        e.exports = n("eae1")
    },
    eae1: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n("2b0e"),
            o = n("8c4f"),
            a = n("3dfd"),
            u = (n("d328"), n("3c66"), n("ae98"), n("b692")),
            c = n("26ba"),
            i = (n("d227"), n("b35f")),
            l = n("6ebf"),
            f = n("0613");
        Object(u["a"])("dark"), r["default"].use(o["a"]), r["default"].use(c["a"]), r["default"].config.productionTip = !1, r["default"].config.errorHandler = function(e, t, n) {
            console.error(e)
        }, r["default"].prototype.$getIconPath = i["a"];
        const d = new o["a"]({
            linkExactActiveClass: "link-active",
            scrollBehavior(e, t, n) {
                return {
                    x: 0,
                    y: 0
                }
            },
            routes: [{
                path: "/",
                name: "updateWindow",
                component: () => Promise.all([n.e("chunk-4d3498e2"), n.e("chunk-7a7d8f10")]).then(n.bind(null, "15c8")),
                meta: {
                    title: "提示下载更新"
                }
            }, {
                path: "/updateProgress",
                name: "updateProgress",
                component: () => n.e("chunk-b1fa8bc6").then(n.bind(null, "c713")),
                meta: {
                    title: "下载更新包进度"
                }
            }]
        });
        new r["default"]({
            i18n: l["a"],
            store: f["a"],
            router: d,
            beforeCreate: async function() {
                const e = await Object(l["b"])();
                l["a"].locale = e
            },
            render: e => e(a["a"])
        }).$mount("#app")
    }
});
//# sourceMappingURL=updateWindow.df03ac40.js.map