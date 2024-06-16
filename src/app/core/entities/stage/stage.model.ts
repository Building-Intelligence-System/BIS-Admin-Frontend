import {Task} from "../task/task.model";

export class Stage {
  public id?: number;
  public name?: number;
  public start?: Date;
  public end?: Date;
  public expectedDuration?: Date;
  public tasks?: Task[];
}
