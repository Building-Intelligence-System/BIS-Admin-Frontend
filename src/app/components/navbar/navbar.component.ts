import {ChangeDetectorRef, Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";
import {AsyncPipe} from "@angular/common";

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
  constructor(protected navbarService: NavbarService,
              private changeDetection: ChangeDetectorRef) {
    this.navbarService.$projectsLinks.subscribe(() => {
      this.changeDetection.detectChanges();
    })
  }
}
