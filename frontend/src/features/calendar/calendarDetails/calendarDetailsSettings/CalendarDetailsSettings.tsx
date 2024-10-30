import { ICalendarDetailsSettingsProps } from "./ICalendarDetailsSettingsProps";
import styles from "./CalendarDetailsSettings.module.scss";

export const CalendarDetailsSettings: React.FC<
  ICalendarDetailsSettingsProps
> = (props) => {
  return (
    <div className={styles.calendarDetailsSettings}>
      <div className={styles.titleSection}>
        {props.icon}
        <h4 className={styles.title}>{props.title}</h4>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};
