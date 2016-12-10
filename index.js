module.exports = function(e) {
    function t(a) {
        if (r[a]) return r[a].exports;
        var n = r[a] = {
            exports: {},
            id: a,
            loaded: !1
        };
        return e[a].call(n.exports, n, n.exports, t), n.loaded = !0, n.exports;
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0);
}([ function(e, t, r) {
    e.exports = r(1);
}, function(e, t, r) {
    "use strict";
    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    function n(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t;
    }
    function i(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
    }
    var o = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var a = t[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                Object.defineProperty(e, a.key, a);
            }
        }
        return function(t, r, a) {
            return r && e(t.prototype, r), a && e(t, a), t;
        };
    }(), s = r(2), l = r(6), c = r(5), u = function(e) {
        function t() {
            return a(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments));
        }
        return i(t, e), o(t, [ {
            key: "getTables",
            value: function() {
                var e = c([ {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer();
                return this.performRequest("GET", this.endpoints.tableList, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getTable",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table ];
                return this.performRequest("GET", this.endpoints.tableInformation, r, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getColumns",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table ];
                return this.performRequest("GET", this.endpoints.columnList, r, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getColumn",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    column: c.STRING | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table, e.column ];
                return this.performRequest("GET", this.endpoints.columnInformation, r, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getEntries",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table ];
                return this.performRequest("GET", this.endpoints.tableEntries, r, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getEntry",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    id: c.INT | c.Required
                }, {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table, e.id ];
                return this.performRequest("GET", this.endpoints.tableEntry, r, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getUsers",
            value: function() {
                var e = c([ {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                return this.getEntries("directus_users", e.params, e.callback);
            }
        }, {
            key: "getUser",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                return this.getEntry("directus_users", e.id, e.params, e.callback);
            }
        }, {
            key: "getGroups",
            value: function() {
                var e = c([ {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer();
                return this.performRequest("GET", this.endpoints.groupList, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getGroup",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                } ], arguments), t = l.defer(), r = [ e.id ];
                return this.performRequest("GET", this.endpoints.groupInformation, r, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getGroupPrivileges",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.id ];
                return this.performRequest("GET", this.endpoints.groupPrivileges, r, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getFiles",
            value: function() {
                var e = c([ {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer();
                return this.performRequest("GET", this.endpoints.fileList, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getFile",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    params: c.OBJECT | c.Optional,
                    _default: {}
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.id ];
                return this.performRequest("GET", this.endpoints.fileInformation, r, e.params, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getSettings",
            value: function() {
                var e = c([ {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer();
                return this.performRequest("GET", this.endpoints.settingList, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getSettingsByCollection",
            value: function() {
                var e = c([ {
                    collectionName: c.STRING | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.collectionName ];
                return this.performRequest("GET", this.endpoints.settingCollection, r, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "getMessages",
            value: function() {
                var e = c([ {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer();
                return t.reject(""), t.nodeify(e.callback);
            }
        }, {
            key: "createEntry",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    data: c.OBJECT | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table ];
                return this.performRequest("POST", this.endpoints.tableEntries, r, e.data, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "updateEntry",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    id: c.INT | c.Required
                }, {
                    data: c.OBJECT | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table, e.id ];
                return this.performRequest("PATCH", this.endpoints.tableEntry, r, e.data, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "deleteEntry",
            value: function() {
                var e = c([ {
                    table: c.STRING | c.Required
                }, {
                    id: c.INT | c.Required
                }, {
                    deleteFromDB: c.BOOL | c.Optional,
                    _default: !1
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments), t = l.defer(), r = [ e.table, e.id ];
                return e.deleteFromDB ? this.performRequest("DELETE", this.endpoints.tableEntry, r, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }) : this.performRequest("PATCH", this.endpoints.tableEntry, r, {
                    active: 0
                }, function(e, r) {
                    e && t.reject(e), t.resolve(r);
                }), t.promise.nodeify(e.callback);
            }
        }, {
            key: "createUser",
            value: function() {
                var e = c([ {
                    data: c.OBJECT | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                this.createEntry("directus_users", e.data, e.callback);
            }
        }, {
            key: "updateUser",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    data: c.OBJECT | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                this.updateEntry("directus_users", e.id, e.data, e.callback);
            }
        }, {
            key: "deleteUser",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    deleteFromDB: c.BOOL | c.Optional,
                    _default: !1
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                this.deleteEntry("directus_users", e.id, e.deleteFromDB, e.callback);
            }
        }, {
            key: "createFile",
            value: function() {
                var e = c([ {
                    data: c.OBJECT | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                this.createEntry("directus_files", e.data, e.callback);
            }
        }, {
            key: "updateFile",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    data: c.OBJECT | c.Required
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                this.updateEntry("directus_files", e.id, e.data, e.callback);
            }
        }, {
            key: "deleteFile",
            value: function() {
                var e = c([ {
                    id: c.INT | c.Required
                }, {
                    deleteFromDB: c.BOOL | c.Optional,
                    _default: !1
                }, {
                    callback: c.FUNCTION | c.Optional
                } ], arguments);
                this.deleteEntry("directus_files", e.id, e.deleteFromDB, e.callback);
            }
        } ]), t;
    }(s);
    e.exports = u;
}, function(e, t, r) {
    "use strict";
    function a(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    var n = function() {
        function e(e, t) {
            for (var r = 0; r < t.length; r++) {
                var a = t[r];
                a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), 
                Object.defineProperty(e, a.key, a);
            }
        }
        return function(t, r, a) {
            return r && e(t.prototype, r), a && e(t, a), t;
        };
    }(), i = r(3).vsprintf, o = r(4), s = r(5), l = function() {
        function e() {
            a(this, e);
            var t = s([ {
                accessToken: s.STRING | s.Required
            }, {
                options: s.OBJECT | s.Required
            } ], arguments);
            if (this.apiVersion = t.options.apiVersion || 1, this.accessToken = t.accessToken, 
            !t.options.instanceKey && !t.options.baseUrl) throw new Error("You need to provide an instance key to a hosted Directus installation, or provide your own base url.");
            if (t.options.instanceKey && t.options.baseUrl) throw new Error("You can't provide an instance key and a base url. Please choose one of the two connection methods.");
            t.options.instanceKey ? (this.instanceKey = t.options.instanceKey, this.baseEndpoint = "https://" + t.options.instanceKey + ".directus.io/api/" + this.apiVersion + "/") : t.options.baseUrl.match(/api\/?$/) ? this.baseEndpoint = t.options.baseUrl.replace(/\/$/g, "") + "/" + this.apiVersion + "/" : this.baseEndpoint = t.options.baseUrl.replace(/\/$/g, "") + "/api/" + this.apiVersion + "/";
        }
        return n(e, [ {
            key: "performRequest",
            value: function() {
                var e = s([ {
                    method: s.STRING | s.Required
                }, {
                    pathFormat: s.STRING | s.Required
                }, {
                    variables: s.ARRAY | s.Optional,
                    _default: []
                }, {
                    paramsOrBody: s.OBJECT | s.Optional,
                    _default: {}
                }, {
                    callback: s.FUNCTION | s.Required
                } ], arguments), t = e.pathFormat.indexOf("%s") === -1 ? this.baseEndpoint + e.pathFormat : this.baseEndpoint + this.buildPath(e.pathFormat, e.variables), r = function(r, a, n) {
                    if (r) throw new Error(r);
                    r || 200 != a.statusCode ? 500 == a.statusCode ? e.callback(t + " returned internal server error (500)") : 404 == a.statusCode ? e.callback(t + " returned not found (404)") : 403 == a.statusCode && e.callback(t + " returned not authorized (403)") : e.callback(null, JSON.parse(n));
                };
                switch (e.method) {
                  case "GET":
                    o.get({
                        auth: {
                            bearer: this.accessToken
                        },
                        qs: e.paramsOrBody,
                        url: t
                    }, r);
                    break;

                  case "POST":
                    o.post({
                        auth: {
                            bearer: this.accessToken
                        },
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(e.paramsOrBody),
                        url: t
                    }, r);
                    break;

                  case "PATCH":
                    o.patch({
                        auth: {
                            bearer: this.accessToken
                        },
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(e.paramsOrBody),
                        url: t
                    }, r);
                    break;

                  case "DELETE":
                    o.delete({
                        auth: {
                            bearer: this.accessToken
                        },
                        url: t
                    }, r);
                }
            }
        }, {
            key: "buildPath",
            value: function(e, t) {
                return i(e, t);
            }
        }, {
            key: "endpoints",
            get: function() {
                return {
                    tableEntries: "tables/%s/rows",
                    tableEntry: "tables/%s/rows/%s",
                    tableList: "tables",
                    tableInformation: "tables/%s",
                    tablePreferences: "tables/%s/preferences",
                    columnList: "tables/%s/columns",
                    columnInformation: "tables/%s/columns/%s",
                    groupList: "groups",
                    groupInformation: "groups/%s",
                    groupPrivileges: "privileges/%s",
                    fileList: "files",
                    fileInformation: "files/%s",
                    settingList: "settings",
                    settingCollection: "settings/%s"
                };
            }
        } ]), e;
    }();
    e.exports = l;
}, function(e, t) {
    e.exports = require("sprintf-js");
}, function(e, t) {
    e.exports = require("request");
}, function(e, t) {
    e.exports = require("args-js");
}, function(e, t) {
    e.exports = require("q");
} ]);