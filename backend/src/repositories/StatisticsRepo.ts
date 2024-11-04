import { IStatistics } from "../shared/model/IStatistics";
import { CycleRepo } from "./CycleRepo";
import { PMSDayRepo } from "./PMSDayRepo";

export class StatisticsRepo {
  async findAll(): Promise<IStatistics[]> {

    const cycleRepo = new CycleRepo();
    const pmsDayRepo = new PMSDayRepo();

    const cycles = await cycleRepo.findAll()
    // const pmsDays = pmsDayRepo.findAll()

    cycles.forEach((cycle)=>{
        // cycle.
    })

    return new Promise(()=>{})
  }
}
