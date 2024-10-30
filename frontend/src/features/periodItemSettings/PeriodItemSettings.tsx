import { AmountButton } from "../../components/amountButton/AmountButton";
import { Switch } from "../../components/switch/Switch";
import { ToggleButtonGroup } from "../../components/toggleButtonGroup/ToggleButtonGroup";
import { style } from "../../core/ui/style";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IPeriodItemSettingsProps } from "./IPeriodItemSettingsProps";
import styles from "./PeriodItemSettings.module.scss";
import { usePeriodItemViewModel } from "./usePeriodItemViewModel";
import colors from "../../styles/colors.module.scss";
import { ReactComponent as Drop } from "../../assets/drop.svg";
import { ReactComponent as Crack } from "../../assets/crack.svg";
import { CalendarDetailsSettings } from "../calendar/calendarDetails/calendarDetailsSettings/CalendarDetailsSettings";

export const PeriodItemSettings: React.FC<IPeriodItemSettingsProps> = (
  props
) => {
  const viewModel = usePeriodItemViewModel(props);
  const { t } = useTranslation();
  return (
    <div className={style(styles.periodItemSettings, props.className)}>
      <CalendarDetailsSettings
        icon={<Crack className={styles.ovulationIcon} />}
        title={t(texts.periodItem.ovulationSide)}
      >
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
      </CalendarDetailsSettings>
      <CalendarDetailsSettings
        icon={<Drop className={styles.dropIcon} />}
        title={t(texts.periodItem.tamponAmount)}
      >
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
      </CalendarDetailsSettings>
    </div>
  );
};
