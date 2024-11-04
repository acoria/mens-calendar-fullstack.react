import { useEffect, useState } from "react";
import { ITabstripProps } from "./ITabstripProps";
import styles from "./Tabstrip.module.scss";
import { TabstripItem } from "./tabstripItem/TabstripItem";
import { style } from "../../core/ui/style";

export const Tabstrip: React.FC<ITabstripProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    props.selectedTabIndex
  );

  useEffect(() => {
    setSelectedIndex(props.selectedTabIndex);
  }, [props.selectedTabIndex]);

  const tabstrips = props.captions.map((title, index) => (
    <TabstripItem
      key={`${title}_${index}`}
      caption={title}
      onClick={() => {
        setSelectedIndex(index);
        props.onTabSelect?.(index);
      }}
      selected={selectedIndex === index}
      darkMode={props.darkMode}
    />
  ));

  return (
    <div className={style(styles.tabstrip, props.className)}>{tabstrips}</div>
  );
};
