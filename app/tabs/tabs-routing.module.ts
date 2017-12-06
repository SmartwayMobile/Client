import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TabsComponent } from "./tabs.component";
import { RouteListComponent } from "./route-list/route-list.component";
import { CreateRouteComponent } from "./create-route/create-route.component";

const routes: Routes = [
    { path: "", component: TabsComponent },
    { path: "routes", component: RouteListComponent },
    { path: "routes/create", component: CreateRouteComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TabsRoutingModule { }
