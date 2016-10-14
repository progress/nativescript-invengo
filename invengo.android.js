"use strict";
var Invengo = (function () {
    function Invengo() {
        this.DEFULT_BANK = com.atid.lib.dev.rfid.type.BankType.EPC;
        this.DEFAULT_OFFSET = 2;
        this.DEFAULT_LENGTH = 2;
        this.reader = com.atid.lib.dev.ATRfidManager.getInstance();
    }
    Invengo.prototype.addReaderChangeListener = function (callback) {
        try {
            this.reader.setEventListener(new com.atid.lib.dev.event.RfidReaderEventListener({
                onReaderActionChanged: function (reader, actionState) {
                    console.log(actionState);
                },
                onReaderStateChanged: function (reader, state) {
                    console.log(state);
                },
                onReaderReadTag: function (reader, tag, v1, v2) {
                    // TODO:
                },
                onReaderResult: function (reader, code, action, epc, data, rssi, phase) {
                    callback(epc);
                }
            }));
        }
        catch (exception) {
            console.error("Reader Error", exception.message);
        }
    };
    Invengo.prototype.readTag = function () {
        var NoError = com.atid.lib.dev.rfid.type.ResultCode.NoError;
        var bank = this.DEFULT_BANK;
        var offset = this.DEFAULT_OFFSET;
        var length = this.DEFAULT_LENGTH;
        if (this.reader.readMemory6c(bank, offset, length) !== NoError) {
            console.log("Failed to read tag");
        }
    };
    Invengo.prototype.wakeUp = function () {
        com.atid.lib.dev.ATRfidManager.wakeUp();
    };
    return Invengo;
}());
exports.Invengo = Invengo;
