import { DateTime } from "../core/services/date/DateTime";
import { error } from "../core/utils/error";
import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";
import { ICycleInfo } from "../types/ICycleInfo";
import { CycleUtils } from "./CycleUtils";

export class CycleInfo {
  private periodItems: IPeriodItem[] = [];

  constructor(private cycles: ICycle[]) {
    cycles.forEach((cycle) => {
      cycle.periodItems?.forEach((periodItem) =>
        this.periodItems.push(periodItem)
      );
    });
  }

  private getCycleById(id: string): ICycle {
    return (
      this.cycles.find((cycle) => (cycle.id = id)) ??
      error(`Cycle with id ${id} not found`)
    );
  }

  private findCycleByDate(date: Date): ICycle | undefined {
    const cyclesBefore = this.cycles.filter((cycle) =>
      DateTime.isBefore(cycle.calculatedPeriodStartDate, date)
    );
    let lastCycle: ICycle | undefined = undefined;
    cyclesBefore.forEach((cycle) => {
      if (lastCycle === undefined) {
        lastCycle = cycle;
      } else {
        if (
          DateTime.isAfter(
            cycle.calculatedPeriodStartDate,
            lastCycle.calculatedPeriodStartDate
          )
        ) {
          lastCycle = cycle;
        }
      }
    });
    return lastCycle;
  }

  private findPeriodItemByDate(date: Date): IPeriodItem | undefined {
    return this.periodItems.find((periodItem) =>
      DateTime.equalsDate(periodItem.day, date)
    );
  }

  findCycleInfoByDate(date: Date): ICycleInfo | undefined {
    const periodItem = this.findPeriodItemByDate(date);
    let cycle: ICycle | undefined = undefined;
    if (periodItem !== undefined) {
      cycle = this.getCycleById(periodItem.cycleId);
    } else {
      cycle = this.cycles.find((cycle) => {
        const calculatedOvulationDate =
          CycleUtils.calculateOvulationDateByPeriodStartDate(
            cycle.calculatedPeriodStartDate
          );
        if (DateTime.equalsDate(cycle.calculatedPeriodStartDate, date)) {
          return true;
        } else if (DateTime.equalsDate(calculatedOvulationDate, date)) {
          return true;
        } else if (
          cycle.feltOvulationDate &&
          DateTime.equalsDate(cycle.feltOvulationDate, date)
        ) {
          return true;
        }
        return false;
      });
    }
    if (cycle !== undefined) {
      return { date, cycle, periodItem };
    }
  }
}
