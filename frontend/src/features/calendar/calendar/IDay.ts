import { ICycleData } from "../../../types/ICycleData";
import { CalendarType } from "./CalendarType";

export interface IDay {
  calendarTypes: CalendarType[];
  date: Date;
  dayOfMonth: number;
  isInCurrentMonth?: boolean;
  isToday: boolean;
  month?: string;
  cycleData?: ICycleData
}
