(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-02da5d8f"], {
    "292b": function(a, i, t) {
      "use strict";
      t("c053")
    },
    "9e79": function(a, i, t) {
      "use strict";
      t.r(i);
      var s = function() {
          var a = this,
            i = a._self._c;
          return i("div", {
            directives: [{
              name: "loading",
              rawName: "v-loading",
              value: "loading" == a.loadingStatus,
              expression: "loadingStatus == 'loading'"
            }],
            staticClass: "claMember",
            attrs: {
              "element-loading-background": "rgba(0, 0, 0, 0)"
            }
          }, [i("div", {
            staticClass: "claTitle"
          }, [i("div", {
            staticClass: "claCloseBtn"
          }, [i("i", {
            staticClass: "el-icon-close",
            on: {
              click: a.onCloseClick
            }
          })])]), "fail" == a.loadingStatus ? i("div", {
            staticClass: "claFail"
          }, [i("div", {
            staticClass: "claFailContent"
          }, [i("img", {
            staticClass: "claImg",
            attrs: {
              src: t("e755")
            }
          }), i("div", {
            staticClass: "claMsg"
          }, [a._v("网络连接失败，请检查网络连接~")]), i("button", {
            staticClass: "claRetry",
            on: {
              click: a.onRetryClick
            }
          }, [a._v("重试")])])]) : a._e()])
        },
        n = [],
        l = t("52b8");
      const e = window.$ipcRenderer;
      var o = {
          name: "MemberVip",
          mixins: [l["a"]],
          data() {
            return {
              loadingStatus: "loading"
            }
          },
          methods: {
            onCloseClick() {
              this.PointMemberCloseClick(), e.send("close-memberVip-window", {})
            },
            onRetryClick() {
              this.loadingStatus = "loading", e.send("activity-reload", {})
            }
          },
          mounted() {
            e.on("begin-loading", a => {
              this.loadingStatus = "loading"
            }), e.on("loading-failed", a => {
              this.loadingStatus = "fail"
            }), e.on("loading-success", a => {
              this.loadingStatus = "success"
            }), e.send("memberVipPlan-mounted", null)
          }
        },
        c = o,
        d = (t("292b"), t("2877")),
        r = Object(d["a"])(c, s, n, !1, null, "fee703cc", null);
      i["default"] = r.exports
    },
    c053: function(a, i, t) {}
  }
]);
//# sourceMappingURL=chunk-02da5d8f.00eb776f.js.map