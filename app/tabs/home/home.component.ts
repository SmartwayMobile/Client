import { Component, ViewContainerRef, OnInit } from "@angular/core";
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
import { GeometryService } from "../services/geometry.service";
import { RoutesService } from "../../services/routes.service";
import { Subject } from "rxjs/Subject";
import { Route } from "../../models/Route";

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
export class HomeComponent implements OnInit {
    private map: MapboxViewApi;
    private mapReady: boolean;
    private incidents: any[];
    private construction: any[];
    private cfalertDialog = new CFAlertDialog();
    private userRoutes: any[];
    private boundingBox: { north: number, south: number, east: number, west: number };
    private hasSetBoundingBox = false;
    private userRoutes$: Subject<Route[]>

    constructor(
        private openDataService: OpenDataService,
        private geoService: GeometryService,
        private routeService: RoutesService) {
        this.userRoutes$ = this.routeService.routes$;
    }

    ngOnInit(): void {
        this.userRoutes$.subscribe(userRoutes => {
            if (!userRoutes || !userRoutes.length) return;
            const allCoords = [];
            userRoutes.forEach(r => allCoords.push(r.startCoords, r.endCoords));
            this.boundingBox = this.geoService.getBoundsFromCoords(allCoords);
            if (this.mapReady && this.map) {
                this.setMapBounds(this.boundingBox);
            }
        });
    }

    onMapReady(args): void {
        if (this.mapReady) return;

        this.map = args.map;
        this.mapReady = true;
        this.getIncidents(args.map);
        this.getConstruction(args.map);
        if (!this.hasSetBoundingBox && this.boundingBox) {
            this.setMapBounds(this.boundingBox);
        }
    }

    getIncidents(map: MapboxViewApi) {
        this.openDataService.getIncidents()
            .then(res => {
                this.incidents = this.mapResponseToMarkers(res, "Roadway Incident", "res://tabIcons/incident.png");
                map.addMarkers(this.incidents);
            });
    }

    getConstruction(map: MapboxApi) {
        this.openDataService.getConstruction()
            .then(res => {
                this.construction = this.mapResponseToMarkers(res, "Construction", "res://tabIcons/construction.png");
                map.addMarkers(this.construction);
            });
    }

    private setMapBounds(bounds: { north: number, south: number, east: number, west: number }) {
        this.map.setViewport({ bounds });
        this.hasSetBoundingBox = true;
    }

    private mapResponseToMarkers(indcidents: any[], title: string, iconPath: string): any[] {
        return indcidents
            .filter(i => !!i.locations[0].midPoint)
            .map((i, index) => {
                const { lng, lat } = i.locations[0].midPoint;
                return {
                    id: 'Incident' + index,
                    index,
                    lat,
                    lng,
                    iconPath,
                    impactDescription: title,
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
                onClick: function (name) { }
            }],
            cancellable: true
        }

        this.cfalertDialog.show(options);
    }
}
