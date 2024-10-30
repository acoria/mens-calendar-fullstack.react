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
import { CycleUtils } from "../../utils/CycleUtils";
import { uuid } from "../../utils/uuid";
import { IPeriodItemSettingsProps } from "./IPeriodItemSettingsProps";

export const usePeriodItemViewModel = (props: IPeriodItemSettingsProps) => {
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
    let id: string = periodItem.id;
    if (id === "new") {
      id = uuid();
      periodItem.id = id;
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
        id = "new";
        updatePeriodItemRequest(async () => {
          new PeriodItemApi().delete(periodItem);
        });
      } else {
        updatePeriodItemRequest(async () => {
          new PeriodItemApi().update(periodItem);
        });
      }
    }
    setPeriodItem({ ...periodItem, id });
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
    const newPeriodItem: IPeriodItem = {
      ...periodItem,
      isLightDay: !periodItem.isLightDay,
    };
    handlePeriodItemRequest(newPeriodItem);
  };

  const onLightDayChange = () => {
    toggleIsLightDay();
  };
  const onMiniTamponAmountChange = (amount: number) => {
    const newPeriodItem: IPeriodItem = {
      ...periodItem,
      amountTamponsMini: amount,
    };
    if (amount > 0) {
      newPeriodItem.isLightDay = false;
    }
    handlePeriodItemRequest(newPeriodItem);
  };

  const onNormalTamponAmountChange = (amount: number) => {
      const newPeriodItem: IPeriodItem = {
        ...periodItem,
        amountTamponsNormal: amount,
      };
      if (amount > 0) {
        newPeriodItem.isLightDay = false;
      }
      handlePeriodItemRequest(newPeriodItem);
  };

  const onOvulationSideChange = (
    option: ISelectOption<OvulationSide> | undefined
  ) => {
    let feltOvulationDate = option === undefined ? undefined : props.date;
    const feltOvulationSide = option?.key;

    const currentCycle =
      cycle !== undefined
        ? cycle
        : props.cycleInfo.findPotentialCycleForOvulationDate(props.date);
    if (currentCycle !== undefined) {
      updateCycleRequest(async () => {
        currentCycle.feltOvulationDate = feltOvulationDate;
        currentCycle.feltOvulationSide = feltOvulationSide;
        if (feltOvulationDate !== undefined) {
          //adjust calculated period start date because it prevails
          currentCycle.calculatedPeriodStartDate = DateTime.addDays(
            feltOvulationDate,
            14
          );
        } else {
          //set the calculated period start again
          const previousCycle = props.cycleInfo.findPreviousCycle(currentCycle);
          if (previousCycle !== undefined) {
            currentCycle.calculatedPeriodStartDate =
              CycleUtils.calculateExpectedPeriodStartDateFromPreviousCycle(
                previousCycle
              );
          } else {
            //delete cycle
            await new CycleApi().deleteById(currentCycle.id);
            setCycle(undefined);
            return;
          }
        }
        await new CycleApi().update(currentCycle);
        setCycle(currentCycle);
      });
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
  };

  const onSuperTamponAmountChange = (amount: number) => {
      const newPeriodItem: IPeriodItem = {
        ...periodItem,
        amountTamponsSuper: amount,
      };
      if (amount > 0) {
        newPeriodItem.isLightDay = false;
      }
      handlePeriodItemRequest(newPeriodItem);
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
