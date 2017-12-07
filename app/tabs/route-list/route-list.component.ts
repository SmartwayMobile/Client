import { Component, ViewContainerRef, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import firebase = require("nativescript-plugin-firebase");
import { Route } from '../../models/Route';
import { AuthService } from "../../services/auth.service";
import { RoutesService } from "../../services/routes.service";

@Component({
  selector: "route-list",
  moduleId: module.id,
  templateUrl: "./route-list.component.html",
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  public routes: Route[] = [];

  constructor(
    private authService: AuthService,
    private routesService: RoutesService) {
  }

  ngOnInit() {
    this.routesService.getUserByDeviceId()
      .then(routes => {
        this.routes = this.routesService.routes;
      });
  }
}
