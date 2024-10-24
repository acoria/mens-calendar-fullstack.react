import { useMemo, useState } from "react";
import { PeriodApi } from "../../api/PeriodApi";
import { PeriodItemApi } from "../../api/PeriodItemApi";
import { ISelectOption } from "../../components/select/ISelectOption";
import { useRequest } from "../../hooks/useRequest";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { IPeriod } from "../../shared/model/IPeriod";
import { IPeriodItem } from "../../shared/model/IPeriodItem";
import { OvulationSide } from "../../shared/types/OvulationSide";
import { uuid } from "../../utils/uuid";
import { IPeriodItemProps } from "./IPeriodItemProps";

export const usePeriodItemViewModel = (props: IPeriodItemProps) => {
  const { t } = useTranslation();
  
  const [period, setPeriod] = useState<IPeriod>(props.period);
  const [periodItem, setPeriodItem] = useState<IPeriodItem>(
    props.periodItem ?? {
      id: "new",
      amountTamponsMini: 0,
      amountTamponsNormal: 0,
      amountTamponsSuper: 0,
      day: props.date,
      isLightDay: false,
      periodId: props.period.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
  const [updatePeriodItemRequest] = useRequest();
  const [updatePeriodRequest] = useRequest();

  
  const sendUpdatePeriodItemRequest = (periodItem: IPeriodItem) => {
    updatePeriodItemRequest(async () => {
      new PeriodItemApi().update(periodItem);
    });
  };

  const toggleIsLightDay = () => {
    setPeriodItem((previous) => {
      const newPeriodItem: IPeriodItem = {
        ...previous,
        isLightDay: !previous.isLightDay,
      };
      if (newPeriodItem.id === "new") {
        newPeriodItem.id = uuid();
        updatePeriodItemRequest(async () => {
          new PeriodItemApi().insert(newPeriodItem);
        });
      } else {
        updatePeriodItemRequest(async () => {
          new PeriodItemApi().update(newPeriodItem);
        });
      }
      return newPeriodItem;
    });
  };

  const onLightDayChange = () => {
    toggleIsLightDay();
  };
  const onMiniTamponAmountChange = (amount: number) => {
    setPeriodItem((previous) => {
      const newPeriodItem: IPeriodItem = {
        ...previous,
        amountTamponsMini: amount,
      };
      if (amount > 0) {
        newPeriodItem.isLightDay = false;
      }
      sendUpdatePeriodItemRequest(newPeriodItem);
      return newPeriodItem;
    });
  };
  const onNormalTamponAmountChange = (amount: number) => {
    setPeriodItem((previous) => {
      const newPeriodItem: IPeriodItem = {
        ...previous,
        amountTamponsNormal: amount,
      };
      if (amount > 0) {
        newPeriodItem.isLightDay = false;
      }
      sendUpdatePeriodItemRequest(newPeriodItem);
      return newPeriodItem;
    });
  };

  const onOvulationSideChange = (
    option: ISelectOption<OvulationSide> | undefined
  ) => {
    setPeriod((previous) => {
      let feltOvulationDate = option === undefined ? undefined : props.date;
      const feltOvulationSide = option?.key;

      const newValue: IPeriod = {
        ...previous,
        feltOvulationDate,
        feltOvulationSide,
      };
      updatePeriodRequest(async () => {
        await new PeriodApi().update(newValue);
      });
      return newValue;
    });
  };

  const onSuperTamponAmountChange = (amount: number) => {
    setPeriodItem((previous) => {
      const newPeriodItem: IPeriodItem = {
        ...previous,
        amountTamponsSuper: amount,
      };
      if (amount > 0) {
        newPeriodItem.isLightDay = false;
      }
      sendUpdatePeriodItemRequest(newPeriodItem);
      return newPeriodItem;
    });
  };

  const ovulationSelectOptions: ISelectOption<OvulationSide>[] = useMemo(
    () => [
      { key: OvulationSide.LEFT, text: t(texts.general.left) },
      { key: OvulationSide.RIGHT, text: t(texts.general.right) },
    ],
    [t]
  );

  return {
    amountMiniTampons: periodItem.amountTamponsMini,
    amountNormalTampons: periodItem.amountTamponsNormal,
    amountSuperTampons: periodItem.amountTamponsSuper,
    isLightDay: periodItem.isLightDay,
    onLightDayChange,
    onMiniTamponAmountChange,
    onNormalTamponAmountChange,
    onOvulationSideChange,
    onSuperTamponAmountChange,
    ovulationSide: period.feltOvulationSide,
    ovulationSelectOptions,
  };
};
