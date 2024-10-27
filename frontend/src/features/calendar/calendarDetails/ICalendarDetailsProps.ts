import { ICycleData } from "../../../types/ICycleData";
import { ICycleInfo } from "../../../utils/ICycleInfo";

export interface ICalendarDetailsProps {
  date: Date;
  cycleData?: ICycleData;
  cycleInfo: ICycleInfo;
  onNavigateBack?: () => void;
}