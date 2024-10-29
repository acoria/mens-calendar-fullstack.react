import { useEffect, useMemo, useState } from "react";
import { CycleApi } from "../../../api/CycleApi";
import { PMSDayApi } from "../../../api/PMSDayApi";
import { useRequest } from "../../../hooks/useRequest";
import { ICycle } from "../../../shared/model/ICycle";
import { IPMSDay } from "../../../shared/model/IPMSDay";
import { CycleInfo } from "../../../utils/CycleInfo";
import { ICycleInfo } from "../../../utils/ICycleInfo";
import { Calendar } from "../calendar/Calendar";
import { DateCalculator } from "../calendar/utils/DateCalculator";
import { CalendarDetails } from "../calendarDetails/CalendarDetails";
import { ICalendarDayDetails } from "../types/ICalendarDayDetails";
import { ICalendarSectionProps } from "./ICalendarSectionProps";
// import styles from "./CalendarSection.module.scss";

export const CalendarSection: React.FC<ICalendarSectionProps> = (props) => {
  const [cycles, setCycles] = useState<ICycle[] | undefined>([]);
  const [pmsDays, setPMSDays] = useState<IPMSDay[]>([]);
  const [details, setDetails] = useState<ICalendarDayDetails | undefined>(
    undefined
  );
  const [loadCycles] = useRequest();
  const [loadPMSDays] = useRequest();

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
    loadPMSDays(async () => {
      const pmsDays = await new PMSDayApi().findByDateTimeSpan({
        from: calendarStartDate,
        to: calendarEndDate,
      });
      setPMSDays(pmsDays);
    });

    // do not add loadCycles since it currently has a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarEndDate, calendarStartDate, details]);

  return (
    // <div className={styles.calendarSection}>
    <>
      {cycleInfo && details !== undefined && (
        <CalendarDetails
          date={details.day}
          cycleData={details.cycleData}
          cycleInfo={cycleInfo}
          onNavigateBack={() => setDetails(undefined)}
          pmsDay={details.pmsDay}
        />
      )}
      {cycleInfo && !details && (
        <>
          <Calendar
            startDate={calendarStartDate}
            endDate={calendarEndDate}
            cycleInfo={cycleInfo}
            pmsDays={pmsDays}
            onDayClicked={(date, cycleData, pmsDay) =>
              setDetails({ day: date, cycleData, pmsDay })
            }
          />
        </>
      )}
    </>
  );
};
