import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { ICycle } from "../shared/model/ICycle";
import { createIdType } from "./core/createIdType";

const cycle: ModelStatic<Model<ICycle, IEntityDetails<ICycle>>> = db.define(
  "cycle",
  {
    id: createIdType(),
    calculatedPeriodStartDate: DataTypes.DATE,
    calculatedOvulationDate: DataTypes.DATE,
    feltOvulationDate: DataTypes.DATE,
    feltOvulationSide: DataTypes.INTEGER,
  }
);
export class Cycle extends cycle {
  static associate(): void {}
}
