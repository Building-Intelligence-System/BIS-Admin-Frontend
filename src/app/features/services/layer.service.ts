import {Injectable} from '@angular/core';
import L, {FeatureGroup, Marker, TileLayer, tileLayer} from "leaflet";

import {MapService} from "./map.service";
import {MapLayerType} from "../model/map-layer-type";
import {enumTypeValues} from "../../core/utils/enum.utils";

export const gis2Subdomains: string[] = ["tile0", "tile1", "tile2", "tile3", "tile4"];
export const googleSubdomains: string[] = ["mt0", "mt1", "mt2", "mt3"];

export const MIN_ZOOM = 3;
export const MAX_ZOOM = 19;

/* cSpell:disable */
export enum mapProviders {
  DOUBLEGIS = "DOUBLEGIS",
  GOOGLE_MAP = "GOOGLE_MAP",
  OSM = "OSM",
}

export const mapProvidersUrl: Record<mapProviders, string> = {
  [mapProviders.DOUBLEGIS]: "https://{s}.maps.2gis.com/tiles?x={x}&y={y}&z={z}&v=1.3&r=g",
  [mapProviders.GOOGLE_MAP]: "https://{s}.google.com/vt?x={x}&y={y}&z={z}",
  [mapProviders.OSM]: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};

export const mapProvidersOptions: Record<mapProviders, TileLayer> = {
  [mapProviders.DOUBLEGIS]: tileLayer(mapProvidersUrl.DOUBLEGIS, {
    subdomains: gis2Subdomains,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    maxNativeZoom: 18
  }),
  [mapProviders.GOOGLE_MAP]: tileLayer(mapProvidersUrl.GOOGLE_MAP, {
    subdomains: googleSubdomains,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    maxNativeZoom: 18
  }),
  [mapProviders.OSM]: tileLayer(mapProvidersUrl.OSM, {minZoom: MIN_ZOOM, maxZoom: MAX_ZOOM, maxNativeZoom: 18}),
};

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  private readonly layers: Record<MapLayerType, FeatureGroup | TileLayer>;

  constructor(private mapService: MapService) {

    this.layers = {
      [MapLayerType.DEFAULT]: new FeatureGroup(),
      [MapLayerType.MAIN_TILES]: mapProvidersOptions[mapProviders.DOUBLEGIS],
      [MapLayerType.OBJECT_MARKERS]: L.markerClusterGroup({removeOutsideVisibleBounds: true}),
      [MapLayerType.GEOLOCATION_MARKER]: new FeatureGroup()
    };
  }

  public initLayers(): void {
    enumTypeValues(MapLayerType)
      .forEach(value => this.mapService
        .addLayerToMap(this.layers[value]));
  }

  public changeLayer(layer: TileLayer): void {
    this.mapService.changeMapLayer(layer);
  }

  public addToLayer(marker: Marker, layerType: MapLayerType): void {
    (<FeatureGroup>this.layers[layerType]).addLayer(marker);
  }

  public removeFromLayer(marker: Marker, layerType: MapLayerType): void {
    (<FeatureGroup>this.layers[layerType]).removeLayer(marker);
  }

  public removeObjectLayer(): void {
    (<L.MarkerClusterGroup>this.layers.OBJECT_MARKERS).clearLayers();
  }

  public fitLayerBounds(layerType: MapLayerType): void {
    this.mapService.fitBounds((<FeatureGroup>this.layers[layerType]).getBounds());
  }
}
