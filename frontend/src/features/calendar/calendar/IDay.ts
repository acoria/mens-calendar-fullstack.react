import { ICycleInfo } from "../../../types/ICycleInfo";
import { CalendarType } from "./CalendarType";

export interface IDay {
  calendarType: CalendarType;
  date: Date;
  dayOfMonth: number;
  isInCurrentMonth?: boolean;
  isToday: boolean;
  month?: string;
  cycleInfo?: ICycleInfo
}
