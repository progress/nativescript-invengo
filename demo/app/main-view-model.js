"use strict";
var frameModule = require('ui/frame');
var geolocation = require("nativescript-geolocation");
var observable_1 = require('data/observable');
var observable_array_1 = require("data/observable-array");
var invengoModule = require("nativescript-invengo");
var SqlLite = require('nativescript-sqlite');
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
        var that = this;
        new SqlLite(global.DBNAME, function (err, db) {
            if (err) {
                console.log("Failed initialize the storage", err);
            }
            console.log("Database Status: " + db.isOpen());
            that.database = db;
        });
        this._invengo = new invengoModule.Invengo();
        this._invengo.addReaderChangeListener(function (epc) {
            that.database.execSQL("insert into invengo (tag, createdAt) values (?, ?)", [epc, new Date()], function (err, id) {
                if (err) {
                    console.log(err);
                }
                that.tag = epc;
                console.log(epc);
            });
        });
        var schema = "CREATE TABLE IF NOT EXISTS invengo (id integer primary key, tag text, createdAt text)";
        this.database.execSQL(schema).then(function (err, id) {
            var loc = {
                latitude: 37.4419,
                longitude: -122.1430
            };
            // default location.
            that.locations.push(loc);
            var location = geolocation.getCurrentLocation({ updateDistance: 0.1, timeout: 2000 }).
                then(function (loc) {
                console.log(loc);
                if (loc) {
                    that.locations.push(loc);
                }
            }, function (e) {
                console.log("Error: " + e.message);
            });
        });
        this.tag = "--";
    }
    Object.defineProperty(MainViewModel.prototype, "invengo", {
        get: function () {
            return this._invengo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "locations", {
        get: function () {
            if (!this._locations) {
                this._locations = new observable_array_1.ObservableArray();
            }
            return this._locations;
        },
        set: function (value) {
            if (this._locations !== value) {
                this._locations = value;
                this.notifyPropertyChange('locations', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "tag", {
        get: function () {
            return this._tag;
        },
        set: function (value) {
            if (this._tag !== value) {
                this._tag = value;
                this.notifyPropertyChange('tag', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    MainViewModel.prototype.onScan = function () {
        this._invengo.readTag();
    };
    MainViewModel.prototype.history = function () {
        frameModule.topmost().navigate("history");
    };
    return MainViewModel;
}(observable_1.Observable));
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map