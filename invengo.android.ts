import applicationModule = require("application");

declare var com: any;
declare var java: any;
declare var android: any;

export class Invengo {
    private reader:any;
    private DEFULT_BANK = com.atid.lib.dev.rfid.type.BankType.EPC;
    private DEFAULT_OFFSET = 2;
    private DEFAULT_LENGTH = 2;

    constructor(){
        this.reader = com.atid.lib.dev.ATRfidManager.getInstance();
   }

  addReaderChangeListener(callback:any){
      try {
        this.reader.setEventListener(new com.atid.lib.dev.event.RfidReaderEventListener({
            onReaderActionChanged: (reader, actionState)=> {
                console.log(actionState);
            },
            onReaderStateChanged : (reader, state)=>{
                console.log(state);
            },
            onReaderReadTag : (reader, tag, v1, v2)=> {
               // TODO:
            },
            onReaderResult: (reader, code, action, epc, data,  rssi, phase)=>{
                callback(epc);
            }
        }));
      } catch (exception){
          console.error("Reader Error", exception.message);
      }
    }

    readTag(){
        let NoError = com.atid.lib.dev.rfid.type.ResultCode.NoError;

        let bank = this.DEFULT_BANK;
        let offset = this.DEFAULT_OFFSET;
        let length = this.DEFAULT_LENGTH;

        if (this.reader.readMemory6c(bank, offset, length) !== NoError){
              console.log("Failed to read tag");
        }
    }

    wakeUp(){
        com.atid.lib.dev.ATRfidManager.wakeUp();
    }
}
