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
import {LatLng, Map as map, Marker} from 'leaflet';
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
import {MapMarker} from "../../features/model/map-marker.model";
import {TrackingObjectInfoComponent} from "./components/tracking-object-info/tracking-object-info.component";
import {MapService} from "../../features/services/map.service";
import {TrackingObjectVideoComponent} from "./components/tracking-object-video/tracking-object-video.component";

@Component({
  selector: 'app-object-map',
  standalone: true,
  imports: [
    MapGeolocationComponent,
    MapZoomComponent,
    MapControlComponent,
    TrackingObjectListComponent,
    TrackingObjectInfoComponent,
    TrackingObjectVideoComponent
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
  protected trackingObjectMap: Map<number, TrackingObject> = new Map();
  protected selectedTrackingObject: TrackingObject | undefined;

  protected showTrackingObjectVideo: boolean = false;

  @ViewChild("map") private mapElementRef!: ElementRef;
  private map!: map;

  public constructor(private zone: NgZone,
                     private httpClient: HttpClient,
                     private changeDetection: ChangeDetectorRef,
                     private mapService: MapService,
                     private mapFacadeService: MapFacadeService) {
  }

  async ngOnInit(): Promise<void> {
    this.trackingObjects = await firstValueFrom(this.httpClient.get<TrackingObject[]>('assets/mocks/tracking-objects-mock.json'));
    this.trackingObjects.forEach((trackingObject) => {
      if (!trackingObject) return;
      this.trackingObjectMap.set(trackingObject.id!, trackingObject);
      const mapMarker = this.mapFacadeService.createObjectMarker(trackingObject.position!.lat, trackingObject.position!.lon, 0, MarkerIconType.CAR, ColorType.BLUE, trackingObject.id!);
      mapMarker.OnClick((marker) => {
        this.mapFacadeService.flyTo(mapMarker);
        this.selectedTrackingObject = this.trackingObjectMap.get(marker.sourceTarget.options.trackingObjectId);
        this.changeDetection.markForCheck();
      })
      this.changeDetection.markForCheck();
    })
  }

  public ngAfterViewInit(): void {
    this.zone.runOutsideAngular(() => {
      this.map = this.mapFacadeService.initialize(this.mapElementRef.nativeElement);
      const INIT_COORDINATES: LatLng = new LatLng(this.defaultLatitude, this.defaultLongitude);
      this.map.setView([INIT_COORDINATES.lat, INIT_COORDINATES.lng], this.defaultZoom);
      this.changeDetection.markForCheck();
    });
  }

  public ngOnDestroy(): void {
    this.mapFacadeService.destroy();
  }

  protected handleTrackingObjectClick(trackingObject: TrackingObject) {
    this.selectedTrackingObject = trackingObject;
    this.mapService.flyTo(new LatLng(this.selectedTrackingObject.position!.lat, this.selectedTrackingObject.position!.lon))
  }

  protected handleBackToTrackingObjectList() {
    this.selectedTrackingObject = undefined;
    this.changeDetection.markForCheck();
  }

  protected handleTrackingObjectVideo() {
    this.showTrackingObjectVideo = true;
    this.changeDetection.markForCheck();
  }

  protected handleTrackingObjectVideoClose() {
    this.showTrackingObjectVideo = false;
    this.changeDetection.markForCheck();
  }

  protected showAlert(): void {
    alert('find me?!');
  }

}
