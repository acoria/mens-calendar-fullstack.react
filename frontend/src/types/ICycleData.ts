import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";

export interface ICycleData {
  date: Date;
  cycle: ICycle;
  periodItem?: IPeriodItem;
}
