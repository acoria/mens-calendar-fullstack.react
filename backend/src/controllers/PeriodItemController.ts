import { PeriodItemRepo } from "../repositories/PeriodItemRepo";
import { IPeriodItem, PeriodItemRouteMeta } from "../shared/model/IPeriodItem";
import { EntityController } from "./core/EntityController";

export class PeriodItemController extends EntityController<
  IPeriodItem,
  PeriodItemRepo
> {
  constructor() {
    super(PeriodItemRouteMeta, new PeriodItemRepo());
  }
}
