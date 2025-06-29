import { DateTime } from "../core/services/date/DateTime";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { ICycle } from "../shared/model/ICycle";
import { IPMSDay } from "../shared/model/IPMSDay";
import { IStatisticsItem } from "../shared/model/IStatisticsItem";
import { OvulationSide } from "../shared/types/OvulationSide";
import { StatisticsItemInfo } from "../utils/StatisticsItemInfo";
import { uuid } from "../utils/uuid";
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
    const sortedResult = result.sort((left, right) => {
      if (left.startDate > right.startDate) {
        return -1;
      }
      if (left.startDate < right.startDate) {
        return 1;
      }
      return 0;
    });
    return sortedResult;
  }

  async getAverageStatistic(): Promise<IStatisticsItem> {
    const statisticItems = await this.findAll();
    const numberOfCycles = statisticItems.length;
    const pmsDayRepo = new PMSDayRepo();

    const pmsDays = await pmsDayRepo.findAll();

    if (numberOfCycles === 0)
      return {
        id: uuid(),
        startDate: new Date(),
        amountLightPeriodDays: 0,
        amountNormalPeriodDays: 0,
        amountPMSDays: 0,
        amountTamponsMini: 0,
        amountTamponsNormal: 0,
        amountTamponsSuper: 0,
        durationPeriodBreakInDays: 0,
        durationPeriodInDays: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

    let amountTamponsMini = 0;
    let amountTamponsNormal = 0;
    let amountTamponsSuper = 0;
    let amountLightPeriodDays = 0;
    let amountNormalPeriodDays = 0;
    let amountFeltOvulationSideLeft = 0;
    let amountFeltOvulationSideRight = 0;
    let durationPeriodBreakInDays = 0;
    let durationPeriodInDays = 0;
    let feltOvulationSide: OvulationSide | undefined = undefined;

    statisticItems.forEach((statisticItem) => {
      amountTamponsMini += statisticItem.amountTamponsMini;
      amountTamponsNormal += statisticItem.amountTamponsNormal;
      amountTamponsSuper += statisticItem.amountTamponsSuper;
      amountLightPeriodDays += statisticItem.amountLightPeriodDays;
      amountNormalPeriodDays += statisticItem.amountNormalPeriodDays;
      durationPeriodBreakInDays += statisticItem.durationPeriodBreakInDays ?? 0;
      durationPeriodInDays += statisticItem.durationPeriodInDays ?? 0;

      if (statisticItem.feltOvulationSide !== undefined) {
        if (statisticItem.feltOvulationSide === OvulationSide.LEFT) {
          amountFeltOvulationSideLeft++;
        } else {
          amountFeltOvulationSideRight++;
        }
      }
    });

    if (amountFeltOvulationSideLeft > amountFeltOvulationSideRight) {
      feltOvulationSide = OvulationSide.LEFT;
    } else if (amountFeltOvulationSideRight > amountFeltOvulationSideLeft) {
      feltOvulationSide = OvulationSide.RIGHT;
    }

    return {
      id: uuid(),
      startDate: statisticItems[statisticItems.length - 1].startDate,
      endDate: statisticItems[0].endDate,
      amountTamponsMini: this.calculateAverage(
        amountNormalPeriodDays,
        numberOfCycles
      ),
      amountTamponsNormal: this.calculateAverage(
        amountTamponsNormal,
        numberOfCycles
      ),
      amountTamponsSuper: this.calculateAverage(
        amountTamponsSuper,
        numberOfCycles
      ),
      amountLightPeriodDays: this.calculateAverage(
        amountLightPeriodDays,
        numberOfCycles
      ),
      amountNormalPeriodDays: this.calculateAverage(
        amountNormalPeriodDays,
        numberOfCycles
      ),
      amountPMSDays: Math.ceil(pmsDays.length / numberOfCycles),
      durationPeriodBreakInDays: this.calculateAverage(
        durationPeriodBreakInDays,
        numberOfCycles
      ),
      durationPeriodInDays: this.calculateAverage(
        durationPeriodInDays,
        numberOfCycles
      ),
      feltOvulationSide,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private calculateAverage(amount: number, divideBy: number): number {
    return Math.round(amount / divideBy);
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
