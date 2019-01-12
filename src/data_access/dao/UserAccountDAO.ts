import { injectable, inject } from "inversify";
import { TYPE_REPOSITORY } from "../../config/ioc_container/inversify.typeBindings";
import { Repository } from "typeorm";
import { UserAccount } from "../../entity/UserAccount";
import { INewUserRequest } from "../../domain/user/INewUserRequest";
import { Role } from "../../entity/Role";

@injectable()
export class UserAccountDAO {
  @inject(TYPE_REPOSITORY.UserAccountRepository)
  private readonly _userAccountRepository: Repository<UserAccount>;

  public async getAllUsers(): Promise<UserAccount[]> {
    return this._userAccountRepository.find();
  }

  public async findByUserId(_userId: string): Promise<UserAccount> {
    return this._userAccountRepository.findOne({ where: { userId: _userId } });
  }

  public async findByEmail(_email: string): Promise<UserAccount> {
    return this._userAccountRepository.findOne({ where: { email: _email } });
  }

  public async findByUserName(_userName: string): Promise<UserAccount> {
    return this._userAccountRepository.findOne({
      where: { userName: _userName }
    });
  }

  public async createNewUser(_newUser: INewUserRequest): Promise<UserAccount> {
    const createdUser = this._userAccountRepository.create(_newUser);
    return this._userAccountRepository.save(createdUser);
  }

  public async updateUser(_user: UserAccount): Promise<UserAccount> {
    return this._userAccountRepository.save(_user);
  }

  public async deleteUser(_user: UserAccount): Promise<UserAccount> {
    return this._userAccountRepository.remove(_user);
  }

  public async getUserRoles(_user_Ref_id: number): Promise<Role[]> {
    const user = await this._userAccountRepository.findOne({
      relations: ["roles"],
      where: { id: _user_Ref_id }
    });
    return user.roles;
  }
}
