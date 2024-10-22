import { DateTime } from "../../core/services/date/DateTime";
import { useRenderMonth } from "../../hooks/useRenderMonth";
import { useRenderWeekday } from "../../hooks/useRenderWeekday";
import { IPeriodItemProps } from "./IPeriodItemProps";

export const usePeriodItemViewModel = (props: IPeriodItemProps) => {
  const renderMonth = useRenderMonth();
  const renderWeekday = useRenderWeekday();
  const month = DateTime.toMonth(props.date);
  const dayOfWeek = DateTime.toWeekday(props.date);
  const day = DateTime.toDay(props.date);

  const time = `${renderWeekday(dayOfWeek)}, ${day} ${renderMonth(month)}`;

  return { time };
};
