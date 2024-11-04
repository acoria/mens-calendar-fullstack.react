import { IEntityDetails } from "../core/api/types/IEntityDetails";
import { DateTime } from "../core/services/date/DateTime";
import { PeriodItem } from "../model/PeriodItem";
import { ICycle } from "../shared/model/ICycle";
import { IPeriodItem } from "../shared/model/IPeriodItem";
import { CycleRepo } from "./CycleRepo";
import { SequelizeRepository } from "./sequelize/SequelizeRepository";

export class PeriodItemRepo extends SequelizeRepository<IPeriodItem> {
  constructor() {
    super(PeriodItem);
  }

  async insert(entity: IEntityDetails<IPeriodItem>): Promise<IPeriodItem> {
    const periodItem = super.insert(entity);

    const numberOfPeriodItems = await this.model.count({
      where: { cycleId: entity.cycleId },
    });
    if (numberOfPeriodItems === 0) {
      //add new next cycle if it is the first period item in the cycle
      const nextCycle: IEntityDetails<ICycle> = {
        calculatedPeriodStartDate: DateTime.addDays(entity.day, 28),
        calculatedOvulationDate: DateTime.addDays(entity.day, 14),
      };
      await new CycleRepo().insert(nextCycle);
    }

    return periodItem;
  }
}
