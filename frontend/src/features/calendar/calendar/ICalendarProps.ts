import { ICycle } from "../../../shared/model/ICycle";
import { ICycleInfo } from "../../../types/ICycleInfo";

export interface ICalendarProps {
  endDate: Date;
  onDayClicked: (date: Date, cycleInfo?: ICycleInfo) => void;
  cycles: ICycle[];
  startDate: Date;
}
