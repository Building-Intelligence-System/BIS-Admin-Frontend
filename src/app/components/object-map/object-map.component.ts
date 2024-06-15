import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild
} from '@angular/core';
import {LatLng, Map} from 'leaflet';
import {MapFacadeService} from "../../features/services/map-facade.service";
import {MapGeolocationComponent} from "./components/map-control/components/map-geolocation/map-geolocation.component";
import {MapZoomComponent} from "./components/map-control/components/map-zoom/map-zoom.component";
import {MapControlComponent} from "./components/map-control/map-control.component";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {TrackingObject} from "../../core/entities/tracking-object/tracking-object.model";
import {TrackingObjectListComponent} from "./components/tracking-object-list/tracking-object-list.component";
import {MarkerIconType} from "../../features/model/marker-icon-type";
import {ColorType} from "../../features/model/color-type";

@Component({
  selector: 'app-object-map',
  standalone: true,
  imports: [
    MapGeolocationComponent,
    MapZoomComponent,
    MapControlComponent,
    TrackingObjectListComponent
  ],
  templateUrl: './object-map.component.html',
  styleUrl: './object-map.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectMapComponent implements OnInit, AfterViewInit {

  private defaultZoom: number = 15;
  private defaultLatitude: number = 45.0984;
  private defaultLongitude: number = 39.10559;

  protected trackingObjects: TrackingObject[] = [];

  @ViewChild("map") private mapElementRef!: ElementRef;
  private map!: Map;

  public constructor(private zone: NgZone,
                     private httpClient: HttpClient,
                     private changeDetection: ChangeDetectorRef,
                     private mapFacadeService: MapFacadeService,
                     protected mapFacade: MapFacadeService) {
  }

  async ngOnInit(): Promise<void> {
    this.trackingObjects = await firstValueFrom(this.httpClient.get<TrackingObject[]>('assets/mocks/tracking-objects-mock.json'));
    this.trackingObjects.forEach((trackingObject) => {
      this.mapFacadeService.createObjectMarker(trackingObject.position!.lat, trackingObject.position!.lon, 0, MarkerIconType.CAR, ColorType.BLUE);
      this.changeDetection.markForCheck();
    })
  }

  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.map = this.mapFacade.initialize(this.mapElementRef.nativeElement);
      const INIT_COORDINATES: LatLng = new LatLng(this.defaultLatitude, this.defaultLongitude);
      this.map.setView([INIT_COORDINATES.lat, INIT_COORDINATES.lng], this.defaultZoom);
      this.changeDetection.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.mapFacade.destroy();
  }

  protected showAlert(): void {
    alert('find me?!');
  }

}
