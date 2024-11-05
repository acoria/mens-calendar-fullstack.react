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
    <div className={styles.drop}>
      <Drop className={className} />
      <span>{`${days}d`}</span>
    </div>
  );

  return (
    <div className={styles.statisticsItem}>
      <div className={styles.header}>
        <div className={styles.date}>
          <h3 className={styles.month}>{viewModel.month}</h3>
          <span className={styles.days}>{viewModel.days}</span>
        </div>
        <div className={styles.periodBreak}>
          <Space />
          <span>{`${props.durationPeriodBreakInDays}d`}</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.periodStrength}>
          {drop(props.amountLightPeriodDays, styles.dropImageEmpty)}
          {drop(props.amountNormalPeriodDays, styles.dropImageFilled)}
        </div>
        <div className={styles.tampons}>
          <span>{props.amountTamponsMini}</span>
          <span>{t(texts.statisticsItem.tamponSize.mini)}</span>
          <span>{props.amountTamponsNormal}</span>
          <span>{t(texts.statisticsItem.tamponSize.normal)}</span>
          <span>{props.amountTamponsSuper}</span>
          <span>{t(texts.statisticsItem.tamponSize.super)}</span>
        </div>
        <div className={styles.ovulation}>
          <Crack className={styles.crackIcon} />
          <span>{viewModel.ovulationSide}</span>
        </div>
        <div className={styles.pms}>
          <SunIcon className={styles.sunIcon} />
          <span>{`${props.amountPMSDays}d`}</span>
        </div>
      </div>
    </div>
  );
};
