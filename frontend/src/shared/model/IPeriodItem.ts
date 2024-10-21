import { IEntity } from "../../core/api/types/IEntity";
import { IRouteMeta } from "../../core/api/types/IRouteMeta";

export interface IPeriodItem extends IEntity {
  day: Date;
  isLightDay: boolean;
  amountTamponsMini: number;
  amountTamponsNormal: number;
  amountTamponsSuper: number;
  periodId: string;
}

export const PeriodItemRouteMeta: IRouteMeta = { path: "/period-items" };
