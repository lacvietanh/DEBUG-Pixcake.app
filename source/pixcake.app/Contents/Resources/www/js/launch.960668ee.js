(function(e) {
  function t(t) {
    for (var r, o, c = t[0], i = t[1], l = t[2], f = 0, s = []; f < c.length; f++) o = c[f], Object.prototype.hasOwnProperty.call(a, o) && a[o] && s.push(a[o][0]), a[o] = 0;
    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
    d && d(t);
    while (s.length) s.shift()();
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
      launch: 0
    },
    a = {
      launch: 0
    },
    u = [];

  function c(e) {
    return i.p + "js/" + ({} [e] || e) + "." + {
      "chunk-04cad172": "52a10aab",
      "chunk-76d39a1b": "12f2d55b"
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
        "chunk-04cad172": 1,
        "chunk-76d39a1b": 1
      };
    o[e] ? t.push(o[e]) : 0 !== o[e] && n[e] && t.push(o[e] = new Promise((function(t, n) {
      for (var r = "css/" + ({} [e] || e) + "." + {
          "chunk-04cad172": "b8fb3387",
          "chunk-76d39a1b": "f81b61cf"
        } [e] + ".css", a = i.p + r, u = document.getElementsByTagName("link"), c = 0; c < u.length; c++) {
        var l = u[c],
          f = l.getAttribute("data-href") || l.getAttribute("href");
        if ("stylesheet" === l.rel && (f === r || f === a)) return t()
      }
      var s = document.getElementsByTagName("style");
      for (c = 0; c < s.length; c++) {
        l = s[c], f = l.getAttribute("data-href");
        if (f === r || f === a) return t()
      }
      var d = document.createElement("link");
      d.rel = "stylesheet", d.type = "text/css", d.onload = t, d.onerror = function(t) {
        var r = t && t.target && t.target.src || a,
          u = new Error("Loading CSS chunk " + e + " failed.\n(" + r + ")");
        u.code = "CSS_CHUNK_LOAD_FAILED", u.request = r, delete o[e], d.parentNode.removeChild(d), n(u)
      }, d.href = a;
      var p = document.getElementsByTagName("head")[0];
      p.appendChild(d)
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
        var s = new Error;
        l = function(t) {
          f.onerror = f.onload = null, clearTimeout(d);
          var n = a[e];
          if (0 !== n) {
            if (n) {
              var r = t && ("load" === t.type ? "missing" : t.type),
                o = t && t.target && t.target.src;
              s.message = "Loading chunk " + e + " failed.\n(" + r + ": " + o + ")", s.name = "ChunkLoadError", s.type = r, s.request = o, n[1](s)
            }
            a[e] = void 0
          }
        };
        var d = setTimeout((function() {
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
  for (var s = 0; s < l.length; s++) t(l[s]);
  var d = f;
  u.push([5, "chunk-vendors", "chunk-common"]), n()
})({
  5: function(e, t, n) {
    e.exports = n("6df5")
  },
  "6df5": function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n("2b0e"),
      o = n("8c4f"),
      a = n("0613"),
      u = n("3dfd"),
      c = (n("d328"), n("3c66"), n("ae98"), n("b692")),
      i = n("26ba"),
      l = (n("d227"), n("6ebf")),
      f = (n("25c2"), n("b35f"));
    Object(c["a"])("dark"), r["default"].use(o["a"]), r["default"].use(i["a"]), r["default"].config.productionTip = !1, r["default"].config.errorHandler = function(e, t, n) {
      console.error(e)
    }, r["default"].prototype.$getIconPath = f["a"];
    const s = new o["a"]({
      linkExactActiveClass: "link-active",
      scrollBehavior(e, t, n) {
        return {
          x: 0,
          y: 0
        }
      },
      routes: [{
        path: "/",
        name: "launch",
        component: () => n.e("chunk-04cad172").then(n.bind(null, "014b")),
        meta: {
          title: "launch"
        }
      }]
    });
    new r["default"]({
      i18n: l["a"],
      store: a["a"],
      router: s,
      beforeCreate: async function() {
        const e = await Object(l["b"])();
        l["a"].locale = e
      },
      render: e => e(u["a"])
    }).$mount("#app")
  }
});
//# sourceMappingURL=launch.960668ee.js.map