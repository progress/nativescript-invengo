import frameModule = require('ui/frame');
import * as geolocation from "nativescript-geolocation";

import {Observable} from 'data/observable';
import {ObservableArray} from "data/observable-array";

var invengoModule = require("nativescript-invengo");
var SqlLite = require('nativescript-sqlite');

export interface Location {
    lat : number,
    lng : number
}

export class MainViewModel extends Observable {

  private _invengo:any;

  private _counter: number;
  private _tag: string;
  private database:any;


  private _locations: ObservableArray<geolocation.Location>;
  private _location:Location;

  constructor() {
    super();

    let that = this;

    this._location  = {
       lat : 37.4419,
       lng : -122.1430
    };

    new SqlLite(global.DBNAME, (err, db)=>{
        if (err){
            console.log("Failed initialize the storage", err);
        }
        console.log("Database Status: " + db.isOpen());

        that.database = db;
   });

    this._invengo = new invengoModule.Invengo();

    this._invengo.addReaderChangeListener((epc)=>{
        that.database.execSQL("insert into invengo (tag, lat, lng, createdAt) values (?, ?, ? , ?)", [epc, that.location.lat, that.location.lng, new Date()], (err, id)=>{
          if (err){
            console.log(err);
          }
          that.tag = epc;
          console.log(epc);
        });
    });

    let schema = "CREATE TABLE IF NOT EXISTS invengo (id integer primary key, tag text, lat number, lng number, createdAt text)"

    this.database.execSQL(schema).then((err, id)=>{
      let watchId = geolocation.watchLocation((loc)=>{
          if (loc){
              that.set("location", {
                  lat : loc.latitude.toFixed(4),
                  lng: loc.longitude
              });
              geolocation.clearWatch(watchId);
          }
      }, (e)=>{
          console.log("Error: " + e.message);
      },{
        updateDistance: 0.1,
        minimumUpdateTime: 100
      });

      this.tag = "--";
    });
  }

  public get invengo(): any {
    return this._invengo;
  }

  public get locations(): ObservableArray<geolocation.Location> {
      if (!this._locations) {
          this._locations = new ObservableArray<geolocation.Location>();
      }
      return this._locations;
  }

  public set locations(value: ObservableArray<geolocation.Location>) {
      if (this._locations !== value) {
          this._locations = value;
          this.notifyPropertyChange('locations', value)
      }
  }

  public get location(): Location {
    return this._location;
  }

  public set location(value: Location) {
    if (this._location !== value) {
      this._location = value;
      this.notifyPropertyChange('location', value);
    }
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
    this._invengo.readTag();
  }

  public history(){
      frameModule.topmost().navigate("history");
  }
}
