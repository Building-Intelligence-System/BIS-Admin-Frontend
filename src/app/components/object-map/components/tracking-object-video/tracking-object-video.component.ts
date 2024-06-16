import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {Event} from "@angular/router";

@Component({
  selector: 'app-tracking-object-video',
  standalone: true,
  imports: [],
  templateUrl: './tracking-object-video.component.html',
  styleUrl: './tracking-object-video.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingObjectVideoComponent {
  @Output() public trackingObjectVideoClose: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  protected handleTrackingObjectVideoClose($event: MouseEvent) {
    this.trackingObjectVideoClose.emit($event);
  }
}
