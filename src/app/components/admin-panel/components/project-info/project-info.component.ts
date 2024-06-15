import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router, RouterOutlet} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Project} from "../../../../core/entities/project/project.model";
import {firstValueFrom} from "rxjs";
import {ProjectTasksInfo} from "../../../../core/entities/project-tasks-info/projects-tasks-info.model";
import {buildTypes} from "../build-card/build-card.component";
import {DateUtils} from "../../../../core/utils/date.utils";
import {Task} from "../../../../core/entities/task/task.model";

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexPlotOptions,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";
import {TaskModalInfoComponent} from "./task-modal-info/task-modal-info.component";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [
    AsyncPipe,
    NgApexchartsModule,
    TaskModalInfoComponent,
    RouterOutlet
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInfoComponent implements OnInit {
  protected readonly buildTypes = buildTypes;
  protected readonly DateUtils = DateUtils;

  protected project: Project | undefined;
  protected projectTaskInfo: ProjectTasksInfo | undefined;
  protected projectTasks: Task[] | undefined;

  protected showTaskModalInfo: boolean = false;
  protected selectedProjectTask: Task | undefined;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: ChartOptions | undefined;

  constructor(private httpClient: HttpClient,
              private changeDetection: ChangeDetectorRef,
              protected activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async (next: Params) => {
      const projectPromise = firstValueFrom(this.httpClient.get<Project>(`assets/mocks/project-${next['projectId']}-mock.json`));
      const projectTaskInfoPromise = firstValueFrom(this.httpClient.get<ProjectTasksInfo>(`assets/mocks/project-${next['projectId']}-task-info-mock.json`));
      const projectTasksPromise = firstValueFrom(this.httpClient.get<Task[]>(`assets/mocks/project-1-tasks-mock.json`));
      [this.project, this.projectTaskInfo, this.projectTasks] = await Promise.all([projectPromise, projectTaskInfoPromise, projectTasksPromise]);

      this.createChartOptions(this.projectTasks);
      this.changeDetection.markForCheck();
    });
  }

  protected createChartOptions(tasks: Task[]) {
    this.chartOptions = {
      series: tasks.map(task => ({
        name: 'Ответственный ',
        data: [
          {
            x: task.name,
            y: [
              new Date(task.startDate ?? 0).getTime(),
              new Date(task.actualEndDate ?? 0).getTime()
            ],
            fillColor: this.handleTaskColor(task),
            meta: task
          }
        ]
      })),
      chart: {
        height: 350,
        type: "rangeBar",
        events: { dataPointSelection: (e, chart, opts) => {
          this.handleTaskClick(opts['seriesIndex']); } },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "50%",
          rangeBarGroupRows: true
        }
      },
      xaxis: {
        type: "datetime"
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        show: false
      }
    };
  }

  protected handleTaskClick(taskIndex: number) {
    if (!this.projectTasks) return;
    this.showTaskModalInfo = true;
    this.selectedProjectTask = this.projectTasks[taskIndex];
    this.changeDetection.markForCheck()
    console.log('handleTaskClick', this.showTaskModalInfo, this.selectedProjectTask);
  }

  private handleTaskColor(task: Task) {
    return (task.expectedEndDate ?? 0) > (task.actualEndDate ?? 0) ? '#40af24' : '#bd1f1f';
  }
}

