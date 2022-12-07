(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-7a7d8f10"], {
    "15c8": function(t, e, n) {
      "use strict";
      n.r(e);
      var s = function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "updateDownContainer"
          }, [e("div", {
            staticClass: "updateDownContainer-title"
          }, [e("span", [t._v(t._s(t.updateContent.title))]), e("div", {
            staticClass: "close",
            on: {
              click: t.onClose
            }
          }, [e("div", {
            staticClass: "before"
          }), e("div", {
            staticClass: "after"
          })])]), e("div", {
            staticClass: "updateDownContainer-center"
          }, [e("div", {
            staticClass: "center-words"
          }, [e("div", {
            staticClass: "center-words-title"
          }, [t._v(t._s(t.updateContent.subtitle))]), e("ul", {
            staticClass: "center-words-info"
          }, [t._l(t.updateContent.updateContent, (function(n, s) {
            return [e("li", {
              key: s
            }, [t._v(t._s(n))])]
          }))], 2)]), t.updateContent.hint ? e("div", {
            staticClass: "center-line"
          }) : t._e(), t.updateContent.hint ? e("div", {
            staticClass: "center-foot"
          }, [e("span", {
            staticClass: "icon"
          }), e("span", [t._v(t._s(t.updateContent.hint))])]) : t._e()]), e("div", {
            staticClass: "updateDownContainer-footer"
          }, [e("el-button", {
            staticClass: "updateBtn",
            attrs: {
              size: "mini",
              type: "primary"
            },
            on: {
              click: t.onSubmit
            }
          }, [t._v("立即更新")]), t.isForceUpdate ? t._e() : e("el-button", {
            staticClass: "updateWait",
            attrs: {
              size: "mini"
            },
            on: {
              click: t.onClose
            }
          }, [t._v("稍后更新")])], 1)])
        },
        i = [],
        a = n("5c96"),
        o = n("52b8"),
        d = (n("f946"), {
          components: {
            "el-button": a["Button"]
          },
          mixins: [o["a"]],
          props: {},
          data() {
            return {
              updateContent: {
                title: "",
                subtitle: "",
                updateContent: [],
                hint: "",
                version: ""
              },
              isForceUpdate: !1,
              isSafetyExit: !1
            }
          },
          watch: {},
          mounted() {
            const t = window.$ipcRenderer;
            t.on("update-content-data", (t, e) => {
              console.log("update-content-data", e);
              let n = JSON.parse(e.release_note);
              this.updateContent.title = n.title, this.updateContent.subtitle = n.subtitle, this.updateContent.updateContent = n.updateContent, this.updateContent.hint = n.hint, this.updateContent.version = e.version, this.isForceUpdate = 0 !== e.is_force_update
            })
          },
          methods: {
            async onSubmit() {
              const t = window.$ipcRenderer;
              t.send("update-button-submit", null), this.$router.push({
                path: "/updateProgress",
                query: {
                  version: this.updateContent.version
                }
              })
            },
            onClose() {
              window.$ipcRenderer;
              this.isForceUpdate ? this.rejectInstall() : this.cancelUpdate()
            },
            rejectInstall() {
              const t = window.$ipcRenderer;
              t.send("app-exit")
            },
            cancelUpdate() {
              const t = window.$ipcRenderer;
              t.send("app-update-later")
            }
          }
        }),
        c = d,
        r = (n("434b"), n("2877")),
        u = Object(r["a"])(c, s, i, !1, null, "7157645a", null);
      e["default"] = u.exports
    },
    "324b": function(t, e, n) {},
    "434b": function(t, e, n) {
      "use strict";
      n("324b")
    }
  }
]);
//# sourceMappingURL=chunk-7a7d8f10.3e96855c.js.map