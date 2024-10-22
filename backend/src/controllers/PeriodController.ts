import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { PeriodRepo } from "../repositories/PeriodRepo";
import { IPeriod, PeriodRouteMeta } from "../shared/model/IPeriod";
import { EntityController } from "./core/EntityController";
import { ErrorInterceptor } from "./core/ErrorInterceptor";

export class PeriodController extends EntityController<IPeriod, PeriodRepo> {
  constructor() {
    super(PeriodRouteMeta, new PeriodRepo());
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