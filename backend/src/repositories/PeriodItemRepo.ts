import { PeriodItem } from "../model/PeriodItem";
import { IPeriodItem } from "../shared/model/IPeriodItem";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class PeriodItemRepo extends SequelizeRepository<IPeriodItem> {
  constructor() {
    super(PeriodItem);
  }
}
