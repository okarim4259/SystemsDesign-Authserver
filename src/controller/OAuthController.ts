import {
  controller,
  httpGet,
  request,
  response
} from "inversify-express-utils";
import * as express from "express";
import { logger } from "../utility/Logger";
import { HttpStatus } from "../utility/HttpStatus";
import { inject } from "inversify";
import { TYPE_PROCESSOR } from "../config/ioc_container/inversify.typeBindings";
import { OAuthProcessor } from "../processor/OAuthProcessor";
import passport = require("passport");

@controller("/oauth2")
export class OAuthController {
  @inject(TYPE_PROCESSOR.OAuthProcessor)
  private readonly _oauthProcessor: OAuthProcessor;

  @httpGet(
    "/google",
    passport.authenticate("google-oauth2", { session: false })
  )
  public async googleOAuth(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return await this._oauthProcessor.googleOAuthSignIn(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }

  @httpGet(
    "/facebook",
    passport.authenticate("facebook-oauth2", {
      session: false,
      scope: ["email", "public_profile"]
    })
  )
  public async facebookOAuth(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      return await this._oauthProcessor.facebookOAuthSignIn(req, res);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}
