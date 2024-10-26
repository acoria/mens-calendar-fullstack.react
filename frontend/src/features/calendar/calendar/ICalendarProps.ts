import { ICycleData } from "../../../types/ICycleData";
import { ICycleInfo } from "../../../utils/ICycleInfo";

export interface ICalendarProps {
  endDate: Date;
  onDayClicked: (date: Date, cycleData?: ICycleData) => void;
  cycleInfo: ICycleInfo;
  startDate: Date;
}
