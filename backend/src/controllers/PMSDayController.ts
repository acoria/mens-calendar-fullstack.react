import { PMSDayRepo } from "../repositories/PMSDayRepo";
import { IPMSDay, PMSDayRouteMeta } from "../shared/model/IPmsDay";
import { EntityController } from "./core/EntityController";

export class PMSDayController extends EntityController<IPMSDay, PMSDayRepo> {
  constructor() {
    super(PMSDayRouteMeta, new PMSDayRepo());
  }
}
