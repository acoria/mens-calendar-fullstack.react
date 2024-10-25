import { DataTypes, Model, ModelStatic } from "sequelize";
import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { db } from "../db/db";
import { IPeriodItem } from "../shared/model/IPeriodItem";
import { createIdType } from "./core/createIdType";
import { Cycle } from "./Cycle";

const periodItem: ModelStatic<Model<IPeriodItem, IEntityDetails<IPeriodItem>>> =
  db.define("period_items", {
    id: createIdType(),
    day: DataTypes.DATE,
    amountTamponsMini: DataTypes.INTEGER,
    amountTamponsNormal: DataTypes.INTEGER,
    amountTamponsSuper: DataTypes.INTEGER,
    isLightDay: DataTypes.BOOLEAN,
  });

export class PeriodItem extends periodItem {
  static associate() {
    PeriodItem.belongsTo(Cycle);
    Cycle.hasMany(PeriodItem, {
      foreignKey: "periodId",
      as: "periodItems",
    });
  }
}
