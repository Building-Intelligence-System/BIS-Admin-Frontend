import { Injectable } from '@angular/core';
import {Project} from "../core/entities/project/project.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private projectsLinks: Subject<Project[]> = new Subject();
  public $projectsLinks = this.projectsLinks.asObservable();

  public emitProjectsLinks(project: Project[]) {
    this.projectsLinks.next(project);
  }
}
