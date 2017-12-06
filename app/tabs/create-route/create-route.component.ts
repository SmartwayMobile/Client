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
    private routerExtensions: RouterExtensions,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef) {
    this.resetTimes();
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
    const self = this;
    console.log(this.model.startAddress);
    console.log(this.model.endAddress);
    console.log(this.model.startTime);
    console.log(this.model.endTime);
    firebase.push(
      '/users',
      {
        'name': 'conner',
        'routes': [
          {
            'name': this.model.name,
            'startAddress': this.getLatLng(this.model.startAddress),
            'endAddress': this.getLatLng(this.model.endAddress),
            'startTime': this.model.startTime.getTime(),
            'endTime': this.model.endTime.getTime(),
            'days': [0, 1, 2, 3, 4, 5, 6]
          }
        ]
      }
    ).then(
      function (result) {
        console.dir(result);
        self.routerExtensions.back();
        //
      }
      );
  }
}
