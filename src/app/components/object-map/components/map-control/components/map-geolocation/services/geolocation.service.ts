import { Injectable } from '@angular/core';
import {LatLng} from "leaflet";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  public readonly geolocation$: Subject<LatLng> = new Subject<LatLng>();

  public intentEmitGeolocation(): void {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocation$.next(new LatLng(position.coords.latitude, position.coords.longitude));
      },
      () => {
        throw Error("ERRORS.GEOLOCATION_NOT_FOUND")
      },
      options
    );
  }

}
