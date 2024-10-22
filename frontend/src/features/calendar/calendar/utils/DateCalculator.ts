import { DateTime } from "../../../../core/services/date/DateTime";

export class DateCalculator {
  todaysDate: Date;

  constructor() {
    this.todaysDate = new Date();
  }

  private getDateInPreviousMonth(date: Date) {
    const thisMonthsFirstDay = DateTime.getMonthStartDate(date);
    return DateTime.subtractDays(thisMonthsFirstDay, 1);
  }

  getFirstDayOfPreviousMonth(): Date {
    const dateInPreviousMonth = this.getDateInPreviousMonth(this.todaysDate);
    return DateTime.getMonthStartDate(dateInPreviousMonth);
  }

  getLastDayOfNextMonth(): Date {
    const thisMonthsLastDay = DateTime.getMonthEndDate(this.todaysDate);
    const dateInNextMonth = DateTime.addDays(thisMonthsLastDay, 1);
    return DateTime.getMonthEndDate(dateInNextMonth);
  }
}
