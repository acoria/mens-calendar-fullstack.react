import { useMemo, useState } from "react";
import { Cycle } from "../../api/CycleApi";
import { PeriodItemApi } from "../../api/PeriodItemApi";
import { ISelectOption } from "../../components/select/ISelectOption";
import { useRequest } from "../../hooks/useRequest";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ICycle } from "../../shared/model/ICycle";
import { IPeriodItem } from "../../shared/model/IPeriodItem";
import { OvulationSide } from "../../shared/types/OvulationSide";
import { uuid } from "../../utils/uuid";
import { IPeriodItemProps } from "./IPeriodItemProps";
import { DateTime } from "../../core/services/date/DateTime";
import { CycleInfo } from "../calendar/calendar/utils/CycleInfo";

export const usePeriodItemViewModel = (props: IPeriodItemProps) => {
  const { t } = useTranslation();
  const periodInfo = new CycleInfo()

  const [cycle, setCycle] = useState<ICycle | undefined>(props.cycle);
  const [periodItem, setPeriodItem] = useState<IPeriodItem>(
    props.periodItem ?? {
      id: "new",
      amountTamponsMini: 0,
      amountTamponsNormal: 0,
      amountTamponsSuper: 0,
      day: props.date,
      isLightDay: false,
      periodId: props.cycle?.id ?? "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
  const [updatePeriodItemRequest] = useRequest();
  const [insertPeriodRequest] = useRequest();
  const [updatePeriodRequest] = useRequest();

  const upsertPeriodItem = (periodItem: IPeriodItem) => {
    if (periodItem.id === "new") {
      periodItem.id = uuid();
      updatePeriodItemRequest(async () => {
        new PeriodItemApi().insert(periodItem);
      });
    } else {
      updatePeriodItemRequest(async () => {
        new PeriodItemApi().update(periodItem);
      });
    }
  };

  const handlePeriodItemRequest = (periodItem: IPeriodItem) => {
    //if there is no period yet, set it
    if (cycle === undefined) {
      const calculatedPeriodStartDate = DateTime.subtractDays(props.date, 14);
      insertPeriodRequest(async () => {
        const period = await new Cycle().insert({
          calculatedPeriodStartDate,
        });
        setCycle(period);
        periodItem.periodId = period.id;
        upsertPeriodItem(periodItem);
      });
    } else {
      upsertPeriodItem(periodItem);
    }
  };

  const toggleIsLightDay = () => {
    setPeriodItem((previous) => {
      const newPeriodItem: IPeriodItem = {
        ...previous,
        isLightDay: !previous.isLightDay,
      };
      handlePeriodItemRequest(newPeriodItem);
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
      handlePeriodItemRequest(newPeriodItem);
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
      handlePeriodItemRequest(newPeriodItem);
      return newPeriodItem;
    });
  };

  const onOvulationSideChange = (
    option: ISelectOption<OvulationSide> | undefined
  ) => {
    let feltOvulationDate = option === undefined ? undefined : props.date;
    const feltOvulationSide = option?.key;

    if (cycle) {
      setCycle((previous) => {
        const newValue = {
          ...previous!,
          feltOvulationDate,
          feltOvulationSide,
        };
        updatePeriodRequest(async () => {
          await new Cycle().update(newValue);
        });
        return newValue;
      });
    } else {
      //if there is no period yet, create it
      insertPeriodRequest(async () => {
        const period = await new Cycle().insert({
          calculatedPeriodStartDate: props.date,
          feltOvulationDate: props.date,
          feltOvulationSide: feltOvulationSide,
        });
        setCycle(period);
      });
    }
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
      handlePeriodItemRequest(newPeriodItem);
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
    ovulationSide: cycle?.feltOvulationSide,
    ovulationSelectOptions,
  };
};
