import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { PMSDayRepo } from "../repositories/PMSDayRepo";
import { IPMSDay, PMSDayRouteMeta } from "../shared/model/IPMSDay";
import { EntityController } from "./core/EntityController";
import { ErrorInterceptor } from "./core/ErrorInterceptor";

export class PMSDayController extends EntityController<IPMSDay, PMSDayRepo> {
  constructor() {
    super(PMSDayRouteMeta, new PMSDayRepo());
  }

  protected findAll(): void {
    this.router.get(
      this.routeMeta.path,
      ErrorInterceptor(async (req, res) => {
        const fields = this.getFieldsFromQuery(req.query);
        const from = req.query.from;
        const to = req.query.to;
        if (from && typeof from === "string" && to && typeof to === "string") {
          const entities = await this.repo.findByDateTimeSpan({
            from: new Date(from),
            to: new Date(to),
          });
          return res.status(HttpStatusCode.OK_200).send(entities);
        } else {
          const entities = await this.repo.findAll(fields);
          return res.status(HttpStatusCode.OK_200).send(entities);
        }
      })
    );
  }
}
