import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
<<<<<<< HEAD
import { NativeScriptHttpModule } from "nativescript-angular/http";
=======
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
>>>>>>> conner

import { RouteListComponent } from "./route-list/route-list.component";
import { CreateRouteComponent } from "./create-route/create-route.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import { OpenDataService } from "./services/open-data.service";
import { GeometryService } from "./services/geometry.service";

@NgModule({
    imports: [
        NativeScriptModule,
<<<<<<< HEAD
        TabsRoutingModule,
        NativeScriptHttpModule
=======
        NativeScriptFormsModule,
        NativeScriptRouterModule,
        TabsRoutingModule
>>>>>>> conner
    ],
    declarations: [
        TabsComponent,
        HomeComponent,
        RouteListComponent,
        CreateRouteComponent,
        SearchComponent
    ],
    providers: [
        OpenDataService,
        GeometryService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
