import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Project} from "../../../../core/entities/project/project.model";
import {ProjectType} from "../../../../core/entities/project/project-type.enum";
import {ProjectTasksInfo} from "../../../../core/entities/project-tasks-info/projects-tasks-info.model";

@Component({
  selector: 'app-build-card',
  standalone: true,
  imports: [],
  templateUrl: './build-card.component.html',
  styleUrl: './build-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildCardComponent {
  @Input({required: true}) project: Project | undefined;
  @Input({required: true}) projectTasksInfo: ProjectTasksInfo | undefined;
  protected readonly buildTypes = buildTypes;
}

export const buildTypes: Record<ProjectType, string> = {
  [ProjectType.RESIDENTIAL]: 'Жилой комплекс'
}
