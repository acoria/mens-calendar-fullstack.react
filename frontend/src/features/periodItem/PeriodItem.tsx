import { IPeriodItemProps } from "./IPeriodItemProps";
import styles from "./PeriodItem.module.scss";
import { usePeriodItemViewModel } from "./usePeriodItemViewModel";

export const PeriodItem: React.FC<IPeriodItemProps> = (props) => {
  const viewModel = usePeriodItemViewModel(props);
  return (
    <div className={styles.periodItem}>
      <h1>{viewModel.time}</h1>
    </div>
  );
};
