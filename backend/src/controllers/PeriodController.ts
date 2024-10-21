import { PeriodRepo } from "../repositories/PeriodRepo";
import { IPeriod, PeriodRouteMeta } from "../shared/model/IPeriod";
import { EntityController } from "./core/EntityController";

export class PeriodController extends EntityController<IPeriod, PeriodRepo> {
  constructor() {
    super(PeriodRouteMeta, new PeriodRepo());
  }
}
