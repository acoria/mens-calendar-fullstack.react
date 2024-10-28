import { useMemo, useState } from "react";
import { CycleApi } from "../../api/CycleApi";
import { PeriodItemApi } from "../../api/PeriodItemApi";
import { ISelectOption } from "../../components/select/ISelectOption";
import { DateTime } from "../../core/services/date/DateTime";
import { useRequest } from "../../hooks/useRequest";
import { texts } from "../../lib/translation/texts";
import { useTranslation } from "../../lib/translation/useTranslation";
import { ICycle } from "../../shared/model/ICycle";
import { IPeriodItem } from "../../shared/model/IPeriodItem";
import { OvulationSide } from "../../shared/types/OvulationSide";
import { uuid } from "../../utils/uuid";
import { IPeriodItemProps } from "./IPeriodItemProps";

export const usePeriodItemViewModel = (props: IPeriodItemProps) => {
  const { t } = useTranslation();

  const [cycle, setCycle] = useState<ICycle | undefined>(
    props.cycleData?.cycle
  );
  const [periodItem, setPeriodItem] = useState<IPeriodItem>(
    props.cycleData?.periodItem ?? {
      id: "new",
      amountTamponsMini: 0,
      amountTamponsNormal: 0,
      amountTamponsSuper: 0,
      day: props.date,
      isLightDay: false,
      cycleId: props.cycleData?.cycle.id ?? "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  );
  const [updatePeriodItemRequest] = useRequest();
  const [insertCycleRequest] = useRequest();
  const [updateCycleRequest] = useRequest();

  const upsertPeriodItem = (periodItem: IPeriodItem) => {
    if (periodItem.id === "new") {
      periodItem.id = uuid();
      updatePeriodItemRequest(async () => {
        new PeriodItemApi().insert(periodItem);
      });
    } else {
      //if at least one attribute is filled -> update
      //otherwise delete
      if (
        (periodItem.amountTamponsMini === 0 ||
          periodItem.amountTamponsMini === undefined) &&
        (periodItem.amountTamponsNormal === 0 ||
          periodItem.amountTamponsNormal === undefined) &&
        (periodItem.amountTamponsSuper === 0 ||
          periodItem.amountTamponsSuper === undefined) &&
        (periodItem.isLightDay === false || periodItem.isLightDay === undefined)
      ) {
        updatePeriodItemRequest(async () => {
          new PeriodItemApi().delete(periodItem);
        });
      } else {
        updatePeriodItemRequest(async () => {
          new PeriodItemApi().update(periodItem);
        });
      }
    }
  };

  const handlePeriodItemRequest = (periodItem: IPeriodItem) => {
    //if there is no period yet, set it
    if (cycle === undefined) {
      const cycle = props.cycleInfo.findPotentialCycleForPeriodByDate(
        props.date
      );
      if (cycle !== undefined) {
        setCycle(cycle);
        periodItem.cycleId = cycle.id;
        upsertPeriodItem(periodItem);
      } else {
        insertCycleRequest(async () => {
          const period = await new CycleApi().insert({
            calculatedPeriodStartDate: periodItem.day,
          });
          setCycle(period);
          periodItem.cycleId = period.id;
          upsertPeriodItem(periodItem);
        });
      }
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
        updateCycleRequest(async () => {
          await new CycleApi().update(newValue);
        });
        return newValue;
      });
    } else {
      //if there is no cycle yet, find or create it
      const cycle = props.cycleInfo.findPotentialCycleForOvulationDate(
        props.date
      );
      if (cycle !== undefined) {
        cycle.feltOvulationDate = feltOvulationDate;
        cycle.feltOvulationSide = feltOvulationSide;
        if (feltOvulationDate !== undefined) {
          cycle.calculatedPeriodStartDate = DateTime.addDays(
            feltOvulationDate,
            14
          );
        }
        updateCycleRequest(async () => {
          await new CycleApi().update(cycle);
        });
        setCycle(cycle);
      } else {
        insertCycleRequest(async () => {
          const cycle = await new CycleApi().insert({
            calculatedPeriodStartDate: DateTime.addDays(props.date, 14),
            feltOvulationDate: props.date,
            feltOvulationSide: feltOvulationSide,
          });
          setCycle(cycle);
        });
      }
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
