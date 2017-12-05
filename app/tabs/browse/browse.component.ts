import { Component, OnInit } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    constructor() {
        /* ***********************************************************
        * Use the constructor to inject services.
        *************************************************************/
    }

    ngOnInit(): void {
        /* ***********************************************************
        * Use the "ngOnInit" handler to initialize data for the view.
        *************************************************************/
    }

    test() {
        firebase.push(
            '/testroutes',
            {
                'start': [86, -35],
                'end': [87, -36],
                'startTime': '6:00',
                'endTime': '18:00',
                'days': [0, 1, 2, 3, 4, 5, 6],
                'user': 'conner'
            }
        ).then(
            function (result) {
                console.dir(result);
                console.log("created key: " + result.key);
            }
            );
    }
}
