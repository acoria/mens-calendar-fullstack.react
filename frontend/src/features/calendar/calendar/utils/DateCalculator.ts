import { DateTime } from "../../../../core/services/date/DateTime";

export class DateCalculator {
  todaysDate: Date;

  constructor() {
    this.todaysDate = new Date();
  }

  private addTimeDifference(date: Date): Date {
    //add 12 hours for time difference reasons to always show the correct days
    return DateTime.addHours(date, 12);
  }

  private getDateInPreviousMonth(date: Date) {
    const thisMonthsFirstDay = DateTime.getMonthStartDate(date);
    return DateTime.subtractDays(thisMonthsFirstDay, 1);
  }

  // getFirstDayOfPreviousMonth(): Date {
  //   const dateInPreviousMonth = this.getDateInPreviousMonth(this.todaysDate);
  //   return this.addTimeDifference(
  //     DateTime.getMonthStartDate(dateInPreviousMonth)
  //   );
  // }

  getFirstMondayOfPreviousMonth(): Date {
    const dateInPreviousMonth = this.getDateInPreviousMonth(this.todaysDate);
    const firstOfMonth = DateTime.getMonthStartDate(dateInPreviousMonth);
    return this.addTimeDifference(DateTime.getWeekStartDate(firstOfMonth));
  }

  getLastDayOfNextMonth(): Date {
    const thisMonthsLastDay = DateTime.getMonthEndDate(this.todaysDate);
    const dateInNextMonth = DateTime.addDays(thisMonthsLastDay, 1);
    return this.addTimeDifference(DateTime.getMonthEndDate(dateInNextMonth));
  }
}
