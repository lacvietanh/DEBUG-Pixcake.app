(function(e) {
  function t(t) {
    for (var a, n, c = t[0], r = t[1], l = t[2], u = 0, d = []; u < c.length; u++) n = c[u], Object.prototype.hasOwnProperty.call(s, n) && s[n] && d.push(s[n][0]), s[n] = 0;
    for (a in r) Object.prototype.hasOwnProperty.call(r, a) && (e[a] = r[a]);
    h && h(t);
    while (d.length) d.shift()();
    return o.push.apply(o, l || []), i()
  }

  function i() {
    for (var e, t = 0; t < o.length; t++) {
      for (var i = o[t], a = !0, n = 1; n < i.length; n++) {
        var c = i[n];
        0 !== s[c] && (a = !1)
      }
      a && (o.splice(t--, 1), e = r(r.s = i[0]))
    }
    return e
  }
  var a = {},
    n = {
      index: 0
    },
    s = {
      index: 0
    },
    o = [];

  function c(e) {
    return r.p + "js/" + ({} [e] || e) + "." + {
      "chunk-236302bd": "c0dbd822",
      "chunk-2462abde": "a24a6890",
      "chunk-519ddab2": "1487d3b2",
      "chunk-be22945a": "87b8c2bd",
      "chunk-3aa35bb6": "24828a6a",
      "chunk-7091432f": "cf28b551",
      "chunk-79719501": "0eb95de0",
      "chunk-76d39a1b": "12f2d55b",
      "chunk-7e536582": "bf41dd79",
      "chunk-c91d35a6": "09d1815f",
      "chunk-4ba3a1af": "a2eed381",
      "chunk-6b7f39ea": "ca2e1109",
      "chunk-43f57a8f": "372369b9",
      "chunk-d650e566": "9fac4b6d"
    } [e] + ".js"
  }

  function r(t) {
    if (a[t]) return a[t].exports;
    var i = a[t] = {
      i: t,
      l: !1,
      exports: {}
    };
    return e[t].call(i.exports, i, i.exports, r), i.l = !0, i.exports
  }
  r.e = function(e) {
    var t = [],
      i = {
        "chunk-236302bd": 1,
        "chunk-2462abde": 1,
        "chunk-519ddab2": 1,
        "chunk-be22945a": 1,
        "chunk-3aa35bb6": 1,
        "chunk-79719501": 1,
        "chunk-76d39a1b": 1,
        "chunk-7e536582": 1,
        "chunk-c91d35a6": 1,
        "chunk-4ba3a1af": 1,
        "chunk-6b7f39ea": 1,
        "chunk-43f57a8f": 1,
        "chunk-d650e566": 1
      };
    n[e] ? t.push(n[e]) : 0 !== n[e] && i[e] && t.push(n[e] = new Promise((function(t, i) {
      for (var a = "css/" + ({} [e] || e) + "." + {
          "chunk-236302bd": "a9b53cac",
          "chunk-2462abde": "38e2aa30",
          "chunk-519ddab2": "a47f5535",
          "chunk-be22945a": "6e77c618",
          "chunk-3aa35bb6": "c682cf29",
          "chunk-7091432f": "31d6cfe0",
          "chunk-79719501": "ee3fb8aa",
          "chunk-76d39a1b": "f81b61cf",
          "chunk-7e536582": "4cb61bc6",
          "chunk-c91d35a6": "ecc2b176",
          "chunk-4ba3a1af": "b313323e",
          "chunk-6b7f39ea": "198a7670",
          "chunk-43f57a8f": "a20f83ec",
          "chunk-d650e566": "71b813fe"
        } [e] + ".css", s = r.p + a, o = document.getElementsByTagName("link"), c = 0; c < o.length; c++) {
        var l = o[c],
          u = l.getAttribute("data-href") || l.getAttribute("href");
        if ("stylesheet" === l.rel && (u === a || u === s)) return t()
      }
      var d = document.getElementsByTagName("style");
      for (c = 0; c < d.length; c++) {
        l = d[c], u = l.getAttribute("data-href");
        if (u === a || u === s) return t()
      }
      var h = document.createElement("link");
      h.rel = "stylesheet", h.type = "text/css", h.onload = t, h.onerror = function(t) {
        var a = t && t.target && t.target.src || s,
          o = new Error("Loading CSS chunk " + e + " failed.\n(" + a + ")");
        o.code = "CSS_CHUNK_LOAD_FAILED", o.request = a, delete n[e], h.parentNode.removeChild(h), i(o)
      }, h.href = s;
      var p = document.getElementsByTagName("head")[0];
      p.appendChild(h)
    })).then((function() {
      n[e] = 0
    })));
    var a = s[e];
    if (0 !== a)
      if (a) t.push(a[2]);
      else {
        var o = new Promise((function(t, i) {
          a = s[e] = [t, i]
        }));
        t.push(a[2] = o);
        var l, u = document.createElement("script");
        u.charset = "utf-8", u.timeout = 120, r.nc && u.setAttribute("nonce", r.nc), u.src = c(e);
        var d = new Error;
        l = function(t) {
          u.onerror = u.onload = null, clearTimeout(h);
          var i = s[e];
          if (0 !== i) {
            if (i) {
              var a = t && ("load" === t.type ? "missing" : t.type),
                n = t && t.target && t.target.src;
              d.message = "Loading chunk " + e + " failed.\n(" + a + ": " + n + ")", d.name = "ChunkLoadError", d.type = a, d.request = n, i[1](d)
            }
            s[e] = void 0
          }
        };
        var h = setTimeout((function() {
          l({
            type: "timeout",
            target: u
          })
        }), 12e4);
        u.onerror = u.onload = l, document.head.appendChild(u)
      } return Promise.all(t)
  }, r.m = e, r.c = a, r.d = function(e, t, i) {
    r.o(e, t) || Object.defineProperty(e, t, {
      enumerable: !0,
      get: i
    })
  }, r.r = function(e) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    })
  }, r.t = function(e, t) {
    if (1 & t && (e = r(e)), 8 & t) return e;
    if (4 & t && "object" === typeof e && e && e.__esModule) return e;
    var i = Object.create(null);
    if (r.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e)
      for (var a in e) r.d(i, a, function(t) {
        return e[t]
      }.bind(null, a));
    return i
  }, r.n = function(e) {
    var t = e && e.__esModule ? function() {
      return e["default"]
    } : function() {
      return e
    };
    return r.d(t, "a", t), t
  }, r.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, r.p = "", r.oe = function(e) {
    throw console.error(e), e
  };
  var l = window["webpackJsonp"] = window["webpackJsonp"] || [],
    u = l.push.bind(l);
  l.push = t, l = l.slice();
  for (var d = 0; d < l.length; d++) t(l[d]);
  var h = u;
  o.push([1, "chunk-vendors", "chunk-common"]), i()
})({
  "0a6c": function(e, t, i) {},
  "0d35": function(e, t, i) {
    e.exports = i.p + "img/workbench_logo.119af7d8.png"
  },
  1: function(e, t, i) {
    e.exports = i("cd49")
  },
  "13a7": function(e, t, i) {
    "use strict";
    i.d(t, "a", (function() {
      return r
    }));
    var a = i("2b0e"),
      n = i("64a0"),
      s = i("5c96"),
      o = i("2ef0");

    function c(e) {
      let t = new n["a"];
      t.process([n["b"].Mouse, n["b"].KeyBoard], e)
    }

    function r() {
      var e;
      const t = null === (e = Object(a["getCurrentInstance"])()) || void 0 === e ? void 0 : e.proxy.$createElement,
        i = Object(a["ref"])("Hệ thống nhắc"),
        n = Object(a["ref"])("success"),
        r = Object(a["ref"])(null),
        l = (e, t = "custom") => {
          Object(s["Message"])({
            type: t || n.value,
            offset: 68,
            message: e,
            duration: 4e3,
            customClass: t
          })
        },
        u = () => {
          r.value && (r.value.close(), r.value = null)
        },
        d = Object(o["debounce"])((function(e = {}, t = {
          duration: 4e3
        }) {
          if (!e) return;
          u();
          let i = {
            message: "string" === typeof e ? e : e.message,
            offset: 68,
            type: "custom",
            duration: 4e3,
            customClass: "custom",
            ...t
          };
          r.value = Object(s["Message"])(i)
        }), 300, {
          maxWait: 1500,
          leading: !0
        }),
        h = (e = {}) => {
          const a = e.title || i.value,
            n = e.message || "",
            o = !e.hasOwnProperty("showTitle") || e.showTitle,
            r = e.hasOwnProperty("customTitleEl") ? e.customTitleEl : null,
            l = e.hasOwnProperty("customMessageEl") ? e.customMessageEl : null,
            u = e.hasOwnProperty("customMessageStyle") ? e.customMessageStyle : "",
            d = e.needHandleReject,
            h = {
              ...e
            };
          return delete h.title, delete h.message, new Promise((e, i) => {
            let p = [t("p", {
              style: "font-size: 14px; " + u
            }, n)];
            l && (p = [l]), o && null == r && p.unshift(t("p", {
              style: "font-size: 16px;font-weight: 500; margin: 12px 0 16px"
            }, a)), o && r && p.unshift(r), c(!1), s["MessageBox"].confirm(n, "", {
              ...h,
              confirmButtonText: h.confirmButtonText || "Xác nhận",
              cancelButtonText: h.cancelButtonText || "Hủy",
              customClass: "customConfirmClass",
              message: t("div", {
                class: "customConfirmClass-content",
                style: "line-height: 24px; font-weight: 400;"
              }, p),
              iconClass: "",
              center: !0
            }).then(t => {
              c(!0), e()
            }).catch(e => {
              c(!0), ("boolean" !== typeof h.showCancelButton || h.showCancelButton || d) && i(e)
            })
          })
        },
        p = (e = {}) => {
          const t = e.message || "",
            i = !e.hasOwnProperty("showCancelButton") || e.showCancelButton;
          return new Promise((a, n) => {
            c(!1), s["MessageBox"].confirm(t, "", {
              confirmButtonText: e.confirmButtonText || "Xác nhận",
              cancelButtonText: e.cancelButtonText || "Hủy",
              customClass: "customConfirmClass",
              dangerouslyUseHTMLString: !0,
              showCancelButton: i,
              iconClass: "",
              center: !0
            }).then(e => {
              c(!0), a()
            }).catch(() => {
              c(!0), i && n()
            })
          })
        };
      return {
        tsMessage: l,
        tsNotify: d,
        tsNotifyClose: u,
        tsConfirm: h,
        tsConfirmForUseHtml: p
      }
    }
  },
  "15f1": function(e, t, i) {},
  2009: function(e, t, i) {},
  "22ca": function(e, t, i) {},
  "26ea": function(e, t, i) {
    "use strict";
    i("4d7b")
  },
  "2a00": function(e, t, i) {
    e.exports = i.p + "img/pop_icon_update_logo@3x.4276436d.png"
  },
  3010: function(e, t, i) {
    "use strict";
    i.d(t, "a", (function() {
      return n
    }));
    var a = i("67a1");
    class n {
      constructor() {
        this._isListenShortcut = !1, this._invokedListener = null
      }
      static getInstance() {
        return this._instance || (this._instance = new n), this._instance
      }
      onKeyboardShortcutInvoked(e) {
        this._invokedListener = e, null === a["a"] || void 0 === a["a"] || a["a"].on("onKeyboardShortcutInvoked", (t, i) => {
          e(t, i)
        }), this._isListenShortcut = !0, this.registerShortcut()
      }
      removeKeyboardShortcutInvoked() {
        this.unRegisterShortcut(), null === a["a"] || void 0 === a["a"] || a["a"].removeAllListeners("onKeyboardShortcutInvoked"), this._invokedListener = null, this._isListenShortcut = !1
      }
      registerShortcut() {
        this._isListenShortcut && (null === a["a"] || void 0 === a["a"] || a["a"].send("registerKeyboardShortcut"))
      }
      unRegisterShortcut() {
        this._isListenShortcut && (null === a["a"] || void 0 === a["a"] || a["a"].send("unRegisterKeyboardShortcut"))
      }
      addClientFocusListener() {
        window.removeEventListener("focus", this.registerShortcut), window.addEventListener("focus", this.registerShortcut), window.removeEventListener("blur", this.unRegisterShortcut), window.addEventListener("blur", this.unRegisterShortcut)
      }
    }
  },
  3370: function(e, t, i) {},
  "33c2": function(e, t, i) {
    "use strict";
    i("f4ab")
  },
  "3c0a": function(e, t, i) {
    "use strict";
    i("15f1")
  },
  4088: function(e, t, i) {
    "use strict";
    i("6ec2")
  },
  "442f": function(e, t, i) {
    "use strict";
    var a = i("5c96"),
      n = i("2ef0"),
      s = (i("67a1"), i("0613"), i("64a0"));

    function o(e) {
      let t = new s["a"];
      t.process([s["b"].Mouse, s["b"].KeyBoard], e)
    }
    t["a"] = {
      data() {
        return {
          defaultTitle: "Hệ thống nhắc",
          defaultType: "success",
          lastNotification: null
        }
      },
      methods: {
        tsMessage(e, t = "custom") {
          Object(a["Message"])({
            offset: 68,
            type: t,
            message: e,
            duration: 4e3,
            customClass: t
          })
        },
        tsNotifyClose() {
          this.lastNotification && (this.lastNotification.close(), this.lastNotification = null)
        },
        tsNotify: Object(n["debounce"])((function(e = {}, t = {
          duration: 4e3
        }) {
          if (!e) return;
          this.lastNotification && this.lastNotification.close();
          const i = t.hasOwnProperty("duration") ? t.duration : 4e3;
          let n = "",
            s = "";
          "string" === typeof e ? (n = e, s = this.defaultTitle) : (n = e.message, s = e.title || this.defaultTitle), this.lastNotification = Object(a["Message"])({
            message: n,
            offset: 68,
            type: "custom",
            duration: i,
            ...t,
            customClass: "custom"
          })
        }), 300, {
          maxWait: 1500,
          leading: !0
        }),
        tsConfirm(e = {}) {
          const t = e.title || this.defaultTitle,
            i = e.message || "",
            n = !e.hasOwnProperty("showTitle") || e.showTitle,
            s = e.hasOwnProperty("customTitleEl") ? e.customTitleEl : null,
            c = e.hasOwnProperty("customMessageEl") ? e.customMessageEl : null,
            r = e.hasOwnProperty("customMessageStyle") ? e.customMessageStyle : "",
            l = e.needHandleReject,
            u = {
              ...e
            };
          delete u.title, delete u.message;
          const d = this.$createElement;
          return new Promise((e, h) => {
            let p = [d("p", {
              style: "font-size: 14px; " + r
            }, i)];
            c && (p = [c]), n && null == s && p.unshift(d("p", {
              style: "font-size: 16px;font-weight: 500; margin: 12px 0 16px"
            }, t)), n && s && p.unshift(s), o(!1), a["MessageBox"].confirm(i, "", {
              ...u,
              confirmButtonText: u.confirmButtonText || "Xác nhận",
              cancelButtonText: u.cancelButtonText || "Hủy",
              customClass: "customConfirmClass",
              message: d("div", {
                class: "customConfirmClass-content",
                style: "line-height: 24px; font-weight: 400;"
              }, p),
              iconClass: "",
              center: !0
            }).then(t => {
              o(!0), e()
            }).catch(e => {
              o(!0), ("boolean" !== typeof u.showCancelButton || "boolean" === typeof u.showCancelButton && u.showCancelButton || l) && h(e)
            })
          })
        },
        tsConfirmForUseHtml(e = {}) {
          const t = e.message || "",
            i = !e.hasOwnProperty("showCancelButton") || e.showCancelButton;
          return new Promise((n, s) => {
            o(!1), a["MessageBox"].confirm(t, "", {
              confirmButtonText: e.confirmButtonText || "Xác nhận",
              cancelButtonText: e.cancelButtonText || "Hủy",
              customClass: "customConfirmClass",
              dangerouslyUseHTMLString: !0,
              showCancelButton: i,
              iconClass: "",
              center: !0
            }).then(e => {
              o(!0), n()
            }).catch(() => {
              o(!0), i && s()
            })
          })
        }
      }
    }
  },
  4678: function(e, t, i) {
    var a = {
      "./af": "2bfb",
      "./af.js": "2bfb",
      "./ar": "8e73",
      "./ar-dz": "a356",
      "./ar-dz.js": "a356",
      "./ar-kw": "423e",
      "./ar-kw.js": "423e",
      "./ar-ly": "1cfd",
      "./ar-ly.js": "1cfd",
      "./ar-ma": "0a84",
      "./ar-ma.js": "0a84",
      "./ar-sa": "8230",
      "./ar-sa.js": "8230",
      "./ar-tn": "6d83",
      "./ar-tn.js": "6d83",
      "./ar.js": "8e73",
      "./az": "485c",
      "./az.js": "485c",
      "./be": "1fc1",
      "./be.js": "1fc1",
      "./bg": "84aa",
      "./bg.js": "84aa",
      "./bm": "a7fa",
      "./bm.js": "a7fa",
      "./bn": "9043",
      "./bn-bd": "9686",
      "./bn-bd.js": "9686",
      "./bn.js": "9043",
      "./bo": "d26a",
      "./bo.js": "d26a",
      "./br": "6887",
      "./br.js": "6887",
      "./bs": "2554",
      "./bs.js": "2554",
      "./ca": "d716",
      "./ca.js": "d716",
      "./cs": "3c0d",
      "./cs.js": "3c0d",
      "./cv": "03ec",
      "./cv.js": "03ec",
      "./cy": "9797",
      "./cy.js": "9797",
      "./da": "0f14",
      "./da.js": "0f14",
      "./de": "b469",
      "./de-at": "b3eb",
      "./de-at.js": "b3eb",
      "./de-ch": "bb71",
      "./de-ch.js": "bb71",
      "./de.js": "b469",
      "./dv": "598a",
      "./dv.js": "598a",
      "./el": "8d47",
      "./el.js": "8d47",
      "./en-au": "0e6b",
      "./en-au.js": "0e6b",
      "./en-ca": "3886",
      "./en-ca.js": "3886",
      "./en-gb": "39a6",
      "./en-gb.js": "39a6",
      "./en-ie": "e1d3",
      "./en-ie.js": "e1d3",
      "./en-il": "7333",
      "./en-il.js": "7333",
      "./en-in": "ec2e",
      "./en-in.js": "ec2e",
      "./en-nz": "6f50",
      "./en-nz.js": "6f50",
      "./en-sg": "b7e9",
      "./en-sg.js": "b7e9",
      "./eo": "65db",
      "./eo.js": "65db",
      "./es": "898b",
      "./es-do": "0a3c",
      "./es-do.js": "0a3c",
      "./es-mx": "b5b7",
      "./es-mx.js": "b5b7",
      "./es-us": "55c9",
      "./es-us.js": "55c9",
      "./es.js": "898b",
      "./et": "ec18",
      "./et.js": "ec18",
      "./eu": "0ff2",
      "./eu.js": "0ff2",
      "./fa": "8df4",
      "./fa.js": "8df4",
      "./fi": "81e9",
      "./fi.js": "81e9",
      "./fil": "d69a",
      "./fil.js": "d69a",
      "./fo": "0721",
      "./fo.js": "0721",
      "./fr": "9f26",
      "./fr-ca": "d9f8",
      "./fr-ca.js": "d9f8",
      "./fr-ch": "0e49",
      "./fr-ch.js": "0e49",
      "./fr.js": "9f26",
      "./fy": "7118",
      "./fy.js": "7118",
      "./ga": "5120",
      "./ga.js": "5120",
      "./gd": "f6b4",
      "./gd.js": "f6b4",
      "./gl": "8840",
      "./gl.js": "8840",
      "./gom-deva": "aaf2",
      "./gom-deva.js": "aaf2",
      "./gom-latn": "0caa",
      "./gom-latn.js": "0caa",
      "./gu": "e0c5",
      "./gu.js": "e0c5",
      "./he": "c7aa",
      "./he.js": "c7aa",
      "./hi": "dc4d",
      "./hi.js": "dc4d",
      "./hr": "4ba9",
      "./hr.js": "4ba9",
      "./hu": "5b14",
      "./hu.js": "5b14",
      "./hy-am": "d6b6",
      "./hy-am.js": "d6b6",
      "./id": "5038",
      "./id.js": "5038",
      "./is": "0558",
      "./is.js": "0558",
      "./it": "6e98",
      "./it-ch": "6f12",
      "./it-ch.js": "6f12",
      "./it.js": "6e98",
      "./ja": "079e",
      "./ja.js": "079e",
      "./jv": "b540",
      "./jv.js": "b540",
      "./ka": "201b",
      "./ka.js": "201b",
      "./kk": "6d79",
      "./kk.js": "6d79",
      "./km": "e81d",
      "./km.js": "e81d",
      "./kn": "3e92",
      "./kn.js": "3e92",
      "./ko": "22f8",
      "./ko.js": "22f8",
      "./ku": "2421",
      "./ku.js": "2421",
      "./ky": "9609",
      "./ky.js": "9609",
      "./lb": "440c",
      "./lb.js": "440c",
      "./lo": "b29d",
      "./lo.js": "b29d",
      "./lt": "26f9",
      "./lt.js": "26f9",
      "./lv": "b97c",
      "./lv.js": "b97c",
      "./me": "293c",
      "./me.js": "293c",
      "./mi": "688b",
      "./mi.js": "688b",
      "./mk": "6909",
      "./mk.js": "6909",
      "./ml": "02fb",
      "./ml.js": "02fb",
      "./mn": "958b",
      "./mn.js": "958b",
      "./mr": "39bd",
      "./mr.js": "39bd",
      "./ms": "ebe4",
      "./ms-my": "6403",
      "./ms-my.js": "6403",
      "./ms.js": "ebe4",
      "./mt": "1b45",
      "./mt.js": "1b45",
      "./my": "8689",
      "./my.js": "8689",
      "./nb": "6ce3",
      "./nb.js": "6ce3",
      "./ne": "3a39",
      "./ne.js": "3a39",
      "./nl": "facd",
      "./nl-be": "db29",
      "./nl-be.js": "db29",
      "./nl.js": "facd",
      "./nn": "b84c",
      "./nn.js": "b84c",
      "./oc-lnc": "167b",
      "./oc-lnc.js": "167b",
      "./pa-in": "f3ff",
      "./pa-in.js": "f3ff",
      "./pl": "8d57",
      "./pl.js": "8d57",
      "./pt": "f260",
      "./pt-br": "d2d4",
      "./pt-br.js": "d2d4",
      "./pt.js": "f260",
      "./ro": "972c",
      "./ro.js": "972c",
      "./ru": "957c",
      "./ru.js": "957c",
      "./sd": "6784",
      "./sd.js": "6784",
      "./se": "ffff",
      "./se.js": "ffff",
      "./si": "eda5",
      "./si.js": "eda5",
      "./sk": "7be6",
      "./sk.js": "7be6",
      "./sl": "8155",
      "./sl.js": "8155",
      "./sq": "c8f3",
      "./sq.js": "c8f3",
      "./sr": "cf1e",
      "./sr-cyrl": "13e9",
      "./sr-cyrl.js": "13e9",
      "./sr.js": "cf1e",
      "./ss": "52bd",
      "./ss.js": "52bd",
      "./sv": "5fbd",
      "./sv.js": "5fbd",
      "./sw": "74dc",
      "./sw.js": "74dc",
      "./ta": "3de5",
      "./ta.js": "3de5",
      "./te": "5cbb",
      "./te.js": "5cbb",
      "./tet": "576c",
      "./tet.js": "576c",
      "./tg": "3b1b",
      "./tg.js": "3b1b",
      "./th": "10e8",
      "./th.js": "10e8",
      "./tk": "5aff",
      "./tk.js": "5aff",
      "./tl-ph": "0f38",
      "./tl-ph.js": "0f38",
      "./tlh": "cf75",
      "./tlh.js": "cf75",
      "./tr": "0e81",
      "./tr.js": "0e81",
      "./tzl": "cf51",
      "./tzl.js": "cf51",
      "./tzm": "c109",
      "./tzm-latn": "b53d",
      "./tzm-latn.js": "b53d",
      "./tzm.js": "c109",
      "./ug-cn": "6117",
      "./ug-cn.js": "6117",
      "./uk": "ada2",
      "./uk.js": "ada2",
      "./ur": "5294",
      "./ur.js": "5294",
      "./uz": "2e8c",
      "./uz-latn": "010e",
      "./uz-latn.js": "010e",
      "./uz.js": "2e8c",
      "./vi": "2921",
      "./vi.js": "2921",
      "./x-pseudo": "fd7e",
      "./x-pseudo.js": "fd7e",
      "./yo": "7f33",
      "./yo.js": "7f33",
      "./zh-cn": "5c3a",
      "./zh-cn.js": "5c3a",
      "./zh-hk": "49ab",
      "./zh-hk.js": "49ab",
      "./zh-mo": "3a6c",
      "./zh-mo.js": "3a6c",
      "./zh-tw": "90ea",
      "./zh-tw.js": "90ea"
    };

    function n(e) {
      var t = s(e);
      return i(t)
    }

    function s(e) {
      if (!i.o(a, e)) {
        var t = new Error("Cannot find module '" + e + "'");
        throw t.code = "MODULE_NOT_FOUND", t
      }
      return a[e]
    }
    n.keys = function() {
      return Object.keys(a)
    }, n.resolve = s, e.exports = n, n.id = "4678"
  },
  4966: function(e, t, i) {
    "use strict";
    i("e5bd")
  },
  "4d7b": function(e, t, i) {},
  "52b8": function(e, t, i) {
    "use strict";
    i("caad");
    var a = i("2b0e"),
      n = i("e751"),
      s = i("620a");
    const o = null;

    function c(e, t) {
      return Object.freeze({
        event_id: e,
        data: t
      })
    }

    function r(e, t) {
      const i = s["a"].getInstance();
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
          return !!this._distFigureEvent && c(this._distFigureEvent, {
            cake_operate: n["l"].AddSecond
          })
        },
        PointClickOriginal: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ClickOriginal
        }),
        PointClickFit: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ClickFit
        }),
        PointSwitchGender: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].SwitchGender
        }),
        PointAddPresetButton: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].AddPresetButton
        }),
        PointAddApplyButton: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].AddApplyButton
        }),
        PointImageAdjustment: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ImageAdjustment
        }),
        PointPortraitBeautification: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].PortraitBeautification
        }),
        PointBackgroundAdjustment: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].BackgroundAdjustment
        }),
        PointModifyGender: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ModifyGender
        }),
        PointFeedbackChoose: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].FeedbackChooseCategory
        }),
        PointFeedbackInputContent: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].FeedbackInputContent
        }),
        PointClickSetting: () => c(n["d"].CakeSetting, {
          cake_operate: n["n"].ClickSetting
        }),
        PointClickSettingReturn: () => c(n["d"].CakeSetting, {
          cake_operate: n["n"].ClickReturn
        }),
        PointExportSelectPath: () => c(n["d"].CakeExport, {
          cake_operate: n["f"].SelectPath
        }),
        PointClickBackstage: () => c(n["d"].CakeAvatar, {
          cake_operate: n["c"].ClickBackstage
        }),
        PointClickSmear: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ClickSmear
        }),
        PointClickPreservation: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ClickSmearPreservation
        }),
        PointClickSmearCancel: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ClickSmearCancel
        }),
        PointClickSmearReset: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ClickSmearReset
        }),
        PointClickSmearHistoryBack: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].ClickSmearHistoryBack,
          cake_position: n["l"].ClickHistory
        }),
        PointDoubleClickDot: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].DoubleClickDot
        }),
        PointDoubleClickTitle: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].DoubleClickTitle
        }),
        PointPresetReset: () => c(n["d"].CakeRefine, {
          cake_operate: n["l"].PresetReset
        })
      },
      mounted() {},
      methods: {
        PointAddStar(e) {
          if (e.isFavourite) {
            const e = "photoFinishing" === this.routeName ? n["d"].CakeRefine : n["d"].CakeGallery;
            r(e, {
              cake_operate: n["l"].AddStar
            })
          }
        },
        PointCheckOriginalPhoto() {
          this._distFigureEvent && r(this._distFigureEvent, {
            cake_operate: n["l"].CheckOriginalPhoto
          })
        },
        PointDeleteThumbnail() {
          this._distFigureEvent && r(this._distFigureEvent, {
            cake_operate: n["l"].Delete
          })
        },
        PointDeleteAllThumbnail() {
          this._distFigureEvent && r(this._distFigureEvent, {
            cake_operate: n["l"].DeleteAll
          })
        },
        PointFeedbackClick() {
          this._distFigureEvent && r(this._distFigureEvent, {
            cake_operate: n["l"].Feedback
          })
        },
        PointFeedbackConfirm(e) {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].FeedbackConfirm,
            cake_feedback: JSON.stringify(e)
          })
        },
        PointFeedbackCancel() {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].FeedbackCancel
          })
        },
        PointSavePresetSubmit1() {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].SavePresetSubmit1
          })
        },
        PointSavePresetSubmit2(e) {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].SavePresetSubmit2,
            cake_new_preset2: e
          })
        },
        PointSavePresetCover(e) {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].SavePresetCover,
            cake_override_preset: e
          })
        },
        PointSelectOne() {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].SelectOne
          })
        },
        PointSelectFilter(e) {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].SelectFilter,
            cake_feature: e && e.name || ""
          })
        },
        PointClickSettingClose() {
          r(n["d"].CakeSetting, {
            cake_operate: n["n"].ClickClose
          })
        },
        PointClickSettingConfirm(e) {
          r(n["d"].CakeSetting, {
            cake_operate: n["n"].ClickConfirm,
            cake_value: JSON.stringify(e)
          })
        },
        PointExportAdvancedSetting(e) {
          e && e.length > 0 && r(n["d"].CakeExport, {
            cake_operate: n["f"].AdvancedSettings
          })
        },
        PointExportCancel() {
          r(n["d"].CakeExport, {
            cake_operate: n["f"].Cancel
          })
        },
        PointShowOriginThumb() {
          r(n["d"].CakeSetting, {
            cake_operate: n["f"].OriginThumb
          })
        },
        PointShowEffectThumb() {
          r(n["d"].CakeSetting, {
            cake_operate: n["f"].EffectThumb
          })
        },
        PointExportConfirm(e, t) {
          r(n["d"].CakeExport, {
            cake_operate: n["f"].Confirm,
            cake_setting_value: JSON.stringify(e),
            cake_name: t
          })
        },
        PointExportClick(e, t) {
          const i = this._pointRouteName,
            a = `${t.totalNumber}_xgt${t.totalNumber-t.isNoePresetNumber}_yt${t.isNoePresetNumber}`;
          r(n["d"].CakeExport, {
            cake_operate: n["f"].ExportButton,
            cake_setting_value: `${e}_${i}`,
            cake_position: i,
            cake_feature: a
          })
        },
        PointMemberPriceClick(e) {
          r(n["d"].CakeH5MemberPrice, {
            cake_operate: "init_source",
            source: e || this._pointRouteName
          })
        },
        PointMemberCloseClick() {
          r(n["d"].CakeH5MemberPrice, {
            cake_operate: "close"
          })
        },
        PointDragPanel() {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].DragPanel
          })
        },
        PointSwipeSelect() {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].SwipeSelect
          })
        },
        PointParameterAdjustmentReset() {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].ParameterAdjustmentReset
          })
        },
        PointManualModifyComplete() {
          r(n["d"].CakeRefine, {
            cake_operate: n["i"].clickEffectValue
          })
        },
        PointInviteActivityClick(e) {
          r("activity_entrance_click", {
            ...e
          })
        },
        PointInviteActivityExposure(e) {
          r("Invitation_exposure", {
            ...e
          })
        },
        PointCakeImport(e) {
          r(n["d"].CakeImport, {
            cake_value: e
          })
        },
        PointExportSelectPreset() {
          r(n["d"].CakeExport, {
            cake_operate: n["f"].SelectPreset
          })
        },
        PointExportListDeleteBtn() {
          r(n["d"].CakeExportList, {
            cake_operate: n["e"].DeleteBtn
          })
        },
        PointExportListRetryBtn() {
          r(n["d"].CakeExportList, {
            cake_operate: n["e"].RetryBtn
          })
        },
        PointExportListPauseBtn() {
          r(n["d"].CakeExportList, {
            cake_operate: n["e"].PauseBtn
          })
        },
        PointExportListStartBtn() {
          r(n["d"].CakeExportList, {
            cake_operate: n["e"].StartBtn
          })
        },
        PointExportListPauseAllBtn() {
          r(n["d"].CakeExportList, {
            cake_operate: n["e"].PauseAllBtn
          })
        },
        PointExportListStartAllBtn() {
          r(n["d"].CakeExportList, {
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
          r(n["d"].CakeNewuserGuide, {
            cake_operate: t
          })
        },
        PointClickQuit(e) {
          r(n["d"].CakeNewuserGuide, {
            cake_operate: `${n["g"].ClickQuit}_${e}`
          })
        },
        PointFillInfo() {
          r(n["d"].CakeFillinfo, {})
        },
        PointClientClose() {
          o.on("gtag_page_close", (e, t) => {
            const i = s["a"].getInstance();
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
            s = i[e],
            o = a[t];
          s && o && r(n["d"].CakeRefine, {
            cake_operate: n["l"].ClickSmearTool,
            cake_position: s,
            cake_feature: o
          })
        },
        PointClickSmearClose() {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].ClickSmearClose
          })
        },
        PointZoomCompare(e) {
          r(n["d"].CakeRefine, {
            cake_operate: "zoom_compare",
            cake_position: e
          })
        },
        PointSelectIdPhotoSize(e) {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].SelectIdPhotoSize,
            cake_feature: e && e.label || ""
          })
        },
        PointModifyPhotoDPI(e) {
          r(n["d"].CakeRefine, {
            cake_operate: n["l"].ModifyDPI,
            cake_value: `dpi_${e.typeDPI}_${e.type}`
          })
        }
      }
    })
  },
  "5bc60": function(e, t, i) {},
  "64a0": function(e, t, i) {
    "use strict";
    i.d(t, "b", (function() {
      return s
    })), i.d(t, "a", (function() {
      return o
    }));
    i("d9e2");
    var a = i("67a1");
    let n = 0;
    var s;
    (function(e) {
      e["Mouse"] = "mouse", e["KeyBoard"] = "keyboard"
    })(s || (s = {}));
    class o {
      static getInstance() {
        return this._instance || (this._instance = new o), this._instance
      }
      process(e, t) {
        n += t ? -1 : 1, n < 0 && (n = 0);
        const i = n <= 0;
        for (const n of e) a["a"].send("qt_switch_changed", {
          event: n,
          enable: i
        })
      }
      static reset() {
        n = 0, a["a"].send("qt_switch_changed", {
          event: [s.KeyBoard, s.Mouse],
          enable: !0
        })
      }
    }
    t["c"] = o
  },
  "6a34": function(e, t, i) {},
  "6ec2": function(e, t, i) {},
  "6fb0": function(e, t, i) {
    "use strict";
    i("5bc60")
  },
  "718c": function(e, t, i) {
    "use strict";
    var a = i("67a1");
    class n {
      writeText(e) {
        a["a"].send("clipboard-writeText", {
          clipboardText: e
        })
      }
      async readText(e) {
        let t = await a["a"].send("clipboard-readText", {});
        return t.clipboardText
      }
    }
    const s = new n;
    t["a"] = s
  },
  7203: function(e, t, i) {
    "use strict";
    i.d(t, "a", (function() {
      return n
    }));
    var a = i("72fa");
    class n {
      constructor() {
        this.list = [], this.dataMap = new Map, this.callback = new Map
      }
      push(e) {
        return this.dataMap.set(e.action, e.data), this.callback.set(e.action, e.callback), this.list.push(e), this
      }
      show(e) {
        const t = new a["a"];
        t.on("show-context-menu", {
          items: this.list
        }).then(({
          action: t
        }) => {
          if (this.callback.has(t)) {
            const i = this.callback.get(t),
              a = this.dataMap.get(t);
            i && i(a || null), e && e(t, a)
          }
        })
      }
    }
  },
  "74d8": function(e, t, i) {
    "use strict";
    i.d(t, "c", (function() {
      return n
    })), i.d(t, "b", (function() {
      return s
    })), i.d(t, "d", (function() {
      return o
    })), i.d(t, "a", (function() {
      return r
    }));
    var a = i("25c2");
    const n = i("81a5"),
      s = i("2a00"),
      o = !a["v"] && i("0d35"),
      {
        version: c
      } = i("cf05"),
      r = c
  },
  "7b31": function(e, t, i) {
    "use strict";
    var a = function() {
        var e = this,
          t = e._self._c;
        e._self._setupProxy;
        return t("el-dialog", {
          attrs: {
            "append-to-body": "",
            top: "30vh",
            width: "579px",
            align: "center",
            title: "设置",
            "custom-class": "setting-dialog gpu-switch-dialog",
            visible: e.visible,
            "close-on-click-modal": !1
          },
          on: {
            "update:visible": function(t) {
              e.visible = t
            },
            close: function(t) {
              e.useCancelBtn || e.PointClickSettingClose()
            }
          }
        }, [t("div", {
          attrs: {
            slot: "title"
          },
          slot: "title"
        }, [e._v(" 设置 ")]), t("div", {
          staticClass: "container"
        }, [
          [t("el-tabs", {
            staticStyle: {
              height: "315px"
            },
            attrs: {
              "tab-position": e.tabPosition
            },
            model: {
              value: e.activeTab,
              callback: function(t) {
                e.activeTab = t
              },
              expression: "activeTab"
            }
          }, [t("el-tab-pane", {
            attrs: {
              name: "default",
              label: "图形处理器"
            }
          }, [
            [t("div", {
              staticClass: "title"
            }, [e._v(" 图形处理器设置： "), t("el-popover", {
              attrs: {
                placement: "top",
                width: "368",
                trigger: "click",
                content: ""
              }
            }, [t("i", {
              staticClass: "ts-icon ts-icon-question-outside",
              staticStyle: {
                width: "15px",
                height: "15px",
                "vertical-align": "middle"
              },
              attrs: {
                slot: "reference"
              },
              slot: "reference"
            }), t("div", {
              staticClass: "tip-info"
            }, [t("p", [e._v("勾选“使用图形处理器”可以充分发挥您的显卡性能，进而提高整体软件运行速度。")]), t("br"), t("p", [e._v("Xác nhận设置后，会重新启动" + e._s(e.CLIENT_NAME_EN) + "。")])])])], 1), e.$isMac ? t("div", {
              staticClass: "gpu-container"
            }, [t("div", {
              staticClass: "gpu-title",
              staticStyle: {
                "align-self": "flex-start"
              }
            }, [e._v("使用图形处理器：")]), t("ul", {
              staticClass: "gpu-info"
            }, [t("li", [t("el-checkbox", {
              model: {
                value: e.form.enableOpenCL,
                callback: function(t) {
                  e.$set(e.form, "enableOpenCL", t)
                },
                expression: "form.enableOpenCL"
              }
            }, [e._v(" 提升Điều chỉnh màu速度 ")])], 1)])]) : e._e(), e.showGLCheckbox ? t("div", {
              staticClass: "gpu-container"
            }, [t("div", {
              staticClass: "gpu-title",
              staticStyle: {
                "align-self": "flex-start"
              }
            }, [e._v("使用图形处理器：")]), t("ul", {
              staticClass: "gpu-info"
            }, [t("li", [t("el-checkbox", {
              attrs: {
                "true-label": e.OpenGLAttribute.UseOpenGLES,
                "false-label": e.OpenGLAttribute.UseSoftwareOpenGL
              },
              model: {
                value: e.form.openGLAttr,
                callback: function(t) {
                  e.$set(e.form, "openGLAttr", t)
                },
                expression: "form.openGLAttr"
              }
            }, [e._v(" 提升Những người như thế để làm đẹp速度 ")])], 1)])]) : e._e()]
          ], 2), t("el-tab-pane", {
            attrs: {
              name: "export",
              label: "导出设置"
            }
          }, [
            [t("div", {
              staticClass: "task-title"
            }, [e._v("导出设置：")]), t("div", {
              staticClass: "gpu-container",
              staticStyle: {
                "margin-top": "12px"
              }
            }, [t("div", {
              staticClass: "gpu-title"
            }, [e._v("同时导出的图片数：")]), t("div", {
              staticClass: "task-select-container"
            }, [t("div", {
              staticClass: "ts-select-container"
            }, [t("el-select", {
              staticClass: "taskSelect",
              staticStyle: {
                width: "94px"
              },
              attrs: {
                placeholder: "Vui lòng chọn"
              },
              model: {
                value: e.taskNumber,
                callback: function(t) {
                  e.taskNumber = t
                },
                expression: "taskNumber"
              }
            }, e._l(e.allTaskNumber, (function(e) {
              return t("el-option", {
                key: e.value,
                attrs: {
                  label: e.label,
                  value: e.value
                }
              })
            })), 1), t("span", {
              staticClass: "right_icon",
              staticStyle: {
                left: "70px"
              }
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
            })])], 1)]), t("el-popover", {
              attrs: {
                placement: "top",
                width: "368",
                trigger: "click",
                content: ""
              }
            }, [t("i", {
              staticClass: "ts-icon ts-icon-question-outside",
              staticStyle: {
                "margin-left": "38px",
                width: "15px",
                height: "15px",
                "vertical-align": "middle"
              },
              attrs: {
                slot: "reference"
              },
              slot: "reference"
            }), t("div", {
              staticClass: "tip-info"
            }, [t("p", [e._v("“同时导出的图片数”数值设置越大，同时导出的图片就越多，就能提升导出速度。")]), t("p", [e._v("但如果您的电脑出现卡顿的情况，请将同时导出的图片数目降低，可能是当前设置的数目与您的电脑性能不匹配。")]), t("br"), t("p", [e._v("默认张数是根据您当前的电脑性能计算出的最佳导出方案。")])])])], 1), t("div", {
              directives: [{
                name: "show",
                rawName: "v-show",
                value: e.needShowTaskTip,
                expression: "needShowTaskTip"
              }],
              staticClass: "task-tip-container"
            }, [t("i", {
              staticClass: "el-icon-warning-outline"
            }), t("span", [e._v("图片数量设置大于默认值，可能会导致您的电脑出现卡顿现象")])]), e.HIDDEN_SWITCH_IMAGE_DESCRIPTION ? e._e() : [t("div", {
              staticClass: "container-line"
            }), t("div", {
              staticClass: "gpu-title",
              staticStyle: {
                "margin-top": "10px"
              }
            }, [e._v("图片描述（标题）：")]), t("div", {
              staticClass: "image-desc-radio-wrapper"
            }, [t("el-radio", {
              attrs: {
                label: !0
              },
              on: {
                change: e.changeImageDescription
              },
              model: {
                value: e.showImageDescription,
                callback: function(t) {
                  e.showImageDescription = t
                },
                expression: "showImageDescription"
              }
            }, [e._v("显示PixCake ")]), t("el-radio", {
              attrs: {
                label: !1
              },
              on: {
                change: e.changeImageDescription
              },
              model: {
                value: e.showImageDescription,
                callback: function(t) {
                  e.showImageDescription = t
                },
                expression: "showImageDescription"
              }
            }, [e._v("显示Ban đầu信息 ")])], 1)], e.IS_ALLOW_PHOTOSHOP_OPEN_PICTURE ? [t("div", {
              staticClass: "container-line"
            }), t("div", {
              staticClass: "gpu-title",
              staticStyle: {
                "margin-top": "10px"
              }
            }, [e._v("Photoshop引用程序路径：")]), e.photoshopPath ? e._e() : t("div", {
              staticClass: "warning-tip"
            }, [e._v("未检测到photoshop应用程序，请手动设置程序路径")]), t("div", {
              staticClass: "select-photoshop-path"
            }, [t("el-input", {
              staticClass: "photoshop-input",
              attrs: {
                placeholder: "点击Mở始设置",
                readonly: "",
                value: e.photoshopPath ? e.photoshopPath : ""
              }
            }), t("el-button", {
              attrs: {
                size: "mini"
              },
              on: {
                click: e.selectPhotoshopPath
              }
            }, [t("i", {
              staticClass: "ts-icon-directory"
            })])], 1)] : e._e()]
          ], 2), t("el-tab-pane", {
            attrs: {
              name: "cache",
              label: "缓存设置"
            }
          }, [
            [t("div", {
              staticClass: "task-title"
            }, [e._v("缓存设置：")]), t("div", {
              staticClass: "gpu-container",
              staticStyle: {
                "margin-top": "12px"
              }
            }, [t("div", {
              staticClass: "gpu-title"
            }, [e._v("缓存天数：")]), t("div", {
              staticClass: "cache-select-container"
            }, [t("div", {
              staticClass: "ts-select-container"
            }, [t("el-select", {
              staticClass: "taskSelect",
              staticStyle: {
                width: "74px"
              },
              attrs: {
                placeholder: "Vui lòng chọn"
              },
              model: {
                value: e.cacheNumber,
                callback: function(t) {
                  e.cacheNumber = t
                },
                expression: "cacheNumber"
              }
            }, e._l(e.allCacheNumber, (function(e) {
              return t("el-option", {
                key: e.value,
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
            })])], 1), t("el-button", {
              staticClass: "claRepair",
              attrs: {
                loading: e.repairLoading,
                size: "mini"
              },
              on: {
                click: e.onClearCache
              }
            }, [e._v(" 清理缓存 ")])], 1)])]
          ], 2), t("el-tab-pane", {
            attrs: {
              name: "refine",
              label: "精修-图像预览"
            }
          }, [
            [t("div", {
              staticClass: "task-title"
            }, [e._v("大图预览图像Kích thước设置：")]), t("div", {
              staticClass: "gpu-container",
              staticStyle: {
                "margin-top": "12px"
              }
            }, [t("div", {
              staticClass: "gpu-title"
            }, [e._v("预览图像Kích thước (px)：")]), t("div", {
              staticClass: "task-select-container"
            }, [t("div", {
              staticClass: "ts-select-container"
            }, [t("el-select", {
              staticClass: "taskSelect",
              staticStyle: {
                width: "78px"
              },
              attrs: {
                placeholder: "Vui lòng chọn"
              },
              model: {
                value: e.previewSize,
                callback: function(t) {
                  e.previewSize = t
                },
                expression: "previewSize"
              }
            }, e._l(e.allPreviewSize, (function(e) {
              return t("el-option", {
                key: e.value,
                attrs: {
                  label: e.label,
                  value: e.value
                }
              })
            })), 1), t("span", {
              staticClass: "right_icon",
              staticStyle: {
                left: "54px"
              }
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
            })])], 1)])]), t("div", {
              staticClass: "gpu-title"
            }, [t("i", {
              staticClass: "ts-icon ts-icon-warning-outside",
              staticStyle: {
                top: "-1px",
                width: "12px",
                height: "12px",
                "vertical-align": "sub",
                "margin-right": "6px"
              },
              attrs: {
                slot: "reference"
              },
              slot: "reference"
            }), e._v(" 预览图像Kích thước设置不影响导出的画质。导出是按照原图尺寸导出。 ")]), t("div", {
              staticClass: "gpu-title",
              staticStyle: {
                "margin-top": "10px"
              }
            }, [e._v("Trái侧缩略图：")]), t("div", [t("el-radio", {
              attrs: {
                label: !0
              },
              on: {
                change: e.changeThumbShowStatus
              },
              model: {
                value: e.showEffectThumb,
                callback: function(t) {
                  e.showEffectThumb = t
                },
                expression: "showEffectThumb"
              }
            }, [e._v(" 效果图展示 ")]), t("el-radio", {
              attrs: {
                label: !1
              },
              on: {
                change: e.changeThumbShowStatus
              },
              model: {
                value: e.showEffectThumb,
                callback: function(t) {
                  e.showEffectThumb = t
                },
                expression: "showEffectThumb"
              }
            }, [e._v(" 原图展示 ")])], 1)]
          ], 2), e.showExhibitionPane ? t("el-tab-pane", {
            staticClass: "pane-container",
            attrs: {
              label: "展会设置",
              name: "exhibition-config"
            }
          }, [t("div", {
            staticClass: "gpu-container"
          }, [t("div", {
            staticClass: "gpu-title"
          }, [e._v("自动载入图片套Đặt trước：")]), t("el-radio", {
            attrs: {
              label: 1
            },
            model: {
              value: e.exhibition.switch,
              callback: function(t) {
                e.$set(e.exhibition, "switch", t)
              },
              expression: "exhibition.switch"
            }
          }, [e._v("Mở")]), t("el-radio", {
            attrs: {
              label: 0
            },
            model: {
              value: e.exhibition.switch,
              callback: function(t) {
                e.$set(e.exhibition, "switch", t)
              },
              expression: "exhibition.switch"
            }
          }, [e._v("Gần")])], 1), t("div", {
            staticClass: "gpu-container"
          }, [t("div", {
            staticClass: "gpu-title"
          }, [e._v("自动导入Tập tin夹：")]), t("el-input", {
            staticClass: "import-input",
            attrs: {
              size: "mini",
              placeholder: "Vui lòng chọn导入Tập tin夹"
            },
            model: {
              value: e.exhibition.importPath,
              callback: function(t) {
                e.$set(e.exhibition, "importPath", "string" === typeof t ? t.trim() : t)
              },
              expression: "exhibition.importPath"
            }
          }, [t("template", {
            slot: "append"
          }, [t("el-button", {
            attrs: {
              size: "mini"
            },
            on: {
              click: e.selectImportPath
            }
          }, [t("i", {
            staticClass: "ts-icon-directory"
          })])], 1)], 2)], 1), t("div", {
            staticClass: "gpu-container"
          }, [t("div", {
            staticClass: "gpu-title"
          }, [e._v("Đặt trướcId：")]), t("el-input", {
            staticStyle: {
              width: "100px"
            },
            attrs: {
              size: "mini"
            },
            model: {
              value: e.exhibition.presetSuitId,
              callback: function(t) {
                e.$set(e.exhibition, "presetSuitId", "string" === typeof t ? t.trim() : t)
              },
              expression: "exhibition.presetSuitId"
            }
          })], 1), t("div", {
            staticClass: "gpu-container"
          }, [t("div", {
            staticClass: "gpu-title"
          }, [e._v("获取载入图片间隔时间：")]), t("el-input-number", {
            staticStyle: {
              width: "100px"
            },
            attrs: {
              size: "mini",
              "controls-position": "right"
            },
            model: {
              value: e.exhibition.importDelayTime,
              callback: function(t) {
                e.$set(e.exhibition, "importDelayTime", t)
              },
              expression: "exhibition.importDelayTime"
            }
          }), e._v("   秒 ")], 1), t("div", {
            staticStyle: {
              "text-align": "right"
            }
          }, [t("el-button", {
            attrs: {
              type: "primary"
            },
            on: {
              click: e.submitExhibition
            }
          }, [e._v("Tiết kiệm设置")])], 1)]) : e._e()], 1)]
        ], 2), t("div", {
          attrs: {
            slot: "footer"
          },
          slot: "footer"
        }, [t("el-button", {
          directives: [{
            name: "gtag-event",
            rawName: "v-gtag-event",
            value: e.PointClickSettingReturn,
            expression: "PointClickSettingReturn"
          }],
          attrs: {
            size: "mini"
          },
          on: {
            click: function(t) {
              e.useCancelBtn = !0, e.visible = !1
            }
          }
        }, [e._v(" Hủy ")]), t("el-button", {
          attrs: {
            size: "mini",
            type: "primary",
            loading: e.loading
          },
          on: {
            click: e.submit
          }
        }, [e._v(" Xác nhận ")])], 1)])
      },
      n = [],
      s = i("2b0e"),
      o = i("2f62"),
      c = i("442f"),
      r = i("5c96"),
      l = i("25c2"),
      u = i("67a1"),
      d = i("f5de"),
      h = i("2a18"),
      p = i("52b8"),
      f = i("1209"),
      m = i("9128"),
      b = i("4a9f"),
      g = i("527f"),
      _ = i("5b34"),
      k = i("13a7");
    const v = "showRebootLaterDialog";
    var C = Object(s["defineComponent"])({
        name: "GpuSwitchDialog",
        mixins: [c["a"], p["a"]],
        components: {
          "el-dialog": d["a"],
          "el-button": r["Button"],
          "el-popover": r["Popover"],
          "el-checkbox": r["Checkbox"],
          "el-select": r["Select"],
          "el-option": r["Option"],
          "el-tabs": r["Tabs"],
          "el-tab-pane": r["TabPane"],
          "el-input-number": r["InputNumber"]
        },
        props: {
          value: {
            type: Boolean,
            default: !1
          },
          active: {
            type: String,
            default: "default"
          }
        },
        setup() {
          const e = Object(s["getCurrentInstance"])(),
            t = Object(s["reactive"])({
              switch: 0,
              importDelayTime: 10,
              presetSuitId: "",
              importPath: ""
            }),
            i = Object(s["ref"])(!1),
            a = async () => {
              const e = _["a"].getInstance();
              await e.readJsonFromLocal();
              const a = e.exhibitionConfig;
              e.switch && l["w"] && (i.value = !0), a && (t.switch = a.switch, t.importDelayTime = a.importDelayTime, t.presetSuitId = a.presetSuitId, t.importPath = a.importPath)
            }, n = async () => {
              let e = await g["a"].instance().openPhotoShopDialog();
              e && e.filePaths && (t.importPath = e.filePaths[0] || "")
            }, {
              tsConfirm: o,
              tsNotify: c
            } = Object(k["a"])(), r = async () => {
              if (t.switch && !t.importPath) return void c("请设置自动导入所在对Tập tin夹路径！");
              const i = _["a"].getInstance(),
                a = await i.updateOnlineConfig(t);
              e.proxy.SetCanShowManualImportButton(), await o({
                title: "展会设置",
                message: a ? "Tiết kiệm成功" : "保存失败",
                showCancelButton: !1
              })
            };
          return {
            exhibition: t,
            showExhibitionPane: i,
            loadExhibitionData: a,
            selectImportPath: n,
            submitExhibition: r
          }
        },
        data() {
          return {
            activeTab: this.active,
            tabPosition: "left",
            CLIENT_NAME_EN: l["c"],
            CLIENT_NAME: l["b"],
            IS_ALLOW_PHOTOSHOP_OPEN_PICTURE: l["t"],
            HIDDEN_SWITCH_IMAGE_DESCRIPTION: l["s"],
            loading: !1,
            visible: this.value,
            OpenGLAttribute: {
              ...l["B"]
            },
            form: {
              enableOpenCL: !0,
              enableOpenGL: !1,
              openGLAttr: l["B"].UseDesktopOpenGL
            },
            gpus: [],
            taskNumber: 1,
            allTaskNumber: [],
            cacheNumber: "3天",
            allCacheNumber: [],
            previewSize: 0,
            defaultPreviewSize: 0,
            allPreviewSize: [],
            repairLoading: !1,
            needShowRepairBtn: this.getAutoNeedShowRepairBtn(),
            needShowTaskTip: !1,
            useCancelBtn: !1,
            showEffectThumb: !0,
            showImageDescription: !0,
            showGLCheckbox: !1
          }
        },
        computed: {
          ...Object(o["c"])("config", ["enableOpenCL", "enableOpenGL", "exportTaskConfig", "appConfigModel", "usePreviewSize", "previewAreaSizeList", "gpuGlAttribute", "defaultGpuAttribute", "photoshopPath"])
        },
        watch: {
          value: {
            async handler(e) {
              if (this.visible = e, this.needShowRepairBtn = this.getAutoNeedShowRepairBtn(), e) {
                this.gpus = 2, await this.readOpenglAttribute(), this.showGLCheckbox = !1, this.$isWin && (this.showGLCheckbox = !0), this.form = {
                  enableOpenCL: this.enableOpenCL,
                  enableOpenGL: this.enableOpenGL,
                  openGLAttr: this.gpuGlAttribute
                };
                let e = await Object(h["d"])();
                this.taskNumber = this.exportTaskConfig.defaultNumber;
                let t = [];
                for (let s = 1; s <= this.exportTaskConfig.maxNumber; s++) {
                  let i = s;
                  s === e && (i = s + " (默认)");
                  let a = {
                    label: i,
                    value: s
                  };
                  t.push(a)
                }
                this.allTaskNumber = t;
                let i = this.appConfigModel;
                this.cacheNumber = i.defaultCacheNumber, this.allCacheNumber = [], this.allCacheNumber.push({
                  label: "3天",
                  value: 3
                }), this.allCacheNumber.push({
                  label: "7天",
                  value: 7
                }), this.allCacheNumber.push({
                  label: "15天",
                  value: 15
                });
                let a = i.previewSize;
                0 === a && (a = await m["c"].getPreviewSize(), this.$store.commit("config/updateConfig", {
                  previewSize: a
                })), this.defaultPreviewSize = a, this.previewSize = a, this.showEffectThumb = i.showEffectThumb, this.showImageDescription = i.showImageDescription;
                let n = this.previewAreaSizeList;
                this.allPreviewSize = [];
                for (const s of n) this.allPreviewSize.push({
                  label: s.size,
                  value: s.size
                });
                this.loadExhibitionData()
              }
            },
            immediate: !0
          },
          visible(e) {
            e || Object(f["a"])(300).then(() => {
              this.useCancelBtn = !1, this.activeTab = "default"
            }), this.$emit("input", e)
          },
          active(e) {
            this.activeTab = e
          },
          activeTab(e) {
            this.$emit("update:active", e)
          },
          taskNumber(e) {
            Object(h["d"])().then(t => {
              this.needShowTaskTip = e > t
            })
          }
        },
        methods: {
          ...Object(o["d"])("config", ["changeEnableOpenCLStatus", "changeEnableOpenGLStatus", "changeExportTaskNumber", "_SetPhotoshopPath", "SetCanShowManualImportButton"]),
          ...Object(o["b"])("config", ["readOpenglAttribute", "saveOpenglAttribute", "readPhotoShopPath"]),
          async selectPhotoshopPath(e = ["openDirectory", "openFile"]) {
            let t = await g["a"].instance().openPhotoShopDialog();
            t && t.filePaths && this._SetPhotoshopPath(t.filePaths[0])
          },
          onGlAttrChanged(e) {
            this.tsConfirm({
              message: "勾选之后可能会导致您的效果图异常",
              confirmButtonText: "Xác nhận勾选",
              cancelButtonText: "Hủy勾选"
            }).then(() => {}).catch(e => {
              this.form.openGLAttr = this.gpuGlAttribute
            })
          },
          changeThumbShowStatus() {
            this.showEffectThumb ? this.PointShowEffectThumb() : this.PointShowOriginThumb()
          },
          changeImageDescription() {
            console.log("changeImageDescription : ", this.showImageDescription)
          },
          getAutoNeedShowRepairBtn() {
            return !1
          },
          async onRepairClick() {
            this.repairLoading = !0;
            try {
              this.repairLoading = !1, this.needShowRepairBtn = this.getAutoNeedShowRepairBtn(), this.tsNotify("修复Tập tin成功了")
            } catch (e) {
              this.tsNotify("修复过程发生了错误，请重新尝试!"), this.repairLoading = !1, console.log(e)
            }
          },
          confirmTip(e, t) {
            e && this.tsConfirm({
              message: "勾选之后可能会导致您的效果图异常",
              confirmButtonText: "Xác nhận勾选",
              cancelButtonText: "Hủy勾选"
            }).catch(e => {
              "openGL" === t ? this.form.enableOpenGL = this.enableOpenGL : "openCL" === t && (this.form.enableOpenCL = this.enableOpenCL)
            })
          },
          async submit() {
            const {
              enableOpenCL: e,
              enableOpenGL: t
            } = this.form;
            let i = !1;
            this.taskNumber !== this.exportTaskConfig.defaultNumber && (i = !0, this.changeExportTaskNumber(this.taskNumber)), e !== this.enableOpenCL && (i = !0, this.changeEnableOpenCLStatus(e)), this.$isWin && t !== this.enableOpenGL && (i = !0, this.changeEnableOpenGLStatus(t)), this.defaultPreviewSize !== this.previewSize && this.$store.commit("config/updateConfig", {
              previewSize: this.previewSize
            });
            let a = this.appConfigModel;
            this.cacheNumber !== a.defaultCacheNumber && this.$store.commit("config/updateConfig", {
              defaultCacheNumber: this.cacheNumber
            }), this.showEffectThumb !== a.showEffectThumb && this.$store.commit("config/updateConfig", {
              showEffectThumb: this.showEffectThumb
            }), this.showImageDescription !== a.showImageDescription && this.$store.commit("config/updateConfig", {
              showImageDescription: this.showImageDescription
            }), this.form.openGLAttr !== this.gpuGlAttribute && (i = !0, this.saveOpenglAttribute(this.form.openGLAttr)), this.visible = !1, this.PointClickSettingConfirm({
              threads: this.taskNumber,
              cache: this.cacheNumber,
              previewsize: this.previewSize,
              image_description: this.showImageDescription ? "pixcake" : "original"
            }), i && (this.loading = !0, this.tsConfirm({
              title: `本次设置需重启 ${l["b"]} 之后才能生效`,
              confirmButtonText: "重启" + l["b"],
              cancelButtonText: "下一次启动生效"
            }).then(e => {
              this.tsNotify("即将重启应用"), Object(f["a"])(1e3).then(() => {
                u["a"].send("app-restart", {
                  clearCache: !1
                }), this.loading = !1
              })
            }).catch(e => {
              this.loading = !1
            }))
          },
          onClearCache() {
            this.visible = !1, this.tsConfirm({
              title: `清理缓存需重启 ${l["b"]} 之后马上生效`,
              confirmButtonText: "重启" + l["b"],
              cancelButtonText: "Hủy"
            }).then(e => {
              this.tsNotify("即将重启应用"), Object(f["a"])(1e3).then(() => {
                u["a"].send("app-restart", {
                  clearCache: !0
                })
              })
            }).catch(e => {})
          }
        },
        async mounted() {
          this.readPhotoShopPath(), b["i"].addListener(Object(b["a"])(v), () => {
            this.tsConfirm({
              title: `本次设置需重启 ${l["b"]} 之后才能生效`,
              confirmButtonText: "重启" + l["b"],
              cancelButtonText: "下一次启动生效"
            }).then(e => {
              this.tsNotify("即将重启应用"), Object(f["a"])(1e3).then(() => {
                u["a"].send("app-restart", {
                  clearCache: !1
                }), this.loading = !1
              })
            }).catch(e => {
              this.loading = !1
            })
          })
        },
        beforeDestroy() {
          b["i"].removeListener(Object(b["a"])(v))
        }
      }),
      y = C,
      w = (i("869a"), i("2877")),
      S = Object(w["a"])(y, a, n, !1, null, "4574a82c", null);
    t["a"] = S.exports
  },
  "7b9a": function(e, t, i) {
    "use strict";
    i.d(t, "b", (function() {
      return s
    })), i.d(t, "a", (function() {
      return o
    }));
    var a = i("718c"),
      n = i("25c2");

    function s(e) {
      if (!e) return !1;
      const t = e.Effects;
      for (const i of t) {
        const {
          EffectName: e,
          Path: t
        } = i;
        if ("BgReplace" == e && t.indexOf("/id_photo/") > 0) return !0
      }
      return !1
    }
    class o {
      constructor() {
        this.template = `好友给你分享了{num}个Đặt trước-{name}等「{token}」，快复制口令打Mở${n["c"]}导入吧~`, this.templateReg = new RegExp(`(?<=(好友给你分享了.+个预设-.+等「))(\\w+)(?=」，快复制口令打开(${n["c"]}|${n["b"]})导入吧~)`, "gi"), this.templateRegOld = new RegExp(`(?<=(好友给你分享了预设-.+「))(\\w+)(?=」，快复制口令打开(${n["c"]}|${n["b"]})导入吧~)`, "gi")
      }
      isCorrectText(e) {
        if (!e) return !1;
        const t = e.match(this.templateReg),
          i = e.match(this.templateRegOld);
        return t && t[0] ? t[0] : !(!i || !i[0]) && i[0]
      }
      async findPresetToken() {
        let e = await a["a"].readText("clipboard");
        if (!e || !e.trim()) return null;
        const t = this.isCorrectText(e);
        return t ? (console.log("[PresetSuitManager] content is find：", t), t) : (console.log("[PresetSuitManager] content is Correct: ", e), null)
      }
      writePresetToken(e, t, i) {
        if (!e) return void console.log("[writePresetToken] content is Correct!");
        let n = this.template;
        n = n.replace("{token}", e), n = n.replace("{name}", t), n = n.replace("{num}", i), a["a"].writeText(n)
      }
      clearPresetToken() {
        a["a"].writeText("   ")
      }
      clearPlaceholder(e) {
        const t = this.isCorrectText(e);
        if (console.log("[clearPlaceholder] value: ", e, " isCorrect: ", t), t) return t; {
          const t = e.trim(),
            i = /(?<=^「)(\w+)(?=」$)/gi;
          if (i.test(t)) {
            const a = t.match(i);
            return a && a[0] || e
          }
          return e
        }
      }
    }
  },
  "81a5": function(e, t, i) {
    e.exports = i.p + "img/logo.f92ef0c5.png"
  },
  "869a": function(e, t, i) {
    "use strict";
    i("f69e")
  },
  "8cd5": function(e, t, i) {
    "use strict";
    i("6a34")
  },
  9710: function(e, t, i) {
    "use strict";
    var a = function() {
        var e = this,
          t = e._self._c;
        return t("div", {
          staticClass: "more"
        }, [t("el-dropdown", {
          attrs: {
            size: "small",
            trigger: "click",
            placement: "bottom"
          },
          on: {
            "visible-change": e.onVisibleChange
          }
        }, [t("i", {
          directives: [{
            name: "gtag-event",
            rawName: "v-gtag-event",
            value: e.PointHelpIcon,
            expression: "PointHelpIcon"
          }],
          staticClass: "ts-icon ts-icon-question"
        }), t("el-dropdown-menu", {
          attrs: {
            slot: "dropdown"
          },
          slot: "dropdown"
        }, [t("el-dropdown-item", {
          directives: [{
            name: "gtag-event",
            rawName: "v-gtag-event",
            value: e.PointCustomerService,
            expression: "PointCustomerService"
          }],
          nativeOn: {
            click: function(t) {
              return e.onServiceClick.apply(null, arguments)
            }
          }
        }, [e._v(" 人工客服 ")]), e.helpMenus ? [e._l(e.helpMenus, (function(i, a) {
          return [i.show ? t("el-dropdown-item", {
            key: "help_menu_" + a,
            nativeOn: {
              click: function(t) {
                return e.onClickHelpMenu(i)
              }
            }
          }, [e._v(" " + e._s(i.name) + " ")]) : e._e()]
        }))] : e._e(), t("el-dropdown-item", {
          directives: [{
            name: "gtag-event",
            rawName: "v-gtag-event",
            value: e.PointHotKey,
            expression: "PointHotKey"
          }],
          nativeOn: {
            click: function(t) {
              e.showHotKey = !0
            }
          }
        }, [e._v(" Tắt ")])], 2)], 1), t("ServiceDialog", {
          model: {
            value: e.showServiceDialog,
            callback: function(t) {
              e.showServiceDialog = t
            },
            expression: "showServiceDialog"
          }
        }), t("HotKeyDialog", {
          model: {
            value: e.showHotKey,
            callback: function(t) {
              e.showHotKey = t
            },
            expression: "showHotKey"
          }
        })], 1)
      },
      n = [],
      s = i("2b0e"),
      o = i("0613"),
      c = i("2ef0"),
      r = i("442f"),
      l = i("ad29"),
      u = i("67a1"),
      d = i("6310");
    class h {
      static async getInstance() {
        if (!this.instance) {
          const e = d["b"].sharedObject();
          this.instance = await e.cloudConfig()
        }
        return this.instance
      }
    }
    var p = function() {
        var e = this,
          t = e._self._c;
        return t("el-dialog", {
          attrs: {
            "append-to-body": "",
            center: "",
            top: "28vh",
            width: "323px",
            visible: e.visible,
            "custom-class": "common-dialog user-package"
          },
          on: {
            "update:visible": function(t) {
              e.visible = t
            }
          }
        }, [t("div", {
          staticClass: "dialog-container"
        }, [e.isFromFromUserInfo ? [t("span", {
          staticClass: "title-business"
        }, [e._v("人工客服")])] : [t("span", {
          staticClass: "title-business"
        }, [e._v("联系商务")])], t("img", {
          staticClass: "qrcode-business",
          attrs: {
            src: e.serviceUrl
          }
        }), e.vipCardDesc && !e.IS_CLIENT_PIX_PIE ? [t("div", {
          staticClass: "tip",
          domProps: {
            innerHTML: e._s(e.vipCardDesc)
          }
        })] : [t("div", {
          staticClass: "tip"
        }, [t("span", {
          staticClass: "tip"
        }, [e._v("扫一扫上面的二维码，加我微信哦~")])])]], 2)])
      },
      f = [],
      m = i("2f62"),
      b = i("25c2"),
      g = i("f5de"),
      _ = {
        name: "ServiceDialog",
        props: {
          value: {
            type: Boolean,
            default: !1
          },
          isFromFromUserInfo: {
            default: !0,
            type: Boolean
          }
        },
        components: {
          "el-dialog": g["a"]
        },
        data() {
          return {
            visible: this.value,
            IS_CLIENT_PIX_PIE: b["v"]
          }
        },
        watch: {
          value: {
            handler(e) {
              this.visible = e
            },
            immediate: !0
          },
          visible(e) {
            this.$emit("input", e)
          }
        },
        computed: {
          serviceUrl() {
            return b["v"] ? i("b2a7") : this.$store.state.order.serviceUrl ? this.$store.state.order.serviceUrl : i("f0d4")
          },
          ...Object(m["c"])(["vipCardDesc"])
        }
      },
      k = _,
      v = (i("baa2"), i("2877")),
      C = Object(v["a"])(k, p, f, !1, null, "12f0bd6a", null),
      y = C.exports,
      w = function() {
        var e = this,
          t = e._self._c;
        return t("el-dialog", {
          attrs: {
            "append-to-body": "",
            top: "10vh",
            width: "489px",
            align: "center",
            title: "Tắt指南",
            "custom-class": "setting-dialog",
            visible: e.visible,
            "close-on-click-modal": !1
          },
          on: {
            "update:visible": function(t) {
              e.visible = t
            }
          }
        }, [t("div", {
          staticClass: "container"
        }, [t("div", {
          staticClass: "group"
        }, [t("div", {
          staticClass: "type-title"
        }, [e._v("Tập tin夹Tắt")]), t("el-form", {
          staticClass: "info",
          attrs: {
            "label-position": "left",
            "label-width": "120px"
          }
        }, [t("el-form-item", {
          attrs: {
            label: "图片全选："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s(e.platformKey) + " + A")])]), t("el-form-item", {
          attrs: {
            label: "图片Hủy全选："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s(e.platformKey) + " + D")])]), t("el-form-item", {
          attrs: {
            label: "图片多选："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [t("span", [e._v("Shift + 点击")]), t("span", {
          staticStyle: {
            padding: "0 10px"
          }
        }, [e._v("或")]), t("span", [e._v(e._s(e.platformKey) + " + 点击")])])]), t("el-form-item", {
          attrs: {
            label: "图片Hủy选中："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s(e.platformKey) + " + 点击")])]), t("el-form-item", {
          attrs: {
            label: "上一张/下一张:"
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s("向上箭头"))]), t("span", {
          staticStyle: {
            "margin-left": "8px",
            "margin-right": "8px",
            color: "#A6A6A6",
            "font-size": "14px"
          }
        }, [e._v("/")]), t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s("向下箭头"))])]), t("el-form-item", {
          attrs: {
            label: "删除："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s("Backspace / Del"))])])], 1)], 1), t("div", {
          staticClass: "group"
        }, [t("div", {
          staticClass: "type-title"
        }, [e._v("图片Tắt")]), t("el-form", {
          staticClass: "info",
          attrs: {
            "label-position": "left",
            "label-width": "110px"
          }
        }, [t("el-form-item", {
          attrs: {
            label: "图片放大："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [t("span", [e._v(e._s(e.platformKey) + ' + "+"')]), t("span", {
          staticStyle: {
            padding: "0 10px"
          }
        }, [e._v("或")]), t("span", [e._v("鼠标滚轮向上")])])]), t("el-form-item", {
          attrs: {
            label: "图片缩小："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [t("span", [e._v(e._s(e.platformKey) + ' + "-"')]), t("span", {
          staticStyle: {
            padding: "0 10px"
          }
        }, [e._v("或")]), t("span", [e._v("鼠标滚轮向下")])])]), t("el-form-item", {
          attrs: {
            label: "复制效果："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [t("span", [e._v(e._s(e.platformKey) + ' + "C"')])])]), t("el-form-item", {
          attrs: {
            label: "粘贴效果："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [t("span", [e._v(e._s(e.platformKey) + ' + "V"')])])]), t("el-form-item", {
          attrs: {
            label: "恢复默认Kích thước："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s(e.platformKey) + ' + "0"')])]), t("el-form-item", {
          attrs: {
            label: "查看对比："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s("~"))])]), t("el-form-item", {
          attrs: {
            label: "撤销："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s(e.platformKey) + ' + "Z"')])]), t("el-form-item", {
          attrs: {
            label: "重做："
          }
        }, [e.isWin32 ? e._e() : t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s(e.platformKey) + ' + "shift" + "Z"')]), e.isWin32 ? t("span", {
          staticClass: "hot-key-box"
        }, [e._v(e._s(e.platformKey) + ' + "shift" + "Z" 或者 ' + e._s(e.platformKey) + ' + "Y" ')]) : e._e()]), t("el-form-item", {
          attrs: {
            label: "图片移动："
          }
        }, [t("span", {
          staticClass: "hot-key-box"
        }, [e._v("空格 + 鼠标Trái键")])])], 1)], 1)])])
      },
      S = [],
      P = i("5c96"),
      x = {
        name: "HotKeyDialog",
        mixins: [r["a"]],
        components: {
          "el-dialog": g["a"],
          "el-form": P["Form"],
          "el-form-item": P["FormItem"]
        },
        props: {
          value: {
            type: Boolean,
            default: !1
          }
        },
        data() {
          return {
            loading: !1,
            visible: this.value,
            form: {
              name: "Sẵn 1"
            }
          }
        },
        filters: {},
        computed: {
          ...Object(m["c"])("finishing", []),
          platformKey() {
            return "win32" === this.$platform ? "Ctrl" : "Command"
          },
          isWin32() {
            return "win32" === this.$platform
          }
        },
        watch: {
          value: {
            handler(e) {
              this.visible = e
            },
            immediate: !0
          },
          visible(e) {
            this.$emit("input", e)
          }
        },
        mounted() {
          this.initIcons()
        },
        methods: {
          ...Object(m["d"])([]),
          async initIcons() {},
          async submit() {}
        }
      },
      E = x,
      j = (i("c149"), Object(v["a"])(E, w, S, !1, null, "340ff614", null)),
      T = j.exports,
      O = {
        mixins: [r["a"]],
        name: "SystemMenu",
        components: {
          ServiceDialog: y,
          HotKeyDialog: T
        },
        setup(e) {
          const t = Object(s["getCurrentInstance"])().proxy,
            i = Object(s["ref"])(!1),
            a = Object(s["ref"])(!1);

          function n() {
            i.value = !0
          }

          function r(e, t) {
            u["a"].send("open-external-link", {
              type: "Question",
              title: e,
              href: t
            })
          }
          async function d(e = "pic") {
            try {
              const t = await h.getInstance();
              if (t.isValid || await t.fetchConfig(), "pic" === e) {
                if (!t.guide.newTutorialUrl) return void this.tsNotify("获取链接失败，Xin vui lòng thử lại sau");
                u["a"].send("open-alink-blank", {
                  type: "NewTutorial",
                  title: "新手教程",
                  href: t.guide.newTutorialUrl
                })
              } else if ("video" === e) {
                if (!t.guide.videoTutorialUrl) return void this.tsNotify("获取链接失败，Xin vui lòng thử lại sau");
                u["a"].send("open-external-link", {
                  title: "视频教程",
                  type: "VideoTutorial",
                  href: t.guide.videoTutorialUrl
                })
              }
            } catch (i) {
              t.tsNotify("获取链接失败，Xin vui lòng thử lại sau")
            }
          }
          const {
            PointHelpMenuClick: p,
            PointHelpIcon: f,
            PointHotKey: m,
            PointCustomerService: b
          } = Object(l["a"])(), g = Object(s["computed"])(() => o["a"].getters.helpMenus), _ = Object(c["debounce"])(e => {
            e.url ? (e.openLink(), p(e.key)) : t.tsNotify("页面Không tồn tại，请检查后再试")
          }, 300);
          return {
            showServiceDialog: i,
            showHotKey: a,
            onServiceClick: n,
            onManualBookClick: d,
            onOpenURL: r,
            helpMenus: g,
            onClickHelpMenu: _,
            PointHelpIcon: f,
            PointHotKey: m,
            PointCustomerService: b,
            onVisibleChange: e => {
              e && o["a"].dispatch("initMenuList", !0)
            }
          }
        }
      },
      I = O,
      L = (i("98f3"), Object(v["a"])(I, a, n, !1, null, "55874315", null));
    t["a"] = L.exports
  },
  "98f3": function(e, t, i) {
    "use strict";
    i("0a6c")
  },
  "9f7e": function(e, t, i) {
    "use strict";
    i.d(t, "b", (function() {
      return s
    })), i.d(t, "a", (function() {
      return o
    })), i.d(t, "c", (function() {
      return r
    })), i.d(t, "d", (function() {
      return u
    })), i.d(t, "e", (function() {
      return h
    })), i.d(t, "f", (function() {
      return f
    }));
    var a = i("751a");
    const n = {
      MASK_API: 11,
      SKELETON_API: 12,
      PAY_DECRYPT_API: 13,
      PAY_API: 14,
      DECRYP_API: 15,
      UNKNOWN_ERROR_API: 16,
      ALLOCATED_PAY_API: 69
    };
    i("2ef0"), i("e1ee");
    const s = n.PAY_API,
      o = n.ALLOCATED_PAY_API;
    let c = null;

    function r() {
      return c || (c = Object(a["d"])(Object(a["a"])({
        baseURL: Object(a["b"])(),
        crossDomain: !1,
        withCredentials: !0,
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 15e3
      }), {
        request: !0
      })), c
    }
    let l = null;

    function u() {
      return l || (l = Object(a["d"])(Object(a["a"])({
        baseURL: Object(a["b"])() + "/v2/api",
        crossDomain: !1,
        withCredentials: !0,
        headers: {
          "Content-Type": "application/json"
        }
      }), {
        request: !0
      })), l
    }
    let d = null;

    function h() {
      if (!d) return d = Object(a["d"])(Object(a["a"])({
        baseURL: Object(a["b"])() + "/v1/api",
        crossDomain: !1,
        withCredentials: !0,
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 15e3,
        responseType: "arraybuffer"
      }), {
        request: !0
      }), d
    }
    let p = null;

    function f() {
      if (!p) return p = Object(a["d"])(Object(a["a"])({
        baseURL: Object(a["b"])() + "/v2/api",
        crossDomain: !1,
        withCredentials: !0,
        headers: {
          "Content-Type": "application/json"
        },
        timeout: 15e3,
        responseType: "arraybuffer"
      }), {
        request: !0
      }), p
    }
  },
  a455: function(e, t, i) {
    "use strict";
    var a = function() {
        var e = this,
          t = e._self._c;
        return t("el-dialog", {
          attrs: {
            center: "",
            top: "28vh",
            width: "284px",
            "append-to-body": "",
            visible: e.visible,
            "custom-class": "common-dialog user-package"
          },
          on: {
            "update:visible": function(t) {
              e.visible = t
            }
          }
        }, [t("div", {
          staticClass: "dialog-container"
        }, [t("img", {
          staticClass: "img",
          attrs: {
            src: e.LOGO_ABOUT_US,
            alt: "logo"
          }
        }), t("span", {
          staticClass: "tip"
        }, [e._v("版本" + e._s(e.version))]), t("span", {
          staticClass: "tip"
        }, [e._v("Copyright © 2022 " + e._s(e.clientName))]), e.$IS_CLIENT_PIX_PIE ? e._e() : t("span", {
          staticClass: "tip spanflex"
        }, [t("el-link", {
          on: {
            click: function(t) {
              return e.checkProtocol(e.privacyProtocol)
            }
          }
        }, [e._v(" 隐私政策 ")]), t("el-link", {
          on: {
            click: function(t) {
              return e.checkProtocol(e.userProtocol)
            }
          }
        }, [e._v(" 商家使用协议 ")])], 1), e.IS_BAN_UPDATE ? e._e() : [t("el-button", {
          staticClass: "findUpdateBtn",
          attrs: {
            loading: e.checkLoading
          },
          on: {
            click: e.handleCheckUpdate
          }
        }, [e._v(" 检测更新 ")])]], 2)])
      },
      n = [],
      s = i("67a1"),
      o = i("2b0e"),
      c = i("0613"),
      r = i("442f"),
      l = i("f946"),
      u = i("25c2"),
      d = i("74d8"),
      h = i("5c96"),
      p = i("f5de");
    const f = u["a"];
    var m = {
        mixins: [r["a"]],
        name: "AboutUsDialog",
        components: {
          "el-link": h["Link"],
          "el-dialog": p["a"],
          "el-button": h["Button"]
        },
        props: {
          value: {
            type: Boolean,
            default: !1
          }
        },
        setup(e, {
          emit: t
        }) {
          var i;
          const a = null === (i = Object(o["getCurrentInstance"])()) || void 0 === i ? void 0 : i.proxy;
          let n = Object(o["ref"])(e.value);

          function r(e) {
            e ? a.$openExternal(e) : a.tsNotify({
              message: "协议Không tồn tại，请联系客服获取协议!",
              type: "error"
            })
          }
          Object(o["watch"])(() => e.value, e => {
            n.value = e, e && !u["v"] && c["a"].dispatch("fetchUserProtocol")
          }), Object(o["watch"])(n, e => t("input", e));
          const h = Object(o["ref"])(!1);

          function p() {
            h.value = !0, Object(o["nextTick"])(async () => {
              try {
                const e = await Object(l["a"])(!0);
                if (!e.is_need_update) return a.tsNotify({
                  message: "已是最新版本，Không có须更新哦～～"
                }), void setTimeout(() => {
                  h.value = !1
                }, 300);
                await s["a"].send("check-server-updater")
              } catch (e) {}
              setTimeout(() => {
                h.value = !1
              }, 300)
            })
          }
          return {
            IS_BAN_UPDATE: u["u"],
            LOGO_ABOUT_US: d["b"],
            clientName: u["c"],
            version: f,
            visible: n,
            privacyProtocol: Object(o["computed"])(() => c["a"].getters.privacyProtocol),
            userProtocol: Object(o["computed"])(() => c["a"].getters.userProtocol),
            checkProtocol: r,
            handleCheckUpdate: p,
            checkLoading: h
          }
        }
      },
      b = m,
      g = (i("33c2"), i("2877")),
      _ = Object(g["a"])(b, a, n, !1, null, "de4bcfb8", null);
    t["a"] = _.exports
  },
  ad29: function(e, t, i) {
    "use strict";
    i.d(t, "a", (function() {
      return s
    }));
    var a = i("adeb"),
      n = i("e751");

    function s() {
      const {
        sendPoint: e,
        formatPointData: t,
        getPointRouteName: i
      } = Object(a["a"])();

      function s(t) {
        e("cake_login", {
          cake_operate: t
        })
      }

      function o(t) {
        e(n["d"].CakeAvatar, {
          cake_operate: t
        })
      }

      function c(t) {
        const i = t ? "member" : "non_member";
        e(n["d"].CakeAvatar, {
          cake_operate: "click_about_us_" + i
        })
      }

      function r(t) {
        const i = t ? "member" : "non_member";
        e(n["d"].CakeAvatar, {
          cake_operate: "click_sign_out_" + i
        })
      }
      return {
        PointLogin: s,
        PointNavMenuClick: t => e(n["d"].CakeNavMenu, {
          cake_operate: t,
          cake_position: i()
        }),
        PointHelpIcon: () => {
          e(n["d"].CakeHelp, {
            cake_operate: n["h"].HelpIcon,
            cake_position: i()
          })
        },
        PointHotKey() {
          return t(n["d"].CakeHelp, {
            cake_operate: n["h"].HotKey,
            cake_position: i()
          })
        },
        PointCustomerService: () => t(n["d"].CakeHelp, {
          cake_operate: n["h"].CustomerService,
          cake_position: i()
        }),
        PointHelpMenuClick: t => e(n["d"].CakeHelp, {
          cake_operate: t,
          cake_position: i()
        }),
        PointUserMenuClick: t => e(n["d"].CakeAvatar, {
          cake_operate: "click_user_menu_" + t,
          cake_position: i()
        }),
        PointUserInfo: o,
        PointContentUs: c,
        PointLogout: r
      }
    }
  },
  adeb: function(e, t, i) {
    "use strict";
    i.d(t, "a", (function() {
      return o
    }));
    var a = i("2b0e"),
      n = i("620a"),
      s = i("e751");

    function o() {
      var e;
      const t = null === (e = Object(a["getCurrentInstance"])()) || void 0 === e ? void 0 : e.proxy,
        i = Object(a["computed"])(() => {
          var e;
          return null === t || void 0 === t || null === (e = t.$route) || void 0 === e ? void 0 : e.name
        }),
        o = Object(a["computed"])(e => {
          const t = new Map([
            ["index", s["m"].Workbench],
            ["batchRetouch", s["m"].BatchRetouch],
            ["photoFinishing", s["m"].PhotoFinishing],
            ["exportList", s["m"].Export],
            ["importImage", s["m"].EmptyPage],
            ["Login", s["m"].Login],
            ["", ""]
          ]);
          return t.get(i.value) || ""
        }),
        c = () => o.value;

      function r(e, t) {
        return Object.freeze({
          event_id: e,
          data: t
        })
      }

      function l(e, t) {
        const i = n["a"].getInstance();
        i.event(e, t || {})
      }
      return {
        getPointRouteName: c,
        formatPointData: r,
        sendPoint: l
      }
    }
  },
  b2a7: function(e, t, i) {
    e.exports = i.p + "img/service-kefu_qrcode.93736edf.png"
  },
  b88d: function(e, t) {
    Number.prototype.toStrip = function(e = 12) {
      const t = this;
      return +parseFloat(t.toPrecision(e))
    }, Number.prototype.toRound = function(e = 3) {
      const t = this;
      return Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
    }, Number.prototype.toRoundByBase = function(e = .05) {
      const t = this;
      let i = e;
      if (e >= 1) return Math.round(t);
      let a = 0;
      while (1)
        if (a++, i *= 10, i >= 1) break;
      const n = t.toRound(2),
        s = n * Math.pow(10, a) % (e * Math.pow(10, a)) / Math.pow(10, a),
        o = e / 2,
        c = s > o ? n - s + e : n - s;
      return parseFloat(c.toFixed(a))
    }
  },
  baa2: function(e, t, i) {
    "use strict";
    i("2009")
  },
  bdb8: function(e, t, i) {
    "use strict";
    i.d(t, "a", (function() {
      return s
    }));
    var a = i("adeb"),
      n = i("e751");

    function s() {
      const {
        sendPoint: e,
        getPointRouteName: t
      } = Object(a["a"])();

      function i(t) {
        e(n["d"].CakeExportList, {
          cake_operate: t
        })
      }

      function s(i) {
        const a = i ? "member" : "non_member",
          s = "init_" + t() + "_" + a;
        e(n["d"].CakeExportList, {
          cake_operate: s
        })
      }

      function o(t) {
        e(n["d"].CakeExport, {
          cake_operate: t["cake_operate"]
        })
      }

      function c(t) {
        e(n["d"].CakeExport, t)
      }

      function r(t) {
        const i = t ? n["f"].EffectThumb : n["f"].OriginThumb;
        e(n["d"].CakeExport, {
          cake_operate: i
        })
      }

      function l() {
        e(n["d"].CakeExport, {
          cake_operate: "not_enough_sheets_continue"
        })
      }

      function u() {
        e(n["d"].CakeExport, {
          cake_operate: "not_enough_sheets_recharge"
        })
      }

      function d(t) {
        return () => e(n["d"].CakeExportList, {
          cake_operate: t
        })
      }

      function h() {
        e(n["d"].CakeExportList, {
          cake_operate: n["e"].ExportedTab
        })
      }

      function p() {
        e(n["d"].CakeExportList, {
          cake_operate: n["e"].ExportingTab
        })
      }

      function f() {
        e(n["d"].CakeExportList, {
          cake_operate: n["e"].BillingRulesPopup
        })
      }
      return {
        PointExportTable: i,
        PointInitExportTable: s,
        PointExport: o,
        PointExportThumbnail: r,
        PointExportClick: c,
        PointExportContinue: l,
        PointExportRecharge: u,
        PointExportListExportedTab: h,
        PointExportListExportingTab: p,
        PointExportListBillingRulesPopup: f,
        PointClickExportDetail: d(n["e"].ClickExportDetail)
      }
    }
  },
  bed2: function(e, t) {
    Date.prototype.Format = function(e) {
      const t = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
      };
      /(y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (const i in t) new RegExp("(" + i + ")").test(e) && (e = e.replace(RegExp.$1, 1 === RegExp.$1.length ? t[i] : ("00" + t[i]).substr(("" + t[i]).length)));
      return e
    }
  },
  c149: function(e, t, i) {
    "use strict";
    i("3370")
  },
  c476: function(e, t) {
    Array.prototype.indexOf = function(e) {
      for (let t = 0; t < this.length; t++)
        if (this[t] == e) return t;
      return -1
    }, Array.prototype.remove = function(e) {
      let t = this.indexOf(e);
      t > -1 && this.splice(t, 1)
    }
  },
  cd49: function(e, t, i) {
    "use strict";
    i.r(t);
    var a = i("2b0e"),
      n = i("8c4f"),
      s = i("3dfd"),
      o = (i("caad"), function() {
        var e = this,
          t = e._self._c;
        return t("el-container", {
          staticClass: "container"
        }, [t("el-header", {
          staticClass: "container-header"
        }, [t("span", {
          staticClass: "logo-tip c-primary"
        }, [e.TEXT_LOGO_RELATIVE_PATH ? t("img", {
          staticClass: "logo",
          attrs: {
            src: e.TEXT_LOGO_RELATIVE_PATH,
            alt: ""
          }
        }) : e._e()]), t("div", {
          staticClass: "right"
        }, [e.IS_CLIENT_PIX_PIE || e.IS_CLIENT_PixCake_EXPO ? e._e() : [t("el-button", {
          staticClass: "vip-plan",
          attrs: {
            type: "primary"
          },
          on: {
            click: e.handleClickMember
          }
        }, [e._v(" 会员充值 ")]), t("HelperMenu", {
          staticClass: "menu",
          staticStyle: {
            "margin-left": "12px",
            "margin-right": "-5px"
          }
        })], e.IS_CLIENT_PIX_PIE ? e._e() : t("div", {
          staticClass: "menu",
          on: {
            click: e.onSettingClick
          }
        }, [t("img", {
          staticClass: "setting-icon",
          attrs: {
            src: e.$getIconPath("nav_icon_set_up@3x.png"),
            alt: ""
          }
        })])], 2), e.IS_CLIENT_PIX_PIE ? e._e() : t("GpuSwitchDialog", {
          model: {
            value: e.showGpuSwitchSetting,
            callback: function(t) {
              e.showGpuSwitchSetting = t
            },
            expression: "showGpuSwitchSetting"
          }
        })], 1), t("el-main", {
          staticClass: "main",
          style: "padding: 0"
        }, [t("keep-alive", {
          attrs: {
            include: e.KEEP_ALIVE_PAGE
          }
        }, [t("router-view")], 1)], 1)], 1)
      }),
      c = [],
      r = i("5c96"),
      l = i("9710"),
      u = i("7b31"),
      d = i("74d8"),
      h = i("25c2"),
      p = i("67a1"),
      f = i("ad29"),
      m = {
        name: "LoginLayout",
        components: {
          "el-container": r["Container"],
          "el-header": r["Header"],
          "el-main": r["Main"],
          HelperMenu: l["a"],
          GpuSwitchDialog: u["a"]
        },
        setup() {
          const {
            PointLogin: e
          } = Object(f["a"])();
          let t = Object(a["ref"])(!1);
          const i = () => {
              e("click_member_price"), null === p["a"] || void 0 === p["a"] || p["a"].send("open-member-plan-window", null)
            },
            n = () => {
              t.value = !0
            };
          return {
            showVipPlan: !1,
            IS_CLIENT_PIX_PIE: h["v"],
            IS_CLIENT_PixCake_EXPO: h["w"],
            TEXT_LOGO_RELATIVE_PATH: d["d"],
            height: 700,
            KEEP_ALIVE_PAGE: [],
            showGpuSwitchSetting: t,
            handleClickMember: i,
            onSettingClick: n
          }
        }
      },
      b = m,
      g = (i("d6d0"), i("2877")),
      _ = Object(g["a"])(b, o, c, !1, null, "59b8829c", null),
      k = _.exports,
      v = function() {
        var e = this,
          t = e._self._c;
        return t("div", [t("keep-alive", {
          attrs: {
            include: e.KEEP_ALIVE_PAGE
          }
        }, [t("router-view")], 1), t("GlobalProcessTransport", {
          staticClass: "transport",
          class: {
            [e.routeName]: !0
          }
        }), t("DetectClipBoardPresetDialog")], 1)
      },
      C = [],
      y = i("ddbc"),
      w = i("ddca"),
      S = i("442f"),
      P = function() {
        var e = this,
          t = e._self._c;
        return e.showProcess ? t("div", {
          staticClass: "global-process-transport"
        }, [t("div", {
          staticClass: "desc"
        }, [e._v("正在进行数据升级" + e._s(e.percentage) + "%...")]), t("div", {
          staticClass: "progress"
        }, [t("el-progress", {
          attrs: {
            "show-text": !1,
            "text-inside": "",
            "stroke-width": 4,
            percentage: e.percentage
          }
        })], 1)]) : e._e()
      },
      x = [],
      E = i("9573");

    function j() {
      const e = Object(a["ref"])(!1),
        t = Object(a["ref"])(0),
        i = () => {
          const e = a["default"].extend(S["a"]),
            t = new e;
          null === t || void 0 === t || t.tsConfirm({
            title: "数据升级完成",
            message: "您需要重新启动" + h["b"],
            confirmButtonText: "重新启动",
            cancelButtonText: "下次启动",
            closeOnClickModal: !1
          }).then(() => {
            p["a"].send("app-restart", {
              clearCache: !1
            })
          }).catch(() => {})
        },
        n = () => {
          p["a"].on(E["a"].OnUpdateDataTransport, async (a, n) => {
            if (n.isFinish) t.value = 100, setTimeout(() => {
              e.value = !1, i()
            }, 300);
            else {
              e.value = !0;
              let i = n.currentStep - 1;
              i < 0 && (i = 0), t.value = Number(parseInt(i / Number(n.totalStep) * 1e3 + "")) / 10
            }
          })
        },
        s = () => {
          p["a"].removeAllListeners(E["a"].OnUpdateDataTransport)
        },
        o = async () => {
          const {
            has_merge: a,
            has_migrate: n,
            currentStep: s,
            totalStep: o
          } = await p["a"].send(E["a"].OnCheckDataMigrateFinish);
          if (n && !a) i();
          else {
            let i = s - 1;
            i >= 0 && o > 0 && i <= o && (t.value = Number(parseInt(i / Number(o) * 1e3 + "")) / 10, e.value = !0)
          }
        };
      return {
        percentage: t,
        showProcess: e,
        addListener: n,
        removeListener: s,
        checkMigrate: o
      }
    }
    var T = {
        components: {
          "el-progress": r["Progress"]
        },
        setup(e) {
          const {
            showProcess: t,
            percentage: i,
            addListener: n,
            removeListener: s,
            checkMigrate: o
          } = j();
          return Object(a["onMounted"])(n), Object(a["onUnmounted"])(s), Object(a["onMounted"])(o), {
            showProcess: t,
            percentage: i
          }
        }
      },
      O = T,
      I = (i("3c0a"), Object(g["a"])(O, P, x, !1, null, "0540f97c", null)),
      L = I.exports,
      R = {
        name: "UserLayout",
        components: {
          GlobalProcessTransport: L
        },
        mixins: [w["a"], S["a"]],
        setup(e) {
          var t;
          const {
            addRechargeEventListener: i,
            removeRechargeEventListener: n,
            checkMigrate: s
          } = Object(y["a"])();
          Object(a["onMounted"])(i), Object(a["onUnmounted"])(n);
          const o = null === (t = Object(a["getCurrentInstance"])()) || void 0 === t ? void 0 : t.proxy,
            c = Object(a["computed"])(() => {
              var e;
              return null === o || void 0 === o || null === (e = o.$route) || void 0 === e ? void 0 : e.name
            });
          return {
            routeName: c,
            KEEP_ALIVE_PAGE: []
          }
        }
      },
      B = R,
      N = (i("8cd5"), Object(g["a"])(B, v, C, !1, null, "c3f1b146", null)),
      D = N.exports;
    const A = [{
      path: "/",
      redirect: {
        name: "index"
      }
    }, {
      path: "/",
      component: k,
      children: [{
        path: "login",
        component: () => i.e("chunk-236302bd").then(i.bind(null, "7101")),
        name: "Login",
        meta: {
          title: "登录页"
        }
      }]
    }, {
      path: "/",
      component: D,
      children: [{
        path: "/",
        component: () => Promise.all([i.e("chunk-2462abde"), i.e("chunk-519ddab2")]).then(i.bind(null, "1c8b")),
        children: [{
          path: "index",
          component: () => Promise.all([i.e("chunk-c91d35a6"), i.e("chunk-d650e566")]).then(i.bind(null, "16c0")),
          name: "index",
          meta: {
            title: "工作台",
            requiresAuth: !0
          }
        }, {
          path: "exportList",
          name: "exportList",
          props: ({
            query: e
          }) => ({
            thumbnail: e.thumbnail,
            preset: e.preset
          }),
          component: () => Promise.all([i.e("chunk-7091432f"), i.e("chunk-79719501")]).then(i.bind(null, "b9f0")),
          meta: {
            title: "导出列表",
            requiresAuth: !0
          }
        }]
      }, {
        path: "/project",
        component: () => Promise.all([i.e("chunk-2462abde"), i.e("chunk-be22945a"), i.e("chunk-3aa35bb6")]).then(i.bind(null, "a5d8")),
        name: "project",
        redirect: "/project/importImage",
        children: [{
          path: "/project/importImage",
          component: () => i.e("chunk-7e536582").then(i.bind(null, "1d34")),
          name: "importImage",
          meta: {
            title: "导入图片",
            requiresAuth: !0
          }
        }, {
          path: "/project/batchRetouch",
          name: "batchRetouch",
          component: () => Promise.all([i.e("chunk-c91d35a6"), i.e("chunk-4ba3a1af"), i.e("chunk-6b7f39ea")]).then(i.bind(null, "6e8b")),
          meta: {
            title: "批量修图",
            requiresAuth: !0
          }
        }, {
          path: "/project/photoFinishing",
          name: "photoFinishing",
          props: ({
            query: e
          }) => ({
            thumbnail: e.thumbnail,
            preset: e.preset
          }),
          component: () => Promise.all([i.e("chunk-c91d35a6"), i.e("chunk-4ba3a1af"), i.e("chunk-be22945a"), i.e("chunk-7091432f"), i.e("chunk-43f57a8f")]).then(i.bind(null, "1b47")),
          meta: {
            title: "图片精修",
            requiresAuth: !0
          }
        }]
      }]
    }];
    var M = A,
      F = i("0613"),
      $ = i("6ac5"),
      G = i("8ec2"),
      z = i("64a0");
    a["default"].use(n["a"]);
    const H = new n["a"]({
        linkExactActiveClass: "link-active",
        scrollBehavior(e, t, i) {
          return {
            x: 0,
            y: 0
          }
        },
        routes: M
      }),
      U = () => new Promise(async (e, t) => {
        const i = await Object($["b"])();
        if (console.log("isLogin.token", i), i) {
          if (!F["a"].getters.isLogin) {
            let e = await G["a"].instance().getUser();
            console.log("isLogin.userModel", e), F["a"].commit("loadUserCacheData", e)
          }
          e(null)
        } else t()
      });
    H.beforeEach(async (e, t, i) => {
      const {
        name: a,
        meta: n
      } = e;
      let s = ["batchRetouch", "photoFinishing", "template", "rawBatchConvert", "importImage"],
        o = ["batchRetouch", "photoFinishing", "template", "rawBatchConvert", "importImage", "exportList"];
      if (console.log(`beforeEach to.name = ${e.name},from.name = ${t.name}`), "index" === t.name && s.includes(a)) {
        const t = F["a"].getters["project/activeProject"];
        t && t.name && p["a"].send("onProjectEntry", {
          name: t.name,
          projectId: t.id,
          pageId: e.name
        })
      }
      "index" == e.name && p["a"].send("on-enter-workspace", ""), o.includes(a);
      let c = ["batchRetouch", "photoFinishing", "template"];
      if (F["a"].commit("changeDownloadPermission", c.includes(a)), z["a"].reset(), n && n.requiresAuth) try {
        if (await U(), !F["a"].getters.hasInitUserConfig) try {
          const e = F["a"].getters.userId;
          if (console.log("store.getters.userId :", e), !(e && e > 0)) return void i({
            name: "Login"
          }); {
            await F["a"].dispatch("init_ori_preset", {
              userId: e
            }), F["a"].commit("INIT_USER_CONFIG", !0), F["a"].dispatch("getPresetClass");
            let t = await G["a"].instance().getUser(),
              {
                vipInfo: i,
                userInfo: a,
                watermark: n
              } = t,
              s = i,
              o = a;
            F["a"].dispatch("updateVipInfo", {
              vip_info: s,
              user_info: o,
              watermark: n
            }), F["a"].dispatch("loadAllPresents", {
              userId: e,
              loadDb: !0
            }), F["a"].dispatch("initMenuList")
          }
        } catch (r) {
          console.error(r)
        }
        i()
      } catch (r) {
        console.error(r), i({
          name: "Login"
        })
      } else i()
    }), H.afterEach((e, t) => {
      const {
        name: i,
        meta: n
      } = e;
      var s, o;
      n && n.title && (null === (s = a["default"].prototype.$tsStat) || void 0 === s || s.pageview({
        path: e.path,
        name: e.name,
        title: null === (o = e.meta) || void 0 === o ? void 0 : o.title
      }))
    });
    var K = H,
      W = i("2ead"),
      q = i.n(W),
      V = i("7f45"),
      X = i.n(V),
      J = i("6ebf"),
      Y = i("4897"),
      Q = i.n(Y),
      Z = i("26ba"),
      ee = i("b35f"),
      te = {
        install: e => {
          const t = "darwin";
          e.prototype.$platform = t, e.prototype.$isMac = "darwin" === t, e.prototype.$isWin = "win32" === t, e.prototype.$isDev = !1, e.prototype.$isBeta = !1, e.prototype.$isPro = !0, e.prototype.$getIconPath = ee["a"], e.prototype.$openExternal = e => {
            console.log(e), p["a"].send("open-external-link", {
              href: e
            })
          }, e.prototype.$appQuit = () => {}, e.prototype.$appRestart = () => {}, e.prototype.$IS_CLIENT_PIX_PIE = h["v"], e.prototype.$IS_CLIENT_PixCake_EXPO = h["w"], e.config.errorHandler = function(e) {
            console.error(e)
          }
        }
      };

    function ie() {
      a["default"].directive("blur", {
        bind(e) {
          e.addEventListener("click", e => {
            var t;
            let i = e.target;
            null !== (t = i) && void 0 !== t && t.nodeName && ["i", "span"].includes(i.nodeName.toLocaleLowerCase()) && (i = e.target.parentNode), i.blur()
          })
        },
        unbind(e) {
          e.removeEventListener("click", () => {})
        }
      })
    }
    var ae = i("2ef0"),
      ne = i("620a");
    const se = Object(ae["debounce"])((function({
      event_id: e,
      data: t
    }) {
      if (e) {
        const i = ne["a"].getInstance();
        i.event(e, t)
      }
    }), 100, {
      maxWait: 300
    });

    function oe() {
      a["default"].directive("gtag-event", {
        bind(e, t) {
          t.value ? e.addEventListener("click", () => {
            if ("function" === typeof t.value) {
              const e = t.value();
              e && (e.event_id ? se(e) : console.error("Please set valid parameters！exp: { event_id: string, data?: any }"))
            } else se(t.value)
          }) : console.error("Please set valid parameters！exp: { event_id: string, data?: any }")
        },
        unbind(e) {
          e.removeEventListener("click", () => {})
        }
      }), a["default"].directive("gtag-dbl-event", {
        bind(e, t) {
          t.value ? e.addEventListener("dblclick", () => {
            "function" === typeof t.value ? t.value() : se(t.value)
          }) : console.error("Please set valid parameters！exp: { event_id: string, data: any }")
        },
        unbind(e) {
          e.removeEventListener("dblclick", () => {})
        }
      })
    }
    var ce = i("cbc0"),
      re = (i("d227"), i("d328"), i("3c66"), i("ae98"), i("b692")),
      le = i("fa7d"),
      ue = i("2f62"),
      de = i("45a3");
    const he = h["d"];
    async function pe() {
      return await de["a"].findGroupByExpression(he)
    }
    class fe {
      constructor(e) {
        this.id = 0, this.buildCLKernel = !1, this.onVipPlanClick = !1, this.createNewDir = !0, this.setDefaultPath = !1, this.restoreImportDir = !1, this.showEffectThumb = !0, this.changeSETSwitch = !1, this.showImageDescription = !0, this.defaultSavePath = null, this.defaultCacheNumber = 3, this.previewSize = 0, this.changeToSRGB = !1, this.buildCLKernel = e, h["v"] && (this.createNewDir = !1, this.showImageDescription = !1)
      }
      static create(e) {
        if (null == e || 0 === e.length) return new fe(!1);
        let t = e[0];
        return this.createForJson(t)
      }
      static createForJson(e) {
        let t = new fe(e.buildCLKernel || !1);
        return t.id = e.id, t.createNewDir = !!e.createNewDir, t.setDefaultPath = !!e.setDefaultPath, t.restoreImportDir = !!e.restoreImportDir, t.showEffectThumb = !!e.showEffectThumb, t.showImageDescription = !!e.showImageDescription, t.changeSETSwitch = !!e.changeSETSwitch, t.defaultSavePath = e.defaultSavePath, t.defaultCacheNumber = e.defaultCacheNumber, t.previewSize = e.previewSize, t.changeSETSwitch = e.changeSETSwitch, t.changeToSRGB = e.changeToSRGB, t
      }
      toJson() {
        let e = {
          ...this
        };
        return e.createNewDir = this.createNewDir ? 1 : 0, e.setDefaultPath = this.setDefaultPath ? 1 : 0, e.restoreImportDir = this.restoreImportDir ? 1 : 0, e.showEffectThumb = this.showEffectThumb ? 1 : 0, e.showImageDescription = this.showImageDescription ? 1 : 0, e.buildCLKernel = this.buildCLKernel ? 1 : 0, e.onVipPlanClick = this.onVipPlanClick ? 1 : 0, e.changeSETSwitch = this.changeSETSwitch ? 1 : 0, e.showImageDescription = this.showImageDescription ? 1 : 0, e.changeToSRGB = this.changeToSRGB ? 1 : 0, e.changeSETSwitch = this.changeSETSwitch ? 1 : 0, e
      }
    }
    var me = i("2a18"),
      be = i("ea3f"),
      ge = i("2372");
    var _e = a["default"].extend({
        mixins: [],
        computed: {
          ...Object(ue["c"])(["userId"]),
          ...Object(ue["c"])("config", ["diskWarnCondition"])
        },
        created() {},
        mounted() {
          this.initGlobalConfig().then(e => {}), this.listenMemberVipEvent(), this.preventGlobalKeydownSpaceEvent()
        },
        methods: {
          ...Object(ue["d"])("config", ["initConfig", "initExportTaskConfig", "initEnableOpenCL"]),
          ...Object(ue["b"])("config", ["initPixCookEnableOpenGLType"]),
          ...Object(ue["b"])(["asyncLoadServiceInfo", "loadVipInfo", "asyncOnPaySuccess"]),
          getFitSingleColumnSize() {
            let e = Object(le["j"])() - 300 - 204,
              t = Object(le["i"])() - 60;
            return Object(le["e"])(e, t, 1, 1)
          },
          async getUserInfo() {
            try {
              await this.loadVipInfo()
            } catch (e) {
              console.log(e)
            }
          },
          async initGlobalConfig() {
            let e = await pe(),
              t = fe.create(e);
            await this.initConfig(t);
            let i = await Object(me["a"])();
            this.initExportTaskConfig(i);
            let a = await Object(me["b"])();
            this.initEnableOpenCL(a), await this.initPixCookEnableOpenGLType();
            let n = await window.$net.isOnline();
            n && this.asyncLoadServiceInfo()
          },
          listenMemberVipEvent() {},
          preventGlobalKeydownSpaceEvent() {
            document.body.onkeydown = function(e) {
              if ("Space" === e.code) {
                if (["TEXTAREA", "INPUT"].includes(e.target.nodeName) || "true" === e.target.contentEditable) return;
                const t = window.event || e;
                t.preventDefault ? t.preventDefault() : window.event.returnValue = !1
              }
            }
          },
          getWorkSpaceDiskRoot() {
            return ""
          },
          isInSystemDisk(e) {
            return !1
          },
          getSystemDiskRootPath() {
            return null
          },
          getDiskFreeSpaceAsShort(e) {
            let t = 0;
            return t = this.$isWin ? e.available / 1024 / 1024 / 1024 : e.available / 1e3 / 1e3 / 1e3, t
          },
          async checkDiskSpaceIfNeed(e) {
            let t = !1;
            const i = this.diskWarnCondition.minWorkSpaceFreeCapacity,
              a = this.diskWarnCondition.minSystemDiskFreeCapacity;
            console.log(`checkDiskSpaceIfNeed，最小工作空间:${i}g,最小系统盘:${a}g`);
            let n, s = await be["a"].getWorkSpacePath(),
              o = (await ge["a"].parse(s)).root.toUpperCase();
            if (this.$isWin) {
              const e = await be["a"].getDiskSize(o + ":");
              let t = await be["a"].getWindowSystemDisk(),
                i = (await ge["a"].parse(t)).root.toUpperCase(),
                a = await be["a"].getDiskSize(i + ":");
              e.isValid && a.isValid ? n = e.available <= a.available ? e : a : e.isValid ? n = e : a.isValid && (n = a)
            } else n = await be["a"].getDiskSize(o);
            if (n && n.isValid) {
              let i = this.getDiskFreeSpaceAsShort(n);
              console.log(`获得当前的${n.diskPath}:磁盘容量为:${i}`), t = i < a, t && this.tsConfirm({
                title: "Hệ thống nhắc",
                message: "检测到您的磁盘空间不足，建议您清理磁盘空间后再继续使用" + h["b"],
                showCancelButton: !1
              }).then(async t => {
                e && e()
              }).catch(e => {})
            }
            return t
          },
          async checkFreeDiskSpaceIsEnough(e, t) {
            return !0
          }
        }
      }),
      ke = (i("c476"), i("ee71"), i("bed2"), i("b88d"), i("2944")),
      ve = i("f946"),
      Ce = i("fadb"),
      ye = i("f4e0"),
      we = i("9f7e"),
      Se = i("2ed5"),
      Pe = i("751a");
    let xe = null;

    function Ee() {
      return xe || (xe = Object(Pe["d"])(Object(Pe["a"])({
        baseURL: Object(Pe["b"])() + "/v1/api/report",
        crossDomain: !1,
        withCredentials: !0,
        headers: {
          "Content-Type": "application/json"
        }
      }), {
        request: !0
      })), xe
    }
    var je = i("93b6"),
      Te = i("2fcc"),
      Oe = i("4752"),
      Ie = i("93c3");

    function Le(e) {
      return e.interceptors.response.use(e => e, async e => {
        console.error("[addResponseInterceptor]: ", e);
        const t = Object(ae["get"])(e, "status", null),
          i = ["/v1/app/send_verify_code", "/v1/app/login"];
        if (t && 401 === t && -1 === e.config.baseURL.indexOf("/proxy") && !i.includes(e.config.url) && F["a"].getters.isLogin) {
          const e = {
            message: "登录状态已失效，请重新登录",
            offset: 68,
            type: "custom",
            duration: 4e3,
            customClass: "custom"
          };
          Object(r["Message"])(e), await F["a"].dispatch("ExitLogin", !1), await K.push({
            name: "Login"
          })
        }
        throw e
      }), e
    }

    function Re() {
      Le(Object(ve["h"])()), Le(Object(Ce["a"])()), Le(Object(Ce["b"])()), Le(Object(ye["a"])()), Le(Object(ye["b"])()), Le(Object(we["c"])()), Le(Object(we["d"])()), Le(Object(we["e"])()), Le(Object(we["f"])()), Le(Object(Se["b"])()), Le(Object(Se["c"])()), Le(Ee()), Le(Object(je["g"])()), Le(Object(je["h"])()), Le(Object(je["i"])()), Le(Object(Te["b"])()), Le(Object(Oe["b"])()), Le(Object(Ie["d"])())
    }
    var Be = i("4a9f"),
      Ne = i("a455");
    const De = {
      install(e, t) {
        e.prototype.$aboutUsDialog = function(t, i) {
          let a = e.extend(Ne["a"]);
          const n = new a({
            propsData: {
              ...i
            }
          }).$mount();
          return t.appendChild(n.$el), n
        }
      }
    };
    var Ae = De;
    a["default"].use(Ae);
    var Me, Fe, $e = {
        data() {
          return {
            showAboutUsDialog: !1,
            aboutCallBackRef: null,
            aboutEl: null
          }
        },
        mounted() {
          this.aboutEl = this.$aboutUsDialog(document.getElementById("app"), {
            value: this.showAboutUsDialog
          }), this.aboutEl.$on("input", e => {
            this.showAboutUsDialog = e, this.aboutEl.$props.value = e
          }), this.aboutCallBackRef = () => {
            this.showAboutUsDialog = !0, this.aboutEl.$props.value = this.showAboutUsDialog
          }, p["a"].on("qt_show_about", this.aboutCallBackRef)
        },
        beforeDestroy() {
          p["a"].off("qt_show_about", this.aboutCallBackRef), this.aboutEl.$off("input")
        }
      },
      Ge = $e,
      ze = Object(g["a"])(Ge, Me, Fe, !1, null, null, null),
      He = ze.exports,
      Ue = i("5b34");
    ke["a"].presetSuit;
    Q.a.i18n((e, t) => J["a"].t(e, t)), a["default"].use(q.a, {
      moment: X.a
    }), a["default"].use(Z["a"]), a["default"].use(te), a["default"].use(ie), a["default"].use(oe), Object(re["a"])("dark"), a["default"].config.productionTip = !1;
    const Ke = ne["a"].getInstance();
    a["default"].prototype.$tsStat = Ke;
    const We = n["a"].prototype.push;
    n["a"].prototype.push = function(e) {
      return We.call(this, e).catch(e => e)
    };
    let qe = !1,
      Ve = !1;
    const Xe = qe ? 200 : 0;
    Object(ce["c"])(() => {
      setTimeout(async () => {
        await be["a"].init(), await Ue["a"].getInstance().readJsonFromLocal(), Re(), new a["default"]({
          i18n: J["a"],
          router: K,
          store: F["a"],
          mixins: [_e, S["a"], He],
          beforeCreate: async function() {
            const e = await Object(J["b"])();
            J["a"].locale = e, X.a.locale(e)
          },
          mounted() {
            console.log("vue mounted: ", new Date), p["a"].on("qt_on_loginOut", () => {
              F["a"].dispatch("ExitLogin"), F["a"].commit("clearExportTask"), this.$router.replace({
                name: "Login"
              }), this.$tsStat.logout()
            }), Be["i"].addListener(Be["g"], e => {
              this.tsNotify(e)
            }), Be["i"].addListener(Object(Be["a"])(Be["d"]), e => {
              if (Ve) return;
              Ve = !0;
              let t = {
                message: "检查您的数据库已损坏，为了不影响您的正常使用，将为您Gần应用并进行清除数据库便于继续正常使用.【备注】清理数据库后，您之前的数据将会丢失,如自动修复后还是出现该问题，请点击手动修复，会打MởTập tin夹，手动删除文件夹中 *.db为后缀相关的文件",
                confirmButtonText: "自动修复",
                cancelButtonText: "手动修复"
              };
              this.tsConfirmForUseHtml(t).then(async e => {
                Ve = !1, await Be["i"].replyDialogConfirm(!0)
              }).catch(async () => {
                Ve = !1, await Be["i"].replyDialogConfirm(!1)
              })
            }), Be["i"].addListener(Be["h"], e => {
              F["a"].commit("_SetShowPaySuccess", !0), F["a"].dispatch("asyncOnPaySuccess"), F["a"].dispatch("loadVipInfo")
            }), Be["i"].addListener(Be["e"], e => {
              let t = "";
              e.diskTypeStr && (t = " " + e.diskTypeStr + " ");
              let i = `因导出路径磁盘空间${t}不足Không có法导出，建议您更改磁盘路径或清理磁盘空间后再导出`;
              this.tsConfirm({
                title: i,
                confirmButtonText: "好的",
                showCancelButton: !1,
                distinguishCancelAndClose: !0,
                needHandleReject: !0
              }).then(() => {
                F["a"].dispatch("updateIsRefreshExportDiskErrConfirm")
              }).catch(e => {
                "close" === e && F["a"].dispatch("updateIsRefreshExportDiskErrConfirm")
              })
            })
          },
          render: e => e(s["a"])
        }).$mount("#app")
      }, Xe)
    }), a["default"].use(ce["b"])
  },
  d6d0: function(e, t, i) {
    "use strict";
    i("22ca")
  },
  ddbc: function(e, t, i) {
    "use strict";
    i.d(t, "a", (function() {
      return l
    }));
    var a = i("2b0e"),
      n = i("67a1"),
      s = i("4a9f"),
      o = i("25c2"),
      c = i("879d"),
      r = i("bdb8");

    function l() {
      var e;
      const t = Object(a["ref"])(!1),
        i = null === (e = Object(a["getCurrentInstance"])()) || void 0 === e ? void 0 : e.proxy,
        {
          PointExportRecharge: l
        } = Object(r["a"])(),
        u = async (e = "套餐剩余可用张数不足，Không có法成功导出，请及时充值哦", a) => {
          t.value = !0;
          let s = e;
          const r = await c["a"].getInstance().getIsAllowTopUp();
          let u = "马上充值";
          r || (s = `套餐剩余可用张数不足，Không có法成功导出，${o["v"]?"请联系管理员":"请联系贵司管理员补充张数哦"}。`, u = "Tôi biết."), null === i || void 0 === i || i.tsConfirm({
            title: s,
            confirmButtonText: u,
            showCancelButton: !1,
            closeOnClickModal: !1,
            needHandleReject: !0
          }).then(() => {
            l(), (null === a || void 0 === a ? void 0 : a.onSuccess) && (null === a || void 0 === a || a.onSuccess()), t.value = !1, r && (n["a"].send("open-member-plan-window", null), null === i || void 0 === i || i.PointMemberPriceClick())
          }).catch(() => {
            (null === a || void 0 === a ? void 0 : a.onCancel) && (null === a || void 0 === a || a.onCancel()), t.value = !1
          })
        }, d = () => {
          s["i"].addListener(s["b"], async () => {
            t.value || await u()
          })
        }, h = () => {
          s["i"].removeListener(s["b"])
        };
      return {
        showPayTip: t,
        addRechargeEventListener: d,
        removeRechargeEventListener: h,
        showFundLackView: u
      }
    }
  },
  ddca: function(e, t, i) {
    "use strict";
    var a = i("2f62"),
      n = function() {
        var e = this,
          t = e._self._c;
        return t("el-dialog", {
          attrs: {
            top: "30vh",
            width: "400px",
            "custom-class": "common-dialog cover-dialog myDialog",
            visible: e.visible,
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !0,
            "before-close": e.onClose
          },
          on: {
            "update:visible": function(t) {
              e.visible = t
            }
          }
        }, [t("div", {
          staticClass: "title"
        }, [e._v(" " + e._s(e.title) + " ")]), t("div", {
          staticClass: "claContent"
        }, [t("el-input", {
          ref: "inputPrestIdName",
          attrs: {
            placeholder: "请输入Đặt trước口令",
            maxlength: e.maxInputLen
          },
          nativeOn: {
            keydown: [function(t) {
              return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.onSubmit.apply(null, arguments)
            }, function(t) {
              if (!t.type.indexOf("key") && e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"])) return null;
              t.stopPropagation()
            }]
          },
          model: {
            value: e.code,
            callback: function(t) {
              e.code = t
            },
            expression: "code"
          }
        })], 1), t("div", {
          staticClass: "footer"
        }, [t("el-button", {
          staticClass: "claBotButton",
          attrs: {
            type: "default"
          },
          on: {
            click: e.onClose
          }
        }, [e._v(" Hủy ")]), t("el-button", {
          attrs: {
            type: "primary",
            loading: e.loading
          },
          on: {
            click: e.onSubmit
          }
        }, [e._v("导入 ")])], 1)])
      },
      s = [],
      o = i("67a1"),
      c = i("442f"),
      r = i("93b6"),
      l = i("74f7"),
      u = i("7b9a"),
      d = i("3010"),
      h = i("f5de");
    const p = new u["a"];
    var f = {
        name: "ImportPresetDialog",
        mixins: [c["a"]],
        components: {
          "el-dialog": h["a"]
        },
        props: {
          value: {
            type: Boolean,
            value: !1
          }
        },
        data() {
          return {
            visible: this.value,
            title: "Đặt trước口令",
            code: "",
            loading: !1,
            maxInputLen: 64
          }
        },
        computed: {
          ...Object(a["c"])(["userId"])
        },
        watch: {
          value: {
            handler(e) {
              this.visible = e;
              const t = d["a"].getInstance();
              e ? (t.unRegisterShortcut(), this.$nextTick(e => {
                this.$refs.inputPrestIdName.focus()
              })) : t.registerShortcut()
            }
          },
          visible(e) {
            this.$emit("input", e)
          },
          code(e) {
            e && (this.code = p.clearPlaceholder(this.code))
          }
        },
        methods: {
          ...Object(a["b"])(["loadPresetsFromDb"]),
          ...Object(a["b"])(["getPresetClass", "loadAllPresents"]),
          onClose() {
            this.visible = !1
          },
          async onSubmit() {
            if (this.code.trim()) {
              this.loading = !0;
              try {
                await Object(r["o"])(this.code, l["b"]), await this.getPresetClass(!0), await this.loadAllPresents({
                  userId: this.userId,
                  loadDb: !0
                });
                const e = await Object(r["m"])(this.code);
                1 === e.setting_total_count ? this.tsNotify(`“${e.settings_info[0].name}”Đặt trướcNhập khẩu`, {
                  duration: 1e3
                }) : this.tsNotify(`“${e.settings_info[0].name}”等${e.setting_total_count}个Đặt trướcNhập khẩu`, {
                  duration: 1e3
                }), this.loading = !1, this.visible = !1
              } catch (e) {
                switch (this.loading = !1, e.data.code) {
                  case 37:
                    this.tsNotify("分享口令的Sẵn không tồn tại～", {
                      duration: 1e3
                    }), this.visible = !1;
                    break;
                  case 38:
                    this.tsNotify("口令来源于自己分享的Đặt trước，导入失败～", {
                      duration: 1e3
                    }), this.visible = !1;
                    break;
                  case 39:
                    this.tsNotify("当前Để nhập định sẵn已存在～"), this.visible = !1;
                    break;
                  case 41:
                    try {
                      const t = this.$root;
                      this.visible = !1, t.tsConfirm({
                        message: e.data.message,
                        confirmButtonText: "立即更新"
                      }), o["a"].send("app-client-update-check")
                    } catch (t) {}
                    break;
                  default:
                    this.tsNotify(e.data.message, {
                      duration: 1e3
                    }), this.visible = !1
                }
              }
            } else this.tsNotify("请输入正确的Đặt trước口令")
          }
        }
      },
      m = f,
      b = (i("4088"), i("2877")),
      g = Object(b["a"])(m, n, s, !1, null, "0f595300", null),
      _ = g.exports,
      k = function() {
        var e = this,
          t = e._self._c;
        return t("el-dialog", {
          attrs: {
            top: "30vh",
            width: "400px",
            "custom-class": "common-dialog cover-dialog myDialog",
            visible: e.visible,
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "show-close": !0,
            "before-close": e.onClose
          },
          on: {
            "update:visible": function(t) {
              e.visible = t
            }
          }
        }, [t("div", {
          staticClass: "title"
        }, [e._v(" " + e._s(e.title) + " ")]), t("div", {
          staticClass: "claContent"
        }, [t("el-input", {
          ref: "inputPrestName",
          attrs: {
            placeholder: "Phân loại名称",
            maxlength: e.maxInputLen
          },
          nativeOn: {
            keydown: [function(t) {
              return !t.type.indexOf("key") && e._k(t.keyCode, "enter", 13, t.key, "Enter") ? null : e.onSubmit.apply(null, arguments)
            }, function(t) {
              if (!t.type.indexOf("key") && e._k(t.keyCode, "space", 32, t.key, [" ", "Spacebar"])) return null;
              t.stopPropagation()
            }]
          },
          model: {
            value: e.typeName,
            callback: function(t) {
              e.typeName = t
            },
            expression: "typeName"
          }
        })], 1), t("div", {
          staticClass: "footer"
        }, [t("el-button", {
          staticClass: "claBotButton",
          attrs: {
            type: "default"
          },
          on: {
            click: e.onClose
          }
        }, [e._v(" Hủy ")]), t("el-button", {
          attrs: {
            type: "primary",
            loading: e.loading
          },
          on: {
            click: e.onSubmit
          }
        }, [e._v("Tiết kiệm ")])], 1)])
      },
      v = [],
      C = {
        name: "NewPresetTypeDialog",
        mixins: [c["a"]],
        components: {
          "el-dialog": h["a"]
        },
        props: {
          value: {
            type: Boolean,
            value: !1
          }
        },
        data() {
          return {
            visible: this.value,
            title: "Phân loại mới",
            typeName: "",
            loading: !1,
            maxInputLen: 10
          }
        },
        computed: {
          ...Object(a["c"])([])
        },
        watch: {
          value: {
            handler(e) {
              this.visible = e;
              const t = d["a"].getInstance();
              e ? (t.unRegisterShortcut(), this.$nextTick(e => {
                this.$refs.inputPrestName.focus()
              })) : t.registerShortcut()
            },
            immediate: !0
          },
          visible(e) {
            this.$emit("input", e)
          }
        },
        methods: {
          ...Object(a["b"])(["getPresetClass"]),
          onClose() {
            this.visible = !1
          },
          async onSubmit() {
            if (this.typeName.trim()) {
              this.loading = !0;
              try {
                const e = await Object(r["c"])(this.typeName);
                await this.getPresetClass(!0), this.loading = !1, this.tsNotify("Phân loại mới成功～"), this.$emit("loadPreset", e.id), this.typeName = "", this.visible = !1
              } catch (e) {
                console.log("Đặt trướcPhân loại创建失败=====>", e)
              }
            } else this.tsNotify("请输入正确的Phân loại名称")
          }
        }
      },
      y = C,
      w = (i("6fb0"), Object(b["a"])(y, k, v, !1, null, "c2ee10a4", null)),
      S = w.exports,
      P = i("e724"),
      x = function() {
        var e = this;
        e._self._c, e._self._setupProxy;
        return e._e()
      },
      E = [],
      j = i("6310"),
      T = i("2b0e"),
      O = i("0613"),
      I = i("5c96"),
      L = T["default"].extend({
        name: "DetectClipBoardPresetDialog",
        mixins: [c["a"]],
        methods: {
          ...Object(a["b"])(["getPresetClass", "loadAllPresents"])
        },
        setup(e, {
          emit: t
        }) {
          const i = Object(T["getCurrentInstance"])().proxy,
            a = O["a"].getters["userId"],
            n = Object(T["ref"])(!1),
            s = Object(T["reactive"])({
              isWaitingImport: !1,
              fromName: "测试Đặt trước...",
              presetName: "",
              presetVersion: null,
              presetToken: null,
              setting_total_count: 0
            }),
            c = Object(T["computed"])(() => {
              let e = s.fromName;
              return e ? e.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") + " 给你分享了Đặt trước" : ""
            }),
            d = Object(T["computed"])(() => {
              let e = s.presetName;
              if (!e) return "";
              let t = null === i || void 0 === i ? void 0 : i.$createElement,
                a = null,
                n = {
                  style: "font-size: 16px;font-weight: 500; margin: 12px 0 16px"
                },
                o = {
                  style: "font-size: 15px;font-weight: 500; margin: 12px 2px 16px 2px;color:#F5D228"
                };
              return 1 === s.setting_total_count ? (a = t("div", n, [t("span", n, "检测到“"), t("span", o, "" + e), t("span", n, "”Đặt trước，是否导入？")]), a) : (a = t("div", n, [t("span", n, "检测到“"), t("span", o, "" + e), t("span", n, "”等"), t("span", n, s.setting_total_count + "个预设，是否导入？")]), a)
            }),
            h = () => {
              let e = new u["a"];
              e.clearPresetToken(), t("onClose")
            },
            p = () => {
              let e = I["Loading"].service({
                background: "transparent",
                customClass: "mini"
              });
              const t = s.presetName;
              Object(r["o"])(s.presetToken, l["b"]).then(async n => {
                e.close(), await (null === i || void 0 === i ? void 0 : i.getPresetClass(!0)), await (null === i || void 0 === i ? void 0 : i.loadAllPresents({
                  userId: a,
                  loadDb: !0
                })), 1 === n.setting_total_count ? null === i || void 0 === i || i.tsNotify(`“${t}”Đặt trướcNhập khẩu`, {
                  duration: 1e3
                }) : null === i || void 0 === i || i.tsNotify(`“${t}”等${n.setting_total_count}个Đặt trướcNhập khẩu`, {
                  duration: 1e3
                })
              }).catch(async t => {
                switch (e.close(), t.data.code) {
                  case 37:
                    null === i || void 0 === i || i.tsNotify("分享口令的Sẵn không tồn tại～", {
                      duration: 1e3
                    }), n.value = !1;
                    break;
                  case 38:
                    null === i || void 0 === i || i.tsNotify("口令来源于自己分享的Đặt trước，导入失败～", {
                      duration: 1e3
                    }), n.value = !1;
                    break;
                  case 39:
                    null === i || void 0 === i || i.tsNotify("当前Để nhập định sẵn已存在～"), n.value = !1;
                    break;
                  case 41:
                    try {
                      await (null === i || void 0 === i ? void 0 : i.tsConfirm({
                        title: `${t.data.data.fail_info.imcompatible_list[0]}等${t.data.data.fail_info.not_exist_count}个Đặt trướcKhông có法导入`,
                        message: "当前Để nhập định sẵn与当前软件版本不兼容，请升级至最新版本后再试",
                        confirmButtonText: "立即更新"
                      })), o["a"].send("app-client-update-check"), n.value = !1
                    } catch (a) {}
                    break;
                  default:
                    null === i || void 0 === i || i.tsNotify(t.data.message, {
                      duration: 1e3
                    }), n.value = !1
                }
              })
            };
          async function f() {
            if (s.isWaitingImport) return;
            let e = new u["a"],
              t = await e.findPresetToken();
            if (t) {
              let e = null;
              try {
                e = await Object(r["m"])(t)
              } catch (n) {
                e = null
              }
              if (e) {
                const {
                  share_user_phone: n,
                  share_user_id: o,
                  settings_info: r,
                  setting_total_count: l
                } = e;
                if (s.presetToken = t, s.fromName = n, s.presetName = r[0].name, s.setting_total_count = l, Number(o) === a) return;
                s.isWaitingImport = !0, null === i || void 0 === i || i.tsConfirm({
                  title: c.value,
                  customMessageEl: d.value,
                  message: null,
                  showCancelButton: !0
                }).then(() => {
                  s.isWaitingImport = !1, h(), p()
                }).catch(e => {
                  s.isWaitingImport = !1, h()
                })
              }
            }
          }
          return Object(T["onMounted"])(() => {
            f(), o["a"].on(j["a"].appState, (e, t) => {
              const {
                state: i
              } = t;
              console.log("application state changed:", i), i && f()
            })
          }), Object(T["onUnmounted"])(() => {
            o["a"].removeAllListeners(j["a"].appState)
          }), {
            title: c,
            content: d,
            clearToken: h,
            onSubmit: p
          }
        }
      }),
      R = L,
      B = Object(b["a"])(R, x, E, !1, null, null, null),
      N = B.exports,
      D = i("7203");
    t["a"] = {
      components: {
        SharePresetTokenDialog: P["a"],
        ImportPresetDialog: _,
        NewPresetTypeDialog: S,
        DetectClipBoardPresetDialog: N
      },
      data() {
        return {
          sharedItem: {
            sharedToken: null,
            sharedName: null
          },
          showPresetTokenDialog: !1,
          showImportPresetDialog: !1,
          showNewPresetTypeDialog: !1
        }
      },
      computed: {
        ...Object(a["c"])(["userId"])
      },
      ...Object(a["b"])(["loadAllPresents", "deletePreset", "loadAllPresents"]),
      ...Object(a["d"])("presetSuit", ["_SetPresetShareToken"]),
      methods: {
        buildShareToken() {
          return `“${this.sharedItem.sharedName}”Đặt trước的分享口令「${this.sharedItem.sharedToken}」已复制,快粘贴分享给协作者吧`
        },
        async onShareClick(e) {
          this.sharedItem.sharedName = e.name;
          let t = I["Loading"].service({
            background: "transparent",
            customClass: "mini"
          });
          try {
            const i = await Object(r["n"])(e.id);
            this.sharedItem.sharedToken = i.share_token, this.showPresetTokenDialog = !0, t.close();
            let a = new u["a"];
            a.writePresetToken(i.share_token, e.name), this.$store.commit("presetSuit/_SetPresetShareToken", {
              userId: this.userId,
              token: i.share_token
            })
          } catch (i) {
            console.error(i), this.tsNotify(i.message), t.close()
          }
        },
        onPresetMenuRightClick(e) {
          if (1 == e.classifyType) return;
          const t = new D["a"];
          t.push({
            label: "分享Đặt trước",
            action: "batchretouch-my-preset-share",
            disabled: !1,
            data: e,
            callback: this.onShareClick
          }).push({
            label: "删除Đặt trước",
            action: "batchretouch-my-preset-delete",
            disabled: !1,
            data: e,
            callback: this.remove
          }).show()
        }
      },
      remove(e) {
        this.$store.state.user.userId;
        this.tsConfirm({
          title: "Xác nhận删除该Đặt trước",
          customMessageStyle: "textAlign: left"
        }).then(async t => {
          await this.deletePreset({
            presetItem: e
          }), await this.loadAllPresents({
            userId: this.userId,
            loadDb: !0,
            backstageLoad: !1
          })
        })
      }
    }
  },
  e5bd: function(e, t, i) {},
  e724: function(e, t, i) {
    "use strict";
    var a = function() {
        var e = this,
          t = e._self._c;
        return e.isShow ? t("ShareTokenCopyTip", {
          attrs: {
            "bottom-tip-msg": e.bottomTipMsg,
            "content-msg": e.contentMsg
          },
          model: {
            value: e.visible,
            callback: function(t) {
              e.visible = t
            },
            expression: "visible"
          }
        }) : e._e()
      },
      n = [],
      s = i("5c96"),
      o = function() {
        var e = this,
          t = e._self._c;
        return t("el-dialog", {
          attrs: {
            center: "",
            top: "28vh",
            width: "400px",
            "append-to-body": "",
            "destroy-on-close": "",
            visible: e.visible,
            "close-on-click-modal": !1,
            "close-on-press-escape": !1,
            "custom-class": "common-dialog user-package"
          },
          on: {
            "update:visible": function(t) {
              e.visible = t
            }
          }
        }, [t("div", {
          staticClass: "dialog-container"
        }, [t("div", {
          staticClass: "title"
        }, [t("img", {
          attrs: {
            src: i("186c")
          }
        }), t("span", [e._v("分享口令已复制")])]), t("div", {
          staticClass: "message-container",
          style: {
            marginBottom: e.bottomTipMsg.length > 0 ? "40px" : "0px"
          }
        }, [e._v(" " + e._s(e.contentMsg) + " ")]), e.bottomTipMsg.length > 0 ? t("div", {
          staticClass: "bottom-container",
          attrs: {
            slot: "footer"
          },
          slot: "footer"
        }, [t("div", {
          staticClass: "bottom-message"
        }, [t("i", {
          staticClass: "el-icon-warning-outline tip_icon"
        }), t("span", [e._v(e._s(e.bottomTipMsg))])])]) : e._e()])])
      },
      c = [],
      r = i("f5de"),
      l = {
        name: "",
        components: {
          "el-dialog": r["a"]
        },
        props: {
          value: {
            type: Boolean,
            default: !1
          },
          contentMsg: {
            type: String,
            value: "分享口令"
          },
          isShow: {
            type: Boolean,
            value: !1
          },
          bottomTipMsg: {
            type: String,
            value: "本次分享Đặt trước中不包含上传的Ảnh IDNền效果"
          }
        },
        data() {
          return {
            visible: this.value
          }
        },
        watch: {
          value: {
            handler(e) {
              this.visible = e
            },
            immediate: !0
          },
          visible(e) {
            this.$emit("input", e)
          }
        }
      },
      u = l,
      d = (i("4966"), i("2877")),
      h = Object(d["a"])(u, o, c, !1, null, "11382d8a", null),
      p = h.exports,
      f = {
        name: "SharePresetTokenDialog",
        components: {
          ShareTokenCopyTip: p
        },
        props: {
          contentMsg: {
            type: String,
            value: "分享口令"
          },
          isShow: {
            type: Boolean,
            value: !1
          },
          bottomTipMsg: {
            type: String,
            value: "本次分享Đặt trước中不包含上传的Ảnh IDNền效果"
          }
        },
        data() {
          return {
            visible: this.isShow
          }
        },
        watch: {
          isShow: {
            handler(e) {
              this.visible = e
            },
            immediate: !0
          },
          visible: {
            handler(e) {
              e || this.onClose()
            },
            immediate: !1
          }
        },
        methods: {
          onClose() {
            this.visible = !1, this.$emit("onClose")
          },
          showConfirm(e = {}) {
            const t = e.title || this.defaultTitle,
              a = e.message || "",
              n = !e.hasOwnProperty("showCancelButton") || e.showCancelButton,
              o = e.hasOwnProperty("customMessageStyle") ? e.customMessageStyle : "",
              c = this.$createElement;
            this.bottomTipMsg;
            return new Promise((r, l) => {
              s["MessageBox"].confirm(a, "", {
                confirmButtonText: e.confirmButtonText || "Xác nhận",
                cancelButtonText: e.cancelButtonText || "Hủy",
                customClass: "customConfirmClass",
                showCancelButton: !1,
                showConfirmButton: !1,
                message: c("div", {
                  class: "customConfirmClass-content",
                  style: "line-height: 24px; font-weight: 400;"
                }, [c("p", {
                  style: "font-size: 16px;font-weight: 600; margin: 12px 0 16px"
                }, [c("img", {
                  style: "margin-right:4px;width:14px;height:14px",
                  attrs: {
                    src: i("186c")
                  }
                }), t]), c("p", {
                  style: "font-size: 14px; " + o
                }, a)]),
                iconClass: "",
                center: !0
              }).then(e => {
                r()
              }).catch(() => {
                n && l()
              })
            })
          }
        }
      },
      m = f,
      b = (i("26ea"), Object(d["a"])(m, a, n, !1, null, "f876f7bc", null));
    t["a"] = b.exports
  },
  e751: function(e, t, i) {
    "use strict";
    i.d(t, "d", (function() {
      return a
    })), i.d(t, "c", (function() {
      return n
    })), i.d(t, "m", (function() {
      return s
    })), i.d(t, "g", (function() {
      return o
    })), i.d(t, "l", (function() {
      return c
    })), i.d(t, "n", (function() {
      return r
    })), i.d(t, "h", (function() {
      return l
    })), i.d(t, "i", (function() {
      return u
    })), i.d(t, "f", (function() {
      return d
    })), i.d(t, "j", (function() {
      return h
    })), i.d(t, "e", (function() {
      return p
    })), i.d(t, "k", (function() {
      return _
    })), i.d(t, "b", (function() {
      return k
    })), i.d(t, "a", (function() {
      return v
    }));
    var a, n, s, o, c, r, l, u, d, h, p, f = i("2666");
    (function(e) {
      e["CakeNavMenu"] = "cake_nav_menu", e["CakeImport"] = "cake_import", e["CakeGallery"] = "cake_gallery", e["CakeRefine"] = "cake_refine", e["CakeSetting"] = "cake_setting", e["CakeHelp"] = "cake_help", e["CakeExport"] = "cake_export", e["CakeH5MemberPrice"] = "cakeh5_member_price", e["AppStart"] = "app_start", e["Login"] = "login", e["Logout"] = "logout", e["CakeSession"] = "cake_session", e["CakeExportList"] = "cake_export_list", e["CakeNewuserGuide"] = "cake_newuser_guide", e["CakeFillinfo"] = "cake_fillinfo", e["CakeAvatar"] = "cake_avatar", e["CakeWorkBench"] = "cake_workbench", e["CakeUpgradeGuide"] = "upgrade_guide", e["CakeImageAdjustment"] = "cake_image_adjustment"
    })(a || (a = {})),
    function(e) {
      e["ClickBackstage"] = "click_backstage"
    }(n || (n = {})),
    function(e) {
      e["PhotoFinishing"] = "refine", e["BatchRetouch"] = "gallery", e["Workbench"] = "workbench", e["Login"] = "login", e["Export"] = "export_list", e["EmptyPage"] = "empty_page"
    }(s || (s = {})),
    function(e) {
      e["InitWorkbenchGuide"] = "init_workbench_guide", e["InitPresetGuide"] = "init_preset_guide", e["InitSlideGuide"] = "init_slide_guide", e["InitSelectGuide"] = "init_select_guide", e["InitSynchronizeGuide"] = "init_synchronize_guide", e["InitExportGuide"] = "init_export_guide", e["ClickQuit"] = "click_quit", e["InitImgAdjustmentGuide"] = "image_adjustment_guide", e["InitBackgroundGuide"] = "background_adjustment_guide", e["InitHistoryGuide"] = "history_record_guide", e["InitCropGuide"] = "crop_guide", e["InitPresetSettingGuide"] = "preset_setting_guide"
    }(o || (o = {})),
    function(e) {
      e["CheckOriginalPhoto"] = "original_photo", e["AddSecond"] = "add_second", e["ClickOriginal"] = "click_original", e["ClickFit"] = "click_fit", e["SelectOne"] = "select_one", e["Delete"] = "delete", e["DeleteAll"] = "delete_all_select", e["SwipeSelect"] = "swipe_select", e["AddStar"] = "add_star", e["AddPresetSort"] = "add_preset_sort", e["DragPanel"] = "drag_panel", e["ImageAdjustment"] = "image_adjustment_icon", e["PortraitBeautification"] = "portrait_beauty_icon", e["OperationHistory"] = "history_record_icon", e["BackgroundAdjustment"] = "background_adjustment_icon", e["CropIcon"] = "crop_icon", e["ModifyGender"] = "modify_gender", e["AddPresetButton"] = "add_preset_button", e["AddPresetIcon"] = "add_preset_icon", e["AddApplyButton"] = "add_apply_button", e["SwitchGender"] = "switch_gender", e["SelectFilter"] = "select_filter", e["Feedback"] = "feedback", e["FeedbackChooseCategory"] = "feedback_choose_category", e["FeedbackInputContent"] = "feedback_input_content", e["FeedbackCancel"] = "feedback_cancel", e["FeedbackConfirm"] = "feedback_confirm", e["SavePresetSubmit1"] = "new_preset", e["SavePresetSubmit2"] = "new_preset2", e["SavePresetCover"] = "override_preset", e["ClickSmear"] = "click_smear", e["ClickSmearPreservation"] = "click_smear_preservation", e["ClickSmearCancel"] = "click_smear_cancel", e["ClickSmearClose"] = "click_smear_close", e["ClickSmearBack"] = "click_smear_back", e["ClickSmearReset"] = "click_smear_reset", e["ClickSmearHistoryBack"] = "click_smear_history_back", e["ClickHistory"] = "smear_history", e["ClickSmearTool"] = "click_smear_tool", e["DoubleClickDot"] = "double_click_dot", e["DoubleClickTitle"] = "double_click_title", e["PresetReset"] = "preset_reset", e["ParameterAdjustmentReset"] = "parameter_adjustment_reset", e["SelectIdPhotoBackground"] = "select_idphoto_background", e["SelectIdPhotoSize"] = "select_idphoto_size", e["SelectChangeSky"] = "select_change_sky", e["ModifyDPI"] = "modify_dpi", e["InitPreview"] = "init_preview_all", e["ClickPreview"] = "click_preview_all", e["ExitPreview"] = "exit_preview_all", e["FullEffectMode"] = "full_effect_mode", e["ColorMode"] = "color_mode", e["LiquefactionSize"] = "liquefaction_size", e["LiquefactionDensity"] = "liquefaction_density", e["LiquefactionPressure"] = "liquefaction_pressure", e["ClickLiquefactionFixedEdge"] = "click_liquefaction_fixed_edge"
    }(c || (c = {})),
    function(e) {
      e["ClickSetting"] = "click_setting", e["ClickClose"] = "click_close", e["ClickReturn"] = "click_return", e["ClickConfirm"] = "click_confirm"
    }(r || (r = {})),
    function(e) {
      e["HelpIcon"] = "help_icon", e["CustomerService"] = "customer_service", e["TutorialGraphic"] = "tutorial_graphic", e["TutorialVideo"] = "tutorial_video", e["HelpQuestion"] = "help_question", e["HotKey"] = "hot_key"
    }(l || (l = {})),
    function(e) {
      e["clickEffectValue"] = "click_effect_value"
    }(u || (u = {})),
    function(e) {
      e["ExportButton"] = "export_button", e["SelectPath"] = "select_path", e["SelectPreset"] = "select_preset", e["AdvancedSettings"] = "advanced_settings", e["Cancel"] = "cancel", e["Confirm"] = "confirm", e["OriginThumb"] = "thumbnail_close_effect", e["EffectThumb"] = "thumbnail_open_effect"
    }(d || (d = {})),
    function(e) {
      e["SlideBeautyRod"] = "slide_beauty_rod", e["SlideFaceliftRod"] = "slide_facelift_rod", e["SlideBodyRod"] = "slide_body_rod", e["SlideEnhanceRod"] = "slide_enhance_rod", e["SlideColorRod"] = "slide_color_rod", e["Facelift"] = "facelift", e["MakeupSuit"] = "slide_makeup_rod", e["SliderBackground"] = "slide_background_rod", e["SlideRemoveDefects"] = "slide_remove_defects", e["SlideSkyAdjustmentRod"] = "slide_sky_adjustment_rod", e["SlideSkySceneryAdjustmentRod"] = "slide_sky_scenery_adjustment_rod", e["SlideSkyWaterAdjustmentRod"] = "slide_sky_water_adjustment_rod", e["SlideLiquefyRod"] = "slide_liquefy_rod"
    }(h || (h = {})),
    function(e) {
      e["ExportedTab"] = "exported_tab", e["ExportingTab"] = "exporting_tab", e["BillingRulesPopup"] = "billing_rules_popup", e["DeleteBtn"] = "click_delete_button", e["RetryBtn"] = "click_retry_button", e["PauseBtn"] = "click_pause_button", e["StartBtn"] = "click_start_button", e["PauseAllBtn"] = "pause_all", e["StartAllBtn"] = "start_all", e["ClickExportDetail"] = "click_export_detail"
    }(p || (p = {}));
    const m = {
        [f["c"].EnhanceEditHSLHue]: "hue",
        [f["c"].EnhanceEditHSLLightness]: "brightness",
        [f["c"].EnhanceEditHSLSaturation]: "saturation"
      },
      b = {
        [f["d"].Red]: "red",
        [f["d"].Orange]: "orange",
        [f["d"].Yellow]: "yellow",
        [f["d"].Green]: "green",
        [f["d"].Cyan]: "lightgreen",
        [f["d"].Blue]: "blue",
        [f["d"].Purple]: "purple",
        [f["d"].Magenta]: "magenta"
      },
      g = {};
    for (const C in m)
      for (const e in b) g[`${C}_${e}`] = `${m[C]}_${b[e]}`;
    const _ = {
        slide_remove_defects: {
          [f["c"].Spotless]: "acne",
          [f["c"].RemoveNevus]: "mole",
          [f["c"].SpotlessBody]: "removal_body",
          [f["c"].RemoveForeheadLines]: "forehead_lines",
          [f["c"].RemoveEyeLines]: "eye_wrinkles",
          [f["c"].LightenPouch]: "darkcircles",
          [f["c"].TearTrough]: "wrinkle",
          [f["c"].RemoveNeckLines]: "neck_pattern",
          [f["c"].RemoveDoubleChin]: "face_doublechin"
        },
        slide_beauty_rod: {
          [f["c"].NeutralGrayRetouch]: "dbsmooth",
          [f["c"].MoisturizingSkin]: "smooth_face",
          [f["c"].MoisturizingSkinNoFace]: "smooth_body",
          [f["c"].FacialStereo3DLight]: "highlight_contour",
          [f["c"].FacialStereo3DShadow]: "shadow_contour",
          [f["c"].SkinColorLighten]: "skin_bright",
          [f["c"].SkinColorWhiten]: "skin_whiten",
          [f["c"].SkinColorRuddy]: "skin_rosy",
          [f["c"].SkinColorUniform]: "skin_unite",
          [f["c"].StretchMark]: "stretch_marks",
          [f["c"].StretchMarkLine]: "pregnancy_line",
          [f["c"].TeethWhiten]: "whiten",
          [f["c"].ToothRepairing]: "teeth_fixer",
          [f["c"].BrightEye]: "bright",
          [f["c"].MakeupEnhanceEye]: "eye_enhance",
          [f["c"].MakeupEnhanceMouth]: "lip_enhance"
        },
        slide_facelift_rod: {
          [f["c"].HeadNarrow]: "face_size",
          [f["c"].FaceLift]: "face_cheeks",
          [f["c"].FacialRefineSmallFace]: "face_small",
          [f["c"].FacialRefineTemple]: "face_temple",
          [f["c"].FacialRefineCheekBone]: "face_cheekbones",
          [f["c"].FaceWidth]: "face_width",
          [f["c"].FacialRefineJaw]: "face_jaw",
          [f["c"].FacialRefineChin]: "face_chin",
          [f["c"].FacialRefineHairLine]: "face_forehead",
          [f["c"].FacialRefineEyeZoom]: "eyes_size",
          [f["c"].FacialRefineEyeHigher]: "eyes_height",
          [f["c"].FacialRefineEyeWidth]: "eyes_width",
          [f["c"].FacialRefineEyeDistance]: "eyes_distance",
          [f["c"].FacialRefineEyeAngle]: "eyes_tilt",
          [f["c"].FacialRefineEyeUpDownAdjust]: "eyes_position",
          [f["c"].FacialRefineNose]: "nose_size",
          [f["c"].FacialRefineNoseHigher]: "nose_lift",
          [f["c"].FacialRefineNoseBridge]: "nose_bright",
          [f["c"].FacialRefineNoseAlar]: "nose_wing",
          [f["c"].FacialRefineNoseTip]: "nose_tip",
          [f["c"].FacialRefineMouthSize]: "lips_size",
          [f["c"].FacialRefineMouthWidth]: "lips_width",
          [f["c"].FacialRefineMouthHigher]: "lips_height",
          [f["c"].FacialRefineMouthUpperLip]: "lips_upper",
          [f["c"].FacialRefineMouthLowperLip]: "lips_lower",
          [f["c"].FacialRefineEyeBrowThickness]: "eyebrows_thick",
          [f["c"].FacialRefineEyeBrowDistance]: "eyebrows_distance",
          [f["c"].FacialRefineEyeBrowAngle]: "eyebrows_tilt",
          [f["c"].FacialRefineEyeBrowShape]: "eyebrows_shape",
          [f["c"].FacialRefineEyeBrowHigher]: "eyebrows_position",
          [f["c"].LeftFaceLift]: "face_cheeks_left",
          [f["c"].RightFaceLift]: "face_cheeks_right",
          [f["c"].LeftTemple]: "face_temple_left",
          [f["c"].RightTemple]: "face_temple_right",
          [f["c"].RightTemple]: "face_temple_right",
          [f["c"].LeftCheekBone]: "face_cheekbones_left",
          [f["c"].RightCheekBone]: "face_cheekbones_right",
          [f["c"].LeftJaw]: "face_jaw_left",
          [f["c"].RightJaw]: "face_jaw_right",
          [f["c"].LeftEyeZoom]: "eyes_size_left",
          [f["c"].RightEyeZoom]: "eyes_size_right",
          [f["c"].LeftEyeHigher]: "eyes_height_left",
          [f["c"].RightEyeHigher]: "eyes_height_right",
          [f["c"].LeftEyeWidth]: "eyes_width_left",
          [f["c"].RightEyeWidth]: "eyes_width_right",
          [f["c"].LeftEyeDistance]: "eyes_distance_left",
          [f["c"].RightEyeDistance]: "eyes_distance_right",
          [f["c"].LeftEyeAngle]: "eyes_tilt_left",
          [f["c"].RightEyeAngle]: "eyes_tilt_right",
          [f["c"].LeftEyeUpDownAdjust]: "eyes_position_left",
          [f["c"].RightEyeUpDownAdjust]: "eyes_position_right",
          [f["c"].LeftEyeBrowThickness]: "eyebrows_thick_left",
          [f["c"].RightEyeBrowThickness]: "eyebrows_thick_right",
          [f["c"].LeftEyeBrowDistance]: "eyebrows_distance_left",
          [f["c"].RightEyeBrowDistance]: "eyebrows_distance_right",
          [f["c"].LeftEyeBrowAngle]: "eyebrows_tilt_left",
          [f["c"].RightEyeBrowAngle]: "eyebrows_tilt_right",
          [f["c"].LeftEyeBrowShape]: "eyebrows_shape_left",
          [f["c"].RightEyeBrowShape]: "eyebrows_shape_right",
          [f["c"].LeftEyeBrowHigher]: "eyebrows_position_left",
          [f["c"].RightEyeBrowHigher]: "eyebrows_position_right",
          [f["c"].SymmetryReshapeSwitch]: "symmetry_facelift",
          [f["c"].SymmetryReshapeBody]: "symmetry_upper_body",
          [f["c"].SymmetryReshapeFace]: "symmetry_facial_features"
        },
        slide_body_rod: {
          [f["c"].AIBodyReshape]: "body_ai",
          [f["c"].PoseRefineSlimHand]: "arm",
          [f["c"].PoseRefineSlimWaist]: "waist",
          [f["c"].PoseRefineSlimLeg]: "leg",
          [f["c"].PoseRefineEnhanceBreast]: "breast",
          [f["c"].PoseRefineNiceButtock]: "buttocks",
          [f["c"].PoseRefineSlim]: "Slim",
          [f["c"].PoseRefineShrinkHead]: "head",
          [f["c"].PoseRefineLengthen]: "stretch",
          [f["c"].PoseRefineHeighten]: "heighten",
          [f["c"].PoseRefineSlimLeftNeck]: "thin_neck_left",
          [f["c"].PoseRefineSlimRightNeck]: "thin_neck_right",
          [f["c"].PoseRefineSlimNeck]: "thin_neck"
        },
        slide_color_rod: {
          [f["c"].FilterAlpha]: "filter",
          [f["c"].EnhanceEditColorTemperature]: "temp",
          [f["c"].EnhanceEditHue]: "tone",
          [f["c"].EnhanceEditExposure]: "exposure",
          [f["c"].EnhanceEditContrast]: "contrast",
          [f["c"].EnhanceEditHighlight]: "highlight",
          [f["c"].EnhanceEditShadow]: "shadow",
          [f["c"].EnhanceEditWhite]: "white",
          [f["c"].EnhanceEditBlack]: "black",
          [f["c"].EnhanceEditCameraRawSharpen]: "clarity",
          [f["c"].EnhanceEditCameraRawVibrance]: "vividness",
          [f["c"].EnhanceEditSaturation]: "saturation",
          [f["c"].EnhanceEditCRDBStrength]: "sharpen",
          [f["c"].EnhanceEditCRDBRadius]: "radius",
          [f["c"].EnhanceEditCRDBDetail]: "detail",
          ...g
        },
        slide_makeup_rod: {
          [f["c"].SuitMakeup]: "theme",
          [f["c"].EyebrowMakeup]: "eyebrows",
          [f["c"].EyeMakeup]: "eyes",
          [f["c"].EyelashMakeup]: "eyelashes",
          [f["c"].BlusherMakeup]: "blush",
          [f["c"].LipMakeup]: "lipstick"
        },
        slide_background_rod: {
          [f["c"].BgCleanSwitch]: {
            0: "close_background_blemishes",
            1: "open_background_blemishes"
          },
          [f["c"].BgCleanMode]: {
            0: "none_pure_background",
            1: "pure_background"
          },
          [f["c"].BgCleanMooreSwitch]: {
            0: "close_background_banding",
            1: "open_background_banding"
          },
          [f["c"].BgCleanMooreMode]: {
            0: "banding_none_pure_background",
            1: "banding_pure_background"
          },
          [f["c"].BackgroundEnhance]: "background_enhance",
          [f["c"].BgReplaceGamma]: "idphoto_edge_detail",
          [f["c"].BgReplaceBeta]: "idphoto_edge_burr"
        },
        slide_sky_adjustment_rod: {
          [f["c"].SkyChoose]: "sky_choose",
          [f["c"].SkyEdgeTransition]: "sky_edge_transition",
          [f["c"].SkyTemp]: "sky_temp",
          [f["c"].SkySaturation]: "sky_saturation",
          [f["c"].SkyBrightness]: "sky_brightness",
          [f["c"].SkyVague]: "sky_vague",
          [f["c"].SkyFlip]: "sky_flip"
        },
        slide_sky_scenery_adjustment_rod: {
          [f["c"].SkySceneryColor]: "sky_scenery_color",
          [f["c"].SkyCharacterColor]: "sky_character_color"
        },
        slide_sky_water_adjustment_rod: {
          [f["c"].SkyWaterReflex]: "sky_water_reflex",
          [f["c"].SkyWaterVague]: "sky_water_vague"
        }
      },
      k = {
        [f["c"].SuitMakeup]: "click_theme_tab",
        [f["c"].EyebrowMakeup]: "click_eyebrows_tab",
        [f["c"].EyeMakeup]: "click_eyes_tab",
        [f["c"].EyelashMakeup]: "click_eyelashes_tab",
        [f["c"].BlusherMakeup]: "click_blush_tab",
        [f["c"].LipMakeup]: "click_lipstick_tab"
      },
      v = {
        [f["c"].SuitMakeup]: "click_theme",
        [f["c"].EyebrowMakeup]: "click_eyebrows",
        [f["c"].EyeMakeup]: "click_eyes",
        [f["c"].EyelashMakeup]: "click_eyelashes",
        [f["c"].BlusherMakeup]: "click_blush",
        [f["c"].LipMakeup]: "click_lipstick"
      }
  },
  ee71: function(e, t) {
    String.prototype.byteLength = function() {
      const e = this;
      let t = 0;
      for (let i = 0; i < e.length; i++) {
        let a = e.charAt(i);
        null != a.match(/[^\x00-\xff]/gi) ? t += 2 : t += 1
      }
      return t
    }, String.prototype.writeUTF = function(e = !1) {
      const t = this;
      for (var i = [], a = 0, n = 0; n < t.length; n++) {
        var s = t.charCodeAt(n);
        0 <= s && s <= 127 ? (a += 1, i.push(s)) : 128 <= s && s <= 2047 ? (a += 2, i.push(192 | 31 & s >> 6), i.push(128 | 63 & s)) : (2048 <= s && s <= 55295 || 57344 <= s && s <= 65535) && (a += 3, i.push(224 | 15 & s >> 12), i.push(128 | 63 & s >> 6), i.push(128 | 63 & s))
      }
      for (n = 0; n < i.length; n++) i[n] &= 255;
      return e ? i : a <= 255 ? [0, a].concat(i) : [a >> 8, 255 & a].concat(i)
    }
  },
  f0d4: function(e, t, i) {
    e.exports = i.p + "img/service-qrcode.e0f0f5dc.jpg"
  },
  f4ab: function(e, t, i) {},
  f5de: function(e, t, i) {
    "use strict";
    var a = i("2b0e"),
      n = i("5c96"),
      s = i("2f62"),
      o = i("64a0");
    t["a"] = a["default"].extend({
      extends: n["Dialog"],
      watch: {
        visible(e) {
          console.log("ts-dialog: ", e);
          let t = new o["a"];
          t.process([o["b"].Mouse, o["b"].KeyBoard], !e)
        }
      },
      methods: {
        ...Object(s["d"])("config", ["sendKeyboardWithSecondDialog"])
      }
    })
  },
  f69e: function(e, t, i) {}
});
//# sourceMappingURL=index.881e2411.js.map