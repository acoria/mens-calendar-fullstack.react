import { ICycle } from "../../shared/model/ICycle";
import { IHaveClassName } from "../../types/IHaveClassName";

export interface IPeriodItemProps extends IHaveClassName {
  date: Date;
  cycles: ICycle[]
}
