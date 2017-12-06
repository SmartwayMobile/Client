import { Component, OnInit, NgModule } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { TimePicker } from "ui/time-picker";
import { Page } from "ui/page";

// >> passing-parameters
@Component({
  moduleId: module.id,
  templateUrl: "./modal-view.html",
})
export class ModalViewComponent implements OnInit {
  public currenttime: Date;

  constructor(private params: ModalDialogParams, private page: Page) {
    this.currenttime = params.context;

    this.page.on("unloaded", () => {
      // using the unloaded event to close the modal when there is user interaction
      // e.g. user taps outside the modal page
      this.params.closeCallback();
    });
  }

  ngOnInit() {
    let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
    timePicker.hour = this.currenttime.getHours();
    timePicker.minute = this.currenttime.getMinutes();
  }

  public submit() {
    let timePicker: TimePicker = <TimePicker>this.page.getViewById<TimePicker>("timePicker");
    this.params.closeCallback(timePicker.time);
  }
}
