import { Op } from "sequelize";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { PMSDay } from "../model/PmsDay";
import { IPMSDay } from "../shared/model/IPMSDay";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class PMSDayRepo extends SequelizeRepository<IPMSDay> {
  constructor() {
    super(PMSDay);
  }

  async findByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<IPMSDay[]> {
    const data = await this.model.findAll({
      where: {
        [Op.and]: [
          { day: { [Op.gte]: dateTimeSpan.from } },
          {
            day: { [Op.lte]: dateTimeSpan.to },
          },
        ],
      },
    });
    const pmsDays = data.map((model) => model.toJSON());
    return pmsDays;
  }

  async countByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<number> {
    const data = await this.model.findAll({
      where: {
        [Op.and]: [
          { day: { [Op.gte]: dateTimeSpan.from } },
          {
            day: { [Op.lte]: dateTimeSpan.to },
          },
        ],
      },
    });
    return data.length;
  }
}
