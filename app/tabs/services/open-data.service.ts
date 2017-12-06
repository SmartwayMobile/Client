import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
// import { Observable as RxObservable } from "rxjs/Observable";

import "rxjs/add/operator/toPromise";

@Injectable()
export class OpenDataService {
    private incidentsUrl = "https://www.tdot.tn.gov/opendata/api/public/roadwayincidents";
    private constructionUrl = "https://www.tdot.tn.gov/opendata/api/public/Roadwayoperations";
    private cameraUrl = "https://www.tdot.tn.gov/opendata/api/public/Roadwaycameras";

    constructor(private http: Http) { }

    getIncidents(): Promise<any> {
        let headers = this.createRequestHeader();
        return this.http.get(this.incidentsUrl, { headers: headers })
            .toPromise().then(res => res.json());
    }

    getConstruction(): Promise<any> {
        let headers = this.createRequestHeader();
        return this.http.get(this.constructionUrl, { headers: headers })
            .toPromise().then(res => res.json());
    }

    getCameras(): Promise<any> {
        let headers = this.createRequestHeader();
        return this.http.get(this.cameraUrl, { headers: headers })
            .toPromise().then(res => res.json());
    }

    private createRequestHeader(): Headers {
        let headers = new Headers();
        headers.append("apiKey", "1a4de36de3bf4c9fac288f937ff7c0ce");
        headers.append("Content-Type", "application/json");

        return headers;
    }
}