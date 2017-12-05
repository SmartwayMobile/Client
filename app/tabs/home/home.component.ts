import { Component, ViewContainerRef } from "@angular/core";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import { MapboxViewApi, Viewport as MapboxViewport, Mapbox } from "nativescript-mapbox";
import { OpenDataService } from "../services/open-data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    animations: [
        trigger("flyInOut", [
            state("in", style({ transform: "scale(1)", opacity: 1 })),
            transition("void => *", [
                style({ transform: "scale(0.9)", opacity: 0 }),
                animate("1000ms 100ms ease-out")
            ])
        ]),
        trigger("from-right", [
            state("in", style({
                "opacity": 1,
                transform: "translate(0)"
            })),
            state("void", style({
                "opacity": 0,
                transform: "translate(20%)"
            })),
            transition("void => *", [animate("600ms 1500ms ease-out")])
        ])
    ]
})
export class HomeComponent {
    private map: MapboxViewApi;
    private mapReady: boolean;
    private incidents: any[];

    constructor(private openDataService: OpenDataService) { }

    onMapReady(args): void {
        if (this.mapReady) return;

        this.map = args.map;
        this.mapReady = true;
        console.log('map ready! getting incidents...');
        this.getIncidents(args.map);
    }

    getIncidents(map: MapboxViewApi) {
        this.openDataService.getIncidents()
            .then(res => {
                const markers = res
                    .filter(i => !!i.locations[0].midPoint)
                    .map((i, index) => {
                        const { lng, lat } = i.locations[0].midPoint;
                        return {
                            id: 'Incident' + index,
                            index,
                            lat,
                            lng,
                            // title: i.impactDescription,
                            // subtitle: i.description,
                            onTap: function (marker) { console.log('tapped!', marker) }
                        }
                    });
                this.incidents = markers;
                map.addMarkers(this.incidents);
            });
    }
}
