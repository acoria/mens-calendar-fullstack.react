import { DateTime } from "../../../core/services/date/DateTime";
import { StatisticsItem } from "../statisticsItem/StatisticsItem";
import { IStatisticsSectionProps } from "./IStatisticsSectionProps";
import styles from "./StatisticsSection.module.scss";

export const StatisticsSection: React.FC<IStatisticsSectionProps> = (props) => {
  return (
    <div className={styles.statisticsSection}>
      <StatisticsItem
        endDate={DateTime.addDays(new Date(), 7)}
        startDate={new Date()}
        amountTamponsMini={1}
        amountTamponsNormal={2}
        amountTamponsSuper={0}
        amountLightPeriodDays={4}
        amountNormalPeriodDays={5}
        amountPMSDays={3}
        durationPeriodBreakInDays={29}
      />
    </div>
  );
};
