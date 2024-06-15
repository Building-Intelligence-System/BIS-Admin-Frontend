import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  constructor(private httpClient: HttpClient) {
  }

  public reverse(lat: number, lon: number) {
    this.httpClient.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}`);
  }
}
