import { useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { useWeekdayLister } from "./hooks/useWeekdayLister";
import { ICalendarProps } from "./ICalendarProps";
import { IDay } from "./IDay";
import { PeriodInfo } from "./utils/PeriodInfo";

export const useCalendarViewModel = (props: ICalendarProps) => {
  const [testShowPeriodItem, setTestShowPeriodItem] = useState(true);
  const days: IDay[] = [];
  const periodInfo = new PeriodInfo(props.periods);
  const legend: string[] = useWeekdayLister(props.startDate);
  const renderMonth = useRenderMonth();

  const addToDays = (date: Date, isInCurrentMonth: boolean) => {
    const dayOfMonth = DateTime.toDay(date);
    const month = DateTime.toMonth(date);
    days.push({
      dayOfMonth: dayOfMonth,
      calendarType: periodInfo.getCalendarTypeByDate(date),
      isInCurrentMonth: isInCurrentMonth,
      isToday: DateTime.equalsDate(date, new Date()),
      month: dayOfMonth === 1 ? renderMonth(month, true) : "",
      date,
    });
  };

  const currentMonth = DateTime.toMonth(new Date());
  DateTimeIterator.iterate(props.startDate, props.endDate, (date) =>
    addToDays(date, DateTime.toMonth(date) === currentMonth)
  );

  const onDayClicked = (index: number) => {
    const day = days[index];
    console.log(
      `${day.dayOfMonth} ${renderMonth(DateTime.toMonth(day.date))} clicked`
    );
    const periodItem = periodInfo.findPeriodItemByDate(day.date);
    console.log(periodItem?.periodId);
    setTestShowPeriodItem((previous) => !previous);
  };

  return { days, legend, onDayClicked, testShowPeriodItem };
};
