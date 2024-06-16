import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {MarkerIconType} from "../model/marker-icon-type";
import {enumTypeValues} from "../../core/utils/enum.utils";
import {HttpClient} from "@angular/common/http";
import {MarkerIconTypeUrls} from "../model/marker-icon-type-url";

const objectMarkerUrl = 'assets/icons/map/markers/marker.svg';
const geolocationMarkerUrl = 'assets/icons/map/markers/geolocation.svg';


@Injectable({
  providedIn: 'root'
})
export class AssetService {

  public readonly loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public markerIcons: Map<MarkerIconType, string> = new Map<MarkerIconType, string>(); // Список иконок для маркетов машин;
  public objectMarker = ''; // Маркер подложка для машин;
  public geolocationMarker = ''; // Маркер текущего местоположения пользователя;

  constructor(private httpClient: HttpClient) {
    Promise.all([
      this.loadObjectMarker(),
      this.loadGeolocationMarker(),
      this.loadIconsSvg()])
      .then(() => {
        this.loaded$.next(true);
      });
  }

  private async loadObjectMarker() {
    this.objectMarker = await firstValueFrom(this.httpClient.get(objectMarkerUrl, {responseType: "text"}));
  }

  private async loadGeolocationMarker() {
    this.geolocationMarker = await firstValueFrom(this.httpClient.get(geolocationMarkerUrl, {responseType: "text"}));
  }

  private async loadIconsSvg() {
    const types = enumTypeValues(MarkerIconType);
    const loaders: Promise<string>[] = [];
    types.forEach(t => loaders.push(firstValueFrom(this.httpClient.get(MarkerIconTypeUrls[t], {responseType: "text"}))));
    Promise.all(loaders)
      .then(svgList => {
        for (let i = 0; i < types.length; i++) {
          this.markerIcons.set(types[i], svgList[i]);
        }
      });
  }

}
