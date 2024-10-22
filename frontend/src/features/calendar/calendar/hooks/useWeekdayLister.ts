import { DateTime } from "../../../../core/services/date/DateTime";
import { texts } from "../../../../lib/translation/texts";
import { useTranslation } from "../../../../lib/translation/useTranslation";

export const useWeekdayLister = (date: Date): string[] => {
  const { t } = useTranslation();

  let weekdays = [
    t(texts.general.weekdays.sundayShort),
    t(texts.general.weekdays.mondayShort),
    t(texts.general.weekdays.tuesdayShort),
    t(texts.general.weekdays.wednesdayShort),
    t(texts.general.weekdays.thursdayShort),
    t(texts.general.weekdays.fridayShort),
    t(texts.general.weekdays.saturdayShort),
  ];

  const startingDay = DateTime.toWeekday(date);

  if (startingDay !== 0) {
    const daysBeforeStartingDay = weekdays.splice(0, startingDay);
    weekdays = [...weekdays, ...daysBeforeStartingDay];
  }

  return weekdays;
};
