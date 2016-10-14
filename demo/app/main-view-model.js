"use strict";
var observable_1 = require('data/observable');
var invengoModule = require("nativescript-invengo");
var HelloWorldModel = (function (_super) {
    __extends(HelloWorldModel, _super);
    function HelloWorldModel() {
        _super.call(this);
        this.invengo = new invengoModule.Invengo();
    }
    Object.defineProperty(HelloWorldModel.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            if (this._message !== value) {
                this._message = value;
                this.notifyPropertyChange('message', value);
            }
        },
        enumerable: true,
        configurable: true
    });
    HelloWorldModel.prototype.onScan = function () {
        this.invengo.readTag();
    };
    HelloWorldModel.prototype.updateMessage = function () {
        if (this._counter <= 0) {
            this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
        }
        else {
            this.message = this._counter + " taps left";
        }
    };
    return HelloWorldModel;
}(observable_1.Observable));
exports.HelloWorldModel = HelloWorldModel;
//# sourceMappingURL=main-view-model.js.map