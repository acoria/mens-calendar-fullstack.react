import { Enum } from "../../../types/Enum";
import { IHaveChange } from "../../../types/IHaveChange";
import { IHaveInitialValue } from "../../../types/IHavePreselectedValue";
import { IHaveSingleSelect } from "../types/IHaveSingleSelect";

export interface IEnumMultiSelectButtonsProps<T extends Enum>
  extends IHaveChange<T[keyof T]>,
    IHaveSingleSelect,
    IHaveInitialValue<T[keyof T]> {
  enumType: T;
}
