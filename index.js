module.exports = function(e) {
    function t(i) {
        if (r[i]) return r[i].exports;
        var a = r[i] = {
            exports: {},
            id: i,
            loaded: !1
        };
        return e[i].call(a.exports, a, a.exports, t), a.loaded = !0, a.exports;
    }
    var r = {};
    return t.m = e, t.c = r, t.p = "", t(0);
}([ function(e, t, r) {
    e.exports = r(1);
}, function(e, t, r) {
    "use strict";
    function i(e, t) {
        var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
        if (!e) throw new Error("No access token provided");
        if (!t) throw new Error("No Directus URL provided");
        this.accessToken = e, this.url = t, this.apiVersion = i, this.baseEndpoint = this.url + "/" + this.apiVersion + "/", 
        this.endpoints = r(2), Object.assign(this, r(3));
    }
    e.exports = i;
}, function(e, t) {
    "use strict";
    e.exports = {
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
        tablePrivileges: "privileges/%s/%s",
        fileList: "files",
        fileInformation: "files/%s",
        settingList: "settings",
        settingCollection: "settings/%s",
        messageList: "messages/rows",
        messageInformation: "messages/rows/%s",
        activity: "activity",
        bookmarkList: "bookmarks",
        bookmarkSelf: "bookmarks/self",
        bookmarkInformation: "bookmarks/%s",
        settings: "settings",
        settingsType: "settings/%s"
    };
}, function(e, t, r) {
    "use strict";
    var i = r(4), a = i.buildPath, s = i.performRequest, o = r(8), n = o.createItem, l = o.getItems, c = o.getItem, u = o.updateItem, d = o.deleteItem, p = r(10), f = p.createFile, b = p.getFiles, m = p.getFile, T = p.updateFile, k = r(11), g = k.getTables, v = k.getTable, h = k.createTable, O = r(12), N = O.createPrivilege, I = O.getGroupPrivilege, R = O.getTablePrivilege, q = O.updatePrivilege, E = r(13), C = E.getPreference, y = E.updatePreference, F = r(14), B = F.getMessages, P = F.getMessage, U = r(15), G = U.getActivity, j = r(16), S = j.getBookmarks, x = j.getUserBookmarks, L = j.getBookmark, J = j.createBookmark, w = j.deleteBookmark, _ = r(17), A = _.getSettings, D = _.getSettingsByCollection, M = _.updateSettings;
    e.exports = {
        buildPath: a,
        performRequest: s,
        createItem: n,
        getItems: l,
        getItem: c,
        updateItem: u,
        deleteItem: d,
        createFile: f,
        getFiles: b,
        getFile: m,
        updateFile: T,
        getTables: g,
        getTable: v,
        createTable: h,
        createPrivilege: N,
        getGroupPrivilege: I,
        getTablePrivilege: R,
        updatePrivilege: q,
        getPreference: C,
        updatePreference: y,
        getMessages: B,
        getMessage: P,
        getActivity: G,
        getBookmarks: S,
        getUserBookmarks: x,
        getBookmark: L,
        createBookmark: J,
        deleteBookmark: w,
        getSettings: A,
        getSettingsByCollection: D,
        updateSettings: M
    };
}, function(e, t, r) {
    "use strict";
    var i = r(5).vsprintf, a = r(6), s = r(7);
    e.exports = {
        buildPath: function(e, t) {
            return i(e, t);
        },
        performRequest: function() {
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
            } ], arguments), t = e.pathFormat.indexOf("%s") === -1 ? this.baseEndpoint + e.pathFormat : this.baseEndpoint + this.buildPath(e.pathFormat, e.variables), r = function(r, i, a) {
                if (r) throw new Error(r);
                r || 200 != i.statusCode ? 500 == i.statusCode ? e.callback(t + " returned internal server error (500)") : 404 == i.statusCode ? e.callback(t + " returned not found (404)") : 403 == i.statusCode && e.callback(t + " returned not authorized (403)") : e.callback(null, JSON.parse(a));
            };
            switch (e.method) {
              case "GET":
                a.get({
                    auth: {
                        bearer: this.accessToken
                    },
                    qs: e.paramsOrBody,
                    url: t
                }, r);
                break;

              case "POST":
                a.post({
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
                a.patch({
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
                a.delete({
                    auth: {
                        bearer: this.accessToken
                    },
                    url: t
                }, r);
            }
        }
    };
}, function(e, t) {
    e.exports = require("sprintf-js");
}, function(e, t) {
    e.exports = require("request");
}, function(e, t) {
    e.exports = require("args-js");
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("POST", this.endpoints.tableEntries, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getItems: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("GET", this.endpoints.tableEntries, r, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                id: i.INT | i.Required
            }, {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.id ];
            return this.performRequest("GET", this.endpoints.tableEntry, r, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updateItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                id: i.INT | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.id ];
            return this.performRequest("PUT", this.endpoints.tableEntry, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        deleteItem: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                id: i.INT | i.Required
            }, {
                deleteFromDB: i.BOOL | i.Optional,
                _default: !1
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table, e.id ];
            return e.deleteFromDB ? this.performRequest("DELETE", this.endpoints.tableEntry, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }) : this.performRequest("PUT", this.endpoints.tableEntry, r, {
                active: 0
            }, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t) {
    e.exports = require("q");
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createFile: function() {
            var e = i([ {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments);
            this.createItem("directus_files", e.data, e.callback);
        },
        getFiles: function() {
            var e = i([ {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.fileList, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getFile: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.fileInformation, r, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updateFile: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments);
            this.updateItem("directus_files", e.id, e.data, e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createTable: function() {
            if (this.apiVersion < 1.1) throw Error("This method can't be used with api version " + this.apiVersion + " use version ^1.1 instead");
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("POST", this.endpoints.tableList, {
                name: e.table
            }, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getTables: function() {
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.tableList, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getTable: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("GET", this.endpoints.tableInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        createPrivileges: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("POST", this.endpoints.columnList, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getGroupPrivileges: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.columnList, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getTablePrivileges: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id, e.table ];
            return this.performRequest("GET", this.endpoints.tablePrivileges, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updatePrivileges: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                privId: i.INT | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id, e.privId ];
            return this.performRequest("PUT", this.endpoints.tablePrivileges, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getPreference: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("GET", this.endpoints.tablePreferences, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updatePreference: function() {
            var e = i([ {
                table: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.table ];
            return this.performRequest("PUT", this.endpoints.tablePreferences, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getMessages: function() {
            var e = i([ {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.messageList, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getMessage: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.messageInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getActivity: function() {
            var e = i([ {
                params: i.OBJECT | i.Optional,
                _default: {}
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.activity, e.params, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getBookmarks: function() {
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.bookmarkList, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getUserBookmarks: function() {
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.bookmarkSelf, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getBookmark: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("GET", this.endpoints.bookmarkInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        createBookmark: function() {
            var e = i([ {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("POST", this.endpoints.bookmarkList, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        deleteBookmark: function() {
            var e = i([ {
                id: i.INT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.id ];
            return this.performRequest("DELETE", this.endpoints.bookmarkInformation, r, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
}, function(e, t, r) {
    "use strict";
    var i = r(7), a = r(9);
    e.exports = {
        getSettings: function() {
            var e = i([ {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer();
            return this.performRequest("GET", this.endpoints.settings, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        getSettingsByCollection: function() {
            var e = i([ {
                collection: i.STRING | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.collection ];
            return this.performRequest("GET", this.endpoints.settingsType, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        },
        updateSettings: function() {
            var e = i([ {
                collection: i.STRING | i.Required
            }, {
                data: i.OBJECT | i.Required
            }, {
                callback: i.FUNCTION | i.Optional
            } ], arguments), t = a.defer(), r = [ e.collection ];
            return this.performRequest("PUT", this.endpoints.settingsType, r, e.data, function(e, r) {
                e && t.reject(e), t.resolve(r);
            }), t.promise.nodeify(e.callback);
        }
    };
} ]);