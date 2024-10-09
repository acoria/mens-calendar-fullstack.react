import { ICalendarItemProps } from "./ICalendarItemProps";
import styles from "./CalendarItem.module.scss";
import { style } from "../../../core/ui/style";

export const CalendarItem: React.FC<ICalendarItemProps> = (props) => {
  return (
    <div
      className={style(styles.calendarItem, props.className)}
      onClick={props.onClick}
    >
      {<h1 className={styles.description}>{props.description}</h1>}
      <div className={styles.icons}>{props.icons}</div>
    </div>
  );
};
