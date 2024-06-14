import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BIS-Admin-Frontend';
  constructor(private authService: AuthService) {
    this.authService.isAuth$.next(false);
    this.authService.isAuth$.complete();
  }
}
