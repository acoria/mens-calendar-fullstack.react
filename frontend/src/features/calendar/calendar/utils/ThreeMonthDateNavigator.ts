import { DateTime } from "../../../../core/services/date/DateTime";
import { ICalendarSpan } from "../../types/ICalendarSpan";

/**
 * Navigates through the calendar spans using 3 months cycles
 */
export class ThreeMonthDateNavigator {
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

  private getDateInNextMonth() {
    const monthEndDate = DateTime.getMonthEndDate(this.firstDayOfMiddleMonth);
    return DateTime.addDays(monthEndDate, 1);
  }

  private getPreviousMonthStartingWithMonday(): Date {
    const dateInPreviousMonth = this.getDateInPreviousMonth();
    const firstOfMonth = DateTime.getMonthStartDate(dateInPreviousMonth);
    return this.addTimeDifference(DateTime.getWeekStartDate(firstOfMonth));
  }

  private getNextMonthEndingWithSunday(): Date {
    const dateInNextMonth = this.getDateInNextMonth();
    const lastOfMonth = DateTime.getMonthEndDate(dateInNextMonth);
    return DateTime.getWeekEndDate(lastOfMonth);
  }

  private getCalendarSpan(): ICalendarSpan {
    const calendarSpan = {
      startDate: this.getPreviousMonthStartingWithMonday(),
      endDate: this.getNextMonthEndingWithSunday(),
    };
    return calendarSpan;
  }

  getFirstFullMonth(): number | undefined {
    if (!this._firstDayOfMiddleMonth) return;
    const month = DateTime.toMonth(this._firstDayOfMiddleMonth);
    if (month === 1) {
      return 12;
    } else {
      return month - 1;
    }
  }
  getLastFullMonth(): number | undefined {
    if (!this._firstDayOfMiddleMonth) return;
    const month = DateTime.toMonth(this._firstDayOfMiddleMonth);
    if (month === 12) {
      return 1;
    } else {
      return month + 1;
    }
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
