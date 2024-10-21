import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { OvulationSide } from "../types/OvulationSide";
import { IPeriodItem } from "./IPeriodItem";

export interface IPeriod extends IEntity {
  startDay: Date;
  feltOvulationDate: Date;
  feltOvulationSide: OvulationSide;
  periodItems?: IPeriodItem[];
}

export const PeriodRouteMeta: IRouteMeta = {
  path: "/periods",
};
