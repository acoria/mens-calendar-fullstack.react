import { ICalendarDetailsProps } from "./ICalendarDetailsProps";
import styles from "./CalendarDetails.module.scss";
import { ReactComponent as ChevronLeft } from "../../../assets/chevron_left.svg";
import { DateTime } from "../../../core/services/date/DateTime";
import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { useRenderWeekday } from "../../../hooks/useRenderWeekday";
import { PeriodItem } from "../../periodItem/PeriodItem";

export const CalendarDetails: React.FC<ICalendarDetailsProps> = (props) => {
  const renderMonth = useRenderMonth();
  const renderWeekday = useRenderWeekday();
  const month = DateTime.toMonth(props.date);
  const dayOfWeek = DateTime.toWeekday(props.date);
  const day = DateTime.toDay(props.date);
  const title = `${renderWeekday(dayOfWeek)}, ${day}. ${renderMonth(month)}`;

  return (
    <div className={styles.calendarDetails}>
      <div className={styles.header}>
        <ChevronLeft
          className={styles.backIcon}
          onClick={props.onNavigateBack}
        />
        <h3>{title}</h3>
      </div>
      <PeriodItem
        date={props.date}
        className={styles.periodItem}
        cycleData={props.cycleData}
        cycleInfo={props.cycleInfo}
      />
    </div>
  );
};
