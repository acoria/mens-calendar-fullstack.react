import { DateTime } from "../core/services/date/DateTime";
import { error } from "../core/utils/error";
import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";
import { ICycleData } from "../types/ICycleData";
import { CycleUtils } from "./CycleUtils";
import { ICycleInfo } from "./ICycleInfo";

export class CycleInfo implements ICycleInfo {
  private periodItems: IPeriodItem[] = [];

  constructor(private readonly cycles: ICycle[]) {
    cycles.forEach((cycle) => {
      cycle.periodItems?.forEach((periodItem) =>
        this.periodItems.push(periodItem)
      );
    });
  }

  //check if a cycle or a period item with this date exists
  private findCycleByDate(date: Date): ICycle | undefined {
    if (this.cycles.length === 0) {
      return;
    }
    let cycle: ICycle | undefined;
    const periodItem = this.periodItems.find((periodItem) => {
      return DateTime.equalsDate(periodItem.day, date);
    });
    if (periodItem !== undefined) {
      cycle = this.getCycleById(periodItem.cycleId);
    }
    if (cycle === undefined) {
      cycle = this.findCycleByCalculatedPeriodStartDate(date);
    }
    return cycle;
  }

  private findCycleByCalculatedPeriodStartDate(
    calculatedPeriodStartDate: Date
  ) {
    return this.cycles.find((cycle) =>
      DateTime.equalsDate(
        cycle.calculatedPeriodStartDate,
        calculatedPeriodStartDate
      )
    );
  }

  private getCycleById(id: string): ICycle {
    return (
      this.cycles.find((cycle) => cycle.id === id) ??
      error(`Cycle with id ${id} not found`)
    );
  }
  private findPeriodItemByDate(date: Date): IPeriodItem | undefined {
    return this.periodItems.find((periodItem) =>
      DateTime.equalsDate(periodItem.day, date)
    );
  }

  findCycleDataByDate(date: Date): ICycleData | undefined {
    // if (DateTime.equalsDate(date, new Date(2024, 9, 31))) {
    //   debugger;
    // }
    if (this.cycles.length === 0) {
      return;
    }
    const periodItem = this.findPeriodItemByDate(date);
    let cycle: ICycle | undefined = undefined;
    if (periodItem !== undefined) {
      cycle = this.getCycleById(periodItem.cycleId);
    } else {
      cycle = this.cycles.find((cycle) => {
        if (DateTime.equalsDate(cycle.calculatedPeriodStartDate, date)) {
          return true;
        } else if (DateTime.equalsDate(cycle.calculatedOvulationDate, date)) {
          return true;
        } else if (
          cycle.feltOvulationDate &&
          DateTime.equalsDate(cycle.feltOvulationDate, date)
        ) {
          return true;
        } else if (DateTime.equalsDate(date, cycle.calculatedPeriodStartDate)) {
          return true;
        }
        return false;
      });
    }
    if (cycle !== undefined) {
      return { date, cycle, periodItem };
    }
  }

  /**
   * Finds the cycle with the latest calculated period start day 20 days after the potential ovulation date
   */
  findPotentialCycleForOvulationDate(date: Date): ICycle | undefined {
    let day = 1;
    let foundCycle: ICycle | undefined = undefined;
    do {
      const laterDate = DateTime.addDays(date, day);
      foundCycle = this.findCycleByCalculatedPeriodStartDate(laterDate);
      day++;
    } while (foundCycle === undefined && day < 21);

    return foundCycle;
  }

  /**
   * Finds the cycle that is within 20 days before or 10 days after the provided date.
   */
  findPotentialCycleForPeriodByDate(date: Date): ICycle | undefined {
    let foundCycle = undefined;
    let day = 1;
    do {
      const earlierDate = DateTime.subtractDays(date, day);
      foundCycle = this.findCycleByDate(earlierDate);
      day++;
    } while (foundCycle === undefined && day < 21);
    if (foundCycle === undefined) {
      day = 1;
      do {
        const laterDate = DateTime.addDays(date, day);
        foundCycle = this.findCycleByDate(laterDate);
        day++;
      } while (foundCycle === undefined && day < 11);
    }
    return foundCycle;
  }
  /**
   * Finds a cycle that is somewhere between 20 and 40 days before the provided cycle period start date
   */
  findPreviousCycle(cycle: ICycle): ICycle | undefined {
    let foundCycle = undefined;
    let day = 20;
    do {
      const earlierDate = DateTime.subtractDays(
        cycle.calculatedPeriodStartDate,
        day
      );
      foundCycle = this.findCycleByDate(earlierDate);
      day++;
    } while (foundCycle === undefined && day < 41);
    return foundCycle;
  }
}
