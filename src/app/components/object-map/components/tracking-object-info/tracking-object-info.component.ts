import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TrackingObject} from "../../../../core/entities/tracking-object/tracking-object.model";

@Component({
  selector: 'app-tracking-object-info',
  standalone: true,
  imports: [],
  templateUrl: './tracking-object-info.component.html',
  styleUrl: './tracking-object-info.component.scss'
})
export class TrackingObjectInfoComponent {
  @Input({required: true}) trackingObject: TrackingObject | undefined;

  @Output() backToTrackingListEvent: EventEmitter<Event> = new EventEmitter<Event>();

  protected handleBackToTrackingListEvent($event: Event) {
    this.backToTrackingListEvent.emit($event);
  }
}
