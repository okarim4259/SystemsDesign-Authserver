import * as express from "express";
import { inject } from "inversify";
import {
  controller,
  httpGet,
  httpPost,
  response,
  request
} from "inversify-express-utils";
import { TYPE } from "../config/typeBindings/types";
import { logger } from "../utility/Logger";
import { IUserAccount } from "../domain/IUserAccount";
import * as bcrypt from "bcryptjs";
import { UserAccountService } from "../service/UserAccountService";
import { IUserResponse } from "../domain/IUserResponse";
import { IUserAccountType } from "../domain/IUserAccountType";
import { HttpStatus } from "../utility/HTTP";
import { KEYS } from "../config/constants/constants.config";
import passport = require("passport");
import { TokenService } from "../service/TokenService";

import { Role } from "../entity/Role";
import { IUserContext } from "../domain/IUserContext";
import { RoleService } from "../service/RoleService";

import { ERoles } from "../utility/ERoles";

@controller("/users")
export class UserController {
  private readonly TAG: string = "USER_CONTROLLER ";
  private readonly _userAccountService: UserAccountService;
  private readonly _tokenService: TokenService;
  private readonly _roleService: RoleService;

  public constructor(
    @inject(TYPE.UserAccountService) userAccountService: UserAccountService,
    @inject(TYPE.TokenService) tokenService: TokenService,
    @inject(TYPE.RoleService) roleService: RoleService
  ) {
    this._userAccountService = userAccountService;
    this._tokenService = tokenService;
    this._roleService = roleService;
  }

  @httpGet("/")
  public async get(@response() res: express.Response) {
    try {
      const users = await this._userAccountService.getAll();
      const usersResonses = new Array<IUserResponse>();
      users.forEach(user => {
        const userResponse: IUserResponse = {
          userId: user.userId,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        };
        usersResonses.push(userResponse);
      });

      res.json(usersResonses);
    } catch (err) {
      logger.error(this.TAG + err.message);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }

  @httpPost("/register")
  public async registerAdmin(
    @request() req: express.Request,
    @response() res: express.Response
  ) {
    try {
      const emailExists = await this._userAccountService.findByEmail(
        req.body.email
      );

      const userNameExits = await this._userAccountService.findByUserName(
        req.body.userName
      );

      if (userNameExits) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "The username you entered is already in use" });
      }

      if (emailExists) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "The email you entered is already in use" });
      }

      const roles: Role[] = [
        await this._roleService.getRoleByName(ERoles.USER)
      ];

      const newUser: IUserAccount = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        accountType: IUserAccountType.local,
        roles: roles
      };

      const registerNewUser = await this._userAccountService.registerNewUser(
        newUser
      );
      if (!registerNewUser) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Oops something went wrong!!!" });
      }

      const user: IUserResponse = {
        userId: registerNewUser.userId,
        userName: registerNewUser.userName,
        firstName: registerNewUser.firstName,
        lastName: registerNewUser.lastName,
        email: registerNewUser.email,
        accountType: registerNewUser.accountType
      };

      logger.info(
        `Successfully Registered new User ${registerNewUser.userName}`
      );
      return res.status(HttpStatus.CREATED).json(user);
    } catch (err) {
      logger.error(this.TAG + err.message);
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
      const user = await this._userAccountService.findByEmail(req.body.email);
      if (!user) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "Could not find account with that email" });
      }
      const passwordMatched: Boolean = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordMatched) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Incorrect Password...." });
      }

      const payload = {
        ISSUER: KEYS.ISSUER,
        sub: user.userId,
        email: user.email
      };

      const jwtToken = await this._tokenService.generateUserAccessToken(
        payload
      );

      if (!jwtToken) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Oops something went wrong!!!" });
      }

      return res.status(HttpStatus.OK).json({
        success: true,
        access_token: "Bearer " + jwtToken
      });
    } catch (err) {
      logger.error(this.TAG + err.message);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }

  @httpGet("/current", passport.authenticate("local", { session: false }))
  public async getCurrentUser(
    @request() req: express.Request,
    @response() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const userRoles: Role[] = await this._userAccountService.getUserRoles(
        req.user.id
      );

      const user: IUserContext = {
        userId: req.user.userId,
        userName: req.user.userName,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        accountType: req.user.accountType,
        roles: userRoles
      };

      return res.status(HttpStatus.OK).json(user);
    } catch (err) {
      logger.error(this.TAG + err.message);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}
