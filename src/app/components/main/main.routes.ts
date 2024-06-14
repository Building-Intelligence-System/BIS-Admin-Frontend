import {Routes} from '@angular/router';
import {ObjectMapComponent} from "../object-map/object-map.component";
import {ChartsComponent} from "../charts/charts.component";
import {MainComponent} from "./main.component";
import {authGuard} from "../../guards/auth.guard";

export const mainRoutes: Routes = [
  {
    path: 'admin-panel',
    component: MainComponent,
    canActivate: [authGuard],
    data: {redirectUrl: 'login'}
  },
  {
    path: 'object-map',
    component: ObjectMapComponent,
    canActivate: [authGuard],
    data: {redirectUrl: 'login'}
  },
  {
    path: 'charts',
    component: ChartsComponent,
    canActivate: [authGuard],
    data: {redirectUrl: 'login'}
  }
];
