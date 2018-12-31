import {
  controller,
  httpGet,
  request,
  response,
  httpPost
} from "inversify-express-utils";
import * as express from "express";
import { HttpStatus } from "../utility/HttpStatus";
import { inject } from "inversify";
import { TYPE_PROCESSOR } from "../config/ioc_container/inversify.typeBindings";
import { AuthProcessor } from "../processor/AuthProcessor";
import { logger } from "../utility/Logger";

@controller("/auth")
export class AuthenticationController {
  @inject(TYPE_PROCESSOR.AuthProcessor)
  private readonly _authProcessor: AuthProcessor;

  @httpPost("/register")
  public async registerNewUser(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return await this._authProcessor.registerNewUser(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }

  @httpPost("/login")
  public async loginUser(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return await this._authProcessor.loginUser(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}
