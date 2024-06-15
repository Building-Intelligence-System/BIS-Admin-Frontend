import { Component } from '@angular/core';
import {LayerService, mapProviders, mapProvidersOptions} from "../../../../../../features/services/layer.service";
import {enumTypeValues} from "../../../../../../core/utils/enum.utils";
import {MapService} from "../../../../../../features/services/map.service";

@Component({
  selector: 'app-map-tile-selector',
  standalone: true,
  imports: [],
  templateUrl: './map-tile-selector.component.html',
  styleUrl: './map-tile-selector.component.scss'
})
export class MapTileSelectorComponent {

  protected readonly mapProviders = mapProviders;
  protected readonly enumTypeValues = enumTypeValues;
  protected readonly mapProvidersOptions = mapProvidersOptions;

  protected showTileLayerList: boolean = false;

  public constructor(private readonly layerService: LayerService,
                     protected mapService: MapService) {
  }

  protected handleListButton(): void {
    this.showTileLayerList = !this.showTileLayerList;
  }

  protected handleListItem(layer: mapProviders): void {
    this.layerService.changeLayer(mapProvidersOptions[layer]);
    this.handleListButton();
  }

}
