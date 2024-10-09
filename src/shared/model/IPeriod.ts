import { OvulationSide } from "../types/OvulationSide";
import { IPeriodItem } from "./IPeriodItem";

export interface IPeriod {
  id: string;
  startDay: Date;
  feltOvulationDate: Date;
  feltOvulationSide: OvulationSide;
  periodItems?: IPeriodItem[];
}
