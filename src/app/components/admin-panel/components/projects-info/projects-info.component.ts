import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {Project} from "../../../../core/entities/project/project.model";
import {ProjectTasksInfo} from "../../../../core/entities/project-tasks-info/projects-tasks-info.model";

@Component({
  selector: 'app-projects-info',
  standalone: true,
  imports: [],
  templateUrl: './projects-info.component.html',
  styleUrl: './projects-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsInfoComponent implements OnChanges {
  @Input({required: true}) projects: Project[] = [];
  @Input({required: true}) projectTasksInfo: ProjectTasksInfo[] | undefined;

  protected projectsCurrentPlan: number = 0;
  protected projectsExpectedPlan: number = 0;
  protected projectsLagNumber: number = 0;

  ngOnChanges(): void {
    this.handleProjectsNumberPlan();
    this.handleProjectsLagNumber();
  }

  protected handleProjectsNumberPlan() {
    this.projectTasksInfo?.forEach((projectTaskInfo, _, arr) => {
      this.projectsCurrentPlan += ((projectTaskInfo.currentPlan ?? 0) / arr.length);
      this.projectsExpectedPlan += ((projectTaskInfo.expectedPlan ?? 0) / arr.length);
    });
  }

  protected handleProjectsLagNumber() {
    this.projectTasksInfo?.forEach((projectTaskInfo) => {
      (projectTaskInfo.expectedPlan ?? 0) > (projectTaskInfo.currentPlan ?? 0) ? this.projectsLagNumber++ : this.projectsLagNumber;
    });
  }
}
