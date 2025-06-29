import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { OvulationSide } from "../types/OvulationSide";

export interface IStatisticsItem extends IEntity {
  endDate?: Date;
  startDate: Date;
  feltOvulationSide?: OvulationSide;
  amountTamponsMini: number;
  amountTamponsNormal: number;
  amountTamponsSuper: number;
  amountLightPeriodDays: number;
  amountNormalPeriodDays: number;
  amountPMSDays: number;
  durationPeriodBreakInDays?: number;
  durationPeriodInDays?: number;
}

export const StatisticsItemRouteMeta: IRouteMeta = {
  path: "/statistics-items",
};
