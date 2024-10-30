import { ICycle } from "../shared/model/ICycle";
import { ICycleData } from "../types/ICycleData";

export interface ICycleInfo {
  findCycleDataByDate(date: Date): ICycleData | undefined;
  findPotentialCycleForOvulationDate(date: Date): ICycle | undefined;
  findPotentialCycleForPeriodByDate(date: Date): ICycle | undefined;
  findPreviousCycle(cycle: ICycle): ICycle | undefined;
}
