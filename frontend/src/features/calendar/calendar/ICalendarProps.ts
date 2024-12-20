import { IPMSDay } from "../../../shared/model/IPMSDay";
import { ICycleData } from "../../../types/ICycleData";
import { ICycleInfo } from "../../../utils/ICycleInfo";

export interface ICalendarProps {
  cycleInfo: ICycleInfo;
  endDate: Date;
  firstFullMonth: number;
  lastFullMonth: number;
  onDayClicked: (date: Date, cycleData?: ICycleData, pmsDay?: IPMSDay) => void;
  onNavigateBackwardsClicked: () => void;
  onNavigateForwardsClicked: () => void;
  pmsDays: IPMSDay[];
  startDate: Date;
}
