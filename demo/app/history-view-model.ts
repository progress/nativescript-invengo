import frameModule = require('ui/frame');

import * as geolocation from "nativescript-geolocation";

import observable = require("data/observable");
import {Observable} from 'data/observable';

var SqlLite = require('nativescript-sqlite');

import DetailViewModule = require("./detail-view-model");

export interface HistoryItem {
    tag : string,
    lat : number,
    lng : number
    date : string,
}

export class HistoryViewModel extends observable.Observable {

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

                           console.log(columns);

                            let historyItem = {
                                 tag : columns[1],
                                 lat : that.toFixed(columns[2]),
                                 lng : that.toFixed(columns[3]),
                                 date : columns[4]
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

  public onTap(args) {
    let item:HistoryItem = args.view.bindingContext;

    let context  = new DetailViewModule.DetailViewModel();

    context.set("tag", item.tag);

    // context.set("location", {
    //     latitude : item.lat,
    //     longitude: item.lng
    // });

     let navEntry = {
         moduleName : "detail-page",
         context : context
     }
    
     frameModule.topmost().navigate(navEntry);
  }

  public toFixed(value) {
      return parseFloat(value).toFixed(4);
  }

}
