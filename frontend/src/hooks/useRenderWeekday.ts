import { IllegalArgumentError } from "../core/errors/IllegalArgumentError";
import { texts } from "../lib/translation/texts";
import { useTranslation } from "../lib/translation/useTranslation";

export const useRenderWeekday = () => {
  const { t } = useTranslation();

  const render = (weekday: number) => {
    switch (weekday) {
      case 0:
        return t(texts.general.weekdays.sunday);
      case 1:
        return t(texts.general.weekdays.monday);
      case 2:
        return t(texts.general.weekdays.tuesday);
      case 3:
        return t(texts.general.weekdays.wednesday);
      case 4:
        return t(texts.general.weekdays.thursday);
      case 5:
        return t(texts.general.weekdays.friday);
      case 6:
        return t(texts.general.weekdays.saturday);
      default:
        throw new IllegalArgumentError();
    }
  };

  return render;
};
