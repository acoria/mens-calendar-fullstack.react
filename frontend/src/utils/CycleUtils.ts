import { DateTime } from "../core/services/date/DateTime";
import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";

class CycleUtilsDefault {
  calculateOvulationDateByPeriodStartDate(date: Date): Date {
    return DateTime.subtractDays(date, 14);
  }

  calculateExpectedPeriodStartDate(cycle: ICycle): Date | undefined {
    if (cycle.periodItems === undefined || cycle.periodItems?.length === 0) {
      return DateTime.addDays(cycle.calculatedPeriodStartDate, 28);
    } else {
      let earliestPeriodItem: IPeriodItem | undefined = undefined;
      cycle.periodItems?.forEach((periodItem) => {
        if (earliestPeriodItem === undefined) {
          earliestPeriodItem = periodItem;
        } else if (DateTime.isBefore(periodItem.day, earliestPeriodItem.day)) {
          earliestPeriodItem = periodItem;
        }
      });
      if (earliestPeriodItem !== undefined) {
        const firstPeriodDay = (earliestPeriodItem as IPeriodItem).day;
        return DateTime.addDays(firstPeriodDay, 28);
      }
    }
  }
}
export const CycleUtils = new CycleUtilsDefault();
