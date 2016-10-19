"use strict";
var frameModule = require('ui/frame');
var observable_1 = require('data/observable');
var invengoModule = require("nativescript-invengo");
var SqlLite = require('nativescript-sqlite');
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        var _this = this;
        _super.call(this);
        var that = this;
        new SqlLite(global.DBNAME, function (err, db) {
            if (err) {
                console.log("Failed initialize the storage", err);
            }
            console.log("Database Status: " + db.isOpen());
            that.database = db;
        });
        this.invengo = new invengoModule.Invengo();
        this.invengo.addReaderChangeListener(function (epc) {
            that.database.execSQL("insert into invengo (tag, createdAt) values (?, ?)", [epc, new Date()], function (err, id) {
                if (err) {
                    console.log(err);
                }
                that.tag = epc;
            });
        });
        var schema = "CREATE TABLE IF NOT EXISTS invengo (id integer primary key, tag text, createdAt text)";
        this.database.execSQL(schema).then(function (err, id) {
            _this.invengo.wakeUp();
        });
        this.tag = "--";
    }
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
        this.invengo.readTag();
    };
    MainViewModel.prototype.history = function () {
        frameModule.topmost().navigate("history");
    };
    return MainViewModel;
}(observable_1.Observable));
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map