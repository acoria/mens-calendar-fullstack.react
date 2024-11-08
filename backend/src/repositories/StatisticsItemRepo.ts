import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { ICycle } from "../shared/model/ICycle";
import { IPMSDay } from "../shared/model/IPMSDay";
import { IStatisticsItem } from "../shared/model/IStatisticsItem";
import { StatisticsItemInfo } from "../utils/StatisticsItemInfo";
import { CycleRepo } from "./CycleRepo";
import { PMSDayRepo } from "./PMSDayRepo";

export class StatisticsItemRepo {
  async findAll(): Promise<IStatisticsItem[]> {
    const cycleRepo = new CycleRepo();
    const pmsDayRepo = new PMSDayRepo();

    const cycles = await cycleRepo.findAll();
    const pmsDays = await pmsDayRepo.findAll();

    const statisticsItemInfo = new StatisticsItemInfo();
    const statisticsItems: IStatisticsItem[] = [];
    cycles.forEach(async (cycle) => {
      const statisticsItem = statisticsItemInfo.determineByCycle(cycle);
      if (statisticsItem !== undefined) {
        statisticsItem.amountPMSDays = this.countPMSDays(
          cycle,
          pmsDays,
          statisticsItem
        );
        statisticsItems.push(statisticsItem);
      }
    });
    const result = statisticsItemInfo.fillPeriodBreaks(statisticsItems);
    return result;
  }

  private countPMSDays(
    cycle: ICycle,
    pmsDays: IPMSDay[],
    statisticsItem: IStatisticsItem
  ) {
    const startDate = cycle.calculatedOvulationDate;
    const cycleSpan: IDateTimeSpan = {
      from: startDate,
      to: statisticsItem.endDate ?? DateTime.addDays(startDate, 28),
    };
    const pmsDaysInCycle = pmsDays.filter((pmsDay) =>
      DateTime.spanContains(cycleSpan, pmsDay.day)
    );

    return pmsDaysInCycle.length;
  }
}
