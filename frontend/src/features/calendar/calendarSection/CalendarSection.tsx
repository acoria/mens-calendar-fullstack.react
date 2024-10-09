import { useState } from "react";
import { Calendar } from "../calendar/Calendar";
import { ICalendarSectionProps } from "./ICalendarSectionProps";
import { IPeriod } from "../../../shared/model/IPeriod";
// import styles from "./CalendarSection.module.scss";

export const CalendarSection: React.FC<ICalendarSectionProps> = (props) => {
  const [periods, setPeriods] = useState<IPeriod[] | undefined>([]);
  //   const [periods, setPeriods] = useState<IPeriod[] | undefined>(undefined);

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
