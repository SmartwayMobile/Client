import { Http, Headers, Response, RequestOptionsArgs } from "@angular/http";
import { Injectable } from "@angular/core";

@Injectable()
export class GeocodingService {
    private apiKey = "AIzaSyDH47V1om25P0KbWWvDIl2TXMBqpUkA8iE";
    private url = "https://maps.googleapis.com/maps/api/geocode/json?"

    constructor(private http: Http) { }

    getCoordsFromAddress(address: string) {
        const args: RequestOptionsArgs = {
            params: { key: this.apiKey, address }
        };

        return this.http.get(`${this.url}key=${this.apiKey}`, args)
            .toPromise().then(res => res.json());
    }
}