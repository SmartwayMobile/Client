import { Component, ViewContainerRef } from "@angular/core";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from "@angular/animations";
import {
    CFAlertDialog,
    DialogOptions,
    CFAlertGravity,
    CFAlertActionAlignment,
    CFAlertActionStyle,
    CFAlertStyle
} from 'nativescript-cfalert-dialog';
import { MapboxViewApi, Viewport as MapboxViewport, Mapbox, MapboxApi } from "nativescript-mapbox";
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
    private construction: any[];
    private cfalertDialog = new CFAlertDialog();

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
                this.incidents = this.mapToIncidentMarkers(res);
                map.addMarkers(this.incidents);
            });
    }

    getConstruction(map: MapboxApi) {
        this.openDataService.getConstruction()
            .then(res => {
                this.construction = this.mapToConstructionMarkers(res);
                map.addMarkers(this.construction);
            })
    }

    private mapToConstructionMarkers(construction: any[]): any[] {
        return construction;
    }

    private mapToIncidentMarkers(indcidents: any[]): any[] {
        return indcidents
            .filter(i => !!i.locations[0].midPoint)
            .map((i, index) => {
                const { lng, lat } = i.locations[0].midPoint;
                return {
                    id: 'Incident' + index,
                    index,
                    lat,
                    lng,
                    impactDescription: i.impactDescription,
                    description: i.description,
                    onTap: (marker) => this.onMarkerTap(marker)
                }
            });
    }

    private onMarkerTap(marker): void {
        const options: DialogOptions = {
            dialogStyle: CFAlertStyle.BOTTOM_SHEET,
            title: marker.impactDescription,
            titleColor: "#4781FE",
            message: marker.description,
            buttons: [{
                text: "Dismiss",
                textColor: "#FFFFFF",
                backgroundColor: "#4781FE",
                buttonStyle: CFAlertActionStyle.POSITIVE,
                onClick: function (name) { console.log(name) }
            }],
            cancellable: true
        }

        this.cfalertDialog.show(options);
    }
}
