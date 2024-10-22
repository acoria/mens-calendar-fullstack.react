import { IPeriod } from "../../shared/model/IPeriod";
import { IPeriodItem } from "../../shared/model/IPeriodItem";

export interface IPeriodItemProps {
  date: Date;
  period: IPeriod;
  periodItem?: IPeriodItem;
}
