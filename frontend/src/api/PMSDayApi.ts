import { IDateTimeSpan } from "../core/services/date/IDateTimeSpan";
import { IPMSDay, PMSDayRouteMeta } from "../shared/model/IPMSDay";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class PMSDayApi extends EntityRepository<IPMSDay> {
  constructor() {
    super(PMSDayRouteMeta);
  }

  async findByDateTimeSpan(dateTimeSpan: IDateTimeSpan): Promise<IPMSDay[]> {
    return await RESTApi.get(this.url, {
      urlParams: {
        from: dateTimeSpan.from.toString(),
        to: dateTimeSpan.to.toString(),
      },
    });
  }
}
