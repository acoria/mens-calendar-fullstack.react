import { Op } from "sequelize";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Period } from "../model/Period";
import { PeriodItem } from "../model/PeriodItem";
import { IPeriod } from "../shared/model/IPeriod";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class PeriodRepo extends SequelizeRepository<IPeriod> {
  constructor() {
    super(Period, [{ model: PeriodItem, as: "periodItems" }]);
  }

  async findByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<IPeriod[]> {
    const data = await this.model.findAll({
      where: {
        [Op.and]: [
          { startDay: { [Op.gte]: dateTimeSpan.from } },
          {
            startDay: { [Op.lte]: dateTimeSpan.to },
          },
        ],
      },
    });
    const periods = data.map((model) => model.toJSON());
    return periods;
  }
}
