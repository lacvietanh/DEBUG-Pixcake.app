(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-79719501"], {
    "1e52": function(t, e, s) {},
    "1ee7": function(t, e, s) {
      "use strict";
      s("bace")
    },
    "273d": function(t, e, s) {
      "use strict";
      s("ff5c")
    },
    "410d": function(t, e, s) {
      "use strict";
      s("8893")
    },
    "56ea": function(t, e, s) {
      "use strict";
      s("afc3")
    },
    "64dc": function(t, e, s) {
      "use strict";
      s("1e52")
    },
    "6b17": function(t, e, s) {},
    "7bf9": function(t, e, s) {
      "use strict";
      s("fd9d")
    },
    8893: function(t, e, s) {},
    a130: function(t, e, s) {
      "use strict";
      s("6b17")
    },
    a899: function(t, e, s) {},
    afc3: function(t, e, s) {},
    b9f0: function(t, e, s) {
      "use strict";
      s.r(e);
      var a = function() {
          var t = this,
            e = t._self._c,
            s = t._self._setupProxy;
          return e("div", {
            staticClass: "export-list-index"
          }, [e(s.ElHeader, {
            staticClass: "header border-style"
          }, [
            [e("div", {
              staticClass: "header-container"
            }, [e("div", {
              staticClass: "fixed-left-title"
            }, [t._v(" " + t._s(t.$t("pageExport.title")) + " "), s.showExportCalcRule ? [e(s.ElTooltip, {
              staticStyle: {
                position: "absolute",
                left: "70px",
                top: "-3px"
              },
              attrs: {
                placement: "bottom-start",
                effect: "dark"
              }
            }, [e("i", {
              staticClass: "ts-icon ts-icon-question-outside",
              staticStyle: {
                "background-size": "16px",
                width: "30px",
                height: "30px"
              },
              on: {
                mouseenter: s.PointExportListBillingRulesPopup
              }
            }), e("div", {
              attrs: {
                slot: "content"
              },
              slot: "content"
            }, [e("span", [t._v("导出计费规则：")]), e("br"), e("span", [t._v("1. 按照成功导出的张数计费（导出失败不计费）")]), e("br"), e("span", [t._v("2. 同一图片多次导出只计费一次（若该图重新"), e("br"), e("pre", [t._v("  拖入软件则会重新计费）")])]), e("span", [t._v("3. 原图导出不计费")]), e("br")])])] : t._e()], 2), e("div", {
              staticClass: "group-title"
            }, [e("el-radio-group", {
              staticClass: "group-btn",
              attrs: {
                size: "mini",
                fill: "#1E1E1E",
                "text-color": "#EECC28",
                hidefocus: !0,
                value: s.currGroupTitle
              }
            }, [t._l(s.groupList, (function(t, a) {
              return [e("el-radio-button", {
                directives: [{
                  name: "gtag-event",
                  rawName: "v-gtag-event",
                  value: t.point,
                  expression: "gl.point"
                }],
                key: a,
                attrs: {
                  label: t.name
                },
                nativeOn: {
                  click: function(e) {
                    return s.changeExportView(t)
                  }
                }
              })]
            }))], 2)], 1), e("div", {
              staticClass: "fixed-right-btn"
            }, [s.exportMenu && s.exportMenu.show ? [e(s.ElButton, {
              staticClass: "btn-text",
              attrs: {
                type: "text",
                size: "mini"
              },
              on: {
                click: function(t) {
                  s.exportMenu.openLink(), s.PointClickExportDetail()
                }
              }
            }, [t._v(" " + t._s(s.exportMenu.name) + " ")])] : t._e()], 2)])]
          ], 2), e(s.ExportTable)], 1)
        },
        i = [],
        o = s("2b0e"),
        n = s("0613"),
        l = s("2ef0"),
        r = s("25c2"),
        c = s("bdb8"),
        u = s("5c96"),
        p = (s("caad"), function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "export-list"
          }, [t.showStartOrPauseClick ? e("div", {
            staticClass: "all-opt-container"
          }, [e("el-button", {
            staticClass: "onPauseAllOptBtn",
            attrs: {
              disabled: !t.showPauseAllBtn,
              size: "mini"
            },
            nativeOn: {
              click: function(e) {
                return e.stopPropagation(), t.onPauseAllBtnClick.apply(null, arguments)
              }
            }
          }, [t._v(" 全部暂停 ")]), e("el-button", {
            staticClass: "onStartAllOptBtn",
            attrs: {
              disabled: !t.showStartAllBtn,
              size: "mini"
            },
            nativeOn: {
              click: function(e) {
                return e.stopPropagation(), t.onStartAllBtnClick.apply(null, arguments)
              }
            }
          }, [t._v(" 全部Mở始 ")])], 1) : t._e(), t._m(0), t.tableList.length > 0 ? e("DynamicScroller", {
            class: [t.isOnExportingBtn ? "dir-un-complete-container" : "dir-container"],
            attrs: {
              "min-item-size": 50,
              items: t.tableList
            },
            scopedSlots: t._u([{
              key: "default",
              fn: function({
                item: a,
                index: i,
                active: o
              }) {
                return [e("DynamicScrollerItem", {
                  attrs: {
                    "data-index": i,
                    "data-active": o,
                    active: o,
                    item: a
                  }
                }, [e("div", {
                  staticClass: "dir-item"
                }, [e("el-collapse", {
                  on: {
                    change: function(e) {
                      return t.handleChangeCollapse(a)
                    }
                  },
                  model: {
                    value: t.activeNames,
                    callback: function(e) {
                      t.activeNames = e
                    },
                    expression: "activeNames"
                  }
                }, [e("el-collapse-item", {
                  attrs: {
                    disabled: null === t.exportErrMap.get(a.id),
                    name: a.id
                  }
                }, [e("template", {
                  slot: "title"
                }, [e("div", {
                  staticClass: "tr tbody"
                }, [e("div", {
                  staticClass: "td td-name",
                  attrs: {
                    title: a.name,
                    alt: a.name
                  }
                }, [e("div", {
                  staticClass: "name"
                }, [e("img", {
                  staticClass: "folder-icon folder-icon-close",
                  attrs: {
                    alt: "Tập tin夹",
                    src: s("db2c")
                  }
                }), e("img", {
                  staticClass: "folder-icon folder-icon-open",
                  attrs: {
                    alt: "Tập tin夹",
                    src: s("1b88")
                  }
                }), e("span", [t._v(" " + t._s(a.name))])])]), e("div", {
                  staticClass: "td td-progress"
                }, [e("div", {
                  staticClass: "progress-bar"
                }, [e("el-progress", {
                  attrs: {
                    "show-text": !1,
                    percentage: parseInt(a.progress)
                  }
                }), ([0, 1].includes(a.exportStatus), e("span", {
                  staticClass: "progress-info"
                }, [t._v(" 共" + t._s(a.exportTotalNum) + "张 ")]))], 1), e("div", {
                  staticClass: "progress-status"
                }, [
                  [0, 1].includes(a.exportStatus) ? [a.isPauseStatus || a.isFundsLackStatus ? e("span", [t._v("已暂停")]) : a.isStartExport ? e("span", [t._v(t._s(a.progress) + "%")]) : e("span", [t._v("等待中...")])] : [3, 4].includes(a.shareStatus) ? [e("img", {
                    staticClass: "el-icon-success icon icon-success",
                    attrs: {
                      src: s("4eef"),
                      alt: ""
                    }
                  })] : 3 === a.exportStatus ? [t.needShowRetry(a.id) ? e("img", {
                    staticClass: "el-icon-success icon icon-success",
                    attrs: {
                      src: s("c28f"),
                      alt: ""
                    }
                  }) : e("img", {
                    staticClass: "el-icon-success icon icon-success",
                    attrs: {
                      src: s("261e"),
                      alt: ""
                    }
                  })] : 2 === a.exportStatus ? [e("img", {
                    staticClass: "el-icon-success icon icon-success",
                    attrs: {
                      src: s("fbd1"),
                      alt: ""
                    }
                  })] : t._e()
                ], 2)]), e("div", {
                  staticClass: "td td-opt-container"
                }, [
                  [0, 1].includes(a.exportStatus) ? [a.isPauseStatus || a.isFundsLackStatus ? [e("el-tooltip", {
                    staticClass: "item",
                    attrs: {
                      effect: "light",
                      placement: "bottom",
                      "visible-arrow": !1,
                      "popper-class": "hoverContent_icon"
                    }
                  }, [e("div", {
                    attrs: {
                      slot: "content"
                    },
                    slot: "content"
                  }, [t._v("Mở始")]), e("el-button", {
                    staticClass: "custom-btn",
                    attrs: {
                      type: "text",
                      disabled: t.isBusyStatus
                    },
                    nativeOn: {
                      click: function(e) {
                        return e.stopPropagation(), t.startExport(a)
                      }
                    }
                  }, [e("img", {
                    staticClass: "icon-opt",
                    attrs: {
                      src: s("ffde"),
                      alt: "Mở始"
                    }
                  })])], 1)] : [e("el-tooltip", {
                    staticClass: "item",
                    attrs: {
                      effect: "light",
                      placement: "bottom",
                      "visible-arrow": !1,
                      "popper-class": "hoverContent_icon"
                    }
                  }, [e("div", {
                    attrs: {
                      slot: "content"
                    },
                    slot: "content"
                  }, [t._v("暂停")]), e("el-button", {
                    staticClass: "custom-btn",
                    attrs: {
                      type: "text",
                      disabled: t.isBusyStatus
                    },
                    nativeOn: {
                      click: function(e) {
                        return e.stopPropagation(), t.pauseExport(a)
                      }
                    }
                  }, [e("img", {
                    staticClass: "icon-opt",
                    attrs: {
                      src: s("2448"),
                      alt: "暂停"
                    }
                  })])], 1)]] : 2 === a.exportStatus ? [e("el-button", {
                    staticClass: "custom-btn",
                    attrs: {
                      type: "text",
                      title: "重试",
                      disabled: t.isBusyStatus
                    },
                    nativeOn: {
                      click: function(e) {
                        return e.stopPropagation(), t.retry(a)
                      }
                    }
                  }, [e("img", {
                    staticClass: "icon-opt",
                    attrs: {
                      src: s("e6bc"),
                      alt: "重试"
                    }
                  })])] : 3 === a.exportStatus ? [
                    [0, 2, 3, 4].includes(a.shareStatus) ? [2 === a.shareStatus && a.shareLink ? [e("el-button", {
                      staticClass: "custom-btn",
                      attrs: {
                        type: "text",
                        title: "查看分享链接"
                      },
                      nativeOn: {
                        click: function(e) {
                          return e.stopPropagation(), t.onShareClick(a, i)
                        }
                      }
                    }, [e("img", {
                      staticClass: "icon-opt",
                      attrs: {
                        src: s("7cd8"),
                        alt: "查看分享链接"
                      }
                    })])] : [t.needShowRetry(a.id) ? [e("el-button", {
                      staticClass: "custom-btn",
                      attrs: {
                        type: "text",
                        title: "重试",
                        disabled: t.isBusyStatus
                      },
                      nativeOn: {
                        click: function(e) {
                          return e.stopPropagation(), t.retry(a)
                        }
                      }
                    }, [e("img", {
                      staticClass: "icon-opt",
                      attrs: {
                        src: s("e6bc"),
                        alt: "重试"
                      }
                    })])] : [e("el-tooltip", {
                      staticClass: "item",
                      attrs: {
                        effect: "light",
                        placement: "bottom",
                        "visible-arrow": !1,
                        "popper-class": "hoverContent_icon"
                      }
                    }, [e("div", {
                      attrs: {
                        slot: "content"
                      },
                      slot: "content"
                    }, [t._v("分享")]), !1 === t.$IS_CLIENT_PIX_PIE && 0 == t.$IS_CLIENT_PixCake_EXPO ? e("el-button", {
                      staticClass: "custom-btn",
                      attrs: {
                        type: "text"
                      },
                      nativeOn: {
                        click: function(e) {
                          return e.stopPropagation(), t.onShareClick(a, i)
                        }
                      }
                    }, [e("img", {
                      staticClass: "icon-opt",
                      attrs: {
                        src: s("c219"),
                        alt: "分享"
                      }
                    }), e("img", {
                      directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: [3, 4].includes(a.shareStatus),
                        expression: "[3, 4].includes(item.shareStatus)"
                      }],
                      staticClass: "share-fail-icon",
                      attrs: {
                        src: s("4eef")
                      }
                    })]) : t._e()], 1)]]] : [e("el-progress", {
                      staticClass: "share-progress",
                      attrs: {
                        type: "circle",
                        percentage: a.shareProgress,
                        width: 15,
                        "stroke-width": 2,
                        "show-text": !1,
                        color: "#ffffff"
                      }
                    })]
                  ] : t._e(), e("el-tooltip", {
                    staticClass: "item",
                    attrs: {
                      effect: "light",
                      placement: "bottom",
                      "visible-arrow": !1,
                      "popper-class": "hoverContent_icon"
                    }
                  }, [e("div", {
                    attrs: {
                      slot: "content"
                    },
                    slot: "content"
                  }, [t._v("查看导出路径")]), e("el-button", {
                    staticClass: "custom-btn",
                    attrs: {
                      type: "text"
                    },
                    nativeOn: {
                      click: function(e) {
                        return e.stopPropagation(), t.openFolder(a.exportDirPath)
                      }
                    }
                  }, [e("img", {
                    staticClass: "icon-opt",
                    attrs: {
                      src: s("2d1b"),
                      alt: "查看导出路径"
                    }
                  })])], 1), e("el-tooltip", {
                    staticClass: "item",
                    attrs: {
                      effect: "light",
                      placement: "bottom",
                      "visible-arrow": !1,
                      "popper-class": "hoverContent_icon"
                    }
                  }, [e("div", {
                    attrs: {
                      slot: "content"
                    },
                    slot: "content"
                  }, [t._v("删除")]), e("el-button", {
                    staticClass: "custom-btn",
                    attrs: {
                      type: "text",
                      disabled: t.isBusyStatus
                    },
                    nativeOn: {
                      click: function(e) {
                        return e.stopPropagation(), t.deleteFolder(a)
                      }
                    }
                  }, [e("img", {
                    staticClass: "icon-opt",
                    attrs: {
                      src: s("01b4"),
                      alt: "删除"
                    }
                  })])], 1), e("el-tooltip", {
                    directives: [{
                      name: "show",
                      rawName: "v-show",
                      value: !t.isOnExportingBtn && t.IS_ALLOW_PHOTOSHOP_OPEN_PICTURE,
                      expression: "!isOnExportingBtn && IS_ALLOW_PHOTOSHOP_OPEN_PICTURE"
                    }],
                    staticClass: "item",
                    attrs: {
                      effect: "light",
                      placement: "bottom",
                      "visible-arrow": !1,
                      "popper-class": "hoverContent_icon"
                    }
                  }, [e("div", {
                    attrs: {
                      slot: "content"
                    },
                    slot: "content"
                  }, [t._v("通过PS预览")]), e("el-button", {
                    staticClass: "custom-btn",
                    attrs: {
                      type: "text"
                    },
                    nativeOn: {
                      click: function(e) {
                        return e.stopPropagation(), t.openPictureByPs(a)
                      }
                    }
                  }, [t._v(" PS ")])], 1)
                ], 2), e("div", {
                  staticClass: "td td-time"
                }, [t.$isDev || t.$isBeta ? [t._v(" " + t._s(t._f("moment")(a.createTime, "YYYY-MM-DD HH:mm:ss")) + " " + t._s(t.getCost(a)) + " ")] : [t._v(" " + t._s(t._f("moment")(a.createTime, "YYYY-MM-DD HH:mm:ss")) + " ")]], 2)])]), a.isExpand && null !== t.exportErrMap.get(a.id) ? t._l(t.exportErrMap.get(a.id), (function(a, i) {
                  return e("div", {
                    key: i
                  }, [e("div", {
                    staticClass: "error-info-container",
                    attrs: {
                      title: a.path,
                      alt: a.path
                    }
                  }, [e("div", {
                    staticClass: "error-name"
                  }, [e("img", {
                    staticClass: "error-icon-folder",
                    attrs: {
                      alt: "原图",
                      src: s("2153")
                    }
                  }), e("span", [t._v(t._s(t._f("filterFormatName")(a.path)))]), e("div", {
                    staticClass: "operation",
                    on: {
                      click: function(t) {
                        t.stopPropagation()
                      }
                    }
                  }, [
                    [e("el-button", {
                      staticClass: "custom-btn",
                      attrs: {
                        circle: "",
                        size: "mini",
                        title: "打Mở原图"
                      },
                      nativeOn: {
                        click: function(e) {
                          return e.stopPropagation(), t.openFile(a.path)
                        }
                      }
                    }, [e("img", {
                      staticClass: "folder-icon",
                      attrs: {
                        height: "8px",
                        alt: "打Mở原图",
                        src: s("6b2a")
                      }
                    })])]
                  ], 2)]), e("div", {
                    staticClass: "error-msg"
                  }, [e("span", [t._v(" " + t._s(t.exportErrorMapping(a)) + " ")]), 27 !== a.errorTag ? e("img", {
                    attrs: {
                      src: s("c28f"),
                      alt: ""
                    }
                  }) : t._e()]), e("div", {
                    staticClass: "error-empty"
                  }, [27 !== a.errorTag && 28 !== a.errorTag && 28 !== a.errorCode ? e("el-button", {
                    staticClass: "custom-btn",
                    attrs: {
                      type: "text",
                      title: "重试",
                      disabled: t.isBusyStatus
                    },
                    nativeOn: {
                      click: function(e) {
                        return e.stopPropagation(), t.retryExportItem(a, i)
                      }
                    }
                  }, [e("img", {
                    staticClass: "icon-opt",
                    attrs: {
                      src: s("e6bc"),
                      alt: "重试"
                    }
                  })]) : t._e()], 1), e("div", {
                    staticClass: "error-empty"
                  }, [
                    [t._v(" " + t._s(t._f("moment")(a.created_time, "YYYY-MM-DD HH:mm:ss")) + " ")]
                  ], 2)])])
                })) : t._e()], 2)], 1)], 1)])]
              }
            }], null, !1, 3990757090)
          }) : [e("div", {
            staticClass: "no-result"
          }, [e("img", {
            staticClass: "icon",
            attrs: {
              src: t.$getIconPath("list_icon_list_empty@3x.png", "common"),
              alt: ""
            }
          }), e("p", {
            staticClass: "text c-text-label"
          }, [t._v("暂Không có导出项目")])])], e("share-dialog", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.showShareSelectDialog,
              expression: "showShareSelectDialog"
            }]
          }), e("share-result-dialog", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.isShareResultDialog,
              expression: "isShareResultDialog"
            }]
          }), e("export-full-loading-dialog", {
            attrs: {
              content: t.fullLoadingContent
            },
            model: {
              value: t.fullscreenLoading,
              callback: function(e) {
                t.fullscreenLoading = e
              },
              expression: "fullscreenLoading"
            }
          })], 2)
        }),
        h = [function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "tr header"
          }, [e("div", {
            staticClass: "th th-name"
          }, [t._v(" 项目名称")]), e("div", {
            staticClass: "th th-progress"
          }, [t._v("导出进度条")]), e("div", {
            staticClass: "th th-share-link"
          }, [t._v("操作")]), e("div", {
            staticClass: "th th-time"
          }, [t._v("导出时间")])])
        }],
        d = (s("a899"), s("2f62")),
        g = function() {
          var t = this,
            e = t._self._c;
          t._self._setupProxy;
          return e("el-dialog", {
            attrs: {
              center: "",
              top: "30vh",
              width: "488px",
              visible: t.showShareSelectDialog,
              "before-close": t.handleClose,
              "close-on-click-modal": !1,
              "custom-class": "common-dialog cover-dialog more-btn share-select"
            },
            on: {
              "update:visible": function(e) {
                t.showShareSelectDialog = e
              }
            }
          }, [e("div", {
            staticClass: "title"
          }, [t._v("分享精修底片")]), t.exportShareList.length > 0 ? e("div", {
            staticClass: "container",
            style: `height: ${t.containerHeight}px`
          }, [t._l(t.exportShareList, (function(s, a) {
            return [e("ShareSelectItem", {
              key: a,
              ref: "shareSelectItem",
              refInFor: !0,
              attrs: {
                item: s
              },
              on: {
                onClickItem: function(e) {
                  return t.onClickItem(s)
                }
              }
            })]
          }))], 2) : t._e(), e("span", {
            staticClass: "select-numb"
          }, [t._v("已选" + t._s(t.selectCount) + "张")]), e("div", {
            staticClass: "dialog-footer",
            attrs: {
              slot: "footer"
            },
            slot: "footer"
          }, [e("div", {
            staticClass: "footer-container"
          }, [e("div", {
            staticClass: "select-all-container",
            on: {
              click: t.onSelectedAllClick
            }
          }, [t.isSelectAll ? [e("img", {
            staticClass: "select-all-icon",
            attrs: {
              src: t.$getIconPath("pop_icon_open@3x.png")
            }
          })] : [e("img", {
            staticClass: "select-all-icon",
            attrs: {
              src: t.$getIconPath("pop_icon_turn_off@3x.png")
            }
          })], e("span", [t._v("全选")])], 2), e("div", {
            staticClass: "footer-center-container"
          }), e("div", {
            staticClass: "footer-right-container"
          }, [e("el-button", {
            staticClass: "share-btn",
            attrs: {
              size: "mini",
              type: "primary",
              disabled: t.selectCount <= 0
            },
            on: {
              click: t.submit
            }
          }, [t._v(" 分享 ")])], 1)])])])
        },
        m = [],
        f = s("442f"),
        x = function() {
          var t = this,
            e = t._self._c;
          return e("RecycleScroller", {
            ref: "recycleViewRef",
            staticClass: "scroller list",
            attrs: {
              items: t.list,
              "item-size": t.myCloumHeight,
              emitUpdate: !0
            },
            on: {
              update: t.onUpdate
            },
            scopedSlots: t._u([{
              key: "default",
              fn: function({
                item: s
              }) {
                return [e("div", {
                  ref: "gridRows",
                  staticClass: "vue_recycle_cla_list",
                  style: {
                    height: t.myCloumHeight + "px",
                    "justify-content": t.myContentXaxisAlign,
                    paddingLeft: t.myLrPadding + "px",
                    paddingRight: t.myLrPadding + "px"
                  }
                }, [t._l(s.items, (function(e) {
                  return [t._t("default", null, {
                    item: e
                  })]
                }))], 2)]
              }
            }], null, !0)
          })
        },
        b = [],
        S = s("e508");
      o["default"].component("RecycleScroller", S["c"].RecycleScroller), o["default"].use(S["c"]);
      var v = {
          name: "tscollectionViewNew",
          data() {
            return {
              myContentXaxisAlign: "flex-start",
              rangeChangeIndex: [],
              myLrPadding: 0,
              lastStartIndex: 0,
              lastEndIndex: 0
            }
          },
          props: {
            list: Array,
            myCloumHeight: Number,
            padding: Number,
            column: Number,
            lrEdgePadding: Number,
            contentXaxisAlign: String
          },
          watch: {
            contentXaxisAlign: {
              handler: function(t, e) {
                t && (this.myContentXaxisAlign = t)
              },
              immediate: !0
            },
            lrEdgePadding: {
              handler: function(t, e) {
                t && (this.myLrPadding = t)
              },
              immediate: !0
            }
          },
          methods: {
            onUpdate: Object(l["debounce"])((function(t, e) {
              this.rangeChangeIndex = [t, e], console.log("startIndex: " + t + ", endIndex" + e);
              let s = Math.min(this.lastStartIndex, t),
                a = Math.max(this.lastEndIndex, e);
              for (let i = s; i <= a; i++) i >= t && i <= e ? this.setVisible(i, !0) : this.setVisible(i, !1);
              if (this.list[t] && this.list[e]) {
                let s = this.list[t].items[0].index - 1,
                  a = this.list[e].items.length - 1,
                  i = this.list[e].items[a].index;
                console.log(`tscollectionView, onUpdate:${s}-${i}`), this.$emit("onRangeChanged", [s, i, this.rangeChangeIndex])
              }
              console.log(`tscollectionView, onUpdateRowIndex:${t}-${e}`), this.lastStartIndex = t, this.lastEndIndex = e
            }), 10),
            setVisible(t, e) {
              if (null == this.list || 0 == this.list.length || this.list.length <= t) return;
              let s = this.list[t];
              null != s && null != s.items && 0 != s.items.length && s.items.forEach(t => {})
            },
            onVisible(t) {
              console.log("onVisible: " + t)
            },
            isItemInVisibleRect(t) {
              let e = t.firstElementChild,
                s = e.__vue__,
                a = s.data.index / this.column,
                [i, o] = this.rangeChangeIndex;
              return a >= i && a <= o
            },
            getCacheItems(t) {
              let e = (new Date).getTime(),
                s = document.getElementsByClassName("vue_recycle_cla_list"),
                a = [],
                i = [],
                o = null;
              s.forEach(e => {
                if (this.isItemInVisibleRect(e)) {
                  let t = e.childNodes;
                  t.forEach(t => {
                    i.push(t.__vue__)
                  })
                } else {
                  let t = e.childNodes;
                  t.forEach(t => {
                    a.push(t.__vue__)
                  })
                }
                o = t ? i : a
              });
              let n = (new Date).getTime(),
                l = (n - e) / 1e3;
              return console.log("tscollectionView getCacheItems...cost=" + l), o
            },
            getVisibleCellViewItem(t) {
              let e = this,
                s = e.getCacheItems(!0);
              if (s) {
                for (let e = 0; e < s.length; e++) {
                  let a = s[e];
                  if (a.data.imgPath == t.imgPath) return a
                }
                return null
              }
            }
          },
          mounted() {
            if (null == this.list || 0 == this.list.length) return;
            let t = this.list.length,
              e = 0,
              s = t - 1;
            if (this.list[e] && this.list[s]) {
              let t = this.list[e].items[0].index,
                a = this.list[s].items.length - 1,
                i = this.list[s].items[a].index;
              console.log(`tscollectionView, init :${t}-${i}`), this.$emit("onRangeChanged", [t, i, null]), this.lastStartIndex = e, this.lastEndIndex = s
            }
          }
        },
        C = v,
        y = (s("1ee7"), s("2877")),
        _ = Object(y["a"])(C, x, b, !1, null, "01a3e11d", null),
        w = _.exports,
        E = function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "item-container",
            on: {
              click: function(e) {
                return t.onClickItem(t.item)
              }
            }
          }, [t.finalImageData ? e("img", {
            staticClass: "template-suit-cover",
            attrs: {
              src: t.finalImageData
            }
          }) : e("div", {
            directives: [{
              name: "loading",
              rawName: "v-loading",
              value: !0,
              expression: "true"
            }],
            staticClass: "ts-loading-spinner"
          }), t.finalImageData ? [e("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.item.isSelectShare,
              expression: "item.isSelectShare"
            }],
            staticClass: "mask"
          }, [e("img", {
            staticClass: "export-select-icon",
            attrs: {
              src: t.$getIconPath("pop_icon_selected@3x.png")
            }
          })]), e("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !t.item.isSelectShare,
              expression: "!item.isSelectShare"
            }],
            staticClass: "mask"
          }, [e("img", {
            staticClass: "export-select-icon",
            attrs: {
              src: t.$getIconPath("pop_icon_unselected@3x.png")
            }
          })])] : t._e()], 2)
        },
        P = [],
        O = {
          name: "ShareSelectItem",
          data() {
            return {
              finalImageData: null
            }
          },
          props: {
            item: null
          },
          beforeDestroy() {
            this.finalImageData = null
          },
          methods: {
            loadImageData(t) {
              this.finalImageData = t
            },
            onClickItem(t) {
              this.$emit("onClickItem", t)
            }
          }
        },
        I = O,
        k = (s("273d"), Object(y["a"])(I, E, P, !1, null, "4fa0485a", null)),
        D = k.exports,
        L = s("6310"),
        T = s("29ea"),
        B = s("1209"),
        $ = Object(o["defineComponent"])({
          name: "ShareSelectDialog",
          mixins: [f["a"]],
          components: {
            "el-dialog": u["Dialog"],
            TScollectionView: w,
            ShareSelectItem: D
          },
          setup() {
            const {
              PointExportTable: t
            } = Object(c["a"])();
            return {
              PointExportTable: t
            }
          },
          data() {
            return {
              selectCount: 0,
              columns: 6,
              rowHeight: 74,
              maxThumbnailWidth: 74,
              isSelectAll: !1,
              containerHeight: 200
            }
          },
          computed: {
            exportShareList() {
              return this.$store.state.export.exportShareList
            },
            myMaxThumbnailWidth() {
              return this.maxThumbnailWidth
            },
            myCloumHeight() {
              return this.rowHeight
            },
            showShareSelectDialog() {
              return this.$store.state.export.showShareSelectDialog
            }
          },
          watch: {
            exportShareList: {
              handler(t) {
                t && 0 !== t.length && (this.containerHeight = 74 * Math.min(t.length, 3), this.onSelectedAllClick())
              },
              immediate: !0
            },
            showShareSelectDialog: {
              handler(t) {
                t && setTimeout(async () => {
                  let t = this.exportShareList;
                  for (let e = 0; e < t.length; e++) {
                    let s = t[e],
                      a = s.finalSavePath,
                      i = await T["a"].loadImageWithScale(a, 100, 100);
                    await Object(B["d"])(200);
                    let o = "data:image/jpeg;base64," + i.data,
                      n = this.$refs.shareSelectItem[e];
                    if (!n) break;
                    n.loadImageData(o)
                  }
                }, 500)
              }
            }
          },
          methods: {
            ...Object(d["d"])(["updateShowShareSelectDialog", "updateExportShareSelect"]),
            onClickItem(t) {
              let e = this.exportShareList,
                s = !e[t.index].isSelectShare;
              this.updateExportShareSelect({
                index: t.index,
                isSelect: s,
                exportItemId: t.exportItemId
              }), s ? (this.selectCount++, this.PointExportTable("share_popup_select")) : this.selectCount--, this.isSelectAll = this.selectCount == e.length
            },
            handleClose() {
              this.PointExportTable("share_popup_close"), this.isSelectAll = !1, this.selectCount = 0, this.updateShowShareSelectDialog(!1)
            },
            submit: Object(l["debounce"])((async function() {
              this.PointExportTable("share_popup_share");
              let t = await window.$net.isOnline();
              if (t) {
                if (this.tsNotify({
                    type: "error",
                    message: "分享链接生成中，请稍后"
                  }), this.selectCount > 0) {
                  this.selectCount = 0;
                  let t = this.$store.state.export.exportDirId;
                  L["b"].getExport().addShareTask(t), this.updateShowShareSelectDialog(!1)
                }
                this.isSelectAll = !1
              } else this.tsNotify({
                type: "error",
                message: "当前Không có网络，请检查网络。"
              })
            }), 300),
            onSelectedAllClick() {
              if (null === this.exportShareList) return;
              this.isSelectAll = !this.isSelectAll, this.isSelectAll ? this.PointExportTable("share_popup_select_all") : this.PointExportTable("share_popup_unselect_all");
              let t = this.exportShareList;
              console.log("isSelectAll", this.isSelectAll), t.forEach((t, e) => {
                this.updateExportShareSelect({
                  index: e,
                  isSelect: this.isSelectAll,
                  exportItemId: t.exportItemId
                })
              }), this.selectCount = this.isSelectAll ? t.length : 0
            }
          }
        }),
        N = $,
        A = (s("a130"), s("410d"), Object(y["a"])(N, g, m, !1, null, "8ab1db96", null)),
        j = A.exports,
        R = function() {
          var t = this,
            e = t._self._c;
          t._self._setupProxy;
          return e("el-dialog", {
            attrs: {
              top: "30vh",
              width: "772px",
              visible: t.showShareResultDialog,
              "before-close": t.handleClose,
              center: "",
              "custom-class": "common-dialog cover-dialog more-btn"
            },
            on: {
              "update:visible": function(e) {
                t.showShareResultDialog = e
              }
            }
          }, [e("div", {
            staticClass: "title"
          }, [t._v("分享" + t._s(t.dirName))]), e("div", {
            staticClass: "container"
          }, [e("el-input", {
            attrs: {
              placeholder: "请输入内容"
            },
            model: {
              value: t.shareLink,
              callback: function(e) {
                t.shareLink = e
              },
              expression: "shareLink"
            }
          }), e("el-button", {
            attrs: {
              slot: "append"
            },
            on: {
              click: function(e) {
                return t.copyLink()
              }
            },
            slot: "append"
          }, [t._v("复制链接")])], 1), e("div", {
            staticClass: "dialog-footer",
            attrs: {
              slot: "footer"
            },
            slot: "footer"
          }, [e("span", {
            staticClass: "tip c-danger"
          }, [t._v("该链接3天内有效," + t._s(t.shareEndTime) + "失效")])])])
        },
        M = [],
        F = s("718c"),
        H = Object(o["defineComponent"])({
          name: "ShareResultDialog",
          mixins: [f["a"]],
          components: {
            "el-dialog": u["Dialog"]
          },
          setup() {
            const {
              PointExportTable: t
            } = Object(c["a"])();
            return {
              PointExportTable: t
            }
          },
          data() {
            return {}
          },
          computed: {
            showShareResultDialog() {
              return this.$store.state.export.showShareResultDialog
            },
            shareLink() {
              return this.$store.state.export.shareResultDialogShareLink
            },
            shareDir() {
              let t = this.$store.state.export.currentShareResultId;
              if (t > 0) {
                let e = this.$store.state.export.list;
                for (const s of e)
                  if (s.id == t) return s
              }
              return null
            },
            dirName() {
              let t = this.shareDir;
              return t ? t.name : ""
            },
            shareEndTime() {
              let t = this.shareDir;
              if (t) {
                let e = t.shareEndTime;
                return "    " + new Date(new Date(e).getTime()).Format("yyyy-MM-dd hh:mm:ss")
              }
              return ""
            }
          },
          methods: {
            handleClose() {
              n["a"].commit("updateShowShareResultDialog", {
                showShareResultDialog: !1
              }), this.PointExportTable("link_popup_close")
            },
            copyLink() {
              this.PointExportTable("link_popup_copy"), F["a"].writeText(this.shareLink), this.tsNotify({
                type: "success",
                message: "链接已复制到剪切板"
              })
            }
          }
        }),
        V = H,
        Y = (s("56ea"), Object(y["a"])(V, R, M, !1, null, "7f090f1b", null)),
        W = Y.exports,
        z = s("3b32"),
        U = (s("67a1"), s("52b8")),
        X = function() {
          var t = this,
            e = t._self._c;
          return e("el-dialog", {
            attrs: {
              top: "40vh",
              width: "370px",
              align: "center",
              title: "",
              "custom-class": "common-dialog myDialog",
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
            staticClass: "loader"
          }), t._v(" " + t._s(t.content) + " ")])])
        },
        G = [],
        J = s("f5de"),
        q = {
          name: "DeleteExportDirDialog",
          components: {
            "el-dialog": J["a"]
          },
          props: {
            value: {
              type: Boolean,
              default: !1
            },
            content: {
              type: String,
              default: ""
            }
          },
          data() {
            return {
              visible: this.value
            }
          },
          watch: {
            value: {
              handler(t) {
                this.visible = t
              },
              immediate: !0
            }
          }
        },
        K = q,
        Q = (s("7bf9"), Object(y["a"])(K, X, G, !1, null, "02b29830", null)),
        Z = Q.exports,
        tt = s("7e43"),
        et = (s("879d"), s("4a9f"), s("ddbc")),
        st = s("527f"),
        at = s("c75e"),
        it = {
          name: "LeftSideView",
          mixins: [f["a"], U["a"]],
          components: {
            "el-progress": u["Progress"],
            "el-button": u["Button"],
            "el-tooltip": u["Tooltip"],
            ShareDialog: j,
            ShareResultDialog: W,
            DynamicScroller: S["a"],
            DynamicScrollerItem: S["b"],
            ExportFullLoadingDialog: Z
          },
          props: {
            height: {
              type: Number,
              default: 600
            }
          },
          setup(t) {
            var e;
            const s = null === (e = Object(o["getCurrentInstance"])()) || void 0 === e ? void 0 : e.proxy;
            Object(o["onMounted"])(null === s || void 0 === s ? void 0 : s.launchMessage);
            const {
              showFundLackView: a
            } = Object(et["a"])(), {
              PointExportTable: i
            } = Object(c["a"])();
            return {
              showFundLackView: a,
              PointExportTable: i
            }
          },
          data() {
            return {
              columns: 1,
              rowHeight: 48,
              maxThumbnailWidth: 200,
              tableLoading: !1,
              fullscreenLoading: !1,
              fullLoadingContent: "",
              empty_placehoder: "— —",
              showPayTip: !1,
              showDeleteDialog: !1,
              isBusyStatus: !1,
              IS_ALLOW_PHOTOSHOP_OPEN_PICTURE: r["t"]
            }
          },
          mounted() {},
          filters: {
            filterFormatName(t) {
              if (t && t.length >= 20) {
                let e = t.substr(0, 10),
                  s = t.substr(t.length - 10, 10);
                return `${e} ... ${s}`
              }
              return t
            }
          },
          computed: {
            showStartOrPauseClick() {
              return this.needShowStartOrPauseAllBtn()
            },
            showPauseAllBtn() {
              return this.needShowPauseAllBtn()
            },
            showStartAllBtn() {
              return this.needShowStartAllBtn()
            },
            isOnExportingBtn() {
              return this.$store.state.export.isOnExportingBtn
            },
            currentDownloadDirId() {
              return this.$store.state.export.currentDownloadDirId
            },
            user() {
              return this.$store.state.user
            },
            showShareSelectDialog() {
              return this.$store.state.export.showShareSelectDialog
            },
            isShareResultDialog() {
              return this.$store.state.export.showShareResultDialog
            },
            myMaxThumbnailWidth() {
              return this.maxThumbnailWidth
            },
            myCloumHeight() {
              return this.rowHeight
            },
            tableList() {
              let t = this.$store.state.export.list;
              if (null === t || 0 === t.length) return t;
              let e = null,
                s = this.$store.state.export.isOnExportingBtn,
                a = this.$store.state.export.exportErrMap;
              return s ? (e = t.filter(t => !(t.exportTotalNum === t.exportSuccessNum && !t.hasExportFail && !a.has(t.id))), e = e.sort((function(t, e) {
                return t.createTime - e.createTime
              }))) : (e = t.filter(t => t.exportTotalNum === t.exportSuccessNum && !t.hasExportFail && !a.has(t.id)), e = e.sort((function(t, e) {
                return e.createTime - t.createTime
              }))), e
            },
            totalNum(t) {
              return t => t.exportItemList.length
            },
            exportErrMap() {
              let t = this.$store.state.export.isOnExportingBtn;
              if (t) {
                let t = this.$store.state.export.exportErrMap;
                return t
              } {
                let t = this.$store.state.export.exportSuccessTipMap;
                return t
              }
            },
            activeNames: {
              get() {
                let t, e = this.$store.state.export.list,
                  s = this.$store.state.export.isOnExportingBtn;
                t = s ? this.$store.state.export.exportErrMap : this.$store.state.export.exportSuccessTipMap;
                let a = [];
                for (const i of e) i.isExpand && t.has(i.id) && a.push(i.id);
                return a
              },
              set(t) {}
            }
          },
          methods: {
            ...Object(d["c"])(["needShowPauseAllBtn", "needShowStartOrPauseAllBtn", "needShowStartAllBtn"]),
            ...Object(d["b"])(["asyncRetryExportDirTask", "asyncDeleteDir", "asyncStartExport", "asyncPauseExport", "loadVipInfo", "asyncOnPaySuccess", "asyncRetryErrorItem", "asyncPauseAll", "asyncStartAll", "asyncInitExportData2"]),
            ...Object(d["d"])(["showShareResultDialog", "launchMessage", "clearCallback", "updatePauseStatus", "setExportCallback", "changeExpandStatus"]),
            ...Object(d["b"])("config", ["readPhotoShopPath"]),
            async openPictureByPs(t) {
              let e = await st["a"].instance().openPictureByPs(t);
              e && 0 == e.code ? (at["a"].$emit("showPhotoshopPathSet"), e.message && this.tsNotify({
                type: "error",
                message: e.message
              })) : await this.readPhotoShopPath()
            },
            needShowRetry(t) {
              let e = this.exportErrMap.has(t);
              if (!e) return !1;
              let s = this.exportErrMap.get(t),
                a = !1;
              for (let i = 0; i < s.length; i++) {
                let t = s[i];
                if (27 !== t.errorTag) {
                  a = !0;
                  break
                }
              }
              return a
            },
            onPauseAllBtnClick: Object(l["debounce"])((async function() {
              this.changeFullLoadingState(!0, "正在执行全部暂停中..."), await Object(B["a"])(500);
              let t = await window.$net.isOnline();
              if (!t) return this.changeFullLoadingState(!1), void this.tsNotify({
                type: "error",
                message: "当前Không có网络,不支持下载，请检查网络。"
              });
              this.PointExportListPauseAllBtn();
              let e = this;
              this.asyncPauseAll({
                success() {
                  Object(B["a"])(1e3).then(() => {
                    e.changeFullLoadingState(!1)
                  })
                },
                fail(t) {
                  Object(B["a"])(1e3).then(() => {
                    e.changeFullLoadingState(!1), e.tsNotify({
                      type: "error",
                      message: "全部暂停失败，请重试或者重启应用～"
                    })
                  })
                }
              })
            }), 500),
            onStartAllBtnClick: Object(l["debounce"])((async function() {
              this.changeFullLoadingState(!0, "正在执行全部Mở始中..."), await Object(B["a"])(500);
              let t = await window.$net.isOnline();
              if (!t) return this.changeFullLoadingState(!1), void this.tsNotify({
                type: "error",
                message: "当前Không có网络,不支持下载，请检查网络。"
              });
              const e = this;
              e.changeFullLoadingState(!0, "正在执行全部Mở始中..."), e.PointExportListStartAllBtn(), e.asyncStartAll({
                success() {
                  Object(B["a"])(1e3).then(() => {
                    e.changeFullLoadingState(!1)
                  })
                },
                fail(t) {
                  Object(B["a"])(1e3).then(() => {
                    e.changeFullLoadingState(!1), e.tsNotify({
                      type: "error",
                      message: "全部导出失败，请重试或者重启应用～"
                    })
                  })
                }
              })
            }), 500),
            handleChangeCollapse(t) {
              console.log("handleChangeCollapse : ", t), this.changeExpandStatus(t.id)
            },
            startExport: Object(l["debounce"])((async function(t) {
              let e = await window.$net.isOnline();
              if (!e) return void this.tsNotify({
                type: "error",
                message: "当前Không có网络,不支持下载，请检查网络。"
              });
              this.isBusyStatus = !0;
              let s = this;
              s.PointExportListStartBtn(), s.asyncStartExport({
                data: t,
                success() {
                  s.isBusyStatus = !1
                },
                fail(t) {
                  console.error("asyncStartExport : ", t), s.isBusyStatus = !1, s.tsNotify({
                    type: "error",
                    message: "Mở始导出失败，请重试或者重启应用～"
                  })
                }
              })
            }), 500),
            pauseExport: Object(l["debounce"])((async function(t) {
              let e = await window.$net.isOnline();
              if (!e) return void this.tsNotify({
                type: "error",
                message: "当前Không có网络,不支持下载，请检查网络。"
              });
              this.isBusyStatus = !0;
              let s = this;
              this.PointExportListPauseBtn(), this.asyncPauseExport({
                data: t,
                success() {
                  s.isBusyStatus = !1
                },
                fail(t) {
                  s.isBusyStatus = !1, s.tsNotify({
                    type: "error",
                    message: "暂停失败，请重试～"
                  })
                }
              })
            }), 500),
            deleteFolder: Object(l["debounce"])((async function(t) {
              let e = "";
              t.progress < 100 && (e = "当前任务正在导出，删除后该导出进度将消失。已导出图片请前往导出目标Tập tin夹进行查看。"), this.showDeleteDialog = !0, this.tsConfirm({
                title: "Xác nhận删除该导出进度",
                message: e,
                confirmButtonText: "删除",
                closeOnClickModal: !1
              }).then(e => {
                this.PointExportListDeleteBtn(), this.changeFullLoadingState(!0, "正在删除中..."), this.showDeleteDialog = !1;
                let s = this;
                this.asyncDeleteDir({
                  exportDir: t,
                  success(t) {
                    s.changeFullLoadingState(!1)
                  },
                  fail() {
                    s.changeFullLoadingState(!1), s.tsNotify({
                      type: "error",
                      message: "删除失败，请稍候重试"
                    })
                  }
                })
              }).catch(t => {
                this.showDeleteDialog = !1
              })
            }), 200),
            changeFullLoadingState(t, e = "") {
              this.fullscreenLoading = t, this.fullLoadingContent = e
            },
            async openFolder(t) {
              await z["a"].isFileExist(t) ? (L["b"].shell.showItemInFolder(t), this.PointExportTable("click_folder")) : this.tsNotify({
                type: "error",
                message: "该导出Tập tin已被删除"
              })
            },
            async openFile(t) {
              await z["a"].isFileExist(t) ? L["b"].shell.showItemInFolder(t) : this.tsNotify({
                type: "error",
                message: "该原图Tập tin已被删除"
              })
            },
            retry: Object(l["debounce"])((async function(t) {
              let e = this.exportErrMap.get(t.id),
                s = 0;
              if (e && e.length > 0 && e.forEach(t => {
                  let e = t.errorTag;
                  28 === e && (s += 1)
                }), e && s === e.length) return;
              let a = await window.$net.isOnline();
              a ? (this.PointExportListRetryBtn(), this.asyncRetryExportDirTask({
                rootId: t.id,
                needClearErrorList: !0
              })) : this.tsNotify({
                type: "error",
                message: "当前Không có网络，请检查网络。"
              })
            }), 300),
            exportErrorMapping(t) {
              let e = t.errorTag,
                s = "错误码:" + e;
              null != t.exportCode && 0 !== t.exportCode && (s += "-" + t.exportCode), t.nativeExportCode && (s += "-" + t.nativeExportCode), s += "，";
              const a = [{
                  tag: 2,
                  msg: "导出进程退出，请点击Phải侧重试按钮"
                }, {
                  tag: 3,
                  msg: "处理效果超时，请点击Phải侧重试按钮"
                }, {
                  tag: 4,
                  msg: "导出进程错误，请点击Phải侧重试按钮"
                }, {
                  tag: 5,
                  msg: "其他类型错误，请点击Phải侧重试按钮"
                }, {
                  tag: 7,
                  msg: "API请求失败，检查网络是否稳定,再请点击Phải侧重试按钮"
                }, {
                  tag: 8,
                  msg: "账户余额不足"
                }, {
                  tag: 9,
                  msg: "导出进程底层处理出错，请点击Phải侧重试按钮"
                }, {
                  tag: 10,
                  msg: "导出进程异常退出，请点击Phải侧重试按钮"
                }, {
                  tag: 11,
                  msg: "服务器请求数据生成失败，请点击Phải侧重试按钮"
                }, {
                  tag: 12,
                  msg: "服务器请求数据校验失败，请点击Phải侧重试按钮"
                }, {
                  tag: 13,
                  msg: "服务器请求数据为空，请点击Phải侧重试按钮"
                }, {
                  tag: 14,
                  msg: "支付接口请求失败，请点击Phải侧重试按钮"
                }, {
                  tag: 15,
                  msg: "支付接口校验失败，请点击Phải侧重试按钮"
                }, {
                  tag: 16,
                  msg: "支付接口返回数据错误，请点击Phải侧重试按钮"
                }, {
                  tag: 17,
                  msg: "支付服务器算法异常，请点击Phải侧重试按钮"
                }, {
                  tag: 18,
                  msg: "拷贝性别Tập tin错误，请点击Phải侧重试按钮"
                }, {
                  tag: 19,
                  msg: "联动超时响应，请点击Phải侧重试按钮"
                }, {
                  tag: 20,
                  msg: "网络请求超时，请检查网络或暂停电脑中其他上传/下载任务后再重试"
                }, {
                  tag: 21,
                  msg: "该原图Không tồn tại，请点击Phải侧重试按钮"
                }, {
                  tag: 22,
                  msg: "该图片被删除，请点击Phải侧重试按钮"
                }, {
                  tag: 23,
                  msg: "Tiết kiệm失败，请点击Phải侧重试按钮"
                }, {
                  tag: 24,
                  msg: "不支持该图片格式导出"
                }, {
                  tag: 25,
                  msg: "图片写入IO失败，检查导出目录权限或者磁盘空间是否不足"
                }, {
                  tag: 26,
                  msg: "导出错误，请点击Phải侧重试按钮"
                }, {
                  tag: 27,
                  msg: "该图已产生二次计费（Tập tin已被修改，可能在PS/LR等软件中进行了调整）"
                }, {
                  tag: 28,
                  msg: "不支持该图片格式导出"
                }, {
                  tag: 30,
                  msg: "项目数据丢失，请重新导入这批图片，再进行导出"
                }, {
                  tag: 31,
                  msg: "电脑运行内存不足，请先退出其他软件释放内存，再点击Phải侧重试按钮"
                }, {
                  tag: 32,
                  msg: "电脑运行内存不足，请退出其他软件或重启电脑，再点击Phải侧重试按钮"
                }, {
                  tag: 33,
                  msg: "导出进程Không tồn tại，请重新安装Điểm蛋糕"
                }, {
                  tag: 34,
                  msg: "导出进程启动失败，请重新安装Điểm蛋糕"
                }, {
                  tag: 35,
                  msg: "创建共享内存失败，请重新启动Điểm蛋糕"
                }, {
                  tag: 36,
                  msg: "挂载共享内存失败，请重新启动Điểm蛋糕"
                }, {
                  tag: 37,
                  msg: "API请求失败，请重启电脑，再点击Phải侧重试按钮"
                }, {
                  tag: tt["a"].ALLOCATED_PAY_API,
                  msg: "剩余可用张数不足，请联系贵司管理员补充张数哦"
                }],
                i = [{
                  tag: 2,
                  msg: "图片Thất bại để tải，请点击Phải侧重试按钮"
                }, {
                  tag: 4,
                  msg: "效果处理过程中发生错误，请点击Phải侧重试按钮"
                }, {
                  tag: 6,
                  msg: "图片Tiết kiệm过程中失败，请点击Phải侧重试按钮"
                }, {
                  tag: 8,
                  msg: "服务器请求数据生成失败，请点击Phải侧重试按钮"
                }, {
                  tag: 9,
                  msg: "不支持该图片格式"
                }, {
                  tag: 12,
                  msg: "图片写入IO失败，检查导出目录权限或者磁盘空间是否不足"
                }, {
                  tag: 13,
                  msg: "不支持该图片格式导出，请点击Phải侧重试按钮"
                }, {
                  tag: 14,
                  msg: "原图Không tồn tại或者Không có读取权限"
                }, {
                  tag: 15,
                  msg: "服务器响应数据校验失败，请点击Phải侧重试按钮"
                }, {
                  tag: 16,
                  msg: "服务器响应数据不合法，请点击Phải侧重试按钮"
                }, {
                  tag: 17,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }, {
                  tag: 18,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }, {
                  tag: 19,
                  msg: "Tiết kiệm出现黑图，请点击Phải侧重试按钮"
                }, {
                  tag: 20,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }, {
                  tag: 21,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }, {
                  tag: 24,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }, {
                  tag: 25,
                  msg: "创建导出Tập tin失败，检查导出目录权限"
                }, {
                  tag: 26,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }, {
                  tag: 28,
                  msg: "图片对应的美化、调色参数Tập tin有损，请重新导出"
                }, {
                  tag: 30,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }, {
                  tag: 31,
                  msg: "服务器响应数据丢失，请点击Phải侧重试按钮"
                }];
              let o = "处理效果超时，请点击Phải侧重试按钮";
              for (let l = 0; l < a.length; l++) a[l].tag === e && (o = a[l].msg);
              if (2 !== e && 10 !== e && 31 !== e && 32 !== e && 33 !== e && 34 !== e && t.nativeExportCode && "number" === typeof t.nativeExportCode) {
                let e = t.nativeExportCode;
                for (let t = 0; t < i.length; t++) i[t].tag === e && (o = i[t].msg)
              }
              let n = !0;
              return 27 === e && (n = !1), n ? s + o : o
            },
            retryExportItem: Object(l["debounce"])((async function(t, e) {
              let s = t.errorTag,
                a = t.exportCode;
              if (28 === s && 28 === a) return;
              let i = await window.$net.isOnline();
              i ? this.asyncRetryErrorItem({
                errorItem: t,
                index: e,
                needDeleteCache: !0
              }) : this.tsNotify({
                type: "error",
                message: "当前Không có网络，请检查网络。"
              })
            }), 500),
            onShareClick: Object(l["debounce"])((async function(t, e) {
              0 == t.shareStatus ? this.PointExportTable("click_share_button") : 2 == t.shareStatus && this.PointExportTable("view_share_link");
              let s = await window.$net.isOnline();
              s ? 2 === t.shareStatus && t.shareLink ? n["a"].commit("updateShowShareResultDialog", {
                showShareResultDialog: !0,
                item: t
              }) : L["b"].getExport().asyncExportShare({
                exportDirId: t.id,
                shareStatus: t.shareStatus
              }) : this.tsNotify({
                type: "error",
                message: "当前Không có网络，请检查网络。"
              })
            }), 500),
            onPaySuccess() {
              this.asyncOnPaySuccess()
            },
            getCost(t) {
              if (t.completeTime > 0) {
                let e = (t.completeTime - t.createTime) / 1e3;
                return e < 60 ? `用时:${Math.ceil(e)}秒` : (e /= 60, e < 60 ? `用时:${e.toFixed(2)}分钟` : (e /= 60, `用时:${e.toFixed(2)}小时`))
              }
              return ""
            }
          }
        },
        ot = it,
        nt = (s("64dc"), Object(y["a"])(ot, p, h, !1, null, "d28d18b4", null)),
        lt = nt.exports,
        rt = Object(o["defineComponent"])({
          __name: "index",
          setup(t) {
            const e = Object(o["ref"])(r["N"]),
              {
                PointExportListExportingTab: s,
                PointExportListExportedTab: a,
                PointExportListBillingRulesPopup: i,
                PointClickExportDetail: p
              } = Object(c["a"])(),
              h = Object(o["computed"])(() => [{
                name: "正在导出",
                key: "exporting",
                icon: "el-icon-s-custom",
                point: s
              }, {
                key: "export-complete",
                name: "导出完成",
                icon: "el-icon-s-opportunity",
                point: a
              }]),
              d = Object(o["computed"])(() => {
                let t = n["a"].state.export.isOnExportingBtn,
                  e = "";
                e = t ? "exporting" : "export-complete";
                const s = h.value.find(t => t.key === e);
                return s && s.name || ""
              }),
              g = Object(o["computed"])(() => n["a"].getters.exportMenu),
              m = Object(l["debounce"])((async function(t) {
                let e = n["a"].state.export.isOnExportingBtn;
                "exporting" === t.key && e || ("export-complete" !== t.key || e) && (console.log("changeExportView : ", t), n["a"].commit("changeExportScene"))
              }), 10);
            return {
              __sfc: !0,
              showExportCalcRule: e,
              PointExportListExportingTab: s,
              PointExportListExportedTab: a,
              PointExportListBillingRulesPopup: i,
              PointClickExportDetail: p,
              groupList: h,
              currGroupTitle: d,
              exportMenu: g,
              changeExportView: m,
              ElHeader: u["Header"],
              ElTooltip: u["Tooltip"],
              ElButton: u["Button"],
              ExportTable: lt
            }
          }
        }),
        ct = rt,
        ut = (s("f3cf"), Object(y["a"])(ct, a, i, !1, null, "6dbf1951", null));
      e["default"] = ut.exports
    },
    bace: function(t, e, s) {},
    bba5: function(t, e, s) {},
    c75e: function(t, e, s) {
      "use strict";
      var a = s("2b0e");
      e["a"] = new a["default"]
    },
    f3cf: function(t, e, s) {
      "use strict";
      s("bba5")
    },
    fd9d: function(t, e, s) {},
    ff5c: function(t, e, s) {}
  }
]);
//# sourceMappingURL=chunk-79719501.0eb95de0.js.map