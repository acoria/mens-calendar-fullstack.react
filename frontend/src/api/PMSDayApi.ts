import { IPMSDay, PMSDayRouteMeta } from "../shared/model/IPMSDay";
import { EntityRepository } from "./core/EntityRepository";

export class PMSDayApi extends EntityRepository<IPMSDay> {
  constructor() {
    super(PMSDayRouteMeta);
  }
}
