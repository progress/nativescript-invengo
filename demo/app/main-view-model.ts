import frameModule = require('ui/frame');

import {Observable} from 'data/observable';

var invengoModule = require("nativescript-invengo");
var SqlLite = require('nativescript-sqlite');

export class MainViewModel extends Observable {

  private invengo:any;

  private _counter: number;
  private _tag: string;
  private database:any;

  constructor() {
    super();

    let that = this;

    new SqlLite(global.DBNAME, (err, db)=>{
        if (err){
            console.log("Failed initialize the storage", err);
        }
        console.log("Database Status: " + db.isOpen());

        that.database = db;
    });

    this.invengo = new invengoModule.Invengo();

    this.invengo.addReaderChangeListener((epc)=>{
        that.database.execSQL("insert into invengo (tag, createdAt) values (?, ?)", [epc, new Date()], (err, id)=>{
          if (err){
            console.log(err);
          }
          that.tag = epc;
        });
    });

    let schema = "CREATE TABLE IF NOT EXISTS invengo (id integer primary key, tag text, createdAt text)"

    this.database.execSQL(schema).then((err, id)=>{
      this.invengo.wakeUp();
    });
 
    this.tag = "--";
  }

  get tag(): string {
    return this._tag;
  }

  set tag(value: string) {
    if (this._tag !== value) {
      this._tag = value;
      this.notifyPropertyChange('tag', value)
    }
  }

  public onScan() {
    this.invengo.readTag();
  }

  public history(){
      frameModule.topmost().navigate("history");
  }
}
