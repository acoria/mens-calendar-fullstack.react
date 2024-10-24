import { IPeriod } from "../../../shared/model/IPeriod";
import { IPeriodItem } from "../../../shared/model/IPeriodItem";

export interface ICalendarDetailsProps {
  date: Date;
  period: IPeriod;
  periodItem?: IPeriodItem;
  onNavigateBack?: () => void;
}
