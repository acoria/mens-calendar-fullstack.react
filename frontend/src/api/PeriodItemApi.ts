import { IPeriodItem, PeriodItemRouteMeta } from "../shared/model/IPeriodItem";
import { EntityRepository } from "./core/EntityRepository";

export class PeriodItemApi extends EntityRepository<IPeriodItem> {
  constructor() {
    super(PeriodItemRouteMeta);
  }
}
