import {Component, Input} from '@angular/core';
import {TrackingObject, TrackingObjectType} from "../../../../core/entities/tracking-object/tracking-object.model";

@Component({
  selector: 'app-tracking-object-list',
  standalone: true,
  imports: [],
  templateUrl: './tracking-object-list.component.html',
  styleUrl: './tracking-object-list.component.scss'
})
export class TrackingObjectListComponent {
@Input({required: true}) public trackingObjects: TrackingObject[] = [];
protected readonly TrackingObjectUrl = TrackingObjectUrl;
}

export const TrackingObjectUrl: Record<TrackingObjectType, string> = {
  [TrackingObjectType.CAR]: 'assets/icons/map/markers/icons/car.svg'
}
