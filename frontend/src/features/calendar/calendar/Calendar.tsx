import { ReactElement } from "react";
import { ReactComponent as Ovulation } from "../../../assets/crack.svg";
import { ReactComponent as Drop } from "../../../assets/drop.svg";
import { error } from "../../../core/utils/error";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { CalendarItem } from "../calendarItem/CalendarItem";
import styles from "./Calendar.module.scss";
import { CalendarType } from "./CalendarType";
import { ICalendarProps } from "./ICalendarProps";
import { useCalendarViewModel } from "./useCalendarViewModel";
import { style } from "../../../core/ui/style";

export const Calendar: React.FC<ICalendarProps> = (props) => {
  const viewModel = useCalendarViewModel(props);
  const { t } = useTranslation();

  const buildDrops = (numberOfDrops: number): ReactElement[] => {
    let drops: ReactElement[] = [];
    for (let i = 0; i < numberOfDrops; i++) {
      drops.push(<Drop key={`drop_${i}`} className={styles.icon} />);
    }
    return drops;
  };
  const days = viewModel.days.map((day, index) => {
    let className = "";
    let icons: ReactElement | ReactElement[] | undefined = undefined;
    let description: string = day.dayOfMonth.toString();
    switch (day.calendarType) {
      case CalendarType.NEUTRAL:
        className = day.isInCurrentMonth
          ? styles.dayInCurrentMonth
          : styles.neutral;
        break;
      case CalendarType.LIGHTEST_DAY:
        className = styles.lightestDay;
        icons = buildDrops(1);
        break;
      case CalendarType.LIGHT_DAY:
        className = styles.lightDay;
        icons = buildDrops(2);
        break;
      case CalendarType.MENS_EXPECTED:
        className = styles.mensExpected;
        icons = buildDrops(1);
        description = t(texts.calendar.mensExpected);
        break;
      case CalendarType.NORMAL_DAY:
        className = styles.normalDay;
        icons = buildDrops(3);
        break;
      case CalendarType.STRONG_DAY:
        className = styles.strongDay;
        icons = buildDrops(4);
        break;
      case CalendarType.OVULATION_DAY_CALCULATED:
        className = styles.ovulationDayCalculated;
        icons = <Ovulation className={styles.icon} />;
        description = t(texts.calendar.ovulationCalculated);
        break;
      case CalendarType.OVULATION_DAY_FELT:
        className = styles.ovulationDayFelt;
        icons = <Ovulation className={styles.icon} />;
        description = t(texts.calendar.ovulation);
        break;
      default:
        error("Missing CalendarType");
    }

    if (day.isToday) {
      className = style(className, styles.today);
    }

    return (
      <CalendarItem
        key={index}
        description={description}
        icons={icons}
        className={className}
        onClick={() => viewModel.onDayClicked(index)}
      />
    );
  });

  const legend = viewModel.legend.map((item) => <div className={styles.legendItem}>{item}</div>);

  return (
    <div className={styles.calendar}>
      {legend}
      {days}
    </div>
  );
};
