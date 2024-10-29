import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { createIdType } from "./core/createIdType";
import { IPMSDay } from "../shared/model/IPMSDay";

const pmsDay: ModelStatic<Model<IPMSDay, IEntityDetails<IPMSDay>>> = db.define(
  "pms_day",
  {
    id: createIdType(),
    day: DataTypes.DATE,
  }
);

export class PMSDay extends pmsDay {
  static associate(): void {}
}
