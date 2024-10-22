import { CalendarType } from "./CalendarType";

export interface IDay {
  calendarType: CalendarType;
  dayOfMonth: number;
  isInCurrentMonth?: boolean;
  isToday: boolean;
  month?: string;
  date: Date;
}
