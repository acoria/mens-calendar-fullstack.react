import { useMemo, useState } from "react";
import { ISelectOption } from "../../components/select/ISelectOption";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IPMSSettingsProps } from "./IPMSSettingsProps";
import { useRequest } from "../../hooks/useRequest";
import { PMSDayApi } from "../../api/PMSDayApi";
import { IPMSDay } from "../../shared/model/IPMSDay";

export const usePMSSettingsViewModel = (props: IPMSSettingsProps) => {
  const { t } = useTranslation();
  const [pmsDay, setPMSDay] = useState<IPMSDay | undefined>(props.pmsDay);
  const [updatePMSDayRequest] = useRequest();

  const toggleButtonOptions: ISelectOption<boolean>[] = useMemo(
    () => [
      {
        key: false,
        text: t(texts.general.no),
      },
      { key: true, text: t(texts.general.yes) },
    ],
    [t]
  );

  const onPMSOptionChange = (
    selectedOption: ISelectOption<boolean> | undefined
  ) => {
    updatePMSDayRequest(async () => {
      const pmsDayApi = new PMSDayApi();
      if (selectedOption === undefined || selectedOption.key === false) {
        if (pmsDay !== undefined) {
          pmsDayApi.delete(pmsDay);
        }
        setPMSDay(undefined);
      } else {
        const pmsDay = await pmsDayApi.insert({ day: props.date });
        setPMSDay(pmsDay);
      }
    });
  };

  return {
    isPMSDay: pmsDay !== undefined,
    onPMSOptionChange,
    toggleButtonOptions,
  };
};
