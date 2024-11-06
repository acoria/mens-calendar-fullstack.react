import { DateTime } from "../../core/services/date/DateTime";
import { ICycle } from "../model/ICycle";
import { IPeriodItem } from "../model/IPeriodItem";

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
    if (cycle.periodItems) {
      return this.findEarliestPeriodItem(cycle.periodItems);
    }
  }

  findEarliestPeriodItem(periodItems: IPeriodItem[]): IPeriodItem | undefined {
    return this.findPeriodItemByDateCompareCondition(
      periodItems,
      (firstDate, secondDate) => DateTime.isBefore(firstDate, secondDate)
    );
    // let earliestPeriodItem: IPeriodItem | undefined = undefined;
    // periodItems.forEach((periodItem) => {
    //   if (earliestPeriodItem === undefined) {
    //     earliestPeriodItem = periodItem;
    //   } else if (DateTime.isBefore(periodItem.day, earliestPeriodItem.day)) {
    //     earliestPeriodItem = periodItem;
    //   }
    // });
    // return earliestPeriodItem;
  }

  findLatestPeriodItem(periodItems: IPeriodItem[]): IPeriodItem | undefined {
    return this.findPeriodItemByDateCompareCondition(
      periodItems,
      (firstDate, secondDate) => DateTime.isAfter(firstDate, secondDate)
    );

    // let latestPeriodItem: IPeriodItem | undefined = undefined;
    // periodItems.forEach((periodItem) => {
    //   if (latestPeriodItem === undefined) {
    //     latestPeriodItem = periodItem;
    //   } else if (DateTime.isAfter(periodItem.day, latestPeriodItem.day)) {
    //     latestPeriodItem = periodItem;
    //   }
    // });
    // return latestPeriodItem;
  }

  findPeriodItemByDateCompareCondition(
    periodItems: IPeriodItem[],
    dateCompareCondition: (firstDate: Date, secondDate: Date) => boolean
  ): IPeriodItem | undefined {
    let foundPeriodItem: IPeriodItem | undefined = undefined;
    periodItems.forEach((periodItem) => {
      if (foundPeriodItem === undefined) {
        foundPeriodItem = periodItem;
      } else if (dateCompareCondition(periodItem.day, foundPeriodItem.day)) {
        foundPeriodItem = periodItem;
      }
    });
    return foundPeriodItem;
  }
}
export const CycleUtils = new CycleUtilsDefault();
