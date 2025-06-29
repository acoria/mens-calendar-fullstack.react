import { HttpStatusCode } from "../core/api/types/HttpStatusCode";
import { IRouteMeta } from "../core/api/types/IRouteMeta";
import { StatisticsItemRepo } from "../repositories/StatisticsItemRepo";
import { StatisticsItemRouteMeta } from "../shared/model/IStatisticsItem";
import { Controller } from "./core/Controller";
import { ErrorInterceptor } from "./core/ErrorInterceptor";

export class StatisticsItemController extends Controller {
  private readonly routeMeta: IRouteMeta = StatisticsItemRouteMeta;
  private readonly repo: StatisticsItemRepo = new StatisticsItemRepo();
  constructor() {
    super();
    this.findAll();
    // this.getAverageStatistic();
  }

  protected findAll() {
    this.router.get(
      this.routeMeta.path,
      ErrorInterceptor(async (_, res) => {
        const entities = await this.repo.findAll();
        return res.status(HttpStatusCode.OK_200).send(entities);
      })
    );
  }

  protected getAverageStatistic() {
    this.router.get(
      `${this.routeMeta.path}/average`,
      ErrorInterceptor(async (_, res) => {
        const result = await this.repo.getAverageStatistic();
        return res.status(HttpStatusCode.OK_200).send(result);
      })
    );
  }
}
