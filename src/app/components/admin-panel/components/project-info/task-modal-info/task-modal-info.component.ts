import {Component, Input} from '@angular/core';
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
  @Input({required: false}) public task: Task | undefined;
  protected readonly DateUtils = DateUtils;
}
