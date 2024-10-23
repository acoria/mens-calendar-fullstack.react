import { useState } from "react";
import { DateTime } from "../../core/services/date/DateTime";
import { useRenderMonth } from "../../hooks/useRenderMonth";
import { useRenderWeekday } from "../../hooks/useRenderWeekday";
import { OvulationSide } from "../../shared/types/OvulationSide";
import { IPeriodItemProps } from "./IPeriodItemProps";

export const usePeriodItemViewModel = (props: IPeriodItemProps) => {
  const renderMonth = useRenderMonth();
  const renderWeekday = useRenderWeekday();
  const month = DateTime.toMonth(props.date);
  const dayOfWeek = DateTime.toWeekday(props.date);
  const day = DateTime.toDay(props.date);
  const [isLightDay, setIsLightDay] = useState<boolean>(false);

  const date = `${renderWeekday(dayOfWeek)}, ${day} ${renderMonth(month)}`;
  //   const isLightDay = isLightDayValue ? "on" : "off";

  const onLightDayChange = () => {
    // setIsLightDayValue((previous) => !previous);
    setIsLightDay((previous) => {
      const newValue = !previous;
      console.log(`Light day: ${newValue}`);
      return newValue;
    });
  };
  const onMiniTamponAmountChange = (amount: number) => {
    amount > 0 && setIsLightDay(false);
    console.log(`New amount: ${amount}`);
  };
  const onNormalTamponAmountChange = (amount: number) => {
    amount > 0 && setIsLightDay(false);
    console.log(`New amount: ${amount}`);
  };

  const onOvulationSideChange = (ovulationSide: OvulationSide | undefined) => {
    console.log(`new ovulation side: ${ovulationSide}`);
  };

  const onSuperTamponAmountChange = (amount: number) => {
    amount > 0 && setIsLightDay(false);
    console.log(`New amount: ${amount}`);
  };

  return {
    date,
    isLightDay,
    onLightDayChange,
    onMiniTamponAmountChange,
    onNormalTamponAmountChange,
    onOvulationSideChange,
    onSuperTamponAmountChange,
  };
};
