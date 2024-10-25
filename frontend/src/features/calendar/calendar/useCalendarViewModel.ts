import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { useWeekdayLister } from "./hooks/useWeekdayLister";
import { ICalendarProps } from "./ICalendarProps";
import { IDay } from "./IDay";
import { CycleInfo } from "../../../utils/CycleInfo";
import { CalendarInfo } from "./utils/CalendarInfo";

export const useCalendarViewModel = (props: ICalendarProps) => {
  const days: IDay[] = [];
  const cycleInfo = new CycleInfo(props.cycles);
  const calendarInfo = new CalendarInfo();
  const legend: string[] = useWeekdayLister(props.startDate);
  const renderMonth = useRenderMonth();

  const addToDays = (date: Date, isInCurrentMonth: boolean) => {
    const dayOfMonth = DateTime.toDay(date);
    const month = DateTime.toMonth(date);
    const cycleInfos = cycleInfo.findCycleInfoByDate(date);
    days.push({
      dayOfMonth: dayOfMonth,
      calendarType: calendarInfo.getCalendarTypesByCycleInfo(cycleInfos)?.[0],
      isInCurrentMonth: isInCurrentMonth,
      isToday: DateTime.equalsDate(date, new Date()),
      month: dayOfMonth === 1 ? renderMonth(month, true) : "",
      date,
      cycleInfo: cycleInfos,
    });
  };

  const currentMonth = DateTime.toMonth(new Date());
  DateTimeIterator.iterate(props.startDate, props.endDate, (date) =>
    addToDays(date, DateTime.toMonth(date) === currentMonth)
  );

  const onDayClicked = (index: number) => {
    const clickedDay = days[index];
    props.onDayClicked(clickedDay.date, clickedDay.cycleInfo);
  };

  return {
    days,
    legend,
    onDayClicked,
  };
};
