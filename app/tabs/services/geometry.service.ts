import { Injectable } from "@angular/core";
import { bbox, lineString, bboxPolygon } from 'turf';

@Injectable()
export class GeometryService {
    getBoundsFromCoords(coords: { lat: number, lng: number }[]) {
        const coordsArray = coords.map(c => [c.lat, c.lng]);
        const line = lineString(coordsArray);
        const [south, west, east, north] = bbox(line);
        return { north, south, east, west };
    }

    // If items that get passed in are already coords, great. If not, allow user to pass in a mapping function.
    // This way we should be able to pass in entire camera objects along with a function for getting the coords out.
    filterObjectsInBounds(
        items: any[],
        bounds: { north: number, south: number, east: number, west: number },
        coordSelector?: (item: any) => number[]): any[] {
        return items.filter(i => {
            i = !!coordSelector ? coordSelector(i) : i;
            return this.isPointInBounds(bounds, i);
        });
    }

    private isPointInBounds(bounds: { north: number, south: number, east: number, west: number }, point: number[]) {
        const [pointLat, pointLng] = point;
        return (
            pointLat >= bounds.south &&
            pointLat <= bounds.north &&
            pointLng >= bounds.west &&
            pointLat <= bounds.east);
    }
}