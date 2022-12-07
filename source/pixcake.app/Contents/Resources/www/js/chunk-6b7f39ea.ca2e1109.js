(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-6b7f39ea"], {
    "30c2": function(e, t, a) {
      "use strict";
      a("d959")
    },
    "333c": function(e, t, a) {},
    "620c": function(e, t, a) {
      "use strict";
      a.d(t, "a", (function() {
        return i
      }));
      class i {
        constructor() {
          this._instance = null, this.imageIoQueue = new Map, this.imageViewModelQueue = new Map, this.imageDataQueue = new Map, this.renderImageDataQue = new Map, this._thumbnailWidth = 0, this.qrcEngineMap = new Map, this.errorHandle = null, this.successHandle = null
        }
        static shareInstance() {
          return this._instance || (this._instance = new i), this._instance
        }
      }
    },
    "6e8b": function(e, t, a) {
      "use strict";
      a.r(t);
      var i = function() {
          var e = this,
            t = e._self._c;
          e._self._setupProxy;
          return t("div", {
            staticClass: "claBatchRetouch"
          }, [t("div", {
            staticClass: "claLeft",
            on: {
              drop: function(t) {
                return t.preventDefault(), t.stopPropagation(), e.onDropHanlder(t)
              },
              dragover: function(e) {
                e.preventDefault(), e.stopPropagation()
              },
              dragenter: function(e) {
                e.preventDefault(), e.stopPropagation()
              }
            }
          }, [t("div", {
            staticClass: "claThumbnailList"
          }), t("div", {
            staticClass: "claBottom"
          }, [t("div", {
            staticClass: "claEditedCount"
          }, [t("span", [e._v(e._s(`已修:${e.editCount}张 总计:${e.totalCount}张`))])]), t("el-radio-group", {
            staticClass: "claListSwitch",
            attrs: {
              size: "mini"
            },
            on: {
              change: e.onListStyleChanged
            },
            model: {
              value: e.isList,
              callback: function(t) {
                e.isList = t
              },
              expression: "isList"
            }
          }, [t("el-radio-button", {
            attrs: {
              label: 1,
              border: ""
            }
          }, [(e.isList, t("img", {
            attrs: {
              src: e.$getIconPath("toolbar_button_all@3x.png")
            }
          }))]), t("el-radio-button", {
            attrs: {
              label: 2,
              border: ""
            }
          }, [(e.isList, t("img", {
            attrs: {
              src: e.$getIconPath("toolbar_button_all_one@3x.png")
            }
          }))])], 1), t("el-button", {
            class: {
              isSelect: e.isSelectedAll
            },
            staticStyle: {
              width: "80px"
            },
            attrs: {
              plain: "",
              size: "mini"
            },
            on: {
              click: function(t) {
                e.onSelectedAllClick(), e.cancelBlur(t)
              }
            }
          }, [e._v(" " + e._s(e.isSelectedAll ? "Hủy全选" : "全选") + " ")]), t("el-button", {
            staticClass: "claSelectFavouriteAll",
            attrs: {
              plain: "",
              size: "mini"
            },
            on: {
              click: function(t) {
                e.onSelectFavouriteClick(), e.cancelBlur(t)
              }
            }
          }, [e._v(" " + e._s("" + (e.isSelectedFavourite ? "Hủy选中星标" : "选中星标图片")) + " ")])], 1)]), t("BatchPalette", {
            ref: "paletteViewRef",
            attrs: {
              "image-type": e.selectionImageType,
              recommendPreItems: e.recommendPreItems,
              myRecommendSelectIndex: e.myRecommendSelectIndex,
              myPreItems: e.myPreItems,
              myCurPresetSelectIndex: e.myCurPresetSelectIndex,
              histogramData: e.histogramData
            },
            on: {
              onAddPresetCallBack: e.onAddPresettingClick,
              onNativeRightClick: e.onPresetMenuRightClick,
              onItemClick: e.onReminderPreItemClick,
              onStepChange: e.onStepChange,
              onResetClick: e.onResetPaletteCallback
            }
          }, [t("template", {
            slot: "histogram"
          }, [t("Histogram", {
            ref: "tsHistogram",
            attrs: {
              chartData: e.histogramData.chartData || {},
              imageInfo: e.histogramData.imageInfo || {}
            }
          })], 1)], 2), t("importProgressDialog", {
            attrs: {
              status: e.importProgress.status,
              data: e.importProgress,
              importName: e.myImportName
            },
            on: {
              onCancelled: e.handleCancelImport
            },
            model: {
              value: e.showImportProgress,
              callback: function(t) {
                e.showImportProgress = t
              },
              expression: "showImportProgress"
            }
          }), t("delete-progress-dialog", {
            attrs: {
              status: e.deleteProgress.status,
              data: e.deleteProgress
            },
            model: {
              value: e.showDeleteProgress,
              callback: function(t) {
                e.showDeleteProgress = t
              },
              expression: "showDeleteProgress"
            }
          })], 1)
        },
        s = [],
        n = (a("caad"), a("2b0e")),
        l = a("2f62"),
        r = a("fa7d"),
        o = a("620c"),
        c = a("8b98"),
        h = a("2ef0"),
        d = a("442f"),
        u = a("7b38"),
        m = a("c8c9"),
        p = a("138c"),
        g = (a("8464"), a("c75e")),
        S = function() {
          var e = this,
            t = e._self._c;
          e._self._setupProxy;
          return t("div", {
            ref: "paramsComRef",
            staticClass: "claRight global__params-bar"
          }, [t("div", {
            staticClass: "border-style claHistogramCollapse global__scroll-style",
            staticStyle: {
              "border-top-width": "0px"
            },
            attrs: {
              slot: "top"
            },
            slot: "top"
          }, [t("el-collapse", {
            staticClass: "collapse",
            on: {
              change: e.onTopCollapseChanged
            },
            model: {
              value: e.activeNames,
              callback: function(t) {
                e.activeNames = t
              },
              expression: "activeNames"
            }
          }, [t("el-collapse-item", {
            ref: "histogram",
            attrs: {
              title: "Biểu đồ",
              name: "histogram"
            }
          }, [e._t("histogram")], 2), t("el-collapse-item", {
            ref: "recommend",
            attrs: {
              title: "推荐Đặt trước",
              name: "preset"
            }
          }, [t("template", {
            slot: "title"
          }, [t("div", {
            staticClass: "claWtBlanceTitle"
          }, [t("span", {
            staticClass: "claTitle"
          }, [e._v("Đặt trước")]), t("div", [t("el-button", {
            staticClass: "addBtnCla",
            attrs: {
              circle: "",
              icon: "el-icon-refresh-left"
            },
            on: {
              click: function(t) {
                t.stopPropagation(), e.handlResetPreset(), e.cancelBlur(t)
              }
            }
          }), t("el-button", {
            staticClass: "addBtnCla",
            staticStyle: {
              "margin-right": "10px"
            },
            attrs: {
              circle: "",
              icon: "el-icon-circle-plus-outline"
            },
            on: {
              click: function(t) {
                t.stopPropagation(), e.handleAddPreset(), e.cancelBlur(t)
              }
            }
          })], 1)])]), t("TSPresetTree", {
            ref: "tSPresetTree",
            on: {
              onItemClick: e.onApplyPresetClick
            }
          })], 2)], 1)], 1), t("ImportPresetDialog", {
            model: {
              value: e.showImportPresetDialog,
              callback: function(t) {
                e.showImportPresetDialog = t
              },
              expression: "showImportPresetDialog"
            }
          }), t("NewPresetTypeDialog", {
            on: {
              loadPreset: e.loadPreset
            },
            model: {
              value: e.showNewPresetTypeDialog,
              callback: function(t) {
                e.showNewPresetTypeDialog = t
              },
              expression: "showNewPresetTypeDialog"
            }
          })], 1)
        },
        f = [],
        b = a("af81"),
        P = a("ddca");
      const y = .025,
        I = .05,
        C = {
          whiteBalanceParamCfg: [{
            label: "Nhiệt độ màu",
            key: "EnhanceEditColorTemperatureRelative",
            alias: "EnhanceEditColorTemperature",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y / 2,
            doubleRatio: I / 2
          }, {
            label: "Tông",
            key: "EnhanceEditHueRelative",
            alias: "EnhanceEditHue",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y / 2,
            doubleRatio: I / 2
          }],
          colorParamCfg: [{
            label: "Tiếp xúc度",
            key: "EnhanceEditExposure",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: .03,
            doubleRatio: .05
          }, {
            label: "Ngược lại",
            key: "EnhanceEditContrast",
            showSeparatorLine: !0,
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }, {
            label: "Ánh sáng cao",
            key: "EnhanceEditHighlight",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }, {
            label: "Shadow",
            key: "EnhanceEditShadow",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }, {
            label: "Trắng",
            key: "EnhanceEditWhite",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }, {
            label: "Black",
            key: "EnhanceEditBlack",
            showSeparatorLine: !0,
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }, {
            label: "Rõ ràng",
            key: "EnhanceEditCameraRawSharpen",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }, {
            label: "Sống động",
            key: "EnhanceEditCameraRawVibrance",
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }, {
            label: "Hòa",
            key: "EnhanceEditSaturation",
            showSeparatorLine: !0,
            singleStepLen: 1,
            dbStepLen: 2,
            singleRatio: y,
            doubleRatio: I
          }]
        };
      var k = function() {
          var e = this,
            t = e._self._c;
          return t("div", {
            staticClass: "claStepControl"
          }, [t("div", {
            class: {
              claQuickNarrowLeft: !0,
              claHover: e.enable,
              claDisable: !e.enable,
              "icon-btn-hover": e.enable
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), e.onDbLeftClick.apply(null, arguments)
              }
            }
          }, [t("i", {
            staticClass: "el-icon-d-arrow-left"
          })]), t("div", {
            class: {
              claNarrowLeft: !0,
              claHover: e.enable,
              claDisable: !e.enable,
              "icon-btn-hover": e.enable
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), e.onLeftClick.apply(null, arguments)
              }
            }
          }, [t("i", {
            staticClass: "el-icon-arrow-left"
          })]), t("div", {
            class: {
              claNarrowRight: !0,
              claHover: e.enable,
              claDisable: !e.enable,
              "icon-btn-hover": e.enable
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), e.onRightClick.apply(null, arguments)
              }
            }
          }, [t("i", {
            staticClass: "el-icon-arrow-right"
          })]), t("div", {
            class: {
              claQuickNarrowRight: !0,
              claHover: e.enable,
              claDisable: !e.enable,
              "icon-btn-hover": e.enable
            },
            on: {
              click: function(t) {
                return t.stopPropagation(), e.onDbRightClick.apply(null, arguments)
              }
            }
          }, [t("i", {
            staticClass: "el-icon-d-arrow-right"
          })])])
        },
        w = [];
      const v = 0,
        T = 1,
        R = 2,
        E = 3,
        _ = 4;
      var x = {
          name: "TSParamStepControl",
          data() {
            return {
              pMaxValue: 100,
              pDoubleStepLen: 5,
              pSingleStepLen: 1,
              clickTimer: -1,
              counter: 0,
              stepStyle: v
            }
          },
          computed: {},
          watch: {
            maxValue: {
              handler: function(e, t) {
                e && (this.pMaxValue = e)
              },
              immediate: !0
            },
            doubleStepLen: {
              handler: function(e, t) {
                e && (this.pDoubleStepLen = e)
              },
              immediate: !0
            },
            singleStepLen: {
              handler: function(e, t) {
                e && (this.pSingleStepLen = e)
              },
              immediate: !0
            },
            floatValue: {
              handler: function(e, t) {
                e && (this.pIntValue = this.pMaxValue * e)
              },
              immediate: !0
            }
          },
          props: {
            maxValue: Number,
            doubleStepLen: Number,
            singleStepLen: Number,
            enable: Boolean,
            addtionObject: Object
          },
          methods: {
            notifyStepChanged(e, t, a) {
              this.$emit("onStepChange", [e, t, this.addtionObject, a])
            },
            dispatchClickEvent(e) {
              if (this.stepStyle != v && this.stepStyle != e && this.clickTimer) {
                clearTimeout(this.clickTimer), this.clickTimer = -1;
                let t = -this.pDoubleStepLen,
                  a = !1;
                switch (this.stepStyle) {
                  case T:
                    t = -this.pDoubleStepLen, a = !0;
                    break;
                  case _:
                    t = this.pDoubleStepLen, a = !0;
                    break;
                  case R:
                    t = -this.pSingleStepLen, a = !1;
                    break;
                  case E:
                    t = this.pSingleStepLen, a = !1;
                    break
                }
                this.stepStyle = e, this.notifyStepChanged(t, a, this.counter), this.counter = 0
              }
            },
            createClickTimer: function() {
              -1 == this.clickTimer && (this.clickTimer = setTimeout(() => {
                this.dispatchClickEvent(v)
              }, 1e3))
            },
            onDbLeftClick() {
              this.dispatchClickEvent(T), this.stepStyle = T, this.counter++, this.createClickTimer()
            },
            onLeftClick() {
              this.dispatchClickEvent(R), this.stepStyle = R, this.counter++, this.createClickTimer()
            },
            onRightClick() {
              this.dispatchClickEvent(E), this.stepStyle = E, this.counter++, this.createClickTimer()
            },
            onDbRightClick() {
              this.dispatchClickEvent(_), this.stepStyle = _, this.counter++, this.createClickTimer()
            }
          }
        },
        D = x,
        L = (a("8063"), a("2877")),
        $ = Object(L["a"])(D, k, w, !1, null, "528a5392", null),
        U = $.exports,
        A = a("5c96"),
        M = a("1013"),
        V = a("34a3"),
        N = a("81f4");
      class F {
        async getRefineParamsSplitValue() {
          let e = await N["a"].get("refineRightParamsSplitValue");
          return "undefined" !== e && null !== e && (e = parseFloat(e)), e
        }
        async setRefineParamsSplitValue(e) {
          await N["a"].set("refineRightParamsSplitValue", e)
        }
        async getBatchRetouchParamsSplitValue() {
          let e = await N["a"].get("batchRetouchParamsSplitValue");
          return "undefined" !== e && null !== e && (e = parseFloat(e)), e
        }
        async setBatchRetouchParamsSplitValue(e) {
          await N["a"].set("batchRetouchParamsSplitValue", e)
        }
      }
      var j = a("7203"),
        O = a("e751"),
        B = a("465e");
      const H = 38.5,
        W = 38.5;
      var z = Object(n["defineComponent"])({
          name: "BatchPalette",
          mixins: [u["a"], d["a"], P["a"]],
          components: {
            Split: V["a"],
            TSPresetTree: b["a"],
            TSParamStepControl: U,
            "el-divider": A["Divider"]
          },
          props: {
            recommendPreItems: Array,
            myRecommendSelectIndex: {
              type: [Number, String],
              default: -1
            },
            myCurPresetSelectIndex: {
              type: [Number, String],
              default: -1
            },
            myPreItems: Array,
            histogramData: {
              type: Object,
              default () {
                return null
              }
            },
            imageType: {
              type: [Number],
              default: 0
            }
          },
          setup() {
            const {
              PointPreset: e,
              PointBatchPalette: t
            } = Object(B["a"])();
            return {
              PointPreset: e,
              PointBatchPalette: t
            }
          },
          data() {
            return {
              enableStepControl: !0,
              showImportPresetDialog: !1,
              showNewPresetTypeDialog: !1,
              paletteLayout: {
                ...C
              },
              activeNames: ["1", "2", "histogram"],
              splitManualVal: .3,
              splitVal: .3,
              splitMinVal: 270,
              splitMaxVal: 122,
              presetHeight: 0,
              isFirstTime: !0
            }
          },
          watch: {
            imageType: {
              handler: function(e, t) {
                this.$nextTick(() => {
                  this.calcMiniSplitValue(null)
                })
              },
              immediate: !0
            },
            activeNames: {
              handler: function(e, t) {
                this.$nextTick(() => {
                  const t = e.includes("histogram"),
                    a = e.includes("preset");
                  this.isFirstTime || (this.$store.commit("changeActionStatus_batchRetouch", [t ? "batchRetouch_histogram" : "", a ? "batchRetouch_preset" : ""]), this.isPresetShow = a), this.isFirstTime = !1
                })
              },
              immediate: !1
            },
            splitVal: {
              handler: function(e, t) {
                let a = this.$refs.bottomRef;
                a && (a.scrollTop = 0, this.calcPresetHeight())
              },
              immediate: !1
            },
            splitManualVal(e) {
              let t = new F;
              t.setBatchRetouchParamsSplitValue(e)
            },
            histogramData(e) {
              this.$nextTick(() => {
                this.calcMiniSplitValue(null)
              })
            }
          },
          computed: {
            ...Object(l["c"])(["actionStatus"])
          },
          async mounted() {
            this.getActiveNames(), await this.initSplitVal(), this.listenResizeEvent(!0)
          },
          beforeDestroy() {
            this.listenResizeEvent(!1)
          },
          methods: {
            ...Object(l["d"])("project", ["_SetLastProjectUpdateTime"]),
            onResizeEvent() {
              this.$nextTick(() => {
                this.calcPresetHeight()
              })
            },
            listenResizeEvent(e) {
              e ? window.addEventListener("resize", this.onResizeEvent) : window.removeEventListener("resize", this.onResizeEvent)
            },
            async initSplitVal() {
              let e = new F,
                t = await e.getBatchRetouchParamsSplitValue();
              t && (this.splitVal = t, this.splitManualVal = t), this.calcMiniSplitValue(), this.calcPresetHeight()
            },
            onTopCollapseChanged(e) {
              this.$nextTick(() => {
                let e = this.activeNames;
                const t = e.includes("histogram"),
                  a = e.includes("preset");
                this.isFirstTime || (this.$store.commit("changeActionStatus_batchRetouch", [t ? "batchRetouch_histogram" : "", a ? "batchRetouch_preset" : ""]), this.isPresetShow = a), this.calcMiniSplitValue(), this.isFirstTime = !1, this.calcPresetHeight()
              })
            },
            histogramHeight() {
              let e = this.$refs.histogram;
              if (!e) return 0;
              const t = this.$refs.histogram.$children[0].getHeight();
              return console.log("histogramHeight.build = " + t), t
            },
            calcPresetHeight() {
              let e = this.$refs.paramsComRef;
              if (!e) return 0;
              let t = e.getBoundingClientRect().height,
                a = this.activeNames.includes("histogram"),
                i = a ? this.histogramHeight() : 0,
                s = t * this.splitVal - i - H - W;
              this.presetHeight = s
            },
            calcMiniSplitValue() {
              let e = this.activeNames.includes("histogram");
              const t = this.activeNames.includes("preset");
              let a = e ? this.histogramHeight() : 0;
              const i = 35,
                s = t ? 3 : 0,
                n = this.imageType == M["d"].Raw ? 40 : 0;
              let l = a + H + W + i * s + n;
              this.splitMinVal = l;
              let r = l / this.$refs.paramsComRef.getBoundingClientRect().height;
              this.$refs.paramsComRef && !this.isFirstTime && (this.splitManualVal < r ? this.splitVal = r : this.splitVal = this.splitManualVal), t || (this.splitVal = r)
            },
            async loadPreset() {},
            getActiveNames() {
              const e = this.actionStatus.includes("batchRetouch_histogram"),
                t = this.actionStatus.includes("batchRetouch_preset");
              this.activeNames = e || t ? e && !t ? ["1", "2", "histogram"] : !e && t ? ["1", "2", "preset"] : ["1", "2", "histogram", "preset"] : ["1", "2"]
            },
            handleSetCheckedNodes(e) {
              0 == e ? this.$refs["tSPresetTree"].handleSetCheckedNodes(null) : this.$refs["tSPresetTree"].handleSetCheckedNodes(e)
            },
            handlResetPreset() {
              const e = new Array(this.$store.state.presetting.oriPreset);
              this.onApplyPresetClick(e), this.$refs["tSPresetTree"].handleSetCheckedNodes(-1)
            },
            getThumnailView() {
              return this.$refs.thumbnailRef || null
            },
            getTemperatureColorStepRef() {
              return this.$refs.temperatureColorStepRef ? this.$refs.temperatureColorStepRef[0] : null
            },
            onApplyPresetClick(e) {
              e[0].classifyType === M["e"].System ? this.PointPreset(!0, e[0].id) : this.PointPreset(!1, e[0].id), this.$emit("onItemClick", e), this._SetLastProjectUpdateTime(new Date)
            },
            async handleAddPreset() {
              this.PointBatchPalette("add_preset_icon");
              const e = new j["a"];
              e.push({
                label: "Để nhập định sẵn",
                action: "batchretouch-my-preset-import",
                disabled: !1,
                data: null,
                callback: () => this.showImportPresetDialog = !0
              }).push({
                label: "Phân loại mới",
                action: "batchretouch-my-preset-newType",
                disabled: !1,
                data: null,
                callback: () => {
                  this.showNewPresetTypeDialog = !0, this.PointBatchPalette(O["l"].AddPresetSort)
                }
              }).show()
            }
          }
        }),
        Q = z,
        G = (a("c35f"), Object(L["a"])(Q, S, f, !1, null, "1153dd53", null)),
        K = G.exports,
        q = a("06fd"),
        J = a("8f12"),
        X = a("4176"),
        Y = a("74f7"),
        Z = a("1cd6"),
        ee = (a("45a3"), a("25c2"), a("3eaf")),
        te = a("bd5e"),
        ae = a("3010"),
        ie = a("52b8"),
        se = a("0b24"),
        ne = a("98f8"),
        le = (a("1209"), a("67a1")),
        re = a("676c"),
        oe = a("4eec"),
        ce = Object(n["defineComponent"])({
          components: {
            "delete-progress-dialog": re["a"]
          },
          setup() {
            return Object(oe["a"])()
          },
          data() {
            return {}
          },
          mixins: [],
          computed: {},
          methods: {},
          mounted() {}
        }),
        he = a("5008"),
        de = a("4a9f"),
        ue = a("ccd2"),
        me = Object(n["defineComponent"])({
          name: "batchRetouch",
          components: {
            BatchPalette: K,
            Histogram: q["a"],
            ImportProgressDialog: X["a"]
          },
          mixins: [d["a"], u["a"], m["a"], p["b"], P["a"], ie["a"], ce],
          data() {
            return {
              defaultGridColumn: 5,
              columns: 5,
              activeName: ["recommend", "user"],
              isList: "1",
              isSelectedAll: !1,
              isSelectedFavourite: !1,
              totalCount: 0,
              lrEdgePadding: 105,
              listScrollTop: 0,
              singleScrollTop: 0,
              imageOriPresetMap: new Map,
              isOnLoadPreset: !1,
              isFirstTime: !0,
              curPresetId: null,
              isDestroy: !1,
              galleryUUID: "",
              loadingEl: null,
              reminderPresetSelectIndex: 0,
              myPresetSelectIndex: 0,
              recommendPaletteSelectIndex: -1,
              histogramData: {},
              needRefreshOptStatus: !0,
              iBatchUpdateListener: null,
              createScene: ne["a"].batchRetouch,
              hanlderExportClick: null,
              editCount: 0,
              selectionImageType: te["c"].Jpeg,
              needCreateMainFragment: !1,
              canDestroy: !1,
              isShowingImportDialog: !1
            }
          },
          watch: {
            $route() {}
          },
          computed: {
            ...Object(l["c"])(["oriPreset"]),
            ...Object(l["c"])("project", ["activeProject", "activeProjectId"]),
            ...Object(l["c"])("thumbnail", ["getThumbnails", "getSelectedImgIndex", "updateTime"]),
            listViewHeight() {
              let e = Object(r["i"])();
              return e = e - 56 - 50 + "px", e
            },
            recommendPreItems() {
              let e = 8,
                t = this.$store.state.presetting.recommendPreItems,
                a = this.$store.state.presetting.oriPreset;
              t = [a].concat(t);
              let i = [],
                s = [],
                n = 0;
              for (let l of t) {
                let t = n % e === 0;
                t && (s = [], i.push(s)), s.push(l), n++
              }
              return i
            },
            myPreItems() {
              let e = 12,
                t = this.$store.state.presetting.preItems,
                a = [],
                i = [],
                s = 0;
              for (let n of t) {
                let t = s % e === 0;
                t && (i = [], a.push(i)), i.push(n), s++
              }
              return a
            },
            myRecommendSelectIndex() {
              return this.reminderPresetSelectIndex
            },
            myCurPresetSelectIndex() {
              return this.myPresetSelectIndex
            },
            myRecommendPaletteSelectIndex() {
              return this.recommendPaletteSelectIndex
            }
          },
          methods: {
            ...Object(l["b"])(["loadRecommendItemsIfNeed", "loadAllPresents", "deleteThumbnail", "deletePreset", "getThumbnailByIndex"]),
            ...Object(l["d"])("thumbnail", ["_SetSelectedImgIndex", "_SetActiveThumbnail", "_SetUpdateTime"]),
            ...Object(l["b"])("thumbnail", ["ACT_UpdateThumbnail", "ACT_UpdateThumbnailByKey", "ACT_DeleteThumbnail", "ACT_GetThumbnails", "ACT_BatchUpdateThumbnailByKey"]),
            ...Object(l["b"])("presetSuit", ["ACT_IncreasePalettePreset", "ACT_BatchUpdatePalettePreset", "ACT_BatchCopyPaletteToSelf", "ACT_GetPalettePreset"]),
            ...Object(l["d"])("project", ["_SetLastProjectUpdateTime", "_SetEntryProjectCache"]),
            ...Object(l["d"])(["updateExportEffectCfg"]),
            thumbnailRef() {
              return this.$refs.thumbViewRef
            },
            onEchartDataUpdate(e, t, a) {
              this.$tsStat.event("cake_gallery", {
                cake_operate: "select_one"
              }), console.log("==> onEchartDataUpdate", e, t, a), this.histogramData = {
                chartData: {
                  ...e
                },
                imageInfo: {
                  ...t
                }
              }
            },
            onCommandLeftMouseClick(e) {},
            async loadImages() {
              try {
                const {
                  id: e,
                  name: t
                } = this.activeProject;
                let a = {
                    isInGallery: !0,
                    projectId: e,
                    leftListPadding: {
                      right: this.lrEdgePadding,
                      top: 0,
                      left: this.lrEdgePadding,
                      bottom: 0
                    },
                    leftListMargin: {
                      right: 300,
                      top: 48,
                      left: 0,
                      bottom: 50
                    }
                  },
                  i = {};
                i = this.needCreateMainFragment ? await le["a"].send("on-main-fragment-mount", {
                  gallery: a,
                  tab: "batchRetouch"
                }) : await he["a"].showGalleryFragment(a), this.galleryUUID = i.galleryUUID, this.updateExportEffectCfg({
                  isFromRefineTab: !1,
                  refineOrGalleryUUID: this.galleryUUID
                });
                const s = [te["g"].NoEffect, te["g"].UnSet].includes(i.presetSuitId) ? i.presetSuitId : i.lastPresetSuitId;
                s && this.findPresetSuitIndex(s), this.canDestroy = !0
              } catch (e) {
                console.error("==> loadImages", e), this.canDestroy = !0
              }
            },
            async loadPresetEffectCfg(e) {
              this.curPresetId = e.id;
              let t = {
                presetSuitId: e.id,
                presetId: e.beautifyPresetId,
                palettePresetId: e.palettePresetId
              };
              const a = await he["a"].loadPresetEffectCfg(this.galleryUUID, t);
              a && (e.paletteModel || (e.paletteModel = await this.ACT_GetPalettePreset(e.palettePresetId || -1)))
            },
            applyEffect(e = !0) {
              he["a"].refreshView(this.galleryUUID, e, !0)
            },
            showLoading() {
              he["a"].showVisibleLoading(this.galleryUUID, !0)
            },
            makeOptStatusChanged() {
              this.needRefreshOptStatus && he["a"].makeOptStatusChanged(this.galleryUUID)
            },
            onAddPresettingClick(e) {
              let t = o["a"].shareInstance().imageViewModelQueue;
              if (null == t || 0 == t.size) return void this.$router.push({
                path: "photoFinishing",
                query: {}
              });
              let a = Array.from(t);
              a = a.sort((function(e, t) {
                return e[1].imgIndex - t[1].imgIndex
              }));
              let i = null;
              for (const l of a)
                if (l[1].isSelected) {
                  i = l[1];
                  break
                } null == i && (i = a[0][1]);
              let s = i.presetModel,
                n = new c["e"];
              n.userId = this.$store.state.user.userId, n.projectId = this.activeProjectId, n.originalImagePath = i.imgPath, this.routerPushPhotoFinishing(n, s, i.imgIndex)
            },
            async onPresetClick(e, t) {
              const a = e[0];
              console.log(a, 88888), console.log("==> onPresetClick", a), a.version && a.version > Y["h"] ? this.tsConfirm({
                title: "Hệ thống nhắc",
                message: "Bạn cần để nâng cấp phiên bản mới nhất để sử dụng các sẵn Oh~",
                showCancelButton: !1
              }).then(e => {}).catch(e => {}) : (this.isOnLoadPreset = !0, await ue["a"].cancelAllProcess(), await this.loadPresetEffectCfg(a), this.showLoading(), this.makeOptStatusChanged(), this.applyEffect(!0), this.isOnLoadPreset = !1, a.classifyType === te["f"].System ? (this.reminderPresetSelectIndex = a.id, this.myPresetSelectIndex = 0) : (this.reminderPresetSelectIndex = 0, this.myPresetSelectIndex = a.id))
            },
            onReminderPreItemClick(e) {
              this._SetUpdateTime(new Date), this.reminderPresetSelectIndex = e[0].id, this.onPresetClick(e, "reminder")
            },
            onMyPreItemClick(e) {
              this._SetUpdateTime(new Date), this.$tsStat.event("cake_gallery", {
                cake_operate: "click_my_preset",
                cake_id: e[0].id
              }), this.myPresetSelectIndex = e[0].id, this.onPresetClick(e)
            },
            async onStarClick(e) {
              this.PointAddStar(e), this._SetLastProjectUpdateTime(new Date)
            },
            async onItemRotated(e) {
              this.$tsStat.event("cake_gallery", {
                cake_operate: "rotate"
              }), this._SetLastProjectUpdateTime(new Date)
            },
            async onThumbItemDoubleClick(e) {
              let t = e[0],
                a = await t.thumbnailModel.getPresetModel(this.$store),
                i = new c["e"];
              i.userId = this.$store.state.user.userId, i.projectId = this.activeProjectId, i.originalImagePath = t.imgPath, this.routerPushPhotoFinishing(i, a, t.imgIndex)
            },
            async onSelectedAllClick() {
              this.isSelectedAll = !this.isSelectedAll, this.isSelectedAll ? this.$tsStat.event("cake_gallery", {
                cake_operate: "select_all"
              }) : this.$tsStat.event("cake_gallery", {
                cake_operate: "unselect_all"
              }), await he["a"].onSelectAll(this.galleryUUID, this.isSelectedAll)
            },
            onHandleEmptytedThumbnail() {
              this.$router.push({
                path: "importImage",
                params: null
              })
            },
            onSelectionChangedCallback(e, t, a) {
              if (console.log(`onSelectionChangedCallback,important.index = ${e},firstSelectedItem.index = ${t&&t.imgIndex}`), !e) return this.reminderPresetSelectIndex = 0, void(this.myPresetSelectIndex = 0);
              const i = [te["g"].NoEffect, te["g"].UnSet].includes(a.presetSuitId) ? a.presetSuitId : a.lastPresetSuitId;
              this.findPresetSuitIndex(i), this.selectionImageType = e.imgFormat
            },
            onRecvThumbnailExtraInfo(e) {
              let t = {};
              e.hisData && (t = {
                red: e.hisData.red ? Object(r["m"])(e.hisData.red) : [],
                green: e.hisData.green ? Object(r["m"])(e.hisData.green) : [],
                blue: e.hisData.blue ? Object(r["m"])(e.hisData.blue) : []
              }), this.onEchartDataUpdate(t || {}, e.exifInfo, null)
            },
            onEditedCount(e, t) {
              this.editCount = e, this.totalCount = t
            },
            findPresetSuitIndex(e) {
              if (this.$refs["paletteViewRef"].handleSetCheckedNodes(e), this.reminderPresetSelectIndex = 0, this.myPresetSelectIndex = 0, null == e || void 0 == e) return;
              let t = this.$store.state.presetting.recommendPreItems,
                a = this.$store.state.presetting.oriPreset;
              t = [a].concat(t);
              let i = -1,
                s = -1;
              for (const l of t)
                if (s++, e == l.id) {
                  i = s;
                  break
                } if (i >= 0) return this.reminderPresetSelectIndex = e, void(this.myPresetSelectIndex = 0);
              t = this.$store.state.presetting.preItems, s = -1;
              let n = -1;
              for (const l of t)
                if (s++, e == l.id) {
                  n = s;
                  break
                } this.myPresetSelectIndex = e, this.reminderPresetSelectIndex = 0
            },
            async onSelectFavouriteClick() {
              this.isSelectedFavourite = !this.isSelectedFavourite, this.isSelectedFavourite ? this.$tsStat.event("cake_gallery", {
                cake_operate: "select_star"
              }) : this.$tsStat.event("cake_gallery", {
                cake_operate: "unselect_star"
              }), await he["a"].onSelectFavorites(this.galleryUUID, this.isSelectedFavourite)
            },
            onListStyleChanged(e) {
              this.changeListStyle(e);
              const t = "2" == e ? "click_one_view" : "click_multiple_views";
              this.$tsStat.event("cake_gallery", {
                cake_operate: t
              })
            },
            changeListStyle(e) {
              "2" == e ? he["a"].changeListStyle(this.galleryUUID, !1) : he["a"].changeListStyle(this.galleryUUID, !0)
            },
            listenWhenAppQuit() {
              le["a"].on("onAppQuit", (e, t) => {
                this.tsConfirm({
                  title: "Hệ thống nhắc",
                  message: "有效果正在应用中，请不要退出",
                  showCancelButton: !1
                }).then(e => {})
              })
            },
            routerPushPhotoFinishing(e, t, a) {
              this.isDestroy = !0;
              let i = this.thumbnailRef();
              i && i.onEntryPhotoFinishingView(), o["a"].shareInstance().cancellAllLoad(), o["a"].shareInstance().cancellAllProcess(), this._SetActiveThumbnail({
                imgPath: e.originalImagePath,
                imgIndex: a
              }), this.$router.push({
                path: "photoFinishing",
                query: {}
              })
            },
            registerExportClickListener() {
              this.hanlderExportClick = (e, t) => {
                he["a"].onHandlerExportClick(this.galleryUUID)
              }, g["a"].$on("onExportClick", this.hanlderExportClick)
            },
            notifySelectedIndexChanged() {},
            logGaEvent(e) {
              let t = null,
                a = {
                  EnhanceEditColorTemperature: "temp",
                  EnhanceEditHue: "tone",
                  EnhanceEditExposure: "exposure",
                  EnhanceEditContrast: "contrast",
                  EnhanceEditHighlight: "highlight",
                  EnhanceEditShadow: "shadow",
                  EnhanceEditWhite: "white",
                  EnhanceEditBlack: "black",
                  EnhanceEditCameraRawSharpen: "clarity",
                  EnhanceEditSaturation: "vividness"
                };
              t = a[e.key], this.$tsStat.event("cake_gallery", {
                cake_operate: "click_color_button",
                cake_feature: t
              })
            },
            async onStepChange(e, t) {
              this._SetUpdateTime(new Date), this.$refs["paletteViewRef"].handleSetCheckedNodes(0), this.logGaEvent(e[2]), this.notifySelectedIndexChanged(), this.reminderPresetSelectIndex = 0, this.myPresetSelectIndex = 0;
              let [a, i, s, n] = e, l = (o["a"].shareInstance().imageIoQueue, o["a"].shareInstance().imageViewModelQueue), r = a, c = i ? s.doubleRatio : s.singleRatio;
              r = c * a * n;
              let h = [],
                d = [],
                u = [];
              const m = new Map;
              for (let o of l) {
                let e = o[1],
                  t = o[0];
                if (e && e.isSelected) {
                  const {
                    presetSuitId: a,
                    palettePresetId: i
                  } = e.thumbnailModel;
                  if (a !== te["g"].UnSet) {
                    if (m.has(a)) {
                      const e = m.get(a);
                      e.push(i), m.set(a, e)
                    } else m.set(a, [i]);
                    e.thumbnailModel.presetSuitId = te["g"].UnSet, d.push(e.thumbnailModel.id)
                  }
                  e.hasNewerCache = !1, e.setIsWaitImageData(!0), e.thumbnailModel && i ? (h.push(i), u.push(t)) : console.error("palettePresetId is null ")
                }
              }
              if (m.size > 0 && await this.ACT_BatchCopyPaletteToSelf(m), this.showLoading(), h && h.length > 0) {
                let e = ee["b"][s.key],
                  t = Z["a"].initKeyMap().get(e);
                this.ACT_IncreasePalettePreset({
                  paletteIds: h,
                  dbKey: t,
                  nextStep: r,
                  viewModelKeys: u
                })
              }
              d && d.length > 0 && this.ACT_BatchUpdateThumbnailByKey({
                ids: d,
                updateKeys: ["presetSuitId"],
                data: {
                  presetSuitId: te["g"].UnSet
                }
              }), this.updatePaletteAndRefresh(!0, !1), this.makeOptStatusChanged()
            },
            async onResetPaletteCallback(e) {
              this._SetUpdateTime(new Date);
              let t = o["a"].shareInstance().imageViewModelQueue,
                a = o["a"].shareInstance().imageIoQueue;
              if (0 === t.size) return;
              const i = new Map,
                s = [],
                n = [];
              let l = [];
              for (let o of t) {
                let e = o[1],
                  t = o[0];
                a.get(t);
                if (e && e.isSelected) {
                  e.hasNewerCache = !1, e.setIsWaitImageData(!0);
                  const {
                    presetSuitId: a,
                    palettePresetId: r
                  } = e.thumbnailModel;
                  if (a !== te["g"].UnSet) {
                    if (i.has(a)) {
                      const e = i.get(a);
                      e.push(r), i.set(a, e)
                    } else i.set(a, [r]);
                    e.thumbnailModel.presetSuitId = te["g"].UnSet, s.push(e.thumbnailModel.id)
                  }
                  l.push(t), n.push(r)
                }
              }
              i.size > 0 && await this.ACT_BatchCopyPaletteToSelf(i), s && s.length > 0 && this.ACT_BatchUpdateThumbnailByKey({
                ids: s,
                updateKeys: ["presetSuitId"],
                data: {
                  presetSuitId: te["g"].UnSet
                }
              });
              const r = new PaletteParamsViewModel({}),
                c = await this.ACT_GetPalettePreset("-1");
              r.bindCfgModel(c);
              const h = r.resetParams(e.map(e => null != e.alias ? e.alias : e.key));
              this.ACT_BatchUpdatePalettePreset({
                ids: n,
                data: h,
                keys: l
              }), this.reminderPresetSelectIndex = 0, this.myPresetSelectIndex = 0, this.showLoading(), this.updatePaletteAndRefresh(!0, !1), this.makeOptStatusChanged()
            },
            async updatePaletteAndRefresh(e, t = !0) {
              let a = o["a"].shareInstance().imageViewModelQueue,
                i = o["a"].shareInstance().imageIoQueue;
              for (let s of a) {
                let t = s[1],
                  a = s[0];
                if (t && t.isSelected) {
                  if (t.isRawImage() && !t.isSetWbICCAndWbTint()) continue;
                  if (e && t.isVisible && t.isSelected) {
                    let e = i.get(a);
                    e && e.cancelProcess()
                  }
                }
              }
              t && this.applyEffect(e)
            },
            async importFromFile(e) {
              if (console.log("二次从Tập tin的导入:"), this.isShowingImportDialog) return;
              this.isShowingImportDialog = !0;
              const t = de["i"],
                a = await t.showOpenDialog({
                  properties: e,
                  filters: [{
                    name: "Images",
                    extensions: this.supportedExtendNames()
                  }]
                });
              if (a && a.filePaths && 0 == a.filePaths.length) return void(this.isShowingImportDialog = !1);
              const i = await this.hasReadWritePermission(a.filePaths);
              i.result == p["a"].OK && await this.secondImportFiles(a.filePaths), this.isShowingImportDialog = !1
            },
            async secondImportFiles(e) {
              const t = await this.hasReadWritePermission(e);
              t.result === p["a"].OK ? (await this.checkAndImportImages(e, !0, e => {
                he["a"].handlerAfterSecondImport(this.galleryUUID), this.tsNotify({
                  message: `Nhập khẩu${e}Ảnh`
                })
              }, e => {
                e.status === J["b"].Start && (this.showImportProgress = !0), this.importProgress = e
              }), this._SetLastProjectUpdateTime(new Date)) : this.toastNoReadWritePermission(t)
            },
            async onDropHanlder(e) {
              let t = this.getDropPaths(),
                a = [];
              for (let i of t) {
                let e = i.path;
                a.push(e)
              }
              await this.secondImportFiles(a)
            },
            setNeedCreateMainFragmentTag(e, t) {
              "index" == e.name || "importImage" == e.name ? this.needCreateMainFragment = !0 : this.needCreateMainFragment = !1
            },
            async doWhenLeave(e, t) {
              let a;
              console.log("doWhenLeave from : " + e.name, " to : " + t.name), "index" == t.name || "Login" == t.name ? (a = await he["a"].hideGalleryFragment(this.galleryUUID), await le["a"].send("on-main-fragment-unmount", {})) : a = await he["a"].hideGalleryFragment(this.galleryUUID), console.log("doWhenLeave result " + JSON.stringify(a))
            }
          },
          beforeCreate() {},
          beforeRouteEnter(e, t, a) {
            a(a => {
              a._SetEntryProjectCache(e.name), a.setNeedCreateMainFragmentTag(t, e)
            })
          },
          async beforeRouteLeave(e, t, a) {
            this.canDestroy ? (await this.doWhenLeave(t, e), this.isFirstTime = !0, this.isOnLoadPreset ? this.tsConfirm({
              title: "Hệ thống nhắc",
              message: "有效果正在应用中，请不要退出",
              showCancelButton: !1
            }).then(e => {
              a()
            }) : a()) : console.log("not load view finish")
          },
          async mounted() {
            this.canDestroy = !1, he["a"].addListener("signalSelects", e => {
              let {
                isSelectedAll: t,
                hasSelectedFavorites: a
              } = e;
              this.isSelectedAll = t, this.isSelectedFavourite = a
            }), he["a"].addListener("signalSelectionChanged", this.onSelectionChangedCallback), he["a"].addListener("signalClearGallery", this.onHandleEmptytedThumbnail), he["a"].addListener("signalStarClick", this.onStarClick), he["a"].addListener("signalEditedCount", this.onEditedCount), he["a"].addListener("signalRotate", this.onItemRotated), he["a"].addListener("signalThumbnailExtraInfo", this.onRecvThumbnailExtraInfo), se["a"].shareInstance().addObject(this), this.$route.query.imageFilePaths && this.$route.query.imageFilePaths.length > 0 && !0 === this.$route.query.isfromHome && this.tsNotify({
              message: `Nhập khẩu${this.$route.query.imageFilePaths.length}Ảnh`
            }), g["a"].$on("onNavImportImage", Object(h["debounce"])(async e => {
              ae["a"].getInstance().unRegisterShortcut(), await this.importFromFile(e), ae["a"].getInstance().registerShortcut()
            }, 20)), g["a"].$on("onManualImportClick", Object(h["debounce"])(async e => {
              await this.onManualImportClick(e)
            }, 20)), g["a"].$on("initloadBatchRetouch", Object(h["debounce"])(() => {
              this.isFirstTime = !0, this.loadImages()
            }, 20)), this.isFirstTime = !0;
            let e = this.$store.state.user.userId;
            this.loadAllPresents({
              userId: e
            }).then(e => {}).catch(e => {
              this.tsNotify({
                type: "error",
                message: e.message
              })
            });
            try {
              await this.loadImages()
            } catch (a) {
              console.error("==> loadImages", a)
            }
            let t = this.getSelectedImgIndex;
            t && (t = Math.ceil(t / this.columns), this._SetSelectedImgIndex(null))
          },
          beforeDestroy() {
            this.isDestroy = !0, this.hanlderExportClick && g["a"].$off("onExportClick", this.hanlderExportClick), g["a"].$off("onNavImportImage", null), g["a"].$off("initloadBatchRetouch", null), g["a"].$off("onManualImportClick", null), he["a"].removeListener("signalSelects"), he["a"].removeListener("signalSelectionChanged"), he["a"].removeListener("signalClearGallery"), he["a"].removeListener("signalStarClick"), he["a"].removeListener("signalEditedCount"), he["a"].removeListener("signalRotate"), he["a"].removeListener("signalOnDropStart"), he["a"].removeListener("signalThumbnailExtraInfo")
          }
        }),
        pe = me,
        ge = (a("30c2"), Object(L["a"])(pe, i, s, !1, null, "4b4eafab", null));
      t["default"] = ge.exports
    },
    8063: function(e, t, a) {
      "use strict";
      a("333c")
    },
    c35f: function(e, t, a) {
      "use strict";
      a("db00")
    },
    d959: function(e, t, a) {},
    db00: function(e, t, a) {}
  }
]);
//# sourceMappingURL=chunk-6b7f39ea.ca2e1109.js.map