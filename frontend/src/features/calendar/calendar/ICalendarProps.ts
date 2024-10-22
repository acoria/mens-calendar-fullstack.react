import { IPeriod } from "../../../shared/model/IPeriod";

export interface ICalendarProps {
  endDate: Date;
  periods: IPeriod[];
  startDate: Date;
}
