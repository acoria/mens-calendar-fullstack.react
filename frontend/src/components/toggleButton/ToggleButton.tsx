import { style } from "../../core/ui/style";
import { Button } from "../button/Button";
import { IToggleButtonOption } from "../toggleButtonGroup/IToggleButtonOption";
import { IToggleButtonProps } from "./IToggleButtonProps";
import styles from "./ToggleButton.module.scss";

export function ToggleButton<T extends IToggleButtonOption<any>>(
  props: IToggleButtonProps<T>
) {
  return (
    <Button
      disabled={props.disabled}
      className={style(
        styles.button,
        props.selected ? styles.selected : styles.unselected
      )}
      onClick={props.onClick}
    >
      {props.item.text}
    </Button>
  );
}
