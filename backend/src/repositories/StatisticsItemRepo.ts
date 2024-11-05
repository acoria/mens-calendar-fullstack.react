import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { IEntityRepository } from "../core/api/types/IEntityRepository";
import { IEntitySubset } from "../core/api/types/IEntitySubset";
import { DateTime } from "../core/services/date/DateTime";
import { IStatisticsItem } from "../shared/model/IStatisticsItem";
import { OvulationSide } from "../shared/types/OvulationSide";
import { uuid } from "../utils/uuid";
import { CycleRepo } from "./CycleRepo";
import { PMSDayRepo } from "./PMSDayRepo";

export class StatisticsItemRepo {
  findAll(): Promise<IStatisticsItem[]> {
    console.log("find all called");
    //   const cycleRepo = new CycleRepo();
    //   const pmsDayRepo = new PMSDayRepo();

    //   const cycles = await cycleRepo.findAll()
    //   // const pmsDays = pmsDayRepo.findAll()

    //   cycles.forEach((cycle)=>{
    //       // cycle.
    //   })

    return new Promise((resolve, reject) => {
      const statisticsItems = [
        {
          endDate: DateTime.addDays(new Date(), 7),
          startDate: new Date(),
          amountTamponsMini: 1,
          amountTamponsNormal: 2,
          amountTamponsSuper: 0,
          amountLightPeriodDays: 4,
          amountNormalPeriodDays: 5,
          amountPMSDays: 3,
          durationPeriodBreakInDays: 29,
          feltOvulationSide: OvulationSide.LEFT,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: uuid(),
        },
        {
          startDate: DateTime.subtractDays(new Date(), 20),
          endDate: new Date(),
          amountTamponsMini: 1,
          amountTamponsNormal: 2,
          amountTamponsSuper: 0,
          amountLightPeriodDays: 4,
          amountNormalPeriodDays: 5,
          amountPMSDays: 3,
          durationPeriodBreakInDays: 29,
          feltOvulationSide: OvulationSide.LEFT,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: uuid(),
        },
      ];
      resolve(statisticsItems);
    });
  }
}
