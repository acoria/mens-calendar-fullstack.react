import { DateTime } from "../../../../core/services/date/DateTime";
import { ICalendarSpan } from "../../types/ICalendarSpan";

/**
 * Navigates through the calendar spans using 3 months cycles
 */
export class DateNavigator {
  private _firstDayOfMiddleMonth: Date | undefined;

  private get firstDayOfMiddleMonth(): Date {
    if (!this._firstDayOfMiddleMonth) {
      this._firstDayOfMiddleMonth = DateTime.getMonthStartDate(new Date());
    }
    return this._firstDayOfMiddleMonth;
  }

  private set firstDayOfMiddleMonth(value: Date) {
    this._firstDayOfMiddleMonth = DateTime.getMonthStartDate(value);
  }

  private addTimeDifference(date: Date): Date {
    //add 12 hours for time difference reasons to always show the correct days
    return DateTime.addHours(date, 12);
  }

  private getDateInPreviousMonth() {
    const thisMonthsFirstDay = DateTime.getMonthStartDate(
      this.firstDayOfMiddleMonth
    );
    return DateTime.subtractDays(thisMonthsFirstDay, 1);
  }

  private getFirstMondayOfPreviousMonth(): Date {
    const dateInPreviousMonth = this.getDateInPreviousMonth();
    const firstOfMonth = DateTime.getMonthStartDate(dateInPreviousMonth);
    return this.addTimeDifference(DateTime.getWeekStartDate(firstOfMonth));
  }

  private getLastDayOfNextMonth(): Date {
    const monthEndDate = DateTime.getMonthEndDate(this.firstDayOfMiddleMonth);
    const dateInNextMonth = DateTime.addDays(monthEndDate, 1);
    return this.addTimeDifference(DateTime.getMonthEndDate(dateInNextMonth));
  }

  private getCalendarSpan(): ICalendarSpan {
    return {
      startDate: this.getFirstMondayOfPreviousMonth(),
      endDate: this.getLastDayOfNextMonth(),
    };
  }

  getNextCalendarSpan(): ICalendarSpan {
    if (this._firstDayOfMiddleMonth) {
      this.firstDayOfMiddleMonth = DateTime.addDays(
        this.firstDayOfMiddleMonth,
        100
      );
    }
    return this.getCalendarSpan();
  }

  getPreviousCalendarSpan(): ICalendarSpan {
    this.firstDayOfMiddleMonth = DateTime.subtractDays(
      this.firstDayOfMiddleMonth,
      100
    );
    return this.getCalendarSpan();
  }
}
