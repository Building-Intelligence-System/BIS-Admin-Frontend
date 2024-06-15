import {ChangeDetectorRef, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";
import {AsyncPipe} from "@angular/common";
import {Project} from "../../core/entities/project/project.model";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  protected projectsLinks: Project[] | undefined;
  constructor(protected navbarService: NavbarService,
              private changeDetection: ChangeDetectorRef) {
    this.navbarService.$projectsLinks.subscribe((next) => {
      this.projectsLinks = next;
      this.changeDetection.markForCheck();
    })
  }
}
