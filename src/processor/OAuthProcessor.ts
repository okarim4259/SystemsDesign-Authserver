import { injectable, inject } from "inversify";
import * as express from "express";
import { TYPE_SERVICE } from "../config/ioc_container/inversify.typeBindings";
import { TokenService } from "../service/TokenService";
import { logger } from "../utility/Logger";
import { HttpStatus } from "../utility/HttpStatus";

@injectable()
export class OAuthProcessor {
  @inject(TYPE_SERVICE.TokenService)
  private readonly _tokenService: TokenService;

  public async googleOAuthSignIn(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    const jwtToken = this._tokenService.generateUserAccessToken(
      req.user.userId,
      req.user.email
    );
    if (!jwtToken) {
      logger.error("Could not generate jwt token for google oauth");
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not perform login at this time " });
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      access_token: "Bearer " + jwtToken,
      googleProfile: req.user.additionalInfo
    });
  }

  public async facebookOAuthSignIn(
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> {
    const jwtToken = this._tokenService.generateUserAccessToken(
      req.user.userId,
      req.user.email
    );
    if (!jwtToken) {
      logger.error("Could not generate jwt token for google oauth");
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not perform login at this time " });
    }
    return res.status(HttpStatus.OK).json({
      success: true,
      access_token: "Bearer " + jwtToken,
      googleProfile: req.user.additionalInfo
    });
  }
}
