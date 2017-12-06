import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";

import { RouteListComponent } from "./route-list/route-list.component";
import { CreateRouteComponent } from "./create-route/create-route.component";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import { OpenDataService } from "./services/open-data.service";
import { GeometryService } from "./services/geometry.service";

import { AuthService } from "../services/auth.service";
import { RoutesService } from "../services/routes.service";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        TabsRoutingModule
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
        GeometryService,
        AuthService,
        RoutesService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TabsModule { }
