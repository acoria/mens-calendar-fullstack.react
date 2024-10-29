import { IPMSDay } from "../../../shared/model/IPMSDay";
import { ICycleData } from "../../../types/ICycleData";

export interface ICalendarDayDetails {
  cycleData?: ICycleData;
  day: Date;
  pmsDay?: IPMSDay;
}
