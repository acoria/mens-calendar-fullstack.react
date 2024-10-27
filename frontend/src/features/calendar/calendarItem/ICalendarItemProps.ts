import { ReactElement } from "react";
import { IHaveClassName } from "../../../types/IHaveClassName";

export interface ICalendarItemProps extends IHaveClassName {
  dayOfMonth: string;
  description: string;
  markerColor?: string;
  icons?: ReactElement | ReactElement[];
  onClick?: () => void;
}
