import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";
import { IHaveOvulation } from "./IHaveOvulation";
import { IHavePeriodDays } from "./IHavePeriodDays";
import { IHavePMSDays } from "./IHavePMSDays";
import { IHaveTamponAmounts } from "./IHaveTamponAmounts";

export interface IStatisticsItem
  extends IEntity,
    IHaveTamponAmounts,
    IHavePeriodDays,
    IHavePMSDays,
    IHaveOvulation {
  endDate?: Date;
  startDate: Date;
}

export const StatisticsItemRouteMeta: IRouteMeta = {
  path: "/statistics-items",
};
