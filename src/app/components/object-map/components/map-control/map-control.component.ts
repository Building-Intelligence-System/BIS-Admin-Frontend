import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {MapGeolocationComponent} from "./components/map-geolocation/map-geolocation.component";
import {MapZoomComponent} from "./components/map-zoom/map-zoom.component";
import {MapTileSelectorComponent} from "./components/map-tile-selector/map-tile-selector.component";
import {MapFacadeService} from "../../../../features/services/map-facade.service";
import {MAX_ZOOM, MIN_ZOOM} from "../../../../features/services/layer.service";

@Component({
  selector: 'app-map-control',
  standalone: true,
  imports: [
    MapTileSelectorComponent,
    MapGeolocationComponent,
    MapZoomComponent
  ],
  templateUrl: './map-control.component.html',
  styleUrl: './map-control.component.scss'
})
export class MapControlComponent implements AfterViewInit {

  @Input() showZoomButtons: boolean = true;
  @Input() showGeolocationButton: boolean = true;
  @Input() showTileSelectorButton: boolean = true;

  @Input() tileProviderTranslatePath: string = '';

  @Output() geolocationButtonClick: EventEmitter<void> = new EventEmitter<void>();

  public constructor(private mapFacade: MapFacadeService) {
  }

  public ngAfterViewInit(): void {
    this.disableZoomControl();
  }

  private disableZoomControl(): void {
    this.mapFacade.disableMinZoomOut('.button-zoom-out', MIN_ZOOM);
    this.mapFacade.disableMaxZoomIn('.button-zoom-in', MAX_ZOOM);
  }
}

