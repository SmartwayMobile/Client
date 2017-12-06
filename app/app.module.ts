import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ModalViewComponent } from "./tabs/create-route/modal-view";
import { AuthGuard } from "./guards/auth.guard";


import firebase = require("nativescript-plugin-firebase");
firebase.init({
    //persist: true
}).then(
    (instance) => {
        console.log("firebase.init done");
    },
    (error) => {
        console.log("firebase.init error: " + error);
    });

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        ModalViewComponent
    ],
    entryComponents: [ModalViewComponent],
    providers: [
        AuthGuard,
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader }
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
