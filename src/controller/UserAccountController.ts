import {
  controller,
  httpGet,
  request,
  response,
  httpPost,
  httpPut,
  httpDelete
} from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { TYPE_PROCESSOR } from "../config/ioc_container/inversify.typeBindings";
import { UserAccountProcessor } from "../processor/UserAccountProcessor";
import { HttpStatus } from "../utility/HttpStatus";
import { logger } from "../utility/Logger";
import passport = require("passport");

@controller("/users")
export class UserAccountController {
  @inject(TYPE_PROCESSOR.UserAccountProcessor)
  private readonly _userAccountProcessor: UserAccountProcessor;

  @httpGet("/all")
  public async getAllUsers(@request() req: Request, @response() res: Response) {
    try {
      return await this._userAccountProcessor.getAllUsers(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }

  @httpGet(
    "/current-context",
    passport.authenticate("context", { session: false })
  )
  public async currentUserContext(
    @request() req: Request,
    @response() res: Response
  ) {
    try {
      return await this._userAccountProcessor.getUserContext(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }

  @httpPut("/update-info", passport.authenticate("context", { session: false }))
  public async updateUser(@request() req: Request, @response() res: Response) {
    try {
      return await this._userAccountProcessor.updateUserInfo(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }

  @httpDelete(
    "/delete-account",
    passport.authenticate("context", { session: false })
  )
  public async deleteUser(@request() req: Request, @response() res: Response) {
    try {
      return await this._userAccountProcessor.deleteUser(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}
