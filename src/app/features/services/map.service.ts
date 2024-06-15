import {EventEmitter, Injectable, NgZone} from '@angular/core';
import {LatLngBounds, Layer, LeafletEventHandlerFn, Map, MapOptions} from "leaflet";
import {MapMarker} from "../model/map-marker.model";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: Map;
  private currentMainLayer: Layer | undefined;

  public initMap(rootHtmlElement: HTMLElement): Map {
    const mapOptions: MapOptions = {
      zoomControl: false,
      attributionControl: false,
    };
    this.map = new Map(rootHtmlElement, mapOptions);
    return this.map;
  }

  public destroy(): void {
    this.map.clearAllEventListeners();
    this.map.remove();
  }

  public flyToMarker(marker: MapMarker): void {
    this.map.flyTo(marker.CurrentCoordinates());
  }

  public addLayerToMap(layer: Layer): void {
    this.map.addLayer(layer);
    if (layer.options && Object.keys(layer.options).length > 0) {
      this.currentMainLayer = layer;
    }
  }

  public changeMapLayer(layer: Layer): void {
    if (this.currentMainLayer) {
      this.map.removeLayer(this.currentMainLayer);
    }

    this.currentMainLayer = layer;
    this.map.addLayer(layer);
  }

  public hasLayer(layer: Layer): boolean {
    return this.map.hasLayer(layer);
  }

  public fitBounds(bounds: LatLngBounds): void {
    this.map.fitBounds(bounds);
  }

  public zoomIn(delta = 1): void {
    this.map.zoomIn(delta);
  }

  public zoomOut(delta = 1): void {
    this.map.zoomOut(delta);
  }

  public disableZoomIn(zoomElement: string, zoomValue: number) {
    const zoomIn = <HTMLElement>document.querySelector(zoomElement);

    this.map.on('zoom', () => {
      this.map.getZoom() >= zoomValue ? zoomIn?.classList.add('button-disabled') : zoomIn?.classList.remove('button-disabled');
    });
  }

  public disableZoomOut(zoomElement: string, zoomValue: number) {
    const zoomOut = <HTMLElement>document.querySelector(zoomElement);

    this.map.on('zoom', () => {
      this.map.getZoom() <= zoomValue ? zoomOut?.classList.add('button-disabled') : zoomOut?.classList.remove('button-disabled');
    });
  }

  public registerEventHandler(eventName: string, handler: LeafletEventHandlerFn): void {
    this.map.on(eventName, handler);
  }

  public handleEvent<T>(zone: NgZone, eventEmitter: EventEmitter<T>, event: T): void {
    zone.run(() => {
      eventEmitter.emit(event);
    });
  }

}
