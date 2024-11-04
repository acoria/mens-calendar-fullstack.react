import { style } from "../../../core/ui/style";
import { ITabstripItemProps } from "./ITabstripItemProps";
import styles from "./TabstripItem.module.scss";

export const TabstripItem: React.FC<ITabstripItemProps> = (props) => {
  const selectedStyle = props.darkMode
    ? styles.selectedDarkMode
    : styles.selected;
  return (
    <button onClick={props.onClick} className={styles.tabstripItem}>
      <div
        className={style(
          props.darkMode ? styles.captionDarkMode : styles.caption,
          props.selected ? selectedStyle : "",
          props.selected ? props.classNameSelected : ""
        )}
      >
        {props.caption}
      </div>
    </button>
  );
};
