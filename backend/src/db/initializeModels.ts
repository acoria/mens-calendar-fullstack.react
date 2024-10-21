import { ModelStatic } from "sequelize";
import { IHaveStaticAssociate } from "../model/core/IHaveStaticAssociate";

export const initializeModels = async (alter: boolean) => {
  const models: IHaveStaticAssociate[] = [];

  // create associations
  models.forEach((model) => model.associate());

  // sync model
  models.forEach(
    async (model) =>
      await (model as unknown as ModelStatic<any>).sync({ alter })
  );
};
