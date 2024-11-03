import { DateTime } from "../core/services/date/DateTime";
import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";

class CycleUtilsDefault {
  private calculateNextPeriodStartDateFromPreviousCycle(
    previousCycle: ICycle
  ): Date {
    return DateTime.addDays(previousCycle.calculatedPeriodStartDate, 28);
  }

  calculateOvulationDateByPeriodStartDate(date: Date): Date {
    return DateTime.subtractDays(date, 14);
  }

  calculateExpectedPeriodStartDateFromPreviousCycle(
    previousCycle: ICycle
  ): Date {
    if (
      previousCycle.periodItems === undefined ||
      previousCycle.periodItems?.length === 0
    ) {
      return this.calculateNextPeriodStartDateFromPreviousCycle(previousCycle);
    } else {
      const earliestPeriodItem =
        this.findEarliestPeriodItemInCycle(previousCycle);
      if (earliestPeriodItem !== undefined) {
        const firstPeriodDay = (earliestPeriodItem as IPeriodItem).day;
        return DateTime.addDays(firstPeriodDay, 28);
      } else {
        return this.calculateNextPeriodStartDateFromPreviousCycle(
          previousCycle
        );
      }
    }
  }

  findEarliestPeriodItemInCycle(cycle: ICycle): IPeriodItem | undefined {
    let earliestPeriodItem: IPeriodItem | undefined = undefined;
    cycle.periodItems?.forEach((periodItem) => {
      if (earliestPeriodItem === undefined) {
        earliestPeriodItem = periodItem;
      } else if (DateTime.isBefore(periodItem.day, earliestPeriodItem.day)) {
        earliestPeriodItem = periodItem;
      }
    });
    return earliestPeriodItem;
  }
}
export const CycleUtils = new CycleUtilsDefault();
