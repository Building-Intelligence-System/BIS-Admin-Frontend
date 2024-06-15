import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  return authService.isAuth$.pipe(
    map((isAuth: boolean): boolean => {
      if (!isAuth) {
        router.navigateByUrl(route.data['redirectUrl']);
      }
      return isAuth;
    }))
};

