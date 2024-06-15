export class TrackingObject {
  public id?: number;
  public type?: TrackingObjectType;
  public status?: TrackingObjectStatus;
  public model?: string;
  public imei?: string;
  public position?: {
    "lon": number,
    "lat": number
  }
}

export enum TrackingObjectType {
'CAR' = "CAR"
}

export enum TrackingObjectStatus {
  "WORKING"= ""
}
