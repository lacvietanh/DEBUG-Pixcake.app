(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-b1fa8bc6"], {
        "0d35": function(e, t, s) {
            e.exports = s.p + "img/workbench_logo.119af7d8.png"
        },
        "2a00": function(e, t, s) {
            e.exports = s.p + "img/pop_icon_update_logo@3x.4276436d.png"
        },
        "4a4d": function(e, t, s) {},
        "74d8": function(e, t, s) {
            "use strict";
            s.d(t, "c", (function() {
                return o
            })), s.d(t, "b", (function() {
                return r
            })), s.d(t, "d", (function() {
                return c
            })), s.d(t, "a", (function() {
                return d
            }));
            var n = s("25c2");
            const o = s("81a5"),
                r = s("2a00"),
                c = !n["v"] && s("0d35"),
                {
                    version: a
                } = s("cf05"),
                d = a
        },
        8165: function(e, t, s) {
            "use strict";
            s("4a4d")
        },
        "81a5": function(e, t, s) {
            e.exports = s.p + "img/logo.f92ef0c5.png"
        },
        c713: function(e, t, s) {
            "use strict";
            s.r(t);
            var n = function() {
                    var e = this,
                        t = e._self._c;
                    return t("div", {
                        staticClass: "UpdateDownloadProgress"
                    }, [t("div", {
                        staticClass: "UpdateDownloadProgress-left"
                    }, [t("img", {
                        staticClass: "img",
                        attrs: {
                            src: e.LOGO_RELATIVE_PATH,
                            alt: "logo"
                        }
                    })]), t("div", {
                        staticClass: "UpdateDownloadProgress-right"
                    }, [t("p", {
                        staticClass: "UpdateDownloadProgress-right-info"
                    }, [e._v(" " + e._s(e.contentMsg) + " ")]), t("div", {
                        staticClass: "UpdateDownloadProgress-right-progress"
                    }, [t("el-progress", {
                        attrs: {
                            "text-inside": "",
                            "show-text": !1,
                            "stroke-width": 5,
                            percentage: e.percentage
                        }
                    })], 1)]), t("el-button", {
                        staticClass: "cancel-btn",
                        attrs: {
                            size: "mini"
                        },
                        on: {
                            click: e.cancel
                        }
                    }, [e._v("取消 ")])], 1)
                },
                o = [],
                r = s("1209"),
                c = s("5c96"),
                a = s("25c2"),
                d = s("74d8"),
                i = {
                    name: "UpdateProgress",
                    components: {
                        "el-progress": c["Progress"],
                        "el-button": c["Button"]
                    },
                    props: {},
                    data() {
                        return {
                            LOGO_RELATIVE_PATH: d["c"],
                            percentage: 0,
                            bytesPerSecond: 0,
                            versionUrl: "",
                            updateVersion: null,
                            processSpeed: "0B/s"
                        }
                    },
                    computed: {
                        downloaded() {
                            return this.percentage >= 100
                        },
                        contentMsg() {
                            const e = this.$route.query.version;
                            return this.downloaded ? `新版本 ${e} 下载完成，即将前往安装...` : `正在下载 ${a["c"]} ${e} 版本，${this.processSpeed}...`
                        }
                    },
                    watch: {},
                    mounted() {
                        const e = window.$ipcRenderer;
                        e.on("download-update-process", (e, t) => {
                            this.processSpeed = t.process_speed, this.percentage = t.process_value
                        }), this.$nextTick(t => {
                            e.on("update-right-now", (e, t) => {
                                this.percentage = 100, Object(r["a"])(3e3).then(() => {
                                    e.sender.send("quit-and-install", t)
                                })
                            }), e.on("app-download-progress", (e, t) => {
                                console.log(t), this.updateNum(t)
                            });
                            const {
                                version: s,
                                download: n
                            } = e.sendSync("update-info");
                            s && Object.keys(s).length > 0 && (this.updateVersion = s.version), n && Object.keys(n).length > 0 && this.updateNum(n)
                        })
                    },
                    methods: {
                        updateNum(e) {
                            this.percentage = Number(Number(e.percent).toFixed(2)), this.bytesPerSecond = Number(e.bytesPerSecond)
                        },
                        cancel() {
                            const e = window.$ipcRenderer;
                            e.send("update-download-cancel")
                        }
                    }
                },
                p = i,
                u = (s("8165"), s("2877")),
                l = Object(u["a"])(p, n, o, !1, null, "e3a80882", null);
            t["default"] = l.exports
        }
    }
]);
//# sourceMappingURL=chunk-b1fa8bc6.5a6f3795.js.map