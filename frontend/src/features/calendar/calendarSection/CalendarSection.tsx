import { useState } from "react";
import { PeriodApi } from "../../../api/PeriodApi";
import { DateTime } from "../../../core/services/date/DateTime";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../hooks/useRequest";
import { IPeriod } from "../../../shared/model/IPeriod";
import { Calendar } from "../calendar/Calendar";
import { ICalendarSectionProps } from "./ICalendarSectionProps";
// import styles from "./CalendarSection.module.scss";

export const CalendarSection: React.FC<ICalendarSectionProps> = (props) => {
  const [periods, setPeriods] = useState<IPeriod[] | undefined>([]);
  //   const [periods, setPeriods] = useState<IPeriod[] | undefined>(undefined);
  const [loadPeriods] = useRequest();

  useInitialize(() => {
    loadPeriods(async () => {
      const pastDateFrom = DateTime.subtractDays(new Date(), 5);
      const pastDateTo = DateTime.addDays(new Date(), 3);
      const periods = await new PeriodApi().findByDateTimeSpan({
        from: pastDateFrom,
        to: pastDateTo,
      });
      setPeriods(periods);
    });
  });

  return (
    // <div className={styles.calendarSection}>
    <>
      {periods && (
        <div>
          <Calendar periods={periods} />
        </div>
      )}
    </>
  );
};
