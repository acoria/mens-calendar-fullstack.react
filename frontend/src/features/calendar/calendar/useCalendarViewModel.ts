import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { ICalendarProps } from "./ICalendarProps";
import { IDay } from "./IDay";
import { CalendarTypeInfo } from "./utils/CalendarTypeInfo";

export const useCalendarViewModel = (props: ICalendarProps) => {
  const days: IDay[] = [];
  const calendarTypeInfo = new CalendarTypeInfo(props.periods);

  const addToDays = (date: Date, isInCurrentMonth: boolean) =>
    days.push({
      dayOfMonth: DateTime.toDay(date),
      calendarType: calendarTypeInfo.findByDate(date),
      isInCurrentMonth: isInCurrentMonth,
      isToday: DateTime.equalsDate(date, new Date()),
    });

  const currentMonth = DateTime.toMonth(new Date());
  DateTimeIterator.iterate(props.startDate, props.endDate, (date) =>
    addToDays(date, DateTime.toMonth(date) === currentMonth)
  );

  const onDayClicked = (index: number) => {
    console.log(`clicked ${index}`);
  };

  return { days, onDayClicked };
};
