import {ProjectType} from "./project-type.enum";
import {Stage} from "../stage/stage.model";

export class Project {
  public id?: number;
  type?: ProjectType;
  address?: string;
  constructionType?: string;
  latitude?: number;
  longitude?: number;
  public name?: number;
  public start?: string;
  public actualEndDate?: string;
  public expectedEndDate?: string;
  imageReference?: string;
  stages?: Stage[];
}
name
  :
  "Строительство многоквартирного дома в г.Краснодаре, ул. Северной, д.15"
startDate
  :
  "2019-05-01T00:00:00Z"
