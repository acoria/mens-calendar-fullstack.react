import { OvulationSide } from "../../../shared/types/OvulationSide";

export interface IStatisticsItemProps {
  endDate: Date;
  startDate: Date;
  feltOvulationSide?: OvulationSide;
  amountTamponsMini: number;
  amountTamponsNormal: number;
  amountTamponsSuper: number;
  amountLightPeriodDays: number;
  amountNormalPeriodDays: number;
  amountPMSDays: number;
  durationPeriodBreakInDays: number;
}
