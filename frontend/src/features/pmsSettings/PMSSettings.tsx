import { ToggleButtonGroup } from "../../components/toggleButtonGroup/ToggleButtonGroup";
import { SunIcon } from "../../icons/SunIcon";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { CalendarDetailsSettings } from "../calendar/calendarDetails/calendarDetailsSettings/CalendarDetailsSettings";
import { IPMSSettingsProps } from "./IPMSSettingsProps";
import styles from "./PMSSettings.module.scss";
import { usePMSSettingsViewModel } from "./usePMSSettingsViewModel";

export const PMSSettings: React.FC<IPMSSettingsProps> = (props) => {
  const { t } = useTranslation();
  const viewModel = usePMSSettingsViewModel(props);

  return (
    <CalendarDetailsSettings
      title={t(texts.pmsSettings.title)}
      icon={<SunIcon className={styles.icon} />}
    >
      <ToggleButtonGroup
        items={viewModel.toggleButtonOptions}
        onChange={viewModel.onPMSOptionChange}
        selected={
          viewModel.isPMSDay
            ? viewModel.toggleButtonOptions[1]
            : viewModel.toggleButtonOptions[0]
        }
      />
    </CalendarDetailsSettings>
  );
};
