import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";

import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { ModalViewComponent } from "./tabs/create-route/modal-view";
import { AuthGuard } from "./guards/auth.guard";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
// registerElement("FAB", () => require("nativescript-floatingactionbutton").Fab);

import firebase = require("nativescript-plugin-firebase");
firebase.init({
    onPushTokenReceivedCallback: function (token) {
        console.log("Firebase push token: " + token);
    },
    onMessageReceivedCallback: (message: any) => {
        alert(message.body);
        console.log(`Title: ${message.title}`);
        console.log(`Body: ${message.body}`);
        // if your server passed a custom property called 'foo', then do this:
        console.log(`Value of 'foo': ${message.data.foo}`);
    }
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
        NativeScriptUIListViewModule
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
