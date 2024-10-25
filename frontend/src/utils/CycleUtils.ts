import { DateTime } from "../core/services/date/DateTime";

class CycleUtilsDefault {
  calculateOvulationDateByPeriodStartDate(date: Date): Date {
    return DateTime.subtractDays(date, 14);
  }
}
export const CycleUtils = new CycleUtilsDefault();
