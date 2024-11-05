import {
  IStatisticsItem,
  StatisticsItemRouteMeta,
} from "../shared/model/IStatisticsItem";
import { EntityRepository } from "./core/EntityRepository";

export class StatisticsItemApi extends EntityRepository<IStatisticsItem> {
  constructor() {
    super(StatisticsItemRouteMeta);
  }
}
