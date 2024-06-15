import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {MapService} from "./map.service";
import {LayerService} from "./layer.service";
import {MarkerService} from "./marker.service";
import {LeafletEventHandlerFn, Map, Marker} from 'leaflet';
import {MarkerIconType} from "../model/marker-icon-type";
import {ColorType} from "../model/color-type";
import {MapLayerType} from "../model/map-layer-type";
import {MapMarker} from "../model/map-marker.model";
import {AssetService} from "./asset.service";

@Injectable({
  providedIn: 'root'
})
export class MapFacadeService {


  public constructor(private mapService: MapService,
                     private layerService: LayerService,
                     private markerService: MarkerService,
                     private assetService: AssetService) {
  }

  public initialize(rootHtmlElement: HTMLElement): Map {
    const map = this.mapService.initMap(rootHtmlElement);
    this.layerService.initLayers();
    return map;
  }

  public destroy(): void {
    this.mapService.destroy();
  }

  public zoomIn(): void {
    this.mapService.zoomIn();
  }

  public zoomOut(): void {
    this.mapService.zoomOut();
  }

  public disableMaxZoomIn(zoomElement: string, zoomValue: number) {
    this.mapService.disableZoomIn(zoomElement, zoomValue);
  }

  public disableMinZoomOut(zoomElement: string, zoomValue: number) {
    this.mapService.disableZoomOut(zoomElement, zoomValue);
  }

  public createObjectMarker(latitude: number, longitude: number, course: number, iconType: MarkerIconType, colorType: ColorType, trackingObjectId: number): MapMarker {
    const icon = this.markerService.buildMarkerHtml(iconType);
    const marker = this.createMarkerOnLayer(latitude, longitude, course, icon, MapLayerType.OBJECT_MARKERS);
    // @ts-ignore
    marker.options['trackingObjectId'] = trackingObjectId
    return new MapMarker(iconType, colorType, marker);
  }

  public createGeolocationMarker(latitude: number, longitude: number): MapMarker {
    const icon = this.assetService.geolocationMarker;
    const marker = this.createMarkerOnLayer(latitude, longitude, 0, icon, MapLayerType.GEOLOCATION_MARKER);
    return new MapMarker(MarkerIconType.NONE, ColorType.DEFAULT, marker);
  }

  public moveMarker(marker: MapMarker, latitude: number, longitude: number): void {
    this.markerService.moveMarker(marker, latitude, longitude);
  }

  public flyTo(marker: MapMarker): void {
    this.mapService.flyToMarker(marker);
  }

  public deleteMarker(marker: MapMarker): void {
    this.markerService.deleteMarker(marker);
  }

  public fitBounds(target: MapLayerType): void {
    this.layerService.fitLayerBounds(target);
  }

  public registerMapEventHandler(eventName: string, handler: LeafletEventHandlerFn): void {
    this.mapService.registerEventHandler(eventName, handler);
  }

  public handleMapEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T): void {
    this.mapService.handleEvent<T>(zone, eventEmitter, event);
  }

  private createMarkerOnLayer(latitude: number, longitude: number, course: number, icon: string, layerType: MapLayerType): Marker {
    const marker = this.markerService.createMarker(latitude, longitude, icon);
    this.layerService.addToLayer(marker, layerType);
    this.markerService.rotateMarker(marker, course);
    return marker;
  }

}
