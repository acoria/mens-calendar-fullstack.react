import { ICycleInfo } from "../../types/ICycleInfo";
import { IHaveClassName } from "../../types/IHaveClassName";

export interface IPeriodItemProps extends IHaveClassName {
  date: Date;
  cycleInfo?: ICycleInfo;
}
