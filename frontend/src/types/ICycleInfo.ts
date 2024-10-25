import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";

export interface ICycleInfo {
  date: Date;
  cycle: ICycle;
  periodItem?: IPeriodItem;
}
