import { ICycle } from "../../../shared/model/ICycle";

export interface ICalendarProps {
  endDate: Date;
  onDayClicked: (date: Date) => void;
  periods: ICycle[];
  startDate: Date;
}
