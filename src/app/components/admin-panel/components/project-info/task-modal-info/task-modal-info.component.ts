import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../../../core/entities/task/task.model";
import {DateUtils} from "../../../../../core/utils/date.utils";

@Component({
  selector: 'app-task-modal-info',
  standalone: true,
  imports: [],
  templateUrl: './task-modal-info.component.html',
  styleUrl: './task-modal-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskModalInfoComponent {
  protected readonly DateUtils = DateUtils;
  @Input({required: false}) public task: Task | undefined;
  @Output() closeEvent: EventEmitter<Event> = new EventEmitter<Event>();

  protected isDisabled: boolean = true;

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  protected handleCloseModal($event: Event) {
    this.closeEvent.emit($event);
  }

  protected handleSubmitModal() {
    this.isDisabled = false;
    this.changeDetection.markForCheck();
  }
}
