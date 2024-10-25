import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { OvulationSide } from "../types/OvulationSide";
import { IPeriodItem } from "./IPeriodItem";

export interface ICycle extends IEntity {
  calculatedPeriodStartDate: Date;
  feltOvulationDate?: Date;
  feltOvulationSide?: OvulationSide;
  periodItems?: IPeriodItem[];
}

export const CycleRouteMeta: IRouteMeta = {
  path: "/cycles",
};
