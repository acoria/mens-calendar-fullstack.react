import { DateTime } from "../../../../core/services/date/DateTime";
import { ICycleData } from "../../../../types/ICycleData";
import { CycleUtils } from "../../../../utils/CycleUtils";
import { CalendarType } from "../CalendarType";

export class CalendarInfo {
  getCalendarTypesByCycleInfo(cycleData?: ICycleData): CalendarType[] {
    const calendarTypes: CalendarType[] = [];

    if (cycleData === undefined) {
      calendarTypes.push(CalendarType.NEUTRAL);
      return calendarTypes;
    }

    //add expected period day
    const expectedPeriodDate = CycleUtils.calculateExpectedPeriodStartDate(
      cycleData.cycle
    );
    if (
      expectedPeriodDate &&
      DateTime.equalsDate(cycleData.date, expectedPeriodDate)
    ) {
      calendarTypes.push(CalendarType.MENS_EXPECTED);
    }
    if (cycleData.periodItem !== undefined) {
      if (cycleData.periodItem?.isLightDay) {
        calendarTypes.push(CalendarType.LIGHTEST_DAY);
      } else if (
        (cycleData.periodItem?.amountTamponsSuper !== 0 &&
          cycleData.periodItem?.amountTamponsSuper !== null) ||
        cycleData.periodItem?.amountTamponsNormal > 3
      ) {
        calendarTypes.push(CalendarType.STRONG_DAY);
      } else if (cycleData.periodItem?.amountTamponsNormal > 1) {
        calendarTypes.push(CalendarType.NORMAL_DAY);
      } else {
        calendarTypes.push(CalendarType.LIGHT_DAY);
      }
    }

    //add felt ovulation
    if (
      cycleData.cycle.feltOvulationDate !== undefined &&
      DateTime.equalsDate(cycleData.cycle.feltOvulationDate, cycleData.date)
    ) {
      calendarTypes.push(CalendarType.OVULATION_DAY_FELT);
    }

    //add calculated ovulation
    const calculatedOvulationDate =
      CycleUtils.calculateOvulationDateByPeriodStartDate(
        cycleData.cycle.calculatedPeriodStartDate
      );
    if (DateTime.equalsDate(cycleData.date, calculatedOvulationDate)) {
      calendarTypes.push(CalendarType.OVULATION_DAY_CALCULATED);
    }

    if (calendarTypes.length === 0) {
      calendarTypes.push(CalendarType.NEUTRAL);
    }

    return calendarTypes;
  }
}
