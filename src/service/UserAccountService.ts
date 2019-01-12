import { injectable, inject } from "inversify";
import { TYPE_DAO } from "../config/ioc_container/inversify.typeBindings";
import { UserAccountDAO } from "../data_access/dao/UserAccountDAO";
import { UserAccount } from "../entity/UserAccount";
import { INewUserRequest } from "../domain/user/INewUserRequest";

@injectable()
export class UserAccountService {
  @inject(TYPE_DAO.UserAccountDAO)
  private readonly _userAccountDAO: UserAccountDAO;

  public async getAllUsers(): Promise<UserAccount[]> {
    return this._userAccountDAO.getAllUsers();
  }

  public async getUserByUserId(_userId): Promise<UserAccount> {
    return this._userAccountDAO.findByUserId(_userId);
  }

  public async getUserByUserName(_userName): Promise<UserAccount> {
    return this._userAccountDAO.findByUserName(_userName);
  }

  public async getUserByEmail(_email: string): Promise<UserAccount> {
    return this._userAccountDAO.findByEmail(_email);
  }

  public async createNewUser(_newUser: INewUserRequest): Promise<UserAccount> {
    return this._userAccountDAO.createNewUser(_newUser);
  }

  public async updateUser(_user: UserAccount): Promise<UserAccount> {
    return this._userAccountDAO.updateUser(_user);
  }

  public async deleteUser(_user: UserAccount): Promise<UserAccount> {
    return this._userAccountDAO.deleteUser(_user);
  }

  public async getUserRole(_id: number) {
    return this._userAccountDAO.getUserRoles(_id);
  }
}
