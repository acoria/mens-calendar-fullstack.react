import { useEffect, useMemo, useState } from "react";
import { CycleApi } from "../../../api/CycleApi";
import { PMSDayApi } from "../../../api/PMSDayApi";
import { useRequest } from "../../../hooks/useRequest";
import { ICycle } from "../../../shared/model/ICycle";
import { IPMSDay } from "../../../shared/model/IPMSDay";
import { CycleInfo } from "../../../utils/CycleInfo";
import { ICycleInfo } from "../../../utils/ICycleInfo";
import { Calendar } from "../calendar/Calendar";
import { DateNavigator } from "../calendar/utils/DateNavigator";
import { CalendarDetails } from "../calendarDetails/CalendarDetails";
import { ICalendarDayDetails } from "../types/ICalendarDayDetails";
import { ICalendarSpan } from "../types/ICalendarSpan";

export const CalendarSection: React.FC = () => {
  const [cycles, setCycles] = useState<ICycle[] | undefined>(undefined);
  const [pmsDays, setPMSDays] = useState<IPMSDay[]>([]);
  const [details, setDetails] = useState<ICalendarDayDetails | undefined>(
    undefined
  );
  const dateNavigator = useMemo(() => new DateNavigator(), []);
  const [calendarSpan, setCalendarSpan] = useState<ICalendarSpan>(
    dateNavigator.getNextCalendarSpan()
  );
  const [loadCycles] = useRequest();
  const [loadPMSDays] = useRequest();

  const cycleInfo: ICycleInfo | undefined = useMemo(() => {
    if (cycles !== undefined) {
      return new CycleInfo(cycles);
    }
  }, [cycles]);

  useEffect(() => {
    loadCycles(async () => {
      const cycles = await new CycleApi().findByDateTimeSpan({
        from: calendarSpan.startDate,
        to: calendarSpan.endDate,
      });
      setCycles(cycles);
    });
    loadPMSDays(async () => {
      const pmsDays = await new PMSDayApi().findByDateTimeSpan({
        from: calendarSpan.startDate,
        to: calendarSpan.endDate,
      });
      setPMSDays(pmsDays);
    });

    // do not add loadCycles since it currently has a bug
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarSpan, details]);

  return (
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
            startDate={calendarSpan.startDate}
            endDate={calendarSpan.endDate}
            cycleInfo={cycleInfo}
            pmsDays={pmsDays}
            onDayClicked={(date, cycleData, pmsDay) =>
              setDetails({ day: date, cycleData, pmsDay })
            }
            onNavigateBackwardsClicked={() =>
              setCalendarSpan(dateNavigator.getPreviousCalendarSpan())
            }
            onNavigateForwardsClicked={() =>
              setCalendarSpan(dateNavigator.getNextCalendarSpan())
            }
          />
        </>
      )}
    </>
  );
};
