import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Project} from "../../../../core/entities/project/project.model";
import {firstValueFrom} from "rxjs";
import {ProjectTasksInfo} from "../../../../core/entities/project-tasks-info/projects-tasks-info.model";
import {buildTypes} from "../build-card/build-card.component";
import {DateUtils} from "../../../../core/utils/date.utils";

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInfoComponent implements OnInit{
  protected project: Project | undefined;
  protected projectTaskInfo: ProjectTasksInfo | undefined;
  constructor(private httpClient: HttpClient,
    private changeDetection: ChangeDetectorRef,
    protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (next: Params) => {
      const projectPromise = firstValueFrom(this.httpClient.get<Project>(`assets/mocks/project-${next['projectId']}-mock.json`));
      const projectTaskInfoPromise = firstValueFrom(this.httpClient.get<ProjectTasksInfo>(`assets/mocks/project-${next['projectId']}-task-info-mock.json`));
      [this.project, this.projectTaskInfo] = await Promise.all([projectPromise, projectTaskInfoPromise]);
      this.changeDetection.markForCheck();
    })
  }

  protected readonly buildTypes = buildTypes;
  protected readonly DateUtils = DateUtils;
}
