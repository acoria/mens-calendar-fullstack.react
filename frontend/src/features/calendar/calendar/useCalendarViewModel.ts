import { useCallback, useEffect, useMemo, useState } from "react";
import { DateTime } from "../../../core/services/date/DateTime";
import { DateTimeIterator } from "../../../core/services/date/DateTimeIterator";
import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { useWeekdayLister } from "./hooks/useWeekdayLister";
import { ICalendarProps } from "./ICalendarProps";
import { IDay } from "./IDay";
import { CalendarInfo } from "./utils/CalendarInfo";

export const useCalendarViewModel = (props: ICalendarProps) => {
  const [days, setDays] = useState<IDay[]>([]);
  const calendarInfo = useMemo(() => new CalendarInfo(), []);
  const legend: string[] = useWeekdayLister(props.startDate);
  const renderMonth = useRenderMonth();

  const findPMSDay = useCallback(
    (date: Date) =>
      props.pmsDays.find((pmsDay) => DateTime.equalsDate(pmsDay.day, date)),
    [props.pmsDays]
  );

  const currentMonth = useMemo(() => DateTime.toMonth(new Date()), []);

  const addToDays = useCallback(
    (date: Date, isInCurrentMonth: boolean) => {
      const dayOfMonth = DateTime.toDay(date);
      const month = DateTime.toMonth(date);
      const cycleInfos = props.cycleInfo.findCycleDataByDate(date);
      setDays((previous) => [
        ...previous,
        {
          dayOfMonth: dayOfMonth,
          calendarTypes: calendarInfo.getCalendarTypesByCycleInfo(cycleInfos),
          isInCurrentMonth: isInCurrentMonth,
          isToday: DateTime.equalsDate(date, new Date()),
          month: dayOfMonth === 1 ? renderMonth(month, true) : "",
          date,
          cycleData: cycleInfos,
          pmsDay: findPMSDay(date),
        },
      ]);
    },
    [calendarInfo, findPMSDay, props.cycleInfo, renderMonth]
  );

  useEffect(() => {
    setDays([]);
    DateTimeIterator.iterate(props.startDate, props.endDate, (date) =>
      addToDays(date, DateTime.toMonth(date) === currentMonth)
    );
  }, [
    addToDays,
    currentMonth,
    props.endDate,
    props.startDate,
    props.cycleInfo,
  ]);

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
