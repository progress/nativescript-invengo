import frameModule = require('ui/frame');

import * as geolocation from "nativescript-geolocation";

import observable = require("data/observable");
import {Observable} from 'data/observable';

export class DetailViewModel extends observable.Observable {
    private _tag:string;
    private _location:geolocation.Location;

    constructor() {
        super();
        
        this.set("location", {
            latitude :  37.4419,
            longitude: -122.1430
        });
    }

    public get location(): geolocation.Location {
        return this._location;
    }

    public set location(value: geolocation.Location) {
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
            this.notifyPropertyChange('tag', value);
        }
    }

    public back(){
        frameModule.topmost().goBack();
    }

}
