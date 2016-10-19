import frameModule = require('ui/frame');

import observable = require("data/observable");
import http = require('http');
import {Observable} from 'data/observable';

var SqlLite = require('nativescript-sqlite');

export interface HistoryItem {
    tag : string,
    date : string,
}

export class HistoryModel extends observable.Observable {

    private database:any;
    private _history:Array<HistoryItem>;

    constructor() {
        super();

        let that  = this;

        new SqlLite(global.DBNAME, (err, db)=>{
            if (err){
                console.log("Failed initialize the storage", err);
            }
            console.log("Database Status: " + db.isOpen());

            that.database = db;

            var items = [];

             db.all("SELECT * FROM invengo").then(rows => {
                    for(var row in rows) {
                        
                        try {
                           var item = rows[row];
                           var columns = item.toString().split(",");

                            let historyItem = {
                                 tag : columns[1],
                                 date : columns[2]
                            }

                            items.push(historyItem);

                        } catch(ex){
                            console.log(ex);
                        }
                        that.set("history", items);
                    }
                }, error => {
                    console.log("SELECT ERROR", error);
            });

        //     db.each("select * from invengo", [], (err, row)=>{

        //         try {
        //             let columns = row.split(',');
                
        //             console.log(columns);

        //             // let historyItem = {
        //             //     tag : columns[1],
        //             //     date : columns[2]
        //             // }

        //             // items.push(historyItem);
        //        } catch (ex){
        //            console.log(ex);
        //        }

        //     }, (err, count)=> {
        //         // that.set("history", items);
        //         console.log("Rows displayed:", count); 
        //     });
        });
   }

  get history() {
    return this._history;
  }

  set history(value: Array<HistoryItem>) {
    if (value.length){
      this._history= value;
      this.notifyPropertyChange("history", value)
    }
  }

  public back(){
    frameModule.topmost().goBack();
  }

}
