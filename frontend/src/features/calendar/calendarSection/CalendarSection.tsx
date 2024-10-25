import { useMemo, useState } from "react";
import { Cycle } from "../../../api/CycleApi";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../hooks/useRequest";
import { ICycle } from "../../../shared/model/ICycle";
import { ICycleInfo } from "../../../types/ICycleInfo";
import { Calendar } from "../calendar/Calendar";
import { DateCalculator } from "../calendar/utils/DateCalculator";
import { CalendarDetails } from "../calendarDetails/CalendarDetails";
import { ICalendarSectionProps } from "./ICalendarSectionProps";
// import styles from "./CalendarSection.module.scss";

export const CalendarSection: React.FC<ICalendarSectionProps> = (props) => {
  const [cycles, setCycles] = useState<ICycle[] | undefined>([]);
  const [loadCycles] = useRequest();

  const dateCalculator = useMemo(() => new DateCalculator(), []);
  const calendarStartDate = dateCalculator.getFirstDayOfPreviousMonth();
  const calendarEndDate = dateCalculator.getLastDayOfNextMonth();
  const [details, setDetails] = useState<[Date, ICycleInfo?] | undefined>(
    undefined
  );

  useInitialize(() => {
    loadCycles(async () => {
      const cycles = await new Cycle().findByDateTimeSpan({
        from: calendarStartDate,
        to: calendarEndDate,
      });
      setCycles(cycles);
    });
  });

  return (
    // <div className={styles.calendarSection}>
    <>
      {cycles && details !== undefined && (
        <CalendarDetails
          date={details[0]}
          cycleInfo={details[1]}
          onNavigateBack={() => setDetails(undefined)}
        />
      )}
      {cycles && !details && (
        <>
          <Calendar
            startDate={calendarStartDate}
            endDate={calendarEndDate}
            cycles={cycles}
            onDayClicked={(date, cycleInfo) => setDetails([date, cycleInfo])}
          />
        </>
      )}
    </>
  );
};
