import {Injectable} from '@angular/core';
import {AsyncSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth$: AsyncSubject<boolean> = new AsyncSubject();
  public authData: User | null = null;

  constructor() {
  }

  public authByPassword(login: string, password: string) {
    if(!login || !password) return;
    this.authData = new User(1, 'testName', 'testSecondName', UserRoles.ADMIN);
    this.login();
  }

  private login() {
    this.isAuth$ = new AsyncSubject();
    this.isAuth$.next(true);
    this.isAuth$.complete();
  }
}

export class User {
  id?: number
  firstName?: string
  secondName?: string
  role?: UserRoles;

  constructor(id?: number,
              firstName?: string,
              secondName?: string,
              role?: UserRoles) {
  }
}

export enum UserRoles {
  ADMIN = "ADMIN"
}
