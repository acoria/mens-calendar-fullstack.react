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

    //when period has not started yet
    if (cycleInfo.periodItem === undefined) {
      //add expected mens day
      const expectedMensDate = DateTime.addDays(
        cycleInfo.cycle.calculatedPeriodStartDate,
        28
      );
      if (DateTime.equalsDate(cycleInfo.date, expectedMensDate)) {
        calendarTypes.push(CalendarType.MENS_EXPECTED);
      }
    } else {
      if (cycleInfo.periodItem.isLightDay) {
        calendarTypes.push(CalendarType.LIGHTEST_DAY);
      } else if (
        cycleInfo.periodItem.amountTamponsSuper !== 0 ||
        cycleInfo.periodItem.amountTamponsNormal > 3
      ) {
        calendarTypes.push(CalendarType.STRONG_DAY);
      } else if (cycleInfo.periodItem.amountTamponsNormal > 1) {
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

    if (DateTime.equalsDate(cycleInfo.date, new Date(2024, 10, 6))) {
      debugger;
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
