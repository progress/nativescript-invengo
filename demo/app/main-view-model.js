"use strict";
var observable_1 = require('data/observable');
var invengoModule = require("nativescript-invengo");
var MainViewModel = (function (_super) {
    __extends(MainViewModel, _super);
    function MainViewModel() {
        _super.call(this);
        this.invengo = new invengoModule.Invengo();
        var _this = this;
        this.invengo.addReaderChangeListener(function (epc) {
            _this.tag = epc;
        });
        this.invengo.wakeUp();
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
    return MainViewModel;
}(observable_1.Observable));
exports.MainViewModel = MainViewModel;
//# sourceMappingURL=main-view-model.js.map