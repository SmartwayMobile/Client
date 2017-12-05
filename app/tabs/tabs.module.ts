import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { BrowseComponent } from "./browse/browse.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import { OpenDataService } from "./services/open-data.service";

@NgModule({
    imports: [
        NativeScriptModule,
        TabsRoutingModule,
        NativeScriptHttpModule
    ],
    declarations: [
        TabsComponent,
        HomeComponent,
        BrowseComponent,
        SearchComponent
    ],
    providers: [
        OpenDataService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
