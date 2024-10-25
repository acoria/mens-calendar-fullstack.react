import { ICycle } from "../../../shared/model/ICycle";

export interface ICalendarDetailsProps {
  date: Date;
  cycles: ICycle[];
  onNavigateBack?: () => void;
}
