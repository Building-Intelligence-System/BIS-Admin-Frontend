import {ProjectType} from "./project-type.enum";

export class Project {
  public id?: number;
  type?: ProjectType;
  address?: string;
  latitude?: number;
  longitude?: number;
  public name?: number;
  public start?: string;
  public end?: string;
  public expectedDuration?: string;
  imageReference?: string;
}

