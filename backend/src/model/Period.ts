import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IPeriod } from "../shared/model/IPeriod";
import { createIdType } from "./core/createIdType";

const period: ModelStatic<Model<IPeriod, IEntityDetails<IPeriod>>> = db.define(
  "periods",
  {
    id: createIdType(),
    feltOvulationDate: DataTypes.DATE,
    feltOvulationSide: DataTypes.INTEGER,
    startDay: DataTypes.DATE,
  }
);
export class Period extends period {
  static associate(): void {}
}
