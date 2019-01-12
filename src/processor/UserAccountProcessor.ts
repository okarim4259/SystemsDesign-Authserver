import { injectable, inject } from "inversify";
import { TYPE_SERVICE } from "../config/ioc_container/inversify.typeBindings";
import { UserAccountService } from "../service/UserAccountService";
import { Request, Response } from "express";
import { IUserInfoContext } from "../domain/user/IUserInfoContext";
import { HttpStatus } from "../utility/HttpStatus";
import { Role } from "../entity/Role";
import { UserAccount } from "../entity/UserAccount";
import { EUserAccountType } from "../domain/helpers/EUserAccountType";
import * as bcrypt from "bcryptjs";

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

  public async deleteUser(req: Request, res: Response): Promise<Response> {
    const user: UserAccount = await this._userAccountService.getUserByUserId(
      req.user.userId
    );
    if (!user) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Could not find records to delete"
      });
    }
    const deletedUser: UserAccount = await this._userAccountService.deleteUser(
      user
    );
    const deletedUserResponse: IUserInfoContext = {
      userId: deletedUser.userId,
      userName: deletedUser.userName,
      firstName: deletedUser.firstName,
      lastName: deletedUser.lastName,
      email: deletedUser.email,
      additionalInfo: "successfully deleted user"
    };
    return res.status(HttpStatus.OK).json({
      message: `Successfully deleted user with email ${
        deletedUserResponse.email
      }`
    });
  }

  public async updateUserInfo(req: Request, res: Response): Promise<Response> {
    //console.log(req.body);
    const user: UserAccount = await this._userAccountService.getUserByUserId(
      req.user.userId
    );
    if (!user) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Could not find records to update"
      });
    }
    //TODO: Add Validation for Update Request
    if (user.accountType === EUserAccountType.local) {
      let additionalInfo: any = {};
      if (req.body.password) {
        user.password = await bcrypt.hash(req.body.password, 10);
        additionalInfo.changedPassword = "Successfully Changed Password";
      }
      if (req.body.email) {
        if (req.body.email === user.email) {
          return res.status(HttpStatus.CONFLICT).json({
            message: "The email you entered is the same"
          });
        } else {
          const existingUser: UserAccount = await this._userAccountService.getUserByEmail(
            req.body.email
          );
          if (existingUser) {
            return res.status(HttpStatus.CONFLICT).json({
              message: "The email you entered is already in use"
            });
          }
        }
        user.email = req.body.email;
      }
      if (req.body.userName) {
        if (req.body.userName === user.userName) {
          return res.status(HttpStatus.CONFLICT).json({
            message: "The username you entered is the same"
          });
        } else {
          const existingUser: UserAccount = await this._userAccountService.getUserByUserName(
            req.body.userName
          );
          if (existingUser) {
            return res
              .status(HttpStatus.CONFLICT)
              .json({ message: "The user name is already in use" });
          }
        }

        user.userName = req.body.userName;
      }
      if (req.body.firstName) user.firstName = req.body.firstName;
      if (req.body.lastName) user.lastName = req.body.lastName;
      if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
      const updatedUser: UserAccount = await this._userAccountService.updateUser(
        user
      );
      const updatedUserResponse: IUserInfoContext = {
        userId: updatedUser.userId,
        userName: updatedUser.userName,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        additionalInfo: additionalInfo
      };
      return res.status(HttpStatus.OK).json(updatedUserResponse);
    } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: `Cannot update account information for ${
          user.accountType
        } accounts yet...`
      });
    }
  }
}
