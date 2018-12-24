import * as express from "express";
import * as bcrypt from "bcryptjs";
import {
  controller,
  httpGet,
  response,
  httpPost,
  request
} from "inversify-express-utils";
import { UserAccountService } from "../service/UserAccountService";
import { inject } from "inversify";
import { TYPE } from "../config/typeBindings/types";
import { HttpStatus } from "../utility/HTTP";
import { ERoles } from "../utility/ERoles";
import { RoleService } from "../service/RoleService";
import { Role } from "../entity/Role";
import { IUserAccount } from "../domain/IUserAccount";
import { IUserAccountType } from "../domain/IUserAccountType";
import { IUserResponse } from "../domain/IUserResponse";
import { logger } from "../utility/Logger";

@controller("/admin")
export class AdminController {
  private readonly _userAccountService: UserAccountService;
  private readonly _roleService: RoleService;

  constructor(
    @inject(TYPE.UserAccountService) userAccountService: UserAccountService,
    @inject(TYPE.RoleService) roleService: RoleService
  ) {
    this._userAccountService = userAccountService;
    this._roleService = roleService;
  }

  @httpGet("/test")
  public async get(@response() res: express.Response) {
    res.json({ msg: "admin controller initialized" });
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

      if (emailExists) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "The email you entered is already in use" });
      }

      if (userNameExits) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: "The username you entered is already in use" });
      }

      const role_user: Role = await this._roleService.getRoleByName(
        ERoles.USER
      );
      const role_admin: Role = await this._roleService.getRoleByName(
        ERoles.ADMIN
      );

      const newUser: IUserAccount = {
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        accountType: IUserAccountType.local,
        roles: [role_user, role_admin]
      };

      const registerNewUser = await this._userAccountService.registerNewUser(
        newUser
      );
      if (!registerNewUser) {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Oops something went wrong!!!" });
      }

      const adminUser: IUserResponse = {
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
      return res.status(HttpStatus.CREATED).json(adminUser);
    } catch (err) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Oops something went wrong!!!" });
    }
  }
}
