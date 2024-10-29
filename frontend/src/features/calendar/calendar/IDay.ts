import { IPMSDay } from "../../../shared/model/IPMSDay";
import { ICycleData } from "../../../types/ICycleData";
import { CalendarType } from "./CalendarType";

export interface IDay {
  calendarTypes: CalendarType[];
  date: Date;
  dayOfMonth: number;
  isInCurrentMonth?: boolean;
  isToday: boolean;
  month?: string;
  cycleData?: ICycleData;
  pmsDay?: IPMSDay;
}
