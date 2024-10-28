import { ReactElement } from "react";
import { IHaveClassName } from "../../../types/IHaveClassName";

export interface ICalendarItemProps extends IHaveClassName {
  dayOfMonth: string;
  description: string;
  footerIcons?: ReactElement | ReactElement[];
  headerIcon?: ReactElement;
  markerColor?: string;
  onClick?: () => void;
}
