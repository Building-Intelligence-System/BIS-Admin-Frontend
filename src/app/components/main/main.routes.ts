import {Routes} from '@angular/router';
import {ObjectMapComponent} from "../object-map/object-map.component";
import {ChartsComponent} from "../charts/charts.component";
import {authGuard} from "../../guards/auth.guard";
import {AdminPanelComponent} from "../admin-panel/admin-panel.component";
import {ProjectInfoComponent} from "../admin-panel/components/project-info/project-info.component";
import {TaskModalInfoComponent} from "../admin-panel/components/project-info/task-modal-info/task-modal-info.component";
import {TrackingObjectComponent} from "../tracking-object/tracking-object.component";

export const mainRoutes: Routes = [
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [authGuard],
    data: {redirectUrl: 'login'}
  },
  {
    path: 'admin-panel/:projectId',
    component: ProjectInfoComponent,
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
  },
  {
    path: 'tracking-object',
    component: TrackingObjectComponent,
    canActivate: [authGuard],
    data: {redirectUrl: 'login'}
  },
  {
    path: '',
    redirectTo: 'admin-panel',
    pathMatch: 'full'
  },
];
