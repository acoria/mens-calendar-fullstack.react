import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { useRenderMonth } from "./hooks/useRenderMonth";
import { useWeekdayLister } from "./hooks/useWeekdayLister";
import { ICalendarProps } from "./ICalendarProps";
import { IDay } from "./IDay";
import { CalendarTypeInfo } from "./utils/CalendarTypeInfo";

export const useCalendarViewModel = (props: ICalendarProps) => {
  const days: IDay[] = [];
  const calendarTypeInfo = new CalendarTypeInfo(props.periods);
  const legend: string[] = useWeekdayLister(props.startDate);
  const renderMonth = useRenderMonth();

  const addToDays = (date: Date, isInCurrentMonth: boolean) => {
    const dayOfMonth = DateTime.toDay(date);
    const month = DateTime.toMonth(date);
    days.push({
      dayOfMonth: dayOfMonth,
      calendarType: calendarTypeInfo.findByDate(date),
      isInCurrentMonth: isInCurrentMonth,
      isToday: DateTime.equalsDate(date, new Date()),
      month: dayOfMonth === 1 ? renderMonth(month, true) : "",
    });
  };

  const currentMonth = DateTime.toMonth(new Date());
  DateTimeIterator.iterate(props.startDate, props.endDate, (date) =>
    addToDays(date, DateTime.toMonth(date) === currentMonth)
  );

  const onDayClicked = (index: number) => {
    console.log(`clicked ${index}`);
  };

  return { days, legend, onDayClicked };
};
