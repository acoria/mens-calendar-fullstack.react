import {
  IStatisticsItem,
  StatisticsItemRouteMeta,
} from "../shared/model/IStatisticsItem";
import { EntityRepository } from "./core/EntityRepository";
import { RESTApi } from "./core/RESTApi";

export class StatisticsItemApi extends EntityRepository<IStatisticsItem> {
  constructor() {
    super(StatisticsItemRouteMeta);
  }

  async getAverageStatisticItem(): Promise<IStatisticsItem> {
    return await RESTApi.get(`${this.routeMeta.path}/average`);
  }
}
