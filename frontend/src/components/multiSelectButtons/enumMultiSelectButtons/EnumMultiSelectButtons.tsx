import { Enum } from "../../../types/Enum";
import { MultiSelectButtons } from "../MultiSelectButtons";
import { IEnumMultiSelectButtonsProps } from "./IEnumMultiSelectButtonsProps";

export function EnumMultiSelectButtons<T extends Enum>(
  props: IEnumMultiSelectButtonsProps<T>
): JSX.Element {
  const onClick = (index: number, selected: boolean) => {
    const value = Object.values(props.enumType)[index];
    props.onChange(value, selected);
  };

  const { onChange, isSingleSelect, ...multiSelectButtonsProps } = props;

  const getPreselectedIndices = (): number[] => {
    if (props.initialValue === undefined) {
      return [];
    }
    return [
      Object.values(props.enumType).findIndex(
        (enumValue) => enumValue === props.initialValue
      ),
    ];
  };

  return (
    <MultiSelectButtons
      buttonLabels={Object.values(props.enumType).filter(
        (element) => !(parseInt(element) >= 0)
      )}
      onClick={onClick}
      isSingleSelect={isSingleSelect !== undefined ? isSingleSelect : true}
      preselectedIndices={getPreselectedIndices()}
      {...multiSelectButtonsProps}
    />
  );
}
