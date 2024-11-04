import { useCallback } from "react";
import { IllegalArgumentError } from "../core/errors/IllegalArgumentError";
import { Month } from "../core/types/Month";
import { texts } from "../lib/translation/texts";
import { useTranslation } from "../lib/translation/useTranslation";

export const useRenderMonth = () => {
  const { t } = useTranslation();

  const render = useCallback(
    (month: Month, short?: boolean) => {
      if (short) {
        switch (month) {
          case Month.JANUARY:
            return t(texts.general.months.januaryShort);
          case Month.FEBRUARY:
            return t(texts.general.months.februaryShort);
          case Month.MARCH:
            return t(texts.general.months.marchShort);
          case Month.APRIL:
            return t(texts.general.months.aprilShort);
          case Month.MAY:
            return t(texts.general.months.mayShort);
          case Month.JUNE:
            return t(texts.general.months.juneShort);
          case Month.JULY:
            return t(texts.general.months.julyShort);
          case Month.AUGUST:
            return t(texts.general.months.augustShort);
          case Month.SEPTEMBER:
            return t(texts.general.months.septemberShort);
          case Month.OCTOBER:
            return t(texts.general.months.octoberShort);
          case Month.NOVEMBER:
            return t(texts.general.months.novemberShort);
          case Month.DECEMBER:
            return t(texts.general.months.decemberShort);
          default:
            throw new IllegalArgumentError();
        }
      } else {
        switch (month) {
          case Month.JANUARY:
            return t(texts.general.months.january);
          case Month.FEBRUARY:
            return t(texts.general.months.february);
          case Month.MARCH:
            return t(texts.general.months.march);
          case Month.APRIL:
            return t(texts.general.months.april);
          case Month.MAY:
            return t(texts.general.months.may);
          case Month.JUNE:
            return t(texts.general.months.june);
          case Month.JULY:
            return t(texts.general.months.july);
          case Month.AUGUST:
            return t(texts.general.months.august);
          case Month.SEPTEMBER:
            return t(texts.general.months.september);
          case Month.OCTOBER:
            return t(texts.general.months.october);
          case Month.NOVEMBER:
            return t(texts.general.months.november);
          case Month.DECEMBER:
            return t(texts.general.months.december);
          default:
            throw new IllegalArgumentError();
        }
      }
    },
    []
    // [t]
  );
  return render;
};
