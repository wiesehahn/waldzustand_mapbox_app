! function(t) {
    var e = {};

    function n(a) {
        if (e[a]) return e[a].exports;
        var o = e[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = t, n.c = e, n.d = function(t, e, a) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: a
        })
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function(t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var a = Object.create(null);
        if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var o in t) n.d(a, o, function(e) {
                return t[e]
            }.bind(null, o));
        return a
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 22)
}([function(t, e) {
    var n;
    n = function() {
        return this
    }();
    try {
        n = n || Function("return this")() || (0, eval)("this")
    } catch (t) {
        "object" == typeof window && (n = window)
    }
    t.exports = n
}, function(t, e, n) {
    var a;
    "undefined" != typeof window ? a = window : "undefined" != typeof self ? a = self : (console.warn("Using browser-only version of superagent in non-browser environment"), a = this);
    var o = n(9),
        i = n(10),
        l = n(3),
        r = n(11),
        s = n(13);

    function u() {}
    var c = e = t.exports = function(t, n) {
        return "function" == typeof n ? new e.Request("GET", t).end(n) : 1 == arguments.length ? new e.Request("GET", t) : new e.Request(t, n)
    };
    e.Request = y, c.getXHR = function() {
        if (!(!a.XMLHttpRequest || a.location && "file:" == a.location.protocol && a.ActiveXObject)) return new XMLHttpRequest;
        try {
            return new ActiveXObject("Microsoft.XMLHTTP")
        } catch (t) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch (t) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        } catch (t) {}
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (t) {}
        throw Error("Browser-only version of superagent could not find XHR")
    };
    var m = "".trim ? function(t) {
        return t.trim()
    } : function(t) {
        return t.replace(/(^\s*|\s*$)/g, "")
    };

    function h(t) {
        if (!l(t)) return t;
        var e = [];
        for (var n in t) d(e, n, t[n]);
        return e.join("&")
    }

    function d(t, e, n) {
        if (null != n)
            if (Array.isArray(n)) n.forEach(function(n) {
                d(t, e, n)
            });
            else if (l(n))
            for (var a in n) d(t, e + "[" + a + "]", n[a]);
        else t.push(encodeURIComponent(e) + "=" + encodeURIComponent(n));
        else null === n && t.push(encodeURIComponent(e))
    }

    function p(t) {
        for (var e, n, a = {}, o = t.split("&"), i = 0, l = o.length; i < l; ++i) - 1 == (n = (e = o[i]).indexOf("=")) ? a[decodeURIComponent(e)] = "" : a[decodeURIComponent(e.slice(0, n))] = decodeURIComponent(e.slice(n + 1));
        return a
    }

    function f(t) {
        return /[\/+]json($|[^-\w])/.test(t)
    }

    function g(t) {
        this.req = t, this.xhr = this.req.xhr, this.text = "HEAD" != this.req.method && ("" === this.xhr.responseType || "text" === this.xhr.responseType) || void 0 === this.xhr.responseType ? this.xhr.responseText : null, this.statusText = this.req.xhr.statusText;
        var e = this.xhr.status;
        1223 === e && (e = 204), this._setStatusProperties(e), this.header = this.headers = function(t) {
            for (var e, n, a, o, i = t.split(/\r?\n/), l = {}, r = 0, s = i.length; r < s; ++r) - 1 !== (e = (n = i[r]).indexOf(":")) && (a = n.slice(0, e).toLowerCase(), o = m(n.slice(e + 1)), l[a] = o);
            return l
        }(this.xhr.getAllResponseHeaders()), this.header["content-type"] = this.xhr.getResponseHeader("content-type"), this._setHeaderProperties(this.header), null === this.text && t._responseType ? this.body = this.xhr.response : this.body = "HEAD" != this.req.method ? this._parseBody(this.text ? this.text : this.xhr.response) : null
    }

    function y(t, e) {
        var n = this;
        this._query = this._query || [], this.method = t, this.url = e, this.header = {}, this._header = {}, this.on("end", function() {
            var t, e = null,
                a = null;
            try {
                a = new g(n)
            } catch (t) {
                return (e = new Error("Parser is unable to parse the response")).parse = !0, e.original = t, n.xhr ? (e.rawResponse = void 0 === n.xhr.responseType ? n.xhr.responseText : n.xhr.response, e.status = n.xhr.status ? n.xhr.status : null, e.statusCode = e.status) : (e.rawResponse = null, e.status = null), n.callback(e)
            }
            n.emit("response", a);
            try {
                n._isResponseOK(a) || (t = new Error(a.statusText || "Unsuccessful HTTP response"))
            } catch (e) {
                t = e
            }
            t ? (t.original = e, t.response = a, t.status = a.status, n.callback(t, a)) : n.callback(null, a)
        })
    }

    function b(t, e, n) {
        var a = c("DELETE", t);
        return "function" == typeof e && (n = e, e = null), e && a.send(e), n && a.end(n), a
    }
    c.serializeObject = h, c.parseString = p, c.types = {
        html: "text/html",
        json: "application/json",
        xml: "text/xml",
        urlencoded: "application/x-www-form-urlencoded",
        form: "application/x-www-form-urlencoded",
        "form-data": "application/x-www-form-urlencoded"
    }, c.serialize = {
        "application/x-www-form-urlencoded": h,
        "application/json": JSON.stringify
    }, c.parse = {
        "application/x-www-form-urlencoded": p,
        "application/json": JSON.parse
    }, r(g.prototype), g.prototype._parseBody = function(t) {
        var e = c.parse[this.type];
        return this.req._parser ? this.req._parser(this, t) : (!e && f(this.type) && (e = c.parse["application/json"]), e && t && (t.length || t instanceof Object) ? e(t) : null)
    }, g.prototype.toError = function() {
        var t = this.req,
            e = t.method,
            n = t.url,
            a = "cannot " + e + " " + n + " (" + this.status + ")",
            o = new Error(a);
        return o.status = this.status, o.method = e, o.url = n, o
    }, c.Response = g, o(y.prototype), i(y.prototype), y.prototype.type = function(t) {
        return this.set("Content-Type", c.types[t] || t), this
    }, y.prototype.accept = function(t) {
        return this.set("Accept", c.types[t] || t), this
    }, y.prototype.auth = function(t, e, n) {
        1 === arguments.length && (e = ""), "object" == typeof e && null !== e && (n = e, e = ""), n || (n = {
            type: "function" == typeof btoa ? "basic" : "auto"
        });
        return this._auth(t, e, n, function(t) {
            if ("function" == typeof btoa) return btoa(t);
            throw new Error("Cannot use basic auth, btoa is not a function")
        })
    }, y.prototype.query = function(t) {
        return "string" != typeof t && (t = h(t)), t && this._query.push(t), this
    }, y.prototype.attach = function(t, e, n) {
        if (e) {
            if (this._data) throw Error("superagent can't mix .send() and .attach()");
            this._getFormData().append(t, e, n || e.name)
        }
        return this
    }, y.prototype._getFormData = function() {
        return this._formData || (this._formData = new a.FormData), this._formData
    }, y.prototype.callback = function(t, e) {
        if (this._shouldRetry(t, e)) return this._retry();
        var n = this._callback;
        this.clearTimeout(), t && (this._maxRetries && (t.retries = this._retries - 1), this.emit("error", t)), n(t, e)
    }, y.prototype.crossDomainError = function() {
        var t = new Error("Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.");
        t.crossDomain = !0, t.status = this.status, t.method = this.method, t.url = this.url, this.callback(t)
    }, y.prototype.buffer = y.prototype.ca = y.prototype.agent = function() {
        return console.warn("This is not supported in browser version of superagent"), this
    }, y.prototype.pipe = y.prototype.write = function() {
        throw Error("Streaming is not supported in browser version of superagent")
    }, y.prototype._isHost = function(t) {
        return t && "object" == typeof t && !Array.isArray(t) && "[object Object]" !== Object.prototype.toString.call(t)
    }, y.prototype.end = function(t) {
        return this._endCalled && console.warn("Warning: .end() was called twice. This is not supported in superagent"), this._endCalled = !0, this._callback = t || u, this._finalizeQueryString(), this._end()
    }, y.prototype._end = function() {
        var t = this,
            e = this.xhr = c.getXHR(),
            n = this._formData || this._data;
        this._setTimeouts(), e.onreadystatechange = function() {
            var n = e.readyState;
            if (n >= 2 && t._responseTimeoutTimer && clearTimeout(t._responseTimeoutTimer), 4 == n) {
                var a;
                try {
                    a = e.status
                } catch (t) {
                    a = 0
                }
                if (!a) {
                    if (t.timedout || t._aborted) return;
                    return t.crossDomainError()
                }
                t.emit("end")
            }
        };
        var a = function(e, n) {
            n.total > 0 && (n.percent = n.loaded / n.total * 100), n.direction = e, t.emit("progress", n)
        };
        if (this.hasListeners("progress")) try {
            e.onprogress = a.bind(null, "download"), e.upload && (e.upload.onprogress = a.bind(null, "upload"))
        } catch (t) {}
        try {
            this.username && this.password ? e.open(this.method, this.url, !0, this.username, this.password) : e.open(this.method, this.url, !0)
        } catch (t) {
            return this.callback(t)
        }
        if (this._withCredentials && (e.withCredentials = !0), !this._formData && "GET" != this.method && "HEAD" != this.method && "string" != typeof n && !this._isHost(n)) {
            var o = this._header["content-type"],
                i = this._serializer || c.serialize[o ? o.split(";")[0] : ""];
            !i && f(o) && (i = c.serialize["application/json"]), i && (n = i(n))
        }
        for (var l in this.header) null != this.header[l] && this.header.hasOwnProperty(l) && e.setRequestHeader(l, this.header[l]);
        return this._responseType && (e.responseType = this._responseType), this.emit("request", this), e.send(void 0 !== n ? n : null), this
    }, c.agent = function() {
        return new s
    }, ["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(function(t) {
        s.prototype[t.toLowerCase()] = function(e, n) {
            var a = new c.Request(t, e);
            return this._setDefaults(a), n && a.end(n), a
        }
    }), s.prototype.del = s.prototype.delete, c.get = function(t, e, n) {
        var a = c("GET", t);
        return "function" == typeof e && (n = e, e = null), e && a.query(e), n && a.end(n), a
    }, c.head = function(t, e, n) {
        var a = c("HEAD", t);
        return "function" == typeof e && (n = e, e = null), e && a.query(e), n && a.end(n), a
    }, c.options = function(t, e, n) {
        var a = c("OPTIONS", t);
        return "function" == typeof e && (n = e, e = null), e && a.send(e), n && a.end(n), a
    }, c.del = b, c.delete = b, c.patch = function(t, e, n) {
        var a = c("PATCH", t);
        return "function" == typeof e && (n = e, e = null), e && a.send(e), n && a.end(n), a
    }, c.post = function(t, e, n) {
        var a = c("POST", t);
        return "function" == typeof e && (n = e, e = null), e && a.send(e), n && a.end(n), a
    }, c.put = function(t, e, n) {
        var a = c("PUT", t);
        return "function" == typeof e && (n = e, e = null), e && a.send(e), n && a.end(n), a
    }
}, , function(t, e, n) {
    "use strict";
    t.exports = function(t) {
        return null !== t && "object" == typeof t
    }
}, function(t, e, n) {
    (function(e) {
        var n = "Expected a function",
            a = NaN,
            o = "[object Symbol]",
            i = /^\s+|\s+$/g,
            l = /^[-+]0x[0-9a-f]+$/i,
            r = /^0b[01]+$/i,
            s = /^0o[0-7]+$/i,
            u = parseInt,
            c = "object" == typeof e && e && e.Object === Object && e,
            m = "object" == typeof self && self && self.Object === Object && self,
            h = c || m || Function("return this")(),
            d = Object.prototype.toString,
            p = Math.max,
            f = Math.min,
            g = function() {
                return h.Date.now()
            };

        function y(t) {
            var e = typeof t;
            return !!t && ("object" == e || "function" == e)
        }

        function b(t) {
            if ("number" == typeof t) return t;
            if (function(t) {
                    return "symbol" == typeof t || function(t) {
                        return !!t && "object" == typeof t
                    }(t) && d.call(t) == o
                }(t)) return a;
            if (y(t)) {
                var e = "function" == typeof t.valueOf ? t.valueOf() : t;
                t = y(e) ? e + "" : e
            }
            if ("string" != typeof t) return 0 === t ? t : +t;
            t = t.replace(i, "");
            var n = r.test(t);
            return n || s.test(t) ? u(t.slice(2), n ? 2 : 8) : l.test(t) ? a : +t
        }
        t.exports = function(t, e, a) {
            var o, i, l, r, s, u, c = 0,
                m = !1,
                h = !1,
                d = !0;
            if ("function" != typeof t) throw new TypeError(n);

            function v(e) {
                var n = o,
                    a = i;
                return o = i = void 0, c = e, r = t.apply(a, n)
            }

            function x(t) {
                var n = t - u;
                return void 0 === u || n >= e || n < 0 || h && t - c >= l
            }

            function C() {
                var t = g();
                if (x(t)) return _(t);
                s = setTimeout(C, function(t) {
                    var n = e - (t - u);
                    return h ? f(n, l - (t - c)) : n
                }(t))
            }

            function _(t) {
                return s = void 0, d && o ? v(t) : (o = i = void 0, r)
            }

            function w() {
                var t = g(),
                    n = x(t);
                if (o = arguments, i = this, u = t, n) {
                    if (void 0 === s) return function(t) {
                        return c = t, s = setTimeout(C, e), m ? v(t) : r
                    }(u);
                    if (h) return s = setTimeout(C, e), v(u)
                }
                return void 0 === s && (s = setTimeout(C, e)), r
            }
            return e = b(e) || 0, y(a) && (m = !!a.leading, l = (h = "maxWait" in a) ? p(b(a.maxWait) || 0, e) : l, d = "trailing" in a ? !!a.trailing : d), w.cancel = function() {
                void 0 !== s && clearTimeout(s), c = 0, o = u = i = s = void 0
            }, w.flush = function() {
                return void 0 === s ? r : _(g())
            }, w
        }
    }).call(this, n(0))
}, function(t, e, n) {
    var a;
    /*! geolib 2.0.23 by Manuel Bieh
     * Library to provide geo functions like distance calculation,
     * conversion of decimal coordinates to sexagesimal and vice versa, etc.
     * WGS 84 (World Geodetic System 1984)
     * 
     * @author Manuel Bieh
     * @url http://www.manuelbieh.com/
     * @version 2.0.23
     * @license MIT 
     **/
    ! function(n, o) {
        "use strict";

        function i() {}
        i.TO_RAD = Math.PI / 180, i.TO_DEG = 180 / Math.PI, i.PI_X2 = 2 * Math.PI, i.PI_DIV4 = Math.PI / 4;
        var l = Object.create(i.prototype, {
            version: {
                value: "2.0.23"
            },
            radius: {
                value: 6378137
            },
            minLat: {
                value: -90
            },
            maxLat: {
                value: 90
            },
            minLon: {
                value: -180
            },
            maxLon: {
                value: 180
            },
            sexagesimalPattern: {
                value: /^([0-9]{1,3})°\s*([0-9]{1,3}(?:\.(?:[0-9]{1,2}))?)'\s*(([0-9]{1,3}(\.([0-9]{1,4}))?)"\s*)?([NEOSW]?)$/
            },
            measures: {
                value: Object.create(Object.prototype, {
                    m: {
                        value: 1
                    },
                    km: {
                        value: .001
                    },
                    cm: {
                        value: 100
                    },
                    mm: {
                        value: 1e3
                    },
                    mi: {
                        value: 1 / 1609.344
                    },
                    sm: {
                        value: 1 / 1852.216
                    },
                    ft: {
                        value: 100 / 30.48
                    },
                    in: {
                        value: 100 / 2.54
                    },
                    yd: {
                        value: 1 / .9144
                    }
                })
            },
            prototype: {
                value: i.prototype
            },
            extend: {
                value: function(t, e) {
                    for (var n in t) void 0 !== l.prototype[n] && !0 !== e || ("function" == typeof t[n] && "function" == typeof t[n].bind ? l.prototype[n] = t[n].bind(l) : l.prototype[n] = t[n])
                }
            }
        });
        void 0 === Number.prototype.toRad && (Number.prototype.toRad = function() {
            return this * i.TO_RAD
        }), void 0 === Number.prototype.toDeg && (Number.prototype.toDeg = function() {
            return this * i.TO_DEG
        }), l.extend({
            decimal: {},
            sexagesimal: {},
            distance: null,
            getKeys: function(t) {
                if ("[object Array]" == Object.prototype.toString.call(t)) return {
                    longitude: t.length >= 1 ? 0 : void 0,
                    latitude: t.length >= 2 ? 1 : void 0,
                    elevation: t.length >= 3 ? 2 : void 0
                };
                var e = function(e) {
                        var n;
                        return e.every(function(e) {
                            return "object" != typeof t || (!t.hasOwnProperty(e) || (n = e, !1))
                        }), n
                    },
                    n = e(["lng", "lon", "longitude"]),
                    a = e(["lat", "latitude"]),
                    o = e(["alt", "altitude", "elevation", "elev"]);
                return void 0 !== a || void 0 !== n || void 0 !== o ? {
                    latitude: a,
                    longitude: n,
                    elevation: o
                } : void 0
            },
            getLat: function(t, e) {
                return !0 === e ? t[this.getKeys(t).latitude] : this.useDecimal(t[this.getKeys(t).latitude])
            },
            latitude: function(t) {
                return this.getLat.call(this, t)
            },
            getLon: function(t, e) {
                return !0 === e ? t[this.getKeys(t).longitude] : this.useDecimal(t[this.getKeys(t).longitude])
            },
            longitude: function(t) {
                return this.getLon.call(this, t)
            },
            getElev: function(t) {
                return t[this.getKeys(t).elevation]
            },
            elevation: function(t) {
                return this.getElev.call(this, t)
            },
            coords: function(t, e) {
                var n = {
                        latitude: !0 === e ? t[this.getKeys(t).latitude] : this.useDecimal(t[this.getKeys(t).latitude]),
                        longitude: !0 === e ? t[this.getKeys(t).longitude] : this.useDecimal(t[this.getKeys(t).longitude])
                    },
                    a = t[this.getKeys(t).elevation];
                return void 0 !== a && (n.elevation = a), n
            },
            ll: function(t, e) {
                return this.coords.call(this, t, e)
            },
            validate: function(t) {
                var e = this.getKeys(t);
                if (void 0 === e || void 0 === e.latitude || "undefined" === e.longitude) return !1;
                var n = t[e.latitude],
                    a = t[e.longitude];
                return !(void 0 === n || !this.isDecimal(n) && !this.isSexagesimal(n)) && (!(void 0 === a || !this.isDecimal(a) && !this.isSexagesimal(a)) && (n = this.useDecimal(n), a = this.useDecimal(a), !(n < this.minLat || n > this.maxLat || a < this.minLon || a > this.maxLon)))
            },
            getDistance: function(t, e, n, a) {
                n = Math.floor(n) || 1, a = Math.floor(a) || 0;
                var o, i, r, s, u, c, m, h = this.coords(t),
                    d = this.coords(e),
                    p = 6378137,
                    f = 6356752.314245,
                    g = 1 / 298.257223563,
                    y = (d.longitude - h.longitude).toRad(),
                    b = Math.atan((1 - g) * Math.tan(parseFloat(h.latitude).toRad())),
                    v = Math.atan((1 - g) * Math.tan(parseFloat(d.latitude).toRad())),
                    x = Math.sin(b),
                    C = Math.cos(b),
                    _ = Math.sin(v),
                    w = Math.cos(v),
                    I = y,
                    M = 100;
                do {
                    var S = Math.sin(I),
                        T = Math.cos(I);
                    if (0 === (c = Math.sqrt(w * S * (w * S) + (C * _ - x * w * T) * (C * _ - x * w * T)))) return l.distance = 0;
                    o = x * _ + C * w * T, i = Math.atan2(c, o), u = o - 2 * x * _ / (s = 1 - (r = C * w * S / c) * r), isNaN(u) && (u = 0);
                    var A = g / 16 * s * (4 + g * (4 - 3 * s));
                    m = I, I = y + (1 - A) * g * r * (i + A * c * (u + A * o * (2 * u * u - 1)))
                } while (Math.abs(I - m) > 1e-12 && --M > 0);
                if (0 === M) return NaN;
                var R = s * (p * p - f * f) / (f * f),
                    k = R / 1024 * (256 + R * (R * (74 - 47 * R) - 128)),
                    P = f * (1 + R / 16384 * (4096 + R * (R * (320 - 175 * R) - 768))) * (i - k * c * (u + k / 4 * (o * (2 * u * u - 1) - k / 6 * u * (4 * c * c - 3) * (4 * u * u - 3))));
                if (P = P.toFixed(a), void 0 !== this.elevation(t) && void 0 !== this.elevation(e)) {
                    var E = Math.abs(this.elevation(t) - this.elevation(e));
                    P = Math.sqrt(P * P + E * E)
                }
                return this.distance = Math.round(P * Math.pow(10, a) / n) * n / Math.pow(10, a)
            },
            getDistanceSimple: function(t, e, n) {
                n = Math.floor(n) || 1;
                var a = Math.round(Math.acos(Math.sin(this.latitude(e).toRad()) * Math.sin(this.latitude(t).toRad()) + Math.cos(this.latitude(e).toRad()) * Math.cos(this.latitude(t).toRad()) * Math.cos(this.longitude(t).toRad() - this.longitude(e).toRad())) * this.radius);
                return l.distance = Math.floor(Math.round(a / n) * n)
            },
            getCenter: function(t) {
                var e = t;
                if ("object" == typeof t && !(t instanceof Array))
                    for (var n in e = [], t) e.push(this.coords(t[n]));
                if (!e.length) return !1;
                var a, o, l, r = 0,
                    s = 0,
                    u = 0;
                e.forEach(function(t) {
                    a = this.latitude(t).toRad(), o = this.longitude(t).toRad(), r += Math.cos(a) * Math.cos(o), s += Math.cos(a) * Math.sin(o), u += Math.sin(a)
                }, this);
                var c = e.length;
                return r /= c, s /= c, u /= c, o = Math.atan2(s, r), l = Math.sqrt(r * r + s * s), {
                    latitude: ((a = Math.atan2(u, l)) * i.TO_DEG).toFixed(6),
                    longitude: (o * i.TO_DEG).toFixed(6)
                }
            },
            getBounds: function(t) {
                if (!t.length) return !1;
                var e = this.elevation(t[0]),
                    n = {
                        maxLat: -1 / 0,
                        minLat: 1 / 0,
                        maxLng: -1 / 0,
                        minLng: 1 / 0
                    };
                void 0 !== e && (n.maxElev = 0, n.minElev = 1 / 0);
                for (var a = 0, o = t.length; a < o; ++a) n.maxLat = Math.max(this.latitude(t[a]), n.maxLat), n.minLat = Math.min(this.latitude(t[a]), n.minLat), n.maxLng = Math.max(this.longitude(t[a]), n.maxLng), n.minLng = Math.min(this.longitude(t[a]), n.minLng), e && (n.maxElev = Math.max(this.elevation(t[a]), n.maxElev), n.minElev = Math.min(this.elevation(t[a]), n.minElev));
                return n
            },
            getCenterOfBounds: function(t) {
                var e = this.getBounds(t),
                    n = e.minLat + (e.maxLat - e.minLat) / 2,
                    a = e.minLng + (e.maxLng - e.minLng) / 2;
                return {
                    latitude: parseFloat(n.toFixed(6)),
                    longitude: parseFloat(a.toFixed(6))
                }
            },
            getBoundsOfDistance: function(t, e) {
                var n, a, o = this.latitude(t),
                    l = this.longitude(t),
                    r = o.toRad(),
                    s = l.toRad(),
                    u = e / this.radius,
                    c = r - u,
                    m = r + u,
                    h = this.maxLat.toRad(),
                    d = this.minLat.toRad(),
                    p = this.maxLon.toRad(),
                    f = this.minLon.toRad();
                if (c > d && m < h) {
                    var g = Math.asin(Math.sin(u) / Math.cos(r));
                    (n = s - g) < f && (n += i.PI_X2), (a = s + g) > p && (a -= i.PI_X2)
                } else c = Math.max(c, d), m = Math.min(m, h), n = f, a = p;
                return [{
                    latitude: c.toDeg(),
                    longitude: n.toDeg()
                }, {
                    latitude: m.toDeg(),
                    longitude: a.toDeg()
                }]
            },
            isPointInside: function(t, e) {
                for (var n = !1, a = -1, o = e.length, i = o - 1; ++a < o; i = a)(this.longitude(e[a]) <= this.longitude(t) && this.longitude(t) < this.longitude(e[i]) || this.longitude(e[i]) <= this.longitude(t) && this.longitude(t) < this.longitude(e[a])) && this.latitude(t) < (this.latitude(e[i]) - this.latitude(e[a])) * (this.longitude(t) - this.longitude(e[a])) / (this.longitude(e[i]) - this.longitude(e[a])) + this.latitude(e[a]) && (n = !n);
                return n
            },
            preparePolygonForIsPointInsideOptimized: function(t) {
                for (var e = 0, n = t.length - 1; e < t.length; e++) this.longitude(t[n]) === this.longitude(t[e]) ? (t[e].constant = this.latitude(t[e]), t[e].multiple = 0) : (t[e].constant = this.latitude(t[e]) - this.longitude(t[e]) * this.latitude(t[n]) / (this.longitude(t[n]) - this.longitude(t[e])) + this.longitude(t[e]) * this.latitude(t[e]) / (this.longitude(t[n]) - this.longitude(t[e])), t[e].multiple = (this.latitude(t[n]) - this.latitude(t[e])) / (this.longitude(t[n]) - this.longitude(t[e]))), n = e
            },
            isPointInsideWithPreparedPolygon: function(t, e) {
                for (var n = !1, a = this.longitude(t), o = this.latitude(t), i = 0, l = e.length - 1; i < e.length; i++)(this.longitude(e[i]) < a && this.longitude(e[l]) >= a || this.longitude(e[l]) < a && this.longitude(e[i]) >= a) && (n ^= a * e[i].multiple + e[i].constant < o), l = i;
                return n
            },
            isInside: function() {
                return this.isPointInside.apply(this, arguments)
            },
            isPointInCircle: function(t, e, n) {
                return this.getDistance(t, e) < n
            },
            withinRadius: function() {
                return this.isPointInCircle.apply(this, arguments)
            },
            getRhumbLineBearing: function(t, e) {
                var n = this.longitude(e).toRad() - this.longitude(t).toRad(),
                    a = Math.log(Math.tan(this.latitude(e).toRad() / 2 + i.PI_DIV4) / Math.tan(this.latitude(t).toRad() / 2 + i.PI_DIV4));
                return Math.abs(n) > Math.PI && (n = n > 0 ? -1 * (i.PI_X2 - n) : i.PI_X2 + n), (Math.atan2(n, a).toDeg() + 360) % 360
            },
            getBearing: function(t, e) {
                return e.latitude = this.latitude(e), e.longitude = this.longitude(e), t.latitude = this.latitude(t), t.longitude = this.longitude(t), (Math.atan2(Math.sin(e.longitude.toRad() - t.longitude.toRad()) * Math.cos(e.latitude.toRad()), Math.cos(t.latitude.toRad()) * Math.sin(e.latitude.toRad()) - Math.sin(t.latitude.toRad()) * Math.cos(e.latitude.toRad()) * Math.cos(e.longitude.toRad() - t.longitude.toRad())).toDeg() + 360) % 360
            },
            getCompassDirection: function(t, e, n) {
                var a, o;
                switch (o = "circle" == n ? this.getBearing(t, e) : this.getRhumbLineBearing(t, e), Math.round(o / 22.5)) {
                    case 1:
                        a = {
                            exact: "NNE",
                            rough: "N"
                        };
                        break;
                    case 2:
                        a = {
                            exact: "NE",
                            rough: "N"
                        };
                        break;
                    case 3:
                        a = {
                            exact: "ENE",
                            rough: "E"
                        };
                        break;
                    case 4:
                        a = {
                            exact: "E",
                            rough: "E"
                        };
                        break;
                    case 5:
                        a = {
                            exact: "ESE",
                            rough: "E"
                        };
                        break;
                    case 6:
                        a = {
                            exact: "SE",
                            rough: "E"
                        };
                        break;
                    case 7:
                        a = {
                            exact: "SSE",
                            rough: "S"
                        };
                        break;
                    case 8:
                        a = {
                            exact: "S",
                            rough: "S"
                        };
                        break;
                    case 9:
                        a = {
                            exact: "SSW",
                            rough: "S"
                        };
                        break;
                    case 10:
                        a = {
                            exact: "SW",
                            rough: "S"
                        };
                        break;
                    case 11:
                        a = {
                            exact: "WSW",
                            rough: "W"
                        };
                        break;
                    case 12:
                        a = {
                            exact: "W",
                            rough: "W"
                        };
                        break;
                    case 13:
                        a = {
                            exact: "WNW",
                            rough: "W"
                        };
                        break;
                    case 14:
                        a = {
                            exact: "NW",
                            rough: "W"
                        };
                        break;
                    case 15:
                        a = {
                            exact: "NNW",
                            rough: "N"
                        };
                        break;
                    default:
                        a = {
                            exact: "N",
                            rough: "N"
                        }
                }
                return a.bearing = o, a
            },
            getDirection: function(t, e, n) {
                return this.getCompassDirection.apply(this, arguments)
            },
            orderByDistance: function(t, e) {
                return Object.keys(e).map(function(n) {
                    var a = this.getDistance(t, e[n]),
                        o = Object.create(e[n]);
                    return o.distance = a, o.key = n, o
                }, this).sort(function(t, e) {
                    return t.distance - e.distance
                })
            },
            isPointInLine: function(t, e, n) {
                return (this.getDistance(e, t, 1, 3) + this.getDistance(t, n, 1, 3)).toFixed(3) == this.getDistance(e, n, 1, 3)
            },
            isPointNearLine: function(t, e, n, a) {
                return this.getDistanceFromLine(t, e, n) < a
            },
            getDistanceFromLine: function(t, e, n) {
                var a = this.getDistance(e, t, 1, 3),
                    o = this.getDistance(t, n, 1, 3),
                    i = this.getDistance(e, n, 1, 3),
                    l = Math.acos((a * a + i * i - o * o) / (2 * a * i)),
                    r = Math.acos((o * o + i * i - a * a) / (2 * o * i));
                return l > Math.PI / 2 ? a : r > Math.PI / 2 ? o : Math.sin(l) * a
            },
            findNearest: function(t, e, n, a) {
                n = n || 0, a = a || 1;
                var o = this.orderByDistance(t, e);
                return 1 === a ? o[n] : o.splice(n, a)
            },
            getPathLength: function(t) {
                for (var e, n = 0, a = 0, o = t.length; a < o; ++a) e && (n += this.getDistance(this.coords(t[a]), e)), e = this.coords(t[a]);
                return n
            },
            getSpeed: function(t, e, n) {
                var a = n && n.unit || "km";
                "mph" == a ? a = "mi" : "kmh" == a && (a = "km");
                var o = l.getDistance(t, e) / (1 * e.time / 1e3 - 1 * t.time / 1e3) * 3600;
                return Math.round(o * this.measures[a] * 1e4) / 1e4
            },
            computeDestinationPoint: function(t, e, n, a) {
                var o = this.latitude(t),
                    i = this.longitude(t);
                a = void 0 === a ? this.radius : Number(a);
                var l = Number(e) / a,
                    r = Number(n).toRad(),
                    s = Number(o).toRad(),
                    u = Number(i).toRad(),
                    c = Math.asin(Math.sin(s) * Math.cos(l) + Math.cos(s) * Math.sin(l) * Math.cos(r)),
                    m = u + Math.atan2(Math.sin(r) * Math.sin(l) * Math.cos(s), Math.cos(l) - Math.sin(s) * Math.sin(c));
                return m = (m + 3 * Math.PI) % (2 * Math.PI) - Math.PI, {
                    latitude: c.toDeg(),
                    longitude: m.toDeg()
                }
            },
            convertUnit: function(t, e, n) {
                if (0 === e) return 0;
                if (void 0 === e) {
                    if (null === this.distance) throw new Error("No distance was given");
                    if (0 === this.distance) return 0;
                    e = this.distance
                }
                if (t = t || "m", n = null == n ? 4 : n, void 0 !== this.measures[t]) return this.round(e * this.measures[t], n);
                throw new Error("Unknown unit for conversion.")
            },
            useDecimal: function(t) {
                if ("[object Array]" === Object.prototype.toString.call(t)) {
                    var e = this;
                    return t = t.map(function(t) {
                        if (e.isDecimal(t)) return e.useDecimal(t);
                        if ("object" == typeof t) {
                            if (e.validate(t)) return e.coords(t);
                            for (var n in t) t[n] = e.useDecimal(t[n]);
                            return t
                        }
                        return e.isSexagesimal(t) ? e.sexagesimal2decimal(t) : t
                    })
                }
                if ("object" == typeof t && this.validate(t)) return this.coords(t);
                if ("object" == typeof t) {
                    for (var n in t) t[n] = this.useDecimal(t[n]);
                    return t
                }
                if (this.isDecimal(t)) return parseFloat(t);
                if (!0 === this.isSexagesimal(t)) return parseFloat(this.sexagesimal2decimal(t));
                throw new Error("Unknown format.")
            },
            decimal2sexagesimal: function(t) {
                if (t in this.sexagesimal) return this.sexagesimal[t];
                var e = t.toString().split("."),
                    n = Math.abs(e[0]),
                    a = 60 * ("0." + (e[1] || 0)),
                    o = a.toString().split(".");
                return a = Math.floor(a), o = (60 * ("0." + (o[1] || 0))).toFixed(2), this.sexagesimal[t] = n + "° " + a + "' " + o + '"', this.sexagesimal[t]
            },
            sexagesimal2decimal: function(t) {
                if (t in this.decimal) return this.decimal[t];
                var e = new RegExp(this.sexagesimalPattern).exec(t),
                    n = 0,
                    a = 0;
                e && (n = parseFloat(e[2] / 60), a = parseFloat(e[4] / 3600) || 0);
                var o = (parseFloat(e[1]) + n + a).toFixed(8);
                return o = "S" == e[7] || "W" == e[7] ? parseFloat(-o) : parseFloat(o), this.decimal[t] = o, o
            },
            isDecimal: function(t) {
                return t = t.toString().replace(/\s*/, ""), !isNaN(parseFloat(t)) && parseFloat(t) == t
            },
            isSexagesimal: function(t) {
                return t = t.toString().replace(/\s*/, ""), this.sexagesimalPattern.test(t)
            },
            round: function(t, e) {
                var n = Math.pow(10, e);
                return Math.round(t * n) / n
            }
        }), void 0 !== t && void 0 !== t.exports ? (t.exports = l, "object" == typeof n && (n.geolib = l)) : void 0 === (a = function() {
            return l
        }.apply(e, [])) || (t.exports = a)
    }(this)
}, function(t) {
    t.exports = [{
        name: "Japan",
        lon: 139.6917,
        lat: 35.6895
    }, {
        name: "India",
        lon: 77.2167,
        lat: 28.6667
    }, {
        name: "China",
        lon: 121.4581,
        lat: 31.2222
    }, {
        name: "Mexico",
        lon: -99.1419,
        lat: 19.4273
    }, {
        name: "Brazil",
        lon: -46.6361,
        lat: -23.5475
    }, {
        name: "India",
        lon: 72.8808,
        lat: 19.074
    }, {
        name: "Japan",
        lon: 135.5538,
        lat: 34.6758
    }, {
        name: "Egypt",
        lon: 31.2394,
        lat: 30.0392
    }, {
        name: "United States of America",
        lon: -74.0037,
        lat: 40.717
    }, {
        name: "China",
        lon: 116.3972,
        lat: 39.9075
    }, {
        name: "Bangladesh",
        lon: 90.4074,
        lat: 23.7104
    }, {
        name: "Argentina",
        lon: -58.4004,
        lat: -34.6051
    }, {
        name: "India",
        lon: 88.356,
        lat: 22.5335
    }, {
        name: "Pakistan",
        lon: 67.0822,
        lat: 24.9056
    }, {
        name: "Turkey",
        lon: 28.9497,
        lat: 41.0138
    }, {
        name: "China",
        lon: 106.5528,
        lat: 29.5628
    }, {
        name: "Brazil",
        lon: -43.2075,
        lat: -22.9028
    }, {
        name: "Philippines",
        lon: 120.9822,
        lat: 14.6042
    }, {
        name: "China",
        lon: 117.1886,
        lat: 39.1088
    }, {
        name: "United States of America",
        lon: -118.2417,
        lat: 34.0317
    }, {
        name: "Nigeria",
        lon: 3.3958,
        lat: 6.4531
    }, {
        name: "Russian Federation",
        lon: 37.6218,
        lat: 55.755
    }, {
        name: "China",
        lon: 113.2574,
        lat: 23.1255
    }, {
        name: "Democratic Republic of the Congo",
        lon: 15.3136,
        lat: -4.3276
    }, {
        name: "China",
        lon: 114.0634,
        lat: 22.5415
    }, {
        name: "France",
        lon: 2.3488,
        lat: 48.8534
    }, {
        name: "Pakistan",
        lon: 74.3436,
        lat: 31.5497
    }, {
        name: "Indonesia",
        lon: 106.8416,
        lat: -6.2118
    }, {
        name: "India",
        lon: 77.5937,
        lat: 12.9719
    }, {
        name: "Republic of Korea",
        lon: 126.9778,
        lat: 37.5683
    }, {
        name: "Peru",
        lon: -77.0282,
        lat: -12.0432
    }, {
        name: "Colombia",
        lon: -74.0818,
        lat: 4.6097
    }, {
        name: "India",
        lon: 80.2488,
        lat: 13.0531
    }, {
        name: "Thailand",
        lon: 100.5252,
        lat: 13.722
    }, {
        name: "Japan",
        lon: 136.9064,
        lat: 35.1815
    }, {
        name: "United States of America",
        lon: -87.6501,
        lat: 41.85
    }, {
        name: "India",
        lon: 78.4744,
        lat: 17.3753
    }, {
        name: "United Kingdom",
        lon: -.1257,
        lat: 51.5085
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 51.4215,
        lat: 35.6944
    }, {
        name: "China",
        lon: 104.0667,
        lat: 30.6667
    }, {
        name: "China",
        lon: 114.2667,
        lat: 30.5833
    }, {
        name: "China",
        lon: 118.7898,
        lat: 32.0482
    }, {
        name: "Viet Nam",
        lon: 106.6667,
        lat: 10.75
    }, {
        name: "China",
        lon: 113.7414,
        lat: 23.0212
    }, {
        name: "China, Hong Kong SAR",
        lon: 114.1887,
        lat: 22.2796
    }, {
        name: "India",
        lon: 72.6167,
        lat: 23.0333
    }, {
        name: "China",
        lon: 113.12,
        lat: 23.0228
    }, {
        name: "Angola",
        lon: 13.2343,
        lat: -8.8368
    }, {
        name: "Malaysia",
        lon: 101.6865,
        lat: 3.1412
    }, {
        name: "China",
        lon: 120.1614,
        lat: 30.2937
    }, {
        name: "China",
        lon: 108.9402,
        lat: 34.2894
    }, {
        name: "Chile",
        lon: -70.6483,
        lat: -33.4569
    }, {
        name: "China",
        lon: 123.4328,
        lat: 41.7922
    }, {
        name: "Iraq",
        lon: 44.4009,
        lat: 33.3406
    }, {
        name: "Spain",
        lon: -3.7026,
        lat: 40.4165
    }, {
        name: "Saudi Arabia",
        lon: 46.7096,
        lat: 24.6905
    }, {
        name: "Canada",
        lon: -79.4163,
        lat: 43.7001
    }, {
        name: "United States of America",
        lon: -80.204,
        lat: 25.7891
    }, {
        name: "Brazil",
        lon: -43.9378,
        lat: -19.9208
    }, {
        name: "India",
        lon: 73.8616,
        lat: 18.5161
    }, {
        name: "China",
        lon: 126.6467,
        lat: 45.7563
    }, {
        name: "United States of America",
        lon: -97.3209,
        lat: 32.7254
    }, {
        name: "India",
        lon: 72.8333,
        lat: 21.1667
    }, {
        name: "United States of America",
        lon: -95.3694,
        lat: 29.7602
    }, {
        name: "United States of America",
        lon: -75.1638,
        lat: 39.9523
    }, {
        name: "Japan",
        lon: 130.4181,
        lat: 33.6064
    }, {
        name: "Singapore",
        lon: 103.8501,
        lat: 1.2897
    }, {
        name: "China",
        lon: 120.5853,
        lat: 31.3021
    }, {
        name: "Spain",
        lon: 2.159,
        lat: 41.3888
    }, {
        name: "Russian Federation",
        lon: 30.3262,
        lat: 59.9299
    }, {
        name: "United States of America",
        lon: -84.4,
        lat: 33.76
    }, {
        name: "Sudan",
        lon: 32.5324,
        lat: 15.5518
    }, {
        name: "United Republic of Tanzania",
        lon: 39.2695,
        lat: -6.8235
    }, {
        name: "China",
        lon: 120.3719,
        lat: 36.0986
    }, {
        name: "South Africa",
        lon: 28.0436,
        lat: -26.2023
    }, {
        name: "United States of America",
        lon: -77.0364,
        lat: 38.8951
    }, {
        name: "Myanmar",
        lon: 96.1561,
        lat: 16.8053
    }, {
        name: "China",
        lon: 121.6023,
        lat: 38.9138
    }, {
        name: "Mexico",
        lon: -103.3333,
        lat: 20.6667
    }, {
        name: "Egypt",
        lon: 29.9046,
        lat: 31.1925
    }, {
        name: "Turkey",
        lon: 32.8543,
        lat: 39.9199
    }, {
        name: "China",
        lon: 116.9971,
        lat: 36.6767
    }, {
        name: "Australia",
        lon: 151.2073,
        lat: -33.8679
    }, {
        name: "Bangladesh",
        lon: 91.8364,
        lat: 22.3331
    }, {
        name: "Côte d'Ivoire",
        lon: -4.0268,
        lat: 5.3453
    }, {
        name: "Mexico",
        lon: -100.3167,
        lat: 25.6667
    }, {
        name: "Australia",
        lon: 144.9633,
        lat: -37.814
    }, {
        name: "China",
        lon: 113.6486,
        lat: 34.7578
    }, {
        name: "United States of America",
        lon: -71.0645,
        lat: 42.3479
    }, {
        name: "China, Taiwan Province of China",
        lon: 121.4621,
        lat: 25.0121
    }, {
        name: "Brazil",
        lon: -47.9297,
        lat: -15.7797
    }, {
        name: "Italy",
        lon: 12.4811,
        lat: 41.8947
    }, {
        name: "South Africa",
        lon: 18.4232,
        lat: -33.9258
    }, {
        name: "United States of America",
        lon: -112.0747,
        lat: 33.4495
    }, {
        name: "Canada",
        lon: -73.5878,
        lat: 45.5088
    }, {
        name: "Saudi Arabia",
        lon: 39.2192,
        lat: 21.5169
    }, {
        name: "China",
        lon: 112.9383,
        lat: 28.2274
    }, {
        name: "Brazil",
        lon: -51.23,
        lat: -30.0331
    }, {
        name: "China",
        lon: 125.294,
        lat: 43.8825
    }, {
        name: "China",
        lon: 116.7148,
        lat: 23.3681
    }, {
        name: "China",
        lon: 102.7183,
        lat: 25.0389
    }, {
        name: "Kenya",
        lon: 36.8167,
        lat: -1.2833
    }, {
        name: "Ethiopia",
        lon: 38.7469,
        lat: 9.025
    }, {
        name: "Brazil",
        lon: -34.8811,
        lat: -8.0539
    }, {
        name: "Brazil",
        lon: -38.5436,
        lat: -3.7412
    }, {
        name: "Colombia",
        lon: -75.5636,
        lat: 6.2518
    }, {
        name: "Afghanistan",
        lon: 69.1725,
        lat: 34.5289
    }, {
        name: "China",
        lon: 114.5108,
        lat: 38.0418
    }, {
        name: "Israel",
        lon: 34.7806,
        lat: 32.0809
    }, {
        name: "Viet Nam",
        lon: 105.8412,
        lat: 21.0245
    }, {
        name: "United States of America",
        lon: -83.1026,
        lat: 42.3871
    }, {
        name: "China",
        lon: 117.2808,
        lat: 31.8639
    }, {
        name: "Brazil",
        lon: -38.5108,
        lat: -12.9711
    }, {
        name: "Morocco",
        lon: -7.6192,
        lat: 33.5928
    }, {
        name: "Nigeria",
        lon: 8.5167,
        lat: 12.0001
    }, {
        name: "Germany",
        lon: 13.4105,
        lat: 52.5244
    }, {
        name: "China",
        lon: 87.6038,
        lat: 43.8253
    }, {
        name: "China",
        lon: 112.5516,
        lat: 37.8619
    }, {
        name: "South Africa",
        lon: 28.33,
        lat: -26.25
    }, {
        name: "Republic of Korea",
        lon: 129.0403,
        lat: 35.1028
    }, {
        name: "India",
        lon: 75.8167,
        lat: 26.9167
    }, {
        name: "Brazil",
        lon: -49.2731,
        lat: -25.4278
    }, {
        name: "China",
        lon: 118.0819,
        lat: 24.4798
    }, {
        name: "China",
        lon: 121.5495,
        lat: 29.8782
    }, {
        name: "China",
        lon: 119.2989,
        lat: 26.0754
    }, {
        name: "United States of America",
        lon: -122.4374,
        lat: 37.7599
    }, {
        name: "China",
        lon: 108.3167,
        lat: 22.8167
    }, {
        name: "United States of America",
        lon: -122.3331,
        lat: 47.6264
    }, {
        name: "India",
        lon: 80.9167,
        lat: 26.85
    }, {
        name: "Greece",
        lon: 23.749,
        lat: 37.9534
    }, {
        name: "Nigeria",
        lon: 3.8964,
        lat: 7.3878
    }, {
        name: "China",
        lon: 120.6668,
        lat: 27.9994
    }, {
        name: "United States of America",
        lon: -117.1573,
        lat: 32.7153
    }, {
        name: "Italy",
        lon: 9.1834,
        lat: 45.5531
    }, {
        name: "Cameroon",
        lon: 11.5167,
        lat: 3.8667
    }, {
        name: "Pakistan",
        lon: 73.0833,
        lat: 31.4167
    }, {
        name: "South Africa",
        lon: 31.0292,
        lat: -29.8579
    }, {
        name: "China",
        lon: 115.8833,
        lat: 28.6833
    }, {
        name: "Brazil",
        lon: -47.0656,
        lat: -22.9109
    }, {
        name: "China",
        lon: 119.9589,
        lat: 31.7943
    }, {
        name: "India",
        lon: 80.35,
        lat: 26.4667
    }, {
        name: "China",
        lon: 120.2986,
        lat: 31.5367
    }, {
        name: "Cameroon",
        lon: 9.7043,
        lat: 4.0483
    }, {
        name: "Dem. People's Republic of Korea",
        lon: 125.7543,
        lat: 39.0339
    }, {
        name: "Paraguay",
        lon: -57.6359,
        lat: -25.3007
    }, {
        name: "Mexico",
        lon: -98.205,
        lat: 19.0415
    }, {
        name: "Dominican Republic",
        lon: -69.9018,
        lat: 18.4896
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 59.6062,
        lat: 36.297
    }, {
        name: "Venezuela (Bolivarian Republic of)",
        lon: -66.8792,
        lat: 10.488
    }, {
        name: "Ukraine",
        lon: 30.5186,
        lat: 50.4454
    }, {
        name: "Portugal",
        lon: -9.1399,
        lat: 38.7169
    }, {
        name: "China",
        lon: 106.7167,
        lat: 26.5833
    }, {
        name: "Turkey",
        lon: 27.1384,
        lat: 38.4127
    }, {
        name: "Indonesia",
        lon: 112.7411,
        lat: -7.2888
    }, {
        name: "Japan",
        lon: 138.3831,
        lat: 34.9769
    }, {
        name: "Indonesia",
        lon: 106.9756,
        lat: -6.2383
    }, {
        name: "China",
        lon: 113.3839,
        lat: 22.518
    }, {
        name: "United States of America",
        lon: -93.2699,
        lat: 44.9731
    }, {
        name: "Senegal",
        lon: -17.4441,
        lat: 14.6937
    }, {
        name: "China",
        lon: 118.1799,
        lat: 39.6285
    }, {
        name: "Guatemala",
        lon: -90.5307,
        lat: 14.6127
    }, {
        name: "Ecuador",
        lon: -79.9,
        lat: -2.1667
    }, {
        name: "China",
        lon: 103.7922,
        lat: 36.0564
    }, {
        name: "China, Taiwan Province of China",
        lon: 121.5457,
        lat: 25.047
    }, {
        name: "Republic of Korea",
        lon: 126.7317,
        lat: 37.4536
    }, {
        name: "India",
        lon: 79.1,
        lat: 21.15
    }, {
        name: "United States of America",
        lon: -82.4584,
        lat: 27.9475
    }, {
        name: "India",
        lon: 75.7787,
        lat: 11.2567
    }, {
        name: "Japan",
        lon: 141.3469,
        lat: 43.0642
    }, {
        name: "United Kingdom",
        lon: -2.2374,
        lat: 53.481
    }, {
        name: "Madagascar",
        lon: 47.5361,
        lat: -18.9137
    }, {
        name: "Ghana",
        lon: -1.6244,
        lat: 6.6885
    }, {
        name: "United States of America",
        lon: -104.9831,
        lat: 39.7343
    }, {
        name: "Algeria",
        lon: 3.042,
        lat: 36.7525
    }, {
        name: "Uganda",
        lon: 32.5822,
        lat: .3163
    }, {
        name: "Colombia",
        lon: -76.5225,
        lat: 3.4372
    }, {
        name: "Kuwait",
        lon: 47.9783,
        lat: 29.3697
    }, {
        name: "India",
        lon: 75.8333,
        lat: 22.7179
    }, {
        name: "India",
        lon: 76.2601,
        lat: 9.9307
    }, {
        name: "United Kingdom",
        lon: -1.8998,
        lat: 52.4814
    }, {
        name: "Yemen",
        lon: 44.2078,
        lat: 15.3531
    }, {
        name: "Indonesia",
        lon: 107.6085,
        lat: -6.9194
    }, {
        name: "Puerto Rico",
        lon: -66.1057,
        lat: 18.4663
    }, {
        name: "Nigeria",
        lon: 7.4898,
        lat: 9.0574
    }, {
        name: "Haiti",
        lon: -72.335,
        lat: 18.5392
    }, {
        name: "Canada",
        lon: -123.1193,
        lat: 49.2497
    }, {
        name: "China",
        lon: 118.0633,
        lat: 36.7906
    }, {
        name: "India",
        lon: 76.9614,
        lat: 10.9925
    }, {
        name: "United Arab Emirates",
        lon: 55.3113,
        lat: 25.2721
    }, {
        name: "Uzbekistan",
        lon: 69.2163,
        lat: 41.2647
    }, {
        name: "Brazil",
        lon: -49.2539,
        lat: -16.6786
    }, {
        name: "India",
        lon: 76.2167,
        lat: 10.5167
    }, {
        name: "India",
        lon: 76.0667,
        lat: 11.0667
    }, {
        name: "Nigeria",
        lon: 7.0134,
        lat: 4.7774
    }, {
        name: "Ghana",
        lon: -.1969,
        lat: 5.556
    }, {
        name: "United States of America",
        lon: -115.1398,
        lat: 36.1699
    }, {
        name: "United States of America",
        lon: -76.6122,
        lat: 39.2904
    }, {
        name: "Japan",
        lon: 140.8976,
        lat: 38.256
    }, {
        name: "China",
        lon: 114.4678,
        lat: 36.6006
    }, {
        name: "Republic of Korea",
        lon: 128.5911,
        lat: 35.8703
    }, {
        name: "Lebanon",
        lon: 35.4833,
        lat: 33.9
    }, {
        name: "India",
        lon: 85.1167,
        lat: 25.6
    }, {
        name: "Syrian Arab Republic",
        lon: 36.3084,
        lat: 33.5086
    }, {
        name: "Mali",
        lon: -8,
        lat: 12.65
    }, {
        name: "Indonesia",
        lon: 98.6667,
        lat: 3.5833
    }, {
        name: "Australia",
        lon: 153.0281,
        lat: -27.4679
    }, {
        name: "Azerbaijan",
        lon: 49.892,
        lat: 40.3777
    }, {
        name: "Italy",
        lon: 14.2592,
        lat: 40.8502
    }, {
        name: "United States of America",
        lon: -117.3962,
        lat: 33.9534
    }, {
        name: "China",
        lon: 119.1019,
        lat: 36.71
    }, {
        name: "Burkina Faso",
        lon: -1.5383,
        lat: 12.3642
    }, {
        name: "United States of America",
        lon: -90.1972,
        lat: 38.6286
    }, {
        name: "Indonesia",
        lon: 106.7942,
        lat: -6.4025
    }, {
        name: "Mexico",
        lon: -99.6573,
        lat: 19.2839
    }, {
        name: "Zambia",
        lon: 28.2771,
        lat: -15.4134
    }, {
        name: "Tunisia",
        lon: 10.1658,
        lat: 36.819
    }, {
        name: "Brazil",
        lon: -48.479,
        lat: -1.4561
    }, {
        name: "China",
        lon: 114.4,
        lat: 23.0833
    }, {
        name: "Cuba",
        lon: -82.3785,
        lat: 23.1195
    }, {
        name: "China",
        lon: 121.4372,
        lat: 37.4651
    }, {
        name: "India",
        lon: 77.4,
        lat: 23.2667
    }, {
        name: "China, Taiwan Province of China",
        lon: 121.2969,
        lat: 24.9936
    }, {
        name: "Japan",
        lon: 132.4605,
        lat: 34.3928
    }, {
        name: "China",
        lon: 119.0148,
        lat: 33.607
    }, {
        name: "China",
        lon: 120.5715,
        lat: 30.011
    }, {
        name: "South Africa",
        lon: 28.1878,
        lat: -25.7449
    }, {
        name: "Colombia",
        lon: -74.7964,
        lat: 10.9639
    }, {
        name: "India",
        lon: 76.9569,
        lat: 8.5069
    }, {
        name: "Indonesia",
        lon: 106.6527,
        lat: -6.2024
    }, {
        name: "Venezuela (Bolivarian Republic of)",
        lon: -71.6406,
        lat: 10.6317
    }, {
        name: "United States of America",
        lon: -98.4935,
        lat: 29.4241
    }, {
        name: "Pakistan",
        lon: 73.0667,
        lat: 33.6
    }, {
        name: "China",
        lon: 112.4562,
        lat: 34.6186
    }, {
        name: "Brazil",
        lon: -60.025,
        lat: -3.1019
    }, {
        name: "Democratic Republic of the Congo",
        lon: 27.4794,
        lat: -11.6609
    }, {
        name: "Democratic Republic of the Congo",
        lon: 23.6,
        lat: -6.15
    }, {
        name: "United States of America",
        lon: -122.6799,
        lat: 45.5215
    }, {
        name: "Belgium",
        lon: 4.3499,
        lat: 50.8467
    }, {
        name: "India",
        lon: 73.2,
        lat: 22.3
    }, {
        name: "China",
        lon: 109.8222,
        lat: 40.6522
    }, {
        name: "India",
        lon: 78.0167,
        lat: 27.1833
    }, {
        name: "Congo",
        lon: 15.2832,
        lat: -4.2658
    }, {
        name: "Belarus",
        lon: 27.5667,
        lat: 53.9
    }, {
        name: "Mexico",
        lon: -117.0167,
        lat: 32.5333
    }, {
        name: "United States of America",
        lon: -121.4944,
        lat: 38.5816
    }, {
        name: "India",
        lon: 83.2097,
        lat: 17.6819
    }, {
        name: "Pakistan",
        lon: 74.1833,
        lat: 32.15
    }, {
        name: "China",
        lon: 117.1866,
        lat: 34.2637
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 51.6776,
        lat: 32.6572
    }, {
        name: "China",
        lon: 120.8655,
        lat: 31.9904
    }, {
        name: "Australia",
        lon: 115.8525,
        lat: -31.9478
    }, {
        name: "Brazil",
        lon: -40.3079,
        lat: -20.3054
    }, {
        name: "India",
        lon: 75.3716,
        lat: 11.8729
    }, {
        name: "China",
        lon: 109.3784,
        lat: 24.3017
    }, {
        name: "Pakistan",
        lon: 71.5594,
        lat: 34.002
    }, {
        name: "Romania",
        lon: 26.1043,
        lat: 44.4328
    }, {
        name: "Austria",
        lon: 16.3707,
        lat: 48.2064
    }, {
        name: "United Kingdom",
        lon: -1.7649,
        lat: 53.7984
    }, {
        name: "Turkey",
        lon: 29.0611,
        lat: 40.1917
    }, {
        name: "Pakistan",
        lon: 71.4833,
        lat: 30.1833
    }, {
        name: "Saudi Arabia",
        lon: 39.8159,
        lat: 21.4174
    }, {
        name: "Morocco",
        lon: -6.8326,
        lat: 34.0133
    }, {
        name: "China",
        lon: 111.6522,
        lat: 40.8106
    }, {
        name: "Germany",
        lon: 10,
        lat: 53.55
    }, {
        name: "Jordan",
        lon: 35.945,
        lat: 31.9552
    }, {
        name: "Somalia",
        lon: 45.3435,
        lat: 2.0416
    }, {
        name: "India",
        lon: 73.8,
        lat: 19.9833
    }, {
        name: "Brazil",
        lon: -46.3266,
        lat: -23.957
    }, {
        name: "Cambodia",
        lon: 104.916,
        lat: 11.5625
    }, {
        name: "United States of America",
        lon: -81.6874,
        lat: 41.4986
    }, {
        name: "Venezuela (Bolivarian Republic of)",
        lon: -68.0077,
        lat: 10.162
    }, {
        name: "China",
        lon: 119.4238,
        lat: 32.3915
    }, {
        name: "Italy",
        lon: 7.6772,
        lat: 45.0687
    }, {
        name: "China",
        lon: 115.4903,
        lat: 38.8511
    }, {
        name: "Hungary",
        lon: 19.0399,
        lat: 47.498
    }, {
        name: "Bolivia (Plurinational State of)",
        lon: -68.15,
        lat: -16.5
    }, {
        name: "Poland",
        lon: 21.0118,
        lat: 52.2298
    }, {
        name: "United States of America",
        lon: -81.3792,
        lat: 28.5383
    }, {
        name: "United States of America",
        lon: -121.895,
        lat: 37.3394
    }, {
        name: "Ecuador",
        lon: -78.525,
        lat: -.2299
    }, {
        name: "India",
        lon: 75.85,
        lat: 30.9
    }, {
        name: "United States of America",
        lon: -79.9882,
        lat: 40.4418
    }, {
        name: "India",
        lon: 80.6167,
        lat: 16.5167
    }, {
        name: "Mexico",
        lon: -101.6805,
        lat: 21.1234
    }, {
        name: "Guinea",
        lon: -13.6476,
        lat: 9.5716
    }, {
        name: "China",
        lon: 118.3334,
        lat: 35.0541
    }, {
        name: "Uruguay",
        lon: -56.1674,
        lat: -34.8335
    }, {
        name: "Indonesia",
        lon: 110.4203,
        lat: -6.9932
    }, {
        name: "United States of America",
        lon: -84.5188,
        lat: 39.1047
    }, {
        name: "United States of America",
        lon: -97.74,
        lat: 30.27
    }, {
        name: "China",
        lon: 110.3301,
        lat: 20.0274
    }, {
        name: "Panama",
        lon: -79.5196,
        lat: 8.9958
    }, {
        name: "Turkey",
        lon: 35.3289,
        lat: 37.0017
    }, {
        name: "Pakistan",
        lon: 68.3667,
        lat: 25.3667
    }, {
        name: "Kazakhstan",
        lon: 76.9101,
        lat: 43.2472
    }, {
        name: "China",
        lon: 120.1551,
        lat: 33.3569
    }, {
        name: "China",
        lon: 121.4185,
        lat: 28.6372
    }, {
        name: "United States of America",
        lon: -86.1477,
        lat: 39.7909
    }, {
        name: "France",
        lon: 4.8467,
        lat: 45.7485
    }, {
        name: "United Kingdom",
        lon: -4.2576,
        lat: 55.8652
    }, {
        name: "Togo",
        lon: 1.2123,
        lat: 6.1375
    }, {
        name: "Philippines",
        lon: 125.6125,
        lat: 7.0739
    }, {
        name: "China",
        lon: 125,
        lat: 46.5833
    }, {
        name: "United States of America",
        lon: -80.8431,
        lat: 35.2271
    }, {
        name: "United States of America",
        lon: -94.6275,
        lat: 39.1142
    }, {
        name: "India",
        lon: 70.7833,
        lat: 22.3
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 51.0103,
        lat: 35.8355
    }, {
        name: "France",
        lon: 5.4433,
        lat: 43.5284
    }, {
        name: "India",
        lon: 78.1167,
        lat: 9.9333
    }, {
        name: "Indonesia",
        lon: 104.7458,
        lat: -2.9167
    }, {
        name: "China",
        lon: 113.0833,
        lat: 22.5833
    }, {
        name: "Russian Federation",
        lon: 82.9346,
        lat: 55.0415
    }, {
        name: "China",
        lon: 122.99,
        lat: 41.1236
    }, {
        name: "China",
        lon: 113.5678,
        lat: 22.2769
    }, {
        name: "India",
        lon: 77.7193,
        lat: 28.9716
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 46.2919,
        lat: 38.08
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 52.5388,
        lat: 29.6036
    }, {
        name: "China",
        lon: 119.1758,
        lat: 34.5969
    }, {
        name: "India",
        lon: 82.9822,
        lat: 25.3164
    }, {
        name: "China",
        lon: 112.144,
        lat: 32.0088
    }, {
        name: "Republic of Korea",
        lon: 127.4197,
        lat: 36.3214
    }, {
        name: "China",
        lon: 113.293,
        lat: 40.0805
    }, {
        name: "Bolivia (Plurinational State of)",
        lon: -63.1698,
        lat: -17.7989
    }, {
        name: "Turkey",
        lon: 37.3825,
        lat: 37.0594
    }, {
        name: "China, Taiwan Province of China",
        lon: 120.3155,
        lat: 22.626
    }, {
        name: "China",
        lon: 126.5603,
        lat: 43.8508
    }, {
        name: "Argentina",
        lon: -64.1811,
        lat: -31.4135
    }, {
        name: "United States of America",
        lon: -83.0002,
        lat: 39.9622
    }, {
        name: "Republic of Korea",
        lon: 126.9186,
        lat: 35.1461
    }, {
        name: "Zimbabwe",
        lon: 31.0539,
        lat: -17.8294
    }, {
        name: "Sweden",
        lon: 18.0649,
        lat: 59.3326
    }, {
        name: "Nigeria",
        lon: 5.6275,
        lat: 6.335
    }, {
        name: "New Zealand",
        lon: 174.7667,
        lat: -36.8667
    }, {
        name: "United States of America",
        lon: -76.0872,
        lat: 36.8345
    }, {
        name: "India",
        lon: 86.1833,
        lat: 22.8
    }, {
        name: "China",
        lon: 123.9672,
        lat: 47.3408
    }, {
        name: "Indonesia",
        lon: 119.4236,
        lat: -5.1444
    }, {
        name: "China",
        lon: 119.0103,
        lat: 25.4394
    }, {
        name: "Ukraine",
        lon: 36.2527,
        lat: 49.9808
    }, {
        name: "Germany",
        lon: 11.5734,
        lat: 48.1371
    }, {
        name: "China",
        lon: 118.3812,
        lat: 31.3336
    }, {
        name: "Russian Federation",
        lon: 60.6125,
        lat: 56.8575
    }, {
        name: "Mexico",
        lon: -106.4833,
        lat: 31.7333
    }, {
        name: "Argentina",
        lon: -60.6393,
        lat: -32.9468
    }, {
        name: "India",
        lon: 76.5917,
        lat: 8.8806
    }, {
        name: "United States of America",
        lon: -87.9065,
        lat: 43.0389
    }, {
        name: "Brazil",
        lon: -44.2832,
        lat: -2.5385
    }, {
        name: "India",
        lon: 74.7974,
        lat: 34.0837
    }, {
        name: "China",
        lon: 118.5997,
        lat: 24.8968
    }, {
        name: "China",
        lon: 116.5847,
        lat: 35.4146
    }, {
        name: "Iraq",
        lon: 43.1189,
        lat: 36.335
    }, {
        name: "Serbia",
        lon: 20.4633,
        lat: 44.8176
    }, {
        name: "Mongolia",
        lon: 106.8832,
        lat: 47.9077
    }, {
        name: "Canada",
        lon: -114.0593,
        lat: 51.0441
    }, {
        name: "India",
        lon: 75.3433,
        lat: 19.8766
    }, {
        name: "India",
        lon: 79.9501,
        lat: 23.167
    }, {
        name: "China",
        lon: 106.2731,
        lat: 38.4681
    }, {
        name: "Mozambique",
        lon: 32.4589,
        lat: -25.9622
    }, {
        name: "India",
        lon: 81.6333,
        lat: 21.2333
    }, {
        name: "China",
        lon: 116.6379,
        lat: 23.6651
    }, {
        name: "China",
        lon: 116.9969,
        lat: 32.6264
    }, {
        name: "India",
        lon: 86.9833,
        lat: 23.6833
    }, {
        name: "Switzerland",
        lon: 8.503,
        lat: 47.3579
    }, {
        name: "China",
        lon: 101.7667,
        lat: 36.6167
    }, {
        name: "Mexico",
        lon: -103.4333,
        lat: 25.55
    }, {
        name: "Canada",
        lon: -75.698,
        lat: 45.4166
    }, {
        name: "China",
        lon: 123.9467,
        lat: 41.8807
    }, {
        name: "China",
        lon: 112.6251,
        lat: 26.8841
    }, {
        name: "Portugal",
        lon: -8.611,
        lat: 41.1496
    }, {
        name: "China",
        lon: 121.2524,
        lat: 30.1761
    }, {
        name: "Saudi Arabia",
        lon: 39.6111,
        lat: 24.4635
    }, {
        name: "Costa Rica",
        lon: -84.0807,
        lat: 9.9278
    }, {
        name: "India",
        lon: 81.85,
        lat: 25.45
    }, {
        name: "Canada",
        lon: -113.5037,
        lat: 53.5434
    }, {
        name: "Brazil",
        lon: -35.2094,
        lat: -5.795
    }, {
        name: "Brazil",
        lon: -34.8631,
        lat: -7.115
    }, {
        name: "China",
        lon: 119.5883,
        lat: 39.9317
    }, {
        name: "India",
        lon: 73.0158,
        lat: 26.2392
    }, {
        name: "Australia",
        lon: 138.5986,
        lat: -34.9287
    }, {
        name: "Thailand",
        lon: 100.9883,
        lat: 13.3611
    }, {
        name: "United Arab Emirates",
        lon: 55.4033,
        lat: 25.3573
    }, {
        name: "India",
        lon: 74.8755,
        lat: 31.631
    }, {
        name: "Denmark",
        lon: 12.5655,
        lat: 55.6759
    }, {
        name: "China",
        lon: 114.8794,
        lat: 40.81
    }, {
        name: "Liberia",
        lon: -10.7969,
        lat: 6.3005
    }, {
        name: "Czechia",
        lon: 14.4208,
        lat: 50.088
    }, {
        name: "China",
        lon: 111.2847,
        lat: 30.7144
    }, {
        name: "Myanmar",
        lon: 96.0836,
        lat: 21.9747
    }, {
        name: "India",
        lon: 85.3333,
        lat: 23.35
    }, {
        name: "Russian Federation",
        lon: 44.0021,
        lat: 56.3287
    }, {
        name: "India",
        lon: 86.45,
        lat: 23.8
    }, {
        name: "Bulgaria",
        lon: 23.3242,
        lat: 42.6975
    }, {
        name: "Syrian Arab Republic",
        lon: 36.7181,
        lat: 34.7318
    }, {
        name: "Brazil",
        lon: -35.7353,
        lat: -9.6658
    }, {
        name: "Honduras",
        lon: -87.2068,
        lat: 14.0818
    }, {
        name: "China, Taiwan Province of China",
        lon: 120.6727,
        lat: 24.1416
    }, {
        name: "Iraq",
        lon: 47.8149,
        lat: 30.4972
    }, {
        name: "India",
        lon: 78.1792,
        lat: 26.2236
    }, {
        name: "China",
        lon: 117.1191,
        lat: 36.1904
    }, {
        name: "Finland",
        lon: 24.9402,
        lat: 60.1692
    }, {
        name: "Mexico",
        lon: -100.3833,
        lat: 20.6
    }, {
        name: "Russian Federation",
        lon: 49.1221,
        lat: 55.7887
    }, {
        name: "Brazil",
        lon: -48.8456,
        lat: -26.3044
    }, {
        name: "Colombia",
        lon: -73.1198,
        lat: 7.1254
    }, {
        name: "United Arab Emirates",
        lon: 54.3618,
        lat: 24.4648
    }, {
        name: "United States of America",
        lon: -71.4177,
        lat: 41.824
    }, {
        name: "Indonesia",
        lon: 104.0313,
        lat: 1.1191
    }, {
        name: "Thailand",
        lon: 100.5968,
        lat: 13.5993
    }, {
        name: "Turkey",
        lon: 32.4846,
        lat: 37.8714
    }, {
        name: "China",
        lon: 119.9029,
        lat: 32.4945
    }, {
        name: "Chad",
        lon: 15.0444,
        lat: 12.1067
    }, {
        name: "Republic of Korea",
        lon: 127.0214,
        lat: 37.2635
    }, {
        name: "India",
        lon: 77.3546,
        lat: 11.1154
    }, {
        name: "Viet Nam",
        lon: 105.7833,
        lat: 10.0333
    }, {
        name: "South Africa",
        lon: 25.5701,
        lat: -33.918
    }, {
        name: "Russian Federation",
        lon: 61.4297,
        lat: 55.1544
    }, {
        name: "Oman",
        lon: 58.5922,
        lat: 23.6139
    }, {
        name: "Nepal",
        lon: 85.3206,
        lat: 27.7017
    }, {
        name: "United States of America",
        lon: -81.6557,
        lat: 30.3322
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 50.8764,
        lat: 34.6401
    }, {
        name: "Russian Federation",
        lon: 73.4,
        lat: 55
    }, {
        name: "Democratic Republic of the Congo",
        lon: 22.4166,
        lat: -5.8962
    }, {
        name: "Russian Federation",
        lon: 50.15,
        lat: 53.2001
    }, {
        name: "India",
        lon: 75.8561,
        lat: 25.1665
    }, {
        name: "Iran (Islamic Republic of)",
        lon: 48.6693,
        lat: 31.3203
    }, {
        name: "Ireland",
        lon: -6.2489,
        lat: 53.3331
    }, {
        name: "China",
        lon: 104.737,
        lat: 31.4839
    }, {
        name: "China",
        lon: 110.3596,
        lat: 21.2662
    }, {
        name: "United States of America",
        lon: -78.6375,
        lat: 35.7789
    }, {
        name: "Venezuela (Bolivarian Republic of)",
        lon: -69.3228,
        lat: 10.0739
    }, {
        name: "China",
        lon: 114.3503,
        lat: 36.0944
    }, {
        name: "Bolivia (Plurinational State of)",
        lon: 18,
        lat: -17.3895
    }, {
        name: "Venezuela (Bolivarian Republic of)",
        lon: -67.5958,
        lat: 10.2469
    }, {
        name: "Libya",
        lon: 13.1875,
        lat: 32.8752
    }, {
        name: "India",
        lon: 81.2806,
        lat: 21.1887
    }, {
        name: "Morocco",
        lon: -4.9998,
        lat: 34.0372
    }, {
        name: "Mexico",
        lon: -100.9833,
        lat: 22.15
    }, {
        name: "China",
        lon: 106.9365,
        lat: 27.7113
    }, {
        name: "Brazil",
        lon: -48.5492,
        lat: -27.5967
    }, {
        name: "Russian Federation",
        lon: 39.7032,
        lat: 47.2178
    }, {
        name: "United States of America",
        lon: -86.783,
        lat: 36.161
    }, {
        name: "Nigeria",
        lon: 6.7885,
        lat: 6.1454
    }, {
        name: "United States of America",
        lon: -90.0475,
        lat: 35.1408
    }, {
        name: "Niger",
        lon: 2.1098,
        lat: 13.5137
    }, {
        name: "Netherlands",
        lon: 4.8897,
        lat: 52.374
    }, {
        name: "India",
        lon: 79.4167,
        lat: 28.35
    }, {
        name: "China",
        lon: 118.5785,
        lat: 37.4533
    }, {
        name: "Kenya",
        lon: 39.6636,
        lat: -4.0547
    }, {
        name: "Russian Federation",
        lon: 56.0456,
        lat: 54.7852
    }, {
        name: "Israel",
        lon: 34.9914,
        lat: 32.8133
    }, {
        name: "Mozambique",
        lon: 32.5892,
        lat: -25.9653
    }, {
        name: "United States of America",
        lon: -111.8926,
        lat: 40.7547
    }, {
        name: "El Salvador",
        lon: -89.1872,
        lat: 13.6894
    }, {
        name: "China",
        lon: 122.1136,
        lat: 37.5017
    }, {
        name: "India",
        lon: 76.6393,
        lat: 12.2979
    }, {
        name: "India",
        lon: 78.6856,
        lat: 10.805
    }, {
        name: "China",
        lon: 113.15,
        lat: 27.8333
    }, {
        name: "Turkey",
        lon: 30.6956,
        lat: 36.9081
    }, {
        name: "Viet Nam",
        lon: 106.6835,
        lat: 20.8648
    }, {
        name: "Saudi Arabia",
        lon: 50.1033,
        lat: 26.4344
    }, {
        name: "Georgia",
        lon: 44.8337,
        lat: 41.6941
    }, {
        name: "China",
        lon: 120.0768,
        lat: 29.3151
    }, {
        name: "Argentina",
        lon: -68.8272,
        lat: -32.8908
    }, {
        name: "China",
        lon: 123.765,
        lat: 41.2886
    }, {
        name: "Armenia",
        lon: 44.5146,
        lat: 40.182
    }, {
        name: "Thailand",
        lon: 98.9847,
        lat: 18.7904
    }, {
        name: "China",
        lon: 119.512,
        lat: 35.4034
    }, {
        name: "Mexico",
        lon: -89.6167,
        lat: 20.9667
    }, {
        name: "China",
        lon: 114.3483,
        lat: 34.7911
    }, {
        name: "Republic of Korea",
        lon: 128.6811,
        lat: 35.2281
    }, {
        name: "Mauritania",
        lon: -15.9785,
        lat: 18.0858
    }, {
        name: "Russian Federation",
        lon: 92.7917,
        lat: 56.0097
    }, {
        name: "China",
        lon: 118.2924,
        lat: 33.9681
    }, {
        name: "Germany",
        lon: 6.95,
        lat: 50.9333
    }, {
        name: "China",
        lon: 106.0847,
        lat: 30.7951
    }, {
        name: "China",
        lon: 119.4489,
        lat: 32.2027
    }, {
        name: "Indonesia",
        lon: 106.8019,
        lat: -6.6065
    }, {
        name: "India",
        lon: 76.7933,
        lat: 30.7343
    }, {
        name: "China",
        lon: 110.7836,
        lat: 32.6445
    }, {
        name: "Nigeria",
        lon: 7.4383,
        lat: 10.5222
    }, {
        name: "Indonesia",
        lon: 101.45,
        lat: .5333
    }, {
        name: "Sierra Leone",
        lon: -13.2299,
        lat: 8.484
    }, {
        name: "China",
        lon: 110.2864,
        lat: 25.2819
    }, {
        name: "India",
        lon: 78.0833,
        lat: 27.8833
    }, {
        name: "France",
        lon: 3.0586,
        lat: 50.633
    }, {
        name: "Democratic Republic of the Congo",
        lon: 25.2,
        lat: .5167
    }, {
        name: "China",
        lon: 110.9234,
        lat: 21.6627
    }, {
        name: "China",
        lon: 121.1417,
        lat: 41.1078
    }, {
        name: "United States of America",
        lon: -85.7631,
        lat: 38.2419
    }, {
        name: "Russian Federation",
        lon: 56.2855,
        lat: 58.0174
    }, {
        name: "United States of America",
        lon: -77.4382,
        lat: 37.5432
    }, {
        name: "India",
        lon: 91.7503,
        lat: 26.1735
    }, {
        name: "China",
        lon: 117.5542,
        lat: 34.8647
    }, {
        name: "China",
        lon: 122.2283,
        lat: 40.6648
    }, {
        name: "Nicaragua",
        lon: -86.2504,
        lat: 12.1328
    }, {
        name: "Mexico",
        lon: -115.4683,
        lat: 32.6519
    }, {
        name: "Russian Federation",
        lon: 39.1843,
        lat: 51.672
    }, {
        name: "India",
        lon: 78.7833,
        lat: 28.8333
    }, {
        name: "India",
        lon: 75.0106,
        lat: 15.4587
    }, {
        name: "China",
        lon: 118.9152,
        lat: 42.2646
    }, {
        name: "Bangladesh",
        lon: 89.5644,
        lat: 22.8098
    }, {
        name: "Belgium",
        lon: 4.4035,
        lat: 51.2199
    }, {
        name: "Russian Federation",
        lon: 44.5018,
        lat: 48.7194
    }, {
        name: "Mexico",
        lon: -102.3,
        lat: 21.8833
    }, {
        name: "China",
        lon: 112.927,
        lat: 27.8283
    }, {
        name: "Ukraine",
        lon: 30.7326,
        lat: 46.4775
    }, {
        name: "China",
        lon: 112.5259,
        lat: 32.9999
    }, {
        name: "India",
        lon: 85.8333,
        lat: 20.2333
    }, {
        name: "Netherlands",
        lon: 4.4792,
        lat: 51.9225
    }, {
        name: "Congo",
        lon: 11.8635,
        lat: -4.7761
    }, {
        name: "China",
        lon: 107.2004,
        lat: 34.3651
    }, {
        name: "China",
        lon: 116.1647,
        lat: 23.2967
    }, {
        name: "India",
        lon: 78.1667,
        lat: 11.65
    }]
}, , , function(t, e, n) {
    function a(t) {
        if (t) return function(t) {
            for (var e in a.prototype) t[e] = a.prototype[e];
            return t
        }(t)
    }
    t.exports = a, a.prototype.on = a.prototype.addEventListener = function(t, e) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
    }, a.prototype.once = function(t, e) {
        function n() {
            this.off(t, n), e.apply(this, arguments)
        }
        return n.fn = e, this.on(t, n), this
    }, a.prototype.off = a.prototype.removeListener = a.prototype.removeAllListeners = a.prototype.removeEventListener = function(t, e) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
        var n, a = this._callbacks["$" + t];
        if (!a) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + t], this;
        for (var o = 0; o < a.length; o++)
            if ((n = a[o]) === e || n.fn === e) {
                a.splice(o, 1);
                break
            } return this
    }, a.prototype.emit = function(t) {
        this._callbacks = this._callbacks || {};
        var e = [].slice.call(arguments, 1),
            n = this._callbacks["$" + t];
        if (n)
            for (var a = 0, o = (n = n.slice(0)).length; a < o; ++a) n[a].apply(this, e);
        return this
    }, a.prototype.listeners = function(t) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
    }, a.prototype.hasListeners = function(t) {
        return !!this.listeners(t).length
    }
}, function(t, e, n) {
    "use strict";
    var a = n(3);

    function o(t) {
        if (t) return function(t) {
            for (var e in o.prototype) t[e] = o.prototype[e];
            return t
        }(t)
    }
    t.exports = o, o.prototype.clearTimeout = function() {
        return clearTimeout(this._timer), clearTimeout(this._responseTimeoutTimer), delete this._timer, delete this._responseTimeoutTimer, this
    }, o.prototype.parse = function(t) {
        return this._parser = t, this
    }, o.prototype.responseType = function(t) {
        return this._responseType = t, this
    }, o.prototype.serialize = function(t) {
        return this._serializer = t, this
    }, o.prototype.timeout = function(t) {
        if (!t || "object" != typeof t) return this._timeout = t, this._responseTimeout = 0, this;
        for (var e in t) switch (e) {
            case "deadline":
                this._timeout = t.deadline;
                break;
            case "response":
                this._responseTimeout = t.response;
                break;
            default:
                console.warn("Unknown timeout option", e)
        }
        return this
    }, o.prototype.retry = function(t, e) {
        return 0 !== arguments.length && !0 !== t || (t = 1), t <= 0 && (t = 0), this._maxRetries = t, this._retries = 0, this._retryCallback = e, this
    };
    var i = ["ECONNRESET", "ETIMEDOUT", "EADDRINFO", "ESOCKETTIMEDOUT"];
    o.prototype._shouldRetry = function(t, e) {
        if (!this._maxRetries || this._retries++ >= this._maxRetries) return !1;
        if (this._retryCallback) try {
            var n = this._retryCallback(t, e);
            if (!0 === n) return !0;
            if (!1 === n) return !1
        } catch (t) {
            console.error(t)
        }
        if (e && e.status && e.status >= 500 && 501 != e.status) return !0;
        if (t) {
            if (t.code && ~i.indexOf(t.code)) return !0;
            if (t.timeout && "ECONNABORTED" == t.code) return !0;
            if (t.crossDomain) return !0
        }
        return !1
    }, o.prototype._retry = function() {
        return this.clearTimeout(), this.req && (this.req = null, this.req = this.request()), this._aborted = !1, this.timedout = !1, this._end()
    }, o.prototype.then = function(t, e) {
        if (!this._fullfilledPromise) {
            var n = this;
            this._endCalled && console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises"), this._fullfilledPromise = new Promise(function(t, e) {
                n.end(function(n, a) {
                    n ? e(n) : t(a)
                })
            })
        }
        return this._fullfilledPromise.then(t, e)
    }, o.prototype.catch = function(t) {
        return this.then(void 0, t)
    }, o.prototype.use = function(t) {
        return t(this), this
    }, o.prototype.ok = function(t) {
        if ("function" != typeof t) throw Error("Callback required");
        return this._okCallback = t, this
    }, o.prototype._isResponseOK = function(t) {
        return !!t && (this._okCallback ? this._okCallback(t) : t.status >= 200 && t.status < 300)
    }, o.prototype.get = function(t) {
        return this._header[t.toLowerCase()]
    }, o.prototype.getHeader = o.prototype.get, o.prototype.set = function(t, e) {
        if (a(t)) {
            for (var n in t) this.set(n, t[n]);
            return this
        }
        return this._header[t.toLowerCase()] = e, this.header[t] = e, this
    }, o.prototype.unset = function(t) {
        return delete this._header[t.toLowerCase()], delete this.header[t], this
    }, o.prototype.field = function(t, e) {
        if (null === t || void 0 === t) throw new Error(".field(name, val) name can not be empty");
        if (this._data && console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()"), a(t)) {
            for (var n in t) this.field(n, t[n]);
            return this
        }
        if (Array.isArray(e)) {
            for (var o in e) this.field(t, e[o]);
            return this
        }
        if (null === e || void 0 === e) throw new Error(".field(name, val) val can not be empty");
        return "boolean" == typeof e && (e = "" + e), this._getFormData().append(t, e), this
    }, o.prototype.abort = function() {
        return this._aborted ? this : (this._aborted = !0, this.xhr && this.xhr.abort(), this.req && this.req.abort(), this.clearTimeout(), this.emit("abort"), this)
    }, o.prototype._auth = function(t, e, n, a) {
        switch (n.type) {
            case "basic":
                this.set("Authorization", "Basic " + a(t + ":" + e));
                break;
            case "auto":
                this.username = t, this.password = e;
                break;
            case "bearer":
                this.set("Authorization", "Bearer " + t)
        }
        return this
    }, o.prototype.withCredentials = function(t) {
        return void 0 == t && (t = !0), this._withCredentials = t, this
    }, o.prototype.redirects = function(t) {
        return this._maxRedirects = t, this
    }, o.prototype.maxResponseSize = function(t) {
        if ("number" != typeof t) throw TypeError("Invalid argument");
        return this._maxResponseSize = t, this
    }, o.prototype.toJSON = function() {
        return {
            method: this.method,
            url: this.url,
            data: this._data,
            headers: this._header
        }
    }, o.prototype.send = function(t) {
        var e = a(t),
            n = this._header["content-type"];
        if (this._formData && console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()"), e && !this._data) Array.isArray(t) ? this._data = [] : this._isHost(t) || (this._data = {});
        else if (t && this._data && this._isHost(this._data)) throw Error("Can't merge these send calls");
        if (e && a(this._data))
            for (var o in t) this._data[o] = t[o];
        else "string" == typeof t ? (n || this.type("form"), n = this._header["content-type"], this._data = "application/x-www-form-urlencoded" == n ? this._data ? this._data + "&" + t : t : (this._data || "") + t) : this._data = t;
        return !e || this._isHost(t) ? this : (n || this.type("json"), this)
    }, o.prototype.sortQuery = function(t) {
        return this._sort = void 0 === t || t, this
    }, o.prototype._finalizeQueryString = function() {
        var t = this._query.join("&");
        if (t && (this.url += (this.url.indexOf("?") >= 0 ? "&" : "?") + t), this._query.length = 0, this._sort) {
            var e = this.url.indexOf("?");
            if (e >= 0) {
                var n = this.url.substring(e + 1).split("&");
                "function" == typeof this._sort ? n.sort(this._sort) : n.sort(), this.url = this.url.substring(0, e) + "?" + n.join("&")
            }
        }
    }, o.prototype._appendQueryString = function() {
        console.trace("Unsupported")
    }, o.prototype._timeoutError = function(t, e, n) {
        if (!this._aborted) {
            var a = new Error(t + e + "ms exceeded");
            a.timeout = e, a.code = "ECONNABORTED", a.errno = n, this.timedout = !0, this.abort(), this.callback(a)
        }
    }, o.prototype._setTimeouts = function() {
        var t = this;
        this._timeout && !this._timer && (this._timer = setTimeout(function() {
            t._timeoutError("Timeout of ", t._timeout, "ETIME")
        }, this._timeout)), this._responseTimeout && !this._responseTimeoutTimer && (this._responseTimeoutTimer = setTimeout(function() {
            t._timeoutError("Response timeout of ", t._responseTimeout, "ETIMEDOUT")
        }, this._responseTimeout))
    }
}, function(t, e, n) {
    "use strict";
    var a = n(12);

    function o(t) {
        if (t) return function(t) {
            for (var e in o.prototype) t[e] = o.prototype[e];
            return t
        }(t)
    }
    t.exports = o, o.prototype.get = function(t) {
        return this.header[t.toLowerCase()]
    }, o.prototype._setHeaderProperties = function(t) {
        var e = t["content-type"] || "";
        this.type = a.type(e);
        var n = a.params(e);
        for (var o in n) this[o] = n[o];
        this.links = {};
        try {
            t.link && (this.links = a.parseLinks(t.link))
        } catch (t) {}
    }, o.prototype._setStatusProperties = function(t) {
        var e = t / 100 | 0;
        this.status = this.statusCode = t, this.statusType = e, this.info = 1 == e, this.ok = 2 == e, this.redirect = 3 == e, this.clientError = 4 == e, this.serverError = 5 == e, this.error = (4 == e || 5 == e) && this.toError(), this.created = 201 == t, this.accepted = 202 == t, this.noContent = 204 == t, this.badRequest = 400 == t, this.unauthorized = 401 == t, this.notAcceptable = 406 == t, this.forbidden = 403 == t, this.notFound = 404 == t, this.unprocessableEntity = 422 == t
    }
}, function(t, e, n) {
    "use strict";
    e.type = function(t) {
        return t.split(/ *; */).shift()
    }, e.params = function(t) {
        return t.split(/ *; */).reduce(function(t, e) {
            var n = e.split(/ *= */),
                a = n.shift(),
                o = n.shift();
            return a && o && (t[a] = o), t
        }, {})
    }, e.parseLinks = function(t) {
        return t.split(/ *, */).reduce(function(t, e) {
            var n = e.split(/ *; */),
                a = n[0].slice(1, -1);
            return t[n[1].split(/ *= */)[1].slice(1, -1)] = a, t
        }, {})
    }, e.cleanHeader = function(t, e) {
        return delete t["content-type"], delete t["content-length"], delete t["transfer-encoding"], delete t.host, e && (delete t.authorization, delete t.cookie), t
    }
}, function(t, e) {
    function n() {
        this._defaults = []
    } ["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects", "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(function(t) {
        n.prototype[t] = function() {
            return this._defaults.push({
                fn: t,
                arguments: arguments
            }), this
        }
    }), n.prototype._setDefaults = function(t) {
        this._defaults.forEach(function(e) {
            t[e.fn].apply(t, e.arguments)
        })
    }, t.exports = n
}, , , , , , , , , function(t, e, n) {
    "use strict";
    n.r(e);
    var a = n(4),
        o = n.n(a),
        i = {
            android: function() {
                return navigator.userAgent.match(/Android/i)
            },
            blackberry: function() {
                return navigator.userAgent.match(/BlackBerry/i)
            },
            ios: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i)
            },
            opera: function() {
                return navigator.userAgent.match(/Opera Mini/i)
            },
            windows: function() {
                return navigator.userAgent.match(/IEMobile/i)
            },
            any: function() {
                return i.android() || i.blackberry() || i.ios() || i.opera() || i.windows()
            }
        },
        l = i,
        r = n(5),
        s = n.n(r),
        u = n(6),
        c = n(1),
        m = n.n(c),
        h = {
            ip: "72.228.10.129",
            hostname: "cpe-72-228-10-129.nycap.res.rr.com",
            type: "ipv4",
            continent_code: "NA",
            continent_name: "North America",
            country_code: "US",
            country_name: "United States",
            region_code: "MA",
            region_name: "Massachusetts",
            city: "Great Barrington",
            zip: "01230",
            latitude: 42.1617,
            longitude: -73.3277,
            location: {
                geoname_id: 4938157,
                capital: "Washington D.C.",
                languages: [{
                    code: "en",
                    name: "English",
                    native: "English"
                }],
                country_flag: "http://assets.ipstack.com/flags/us.svg",
                country_flag_emoji: "🇺🇸",
                country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
                calling_code: "1",
                is_eu: !1
            },
            time_zone: {
                id: "America/New_York",
                current_time: "2018-04-17T15:29:13-04:00",
                gmt_offset: -14400,
                code: "EDT",
                is_daylight_saving: !0
            },
            currency: {
                code: "USD",
                name: "US Dollar",
                plural: "US dollars",
                symbol: "$",
                symbol_native: "$"
            },
            connection: {
                asn: 11351,
                isp: "Time Warner Cable Internet LLC"
            },
            security: {
                is_proxy: !1,
                proxy_type: null,
                is_crawler: !1,
                crawler_name: null,
                crawler_type: null,
                is_tor: !1,
                threat_level: "low",
                threat_types: null
            }
        },
        d = !1,
        p = 4e3,
        f = null;

    function g(t) {
        var e = t.ip;
        if (d) return Promise.resolve(h);
        var n = "https://api.ipstack.com/".concat(e, "?access_key=").concat(f);
        return new Promise(function(t, e) {
            m.a.get(n).end(function(n, a) {
                if (n) e(n);
                else if (a && a.status >= 200 && a.status < 400) {
                    var o = JSON.parse(a.text);
                    o.error ? e(o.error) : t(o)
                } else e(n)
            })
        })
    }
    var y = function(t, e) {
        if (t) {
            f = t;
            var n = setTimeout(function() {
                return e("timeout")
            }, p);
            (d ? Promise.resolve(h) : new Promise(function(t, e) {
                m.a.get("https://api.ipify.org?format=json").end(function(n, a) {
                    n ? e(n) : a && a.status >= 200 && a.status < 400 ? t(JSON.parse(a.text)) : e(n)
                })
            })).then(g).then(function(t) {
                clearTimeout(n), e(null, t)
            }).catch(function(t) {
                return e(t)
            })
        } else e("error: must pass ipstack key")
    };

    function b(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {},
                a = Object.keys(n);
            "function" == typeof Object.getOwnPropertySymbols && (a = a.concat(Object.getOwnPropertySymbols(n).filter(function(t) {
                return Object.getOwnPropertyDescriptor(n, t).enumerable
            }))), a.forEach(function(e) {
                v(t, e, n[e])
            })
        }
        return t
    }

    function v(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }
    var x = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    function C(t) {
        console.log("setting up map");
        var e = d3.selectAll(".before-historic-toggle").on("click", function(t) {
            d3.select(this).classed("before-toggle-active") || (e.classed("before-toggle-active", !1), d3.select(this).classed("before-toggle-active", !0), 2017 == +d3.select(this).text ? (r = 2017, a.remove(), _()) : (r = 2018, a.remove(), _()))
        });
        d3.select(".about").select("p").on("click", function() {
            d3.select(".about-screen").classed("about-screen-visible") ? d3.select(".about-screen").classed("about-screen-visible", !1) : d3.select(".about-screen").classed("about-screen-visible", !0)
        }), d3.select(".close-button").on("click", function() {
            d3.select(".about-screen").classed("about-screen-visible") ? d3.select(".about-screen").classed("about-screen-visible", !1) : d3.select(".about-screen").classed("about-screen-visible", !0)
        }), x < 720 && (d3.select("#present-button").select("p").html("Waldzustand<br>2019"), d3.select("#compare-button").select("p").html("Vergleich<br>zu 2017"), d3.select("#delta-button").select("p").html(function() {
            return 'Veränderung<br>2017-19 <span class="legend-change"><span style="color:#bf4d2b;">--</span>vs.<span style="color:#357662;">++</span></span>'
        }));
        var n, a, o, i = 0,
            l = [{
                text: "<b>Visualisierung.</b> Irgendwas über die Daten und Visualisierung",
                location: {},
                button: "zu Waldgebiet X"
            }, {
                text: " über Wälder in Nordrhein-Westfalen",
                location: {
                    center: [7.69072, 51.18993],
					zoom: 7.95,
					pitch: 43.50,
					bearing: -21.02,
                    speed: .3,
                    easing: function(t) {
                        return t
                    }
                },
                button: "zu Waldgebiet XY"
            }, {
                text: "Über Waldschäden im Forstamt Hochstift",
                location: {
                    center: [9.01869, 51.65867],
					zoom: 9.60,
					pitch: 34.00,
					bearing: 34.40,
                    speed: .3,
                    easing: function(t) {
                        return t
                    }
                },
                button: "zu Waldgebiet XYZ"
            }, {
                text: "Vergleich zu Friederike oder sonstiges",
                location: {
                    center: [9.25545, 51.70647],
					zoom: 12.29,
					pitch: 0.00,
					bearing: 0.00,
                    speed: .3,
                    easing: function(t) {
                        return t
                    }
                },
                button: "auf Bundesebene"
            }, {
                text: "In Zukunft ist eine Skalierung auf überregionale Ebene erforderlich.",
                location: {
                    center: [10.16583, 50.99329],
					zoom: 5.85,
					pitch: 41.00,
					bearing: 0.00,
                    speed: .4,
                    easing: function(t) {
                        return t
                    }
                },
                button: ""
            }],
            r = 2018,
            s = d3.select(".tour-container"),
            u = !0,
            c = d3.select(".start-screen"),
            m = c.select(".start-button"),
            h = !1,
            d = d3.select(".before-map-container"),
            p = d3.select("#main-map"),
            f = "present",
            g = d3.select(".delta-map-container"),
            y = d3.select("#compare-map"),
            b = !1;

        function v(t) {
            var e = "width";
            if (x < 720 && (e = "height"), "delta-button" != t && "delta" == f && h && n.jumpTo({
                    center: o.getCenter(),
                    zoom: o.getZoom(),
                    pitch: o.getPitch(),
                    bearing: o.getBearing()
                }), "compare-button" == t ? (n.resize(), d.classed("extended", !0), p.transition().duration(400).style(e, "50%"), d.transition().duration(400).style(e, "50%").on("end", function(t) {
                    f = "compare", b ? a.jumpTo({
                        center: n.getCenter(),
                        zoom: n.getZoom(),
                        pitch: n.getPitch(),
                        bearing: n.getBearing()
                    }) : _(), n.resize()
                })) : "compare" == f && (d.classed("extended", !1), p.transition().duration(400).style(e, "100%"), d.transition().duration(400).style(e, "0%").on("end", function(t) {
                    a.remove(), n.resize()
                })), "delta-button" == t ? (f = "delta", h ? o.jumpTo({
                    center: n.getCenter(),
                    zoom: n.getZoom(),
                    pitch: n.getPitch(),
                    bearing: n.getBearing()
                }) : w(!1), g.transition().duration(500).style("transform", "translate(0px,0px)")) : g.transition().duration(500).style("transform", "translate(100%,0px)").on("end", function(t) {}), "present-button" == t) {
                f = "present";
                if (d3.select(".population").select("p").text("Fetching Population Count..."), x > 500) setTimeout(function() {
                    I()
                }, 1e3)
            } else d3.select(".population").select("p").text("")
        }

        function C(t, e) {
            "present" != f && (v("present-button"), d3.select(".top-toggles").selectAll("div").select("p").classed("top-toggle-active", !1), d3.select("#present-button").select("p").classed("top-toggle-active", !0));
            if ("backward" == e) {
                if (i == l.length - 1) v("present-button"), d3.select(".top-toggles").selectAll("div").select("p").classed("top-toggle-active", !1), d3.select("#present-button").select("p").classed("top-toggle-active", !0), s.select(".tour-button").style("opacity", null).style("pointer-events", null);
                i -= 1, i = Math.max(i, 0), s.select(".tour-text").html(l[i].text), s.select(".tour-button").text(l[i].button), s.select(".tour-toggle-text-current").text(i + 1), 0 != i && n.flyTo(l[i].location)
            } else if (i != l.length - 1) {
                if (i += 1, (i = Math.min(i, l.length - 1)) == l.length - 1) v("delta-button"), h ? o.flyTo(l[i].location) : w(!0), d3.select(".top-toggles").selectAll("div").select("p").classed("top-toggle-active", !1), d3.select("#delta-button").select("p").classed("top-toggle-active", !0), s.select(".tour-button").style("opacity", 0).style("pointer-events", "none");
                s.select(".tour-text").html(l[i].text), s.select(".tour-button").text(l[i].button), s.select(".tour-toggle-text-current").text(i + 1), 0 != i && n.flyTo(l[i].location)
            }
        }

        function _() {
            var t = "mapbox://styles/mapbox/light-v10"; //"mapbox://styles/dock4242/cjnl0k08b88ai2slsjxzk0jii?optimize=true";  
            2017 == r && (t = "mapbox://styles/mapbox/dark-v10"); //"mapbox://styles/dock4242/cjnn7622h02ph2smpyw7dhq4y?optimize=true"
            var e = 12;
            x < 500 && (e = 6.99), (a = new mapboxgl.Map({
                container: "compare-map",
                style: t,
                center: n.getCenter(),
                zoom: n.getZoom(),
                pitch: n.getPitch(),
                bearing: n.getBearing(),
                maxZoom: e,
                minZoom: 4.5
            })).on("load", function(t) {
                new mapboxgl.Compare(n, a, {}), y.style("pointer-events", "all")
            })
        }

        function w(t) {
            console.log(t), h = !0;
            var e = n.getCenter(),
                a = n.getZoom(),
                i = n.getPitch(),
                r = n.getBearing();
            if (t) {
                var s = l[l.length - 1].location;
                console.log(s), e = s.center, a = s.zoom, i = s.pitch, r = s.bearing
            }
            var u = 12;
            x < 500 && (u = 6.99), o = new mapboxgl.Map({
                container: "delta-map",
                style: "mapbox://styles/wiesehahn/ck2xfshz61op11dtdzhxfehrb", //"mapbox://styles/dock4242/cjnl4y42g1apa2ro2r6zjpuqz?optimize=true",
                center: e,
                zoom: a,
                pitch: i,
                bearing: r,
                maxZoom: u,
                minZoom: 4.5
            }), x < 500 && o.addControl(new mapboxgl.NavigationControl, "bottom-right")
        }

        function I() {
            var t = n.getBounds(),
                e = {
                    geodesic: !0,
                    type: "Polygon",
                    coordinates: [
                        [
                            [t.getSouthWest().lng, t.getSouthWest().lat],
                            [t.getNorthWest().lng, t.getNorthWest().lat],
                            [t.getNorthEast().lng, t.getNorthEast().lat],
                            [t.getSouthEast().lng, t.getSouthEast().lat]
                        ]
                    ]
                };
            ee.data.setApiKey("AIzaSyBTmn8bpyW1jWh67RN0aUDNSEsyuebUdYk"), ee.initialize();
            var a = ee.Image("JRC/GHSL/P2016/POP_GPW_GLOBE_V1/2015"),
                o = (a = a.clip(e)).reduceRegion({
                    reducer: ee.Reducer.sum(),
                    geometry: e,
                    scale: 250,
                    maxPixels: 1e9
                }),
                i = d3.precisionPrefix(1e5, 13e5),
                l = d3.formatPrefix(".".concat(i), 13e5);
            o.evaluate(function(t) {
                if (console.log(t), t) {
                    var e = t.population_count;
                    d3.select(".population").select("p").text(l(e) + " people reside on screen")
                } else d3.select(".population").select("p").text("")
            })
        }
        mapboxgl.accessToken = "pk.eyJ1Ijoid2llc2VoYWhuIiwiYSI6ImNrMnhjMzRmaTA3ejQzY3FydjN2bjV3djAifQ.dlWSd8EtIAmyjGmeK4MRAw"; //"pk.eyJ1IjoiZG9jazQyNDIiLCJhIjoiY2pjazE5eTM2NDl2aDJ3cDUyeDlsb292NiJ9.Jr__XbmAolbLyzPDj7-8kQ";
        var M = 7;
        x < 500 && (M = 6.5);
        var S, T = 14;
        x < 500 && (T = 6.99), n = new mapboxgl.Map({
            container: "main-map",
            style: "mapbox://styles/mapbox/satellite-v9", //"mapbox://styles/dock4242/cjnel8krq2ltq2spteciqe2x3?optimize=true",
            center: [t.lon, t.lat],
            zoom: M,
            pitch: 60,
            bearing: 0,
            maxZoom: T,
            minZoom: 3.5
        }), x > 500 && n.addControl(new mapboxgl.NavigationControl, "bottom-right"), n.on("load", function() {
            m.classed("start-active", !0).select("p").text("Zur Karte").on("click", function(t) {
                s.selectAll(".tour-toggle-arrow").on("click", function(t, e) {
                    C(l[i], 0 == e ? "backward" : "foward")
                }), s.select(".tour-toggle-text-amount").text("von " + l.length), s.select(".tour-text").html(l[i].text), s.select(".tour-button").text(l[i].button).on("click", function(t) {
                    C(l[i], "forward")
                }), s.select(".tour-hide").on("click", function(t) {
                    u ? (u = !1, s.classed("tour-hidden", !1)) : (u = !0, s.classed("tour-hidden", !0))
                }), c.transition().duration(500).style("opacity", 0).on("end", function(t) {
                    d3.select(".top-header").transition().duration(500).delay(100).style("transform", "translate(0px,0px)"), d3.select(".tour-container").transition().duration(0).delay(500).on("end", function(t) {
                        d3.select(this).classed("tour-hidden", !1).classed("tour-hidden-start", !1), u = !1
                    }), c.remove()
                })
            }), x > 500 && I()
        });
        var A = !1;
        x > 500 && (console.log("making moveend stuff"), n.on("moveend", function() {
                var t = "Fetching Population Count...";
                "present" != f && (t = ""), d3.select(".population").select("p").text(t), A ? clearTimeout(S) : A = !0, "present" == f && (S = setTimeout(function() {
                    I()
                }, 1e3))
            })),
            function() {
                var t = d3.select(".top-toggles");
                t.selectAll("div").select("p").on("click", function(e) {
                    v(d3.select(this.parentNode).attr("id")), t.selectAll("div").select("p").classed("top-toggle-active", !1), d3.select(this).classed("top-toggle-active", !0)
                })
            }()
    }
    var _ = {
            init: function() {
                (console.log("fetching coordinates"), new Promise(function(t) {
                    var e = {
                        latitude: 10.47975,
                        longitude: 50.52323
                    };
                    y("fd4d87f605681c0959c16d9164ab6a4a", function(n, a) {
                        var o = null;
                        if (n) o = b({}, e);
                        else {
                            var i = a.latitude,
                                l = a.longitude;
                            o = {
                                latitude: i,
                                longitude: l
                            }
                        }
                        var r = u.map(function(t) {
                            return b({}, t, {
                                dist: s.a.getDistanceSimple(o, t)
                            })
                        });
                        r.sort(function(t, e) {
                            return d3.descending(t.dist, e.dist)
                        });
                        var c = r.pop();
                        t(c)
                    })
                })).then(C)
            },
            resize: function() {}
        },
        w = d3.select("body"),
        I = 0;

    function M() {
        var t = w.node().offsetWidth;
        I !== t && (I = t, _.resize())
    }
    w.classed("is-mobile", l.any()), window.addEventListener("resize", o()(M, 150)), _.init()
}]);