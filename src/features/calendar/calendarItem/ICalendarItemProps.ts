import { ReactElement } from "react";
import { IHaveClassName } from "../../../types/IHaveClassName";

export interface ICalendarItemProps extends IHaveClassName {
  description: string;
  icons?: ReactElement | ReactElement[];
  onClick?: () => void;
}
