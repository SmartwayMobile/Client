import { Injectable } from '@angular/core';
import firebase = require("nativescript-plugin-firebase");
import { AuthService } from './auth.service';
import { Route } from '../models/Route';
import { device } from 'platform';


@Injectable()
export class RoutesService {

  public routes: any[] = [];
  private uuid = device.uuid;

  constructor(private authService: AuthService) {
  }

  getUserByDeviceId() {
    return firebase.getValue(`/users/${this.uuid}`)
      .then(results => {
        const routes = Object.keys(results.value.routes)
          .map(key => {
            const route = results.value.routes[key];
            route.id = key;
            return route
          });
        this.routes = routes;
        return this.routes;
      });
  }

  addRoute(route: Route) {
    const path = `/users/${this.uuid}/routes`;
    return firebase.push(path, route)
      .then(pushResult => {
        route.id = pushResult.key;
        this.routes.push(route);
      });
  }

  getRoutes() {
    let self = this;
    const onQueryEvent = (result) => {
      // note that the query returns 1 match at a time
      // in the order specified in the query

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
        //console.log(JSON.stringify(this.routes));
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
        ]
      }
    );

  }

}