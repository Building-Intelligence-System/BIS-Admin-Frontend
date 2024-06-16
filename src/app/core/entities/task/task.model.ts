import {TaskState} from "./tast-state.enum";

export class Task {
  public id?: number;
  public name?: string;
  public startDate?: string;
  public actualEndDate?: string;
  public expectedEndDate?: string;
  public responsible?: string;
  public taskState?: TaskState;
  head?: {
    firstName?: string;
    surname?: string
  }
}
