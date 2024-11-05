import { DateTime } from "../../../core/services/date/DateTime";
import { error } from "../../../core/utils/error";
import { useRenderMonth } from "../../../hooks/useRenderMonth";
import { texts } from "../../../lib/translation/texts";
import { useTranslation } from "../../../lib/translation/useTranslation";
import { OvulationSide } from "../../../shared/types/OvulationSide";
import { IStatisticsItemProps } from "./IStatisticsItemProps";

export const useStatisticsItemViewModel = (props: IStatisticsItemProps) => {
  const renderMonth = useRenderMonth();
  const { t } = useTranslation();

  const days = `${DateTime.toDay(props.startDate)}. - ${DateTime.toDay(
    props.endDate
  )}.`;

  const month = (): string => {
    let month: string = "";
    const startMonth = DateTime.toMonth(props.startDate);
    const endMonth = DateTime.toMonth(props.endDate);
    month = renderMonth(startMonth);
    if (startMonth !== endMonth) {
      month = `${month}/${renderMonth(endMonth)}`;
    }
    return month;
  };

  const ovulationSide = (): string => {
    if (props.feltOvulationSide === undefined) return "?";
    switch (props.feltOvulationSide) {
      case OvulationSide.LEFT:
        return t(texts.general.left);
      case OvulationSide.RIGHT:
        return t(texts.general.right);
      default:
        error(`Text missing for ${props.feltOvulationSide}`);
    }
  };

  return { days, month: month(), ovulationSide: ovulationSide() };
};
