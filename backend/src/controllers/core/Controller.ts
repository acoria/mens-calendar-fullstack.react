import { Response, Router } from "express";
import { HttpStatusCode } from "../../core/api/types/HttpStatusCode";
import { createError } from "../../core/utils/createError";

export abstract class Controller {
  readonly router = Router();

  protected sendMissingAuthorityError(res: Response): Response {
    return res
      .status(HttpStatusCode.FORBIDDEN_403)
      .send(createError("Missing authority", "MissingAuthorityError"));
  }
}
