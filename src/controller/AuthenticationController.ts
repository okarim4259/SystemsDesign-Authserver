import { controller, httpGet, response } from "inversify-express-utils";
import * as express from "express";
import { UserAccountService } from "../service/UserAccountService";
import { TokenService } from "../service/TokenService";
import { RoleService } from "../service/RoleService";
import { inject } from "inversify";
import { TYPE } from "../config/typeBindings/types";
import { IUserResponse } from "../domain/IUserResponse";
import { logger } from "../utility/Logger";
import { HttpStatus } from "../utility/HTTP";

@controller("/auth")
export class AuthenticationController {
  @inject(TYPE.UserAccountService)
  private readonly _userAccountService: UserAccountService;

  @inject(TYPE.TokenService)
  private readonly _tokenService: TokenService;

  @inject(TYPE.RoleService)
  private readonly _roleService: RoleService;

  @httpGet("/all")
  public async getAll(@response() res: express.Response) {
    try {
      const users = await this._userAccountService.getAll();
      const usersResponses = new Array<IUserResponse>();
      users.forEach(user => {
        const userResponse: IUserResponse = {
          userId: user.userId,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        usersResponses.push(userResponse);
      });
      res.json(usersResponses);
    } catch (err) {
      logger.error(err);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: err });
    }
  }
}
