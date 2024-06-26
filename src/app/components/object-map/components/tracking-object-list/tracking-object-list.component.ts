import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TrackingObject, TrackingObjectType} from "../../../../core/entities/tracking-object/tracking-object.model";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-tracking-object-list',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './tracking-object-list.component.html',
  styleUrl: './tracking-object-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingObjectListComponent implements OnInit{
  protected readonly TrackingObjectUrl = TrackingObjectUrl;
  protected openTrackingObjectCameraList: boolean = false;

  @Input({required: true}) public trackingObjects: TrackingObject[] = [];
  @Output() public trackingObjectClick: EventEmitter<TrackingObject> = new EventEmitter<TrackingObject>();

  protected handleTrackingObjectClick(trackingObject: TrackingObject) {
    this.trackingObjectClick.emit(trackingObject);
  }

  ngOnInit(): void {
  }
}

export const TrackingObjectUrl: Record<TrackingObjectType, string> = {
  [TrackingObjectType.CAR]: 'assets/icons/map/markers/icons/car.svg'
}
