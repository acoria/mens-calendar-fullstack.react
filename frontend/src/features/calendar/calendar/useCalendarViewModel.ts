import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { useWeekdayLister } from "./hooks/useWeekdayLister";
import { ICalendarProps } from "./ICalendarProps";
import { IDay } from "./IDay";
import { CalendarInfo } from "./utils/CalendarInfo";

export const useCalendarViewModel = (props: ICalendarProps) => {
  const days: IDay[] = [];
  const calendarInfo = new CalendarInfo();
  const legend: string[] = useWeekdayLister(props.startDate);
  const renderMonth = useRenderMonth();

  const findPMSDay = (date: Date) =>
    props.pmsDays.find((pmsDay) => DateTime.equalsDate(pmsDay.day, date));

  const addToDays = (date: Date, isInCurrentMonth: boolean) => {
    const dayOfMonth = DateTime.toDay(date);
    const month = DateTime.toMonth(date);
    const cycleInfos = props.cycleInfo.findCycleDataByDate(date);
    days.push({
      dayOfMonth: dayOfMonth,
      calendarTypes: calendarInfo.getCalendarTypesByCycleInfo(cycleInfos),
      isInCurrentMonth: isInCurrentMonth,
      isToday: DateTime.equalsDate(date, new Date()),
      month: dayOfMonth === 1 ? renderMonth(month, true) : "",
      date,
      cycleData: cycleInfos,
      pmsDay: findPMSDay(date),
    });
  };

  const currentMonth = DateTime.toMonth(new Date());
  DateTimeIterator.iterate(props.startDate, props.endDate, (date) =>
    addToDays(date, DateTime.toMonth(date) === currentMonth)
  );

  const onDayClicked = (index: number) => {
    const clickedDay = days[index];
    props.onDayClicked(
      clickedDay.date,
      clickedDay.cycleData,
      clickedDay.pmsDay
    );
  };

  return {
    days,
    legend,
    onDayClicked,
  };
};
