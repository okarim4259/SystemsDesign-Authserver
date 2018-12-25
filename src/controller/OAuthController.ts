import * as express from "express";
import {
  controller,
  httpGet,
  request,
  response
} from "inversify-express-utils";
import { HttpStatus } from "../utility/HTTP";
import passport = require("passport");
import { TokenService } from "../service/TokenService";
import { inject } from "inversify";
import { TYPE } from "../config/typeBindings/types";
import { KEYS } from "../config/constants/constants.config";
import { logger } from "../utility/Logger";

@controller("/oauth")
export class OAuthController {
  private readonly _tokenService: TokenService;

  constructor(@inject(TYPE.TokenService) tokenService: TokenService) {
    this._tokenService = tokenService;
  }

  @httpGet(
    "/google",
    passport.authenticate("google-oauth2", { session: false })
  )
  public async googleOAuth(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const payload = {
        ISSUER: KEYS.ISSUER,
        sub: req.user.userId,
        email: req.user.email
      };
      const jwtToken = await this._tokenService.generateUserAccessToken(
        payload
      );
      if (!jwtToken) {
        logger.error("Could not generate access token for google OAuth");
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Oops something went wrong!!!" });
      }
      return res.status(HttpStatus.OK).json({
        success: true,
        access_token: "Bearer " + jwtToken,
        googleProfile: req.user.additionalInfo
      });
    } catch (err) {
      logger.error(err);
      return res.status(HttpStatus.OK).json({ message: "So far so good!" });
    }
  }
}
