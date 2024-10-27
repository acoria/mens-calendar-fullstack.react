import { ICalendarItemProps } from "./ICalendarItemProps";
import styles from "./CalendarItem.module.scss";
import { style } from "../../../core/ui/style";

export const CalendarItem: React.FC<ICalendarItemProps> = (props) => {
  return (
    <div
      className={style(styles.calendarItem, props.className)}
      onClick={props.onClick}
    >
      {props.markerColor && (
        <div
          style={{ borderRightColor: props.markerColor }}
          className={styles.marker}
        ></div>
      )}
      {<h1 className={styles.description}>{props.dayOfMonth}</h1>}
      {<h1 className={styles.description}>{props.description}</h1>}
      <div className={styles.icons}>{props.icons}</div>
    </div>
  );
};
