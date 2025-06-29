import { ReactComponent as Crack } from "../../../assets/crack.svg";
import { ReactComponent as Drop } from "../../../assets/drop.svg";
import { ReactComponent as Space } from "../../../assets/space.svg";
import { SunIcon } from "../../../icons/SunIcon";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { IStatisticsItemProps } from "./IStatisticsItemProps";
import styles from "./StatisticsItem.module.scss";
import { useStatisticsItemViewModel } from "./useStatisticsItemViewModel";

export const StatisticsItem: React.FC<IStatisticsItemProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = useStatisticsItemViewModel(props);

  const drop = (days: number, className: string) => (
    <>
      <Drop className={className} />
      <span>{`${days}d`}</span>
    </>
  );

  const header = (
    <div className={styles.header}>
      <h3 className={styles.month}>{viewModel.month}</h3>
      <span>{`${viewModel.days} [${viewModel.periodLength}d]`}</span>
      <div className={styles.periodBreak}>
        <Space />
        <span>{`${props.statisticsItem.durationPeriodInDays ?? "?"}d [${
          props.statisticsItem.durationPeriodBreakInDays ?? "?"
        }d]`}</span>
      </div>
    </div>
  );

  const tamponUsage = (
    <div className={styles.tampons}>
      <span>{props.statisticsItem.amountTamponsMini}</span>
      <span>{t(texts.statisticsItem.tamponSize.mini)}</span>
      <span>{props.statisticsItem.amountTamponsNormal}</span>
      <span>{t(texts.statisticsItem.tamponSize.normal)}</span>
      <span>{props.statisticsItem.amountTamponsSuper}</span>
      <span>{t(texts.statisticsItem.tamponSize.super)}</span>
    </div>
  );

  const dayDetails = (
    <>
      {drop(props.statisticsItem.amountLightPeriodDays, styles.dropImageEmpty)}
      {drop(
        props.statisticsItem.amountNormalPeriodDays,
        styles.dropImageFilled
      )}
      <Crack className={styles.crackIcon} />
      <span>{viewModel.ovulationSide}</span>
      <SunIcon className={styles.sunIcon} />
      <span>{`${props.statisticsItem.amountPMSDays}d`}</span>
    </>
  );

  return (
    <div className={styles.statisticsItem}>
      {header}
      <div className={styles.content}>
        {tamponUsage}
        {dayDetails}
      </div>
    </div>
  );
};
