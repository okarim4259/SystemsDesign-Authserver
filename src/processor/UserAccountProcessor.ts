import { injectable, inject } from "inversify";
import { TYPE_SERVICE } from "../config/ioc_container/inversify.typeBindings";
import { UserAccountService } from "../service/UserAccountService";
import { Request, Response } from "express";
import { IUserInfoContext } from "../domain/user/IUserInfoContext";
import { HttpStatus } from "../utility/HttpStatus";
import { Role } from "../entity/Role";

@injectable()
export class UserAccountProcessor {
  @inject(TYPE_SERVICE.UserAccountService)
  private readonly _userAccountService: UserAccountService;

  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    const users = await this._userAccountService.getAllUsers();
    if (!users) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Could not fetch Users At this time" });
    }
    const usersReponse = new Array<IUserInfoContext>();
    users.forEach(user => {
      const userResponse: IUserInfoContext = {
        userId: user.userId,
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      };
      usersReponse.push(userResponse);
    });

    return res.status(HttpStatus.OK).json(usersReponse);
  }

  public async getUserContext(req: Request, res: Response): Promise<Response> {
    const userRoles: Role[] = await this._userAccountService.getUserRole(
      req.user.id
    );
    if (!userRoles) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Could not fetch the current user context at this time"
      });
    }
    const user: IUserInfoContext = {
      userId: req.user.userId,
      userName: req.user.userName,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      accountType: req.user.accountType,
      roles: userRoles
    };
    return res.status(HttpStatus.OK).json(user);
  }
}
