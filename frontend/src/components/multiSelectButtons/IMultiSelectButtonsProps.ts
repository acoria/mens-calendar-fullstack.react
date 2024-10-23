import { IHavePreselectedIndices } from "./types/IHavePreselectedIndices";
import { IHaveSingleSelect } from "./types/IHaveSingleSelect";

export interface IMultiSelectButtonsProps
  extends IHaveSingleSelect,
    IHavePreselectedIndices {
  buttonLabels: string[];
  onClick?: (index: number, selected: boolean) => void;
}
