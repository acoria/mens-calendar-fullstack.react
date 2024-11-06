import { DateTime } from "../core/services/date/DateTime";
import { DateTimeIterator } from "../core/services/date/DateTimeIterator";
import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";
import { IStatisticsItem } from "../shared/model/IStatisticsItem";
import { CycleUtils } from "../shared/utils/CycleUtils";
import { uuid } from "./uuid";

export class StatisticsItemInfo {
  private determineEndDate(periodItems?: IPeriodItem[]): Date | undefined {
    if (periodItems !== undefined) {
      const latestPeriodItem = CycleUtils.findLatestPeriodItem(periodItems);
      return latestPeriodItem?.day;
    }
  }

  private determineStartDate(cycle: ICycle): Date {
    if (cycle.periodItems) {
      const earliestPeriodItem = CycleUtils.findEarliestPeriodItem(
        cycle.periodItems
      );
      if (earliestPeriodItem?.day !== undefined) {
        return earliestPeriodItem.day;
      }
    }
    return cycle.calculatedPeriodStartDate;
  }

  determineByCycle(cycle: ICycle): IStatisticsItem | undefined {
    let amountTamponsMini = 0;
    let amountTamponsNormal = 0;
    let amountTamponsSuper = 0;
    let amountLightPeriodDays = 0;
    let amountNormalPeriodDays = 0;

    if (cycle.periodItems === undefined || cycle.periodItems.length === 0) {
      return;
    }
    cycle.periodItems?.forEach((periodItem) => {
      amountTamponsMini += periodItem.amountTamponsMini;
      amountTamponsNormal += periodItem.amountTamponsNormal;
      amountTamponsSuper += periodItem.amountTamponsSuper;
      if (periodItem.isLightDay) {
        amountLightPeriodDays++;
      } else {
        amountNormalPeriodDays++;
      }
      amountLightPeriodDays;
    });

    let statisticItem: IStatisticsItem = {
      id: uuid(),
      amountNormalPeriodDays,
      amountLightPeriodDays,
      amountPMSDays: 0,
      amountTamponsMini,
      amountTamponsNormal,
      amountTamponsSuper,
      endDate: this.determineEndDate(cycle.periodItems),
      feltOvulationSide:
        cycle.feltOvulationSide !== null ? cycle.feltOvulationSide : undefined,
      startDate: this.determineStartDate(cycle),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return statisticItem;
  }

  fillPeriodBreaks(statisticItems: IStatisticsItem[]): IStatisticsItem[] {
    // return statisticItems;
    const sortedStatisticItems = statisticItems.sort((first, second) =>
      DateTime.compare(first.startDate, second.startDate)
    );
    for (let i = 0; i < sortedStatisticItems.length; i++) {
      let daysOfPeriodBreak = 0;
      const startDate = sortedStatisticItems[i].startDate;
      const previousStatisticsItem = sortedStatisticItems[i - 1];
      const endDateOfPreviousPeriod =
        previousStatisticsItem !== undefined
          ? previousStatisticsItem.endDate
          : undefined;
      if (endDateOfPreviousPeriod !== undefined) {
        //deduct start and end day
        const endOfPeriodBreak = DateTime.addDays(endDateOfPreviousPeriod, 2);
        DateTimeIterator.iterate(endOfPeriodBreak, startDate, () => {
          daysOfPeriodBreak++;
        });
      }
      sortedStatisticItems[i].durationPeriodBreakInDays = daysOfPeriodBreak;
    }
    return sortedStatisticItems;
  }
}
