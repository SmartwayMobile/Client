import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";

@Injectable()
export class OpenDataService {
    private incidentsUrl = "https://dev.tdot.tn.gov/opendata/api/public/roadwayincidentsdev";

    constructor(private http: Http) { }

    getIncidents(): Promise<any> {
        let headers = this.createRequestHeader();
        return this.http.get(this.incidentsUrl, { headers: headers })
            .toPromise().then(res => res.json());
    }

    private createRequestHeader(): Headers {
        let headers = new Headers();
        headers.append("apiKey", "this-is-awesome");
        headers.append("Content-Type", "application/json");

        return headers;
    }
}