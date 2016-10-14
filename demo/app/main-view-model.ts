import {Observable} from 'data/observable';
var invengoModule = require("nativescript-invengo");

export class MainViewModel extends Observable {

  private invengo:any;

  private _counter: number;
  private _tag: string;

  constructor() {
    super();
    this.invengo = new invengoModule.Invengo();

    let _this = this;

    this.invengo.addReaderChangeListener((epc)=>{
        _this.tag = epc;
    });

    this.invengo.wakeUp();

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
}
