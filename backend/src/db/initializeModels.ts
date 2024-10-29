import { ModelStatic } from "sequelize";
import { IHaveStaticAssociate } from "../model/core/IHaveStaticAssociate";
import { Cycle } from "../model/Cycle";
import { PeriodItem } from "../model/PeriodItem";
import { PMSDay } from "../model/PmsDay";

export const initializeModels = async (alter: boolean) => {
  const models: IHaveStaticAssociate[] = [Cycle, PeriodItem, PMSDay];

  // create associations
  models.forEach((model) => model.associate());

  // sync model
  models.forEach(
    async (model) =>
      await (model as unknown as ModelStatic<any>).sync({ alter })
  );
};
