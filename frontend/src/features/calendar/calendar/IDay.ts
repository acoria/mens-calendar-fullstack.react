import { OvulationSide } from "../../../shared/types/OvulationSide";
import { CalendarType } from "./CalendarType";

export interface IDay {
  calendarType: CalendarType;
  date: Date;
  dayOfMonth: number;
  isInCurrentMonth?: boolean;
  isToday: boolean;
  month?: string;
  feltOvulationSide?: OvulationSide;
}
