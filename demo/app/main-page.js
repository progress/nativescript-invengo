"use strict";
var main_view_model_1 = require('./main-view-model');
// Event handler for Page "navigatingTo" event attached in main-page.xml
function pageLoaded(args) {
    // Get the event sender
    var page = args.object;
    var viewModel = new main_view_model_1.MainViewModel();
    viewModel.invengo.wakeUp();
    page.bindingContext = viewModel;
}
exports.pageLoaded = pageLoaded;
//# sourceMappingURL=main-page.js.map