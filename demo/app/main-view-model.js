"use strict";
var frameModule = require('ui/frame');
var geolocation = require("nativescript-geolocation");
var observable_1 = require('data/observable');
var invengoModule = require("nativescript-invengo");
var SqlLite = require('nativescript-sqlite');
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        var _this = this;
        _super.call(this);
        var that = this;
        that.set("location", {
            latitude: 37.4419,
            longitude: -122.1430
        });
        new SqlLite(global.DBNAME, function (err, db) {
            if (err) {
                console.log("Failed initialize the storage", err);
            }
            console.log("Database Status: " + db.isOpen());
            that.database = db;
        });
        this._invengo = new invengoModule.Invengo();
        this._invengo.addReaderChangeListener(function (epc) {
            that.database.execSQL("insert into invengo (tag, lat, lng, createdAt) values (?, ?, ? , ?)", [epc, that.location.latitude, that.location.longitude, new Date()], function (err, id) {
                if (err) {
                    console.log(err);
                }
                that.tag = epc;
                console.log(epc);
            });
        });
        var schema = "CREATE TABLE IF NOT EXISTS invengo (id integer primary key, tag text, lat number, lng number, createdAt text)";
        this.database.execSQL(schema).then(function (err, id) {
            var watchId = geolocation.watchLocation(function (loc) {
                if (loc) {
                    console.log(loc);
                    that.set("location", {
                        latitude: loc.latitude.toFixed(4),
                        longitude: loc.longitude
                    });
                    geolocation.clearWatch(watchId);
                }
            }, function (e) {
                console.log("Error: " + e.message);
            }, {
                updateDistance: 0.1,
                minimumUpdateTime: 100
            });
            _this.tag = "--";
        });
    }
    Object.defineProperty(MainViewModel.prototype, "invengo", {
        get: function () {
            return this._invengo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainViewModel.prototype, "location", {
        get: function () {
            return this._location;
        },
        set: function (value) {
            if (this._location !== value) {
                this._location = value;
                this.notifyPropertyChange('location', value);
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