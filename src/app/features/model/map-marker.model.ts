import {LatLng, LeafletMouseEvent, Marker} from "leaflet";
import {ColorType} from "./color-type";
import {MarkerIconType} from "./marker-icon-type";

export class MapMarker {
  public iconType: MarkerIconType;
  public colorType: ColorType;
  private marker: Marker;

  public constructor(iconType: MarkerIconType,
                     colorType: ColorType,
                     marker: Marker) {
    this.iconType = iconType;
    this.colorType = colorType;
    this.marker = marker;
  }

  public CurrentCoordinates(): LatLng {
    return this.marker.getLatLng();
  }

  public ChangeCoordinates(coordinates: LatLng): void {
    this.marker.setLatLng(coordinates);
  }

  public OnClick(handler: (event: LeafletMouseEvent) => void): void {
    this.marker.on("mousedown", handler);
  }

  public AddStyle(className: string): void {
    this.marker.getElement()?.classList?.add(className);
  }

  public RemoveStyle(className: string): void {
    this.marker.getElement()?.classList?.remove(className);
  }

  public ToggleStyle(className: string): void {
    this.marker.getElement()?.classList?.toggle(className);
  }

  public Rotate(value: number): void {
    this.marker.getElement()?.querySelector('#marker')?.setAttribute('style', `transform: rotate(${value - 45}deg)`);
  }

  public Destroy(): void {
    this.marker.remove();
  }
}
