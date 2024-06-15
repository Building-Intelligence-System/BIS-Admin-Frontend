import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../../../core/entities/task/task.model";
import {DateUtils} from "../../../../../core/utils/date.utils";

@Component({
  selector: 'app-task-modal-info',
  standalone: true,
  imports: [],
  templateUrl: './task-modal-info.component.html',
  styleUrl: './task-modal-info.component.scss'
})
export class TaskModalInfoComponent {
  protected readonly DateUtils = DateUtils;
  @Input({required: false}) public task: Task | undefined;
  @Output() closeEvent: EventEmitter<Event> = new EventEmitter<Event>();

  protected handleCloseModal($event: Event) {
    this.closeEvent.emit($event);
  }
}
