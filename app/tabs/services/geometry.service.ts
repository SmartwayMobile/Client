import { Injectable } from "@angular/core";
import { bbox, lineString, bboxPolygon } from 'turf';
import pointToLineDistance from '@turf/point-to-line-distance';

@Injectable()
export class GeometryService {
    private distanceThreshold = 0.05;

    getBoundsFromCoords(coords: { lat: number, lng: number }[]) {
        const coordsArray = coords.map(c => [c.lat, c.lng]);
        const line = lineString(coordsArray);
        const [south, west, north, east] = bbox(line);
        return { north, south, east, west };
    }

    // If items that get passed in are already coords, great. If not, allow user to pass in a mapping function.
    // This way we should be able to pass in entire camera objects along with a function for getting the coords out.
    filterObjectsInBounds(
        items: any[],
        routes: { lat: number, lng: number }[],
        coordSelector?: (item: any) => number[]): any[] {
        console.log('filtering cameras');
        return items.filter(i => {
            i = !!coordSelector ? coordSelector(i) : i;
            const bounds = this.getBoundsFromCoords(routes);
            return this.isPointInBounds(bounds, i);
        });
    }

    private isPointNearLine(coords: { lat: number, lng: number }[], point: number[]) {
        const points = coords.map(c => [c.lng, c.lat]);
        const line = lineString(points);
        const distance = pointToLineDistance(point, line, { units: 'miles' });
        return distance <= this.distanceThreshold;
    }

    private isPointInBounds(bounds: { north: number, south: number, east: number, west: number }, point: number[]) {
        const [pointLng, pointLat] = point;
        return (
            pointLat >= bounds.south &&
            pointLat <= bounds.north &&
            pointLng >= bounds.west &&
            pointLng <= bounds.east);
    }
}