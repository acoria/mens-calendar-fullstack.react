import { useMemo } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { ToggleButtonGroup } from "../../components/toggleButtonGroup/ToggleButtonGroup";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IPMSSettingsProps } from "./IPMSSettingsProps";
import styles from "./PMSSettings.module.scss";
import { CalendarDetailsSettings } from "../calendar/calendarDetails/calendarDetailsSettings/CalendarDetailsSettings";
import { ReactComponent as Sun } from "../../assets/sun.svg";

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
      <CalendarDetailsSettings
        title={t(texts.pmsSettings.title)}
        icon={<Sun className={styles.icon} />}
      >
        <ToggleButtonGroup items={selectOptions} />
      </CalendarDetailsSettings>
    </div>
  );
};
