export class Route {
  public id?: string;
  public name: string;
  public startAddress: string;
  public endAddress: string;
  public startTime: Date;
  public endTime: Date;
  public days: number[];
  public startCoords?: { lat: number, lng: number }
  public endCoords?: { lat: number, lng: number }
}