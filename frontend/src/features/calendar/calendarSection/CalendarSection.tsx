import { useEffect, useMemo, useState } from "react";
import { CycleApi } from "../../../api/CycleApi";
import { useRequest } from "../../../hooks/useRequest";
import { ICycle } from "../../../shared/model/ICycle";
import { ICycleData } from "../../../types/ICycleData";
import { CycleInfo } from "../../../utils/CycleInfo";
import { ICycleInfo } from "../../../utils/ICycleInfo";
import { Calendar } from "../calendar/Calendar";
import { DateCalculator } from "../calendar/utils/DateCalculator";
import { CalendarDetails } from "../calendarDetails/CalendarDetails";
import { ICalendarSectionProps } from "./ICalendarSectionProps";
// import styles from "./CalendarSection.module.scss";

export const CalendarSection: React.FC<ICalendarSectionProps> = (props) => {
  const [cycles, setCycles] = useState<ICycle[] | undefined>([]);
  const [details, setDetails] = useState<[Date, ICycleData?] | undefined>(
    undefined
  );
  const [loadCycles] = useRequest();

  const dateCalculator = useMemo(() => new DateCalculator(), []);
  const calendarStartDate = useMemo(
    () => dateCalculator.getFirstDayOfPreviousMonth(),
    [dateCalculator]
  );
  const calendarEndDate = useMemo(
    () => dateCalculator.getLastDayOfNextMonth(),
    [dateCalculator]
  );
  const cycleInfo: ICycleInfo | undefined = useMemo(() => {
    if (cycles) {
      return new CycleInfo(cycles);
    }
  }, [cycles]);

  useEffect(() => {
    loadCycles(async () => {
      const cycles = await new CycleApi().findByDateTimeSpan({
        from: calendarStartDate,
        to: calendarEndDate,
      });
      setCycles(cycles);
    });
    // do not add loadCycles since it currently has a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarEndDate, calendarStartDate, details]);

  return (
    // <div className={styles.calendarSection}>
    <>
      {cycleInfo && details !== undefined && (
        <CalendarDetails
          date={details[0]}
          cycleData={details[1]}
          cycleInfo={cycleInfo}
          onNavigateBack={() => setDetails(undefined)}
        />
      )}
      {cycleInfo && !details && (
        <>
          <Calendar
            startDate={calendarStartDate}
            endDate={calendarEndDate}
            cycleInfo={cycleInfo}
            onDayClicked={(date, cycleData) => setDetails([date, cycleData])}
          />
        </>
      )}
    </>
  );
};
