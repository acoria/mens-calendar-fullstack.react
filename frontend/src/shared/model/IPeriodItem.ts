import { IEntity } from "../../core/api/types/IEntity";

export interface IPeriodItem extends IEntity {
  day: Date;
  isLightDay: boolean;
  amountTamponsMini: number;
  amountTamponsNormal: number;
  amountTamponsSuper: number;
  periodId: string;
}
