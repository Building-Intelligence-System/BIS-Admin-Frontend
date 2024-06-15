import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BuildCardComponent} from "./components/build-card/build-card.component";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {Project} from "../../core/entities/project/project.model";
import {ProjectsInfoComponent} from "./components/projects-info/projects-info.component";
import {ProjectTasksInfo} from "../../core/entities/project-tasks-info/projects-tasks-info.model";
import {Router} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    BuildCardComponent,
    ProjectsInfoComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminPanelComponent implements OnInit {
  protected projects: Project[] = [];
  protected projectsTaskInfo: ProjectTasksInfo[] = [];

  constructor(private httpClient: HttpClient,
              private router: Router,
              private changeDetection: ChangeDetectorRef,
              private navbarService: NavbarService) {
  }

  async ngOnInit(): Promise<void> {
    const projectsPromise = firstValueFrom(this.httpClient.get<Project[]>('assets/mocks/projects-mock.json'));
    const projectsTaskInfo = firstValueFrom(this.httpClient.get<ProjectTasksInfo[]>('assets/mocks/projects-tasks-info-mock.json'));
    [this.projects, this.projectsTaskInfo] = await Promise.all([projectsPromise, projectsTaskInfo]);
    this.navbarService.emitProjectsLinks(this.projects);
    this.changeDetection.markForCheck();
  }

  protected handleFindProjectTaskInfo(project: Project) {
    return this.projectsTaskInfo.find((item) => item.projectId === project.id);
  }

  protected handleBuildCardClick(project: Project) {
    this.router.navigateByUrl(this.router.url + '/' + project.id);
  }
}
