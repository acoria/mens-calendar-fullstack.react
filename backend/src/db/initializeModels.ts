import { ModelStatic } from "sequelize";
import { IHaveStaticAssociate } from "../model/core/IHaveStaticAssociate";
import { Period } from "../model/Period";
import { PeriodItem } from "../model/PeriodItem";

export const initializeModels = async (alter: boolean) => {
  const models: IHaveStaticAssociate[] = [Period, PeriodItem];

  // create associations
  models.forEach((model) => model.associate());

  // sync model
  models.forEach(
    async (model) =>
      await (model as unknown as ModelStatic<any>).sync({ alter })
  );
};
