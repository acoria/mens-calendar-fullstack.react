import { DateTime } from "../../../../core/services/date/DateTime";
import { texts } from "../../../../lib/translation/texts";
import { useTranslation } from "../../../../lib/translation/useTranslation";

export const useWeekdayLister = (date: Date): string[] => {
  const { t } = useTranslation();

  let weekdays = [
    t(texts.weekdays.sundayShort),
    t(texts.weekdays.mondayShort),
    t(texts.weekdays.tuesdayShort),
    t(texts.weekdays.wednesdayShort),
    t(texts.weekdays.thursdayShort),
    t(texts.weekdays.fridayShort),
    t(texts.weekdays.saturdayShort),
  ];

  const startingDay = DateTime.toWeekday(date);

  if (startingDay !== 0) {
    const daysBeforeStartingDay = weekdays.splice(0, startingDay);
    weekdays = [...weekdays, ...daysBeforeStartingDay];
  }

  return weekdays;
};
