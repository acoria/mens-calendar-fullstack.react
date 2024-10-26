import { ICycleData } from "../../types/ICycleData";
import { IHaveClassName } from "../../types/IHaveClassName";
import { ICycleInfo } from "../../utils/ICycleInfo";

export interface IPeriodItemProps extends IHaveClassName {
  date: Date;
  cycleInfo: ICycleInfo;
  cycleData?: ICycleData;
}
