import { Component, OnInit } from "@angular/core";
import { OpenDataService } from "../services/open-data.service";
import { GeometryService } from "../services/geometry.service";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("VideoPlayer", () => require("nativescript-videoplayer").Video);

@Component({
    selector: "Search",
    moduleId: module.id,
    templateUrl: "./search.component.html",
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    // 1: get all cameras
    // 2: get user routes
    // 3. get bounding box from user routes
    // 4: filter camera list for ones that are inside the box
    cameras: any[] = [];
    cameraSelected: any;

    constructor(private openDataService: OpenDataService, private geoService: GeometryService) { }

    ngOnInit(): void {
        const cameraPromise = this.openDataService.getCameras();
        const userRoutePromise = this.getUserRoutePromise();
        Promise.all([cameraPromise, userRoutePromise])
            .then(responses => {
                const [cameras, routes] = responses;
                const camerasInBounds = this.geoService.filterObjectsInBounds(cameras, routes, (camera) => {
                    const coords = camera.location.coordinates[0];
                    return [coords.lat, coords.lng];
                });
                this.cameras = camerasInBounds;
                this.cameraSelected = this.cameras[0];
            });
    }

    onCameraSelect(args) {
        const index = args.index;
        this.cameraSelected = this.cameras[index];
    }

    onPlaybackReady() {
        console.log('playback ready');
    }

    // DUMMY CALL TO A FUTURE FIREBASE SERVICE
    getUserRoutePromise() {
        const DUMMY_DATA = [{ lng: 35.8456, lat: -86.3903 }, { lng: 36.1627, lat: -86.7816 }];
        return Promise.resolve(DUMMY_DATA);
    }

}
