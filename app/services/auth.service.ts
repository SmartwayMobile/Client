import { Injectable } from '@angular/core';
import firebase = require("nativescript-plugin-firebase");


@Injectable()
export class AuthService {

  public userKey: string = '';

  constructor() {
    //this.setUserKey();
  }

  setUserKey() {
    const onQueryEvent = (result) => {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      //

      if (!result.error) {
        const [key] = Object.keys(result.value);
        this.userKey = key;
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