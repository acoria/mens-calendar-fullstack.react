import { AmountButton } from "../../components/amountButton/AmountButton";
import { EnumMultiSelectButtons } from "../../components/multiSelectButtons/enumMultiSelectButtons/EnumMultiSelectButtons";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { OvulationSide } from "../../shared/types/OvulationSide";
import { IPeriodItemProps } from "./IPeriodItemProps";
import styles from "./PeriodItem.module.scss";
import { usePeriodItemViewModel } from "./usePeriodItemViewModel";

export const PeriodItem: React.FC<IPeriodItemProps> = (props) => {
  const viewModel = usePeriodItemViewModel(props);
  const { t } = useTranslation();
  return (
    <div className={styles.periodItem}>
      <h3>{viewModel.date}</h3>
      <div className={styles.settings}>
        <h4 className={styles.settingsTitle}>
          {t(texts.periodItem.ovulationSide)}
        </h4>
        <div className={styles.settingsContent}>
          <EnumMultiSelectButtons
            enumType={OvulationSide}
            onChange={viewModel.onOvulationSideChange}
            // initialValue={OvulationSide.LEFT}
          />
        </div>
      </div>
      <div className={styles.settings}>
        <h4 className={styles.settingsTitle}>
          {t(texts.periodItem.tamponAmount)}
        </h4>
        <div className={styles.settingsContent}>
          <div className={styles.lightDay}>
            <input
              checked={viewModel.isLightDay}
              id="lightDay"
              type="checkbox"
              onChange={viewModel.onLightDayChange}
            />
            <label htmlFor="lightDay" className={styles.label}>
              {t(texts.periodItem.lightDay)}
            </label>
          </div>
          <AmountButton
            initialValue={props.periodItem?.amountTamponsMini}
            label={t(texts.periodItem.mini)}
            onAmountChange={viewModel.onMiniTamponAmountChange}
          />
          <AmountButton
            initialValue={props.periodItem?.amountTamponsNormal}
            label={t(texts.periodItem.normal)}
            onAmountChange={viewModel.onNormalTamponAmountChange}
          />
          <AmountButton
            initialValue={props.periodItem?.amountTamponsSuper}
            label={t(texts.periodItem.super)}
            onAmountChange={viewModel.onSuperTamponAmountChange}
          />
        </div>
      </div>
    </div>
  );
};
