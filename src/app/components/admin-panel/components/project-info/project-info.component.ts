import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
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
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexXAxis,
  ChartComponent,
  NgApexchartsModule
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  fill: ApexFill;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-project-info',
  standalone: true,
  imports: [
    AsyncPipe,
    NgApexchartsModule
  ],
  templateUrl: './project-info.component.html',
  styleUrl: './project-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectInfoComponent implements OnInit {
  protected project: Project | undefined;
  protected projectTaskInfo: ProjectTasksInfo | undefined;
  protected projectTasks: Task[] | undefined;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: ChartOptions | undefined;

  constructor(private httpClient: HttpClient,
              private changeDetection: ChangeDetectorRef,
              protected activatedRoute: ActivatedRoute) {
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
            ]
          }
        ]
      })),
      chart: {
        height: 350,
        type: "rangeBar"
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
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.25,
          gradientToColors: ['red'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        show: false
      }
    };
  }

  protected readonly buildTypes = buildTypes;
  protected readonly DateUtils = DateUtils;
}

