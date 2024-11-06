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

  const days = `${DateTime.toDay(props.statisticsItem.startDate)}. - ${
    props.statisticsItem.endDate
      ? DateTime.toDay(props.statisticsItem.endDate)
      : "?"
  }.`;

  const month = (): string => {
    let month: string = "";
    const startMonth = DateTime.toMonth(props.statisticsItem.startDate);
    const endMonth = props.statisticsItem.endDate
      ? DateTime.toMonth(props.statisticsItem.endDate)
      : undefined;
    if (endMonth === undefined || startMonth === endMonth) {
      month = renderMonth(startMonth);
    } else {
      month = `${renderMonth(startMonth, true)}/${renderMonth(endMonth, true)}`;
    }
    return month;
  };

  const ovulationSide = (): string => {
    if (props.statisticsItem.feltOvulationSide === undefined) return "?";
    switch (props.statisticsItem.feltOvulationSide) {
      case OvulationSide.LEFT:
        return t(texts.general.left);
      case OvulationSide.RIGHT:
        return t(texts.general.right);
      default:
        error(`Text missing for OvulationSide: ${props.statisticsItem.feltOvulationSide}`);
    }
  };

  return { days, month: month(), ovulationSide: ovulationSide() };
};
