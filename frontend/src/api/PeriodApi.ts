import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { IPeriod, PeriodRouteMeta } from "../shared/model/IPeriod";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class PeriodApi extends EntityRepository<IPeriod> {
  constructor() {
    super(PeriodRouteMeta);
  }

  async findByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<IPeriod[]> {
    return await RESTApi.get(this.url, {
      urlParams: {
        from: dateTimeSpan.from.toString(),
        to: dateTimeSpan.to.toString(),
      },
    });
  }
}
