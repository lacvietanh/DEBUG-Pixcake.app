(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
    ["chunk-7e536582"], {
        "138c": function(t, e, s) {
            "use strict";
            s.d(e, "a", (function() {
                return I
            }));
            var o, i = s("b513"),
                r = s("2b0e"),
                a = s("442f"),
                n = s("8f12"),
                c = s("1013"),
                l = s("2f62"),
                p = s("2204"),
                m = s("3b32");
            (function(t) {
                t[t["R_OK"] = 2] = "R_OK", t[t["W_OK"] = 4] = "W_OK"
            })(o || (o = {}));
            var h = s("4176"),
                d = s("52b8"),
                u = s("01ea"),
                g = s("4a9f"),
                f = s("ea3f"),
                b = s("bd5e");
            const I = {
                    OK: 1,
                    NO_Read_Write: 0,
                    NO_Read: -2,
                    NO_Write: -1,
                    Path_Length_Overflow: -3
                },
                P = "importConfirmDialog";
            e["b"] = r["default"].extend({
                mixins: [a["a"], d["a"]],
                components: {
                    ImportProgressDialog: h["a"]
                },
                data() {
                    return {
                        dropPaths: [],
                        stopImageImport: !1,
                        isMakeSureImport: !1,
                        showImportProgress: !1,
                        importProgress: {},
                        needDeleteImportProject: !1,
                        dbThumbAbortImportFinished: !1,
                        importIdMaps: new Map,
                        importIds: [],
                        deleteRequestMap: new Map,
                        isAppend: !1,
                        curProjectId: null,
                        onHandlerProgress: null,
                        onHandlerFinished: null,
                        myImportName: "",
                        bIsCancelImport: !1
                    }
                },
                computed: {
                    ...Object(l["c"])(["userId"]),
                    ...Object(l["c"])("project", ["activeProject"]),
                    ...Object(l["c"])("thumbnail", ["getThumbnails", "cancelImport"])
                },
                methods: {
                    ...Object(l["b"])("thumbnail", ["ACT_InsertThumbnail"]),
                    ...Object(l["b"])("project", ["ACT_AsyncUpdateProject", "ACT_DeleteResInProject", "ACT_DeleteProject", "ACT_DeleteResInProjectByThumbIds"]),
                    ...Object(l["d"])("thumbnail", ["_SetThumbnails", "_AppendThumbnails"]),
                    ...Object(l["d"])("project", ["_RemoveProject"]),
                    resetHandleCallback() {
                        this.onHandlerFinished = null, this.onHandlerProgress = null
                    },
                    onManualImportClick(t) {
                        this.checkAndImportImages(t, !0, t => {
                            u["g"].handleAfterMenuManualImport(), this.resetHandleCallback(), this.tsNotify({
                                message: `已导入${t}张图片`
                            })
                        }, t => {
                            t.status === n["b"].Start && (this.showImportProgress = !0), this.importProgress = t
                        })
                    },
                    getDropPaths() {
                        let t = window.$dragFiles;
                        return t
                    },
                    async _SetCancelImport(t) {
                        console.log("_SetCancelImport:", t), await u["g"].setCancelImportState(t), this.bIsCancelImport = t
                    },
                    async handleCancelImport() {
                        this.importProgress.status || (this.showImportProgress = !1), console.log("handleCancelImport()", new Date), this.importProgress.status = n["b"].CancelImport, await this._SetCancelImport(!0)
                    },
                    async hasReadWritePermission(t) {
                        if (!t || 0 === t.length) return {
                            result: I.NO_Read_Write,
                            isDir: !0
                        };
                        let e = I.OK,
                            s = !0,
                            r = !1;
                        for (let a = 0; a < t.length; a++) {
                            let n = !0,
                                c = t[a];
                            r = c.length > b["j"];
                            const l = (await i["a"].statSync(c)).isFile();
                            if (l) {
                                if (n = await i["a"].accessSync(c, o.R_OK), n) continue;
                                e = I.NO_Read, s = !1;
                                break
                            } {
                                s = !0;
                                let t = !0,
                                    r = !0;
                                if (n = await i["a"].accessSync(c, o.R_OK), n || (t = !1, e = I.NO_Read), n = await i["a"].accessSync(c, o.W_OK), n || (r = !1, e = t ? I.NO_Write : I.NO_Read_Write), !t || !r) break
                            }
                        }
                        return e != I.OK && f["a"].isWin && !f["a"].isLargeThanWin10Version && r && (e = I.Path_Length_Overflow), {
                            result: e,
                            isDir: s
                        }
                    },
                    async deleteProjectCache(t) {
                        let e = await p["a"].getProjectRootPathByProject(t);
                        try {
                            await m["a"].deleteFolder(e)
                        } catch (s) {
                            console.error(s)
                        }
                    },
                    supportedExtendNames() {
                        return c["a"]
                    },
                    checkCanImport() {
                        return !this.showImportProgress || (this.tsNotify({
                            type: "error",
                            message: "正在导入中，稍后再尝试"
                        }), !1)
                    },
                    toastNoReadWritePermission({
                        result: t,
                        isDir: e
                    }) {
                        const s = e ? "文件夹" : "文件",
                            o = {
                                [I.NO_Read]: "读",
                                [I.NO_Write]: "写",
                                [I.NO_Read_Write]: "读写"
                            };
                        let i = `该${s}没有${o[t]}权限`;
                        t == I.Path_Length_Overflow && (i = `该${s}路径太长了，不能支持`), this.tsNotify({
                            type: "error",
                            message: i
                        })
                    },
                    statImportDetail(t) {
                        let e = t.length,
                            s = 0,
                            o = 0;
                        for (const i of t) 3 == i.imgFormat ? o++ : s++;
                        this.PointCakeImport(`${e}_j${s}_r${o}`)
                    },
                    async checkAndImportImages(t, e, s, o) {
                        if (this.showImportProgress) return void this.tsNotify({
                            type: "error",
                            message: "正在导入中，稍后再尝试"
                        });
                        let i = await window.$net.isOnline();
                        if (!i) return void this.tsNotify({
                            type: "error",
                            message: "网络异常，请检查网络后再试"
                        });
                        this.onHandlerProgress = o, this.onHandlerFinished = s, this.dropPaths = t, this.isAppend = e;
                        const r = this.activeProject;
                        await this.innerCheckAndImportImages(r, t, e, this.needDeleteImportProject, s)
                    },
                    async importImagesOnHome(t, e, s, o) {
                        let i = await window.$net.isOnline();
                        if (!i) return void this.tsNotify({
                            type: "error",
                            message: "网络异常，请检查网络后再试"
                        });
                        this.onHandlerProgress = o, this.onHandlerFinished = s, this.dropPaths = t, this.isAppend = e;
                        const r = this.activeProject;
                        this.showImportProgress = !0, await u["g"].importImagesOnHome(e, r, t, this.needDeleteImportProject)
                    },
                    async innerCheckAndImportImages(t, e, s, o, i) {
                        this.showImportProgress = !0, await u["g"].checkAndImportImages(this.activeProject, e, s, o)
                    },
                    removeProject(t) {
                        this._RemoveProject(t), this.selectProjects.delete(t)
                    },
                    addConfirmDialogListener(t) {
                        t ? g["i"].addListener(Object(g["a"])(P), t => {
                            this.tsConfirm(t).then(async t => {
                                await g["i"].replyDialogConfirm(!0)
                            }).catch(async t => {
                                await g["i"].replyDialogConfirm(!1)
                            })
                        }) : g["i"].removeListener(Object(g["a"])(P))
                    },
                    addImportImageListener() {
                        u["g"].addListener(u["a"], () => {
                            this.showImportProgress = !1
                        }), u["g"].addListener(u["c"], (t, e, s) => {
                            this.onHandlerProgress && this.onHandlerProgress({
                                status: "" + t,
                                over: "" + e,
                                total: "" + s
                            })
                        }), u["g"].addListener(u["b"], t => {
                            this.showImportProgress = !1, this.onHandlerFinished && this.onHandlerFinished(t)
                        }), u["g"].addListener(u["f"], (t, e, s, o) => {
                            this.ACT_AsyncUpdateProject({
                                id: this.activeProject.id,
                                path: o ? this.activeProject.path : this.dropPaths,
                                thumbnailPaths: t,
                                importTimes: e,
                                thumbnailNumber: s
                            }).then(async t => {
                                await this._SetCancelImport(!1), await u["g"].onUpdateProjectResult(!0)
                            }).catch(async t => {
                                console.error(t), await this._SetCancelImport(!1), await u["g"].onUpdateProjectResult(!1)
                            })
                        }), u["g"].addListener(u["d"], t => {
                            this.removeProject(t)
                        }), u["g"].addListener(u["e"], t => {
                            this.myImportName = t
                        })
                    }
                },
                mounted() {
                    this.addImportImageListener(), this.addConfirmDialogListener(!0)
                },
                beforeDestroy() {
                    u["g"].reset(), this.addConfirmDialogListener(!1)
                }
            })
        },
        "1d34": function(t, e, s) {
            "use strict";
            s.r(e);
            var o = function() {
                    var t = this,
                        e = t._self._c;
                    return e("div", {
                        staticClass: "claImportRoot",
                        attrs: {
                            "element-loading-background": "rgba(0, 0, 0, 0.9)"
                        },
                        on: {
                            drop: function(e) {
                                return e.preventDefault(), e.stopPropagation(), t.onDropHanlder.apply(null, arguments)
                            },
                            dragover: function(t) {
                                t.preventDefault(), t.stopPropagation()
                            },
                            dragenter: function(t) {
                                t.preventDefault(), t.stopPropagation()
                            }
                        }
                    }, ["win32" === t.$platform ? [e("div", {
                        staticClass: "win-btn-class"
                    }, [e("el-button", {
                        staticClass: "btn",
                        attrs: {
                            type: "info",
                            size: "larger"
                        },
                        on: {
                            click: function(e) {
                                return t.onAddClick(["openFile"])
                            }
                        }
                    }, [e("div", {
                        staticClass: "content"
                    }, [e("img", {
                        staticClass: "img",
                        attrs: {
                            src: s("8ad5")
                        }
                    }), e("span", {
                        staticClass: "text c-text-regular"
                    }, [t._v("导入图片")])])]), e("el-button", {
                        staticClass: "btn",
                        attrs: {
                            type: "info",
                            size: "larger"
                        },
                        on: {
                            click: function(e) {
                                return t.onAddClick(["openDirectory"])
                            }
                        }
                    }, [e("div", {
                        staticClass: "content"
                    }, [e("img", {
                        staticClass: "img",
                        attrs: {
                            src: s("e8d4")
                        }
                    }), e("span", {
                        staticClass: "text c-text-regular"
                    }, [t._v("导入文件夹")])])])], 1)] : [e("div", {
                        staticClass: "claImportContent border-primary-style-hover",
                        on: {
                            click: function(e) {
                                return t.onAddClick(["openDirectory", "openFile"])
                            }
                        }
                    }, [e("el-button", {
                        attrs: {
                            icon: "el-icon-plus",
                            type: "text"
                        }
                    })], 1)], e("span", {
                        staticClass: "claDes"
                    }, [t._v("点击导入文件或将文件夹（图片）拖到此处")]), this.$isDev || this.$isBeta ? e("div", {
                        attrs: {
                            id: "manualInput"
                        }
                    }, [e("el-input", {
                        style: {
                            width: "300px"
                        },
                        attrs: {
                            clearable: "",
                            placeholder: "自动化测试导入"
                        },
                        model: {
                            value: t.inputImportDir,
                            callback: function(e) {
                                t.inputImportDir = e
                            },
                            expression: "inputImportDir"
                        }
                    }), e("el-button", {
                        style: {
                            marginLeft: "12px"
                        },
                        attrs: {
                            id: "confirmImport"
                        },
                        on: {
                            click: t.onConfirmImportClick
                        }
                    }, [t._v("确定")])], 1) : t._e(), e("importProgressDialog", {
                        attrs: {
                            status: t.importProgress.status,
                            data: t.importProgress,
                            importName: t.myImportName
                        },
                        on: {
                            onCancelled: t.handleCancelImport
                        },
                        nativeOn: {
                            mousedown: function(t) {
                                t.stopPropagation()
                            }
                        },
                        model: {
                            value: t.showImportProgress,
                            callback: function(e) {
                                t.showImportProgress = e
                            },
                            expression: "showImportProgress"
                        }
                    })], 2)
                },
                i = [],
                r = s("2f62"),
                a = s("442f"),
                n = s("138c"),
                c = (s("e31e"), s("8f12")),
                l = s("b513"),
                p = s("4a9f"),
                m = s("2ef0"),
                h = {
                    name: "ImportImageView.vue",
                    mixins: [a["a"], n["b"]],
                    data() {
                        return {
                            showImportProgress: !1,
                            importProgress: {},
                            inputImportDir: null,
                            isShowingImportDialog: !1
                        }
                    },
                    computed: {
                        ...Object(r["c"])("project", ["projects", "previewRouterName"])
                    },
                    watch: {},
                    beforeDestroy() {
                        window.$importImage.importByDevTool = null
                    },
                    mounted() {
                        window.$importImage.importByDevTool = t => {
                            this.onConfirmImportClick(t)
                        }
                    },
                    methods: {
                        async onConfirmImportClick(t) {
                            const e = this.inputImportDir || t;
                            if (e) {
                                try {
                                    const t = await l["a"].existsSync(e);
                                    if (!t) return void this.tsNotify("文件或文件夹不存在")
                                } catch (s) {
                                    return void this.tsNotify("文件或文件夹不存在")
                                }
                                this.processImport([e])
                            } else this.tsNotify("路径不能为空")
                        },
                        processImport: Object(m["debounce"])((async function(t) {
                            const e = await this.hasReadWritePermission(t);
                            if (1 === e.result) {
                                if (t.length > 0) {
                                    let e = !1,
                                        s = this;
                                    await this.checkAndImportImages(t, e, t => {
                                        s.$router.push({
                                            name: this.previewRouterName,
                                            query: {
                                                imageFilePaths: t
                                            }
                                        })
                                    }, t => {
                                        t.status === c["b"].Start && (this.showImportProgress = !0), this.importProgress = t
                                    })
                                }
                            } else this.toastNoReadWritePermission(e)
                        }), 1e3),
                        onAddClick: Object(m["debounce"])((async function(t = ["openDirectory", "openFile"]) {
                            if (this.isShowingImportDialog) return;
                            this.isShowingImportDialog = !0;
                            const e = p["i"],
                                s = await e.showOpenDialog({
                                    properties: t
                                });
                            s && s.filePaths && 0 == s.filePaths.length || await this.processImport(s.filePaths), this.isShowingImportDialog = !1
                        }), 300),
                        async onDropHanlder(t) {
                            let e = this.getDropPaths(),
                                s = [];
                            for (let r of e) {
                                let t = r.path;
                                s.push(t)
                            }
                            const o = await this.hasReadWritePermission(s);
                            if (1 !== o.result) return void this.toastNoReadWritePermission(o);
                            let i = !1;
                            await this.checkAndImportImages(s, i, t => {
                                this.$router.push({
                                    name: this.previewRouterName,
                                    query: {
                                        imageFilePaths: t
                                    }
                                })
                            }, t => {
                                t.status === c["b"].Start && (this.showImportProgress = !0), this.importProgress = t
                            })
                        }
                    }
                },
                d = h,
                u = (s("4330"), s("2877")),
                g = Object(u["a"])(d, o, i, !1, null, "7d5e32cb", null);
            e["default"] = g.exports
        },
        4176: function(t, e, s) {
            "use strict";
            var o = function() {
                    var t = this,
                        e = t._self._c;
                    t._self._setupProxy;
                    return e("el-dialog", {
                        attrs: {
                            top: "40vh",
                            width: "370px",
                            align: "center",
                            title: "",
                            "custom-class": "common-dialog import-progress-dialog",
                            visible: t.visible,
                            "close-on-click-modal": !1,
                            "close-on-press-escape": !1,
                            "show-close": !1
                        },
                        on: {
                            "update:visible": function(e) {
                                t.visible = e
                            }
                        }
                    }, [e("div", {
                        staticClass: "container"
                    }, [e("div", {
                        staticClass: "info"
                    }, [t._v(t._s(t.message))]), e("div", {
                        staticClass: "claProgressItem"
                    }, [e("el-progress", {
                        attrs: {
                            "show-text": !1,
                            "text-inside": "",
                            "stroke-width": 5,
                            percentage: t.percentage > 100 ? 100 : t.percentage
                        }
                    }), t.showCancelBtn && t.canShowCancelBtn ? e("el-button", {
                        staticClass: "claCloseBtn",
                        attrs: {
                            icon: "el-icon-close"
                        },
                        on: {
                            click: t.onCancelClick
                        }
                    }) : t._e()], 1)])])
                },
                i = [],
                r = (s("caad"), s("2b0e")),
                a = s("2f62"),
                n = s("442f"),
                c = s("8f12"),
                l = s("5c96"),
                p = s("1209"),
                m = s("6310"),
                h = s("f5de"),
                d = s("ca35");
            const u = m["b"].path,
                g = s("4362");
            var f = Object(r["defineComponent"])({
                    name: "import-progress-dialog",
                    mixins: [n["a"]],
                    components: {
                        "el-dialog": h["a"],
                        "el-progress": l["Progress"]
                    },
                    props: {
                        value: {
                            type: Boolean,
                            default: !1
                        },
                        status: {
                            type: String,
                            default: c["b"].Start
                        },
                        data: {
                            type: Object,
                            default: () => {}
                        },
                        importFilePaths: {
                            type: Array,
                            default: () => []
                        },
                        showCancelBtn: {
                            type: Boolean,
                            default: !0
                        },
                        importName: {
                            type: String,
                            default: ""
                        }
                    },
                    setup() {
                        const {
                            PointHomeItem: t
                        } = Object(d["a"])();
                        return {
                            PointHomeItem: t
                        }
                    },
                    data() {
                        return {
                            loading: !1,
                            visible: this.value,
                            loadingTimer: null,
                            uploadPercent: 0,
                            isCancel: !1,
                            canShowCancelBtn: !0,
                            hasImportDbStatus: !1
                        }
                    },
                    filters: {},
                    computed: {
                        ...Object(a["c"])("finishing", []),
                        ...Object(a["c"])("thumbnail", ["cancelImport"]),
                        message() {
                            let t = this.importName;
                            const e = 312,
                                s = "正在导入${n}下选择的图片",
                                o = s.replace("${n}", ""),
                                i = e - this.calcTextPixLen(o),
                                r = this.calcTextPixLen(t);
                            if (t && r > i) {
                                const e = t.length,
                                    s = 10,
                                    o = t.substr(t.length - s, s),
                                    a = this.calcTextPixLen(o),
                                    n = r / e;
                                let c = i - 2 * n - a,
                                    l = "";
                                for (let i = 0; i < e; i++) {
                                    l += t[i];
                                    const e = this.calcTextPixLen(l);
                                    if (e > c) break
                                }
                                t = `${l}...${o}`
                            }
                            let a = "正在导入选择的图片";
                            return t && (a = s.replace("${n}", t)), (this.status == c["b"].ImportingToDB || this.hasImportDbStatus) && (a = "正在载入数据库，请稍后…"), a
                        },
                        formatMessage(t) {
                            return t
                        },
                        percentage() {
                            const t = {
                                [c["b"].Start]: 2,
                                [c["b"].ImportOver]: 100,
                                [c["b"].CancelImport]: 19,
                                [c["b"].ImportEmpty]: 39,
                                [c["b"].RequestZeroError]: 31
                            };
                            if (this.status === c["b"].Start || this.status === c["b"].Importing) {
                                const {
                                    over: t,
                                    total: e
                                } = this.data;
                                if (void 0 === t || void 0 === e) return 0;
                                const s = t / e * 100;
                                let o = parseInt(s);
                                return console.log("per : ", o, " status : ", this.status), o
                            }
                            if (this.status === c["b"].Start) {
                                let e = t[c["b"].Start];
                                const {
                                    over: s,
                                    total: o
                                } = this.data, i = s / o;
                                return e += parseInt(40 * i), this.uploadPercent + e
                            }
                            if (this.status === c["b"].RequestZero) return this.uploadPercent + 2;
                            if (this.status === c["b"].Importing) {
                                const {
                                    over: t,
                                    total: e
                                } = this.data, s = t / e;
                                return 40 + parseInt(60 * s)
                            }
                            return t[this.status] || 0
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
                            t || (this.hasImportDbStatus = !1), this.$emit("input", t)
                        },
                        status(t) {
                            t == c["b"].ImportingToDB && (this.canShowCancelBtn = !1, this.hasImportDbStatus = !0);
                            const e = [c["b"].ImportOver, c["b"].CancelImport, c["b"].ImportEmpty, c["b"].ImportRepet, c["b"].RequestZeroError];
                            t === c["b"].RequestZero ? this.autoAddPercentage() : (clearTimeout(this.loadingTimer), e.includes(t) && Object(p["a"])(t === c["b"].ImportOver ? 300 : 1e3).then(() => {
                                this.visible = !1
                            }))
                        }
                    },
                    mounted() {},
                    methods: {
                        ...Object(a["d"])([]),
                        async getInputRootName() {
                            console.log("getInputRootName", g);
                            const t = g.env.HOME || g.env.USERPROFILE || g.env.HOMEPATH,
                                e = this.importFilePaths,
                                s = await u.parse(t).root.toUpperCase(),
                                o = [t, await u.join(s, "/Public")],
                                i = ["/Applications", "/Users/Shared", t],
                                r = async t => {
                                    const e = new Map;
                                    for (const s of t) {
                                        let t = this.$isWin ? o : i,
                                            r = null;
                                        for (const e of t)
                                            if (s.startsWith(e)) {
                                                r = e;
                                                break
                                            } if (r) {
                                            let t = e.get(r);
                                            t || (t = []), t.push(s), e.set(r, t)
                                        }
                                        if (this.$isWin && !r) {
                                            const t = await u.parse(s).root.toUpperCase();
                                            e.set(t, s)
                                        }
                                    }
                                    return e
                                }, a = r(e), n = a.size;
                            let c = null;
                            if (1 === n && (c = a.keys().next().value, c.startsWith(t))) {
                                const e = a.get(c),
                                    s = e[0],
                                    o = await u.sep(),
                                    i = await u.join(t, o),
                                    r = i.length;
                                let n = i;
                                for (let t = r; t < s.length; t++) {
                                    const e = s[t];
                                    if (e === o) break;
                                    n += e
                                }
                                let l = !0;
                                for (const t of e)
                                    if (!t.startsWith(n)) {
                                        l = !1;
                                        break
                                    } c = l ? n : null
                            }
                            if (!c) return null;
                            let l = await u.basename(c);
                            return l && 0 !== l.length || (l = c), l
                        },
                        calcTextPixLen(t) {
                            let e = 0,
                                s = document.createElement("span");
                            return s.innerText = t, s.style.fontSize = "14px", s.style.fontWeight = "normal", document.documentElement.append(s), e = s.offsetWidth, document.documentElement.removeChild(s), e
                        },
                        autoAddPercentage() {
                            if (console.log("autoAddPercentage"), this.status === c["b"].CancelImport || !this.visible || this.cancelImport) return clearTimeout(this.loadingTimer), this.loadingTimer = null, void console.log("kill autoAddPercentage()");
                            this.loadingTimer && clearTimeout(this.loadingTimer), this.loadingTimer = setTimeout(t => {
                                if (this.status === c["b"].CancelImport || !this.visible || this.cancelImport) return clearTimeout(this.loadingTimer), this.loadingTimer = null, void console.log("kill autoAddPercentage()");
                                this.uploadPercent < 38 && (this.uploadPercent += 1, this.autoAddPercentage())
                            }, 100)
                        },
                        onCancelClick() {
                            this.PointHomeItem("import_close"), this.$emit("onCancelled", null)
                        }
                    }
                }),
                b = f,
                I = (s("681b"), s("550b"), s("2877")),
                P = Object(I["a"])(b, o, i, !1, null, "193bb274", null);
            e["a"] = P.exports
        },
        4330: function(t, e, s) {
            "use strict";
            s("d62e")
        },
        "550b": function(t, e, s) {
            "use strict";
            s("bc91")
        },
        "681b": function(t, e, s) {
            "use strict";
            s("94fe")
        },
        "94fe": function(t, e, s) {},
        bc91: function(t, e, s) {},
        ca35: function(t, e, s) {
            "use strict";
            s.d(e, "a", (function() {
                return r
            }));
            var o = s("adeb"),
                i = s("e751");

            function r() {
                const {
                    sendPoint: t
                } = Object(o["a"])();

                function e(e) {
                    t(i["d"].CakeWorkBench, {
                        cake_operate: e
                    })
                }

                function s(e) {
                    t(i["d"].CakeWorkBench, {
                        cake_operate: "click_project",
                        cake_number: e
                    })
                }
                return {
                    PointHomeItem: e,
                    PointClickProject: s
                }
            }
        },
        d62e: function(t, e, s) {}
    }
]);
//# sourceMappingURL=chunk-7e536582.bf41dd79.js.map