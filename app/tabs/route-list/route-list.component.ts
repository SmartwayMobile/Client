import { Component, ViewContainerRef, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router, NavigationStart, NavigationEnd } from "@angular/router";
import firebase = require("nativescript-plugin-firebase");
import { Route } from '../../models/Route';

@Component({
  selector: "route-list",
  moduleId: module.id,
  templateUrl: "./route-list.component.html",
  styleUrls: ['./route-list.component.css']
})
export class RouteListComponent implements OnInit {
  public routes: Route[];

  constructor() {
    this.routes = [];
  }

  ngOnInit() {
    this.getRoutes();
  }

  getRoutes() {
    const onQueryEvent = (result) => {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      //

      if (!result.error) {
        const [id] = Object.keys(result.value);
        console.log(id);
        result.value[id].routes.forEach(r => {
          let route = new Route();
          route.name = r.name;
          route.endAddress = r.endAddress;
          route.endTime = r.endTime;
          route.startAddress = r.startAddress;
          route.startTime = r.startTime;
          this.routes.push(route);
        });
        console.log(JSON.stringify(this.routes));
      }
    };
    firebase.query(
      onQueryEvent,
      "/users",
      {
        // set this to true if you want to check if the value exists or just want the event to fire once
        // default false, so it listens continuously.
        // Only when true, this function will return the data in the promise as well!
        singleEvent: true,
        // order by company.country
        orderBy: {
          type: firebase.QueryOrderByType.CHILD,
          value: 'name' // mandatory when type is 'child'
        },
        // but only companies 'since' a certain year (Telerik's value is 2000, which is imaginary btw)
        // use either a 'range'
        //range: {
        //    type: firebase.QueryRangeType.EQUAL_TO,
        //    value: 2000
        ///},
        // .. or 'chain' ranges like this:
        ranges: [
          {
            type: firebase.QueryRangeType.EQUAL_TO,
            value: 'conner'
          }
        ],
        // only the first 2 matches
        // (note that there's only 1 in this case anyway)
        // limit: {
        //   type: firebase.QueryLimitType.LAST,
        //   value: 2
        // }
      }
    );

  }
}
