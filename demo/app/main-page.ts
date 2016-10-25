import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { MainViewModel } from './main-view-model';

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function pageLoaded(args: EventData) {
  // Get the event sender
  let page = <Page>args.object;

  var viewModel = new MainViewModel();

  viewModel.invengo.wakeUp();

  page.bindingContext = viewModel;
}

