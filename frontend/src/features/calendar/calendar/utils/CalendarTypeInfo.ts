import { DateTime } from "../../../../core/services/date/DateTime";
import { IPeriod } from "../../../../shared/model/IPeriod";
import { IPeriodItem } from "../../../../shared/model/IPeriodItem";
import { CalendarType } from "../CalendarType";

export class CalendarTypeInfo {
  private periodItems: IPeriodItem[] = [];

  constructor(private periods: IPeriod[]) {
    periods.forEach((period) => {
      period.periodItems?.forEach((periodItem) =>
        this.periodItems.push(periodItem)
      );
    });
  }

  findByDate(date: Date): CalendarType {
    let calendarType: CalendarType | undefined = undefined;
    this.periods.forEach((period) => {
      if (DateTime.equalsDate(period.startDay, date)) {
        //is calculated ovulation date?
        calendarType = CalendarType.OVULATION_DAY_CALCULATED;
      } else if (DateTime.equalsDate(period.feltOvulationDate, date)) {
        //is felt ovulation date?
        calendarType = CalendarType.OVULATION_DAY_FELT;
      } else if (
        period.periodItems === undefined ||
        period.periodItems.length === 0
      ) {
        //is mens expected date? (only show for period that has not started yet)
        //for this add 14 days to ovulation date
        const dateOfExpectedMens = DateTime.addDays(period.startDay, 14);
        if (DateTime.equalsDate(dateOfExpectedMens, date)) {
          calendarType = CalendarType.MENS_EXPECTED;
        }
      }
    });
    if (calendarType === undefined) {
      //check for period day
      const periodItem = this.periodItems.find((periodItem) =>
        DateTime.equalsDate(periodItem.day, date)
      );
      if (periodItem !== undefined) {
        if (periodItem.isLightDay) {
          calendarType = CalendarType.LIGHTEST_DAY;
        } else if (
          periodItem.amountTamponsSuper !== 0 ||
          periodItem.amountTamponsNormal > 3
        ) {
          calendarType = CalendarType.STRONG_DAY;
        } else if (periodItem.amountTamponsNormal > 1) {
          calendarType = CalendarType.NORMAL_DAY;
        } else {
          calendarType = CalendarType.LIGHT_DAY;
        }
      }
    }
    if (calendarType === undefined) {
      calendarType = CalendarType.NEUTRAL;
    }
    return calendarType;
  }
}
