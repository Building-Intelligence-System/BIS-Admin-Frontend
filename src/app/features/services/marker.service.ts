import { Injectable } from '@angular/core';
import {DivIcon, divIcon, LatLng, Marker} from "leaflet";
import {MarkerIconType} from "../model/marker-icon-type";
import {MapMarker} from "../model/map-marker.model";
import {AssetService} from "./asset.service";

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  public constructor(private assetService: AssetService) {
  }

  static rotateToDegree(degrees: number): number {
    return degrees - 45;
  }

  createMarker(latitude: number,
               longitude: number,
               icon: string): Marker {
    const markerDiv: DivIcon = divIcon({
      html: icon,
      iconSize: [35, 35],
      iconAnchor: [20, 20],
      shadowSize: [10, 10]
    })
    return new Marker(new LatLng(latitude, longitude), {icon: markerDiv});
  }

  deleteMarker(marker: MapMarker): void {
    marker.Destroy();
  }

  moveMarker(marker: MapMarker, newLatitude: number, newLongitude: number): void {
    marker.ChangeCoordinates(new LatLng(newLatitude, newLongitude));
  }

  public buildMarkerHtml(iconType: MarkerIconType, withObjectMarker: boolean = true): string {
    const iconSvg = this.assetService.markerIcons.get(iconType);
    const markerSvg = this.assetService.objectMarker;
    if(!withObjectMarker) {
      return iconSvg ?? '';
    }
    return iconSvg + markerSvg;
  }

  public rotateMarker(marker: Marker, course: number): void {
    const element = marker.getElement();
    if (element) {
      element.style.transform = `rotate(${MarkerService.rotateToDegree(course)}deg)`;
    }
  }

}
