!
function (a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
}(function (a) {
    var b = 0,
        c = Array.prototype.slice;
    return a.cleanData = function (b) {
        return function (c) {
            var d, e, f;
            for (f = 0; null != (e = c[f]); f++) try {
                d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")
            } catch (g) {}
            b(c)
        }
    }(a.cleanData), a.widget = function (b, c, d) {
        var e, f, g, h, i = {},
            j = b.split(".")[0];
        return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function (b) {
            return !!a.data(b, e)
        }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function (a, b) {
            return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)
        }, a.extend(g, f, {
            version: d.version,
            _proto: a.extend({}, d),
            _childConstructors: []
        }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function (b, d) {
            return a.isFunction(d) ? void(i[b] = function () {
                var a = function () {
                        return c.prototype[b].apply(this, arguments)
                    },
                    e = function (a) {
                        return c.prototype[b].apply(this, a)
                    };
                return function () {
                    var b, c = this._super,
                        f = this._superApply;
                    return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
                }
            }()) : void(i[b] = d)
        }), g.prototype = a.widget.extend(h, {
            widgetEventPrefix: f ? h.widgetEventPrefix || b : b
        }, i, {
            constructor: g,
            namespace: j,
            widgetName: b,
            widgetFullName: e
        }), f ? (a.each(f._childConstructors, function (b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g
    }, a.widget.extend = function (b) {
        for (var d, e, f = c.call(arguments, 1), g = 0, h = f.length; h > g; g++) for (d in f[g]) e = f[g][d], f[g].hasOwnProperty(d) && void 0 !== e && (b[d] = a.isPlainObject(e) ? a.isPlainObject(b[d]) ? a.widget.extend({}, b[d], e) : a.widget.extend({}, e) : e);
        return b
    }, a.widget.bridge = function (b, d) {
        var e = d.prototype.widgetFullName || b;
        a.fn[b] = function (f) {
            var g = "string" == typeof f,
                h = c.call(arguments, 1),
                i = this;
            return f = !g && h.length ? a.widget.extend.apply(null, [f].concat(h)) : f, this.each(g ?
            function () {
                var c, d = a.data(this, e);
                return "instance" === f ? (i = d, !1) : d ? a.isFunction(d[f]) && "_" !== f.charAt(0) ? (c = d[f].apply(d, h), c !== d && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")
            } : function () {
                var b = a.data(this, e);
                b ? (b.option(f || {}), b._init && b._init()) : a.data(this, e, new d(f, this))
            }), i
        }
    }, a.Widget = function () {}, a.Widget._childConstructors = [], a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function (c, d) {
            d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = b++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), c), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function (a) {
                    a.target === d && this.destroy()
                }
            }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: a.noop,
        _getCreateEventData: a.noop,
        _create: a.noop,
        _init: a.noop,
        destroy: function () {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: a.noop,
        widget: function () {
            return this.element
        },
        option: function (b, c) {
            var d, e, f, g = b;
            if (0 === arguments.length) return a.widget.extend({}, this.options);
            if ("string" == typeof b) if (g = {}, d = b.split("."), b = d.shift(), d.length) {
                for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; f < d.length - 1; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]];
                if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];
                e[b] = c
            } else {
                if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];
                g[b] = c
            }
            return this._setOptions(g), this
        },
        _setOptions: function (a) {
            var b;
            for (b in a) this._setOption(b, a[b]);
            return this
        },
        _setOption: function (a, b) {
            return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !! b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this
        },
        enable: function () {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function () {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function (b, c, d) {
            var e, f = this;
            "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function (d, g) {
                function h() {
                    return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
                }
                "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
                var i = d.match(/^([\w:-]*)\s*(.*)$/),
                    j = i[1] + f.eventNamespace,
                    k = i[2];
                k ? e.delegate(k, j, h) : c.bind(j, h)
            })
        },
        _off: function (a, b) {
            b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
        },
        _delay: function (a, b) {
            function c() {
                return ("string" == typeof a ? d[a] : a).apply(d, arguments)
            }
            var d = this;
            return setTimeout(c, b || 0)
        },
        _hoverable: function (b) {
            this.hoverable = this.hoverable.add(b), this._on(b, {
                mouseenter: function (b) {
                    a(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function (b) {
                    a(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function (b) {
            this.focusable = this.focusable.add(b), this._on(b, {
                focusin: function (b) {
                    a(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function (b) {
                    a(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function (b, c, d) {
            var e, f, g = this.options[b];
            if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent) for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
        }
    }, a.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function (b, c) {
        a.Widget.prototype["_" + b] = function (d, e, f) {
            "string" == typeof e && (e = {
                effect: e
            });
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {}, "number" == typeof e && (e = {
                duration: e
            }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
                a(this)[b](), f && f.call(d[0]), c()
            })
        }
    }), a.widget
}), function (a) {
    "function" == typeof define && define.amd ? define(["jquery", "./widget"], a) : a(jQuery)
}(function (a) {
    var b = !1;
    return a(document).mouseup(function () {
        b = !1
    }), a.widget("ui.mouse", {
        version: "1.11.1",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function () {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function (a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function (c) {
                return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
            }), this.started = !1
        },
        _mouseDestroy: function () {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function (c) {
            if (!b) {
                this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
                var d = this,
                    e = 1 === c.which,
                    f = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : !1;
                return e && !f && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                    d.mouseDelayMet = !0
                }, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
                    return d._mouseMove(a)
                }, this._mouseUpDelegate = function (a) {
                    return d._mouseUp(a)
                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), b = !0, !0)) : !0
            }
        },
        _mouseMove: function (b) {
            return a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button ? this._mouseUp(b) : b.which ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
        },
        _mouseUp: function (c) {
            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, c.target === this._mouseDownEvent.target && a.data(c.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(c)), b = !1, !1
        },
        _mouseDistanceMet: function (a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function () {
            return this.mouseDelayMet
        },
        _mouseStart: function () {},
        _mouseDrag: function () {},
        _mouseStop: function () {},
        _mouseCapture: function () {
            return !0
        }
    })
}), !
function (a) {
    function b(a, b) {
        if (!(a.originalEvent.touches.length > 1)) {
            a.preventDefault();
            var c = a.originalEvent.changedTouches[0],
                d = document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }
    if (a.support.touch = "ontouchend" in document, a.support.touch) {
        var c, d = a.ui.mouse.prototype,
            e = d._mouseInit,
            f = d._mouseDestroy;
        d._touchStart = function (a) {
            var d = this;
            !c && d._mouseCapture(a.originalEvent.changedTouches[0]) && (c = !0, d._touchMoved = !1, b(a, "mouseover"), b(a, "mousemove"), b(a, "mousedown"))
        }, d._touchMove = function (a) {
            c && (this._touchMoved = !0, b(a, "mousemove"))
        }, d._touchEnd = function (a) {
            c && (b(a, "mouseup"), b(a, "mouseout"), this._touchMoved || b(a, "click"), c = !1)
        }, d._mouseInit = function () {
            var b = this;
            b.element.bind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), e.call(b)
        }, d._mouseDestroy = function () {
            var b = this;
            b.element.unbind({
                touchstart: a.proxy(b, "_touchStart"),
                touchmove: a.proxy(b, "_touchMove"),
                touchend: a.proxy(b, "_touchEnd")
            }), f.call(b)
        }
    }
}(jQuery), function (a, b, c) {
    "function" == typeof define && define.amd ? define(["jquery"], function (d) {
        return c(d, a, b), d.mobile
    }) : c(a.jQuery, a, b)
}(this, document, function (a, b, c) {
    !
    function (a, b, c, d) {
        function e(a) {
            for (; a && "undefined" != typeof a.originalEvent;) a = a.originalEvent;
            return a
        }
        function f(b, c) {
            var f, g, h, i, j, k, l, m, n, o = b.type;
            if (b = a.Event(b), b.type = c, f = b.originalEvent, g = a.event.props, o.search(/^(mouse|click)/) > -1 && (g = E), f) for (l = g.length, i; l;) i = g[--l], b[i] = f[i];
            if (o.search(/mouse(down|up)|click/) > -1 && !b.which && (b.which = 1), -1 !== o.search(/^touch/) && (h = e(f), o = h.touches, j = h.changedTouches, k = o && o.length ? o[0] : j && j.length ? j[0] : d, k)) for (m = 0, n = C.length; n > m; m++) i = C[m], b[i] = k[i];
            return b
        }
        function g(b) {
            for (var c, d, e = {}; b;) {
                c = a.data(b, z);
                for (d in c) c[d] && (e[d] = e.hasVirtualBinding = !0);
                b = b.parentNode
            }
            return e
        }
        function h(b, c) {
            for (var d; b;) {
                if (d = a.data(b, z), d && (!c || d[c])) return b;
                b = b.parentNode
            }
            return null
        }
        function i() {
            M = !1
        }
        function j() {
            M = !0
        }
        function k() {
            Q = 0, K.length = 0, L = !1, j()
        }
        function l() {
            i()
        }
        function m() {
            n(), G = setTimeout(function () {
                G = 0, k()
            }, a.vmouse.resetTimerDuration)
        }
        function n() {
            G && (clearTimeout(G), G = 0)
        }
        function o(b, c, d) {
            var e;
            return (d && d[b] || !d && h(c.target, b)) && (e = f(c, b), a(c.target).trigger(e)), e
        }
        function p(b) {
            var c, d = a.data(b.target, A);
            !L && (!Q || Q !== d) && (c = o("v" + b.type, b), c && (c.isDefaultPrevented() && b.preventDefault(), c.isPropagationStopped() && b.stopPropagation(), c.isImmediatePropagationStopped() && b.stopImmediatePropagation()))
        }
        function q(b) {
            var c, d, f, h = e(b).touches;
            h && 1 === h.length && (c = b.target, d = g(c), d.hasVirtualBinding && (Q = P++, a.data(c, A, Q), n(), l(), J = !1, f = e(b).touches[0], H = f.pageX, I = f.pageY, o("vmouseover", b, d), o("vmousedown", b, d)))
        }
        function r(a) {
            M || (J || o("vmousecancel", a, g(a.target)), J = !0, m())
        }
        function s(b) {
            if (!M) {
                var c = e(b).touches[0],
                    d = J,
                    f = a.vmouse.moveDistanceThreshold,
                    h = g(b.target);
                J = J || Math.abs(c.pageX - H) > f || Math.abs(c.pageY - I) > f, J && !d && o("vmousecancel", b, h), o("vmousemove", b, h), m()
            }
        }
        function t(a) {
            if (!M) {
                j();
                var b, c, d = g(a.target);
                o("vmouseup", a, d), J || (b = o("vclick", a, d), b && b.isDefaultPrevented() && (c = e(a).changedTouches[0], K.push({
                    touchID: Q,
                    x: c.clientX,
                    y: c.clientY
                }), L = !0)), o("vmouseout", a, d), J = !1, m()
            }
        }
        function u(b) {
            var c, d = a.data(b, z);
            if (d) for (c in d) if (d[c]) return !0;
            return !1
        }
        function v() {}
        function w(b) {
            var c = b.substr(1);
            return {
                setup: function () {
                    u(this) || a.data(this, z, {});
                    var d = a.data(this, z);
                    d[b] = !0, F[b] = (F[b] || 0) + 1, 1 === F[b] && O.bind(c, p), a(this).bind(c, v), N && (F.touchstart = (F.touchstart || 0) + 1, 1 === F.touchstart && O.bind("touchstart", q).bind("touchend", t).bind("touchmove", s).bind("scroll", r))
                },
                teardown: function () {
                    --F[b], F[b] || O.unbind(c, p), N && (--F.touchstart, F.touchstart || O.unbind("touchstart", q).unbind("touchmove", s).unbind("touchend", t).unbind("scroll", r));
                    var d = a(this),
                        e = a.data(this, z);
                    e && (e[b] = !1), d.unbind(c, v), u(this) || d.removeData(z)
                }
            }
        }
        var x, y, z = "virtualMouseBindings",
            A = "virtualTouchID",
            B = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),
            C = "clientX clientY pageX pageY screenX screenY".split(" "),
            D = a.event.mouseHooks ? a.event.mouseHooks.props : [],
            E = a.event.props.concat(D),
            F = {},
            G = 0,
            H = 0,
            I = 0,
            J = !1,
            K = [],
            L = !1,
            M = !1,
            N = "addEventListener" in c,
            O = a(c),
            P = 1,
            Q = 0;
        for (a.vmouse = {
            moveDistanceThreshold: 10,
            clickDistanceThreshold: 10,
            resetTimerDuration: 1500
        }, y = 0; y < B.length; y++) a.event.special[B[y]] = w(B[y]);
        N && c.addEventListener("click", function (b) {
            var c, d, e, f, g, h, i = K.length,
                j = b.target;
            if (i) for (c = b.clientX, d = b.clientY, x = a.vmouse.clickDistanceThreshold, e = j; e;) {
                for (f = 0; i > f; f++) if (g = K[f], h = 0, e === j && Math.abs(g.x - c) < x && Math.abs(g.y - d) < x || a.data(e, A) === g.touchID) return b.preventDefault(), void b.stopPropagation();
                e = e.parentNode
            }
        }, !0)
    }(a, b, c), function (a) {
        a.mobile = {}
    }(a), function (a) {
        var b = {
            touch: "ontouchend" in c
        };
        a.mobile.support = a.mobile.support || {}, a.extend(a.support, b), a.extend(a.mobile.support, b)
    }(a), function (a, b, d) {
        function e(b, c, e, f) {
            var g = e.type;
            e.type = c, f ? a.event.trigger(e, d, b) : a.event.dispatch.call(b, e), e.type = g
        }
        var f = a(c),
            g = a.mobile.support.touch,
            h = "touchmove scroll",
            i = g ? "touchstart" : "mousedown",
            j = g ? "touchend" : "mouseup",
            k = g ? "touchmove" : "mousemove";
        a.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "), function (b, c) {
            a.fn[c] = function (a) {
                return a ? this.bind(c, a) : this.trigger(c)
            }, a.attrFn && (a.attrFn[c] = !0)
        }), a.event.special.scrollstart = {
            enabled: !0,
            setup: function () {
                function b(a, b) {
                    c = b, e(f, c ? "scrollstart" : "scrollstop", a)
                }
                var c, d, f = this,
                    g = a(f);
                g.bind(h, function (e) {
                    a.event.special.scrollstart.enabled && (c || b(e, !0), clearTimeout(d), d = setTimeout(function () {
                        b(e, !1)
                    }, 50))
                })
            },
            teardown: function () {
                a(this).unbind(h)
            }
        }, a.event.special.tap = {
            tapholdThreshold: 750,
            emitTapOnTaphold: !0,
            setup: function () {
                var b = this,
                    c = a(b),
                    d = !1;
                c.bind("vmousedown", function (g) {
                    function h() {
                        clearTimeout(k)
                    }
                    function i() {
                        h(), c.unbind("vclick", j).unbind("vmouseup", h), f.unbind("vmousecancel", i)
                    }
                    function j(a) {
                        i(), d || l !== a.target ? d && a.preventDefault() : e(b, "tap", a)
                    }
                    if (d = !1, g.which && 1 !== g.which) return !1;
                    var k, l = g.target;
                    c.bind("vmouseup", h).bind("vclick", j), f.bind("vmousecancel", i), k = setTimeout(function () {
                        a.event.special.tap.emitTapOnTaphold || (d = !0), e(b, "taphold", a.Event("taphold", {
                            target: l
                        }))
                    }, a.event.special.tap.tapholdThreshold)
                })
            },
            teardown: function () {
                a(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"), f.unbind("vmousecancel")
            }
        }, a.event.special.swipe = {
            scrollSupressionThreshold: 30,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 30,
            getLocation: function (a) {
                var c = b.pageXOffset,
                    d = b.pageYOffset,
                    e = a.clientX,
                    f = a.clientY;
                return 0 === a.pageY && Math.floor(f) > Math.floor(a.pageY) || 0 === a.pageX && Math.floor(e) > Math.floor(a.pageX) ? (e -= c, f -= d) : (f < a.pageY - d || e < a.pageX - c) && (e = a.pageX - c, f = a.pageY - d), {
                    x: e,
                    y: f
                }
            },
            start: function (b) {
                var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                    d = a.event.special.swipe.getLocation(c);
                return {
                    time: (new Date).getTime(),
                    coords: [d.x, d.y],
                    origin: a(b.target)
                }
            },
            stop: function (b) {
                var c = b.originalEvent.touches ? b.originalEvent.touches[0] : b,
                    d = a.event.special.swipe.getLocation(c);
                return {
                    time: (new Date).getTime(),
                    coords: [d.x, d.y]
                }
            },
            handleSwipe: function (b, c, d, f) {
                if (c.time - b.time < a.event.special.swipe.durationThreshold && Math.abs(b.coords[0] - c.coords[0]) > a.event.special.swipe.horizontalDistanceThreshold && Math.abs(b.coords[1] - c.coords[1]) < a.event.special.swipe.verticalDistanceThreshold) {
                    var g = b.coords[0] > c.coords[0] ? "swipeleft" : "swiperight";
                    return e(d, "swipe", a.Event("swipe", {
                        target: f,
                        swipestart: b,
                        swipestop: c
                    }), !0), e(d, g, a.Event(g, {
                        target: f,
                        swipestart: b,
                        swipestop: c
                    }), !0), !0
                }
                return !1
            },
            eventInProgress: !1,
            setup: function () {
                var b, c = this,
                    d = a(c),
                    e = {};
                b = a.data(this, "mobile-events"), b || (b = {
                    length: 0
                }, a.data(this, "mobile-events", b)), b.length++, b.swipe = e, e.start = function (b) {
                    if (!a.event.special.swipe.eventInProgress) {
                        a.event.special.swipe.eventInProgress = !0;
                        var d, g = a.event.special.swipe.start(b),
                            h = b.target,
                            i = !1;
                        e.move = function (b) {
                            g && !b.isDefaultPrevented() && (d = a.event.special.swipe.stop(b), i || (i = a.event.special.swipe.handleSwipe(g, d, c, h), i && (a.event.special.swipe.eventInProgress = !1)), Math.abs(g.coords[0] - d.coords[0]) > a.event.special.swipe.scrollSupressionThreshold && b.preventDefault())
                        }, e.stop = function () {
                            i = !0, a.event.special.swipe.eventInProgress = !1, f.off(k, e.move), e.move = null
                        }, f.on(k, e.move).one(j, e.stop)
                    }
                }, d.on(i, e.start)
            },
            teardown: function () {
                var b, c;
                b = a.data(this, "mobile-events"), b && (c = b.swipe, delete b.swipe, b.length--, 0 === b.length && a.removeData(this, "mobile-events")), c && (c.start && a(this).off(i, c.start), c.move && f.off(k, c.move), c.stop && f.off(j, c.stop))
            }
        }, a.each({
            scrollstop: "scrollstart",
            taphold: "tap",
            swipeleft: "swipe.left",
            swiperight: "swipe.right"
        }, function (b, c) {
            a.event.special[b] = {
                setup: function () {
                    a(this).bind(c, a.noop)
                },
                teardown: function () {
                    a(this).unbind(c)
                }
            }
        })
    }(a, this)
});
var myapp = angular.module("eventsGlue", []);
myapp.directive("swapBgs", [function () {
    return {
        restrict: "EA",
        link: function (a, b) {
            function c(a) {
                var c = b.find(".bg");
                setTimeout(function () {
                    c.remove()
                }, 4100);
                var d = document.createElement("div");
                d.className += "bg bg" + a, b.append(d), setTimeout(function () {
                    d.className += " show"
                }, 20)
            }
            function d(a) {
                var b = 1;
                setInterval(function () {
                    c(b % 5 + 1), b++
                }, a)
            }
            d(8e3)
        }
    }
}]), myapp.directive("widgetTrigger", [function () {
    return {
        restrict: "EA",
        link: function (a, b) {
            console.log(b), b.on("click", function () {
                b.parent().siblings().find(".widget-trigger").addClass("collapsed");
                var a = $(b.attr("data-target"));
                a.siblings().removeClass("in")
            })
        }
    }
}]), myapp.directive("uiCalendar", [function () {
    return {
        restrict: "EA",
        link: function (a, b) {
            var c = b.find(".cal"),
                d = b.find(".calendar-trigger");
            c.datepicker(), d.on("click", function () {
                $.datepicker._showDatepicker(c[0])
            })
        }
    }
}]), myapp.directive("imageGallery", [function () {
    return {
        restrict: "EA",
        link: function (a, b) {
            var c = b.find(".carousel"),
                d = b.find(".item img"),
                e = b.find(".caption"),
                f = b.find(".big-image");
            c.on("slid.bs.carousel", function (a) {
                var c = a.direction,
                    g = b.find(".active");
                d.removeClass("current");
                var h = g.find("img");
                position = "left" == c ? 0 : h.length - 1, $(h[position]).addClass("current"), e.html($(h[position]).attr("alt"));
                var i = $(h[position]).attr("src");
                f.attr("src", i)
            }), $(d[0]).addClass("current"), e.html($(d[0]).attr("alt"));
            var g = $(d[0]).attr("src");
            f.attr("src", g), d.on("click", function () {
                d.removeClass("current"), $(this).addClass("current");
                var a = $(this).attr("src"),
                    b = $(this).attr("alt");
                e.html(b), f.attr("src", a)
            })
        }
    }
}]), myapp.directive("uiSlider", [function () {
    return {
        restrict: "EA",
        scope: {
            val: "=",
            range: "@",
            min: "=",
            max: "=",
            units: "@"
        },
        link: function (a, b) {
            var c = b.find(".ui-slider"),
                d = b.find(".text");
            "true" == a.range ? (c.slider({
                range: !0,
                min: a.min,
                max: a.max,
                values: a.val,
                slide: function (b, c) {
                    d.text(a.units + c.values[0] + " - " + a.units + c.values[1])
                }
            }), d.text(a.units + c.slider("values", 0) + " - " + a.units + c.slider("values", 1))) : (c.slider({
                range: a.range,
                min: a.min,
                max: a.max,
                value: a.val,
                slide: function (b, c) {
                    d.text(c.value + " " + a.units)
                }
            }), d.text(c.slider("value") + " " + a.units))
        }
    }
}]), myapp.directive("checkItem", [function () {
    return {
        restrict: "EA",
        link: function (a, b) {
            var c = b.find('input[type="radio"]'),
                d = b.find("li"),
                e = b.find('input[type="checkbox"]');
            angular.forEach(c, function (a) {
                var b = $(a);
                b.is(":checked") && b.parent().parent().addClass("active")
            }), c.on("change", function () {
                d.removeClass("active");
                var a = $(this).parent().parent();
                $(this).is(":checked") ? a.addClass("active") : a.removeClass("active")
            }), e.on("change", function () {
                var a = $(this).parent().parent();
                $(this).is(":checked") ? a.addClass("active") : a.removeClass("active")
            })
        }
    }
}]), myapp.directive("resetTab", [function () {
    return {
        restrict: "EA",
        link: function (a, b) {
            var c = b.find(".details-extras-tabs");
            b.on("hidden.bs.modal", function () {
                b.hasClass("dt-modal") ? c.find("a:first").tab("show") : b.hasClass("ex-modal") && c.find("a:last").tab("show")
            })
        }
    }
}]), myapp.directive("switchGrid", [function () {
    return {
        restrict: "EA",
        scope: {
            grid: "@"
        },
        link: function (a, b) {
            var c = $("li.tile");
            b.on("click", function () {
                $(".grids li").removeClass("active"), $(this).parent().addClass("active"), "square" == a.grid ? c.addClass("square") : c.removeClass("square")
            })
        }
    }
}]), myapp.directive("enableSwap", [function () {
    return {
        restrict: "EA",
        link: function (a, b) {
            {
                var c = b.find(".tab-pane");
                b.find(">ul")
            }
            c.swiperight(function () {
                var a = 1 * $(this).attr("data-index");
                1 == a ? b.find('ul a[data-index="' + c.length + '"]').tab("show") : b.find('ul a[data-index="' + (a - 1) + '"]').tab("show")
            }), c.swipeleft(function () {
                var a = 1 * $(this).attr("data-index");
                a == c.length ? b.find('ul a[data-index="1"]').tab("show") : b.find('ul a[data-index="' + (a + 1) + '"]').tab("show")
            })
        }
    }
}]);
