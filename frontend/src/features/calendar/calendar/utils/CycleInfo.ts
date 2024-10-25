import { DateTime } from "../../../../core/services/date/DateTime";
import { error } from "../../../../core/utils/error";
import { ICycle } from "../../../../shared/model/ICycle";
import { IPeriodItem } from "../../../../shared/model/IPeriodItem";
import { CalendarType } from "../CalendarType";

export class CycleInfo {
  private periodItems: IPeriodItem[] = [];

  constructor(private cycles: ICycle[]) {
    cycles.forEach((cycle) => {
      cycle.periodItems?.forEach((periodItem) =>
        this.periodItems.push(periodItem)
      );
    });
  }

  getCycleById(id: string): ICycle {
    return (
      this.cycles.find((cycle) => (cycle.id = id)) ??
      error(`Cycle with id ${id} not found`)
    );
  }

  findCycleByDate(date: Date): ICycle | undefined {
    const cyclesBefore = this.cycles.filter((cycle) =>
      DateTime.isBefore(cycle.calculatedPeriodStartDate, date)
    );
    let lastCycle: ICycle | undefined = undefined;
    cyclesBefore.forEach((cycle) => {
      if (lastCycle === undefined) {
        lastCycle = cycle;
      } else {
        if (DateTime.isAfter(cycle.calculatedPeriodStartDate, lastCycle.calculatedPeriodStartDate)) {
          lastCycle = cycle;
        }
      }
    });
    return lastCycle;
  }

  private findPeriodItemByDate(date: Date): IPeriodItem | undefined {
    return this.periodItems.find((periodItem) =>
      DateTime.equalsDate(periodItem.day, date)
    );
  }

  findCycleInfoByDate(
    date: Date
  ): [cycle: ICycle | undefined, periodItem: IPeriodItem | undefined] {
    const periodItem = this.findPeriodItemByDate(date);
    let cycle: ICycle|undefined = undefined;
    if (periodItem !== undefined) {
      cycle = this.getCycleById(periodItem.periodId);
    }else{

    }

    return [cycle, periodItem];
  }

  getCalendarTypeByDate(date: Date): CalendarType {
    let calendarType: CalendarType | undefined = undefined;
    this.cycles.forEach((cycle) => {
      if (DateTime.equalsDate(cycle.calculatedPeriodStartDate, date)) {
        //is calculated ovulation date?
        calendarType = CalendarType.OVULATION_DAY_CALCULATED;
      } else if (
        cycle.feltOvulationDate &&
        DateTime.equalsDate(cycle.feltOvulationDate, date)
      ) {
        //is felt ovulation date?
        calendarType = CalendarType.OVULATION_DAY_FELT;
      } else if (
        cycle.periodItems === undefined ||
        cycle.periodItems.length === 0
      ) {
        //is mens expected date? (only show for cycle that has not started yet)
        //for this add 14 days to ovulation date
        const dateOfExpectedMens = DateTime.addDays(cycle.calculatedPeriodStartDate, 14);
        if (DateTime.equalsDate(dateOfExpectedMens, date)) {
          calendarType = CalendarType.MENS_EXPECTED;
        }
      }
    });
    if (calendarType === undefined) {
      //check for period day
      const periodItem = this.findPeriodItemByDate(date);
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
