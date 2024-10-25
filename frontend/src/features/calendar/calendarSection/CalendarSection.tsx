import { useMemo, useState } from "react";
import { Cycle } from "../../../api/CycleApi";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../hooks/useRequest";
import { ICycle } from "../../../shared/model/ICycle";
import { Calendar } from "../calendar/Calendar";
import { DateCalculator } from "../calendar/utils/DateCalculator";
import { CalendarDetails } from "../calendarDetails/CalendarDetails";
import { ICalendarSectionProps } from "./ICalendarSectionProps";
// import styles from "./CalendarSection.module.scss";

export const CalendarSection: React.FC<ICalendarSectionProps> = (props) => {
  const [periods, setPeriods] = useState<ICycle[] | undefined>([]);
  const [loadPeriods] = useRequest();

  const dateCalculator = useMemo(() => new DateCalculator(), []);
  const calendarStartDate = dateCalculator.getFirstDayOfPreviousMonth();
  const calendarEndDate = dateCalculator.getLastDayOfNextMonth();
  const [detailsDate, setDetailsDate] = useState<Date | undefined>(undefined);

  useInitialize(() => {
    loadPeriods(async () => {
      const periods = await new Cycle().findByDateTimeSpan({
        from: calendarStartDate,
        to: calendarEndDate,
      });
      setPeriods(periods);
    });
  });

  return (
    // <div className={styles.calendarSection}>
    <>
      {periods && detailsDate !== undefined && (
        <CalendarDetails
          date={detailsDate}
          cycles={periods}
          onNavigateBack={() => setDetailsDate(undefined)}
        />
      )}
      {periods && !detailsDate && (
        <>
          <Calendar
            startDate={calendarStartDate}
            endDate={calendarEndDate}
            periods={periods}
            onDayClicked={setDetailsDate}
          />
        </>
      )}
    </>
  );
};
