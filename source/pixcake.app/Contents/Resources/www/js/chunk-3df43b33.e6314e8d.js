(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-3df43b33"], {
        "8ffe": function(a, t, i) {
            "use strict";
            i("a654")
        },
        "9f2b": function(a, t, i) {
            "use strict";
            i.r(t);
            var l = function() {
                    var a = this,
                        t = a._self._c;
                    return t("div", {
                        directives: [{
                            name: "loading",
                            rawName: "v-loading",
                            value: "loading" == a.loadingStatus,
                            expression: "loadingStatus == 'loading'"
                        }],
                        staticClass: "claActivity",
                        attrs: {
                            "element-loading-background": "rgba(0, 0, 0, 0)"
                        }
                    }, [t("div", {
                        staticClass: "claTitle"
                    }), "fail" == a.loadingStatus ? t("div", {
                        staticClass: "claFail"
                    }, [t("div", {
                        staticClass: "claFailContent"
                    }, [t("img", {
                        staticClass: "claImg",
                        attrs: {
                            src: i("e755")
                        }
                    }), t("div", {
                        staticClass: "claMsg"
                    }, [a._v("网络连接失败，请检查网络连接~")]), t("button", {
                        staticClass: "claRetry",
                        on: {
                            click: a.onRetryClick
                        }
                    }, [a._v("重试")])])]) : a._e()])
                },
                s = [];
            const n = window.$ipcRenderer;
            var o = {
                    name: "activity-local",
                    data() {
                        return {
                            loadingStatus: "loading"
                        }
                    },
                    methods: {
                        onRetryClick() {
                            this.loadingStatus = "loading", n.send("activity-reload", null)
                        }
                    },
                    mounted() {
                        n.on("begin-loading", a => {
                            console.log("begin-loading"), this.loadingStatus = "loading"
                        }), n.on("loading-failed", a => {
                            console.log("loading-failed"), this.loadingStatus = "fail"
                        }), n.on("loading-success", a => {
                            this.loadingStatus = "success", console.log("loading-success")
                        })
                    }
                },
                c = o,
                e = (i("8ffe"), i("2877")),
                d = Object(e["a"])(c, l, s, !1, null, "222504f5", null);
            t["default"] = d.exports
        },
        a654: function(a, t, i) {}
    }
]);
//# sourceMappingURL=chunk-3df43b33.e6314e8d.js.map