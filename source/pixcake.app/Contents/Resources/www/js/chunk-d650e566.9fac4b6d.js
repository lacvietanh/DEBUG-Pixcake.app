(window["webpackJsonp"] = window["webpackJsonp"] || []).push([
  ["chunk-d650e566"], {
    "00d7": function(t, e, i) {
      (function(e, i) {
        t.exports = i()
      })(0, (function() {
        return function(t) {
          var e = {};

          function i(o) {
            if (e[o]) return e[o].exports;
            var s = e[o] = {
              i: o,
              l: !1,
              exports: {}
            };
            return t[o].call(s.exports, s, s.exports, i), s.l = !0, s.exports
          }
          return i.m = t, i.c = e, i.i = function(t) {
            return t
          }, i.d = function(t, e, o) {
            i.o(t, e) || Object.defineProperty(t, e, {
              configurable: !1,
              enumerable: !0,
              get: o
            })
          }, i.n = function(t) {
            var e = t && t.__esModule ? function() {
              return t["default"]
            } : function() {
              return t
            };
            return i.d(e, "a", e), e
          }, i.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
          }, i.p = "/dist/", i(i.s = 5)
        }([function(t, e, i) {
          i(10);
          var o = i(8)(i(1), i(9), "data-v-75486378", null);
          t.exports = o.exports
        }, function(t, e, i) {
          "use strict";
          Object.defineProperty(e, "__esModule", {
            value: !0
          });
          var o = Object.assign || function(t) {
              for (var e = 1; e < arguments.length; e++) {
                var i = arguments[e];
                for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (t[o] = i[o])
              }
              return t
            },
            s = i(2),
            n = r(s);

          function r(t) {
            return t && t.__esModule ? t : {
              default: t
            }
          }

          function a(t) {
            if (Array.isArray(t)) {
              for (var e = 0, i = Array(t.length); e < t.length; e++) i[e] = t[e];
              return i
            }
            return Array.from(t)
          }
          e.default = {
            props: {
              cellSizeAndPositionGetter: {
                type: Function,
                required: !0
              },
              collection: {
                type: Array,
                required: !0
              },
              height: {
                type: Number,
                required: !0,
                validator: function(t) {
                  return t >= 0
                }
              },
              width: {
                type: Number,
                required: !0,
                validator: function(t) {
                  return t >= 0
                }
              },
              sectionSize: {
                type: Number,
                default: 300
              },
              containerPaddingBottom: {
                type: Number,
                default: 0
              },
              scrollToBottomRange: {
                type: Number
              },
              headerSlotHeight: {
                type: Number,
                default: 0
              }
            },
            data: function() {
              return {
                inRangeHit: !1,
                totalHeight: 0,
                totalWidth: 0,
                displayItems: []
              }
            },
            watch: {
              collection: function() {
                this.resetCollection()
              }
            },
            created: function() {
              this.groupManagers = [], this.onCollectionChanged()
            },
            methods: {
              resetCollection: function() {
                this.groupManagers.forEach((function(t) {
                  return t.dispose()
                })), this.groupManagers = [], this.totalHeight = 0, this.totalWidth = 0, this.onCollectionChanged()
              },
              onCollectionChanged: function() {
                var t = this,
                  e = this.collection;
                e.length > 0 && void 0 === e[0].group && (e = [{
                  group: e
                }]), e.forEach((function(e, i) {
                  var o = i,
                    s = t.$watch((function() {
                      return e
                    }), (function() {
                      return t.onGroupChanged(e.group, o)
                    }), {
                      deep: !0
                    });
                  t.groupManagers.push(new n.default(e.group, o, t.sectionSize, t.cellSizeAndPositionGetter, s))
                })), this.updateGridDimensions(), this.flushDisplayItems()
              },
              updateGridDimensions: function() {
                this.totalHeight = Math.max.apply(Math, a(this.groupManagers.map((function(t) {
                  return t.totalHeight
                })))), this.totalWidth = Math.max.apply(Math, a(this.groupManagers.map((function(t) {
                  return t.totalWidth
                }))))
              },
              onGroupChanged: function(t, e) {
                this.groupManagers[e].updateGroup(t), this.updateGridDimensions(), this.flushDisplayItems()
              },
              getComputedStyle: function(t) {
                if (t) {
                  var e = this.groupManagers[t.groupIndex];
                  if (e) {
                    var i = e.getCellMetadata(t.itemIndex);
                    if (i) {
                      var o = i.width,
                        s = i.height,
                        n = i.x,
                        r = i.y;
                      return {
                        transform: "translateX(" + n + "px) translateY(" + r + "px)",
                        width: o + "px",
                        height: s + "px"
                      }
                    }
                  }
                }
              },
              onScroll: function(t) {
                this.flushDisplayItems();
                var e = t.target,
                  i = e.scrollHeight - e.offsetHeight;
                0 === e.scrollTop ? this.$emit("scrolled-to-top", e) : e.scrollTop === i ? this.$emit("scrolled-to-bottom", e) : this.scrollToBottomRange && (e.scrollTop < i && e.scrollTop > i - this.scrollToBottomRange ? !1 === this.inRangeHit && (this.inRangeHit = !0, this.$emit("scrolled-to-bottom-range", e)) : this.inRangeHit = !1)
              },
              onContainerResized: function() {
                this.resetCollection()
              },
              flushDisplayItems: function() {
                var t = this,
                  e = 0,
                  i = 0;
                this.$refs.outer && (e = this.$refs.outer.scrollTop - this.headerSlotHeight, i = this.$refs.outer.scrollLeft);
                var s = [];
                this.groupManagers.forEach((function(n, r) {
                  var a = n.getCellIndices({
                    height: t.height,
                    width: t.width,
                    x: i,
                    y: e
                  });
                  a.forEach((function(t) {
                    s.push(Object.freeze(o({
                      groupIndex: r,
                      itemIndex: t,
                      key: s.length
                    }, n.getItem(t))))
                  }))
                })), window.requestAnimationFrame ? window.requestAnimationFrame((function() {
                  t.displayItems = s, t.$forceUpdate()
                })) : (this.displayItems = s, this.$forceUpdate())
              }
            },
            mounted: function() {
              ResizeObserver ? (this.resizeObserver = new ResizeObserver(this.onContainerResized), this.resizeObserver.observe(this.$refs.outer)) : this.$refs.outer.addEventListener("resize", this.onContainerResized)
            },
            beforeDestroy: function() {
              ResizeObserver ? this.resizeObserver.disconnect() : this.$refs.outer.removeEventListener("resize", this.onContainerResized)
            },
            computed: {
              containerStyle: function() {
                return {
                  height: this.totalHeight + this.containerPaddingBottom + "px",
                  width: this.totalWidth + "px"
                }
              },
              outerStyle: function() {
                return {
                  height: this.height + "px",
                  width: this.width + "px"
                }
              }
            }
          }
        }, function(t, e, i) {
          "use strict";
          Object.defineProperty(e, "__esModule", {
            value: !0
          });
          var o = function() {
              function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                  var o = e[i];
                  o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
              }
              return function(e, i, o) {
                return i && t(e.prototype, i), o && t(e, o), e
              }
            }(),
            s = i(4),
            n = r(s);

          function r(t) {
            return t && t.__esModule ? t : {
              default: t
            }
          }

          function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }
          var l = function() {
            function t(e, i, o, s, n) {
              a(this, t), this._groupId = i, this._sectionSize = o, this._cellSizeAndPositionGetter = s, this._unwatch = n, this.totalHeight = 0, this.totalWidth = 0, this.updateGroup(e)
            }
            return o(t, [{
              key: "updateGroup",
              value: function(t) {
                var e = this,
                  i = new n.default(this._sectionSize),
                  o = 0,
                  s = 0;
                t.forEach((function(t, n) {
                  var r = e._cellSizeAndPositionGetter(t, n, e._groupId);
                  i.registerCell({
                    index: n,
                    cellMetadatum: r
                  });
                  var a = r.x,
                    l = r.y,
                    c = r.width,
                    h = r.height,
                    u = l + h,
                    d = a + c;
                  u > o && (o = u), d > s && (s = d)
                })), i.freezeCells(), this._group = t, this._sectionManager = i, this.totalHeight = o, this.totalWidth = s
              }
            }, {
              key: "getCellIndices",
              value: function(t) {
                return this._sectionManager.getCellIndices(t)
              }
            }, {
              key: "getCellMetadata",
              value: function(t) {
                return this._sectionManager.getCellMetadata(t)
              }
            }, {
              key: "getItem",
              value: function(t) {
                return this._group[t]
              }
            }, {
              key: "dispose",
              value: function() {
                this._unwatch()
              }
            }]), t
          }();
          e.default = l
        }, function(t, e, i) {
          "use strict";
          Object.defineProperty(e, "__esModule", {
            value: !0
          });
          var o = function() {
            function t(t, e) {
              for (var i = 0; i < e.length; i++) {
                var o = e[i];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
              }
            }
            return function(e, i, o) {
              return i && t(e.prototype, i), o && t(e, o), e
            }
          }();

          function s(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }
          var n = function() {
            function t(e) {
              var i = e.height,
                o = e.width,
                n = e.x,
                r = e.y;
              s(this, t), this.height = i, this.width = o, this.x = n, this.y = r, this._indexMap = {}, this._indices = []
            }
            return o(t, [{
              key: "addCellIndex",
              value: function(t) {
                var e = t.index;
                this._indexMap[e] || (this._indexMap[e] = !0, this._indices.push(e))
              }
            }, {
              key: "getCellIndices",
              value: function() {
                return this._indices
              }
            }, {
              key: "toString",
              value: function() {
                return this.x + "," + this.y + " " + this.width + "x" + this.height
              }
            }]), t
          }();
          e.default = n
        }, function(t, e, i) {
          "use strict";
          Object.defineProperty(e, "__esModule", {
            value: !0
          });
          var o = function() {
              function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                  var o = e[i];
                  o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                }
              }
              return function(e, i, o) {
                return i && t(e.prototype, i), o && t(e, o), e
              }
            }(),
            s = i(3),
            n = r(s);

          function r(t) {
            return t && t.__esModule ? t : {
              default: t
            }
          }

          function a(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
          }
          var l = 600,
            c = function() {
              function t() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l;
                a(this, t), this._sectionSize = e, this._cellMetadata = [], this._sections = {}
              }
              return o(t, [{
                key: "registerCell",
                value: function(t) {
                  var e = t.cellMetadatum,
                    i = t.index,
                    o = Object.freeze(e);
                  this._cellMetadata[i] = o, this.getSections(o).forEach((function(t) {
                    return t.addCellIndex({
                      index: i
                    })
                  }))
                }
              }, {
                key: "freezeCells",
                value: function() {
                  Object.freeze(this._cellMetadata)
                }
              }, {
                key: "getSections",
                value: function(t) {
                  for (var e = t.height, i = t.width, o = t.x, s = t.y, r = Math.floor(o / this._sectionSize), a = Math.floor((o + i - 1) / this._sectionSize), l = Math.floor(s / this._sectionSize), c = Math.floor((s + e - 1) / this._sectionSize), h = [], u = r; u <= a; u++)
                    for (var d = l; d <= c; d++) {
                      var p = u + "." + d;
                      this._sections[p] || (this._sections[p] = new n.default({
                        height: this._sectionSize,
                        width: this._sectionSize,
                        x: u * this._sectionSize,
                        y: d * this._sectionSize
                      })), h.push(this._sections[p])
                    }
                  return h
                }
              }, {
                key: "getTotalSectionCount",
                value: function() {
                  return Object.keys(this._sections).length
                }
              }, {
                key: "getCellIndices",
                value: function(t) {
                  var e = t.height,
                    i = t.width,
                    o = t.x,
                    s = t.y,
                    n = {};
                  return this.getSections({
                    height: e,
                    width: i,
                    x: o,
                    y: s
                  }).forEach((function(t) {
                    return t.getCellIndices().forEach((function(t) {
                      n[t] = t
                    }))
                  })), Object.keys(n).map((function(t) {
                    return n[t]
                  }))
                }
              }, {
                key: "getCellMetadata",
                value: function(t) {
                  return this._cellMetadata[t]
                }
              }]), t
            }();
          e.default = c
        }, function(t, e, i) {
          "use strict";
          Object.defineProperty(e, "__esModule", {
            value: !0
          });
          var o = i(0),
            s = n(o);

          function n(t) {
            return t && t.__esModule ? t : {
              default: t
            }
          }
          var r = {
            install: function(t) {
              t.component("VirtualCollection", s.default)
            }
          };
          e.default = r
        }, function(t, e, i) {
          e = t.exports = i(7)(), e.push([t.i, ".vue-virtual-collection[data-v-75486378]{overflow:scroll;-webkit-overflow-scrolling:touch}.vue-virtual-collection-container[data-v-75486378]{position:relative}.vue-virtual-collection .cell-container[data-v-75486378]{position:absolute;top:0;left:0}", ""])
        }, function(t, e) {
          t.exports = function() {
            var t = [];
            return t.toString = function() {
              for (var t = [], e = 0; e < this.length; e++) {
                var i = this[e];
                i[2] ? t.push("@media " + i[2] + "{" + i[1] + "}") : t.push(i[1])
              }
              return t.join("")
            }, t.i = function(e, i) {
              "string" === typeof e && (e = [
                [null, e, ""]
              ]);
              for (var o = {}, s = 0; s < this.length; s++) {
                var n = this[s][0];
                "number" === typeof n && (o[n] = !0)
              }
              for (s = 0; s < e.length; s++) {
                var r = e[s];
                "number" === typeof r[0] && o[r[0]] || (i && !r[2] ? r[2] = i : i && (r[2] = "(" + r[2] + ") and (" + i + ")"), t.push(r))
              }
            }, t
          }
        }, function(t, e) {
          t.exports = function(t, e, i, o) {
            var s, n = t = t || {},
              r = typeof t.default;
            "object" !== r && "function" !== r || (s = t, n = t.default);
            var a = "function" === typeof n ? n.options : n;
            if (e && (a.render = e.render, a.staticRenderFns = e.staticRenderFns), i && (a._scopeId = i), o) {
              var l = Object.create(a.computed || null);
              Object.keys(o).forEach((function(t) {
                var e = o[t];
                l[t] = function() {
                  return e
                }
              })), a.computed = l
            }
            return {
              esModule: s,
              exports: n,
              options: a
            }
          }
        }, function(t, e) {
          t.exports = {
            render: function() {
              var t = this,
                e = t.$createElement,
                i = t._self._c || e;
              return i("div", {
                ref: "outer",
                staticClass: "vue-virtual-collection",
                style: t.outerStyle,
                on: {
                  "&scroll": function(e) {
                    return t.onScroll(e)
                  }
                }
              }, [t._t("header"), t._v(" "), i("div", {
                staticClass: "vue-virtual-collection-container",
                style: t.containerStyle
              }, t._l(t.displayItems, (function(e) {
                return i("div", {
                  key: e.key,
                  staticClass: "cell-container",
                  style: t.getComputedStyle(e)
                }, [t._t("cell", null, {
                  data: e.data
                })], 2)
              })), 0)], 2)
            },
            staticRenderFns: []
          }
        }, function(t, e, i) {
          var o = i(6);
          "string" === typeof o && (o = [
            [t.i, o, ""]
          ]), o.locals && (t.exports = o.locals);
          i(11)("5a98f0ed", o, !0)
        }, function(t, e, i) {
          var o = "undefined" !== typeof document;
          if ("undefined" !== typeof DEBUG && DEBUG && !o) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
          var s = i(12),
            n = {},
            r = o && (document.head || document.getElementsByTagName("head")[0]),
            a = null,
            l = 0,
            c = !1,
            h = function() {},
            u = "undefined" !== typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

          function d(t) {
            for (var e = 0; e < t.length; e++) {
              var i = t[e],
                o = n[i.id];
              if (o) {
                o.refs++;
                for (var s = 0; s < o.parts.length; s++) o.parts[s](i.parts[s]);
                for (; s < i.parts.length; s++) o.parts.push(m(i.parts[s]));
                o.parts.length > i.parts.length && (o.parts.length = i.parts.length)
              } else {
                var r = [];
                for (s = 0; s < i.parts.length; s++) r.push(m(i.parts[s]));
                n[i.id] = {
                  id: i.id,
                  refs: 1,
                  parts: r
                }
              }
            }
          }

          function p() {
            var t = document.createElement("style");
            return t.type = "text/css", r.appendChild(t), t
          }

          function m(t) {
            var e, i, o = document.querySelector('style[data-vue-ssr-id~="' + t.id + '"]');
            if (o) {
              if (c) return h;
              o.parentNode.removeChild(o)
            }
            if (u) {
              var s = l++;
              o = a || (a = p()), e = g.bind(null, o, s, !1), i = g.bind(null, o, s, !0)
            } else o = p(), e = v.bind(null, o), i = function() {
              o.parentNode.removeChild(o)
            };
            return e(t),
              function(o) {
                if (o) {
                  if (o.css === t.css && o.media === t.media && o.sourceMap === t.sourceMap) return;
                  e(t = o)
                } else i()
              }
          }
          t.exports = function(t, e, i) {
            c = i;
            var o = s(t, e);
            return d(o),
              function(e) {
                for (var i = [], r = 0; r < o.length; r++) {
                  var a = o[r],
                    l = n[a.id];
                  l.refs--, i.push(l)
                }
                e ? (o = s(t, e), d(o)) : o = [];
                for (r = 0; r < i.length; r++) {
                  l = i[r];
                  if (0 === l.refs) {
                    for (var c = 0; c < l.parts.length; c++) l.parts[c]();
                    delete n[l.id]
                  }
                }
              }
          };
          var f = function() {
            var t = [];
            return function(e, i) {
              return t[e] = i, t.filter(Boolean).join("\n")
            }
          }();

          function g(t, e, i, o) {
            var s = i ? "" : o.css;
            if (t.styleSheet) t.styleSheet.cssText = f(e, s);
            else {
              var n = document.createTextNode(s),
                r = t.childNodes;
              r[e] && t.removeChild(r[e]), r.length ? t.insertBefore(n, r[e]) : t.appendChild(n)
            }
          }

          function v(t, e) {
            var i = e.css,
              o = e.media,
              s = e.sourceMap;
            if (o && t.setAttribute("media", o), s && (i += "\n/*# sourceURL=" + s.sources[0] + " */", i += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(s)))) + " */"), t.styleSheet) t.styleSheet.cssText = i;
            else {
              while (t.firstChild) t.removeChild(t.firstChild);
              t.appendChild(document.createTextNode(i))
            }
          }
        }, function(t, e) {
          t.exports = function(t, e) {
            for (var i = [], o = {}, s = 0; s < e.length; s++) {
              var n = e[s],
                r = n[0],
                a = n[1],
                l = n[2],
                c = n[3],
                h = {
                  id: t + ":" + s,
                  css: a,
                  media: l,
                  sourceMap: c
                };
              o[r] ? o[r].parts.push(h) : i.push(o[r] = {
                id: r,
                parts: [h]
              })
            }
            return i
          }
        }])
      }))
    },
    "16c0": function(t, e, i) {
      "use strict";
      i.r(e);
      var o = function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "home-index"
          }, [e("home-view")], 1)
        },
        s = [],
        n = function() {
          var t = this,
            e = t._self._c;
          t._self._setupProxy;
          return t.isLeave ? t._e() : e("div", {
            staticClass: "home-item global__scroll-style",
            on: {
              drop: function(e) {
                return e.preventDefault(), e.stopPropagation(), t.onDropHanlderWrap(e)
              },
              dragover: function(t) {
                t.preventDefault(), t.stopPropagation()
              },
              dragenter: function(e) {
                return e.preventDefault(), e.stopPropagation(), t.onDropOverHanlderWrap()
              },
              click: function(e) {
                return t.selectedAll(!1)
              }
            }
          }, [e("div", {
            ref: "projectContainerRef",
            staticClass: "project-container guideClass1"
          }, [e("ts-virtual-collection-view", {
            ref: "virtualCollectionRef",
            attrs: {
              "content-edge-set": t.edgSet,
              width: t.collectionViewSize.width,
              height: t.collectionViewSize.height,
              items: t.projectList,
              "item-size": t.itemSize,
              columns: t.column,
              "line-space": t.lineSpace
            },
            on: {
              "scrolled-to-bottom-range": t.onScrolledToBottomRange
            },
            scopedSlots: t._u([{
              key: "header",
              fn: function() {
                return [e("h3", {
                  staticClass: "title c-text-primary",
                  style: {
                    marginTop: t.titleEdgSet.top + "px",
                    marginLeft: t.titleEdgSet.left + "px",
                    marginRight: t.titleEdgSet.right + "px",
                    marginBottom: t.titleEdgSet.bottom + "px"
                  },
                  attrs: {
                    id: "aaaaaaa"
                  }
                }, [t._v("全部项目")])]
              },
              proxy: !0
            }, {
              key: "default",
              fn: function({
                data: o
              }) {
                return [0 === o.item.type ? [e("el-card", {
                  key: o.index,
                  staticClass: "box-card",
                  attrs: {
                    shadow: "hover",
                    title: o.item.name,
                    "body-style": {
                      padding: "0px"
                    }
                  }
                }, [e("div", {
                  staticClass: "add-project c-text-primary",
                  on: {
                    click: function(e) {
                      return e.stopPropagation(), t.onAddProjectClick()
                    }
                  }
                }, [e("i", {
                  staticClass: "el-icon-plus add-btn"
                }), e("p", {
                  staticClass: "add-name"
                }, [t._v(t._s(o.item.name))])])])] : [e("el-card", {
                  key: o.index,
                  ref: "projectCardRef",
                  class: {
                    "box-card": !0,
                    "box-card-hover": o.index == t.dragToWhichItem,
                    "box-card-selected": t.isSelected(o.item)
                  },
                  attrs: {
                    id: o.item.id,
                    shadow: "hover",
                    title: o.item.name,
                    "body-style": {
                      padding: "0px"
                    }
                  },
                  nativeOn: {
                    mousedown: function(e) {
                      return t.handleStopMove.apply(null, arguments)
                    },
                    click: [function(e) {
                      return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey ? null : (e.stopPropagation(), t.onLeftMouseClick(o.item, o.index))
                    }, function(e) {
                      return e.metaKey ? (e.stopPropagation(), t.onCommandLeftMouseClick(!0, o.item, o.index)) : null
                    }, function(e) {
                      return e.ctrlKey ? (e.stopPropagation(), t.onCommandLeftMouseClick(!1, o.item, o.index)) : null
                    }, function(e) {
                      return e.shiftKey ? (e.stopPropagation(), t.onLeftMouseShiftClick(o.item, o.index)) : null
                    }],
                    dblclick: function(e) {
                      return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey ? null : (e.stopPropagation(), t.projectClickHandler(o.index, o.item, "dblclick"))
                    },
                    contextmenu: function(e) {
                      return e.ctrlKey || e.shiftKey || e.altKey || e.metaKey ? null : t.handleNodeContextmenu(o.index, o.item)
                    },
                    drop: function(e) {
                      e.preventDefault(), e.stopPropagation(), t.onDropHanlder(t.getTransFormedDropPaths(), o.index, o.item)
                    },
                    dragover: function(e) {
                      return e.preventDefault(), e.stopPropagation(), t.onDropOverHanlder(o.index)
                    },
                    dragenter: function(e) {
                      return e.preventDefault(), e.stopPropagation(), t.onDropOverHanlder(o.index)
                    },
                    dragleave: function(e) {
                      return e.preventDefault(), e.stopPropagation(), t.onDropLeaveHanlder(o.index)
                    }
                  }
                }, [o.item.projectIcon && o.item.projectIcon.length > 0 ? [e("div", {
                  staticClass: "custom-image"
                }, [1 === o.item.projectIcon.length ? [e("render-icon", {
                  attrs: {
                    "icon-param": {
                      projectIcon: o.item.projectIcon,
                      index: 0
                    }
                  }
                })] : 2 === o.item.projectIcon.length ? [e("div", {
                  staticClass: "two-box"
                }, [e("render-icon", {
                  attrs: {
                    "icon-param": {
                      projectIcon: o.item.projectIcon,
                      index: 0
                    }
                  }
                }), e("render-icon", {
                  attrs: {
                    "icon-param": {
                      projectIcon: o.item.projectIcon,
                      index: 1
                    }
                  }
                })], 1)] : [e("div", {
                  staticClass: "three-box"
                }, [e("div", {
                  staticClass: "top"
                }, [e("render-icon", {
                  attrs: {
                    "icon-param": {
                      projectIcon: o.item.projectIcon,
                      index: 0
                    }
                  }
                })], 1), e("div", {
                  staticClass: "bottom"
                }, [e("render-icon", {
                  attrs: {
                    "icon-param": {
                      projectIcon: o.item.projectIcon,
                      index: 1
                    },
                    "is-left": "true"
                  }
                }), e("div", {
                  staticClass: "bottom-right"
                }, [o.item.thumbnailCounts > 3 ? e("p", {
                  staticClass: "count-box"
                }, [t._v(" 共" + t._s(o.item.thumbnailCounts || 0) + "张 ")]) : t._e(), e("render-icon", {
                  attrs: {
                    "icon-param": {
                      projectIcon: o.item.projectIcon,
                      index: 2
                    }
                  }
                })], 1)], 1)])]], 2)] : [e("div", {
                  staticClass: "project-icon"
                }, [e("img", {
                  staticClass: "default-icon",
                  attrs: {
                    src: i("782c")
                  }
                })])], e("div", {
                  staticClass: "project-info"
                }, [e("div", {
                  ref: "itemName",
                  staticClass: "project-name"
                }, [t._v(" " + t._s(t._f("filterFormatName")(o.item.name || "")) + " ")]), e("div", {
                  staticClass: "project-time c-text-label"
                }, [t._v(" 更新时间：" + t._s(t._f("moment")(o.item.update_time, "timezone", "Asia/Shanghai", "MM月DD日 HH:mm")) + " ")])])], 2)]]
              }
            }], null, !1, 1786446263)
          })], 1), e("opt-project-dialog", {
            on: {
              onAddedProject: t.onAddedProjectCallback
            },
            nativeOn: {
              mousedown: function(t) {
                t.stopPropagation()
              }
            },
            model: {
              value: t.showResetProjectName,
              callback: function(e) {
                t.showResetProjectName = e
              },
              expression: "showResetProjectName"
            }
          }), e("importProgressDialog", {
            attrs: {
              importFilePaths: t.importFilePaths,
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
          }), e("renameProjectDialog", {
            attrs: {
              value: t.showRenameDialog,
              text: t.inputRenameText
            },
            on: {
              onClose: function(e) {
                t.showRenameDialog = !1
              },
              onConfirm: t.onRenameConfirm
            },
            nativeOn: {
              mousedown: function(t) {
                t.stopPropagation()
              }
            }
          }), e("delete-progress-dialog", {
            attrs: {
              isDeleteProject: !0,
              status: t.deleteProgress.status,
              data: t.deleteProgress
            },
            nativeOn: {
              mousedown: function(t) {
                t.stopPropagation()
              }
            },
            model: {
              value: t.showDeleteProgress,
              callback: function(e) {
                t.showDeleteProgress = e
              },
              expression: "showDeleteProgress"
            }
          })], 1)
        },
        r = [],
        a = i("2b0e"),
        l = i("2f62"),
        c = i("c5da"),
        h = i("442f"),
        u = i("138c"),
        d = i("5bc6"),
        p = i("25c2"),
        m = i("e31e"),
        f = i("8f12"),
        g = i("fa7d"),
        v = i("45a3"),
        w = i("5c96"),
        y = i("4176"),
        S = function() {
          var t = this,
            e = t._self._c;
          return e("el-dialog", {
            attrs: {
              top: "30vh",
              width: "440px",
              "custom-class": "common-dialog",
              visible: t.visible,
              "close-on-click-modal": !1,
              "close-on-press-escape": !1
            },
            on: {
              "update:visible": function(e) {
                t.visible = e
              }
            }
          }, [e("div", {
            staticClass: "title"
          }, [t._v("创建新项目")]), e("div", {
            staticClass: "container"
          }, [e("el-input", {
            ref: "inputProjectName",
            attrs: {
              placeholder: "请输入项目名称",
              maxlength: "30"
            },
            on: {
              change: t.handleNameChange
            },
            nativeOn: {
              keydown: function(e) {
                return !e.type.indexOf("key") && t._k(e.keyCode, "enter", 13, e.key, "Enter") ? null : t.submit.apply(null, arguments)
              }
            },
            model: {
              value: t.form.name,
              callback: function(e) {
                t.$set(t.form, "name", e)
              },
              expression: "form.name"
            }
          })], 1), e("div", {
            staticClass: "footer"
          }, [e("el-button", {
            attrs: {
              type: "primary",
              loading: t.loading,
              disabled: null == t.form.name || "" == t.form.name
            },
            on: {
              click: t.submit
            }
          }, [t._v(" 保存 ")])], 1)])
        },
        b = [],
        x = i("f5de"),
        C = {
          name: "optProjectDialog",
          mixins: [h["a"]],
          components: {
            "el-dialog": x["a"],
            "el-input": w["Input"]
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
                name: ""
              },
              ifInconClose: !0
            }
          },
          filters: {},
          computed: {
            ...Object(l["c"])(["userId"])
          },
          watch: {
            value: {
              handler(t) {
                this.visible = t, t && this.$nextTick(() => {
                  this.$refs.inputProjectName.focus()
                })
              },
              immediate: !0
            },
            visible(t) {
              var e;
              t || 1 != this.ifInconClose || (null === (e = this.$tsStat) || void 0 === e || e.event("cake_workbench", {
                cake_operate: "add_popup_close"
              }));
              this.$emit("input", t), this.ifInconClose
            }
          },
          mounted() {
            this.ifInconClose = !0
          },
          methods: {
            ...Object(l["b"])("project", ["ACT_InsertProject"]),
            async submit() {
              var t;
              null === (t = this.$tsStat) || void 0 === t || t.event("cake_workbench", {
                cake_operate: "add_popup_save"
              });
              let e = this.form.name.trim();
              if (e = e.replace(/ +/g, " "), e)
                if (e.byteLength() > 60) this.tsNotify({
                  type: "warning",
                  message: "最多可支持输入30个汉字~"
                });
                else {
                  this.loading = !0, this.ifInconClose = !1;
                  try {
                    const t = new d["a"](this.userId, e, null);
                    t.visit_time = (new Date).getTime(), await this.ACT_InsertProject(t), this.form.name = "", this.visible = !1, this.$emit("onAddedProject", t)
                  } catch (i) {
                    this.tsNotify({
                      type: "error",
                      message: i.message
                    }), this.form.name = "", this.visible = !1
                  }
                  this.loading = !1
                }
              else this.tsNotify({
                type: "warning",
                message: "请输入项目名称"
              })
            },
            handleNameChange() {
              var t;
              null === (t = this.$tsStat) || void 0 === t || t.event("cake_workbench", {
                cake_operate: "add_popup_input_text"
              })
            }
          }
        },
        P = C,
        j = i("2877"),
        D = Object(j["a"])(P, S, b, !1, null, "55017226", null),
        _ = D.exports,
        M = i("3b32"),
        I = i("b2db"),
        E = i("676c"),
        T = i("2ed5"),
        k = i("4752"),
        R = i("d80a"),
        $ = i("ca35");
      const O = Object(a["defineComponent"])({
        components: {
          "delete-progress-dialog": E["a"]
        },
        setup() {
          const {
            PointHomeItem: t
          } = Object($["a"])();
          return {
            PointHomeItem: t
          }
        },
        data() {
          return {
            deleteProgress: {
              status: f["a"].Start,
              over: 1,
              total: 1
            },
            showDeleteProgress: !1,
            onShowDeleteDialog: !1
          }
        },
        computed: {},
        watch: {
          showDeleteProgress(t) {
            t ? this.unregisterShortcut() : this.registerShortcut()
          },
          onShowDeleteDialog(t) {
            t || this.showDeleteProgress ? this.unregisterShortcut() : this.registerShortcut()
          }
        },
        methods: {
          ...Object(l["b"])("project", ["ACT_InsertProject", "ACT_UpdateProject", "ACT_DeleteProject"]),
          async onDeleteProject(t) {
            await this.ACT_DeleteProject(t.id), await this.deleteProjectCache(t), this.selectProjects.delete(t.id)
          },
          remove(t) {
            this.onShowDeleteDialog = !0, this.tsConfirm({
              title: "删除该项目",
              message: "删除之后该项目下的所有图片将会被删除，但磁盘中的原始文件仍然还在。",
              customMessageStyle: "textAlign: left"
            }).then(async e => {
              this.onShowDeleteDialog = !1, this.PointHomeItem("delete_project"), this.showDeleteProgress = !0, this.deleteProgress.status = f["a"].Start, this.deleteProgress.status = f["a"].Deleting, this.onDeleteProject(t).then(async () => {
                await this.deleteRemoteProject(t), this.loadNext(1), this.deleteProgress.status = f["a"].DeleteOver, this.showDeleteProgress = !1
              }).catch(t => {
                console.error(t), this.deleteProgress.status = f["a"].RequestDeleteError, this.showDeleteProgress = !1
              })
            }).catch(t => {
              this.onShowDeleteDialog = !1, console.log("cancel")
            })
          },
          cloneMap(t) {
            let e = new Map;
            for (const i of t) {
              let [t, o] = i;
              e.set(t, o)
            }
            return e
          },
          async deleteRemoteImageIds(t) {
            let e = await Object(R["c"])(t.id),
              i = JSON.stringify(e);
            i && i.length > 0 && await Object(k["a"])(t.id, i)
          },
          async onBatchDeleteProjects(t) {
            let e = null;
            try {
              this.deleteProgress.status = f["a"].Start, this.deleteProgress.status = f["a"].Deleting;
              const e = t.size;
              let i = [];
              const o = new Map;
              for (const n of t) {
                let [t, e] = n;
                o.set(t, e), await this.onDeleteProject(e)
              }
              Promise.all(i).then(() => {
                this.deleteRemoteProjects(o)
              }), this.deleteProgress.status = f["a"].DeleteOver;
              let s = Math.min(this.lazyLoadObj.singlePageCount, e);
              this.loadNext(s)
            } catch (i) {
              e = i, this.deleteProgress.status = f["a"].RequestDeleteError, this.showDeleteProgress = !1
            }
            if (e) return Promise.reject(e)
          },
          async deleteRemoteProjects(t) {
            let e = [];
            for (const i of t) {
              let [t, o] = i;
              e.push({
                id: t
              })
            }
            await Object(T["a"])(e)
          },
          async deleteRemoteProject(t) {
            await Object(T["a"])([{
              id: t.id
            }])
          },
          batchRemove(t) {
            this.onShowDeleteDialog = !0;
            let e = this.cloneMap(t);
            console.log("批量删除", e);
            let i = e.size,
              o = this.$createElement,
              s = null,
              n = {
                style: "font-size: 16px;font-weight: 500; margin: 12px 0 16px"
              },
              r = {
                style: "font-size: 15px;font-weight: 500; margin: 12px 2px 16px 2px;color:#F5D228"
              };
            s = o("div", n, [o("span", n, "确认删除"), o("span", r, "" + i), o("span", n, "个项目")]), this.tsConfirm({
              title: null,
              customTitleEl: s,
              message: "删除之后项目下的所有图片将会被删除，但磁盘中的原始文件仍然还在。",
              customMessageStyle: "textAlign: left"
            }).then(e => {
              this.PointHomeItem("delete_project"), this.showDeleteProgress = !0, this.onShowDeleteDialog = !1, this.onBatchDeleteProjects(t).then(() => {
                this.selectProjects.clear()
              }).catch(t => {
                console.log(t)
              })
            }).catch(t => {
              this.showDeleteProgress = !1, this.onShowDeleteDialog = !1, console.log("cancel")
            })
          }
        }
      });
      var N = function() {
          var t = this,
            e = t._self._c;
          t._self._setupProxy;
          return e("div", {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: t.isDown,
              expression: "isDown"
            }],
            staticClass: "claSwipeMask",
            style: {
              left: t.rect.x + "px",
              top: t.rect.y + "px",
              width: t.rect.w + "px",
              height: t.rect.h + "px"
            }
          })
        },
        z = [];

      function A(t, e) {
        t = t || {
          x: 0,
          y: 0
        }, e = e || {
          x: 0,
          y: 0
        };
        let i = Math.min(t.x, e.x),
          o = Math.min(t.y, e.y),
          s = Math.max(t.y, e.y),
          n = Math.max(t.x, e.x),
          r = Math.abs(i - n),
          a = Math.abs(o - s);
        return isNaN(i), {
          x: i,
          y: o,
          w: r,
          h: a
        }
      }

      function L(t) {
        return t.h + t.y
      }

      function H(t) {
        return t.w + t.x
      }

      function B(t) {
        return t.x
      }

      function F(t) {
        return t.y
      }
      const G = {
        None: -1,
        Down: 0,
        Up: 1
      };
      let U = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
        W = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
      var K = a["default"].extend({
          name: "swipeChooseOp",
          props: {
            acceptEl: {
              type: Object,
              value: {
                el: null
              }
            },
            eventEl: {
              type: HTMLElement,
              value: null
            },
            canMouseDown: {
              type: Boolean,
              value: !0
            },
            isCustomScroll: {
              type: Boolean,
              value: !1
            }
          },
          watch: {
            rect(t) {
              if (!this.isDown || !this.canMouseDown || !this.isMoved) return;
              let e = this.rect;
              this.isCustomScroll || (e = A(this.rStartPoint, this.rEndPoint)), this.$emit("onSelectionChanged", e, this.startPoint)
            },
            canMouseDown(t) {
              t || (this.isDown = !1)
            }
          },
          data() {
            return {
              startPoint: null,
              endPoint: null,
              rStartPoint: null,
              rEndPoint: null,
              isDown: !1,
              isMoved: !1,
              offsetPosY: 0,
              rect: {
                x: 0,
                y: 0,
                w: 0,
                h: 0
              },
              scrollTimer: null,
              intervalY: 5,
              scrollDirection: G.None,
              constScrollHeight: null,
              speed: 1,
              lastDownTime: null
            }
          },
          methods: {
            getEventEl() {
              return null == this.eventEl ? window : this.eventEl
            },
            installSwipeEvents() {
              let t = this.getEventEl();
              this.getAcceptEl().addEventListener("mousedown", this.onMouseDown, {
                capture: !1,
                passive: !0
              }), t.addEventListener("mousemove", this.onMouseMove), t.addEventListener("mouseup", this.onMouseUp), t.addEventListener("resize", this.onResize)
            },
            removeSwipeEvents() {
              let t = this.getEventEl();
              this.getAcceptEl().removeEventListener("mousedown", this.onMouseDown, !1), t.removeEventListener("mousemove", this.onMouseMove), t.removeEventListener("mouseup", this.onMouseUp), t.removeEventListener("resize", this.onResize)
            },
            transformXY(t) {
              let {
                clientX: e,
                clientY: i
              } = t, o = e, s = i - this.offsetPosY;
              return this.isCustomScroll && (s = i - this.offsetPosY + this.getAcceptEl().scrollTop), {
                x: o,
                y: s
              }
            },
            pointInside(t) {
              let e = !1,
                i = this.transformXY(t),
                o = this.getAcceptEl().scrollHeight,
                s = this.getAcceptEl().scrollTop,
                n = this.getAcceptEl().scrollWidth,
                r = this.getAcceptEl().scrollLeft,
                a = {
                  x: r,
                  y: s,
                  w: n,
                  h: o
                };
              return i.x >= B(a) && i.x <= H(a) && i.y >= F(a) && i.y <= L(a) && (e = !0), e
            },
            onResize(t) {
              this.reset()
            },
            onMouseDown(t) {
              this.lastDownTime = (new Date).getTime(), this.startPoint = this.transformXY(t), this.isCustomScroll || (this.rStartPoint = {
                ...this.startPoint
              }, this.rStartPoint.y += this.getAcceptEl().scrollTop), this.rect = {
                ...this.startPoint,
                w: 0,
                h: 0
              }, this.isDown = !!this.canMouseDown, this.isMoved = !1, this.stopTimer()
            },
            onMouseMove(t) {
              let e = (new Date).getTime(),
                i = e - (this.lastDownTime || e);
              const o = 200;
              if (!this.isDown || i < o) return;
              console.log("swipeChooseOp.onMouseMove: diff", i), this.isMoved = !0;
              let s = this.transformXY(t);
              this.endPoint = s, this.isCustomScroll || (this.rEndPoint = {
                ...s
              }, this.rEndPoint.y += this.getAcceptEl().scrollTop);
              let n = A(this.startPoint, this.endPoint);
              this.rect = n, this.checkScrollState(t)
            },
            onMouseUp(t) {
              if (this.lastDownTime = (new Date).getTime(), !this.isDown) return;
              this.isDown = !1, this.isMoved = !1, this.endPoint = this.transformXY(t);
              let e = A(this.startPoint, this.endPoint);
              this.rect = e, this.stopTimer(), (e.h > 5 || e.w > 5) && this.$emit("onSelectEnd")
            },
            getOffsetClient(t) {
              let e = 0,
                i = t;
              while (null != (i = i.offsetParent)) e += i.offsetTop;
              return e
            },
            getAcceptEl() {
              return document.getElementById(this.acceptEl.el)
            },
            onScroller() {
              if (this.scrollDirection == G.None) return;
              let t = this.scrollDirection == G.Up ? -this.intervalY : this.intervalY;
              t *= this.speed;
              let e = this.getAcceptEl().scrollTop + t,
                i = this.constScrollHeight,
                o = this.getAcceptEl().clientHeight;
              if (t < 0) {
                e <= 0 && (e = 0);
                let t = e;
                this.isCustomScroll || (t = this.getAcceptEl().getBoundingClientRect().y), this.endPoint = {
                  x: this.endPoint.x,
                  y: t
                }, this.rEndPoint = {
                  ...this.endPoint
                }
              }
              if (t > 0) {
                let t = e + o;
                t >= i && (e = i - o, t = i), this.endPoint = {
                  x: this.endPoint.x,
                  y: t
                }, this.rEndPoint = {
                  ...this.endPoint
                }
              }
              let s = A(this.startPoint, this.endPoint);
              this.rect = s, this.getAcceptEl().scrollTop = e, this.scrollTimer = U(this.onScroller)
            },
            startTimer() {
              this.stopTimer(), this.scrollTimer || (this.scrollTimer = U(this.onScroller))
            },
            stopTimer() {
              this.scrollTimer && (W(this.scrollTimer), this.scrollTimer = null)
            },
            checkScrollState(t) {
              if (null == this.getAcceptEl().offsetParent) return;
              let e = this.getAcceptEl().clientHeight,
                i = this.getAcceptEl().scrollTop,
                o = this.getAcceptEl().getBoundingClientRect().y;
              this.constScrollHeight || (this.constScrollHeight = this.getAcceptEl().scrollHeight);
              let s = this.transformXY(t);
              this.scrollDirection = G.None;
              let n = s.y - i,
                r = n;
              this.isCustomScroll || (n = s.y, r = s.y - o), r <= 0 && (this.scrollDirection = G.Up, this.speed = 1 + Math.abs(n) / 100), n >= e && (this.scrollDirection = G.Down, n -= e, this.speed = 1 + Math.abs(n) / 100), this.scrollDirection != G.None && this.startTimer()
            },
            reset() {
              this.constScrollHeight = null
            }
          },
          beforeDestroy() {
            this.removeSwipeEvents()
          },
          mounted() {
            this.installSwipeEvents(), this.offsetPosY = this.getOffsetClient(this.getAcceptEl())
          }
        }),
        q = K,
        Y = (i("e2a4"), Object(j["a"])(q, N, z, !1, null, "32de148b", null)),
        Q = Y.exports;
      const V = {
        install(t, e) {
          t.prototype.$swipeChooseShow = function(e, i) {
            let o = t.extend(Q);
            const s = new o({
              propsData: {
                ...i
              }
            }).$mount();
            return e.appendChild(s.$el), s
          }
        }
      };
      var X = V,
        J = i("67a1");

      function Z(t, e) {
        let i = Math.min(t.x, e.x),
          o = Math.max(t.x + t.w, e.x + e.w),
          s = Math.abs(o - i),
          n = Math.min(t.y, e.y),
          r = Math.max(t.y + t.h, e.y + e.h),
          a = Math.abs(r - n),
          l = t.w + e.w,
          c = t.h + e.h;
        return s < l && a < c
      }
      a["default"].use(X);
      const tt = a["default"].extend({
        data() {
          return {
            selectProjects: new Map,
            lastSelectedIndex: null,
            swipeChooseRef: null,
            canMouseDragSelection: !0,
            allProjects: new Map,
            isOnDragMouseDown: !1
          }
        },
        watch: {
          "$store.state.project.projects": {
            handler: function(t) {
              this.allProjects.clear();
              for (const e of t) this.allProjects.set(e.id, e);
              this.swipeChooseRef && this.swipeChooseRef.reset()
            },
            immediate: !0
          },
          showResetProjectName: {
            handler: function(t) {},
            immediate: !0
          },
          showRenameDialog: {
            handler: function(t) {},
            immediate: !0
          }
        },
        computed: {
          findNextProjectIndex() {
            let t = this.lastSelectedIndex;
            if (null == t)
              for (let e = this.projects.length - 1; e >= 0; e--) {
                let i = this.projects[e],
                  o = this.isSelected(i);
                if (o) {
                  t = e;
                  break
                }
              }
            return t
          }
        },
        methods: {
          forceUpdate() {
            let t = this.$refs["virtualCollectionRef"];
            t && t.$forceUpdate()
          },
          installShortcuts() {
            this.registerShortcut(), this.registerMouseSelectEvents()
          },
          removeShortcuts() {
            this.unregisterShortcut()
          },
          registerShortcut() {
            null === J["a"] || void 0 === J["a"] || J["a"].on("onKeyboardShortcutInvoked", (t, e) => {
              if ("CommandOrControl+A" != e.name)
                if ("CommandOrControl+D" != e.name) {
                  if ("DeleteOrBackspace" == e.name) {
                    if (1 === this.selectProjects.size) {
                      let t;
                      for (const e of this.selectProjects) {
                        let [i, o] = e;
                        t = o
                      }
                      return void this.remove(t)
                    }
                    if (this.selectProjects.size > 1) return void this.batchRemove(this.selectProjects)
                  }
                } else this.selectedAll(!1);
              else this.selectedAll(!0)
            }), null === J["a"] || void 0 === J["a"] || J["a"].send("registerKeyboardShortcut")
          },
          unregisterShortcut() {
            console.log("注销快捷键事件:}"), null === J["a"] || void 0 === J["a"] || J["a"].removeAllListeners("onKeyboardShortcutInvoked"), this.activeShortcut(!1)
          },
          activeShortcut(t) {
            let e = t ? "registerKeyboardShortcut" : "unRegisterKeyboardShortcut";
            null === J["a"] || void 0 === J["a"] || J["a"].send(e)
          },
          selectedAll(t) {
            if (t) {
              const t = this.projects;
              for (let e of t) this.setSelected(e, !0);
              this.lastSelectedIndex = t.length - 1
            } else this.isOnDragMouseDown || (this.clearSelects(), this.lastSelectedIndex = null), this.isOnDragMouseDown = !1;
            this.forceUpdate()
          },
          isSelected(t) {
            let e = this.selectProjects.get(t.id);
            return null !== e && void 0 !== e
          },
          setSelected(t, e) {
            e ? this.selectProjects.set(t.id, t) : this.selectProjects.delete(t.id)
          },
          clearSelects() {
            this.selectProjects.clear(), this.forceUpdate()
          },
          onLeftMouseClick(t, e) {
            this.selectProjects.clear(), this.selectProjects.set(t.id, t), this.lastSelectedIndex = e - 1, this.forceUpdate()
          },
          onLeftMouseShiftClick(t, e) {
            let i = this.findNextProjectIndex;
            if (null == i) return;
            let o = e - 1,
              s = Math.min(o, i),
              n = Math.max(o, i);
            for (let r = s; r <= n; r++) {
              let t = this.projects[r];
              this.setSelected(t, !0)
            }
            this.forceUpdate()
          },
          onCommandLeftMouseClick(t, e, i) {
            if (t && this.$isWin || !t && this.$isMac) return;
            let o = i - 1,
              s = this.isSelected(e);
            this.setSelected(e, !s), this.lastSelectedIndex = s ? null : o, this.forceUpdate()
          },
          registerMouseSelectEvents() {},
          setSelectItemsInRect(t) {
            this.selectProjects.clear();
            let e = this.$refs["virtualCollectionRef"];
            if (!e) return;
            let i = e.$children;
            if (!i || 0 === i.length) return;
            let o = i[0].$children;
            if (o && Array.isArray(o))
              for (const s of o) {
                let e = s.$el.getBoundingClientRect(),
                  i = {
                    x: e.x,
                    y: e.y + this.$el.scrollTop,
                    w: e.width,
                    h: e.height
                  };
                const o = Z(t, i);
                if (o) {
                  let t = s.$vnode.data.attrs.id;
                  if (t) {
                    const e = this.allProjects.get(t);
                    this.selectProjects.set(e.id, e)
                  }
                }
              }
          },
          closeContextMenu() {
            this.swipeChooseRef && (this.canMouseDragSelection = !0, this.swipeChooseRef.$props.canMouseDown = !0)
          },
          onContextMenuItemClick(t) {
            this.swipeChooseRef && (this.canMouseDragSelection = !0, this.swipeChooseRef.$props.canMouseDown = !0)
          },
          showContextMenu() {
            this.swipeChooseRef && (this.canMouseDragSelection = !1, this.swipeChooseRef.$props.canMouseDown = !1)
          },
          addSwipeChooseComponent() {
            let t = this.$refs["virtualCollectionRef"].$el,
              e = this.$swipeChooseShow(this.$el, {
                acceptEl: {
                  el: t
                },
                eventEl: null,
                canMouseDown: this.canMouseDragSelection,
                isCustomScroll: !1
              }),
              i = this;
            this.swipeChooseRef = e, e.$on("onSelectionChanged", (t, e) => {
              let {
                x: o,
                y: s,
                w: n,
                h: r
              } = t;
              null != o && null != n && (i.isOnDragMouseDown = !0, i.setSelectItemsInRect(t), i.forceUpdate())
            })
          }
        },
        mounted() {}
      });
      var et, it = function() {
          var t = this,
            e = t._self._c;
          return e("VirtualCollection", {
            staticClass: "global__scroll-style",
            style: {
              overflowX: t.showHorizontalSlider ? "scroll" : "hidden"
            },
            attrs: {
              cellSizeAndPositionGetter: t.cellSizeAndPositionGetter,
              collection: t.myItems,
              height: t.height,
              width: t.width,
              scrollToBottomRange: t.bottomNearDistance
            },
            scopedSlots: t._u([{
              key: "cell",
              fn: function(e) {
                return [t._t("default", null, {
                  data: {
                    item: e.data.data,
                    index: e.data.index
                  }
                })]
              }
            }], null, !0)
          }, [e("template", {
            slot: "header"
          }, [e("div", {
            staticClass: "claHeader"
          }, [t._t("header")], 2)])], 2)
        },
        ot = [],
        st = i("00d7"),
        nt = i.n(st),
        rt = i("2ef0"),
        at = function() {
          var t = this,
            e = t._self._c;
          return e("div", {
            staticClass: "claLoadingMoreRoot"
          }, [t.loadingStatus == t.constLoadingStatus.loading ? e("div", {
            staticClass: "claMore"
          }, [e("img", {
            staticClass: "claImg",
            attrs: {
              src: i("2f1f")
            }
          }), e("span", [t._v("正在加载更多~")])]) : t._e(), t.loadingStatus == t.constLoadingStatus.totalEnd ? e("div", {
            staticClass: "claMore"
          }, [t._v("没有更多内容了~")]) : t._e()])
        },
        lt = [];
      (function(t) {
        t[t["none"] = 0] = "none", t[t["loading"] = 1] = "loading", t[t["finished"] = 2] = "finished", t[t["totalEnd"] = 3] = "totalEnd"
      })(et || (et = {}));
      var ct = {
          name: "loadingMore",
          props: {
            loadingStatus: et.none
          },
          data() {
            return {
              constLoadingStatus: {
                ...et
              }
            }
          },
          mounted() {}
        },
        ht = ct,
        ut = (i("7eff"), Object(j["a"])(ht, at, lt, !1, null, "756e3da0", null)),
        dt = ut.exports;
      a["default"].use(nt.a);
      const pt = {
        up: 0,
        down: 1,
        none: -1
      };
      var mt = {
          name: "ts-virtual-collection-view",
          mixins: [h["a"]],
          props: {
            items: {
              type: Array,
              default: function() {
                return []
              }
            },
            height: {
              type: Number,
              default: 0
            },
            width: {
              type: Number,
              default: 0
            },
            itemSize: {
              type: Object,
              default: function() {
                return {
                  width: 10,
                  height: 10
                }
              }
            },
            columns: {
              type: Number,
              default: 5
            },
            contentEdgeSet: {
              type: Object,
              default: function() {
                return {
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0
                }
              }
            },
            lineSpace: {
              type: Object,
              default: function() {
                return {
                  vertical: 0,
                  horizontal: 0
                }
              }
            },
            showHorizontalSlider: {
              type: Boolean,
              default: !1
            }
          },
          data() {
            return {
              bottomNearDistance: 50,
              myItems: [],
              scrollMeasure: {
                lastScrollTop: 0,
                scrollDirection: pt.none
              },
              loadingStatus: et.none,
              loadingMoreRef: null
            }
          },
          watch: {
            columns(t) {},
            items: {
              handler: function(t) {
                let e = [],
                  i = 0;
                for (const o of t) e.push({
                  data: {
                    data: o,
                    index: i
                  }
                }), i++;
                this.myItems = e
              },
              immediate: !0
            },
            loadingStatus: {
              handler: function(t) {},
              immediate: !1
            }
          },
          mounted() {
            this.listenScrollEvents(!0), this.installLoadingMore(this.$el, {
              loadingStatus: et.loading
            })
          },
          beforeDestroy() {
            this.$el.removeChild(this.loadingMoreRef.$el), this.loadingMoreRef = null, this.listenScrollEvents(!1)
          },
          methods: {
            installLoadingMore(t, e) {
              let i = a["default"].extend(dt);
              const o = new i({
                propsData: {
                  ...e
                }
              }).$mount();
              return t.appendChild(o.$el), this.loadingMoreRef = o, o
            },
            canScroll() {
              let t = this.$el;
              if (!t) return !1;
              const e = t.scrollHeight > t.clientHeight || t.offsetHeight > t.clientHeight;
              return e
            },
            showLoadingMore(t) {
              this.loadingStatus = t, this.loadingMoreRef.$props.loadingStatus = t;
              let e = this.canScroll();
              this.loadingMoreRef.$el.style.visibility = e ? "visible" : "hidden"
            },
            triggerBottomEvent: Object(rt["debounce"])((function(t) {
              this.$emit("scrolled-to-bottom-range", null)
            }), 100),
            onScrollEvent(t) {
              const e = t.target,
                i = e.scrollHeight - e.offsetHeight;
              let o = e.scrollTop;
              const s = o - this.scrollMeasure.lastScrollTop;
              this.scrollMeasure.scrollDirection = s > 0 ? pt.down : pt.up, console.log(`onScrollEvent...target.scrollTop < total=${e.scrollTop<i},target.scrollTop > (total - this.bottomNearDistance)=${e.scrollTop>i-this.bottomNearDistance}`), e.scrollTop > i - this.bottomNearDistance && this.scrollMeasure.scrollDirection === pt.down && this.triggerBottomEvent(t), this.scrollMeasure.lastScrollTop = o
            },
            listenScrollEvents(t) {
              let e = this.$el;
              t ? e && e.addEventListener("scroll", this.onScrollEvent) : e && e.removeEventListener("scroll", null)
            },
            cellSizeAndPositionGetter(t, e) {
              const i = Math.floor(e % this.columns),
                o = Math.floor(e / this.columns),
                s = 0 === i ? 0 : this.lineSpace.horizontal,
                n = 0 === o ? 0 : this.lineSpace.vertical,
                r = this.itemSize.width,
                a = this.itemSize.height;
              let l = {
                x: i * (r + s) + this.contentEdgeSet.left,
                y: o * (a + n),
                width: this.itemSize.width,
                height: this.itemSize.height
              };
              return l
            }
          }
        },
        ft = mt,
        gt = (i("9a83"), Object(j["a"])(ft, it, ot, !1, null, "0b46cb5c", null)),
        vt = gt.exports,
        wt = a["default"].extend({
          data() {
            return {
              windowSize: {
                width: 0,
                height: 0
              }
            }
          },
          methods: {
            resetWindowSize() {
              this.windowSize = {
                width: Object(g["j"])(),
                height: Object(g["i"])()
              }
            },
            onWindowResize() {
              this.resetWindowSize()
            },
            listenWinSize(t) {
              t ? window.addEventListener("resize", this.onWindowResize) : window.removeEventListener("resize", this.onWindowResize)
            }
          },
          mounted() {
            this.resetWindowSize(), this.listenWinSize(!0)
          },
          beforeDestroy() {
            this.listenWinSize(!1)
          }
        }),
        yt = (i("0613"), i("3419")),
        St = i("2204"),
        bt = i("eae9"),
        xt = i("6310"),
        Ct = i("b513"),
        Pt = i("2372"),
        jt = i("8ec2"),
        Dt = i("7203");
      let _t = "file",
        Mt = null,
        It = new Map;
      var Et = Object(a["defineComponent"])({
          mixins: [h["a"], u["b"], tt, O, wt, bt["a"]],
          components: {
            TsVirtualCollectionView: vt,
            "el-card": w["Card"],
            optProjectDialog: _,
            ImportProgressDialog: y["a"],
            renameProjectDialog: I["a"],
            "render-icon": {
              props: {
                isLeft: !1,
                iconParam: {
                  type: Object,
                  default: function() {
                    return {
                      projectIcon: null,
                      index: null
                    }
                  }
                }
              },
              data() {
                return {
                  iconPath: null,
                  iconExist: null
                }
              },
              watch: {
                iconParam: {
                  handler: function(t) {
                    this.getFullPath().then(t => {})
                  },
                  immediate: !1
                }
              },
              methods: {
                async getFullPath() {
                  const {
                    projectIcon: t,
                    index: e
                  } = this.iconParam;
                  if (!t) return null;
                  let i = t[e];
                  if (!i) return null;
                  let o = !1;
                  if (o) {
                    let t = ":" + Pt["a"].sep;
                    if (i.indexOf(t) > 0) return i
                  } else if (i.startsWith("/")) return i;
                  Mt || (Mt = await St["a"].getAppRootPath(), Mt.endsWith("/") || (Mt += "/"));
                  const s = Mt + i;
                  let n = It.get(s);
                  if (void 0 !== n && null !== n || (n = await M["a"].isFileExist(s), It.set(s, n)), this.iconExist = n, this.iconExist) {
                    let t = `${_t}://${M["a"].encodeURIComponent(s)}`;
                    this.iconPath = t
                  }
                  return this.iconPath
                }
              },
              render: function(t) {
                return this.iconPath ? this.iconExist ? t("img", {
                  attrs: {
                    src: this.iconPath
                  },
                  class: this.isLeft ? "img bottom-left" : "img"
                }) : t("div", {
                  class: this.isLeft ? "claFmt bottom-left" : "claFmt"
                }, [t("span", {
                  class: "claText",
                  style: "color: #4D4D4D;font-size: 10px"
                }, ["此文件无法预览"])]) : t("div")
              },
              async mounted() {
                await this.getFullPath()
              }
            }
          },
          setup() {
            const {
              PointClickProject: t,
              PointHomeItem: e
            } = Object($["a"])();
            return {
              PointClickProject: t,
              PointHomeItem: e
            }
          },
          data() {
            return {
              CLIENT_NAME: p["b"],
              isLeave: !1,
              inputRenameText: null,
              clickTimer: null,
              exportTimer: null,
              showResetProjectName: !1,
              loadingEl: null,
              fileNameChangeFlagIndex: null,
              chooseItem: !1,
              showImportProgress: !1,
              showRenameDialog: !1,
              importProgress: {},
              dragToWhichItem: null,
              collectionViewSize: {
                width: 0,
                height: 0
              },
              itemSize: {
                width: 234,
                height: 238
              },
              column: 1,
              lazyLoadObj: {
                ratio: 3,
                pageCount: 0,
                singlePageCount: 0
              },
              edgSet: {
                top: 40,
                bottom: 40,
                right: 92,
                left: 100
              },
              titleEdgSet: {
                top: 40,
                bottom: 16,
                right: 92,
                left: 100
              },
              lineSpace: {
                vertical: 40,
                horizontal: 20
              },
              importFilePaths: []
            }
          },
          filters: {
            filterFormatName: g["h"]
          },
          async mounted() {
            let t = await J["a"].send("check_less_memory", {});
            console.log("check less memory result is: ", t), t["isShow"] && this.tsConfirm({
              title: null,
              customTitleEl: `检测到${p["b"]}因您的电脑内存不足导致异常退出，建议您先退出其他软件释放内存或者重启电脑，以便您能够正常使用${p["b"]}`,
              customMessageStyle: "textAlign: left",
              showCancelButton: !1,
              confirmButtonText: "确定"
            }).catch(t => {
              console.log(t)
            }), this.$store.commit("removeALlPresetDefaultExpendKey"), this.$store.commit("setIsExpandFirstPhoto", !0), this.resetCollectionViewDisplayItems(), this.$store.dispatch("project/ACT_GetBatchProjects", {
              rowUpdateTime: null,
              pageCount: this.lazyLoadObj.pageCount
            }).then(() => {
              this._SortProjectsWithUpdateTime()
            }), this.installShortcuts();
            let e = this.$store.state.user.userId;
            this.loadAllPresents({
              userId: e,
              forceReload: !0
            });
            await Object(c["d"])(p["M"]);
            this._SetIsShowNoviceGuide(!1), this.showGuide(1, "guideClass1")
          },
          beforeMount() {},
          beforeDestroy() {
            It.clear(), this.showResetProjectName = !1, this.removeShortcuts()
          },
          computed: {
            ...Object(l["c"])("project", ["projects", "previewRouterName"]),
            ...Object(l["c"])(["userId"]),
            ...Object(l["c"])("config", ["isShowNoviceGuide", "importNoNavigate"]),
            projectList() {
              const t = new d["a"](null, "创建新项目"),
                e = [t],
                i = this.projects || [];
              return console.log("list -----  : " + i.length), e.concat(i)
            },
            lastRowUpdateTime() {
              const t = this.projects;
              if (!t || 0 === t.length) return;
              let e = t[this.projects.length - 1];
              return e.update_time
            }
          },
          async created() {
            null == this.exportTimer && (this.exportTimer = setTimeout(async () => {
              let t = await window.$net.isOnline();
              t && this.asyncInitExportData()
            }, 500))
          },
          watch: {
            windowSize: {
              handler: Object(rt["debounce"])((async function(t) {
                this.resetCollectionViewDisplayItems(), await this.loadNext(this.lazyLoadObj.singlePageCount)
              }), 1),
              immediate: !0
            },
            showRenameDialog: {
              handler: function(t, e) {
                t ? this.unregisterShortcut() : this.registerShortcut()
              },
              immediate: !1
            },
            showResetProjectName: {
              handler: function(t, e) {
                t ? this.unregisterShortcut() : this.registerShortcut()
              },
              immediate: !1
            }
          },
          methods: {
            ...Object(l["b"])(["asyncInitExportSetting", "loadAllPresents"]),
            ...Object(l["b"])(["asyncInitExportData"]),
            ...Object(l["d"])("thumbnail", ["_SetThumbnails"]),
            ...Object(l["d"])("project", ["_SetActiveProjectId", "_SortProjectsWithUpdateTime"]),
            ...Object(l["d"])("config", ["_SetIsShowNoviceGuide"]),
            ...Object(l["b"])("project", ["ACT_InsertProject", "ACT_UpdateProject", "ACT_DeleteProject"]),
            ...Object(l["b"])("thumbnail", ["ACT_GetThumbnails"]),
            getTransFormedDropPaths() {
              let t = window.$dragFiles,
                e = [];
              for (const i of t) e.push(i.path);
              return e
            },
            resetCollectionViewDisplayItems() {
              const t = this.$refs["projectContainerRef"];
              if (!t) return;
              this.collectionViewSize = t.getBoundingClientRect();
              const e = 10,
                i = this.lazyLoadObj.ratio,
                o = this.collectionViewSize.width - this.edgSet.left - this.edgSet.right,
                s = Math.floor(o / (e + this.itemSize.width)),
                n = Math.round(this.collectionViewSize.height / (e + this.itemSize.height));
              this.lazyLoadObj.singlePageCount = Math.round(s * n), this.lazyLoadObj.pageCount = Math.round(i * s * n), console.log("onWindowResize:this.lazyLoadObj.pageCount=" + this.lazyLoadObj.pageCount), this.column = s
            },
            async onRenameConfirm(t) {
              if (null == t || 0 == t.length) return void this.tsNotify({
                type: "error",
                message: "文件名称不能为空！"
              });
              const e = this.projects[this.fileNameChangeFlagIndex - 1];
              if (t === e.name) return this.fileNameChangeFlagIndex = null, void(this.showRenameDialog = !1);
              await this.ACT_UpdateProject({
                id: e.id,
                modify: {
                  visit_time: +new Date,
                  name: t
                }
              });
              const i = this.getProjectNameElByIndex(this.fileNameChangeFlagIndex);
              i.innerText = Object(g["h"])(t), this.fileNameChangeFlagIndex = null, this.showRenameDialog = !1, this.tsNotify({
                message: "重命名成功！"
              })
            },
            handleStopMove(t) {
              t.preventDefault()
            },
            loadError() {
              console.log("==》 加载失败")
            },
            onAddedProjectCallback(t) {
              const e = this.projects,
                i = e.length;
              this.onProjectClick(i, t)
            },
            onAddProjectClick() {
              if (this.isShowNoviceGuide) return;
              let t = async () => {
                let t = await window.$net.isOnline();
                t ? (this.showResetProjectName = !0, this.PointHomeItem("add_new_project")) : this.tsNotify({
                  type: "error",
                  message: "当前无网络"
                })
              };
              this.$root.checkDiskSpaceIfNeed(() => {
                t()
              }).then(e => {
                e || t()
              })
            },
            projectClickHandler(t, e, i) {
              "dblclick" === i ? (this.clickTimer && clearTimeout(this.clickTimer), this.onProjectClick(t, e), this.PointClickProject(e.thumbnailCounts)) : (this.clickTimer && clearTimeout(this.clickTimer), this.clickTimer = setTimeout(i => {
                this.onProjectClick(t, e), this.PointClickProject(e.thumbnailCounts)
              }, 300))
            },
            async onProjectClick(t, e) {
              this._SetThumbnails([]);
              const i = t - 1;
              let o;
              this._SetActiveProjectId(e.id), await jt["a"].instance().setCurrentProjectId(e.id), this.ACT_UpdateProject({
                id: e.id,
                modify: {
                  visit_time: +new Date
                }
              });
              let s = {};
              o = e.path && e.path.length > 0 ? 1 == e.path.length && "" == e.path[0] ? "project" : this.previewRouterName : "project", this.isLeave = !0, this.$router.push({
                name: o,
                query: {
                  index: i,
                  ...s
                }
              })
            },
            onImportFileClick(t) {
              this.tsConfirm({
                title: "系统提示",
                message: "该项目关联的文件不存在，请重新导入文件",
                showCancelButton: !1
              }).then(e => {
                this.loadingEl = this.$loading({
                  lock: !0,
                  text: "正在删除工程数据中",
                  background: "rgba(0, 0, 0, 0.5)"
                });
                let i = this.projects[t];
                this.clearProject(i, t).then(e => {
                  this.loadingEl && (this.loadingEl.close(), this.loadingEl = null), this.$router.push({
                    name: "project",
                    query: {
                      index: t
                    }
                  })
                }).catch(t => {
                  this.loadingEl && (this.loadingEl.close(), this.loadingEl = null), console.error(t)
                })
              })
            },
            async clearProject(t) {
              try {
                await v["a"].delete(p["P"], "projectId", t.id), await this.ACT_AsyncUpdateProject({
                  id: t.id,
                  path: null,
                  thumbnailPaths: null,
                  importTimes: 0,
                  thumbnailNumber: 0
                }), this.deleteProjectCache(t)
              } catch (e) {
                return console.error(e), Promise.reject(e)
              }
            },
            isProjectExist(t) {
              if (null == t.path || 0 == t.path.length) return !1;
              let e = !0;
              for (let i = 0; i < t.path.length; i++)
                if (!M["a"].isFileExist(t.path[i])) return e = !1, e;
              return e
            },
            async onScrolledToBottomRange() {
              await this.loadNext()
            },
            async loadNext(t) {
              let e = this.$refs["virtualCollectionRef"];
              if (!e) return Promise.reject("the virtualCollectionRef is empty!!!");
              try {
                let i = this.lastRowUpdateTime,
                  o = et.loading;
                if (e.showLoadingMore(o), await this.$store.dispatch("project/ACT_GetBatchProjects", {
                    rowUpdateTime: this.lastRowUpdateTime,
                    pageCount: t || this.lazyLoadObj.pageCount
                  }), o = this.lastRowUpdateTime === i ? et.totalEnd : et.finished, o === et.finished) {
                  const t = await Object(yt["a"])(this.userId, this.lastRowUpdateTime);
                  t || (o = et.totalEnd)
                }
                console.log("onScrolledToBottomRange:", o === et.totalEnd ? "加载到底了!!!" : "单次加载成功了!!!"), e.showLoadingMore(o)
              } catch (i) {
                console.log("onScrolledToBottomRange has error", i)
              }
            },
            getProjectNameElByIndex(t) {
              if (!this.$refs.virtualCollectionRef) return null;
              const e = this.$refs.virtualCollectionRef.$children[0].$children[t];
              if (!e) return null;
              const i = e.$el.getElementsByClassName("project-name")[0];
              return i
            },
            async handleNodeContextmenu(t, e) {
              const i = this.getProjectNameElByIndex(t);
              if (null !== this.fileNameChangeFlagIndex && i && 0 === i.innerText.length) this.div.focus();
              else {
                this.showContextMenu();
                const i = new Dt["a"];
                this.selectProjects.size <= 1 && i.push({
                  label: "重命名",
                  action: "home__project-rename",
                  disabled: !1,
                  data: e,
                  callback: e => {
                    this.inputRenameText = e.name, this.showRenameDialog = !0, this.fileNameChangeFlagIndex = t
                  }
                }), this.selectProjects.size > 1 ? i.push({
                  label: "批量删除",
                  action: "home__project-batch-delete",
                  disabled: !1,
                  data: this.selectProjects,
                  callback: this.batchRemove
                }) : i.push({
                  label: "删除",
                  action: "home__project-delete",
                  disabled: !1,
                  data: e,
                  callback: this.remove
                }), i.show(t => {
                  this.onContextMenuItemClick(t)
                })
              }
            },
            onDropOverHanlder(t) {
              this.dragToWhichItem = t
            },
            onDropLeaveHanlder(t) {
              this.dragToWhichItem = null
            },
            onDropHanlder: Object(rt["debounce"])((async function(t, e, i) {
              let o = !(!i || !i.path || 0 === i.path.length || 1 === i.path.length && "" === i.path[0]);
              if (o && !this.checkCanImport()) return;
              i.id, i.name;
              this.chooseItem = !0, this._SetActiveProjectId(i.id), await jt["a"].instance().setCurrentProjectId(i.id), this.dragToWhichItem = null, await this.importImagesOnHome(t, o, t => {
                this.importNoNavigate || this.$router.push({
                  name: this.previewRouterName,
                  query: {
                    thumbnailCount: t,
                    activeMode: m["a"].PALETTE,
                    scrollToIndex: o,
                    isfromHome: !0
                  }
                })
              }, t => {
                t.status === f["b"].Start && (this.showImportProgress = !0), t.status === f["b"].ImportEmpty && null === i && this.ACT_DeleteProject(this.projects[e - 1].id), this.importProgress = t
              })
            }), 1e3),
            onDropOverHanlderWrap() {
              this.chooseItem = !1
            },
            convertDataTransferFiles(t) {
              const e = [...t];
              let i = [];
              for (let o of e) {
                let t = o.path;
                i.push(t)
              }
              return i
            },
            async onDropHanlderWrap(t) {
              let e = async t => {
                if (!1 === this.chooseItem) {
                  if (!this.checkCanImport()) return;
                  try {
                    this.bIsCancelImport = !1, this.importProgress = {};
                    const i = t;
                    let o = [];
                    for (let t of i) {
                      let e = t.path;
                      o.push(e)
                    }
                    const s = await this.hasReadWritePermission(o);
                    if (1 !== s.result) return void this.toastNoReadWritePermission(s);
                    this.showImportProgress = !0, this.needDeleteImportProject = !0;
                    const n = i[0].path,
                      r = await Ct["a"].statSync(n);
                    let a = r.isFile(),
                      l = i[0].name;
                    if (a) {
                      const t = await xt["b"].path.extname(l);
                      l = l.replace(t, "")
                    }
                    const c = new d["a"](this.userId, l, null);
                    if (c.visit_time = (new Date).getTime(), this.bIsCancelImport) return;
                    let h = {};
                    try {
                      h = await this.ACT_InsertProject(c)
                    } catch (e) {
                      this.tsNotify({
                        type: "error",
                        message: e.message
                      })
                    }
                    if (!h.id) return void(this.showImportProgress = !1);
                    if (this.bIsCancelImport) return void await v["a"].delete(p["J"], "id", h.id);
                    let u = 1;
                    this.onDropHanlder(o, u, h)
                  } catch (i) {
                    this.tsNotify({
                      type: "error",
                      message: i.message
                    })
                  }
                }
              }, i = [...this.getDropPaths()];
              this.$root.checkDiskSpaceIfNeed(() => {
                e(i)
              }).then(t => {
                t || e(i)
              }), this.guideQuit("guideClass1")
            }
          }
        }),
        Tt = Et,
        kt = (i("2482"), Object(j["a"])(Tt, n, r, !1, null, "6feaecfc", null)),
        Rt = kt.exports,
        $t = {
          name: "HomeIndex",
          components: {
            HomeView: Rt
          }
        },
        Ot = $t,
        Nt = (i("b763"), Object(j["a"])(Ot, o, s, !1, null, "40f2a119", null));
      e["default"] = Nt.exports
    },
    2482: function(t, e, i) {
      "use strict";
      i("5dff")
    },
    "2c5a": function(t, e, i) {},
    5663: function(t, e, i) {},
    "5dff": function(t, e, i) {},
    6381: function(t, e, i) {},
    "7eff": function(t, e, i) {
      "use strict";
      i("2c5a")
    },
    "9a83": function(t, e, i) {
      "use strict";
      i("6381")
    },
    "9af6": function(t, e, i) {},
    b763: function(t, e, i) {
      "use strict";
      i("5663")
    },
    e2a4: function(t, e, i) {
      "use strict";
      i("9af6")
    },
    eae9: function(t, e, i) {
      "use strict";
      var o = i("2b0e"),
        s = i("25c2");
      const n = {
        totalStep: 6,
        step1: {
          text: `试试直接拖拽文件夹或多张图片到这里，开始探索${s["b"]}吧~`,
          num: 1
        },
        step2: {
          text: "点击应用预设",
          num: 2
        },
        step3: {
          text: "拖动滑杆调整图片",
          num: 3
        },
        step4: {
          text: "按住shift选中图片",
          num: 4
        },
        step5: {
          text: "将当前调整应用至选中图片",
          num: 5
        },
        step6: {
          text: "不需要等待全部效果加载完毕，就可以直接导出",
          num: 6
        }
      };
      var r = i("442f"),
        a = i("2f62"),
        l = i("45a3"),
        c = i("c5da"),
        h = i("52b8");
      class u {
        constructor() {
          this.actionableStyle = "background: transparent;z-index: 501;position: relative;", this.bgStyle = "background: #000;width: 100%;height: 100%;position: absolute;top: 0;left: 0;z-index: 500;opacity: 0.4;filter: Alpha(opacity=30)"
        }
        addMask() {
          this.myBg = document.createElement("div"), this.myBg.setAttribute("style", this.bgStyle), document.body.appendChild(this.myBg)
        }
        addActionable(t) {
          let e = document.getElementsByClassName(t)[0];
          e && e.setAttribute("style", this.actionableStyle)
        }
        removeMask() {
          document.body.removeChild(this.myBg)
        }
        showGuide(t, e) {
          this.addActionable(e)
        }
        close() {
          this.removeMask()
        }
      }
      const d = o["default"].extend({
          template: `<div class="tempStep1"><div style="width:296px" class="tempStep_textBox"><p>${n.step1.text}</p><span id="guideQuit">退出(${n.step1.num}/${n.totalStep})</span></div></div>`
        }),
        p = o["default"].extend({
          template: `<div class="tempStep2">\n        <div style="width:136px" class="tempStep_textBox">\n            <p>${n.step2.text}</p>\n            <span id="guideQuit">退出(${n.step2.num}/${n.totalStep})</span>\n        </div>\n        <span class="tempStep2-line"></span>\n        <span class="tempStep2-dotted"></span>\n        <span class="tempStep2-circle"></span>\n    </div>`
        }),
        m = o["default"].extend({
          template: `<div class="tempStep3">\n        <div style="width:168px" class="tempStep_textBox">\n            <p>${n.step3.text}</p>\n            <span id="guideQuit">退出(${n.step3.num}/${n.totalStep})</span>\n        </div>\n        <span class="tempStep3-line"></span>\n        <span class="tempStep3-dotted"></span>\n        <span class="tempStep3-circle"></span>\n    </div>`
        }),
        f = o["default"].extend({
          template: `<div class="tempStep4">\n        <span class="tempStep4-circle"></span>\n        <span class="tempStep4-line"></span>\n        <span class="tempStep4-dotted"></span>\n        <div style="width:170px" class="tempStep_textBox">\n            <p>${n.step4.text}</p>\n            <span id="guideQuit">退出(${n.step4.num}/${n.totalStep})</span>\n        </div>\n    </div>`
        }),
        g = o["default"].extend({
          template: `<div class="tempStep5">\n        <div style="width:232px" class="tempStep_textBox">\n            <p>${n.step5.text}</p>\n            <span id="guideQuit">退出(${n.step5.num}/${n.totalStep})</span>\n        </div>\n        <span class="tempStep5-line"></span>\n        <span class="tempStep5-dotted"></span>\n        <span class="tempStep5-circle"></span>\n\n    </div>`
        }),
        v = o["default"].extend({
          template: `<div class="tempStep6">\n        <span class="tempStep6-circle"></span>\n        <span class="tempStep6-dotted"></span>\n        <span class="tempStep6-line"></span>\n        <div style="width:264px" class="tempStep_textBox">\n            <p>${n.step6.text}</p>\n            <span id="guideQuit">退出(${n.step6.num}/${n.totalStep})</span>\n        </div>\n    </div>`
        });
      e["a"] = {
        data() {
          return {
            step: 1,
            guidMask: null,
            tempDiv: null
          }
        },
        mixins: [r["a"], h["a"]],
        mounted() {},
        computed: {
          ...Object(a["c"])("config", ["isShowNoviceGuide"])
        },
        methods: {
          ...Object(a["d"])("config", ["_SetIsShowNoviceGuide", "_SetGuideStep"]),
          showGuide(t, e) {
            this.step = t, this.$nextTick(async i => {
              if (this.isShowNoviceGuide) {
                this._SetGuideStep(t), this.PointInitGuide(t);
                const i = await Object(c["d"])(s["M"]);
                i || await l["a"].insertToDB(s["e"], {
                  keyword: s["M"],
                  value: s["a"]
                });
                const o = new u;
                this.guidMask = o, o.addMask(), o.showGuide(t, e), this.commonMountFunc(t, e);
                const n = document.getElementById("guideQuit");
                n && n.addEventListener("click", i => {
                  this.allGuideQuit(t, e)
                })
              }
            })
          },
          commonMountFunc(t, e) {
            const i = document.createElement("div");
            i.setAttribute("id", e + "-tempDiv");
            let o = document.getElementsByClassName(e)[0];
            switch (o && o.parentNode.appendChild(i), t) {
              case 1:
                (new d).$mount(`#${e}-tempDiv`);
                break;
              case 2:
                (new p).$mount(`#${e}-tempDiv`);
                break;
              case 3:
                (new m).$mount(`#${e}-tempDiv`);
                break;
              case 4:
                (new f).$mount(`#${e}-tempDiv`);
                break;
              case 5:
                (new g).$mount(`#${e}-tempDiv`);
                break;
              case 6:
                (new v).$mount(`#${e}-tempDiv`);
                break
            }
          },
          async guideQuit(t) {
            if (!this.isShowNoviceGuide) return !1;
            document.getElementsByClassName(t)[0].removeAttribute("style"), this.guidMask.close();
            let e = document.getElementsByClassName("tempStep" + this.step)[0];
            document.getElementsByClassName(t)[0].parentNode.removeChild(e);
            const i = document.getElementById("guideQuit");
            i && i.removeEventListener("click", () => {})
          },
          allGuideQuit(t, e) {
            this.tsConfirm({
              title: "确认退出新手引导",
              message: "您也可以在右上角新手教程中查看具体教程",
              customMessageStyle: "textAlign: center"
            }).then(() => {
              this.guideQuit(e), this._SetIsShowNoviceGuide(!1), this.PointClickQuit(t)
            }).catch(() => {})
          }
        }
      }
    }
  }
]);
//# sourceMappingURL=chunk-d650e566.9fac4b6d.js.map