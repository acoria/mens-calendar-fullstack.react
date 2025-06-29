import { useState } from "react";
import { StatisticsItemApi } from "../../../api/StatisticsItemApi";
import { useInitialize } from "../../../hooks/useInitialize";
import { useRequest } from "../../../hooks/useRequest";
import { IStatisticsItem } from "../../../shared/model/IStatisticsItem";
import { StatisticsItem } from "../statisticsItem/StatisticsItem";
import { IStatisticsSectionProps } from "./IStatisticsSectionProps";
import styles from "./StatisticsSection.module.scss";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { texts } from "../../../lib/translation/texts";

export const StatisticsSection: React.FC<IStatisticsSectionProps> = (props) => {
  const [statisticItems, setStatisticItems] = useState<IStatisticsItem[]>([]);
  const [averageStatisticsItem, setAverageStatisticItem] = useState<
    IStatisticsItem | undefined
  >(undefined);
  const [loadStatisticsItemRequest] = useRequest();
  const [loadAverageStatisticRequest] = useRequest();
  const { t } = useTranslation();

  useInitialize(() => {
    loadStatisticsItemRequest(async () => {
      const statisticItems: IStatisticsItem[] =
        await new StatisticsItemApi().findAll();
      setStatisticItems(statisticItems);
    });
    loadAverageStatisticRequest(async () => {
      const averageStatisticItem =
        await new StatisticsItemApi().getAverageStatisticItem();
      setAverageStatisticItem(averageStatisticItem);
    });
  });

  return (
    <div className={styles.statisticsSection}>
      {averageStatisticsItem && (
        <div className={styles.average}>
          <h4>{t(texts.general.average)}</h4>
          <StatisticsItem statisticsItem={averageStatisticsItem} />
        </div>
      )}
      {statisticItems.map((statisticItem) => (
        <StatisticsItem key={statisticItem.id} statisticsItem={statisticItem} />
      ))}
    </div>
  );
};
