import { useMemo } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { ToggleButtonGroup } from "../../components/toggleButtonGroup/ToggleButtonGroup";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IPMSSettingsProps } from "./IPMSSettingsProps";
import styles from "./PMSSettings.module.scss";

export const PMSSettings: React.FC<IPMSSettingsProps> = (props) => {
  const { t } = useTranslation();

  const selectOptions: ISelectOption<boolean>[] = useMemo(
    () => [
      {
        key: false,
        text: t(texts.general.no),
      },
      { key: true, text: t(texts.general.yes) },
    ],
    [t]
  );

  return (
    <div className={styles.pmsSettings}>
      <ToggleButtonGroup items={selectOptions} />
    </div>
  );
};
