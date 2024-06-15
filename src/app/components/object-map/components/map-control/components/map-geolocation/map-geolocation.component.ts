import {CommonModule} from '@angular/common';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapMarker} from "../../../../../../features/model/map-marker.model";
import {MapFacadeService} from "../../../../../../features/services/map-facade.service";
import {GeolocationService} from "./services/geolocation.service";

@Component({
  selector: 'app-map-geolocation',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './map-geolocation.component.html',
  styleUrls: ['./map-geolocation.component.scss']
})
export class MapGeolocationComponent implements OnInit {
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  private userLocationMarker: MapMarker | undefined = undefined;
  private clearUserLocationMarkerTimeoutId!: number;

  public constructor(protected readonly userLocationService: GeolocationService,
                     private readonly mapFacade: MapFacadeService) {
  }

  public ngOnInit(): void {
    this.userLocationService.geolocation$.subscribe(next => {
      if (next === undefined) {
        throw new Error("GEOLOCATION_NOT_FOUND");
      }
      if (this.userLocationMarker === undefined) {
        this.userLocationMarker = this.mapFacade.createGeolocationMarker(next.lat, next.lng);
      } else {
        this.mapFacade.moveMarker(this.userLocationMarker, next.lat, next.lng);
      }

      this.mapFacade.flyTo(this.userLocationMarker);

      clearTimeout(this.clearUserLocationMarkerTimeoutId);

      // @ts-ignore
      this.clearUserLocationMarkerTimeoutId = setTimeout((): void => {
        if (this.userLocationMarker) {
          this.mapFacade.deleteMarker(this.userLocationMarker);
          this.userLocationMarker = undefined;
        }
      }, 60000);
    });
  }
}
