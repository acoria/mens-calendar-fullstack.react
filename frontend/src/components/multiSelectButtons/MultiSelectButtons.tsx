import { useState } from "react";
import { IMultiSelectButtonsProps } from "./IMultiSelectButtonsProps";
import styles from "./MultiSelectButtons.module.scss";
import { style } from "../../core/ui/style";

export const MultiSelectButtons: React.FC<IMultiSelectButtonsProps> = (
  props
) => {
  const [selectedButtonIndices, setSelectedButtonIndices] = useState<number[]>(
    props.preselectedIndices ?? []
  );

  const isSelectedButton = (index: number): boolean =>
    selectedButtonIndices.find((buttonIndex) => buttonIndex === index) !==
    undefined;

  const onButtonClick = (index: number) => {
    let selected = true;
    const buttonIndexOfSelectedButton = selectedButtonIndices.findIndex(
      (selectedButtonIndex) => selectedButtonIndex === index
    );
    if (props.isSingleSelect) {
      if (buttonIndexOfSelectedButton !== -1) {
        setSelectedButtonIndices([]);
        selected = false;
      } else {
        setSelectedButtonIndices([index]);
      }
    } else {
      if (buttonIndexOfSelectedButton !== -1) {
        selectedButtonIndices.splice(buttonIndexOfSelectedButton, 1);
      } else {
        selectedButtonIndices.push(index);
      }
      setSelectedButtonIndices([...selectedButtonIndices]);
    }
    props.onClick?.(index, selected);
  };

  const buttons = props.buttonLabels.map((buttonLabel, index) => {
    const isButtonSelected = isSelectedButton(index);
    return (
      <div
        key={`${buttonLabel}_${index}`}
        className={style(
          styles.button,
          isButtonSelected ? styles.selectedButton : ""
        )}
        onClick={() => onButtonClick(index)}
      >
        {buttonLabel}
      </div>
    );
  });

  return <div className={styles.multiSelectButton}>{buttons}</div>;
};
