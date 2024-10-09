import { CalendarType } from "./CalendarType";
import { ICalendarProps } from "./ICalendarProps";
import { IDay } from "./IDay";

export const useCalendarViewModel = (props: ICalendarProps) => {
  const days: IDay[] = [
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: false,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 2,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.LIGHTEST_DAY,
      dayOfMonth: 3,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.LIGHT_DAY,
      dayOfMonth: 4,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.LIGHT_DAY,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.NORMAL_DAY,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.STRONG_DAY,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.OVULATION_DAY_CALCULATED,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.OVULATION_DAY_FELT,
      dayOfMonth: 1,
      isInCurrentMonth: true,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: false,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: false,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: false,
    },
    {
      calendarType: CalendarType.NEUTRAL,
      dayOfMonth: 1,
      isInCurrentMonth: false,
    },
    {
      calendarType: CalendarType.MENS_EXPECTED,
      dayOfMonth: 1,
      isInCurrentMonth: false,
    },
  ];

  const onDayClicked = (index: number) => {
    console.log(`clicked ${index}`);
  };

  return { days, onDayClicked };
};
