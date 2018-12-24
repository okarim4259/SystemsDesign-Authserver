import { injectable, inject } from "inversify";
import { TYPE } from "../config/typeBindings/types";
import { UserAccount } from "../entity/UserAccount";
import { IUserAccount } from "../domain/IUserAccount";
import { UserAccountDAO } from "../dataAccess/DAO/UserAccountDAO";

@injectable()
export class UserAccountService {
  private readonly _userAccountDAO: UserAccountDAO;

  constructor(@inject(TYPE.UserAccountDAO) userAccountDAO: UserAccountDAO) {
    this._userAccountDAO = userAccountDAO;
  }

  public async getAll(): Promise<UserAccount[]> {
    return this._userAccountDAO.getAllUsers();
  }

  public async findByUserId(_userId: string): Promise<UserAccount> {
    return this._userAccountDAO.findByUserId(_userId);
  }

  public async findByUserName(_userName: string): Promise<UserAccount> {
    return this._userAccountDAO.findByUserName(_userName);
  }

  public async findByEmail(_email: string): Promise<UserAccount> {
    return this._userAccountDAO.findByEmail(_email);
  }

  public async registerNewUser(newUser: IUserAccount): Promise<UserAccount> {
    return await this._userAccountDAO.createNewUser(newUser);
  }

  public async getUserRoles(_userRefid) {
    return await this._userAccountDAO.getUserRoles(_userRefid);
  }
}
