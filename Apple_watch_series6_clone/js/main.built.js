! function t(e, i, s) {
    function n(A, o) {
        if (!i[A]) {
            if (!e[A]) {
                var a = "function" == typeof require && require;
                if (!o && a) return a(A, !0);
                if (r) return r(A, !0);
                var h = new Error("Cannot find module '" + A + "'");
                throw h.code = "MODULE_NOT_FOUND", h
            }
            var l = i[A] = {
                exports: {}
            };
            e[A][0].call(l.exports, (function(t) {
                return n(e[A][1][t] || t)
            }), l, l.exports, t, e, i, s)
        }
        return i[A].exports
    }
    for (var r = "function" == typeof require && require, A = 0; A < s.length; A++) n(s[A]);
    return n
}({
    1: [function(t, e, i) {
        "use strict";
        var s = t(6),
            n = t(7),
            r = t(10),
            A = t(61).EventEmitterMicro,
            o = A.prototype,
            a = t(15),
            h = t(17),
            l = [a.BUSY, a.CHECKED, a.DISABLED, a.EXPANDED, a.HIDDEN, a.INVALID, a.PRESSED, a.SELECTED],
            c = function(t, e) {
                A.call(this), this._options = e || {}, this._selector = e.selector || ".navitem", this._allowMultiSelection = e.multiSelection || !1;
                var i = l.indexOf(e.state) > -1 ? e.state : a.SELECTED;
                this.el = t, this._navItems = t.querySelectorAll(this._selector), this._navItems = Array.prototype.slice.call(this._navItems), this._state = i, this._navKeys = {}, this.selectOption = this.selectOption.bind(this), this._handleKeyDown = this._handleKeyDown.bind(this), this._setup()
            };
        c.ONSELECT = "onSelect", c.ONFOCUS = "onFocus";
        var u = c.prototype = Object.create(o);
        u._setup = function() {
            for (var t = [h.ARROW_DOWN, h.ARROW_RIGHT], e = [h.ARROW_UP, h.ARROW_LEFT], i = [h.ENTER, h.SPACEBAR], s = 0; s < t.length; s++) this.addNavkey(t[s], this._arrowDown.bind(this, !0)), this.addNavkey(e[s], this._arrowDown.bind(this, null)), this.addNavkey(i[s], this.selectOption);
            this._setupNavItems()
        }, u._setupNavItems = function() {
            if (this._navItems.length) {
                for (var t = 0; t < this._navItems.length; t++) this._setTabbingByIndex(t);
                void 0 !== this.focusedNavItemIndex && void 0 !== this.selectedNavitemIndex || this.setSelectedItemByIndex(0, !0)
            }
        }, u._setTabbingByIndex = function(t) {
            var e = this._navItems[t];
            r(e.getAttribute(this._state)) && (this.focusedNavItemIndex = t, this.selectedNavitemIndex = t), r(e.getAttribute(a.DISABLED)) ? s(e) : n(e)
        }, u.start = function() {
            this._navItems.length < 1 || (this.el.addEventListener("keydown", this._handleKeyDown), this.el.addEventListener("click", this.selectOption))
        }, u.stop = function() {
            this.el.removeEventListener("keydown", this._handleKeyDown), this.el.removeEventListener("click", this.selectOption)
        }, u._handleKeyDown = function(t) {
            if (t.ctrlKey || t.altKey || t.metaKey) return !0;
            this._navKeys[t.keyCode] && this._navKeys[t.keyCode](t)
        }, u._arrowDown = function(t, e, i) {
            e.preventDefault(), this.previousNavItemIndex = this.focusedNavItemIndex, this.focusedNavItemIndex = this._calculateIndex(t, this.focusedNavItemIndex), this._navItems[this.focusedNavItemIndex].focus(), i || this.trigger(c.ONFOCUS, {
                event: e,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }, u.selectOption = function(t, e) {
            t.preventDefault();
            var i = this._navItems.indexOf(document.activeElement);
            i > -1 && document.activeElement !== this._navItems[this.focusedNavItemIndex] && (this.focusedNavItemIndex = i), this._allowMultiSelection ? this._toggleState() : (this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"), this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true")), this.selectedNavitemIndex = this.focusedNavItemIndex, e || this.trigger(c.ONSELECT, {
                event: t,
                index: this.selectedNavitemIndex,
                el: this._navItems[this.selectedNavitemIndex]
            })
        }, u._toggleState = function() {
            var t = this._navItems[this.focusedNavItemIndex].getAttribute(this._state);
            r(t) ? this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "false") : this._navItems[this.focusedNavItemIndex].setAttribute(this._state, "true")
        }, u._calculateIndex = function(t, e) {
            var i = e;
            if (!0 === t) {
                if (i = ++i >= this._navItems.length ? 0 : i, !r(this._navItems[i].getAttribute(a.DISABLED)) || this._navItems[i].hasAttribute("disabled")) return i
            } else if (i = --i < 0 ? this._navItems.length - 1 : i, !r(this._navItems[i].getAttribute(a.DISABLED)) || this._navItems[i].hasAttribute("disabled")) return i;
            return this._calculateIndex(t, i)
        }, u.updateNavItems = function() {
            var t = this.el.querySelectorAll(this._selector);
            this._navItems = Array.prototype.slice.call(t)
        }, u.addNavItem = function(t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (r(t.getAttribute(a.DISABLED)) || n(t), this._navItems.push(t))
        }, u.setSelectedItemByIndex = function(t, e) {
            this._allowMultiSelection || isNaN(this.selectedNavitemIndex) || this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "false"), this.focusedNavItemIndex = t, this.selectedNavitemIndex = t, this._navItems[this.selectedNavitemIndex].setAttribute(this._state, "true"), e || this.trigger(c.ONSELECT, {
                event: null,
                index: this.focusedNavItemIndex,
                el: this._navItems[this.focusedNavItemIndex]
            })
        }, u.getSelectedItem = function() {
            return this._navItems[this.selectedNavitemIndex]
        }, u.getFocusedItem = function(t) {
            return this._navItems[this.focusedNavItemIndex]
        }, u.addNavkey = function(t, e) {
            "function" == typeof e && "number" == typeof t ? this._navKeys[t] = e : console.warn("incorrect types arguments were passed")
        }, u.removeNavkey = function(t) {
            delete this._navKeys[t]
        }, u.destroy = function() {
            for (var t in o.destroy.call(this), this.stop(), this.el = null, this._options = null, this._selector = null, this.focusedNavItemIndex = null, this.selectedNavitemIndex = null, this._navItems = null, this._state = null, this.selectOption = null, this._handleKeyDown = null, this._navKeys) this._navKeys.hasOwnProperty(t) && this.removeNavkey(t);
            this._navKeys = null
        }, e.exports = c
    }, {
        10: 10,
        15: 15,
        17: 17,
        6: 6,
        61: 61,
        7: 7
    }],
    2: [function(t, e, i) {
        "use strict";
        var s = t(5),
            n = t(9),
            r = t(14),
            A = function(t, e) {
                e = e || {}, this._tabbables = null, this._excludeHidden = e.excludeHidden, this._firstTabbableElement = e.firstFocusElement, this._lastTabbableElement = null, this._relatedTarget = null, this.el = t, this._handleOnFocus = this._handleOnFocus.bind(this)
            },
            o = A.prototype;
        o.start = function(t) {
            this.updateTabbables(), n(this.el, null, this._excludeHidden);
            let e = document.activeElement;
            this._firstTabbableElement ? this.el.contains(document.activeElement) || t || (this._firstTabbableElement.focus(), e = this._firstTabbableElement) : console.warn("this._firstTabbableElement is null, CircularTab needs at least one tabbable element."), this._relatedTarget = e, document.addEventListener("focus", this._handleOnFocus, !0)
        }, o.stop = function() {
            r(this.el), document.removeEventListener("focus", this._handleOnFocus, !0)
        }, o.updateTabbables = function() {
            this._tabbables = s.getTabbableElements(this.el, this._excludeHidden), this._firstTabbableElement = this._firstTabbableElement || this._tabbables[0], this._lastTabbableElement = this._tabbables[this._tabbables.length - 1]
        }, o._handleOnFocus = function(t) {
            if (this.el.contains(t.target)) this._relatedTarget = t.target;
            else {
                if (t.preventDefault(), this.updateTabbables(), this._relatedTarget === this._lastTabbableElement || null === this._relatedTarget) return this._firstTabbableElement.focus(), void(this._relatedTarget = this._firstTabbableElement);
                if (this._relatedTarget === this._firstTabbableElement && this._lastTabbableElement) return this._lastTabbableElement.focus(), void(this._relatedTarget = this._lastTabbableElement)
            }
        }, o.destroy = function() {
            this.stop(), this.el = null, this._tabbables = null, this._firstTabbableElement = null, this._lastTabbableElement = null, this._relatedTarget = null, this._handleOnFocus = null
        }, e.exports = A
    }, {
        14: 14,
        5: 5,
        9: 9
    }],
    3: [function(t, e, i) {
        "use strict";
        var s = t(15),
            n = t(18),
            r = t(7),
            A = t(6),
            o = t(10),
            a = t(1),
            h = a.prototype,
            l = function(t, e) {
                e = e || {}, a.call(this, t, {
                    selector: e.selector || "*[role=" + n.OPTION + "]",
                    state: e.state || s.SELECTED
                })
            },
            c = l.prototype = Object.create(h);
        c._setTabbingByIndex = function(t) {
            var e = this._navItems[t];
            o(e.getAttribute(this._state)) ? (this.focusedNavItemIndex = t, this.selectedNavitemIndex = t, this._enableElement(e)) : this._disableElement(e)
        }, c.setSelectedItemByIndex = function(t, e) {
            isNaN(this.selectedNavitemIndex) || this._disableElement(this._navItems[this.selectedNavitemIndex]), h.setSelectedItemByIndex.call(this, t, e), this._enableElement(this._navItems[this.selectedNavitemIndex])
        }, c.addNavItem = function(t) {
            t && t.nodeType && this._navItems.indexOf(t) < 0 && (o(t.getAttribute(s.DISABLED)) || this._disableElement(t), this._navItems.push(t))
        }, c._arrowDown = function(t, e) {
            h._arrowDown.call(this, t, e, !0), this.selectOption(e)
        }, c._enableElement = function(t) {
            r(t), t.setAttribute(this._state, "true")
        }, c._disableElement = function(t) {
            A(t), t.setAttribute(this._state, "false")
        }, c.selectOption = function(t) {
            A(this._navItems[this.selectedNavitemIndex]), h.selectOption.call(this, t), r(this._navItems[this.focusedNavItemIndex])
        }, e.exports = l
    }, {
        1: 1,
        10: 10,
        15: 15,
        18: 18,
        6: 6,
        7: 7
    }],
    4: [function(t, e, i) {
        "use strict";

        function s() {
            this._createElements(), this._bindEvents()
        }
        var n = s.prototype;
        n._bindEvents = function() {
            this._onResize = this._resize.bind(this)
        }, n._createElements = function() {
            this.span = document.createElement("span");
            var t = this.span.style;
            if (t.visibility = "hidden", t.position = "absolute", t.top = "0", t.bottom = "0", t.zIndex = "-1", this.span.innerHTML = "&nbsp;", !window.ResizeObserver) {
                this.iframe = document.createElement("iframe");
                var e = this.iframe.style;
                e.position = "absolute", e.top = "0", e.left = "0", e.width = "100%", e.height = "100%", this.span.appendChild(this.iframe)
            }
            document.body.appendChild(this.span)
        }, n.detect = function(t) {
            this.originalSize = t || 17, this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]), this.currentSize > this.originalSize && this._onResize(), this.isDetecting || (window.ResizeObserver ? (this.resizeObserver = new ResizeObserver(this._onResize), this.resizeObserver.observe(this.span)) : this.iframe.contentWindow.addEventListener("resize", this._onResize), this.isDetecting = !0)
        }, n._resize = function() {
            this.currentSize = parseFloat(window.getComputedStyle(this.span)["font-size"]), this.originalSize < this.currentSize ? document.documentElement.classList.add("text-zoom") : document.documentElement.classList.remove("text-zoom"), window.dispatchEvent(new Event("resize")), window.dispatchEvent(new CustomEvent("resize:text-zoom", {
                detail: this
            }))
        }, n.getScale = function() {
            return this.currentSize / this.originalSize
        }, n.remove = function() {
            this.isDetecting && (this.resizeObserver && this.resizeObserver.unobserve(this.span), this.iframe && this.iframe.contentWindow.removeEventListener("resize", this._onResize), this.isDetecting = !1)
        }, n.destroy = function() {
            this.remove(), this.span && this.span.parentElement && this.span.parentElement.removeChild(this.span), this.span = null, this.iframe = null, this.resizeObserver = null
        }, e.exports = new s
    }, {}],
    5: [function(t, e, i) {
        "use strict";
        var s = t(16),
            n = function() {
                this.focusableSelectors = s.selectors
            },
            r = n.prototype;
        r.isFocusableElement = function(t, e, i) {
            return !(e && !this._isDisplayed(t)) && (s.nodeName[t.nodeName] ? !t.disabled : !t.contentEditable || (i = i || parseFloat(t.getAttribute("tabindex")), !isNaN(i)))
        }, r.isTabbableElement = function(t, e) {
            if (e && !this._isDisplayed(t)) return !1;
            var i = t.getAttribute("tabindex");
            return i = parseFloat(i), isNaN(i) ? this.isFocusableElement(t, e, i) : i >= 0
        }, r._isDisplayed = function(t) {
            var e = t.getBoundingClientRect();
            return (0 !== e.top || 0 !== e.left || 0 !== e.width || 0 !== e.height) && "hidden" !== window.getComputedStyle(t).visibility
        }, r.getTabbableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++) this.isTabbableElement(i[r], e) && n.push(i[r]);
            return n
        }, r.getFocusableElements = function(t, e) {
            for (var i = t.querySelectorAll(this.focusableSelectors), s = i.length, n = [], r = 0; r < s; r++) this.isFocusableElement(i[r], e) && n.push(i[r]);
            return n
        }, e.exports = new n
    }, {
        16: 16
    }],
    6: [function(t, e, i) {
        "use strict";
        const s = t(12);
        e.exports = function(t) {
            s(t, "tabindex", "-1")
        }
    }, {
        12: 12
    }],
    7: [function(t, e, i) {
        "use strict";
        var s = t(5);
        let n = t => {
            s.isTabbableElement(t) || t.setAttribute("tabindex", "0")
        };
        e.exports = function(t) {
            t instanceof Node ? n(t) : t.forEach(t => {
                n(t)
            })
        }
    }, {
        5: 5
    }],
    8: [function(t, e, i) {
        "use strict";
        var s = t(15),
            n = t(5),
            r = function(t, e) {
                var i = t.getAttribute("data-original-" + e);
                i || (i = t.getAttribute(e) || "", t.setAttribute("data-original-" + e, i))
            };
        e.exports = function(t, e) {
            if (n.isFocusableElement(t, e)) r(t, "tabindex"), t.setAttribute("tabindex", "-1");
            else
                for (var i = n.getTabbableElements(t, e), A = i.length; A--;) r(i[A], "tabindex"), i[A].setAttribute("tabindex", "-1");
            r(t, s.HIDDEN), t.setAttribute(s.HIDDEN, "true")
        }
    }, {
        15: 15,
        5: 5
    }],
    9: [function(t, e, i) {
        "use strict";
        var s = t(8);
        e.exports = function t(e, i, n) {
            i = i || document.body;
            for (var r = e, A = e; r = r.previousElementSibling;) s(r, n);
            for (; A = A.nextElementSibling;) s(A, n);
            e.parentElement && e.parentElement !== i && t(e.parentElement, i, n)
        }
    }, {
        8: 8
    }],
    10: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "string" == typeof t ? "true" === (t = t.toLowerCase()) : t
        }
    }, {}],
    11: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            let i;
            i = t instanceof NodeList ? t : [].concat(t), e = Array.isArray(e) ? e : [].concat(e), i.forEach(t => {
                e.forEach(e => {
                    t.removeAttribute(e)
                })
            })
        }
    }, {}],
    12: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            let s;
            "string" != typeof i && (i = i.toString()), s = t instanceof NodeList ? t : [].concat(t), s.forEach(t => {
                t.setAttribute(e, i)
            })
        }
    }, {}],
    13: [function(t, e, i) {
        "use strict";
        var s = t(11),
            n = t(15),
            r = "data-original-",
            A = function(t, e) {
                var i = t.getAttribute(r + e);
                null !== i && ("" === i ? s(t, e) : t.setAttribute(e, i), s(t, r + e))
            };
        e.exports = function(t) {
            A(t, "tabindex"), A(t, n.HIDDEN);
            for (var e = t.querySelectorAll("[".concat(r + "tabindex", "]")), i = e.length; i--;) A(e[i], "tabindex")
        }
    }, {
        11: 11,
        15: 15
    }],
    14: [function(t, e, i) {
        "use strict";
        var s = t(13);
        e.exports = function t(e, i) {
            i = i || document.body;
            for (var n = e, r = e; n = n.previousElementSibling;) s(n);
            for (; r = r.nextElementSibling;) s(r);
            e.parentElement && e.parentElement !== i && t(e.parentElement, i)
        }
    }, {
        13: 13
    }],
    15: [function(t, e, i) {
        "use strict";
        e.exports = {
            AUTOCOMPLETE: "aria-autocomplete",
            CHECKED: "aria-checked",
            DISABLED: "aria-disabled",
            EXPANDED: "aria-expanded",
            HASPOPUP: "aria-haspopup",
            HIDDEN: "aria-hidden",
            INVALID: "aria-invalid",
            LABEL: "aria-label",
            LEVEL: "aria-level",
            MULTILINE: "aria-multiline",
            MULTISELECTABLE: "aria-multiselectable",
            ORIENTATION: "aria-orientation",
            PRESSED: "aria-pressed",
            READONLY: "aria-readonly",
            REQUIRED: "aria-required",
            SELECTED: "aria-selected",
            SORT: "aria-sort",
            VALUEMAX: "aria-valuemax",
            VALUEMIN: "aria-valuemin",
            VALUENOW: "aria-valuenow",
            VALUETEXT: "aria-valuetext",
            ATOMIC: "aria-atomic",
            BUSY: "aria-busy",
            LIVE: "aria-live",
            RELEVANT: "aria-relevant",
            DROPEFFECT: "aria-dropeffect",
            GRABBED: "aria-grabbed",
            ACTIVEDESCENDANT: "aria-activedescendant",
            CONTROLS: "aria-controls",
            DESCRIBEDBY: "aria-describedby",
            FLOWTO: "aria-flowto",
            LABELLEDBY: "aria-labelledby",
            OWNS: "aria-owns",
            POSINSET: "aria-posinset",
            SETSIZE: "aria-setsize"
        }
    }, {}],
    16: [function(t, e, i) {
        "use strict";
        e.exports = {
            selectors: ["input", "select", "textarea", "button", "optgroup", "option", "menuitem", "fieldset", "object", "a[href]", "[tabindex]", "[contenteditable]"].join(","),
            nodeName: {
                INPUT: "input",
                SELECT: "select",
                TEXTAREA: "textarea",
                BUTTON: "button",
                OPTGROUP: "optgroup",
                OPTION: "option",
                MENUITEM: "menuitem",
                FIELDSET: "fieldset",
                OBJECT: "object",
                A: "a"
            }
        }
    }, {}],
    17: [function(t, e, i) {
        "use strict";
        e.exports = t(88)
    }, {
        88: 88
    }],
    18: [function(t, e, i) {
        "use strict";
        e.exports = {
            ALERT: "alert",
            ALERTDIALOG: "alertdialog",
            BUTTON: "button",
            CHECKBOX: "checkbox",
            DIALOG: "dialog",
            GRIDCELL: "gridcell",
            LINK: "link",
            LOG: "log",
            MARQUEE: "marquee",
            MENUITEM: "menuitem",
            MENUITEMCHECKBOX: "menuitemcheckbox",
            MENUITEMRADIO: "menuitemradio",
            OPTION: "option",
            PROGRESSBAR: "progressbar",
            RADIO: "radio",
            SCROLLBAR: "scrollbar",
            SLIDER: "slider",
            SPINBUTTON: "spinbutton",
            STATUS: "status",
            SWITCH: "switch",
            TAB: "tab",
            TABPANEL: "tabpanel",
            TEXTBOX: "textbox",
            TIMER: "timer",
            TOOLTIP: "tooltip",
            TREEITEM: "treeitem",
            COMBOBOX: "combobox",
            GRID: "grid",
            LISTBOX: "listbox",
            MENU: "menu",
            MENUBAR: "menubar",
            RADIOGROUP: "radiogroup",
            TABLIST: "tablist",
            TREE: "tree",
            TREEGRID: "treegrid",
            ARTICLE: "article",
            COLUMNHEADER: "columnheader",
            DEFINITION: "definition",
            DIRECTORY: "directory",
            DOCUMENT: "document",
            GROUP: "group",
            HEADING: "heading",
            IMG: "img",
            LIST: "list",
            LISTITEM: "listitem",
            MATH: "math",
            NOTE: "note",
            PRESENTATION: "presentation",
            REGION: "region",
            ROW: "row",
            ROWGROUP: "rowgroup",
            ROWHEADER: "rowheader",
            SEPARATOR: "separator",
            TOOLBAR: "toolbar",
            APPLICATION: "application",
            BANNER: "banner",
            COMPLEMENTARY: "complementary",
            CONTENTINFO: "contentinfo",
            FORM: "form",
            MAIN: "main",
            NAVIGATION: "navigation",
            SEARCH: "search"
        }
    }, {}],
    19: [function(t, e, i) {
        "use strict";
        t(82), t(82);
        var s = t(20);
        e.exports = function() {
            var t, e = Array.prototype.slice.call(arguments),
                i = e.shift(e);
            if (i.classList && i.classList.add) i.classList.add.apply(i.classList, e);
            else
                for (t = 0; t < e.length; t++) s(i, e[t])
        }
    }, {
        20: 20,
        82: 82
    }],
    20: [function(t, e, i) {
        "use strict";
        var s = t(21);
        e.exports = function(t, e) {
            s(t, e) || (t.className += " " + e)
        }
    }, {
        21: 21
    }],
    21: [function(t, e, i) {
        "use strict";
        var s = t(22);
        e.exports = function(t, e) {
            return s(e).test(t.className)
        }
    }, {
        22: 22
    }],
    22: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return new RegExp("(\\s|^)" + t + "(\\s|$)")
        }
    }, {}],
    23: [function(t, e, i) {
        "use strict";
        var s = t(21),
            n = t(22);
        e.exports = function(t, e) {
            s(t, e) && (t.className = t.className.replace(n(e), "$1").trim())
        }
    }, {
        21: 21,
        22: 22
    }],
    24: [function(t, e, i) {
        "use strict";
        t(82), t(82);
        var s = t(23);
        e.exports = function() {
            var t, e = Array.prototype.slice.call(arguments),
                i = e.shift(e);
            if (i.classList && i.classList.remove) i.classList.remove.apply(i.classList, e);
            else
                for (t = 0; t < e.length; t++) s(i, e[t])
        }
    }, {
        23: 23,
        82: 82
    }],
    25: [function(t, e, i) {
        "use strict";
        e.exports = {
            assert: t(26),
            count: t(27),
            countReset: t(28),
            dir: t(29),
            dirxml: t(30),
            enabled: t(31),
            error: t(32),
            group: t(33),
            groupCollapsed: t(34),
            groupEnd: t(35),
            info: t(36),
            log: t(38),
            profile: t(39),
            profileEnd: t(40),
            table: t(41),
            time: t(42),
            timeEnd: t(43),
            trace: t(44),
            warn: t(45)
        }
    }, {
        26: 26,
        27: 27,
        28: 28,
        29: 29,
        30: 30,
        31: 31,
        32: 32,
        33: 33,
        34: 34,
        35: 35,
        36: 36,
        38: 38,
        39: 39,
        40: 40,
        41: 41,
        42: 42,
        43: 43,
        44: 44,
        45: 45
    }],
    26: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("assert")
    }, {
        37: 37
    }],
    27: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("count")
    }, {
        37: 37
    }],
    28: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("countReset")
    }, {
        37: 37
    }],
    29: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("dir")
    }, {
        37: 37
    }],
    30: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("dirxml")
    }, {
        37: 37
    }],
    31: [function(t, e, i) {
        "use strict";
        var s = !1,
            n = window || self;
        try {
            s = !!n.localStorage.getItem("f7c9180f-5c45-47b4-8de4-428015f096c0")
        } catch (t) {}
        e.exports = s
    }, {}],
    32: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("error")
    }, {
        37: 37
    }],
    33: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("group")
    }, {
        37: 37
    }],
    34: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("groupCollapsed")
    }, {
        37: 37
    }],
    35: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("groupEnd")
    }, {
        37: 37
    }],
    36: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("info")
    }, {
        37: 37
    }],
    37: [function(t, e, i) {
        "use strict";
        var s = t(31);
        e.exports = function(t) {
            return function() {
                if (s && "object" == typeof window.console && "function" == typeof console[t]) return console[t].apply(console, Array.prototype.slice.call(arguments, 0))
            }
        }
    }, {
        31: 31
    }],
    38: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("log")
    }, {
        37: 37
    }],
    39: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("profile")
    }, {
        37: 37
    }],
    40: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("profileEnd")
    }, {
        37: 37
    }],
    41: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("table")
    }, {
        37: 37
    }],
    42: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("time")
    }, {
        37: 37
    }],
    43: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("timeEnd")
    }, {
        37: 37
    }],
    44: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("trace")
    }, {
        37: 37
    }],
    45: [function(t, e, i) {
        "use strict";
        e.exports = t(37)("warn")
    }, {
        37: 37
    }],
    46: [function(t, e, i) {
        "use strict";
        var s = t(50),
            n = t(48);
        e.exports = function(t, e, i, r) {
            return e = n(t, e), s(t, e, i, r)
        }
    }, {
        48: 48,
        50: 50
    }],
    47: [function(t, e, i) {
        "use strict";
        var s = t(51),
            n = t(48);
        e.exports = function(t, e, i, r) {
            return e = n(t, e), s(t, e, i, r)
        }
    }, {
        48: 48,
        51: 51
    }],
    48: [function(t, e, i) {
        "use strict";
        var s = t(103);
        e.exports = function(t, e) {
            var i;
            return i = "tagName" in t ? t.tagName : t === window ? "window" : "document", s(e, i) || e
        }
    }, {
        103: 103
    }],
    49: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return void 0 !== (t = t || window.event).target ? t.target : t.srcElement
        }
    }, {}],
    50: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i, s) {
            return t.addEventListener ? t.addEventListener(e, i, !!s) : t.attachEvent("on" + e, i), t
        }
    }, {}],
    51: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i, s) {
            return t.removeEventListener ? t.removeEventListener(e, i, !!s) : t.detachEvent("on" + e, i), t
        }
    }, {}],
    52: [function(t, e, i) {
        "use strict";
        e.exports = 8
    }, {}],
    53: [function(t, e, i) {
        "use strict";
        e.exports = 11
    }, {}],
    54: [function(t, e, i) {
        "use strict";
        e.exports = 1
    }, {}],
    55: [function(t, e, i) {
        "use strict";
        e.exports = 3
    }, {}],
    56: [function(t, e, i) {
        "use strict";
        var s = t(59);
        e.exports = function(t, e) {
            return !!s(t) && ("number" == typeof e ? t.nodeType === e : -1 !== e.indexOf(t.nodeType))
        }
    }, {
        59: 59
    }],
    57: [function(t, e, i) {
        "use strict";
        var s = t(56),
            n = t(52),
            r = t(53),
            A = t(54),
            o = t(55),
            a = [A, o, n, r],
            h = [A, o, n],
            l = [A, r];
        e.exports = {
            parentNode: function(t, e, i, n) {
                if (n = n || "target", (t || e) && !s(t, l)) throw new TypeError(i + ": " + n + " must be an Element, or Document Fragment")
            },
            childNode: function(t, e, i, n) {
                if (n = n || "target", (t || e) && !s(t, h)) throw new TypeError(i + ": " + n + " must be an Element, TextNode, or Comment")
            },
            insertNode: function(t, e, i, n) {
                if (n = n || "node", (t || e) && !s(t, a)) throw new TypeError(i + ": " + n + " must be an Element, TextNode, Comment, or Document Fragment")
            },
            hasParentNode: function(t, e, i) {
                if (i = i || "target", !t.parentNode) throw new TypeError(e + ": " + i + " must have a parentNode")
            }
        }
    }, {
        52: 52,
        53: 53,
        54: 54,
        55: 55,
        56: 56
    }],
    58: [function(t, e, i) {
        "use strict";
        var s = t(56),
            n = t(54);
        e.exports = function(t) {
            return s(t, n)
        }
    }, {
        54: 54,
        56: 56
    }],
    59: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return !(!t || !t.nodeType)
        }
    }, {}],
    60: [function(t, e, i) {
        "use strict";
        var s = t(57);
        e.exports = function(t) {
            return s.childNode(t, !0, "remove"), t.parentNode ? t.parentNode.removeChild(t) : t
        }
    }, {
        57: 57
    }],
    61: [function(t, e, i) {
        "use strict";
        e.exports = {
            EventEmitterMicro: t(62)
        }
    }, {
        62: 62
    }],
    62: [function(t, e, i) {
        "use strict";

        function s() {
            this._events = {}
        }
        var n = s.prototype;
        n.on = function(t, e) {
            this._events[t] = this._events[t] || [], this._events[t].unshift(e)
        }, n.once = function(t, e) {
            var i = this;
            this.on(t, (function s(n) {
                i.off(t, s), void 0 !== n ? e(n) : e()
            }))
        }, n.off = function(t, e) {
            if (this.has(t)) {
                if (1 === arguments.length) return this._events[t] = null, void delete this._events[t];
                var i = this._events[t].indexOf(e); - 1 !== i && this._events[t].splice(i, 1)
            }
        }, n.trigger = function(t, e) {
            if (this.has(t))
                for (var i = this._events[t].length - 1; i >= 0; i--) void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
        }, n.has = function(t) {
            return t in this._events != !1 && 0 !== this._events[t].length
        }, n.destroy = function() {
            for (var t in this._events) this._events[t] = null;
            this._events = null
        }, e.exports = s
    }, {}],
    63: [function(t, e, i) {
        "use strict";
        const s = t(65),
            n = t(64),
            r = t(77),
            {
                EventEmitterMicro: A
            } = t(61),
            o = t(72);
        class a extends A {
            constructor(t, e, i = 30, n = "jpg", r = null, A = 3, o = 4) {
                super(), this.destroyed = !1, e instanceof HTMLCanvasElement && (e = new s(e)), this.glCanvas = e, this.canvasElement = e.canvas, this.fps = i, this.filetype = n, this.workerUrl = r, this.hurriedThreshold = A, this.imageLoadConcurrency = o, this._createManifestPath(t), this.hasLoadedChapterFrames = !1, this.hasLoadedSuperFrames = !1, this.hasFullyLoaded = !1, this.isManifestReady = !1, this.cachedImages = {}, this._progress = 0, this._currentFrame = 0, Object.defineProperty(this, "progress", {
                    get() {
                        return this._progress
                    },
                    set(t) {
                        if (this._progress = t, this.hasLoadedChapterFrames) {
                            let e = (this.manifest.frames.length - 1) * t;
                            e = this.getNearestLoadedFrameIndex(Math.round(e)), this.glCanvas.drawToFBO(0), this.goToFrame(e), this.glCanvas.composite()
                        }
                    }
                })
            }
            getNearestLoadedFrameIndex(t) {
                return this.hasFullyLoaded ? t : this.hasLoadedChapterFrames && 0 !== this.chapterFrames.length ? this.hasLoadedChapterFrames ? this.getNearestChapterFrameIndex(t) : this.hasLoadedSuperFrames ? this.getNearestSuperFrameIndex(t) : void 0 : 0
            }
            getNearestChapterFrameIndex(t) {
                let e = 0;
                for (let i = 0; i < this.chapterFrames.length && !(this.chapterFrames[i] > t); i++) e = this.chapterFrames[i];
                return e
            }
            getNearestSuperFrameIndex(t, e = !0) {
                let i = 0;
                for (let e = 0; e < this.superFrames.length && !(this.superFrames[e] > t); e++) i = this.superFrames[e];
                if (e) {
                    let e = this.getNearestChapterFrameIndex(t);
                    if (Math.abs(e - t) < 4) return e
                }
                return i
            }
            _loadImage(t, e = 2) {
                return this.imageLoadQueue || (this.imageLoadQueue = new o(this.imageLoadConcurrency)), this.imageLoadQueue.enqueueImage(t, e).then(t => t)
            }
            _loadJSON(t) {
                return new Promise((e, i) => {
                    const s = new XMLHttpRequest;
                    s.onreadystatechange = () => {
                        if (4 !== s.readyState || 200 !== s.status && 0 !== s.status) 4 === s.readyState && i("Invalid HTTP state of ".concat(s.status));
                        else try {
                            e({
                                data: JSON.parse(s.responseText)
                            })
                        } catch (t) {
                            i(t)
                        }
                    }, s.open("GET", t), s.send()
                })
            }
            _loadImageForFrame(t) {
                const e = this.manifest.frames[t];
                if (e.image) return e.image;
                let i = 3;
                "chapter" === e.type ? i = 1 : t % 4 == 0 && (i = 2);
                let s, n = t => {
                    let e = "" + t;
                    for (; e.length < 3;) e = "0" + e;
                    return e
                };
                if ("diff" === e.type) s = "".concat(this.baseUrl, "/").concat(this.baseFilename, "_").concat(n(e.startImageIndex + 1), ".").concat(this.filetype);
                else {
                    if ("chapter" !== e.type && "keyframe" !== e.type) throw "Unknown frame type.";
                    s = "".concat(this.baseUrl, "/").concat(this.baseFilename, "_key_").concat(n(t - 1), ".").concat(this.filetype)
                }
                return this._loadImage(s, i).then(s => {
                    if (!this.destroyed) return t > 1 && i < 3 && this._currentFrame < 1 && this.glCanvas.preWarmPoolForImage(s), e.image = s, e.image
                })
            }
            _createManifestPath(t) {
                this.manifestUrl = t;
                let e = t.match(/^(.+)\/([^\/]+)_manifest.json$/);
                r(e, "Invalid manifest URL."), this.baseUrl = e[1], this.baseFilename = e[2]
            }
            startLoading() {
                if (!this.manifest) {
                    let t = "".concat(this.baseUrl, "/").concat(this.baseFilename, "_startframe.").concat(this.filetype),
                        e = this._loadJSON(this.manifestUrl),
                        i = this._loadImage(t, 1),
                        s = null,
                        r = this.workerUrl ? new Worker(this.workerUrl) : null;
                    return this.imageLoadQueue.start(), Promise.all([e, i]).then(t => {
                        if (this.destroyed) return;
                        let e = t[0];
                        if (s = t[1], this.glCanvas.resizeCanvas(s.width, s.height), this._bitsetForNAND = new n(s.width / 8), this._bitsetForNAND.setRange(0, s.width / 8 - 1), e.data.frames.splice(0, 0, {
                                type: "keyframe",
                                x: 0,
                                y: 0,
                                width: s.width,
                                height: s.height,
                                filename: "".concat(this.baseFilename, "_startframe.").concat(this.filetype)
                            }), r) return new Promise((t, i) => {
                            r.onmessage = i => {
                                let s = i.data;
                                for (let t = 0; t < s.length; t++) "diff" === s[t].type && (e.data.frames[t].rowMasks = s[t].rowMasks.map(t => new n(t)), e.data.frames[t].rowDiffLocations = s[t].rowDiffLocations);
                                this.manifest = e.data, t()
                            }, r.postMessage([e.data, this.canvasElement.width, this.canvasElement.height])
                        });
                        this._processManifest(e.data)
                    }).then(() => {
                        if (!this.destroyed && (this.glCanvas.modifyPoolSize(this.manifest.frameCount), this.isManifestReady = !0, this.trigger(a.Events.ManifestReady), this.manifest.frames[0].image = s, this.glCanvas.drawToFBO(0), this._applyFrame(0), this.glCanvas.composite(), this.chapterFrames = this.manifest.frames.filter(t => "chapter" === t.type).map(t => this.manifest.frames.indexOf(t)), this.chapterFrames.length > 0)) {
                            let t = [];
                            return this.chapterFrames.forEach(e => {
                                t.push(this._loadImageForFrame(e))
                            }), Promise.all(t)
                        }
                    }).then((t = []) => {
                        if (this.destroyed) return;
                        this.chapters = t, this.hasLoadedChapterFrames = !0, this.trigger(a.Events.ChapterFramesLoaded);
                        let e = [];
                        this.superFrames = [];
                        for (let t = 4; t < this.manifest.frames.length; t += 4) e.push(this._loadImageForFrame(t)), this.superFrames.push(t);
                        return Promise.all(e)
                    }).then(() => {
                        if (this.destroyed) return;
                        this.hasLoadedSuperFrames = !0, this.trigger(a.Events.SuperFramesLoaded);
                        let t = [];
                        for (let e = 1; e < this.manifest.frames.length; e++) e % 4 != 0 && t.push(this._loadImageForFrame(e));
                        return Promise.all(t).then(() => {
                            if (this.destroyed) return Promise.reject("destroyed");
                            this.hasFullyLoaded = !0, this.trigger(a.Events.Loaded)
                        })
                    })
                }
                this.imageLoadQueue.start()
            }
            stopLoading() {
                this.imageLoadQueue.stop()
            }
            goToFrame(t) {
                let e = t;
                r(e >= 0 && e < this.manifest.frames.length, "Frame out of range.");
                let i = [],
                    s = e > this._currentFrame ? 1 : -1,
                    n = !1,
                    A = null;
                if (Math.abs(this._currentFrame - e) >= this.hurriedThreshold && (e = this.getNearestSuperFrameIndex(e)), e === this._currentFrame) return;
                for (let t = this._currentFrame + s; e > this._currentFrame && t <= e || e < this._currentFrame && t >= e; t += s) {
                    if (n)
                        if (t % 4 == 0) n = !1;
                        else {
                            if (!(this.manifest.frames[t].image && ["chapter", "keyframe"].indexOf(this.manifest.frames[t].type) >= 0)) continue;
                            n = !1
                        }
                    if (this.manifest.frames[t].image)
                        if (["chapter", "keyframe"].indexOf(this.manifest.frames[t].type) >= 0) i = [t], A = t;
                        else {
                            if (t % 4 == 0 && t < this.manifest.frames.length - 4) {
                                let e = t - 4 * s,
                                    n = Math.min(e, t),
                                    r = Math.max(e, t);
                                i = i.filter(t => t <= n || t >= r), A && i.indexOf(e) < 0 && i.push(A), A = null
                            }
                            i.push(t)
                        }
                    else {
                        for (; i.length > 0 && i[i.length - 1] % 4 > 0;) i.pop();
                        n = !0
                    }
                }
                let o = i.length;
                for (; i.length > 0;) {
                    let t = i.shift();
                    this._applyFrame(t, i), this._currentFrame = t
                }
                o > 0 && this.trigger(a.Events.TimeUpdate, this)
            }
            _processManifest(t) {
                r(t && 5 === t.version, "Invalid manifest. Manifest must be version 5. Please select the Optimize for Anim checkbox in the Flow app."), t.frames = t.frames.map(t => this._parseFrame(t)), this.manifest = t
            }
            _valueForCharAt(t, e) {
                var i = t.charCodeAt(e);
                return i > 64 && i < 91 ? i - 65 : i > 96 && i < 123 ? i - 71 : i > 47 && i < 58 ? i + 4 : 43 === i ? 62 : 47 === i ? 63 : void 0
            }
            _createNumberFromBase64Range(t, e, i) {
                for (var s = 0; i--;) s += this._valueForCharAt(t, e++) << 6 * i;
                return s
            }
            _parseFrame(t) {
                var e = this.canvasElement.width / 8,
                    i = this.canvasElement.height / 8,
                    s = t.value,
                    r = t.startImageIndex,
                    A = t.startBlockIndex;
                if ("keyframe" === t.type || "chapter" === t.type) return {
                    type: t.type,
                    width: t.width,
                    height: t.height,
                    x: t.x,
                    y: t.y
                };
                let o = [],
                    a = [],
                    h = A;
                for (let t = 0; t < i; t++) o.push(new n(e)), a.push({});
                for (let t = 0; t < s.length; t += 5) {
                    let i = this._createNumberFromBase64Range(s, t, 3),
                        n = this._createNumberFromBase64Range(s, t + 3, 2);
                    for (let t = i; t < i + n; t++) {
                        let i = Math.floor(t / e),
                            s = t % e;
                        o[i].set(s);
                        try {
                            a[i]["" + s] = h
                        } catch (t) {}
                        h++
                    }
                }
                return {
                    type: "diff",
                    startImageIndex: r,
                    rowMasks: o,
                    rowDiffLocations: a
                }
            }
            _applyFrame(t, e = []) {
                try {
                    ["chapter", "keyframe"].indexOf(this.manifest.frames[t].type) >= 0 ? this._applyKeyframe(t) : this._applyDiffFrame(t, e)
                } catch (t) {
                    console.log(t)
                }
            }
            _applyKeyframe(t) {
                r(t >= 0 && t < this.manifest.frames.length, "Frame out of range."), r(["chapter", "keyframe"].indexOf(this.manifest.frames[t].type) >= 0, "Invalid attempt to play a diff as a keyframe."), r(this.manifest.frames[t].image, "Attempted to play an unloaded frame."), this.glCanvas.drawImage(this.manifest.frames[t].image, 0, 0)
            }
            _applyDiffFrame(t, e = []) {
                r(t >= 0 && t < this.manifest.frames.length, "Frame out of range."), r("diff" === this.manifest.frames[t].type, "Invalid attempt to play a keyframe as a diff.");
                const i = this.canvasElement.width / 8,
                    s = this.manifest.frames[t].image,
                    n = s.width / 8;
                for (let r = 0; r < this.manifest.frames[t].rowMasks.length; r++) {
                    let A = this.manifest.frames[t].rowMasks[r],
                        o = this.manifest.frames[t].rowDiffLocations[r],
                        a = this._rangesFromRowMask(A, o, r, i, n);
                    if (a.length < 1) continue;
                    let h = e.map(t => this.manifest.frames[t].rowMasks[r]),
                        l = A;
                    for (; h.length > 0;) {
                        let t = h.pop();
                        l = l.and(t.xor(this._bitsetForNAND))
                    }
                    let c = this._rangesFromRowMask(l, o, r, i, n);
                    c.length > a.length && (c = a);
                    for (let t = 0; t < c.length; t++) this._applyDiffRange(c[t], s, n, i)
                }
            }
            _rangesFromRowMask(t, e, i, s, r) {
                let A = [],
                    o = null;
                if (t.isEqual(new n(s))) return [];
                let a = s;
                for (let n = 0; n < a; n++)
                    if (t.get(n)) {
                        for (o = {
                                location: i * s + n,
                                length: 1,
                                block: e[n]
                            }, o.block; ++n < a && t.get(n);) {
                            0 === (o.block + o.length) % r ? (A.push(o), o = {
                                location: o.location + o.length,
                                length: 1,
                                block: e[n]
                            }) : o.length++
                        }
                        A.push(o)
                    }
                return A
            }
            _applyDiffRange(t, e, i, s) {
                var n = t.block,
                    r = n % i * 8,
                    A = 8 * Math.floor(n / i),
                    o = 8 * t.length,
                    a = t.location % s * 8,
                    h = 8 * Math.floor(t.location / s);
                this.glCanvas.drawImage(e, r, A, o, 8, a, h, o, 8)
            }
            destroy() {
                this.destroyed || (this.glCanvas.gl && this.glCanvas.destroy(), this.glCanvas = null, this.manifest = null, this.cachedImages = null, this.chapterFrames = null, this.superFrames = null, this.chapters = null, this.destroyed = !0, super.destroy())
            }
        }
        a.Events = {
            Loaded: "loaded",
            ChapterFramesLoaded: "chapterframes-loaded",
            SuperFramesLoaded: "superframes-loaded",
            ManifestReady: "manifest-ready",
            TimeUpdate: "timeupdate"
        }, e.exports = a
    }, {
        61: 61,
        64: 64,
        65: 65,
        72: 72,
        77: 77
    }],
    64: [function(t, e, i) {
        "use strict";
        var s = [0, 1, 28, 2, 29, 14, 24, 3, 30, 22, 20, 15, 25, 17, 4, 8, 31, 27, 13, 23, 21, 19, 16, 7, 26, 12, 18, 6, 11, 5, 10, 9],
            n = function(t) {
                var e, i, s, n, r;
                if ("number" == typeof t) t = t || 31, e = Math.ceil(t / 31), this.arr = new Uint32Array(e), this.MAX_BIT = t - 1;
                else {
                    if (i = JSON.parse("[" + t + "]"), this.MAX_BIT = i.pop(), (n = i.pop()) > 0) {
                        for (s = [], r = 0; r < n; r++) s[r] = 0;
                        for (r = 0; r < i.length; r++) s[n + r] = i[r];
                        i = s
                    }
                    e = Math.ceil((this.MAX_BIT + 1) / 31), this.arr = new Uint32Array(e), this.arr.set(i)
                }
            };

        function r(t) {
            return s[125613361 * (t & -t) >>> 27]
        }

        function A(t) {
            return t |= t >> 1, t |= t >> 2, t |= t >> 4, t |= t >> 8, s[125613361 * (t = 1 + ((t |= t >> 16) >> 1)) >>> 27]
        }

        function o(t, e, i) {
            return t ^ (1 << e) - 1 << i
        }

        function a(t, e, i) {
            return t | (1 << e) - 1 << i
        }

        function h(t, e, i) {
            return t & (2147483647 ^ (1 << e) - 1 << i)
        }

        function l(t, e) {
            return t & e
        }

        function c(t, e) {
            return t | e
        }

        function u(t, e) {
            return t ^ e
        }
        n.prototype.get = function(t) {
            var e = this._getWord(t);
            return -1 !== e && 1 == (this.arr[e] >> t % 31 & 1)
        }, n.prototype.set = function(t) {
            var e = this._getWord(t);
            return -1 !== e && (this.arr[e] |= 1 << t % 31, !0)
        }, n.prototype.setRange = function(t, e) {
            return this._doRange(t, e, a)
        }, n.prototype.unset = function(t) {
            var e = this._getWord(t);
            return -1 !== e && (this.arr[e] &= ~(1 << t % 31), !0)
        }, n.prototype.unsetRange = function(t, e) {
            return this._doRange(t, e, h)
        }, n.prototype.toggle = function(t) {
            var e = this._getWord(t);
            return -1 !== e && (this.arr[e] ^= 1 << t % 31, !0)
        }, n.prototype.toggleRange = function(t, e) {
            return this._doRange(t, e, o)
        }, n.prototype.clear = function() {
            for (var t = 0; t < this.arr.length; t++) this.arr[t] = 0;
            return !0
        }, n.prototype.clone = function() {
            return new n(this.dehydrate())
        }, n.prototype.dehydrate = function() {
            var t, e, i, s = 0;
            for (t = 0; t < this.arr.length && 0 === this.arr[t]; t++) s++;
            for (t = this.arr.length - 1; t >= s; t--)
                if (0 !== this.arr[t]) {
                    e = t;
                    break
                }
            for (i = "", t = s; t <= e; t++) i += this.arr[t] + ",";
            return i += s + "," + this.MAX_BIT
        }, n.prototype.and = function(t) {
            return this._op(t, l)
        }, n.prototype.or = function(t) {
            return this._op(t, c)
        }, n.prototype.xor = function(t) {
            return this._op(t, u)
        }, n.prototype.forEach = function(t) {
            for (var e = this.ffs(); - 1 !== e; e = this.nextSetBit(e + 1)) t(e)
        }, n.prototype.circularShift = function(t) {
            t = -t;
            for (var e = this, i = e.MAX_BIT + 1, s = e.arr.length, r = 31 - (31 * s - i), A = new n(i), o = 0, a = 0, h = 0, l = ~~((t = (i + t % i) % i) / 31) % s, c = t % 31; h < i;) {
                var u = l === s - 1 ? r : 31,
                    d = e.arr[l];
                c > 0 && (d >>>= c), a > 0 && (d <<= a), A.arr[o] = A.arr[o] | d;
                var m = Math.min(31 - a, u - c);
                h += m, (a += m) >= 31 && (A.arr[o] = 2147483647 & A.arr[o], a = 0, o++), (c += m) >= u && (c = 0, l++), l >= s && (l -= s)
            }
            return A.arr[s - 1] = A.arr[s - 1] & 2147483647 >>> 31 - r, A
        }, n.prototype.getCardinality = function() {
            for (var t = 0, e = this.arr.length - 1; e >= 0; e--) {
                var i = this.arr[e];
                t += 16843009 * ((i = (858993459 & (i -= i >> 1 & 1431655765)) + (i >> 2 & 858993459)) + (i >> 4) & 252645135) >> 24
            }
            return t
        }, n.prototype.getIndices = function() {
            var t = [];
            return this.forEach((function(e) {
                t.push(e)
            })), t
        }, n.prototype.isSubsetOf = function(t) {
            for (var e = this.arr, i = t.arr, s = e.length, n = 0; n < s; n++)
                if ((e[n] & i[n]) !== e[n]) return !1;
            return !0
        }, n.prototype.isEmpty = function() {
            var t, e;
            for (e = this.arr, t = 0; t < e.length; t++)
                if (e[t]) return !1;
            return !0
        }, n.prototype.isEqual = function(t) {
            var e;
            for (e = 0; e < this.arr.length; e++)
                if (this.arr[e] !== t.arr[e]) return !1;
            return !0
        }, n.prototype.toString = function() {
            var t, e = "";
            for (t = this.arr.length - 1; t >= 0; t--) e += ("0000000000000000000000000000000" + this.arr[t].toString(2)).slice(-31);
            return e
        }, n.prototype.ffs = function(t) {
            var e, i, s = -1;
            for (i = t = t || 0; i < this.arr.length; i++)
                if (0 !== (e = this.arr[i])) {
                    s = r(e) + 31 * i;
                    break
                }
            return s <= this.MAX_BIT ? s : -1
        }, n.prototype.ffz = function(t) {
            var e, i, s = -1;
            for (e = t = t || 0; e < this.arr.length; e++)
                if (2147483647 !== (i = this.arr[e])) {
                    s = r(i ^= 2147483647) + 31 * e;
                    break
                }
            return s <= this.MAX_BIT ? s : -1
        }, n.prototype.fls = function(t) {
            var e, i, s = -1;
            for (void 0 === t && (t = this.arr.length - 1), e = t; e >= 0; e--)
                if (0 !== (i = this.arr[e])) {
                    s = A(i) + 31 * e;
                    break
                }
            return s
        }, n.prototype.flz = function(t) {
            var e, i, s = -1;
            for (void 0 === t && (t = this.arr.length - 1), e = t; e >= 0; e--) {
                if (i = this.arr[e], e === this.arr.length - 1) {
                    var n = this.MAX_BIT % 31;
                    i |= (1 << 31 - n - 1) - 1 << n + 1
                }
                if (2147483647 !== i) {
                    s = A(i ^= 2147483647) + 31 * e;
                    break
                }
            }
            return s
        }, n.prototype.nextSetBit = function(t) {
            var e = this._getWord(t);
            if (-1 === e) return -1;
            var i = t % 31,
                s = (1 << 31 - i) - 1 << i,
                n = this.arr[e] & s;
            return n > 0 ? r(n) + 31 * e : this.ffs(e + 1)
        }, n.prototype.nextUnsetBit = function(t) {
            var e = this._getWord(t);
            if (-1 === e) return -1;
            var i = (1 << t % 31) - 1,
                s = this.arr[e] | i;
            return 2147483647 === s ? this.ffz(e + 1) : r(2147483647 ^ s) + 31 * e
        }, n.prototype.previousSetBit = function(t) {
            var e = this._getWord(t);
            if (-1 === e) return -1;
            var i = 2147483647 >>> 31 - t % 31 - 1,
                s = this.arr[e] & i;
            return s > 0 ? A(s) + 31 * e : this.fls(e - 1)
        }, n.prototype.previousUnsetBit = function(t) {
            var e = this._getWord(t);
            if (-1 === e) return -1;
            var i = t % 31,
                s = (1 << 31 - i - 1) - 1 << i + 1,
                n = this.arr[e] | s;
            return 2147483647 === n ? this.flz(e - 1) : A(2147483647 ^ n) + 31 * e
        }, n.prototype._getWord = function(t) {
            return t < 0 || t > this.MAX_BIT ? -1 : ~~(t / 31)
        }, n.prototype._doRange = function(t, e, i) {
            var s, n, r;
            e < t && (e ^= t, e ^= t ^= e);
            var A = this._getWord(t),
                o = this._getWord(e);
            if (-1 === A || -1 === o) return !1;
            for (s = A; s <= o; s++) r = (s === o ? e % 31 : 30) - (n = s === A ? t % 31 : 0) + 1, this.arr[s] = i(this.arr[s], r, n);
            return !0
        }, n.prototype._op = function(t, e) {
            var i, s, r, A, o, a;
            if (s = this.arr, "number" == typeof t) a = this._getWord(t), o = this.clone(), -1 !== a && (o.arr[a] = e(s[a], 1 << t % 31));
            else
                for (r = t.arr, A = s.length, o = new n(this.MAX_BIT + 1), i = 0; i < A; i++) o.arr[i] = e(s[i], r[i]);
            return o
        }, "function" == typeof define && define.amd ? define([], (function() {
            return n
        })) : "object" == typeof i && (e.exports = n)
    }, {}],
    65: [function(t, e, i) {
        "use strict";
        const s = t(67),
            n = t(66),
            r = t(236),
            A = {
                project: t(71),
                image: t(70),
                blend: {
                    vert: t(69),
                    frag: t(68)
                }
            };
        let o = r.create(),
            a = r.create(),
            h = r.create();
        e.exports = class {
            constructor(t) {
                this.canvas = t, this.igloo = new n(this.canvas, {
                    premultipliedAlpha: !0,
                    antialias: !1,
                    depth: !1,
                    desynchronized: !0,
                    powerPreference: "high-performance"
                }), this.gl = this.igloo.gl, this.program = this.igloo.program(A.project, A.image), this.program.uniforms = {
                    matrixLocation: this.gl.getUniformLocation(this.program.program, "u_matrix"),
                    textureMatrixLocation: this.gl.getUniformLocation(this.program.program, "u_textureMatrix"),
                    textureLocation: this.gl.getUniformLocation(this.program.program, "u_texture")
                }, this.blendProgram = this.igloo.program(A.blend.vert, A.blend.frag), this.blendProgram.uniforms = {
                    matrixLocation: this.gl.getUniformLocation(this.blendProgram.program, "u_matrix"),
                    imageLocation: this.gl.getUniformLocation(this.blendProgram.program, "imageTexture"),
                    maskLocation: this.gl.getUniformLocation(this.blendProgram.program, "maskTexture")
                }, this.buffers = {
                    positionBuffer: this.igloo.array(new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1])),
                    texcoordBuffer: this.igloo.array(new Float32Array([0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1]))
                }, this.framebuffers = [this.igloo.framebuffer(), this.igloo.framebuffer()], this.framebuffers[0].texture = this.igloo.texture(null, this.igloo.gl.RGBA, this.igloo.gl.CLAMP_TO_EDGE, this.igloo.gl.NEAREST), this.framebuffers[1].texture = this.igloo.texture(null, this.igloo.gl.RGBA, this.igloo.gl.CLAMP_TO_EDGE, this.igloo.gl.NEAREST), this.texturePool = new s({
                    allocator: () => this.igloo.texture().blank(1, 1)
                })
            }
            modifyPoolSize(t) {
                this.texturePool.allocate(t)
            }
            drawToFBO(t) {
                this.framebuffers[t].attach(this.framebuffers[t].texture)
            }
            preWarmPoolForImage(t) {
                let e = this.texturePool.get(e => e.image === t);
                e || (e = this.texturePool.pop(), e.set(t), e.image = t, this.texturePool.push(e))
            }
            drawImage(t, e, i, s, n, A, l, c, u) {
                void 0 === s && void 0 === n ? (A = e, l = i, e = 0, i = 0, c = s = t.width, u = n = t.height) : void 0 === A && void 0 === l && (A = e, l = i, c = s, u = n, e = 0, i = 0, s = t.width, n = t.height);
                const d = this.igloo.gl;
                let m = this.texturePool.get(e => e.image === t);
                m || (m = this.texturePool.pop(), m.set(t), m.image = t), m.bind(0), this.program.use().uniformi("u_texture", 0).attrib("a_position", this.buffers.positionBuffer, 2).attrib("a_texcoord", this.buffers.texcoordBuffer, 2), r.ortho(o, 0, d.canvas.width, d.canvas.height, 0, -1, 1), r.identity(h), r.translate(h, h, [A, l, 0]), r.scale(h, h, [c, u, 1]), r.multiply(h, o, h), d.uniformMatrix4fv(this.program.uniforms.matrixLocation, !1, h), r.identity(a), r.translate(a, a, [e / t.width, i / t.height, 0]), r.scale(a, a, [s / t.width, n / t.height, 1]), d.uniformMatrix4fv(this.program.uniforms.textureMatrixLocation, !1, a), d.drawArrays(d.TRIANGLES, 0, 6), this.texturePool.push(m)
            }
            composite() {
                const t = this.igloo.gl;
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this.framebuffers[0].texture.bind(1), this.framebuffers[1].texture.bind(2), this.blendProgram.use().uniformi("imageTexture", 1).uniformi("maskTexture", 2).attrib("a_position", this.buffers.positionBuffer, 2).attrib("a_texcoord", this.buffers.texcoordBuffer, 2), r.ortho(o, 0, t.canvas.width, 0, t.canvas.height, -1, 1), r.scale(o, o, [t.canvas.width, t.canvas.height, 1]), t.uniformMatrix4fv(this.blendProgram.uniforms.matrixLocation, !1, o), t.drawArrays(t.TRIANGLES, 0, 6)
            }
            resizeCanvas(t, e) {
                this.canvas.width = t, this.canvas.height = e, [0, 1].forEach(t => {
                    this.framebuffers[t].texture.blank(this.canvas.width, this.canvas.height), this.framebuffers[t].texture.width = this.canvas.width, this.framebuffers[t].texture.height = this.canvas.height
                }), this.gl.viewport(0, 0, t, e), this.gl.clear(this.gl.COLOR_BUFFER_BIT)
            }
            destroy() {
                this.texturePool.destroy(), this.texturePool = null, this.canvas = null, this.gl = null, this.blendProgram = null, this.buffers = null, this.framebuffers = null
            }
        }
    }, {
        236: 236,
        66: 66,
        67: 67,
        68: 68,
        69: 69,
        70: 70,
        71: 71
    }],
    66: [function(t, e, i) {
        "use strict";

        function s(t, e) {
            var i;
            t instanceof HTMLCanvasElement ? (i = t, t = s.getContext(t, e)) : i = t.canvas, this.gl = t, this.canvas = i, this.defaultFramebuffer = new s.Framebuffer(t, null)
        }
        s.QUAD2 = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), s.fetch = function(t, e) {
            var i = new XMLHttpRequest;
            return i.open("GET", t, Boolean(e)), null != e && (i.onload = function() {
                e(i.responseText)
            }), i.send(), i.responseText
        }, s.getContext = function(t, e, i) {
            var s;
            try {
                s = t.getContext("webgl", e || {}) || t.getContext("experimental-webgl", e || {})
            } catch (t) {
                s = null
            }
            if (null != s || i) return s;
            throw new Error("Could not create WebGL context.")
        }, s.looksLikeURL = function(t) {
            return null == /\s/.exec(t)
        }, s.isArray = function(t) {
            var e = Object.prototype.toString.apply(t, []);
            return null != / (Float(32|64)|Int(16|32|8)|Uint(16|32|8(Clamped)?))?Array]$/.exec(e)
        }, s.prototype.program = function(t, e, i) {
            return s.looksLikeURL(t) && (t = s.fetch(t)), s.looksLikeURL(e) && (e = s.fetch(e)), null != i && (t = i(t), e = i(e)), new s.Program(this.gl, t, e)
        }, s.prototype.array = function(t, e) {
            var i = this.gl,
                n = new s.Buffer(i, i.ARRAY_BUFFER);
            return null != t && n.update(t, null == e ? i.STATIC_DRAW : e), n
        }, s.prototype.elements = function(t, e) {
            var i = this.gl,
                n = new s.Buffer(i, i.ELEMENT_ARRAY_BUFFER);
            return null != t && n.update(t, null == e ? i.STATIC_DRAW : e), n
        }, s.prototype.texture = function(t, e, i, n, r) {
            var A = new s.Texture(this.gl, e, i, n, r);
            return null != t && A.set(t), A
        }, s.prototype.framebuffer = function(t) {
            var e = new s.Framebuffer(this.gl);
            return null != t && e.attach(t), e
        }, s.Program = function(t, e, i) {
            this.gl = t, this.debug = !1;
            var s = this.program = t.createProgram();
            if (t.attachShader(s, this.makeShader(t.VERTEX_SHADER, e)), t.attachShader(s, this.makeShader(t.FRAGMENT_SHADER, i)), t.linkProgram(s), !t.getProgramParameter(s, t.LINK_STATUS)) throw new Error(t.getProgramInfoLog(s));
            this.vars = {}
        }, s.Program.prototype.makeShader = function(t, e) {
            var i = this.gl,
                s = i.createShader(t);
            if (i.shaderSource(s, e), i.compileShader(s), i.getShaderParameter(s, i.COMPILE_STATUS)) return s;
            throw new Error(i.getShaderInfoLog(s))
        }, s.Program.prototype.use = function() {
            return this.gl.useProgram(this.program), this
        }, s.Program.prototype.uniform = function(t, e, i) {
            if (null == e) this.vars[t] = this.gl.getUniformLocation(this.program, t);
            else {
                null == this.vars[t] && this.uniform(t);
                var n = this.vars[t];
                if (s.isArray(e)) {
                    var r = "uniform" + e.length + (i ? "i" : "f") + "v";
                    this.gl[r](n, e)
                } else {
                    if ("number" != typeof e && "boolean" != typeof e) throw new Error("Invalid uniform value: " + e);
                    i ? this.gl.uniform1i(n, e) : this.gl.uniform1f(n, e)
                }
            }
            return this
        }, s.Program.prototype.matrix = function(t, e, i) {
            null == this.vars[t] && this.uniform(t);
            var s = "uniformMatrix" + Math.sqrt(e.length) + "fv";
            return this.gl[s](this.vars[t], Boolean(i), e), this
        }, s.Program.prototype.uniformi = function(t, e) {
            return this.uniform(t, e, !0)
        }, s.Program.prototype.attrib = function(t, e, i, s) {
            var n = this.gl;
            return null == e ? this.vars[t] = n.getAttribLocation(this.program, t) : (null == this.vars[t] && this.attrib(t), e.bind(), n.enableVertexAttribArray(this.vars[t]), n.vertexAttribPointer(this.vars[t], i, n.FLOAT, !1, null == s ? 0 : s, 0)), this
        }, s.Program.prototype.draw = function(t, e, i) {
            var s = this.gl;
            if (null == i ? s.drawArrays(t, 0, e) : s.drawElements(t, e, i, 0), this.debug && s.getError() !== s.NO_ERROR) throw new Error("WebGL rendering error");
            return this
        }, s.Program.prototype.disable = function() {
            for (var t in this.vars) {
                var e = this.vars[t];
                this.vars.hasOwnProperty(t) && "number" == typeof e && this.gl.disableVertexAttribArray(e)
            }
            return this
        }, s.Buffer = function(t, e) {
            this.gl = t, this.buffer = t.createBuffer(), this.target = null == e ? t.ARRAY_BUFFER : e, this.size = -1
        }, s.Buffer.prototype.bind = function() {
            return this.gl.bindBuffer(this.target, this.buffer), this
        }, s.Buffer.prototype.update = function(t, e) {
            var i = this.gl;
            return t instanceof Array && (t = new Float32Array(t)), e = null == e ? i.DYNAMIC_DRAW : e, this.bind(), this.size !== t.byteLength ? (i.bufferData(this.target, t, e), this.size = t.byteLength) : i.bufferSubData(this.target, 0, t), this
        }, s.Texture = function(t, e, i, s, n) {
            this.gl = t;
            var r = this.texture = t.createTexture();
            t.bindTexture(t.TEXTURE_2D, r), i = null == i ? t.CLAMP_TO_EDGE : i, s = null == s ? t.LINEAR : s, t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, i), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, i), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, s), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, s), this.format = null == e ? t.RGBA : e, this.type = null == n ? t.UNSIGNED_BYTE : n
        }, s.Texture.prototype.bind = function(t) {
            var e = this.gl;
            return null != t && e.activeTexture(e.TEXTURE0 + t), e.bindTexture(e.TEXTURE_2D, this.texture), this
        }, s.Texture.prototype.blank = function(t, e) {
            var i = this.gl;
            return this.bind(), i.texImage2D(i.TEXTURE_2D, 0, this.format, t, e, 0, this.format, this.type, null), this
        }, s.Texture.prototype.set = function(t, e, i) {
            var s = this.gl;
            return this.bind(), t instanceof Array && (t = this.type == s.FLOAT ? new Float32Array(t) : new Uint8Array(t)), null != e || null != i ? s.texImage2D(s.TEXTURE_2D, 0, this.format, e, i, 0, this.format, this.type, t) : s.texImage2D(s.TEXTURE_2D, 0, this.format, this.format, this.type, t), this
        }, s.Texture.prototype.subset = function(t, e, i, s, n) {
            var r = this.gl;
            return this.bind(), t instanceof Array && (t = this.type == r.FLOAT ? new Float32Array(t) : new Uint8Array(t)), null != s || null != n ? r.texSubImage2D(r.TEXTURE_2D, 0, e, i, s, n, this.format, this.type, t) : r.texSubImage2D(r.TEXTURE_2D, 0, e, i, this.format, this.type, t), this
        }, s.Texture.prototype.copy = function(t, e, i, s) {
            var n = this.gl;
            return n.copyTexImage2D(n.TEXTURE_2D, 0, this.format, t, e, i, s, 0), this
        }, s.Framebuffer = function(t, e) {
            this.gl = t, this.framebuffer = 2 == arguments.length ? e : t.createFramebuffer(), this.renderbuffer = null
        }, s.Framebuffer.prototype.bind = function() {
            return this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer), this
        }, s.Framebuffer.prototype.unbind = function() {
            return this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this
        }, s.Framebuffer.prototype.attach = function(t) {
            var e = this.gl;
            return this.bind(), e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, t.texture, 0), this
        }, s.Framebuffer.prototype.attachDepth = function(t, e) {
            var i = this.gl;
            return this.bind(), null == this.renderbuffer && (this.renderbuffer = i.createRenderbuffer(), i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_COMPONENT16, t, e), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, this.renderbuffer)), this
        }, e.exports = s
    }, {}],
    67: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t) {
                this._objects = [], this._all = [], this.size = t.size || 0, this._allocator = t.allocator, this._deallocator = t.deallocator = () => {}, t.size && this.allocate(t.size)
            }
            allocate(t) {
                t < this.size && (this._all = this._all.slice(0, t), this._objects.forEach(t => this._deallocator(t)), this._objects = [], this.size = t), this.size = t;
                for (let t = this._all.length; t < this.size; t++) {
                    const t = this._allocator();
                    this._all.push(t), this._objects.push(t)
                }
            }
            push(t) {
                this._deallocator(t), this._objects.unshift(t)
            }
            pop() {
                if (0 === this._objects.length) throw "Object Pool ran out of objects";
                return this._objects.pop()
            }
            get(t) {
                for (let e = 0; e < this._objects.length; e++)
                    if (t(this._objects[e])) {
                        let t = this._objects[e];
                        return this._objects.splice(e, 1), t
                    }
                return null
            }
            destroy() {
                this._objects = null, this._all = null, this._allocator = null, this._deallocator = null
            }
        }
    }, {}],
    68: [function(t, e, i) {
        "use strict";
        e.exports = "precision mediump float;\n\nvarying vec2 v_texcoord;\n\nuniform sampler2D maskTexture;\nuniform sampler2D imageTexture;\n\nvoid main() {\n    vec4 mask = texture2D(maskTexture, v_texcoord);\n    vec4 image = texture2D(imageTexture, v_texcoord);\n    gl_FragColor = mix(image, vec4(0.0), mask.r);\n}"
    }, {}],
    69: [function(t, e, i) {
        "use strict";
        e.exports = "attribute vec4 a_position;\nattribute vec2 a_texcoord;\n\nuniform mat4 u_matrix;\n\nvarying vec2 v_texcoord;\n\nvoid main() {\n    gl_Position = u_matrix * a_position;\n    v_texcoord = a_texcoord;\n}"
    }, {}],
    70: [function(t, e, i) {
        "use strict";
        e.exports = "precision highp float;\n\nvarying vec2 v_texcoord;\nuniform sampler2D u_texture;\n\nvoid main() {\n    gl_FragColor = texture2D(u_texture, v_texcoord);\n}"
    }, {}],
    71: [function(t, e, i) {
        "use strict";
        e.exports = "precision highp float;\n\nattribute vec4 a_position;\nattribute vec2 a_texcoord;\n\nuniform mat4 u_matrix;\nuniform mat4 u_textureMatrix;\n\nvarying vec2 v_texcoord;\n\nvoid main() {\n    gl_Position = u_matrix * a_position;\n    v_texcoord = (u_textureMatrix * vec4(a_texcoord, 0, 1)).xy;\n}"
    }, {}],
    72: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t = 4) {
                this.concurrencyCount = t, this.queue = [], this.inProgressCount = 0, this.isRunning = !1
            }
            enqueueImage(t, e = 2) {
                return this.queue[e] || (this.queue[e] = new Array), new Promise((i, s) => {
                    this.queue[e].push({
                        resolve: i,
                        reject: s,
                        imageUrl: t
                    }), this._processNextQueueItem()
                }).then(() => this._loadImage(t))
            }
            start() {
                this.isRunning || (this.isRunning = !0, this._processNextQueueItem())
            }
            stop() {
                this.isRunning = !1
            }
            _loadImage(t) {
                return new Promise((e, i) => {
                    let s = new Image;
                    s.onload = () => {
                        this.inProgressCount--, this._processNextQueueItem(), e(s)
                    }, s.onerror = t => {
                        this.inProgressCount--, this._processNextQueueItem(), i(t)
                    }, s.src = t
                })
            }
            _processNextQueueItem() {
                if (this.inProgressCount >= this.concurrencyCount || !this.isRunning) return;
                let t = this.queue.find(t => t && t.length > 0);
                if (!t) return;
                let e = t.shift();
                this.inProgressCount++, e.resolve()
            }
        }
    }, {}],
    73: [function(t, e, i) {
        "use strict";
        var s = {};
        e.exports = function(t, e, i) {
            if (t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), i || !s.hasOwnProperty(t)) {
                var n = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(location.search),
                    r = null === n ? e : decodeURIComponent(n[1].replace(/\+/g, " "));
                "true" !== r && "false" !== r || (r = "true" === r), isNaN(parseFloat(r)) || (r = parseFloat(r)), s[t] = r
            }
            return s[t]
        }
    }, {}],
    74: [function(t, e, i) {
        e.exports = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }
    }, {}],
    75: [function(t, e, i) {
        var s = t(76);

        function n() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap;
            return n = function() {
                return t
            }, t
        }
        e.exports = function(t) {
            if (t && t.__esModule) return t;
            if (null === t || "object" !== s(t) && "function" != typeof t) return {
                default: t
            };
            var e = n();
            if (e && e.has(t)) return e.get(t);
            var i = {},
                r = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var A in t)
                if (Object.prototype.hasOwnProperty.call(t, A)) {
                    var o = r ? Object.getOwnPropertyDescriptor(t, A) : null;
                    o && (o.get || o.set) ? Object.defineProperty(i, A, o) : i[A] = t[A]
                }
            return i.default = t, e && e.set(t, i), i
        }
    }, {
        76: 76
    }],
    76: [function(t, e, i) {
        function s(t) {
            return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? e.exports = s = function(t) {
                return typeof t
            } : e.exports = s = function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, s(t)
        }
        e.exports = s
    }, {}],
    77: [function(t, e, i) {
        (function(i) {
            "use strict";
            var s = t(79);
            /*!
             * The buffer module from node.js, for the browser.
             *
             * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
             * @license  MIT
             */
            function n(t, e) {
                if (t === e) return 0;
                for (var i = t.length, s = e.length, n = 0, r = Math.min(i, s); n < r; ++n)
                    if (t[n] !== e[n]) {
                        i = t[n], s = e[n];
                        break
                    }
                return i < s ? -1 : s < i ? 1 : 0
            }

            function r(t) {
                return i.Buffer && "function" == typeof i.Buffer.isBuffer ? i.Buffer.isBuffer(t) : !(null == t || !t._isBuffer)
            }
            var A = t(81),
                o = Object.prototype.hasOwnProperty,
                a = Array.prototype.slice,
                h = "foo" === function() {}.name;

            function l(t) {
                return Object.prototype.toString.call(t)
            }

            function c(t) {
                return !r(t) && ("function" == typeof i.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : !!t && (t instanceof DataView || !!(t.buffer && t.buffer instanceof ArrayBuffer))))
            }
            var u = e.exports = y,
                d = /\s*function\s+([^\(\s]*)\s*/;

            function m(t) {
                if (A.isFunction(t)) {
                    if (h) return t.name;
                    var e = t.toString().match(d);
                    return e && e[1]
                }
            }

            function p(t, e) {
                return "string" == typeof t ? t.length < e ? t : t.slice(0, e) : t
            }

            function g(t) {
                if (h || !A.isFunction(t)) return A.inspect(t);
                var e = m(t);
                return "[Function" + (e ? ": " + e : "") + "]"
            }

            function f(t, e, i, s, n) {
                throw new u.AssertionError({
                    message: i,
                    actual: t,
                    expected: e,
                    operator: s,
                    stackStartFunction: n
                })
            }

            function y(t, e) {
                t || f(t, !0, e, "==", u.ok)
            }

            function I(t, e, i, s) {
                if (t === e) return !0;
                if (r(t) && r(e)) return 0 === n(t, e);
                if (A.isDate(t) && A.isDate(e)) return t.getTime() === e.getTime();
                if (A.isRegExp(t) && A.isRegExp(e)) return t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase;
                if (null !== t && "object" == typeof t || null !== e && "object" == typeof e) {
                    if (c(t) && c(e) && l(t) === l(e) && !(t instanceof Float32Array || t instanceof Float64Array)) return 0 === n(new Uint8Array(t.buffer), new Uint8Array(e.buffer));
                    if (r(t) !== r(e)) return !1;
                    var o = (s = s || {
                        actual: [],
                        expected: []
                    }).actual.indexOf(t);
                    return -1 !== o && o === s.expected.indexOf(e) || (s.actual.push(t), s.expected.push(e), function(t, e, i, s) {
                        if (null == t || null == e) return !1;
                        if (A.isPrimitive(t) || A.isPrimitive(e)) return t === e;
                        if (i && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e)) return !1;
                        var n = v(t),
                            r = v(e);
                        if (n && !r || !n && r) return !1;
                        if (n) return t = a.call(t), e = a.call(e), I(t, e, i);
                        var o, h, l = _(t),
                            c = _(e);
                        if (l.length !== c.length) return !1;
                        for (l.sort(), c.sort(), h = l.length - 1; h >= 0; h--)
                            if (l[h] !== c[h]) return !1;
                        for (h = l.length - 1; h >= 0; h--)
                            if (o = l[h], !I(t[o], e[o], i, s)) return !1;
                        return !0
                    }(t, e, i, s))
                }
                return i ? t === e : t == e
            }

            function v(t) {
                return "[object Arguments]" == Object.prototype.toString.call(t)
            }

            function E(t, e) {
                if (!t || !e) return !1;
                if ("[object RegExp]" == Object.prototype.toString.call(e)) return e.test(t);
                try {
                    if (t instanceof e) return !0
                } catch (t) {}
                return !Error.isPrototypeOf(e) && !0 === e.call({}, t)
            }

            function b(t, e, i, s) {
                var n;
                if ("function" != typeof e) throw new TypeError('"block" argument must be a function');
                "string" == typeof i && (s = i, i = null), n = function(t) {
                    var e;
                    try {
                        t()
                    } catch (t) {
                        e = t
                    }
                    return e
                }(e), s = (i && i.name ? " (" + i.name + ")." : ".") + (s ? " " + s : "."), t && !n && f(n, i, "Missing expected exception" + s);
                var r = "string" == typeof s,
                    o = !t && n && !i;
                if ((!t && A.isError(n) && r && E(n, i) || o) && f(n, i, "Got unwanted exception" + s), t && n && i && !E(n, i) || !t && n) throw n
            }
            u.AssertionError = function(t) {
                this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = function(t) {
                    return p(g(t.actual), 128) + " " + t.operator + " " + p(g(t.expected), 128)
                }(this), this.generatedMessage = !0);
                var e = t.stackStartFunction || f;
                if (Error.captureStackTrace) Error.captureStackTrace(this, e);
                else {
                    var i = new Error;
                    if (i.stack) {
                        var s = i.stack,
                            n = m(e),
                            r = s.indexOf("\n" + n);
                        if (r >= 0) {
                            var A = s.indexOf("\n", r + 1);
                            s = s.substring(A + 1)
                        }
                        this.stack = s
                    }
                }
            }, A.inherits(u.AssertionError, Error), u.fail = f, u.ok = y, u.equal = function(t, e, i) {
                t != e && f(t, e, i, "==", u.equal)
            }, u.notEqual = function(t, e, i) {
                t == e && f(t, e, i, "!=", u.notEqual)
            }, u.deepEqual = function(t, e, i) {
                I(t, e, !1) || f(t, e, i, "deepEqual", u.deepEqual)
            }, u.deepStrictEqual = function(t, e, i) {
                I(t, e, !0) || f(t, e, i, "deepStrictEqual", u.deepStrictEqual)
            }, u.notDeepEqual = function(t, e, i) {
                I(t, e, !1) && f(t, e, i, "notDeepEqual", u.notDeepEqual)
            }, u.notDeepStrictEqual = function t(e, i, s) {
                I(e, i, !0) && f(e, i, s, "notDeepStrictEqual", t)
            }, u.strictEqual = function(t, e, i) {
                t !== e && f(t, e, i, "===", u.strictEqual)
            }, u.notStrictEqual = function(t, e, i) {
                t === e && f(t, e, i, "!==", u.notStrictEqual)
            }, u.throws = function(t, e, i) {
                b(!0, t, e, i)
            }, u.doesNotThrow = function(t, e, i) {
                b(!1, t, e, i)
            }, u.ifError = function(t) {
                if (t) throw t
            }, u.strict = s((function t(e, i) {
                e || f(e, !0, i, "==", t)
            }), u, {
                equal: u.strictEqual,
                deepEqual: u.deepStrictEqual,
                notEqual: u.notStrictEqual,
                notDeepEqual: u.notDeepStrictEqual
            }), u.strict.strict = u.strict;
            var _ = Object.keys || function(t) {
                var e = [];
                for (var i in t) o.call(t, i) && e.push(i);
                return e
            }
        }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        79: 79,
        81: 81
    }],
    78: [function(t, e, i) {
        "use strict";
        "function" == typeof Object.create ? e.exports = function(t, e) {
            t.super_ = e, t.prototype = Object.create(e.prototype, {
                constructor: {
                    value: t,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        } : e.exports = function(t, e) {
            t.super_ = e;
            var i = function() {};
            i.prototype = e.prototype, t.prototype = new i, t.prototype.constructor = t
        }
    }, {}],
    79: [function(t, e, i) {
        "use strict";
        var s = Object.getOwnPropertySymbols,
            n = Object.prototype.hasOwnProperty,
            r = Object.prototype.propertyIsEnumerable;

        function A(t) {
            if (null == t) throw new TypeError("Object.assign cannot be called with null or undefined");
            return Object(t)
        }
        e.exports = function() {
            try {
                if (!Object.assign) return !1;
                var t = new String("abc");
                if (t[5] = "de", "5" === Object.getOwnPropertyNames(t)[0]) return !1;
                for (var e = {}, i = 0; i < 10; i++) e["_" + String.fromCharCode(i)] = i;
                if ("0123456789" !== Object.getOwnPropertyNames(e).map((function(t) {
                        return e[t]
                    })).join("")) return !1;
                var s = {};
                return "abcdefghijklmnopqrst".split("").forEach((function(t) {
                    s[t] = t
                })), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, s)).join("")
            } catch (t) {
                return !1
            }
        }() ? Object.assign : function(t, e) {
            for (var i, o, a = A(t), h = 1; h < arguments.length; h++) {
                for (var l in i = Object(arguments[h])) n.call(i, l) && (a[l] = i[l]);
                if (s) {
                    o = s(i);
                    for (var c = 0; c < o.length; c++) r.call(i, o[c]) && (a[o[c]] = i[o[c]])
                }
            }
            return a
        }
    }, {}],
    80: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8
        }
    }, {}],
    81: [function(t, e, i) {
        (function(e, s) {
            "use strict";
            var n = /%[sdj%]/g;
            i.format = function(t) {
                if (!f(t)) {
                    for (var e = [], i = 0; i < arguments.length; i++) e.push(o(arguments[i]));
                    return e.join(" ")
                }
                i = 1;
                for (var s = arguments, r = s.length, A = String(t).replace(n, (function(t) {
                        if ("%%" === t) return "%";
                        if (i >= r) return t;
                        switch (t) {
                            case "%s":
                                return String(s[i++]);
                            case "%d":
                                return Number(s[i++]);
                            case "%j":
                                try {
                                    return JSON.stringify(s[i++])
                                } catch (t) {
                                    return "[Circular]"
                                }
                            default:
                                return t
                        }
                    })), a = s[i]; i < r; a = s[++i]) p(a) || !v(a) ? A += " " + a : A += " " + o(a);
                return A
            }, i.deprecate = function(t, n) {
                if (y(s.process)) return function() {
                    return i.deprecate(t, n).apply(this, arguments)
                };
                if (!0 === e.noDeprecation) return t;
                var r = !1;
                return function() {
                    if (!r) {
                        if (e.throwDeprecation) throw new Error(n);
                        e.traceDeprecation ? console.trace(n) : console.error(n), r = !0
                    }
                    return t.apply(this, arguments)
                }
            };
            var r, A = {};

            function o(t, e) {
                var s = {
                    seen: [],
                    stylize: h
                };
                return arguments.length >= 3 && (s.depth = arguments[2]), arguments.length >= 4 && (s.colors = arguments[3]), m(e) ? s.showHidden = e : e && i._extend(s, e), y(s.showHidden) && (s.showHidden = !1), y(s.depth) && (s.depth = 2), y(s.colors) && (s.colors = !1), y(s.customInspect) && (s.customInspect = !0), s.colors && (s.stylize = a), l(s, t, s.depth)
            }

            function a(t, e) {
                var i = o.styles[e];
                return i ? "[" + o.colors[i][0] + "m" + t + "[" + o.colors[i][1] + "m" : t
            }

            function h(t, e) {
                return t
            }

            function l(t, e, s) {
                if (t.customInspect && e && _(e.inspect) && e.inspect !== i.inspect && (!e.constructor || e.constructor.prototype !== e)) {
                    var n = e.inspect(s, t);
                    return f(n) || (n = l(t, n, s)), n
                }
                var r = function(t, e) {
                    if (y(e)) return t.stylize("undefined", "undefined");
                    if (f(e)) {
                        var i = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                        return t.stylize(i, "string")
                    }
                    if (g(e)) return t.stylize("" + e, "number");
                    if (m(e)) return t.stylize("" + e, "boolean");
                    if (p(e)) return t.stylize("null", "null")
                }(t, e);
                if (r) return r;
                var A = Object.keys(e),
                    o = function(t) {
                        var e = {};
                        return t.forEach((function(t, i) {
                            e[t] = !0
                        })), e
                    }(A);
                if (t.showHidden && (A = Object.getOwnPropertyNames(e)), b(e) && (A.indexOf("message") >= 0 || A.indexOf("description") >= 0)) return c(e);
                if (0 === A.length) {
                    if (_(e)) {
                        var a = e.name ? ": " + e.name : "";
                        return t.stylize("[Function" + a + "]", "special")
                    }
                    if (I(e)) return t.stylize(RegExp.prototype.toString.call(e), "regexp");
                    if (E(e)) return t.stylize(Date.prototype.toString.call(e), "date");
                    if (b(e)) return c(e)
                }
                var h, v = "",
                    C = !1,
                    w = ["{", "}"];
                (d(e) && (C = !0, w = ["[", "]"]), _(e)) && (v = " [Function" + (e.name ? ": " + e.name : "") + "]");
                return I(e) && (v = " " + RegExp.prototype.toString.call(e)), E(e) && (v = " " + Date.prototype.toUTCString.call(e)), b(e) && (v = " " + c(e)), 0 !== A.length || C && 0 != e.length ? s < 0 ? I(e) ? t.stylize(RegExp.prototype.toString.call(e), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(e), h = C ? function(t, e, i, s, n) {
                    for (var r = [], A = 0, o = e.length; A < o; ++A) S(e, String(A)) ? r.push(u(t, e, i, s, String(A), !0)) : r.push("");
                    return n.forEach((function(n) {
                        n.match(/^\d+$/) || r.push(u(t, e, i, s, n, !0))
                    })), r
                }(t, e, s, o, A) : A.map((function(i) {
                    return u(t, e, s, o, i, C)
                })), t.seen.pop(), function(t, e, i) {
                    if (t.reduce((function(t, e) {
                            return e.indexOf("\n") >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1
                        }), 0) > 60) return i[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + i[1];
                    return i[0] + e + " " + t.join(", ") + " " + i[1]
                }(h, v, w)) : w[0] + v + w[1]
            }

            function c(t) {
                return "[" + Error.prototype.toString.call(t) + "]"
            }

            function u(t, e, i, s, n, r) {
                var A, o, a;
                if ((a = Object.getOwnPropertyDescriptor(e, n) || {
                        value: e[n]
                    }).get ? o = a.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : a.set && (o = t.stylize("[Setter]", "special")), S(s, n) || (A = "[" + n + "]"), o || (t.seen.indexOf(a.value) < 0 ? (o = p(i) ? l(t, a.value, null) : l(t, a.value, i - 1)).indexOf("\n") > -1 && (o = r ? o.split("\n").map((function(t) {
                        return "  " + t
                    })).join("\n").substr(2) : "\n" + o.split("\n").map((function(t) {
                        return "   " + t
                    })).join("\n")) : o = t.stylize("[Circular]", "special")), y(A)) {
                    if (r && n.match(/^\d+$/)) return o;
                    (A = JSON.stringify("" + n)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (A = A.substr(1, A.length - 2), A = t.stylize(A, "name")) : (A = A.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), A = t.stylize(A, "string"))
                }
                return A + ": " + o
            }

            function d(t) {
                return Array.isArray(t)
            }

            function m(t) {
                return "boolean" == typeof t
            }

            function p(t) {
                return null === t
            }

            function g(t) {
                return "number" == typeof t
            }

            function f(t) {
                return "string" == typeof t
            }

            function y(t) {
                return void 0 === t
            }

            function I(t) {
                return v(t) && "[object RegExp]" === C(t)
            }

            function v(t) {
                return "object" == typeof t && null !== t
            }

            function E(t) {
                return v(t) && "[object Date]" === C(t)
            }

            function b(t) {
                return v(t) && ("[object Error]" === C(t) || t instanceof Error)
            }

            function _(t) {
                return "function" == typeof t
            }

            function C(t) {
                return Object.prototype.toString.call(t)
            }

            function w(t) {
                return t < 10 ? "0" + t.toString(10) : t.toString(10)
            }
            i.debuglog = function(t) {
                if (y(r) && (r = e.env.NODE_DEBUG || ""), t = t.toUpperCase(), !A[t])
                    if (new RegExp("\\b" + t + "\\b", "i").test(r)) {
                        var s = e.pid;
                        A[t] = function() {
                            var e = i.format.apply(i, arguments);
                            console.error("%s %d: %s", t, s, e)
                        }
                    } else A[t] = function() {};
                return A[t]
            }, i.inspect = o, o.colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
            }, o.styles = {
                special: "cyan",
                number: "yellow",
                boolean: "yellow",
                undefined: "grey",
                null: "bold",
                string: "green",
                date: "magenta",
                regexp: "red"
            }, i.isArray = d, i.isBoolean = m, i.isNull = p, i.isNullOrUndefined = function(t) {
                return null == t
            }, i.isNumber = g, i.isString = f, i.isSymbol = function(t) {
                return "symbol" == typeof t
            }, i.isUndefined = y, i.isRegExp = I, i.isObject = v, i.isDate = E, i.isError = b, i.isFunction = _, i.isPrimitive = function(t) {
                return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t
            }, i.isBuffer = t(80);
            var x = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            function T() {
                var t = new Date,
                    e = [w(t.getHours()), w(t.getMinutes()), w(t.getSeconds())].join(":");
                return [t.getDate(), x[t.getMonth()], e].join(" ")
            }

            function S(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            i.log = function() {
                console.log("%s - %s", T(), i.format.apply(i, arguments))
            }, i.inherits = t(78), i._extend = function(t, e) {
                if (!e || !v(e)) return t;
                for (var i = Object.keys(e), s = i.length; s--;) t[i[s]] = e[i[s]];
                return t
            }
        }).call(this, t(83), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        78: 78,
        80: 80,
        83: 83
    }],
    82: [function(t, e, i) {}, {}],
    83: [function(t, e, i) {
        "use strict";
        var s, n, r = e.exports = {};

        function A() {
            throw new Error("setTimeout has not been defined")
        }

        function o() {
            throw new Error("clearTimeout has not been defined")
        }

        function a(t) {
            if (s === setTimeout) return setTimeout(t, 0);
            if ((s === A || !s) && setTimeout) return s = setTimeout, setTimeout(t, 0);
            try {
                return s(t, 0)
            } catch (e) {
                try {
                    return s.call(null, t, 0)
                } catch (e) {
                    return s.call(this, t, 0)
                }
            }
        }! function() {
            try {
                s = "function" == typeof setTimeout ? setTimeout : A
            } catch (t) {
                s = A
            }
            try {
                n = "function" == typeof clearTimeout ? clearTimeout : o
            } catch (t) {
                n = o
            }
        }();
        var h, l = [],
            c = !1,
            u = -1;

        function d() {
            c && h && (c = !1, h.length ? l = h.concat(l) : u = -1, l.length && m())
        }

        function m() {
            if (!c) {
                var t = a(d);
                c = !0;
                for (var e = l.length; e;) {
                    for (h = l, l = []; ++u < e;) h && h[u].run();
                    u = -1, e = l.length
                }
                h = null, c = !1,
                    function(t) {
                        if (n === clearTimeout) return clearTimeout(t);
                        if ((n === o || !n) && clearTimeout) return n = clearTimeout, clearTimeout(t);
                        try {
                            n(t)
                        } catch (e) {
                            try {
                                return n.call(null, t)
                            } catch (e) {
                                return n.call(this, t)
                            }
                        }
                    }(t)
            }
        }

        function p(t, e) {
            this.fun = t, this.array = e
        }

        function g() {}
        r.nextTick = function(t) {
            var e = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
            l.push(new p(t, e)), 1 !== l.length || c || a(m)
        }, p.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = g, r.addListener = g, r.once = g, r.off = g, r.removeListener = g, r.removeAllListeners = g, r.emit = g, r.prependListener = g, r.prependOnceListener = g, r.listeners = function(t) {
            return []
        }, r.binding = function(t) {
            throw new Error("process.binding is not supported")
        }, r.cwd = function() {
            return "/"
        }, r.chdir = function(t) {
            throw new Error("process.chdir is not supported")
        }, r.umask = function() {
            return 0
        }
    }, {}],
    84: [function(t, e, i) {
        "use strict";
        var s = t(61).EventEmitterMicro,
            n = t(50),
            r = t(51),
            A = t(100),
            o = t(86);

        function a(t) {
            this._keysDown = {}, this._DOMKeyDown = this._DOMKeyDown.bind(this), this._DOMKeyUp = this._DOMKeyUp.bind(this), this._context = t || document, n(this._context, "keydown", this._DOMKeyDown, !0), n(this._context, "keyup", this._DOMKeyUp, !0), s.call(this)
        }
        var h = a.prototype = A(s.prototype);
        h.onDown = function(t, e) {
            return this.on("keydown:" + t, e)
        }, h.onceDown = function(t, e) {
            return this.once("keydown:" + t, e)
        }, h.offDown = function(t, e) {
            return this.off("keydown:" + t, e)
        }, h.onUp = function(t, e) {
            return this.on("keyup:" + t, e)
        }, h.onceUp = function(t, e) {
            return this.once("keyup:" + t, e)
        }, h.offUp = function(t, e) {
            return this.off("keyup:" + t, e)
        }, h.isDown = function(t) {
            return t += "", this._keysDown[t] || !1
        }, h.isUp = function(t) {
            return !this.isDown(t)
        }, h.destroy = function() {
            return r(this._context, "keydown", this._DOMKeyDown, !0), r(this._context, "keyup", this._DOMKeyUp, !0), this._keysDown = null, this._context = null, s.prototype.destroy.call(this), this
        }, h._DOMKeyDown = function(t) {
            var e = this._normalizeKeyboardEvent(t),
                i = e.keyCode += "";
            this._trackKeyDown(i), this.trigger("keydown:" + i, e)
        }, h._DOMKeyUp = function(t) {
            var e = this._normalizeKeyboardEvent(t),
                i = e.keyCode += "";
            this._trackKeyUp(i), this.trigger("keyup:" + i, e)
        }, h._normalizeKeyboardEvent = function(t) {
            return new o(t)
        }, h._trackKeyUp = function(t) {
            this._keysDown[t] && (this._keysDown[t] = !1)
        }, h._trackKeyDown = function(t) {
            this._keysDown[t] || (this._keysDown[t] = !0)
        }, e.exports = a
    }, {
        100: 100,
        50: 50,
        51: 51,
        61: 61,
        86: 86
    }],
    85: [function(t, e, i) {
        "use strict";
        var s = t(84);
        e.exports = new s
    }, {
        84: 84
    }],
    86: [function(t, e, i) {
        "use strict";
        var s = t(87),
            n = ["keyLocation", "keyIdentifier"];

        function r(t) {
            var e;
            for (e in this.originalEvent = t, t) - 1 === n.indexOf(e) && "function" != typeof t[e] && (this[e] = t[e]);
            this.keyCode || (this.keyCode = this._getKeyCode()), this.location = void 0 !== this.originalEvent.location ? this.originalEvent.location : this.originalEvent.keyLocation
        }
        r.prototype = {
            preventDefault: function() {
                if ("function" == typeof this.originalEvent.preventDefault) return this.originalEvent.preventDefault();
                this.originalEvent.returnValue = !1
            },
            stopPropagation: function() {
                return this.originalEvent.stopPropagation()
            },
            _getKeyCode: function() {
                return s[this.code] || -1
            }
        }, e.exports = r
    }, {
        87: 87
    }],
    87: [function(t, e, i) {
        "use strict";
        e.exports = {
            Backspace: 8,
            Tab: 9,
            Enter: 13,
            NumpadEnter: 13,
            ShiftLeft: 16,
            ShiftRight: 16,
            ControlLeft: 17,
            ControlRight: 17,
            AltLeft: 18,
            AltRight: 18,
            CapsLock: 20,
            Escape: 27,
            PageUp: 33,
            PageDown: 34,
            End: 35,
            Home: 36,
            ArrowLeft: 37,
            ArrowUp: 38,
            ArrowRight: 39,
            ArrowDown: 40,
            Delete: 46,
            Digit0: 48,
            Digit1: 49,
            Digit2: 50,
            Digit3: 51,
            Digit4: 52,
            Digit5: 53,
            Digit6: 54,
            Digit7: 55,
            Digit8: 56,
            Digit9: 57,
            KeyA: 65,
            KeyB: 66,
            KeyC: 67,
            KeyD: 68,
            KeyE: 69,
            KeyF: 70,
            KeyG: 71,
            KeyH: 72,
            KeyI: 73,
            KeyJ: 74,
            KeyK: 75,
            KeyL: 76,
            KeyM: 77,
            KeyN: 78,
            KeyO: 79,
            KeyP: 80,
            KeyQ: 81,
            KeyR: 82,
            KeyS: 83,
            KeyT: 84,
            KeyU: 85,
            KeyV: 86,
            KeyW: 87,
            KeyX: 88,
            KeyY: 89,
            KeyZ: 90,
            Numpad0: 96,
            Numpad1: 97,
            Numpad2: 98,
            Numpad3: 99,
            Numpad4: 100,
            Numpad5: 101,
            Numpad6: 102,
            Numpad7: 103,
            Numpad8: 104,
            Numpad9: 105,
            NumpadMultiply: 106,
            NumpadAdd: 107,
            NumpadSubtract: 109,
            NumpadDecimal: 110,
            NumpadDivide: 111,
            NumpadEqual: 187,
            Backquote: 192,
            BracketLeft: 219,
            BracketRight: 221,
            Backslash: 220,
            Semicolon: 186,
            Quote: 222,
            Space: 32,
            Equal: 187,
            Comma: 188,
            Minus: 189,
            Period: 190,
            Slash: 191
        }
    }, {}],
    88: [function(t, e, i) {
        "use strict";
        e.exports = {
            BACKSPACE: 8,
            TAB: 9,
            ENTER: 13,
            SHIFT: 16,
            CONTROL: 17,
            ALT: 18,
            COMMAND: 91,
            CAPSLOCK: 20,
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            END: 35,
            HOME: 36,
            ARROW_LEFT: 37,
            ARROW_UP: 38,
            ARROW_RIGHT: 39,
            ARROW_DOWN: 40,
            DELETE: 46,
            ZERO: 48,
            ONE: 49,
            TWO: 50,
            THREE: 51,
            FOUR: 52,
            FIVE: 53,
            SIX: 54,
            SEVEN: 55,
            EIGHT: 56,
            NINE: 57,
            A: 65,
            B: 66,
            C: 67,
            D: 68,
            E: 69,
            F: 70,
            G: 71,
            H: 72,
            I: 73,
            J: 74,
            K: 75,
            L: 76,
            M: 77,
            N: 78,
            O: 79,
            P: 80,
            Q: 81,
            R: 82,
            S: 83,
            T: 84,
            U: 85,
            V: 86,
            W: 87,
            X: 88,
            Y: 89,
            Z: 90,
            NUMPAD_ZERO: 96,
            NUMPAD_ONE: 97,
            NUMPAD_TWO: 98,
            NUMPAD_THREE: 99,
            NUMPAD_FOUR: 100,
            NUMPAD_FIVE: 101,
            NUMPAD_SIX: 102,
            NUMPAD_SEVEN: 103,
            NUMPAD_EIGHT: 104,
            NUMPAD_NINE: 105,
            NUMPAD_ASTERISK: 106,
            NUMPAD_PLUS: 107,
            NUMPAD_DASH: 109,
            NUMPAD_DOT: 110,
            NUMPAD_SLASH: 111,
            NUMPAD_EQUALS: 187,
            TICK: 192,
            LEFT_BRACKET: 219,
            RIGHT_BRACKET: 221,
            BACKSLASH: 220,
            SEMICOLON: 186,
            APOSTRAPHE: 222,
            APOSTROPHE: 222,
            SPACEBAR: 32,
            CLEAR: 12,
            COMMA: 188,
            DOT: 190,
            SLASH: 191
        }
    }, {}],
    89: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            if ((t = t || window) === window) {
                if (e = window.pageXOffset) return e;
                t = document.documentElement || document.body.parentNode || document.body
            }
            return t.scrollLeft
        }
    }, {}],
    90: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e;
            if ((t = t || window) === window) {
                if (e = window.pageYOffset) return e;
                t = document.documentElement || document.body.parentNode || document.body
            }
            return t.scrollTop
        }
    }, {}],
    91: [function(t, e, i) {
        "use strict";
        e.exports = {
            Modal: t(92),
            Renderer: t(93),
            classNames: t(94),
            dataAttributes: t(95)
        }
    }, {
        92: 92,
        93: 93,
        94: 94,
        95: 95
    }],
    92: [function(t, e, i) {
        "use strict";
        var s = {
                addEventListener: t(46),
                removeEventListener: t(47),
                target: t(49)
            },
            n = {
                getScrollX: t(89),
                getScrollY: t(90)
            },
            r = {
                create: t(100),
                defaults: t(101)
            },
            A = t(85),
            o = t(88),
            a = t(61).EventEmitterMicro,
            h = t(93),
            l = {
                retainScrollPosition: !1
            };

        function c(t, e) {
            a.call(this), this.options = r.defaults(l, t), this.renderer = new h(e), this.opened = !1, this._keysToClose = [o.ESCAPE], this._attachedKeysToClose = [], this.close = this.close.bind(this)
        }
        var u = c.prototype = r.create(a.prototype);
        u.open = function() {
            this.options.retainScrollPosition && this._saveScrollPosition(), this.opened || (this._attachEvents(), this.trigger("willopen"), this.renderer.open(), this.opened = !0, this.trigger("open"))
        }, u.close = function(t) {
            var e, i;
            if (this.opened) {
                if (t && "click" === t.type && (e = s.target(t), i = this.renderer.options.dataAttributes.close, !e.hasAttribute(i))) return;
                this.trigger("willclose"), this._removeEvents(), this.renderer.close(), this.options.retainScrollPosition && this._restoreScrollPosition(), this.opened = !1, this.trigger("close")
            }
        }, u.render = function() {
            this.renderer.render()
        }, u.appendContent = function(t, e) {
            this.renderer.appendContent(t, e)
        }, u.removeContent = function(t) {
            this.renderer.removeContent(t)
        }, u.destroy = function() {
            for (var t in this._removeEvents(), this.renderer.destroy(), this) this.hasOwnProperty(t) && (this[t] = null)
        }, u.addKeyToClose = function(t) {
            -1 === this._keysToClose.indexOf(t) && (this._keysToClose.push(t), this._bindKeyToClose(t))
        }, u.removeKeyToClose = function(t) {
            var e = this._keysToClose.indexOf(t); - 1 !== e && this._keysToClose.splice(e, 1), this._releaseKeyToClose(t)
        }, u._bindKeyToClose = function(t) {
            -1 === this._attachedKeysToClose.indexOf(t) && (A.onUp(t, this.close), this._attachedKeysToClose.push(t))
        }, u._releaseKeyToClose = function(t) {
            var e = this._attachedKeysToClose.indexOf(t); - 1 !== e && (A.offUp(t, this.close), this._attachedKeysToClose.splice(e, 1))
        }, u._removeEvents = function() {
            this.renderer.modalElement && s.removeEventListener(this.renderer.modalElement, "click", this.close), this._keysToClose.forEach(this._releaseKeyToClose, this)
        }, u._attachEvents = function() {
            this.renderer.modalElement && s.addEventListener(this.renderer.modalElement, "click", this.close), this._keysToClose.forEach(this._bindKeyToClose, this)
        }, u._restoreScrollPosition = function() {
            window.scrollTo(this._scrollX || 0, this._scrollY || 0)
        }, u._saveScrollPosition = function() {
            this._scrollX = n.getScrollX(), this._scrollY = n.getScrollY()
        }, e.exports = c
    }, {
        100: 100,
        101: 101,
        46: 46,
        47: 47,
        49: 49,
        61: 61,
        85: 85,
        88: 88,
        89: 89,
        90: 90,
        93: 93
    }],
    93: [function(t, e, i) {
        "use strict";
        var s = {
                add: t(19),
                remove: t(24)
            },
            n = {
                defaults: t(101)
            },
            r = {
                remove: t(60),
                isElement: t(58)
            },
            A = {
                modalElement: null,
                contentElement: null,
                closeButton: null,
                classNames: t(94),
                dataAttributes: t(95)
            },
            o = function(t) {
                t = t || {}, this.options = n.defaults(A, t), this.options.classNames = n.defaults(A.classNames, t.classNames), this.options.dataAttributes = n.defaults(A.dataAttributes, t.dataAttributes), this.modalElement = this.options.modalElement, this.contentElement = this.options.contentElement, this.closeButton = this.options.closeButton
            },
            a = o.prototype;
        a.render = function() {
            return r.isElement(this.modalElement) || (this.modalElement = this.renderModalElement(this.options.classNames.modalElement)), r.isElement(this.contentElement) || (this.contentElement = this.renderContentElement(this.options.classNames.contentElement)), !1 !== this.closeButton && (r.isElement(this.closeButton) || (this.closeButton = this.renderCloseButton(this.options.classNames.closeButton)), this.modalElement.appendChild(this.closeButton)), this.modalElement.appendChild(this.contentElement), document.body.appendChild(this.modalElement), this.modalElement
        }, a.renderCloseButton = function(t) {
            var e;
            return t = t || this.options.classNames.closeButton, (e = this._renderElement("button", t)).setAttribute(this.options.dataAttributes.close, ""), e
        }, a.renderModalElement = function(t) {
            return t = t || this.options.classNames.modalElement, this._renderElement("div", t)
        }, a.renderContentElement = function(t) {
            return t = t || this.options.classNames.contentElement, this._renderElement("div", t)
        }, a.appendContent = function(t, e) {
            r.isElement(t) && (void 0 === arguments[1] ? this.contentElement.appendChild(t) : r.isElement(e) && e.appendChild(t))
        }, a.removeContent = function(t) {
            t ? this.modalElement.contains(t) && r.remove(t) : this._emptyContent()
        }, a.open = function() {
            var t = [document.documentElement].concat(this.options.classNames.documentElement),
                e = [this.modalElement].concat(this.options.classNames.modalOpen);
            s.add.apply(null, t), s.add.apply(null, e)
        }, a.close = function() {
            var t = [document.documentElement].concat(this.options.classNames.documentElement),
                e = [this.modalElement].concat(this.options.classNames.modalOpen);
            s.remove.apply(null, t), s.remove.apply(null, e)
        }, a.destroy = function() {
            var t = [document.documentElement].concat(this.options.classNames.documentElement);
            for (var e in this.modalElement && document.body.contains(this.modalElement) && (this.close(), document.body.removeChild(this.modalElement)), s.remove.apply(null, t), this) this.hasOwnProperty(e) && (this[e] = null)
        }, a._renderElement = function(t, e) {
            var i = document.createElement(t),
                n = [i];
            return e && (n = n.concat(e)), s.add.apply(null, n), i
        }, a._emptyContent = function() {
            this.contentElement.innerHTML = ""
        }, e.exports = o
    }, {
        101: 101,
        19: 19,
        24: 24,
        58: 58,
        60: 60,
        94: 94,
        95: 95
    }],
    94: [function(t, e, i) {
        "use strict";
        e.exports = {
            modalElement: "modal",
            modalOpen: "modal-open",
            documentElement: "has-modal",
            contentElement: "modal-content",
            closeButton: "modal-close"
        }
    }, {}],
    95: [function(t, e, i) {
        "use strict";
        e.exports = {
            close: "data-modal-close"
        }
    }, {}],
    96: [function(t, e, i) {
        "use strict";
        e.exports = {
            Modal: t(97),
            createStandardModal: t(99),
            createFullViewportModal: t(98)
        }
    }, {
        97: 97,
        98: 98,
        99: 99
    }],
    97: [function(t, e, i) {
        "use strict";
        var s = t(91).Modal,
            n = t(61).EventEmitterMicro,
            r = t(2);

        function A(t) {
            n.call(this), this.options = t || {}, this._modal = new s(t, this.options.renderer), this.opened = !1, this._render(), this.closeButton = this._modal.renderer.closeButton, this.modalElement = this._modal.renderer.modalElement, this.contentElement = this._modal.renderer.contentElement, this.modalElement.setAttribute("role", "dialog"), this.modalElement.setAttribute("aria-label", "Modal"), this.modalElement.setAttribute("aria-modal", "true"), this.modalElement.setAttribute("tabindex", "-1"), this.closeButton.setAttribute("aria-label", "Close"), this._circularTab = new r(this.modalElement), this._onWillOpen = this._onWillOpen.bind(this), this._onOpen = this._onOpen.bind(this), this._onWillClose = this._onWillClose.bind(this), this._onClose = this._onClose.bind(this), this._bindEvents()
        }
        var o = A.prototype = Object.create(n.prototype);
        o.open = function() {
            this._modal.open(), this.opened = this._modal.opened
        }, o.close = function() {
            this._modal.close()
        }, o.appendContent = function(t) {
            this._modal.appendContent(t)
        }, o.removeContent = function(t) {
            this._modal.removeContent(t)
        }, o.destroy = function() {
            for (var t in this._releaseEvents(), this._modal.destroy(), this._removeModalFocus(), this._circularTab.destroy(), this._focusObj = null, this) this.hasOwnProperty(t) && (this[t] = null)
        }, o.addKeyToClose = function(t) {
            this._modal.addKeyToClose(t)
        }, o.removeKeyToClose = function(t) {
            this._modal.removeKeyToClose(t)
        }, o._render = function() {
            this._modal.render(), this._modal.renderer.modalElement.setAttribute("aria-hidden", "true")
        }, o._bindEvents = function() {
            this._modal.on("willopen", this._onWillOpen), this._modal.on("open", this._onOpen), this._modal.on("willclose", this._onWillClose), this._modal.on("close", this._onClose)
        }, o._releaseEvents = function() {
            this._modal.off("willopen", this._onWillOpen), this._modal.off("open", this._onOpen), this._modal.off("willclose", this._onWillClose), this._modal.off("close", this._onClose)
        }, o._onWillOpen = function() {
            this.trigger("willopen")
        }, o._onOpen = function() {
            this.opened = this._modal.opened, this._giveModalFocus(), this.trigger("open")
        }, o._onWillClose = function() {
            this.trigger("willclose"), this._removeModalFocus()
        }, o._onClose = function() {
            this.opened = this._modal.opened, this.trigger("close")
        }, o._giveModalFocus = function() {
            this.modalElement.removeAttribute("aria-hidden"), this._activeElement = document.activeElement, this._circularTab.start(!0), setTimeout(function() {
                this.modalElement.focus()
            }.bind(this), 300)
        }, o._removeModalFocus = function() {
            this._circularTab.stop(), this.modalElement.setAttribute("aria-hidden", "true"), this._activeElement && (this._activeElement.focus(), this._activeElement = null)
        }, e.exports = A
    }, {
        2: 2,
        61: 61,
        91: 91
    }],
    98: [function(t, e, i) {
        "use strict";
        var s = t(97),
            n = t(91).classNames,
            r = {
                retainScrollPosition: !0,
                renderer: {
                    classNames: {
                        documentElement: [n.documentElement].concat("has-modal-full-viewport"),
                        modalElement: [n.modalElement].concat("modal-full-viewport")
                    }
                }
            };
        e.exports = function(t, e) {
            var i = new s(r),
                n = e || {};
            return t && i.appendContent(t), n.removeContainerPadding && i.modalElement.classList.add("remove-container-padding"), i
        }
    }, {
        91: 91,
        97: 97
    }],
    99: [function(t, e, i) {
        "use strict";
        var s = t(97),
            n = t(91).classNames,
            r = t(91).dataAttributes,
            A = {
                add: t(19)
            },
            o = {
                renderer: {
                    classNames: {
                        documentElement: [n.documentElement].concat("has-modal-standard"),
                        modalElement: [n.modalElement].concat("modal-standard")
                    }
                }
            };
        e.exports = function(t) {
            var e = new s(o);
            t && e.appendContent(t);
            var i = document.createElement("div"),
                n = document.createElement("div"),
                a = document.createElement("div"),
                h = document.createElement("div");
            return A.add(i, "content-table"), A.add(n, "content-cell"), A.add(a, "content-wrapper"), A.add(h, "content-padding", "large-8", "medium-10"), e.modalElement.setAttribute(r.close, ""), a.setAttribute(r.close, ""), n.setAttribute(r.close, ""), i.appendChild(n), n.appendChild(a), a.appendChild(h), e.modalElement.appendChild(i), h.appendChild(e.contentElement), h.appendChild(e.closeButton), e
        }
    }, {
        19: 19,
        91: 91,
        97: 97
    }],
    100: [function(t, e, i) {
        "use strict";
        var s = function() {};
        e.exports = function(t) {
            if (arguments.length > 1) throw new Error("Second argument not supported");
            if (null === t || "object" != typeof t) throw new TypeError("Object prototype may only be an Object.");
            return "function" == typeof Object.create ? Object.create(t) : (s.prototype = t, new s)
        }
    }, {}],
    101: [function(t, e, i) {
        "use strict";
        var s = t(102);
        e.exports = function(t, e) {
            if ("object" != typeof t) throw new TypeError("defaults: must provide a defaults object");
            if ("object" != typeof(e = e || {})) throw new TypeError("defaults: options must be a typeof object");
            return s({}, t, e)
        }
    }, {
        102: 102
    }],
    102: [function(t, e, i) {
        "use strict";
        t(82);
        var s = Object.prototype.hasOwnProperty;
        e.exports = function() {
            var t, e;
            return t = arguments.length < 2 ? [{}, arguments[0]] : [].slice.call(arguments), e = t.shift(), t.forEach((function(t) {
                if (null != t)
                    for (var i in t) s.call(t, i) && (e[i] = t[i])
            })), e
        }
    }, {
        82: 82
    }],
    103: [function(t, e, i) {
        "use strict";
        var s = t(107),
            n = t(104),
            r = t(106),
            A = t(105),
            o = {};
        e.exports = function t(e, i) {
            var a, h, l;
            if (i = i || "div", e = e.toLowerCase(), i in o || (o[i] = {}), e in (h = o[i])) return h[e];
            if (s(e, i)) return h[e] = e;
            if (e in n)
                for (l = 0; l < n[e].length; l++)
                    if (a = n[e][l], s(a.toLowerCase(), i)) return h[e] = a;
            for (l = 0; l < A.evt.length; l++)
                if (a = A.evt[l] + e, s(a, i)) return A.reduce(l), h[e] = a;
            return "window" !== i && r.indexOf(e) ? h[e] = t(e, "window") : h[e] = !1
        }
    }, {
        104: 104,
        105: 105,
        106: 106,
        107: 107
    }],
    104: [function(t, e, i) {
        "use strict";
        e.exports = {
            transitionend: ["webkitTransitionEnd", "MSTransitionEnd"],
            animationstart: ["webkitAnimationStart", "MSAnimationStart"],
            animationend: ["webkitAnimationEnd", "MSAnimationEnd"],
            animationiteration: ["webkitAnimationIteration", "MSAnimationIteration"],
            fullscreenchange: ["MSFullscreenChange"],
            fullscreenerror: ["MSFullscreenError"]
        }
    }, {}],
    105: [function(t, e, i) {
        "use strict";
        var s = ["-webkit-", "-moz-", "-ms-"],
            n = ["Webkit", "Moz", "ms"],
            r = ["webkit", "moz", "ms"],
            A = function() {
                this.initialize()
            },
            o = A.prototype;
        o.initialize = function() {
            this.reduced = !1, this.css = s, this.dom = n, this.evt = r
        }, o.reduce = function(t) {
            this.reduced || (this.reduced = !0, this.css = [this.css[t]], this.dom = [this.dom[t]], this.evt = [this.evt[t]])
        }, e.exports = new A
    }, {}],
    106: [function(t, e, i) {
        "use strict";
        e.exports = ["transitionend", "animationstart", "animationend", "animationiteration"]
    }, {}],
    107: [function(t, e, i) {
        "use strict";
        var s = {
            window: window,
            document: document
        };
        e.exports = function(t, e) {
            var i;
            return t = "on" + t, e in s || (s[e] = document.createElement(e)), t in (i = s[e]) || "setAttribute" in i && (i.setAttribute(t, "return;"), "function" == typeof i[t])
        }
    }, {}],
    108: [function(t, e, i) {
        "use strict";
        var s = t(124).SharedInstance,
            n = function() {
                this._currentID = 0
            };
        n.prototype.getNewID = function() {
            return this._currentID++, "raf:" + this._currentID
        }, e.exports = s.share("ac-raf-emitter-id-generator:sharedRAFEmitterIDGeneratorInstance", "1.0.3", n)
    }, {
        124: 124
    }],
    109: [function(t, e, i) {
        "use strict";
        e.exports = {
            majorVersionNumber: "3.x"
        }
    }, {}],
    110: [function(t, e, i) {
        "use strict";
        var s, n = t(61).EventEmitterMicro,
            r = t(120),
            A = t(119);

        function o(t) {
            t = t || {}, n.call(this), this.id = A.getNewID(), this.executor = t.executor || r, this._reset(), this._willRun = !1, this._didDestroy = !1
        }(s = o.prototype = Object.create(n.prototype)).run = function() {
            return this._willRun || (this._willRun = !0), this._subscribe()
        }, s.cancel = function() {
            this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset()
        }, s.destroy = function() {
            var t = this.willRun();
            return this.cancel(), this.executor = null, n.prototype.destroy.call(this), this._didDestroy = !0, t
        }, s.willRun = function() {
            return this._willRun
        }, s.isRunning = function() {
            return this._isRunning
        }, s._subscribe = function() {
            return this.executor.subscribe(this)
        }, s._unsubscribe = function() {
            return this.executor.unsubscribe(this)
        }, s._onAnimationFrameStart = function(t) {
            this._isRunning = !0, this._willRun = !1, this._didEmitFrameData || (this._didEmitFrameData = !0, this.trigger("start", t))
        }, s._onAnimationFrameEnd = function(t) {
            this._willRun || (this.trigger("stop", t), this._reset())
        }, s._reset = function() {
            this._didEmitFrameData = !1, this._isRunning = !1
        }, e.exports = o
    }, {
        119: 119,
        120: 120,
        61: 61
    }],
    111: [function(t, e, i) {
        "use strict";
        var s, n = t(62);

        function r(t) {
            t = t || {}, this._reset(), this.updatePhases(), this.eventEmitter = new n, this._willRun = !1, this._totalSubscribeCount = -1, this._requestAnimationFrame = window.requestAnimationFrame, this._cancelAnimationFrame = window.cancelAnimationFrame, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }(s = r.prototype).frameRequestedPhase = "requested", s.startPhase = "start", s.runPhases = ["update", "external", "draw"], s.endPhase = "end", s.disabledPhase = "disabled", s.beforePhaseEventPrefix = "before:", s.afterPhaseEventPrefix = "after:", s.subscribe = function(t, e) {
            return this._totalSubscribeCount++, this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id), this._nextFrameSubscribers[t.id] = t, this._nextFrameSubscriberArrayLength++, this._nextFrameSubscriberCount++, this._run()), this._totalSubscribeCount
        }, s.subscribeImmediate = function(t, e) {
            return this._totalSubscribeCount++, this._subscribers[t.id] || (e ? this._subscribersOrder.splice(this._currentSubscriberIndex + 1, 0, t.id) : this._subscribersOrder.unshift(t.id), this._subscribers[t.id] = t, this._subscriberArrayLength++, this._subscriberCount++), this._totalSubscribeCount
        }, s.unsubscribe = function(t) {
            return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null, this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0)
        }, s.getSubscribeID = function() {
            return this._totalSubscribeCount += 1
        }, s.destroy = function() {
            var t = this._cancel();
            return this.eventEmitter.destroy(), this.eventEmitter = null, this.phases = null, this._subscribers = null, this._subscribersOrder = null, this._nextFrameSubscribers = null, this._nextFrameSubscribersOrder = null, this._rafData = null, this._boundOnAnimationFrame = null, this._onExternalAnimationFrame = null, t
        }, s.useExternalAnimationFrame = function(t) {
            if ("boolean" == typeof t) {
                var e = this._isUsingExternalAnimationFrame;
                return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this._isUsingExternalAnimationFrame = t, t ? this._boundOnExternalAnimationFrame : e || !1
            }
        }, s.updatePhases = function() {
            this.phases || (this.phases = []), this.phases.length = 0, this.phases.push(this.frameRequestedPhase), this.phases.push(this.startPhase), Array.prototype.push.apply(this.phases, this.runPhases), this.phases.push(this.endPhase), this._runPhasesLength = this.runPhases.length, this._phasesLength = this.phases.length
        }, s._run = function() {
            if (!this._willRun) return this._willRun = !0, 0 === this.lastFrameTime && (this.lastFrameTime = performance.now()), this._animationFrameActive = !0, this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this.phase === this.disabledPhase && (this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex]), !0
        }, s._cancel = function() {
            var t = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), this._animationFrameActive = !1, this._willRun = !1, t = !0), this._isRunning || this._reset(), t
        }, s._onAnimationFrame = function(t) {
            for (this._subscribers = this._nextFrameSubscribers, this._subscribersOrder = this._nextFrameSubscribersOrder, this._subscriberArrayLength = this._nextFrameSubscriberArrayLength, this._subscriberCount = this._nextFrameSubscriberCount, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this.phaseIndex = 0, this.phase = this.phases[this.phaseIndex], this._isRunning = !0, this._willRun = !1, this._didRequestNextRAF = !1, this._rafData.delta = t - this.lastFrameTime, this.lastFrameTime = t, this._rafData.fps = 0, this._rafData.delta >= 1e3 && (this._rafData.delta = 0), 0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta), this._rafData.time = t, this._rafData.naturalFps = this._rafData.fps, this._rafData.timeNow = Date.now(), this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameStart(this._rafData);
            for (this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._runPhaseIndex = 0; this._runPhaseIndex < this._runPhasesLength; this._runPhaseIndex++) {
                for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]].trigger(this.phase, this._rafData);
                this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase)
            }
            for (this.phaseIndex++, this.phase = this.phases[this.phaseIndex], this.eventEmitter.trigger(this.beforePhaseEventPrefix + this.phase), this._currentSubscriberIndex = 0; this._currentSubscriberIndex < this._subscriberArrayLength; this._currentSubscriberIndex++) null !== this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]] && !1 === this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._didDestroy && this._subscribers[this._subscribersOrder[this._currentSubscriberIndex]]._onAnimationFrameEnd(this._rafData);
            this.eventEmitter.trigger(this.afterPhaseEventPrefix + this.phase), this._willRun ? (this.phaseIndex = 0, this.phaseIndex = this.phases[this.phaseIndex]) : this._reset()
        }, s._onExternalAnimationFrame = function(t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }, s._reset = function() {
            this._rafData || (this._rafData = {}), this._rafData.time = 0, this._rafData.delta = 0, this._rafData.fps = 0, this._rafData.naturalFps = 0, this._rafData.timeNow = 0, this._subscribers = {}, this._subscribersOrder = [], this._currentSubscriberIndex = -1, this._subscriberArrayLength = 0, this._subscriberCount = 0, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._didEmitFrameData = !1, this._animationFrame = null, this._animationFrameActive = !1, this._isRunning = !1, this._shouldReset = !1, this.lastFrameTime = 0, this._runPhaseIndex = -1, this.phaseIndex = -1, this.phase = this.disabledPhase
        }, e.exports = r
    }, {
        62: 62
    }],
    112: [function(t, e, i) {
        "use strict";
        var s = t(114),
            n = function(t) {
                this.phase = t, this.rafEmitter = new s, this._cachePhaseIndex(), this.requestAnimationFrame = this.requestAnimationFrame.bind(this), this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this), this._onBeforeRAFExecutorStart = this._onBeforeRAFExecutorStart.bind(this), this._onBeforeRAFExecutorPhase = this._onBeforeRAFExecutorPhase.bind(this), this._onAfterRAFExecutorPhase = this._onAfterRAFExecutorPhase.bind(this), this.rafEmitter.on(this.phase, this._onRAFExecuted.bind(this)), this.rafEmitter.executor.eventEmitter.on("before:start", this._onBeforeRAFExecutorStart), this.rafEmitter.executor.eventEmitter.on("before:" + this.phase, this._onBeforeRAFExecutorPhase), this.rafEmitter.executor.eventEmitter.on("after:" + this.phase, this._onAfterRAFExecutorPhase), this._frameCallbacks = [], this._currentFrameCallbacks = [], this._nextFrameCallbacks = [], this._phaseActive = !1, this._currentFrameID = -1, this._cancelFrameIdx = -1, this._frameCallbackLength = 0, this._currentFrameCallbacksLength = 0, this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0
            },
            r = n.prototype;
        r.requestAnimationFrame = function(t, e) {
            return !0 === e && this.rafEmitter.executor.phaseIndex > 0 && this.rafEmitter.executor.phaseIndex <= this.phaseIndex ? this._phaseActive ? (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !0), this._frameCallbacks.push(this._currentFrameID, t), this._frameCallbackLength += 2) : (this._currentFrameID = this.rafEmitter.executor.subscribeImmediate(this.rafEmitter, !1), this._currentFrameCallbacks.push(this._currentFrameID, t), this._currentFrameCallbacksLength += 2) : (this._currentFrameID = this.rafEmitter.run(), this._nextFrameCallbacks.push(this._currentFrameID, t), this._nextFrameCallbacksLength += 2), this._currentFrameID
        }, r.cancelAnimationFrame = function(t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelNextAnimationFrame() : (this._cancelFrameIdx = this._currentFrameCallbacks.indexOf(t), this._cancelFrameIdx > -1 ? this._cancelCurrentAnimationFrame() : (this._cancelFrameIdx = this._frameCallbacks.indexOf(t), this._cancelFrameIdx > -1 && this._cancelRunningAnimationFrame()))
        }, r._onRAFExecuted = function(t) {
            for (this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2) this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t);
            this._frameCallbacks.length = 0, this._frameCallbackLength = 0
        }, r._onBeforeRAFExecutorStart = function() {
            Array.prototype.push.apply(this._currentFrameCallbacks, this._nextFrameCallbacks.splice(0, this._nextFrameCallbacksLength)), this._currentFrameCallbacksLength = this._nextFrameCallbacksLength, this._nextFrameCallbacks.length = 0, this._nextFrameCallbacksLength = 0
        }, r._onBeforeRAFExecutorPhase = function() {
            this._phaseActive = !0, Array.prototype.push.apply(this._frameCallbacks, this._currentFrameCallbacks.splice(0, this._currentFrameCallbacksLength)), this._frameCallbackLength = this._currentFrameCallbacksLength, this._currentFrameCallbacks.length = 0, this._currentFrameCallbacksLength = 0
        }, r._onAfterRAFExecutorPhase = function() {
            this._phaseActive = !1
        }, r._cachePhaseIndex = function() {
            this.phaseIndex = this.rafEmitter.executor.phases.indexOf(this.phase)
        }, r._cancelRunningAnimationFrame = function() {
            this._frameCallbacks.splice(this._cancelFrameIdx, 2), this._frameCallbackLength -= 2
        }, r._cancelCurrentAnimationFrame = function() {
            this._currentFrameCallbacks.splice(this._cancelFrameIdx, 2), this._currentFrameCallbacksLength -= 2
        }, r._cancelNextAnimationFrame = function() {
            this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), this._nextFrameCallbacksLength -= 2, 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel()
        }, e.exports = n
    }, {
        114: 114
    }],
    113: [function(t, e, i) {
        "use strict";
        var s = t(112),
            n = function() {
                this.events = {}
            },
            r = n.prototype;
        r.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)), this.events[t].requestAnimationFrame
        }, r.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)), this.events[t].cancelAnimationFrame
        }, e.exports = new n
    }, {
        112: 112
    }],
    114: [function(t, e, i) {
        "use strict";
        var s = t(110),
            n = function(t) {
                s.call(this, t)
            };
        (n.prototype = Object.create(s.prototype))._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }, e.exports = n
    }, {
        110: 110
    }],
    115: [function(t, e, i) {
        "use strict";
        var s = t(113);
        e.exports = s.cancelAnimationFrame("draw")
    }, {
        113: 113
    }],
    116: [function(t, e, i) {
        "use strict";
        var s = t(113);
        e.exports = s.cancelAnimationFrame("update")
    }, {
        113: 113
    }],
    117: [function(t, e, i) {
        "use strict";
        var s = t(113);
        e.exports = s.requestAnimationFrame("draw")
    }, {
        113: 113
    }],
    118: [function(t, e, i) {
        "use strict";
        var s = t(113);
        e.exports = s.requestAnimationFrame("external")
    }, {
        113: 113
    }],
    119: [function(t, e, i) {
        "use strict";
        var s = t(124).SharedInstance,
            n = t(109).majorVersionNumber,
            r = function() {
                this._currentID = 0
            };
        r.prototype.getNewID = function() {
            return this._currentID++, "raf:" + this._currentID
        }, e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFEmitterIDGeneratorInstance", n, r)
    }, {
        109: 109,
        124: 124
    }],
    120: [function(t, e, i) {
        "use strict";
        var s = t(124).SharedInstance,
            n = t(109).majorVersionNumber,
            r = t(111);
        e.exports = s.share("@marcom/ac-raf-emitter/sharedRAFExecutorInstance", n, r)
    }, {
        109: 109,
        111: 111,
        124: 124
    }],
    121: [function(t, e, i) {
        "use strict";
        var s = t(113);
        e.exports = s.requestAnimationFrame("update")
    }, {
        113: 113
    }],
    122: [function(t, e, i) {
        "use strict";
        var s;

        function n(t) {
            t = t || {}, this._reset(), this._willRun = !1, this._totalSubscribeCount = -1, this._requestAnimationFrame = window.requestAnimationFrame, this._cancelAnimationFrame = window.cancelAnimationFrame, this._boundOnAnimationFrame = this._onAnimationFrame.bind(this), this._boundOnExternalAnimationFrame = this._onExternalAnimationFrame.bind(this)
        }
        t(82), (s = n.prototype).subscribe = function(t, e) {
            return this._totalSubscribeCount++, this._nextFrameSubscribers[t.id] || (e ? this._nextFrameSubscribersOrder.unshift(t.id) : this._nextFrameSubscribersOrder.push(t.id), this._nextFrameSubscribers[t.id] = t, this._nextFrameSubscriberArrayLength++, this._nextFrameSubscriberCount++, this._run()), this._totalSubscribeCount
        }, s.unsubscribe = function(t) {
            return !!this._nextFrameSubscribers[t.id] && (this._nextFrameSubscribers[t.id] = null, this._nextFrameSubscriberCount--, 0 === this._nextFrameSubscriberCount && this._cancel(), !0)
        }, s.trigger = function(t, e) {
            var i;
            for (i = 0; i < this._subscriberArrayLength; i++) null !== this._subscribers[this._subscribersOrder[i]] && !1 === this._subscribers[this._subscribersOrder[i]]._didDestroy && this._subscribers[this._subscribersOrder[i]].trigger(t, e)
        }, s.destroy = function() {
            var t = this._cancel();
            return this._subscribers = null, this._subscribersOrder = null, this._nextFrameSubscribers = null, this._nextFrameSubscribersOrder = null, this._rafData = null, this._boundOnAnimationFrame = null, this._onExternalAnimationFrame = null, t
        }, s.useExternalAnimationFrame = function(t) {
            if ("boolean" == typeof t) {
                var e = this._isUsingExternalAnimationFrame;
                return t && this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), !this._willRun || t || this._animationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), this._isUsingExternalAnimationFrame = t, t ? this._boundOnExternalAnimationFrame : e || !1
            }
        }, s._run = function() {
            if (!this._willRun) return this._willRun = !0, 0 === this.lastFrameTime && (this.lastFrameTime = performance.now()), this._animationFrameActive = !0, this._isUsingExternalAnimationFrame || (this._animationFrame = this._requestAnimationFrame.call(window, this._boundOnAnimationFrame)), !0
        }, s._cancel = function() {
            var t = !1;
            return this._animationFrameActive && (this._animationFrame && (this._cancelAnimationFrame.call(window, this._animationFrame), this._animationFrame = null), this._animationFrameActive = !1, this._willRun = !1, t = !0), this._isRunning || this._reset(), t
        }, s._onSubscribersAnimationFrameStart = function(t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++) null !== this._subscribers[this._subscribersOrder[e]] && !1 === this._subscribers[this._subscribersOrder[e]]._didDestroy && this._subscribers[this._subscribersOrder[e]]._onAnimationFrameStart(t)
        }, s._onSubscribersAnimationFrameEnd = function(t) {
            var e;
            for (e = 0; e < this._subscriberArrayLength; e++) null !== this._subscribers[this._subscribersOrder[e]] && !1 === this._subscribers[this._subscribersOrder[e]]._didDestroy && this._subscribers[this._subscribersOrder[e]]._onAnimationFrameEnd(t)
        }, s._onAnimationFrame = function(t) {
            this._subscribers = this._nextFrameSubscribers, this._subscribersOrder = this._nextFrameSubscribersOrder, this._subscriberArrayLength = this._nextFrameSubscriberArrayLength, this._subscriberCount = this._nextFrameSubscriberCount, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._isRunning = !0, this._willRun = !1, this._didRequestNextRAF = !1, this._rafData.delta = t - this.lastFrameTime, this.lastFrameTime = t, this._rafData.fps = 0, this._rafData.delta >= 1e3 && (this._rafData.delta = 0), 0 !== this._rafData.delta && (this._rafData.fps = 1e3 / this._rafData.delta), this._rafData.time = t, this._rafData.naturalFps = this._rafData.fps, this._rafData.timeNow = Date.now(), this._onSubscribersAnimationFrameStart(this._rafData), this.trigger("update", this._rafData), this.trigger("external", this._rafData), this.trigger("draw", this._rafData), this._onSubscribersAnimationFrameEnd(this._rafData), this._willRun || this._reset()
        }, s._onExternalAnimationFrame = function(t) {
            this._isUsingExternalAnimationFrame && this._onAnimationFrame(t)
        }, s._reset = function() {
            this._rafData = {
                time: 0,
                delta: 0,
                fps: 0,
                naturalFps: 0,
                timeNow: 0
            }, this._subscribers = {}, this._subscribersOrder = [], this._subscriberArrayLength = 0, this._subscriberCount = 0, this._nextFrameSubscribers = {}, this._nextFrameSubscribersOrder = [], this._nextFrameSubscriberArrayLength = 0, this._nextFrameSubscriberCount = 0, this._didEmitFrameData = !1, this._animationFrame = null, this._animationFrameActive = !1, this._isRunning = !1, this._shouldReset = !1, this.lastFrameTime = 0
        }, e.exports = n
    }, {
        82: 82
    }],
    123: [function(t, e, i) {
        "use strict";
        var s = t(124).SharedInstance,
            n = t(122);
        e.exports = s.share("ac-raf-executor:sharedRAFExecutorInstance", "2.0.1", n)
    }, {
        122: 122,
        124: 124
    }],
    124: [function(t, e, i) {
        "use strict";
        e.exports = {
            SharedInstance: t(125)
        }
    }, {
        125: 125
    }],
    125: [function(t, e, i) {
        "use strict";
        var s, n = window,
            r = n.AC,
            A = (s = {}, {
                get: function(t, e) {
                    var i = null;
                    return s[t] && s[t][e] && (i = s[t][e]), i
                },
                set: function(t, e, i) {
                    return s[t] || (s[t] = {}), s[t][e] = "function" == typeof i ? new i : i, s[t][e]
                },
                share: function(t, e, i) {
                    var s = this.get(t, e);
                    return s || (s = this.set(t, e, i)), s
                },
                remove: function(t, e) {
                    var i = typeof e;
                    if ("string" !== i && "number" !== i) s[t] && (s[t] = null);
                    else {
                        if (!s[t] || !s[t][e]) return;
                        s[t][e] = null
                    }
                }
            });
        r || (r = n.AC = {}), r.SharedInstance || (r.SharedInstance = A), e.exports = r.SharedInstance
    }, {}],
    126: [function(t, e, i) {
        "use strict";
        class s {
            constructor(t = {}) {
                this.options = t, "loading" === document.readyState ? document.addEventListener("readystatechange", t => {
                    "interactive" === document.readyState && this._init()
                }) : this._init()
            }
            _init() {
                if (this._images = Array.from(document.querySelectorAll("*[".concat(s.DATA_ATTRIBUTE, "]"))), this.AnimSystem = this._findAnim(), null === this.AnimSystem) return null;
                this._addKeyframesToImages()
            }
            _defineKeyframeOptions(t = null) {
                const e = t.getAttribute(s.DATA_DOWNLOAD_AREA_KEYFRAME) || "{}";
                return Object.assign({}, {
                    start: "t - 200vh",
                    end: "b + 100vh",
                    event: "AnimLazyImage"
                }, JSON.parse(e))
            }
            _addKeyframesToImages() {
                this._scrollGroup = this.AnimSystem.getGroupForTarget(document.body), this._images.forEach(t => {
                    this.AnimSystem.getGroupForTarget(t) && (this._scrollGroup = this.AnimSystem.getGroupForTarget(t));
                    let e = this._defineKeyframeOptions(t);
                    this._scrollGroup.addKeyframe(t, e).controller.once("AnimLazyImage:enter", () => {
                        this._imageIsInLoadRange(t)
                    })
                })
            }
            _cleanUpImageAttributes(t) {
                let e = !1;
                try {
                    e = this._scrollGroup.getControllerForTarget(t).getNearestKeyframeForAttribute("AnimLazyImage").isCurrentlyInRange
                } catch (t) {
                    e = !1
                }
                e || t.setAttribute(s.DATA_ATTRIBUTE, "")
            }
            _downloadingImageAttributes(t) {
                t.removeAttribute(s.DATA_ATTRIBUTE)
            }
            _imageIsInLoadRange(t) {
                this._downloadImage(t)
            }
            _downloadImage(t) {
                this._downloadingImageAttributes(t)
            }
            _findAnim() {
                var t = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
                return t.map(t => t._animInfo ? t._animInfo.group : null).filter(t => null !== t), t[0] && t[0]._animInfo ? t[0]._animInfo.group.anim : (console.error("AnimLazyImage: AnimSystem not found, please initialize anim before instantiating"), null)
            }
        }
        s.DATA_DOWNLOAD_AREA_KEYFRAME = "data-download-area-keyframe", s.DATA_ATTRIBUTE = "data-anim-lazy-image", e.exports = s
    }, {}],
    127: [function(t, e, i) {
        "use strict";
        const s = t(126),
            n = t(226),
            r = t(117),
            A = t(121);
        class o extends s {
            constructor(t = {}) {
                super(t), this.arrayImg = []
            }
            _init() {
                super._init(), this._onBreakpointChangeCallback = this._onBreakpointChangeCallback.bind(this), this._addViewportEvents(), this._resetPromises(), this._addMethodsToImageElement()
            }
            _addViewportEvents() {
                let t = this.options.breakpoints ? {
                    breakpoints: this.options.breakpoints
                } : {};
                this.viewportEmitterMicro = new n(t), this.viewportEmitterMicro.on(n.CHANGE_EVENTS.VIEWPORT, this._onBreakpointChangeCallback), this.viewportEmitterMicro.on(n.CHANGE_EVENTS.RETINA, this._onBreakpointChangeCallback)
            }
            _addKeyframesToImages() {
                this._scrollGroup = this.AnimSystem.getGroupForTarget(document.body), this._images.forEach(t => {
                    this.AnimSystem.getGroupForTarget(t) && (this._scrollGroup = this.AnimSystem.getGroupForTarget(t));
                    let e = this._defineKeyframeOptions(t);
                    this._scrollGroup.addKeyframe(t, e).controller.on("AnimLazyImage:enter", () => {
                        this._imageIsInLoadRange(t)
                    })
                })
            }
            _onBreakpointChangeCallback(t) {
                this._resetPromises(), this.arrayImg = [], this._images.forEach(t => {
                    this._cleanUpImageAttributes(t), "" != t.getAttribute(s.DATA_ATTRIBUTE) && this._imageIsInLoadRange(t)
                })
            }
            _resetPromises() {
                this._images.forEach(t => {
                    t.promises = {}, t.promises.downloadComplete = new Promise(e => {
                        t.promises.__completePromiseResolver = e
                    })
                })
            }
            _addMethodsToImageElement() {
                this._images.forEach(t => {
                    t.forceLazyLoad = () => {
                        this._imageIsInLoadRange(t)
                    }
                })
            }
            _imageIsInLoadRange(t) {
                this._downloadImage(t).then(() => {
                    t.promises.__completePromiseResolver(t), t.dispatchEvent(new Event(o.EVENTS.DOWNLOAD_COMPLETE))
                })
            }
            _cleanUpImageAttributes(t) {
                t.removeAttribute(o.DATA_DOWNLOADING_ATTRIBUTE), t.removeAttribute(o.DATA_DOWNLOAD_COMPLETE_ATTRIBUTE)
            }
            _downloadingImageAttributes(t) {
                super._downloadingImageAttributes(t), t.setAttribute(o.DATA_DOWNLOADING_ATTRIBUTE, "")
            }
            _finishedDownloadAttributes(t) {
                t.removeAttribute(o.DATA_DOWNLOADING_ATTRIBUTE), t.setAttribute(o.DATA_DOWNLOAD_COMPLETE_ATTRIBUTE, "")
            }
            _downloadImage(t) {
                return new Promise((e, i) => {
                    null === t.getAttribute(o.DATA_DOWNLOAD_COMPLETE_ATTRIBUTE) ? null === t.getAttribute(o.DATA_DOWNLOADING_ATTRIBUTE) && this._waitForBackgroundVisible(t).then(t => this._getBackgroundImageSrc(t)).then(t => this._loadImage(t)).then(() => {
                        r(() => {
                            this._finishedDownloadAttributes(t), e()
                        }, !0)
                    }) : e()
                })
            }
            _waitForBackgroundVisible(t) {
                return new Promise((e, i) => {
                    r(() => {
                        this._downloadingImageAttributes(t), e(t)
                    }, !0)
                })
            }
            _getBackgroundImageSrc(t) {
                return new Promise((e, i) => {
                    A(() => {
                        let i = t.currentStyle;
                        i || (i = window.getComputedStyle(t, !1)), 0 !== i.backgroundImage.indexOf("url(") ? e(null) : e(i.backgroundImage.slice(4, -1).replace(/"/g, ""))
                    }, !0)
                })
            }
            _loadImage(t) {
                return new Promise(this._loadImagePromiseFunc.bind(this, t))
            }
            _loadImagePromiseFunc(t, e, i) {
                if (!t) return void e(null);
                let s = new Image(1, 1);
                s.addEventListener("load", (function t(i) {
                    s.removeEventListener("load", t), e(this)
                })), s.src = t, this.arrayImg.push(s)
            }
        }
        o.DATA_DOWNLOAD_COMPLETE_ATTRIBUTE = "data-anim-lazy-image-download-complete", o.DATA_DOWNLOADING_ATTRIBUTE = "data-anim-lazy-image-downloading", o.EVENTS = {}, o.EVENTS.DOWNLOAD_COMPLETE = "video-loading-complete", e.exports = o
    }, {
        117: 117,
        121: 121,
        126: 126,
        226: 226
    }],
    128: [function(t, e, i) {
        "use strict";
        e.exports = {
            version: "3.4.0",
            major: "3.x",
            majorMinor: "3.4"
        }
    }, {}],
    129: [function(t, e, i) {
        "use strict";
        const s = t(61).EventEmitterMicro,
            n = t(136),
            r = t(131),
            A = t(132),
            o = t(134),
            a = t(151),
            h = t(152),
            l = t(153),
            c = t(128),
            u = {};
        "undefined" != typeof window && (u.update = t(121), u.cancelUpdate = t(116), u.external = t(118), u.draw = t(117));
        let d = null;
        class m extends s {
            constructor() {
                if (super(), d) throw "You cannot create multiple AnimSystems. You probably want to create multiple groups instead. You can have unlimited groups on a page";
                d = this, this.groups = [], this.scrollSystems = [], this.timeSystems = [], this.tweenGroup = null, this._forceUpdateRAFId = -1, this.initialized = !1, this.model = n, this.version = c.version, this._resolveReady = () => {}, this.ready = new Promise(t => this._resolveReady = t), this.onScroll = this.onScroll.bind(this), this.onResizedDebounced = this.onResizedDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this)
            }
            initialize() {
                return this.initialized || "undefined" == typeof window || (this.initialized = !0, this.timeSystems = [], this.scrollSystems = [], this.groups = [], this.setupEvents(), this.initializeResizeFilter(), this.initializeModel(), this.createDOMGroups(), this.createDOMKeyframes(), this.tweenGroup = new l(null, this), this.groups.push(this.tweenGroup), this._resolveReady()), this.ready
            }
            remove() {
                return this.initialized ? Promise.all(this.groups.map(t => t.remove())).then(() => {
                    this.groups = null, this.scrollSystems = null, this.timeSystems = null, window.clearTimeout(n.RESIZE_TIMEOUT), window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate), this._events = {}, this.initialized = !1, this.ready = new Promise(t => this._resolveReady = t)
                }) : (this.ready = new Promise(t => this._resolveReady = t), Promise.resolve())
            }
            destroy() {
                return this.remove()
            }
            createTimeGroup(t) {
                let e = new h(t, this);
                return this.groups.push(e), this.timeSystems.push(e), this.trigger(n.EVENTS.ON_GROUP_CREATED, e), e
            }
            createScrollGroup(t) {
                if (!t) throw "AnimSystem scroll based groups must supply an HTMLElement";
                let e = new a(t, this);
                return this.groups.push(e), this.scrollSystems.push(e), this.trigger(n.EVENTS.ON_GROUP_CREATED, e), e
            }
            removeGroup(t) {
                return Promise.all(t.keyframeControllers.map(e => t.removeKeyframeController(e))).then(() => {
                    let e = this.groups.indexOf(t); - 1 !== e && this.groups.splice(e, 1), e = this.scrollSystems.indexOf(t), -1 !== e && this.scrollSystems.splice(e, 1), e = this.timeSystems.indexOf(t), -1 !== e && this.timeSystems.splice(e, 1), t.destroy()
                })
            }
            createDOMGroups() {
                document.body.setAttribute("data-anim-scroll-group", "body"), document.querySelectorAll("[data-anim-scroll-group]").forEach(t => this.createScrollGroup(t)), document.querySelectorAll("[data-anim-time-group]").forEach(t => this.createTimeGroup(t)), this.trigger(n.EVENTS.ON_DOM_GROUPS_CREATED, this.groups)
            }
            createDOMKeyframes() {
                let t = [];
                ["data-anim-keyframe", r.DATA_ATTRIBUTE, A.DATA_ATTRIBUTE, o.DATA_ATTRIBUTE].forEach((function(e) {
                    for (let i = 0; i < 12; i++) t.push(e + (0 === i ? "" : "-" + (i - 1)))
                }));
                for (let e = 0; e < t.length; e++) {
                    let i = t[e],
                        s = document.querySelectorAll("[" + i + "]");
                    for (let t = 0; t < s.length; t++) {
                        const e = s[t],
                            n = JSON.parse(e.getAttribute(i));
                        this.addKeyframe(e, n)
                    }
                }
                u.update(() => {
                    null !== this.groups && (this.groups.forEach(t => t.onKeyframesDirty({
                        silent: !0
                    })), this.groups.forEach(t => t.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, t)), this.trigger(n.EVENTS.ON_DOM_KEYFRAMES_CREATED, this), this.groups.forEach(t => {
                        t.forceUpdate({
                            waitForNextUpdate: !1,
                            silent: !0
                        }), t.reconcile()
                    }), this.onScroll())
                }, !0)
            }
            initializeResizeFilter() {
                if (n.cssDimensionsTracker) return;
                const t = document.querySelector(".cssDimensionsTracker") || document.createElement("div");
                t.setAttribute("cssDimensionsTracker", "true"), t.style.position = "fixed", t.style.top = "0", t.style.width = "100%", t.style.height = "100vh", t.style.pointerEvents = "none", t.style.visibility = "hidden", t.style.zIndex = "-1", document.documentElement.appendChild(t), n.cssDimensionsTracker = t
            }
            initializeModel() {
                n.pageMetrics.windowHeight = n.cssDimensionsTracker.clientHeight, n.pageMetrics.windowWidth = n.cssDimensionsTracker.clientWidth, n.pageMetrics.scrollY = window.scrollY || window.pageYOffset, n.pageMetrics.scrollX = window.scrollX || window.pageXOffset, n.pageMetrics.breakpoint = n.getBreakpoint();
                let t = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = t.left + n.pageMetrics.scrollX, n.pageMetrics.documentOffsetY = t.top + n.pageMetrics.scrollY
            }
            setupEvents() {
                window.removeEventListener("scroll", this.onScroll), window.addEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.onResizeImmediate), window.addEventListener("resize", this.onResizeImmediate)
            }
            onScroll() {
                n.pageMetrics.scrollY = window.scrollY || window.pageYOffset, n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                for (let t = 0, e = this.scrollSystems.length; t < e; t++) this.scrollSystems[t].updateTimeline();
                this.trigger(n.PageEvents.ON_SCROLL, n.pageMetrics)
            }
            onResizeImmediate() {
                let t = n.cssDimensionsTracker.clientWidth,
                    e = n.cssDimensionsTracker.clientHeight;
                if (t === n.pageMetrics.windowWidth && e === n.pageMetrics.windowHeight) return;
                n.pageMetrics.windowWidth = t, n.pageMetrics.windowHeight = e, n.pageMetrics.scrollY = window.scrollY || window.pageYOffset, n.pageMetrics.scrollX = window.scrollX || window.pageXOffset;
                let i = document.documentElement.getBoundingClientRect();
                n.pageMetrics.documentOffsetX = i.left + n.pageMetrics.scrollX, n.pageMetrics.documentOffsetY = i.top + n.pageMetrics.scrollY, window.clearTimeout(n.RESIZE_TIMEOUT), n.RESIZE_TIMEOUT = window.setTimeout(this.onResizedDebounced, 250), this.trigger(n.PageEvents.ON_RESIZE_IMMEDIATE, n.pageMetrics)
            }
            onResizedDebounced() {
                u.update(() => {
                    let t = n.pageMetrics.breakpoint,
                        e = n.getBreakpoint();
                    if (e !== t) {
                        n.pageMetrics.previousBreakpoint = t, n.pageMetrics.breakpoint = e;
                        for (let t = 0, e = this.groups.length; t < e; t++) this.groups[t]._onBreakpointChange();
                        this.trigger(n.PageEvents.ON_BREAKPOINT_CHANGE, n.pageMetrics)
                    }
                    for (let t = 0, e = this.groups.length; t < e; t++) this.groups[t].forceUpdate({
                        waitForNextUpdate: !1
                    });
                    this.trigger(n.PageEvents.ON_RESIZE_DEBOUNCED, n.pageMetrics)
                }, !0)
            }
            forceUpdate({
                waitForNextUpdate: t = !0,
                silent: e = !1
            } = {}) {
                -1 !== this._forceUpdateRAFId && u.cancelUpdate(this._forceUpdateRAFId);
                let i = () => {
                    for (let t = 0, i = this.groups.length; t < i; t++) {
                        this.groups[t].forceUpdate({
                            waitForNextUpdate: !1,
                            silent: e
                        })
                    }
                    return -1
                };
                this._forceUpdateRAFId = t ? u.update(i, !0) : i()
            }
            addKeyframe(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body), i.addKeyframe(t, e)
            }
            addEvent(t, e) {
                let i = this.getGroupForTarget(t);
                return i = i || this.getGroupForTarget(document.body), i.addEvent(t, e)
            }
            getTimeGroupForTarget(t) {
                return this._getGroupForTarget(t, t => t instanceof h)
            }
            getScrollGroupForTarget(t) {
                return this._getGroupForTarget(t, t => !(t instanceof h))
            }
            getGroupForTarget(t) {
                return this._getGroupForTarget(t, () => !0)
            }
            _getGroupForTarget(t, e) {
                if (t._animInfo && t._animInfo.group && e(t._animInfo.group)) return t._animInfo.group;
                let i = t;
                for (; i;) {
                    if (i._animInfo && i._animInfo.isGroup && e(i._animInfo.group)) return i._animInfo.group;
                    i = i.parentElement
                }
            }
            getControllerForTarget(t) {
                return t._animInfo && t._animInfo.controller ? t._animInfo.controller : null
            }
            addTween(t, e) {
                return this.tweenGroup.addKeyframe(t, e)
            }
        }
        e.exports = "undefined" == typeof window ? new m : window.AC.SharedInstance.share("AnimSystem", c.major, m), e.exports.default = e.exports
    }, {
        116: 116,
        117: 117,
        118: 118,
        121: 121,
        128: 128,
        131: 131,
        132: 132,
        134: 134,
        136: 136,
        151: 151,
        152: 152,
        153: 153,
        61: 61
    }],
    130: [function(t, e, i) {
        "use strict";
        const s = t(136);
        class n {
            constructor(t, e) {
                this._index = 0, this.keyframe = t, e && (this.name = e)
            }
            get start() {
                return this.keyframe.jsonProps.start
            }
            set index(t) {
                this._index = t
            }
            get index() {
                return this._index
            }
        }
        e.exports = class {
            constructor(t) {
                this.timeGroup = t, this.chapters = [], this.chapterNames = {}, this.currentChapter = null, this.clip = null
            }
            addChapter(t) {
                const {
                    position: e,
                    name: i
                } = t;
                if (void 0 === e) throw ReferenceError("Cannot add chapter without target position.");
                t._impIsFirst || 0 !== this.chapters.length || this.addChapter({
                    position: 0,
                    _impIsFirst: !0
                });
                let s = this.timeGroup.addKeyframe(this, {
                    start: e,
                    end: e,
                    event: "Chapter"
                });
                this.timeGroup.forceUpdate({
                    waitForNextFrame: !1,
                    silent: !0
                });
                const r = new n(s, i);
                if (this.chapters.push(r), i) {
                    if (this.chapterNames.hasOwnProperty(i)) throw ReferenceError('Duplicate chapter name assigned - "'.concat(i, '" is already in use'));
                    this.chapterNames[i] = r
                }
                return this.chapters.sort((t, e) => t.start - e.start).forEach((t, e) => t.index = e), this.currentChapter = this.currentChapter || this.chapters[0], r
            }
            playToChapter(t) {
                let e;
                if (t.hasOwnProperty("index")) e = this.chapters[t.index];
                else {
                    if (!t.hasOwnProperty("name")) throw ReferenceError("Cannot play to chapter without target index or name");
                    e = this.chapterNames[t.name]
                }
                if (!e || this.currentChapter === e && !0 !== t.force) return;
                let i = t.ease || "easeInOutCubic";
                this.clip && (this.clip.destroy(), i = "easeOutQuint"), this.timeGroup.timeScale(t.timeScale || 1);
                const n = void 0 !== t.duration ? t.duration : this.getDurationToChapter(e),
                    r = this.timeGroup.time(),
                    A = e.start;
                let o = !1;
                this.tween = this.timeGroup.anim.addTween({
                    time: r
                }, {
                    easeFunction: i,
                    duration: n,
                    time: [r, A],
                    onStart: () => this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_INITIATED, {
                        player: this,
                        next: e
                    }),
                    onDraw: t => {
                        let i = t.tweenProps.time.current;
                        this.timeGroup.time(i), t.keyframe.curvedT > .5 && !o && (o = !0, this.currentIndex = e.index, this.currentChapter = e, this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_OCCURRED, {
                            player: this,
                            current: e
                        }))
                    },
                    onComplete: () => {
                        this.timeGroup.trigger(s.EVENTS.ON_CHAPTER_COMPLETED, {
                            player: this,
                            current: e
                        }), this.timeGroup.paused(!0), this.clip = null
                    }
                })
            }
            getDurationToChapter(t) {
                const e = this.chapters[t.index - 1] || this.chapters[t.index + 1];
                return Math.abs(e.start - t.start)
            }
        }
    }, {
        136: 136
    }],
    131: [function(t, e, i) {
        "use strict";
        const s = t(136),
            n = t(144),
            r = t(137),
            A = t(221),
            o = t(138),
            a = t(147),
            h = t(143),
            l = t(154),
            c = t(155),
            u = t(146);
        class d {
            constructor(t, e) {
                this.controller = t, this.anchors = [], this.jsonProps = e, this.ease = t.group.defaultEase, this.easeFunction = o.linear, this.start = 0, this.end = 0, this.localT = 0, this.curvedT = 0, this.id = 0, this.event = "", this.needsEventDispatch = !1, this.snapAtCreation = !1, this.isEnabled = !1, this.animValues = {}, this.breakpointMask = "SMLX", this.disabledWhen = [], this.keyframeType = s.KeyframeTypes.Interpolation, this.hold = !1, this.preserveState = !1, this.markedForRemoval = !1;
                let i = !1;
                Object.defineProperty(this, "hidden", {
                    get: () => i,
                    set(e) {
                        i = e, t.group.keyframesDirty = !0
                    }
                }), this.uuid = u(), this.destroyed = !1
            }
            destroy() {
                this.destroyed = !0, this.controller = null, this.disabledWhen = null, this.anchors = null, this.jsonProps = null, this.easeFunction = null, this.animValues = null
            }
            remove() {
                return this.controller.removeKeyframe(this)
            }
            parseOptions(t) {
                this.jsonProps = t, t.relativeTo && console.error("KeyframeError: relativeTo has been removed. Use 'anchors' property instead. Found 'relativeTo':\"".concat(t.relativeTo, '"')), void 0 === t.end && void 0 === t.duration && (t.end = t.start), "" !== t.anchors && t.anchors ? (this.anchors = [], t.anchors = Array.isArray(t.anchors) ? t.anchors : [t.anchors], t.anchors.forEach((e, i) => {
                    let s = c(e, this.controller.group.element);
                    if (!s) {
                        let s = "";
                        return "string" == typeof e && (s = " Provided value was a string, so a failed attempt was made to find anchor with the provided querystring in group.element, or in the document."), void console.warn("Keyframe on", this.controller.element, " failed to find anchor at index ".concat(i, " in array"), t.anchors, ". Anchors must be JS Object references, Elements references, or valid query selector strings. ".concat(s))
                    }
                    this.anchors.push(s), this.controller.group.metrics.add(s)
                })) : (this.anchors = [], t.anchors = []), t.ease ? this.ease = parseFloat(t.ease) : t.ease = this.ease, t.hasOwnProperty("snapAtCreation") ? this.snapAtCreation = t.snapAtCreation : t.snapAtCreation = this.snapAtCreation, t.easeFunction || (t.easeFunction = s.KeyframeDefaults.easeFunctionString), t.breakpointMask ? this.breakpointMask = t.breakpointMask : t.breakpointMask = this.breakpointMask, t.disabledWhen ? this.disabledWhen = Array.isArray(t.disabledWhen) ? t.disabledWhen : [t.disabledWhen] : t.disabledWhen = this.disabledWhen, t.hasOwnProperty("hold") ? this.hold = t.hold : t.hold = this.hold, t.hasOwnProperty("preserveState") ? this.preserveState = t.preserveState : t.preserveState = s.KeyframeDefaults.preserveState, this.easeFunction = o[t.easeFunction], o.hasOwnProperty(t.easeFunction) || (t.easeFunction.includes("bezier") ? this.easeFunction = a.fromCSSString(t.easeFunction) : t.easeFunction.includes("spring") ? this.easeFunction = h.fromCSSString(t.easeFunction) : console.error("Keyframe parseOptions cannot find 'easeFunction' named '" + t.easeFunction + "'"));
                for (let e in t) {
                    if (-1 !== s.KeyframeJSONReservedWords.indexOf(e)) continue;
                    let i = t[e];
                    if (!Array.isArray(i)) continue;
                    if (1 === i.length && (i[0] = null, i[1] = i[0]), this.animValues[e] = this.controller.group.expressionParser.parseArray(this, i), void 0 === this.controller.tweenProps[e] || !this.controller._ownerIsElement) {
                        let A = 0;
                        this.controller._ownerIsElement || (A = this.controller.element[e] || 0);
                        let o = null;
                        if (this.controller._ownerIsElement && e.startsWith("--")) {
                            const n = i[2];
                            o = new r(A, s.KeyframeDefaults.epsilon, this.snapAtCreation, e, t.round, n), this.controller.cssAttributes.push(o)
                        } else o = new n(A, s.KeyframeDefaults.epsilon, this.snapAtCreation);
                        this.controller.tweenProps[e] = o
                    }
                    let A = this.controller.tweenProps[e];
                    if (t.epsilon) A.epsilon = t.epsilon;
                    else {
                        let t = Math.abs(this.animValues[e][0] - this.animValues[e][1]),
                            i = Math.min(.001 * t, A.epsilon, s.KeyframeDefaults.epsilon);
                        A.epsilon = Math.max(i, 1e-4)
                    }
                }
                this.keyframeType = this.hold ? s.KeyframeTypes.InterpolationForward : s.KeyframeTypes.Interpolation, t.event && (this.event = t.event)
            }
            overwriteProps(t) {
                this.animValues = {};
                let e = Object.assign({}, this.jsonProps, t);
                this.controller.updateKeyframe(this, e)
            }
            updateLocalProgress(t) {
                if (this.start === this.end || t < this.start || t > this.end) return this.localT = t < this.start ? this.hold ? this.localT : 0 : t > this.end ? 1 : 0, void(this.curvedT = this.easeFunction(this.localT));
                const e = (t - this.start) / (this.end - this.start),
                    i = this.hold ? this.localT : 0;
                this.localT = A.clamp(e, i, 1), this.curvedT = this.easeFunction(this.localT)
            }
            reconcile(t) {
                let e = this.animValues[t],
                    i = this.controller.tweenProps[t];
                i.initialValue = e[0], i.target = e[0] + this.curvedT * (e[1] - e[0]), i.current !== i.target && (i.current = i.target, this.needsEventDispatch || (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this)))
            }
            reset(t) {
                this.localT = t || 0;
                var e = this.ease;
                this.ease = 1;
                for (let t in this.animValues) this.reconcile(t);
                this.ease = e
            }
            onDOMRead(t) {
                let e = this.animValues[t],
                    i = this.controller.tweenProps[t];
                i.target = e[0] + this.curvedT * (e[1] - e[0]);
                let s = i.current;
                i.current += (i.target - i.current) * this.ease;
                let n = i.current - i.target;
                n < i.epsilon && n > -i.epsilon && (i.current = i.target, n = 0), "" === this.event || this.needsEventDispatch || (n > i.epsilon || n < -i.epsilon || 0 === n && s !== i.current) && (this.needsEventDispatch = !0, this.controller.keyframesRequiringDispatch.push(this))
            }
            isInRange(t) {
                return t >= this.start && t <= this.end
            }
            setEnabled(t) {
                t = t || l(Array.from(document.documentElement.classList));
                let e = -1 !== this.breakpointMask.indexOf(s.pageMetrics.breakpoint),
                    i = !1;
                return this.disabledWhen.length > 0 && (i = this.disabledWhen.some(e => void 0 !== t[e])), this.isEnabled = e && !i, this.isEnabled
            }
            evaluateConstraints() {
                this.start = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.start), this.end = this.controller.group.expressionParser.parseTimeValue(this, this.jsonProps.end), this.evaluateInterpolationConstraints()
            }
            evaluateInterpolationConstraints() {
                for (let t in this.animValues) {
                    let e = this.jsonProps[t];
                    this.animValues[t] = this.controller.group.expressionParser.parseArray(this, e)
                }
            }
        }
        d.DATA_ATTRIBUTE = "data-anim-tween", e.exports = d
    }, {
        136: 136,
        137: 137,
        138: 138,
        143: 143,
        144: 144,
        146: 146,
        147: 147,
        154: 154,
        155: 155,
        221: 221
    }],
    132: [function(t, e, i) {
        "use strict";
        const s = t(131),
            n = t(136),
            r = t(144);
        class A extends s {
            constructor(t, e) {
                super(t, e), this.keyframeType = n.KeyframeTypes.CSSClass, this._triggerType = A.TRIGGER_TYPE_CSS_CLASS, this.cssClass = "", this.friendlyName = "", this.style = {
                    on: null,
                    off: null
                }, this.toggle = !1, this.isApplied = !1
            }
            parseOptions(t) {
                if (!this.controller._ownerIsElement) throw new TypeError("CSS Keyframes cannot be applied to JS Objects");
                if (t.x = void 0, t.y = void 0, t.z = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotationX = void 0, t.rotationY = void 0, t.rotationZ = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, void 0 !== t.toggle && (this.toggle = t.toggle), void 0 !== t.cssClass) this._triggerType = A.TRIGGER_TYPE_CSS_CLASS, this.cssClass = t.cssClass, this.friendlyName = "." + this.cssClass, void 0 === this.controller.tweenProps.targetClasses && (this.controller.tweenProps.targetClasses = {
                    add: [],
                    remove: []
                });
                else {
                    if (void 0 === t.style || !this.isValidStyleProperty(t.style)) throw new TypeError("KeyframeCSSClass no 'cssClass` property found. If using `style` property its also missing or invalid");
                    if (this._triggerType = A.TRIGGER_TYPE_STYLE_PROPERTY, this.style = t.style, this.friendlyName = "style", this.toggle = void 0 !== this.style.off || this.toggle, this.toggle && void 0 === this.style.off) {
                        this.style.off = {};
                        for (let t in this.style.on) this.style.off[t] = ""
                    }
                    void 0 === this.controller.tweenProps.targetStyles && (this.controller.tweenProps.targetStyles = {})
                }
                if (void 0 === t.end && (t.end = t.start), t.toggle = this.toggle, this._triggerType === A.TRIGGER_TYPE_CSS_CLASS) this.isApplied = this.controller.element.classList.contains(this.cssClass);
                else {
                    let t = getComputedStyle(this.controller.element);
                    this.isApplied = !0;
                    for (let e in this.style.on)
                        if (t[e] !== this.style.on[e]) {
                            this.isApplied = !1;
                            break
                        }
                }
                s.prototype.parseOptions.call(this, t), this.animValues[this.friendlyName] = [0, 0], void 0 === this.controller.tweenProps[this.friendlyName] && (this.controller.tweenProps[this.friendlyName] = new r(0, 1, !1)), this.keyframeType = n.KeyframeTypes.CSSClass
            }
            updateLocalProgress(t) {
                this.isApplied && !this.toggle || (this.start !== this.end ? !this.isApplied && t >= this.start && t <= this.end ? this._apply() : this.isApplied && this.toggle && (t < this.start || t > this.end) && this._unapply() : !this.isApplied && t >= this.start ? this._apply() : this.isApplied && this.toggle && t < this.start && this._unapply())
            }
            _apply() {
                if (this._triggerType === A.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.add.push(this.cssClass), this.controller.needsClassUpdate = !0;
                else {
                    for (let t in this.style.on) this.controller.tweenProps.targetStyles[t] = this.style.on[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !0
            }
            _unapply() {
                if (this._triggerType === A.TRIGGER_TYPE_CSS_CLASS) this.controller.tweenProps.targetClasses.remove.push(this.cssClass), this.controller.needsClassUpdate = !0;
                else {
                    for (let t in this.style.off) this.controller.tweenProps.targetStyles[t] = this.style.off[t];
                    this.controller.needsStyleUpdate = !0
                }
                this.isApplied = !1
            }
            isValidStyleProperty(t) {
                if (!t.hasOwnProperty("on")) return !1;
                if ("object" != typeof t.on) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                if (this.toggle && t.hasOwnProperty("off") && "object" != typeof t.off) throw new TypeError("KeyframeCSSClass `style` property should be in the form of: {on:{visibility:'hidden', otherProperty: 'value'}}");
                return !0
            }
            reconcile(t) {}
            onDOMRead(t) {}
            evaluateInterpolationConstraints() {}
        }
        A.TRIGGER_TYPE_CSS_CLASS = 0, A.TRIGGER_TYPE_STYLE_PROPERTY = 1, A.DATA_ATTRIBUTE = "data-anim-classname", e.exports = A
    }, {
        131: 131,
        136: 136,
        144: 144
    }],
    133: [function(t, e, i) {
        "use strict";
        const s = t(136),
            n = t(144),
            r = t(137),
            A = t(140),
            o = t(135),
            a = (t(131), t(132)),
            h = t(141),
            l = t(154),
            c = t(146),
            u = t(61).EventEmitterMicro,
            d = t(170),
            m = {};
        "undefined" != typeof window && (m.update = t(121), m.external = t(118), m.draw = t(117));
        const p = Math.PI / 180,
            g = ["x", "y", "z", "scale", "scaleX", "scaleY", "rotation", "rotationX", "rotationY", "rotationZ"],
            f = ["borderRadius", "bottom", "fontSize", "fontWeight", "height", "left", "lineHeight", "marginBottom", "marginLeft", "marginRight", "marginTop", "maxHeight", "maxWidth", "opacity", "paddingBottom", "paddingLeft", "paddingRight", "paddingTop", "right", "top", "width", "zIndex", "strokeDashoffset"],
            y = ["currentTime", "scrollLeft", "scrollTop"],
            I = {
                create: t(230),
                rotateX: t(231),
                rotateY: t(232),
                rotateZ: t(233),
                scale: t(234)
            };
        e.exports = class extends u {
            constructor(t, e) {
                super(), this._events.draw = [], this.uuid = c(), this.group = t, this.element = e, this._ownerIsElement = this.element instanceof Element, this._ownerIsElement ? this.friendlyName = this.element.tagName + "." + Array.from(this.element.classList).join(".") : this.friendlyName = this.element.friendlyName || this.uuid, this.element._animInfo = this.element._animInfo || new o(t, this), this.element._animInfo.controller = this, this.element._animInfo.group = this.group, this.element._animInfo.controllers.push(this), this.tweenProps = this.element._animInfo.tweenProps, this.eventObject = new A(this), this.needsStyleUpdate = !1, this.needsClassUpdate = !1, this.elementMetrics = this.group.metrics.add(this.element), this.attributes = [], this.cssAttributes = [], this.domAttributes = [], this.keyframes = {}, this._allKeyframes = [], this._activeKeyframes = [], this.keyframesRequiringDispatch = [], this.updateCachedValuesFromElement(), this.boundsMin = 0, this.boundsMax = 0, this.mat2d = new Float32Array(6), this.mat4 = I.create(), this.needsWrite = !0, this.onDOMWriteImp = this._ownerIsElement ? this.onDOMWriteForElement : this.onDOMWriteForObject
            }
            destroy() {
                if (this.element._animInfo) {
                    this.element._animInfo.controller === this && (this.element._animInfo.controller = null);
                    let t = this.element._animInfo.controllers.indexOf(this);
                    if (-1 !== t && this.element._animInfo.controllers.splice(t, 1), 0 === this.element._animInfo.controllers.length) this.element._animInfo = null;
                    else {
                        let t = this.element._animInfo.controllers.find(t => t.group !== t.group.anim.tweenGroup);
                        t && (this.element._animInfo.controller = t, this.element._animInfo.group = t.group)
                    }
                }
                this.eventObject.controller = null, this.eventObject.element = null, this.eventObject.keyframe = null, this.eventObject.tweenProps = null, this.eventObject = null, this.elementMetrics = null, this.group = null, this.keyframesRequiringDispatch = null;
                for (let t = 0; t < this._allKeyframes.length; t++) this._allKeyframes[t].destroy();
                this._allKeyframes = null, this._activeKeyframes = null, this.attributes = null, this.keyframes = null, this.element = null, this.tweenProps = null, this.destroyed = !0, super.destroy()
            }
            remove() {
                return this.group.removeKeyframeController(this)
            }
            updateCachedValuesFromElement() {
                if (!this._ownerIsElement) return;
                const t = getComputedStyle(this.element);
                let e = new DOMMatrix(t.getPropertyValue("transform")),
                    i = d(e),
                    A = s.KeyframeDefaults.epsilon;
                ["x", "y", "z"].forEach((t, e) => {
                    this.tweenProps[t] = new n(i.translation[e], A, !1)
                }), this.tweenProps.rotation = new n(i.rotation[2], A, !1), ["rotationX", "rotationY", "rotationZ"].forEach((t, e) => {
                    this.tweenProps[t] = new n(i.rotation[e], A, !1)
                }), this.tweenProps.scale = new n(i.scale[0], A, !1), ["scaleX", "scaleY", "scaleZ"].forEach((t, e) => {
                    this.tweenProps[t] = new n(i.scale[e], A, !1)
                }), f.forEach(e => {
                    let i = ["zIndex"].includes(e),
                        s = ["opacity", "zIndex", "fontWeight"].includes(e) ? void 0 : "px",
                        n = parseFloat(t[e]);
                    isNaN(n) && (n = 0), this.tweenProps[e] = new r(n, A, !1, e, i, s)
                }), y.forEach(t => {
                    let e = isNaN(this.element[t]) ? 0 : this.element[t];
                    this.tweenProps[t] = new r(e, A, !1, t, !1)
                })
            }
            addKeyframe(t) {
                let e = h(t);
                if (!e) throw new Error("AnimSystem Cannot create keyframe for from options `" + t + "`");
                let i = new e(this, t);
                return i.parseOptions(t), i.id = this._allKeyframes.length, this._allKeyframes.push(i), i
            }
            needsUpdate() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t],
                        i = this.tweenProps[e];
                    if (Math.abs(i.current - i.target) > i.epsilon) return !0
                }
                return !1
            }
            updateLocalProgress(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e],
                        s = this.keyframes[this.attributes[e]];
                    if (1 === s.length) {
                        s[0].updateLocalProgress(t);
                        continue
                    }
                    let n = this.getNearestKeyframeForAttribute(i, t);
                    n && n.updateLocalProgress(t)
                }
            }
            reconcile() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t],
                        i = this.getNearestKeyframeForAttribute(e, this.group.position.local);
                    i.updateLocalProgress(this.group.position.local), i.snapAtCreation && i.reconcile(e)
                }
            }
            determineActiveKeyframes(t) {
                t = t || l(Array.from(document.documentElement.classList));
                let e = this._activeKeyframes,
                    i = this.attributes,
                    s = {};
                this._activeKeyframes = [], this.attributes = [], this.keyframes = {};
                for (let e = 0; e < this._allKeyframes.length; e++) {
                    let i = this._allKeyframes[e];
                    if (i.markedForRemoval || i.hidden || !i.setEnabled(t))
                        for (let t in i.animValues) this.tweenProps[t].isActive = i.preserveState, i.preserveState && (s[t] = !0);
                    else {
                        this._activeKeyframes.push(i);
                        for (let t in i.animValues) this.keyframes[t] = this.keyframes[t] || [], this.keyframes[t].push(i), -1 === this.attributes.indexOf(t) && (s[t] = !0, this.attributes.push(t), this.tweenProps[t].isActive = !0)
                    }
                }
                this.attributes.forEach(t => this.tweenProps[t].isActive = !0), this.cssAttributes = this.attributes.filter(t => f.includes(t) || t.startsWith("--")).map(t => this.tweenProps[t]), this.domAttributes = this.attributes.filter(t => y.includes(t)).map(t => this.tweenProps[t]);
                let n = e.filter(t => -1 === this._activeKeyframes.indexOf(t));
                if (0 === n.length) return;
                let r = i.filter(t => -1 === this.attributes.indexOf(t) && !s.hasOwnProperty(t));
                if (0 !== r.length)
                    if (this.needsWrite = !0, this._ownerIsElement) m.external(() => {
                        let t = r.some(t => g.includes(t)),
                            e = t && Object.keys(s).some(t => g.includes(t));
                        t && !e && this.element.style.removeProperty("transform");
                        for (let t = 0, e = r.length; t < e; ++t) {
                            let e = r[t],
                                i = this.tweenProps[e],
                                s = i.isActive ? i.target : i.initialValue;
                            i.current = i.target = s, !i.isActive && f.includes(e) && (this.element.style[e] = null)
                        }
                        for (let t = 0, e = n.length; t < e; ++t) {
                            let e = n[t];
                            e instanceof a && !e.preserveState && e._unapply()
                        }
                    }, !0);
                    else
                        for (let t = 0, e = r.length; t < e; ++t) {
                            let e = this.tweenProps[r[t]];
                            e.current = e.target, e.isActive = !1
                        }
            }
            onDOMRead(t) {
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.attributes[e];
                    this.tweenProps[i].previousValue = this.tweenProps[i].current;
                    let s = this.getNearestKeyframeForAttribute(i, t);
                    s && s.onDOMRead(i), this.tweenProps[i].previousValue !== this.tweenProps[i].current && (this.needsWrite = !0)
                }
            }
            onDOMWrite() {
                (this.needsWrite || this.needsClassUpdate || this.needsStyleUpdate) && (this.needsWrite = !1, this.onDOMWriteImp(), this.handleEventDispatch())
            }
            onDOMWriteForObject() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t];
                    this.element[e] = this.tweenProps[e].current
                }
            }
            onDOMWriteForElement(t = this.element.style) {
                this.handleStyleTransform(t);
                for (let e = 0, i = this.cssAttributes.length; e < i; e++) this.cssAttributes[e].set(t);
                for (let t = 0, e = this.domAttributes.length; t < e; t++) this.domAttributes[t].set(this.element);
                if (this.needsStyleUpdate) {
                    for (let t in this.tweenProps.targetStyles) null !== this.tweenProps.targetStyles[t] && (this.element.style[t] = this.tweenProps.targetStyles[t]), this.tweenProps.targetStyles[t] = null;
                    this.needsStyleUpdate = !1
                }
                this.needsClassUpdate && (this.tweenProps.targetClasses.add.length > 0 && this.element.classList.add.apply(this.element.classList, this.tweenProps.targetClasses.add), this.tweenProps.targetClasses.remove.length > 0 && this.element.classList.remove.apply(this.element.classList, this.tweenProps.targetClasses.remove), this.tweenProps.targetClasses.add.length = 0, this.tweenProps.targetClasses.remove.length = 0, this.needsClassUpdate = !1)
            }
            handleStyleTransform(t = this.element.style) {
                let e = this.tweenProps;
                if (e.z.isActive || e.rotationX.isActive || e.rotationY.isActive) {
                    const i = this.mat4;
                    i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 0, i[4] = 0, i[5] = 1, i[6] = 0, i[7] = 0, i[8] = 0, i[9] = 0, i[10] = 1, i[11] = 0, i[12] = 0, i[13] = 0, i[14] = 0, i[15] = 1;
                    const s = e.x.current,
                        n = e.y.current,
                        r = e.z.current;
                    if (i[12] = i[0] * s + i[4] * n + i[8] * r + i[12], i[13] = i[1] * s + i[5] * n + i[9] * r + i[13], i[14] = i[2] * s + i[6] * n + i[10] * r + i[14], i[15] = i[3] * s + i[7] * n + i[11] * r + i[15], 0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                        const t = (e.rotation.current || e.rotationZ.current) * p;
                        I.rotateZ(i, i, t)
                    }
                    if (0 !== e.rotationX.current) {
                        const t = e.rotationX.current * p;
                        I.rotateX(i, i, t)
                    }
                    if (0 !== e.rotationY.current) {
                        const t = e.rotationY.current * p;
                        I.rotateY(i, i, t)
                    }
                    1 === e.scale.current && 1 === e.scaleX.current && 1 === e.scaleY.current || I.scale(i, i, [e.scale.current, e.scale.current, 1]), t.transform = "matrix3d(" + i[0] + "," + i[1] + "," + i[2] + "," + i[3] + "," + i[4] + "," + i[5] + "," + i[6] + "," + i[7] + "," + i[8] + "," + i[9] + "," + i[10] + "," + i[11] + "," + i[12] + "," + i[13] + "," + i[14] + "," + i[15] + ")"
                } else if (e.x.isActive || e.y.isActive || e.rotation.isActive || e.rotationZ.isActive || e.scale.isActive || e.scaleX.isActive || e.scaleY.isActive) {
                    const i = this.mat2d;
                    i[0] = 1, i[1] = 0, i[2] = 0, i[3] = 1, i[4] = 0, i[5] = 0;
                    const s = e.x.current,
                        n = e.y.current,
                        r = i[0],
                        A = i[1],
                        o = i[2],
                        a = i[3],
                        h = i[4],
                        l = i[5];
                    if (i[0] = r, i[1] = A, i[2] = o, i[3] = a, i[4] = r * s + o * n + h, i[5] = A * s + a * n + l, 0 !== e.rotation.current || 0 !== e.rotationZ.current) {
                        const t = (e.rotation.current || e.rotationZ.current) * p,
                            s = i[0],
                            n = i[1],
                            r = i[2],
                            A = i[3],
                            o = i[4],
                            a = i[5],
                            h = Math.sin(t),
                            l = Math.cos(t);
                        i[0] = s * l + r * h, i[1] = n * l + A * h, i[2] = s * -h + r * l, i[3] = n * -h + A * l, i[4] = o, i[5] = a
                    }
                    e.scaleX.isActive || e.scaleY.isActive ? (i[0] = i[0] * e.scaleX.current, i[1] = i[1] * e.scaleX.current, i[2] = i[2] * e.scaleY.current, i[3] = i[3] * e.scaleY.current) : (i[0] = i[0] * e.scale.current, i[1] = i[1] * e.scale.current, i[2] = i[2] * e.scale.current, i[3] = i[3] * e.scale.current), t.transform = "matrix(" + i[0] + ", " + i[1] + ", " + i[2] + ", " + i[3] + ", " + i[4] + ", " + i[5] + ")"
                }
            }
            handleEventDispatch() {
                if (0 !== this.keyframesRequiringDispatch.length) {
                    for (let t = 0, e = this.keyframesRequiringDispatch.length; t < e; t++) {
                        let e = this.keyframesRequiringDispatch[t];
                        e.needsEventDispatch = !1, this.eventObject.keyframe = e, this.eventObject.pageMetrics = s.pageMetrics, this.eventObject.event = e.event, this.trigger(e.event, this.eventObject)
                    }
                    this.keyframesRequiringDispatch.length = 0
                }
                if (0 !== this._events.draw.length) {
                    this.eventObject.keyframe = null, this.eventObject.event = "draw";
                    for (var t = this._events.draw.length - 1; t >= 0; t--) this._events.draw[t](this.eventObject)
                }
            }
            updateAnimationConstraints() {
                for (let t = 0, e = this._activeKeyframes.length; t < e; t++) this._activeKeyframes[t].evaluateConstraints();
                this.attributes.forEach(t => {
                    1 !== this.keyframes[t].length && this.keyframes[t].sort(s.KeyframeComparison)
                }), this.updateDeferredPropertyValues()
            }
            refreshMetrics() {
                let t = new Set([this.element]);
                this._allKeyframes.forEach(e => e.anchors.forEach(e => t.add(e))), this.group.metrics.refreshCollection(t), this.group.keyframesDirty = !0
            }
            updateDeferredPropertyValues() {
                for (let t = 0, e = this.attributes.length; t < e; t++) {
                    let e = this.attributes[t],
                        i = this.keyframes[e];
                    if (!(i[0].keyframeType > s.KeyframeTypes.InterpolationForward))
                        for (let t = 0, s = i.length; t < s; t++) {
                            let n = i[t];
                            null === n.jsonProps[e][0] && (0 === t ? n.jsonProps[e][0] = n.animValues[e][0] = this.tweenProps[e].current : n.animValues[e][0] = i[t - 1].animValues[e][1]), null === n.jsonProps[e][1] && (n.animValues[e][1] = t === s - 1 ? this.tweenProps[e].current : i[t + 1].animValues[e][0]), n.snapAtCreation && (n.jsonProps[e][0] = n.animValues[e][0], n.jsonProps[e][1] = n.animValues[e][1])
                        }
                }
            }
            getBounds(t) {
                this.boundsMin = Number.MAX_VALUE, this.boundsMax = -Number.MAX_VALUE;
                for (let e = 0, i = this.attributes.length; e < i; e++) {
                    let i = this.keyframes[this.attributes[e]];
                    for (let e = 0; e < i.length; e++) {
                        let s = i[e];
                        this.boundsMin = Math.min(s.start, this.boundsMin), this.boundsMax = Math.max(s.end, this.boundsMax), t.min = Math.min(s.start, t.min), t.max = Math.max(s.end, t.max)
                    }
                }
            }
            getNearestKeyframeForAttribute(t, e) {
                e = void 0 !== e ? e : this.group.position.local;
                let i = null,
                    s = Number.POSITIVE_INFINITY,
                    n = this.keyframes[t];
                if (void 0 === n) return null;
                let r = n.length;
                if (0 === r) return null;
                if (1 === r) return n[0];
                for (let t = 0; t < r; t++) {
                    let r = n[t];
                    if (r.isInRange(e)) {
                        i = r;
                        break
                    }
                    let A = Math.min(Math.abs(e - r.start), Math.abs(e - r.end));
                    A < s && (s = A, i = r)
                }
                return i
            }
            getAllKeyframesForAttribute(t) {
                return this.keyframes[t]
            }
            updateKeyframe(t, e) {
                t.parseOptions(e), t.evaluateConstraints(), this.group.keyframesDirty = !0, m.update(() => {
                    this.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t), this.group.trigger(s.EVENTS.ON_KEYFRAME_UPDATED, t)
                }, !0)
            }
            removeKeyframe(t) {
                return t.controller !== this ? Promise.resolve(null) : (t.markedForRemoval = !0, this.group.keyframesDirty = !0, new Promise(e => {
                    this.group.rafEmitter.executor.eventEmitter.once("before:draw", () => {
                        e(t), t.destroy();
                        let i = this._allKeyframes.indexOf(t); - 1 !== i && this._allKeyframes.splice(i, 1)
                    })
                }))
            }
            updateAnimation(t, e) {
                return this.group.gui && console.warn("KeyframeController.updateAnimation(keyframe,props) has been deprecated. Please use updateKeyframe(keyframe,props)"), this.updateKeyframe(t, e)
            }
        }
    }, {
        117: 117,
        118: 118,
        121: 121,
        131: 131,
        132: 132,
        135: 135,
        136: 136,
        137: 137,
        140: 140,
        141: 141,
        144: 144,
        146: 146,
        154: 154,
        170: 170,
        230: 230,
        231: 231,
        232: 232,
        233: 233,
        234: 234,
        61: 61
    }],
    134: [function(t, e, i) {
        "use strict";
        const s = t(131),
            n = t(136),
            r = t(144);
        class A extends s {
            constructor(t, e) {
                super(t, e), this.keyframeType = n.KeyframeTypes.Event, this.isApplied = !1, this.hasDuration = !1, this.isCurrentlyInRange = !1
            }
            parseOptions(t) {
                t.x = void 0, t.y = void 0, t.scale = void 0, t.scaleX = void 0, t.scaleY = void 0, t.rotation = void 0, t.style = void 0, t.cssClass = void 0, t.rotation = void 0, t.opacity = void 0, t.hold = void 0, this.event = t.event, this.animValues[this.event] = [0, 0], void 0 === this.controller.tweenProps[this.event] && (this.controller.tweenProps[this.event] = new r(0, 1, !1)), super.parseOptions(t), this.keyframeType = n.KeyframeTypes.Event
            }
            updateLocalProgress(t) {
                if (this.hasDuration) {
                    let e = this.isCurrentlyInRange,
                        i = t >= this.start && t <= this.end;
                    if (e === i) return;
                    return this.isCurrentlyInRange = i, void(i && !e ? this._trigger(this.event + ":enter") : e && !i && this._trigger(this.event + ":exit"))
                }!this.isApplied && t >= this.start ? (this.isApplied = !0, this._trigger(this.event)) : this.isApplied && t < this.start && (this.isApplied = !1, this._trigger(this.event + ":reverse"))
            }
            _trigger(t) {
                this.controller.eventObject.event = t, this.controller.eventObject.keyframe = this, this.controller.trigger(t, this.controller.eventObject)
            }
            evaluateConstraints() {
                super.evaluateConstraints(), this.hasDuration = this.start !== this.end
            }
            reset(t) {
                this.isApplied = !1, this.isCurrentlyInRange = !1, super.reset(t)
            }
            onDOMRead(t) {}
            reconcile(t) {}
            evaluateInterpolationConstraints() {}
        }
        A.DATA_ATTRIBUTE = "data-anim-event", e.exports = A
    }, {
        131: 131,
        136: 136,
        144: 144
    }],
    135: [function(t, e, i) {
        "use strict";
        const s = t(145);
        e.exports = class {
            constructor(t, e, i = !1) {
                this.isGroup = i, this.group = t, this.controller = e, this.controllers = [], this.tweenProps = new s
            }
        }
    }, {
        145: 145
    }],
    136: [function(t, e, i) {
        "use strict";
        const s = {
            GUI_INSTANCE: null,
            ANIM_INSTANCE: null,
            VIEWPORT_EMITTER_ELEMENT: void 0,
            LOCAL_STORAGE_KEYS: {
                GuiPosition: "anim-ui.position",
                GroupCollapsedStates: "anim-ui.group-collapsed-states",
                scrollY: "anim-ui.scrollY-position",
                path: "anim-ui.path"
            },
            RESIZE_TIMEOUT: -1,
            BREAKPOINTS: [{
                name: "S",
                mediaQuery: "only screen and (max-width: 734px)"
            }, {
                name: "M",
                mediaQuery: "only screen and (max-width: 1068px)"
            }, {
                name: "L",
                mediaQuery: "only screen and (min-width: 1069px)"
            }],
            getBreakpoint: function() {
                for (let t = 0; t < s.BREAKPOINTS.length; t++) {
                    let e = s.BREAKPOINTS[t];
                    if (window.matchMedia(e.mediaQuery).matches) return e.name
                }
            },
            KeyframeDefaults: {
                ease: 1,
                epsilon: .05,
                preserveState: !1,
                easeFunctionString: "linear",
                easeFunction: "linear",
                hold: !1,
                snapAtCreation: !1,
                toggle: !1,
                breakpointMask: "SMLX",
                event: "",
                disabledWhen: [],
                cssClass: ""
            },
            KeyframeTypes: {
                Interpolation: 0,
                InterpolationForward: 1,
                CSSClass: 2,
                Event: 3
            },
            EVENTS: {
                ON_DOM_KEYFRAMES_CREATED: "ON_DOM_KEYFRAMES_CREATED",
                ON_DOM_GROUPS_CREATED: "ON_DOM_GROUPS_CREATED",
                ON_GROUP_CREATED: "ON_GROUP_CREATED",
                ON_KEYFRAME_UPDATED: "ON_KEYFRAME_UPDATED",
                ON_TIMELINE_START: "ON_TIMELINE_START",
                ON_TIMELINE_UPDATE: "ON_TIMELINE_UPDATE",
                ON_TIMELINE_COMPLETE: "ON_TIMELINE_COMPLETE",
                ON_CHAPTER_INITIATED: "ON_CHAPTER_INITIATED",
                ON_CHAPTER_OCCURRED: "ON_CHAPTER_OCCURRED",
                ON_CHAPTER_COMPLETED: "ON_CHAPTER_COMPLETED"
            },
            PageEvents: {
                ON_SCROLL: "ON_SCROLL",
                ON_RESIZE_IMMEDIATE: "ON_RESIZE_IMMEDIATE",
                ON_RESIZE_DEBOUNCED: "ON_RESIZE_DEBOUNCED",
                ON_BREAKPOINT_CHANGE: "ON_BREAKPOINT_CHANGE"
            },
            KeyframeJSONReservedWords: ["event", "cssClass", "style", "anchors", "start", "end", "epsilon", "easeFunction", "ease", "breakpointMask", "disabledWhen"],
            TweenProps: t(145),
            TargetValue: t(144),
            CSSTargetValue: t(137),
            pageMetrics: new function() {
                this.scrollX = 0, this.scrollY = 0, this.windowWidth = 0, this.windowHeight = 0, this.documentOffsetX = 0, this.documentOffsetY = 0, this.previousBreakpoint = "", this.breakpoint = ""
            },
            KeyframeComparison: function(t, e) {
                return t.start < e.start ? -1 : t.start > e.start ? 1 : 0
            }
        };
        e.exports = s
    }, {
        137: 137,
        144: 144,
        145: 145
    }],
    137: [function(t, e, i) {
        "use strict";
        const s = t(144);
        e.exports = class extends s {
            constructor(t, e, i, s, n = !1, r) {
                super(t, e, i), this.key = s, this.key.startsWith("--") || (this.key = this.key.replace(/[A-Z]/g, t => "-" + t.toLowerCase())), this.round = n, this.suffix = r
            }
            set(t) {
                let e = this.current;
                this.round && (e = Math.round(e)), this.suffix && (e += this.suffix), t.setProperty(this.key, e)
            }
        }
    }, {
        144: 144
    }],
    138: [function(t, e, i) {
        "use strict";
        e.exports = new class {
            constructor() {
                this.linear = function(t) {
                    return t
                }, this.easeInQuad = function(t) {
                    return t * t
                }, this.easeOutQuad = function(t) {
                    return t * (2 - t)
                }, this.easeInOutQuad = function(t) {
                    return t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1
                }, this.easeInSin = function(t) {
                    return 1 + Math.sin(Math.PI / 2 * t - Math.PI / 2)
                }, this.easeOutSin = function(t) {
                    return Math.sin(Math.PI / 2 * t)
                }, this.easeInOutSin = function(t) {
                    return (1 + Math.sin(Math.PI * t - Math.PI / 2)) / 2
                }, this.easeInElastic = function(t) {
                    return 0 === t ? t : (.04 - .04 / t) * Math.sin(25 * t) + 1
                }, this.easeOutElastic = function(t) {
                    return .04 * t / --t * Math.sin(25 * t)
                }, this.easeInOutElastic = function(t) {
                    return (t -= .5) < 0 ? (.02 + .01 / t) * Math.sin(50 * t) : (.02 - .01 / t) * Math.sin(50 * t) + 1
                }, this.easeOutBack = function(t) {
                    return (t -= 1) * t * (2.70158 * t + 1.70158) + 1
                }, this.easeInCubic = function(t) {
                    return t * t * t
                }, this.easeOutCubic = function(t) {
                    return --t * t * t + 1
                }, this.easeInOutCubic = function(t) {
                    return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                }, this.easeInQuart = function(t) {
                    return t * t * t * t
                }, this.easeOutQuart = function(t) {
                    return 1 - --t * t * t * t
                }, this.easeInOutQuart = function(t) {
                    return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
                }, this.easeInQuint = function(t) {
                    return t * t * t * t * t
                }, this.easeOutQuint = function(t) {
                    return 1 + --t * t * t * t * t
                }, this.easeInOutQuint = function(t) {
                    return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
                }
            }
        }
    }, {}],
    139: [function(t, e, i) {
        "use strict";
        const s = t(136),
            n = (t, e) => null == t ? e : t;
        class r {
            constructor(t) {
                this.top = 0, this.bottom = 0, this.left = 0, this.right = 0, this.height = 0, this.width = 0
            }
            toString() {
                return "top:".concat(this.top, ", bottom:").concat(this.bottom, ", left:").concat(this.left, ", right:").concat(this.right, ", height:").concat(this.height, ", width:").concat(this.width)
            }
            toObject() {
                return {
                    top: this.top,
                    bottom: this.bottom,
                    left: this.left,
                    right: this.right,
                    height: this.height,
                    width: this.width
                }
            }
        }
        e.exports = class {
            constructor() {
                this.clear()
            }
            clear() {
                this._metrics = new WeakMap
            }
            destroy() {
                this._metrics = null
            }
            add(t) {
                let e = this._metrics.get(t);
                if (e) return e;
                let i = new r(t);
                return this._metrics.set(t, i), this._refreshMetrics(t, i)
            }
            get(t) {
                return this._metrics.get(t)
            }
            refreshCollection(t) {
                t.forEach(t => this._refreshMetrics(t, null))
            }
            refreshMetrics(t) {
                return this._refreshMetrics(t)
            }
            _refreshMetrics(t, e) {
                if (e = e || this._metrics.get(t), !(t instanceof Element)) return e.width = n(t.width, 0), e.height = n(t.height, 0), e.top = n(t.top, n(t.y, 0)), e.left = n(t.left, n(t.x, 0)), e.right = e.left + e.width, e.bottom = e.top + e.height, e;
                if (void 0 === t.offsetWidth) {
                    let i = t.getBoundingClientRect();
                    return e.width = i.width, e.height = i.height, e.top = s.pageMetrics.scrollY + i.top, e.left = s.pageMetrics.scrollX + i.left, e.right = e.left + e.width, e.bottom = e.top + e.height, e
                }
                e.width = t.offsetWidth, e.height = t.offsetHeight, e.top = s.pageMetrics.documentOffsetY, e.left = s.pageMetrics.documentOffsetX;
                let i = t;
                for (; i;) e.top += i.offsetTop, e.left += i.offsetLeft, i = i.offsetParent;
                return e.right = e.left + e.width, e.bottom = e.top + e.height, e
            }
        }
    }, {
        136: 136
    }],
    140: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t) {
                this.controller = t, this.element = this.controller.element, this.keyframe = null, this.event = "", this.tweenProps = this.controller.tweenProps
            }
        }
    }, {}],
    141: [function(t, e, i) {
        "use strict";
        const s = t(136),
            n = t(131),
            r = t(134),
            A = t(132),
            o = function(t) {
                for (let e in t) {
                    let i = t[e];
                    if (-1 === s.KeyframeJSONReservedWords.indexOf(e) && Array.isArray(i)) return !0
                }
                return !1
            };
        e.exports = function(t) {
            if (void 0 !== t.cssClass || void 0 !== t.style) {
                if (o(t)) throw "CSS Keyframes cannot tween values, please use multiple keyframes instead";
                return A
            }
            if (o(t)) return n;
            if (t.event) return r;
            throw delete t.anchors, "Could not determine tween type based on ".concat(JSON.stringify(t))
        }
    }, {
        131: 131,
        132: 132,
        134: 134,
        136: 136
    }],
    142: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor() {
                this.local = 0, this.localUnclamped = 0, this.lastPosition = 0
            }
        }
    }, {}],
    143: [function(t, e, i) {
        "use strict";
        const {
            map: s
        } = t(221), n = {};
        class r {
            constructor(t, e, i, s) {
                this.mass = t, this.stiffness = e, this.damping = i, this.initialVelocity = s, this.m_w0 = Math.sqrt(this.stiffness / this.mass), this.m_zeta = this.damping / (2 * Math.sqrt(this.stiffness * this.mass)), this.m_zeta < 1 ? (this.m_wd = this.m_w0 * Math.sqrt(1 - this.m_zeta * this.m_zeta), this.m_A = 1, this.m_B = (this.m_zeta * this.m_w0 - this.initialVelocity) / this.m_wd) : (this.m_wd = 0, this.m_A = 1, this.m_B = -this.initialVelocity + this.m_w0)
            }
            solve(t) {
                return 1 - (t = this.m_zeta < 1 ? Math.exp(-t * this.m_zeta * this.m_w0) * (this.m_A * Math.cos(this.m_wd * t) + this.m_B * Math.sin(this.m_wd * t)) : (this.m_A + this.m_B * t) * Math.exp(-t * this.m_w0))
            }
        }
        const A = /\d*\.?\d+/g;
        r.fromCSSString = function(t) {
            let e = t.match(A);
            if (4 !== e.length) throw "SpringEasing could not convert ".concat(cssString, " to spring params");
            let i = e.map(Number),
                o = new r(...i);
            const a = o.solve.bind(o);
            let h = 0;
            let l = function() {
                if (n[t]) return n[t];
                let e, i = 0;
                for (;;) {
                    h += 1 / 6;
                    if (1 === a(h)) {
                        if (i++, i >= 16) {
                            e = h * (1 / 6);
                            break
                        }
                    } else i = 0
                }
                return n[t] = e, n[t]
            }();
            return function(t) {
                return 0 === t || 1 === t ? t : a(s(t, 0, 1, 0, l))
            }
        }, e.exports = r
    }, {
        221: 221
    }],
    144: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e, i) {
                this.epsilon = parseFloat(e), this.snapAtCreation = i, this.initialValue = t, this.target = t, this.current = t, this.previousValue = t, this.isActive = !1
            }
        }
    }, {}],
    145: [function(t, e, i) {
        "use strict";
        e.exports = class {}
    }, {}],
    146: [function(t, e, i) {
        "use strict";
        e.exports = () => Math.random().toString(16).slice(-4)
    }, {}],
    147: [function(t, e, i) {
        "use strict";
        const s = Math.abs;
        class n {
            constructor(t, e, i, s) {
                this.cp = new Float32Array(6), this.cp[0] = 3 * t, this.cp[1] = 3 * (i - t) - this.cp[0], this.cp[2] = 1 - this.cp[0] - this.cp[1], this.cp[3] = 3 * e, this.cp[4] = 3 * (s - e) - this.cp[3], this.cp[5] = 1 - this.cp[3] - this.cp[4]
            }
            sampleCurveX(t) {
                return ((this.cp[2] * t + this.cp[1]) * t + this.cp[0]) * t
            }
            sampleCurveY(t) {
                return ((this.cp[5] * t + this.cp[4]) * t + this.cp[3]) * t
            }
            sampleCurveDerivativeX(t) {
                return (3 * this.cp[2] * t + 2 * this.cp[1]) * t + this.cp[0]
            }
            solveCurveX(t) {
                var e, i, n, r, A, o;
                for (n = t, o = 0; o < 5; o++) {
                    if (r = this.sampleCurveX(n) - t, s(r) < 1e-5) return n;
                    if (A = this.sampleCurveDerivativeX(n), s(A) < 1e-5) break;
                    n -= r / A
                }
                if ((n = t) < (e = 0)) return e;
                if (n > (i = 1)) return i;
                for (; e < i;) {
                    if (r = this.sampleCurveX(n), s(r - t) < 1e-5) return n;
                    t > r ? e = n : i = n, n = .5 * (i - e) + e
                }
                return n
            }
            solve(t) {
                return this.sampleCurveY(this.solveCurveX(t))
            }
        }
        const r = /\d*\.?\d+/g;
        n.fromCSSString = function(t) {
            let e = t.match(r);
            if (4 !== e.length) throw "UnitBezier could not convert ".concat(t, " to cubic-bezier");
            let i = e.map(Number),
                s = new n(i[0], i[1], i[2], i[3]);
            return s.solve.bind(s)
        }, e.exports = n
    }, {}],
    148: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t, e) {
                this.a = t.top - e, this.a < 0 && (this.a = t.top), this.b = t.top, this.d = t.bottom, this.c = Math.max(this.d - e, this.b)
            }
        }
    }, {}],
    149: [function(t, e, i) {
        "use strict";
        const s = t(150),
            n = new(t(139));
        class r {
            constructor(t) {
                this.group = t, this.data = {
                    target: null,
                    anchors: null,
                    metrics: this.group.metrics
                }
            }
            parseArray(t, e) {
                return [this.parseExpression(t, e[0]), this.parseExpression(t, e[1])]
            }
            parseExpression(t, e) {
                if (!e) return null;
                if ("number" == typeof e) return e;
                if ("string" != typeof e) throw "Expression must be a string, received ".concat(typeof e, ": ").concat(e);
                return this.data.target = t.controller.element, this.data.anchors = t.anchors, this.data.keyframe = t.keyframe, r._parse(e, this.data)
            }
            parseTimeValue(t, e) {
                if ("number" == typeof e) return e;
                let i = this.group.expressionParser.parseExpression(t, e);
                return this.group.convertScrollPositionToTValue(i)
            }
            destroy() {
                this.group = null
            }
            static parse(t, e) {
                return (e = e || {}) && (n.clear(), e.target && n.add(e.target), e.anchors && e.anchors.forEach(t => n.add(t))), e.metrics = n, r._parse(t, e)
            }
            static _parse(t, e) {
                return s.Parse(t).execute(e)
            }
        }
        r.programs = s.programs, "undefined" != typeof window && (window.ExpressionParser = r), e.exports = r
    }, {
        139: 139,
        150: 150
    }],
    150: [function(t, e, i) {
        "use strict";
        const s = t(136),
            n = t(221),
            r = {},
            A = {
                smoothstep: (t, e, i) => (i = A.clamp((i - t) / (e - t), 0, 1)) * i * (3 - 2 * i),
                deg: t => 180 * t / Math.PI,
                rad: t => t * Math.PI / 180,
                random: (t, e) => Math.random() * (e - t) + t,
                atan: Math.atan2
            };
        Object.getOwnPropertyNames(Math).forEach(t => A[t] ? null : A[t.toLowerCase()] = Math[t]), Object.getOwnPropertyNames(n).forEach(t => A[t] ? null : A[t.toLowerCase()] = n[t]);
        let o = null;
        const a = "a",
            h = "ALPHA",
            l = "(",
            c = ")",
            u = "PLUS",
            d = "MINUS",
            m = "MUL",
            p = "DIV",
            g = "INTEGER_CONST",
            f = "FLOAT_CONST",
            y = ",",
            I = "EOF",
            v = {
                NUMBERS: /\d|\d\.\d/,
                DIGIT: /\d/,
                OPERATOR: /[-+*/]/,
                PAREN: /[()]/,
                WHITE_SPACE: /\s/,
                ALPHA: /[a-zA-Z]|%/,
                ALPHANUMERIC: /[a-zA-Z0-9]/,
                OBJECT_UNIT: /^(t|l|b|r|%w|%h|%|h|w)$/,
                GLOBAL_METRICS_UNIT: /^(px|vh|vw)$/,
                ANY_UNIT: /^(t|l|b|r|%w|%h|%|h|w|px|vh|vw)$/,
                MATH_FUNCTION: new RegExp("\\b(".concat(Object.keys(A).join("|"), ")\\b"), "i")
            },
            E = function(t, e, i, s = "") {
                let n = e.slice(Math.max(i, 0), Math.min(e.length, i + 3)),
                    r = new Error("Expression Error. ".concat(t, ' in expression "').concat(e, '", near "').concat(n, '"'));
                throw console.error(r.message, o ? o.keyframe || o.target : ""), r
            },
            b = {
                round: 1,
                clamp: 3,
                lerp: 3,
                random: 2,
                atan: 2,
                floor: 1,
                ceil: 1,
                abs: 1,
                cos: 1,
                sin: 1,
                smoothstep: 3,
                rad: 1,
                deg: 1,
                pow: 2,
                calc: 1
            };
        class _ {
            constructor(t, e) {
                this.type = t, this.value = e
            }
        }
        _.ONE = new _("100", 100), _.EOF = new _(I, null);
        class C {
            constructor(t) {
                this.type = t
            }
        }
        class w extends C {
            constructor(t, e) {
                super("UnaryOp"), this.token = this.op = t, this.expr = e
            }
        }
        class x extends C {
            constructor(t, e, i) {
                super("BinOp"), this.left = t, this.op = e, this.right = i
            }
        }
        class T extends C {
            constructor(t, e) {
                if (super("MathOp"), this.op = t, this.list = e, b[t.value] && e.length !== b[t.value]) throw new Error("Incorrect number of arguments for '".concat(t.value, "'. Received ").concat(e.length, ", expected ").concat(b[t.value]))
            }
        }
        class S extends C {
            constructor(t) {
                super("Num"), this.token = t, this.value = t.value
            }
        }
        class M extends C {
            constructor(t, e, i) {
                super("RefValue"), this.num = t, this.ref = e, this.unit = i
            }
        }
        class O extends C {
            constructor(t, e) {
                super("CSSValue"), this.ref = t, this.propertyName = e
            }
        }
        class D extends C {
            constructor(t, e) {
                super("PropValue"), this.ref = t, this.propertyName = e
            }
        }
        class R {
            constructor(t) {
                let e;
                for (this.text = t, this.pos = 0, this.char = this.text[this.pos], this.tokens = [];
                    (e = this.getNextToken()) && e !== _.EOF;) this.tokens.push(e);
                this.tokens.push(e)
            }
            advance() {
                this.char = this.text[++this.pos]
            }
            skipWhiteSpace() {
                for (; null != this.char && v.WHITE_SPACE.test(this.char);) this.advance()
            }
            name() {
                let t = "";
                for (; null != this.char && v.ALPHA.test(this.char);) t += this.char, this.advance();
                return new _(h, t)
            }
            number() {
                let t = "";
                for ("." === this.char && (t += this.char, this.advance()); null != this.char && v.DIGIT.test(this.char);) t += this.char, this.advance();
                if (null != this.char && "." === this.char)
                    for (t.includes(".") && E("Number appears to contain 2 decimal points", this.text, this.pos), t += this.char, this.advance(); null != this.char && v.DIGIT.test(this.char);) t += this.char, this.advance();
                return "." === t && E("Attempted to parse a number, but found only a decimal point", this.text, this.pos), t.includes(".") ? new _(f, parseFloat(t)) : new _(g, parseInt(t))
            }
            getNextToken() {
                for (; null != this.char;)
                    if (v.WHITE_SPACE.test(this.char)) this.skipWhiteSpace();
                    else {
                        if ("." === this.char || v.DIGIT.test(this.char)) return this.number();
                        if ("," === this.char) return this.advance(), new _(y, ",");
                        if (v.OPERATOR.test(this.char)) {
                            let t = "",
                                e = this.char;
                            switch (e) {
                                case "+":
                                    t = u;
                                    break;
                                case "-":
                                    t = d;
                                    break;
                                case "*":
                                    t = m;
                                    break;
                                case "/":
                                    t = p
                            }
                            return this.advance(), new _(t, e)
                        }
                        if (v.PAREN.test(this.char)) {
                            let t = "",
                                e = this.char;
                            switch (e) {
                                case "(":
                                    t = l;
                                    break;
                                case ")":
                                    t = c
                            }
                            return this.advance(), new _(t, e)
                        }
                        if (v.ALPHA.test(this.char)) return this.name();
                        E('Unexpected character "'.concat(this.char, '"'), this.text, this.pos)
                    }
                return _.EOF
            }
        }
        class N {
            constructor(t) {
                this.lexer = t, this.pos = 0
            }
            get currentToken() {
                return this.lexer.tokens[this.pos]
            }
            error(t, e = "") {
                E(t, e, this.lexer.text, this.pos)
            }
            consume(t) {
                let e = this.currentToken;
                return e.type === t ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(t)), e
            }
            consumeList(t) {
                t.includes(this.currentToken) ? this.pos += 1 : this.error("Invalid token ".concat(this.currentToken.value, ", expected ").concat(tokenType))
            }
            expr() {
                let t = this.term();
                for (; this.currentToken.type === u || this.currentToken.type === d;) {
                    const e = this.currentToken;
                    switch (e.value) {
                        case "+":
                            this.consume(u);
                            break;
                        case "-":
                            this.consume(d)
                    }
                    t = new x(t, e, this.term())
                }
                return t
            }
            term() {
                let t = this.factor();
                for (; this.currentToken.type === m || this.currentToken.type === p;) {
                    const e = this.currentToken;
                    switch (e.value) {
                        case "*":
                            this.consume(m);
                            break;
                        case "/":
                            this.consume(p)
                    }
                    t = new x(t, e, this.factor())
                }
                return t
            }
            factor() {
                if (this.currentToken.type === u) return new w(this.consume(u), this.factor());
                if (this.currentToken.type === d) return new w(this.consume(d), this.factor());
                if (this.currentToken.type === g || this.currentToken.type === f) {
                    let t = new S(this.currentToken);
                    if (this.pos += 1, v.OPERATOR.test(this.currentToken.value) || this.currentToken.type === c || this.currentToken.type === y || this.currentToken.type === I) return t;
                    if (this.currentToken.type === h && this.currentToken.value === a) return this.consume(h), new M(t, this.anchorIndex(), this.unit(v.ANY_UNIT));
                    if (this.currentToken.type === h) return "%a" === this.currentToken.value && this.error("%a is invalid, try removing the %"), new M(t, null, this.unit());
                    this.error("Expected a scaling unit type", "Such as 'h' / 'w'")
                } else {
                    if (v.OBJECT_UNIT.test(this.currentToken.value)) return new M(new S(_.ONE), null, this.unit());
                    if (this.currentToken.value === a) {
                        this.consume(h);
                        const t = this.anchorIndex();
                        if (v.OBJECT_UNIT.test(this.currentToken.value)) return new M(new S(_.ONE), t, this.unit())
                    } else if (this.currentToken.type === h) {
                        if ("calc" === this.currentToken.value) return this.consume(h), this.expr();
                        if ("css" === this.currentToken.value || "var" === this.currentToken.value || "prop" === this.currentToken.value) {
                            const t = "prop" !== this.currentToken.value ? O : D;
                            this.consume(h), this.consume(l);
                            const e = this.propertyName();
                            let i = null;
                            return this.currentToken.type === y && (this.consume(y), this.consume(h), i = this.anchorIndex()), this.consume(c), new t(i, e)
                        }
                        if (v.MATH_FUNCTION.test(this.currentToken.value)) {
                            const t = this.currentToken.value.toLowerCase();
                            if ("number" == typeof A[t]) return this.consume(h), new S(new _(h, A[t]));
                            const e = _[t] || new _(t, t),
                                i = [];
                            this.consume(h), this.consume(l);
                            let s = null;
                            do {
                                this.currentToken.value === y && this.consume(y), s = this.expr(), i.push(s)
                            } while (this.currentToken.value === y);
                            return this.consume(c), new T(e, i)
                        }
                    } else if (this.currentToken.type === l) {
                        this.consume(l);
                        let t = this.expr();
                        return this.consume(c), t
                    }
                }
                this.error("Unexpected token ".concat(this.currentToken.value))
            }
            propertyName() {
                let t = "";
                for (; this.currentToken.type === h || this.currentToken.type === d;) t += this.currentToken.value, this.pos += 1;
                return t
            }
            unit(t = v.ANY_UNIT) {
                const e = this.currentToken;
                if (e.type === h && t.test(e.value)) return this.consume(h), new _(h, e.value = e.value.replace(/%(h|w)/, "$1").replace("%", "h"));
                this.error("Expected unit type")
            }
            anchorIndex() {
                const t = this.currentToken;
                if (t.type === g) return this.consume(g), new S(t);
                this.error("Invalid anchor reference", ". Should be something like a0, a1, a2")
            }
            parse() {
                const t = this.expr();
                return this.currentToken !== _.EOF && this.error("Unexpected token ".concat(this.currentToken.value)), t
            }
        }
        class P {
            constructor(t) {
                this.parser = t, this.root = t.parse()
            }
            visit(t) {
                let e = this[t.type];
                if (!e) throw new Error("No visit method named, ".concat(e));
                return e.call(this, t)
            }
            BinOp(t) {
                switch (t.op.type) {
                    case u:
                        return this.visit(t.left) + this.visit(t.right);
                    case d:
                        return this.visit(t.left) - this.visit(t.right);
                    case m:
                        return this.visit(t.left) * this.visit(t.right);
                    case p:
                        return this.visit(t.left) / this.visit(t.right)
                }
            }
            RefValue(t) {
                let e = this.unwrapReference(t),
                    i = t.unit.value,
                    n = t.num.value;
                const r = o.metrics.get(e);
                switch (i) {
                    case "h":
                        return .01 * n * r.height;
                    case "t":
                        return .01 * n * r.top;
                    case "vh":
                        return .01 * n * s.pageMetrics.windowHeight;
                    case "vw":
                        return .01 * n * s.pageMetrics.windowWidth;
                    case "px":
                        return n;
                    case "w":
                        return .01 * n * r.width;
                    case "b":
                        return .01 * n * r.bottom;
                    case "l":
                        return .01 * n * r.left;
                    case "r":
                        return .01 * n * r.right
                }
            }
            PropValue(t) {
                return (null === t.ref ? o.target : o.anchors[t.ref.value])[t.propertyName]
            }
            CSSValue(t) {
                let e = this.unwrapReference(t);
                const i = getComputedStyle(e).getPropertyValue(t.propertyName);
                return "" === i ? 0 : P.Parse(i).execute(o)
            }
            Num(t) {
                return t.value
            }
            UnaryOp(t) {
                return t.op.type === u ? +this.visit(t.expr) : t.op.type === d ? -this.visit(t.expr) : void 0
            }
            MathOp(t) {
                let e = t.list.map(t => this.visit(t));
                return A[t.op.value].apply(null, e)
            }
            unwrapReference(t) {
                return null === t.ref ? o.target : (t.ref.value >= o.anchors.length && console.error("Not enough anchors supplied for expression ".concat(this.parser.lexer.text), o.target), o.anchors[t.ref.value])
            }
            execute(t) {
                return o = t, this.visit(this.root)
            }
            static Parse(t) {
                return r[t] || (r[t] = new P(new N(new R(t))))
            }
        }
        P.programs = r, e.exports = P
    }, {
        136: 136,
        221: 221
    }],
    151: [function(t, e, i) {
        "use strict";
        const s = t(61).EventEmitterMicro,
            n = t(221),
            r = t(154),
            A = t(136),
            o = t(135),
            a = t(142),
            h = t(148),
            l = t(139),
            c = t(149),
            u = t(133),
            d = {};
        "undefined" != typeof window && (d.create = t(110), d.update = t(121), d.draw = t(117));
        let m = 0;
        e.exports = class extends s {
            constructor(t, e) {
                super(), this.anim = e, this.element = t, this.name = this.name || t.getAttribute("data-anim-scroll-group"), this.isEnabled = !0, this.position = new a, this.metrics = new l, this.metrics.add(this.element), this.expressionParser = new c(this), this.boundsMin = 0, this.boundsMax = 0, this.timelineUpdateRequired = !1, this._keyframesDirty = !1, this.viewableRange = this.createViewableRange(), this.defaultEase = A.KeyframeDefaults.ease, this.keyframeControllers = [], this.updateProgress(this.getPosition()), this.onDOMRead = this.onDOMRead.bind(this), this.onDOMWrite = this.onDOMWrite.bind(this), this.gui = null, this.finalizeInit()
            }
            finalizeInit() {
                this.element._animInfo = new o(this, null, !0), this.setupRAFEmitter()
            }
            destroy() {
                this.destroyed = !0, this.expressionParser.destroy(), this.expressionParser = null;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].destroy();
                this.keyframeControllers = null, this.position = null, this.viewableRange = null, this.gui && (this.gui.destroy(), this.gui = null), this.metrics.destroy(), this.metrics = null, this.rafEmitter.destroy(), this.rafEmitter = null, this.anim = null, this.element._animInfo && this.element._animInfo.group === this && (this.element._animInfo.group = null, this.element._animInfo = null), this.element = null, this.isEnabled = !1, super.destroy()
            }
            removeKeyframeController(t) {
                return this.keyframeControllers.includes(t) ? (t._allKeyframes.forEach(t => t.markedForRemoval = !0), this.keyframesDirty = !0, new Promise(e => {
                    d.draw(() => {
                        const i = this.keyframeControllers.indexOf(t); - 1 !== i ? (this.keyframeControllers.splice(i, 1), t.onDOMWrite(), t.destroy(), this.gui && this.gui.create(), e()) : e()
                    })
                })) : Promise.resolve()
            }
            remove() {
                return this.anim.removeGroup(this)
            }
            clear() {
                return Promise.all(this.keyframeControllers.map(t => this.removeKeyframeController(t)))
            }
            setupRAFEmitter(t) {
                this.rafEmitter && this.rafEmitter.destroy(), this.rafEmitter = t || new d.create, this.rafEmitter.on("update", this.onDOMRead), this.rafEmitter.on("draw", this.onDOMWrite), this.rafEmitter.once("external", () => this.reconcile())
            }
            requestDOMChange() {
                return !!this.isEnabled && this.rafEmitter.run()
            }
            onDOMRead() {
                this.keyframesDirty && this.onKeyframesDirty();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMRead(this.position.local)
            }
            onDOMWrite() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].onDOMWrite();
                this.needsUpdate() && this.requestDOMChange()
            }
            needsUpdate() {
                if (this._keyframesDirty) return !0;
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++)
                    if (this.keyframeControllers[t].needsUpdate()) return !0;
                return !1
            }
            addKeyframe(t, e) {
                let i = this.getControllerForTarget(t);
                return null === i && (i = new u(this, t), this.keyframeControllers.push(i)), this.keyframesDirty = !0, i.addKeyframe(e)
            }
            addEvent(t, e) {
                e.event = e.event || "Generic-Event-Name-" + m++;
                let i = void 0 !== e.end && e.end !== e.start;
                const s = this.addKeyframe(t, e);
                return i ? (e.onEnterOnce && s.controller.once(e.event + ":enter", e.onEnterOnce), e.onExitOnce && s.controller.once(e.event + ":exit", e.onExitOnce), e.onEnter && s.controller.on(e.event + ":enter", e.onEnter), e.onExit && s.controller.on(e.event + ":exit", e.onExit)) : (e.onEventOnce && s.controller.once(e.event, e.onEventOnce), e.onEventReverseOnce && s.controller.once(e.event + ":reverse", e.onEventReverseOnce), e.onEvent && s.controller.on(e.event, e.onEvent), e.onEventReverse && s.controller.on(e.event + ":reverse", e.onEventReverse)), s
            }
            forceUpdate({
                waitForNextUpdate: t = !0,
                silent: e = !1
            } = {}) {
                this.isEnabled && (this.refreshMetrics(), this.timelineUpdateRequired = !0, t ? this.keyframesDirty = !0 : this.onKeyframesDirty({
                    silent: e
                }))
            }
            onKeyframesDirty({
                silent: t = !1
            } = {}) {
                this.determineActiveKeyframes(), this.keyframesDirty = !1, this.metrics.refreshMetrics(this.element), this.viewableRange = this.createViewableRange();
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].updateAnimationConstraints();
                this.updateBounds(), this.updateProgress(this.getPosition()), t || this.updateTimeline(), this.gui && this.gui.create()
            }
            refreshMetrics() {
                let t = new Set([this.element]);
                this.keyframeControllers.forEach(e => {
                    t.add(e.element), e._allKeyframes.forEach(e => e.anchors.forEach(e => t.add(e)))
                }), this.metrics.refreshCollection(t), this.viewableRange = this.createViewableRange()
            }
            reconcile() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].reconcile()
            }
            determineActiveKeyframes(t) {
                t = t || r(Array.from(document.documentElement.classList));
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].determineActiveKeyframes(t)
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
                let t = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].getBounds(t);
                let e = this.convertTValueToScrollPosition(t.min),
                    i = this.convertTValueToScrollPosition(t.max);
                i - e < A.pageMetrics.windowHeight ? (t.min = this.convertScrollPositionToTValue(e - .5 * A.pageMetrics.windowHeight), t.max = this.convertScrollPositionToTValue(i + .5 * A.pageMetrics.windowHeight)) : (t.min -= .001, t.max += .001), this.boundsMin = t.min, this.boundsMax = t.max, this.timelineUpdateRequired = !0
            }
            createViewableRange() {
                return new h(this.metrics.get(this.element), A.pageMetrics.windowHeight)
            }
            _onBreakpointChange(t, e) {
                this.keyframesDirty = !0, this.determineActiveKeyframes()
            }
            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = (t - this.viewableRange.a) / (this.viewableRange.d - this.viewableRange.a), this.position.local = n.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            performTimelineDispatch() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) this.keyframeControllers[t].updateLocalProgress(this.position.local);
                this.trigger(A.EVENTS.ON_TIMELINE_UPDATE, this.position.local), this.trigger("update", this.position.local), this.timelineUpdateRequired = !1, this.position.lastPosition !== this.position.local && (this.position.lastPosition <= this.boundsMin && this.position.localUnclamped > this.boundsMin ? (this.trigger(A.EVENTS.ON_TIMELINE_START, this), this.trigger("start", this)) : this.position.lastPosition >= this.boundsMin && this.position.localUnclamped < this.boundsMin ? (this.trigger(A.EVENTS.ON_TIMELINE_START + ":reverse", this), this.trigger("start:reverse", this)) : this.position.lastPosition <= this.boundsMax && this.position.localUnclamped >= this.boundsMax ? (this.trigger(A.EVENTS.ON_TIMELINE_COMPLETE, this), this.trigger("complete", this)) : this.position.lastPosition >= this.boundsMax && this.position.localUnclamped < this.boundsMax && (this.trigger(A.EVENTS.ON_TIMELINE_COMPLETE + ":reverse", this), this.trigger("complete:reverse", this))), null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            updateTimeline(t) {
                if (!this.isEnabled) return !1;
                void 0 === t && (t = this.getPosition()), this.updateProgress(t);
                let e = this.position.lastPosition === this.boundsMin || this.position.lastPosition === this.boundsMax,
                    i = this.position.localUnclamped === this.boundsMin || this.position.localUnclamped === this.boundsMax;
                if (!this.timelineUpdateRequired && e && i && this.position.lastPosition === t) return void(this.position.local = this.position.localUnclamped);
                if (this.timelineUpdateRequired || this.position.localUnclamped > this.boundsMin && this.position.localUnclamped < this.boundsMax) return this.performTimelineDispatch(), this.requestDOMChange(), void(this.position.lastPosition = this.position.localUnclamped);
                let s = this.position.lastPosition > this.boundsMin && this.position.lastPosition < this.boundsMax,
                    n = this.position.localUnclamped <= this.boundsMin || this.position.localUnclamped >= this.boundsMax;
                if (s && n) return this.performTimelineDispatch(), this.requestDOMChange(), void(this.position.lastPosition = this.position.localUnclamped);
                const r = this.position.lastPosition < this.boundsMin && this.position.localUnclamped > this.boundsMax,
                    A = this.position.lastPosition > this.boundsMax && this.position.localUnclamped < this.boundsMax;
                (r || A) && (this.performTimelineDispatch(), this.requestDOMChange(), this.position.lastPosition = this.position.localUnclamped), null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            _onScroll(t) {
                this.updateTimeline(t)
            }
            convertScrollPositionToTValue(t) {
                return this.hasDuration() ? n.map(t, this.viewableRange.a, this.viewableRange.d, 0, 1) : 0
            }
            convertTValueToScrollPosition(t) {
                return this.hasDuration() ? n.map(t, 0, 1, this.viewableRange.a, this.viewableRange.d) : 0
            }
            hasDuration() {
                return this.viewableRange.a !== this.viewableRange.d
            }
            getPosition() {
                return A.pageMetrics.scrollY
            }
            getControllerForTarget(t) {
                if (!t._animInfo || !t._animInfo.controllers) return null;
                if (t._animInfo.controller && t._animInfo.controller.group === this) return t._animInfo.controller;
                const e = t._animInfo.controllers;
                for (let t = 0, i = e.length; t < i; t++)
                    if (e[t].group === this) return e[t];
                return null
            }
            trigger(t, e) {
                if (void 0 !== this._events[t])
                    for (let i = this._events[t].length - 1; i >= 0; i--) void 0 !== e ? this._events[t][i](e) : this._events[t][i]()
            }
            set keyframesDirty(t) {
                this._keyframesDirty = t, this._keyframesDirty && this.requestDOMChange()
            }
            get keyframesDirty() {
                return this._keyframesDirty
            }
        }
    }, {
        110: 110,
        117: 117,
        121: 121,
        133: 133,
        135: 135,
        136: 136,
        139: 139,
        142: 142,
        148: 148,
        149: 149,
        154: 154,
        221: 221,
        61: 61
    }],
    152: [function(t, e, i) {
        "use strict";
        const s = t(151),
            n = t(130),
            r = t(221);
        let A = 0;
        const o = {};
        "undefined" != typeof window && (o.create = t(110));
        class a extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TimeGroup-" + A++), super(t, e), this.name = this.name || t.getAttribute("data-anim-time-group"), this._isPaused = !0, this._repeats = 0, this._isReversed = !1, this._timeScale = 1, this._chapterPlayer = new n(this), this.now = performance.now()
            }
            finalizeInit() {
                if (!this.anim) throw "TimeGroup not instantiated correctly. Please use `AnimSystem.createTimeGroup(el)`";
                this.onPlayTimeUpdate = this.onPlayTimeUpdate.bind(this), super.finalizeInit()
            }
            progress(t) {
                if (void 0 === t) return 0 === this.boundsMax ? 0 : this.position.local / this.boundsMax;
                let e = t * this.boundsMax;
                this.timelineUpdateRequired = !0, this.updateTimeline(e)
            }
            time(t) {
                if (void 0 === t) return this.position.local;
                t = r.clamp(t, this.boundsMin, this.duration), this.timelineUpdateRequired = !0, this.updateTimeline(t)
            }
            play(t) {
                this.reversed(!1), this.isEnabled = !0, this._isPaused = !1, this.time(t), this.now = performance.now(), this._playheadEmitter.run()
            }
            reverse(t) {
                this.reversed(!0), this.isEnabled = !0, this._isPaused = !1, this.time(t), this.now = performance.now(), this._playheadEmitter.run()
            }
            reversed(t) {
                if (void 0 === t) return this._isReversed;
                this._isReversed = t
            }
            restart() {
                this._isReversed ? (this.progress(1), this.reverse(this.time())) : (this.progress(0), this.play(this.time()))
            }
            pause(t) {
                this.time(t), this._isPaused = !0
            }
            paused(t) {
                return void 0 === t ? this._isPaused : (this._isPaused = t, this._isPaused || this.play(), this)
            }
            onPlayTimeUpdate() {
                if (this._isPaused) return;
                let t = performance.now(),
                    e = (t - this.now) / 1e3;
                this.now = t, this._isReversed && (e = -e);
                let i = this.time() + e * this._timeScale;
                if (this._repeats === a.REPEAT_FOREVER || this._repeats > 0) {
                    let t = !1;
                    !this._isReversed && i > this.boundsMax ? (i -= this.boundsMax, t = !0) : this._isReversed && i < 0 && (i = this.boundsMax + i, t = !0), t && (this._repeats = this._repeats === a.REPEAT_FOREVER ? a.REPEAT_FOREVER : this._repeats - 1)
                }
                this.time(i);
                let s = !this._isReversed && this.position.local !== this.duration,
                    n = this._isReversed && 0 !== this.position.local;
                s || n ? this._playheadEmitter.run() : this.paused(!0)
            }
            updateProgress(t) {
                this.hasDuration() ? (this.position.localUnclamped = t, this.position.local = r.clamp(this.position.localUnclamped, this.boundsMin, this.boundsMax)) : this.position.local = this.position.localUnclamped = 0
            }
            updateBounds() {
                if (0 === this.keyframeControllers.length) return this.boundsMin = 0, void(this.boundsMax = 0);
                let t = {
                    min: Number.POSITIVE_INFINITY,
                    max: Number.NEGATIVE_INFINITY
                };
                for (let e = 0, i = this.keyframeControllers.length; e < i; e++) this.keyframeControllers[e].getBounds(t);
                this.boundsMin = 0, this.boundsMax = t.max, this.viewableRange.a = this.viewableRange.b = 0, this.viewableRange.c = this.viewableRange.d = this.boundsMax, this.timelineUpdateRequired = !0
            }
            setupRAFEmitter(t) {
                this._playheadEmitter = new o.create, this._playheadEmitter.on("update", this.onPlayTimeUpdate), super.setupRAFEmitter(t)
            }
            get duration() {
                return this.keyframesDirty && this.onKeyframesDirty({
                    silent: !0
                }), this.boundsMax
            }
            timeScale(t) {
                return void 0 === t ? this._timeScale : (this._timeScale = t, this)
            }
            repeats(t) {
                if (void 0 === t) return this._repeats;
                this._repeats = t
            }
            getPosition() {
                return this.position.local
            }
            addChapter(t) {
                return this._chapterPlayer.addChapter(t)
            }
            playToChapter(t) {
                this._chapterPlayer.playToChapter(t)
            }
            convertScrollPositionToTValue(t) {
                return t
            }
            convertTValueToScrollPosition(t) {
                return t
            }
            hasDuration() {
                return this.duration > 0
            }
            destroy() {
                this._playheadEmitter.destroy(), this._playheadEmitter = null, super.destroy()
            }
            set timelineProgress(t) {
                this.progress(t)
            }
            get timelineProgress() {
                return this.progress()
            }
        }
        a.REPEAT_FOREVER = -1, e.exports = a
    }, {
        110: 110,
        130: 130,
        151: 151,
        221: 221
    }],
    153: [function(t, e, i) {
        "use strict";
        const s = t(151),
            n = (t(130), t(221));
        let r = 0;
        const A = {};
        "undefined" != typeof window && (A.create = t(110));
        e.exports = class extends s {
            constructor(t, e) {
                t || ((t = document.createElement("div")).className = "TweenGroup-" + r++), super(t, e), this.name = "Tweens", this.keyframes = [], this._isPaused = !1, this.now = performance.now()
            }
            finalizeInit() {
                this.onTimeEmitterUpdate = this.onTimeEmitterUpdate.bind(this), this.removeExpiredKeyframeControllers = this.removeExpiredKeyframeControllers.bind(this), super.finalizeInit()
            }
            destroy() {
                this._timeEmitter.destroy(), this._timeEmitter = null, this._keyframes = [], super.destroy()
            }
            setupRAFEmitter(t) {
                this.now = performance.now(), this._timeEmitter = new A.create, this._timeEmitter.on("update", this.onTimeEmitterUpdate), this._timeEmitter.run(), super.setupRAFEmitter(t)
            }
            addKeyframe(t, e) {
                if (void 0 !== e.start || void 0 !== e.end) throw Error("Tweens do not have a start or end, they can only have a duration. Consider using a TimeGroup instead");
                if ("number" != typeof e.duration) throw Error("Tween options.duration is undefined, or is not a number");
                let i, s;
                e.start = (e.delay || 0) + this.position.localUnclamped, e.end = e.start + e.duration, e.preserveState = !0, e.snapAtCreation = !0, t._animInfo && (i = t._animInfo.group, s = t._animInfo.controller);
                let n = super.addKeyframe(t, e);
                return t._animInfo.group = i, t._animInfo.controller = s, e.onStart && n.controller.once("draw", t => {
                    t.keyframe = n, e.onStart(t), t.keyframe = null
                }), e.onDraw && n.controller.on("draw", t => {
                    t.keyframe = n, e.onDraw(t), t.keyframe = null
                }), this.removeOverlappingProps(n), this.keyframes.push(n), this._timeEmitter.willRun() || (this.now = performance.now(), this._timeEmitter.run()), n
            }
            removeOverlappingProps(t) {
                if (t.controller._allKeyframes.length <= 1) return;
                let e = Object.keys(t.animValues),
                    i = t.controller;
                for (let s = 0, n = i._allKeyframes.length; s < n; s++) {
                    const n = i._allKeyframes[s];
                    if (n === t) continue;
                    if (n.markedForRemoval) continue;
                    let r = Object.keys(n.animValues),
                        A = r.filter(t => e.includes(t));
                    A.length !== r.length ? A.forEach(t => delete n.animValues[t]) : n.markedForRemoval = !0
                }
            }
            onTimeEmitterUpdate(t) {
                if (this._isPaused || 0 === this.keyframeControllers.length) return;
                let e = performance.now(),
                    i = (e - this.now) / 1e3;
                this.now = e;
                let s = this.position.local + i;
                this.position.local = this.position.localUnclamped = s, this.onTimeUpdate()
            }
            onTimeUpdate() {
                for (let t = 0, e = this.keyframes.length; t < e; t++) this.keyframes[t].updateLocalProgress(this.position.localUnclamped);
                this.requestDOMChange(), this._timeEmitter.run(), null !== this.gui && this.gui.onScrollUpdate(this.position)
            }
            onDOMRead() {
                if (this.keyframesDirty && this.onKeyframesDirty(), 0 !== this.keyframes.length)
                    for (let t = 0, e = this.keyframes.length; t < e; t++) {
                        this.keyframes[t].controller.needsWrite = !0;
                        for (let e in this.keyframes[t].animValues) this.keyframes[t].onDOMRead(e)
                    }
            }
            onDOMWrite() {
                super.onDOMWrite(), this.removeExpiredKeyframes()
            }
            removeExpiredKeyframes() {
                let t = this.keyframes.length,
                    e = t;
                for (; t--;) {
                    let e = this.keyframes[t];
                    e.destroyed ? this.keyframes.splice(t, 1) : (e.markedForRemoval && (e.jsonProps.onComplete && 1 === e.localT && (e.controller.eventObject.keyframe = e, e.jsonProps.onComplete(e.controller.eventObject), e.jsonProps.onComplete = null), null !== this.gui && this.gui.isDraggingPlayhead || (e.remove(), this.keyframes.splice(t, 1))), 1 === e.localT && (e.markedForRemoval = !0))
                }
                this.keyframes.length === e && 0 !== this.keyframes.length || this._timeEmitter.executor.eventEmitter.once("after:draw", this.removeExpiredKeyframeControllers)
            }
            removeExpiredKeyframeControllers() {
                for (let t = 0, e = this.keyframeControllers.length; t < e; t++) {
                    let e = !0,
                        i = this.keyframeControllers[t];
                    for (let t = 0, s = i._allKeyframes.length; t < s; t++)
                        if (!i._allKeyframes[t].destroyed) {
                            e = !1;
                            break
                        }
                    e && i.remove()
                }
            }
            updateBounds() {
                this.boundsMin = Math.min(...this.keyframes.map(t => t.start)), this.boundsMax = Math.max(...this.keyframes.map(t => t.end))
            }
            play() {
                this.isEnabled = !0, this._isPaused = !1, this.now = performance.now(), this._timeEmitter.run()
            }
            pause() {
                this._isPaused = !0
            }
            paused() {
                return this._isPaused
            }
            time(t) {
                if (void 0 === t) return this.position.local;
                this.position.local = this.position.localUnclamped = n.clamp(t, this.boundsMin, this.boundsMax), this.onTimeUpdate()
            }
            performTimelineDispatch() {}
            hasDuration() {
                return !0
            }
            getPosition() {
                return this.position.local
            }
            updateProgress(t) {}
            get duration() {
                return this.boundsMax
            }
        }
    }, {
        110: 110,
        130: 130,
        151: 151,
        221: 221
    }],
    154: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return t.reduce((t, e) => (t[e] = e, t), {})
        }
    }, {}],
    155: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            if ("string" != typeof t) return t;
            try {
                return (e || document).querySelector(t) || document.querySelector(t)
            } catch (t) {
                return !1
            }
        }
    }, {}],
    156: [function(t, e, i) {
        "use strict";
        const s = t(61).EventEmitterMicro,
            n = t(136),
            r = {
                create: t(110),
                update: t(121),
                draw: t(117)
            },
            A = () => {};
        let o = 0;
        e.exports = class extends s {
            constructor(t) {
                super(), this.el = t.el, this.gum = t.gum, this.componentName = t.componentName, this._keyframeController = null
            }
            destroy() {
                this.el = null, this.gum = null, this._keyframeController = null, super.destroy()
            }
            addKeyframe(t) {
                const e = t.el || this.el;
                return (t.group || this.anim).addKeyframe(e, t)
            }
            addDiscreteEvent(t) {
                t.event = t.event || "Generic-Event-Name-" + o++;
                let e = void 0 !== t.end && t.end !== t.start;
                const i = this.addKeyframe(t);
                return e ? (t.onEnterOnce && i.controller.once(t.event + ":enter", t.onEnterOnce), t.onExitOnce && i.controller.once(t.event + ":exit", t.onExitOnce), t.onEnter && i.controller.on(t.event + ":enter", t.onEnter), t.onExit && i.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce), t.onEventReverseOnce && i.controller.once(t.event + ":reverse", t.onEventReverseOnce), t.onEvent && i.controller.on(t.event, t.onEvent), t.onEventReverse && i.controller.on(t.event + ":reverse", t.onEventReverse)), i
            }
            addRAFLoop(t) {
                let e = ["start", "end"];
                if (!e.every(e => t.hasOwnProperty(e))) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
                const i = new r.create;
                i.on("update", t.onUpdate || A), i.on("draw", t.onDraw || A), i.on("draw", () => i.run());
                const {
                    onEnter: s,
                    onExit: n
                } = t;
                return t.onEnter = () => {
                    i.run(), s && s()
                }, t.onExit = () => {
                    i.cancel(), n && n()
                }, this.addDiscreteEvent(t)
            }
            addContinuousEvent(t) {
                t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"), t.event = t.event || "Generic-Event-Name-" + o++;
                let e = this.addKeyframe(t);
                return e.controller.on(t.event, t.onDraw), e
            }
            mounted() {}
            onResizeImmediate(t) {}
            onResizeDebounced(t) {}
            onBreakpointChange(t) {}
            get anim() {
                return this.gum.anim
            }
            get keyframeController() {
                return this._keyframeController || (this._keyframeController = this.anim.getControllerForTarget(this.el))
            }
            get pageMetrics() {
                return n.pageMetrics
            }
        }
    }, {
        110: 110,
        117: 117,
        121: 121,
        136: 136,
        61: 61
    }],
    157: [function(t, e, i) {
        "use strict";
        const s = t(61).EventEmitterMicro,
            n = t(171),
            r = t(129),
            A = t(136),
            o = t(158),
            a = {};
        class h extends s {
            constructor(t, e = {}) {
                super(), this.el = t, this.anim = r, this.componentAttribute = e.attribute || "data-component-list", this.components = [], this.componentsInitialized = !1, this.el.getAttribute("data-anim-scroll-group") || this.el.setAttribute("data-anim-scroll-group", "bubble-gum-group"), n.add(() => {
                    r.initialize().then(() => {
                        this.initComponents(), this.setupEvents(), this.components.forEach(t => t.mounted()), this.trigger(h.EVENTS.DOM_COMPONENTS_MOUNTED)
                    })
                })
            }
            initComponents() {
                const t = Array.prototype.slice.call(this.el.querySelectorAll("[".concat(this.componentAttribute, "]")));
                this.el.hasAttribute(this.componentAttribute) && t.push(this.el);
                for (let e = 0; e < t.length; e++) {
                    let i = t[e],
                        s = i.getAttribute(this.componentAttribute).split(" ");
                    for (let t = 0, e = s.length; t < e; t++) {
                        let e = s[t];
                        "" !== e && " " !== e && this.addComponent({
                            el: i,
                            componentName: e
                        })
                    }
                }
                this.componentsInitialized = !0
            }
            setupEvents() {
                this.onResizeDebounced = this.onResizeDebounced.bind(this), this.onResizeImmediate = this.onResizeImmediate.bind(this), this.onBreakpointChange = this.onBreakpointChange.bind(this), r.on(A.PageEvents.ON_RESIZE_IMMEDIATE, this.onResizeImmediate), r.on(A.PageEvents.ON_RESIZE_DEBOUNCED, this.onResizeDebounced), r.on(A.PageEvents.ON_BREAKPOINT_CHANGE, this.onBreakpointChange)
            }
            addComponent(t) {
                const {
                    el: e,
                    componentName: i,
                    data: s
                } = t;
                if (!o.hasOwnProperty(i)) throw "BubbleGum::addComponent could not add component to '" + e.className + "'. No component type '" + i + "' found!";
                const n = o[i];
                if (!h.componentIsSupported(n, i)) return void 0 === a[i] && (console.log("BubbleGum::addComponent unsupported component '" + i + "'. Reason: '" + i + ".IS_SUPPORTED' returned false"), a[i] = !0), null;
                let r = e.dataset.componentList || "";
                r.includes(i) || (e.dataset.componentList = r.split(" ").concat(i).join(" "));
                let l = new n({
                    el: e,
                    data: s,
                    componentName: t.componentName,
                    gum: this,
                    pageMetrics: A.pageMetrics
                });
                return this.components.push(l), this.componentsInitialized && l.mounted(), l
            }
            removeComponent(t) {
                const e = this.components.indexOf(t); - 1 !== e && (this.components.splice(e, 1), t.el.dataset.componentList = t.el.dataset.componentList.split(" ").filter(e => e !== t.componentName).join(" "), t.destroy())
            }
            getComponentOfType(t, e = document.documentElement) {
                const i = "[".concat(this.componentAttribute, "*=").concat(t, "]"),
                    s = e.matches(i) ? e : e.querySelector(i);
                return s ? this.components.find(e => e instanceof o[t] && e.el === s) : null
            }
            getComponentsOfType(t, e = document.documentElement) {
                const i = "[".concat(this.componentAttribute, "*=").concat(t, "]"),
                    s = e.matches(i) ? [e] : Array.from(e.querySelectorAll(i));
                return this.components.filter(e => e instanceof o[t] && s.includes(e.el))
            }
            getComponentsForElement(t) {
                return this.components.filter(e => e.el === t)
            }
            onResizeImmediate() {
                this.components.forEach(t => t.onResizeImmediate(A.pageMetrics))
            }
            onResizeDebounced() {
                this.components.forEach(t => t.onResizeDebounced(A.pageMetrics))
            }
            onBreakpointChange() {
                this.components.forEach(t => t.onBreakpointChange(A.pageMetrics))
            }
            static componentIsSupported(t, e) {
                const i = t.IS_SUPPORTED;
                if (void 0 === i) return !0;
                if ("function" != typeof i) return console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0;
                const s = t.IS_SUPPORTED();
                return void 0 === s ? (console.error('BubbleGum::addComponent error in "' + e + '".IS_SUPPORTED - it should be a function which returns true/false'), !0) : s
            }
        }
        h.EVENTS = {
            DOM_COMPONENTS_MOUNTED: "DOM_COMPONENTS_MOUNTED"
        }, e.exports = h
    }, {
        129: 129,
        136: 136,
        158: 158,
        171: 171,
        61: 61
    }],
    158: [function(t, e, i) {
        "use strict";
        e.exports = {
            BaseComponent: t(156)
        }
    }, {
        156: 156
    }],
    159: [function(t, e, i) {
        "use strict";
        var s, n = t(61).EventEmitterMicro,
            r = t(123),
            A = t(108);

        function o(t) {
            t = t || {}, n.call(this), this.id = A.getNewID(), this.executor = t.executor || r, this._reset(), this._willRun = !1, this._didDestroy = !1
        }(s = o.prototype = Object.create(n.prototype)).run = function() {
            return this._willRun || (this._willRun = !0), this._subscribe()
        }, s.cancel = function() {
            this._unsubscribe(), this._willRun && (this._willRun = !1), this._reset()
        }, s.destroy = function() {
            var t = this.willRun();
            return this.cancel(), this.executor = null, n.prototype.destroy.call(this), this._didDestroy = !0, t
        }, s.willRun = function() {
            return this._willRun
        }, s.isRunning = function() {
            return this._isRunning
        }, s._subscribe = function() {
            return this.executor.subscribe(this)
        }, s._unsubscribe = function() {
            return this.executor.unsubscribe(this)
        }, s._onAnimationFrameStart = function(t) {
            this._isRunning = !0, this._willRun = !1, this._didEmitFrameData || (this._didEmitFrameData = !0, this.trigger("start", t))
        }, s._onAnimationFrameEnd = function(t) {
            this._willRun || (this.trigger("stop", t), this._reset())
        }, s._reset = function() {
            this._didEmitFrameData = !1, this._isRunning = !1
        }, e.exports = o
    }, {
        108: 108,
        123: 123,
        61: 61
    }],
    160: [function(t, e, i) {
        "use strict";
        var s = t(162),
            n = function(t) {
                this.rafEmitter = new s, this.rafEmitter.on(t, this._onRAFExecuted.bind(this)), this.requestAnimationFrame = this.requestAnimationFrame.bind(this), this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this), this._frameCallbacks = [], this._nextFrameCallbacks = [], this._currentFrameID = -1, this._cancelFrameIdx = -1, this._frameCallbackLength = 0, this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0
            },
            r = n.prototype;
        r.requestAnimationFrame = function(t) {
            return this._currentFrameID = this.rafEmitter.run(), this._nextFrameCallbacks.push(this._currentFrameID, t), this._nextFrameCallbacksLength += 2, this._currentFrameID
        }, r.cancelAnimationFrame = function(t) {
            this._cancelFrameIdx = this._nextFrameCallbacks.indexOf(t), -1 !== this._cancelFrameIdx && (this._nextFrameCallbacks.splice(this._cancelFrameIdx, 2), this._nextFrameCallbacksLength -= 2, 0 === this._nextFrameCallbacksLength && this.rafEmitter.cancel())
        }, r._onRAFExecuted = function(t) {
            for (this._frameCallbacks = this._nextFrameCallbacks, this._frameCallbackLength = this._nextFrameCallbacksLength, this._nextFrameCallbacks = [], this._nextFrameCallbacksLength = 0, this._frameCallbackIteration = 0; this._frameCallbackIteration < this._frameCallbackLength; this._frameCallbackIteration += 2) this._frameCallbacks[this._frameCallbackIteration + 1](t.time, t)
        }, e.exports = n
    }, {
        162: 162
    }],
    161: [function(t, e, i) {
        "use strict";
        var s = t(160),
            n = function() {
                this.events = {}
            },
            r = n.prototype;
        r.requestAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)), this.events[t].requestAnimationFrame
        }, r.cancelAnimationFrame = function(t) {
            return this.events[t] || (this.events[t] = new s(t)), this.events[t].cancelAnimationFrame
        }, e.exports = new n
    }, {
        160: 160
    }],
    162: [function(t, e, i) {
        "use strict";
        var s = t(159),
            n = function(t) {
                s.call(this, t)
            };
        (n.prototype = Object.create(s.prototype))._subscribe = function() {
            return this.executor.subscribe(this, !0)
        }, e.exports = n
    }, {
        159: 159
    }],
    163: [function(t, e, i) {
        "use strict";
        var s = t(161);
        e.exports = s.requestAnimationFrame("draw")
    }, {
        161: 161
    }],
    164: [function(t, e, i) {
        "use strict";
        var s = t(161);
        e.exports = s.requestAnimationFrame("update")
    }, {
        161: 161
    }],
    165: [function(t, e, i) {
        "use strict";
        const s = t(164),
            n = t(163),
            r = t(166),
            A = t(168),
            o = t(169),
            a = t(167);
        e.exports = class {
            constructor(t, e = {}) {
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Clip duration must be a finite number; got "'.concat(t, '"'));
                "function" == typeof e && (e = {
                    draw: e
                }), this.ease = A(e.ease), this.update = A(e.update), this.draw = e.draw, this.prepare = A(e.prepare), this.finish = A(e.finish), this._duration = 1e3 * t, this._startTime = null, this._isPrepared = !1, this._promise = null, this._isPlaying = !1
            }
            get isReversed() {
                return this._duration < 0
            }
            get isComplete() {
                const t = this.progress;
                return !this.isReversed && t >= 1 || this.isReversed && t <= 0
            }
            get progress() {
                if (0 === this._duration) return 1;
                let t = (this.lastFrameTime - this._startTime) / this._duration;
                return this.isReversed && (t = 1 + t), a(t, 0, 1)
            }
            get easedProgress() {
                return this.ease ? this.ease(this.progress) : this.progress
            }
            _run(t, e) {
                this.lastFrameTime = Date.now(), null === this._startTime && (this._startTime = this.lastFrameTime);
                const i = this.easedProgress;
                this.update && s(() => this._isPlaying && this.update(i)), n(() => {
                    this._isPlaying && (this.draw(i), this.isComplete ? o(n, [this.finish, e]) : this._run(this, e))
                })
            }
            play() {
                if ("function" != typeof this.draw) throw new Error('Clip must be given a "draw" function as an option or have its "draw" method overriden.');
                return this._isPlaying = !0, this._promise || (this._promise = new Promise((t, e) => {
                    !this._isPrepared && this.prepare ? (this._isPrepared = !0, n(() => r(this.prepare(), () => {
                        this._run(this, t)
                    }))) : this._run(this, t)
                })), this._promise
            }
            destroy() {
                this._isPlaying = !1, this.draw = this.finish = this.update = null
            }
            static play() {
                return new this(...arguments).play()
            }
        }
    }, {
        163: 163,
        164: 164,
        166: 166,
        167: 167,
        168: 168,
        169: 169
    }],
    166: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            t instanceof Promise ? t.then(e) : e()
        }
    }, {}],
    167: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            return Math.min(Math.max(t, e), i)
        }
    }, {}],
    168: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "function" == typeof t ? t : null
        }
    }, {}],
    169: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            const i = e.length;
            let s = 0;
            ! function n() {
                "function" == typeof e[s] && t(e[s]), s++, s < i && n()
            }()
        }
    }, {}],
    170: [function(t, e, i) {
        "use strict";
        "undefined" != typeof window && (window.DOMMatrix = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix);
        const s = 180 / Math.PI,
            n = t => Math.round(1e6 * t) / 1e6;

        function r(t) {
            return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2])
        }

        function A(t, e) {
            return 0 === e ? Array.from(t) : [t[0] / e, t[1] / e, t[2] / e]
        }

        function o(t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }

        function a(t, e, i, s) {
            return [t[0] * i + e[0] * s, t[1] * i + e[1] * s, t[2] * i + e[2] * s]
        }

        function h(t) {
            const e = new Float32Array(4),
                i = new Float32Array(3),
                h = new Float32Array(3),
                l = new Float32Array(3);
            l[0] = t[3][0], l[1] = t[3][1], l[2] = t[3][2];
            const c = new Array(3);
            for (let e = 0; e < 3; e++) c[e] = t[e].slice(0, 3);
            i[0] = r(c[0]), c[0] = A(c[0], i[0]), h[0] = o(c[0], c[1]), c[1] = a(c[1], c[0], 1, -h[0]), i[1] = r(c[1]), c[1] = A(c[1], i[1]), h[0] /= i[1], h[1] = o(c[0], c[2]), c[2] = a(c[2], c[0], 1, -h[1]), h[2] = o(c[1], c[2]), c[2] = a(c[2], c[1], 1, -h[2]), i[2] = r(c[2]), c[2] = A(c[2], i[2]), h[1] /= i[2], h[2] /= i[2];
            const u = (d = c[1], m = c[2], [d[1] * m[2] - d[2] * m[1], d[2] * m[0] - d[0] * m[2], d[0] * m[1] - d[1] * m[0]]);
            var d, m;
            if (o(c[0], u) < 0)
                for (let t = 0; t < 3; t++) i[t] *= -1, c[t][0] *= -1, c[t][1] *= -1, c[t][2] *= -1;
            let p;
            return e[0] = .5 * Math.sqrt(Math.max(1 + c[0][0] - c[1][1] - c[2][2], 0)), e[1] = .5 * Math.sqrt(Math.max(1 - c[0][0] + c[1][1] - c[2][2], 0)), e[2] = .5 * Math.sqrt(Math.max(1 - c[0][0] - c[1][1] + c[2][2], 0)), e[3] = .5 * Math.sqrt(Math.max(1 + c[0][0] + c[1][1] + c[2][2], 0)), c[2][1] > c[1][2] && (e[0] = -e[0]), c[0][2] > c[2][0] && (e[1] = -e[1]), c[1][0] > c[0][1] && (e[2] = -e[2]), p = e[0] < .001 && e[0] >= 0 && e[1] < .001 && e[1] >= 0 ? [0, 0, n(180 * Math.atan2(c[0][1], c[0][0]) / Math.PI)] : function(t) {
                const [e, i, r, A] = t, o = e * e, a = i * i, h = r * r, l = e * i + r * A, c = A * A + o + a + h;
                return l > .49999 * c ? [0, 2 * Math.atan2(e, A) * s, 90] : l < -.49999 * c ? [0, -2 * Math.atan2(e, A) * s, -90] : [n(Math.atan2(2 * e * A - 2 * i * r, 1 - 2 * o - 2 * h) * s), n(Math.atan2(2 * i * A - 2 * e * r, 1 - 2 * a - 2 * h) * s), n(Math.asin(2 * e * i + 2 * r * A) * s)]
            }(e), {
                translation: l,
                rotation: p,
                eulerRotation: p,
                scale: [n(i[0]), n(i[1]), n(i[2])]
            }
        }
        e.exports = function(t) {
            t instanceof Element && (t = String(getComputedStyle(t).transform).trim());
            let e = new DOMMatrix(t);
            const i = new Array(4);
            for (let t = 1; t < 5; t++) {
                const s = i[t - 1] = new Float32Array(4);
                for (let i = 1; i < 5; i++) s[i - 1] = e["m".concat(t).concat(i)]
            }
            return h(i)
        }
    }, {}],
    171: [function(t, e, i) {
        "use strict";
        let s = !1,
            n = !1,
            r = [],
            A = -1;
        e.exports = {
            NUMBER_OF_FRAMES_TO_WAIT: 30,
            add: function(t) {
                if (n && t(), r.push(t), s) return;
                s = !0;
                let e = document.documentElement.scrollHeight,
                    i = 0;
                const o = () => {
                    let t = document.documentElement.scrollHeight;
                    if (e !== t) i = 0;
                    else if (i++, i >= this.NUMBER_OF_FRAMES_TO_WAIT) return void r.forEach(t => t());
                    e = t, A = requestAnimationFrame(o)
                };
                A = requestAnimationFrame(o)
            },
            reset() {
                cancelAnimationFrame(A), s = !1, n = !1, r = []
            }
        }
    }, {}],
    172: [function(t, e, i) {
        "use strict";
        const s = t(226),
            n = t(61).EventEmitterMicro,
            r = t(121),
            A = t(173);
        var o, a = "";
        navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && (a = A);
        e.exports = class extends n {
            constructor(t, e = {}) {
                if (super(), "VIDEO" !== t.tagName.toUpperCase()) throw "@marcom/InlineVideoProxy : element should be a VIDEO tag";
                if (t.__InlineVideoProxyInstance) throw '@marcom/InlineVideoProxy : This Video element is already managed by InlineVideoProxyHub, look for the instance in "videoElement.__InlineVideoProxyInstance" ';
                return null !== t.getAttribute("src") && this.log('Warning the video already contains a SRC defined. it is not recommended to have one on load., set the "data-video-source-basepath" attribute in the video tag instead.'), this.videoElement = t, o = e.EVENTS, this._logs = e.log || !1, this._checkLogEnabled(), this.log("starting Video Loader"), this._manualLoad = e.manualLoad || !1, this._enableHardCacheClean = e.cacheClean || !1, this._enableHardCacheClean && console.error("@marcom/InlineVideoProxy : cache clean option is enabled DISABLE FOR PRODUCTION"), this._elementEnteredView = this._elementEnteredView.bind(this), this._elementExitedView = this._elementExitedView.bind(this), this._elementEnteredLoadingArea = this._elementEnteredLoadingArea.bind(this), this._elementExitedLoadingArea = this._elementExitedLoadingArea.bind(this), this._onChangeCallback = this._onChangeCallback.bind(this), this._onChangeRetinaCallback = this._onChangeRetinaCallback.bind(this), this.VIDEO_PREVENT_LOAD = "data-video-prevent-load", this.VIDEO_DATA_BASEPATH = "data-video-source-basepath", this.VIDEO_SOURCE_PREFIX = "data-video-source-prefix", this.VIDEO_RETINA_ENABLED = "data-video-source-retina-enabled", this.VIDEO_VIEW_AREA_KEYFRAME = "data-view-area-keyframe", this.VIDEO_LOADING_AREA_KEYFRAME = "data-loading-area-keyframe", this.animSystem = this._findAnim(), null === this.animSystem ? (this.log("anim not found"), null) : (this._scrollGroup = this.animSystem.getGroupForTarget(document.body), this.viewportEmitterMicro = e.viewportEmitterMicro, this.viewportEmitterMicro.on(s.CHANGE_EVENTS.VIEWPORT, this._onChangeCallback), this.viewportEmitterMicro.on(s.CHANGE_EVENTS.RETINA, this._onChangeRetinaCallback), this.videoStatsMap = new Map, this.keyframes = {}, "loading" === document.readyState ? document.addEventListener("readystatechange", t => {
                    "interactive" === document.readyState && this._initVL()
                }) : this._initVL(), this.videoElement.__InlineVideoProxyInstance = this, this)
            }
            _initVL() {
                this._enhanceVideos()
            }
            _findAnim() {
                var t = Array.from(document.querySelectorAll("[data-anim-group],[data-anim-scroll-group],[data-anim-time-group]"));
                return t.map(t => t._animInfo ? t._animInfo.group : null).filter(t => null !== t), t[0] && t[0]._animInfo ? t[0]._animInfo.group.anim : (console.error("@marcom/InlineVideoProxy : AnimSystem not found, please initialize anim before instantiating vl"), null)
            }
            _checkLogEnabled() {
                this._logs ? this.log = (...t) => console.warn("@marcom/InlineVideoProxy :", ...t) : this.log = () => {}
            }
            _onChangeCallback(t) {
                this._changeVideoSource()
            }
            _onChangeRetinaCallback(t) {
                this._changeVideoSource(!0)
            }
            _getAllVideoSources(t) {
                this._videoSourceBasepath = t.getAttribute(this.VIDEO_DATA_BASEPATH), this._videoSourceBasepath || console.error("VideoProxy :  Base path not defined, please provide a full relative path to the video with a trailing '/' "), this._videoSourcePrefix = t.getAttribute(this.VIDEO_SOURCE_PREFIX) || "", this._videoSourceRetinaEnabled = t.getAttribute(this.VIDEO_RETINA_ENABLED) || "false";
                let e = t => {
                        let e = this._enableHardCacheClean ? "?" + Math.round(1e6 * Math.random()) : "",
                            i = {};
                        return i.x = "".concat(this._videoSourceBasepath).concat(this._videoSourcePrefix).concat(t, ".mp4").concat(e), i.xx = "".concat(this._videoSourceBasepath).concat(this._videoSourcePrefix).concat(t, ".mp4").concat(e), "false" !== this._videoSourceRetinaEnabled && (i.xx = "".concat(this._videoSourceBasepath).concat(this._videoSourcePrefix).concat(t, "_2x.mp4").concat(e)), i
                    },
                    i = this.viewportEmitterMicro.BREAKPOINTS.reduce((t, i, s) => {
                        let n = {};
                        return Object.defineProperty(n, i.name, {
                            value: e(i.name),
                            enumerable: !0
                        }), t = Object.assign(t, n)
                    }, {});
                this.videoSources = i
            }
            _getVideoSource(t) {
                let e = this.viewportEmitterMicro.retina ? "xx" : "x",
                    i = this.viewportEmitterMicro.viewport;
                this.videoSource = this.videoSources[i][e], this._addToStatsMap(t), this.viewportEmitterMicro.BREAKPOINTS.map(t => "vp-" + t.name).forEach(e => t.classList.remove(e)), t.classList.add("vp-" + i)
            }
            _addToStatsMap(t) {
                this.videoStatsMap.has(t.videoSource) || this.videoStatsMap.set(t.videoSource, {})
            }
            _updateStatsMap(t, e, i) {
                this.videoStatsMap.get(t.videoSource)[e] = i
            }
            _getValueStatsMap(t, e) {
                let i = this.videoStatsMap.get(t.videoSource);
                return null !== i[e] ? i[e] : null
            }
            _enhanceVideos() {
                let t = this.videoElement;
                this._getAllVideoSources(t), this._getVideoSource(t), this._isUnloadedVariable = !1, Object.defineProperty(this, "isUnloaded", {
                    get() {
                        return this._isUnloadedVariable
                    },
                    set(e) {
                        e ? (t.classList.remove("video-loaded"), t.classList.add("video-unloaded")) : (t.classList.add("video-loaded"), t.classList.remove("video-unloaded")), this._isUnloadedVariable = e
                    }
                }), Object.defineProperty(this, "currentTime", {
                    get() {
                        return this.videoElement.currentTime
                    }
                }), Object.defineProperty(this, "duration", {
                    get() {
                        return t.duration ? t.duration : (this.log("Warning on duration:: wait for metadata to be loaded to get duration"), -1)
                    }
                }), this.isUnloaded = !0, this.isInViewArea = !1, this.isInLoadingArea = !1, this.loadProgress = 0, this.hasMetadata = !1, this.downloadComplete = !1, this.canBePlayedThrough = !1, this._preventLoad = this._shouldPreventLoadViewportSize(t), t.setAttribute("src", a), this.promises = {}, this.promises.hasMetadata = null, this.promises.canBePlayedThrough = null, this.promises.downloadComplete = null, this._initVideoPromises(this);
                let e = () => {
                    r((i, s) => {
                        this.isUnloaded || (!this.hasMetadata && t.readyState >= 1 && this._promiseResolver.hasMetadata(t), !this.canBePlayedThrough && t.readyState > 3 && this._promiseResolver.canBePlayedThrough(t), t.buffered.length && (this.loadProgress = t.buffered.end(0), t.buffered.end(0) >= .99 * t.duration) ? this._promiseResolver.downloadComplete(t) : e())
                    })
                };
                this._startCheckStats = () => {
                    e()
                }, this.animSystemVersion = 2, "function" == typeof this.animSystem.remove && (this.animSystemVersion = 3);
                let i = t.getAttribute(this.VIDEO_LOADING_AREA_KEYFRAME);
                i = null === i ? 3 === this.animSystemVersion ? {
                    start: "t - 200vh",
                    end: "b + 100vh"
                } : {
                    start: "0% - 200vh",
                    end: "100% + 100vh"
                } : JSON.parse(i), i.event = "video-proxy-loading-area";
                let s = t.getAttribute(this.VIDEO_VIEW_AREA_KEYFRAME);
                s = null === s ? 3 === this.animSystemVersion ? {
                    start: "t - 100vh",
                    end: "b"
                } : {
                    start: "0% - 100vh",
                    end: "100%"
                } : JSON.parse(s), s.event = "video-proxy-view-area", this.keyframes.loadArea = this._scrollGroup.addKeyframe(t, i), this.keyframes.loadArea.controller.on("video-proxy-loading-area:enter", this._elementEnteredLoadingArea), this.keyframes.loadArea.controller.on("video-proxy-loading-area:exit", this._elementExitedLoadingArea), this.keyframes.viewArea = this._scrollGroup.addKeyframe(t, s), this.keyframes.viewArea.controller.on("video-proxy-view-area:enter", this._elementEnteredView), this.keyframes.viewArea.controller.on("video-proxy-view-area:exit", this._elementExitedView), this.stopLoad = (e = !0) => {
                    this.isUnloaded || (t.setAttribute("src", a), this.isUnloaded = !0, e ? (this.downloadComplete = !0, this.trigger(o.DOWNLOAD_CANCEL, this)) : this.trigger(o.DOWNLOAD_PAUSE, this))
                }, this.stop = () => {
                    this._videoPlayPromise ? this._videoPlayPromise.then(() => {
                        t.pause(), t.currentTime = 0
                    }).catch(e => {
                        this.log("error when stopping", e, t)
                    }) : t.pause()
                }, this.pause = () => {
                    r((e, i) => {
                        t.pause()
                    })
                }, this.play = () => new Promise(e => t.getAttribute("paused") ? (this.log("paused video:", t), void e(!1)) : this._shouldPreventLoadViewportSize(t) ? (e(!1), void this.log("cannot play a video in this viewport that has attribute :" + this.VIDEO_PREVENT_LOAD, t)) : void r((i, s) => {
                    r((i, s) => {
                        setTimeout(() => {
                            this._videoPlayPromise = Object.getPrototypeOf(t).play.call(t), this.trigger("playing", t), e(t), this._videoPlayPromise && this._videoPlayPromise.catch(e => {
                                this.isUnloaded && this.log("error when playing, there is no src", e, t, "this.isUnloaded:", this.isUnloaded)
                            })
                        }, 20)
                    })
                })), this.gotoAndPlay = (e = null) => new Promise(i => t.getAttribute("paused") ? (this.log("paused video:", t), void i(!1)) : this._shouldPreventLoadViewportSize(t) ? (i(!1), void this.log("cannot play a video that has attribute :" + this.VIDEO_PREVENT_LOAD, t)) : void r((s, n) => {
                    null !== e && (t.pause(), t.currentTime = e), r((e, s) => {
                        setTimeout(() => {
                            this._videoPlayPromise = Object.getPrototypeOf(t).play.call(t), this.trigger("playing", t), i(t), this._videoPlayPromise && this._videoPlayPromise.catch(e => {
                                this.isUnloaded && this.log("error when playing, there is no src", e, t, "this.isUnloaded:", this.isUnloaded)
                            })
                        }, 20)
                    })
                })), this.gotoAndStop = (e = null) => new Promise(i => t.getAttribute("paused") ? (this.log("paused video:", t), void i(!1)) : this._shouldPreventLoadViewportSize(t) ? (i(!1), void this.log("cannot play a video that has attribute :" + this.VIDEO_PREVENT_LOAD, t)) : void r((s, n) => {
                    null !== e && (t.pause(), t.currentTime = e, this.trigger("paused", t), i(t))
                })), this.startLoad = () => {
                    this._startDownloading()
                }, this.loadSrc = () => {
                    this._preventLoad ? this.log("cannot load a video that has attribute :" + this.VIDEO_PREVENT_LOAD, t) : this._videoPlayPromise ? this._videoPlayPromise.then(() => {
                        Object.getPrototypeOf(t).load.call(t)
                    }).catch(e => {
                        this.isUnloaded && this.log("error when loading the play function was interrupted", e, t, "isUnloaded", this.isUnloaded)
                    }) : Object.getPrototypeOf(t).load.call(t)
                }
            }
            _shouldPreventLoadViewportSize(t) {
                if (0 === t.offsetHeight) return this.log(" this video is not displayed, make sure it has a display attribute different than 'none' on any of its ancestors"), !0;
                let e = this.viewportEmitterMicro.viewport.toUpperCase(),
                    i = t.getAttribute(this.VIDEO_PREVENT_LOAD);
                return null !== i && ("" === i || (i = JSON.parse(i), i = i.map(t => t.toUpperCase()), null != i.find(t => e === t)))
            }
            _initVideoPromises(t) {
                this._promiseResolver = {}, this._promiseResolver.hasMetadata = null, this._promiseResolver.canBePlayedThrough = null, this._promiseResolver.downloadComplete = null;
                this.promises.hasMetadata = new Promise(t => {
                    this._promiseResolver.hasMetadata = t
                }).then(t => (this.hasMetadata = !0, this.trigger(o.HAS_METADATA, this), this.log(":::Video has metadata:::", t.className), t));
                this.promises.canBePlayedThrough = new Promise(t => {
                    this._promiseResolver.canBePlayedThrough = t
                }).then(t => (this.canBePlayedThrough = !0, this._promiseResolver.hasMetadata(t), r(() => {
                    t.classList.add("video-can-play")
                }), this.trigger(o.CAN_PLAY_THROUGH, this), this.log(":::Video Ready to play:::", t.className), t));
                this.promises.downloadComplete = new Promise(t => {
                    this._promiseResolver.downloadComplete = t
                }).then(t => (this.downloadComplete = !0, this._promiseResolver.canBePlayedThrough(t), r(() => {
                    t.classList.add("video-download-complete")
                }), this.trigger(o.DOWNLOAD_COMPLETE, this), this.log(":::Video fully Downloaded:::", t.className), t))
            }
            _elementEnteredView(t) {
                if (this.trigger(o.VIDEO_ENTER_VIEW_AREA, this), this.isInViewArea = !0, t.element.autoplay) {
                    t.element.currentTime = 0;
                    let e = t.element.play();
                    void 0 !== e && e.catch(t => {})
                }
            }
            _elementExitedView(t) {
                this.isInViewArea = !1, this.trigger(o.VIDEO_EXIT_VIEW_AREA, this)
            }
            _elementEnteredLoadingArea(t) {
                this.trigger(o.VIDEO_ENTER_LOAD_AREA, this), this.isInLoadingArea = !0, this._manualLoad || this._startDownloading()
            }
            _elementExitedLoadingArea(t) {
                this.trigger(o.VIDEO_EXIT_LOAD_AREA, this), this.isInLoadingArea = !1
            }
            _changeVideoSource(t = !1) {
                t && "false" === this.videoElement._videoSourceRetinaEnabled || (this.pause(), this.stopLoad(!1), this._getVideoSource(this.videoElement), this.loadProgress = 0, this.downloadComplete = !1, this.canBePlayedThrough = !1, this.hasMetadata = !1, this.isUnloaded = !0, this._preventLoad = this._shouldPreventLoadViewportSize(this.videoElement), r(() => {
                    this.videoElement.classList.remove("video-download-complete"), this.videoElement.classList.remove("video-can-play")
                }), this._initVideoPromises(this), !this._manualLoad && this.keyframes.loadArea.isCurrentlyInRange && this._startDownloading())
            }
            _startDownloading() {
                this._preventLoad = this._shouldPreventLoadViewportSize(this.videoElement), this._preventLoad || this.isUnloaded && (this.videoElement.setAttribute("src", this.videoSource), this.isUnloaded = !1, this.loadSrc(), this._startCheckStats())
            }
        }
    }, {
        121: 121,
        173: 173,
        226: 226,
        61: 61
    }],
    173: [function(t, e, i) {
        "use strict";
        e.exports = "data:video/mp4;base64,AAAAGGZ0eXBtcDQyAAAAAG1wNDJtcDQxAAAP/m1vb3YAAABsbXZoZAAAAADXfsFZ137BWQABX5AAAB4AAAEAAAEAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAA0YdHJhawAAAFx0a2hkAAAAAdd+wVnXfsFZAAAAAQAAAAAAAAu7AAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAQAAAAEAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAALuwAAAAAAAQAAAAAMkG1kaWEAAAAgbWRoZAAAAADXfsFZ137BWQAAdTAAAAPpFccAAAAAAEBoZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAH01haW5jb25jZXB0IFZpZGVvIE1lZGlhIEhhbmRsZXIAAAwobWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAM2hkbHIAAAAAAAAAAGFsaXMAAAAAAAAAAAAAAABBbGlhcyBEYXRhIEhhbmRsZXIAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAALtXN0YmwAAAtEc3RzZAAAAAAAAAABAAALNGF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAEAAQAEgAAABIAAAAAAAAAAEKQVZDIENvZGluZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAreYXZjQwFNQB//4QAUZ01AH5ZSvSkGBgZAAAD6QAA6mCEBCrdo6Qk1IAAAAAEGBf////////////+iTUNTVBcOfdWkmlkokmrknsrlzzwBWDdTFUUJOHTxzQSPGJMFyJEvmzMFWFMyJEvomzJESyJOUFSWBMvnuzSFPSEFSJOHyEFMBZvpzVTFyCyTMJDFTvlzJOUFSMBDFyNPEFvlzEFGyIPSJaPOUBMyTJaFvmrzEFGyWFSUJDBMyTJaFvmrzGSBNFySBUFvnukusllnuusllzOVNySFGFSFODFyGSBNFTvpzTFBSDIySBOHFvmppzSEyPQUJNJaBUJPOvmzNBYyMlyBDUJWFvlzNBYyMmyBDUJWFvlzRVBOUyQJvnpzRVBOUyQQvnqzRVBOUyQCvnszCJUySBUFyNPEFvnzCJUySBUFyCVGGFSyTJaFvmtspuunzCJUySBUFvmlllllllzNBYyCJUySBUFvmnllllllzJOUFSyTFBSDIyTIBQFvmzFOUSPQZyDPEJOHyNPEFvmzVTFyIBEBNBSEyUSBOTGPSNvlzTBSyXJEUIvmzTBSyIFJHIUvmzWJEFPyGPSNBUvnzWJEFPyGVMMySBOHFvlzOVNyVOJUTyJOyUJDLvmllmzUJNFyTDBMFvollllzWCWyCVGGFSyGVMMOFTTvmlzWCWyCVGGFSyGVMMOFTTyUSHvmllzWCWyCVGGFSyVOJUTvlzDQCySFNPWBMyEFMBZvlzCJUySBUFyTDBMFvmzDQCyTJaFyTDBMFvozNBYyGSBNFyTJaFvblilililczISEyNBJOUBJOvmzNJOyGSBNFyTJaFvblilililczISEyMPXyEFMBZvlzTNPPUIyGBDUPSvlzISEyQSFWJFXvlzVTFyEFCMPDLJOHyGJMUFSvmzEFCMPDLJOHyBMQIBDlyPGGTFUvjmzEFCMPDLJOHyCFUByPGGTFUvjmzBEBQUJWFyEFCMPDLJOHvlzWJEFPyUZQFvnzWJEFPyQVMMEPXOyGMBHvlzPWFSTDBOyBQQSPQSJBUFyGMBHvlzDPMPVSyQSJNBSJFTvrzUSBOTGFSyDIBSBDUFSJTUJDTvrzNBUSJYyDPFGGJDJFOUTvrzFYUFOEFEyTBSvmzTUSFBNyUZQFvnzGSBNFyNCTyNPEFvlzCJUyEFQUIyMVNBvtzCJUyEFQUIyDISPNBvtzDISPNByGPSNBUvnzQJDyJOJUyRQvnrzQJDyJOJUyRTvnrzWVJyQSFTFOUBUJPOvtuzXSJUFyBVyEFMJNJUFSTvmzXSJUFyTFRyFOEyDPEFvmzXSJUFyUJNFTUBNQTvmzUJNFTUBNQyPGGTFUvlzESN/////0MhkgTRclCTRQzxBb5s10iVBckyThzBckxSckBUsjgTFb5c10iVBckxUckAUskxVL5c10iVBckCQ8kAUskxVL5czDx58jQWMkDw77czDx58jQWMhkgTRcjlTb7c0CQ8j0hBUsgzlMlGUBb5c0CQ8j0hBUskEhUxTlMhjAR75cxiWBRMhkgTRckgVBb5sxkgTRcggUxRMlCTSTh75cxkgTRckAQyyTh8gUkgThxTRTlMjTxBb5c01EhQTcg0hQVCTzskEjxFQ1MiThj75c10iVBckCQ8lCTSTh8kxSb5s10iVBckxVFCTh08iThj75sxkgTRcjlTchwUE8gTDD1xRMhjAR75cw1U1DzcgiVMhjAR075c1g0xMjTxBb5s1g0xMkxTkyQiTCVGb5c0zCQxcjTxBb5s0zCQxcgUh75swskzCQxckhRhUhTgxb5cwskzCQxckGUgTSRL5cwwsjxhkxVL5sw0sjxhkxVL5szRck1QkBTMjTxBb58zRclxSRyFBRMkMjTxBb5szRclxSRyFBRMgsjTxBb5cxTgQjBchgU1MiTlEgchBQyUyTzk75sxTgQjBchgU1MiTlBUshBQyUyTzk75s0CQ8gUsmL45s0CQ8gUsmb45swwTA8kVQTCVGb5cw0Fcj0FL5czlTclCEhQRE75czCVhcjTxBb5cwlRhhUiTh76MzSTskVQTlL5czQWMkVQTlL6pszQWMkzCQxckyWhb5cxTgzxCTh8glRhhUiTh75czD18hBTAWb5cwSUsjTxBb5cxBVAQyMlCEhQRL5swzzk1EgSThRMiTlEgckEhRL5cwSUsk0DCVMhkhUVRTg2b5cwSUskUMjxhkxVL5czSTsiREsiTlBUlgTL5swRAUFCVhcgshkgTRU75syREshkhUVRTg2b5sxiRTBMj0hBUr5cxiWBRMickD0yVCTzr5cyUzzAVBRMhz0E75cyCRUgUskMhkgTRU75cxgU1MjVTFCckhRsjRb5sxgU1Mk1QsgjDwy8jRb5swTDD18j1VMjxskCQ8jVk75swzzk1EgSThRMkhRsjCU1L5cxTgQjBciTlEgcgiR75sxTgQjBciTlEgcrWLb5cxTgQjBciTlEgcqWKb5sxTgQjBciTlEgckAzb5cxTgQjBciTlBUsgiR75sxTgQjBciTlBUsrWLb5cxTgQjBciTlBUsqWKb5sxTgQjBciTlBUskAzb5cxgU1MkhMj0FCTSWgVCTzr5s0VQTlMjTxBb58x0gSTsjTxBb5cx0gSTsj0FMk1EhTh1CL5cwRAUFCVhckVQTlMk1EhTh1CL25YpYpYpYpYpYpYpXMxBTjyUxck1EhTh1CMmb5cxBTjyUxck1EAAAAAIU4dQjIO+XMIwEMvI49I3IwVYUy+XNBUxMXJIURUNQk86+XMFVjIY9I0FTIkQO+ObMIlTIQVBQjIFVi+3MExAgHIk4NLIYwEe+XMExAgHI9AFFUXJYExUW+XMExAgHJRIE5NAFIU5TJYExUW+XNMVHJMMEwk4fI0FRIljJBIVMU5TIYwEe+XNMVHJMMEwk4fIwlNTJBIVMU5TIYwEe9uWKWKWKWKWKWKWKVzMk5RIHJnKlinJMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMk5RIHIMLKlinJMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMk5RIHINLKlinJMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMk5QVLJnKlinJMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMk5QVLIMLKlinJMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMk5QVLINLKlinJMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMk5RIHJnK1i3JMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMk5QVLJnK1i3JMMEwk4fIwlNTCavG9uWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKWKVzMQVYkMXIkRi+XMk5BVTIY9I0FS+XM5U3JAFIEwwUzJAkNO+XP+AAAAAGHN0dHMAAAAAAAAAAQAAAAEAAAPpAAAADXNkdHAAAAAAAAAAABxzdHNjAAAAAAAAAAEAAAABAAAAAQAAAAEAAAAUc3RzegAAAAAAAAAZAAAAAQAAABRzdGNvAAAAAAAAAAEAADfuAAACMnRyYWsAAABcdGtoZAAAAAHXfsFZ137BWQAAAAIAAAAAAAALuwAAAAAAAAAAAAAAAAEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAC7sAAAAAAAEAAAAAAaptZGlhAAAAIG1kaGQAAAAA137BWdd+wVkAALuAAAAQABXHAAAAAABEaGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAACNNYWluY29uY2VwdCBNUDQgU291bmQgTWVkaWEgSGFuZGxlcgAAAT5taW5mAAAAEHNtaGQAAAAAAAAAAAAAADNoZGxyAAAAAAAAAABhbGlzAAAAAAAAAAAAAAAAQWxpYXMgRGF0YSBIYW5kbGVyAAAAACRkaW5mAAAAHGRyZWYAAAAAAAAAAQAAAAx1cmwgAAAAAQAAAM9zdGJsAAAAW3N0c2QAAAAAAAAAAQAAAEttcDRhAAAAAAAAAAEAAAAAAAAAAAACABAAAAAAu4AAAAAAACdlc2RzAAAAAAMZAAAQBBFAFQAGAAAE2LkABNf9BQIRkAYBAgAAABhzdHRzAAAAAAAAAAEAAAAEAAAEAAAAABxzdHNjAAAAAAAAAAEAAAABAAAABAAAAAEAAAAkc3RzegAAAAAAAAAAAAAABAAAA08AAANOAAADTgAAA08AAAAUc3RjbwAAAAAAAAABAAA4BwAAAEB1ZHRhAAAAF6lUSU0ACwAAMDA7MDA7MDA7MDAAAAARqVRTQwAFAAAzMDAwMAAAABCpVFNaAAQAADEwMDEAABs+dXVpZL56z8uXqULonHGZlJHjr6w8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczp4bXBETT0iaHR0cDovL25zLmFkb2JlLmNvbS94bXAvMS4wL0R5bmFtaWNNZWRpYS8iCiAgICB4bWxuczpzdERpbT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL0RpbWVuc2lvbnMjIgogICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIgogICAgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtcDpDcmVhdGVEYXRlPSIyMDE4LTA3LTI1VDE3OjA3OjUzLTA3OjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAxOC0wNy0yNVQxNzowNzo1My0wNzowMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOC0wNy0yNVQxNzowNzo1My0wNzowMCIKICAgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBBZnRlciBFZmZlY3RzIENDIDIwMTcgKE1hY2ludG9zaCkiCiAgIHhtcERNOnZpZGVvRnJhbWVSYXRlPSIyOS45NzAwMzAiCiAgIHhtcERNOnZpZGVvRmllbGRPcmRlcj0iUHJvZ3Jlc3NpdmUiCiAgIHhtcERNOnZpZGVvUGl4ZWxBc3BlY3RSYXRpbz0iMS8xIgogICB4bXBETTphdWRpb1NhbXBsZVJhdGU9IjQ4MDAwIgogICB4bXBETTphdWRpb1NhbXBsZVR5cGU9IjE2SW50IgogICB4bXBETTphdWRpb0NoYW5uZWxUeXBlPSJTdGVyZW8iCiAgIHhtcERNOnN0YXJ0VGltZVNjYWxlPSIzMDAwMCIKICAgeG1wRE06c3RhcnRUaW1lU2FtcGxlU2l6ZT0iMTAwMSIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmNzkwNDVlMi1lMTY1LTRjZGMtYWUyYS00NTM3ZjZjNGRlMjIiCiAgIHhtcE1NOkRvY3VtZW50SUQ9ImEyMGM2NTBkLTBlYjEtYjcxOC1kNmUwLTRlNjUwMDAwMDAzYiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjI3ZTQ2NWVjLWNjMzctNDk1My1hNDI4LTVkNTYxYTdlOGY4MCIKICAgZGM6Zm9ybWF0PSJILjI2NCI+CiAgIDx4bXBETTpkdXJhdGlvbgogICAgeG1wRE06dmFsdWU9Ijc2ODAiCiAgICB4bXBETTpzY2FsZT0iMS85MDAwMCIvPgogICA8eG1wRE06dmlkZW9GcmFtZVNpemUKICAgIHN0RGltOnc9IjE2IgogICAgc3REaW06aD0iMTYiCiAgICBzdERpbTp1bml0PSJwaXhlbCIvPgogICA8eG1wRE06c3RhcnRUaW1lY29kZQogICAgeG1wRE06dGltZUZvcm1hdD0iMjk5N0Ryb3BUaW1lY29kZSIKICAgIHhtcERNOnRpbWVWYWx1ZT0iMDA7MDA7MDA7MDAiLz4KICAgPHhtcERNOmFsdFRpbWVjb2RlCiAgICB4bXBETTp0aW1lVmFsdWU9IjAwOzAwOzAwOzAwIgogICAgeG1wRE06dGltZUZvcm1hdD0iMjk5N0Ryb3BUaW1lY29kZSIvPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0iNjU0YzBhZTQtY2I1My0yZjUxLWIyNzgtYWU5NzAwMDAwMDY4IgogICAgICBzdEV2dDp3aGVuPSIyMDE4LTA3LTI1VDE3OjA3OjUzLTA3OjAwIgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBBZG9iZSBNZWRpYSBFbmNvZGVyIENDIDIwMTcuMSAoTWFjaW50b3NoKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmYyMDhiNDYzLWYzMWYtNDk3Zi1iNDJjLWZhNWI2ZjEwY2VhZiIKICAgICAgc3RFdnQ6d2hlbj0iMjAxOC0wNy0yNVQxNzowNTowNy0wNzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQWZ0ZXIgRWZmZWN0cyBDQyAyMDE3IChNYWNpbnRvc2gpIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmMwYWU4MmU0LTdmNmMtNDE0OS04YjEyLTgzMjIwYWU3MzkyNyIKICAgICAgc3RFdnQ6d2hlbj0iMjAxOC0wNy0yNVQxNzowNjowMy0wNzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQWZ0ZXIgRWZmZWN0cyBDQyAyMDE3IChNYWNpbnRvc2gpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvY29udGVudCIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2ZTIwMjNlNC1jY2JjLTQxN2EtODMyMC05YWIwNzMzY2ZlYWUiCiAgICAgIHN0RXZ0OndoZW49IjIwMTgtMDctMjVUMTc6MDY6MDMtMDc6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIEFmdGVyIEVmZmVjdHMgQ0MgMjAxNyAoTWFjaW50b3NoKSIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIvPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDplNWUyYWRlNC1jNzk2LTQ5ZWMtOWVkOS05Y2Y0Yzg3NWEzNzQiCiAgICAgIHN0RXZ0OndoZW49IjIwMTgtMDctMjVUMTc6MDc6NTMtMDc6MDAiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIEFkb2JlIE1lZGlhIEVuY29kZXIgQ0MgMjAxNy4xIChNYWNpbnRvc2gpIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIi8+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmY3OTA0NWUyLWUxNjUtNGNkYy1hZTJhLTQ1MzdmNmM0ZGUyMiIKICAgICAgc3RFdnQ6d2hlbj0iMjAxOC0wNy0yNVQxNzowNzo1My0wNzowMCIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgQWRvYmUgTWVkaWEgRW5jb2RlciBDQyAyMDE3LjEgKE1hY2ludG9zaCkiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii9tZXRhZGF0YSIvPgogICAgPC9yZGY6U2VxPgogICA8L3htcE1NOkhpc3Rvcnk+CiAgIDx4bXBNTTpEZXJpdmVkRnJvbQogICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzhlMGNhYy04YzI0LTQ3OWItYTA2Mi0xZmU4MzgxZmM0NDciCiAgICBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM3OGUwY2FjLThjMjQtNDc5Yi1hMDYyLTFmZTgzODFmYzQ0NyIKICAgIHN0UmVmOm9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmMjA4YjQ2My1mMzFmLTQ5N2YtYjQyYy1mYTViNmYxMGNlYWYiLz4KICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgPHJkZjpCYWc+CiAgICAgPHJkZjpsaQogICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZjZTE1MDM0LWQ2MTAtNGI2NS1hMzI0LTMwMWJjYWVlNTc2MyIKICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ4MDA4ZjI0MDAwMCIKICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkODAwOGYyNDAwMDAiCiAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICA8L3JkZjpCYWc+CiAgIDwveG1wTU06SW5ncmVkaWVudHM+CiAgIDx4bXBNTTpQYW50cnk+CiAgICA8cmRmOkJhZz4KICAgICA8cmRmOmxpPgogICAgICA8cmRmOkRlc2NyaXB0aW9uCiAgICAgICBkYzpmb3JtYXQ9ImFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5hZnRlcmVmZmVjdHMuY29tcCIKICAgICAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NmNlMTUwMzQtZDYxMC00YjY1LWEzMjQtMzAxYmNhZWU1NzYzIj4KICAgICAgPGRjOnRpdGxlPgogICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5Db21wIDE8L3JkZjpsaT4KICAgICAgIDwvcmRmOkFsdD4KICAgICAgPC9kYzp0aXRsZT4KICAgICAgPHhtcE1NOkluZ3JlZGllbnRzPgogICAgICAgPHJkZjpCYWc+CiAgICAgICAgPHJkZjpsaQogICAgICAgICBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOmMzOWMzZjE4LWUwNzUtNDI5Zi1hYzNkLTFmYThhMGVlOTI5YyIKICAgICAgICAgc3RSZWY6ZnJvbVBhcnQ9InRpbWU6MGQ4MDA4ZjI0MDAwMCIKICAgICAgICAgc3RSZWY6dG9QYXJ0PSJ0aW1lOjBkODAwOGYyNDAwMDAiCiAgICAgICAgIHN0UmVmOm1hc2tNYXJrZXJzPSJOb25lIi8+CiAgICAgICA8L3JkZjpCYWc+CiAgICAgIDwveG1wTU06SW5ncmVkaWVudHM+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgIDwvcmRmOmxpPgogICAgIDxyZGY6bGk+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24KICAgICAgIGRjOmZvcm1hdD0iYXBwbGljYXRpb24vdm5kLmFkb2JlLmFmdGVyZWZmZWN0cy5sYXllciIKICAgICAgIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6YzM5YzNmMTgtZTA3NS00MjlmLWFjM2QtMWZhOGEwZWU5MjljIj4KICAgICAgPGRjOnRpdGxlPgogICAgICAgPHJkZjpBbHQ+CiAgICAgICAgPHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5XaGl0ZSBTb2xpZCAxPC9yZGY6bGk+CiAgICAgICA8L3JkZjpBbHQ+CiAgICAgIDwvZGM6dGl0bGU+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICAgIDwvcmRmOmxpPgogICAgPC9yZGY6QmFnPgogICA8L3htcE1NOlBhbnRyeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgAADIpmcmVlAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFtZGF0AAAAAAAADWMAAAAVZYiAQABPb/73gb8yy1cB6AAAAAEKIRAFAKAb/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN/+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADeGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB/yEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3hYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB7yEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3hYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB+yEQBQCgG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADf/gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3hgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdM="
    }, {}],
    174: [function(t, e, i) {
        "use strict";
        const s = t(226),
            n = t(172);
        var r = null,
            A = [];

        function o(t, e = {}) {
            e.viewportEmitterMicro = function(t) {
                const e = [{
                    name: "small",
                    mediaQuery: "only screen and (max-width: 735px)"
                }, {
                    name: "medium",
                    mediaQuery: "only screen and (min-width: 736px) and (max-width: 1068px)"
                }, {
                    name: "large",
                    mediaQuery: "only screen and (min-width: 1069px)"
                }];
                let i, n = !!t.breakpoints,
                    A = t.breakpoints;
                return n ? i = new s({
                    breakpoints: A
                }) : (r || (r = new s({
                    breakpoints: e
                })), i = r), i
            }(e);
            let i = new n(t, e);
            return A.push(i), i
        }
        class a {
            constructor() {
                throw "InlineVideoProxyHub: cannot be instantiated, use 'InlineVideoProxyHub.load'"
            }
            static newVideoProxy(t, e = {}) {
                return Object.assign(e, {
                    EVENTS: a.EVENTS
                }), o(t, e)
            }
        }
        a.videoInstances = A, a.EVENTS = {}, a.EVENTS.HAS_METADATA = "hasmetadataevent", a.EVENTS.DOWNLOAD_COMPLETE = "downloadCompleteEvent", a.EVENTS.CAN_PLAY_THROUGH = "canplaythroughevent", a.EVENTS.DOWNLOAD_PAUSE = "downloadPauseEvent", a.EVENTS.DOWNLOAD_CANCEL = "downloadCanceledEvent", a.EVENTS.VIDEO_ENTER_VIEW_AREA = "videoEnterViewArea", a.EVENTS.VIDEO_ENTER_LOAD_AREA = "videoEnterLoadArea", a.EVENTS.VIDEO_EXIT_VIEW_AREA = "videoExitViewArea", a.EVENTS.VIDEO_EXIT_LOAD_AREA = "videoExitLoadArea", e.exports = a
    }, {
        172: 172,
        226: 226
    }],
    175: [function(t, e, i) {
        "use strict";
        const s = t(62),
            n = t(177),
            r = t(182),
            A = t(180),
            o = t(185),
            a = t(192),
            h = t(179),
            l = t(183),
            c = t(188),
            u = ["beforeCreate", "created", "beforeMount", "createItems", "itemsCreated", "mounted", "animateToItem", "onItemChangeInitiated", "onItemChangeOccurred", "onItemChangeCompleted", "onResizeImmediate", "onBreakpointChange", "onResizeDebounced", "destroy"];
        class d extends s {
            constructor(t) {
                super(t), this.el = t.el, this.model = Object.assign({
                    options: t
                }, JSON.parse(JSON.stringify(n))), this.model.Item.ConstructorFunction = n.Item.ConstructorFunction, this._items = [], this.currentIndex = 0, u.forEach(t => {
                    this[t] = (...e) => {
                        this["__".concat(t)] && this["__".concat(t)].forEach(t => t.apply(this, e))
                    }
                });
                const e = this.destroy;
                this.destroy = (...t) => {
                    e.apply(this, t), s.prototype.destroy.call(this)
                }, this.on(n.Events.ITEM_CHANGE_INITIATED, this.onItemChangeInitiated), this.on(n.Events.ITEM_CHANGE_OCCURRED, this.onItemChangeOccurred), this.on(n.Events.ITEM_CHANGE_COMPLETED, this.onItemChangeCompleted), ["beforeCreate", "created", "beforeMount", "createItems"].forEach(e => this[e](t))
            }
        }
        d.withMixins = (...t) => {
            const e = class extends d {},
                i = e.prototype;
            return t.unshift(r, a, o), t.push(h, c, A, l), t.forEach(t => {
                for (const e in t) u.includes(e) ? (i["__".concat(e)] = i["__".concat(e)] || [], i["__".concat(e)].push(t[e])) : i[e] = t[e]
            }), e
        }, e.exports = d
    }, {
        177: 177,
        179: 179,
        180: 180,
        182: 182,
        183: 183,
        185: 185,
        188: 188,
        192: 192,
        62: 62
    }],
    176: [function(t, e, i) {
        "use strict";
        const s = t(61).EventEmitterMicro,
            n = {};
        "undefined" != typeof window && (n.draw = t(117), n.cancelDraw = t(115));
        e.exports = class extends s {
            constructor(t) {
                super(), this._x = 0, this._y = 0, this._opacity = 0, this._width = 0, this._height = 0, this._zIndex = 0, this.index = t.index, this.el = t.el, this.applyDraw = this.applyDraw.bind(this), this.measure()
            }
            measure() {
                const t = getComputedStyle(this.el);
                this._width = this.el.clientWidth, this._height = this.el.clientHeight, this._zIndex = parseInt(t.getPropertyValue("z-index")), this._opacity = parseFloat(t.getPropertyValue("opacity"))
            }
            select() {
                this.el.classList.add("current"), this.trigger("select", this)
            }
            deselect() {
                this.el.classList.remove("current"), this.trigger("deselect", this)
            }
            progress(t) {}
            needsRedraw() {
                n.cancelDraw(this._rafID), this._rafID = n.draw(this.applyDraw, !0)
            }
            applyDraw() {
                this.el.style.zIndex = this._zIndex, this.el.style.opacity = this._opacity, this.el.style.transform = "translate(".concat(this._x, "px, ").concat(this._y, "px)")
            }
            get id() {
                return this.el.id
            }
            get height() {
                return this._height
            }
            set height(t) {
                this._height = t, this.needsRedraw()
            }
            get width() {
                return this._width
            }
            set width(t) {
                this._width = t, this.needsRedraw()
            }
            get x() {
                return this._x
            }
            set x(t) {
                this._x = t, this.needsRedraw()
            }
            get y() {
                return this._y
            }
            set y(t) {
                this._y = t, this.needsRedraw()
            }
            get opacity() {
                return this._opacity
            }
            set opacity(t) {
                this._opacity = t, this.needsRedraw()
            }
            get zIndex() {
                return this._zIndex
            }
            set zIndex(t) {
                this._zIndex = t, this.needsRedraw()
            }
        }
    }, {
        115: 115,
        117: 117,
        61: 61
    }],
    177: [function(t, e, i) {
        "use strict";
        e.exports = {
            PrefersReducedMotion: !1,
            IsRTL: !1,
            IsTouch: !1,
            Slide: {
                Selector: ".item-container",
                duration: 1
            },
            Fade: {
                duration: .5
            },
            Item: {
                Selector: ".item-container .gallery-item",
                ConstructorFunction: t(176)
            },
            DotNav: {
                Selector: ".dotnav"
            },
            PaddleNav: {
                Selector: ".paddlenav"
            },
            ChapterPlayer: {
                defaultEase: t => t
            },
            FadeCaptionOnChange: {
                ItemSelector: ".captions-gallery [data-captions-gallery-item]"
            },
            TabNav: {
                ItemSelector: ".tablist-wrapper li",
                RoamingTabIndexSelector: "a"
            },
            SwipeDrag: {
                DesktopSwipe: !1,
                movementRateMultiplier: 1.5,
                velocityMultiplier: 8
            },
            Events: {
                ITEM_CHANGE_INITIATED: "ITEM_CHANGE_INITIATED",
                ITEM_CHANGE_OCCURRED: "ITEM_CHANGE_OCCURRED",
                ITEM_CHANGE_COMPLETED: "ITEM_CHANGE_COMPLETED"
            }
        }
    }, {
        176: 176
    }],
    178: [function(t, e, i) {
        "use strict";
        let s;
        try {
            s = t("@marcom/ac-analytics").observer.Gallery
        } catch (t) {}
        e.exports = {
            created(t) {
                this.analytics = {
                    lastTrackedItem: null,
                    observer: null,
                    events: {
                        UPDATE: "update",
                        UPDATE_COMPLETE: "update:complete"
                    }
                }
            },
            mounted() {
                if (s) {
                    let t = this.el.getAttribute("id");
                    t || (console.warn("No ID attribute found on the Mixin Gallery element - please add an ID", this), t = "null"), this.analytics.observer = new s(this, {
                        galleryName: t,
                        beforeUpdateEvent: this.analytics.events.UPDATE,
                        afterUpdateEvent: this.analytics.events.UPDATE_COMPLETE,
                        trackAutoRotate: !0
                    })
                }
            },
            onItemChangeCompleted(t) {
                if (!t.previous || t.current === this.analytics.lastTrackedItem || t.current === t.previous && !this.analytics.lastTrackedItem) return;
                this.analytics.lastTrackedItem = t.current;
                let e = {
                    incoming: {
                        id: t.current.id
                    },
                    outgoing: {
                        id: t.previous.id
                    },
                    interactionEvent: this.lastInteractionEvent
                };
                this.trigger(this.analytics.events.UPDATE_COMPLETE, e)
            }
        }
    }, {
        undefined: void 0
    }],
    179: [function(t, e, i) {
        "use strict";
        e.exports = {
            createItems(t) {
                if (this._items.length) this.itemsCreated();
                else {
                    if (!this.model.Item.ConstructorFunction) throw new ReferenceError("MixinGallery::AutoCreateItems - this.model.Item.ConstructorFunction is null");
                    if (0 === this._items.length) {
                        this._items = [], Array.from(this.el.querySelectorAll(this.model.Item.Selector)).forEach((t, e) => {
                            const i = new this.model.Item.ConstructorFunction({
                                el: t,
                                index: e
                            });
                            this._items.push(i)
                        });
                        let t = this._items[this._items.length - 1];
                        for (let e = 0; e < this._items.length; e++) {
                            const i = this._items[e];
                            i.prev = t, i.next = this._items[e + 1], t = i
                        }
                        t.next = this._items[0]
                    }
                    this.itemsCreated()
                }
            }
        }
    }, {}],
    180: [function(t, e, i) {
        "use strict";
        e.exports = {
            itemsCreated(t) {
                this.model.options.gum || this._isVue || (this.anim.on("ON_RESIZE_IMMEDIATE", this.onResizeImmediate), this.anim.on("ON_RESIZE_DEBOUNCED", this.onResizeDebounced), this.anim.on("ON_BREAKPOINT_CHANGE", this.onBreakpointChange), requestAnimationFrame(this.mounted))
            },
            destroy() {
                this.model.options.gum || this._isVue || (this.anim.off("ON_RESIZE_IMMEDIATE", this.onResizeImmediate), this.anim.off("ON_RESIZE_DEBOUNCED", this.onResizeDebounced), this.anim.off("ON_BREAKPOINT_CHANGE", this.onBreakpointChange))
            }
        }
    }, {}],
    181: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                this.clampedIndex = !0
            },
            wrappedIndex(t) {
                return Math.max(0, Math.min(t, this._items.length - 1))
            }
        }
    }, {}],
    182: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    currentItem: {
                        configurable: !0,
                        get: () => this._items[this.wrappedIndex(this.currentIndex)]
                    }
                })
            },
            wrappedIndex(t) {
                return (t %= this._items.length) < 0 ? this._items.length + t : t
            },
            getItemForTrigger(t) {
                return this._items.find(e => e.id === t)
            }
        }
    }, {}],
    183: [function(t, e, i) {
        "use strict";
        e.exports = {
            mounted() {
                const t = this._items[this.wrappedIndex(this.currentIndex)];
                this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                    gallery: this,
                    next: t
                }), this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: t
                }), this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                    gallery: this,
                    current: t
                })
            }
        }
    }, {}],
    184: [function(t, e, i) {
        "use strict";
        const s = ["INPUT", "SELECT", "TEXTAREA"];
        e.exports = {
            created(t) {
                this.onKeyDown = this.onKeyDown.bind(this), this.inViewKeyframe = this.addDiscreteEvent({
                    event: "Gallery: In View",
                    start: "t - 100vh",
                    end: "b + 100%",
                    onEnter: () => window.addEventListener("keydown", this.onKeyDown),
                    onExit: () => window.removeEventListener("keydown", this.onKeyDown)
                }), Object.defineProperty(this, "isInView", {
                    configurable: !0,
                    get: () => null != this.inViewKeyframe && this.inViewKeyframe.isCurrentlyInRange
                })
            },
            destroy() {
                this.inViewKeyframe.remove(), this.inViewKeyframe = null, window.removeEventListener("keydown", this.onKeyDown)
            },
            onKeyDown(t) {
                if (this.isInView && !this.inputHasFocus() && (37 === t.keyCode || 39 === t.keyCode)) {
                    let e = this.model.IsRTL ? -1 : 1,
                        i = 37 === t.keyCode ? -1 : 1;
                    this.lastInteractionEvent = t;
                    const s = this.currentIndex + i * e;
                    this.animateToItem(s)
                }
            },
            inputHasFocus: function() {
                return -1 !== s.indexOf(document.activeElement.nodeName)
            }
        }
    }, {}],
    185: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                document.body._animInfo && (this.anim = document.body._animInfo.group.anim, this.model.pageMetrics = this.anim.model.pageMetrics)
            },
            addKeyframe(t) {
                const e = t.el || this.el;
                return (t.group || this.anim).addKeyframe(e, t)
            },
            addDiscreteEvent(t) {
                t.event = t.event || "Generic-Event-Name-" + tmpUUID++;
                let e = void 0 !== t.end && t.end !== t.start;
                const i = this.addKeyframe(t);
                return e ? (t.onEnterOnce && i.controller.once(t.event + ":enter", t.onEnterOnce), t.onExitOnce && i.controller.once(t.event + ":exit", t.onExitOnce), t.onEnter && i.controller.on(t.event + ":enter", t.onEnter), t.onExit && i.controller.on(t.event + ":exit", t.onExit)) : (t.onEventOnce && i.controller.once(t.event, t.onEventOnce), t.onEventReverseOnce && i.controller.once(t.event + ":reverse", t.onEventReverseOnce), t.onEvent && i.controller.on(t.event, t.onEvent), t.onEventReverse && i.controller.on(t.event + ":reverse", t.onEventReverse)), i
            },
            addRAFLoop(t) {
                let e = ["start", "end"];
                if (!e.every(e => t.hasOwnProperty(e))) return void console.log("BubbleGum.BaseComponent::addRAFLoop required options are missing: " + e.join(" "));
                const i = new RAFEmitter.create;
                i.on("update", t.onUpdate || noop), i.on("draw", t.onDraw || noop), i.on("draw", () => i.run());
                const {
                    onEnter: s,
                    onExit: n
                } = t;
                return t.onEnter = () => {
                    i.run(), s && s()
                }, t.onExit = () => {
                    i.cancel(), n && n()
                }, this.addDiscreteEvent(t)
            },
            addContinuousEvent(t) {
                t.onDraw || console.log("BubbleGum.BaseComponent::addContinuousEvent required option `onDraw` is missing. Consider using a regular keyframe if you do not need a callback"), t.event = t.event || "Generic-Event-Name-" + tmpUUID++;
                let e = this.addKeyframe(t);
                return e.controller.on(t.event, t.onDraw), e
            }
        }
    }, {}],
    186: [function(t, e, i) {
        "use strict";
        const s = (t, e) => {
            e ? t.removeAttribute("disabled") : t.setAttribute("disabled", "true")
        };
        e.exports = {
            mounted() {
                const t = this.el.querySelector(this.model.PaddleNav.Selector);
                this.paddleNav = {
                    previousEl: t.querySelector(".paddlenav-arrow-previous"),
                    nextEl: t.querySelector(".paddlenav-arrow-next")
                }, this.onPaddleNavSelected = this.onPaddleNavSelected.bind(this), [this.paddleNav.previousEl, this.paddleNav.nextEl].forEach(t => {
                    t.addEventListener("click", this.onPaddleNavSelected)
                })
            },
            destroy() {
                [this.paddleNav.previousEl, this.paddleNav.nextEl].forEach(t => {
                    t.removeEventListener("click", this.onPaddleNavSelected)
                }), this.paddleNav = null
            },
            onPaddleNavSelected(t) {
                let e = t.target.className.includes("previous") ? -1 : 1;
                this.lastInteractionEvent = t;
                const i = this.currentIndex + 1 * e;
                this.animateToItem(i)
            },
            onItemChangeCompleted(t) {
                const e = this.wrappedIndex(this.currentIndex + 1) !== this.currentIndex;
                s(this.paddleNav.nextEl, e);
                const i = this.wrappedIndex(this.currentIndex + -1) !== this.currentIndex;
                s(this.paddleNav.previousEl, i)
            }
        }
    }, {}],
    187: [function(t, e, i) {
        "use strict";
        e.exports = {
            onItemChangeOccurred(t) {
                const {
                    previous: e,
                    current: i
                } = this.selections.occurred;
                e && e !== i && e.deselect(), i.select()
            }
        }
    }, {}],
    188: [function(t, e, i) {
        "use strict";
        const s = t(8),
            n = t(13);
        e.exports = {
            itemsCreated(t) {
                this._items.forEach((t, e) => {
                    e === this.wrappedIndex(this.currentIndex) ? n(t.el) : s(t.el)
                })
            },
            onItemChangeCompleted(t) {
                const {
                    previous: e,
                    current: i
                } = this.selections.completed;
                e && e !== i && s(e.el), n(i.el)
            }
        }
    }, {
        13: 13,
        8: 8
    }],
    189: [function(t, e, i) {
        "use strict";
        const s = t(165),
            n = t(147),
            r = t(121),
            A = t(117),
            o = t(115),
            a = t(116);
        e.exports = {
            beforeCreate() {
                Object.defineProperties(this, {
                    widthOfItem: {
                        configurable: !0,
                        get: () => this._items[0].width
                    }
                })
            },
            created(t) {
                this.position = 0, this.target = 0, this.slideContainer = this.el.querySelector(this.model.Slide.Selector), this.sign = this.model.IsRTL ? -1 : 1, this.mountUpdateId = 0, this.mountDrawId = 0
            },
            mounted() {
                this.mountUpdateId = r(() => {
                    this._items.forEach(t => {
                        t.measure(), t.x = t.width * t.index * this.sign
                    }), this.mountDrawId = A(() => {
                        this.mountDrawId = null, this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.wrappedIndex(this.currentIndex)), this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)"), this.checkForSlideUpdate(!0)
                    })
                })
            },
            animateToItem(t) {
                const e = this.wrappedIndex(t);
                if (this.currentIndex === e) return;
                this.el.parentElement.scrollLeft = 0;
                let i = "cubic-bezier(0.645, 0.045, 0.355, 1)";
                this.clip && this.clip._isPlaying && (this.clip.destroy(), i = "cubic-bezier(0.23, 1, 0.32, 1)");
                const r = this.target,
                    A = this.convertSlideIndexToHorizontalPosition(t),
                    o = this.model.PrefersReducedMotion ? .001 : this.model.Slide.duration,
                    a = this._items[this.wrappedIndex(t)];
                this.clip = new s(o, {
                    ease: n.fromCSSString(i),
                    prepare: () => this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                        gallery: this,
                        next: a
                    }),
                    update: t => {
                        t = Math.min(1, Math.max(t, 0)), this.target = r + (A - r) * t
                    },
                    draw: () => this.draw(1),
                    finish: () => this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                        gallery: this,
                        current: a
                    })
                }), this.slideContainer.style.transition = "transform ".concat(o, "s ").concat(i), this.slideContainer.style.transform = "translate3d(".concat(-A, "px, 0,0)"), this.clip.play().then(() => {
                    this.clip.destroy(), this.clip = null
                })
            },
            draw(t = 1) {
                let e = this.target - this.position;
                this.position += e * t;
                const i = Math.abs(this.position - this.target);
                i < .1 && (this.position = this.target), this.checkForSlideUpdate(), 1 !== t && (this.slideContainer.style.transition = "transform 0.1s cubic-bezier(0.23, 1, 0.32, 1)", this.slideContainer.style.transform = "translate(".concat(-this.position, "px, 0)"), Math.abs(i) > 0 && (o(this.dragDrawId), A(() => this.draw(t)))), this._items.forEach(t => {
                    let e = (this.position - t.x) / this.widthOfItem;
                    t._progress = e, t.progress(e)
                })
            },
            checkForSlideUpdate(t) {
                let e = Math.floor((this.position * this.sign + .5 * this.widthOfItem) / this.widthOfItem);
                isNaN(e) || (e !== this.currentIndex || t) && (this.currentIndex = e, this.wrapSlideItems(), this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                    gallery: this,
                    current: this.currentItem
                }))
            },
            wrapSlideItems() {
                this.clampedIndex || (this.currentItem.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex), this.currentItem.prev.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex - 1), this.currentItem.next.x = this.convertSlideIndexToHorizontalPosition(this.currentIndex + 1))
            },
            onResizeImmediate() {
                this.clip && (this.clip.destroy(), this.clip = null), this._items.forEach(t => {
                    t.measure(), t.x = t.width * t.index * this.sign
                }), this.currentIndex = this.wrappedIndex(this.currentItem.index), this.wrapSlideItems(), this.position = this.target = this.convertSlideIndexToHorizontalPosition(this.currentIndex), this.slideContainer.style.transition = "none", A(() => {
                    this.slideContainer.style.transform = "translate3d(".concat(-this.position, "px, 0,0)")
                })
            },
            convertSlideIndexToHorizontalPosition(t) {
                return t * this.widthOfItem * this.sign
            },
            destroy() {
                this.mountUpdateId && a(this.mountUpdateId), this.mountDrawId && o(this.mountDrawId), this.clip && (this.clip.destroy(), this.clip = null), this._items.forEach(t => {
                    t.measure(), t.x = 0, t.zIndex = t === this.currentItem ? 2 : 0
                }), this.slideContainer.removeAttribute("style")
            }
        }
    }, {
        115: 115,
        116: 116,
        117: 117,
        121: 121,
        147: 147,
        165: 165
    }],
    190: [function(t, e, i) {
        "use strict";
        const s = t(117),
            n = t(115);
        e.exports = {
            created(t) {
                this.swipeDrag = {
                    movementRateMultiplier: this.model.SwipeDrag.movementRateMultiplier,
                    velocityMultiplier: this.model.SwipeDrag.velocityMultiplier,
                    dragDrawId: -1,
                    waitingToReachTargetDrawId: -1,
                    inputStart: {
                        x: 0,
                        y: 0
                    },
                    swipeVelocity: 0,
                    isDragging: !1
                }, this._onStartDrag = this._onStartDrag.bind(this), this._onDrag = this._onDrag.bind(this), this._onStopDrag = this._onStopDrag.bind(this), this.waitingToReachTarget = this.waitingToReachTarget.bind(this)
            },
            mounted() {
                this.inputMoveEventName = this.model.IsTouch ? "touchmove" : "mousemove", this.inputUpEventName = this.model.IsTouch ? "touchend" : "mouseup", this.inputDownEvent = this.model.IsTouch ? "touchstart" : "mousedown", (this.model.IsTouch || this.model.SwipeDrag.DesktopSwipe) && (this.el.removeEventListener(this.inputDownEvent, this._onStartDrag), this.el.addEventListener(this.inputDownEvent, this._onStartDrag))
            },
            _onStartDrag(t) {
                n(this.swipeDrag.dragDrawId), n(this.swipeDrag.waitingToReachTargetDrawId);
                const e = t.target || t.relatedTarget;
                switch (!0) {
                    case "A" === e.tagName:
                    case "BUTTON" === e.tagName:
                    case !t.touches && 1 !== t.which:
                        return
                }
                this.clip && this.clip.destroy(), this.lastInteractionEvent = t, this.swipeDrag.swipeVelocity = 0, this.swipeDrag.isDragging = !1;
                const i = this.model.IsTouch ? t.touches[0] : t;
                let {
                    screenX: s,
                    screenY: r
                } = i;
                this.swipeDrag.inputStart = {
                    x: s,
                    y: r
                }, window.addEventListener(this.inputMoveEventName, this._onDrag, {
                    passive: !1
                }), window.addEventListener(this.inputUpEventName, this._onStopDrag)
            },
            _onDrag(t) {
                this.swipeDrag.isDragging && t.cancelable && t.preventDefault();
                const e = this.model.IsTouch ? t.touches[0] : t;
                let {
                    screenX: i,
                    screenY: r
                } = e, A = this.swipeDrag.inputStart.x - i, o = this.swipeDrag.inputStart.y - r;
                this.swipeDrag.inputStart = {
                    x: i,
                    y: r
                }, this.swipeDrag.isDragging || (this.swipeDrag.isDragging = Math.abs(A) > 3 && Math.abs(A) > Math.abs(o)), this.swipeDrag.isDragging && (this.target += A * this.swipeDrag.movementRateMultiplier, this.swipeDrag.swipeVelocity = A * this.swipeDrag.velocityMultiplier, this.clampedIndex && (this.model.IsRTL ? this.target = Math.max(this.widthOfItem * this.sign * (this._items.length - 1), Math.min(0, this.target)) : this.target = Math.min(this.widthOfItem * (this._items.length - 1), Math.max(0, this.target))), n(this.swipeDrag.dragDrawId), this.swipeDrag.dragDrawId = s(() => this.draw(.3)))
            },
            _onStopDrag(t) {
                if (window.removeEventListener(this.inputMoveEventName, this._onDrag), window.removeEventListener(this.inputUpEventName, this._onStopDrag), !this.swipeDrag.isDragging) return;
                let e = [this.currentIndex - 1, this.currentIndex, this.currentIndex + 1],
                    i = 0,
                    r = Number.MAX_VALUE;
                for (let t = 0, s = e.length; t < s; t++) {
                    let s = e[t] * this.widthOfItem,
                        n = Math.abs(s - (this.position + this.swipeDrag.swipeVelocity) * this.sign);
                    n < r && (r = n, i = t)
                }
                this.lastInteractionEvent = t;
                let A = e[i];
                this.clampedIndex && (A = this.wrappedIndex(A)), this.target = this.convertSlideIndexToHorizontalPosition(A), n(this.swipeDrag.dragDrawId), n(this.swipeDrag.waitingToReachTargetDrawId), this.swipeDrag.dragDrawId = s(() => {
                    this.trigger(this.model.Events.ITEM_CHANGE_INITIATED, {
                        gallery: this,
                        next: this._items[this.wrappedIndex(A)]
                    }), this.draw(.2), this.waitingToReachTarget(A)
                })
            },
            waitingToReachTarget(t) {
                if (Math.abs(this.position - this.target) > .1) return void(this.swipeDrag.waitingToReachTargetDrawId = s(() => this.waitingToReachTarget(t)));
                const e = this.selections.occurred.current;
                this.trigger(this.model.Events.ITEM_CHANGE_COMPLETED, {
                    gallery: this,
                    current: e
                })
            },
            destroy() {
                this.el.removeEventListener(this.inputDownEvent, this._onStartDrag), window.removeEventListener(this.inputUpEventName, this._onStopDrag), window.removeEventListener(this.inputUpEventName, this._onStopDrag)
            }
        }
    }, {
        115: 115,
        117: 117
    }],
    191: [function(t, e, i) {
        "use strict";
        const s = t(3),
            n = t(15),
            r = t(18);
        e.exports = {
            created() {
                this.tabNav = {
                    items: [],
                    current: null
                }
            },
            itemsCreated() {
                Array.from(this.el.querySelectorAll(this.model.TabNav.ItemSelector)).forEach((t, e) => {
                    const i = new A(t, e),
                        s = this.getItemForTrigger(i.trigger);
                    i.onSelected = t => {
                        this.lastInteractionEvent = t, t.preventDefault();
                        let i = e - this.wrappedIndex(this.currentIndex),
                            s = this.currentIndex + i;
                        this.animateToItem(s)
                    }, s.on("select", () => {
                        t.classList.add("current"), i.anchorEl.classList.add("current")
                    }), s.on("deselect", () => {
                        t.classList.remove("current"), i.anchorEl.classList.remove("current")
                    }), i.anchorEl.addEventListener("click", i.onSelected), this.tabNav.items.push(i)
                }), this._items.forEach((t, e) => {
                    t.el.setAttribute("role", r.TABPANEL), t.el.setAttribute(n.LABELLEDBY, this.tabNav.items[e].anchorEl.id), this.tabNav.items[e].anchorEl.setAttribute(n.CONTROLS, t.el.id)
                })
            },
            mounted() {
                const t = this.tabNav.items[0].el.parentElement;
                this.roamingTabIndex = new s(t, {
                    selector: this.model.TabNav.RoamingTabIndexSelector
                })
            },
            onItemChangeCompleted(t) {
                let e = this.tabNav.items.filter(e => e.trigger === t.current.id)[0];
                this.setCurrentItem(e), this.roamingTabIndex.setSelectedItemByIndex(e.index, !0), document.activeElement.parentElement.parentElement === e.el.parentElement && e.anchorEl.focus()
            },
            setCurrentItem(t) {
                t !== this.tabNav.current && (this.tabNav.current = t)
            }
        };
        class A {
            constructor(t, e) {
                this.el = t, this.index = e, this.anchorEl = t.querySelector("a"), this.trigger = this.anchorEl.getAttribute("data-ac-gallery-trigger"), this.anchorEl.setAttribute("role", r.TAB)
            }
        }
    }, {
        15: 15,
        18: 18,
        3: 3
    }],
    192: [function(t, e, i) {
        "use strict";
        e.exports = {
            beforeCreate() {
                this.selections = {
                    initiated: {
                        current: null,
                        previous: null
                    },
                    occurred: {
                        current: null,
                        previous: null
                    },
                    completed: {
                        current: null,
                        previous: null
                    }
                }
            },
            onItemChangeInitiated(t) {
                this.selections.initiated.previous = this.selections.initiated.current, this.selections.initiated.current = this.selections.initiated.next, this.selections.initiated.next = t.next
            },
            onItemChangeOccurred(t) {
                this.selections.occurred.previous = t.previous = this.selections.occurred.current, this.selections.occurred.current = t.current
            },
            onItemChangeCompleted(t) {
                this.selections.completed.previous = t.previous = this.selections.completed.current, this.selections.completed.current = t.current
            }
        }
    }, {}],
    193: [function(t, e, i) {
        "use strict";
        const s = t(73),
            n = t(212),
            r = t(216),
            A = t(219),
            o = t(205),
            a = t(196),
            h = {
                endpoint: null,
                aliases: null,
                timeout: 5,
                dummyPrices: !1
            };
        e.exports = class {
            constructor(t = [], e = {}) {
                this.ids = Array.isArray(t) ? t : [t], this._originalIDs = [...this.ids], this.identifierToAliasMap = {}, this.options = this._processOptions(e), this.itemsWithDummyPrice = [], this.identifierParam = null
            }
            formatResponseItem() {
                throw new Error("not implemented")
            }
            getItemsFromResponse() {
                throw new Error("not implemented")
            }
            createDummyItem() {
                throw new Error("not implemented")
            }
            send() {
                return this._maybeForceError().then(() => this._request()).then(t => this._processResponse(t)).then(t => this._createProductObjects(t)).catch(t => this._handleError(t))
            }
            _createProductObjects(t) {
                let e = {};
                return Object.entries(t).forEach(([t, i]) => {
                    let s = null,
                        n = this.identifierToAliasMap[t] || [t];
                    try {
                        s = this.formatResponseItem(t, i)
                    } catch (t) {
                        if ("InvalidDataError" !== t.name) throw t
                    }
                    n.forEach(t => {
                        e[t] = s
                    })
                }), Object.defineProperty(e, "aliases", {
                    value: this.options.aliases
                }), r.group("%cResults from Apple Online Store", "background-color:#27a33f;color:white;padding:2px 5px"), r.log(e), r.groupEnd(), r.enabled && this.itemsWithDummyPrice.length && (r.group("Dummy Prices"), r.warn("Using dummy prices for the following product identifiers: " + this.itemsWithDummyPrice.join(", ")), r.info("$777,777 — The API service may require authentication and/or authorization. \n$888,888 — The product identifer is currently unknown to the API service. \n$999,999 — The product identifier is known to the API service, but the price has yet to be set. \n"), r.groupEnd()), new a(null, e)
            }
            _handleError(t) {
                let e = {};
                this.ids.forEach(t => e[t] = null);
                let i = new a(t, e);
                if (!t) return i;
                if (!Object.keys(o).some(e => t.name === e)) throw t;
                if ("UnexpectedError" === t.name && this.options.dummyPrices) {
                    let e = {};
                    this._originalIDs.forEach(t => {
                        e[t] = this.createDummyItem(t), this.itemsWithDummyPrice.push(t)
                    }), i = new a(t, e)
                }
                return t && "function" == typeof t.showHint && t.showHint(i.products), i
            }
            _maybeForceError() {
                return new Promise((t, e) => {
                    if (this.options.dummyPrices && "undefined" != typeof window && window.location.search.indexOf("39f4f1f5-c4a1-4a7c-ab30-085335a11146") > -1) {
                        const t = s("39f4f1f5-c4a1-4a7c-ab30-085335a11146", null);
                        e(t && o[t] && new o[t])
                    }
                    t()
                })
            }
            _processOptions(t) {
                if (!(t = Object.assign({}, h, t)).endpoint) throw new o.ConfigurationError({
                    type: "endpoint"
                });
                const e = t.aliases ? Object.entries(t.aliases) : [];
                return e.length && (this.identifierToAliasMap = e.reduce((t, [e, i]) => (t[i] = t[i] || [], t[i].push(e), t), {}), this.ids = this.ids.map(e => t.aliases[e] || e)), t
            }
            _processResponse(t) {
                let e = null,
                    i = null;
                switch (parseInt(t.getResponseHeader("x-rewrite-status"), 10) || t.status) {
                    case 404:
                        throw new o.ServiceNotFoundError;
                    case 503:
                        throw new o.ServiceUnavailableError;
                    case 400:
                        throw new o.UnexpectedError;
                    case 200:
                        if (i = A(t.responseText), null !== i && (e = this.getItemsFromResponse(i), e)) return e;
                    default:
                        throw new o.InvalidDataError
                }
            }
            _request() {
                return new Promise((t, e) => {
                    const i = new XMLHttpRequest;
                    i.withCredentials = !0, i.onloadend = t.bind(this, i), i.ontimeout = e.bind(this, new o.TimeoutError(this.options.timeout)), i.onerror = e.bind(this, new o.UnexpectedError), i.open("GET", n(this.options.endpoint, this.identifierParam, this.ids), !0), i.timeout = 1e3 * (this.options.timeout || 0), i.send()
                })
            }
        }
    }, {
        196: 196,
        205: 205,
        212: 212,
        216: 216,
        219: 219,
        73: 73
    }],
    194: [function(t, e, i) {
        "use strict";
        const s = t(217),
            n = t(209),
            r = t(193);
        e.exports = class extends r {
            constructor(t, e) {
                super(t, e), this.identifierParam = "parts"
            }
            createDummyItem(t) {
                return s(t, "unauthorized")
            }
            formatResponseItem(t, e) {
                let i = null;
                return this.options.dummyPrices && "UNKNOWN" === e.type && (e = s(t, "unknown"), this.itemsWithDummyPrice.push(t)), i = new n(e), 999999 === i.price.value && this.itemsWithDummyPrice.push(t), i
            }
            getItemsFromResponse(t) {
                return t.items
            }
        }
    }, {
        193: 193,
        209: 209,
        217: 217
    }],
    195: [function(t, e, i) {
        "use strict";
        const s = t(218),
            n = t(193),
            r = t(210);
        e.exports = class extends n {
            constructor(t, e) {
                super(t, e), this.identifierParam = "ids"
            }
            createDummyItem(t) {
                return s(t, "unauthorized")
            }
            formatResponseItem(t, e) {
                let i = null;
                return this.options.dummyPrices && "UNKNOWN" === e.productName && (e = s(t, "unknown"), this.itemsWithDummyPrice.push(t)), i = new r(e), 999999 === i.credit.value && this.itemsWithDummyPrice.push(t), i
            }
            getItemsFromResponse(t) {
                return t.ids
            }
        }
    }, {
        193: 193,
        210: 210,
        218: 218
    }],
    196: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor(t = null, e = {}) {
                this.error = t, this.products = e
            }
        }
    }, {}],
    197: [function(t, e, i) {
        "use strict";
        const s = t(206),
            n = t(207),
            r = t(215);
        e.exports = new class {
            getProductID(t, e) {
                let i = [];
                return e.forEach(e => {
                    i.push(e.dataset["".concat(t, "Product")])
                }), [...new Set(i)]
            }
            setElements(t) {
                const e = [...document.querySelectorAll("[data-".concat(t, "-product]"))];
                let i = Array.prototype.slice.call(e).filter(t => "SCRIPT" !== t.tagName);
                this["".concat(t, "Elements")] = i
            }
            fetchProductInfo(t, e = {}) {
                let i, A;
                const o = this.getProductID(t, this["".concat(t, "Elements")]);
                return r(t).then(r => {
                    const a = Object.assign({}, r, e);
                    return "pricing" === t ? A = s(o, e) : "tradein" === t ? A = n(o, e) : i = "API not supported", i || A.then(t => ({
                        response: t,
                        options: a
                    }))
                })
            }
            getValueFromPath(t, e) {
                return t.replace(/\s+/g, "").replace(/\$\{([\w\d.]+)\}/g, (t, i) => i.split(".").reduce((t, e) => t && t[e] ? t[e] : "", e))
            }
            handleError(t) {
                t.textContent || (t.style.display = "none")
            }
            trackDynamicPricingState(e) {
                try {
                    let i = t("@marcom/ac-analytics"),
                        s = {
                            Success: "DP-S0",
                            ConfigurationError: "DP-E1",
                            ServiceNotFoundError: "DP-E2",
                            ServiceUnavailableError: "DP-E3",
                            TimeoutError: "DP-E4",
                            InvalidDataError: "DP-E5",
                            UnexpectedError: "DP-E6"
                        }[e && e.name || "Success"];
                    i.passiveTracker({
                        eVar100: s
                    })
                } catch (t) {}
            }
            loadPricingFromHTML(t) {
                return new Promise(e => {
                    this.pricingElements = [], this.setElements("pricing"), this.fetchProductInfo("pricing", t).then(({
                        response: t,
                        options: i
                    }) => {
                        this.trackDynamicPricingState(t.error), this.pricingElements.forEach(s => {
                            let n;
                            if (!t.error || i.dummyPrices) {
                                const e = s.dataset.pricingProduct;
                                let i = t.products[e];
                                const r = (s.dataset.productTemplate || "").replace(/\$\{\s*([\w\d.]+)\s*\}/g, t => {
                                    const e = this.getValueFromPath(t, i);
                                    return e || (n = !0), e
                                });
                                i && !n ? (s.textContent = r, s.dataset.pricingLoaded = "", s.parentElement.classList.add("has-dynamic-content")) : this.handleError(s)
                            } else this.handleError(s);
                            e(t.error)
                        })
                    }).catch(t => {
                        throw t
                    })
                })
            }
            loadTradeInFromHTML(t) {
                return new Promise(e => {
                    this.tradeinElements = [], this.setElements("tradein"), this.fetchProductInfo("tradein", t).then(({
                        response: t,
                        options: i
                    }) => {
                        this.trackDynamicPricingState(t.error), this.tradeinElements.forEach(s => {
                            let n;
                            if (!t.error || i.dummyPrices) {
                                const e = s.dataset.tradeinProduct;
                                let i = t.products[e];
                                const r = (s.dataset.productTemplate || "").replace(/\$\{\s*([\w\d.]+)\s*\}/g, t => {
                                    const e = this.getValueFromPath(t, i);
                                    return e || (n = !0), e
                                });
                                i && !n ? (s.textContent = r, s.dataset.pricingLoaded = "", s.parentElement.classList.add("has-dynamic-content")) : this.handleError(s)
                            } else this.handleError(s);
                            e(t.error)
                        })
                    }).catch(t => {
                        throw t
                    })
                })
            }
        }
    }, {
        206: 206,
        207: 207,
        215: 215,
        undefined: void 0
    }],
    198: [function(t, e, i) {
        "use strict";
        e.exports = {
            mockPrices: {
                unauthorized: 777777,
                unknown: 888888
            }
        }
    }, {}],
    199: [function(t, e, i) {
        "use strict";
        const s = t(216);
        e.exports = class extends Error {
            constructor(t = {}) {
                let e;
                "endpoint" === t.type && (e = "Failed to fetch product prices: The API service endpoint was not specified."), super(e), this.name = "ConfigurationError", this.type = t.type
            }
            showHint() {
                "endpoint" === this.type && (s.warn(this.message + " This may be expected if this page's locale doesn't have an Apple Online Store."), s.info('If prices are expected for this locale, check that the API service endpoint is specified in HTML with %c<link rel="ac:pricing-endpoint" href="/path/to/endpoint">%c or the "fetchProducts" function\'s "endpoint" option.', "font-family:monospace", ""))
            }
        }
    }, {
        216: 216
    }],
    200: [function(t, e, i) {
        "use strict";
        const s = t(216);
        e.exports = class extends Error {
            constructor(t) {
                super(t || "Failed to fetch product price: The API service responded with an unexpected data format."), this.name = "InvalidDataError"
            }
            showHint() {
                s.warn(this.message)
            }
        }
    }, {
        216: 216
    }],
    201: [function(t, e, i) {
        "use strict";
        const s = t(216);
        e.exports = class extends Error {
            constructor() {
                super("Failed to fetch product prices: The API service responded with a status of 404 (Not Found)."), this.name = "ServiceNotFoundError"
            }
            showHint() {
                s.warn(this.message), s.info('Check the "href" value of the %c<link rel="ac:pricing-endpoint">%c tag or the "fetchProducts" function\'s "endpoint" option, if specified.', "font-family:monospace", "")
            }
        }
    }, {
        216: 216
    }],
    202: [function(t, e, i) {
        "use strict";
        const s = t(216);
        e.exports = class extends Error {
            constructor() {
                super("Failed to fetch product prices: The Apple Online Store is temporarily unavailable."), this.name = "ServiceUnavailableError"
            }
            showHint() {
                s.warn(this.message)
            }
        }
    }, {
        216: 216
    }],
    203: [function(t, e, i) {
        "use strict";
        const s = t(216);
        e.exports = class extends Error {
            constructor(t) {
                super("Failed to fetch product prices: The API service did not respond within " + t + " seconds, so the request was aborted."), this.name = "TimeoutError", this.timeoutValue = t
            }
            showHint() {
                s.warn(this.message)
            }
        }
    }, {
        216: 216
    }],
    204: [function(t, e, i) {
        "use strict";
        const s = t(216);
        e.exports = class extends Error {
            constructor() {
                super("Failed to fetch prices: An unexpected error occured."), this.name = "UnexpectedError"
            }
            showHint() {
                s.warn(this.message), s.info("The API service endpoint may require authentication and/or authorization.")
            }
        }
    }, {
        216: 216
    }],
    205: [function(t, e, i) {
        "use strict";
        e.exports = {
            ConfigurationError: t(199),
            ServiceNotFoundError: t(201),
            ServiceUnavailableError: t(202),
            TimeoutError: t(203),
            InvalidDataError: t(200),
            UnexpectedError: t(204)
        }
    }, {
        199: 199,
        200: 200,
        201: 201,
        202: 202,
        203: 203,
        204: 204
    }],
    206: [function(t, e, i) {
        "use strict";
        const s = t(215),
            n = t(196),
            r = t(194);
        e.exports = function(t = [], e = {}) {
            if (!t.length) {
                const t = new n;
                return Promise.resolve(t)
            }
            return s("pricing").then(i => {
                const s = Object.assign({}, i, e);
                return new r(t, s).send()
            })
        }
    }, {
        194: 194,
        196: 196,
        215: 215
    }],
    207: [function(t, e, i) {
        "use strict";
        const s = t(215),
            n = t(196),
            r = t(195);
        e.exports = function(t = [], e = {}) {
            if (!t.length) {
                const t = new n;
                return Promise.resolve(t)
            }
            return s("tradein").then(i => {
                const s = Object.assign({}, i, e);
                return new r(t, s).send()
            })
        }
    }, {
        195: 195,
        196: 196,
        215: 215
    }],
    208: [function(t, e, i) {
        "use strict";
        e.exports = Object.assign({
            applyPrices: t(197),
            fetchProducts: t(206),
            fetchTradeIns: t(207),
            Product: t(209),
            TradeIn: t(210)
        }, t(205))
    }, {
        197: 197,
        205: 205,
        206: 206,
        207: 207,
        209: 209,
        210: 210
    }],
    209: [function(t, e, i) {
        "use strict";
        const s = t(214),
            n = t(220),
            r = t(200),
            A = t => ({
                id: t.isString,
                name: t.isString,
                type: t => ["WUIP", "PART"].includes(t),
                price: t.isObject,
                "price.value": t.isNumber,
                "price.display": t.isObject,
                "price.display.disclaimer": t.isOptionalString,
                "price.display.legal": t.isOptionalString,
                "price.display.actual": t.isString,
                "price.display.monthlyFrom": t.isOptionalString,
                "price.display.smart": t.isString,
                "price.display.from": (t, e) => "WUIP" === e.type ? "string" == typeof t : void 0 === t,
                tradeIn: t => void 0 === t || n(t, t => ({
                    id: t.isString,
                    productName: t.isString,
                    credit: t.isObject,
                    "credit.value": t.isNumber,
                    "credit.display": t.isObject,
                    "credit.display.actual": t.isString,
                    "credit.display.smart": t.isString,
                    "credit.display.upto": t.isString,
                    priceWithCreditApplied: t.isObject,
                    "priceWithCreditApplied.value": t.isNumber,
                    "priceWithCreditApplied.display.actual": t.isString,
                    "priceWithCreditApplied.display.disclaimer": t.isOptionalString,
                    "priceWithCreditApplied.display.from": t.isString,
                    "priceWithCreditApplied.display.monthlyFrom": t.isOptionalString,
                    "priceWithCreditApplied.display.smart": t.isString
                }))
            });
        class o {
            constructor(t) {
                if (!o.validate(t)) throw new r("Could not create Product, because the given JSON contains invalid data.");
                s(this, t)
            }
            get isWUIP() {
                return "WUIP" === this.type
            }
            get isPart() {
                return "PART" === this.type
            }
            static validate(t) {
                return n(t, A)
            }
        }
        e.exports = o
    }, {
        200: 200,
        214: 214,
        220: 220
    }],
    210: [function(t, e, i) {
        "use strict";
        const s = t(214),
            n = t(220),
            r = t(200),
            A = t => ({
                id: t.isString,
                productName: t.isString,
                credit: t.isObject,
                "credit.value": t.isNumber,
                "credit.display": t.isObject,
                "credit.display.actual": t.isString,
                "credit.display.smart": t.isString,
                "credit.display.upto": t.isString
            });
        class o {
            constructor(t) {
                if (!o.validate(t)) throw new r("Could not create TradeIn, because the given JSON contains invalid data.");
                s(this, t)
            }
            static validate(t) {
                return n(t, A)
            }
        }
        e.exports = o
    }, {
        200: 200,
        214: 214,
        220: 220
    }],
    211: [function(t, e, i) {
        "use strict";
        e.exports = function(t = []) {
            return Array.isArray(t) || (t = [t]), t.filter(t => "string" == typeof t).map(t => encodeURIComponent(String(t).trim())).join(",")
        }
    }, {}],
    212: [function(t, e, i) {
        "use strict";
        const s = t(211),
            n = /\?(.+)/,
            r = /(#.*)/;
        e.exports = function(t, e, i = []) {
            let A = ((t = t.replace(r, "")).match(n) || [])[1],
                o = t;
            return i.length && (o += A ? "&" : "?", o += "".concat(e, "=").concat(s(i))), o
        }
    }, {
        211: 211
    }],
    213: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            const i = t % 1 == 0 ? 0 : 2;
            return t > 9999 ? t.toLocaleString(e, {
                minimumFractionDigits: i,
                maximumFractionDigits: i
            }) : t.toFixed(i)
        }
    }, {}],
    214: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            Object.entries(e).forEach(([e, i]) => {
                t[e] || Object.defineProperty(t, e, {
                    enumerable: !0,
                    value: "object" == typeof i ? Object.freeze(JSON.parse(JSON.stringify(i))) : i
                })
            })
        }
    }, {}],
    215: [function(t, e, i) {
        "use strict";
        const s = t(121);
        e.exports = function(t) {
            return new Promise((function(e) {
                "undefined" != typeof window && window.document ? s((function() {
                    let i = {};
                    const s = document.querySelector('link[rel="ac:'.concat(t, '-endpoint"]'));
                    s && (i.endpoint = (s.getAttribute("href") || "").trim());
                    document.querySelectorAll('meta[name="ac:'.concat(t, '-alias"]')).forEach(t => {
                        const [e, s] = (t.getAttribute("content") || "").split("=");
                        e && s && (i.aliases = i.aliases || {}, i.aliases[e] = s)
                    });
                    const n = document.querySelector('meta[name="ac:pricing-dummy"]');
                    n && (i.dummyPrices = "true" === (n.getAttribute("content") || "").trim()), e(i)
                })) : e({})
            }))
        }
    }, {
        121: 121
    }],
    216: [function(t, e, i) {
        "use strict";
        const s = t(25),
            n = "[ @marcom/pricing ]",
            r = Object.keys(s);
        let A = !1;
        for (var o = 0, a = r.length; o < a; o++) {
            const t = r[o],
                i = "function" == typeof s[t] ? s[t] : null;
            i && (e.exports[t] = function() {
                const e = Array.prototype.slice.call(arguments);
                A || "string" != typeof e[0] || (e[0] = "".concat(n, " ").concat(e[0])), "group" !== t && "groupCollapsed" !== t || (A = !0), "groupEnd" === t && (A = !1), i.apply(s, e)
            })
        }
        e.exports.enabled = s.enabled
    }, {
        25: 25
    }],
    217: [function(t, e, i) {
        "use strict";
        const {
            mockPrices: s
        } = t(198), n = t(213);
        e.exports = function(t, e, i = "en") {
            const r = parseFloat(s[e] || e || 0),
                A = n(r, i);
            return {
                id: t,
                name: "",
                type: "WUIP",
                price: {
                    value: r,
                    display: {
                        actual: "$" + Number(r).toLocaleString(i, {
                            minimumFractionDigits: 2
                        }),
                        smart: "$" + A,
                        from: "From $" + A
                    }
                }
            }
        }
    }, {
        198: 198,
        213: 213
    }],
    218: [function(t, e, i) {
        "use strict";
        const {
            mockPrices: s
        } = t(198), n = t(213);
        e.exports = function(t, e, i = "en") {
            const r = parseFloat(s[e] || e || 0),
                A = n(r, i);
            return {
                id: t,
                productName: "",
                credit: {
                    value: r,
                    display: {
                        actual: "$" + Number(r).toLocaleString(i, {
                            minimumFractionDigits: 2
                        }),
                        smart: "$" + A,
                        from: "From $" + A,
                        upto: "Up to $" + A
                    }
                }
            }
        }
    }, {
        198: 198,
        213: 213
    }],
    219: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            try {
                return JSON.parse(t)
            } catch (t) {
                return null
            }
        }
    }, {}],
    220: [function(t, e, i) {
        "use strict";
        const s = {
            isString: t => "string" == typeof t,
            isOptionalString: t => !t || "string" == typeof t,
            isNumber: t => "number" == typeof t,
            isObject: t => "[object Object]" === Object.prototype.toString.call(t)
        };

        function n(t, e) {
            return e.split(".").reduce((t, e) => t && t[e], t)
        }
        e.exports = function(t, e) {
            "function" == typeof e && (e = e(s));
            const i = Object.entries(e);
            for (var r = 0, A = i.length; r < A; r++) {
                const [e, s] = i[r], A = e.indexOf(".") > -1 ? n(t, e) : t[e];
                if (!0 !== s.call(t, A, t)) return !1
            }
            return !0
        }
    }, {}],
    221: [function(t, e, i) {
        "use strict";
        e.exports = {
            lerp: function(t, e, i) {
                return e + (i - e) * t
            },
            map: function(t, e, i, s, n) {
                return s + (n - s) * (t - e) / (i - e)
            },
            mapClamp: function(t, e, i, s, n) {
                var r = s + (n - s) * (t - e) / (i - e);
                return Math.max(s, Math.min(n, r))
            },
            norm: function(t, e, i) {
                return (t - e) / (i - e)
            },
            clamp: function(t, e, i) {
                return Math.max(e, Math.min(i, t))
            },
            randFloat: function(t, e) {
                return Math.random() * (e - t) + t
            },
            randInt: function(t, e) {
                return Math.floor(Math.random() * (e - t) + t)
            }
        }
    }, {}],
    222: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: {
                safari: !1,
                chrome: !1,
                firefox: !1,
                ie: !1,
                opera: !1,
                android: !1,
                edge: !1,
                edgeChromium: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0,
                    documentMode: !1
                }
            },
            os: {
                osx: !1,
                ios: !1,
                android: !1,
                windows: !1,
                linux: !1,
                fireos: !1,
                chromeos: !1,
                version: {
                    string: "",
                    major: 0,
                    minor: 0,
                    patch: 0
                }
            }
        }
    }, {}],
    223: [function(t, e, i) {
        "use strict";
        e.exports = {
            browser: [{
                name: "edge",
                userAgent: "Edge",
                version: ["rv", "Edge"],
                test: function(t) {
                    return t.ua.indexOf("Edge") > -1 || "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" === t.ua
                }
            }, {
                name: "edgeChromium",
                userAgent: "Edge",
                version: ["rv", "Edg"],
                test: function(t) {
                    return t.ua.indexOf("Edg") > -1 && -1 === t.ua.indexOf("Edge")
                }
            }, {
                name: "chrome",
                userAgent: "Chrome"
            }, {
                name: "firefox",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && -1 === t.ua.indexOf("Opera")
                },
                version: "Firefox"
            }, {
                name: "android",
                userAgent: "Android"
            }, {
                name: "safari",
                test: function(t) {
                    return t.ua.indexOf("Safari") > -1 && t.vendor.indexOf("Apple") > -1
                },
                version: "Version"
            }, {
                name: "ie",
                test: function(t) {
                    return t.ua.indexOf("IE") > -1 || t.ua.indexOf("Trident") > -1
                },
                version: ["MSIE", "rv"],
                parseDocumentMode: function() {
                    var t = !1;
                    return document.documentMode && (t = parseInt(document.documentMode, 10)), t
                }
            }, {
                name: "opera",
                userAgent: "Opera",
                version: ["Version", "Opera"]
            }],
            os: [{
                name: "windows",
                test: function(t) {
                    return t.ua.indexOf("Windows") > -1
                },
                version: "Windows NT"
            }, {
                name: "osx",
                userAgent: "Mac",
                test: function(t) {
                    return t.ua.indexOf("Macintosh") > -1
                }
            }, {
                name: "ios",
                test: function(t) {
                    return t.ua.indexOf("iPhone") > -1 || t.ua.indexOf("iPad") > -1
                },
                version: ["iPhone OS", "CPU OS"]
            }, {
                name: "linux",
                userAgent: "Linux",
                test: function(t) {
                    return (t.ua.indexOf("Linux") > -1 || t.platform.indexOf("Linux") > -1) && -1 === t.ua.indexOf("Android")
                }
            }, {
                name: "fireos",
                test: function(t) {
                    return t.ua.indexOf("Firefox") > -1 && t.ua.indexOf("Mobile") > -1
                },
                version: "rv"
            }, {
                name: "android",
                userAgent: "Android",
                test: function(t) {
                    return t.ua.indexOf("Android") > -1
                }
            }, {
                name: "chromeos",
                userAgent: "CrOS"
            }]
        }
    }, {}],
    224: [function(t, e, i) {
        "use strict";
        var s = t(222),
            n = t(223);

        function r(t, e) {
            if ("function" == typeof t.parseVersion) return t.parseVersion(e);
            var i, s = t.version || t.userAgent;
            "string" == typeof s && (s = [s]);
            for (var n, r = s.length, A = 0; A < r; A++)
                if ((n = e.match((i = s[A], new RegExp(i + "[a-zA-Z\\s/:]+([0-9_.]+)", "i")))) && n.length > 1) return n[1].replace(/_/g, ".");
            return !1
        }

        function A(t, e, i) {
            for (var s, n, A = t.length, o = 0; o < A; o++)
                if ("function" == typeof t[o].test ? !0 === t[o].test(i) && (s = t[o].name) : i.ua.indexOf(t[o].userAgent) > -1 && (s = t[o].name), s) {
                    if (e[s] = !0, "string" == typeof(n = r(t[o], i.ua))) {
                        var a = n.split(".");
                        e.version.string = n, a && a.length > 0 && (e.version.major = parseInt(a[0] || 0), e.version.minor = parseInt(a[1] || 0), e.version.patch = parseInt(a[2] || 0))
                    } else "edge" === s && (e.version.string = "12.0.0", e.version.major = "12", e.version.minor = "0", e.version.patch = "0");
                    return "function" == typeof t[o].parseDocumentMode && (e.version.documentMode = t[o].parseDocumentMode()), e
                }
            return e
        }
        e.exports = function(t) {
            var e = {};
            return e.browser = A(n.browser, s.browser, t), e.os = A(n.os, s.os, t), e
        }
    }, {
        222: 222,
        223: 223
    }],
    225: [function(t, e, i) {
        "use strict";
        var s = {
            ua: window.navigator.userAgent,
            platform: window.navigator.platform,
            vendor: window.navigator.vendor
        };
        e.exports = t(224)(s)
    }, {
        224: 224
    }],
    226: [function(t, e, i) {
        "use strict";
        const s = t(61).EventEmitterMicro,
            n = [{
                name: "S",
                mediaQuery: "only screen and (max-width: 734px)"
            }, {
                name: "M",
                mediaQuery: "only screen and (min-width: 735px) and (max-width: 1068px)"
            }, {
                name: "L",
                mediaQuery: "only screen and (min-width: 1069px) and (max-width: 1440px)"
            }, {
                name: "X",
                mediaQuery: "only screen and (min-width: 1441px)"
            }],
            r = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)",
            A = "only screen and (orientation: portrait)";
        class o extends s {
            constructor(t = {}) {
                super(), this.BREAKPOINTS = t.breakpoints || n, this._setupProperties(), this._onRetinaChange = this._onRetinaChange.bind(this), this._onOrientationChange = this._onOrientationChange.bind(this), this.listenersAdded = {
                    orientation: !1,
                    retina: !1,
                    viewport: !1
                }
            }
            static get CHANGE_EVENTS() {
                return {
                    ORIENTATION: "change:orientation",
                    RETINA: "change:retina",
                    VIEWPORT: "change:viewport"
                }
            }
            on() {
                this._setupListeners(arguments[0]), super.on.apply(this, arguments)
            }
            _onRetinaChange() {
                this.trigger(o.CHANGE_EVENTS.RETINA, this)
            }
            _onOrientationChange() {
                this.trigger(o.CHANGE_EVENTS.ORIENTATION, this)
            }
            _setupProperties() {
                Object.defineProperty(this, "retina", {
                    get: () => window.matchMedia(r).matches
                }), Object.defineProperty(this, "orientation", {
                    get: () => window.matchMedia(A).matches ? "portrait" : "landscape"
                }), this.viewport = this.getBreakpoint()
            }
            _setupListeners(t) {
                if (t !== o.CHANGE_EVENTS.RETINA || this.listenersAdded.retina || (window.matchMedia(r).addListener(this._onRetinaChange), this.listenersAdded.retina = !0), t !== o.CHANGE_EVENTS.ORIENTATION || this.listenersAdded.orientation || (window.matchMedia(A).addListener(this._onOrientationChange), this.listenersAdded.orientation = !0), t === o.CHANGE_EVENTS.VIEWPORT && !this.listenersAdded.viewport) {
                    for (let t = 0; t < this.BREAKPOINTS.length; t++) {
                        let e = this.BREAKPOINTS[t];
                        window.matchMedia(e.mediaQuery).addListener(t => {
                            t.matches && (this.oldViewport = this.viewport, this.viewport = e.name, this.trigger(o.CHANGE_EVENTS.VIEWPORT, this))
                        })
                    }
                    this.listenersAdded.viewport = !0
                }
            }
            getBreakpoint() {
                for (let t = 0; t < this.BREAKPOINTS.length; t++) {
                    let e = this.BREAKPOINTS[t];
                    if (window.matchMedia(e.mediaQuery).matches) return e.name
                }
            }
        }
        e.exports = o
    }, {
        61: 61
    }],
    227: [function(t, e, i) {
        "use strict";
        var s = t(61).EventEmitterMicro,
            n = t(121),
            r = "viewport-emitter",
            A = {
                removeNamespace: !0
            },
            o = "data-viewport-emitter-dispatch",
            a = "data-viewport-emitter-state",
            h = "only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)",
            l = "only screen and (orientation: portrait)",
            c = "only screen and (orientation: landscape)",
            u = "change:any",
            d = "change:orientation",
            m = "change:retina",
            p = "change:viewport";

        function g(t, e) {
            s.call(this), this._id = t || r, this._options = Object.assign({}, A, e), this._allowDOMEventDispatch = !1, this._allowElementStateData = !1, this._options.removeNamespace = "boolean" != typeof this._options.removeNamespace || this._options.removeNamespace, this._el = this._initViewportEl(this._id), this._resizing = !1, this._mediaQueryLists = {
                resolution: {
                    retina: window.matchMedia(h)
                },
                orientation: {
                    portrait: window.matchMedia(l),
                    landscape: window.matchMedia(c)
                }
            }, this._viewport = this._getViewport(this._options.removeNamespace), this._retina = this._getRetina(this._mediaQueryLists.resolution.retina), this._orientation = this._initOrientation(), this._addListeners(), this._updateElementStateData()
        }
        Object.defineProperty(g, "DOM_DISPATCH_ATTRIBUTE", {
            get: function() {
                return o
            }
        }), Object.defineProperty(g, "DOM_STATE_ATTRIBUTE", {
            get: function() {
                return a
            }
        });
        var f = g.prototype = Object.create(s.prototype);
        Object.defineProperty(f, "id", {
            get: function() {
                return this._id
            }
        }), Object.defineProperty(f, "element", {
            get: function() {
                return this._el
            }
        }), Object.defineProperty(f, "mediaQueryLists", {
            get: function() {
                return this._mediaQueryLists
            }
        }), Object.defineProperty(f, "viewport", {
            get: function() {
                return this._viewport
            }
        }), Object.defineProperty(f, "retina", {
            get: function() {
                return this._retina
            }
        }), Object.defineProperty(f, "orientation", {
            get: function() {
                return this._orientation
            }
        }), Object.defineProperty(f, "hasDomDispatch", {
            get: function() {
                return this._allowDOMEventDispatch
            }
        }), f.destroy = function() {
            for (var t in this._removeListeners(), this._options) this._options[t] = null;
            for (var e in this._mediaQueryLists) {
                var i = this._mediaQueryLists[e];
                for (var n in i) i[n] = null
            }
            this._id = null, this._el = null, this._viewport = null, this._retina = null, this._orientation = null, s.prototype.destroy.call(this)
        }, f._initViewportEl = function(t) {
            var e = document.getElementById(t);
            return e || ((e = document.createElement("div")).id = t, e = document.body.appendChild(e)), e.hasAttribute(o) || (e.setAttribute(o, ""), this._allowDOMEventDispatch = !0), e.hasAttribute(a) || (this._allowElementStateData = !0), e
        }, f._dispatch = function(t, e) {
            var i = {
                viewport: this._viewport,
                orientation: this._orientation,
                retina: this._retina
            };
            if (this._allowDOMEventDispatch) {
                var s = new CustomEvent(t, {
                        detail: e
                    }),
                    n = new CustomEvent(u, {
                        detail: i
                    });
                this._el.dispatchEvent(s), this._el.dispatchEvent(n)
            }
            this.trigger(t, e), this.trigger(u, i)
        }, f._addListeners = function() {
            this._onOrientationChange = this._onOrientationChange.bind(this), this._onRetinaChange = this._onRetinaChange.bind(this), this._onViewportChange = this._onViewportChange.bind(this), this._onViewportChangeUpdate = this._onViewportChangeUpdate.bind(this), this._mediaQueryLists.orientation.portrait.addListener(this._onOrientationChange), this._mediaQueryLists.orientation.landscape.addListener(this._onOrientationChange), this._mediaQueryLists.resolution.retina.addListener(this._onRetinaChange), window.addEventListener("resize", this._onViewportChange)
        }, f._removeListeners = function() {
            this._mediaQueryLists.orientation.portrait.removeListener(this._onOrientationChange), this._mediaQueryLists.orientation.landscape.removeListener(this._onOrientationChange), this._mediaQueryLists.resolution.retina.removeListener(this._onRetinaChange), window.removeEventListener("resize", this._onViewportChange)
        }, f._updateElementStateData = function() {
            if (this._allowElementStateData) {
                var t = JSON.stringify({
                    viewport: this._viewport,
                    orientation: this._orientation,
                    retina: this._retina
                });
                this._el.setAttribute(a, t)
            }
        }, f._getViewport = function(t) {
            var e = window.getComputedStyle(this._el, "::before").content;
            return e ? (e = e.replace(/["']/g, ""), t ? e.split(":").pop() : e) : null
        }, f._getRetina = function(t) {
            return t.matches
        }, f._getOrientation = function(t) {
            var e = this._orientation;
            if (t.matches) {
                return t.media.match(/portrait|landscape/)[0]
            }
            return e
        }, f._initOrientation = function() {
            var t = this._getOrientation(this._mediaQueryLists.orientation.portrait);
            return t || this._getOrientation(this._mediaQueryLists.orientation.landscape)
        }, f._onViewportChange = function() {
            this._resizing || (this._resizing = !0, n(this._onViewportChangeUpdate))
        }, f._onViewportChangeUpdate = function() {
            var t = this._viewport;
            if (this._viewport = this._getViewport(this._options.removeNamespace), t !== this._viewport) {
                var e = {
                    from: t,
                    to: this._viewport
                };
                this._updateElementStateData(), this._dispatch(p, e)
            }
            this._resizing = !1
        }, f._onRetinaChange = function(t) {
            var e = this._retina;
            if (this._retina = this._getRetina(t), e !== this._retina) {
                var i = {
                    from: e,
                    to: this._retina
                };
                this._updateElementStateData(), this._dispatch(m, i)
            }
        }, f._onOrientationChange = function(t) {
            var e = this._orientation;
            if (this._orientation = this._getOrientation(t), e !== this._orientation) {
                var i = {
                    from: e,
                    to: this._orientation
                };
                this._updateElementStateData(), this._dispatch(d, i)
            }
        }, e.exports = g
    }, {
        121: 121,
        61: 61
    }],
    228: [function(t, e, i) {
        "use strict";
        var s = t(227);
        e.exports = new s
    }, {
        227: 227
    }],
    229: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.createModals = function() {
            let t = Array.from(document.querySelectorAll(".modal-content"));
            t.length > 0 && t.forEach(t => {
                n(t)
            })
        }, i.initializeModal = n;
        const s = t(96).createStandardModal;

        function n(t) {
            const e = t,
                i = s(e),
                n = e.getAttribute("id").replace("-content", "_trigger"),
                r = document.querySelector("#".concat(n)),
                A = i.modalElement.querySelectorAll(".footnote a");
            i.modalElement.classList.add(n.replace("_trigger", "")), r.addEventListener("click", t => {
                t.preventDefault(), i.open()
            }), r.addEventListener("keydown", t => {
                32 === t.keyCode && (t.preventDefault(), i.open())
            }), A.forEach(t => {
                t.addEventListener("click", () => {
                    i.close()
                })
            })
        }
    }, {
        96: 96
    }],
    230: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t = new Float32Array(16);
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }
    }, {}],
    231: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = e[4],
                A = e[5],
                o = e[6],
                a = e[7],
                h = e[8],
                l = e[9],
                c = e[10],
                u = e[11];
            e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[4] = r * n + h * s, t[5] = A * n + l * s, t[6] = o * n + c * s, t[7] = a * n + u * s, t[8] = h * n - r * s, t[9] = l * n - A * s, t[10] = c * n - o * s, t[11] = u * n - a * s, t
        }
    }, {}],
    232: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = e[0],
                A = e[1],
                o = e[2],
                a = e[3],
                h = e[8],
                l = e[9],
                c = e[10],
                u = e[11];
            e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[0] = r * n - h * s, t[1] = A * n - l * s, t[2] = o * n - c * s, t[3] = a * n - u * s, t[8] = r * s + h * n, t[9] = A * s + l * n, t[10] = o * s + c * n, t[11] = a * s + u * n, t
        }
    }, {}],
    233: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = e[0],
                A = e[1],
                o = e[2],
                a = e[3],
                h = e[4],
                l = e[5],
                c = e[6],
                u = e[7];
            e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[0] = r * n + h * s, t[1] = A * n + l * s, t[2] = o * n + c * s, t[3] = a * n + u * s, t[4] = h * n - r * s, t[5] = l * n - A * s, t[6] = c * n - o * s, t[7] = u * n - a * s, t
        }
    }, {}],
    234: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e, i) {
            var s = i[0],
                n = i[1],
                r = i[2];
            return t[0] = e[0] * s, t[1] = e[1] * s, t[2] = e[2] * s, t[3] = e[3] * s, t[4] = e[4] * n, t[5] = e[5] * n, t[6] = e[6] * n, t[7] = e[7] * n, t[8] = e[8] * r, t[9] = e[9] * r, t[10] = e[10] * r, t[11] = e[11] * r, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }
    }, {}],
    235: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.setMatrixArrayType = function(t) {
            i.ARRAY_TYPE = s = t
        }, i.toRadian = function(t) {
            return t * r
        }, i.equals = function(t, e) {
            return Math.abs(t - e) <= 1e-6 * Math.max(1, Math.abs(t), Math.abs(e))
        }, i.RANDOM = i.ARRAY_TYPE = i.EPSILON = void 0;
        i.EPSILON = 1e-6;
        var s = "undefined" != typeof Float32Array ? Float32Array : Array;
        i.ARRAY_TYPE = s;
        var n = Math.random;
        i.RANDOM = n;
        var r = Math.PI / 180;
        Math.hypot || (Math.hypot = function() {
            for (var t = 0, e = arguments.length; e--;) t += arguments[e] * arguments[e];
            return Math.sqrt(t)
        })
    }, {}],
    236: [function(t, e, i) {
        "use strict";

        function s(t) {
            return (s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            })(t)
        }
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.create = function() {
            var t = new n.ARRAY_TYPE(16);
            n.ARRAY_TYPE != Float32Array && (t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0);
            return t[0] = 1, t[5] = 1, t[10] = 1, t[15] = 1, t
        }, i.clone = function(t) {
            var e = new n.ARRAY_TYPE(16);
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
        }, i.copy = function(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }, i.fromValues = function(t, e, i, s, r, A, o, a, h, l, c, u, d, m, p, g) {
            var f = new n.ARRAY_TYPE(16);
            return f[0] = t, f[1] = e, f[2] = i, f[3] = s, f[4] = r, f[5] = A, f[6] = o, f[7] = a, f[8] = h, f[9] = l, f[10] = c, f[11] = u, f[12] = d, f[13] = m, f[14] = p, f[15] = g, f
        }, i.set = function(t, e, i, s, n, r, A, o, a, h, l, c, u, d, m, p, g) {
            return t[0] = e, t[1] = i, t[2] = s, t[3] = n, t[4] = r, t[5] = A, t[6] = o, t[7] = a, t[8] = h, t[9] = l, t[10] = c, t[11] = u, t[12] = d, t[13] = m, t[14] = p, t[15] = g, t
        }, i.identity = A, i.transpose = function(t, e) {
            if (t === e) {
                var i = e[1],
                    s = e[2],
                    n = e[3],
                    r = e[6],
                    A = e[7],
                    o = e[11];
                t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = i, t[6] = e[9], t[7] = e[13], t[8] = s, t[9] = r, t[11] = e[14], t[12] = n, t[13] = A, t[14] = o
            } else t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15];
            return t
        }, i.invert = function(t, e) {
            var i = e[0],
                s = e[1],
                n = e[2],
                r = e[3],
                A = e[4],
                o = e[5],
                a = e[6],
                h = e[7],
                l = e[8],
                c = e[9],
                u = e[10],
                d = e[11],
                m = e[12],
                p = e[13],
                g = e[14],
                f = e[15],
                y = i * o - s * A,
                I = i * a - n * A,
                v = i * h - r * A,
                E = s * a - n * o,
                b = s * h - r * o,
                _ = n * h - r * a,
                C = l * p - c * m,
                w = l * g - u * m,
                x = l * f - d * m,
                T = c * g - u * p,
                S = c * f - d * p,
                M = u * f - d * g,
                O = y * M - I * S + v * T + E * x - b * w + _ * C;
            if (!O) return null;
            return O = 1 / O, t[0] = (o * M - a * S + h * T) * O, t[1] = (n * S - s * M - r * T) * O, t[2] = (p * _ - g * b + f * E) * O, t[3] = (u * b - c * _ - d * E) * O, t[4] = (a * x - A * M - h * w) * O, t[5] = (i * M - n * x + r * w) * O, t[6] = (g * v - m * _ - f * I) * O, t[7] = (l * _ - u * v + d * I) * O, t[8] = (A * S - o * x + h * C) * O, t[9] = (s * x - i * S - r * C) * O, t[10] = (m * b - p * v + f * y) * O, t[11] = (c * v - l * b - d * y) * O, t[12] = (o * w - A * T - a * C) * O, t[13] = (i * T - s * w + n * C) * O, t[14] = (p * I - m * E - g * y) * O, t[15] = (l * E - c * I + u * y) * O, t
        }, i.adjoint = function(t, e) {
            var i = e[0],
                s = e[1],
                n = e[2],
                r = e[3],
                A = e[4],
                o = e[5],
                a = e[6],
                h = e[7],
                l = e[8],
                c = e[9],
                u = e[10],
                d = e[11],
                m = e[12],
                p = e[13],
                g = e[14],
                f = e[15];
            return t[0] = o * (u * f - d * g) - c * (a * f - h * g) + p * (a * d - h * u), t[1] = -(s * (u * f - d * g) - c * (n * f - r * g) + p * (n * d - r * u)), t[2] = s * (a * f - h * g) - o * (n * f - r * g) + p * (n * h - r * a), t[3] = -(s * (a * d - h * u) - o * (n * d - r * u) + c * (n * h - r * a)), t[4] = -(A * (u * f - d * g) - l * (a * f - h * g) + m * (a * d - h * u)), t[5] = i * (u * f - d * g) - l * (n * f - r * g) + m * (n * d - r * u), t[6] = -(i * (a * f - h * g) - A * (n * f - r * g) + m * (n * h - r * a)), t[7] = i * (a * d - h * u) - A * (n * d - r * u) + l * (n * h - r * a), t[8] = A * (c * f - d * p) - l * (o * f - h * p) + m * (o * d - h * c), t[9] = -(i * (c * f - d * p) - l * (s * f - r * p) + m * (s * d - r * c)), t[10] = i * (o * f - h * p) - A * (s * f - r * p) + m * (s * h - r * o), t[11] = -(i * (o * d - h * c) - A * (s * d - r * c) + l * (s * h - r * o)), t[12] = -(A * (c * g - u * p) - l * (o * g - a * p) + m * (o * u - a * c)), t[13] = i * (c * g - u * p) - l * (s * g - n * p) + m * (s * u - n * c), t[14] = -(i * (o * g - a * p) - A * (s * g - n * p) + m * (s * a - n * o)), t[15] = i * (o * u - a * c) - A * (s * u - n * c) + l * (s * a - n * o), t
        }, i.determinant = function(t) {
            var e = t[0],
                i = t[1],
                s = t[2],
                n = t[3],
                r = t[4],
                A = t[5],
                o = t[6],
                a = t[7],
                h = t[8],
                l = t[9],
                c = t[10],
                u = t[11],
                d = t[12],
                m = t[13],
                p = t[14],
                g = t[15];
            return (e * A - i * r) * (c * g - u * p) - (e * o - s * r) * (l * g - u * m) + (e * a - n * r) * (l * p - c * m) + (i * o - s * A) * (h * g - u * d) - (i * a - n * A) * (h * p - c * d) + (s * a - n * o) * (h * m - l * d)
        }, i.multiply = o, i.translate = function(t, e, i) {
            var s, n, r, A, o, a, h, l, c, u, d, m, p = i[0],
                g = i[1],
                f = i[2];
            e === t ? (t[12] = e[0] * p + e[4] * g + e[8] * f + e[12], t[13] = e[1] * p + e[5] * g + e[9] * f + e[13], t[14] = e[2] * p + e[6] * g + e[10] * f + e[14], t[15] = e[3] * p + e[7] * g + e[11] * f + e[15]) : (s = e[0], n = e[1], r = e[2], A = e[3], o = e[4], a = e[5], h = e[6], l = e[7], c = e[8], u = e[9], d = e[10], m = e[11], t[0] = s, t[1] = n, t[2] = r, t[3] = A, t[4] = o, t[5] = a, t[6] = h, t[7] = l, t[8] = c, t[9] = u, t[10] = d, t[11] = m, t[12] = s * p + o * g + c * f + e[12], t[13] = n * p + a * g + u * f + e[13], t[14] = r * p + h * g + d * f + e[14], t[15] = A * p + l * g + m * f + e[15]);
            return t
        }, i.scale = function(t, e, i) {
            var s = i[0],
                n = i[1],
                r = i[2];
            return t[0] = e[0] * s, t[1] = e[1] * s, t[2] = e[2] * s, t[3] = e[3] * s, t[4] = e[4] * n, t[5] = e[5] * n, t[6] = e[6] * n, t[7] = e[7] * n, t[8] = e[8] * r, t[9] = e[9] * r, t[10] = e[10] * r, t[11] = e[11] * r, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }, i.rotate = function(t, e, i, s) {
            var r, A, o, a, h, l, c, u, d, m, p, g, f, y, I, v, E, b, _, C, w, x, T, S, M = s[0],
                O = s[1],
                D = s[2],
                R = Math.hypot(M, O, D);
            if (R < n.EPSILON) return null;
            M *= R = 1 / R, O *= R, D *= R, r = Math.sin(i), A = Math.cos(i), o = 1 - A, a = e[0], h = e[1], l = e[2], c = e[3], u = e[4], d = e[5], m = e[6], p = e[7], g = e[8], f = e[9], y = e[10], I = e[11], v = M * M * o + A, E = O * M * o + D * r, b = D * M * o - O * r, _ = M * O * o - D * r, C = O * O * o + A, w = D * O * o + M * r, x = M * D * o + O * r, T = O * D * o - M * r, S = D * D * o + A, t[0] = a * v + u * E + g * b, t[1] = h * v + d * E + f * b, t[2] = l * v + m * E + y * b, t[3] = c * v + p * E + I * b, t[4] = a * _ + u * C + g * w, t[5] = h * _ + d * C + f * w, t[6] = l * _ + m * C + y * w, t[7] = c * _ + p * C + I * w, t[8] = a * x + u * T + g * S, t[9] = h * x + d * T + f * S, t[10] = l * x + m * T + y * S, t[11] = c * x + p * T + I * S, e !== t && (t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t
        }, i.rotateX = function(t, e, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = e[4],
                A = e[5],
                o = e[6],
                a = e[7],
                h = e[8],
                l = e[9],
                c = e[10],
                u = e[11];
            e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[4] = r * n + h * s, t[5] = A * n + l * s, t[6] = o * n + c * s, t[7] = a * n + u * s, t[8] = h * n - r * s, t[9] = l * n - A * s, t[10] = c * n - o * s, t[11] = u * n - a * s, t
        }, i.rotateY = function(t, e, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = e[0],
                A = e[1],
                o = e[2],
                a = e[3],
                h = e[8],
                l = e[9],
                c = e[10],
                u = e[11];
            e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[0] = r * n - h * s, t[1] = A * n - l * s, t[2] = o * n - c * s, t[3] = a * n - u * s, t[8] = r * s + h * n, t[9] = A * s + l * n, t[10] = o * s + c * n, t[11] = a * s + u * n, t
        }, i.rotateZ = function(t, e, i) {
            var s = Math.sin(i),
                n = Math.cos(i),
                r = e[0],
                A = e[1],
                o = e[2],
                a = e[3],
                h = e[4],
                l = e[5],
                c = e[6],
                u = e[7];
            e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            return t[0] = r * n + h * s, t[1] = A * n + l * s, t[2] = o * n + c * s, t[3] = a * n + u * s, t[4] = h * n - r * s, t[5] = l * n - A * s, t[6] = c * n - o * s, t[7] = u * n - a * s, t
        }, i.fromTranslation = function(t, e) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = e[0], t[13] = e[1], t[14] = e[2], t[15] = 1, t
        }, i.fromScaling = function(t, e) {
            return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromRotation = function(t, e, i) {
            var s, r, A, o = i[0],
                a = i[1],
                h = i[2],
                l = Math.hypot(o, a, h);
            if (l < n.EPSILON) return null;
            return o *= l = 1 / l, a *= l, h *= l, s = Math.sin(e), r = Math.cos(e), A = 1 - r, t[0] = o * o * A + r, t[1] = a * o * A + h * s, t[2] = h * o * A - a * s, t[3] = 0, t[4] = o * a * A - h * s, t[5] = a * a * A + r, t[6] = h * a * A + o * s, t[7] = 0, t[8] = o * h * A + a * s, t[9] = a * h * A - o * s, t[10] = h * h * A + r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromXRotation = function(t, e) {
            var i = Math.sin(e),
                s = Math.cos(e);
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = s, t[6] = i, t[7] = 0, t[8] = 0, t[9] = -i, t[10] = s, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromYRotation = function(t, e) {
            var i = Math.sin(e),
                s = Math.cos(e);
            return t[0] = s, t[1] = 0, t[2] = -i, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = i, t[9] = 0, t[10] = s, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromZRotation = function(t, e) {
            var i = Math.sin(e),
                s = Math.cos(e);
            return t[0] = s, t[1] = i, t[2] = 0, t[3] = 0, t[4] = -i, t[5] = s, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromRotationTranslation = a, i.fromQuat2 = function(t, e) {
            var i = new n.ARRAY_TYPE(3),
                s = -e[0],
                r = -e[1],
                A = -e[2],
                o = e[3],
                h = e[4],
                l = e[5],
                c = e[6],
                u = e[7],
                d = s * s + r * r + A * A + o * o;
            d > 0 ? (i[0] = 2 * (h * o + u * s + l * A - c * r) / d, i[1] = 2 * (l * o + u * r + c * s - h * A) / d, i[2] = 2 * (c * o + u * A + h * r - l * s) / d) : (i[0] = 2 * (h * o + u * s + l * A - c * r), i[1] = 2 * (l * o + u * r + c * s - h * A), i[2] = 2 * (c * o + u * A + h * r - l * s));
            return a(t, e, i), t
        }, i.getTranslation = function(t, e) {
            return t[0] = e[12], t[1] = e[13], t[2] = e[14], t
        }, i.getScaling = h, i.getRotation = function(t, e) {
            var i = new n.ARRAY_TYPE(3);
            h(i, e);
            var s = 1 / i[0],
                r = 1 / i[1],
                A = 1 / i[2],
                o = e[0] * s,
                a = e[1] * r,
                l = e[2] * A,
                c = e[4] * s,
                u = e[5] * r,
                d = e[6] * A,
                m = e[8] * s,
                p = e[9] * r,
                g = e[10] * A,
                f = o + u + g,
                y = 0;
            f > 0 ? (y = 2 * Math.sqrt(f + 1), t[3] = .25 * y, t[0] = (d - p) / y, t[1] = (m - l) / y, t[2] = (a - c) / y) : o > u && o > g ? (y = 2 * Math.sqrt(1 + o - u - g), t[3] = (d - p) / y, t[0] = .25 * y, t[1] = (a + c) / y, t[2] = (m + l) / y) : u > g ? (y = 2 * Math.sqrt(1 + u - o - g), t[3] = (m - l) / y, t[0] = (a + c) / y, t[1] = .25 * y, t[2] = (d + p) / y) : (y = 2 * Math.sqrt(1 + g - o - u), t[3] = (a - c) / y, t[0] = (m + l) / y, t[1] = (d + p) / y, t[2] = .25 * y);
            return t
        }, i.fromRotationTranslationScale = function(t, e, i, s) {
            var n = e[0],
                r = e[1],
                A = e[2],
                o = e[3],
                a = n + n,
                h = r + r,
                l = A + A,
                c = n * a,
                u = n * h,
                d = n * l,
                m = r * h,
                p = r * l,
                g = A * l,
                f = o * a,
                y = o * h,
                I = o * l,
                v = s[0],
                E = s[1],
                b = s[2];
            return t[0] = (1 - (m + g)) * v, t[1] = (u + I) * v, t[2] = (d - y) * v, t[3] = 0, t[4] = (u - I) * E, t[5] = (1 - (c + g)) * E, t[6] = (p + f) * E, t[7] = 0, t[8] = (d + y) * b, t[9] = (p - f) * b, t[10] = (1 - (c + m)) * b, t[11] = 0, t[12] = i[0], t[13] = i[1], t[14] = i[2], t[15] = 1, t
        }, i.fromRotationTranslationScaleOrigin = function(t, e, i, s, n) {
            var r = e[0],
                A = e[1],
                o = e[2],
                a = e[3],
                h = r + r,
                l = A + A,
                c = o + o,
                u = r * h,
                d = r * l,
                m = r * c,
                p = A * l,
                g = A * c,
                f = o * c,
                y = a * h,
                I = a * l,
                v = a * c,
                E = s[0],
                b = s[1],
                _ = s[2],
                C = n[0],
                w = n[1],
                x = n[2],
                T = (1 - (p + f)) * E,
                S = (d + v) * E,
                M = (m - I) * E,
                O = (d - v) * b,
                D = (1 - (u + f)) * b,
                R = (g + y) * b,
                N = (m + I) * _,
                P = (g - y) * _,
                F = (1 - (u + p)) * _;
            return t[0] = T, t[1] = S, t[2] = M, t[3] = 0, t[4] = O, t[5] = D, t[6] = R, t[7] = 0, t[8] = N, t[9] = P, t[10] = F, t[11] = 0, t[12] = i[0] + C - (T * C + O * w + N * x), t[13] = i[1] + w - (S * C + D * w + P * x), t[14] = i[2] + x - (M * C + R * w + F * x), t[15] = 1, t
        }, i.fromQuat = function(t, e) {
            var i = e[0],
                s = e[1],
                n = e[2],
                r = e[3],
                A = i + i,
                o = s + s,
                a = n + n,
                h = i * A,
                l = s * A,
                c = s * o,
                u = n * A,
                d = n * o,
                m = n * a,
                p = r * A,
                g = r * o,
                f = r * a;
            return t[0] = 1 - c - m, t[1] = l + f, t[2] = u - g, t[3] = 0, t[4] = l - f, t[5] = 1 - h - m, t[6] = d + p, t[7] = 0, t[8] = u + g, t[9] = d - p, t[10] = 1 - h - c, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.frustum = function(t, e, i, s, n, r, A) {
            var o = 1 / (i - e),
                a = 1 / (n - s),
                h = 1 / (r - A);
            return t[0] = 2 * r * o, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * r * a, t[6] = 0, t[7] = 0, t[8] = (i + e) * o, t[9] = (n + s) * a, t[10] = (A + r) * h, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = A * r * 2 * h, t[15] = 0, t
        }, i.perspective = function(t, e, i, s, n) {
            var r, A = 1 / Math.tan(e / 2);
            t[0] = A / i, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = A, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[11] = -1, t[12] = 0, t[13] = 0, t[15] = 0, null != n && n !== 1 / 0 ? (r = 1 / (s - n), t[10] = (n + s) * r, t[14] = 2 * n * s * r) : (t[10] = -1, t[14] = -2 * s);
            return t
        }, i.perspectiveFromFieldOfView = function(t, e, i, s) {
            var n = Math.tan(e.upDegrees * Math.PI / 180),
                r = Math.tan(e.downDegrees * Math.PI / 180),
                A = Math.tan(e.leftDegrees * Math.PI / 180),
                o = Math.tan(e.rightDegrees * Math.PI / 180),
                a = 2 / (A + o),
                h = 2 / (n + r);
            return t[0] = a, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = h, t[6] = 0, t[7] = 0, t[8] = -(A - o) * a * .5, t[9] = (n - r) * h * .5, t[10] = s / (i - s), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = s * i / (i - s), t[15] = 0, t
        }, i.ortho = function(t, e, i, s, n, r, A) {
            var o = 1 / (e - i),
                a = 1 / (s - n),
                h = 1 / (r - A);
            return t[0] = -2 * o, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * a, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * h, t[11] = 0, t[12] = (e + i) * o, t[13] = (n + s) * a, t[14] = (A + r) * h, t[15] = 1, t
        }, i.lookAt = function(t, e, i, s) {
            var r, o, a, h, l, c, u, d, m, p, g = e[0],
                f = e[1],
                y = e[2],
                I = s[0],
                v = s[1],
                E = s[2],
                b = i[0],
                _ = i[1],
                C = i[2];
            if (Math.abs(g - b) < n.EPSILON && Math.abs(f - _) < n.EPSILON && Math.abs(y - C) < n.EPSILON) return A(t);
            u = g - b, d = f - _, m = y - C, p = 1 / Math.hypot(u, d, m), r = v * (m *= p) - E * (d *= p), o = E * (u *= p) - I * m, a = I * d - v * u, (p = Math.hypot(r, o, a)) ? (r *= p = 1 / p, o *= p, a *= p) : (r = 0, o = 0, a = 0);
            h = d * a - m * o, l = m * r - u * a, c = u * o - d * r, (p = Math.hypot(h, l, c)) ? (h *= p = 1 / p, l *= p, c *= p) : (h = 0, l = 0, c = 0);
            return t[0] = r, t[1] = h, t[2] = u, t[3] = 0, t[4] = o, t[5] = l, t[6] = d, t[7] = 0, t[8] = a, t[9] = c, t[10] = m, t[11] = 0, t[12] = -(r * g + o * f + a * y), t[13] = -(h * g + l * f + c * y), t[14] = -(u * g + d * f + m * y), t[15] = 1, t
        }, i.targetTo = function(t, e, i, s) {
            var n = e[0],
                r = e[1],
                A = e[2],
                o = s[0],
                a = s[1],
                h = s[2],
                l = n - i[0],
                c = r - i[1],
                u = A - i[2],
                d = l * l + c * c + u * u;
            d > 0 && (d = 1 / Math.sqrt(d), l *= d, c *= d, u *= d);
            var m = a * u - h * c,
                p = h * l - o * u,
                g = o * c - a * l;
            (d = m * m + p * p + g * g) > 0 && (d = 1 / Math.sqrt(d), m *= d, p *= d, g *= d);
            return t[0] = m, t[1] = p, t[2] = g, t[3] = 0, t[4] = c * g - u * p, t[5] = u * m - l * g, t[6] = l * p - c * m, t[7] = 0, t[8] = l, t[9] = c, t[10] = u, t[11] = 0, t[12] = n, t[13] = r, t[14] = A, t[15] = 1, t
        }, i.str = function(t) {
            return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")"
        }, i.frob = function(t) {
            return Math.hypot(t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15])
        }, i.add = function(t, e, i) {
            return t[0] = e[0] + i[0], t[1] = e[1] + i[1], t[2] = e[2] + i[2], t[3] = e[3] + i[3], t[4] = e[4] + i[4], t[5] = e[5] + i[5], t[6] = e[6] + i[6], t[7] = e[7] + i[7], t[8] = e[8] + i[8], t[9] = e[9] + i[9], t[10] = e[10] + i[10], t[11] = e[11] + i[11], t[12] = e[12] + i[12], t[13] = e[13] + i[13], t[14] = e[14] + i[14], t[15] = e[15] + i[15], t
        }, i.subtract = l, i.multiplyScalar = function(t, e, i) {
            return t[0] = e[0] * i, t[1] = e[1] * i, t[2] = e[2] * i, t[3] = e[3] * i, t[4] = e[4] * i, t[5] = e[5] * i, t[6] = e[6] * i, t[7] = e[7] * i, t[8] = e[8] * i, t[9] = e[9] * i, t[10] = e[10] * i, t[11] = e[11] * i, t[12] = e[12] * i, t[13] = e[13] * i, t[14] = e[14] * i, t[15] = e[15] * i, t
        }, i.multiplyScalarAndAdd = function(t, e, i, s) {
            return t[0] = e[0] + i[0] * s, t[1] = e[1] + i[1] * s, t[2] = e[2] + i[2] * s, t[3] = e[3] + i[3] * s, t[4] = e[4] + i[4] * s, t[5] = e[5] + i[5] * s, t[6] = e[6] + i[6] * s, t[7] = e[7] + i[7] * s, t[8] = e[8] + i[8] * s, t[9] = e[9] + i[9] * s, t[10] = e[10] + i[10] * s, t[11] = e[11] + i[11] * s, t[12] = e[12] + i[12] * s, t[13] = e[13] + i[13] * s, t[14] = e[14] + i[14] * s, t[15] = e[15] + i[15] * s, t
        }, i.exactEquals = function(t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8] && t[9] === e[9] && t[10] === e[10] && t[11] === e[11] && t[12] === e[12] && t[13] === e[13] && t[14] === e[14] && t[15] === e[15]
        }, i.equals = function(t, e) {
            var i = t[0],
                s = t[1],
                r = t[2],
                A = t[3],
                o = t[4],
                a = t[5],
                h = t[6],
                l = t[7],
                c = t[8],
                u = t[9],
                d = t[10],
                m = t[11],
                p = t[12],
                g = t[13],
                f = t[14],
                y = t[15],
                I = e[0],
                v = e[1],
                E = e[2],
                b = e[3],
                _ = e[4],
                C = e[5],
                w = e[6],
                x = e[7],
                T = e[8],
                S = e[9],
                M = e[10],
                O = e[11],
                D = e[12],
                R = e[13],
                N = e[14],
                P = e[15];
            return Math.abs(i - I) <= n.EPSILON * Math.max(1, Math.abs(i), Math.abs(I)) && Math.abs(s - v) <= n.EPSILON * Math.max(1, Math.abs(s), Math.abs(v)) && Math.abs(r - E) <= n.EPSILON * Math.max(1, Math.abs(r), Math.abs(E)) && Math.abs(A - b) <= n.EPSILON * Math.max(1, Math.abs(A), Math.abs(b)) && Math.abs(o - _) <= n.EPSILON * Math.max(1, Math.abs(o), Math.abs(_)) && Math.abs(a - C) <= n.EPSILON * Math.max(1, Math.abs(a), Math.abs(C)) && Math.abs(h - w) <= n.EPSILON * Math.max(1, Math.abs(h), Math.abs(w)) && Math.abs(l - x) <= n.EPSILON * Math.max(1, Math.abs(l), Math.abs(x)) && Math.abs(c - T) <= n.EPSILON * Math.max(1, Math.abs(c), Math.abs(T)) && Math.abs(u - S) <= n.EPSILON * Math.max(1, Math.abs(u), Math.abs(S)) && Math.abs(d - M) <= n.EPSILON * Math.max(1, Math.abs(d), Math.abs(M)) && Math.abs(m - O) <= n.EPSILON * Math.max(1, Math.abs(m), Math.abs(O)) && Math.abs(p - D) <= n.EPSILON * Math.max(1, Math.abs(p), Math.abs(D)) && Math.abs(g - R) <= n.EPSILON * Math.max(1, Math.abs(g), Math.abs(R)) && Math.abs(f - N) <= n.EPSILON * Math.max(1, Math.abs(f), Math.abs(N)) && Math.abs(y - P) <= n.EPSILON * Math.max(1, Math.abs(y), Math.abs(P))
        }, i.sub = i.mul = void 0;
        var n = function(t) {
            if (t && t.__esModule) return t;
            if (null === t || "object" !== s(t) && "function" != typeof t) return {
                default: t
            };
            var e = r();
            if (e && e.has(t)) return e.get(t);
            var i = {},
                n = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (var A in t)
                if (Object.prototype.hasOwnProperty.call(t, A)) {
                    var o = n ? Object.getOwnPropertyDescriptor(t, A) : null;
                    o && (o.get || o.set) ? Object.defineProperty(i, A, o) : i[A] = t[A]
                }
            i.default = t, e && e.set(t, i);
            return i
        }(t(235));

        function r() {
            if ("function" != typeof WeakMap) return null;
            var t = new WeakMap;
            return r = function() {
                return t
            }, t
        }

        function A(t) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }

        function o(t, e, i) {
            var s = e[0],
                n = e[1],
                r = e[2],
                A = e[3],
                o = e[4],
                a = e[5],
                h = e[6],
                l = e[7],
                c = e[8],
                u = e[9],
                d = e[10],
                m = e[11],
                p = e[12],
                g = e[13],
                f = e[14],
                y = e[15],
                I = i[0],
                v = i[1],
                E = i[2],
                b = i[3];
            return t[0] = I * s + v * o + E * c + b * p, t[1] = I * n + v * a + E * u + b * g, t[2] = I * r + v * h + E * d + b * f, t[3] = I * A + v * l + E * m + b * y, I = i[4], v = i[5], E = i[6], b = i[7], t[4] = I * s + v * o + E * c + b * p, t[5] = I * n + v * a + E * u + b * g, t[6] = I * r + v * h + E * d + b * f, t[7] = I * A + v * l + E * m + b * y, I = i[8], v = i[9], E = i[10], b = i[11], t[8] = I * s + v * o + E * c + b * p, t[9] = I * n + v * a + E * u + b * g, t[10] = I * r + v * h + E * d + b * f, t[11] = I * A + v * l + E * m + b * y, I = i[12], v = i[13], E = i[14], b = i[15], t[12] = I * s + v * o + E * c + b * p, t[13] = I * n + v * a + E * u + b * g, t[14] = I * r + v * h + E * d + b * f, t[15] = I * A + v * l + E * m + b * y, t
        }

        function a(t, e, i) {
            var s = e[0],
                n = e[1],
                r = e[2],
                A = e[3],
                o = s + s,
                a = n + n,
                h = r + r,
                l = s * o,
                c = s * a,
                u = s * h,
                d = n * a,
                m = n * h,
                p = r * h,
                g = A * o,
                f = A * a,
                y = A * h;
            return t[0] = 1 - (d + p), t[1] = c + y, t[2] = u - f, t[3] = 0, t[4] = c - y, t[5] = 1 - (l + p), t[6] = m + g, t[7] = 0, t[8] = u + f, t[9] = m - g, t[10] = 1 - (l + d), t[11] = 0, t[12] = i[0], t[13] = i[1], t[14] = i[2], t[15] = 1, t
        }

        function h(t, e) {
            var i = e[0],
                s = e[1],
                n = e[2],
                r = e[4],
                A = e[5],
                o = e[6],
                a = e[8],
                h = e[9],
                l = e[10];
            return t[0] = Math.hypot(i, s, n), t[1] = Math.hypot(r, A, o), t[2] = Math.hypot(a, h, l), t
        }

        function l(t, e, i) {
            return t[0] = e[0] - i[0], t[1] = e[1] - i[1], t[2] = e[2] - i[2], t[3] = e[3] - i[3], t[4] = e[4] - i[4], t[5] = e[5] - i[5], t[6] = e[6] - i[6], t[7] = e[7] - i[7], t[8] = e[8] - i[8], t[9] = e[9] - i[9], t[10] = e[10] - i[10], t[11] = e[11] - i[11], t[12] = e[12] - i[12], t[13] = e[13] - i[13], t[14] = e[14] - i[14], t[15] = e[15] - i[15], t
        }
        var c = o;
        i.mul = c;
        var u = l;
        i.sub = u
    }, {
        235: 235
    }],
    237: [function(t, e, i) {
        "use strict";
        e.exports = {
            EnhancementComponent: t(242),
            LocalNav: t(251),
            FacesGallery: t(244),
            CopyFade: t(240),
            Hero: t(249),
            BOSensorSticky: t(238),
            FitnessHero: t(247),
            FitnessHardware: t(246),
            FitnessCopy: t(245),
            SoloLoop: t(253),
            SoloLoopCopy: t(254),
            Faces: t(243),
            FitnessPlus: t(248),
            Display: t(241),
            Motivation: t(252),
            Connected: t(239)
        }
    }, {
        238: 238,
        239: 239,
        240: 240,
        241: 241,
        242: 242,
        243: 243,
        244: 244,
        245: 245,
        246: 246,
        247: 247,
        248: 248,
        249: 249,
        251: 251,
        252: 252,
        253: 253,
        254: 254
    }],
    238: [function(t, e, i) {
        "use strict";
        var s = t(74)(t(63)),
            n = t(259);
        const r = t(156),
            A = t(257),
            o = t(258);
        var a = A.forceBOStickyEnhanced;
        a && (a = "string" != typeof a || "0" !== a && "false" !== a);
        e.exports = class extends r {
            constructor(t) {
                super(t), this.scrollGroup = this.anim.getGroupForTarget(this.el), this.flowVideoContainer = document.querySelector(".sc-video-container"), this.options = t, this.disabledWhen = ["static-layout", "no-bo-sensor-enhanced", "no-enhanced-layout"], this.manifest = this.el.querySelector(".sc-manifest"), this.manifestLarge = this.manifest.getAttribute("data-manifest-large"), this.manifestMedium = this.manifest.getAttribute("data-manifest-medium"), this.manifestSmall = this.manifest.getAttribute("data-manifest-small")
            }
            mounted() {
                this.initVideo(), this.setupAX()
            }
            onBreakpointChange(t) {
                this.initFlow(t.breakpoint)
            }
            setGoodToGo(t) {
                var e;
                this.goodToGo = t, this.flow.hasFullyLoaded || this.flow.destroyed || (e = t, a && (e = a, console.log("Forcing bo-sensor sticky section to ".concat(e ? "enhanced" : "static", "."))), document.documentElement.classList.toggle("no-bo-sensor-enhanced", !e), document.documentElement.classList.toggle("bo-sensor-enhanced", e), this.anim.forceUpdate(), t || (this.flow.imageLoadQueue && this.flow.stopLoading(), this.flow.destroy()))
            }
            initVideo() {
                this.initFlow(this.options.pageMetrics.breakpoint);
                const t = this.el.querySelector(".image"),
                    e = this.el.querySelector(".sc-small-sticky-container"),
                    i = this.el.querySelector(".sc-main-small");
                this.setGoodToGo(!0), this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: n.animation.willChange.start,
                    end: n.animation.willChange.end,
                    cssClass: n.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                }), this.anim.addEvent(i, {
                    start: "t - 100vh",
                    breakpointMask: "S",
                    event: "bo-sensor-go-no-go-small",
                    disabledWhen: this.disabledWhen,
                    onEvent: () => {
                        this.setGoodToGo(!1)
                    },
                    onEventReverse: () => {
                        this.setGoodToGo(!0)
                    }
                }), this.anim.addKeyframe(t, {
                    anchors: [e],
                    start: "a0t + css(--image-height) / 2 - 50vh - 800px",
                    end: "a0b - css(--image-height) / 2 - 50vh + 250px",
                    progress: [0, 1],
                    easeFunction: "linear",
                    breakpointMask: "S",
                    disabledWhen: this.disabledWhen
                }).controller.on("draw", t => {
                    e.style.setProperty("--progress-video", t.tweenProps.progress.current), this.flow.destroyed || (this.flow.progress = t.tweenProps.progress.current)
                }), this.anim.addKeyframe(t, {
                    anchors: [e],
                    start: "a0t + css(--image-height) / 2 - 50vh",
                    end: "a0b - css(--image-height) / 2 - 50vh - 300px",
                    progressClip: [0, 1],
                    easeFunction: "easeInOutQuad",
                    breakpointMask: "S",
                    disabledWhen: this.disabledWhen
                }).controller.on("draw", t => {
                    e.style.setProperty("--progress-clip", t.tweenProps.progressClip.current)
                });
                const s = this.el.querySelector(".sc-main");
                this.anim.addEvent(s, {
                    start: "t - 100vh",
                    breakpointMask: "MLX",
                    event: "bo-sensor-go-no-go-large",
                    disabledWhen: this.disabledWhen,
                    onEvent: () => {
                        this.setGoodToGo(!1)
                    },
                    onEventReverse: () => {
                        this.setGoodToGo(!0)
                    }
                }), this.anim.addKeyframe(this.el.querySelector(".sc-tile-sensors .sc-copy"), {
                    start: "(t + b) / 2 - 50vh + css(--bo-sensor-copy-fade-bias)",
                    end: "(t + b) / 2 - 50vh + css(--bo-sensor-copy-fade-distance) + css(--bo-sensor-copy-fade-bias)",
                    opacity: [null, 0],
                    ease: .5,
                    breakpointMask: "ML",
                    disabledWhen: this.disabledWhen
                }), this.anim.addKeyframe(this.el.querySelector(".sc-tile-leds .sc-copy"), {
                    start: "(t + b) / 2 - 50vh - css(--bo-sensor-copy-fade-distance) - css(--bo-sensor-copy-fade-bias)",
                    end: "(t + b) / 2 - 50vh - css(--bo-sensor-copy-fade-bias)",
                    opacity: [0, 1],
                    ease: .5,
                    breakpointMask: "ML",
                    disabledWhen: this.disabledWhen
                })
            }
            initFlow(t) {
                this.flow && (this.flow.customOnDestroyHook && (this.flow.customOnDestroyHook(), this.flow.customOnDestroyHook = null), this.flow.imageLoadQueue && this.flow.stopLoading(), this.flow.destroy(), this.flow = null);
                const e = {
                        L: this.manifestLarge,
                        M: this.manifestMedium,
                        S: this.manifestSmall
                    },
                    i = {
                        L: this.el.querySelector(".blood-oxygen-canvas"),
                        M: this.el.querySelector(".blood-oxygen-canvas"),
                        S: this.el.querySelector(".blood-oxygen-canvas-small")
                    };
                this.canvas = i[t], this.flow = new s.default(e[t], this.canvas), window.heroVideoLoaded().then(() => {
                    this.flow.startLoading()
                }), this.flow.on(s.default.Events.Loaded, () => {
                    if (!this.goodToGo) return;
                    this.canvas.classList.add("is-ready");
                    const t = this.scrollGroup.addKeyframe(this.flow, {
                            anchors: [this.flowVideoContainer],
                            start: "a0t + 8a0h",
                            end: "a0b - 100vh + 13a0h",
                            progress: [0, 1],
                            disabledWhen: this.disabledWhen,
                            breakpointMask: "L"
                        }),
                        e = this.scrollGroup.addKeyframe(this.flow, {
                            anchors: [this.flowVideoContainer],
                            start: "a0t - 10a0h",
                            end: "a0b - 100vh + 35a0h",
                            progress: [0, 1],
                            disabledWhen: this.disabledWhen,
                            breakpointMask: "M"
                        });
                    this.flow.customOnDestroyHook = () => {
                        t.remove(), e.remove()
                    }
                })
            }
            setupAX() {
                this.voItems = Array.from(this.el.querySelectorAll(".sc-tile-leds h3")), this.voFocusArray = [], "S" !== this.viewport && this.voItems.forEach(t => {
                    const e = {
                        start: "a0t - 160px",
                        end: "a0b - 160px",
                        anchors: [t],
                        position: "top"
                    };
                    this.voFocusArray.push(new o(t, [t], e))
                })
            }
            static IS_SUPPORTED() {
                return !n.environment.staticLayout
            }
        }
    }, {
        156: 156,
        257: 257,
        258: 258,
        259: 259,
        63: 63,
        74: 74
    }],
    239: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(258);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.viewport = t.pageMetrics.breakpoint
            }
            mounted() {
                this.setupAX()
            }
            setupAX() {
                this.voItems = Array.from(this.el.querySelectorAll("h3")), this.voFocusArray = [], "S" !== this.viewport ? this.voItems.forEach(t => {
                    const e = {
                        start: "a0t + 300px",
                        end: "a0b + 300px",
                        anchors: [t],
                        position: "center"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                }) : this.voItems.forEach(t => {
                    const e = {
                        start: "a0t",
                        end: "a0b",
                        anchors: [t],
                        position: "bottom"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                })
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        258: 258,
        259: 259
    }],
    240: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.buildInElements = Array.from(this.el.querySelectorAll(".anim-text-animate"))
            }
            mounted() {
                this.buildInElements.forEach(t => {
                    const e = t.dataset.buildInAnchor || t,
                        i = t.dataset.buildInStart || "a0t - 90vh",
                        s = t.dataset.buildInStartL || i || "a0t - 90vh",
                        n = t.dataset.buildInStartM || i || "a0t - 90vh",
                        r = t.dataset.buildInStartS || i || "a0t - 90vh",
                        A = t.dataset.buildInEnd,
                        o = t.dataset.buildInEndL || A,
                        a = t.dataset.buildInEndM || A,
                        h = t.dataset.buildInEndS || A;
                    A ? (this.anim.addKeyframe(t, {
                        anchors: [e],
                        start: s,
                        end: s + " + 1px",
                        opacity: [null, 1],
                        y: [null, 0],
                        ease: "0.2",
                        easeFunction: "easeOutQuint",
                        disabledWhen: ["static-layout"],
                        breakpointMask: "L"
                    }), this.anim.addKeyframe(t, {
                        anchors: [e],
                        start: o,
                        end: o + " + 1px",
                        opacity: [1, 0],
                        y: [0, "-60px"],
                        ease: "0.2",
                        easeFunction: "easeOutQuint",
                        disabledWhen: ["static-layout"],
                        breakpointMask: "L"
                    }), this.anim.addKeyframe(t, {
                        anchors: [e],
                        start: n,
                        end: n + " + 1px",
                        opacity: [null, 1],
                        y: [null, 0],
                        ease: "0.2",
                        easeFunction: "easeOutQuint",
                        disabledWhen: ["static-layout"],
                        breakpointMask: "M"
                    }), this.anim.addKeyframe(t, {
                        anchors: [e],
                        start: a,
                        end: a + " + 1px",
                        opacity: [1, 0],
                        y: [0, "-60px"],
                        ease: "0.1",
                        easeFunction: "easeOutQuint",
                        disabledWhen: ["static-layout"],
                        breakpointMask: "M"
                    }), this.anim.addKeyframe(t, {
                        anchors: [e],
                        start: r,
                        end: r + " + 1px",
                        opacity: [null, 1],
                        y: [null, 0],
                        ease: "0.1",
                        easeFunction: "easeOutQuint",
                        disabledWhen: ["static-layout"],
                        breakpointMask: "S"
                    }), this.anim.addKeyframe(t, {
                        anchors: [e],
                        start: h,
                        end: h + " + 1px",
                        opacity: [1, 0],
                        y: [0, "-60px"],
                        ease: "0.1",
                        easeFunction: "easeOutQuint",
                        disabledWhen: ["static-layout"],
                        breakpointMask: "S"
                    })) : (this.anim.addEvent(t, {
                        start: s,
                        anchors: [e],
                        breakpointMask: "L",
                        disabledWhen: ["static-layout"],
                        onEvent: e => {
                            t.classList.add("animated-copy-element")
                        },
                        onEventReverse: e => {
                            t.classList.remove("animated-copy-element")
                        }
                    }), this.anim.addEvent(t, {
                        start: n,
                        anchors: [e],
                        breakpointMask: "M",
                        disabledWhen: ["static-layout"],
                        onEvent: e => {
                            t.classList.add("animated-copy-element")
                        },
                        onEventReverse: e => {
                            t.classList.remove("animated-copy-element")
                        }
                    }), this.anim.addEvent(t, {
                        start: r,
                        anchors: [e],
                        breakpointMask: "S",
                        disabledWhen: ["static-layout"],
                        onEvent: e => {
                            t.classList.add("animated-copy-element")
                        },
                        onEventReverse: e => {
                            t.classList.remove("animated-copy-element")
                        }
                    }))
                })
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        259: 259
    }],
    241: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(258);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.viewport = t.pageMetrics.breakpoint, this.scrollGroup = this.anim.getGroupForTarget(this.el), this.copyList = Array.from(this.el.querySelectorAll(".content-copy h2, .section-block-intro, .copy-block")), this.displayImage = this.el.querySelector(".display-watch"), this.contentMedia = this.el.querySelector(".content-media"), this.parallaxMargin = parseFloat(getComputedStyle(this.el).getPropertyValue("--watchListParallaxMargin")) || 0, this.listItemSpacing = parseFloat(getComputedStyle(this.el).getPropertyValue("--listItemSpacing")) || 0, this.slideInAmount = 25, this.watchListImageTrimBottomSmall = parseFloat(getComputedStyle(this.el).getPropertyValue("--watchListImageTrimBottomSmall")) || 0
            }
            mounted() {
                this.setupAX(), this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: s.animation.willChange.start,
                    end: s.animation.willChange.end,
                    cssClass: s.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                }), this.anim.addEvent(this.el, {
                    anchors: this.el,
                    start: "".concat(s.animation.willChange.start, " - 50vh"),
                    event: "preload-active-image",
                    disabledWhen: this.disabledWhen,
                    onEventOnce: () => {
                        const t = getComputedStyle(this.el).getPropertyValue("--force-load-url");
                        if (t) {
                            const e = new Image;
                            e.src = t
                        } else 0
                    }
                }), (() => {
                    var t = "a0t - 100vh + 300px";
                    this.copyList.forEach(e => {
                        e.classList.contains("section-block-intro") && this.scrollGroup.addKeyframe(this.displayImage, {
                            start: t,
                            cssClass: "is-active",
                            toggle: !0,
                            anchors: [e],
                            breakpointMask: "S",
                            disabledWhen: ["static-layout"]
                        }), this.scrollGroup.addKeyframe(e, {
                            start: t,
                            end: "".concat(t, " + ").concat("20px"),
                            opacity: [0, 1],
                            y: ["prop(slideInAmount, a1)", 0],
                            ease: .15,
                            breakpointMask: "S",
                            anchors: [e, this],
                            disabledWhen: ["static-layout"]
                        })
                    })
                })(), (() => {
                    this.scrollGroup.addKeyframe(this.displayImage, {
                        start: "a0t - 100vh",
                        end: "a0b",
                        y: ["a0t - t + css(--watchListParallaxMargin)", "a0t - t + a0h - css(--watchListImageVisualHeight) - css(--watchListParallaxMargin)"],
                        anchors: [this.el],
                        breakpointMask: "ML",
                        disabledWhen: ["static-layout"]
                    }), this.scrollGroup.addKeyframe(this.displayImage, {
                        start: "t + css(--watchImageStickyPositionY) - 50vh",
                        cssClass: "is-active",
                        toggle: !0,
                        anchors: [this.el, this],
                        breakpointMask: "ML",
                        disabledWhen: ["static-layout"]
                    });
                    this.copyList.forEach(t => {
                        this.scrollGroup.addKeyframe(t, {
                            start: "".concat("t - 80vh", " - ").concat("10px"),
                            end: "".concat("t - 80vh", " + ").concat("10px"),
                            opacity: [0, 1],
                            y: ["prop(slideInAmount, a1)", 0],
                            ease: .15,
                            breakpointMask: "ML",
                            anchors: [this.el, this],
                            disabledWhen: ["static-layout"]
                        })
                    })
                })()
            }
            setupAX() {
                this.voItems = Array.from(this.el.querySelectorAll("h2, h3, p")), this.voDeskItems = Array.from(this.el.querySelectorAll(".copy-block-always-on h3")), this.voFocusArray = [], "S" !== this.viewport ? this.voDeskItems.forEach(t => {
                    const e = {
                        start: "a0t",
                        end: "a0b",
                        anchors: [this.el],
                        position: "center"
                    };
                    this.voFocusArray.push(new r(t, [this.el], e))
                }) : this.voItems.forEach(t => {
                    const e = {
                        start: "a0t",
                        end: "a0b",
                        anchors: [t],
                        position: "top"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                })
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        258: 258,
        259: 259
    }],
    242: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(255),
            A = t(256);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.portraitRatio = Number(Math.round(5 / 16 + "e3") + "e-3"), this.landscapeRatio = Number(Math.round("3.2e3") + "e-3"), this.heightThresholds = {
                    landscape: {
                        s: {
                            min: 226,
                            max: 545
                        },
                        m: {
                            min: 290,
                            max: 1200
                        },
                        l: {
                            min: 640,
                            max: 1400
                        }
                    },
                    portrait: {
                        s: {
                            min: 454,
                            max: 99999
                        },
                        m: {
                            min: 640,
                            max: 1400
                        },
                        l: {
                            min: 690,
                            max: 1600
                        }
                    }
                };
                let e = this.el.attributes["data-fallback-thresholds"];
                e && (this.heightThresholds = this._parseDataThresholdValues(JSON.parse(e.value))), this.pageOptions = t, this.emitter = new r, this.isInitialized = !1
            }
            mounted() {
                this._initialize(this.pageOptions), this.isMounted && "function" == typeof this.isMounted && this.isMounted(arguments), this.isInitialized = !0
            }
            _initialize(t) {
                this._getCurrentOrientation(t.pageMetrics), this._setActiveViewportParameters(t.pageMetrics.breakpoint, t.pageMetrics.windowHeight), "HTML" === this.el.tagName && (this.el.classList.add("sections-visible"), this.isTextZoomed = document.documentElement.classList.contains("text-zoom"), this.el.addEventListener("text-zoom", () => this._checkZoomLevel()))
            }
            _getCurrentOrientation(t) {
                this.activeOrientation = t.windowWidth > t.windowHeight ? "landscape" : "portrait", this.aspectRatio = Number(Math.round(t.windowWidth / t.windowHeight + "e3") + "e-3")
            }
            _setActiveViewportParameters(t, e) {
                t = t.toLowerCase();
                let i = this.heightThresholds[this.activeOrientation][t];
                if (e >= i.min && e <= i.max && this.aspectRatio < this.landscapeRatio && this.aspectRatio > this.portraitRatio) {
                    if (this.shouldEnhance) return;
                    return this._toggleEnhanced(!0), this.gum.anim.forceUpdate(), this.isInitialized && this.handleEnhance && "function" == typeof this.handleEnhance && (this.handleEnhance(i), console.warn("handle enhance", this.handleEnhance), this.gum.anim.forceUpdate({
                        updateActiveKeyframes: !0,
                        waitForNextUpdate: !0
                    })), this.shouldEnhance = !0
                }
                if (!1 === this.shouldEnhance) return;
                this.emitter.emit("event:enhanced-layout");
                const s = new Event("event:enhanced-layout");
                return this.el.dispatchEvent(s), this.isInitialized && this.handleFallback && "function" == typeof this.handleFallback && (this.handleFallback(i), console.warn("handle fallback", this.handleFallback), this.gum.anim.forceUpdate({
                    updateActiveKeyframes: !0,
                    waitForNextUpdate: !0
                })), this._toggleEnhanced(!1), this.gum.anim.forceUpdate({
                    updateActiveKeyframes: !0,
                    waitForNextUpdate: !0
                }), this.shouldEnhance = !1
            }
            _toggleEnhanced(t) {
                if (t) return this.el.classList.add("enhanced-layout"), this.el.classList.remove("static-layout"), void this.emitter.emit("event:should-enhance");
                this.el.classList.remove("enhanced-layout"), this.el.classList.add("static-layout"), this.emitter.emit("event:static-layout")
            }
            _parseDataThresholdValues(t) {
                return A(!0, this.heightThresholds, t)
            }
            _checkZoomLevel() {
                let t = document.documentElement.classList.contains("text-zoom");
                this.isTextZoomed != t && (t ? this._toggleEnhanced(!1) : this._toggleEnhanced(!0), this.isTextZoomed = t)
            }
            onResizeDebounced(t) {
                this._getCurrentOrientation(t), this._setActiveViewportParameters(t.breakpoint, t.windowHeight)
            }
            onBreakpointChange(t) {
                this._getCurrentOrientation(t), this._setActiveViewportParameters(t.breakpoint, t.windowHeight)
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        255: 255,
        256: 256,
        259: 259
    }],
    243: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(250);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.elClass = ".section-".concat(this.el.getAttribute("data-anim-scroll-group")), this.vidEl = this.el.querySelector("video"), this.scrollGroup = this.anim.getGroupForTarget(this.el)
            }
            mounted() {
                this.inlineVideo = new r(this.el), this.initialize()
            }
            initialize() {
                this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: s.animation.willChange.start,
                    end: s.animation.willChange.end,
                    cssClass: s.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                });
                this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.l,
                    event: "engage-large",
                    breakpointMask: "L",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-large", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.m,
                    event: "engage-medium",
                    breakpointMask: "M",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-medium", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.s,
                    event: "engage-small",
                    breakpointMask: "S",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-small", () => {
                    this.play()
                })
            }
            play() {
                this.inlineVideo.state.userPaused || this.inlineVideo._play()
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        250: 250,
        259: 259
    }],
    244: [function(t, e, i) {
        "use strict";
        const s = t(175),
            n = t(181),
            r = t(190),
            A = t(189);
        A.checkForSlideUpdate = function(t) {
            let e = Math.floor((this.position * this.sign + .5 * this.widthOfItem) / this.widthOfItem);
            isNaN(e) || (e !== this.currentIndex || t) && (this.currentIndex = e, this.wrapSlideItems(), this.trigger(this.model.Events.ITEM_CHANGE_OCCURRED, {
                gallery: this,
                current: this.currentItem
            }))
        };
        const o = t(191),
            a = t(184),
            h = t(186),
            l = t(187),
            c = t(178),
            u = {
                beforeCreate() {
                    this.model.PrefersReducedMotion = document.documentElement.classList.contains("prefers-reduced-motion"), this.model.IsRTL = "rtl" === document.documentElement.getAttribute("dir"), this.model.IsTouch = "ontouchstart" in document.documentElement
                }
            },
            d = s.withMixins(u, n, r, A, o, a, h, l, c);
        e.exports = d
    }, {
        175: 175,
        178: 178,
        181: 181,
        184: 184,
        186: 186,
        187: 187,
        189: 189,
        190: 190,
        191: 191
    }],
    245: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(258);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.viewport = t.pageMetrics.breakpoint
            }
            mounted() {
                this.setupAX()
            }
            setupAX() {
                this.voItems = Array.from(this.el.querySelectorAll("h3")), this.voFocusArray = [], "S" !== this.viewport ? this.voItems.forEach(t => {
                    const e = {
                        start: "a0t",
                        end: "a0b",
                        anchors: [this.el],
                        position: "center"
                    };
                    this.voFocusArray.push(new r(t, [this.el], e))
                }) : this.voItems.forEach(t => {
                    const e = {
                        start: "a0t",
                        end: "a0b",
                        anchors: [t],
                        position: "top"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                })
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        258: 258,
        259: 259
    }],
    246: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(250);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.elClass = ".section-".concat(this.el.getAttribute("data-anim-scroll-group")), this.vidEl = this.el.querySelector("video"), this.scrollGroup = this.anim.getGroupForTarget(this.el)
            }
            mounted() {
                this.inlineVideo = new r(this.el), this.initialize()
            }
            initialize() {
                this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: s.animation.willChange.start,
                    end: s.animation.willChange.end,
                    cssClass: s.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                });
                this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: [".subsection-workouts"],
                    start: "a0b - 100px",
                    event: "engage-large",
                    breakpointMask: "L",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-large", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: [".subsection-workouts"],
                    start: "a0b - 100px",
                    event: "engage-medium",
                    breakpointMask: "M",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-medium", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: [".subsection-workouts"],
                    start: "a0b - 100px",
                    event: "engage-small",
                    breakpointMask: "S",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-small", () => {
                    this.play()
                })
            }
            play() {
                this.inlineVideo.state.userPaused || this.inlineVideo._play()
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        250: 250,
        259: 259
    }],
    247: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(250);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.elClass = ".section-".concat(this.el.getAttribute("data-anim-scroll-group")), this.vidEl = this.el.querySelector("video"), this.scrollGroup = this.anim.getGroupForTarget(this.el)
            }
            mounted() {
                this.inlineVideo = new r(this.el), this.initialize()
            }
            initialize() {
                this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: s.animation.willChange.start,
                    end: s.animation.willChange.end,
                    cssClass: s.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                });
                this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.l,
                    event: "engage-large",
                    breakpointMask: "L",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-large", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.m,
                    event: "engage-medium",
                    breakpointMask: "M",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-medium", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.s,
                    event: "engage-small",
                    breakpointMask: "S",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-small", () => {
                    this.play()
                })
            }
            play() {
                this.inlineVideo.state.userPaused || this.inlineVideo._play()
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        250: 250,
        259: 259
    }],
    248: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156);
        t(250);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.elClass = ".section-".concat(this.el.getAttribute("data-anim-scroll-group")), this.scrollGroup = this.anim.getGroupForTarget(this.el)
            }
            mounted() {
                this.stickyWrapper = this.el.querySelector(".fitness-plus-sticky-wrapper"), this.iphone = this.el.querySelector(".fitness-phone"), this.watch = this.el.querySelector(".fitness-watch"), this.metrics = this.el.querySelector(".fitness-metrics"), this.initialize()
            }
            initialize() {
                this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: s.animation.willChange.start,
                    end: s.animation.willChange.end,
                    cssClass: s.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                }), this.scrollGroup.addKeyframe(this.iphone, {
                    anchors: [".section-fitness-plus"],
                    start: "a0t",
                    end: "a0t + css(--fitnessPlusScrollAmt)",
                    scale: [2.5, 1],
                    x: ["-600px", 0],
                    breakpointMask: "ML",
                    disabledWhen: ["static-layout"]
                }), this.scrollGroup.addKeyframe(this.watch, {
                    anchors: [".section-fitness-plus"],
                    start: "a0t + var(--fitnessPlusScrollAmt) - 100px",
                    cssClass: "animated",
                    toggle: !0,
                    breakpointMask: "ML",
                    disabledWhen: ["static-layout"]
                }), this.scrollGroup.addKeyframe(this.metrics, {
                    anchors: [".section-fitness-plus"],
                    start: "a0t + var(--fitnessPlusScrollAmt) - 300px",
                    cssClass: "animated",
                    toggle: !0,
                    breakpointMask: "ML",
                    disabledWhen: ["static-layout"]
                }), setTimeout(() => {
                    this.scrollGroup.forceUpdate()
                }, 250)
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        250: 250,
        259: 259
    }],
    249: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(250),
            A = t(258);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.elClass = ".section-".concat(this.el.getAttribute("data-anim-scroll-group")), this.vidEl = this.el.querySelector("video"), this.vidContainer = this.el.querySelector(".video-container"), this.glow = this.el.querySelector(".hero-glow"), this.glowInside = this.el.querySelector(".hero-glow-inside"), this.copy = this.el.querySelector(".hero-copy"), this.gutter = this.el.querySelector(".hero-gutter"), this.scrollGroup = this.anim.getGroupForTarget(this.el), this.timelineGroup = this.gum.anim.createTimeGroup(), this.inlineVideo = new r(this.el), window.heroVideoLoaded = () => this.inlineVideo.promises.downloadComplete.then(() => console.log("Hero video loaded"))
            }
            mounted() {
                this.initialize(), this.setupAX(), this.tabbingAX()
            }
            initialize() {
                this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: s.animation.willChange.start,
                    end: s.animation.willChange.end,
                    cssClass: s.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                }), this.inlineVideo._play(), this.vidEl.addEventListener("ended", t => {
                    this.end()
                }), this.scrollGroup.addKeyframe(this.copy, {
                    anchors: this.vidContainer,
                    start: "a0b - 68a0h",
                    end: "a0b",
                    opacity: [0, 1],
                    easeFunction: "easeOutQuint",
                    disabledWhen: ["static-layout"],
                    breakpointMask: "LM"
                }), this.scrollGroup.addKeyframe(this.copy, {
                    anchors: this.vidContainer,
                    start: "a0b - 68a0h",
                    end: "a0b",
                    y: ["5h", "0"],
                    ease: "0.3",
                    easeFunction: "easeOutQuint",
                    disabledWhen: ["static-layout"],
                    breakpointMask: "LM"
                }), this.scrollGroup.addKeyframe(this.glow, {
                    anchors: [this.vidContainer, this.glow],
                    start: "a0t + 100vh",
                    end: "a0b - 200px",
                    y: ["0", "-100a1h"],
                    disabledWhen: ["static-layout"],
                    breakpointMask: "L"
                }), this.scrollGroup.addKeyframe(this.glow, {
                    anchors: [this.vidContainer, this.glow],
                    start: "a0t + 100vh - 200px",
                    end: "a0b",
                    y: ["0", "-100a1h"],
                    disabledWhen: ["static-layout"],
                    breakpointMask: "M"
                })
            }
            tabbingAX() {
                let t, e = this.el.querySelector("a");
                e.addEventListener("focus", i => {
                    let s = this.getCoords(e).top + window.innerHeight / 2;
                    "films-apple-watch-series-6" != t.id && window.scrollTo(0, s)
                }), document.querySelectorAll("a").forEach(e => {
                    e.addEventListener("focus", () => {
                        t = e
                    })
                })
            }
            getCoords(t) {
                var e = t.getBoundingClientRect(),
                    i = document.body,
                    s = document.documentElement,
                    n = window.pageYOffset || s.scrollTop || i.scrollTop,
                    r = window.pageXOffset || s.scrollLeft || i.scrollLeft,
                    A = s.clientTop || i.clientTop || 0,
                    o = s.clientLeft || i.clientLeft || 0,
                    a = e.top + n - A,
                    h = e.left + r - o;
                return {
                    top: Math.round(a),
                    left: Math.round(h)
                }
            }
            end() {
                this.timelineGroup.play(), this.timelineGroup.addKeyframe(this.vidEl, {
                    start: 0,
                    end: 1,
                    opacity: [null, 0],
                    disabledWhen: ["static-layout"],
                    breakpointMask: "LM"
                }), this.timelineGroup.addKeyframe(this.glowInside, {
                    start: 0,
                    end: 1,
                    opacity: [null, 1],
                    disabledWhen: ["static-layout"],
                    breakpointMask: "LM"
                }), this.timelineGroup.addKeyframe(this.gutter, {
                    start: 0,
                    end: 1,
                    opacity: [null, 0],
                    disabledWhen: ["static-layout"],
                    breakpointMask: "LM"
                })
            }
            setupAX() {
                this.stickyContainer = this.el.querySelector(".hero-copy"), this.voItems = Array.from(this.el.querySelectorAll(".hero-headline, .hero-subhead, .hero-intro-copy")), this.voFocusArray = [], this.voItems.forEach(t => {
                    const e = {
                        start: "a0t",
                        end: "a0b",
                        anchors: [this.stickyContainer],
                        position: "center"
                    };
                    this.voFocusArray.push(new A(t, [this.stickyContainer], e))
                })
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        250: 250,
        258: 258,
        259: 259
    }],
    250: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(174);
        e.exports = class {
            constructor(t) {
                this.container = t, this.state = {
                    userPaused: !1,
                    playedOnce: !1,
                    videoControls: !1
                }, this.videoProxy = this._initInlineVideo(t)
            }
            get promises() {
                return this.videoProxy.promises
            }
            _initInlineVideo(t) {
                const e = this.container.querySelector("video"),
                    i = n.newVideoProxy(e, {});
                return this.startFrame = this.container.querySelector(".start-frame"), this.endFrame = this.container.querySelector(".end-frame"), this.videoControlsContainer = this.container.querySelector(".inline-video-controls-container"), this.videoControlsContainer && (this.state.videoControls = !0, this.controls = this.videoControlsContainer.querySelectorAll(".inline-video-controls button"), this.controlBtnTextEl = this.videoControlsContainer.querySelector(".control-button .visuallyhidden span"), this._setupAXControls()), e.addEventListener("ended", () => {
                    this._onVideoEnded()
                }), i
            }
            _play() {
                this.videoProxy.promises.canBePlayedThrough.then(t => (this.startFrame.style.visibility = "hidden", this.endFrame.style.visibility = "hidden", this._updateAXControls("pause"), this.videoProxy.play()))
            }
            _pause() {
                return this.state.userPaused = !0, this._updateAXControls("play"), this.videoProxy.pause()
            }
            _reset() {
                return this._updateAXControls("play", !1), this.videoProxy.gotoAndStop(0)
            }
            _replay() {
                this._reset(), this._play()
            }
            _onVideoEnded() {
                return this.endFrame.style.visibility = "visible", this._updateAXControls("replay")
            }
            _setupAXControls() {
                this.state.videoControls && (this.controlBtn = this.videoControlsContainer.querySelector(".control-button"), this.focusItem = this.container.querySelector(".focus-item"), this.controls[0].disabled = !1, this.controls.forEach((t, e) => {
                    t.setAttribute("tabindex", "-1"), t.setAttribute("aria-hidden", "true"), t.addEventListener("click", () => {
                        this.state.userPaused = !1, 0 === e ? this._play() : 1 === e ? this._pause() : 2 === e && this._replay(), setTimeout(() => {
                            this.focusItem.focus()
                        }, 250)
                    })
                }), this.controlBtn.addEventListener("click", () => {
                    this.videoControlsContainer.querySelector(".inline-video-controls button:not([disabled])").click()
                }))
            }
            _updateAXControls(t, e = !0) {
                this.state.videoControls && (this.controls.forEach(e => {
                    e.classList.contains(t + "-button") ? (e.disabled = !1, this.controlBtnTextEl.textContent = e.querySelector(".icon").textContent) : e.disabled = !0
                }), clearTimeout(this.focusBtnTimeout), clearTimeout(this.focusCtrlBtnTimeout), e && (document.activeElement !== this.controlBtn && document.activeElement !== this.focusItem || (this.focusBtnTimeout = setTimeout(() => {
                    this.videoControlsContainer.querySelector(".inline-video-controls button:not([disabled])").focus()
                }, 300), this.focusCtrlBtnTimeout = setTimeout(() => {
                    this.controlBtn.focus()
                }, 350))))
            }
            get load() {
                return this._load
            }
            get play() {
                return this._play
            }
            get pause() {
                return this._pause
            }
            get reset() {
                return this._reset
            }
            get replay() {
                return this._replay
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        174: 174,
        259: 259
    }],
    251: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156);
        t(228);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.theme = Array.from(document.querySelectorAll("[data-localnav-theme]")), this.title = this.el.querySelector(".ac-ln-title"), this.button = this.el.querySelector(".ac-ln-action-button"), this.actions = this.el.querySelector(".ac-ln-actions"), this.cta = this.el.querySelector(".ac-ln-action-menucta")
            }
            changeColor() {
                this.theme && this.theme.forEach(t => {
                    let e = t.getAttribute("data-localnav-theme"),
                        i = "",
                        s = "";
                    if ("dark" === e) i = "ac-localnav-dark", s = "ac-localnav-light";
                    else {
                        if ("light" !== e) return;
                        i = "ac-localnav-light", s = "ac-localnav-dark"
                    }
                    let n = ".localnav-" + t.getAttribute("data-name"),
                        r = "";
                    r = t.hasAttribute("data-localnav-alt") ? ".localnav-alt-" + t.getAttribute("data-localnav-alt") : n;
                    let A = t.getAttribute("data-start"),
                        o = t.getAttribute("data-end"),
                        a = "";
                    a = document.documentElement.classList.contains("height-fallback") ? r : n, A = A || "a0t - 26px", o = o || "a0b - 26px";
                    let h = this.gum.anim.addKeyframe(this.el, {
                        anchors: [a],
                        start: A,
                        end: o,
                        event: "theme-switch",
                        disabledWhen: ["static-layout"]
                    });
                    h.controller.on("theme-switch:enter", () => {
                        this.el.classList.remove(s), this.el.classList.add(i)
                    }), h.controller.on("theme-switch:exit", () => {
                        this.el.classList.add(s), this.el.classList.remove(i)
                    })
                })
            }
            mounted() {
                this.changeColor()
            }
            handleFallback() {}
            onResizeImmediate(t) {}
            onResizeDebounced(t) {
                super.onResizeDebounced(t)
            }
            onBreakpointChange(t) {
                super.onBreakpointChange(t)
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        228: 228,
        259: 259
    }],
    252: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(258);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.viewport = t.pageMetrics.breakpoint
            }
            mounted() {
                this.setupAX()
            }
            setupAX() {
                this.voItems = Array.from(this.el.querySelectorAll("h3")), this.voFocusArray = [], "S" !== this.viewport ? this.voItems.forEach(t => {
                    const e = {
                        start: "a0t + 300px",
                        end: "a0b + 300px",
                        anchors: [t],
                        position: "center"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                }) : this.voItems.forEach(t => {
                    const e = {
                        start: "a0t",
                        end: "a0b",
                        anchors: [t],
                        position: "bottom"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                })
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        258: 258,
        259: 259
    }],
    253: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(250);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.elClass = ".section-".concat(this.el.getAttribute("data-anim-scroll-group")), this.vidEl = this.el.querySelector("video"), this.scrollGroup = this.anim.getGroupForTarget(this.el)
            }
            mounted() {
                this.inlineVideo = new r(this.el), this.initialize()
            }
            initialize() {
                this.scrollGroup.addKeyframe(this.el, {
                    anchors: this.el,
                    start: s.animation.willChange.start,
                    end: s.animation.willChange.end,
                    cssClass: s.animation.willChange.class,
                    toggle: !0,
                    disabledWhen: ["static-layout"]
                });
                this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.l,
                    event: "engage-large",
                    breakpointMask: "L",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-large", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.m,
                    event: "engage-medium",
                    breakpointMask: "M",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-medium", () => {
                    this.play()
                }), this.scrollGroup.addKeyframe(this.vidEl, {
                    anchors: this.vidEl,
                    start: s.animation.start.s,
                    event: "engage-small",
                    breakpointMask: "S",
                    disabledWhen: ["static-layout"]
                }).controller.once("engage-small", () => {
                    this.play()
                })
            }
            play() {
                this.inlineVideo.state.userPaused || this.inlineVideo._play()
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        250: 250,
        259: 259
    }],
    254: [function(t, e, i) {
        "use strict";
        var s = t(259);
        const n = t(156),
            r = t(258);
        e.exports = class extends n {
            constructor(t) {
                super(t), this.viewport = t.pageMetrics.breakpoint
            }
            mounted() {
                this.setupAX()
            }
            setupAX() {
                this.voItems = Array.from(this.el.querySelectorAll("h3")), this.voFocusArray = [], "S" !== this.viewport ? this.voItems.forEach(t => {
                    const e = {
                        start: "a0t - 160px",
                        end: "a0b - 160px",
                        anchors: [t],
                        position: "top"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                }) : this.voItems.forEach(t => {
                    const e = {
                        start: "a0t + 60px",
                        end: "a0b + 60px",
                        anchors: [t],
                        position: "bottom"
                    };
                    this.voFocusArray.push(new r(t, [t], e))
                })
            }
            static IS_SUPPORTED() {
                return !s.environment.staticLayout
            }
        }
    }, {
        156: 156,
        258: 258,
        259: 259
    }],
    255: [function(t, e, i) {
        "use strict";
        e.exports = class {
            constructor() {
                this.events = {}
            }
            emit(t, e) {
                const i = this.events[t];
                i && i.forEach(t => {
                    t.call(null, e)
                })
            }
            subscribe(t, e) {
                return this.events[t] || (this.events[t] = []), this.events[t].push(e), () => {
                    this.events[t] = this.events[t].filter(t => e !== t)
                }
            }
        }
    }, {}],
    256: [function(t, e, i) {
        "use strict";
        e.exports = function t() {
            let e = {},
                i = !1,
                s = 0;
            "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (i = arguments[0], s++);
            let n = function(s) {
                for (let n in s) s.hasOwnProperty(n) && (i && "[object Object]" === Object.prototype.toString.call(s[n]) ? e[n] = t(e[n], s[n]) : e[n] = s[n])
            };
            for (; s < arguments.length; s++) {
                n(arguments[s])
            }
            return e
        }
    }, {}],
    257: [function(t, e, i) {
        "use strict";
        const s = function(t) {
            for (var e = {}, i = t.substr(1).split("&"), s = 0; s < i.length; s++)
                if (0 !== i[s].length) {
                    var n = i[s].split("=");
                    e[decodeURIComponent(n[0])] = decodeURIComponent(n[1] || !0)
                }
            return e
        }(window.location.search);
        e.exports = s
    }, {}],
    258: [function(t, e, i) {
        "use strict";
        const s = t(149);
        e.exports = class {
            constructor(t, e, i) {
                return this.el = t, this.anchors = e, this.kf = i, this.boundOnVoFocus = this.onVoFocus.bind(this), this.el.addEventListener("focus", this.boundOnVoFocus), this.el.setAttribute("tabindex", -1), this
            }
            onVoFocus(t) {
                if ("key" !== t.target.dataset.focusMethod) return;
                let e = s.parse(this.kf.start, {
                        anchors: this.anchors
                    }),
                    i = s.parse(this.kf.end, {
                        anchors: this.anchors
                    });
                const n = e + (i - e) / 2,
                    r = i - window.innerHeight + 125,
                    A = e - 60;
                "center" === this.kf.position ? window.scrollTo(0, n) : "bottom" === this.kf.position ? window.scrollTo(0, r) : "top" === this.kf.position && window.scrollTo(0, A), t.target.blur()
            }
            remove() {
                this.el.removeEventListener("focus", this.boundOnVoFocus)
            }
        }
    }, {
        149: 149
    }],
    259: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.default = i.animation = i.environment = void 0;
        const s = document.documentElement.classList,
            n = {
                staticLayout: s.contains("static-layout"),
                ie: s.contains("ie"),
                edge: s.contains("edge"),
                aow: s.contains("aow"),
                prefersReducedMotion: s.contains("prefers-reduced-motion"),
                webkit: s.contains("webkit"),
                ios12: s.contains("ios12")
            };
        i.environment = n;
        const r = {
            start: {
                l: "a0t + 90a0h - 100vh",
                m: "a0t + 90a0h - 100vh",
                s: "a0t + 15a0h - 50vh"
            },
            end: {
                l: "a0t + 50a0h",
                m: "a0t + 50a0h",
                s: "a0t + 50a0h"
            },
            visibleStart: {
                l: "a0t - 100vh + 10h",
                m: "a0t - 100vh + 10h",
                s: "a0t - 100vh + 10h"
            },
            visibleEnd: {
                l: "a0b",
                m: "a0b",
                s: "a0b"
            },
            willChange: {
                start: "a0t - 100vh",
                end: "a0b",
                class: "will-change"
            }
        };
        i.animation = r;
        var A = {
            environment: n,
            animation: r
        };
        i.default = A
    }, {}],
    260: [function(t, e, i) {
        "use strict";
        Object.defineProperty(i, "__esModule", {
            value: !0
        }), i.getTextZoomRatio = c, i.adjustForTextZoom = u, i.listen = function() {
            m();
            let t = c(!0);
            t > 1 && d({
                textZoom: t
            });
            r.detect(), window.addEventListener("resize:text-zoom", p), s.on(n.PageEvents.ON_RESIZE_DEBOUNCED, g)
        };
        const s = t(129),
            n = t(136),
            r = t(4);
        var A = null,
            o = NaN,
            a = NaN,
            h = NaN,
            l = NaN;

        function c(t = !1) {
            if (t || isNaN(l)) {
                const t = parseFloat(getComputedStyle((A || ((A = window.document.createElement("span")).textContent = "Text Zoom Tester", A.setAttribute("aria-hidden", "true"), A.style.fontSize = "100px", A.style.display = "none", window.document.body.appendChild(A)), A)).fontSize);
                l = t / 100
            }
            return l
        }

        function u({
            container: t = document,
            zoomRatio: e = c(!0)
        }) {
            Array.from(t.querySelectorAll("[data-text-zoom-max]")).forEach(t => {
                const i = Number(t.dataset.textZoomMax);
                if (e > i) {
                    t.style.fontSize = "";
                    const s = i,
                        n = (parseFloat(getComputedStyle(t).fontSize) / e / e * s).toFixed(2);
                    t.style.fontSize = "".concat(n, "px")
                } else t.style.fontSize = ""
            }), Array.from(t.querySelectorAll("[data-text-zoom-max-font-size]")).forEach(t => {
                const i = Number(t.dataset.textZoomMaxFontSize);
                t.style.fontSize = "";
                if (i < parseFloat(getComputedStyle(t).fontSize)) {
                    const s = i;
                    t.style.fontSize = "".concat(s / e, "px")
                }
            })
        }

        function d({
            textZoom: t = c(!0),
            force: e = !1
        } = {}) {
            if (e || h !== t && t >= 1) {
                u({
                    zoomRatio: t
                }), h = t;
                let e = new CustomEvent("text-zoom", {
                    bubbles: !1,
                    detail: {
                        textZoom: t
                    }
                });
                window.dispatchEvent(e)
            }
        }

        function m() {
            o = n.pageMetrics.windowWidth, a = n.pageMetrics.windowHeight
        }

        function p() {
            let t = n.pageMetrics.windowWidth,
                e = n.pageMetrics.windowHeight;
            t === o && e === a && d(), m()
        }

        function g() {
            d({
                force: !0
            })
        }
    }, {
        129: 129,
        136: 136,
        4: 4
    }],
    261: [function(t, e, i) {
        "use strict";
        var s = t(75)(t(260)),
            n = t(229);
        const r = t(157),
            A = t(127),
            o = t(158),
            a = t(237),
            {
                applyPrices: h
            } = (t(4), t(225), t(208));
        Object.assign(o, a);
        const l = {
            initialize() {
                if (!document.querySelector(".ecg-fingertip-block")) {
                    const t = document.createElement("div");
                    t.classList.add("ecg-fingertip-block"), document.documentElement.appendChild(t)
                }
                let t = document.querySelector(".main"),
                    e = new r(t),
                    i = {};
                e.on(r.EVENTS.DOM_COMPONENTS_MOUNTED, () => {
                    e.addComponent({
                        componentName: "EnhancementComponent",
                        el: document.documentElement,
                        data: i
                    }), e.addComponent({
                        componentName: "LocalNav",
                        el: document.getElementById("ac-localnav"),
                        data: i
                    }), e.addComponent({
                        componentName: "CopyFade",
                        el: document.documentElement,
                        data: i
                    }), s.listen()
                }), h.loadPricingFromHTML(), e.anim.on(e.anim.model.EVENTS.ON_DOM_GROUPS_CREATED, () => {
                    new A
                }), (0, n.createModals)()
            }
        };
        e.exports = l.initialize()
    }, {
        127: 127,
        157: 157,
        158: 158,
        208: 208,
        225: 225,
        229: 229,
        237: 237,
        260: 260,
        4: 4,
        75: 75
    }]
}, {}, [261]);