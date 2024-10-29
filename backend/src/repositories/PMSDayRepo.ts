import { PMSDay } from "../model/PmsDay";
import { IPMSDay } from "../shared/model/IPmsDay";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class PMSDayRepo extends SequelizeRepository<IPMSDay> {
  constructor() {
    super(PMSDay);
  }
}
