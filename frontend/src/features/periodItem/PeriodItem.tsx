import { AmountButton } from "../../components/amountButton/AmountButton";
import { Switch } from "../../components/switch/Switch";
import { ToggleButtonGroup } from "../../components/toggleButtonGroup/ToggleButtonGroup";
import { style } from "../../core/ui/style";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IPeriodItemProps } from "./IPeriodItemProps";
import styles from "./PeriodItem.module.scss";
import { usePeriodItemViewModel } from "./usePeriodItemViewModel";
import colors from "../../styles/colors.module.scss";
import { ReactComponent as Drop } from "../../assets/drop.svg";
import { ReactComponent as Crack } from "../../assets/crack.svg";

export const PeriodItem: React.FC<IPeriodItemProps> = (props) => {
  const viewModel = usePeriodItemViewModel(props);
  const { t } = useTranslation();
  return (
    <div className={style(styles.periodItem, props.className)}>
      <div className={styles.settings}>
        <div className={styles.settingsTitleSection}>
          <Crack className={styles.icon} />
          <h4 className={styles.settingsTitle}>
            {t(texts.periodItem.ovulationSide)}
          </h4>
        </div>
        <div className={styles.settingsContent}>
          <ToggleButtonGroup
            items={viewModel.ovulationSelectOptions}
            onChange={viewModel.onOvulationSideChange}
            enableUnselectAll
            selected={
              viewModel.ovulationSide !== undefined
                ? viewModel.ovulationSelectOptions[viewModel.ovulationSide]
                : undefined
            }
          />
        </div>
      </div>
      <div className={styles.settings}>
        {" "}
        <div className={styles.settingsTitleSection}>
          <Drop className={styles.icon} />
          <h4 className={styles.settingsTitle}>
            {t(texts.periodItem.tamponAmount)}
          </h4>
        </div>
        <div className={styles.settingsContent}>
          <div className={styles.lightDay}>
            <Switch
              id="lightDay"
              checked={viewModel.isLightDay}
              colorOnState={colors.colorSwitchOn}
              colorOffState={colors.colorSwitchOff}
              width="2.9rem"
              onChange={viewModel.onLightDayChange}
            />
            <label htmlFor="lightDay" className={styles.lightDayLabel}>
              {t(texts.periodItem.lightDay)}
            </label>
          </div>
          <AmountButton
            initialValue={props.cycleData?.periodItem?.amountTamponsMini}
            label={t(texts.periodItem.mini)}
            onAmountChange={viewModel.onMiniTamponAmountChange}
          />
          <AmountButton
            initialValue={props.cycleData?.periodItem?.amountTamponsNormal}
            label={t(texts.periodItem.normal)}
            onAmountChange={viewModel.onNormalTamponAmountChange}
          />
          <AmountButton
            initialValue={props.cycleData?.periodItem?.amountTamponsSuper}
            label={t(texts.periodItem.super)}
            onAmountChange={viewModel.onSuperTamponAmountChange}
          />
        </div>
      </div>
    </div>
  );
};
