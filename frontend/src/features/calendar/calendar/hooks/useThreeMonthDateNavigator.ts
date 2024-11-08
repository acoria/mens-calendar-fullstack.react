import { useMemo, useState } from "react";
import { ThreeMonthDateNavigator } from "../utils/ThreeMonthDateNavigator";
import { ICalendarSpan } from "../../types/ICalendarSpan";

export const useThreeMonthDateNavigator = () => {
  const dateNavigator = useMemo(() => new ThreeMonthDateNavigator(), []);
  const [calendarSpan, setCalendarSpan] = useState<ICalendarSpan>(() =>
    dateNavigator.getNextCalendarSpan()
  );

  const navigateBackwards = () =>
    setCalendarSpan(dateNavigator.getPreviousCalendarSpan());

  const navigateForwards = () =>
    setCalendarSpan(dateNavigator.getNextCalendarSpan());

  return {
    calendarStartDate: calendarSpan.startDate,
    calendarEndDate: calendarSpan.endDate,
    firstFullMonth: dateNavigator.getFirstFullMonth(),
    lastFullMonth: dateNavigator.getLastFullMonth(),
    navigateBackwards,
    navigateForwards,
  };
};
