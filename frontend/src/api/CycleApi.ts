import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { ICycle, CycleRouteMeta } from "../shared/model/ICycle";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class CycleApi extends EntityRepository<ICycle> {
  constructor() {
    super(CycleRouteMeta);
  }

  async findByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<ICycle[]> {
    return await RESTApi.get(this.url, {
      urlParams: {
        from: dateTimeSpan.from.toString(),
        to: dateTimeSpan.to.toString(),
      },
    });
  }
}
