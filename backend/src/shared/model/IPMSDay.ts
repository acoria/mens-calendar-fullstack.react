import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";

export interface IPMSDay extends IEntity {
  day?: Date;
}

export const PMSDayRouteMeta: IRouteMeta = { path: "/pms-days" };
