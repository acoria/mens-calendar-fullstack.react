import { useState } from "react";
import { PeriodApi } from "../../../api/PeriodApi";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../hooks/useRequest";
import { IPeriod } from "../../../shared/model/IPeriod";
import { Calendar } from "../calendar/Calendar";
import { DateCalculator } from "../calendar/utils/DateCalculator";
import { ICalendarSectionProps } from "./ICalendarSectionProps";
// import styles from "./CalendarSection.module.scss";

export const CalendarSection: React.FC<ICalendarSectionProps> = (props) => {
  const [periods, setPeriods] = useState<IPeriod[] | undefined>([]);
  const [loadPeriods] = useRequest();

  const dateCalculator = new DateCalculator();
  const calendarStartDate = dateCalculator.getFirstDayOfPreviousMonth();
  const calendarEndDate = dateCalculator.getLastDayOfNextMonth();

  useInitialize(() => {
    loadPeriods(async () => {
      const periods = await new PeriodApi().findByDateTimeSpan({
        from: calendarStartDate,
        to: calendarEndDate,
      });
      setPeriods(periods);
    });
  });

  return (
    // <div className={styles.calendarSection}>
    <>
      {periods && (
        <div>
          <Calendar
            startDate={calendarStartDate}
            endDate={calendarEndDate}
            periods={periods}
          />
        </div>
      )}
    </>
  );
};
