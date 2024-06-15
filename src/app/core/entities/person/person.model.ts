import {PersonRoles} from "./person-roles.enum";

export class Person {
  id?: number;
  firstName?: string;
  secondName?: string;
  role?: PersonRoles;

  constructor(id?: number,
              firstName?: string,
              secondName?: string,
              role?: PersonRoles) {
  }
}
