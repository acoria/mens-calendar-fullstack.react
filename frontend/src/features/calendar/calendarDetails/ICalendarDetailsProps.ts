import { ICycleInfo } from "../../../types/ICycleInfo";

export interface ICalendarDetailsProps {
  date: Date;
  cycleInfo?: ICycleInfo;
  onNavigateBack?: () => void;
}
