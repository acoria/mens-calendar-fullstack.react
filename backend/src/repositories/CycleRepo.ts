import { Op } from "sequelize";
import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { Cycle } from "../model/Cycle";
import { PeriodItem } from "../model/PeriodItem";
import { ICycle } from "../shared/model/ICycle";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class CycleRepo extends SequelizeRepository<ICycle> {
  constructor() {
    super(Cycle, [{ model: PeriodItem, as: "periodItems" }]);
  }

  async findByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<ICycle[]> {
    const data = await this.model.findAll({
      where: {
        [Op.and]: [
          { calculatedPeriodStartDate: { [Op.gte]: dateTimeSpan.from } },
          {
            calculatedPeriodStartDate: { [Op.lte]: dateTimeSpan.to },
          },
        ],
      },
      include: [{ model: PeriodItem, as: "periodItems" }],
    });
    const cycles = data.map((model) => model.toJSON());
    return cycles;
  }

  /**
   * Updates only the entity but not the relations
   */
  async update(entity: ICycle): Promise<boolean> {
    if (entity.feltOvulationDate === undefined) {
      (entity.feltOvulationDate as any) = null;
    }
    if (entity.feltOvulationSide === undefined) {
      (entity.feltOvulationSide as any) = null;
    }
    return super.update(entity);
  }
}
