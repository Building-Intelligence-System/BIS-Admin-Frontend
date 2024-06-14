import {Routes} from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {AuthComponent} from "./components/auth/auth.component";
import {loginGuard} from "./guards/login.guard";
import {authGuard} from "./guards/auth.guard";
import {mainRoutes} from "./components/main/main.routes";

export const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [loginGuard],
    data: {redirectUrl: ''}
  },
  {
    path: '',
    component: MainComponent,
    children: mainRoutes,
    canActivate: [authGuard],
    data: {redirectUrl: 'login'}
  },
];
