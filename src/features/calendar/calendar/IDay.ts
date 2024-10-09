import { CalendarType } from "./CalendarType";

export interface IDay {
  calendarType: CalendarType;
  dayOfMonth: number;
  isInCurrentMonth?: boolean;
}
