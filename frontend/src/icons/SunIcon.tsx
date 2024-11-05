import { ReactComponent as Sun } from "../assets/sun.svg";
import { style } from "../core/ui/style";
import { ISunIconProps } from "./ISunIconProps";
import styles from "./SunIcon.module.scss";

export const SunIcon: React.FC<ISunIconProps> = (props) => {
  return <Sun className={style(styles.sunIcon, props.className)} />;
};
