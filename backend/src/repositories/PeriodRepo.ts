import { Period } from "../model/Period";
import { PeriodItem } from "../model/PeriodItem";
import { IPeriod } from "../shared/model/IPeriod";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class PeriodRepo extends SequelizeRepository<IPeriod> {
  constructor() {
    super(Period, [{ model: PeriodItem, as: "periodItems" }]);
  }
}
