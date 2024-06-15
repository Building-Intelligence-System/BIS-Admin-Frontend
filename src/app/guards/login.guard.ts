import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map} from "rxjs";

export const loginGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.isAuth$.pipe(
    map((isAuth: boolean): boolean => {
      if (isAuth) {
        router.navigateByUrl(route.data['redirectUrl']);
      }
      return !isAuth;
    }))
};
