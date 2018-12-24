import { UserAccount } from "../../entity/UserAccount";
import { injectable, inject } from "inversify";
import { Repository } from "typeorm";
import { TYPE } from "../../config/typeBindings/types";
import { IUserAccount } from "../../domain/IUserAccount";
import { throws } from "assert";
import { Role } from "../../entity/Role";

@injectable()
export class UserAccountDAO {
  private readonly _userAccountRepository: Repository<UserAccount>;

  constructor(
    @inject(TYPE.UserAccountRepository)
    userAccountRepository: Repository<UserAccount>
  ) {
    this._userAccountRepository = userAccountRepository;
  }

  public async getAllUsers(): Promise<UserAccount[]> {
    return this._userAccountRepository.find();
  }

  public async findByUserId(_userId: string): Promise<UserAccount> {
    return this._userAccountRepository.findOne({ where: { userId: _userId } });
  }

  public async findByUserName(_userName: string): Promise<UserAccount> {
    return this._userAccountRepository.findOne({
      where: { userName: _userName }
    });
  }

  public async findByEmail(_email: string): Promise<UserAccount> {
    return this._userAccountRepository.findOne({ where: { email: _email } });
  }

  public async createNewUser(_newUser: IUserAccount): Promise<UserAccount> {
    const createdUser = this._userAccountRepository.create(_newUser);
    return this._userAccountRepository.save(createdUser);
  }

  public async getUserRoles(_userRefId): Promise<Role[]> {
    const user = await this._userAccountRepository.findOne({
      relations: ["roles"],
      where: { id: _userRefId }
    });

    return user.roles;
  }
}
