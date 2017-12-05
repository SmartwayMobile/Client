import { Component, ViewContainerRef, OnInit } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { TimePicker } from "ui/time-picker";
import { DatePicker } from "ui/date-picker";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { Page } from "ui/page";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { ModalViewComponent } from "./modal-view";

const millisecondsInADay = 24 * 60 * 60 * 1000;
const dayDiff = (firstDate, secondDate) =>
  Math.round((secondDate - firstDate) / millisecondsInADay);

@Component({
  selector: "Browse",
  moduleId: module.id,
  templateUrl: "./browse.component.html",
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent /*implements OnInit*/ {

  public startTime: string;
  public endTime: string;
  public selectedTime: string;
  public days: number;

  constructor(private modalService: ModalDialogService, private vcRef: ViewContainerRef) {
    this.resetTimes();
  }

  getStartTime() {
    this.createModelView().then(result => {
      if (this.validate(result)) {
        this.startTime = result;
      }
    }).catch(error => this.handleError(error));
  }

  getEndTime() {
    this.createModelView().then(result => {
      if (this.validate(result)) {
        this.endTime = result;
      }
    }).catch(error => this.handleError(error));
  }

  private createModelView(): Promise<any> {
    const today = new Date();
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: today.toDateString(),
      fullscreen: false,
    };

    return this.modalService.showModal(ModalViewComponent, options);
  }
  private resetTimes() {
    this.startTime = '';
    this.endTime = '';
    this.selectedTime = '';
    this.days = dayDiff(this.startTime, this.endTime);
  }

  private validate(result: any) {
    return !!result;
  }

  private handleError(error: any) {
    this.resetTimes();
    alert("Please try again!");
    console.dir(error);
  }

  // userRoutes = [];
  // model = {};
  // public currentdate: Date;

  // constructor(private params: ModalDialogParams, private page: Page) {
  //   this.currentdate = new Date(params.context);

  //   this.page.on("unloaded", () => {
  //     // using the unloaded event to close the modal when there is user interaction
  //     // e.g. user taps outside the modal page
  //     this.params.closeCallback();
  //   });
  // }

  // public close(res: string) {
  //   this.params.closeCallback(res);
  // }

  // ngOnInit(): void {
  //   var onQueryEvent = function (result) {
  //     // note that the query returns 1 match at a time
  //     // in the order specified in the query
  //     if (!result.error) {
  //       console.log("Event type: " + result.type);
  //       console.log("Key: " + result.key);
  //       console.log("Value: " + JSON.stringify(result.value));
  //     }
  //   };
  //   firebase.query(
  //     onQueryEvent,
  //     "/routes",
  //     {
  //       // set this to true if you want to check if the value exists or just want the event to fire once
  //       // default false, so it listens continuously.
  //       // Only when true, this function will return the data in the promise as well!
  //       singleEvent: true,
  //       // order by company.country
  //       orderBy: {
  //         type: firebase.QueryOrderByType.CHILD,
  //         value: 'user' // mandatory when type is 'child'
  //       },
  //       // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
  //       // use either a 'range'
  //       //range: {
  //       //    type: firebase.QueryRangeType.EQUAL_TO,
  //       //    value: 2000
  //       ///},
  //       // .. or 'chain' ranges like this:
  //       ranges: [
  //         {
  //           type: firebase.QueryRangeType.EQUAL_TO,
  //           value: 'conner'
  //         }
  //       ],
  //       // only the first 2 matches
  //       // (note that there's only 1 in this case anyway)
  //       limit: {
  //         type: firebase.QueryLimitType.LAST,
  //         value: 2
  //       }
  //     }
  //   );
  // }

  // onStartTimeLoaded(args) {
  //   let timePicker = <TimePicker>args.object;

  //   timePicker.hour = 9;
  //   timePicker.minute = 25;
  // }

  // onEndTimeLoaded(args) {
  //   let timePicker = <TimePicker>args.object;

  //   timePicker.hour = 15;
  //   timePicker.minute = 25;
  // }

  // test() {
  //   firebase.setValue(
  //     '/routes',
  //     {
  //       'user': 'conner',
  //       'routes': [
  //         {
  //           'start': [85, -35],
  //           'end': [87, -36],
  //           'startTime': '6:00',
  //           'endTime': '18:00',
  //           'days': [0, 1, 2, 3, 4, 5, 6]
  //         }
  //       ]
  //     }
  //   ).then(
  //     function (result) {
  //       console.dir(result);
  //       console.log("created key: " + result.key);
  //     }
  //     );
  // }
}
