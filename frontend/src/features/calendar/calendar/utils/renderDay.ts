import { IDay } from "../IDay";

export const renderDay = (day: IDay): string => {
  return `${day.dayOfMonth.toString()}${day.month ? `.${day.month}` : ``}`;
};
