import { Component, ViewContainerRef, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import firebase = require("nativescript-plugin-firebase");
import { TimePicker } from "ui/time-picker";
import { DatePicker } from "ui/date-picker";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import { Page } from "ui/page";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "./modal-view";
import { Route } from '../../models/Route';
import { AuthService } from "../../services/auth.service";
import { RoutesService } from "../../services/routes.service";
import { GeocodingService } from "../services/geocoding.service";
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";

@Component({
  selector: "create-route",
  moduleId: module.id,
  templateUrl: "./create-route.component.html",
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent /*implements OnInit*/ {

  public model: Route = new Route();
  public selectedTime: string;

  constructor(
    private routesService: RoutesService,
    private authService: AuthService,
    private routerExtensions: RouterExtensions,
    private modalService: ModalDialogService,
    private geocodingService: GeocodingService,
    private vcRef: ViewContainerRef) {
    this.resetTimes();
    console.log('in create route');
    console.log(this.authService.userKey);
  }

  getStartTime() {
    this.createModelView().then(result => {
      if (this.validate(result)) {
        this.model.startTime = result;
      }
    }).catch(error => this.handleError(error));
  }

  getEndTime() {
    this.createModelView().then(result => {
      if (this.validate(result)) {
        this.model.endTime = result;
        console.log(this.model.startAddress);
      }
    }).catch(error => this.handleError(error));
  }

  private createModelView(): Promise<any> {
    const today = new Date();
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: today,
      fullscreen: false,
    };

    return this.modalService.showModal(ModalViewComponent, options);
  }
  private resetTimes() {
    this.selectedTime = '';
  }

  private validate(result: any) {
    return !!result;
  }

  private handleError(error: any): void {
    this.resetTimes();
    alert("Please try again!");
    console.dir(error);
  }

  getLatLng(address: string): number[] {
    return [36.335598, -86.541629]
  }

  createRoute(): void {
    debugger;
    const startPromise = this.geocodingService.getCoordsFromAddress(this.model.startAddress);
    const destPromise = this.geocodingService.getCoordsFromAddress(this.model.endAddress);
    Promise.all([startPromise, destPromise])
      .then(res => {
        const [start, dest] = res;
        this.model.startAddress = start.results[0].formatted_address;
        this.model.endAddress = dest.results[0].formatted_address;
        this.model.startCoords = start.results[0].geometry.location;
        this.model.endCoords = dest.results[0].geometry.location;

      }).then(() => this.addRouteToFb());
  }

  addRouteToFb() {
    this.routesService.addRoute(this.model)
      .then(result => {
        TNSFancyAlert.showSuccess("Success", `${this.model.name} Added`, "Dismiss");
        this.routerExtensions.back();
      });
  }
}
