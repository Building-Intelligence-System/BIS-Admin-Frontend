import {Injectable} from '@angular/core';
import {AsyncSubject} from "rxjs";
import {Person} from "../core/entities/person/person.model";
import {PersonRoles} from "../core/entities/person/person-roles.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuth$: AsyncSubject<boolean> = new AsyncSubject();
  public authData: Person | null = null;

  constructor() {
  }

  public authByPassword(login: string, password: string): void {
    if(!login || !password) return;
    this.authData = new Person(1, 'testName', 'testSecondName', PersonRoles.DIRECTOR);
    this.login();
  }

  private login(): void {
    this.isAuth$ = new AsyncSubject();
    this.isAuth$.next(true);
    this.isAuth$.complete();
  }
}
