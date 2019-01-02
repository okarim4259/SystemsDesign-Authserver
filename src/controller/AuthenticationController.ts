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
import { validateLoginInput } from "../utility/validation/Login";
import { validateRegistrationInput } from "../utility/validation/Register";

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
      const { errors, isValid } = validateRegistrationInput(req.body);
      if (!isValid) {
        return res.status(HttpStatus.BAD_REQUEST).json(errors);
      }
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
      const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) {
        return res.status(HttpStatus.BAD_REQUEST).json(errors);
      }
      return await this._authProcessor.loginUser(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}
