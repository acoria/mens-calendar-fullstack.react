import { useState } from "react";
import { StatisticsItemApi } from "../../../api/StatisticsItemApi";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../hooks/useRequest";
import { IStatisticsItem } from "../../../shared/model/IStatisticsItem";
import { StatisticsItem } from "../statisticsItem/StatisticsItem";
import { IStatisticsSectionProps } from "./IStatisticsSectionProps";
import styles from "./StatisticsSection.module.scss";

export const StatisticsSection: React.FC<IStatisticsSectionProps> = (props) => {
  const [statisticItems, setStatisticItems] = useState<IStatisticsItem[]>([]);
  const [loadStatisticsItemRequest] = useRequest();

  useInitialize(() => {
    loadStatisticsItemRequest(async () => {
      const statisticItems: IStatisticsItem[] =
        await new StatisticsItemApi().findAll();
      setStatisticItems(statisticItems);
    });
  });

  return (
    <div className={styles.statisticsSection}>
      {statisticItems.map((statisticItem) => (
        <StatisticsItem statisticsItem={statisticItem} />
      ))}
    </div>
  );
};
