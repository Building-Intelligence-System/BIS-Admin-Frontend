import { Component } from '@angular/core';
import {MapFacadeService} from "../../../../../../features/services/map-facade.service";

@Component({
  selector: 'app-map-zoom',
  standalone: true,
  imports: [],
  templateUrl: './map-zoom.component.html',
  styleUrl: './map-zoom.component.scss'
})
export class MapZoomComponent {
  public constructor(private mapFacade: MapFacadeService) {
  }

  public zoomIn(): void {
    this.mapFacade.zoomIn();
  }

  public zoomOut(): void {
    this.mapFacade.zoomOut();
  }

}
