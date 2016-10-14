declare module "nativescript-invengo" {
    export class Invengo {
        constructor();
        addReaderChangeListener(callback:any);
        readTag();
        wakeUp();
    }
}
