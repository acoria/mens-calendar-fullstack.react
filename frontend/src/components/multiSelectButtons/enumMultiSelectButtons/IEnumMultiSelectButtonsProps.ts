import { Enum } from "../../../types/Enum";
import { IHaveInitialValue } from "../../../types/IHavePreselectedValue";
import { IHaveSingleSelect } from "../types/IHaveSingleSelect";

export interface IEnumMultiSelectButtonsProps<T extends Enum>
  extends IHaveSingleSelect,
    IHaveInitialValue<T[keyof T]> {
  enumType: T;
  onChange: (value: T, selected: boolean) => void;
}
