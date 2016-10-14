import {Observable} from 'data/observable';
var invengoModule = require("nativescript-invengo");

export class HelloWorldModel extends Observable {

  private invengo:any;

  private _counter: number;
  private _message: string;

  constructor() {
    super();
    this.invengo = new invengoModule.Invengo();
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    if (this._message !== value) {
      this._message = value;
      this.notifyPropertyChange('message', value)
    }
  }

  public onScan() {
    this.invengo.readTag();
  }

  private updateMessage() {
    if (this._counter <= 0) {
      this.message = 'Hoorraaay! You unlocked the NativeScript clicker achievement!';
    } else {
      this.message = `${this._counter} taps left`;
    }
  }
}
