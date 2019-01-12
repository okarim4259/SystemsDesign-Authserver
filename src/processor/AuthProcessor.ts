import { injectable, inject } from "inversify";
import { TYPE_SERVICE } from "../config/ioc_container/inversify.typeBindings";
import { UserAccountService } from "../service/UserAccountService";
import { Request, Response } from "express";
import { HttpStatus } from "../utility/HttpStatus";
import { RoleService } from "../service/RoleService";
import { ERoles } from "../domain/helpers/ERoles";
import { INewUserRequest } from "../domain/user/INewUserRequest";
import { EUserAccountType } from "../domain/helpers/EUserAccountType";
import * as bcrypt from "bcryptjs";
import { IUserInfoContext } from "../domain/user/IUserInfoContext";
import { TokenService } from "../service/TokenService";
import { logger } from "../utility/Logger";
import { Role } from "../entity/Role";

@injectable()
export class AuthProcessor {
  @inject(TYPE_SERVICE.UserAccountService)
  private readonly _userAccountService: UserAccountService;

  @inject(TYPE_SERVICE.RoleService)
  private readonly _roleService: RoleService;

  @inject(TYPE_SERVICE.TokenService)
  private readonly _tokenService: TokenService;

  public async loginUser(req: Request, res: Response): Promise<Response> {
    logger.info(`Receieved login request ${req.body.toString()}`);
    const user = await this.getUserByEmail(req.body.email);
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: "Could not find account with that email" });
    }

    if (user.accountType === EUserAccountType.google) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: "Email Associated is with external identity provider"
      });
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

    const jwtToken = this._tokenService.generateUserAccessToken(
      user.userId,
      user.email
    );
    if (!jwtToken) {
      logger.error("Could not generate jwt token");

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not perform login at this time " });
    }
    res.status(HttpStatus.OK).json({
      success: true,
      access_token: "Bearer " + jwtToken
    });
    return res;
  }

  public async registerNewUser(
    req: Request,
    res: Response,
    _accountType: EUserAccountType
  ): Promise<Response> {
    if (!(await this.isUniqueEmail(req.body.email))) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "The email you entered is already in use" });
    }

    if (!(await this.isUniqueUserName(req.body.userName))) {
      return res
        .status(HttpStatus.CONFLICT)
        .json({ message: "The username you entered is already in use" });
    }

    const newUserRequest: INewUserRequest = await this.parseNewUserRequestBody(
      req.body,
      _accountType
    );

    if (!newUserRequest) {
      logger.error("Could not parse new user request");
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not perform user registration" });
    }

    const registeredUser = await this._userAccountService.createNewUser(
      newUserRequest
    );
    if (!registeredUser) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not perform user registration" });
    }

    const userResponse: IUserInfoContext = {
      userId: registeredUser.userId,
      userName: registeredUser.userName,
      firstName: registeredUser.firstName,
      lastName: registeredUser.lastName,
      email: registeredUser.email,
      accountType: registeredUser.accountType,
      phoneNumber: registeredUser.phoneNumber
    };

    return res.status(HttpStatus.CREATED).json(userResponse);
  }

  private async parseNewUserRequestBody(
    _requestBody: any,
    _accountType: EUserAccountType
  ): Promise<INewUserRequest> {
    const newUserRequest: INewUserRequest = {
      userName: _requestBody.userName,
      firstName: _requestBody.firstName,
      lastName: _requestBody.lastName,
      email: _requestBody.email,
      password: await bcrypt.hash(_requestBody.password, 10),
      accountType: _accountType,
      roles: await this.getRoles(_accountType),
      phoneNumber: _requestBody.phoneNumber
    };
    return newUserRequest;
  }

  private async getRoles(_accountType: EUserAccountType): Promise<Role[]> {
    const roles: Role[] = new Array<Role>();
    if (_accountType === EUserAccountType.local) {
      roles.push(await this._roleService.getRoleByName(ERoles.USER));
    } else if (_accountType === EUserAccountType.admin) {
      roles.push(await this._roleService.getRoleByName(ERoles.USER));
      roles.push(await this._roleService.getRoleByName(ERoles.ADMIN));
    } else {
      roles.push(await this._roleService.getRoleByName(ERoles.USER));
      roles.push(await this._roleService.getRoleByName(ERoles.ADMIN));
      roles.push(await this._roleService.getRoleByName(ERoles.SUPER));
    }
    return roles;
  }

  private async getUserByEmail(_email: string) {
    return this._userAccountService.getUserByEmail(_email);
  }

  private async isUniqueEmail(_email: string): Promise<Boolean> {
    const emailExists = await this._userAccountService.getUserByEmail(_email);
    if (emailExists) {
      return false;
    } else {
      return true;
    }
  }

  private async isUniqueUserName(_userName: string): Promise<Boolean> {
    const userNameExists = await this._userAccountService.getUserByUserName(
      _userName
    );
    if (userNameExists) {
      return false;
    } else {
      return true;
    }
  }
}
