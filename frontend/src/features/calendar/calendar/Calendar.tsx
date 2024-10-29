import { ReactElement } from "react";
import { ReactComponent as Ovulation } from "../../../assets/crack.svg";
import { ReactComponent as Drop } from "../../../assets/drop.svg";
import { ReactComponent as Sun } from "../../../assets/sun.svg";
import { style } from "../../../core/ui/style";
import { error } from "../../../core/utils/error";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { OvulationSide } from "../../../shared/types/OvulationSide";
import colors from "../../../styles/colors.module.scss";
import { CalendarItem } from "../calendarItem/CalendarItem";
import styles from "./Calendar.module.scss";
import { CalendarType } from "./CalendarType";
import { ICalendarProps } from "./ICalendarProps";
import { useCalendarViewModel } from "./useCalendarViewModel";
import { DateTime } from "../../../core/services/date/DateTime";

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

  const getMarkerColorByCalendarType = (
    calendarType: CalendarType
  ): string | undefined => {
    switch (calendarType) {
      case CalendarType.OVULATION_DAY_CALCULATED:
        return colors.colorCalendarOvulationDayCalculated;
      case CalendarType.MENS_EXPECTED:
        return colors.colorCalendarPeriodExpected;
      default:
        error("Marker color not defined.");
    }
  };
  const getOvulationSideText = (
    ovulationSide: OvulationSide | undefined
  ): string => {
    if (ovulationSide === undefined || ovulationSide === null) {
      return "";
    }
    switch (ovulationSide) {
      case OvulationSide.LEFT: {
        return t(texts.general.left);
      }
      case OvulationSide.RIGHT: {
        return t(texts.general.right);
      }
    }
  };

  const sortCalendarTypesByProminence = (
    calendarTypes: CalendarType[]
  ): CalendarType[] => {
    let sortedCalendarTypes: CalendarType[] = [];
    if (calendarTypes.length > 2) {
      error(
        `${calendarTypes.length} calendar types found for a day. The highest expected amount is 2.`
      );
    }

    //check for expected menstruation date
    const index = calendarTypes.findIndex(
      (calendarType) => calendarType === CalendarType.MENS_EXPECTED
    );
    switch (index) {
      case -1:
        break;
      case 0: {
        sortedCalendarTypes.push(calendarTypes[1], CalendarType.MENS_EXPECTED);
        break;
      }
      case 1: {
        sortedCalendarTypes = calendarTypes;
        break;
      }
    }

    //check for calculated ovulation date, which can be paired with felt ovulation day
    if (sortedCalendarTypes.length === 0) {
      const index = calendarTypes.findIndex(
        (calendarType) => calendarType === CalendarType.OVULATION_DAY_CALCULATED
      );
      switch (index) {
        case -1:
          break;
        case 0: {
          if (calendarTypes[1] === CalendarType.OVULATION_DAY_FELT) {
            sortedCalendarTypes.push(
              CalendarType.OVULATION_DAY_FELT,
              CalendarType.OVULATION_DAY_CALCULATED
            );
          } else {
            error(
              `Unexpected calendar type combination. Calendar type '${CalendarType.OVULATION_DAY_FELT}' expected.`
            );
          }
          break;
        }
        case 1: {
          if (calendarTypes[0] === CalendarType.OVULATION_DAY_FELT) {
            sortedCalendarTypes = calendarTypes;
            break;
          } else {
            error(
              `Unexpected calendar type combination. Calendar type '${CalendarType.OVULATION_DAY_FELT}' expected.`
            );
          }
        }
      }
    }

    return sortedCalendarTypes;
  };

  const days = viewModel.days.map((day, index) => {
    if (DateTime.equalsDate(day.date, new Date(2024, 9, 31))) {
      debugger;
    }
    let className = "";
    let icons: ReactElement | ReactElement[] | undefined = undefined;
    let description: string = "";
    let markerColor: string | undefined = undefined;
    let showHeaderIcon: boolean = day.pmsDay !== undefined;
    let calendarType: CalendarType;
    if (day.calendarTypes.length === 1) {
      calendarType = day.calendarTypes[0];
    } else {
      let calendarTypes = sortCalendarTypesByProminence(day.calendarTypes);
      calendarType = calendarTypes[0];
      markerColor = getMarkerColorByCalendarType(calendarTypes[1]);
    }
    switch (calendarType) {
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
        description = `${t(texts.calendar.ovulation)} ${getOvulationSideText(
          day.cycleData?.cycle.feltOvulationSide
        )}`;
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
        dayOfMonth={`${day.dayOfMonth.toString()} ${day.month}`}
        description={description}
        footerIcons={icons}
        headerIcon={
          showHeaderIcon ? (
            <Sun className={style(styles.icon, styles.sunIcon)} />
          ) : (
            <></>
          )
        }
        className={className}
        markerColor={markerColor}
        onClick={() => viewModel.onDayClicked(index)}
      />
    );
  });

  const legend = viewModel.legend.map((item) => (
    <div key={item} className={styles.legendItem}>
      {item}
    </div>
  ));

  return (
    <div className={styles.calendar}>
      {legend}
      {days}
    </div>
  );
};
