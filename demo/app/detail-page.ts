import { EventData } from 'data/observable';
import {Page, NavigatedData} from "ui/page";
import  {DetailViewModel} from './detail-view-model';

import * as geolocation from "nativescript-geolocation";

// Event handler for Page "navigatingTo" event attached in main-page.xml
export function onNavigatedTo(args: NavigatedData) {
    
    (<Page>args.object).bindingContext = args.context;
}

