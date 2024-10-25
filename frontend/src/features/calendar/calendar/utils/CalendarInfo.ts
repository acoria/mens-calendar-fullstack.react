import { DateTime } from "../../../../core/services/date/DateTime";
import { ICycleInfo } from "../../../../types/ICycleInfo";
import { CycleUtils } from "../../../../utils/CycleUtils";
import { CalendarType } from "../CalendarType";

export class CalendarInfo {
  getCalendarTypesByCycleInfo(cycleInfo?: ICycleInfo): CalendarType[] {
    const calendarTypes: CalendarType[] = [];

    if (cycleInfo === undefined) {
      calendarTypes.push(CalendarType.NEUTRAL);
      return calendarTypes;
    }

    //add expected period day
    const expectedPeriodDate = CycleUtils.calculateExpectedPeriodStartDate(
      cycleInfo.cycle
    );
    if (
      expectedPeriodDate &&
      DateTime.equalsDate(cycleInfo.date, expectedPeriodDate)
    ) {
      calendarTypes.push(CalendarType.MENS_EXPECTED);
    }
    if (cycleInfo.periodItem !== undefined) {
      if (cycleInfo.periodItem?.isLightDay) {
        calendarTypes.push(CalendarType.LIGHTEST_DAY);
      } else if (
        (cycleInfo.periodItem?.amountTamponsSuper !== 0 &&
          cycleInfo.periodItem?.amountTamponsSuper !== null) ||
        cycleInfo.periodItem?.amountTamponsNormal > 3
      ) {
        calendarTypes.push(CalendarType.STRONG_DAY);
      } else if (cycleInfo.periodItem?.amountTamponsNormal > 1) {
        calendarTypes.push(CalendarType.NORMAL_DAY);
      } else {
        calendarTypes.push(CalendarType.LIGHT_DAY);
      }
    }

    //add felt ovulation
    if (
      cycleInfo.cycle.feltOvulationDate !== undefined &&
      DateTime.equalsDate(cycleInfo.cycle.feltOvulationDate, cycleInfo.date)
    ) {
      calendarTypes.push(CalendarType.OVULATION_DAY_FELT);
    }

    //add calculated ovulation
    const calculatedOvulationDate =
      CycleUtils.calculateOvulationDateByPeriodStartDate(
        cycleInfo.cycle.calculatedPeriodStartDate
      );
    if (DateTime.equalsDate(cycleInfo.date, calculatedOvulationDate)) {
      calendarTypes.push(CalendarType.OVULATION_DAY_CALCULATED);
    }

    if (calendarTypes.length === 0) {
      calendarTypes.push(CalendarType.NEUTRAL);
    }

    return calendarTypes;
  }
}
