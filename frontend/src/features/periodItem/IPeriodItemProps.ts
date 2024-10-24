import { IPeriod } from "../../shared/model/IPeriod";
import { IPeriodItem } from "../../shared/model/IPeriodItem";
import { IHaveClassName } from "../../types/IHaveClassName";

export interface IPeriodItemProps extends IHaveClassName {
  date: Date;
  period: IPeriod;
  periodItem?: IPeriodItem;
}
