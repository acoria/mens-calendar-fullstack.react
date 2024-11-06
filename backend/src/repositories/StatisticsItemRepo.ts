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
    cycles.forEach((cycle) => {
      const statisticsItem = statisticsItemInfo.determineByCycle(cycle);
      if (statisticsItem !== undefined) {
        statisticsItems.push(statisticsItem);
      }
    });

    return statisticsItemInfo.fillPeriodBreaks(statisticsItems);
  }
}
