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
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {TaskModalInfoComponent} from "./task-modal-info/task-modal-info.component";
import {Stage} from "../../../../core/entities/stage/stage.model";

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
    NgApexchartsModule,
    ReactiveFormsModule,
    TaskModalInfoComponent
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
  protected projectTasks: Task[] = [];
  protected projectStages: Stage[] = [];

  protected currentStage = 0;

  protected showAddTaskModal: boolean = false;
  protected addTaskFormGroup: FormGroup = new FormGroup({});

  protected showTaskModalInfo: boolean = false;
  protected selectedProjectTask: Task | undefined;

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: ChartOptions | undefined;

  constructor(private httpClient: HttpClient,
              private changeDetection: ChangeDetectorRef,
              protected activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.addTaskFormGroup = new FormGroup({
      name: new FormControl(),
      startDate: new FormControl(),
      expectedEndDate: new FormControl(),
      head: new FormControl(),
      person: new FormControl(),
      comment: new FormControl()
    });

    this.activatedRoute.params.subscribe(async (next: Params) => {
      const projectPromise = firstValueFrom(this.httpClient.get<Project>(`assets/mocks/project-${next['projectId']}-mock.json`));
      const projectTaskInfoPromise = firstValueFrom(this.httpClient.get<ProjectTasksInfo>(`assets/mocks/project-${next['projectId']}-task-info-mock.json`));
      const projectTasksPromise = firstValueFrom(this.httpClient.get<Task[]>(`assets/mocks/project-1-tasks-mock.json`));
      const projectStagesPromise = firstValueFrom(this.httpClient.get<Stage[]>(`assets/mocks/stage.json`));

      [this.project, this.projectTaskInfo, this.projectTasks, this.projectStages] = await Promise.all([projectPromise, projectTaskInfoPromise, projectTasksPromise, projectStagesPromise]);
      console.log('stage', this.projectStages);
      this.createChartOptions(this.projectStages![this.currentStage].tasks!);
      this.changeDetection.markForCheck();
    });
  }

  protected onSubmit() {
    this.addTaskFormGroup.reset();
  }

  protected createChartOptions(tasks: Task[]) {
    this.chartOptions = {
      series: tasks.map(task => ({
        name: 'Ответственный ' + task.head?.firstName + ' ' + task.head?.surname ?? '',
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
        events: {
          dataPointSelection: (e, chart, opts) => {
            this.handleTaskClick(opts['seriesIndex']);
          }
        },
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

  protected handleTaskClick(taskIndex: number) {
    if (!this.projectTasks) return;
    this.showTaskModalInfo = true;
    this.selectedProjectTask = this.projectTasks[taskIndex];
    this.changeDetection.markForCheck()
  }

  protected handleProjectPreviousStage() {
    this.currentStage -= 1;
    if(!this.projectStages![this.currentStage]) return;
    this.createChartOptions(this.projectStages![this.currentStage].tasks!);
    this.changeDetection.markForCheck();
  }

  protected handleProjectNextStage() {
    this.currentStage += 1;
    if(!this.projectStages![this.currentStage]) return;
    this.createChartOptions(this.projectStages![this.currentStage].tasks!);
    this.changeDetection.markForCheck();
  }

  private handleTaskColor(task: Task) {
    return (task.expectedEndDate ?? 0) > (task.actualEndDate ?? 0) ? '#40af24' : '#bd1f1f';
  }
}

