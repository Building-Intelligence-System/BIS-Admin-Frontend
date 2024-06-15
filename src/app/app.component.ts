import {ChangeDetectionStrategy, Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AuthService} from "./services/auth.service";
import {
  TrackingObjectVideoComponent
} from "./components/object-map/components/tracking-object-video/tracking-object-video.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private authService: AuthService) {
    this.authService.isAuth$.next(true);
    this.authService.isAuth$.complete();
  }
}
