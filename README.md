# Nativescript Invengo Plugin
Invengo RFID reader plugin for nativescript

Fill in a little about your plugin!

## Installation
To install type

```
tns plugin add nativescript-invengo

```

If you're using TypeScript and wish to make use of the type definitions for this plugin, add the following line to your project's **references.d.ts** file:

```
  /// <reference path="./node_modules/nativescript-invengo/invengo.d.ts" />
```

Without the above line included, your TypeScript compiler may throw errors during the build.

## Methods

- invengo.wakeUp()
- invengo.readTag()

## Usage

Including the Plugin in Your Project

    var invengoModule = require("nativescript-invengo");


Next, in order to initialize the reader, first you have to a listener and then call the `wakeUp` method:

```
    this.invengo = new invengoModule.Invengo();

    let _this = this;

    this.invengo.addReaderChangeListener((epc)=>{
        _this.tag = epc;
    });

    this.invengo.wakeUp();

```

Given that you have configured the plugin in a view / app scope, `readTag` reads an EPC tag with an Invengo XC-1003 android device.

```
// native-script method
public onScan() {
  this.invengo.readTag();
}

```
## Platform

Android (Invengo XC-1003)

## License
This plugin is licensed under the Apache 2.0 by Progress Software
