(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-04cad172"], {
        "014b": function(t, e, n) {
            "use strict";
            n.r(e);
            var i = function() {
                    var t = this,
                        e = t._self._c;
                    return e("div", {
                        staticClass: "container"
                    }, [e("img", {
                        staticClass: "claImg",
                        attrs: {
                            src: n("d679")
                        }
                    }), e("img", {
                        staticClass: "logo",
                        attrs: {
                            src: n("4f61"),
                            align: "left"
                        }
                    }), e("div", {
                        staticClass: "content"
                    }, [e("div", {
                        attrs: {
                            id: "launch-content"
                        }
                    }, [t._v(" " + t._s(t.launchContentPre) + " ")]), e("span", {
                        staticClass: "info",
                        attrs: {
                            id: "version-content"
                        }
                    }, [t._v(" " + t._s(t.version))]), e("span", {
                        staticClass: "info"
                    }, [t._v("Copyright © 2022 " + t._s(t.clientName))])])])
                },
                s = [],
                a = {
                    name: "LaunchView",
                    data() {
                        return {
                            launchMode: 1,
                            version: "1.2p.3",
                            platform: "pix",
                            clientName: "",
                            launchContentPre: "正在启动",
                            startTime: 0
                        }
                    },
                    created() {
                        const t = [{
                            key: 5e3,
                            value: "正在进行硬件加速"
                        }, {
                            key: 1e4,
                            value: "正在请求网络配置"
                        }, {
                            key: 3e4,
                            value: "正在请求网络配置，如启动时间过长，请检查网络状态"
                        }];
                        this.startTime = (new Date).getTime(), this.clientName = decodeURI(this.getQueryString("clientName")), this.platform = this.getQueryString("platform"), this.launchMode = this.getQueryString("model"), this.version = "版本" + this.getQueryString("version");
                        let e = 0;
                        setInterval(() => {
                            if (e < 3) e++, this.launchContentPre += ".";
                            else {
                                e = 0, this.launchContentPre = "正在启动";
                                let n = (new Date).getTime() - this.startTime;
                                for (const e of t)
                                    if (n <= e.key) {
                                        this.launchContentPre = e.value;
                                        break
                                    }
                            }
                        }, 300)
                    },
                    methods: {
                        getQueryString(t) {
                            let e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
                                n = location.search.substr(1).match(e);
                            return null != n ? n[2] : null
                        }
                    }
                },
                c = a,
                r = (n("8acc"), n("2877")),
                l = Object(r["a"])(c, i, s, !1, null, "53371621", null);
            e["default"] = l.exports
        },
        "4f61": function(t, e, n) {
            t.exports = n.p + "img/launch_icon_logo@3x.cea85c8b.png"
        },
        "8acc": function(t, e, n) {
            "use strict";
            n("dc72")
        },
        d679: function(t, e, n) {
            t.exports = n.p + "img/launch_image_bgp@3x.b0d29981.png"
        },
        dc72: function(t, e, n) {}
    }
]);
//# sourceMappingURL=chunk-04cad172.52a10aab.js.map