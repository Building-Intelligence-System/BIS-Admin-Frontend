import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BuildCardComponent} from "./components/build-card/build-card.component";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Project} from "../../core/entities/project/project.model";
import {ProjectsInfoComponent} from "./components/projects-info/projects-info.component";
import {ProjectTasksInfo} from "../../core/entities/project-tasks-info/projects-tasks-info.model";
import {Router} from "@angular/router";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    BuildCardComponent,
    ProjectsInfoComponent,
    ReactiveFormsModule
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelComponent implements OnInit {
  protected projects: Project[] = [];
  protected projectsTaskInfo: ProjectTasksInfo[] = [];

  protected showCreateNewProjectModal: boolean = true;
  protected createNewProjectFormGroup: FormGroup = new FormGroup({
    imageUrl: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    name: new FormControl(''),
    address: new FormControl(''),
  });

  constructor(private httpClient: HttpClient,
              private router: Router,
              private changeDetection: ChangeDetectorRef) {
  }

  async ngOnInit(): Promise<void> {
    const projectsPromise = firstValueFrom(this.httpClient.get<Project[]>('assets/mocks/projects-mock.json'));
    const projectsTaskInfo = firstValueFrom(this.httpClient.get<ProjectTasksInfo[]>('assets/mocks/projects-tasks-info-mock.json'));
    [this.projects, this.projectsTaskInfo] = await Promise.all([projectsPromise, projectsTaskInfo]);

    this.createNewProjectFormGroup = new FormGroup({
      imageUrl: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      name: new FormControl(''),
      address: new FormControl(''),
    });
    this.changeDetection.markForCheck();
  }

  protected onSubmit() {
    console.log(this.createNewProjectFormGroup.value);
  }

  protected handleFindProjectTaskInfo(project: Project) {
    return this.projectsTaskInfo.find((item) => item.projectId === project.id);
  }

  protected handleBuildCardClick(project: Project) {
    this.router.navigateByUrl(this.router.url + '/' + project.id);
  }
}
